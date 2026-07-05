import {  useState, useEffect  } from 'react';
import { SEO } from '../../components/SEO';
import { AdSense } from '../../components/AdSense';
import { MapPin, Search, ChevronDown, ChevronUp, CheckCircle2, ShieldCheck, FileText } from 'lucide-react';

interface Municipio {
  id: string;
  nome: string;
  microrregiao: {
    mesorregiao: {
      UF: {
        sigla: string;
      }
    }
  }
}

export function ConsultadorIbge() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Municipio[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCity = async () => {
      if (searchTerm.length < 3) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios`);
        const data: Municipio[] = await response.json();
        const filtered = data.filter(city => 
          city.nome.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(0, 50); // Limit to 50 results
        setResults(filtered);
      } catch (error) {
        console.error("Erro ao buscar IBGE", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchCity();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <>
      <SEO 
        title="Consultar Código IBGE de Municípios e Estados (Tabela 2024)"
        description="Encontre o código numérico oficial de 7 dígitos de municípios brasileiros no IBGE. A consulta de código IBGE é essencial para a emissão de notas fiscais (NF-e, NFS-e)."
        keywords="consultar codigo ibge, codigo ibge municipio, tabela ibge cidades, codigo ibge para nf-e, cMun, ibge notas fiscais, codigo uf ibge"
        
      />
      <div className="bg-emerald-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <MapPin className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl font-extrabold mb-4">Código IBGE por Cidade</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Descubra o código do município oficial para emissão de Nota Fiscal Eletrônica (NF-e).
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <AdSense />
        
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 my-8">
          <div className="relative max-w-xl mx-auto mb-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
               <Search className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Digite o nome da cidade (Ex: São Paulo)..."
              className="w-full pl-12 pr-4 py-4 text-xl border rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500 font-medium transition-all"
            />
          </div>

          <div className="max-w-xl mx-auto">
            {loading && <div className="text-center text-gray-500 py-8">Buscando na base oficial do IBGE...</div>}
            
            {!loading && results.length > 0 && (
              <div className="bg-gray-50 rounded-2xl border overflow-hidden">
                <ul className="divide-y">
                  {results.map((city) => (
                    <li key={city.id} className="p-4 hover:bg-emerald-50 transition-colors flex justify-between items-center group">
                      <div>
                        <p className="font-bold text-gray-900 group-hover:text-emerald-800">{city.nome}</p>
                        <p className="text-sm text-gray-500">Estado: {city.microrregiao.mesorregiao.UF.sigla}</p>
                      </div>
                      <div className="bg-white px-4 py-2 rounded-xl shadow-sm border flex flex-col items-end">
                        <span className="text-[10px] text-gray-400 uppercase font-bold">Código IBGE</span>
                        <span className="font-mono text-emerald-700 font-bold text-lg">{city.id}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {!loading && searchTerm.length >= 3 && results.length === 0 && (
               <div className="text-center text-red-500 py-8 font-medium">Nenhuma cidade encontrada.</div>
            )}
            
            {searchTerm.length < 3 && (
               <div className="text-center text-gray-400 py-8">
                 Digite pelo menos 3 letras para começar a busca pela cidade.
               </div>
            )}
          </div>
        </div>

        <AdSense />
        
                    </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"O que é o Código de Município IBGE?","acceptedAnswer":{"@type":"Answer","text":"É uma sequência numérica única de 7 dígitos que identifica, sem margem a ambiguidades, cada um dos 5.570 municípios brasileiros e os 27 estados. É a chave primária geográfica do país."}},{"@type":"Question","name":"Onde o Código IBGE de 7 dígitos é utilizado?","acceptedAnswer":{"@type":"Answer","text":"O uso principal ocorre nas secretarias estaduais da fazenda (SEFAZ). Em toda emissão de conhecimento e documento fiscal brasileiro eletrônico (NF-e, NFS-e, NFC-e, CT-e), você não pode usar o nome da cidade no XML, sendo obrigatório preencher a tag &lt;cMun&gt; com o código de 7 dígitos."}},{"@type":"Question","name":"O que significa cada parte do código IBGE do Município?","acceptedAnswer":{"@type":"Answer","text":"Os dois primeiros dígitos referem-se à Unidade da Federação (UF/Estado). Os cinco dígitos seguintes determinam unicamente a cidade dentro desse estado. Por exemplo, em '3550308' (São Paulo-SP), o '35' representa o Estado de São Paulo."}}]}` }} />
      {/* SEO Content Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Por que consultar o Código IBGE de Municípios?
              </h2>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>O <strong>Consultador de Código IBGE</strong> é uma ferramenta imprescindível para profissionais de logística, tecnologia da informação, contadores e empreendedores em fase de parametrização de seus sistemas de emissão de faturamento ERP (como NF-e e CT-e) no ambiente da SEFAZ nacional.</p>
              </div>
            
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <MapPin className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Evitando problemas com municípios homônimos
              </h3>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>O Brasil possui uma grande complexidade e muitas cidades com o mesmo exato nome espalhadas por estados diferentes (ex: "Bom Jesus", "São Domingos"). Para o banco de dados do governo não correr riscos de taxar e atribuir ISS ou ICMS ao cofre da prefeitura/estado errado, a burocracia brasileira não usa textos abertos, e sim uma referência absoluta irrevogável: os <strong>7 dígitos da tabela IBGE</strong>.</p>
              </div>
            
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FileText className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Integração Tributária e Emissão de Notas Fiscais
              </h3>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>Quando uma empresa prestadora de serviços, autônoma ou LTDA é configurada num portal da prefeitura local, tanto o local da prestação do serviço, quanto o endereço das partes envolvidas exigirão que o código numérico (a famigerada tag <em>&lt;cMun&gt;</em> do XML) represente as posições únicas geográficas sem erros ou falhas de formatação sistêmica e pontual.</p>
              </div>
            
              </div>
            </article>

            <hr className="border-gray-100" />

            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-8">
                Perguntas Frequentes (FAQ)
              </h2>
              <div className="space-y-4">
                {[
                  {
                    question: "O que é o Código de Município IBGE?",
                    answer: "É uma sequência numérica única de 7 dígitos que identifica, sem margem a ambiguidades, cada um dos 5.570 municípios brasileiros e os 27 estados. É a chave primária geográfica do país."
                  },
                  {
                    question: "Onde o Código IBGE de 7 dígitos é utilizado?",
                    answer: "O uso principal ocorre nas secretarias estaduais da fazenda (SEFAZ). Em toda emissão de conhecimento e documento fiscal brasileiro eletrônico (NF-e, NFS-e, NFC-e, CT-e), você não pode usar o nome da cidade no XML, sendo obrigatório preencher a tag &lt;cMun&gt; com o código de 7 dígitos."
                  },
                  {
                    question: "O que significa cada parte do código IBGE do Município?",
                    answer: "Os dois primeiros dígitos referem-se à Unidade da Federação (UF/Estado). Os cinco dígitos seguintes determinam unicamente a cidade dentro desse estado. Por exemplo, em '3550308' (São Paulo-SP), o '35' representa o Estado de São Paulo."
                  }
                ].map((faq, index) => (
                  <div 
                    key={index} 
                    className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 hover:border-emerald-200 bg-white"
                  >
                    <button
                      type="button"
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-emerald-50/50 transition-colors"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      aria-expanded={openFaq === index}
                    >
                      <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                      {openFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    <div 
                      className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                        openFaq === index ? 'max-h-96 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
                      }`}
                    >
                      <p className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}