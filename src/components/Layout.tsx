import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  FileText, Menu, X, ChevronDown, ChevronRight, Zap, Youtube, Instagram, 
  Search, Layers, FileCheck2, Wrench, BookOpen, HelpCircle, Home, 
  Sparkles, ShieldCheck, Phone, Briefcase 
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { receiptModels } from '../data/receiptModels';
import { CookieBanner } from './CookieBanner';
import { SearchPalette } from './SearchPalette';
import { LateralAdsKeeper } from './LateralAdsKeeper';
import { AdsKeeper } from './AdsKeeper';

export function Layout() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openMobileCategory, setOpenMobileCategory] = useState<string | null>('Básicos');
  const currentYear = new Date().getFullYear().toString();
  const isHomePage = location.pathname === '/';

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Group models by category for the drawer and footer
  const categories = {
    'Básicos': ['simples', 'recibo-com-logo', 'quitacao', 'sinal'],
    'Profissionais': ['servicos', 'honorarios', 'mei', 'arquiteto', 'engenheiro', 'corretor', 'termo-de-prestacao-de-servico', 'prestacao-de-servico-com-logo', 'prestacao-com-garantia-e-logo'],
    'Saúde & Bem-estar': ['dentista', 'psicologo', 'fisioterapeuta', 'nutricionista', 'estetica'],
    'Serviços Domésticos': ['diarista', 'baba', 'cuidador', 'jardinagem'],
    'Manutenção & Obras': ['pedreiro', 'pintor', 'eletricista', 'encanador', 'mecanico', 'informatica'],
    'Outros': ['aluguel', 'recibo-de-aluguel-com-logo', 'compra-venda', 'pensao', 'doacao', 'adiantamento', 'salario', 'recibo-de-salario-com-logo', 'vale-transporte', 'vale-alimentacao', 'diaria', 'taxi-uber', 'frete', 'fotografo', 'professor', 'veterinario', 'pet-shop', 'costureira', 'promissoria', 'nota-promissoria-com-avalista', 'ordem-servico', 'ordem-de-servico-com-logo', 'orcamento']
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      {/* Skip to Main Content Link for WCAG Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[9999] focus:px-4 focus:py-2.5 focus:bg-emerald-900 focus:text-white focus:rounded-xl focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400 font-bold text-sm"
      >
        Pular para o conteúdo principal
      </a>

      <SearchPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      <header className="sticky top-0 z-50 shadow-sm flex flex-col relative">
        {/* Unified Clean Top Bar with Logo, Main Navigation, Search, and Action CTA */}
        <div className="bg-emerald-800 text-white border-b border-emerald-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 sm:h-20 gap-3">
              
              {/* Left: Logo */}
              <div className="flex items-center flex-shrink-0">
                <Link to="/" className="flex items-center gap-2 text-white hover:text-emerald-100 transition-colors">
                  <FileText className="h-7 w-7 sm:h-8 sm:w-8 text-emerald-300" />
                  <span className="font-bold text-xl sm:text-2xl tracking-tight">Recibo Grátis</span>
                </Link>
              </div>

              {/* Center: Desktop Navigation Links */}
              <nav aria-label="Navegação Principal" className="hidden lg:flex items-center gap-6 xl:gap-8">
                {/* Modelos Dropdown */}
                <div className="relative group">
                  <button 
                    className="flex items-center gap-1.5 text-sm font-bold text-emerald-50 hover:text-white transition-colors py-6 cursor-pointer"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span>Modelos de Recibo</span>
                    <ChevronDown className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <div className="absolute top-[85%] left-0 w-80 bg-white border border-gray-100 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-1 group-hover:translate-y-0 transition-all duration-200 ease-in-out z-50 text-left text-gray-900">
                    <div className="p-3">
                      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-3 py-1 mb-1">
                        Mais Populares
                      </div>
                      <ul className="space-y-1">
                        <li>
                          <Link to="/recibo-simples" className="text-sm font-medium text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 block py-2 px-3 rounded-xl transition-colors">
                            <div className="font-bold text-gray-900">Recibo Simples de Pagamento</div>
                            <div className="text-xs text-gray-500">Quitação rápida para qualquer transação</div>
                          </Link>
                        </li>
                        <li>
                          <Link to="/recibo-de-prestacao-de-servicos" className="text-sm font-medium text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 block py-2 px-3 rounded-xl transition-colors">
                            <div className="font-bold text-gray-900">Prestação de Serviços</div>
                            <div className="text-xs text-gray-500">Para autônomos, MEI e freelancers</div>
                          </Link>
                        </li>
                        <li>
                          <Link to="/recibo-de-aluguel" className="text-sm font-medium text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 block py-2 px-3 rounded-xl transition-colors">
                            <div className="font-bold text-gray-900">Recibo de Aluguel</div>
                            <div className="text-xs text-gray-500">Locações com condomínio e encargos</div>
                          </Link>
                        </li>
                        <li>
                          <Link to="/recibo-com-logo" className="text-sm font-medium text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 block py-2 px-3 rounded-xl transition-colors">
                            <div className="font-bold text-gray-900">Recibo com Logotipo</div>
                            <div className="text-xs text-gray-500">Personalize com a marca da sua empresa</div>
                          </Link>
                        </li>
                      </ul>
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <Link to="/modelos" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 block py-2 px-3 rounded-xl transition-colors text-center">
                          Ver Todos os 40+ Modelos de Recibo &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <Link 
                  to="/declaracoes" 
                  className="text-sm font-bold text-emerald-50 hover:text-white transition-colors"
                >
                  Declarações
                </Link>

                {/* Ferramentas Dropdown */}
                <div className="relative group">
                  <button 
                    className="flex items-center gap-1.5 text-sm font-bold text-emerald-50 hover:text-white transition-colors py-6 cursor-pointer"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <Zap className="w-4 h-4 text-emerald-300" />
                    <span>Ferramentas</span>
                    <ChevronDown className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <div className="absolute top-[85%] left-0 w-80 bg-white border border-gray-100 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-1 group-hover:translate-y-0 transition-all duration-200 ease-in-out z-50 text-left text-gray-900">
                    <div className="p-3">
                      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-3 py-1 mb-1">
                        Utilitários Financeiros
                      </div>
                      <ul className="space-y-1">
                        <li>
                          <Link to="/gerador-qr-code-pix" className="text-sm text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 block py-2 px-3 rounded-xl transition-colors">
                            <div className="font-bold text-gray-900">Gerador QR Code Pix</div>
                            <div className="text-xs text-gray-500">Crie códigos e plaquinhas de balcão</div>
                          </Link>
                        </li>
                        <li>
                          <Link to="/valor-por-extenso" className="text-sm text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 block py-2 px-3 rounded-xl transition-colors">
                            <div className="font-bold text-gray-900">Valor por Extenso</div>
                            <div className="text-xs text-gray-500">Converta reais em texto formal</div>
                          </Link>
                        </li>
                        <li>
                          <Link to="/calculadora-retencao-impostos" className="text-sm text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 block py-2 px-3 rounded-xl transition-colors">
                            <div className="font-bold text-gray-900">Retenção de Impostos</div>
                            <div className="text-xs text-gray-500">ISS, IRRF e INSS para serviços</div>
                          </Link>
                        </li>
                        <li>
                          <Link to="/validador-formatador-cpf-cnpj" className="text-sm text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 block py-2 px-3 rounded-xl transition-colors">
                            <div className="font-bold text-gray-900">Validador de CPF / CNPJ</div>
                            <div className="text-xs text-gray-500">Validação oficial da Receita Federal</div>
                          </Link>
                        </li>
                      </ul>
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <Link to="/ferramentas" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 block py-2 px-3 rounded-xl transition-colors text-center">
                          Ver Todas as Ferramentas &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <Link 
                  to="/blog" 
                  className="text-sm font-bold text-emerald-50 hover:text-white transition-colors"
                >
                  Blog
                </Link>

                <Link 
                  to="/como-funciona" 
                  className="text-sm font-bold text-emerald-50 hover:text-white transition-colors"
                >
                  Como Funciona
                </Link>
              </nav>

              {/* Right: Search + Action CTA (Desktop) & Mobile Controls */}
              <div className="flex items-center justify-end gap-2.5 flex-shrink-0">
                
                {/* Search Button (Desktop) */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="hidden md:flex items-center gap-2 bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-600/40 text-emerald-100 px-3.5 py-2 rounded-xl transition-all text-xs font-semibold cursor-pointer"
                  aria-label="Buscar modelos de recibo"
                >
                  <Search className="w-4 h-4 text-emerald-300" />
                  <span>Buscar</span>
                  <kbd className="px-1.5 py-0.5 border border-emerald-700/60 rounded bg-emerald-800 text-[10px] font-mono">⌘K</kbd>
                </button>

                {/* Mobile Search Icon Button */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="md:hidden flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl bg-emerald-900/50 hover:bg-emerald-900 text-emerald-100 hover:text-white border border-emerald-700/60 transition-colors cursor-pointer"
                  aria-label="Buscar modelos de recibo"
                >
                  <Search className="w-5 h-5" />
                </button>

                {/* Desktop Primary CTA */}
                <Link
                  to="/recibo-simples"
                  className="hidden sm:inline-flex items-center gap-1.5 bg-white text-emerald-900 hover:bg-emerald-50 active:bg-emerald-100 px-4 py-2 rounded-xl font-bold text-sm shadow-sm transition-all hover:shadow"
                >
                  <FileText className="w-4 h-4 text-emerald-700" />
                  <span>Gerar Recibo</span>
                </Link>

                {/* Mobile Menu Button - Highlighted and Easy to Tap */}
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white px-3.5 py-2 min-h-[44px] rounded-xl font-bold text-sm border border-emerald-500/50 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-300 cursor-pointer"
                  aria-label={isMenuOpen ? "Fechar menu de navegação" : "Abrir menu principal"}
                  aria-expanded={isMenuOpen}
                >
                  {isMenuOpen ? <X className="h-5 w-5 text-emerald-200" /> : <Menu className="h-5 w-5 text-emerald-200" />}
                  <span>Menu</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
 
      {/* Banners Laterais (Skyscrapers) no Desktop - Exclusivo para páginas internas, exceto home */}
      {!isHomePage && (
        <>
          <LateralAdsKeeper key={`lateral-left-${location.pathname}`} side="left" widgetId="2089546" refreshKey={location.pathname} />
          <LateralAdsKeeper key={`lateral-right-${location.pathname}`} side="right" widgetId="2090666" refreshKey={location.pathname} />
        </>
      )}

      <main 
        id="main-content" 
        className={`flex-grow pb-20 lg:pb-0 focus:outline-none transition-all ${
          !isHomePage ? 'xl:px-20 2xl:px-32' : ''
        }`} 
        tabIndex={-1}
      >
        <Outlet />
      </main>

      {/* Banner Mobile no Rodapé do Conteúdo - Exclusivo para celular em todas as páginas internas (exceto home) */}
      {!isHomePage && (
        <div className="block xl:hidden w-full max-w-lg mx-auto px-4 pb-4 print:hidden">
          <AdsKeeper key={`mobile-bottom-${location.pathname}`} target="mobile" mobileWidgetId="2089552" className="my-2" refreshKey={location.pathname} />
        </div>
      )}

      <footer className="bg-emerald-950 border-t border-emerald-900 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-2 text-emerald-400 mb-4">
                <FileText className="h-6 w-6" />
                <span className="font-bold text-lg">Recibo Grátis</span>
              </Link>
              <p className="text-sm text-emerald-100/70 mb-6 max-w-sm">
                Gere recibos online de forma rápida, segura e totalmente gratuita. Sem necessidade de cadastro.
              </p>

              <div className="flex items-center gap-4 mb-6">
                <a href="https://www.youtube.com/@Recibogratis" target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:text-white transition-colors flex items-center justify-center w-11 h-11 rounded-full bg-emerald-900/60 hover:bg-emerald-800" aria-label="Canal oficial do Recibo Grátis no YouTube">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/recibogratis" target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:text-white transition-colors flex items-center justify-center w-11 h-11 rounded-full bg-emerald-900/60 hover:bg-emerald-800" aria-label="Perfil oficial do Recibo Grátis no Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
              
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Ferramentas Extras</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/gerador-qr-code-pix" className="text-sm text-emerald-100/70 hover:text-white transition-colors">
                    Gerador de QR Code PIX
                  </Link>
                </li>
                <li>
                  <Link to="/gerador-pix-copia-e-cola" className="text-sm text-emerald-100/70 hover:text-white transition-colors">
                    Gerador PIX Copia e Cola
                  </Link>
                </li>
                <li>
                  <Link to="/valor-por-extenso" className="text-sm text-emerald-100/70 hover:text-white transition-colors">
                    Valor por Extenso
                  </Link>
                </li>
                <li>
                  <Link to="/calculadora-retencao-impostos" className="text-sm text-emerald-100/70 hover:text-white transition-colors">
                    Calculadora de Retenção de Impostos
                  </Link>
                </li>
                <li>
                  <Link to="/calculadora-desconto-multa" className="text-sm text-emerald-100/70 hover:text-white transition-colors">
                    Calculadora de Descontos e Multas
                  </Link>
                </li>
                <li>
                  <Link to="/calculadora-maquininha-cartao" className="text-sm text-emerald-100/70 hover:text-white transition-colors">
                    Calculadora de Taxas de Maquininha
                  </Link>
                </li>
                <li>
                  <Link to="/calculadora-dias-uteis" className="text-sm text-emerald-100/70 hover:text-white transition-colors">
                    Calculadora de Dias Úteis
                  </Link>
                </li>
                <li>
                  <Link to="/conversor-horas-trabalhadas" className="text-sm text-emerald-100/70 hover:text-white transition-colors">
                    Conversor de Horas p/ Valor Mensal
                  </Link>
                </li>
                <li>
                  <Link to="/validador-formatador-cpf-cnpj" className="text-sm text-emerald-100/70 hover:text-white transition-colors">
                    Validador de CPF/CNPJ
                  </Link>
                </li>
                <li>
                  <Link to="/consultador-codigo-ibge" className="text-sm text-emerald-100/70 hover:text-white transition-colors">
                    Consultador de Código IBGE
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Mais Usados</h3>
              <ul className="space-y-2">
                {categories['Básicos'].map(id => {
                  const model = receiptModels.find(m => m.id === id);
                  if (!model) return null;
                  return (
                    <li key={id}>
                      <Link to={`/${model.slug}`} className="text-sm text-emerald-100/70 hover:text-white transition-colors">
                        {model.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Profissionais</h3>
              <ul className="space-y-2">
                {categories['Profissionais'].slice(0, 5).map(id => {
                  const model = receiptModels.find(m => m.id === id);
                  if (!model) return null;
                  return (
                    <li key={id}>
                      <Link to={`/${model.slug}`} className="text-sm text-emerald-100/70 hover:text-white transition-colors">
                        {model.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Institucional</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/como-funciona" className="text-sm text-emerald-100/70 hover:text-white transition-colors">
                    Como Funciona
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-sm text-emerald-100/70 hover:text-white transition-colors">
                    Dúvidas Frequentes (FAQ)
                  </Link>
                </li>
                <li>
                  <Link to="/contato" className="text-sm text-emerald-100/70 hover:text-white transition-colors">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link to="/termos-de-uso" className="text-sm text-emerald-100/70 hover:text-white transition-colors">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link to="/politica-de-privacidade" className="text-sm text-emerald-100/70 hover:text-white transition-colors">
                    Política de Privacidade
                  </Link>
                </li>
              </ul>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mt-8 mb-4">Nosso Ecossistema</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://declaracaoonline.com.br" target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-100/70 hover:text-white transition-colors">
                    Declaração Online
                  </a>
                </li>
                <li>
                  <a href="https://geracontrato.com.br" target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-100/70 hover:text-white transition-colors">
                    Gera Contrato
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-emerald-900/50 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-sm text-emerald-100/60">
              &copy; 2024 - {currentYear} Recibo Grátis. Todos os direitos reservados.
            </p>
            <div className="text-sm text-emerald-100/60 md:text-right">
              <p>Gerido por <strong className="text-emerald-50">Elvis Dias</strong></p>
              <p>CNPJ: 43.027.941/0001-21 | Contato: (69) 98103-9664</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Fixed Bottom Navigation Bar (Sempre visível no celular) */}
      <nav 
        aria-label="Navegação inferior mobile"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 6px)' }}
      >
        <div className="flex items-center justify-around h-14 max-w-lg mx-auto px-1">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all ${
              location.pathname === '/'
                ? 'text-emerald-600 font-bold'
                : 'text-gray-500 hover:text-gray-900 font-medium'
            }`}
          >
            <div className={`p-1 rounded-xl transition-all ${location.pathname === '/' ? 'bg-emerald-50 text-emerald-600 scale-105' : ''}`}>
              <Home className="w-5 h-5" />
            </div>
            <span className="text-[11px] leading-tight mt-0.5 tracking-tight">
              Início
            </span>
          </Link>

          <Link
            to="/modelos"
            onClick={() => setIsMenuOpen(false)}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all ${
              location.pathname === '/modelos' || location.pathname.startsWith('/recibo-')
                ? 'text-emerald-600 font-bold'
                : 'text-gray-500 hover:text-gray-900 font-medium'
            }`}
          >
            <div className={`p-1 rounded-xl transition-all ${location.pathname === '/modelos' || location.pathname.startsWith('/recibo-') ? 'bg-emerald-50 text-emerald-600 scale-105' : ''}`}>
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-[11px] leading-tight mt-0.5 tracking-tight">
              Modelos
            </span>
          </Link>

          <Link
            to="/declaracoes"
            onClick={() => setIsMenuOpen(false)}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all ${
              location.pathname.startsWith('/declaracoes')
                ? 'text-emerald-600 font-bold'
                : 'text-gray-500 hover:text-gray-900 font-medium'
            }`}
          >
            <div className={`p-1 rounded-xl transition-all ${location.pathname.startsWith('/declaracoes') ? 'bg-emerald-50 text-emerald-600 scale-105' : ''}`}>
              <FileCheck2 className="w-5 h-5" />
            </div>
            <span className="text-[11px] leading-tight mt-0.5 tracking-tight">
              Declarações
            </span>
          </Link>

          <Link
            to="/ferramentas"
            onClick={() => setIsMenuOpen(false)}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all ${
              location.pathname === '/ferramentas' || location.pathname.startsWith('/calculadora-') || location.pathname.startsWith('/gerador-') || location.pathname.startsWith('/validador-') || location.pathname === '/valor-por-extenso'
                ? 'text-emerald-600 font-bold'
                : 'text-gray-500 hover:text-gray-900 font-medium'
            }`}
          >
            <div className={`p-1 rounded-xl transition-all ${location.pathname === '/ferramentas' || location.pathname.startsWith('/calculadora-') || location.pathname.startsWith('/gerador-') || location.pathname.startsWith('/validador-') || location.pathname === '/valor-por-extenso' ? 'bg-emerald-50 text-emerald-600 scale-105' : ''}`}>
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-[11px] leading-tight mt-0.5 tracking-tight">
              Ferramentas
            </span>
          </Link>

          {/* Menu Drawer Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all cursor-pointer ${
              isMenuOpen
                ? 'text-emerald-600 font-bold'
                : 'text-gray-500 hover:text-gray-900 font-medium'
            }`}
            aria-label={isMenuOpen ? "Fechar menu principal" : "Abrir menu principal"}
            aria-expanded={isMenuOpen}
          >
            <div className={`p-1 rounded-xl transition-all ${isMenuOpen ? 'bg-emerald-100 text-emerald-700 scale-105' : ''}`}>
              {isMenuOpen ? <X className="w-5 h-5 text-emerald-700" /> : <Menu className="w-5 h-5" />}
            </div>
            <span className="text-[11px] leading-tight mt-0.5 tracking-tight">
              {isMenuOpen ? 'Fechar' : 'Menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* Enhanced Full Mobile Drawer Menu Modal */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop overlay (tap to close) */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Container (Slide-up Bottom Sheet) */}
          <div 
            className="relative z-10 w-full max-h-[92vh] bg-white rounded-t-3xl shadow-2xl flex flex-col overflow-hidden border-t border-gray-200"
          >
            {/* Visual drag indicator */}
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 mb-1" />

            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-white">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-sm">
                  <FileText className="w-5 h-5 text-emerald-200" />
                </div>
                <div>
                  <span className="font-black text-lg text-gray-900 block leading-tight tracking-tight">Recibo Grátis</span>
                  <span className="text-xs text-gray-500 font-medium">Menu Principal de Navegação</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 flex items-center gap-1.5 font-bold text-sm transition-colors border border-gray-200 cursor-pointer shadow-sm"
                aria-label="Fechar menu"
              >
                <X className="w-5 h-5" />
                <span>Fechar</span>
              </button>
            </div>

            {/* Scrollable Content inside Drawer */}
            <div className="p-4 overflow-y-auto space-y-4 max-h-[calc(92vh-4.5rem)] overscroll-contain pb-24">
              
              {/* Search Bar in Drawer */}
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="w-full flex items-center gap-3 bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-3 rounded-2xl text-left font-medium text-sm transition-colors border border-gray-200 cursor-pointer shadow-inner"
              >
                <Search className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="flex-1 truncate">Buscar recibo, declaração ou ferramenta...</span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Buscar</span>
              </button>

              {/* Destaques Rápidos */}
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2 px-1">
                  Modelos Mais Usados
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/recibo-simples"
                    onClick={() => setIsMenuOpen(false)}
                    className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-200/70 px-2 py-0.5 rounded-full">Top 1</span>
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="font-bold text-sm text-emerald-950">Recibo Simples</span>
                    <span className="text-[11px] text-emerald-700/90 font-medium">Em PDF ou Word</span>
                  </Link>

                  <Link
                    to="/recibo-de-prestacao-de-servicos"
                    onClick={() => setIsMenuOpen(false)}
                    className="p-3 rounded-xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-blue-700 bg-blue-200/70 px-2 py-0.5 rounded-full">Serviços</span>
                      <Briefcase className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="font-bold text-sm text-blue-950">Prestação Serviços</span>
                    <span className="text-[11px] text-blue-700/90 font-medium">Mão de obra e taxas</span>
                  </Link>

                  <Link
                    to="/recibo-de-aluguel"
                    onClick={() => setIsMenuOpen(false)}
                    className="p-3 rounded-xl bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-colors flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-amber-700 bg-amber-200/70 px-2 py-0.5 rounded-full">Imóveis</span>
                      <Home className="w-4 h-4 text-amber-600" />
                    </div>
                    <span className="font-bold text-sm text-amber-950">Recibo de Aluguel</span>
                    <span className="text-[11px] text-amber-700/90 font-medium">Locatário e condomínio</span>
                  </Link>

                  <Link
                    to="/gerador-qr-code-pix"
                    onClick={() => setIsMenuOpen(false)}
                    className="p-3 rounded-xl bg-purple-50 border border-purple-200 hover:bg-purple-100 transition-colors flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-purple-700 bg-purple-200/70 px-2 py-0.5 rounded-full">PIX</span>
                      <Zap className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="font-bold text-sm text-purple-950">Gerador QR Pix</span>
                    <span className="text-[11px] text-purple-700/90 font-medium">Com valor e plaquinha</span>
                  </Link>
                </div>
              </div>

              {/* Seções do Portal */}
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2 px-1">
                  Navegação do Portal
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/modelos"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <FileText className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div className="truncate">
                      <span className="font-bold text-sm text-gray-900 block truncate">Todos os Modelos</span>
                      <span className="text-[11px] text-gray-500 font-medium">40+ Recibos</span>
                    </div>
                  </Link>

                  <Link
                    to="/declaracoes"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <FileCheck2 className="w-5 h-5 text-blue-600 shrink-0" />
                    <div className="truncate">
                      <span className="font-bold text-sm text-gray-900 block truncate">Declarações</span>
                      <span className="text-[11px] text-gray-500 font-medium">Modelos Prontos</span>
                    </div>
                  </Link>

                  <Link
                    to="/ferramentas"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <Wrench className="w-5 h-5 text-amber-600 shrink-0" />
                    <div className="truncate">
                      <span className="font-bold text-sm text-gray-900 block truncate">Ferramentas</span>
                      <span className="text-[11px] text-gray-500 font-medium">Calculadoras</span>
                    </div>
                  </Link>

                  <Link
                    to="/blog"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <BookOpen className="w-5 h-5 text-purple-600 shrink-0" />
                    <div className="truncate">
                      <span className="font-bold text-sm text-gray-900 block truncate">Nosso Blog</span>
                      <span className="text-[11px] text-gray-500 font-medium">Dicas & Leis</span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Categorias de Recibos em Accordion */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2 px-1">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Categorias de Recibos
                  </span>
                  <Link
                    to="/modelos"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-xs font-bold text-emerald-700 hover:underline"
                  >
                    Ver todos &rarr;
                  </Link>
                </div>

                <div className="space-y-2">
                  {Object.entries(categories).map(([category, ids]) => {
                    const isOpen = openMobileCategory === category;
                    return (
                      <div key={category} className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50/60 shadow-sm">
                        <button
                          type="button"
                          onClick={() => setOpenMobileCategory(isOpen ? null : category)}
                          className="w-full flex items-center justify-between p-3.5 text-left font-bold text-gray-800 hover:text-emerald-700 hover:bg-emerald-50/50 transition-colors cursor-pointer"
                        >
                          <span className="text-sm font-bold flex items-center gap-2">
                            {category}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-white px-2 py-0.5 rounded-full border border-gray-200">
                            <span>{ids.length}</span>
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-600' : ''}`} />
                          </span>
                        </button>

                        {isOpen && (
                          <div className="px-3 pb-3 pt-1 border-t border-gray-200/80 bg-white">
                            <ul className="space-y-1">
                              {ids.map(id => {
                                const model = receiptModels.find(m => m.id === id);
                                if (!model) return null;
                                return (
                                  <li key={id}>
                                    <Link
                                      to={`/${model.slug}`}
                                      onClick={() => setIsMenuOpen(false)}
                                      className="text-xs text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 block py-2 px-2.5 rounded-xl transition-colors font-medium flex items-center justify-between"
                                    >
                                      <span>{model.title}</span>
                                      <ChevronRight className="w-3.5 h-3.5 opacity-40 text-emerald-600" />
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Links Institucionais */}
              <div className="pt-2 border-t border-gray-200">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2 px-1">
                  Institucional & Suporte
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-gray-600">
                  <Link
                    to="/como-funciona"
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 hover:text-emerald-700 transition-colors flex items-center gap-1.5 border border-gray-200"
                  >
                    <HelpCircle className="w-4 h-4 text-emerald-600" />
                    <span>Como Funciona</span>
                  </Link>

                  <Link
                    to="/faq"
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 hover:text-emerald-700 transition-colors flex items-center gap-1.5 border border-gray-200"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Dúvidas (FAQ)</span>
                  </Link>

                  <Link
                    to="/contato"
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 hover:text-emerald-700 transition-colors flex items-center gap-1.5 border border-gray-200"
                  >
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>Fale Conosco</span>
                  </Link>

                  <Link
                    to="/termos-de-uso"
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 hover:text-emerald-700 transition-colors flex items-center gap-1.5 border border-gray-200"
                  >
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span>Termos & Privacidade</span>
                  </Link>
                </div>
              </div>

              {/* Redes Sociais */}
              <div className="pt-3 pb-6 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
                <span>© {currentYear} Recibo Grátis</span>
                <div className="flex items-center gap-3">
                  <a href="https://www.youtube.com/@Recibogratis" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-emerald-700 p-1.5 rounded-full hover:bg-gray-100" aria-label="YouTube">
                    <Youtube className="w-4 h-4" />
                  </a>
                  <a href="https://www.instagram.com/recibogratis" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-emerald-700 p-1.5 rounded-full hover:bg-gray-100" aria-label="Instagram">
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      <CookieBanner />
    </div>
  );
}
