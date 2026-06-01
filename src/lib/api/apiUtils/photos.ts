import { createClient } from '@/lib/supabase/server';
import { getSupabaseStatic } from '@/lib/supabase/static';
import type { QueryData } from '@supabase/supabase-js';

const logPostgrestError = (
  context: string,
  error: { message: string; details?: string; hint?: string; code?: string },
) => {
  console.error(context, {
    message: error.message,
    details: error.details,
    hint: error.hint,
    code: error.code,
  });
};

export async function getAllPhotos() {
  const supabase = await createClient();

  const query = supabase
    .from('photos')
    .select('*, subcategory:subcategories(*)')
    .eq('published', true)
    .order('display_order', { ascending: true });

  type PhotosType = QueryData<typeof query>;
  const { data, error } = await query;

  if (error) {
    logPostgrestError('Error fetching photos:', error);
    return [] as PhotosType;
  }

  return (data ?? []) as PhotosType;
}

/**
 * Get featured photos
 * @param limit - Maximum number of photos to return
 * @returns Array of featured photos
 */
export async function getFeaturedPhotos(limit = 3) {
  const supabase = await createClient();

  const query = supabase
    .from('photos')
    .select('*')
    .eq('featured', true)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })
    .limit(limit);

  type FeaturedPhotosType = QueryData<typeof query>;
  const { data, error } = await query;

  if (error) {
    logPostgrestError('Error fetching featured photos:', error);
    return [] as FeaturedPhotosType;
  }
  return (data ?? []) as FeaturedPhotosType;
}

/**
 * Get photos by category slug.
 * Photos reference subcategories, and subcategories reference categories.
 */
export async function getPhotosByCategory(categorySlug: string) {
  const supabase = await createClient();

  const { data: category, error: categoryError } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .maybeSingle();

  if (categoryError) {
    logPostgrestError('Error resolving category by slug:', categoryError);
    return [];
  }
  if (!category) return [];

  const photosQuery = supabase
    .from('photos')
    .select('*, subcategory:subcategories!inner(*)')
    .eq('subcategories.category_id', category.id)
    .eq('published', true)
    .order('display_order', { ascending: true });

  type PhotosByCategoryType = QueryData<typeof photosQuery>;
  const { data, error } = await photosQuery;

  if (error) {
    logPostgrestError('Error fetching photos by category:', error);
    return [] as PhotosByCategoryType;
  }
  return (data ?? []) as PhotosByCategoryType;
}

/**
 * Get photos by subcategory
 * @param subcategorySlug - Subcategory slug
 * @returns Array of photos in the subcategory
 */
export async function getPhotosBySubcategory(subcategorySlug: string) {
  const supabase = await createClient();

  const query = supabase
    .from('photos')
    .select('*, subcategory:subcategories!inner(*)')
    .eq('subcategories.slug', subcategorySlug)
    .eq('published', true)
    .order('display_order', { ascending: true });

  type PhotosBySubcategoryType = QueryData<typeof query>;

  const { data, error } = await query;
  if (error) {
    logPostgrestError('Error fetching photos by subcategory:', error);
    return [] as PhotosBySubcategoryType;
  }
  return (data ?? []) as PhotosBySubcategoryType;
}

/**
 * Get all categories with their subcategories
 * @returns Array of categories with nested subcategories
 */
export async function getAllCategories() {
  const supabase = await createClient();

  const query = supabase
    .from('categories')
    .select('*, subcategories(*)')
    .order('display_order', { ascending: true })
    .order('display_order', {
      referencedTable: 'subcategories',
      ascending: true,
    });

  type CategoriesType = QueryData<typeof query>;

  const { data, error } = await query;
  if (error) {
    logPostgrestError('Error fetching categories:', error);
    return [] as CategoriesType;
  }

  return data;
}

export async function getAllCategoriesStatic() {
  const { data: categories, error } = await getSupabaseStatic()
    .from('categories')
    .select('slug, subcategories(slug)')
    .order('display_order', { ascending: true });

  if (error) {
    logPostgrestError('Error fetching categories for static params:', error);
    return [];
  }

  return categories ?? [];
}
