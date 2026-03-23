import { createClient } from "@/lib/supabase/server";
import type { QueryData } from "@supabase/supabase-js";

const logPostgrestError = (
  context: string,
  error: { message: string; details?: string; hint?: string; code?: string }
) => {
  console.error(context, {
    message: error.message,
    details: error.details,
    hint: error.hint,
    code: error.code,
  });
}

export async function getAllPhotos() {
  const supabase = await createClient();

  const query = supabase
    .from("photos")
    .select("*, subcategory:subcategories(*)")
    .eq("published", true)
    .order("display_order", { ascending: true });

  type GetAllPhotosResult = QueryData<typeof query>;

  const { data, error } = await query;
  if (error) {
    logPostgrestError("Error fetching photos:", error);
    return [] as GetAllPhotosResult;
  }

  return (data ?? []) as GetAllPhotosResult;
}

/**
 * Get featured photos
 * @param limit - Maximum number of photos to return
 * @returns Array of featured photos
 */
export async function getFeaturedPhotos(limit = 3) {
  const supabase = await createClient();
  
  const query = supabase
    .from("photos")
    .select("*")
    .eq("featured", true)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(limit);

  type GetFeaturedPhotosResult = QueryData<typeof query>;
  const { data, error } = await query;

  if (error) {
    logPostgrestError("Error fetching featured photos:", error);
    return [] as GetFeaturedPhotosResult;
  }
  return (data ?? []) as GetFeaturedPhotosResult;
}

/**
 * Get photos by category slug.
 * Photos reference subcategories, and subcategories reference categories.
 */
export async function getPhotosByCategory(categorySlug: string) {
  const supabase = await createClient();

  const categoryQuery = supabase
    .from("categories")
    .select("id")
    .eq("slug", categorySlug)
    .maybeSingle();

  type CategoryResult = QueryData<typeof categoryQuery>;
  const { data: category, error: categoryError } = await categoryQuery;
  
  if (categoryError) {
    logPostgrestError("Error resolving category by slug:", categoryError);
    return [];
  }
  if (!category) return [];

  const subcategoriesQuery = supabase
    .from("subcategories")
    .select("id")
    .eq("category_id", (category as CategoryResult).id);

  type SubcategoriesResult = QueryData<typeof subcategoriesQuery>;
  const { data: subcategories, error: subcategoriesError } =
    await subcategoriesQuery;

  if (subcategoriesError) {
    logPostgrestError(
      "Error fetching subcategories for category:",
      subcategoriesError
    );
    return [];
  }

  const subcategoryIds = ((subcategories ?? []) as SubcategoriesResult).map(
    (row) => row.id
  );
  if (subcategoryIds.length === 0) return [];

  const photosQuery = supabase
    .from("photos")
    .select("*, subcategory:subcategories(*)")
    .eq("published", true)
    .in("subcategory_id", subcategoryIds)
    .order("display_order", { ascending: true });

  type GetPhotosByCategoryResult = QueryData<typeof photosQuery>;
  const { data, error } = await photosQuery;

  if (error) {
    logPostgrestError("Error fetching photos by category:", error);
    return [] as GetPhotosByCategoryResult;
  }
  return (data ?? []) as GetPhotosByCategoryResult;
}

/**
 * Get photos by subcategory
 * @param subcategorySlug - Subcategory slug
 * @returns Array of photos in the subcategory
 */
export async function getPhotosBySubcategory(subcategorySlug: string) {
  const supabase = await createClient();

  const subcategoryQuery = supabase
    .from("subcategories")
    .select("id")
    .eq("slug", subcategorySlug)
    .maybeSingle();

  const { data: subcategory, error: subcategoryError } = await subcategoryQuery;
  if (subcategoryError) {
    logPostgrestError(
      "Error resolving subcategory by slug:",
      subcategoryError
    );
    return [];
  }

  if (!subcategory) return [];

  const query = supabase
    .from("photos")
    .select("*, subcategory:subcategories(*)")
    .eq("subcategory_id", subcategory.id)
    .eq("published", true)
    .order("display_order", { ascending: true });

  type GetPhotosBySubcategoryResult = QueryData<typeof query>;

  const { data, error } = await query;
  if (error) {
    logPostgrestError("Error fetching photos by subcategory:", error);
    return [] as GetPhotosBySubcategoryResult;
  }
  return (data ?? []) as GetPhotosBySubcategoryResult;
}

/**
 * Get all categories with their subcategories
 * @returns Array of categories with nested subcategories
 */
export async function getAllCategories() {
  const supabase = await createClient();

  const query = supabase
    .from("categories")
    .select("*, subcategories(*)")
    .order("display_order", { ascending: true });

  type GetCategoriesResult = QueryData<typeof query>;

  const { data, error } = await query;
  if (error) {
    logPostgrestError("Error fetching categories:", error);
    return [] as GetCategoriesResult;
  }

  const categoriesWithSortedSubcategories = ((data ?? []) as GetCategoriesResult).map((category) => ({
    ...category,
    subcategories: category.subcategories?.sort(
      (a, b) => a.display_order - b.display_order
    ) || [],
  }));

  return categoriesWithSortedSubcategories;
}
