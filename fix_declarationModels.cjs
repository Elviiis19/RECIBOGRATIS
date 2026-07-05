const fs = require('fs');

let code = fs.readFileSync('src/data/declarationModels.ts', 'utf8');

const newDeclarations = `  {
    id: "aviso-previo",
    slug: "carta-de-aviso-previo",
    title: "Carta de Aviso Prévio",
    shortDescription: "Modelos prontos para o funcionário pedir demissão ou para o empregador dispensar o funcionário.",
    seoTitle: "Carta de Aviso Prévio (Demissão ou Dispensa) | PDF Grátis",
    seoDescription: "Gere sua Carta de Aviso Prévio em PDF. Opções para pedido de demissão pelo empregado ou dispensa sem justa causa pelo empregador. Modelo pronto e gratuito.",
    keywords: "carta de aviso previo, pedido de demissao, aviso previo trabalhado, dispensa sem justa causa, modelo aviso previo pdf",
    icon: "FileText",
  },
  {
    id: "confissao-divida",
    slug: "termo-de-confissao-de-divida",
    title: "Termo de Confissão de Dívida",
    shortDescription: "Formalize que alguém deve um valor a você, detalhando prazos e parcelas. Mais seguro que uma Nota Promissória.",
    seoTitle: "Termo de Confissão de Dívida | Gerador PDF Grátis",
    seoDescription: "Crie um Termo de Confissão de Dívida com valor, parcelas e juros. O documento ideal para formalizar empréstimos ou vendas parceladas entre pessoas físicas.",
    keywords: "termo de confissao de divida, modelo de confissao de divida, documento de divida, como fazer promissoria, formalizar divida",
    icon: "ShieldAlert",
  },
  {
    id: "autorizacao-viagem",
    slug: "autorizacao-viagem-menor",
    title: "Autorização de Viagem para Menor",
    shortDescription: "Modelo padrão para autorizar menores de idade a viajarem desacompanhados ou com apenas um dos genitores.",
    seoTitle: "Autorização de Viagem para Menor de Idade | PDF Pronto",
    seoDescription: "Gerador do formulário de Autorização de Viagem para Menores nacional e internacional. Modelo baseado nas normas do CNJ para preencher e imprimir.",
    keywords: "autorizacao de viagem menor, autorizacao de viagem infantil, cnj autorizacao de viagem, viagem nacional menor, como fazer autorizacao",
    icon: "Plane",
  },
  {
    id: "endereco-comercial-mei",
    slug: "declaracao-endereco-comercial-mei",
    title: "Declaração de Endereço Comercial para MEI",
    shortDescription: "O proprietário autoriza que o MEI utilize o endereço residencial como sede da empresa (exigido para alvará).",
    seoTitle: "Declaração de Endereço Comercial para MEI | Baixar PDF",
    seoDescription: "Termo de autorização de uso do imóvel para sede de MEI. Documento exigido pelas prefeituras para liberação do Alvará de Funcionamento.",
    keywords: "declaracao de endereco mei, autorizacao uso de imovel mei, alvara mei endereco residencial, termo de autorizacao de endereco, comprovante mei",
    icon: "Briefcase",
  },
`;

if (!code.includes("carta-de-aviso-previo")) {
  code = code.replace("export const declarationModels = [", "export const declarationModels = [\n" + newDeclarations);
  fs.writeFileSync('src/data/declarationModels.ts', code);
  console.log("Added Declaration Models");
}
