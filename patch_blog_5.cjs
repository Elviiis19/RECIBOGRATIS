const fs = require('fs');
let code = fs.readFileSync('src/data/blogPosts.ts', 'utf-8');

const newPost = `  {
    slug: 'como-fazer-recibo-de-compra-e-venda-de-veiculo',
    title: 'Como Fazer Recibo de Compra e Venda de Veículo de Forma Segura',
    category: 'burocracia-descomplicada',
    seoTitle: 'Como Fazer Recibo de Compra e Venda de Veículo | Guia Prático',
    seoDescription: 'Aprenda como fazer um recibo de compra e venda de veículo de forma segura. Descubra os dados essenciais para proteger comprador e vendedor.',
    intro: {
      acordo: 'Comprar ou vender um carro (ou moto) é um momento de alegria, mas também de muita burocracia. Depois de negociar o valor e fechar o negócio, chega a hora de formalizar a transação.',
      promessa: 'Fazer o acerto "de boca" ou confiar apenas no comprovante do Pix é um erro que pode gerar muita dor de cabeça para os dois lados.',
      previa: 'Saber como fazer um recibo de compra e venda de veículo detalhado e nos padrões corretos é a melhor maneira de garantir a segurança jurídica da negociação e evitar problemas com multas ou impostos no futuro.'
    },
    sections: [
      {
        h2: 'Por que o recibo simples não substitui o CRV?',
        content: \`
          <p>Antes de tudo, é importante esclarecer: o recibo de que estamos falando aqui <strong>NÃO</strong> substitui o CRV (Certificado de Registro de Veículo), que é o documento oficial de transferência do Detran (o famoso "recibo de compra e venda" ou ATPV-e).</p>
          <p class="mt-4">Então, para que serve esse recibo simples? Ele atua como um <strong>comprovante financeiro da transação</strong>. Ele prova que o vendedor recebeu o dinheiro (ou parte dele) e entregou o veículo, estabelecendo um marco temporal importante caso ocorra algum problema antes da transferência oficial no Detran ser concluída.</p>
        \`
      },
      {
        h2: 'O que não pode faltar no seu recibo de compra e venda?',
        content: \`
          <p>Para que o documento tenha validade e sirva como prova da negociação, ele precisa ser detalhado. Ao preencher, certifique-se de incluir:</p>
          <ul class="list-disc pl-5 my-4 space-y-2">
            <li><strong>Identificação das Partes:</strong> Nome completo, CPF, RG e endereço do comprador e do vendedor.</li>
            <li><strong>Dados do Veículo:</strong> Marca, modelo, ano de fabricação, ano do modelo, cor, placa e número do Renavam (e, se possível, o número do chassi).</li>
            <li><strong>O valor exato da negociação:</strong> Sempre expresso em números e também por extenso.</li>
            <li><strong>Forma de pagamento:</strong> Especifique se foi à vista (Pix, TED, dinheiro) ou parcelado (e como serão as parcelas).</li>
            <li><strong>Data e local:</strong> Informações cruciais para comprovar quando o negócio foi fechado.</li>
          </ul>
        \`,
        hasCta: {
            text: "Gere agora o recibo completo para a venda do seu veículo:",
            link: "/recibo-de-compra-e-venda",
            ctaLabel: "Emitir Recibo de Veículo"
        }
      },
      {
        h2: 'A importância de formalizar o sinal (entrada)',
        content: \`
          <p>É muito comum na venda de veículos que o comprador dê um "sinal" para segurar o negócio enquanto providencia o restante do dinheiro ou o financiamento.</p>
          <p class="mt-4">Nesses casos, NUNCA deixe de emitir um comprovante. Você pode utilizar um <a href="/recibo-de-sinal" class="text-emerald-700 font-semibold hover:underline">recibo de sinal (arras)</a> específico, que documenta exatamente que aquele valor é uma garantia de compra, protegendo o vendedor caso o comprador desista (e vice-versa).</p>
        \`
      }
    ],
    conclusion: 'A negociação de um veículo envolve valores altos e responsabilidades civis e criminais. Manter tudo documentado através de recibos claros e completos é a única forma de garantir tranquilidade para quem compra e para quem vende. Formalize sua transação de forma inteligente e evite surpresas desagradáveis.',
    faqs: [
      {
        question: 'O recibo simples precisa ser reconhecido em cartório?',
        answer: 'Embora não seja obrigatório por lei para a validade do recibo simples entre as partes, reconhecer firma (autenticar a assinatura no cartório) traz uma camada extra de segurança jurídica inquestionável, provando que as pessoas que assinaram são realmente elas.'
      },
      {
        question: 'Se eu fiz o recibo simples, ainda preciso preencher o documento do Detran?',
        answer: 'Sim, ABSOLUTAMENTE! O recibo simples comprova a transação financeira. A transferência de propriedade (para fins de multas, IPVA e documentação) SÓ ocorre após o preenchimento, reconhecimento de firma e comunicação de venda do CRV (ou ATPV-e) junto ao Detran.'
      },
      {
        question: 'Quem fica com o recibo?',
        answer: 'O ideal é sempre fazer em duas vias iguais. O comprador assina a via que fica com o vendedor (confirmando que recebeu o veículo), e o vendedor assina a via que fica com o comprador (confirmando que recebeu o dinheiro).'
      }
    ]
  },
  {`;

code = code.replace(
  /export const blogPosts: BlogPost\[\] = \[\s*\{/,
  `export const blogPosts: BlogPost[] = [\n${newPost}`
);

fs.writeFileSync('src/data/blogPosts.ts', code);
