import { createClient } from '@supabase/supabase-js';

// Ambil dari environment variables
// Lihat .env.example untuk format
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fwngivshgcslmzkmtnsf.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Debug: Log untuk cek apakah env variables ter-load
console.log('🔧 Supabase Config:');
console.log('  URL:', supabaseUrl);
console.log('  Key:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : '❌ NOT SET');

if (!supabaseAnonKey || supabaseAnonKey === 'your_anon_key_here_starts_with_eyJ') {
  console.error('⚠️ SUPABASE_ANON_KEY belum di-set dengan benar!');
  console.error('   1. Copy dari: https://supabase.com/dashboard/project/fwngivshgcslmzkmtnsf/settings/api');
  console.error('   2. Paste ke file .env');
  console.error('   3. Restart development server');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
