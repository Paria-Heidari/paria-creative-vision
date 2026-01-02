// Photo Gallery Types
export interface Photo {
  id: string;
  title: string;
  description?: string;
  category: 'nature' | 'portrait' | 'events';
  subcategory?: 'norway' | 'spain' | 'italy' | 'switzerland';
  location: {
    city?: string;
    country: string;
  };
  date: {
    captured: Date;
  };
  imageUrl: string; // For now, using /public paths, will switch to Firebase Storage URLs later
  metadata: {
    width: number;
    height: number;
    aspectRatio: number;
  };
  tags: string[];
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  subcategories?: Subcategory[];
  photoCount: number;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  photoCount: number;
}

export interface GalleryFilters {
  category?: string;
  subcategory?: string;
  tags?: string[];
}
