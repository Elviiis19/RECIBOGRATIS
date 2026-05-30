import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Cookie } from 'lucide-react';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted or rejected cookies
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
    
    // We already have gtag script in index.html, so if we wanted to
    // implement strict consent mode, we would update the gtag consent state here.
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setIsVisible(false);
    
    // Update gtag consent state
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-2 md:p-4 pointer-events-none"
        >
          <div className="max-w-5xl mx-auto pointer-events-auto">
            <div className="bg-white rounded-lg shadow-[0_-8px_30px_rgba(0,0,0,0.12)] border border-gray-100 p-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 relative overflow-hidden">
              {/* Decorative accent */}
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
              
              <div className="flex-1 max-w-4xl px-2">
                <p className="text-gray-700 text-xs md:text-sm leading-tight flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                  <span className="font-semibold flex items-center gap-1.5 text-gray-900">
                    <Cookie className="w-3.5 h-3.5 text-emerald-600" />
                    Privacidade e Cookies:
                  </span>
                  <span>
                    Utilizamos cookies para melhorar sua experiência. Ao continuar, você concorda com nossa{' '}
                    <Link to="/politica-de-privacidade" className="text-emerald-700 hover:text-emerald-800 font-medium underline underline-offset-2">
                      Política de Privacidade
                    </Link>
                    .
                  </span>
                </p>
              </div>
              
              <div className="flex flex-row gap-2 w-full md:w-auto mt-1 md:mt-0 pl-2 md:pl-0">
                <button
                  onClick={handleReject}
                  className="flex-1 md:flex-none px-3 py-1.5 text-xs md:text-sm rounded-md font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-colors whitespace-nowrap"
                >
                  Recusar
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 md:flex-none px-3 py-1.5 text-xs md:text-sm rounded-md font-medium text-white bg-emerald-700 hover:bg-emerald-800 transition-colors whitespace-nowrap shadow-sm shadow-emerald-200"
                >
                  Aceitar Tudo
                </button>
              </div>
              
              <button 
                onClick={() => setIsVisible(false)}
                className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors md:hidden"
                aria-label="Fechar aviso"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
