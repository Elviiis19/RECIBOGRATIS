import React from 'react';

interface AdSenseBlockProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
}

export const AdSenseBlock: React.FC<AdSenseBlockProps> = ({ slot, format = 'auto', className = '' }) => {
  return (
    <div className={`my-8 bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-center justify-center min-h-[100px] text-gray-400 text-sm italic ${className}`}>
      {/* 
        Google AdSense Placeholder
        Replace this with your Google AdSense <ins> block later.
        Ensure it matches the site layout.
      */}
      <div className="text-center">
        <span className="block font-semibold">Espaço Publicitário</span>
        <span className="text-xs">Otimizado para RPM/CPC (AdSense)</span>
      </div>
    </div>
  );
};
