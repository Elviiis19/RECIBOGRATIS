import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, CornerDownLeft, X } from 'lucide-react';
import { receiptModels } from '../data/receiptModels';

interface SearchPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchPalette({ isOpen, onClose }: SearchPaletteProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle escape to close
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredModels = query.trim() === '' 
    ? receiptModels 
    : receiptModels.filter(m => 
        m.title.toLowerCase().includes(query.toLowerCase()) || 
        m.shortDescription.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 pb-4">
      <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[85vh] border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center border-b border-gray-100 px-3 sm:px-5 py-4 gap-3 bg-gray-50/50">
          <button 
            onClick={onClose}
            className="hidden sm:flex items-center justify-center text-xs bg-gray-200/80 text-gray-600 font-bold px-2 py-1.5 rounded-md hover:bg-gray-300 transition-colors border border-gray-300 shadow-sm"
            title="Pressione ESC para fechar"
          >
            ESC
          </button>
          
          <Search className="w-6 h-6 text-emerald-600 shrink-0 ml-1" />
          
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-0 focus:ring-0 text-gray-900 placeholder:text-gray-400 sm:text-xl w-full outline-none font-medium h-10"
            placeholder="Qual modelo de recibo você precisa hoje?"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          
          <button 
            onClick={onClose}
            className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-red-600 bg-gray-100 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors border border-gray-200 hover:border-red-200 shadow-sm"
          >
            <X className="w-5 h-5" />
            <span className="hidden sm:inline">Fechar</span>
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-2 bg-gray-50/30">
          {filteredModels.length > 0 ? (
            <div className="px-2 py-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 px-2">
                {query.trim() === '' ? 'Todos os Modelos Disponíveis' : 'Resultados da Busca'}
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {filteredModels.map(model => (
                  <li key={model.id}>
                    <button
                      className="w-full text-left px-4 py-3 rounded-xl hover:bg-emerald-50 focus:bg-emerald-50 text-gray-700 transition-all flex items-center justify-between group outline-none border border-transparent hover:border-emerald-100 hover:shadow-sm"
                      onClick={() => {
                        navigate(`/${model.slug}`);
                        onClose();
                      }}
                    >
                      <div>
                        <div className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors text-base">{model.title}</div>
                        <div className="text-sm text-gray-500 mt-0.5 line-clamp-1">{model.shortDescription}</div>
                      </div>
                      <CornerDownLeft className="w-5 h-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-3" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center py-16 px-4 text-gray-500 text-sm flex flex-col items-center">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <span className="text-xl font-semibold text-gray-700 mb-2">Nenhum modelo encontrado</span>
              Tente buscar por termos mais genéricos ou verifique a ortografia de "{query}".
            </div>
          )}
        </div>
        
        <div className="hidden sm:flex bg-white p-3.5 border-t border-gray-100 text-sm text-gray-500 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Temos <strong>{receiptModels.length} modelos</strong> revisados e prontos para uso.</span>
          </div>
          <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2.5 py-1 rounded-md">Atalho: CTRL+K</span>
        </div>
      </div>
    </div>
  );
}
