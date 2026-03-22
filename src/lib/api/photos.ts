import { createClient } from "@/lib/supabase/server";
import type { Category, Photo } from "@/types/photo.types";

export async function getAllPhotos() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("photos")
    .select("*, subcategory:subcategories(*)")
    .eq("published", true)
    .order("display_order", { ascending: true });
  if (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
  // No direct photos→categories FK, Using an unknown for those query results in runtime type errors.
  return (data || []) as unknown as Photo[];
}

/**
 * Get featured photos
 * @param limit - Maximum number of photos to return
 * @returns Array of featured photos
 */
export async function getFeaturedPhotos(limit = 3) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("photos")
    .select("*")
    .eq("featured", true)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching featured photos:", error);
    return [];
  }
  return (data || []) as Photo[];
}

/**
 * Get photos by category
 * @param categorySlug - Category slug
 * @returns Array of photos in the category
 */
export async function getPhotosByCategory(categorySlug: string) {
  const supabase = await createClient();

  // photos has no direct category_id FK — resolve via subcategories
  const { data: category } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", categorySlug)
    .single();

  if (!category) return [];

  const { data: subcategories } = await supabase
    .from("subcategories")
    .select("id")
    .eq("category_id", category.id);

  const subcategoryIds = (subcategories || []).map((s) => s.id);
  if (subcategoryIds.length === 0) return [];

  const { data, error } = await supabase
    .from("photos")
    .select("*, subcategory:subcategories(*)")
    .in("subcategory_id", subcategoryIds)
    .eq("published", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching photos by category:", error);
    return [];
  }
  return (data || []) as unknown as Photo[];
}

/**
 * Get photos by subcategory
 * @param subcategorySlug - Subcategory slug
 * @returns Array of photos in the subcategory
 */
export async function getPhotosBySubcategory(subcategorySlug: string) {
  const supabase = await createClient();

  const { data: subcategory } = await supabase
    .from("subcategories")
    .select("id")
    .eq("slug", subcategorySlug)
    .single();

  if (!subcategory) return [];

  const { data, error } = await supabase
    .from("photos")
    .select("*, subcategory:subcategories(*)")
    .eq("subcategory_id", subcategory.id)
    .eq("published", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching photos by subcategory:", error);
    return [];
  }
  return (data || []) as unknown as Photo[];
}

/**
 * Get all categories with their subcategories
 * @returns Array of categories with nested subcategories
 */
export async function getAllCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*, subcategories(*)")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  // Sort subcategories by display_order within each category
  const categoriesWithSortedSubcategories = (data || []).map((category) => ({
    ...category,
    subcategories: category.subcategories?.sort(
      (a, b) => a.display_order - b.display_order
    ) || [],
  }));

  return categoriesWithSortedSubcategories as Category[];
}
