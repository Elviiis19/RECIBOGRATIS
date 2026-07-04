import React from "react";
import { Link } from "react-router-dom";
import { declarationModels } from "../../data/declarationModels";
import {
  FileText,
  Search,
  Scale,
  Home,
  Heart,
  Baby,
  CheckCircle,
  Briefcase,
  ShieldCheck,
  UserCheck
} from "lucide-react";
import { Helmet } from "react-helmet-async";

const iconMap: Record<string, React.ReactNode> = {
  "residencia": <Home className="w-8 h-8 text-emerald-700 mb-4" />,
  "hipossuficiencia": <Scale className="w-8 h-8 text-emerald-700 mb-4" />,
  "uniao-estavel": <Heart className="w-8 h-8 text-emerald-700 mb-4" />,
  "dependencia-economica": <Baby className="w-8 h-8 text-emerald-700 mb-4" />,
  "bons-antecedentes": <CheckCircle className="w-8 h-8 text-emerald-700 mb-4" />,
  "trabalho": <Briefcase className="w-8 h-8 text-emerald-700 mb-4" />,
  "veracidade": <ShieldCheck className="w-8 h-8 text-emerald-700 mb-4" />,
  "estado-civil": <UserCheck className="w-8 h-8 text-emerald-700 mb-4" />
};

export default function DeclarationIndex() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredModels = declarationModels.filter((model) =>
    model.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    model.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Helmet>
        <title>Modelos de Declaração Prontos em PDF | Recibo Grátis</title>
        <meta name="description" content="Gere e imprima modelos de Declaração de Residência, Pobreza, União Estável e mais. Grátis, online e com amparo legal (Lei 7.115/83)." />
        <meta name="keywords" content="declaração de residência, declaração de pobreza, lei 7.115, gerador de declarações, modelos de declaração" />
      </Helmet>

      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Modelos de Declaração <span className="text-emerald-700">com Validade Legal</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Escolha o modelo, preencha os dados e gere o PDF na hora. Nossas declarações
          são formatadas seguindo a <strong>Lei Federal 7.115/1983</strong> para garantir validade.
        </p>
        
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Buscar por declaração de residência, trabalho..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-emerald-100 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all text-lg shadow-sm"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModels.map((model) => (
          <Link
            key={model.id}
            to={`/declaracoes/${model.slug}`}
            className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <FileText className="w-24 h-24 text-emerald-900" />
            </div>
            
            {iconMap[model.id] || <FileText className="w-8 h-8 text-emerald-700 mb-4" />}
            
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
              {model.title}
            </h3>
            
            <p className="text-gray-600 line-clamp-3">
              {model.shortDescription}
            </p>
            
            <div className="mt-4 flex items-center text-emerald-700 font-semibold group-hover:gap-2 transition-all">
              Preencher Modelo
              <svg className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
      
      {filteredModels.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum modelo encontrado</h3>
          <p className="text-gray-600">Não encontramos nenhuma declaração com os termos pesquisados.</p>
        </div>
      )}
    </div>
  );
}