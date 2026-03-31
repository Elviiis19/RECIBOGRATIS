import { SEO } from '../components/SEO';
import { AdSense } from '../components/AdSense';

import { FileText } from 'lucide-react';

export function Termos() {
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <SEO 
        title="Termos de Uso | Regras e Condições do Recibo Grátis" 
        description="Leia os Termos de Uso do Recibo Grátis. Entenda as regras de utilização da nossa plataforma de emissão de recibos online gratuitos."
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-800 via-emerald-600 to-teal-600 text-white py-12 md:py-20 overflow-hidden mb-12">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '2s' }}></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl mb-6 shadow-sm">
            <FileText className="w-8 h-8 text-emerald-50" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Termos de Uso
          </h1>
          <p className="text-xl md:text-2xl text-emerald-100 max-w-2xl mx-auto">
            Conheça as regras e condições para utilizar o Recibo Grátis. Nossa ferramenta é 100% gratuita e feita para facilitar sua vida.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 prose prose-emerald prose-lg max-w-none">
          <AdSense />
        
        <p>Bem-vindo ao Recibo Grátis. Ao acessar e usar nosso site, você concorda com os seguintes termos e condições:</p>
        
        <h2>1. Uso do Serviço</h2>
        <p>O Recibo Grátis é uma ferramenta online gratuita para geração de recibos em formato PDF. O serviço é fornecido "como está", sem garantias de qualquer tipo.</p>
        
        <h2>2. Responsabilidade pelos Dados</h2>
        <p>Não armazenamos nenhum dado inserido nos formulários. Todo o processamento é feito localmente no seu navegador. Você é inteiramente responsável pela veracidade e legalidade das informações inseridas nos recibos gerados.</p>
        
        <h2>3. Validade Legal</h2>
        <p>Os recibos gerados por nossa plataforma seguem modelos padrões de mercado, mas não substituem a necessidade de orientação jurídica ou contábil específica para o seu caso. A validade legal do documento depende do correto preenchimento e assinatura das partes envolvidas.</p>
        
        <h2>4. Propriedade Intelectual</h2>
        <p>O design, código-fonte e conteúdo do site são de propriedade exclusiva do Recibo Grátis e de seu idealizador, Elvis Dias. É proibida a reprodução, cópia ou modificação sem autorização prévia.</p>
        
        <h2>5. Modificações nos Termos</h2>
        <p>Reservamo-nos o direito de alterar estes termos a qualquer momento, sem aviso prévio. O uso contínuo do site após as alterações constitui aceitação dos novos termos.</p>
        
        <AdSense />
        
        <p className="mt-8 text-sm text-gray-500">Última atualização: Março de 2024</p>
        </div>
      </div>
    </div>
  );
}
