import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { receiptModels } from '../data/receiptModels';
import { 
  FileText, BadgeDollarSign, Briefcase, Home as HomeIcon, 
  ShoppingCart, Store, Sparkles, HeartHandshake, Scale, HandCoins, 
  Heart, Banknote, CheckCircle, Bed, Car, Hammer, Paintbrush, Zap, 
  Wrench, Truck, Settings, Smile, Brain, Activity, Apple, Camera, 
  GraduationCap, Baby, HeartPulse, Scissors, Sofa, Monitor, Leaf, 
  Building, PenTool, HardHat, Stethoscope, Dog, Search
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText className="w-8 h-8 text-emerald-600" />,
  BadgeDollarSign: <BadgeDollarSign className="w-8 h-8 text-emerald-600" />,
  Briefcase: <Briefcase className="w-8 h-8 text-emerald-600" />,
  Home: <HomeIcon className="w-8 h-8 text-emerald-600" />,
  ShoppingCart: <ShoppingCart className="w-8 h-8 text-emerald-600" />,
  Store: <Store className="w-8 h-8 text-emerald-600" />,
  Sparkles: <Sparkles className="w-8 h-8 text-emerald-600" />,
  HeartHandshake: <HeartHandshake className="w-8 h-8 text-emerald-600" />,
  Scale: <Scale className="w-8 h-8 text-emerald-600" />,
  HandCoins: <HandCoins className="w-8 h-8 text-emerald-600" />,
  Heart: <Heart className="w-8 h-8 text-emerald-600" />,
  Banknote: <Banknote className="w-8 h-8 text-emerald-600" />,
  CheckCircle: <CheckCircle className="w-8 h-8 text-emerald-600" />,
  Bed: <Bed className="w-8 h-8 text-emerald-600" />,
  Car: <Car className="w-8 h-8 text-emerald-600" />,
  Hammer: <Hammer className="w-8 h-8 text-emerald-600" />,
  Paintbrush: <Paintbrush className="w-8 h-8 text-emerald-600" />,
  Zap: <Zap className="w-8 h-8 text-emerald-600" />,
  Wrench: <Wrench className="w-8 h-8 text-emerald-600" />,
  Truck: <Truck className="w-8 h-8 text-emerald-600" />,
  Settings: <Settings className="w-8 h-8 text-emerald-600" />,
  Smile: <Smile className="w-8 h-8 text-emerald-600" />,
  Brain: <Brain className="w-8 h-8 text-emerald-600" />,
  Activity: <Activity className="w-8 h-8 text-emerald-600" />,
  Apple: <Apple className="w-8 h-8 text-emerald-600" />,
  Camera: <Camera className="w-8 h-8 text-emerald-600" />,
  GraduationCap: <GraduationCap className="w-8 h-8 text-emerald-600" />,
  Baby: <Baby className="w-8 h-8 text-emerald-600" />,
  HeartPulse: <HeartPulse className="w-8 h-8 text-emerald-600" />,
  Scissors: <Scissors className="w-8 h-8 text-emerald-600" />,
  Sofa: <Sofa className="w-8 h-8 text-emerald-600" />,
  Monitor: <Monitor className="w-8 h-8 text-emerald-600" />,
  Leaf: <Leaf className="w-8 h-8 text-emerald-600" />,
  Building: <Building className="w-8 h-8 text-emerald-600" />,
  PenTool: <PenTool className="w-8 h-8 text-emerald-600" />,
  HardHat: <HardHat className="w-8 h-8 text-emerald-600" />,
  Stethoscope: <Stethoscope className="w-8 h-8 text-emerald-600" />,
  Dog: <Dog className="w-8 h-8 text-emerald-600" />,
};

export function AllModels() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredModels = receiptModels.filter(model => 
    model.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    model.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const popularModelIds = ['simples', 'pagamento', 'servicos'];
  const popularModels = receiptModels.filter(model => popularModelIds.includes(model.id)).sort((a, b) => popularModelIds.indexOf(a.id) - popularModelIds.indexOf(b.id));

  return (
    <>
      <SEO 
        title="Todos os Modelos de Recibos | Recibo Grátis" 
        description="Confira nossa lista completa com mais de 40 modelos de recibos prontos para preencher e imprimir em PDF gratuitamente."
        url="https://recibogratis.com.br/modelos"
      />
      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Todos os Modelos de Recibo</h1>
            <p className="text-lg text-gray-600 mb-8">Encontre o modelo perfeito para sua necessidade de comprovação de pagamento.</p>
            
            <div className="max-w-xl mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-full leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-lg transition-shadow shadow-sm"
                placeholder="Buscar modelo de recibo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {!searchTerm && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-emerald-500" />
                Mais Procurados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {popularModels.map((model) => (
                  <Link 
                    key={`popular-${model.id}`} 
                    to={`/${model.slug}`}
                    className="bg-white rounded-2xl p-8 shadow-sm border-2 border-emerald-100 hover:border-emerald-300 hover:shadow-md transition-all group flex flex-col h-full relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-bl-lg">
                      Popular
                    </div>
                    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-100 transition-colors">
                      {iconMap[model.icon] || <FileText className="w-8 h-8 text-emerald-600" />}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                      {model.title}
                    </h3>
                    <p className="text-gray-600 flex-grow">
                      {model.shortDescription}
                    </p>
                    <div className="mt-6 text-emerald-600 font-medium flex items-center gap-2">
                      Gerar Recibo 
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {searchTerm ? 'Resultados da busca' : 'Todos os Modelos'}
            </h2>
          </div>

          {filteredModels.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-500">Nenhum modelo encontrado para "{searchTerm}".</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-4 text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
              >
                Limpar busca e ver todos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {filteredModels.map((model) => (
                <Link 
                  key={model.id} 
                  to={`/${model.slug}`}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-200 transition-all group flex flex-col h-full"
                >
                  <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-100 transition-colors">
                    {iconMap[model.icon] || <FileText className="w-8 h-8 text-emerald-600" />}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                    {model.title}
                  </h3>
                  <p className="text-gray-600 flex-grow">
                    {model.shortDescription}
                  </p>
                  <div className="mt-6 text-emerald-600 font-medium flex items-center gap-2">
                    Gerar Recibo 
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
