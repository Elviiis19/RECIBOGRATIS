import { useEffect, useState } from 'react';

interface LateralAdsKeeperProps {
  side: 'left' | 'right';
  widgetId?: string;
}

export function LateralAdsKeeper({ side, widgetId = "2089546" }: LateralAdsKeeperProps) {
  const [isDev, setIsDev] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDev(!window.location.hostname.includes('recibogratis.com.br'));
    }

    try {
      const w = window as any;
      w._mgq = w._mgq || [];
      w._mgq.push(["_mgc.load"]);
    } catch (e) {
      // Safe catch
    }
  }, []);

  const positionClass = side === 'left' 
    ? 'left-1 2xl:left-4' 
    : 'right-1 2xl:right-4';

  return (
    <aside 
      aria-label={`Publicidade lateral ${side === 'left' ? 'esquerda' : 'direita'}`}
      className={`hidden xl:block fixed ${positionClass} top-24 z-30 w-[135px] 2xl:w-[160px] pointer-events-auto print:hidden`}
    >
      <div className="bg-white/95 backdrop-blur-sm p-2 rounded-2xl shadow-md border border-gray-200 text-center">
        <span className="text-[9px] text-gray-400 uppercase tracking-widest block mb-1">
          - Publicidade -
        </span>

        {isDev && (
          <div className="py-8 px-2 text-center text-[11px] text-gray-500 bg-emerald-50/60 border border-dashed border-emerald-300 rounded-xl mb-2">
            <span className="font-bold text-emerald-800 block">Banner Lateral {side === 'left' ? 'Esq.' : 'Dir.'}</span>
            <span className="font-mono text-[9px] text-gray-400 block mt-1">ID: {widgetId}</span>
            <span className="text-[9px] text-emerald-600 block mt-2">Ativo em recibogratis.com.br</span>
          </div>
        )}

        <div 
          data-type="_mgwidget" 
          data-widget-id={widgetId}
          className="w-full text-center min-h-[300px]"
        ></div>

        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,q){w[q]=w[q]||[];w[q].push(["_mgc.load"])})(window,"_mgq");`
          }}
        />
      </div>
    </aside>
  );
}
