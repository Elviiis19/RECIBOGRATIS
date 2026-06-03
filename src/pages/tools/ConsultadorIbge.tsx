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
      </div>
    </>
  );
}
