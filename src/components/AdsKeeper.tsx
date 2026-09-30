import { useEffect, useRef } from 'react';

interface AdsKeeperProps {
  widgetId?: string;
  className?: string;
}

export function AdsKeeper({ widgetId = "2089546", className = "" }: AdsKeeperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const w = window as any;
      w._mgq = w._mgq || [];
      w._mgq.push(["_mgc.load"]);
    } catch (e) {
      // Safe catch for ad blocker or environment
    }
  }, []);

  return (
    <div className={`w-full my-6 flex flex-col items-center justify-center overflow-hidden min-h-[140px] print:hidden ${className}`}>
      <span 
        className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 block before:content-[attr(data-ad-label)]" 
        data-ad-label="- Publicidade -"
      ></span>
      <div 
        ref={containerRef}
        data-type="_mgwidget" 
        data-widget-id={widgetId}
        className="w-full text-center"
      ></div>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,q){w[q]=w[q]||[];w[q].push(["_mgc.load"])})(window,"_mgq");`
        }}
      />
    </div>
  );
}
