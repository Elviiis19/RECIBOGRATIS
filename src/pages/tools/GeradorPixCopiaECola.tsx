import React, { useState } from 'react';
import {  Link  } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { AdSense } from '../../components/AdSense';
import { Copy, CheckCircle2, Link2, AlertCircle, ShieldCheck, ChevronDown, ChevronUp, QrCode } from 'lucide-react';
import CurrencyInput from 'react-currency-input-field';
import { generatePixPayload } from '../../utils/pix';
import { cn } from '../../utils/cn';

export function GeradorPixCopiaECola() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
        
                    </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"O que é PIX Copia e Cola?","acceptedAnswer":{"@type":"Answer","text":"O PIX Copia e Cola é um código de texto (BR Code) que contém todas as informações de pagamento (Chave PIX, valor, nome e descrição). O pagador apenas copia esse texto, abre o aplicativo do banco e utiliza a opção 'PIX Copia e Cola' para efetuar o pagamento."}},{"@type":"Question","name":"É seguro gerar o código PIX Copia e Cola online?","acceptedAnswer":{"@type":"Answer","text":"Sim, é totalmente seguro. A ferramenta apenas organiza as informações públicas da sua chave PIX no formato padrão do Banco Central (BR Code) e roda diretamente no seu navegador. Nenhuma informação pessoal ou bancária sensível é armazenada."}},{"@type":"Question","name":"Posso gerar PIX Copia e Cola com valor definido?","acceptedAnswer":{"@type":"Answer","text":"Sim! Ao preencher o campo de valor no gerador, o código PIX Copia e Cola já incluirá a quantia exata. O pagador não precisará (nem poderá) alterar o valor na hora de transferir."}}]}` }} />
      {/* SEO Content Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Como Funciona o Gerador de PIX Copia e Cola?
              </h2>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>O nosso gerador de <strong>PIX Copia e Cola</strong> é uma ferramenta online e gratuita que converte a sua Chave PIX e os dados de cobrança num código de texto longo padrão do Banco Central, conhecido como BR Code. Com ele, você envia cobranças exatas, evitando erros de digitação e facilitando o pagamento.</p>
              </div>
            
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Vantagens de usar o PIX Copia e Cola nas suas cobranças
              </h3>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>Diferente de enviar apenas a sua chave PIX solta para o cliente, o código Copia e Cola embute dados fundamentais para a sua gestão financeira:</p>
                <ul>
                  <li><strong>Valor Fixo Embutido:</strong> Você já define o valor exato a ser pago, e o aplicativo bancário bloqueia a edição, garantindo o recebimento correto.</li>
                  <li><strong>Identificador da Compra:</strong> Permite adicionar uma descrição ou número de pedido que aparecerá no seu extrato bancário, agilizando a conciliação.</li>
                  <li><strong>Facilidade de Pagamento:</strong> O cliente não precisa digitar números, valores ou conferir chaves complexas; basta copiar e colar.</li>
                </ul>
              </div>
            
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <QrCode className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Como criar o link PIX para enviar pelo WhatsApp?
              </h3>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>Para facilitar ainda mais a rotina de autônomos e empreendedores, a ferramenta permite enviar o PIX Copia e Cola diretamente via WhatsApp. Após gerar o código preenchendo sua chave e o valor, basta clicar no botão de copiar ou enviar diretamente pelo link gerado. Esse link PIX pode ser colado em mensagens, e-mails de cobrança, recibos de pagamento ou notas fiscais.</p>
                <h4>Onde usar o PIX Copia e Cola gerado?</h4>
                <p><strong>No Preenchimento de Recibos:</strong> Você pode colar o código gerado no rodapé dos recibos emitidos em nossa plataforma, incentivando o pagamento rápido e direto.</p>
                <p><strong>Em Faturas e Carnês:</strong> Se você gera faturas mensais (como serviços de contabilidade, aluguel, ou mensalidades escolares), o código Copia e Cola serve como um boleto moderno e sem taxas.</p>
              </div>
            
              </div>
            </article>

            <hr className="border-gray-100" />

            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-8">
                Perguntas Frequentes (FAQ)
              </h2>
              <div className="space-y-4">
                {[
                  {
                    question: "O que é PIX Copia e Cola?",
                    answer: "O PIX Copia e Cola é um código de texto (BR Code) que contém todas as informações de pagamento (Chave PIX, valor, nome e descrição). O pagador apenas copia esse texto, abre o aplicativo do banco e utiliza a opção 'PIX Copia e Cola' para efetuar o pagamento."
                  },
                  {
                    question: "É seguro gerar o código PIX Copia e Cola online?",
                    answer: "Sim, é totalmente seguro. A ferramenta apenas organiza as informações públicas da sua chave PIX no formato padrão do Banco Central (BR Code) e roda diretamente no seu navegador. Nenhuma informação pessoal ou bancária sensível é armazenada."
                  },
                  {
                    question: "Posso gerar PIX Copia e Cola com valor definido?",
                    answer: "Sim! Ao preencher o campo de valor no gerador, o código PIX Copia e Cola já incluirá a quantia exata. O pagador não precisará (nem poderá) alterar o valor na hora de transferir."
                  }
                ].map((faq, index) => (
                  <div 
                    key={index} 
                    className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 hover:border-emerald-200 bg-white"
                  >
                    <button
                      type="button"
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-emerald-50/50 transition-colors"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      aria-expanded={openFaq === index}
                    >
                      <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                      {openFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    <div 
                      className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                        openFaq === index ? 'max-h-96 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
                      }`}
                    >
                      <p className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}