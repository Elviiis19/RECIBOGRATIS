import React, { useState, useRef, ChangeEvent } from 'react';
import { SEO } from '../../components/SEO';
import { AdSense } from '../../components/AdSense';
import { QrCode, Upload, Copy, Check, Link as LinkIcon, Camera, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export function LeitorQrCode() {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setResult(null);
    setError(null);
    setCopied(false);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setError('Erro ao processar a imagem.');
          return;
        }
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        const { default: jsQR } = await import('jsqr');
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          setResult(code.data);
        } else {
          setError('Nenhum QR Code encontrado na imagem. Tente outra foto mais nítida.');
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const copyToClipboard = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isUrl = (text: string) => {
    try {
      new URL(text);
      return true;
    } catch {
      return false;
    }
  };

  const faqs = [
    {
      question: "Como ler um QR Code que está na tela do celular?",
      answer: "A forma mais fácil é tirar um 'Print' (captura de tela) da imagem onde aparece o QR Code. Em seguida, acesse nossa ferramenta de Leitor de QR Code Online, clique no botão 'Enviar Imagem' e selecione o print que você tirou. O sistema fará a leitura imediatamente."
    },
    {
      question: "Como funciona o Leitor de QR Code online?",
      answer: "Nosso leitor utiliza tecnologia avançada diretamente no seu navegador. Você só precisa enviar uma imagem que contenha um QR Code ou tirar uma foto utilizando a câmera do seu celular, e nós decodificamos a informação instantaneamente sem enviar a sua foto para nossos servidores, garantindo total privacidade."
    },
    {
      question: "É seguro ler QR Codes com esta ferramenta?",
      answer: "Sim, é 100% seguro. O processamento da imagem e a decodificação do QR Code são feitos localmente no seu dispositivo (computador ou smartphone). A imagem nunca é enviada para nenhum servidor externo. Além disso, você pode visualizar o conteúdo do QR Code antes de decidir acessá-lo, o que ajuda a prevenir golpes ou sites maliciosos."
    },
    {
      question: "Posso ler códigos PIX com esse leitor?",
      answer: "Sim! Você pode ler o QR Code de um PIX, seja para verificar os dados do recebedor e valor, ou para copiar o código 'PIX Copia e Cola' gerado pelo QR Code, facilitando o pagamento no aplicativo do seu banco caso ele esteja falhando em escanear via câmera."
    },
    {
      question: "Minha foto não tem QR Code ou deu erro, o que fazer?",
      answer: "Certifique-se de que a foto está nítida, bem iluminada e que o QR Code está visível e não cortado. Reflexos muito fortes na tela (se você tirou foto de outro celular/monitor) podem atrapalhar a leitura. Tente cortar a imagem deixando o QR Code mais em destaque."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <SEO 
        title="Leitor e Decodificador de QR Code Online | Scanner da Imagem"
        description="Leia, escaneie e decodifique QR Codes de imagens, fotos ou prints diretamente no navegador. Descubra links escondidos e códigos PIX de forma 100% segura e gratuita."
        keywords="leitor de qr code, decodificar qr code, ler qr code de foto, ler qr code imagem, escanear qr code online, qr code scanner online, leitor qr code pc, ler qr code do proprio celular"
        url="https://recibogratis.com.br/leitor-decodificador-qr-code"
      />

      {/* FAQ Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        })}
      </script>

      <div className="bg-emerald-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <QrCode className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl font-extrabold mb-4">Leitor de QR Code Online</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Envie uma imagem, tire um print ou use a câmera para descobrir o que está por trás de um QR Code com 100% de segurança e privacidade.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100 mb-12">
          
          <div className="text-center mb-8">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-3 bg-emerald-600 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <Upload className="w-6 h-6" />
                Enviar Imagem (Foto ou Print)
              </button>
              
              <button 
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.setAttribute('capture', 'environment');
                    fileInputRef.current.click();
                    setTimeout(() => fileInputRef.current?.removeAttribute('capture'), 100);
                  }
                }}
                className="flex items-center justify-center gap-3 bg-white text-emerald-600 border-2 border-emerald-600 py-4 px-6 rounded-2xl font-bold text-lg hover:bg-emerald-50 transition-colors"
              >
                <Camera className="w-6 h-6" />
                Tirar Foto (Câmera)
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4 font-medium flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              100% seguro. O processamento é feito localmente, não enviamos suas imagens para a nuvem.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-8 flex items-center justify-center text-center">
              {error}
            </div>
          )}

          {result && (
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 animate-in fade-in slide-in-from-bottom-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-500" />
                Conteúdo do QR Code Decodificado:
              </h3>
              
              <div className="bg-white border border-gray-300 rounded-xl p-4 break-all text-gray-800 font-mono text-sm mb-6 shadow-inner">
                {result}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={copyToClipboard}
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      Copiar Conteúdo
                    </>
                  )}
                </button>

                {isUrl(result) && (
                  <a
                    href={result}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                  >
                    <LinkIcon className="w-5 h-5" />
                    Acessar Link com Segurança
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="mb-12">
          <AdSense />
        </div>

        <section className="space-y-12">
          <div className="space-y-8">
            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Camera className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Como ler um QR Code que está na própria tela do celular?
              </h2>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                  <p>Um dos maiores problemas hoje em dia é receber um QR Code via WhatsApp, Instagram ou E-mail e não ter como lê-lo. Afinal, o código está na tela do seu próprio aparelho (ou PC) e você não tem outro celular em mãos para apontar a câmera.</p>
                  <p>A solução é muito simples e você não precisa baixar ou instalar nenhum aplicativo (App):</p>
                  <ul>
                    <li>Tire um <strong>print da tela (captura de tela)</strong> ou salve a imagem do QR Code na galeria de fotos do seu celular.</li>
                    <li>Acesse esta página do Recibo Grátis e clique no botão verde <strong>"Enviar Imagem (Foto ou Print)"</strong>.</li>
                    <li>Selecione o print que você acabou de salvar.</li>
                    <li>Pronto! Nosso scanner inteligente vai decodificar a imagem e extrair o texto, link de site ou código PIX instantaneamente.</li>
                  </ul>
                </div>
              </div>
            </article>

            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <LinkIcon className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Decodificador de PIX, Cardápios, Redes Sociais e Ingressos
              </h2>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                  <p>O Leitor de QR Code de Imagem Online é uma ferramenta universal. Você pode utilizá-lo para diversas finalidades úteis do dia a dia:</p>
                  <ul>
                    <li><strong>Decodificar QR Code PIX (Pix Copia e Cola):</strong> O aplicativo do banco não está focando na tela ou a câmera está com defeito? Carregue a imagem do código PIX aqui. Nós exibiremos o texto bruto do PIX (o formato EMV). Basta copiar esse texto longo e colar na função "Pix Copia e Cola" do seu app bancário.</li>
                    <li><strong>Acessar Cardápios Digitais (Menu):</strong> Bares, restaurantes e lanchonetes enviam o menu via QR Code. Leia a imagem e descubra o link do cardápio sem mistérios.</li>
                    <li><strong>Ler Ingressos, Cupons de Desconto e Passagens:</strong> Descubra o código alfanumérico por trás do ingresso do show, cupom de loja ou passagem aérea.</li>
                    <li><strong>Ler QR Code de Wi-Fi:</strong> Recebeu a senha do Wi-fi em formato de QR Code? Nosso scanner consegue revelar o nome da rede e a senha, útil principalmente em PCs e Notebooks onde não há leitor nativo da rede sem fio.</li>
                  </ul>
                </div>
              </div>
            </article>
            
            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Segurança e Privacidade Antifraude (Não Caia em Golpes)
              </h2>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                  <p>A segurança é o principal motivo pelo qual as pessoas usam nossa ferramenta. Ao apontar a câmera nativa do celular para um QR Code desconhecido (impresso num poste, numa conta que chegou pelos correios, panfleto na rua ou totem), seu aparelho pode <strong>abrir um link malicioso automaticamente</strong> (phishing).</p>
                  <p>Nossa ferramenta atua como um escudo antifraude. Quando você usa o nosso decodificador, o link não é executado automaticamente no seu dispositivo. Nós revelamos o texto ou a URL na tela para que você, como usuário, decida se o link é legítimo ou suspeito. Você está no controle.</p>
                  <p><strong>Privacidade Total:</strong> O processamento da imagem é executado via JavaScript no seu próprio navegador de internet. Nós não enviamos a foto do seu documento, fatura ou ingresso para nenhum servidor na nuvem.</p>
                </div>
              </div>
            </article>

            <hr className="border-gray-100" />

            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-8">
                Dúvidas Frequentes (FAQ)
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
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
        </section>
      </div>
    </div>
  );
}
