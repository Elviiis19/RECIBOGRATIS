import { SEO } from '../components/SEO';

export function Termos() {
  return (
    <>
      <SEO 
        title="Termos de Uso" 
        description="Termos de uso do site Recibo Grátis."
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 prose prose-emerald prose-lg">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Termos de Uso</h1>
        
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
        
        <p className="mt-8 text-sm text-gray-500">Última atualização: Março de 2024</p>
      </div>
    </>
  );
}
