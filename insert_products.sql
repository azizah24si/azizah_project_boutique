-- ============================================================
-- INSERT DATA PRODUK BOUTIQUE JIJAH
-- Execute this in Supabase SQL Editor
-- ============================================================

-- Hapus produk lama jika ada (opsional)
-- DELETE FROM products;

-- Insert 20 produk fashion boutique yang realistis
INSERT INTO products (name, description, price, stock, image_url) VALUES

-- DRESS COLLECTION (10 items)
('Dress Floral Premium', 'Dress cantik dengan motif bunga-bunga segar, bahan katun premium yang adem dan nyaman dipakai seharian. Cocok untuk acara casual maupun formal.', 250000, 15, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500'),

('Hijab Pashmina Silk', 'Pashmina silk premium dengan kualitas terbaik, lembut dan mudah diatur. Tersedia berbagai warna cantik untuk melengkapi outfit harian Anda.', 85000, 30, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500'),

('Vintage Outer Premium', 'Outer coat vintage style dengan cutting modern, cocok untuk gaya preppy dan casual chic. Bahan berkualitas tinggi tahan lama.', 350000, 8, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500'),

('Korean Style Blouse', 'Blouse ala Korea dengan desain minimalis dan elegan, bahan nyaman breathable. Perfect untuk daily look yang stylish.', 180000, 20, 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500'),

('Casual Dress Summer', 'Dress kasual untuk musim panas dengan bahan ringan dan adem. Desain simple tapi tetap fashionable untuk hangout.', 220000, 12, 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500'),

('Maxi Dress Elegant', 'Maxi dress elegant untuk acara special, bahan flowing yang jatuh sempurna. Bikin penampilan makin anggun dan mempesona.', 450000, 6, 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500'),

('Midi Dress Stripe', 'Midi dress dengan motif stripe yang timeless, cocok untuk berbagai ocasion. Bahan katun stretch yang nyaman.', 280000, 10, 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500'),

('A-Line Dress Formal', 'A-line dress untuk acara formal dengan cutting yang flattering untuk semua body type. Elegan dan classy.', 380000, 7, 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500'),

('Shirt Dress Chic', 'Shirt dress dengan style preppy yang chic, bisa untuk ke kantor atau hangout. Versatile dan easy to style.', 295000, 14, 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=500'),

('Wrap Dress Floral', 'Wrap dress dengan motif floral yang feminine, desain wrap memberikan siluet yang cantik. Must have item!', 320000, 9, 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500'),

-- TOPS & BLOUSE COLLECTION (5 items)
('Peplum Top Modern', 'Peplum top dengan desain modern yang memberi efek slimming. Cocok dipadukan dengan rok atau celana.', 165000, 18, 'https://images.unsplash.com/photo-1564257577880-9b7e2a6f84c3?w=500'),

('Ruffle Sleeve Blouse', 'Blouse dengan detail ruffle di lengan yang manis dan feminine. Bahan satin yang lembut dan jatuh.', 195000, 16, 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500'),

('Classic White Shirt', 'Kemeja putih klasik yang wajib ada di wardrobe. Bahan katun premium, cutting body fit yang rapi.', 175000, 22, 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500'),

('Crop Top Trendy', 'Crop top trendy dengan berbagai pilihan warna. Bahan stretch yang nyaman dan tidak tembus pandang.', 125000, 25, 'https://images.unsplash.com/photo-1562572159-4efc207f5aff?w=500'),

('Off Shoulder Top', 'Off shoulder top yang sexy tapi tetap classy. Perfect untuk night out atau dinner date.', 210000, 11, 'https://images.unsplash.com/photo-1564257577880-9b7e2a6f84c3?w=500'),

-- OUTER & CARDIGAN COLLECTION (3 items)
('Blazer Korean Style', 'Blazer ala Korea dengan cutting oversize yang trendy. Bisa formal atau casual tergantung styling.', 425000, 5, 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500'),

('Long Cardigan Knit', 'Long cardigan rajut yang cozy dan warm. Perfect layering piece untuk berbagai outfit.', 265000, 13, 'https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?w=500'),

('Denim Jacket Vintage', 'Denim jacket vintage wash yang never out of style. Essential item untuk gaya casual chic.', 385000, 8, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500'),

-- BOTTOM COLLECTION (2 items)
('Wide Leg Pants', 'Celana panjang wide leg yang nyaman dan stylish. High waist untuk proporsi sempurna.', 245000, 17, 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500'),

('Pleated Midi Skirt', 'Rok midi plisket yang feminine dan elegant. Bahan flowing yang jatuh cantik saat dipakai.', 215000, 14, 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500');

-- Verify data
SELECT 
  id, 
  name, 
  price, 
  stock,
  created_at 
FROM products 
ORDER BY created_at DESC;
