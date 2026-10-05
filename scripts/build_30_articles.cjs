const fs = require('fs');
const path = require('path');

const articlesData = [
  // 1
  {
    slug: 'recibo-simples-imposto-de-renda-como-comprovar',
    title: 'Recibo Simples no Imposto de Renda: O que o Leão Aceita',
    category: 'financas-pessoais',
    seoTitle: 'Recibo Simples no Imposto de Renda: O que o Leão Aceita | Guia IRPF',
    seoDescription: 'Descubra se o recibo simples serve para comprovar renda e deduções no Imposto de Renda (IRPF). Veja as regras da Receita Federal e como emitir grátis.',
    intro: {
      acordo: 'Declarar o Imposto de Renda todo ano gera apreensão em milhões de autônomos e contribuintes que não possuem carteira assinada nem contracheque formal.',
      promessa: 'Neste artigo, você entenderá exatamente quando o recibo simples é aceito pela Receita Federal, como preencher os dados obrigatórios e como evitar cair na malha fina.',
      previa: 'Analisaremos a validade jurídica do comprovante perante o Fisco, os cuidados com CPF do pagador e como gerar documentos no padrão exigido pelo Carnê-Leão.'
    },
    sections: [
      {
        h2: 'O recibo simples tem validade perante a Receita Federal?',
        content: '<p>Sim! O recibo simples tem plena validade legal perante a Receita Federal do Brasil, desde que preenchido com todos os requisitos legais exigidos pelos <strong>artigos 319 e 320 do Código Civil (Lei 10.406/2002)</strong> e pelas instruções normativas da Receita Federal relativas ao IRPF e ao Carnê-Leão.</p><div class="my-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200"><p class="text-emerald-900 font-semibold mb-2">⚡ Precisa emitir um recibo simples válido agora mesmo?</p><p class="text-sm text-emerald-800 mb-3">Preencha online em 30 segundos, com conversão automática de valor por extenso e baixe em PDF ou envie no WhatsApp sem cadastro.</p><a href="/recibo-simples" class="inline-flex items-center px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg text-sm hover:bg-emerald-700 transition">Gerar Recibo Simples Oficial em PDF →</a></div><p>Para o Leão, o recibo comprova tanto a <strong>origem do rendimento</strong> (para quem recebeu e precisa justificar aumento patrimonial) quanto a <strong>efetiva quitação da despesa</strong> (para quem pagou e deseja deduzir ou comprovar despesas operacionais no Livro Caixa).</p>',
        hasAd: true
      },
      {
        h2: 'Quais dados não podem faltar no recibo para não cair na malha fina?',
        content: '<p>A Receita Federal cruza informações através do sistema de inteligência fiscal. Para que seu comprovante seja inquestionável em caso de fiscalização, ele deve conter obrigatoriamente:</p><ul class="list-disc pl-5 my-4 space-y-2"><li><strong>Nome completo e CPF de quem pagou</strong> (e CPF/CNPJ de quem recebeu).</li><li><strong>Valor numérico e escrito por extenso</strong> (para eliminar dúvidas de digitação).</li><li><strong>Descrição clara e específica do serviço prestado ou quitação</strong> (evite descrições genéricas como apenas "serviços").</li><li><strong>Data exata da operação e cidade</strong>.</li><li><strong>Assinatura física ou eletrônica de quem recebeu os valores</strong>.</li></ul>'
      },
      {
        h2: 'Modelo de Recibo Simples Aceito pela Receita Federal',
        content: '<p>Veja a estrutura textual ideal aceita por auditores fiscais e contadores:</p><div class="bg-gray-100 p-5 rounded-xl border border-gray-300 font-mono text-xs sm:text-sm text-gray-800 my-4 leading-relaxed">RECEBEMOS de CARLOS EDUARDO DA SILVA, inscrito no CPF nº 123.456.789-00, a quantia de R$ 1.850,00 (um mil, oitocentos e cinquenta reais), referente à prestação de serviços de consultoria financeira e elaboração de planejamento orçamentário. Para clareza e cumprimento do art. 320 do Código Civil, firmo o presente recibo dando plena e geral quitação.<br><br>São Paulo - SP, 15 de abril de 2026.<br><br>____________________________________________<br>MARCOS VINICIUS PEREIRA - CPF: 987.654.321-00</div><p class="mt-4">Em vez de digitar manualmente no Word, você pode usar o nosso <a href="/recibo-simples" class="text-emerald-700 font-semibold hover:underline">gerador de recibo simples em PDF</a> que já calcula o valor por extenso e entrega o layout formatado em folha A4.</p>',
        hasCta: {
          text: "Evite problemas com a malha fina. Crie seu comprovante profissional:",
          link: "/recibo-simples",
          ctaLabel: "EMITIR RECIBO SIMPLES EM PDF"
        }
      }
    ],
    conclusion: 'Manter seus comprovantes organizados e emitidos nos moldes do Código Civil é o segredo para ter paz perante a Receita Federal. Ao receber qualquer valor autônomo, emita o recibo simples na hora e guarde o PDF por pelo menos 5 anos.',
    faqs: [
      {
        question: 'O recibo simples precisa ter firma reconhecida em cartório para o IRPF?',
        answer: 'Não. A Receita Federal não exige reconhecimento de firma em cartório para a comprovação ordinária de despesas e rendimentos de autônomos. A assinatura simples das partes é suficiente.'
      },
      {
        question: 'Quanto tempo devo guardar os recibos emitidos?',
        answer: 'O prazo legal recomendado pelo Código Tributário Nacional e pelo Código Civil é de 5 anos, contados a partir do primeiro dia do exercício seguinte à declaração.'
      },
      {
        question: 'Quem recebe por Pix ainda precisa de recibo?',
        answer: 'Sim! O extrato bancário do Pix prova apenas a transferência financeira, mas não comprova qual serviço foi prestado nem concede quitação formal de obrigações contratuais.'
      }
    ]
  },

  // 2
  {
    slug: 'artigo-319-codigo-civil-quem-e-obrigado-dar-recibo',
    title: 'Quem é Obrigado a Dar Recibo por Lei? O Artigo 319 do Código Civil',
    category: 'burocracia-descomplicada',
    seoTitle: 'Quem é Obrigado a Dar Recibo por Lei? Art. 319 Código Civil Explicado',
    seoDescription: 'Descubra quem é obrigado por lei a fornecer recibo de pagamento no Brasil. Conheça seus direitos segundo o artigo 319 do Código Civil e gere grátis.',
    intro: {
      acordo: 'Você já fez um pagamento por um serviço ou compra e a pessoa ou empresa se recusou a entregar um comprovante por escrito?',
      promessa: 'Pouca gente sabe, mas o direito ao recibo é garantido pela legislação brasileira com penalidades expressas para quem se recusa a emitir.',
      previa: 'Neste artigo, explicamos detalhadamente o Artigo 319 do Código Civil e o que você pode fazer legalmente caso não queiram lhe fornecer o documento.'
    },
    sections: [
      {
        h2: 'O que diz o Artigo 319 da Lei Federal 10.406/2002?',
        content: '<p>O texto do <strong>Artigo 319 do Código Civil Brasileiro</strong> é categórico e direto:</p><blockquote class="border-l-4 border-emerald-600 pl-4 italic my-4 text-gray-800 bg-gray-50 py-3 rounded-r-lg">"O devedor que paga tem direito a quitação regular, e pode reter o pagamento, enquanto não lhe for dada."</blockquote><p>Isso significa que toda pessoa física ou jurídica que recebe um pagamento é <strong>obrigada por lei</strong> a fornecer a quitação por escrito. Mais do que isso: quem está pagando tem o direito legal de <strong>reter o dinheiro e não pagar</strong> até que o recebedor apresente ou assine o recibo.</p><div class="my-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200"><p class="text-emerald-900 font-semibold mb-2">📄 Emita a quitação regular do seu cliente em segundos:</p><p class="text-sm text-emerald-800 mb-3">Evite constrangimentos e garanta segurança jurídica com o modelo oficial de quitação do Código Civil.</p><a href="/recibo-simples" class="inline-flex items-center px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg text-sm hover:bg-emerald-700 transition">Acessar Gerador de Recibo Simples →</a></div>',
        hasAd: true
      },
      {
        h2: 'E se o credor se recusar a emitir o recibo?',
        content: '<p>Caso você se depare com uma situação em que o prestador ou credor se recusa a emitir o recibo, a lei lhe confere mecanismos de proteção:</p><ul class="list-disc pl-5 my-4 space-y-2"><li><strong>Retenção do pagamento:</strong> Você pode suspender o pagamento imediatamente sem que isso configure mora (inadimplência) ou gere juros contra você.</li><li><strong>Ação de Consignação em Pagamento:</strong> Se houver recusa injustificada em dar quitação e você não quiser reter o dinheiro, pode depositar o valor em juízo perante o Juizado Especial Cível.</li><li><strong>Crime contra a ordem tributária:</strong> No caso de comerciantes e empresas que se negam a fornecer comprovante, a conduta pode configurar infração à Lei nº 8.137/1990.</li></ul><p>Para evitar esse atrito, qualquer autônomo pode abrir no celular o <a href="/recibo-simples" class="text-emerald-700 font-semibold hover:underline">recibo simples online</a> e entregar o documento assinado digitalmente ou em PDF em menos de 1 minuto.</p>'
      },
      {
        h2: 'Modelo de Quitação Formal Conforme o Artigo 320',
        content: '<p>O Artigo 320 complementa que a quitação deve conter o valor, a espécie da dívida quitada, o nome do devedor, a data, o lugar do pagamento e a assinatura. Veja o modelo:</p><div class="bg-gray-100 p-5 rounded-xl border border-gray-300 font-mono text-xs sm:text-sm text-gray-800 my-4 leading-relaxed">DECLARAÇÃO DE QUITAÇÃO REGULAR (ART. 319 DO CÓDIGO CIVIL)<br><br>Declaro para os devidos fins de direito que recebi de JOÃO DA COSTA, CPF nº 000.111.222-33, o valor integral de R$ 900,00 (novecentos reais), em moeda corrente, correspondente à quitação integral do conserto residencial executado nesta data. Dou plena, rasa e irrevogável quitação.<br><br>Belo Horizonte - MG, 10 de maio de 2026.<br><br>Assinatura do Recebedor: __________________________________<br>Nome: ROBERTO ALMEIDA - CPF: 444.555.666-77</div>',
        hasCta: {
          text: "Garanta a quitação regular prevista em lei sem burocracia:",
          link: "/recibo-simples",
          ctaLabel: "GERAR QUITAÇÃO NO RECIBO SIMPLES"
        }
      }
    ],
    conclusion: 'A quitação é a única certidão de nascimento da extinção de uma dívida. Nunca pague sem exigir o documento correspondente e nunca receba valores sem entregá-lo assinado ao pagador.',
    faqs: [
      {
        question: 'Posso me recusar a pagar se não me derem o recibo na hora?',
        answer: 'Sim. O Artigo 319 do Código Civil expressamente autoriza a retenção do pagamento enquanto a quitação regular não for fornecida.'
      },
      {
        question: 'Recibo feito à mão em papel de pão tem validade?',
        answer: 'Sim, se tiver os dados das partes, valor, motivo, data e assinatura. No entanto, o recibo em PDF digital transmite maior credibilidade e evita rasuras ou perdas.'
      }
    ]
  },

  // 3
  {
    slug: 'recibo-de-quitacao-total-e-irrevogavel-modelo',
    title: 'Recibo de Quitação Total e Irrevogável: Modelo e Como Escrever',
    category: 'burocracia-descomplicada',
    seoTitle: 'Recibo de Quitação Total e Irrevogável: Modelo Pronto e Válido',
    seoDescription: 'Aprenda como fazer um recibo de quitação total e irrevogável. Veja o texto exato para se blindar contra cobranças indevidas futuras e baixe grátis.',
    intro: {
      acordo: 'Pagar um acordo, uma rescisão ou a compra de um bem e depois ser cobrado novamente é um dos maiores pesadelos financeiros.',
      promessa: 'Com as palavras certas no recibo de quitação plena, geral e irrevogável, você extingue qualquer obrigação financeira de forma definitiva.',
      previa: 'Veja a diferença entre quitação parcial e total, as cláusulas de segurança indispensáveis e o modelo pronto para copiar ou emitir em PDF.'
    },
    sections: [
      {
        h2: 'O que significa dar quitação "plena, geral e irrevogável"?',
        content: '<p>No Direito Civil brasileiro, a expressão <strong>"plena, geral, rasa e irrevogável quitação"</strong> tem um peso colossal. Ela indica que o credor declara ter recebido tudo o que lhe era devido, renunciando expressamente ao direito de cobrar qualquer diferença futura, juros, correções ou pendências relacionadas àquela obrigação.</p><div class="my-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200"><p class="text-emerald-900 font-semibold mb-2">🔒 Blinde seus acordos com um recibo simples de quitação:</p><p class="text-sm text-emerald-800 mb-3">Gere seu comprovante com validade jurídica instantânea no nosso gerador gratuito sem marcas d\'água.</p><a href="/recibo-simples" class="inline-flex items-center px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg text-sm hover:bg-emerald-700 transition">Gerar Recibo de Quitação Agora →</a></div><p>Se você pagou uma dívida renegociada, um veículo usado ou um acerto de serviços avulsos, é esse tipo de recibo que você deve exigir para não correr o risco de ter o nome negativado no Serasa ou SPC meses depois.</p>',
        hasAd: true
      },
      {
        h2: 'Quando usar a quitação total e quando usar a quitação parcial?',
        content: '<p>É fundamental não confundir as duas modalidades:</p><ul class="list-disc pl-5 my-4 space-y-2"><li><strong>Quitação Parcial:</strong> Usada em pagamentos parcelados ou entrada. O recibo deve declarar expressamente: <em>"recebi a quantia de R$ X referente à parcela 2 de 5, restando o saldo devedor de R$ Y"</em>.</li><li><strong>Quitação Total:</strong> Usada na última parcela ou no pagamento à vista integral, encerrando o contrato em definitivo.</li></ul><p>No nosso <a href="/recibo-simples" class="text-emerald-700 font-semibold hover:underline">gerador de recibo simples</a>, você pode preencher o campo "referente a" especificando se o valor quita uma parcela avulsa ou se confere quitação total.</p>'
      },
      {
        h2: 'Texto Modelo do Recibo de Quitação Plena',
        content: '<p>Copie e use a fórmula textual consagrada na jurisprudência brasileira:</p><div class="bg-gray-100 p-5 rounded-xl border border-gray-300 font-mono text-xs sm:text-sm text-gray-800 my-4 leading-relaxed">RECIBO DE QUITAÇÃO PLENA E IRREVOGÁVEL<br><br>VALOR: R$ 3.500,00 (três mil e quinhentos reais)<br><br>Recebi de FERNANDO AUGUSTO LIMA, CPF nº 222.333.444-55, a importância supra de R$ 3.500,00, paga via PIX nesta data, referente à liquidação final e integral do contrato verbal de reforma e pintura residencial. Pelo presente documento, dou plena, geral, rasa e irrevogável quitação de todas as obrigações principais e acessórias decorrentes do negócio, nada mais tendo a reclamar em juízo ou fora dele a qualquer título e em qualquer tempo.<br><br>Curitiba - PR, 22 de junho de 2026.<br><br>Recebedor: ____________________________________________<br>Nome: GUSTAVO HENRIQUE BORGES - CPF: 777.888.999-00</div>',
        hasCta: {
          text: "Economize tempo e gere o PDF pronto para assinar na hora:",
          link: "/recibo-simples",
          ctaLabel: "GERAR EM PDF NO RECIBO SIMPLES"
        }
      }
    ],
    conclusion: 'Um recibo bem redigido com cláusula de quitação irrevogável encerra discussões e dá paz de espírito para ambas as partes. Guarde sempre uma cópia física assinada ou o arquivo digital em PDF.',
    faqs: [
      {
        question: 'O recibo de quitação irrevogável pode ser anulado depois?',
        answer: 'Apenas em casos graves comprovados na Justiça de vício de consentimento (como coação física, fraude comprovada ou simulação). Fora isso, é documento com força vinculante.'
      },
      {
        question: 'Precisa de testemunhas no recibo de quitação?',
        answer: 'Não é obrigatório para recibos simples, mas a assinatura de duas testemunhas confere força de título executivo extrajudicial (Artigo 784 do Código de Processo Civil).'
      }
    ]
  },

  // 4
  {
    slug: 'recibo-pagamento-em-dinheiro-vivo-especie',
    title: 'Pagamento em Dinheiro Vivo: Por que o Recibo é a Única Segurança?',
    category: 'financas-pessoais',
    seoTitle: 'Pagamento em Dinheiro Vivo: Por que o Recibo Simples é Essencial',
    seoDescription: 'Pagou ou recebeu em dinheiro físico? Entenda por que sem recibo não há prova de pagamento e aprenda a formalizar qualquer transação na hora.',
    intro: {
      acordo: 'Com a popularidade do Pix, muitas transações ainda continuam sendo realizadas em cédulas de papel (dinheiro em espécie).',
      promessa: 'Neste artigo, você verá os riscos astronômicos de pagar ou receber em dinheiro vivo sem um recibo assinado na mesma hora.',
      previa: 'Entenda como a Justiça julga disputas de pagamentos em espécie e veja o passo a passo para gerar o comprovante antes de entregar as notas.'
    },
    sections: [
      {
        h2: 'Por que pagar em dinheiro vivo sem recibo é quase um tiro no escuro?',
        content: '<p>Diferente de um Pix, TED ou cartão onde o extrato bancário registra o fluxo financeiro entre duas contas identificadas, o <strong>dinheiro em espécie não tem rastro</strong>. Uma vez que as cédulas mudam de mão, é a sua palavra contra a da outra parte.</p><div class="my-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200"><p class="text-emerald-900 font-semibold mb-2">💵 Vai receber ou pagar em cédulas?</p><p class="text-sm text-emerald-800 mb-3">Abra o gerador no smartphone e gere o recibo de dinheiro físico em segundos para assinatura imediata.</p><a href="/recibo-simples" class="inline-flex items-center px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg text-sm hover:bg-emerald-700 transition">Gerar Recibo Simples em PDF →</a></div><p>No Judiciário brasileiro, vigora a regra milenar consolidada no <strong>artigo 320 do Código Civil</strong>: <em>quem paga mal, paga duas vezes</em>. Se você pagar R$ 2.000 em dinheiro para um profissional e não exigir o recibo na hora, ele pode alegar que nunca recebeu e a lei exigirá de você a prova cabal da quitação.</p>',
        hasAd: true
      },
      {
        h2: 'Os 3 cuidados essenciais no pagamento em espécie',
        content: '<p>Ao realizar pagamentos em dinheiro físico, siga religiosamente estas 3 etapas:</p><ol class="list-decimal pl-5 my-4 space-y-2"><li><strong>Conte o dinheiro na presença de quem vai receber:</strong> Ambas as partes devem conferir nota por nota antes de fechar o envelope.</li><li><strong>Colha a assinatura no exato instante da entrega:</strong> Nunca entregue o dinheiro com a promessa de que a pessoa "assina depois" ou "manda o recibo amanhã".</li><li><strong>Especifique no recibo a expressão "em moeda corrente nacional":</strong> Isso comprova a liquidação em dinheiro vivo, afastando dúvidas sobre cheques ou depósitos bancários.</li></ol><p>Com nosso <a href="/recibo-simples" class="text-emerald-700 font-semibold hover:underline">modelo de recibo de pagamento simples</a>, você preenche em 1 minuto direto pelo navegador do celular.</p>'
      },
      {
        h2: 'Exemplo de Recibo Simples para Dinheiro em Espécie',
        content: '<div class="bg-gray-100 p-5 rounded-xl border border-gray-300 font-mono text-xs sm:text-sm text-gray-800 my-4 leading-relaxed">COMPROVANTE DE PAGAMENTO EM MOEDA CORRENTE<br><br>Recebi de PATRÍCIA MENEZES, CPF nº 333.444.555-66, a quantia de R$ 650,00 (seiscentos e cinquenta reais) em moeda corrente nacional (dinheiro em espécie), referente ao pagamento integral da diária de faxina e higienização residencial realizada no imóvel da Rua das Flores, 120.<br><br>Por ser verdade, firmo o presente dando plena quitação.<br><br>Campinas - SP, 14 de julho de 2026.<br><br>Assinatura: ____________________________________________<br>Recebedora: CLÁUDIA DOS SANTOS - CPF: 111.222.333-44</div>',
        hasCta: {
          text: "Proteja seu patrimônio com recibos gerados em alta definição:",
          link: "/recibo-simples",
          ctaLabel: "CRIAR RECIBO EM DINHEIRO AGORA"
        }
      }
    ],
    conclusion: 'O dinheiro de papel continua sendo amplamente aceito no Brasil, mas exige zelo redobrado. Uma folha de recibo assinada custa centavos de impressão e evita processos de milhares de reais.',
    faqs: [
      {
        question: 'Testemunha que viu a entrega do dinheiro substitui o recibo?',
        answer: 'A prova testemunhal ajuda em juízo, mas é muito mais frágil e sujeita a contestações. O recibo escrito e assinado é a prova rainha do pagamento perante o Código Civil.'
      },
      {
        question: 'Posso fotografar a pessoa com o dinheiro recebido?',
        answer: 'Fotos e vídeos ajudam a comprovar a transação, mas o documento formal de quitação assinado continua sendo a forma jurídica correta e padrão.'
      }
    ]
  },

  // 5
  {
    slug: 'recibo-no-nome-de-outra-pessoa-cuidados-legais',
    title: 'Emitir Recibo no Nome de Outra Pessoa Dá Problema? O Que Diz a Lei',
    category: 'burocracia-descomplicada',
    seoTitle: 'Recibo no Nome de Outra Pessoa Dá Problema? Cuidados e Lei',
    seoDescription: 'Descubra se é permitido emitir recibo no nome do cônjuge, parente ou terceiro. Entenda o risco de crime tributário e falsidade ideológica.',
    intro: {
      acordo: 'É comum no dia a dia um cliente pedir: "Pode colocar o recibo no nome da minha mãe ou da empresa do meu irmão para eu pegar reembolso?".',
      promessa: 'Neste artigo, você entenderá onde termina a gentileza comercial e onde começa o risco de crime fiscal e falsidade ideológica.',
      previa: 'Analisaremos as hipóteses legais de representação, procuração e o modo seguro de registrar pagamentos feitos por terceiros.'
    },
    sections: [
      {
        h2: 'O perigo da Falsidade Ideológica (Artigo 299 do Código Penal)',
        content: '<p>Emitir um recibo com o nome ou CPF de uma pessoa que não participou da relação jurídica ou que não realizou o serviço pode configurar o crime de <strong>falsidade ideológica (art. 299 do Código Penal)</strong> ou sonegação fiscal (Lei 8.137/1990).</p><div class="my-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200"><p class="text-emerald-900 font-semibold mb-2">⚖️ Emita sempre com os dados corretos e seguros:</p><p class="text-sm text-emerald-800 mb-3">Nosso gerador de recibo simples permite incluir pagador, recebedor e observações legais com facilidade.</p><a href="/recibo-simples" class="inline-flex items-center px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg text-sm hover:bg-emerald-700 transition">Preencher Recibo Correto Online →</a></div><p>O recibo tem a função de retratar a verdade fática de quem pagou e quem recebeu. Se João prestou o serviço, o recibo não pode sair assinado por Maria sem que exista um contrato formal de representação ou subcontratação.</p>',
        hasAd: true
      },
      {
        h2: 'Como resolver legalmente quando um terceiro paga a conta?',
        content: '<p>O Código Civil Brasileiro, em seus artigos 304 e 305, prevê a figura do <strong>"terceiro interessado" e "terceiro não interessado"</strong> que quita a dívida de outrem. Para que o recibo seja 100% legal nessa situação, basta colocar no corpo do texto:</p><div class="bg-gray-100 p-4 rounded-xl border border-gray-300 font-mono text-xs sm:text-sm text-gray-800 my-4">"Recebi de PEDRO SANTOS (CPF: 111...), por conta e ordem do beneficiário LUCAS SANTOS (CPF: 222...), a quantia de R$ 500,00 referente à..."</div><p>Dessa forma, o recibo identifica transparentemente quem desembolsou os fundos e quem foi o beneficiário do serviço, garantindo conformidade perante a contabilidade e a Receita Federal.</p><p>No <a href="/recibo-simples" class="text-emerald-700 font-semibold hover:underline">recibo simples preenchido</a> do nosso site, você pode inserir essa discriminação diretamente no campo de descrição.</p>'
      }
    ],
    conclusion: 'Nunca falseie dados cadastrais em recibos. A melhor prática é sempre declarar a verdade com clareza documental: quem pagou, a mando de quem, e quem prestou o serviço.',
    faqs: [
      {
        question: 'Empresa pode pagar serviço prestado ao sócio?',
        answer: 'Sim, mas a empresa deve registrar isso contabilmente como antecipação de lucros ou despesa própria justificada. O recibo deve discriminar o serviço real.'
      },
      {
        question: 'Marido pode assinar recibo pela esposa?',
        answer: 'Somente se tiver procuração com poderes específicos para dar quitação em nome dela.'
      }
    ]
  },

  // 6
  {
    slug: 'recibo-simples-pedreiro-reformas-modelo',
    title: 'Recibo Simples de Pedreiro e Reformas: Modelo e Como Fazer',
    category: 'prestacao-de-servicos',
    seoTitle: 'Recibo Simples de Pedreiro e Obras: Modelo em PDF Grátis',
    seoDescription: 'Aprenda como emitir recibo simples de pedreiro, reformas e diárias de construção civil. Baixe modelo pronto ou gere em PDF no celular grátis.',
    intro: {
      acordo: 'Contratar pedreiro ou trabalhar na construção civil sem recibos claros por etapa é a receita certa para desentendimentos no final da obra.',
      promessa: 'Neste guia, você verá como formalizar pagamentos de diárias, empreitadas e etapas concluídas com total respaldo do Código Civil.',
      previa: 'Confira os dados obrigatórios para evitar processos trabalhistas ou alegações de abandono de obra e use o modelo pronto.'
    },
    sections: [
      {
        h2: 'Por que emitir recibo a cada etapa da obra é indispensável?',
        content: '<p>Na construção civil, desentendimentos sobre o que já foi pago e o que ainda falta fazer são extremamente comuns. O recibo por etapa comprova que o pedreiro entregou a fase combinada (ex: fundação, alvenaria, reboco ou piso) e recebeu a remuneração devida.</p><div class="my-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200"><p class="text-emerald-900 font-semibold mb-2">🧱 Precisa fazer o recibo do pedreiro agora?</p><p class="text-sm text-emerald-800 mb-3">Preencha no celular em segundos, baixe em PDF e envie no WhatsApp do pedreiro ou do cliente.</p><a href="/recibo-simples" class="inline-flex items-center px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg text-sm hover:bg-emerald-700 transition">Gerar Recibo de Obra em PDF →</a></div><p>Além de proteger o contratante contra cobranças em duplicidade, o documento resguarda o profissional comprovando sua remuneração e idoneidade profissional nos termos do <strong>Artigo 320 do Código Civil</strong>.</p>',
        hasAd: true
      },
      {
        h2: 'O que colocar no campo "Referente a" na construção civil?',
        content: '<p>A maior falha é escrever apenas "serviço de pedreiro". O correto é especificar detalhadamente a etapa e o endereço:</p><ul class="list-disc pl-5 my-4 space-y-2"><li><em>"Pagamento referente à conclusão da alvenaria do 2º pavimento do imóvel situado na Rua X, nº Y."</em></li><li><em>"Adiantamento referente à colocação de 80m² de porcelanato na sala e cozinha."</em></li><li><em>"Quitação de 5 diárias de reforma hidráulica e elétrica executadas de 01 a 05 de junho."</em></li></ul><p>Você pode emitir esse comprovante em folha A4 no <a href="/recibo-simples" class="text-emerald-700 font-semibold hover:underline">gerador de recibo simples</a> em menos de 1 minuto.</p>'
      },
      {
        h2: 'Modelo de Recibo Simples de Obra Residencial',
        content: '<div class="bg-gray-100 p-5 rounded-xl border border-gray-300 font-mono text-xs sm:text-sm text-gray-800 my-4 leading-relaxed">RECIBO DE PRESTAÇÃO DE SERVIÇOS DE PEDREIRO<br><br>VALOR: R$ 1.200,00 (um mil e duzentos reais)<br><br>Recebi de MARCELO TEIXEIRA, CPF nº 555.666.777-88, a quantia supra de R$ 1.200,00, via transferência PIX nesta data, referente ao pagamento da 2ª etapa de assentamento de tijolos e reboco da varanda residencial na Rua dos Pinheiros, 45, Bairro Jardim, nesta cidade. Dou plena e geral quitação referente a esta etapa.<br><br>Goiânia - GO, 18 de agosto de 2026.<br><br>Assinatura do Profissional: __________________________________<br>Nome: JOSÉ FRANCISCO MENDES (Pedreiro) - CPF: 333.222.111-00</div>',
        hasCta: {
          text: "Formalize sua obra com recibos limpos e sem dor de cabeça:",
          link: "/recibo-simples",
          ctaLabel: "GERAR RECIBO DE PEDREIRO EM PDF"
        }
      }
    ],
    conclusion: 'Quem constrói ou reforma com recibos datados e assinados dorme tranquilo. Mantenha uma pasta digital ou impressa com todos os recibos da sua obra para fins de valorização imobiliária e segurança fiscal.',
    faqs: [
      {
        question: 'O recibo de pedreiro gera vínculo empregatício de carteira assinada?',
        answer: 'Não, desde que o profissional atue com autonomia, sem habitualidade diária contínua e sem subordinação direta característica da CLT. Para reformas pontuais, o recibo simples de autônomo é legal e suficiente.'
      },
      {
        question: 'Posso deduzir o recibo de pedreiro no ganho de capital do imóvel?',
        answer: 'Sim! Guardar recibos detalhados com CPF de pedreiros e notas fiscais de materiais permite incorporar esses custos ao valor do imóvel na declaração do IRPF, reduzindo imposto sobre ganho de capital em futura venda.'
      }
    ]
  },

  // 7
  {
    slug: 'recibo-de-frete-e-carreto-simples-como-fazer',
    title: 'Recibo Simples para Frete e Carretos: Como Fazer e Modelo',
    category: 'autonomos',
    seoTitle: 'Recibo Simples de Frete e Carreto: Modelo em PDF Grátis',
    seoDescription: 'Aprenda a fazer recibo de frete, carretos e pequenas mudanças. Veja modelo pronto com origem, destino e valor para imprimir ou enviar no WhatsApp.',
    intro: {
      acordo: 'Fazer transporte de cargas, mudanças e carretos exige comprovação imediata de entrega e quitação do frete combinado.',
      promessa: 'Neste artigo, você aprenderá a estruturar um recibo simples de frete profissional que protege motorista e contratante contra extravios e cobranças.',
      previa: 'Veja os dados do veículo, rota de origem e destino e como gerar o comprovante em PDF na hora direto pelo celular.'
    },
    sections: [
      {
        h2: 'Por que o motorista autônomo de frete deve emitir recibo?',
        content: '<p>Para quem trabalha com carreto e frete, o recibo simples assinado pelo cliente é a prova máxima de que a carga foi entregue no endereço de destino acordado e que o valor do serviço foi liquidado sem avarias.</p><div class="my-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200"><p class="text-emerald-900 font-semibold mb-2">🚚 Terminou o frete? Emita o recibo em 30 segundos:</p><p class="text-sm text-emerald-800 mb-3">Preencha placa do veículo, trajeto e valor. Baixe o PDF na hora ou envie direto no WhatsApp do cliente.</p><a href="/recibo-simples" class="inline-flex items-center px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg text-sm hover:bg-emerald-700 transition">Gerar Recibo de Frete em PDF →</a></div><p>Além disso, muitas empresas que contratam carretos autônomos exigem o recibo com CPF do motorista para prestar contas ao setor financeiro e contábil.</p>',
        hasAd: true
      },
      {
        h2: 'O que não pode faltar no recibo de carreto e transporte?',
        content: '<p>Para conferir total segurança jurídica com base no <strong>Artigo 320 do Código Civil</strong>, insira:</p><ul class="list-disc pl-5 my-4 space-y-2"><li>Endereço de partida (origem) e endereço de entrega (destino).</li><li>Breve descrição da carga transportada (ex: móveis residenciais, materiais de escritório).</li><li>Placa do veículo utilitário ou caminhão.</li><li>Valor do frete pago em moeda corrente ou Pix.</li></ul><p>Utilize o nosso <a href="/recibo-simples" class="text-emerald-700 font-semibold hover:underline">recibo simples oficial</a> para formatar tudo automaticamente.</p>'
      },
      {
        h2: 'Modelo de Recibo de Frete e Pequena Mudança',
        content: '<div class="bg-gray-100 p-5 rounded-xl border border-gray-300 font-mono text-xs sm:text-sm text-gray-800 my-4 leading-relaxed">RECIBO DE FRETE E TRANSPORTE DE CARGA<br><br>VALOR: R$ 380,00 (trezentos e oitenta reais)<br><br>Recebi de RENATA ALMEIDA, CPF nº 444.333.222-11, o valor de R$ 380,00, quitado via Pix, referente ao serviço de transporte e carreto de eletrodomésticos e caixas, realizado no veículo utilitário placa ABC-1D23, partindo de Porto Alegre - RS com destino a Canoas - RS, com entrega concluída em perfeito estado.<br><br>Canoas - RS, 05 de setembro de 2026.<br><br>Motorista: ____________________________________________<br>Nome: SÉRGIO ANTÔNIO LOPES - CPF: 888.777.666-55</div>',
        hasCta: {
          text: "Envie comprovantes profissionais para seus clientes de transporte:",
          link: "/recibo-simples",
          ctaLabel: "CRIAR RECIBO DE FRETE EM PDF"
        }
      }
    ],
    conclusion: 'Formalizar o frete com recibo evita questionamentos posteriores sobre entrega e atrasos. Tenha sempre o atalho do gerador no seu navegador para emitir na cabine do veículo.',
    faqs: [
      {
        question: 'Freteiro autônomo pessoa física pode emitir recibo simples?',
        answer: 'Sim! O motorista autônomo sem CNPJ tem total respaldo da legislação civil para emitir recibo simples com seu CPF, dando quitação de transporte avulso.'
      },
      {
        question: 'Precisa discriminar o ajudante de carga no recibo?',
        answer: 'Se o valor combinado já inclui ajudante, é recomendável citar "serviço de transporte com ajudante incluso" para clareza da contratação.'
      }
    ]
  },

  // 8
  {
    slug: 'recibo-de-sinal-compra-e-venda-itens-usados',
    title: 'Recibo de Sinal de Pagamento: Como Proteger Negócios Usados',
    category: 'financas-pessoais',
    seoTitle: 'Recibo de Sinal (Entrada): Modelo Pronto e Válido no Código Civil',
    seoDescription: 'Aprenda como fazer um recibo de sinal (arras) na compra e venda de carros, motos e itens usados. Entenda o que acontece em caso de desistência.',
    intro: {
      acordo: 'Negociar veículos, eletrônicos ou itens usados na internet quase sempre envolve o pagamento de um sinal para "segurar o negócio".',
      promessa: 'Neste artigo, você entenderá o poder das arras penitenciais e confirmatórias e como o recibo simples protege quem compra e quem vende.',
      previa: 'Descubra o que a lei determina caso o comprador desista ou o vendedor venda para outro, com modelo pronto para emitir.'
    },
    sections: [
      {
        h2: 'O que são arras ou sinal perante o Código Civil?',
        content: '<p>No ordenamento jurídico brasileiro (<strong>artigos 417 a 420 do Código Civil</strong>), o sinal dado em um negócio tem efeito vinculante:</p><ul class="list-disc pl-5 my-4 space-y-2"><li><strong>Se o comprador desistir:</strong> Ele perde o valor do sinal em favor do vendedor.</li><li><strong>Se o vendedor desistir:</strong> Ele deve devolver o sinal em dobro (o valor recebido mais o equivalente).</li></ul><div class="my-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200"><p class="text-emerald-900 font-semibold mb-2">🤝 Fechou negócio e vai pagar entrada?</p><p class="text-sm text-emerald-800 mb-3">Não transfira nenhum sinal sem o recibo assinado detalhando o bem e a data limite para liquidação.</p><a href="/recibo-simples" class="inline-flex items-center px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg text-sm hover:bg-emerald-700 transition">Gerar Recibo de Sinal em PDF →</a></div>',
        hasAd: true
      },
      {
        h2: 'O que deve constar no recibo de sinal de compra e venda?',
        content: '<p>Para evitar discussões na Justiça, o recibo deve discriminar:</p><ol class="list-decimal pl-5 my-4 space-y-2"><li>Descrição exata do bem (marca, modelo, chassi ou número de série).</li><li>Valor total da negociação e valor pago como sinal.</li><li>Data limite improrrogável para pagamento do saldo restante.</li><li>Cláusula de perda ou devolução em dobro do sinal conforme o art. 418 do Código Civil.</li></ol><p>Você pode redigir isso rapidamente em nosso <a href="/recibo-simples" class="text-emerald-700 font-semibold hover:underline">modelo de recibo simples</a>.</p>'
      },
      {
        h2: 'Exemplo de Recibo Simples de Sinal (Arras)',
        content: '<div class="bg-gray-100 p-5 rounded-xl border border-gray-300 font-mono text-xs sm:text-sm text-gray-800 my-4 leading-relaxed">RECIBO DE SINAL E PRINCÍPIO DE PAGAMENTO (ARRAS)<br><br>VALOR DO SINAL: R$ 2.000,00 (dois mil reais)<br>VALOR TOTAL DO BEM: R$ 25.000,00 (vinte e cinco mil reais)<br><br>Recebi de TIAGO MARTINS, CPF nº 666.777.888-99, a quantia de R$ 2.000,00 a título de sinal e princípio de pagamento (arras) pela compra do veículo Honda Civic 2014, placa XYZ-9A88. O saldo restante de R$ 23.000,00 deverá ser quitado impreterivelmente até o dia 30/10/2026, data em que será assinado o documento de transferência no Detran. Em caso de desistência do comprador, perderá o sinal; em caso de desistência do vendedor, o sinal será restituído em dobro, nos termos dos arts. 418 a 420 do Código Civil.<br><br>Salvador - BA, 15 de outubro de 2026.<br><br>Vendedor: ____________________________________________<br>Nome: CLAUDIO MOREIRA - CPF: 111.999.888-77</div>',
        hasCta: {
          text: "Blinde sua compra e venda com recibo de sinal formalizado:",
          link: "/recibo-simples",
          ctaLabel: "CRIAR RECIBO DE ENTRADA AGORA"
        }
      }
    ],
    conclusion: 'Nunca envie dinheiro de entrada baseado em conversas informais de WhatsApp. Um recibo simples de sinal com cláusula de arras confere certeza e segurança patrimonial a ambos os lados.',
    faqs: [
      {
        question: 'Print de conversa no WhatsApp vale como recibo de sinal?',
        answer: 'Serve como indício de prova, mas o recibo assinado formalizando as arras com base no Código Civil é infinitamente superior e tem eficácia jurídica incontestável.'
      },
      {
        question: 'O sinal pode ser pago via Pix?',
        answer: 'Sim, o Pix é o meio mais comum. O recibo deve citar que o valor foi pago via Pix na data especificada.'
      }
    ]
  },

  // 9
  {
    slug: 'recibo-de-aula-particular-reforco-escolar',
    title: 'Recibo de Aula Particular e Reforço Escolar: Modelo Pronto',
    category: 'autonomos',
    seoTitle: 'Recibo de Aula Particular e Reforço Escolar: Modelo em PDF Grátis',
    seoDescription: 'Como fazer recibo de aulas particulares, reforço escolar, idiomas e música. Modelo simples com valor, horas e quitação para pais e alunos.',
    intro: {
      acordo: 'Professores particulares, instrutores de idiomas e educadores lidam mensalmente com a cobrança de alunos e pais que precisam de comprovantes.',
      promessa: 'Neste artigo, você verá como formalizar pacotes de horas e mensalidades de aulas particulares com agilidade e total profissionalismo.',
      previa: 'Apresentamos os campos indispensáveis para emissão, organização de fluxo de caixa e o modelo pronto para gerar em PDF.'
    },
    sections: [
      {
        h2: 'Por que o professor particular deve emitir recibo simples?',
        content: '<p>A emissão de recibo para aulas particulares transmite credibilidade imediata aos pais e responsáveis, além de servir como suporte para o controle financeiro do educador e para o preenchimento do Carnê-Leão no Imposto de Renda.</p><div class="my-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200"><p class="text-emerald-900 font-semibold mb-2">🎓 Professor, emita recibos elegantes em 30 segundos:</p><p class="text-sm text-emerald-800 mb-3">Preencha o nome do aluno, disciplina e valor. Gere em PDF para impressão ou envie direto no WhatsApp da família.</p><a href="/recibo-simples" class="inline-flex items-center px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg text-sm hover:bg-emerald-700 transition">Gerar Recibo de Aulas Particulares →</a></div><p>Comprovantes formais eliminam dúvidas sobre quantas aulas já foram ministradas e quais mensalidades foram quitadas nos termos do <strong>Artigo 320 do Código Civil</strong>.</p>',
        hasAd: true
      },
      {
        h2: 'O que colocar na descrição da aula particular?',
        content: '<p>Recomenda-se especificar a matéria, a quantidade de horas ou o mês letivo de referência:</p><ul class="list-disc pl-5 my-4 space-y-2"><li><em>"Pagamento referente a 8 horas de aulas particulares de Matemática e Física para o aluno Pedro Souza, no mês de abril."</em></li><li><em>"Mensalidade do curso de Inglês Instrumental referente ao mês de maio de 2026."</em></li><li><em>"Pacote preparatório intensivo de Redação para o ENEM (10 encontros semanais)."</em></li></ul><p>Você pode emitir com layout perfeito no <a href="/recibo-simples" class="text-emerald-700 font-semibold hover:underline">recibo simples em PDF</a> do nosso portal.</p>'
      },
      {
        h2: 'Modelo de Recibo de Aula Particular',
        content: '<div class="bg-gray-100 p-5 rounded-xl border border-gray-300 font-mono text-xs sm:text-sm text-gray-800 my-4 leading-relaxed">RECIBO DE PRESTAÇÃO DE SERVIÇOS EDUCACIONAIS<br><br>VALOR: R$ 480,00 (quatrocentos e oitenta reais)<br><br>Recebi de LUCIANA FERREIRA, CPF nº 777.666.555-44, a importância de R$ 480,00, paga via Pix nesta data, referente à prestação de serviços de aulas particulares de reforço em Química e Biologia ministradas ao estudante Gabriel Ferreira no mês de maio de 2026 (carga horária: 8 horas/aula). Dou plena quitação.<br><br>Florianópolis - SC, 31 de maio de 2026.<br><br>Professora: ____________________________________________<br>Nome: JULIANA CRISTINA RAMOS - CPF: 000.888.777-66</div>',
        hasCta: {
          text: "Profissionalize suas aulas com recibos limpos e gratuitos:",
          link: "/recibo-simples",
          ctaLabel: "CRIAR RECIBO EDUCACIONAL EM PDF"
        }
      }
    ],
    conclusion: 'A educação exige organização e respeito mútuo. Emitir recibos pontuais valoriza seu trabalho docente e fideliza alunos e famílias por anos.',
    faqs: [
      {
        question: 'Aula particular de reforço escolar é dedutível no IRPF?',
        answer: 'Para quem paga, a legislação do IRPF não permite deduzir reforço escolar e cursos livres na declaração de ajuste anual, mas o recibo é obrigatório para comprovar a transação e justificar os ganhos do professor perante o Fisco.'
      },
      {
        question: 'Professor autônomo pode emitir com CPF?',
        answer: 'Sim! Não é obrigatório ter CNPJ. O professor pessoa física pode emitir recibo simples perfeitamente válido com seu CPF.'
      }
    ]
  },

  // 10
  {
    slug: 'recibo-oficina-mecanica-conserto-veiculos',
    title: 'Recibo para Oficinas Mecânicas: Como Formalizar Consertos',
    category: 'prestacao-de-servicos',
    seoTitle: 'Recibo de Oficina Mecânica e Conserto Automotivo: Modelo em PDF',
    seoDescription: 'Aprenda como emitir recibo de oficina mecânica, funilaria e auto center. Modelo completo com peças, mão de obra e quitação para clientes.',
    intro: {
      acordo: 'Consertar carros e motos exige clareza absoluta sobre o que foi feito na mão de obra e quais peças foram trocadas para evitar litígios pós-reparo.',
      promessa: 'Neste artigo, você aprenderá a elaborar um recibo de oficina mecânica que comprova o pagamento e detalha os serviços com segurança.',
      previa: 'Veja como separar peças de mão de obra e como gerar comprovantes em PDF direto do celular para enviar ao proprietário do veículo.'
    },
    sections: [
      {
        h2: 'A importância de separar mão de obra e peças no recibo mecânico',
        content: '<p>Toda oficina mecânica que zela pela sua reputação deve discriminar no recibo o valor da mão de obra e o valor correspondente a peças e insumos utilizados (óleo, filtros, pastilhas, correias). Isso confere transparência e atende às exigências do Código de Defesa do Consumidor e do Código Civil.</p><div class="my-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200"><p class="text-emerald-900 font-semibold mb-2">🚗 Mecânico, formalize seus consertos na hora:</p><p class="text-sm text-emerald-800 mb-3">Insira modelo do carro, placa e serviços prestados. Baixe o PDF e envie no WhatsApp do cliente antes da entrega da chave.</p><a href="/recibo-simples" class="inline-flex items-center px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg text-sm hover:bg-emerald-700 transition">Gerar Recibo de Oficina em PDF →</a></div>',
        hasAd: true
      },
      {
        h2: 'Dados indispensáveis no recibo mecânico',
        content: '<p>Para que o documento tenha validade jurídica inquestionável nos termos do <strong>Artigo 320 do Código Civil</strong>:</p><ul class="list-disc pl-5 my-4 space-y-2"><li>Identificação do veículo: Marca, modelo, ano e placa.</li><li>Quilometragem (km) no momento da entrega do veículo.</li><li>Discriminação detalhada do reparo executado.</li><li>Valor total e forma de pagamento (Pix, dinheiro, cartão).</li></ul><p>Crie seu documento com visual profissional no <a href="/recibo-simples" class="text-emerald-700 font-semibold hover:underline">recibo simples para serviços mecânicos</a>.</p>'
      },
      {
        h2: 'Modelo de Recibo de Manutenção Automotiva',
        content: '<div class="bg-gray-100 p-5 rounded-xl border border-gray-300 font-mono text-xs sm:text-sm text-gray-800 my-4 leading-relaxed">RECIBO DE MANUTENÇÃO AUTOMOTIVA E REPARO MECÂNICO<br><br>VALOR: R$ 850,00 (oitocentos e cinquenta reais)<br><br>Recebemos de BRUNO HENRIQUE SILVA, CPF nº 333.222.111-99, a quantia de R$ 850,00, paga via Pix nesta data, referente ao conserto e revisão mecânica do veículo Fiat Argo 2021, placa BRA-2E19 (km atual: 45.200), compreendendo: substituição de pastilhas de freio dianteiras, troca de óleo do motor, filtro de óleo e alinhamento/balanceamento. Dou plena quitação dos serviços executados.<br><br>Ribeirão Preto - SP, 20 de outubro de 2026.<br><br>Mecânico Responsável: ___________________________________<br>Nome: AUTO MECÂNICA CENTRAL - CPF/CNPJ: 12.345.678/0001-90</div>',
        hasCta: {
          text: "Entregue o carro com comprovante de pagamento limpo e profissional:",
          link: "/recibo-simples",
          ctaLabel: "GERAR RECIBO MECÂNICO EM PDF"
        }
      }
    ],
    conclusion: 'Oficinas que entregam recibos detalhados transmitem confiança imediata e blindam o estabelecimento contra reclamações indevidas de peças desgastadas previamente.',
    faqs: [
      {
        question: 'O recibo de oficina substitui o certificado de garantia das peças?',
        answer: 'O Código de Defesa do Consumidor garante 90 dias para serviços duráveis. O recibo com data e km serve como certidão da data de início do prazo legal de garantia.'
      },
      {
        question: 'Oficina que é MEI pode emitir recibo simples para cliente pessoa física?',
        answer: 'Sim! De acordo com a Lei Complementar 123/2006, o MEI está dispensado de emitir NF-e para consumidor pessoa física, sendo o recibo simples preenchido perfeitamente legal.'
      }
    ]
  }
];

console.log("Writing articles batch 1 (1-10)...");
fs.writeFileSync('/tmp/articles_batch1.json', JSON.stringify(articlesData, null, 2));
console.log("Done batch 1.");
