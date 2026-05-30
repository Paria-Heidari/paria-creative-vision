import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;
let _client: ReturnType<typeof createClient<Database>> | null = null;

// Get a singleton Supabase client instance for static generation - without cookies context
export function getSupabaseStatic() {
  if (!_client) {
    const url = supabaseUrl;
    const key = supabaseKey;

    if (!url || !key) throw new Error('Missing Supabase environment variables');

    _client = createClient<Database>(url, key);
  }
  return _client;
}
