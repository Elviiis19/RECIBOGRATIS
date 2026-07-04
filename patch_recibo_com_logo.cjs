const fs = require('fs');
let code = fs.readFileSync('src/data/receiptModels.ts', 'utf-8');

const newModel = `  {
    id: "recibo-com-logo",
    slug: "recibo-com-logo",
    title: "Recibo com Logo",
    shortDescription:
      "Gere um recibo de pagamento incluindo sua logomarca ou foto.",
    seoTitle: "Recibo com Logo Online Grátis | Gere e Baixe em PDF",
    seoDescription:
      "Gere recibos personalizados com a logomarca da sua empresa. Demonstre mais profissionalismo e credibilidade para seus clientes.",
    keywords:
      "recibo com logo, recibo com foto, recibo personalizado, recibo empresarial, gerar recibo com logomarca, modelo de recibo com logotipo",
    defaultReferenteA:
      "Pagamento referente a [descreva o motivo do pagamento].",
    icon: "Image",
  },
  {
    id: "prestacao-de-servico-com-logo",`;

code = code.replace(
  /  {\s*id: "prestacao-de-servico-com-logo",/,
  newModel
);

fs.writeFileSync('src/data/receiptModels.ts', code);
