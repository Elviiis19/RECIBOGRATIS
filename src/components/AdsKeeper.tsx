import { useEffect, useRef, useState } from 'react';
import { useDeviceType } from '../hooks/useDeviceType';

interface AdsKeeperProps {
  key?: string | number;
  widgetId?: string;
  desktopWidgetId?: string;
  mobileWidgetId?: string;
  target?: 'all' | 'desktop' | 'mobile';
  className?: string;
  refreshKey?: any;
}

export function AdsKeeper({ 
  desktopWidgetId = "2089546", 
  mobileWidgetId = "2089552",
  widgetId,
  target = "all", 
  className = "",
  refreshKey
}: AdsKeeperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDev, setIsDev] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { isMobile, isDesktop, mounted } = useDeviceType();

  const finalDesktopId = widgetId || desktopWidgetId;
  const finalMobileId = widgetId || mobileWidgetId;

  // Check development preview environment
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDev(!window.location.hostname.includes('recibogratis.com.br'));
    }
  }, []);

  // IntersectionObserver for High Viewability (Lazy load near viewport)
  useEffect(() => {
    if (!mounted) return;

    // Reset visibility if refreshKey changes (e.g. form step advance)
    if (refreshKey !== undefined) {
      setIsVisible(true);
      try {
        const w = window as any;
        w._mgq = w._mgq || [];
        w._mgq.push(["_mgc.load"]);
      } catch (e) {}
      return;
    }

    if (!containerRef.current) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              try {
                const w = window as any;
                w._mgq = w._mgq || [];
                w._mgq.push(["_mgc.load"]);
              } catch (e) {}
              observer.disconnect();
            }
          });
        },
        { rootMargin: '200px' }
      );

      observer.observe(containerRef.current);
      return () => observer.disconnect();
    } else {
      // Fallback if browser doesn't support IntersectionObserver
      setIsVisible(true);
      try {
        const w = window as any;
        w._mgq = w._mgq || [];
        w._mgq.push(["_mgc.load"]);
      } catch (e) {}
    }
  }, [mounted, refreshKey]);

  // JS-Level Filtering: NEVER render ghost widgets for the wrong device
  if (mounted) {
    if (target === 'mobile' && !isMobile) return null;
    if (target === 'desktop' && !isDesktop) return null;
  }

  const activeWidgetId = isMobile ? finalMobileId : finalDesktopId;

  return (
    <div 
      ref={containerRef}
      className={`w-full my-4 flex flex-col items-center justify-center overflow-hidden min-h-[140px] print:hidden ${className}`}
    >
      <span 
        className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 block before:content-[attr(data-ad-label)]" 
        data-ad-label="- Publicidade -"
      ></span>

      {/* Visual Indicator in Dev/Preview so user can clearly see where banners are positioned */}
      {isDev && (
        <div className="w-full py-3 px-2 text-center text-xs text-gray-500 bg-emerald-50/50 border border-dashed border-emerald-300 rounded-xl mb-2">
          <div className="font-bold text-emerald-800 flex items-center justify-center gap-1.5">
            <span>Adskeeper ({isMobile ? `Mobile: ${finalMobileId}` : `Desktop: ${finalDesktopId}`})</span>
            <span className="text-[10px] font-mono bg-emerald-100 px-1.5 py-0.5 rounded text-emerald-700">
              Alta Visibilidade
            </span>
          </div>
          {refreshKey !== undefined && (
            <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
              Etapa: {String(refreshKey)}
            </span>
          )}
          <span className="text-[10px] text-gray-400 block mt-0.5">
            Renderiza no domínio oficial recibogratis.com.br
          </span>
        </div>
      )}

      {/* Renders ONLY when close to viewport and ONLY the exact widget for this device */}
      {isVisible && mounted && (
        <>
          <div 
            className="w-full text-center"
            data-type="_mgwidget" 
            data-widget-id={activeWidgetId}
          ></div>

          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,q){w[q]=w[q]||[];w[q].push(["_mgc.load"])})(window,"_mgq");`
            }}
          />
        </>
      )}
    </div>
  );
}
