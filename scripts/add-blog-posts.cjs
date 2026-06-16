const fs = require('fs');
const fileRegex = /export\s+const\s+blogPosts\s*:\s*BlogPost\[\]\s*=\s*\[/;

const article1 = `
  {
    slug: 'recibo-valido-escrito-mao-ou-pdf',
    title: 'O que tem validade legal: Recibo escrito à mão ou gerado em PDF?',
    category: 'burocracia-descomplicada',
    seoTitle: 'Recibo Válido: Escrito à Mão ou Gerado em PDF? | Entenda a Lei',
    seoDescription: 'Descubra a diferença de validade legal entre recibos à mão e gerados em PDF e como proteger suas negociações contra fraudes e adulterações.',
    intro: {
      acordo: 'Uma das dúvidas mais comuns entre prestadores de serviços, autônomos e pessoas físicas ao finalizar uma negociação é sobre a validade do comprovante de pagamento.',
      promessa: 'Afinal, aquele bloco de recibos comprado em papelaria, preenchido à caneta, tem o mesmo peso jurídico que um documento gerado digitalmente em formato PDF?',
      previa: 'A resposta curta é: ambos possuem validade legal, desde que preenchidos corretamente. No entanto, em termos de segurança contra fraudes e facilidade de comprovação jurídica, existe uma diferença abissal entre as duas opções. Abaixo, detalhamos o que diz a lei brasileira e por que o formato digital se tornou o padrão indispensável para quem busca proteger seu dinheiro.'
    },
    sections: [
      {
        h2: 'O que a Lei Brasileira diz sobre a validade dos recibos?',
        content: '<p>A validade de um recibo no Brasil não é determinada pelo material em que ele foi feito (papel ou tela), mas sim pelas informações que ele contém. A base legal para isso está no Artigo 320 do Código Civil, que estabelece os requisitos mínimos para que uma quitação seja considerada válida.</p><p>Segundo a legislação, um recibo tem validade civil e atesta o fim de uma dívida se possuir:</p><ul><li>O valor exato da transação (preferencialmente em números e por extenso).</li><li>A espécie da dívida (a que se refere o pagamento).</li><li>O nome do devedor (quem pagou).</li><li>O tempo e o lugar do pagamento (data e cidade).</li><li>A assinatura do credor (quem recebeu o dinheiro).</li></ul><p>Se um pedaço de pão de prato ou um guardanapo contiver esses cinco elementos com a assinatura verdadeira de quem recebeu, ele é, tecnicamente, um documento com validade legal. Mas, na prática, confiar em formatos amadores é um risco alto.</p>'
      },
      {
        h2: 'Recibo escrito à mão: Vantagens e os perigos ocultos',
        content: '<p>O recibo tradicional, feito à caneta, foi o padrão por décadas. Sua única vantagem real é a disponibilidade imediata caso você não tenha acesso a um computador ou celular no momento do pagamento. Contudo, os riscos jurídicos são altos.</p><h3>O risco das rasuras e adulterações</h3><p>O maior perigo do recibo físico é a facilidade de adulteração. Um número "1" pode facilmente ser transformado em um "7", ou um zero a mais pode ser adicionado no final da quantia por alguém agindo de má-fé. Se o documento for contestado no Juizado Especial Cível (Pequenas Causas), uma perícia grafotécnica pode ser exigida, o que arrasta o processo por anos.</p><h3>Legibilidade e Degradação</h3><p>A caligrafia inelegível é um problema grave. Se um juiz ou um auditor não conseguir ler o CPF de quem pagou ou a descrição exata do serviço, o documento perde sua força de prova. Além disso, a tinta de canetas comuns e o papel de baixa qualidade se degradam rapidamente, dificultando o armazenamento pelo prazo legal recomendado de 5 anos.</p>',
        hasAd: true
      },
      {
        h2: 'Recibo em PDF (Digital): Por que se tornou o padrão oficial?',
        content: '<p>A transição para o recibo digital não ocorreu apenas por conveniência, mas por segurança jurídica. Gerar o comprovante em PDF resolve todas as vulnerabilidades do papel.</p><h3>Rastreabilidade e Imutabilidade</h3><p>Um arquivo em PDF é formatado para leitura e impressão, não para edição livre. Uma vez que os dados são digitados e o documento é fechado, a tentativa de adulteração visual deixa rastros digitais.</p><h3>Padronização Profissional</h3><p>O uso da tecnologia padroniza a formatação. Não há espaço para interpretações erradas de caligrafia. O CPF, os nomes e o valor numeral e por extenso ficam perfeitamente legíveis. Se você perder a via impressa, o arquivo original digital pode ser reimpresso a qualquer momento com exatidão.</p><p><strong>Dica de Segurança:</strong> Para evitar erros de formatação ou esquecer dados exigidos pelo Código Civil, a prática mais segura é utilizar um <a href="/recibo-simples" class="text-emerald-600 font-semibold hover:underline">gerador de recibo simples</a> online. Basta preencher os campos pelo celular ou computador e baixar o PDF blindado e formatado nos padrões da lei, pronto para arquivamento ou envio via WhatsApp.</p>'
      },
      {
        h2: 'Como garantir que seu recibo em PDF seja inquestionável?',
        content: '<p>Para que o seu arquivo em PDF tenha força total em qualquer tribunal ou negociação, siga estas regras de ouro:</p><ul><li><strong>Não abrevie nomes:</strong> Utilize o Nome Completo ou a Razão Social exata.</li><li><strong>Amarre o documento ao cidadão:</strong> Nunca emita um recibo sem o número do CPF ou CNPJ de ambas as partes. É isso que individualiza o documento perante a lei.</li><li><strong>A importância da Assinatura:</strong> O PDF gerado precisa ser validado por quem recebeu o valor. Isso pode ser feito imprimindo o PDF e assinando à caneta, ou utilizando uma assinatura digital (plataformas de assinatura ou certificado digital gov.br).</li></ul>',
        hasCta: {
          text: 'Garanta a validade do seu documento gerando um modelo profissional, digital e seguro.',
          link: '/recibo-simples',
          ctaLabel: 'GERAR RECIBO SIMPLES EM PDF AGORA'
        }
      }
    ],
    conclusion: '<p>A escolha entre um recibo de papel e um PDF não é apenas sobre modernidade, mas sobre minimizar riscos. O recibo digital entrega credibilidade para quem recebe e blindagem jurídica para quem paga. Ao evitar falhas de preenchimento e rasuras, você mantém a tranquilidade e a segurança que o seu dinheiro merece.<br><br>Por Elvis Dias.</p>',
    faqs: [
      { question: 'Posso enviar um recibo em PDF pelo WhatsApp? Ele tem validade?', answer: 'Sim. O envio do PDF pelo WhatsApp é perfeitamente válido como meio de entrega. O que garante a validade do documento não é a forma como foi enviado, mas sim se ele contém todos os dados da transação e a assinatura ou confirmação do credor.' },
      { question: 'O recibo de papelaria precisa ter firma reconhecida em cartório?', answer: 'Não. A lei brasileira não exige firma reconhecida para que um recibo comum tenha validade de quitação. O reconhecimento de firma costuma ser exigido apenas em transações de altíssimo valor (como compra e venda de veículos ou imóveis) por exigência dos órgãos de trânsito (Detran) ou cartórios de registro de imóveis, para atestar a autenticidade inquestionável da assinatura.' },
      { question: 'Se eu gerar o recibo em PDF, preciso imprimir?', answer: 'Você só precisa imprimir se o credor (quem recebe o dinheiro) for assinar fisicamente com uma caneta. Se a assinatura for feita de forma digital (usando certificados ou aplicativos de assinatura), o documento pode nascer, transitar e ser arquivado de forma 100% digital.' },
      { question: 'Errei no preenchimento do recibo à mão. Posso passar corretivo?', answer: 'Jamais. Documentos financeiros com corretivo, rasuras ou rabiscos perdem instantaneamente a validade probatória, pois indicam possível fraude. Em caso de erro em um recibo físico, o documento deve ser destruído e um novo deve ser feito. No caso de geradores online, basta corrigir o dado na tela e gerar um novo PDF antes de assinar.' }
    ]
  },
`;

const article2 = `
  {
    slug: 'recibo-simples-juizado-pequenas-causas',
    title: 'Como usar um recibo simples para se proteger no Juizado de Pequenas Causas',
    category: 'burocracia-descomplicada',
    seoTitle: 'Recibo Simples no Juizado de Pequenas Causas | Guia de Proteção',
    seoDescription: 'Aprenda como o recibo simples atua como seu maior escudo legal no Juizado de Pequenas Causas. Proteja-se de processos por cobranças indevidas.',
    intro: {
      acordo: 'Negociações baseadas apenas na confiança e acordos verbais costumam funcionar perfeitamente — até o momento em que um imprevisto acontece.',
      promessa: 'Quando um serviço não é entregue, ou pior, quando há uma cobrança indevida de um valor que já foi pago, o destino mais comum para a resolução do conflito no Brasil é o Juizado Especial Cível (JEC), popularmente conhecido como Juizado de Pequenas Causas.',
      previa: 'Nesse cenário jurídico, a palavra de uma pessoa contra a da outra tem pouco peso. O que define quem ganha ou perde a causa é a prova documental. É exatamente aqui que um documento acessível e descomplicado como o recibo simples se transforma no seu maior escudo legal. Abaixo, explicamos o peso jurídico desse comprovante, como os juízes avaliam esse documento e como você deve estruturá-lo para que seja aceito sem contestações no tribunal.'
    },
    sections: [
      {
        h2: 'O Peso do Recibo Simples como Prova Documental',
        content: '<p>No direito brasileiro, o princípio básico da quitação financeira é regido pelo Artigo 320 do Código Civil. Ele determina que o devedor que paga tem o direito irrevogável de exigir a quitação (o recibo), e pode, inclusive, reter o pagamento até que o documento seja entregue.</p><p>Quando você entra no Juizado de Pequenas Causas (que julga ações de até 40 salários mínimos), o juiz ou conciliador buscará provas materiais dos fatos narrados. O recibo simples tem a função vital de inverter o ônus da prova.</p><p>Se você apresenta um recibo assinado pelo prestador atestando que o valor foi pago, a presunção de verdade passa a ser sua. Caberá à outra parte a dificílima tarefa de provar que a assinatura é falsa ou que o documento foi forjado.</p><h3>Cenários onde o recibo salva o processo:</h3><ul><li><strong>Cobrança em Duplicidade:</strong> O prestador ou vendedor alega que não recebeu a última parcela e entra com uma ação de cobrança. Apresentar o recibo extingue a ação quase que imediatamente.</li><li><strong>Abandono de Serviço (Empreitada/Reformas):</strong> Você pagou metade do valor de uma obra, e o pedreiro ou marceneiro abandonou o serviço. O recibo detalhado comprova o quanto de dinheiro foi adiantado, embasando o seu pedido de devolução (dano material).</li><li><strong>Quebra de Acordo de Compra e Venda:</strong> Você comprou um bem móvel (como uma geladeira ou um notebook usado), pagou à vista, mas o vendedor se recusa a entregar o produto.</li></ul>'
      },
      {
        h2: 'Como preparar um recibo "à prova de falhas" para o Juiz',
        content: '<p>Muitas pessoas perdem ações no JEC porque apresentam recibos rasurados, ilegíveis ou incompletos — como aqueles blocos de papelaria preenchidos apenas com "recebi o valor X".</p><p>Para que o juiz aceite o documento como prova cabal (prova irrefutável), ele não pode deixar margem para dúvidas. A melhor tática de defesa preventiva é abandonar os papéis preenchidos à mão e utilizar um <a href="/recibo-simples" class="text-emerald-600 font-semibold hover:underline">gerador de recibo simples</a> online para criar um arquivo digital padronizado em PDF.</p><h3>O Checklist do Documento Juridicamente Válido</h3><p>Seja o autor da ação (quem processa) ou o réu (quem se defende), certifique-se de que o documento levado à audiência possua a seguinte estrutura:</p><ul><li><strong>A Qualificação das Partes:</strong> Nome completo e CPF/CNPJ de quem pagou e de quem recebeu. O CPF é o que liga o documento à identidade civil das partes no processo.</li><li><strong>Valor Exato e Sem Rasuras:</strong> O juiz precisa cruzar o valor do recibo com o valor pedido na ação. Valores descritos em formato numérico e por extenso evitam alegações de adulteração.</li><li><strong>O "Coração" do Recibo (Descrição Específica):</strong> O campo de referência deve ser exato. Em vez de "pagamento de serviço", deve constar "pagamento referente à primeira parcela da pintura interna do imóvel na Rua X". É isso que conecta o pagamento ao serviço disputado no tribunal.</li><li><strong>Data, Local e Assinatura:</strong> A data comprova a cronologia dos fatos (quando ocorreu o pagamento em relação à quebra do acordo) e a assinatura do credor finaliza a eficácia do documento.</li></ul>',
        hasAd: true
      },
      {
        h2: 'Como apresentar o recibo no dia da audiência',
        content: '<p>O trâmite no Juizado de Pequenas Causas é desenhado para ser célere (rápido) e desburocratizado. Para apresentar o seu recibo:</p><ul><li><strong>Na Petição Inicial ou Contestação:</strong> Se o processo for virtual (a grande maioria atual do sistema Projudi), o recibo em PDF deve ser anexado diretamente no portal do tribunal no momento em que você abre o processo ou apresenta sua defesa.</li><li><strong>Na Audiência de Conciliação:</strong> Leve sempre vias impressas nítidas de todos os comprovantes. Caso o recibo tenha sido assinado digitalmente, informe o conciliador para que a certificação eletrônica seja validada nos autos.</li><li><strong>Guarda do Documento:</strong> Mesmo após anexar no processo, guarde o arquivo PDF ou o documento físico original por um prazo mínimo de 5 anos, que é o tempo de prescrição da maioria das dívidas cíveis no Brasil.</li></ul>',
        hasCta: {
          text: 'Evite invalidar suas provas na justiça. Produza seu recibo digital irrefutável agora mesmo de forma gratuita.',
          link: '/recibo-simples',
          ctaLabel: 'ACESSAR GERADOR DE RECIBOS SIMPLES'
        }
      }
    ],
    conclusion: '<p>Um recibo não é apenas um papel que você guarda na gaveta — é uma prova antecipada para o dia que as coisas derem errado. Ao se habituar a formalizar pagamentos com Recibos Simples bem elaborados e digitais, você economiza tempo, dinheiro e noites de sono com desgastes jurídicos. Não pague nada sem as devidas garantias provadas e documentadas.<br><br>Por Elvis Dias.</p>',
    faqs: [
      { question: 'Preciso de um advogado no Juizado de Pequenas Causas para apresentar meu recibo?', answer: 'Não necessariamente. Para causas com valor de até 20 salários mínimos, você não é obrigado a ter um advogado. Você mesmo pode comparecer ao fórum (ou atermação online) e apresentar seu recibo junto com seus documentos pessoais para iniciar a ação ou se defender.' },
      { question: 'O juiz aceita recibo em PDF enviado por WhatsApp?', answer: 'Sim. A Justiça brasileira já reconhece documentos digitais e conversas de WhatsApp como meios de prova. Se o recibo foi gerado em PDF, enviado pelo aplicativo e houve o aceite ou a assinatura digital da outra parte, você pode "printar" a conversa e anexar o arquivo PDF original no processo.' },
      { question: 'O que acontece se o recibo não tiver CPF, apenas o primeiro nome da pessoa?', answer: 'A força probatória (peso da prova) do documento cai drasticamente. O juiz pode considerar o recibo insuficiente para provar que a transação ocorreu exatamente com a pessoa processada, exigindo que você apresente provas adicionais, como testemunhas ou extratos bancários de transferência (PIX).' },
      { question: 'O recibo simples tem validade contra empresas (CNPJ)?', answer: 'Sim. Se você pagou uma empresa e ela emitiu um recibo assinado no lugar da Nota Fiscal, esse recibo tem total validade no Juizado de Pequenas Causas para comprovar a relação de consumo e o seu pagamento. A falha em não emitir a Nota Fiscal é um problema tributário da empresa com o Governo, e não invalida o seu direito como consumidor.' }
    ]
  },
`;

const article3 = `
  {
    slug: 'o-que-escrever-na-aba-referente-a-do-recibo',
    title: 'O que escrever na aba "Referente a" do recibo para não ter problemas depois',
    category: 'financas-pessoais',
    seoTitle: 'O Que Escrever no "Referente a" do Recibo Simples | Evite Cobranças',
    seoDescription: 'Aprenda a preencher corretamente o campo "Referente a" do recibo para afastar cobranças indevidas ou em duplicidade, com exemplos práticos.',
    intro: {
      acordo: 'A validade de um recibo vai muito além de ter os números corretos e uma assinatura no rodapé. Quando um comprovante de pagamento acaba em uma mesa de conciliação do Procon ou no Juizado Especial Cível, o campo que os juízes e auditores examinam com mais rigor é um só: a aba "Referente a" (também conhecida como histórico ou descrição).',
      promessa: 'É neste campo que ocorre a chamada "vinculação jurídica". O recibo só quita uma dívida se ele identificar exatamente qual dívida está sendo paga. Uma descrição vaga ou genérica pode transformar o seu comprovante em um pedaço de papel inútil, abrindo brechas para cobranças duplicadas ou disputas judiciais desgastantes.',
      previa: 'Para garantir que o seu documento seja um escudo jurídico impenetrável, detalhamos abaixo a técnica correta de preenchimento desse campo crucial, com exemplos do que nunca fazer e modelos prontos para copiar e adaptar.'
    },
    sections: [
      {
        h2: 'Por que a descrição do pagamento é o campo mais perigoso do recibo?',
        content: '<p>Imagine o seguinte cenário: você contrata um marceneiro para fazer os armários da cozinha e do quarto. O profissional finaliza a cozinha e você realiza o pagamento daquela etapa. Ele assina um recibo físico de papelaria onde está escrito apenas: "Referente a serviços prestados".</p><p>Meses depois, ocorre um desentendimento sobre os móveis do quarto, e o profissional entra na justiça cobrando o valor total do contrato, alegando que a cozinha também não foi paga. Quando você apresenta o recibo escrito "serviços prestados", o juiz questiona: Como posso ter certeza de que este recibo se refere à cozinha e não a um conserto menor feito no ano passado?</p><p>A ambiguidade destrói a força da prova documental. O Código Civil exige clareza. Se o recibo não amarra o dinheiro à obrigação exata, a presunção de quitação fica comprometida.</p>'
      },
      {
        h2: 'O Erro Fatal: Exemplos do que NUNCA escrever',
        content: '<p>Termos genéricos são os maiores vilões dos recibos amadores. Ao emitir ou receber um atestado de pagamento, proíba o uso de frases curtas e sem contexto.</p><p>Evite a todo custo:</p><ul><li>❌ "Referente a serviços." (Que serviços? Feitos quando? Onde?)</li><li>❌ "Pagamento do mês." (Qual mês? Qual ano? De qual obrigação?)</li><li>❌ "Referente à parcela." (Qual número da parcela? De quantas no total?)</li><li>❌ "Acerto de contas." (Qual era a dívida original? Houve juros?)</li><li>❌ "Compra de material." (Que material? Qual a quantidade e a marca?)</li></ul>',
        hasAd: true
      },
      {
        h2: 'Como preencher o "Referente a" com precisão jurídica',
        content: '<p>A regra de ouro para preencher a descrição é responder a quatro perguntas mentais: <strong>O quê? Onde? Quando? Qual a condição?</strong></p><h3>1. Para Prestação de Serviços (Obras, Freelance, Diárias)</h3><p>Seja específico sobre o escopo do trabalho e a etapa do pagamento.</p><ul><li><strong>Correto:</strong> "Pagamento referente à 1ª parcela (de 3) dos serviços de pintura externa realizados no imóvel da Rua das Flores, 123, conforme orçamento aprovado em 10/05/2026."</li><li><strong>Correto:</strong> "Pagamento integral referente ao desenvolvimento de identidade visual (logotipo e manual da marca) entregue na data de hoje."</li></ul><h3>2. Para Compra e Venda de Bens (Veículos, Eletrônicos, Usados)</h3><p>Identifique o bem de forma que seja impossível confundi-lo com outro produto semelhante. Use números de série, marcas ou placas.</p><ul><li><strong>Correto:</strong> "Pagamento integral referente à venda de um notebook marca Dell, modelo Inspiron, número de série XYZ123, em estado de usado."</li><li><strong>Correto:</strong> "Pagamento referente ao sinal (arras) para a compra do veículo Honda Civic, ano 2020, Placa ABC-1234. O saldo remanescente será pago na transferência do recibo (CRV)."</li></ul><h3>3. Para Aluguéis e Hospedagem</h3><p>Sempre especifique o mês de competência, o ano e o endereço exato, para evitar confusão com dívidas de meses anteriores.</p><ul><li><strong>Correto:</strong> "Pagamento referente ao aluguel residencial do mês de Junho de 2026, acrescido de taxa de condomínio, do imóvel localizado na Avenida Brasil, apto 402."</li><li><strong>Correto:</strong> "Pagamento referente a 3 diárias de hospedagem por temporada (período de 12/10 a 15/10) na chácara Recanto Verde."</li></ul>'
      },
      {
        h2: 'A Regra de Ouro: Como a tecnologia evita erros',
        content: '<p>Quando utilizamos recibos de papel comprados em bancas, o campo de descrição costuma ser uma linha curta, forçando a pessoa a resumir a informação e cometer os erros citados acima.</p><p>A forma mais profissional de contornar esse problema e garantir que o texto tenha o tamanho necessário é utilizar um <a href="/recibo-simples" class="text-emerald-600 font-semibold hover:underline">gerador de recibo simples</a> online.</p><p>Ao utilizar uma ferramenta digital padronizada, o layout do documento se ajusta automaticamente ao tamanho do seu texto. Você ganha espaço ilimitado para digitar todos os detalhes do produto, números de série ou etapas do serviço, gerando um documento em PDF robusto, limpo e impossível de ser rasurado por má-fé.</p>',
        hasCta: {
          text: 'Crie seu recibo de formato autoajustável e deixe todas as informações bem nítidas no comprovante.',
          link: '/recibo-simples',
          ctaLabel: 'USAR GERADOR DE RECIBOS SIMPLES AGORA'
        }
      }
    ],
    conclusion: '<p>A clareza na aba "Referente a" pode te livrar de pagar a mesma conta duas vezes. Pela segurança jurídica e tranquilidade pessoal, invista dois ou três minutos a mais gerando relatórios descritivos minuciosos que amarrem qualquer prestação a sua verdadeira quitação.<br><br>Por Elvis Dias.</p>',
    faqs: [
      { question: 'Posso colocar o número do contrato ou orçamento na descrição do recibo?', answer: 'Sim, esta é uma das melhores práticas jurídicas. Escrever "conforme contrato nº 123" ou "referente ao orçamento enviado via WhatsApp no dia X" conecta o recibo diretamente ao documento de origem da negociação, criando uma teia de provas inquestionável.' },
      { question: 'O que acontece se eu errar uma informação na descrição após o recibo ser assinado?', answer: 'Se o erro for detectado após a emissão em PDF e assinatura, o documento original perde parte de sua eficácia se a informação for conflitante. A recomendação legal não é fazer "adendos" manuais ou rasurar o papel, mas sim gerar um novo recibo digital com as informações corrigidas e colher uma nova assinatura, invalidando o anterior.' },
      { question: 'Se eu descrever o produto com detalhes, o recibo passa a valer como Nota Fiscal?', answer: 'Não. A riqueza de detalhes na aba "referente a" fortalece o recibo como prova civil de quitação entre as partes. A Nota Fiscal, contudo, é uma obrigação tributária de controle do Governo. O recibo detalhado afasta cobranças indevidas de clientes ou fornecedores, mas não exime a empresa de emitir a nota oficial exigida pelo Fisco.' },
      { question: 'Existe um limite de caracteres para o campo "Referente a"?', answer: 'Do ponto de vista legal, não há limite. O texto deve ser tão longo quanto for necessário para descrever a transação com exatidão. Por isso, geradores de recibo em PDF são superiores aos blocos físicos, pois adaptam a diagramação do documento independentemente do tamanho do seu texto.' }
    ]
  },
`;

const content = fs.readFileSync('src/data/blogPosts.ts', 'utf8');
const updatedContent = content.replace(fileRegex, "export const blogPosts: BlogPost[] = [\n" + article1 + article2 + article3);
fs.writeFileSync('src/data/blogPosts.ts', updatedContent);
console.log('Successfully added blog posts');
