export interface RichSEOContent {
  h1: string;
  intro: string;
  useCasesTitle?: string;
  useCasesList?: string[];
  useCasesConclusion?: string;
  specificDetailsTitle: string;
  specificDetailsList: string[];
  lsiText: string;
  legalText?: string[];
  ctaText: string;
  exampleImageSrc?: string;
  exampleImageAlt?: string;
  exampleImageTitle?: string;
}

export const richSeoData: Record<string, RichSEOContent> = {
  "recibo-pix": {
    h1: "Recibo PIX Online: Gerador com QR Code e Comprovante de Quitação em PDF",
    intro:
      "Gere seu recibo de pagamento PIX online com total validade jurídica e segurança. O nosso gerador integra o padrão oficial do Banco Central (BR Code EMV), permitindo emitir recibos com QR Code funcional e chave PIX para pagamentos na hora, além de comprovar quitações definitivas de compras e serviços.",
    useCasesTitle: "Quando você deve emitir um Recibo de Pagamento PIX?",
    useCasesList: [
      "Serviços prestados por autônomos, diaristas, pedreiros, técnicos e freelancers que recebem via PIX;",
      "Comprovação de pagamento de aluguel residencial ou comercial direto com proprietário;",
      "Quitação de vendas de produtos, veículos usados, móveis ou eletrônicos entre particulares;",
      "Comprovação de honorários profissionais e mensalidades de cursos ou academias;",
      "Documentação de despesas e prestação de contas contábeis para Microempreendedores Individuais (MEI)."
    ],
    useCasesConclusion:
      "Mesmo que a transferência bancária gere um comprovante no aplicativo, apenas o Recibo PIX formaliza a quitação do contrato perante a legislação civil.",
    specificDetailsTitle: "O que deve constar no Recibo PIX para garantir validade jurídica",
    specificDetailsList: [
      "Valor em números e escrito por extenso de forma automática para evitar adulterações.",
      "Identificação completa do pagador e do recebedor (Nome e CPF ou CNPJ).",
      "Chave PIX utilizada na operação (CPF/CNPJ, Telefone, E-mail ou Chave Aleatória EVP).",
      "Descrição minuciosa do produto entregue ou serviço realizado (campo 'Referente a').",
      "Código de Identificação da Transação (ID/EndToEnd) ou QR Code oficial do Banco Central.",
      "Data da liquidação, cidade e assinatura do recebedor dando plena e irrevogável quitação."
    ],
    lsiText:
      "Atenção: O comprovante de transferência emitido pelo aplicativo do banco apenas atesta a movimentação financeira entre contas bancárias, mas não dá quitação jurídica sobre o objeto da negociação. O Recibo PIX emitido nesta plataforma cumpre todos os requisitos dos Artigos 319 e 320 do Código Civil Brasileiro, assegurando que o credor não possa cobrar o mesmo valor no futuro.",
    legalText: [
      "Sim. O recibo emitido possui pleno valor probatório no âmbito do direito civil e nos Juizados Especiais. Ele serve como lastro contábil idôneo perante a Receita Federal e órgãos de defesa do consumidor (Procon).",
      "Para transações comerciais entre empresas com retenção tributária obrigatória, o recibo não anula a obrigação acessória de emissão da respectiva Nota Fiscal."
    ],
    ctaText:
      "Preencha o formulário acima, visualize a prévia em tempo real com o QR Code funcional e baixe seu recibo em PDF gratuito sem precisar criar conta."
  },
  pagamento: {
    h1: "Recibo de Pagamento Online: Preencha e Imprima em PDF",
    intro:
      "O recibo de pagamento é o comprovante definitivo de que um serviço ou produto foi quitado. Ele é a garantia prática de que quem pagou não será cobrado duas vezes, além de formalizar a transação para o controle financeiro do profissional autônomo ou prestador que recebeu o valor.",
    useCasesTitle: "Quando emitir um Recibo de Pagamento? Principais exemplos:",
    useCasesList: [
      "Quitação de mensalidades (escolas, academias, cursos);",
      "Pagamentos de serviços prestados por profissionais autônomos (pintores, eletricistas, pedreiros);",
      "Comprovante de pagamento de sinal ou entrada na compra de imóveis ou veículos;",
      "Honorários de profissionais liberais (advogados, dentistas, psicólogos);",
      "Pagamento de dívidas particulares entre amigos ou familiares.",
    ],
    useCasesConclusion:
      "Sempre que houver troca financeira e você precisar de um resguardo seguro, gere o recibo de pagamento para confirmar a operação.",
    specificDetailsTitle: "Como preencher seu recibo passo a passo",
    specificDetailsList: [
      "Valor: Preencha a quantia exata em números e também por extenso para evitar qualquer tipo de adulteração.",
      "Dados das Partes: Insira o Nome Completo e o CPF/CNPJ de quem está pagando (o cliente) e de quem está recebendo (o prestador).",
      'Referente a (Descrição): Seja o mais detalhista possível. Em vez de escrever apenas "serviço prestado", detalhe o que foi entregue, como "serviço de pintura residencial", "criação de site" ou "manutenção elétrica".',
      "Local, Data e Assinatura: Finalize com a cidade, a data do acerto e a assinatura obrigatória de quem recebeu o dinheiro.",
    ],
    lsiText:
      "Esse modelo é ideal e totalmente válido para transações do dia a dia, como pagamentos de pequenas dívidas, diárias informais, vendas particulares e repasses familiares.",
    legalText: [
      "Sim. Quando preenchido corretamente e assinado por quem recebeu o valor, o documento possui ampla validade civil. Ele funciona como uma prova robusta para proteger as partes contra cobranças indevidas na justiça comum e no Procon.",
      "Atenção: O recibo atesta a quitação financeira entre as partes, mas não substitui a emissão da Nota Fiscal (NF) caso o profissional ou a empresa tenham a obrigação tributária de declará-la ao Governo.",
    ],
    ctaText:
      "Gere agora o documento padronizado, pronto para ser impresso ou enviado pelo WhatsApp em formato PDF direto do seu navegador, sem necessidade de cadastro.",
    exampleImageSrc: "/recibo-de-pagamento-preenchido.webp",
    exampleImageAlt:
      "Modelo de Recibo de Pagamento preenchido e pronto para baixar ou imprimir",
    exampleImageTitle: "Exemplo de Recibo de Pagamento",
  },
  simples: {
    h1: "Recibo Simples e Recibo de Pagamento Online",
    intro:
      "Gere seu recibo simples e recibo de pagamento online grátis em menos de 1 minuto. Preencha na tela e baixe em PDF pronto para imprimir, ou baixe o modelo editável em Word (.docx). 100% grátis, sem cadastro, sem marca d'água e com validade jurídica garantida em todo o Brasil.",
    useCasesTitle:
      "Quando usar o Recibo Simples de Pagamento? Veja as 6 situações mais comuns:",
    useCasesList: [
      "Venda de veículo ou moto usada entre pessoas físicas (carro, moto, náutica);",
      "Pagamento de serviços de autônomos (pedreiro, diarista, pintor, eletricista, encanador, mecânico);",
      "Venda de móveis, celulares, eletrônicos ou itens usados (OLX, Facebook Marketplace);",
      "Pagamento de aluguel direto com o proprietário ou locação por temporada;",
      "Acerto de contas, sinal de negócio e quitação de parcelas entre amigos ou familiares;",
      "Serviços de freelancers e profissionais liberais que atuam como pessoa física (sem CNPJ).",
    ],
    useCasesConclusion:
      "O recibo simples protege seu dinheiro, evita cobranças em duplicidade e garante tranquilidade para quem paga e para quem recebe.",
    specificDetailsTitle: "O que deve constar no recibo simples para ter validade legal?",
    specificDetailsList: [
      "1. Valor em números e por extenso: Escreva a quantia (ex: R$ 150,00) e também por extenso ('cento e cinquenta reais'). Isso impede que o valor seja adulterado após a assinatura.",
      "2. Nome completo e CPF de quem pagou: Identifica claramente quem quitou a dívida, impedindo novas cobranças.",
      "3. Nome completo e CPF de quem recebeu: O recebedor do dinheiro deve ser identificado com nome e CPF oficiais.",
      "4. Motivo do pagamento (Referente a): Descreva com clareza o que foi pago (ex: 'referente à pintura da casa' ou 'compra de celular modelo X'). Evite descrições genéricas.",
      "5. Cidade e Data: Comprova exatamente quando e onde a transação aconteceu, marcando o encerramento do débito.",
      "6. Assinatura de quem recebeu: O recibo ganha validade jurídica com a assinatura de quem recebeu o valor (feita à mão com caneta ou assinatura digital).",
    ],
    lsiText:
      "Este modelo atende perfeitamente a quem busca por recibo simples ou recibo de pagamento. Seguro, rápido e aceito em todo o Brasil.",
    legalText: [
      "O recibo simples é o documento oficial que comprova o fim de uma dívida. Quando assinado por quem recebeu o dinheiro, ele serve como prova plena perante o Procon ou a Justiça em caso de qualquer desacordo futuro. Guarde sempre o seu comprovante por no mínimo 5 anos.",
      "Quem paga tem o direito garantido por lei de exigir o recibo na hora da entrega do dinheiro. Se a outra parte se recusar a assinar, quem está pagando pode reter o pagamento até que o recibo seja emitido.",
      "Atenção: O recibo simples tem validade jurídica completa para pessoas físicas e autônomos. Caso você seja uma empresa (CNPJ) prestando serviços para outra empresa ou vendendo mercadorias, a emissão de Nota Fiscal é obrigatória.",
    ],
    ctaText:
      "Preencha agora seu recibo simples de pagamento online. É rápido, fácil, gratuito e gera o PDF na hora!",
    exampleImageSrc: "/modelo-recibo-simples-preenchido.webp",
    exampleImageAlt:
      "Modelo de Recibo Simples e Recibo de Pagamento Preenchido e Pronto para Imprimir",
    exampleImageTitle: "Exemplo de Recibo Simples de Pagamento",
  },
  pintor: {
    h1: "Recibo para Pintor | Gerador Online com PDF Grátis",
    intro:
      "Agilidade e profissionalismo no fim da obra. O Recibo para Pintor é a ferramenta ideal para você, profissional autônomo, emitir comprovantes de pagamento de forma rápida e segura. Chega de bloquinhos de papel: gere online seu documento e passe mais credibilidade ao entregar o serviço.",
    specificDetailsTitle: "O que não pode faltar no Recibo de Pintura",
    specificDetailsList: [
      "Separação de custos: Deixe claro se o valor inclui a compra de tintas/materiais ou se é apenas referente à mão de obra prestada.",
      "Detalhamento do local: Especifique se o serviço foi uma pintura residencial, comercial ou industrial.",
      "Medição: É altamente recomendável declarar a metragem (m²) executada ou os cômodos finalizados.",
      "Fase da obra: Caso seja um pagamento parcial, cite se foi adiantamento, medição intermediária ou quitação final.",
    ],
    lsiText:
      "Na construção civil e reformas, é comum o profissional autônomo atuar sem CNPJ. Emitir um recibo simples (RPA) utilizando seu próprio CPF garante respaldo legal na declaração de imposto de renda e evita problemas de bitributação na prestação de serviço, especialmente quando comparado à emissão de nota fiscal avulsa.",
    ctaText:
      "Pronto para finalizar sua entrega com profissionalismo? Preencha os dados abaixo e gere seu recibo de pintor agora mesmo!",
  },
  corretor: {
    h1: "Recibo para Corretor de Imóveis | Emissão Online em PDF",
    intro:
      "Profissionalize suas intermediações imobiliárias. O Recibo para Corretor garante segurança jurídica no recebimento de honorários e comissões. Essencial para profissionais do mercado imobiliário que precisam de um documento rápido, padronizado e com validade legal para enviar aos clientes.",
    specificDetailsTitle: "O que não pode faltar no Recibo de Corretagem",
    specificDetailsList: [
      "Número do CRECI: A identificação profissional é obrigatória para validar legalmente a cobrança da comissão imobiliária.",
      "Identificação do imóvel: Inclua o endereço completo e, se possível, a matrícula do imóvel intermediado.",
      "Tipo de transação: Especifique se o valor é referente a taxa de corretagem por venda, permuta ou aluguel.",
      "Percentual ou valor fixo: Deixe claro se a comissão corresponde ao percentual acordado (ex: 6%) ou a uma taxa administrativa específica.",
    ],
    lsiText:
      "No mercado imobiliário, os honorários do corretor autônomo são frequentemente fiscalizados. Utilizar um recibo claro contendo sua inscrição no CRECI facilita a declaração de rendimentos no Carnê-Leão da Receita Federal e justifica com clareza o repasse financeiro de intermediação, isentando a necessidade imediata de nota fiscal para profissionais pessoa física.",
    ctaText:
      "Garanta sua comissão de forma segura. Gere o recibo de corretagem agora e envie o PDF direto para o comprador ou vendedor.",
  },
  diarista: {
    h1: "Recibo de Diarista e Faxina | PDF Grátis para Preencher",
    intro:
      "Evite dores de cabeça se prevenindo legalmente. O Recibo de Diarista é fundamental para comprovar o pagamento pelos dias trabalhados, protegendo tanto a profissional de limpeza quanto o contratante, evidenciando a ausência de vínculo empregatício indevido.",
    specificDetailsTitle: "O que não pode faltar no Recibo de Faxina",
    specificDetailsList: [
      "Dias exatos trabalhados: A lei trabalhista é clara sobre diárias; especificar as datas evita a configuração de trabalho contínuo.",
      "Local da faxina: Indique o endereço residencial ou comercial onde a limpeza foi realizada.",
      "Serviços extras: Detalhe se houve cobrança adicional por passadoria de roupas ou limpeza pesada pós-obra.",
      "Frequência: Relate que o serviço possui caráter eventual (limite legal para não configurar vínculo doméstico).",
    ],
    lsiText:
      "Para a proteção nas relações de trabalho doméstico e diaristas, o recibo assinado no fim do dia evita processos por reconhecimento de vínculo empregatício (CLT). Ele atesta o modelo autônomo da prestação de serviço diarista, desobrigando o contratante do eSocial doméstico, desde que a frequência legal seja respeitada.",
    ctaText:
      "Mantenha seus pagamentos e direitos organizados! Faça seu preenchimento agora mesmo e baixe o recibo pronto em PDF.",
  },
  pedreiro: {
    h1: "Recibo para Pedreiro | Gere e Imprima Seu Comprovante Grátis",
    intro:
      "Organização nas etapas da obra garante pagamento sem atraso. O Recibo para Pedreiro, mestre de obras ou empreiteiro é a maneira mais eficiente de validar os acertos financeiros por etapas de construção ou reformas, passando confiança total ao cliente.",
    specificDetailsTitle: "O que não pode faltar no Recibo de Obra",
    specificDetailsList: [
      "Etapa concluída: Especificar se o pagamento é para fundação, alvenaria, laje, ou acabamento reboco/pisos.",
      "Quitação parcial ou total: Deixar claro se o valor recebido quita uma semana de trabalho, uma fase, ou a obra inteira.",
      "Materiais x Mão de Obra: Evidenciar que o montante é exclusivo de mão de obra (ou incluir reembolso por tijolos, cimento).",
      "Endereço: Citar a localização civil exata da obra ou reforma em andamento.",
    ],
    lsiText:
      "A construção civil é movida a medições e empreitadas. Um mestre de obras ou pedreiro autônomo que usa o recibo com seu CPF garante isenção de dúvidas sobre pagamentos de diárias ou etapas. Mesmo sem CNPJ de construtora, o documento afasta passivos de duplicidade e formaliza juridicamente o repasse sem precisar de nota fiscal avulsa.",
    ctaText:
      "Evite desentendimentos financeiros na sua obra. Gere seu recibo profissional em instantes e envie para o dono do projeto!",
  },
  psicologo: {
    h1: "Recibo de Psicólogo Padrão ANS | Emitir PDF para Reembolso",
    intro:
      "Facilite o reembolso do seu paciente com um documento padronizado. O Recibo Psicológico deve conter os dados exatos para dedução em impostos e convênios de saúde. Produza o seu online de forma prática e validada clinicamente.",
    specificDetailsTitle: "O que não pode faltar no Recibo Psicológico",
    specificDetailsList: [
      "Número do CRP: O registro no Conselho Regional de Psicologia é mandatório para atestar a validade terapêutica do documento.",
      "Dados do Paciente: Nome completo e identificação de quem realizou a sessão de psicoterapia.",
      "Responsável Financeiro: Se o paciente for menor de idade, cite o CPF do responsável pagante.",
      "Datas das sessões: Para recibos mensais, inclua a listagem dos dias exatos em que a terapia ocorreu no mês.",
    ],
    lsiText:
      "Para clínicas de saúde mental e psicanalistas, emitir recibo contendo o CRP possibilita ao paciente o reembolso junto a operadoras de planos de saúde e a dedução integral de despesas médicas no IRPF (Imposto de Renda Pessoa Física). O carnê-leão é facilitado e você evita a burocracia de alvarás complexos, desde que registre o CPF pagador rigorosamente.",
    ctaText:
      "Agilize o faturamento do seu consultório. Preencha seus dados clínicos e emita um recibo impecável para seu paciente.",
  },
  dentista: {
    h1: "Recibo Odontológico para Dentista | Criar PDF Grátis",
    intro:
      "Ateste pagamentos de tratamentos dentários com rigor técnico. O Recibo de Dentista formaliza procedimentos odontológicos e assegura que os pacientes usem as despesas de saúde bucal nos seus abatimentos fiscais sem complicações.",
    specificDetailsTitle: "O que não pode faltar no Recibo Odontológico",
    specificDetailsList: [
      "Registro CRO: A inclusão do número do Conselho Regional de Odontologia é obrigatória.",
      "Descrição do Tratamento: Especifique se foi profilaxia, implante, tratamento de canal ou manutenção ortodôntica.",
      "Beneficiário vs. Pagador: Distinga o nome do paciente (ex: filho) e quem realizou o pagamento (ex: mãe/titular).",
      "Valores parcelados: Caso seja um tratamento longo, registre o número da parcela do tratamento ortodôntico (ex: 2/12).",
    ],
    lsiText:
      "Na gestão de clínica odontológica ou cadeira autônoma, fornecer um recibo odontológico íntegro é lei. Tais despesas médicas geram deduções no Imposto de Renda. A identificação no Carnê-Leão contábil cruzada com a declaração do receituário do paciente afasta irregularidades perante a Receita e endossa a solicitação de convênios.",
    ctaText:
      "Deixe o foco apenas no sorriso dos seus pacientes! Crie agora o recibo com seu CRO e ofereça a melhor experiência financeira.",
  },
  aluguel: {
    h1: "Recibo de Aluguel de Imóveis | Gerador Rápido com PDF",
    intro:
      "Sem estresse na relação locador e locatário. O Recibo de Aluguel assegura tranquilidade jurídica confirmando a quitação da mensalidade imobiliária, isentando riscos e comprovação de inadimplência em contratos de locação.",
    specificDetailsTitle: "O que não pode faltar no Recibo de Aluguel",
    specificDetailsList: [
      "Mês de competência: Identifique de maneira rigorosa o período vigente daquele pagamento (ex: Aluguel Ref. Maio/2026).",
      "Encargos extras: Separe os valores da locação bruta das cotas de condomínio, IPTU e taxa de água embutidos.",
      "Multas/Atrasos: Caso tenha recebido com juros por fora do prazo, deixe explícito no texto.",
      "Endereço: Coloque a especificação do apartamento ou sala para evitar confusões de gestão de múltiplos imóveis.",
    ],
    lsiText:
      "Pela Lei do Inquilinato brasileira, o locador é obrigado a dar recibos que discriminem as parcelas. É um erro pensar que via PIX a transferência substitui o recibo de quitação (recibo locatício). Formalizar os repasses da imobiliária ou proprietário evita ações de despejo por quebra de fidúcia e cobranças indevidas de IPTU.",
    ctaText:
      "Mantenha sua gestão de imóveis imune a processos. Emita o recibo de quitação de aluguel e envie rápido pelo WhatsApp.",
  },
  mei: {
    h1: "Recibo para MEI | Emitir Comprovante c/ CNPJ Grátis",
    intro:
      "Formalize suas vendas ou serviços prestados com credibilidade empresarial. O Recibo MEI permite que o Microempreendedor entregue ao seu consumidor físico uma prova idônea da transação, sem a burocracia de sistemas estaduais de notas fiscais em operações isentas.",
    specificDetailsTitle: "O que não pode faltar no Recibo MEI",
    specificDetailsList: [
      "Razão Social e CNPJ: Diferente do autônomo, destaque a formalidade figurando os dados da sua empresa.",
      "Venda vs. Serviço: Detalhar se a cobrança ocorreu por vender uma mercadoria ou por uma mão de obra aplicada.",
      "Identificação do Cliente: Nome do consumidor (CPF) para segurança nas garantias consumeristas futuras.",
      "Data da transação: O registro cronológico fundamental para somar na sua declaração de faturamento bruto DASN-SIMEI.",
    ],
    lsiText:
      "O Microempreendedor Individual (MEI) é isento legalmente da emissão obrigatória da nota fiscal eletrônica (NFS-e ou NF-e) ao realizar serviços para pessoa física. Mas, pela lei do Direitos do Consumidor, fornecer um recibo comercial é devido. Esse documento se torna o controle do Livro Caixa (registro de receitas) na hora de gerar a apuração tributária anual.",
    ctaText:
      "Passe uma imagem muito mais profissional para seu cliente pessoa física. Faça seu recibo de MEI agora!",
  },
  servicos: {
    h1: "Recibo de Prestação de Serviços | Gerar Comprovante Online",
    intro:
      "A forma mais eficiente de freelancers e liberais receberem com tranquilidade. O Recibo de Prestação de Serviço genérico garante amplo suporte comercial, atestando trabalhos criativos, técnicos ou burocráticos entregues com prontidão.",
    specificDetailsTitle:
      "O que não pode faltar no Recibo de Profissional Autônomo",
    specificDetailsList: [
      "Descrição minuciosa: Relato exato sobre o projeto entregue (ex: criação de site, conserto do telhado, tradução de páginas).",
      'Parcelamento: Se você parcelou os honorários, identifique: "Pagamento 1 de 3 referente ao contrato X".',
      "Meio de pagamento: Documentar se ocorreu via PIX, Espécie ou Transferência bancária ajuda no balanço.",
      "Qualificação completa: CPF e Nomes bem assinalados para garantir a vinculação do acordo particular.",
    ],
    lsiText:
      "Emitir comprovantes é rotina para qualquer designer, programador, técnico de reparos, ou marcenarias operando sob CPF. O recibo simples serve como substituto inicial da complexidade de um RPA (Recibo de Pagamento Autônomo com retenção de INSS na fonte) em transações diretas B2C, fundamentando honorários declarados independentes.",
    ctaText:
      "Freelancer, não demore mais enviando e-mails improvisados. Tenha seu PDF padronizado de serviço agora!",
  },
  cuidador: {
    h1: "Recibo de Cuidador de Idosos | Gerador com PDF Grátis",
    intro:
      "Segurança justa que sua dedicação e cuidado merecem financeiramente. Este comprovante destina-se a cuidadores, acompanhantes domiciliares, técnicos de enfermagem e folguistas que precisam formalizar o recebimento de diárias, plantões ou honorários pagos pelos familiares do paciente.",
    useCasesTitle: "Quando o Cuidador deve emitir este recibo? Casos Comuns:",
    useCasesList: [
      "Pagamento de plantões noturnos ou de fim de semana (folguistas);",
      "Cobertura de férias ou licença do cuidador principal;",
      "Serviço de acompanhante hospitalar por período determinado;",
      "Diárias avulsas para cuidados rotineiros em domicílio;",
      "Reembolso de despesas extras combinadas (transporte, alimentação).",
    ],
    useCasesConclusion:
      "A emissão do recibo protege a família contratante e o profissional autônomo, evitando riscos de passivos trabalhistas e confusões financeiras.",
    specificDetailsTitle:
      "O que não pode faltar no Recibo para Acompanhante/Cuidador",
    specificDetailsList: [
      "Pagador Responsável: Normalmente, quem paga é o filho(a) ou tutor do idoso, e não o próprio paciente. Preencha os dados de quem efetivou o pagamento.",
      'Período específico e Carga Horária: É vital escrever as datas exatas (ex: "Plantão final de semana dias 12 e 13" ou "Plantão 12x36"). Isso delimita o trabalho eventual.',
      'Despesas de Transporte: Se você foi reembolsado por passagens ou combustível, destaque o valor do repasse (ex: "R$ 150 de plantão + R$ 30 de condução").',
      'Descrição do Serviço: Use termos como "Acompanhamento e cuidados diários", evitando termos clínicos privativos de outras profissões caso não tenha habilitação técnica.',
    ],
    lsiText:
      "As relações trabalhistas domésticas (PEC das Domésticas) são sensíveis no Brasil. Um cuidador eventual ou folguista protegerá tanto a si quanto as famílias contratantes — evitando interpretações de vínculo empregatício indevido no eSocial Doméstico — se estiver munido da comprovação assinada de quitação de honorários por labor temporário ou autônomo, ratificando a remuneração por plantões através deste recibo estruturado.",
    legalText: [
      "Validade Trabalhista: Para que o serviço não seja configurado como vínculo empregatício (CLT), o trabalho do cuidador folguista/autônomo geralmente não pode ultrapassar 2 dias na semana para o mesmo empregador. Documentar esses dias exatos no recibo é a melhor defesa para ambas as partes.",
      "O recibo assinado garante a quitação do valor acordado, servindo como prova documental incontestável perante a Justiça do Trabalho ou Cível em caso de questionamentos futuros.",
    ],
    ctaText:
      "Você cuida da saúde e bem-estar deles, agora cuide da sua segurança financeira. Gere o recibo dos seus plantões grátis online em menos de 1 minuto!",
    exampleImageSrc: "/recibo-cuidador-idoso-preenchido.webp",
    exampleImageAlt:
      "Modelo de Recibo para Cuidador de Idosos preenchido e assinado",
    exampleImageTitle: "Exemplo de Recibo de Cuidador de Idosos",
  },
};
