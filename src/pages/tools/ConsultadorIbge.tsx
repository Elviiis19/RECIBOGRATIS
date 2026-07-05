import { useState, useEffect } from 'react';
import { SEO } from '../../components/SEO';
import { AdSense } from '../../components/AdSense';
import { MapPin, Search } from 'lucide-react';

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
        schema={`{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"O que é o Código de Município IBGE?","acceptedAnswer":{"@type":"Answer","text":"É uma sequência numérica única de 7 dígitos que identifica, sem margem a ambiguidades, cada um dos 5.570 municípios brasileiros e os 27 estados. É a chave primária geográfica do país."}},{"@type":"Question","name":"Onde o Código IBGE de 7 dígitos é utilizado?","acceptedAnswer":{"@type":"Answer","text":"O uso principal ocorre nas secretarias estaduais da fazenda (SEFAZ). Em toda emissão de conhecimento e documento fiscal brasileiro eletrônico (NF-e, NFS-e, NFC-e, CT-e), você não pode usar o nome da cidade no XML, sendo obrigatório preencher a tag &lt;cMun&gt; com o código de 7 dígitos."}},{"@type":"Question","name":"O que significa cada parte do código IBGE do Município?","acceptedAnswer":{"@type":"Answer","text":"Os dois primeiros dígitos referem-se à Unidade da Federação (UF/Estado). Os cinco dígitos seguintes determinam unicamente a cidade dentro desse estado. Por exemplo, em '3550308' (São Paulo-SP), o '35' representa o Estado de São Paulo."}}]}`}
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
        
        <div className="prose prose-emerald max-w-none mt-12 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <h2>Por que consultar o Código IBGE de Municípios?</h2>
<p>O <strong>Consultador de Código IBGE</strong> é uma ferramenta imprescindível para profissionais de logística, tecnologia da informação, contadores e empreendedores em fase de parametrização de seus sistemas de emissão de faturamento ERP (como NF-e e CT-e) no ambiente da SEFAZ nacional.</p>

<h3>Evitando problemas com municípios homônimos</h3>
<p>O Brasil possui uma grande complexidade e muitas cidades com o mesmo exato nome espalhadas por estados diferentes (ex: "Bom Jesus", "São Domingos"). Para o banco de dados do governo não correr riscos de taxar e atribuir ISS ou ICMS ao cofre da prefeitura/estado errado, a burocracia brasileira não usa textos abertos, e sim uma referência absoluta irrevogável: os <strong>7 dígitos da tabela IBGE</strong>.</p>

<h3>Integração Tributária e Emissão de Notas Fiscais</h3>
<p>Quando uma empresa prestadora de serviços, autônoma ou LTDA é configurada num portal da prefeitura local, tanto o local da prestação do serviço, quanto o endereço das partes envolvidas exigirão que o código numérico (a famigerada tag <em>&lt;cMun&gt;</em> do XML) represente as posições únicas geográficas sem erros ou falhas de formatação sistêmica e pontual.</p>
          
          <hr className="my-8" />
          
          <h2>Perguntas Frequentes (FAQ)</h2>
          <div className="space-y-4 not-prose mt-6">

            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                O que é o Código de Município IBGE?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: `É uma sequência numérica única de 7 dígitos que identifica, sem margem a ambiguidades, cada um dos 5.570 municípios brasileiros e os 27 estados. É a chave primária geográfica do país.` }} />
            </details>
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                Onde o Código IBGE de 7 dígitos é utilizado?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: `O uso principal ocorre nas secretarias estaduais da fazenda (SEFAZ). Em toda emissão de conhecimento e documento fiscal brasileiro eletrônico (NF-e, NFS-e, NFC-e, CT-e), você não pode usar o nome da cidade no XML, sendo obrigatório preencher a tag &lt;cMun&gt; com o código de 7 dígitos.` }} />
            </details>
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                O que significa cada parte do código IBGE do Município?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: `Os dois primeiros dígitos referem-se à Unidade da Federação (UF/Estado). Os cinco dígitos seguintes determinam unicamente a cidade dentro desse estado. Por exemplo, em '3550308' (São Paulo-SP), o '35' representa o Estado de São Paulo.` }} />
            </details>
          </div>
        </div>
      </div>
    </>
  );
}