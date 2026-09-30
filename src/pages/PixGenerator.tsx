import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import CurrencyInput from 'react-currency-input-field';
import { Copy, CheckCircle2, QrCode, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { SEO } from '../components/SEO';
import { AdSense } from '../components/AdSense';
import { AdsKeeper } from '../components/AdsKeeper';
import { cn } from '../utils/cn';
import { generatePixPayload } from '../utils/pix';

export function PixGenerator() {
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

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Gerador de QR Code PIX",
    "operatingSystem": "Any",
    "applicationCategory": "FinanceApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    },
    "description": "Gere QR Code PIX e link Copia e Cola gratuitamente. Crie plaquinhas PIX para seu negócio, loja ou evento de forma rápida e segura."
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Início",
        "item": "https://recibogratis.com.br/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Gerador de QR Code PIX",
        "item": "https://recibogratis.com.br/gerador-qr-code-pix"
      }
    ]
  };

  const schemaString = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      { ...softwareSchema, "@context": undefined },
      { ...breadcrumbSchema, "@context": undefined }
    ]
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <SEO 
        title="Gerador de QR Code PIX Online - Grátis e Seguro"
        description="Gere um QR Code PIX e um link de pagamento (Copia e Cola) grátis. Ideal para MEI, comércios, profissionais autônomos ou para criar plaquinhas PIX."
        keywords="gerador qr code pix, qr code pix, pix copia e cola, plaquinha pix, gerar pix online, codigo qr para pagamento"
        
        url="https://recibogratis.com.br/gerador-qr-code-pix"
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-800 via-emerald-600 to-teal-600 text-white py-12 md:py-20 overflow-hidden mb-12">
        {/* Modern background pattern/glow */}
        <div className="absolute inset-0 bg-[url('/cubes.png')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '2s' }}></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl mb-6 shadow-sm">
            <QrCode className="w-8 h-8 text-emerald-50" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Gerador de QR Code PIX
          </h1>
          <p className="text-xl md:text-2xl text-emerald-100 max-w-2xl mx-auto">
            Crie seu QR Code PIX para receber pagamentos de forma rápida. Ideal para imprimir plaquinhas para sua loja ou enviar por WhatsApp.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSense />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Dados do Recebedor</h2>
            
            <div className="space-y-5">
              <div>
                <label htmlFor="chave" className="block text-sm font-semibold text-gray-900 mb-2">Chave PIX <span className="text-red-500">*</span></label>
                <input
                  id="chave"
                  type="text"
                  name="chave"
                  value={data.chave}
                  onChange={handleChange}
                  placeholder="CPF, CNPJ, E-mail, Celular ou Aleatória"
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="nome" className="block text-sm font-semibold text-gray-900 mb-2">Nome do Recebedor <span className="text-red-500">*</span></label>
                <input
                  id="nome"
                  type="text"
                  name="nome"
                  value={data.nome}
                  onChange={handleChange}
                  placeholder="Nome completo ou Razão Social"
                  maxLength={25}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">Máximo 25 caracteres, sem acentos.</p>
              </div>

              <div>
                <label htmlFor="cidade" className="block text-sm font-semibold text-gray-900 mb-2">Cidade <span className="text-red-500">*</span></label>
                <input
                  id="cidade"
                  type="text"
                  name="cidade"
                  value={data.cidade}
                  onChange={handleChange}
                  placeholder="Sua cidade"
                  maxLength={15}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="valor" className="block text-sm font-semibold text-gray-900 mb-2">Valor (Opcional)</label>
                <CurrencyInput
                  id="valor"
                  name="valor"
                  placeholder="R$ 0,00"
                  decimalsLimit={2}
                  decimalSeparator=","
                  groupSeparator="."
                  prefix="R$ "
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  onValueChange={(value) => setData(prev => ({ ...prev, valor: value || '' }))}
                  value={data.valor}
                />
                <p className="text-xs text-gray-500 mt-1">Deixe em branco para o pagador digitar o valor.</p>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[400px]">
            {isReady ? (
              <div className="w-full flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
                  <QRCodeSVG 
                    value={pixPayload} 
                    size={200}
                    level="M"
                    includeMargin={true}
                  />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-1">{data.nome}</h3>
                <p className="text-gray-500 mb-6">{data.cidade}</p>

                {data.valor && (
                  <div className="text-2xl font-bold text-emerald-700 mb-6">
                    R$ {data.valor}
                  </div>
                )}

                <div className="w-full max-w-sm">
                  <p className="text-sm font-semibold text-gray-700 mb-2">PIX Copia e Cola:</p>
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      readOnly 
                      value={pixPayload}
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 outline-none"
                    />
                    <button
                      onClick={handleCopy}
                      className={cn(
                        "flex items-center justify-center p-2 rounded-lg transition-colors",
                        copied ? "bg-emerald-100 text-emerald-700" : "bg-gray-900 text-white hover:bg-black"
                      )}
                      title="Copiar código"
                    >
                      {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                  {copied && <p className="text-emerald-700 text-xs mt-2 text-center font-medium">Código copiado com sucesso!</p>}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 flex flex-col items-center">
                <QrCode className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-lg">Preencha os dados obrigatórios<br/>para gerar seu QR Code</p>
              </div>
            )}
          </div>
        </div>

        <AdsKeeper className="my-8" />
        
        {/* Info Section */}
        <div className="mt-12 bg-blue-50 p-6 rounded-2xl border border-blue-100 flex gap-4 items-start">
          <AlertCircle className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-blue-900 mb-2">100% Seguro e Gratuito</h3>
            <p className="text-blue-800 text-sm leading-relaxed">
              Nosso gerador de PIX funciona inteiramente no seu navegador. Nenhuma informação financeira, chave PIX ou dados pessoais são enviados para nossos servidores. O código é gerado instantaneamente usando o padrão oficial do Banco Central do Brasil.
            </p>
          </div>
        </div>

              <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"O Gerador de QR Code PIX é seguro?","acceptedAnswer":{"@type":"Answer","text":"Sim, é 100% seguro. Nossa ferramenta não pede senha, e-mail ou dados bancários de acesso, não armazena nenhuma transação, nem acessa seu dinheiro. Todo processo ocorre localmente no seu dispositivo transformando dados públicos numa codificação de imagem."}},{"@type":"Question","name":"Posso gerar o QR Code com o valor já definido?","acceptedAnswer":{"@type":"Answer","text":"Sim. Você pode definir o valor exato no formulário. Se deixar o campo em branco, o pagador é quem digitará o valor no aplicativo do banco."}},{"@type":"Question","name":"Como imprimo a plaquinha PIX para meu negócio?","acceptedAnswer":{"@type":"Answer","text":"Ao gerar o QR Code, você tem a opção de baixar a imagem diretamente. Você pode salvá-la no celular ou computador e imprimir em qualquer impressora, criando sua placa física ou adicionando num modelo PDF de cobrança ou recibo."}}]}` }} />
      {/* SEO Content Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Como Funciona o Gerador de QR Code PIX
              </h2>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>O <strong>Gerador de QR Code PIX</strong> é a solução online definitiva para você, lojista, vendedor autônomo, MEI ou prestador de serviços. Com esta ferramenta simples, você não precisa ditar sua chave verbalmente ou anotá-la num papel sujeito a erros. Basta criar um QR Code que o cliente aponta a câmera para pagar. Ele segue o padrão do Banco Central e gera também o link Pix Copia e Cola associado.</p>
              </div>
            
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <QrCode className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Por que criar uma Plaquinha PIX com Valor Fixo ou Aberto?
              </h3>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <ul>
                  <li><strong>Agilidade e Experiência do Cliente:</strong> O processo elimina digitação equivocada. O app de banco do consumidor lê a imagem instantaneamente e as chaves destinatárias são puxadas via BACEN.</li>
                  <li><strong>Controle e Segurança:</strong> Embutir o valor fixo garante que ninguém deposite um centavo a menos sem querer e facilita conferência e auditoria contábil.</li>
                  <li><strong>Flexibilidade de Vendas:</strong> Se o valor ficar aberto, você pode pregar a plaquinha no balcão e cada cliente insere o preço final após o acerto comercial (como numa padaria, consultório ou barbearia).</li>
                </ul>
              </div>
            
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <AlertCircle className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Como Enviar a Cobrança por WhatsApp?
              </h3>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>Ao emitir a imagem na tela, nossa ferramenta permite baixar instantaneamente ou até mesmo copiar o código estático <em>"PIX Copia e Cola"</em>. Assim, além de você ter o QR Code impresso no balcão físico, você pode copiar esse texto e disparar em mensagens de texto para clientes remotos. Combine essa tática com o envio do nosso <Link to="/recibo-simples" className="text-emerald-600 hover:underline">Recibo Simples</Link>, facilitando a liquidação total de dívidas e boletos digitais.</p>
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
                    question: "O Gerador de QR Code PIX é seguro?",
                    answer: "Sim, é 100% seguro. Nossa ferramenta não pede senha, e-mail ou dados bancários de acesso, não armazena nenhuma transação, nem acessa seu dinheiro. Todo processo ocorre localmente no seu dispositivo transformando dados públicos numa codificação de imagem."
                  },
                  {
                    question: "Posso gerar o QR Code com o valor já definido?",
                    answer: "Sim. Você pode definir o valor exato no formulário. Se deixar o campo em branco, o pagador é quem digitará o valor no aplicativo do banco."
                  },
                  {
                    question: "Como imprimo a plaquinha PIX para meu negócio?",
                    answer: "Ao gerar o QR Code, você tem a opção de baixar a imagem diretamente. Você pode salvá-la no celular ou computador e imprimir em qualquer impressora, criando sua placa física ou adicionando num modelo PDF de cobrança ou recibo."
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

    </div>
    </div>
  );
}