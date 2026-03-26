-- ==========================================
-- 1. CLEANUP
-- ==========================================
-- DROP TABLE IF EXISTS products;

-- ==========================================
-- 2. CREATE PRODUCTS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Names (Multilingual)
    name_fr TEXT NOT NULL,
    name_en TEXT,
    name_ar TEXT,
    
    -- Descriptions (Multilingual)
    description_fr TEXT NOT NULL,
    description_en TEXT,
    description_ar TEXT,
    
    -- Metadata
    category TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    weight TEXT,
    image TEXT NOT NULL,
    
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ==========================================
-- 3. INSERT INITIAL MULTILINGUAL DATA
-- ==========================================
INSERT INTO products (
  name_fr, name_en, name_ar,
  description_fr, description_en, description_ar,
  category, price, weight, image
)
VALUES 
  (
    'Sérum d''Huile d''Argan', 'Argan Oil Serum', 'سيروم زيت الأركان',
    'Découvrez notre sérum à l''huile d''argan pure, un soin cosmétique naturel essentiel. Riche en vitamine E et antioxydants, il hydrate et régénère votre peau et vos cheveux.',
    'Discover our pure argan oil serum, an essential natural cosmetic treatment. Rich in vitamin E and antioxidants, it hydrates and regenerates your skin and hair.',
    'اكتشف سيروم زيت الأركان النقي، علاج تجميلي طبيعي أساسي. غني بفيتامين E ومضادات الأكسدة، يرطب ويجدد بشرتك وشعرك.',
    'Huile d''Argan Cosmétique', 149.0, '250ml', 'https://udvqbfzprzyrkktatnol.supabase.co/storage/v1/object/public/products/product-images/argan-oil-serum-cosmetic.webp'
  ),
  (
    'Spray d''Huile d''Argan', 'Argan Oil Spray', 'بخاخ زيت الأركان',
    'Notre spray à l''huile d''argan cosmétique offre une application facile et rapide. Cette huile bio 100% naturelle nourrit et protège votre peau et vos cheveux au quotidien.',
    'Our cosmetic argan oil spray offers easy and quick application. This 100% natural organic oil nourishes and protects your skin and hair daily.',
    'يوفر بخاخ زيت الأركان التجميلي تطبيقًا سهلاً وسريعًا. يغذي هذا الزيت العضوي الطبيعي 100٪ بشرتك وشعرك ويحميهما يوميًا.',
    'Huile d''Argan Cosmétique', 69.0, '70ml', 'https://udvqbfzprzyrkktatnol.supabase.co/storage/v1/object/public/products/product-images/argan-oil-spray-cosmetic.webp'
  ),
  (
    'Huile d''Argan Alimentaire 1L', 'Culinary Argan Oil 1L', 'زيت الأركان الغذائي 1 لتر',
    'Savourez notre huile d''argan alimentaire 100% pure et vierge, pressée à froid au Maroc. Riche en acides gras essentiels, parfaite pour la cuisine saine.',
    'Enjoy our 100% pure and virgin culinary argan oil, cold-pressed in Morocco. Rich in essential fatty acids, perfect for healthy cooking.',
    'استمتع بزيت الأركان الغذائي البكر والنقي 100٪، المعصور ببرود في المغرب. غني بالأحماض الدهنية الأساسية، مثالي للطبخ الصحي.',
    'Huile d''Argan Alimentaire', 609.0, '1 Litre', 'https://udvqbfzprzyrkktatnol.supabase.co/storage/v1/object/public/products/product-images/argan-oil-for-food-1-liter.webp'
  ),
  (
    'Huile d''Argan Cosmétique 1L', 'Cosmetic Argan Oil 1L', 'زيت الأركان التجميلي 1 لتر',
    'Offrez à votre peau et vos cheveux le luxe de notre huile d''argan cosmétique pure en format 1 litre. Idéale pour un usage régulier ou professionnel.',
    'Treat your skin and hair to the luxury of our pure cosmetic argan oil in a 1-liter format. Ideal for regular or professional use.',
    'امنح بشرتك وشعرك فخامة زيت الأركان التجميلي النقي بحجم 1 لتر. مثالي للاستخدام المنتظم أو المهني.',
    'Huile d''Argan Cosmétique', 609.0, '1 Litre', 'https://udvqbfzprzyrkktatnol.supabase.co/storage/v1/object/public/products/product-images/argan-oil-for-cosmetics-1-liter.webp'
  ),
  (
    'Huile d''Argan Format Voyage', 'Travel Size Argan Oil', 'زيت الأركان حجم السفر',
    'Petit format pratique de notre huile d''argan cosmétique pure. Idéale pour découvrir ses bienfaits ou pour les voyages.',
    'Small, practical format of our pure cosmetic argan oil. Ideal for discovering its benefits or for travel.',
    'حجم صغير وعملي من زيت الأركان التجميلي النقي. مثالي لاكتشاف فوائده أو للسفر.',
    'Huile d''Argan Cosmétique', 29.0, '30ml', 'https://udvqbfzprzyrkktatnol.supabase.co/storage/v1/object/public/products/product-images/argan-oil-spray-cosmetic.webp'
  ),
  (
    'Kit de Soins Ait Cosmetics', 'Ait Cosmetics Skincare Kit', 'مجموعة العناية بالبشرة آيت كوزميتيكس',
    'Découvrez notre kit de soins complet Ait Cosmetics, pour une routine beauté naturelle. Inclut sérum, shampoing, savon et crème.',
    'Discover our complete Ait Cosmetics skincare kit for a natural beauty routine. Includes serum, shampoo, soap, and cream.',
    'اكتشف مجموعة العناية بالبشرة المتكاملة من آيت كوزميتيكس لروتين جمال طبيعي. تشمل السيروم والشامبو والصابون والكريم.',
    'Soin de la peau et cheveux', 209.0, 'Kit Complet', 'https://udvqbfzprzyrkktatnol.supabase.co/storage/v1/object/public/products/product-images/ait-cosmetics-kit.webp'
  ),
  (
    'Miel de Caroubier d''Ifrane 1kg', 'Ifrane Carob Honey 1kg', 'عسل الخروب من إفران 1 كغ',
    'Miel de caroubier d''Ifrane, 100% naturel et artisanal. Ce miel offre un goût unique et des vertus digestives reconnues.',
    'Ifrane carob honey, 100% natural and artisanal. This honey offers a unique taste and recognized digestive benefits.',
    'عسل الخروب من إفران، طبيعي وحرفي 100٪. يتميز هذا العسل بمذاق فريد وفوائد هضمية معترف بها.',
    'Miel d''Ifrane', 299.0, '1kg', 'https://udvqbfzprzyrkktatnol.supabase.co/storage/v1/object/public/products/product-images/ifrane-carob-honey-1kg.webp'
  ),
  (
    'Miel de Daghmous 500g', 'Euphorbia Honey 500g', 'عسل الدغموس 500 غرام',
    'Miel d''euphorbe (Daghmous) d''Ifrane, un miel marocain rare et puissant. Connu pour stimuler l''immunité et soulager l''asthme.',
    'Ifrane euphorbia honey (Daghmous), a rare and powerful Moroccan honey. Known for boosting immunity and relieving asthma.',
    'عسل الدغموس من إفران، عسل مغربي نادر وقوي. معروف بتحفيز المناعة وتخفيف الربو.',
    'Miel d''Ifrane', 449.0, '1kg', 'https://udvqbfzprzyrkktatnol.supabase.co/storage/v1/object/public/products/product-images/ifrane-euphorbia-honey-500g.webp'
  ),
  (
    'Miel de Sidr (Jujubier) 1kg', 'Jujube Honey (Sidr) 1kg', 'عسل السدر 1 كغ',
    'Miel de jujubier (Sidr) d''Ifrane, un des miels les plus précieux au monde. Réputé pour ses vertus antibactériennes.',
    'Ifrane jujube honey (Sidr), one of the most precious honeys in the world. Renowned for its antibacterial properties.',
    'عسل السدر من إفران، من أثمن أنواع العسل في العالم. مشهور بخصائصه المضادة للبكتيريا.',
    'Miel d''Ifrane', 299.0, '1kg', 'https://udvqbfzprzyrkktatnol.supabase.co/storage/v1/object/public/products/product-images/ifrane-jujube-honey-1kg.webp'
  ),
  (
    'Miel de Montagne d''Ifrane 1kg', 'Mountain Herbs Honey 1kg', 'عسل أعشاب الجبال من إفران 1 كغ',
    'Miel d''herbes de montagne d''Ifrane, un nectar polyfloral riche en arômes. Un excellent tonifiant naturel.',
    'Ifrane mountain herbs honey, a polyfloral nectar rich in aromas. An excellent natural tonic.',
    'عسل أعشاب الجبال من إفران، رحيق متعدد الأزهار غني بالروائح. مقوٍ طبيعي ممتاز.',
    'Miel d''Ifrane', 299.0, '1kg', 'https://udvqbfzprzyrkktatnol.supabase.co/storage/v1/object/public/products/product-images/ifrane-mountain-herbs-honey-1kg.webp'
  ),
  (
    'Miel de Thym d''Ifrane 1kg', 'Thyme Honey 1kg', 'عسل الزعتر من إفران 1 كغ',
    'Miel de thym d''Ifrane, réputé pour ses propriétés antiseptiques. Idéal pour les maux de gorge et les défenses immunitaires.',
    'Ifrane thyme honey, renowned for its antiseptic properties. Ideal for sore throats and immune system support.',
    'عسل الزعتر من إفران، مشهور بخصائصه المطهرة. مثالي لآلام الحلق ودعم جهاز المناعة.',
    'Miel d''Ifrane', 449.0, '1kg', 'https://udvqbfzprzyrkktatnol.supabase.co/storage/v1/object/public/products/product-images/ifrane-thyme-honey-1kg.webp'
  ),
  (
    'Pâte de Graines de Courge 1kg', 'Pumpkin Seed Paste 1kg', 'زبدة بذور اليقطين 1 كغ',
    'Découvrez notre pâte artisanale de graines de courge, 100% naturelle. Riche en magnésium et zinc pour soutenir l’immunité.',
    'Discover our 100% natural artisanal pumpkin seed paste. Rich in magnesium and zinc to support immunity.',
    'اكتشف زبدة بذور اليقطين الحرفية، طبيعية 100٪. غنية بالمغنيسيوم والزنك لدعم المناعة.',
    'Pâtes et Beurres Naturels', 179.0, '1kg', 'https://udvqbfzprzyrkktatnol.supabase.co/storage/v1/object/public/products/product-images/pumpkin-seed-paste.webp'
  ),
  (
    'Beurre d''Amande Pur 1kg', 'Pure Almond Butter 1kg', 'زبدة اللوز النقية 1 كغ',
    'Savourez notre beurre d''amande 100% pur, sans additifs. Riche en protéines et fibres pour la santé du cœur.',
    'Enjoy our 100% pure almond butter, no additives. Rich in protein and fiber for heart health.',
    'استمتع بزبدة اللوز النقية 100٪، بدون إضافات. غنية بالبروتينات والألياف لصحة القلب.',
    'Pâtes et Beurres Naturels', 179.0, '1kg', 'https://udvqbfzprzyrkktatnol.supabase.co/storage/v1/object/public/products/product-images/almond-butter-1kg.webp'
  );

-- ==========================================
-- 4. CREATE ADMINS TABLE (For profile info)
-- ==========================================
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ==========================================
-- 5. ADMIN AUTHENTICATION (CRITICAL)
-- ==========================================
-- NOTE: Supabase Auth users MUST be created through the Supabase Dashboard.
-- You cannot simply insert them into a table using SQL if you want them 
-- to be able to log in to the /admin/login page.

-- ACTION STEPS TO ADD AN ADMIN:
-- 1. Go to your Supabase Dashboard -> Authentication.
-- 2. Click "Add User" -> "Create new user".
-- 3. Use: email: admin@example.com / password: password123 (or your own).
-- 4. Now you can use these credentials to log in at /admin/login.

-- Optional: Link the auth user to your public admins table for extra info
-- INSERT INTO admins (email, full_name) VALUES ('admin@example.com', 'Admin Placeholder');

