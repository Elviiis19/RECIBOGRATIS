const fs = require('fs');

const batch3 = [
  // 21
  {
    slug: 'recibo-de-manicure-cabeleireira-salao-de-beleza',
    title: 'Recibo para Manicure e Cabeleireira: Modelo e Como Fazer',
    category: 'autonomos',
    seoTitle: 'Recibo para Manicure, Cabeleireira e Estética: Modelo em PDF Grátis',
    seoDescription: 'Aprenda como emitir recibo de manicure, depilação, cabeleireira e estética. Modelo simples em PDF para salões parceiros e autônomas.',
    intro: {
      acordo: 'Profissionais de beleza e estética atendem dezenas de clientes por semana e precisam formalizar atendimentos, pacotes mensais e parcerias.',
      promessa: 'Neste artigo, você verá como emitir recibos profissionais em segundos para pacotes de unhas, cabelo e estética com respaldo legal.',
      previa: 'Entenda como funciona o comprovante na Lei do Salão-Parceiro e veja o modelo pronto para baixar ou enviar no WhatsApp.'
    },
    sections: [
      {
        h2: 'Por que profissionais de beleza devem emitir recibo?',
        content: '<p>A emissão de recibo para serviços de beleza comprova a prestação do serviço e o valor recebido, protegendo a profissional em caso de cancelamentos e garantindo suporte financeiro para o controle de rendimentos e declaração de renda.</p><div class="my-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200"><p class="text-emerald-900 font-semibold mb-2">💅 Terminou o procedimento? Emita o recibo em 30 segundos:</p><p class="text-sm text-emerald-800 mb-3">Preencha o serviço realizado, valor e envie o PDF direto no WhatsApp da cliente sem custo.</p><a href="/recibo-simples" class="inline-flex items-center px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg text-sm hover:bg-emerald-700 transition">Gerar Recibo de Beleza em PDF →</a></div>',
        hasAd: true
      },
      {
        h2: 'Modelo de Recibo para Serviços de Estética e Beleza',
        content: '<div class="bg-gray-100 p-4 rounded-xl border border-gray-300 font-mono text-xs text-gray-800 my-3">RECEBI de MARIANA ALBUQUERQUE (CPF: 222.333.444-55) a quantia de R$ 220,00 (duzentos e vinte reais), via Pix, referente a pacote de manicure, pedicure e hidratação capilar. Dou plena quitação.<br>Santos - SP, 12 de maio de 2026.<br>Profissional: CARLA DIAS ESTÉTICA - CPF/CNPJ: 111.222.333-00</div><p class="mt-4">Você pode gerar esse modelo em formato folha A4 no <a href="/recibo-simples" class="text-emerald-700 font-semibold hover:underline">recibo simples online</a>.</p>',
        hasCta: {
          text: "Profissionalize seus atendimentos com comprovantes em PDF:",
          link: "/recibo-simples",
          ctaLabel: "EMITIR RECIBO DE MANICURE EM PDF"
        }
      }
    ],
    conclusion: 'Organização financeira é o primeiro passo para o crescimento de qualquer salão ou estúdio de beleza. Emita recibos em cada pacote fechado.',
    faqs: [
      {
        question: 'Manicure autônoma pode emitir recibo com CPF?',
        answer: 'Sim, a manicure ou esteticista autônoma pode emitir recibo com CPF perfeitamente válido com base no Art. 320 do Código Civil.'
      }
    ]
  },

  // 22
  {
    slug: 'recibo-de-jardinagem-limpeza-de-terreno',
    title: 'Recibo para Jardinagem e Limpeza de Terreno: Modelo Pronto',
    category: 'prestacao-de-servicos',
    seoTitle: 'Recibo de Jardinagem e Roçagem de Terreno: Modelo em PDF Grátis',
    seoDescription: 'Como fazer recibo de jardinagem, poda de árvores, paisagismo e limpeza de terrenos. Modelo pronto para autônomos e condomínios.',
    intro: {
      acordo: 'Trabalhos de jardinagem, roçagem de lotes e poda de árvores envolvem contratações avulsas que precisam de quitação na entrega do serviço.',
      promessa: 'Neste artigo, você verá como redigir um recibo simples de jardinagem que atesta o serviço concluído e protege contratante e jardineiro.',
      previa: 'Veja os detalhes do terreno a incluir no comprovante e gere o PDF na hora pelo celular.'
    },
    sections: [
      {
        h2: 'Por que condomínios e donos de lotes exigem recibo de jardinagem?',
        content: '<p>Tanto administradoras de condomínios quanto proprietários de terrenos exigem recibo com CPF do jardineiro para comprovar que o lote foi limpo (evitando multas da Prefeitura por mato alto) e prestar contas aos condôminos.</p><div class="my-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200"><p class="text-emerald-900 font-semibold mb-2">🌿 Concluiu a roçagem ou jardim?</p><p class="text-sm text-emerald-800 mb-3">Preencha metragem, endereço do lote e receba o valor com o comprovante assinado.</p><a href="/recibo-simples" class="inline-flex items-center px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg text-sm hover:bg-emerald-700 transition">Gerar Recibo de Jardinagem em PDF →</a></div>',
        hasAd: true
      },
      {
        h2: 'Exemplo de Recibo Simples de Limpeza de Terreno',
        content: '<div class="bg-gray-100 p-4 rounded-xl border border-gray-300 font-mono text-xs text-gray-800 my-3">RECEBI de CONDOMÍNIO RESIDENCIAL PARQUE DAS PALMEIRAS (CNPJ: 01.234.567/0001-89) a quantia de R$ 900,00 (novecentos reais), via transferência bancária, referente aos serviços de roçagem mecanizada, poda de cerca viva e retirada de entulho vegetal. Dou plena quitação.<br>Sorocaba - SP, 18 de agosto de 2026.<br>Jardineiro: JOÃO BOSCO FERREIRA - CPF: 333.444.555-66</div><p class="mt-4">Emita seu comprovante em menos de 1 minuto no <a href="/recibo-simples" class="text-emerald-700 font-semibold hover:underline">recibo simples para serviços gerais</a>.</p>',
        hasCta: {
          text: "Formalize serviços de jardinagem e poda com recibo limpo:",
          link: "/recibo-simples",
          ctaLabel: "CRIAR RECIBO DE JARDINAGEM"
        }
      }
    ],
    conclusion: 'Trabalhos pesados merecem comprovação clara e justa. Emita seu recibo a cada limpeza de lote e mantenha seus clientes recorrentes.',
    faqs: [
      {
        question: 'O recibo de jardinagem serve para prestação de contas de condomínio?',
        answer: 'Sim, recibos detalhados com CPF do prestador e descrição do serviço atendem às exigências de prestação de contas em assembleias condominiais.'
      }
    ]
  },

  // 23
  {
    slug: 'recibo-de-eletricista-instalacao-e-reparos',
    title: 'Recibo de Eletricista: Modelo para Instalações e Reparos',
    category: 'prestacao-de-servicos',
    seoTitle: 'Recibo de Eletricista Residencial e Predial: Modelo em PDF Grátis',
    seoDescription: 'Como fazer recibo de eletricista para instalações, padrão de energia e consertos. Modelo profissional com descrição técnica e quitação.',
    intro: {
      acordo: 'Serviços de instalações elétricas, troca de disjuntores e fiação exigem formalização detalhada para atestar a entrega da infraestrutura em perfeito funcionamento.',
      promessa: 'Neste artigo, você aprenderá a criar recibos de eletricista com termos técnicos e garantias de conformidade com as normas NBR 5410.',
      previa: 'Veja o modelo de recibo para instalações residenciais e industriais e como emitir em PDF sem complicações.'
    },
    sections: [
      {
        h2: 'A importância da descrição técnica no recibo elétrico',
        content: '<p>Trabalhos elétricos envolvem segurança predial. No recibo, citar os quadros de força, circuitos ou tomadas instaladas comprova o escopo exato do trabalho executado pelo profissional nos termos do <strong>Artigo 320 do Código Civil</strong>.</p><div class="my-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200"><p class="text-emerald-900 font-semibold mb-2">⚡ Eletricista, entregue a obra com recibo profissional:</p><p class="text-sm text-emerald-800 mb-3">Preencha os dados no celular em segundos e envie o PDF com seu nome e CPF/CNPJ.</p><a href="/recibo-simples" class="inline-flex items-center px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg text-sm hover:bg-emerald-700 transition">Gerar Recibo de Eletricista em PDF →</a></div>',
        hasAd: true
      },
      {
        h2: 'Exemplo de Recibo Simples para Eletricista',
        content: '<div class="bg-gray-100 p-4 rounded-xl border border-gray-300 font-mono text-xs text-gray-800 my-3">RECEBI de GUILHERME SANTOS (CPF: 444.555.666-00) a quantia de R$ 1.100,00 (um mil e cem reais), via Pix, referente à substituição de fiação do circuito de chuveiros e instalação do novo quadro de distribuição bifásico com disjuntores DIN e DPS no imóvel da Rua das Acácias, 88. Dou plena quitação dos serviços executados.<br>Maringá - PR, 25 de junho de 2026.<br>Eletricista: CARLOS ALBERTO NOGUEIRA - CPF: 777.888.999-11</div><p class="mt-4">Use a nossa ferramenta no <a href="/recibo-simples" class="text-emerald-700 font-semibold hover:underline">gerador de recibo simples</a> para emitir na hora.</p>',
        hasCta: {
          text: "Formalize seus serviços de eletricista com alta credibilidade:",
          link: "/recibo-simples",
          ctaLabel: "EMITIR RECIBO ELÉTRICO EM PDF"
        }
      }
    ],
    conclusion: 'A segurança elétrica começa no cabeamento e termina na transparência contratual. Garanta recibos assinados em todas as suas instalações.',
    faqs: [
      {
        question: 'Eletricista autônomo precisa colocar registro do conselho no recibo?',
        answer: 'Se o profissional for técnico em eletrotécnica (CFT) ou engenheiro (CREA), é excelente prática adicionar o número do registro profissional no cabeçalho.'
      }
    ]
  },

  // 24
  {
    slug: 'recibo-de-encanador-desentupimento-e-reparos',
    title: 'Recibo de Encanador: Modelo para Consertos Hidráulicos',
    category: 'prestacao-de-servicos',
    seoTitle: 'Recibo de Encanador e Desentupimento: Modelo em PDF Grátis',
    seoDescription: 'Aprenda como fazer recibo de encanador para consertos hidráulicos, caça-vazamentos e desentupimentos. Baixe modelo pronto em PDF.',
    intro: {
      acordo: 'Vazamentos, infiltrações e desentupimentos costumam acontecer de surpresa e exigem solução e pagamento imediatos.',
      promessa: 'Neste artigo, você verá como formalizar reparos hidráulicos com um recibo simples que comprova o conserto e a quitação.',
      previa: 'Confira os dados essenciais do laudo e recibo de caça-vazamento e gere o comprovante em PDF na hora.'
    },
    sections: [
      {
        h2: 'Por que o cliente exige recibo de encanador?',
        content: '<p>Em muitos casos de infiltração em apartamentos, o morador precisa apresentar o recibo do encanador ao síndico ou ao vizinho de baixo para comprovar que o cano foi consertado e solicitar rateio ou reembolso.</p><div class="my-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200"><p class="text-emerald-900 font-semibold mb-2">🔧 Concluiu o reparo hidráulico?</p><p class="text-sm text-emerald-800 mb-3">Gere o recibo simples com descrição do vazamento consertado em 30 segundos.</p><a href="/recibo-simples" class="inline-flex items-center px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg text-sm hover:bg-emerald-700 transition">Gerar Recibo de Encanador →</a></div>',
        hasAd: true
      },
      {
        h2: 'Exemplo de Recibo Simples Hidráulico',
        content: '<div class="bg-gray-100 p-4 rounded-xl border border-gray-300 font-mono text-xs text-gray-800 my-3">RECEBI de BEATRIZ VASCONCELOS (CPF: 555.444.333-22) a quantia de R$ 450,00 (quatrocentos e cinquenta reais), paga em dinheiro, referente à localização e conserto de vazamento em tubulação de água limpa na coluna da cozinha do Apto 302. Dou plena quitação.<br>Niterói - RJ, 14 de setembro de 2026.<br>Encanador: MARCOS PAULO SILVA - CPF: 111.999.888-00</div><p class="mt-4">Gere agora mesmo pelo celular no <a href="/recibo-simples" class="text-emerald-700 font-semibold hover:underline">recibo simples para encanadores</a>.</p>',
        hasCta: {
          text: "Emita recibos claros para reembolsos de condomínio:",
          link: "/recibo-simples",
          ctaLabel: "GERAR RECIBO DE ENCANADOR EM PDF"
        }
      }
    ],
    conclusion: 'Um recibo bem detalhado encerra conflitos entre vizinhos e condomínios sobre a origem do vazamento e valoriza o trabalho técnico do encanador.',
    faqs: [
      {
        question: 'O recibo de caça-vazamento serve para contestar conta de água alta?',
        answer: 'Sim! As concessionárias de saneamento (como Sabesp, Copasa, Sanepar) costumam conceder desconto no esgoto mediante apresentação de recibo de encanador que ateste o reparo do vazamento oculto.'
      }
    ]
  },

  // 25
  {
    slug: 'recibo-de-fotografo-eventos-e-ensaios',
    title: 'Recibo para Fotógrafo e Videomaker: Modelo de Ensaios e Eventos',
    category: 'autonomos',
    seoTitle: 'Recibo para Fotógrafo e Videomaker: Modelo em PDF Grátis',
    seoDescription: 'Como fazer recibo de fotografia para ensaios, aniversários, casamentos e cobertura de eventos. Modelo pronto em PDF para profissionais visuais.',
    intro: {
      acordo: 'Fotógrafos e produtores audiovisuais recebem comumente em duas ou três parcelas: entrada no fechamento e saldo na entrega das fotos.',
      promessa: 'Neste artigo, você aprenderá a documentar cada pagamento de pacotes fotográficos com recibos elegantes e sem margem para dúvidas.',
      previa: 'Veja como descrever quantidade de fotos tratadas, horas de cobertura e modelo pronto para emitir em segundos.'
    },
    sections: [
      {
        h2: 'Por que o fotógrafo profissional deve emitir recibo a cada etapa?',
        content: '<p>A fotografia artística envolve prazos de pós-produção e edição. Ter recibos discriminando o sinal para reserva de data e o recibo de entrega final com aprovação do material resguarda o fotógrafo contra pedidos infindáveis de refação ou atrasos no pagamento final.</p><div class="my-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200"><p class="text-emerald-900 font-semibold mb-2">📸 Fechou o ensaio ou evento?</p><p class="text-sm text-emerald-800 mb-3">Emita o recibo em PDF com layout limpo e envie no WhatsApp do cliente junto com a prévia.</p><a href="/recibo-simples" class="inline-flex items-center px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg text-sm hover:bg-emerald-700 transition">Gerar Recibo de Fotografia em PDF →</a></div>',
        hasAd: true
      },
      {
        h2: 'Exemplo de Recibo para Cobertura Fotográfica',
        content: '<div class="bg-gray-100 p-4 rounded-xl border border-gray-300 font-mono text-xs text-gray-800 my-3">RECEBI de CAMILA RODRIGUES (CPF: 888.777.666-55) a importância de R$ 1.500,00 (um mil e quinhentos reais), via Pix, referente à quitação final da cobertura fotográfica de aniversário infantil realizada em 10/04/2026, incluindo 80 fotos tratadas em alta resolução entregues digitalmente. Dou plena quitação.<br>Brasília - DF, 20 de abril de 2026.<br>Fotógrafo: LEONARDO VIANA FOTOGRAFIA - CPF/CNPJ: 333.222.111-00</div><p class="mt-4">Crie o seu no <a href="/recibo-simples" class="text-emerald-700 font-semibold hover:underline">recibo simples para fotógrafos</a>.</p>',
        hasCta: {
          text: "Formalize seus ensaios com recibos de alto padrão visual:",
          link: "/recibo-simples",
          ctaLabel: "GERAR RECIBO DE FOTÓGRAFO EM PDF"
        }
      }
    ],
    conclusion: 'A excelência do fotógrafo vai além do clique: ela se manifesta na pontualidade, no contrato e nos recibos organizados entregues aos clientes.',
    faqs: [
      {
        question: 'O recibo de fotografia transfere direitos autorais das imagens?',
        answer: 'Não. O recibo comprova apenas o pagamento financeiro. A cessão ou licença de uso dos direitos autorais deve constar no contrato de prestação de serviços fotográficos.'
      }
    ]
  },

  // 26
  {
    slug: 'recibo-de-marcenaria-moveis-planejados',
    title: 'Recibo de Marcenaria: Como Comprovar Móveis Planejados',
    category: 'prestacao-de-servicos',
    seoTitle: 'Recibo de Marcenaria e Móveis Planejados: Modelo em PDF Grátis',
    seoDescription: 'Aprenda como emitir recibo de marcenaria, fabricação de móveis sob medida e materiais. Modelo em PDF com etapas de entrada, corte e montagem.',
    intro: {
      acordo: 'A fabricação de móveis sob medida exige compra prévia de chapas de MDF, ferragens e montagem no cliente, envolvendo valores expressivos.',
      promessa: 'Neste artigo, você aprenderá a estruturar recibos de marcenaria para garantir o pagamento da entrada de materiais e da entrega final.',
      previa: 'Veja as cláusulas recomendadas para marcenarias e marceneiros autônomos e gere o documento em PDF grátis.'
    },
    sections: [
      {
        h2: 'Por que o marceneiro nunca deve comprar MDF sem recibo de sinal?',
        content: '<p>A compra de matéria-prima sob medida gera custos imediatos. O marceneiro deve colher a entrada e emitir um recibo detalhando expressamente que o valor se destina à aquisição dos insumos do projeto aprovado nos termos do <strong>Artigo 417 do Código Civil</strong>.</p><div class="my-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200"><p class="text-emerald-900 font-semibold mb-2">🪵 Marceneiro, proteja seus custos com recibos claros:</p><p class="text-sm text-emerald-800 mb-3">Preencha ambiente, materiais e valores de entrada e montagem no nosso gerador gratuito.</p><a href="/recibo-simples" class="inline-flex items-center px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg text-sm hover:bg-emerald-700 transition">Gerar Recibo de Marcenaria →</a></div>',
        hasAd: true
      },
      {
        h2: 'Exemplo de Recibo Simples de Marcenaria',
        content: '<div class="bg-gray-100 p-4 rounded-xl border border-gray-300 font-mono text-xs text-gray-800 my-3">RECEBI de RODRIGO PEIXOTO (CPF: 666.555.444-33) o valor de R$ 3.800,00 (três mil e oitocentos reais), via Pix, referente à 1ª parcela de entrada e compra de MDF/ferragens para execução do armário planejado de cozinha conforme projeto nº 42. Restando saldo final de R$ 3.800,00 na montagem.<br>Joinville - SC, 15 de julho de 2026.<br>Marcenaria: MARCENARIA DESIGN - CPF/CNPJ: 12.000.111/0001-22</div><p class="mt-4">Gere facilmente no <a href="/recibo-simples" class="text-emerald-700 font-semibold hover:underline">recibo simples para marcenaria</a>.</p>',
        hasCta: {
          text: "Formalize a entrada dos seus projetos planejados:",
          link: "/recibo-simples",
          ctaLabel: "EMITIR RECIBO DE MARCENEIRO"
        }
      }
    ],
    conclusion: 'Grandes marceneiros constroem impérios baseados na qualidade do acabamento e no rigor documental das suas cobranças.',
    faqs: [
      {
        question: 'O recibo de marcenaria dá início ao prazo de garantia do móvel?',
        answer: 'Sim, o recibo de quitação da montagem serve como certidão da data de conclusão do serviço para contagem dos prazos de garantia legal e contratual.'
      }
    ]
  },

  // 27
  {
    slug: 'recibo-de-costureira-reparos-e-confeccao',
    title: 'Recibo para Costureira: Modelo para Ajustes e Confecção',
    category: 'autonomos',
    seoTitle: 'Recibo para Costureira e Ateliê de Costura: Modelo em PDF Grátis',
    seoDescription: 'Como emitir recibo simples de costureira para ajustes de roupas, bainhas, vestidos sob medida e consertos. Modelo prático para imprimir ou celular.',
    intro: {
      acordo: 'Costureiras, ateliês e alfaiates realizam dezenas de pequenos consertos diários e confecções de alto valor que exigem comprovante.',
      promessa: 'Neste artigo, você verá como formalizar reformas de roupas, vestidos de festa e encomendas sob medida com recibos organizados.',
      previa: 'Veja o modelo de recibo de costura e aprenda a enviar direto no WhatsApp das clientes.'
    },
    sections: [
      {
        h2: 'A utilidade do recibo em reformas e encomendas de roupas',
        content: '<p>O recibo simples de costura identifica as peças deixadas no ateliê, o valor cobrado e a data combinada de prova ou entrega, evitando discussões sobre peças prontas esquecidas pelas clientes.</p><div class="my-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200"><p class="text-emerald-900 font-semibold mb-2">🧵 Costureira, organize suas encomendas com recibos:</p><p class="text-sm text-emerald-800 mb-3">Preencha peça, ajuste e valor. Gere em PDF para impressão ou envie no WhatsApp da cliente.</p><a href="/recibo-simples" class="inline-flex items-center px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg text-sm hover:bg-emerald-700 transition">Gerar Recibo de Costura em PDF →</a></div>',
        hasAd: true
      },
      {
        h2: 'Exemplo de Recibo Simples de Costura',
        content: '<div class="bg-gray-100 p-4 rounded-xl border border-gray-300 font-mono text-xs text-gray-800 my-3">RECEBI de FABIANA DUARTE (CPF: 111.000.999-88) a quantia de R$ 160,00 (cento e sessenta reais), via Pix, referente aos ajustes de barra original em 2 calças jeans e ajuste de cintura em 1 vestido de festa. Dou plena quitação.<br>Uberlândia - MG, 03 de agosto de 2026.<br>Costureira: MARIA APARECIDA ATELIÊ - CPF: 777.666.555-44</div><p class="mt-4">Emita seu modelo no <a href="/recibo-simples" class="text-emerald-700 font-semibold hover:underline">recibo simples para costureiras</a>.</p>',
        hasCta: {
          text: "Formalize reformas e confecções no seu ateliê:",
          link: "/recibo-simples",
          ctaLabel: "GERAR RECIBO DE COSTURA EM PDF"
        }
      }
    ],
    conclusion: 'A precisão do corte e da costura deve refletir na precisão da sua gestão. Recibos limpos fidelizam clientes e valorizam seu talento artesanal.',
    faqs: [
      {
        question: 'Costureira autônoma pode emitir com CPF?',
        answer: 'Sim, a costureira autônoma pessoa física pode emitir recibos perfeitamente legais com seu CPF.'
      }
    ]
  },

  // 28
  {
    slug: 'recibo-de-montador-de-moveis-servicos-avulsos',
    title: 'Recibo de Montador de Móveis: Modelo Profissional em PDF',
    category: 'autonomos',
    seoTitle: 'Recibo de Montador de Móveis: Modelo Simples em PDF Grátis',
    seoDescription: 'Aprenda como emitir recibo de montador de móveis autônomo. Modelo completo para montagem de guarda-roupas, cozinhas e desmontagens.',
    intro: {
      acordo: 'Montar móveis comprados pela internet é um dos serviços mais demandados do Brasil, exigindo quitação no ato da montagem no domicílio do cliente.',
      promessa: 'Neste artigo, você aprenderá a emitir um recibo simples de montagem que comprova o teste de portas, gavetas e quitação do valor.',
      previa: 'Veja como se proteger de reclamações de peças danificadas na fábrica e gere o PDF na hora pelo celular.'
    },
    sections: [
      {
        h2: 'Por que o montador de móveis deve colher assinatura no recibo?',
        content: '<p>Muitas vezes, móveis comprados online vêm com avarias de fábrica ou transporte. O recibo assinado pelo cliente atesta que o montador concluiu a montagem técnica e que o produto foi testado e entregue regulado nos termos do <strong>Artigo 320 do Código Civil</strong>.</p><div class="my-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200"><p class="text-emerald-900 font-semibold mb-2">🔨 Montou o móvel? Emita o comprovante antes de sair:</p><p class="text-sm text-emerald-800 mb-3">Preencha no smartphone, baixe o PDF e mande no WhatsApp do cliente na hora.</p><a href="/recibo-simples" class="inline-flex items-center px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg text-sm hover:bg-emerald-700 transition">Gerar Recibo de Montador em PDF →</a></div>',
        hasAd: true
      },
      {
        h2: 'Exemplo de Recibo Simples de Montador',
        content: '<div class="bg-gray-100 p-4 rounded-xl border border-gray-300 font-mono text-xs text-gray-800 my-3">RECEBI de THIAGO GOMES (CPF: 999.000.111-22) a quantia de R$ 200,00 (duzentos reais), via Pix, referente à montagem e regulagem de 1 guarda-roupa de 6 portas com espelho e 1 painel de TV na Rua Brasil, 300. Dou plena quitação.<br>Fortaleza - CE, 28 de maio de 2026.<br>Montador: MARCOS MONTAGENS - CPF: 444.333.222-11</div><p class="mt-4">Gere agora no <a href="/recibo-simples" class="text-emerald-700 font-semibold hover:underline">recibo simples para montadores de móveis</a>.</p>',
        hasCta: {
          text: "Cobrança rápida e profissional na palma da mão:",
          link: "/recibo-simples",
          ctaLabel: "EMITIR RECIBO DE MONTAGEM EM PDF"
        }
      }
    ],
    conclusion: 'O montador de móveis que envia recibo em PDF transmite autoridade e recebe indicações contínuas de vizinhos e parentes do cliente satisfeito.',
    faqs: [
      {
        question: 'O recibo de montador cobre defeitos de fábrica da madeira?',
        answer: 'Não. O recibo atesta a montagem da mão de obra. Defeitos de fábrica são de responsabilidade do fabricante ou da loja vendedora conforme o CDC.'
      }
    ]
  },

  // 29
  {
    slug: 'recibo-de-adestrador-e-pet-sitter',
    title: 'Recibo para Adestrador, Passeador e Pet Sitter: Modelo Pronto',
    category: 'autonomos',
    seoTitle: 'Recibo de Adestrador, Passeador de Cães e Pet Sitter em PDF',
    seoDescription: 'Como fazer recibo de passeador de cães (dog walker), adestrador e pet sitter. Modelo simples em PDF para mensalidades e pacotes de passeios.',
    intro: {
      acordo: 'O mercado pet cresce a passos largos no Brasil, e os tutores valorizam imensamente a segurança e o profissionalismo de quem cuida dos seus animais.',
      promessa: 'Neste artigo, você verá como emitir recibos profissionais para pacotes de adestramento, passeios diários e hospedagem pet.',
      previa: 'Veja os termos de cuidado a incluir e gere o documento em PDF para os tutores.'
    },
    sections: [
      {
        h2: 'A importância de formalizar serviços no mercado pet',
        content: '<p>Emitir recibo mensal de passeios ou sessões de adestramento confere transparência sobre a frequência dos serviços e transmite a segurança de um profissional sério e comprometido com o bem-estar animal.</p><div class="my-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200"><p class="text-emerald-900 font-semibold mb-2">🐾 Profissional Pet, formalize seus pacotes com elegância:</p><p class="text-sm text-emerald-800 mb-3">Preencha nome do pet, tutor e pacote mensal. Baixe o PDF e mande no WhatsApp.</p><a href="/recibo-simples" class="inline-flex items-center px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg text-sm hover:bg-emerald-700 transition">Gerar Recibo Pet em PDF →</a></div>',
        hasAd: true
      },
      {
        h2: 'Exemplo de Recibo Simples para Dog Walker e Adestrador',
        content: '<div class="bg-gray-100 p-4 rounded-xl border border-gray-300 font-mono text-xs text-gray-800 my-3">RECEBI de DANIELA FONSECA (CPF: 777.666.555-88) o valor de R$ 400,00 (quatrocentos reais), via Pix, referente ao pacote mensal de passeios educativos (3x por semana) para o cão "Thor" no mês de junho de 2026. Dou plena quitação.<br>Campinas - SP, 30 de junho de 2026.<br>Profissional: LUCAS PET CARE - CPF: 222.111.000-99</div><p class="mt-4">Crie facilmente no <a href="/recibo-simples" class="text-emerald-700 font-semibold hover:underline">recibo simples para serviços pet</a>.</p>',
        hasCta: {
          text: "Formalize seus atendimentos pet com recibos limpos:",
          link: "/recibo-simples",
          ctaLabel: "GERAR RECIBO PET EM PDF"
        }
      }
    ],
    conclusion: 'Quem ama animais sabe que confiança é tudo. Recibos pontuais constroem relações duradouras com famílias e tutores de pets.',
    faqs: [
      {
        question: 'Pet sitter precisa de CNPJ para emitir recibo?',
        answer: 'Não, o pet sitter ou dog walker autônomo pode emitir recibo simples perfeitamente legal com seu CPF.'
      }
    ]
  },

  // 30
  {
    slug: 'como-organizar-recibos-do-ano-todo-declaracao-mei',
    title: 'Como Organizar Recibos do Ano Todo para o MEI (DASN-SIMEI)',
    category: 'mei-e-empresas',
    seoTitle: 'Como Organizar Recibos do Ano Todo para a Declaração Anual do MEI',
    seoDescription: 'Aprenda como guardar e somar recibos de vendas e serviços para não passar sufoco na Declaração Anual do MEI (DASN-SIMEI). Guia prático definitivo.',
    intro: {
      acordo: 'Chega o mês de maio e milhares de microempreendedores entram em pânico tentando somar papéis espalhados para declarar o faturamento à Receita.',
      promessa: 'Neste artigo, você aprenderá uma rotina simples de 5 minutos por mês para organizar todos os seus recibos e faturar dentro do teto do MEI.',
      previa: 'Veja a planilha mental de controle, como fazer backup digital e como emitir recibos padronizados ao longo do ano.'
    },
    sections: [
      {
        h2: 'O teto do MEI e o perigo de não controlar os recibos emitidos',
        content: '<p>O Microempreendedor Individual tem um teto anual de faturamento de R$ 81.000 (com margem de tolerância de 20%). Se você emitir recibos sem somar mensalmente, corre o risco de estourar o limite sem perceber e ser desenquadrado compulsoriamente para o Simples Nacional, pagando impostos retroativos com multa.</p><div class="my-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200"><p class="text-emerald-900 font-semibold mb-2">📈 MEI, emita recibos organizados o ano todo:</p><p class="text-sm text-emerald-800 mb-3">Gere seus comprovantes com seu CNPJ e salve os PDFs para consulta imediata na hora do DASN.</p><a href="/recibo-simples" class="inline-flex items-center px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg text-sm hover:bg-emerald-700 transition">Acessar Gerador Oficial do MEI →</a></div>',
        hasAd: true
      },
      {
        h2: 'O passo a passo para a pasta anual do MEI',
        content: '<ol class="list-decimal pl-5 my-4 space-y-2"><li>Crie uma pasta no seu computador ou Google Drive chamada <strong>"MEI 2026 - Recibos"</strong> dividida por mês (Janeiro, Fevereiro, etc.).</li><li>A cada pagamento de cliente pessoa física, gere o comprovante no <a href="/recibo-simples" class="text-emerald-700 font-semibold hover:underline">recibo simples online</a> e salve o PDF na pasta do mês.</li><li>No último dia de cada mês, preencha o Relatório Mensal de Receitas Brutas com a soma exata dos recibos.</li><li>Em janeiro do ano seguinte, sua declaração do DASN-SIMEI levará menos de 2 minutos para ser enviada sem nenhum erro!</li></ol>'
      }
    ],
    conclusion: 'A tranquilidade contábil do MEI não depende de softwares caros, mas de disciplina no registro de cada pagamento. Emita e guarde seus recibos digitais a cada transação.',
    faqs: [
      {
        question: 'O MEI precisa guardar os comprovantes fiscais por quanto tempo?',
        answer: 'Por pelo menos 5 anos a contar do ano subsequente à declaração do DASN-SIMEI, conforme determina a Resolução CGSN nº 140.'
      },
      {
        question: 'Recibo simples é aceito na fiscalização do MEI?',
        answer: 'Sim! Para vendas a pessoas físicas em que não foi exigida NF-e, os recibos emitidos e o relatório mensal constituem a documentação legal exigida pelo Fisco.'
      }
    ]
  }
];

console.log("Writing articles batch 3 (21-30)...");
fs.writeFileSync('/tmp/articles_batch3.json', JSON.stringify(batch3, null, 2));
console.log("Done batch 3.");
