'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Category } from '@/types/photo.types';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="px-6 sm:px-8 mb-12"
    >
      {/* Main category filters */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {/* All Photos button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleCategoryClick("all")}
          className={`
            px-6 py-2.5 rounded-full text-sm font-medium tracking-wide uppercase transition-all duration-300
            ${selectedCategory === "all"
              ? "bg-accent-gold text-white shadow-lg"
              : "bg-white/80 text-foreground border border-foreground/10 hover:border-accent-gold hover:text-accent-gold"
            }
          `}
        >
          All Photos
        </motion.button>

        {/* Category buttons */}
        {categories?.map((category) => {
          const isSelected = selectedCategory === category.slug;

          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCategoryClick(category.slug)}
              className={`
                px-6 py-2.5 rounded-full text-sm font-medium tracking-wide uppercase transition-all duration-300 flex items-center gap-2
                ${isSelected
                  ? "bg-accent-gold text-white shadow-lg"
                  : "bg-white/80 text-foreground border border-foreground/10 hover:border-accent-gold hover:text-accent-gold"
                }
              `}
            >
              <span>{category.name}</span>
              <span className={`text-xs ${isSelected ? "text-white/70" : "text-foreground-muted"}`}>
                ({category.photo_count})
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Subcategory filters with animation */}
      <AnimatePresence>
        {selectedCategoryData?.subcategories && selectedCategoryData.subcategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 justify-center py-4 border-t border-foreground/5">
              {selectedCategoryData.subcategories.map((subcategory) => {
                const isSelected = selectedSubcategory === subcategory.slug;

                return (
                  <motion.button
                    key={subcategory.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() =>
                      handleSubcategoryClick(selectedCategory, subcategory.slug)
                    }
                    className={`
                      px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 flex items-center gap-1.5
                      ${isSelected
                        ? "bg-accent-gold/20 text-accent-gold border border-accent-gold/30"
                        : "bg-component-beige text-foreground-muted hover:bg-accent-gold/10 hover:text-accent-gold"
                      }
                    `}
                  >
                    <span>{subcategory.name}</span>
                    <span className="opacity-60">({subcategory.photo_count})</span>
                  </motion.button>
                );
              })}

              {/* Clear subcategory button */}
              {selectedSubcategory && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryClick(selectedCategory)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-foreground/10 text-foreground-muted hover:bg-foreground/20 transition-all duration-300 flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  <span>Clear</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active filter description */}
      <AnimatePresence>
        {selectedCategoryData && selectedCategory !== "all" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 text-center"
          >
            <p className="text-sm font-inter text-foreground-muted max-w-md mx-auto">
              {selectedCategoryData.description ||
                `Exploring the ${selectedCategoryData.name} collection`}
              {selectedSubcategory && (
                <span className="text-accent-gold">
                  {" "}— {selectedCategoryData.subcategories?.find(
                    (s) => s.slug === selectedSubcategory
                  )?.name}
                </span>
              )}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default GalleryFilters;