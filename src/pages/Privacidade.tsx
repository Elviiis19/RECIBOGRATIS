import { SEO } from '../components/SEO';
import { AdSense } from '../components/AdSense';

import { Shield } from 'lucide-react';

export function Privacidade() {
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <SEO 
        title="Política de Privacidade | Segurança de Dados no Recibo Grátis" 
        description="Entenda como o Recibo Grátis protege seus dados. Processamento 100% no navegador (client-side), sem armazenamento de informações sensíveis."
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-800 via-emerald-600 to-teal-600 text-white py-12 md:py-20 overflow-hidden mb-12">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '2s' }}></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl mb-6 shadow-sm">
            <Shield className="w-8 h-8 text-emerald-50" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Política de Privacidade
          </h1>
          <p className="text-xl md:text-2xl text-emerald-100 max-w-2xl mx-auto">
            Transparência e segurança em primeiro lugar. Saiba como garantimos que seus dados e os dados de seus clientes fiquem protegidos.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 prose prose-emerald prose-lg max-w-none">
          <AdSense />
        
        <p>No Recibo Grátis, a sua privacidade é nossa prioridade. Esta Política de Privacidade explica como lidamos com as informações que você insere em nosso site.</p>
        
        <h2>1. Coleta de Dados Pessoais</h2>
        <p><strong>Nós NÃO coletamos, armazenamos ou transmitimos nenhum dado pessoal inserido nos formulários de recibo.</strong> Todo o processamento dos dados (nomes, CPFs, valores, endereços) é realizado exclusivamente no seu navegador (client-side). Quando você fecha a aba ou atualiza a página, os dados são perdidos.</p>
        
        <h2>2. Uso de Cookies e Analytics</h2>
        <p>Podemos utilizar cookies de terceiros (como Google Analytics) apenas para entender o tráfego do nosso site, páginas mais visitadas e melhorar a experiência do usuário. Esses dados são anônimos e agregados.</p>
        
        <h2>3. Compartilhamento de Informações</h2>
        <p>Como não armazenamos seus dados pessoais, não temos o que compartilhar com terceiros. A segurança da sua informação está garantida pelo fato de ela nunca sair do seu dispositivo.</p>
        
        <h2>4. Links para Terceiros</h2>
        <p>Nosso site contém links para outros sites do nosso ecossistema (Declaração Online, Gera Contrato). Recomendamos que você leia as políticas de privacidade desses sites ao visitá-los.</p>
        
        <h2>5. Alterações nesta Política</h2>
        <p>Podemos atualizar nossa Política de Privacidade periodicamente. Recomendamos que você revise esta página para se manter informado sobre como protegemos sua privacidade.</p>
        
        <AdSense />
        
        <p className="mt-8 text-sm text-gray-500">Última atualização: Março de 2024</p>
        </div>
      </div>
    </div>
  );
}
