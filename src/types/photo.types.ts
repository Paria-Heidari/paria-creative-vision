// Photo Gallery Types

export interface Photo {
  id: string;
  title: string;
  description: string | null;
  category_id: string;
  subcategory_id: string | null;
  location_city: string | null;
  location_country: string | null;
  captured_at: string | null;
  storage_path: string | null;
  width: number;
  height: number;
  aspect_ratio: number;
  tags: string[] | null;
  featured: boolean;
  published: boolean;
  display_order: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  category?: Category;
  subcategory?: Subcategory;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  photo_count: number;
  display_order: number;
  created_at: string;
  updated_at: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string | null;
  photo_count: number;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface GalleryFilters {
  category?: string;
  subcategory?: string;
  tags?: string[];
}
