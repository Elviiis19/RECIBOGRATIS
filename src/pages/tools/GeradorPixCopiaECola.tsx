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
        title="Gerador de PIX Copia e Cola Grátis e Sem Cadastro"
        description="Crie seu código PIX copia e cola online grátis em segundos. Gerador sem cadastro, seguro e rápido para gerar link de cobrança PIX."
        keywords="gerador de pix grátis, criar qr code pix gratuito, código pix copia e cola online, link de cobrança pix, gerar cobrança pix via whatsapp"
        schema={JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebApplication",
              "name": "Gerador de PIX Copia e Cola Grátis",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "Any"
            },
            {
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
                  "name": "Gerador de PIX Copia e Cola",
                  "item": "https://recibogratis.com.br/ferramentas/gerador-pix-copia-e-cola"
                }
              ]
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "O código Pix Copia e Cola expira?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Não expira. O código gerado aqui é do tipo estático, ou seja, enquanto a sua chave PIX existir no seu banco, o código funcionará normalmente."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Tem alguma taxa para gerar?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A nossa ferramenta é totalmente grátis. Você não precisa fazer cadastro e não cobramos nenhuma taxa para gerar ou usar o link de cobrança."
                  }
                },
                {
                  "@type": "Question",
                  "name": "O Copia e Cola funciona em qualquer banco?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sim, ele segue o padrão do Banco Central e é aceito em todos os aplicativos bancários que possuem a área PIX."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Posso usar para cobrar pelo Instagram ou WhatsApp?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Com certeza! Essa é a principal vantagem. Você gera o código e envia o texto pelo direct ou chat, e seu cliente só precisa copiar e colar no banco dele."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Qual chave PIX devo usar?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Você pode usar qualquer chave cadastrada (CPF, CNPJ, e-mail, celular ou chave aleatória). A chave aleatória é muito indicada se você não quer expor seus dados pessoais."
                  }
                }
              ]
            }
          ]
        })}
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            O que é e como funciona o PIX Copia e Cola?
          </h2>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            Se você precisa receber um pagamento rápido mas o seu cliente não pode apontar a câmera para a tela, o código PIX Copia e Cola online é a solução perfeita. Em vez de ler uma imagem, o usuário apenas copia o texto e cola no aplicativo do banco. É a forma mais fácil de gerar cobrança PIX via WhatsApp, e-mail ou redes sociais.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">
            Passo a passo: Como usar o gerador de PIX grátis
          </h3>
          <ol className="space-y-4 mb-8">
            <li className="flex items-start text-gray-600">
              <span className="font-bold text-emerald-600 mr-2">1.</span>
              Preencha sua Chave PIX (CPF, CNPJ, E-mail, Celular ou Aleatória).
            </li>
            <li className="flex items-start text-gray-600">
              <span className="font-bold text-emerald-600 mr-2">2.</span>
              Digite o valor da cobrança e, se quiser, o nome do recebedor e a cidade.
            </li>
            <li className="flex items-start text-gray-600">
              <span className="font-bold text-emerald-600 mr-2">3.</span>
              Clique no botão para gerar seu link de cobrança PIX.
            </li>
            <li className="flex items-start text-gray-600">
              <span className="font-bold text-emerald-600 mr-2">4.</span>
              Copie o texto gerado e envie para quem vai pagar!
            </li>
          </ol>

          <div className="bg-emerald-50 rounded-xl p-6 mb-8 border border-emerald-100">
            <h3 className="text-lg font-semibold text-emerald-900 mb-3 flex items-center">
              <ShieldCheck className="w-5 h-5 mr-2" />
              É Seguro usar um gerador de PIX online?
            </h3>
            <p className="text-emerald-800 text-sm leading-relaxed mb-0">
              Sim, é 100% seguro. O nosso gerador de PIX Copia e Cola gratuito não acessa sua conta bancária e não guarda seu dinheiro. Ele apenas formata os seus dados no padrão do Banco Central (BR Code). O Pix movimentou R$ 35,36 trilhões em 2025, com 79,8 bilhões de transações segundo o Banco Central, sendo o método mais seguro do Brasil atualmente.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Diferença entre QR Code e Copia e Cola</h3>
              <p className="text-gray-600 mb-4">
                Basicamente, eles são a mesma coisa, mas em formatos diferentes. O <strong>QR Code PIX</strong> é a versão em imagem que você escaneia com a câmera. Já o <strong>PIX Copia e Cola</strong> é o "texto por trás" dessa imagem.
              </p>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">Quando usar o Copia e Cola?</h3>
              <ul className="list-disc pl-5 text-gray-600 mb-4 space-y-2">
                <li><strong>Vendas pelo WhatsApp/Instagram:</strong> Envie o texto direto no chat do cliente.</li>
                <li><strong>Cobranças recorrentes:</strong> Salve o código num bloco de notas e reutilize.</li>
                <li><strong>Dificuldade com câmera:</strong> Alguns celulares antigos têm câmera ruim para ler QR Code. O Copia e Cola sempre funciona.</li>
              </ul>

              <p className="text-gray-600">
                Depois de gerar o seu Copia e Cola, você também pode aproveitar e emitir um <Link to="/recibo-de-pagamento" className="text-emerald-600 hover:underline">Recibo de Pagamento</Link> para formalizar a transação! Se precisar gerar com imagem, use o nosso <Link to="/gerador-qr-code-pix" className="text-emerald-600 hover:underline">Gerador de QR Code</Link>.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Dúvidas Frequentes (FAQ)</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">O código Pix Copia e Cola expira?</h4>
                  <p className="text-sm text-gray-600">
                    Não expira. O código gerado aqui é do tipo estático, ou seja, enquanto a sua chave PIX existir no seu banco, o código funcionará normalmente.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Tem alguma taxa para gerar?</h4>
                  <p className="text-sm text-gray-600">
                    A nossa ferramenta é totalmente grátis. Você não precisa fazer cadastro e não cobramos nenhuma taxa para gerar ou usar o link de cobrança.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">O Copia e Cola funciona em qualquer banco?</h4>
                  <p className="text-sm text-gray-600">
                    Sim, ele segue o padrão do Banco Central e é aceito em todos os aplicativos bancários que possuem a área PIX.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Posso usar para cobrar pelo Instagram ou WhatsApp?</h4>
                  <p className="text-sm text-gray-600">
                    Com certeza! Essa é a principal vantagem. Você gera o código e envia o texto pelo direct ou chat, e seu cliente só precisa copiar e colar no banco dele.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Qual chave PIX devo usar?</h4>
                  <p className="text-sm text-gray-600">
                    Você pode usar qualquer chave cadastrada (CPF, CNPJ, e-mail, celular ou chave aleatória). A chave aleatória é muito indicada se você não quer expor seus dados pessoais.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AdSense />
      </div>
    </>
  );
}
