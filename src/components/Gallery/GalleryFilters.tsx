'use client';
import { useState } from 'react';
import { mockCategories } from '@/data/mockPhotos';
import Button from '@/components/Button/Button';

interface GalleryFiltersProps {
  onFilterChange: (category?: string, subcategory?: string) => void;
  currentCategory?: string;
  currentSubcategory?: string;
}

export default function GalleryFilters({
  onFilterChange,
  currentCategory = 'all',
  currentSubcategory,
}: GalleryFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);
  const [selectedSubcategory, setSelectedSubcategory] = useState(currentSubcategory);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory('');
    onFilterChange(categoryId === 'all' ? '' : categoryId, '');
  };

  const handleSubcategoryClick = (categoryId: string, subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
    onFilterChange(categoryId, subcategoryId);
  };

  const selectedCategoryData = mockCategories.find((category) => category.id === selectedCategory);

  return (
    <div className="px-6 mb-12">
      {/* Main category filters */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {mockCategories.map((category) => {
          const isSelected = selectedCategory === category.id;

          return (
            <Button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              variant={isSelected ? 'primary' : 'secondary'}
              className={`
                px-6 py-3 text-base
                ${isSelected ? 'shadow-md' : 'hover:shadow-soft'}
              `}
            >
              <span className="font-medium">{category.name}</span>
              <span className="ml-2 opacity-60">({category.photoCount})</span>
            </Button>
          );
        })}
      </div>

      {/* Subcategory filters - only show for selected category with subcategories */}
      {selectedCategoryData?.subcategories && selectedCategoryData.subcategories.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {selectedCategoryData.subcategories.map((subcategory) => {
            const isSelected = selectedSubcategory === subcategory.id;

            return (
              <Button
                key={subcategory.id}
                onClick={() =>
                  handleSubcategoryClick(selectedCategory, subcategory.id)
                }
                variant={isSelected ? 'secondary' : 'ghost'}
                className={`
                  px-5 py-2 text-sm
                  ${
                    isSelected
                      ? 'bg-accent-hover shadow-sm'
                      : 'bg-component-beige text-foreground/80 hover:bg-accent-hover hover:text-foreground'
                  }
                `}
              >
                <span>{subcategory.name}</span>
                <span className="ml-1.5 opacity-50">
                  ({subcategory.photoCount})
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
      {selectedCategoryData && selectedCategory !== 'all' && (
        <div className="mt-8 text-center">
          <p className="text-sm font-inter text-foreground/60 italic max-w-md mx-auto">
            {selectedCategoryData.description || `Viewing ${selectedCategoryData.name} collection`}
            {selectedSubcategory && (
              <>
                {' '}
                •{' '}
                {
                  selectedCategoryData.subcategories?.find((s) => s.id === selectedSubcategory)
                    ?.name
                }
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
