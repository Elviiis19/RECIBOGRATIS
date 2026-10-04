import { useState, useEffect } from 'react';

export function useDeviceType() {
  const [device, setDevice] = useState<'mobile' | 'desktop'>('desktop');
  const [isLargeDesktop, setIsLargeDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;

    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const largeQuery = window.matchMedia('(min-width: 1280px)');

    const update = () => {
      setDevice(mobileQuery.matches ? 'mobile' : 'desktop');
      setIsLargeDesktop(largeQuery.matches);
    };

    update();

    // Modern matchMedia listener with backward compatibility
    if (mobileQuery.addEventListener) {
      mobileQuery.addEventListener('change', update);
      largeQuery.addEventListener('change', update);
    } else {
      mobileQuery.addListener(update);
      largeQuery.addListener(update);
    }

    return () => {
      if (mobileQuery.removeEventListener) {
        mobileQuery.removeEventListener('change', update);
        largeQuery.removeEventListener('change', update);
      } else {
        mobileQuery.removeListener(update);
        largeQuery.removeListener(update);
      }
    };
  }, []);

  return {
    isMobile: mounted ? device === 'mobile' : false,
    isDesktop: mounted ? device === 'desktop' : true,
    isLargeDesktop: mounted ? isLargeDesktop : false,
    mounted
  };
}
