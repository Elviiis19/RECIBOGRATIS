const fs = require('fs');

let code = fs.readFileSync('src/data/receiptModels.ts', 'utf8');

const newModel = `  {
    id: "entrega-chaves",
    slug: "recibo-de-entrega-de-chaves",
    title: "Recibo de Entrega de Chaves",
    shortDescription: "Comprove a devolução do imóvel. Formaliza que o inquilino devolveu o imóvel e o proprietário aceitou as chaves.",
    seoTitle: "Recibo de Entrega de Chaves (Imóvel) | Baixar PDF Grátis",
    seoDescription: "Gere seu recibo de entrega de chaves online e grátis. Ideal para aluguel de imóveis direto com proprietário. Comprove que a locação foi encerrada.",
    keywords: "recibo de entrega de chaves, termo de entrega de chaves, devolução de chaves imóvel, recibo inquilino proprietario, modelo entrega de chaves",
    defaultReferenteA: "Pagamento referente à entrega das chaves e rescisão/encerramento da locação do imóvel situado no endereço [Endereço completo do imóvel], vistoriado e entregue nas condições acordadas em contrato.",
    icon: "Key",
    seoContent: {
      h2: "Por que o Recibo de Entrega de Chaves é fundamental?",
      p1: "Para quem aluga imóveis direto com o proprietário, a devolução das chaves é o marco zero do fim do contrato. Sem um recibo formalizando que o proprietário aceitou as chaves de volta, o inquilino pode continuar sendo cobrado por aluguéis e encargos (como IPTU e condomínio) dos meses seguintes. Este recibo atesta a posse do imóvel de volta ao dono.",
      h3: "O que deve constar no documento?",
      p2: "Além dos dados de quem entrega (inquilino) e quem recebe (proprietário/imobiliária), é crucial constar o endereço completo do imóvel, a data exata da entrega, e uma menção de que vistorias finais foram ou serão realizadas conforme o contrato de locação prévio."
    },
    faqs: [
      {
        question: "Entregar as chaves quita as dívidas pendentes?",
        answer: "Não necessariamente. O recibo de entrega das chaves atesta que o locador retomou a posse do imóvel e encerra a cobrança de novos aluguéis a partir daquela data, mas não isenta o inquilino de dívidas anteriores (aluguéis atrasados, contas de luz) ou reparos apontados na vistoria final."
      }
    ]
  },
`;

if (!code.includes("recibo-de-entrega-de-chaves")) {
  code = code.replace("export const receiptModels = [", "export const receiptModels = [\n" + newModel);
  fs.writeFileSync('src/data/receiptModels.ts', code);
  console.log("Added Recibo Entrega de Chaves");
}
