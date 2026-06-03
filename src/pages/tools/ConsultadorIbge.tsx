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
        title="Consultar Código IBGE de Município Online"
        description="Consulte o código IBGE oficial atualizado da sua cidade ou município, exigido na emissão de Notas Fiscais Eletrônicas (NF-e, NFS-e)."
        keywords="codigo ibge, consultar ibge nfe, codigo municipio nota fiscal, lista ibge ceps"
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
          <h2>Entenda o Sistema IBGE, busca de Códigos de Município e XML de Notas Fiscais</h2>
          <p>Ao se profissionalizar e tentar emitir uma nova documentação tributária e comercial robusta pelo regime e barreiras burocráticas da SEFAZ, todas as interfaces federais e estaduais normativas no Brasil exigidas para a rotineira liberação oficial de um lote validado e pago de certidões vitais para fretes e vendas da sua operação tais quais a nota modelo <strong>NF-e (Nota Fiscal Eletrônica), NFC-e (Consumidor), NF-se (Serviços) ou seu CT-e (Transporte e Frete)</strong>, exigem estritas atitudes técnicas enclausuradas preenchendo as chamadas tags geográficas para faturamentos da base contábil base ali envolvida. Nesse cenário burocrático minucioso, o famoso e absoluto código numérico fechado restrito do <strong>IBGE (Instituto Brasileiro de Geografia e Estatística)</strong> abdicou do senso comum e tornou-se a irrevogável e oficial engrenagem chave primária central de alocação de endereço geográfico exigida para amparo do ecossistema e modelo comercial da emissão de guias SPED no mercado logístico financeiro empresarial.</p>

          <h3>Por que usar obrigatoriamente a base de dados em Código IBGE nacional ao invés do nome legível da própria cidade?</h3>
          <p>
             A complexidade imutável do Brasil gera rotineiros impasses contábeis de homônimos de municípios. Por exemplo, a cidade de <strong>"São Domingos" existe sob a mesma nomenclatura exata cruzando as barreiras regionais fiscais de Santa Catarina (SC), Bahia (BA), Sergipe (SE) e Goiás (GO).</strong>
          </p>
          <p>
             Ao tentar faturar a emissão de nota, referenciar puramente a string ou palavra destas cidades traria conflitos incalculáveis aos validadores e banco de dados de destinação e taxação do governo. Dessa forma blindada, os sete dígitos do código IBGE cruzam as barreiras com a certeza singularizada (ID único) do domicílio comercial.
          </p>

          <hr className="my-8" />
          
          <h2>Perguntas Frequentes (FAQ)</h2>
          
          <div className="space-y-4 not-prose mt-6">
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                Onde esse código geralmente é utilizado para cadastros?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                As referências absolutas deste gerador servem para inserção na guia e emissões de conhecimento de nota em sites estaduais municipais de emissão fiscal para PJ (MEI ou Limitadas). Eles servem e alimentam as tags exigidas pelo XML universal nacional: o &lt;cMun&gt; numérico contendo as posições de numeração exclusivas para designar origem primária e base de impostos.
              </p>
            </details>
            
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                Os dados aqui desta lista refletem a API original real?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Sim, os retornos são instantâneos da autoria do sistema central de localizações do servidor brasileiro, trazendo o mesmo padrão da documentação aberta da federação que lista 5.570 posições com extrema pontualidade estatística para suporte à prefeitura. Acessando com pesquisa direta do front end para garantir zero cache obsoleto e garantia para contadores e empreendedores com escritórios modernos online.
              </p>
            </details>
          </div>
        </div>
      </div>
    </>
  );
}
