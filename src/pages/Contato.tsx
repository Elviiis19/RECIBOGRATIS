import { SEO } from '../components/SEO';
import { Mail, MessageSquare } from 'lucide-react';

export function Contato() {
  return (
    <>
      <SEO 
        title="Contato" 
        description="Entre em contato com a equipe do Recibo Grátis."
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Fale Conosco</h1>
        
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
      </div>
    </>
  );
}
