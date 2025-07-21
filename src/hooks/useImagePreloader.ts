import { useEffect } from 'react';

interface PreloadImage {
  src: string;
  priority?: boolean;
}

export function useImagePreloader(images: PreloadImage[]) {
  useEffect(() => {
    // Preload critical images
    const preloadLinks: HTMLLinkElement[] = [];
    
    images.forEach(({ src, priority = false }) => {
      // Create preload link for critical images
      if (priority) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
        preloadLinks.push(link);
      } else {
        // Use Image constructor for non-critical images
        const img = new Image();
        img.src = src;
      }
    });

    // Cleanup function to remove preload links
    return () => {
      preloadLinks.forEach(link => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, [images]);
}

// Helper hook for critical images on specific pages
export function useCriticalImages() {
  useImagePreloader([
    { src: '/atly-logo.png', priority: true },
    { src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop', priority: true },
  ]);
}

// Helper hook for lazy loading images when they come into view
export function useLazyImageLoader(ref: React.RefObject<HTMLElement>, threshold = 0.1) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Image has come into view, trigger loading
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          }
        });
      },
      { threshold }
    );

    if (ref.current) {
      const images = ref.current.querySelectorAll('img[data-src]');
      images.forEach(img => observer.observe(img));
    }

    return () => observer.disconnect();
  }, [ref, threshold]);
} 