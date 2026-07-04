const fs = require('fs');
let code = fs.readFileSync('src/data/declarationModels.ts', 'utf-8');

const newModels = `
  {
    id: "imposto-renda-isento",
    slug: "declaracao-de-isento-imposto-de-renda",
    title: "Declaração de Isento (IRPF)",
    shortDescription: "Comprove formalmente que você é isento de declarar o Imposto de Renda Pessoa Física.",
    seoTitle: "Declaração de Isento do Imposto de Renda | Modelo PDF",
    seoDescription: "Modelo de declaração de isenção de IRPF pronto para preencher e imprimir grátis em PDF.",
    keywords: ["declaração de isento", "isenção imposto de renda", "isento irpf", "lei 7115"]
  },
  {
    id: "nao-vinculo",
    slug: "declaracao-de-nao-vinculo-empregaticio",
    title: "Declaração de Não Vínculo",
    shortDescription: "Ateste que não possui vínculo empregatício formal com uma empresa ou em determinado período.",
    seoTitle: "Declaração de Não Vínculo Empregatício em PDF Grátis",
    seoDescription: "Gere a declaração afirmando que não possui vínculo de emprego (CLT). Preencha e imprima em PDF grátis.",
    keywords: ["declaração de não vínculo", "sem vínculo empregatício", "modelo não vínculo"]
  },
  {
    id: "perda-documentos",
    slug: "declaracao-de-perda-de-documentos",
    title: "Declaração de Perda de Documentos",
    shortDescription: "Documento particular para atestar perda, extravio ou roubo de documentos antes da emissão de segunda via.",
    seoTitle: "Declaração de Perda ou Extravio de Documentos (PDF)",
    seoDescription: "Faça sua declaração de extravio ou perda de documentos (RG, CNH, CPF). Modelo rápido e prático.",
    keywords: ["declaração de perda", "extravio de documentos", "declaração de extravio", "perda de rg"]
  },
  {
    id: "vida-residencia",
    slug: "declaracao-de-vida-e-residencia",
    title: "Declaração de Prova de Vida",
    shortDescription: "Declare estar vivo e residente no endereço atual, muito solicitada por órgãos de previdência e bancos.",
    seoTitle: "Declaração de Prova de Vida e Residência | PDF Pronto",
    seoDescription: "Modelo de declaração de vida e residência para INSS e bancos. Preencha e baixe em PDF.",
    keywords: ["prova de vida", "declaração de vida", "declaração inss", "fé de vida"]
  },
  {
    id: "veiculo-autorizacao",
    slug: "declaracao-autorizacao-uso-de-veiculo",
    title: "Autorização de Uso de Veículo",
    shortDescription: "Proprietário autoriza que terceiro (motorista) utilize o veículo para viagens ou trabalho.",
    seoTitle: "Declaração de Autorização de Uso de Veículo | PDF",
    seoDescription: "Autorize um terceiro a dirigir seu veículo com este modelo grátis. Ideal para fronteiras e empresas.",
    keywords: ["autorização uso veículo", "declaração motorista", "autorização para dirigir", "carro cedido"]
  }
];
`;

code = code.replace(/];\s*$/, newModels);
fs.writeFileSync('src/data/declarationModels.ts', code);
