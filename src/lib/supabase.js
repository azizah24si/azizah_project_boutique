import { createClient } from '@supabase/supabase-js';

// Ambil dari environment variables
// Lihat .env.example untuk format
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fwngivshgcslmzkmtnsf.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseAnonKey) {
  console.error('⚠️ SUPABASE_ANON_KEY belum di-set! Copy .env.example jadi .env dan isi dengan API key kamu');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
