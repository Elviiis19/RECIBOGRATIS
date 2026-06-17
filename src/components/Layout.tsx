import { Link, Outlet } from 'react-router-dom';
import { FileText, Menu, X, ChevronDown, Zap, Youtube, Instagram, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { receiptModels } from '../data/receiptModels';
import { CookieBanner } from './CookieBanner';
import { SearchPalette } from './SearchPalette';

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Group models by category for the dropdown
  const categories = {
    'Básicos': ['simples', 'pagamento', 'quitacao', 'sinal'],
    'Profissionais': ['servicos', 'honorarios', 'mei', 'arquiteto', 'engenheiro', 'corretor', 'termo-de-prestacao-de-servico', 'prestacao-de-servico-com-logo', 'prestacao-com-garantia-e-logo'],
    'Saúde & Bem-estar': ['dentista', 'psicologo', 'fisioterapeuta', 'nutricionista', 'estetica'],
    'Serviços Domésticos': ['diarista', 'baba', 'cuidador', 'jardinagem'],
    'Manutenção & Obras': ['pedreiro', 'pintor', 'eletricista', 'encanador', 'mecanico', 'informatica'],
    'Outros': ['aluguel', 'recibo-de-aluguel-com-logo', 'compra-venda', 'pensao', 'doacao', 'adiantamento', 'salario', 'recibo-de-salario-com-logo', 'vale-transporte', 'vale-alimentacao', 'diaria', 'taxi-uber', 'frete', 'fotografo', 'professor', 'veterinario', 'pet-shop', 'costureira', 'promissoria', 'nota-promissoria-com-avalista', 'ordem-servico', 'ordem-de-servico-com-logo', 'orcamento']
  };

  const footerLinks = receiptModels.map(m => ({
    name: m.title,
    path: `/${m.slug}`
  }));

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      <SearchPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      <header className="sticky top-0 z-50 shadow-sm flex flex-col relative">
        {/* Top Bar with Logo, Search, and Main Links */}
        <div className="bg-emerald-800 text-white border-b border-emerald-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 sm:h-20 gap-4">
              
              {/* Left: Logo */}
              <div className="flex items-center flex-shrink-0 w-auto">
                <Link to="/" className="flex items-center gap-2 text-white hover:text-emerald-100 transition-colors">
                  <FileText className="h-7 w-7 sm:h-8 sm:w-8" />
                  <span className="font-bold text-xl sm:text-2xl tracking-tight hidden sm:block">Recibo Grátis</span>
                  <span className="font-bold text-xl tracking-tight sm:hidden">Recibo</span>
                </Link>
              </div>

              {/* Center: Search Button */}
              <div className="flex-1 max-w-xl flex justify-center mx-4">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center gap-2 sm:gap-3 w-full bg-emerald-900/60 hover:bg-emerald-900/90 border border-emerald-600/40 hover:border-emerald-500/60 text-emerald-50 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-inner group"
                  aria-label="Buscar modelos"
                >
                  <Search className="w-5 h-5 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity text-emerald-300" />
                  <span className="truncate text-left flex-1 font-medium text-sm sm:text-base pr-2">
                    Buscar modelos de recibo...
                  </span>
                  <span className="hidden lg:flex items-center gap-1.5 ml-auto text-xs font-mono font-bold text-emerald-200/90">
                    <kbd className="px-2 py-1 border border-emerald-700/60 rounded bg-emerald-800 shadow-sm">CTRL</kbd>
                    <kbd className="px-2 py-1 border border-emerald-700/60 rounded bg-emerald-800 shadow-sm">K</kbd>
                  </span>
                </button>
              </div>

              {/* Right: Desktop Links & Mobile Menu */}
              <div className="flex items-center justify-end flex-shrink-0 w-auto">
                
                {/* Desktop Main Links */}
                <nav aria-label="Navegação Secundária" className="hidden lg:flex items-center gap-6">
                  <Link 
                    to="/blog" 
                    className="text-sm font-semibold text-emerald-50 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                  <Link 
                    to="/como-funciona" 
                    className="text-sm font-semibold text-emerald-50 hover:text-white transition-colors"
                  >
                    Como Funciona
                  </Link>
                  
                  {/* Ferramentas Dropdown in Top Bar */}
                  <div className="relative group">
                    <button 
                      className="flex items-center gap-1 text-sm font-semibold text-emerald-50 hover:text-white transition-colors py-6"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <Zap className="w-4 h-4 text-emerald-300" />
                      Ferramentas
                      <ChevronDown className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                    </button>
                    {/* Dropdown Content */}
                    <div className="absolute top-[80%] right-0 w-80 bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-1 group-hover:translate-y-0 transition-all duration-200 ease-in-out z-50">
                      <div className="p-3 max-h-[75vh] overflow-y-auto custom-scrollbar text-left text-gray-900 font-normal">
                        <ul className="space-y-1">
                          <li>
                            <Link to="/gerador-qr-code-pix" className="text-sm text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 block py-2 px-3 rounded-lg transition-colors">
                              <div className="font-semibold mb-0.5">Gerador QR Code PIX</div>
                              <div className="text-xs text-gray-400">Gere códigos PIX e plaquinhas</div>
                            </Link>
                          </li>
                          <li>
                            <Link to="/ferramentas/gerador-pix-copia-e-cola" className="text-sm text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 block py-2 px-3 rounded-lg transition-colors">
                              <div className="font-semibold mb-0.5">PIX Copia e Cola</div>
                              <div className="text-xs text-gray-400">Gere links de cobrança PIX</div>
                            </Link>
                          </li>
                          <li>
                            <Link to="/ferramentas/valor-por-extenso" className="text-sm text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 block py-2 px-3 rounded-lg transition-colors">
                              Valor por Extenso
                            </Link>
                          </li>
                          <li>
                            <Link to="/ferramentas/calculadora-retencao-impostos" className="text-sm text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 block py-2 px-3 rounded-lg transition-colors">
                              Calculadora de Retenção de Impostos
                            </Link>
                          </li>
                          <li>
                            <Link to="/ferramentas/calculadora-desconto-multa" className="text-sm text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 block py-2 px-3 rounded-lg transition-colors">
                              Calculadora de Descontos e Multas
                            </Link>
                          </li>
                          <li>
                            <Link to="/ferramentas/calculadora-maquininha-cartao" className="text-sm text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 block py-2 px-3 rounded-lg transition-colors">
                              Calculadora de Taxas de Maquininha
                            </Link>
                          </li>
                          <li>
                            <Link to="/ferramentas/calculadora-dias-uteis" className="text-sm text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 block py-2 px-3 rounded-lg transition-colors">
                              Calculadora de Dias Úteis
                            </Link>
                          </li>
                          <li>
                            <Link to="/ferramentas/conversor-horas-trabalhadas" className="text-sm text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 block py-2 px-3 rounded-lg transition-colors">
                              Conversor de Horas p/ Valor Mensal
                            </Link>
                          </li>
                          <li>
                            <Link to="/ferramentas/validador-formatador-cpf-cnpj" className="text-sm text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 block py-2 px-3 rounded-lg transition-colors">
                              Formatador e Validador de CPF/CNPJ
                            </Link>
                          </li>
                          <li>
                            <Link to="/ferramentas/consultador-codigo-ibge" className="text-sm text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 block py-2 px-3 rounded-lg transition-colors">
                              Consultador de Código IBGE
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </nav>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="xl:hidden text-emerald-50 hover:text-white focus:outline-none ml-2 p-1.5 rounded-lg hover:bg-emerald-700/50 transition-colors"
                  aria-label="Menu principal"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Categories Navigation */}
        <div className="bg-white border-b border-gray-200 hidden lg:block shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav aria-label="Menu Principal" itemScope itemType="https://schema.org/SiteNavigationElement" className="flex items-center justify-center space-x-6 xl:space-x-8">
              {Object.entries(categories).map(([category, ids]) => (
                <div key={category} className="relative group">
                  <button 
                    className="flex items-center gap-1.5 text-[15px] font-bold text-gray-700 hover:text-emerald-600 transition-colors py-3.5"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {category}
                    <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </button>
                  
                  <div className={`absolute top-full ${category === 'Outros' ? 'right-0 w-[420px]' : 'left-1/2 -translate-x-1/2 w-64'} bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-1 group-hover:translate-y-0 transition-all duration-200 ease-in-out z-50 text-left`}>
                    <div className="p-3 max-h-[75vh] overflow-y-auto custom-scrollbar font-normal">
                      <ul className={category === 'Outros' ? 'grid grid-cols-2 gap-x-2 gap-y-1' : 'space-y-1'}>
                        {ids.map(id => {
                          const model = receiptModels.find(m => m.id === id);
                          if (!model) return null;
                          return (
                            <li key={id}>
                              <Link 
                                itemProp="url"
                                to={`/${model.slug}`}
                                className="text-sm text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 block py-2 px-3 rounded-lg transition-colors"
                              >
                                <span itemProp="name">{model.title}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="xl:hidden bg-white border-b border-gray-100 max-h-[80vh] overflow-y-auto w-full absolute top-full left-0 z-40 shadow-xl">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-bold text-emerald-700 hover:bg-emerald-50 border-b border-gray-50 mb-2"
              >
                Página Inicial (Todos os Modelos)
              </Link>
              <Link
                to="/blog"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-bold text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
              >
                Nosso Blog
              </Link>
              <Link
                to="/como-funciona"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-bold text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
              >
                Como Funciona
              </Link>
              <div className="pt-4 pb-2">
                <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Ferramentas
                </p>
              </div>
              <Link to="/gerador-qr-code-pix" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-emerald-700 hover:bg-gray-50">Gerador QR Code PIX</Link>
              <Link to="/ferramentas/gerador-pix-copia-e-cola" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-emerald-700 hover:bg-gray-50">Gerador PIX Copia e Cola</Link>
              <Link to="/ferramentas/valor-por-extenso" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-emerald-700 hover:bg-gray-50">Valor por Extenso</Link>
              <Link to="/ferramentas/calculadora-retencao-impostos" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-emerald-700 hover:bg-gray-50">Retenção de Impostos</Link>
              <Link to="/ferramentas/calculadora-desconto-multa" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-emerald-700 hover:bg-gray-50">Descontos e Multas</Link>
              <Link to="/ferramentas/calculadora-maquininha-cartao" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-emerald-700 hover:bg-gray-50">Taxas de Maquininha</Link>
              <Link to="/ferramentas/calculadora-dias-uteis" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-emerald-700 hover:bg-gray-50">Dias Úteis</Link>
              <Link to="/ferramentas/conversor-horas-trabalhadas" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-emerald-700 hover:bg-gray-50">Horas p/ Valor Monetário</Link>
              <Link to="/ferramentas/validador-formatador-cpf-cnpj" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-emerald-700 hover:bg-gray-50">Validador de CPF/CNPJ</Link>
              <Link to="/ferramentas/consultador-codigo-ibge" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-emerald-700 hover:bg-gray-50">Consultador Código IBGE</Link>
              
              <div className="pt-6 pb-2">
                <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Modelos de Recibo
                </p>
              </div>
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-emerald-700 hover:bg-gray-50"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

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
                <a href="https://www.youtube.com/@Recibogratis" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-white transition-colors flex items-center justify-center p-2 rounded-full bg-emerald-900/50 hover:bg-emerald-800" aria-label="Canal do Youtube">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/recibogratis" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-white transition-colors flex items-center justify-center p-2 rounded-full bg-emerald-900/50 hover:bg-emerald-800" aria-label="Nosso Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
              
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Ferramentas Extras</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/gerador-qr-code-pix" className="text-sm font-medium text-emerald-400 hover:text-white flex items-center gap-1 transition-colors">
                    Gerador de QR Code PIX
                  </Link>
                </li>
                <li><Link to="/ferramentas/valor-por-extenso" className="text-sm text-emerald-100/70 hover:text-white transition-colors">Valor por Extenso</Link></li>
                <li><Link to="/ferramentas/calculadora-retencao-impostos" className="text-sm text-emerald-100/70 hover:text-white transition-colors">Calculadora de Retenção de Impostos</Link></li>
                <li><Link to="/ferramentas/calculadora-desconto-multa" className="text-sm text-emerald-100/70 hover:text-white transition-colors">Descontos e Multas</Link></li>
                <li><Link to="/ferramentas/calculadora-maquininha-cartao" className="text-sm text-emerald-100/70 hover:text-white transition-colors">Taxas de Maquininha</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Mais Usados</h3>
              <ul className="space-y-2">
                {footerLinks.slice(0, 8).map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-sm text-emerald-100/70 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Profissionais</h3>
              <ul className="space-y-2">
                {footerLinks.slice(8, 16).map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-sm text-emerald-100/70 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Institucional</h3>
              <ul className="space-y-2 mb-6">
                <li><Link to="/como-funciona" className="text-sm text-emerald-100/70 hover:text-white transition-colors">Como Funciona</Link></li>
                <li><Link to="/blog" className="text-sm inline-flex items-center gap-1 font-bold text-emerald-400 hover:text-white transition-colors">Nosso Blog</Link></li>
                <li><Link to="/faq" className="text-sm text-emerald-100/70 hover:text-white transition-colors">Perguntas Frequentes (FAQ)</Link></li>
                <li><Link to="/termos-de-uso" className="text-sm text-emerald-100/70 hover:text-white transition-colors">Termos de Uso</Link></li>
                <li><Link to="/politica-de-privacidade" className="text-sm text-emerald-100/70 hover:text-white transition-colors">Política de Privacidade</Link></li>
                <li><Link to="/contato" className="text-sm text-emerald-100/70 hover:text-white transition-colors">Contato</Link></li>
              </ul>

              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Nosso Ecossistema</h3>
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
              &copy; 2024 - {new Date().getFullYear()} Recibo Grátis. Todos os direitos reservados.
            </p>
            <div className="text-sm text-emerald-100/60 md:text-right">
              <p>Gerido por <strong className="text-emerald-50">Elvis Dias</strong></p>
              <p>CNPJ: 43.027.941/0001-21 | Contato: (69) 98103-9664</p>
            </div>
          </div>
        </div>
      </footer>
      <CookieBanner />
    </div>
  );
}

