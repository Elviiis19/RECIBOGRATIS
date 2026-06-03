import { useState } from 'react';
import { SEO } from '../../components/SEO';
import { AdSense } from '../../components/AdSense';
import { Copy, CheckCircle2, Link2, AlertCircle } from 'lucide-react';
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
        title="Gerador de Link PIX Copia e Cola Online"
        description="Gere códigos PIX Copia e Cola instantaneamente para enviar por WhatsApp ou e-mail. Facilite as cobranças do seu negócio sem pagar taxas."
        keywords="gerador pix copia e cola, link de cobranca pix, gerar link pix, pix copia e cola online, codigo pix"
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
        
        <div className="prose prose-emerald max-w-none mt-12 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <h2>PIX Copia e Cola via Link e BR Code</h2>
          <p>O ecossistema oficial do PIX administrado e regulamentado pela arquitetura do Banco Central reconfigurou desde sua fundação toda a engrenagem de pagamentos entre pessoas físicas e logistas corporativos varejistas. No lugar da simples transação pela chave nua de CPF, ou as antigas transferências DOC e TED com alta tarifa para caixas, surgiu a solução gratuita das strings consolidadas: O padrão EMV BR Code de cobrança instantânea unificada.</p>

          <h3>Basta preencher seu recebedor e colar no Whatsapp para Cobrar</h3>
          <p>
            Ao fornecer este link estruturado de "Copia e Cola" a um devedor, a experiência em tela que essa pessoa usufruirá com o App de seu próprio banco local se tornará mais ágil. Diferente de digitar uma chave telefônica e ser demandado de preencher manualmente um valor aberto: nosso super link já estampa a ele o seu nome original e o valor centavo a centavo na confirmação nativa. Dessa forma o logista impede recebimentos aleatórios equivocados e confusões no balanço ou caixa contábil sem pagar ou faturar os sistemas de API emissores.
          </p>

          <hr className="my-8" />
          
          <h2>Perguntas Frequentes (FAQ)</h2>
          
          <div className="space-y-4 not-prose mt-6">
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                Qual a diferença deste Copia e Cola para uma placa de QR Code com câmera?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Tanto o quadrado preto escaneavel das vitrines QR e esse enorme formato comprido de strings aglutinadas num bloco de cópia textual, eles se equivalem ao mesmo bloco <strong>(Payload em base BR Code do Banco Central)</strong>. Mas os fluxos operacionais diferem fisicamente de usabilidade. Esse padrão de "CopiaCola" serve de maneira fundamental perante compras e pagamentos digitais originados nos smartphones e nos Directs em ambiente virtual — na medida em que a pessoa não pode e se bloqueia a abrir a câmera para pagar num objeto onde ela mesma está consumindo em mãos lendo mensagens no smartphone por e-commerce online ou whatsapp das pequenas agencias de marketing ou recibão particular free lance.
              </p>
            </details>
            
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                O site detém taxas de porcentagem gerando meu pix pra fora da loja?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                <strong>Não cobramos qualquer taxa, tarifa de pedágio ou custo sobre faturamento real da conversão e saque do Brasil.</strong> A base que este utilitário processa serve para gerar na internet de forma pública, local (no browser fechado), um arquivo de configuração de texto cru puro e estático do seu endereço PIX de origem vinculada do banco privado, tal qual ele o enviaremos. Como tal, os reais convertidos nas faturas liquidadas no ambiente digital despontam ininterruptamente até sua baliza originária final com 0% descontos adicionados de comissão financeira pra nosso balanço. 
              </p>
            </details>
          </div>
        </div>
      </div>
    </>
  );
}
