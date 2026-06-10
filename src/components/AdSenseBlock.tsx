import React, { useEffect, useRef } from 'react';

interface AdSenseBlockProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
}

export const AdSenseBlock: React.FC<AdSenseBlockProps> = ({ slot = '1234567890', format = 'auto', className = '' }) => {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    // Evita o erro de dupla execução no React 18 Strict Mode
    if (adRef.current && !adRef.current.dataset.adServed) {
      try {
        adRef.current.dataset.adServed = 'true';
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
      } catch (err) {
        console.error('AdSense error', err);
      }
    }
  }, []);

  return (
    <div className={`my-8 min-h-[100px] flex items-center justify-center overflow-hidden ${className}`}>
      <ins 
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client="ca-pub-4064231456386943"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};
