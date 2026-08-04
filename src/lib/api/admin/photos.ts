import { createAdminClient } from '@/lib/supabase/server';
import { QueryData } from '@supabase/supabase-js';
import { logPostgrestError } from '../apiUtils/apiUtils';

export async function getAllPhotosAdmin() {
  const supabase = createAdminClient();

  const query = supabase
    .from('photos')
    .select('*, subcategory:subcategories(*)')
    .order('display_order', { ascending: true });

  type PhotosType = QueryData<typeof query>;
  const { data, error } = await query;

  if (error) {
    logPostgrestError('Error fetching photos:', error);
    return [] as PhotosType;
  }

  return (data ?? []) as PhotosType;
}

export async function getPhotoByIdAdmin(id: string) {
  const supabase = createAdminClient();

  const query = supabase
    .from('photos')
    .select('*, subcategory:subcategories(*)')
    .eq('id', id)
    .single();

  type PhotoType = QueryData<typeof query>;
  const { data, error } = await query;

  if (error) {
    logPostgrestError('Error fetching photo:', error);
    return null as PhotoType | null;
  }

  return data as PhotoType;
}
