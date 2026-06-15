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
}

export const richSeoData: Record<string, RichSEOContent> = {
  'pagamento': {
    h1: 'Recibo de Pagamento',
    intro: 'O recibo de pagamento é o comprovante definitivo de que um serviço ou produto foi quitado. Ele é a garantia prática de que quem pagou não será cobrado duas vezes, além de formalizar a transação para o controle financeiro do profissional autônomo ou prestador que recebeu o valor.',
    specificDetailsTitle: 'Como preencher seu recibo passo a passo',
    specificDetailsList: [
      'Valor: Preencha a quantia exata em números e também por extenso para evitar qualquer tipo de adulteração.',
      'Dados das Partes: Insira o Nome Completo e o CPF/CNPJ de quem está pagando (o cliente) e de quem está recebendo (o prestador).',
      'Referente a (Descrição): Seja o mais detalhista possível. Em vez de escrever apenas "serviço prestado", detalhe o que foi entregue, como "serviço de pintura residencial", "criação de site" ou "manutenção elétrica".',
      'Local, Data e Assinatura: Finalize com a cidade, a data do acerto e a assinatura obrigatória de quem recebeu o dinheiro.'
    ],
    lsiText: 'Esse modelo é ideal e totalmente válido para transações do dia a dia, como pagamentos de pequenas dívidas, diárias informais, vendas particulares e repasses familiares.',
    legalText: [
      'Sim. Quando preenchido corretamente e assinado por quem recebeu o valor, o documento possui ampla validade civil. Ele funciona como uma prova robusta para proteger as partes contra cobranças indevidas na justiça comum e no Procon.',
      'Atenção: O recibo atesta a quitação financeira entre as partes, mas não substitui a emissão da Nota Fiscal (NF) caso o profissional ou a empresa tenham a obrigação tributária de declará-la ao Governo.'
    ],
    ctaText: 'Gere agora o documento padronizado, pronto para ser impresso ou enviado pelo WhatsApp em formato PDF direto do seu navegador, sem necessidade de cadastro.'
  },
  'simples': {
    h1: 'Recibo Simples, visualize na hora que preenche e baixe em PDF',
    intro: 'O recibo simples é o instrumento financeiro e jurídico mais utilizado no Brasil para atestar transações cotidianas. Trata-se de uma declaração formal, assinada por quem recebe o dinheiro, afirmando que uma dívida foi integralmente ou parcialmente quitada por quem pagou. Transações informais ou verbais que dependem apenas da confiança são perigosas e frequentemente resultam em severas dores de cabeça, perda financeira ou processos de cobrança em duplicidade.',
    useCasesTitle: 'Quando você deve usar este documento? Veja os 6 principais casos de uso:',
    useCasesList: [
      'Compra e Venda de bens usados de grande valor (veículos, eletrônicos, móveis) entre Pessoas Físicas;',
      'Pagamento de pequenos serviços eventuais e informais que não exijam emissão obrigatória de Nota Fiscal;',
      'Quitação de transações de aluguéis de temporada, equipamentos ou imóveis por proprietário sem CNPJ;',
      'Pagamento de diárias para profissionais autônomos e liberais que operem via CPF;',
      'Trabalhos de honorários artísticos ou manuais realizados por freelancers não legalizados como MEI;',
      'Repasses familiares e adiantamentos corporativos informais que necessitem ficar documentados.'
    ],
    useCasesConclusion: 'Proteja o seu direito, afaste as chances de fraude, e formalize qualquer repasse em um documento validado, limpo e estruturado.',
    specificDetailsTitle: 'Como preencher o recibo corretamente',
    specificDetailsList: [
      '1. Valor Numérico e Por Extenso: Escreva a quantia exata da transação com clareza. Digitar por extenso ("Cem reais") além do número é obrigatório para inviabilizar fraudes ou adulteração em caneta por má-fé do recebedor.',
      '2. O Pagador e o Recebedor: Identifique a pessoa que está efetuando o pagamento (pagador) e quem figura como beneficiário (recebedor). Fuja do uso de apelidos e sempre insira os nomes que contam nos documentos oficiais.',
      '3. Requisito de CPF ou CNPJ: Exclusivamente através do CPF ou CNPJ formal é que o Código Civil liga o débito com o cidadão. Nunca emita um recibo vazio; o preenchimento amarra o documento judicialmente na identificação civil das partes envolvidas.',
      '4. Motivo na aba "Referente a": Este é o coração do atestado. Jamais use sentenças genéricas como "serviços prestados". Restrinja o escopo descrevendo a ação. Exemplo: "pagamento da compra à vista de celular X, modelo Y". O nível de detalhe cessa contestações futuras.',
      '5. As Margens de Local e Data: Para registrar a validade e o rastro histórico de que o fato financeiro consumou-se no mundo real, assinale com segurança a data de repasse do valor junto com a respectiva cidade celebrada.',
      '6. A Assinatura do Cedente: Um recibo possui nula validade sem a assinatura do favorecido constando de caneta ou em vias fidedignamente digitais sobre a folha documentando os ditos honorários repassados. Quem cede e emite este deve certificar fisicamente.'
    ],
    lsiText: 'Esse modelo é ideal e totalmente válido para transações do dia a dia, como pagamentos de pequenas dívidas, diárias informais, vendas particulares e repasses familiares.',
    legalText: [
      'O recibo simples é sua proteção legal em qualquer transação informal. Quando assinado corretamente, ele impede cobranças em duplicidade e serve como prova em caso de disputa no Procon ou na Justiça. Guarde sempre uma cópia por pelo menos 5 anos.',
      'No ditame legal em face dos pagadores do Brasil, cabe a você como sujeito devedor que despende o seu dinheiro, pedir vigorosamente por direito legal do Código civil, o recebimento autêntico deste instrumento com plena força de absolvição final. Se o requerente insistir em obstar este simples repasse do recibo em PDF assinado, você assume perante a norma o direito de não faturar a operação enquanto a prova de quitação não transitar integralmente na posse de arquivamento.',
      'Atenção: É inegável e assinalado sempre que, enquanto este modelo formal seja a blindagem oficial para sujeitos físicos (PF) desvinculados contra terceiros, o mesmo documento não extingue jamais alíquotas devidas a Secretaria de Fazenda Estadual impetradas através do porte de pessoa jurídica (CNPJ MEI ou Superiores) cuja legalidade imperiosa impõe a confecção adjunta de uma NF-e Nota Fiscal de Serviço atestada sem ressalvas.'
    ],
    ctaText: 'Produza sem qualquer burocracia um documento padronizado, dotado de formatação lícita e validade jurídica, pronto para arquivar, imprimir ou enviar diretamente no formato PDF.'
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
    ctaText: 'Você cuida das vidas deles, agora cuide do seu caixa. Faça o recibo dos seus plantões grátis online!'
  }
};
