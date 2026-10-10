import { useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "../../components/SEO";
import { contractModels } from "../../data/contractModels";
import {
  FileCheck,
  Search,
  Scale,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  FileText
} from "lucide-react";
import { AdSense } from "../../components/AdSense";
import { AdsKeeper } from "../../components/AdsKeeper";

export function ContractIndex() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", "Serviços", "Imóveis", "Veículos", "Negócios"];

  const filteredContracts = contractModels.filter((model) => {
    const matchesSearch =
      model.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.keywords.some((k) => k.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === "all" || model.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const pageTitle = "Pequenos Contratos de 1 Página (Sem Juridiquês) | Gerador em PDF Grátis";
  const pageDescription =
    "Modelos prontos de pequenos contratos de 1 página A4 para preencher e imprimir grátis em PDF. Prestação de serviços, aluguel residencial, venda de veículos, diarista e empreitada com validade jurídica.";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Início",
            "item": "https://recibogratis.com.br",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Contratos",
            "item": "https://recibogratis.com.br/contratos",
          },
        ],
      },
      {
        "@type": "ItemList",
        "name": "Modelos de Pequenos Contratos de 1 Página",
        "description": pageDescription,
        "itemListElement": contractModels.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.title,
          "url": `https://recibogratis.com.br/${item.slug}`,
        })),
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Um contrato de apenas 1 página tem validade jurídica no Brasil?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim. A lei civil brasileira (Código Civil, Arts. 104 e 421) não estipula número mínimo de páginas. Desde que conste a qualificação das partes, o objeto, o preço e a manifestação de vontade com assinaturas, o contrato é 100% válido.",
            },
          },
          {
            "@type": "Question",
            "name": "Como transformar o contrato de 1 página em Título Executivo?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Basta que o documento particular seja assinado por duas testemunhas com nome e CPF, conforme determina expressamente o Artigo 784, inciso III, do Código de Processo Civil.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SEO
        title={pageTitle}
        description={pageDescription}
        url="https://recibogratis.com.br/contratos"
        schema={JSON.stringify(schema)}
      />

      {/* Hero Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-6">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Sem Juridiquês • Cabe em 1 Folha A4 • Impressão e PDF Grátis</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight max-w-4xl mx-auto mb-6">
            Pequenos Contratos de 1 Página
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Feche negócios, serviços, vendas e aluguéis na hora sem assustar clientes com documentos de 10 páginas. Modelos sintéticos, objetivos e 100% amparados pelo Código Civil Brasileiro.
          </p>

          {/* Search Box */}
          <div className="max-w-xl mx-auto relative mb-6">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar contrato (ex: prestação de serviços, aluguel, veículo, diarista...)"
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm transition-all"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-emerald-700 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat === "all" ? "Todos os Contratos" : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Contracts Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredContracts.map((model) => (
            <Link
              key={model.id}
              to={`/${model.slug}`}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 hover:border-emerald-300 hover:shadow-xl transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                    {model.category}
                  </span>
                  <span className="text-[11px] font-medium text-gray-400">1 Página A4</span>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-emerald-100/60 text-emerald-800 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <FileCheck className="w-6 h-6" />
                </div>

                <h2 className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors mb-2">
                  {model.title}
                </h2>

                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-6">
                  {model.shortDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
                <span>Preencher e Baixar PDF</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {filteredContracts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 p-8 max-w-md mx-auto">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-800 mb-1">Nenhum contrato encontrado</h3>
            <p className="text-xs text-gray-500 mb-4">
              Não encontramos nenhum contrato para "{searchTerm}".
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="text-xs font-bold text-emerald-700 underline"
            >
              Limpar busca
            </button>
          </div>
        )}

        <AdsKeeper className="mb-12" />
        <AdSense slot="9876543210" className="mb-16" />

        {/* Informative Pillar Strategy Box */}
        <section className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-sm mb-16">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 text-center">
              Por que usar Pequenos Contratos de 1 Página?
            </h2>

            <p className="text-gray-600 leading-relaxed text-center">
              No Brasil, muitos negócios entre autônomos, prestadores, MEIs e clientes deixam de ser formalizados porque as pessoas têm receio de assinar minutas longas e cheias de jargões jurídicos. O contrato sintético de 1 folha A4 soluciona esse impasse:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-2 font-bold text-gray-900 text-sm mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Fechamento Imediato</span>
                </div>
                <p className="text-xs text-gray-500">
                  O cliente lê em 1 minuto e assina na hora pelo celular ou impresso, sem hesitação.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-2 font-bold text-gray-900 text-sm mb-1">
                  <Scale className="w-4 h-4 text-emerald-600" />
                  <span>Título Executivo Judicial</span>
                </div>
                <p className="text-xs text-gray-500">
                  Com a assinatura de 2 testemunhas (Art. 784, III CPC), você pode cobrar judicialmente sem perícia demorada.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-2 font-bold text-gray-900 text-sm mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Sem Custos com Impressão</span>
                </div>
                <p className="text-xs text-gray-500">
                  Economize papel e tinta: tudo cabe perfeitamente na frente de uma única folha A4.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-2 font-bold text-gray-900 text-sm mb-1">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  <span>Integrado com Recibo Oficial</span>
                </div>
                <p className="text-xs text-gray-500">
                  A cada parcela ou adiantamento pago, gere o{" "}
                  <Link to="/recibo-simples" className="font-bold text-emerald-700 underline">
                    recibo simples
                  </Link>{" "}
                  para dar quitação incontestável.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default ContractIndex;
