import { SEO } from '../components/SEO';
import { AdSense } from '../components/AdSense';
import { Mail, MessageSquare } from 'lucide-react';

export function Contato() {
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <SEO 
        title="Contato | Fale com a Equipe do Recibo Grátis" 
        description="Entre em contato com a equipe do Recibo Grátis. Tire suas dúvidas, envie sugestões ou reporte problemas com nosso gerador de recibos online."
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-800 via-emerald-600 to-teal-600 text-white py-12 md:py-20 overflow-hidden mb-12">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '2s' }}></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl mb-6 shadow-sm">
            <MessageSquare className="w-8 h-8 text-emerald-50" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Contato e Suporte
          </h1>
          <p className="text-xl md:text-2xl text-emerald-100 max-w-2xl mx-auto">
            Fale com a equipe do Recibo Grátis. Estamos aqui para ajudar você a emitir seus recibos online sem complicação.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSense />
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl mx-auto">
            Tem alguma dúvida, sugestão ou encontrou algum problema no Recibo Grátis? 
            Nossa equipe está pronta para ajudar. Idealizado por Elvis Dias, nosso objetivo é facilitar o seu dia a dia.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">E-mail</h3>
              <p className="text-gray-600 mb-4">Envie-nos um e-mail com suas dúvidas ou sugestões de novos modelos de recibo.</p>
              <a href="mailto:contato@recibogratis.com.br" className="text-emerald-600 font-medium hover:text-emerald-700">
                contato@recibogratis.com.br
              </a>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Feedback</h3>
              <p className="text-gray-600 mb-4">Sua opinião é muito importante para continuarmos melhorando a ferramenta.</p>
              <span className="text-emerald-600 font-medium">
                Agradecemos seu contato!
              </span>
            </div>
          </div>
        </div>
        <AdSense />
      </div>
    </div>
  );
}
