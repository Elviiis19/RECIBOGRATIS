import { useEffect, useRef, useState } from 'react';

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

  const finalDesktopId = widgetId || desktopWidgetId;
  const finalMobileId = widgetId || mobileWidgetId;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDev(!window.location.hostname.includes('recibogratis.com.br'));
    }

    // Trigger fresh ad impression on mount or when refreshKey changes (route or step)
    try {
      const w = window as any;
      w._mgq = w._mgq || [];
      w._mgq.push(["_mgc.load"]);
    } catch (e) {
      // Safe catch
    }
  }, [refreshKey]);

  return (
    <div 
      ref={containerRef}
      className={`w-full my-4 flex flex-col items-center justify-center overflow-hidden min-h-[120px] print:hidden ${className}`}
    >
      <span 
        className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 block before:content-[attr(data-ad-label)]" 
        data-ad-label="- Publicidade -"
      ></span>

      {/* Visual Indicator in Dev/Preview so user can clearly see where banners are positioned */}
      {isDev && (
        <div className="w-full py-3 px-2 text-center text-xs text-gray-500 bg-emerald-50/50 border border-dashed border-emerald-300 rounded-xl mb-2">
          <div className="font-bold text-emerald-800 flex items-center justify-center gap-1.5">
            <span>Nova Impressão Adskeeper</span>
            <span className="text-[10px] font-mono bg-emerald-100 px-1.5 py-0.5 rounded">
              {target === 'mobile' ? `Mobile (${finalMobileId})` : target === 'desktop' ? `Desktop (${finalDesktopId})` : `Desktop: ${finalDesktopId} | Mobile: ${finalMobileId}`}
            </span>
          </div>
          {refreshKey !== undefined && (
            <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
              Etapa / Atualização: {String(refreshKey)}
            </span>
          )}
          <span className="text-[10px] text-gray-400 block mt-0.5">
            Renderiza anúncios reais no domínio recibogratis.com.br
          </span>
        </div>
      )}

      {/* Desktop Widget (ID: 2089546) - ONLY on desktop screens */}
      {(target === 'all' || target === 'desktop') && (
        <div 
          className={`w-full text-center ${target === 'all' ? 'hidden md:block' : ''}`}
          data-type="_mgwidget" 
          data-widget-id={finalDesktopId}
        ></div>
      )}

      {/* Mobile Widget (ID: 2089552) - ONLY on mobile screens */}
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
