'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Typography } from '@/components/ui/Typography';
import { Category } from '@/types/photo.types';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Stack } from '@/components/layout/Stack';
import { cn } from '@/lib/utils/utils';

interface GalleryFiltersProps {
  currentCategory?: string;
  currentSubcategory?: string;
  categories?: Category[];
}

const filterBtnBase =
  'rounded-full font-medium tracking-wide uppercase transition-all duration-300';
const filterBtnActive = 'bg-accent-gold text-white shadow-lg';
const filterBtnInactive =
  'border border-foreground/10 bg-white/80 text-foreground hover:border-accent-gold hover:text-accent-gold';

const subBtnBase =
  'rounded-full font-medium tracking-wide transition-all duration-300 flex items-center gap-1.5 px-4 py-1.5 text-xs';
const subBtnActive =
  'border border-accent-gold/30 bg-accent-gold/20 text-accent-gold';
const subBtnInactive =
  'bg-surface-raised text-foreground-muted hover:bg-accent-gold/10 hover:text-accent-gold';

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

  const handleSubcategoryClick = (
    categorySlug: string,
    subcategorySlug: string,
  ) => {
    const params = new URLSearchParams(searchParams);
    params.set('category', categorySlug);
    params.set('subcategory', subcategorySlug);
    const queryString = params.toString();
    router.push(`/pages/portfolio${queryString ? `?${queryString}` : ''}`);
  };

  const selectedCategoryData = categories?.find(
    (c) => c.slug === selectedCategory,
  );

  return (
    <section className="min-h-50">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Stack
          direction="vertical"
          gap={{ base: 6, md: 8 }}
          align="center"
          justify="center"
        >
          {/* Category filters */}
          <Stack
            direction="horizontal"
            gap={{ base: 3, md: 6 }}
            align="center"
            justify="center"
            className="flex-wrap"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCategoryClick('all')}
              aria-pressed={selectedCategory === 'all'}
              className={cn(
                filterBtnBase,
                'overflow-hidden px-6 py-2.5 text-sm',
                selectedCategory === 'all'
                  ? filterBtnActive
                  : filterBtnInactive,
              )}
            >
              All Photos
            </motion.button>

            {categories?.map((category) => {
              const isSelected = selectedCategory === category.slug;
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCategoryClick(category.slug)}
                  aria-pressed={isSelected}
                  className={cn(
                    filterBtnBase,
                    'flex items-center gap-2 px-6 py-2.5 text-sm',
                    isSelected ? filterBtnActive : filterBtnInactive,
                  )}
                >
                  <span>{category.name}</span>
                  <span
                    className={
                      isSelected
                        ? 'text-xs text-white/70'
                        : 'text-foreground-muted text-xs'
                    }
                  >
                    ({category.photo_count})
                  </span>
                </motion.button>
              );
            })}
          </Stack>

          {/* Subcategory filters */}
          <AnimatePresence>
            {selectedCategoryData?.subcategories &&
              selectedCategoryData.subcategories.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <Stack
                    direction="horizontal"
                    gap={{ base: 2, md: 4 }}
                    align="center"
                    justify="center"
                  >
                    {selectedCategoryData.subcategories.map((subcategory) => {
                      const isSelected =
                        selectedSubcategory === subcategory.slug;
                      return (
                        <motion.button
                          key={subcategory.id}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() =>
                            handleSubcategoryClick(
                              selectedCategory,
                              subcategory.slug,
                            )
                          }
                          aria-pressed={isSelected}
                          className={cn(
                            subBtnBase,
                            isSelected ? subBtnActive : subBtnInactive,
                          )}
                        >
                          <span>{subcategory.name}</span>
                          <span className="opacity-60">
                            ({subcategory.photo_count})
                          </span>
                        </motion.button>
                      );
                    })}

                    {selectedSubcategory && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCategoryClick(selectedCategory)}
                        className="bg-foreground/10 text-foreground-muted hover:bg-foreground/20 flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300"
                      >
                        <X className="h-3 w-3" aria-hidden="true" />
                        <span>Clear</span>
                      </motion.button>
                    )}
                  </Stack>
                </motion.div>
              )}
          </AnimatePresence>

          {/* Active filter description */}
          <AnimatePresence>
            {selectedCategoryData && selectedCategory !== 'all' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Typography
                  variant="paragraphSmall"
                  as="p"
                  className="text-foreground-muted max-w-md"
                >
                  {selectedCategoryData.description ||
                    `Exploring the ${selectedCategoryData.name} collection`}
                  {selectedSubcategory && (
                    <span className="text-accent-gold">
                      {' '}
                      —{' '}
                      {
                        selectedCategoryData.subcategories?.find(
                          (s) => s.slug === selectedSubcategory,
                        )?.name
                      }
                    </span>
                  )}
                </Typography>
              </motion.div>
            )}
          </AnimatePresence>
        </Stack>
      </motion.div>
    </section>
  );
};

export default GalleryFilters;
