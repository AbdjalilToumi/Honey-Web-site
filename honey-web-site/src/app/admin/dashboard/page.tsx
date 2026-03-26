'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import { ProductData } from '@/contexts/ProductsContext';
import Link from 'next/link';
import Image from 'next/image';
import { IoAdd, IoPencil, IoTrash, IoWarningOutline } from 'react-icons/io5';

export default function AdminDashboard() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data as ProductData[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async () => {
    if (!deletingId) return;
    
    setDeleteLoading(true);
    const { error } = await supabase.from('products').delete().eq('id', deletingId);
    
    if (error) {
      alert('Erreur lors de la suppression : ' + error.message);
    } else {
      setProducts(prev => prev.filter(p => p.id !== deletingId));
      // Close modal
      setDeletingId(null);
    }
    setDeleteLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Delete Confirmation Modal */}
      <dialog className={`modal ${deletingId ? 'modal-open' : ''}`}>
        <div className="modal-box bg-white rounded-3xl border border-stone-100 shadow-2xl p-8">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500 animate-pulse">
              <IoWarningOutline size={44} />
            </div>
            <h3 className="font-heading text-2xl font-black text-stone-800">Supprimer ce produit ?</h3>
            <p className="font-body text-stone-500 leading-relaxed">
              Cette action est irréversible. Le produit sera définitivement retiré de votre catalogue public.
            </p>
          </div>
          <div className="modal-action grid grid-cols-2 gap-4 w-full mt-8">
            <button 
              className="btn btn-ghost h-14 rounded-2xl font-bold text-stone-400 hover:bg-stone-50"
              onClick={() => setDeletingId(null)}
              disabled={deleteLoading}
            >
              Annuler
            </button>
            <button 
              className={`btn border-none bg-red-500 hover:bg-red-600 text-white h-14 rounded-2xl font-bold shadow-lg shadow-red-100 active:scale-95 transition-all ${deleteLoading ? 'loading' : ''}`}
              onClick={handleDelete}
              disabled={deleteLoading}
            >
              {deleteLoading ? 'Suppression...' : 'Oui, supprimer'}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop bg-stone-900/40 backdrop-blur-sm">
          <button onClick={() => setDeletingId(null)}>close</button>
        </form>
      </dialog>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-stone-800 font-heading tracking-tight">Stock & Produits</h1>
          <p className="text-stone-400 font-body">Gérez l'inventaire de votre boutique Ifrane Miel</p>
        </div>
        <Link href="/admin/add-product" className="btn border-none bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 font-black text-amber-950 gap-2 h-14 px-8 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all w-full sm:w-auto">
          <IoAdd size={24} /> Ajouter un produit
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-amber-500"></span>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-stone-100">
          <span className="text-7xl mb-6 block grayscale">🍯</span>
          <h2 className="text-xl font-bold text-stone-800 font-heading mb-2">Aucun produit en rayon</h2>
          <p className="text-stone-400 font-body max-w-xs mx-auto">Votre boutique est vide pour le moment. Commencez par ajouter un produit.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-3xl shadow-sm border border-stone-100">
          <table className="table table-lg">
            <thead>
              <tr className="bg-stone-50/50 font-heading text-stone-400 border-b border-stone-100">
                <th className="py-6 uppercase text-[10px] tracking-widest pl-8">Produit</th>
                <th className="py-6 uppercase text-[10px] tracking-widest">Catégorie</th>
                <th className="py-6 uppercase text-[10px] tracking-widest">Prix</th>
                <th className="py-6 uppercase text-[10px] tracking-widest">Poids</th>
                <th className="py-6 uppercase text-[10px] tracking-widest text-right pr-8">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-amber-50/30 transition-colors group">
                  <td className="pl-8 py-5">
                    <div className="flex items-center gap-5">
                      <div className="avatar">
                        <div className="mask mask-squircle w-16 h-16 bg-stone-100 relative group-hover:scale-105 transition-transform duration-300">
                          {product.image && (
                            <Image
                              src={product.image}
                              alt={product.name_fr}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-stone-800 font-body text-lg">{product.name_fr}</div>
                        <div className="text-xs text-stone-400 font-body flex items-center gap-2 mt-1">
                          <span className="opacity-60 italic">AR</span> {product.name_ar}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-ghost border-stone-200 text-stone-500 font-bold px-4 py-3 rounded-lg text-xs uppercase tracking-wider">{product.category}</span>
                  </td>
                  <td>
                    <span className="font-black text-amber-600 font-body text-lg">{product.price} <span className="text-xs text-stone-400 ml-0.5">MAD</span></span>
                  </td>
                  <td className="text-stone-500 font-body font-medium">
                    {product.weight}
                  </td>
                  <td className="text-right pr-8">
                    <div className="flex justify-end gap-3">
                      <Link 
                        href={`/admin/edit-product/${product.id}`}
                        className="btn btn-ghost btn-circle text-amber-600 hover:bg-amber-100 transition-all shadow-sm bg-white"
                        title="Modifier"
                      >
                        <IoPencil size={20} />
                      </Link>
                      <button 
                        onClick={() => setDeletingId(product.id)}
                        className="btn btn-ghost btn-circle text-red-500 hover:bg-red-50 transition-all shadow-sm bg-white"
                        title="Supprimer"
                      >
                        <IoTrash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
