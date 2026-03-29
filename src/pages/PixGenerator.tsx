import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import CurrencyInput from 'react-currency-input-field';
import { Copy, CheckCircle2, QrCode, AlertCircle } from 'lucide-react';
import { SEO } from '../components/SEO';
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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO 
        title="Gerador de QR Code PIX Grátis - Copia e Cola"
        description="Gere QR Code PIX e link Copia e Cola gratuitamente. Crie plaquinhas PIX para seu negócio, loja ou evento de forma rápida e segura."
        keywords="gerador qr code pix, qr code pix, pix copia e cola, plaquinha pix, gerar pix online"
        schema={JSON.stringify(softwareSchema)}
        url="https://recibogratis.com.br/gerador-qr-code-pix"
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-2xl mb-4">
            <QrCode className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Gerador de QR Code PIX
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Crie seu QR Code PIX para receber pagamentos de forma rápida. Ideal para imprimir plaquinhas para sua loja ou enviar por WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Dados do Recebedor</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Chave PIX <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="chave"
                  value={data.chave}
                  onChange={handleChange}
                  placeholder="CPF, CNPJ, E-mail, Celular ou Aleatória"
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Nome do Recebedor <span className="text-red-500">*</span></label>
                <input
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
                <label className="block text-sm font-semibold text-gray-900 mb-2">Cidade <span className="text-red-500">*</span></label>
                <input
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
                <label className="block text-sm font-semibold text-gray-900 mb-2">Valor (Opcional)</label>
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
                  <div className="text-2xl font-bold text-emerald-600 mb-6">
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
                  {copied && <p className="text-emerald-600 text-xs mt-2 text-center font-medium">Código copiado com sucesso!</p>}
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
      </div>
    </div>
  );
}
