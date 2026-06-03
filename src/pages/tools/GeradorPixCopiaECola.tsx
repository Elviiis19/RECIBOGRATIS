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
          <h2>Como gerar link PIX Copia e Cola online grátis?</h2>
          <p>O ecossistema oficial do PIX criado e regulamentado pela arquitetura do Banco Central reconfigurou desde sua fundação toda a engrenagem de pagamentos e liquidações instantâneas entre pessoas físicas e grandes logistas corporativos varejistas. No lugar da simples transação pela chave nua de CPF, ou as engessadas antigas transferências DOC e TED com alta tarifa para caixas no balcão, surgiu a solução gratuita definitiva das strings consolidadas de cobrança limpa: O formidável e indestrutível padrão EMV BR Code de cobrança via payload instantânea unificada. Usando nossa ferramenta livre de custos acima, você consolida esse poder digital.</p>

          <h3>Basta preencher seu recebedor e colar no Direct ou Whatsapp para Cobrar</h3>
          <p>
            Ao utilizar o gerador acima do Recibo Fácil, você preenche em 30 segundos sua exata matriz de chave, o nome exato da base cravado na raiz da conta recebedora no banco, a cidade nativa da operação e o valor fechado estrito (como a mensalidade exata de R$ 90,00 da sua escola ou academia online). O algoritmo reverte isso num super link massivo e longo estático.
          </p>
          <p>
            Ao fornecer esse grande texto estruturado de <strong>"Copia e Cola"</strong> a um pagador devedor no celular pelo chat, a experiência final em tela que essa pessoa final usufruirá com o próprio App nativo de seu próprio banco recebedor local fluirá de maneira extremamente ágil. Totalmente diferente do maçante processo de digitar forçosamente uma chave telefônica solta correndo risco de erro de pontuação e sendo demandado exaustivamente de preencher ou adivinhar manualmente um valor no campo em branco livre: o nosso super link já estampa e preenche engessando a ele no visor final o seu nome original oficial atrelado de forma irrevogável acompanhado do valor centavo a centavo na confirmação nativa. Dessa forma limpa e blindada o logista barra depósitos e recebimentos aleatórios equivocados com quantias arredondadas para menos e detona falhas operacionais confusões no fechamento contábil e balanço caixa contábil semanal sem precisar incorrer pesados e exorbitantes tributos para alugar e contratar de fato robustos e cobradores os engessados sistemas caros de faturamentos de terceiros ou se aliar faturar aos integradores os onerosos sistemas de API emissores.
          </p>

          <hr className="my-8" />
          
          <h2>Perguntas Frequentes (FAQ)</h2>
          
          <div className="space-y-4 not-prose mt-6">
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                Qual a diferença deste Copia e Cola online para uma placa de QR Code física?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Tanto o quadrado escaneável QR Code quanto este enorme formato contínuo alfa-numérico se equivalem de maneira idêntica: <strong>ambos operam no formato padrão e seguro "Payload" regulado pelo BR Code do Banco Central</strong>. A diferença está apenas na utilidade base da ocasião. Esse prático padrão comprido de texto chamado "Copia e Cola" serve exaustivamente de utilidade vital perante compras e quitações originadas dentro dos smartphones e resolvidas no <strong>calor eletrônico do seu chat do WhatsApp ou nos directs do Instagram de forma imediata</strong> — mitigando a restritiva situação em que a pessoa jamais conseguiria usar a própria câmera do próprio celular dela para ler uma imagem que está dentro do próprio display do seu equipamento isolado na leitura digital da cobrança. O texto purificado atalha esse bloqueio e aciona em segundos para o clique a autorização para pagamento lendo do clipboard com o copiado dela em uso.
              </p>
            </details>
            
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                O site repassa a transação ou cobra taxas/pedágios embutidos tirando lucro passivo neste processamento e código gerado de PIX?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                <strong>Não. Aqui operamos isentos de intermediações bancárias obscuras de retenção (cobramos e retemos literalmente taxa e comissão zero no nosso balanço).</strong> A nossa base arquitetada e robusta e a plataforma desse utilitário trabalha exaustiva e de forma aberta atuando gerando arquivos textuais puros encriptados da origem raiz informada para cobranças vinculadas no aplicativo direto ao celular nativo do consumidor sem interceptação e repasses da rede de e-commerce privada transacionando entre quem pagou e de fato cobrou em seu destino de caixa puro estrito ininterrupto e 100% autônomo nas contas brasileiras estatais limpas.
              </p>
            </details>
          </div>
        </div>
      </div>
    </>
  );
}
