import { useEffect, useRef } from 'react';

export function AdSense() {
  const adLoaded = useRef(false);

  useEffect(() => {
    if (!adLoaded.current) {
      try {
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
        adLoaded.current = true;
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center my-8 overflow-hidden">
      <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-2 block">- Publicidade -</span>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minWidth: '250px', width: '100%' }}
        data-ad-client="ca-pub-4064231456386943"
        data-ad-slot="9970959984"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
