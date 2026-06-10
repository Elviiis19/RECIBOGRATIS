import React, { useEffect } from 'react';

interface AdSenseBlockProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
}

export const AdSenseBlock: React.FC<AdSenseBlockProps> = ({ slot = '1234567890', format = 'auto', className = '' }) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error', err);
    }
  }, []);

  return (
    <div className={`my-8 min-h-[100px] flex items-center justify-center overflow-hidden ${className}`}>
      <ins 
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXX" // Substitua pelo seu ID ('ca-pub-...")
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};
