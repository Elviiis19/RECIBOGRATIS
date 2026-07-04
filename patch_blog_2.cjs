const fs = require('fs');
let code = fs.readFileSync('src/data/blogPosts.ts', 'utf-8');

const newPost = `  {
    slug: 'como-criar-recibo-gratis-e-profissional-para-seus-servicos',
    title: 'Como Criar Recibo Grátis e Profissional para Seus Serviços em Segundos',
    category: 'autonomos',
    seoTitle: 'Como Criar Recibo Grátis e Profissional Online | Passo a Passo',
    seoDescription: 'Aprenda como criar um recibo grátis, simples e profissional online para seus serviços em segundos. Diga adeus aos blocos de papel e emita PDF na hora.',
    intro: {
      acordo: 'Terminou o serviço, o dinheiro caiu na conta e o cliente pediu o comprovante na mesma hora. Você vai mesmo abrir o editor de texto, procurar um arquivo antigo, apagar os dados do cliente passado e rezar para não esquecer nada?',
      promessa: 'O tempo de quem trabalha por conta própria, seja freelancer, autônomo ou dono de um pequeno negócio, é valioso demais para ser gasto com burocracia manual.',
      previa: 'Saber criar recibo grátis pela internet é a solução definitiva para entregar um documento com aparência profissional em questão de segundos, sem complicação e sem instalar nenhum programa.'
    },
    sections: [
      {
        h2: 'Por que optar por um recibo simples online?',
        content: \`
          <p>A agilidade no fechamento de um serviço é um forte diferencial competitivo. Quando o pagamento acontece — seja via Pix, transferência ou em espécie —, a expectativa do cliente é receber a confirmação de imediato.</p>
          <p class="mt-4">Utilizar um <strong>recibo online gratuito</strong> não só agiliza o seu lado, como também transmite extrema credibilidade. Esqueça os blocos de papel amassados, letras ilegíveis ou rasuras. Um documento gerado digitalmente é limpo, padronizado e pode ser encaminhado pelo WhatsApp antes mesmo de você sair da frente do cliente ou desligar a chamada.</p>
          <p class="mt-4">Além disso, manter seus comprovantes em formato digital facilita o controle financeiro do seu negócio. Se você quiser se aprofundar nessa organização, vale a pena conferir nosso guia sobre <a href="/blog/como-separar-o-dinheiro-pessoal-do-negocio-sendo-mei" class="text-emerald-700 font-semibold hover:underline">como separar e gerenciar o dinheiro do negócio</a> de forma descomplicada.</p>
        \`
      },
      {
        h2: 'O que não pode faltar no seu modelo de recibo de pagamento grátis?',
        content: \`
          <p>Para que o documento tenha validade, respalde o seu trabalho e evite qualquer dor de cabeça futura, ele precisa ser direto, porém completo. Ao gerar o seu comprovante, verifique se o formulário contempla os seguintes pontos essenciais:</p>
          <ul class="list-disc pl-5 my-4 space-y-2">
            <li><strong>Identificação clara das partes:</strong> Nome completo e CPF (ou CNPJ) tanto de quem realizou o pagamento quanto de quem prestou o serviço.</li>
            <li><strong>O valor exato:</strong> Sempre expresso em números e também por extenso para impossibilitar qualquer alteração ou contestação.</li>
            <li><strong>A data e o local:</strong> Informações cruciais para o registro contábil e validade do ato.</li>
            <li><strong>Descrição do que foi entregue:</strong> Um detalhamento breve e objetivo (exemplo: "Referente à pintura residencial externa" ou "Referente ao desenvolvimento de layout para site").</li>
          </ul>
        \`,
        hasCta: {
            text: "Emita seu recibo de prestação de serviços agora mesmo:",
            link: "/recibo-de-prestacao-de-servicos",
            ctaLabel: "Gerar Recibo de Serviços"
        }
      },
      {
        h2: 'Passo a passo para emitir seu recibo online grátis',
        content: \`
          <p>A maior vantagem da tecnologia em nuvem é não depender de um computador específico. Você resolve tudo pelo navegador do smartphone ou do notebook de forma muito intuitiva:</p>
          <ol class="list-decimal pl-5 my-4 space-y-2">
            <li><strong>Acesse a ferramenta:</strong> Entre no nosso <a href="/recibo-simples" class="text-emerald-700 font-semibold hover:underline">gerador de recibo simples</a> diretamente pelo navegador.</li>
            <li><strong>Insira os dados brutos:</strong> Preencha os campos com as informações do cliente, o valor cobrado e a descrição do serviço.</li>
            <li><strong>Gere o documento:</strong> Com um clique, o sistema processa as informações e entrega um recibo simples online formatado dentro dos padrões adequados.</li>
            <li><strong>Envie na hora:</strong> Salve o arquivo em PDF ou copie o link para mandar diretamente no WhatsApp ou e-mail do cliente. Serviço concluído com sucesso e segurança.</li>
          </ol>
        \`
      }
    ],
    conclusion: 'Com a ferramenta certa, a emissão de recibos deixa de ser uma tarefa maçante e se torna uma etapa rápida e profissional do seu atendimento. Gere seus comprovantes online agora mesmo e mostre aos seus clientes o valor e a organização do seu trabalho.',
    faqs: [
      {
        question: 'O recibo gerado online tem a mesma validade do recibo de papel?',
        answer: 'Sim. A validade jurídica de um recibo está ligada à veracidade das informações que ele contém (quem pagou, quem recebeu, valor e motivo), e não ao material em que foi feito. Um PDF com os dados corretos, acompanhado do comprovante bancário, tem total validade.'
      },
      {
        question: 'Posso usar esse gerador para qualquer tipo de serviço ou venda?',
        answer: 'Com certeza. A flexibilidade da ferramenta permite que você adapte a "descrição" para qualquer cenário: venda de produtos, prestação de serviços técnicos, aulas particulares, consultorias, entre outros.'
      },
      {
        question: 'Preciso baixar algum programa ou criar uma conta complexa?',
        answer: 'Não. O foco do recibo online grátis é a acessibilidade. Todo o processo roda no seu navegador, sem exigir downloads suspeitos ou preenchimento de longos formulários de cadastro. É entrar, gerar e enviar.'
      }
    ]
  },
  {`;

code = code.replace(
  /export const blogPosts: BlogPost\[\] = \[\s*\{/,
  `export const blogPosts: BlogPost[] = [\n${newPost}`
);

fs.writeFileSync('src/data/blogPosts.ts', code);
