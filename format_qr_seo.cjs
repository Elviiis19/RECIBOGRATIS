const fs = require('fs');

const file = 'src/pages/tools/LeitorQrCode.tsx';
let code = fs.readFileSync(file, 'utf8');

const newSeoContent = `
            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Camera className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Como ler um QR Code que está na própria tela do celular?
              </h2>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                  <p>Um dos maiores problemas hoje em dia é receber um QR Code via WhatsApp ou e-mail e não ter como lê-lo, afinal, o código está na tela do seu próprio aparelho e você não tem outro celular em mãos para apontar a câmera.</p>
                  <p>A solução é muito simples e você não precisa instalar nenhum aplicativo:</p>
                  <ul>
                    <li>Tire um <strong>print da tela (captura de tela)</strong> ou salve a imagem do QR Code na sua galeria.</li>
                    <li>Acesse esta página e clique no botão verde <strong>"Enviar Imagem"</strong>.</li>
                    <li>Selecione a foto que você acabou de salvar.</li>
                    <li>Pronto! Nosso decodificador vai extrair o texto, link ou código PIX instantaneamente.</li>
                  </ul>
                </div>
              </div>
            </article>

            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <LinkIcon className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Decodificador PIX, Cardápios e Ingressos
              </h2>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                  <p>O Leitor de QR Code Online do Recibo Grátis é uma ferramenta universal. Você pode utilizá-lo para diversas finalidades do dia a dia:</p>
                  <ul>
                    <li><strong>Decodificar código PIX:</strong> Se o aplicativo do banco não estiver conseguindo focar na imagem ou apresentar erro, carregue a imagem aqui. Nós exibiremos o texto "Pix Copia e Cola" (o código EMV) para você copiar e colar diretamente no seu app bancário.</li>
                    <li><strong>Acessar Cardápios Digitais:</strong> Restaurantes e lanchonetes muitas vezes enviam o menu via QR Code no WhatsApp. Leia a imagem e descubra o link do cardápio sem mistérios.</li>
                    <li><strong>Ler Ingressos e Cupons:</strong> Identifique qual é o código hash por trás do ingresso do seu show, ou descubra o link promocional escondido num panfleto.</li>
                    <li><strong>Segurança Antifraude:</strong> Antes de acessar um site desconhecido através de um QR Code impresso num poste ou panfleto suspeito, leia com nossa ferramenta. Nós não abrimos o link automaticamente, mostramos primeiro o endereço na sua tela para que você decida se é seguro ou não.</li>
                  </ul>
                </div>
              </div>
            </article>
`;

if (code.includes('Por que usar um leitor de QR Code de imagem online?')) {
  // Substituir todo o bloco de <section className="space-y-12"> do SEO e os FAQs para adicionar as melhorias.
  // Vamos reescrever usando expressão regular ou apenas substituindo a parte de FAQ.
  // Pra ficar mais fácil, vou gerar a página toda de novo substituindo, ou fazer replace.
}
