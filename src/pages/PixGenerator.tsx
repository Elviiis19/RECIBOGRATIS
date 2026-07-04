import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import CurrencyInput from 'react-currency-input-field';
import { Copy, CheckCircle2, QrCode, AlertCircle } from 'lucide-react';
import { SEO } from '../components/SEO';
import { AdSense } from '../components/AdSense';
import { cn } from '../utils/cn';
import { generatePixPayload } from '../utils/pix';

export function PixGenerator() {
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
        title="Gerador de QR Code PIX Grátis - Copia e Cola"
        description="Gere QR Code PIX e link Copia e Cola gratuitamente. Crie plaquinhas PIX para seu negócio, loja ou evento de forma rápida e segura."
        keywords="gerador qr code pix, qr code pix, pix copia e cola, plaquinha pix, gerar pix online"
        schema={schemaString}
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

        <div className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 prose prose-emerald max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            O que é e como funciona o Gerador de QR Code PIX?
          </h2>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            O <strong>QR Code PIX</strong> é uma evolução fantástica do sistema de pagamentos instantâneos criado pelo Banco Central. Ele permite que lojistas, prestadores de serviços e até mesmo pessoas físicas recebam dinheiro sem precisar ditar CPF, número de telefone ou e-mail. Tudo o que o seu cliente precisa fazer é abrir o aplicativo do banco e apontar a câmera do celular.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Com a nossa ferramenta gratuita, você pode criar o seu próprio QR Code personalizado. Seja para imprimir uma <strong>plaquinha PIX</strong> para deixar no balcão da sua loja, seja para enviar a imagem por WhatsApp, gerar o código aqui é rápido e não requer nenhum cadastro.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">
            Passo a passo: Como fazer meu QR Code PIX?
          </h3>
          <ol className="space-y-4 mb-8">
            <li className="flex items-start text-gray-600">
              <span className="font-bold text-emerald-700 mr-2">1.</span>
              Informe a sua Chave PIX (CPF, CNPJ, Celular, E-mail ou Aleatória). É para ela que o dinheiro será enviado.
            </li>
            <li className="flex items-start text-gray-600">
              <span className="font-bold text-emerald-700 mr-2">2.</span>
              Digite o Nome do Recebedor (para que o cliente confirme antes de pagar) e a Cidade (obrigatório pelo Banco Central).
            </li>
            <li className="flex items-start text-gray-600">
              <span className="font-bold text-emerald-700 mr-2">3.</span>
              (Opcional) Digite um Valor Fixo. Se deixar em branco, o cliente terá que digitar o valor na hora do pagamento.
            </li>
            <li className="flex items-start text-gray-600">
              <span className="font-bold text-emerald-700 mr-2">4.</span>
              O QR Code será gerado na mesma hora. Você pode salvá-lo, imprimir ou copiar o código em formato de texto.
            </li>
          </ol>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Vantagens de ter uma Plaquinha PIX</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li><strong>Rapidez no Caixa:</strong> Elimina filas, já que o cliente não perde tempo digitando dados.</li>
                <li><strong>Evita erros:</strong> Impede que o cliente digite uma chave errada e mande o dinheiro para outra pessoa.</li>
                <li><strong>Mais segurança:</strong> Não é preciso expor seus dados pessoais (como CPF ou e-mail) se você utilizar uma chave aleatória no QR Code.</li>
                <li><strong>Sem taxas de maquininha:</strong> Diferente dos cartões de débito e crédito, receber pelo PIX tem isenção de taxas para a maioria das contas.</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Dúvidas Frequentes (FAQ)</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">O QR Code PIX expira?</h4>
                  <p className="text-sm text-gray-600">
                    Não. O código que geramos é do tipo "QR Code Estático". Isso significa que ele vai funcionar para sempre, desde que a chave PIX vinculada continue existindo no seu banco.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">E se o cliente não conseguir ler a imagem?</h4>
                  <p className="text-sm text-gray-600">
                    Nossa ferramenta também gera o <Link to="/ferramentas/gerador-pix-copia-e-cola" className="text-emerald-700 hover:underline">PIX Copia e Cola</Link> automaticamente logo abaixo da imagem. Basta enviar esse texto para o cliente colar no app do banco.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">É seguro? Vocês guardam meus dados?</h4>
                  <p className="text-sm text-gray-600">
                    Totalmente seguro. Não temos banco de dados. O gerador pega o que você digita e converte no padrão do Banco Central em tempo real, na tela do seu dispositivo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AdSense />
      </div>
    </div>
  );
}
