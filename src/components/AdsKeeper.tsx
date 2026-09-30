import { useEffect, useRef } from 'react';

interface AdsKeeperProps {
  widgetId?: string;
  desktopWidgetId?: string;
  mobileWidgetId?: string;
  target?: 'all' | 'desktop' | 'mobile';
  className?: string;
}

export function AdsKeeper({ 
  desktopWidgetId = "2089546", 
  mobileWidgetId = "2089552",
  widgetId,
  target = "all", 
  className = "" 
}: AdsKeeperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // If a specific widgetId is explicitly passed, use it, otherwise use the specific desktop/mobile IDs
  const finalDesktopId = widgetId || desktopWidgetId;
  const finalMobileId = widgetId || mobileWidgetId;

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

      {/* Desktop Widget (ID: 2089546) - ONLY on desktop screens (hidden on mobile) */}
      {(target === 'all' || target === 'desktop') && (
        <div 
          className={`w-full text-center ${target === 'all' ? 'hidden md:block' : ''}`}
          data-type="_mgwidget" 
          data-widget-id={finalDesktopId}
        ></div>
      )}

      {/* Mobile Widget (ID: 2089552) - ONLY on mobile screens (hidden on desktop) */}
      {(target === 'all' || target === 'mobile') && (
        <div 
          className={`w-full text-center ${target === 'all' ? 'block md:hidden' : ''}`}
          data-type="_mgwidget" 
          data-widget-id={finalMobileId}
        ></div>
      )}

      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,q){w[q]=w[q]||[];w[q].push(["_mgc.load"])})(window,"_mgq");`
        }}
      />
    </div>
  );
}
