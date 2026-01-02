'use client';

import { useState } from 'react';
import { mockCategories } from '@/data/mockPhotos';

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
    setSelectedSubcategory(undefined);
    onFilterChange(categoryId === 'all' ? undefined : categoryId, undefined);
  };

  const handleSubcategoryClick = (categoryId: string, subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
    onFilterChange(categoryId, subcategoryId);
  };

  const selectedCategoryData = mockCategories.find((cat) => cat.id === selectedCategory);

  return (
    <div className="px-6 mb-12">
      {/* Main category filters */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {mockCategories.map((category) => {
          const isSelected = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`
                px-6 py-3 rounded-full font-inter text-sm tracking-wider transition-all duration-300
                ${
                  isSelected
                    ? 'bg-foreground text-accent shadow-md scale-105'
                    : 'bg-accent text-foreground hover:bg-accent-hover hover:shadow-soft'
                }
              `}
            >
              <span className="font-medium">{category.name}</span>
              <span className="ml-2 opacity-60">({category.photoCount})</span>
            </button>
          );
        })}
      </div>

      {/* Subcategory filters - only show for selected category with subcategories */}
      {selectedCategoryData?.subcategories && selectedCategoryData.subcategories.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {selectedCategoryData.subcategories.map((subcategory) => {
            const isSelected = selectedSubcategory === subcategory.id;

            return (
              <button
                key={subcategory.id}
                onClick={() => handleSubcategoryClick(selectedCategory, subcategory.id)}
                className={`
                  px-5 py-2 rounded-full font-inter text-xs tracking-wider transition-all duration-300
                  ${
                    isSelected
                      ? 'bg-accent-hover text-foreground shadow-sm scale-105 ring-2 ring-foreground/20'
                      : 'bg-component-beige text-foreground/80 hover:bg-accent-hover hover:text-foreground'
                  }
                `}
              >
                <span>{subcategory.name}</span>
                <span className="ml-1.5 opacity-50">({subcategory.photoCount})</span>
              </button>
            );
          })}

          {/* Clear subcategory button */}
          {selectedSubcategory && (
            <button
              onClick={() => handleCategoryClick(selectedCategory)}
              className="px-4 py-2 rounded-full font-inter text-xs tracking-wider bg-foreground/10 text-foreground/60 hover:bg-foreground/20 transition-all duration-300"
            >
              Clear Filter
            </button>
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
