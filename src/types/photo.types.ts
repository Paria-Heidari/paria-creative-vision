// Photo gallery types — derived from Supabase schema (database.types.ts).
// After DB changes: run `npm run supabase:types`, then these aliases update.

import type { Database } from '@/types/database.types';

type Tables = Database['public']['Tables'];

export type PhotoRow = Tables['photos']['Row'];
export type CategoryRow = Tables['categories']['Row'];
export type SubcategoryRow = Tables['subcategories']['Row'];

export type Photo = PhotoRow & {
  subcategory?: SubcategoryRow | null;
};

export type Category = CategoryRow & {
  subcategories?: SubcategoryRow[];
};

export type Subcategory = SubcategoryRow;

export interface GalleryFilters {
  category?: string;
  subcategory?: string;
  tags?: string[];
}
