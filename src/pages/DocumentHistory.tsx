import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { 
  FileText, 
  Trash2, 
  Copy, 
  ExternalLink, 
  Search, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  Share2, 
  Download, 
  CheckCircle2, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { 
  getSavedDocuments, 
  deleteDocument, 
  clearAllDocuments, 
  setDocumentToDuplicate, 
  SavedDocument 
} from '../utils/documentHistory';

export function DocumentHistory() {
  const [documents, setDocuments] = useState<SavedDocument[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'recibo' | 'declaracao' | 'contrato'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const navigate = useNavigate();

  const loadDocs = () => {
    setDocuments(getSavedDocuments());
  };

  useEffect(() => {
    loadDocs();
    const handleUpdate = () => loadDocs();
    window.addEventListener('rg-documents-updated', handleUpdate);
    return () => window.removeEventListener('rg-documents-updated', handleUpdate);
  }, []);

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Deseja realmente excluir o documento "${title}" do seu histórico local?`)) {
      deleteDocument(id);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Tem certeza de que deseja apagar todo o histórico de documentos deste navegador? Esta ação não pode ser desfeita.')) {
      clearAllDocuments();
    }
  };

  const handleDuplicate = (doc: SavedDocument) => {
    setDocumentToDuplicate(doc);
    navigate(doc.url);
  };

  const handleReopen = (doc: SavedDocument) => {
    // Store in session to prefill exact data
    sessionStorage.setItem('rg_prefill_document', JSON.stringify({
      ...doc,
      isDuplicate: false,
    }));
    navigate(doc.url);
  };

  const handleShareWhatsApp = (doc: SavedDocument) => {
    const text = `*Comprovante: ${doc.title}*${doc.valor ? `\n*Valor:* R$ ${doc.valor}` : ''}${doc.pagador ? `\n*Pagador:* ${doc.pagador}` : ''}${doc.recebedor ? `\n*Recebedor:* ${doc.recebedor}` : ''}${doc.descricao ? `\n*Referente:* ${doc.descricao}` : ''}\n\n_Gerado e quitado com suporte em recibogratis.com.br_`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const filteredDocs = documents.filter((doc) => {
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    const query = search.toLowerCase();
    const matchesSearch = 
      !query ||
      doc.title.toLowerCase().includes(query) ||
      (doc.pagador && doc.pagador.toLowerCase().includes(query)) ||
      (doc.recebedor && doc.recebedor.toLowerCase().includes(query)) ||
      (doc.descricao && doc.descricao.toLowerCase().includes(query)) ||
      (doc.valor && doc.valor.includes(query));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <SEO 
        title="Meus Documentos Salvos | Histórico de Recibos | Recibo Grátis"
        description="Acesse e gerencie seus recibos e declarações gerados. Duplique documentos com 1 clique, compartilhe no WhatsApp ou reabra sem custos ou marcas d'água."
        url="https://recibogratis.com.br/meus-documentos"
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-800 text-white py-10 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-700/50 backdrop-blur-md px-3.5 py-1.5 rounded-full text-emerald-200 text-xs font-semibold mb-3 border border-emerald-500/30">
                <Clock className="w-3.5 h-3.5" />
                <span>Histórico Local no Navegador</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Meus Documentos
              </h1>
              <p className="mt-2 text-emerald-100 text-sm sm:text-base max-w-2xl">
                Visualize, reabra, duplique e compartilhe todos os comprovantes e recibos que você já gerou neste aparelho.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link 
                to="/recibo-simples" 
                className="bg-white text-emerald-900 hover:bg-emerald-50 font-bold px-5 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 text-sm"
              >
                <FileText className="w-4 h-4 text-emerald-700" />
                <span>Novo Recibo</span>
              </Link>
              <Link 
                to="/modelos" 
                className="bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-400/30 text-white font-semibold px-4 py-3 rounded-xl backdrop-blur-md transition-all flex items-center gap-2 text-sm"
              >
                <span>Ver Todos Modelos</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Superioridade vs Concorrente: Destaque de Gratuidade e Privacidade */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-gray-100 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900">
                100% Gratuito e Sem Marca d'Água
              </h2>
              <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                Aqui você não paga mensalidades nem taxas avulsas para tirar marca d'água. Emita, duplique e baixe quantos documentos precisar.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900">
                Privacidade Total no seu Aparelho (LGPD)
              </h2>
              <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                Seus dados ficam gravados exclusivamente na memória do seu próprio navegador. Nenhum CPF ou valor é enviado para bancos de dados externos.
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Buscar por pagador, recebedor ou tipo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${categoryFilter === 'all' ? 'bg-emerald-700 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Todos ({documents.length})
            </button>
            <button
              onClick={() => setCategoryFilter('recibo')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${categoryFilter === 'recibo' ? 'bg-emerald-700 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Recibos ({documents.filter(d => d.category === 'recibo').length})
            </button>
            <button
              onClick={() => setCategoryFilter('declaracao')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${categoryFilter === 'declaracao' ? 'bg-emerald-700 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Declarações ({documents.filter(d => d.category === 'declaracao').length})
            </button>
            {documents.some(d => d.category === 'contrato') && (
              <button
                onClick={() => setCategoryFilter('contrato')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${categoryFilter === 'contrato' ? 'bg-emerald-700 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                Contratos ({documents.filter(d => d.category === 'contrato').length})
              </button>
            )}

            {documents.length > 0 && (
              <button
                onClick={handleClearAll}
                className="ml-auto text-xs text-red-600 hover:text-red-700 font-medium px-3 py-1.5 rounded-xl hover:bg-red-50 transition-colors flex items-center gap-1 shrink-0"
                title="Limpar todos os documentos salvos"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Limpar Tudo</span>
              </button>
            )}
          </div>
        </div>

        {/* Content Section */}
        {documents.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 sm:p-16 text-center border border-gray-200 shadow-sm">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Você ainda não gerou documentos neste aparelho
            </h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
              Assim que você preencher e gerar um recibo ou declaração em PDF, ele será salvo automaticamente aqui para você consultar, duplicar e imprimir sempre que quiser.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link 
                to="/recibo-simples"
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md text-sm"
              >
                Criar Recibo Simples
              </Link>
              <Link 
                to="/recibo-pix"
                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold px-6 py-3 rounded-xl transition-all text-sm border border-emerald-200"
              >
                Criar Recibo Pix
              </Link>
            </div>
          </div>
        ) : filteredDocs.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-gray-200 shadow-sm">
            <AlertCircle className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-gray-900 mb-1">
              Nenhum documento encontrado para "{search}"
            </h3>
            <p className="text-gray-500 text-xs mb-4">
              Tente pesquisar por outro termo ou limpe o filtro.
            </p>
            <button
              onClick={() => { setSearch(''); setCategoryFilter('all'); }}
              className="text-emerald-700 hover:text-emerald-800 text-xs font-semibold underline"
            >
              Limpar busca
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDocs.map((doc) => (
              <div 
                key={doc.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-emerald-50 text-emerald-800 font-bold text-xs px-2.5 py-1 rounded-lg border border-emerald-200">
                      {doc.title}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                      <Clock className="w-3 h-3" />
                      {doc.formattedDate}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50/70 px-2 py-0.5 rounded-md font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      Sem Marca d'Água
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-3 text-sm">
                    {doc.valor && (
                      <div>
                        <span className="text-gray-400 text-xs block">Valor:</span>
                        <span className="font-extrabold text-emerald-800 text-base">
                          R$ {doc.valor}
                        </span>
                      </div>
                    )}

                    {doc.pagador && (
                      <div>
                        <span className="text-gray-400 text-xs block">Pagador:</span>
                        <span className="font-semibold text-gray-800 truncate block">
                          {doc.pagador}
                        </span>
                      </div>
                    )}

                    {doc.recebedor && (
                      <div>
                        <span className="text-gray-400 text-xs block">Recebedor:</span>
                        <span className="font-semibold text-gray-800 truncate block">
                          {doc.recebedor}
                        </span>
                      </div>
                    )}
                  </div>

                  {doc.descricao && (
                    <p className="text-xs text-gray-500 mt-2 line-clamp-1 italic">
                      "{doc.descricao}"
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100 shrink-0">
                  <button
                    onClick={() => handleDuplicate(doc)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors border border-emerald-200"
                    title="Duplica este recibo com a data de hoje"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Duplicar</span>
                  </button>

                  <button
                    onClick={() => handleReopen(doc)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-colors shadow-sm"
                    title="Reabrir gerador com os dados deste comprovante"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Reabrir</span>
                  </button>

                  <button
                    onClick={() => handleShareWhatsApp(doc)}
                    className="p-2 text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-xl transition-colors border border-gray-200"
                    title="Enviar resumo pelo WhatsApp"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(doc.id, doc.title)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    title="Excluir do histórico"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
