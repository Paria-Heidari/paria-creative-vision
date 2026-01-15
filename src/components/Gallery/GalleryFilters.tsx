'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/Button';
import { Category } from '@/types/photo.types';

interface GalleryFiltersProps {
  currentCategory?: string;
  currentSubcategory?: string;
  categories?: Category[];
}

const GalleryFilters = ({
  currentCategory,
  currentSubcategory,
  categories,
}: GalleryFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategory = currentCategory || 'all';
  const selectedSubcategory = currentSubcategory;

  const handleCategoryClick = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams);

    if (categorySlug === 'all') {
      params.delete('category');
      params.delete('subcategory');
    } else {
      params.set('category', categorySlug);
      params.delete('subcategory');
    }

    const queryString = params.toString();
    router.push(`/pages/portfolio${queryString ? `?${queryString}` : ''}`);
  };

  const handleSubcategoryClick = (categorySlug: string, subcategorySlug: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('category', categorySlug);
    params.set('subcategory', subcategorySlug);

    const queryString = params.toString();
    router.push(`/pages/portfolio${queryString ? `?${queryString}` : ''}`);
  };

  const selectedCategoryData = categories?.find(
    (category) => category.slug === selectedCategory
  );

  return (
    <div className="px-6 mb-12">
      {/* Main category filters */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {/* All Photos button */}
        <Button
          onClick={() => handleCategoryClick("all")}
          variant={selectedCategory === "all" ? "primary" : "secondary"}
          className={`
            px-6 py-3 text-base
            ${selectedCategory === "all" ? "shadow-md" : "hover:shadow-soft"}
          `}
        >
          <span className="font-medium">All Photos</span>
        </Button>

        {/* Category buttons */}
        {categories?.map((category) => {
          const isSelected = selectedCategory === category.slug;

          return (
            <Button
              key={category.id}
              onClick={() => handleCategoryClick(category.slug)}
              variant={isSelected ? "primary" : "secondary"}
              className={`
                px-6 py-3 text-base
                ${isSelected ? "shadow-md" : "hover:shadow-soft"}
              `}
            >
              <span className="font-medium">{category.name}</span>
              <span className="ml-2 opacity-60">({category.photo_count})</span>
            </Button>
          );
        })}
      </div>

      {/* Subcategory filters - only show for selected category with subcategories */}
      {selectedCategoryData?.subcategories && selectedCategoryData.subcategories.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {selectedCategoryData.subcategories.map((subcategory) => {
            const isSelected = selectedSubcategory === subcategory.slug;

            return (
              <Button
                key={subcategory.id}
                onClick={() =>
                  handleSubcategoryClick(selectedCategory, subcategory.slug)
                }
                variant={isSelected ? "secondary" : "ghost"}
                className={`
                  px-5 py-2 text-sm
                  ${
                    isSelected
                      ? "bg-accent-hover shadow-sm"
                      : "bg-component-beige text-foreground/80 hover:bg-accent-hover hover:text-foreground"
                  }
                `}
              >
                <span>{subcategory.name}</span>
                <span className="ml-1.5 opacity-50">
                  ({subcategory.photo_count})
                </span>
              </Button>
            );
          })}

          {/* Clear subcategory button */}
          {selectedSubcategory && (
            <Button
              onClick={() => handleCategoryClick(selectedCategory)}
              variant="ghost"
              className="px-4 py-2 text-xs bg-foreground/10 text-foreground/60 hover:bg-foreground/20 transition-all duration-300"
            >
              Clear Filter
            </Button>
          )}
        </div>
      )}

      {/* Active filter description */}
      {selectedCategoryData && selectedCategory !== "all" && (
        <div className="mt-8 text-center">
          <p className="text-sm font-inter text-foreground/60 italic max-w-md mx-auto">
            {selectedCategoryData.description ||
              `Viewing ${selectedCategoryData.name} collection`}
            {selectedSubcategory && (
              <>
                {" "}
                •{" "}
                {
                  selectedCategoryData.subcategories?.find(
                    (s) => s.slug === selectedSubcategory
                  )?.name
                }
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
}

export default GalleryFilters;