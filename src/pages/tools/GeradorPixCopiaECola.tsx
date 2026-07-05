import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { AdSense } from '../../components/AdSense';
import { Copy, CheckCircle2, Link2, AlertCircle, ShieldCheck } from 'lucide-react';
import CurrencyInput from 'react-currency-input-field';
import { generatePixPayload } from '../../utils/pix';
import { cn } from '../../utils/cn';

export function GeradorPixCopiaECola() {
  const [data, setData] = useState({
    chave: '',
    nome: '',
    cidade: '',
    valor: '',
  });
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const isReady = data.chave.length > 3 && data.nome.length > 2 && data.cidade.length > 2;
  const pixPayload = isReady ? generatePixPayload(data.chave, data.nome, data.cidade, data.valor) : '';

  const handleCopy = () => {
    if (!pixPayload) return;
    navigator.clipboard.writeText(pixPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SEO 
        title="Gerador de PIX Copia e Cola Online Grátis - Código BR Code"
        description="Gere links e códigos PIX Copia e Cola instantaneamente. Facilite suas cobranças criando o código PIX para envio no WhatsApp, faturas e recibos."
        keywords="gerador pix copia e cola, codigo pix online, criar link pix, pix copia e cola, br code pix, gerar qr code pix"
        schema={`{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"O que é PIX Copia e Cola?","acceptedAnswer":{"@type":"Answer","text":"O PIX Copia e Cola é um código de texto (BR Code) que contém todas as informações de pagamento (Chave PIX, valor, nome e descrição). O pagador apenas copia esse texto, abre o aplicativo do banco e utiliza a opção 'PIX Copia e Cola' para efetuar o pagamento."}},{"@type":"Question","name":"É seguro gerar o código PIX Copia e Cola online?","acceptedAnswer":{"@type":"Answer","text":"Sim, é totalmente seguro. A ferramenta apenas organiza as informações públicas da sua chave PIX no formato padrão do Banco Central (BR Code) e roda diretamente no seu navegador. Nenhuma informação pessoal ou bancária sensível é armazenada."}},{"@type":"Question","name":"Posso gerar PIX Copia e Cola com valor definido?","acceptedAnswer":{"@type":"Answer","text":"Sim! Ao preencher o campo de valor no gerador, o código PIX Copia e Cola já incluirá a quantia exata. O pagador não precisará (nem poderá) alterar o valor na hora de transferir."}}]}`}
      />
      <div className="bg-emerald-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Link2 className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl font-extrabold mb-4">Gerador de PIX Copia e Cola</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Crie links e códigos de cobrança PIX no formato "Copia e Cola" prontos para enviar pelas redes sociais.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <AdSense />
        
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 my-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Monte a sua Cobrança</h2>
              
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Chave PIX <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="chave"
                  value={data.chave}
                  onChange={handleChange}
                  placeholder="Seu CPF, CNPJ, Celular ou E-mail"
                  className="w-full px-4 py-3 text-lg border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Nome do Recebedor <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="nome"
                  value={data.nome}
                  onChange={handleChange}
                  placeholder="Nome exato da conta vinculada"
                  maxLength={25}
                  className="w-full px-4 py-3 text-lg border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Sua Cidade <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="cidade"
                  value={data.cidade}
                  onChange={handleChange}
                  placeholder="Cidade"
                  maxLength={15}
                  className="w-full px-4 py-3 text-lg border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Valor da Cobrança (R$)</label>
                <CurrencyInput
                  name="valor"
                  placeholder="R$ 0,00"
                  decimalsLimit={2}
                  decimalSeparator=","
                  groupSeparator="."
                  prefix="R$ "
                  className="w-full px-4 py-3 text-lg border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onValueChange={(value) => setData(prev => ({ ...prev, valor: value || '' }))}
                  value={data.valor}
                />
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl flex flex-col justify-center items-center border min-h-[300px]">
              {isReady ? (
                <div className="w-full max-w-sm animate-in fade-in zoom-in-95 duration-300">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 text-center">Código de Cobrança PIX</h3>
                  <p className="text-sm text-gray-500 mb-6 text-center">Envie este texto para seu cliente pagar no aplicativo do banco.</p>
                  
                  <div className="bg-white border rounded-xl p-4 shadow-sm mb-4">
                    <p className="font-mono text-sm text-gray-700 break-all select-all leading-relaxed">
                      {pixPayload}
                    </p>
                  </div>
                  
                  <button
                    onClick={handleCopy}
                    className={cn(
                      "w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all shadow-sm",
                      copied ? "bg-emerald-100 text-emerald-800" : "bg-emerald-600 text-white hover:bg-emerald-700"
                    )}
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Código Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        Copiar "PIX Copia e Cola"
                      </>
                    )}
                  </button>
                  
                  <p className="text-xs text-center text-gray-400 mt-4 leading-relaxed tracking-wide">
                    Padrão BR Code homologado pelo Banco Central.
                  </p>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <Link2 className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p>Preencha os campos ao lado para<br/>gerar o código Copia e Cola.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 p-6 rounded-2xl border border-blue-100 flex gap-4 items-start">
          <AlertCircle className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
          <div>
             <h3 className="font-bold text-blue-900 mb-2">100% Client-side e Seguro</h3>
             <p className="text-blue-800 text-sm leading-relaxed">
                Este gerador funciona inteiramente no seu navegador sem enviar dados ao servidor. Respeitamos sua privacidade e não gravamos sua Chave PIX, nome ou cidade.
             </p>
          </div>
        </div>

        <AdSense />
        
        <div className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 prose prose-emerald max-w-none">
          <h2>Como Funciona o Gerador de PIX Copia e Cola?</h2>
<p>O nosso gerador de <strong>PIX Copia e Cola</strong> é uma ferramenta online e gratuita que converte a sua Chave PIX e os dados de cobrança num código de texto longo padrão do Banco Central, conhecido como BR Code. Com ele, você envia cobranças exatas, evitando erros de digitação e facilitando o pagamento.</p>

<h3>Vantagens de usar o PIX Copia e Cola nas suas cobranças</h3>
<p>Diferente de enviar apenas a sua chave PIX solta para o cliente, o código Copia e Cola embute dados fundamentais para a sua gestão financeira:</p>
<ul>
<li><strong>Valor Fixo Embutido:</strong> Você já define o valor exato a ser pago, e o aplicativo bancário bloqueia a edição, garantindo o recebimento correto.</li>
<li><strong>Identificador da Compra:</strong> Permite adicionar uma descrição ou número de pedido que aparecerá no seu extrato bancário, agilizando a conciliação.</li>
<li><strong>Facilidade de Pagamento:</strong> O cliente não precisa digitar números, valores ou conferir chaves complexas; basta copiar e colar.</li>
</ul>

<h2>Como criar o link PIX para enviar pelo WhatsApp?</h2>
<p>Para facilitar ainda mais a rotina de autônomos e empreendedores, a ferramenta permite enviar o PIX Copia e Cola diretamente via WhatsApp. Após gerar o código preenchendo sua chave e o valor, basta clicar no botão de copiar ou enviar diretamente pelo link gerado. Esse link PIX pode ser colado em mensagens, e-mails de cobrança, recibos de pagamento ou notas fiscais.</p>

<h3>Onde usar o PIX Copia e Cola gerado?</h3>
<h4>No Preenchimento de Recibos</h4>
<p>Você pode colar o código gerado no rodapé dos recibos emitidos em nossa plataforma, incentivando o pagamento rápido e direto.</p>
<h4>Em Faturas e Carnês</h4>
<p>Se você gera faturas mensais (como serviços de contabilidade, aluguel, ou mensalidades escolares), o código Copia e Cola serve como um boleto moderno e sem taxas.</p>
          
          <hr className="my-8" />
          
          <h2>Perguntas Frequentes (FAQ)</h2>
          <div className="space-y-4 not-prose mt-6">

            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                O que é PIX Copia e Cola?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: `O PIX Copia e Cola é um código de texto (BR Code) que contém todas as informações de pagamento (Chave PIX, valor, nome e descrição). O pagador apenas copia esse texto, abre o aplicativo do banco e utiliza a opção 'PIX Copia e Cola' para efetuar o pagamento.` }} />
            </details>
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                É seguro gerar o código PIX Copia e Cola online?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: `Sim, é totalmente seguro. A ferramenta apenas organiza as informações públicas da sua chave PIX no formato padrão do Banco Central (BR Code) e roda diretamente no seu navegador. Nenhuma informação pessoal ou bancária sensível é armazenada.` }} />
            </details>
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                Posso gerar PIX Copia e Cola com valor definido?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: `Sim! Ao preencher o campo de valor no gerador, o código PIX Copia e Cola já incluirá a quantia exata. O pagador não precisará (nem poderá) alterar o valor na hora de transferir.` }} />
            </details>
          </div>
        </div>
        <AdSense />
      </div>
    </>
  );
}