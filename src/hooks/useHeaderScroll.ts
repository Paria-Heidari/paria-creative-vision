import { useEffect, useState } from 'react';

export function useHeaderScroll() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isHiddenByScroll, setIsHiddenByScroll] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHasMounted(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastY && currentY > 0) setIsHiddenByScroll(true);
      else if (currentY < lastY) setIsHiddenByScroll(false);
      setIsScrolled(currentY > 50);
      lastY = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { hasMounted, isHiddenByScroll, isScrolled };
}
