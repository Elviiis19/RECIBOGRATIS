import { Link, Outlet } from 'react-router-dom';
import { FileText, Menu, X, ChevronDown, Zap } from 'lucide-react';
import { useState } from 'react';
import { receiptModels } from '../data/receiptModels';
import { CookieBanner } from './CookieBanner';

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Group models by category for the dropdown
  const categories = {
    'Básicos': ['simples', 'pagamento', 'quitacao', 'sinal'],
    'Profissionais': ['servicos', 'honorarios', 'mei', 'arquiteto', 'engenheiro', 'corretor', 'termo-de-prestacao-de-servico', 'prestacao-de-servico-com-logo', 'prestacao-com-garantia-e-logo'],
    'Saúde & Bem-estar': ['dentista', 'psicologo', 'fisioterapeuta', 'nutricionista', 'estetica'],
    'Serviços Domésticos': ['diarista', 'baba', 'cuidador', 'jardinagem'],
    'Manutenção & Obras': ['pedreiro', 'pintor', 'eletricista', 'encanador', 'mecanico', 'informatica'],
    'Outros': ['aluguel', 'recibo-de-aluguel-com-logo', 'compra-venda', 'pensao', 'doacao', 'adiantamento', 'salario', 'recibo-de-salario-com-logo', 'vale-transporte', 'diaria', 'taxi-uber', 'frete', 'fotografo', 'professor', 'veterinario', 'pet-shop', 'costureira', 'promissoria', 'nota-promissoria-com-avalista', 'ordem-servico', 'ordem-de-servico-com-logo', 'orcamento']
  };

  const footerLinks = receiptModels.map(m => ({
    name: m.title,
    path: `/${m.slug}`
  }));

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors">
                <FileText className="h-8 w-8" />
                <span className="font-bold text-xl tracking-tight">Recibo Grátis</span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              
              {Object.entries(categories).map(([category, ids]) => (
                <div key={category} className="relative group">
                  <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors py-5">
                    {category}
                    <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </button>
                  
                  <div className={`absolute top-full ${category === 'Outros' ? 'right-0 w-[420px]' : 'left-1/2 -translate-x-1/2 w-64'} bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-200 ease-in-out z-50`}>
                    <div className="p-3 max-h-[75vh] overflow-y-auto custom-scrollbar">
                      <ul className={category === 'Outros' ? 'grid grid-cols-2 gap-x-2 gap-y-1' : 'space-y-1'}>
                        {ids.map(id => {
                          const model = receiptModels.find(m => m.id === id);
                          if (!model) return null;
                          return (
                            <li key={id}>
                              <Link 
                                to={`/${model.slug}`}
                                className="text-sm text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 block py-2 px-3 rounded-lg transition-colors"
                              >
                                {model.title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}

              <div className="relative group">
                <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors py-5">
                  <Zap className="w-4 h-4 text-emerald-600" />
                  Ferramentas
                  <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </button>
                <div className="absolute top-full right-0 w-80 bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-200 ease-in-out z-50">
                  <div className="p-3 max-h-[75vh] overflow-y-auto custom-scrollbar">
                    <ul className="space-y-1">
                      <li>
                        <Link to="/gerador-qr-code-pix" className="text-sm text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 block py-2 px-3 rounded-lg transition-colors">
                          <div className="font-semibold mb-1">QR Code PIX e Cobrança</div>
                          <div className="text-xs text-gray-400">Gere códigos PIX para pagamentos</div>
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
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Menu principal"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 max-h-[80vh] overflow-y-auto">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-bold text-emerald-700 hover:bg-emerald-50"
              >
                Página Inicial (Todos os Modelos)
              </Link>
              <div className="pt-4 pb-2">
                <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Ferramentas
                </p>
              </div>
              <Link to="/gerador-qr-code-pix" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50">Gerador QR Code PIX</Link>
              <Link to="/ferramentas/valor-por-extenso" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50">Valor por Extenso</Link>
              <Link to="/ferramentas/calculadora-retencao-impostos" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50">Retenção de Impostos</Link>
              <Link to="/ferramentas/calculadora-desconto-multa" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50">Calculadora de Descontos e Multas</Link>
              <Link to="/ferramentas/calculadora-maquininha-cartao" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50">Taxas de Maquininha</Link>
              <Link to="/ferramentas/calculadora-dias-uteis" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50">Dias Úteis</Link>
              <Link to="/ferramentas/conversor-horas-trabalhadas" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50">Horas p/ Valor Monetário</Link>
              <Link to="/ferramentas/validador-formatador-cpf-cnpj" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50">Validador de CPF/CNPJ</Link>
              <Link to="/ferramentas/consultador-codigo-ibge" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50">Consultador Código IBGE</Link>
              <div className="pt-4 pb-2">
                <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Modelos de Recibo
                </p>
              </div>
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
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

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-2 text-emerald-600 mb-4">
                <FileText className="h-6 w-6" />
                <span className="font-bold text-lg">Recibo Grátis</span>
              </Link>
              <p className="text-sm text-gray-500 mb-4 max-w-sm">
                Gere recibos online de forma rápida, segura e totalmente gratuita. Sem necessidade de cadastro.
              </p>
              <p className="text-xs text-gray-500 mb-6">
                Idealizado por <strong>Elvis Dias</strong>
              </p>
              
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Ferramentas Extras</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/gerador-qr-code-pix" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                    Gerador de QR Code PIX
                  </Link>
                </li>
                <li><Link to="/ferramentas/valor-por-extenso" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Valor por Extenso</Link></li>
                <li><Link to="/ferramentas/calculadora-retencao-impostos" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Calculadora de Retenção de Impostos</Link></li>
                <li><Link to="/ferramentas/calculadora-desconto-multa" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Descontos e Multas</Link></li>
                <li><Link to="/ferramentas/calculadora-maquininha-cartao" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Taxas de Maquininha</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Mais Usados</h3>
              <ul className="space-y-2">
                {footerLinks.slice(0, 8).map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Profissionais</h3>
              <ul className="space-y-2">
                {footerLinks.slice(8, 16).map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Institucional</h3>
              <ul className="space-y-2 mb-6">
                <li><Link to="/faq" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Perguntas Frequentes (FAQ)</Link></li>
                <li><Link to="/termos-de-uso" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Termos de Uso</Link></li>
                <li><Link to="/politica-de-privacidade" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Política de Privacidade</Link></li>
                <li><Link to="/contato" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Contato</Link></li>
              </ul>

              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Nosso Ecossistema</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://declaracaoonline.com.br" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                    Declaração Online
                  </a>
                </li>
                <li>
                  <a href="https://geracontrato.com.br" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                    Gera Contrato
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Recibo Grátis. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
      <CookieBanner />
    </div>
  );
}
