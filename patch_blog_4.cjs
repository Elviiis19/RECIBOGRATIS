const fs = require('fs');
let code = fs.readFileSync('src/data/blogPosts.ts', 'utf-8');

const newPost = `  {
    slug: 'guia-pratico-como-emitir-recibo-cuidador-de-idoso',
    title: 'Guia Prático: Como Emitir o Recibo Cuidador de Idoso Todo Mês',
    category: 'prestacao-de-servicos',
    seoTitle: 'Como Emitir Recibo para Cuidador de Idoso | Guia Prático',
    seoDescription: 'Aprenda como emitir um recibo detalhado e seguro para cuidador de idosos. Fuja dos modelos do Word e garanta a segurança jurídica da sua família.',
    intro: {
      acordo: 'Contratar um profissional para cuidar de um familiar exige muita confiança. No entanto, por mais próxima e amigável que seja a relação, não dá para tratar o pagamento de forma informal.',
      promessa: 'Fazer o acerto mensal apenas "de boca" ou com comprovantes genéricos é um erro que pode custar caro lá na frente.',
      previa: 'Emitir um recibo cuidador de idoso detalhado e nos padrões corretos é a melhor maneira de garantir a segurança jurídica da família e assegurar os direitos de quem está prestando esse serviço tão essencial.'
    },
    sections: [
      {
        h2: 'Fuja da armadilha do recibo de cuidador de idoso word',
        content: \`
          <p>A primeira reação de muita gente na hora de fazer o pagamento é ir ao Google e baixar um modelo estático. O famoso <strong>recibo de cuidador de idoso word</strong> parece uma solução rápida, mas costuma trazer dor de cabeça.</p>
          <p class="mt-4">Arquivos editáveis perdem a formatação facilmente. Além disso, no corre-corre do dia a dia, é muito comum esquecer de alterar o mês de referência, deixar o valor antigo ou apagar sem querer uma linha importante do texto. Ao invés de baixar arquivos no seu computador, usar um gerador online padroniza o documento. Você só digita as informações daquele mês, e o sistema entrega um PDF perfeito e travado contra erros acidentais.</p>
        \`
      },
      {
        h2: 'O que não pode faltar no recibo de pagamento para cuidador de idosos?',
        content: \`
          <p>Para que o comprovante realmente tenha validade e sirva como uma prova concreta de quitação das obrigações, ele precisa ser direto e transparente. Quando você for gerar o <strong>recibo de pagamento para cuidador de idosos</strong>, certifique-se de preencher:</p>
          <ul class="list-disc pl-5 my-4 space-y-2">
            <li><strong>Identificação completa:</strong> Nome e CPF do empregador (quem está pagando) e do cuidador.</li>
            <li><strong>Mês de referência (Competência):</strong> Deixe claríssimo a qual mês de trabalho aquele dinheiro se refere (ex: Pagamento referente aos serviços prestados em Junho/2026).</li>
            <li><strong>Discriminação de valores:</strong> O salário base e, se houver, o detalhamento de horas extras, plantões de fim de semana, adicional noturno ou vale-transporte.</li>
            <li><strong>Valor por extenso:</strong> Essencial para evitar qualquer tipo de adulteração no documento futuro.</li>
          </ul>
          <p class="mt-4">Para formalizar ainda mais a relação de trabalho, é recomendado utilizar um <a href="/termo-de-prestacao-de-servico" class="text-emerald-700 font-semibold hover:underline">contrato de prestação de serviços simples</a>, garantindo segurança para ambas as partes.</p>
        \`,
        hasCta: {
            text: "Gere agora o recibo completo e detalhado:",
            link: "/recibo-de-cuidador-de-idosos",
            ctaLabel: "Emitir Recibo de Cuidador"
        }
      },
      {
        h2: 'Praticidade no arquivamento e envio',
        content: \`
          <p>Ao utilizar uma ferramenta na nuvem, você elimina a necessidade de imprimir duas vias e gastar papel à toa todo mês. Você pode gerar o documento no seu celular, conferir os dados e enviar o PDF imediatamente para o WhatsApp do profissional.</p>
          <p class="mt-4">Ele confere e, se necessário, pode assinar digitalmente, ou você imprime apenas a via definitiva. É mais rápido, seguro e mantém todo o histórico arquivado no seu histórico de conversas ou e-mail.</p>
        \`
      }
    ],
    conclusion: 'A relação com um cuidador de idosos é baseada na confiança e no respeito. Manter os pagamentos organizados através de um recibo específico e bem formatado é a melhor forma de proteger esse vínculo e evitar passivos trabalhistas no futuro. Adote a emissão online e simplifique o seu fim de mês.',
    faqs: [
      {
        question: 'O recibo substitui a assinatura na carteira de trabalho?',
        answer: 'Não. Se o cuidador trabalha mais de dois dias por semana na mesma residência, a lei configura vínculo empregatício (PEC das Domésticas) e a carteira deve ser assinada. O recibo serve como o holerite/comprovante de pagamento daquele mês, detalhando os repasses. Para profissionais autônomos (diaristas/plantonistas eventuais), o recibo serve como comprovação de quitação do serviço prestado.'
      },
      {
        question: 'Preciso detalhar o vale-transporte no recibo?',
        answer: 'Sim. A transparência é a sua maior defesa. Tudo o que for pago em dinheiro para o cuidador, seja o salário base, ajuda de custo ou transporte, deve estar discriminado no documento para comprovar que você cumpriu com aquela obrigação específica.'
      },
      {
        question: 'Posso enviar o recibo apenas em PDF ou preciso da via física assinada à caneta?',
        answer: 'Com o avanço jurídico das comunicações digitais, o envio do PDF atrelado ao comprovante de transferência bancária (Pix) na conta do titular é uma prova fortíssima de pagamento. No entanto, para fins trabalhistas mais rigorosos, ter a via impressa com a assinatura física do profissional ou utilizar um sistema de assinatura digital válido é o cenário mais seguro.'
      }
    ]
  },
  {`;

code = code.replace(
  /export const blogPosts: BlogPost\[\] = \[\s*\{/,
  `export const blogPosts: BlogPost[] = [\n${newPost}`
);

fs.writeFileSync('src/data/blogPosts.ts', code);
