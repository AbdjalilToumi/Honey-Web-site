'use client';
import { useState, useEffect, useContext, useRef, use } from 'react';
import { supabase } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Cartegories } from '@/contexts/Category';
import Link from 'next/link';
import { IoArrowBack, IoCloudUpload, IoCheckmarkCircle, IoAlertCircle, IoCashOutline, IoScaleOutline, IoListOutline, IoSaveOutline } from 'react-icons/io5';
import Loading from '@/components/Loading';

interface FormErrors {
  name_fr?: string;
  description_fr?: string;
  name_en?: string;
  description_en?: string;
  name_ar?: string;
  description_ar?: string;
  price?: string;
  weight?: string;
  image?: string;
  general?: string;
}

export default function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const categories = useContext(Cartegories);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { id } = use(params);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name_fr: '', name_en: '', name_ar: '',
    description_fr: '', description_en: '', description_ar: '',
    price: '', weight: '', category: '',
    image: '',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        setFormData({
          ...data,
          price: data.price.toString(),
          category: data.category || categories[0],
        });
        setImagePreview(data.image);
      } catch (err: any) {
        setErrors({ general: "Impossible de récupérer le produit." });
        setTimeout(() => router.push('/admin/dashboard'), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, router, categories]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = value.replace(/<script.*?>.*?<\/script>/gi, '');
    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined, general: undefined }));
    }
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!imagePreview) newErrors.image = "L'image du produit est obligatoire.";
    if (!formData.name_fr.trim()) newErrors.name_fr = "Le nom en français est requis.";
    if (!formData.description_fr.trim()) newErrors.description_fr = "La description en français est requise.";
    if (!formData.name_en.trim()) newErrors.name_en = "Name in English is required.";
    if (!formData.description_en.trim()) newErrors.description_en = "Description in English is required.";
    if (!formData.name_ar.trim()) newErrors.name_ar = "الاسم بالعربية مطلوب";
    if (!formData.description_ar.trim()) newErrors.description_ar = "الوصف بالعربية مطلوب";
    
    const priceNum = parseFloat(formData.price);
    if (!formData.price || isNaN(priceNum) || priceNum <= 0) {
      newErrors.price = "Le prix doit être supérieur à 0.";
    }
    if (!formData.weight.trim()) newErrors.weight = "Le poids/volume est requis.";
    return newErrors;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) {
        setErrors({ ...errors, image: 'Image invalide.' });
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setErrors({ ...errors, image: "Max 2Mo." });
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, image: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setSaving(true);
    setErrors({});

    try {
      let finalImageUrl = formData.image;

      // 1. If a new image was selected, upload it
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `product-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('products')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(filePath);
        finalImageUrl = publicUrl;
      }

      // 2. Update Database
      const { error: updateError } = await supabase
        .from('products')
        .update({
          ...formData,
          price: parseFloat(formData.price),
          image: finalImageUrl,
        })
        .eq('id', id);

      if (updateError) throw updateError;

      setSuccess(true);
      setTimeout(() => router.push('/admin/dashboard'), 1500);
    } catch (err: any) {
      setErrors({ general: err.message || 'Une erreur est survenue.' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 px-4 sm:px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 sm:gap-5 w-full sm:w-auto">
          <Link href="/admin/dashboard" className="btn btn-ghost btn-circle bg-stone-50 text-stone-400 hover:text-amber-600 transition-all shrink-0">
            <IoArrowBack size={20} />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-800 font-heading tracking-tight">Modifier le produit</h1>
            <p className="text-xs sm:text-sm text-stone-400 font-body">Mettez à jour les informations du stock</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      {(errors.general || Object.keys(errors).length > 0) && !success && (
        <div className="alert bg-red-50 border border-red-100 shadow-lg rounded-2xl text-red-800 animate-in slide-in-from-top-2">
          <IoAlertCircle size={24} className="shrink-0 text-red-500" />
          <div className="flex flex-col text-left">
            <span className="font-bold">Attention :</span>
            <span className="text-sm">{errors.general || "Veuillez remplir tous les champs obligatoires (*) pour les 3 langues."}</span>
          </div>
        </div>
      )}

      {success && (
        <div className="alert bg-emerald-500 border-none shadow-xl rounded-2xl text-white animate-in slide-in-from-top-2">
          <IoCheckmarkCircle size={24} className="shrink-0" />
          <span className="font-bold">Modifications enregistrées ! Redirection...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Main Info */}
        <div className="lg:col-span-8 space-y-6 lg:space-y-8 order-1">
          <section className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-stone-100 space-y-6">
            <div className="tabs tabs-boxed bg-stone-50 p-1.5 rounded-xl sm:rounded-2xl flex overflow-x-auto no-scrollbar">
              <input type="radio" name="lang_tabs" className="tab flex-1 font-bold text-stone-500 checked:!bg-white checked:!text-amber-600 transition-all text-xs sm:text-sm h-10 sm:h-12" aria-label="FRANÇAIS 🇫🇷" defaultChecked />
              <div className="tab-content bg-transparent p-4 sm:p-6 space-y-6 w-full">
                <div className="form-control">
                  <label className="label"><span className={`label-text font-bold ${errors.name_fr ? 'text-red-500' : 'text-stone-700'}`}>Nom du produit *</span></label>
                  <input type="text" name="name_fr" className={`input input-bordered w-full bg-stone-50/50 rounded-xl sm:rounded-2xl focus:ring-2 ${errors.name_fr ? 'border-red-300 ring-red-100' : 'focus:ring-amber-200'}`} value={formData.name_fr} onChange={handleChange} />
                  {errors.name_fr && <span className="text-red-500 text-xs mt-1 font-bold">{errors.name_fr}</span>}
                </div>
                <div className="form-control">
                  <label className="label"><span className={`label-text font-bold ${errors.description_fr ? 'text-red-500' : 'text-stone-700'}`}>Description détaillée *</span></label>
                  <textarea name="description_fr" className={`textarea textarea-bordered h-32 sm:h-44 bg-stone-50/50 rounded-xl sm:rounded-2xl focus:ring-2 leading-relaxed ${errors.description_fr ? 'border-red-300 ring-red-100' : 'focus:ring-amber-200'}`} value={formData.description_fr} onChange={handleChange}></textarea>
                  {errors.description_fr && <span className="text-red-500 text-xs mt-1 font-bold">{errors.description_fr}</span>}
                </div>
              </div>

              <input type="radio" name="lang_tabs" className="tab flex-1 font-bold text-stone-500 checked:!bg-white checked:!text-amber-600 transition-all text-xs sm:text-sm h-10 sm:h-12" aria-label="ENGLISH 🇬🇧" />
              <div className="tab-content bg-transparent p-4 sm:p-6 space-y-6 w-full">
                <div className="form-control">
                  <label className="label"><span className={`label-text font-bold ${errors.name_en ? 'text-red-500' : 'text-stone-700'}`}>Product Name *</span></label>
                  <input type="text" name="name_en" className={`input input-bordered w-full bg-stone-50/50 rounded-xl sm:rounded-2xl focus:ring-2 ${errors.name_en ? 'border-red-300 ring-red-100' : 'focus:ring-amber-200'}`} value={formData.name_en} onChange={handleChange} />
                  {errors.name_en && <span className="text-red-500 text-xs mt-1 font-bold">{errors.name_en}</span>}
                </div>
                <div className="form-control">
                  <label className="label"><span className={`label-text font-bold ${errors.description_en ? 'text-red-500' : 'text-stone-700'}`}>Detailed Description *</span></label>
                  <textarea name="description_en" className={`textarea textarea-bordered h-32 sm:h-44 bg-stone-50/50 rounded-xl sm:rounded-2xl focus:ring-2 leading-relaxed ${errors.description_en ? 'border-red-300 ring-red-100' : 'focus:ring-amber-200'}`} value={formData.description_en} onChange={handleChange}></textarea>
                  {errors.description_en && <span className="text-red-500 text-xs mt-1 font-bold">{errors.description_en}</span>}
                </div>
              </div>

              <input type="radio" name="lang_tabs" className="tab flex-1 font-bold text-stone-500 checked:!bg-white checked:!text-amber-600 transition-all text-xs sm:text-sm h-10 sm:h-12" aria-label="العربية 🇲🇦" />
              <div className="tab-content bg-transparent p-4 sm:p-6 space-y-6 w-full text-right" dir="rtl">
                <div className="form-control">
                  <label className="label"><span className={`label-text font-bold ${errors.name_ar ? 'text-red-500' : 'text-stone-700'}`}>اسم المنتج *</span></label>
                  <input type="text" name="name_ar" className={`input input-bordered w-full bg-stone-50/50 rounded-xl sm:rounded-2xl focus:ring-2 font-body text-base ${errors.name_ar ? 'border-red-300 ring-red-100' : 'focus:ring-amber-200'}`} value={formData.name_ar} onChange={handleChange} />
                  {errors.name_ar && <span className="text-red-500 text-xs mt-1 font-bold">{errors.name_ar}</span>}
                </div>
                <div className="form-control">
                  <label className="label"><span className={`label-text font-bold ${errors.description_ar ? 'text-red-500' : 'text-stone-700'}`}>وصف المنتج *</span></label>
                  <textarea name="description_ar" className={`textarea textarea-bordered h-32 sm:h-44 bg-stone-50/50 rounded-xl sm:rounded-2xl focus:ring-2 leading-relaxed font-body text-base ${errors.description_ar ? 'border-red-300 ring-red-100' : 'focus:ring-amber-200'}`} value={formData.description_ar} onChange={handleChange}></textarea>
                  {errors.description_ar && <span className="text-red-500 text-xs mt-1 font-bold">{errors.description_ar}</span>}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-8 order-2 w-full">
          
          <section className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-stone-100">
            <h2 className={`text-[10px] sm:text-xs font-black uppercase tracking-widest mb-4 ${errors.image ? 'text-red-500' : 'text-stone-400'}`}>Image du produit *</h2>
            <div onClick={() => fileInputRef.current?.click()} className={`group relative aspect-video sm:aspect-square rounded-xl sm:rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center cursor-pointer overflow-hidden ${imagePreview ? 'border-amber-400 bg-amber-50' : errors.image ? 'border-red-300 bg-red-50' : 'border-stone-200 bg-stone-50'}`}>
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><span className="text-white font-bold text-xs bg-black/20 backdrop-blur-md px-4 py-2 rounded-lg">Modifier</span></div>
                </>
              ) : (
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-white rounded-xl mx-auto flex items-center justify-center mb-3 text-stone-300 group-hover:text-amber-500"><IoCloudUpload size={28} /></div>
                  <p className="text-xs font-bold text-stone-600">Charger l'image</p>
                </div>
              )}
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
          </section>

          <section className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-stone-100 space-y-4">
            <div className="form-control">
              <label className="label"><span className={`label-text font-bold flex items-center gap-2 text-xs sm:text-sm ${errors.price ? 'text-red-500' : 'text-stone-600'}`}><IoCashOutline /> Prix (MAD) *</span></label>
              <input type="number" step="0.01" name="price" className={`input input-bordered h-10 bg-stone-50/50 rounded-xl ${errors.price ? 'border-red-300' : ''}`} value={formData.price} onChange={handleChange} />
              {errors.price && <span className="text-red-500 text-[10px] font-bold mt-1">{errors.price}</span>}
            </div>
            <div className="form-control">
              <label className="label"><span className={`label-text font-bold flex items-center gap-2 text-xs sm:text-sm ${errors.weight ? 'text-red-500' : 'text-stone-600'}`}><IoScaleOutline /> Poids *</span></label>
              <input type="text" name="weight" className={`input input-bordered h-10 bg-stone-50/50 rounded-xl ${errors.weight ? 'border-red-300' : ''}`} value={formData.weight} onChange={handleChange} />
              {errors.weight && <span className="text-red-500 text-[10px] font-bold mt-1">{errors.weight}</span>}
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-bold flex items-center gap-2 text-xs sm:text-sm text-stone-600 uppercase tracking-widest"><IoListOutline /> Catégorie</span></label>
              <div className="grid grid-cols-1 gap-2">
                {categories.map((cat) => (
                  <label key={cat} className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all cursor-pointer ${formData.category === cat ? 'border-amber-400 bg-amber-50' : 'border-stone-100 bg-stone-50/50 hover:border-amber-200'}`}>
                    <span className={`font-bold text-xs ${formData.category === cat ? 'text-amber-900' : 'text-stone-600'}`}>{cat}</span>
                    <input type="radio" name="category" value={cat} checked={formData.category === cat} onChange={handleChange} className="hidden" />
                    {formData.category === cat && <IoCheckmarkCircle className="text-amber-500" size={16} />}
                  </label>
                ))}
              </div>
            </div>
          </section>

          <button type="submit" className={`btn border-none bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 w-full h-14 font-black text-amber-950 rounded-2xl shadow-lg hover:shadow-xl active:scale-95 transition-all ${saving ? 'loading' : ''}`} disabled={saving}>
            {!saving && <IoSaveOutline size={24} className="mr-2" />}
            {saving ? 'Enregistrement...' : 'Sauvegarder'}
          </button>
        </div>
      </form>
    </div>
  );
}
