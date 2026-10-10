export interface ContractModel {
  id: string;
  slug: string;
  aliases?: string[];
  title: string;
  shortDescription: string;
  category: 'Serviços' | 'Imóveis' | 'Veículos' | 'Negócios';
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  icon: string;
  contractType: 'servicos' | 'locacao' | 'veiculo' | 'diarista' | 'empreitada' | 'parceria' | 'sublocacao';
  party1Label: string; // Ex: Contratado, Locador, Vendedor
  party2Label: string; // Ex: Contratante, Locatário, Comprador
  h1: string;
  intro: string;
  legalBasis: string;
  specificDetailsTitle: string;
  specificDetailsList: string[];
  faqs: Array<{ question: string; answer: string }>;
  defaultValues: {
    party1Nome?: string;
    party1Doc?: string;
    party1Profissao?: string;
    party1Endereco?: string;
    party1Cidade?: string;
    party1Estado?: string;
    party2Nome?: string;
    party2Doc?: string;
    party2Profissao?: string;
    party2Endereco?: string;
    party2Cidade?: string;
    party2Estado?: string;
    objeto?: string;
    valor?: string;
    formaPagamento?: string;
    prazo?: string;
    rescisao?: string;
    foroCidade?: string;
  };
}

export const contractModels: ContractModel[] = [
  {
    id: "contrato-prestacao-servicos-simples",
    slug: "contrato-de-prestacao-de-servicos-simples",
    aliases: ["contrato-de-prestacao-de-servicos"],
    title: "Contrato Simples de Prestação de Serviços (1 Página)",
    shortDescription: "Contrato direto e objetivo de 1 página para autônomos, MEIs e freelancers fecharem qualquer serviço com segurança.",
    category: "Serviços",
    seoTitle: "Contrato de Prestação de Serviços Simples 1 Página | PDF Grátis",
    seoDescription: "Gere um Contrato de Prestação de Serviços simples de 1 página em PDF. Ideal para autônomos e MEI: serviço, prazos, valor, quitação e foro. Sem burocracia.",
    keywords: [
      "contrato prestacao de servicos simples",
      "contrato 1 pagina",
      "contrato mei simples pdf",
      "modelo contrato autônomo 1 folha",
      "contrato servico rápido",
      "gerar contrato prestacao de servicos gratis"
    ],
    icon: "FileCheck",
    contractType: "servicos",
    party1Label: "Contratado(a) (Prestador)",
    party2Label: "Contratante (Cliente)",
    h1: "Contrato Simples de Prestação de Serviços em 1 Página",
    intro: "Feito sob medida para autônomos, MEIs, técnicos e freelancers. O contrato sintético de 1 página reúne em uma única folha A4 tudo o que é juridicamente indispensável pelo Código Civil (Art. 593): descrição do trabalho, prazo de entrega, forma de pagamento, quitação e foro. Sem cláusulas prolixas que assustam o cliente e pronto para imprimir e assinar na hora.",
    legalBasis: "Código Civil Brasileiro (Lei nº 10.406/2002, Arts. 593 a 609) e Art. 784, III do CPC",
    specificDetailsTitle: "Por que usar o Contrato de 1 Página?",
    specificDetailsList: [
      "Leitura rápida e transparente: o cliente assina sem medo e na hora da contratação.",
      "Economia de papel e tinta: cabe perfeitamente em 1 folha A4.",
      "Segurança jurídica plena: atende aos requisitos do Código Civil Brasileiro para contratos civis.",
      "Cobrança resguardada: serve como título executivo com a assinatura de duas testemunhas."
    ],
    faqs: [
      {
        question: "Um contrato de prestação de serviços de 1 página tem validade jurídica?",
        answer: "Sim! O Código Civil não exige extensão mínima de páginas. O que dá validade jurídica é a identificação clara das partes, a descrição lícita do serviço, o preço, o consentimento mútuo e as assinaturas."
      },
      {
        question: "Precisa reconhecer firma em cartório?",
        answer: "Não é obrigatório. O contrato particular assinado pelas partes já tem validade legal. Assinado por 2 testemunhas, ganha força de Título Executivo Extrajudicial (Art. 784, III do CPC)."
      },
      {
        question: "MEI e autônomo podem usar este modelo?",
        answer: "Sim, é o modelo ideal para Microempreendedores Individuais e profissionais autônomos formalizarem seus projetos sem custos com advogados para serviços do dia a dia."
      }
    ],
    defaultValues: {
      objeto: "Prestação de serviços técnicos/profissionais conforme escopo combinado entre as partes, incluindo fornecimento de mão de obra qualificada e ferramentas necessárias para a boa execução.",
      valor: "1.500,00",
      formaPagamento: "50% de entrada no ato da assinatura e o saldo restante quitado mediante entrega e aprovação final dos serviços via PIX ou transferência bancária.",
      prazo: "Início imediato após a assinatura, com prazo de conclusão estimado em até 15 (quinze) dias úteis.",
      rescisao: "Em caso de desistência imotivada antes da conclusão, a parte desistente pagará multa rescisória de 20% do valor total remanescente.",
    }
  },
  {
    id: "contrato-locacao-residencial-simples",
    slug: "contrato-de-locacao-residencial-simples",
    aliases: ["contrato-de-aluguel-simples"],
    title: "Contrato Simples de Aluguel Residencial (1 Página)",
    shortDescription: "Modelo sintético de aluguel residencial em 1 página com valor, vencimento, caução, vistoria e rescisão.",
    category: "Imóveis",
    seoTitle: "Contrato de Aluguel Residencial Simples 1 Página | PDF",
    seoDescription: "Crie um contrato de aluguel residencial de 1 página em PDF. Rápido e objetivo para proprietários e inquilinos, com cláusulas essenciais e sem juridiquês.",
    keywords: [
      "contrato de aluguel simples 1 pagina",
      "contrato de locacao residencial folha unica",
      "modelo contrato aluguel simples pdf",
      "contrato locação direto com proprietário",
      "contrato aluguel kitnet 1 pagina"
    ],
    icon: "Home",
    contractType: "locacao",
    party1Label: "Locador(a) (Proprietário)",
    party2Label: "Locatário(a) (Inquilino)",
    h1: "Contrato Simples de Locação Residencial em 1 Página",
    intro: "Projetado para proprietários e inquilinos que realizam locações diretas de imóveis, quitinetes, casas ou apartamentos. Em apenas uma página A4, o modelo cobre o valor do aluguel, data de vencimento, caução de garantia, conservação do imóvel e rescisão amparado na Lei do Inquilinato (Lei nº 8.245/91).",
    legalBasis: "Lei do Inquilinato (Lei Federal nº 8.245/1991)",
    specificDetailsTitle: "Principais Cláusulas Inclusas",
    specificDetailsList: [
      "Valor mensal do aluguel e dia fixo de vencimento com multa por atraso.",
      "Destinação exclusivamente residencial do imóvel.",
      "Garantia locatícia simplificada (caução ou adiantamento).",
      "Obrigação de devolução do imóvel nas mesmas condições de conservação."
    ],
    faqs: [
      {
        question: "Posso alugar meu imóvel direto sem imobiliária com esse contrato?",
        answer: "Com certeza. A Lei 8.245/91 autoriza a locação direta entre pessoas físicas. Este contrato simples de 1 página garante todas as proteções básicas de ambas as partes."
      },
      {
        question: "Qual o valor padrão de caução em contrato simples?",
        answer: "A Lei do Inquilinato permite até 3 meses de aluguel como caução em dinheiro, sendo comum a cobrança de 1 a 2 meses em contratos particulares de locação direta."
      }
    ],
    defaultValues: {
      objeto: "Locação para fins estritamente residenciais do imóvel de propriedade do LOCADOR, composto por cômodos e instalações em perfeito estado de funcionamento e conservação.",
      valor: "1.200,00",
      formaPagamento: "Mensalmente até o dia 10 de cada mês, mediante pagamento em conta bancária ou chave PIX indicada pelo LOCADOR, com multa de 10% e juros de 1% ao mês em caso de atraso.",
      prazo: "Prazo determinado de 12 (doze) meses, iniciando-se na data de assinatura deste instrumento.",
      rescisao: "A rescisão antecipada ensejará multa proporcional equivalente a 1 (um) mês de aluguel, salvo aviso prévio formal com 30 dias de antecedência.",
    }
  },
  {
    id: "contrato-compra-venda-veiculo-simples",
    slug: "contrato-de-compra-e-venda-de-veiculo-simples",
    aliases: ["contrato-de-compra-e-venda-de-veiculo"],
    title: "Contrato Simples de Compra e Venda de Veículo (1 Página)",
    shortDescription: "Formalize a venda particular de carro ou moto em 1 página com dados do veículo, valor, multas anteriores e transferência.",
    category: "Veículos",
    seoTitle: "Contrato de Compra e Venda de Veículo Simples 1 Página | PDF",
    seoDescription: "Gere seu contrato particular de compra e venda de carro ou moto em 1 folha. Proteção contra multas anteriores e prazo para transferência no Detran.",
    keywords: [
      "contrato de compra e venda de veiculo simples",
      "contrato venda carro 1 pagina",
      "contrato venda moto pdf",
      "termo de compra e venda veiculo usado",
      "contrato recibo venda veiculo"
    ],
    icon: "Car",
    contractType: "veiculo",
    party1Label: "Vendedor(a) (Proprietário)",
    party2Label: "Comprador(a)",
    h1: "Contrato Simples de Compra e Venda de Veículo em 1 Página",
    intro: "Ideal para transações particulares de compra e venda de carros, motos, caminhões e utilitários usados. Estabelece claramente o valor pago, o estado de conservação mecânica e da lataria do veículo e, o mais importante: a data e o prazo máximo para a transferência no Detran, livrando o vendedor de multas futuras cometidas pelo comprador.",
    legalBasis: "Código Civil Brasileiro (Lei nº 10.406/2002, Arts. 481 a 504) e Código de Trânsito Brasileiro (Lei nº 9.503/1997, Art. 134)",
    specificDetailsTitle: "Segurança na Venda de Veículos Usados",
    specificDetailsList: [
      "Identificação completa do veículo (marca, modelo, placa, ano, chassi e Renavam).",
      "Cláusula de ciência do estado de conservação do veículo usado pelo comprador.",
      "Responsabilidade por multas e tributos (IPVA/licenciamento) anteriores à data de entrega.",
      "Prazo legal de 30 dias para comunicação e transferência de propriedade no Detran."
    ],
    faqs: [
      {
        question: "Esse contrato substitui o DUT / ATPV-e do Detran?",
        answer: "Não. A transferência oficial é feita no cartório/Detran via ATPV-e digital. No entanto, este contrato de compra e venda é o documento que prova o pagamento, o dia e o minuto em que a posse do veículo foi entregue ao novo proprietário."
      },
      {
        question: "O vendedor responde por multas após a entrega?",
        answer: "Não. A cláusula específica estipula que a partir da entrega da posse, todas as infrações de trânsito e pontuação na CNH são de responsabilidade exclusiva do comprador."
      }
    ],
    defaultValues: {
      objeto: "Veículo automotor Marca/Modelo: [Ex: Fiat Uno Attractive 1.0], Ano/Modelo: [Ex: 2018/2019], Placa: [Ex: ABC-1D23], RENAVAM: [Ex: 00123456789], Chassi: [Ex: 9BD12345678901234], Cor: [Ex: Prata], Combustível: Flex.",
      valor: "28.500,00",
      formaPagamento: "Valor integral pago à vista na data de assinatura deste contrato através de transferência bancária instantânea via PIX.",
      prazo: "Entrega imediata da posse do veículo e das chaves após a confirmação irreversível da liquidação do pagamento.",
      rescisao: "O COMPRADOR obriga-se a efetivar a transferência do veículo perante o DETRAN no prazo máximo de 30 (trinta) dias, sob pena de responder por eventuais despesas e perdas.",
    }
  },
  {
    id: "contrato-diarista-faxina-simples",
    slug: "contrato-de-diarista-e-faxina-simples",
    aliases: ["contrato-de-diarista-simples"],
    title: "Contrato Simples de Diarista e Faxina (1 Página)",
    shortDescription: "Proteja-se contra riscos trabalhistas formalizando a prestação de serviços de diarista autônoma em até 2 dias por semana.",
    category: "Serviços",
    seoTitle: "Contrato de Diarista Simples 1 Página | PDF Grátis",
    seoDescription: "Gere um Contrato de Diarista e Faxina em 1 folha A4. Estabelece a natureza autônoma sem vínculo de emprego (Lei Complementar 150/2015).",
    keywords: [
      "contrato de diarista simples",
      "contrato diarista 1 pagina",
      "modelo contrato diarista sem vinculo empregaticio",
      "contrato faxina residencial pdf",
      "contrato diarista ate 2 dias"
    ],
    icon: "Sparkles",
    contractType: "diarista",
    party1Label: "Contratada (Diarista Autônoma)",
    party2Label: "Contratante (Tomador)",
    h1: "Contrato Simples de Diarista e Prestação de Faxina em 1 Página",
    intro: "A Lei das Domésticas (LC 150/2015) define que trabalho doméstico por até 2 (dois) dias por semana é considerado autônomo. Este contrato simples de 1 página protege tomadores e diaristas, registrando expressamente o valor por diária, os dias combinados e a ausência de subordinação contínua.",
    legalBasis: "Lei Complementar nº 150/2015 (Art. 1º) e Código Civil (Art. 593)",
    specificDetailsTitle: "Garantias Essenciais do Contrato",
    specificDetailsList: [
      "Definição clara da frequência de até 2 dias por semana para evitar vínculo celetista.",
      "Valor da diária e inclusão do transporte e alimentação acordados.",
      "Autonomia técnica na execução das tarefas de limpeza e conservação.",
      "Quitação de cada diária paga no mesmo dia da prestação."
    ],
    faqs: [
      {
        question: "Diarista 2 dias por semana tem direito a carteira assinada?",
        answer: "Não. Pela Lei Complementar nº 150/2015, o vínculo de emprego doméstico só é caracterizado para quem trabalha mais de 2 dias por semana para o mesmo tomador/família."
      },
      {
        question: "Como comprovar os pagamentos das diárias?",
        answer: "Use nosso gerador de recibo simples de diarista para emitir o comprovante assinado a cada término de diária realizada."
      }
    ],
    defaultValues: {
      objeto: "Prestação de serviços domésticos autônomos de limpeza, faxina e organização residencial, sem habitualidade contínua superior a 2 (dois) dias por semana.",
      valor: "180,00 por diária",
      formaPagamento: "Pagamento efetuado ao final de cada dia de trabalho realizado, mediante recibo individual ou comprovante de PIX.",
      prazo: "Vigência indeterminada, podendo qualquer das partes interromper os atendimentos mediante comunicação prévia de 24 horas.",
      rescisao: "Inexistência de exclusividade ou subordinação jurídica, podendo a DIARISTA prestar serviços a outros contratantes livremente.",
    }
  },
  {
    id: "contrato-empreitada-obra-simples",
    slug: "contrato-de-empreitada-obra-simples",
    aliases: ["contrato-de-empreitada-simples"],
    title: "Contrato Simples de Empreitada e Reforma (1 Página)",
    shortDescription: "Contrato para pedreiros, mestres de obras, pintores e eletricistas fecharem obras e reformas por preço fechado ou etapas.",
    category: "Serviços",
    seoTitle: "Contrato de Empreitada de Obra Simples 1 Página | PDF",
    seoDescription: "Gere um Contrato de Empreitada para pedreiro ou reforma de 1 folha em PDF. Valor da mão de obra, prazos de entrega, medições e garantia dos serviços.",
    keywords: [
      "contrato de empreitada simples 1 pagina",
      "contrato pedreiro reforma pdf",
      "modelo contrato de obra simples",
      "contrato mao de obra construcao civil",
      "contrato empreitada preco fechado"
    ],
    icon: "Briefcase",
    contractType: "empreitada",
    party1Label: "Empreiteiro(a) / Prestador",
    party2Label: "Proprietário(a) / Contratante",
    h1: "Contrato Simples de Empreitada e Reforma de Obra (1 Página)",
    intro: "Ideal para pequenas e médias reformas, serviços de pedreiro, pintura, gesso ou instalações elétricas e hidráulicas. O modelo de 1 página estipula com clareza o escopo da obra, se os materiais serão fornecidos pelo proprietário, as medições de pagamento e a garantia legal do serviço.",
    legalBasis: "Código Civil Brasileiro (Lei nº 10.406/2002, Arts. 610 a 626)",
    specificDetailsTitle: "Pontos Cruciais da Empreitada",
    specificDetailsList: [
      "Definição expressa se o contrato é apenas de mão de obra (sem materiais) ou mista.",
      "Cronograma de pagamento por etapas ou avanço físico da obra.",
      "Garantia contra defeitos de execução e solidez da obra.",
      "Foro da comarca da localização da obra."
    ],
    faqs: [
      {
        question: "Quem compra o material de construção nesse modelo?",
        answer: "Por padrão na empreitada simples de mão de obra, os materiais são comprados pelo proprietário/contratante, fornecendo o empreiteiro a mão de obra e ferramentas."
      }
    ],
    defaultValues: {
      objeto: "Execução de serviços de reforma e construção civil consistentes em: mão de obra de pedreiro, acabamento e revestimento no imóvel do CONTRATANTE, correndo os materiais por conta do contratante.",
      valor: "4.800,00",
      formaPagamento: "Pagamento dividido em 3 parcelas: 30% no início dos trabalhos, 40% na metade da execução e 30% na entrega e aceite final dos serviços.",
      prazo: "Prazo total de execução estimado em 20 (vinte) dias úteis contados da liberação do local e entrega dos materiais.",
      rescisao: "Retardo injustificado superior a 5 dias úteis sem comunicação prévia ensejará rescisão com retenção de 15% sobre a etapa não concluída.",
    }
  },
  {
    id: "contrato-parceria-comercial-simples",
    slug: "contrato-de-parceria-comercial-simples",
    aliases: ["contrato-de-parceria-simples"],
    title: "Contrato Simples de Parceria Comercial (1 Página)",
    shortDescription: "Formalize parcerias entre profissionais, influenciadores, afiliados e empresas dividindo lucros e responsabilidades.",
    category: "Negócios",
    seoTitle: "Contrato de Parceria Comercial Simples 1 Página | PDF",
    seoDescription: "Modelo de Contrato de Parceria Comercial e Negócios de 1 folha A4. Divisão de receitas, atribuições de cada parceiro e confidencialidade sem complicação.",
    keywords: [
      "contrato de parceria comercial simples",
      "contrato parceria 1 pagina",
      "acordo de parceria simples pdf",
      "termo de cooperacao comercial",
      "contrato divisao de lucros"
    ],
    icon: "FileCheck",
    contractType: "parceria",
    party1Label: "Parceiro(a) 1",
    party2Label: "Parceiro(a) 2",
    h1: "Contrato Simples de Parceria Comercial em 1 Página",
    intro: "Excelente para profissionais autônomos, influenciadores, afiliados, lojas e sócios de projetos conjuntos. Reúne em uma única página a divisão de percentuais ou comissões, as responsabilidades operacionais de cada lado e os termos de encerramento amigável da parceria.",
    legalBasis: "Código Civil Brasileiro (Lei nº 10.406/2002, Arts. 421 a 426)",
    specificDetailsTitle: "Cláusulas Estratégicas",
    specificDetailsList: [
      "Divisão de lucros, faturamento ou comissões em percentual exato.",
      "Papel de cada parceiro (ex: comercial vs. operacional).",
      "Dever mútuo de sigilo e não concorrência durante a vigência.",
      "Rescisão sem traumas mediante aviso prévio simples."
    ],
    faqs: [
      {
        question: "Cria vínculo societário na Junta Comercial?",
        answer: "Não. Trata-se de uma cooperação operacional particular para projetos ou produtos específicos, sem necessidade de alteração de contrato social."
      }
    ],
    defaultValues: {
      objeto: "Cooperação operacional e estratégica mútua para divulgação, venda e atendimento aos clientes do projeto conjunto, atuando as partes de forma colaborativa.",
      valor: "Divisão de 50% (cinquenta por cento) do lucro líquido apurado a cada fechamento mensal.",
      formaPagamento: "Apuração no último dia útil de cada mês e repasse imediato via PIX para as contas indicadas pelas partes.",
      prazo: "Vigência de 6 (seis) meses renováveis automaticamente por iguais períodos mediante acordo mútuo.",
      rescisao: "Qualquer das partes poderá rescindir o presente ajuste a qualquer tempo mediante aviso prévio por escrito de 15 (quinze) dias.",
    }
  },
  {
    id: "contrato-sublocacao-simples",
    slug: "contrato-de-sublocacao-simples",
    aliases: ["contrato-de-sublocacao-de-imovel-simples"],
    title: "Contrato Simples de Sublocação de Imóvel (1 Página)",
    shortDescription: "Para sublocar um quarto, vaga, consultório, sala comercial ou espaço compartilhado em 1 folha A4.",
    category: "Imóveis",
    seoTitle: "Contrato de Sublocação Simples 1 Página | PDF Grátis",
    seoDescription: "Gere um Contrato de Sublocação de Imóvel ou Quarto em 1 página. Ideal para aluguel de quarto, consultório ou sala comercial compartilhada.",
    keywords: [
      "contrato de sublocacao simples",
      "contrato aluguel de quarto 1 pagina",
      "contrato sublocacao sala comercial",
      "modelo sublocacao folha unica pdf",
      "sublocacao consultorio simples"
    ],
    icon: "Home",
    contractType: "sublocacao",
    party1Label: "Sublocador(a) (Locatário Principal)",
    party2Label: "Sublocatário(a) (Ocupante)",
    h1: "Contrato Simples de Sublocação de Quarto ou Sala em 1 Página",
    intro: "Perfeito para quem divide apartamento, subloga um quarto mobiliado, consultório por turno ou estação de trabalho em sala comercial. Regula o uso das áreas comuns, horários, divisão de contas de energia e internet e valor fixo mensal.",
    legalBasis: "Lei do Inquilinato (Lei nº 8.245/1991, Arts. 14 a 16)",
    specificDetailsTitle: "Pontos Principais",
    specificDetailsList: [
      "Espaço físico sublocado claramente delimitado (quarto, sala ou cadeira).",
      "Valor mensal cobrado e regras de divisão de condomínio, água, luz e internet.",
      "Regras de convivência, barulho e limpeza das áreas compartilhadas.",
      "Devolução do espaço no término da sublocação."
    ],
    faqs: [
      {
        question: "Precisa de autorização do proprietário para sublocar?",
        answer: "A Lei do Inquilinato exige anuência prévia do proprietário do imóvel para sublocações. Em divisões informais de moradia entre amigos, este documento regula a convivência financeira entre os moradores."
      }
    ],
    defaultValues: {
      objeto: "Sublocação de espaço determinado (quarto/sala/estação) localizado no imóvel ocupado pelo SUBLOCADOR, com direito ao uso compartilhado das áreas comuns (cozinha, sanitário e circulação).",
      valor: "850,00",
      formaPagamento: "Valor mensal fixo com vencimento no dia 05 de cada mês, incluindo a cota-parte proporcional de água, energia e internet.",
      prazo: "Prazo determinado de 6 (seis) meses a contar da data de assinatura.",
      rescisao: "Desocupação mediante aviso prévio de 30 (trinta) dias sem incidência de penalidade para ambas as partes.",
    }
  }
];

export function getContractBySlug(slug: string): ContractModel | undefined {
  return contractModels.find(
    (m) => m.slug === slug || (m.aliases && m.aliases.includes(slug))
  );
}
