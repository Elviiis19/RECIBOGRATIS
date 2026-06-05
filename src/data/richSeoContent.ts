export interface RichSEOContent {
  h1: string;
  intro: string;
  specificDetailsTitle: string;
  specificDetailsList: string[];
  lsiText: string;
  faqs: { question: string; answer: string }[];
  ctaText: string;
}

export const richSeoData: Record<string, RichSEOContent> = {
  'pagamento': {
    h1: 'Recibo de Pagamento Online | Gerador com Download em PDF',
    intro: 'O recibo de pagamento é o documento financeiro mais comum e versátil utilizado no Brasil. Ele serve como uma declaração formal de que um valor foi pago por uma pessoa e recebido por outra. Sem esse comprovante, transações informais baseiam-se apenas na confiança e podem gerar dores de cabeça ou cobranças duplicadas.',
    specificDetailsTitle: 'Como preencher seu comprovante',
    specificDetailsList: [
      'Valor: Preencha com a quantia exata da transação, tanto em números quanto por extenso, para evitar adulterações.',
      'Pagador e Recebedor: Insira o Nome Completo ou a Razão Social de quem está pagando e de quem está recebendo o dinheiro.',
      'CPF ou CNPJ: Essencial para identificar perfeitamente as partes.',
      'Referente a: Nunca escreva genericamente. Detalhe exatamente qual objeto foi vendido ou qual serviço foi prestado.',
      'Local e Data: A cidade e o dia exato em que o repasse do dinheiro foi concluído.',
      'Assinatura: O recebedor deve obrigatoriamente assinar ao final, confirmando que o dinheiro está em mãos.'
    ],
    lsiText: 'Esse modelo é ideal e totalmente válido para transações do dia a dia, como pagamentos de pequenas dívidas, diárias informais, vendas particulares e repasses familiares.',
    faqs: [
      { question: 'O recibo de pagamento tem validade legal igual a nota fiscal?', answer: 'O recibo atesta a quitação da dívida entre as partes com ampla validade civil, mas NÃO substitui a exigência tributária da Nota Fiscal para empresas (CNPJ).' },
      { question: 'Preciso reconhecer firma no cartório?', answer: 'Para 99% das demandas rotineiras, não é necessário. Apenas a assinatura conferindo com o RG ou documento oficial é suficiente.' },
      { question: 'Pessoa física pode dar recibo?', answer: 'Sim. O recibo de pagamento é justamente o documento correto para pessoas físicas (sem CNPJ) formalizarem seus repasses financeiros.' }
    ],
    ctaText: 'Gere agora o documento padronizado, pronto para ser impresso ou enviado pelo WhatsApp em formato PDF direto do seu navegador, sem necessidade de cadastro.'
  },
  'simples': {
    h1: 'Recibo Simples Online | Gerador com Download em PDF',
    intro: 'O recibo simples é o documento financeiro mais comum e versátil utilizado no Brasil. Ele serve como uma declaração formal de que um valor foi pago por uma pessoa e recebido por outra. Sem esse comprovante, transações informais baseiam-se apenas na confiança e podem gerar dores de cabeça ou cobranças duplicadas.',
    specificDetailsTitle: 'Como preencher o recibo corretamente',
    specificDetailsList: [
      'Valor: Preencha com a quantia exata da transação, tanto em números quanto por extenso, para evitar adulterações.',
      'Pagador e Recebedor: Insira o Nome Completo ou a Razão Social de quem está pagando e de quem está recebendo o dinheiro.',
      'CPF ou CNPJ: Essencial para identificar perfeitamente as partes.',
      'Referente a: Nunca escreva genericamente. Detalhe exatamente qual objeto foi vendido ou qual serviço foi prestado.',
      'Local e Data: A cidade e o dia exato em que o repasse do dinheiro foi concluído.',
      'Assinatura: O recebedor deve obrigatoriamente assinar ao final, confirmando que o dinheiro está em mãos.'
    ],
    lsiText: 'Esse modelo é ideal e totalmente válido para transações do dia a dia, como pagamentos de pequenas dívidas, diárias informais, vendas particulares e repasses familiares.',
    faqs: [
      { question: 'O recibo simples tem validade legal igual a nota fiscal?', answer: 'O recibo atesta a quitação da dívida entre as partes com ampla validade civil, mas NÃO substitui a exigência tributária da Nota Fiscal para empresas (CNPJ).' },
      { question: 'Preciso reconhecer firma no cartório?', answer: 'Para 99% das demandas rotineiras, não é necessário. Apenas a assinatura conferindo com o RG ou documento oficial é suficiente.' },
      { question: 'Pessoa física pode dar recibo?', answer: 'Sim. O recibo simples é justamente o documento correto para pessoas físicas (sem CNPJ) formalizarem seus repasses financeiros.' }
    ],
    ctaText: 'Gere agora o documento padronizado, pronto para ser impresso ou enviado pelo WhatsApp em formato PDF direto do seu navegador, sem necessidade de cadastro.'
  },
  'pintor': {
    h1: 'Recibo para Pintor | Gerador Online com PDF Grátis',
    intro: 'Agilidade e profissionalismo no fim da obra. O Recibo para Pintor é a ferramenta ideal para você, profissional autônomo, emitir comprovantes de pagamento de forma rápida e segura. Chega de bloquinhos de papel: gere online seu documento e passe mais credibilidade ao entregar o serviço.',
    specificDetailsTitle: 'O que não pode faltar no Recibo de Pintura',
    specificDetailsList: [
      'Separação de custos: Deixe claro se o valor inclui a compra de tintas/materiais ou se é apenas referente à mão de obra prestada.',
      'Detalhamento do local: Especifique se o serviço foi uma pintura residencial, comercial ou industrial.',
      'Medição: É altamente recomendável declarar a metragem (m²) executada ou os cômodos finalizados.',
      'Fase da obra: Caso seja um pagamento parcial, cite se foi adiantamento, medição intermediária ou quitação final.'
    ],
    lsiText: 'Na construção civil e reformas, é comum o profissional autônomo atuar sem CNPJ. Emitir um recibo simples (RPA) utilizando seu próprio CPF garante respaldo legal na declaração de imposto de renda e evita problemas de bitributação na prestação de serviço, especialmente quando comparado à emissão de nota fiscal avulsa.',
    faqs: [
      { question: 'Pintor precisa emitir nota fiscal ou recibo?', answer: 'Pintor autônomo sem CNPJ deve emitir o recibo simples com CPF. Já quem atua como MEI pode emitir nota fiscal, mas o recibo atende plenamente clientes físicos.' },
      { question: 'Como descrever a pintura no recibo?', answer: 'Seja claro: "Referente à pintura acrílica de 50m² na sala do imóvel localizado na Rua X, incluindo lixamento e massa corrida".' },
      { question: 'O recibo de pintura serve para garantia?', answer: 'Ele comprova o pagamento. Para garantias de durabilidade da tinta ou descascamentos, recomenda-se ter um contrato de prestação de serviços anexo.' }
    ],
    ctaText: 'Pronto para finalizar sua entrega com profissionalismo? Preencha os dados abaixo e gere seu recibo de pintor agora mesmo!'
  },
  'corretor': {
    h1: 'Recibo para Corretor de Imóveis | Emissão Online em PDF',
    intro: 'Profissionalize suas intermediações imobiliárias. O Recibo para Corretor garante segurança jurídica no recebimento de honorários e comissões. Essencial para profissionais do mercado imobiliário que precisam de um documento rápido, padronizado e com validade legal para enviar aos clientes.',
    specificDetailsTitle: 'O que não pode faltar no Recibo de Corretagem',
    specificDetailsList: [
      'Número do CRECI: A identificação profissional é obrigatória para validar legalmente a cobrança da comissão imobiliária.',
      'Identificação do imóvel: Inclua o endereço completo e, se possível, a matrícula do imóvel intermediado.',
      'Tipo de transação: Especifique se o valor é referente a taxa de corretagem por venda, permuta ou aluguel.',
      'Percentual ou valor fixo: Deixe claro se a comissão corresponde ao percentual acordado (ex: 6%) ou a uma taxa administrativa específica.'
    ],
    lsiText: 'No mercado imobiliário, os honorários do corretor autônomo são frequentemente fiscalizados. Utilizar um recibo claro contendo sua inscrição no CRECI facilita a declaração de rendimentos no Carnê-Leão da Receita Federal e justifica com clareza o repasse financeiro de intermediação, isentando a necessidade imediata de nota fiscal para profissionais pessoa física.',
    faqs: [
      { question: 'Recibo de comissão de corretagem precisa de CNPJ?', answer: 'Não. Corretores pessoa física podem e devem emitir o recibo utilizando CPF e o número de inscrição do CRECI.' },
      { question: 'Esse recibo serve como comprovante de sinal (arras)?', answer: 'Para sinal, coloque na descrição: "Recebimento referente a sinal de negócio (arras) para aquisição do imóvel X", agindo como representante.' },
      { question: 'O cliente pode abater a corretagem no IR com este recibo?', answer: 'Sim! Com o recibo devidamente assinado, contendo seu CPF e CRECI, o comprador pode incluir o custo da corretagem na declaração do imóvel.' }
    ],
    ctaText: 'Garanta sua comissão de forma segura. Gere o recibo de corretagem agora e envie o PDF direto para o comprador ou vendedor.'
  },
  'diarista': {
    h1: 'Recibo de Diarista e Faxina | PDF Grátis para Preencher',
    intro: 'Evite dores de cabeça se prevenindo legalmente. O Recibo de Diarista é fundamental para comprovar o pagamento pelos dias trabalhados, protegendo tanto a profissional de limpeza quanto o contratante, evidenciando a ausência de vínculo empregatício indevido.',
    specificDetailsTitle: 'O que não pode faltar no Recibo de Faxina',
    specificDetailsList: [
      'Dias exatos trabalhados: A lei trabalhista é clara sobre diárias; especificar as datas evita a configuração de trabalho contínuo.',
      'Local da faxina: Indique o endereço residencial ou comercial onde a limpeza foi realizada.',
      'Serviços extras: Detalhe se houve cobrança adicional por passadoria de roupas ou limpeza pesada pós-obra.',
      'Frequência: Relate que o serviço possui caráter eventual (limite legal para não configurar vínculo doméstico).'
    ],
    lsiText: 'Para a proteção nas relações de trabalho doméstico e diaristas, o recibo assinado no fim do dia evita processos por reconhecimento de vínculo empregatício (CLT). Ele atesta o modelo autônomo da prestação de serviço diarista, desobrigando o contratante do eSocial doméstico, desde que a frequência legal seja respeitada.',
    faqs: [
      { question: 'Recibo de diarista evita processo trabalhista?', answer: 'Ele é uma forte prova de que o serviço era autônomo e eventual. Preencher corretamente a data exata da diária é a chave para esta segurança.' },
      { question: 'Quem deve assinar: a diarista ou o patrão?', answer: 'A diarista (recebedora do dinheiro) é quem deve assinar o recibo, confirmando que recebeu o valor do contratante.' },
      { question: 'A diarista precisa ter MEI para dar recibo?', answer: 'Não é obrigatório. Ela pode dar o recibo simples com CPF. Ter MEI (CNPJ) oferece benefícios previdenciários, mas o recibo de pessoa física é válido.' }
    ],
    ctaText: 'Mantenha seus pagamentos e direitos organizados! Faça seu preenchimento agora mesmo e baixe o recibo pronto em PDF.'
  },
  'pedreiro': {
    h1: 'Recibo para Pedreiro | Gere e Imprima Seu Comprovante Grátis',
    intro: 'Organização nas etapas da obra garante pagamento sem atraso. O Recibo para Pedreiro, mestre de obras ou empreiteiro é a maneira mais eficiente de validar os acertos financeiros por etapas de construção ou reformas, passando confiança total ao cliente.',
    specificDetailsTitle: 'O que não pode faltar no Recibo de Obra',
    specificDetailsList: [
      'Etapa concluída: Especificar se o pagamento é para fundação, alvenaria, laje, ou acabamento reboco/pisos.',
      'Quitação parcial ou total: Deixar claro se o valor recebido quita uma semana de trabalho, uma fase, ou a obra inteira.',
      'Materiais x Mão de Obra: Evidenciar que o montante é exclusivo de mão de obra (ou incluir reembolso por tijolos, cimento).',
      'Endereço: Citar a localização civil exata da obra ou reforma em andamento.'
    ],
    lsiText: 'A construção civil é movida a medições e empreitadas. Um mestre de obras ou pedreiro autônomo que usa o recibo com seu CPF garante isenção de dúvidas sobre pagamentos de diárias ou etapas. Mesmo sem CNPJ de construtora, o documento afasta passivos de duplicidade e formaliza juridicamente o repasse sem precisar de nota fiscal avulsa.',
    faqs: [
      { question: 'Pedreiro autônomo pode dar recibo de obra?', answer: 'Sim. Todo profissional da construção civil (pedreiros, serventes, assentadores) pode e deve dar recibo assinando com seu próprio CPF.' },
      { question: 'Devo separar o dinheiro do material de construção?', answer: 'Recomenda-se fazer um recibo para a "mão de obra" e, se comprou cimentos ou ferros, entregar as notas fiscais das lojas de material como comprovante à parte.' },
      { question: 'O que escrever no motivo do pagamento?', answer: 'Descreva a etapa: "Referente ao pagamento da 2ª parcela semanal da construção do muro e assentamento de porcelanato".' }
    ],
    ctaText: 'Evite desentendimentos financeiros na sua obra. Gere seu recibo profissional em instantes e envie para o dono do projeto!'
  },
  'psicologo': {
    h1: 'Recibo de Psicólogo Padrão ANS | Emitir PDF para Reembolso',
    intro: 'Facilite o reembolso do seu paciente com um documento padronizado. O Recibo Psicológico deve conter os dados exatos para dedução em impostos e convênios de saúde. Produza o seu online de forma prática e validada clinicamente.',
    specificDetailsTitle: 'O que não pode faltar no Recibo Psicológico',
    specificDetailsList: [
      'Número do CRP: O registro no Conselho Regional de Psicologia é mandatório para atestar a validade terapêutica do documento.',
      'Dados do Paciente: Nome completo e identificação de quem realizou a sessão de psicoterapia.',
      'Responsável Financeiro: Se o paciente for menor de idade, cite o CPF do responsável pagante.',
      'Datas das sessões: Para recibos mensais, inclua a listagem dos dias exatos em que a terapia ocorreu no mês.'
    ],
    lsiText: 'Para clínicas de saúde mental e psicanalistas, emitir recibo contendo o CRP possibilita ao paciente o reembolso junto a operadoras de planos de saúde e a dedução integral de despesas médicas no IRPF (Imposto de Renda Pessoa Física). O carnê-leão é facilitado e você evita a burocracia de alvarás complexos, desde que registre o CPF pagador rigorosamente.',
    faqs: [
      { question: 'O recibo de psicólogo substitui nota fiscal?', answer: 'Para psicólogos autônomos (Pessoa Física), sim. O recibo com CPF e CRP tem validade legal igualitária para declarações médicas de pessoa física.' },
      { question: 'Plano de saúde aceita esse recibo gerado em PDF?', answer: 'Sim. As seguradoras exigem os dados corretos (CPF, CRP, assinaturas), e o documento digital em PDF impresso ou enviado é totalmente aceito nos aplicativos.' },
      { question: 'Como colocar várias sessões num recibo só?', answer: 'Insira no texto: "Referente a 4 sessões de psicoterapia clínica realizadas nos dias 04, 11, 18 e 25 de abril".' }
    ],
    ctaText: 'Agilize o faturamento do seu consultório. Preencha seus dados clínicos e emita um recibo impecável para seu paciente.'
  },
  'dentista': {
    h1: 'Recibo Odontológico para Dentista | Criar PDF Grátis',
    intro: 'Ateste pagamentos de tratamentos dentários com rigor técnico. O Recibo de Dentista formaliza procedimentos odontológicos e assegura que os pacientes usem as despesas de saúde bucal nos seus abatimentos fiscais sem complicações.',
    specificDetailsTitle: 'O que não pode faltar no Recibo Odontológico',
    specificDetailsList: [
      'Registro CRO: A inclusão do número do Conselho Regional de Odontologia é obrigatória.',
      'Descrição do Tratamento: Especifique se foi profilaxia, implante, tratamento de canal ou manutenção ortodôntica.',
      'Beneficiário vs. Pagador: Distinga o nome do paciente (ex: filho) e quem realizou o pagamento (ex: mãe/titular).',
      'Valores parcelados: Caso seja um tratamento longo, registre o número da parcela do tratamento ortodôntico (ex: 2/12).'
    ],
    lsiText: 'Na gestão de clínica odontológica ou cadeira autônoma, fornecer um recibo odontológico íntegro é lei. Tais despesas médicas geram deduções no Imposto de Renda. A identificação no Carnê-Leão contábil cruzada com a declaração do receituário do paciente afasta irregularidades perante a Receita e endossa a solicitação de convênios.',
    faqs: [
      { question: 'Dentista pessoa física (CPF) tem que colocar o CRO?', answer: 'Obrigatoriamente. Mesmo usando CPF, o conselho de classe (CRO) atesta a legalidade médica para as deduções do Imposto de Renda do paciente.' },
      { question: 'Posso usar o recibo para provar entrada num Implante?', answer: 'Perfeitamente. Descreva "Referente ao valor de entrada/sinal para cirurgia de implantes protocolo no arco superior".' },
      { question: 'A clínica pode emitir recibo ao invés de nota?', answer: 'Clínicas com CNPJ (pessoas jurídicas) geralmente devem emitir Notas Fiscais de Serviços (NFS-e). O recibo atende principalmente o cirurgião-dentista autônomo.' }
    ],
    ctaText: 'Deixe o foco apenas no sorriso dos seus pacientes! Crie agora o recibo com seu CRO e ofereça a melhor experiência financeira.'
  },
  'aluguel': {
    h1: 'Recibo de Aluguel de Imóveis | Gerador Rápido com PDF',
    intro: 'Sem estresse na relação locador e locatário. O Recibo de Aluguel assegura tranquilidade jurídica confirmando a quitação da mensalidade imobiliária, isentando riscos e comprovação de inadimplência em contratos de locação.',
    specificDetailsTitle: 'O que não pode faltar no Recibo de Aluguel',
    specificDetailsList: [
      'Mês de competência: Identifique de maneira rigorosa o período vigente daquele pagamento (ex: Aluguel Ref. Maio/2026).',
      'Encargos extras: Separe os valores da locação bruta das cotas de condomínio, IPTU e taxa de água embutidos.',
      'Multas/Atrasos: Caso tenha recebido com juros por fora do prazo, deixe explícito no texto.',
      'Endereço: Coloque a especificação do apartamento ou sala para evitar confusões de gestão de múltiplos imóveis.'
    ],
    lsiText: 'Pela Lei do Inquilinato brasileira, o locador é obrigado a dar recibos que discriminem as parcelas. É um erro pensar que via PIX a transferência substitui o recibo de quitação (recibo locatício). Formalizar os repasses da imobiliária ou proprietário evita ações de despejo por quebra de fidúcia e cobranças indevidas de IPTU.',
    faqs: [
      { question: 'PIX serve como recibo de aluguel?', answer: 'Não de forma completa. O PIX prova que um dinheiro saiu, mas não diz a que mês se refere, nem se as taxas de IPTU estavam inclusas. Portanto, exija o recibo assinado.' },
      { question: 'Proprietário é obrigado a dar recibo de aluguel?', answer: 'Sim. A Lei do Inquilinato (Art. 22) determina categoricamente a emissão do recibo detalhando aluguel e encargos.' },
      { question: 'Como descrever os valores em um repasse único?', answer: 'Escreva: "Aluguel referente ao mês X: R$1.000,00 | IPTU: R$100,00 | Condomínio: R$250,00. Totalizando a quitação ampla de R$1.350,00".' }
    ],
    ctaText: 'Mantenha sua gestão de imóveis imune a processos. Emita o recibo de quitação de aluguel e envie rápido pelo WhatsApp.'
  },
  'mei': {
    h1: 'Recibo para MEI | Emitir Comprovante c/ CNPJ Grátis',
    intro: 'Formalize suas vendas ou serviços prestados com credibilidade empresarial. O Recibo MEI permite que o Microempreendedor entregue ao seu consumidor físico uma prova idônea da transação, sem a burocracia de sistemas estaduais de notas fiscais em operações isentas.',
    specificDetailsTitle: 'O que não pode faltar no Recibo MEI',
    specificDetailsList: [
      'Razão Social e CNPJ: Diferente do autônomo, destaque a formalidade figurando os dados da sua empresa.',
      'Venda vs. Serviço: Detalhar se a cobrança ocorreu por vender uma mercadoria ou por uma mão de obra aplicada.',
      'Identificação do Cliente: Nome do consumidor (CPF) para segurança nas garantias consumeristas futuras.',
      'Data da transação: O registro cronológico fundamental para somar na sua declaração de faturamento bruto DASN-SIMEI.'
    ],
    lsiText: 'O Microempreendedor Individual (MEI) é isento legalmente da emissão obrigatória da nota fiscal eletrônica (NFS-e ou NF-e) ao realizar serviços para pessoa física. Mas, pela lei do Direitos do Consumidor, fornecer um recibo comercial é devido. Esse documento se torna o controle do Livro Caixa (registro de receitas) na hora de gerar a apuração tributária anual.',
    faqs: [
      { question: 'MEI é obrigado a dar nota fiscal para Cliente Físico?', answer: 'Não. Pela regra do Simples Nacional, MEI é dispensado de NF para pessoas físicas (CPF), porém, deve obrigatoriamente fornecer o recibo caso requisitado.' },
      { question: 'O recibo do MEI precisa apresentar o meu CPF?', answer: 'Não. Uma vez formalizado, você deve utilizar e destacar o CNPJ e a Razão Social da sua empresa no campo do recebedor.' },
      { question: 'Posso usar este recibo se eu vender para outra empresa?', answer: 'Para vendas ou serviços faturados contra outras empresas (CNPJ), o MEI é obrigado a emitir Nota Fiscal. O recibo simples não servirá como nota legal para o lado deles.' }
    ],
    ctaText: 'Passe uma imagem muito mais profissional para seu cliente pessoa física. Faça seu recibo de MEI agora!'
  },
  'servicos': {
    h1: 'Recibo de Prestação de Serviços | Gerar Comprovante Online',
    intro: 'A forma mais eficiente de freelancers e liberais receberem com tranquilidade. O Recibo de Prestação de Serviço genérico garante amplo suporte comercial, atestando trabalhos criativos, técnicos ou burocráticos entregues com prontidão.',
    specificDetailsTitle: 'O que não pode faltar no Recibo de Profissional Autônomo',
    specificDetailsList: [
      'Descrição minuciosa: Relato exato sobre o projeto entregue (ex: criação de site, conserto do telhado, tradução de páginas).',
      'Parcelamento: Se você parcelou os honorários, identifique: "Pagamento 1 de 3 referente ao contrato X".',
      'Meio de pagamento: Documentar se ocorreu via PIX, Espécie ou Transferência bancária ajuda no balanço.',
      'Qualificação completa: CPF e Nomes bem assinalados para garantir a vinculação do acordo particular.'
    ],
    lsiText: 'Emitir comprovantes é rotina para qualquer designer, programador, técnico de reparos, ou marcenarias operando sob CPF. O recibo simples serve como substituto inicial da complexidade de um RPA (Recibo de Pagamento Autônomo com retenção de INSS na fonte) em transações diretas B2C, fundamentando honorários declarados independentes.',
    faqs: [
      { question: 'Qual a diferença deste recibo para o RPA?', answer: 'O RPA é um modelo contábil que a empresa empregadora preenche já descontando INSS/IRRF. Este recibo aqui é direto, apenas comprova sua remuneração civil.' },
      { question: 'Preciso ter contrato junto com o recibo?', answer: 'O recibo basta para provar que foi pago. Mas o contrato anexo é recomendável para definir "o que" exatamente estava incluso na sua prestação.' },
      { question: 'Tem validade no juizado especial (pequenas causas)?', answer: 'Tem altíssima validade probatória, comprovando a troca financeira e encerramento comercial de maneira limpa perante ações de cobrança.' }
    ],
    ctaText: 'Freelancer, não demore mais enviando e-mails improvisados. Tenha seu PDF padronizado de serviço agora!'
  },
  'cuidador': {
    h1: 'Recibo de Cuidador de Idosos | Gerador com PDF Grátis',
    intro: 'Segurança justa que sua dedicação e cuidado merecem financeiramente. Este comprovante destina-se a cuidadores, acompanhantes domiciliares e folguistas formalizarem o recebimento de diárias ou honorários pelos familiares.',
    specificDetailsTitle: 'O que não pode faltar no Recibo para Acompanhante/Cuidador',
    specificDetailsList: [
      'Pagador Responsável: Normalmente, quem paga é o filho(a) ou tutor do idoso; separe dos dados do beneficiário.',
      'Período específico: É vital escrever: "Plantão final de semana dias 12 e 13", limitando as horas e afastando vínculo celetista.',
      'Despesas de Transporte: Se você foi reembolsado por passagens, destaque o valor do repasse para Vale-Transporte (VT).',
      'Ausência de Termos Clínicos: Não há necessidade de detalhar remédios, apenas a "Acompanhamento e Cuidados Domésticos de Rotina".'
    ],
    lsiText: 'As relações trabalhistas domésticas são sensíveis no Brasil. Um cuidador eventual ou folguista protegerá tanto a si quanto as famílias (evitando passivos trabalhistas no eSocial Doméstico) se munido da comprovação assinada de quitação de honorários ou labor temporário eventual, ratificando a remuneração por plantões através deste recibo assinado limpo.',
    faqs: [
      { question: 'O idoso deve assinar como pagador no documento?', answer: 'Se ele tiver lucidez e for o gestor financeiro da própria casa, sim. Caso contrário, preencha com o CPF do parente responsável pelas finanças.' },
      { question: 'Vale adicionar os valores de passagem repassados?', answer: 'Sim. Descreva "Remuneração por Plantão R$150 + Reembolso Transporte R$20". Isso blinda seu pagamento total num só comprovante.' },
      { question: 'Trabalho de folguista (plantão) pode ser sem carteira (CLT)?', answer: 'Sendo feito de forma verdadeiramente eventual (ex: cobrindo faltas ou pequenos finais de semanas esporádicos), e munido do recibo provando a pontualidade, não acarreta o vínculo típico diário.' }
    ],
    ctaText: 'Você cuida das vidas deles, agora cuide do seu caixa. Faça o recibo dos seus plantões grátis online!'
  }
};
