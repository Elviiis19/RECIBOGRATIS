import { SEO } from '../components/SEO';

export function Privacidade() {
  return (
    <>
      <SEO 
        title="Política de Privacidade" 
        description="Política de Privacidade do site Recibo Grátis."
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 prose prose-emerald prose-lg">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Política de Privacidade</h1>
        
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
        
        <p className="mt-8 text-sm text-gray-500">Última atualização: Março de 2024</p>
      </div>
    </>
  );
}
