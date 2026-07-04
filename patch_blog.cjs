const fs = require('fs');
let code = fs.readFileSync('src/data/blogPosts.ts', 'utf-8');

const newPost = `  {
    slug: 'como-emitir-recibo-de-aluguel-online',
    title: 'Como Emitir Seu Recibo de Aluguel Online (Prático, Seguro e Gratuito)',
    category: 'burocracia-descomplicada',
    seoTitle: 'Como Emitir Recibo de Aluguel Online Grátis | Passo a Passo',
    seoDescription: 'Descubra como emitir seu recibo de aluguel online de forma rápida e segura. Abandone o papel, evite erros e gerencie seus imóveis com um gerador gratuito em PDF.',
    intro: {
      acordo: 'Você fechou a locação, o inquilino mandou o Pix e agora pede o comprovante. Vai mesmo procurar um bloquinho azul de papelaria na gaveta e preencher tudo à mão?',
      promessa: 'A gestão de imóveis exige praticidade, e gerar um recibo de aluguel online é o caminho mais rápido para manter suas locações organizadas, sem burocracia e com total controle digital.',
      previa: 'Neste artigo, você vai entender na prática como abandonar o papel, garantir a validade dos seus comprovantes e enviar tudo pelo WhatsApp em questão de segundos.'
    },
    sections: [
      {
        h2: 'Por que o formato digital é a melhor escolha?',
        content: \`
          <p>Trabalhar com locação de imóveis (seja uma casa, um apartamento ou uma sala comercial) exige registro. Perder um canhoto de papel pode gerar uma dor de cabeça imensa no futuro. Ao utilizar uma ferramenta para emitir um <strong>recibo de aluguel online grátis</strong>, você ganha:</p>
          <ul class="list-disc pl-5 my-4 space-y-2">
            <li><strong>Organização automática:</strong> Todos os dados do locador, locatário e valores ficam formatados em um layout limpo e profissional.</li>
            <li><strong>Zero erros de preenchimento:</strong> O sistema geralmente escreve o valor por extenso de forma automática, evitando rasuras ou erros de caligrafia.</li>
            <li><strong>Acessibilidade total:</strong> Você pode gerar o documento do seu celular, no meio da rua, assim que a notificação do pagamento chegar.</li>
            <li><strong>Sustentabilidade e economia:</strong> Chega de gastar com impressões desnecessárias ou blocos de papel que acabam amassando.</li>
          </ul>
        \`
      },
      {
        h2: 'O que não pode faltar no seu documento',
        content: \`
          <p>Para que os seus recibos de aluguel tenham força e evitem qualquer mal-entendido, eles precisam ir direto ao ponto, mas com a informação completa. Um bom comprovante precisa ter:</p>
          <ul class="list-disc pl-5 my-4 space-y-2">
            <li><strong>Dados de quem recebe (Locador):</strong> Nome completo e CPF/CNPJ.</li>
            <li><strong>Dados de quem paga (Locatário):</strong> Nome completo e CPF/CNPJ.</li>
            <li><strong>Valor exato:</strong> Em números e também escrito por extenso (para evitar contestações).</li>
            <li><strong>Referência clara:</strong> É vital especificar a qual mês aquele pagamento se refere (ex: "Aluguel referente ao mês de Maio/2026").</li>
            <li><strong>Data e local:</strong> Onde e quando o documento foi gerado.</li>
          </ul>
          <p class="mt-4">Se você preferir um documento ainda mais profissional, utilize nosso gerador de <a href="/recibo-de-aluguel" class="text-emerald-700 font-semibold hover:underline">Recibo de Aluguel Simples</a> ou o modelo exclusivo de <a href="/recibo-de-aluguel-com-logo" class="text-emerald-700 font-semibold hover:underline">Recibo de Aluguel com Logo</a> (ideal para imobiliárias e corretores independentes).</p>
        \`,
        hasCta: {
            text: "Crie agora seu comprovante com nossa ferramenta:",
            link: "/recibo-de-aluguel",
            ctaLabel: "Gerar Recibo de Aluguel"
        }
      },
      {
        h2: 'Passo a passo: Como fazer seu recibo aluguel online gratis',
        content: \`
          <p>A ideia é não perder tempo com sistemas complexos. O fluxo para emitir o seu <strong>recibo aluguel online</strong> deve levar menos de um minuto:</p>
          <ol class="list-decimal pl-5 my-4 space-y-2">
            <li><strong>Acesse o gerador:</strong> Abra a nossa ferramenta gratuita de recibos direto no seu navegador (sem precisar baixar aplicativos que pesam no celular).</li>
            <li><strong>Preencha os dados básicos:</strong> Insira o valor do aluguel, o nome do seu inquilino e o mês de referência.</li>
            <li><strong>Gere o PDF:</strong> Clique em gerar. O sistema formata um recibo de aluguel on line perfeito, com layout profissional.</li>
            <li><strong>Compartilhe na hora:</strong> Salve o arquivo PDF ou envie o link diretamente para o WhatsApp ou e-mail do seu inquilino. Assunto resolvido.</li>
          </ol>
        \`
      }
    ],
    conclusion: 'Gerar o seu recibo de aluguel nunca foi tão prático. Esqueça os blocos de papel e as rasuras; adote o formato digital para ter mais controle e profissionalismo nas suas locações. Não deixe para depois, experimente nossos modelos gratuitos agora mesmo e simplifique sua rotina!',
    faqs: [
      {
        question: 'Um recibo de aluguel gerado online tem validade legal?',
        answer: 'Sim. A validade do documento não está no papel, mas sim nas informações contidas nele. Um comprovante digital que descreve claramente as partes, o valor e o objeto do pagamento (o aluguel) tem total validade, especialmente quando acompanhado do comprovante de transferência bancária ou Pix.'
      },
      {
        question: 'Preciso imprimir e assinar o recibo gerado?',
        answer: 'Não obrigatoriamente. O envio do documento digital (em PDF) pelo WhatsApp ou e-mail do inquilino, atrelado ao comprovante do Pix, já serve como excelente documentação. Se preferir, você pode utilizar assinaturas digitais ou simplesmente imprimir caso o locatário exija a via física assinada à caneta.'
      },
      {
        question: 'Existe algum limite de emissão no gerador gratuito?',
        answer: 'Não. Você pode gerar quantos comprovantes precisar. Se você gerencia vários imóveis, basta abrir a ferramenta, preencher os dados do próximo inquilino e gerar um novo comprovante instantaneamente, sem custos.'
      }
    ]
  },
  {`;

code = code.replace(
  /export const blogPosts: BlogPost\[\] = \[\s*\{/,
  `export const blogPosts: BlogPost[] = [\n${newPost}`
);

fs.writeFileSync('src/data/blogPosts.ts', code);
