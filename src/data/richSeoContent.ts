export interface RichSEOContent {
  whatIsText: string;
  whenToUseList: string[];
  faqs: { question: string; answer: string }[];
}

export const richSeoData: Record<string, RichSEOContent> = {
  'pintor': {
    whatIsText: 'O Recibo de Pintor é o documento ideal para formalizar o pagamento por serviços de pintura. Ele é utilizado por pintores autônomos e empreiteiros para atestar que o cliente realizou o pagamento, seja o adiantamento, uma parcela ou a quitação total da obra. Além de garantir segurança para quem contratou o serviço, o documento formaliza o trabalho do profissional, reforçando a confiança e transparência.',
    whenToUseList: [
      'Pintura residencial (casas e apartamentos).',
      'Pintura comercial (lojas, escritórios e galpões).',
      'Serviços de texturização, massa corrida e acabamento.',
      'Recebimento de adiantamentos para compra de tintas e materiais.',
      'Quitação de partes de uma obra ou reforma maior.'
    ],
    faqs: [
      { question: 'O pintor autônomo pode emitir o recibo?', answer: 'Sim. Um pintor autônomo atuando como pessoa física (com CPF) tem o direito e a obrigação de emitir um recibo ao cliente para comprovar que o valor cobrado foi devidamente pago.' },
      { question: 'Este recibo substitui a emissão da Nota Fiscal?', answer: 'Não. Se você for uma empresa formalizada (com exceção de regras específicas do MEI para pessoa física), talvez precise emitir a nota fiscal. Porém, para serviços entre pessoas físicas e profissionais autônomos não formalizados, o recibo é o documento padrão para comprovar o pagamento.' },
      { question: 'Eu preciso informar meu CPF como pintor no recibo?', answer: 'Sim. Para que o recibo tenha validade como comprovante de quitação legal, a identificação do recebedor (nome completo e CPF) é obrigatória.' },
      { question: 'Posso usar PIX e ainda dar o recibo de pintor?', answer: 'Sem dúvida! O PIX comprova a transferência bancária, mas o recibo documenta que aquele valor específico foi referente ao serviço de pintura na parede ou imóvel X, garantindo a quitação do acordo.' },
      { question: 'O cliente me pediu um recibo para usar no imposto de renda, posso emitir?', answer: 'Serviços de pintura não são dedutíveis como despesas médicas ou de instrução no IRPF do pagador, porém podem ser utilizados para compor o custo de aquisição ou benfeitoria do imóvel (se devidamente documentados). Portanto, você deve sim emitir.' }
    ]
  },
  'diarista': {
    whatIsText: 'O Recibo de Diarista é o documento utilizado para atestar o pagamento pela prestação de serviços de limpeza e faxina residencial ou comercial. Ele é utilizado por profissionais de limpeza que atuam de forma eventual (sem vínculo empregatício) para comprovar que a diária realizada naquele dia específico foi devidamente remunerada. Para os contratantes, é a segurança de que o serviço avulso foi pago e evita futuras dores de cabeça com passivos trabalhistas.',
    whenToUseList: [
      'Faxinas residenciais e limpezas pós-obra.',
      'Serviços de limpeza em escritórios, lojas e consultórios.',
      'Pagamento de diárias eventuais (até 2 dias por semana na mesma residência).',
      'Remuneração por passadoria de roupas.',
      'Limpezas em imóveis de aluguel por temporada.'
    ],
    faqs: [
      { question: 'O recibo de diarista evita vínculo empregatício?', answer: 'O recibo por si só não impede o vínculo se a diarista trabalhar mais de 2 dias por semana na mesma residência (o que caracteriza emprego doméstico por lei). No entanto, para trabalhos eventuais, o recibo é a prova valiosa de que o pagamento pelas diárias ocorria sem subordinação e continuidade típica de funcionário.' },
      { question: 'A própria diarista deve preencher o recibo?', answer: 'O recibo pode ser preenchido por qualquer uma das partes, mas deve, obrigatoriamente, ser assinado pela profissional que está recebendo o valor, juntamente com o nome e o CPF dela.' },
      { question: 'Preciso emitir recibo se o pagamento for no PIX?', answer: 'Sim. Embora o PIX ateste a movimentação de uma conta, ele não tem detalhamento jurídico. O recibo especifica que o pagamento se refere à diária do dia exato, o que protege quem contratou e quem executou o trabalho.' },
      { question: 'É necessário mencionar a data do serviço no recibo?', answer: 'Extremamente necessário. A data específica da faxina deve constar no recibo, provando que o serviço foi ocasional e referenciando aquele dia exato.' },
      { question: 'A diarista precisa assinar com firma reconhecida?', answer: 'Não. Para o pagamento de serviços domésticos eventuais, a simples assinatura da diarista correspondente ao seu documento de identidade já possui validade jurídica.' }
    ]
  },
  'pedreiro': {
    whatIsText: 'O Recibo de Pedreiro serve para comprovar formalmente pagamentos em obras, reformas ou pequenos reparos. Ele é emitido por pedreiros, serventes, mestre de obras ou empreiteiros após receberem o valor acordado pelo serviço de alvenaria. Em um cenário de construção civil, onde normalmente os orçamentos mudam e os pagamentos são fatiados por etapa concluída (ou semanalmente), este recibo garante que não haja duplicidade ou cobranças indevidas ao dono da obra.',
    whenToUseList: [
      'Quitação de etapas específicas de uma construção (ex: fundação, laje).',
      'Pagamentos por semana ou diárias em uma obra prolongada.',
      'Serviços de acabamento, como reboco e assentamento de pisos/porcelanato.',
      'Pequenas reformas e reparos de alvenaria gerais.',
      'Adiantamento para compra de cimento, tijolos e outros materiais construtivos.'
    ],
    faqs: [
      { question: 'Por que o pedreiro deve emitir recibo?', answer: 'Porque é a forma transparente de atestar que recebeu sua remuneração, protegendo-se contra qualquer questionamento sobre calote, ao mesmo tempo que o cliente ganha a segurança jurídica da quitação.' },
      { question: 'O pedreiro autônomo sem CNPJ tem validade no recibo?', answer: 'Totalmente. Um profissional autônomo usando seu número de CPF tem respaldo legal pleno para assinar um recibo de pagamento válido, que comprova a entrega financeira pela mão de obra.' },
      { question: 'Se o cliente comprar o material e me repassar o dinheiro, devo colocar no recibo?', answer: 'Se o dinheiro referente a compra de materiais passar pela sua mão para você comprar, é indicado fazer um recibo apenas como "reembolso ou repasse para compra de material", anexando a nota gasta. O recibo de prestação de serviços deve ser focado na mão de obra.' },
      { question: 'Construção civil precisa especificar a etapa no recibo?', answer: 'Sim, é altamente recomendado escrever em "Referente a" a etapa correspondente (ex: pagamento da 2ª parcela referente ao reboco dos quartos e sala). Isso evita que, no final da obra, o profissional cobre por partes que já foram pagas.' },
      { question: 'Esse recibo isenta de problemas na execução do serviço?', answer: 'O recibo é apenas um documento financeiro, provando que a quantia foi paga. Garantias legais de solidez da construção e defeitos de execução continuam valendo conforme o Código de Defesa do Consumidor e Código Civil.' }
    ]
  },
  'psicologo': {
    whatIsText: 'O Recibo de Psicólogo é o documento financeiro emitido pelo psicoterapeuta para formalizar o recebimento pelas sessões de terapia realizadas. Ele atesta clinicamente e financeiramente o momento em que o paciente quita seus débitos por atendimento. Devido à sua natureza relacionada à saúde mental, este documento é muito valioso para quem precisa de comprovação de despesas médicas perante o Imposto de Renda ou para solicitar reembolso junto a operadoras e planos de saúde.',
    whenToUseList: [
      'Pagamentos por sessões avulsas de psicoterapia.',
      'Pagamento mensal consolidado (englobando todas as terapias do mês).',
      'Apresentação de recibo para reembolso em convênio de saúde.',
      'Dedução de gastos com saúde no Imposto de Renda da Pessoa Física (IRPF).',
      'Avaliações psicológicas, laudos e testes psicotécnicos.'
    ],
    faqs: [
      { question: 'Quais dados do psicólogo são obrigatórios no recibo?', answer: 'Para ter validade perante reembolsos de plano de saúde e Receita Federal (IRPF), é crucial que o recibo contenha o seu número do registro no conselho (CRP), CPF ou CNPJ, assinatura e a clara identificação do paciente.' },
      { question: 'Se o paciente for criança/adolescente, quem vai no recibo?', answer: 'O recibo deve incluir o nome da criança como beneficiária do serviço e o nome com CPF do responsável (pai, mãe ou tutor) no campo de quem efetuou o pagamento, viabilizando o uso perante a Receita Federal.' },
      { question: 'O recibo substitui a nota fiscal para clínicas?', answer: 'Para clínicas formalizadas com CNPJ atuando na área médica, a nota fiscal de prestação de serviços é geralmente exigida pelo fisco municipal. No entanto, para o psicólogo autônomo (pessoa física), o recibo contendo o CRP e CPF tem valor legal pleno para o IRPF.' },
      { question: 'Como descrever as sessões agrupadas em um único recibo mensal?', answer: 'É muito comum. Você deve utilizar o campo de descrição detalhando a quantidade e, se possível, as datas das sessões (Ex: Referente a 4 sessões de psicoterapia clínica realizadas nos dias 02, 09, 16 e 23 deste mês).' },
      { question: 'Plano de saúde aceita recibo sem CNPJ para reembolso?', answer: 'Sim. A maioria das operadoras aceita para reembolso tanto nota fiscal (CNPJ) quanto o recibo emitido pelo profissional autônomo (CPF e CRP), desde que os valores e pacientes estejam claros.' }
    ]
  },
  'dentista': {
    whatIsText: 'O Recibo de Dentista atesta o pagamento por consultas, tratamentos de canal, colocação de aparelhos, implantes e demais procedimentos odontológicos. Emitido pelo cirurgião-dentista ou clínica ao paciente, esse documento além de formalizar a parte financeira, assume uma função importantíssima perante o fisco, pois saúde bucal é uma despesa médica dedutível pelo paciente e obrigatoriamente declarável pelo profissional (Carnê-Leão e afins).',
    whenToUseList: [
      'Pagamento de consultas e manutenções ortodônticas.',
      'Sinal ou entrada para a realização de próteses e implantes odontológicos.',
      'Tratamentos extensos com pagamentos parcelados ou por sessões diárias.',
      'Para comprovação médica e dedução de despesas no Imposto de Renda (IRPF).',
      'Solicitação de reembolso pelo titular de convênio odontológico.'
    ],
    faqs: [
      { question: 'O que o recibo de dentista precisa ter para o Imposto de Renda?', answer: 'Obrigatório constar: Nome completo e CPF do dentista pagador (ou quem dependente pagou), nome e CPF do dentista com o registro no CRO (Conselho Regional de Odontologia), assinatura, e valor numérico exato com indicação do tratamento prestado.' },
      { question: 'Se emitir pelo CPF preciso colocar o CRO?', answer: 'Como o pagamento refere-se a prestação de serviços de saúde dedutíveis, é fundamental inserir o número de inscrição no CRO junto à assinatura para passar credibilidade técnica e garantir que os sistemas de saúde/fisco validem o recibo.' },
      { question: 'Um laboratório de prótese também utiliza este recibo?', answer: 'A prótese faz parte da saúde bucal, mas o recibo perante o paciente final, normalmente, é emitido pelo cirurgião-dentista que efetuou a colocação. Se o laboratório vender diretamente, ele emitirá o dele próprio.' },
      { question: 'A clínica, sendo matriz CNPJ, pode utilizar esse recibo comum?', answer: 'Pode ser utilizado como comprovante provisório de quitação física, mas a clínica que possui CNPJ normalmente estará obrigada a emitir uma Nota Fiscal Eletrônica de Serviços (NFS-e) de acordo com o ISS municipal.' },
      { question: 'O dentista que emite recibo como pessoa física precisa informar à Receita?', answer: 'Sim! Os pagamentos recebidos por dentistas autônomos por prestação de serviço a outra pessoa física devem ser declarados via Carnê-Leão ou sistema eletrônico da receita, exigindo os dados do portador de cada pagamento.' }
    ]
  },
  'aluguel': {
    whatIsText: 'O Recibo de Aluguel é um documento imprescindível nas locações imobiliárias. Ele serve como comprovante inequívoco de que o inquilino repassou o valor da mensalidade e, no caso em que existem, de encargos (como IPTU e Condomínio), ao proprietário do imóvel (locador) ou imobiliária responsável. Sendo obrigação legal garantir o documento ao inquilino que paga em dia, sua ausência em um processo de despejo prejudica profundamente a defesa de quem quer comprovar que de fato pagou.',
    whenToUseList: [
      'Aluguel mensal e recorrente de casas, apartamentos e chácaras.',
      'Locação comercial de salas, escritórios, galpões e terrenos.',
      'Justificativa do pagamento de IPTU, água e taxas extras do condomínio pagas junto ao dono.',
      'Garantia jurídica e proteção de inquilinos em acordos verbais (boca a boca).',
      'Sublocação permitida ou pensionatos onde não há contrato formal complexo.'
    ],
    faqs: [
      { question: 'O dono do imóvel é obrigado por lei a assinar recibo?', answer: 'Absolutamente sim. A Lei do Inquilinato exige (Art. 22, Inciso VI) que o locador tem a obrigação de fornecer recibo com os valores discriminados detalhadamente pela mensalidade da locação.' },
      { question: 'Eu paguei por PIX. A transferência bancária tira a necessidade do recibo de aluguel?', answer: 'Apesar do PIX ser uma prova financeira (mostrando que dinheiro saiu daqui e foi pra lá), ele pode ser frágil como prova isolada caso não discrimine a finalidade ou os meses. O recibo assinala objetivamente o mês, multas daquele mês, confirmando que o dono se dá por satisfeito com a cota.' },
      { question: 'Inquilinos que fazem acordos verbais devem utilizar o recibo?', answer: 'Aí mesmo que devem redobrar a necessidade! O recibo mês a mês funciona como um "fio condutor" histórico, a prova mais cabal que existe validando e ratificando uma relação locatícia legítima entre as partes.' },
      { question: 'O que deve constar no campo de descrição deste comprovante?', answer: 'Mês base da competência (Referente a abril/2026), endereço do imóvel alvo deste aluguel, se ali constam taxas incidentes discriminadas (e.g., Aluguel R$1.000 + R$200 Condomínio). Quanto mais farto de esclarecimento for, menos discussão trará.' },
      { question: 'Pode cobrar pelo fornecimento do recibo no contrato de aluguel?', answer: 'Não. Pelas leis de locação brasileiras atreladas ao direito do consumidor e civil, cobrar taxas administrativas puramente e comumente para emitir simples recibo ou boletos que evidenciem pagamento é considerada prática abusiva e é ilegal.' }
    ]
  },
  'mei': {
    whatIsText: 'O Recibo para MEI é um documento estruturado e emitido pelo profissional formalizado como Microempreendedor Individual após a finalização da venda de produtos ou prestação de um serviço efetuado a um cliente (frequentemente, pessoa física). O fato do MEI ser isento (pela resolução do Simples Nacional) do dever de emitir Nota Fiscal quando atende pessoas físicas não esgota sua necessidade de ofertar ao seu consumidor um documento válido pelo repasse financeiro ocorrido, atuando assim com profissionalismo.',
    whenToUseList: [
      'Transações de prestação de serviços ou vendas diretas a cliente Pessoa Física (CPF).',
      'Ofícios como eletricistas, consertos de eletrônicos, pintores, salgueiras MEI.',
      'Profissionais esteticistas de beleza independentes trabalhando sem vínculos.',
      'Recebimento atrelado as formalidades fiscais leves para organização do balancete MEI anual.',
      'Comprovante padronizado de um sinal/adiantamento para garantir a mercadoria de revenda.'
    ],
    faqs: [
      { question: 'O MEI é obrigado a dar recibo quando não dá nota fiscal?', answer: 'Ninguém deve reter o repasse financeiro de outrem prestando-lhe bens sem oferecer a devida quitação. Pela lei de Direitos ao Consumidor, toda aquisição é comprovante. Se você é MEI e atende PF (isenção de nota), entregue um recibo!' },
      { question: 'Esse recibo para MEI pode constar apenas o CNPJ, sem o CPF?', answer: 'Sim. Por tratar-se de uma negociação conduzida pela sua empresa, a figuração prioritária da Razão Social da Empresa com respectivo quadro da identificação corporativa, CNPJ, é legal e desejada, afastando do uso restritivo pessoal do dono (seu CPF).' },
      { question: 'Posso emitir recibo se o meu cliente for outra empresa (PJ)?', answer: 'Segundo o teto limitador de obrigatoriedades do Governo, se o MEI conduzir uma transação comercial com outra emrpesa que possua CNPJ regular obrigatoriamente ele precisará EMITIR NOTA FISCAL pertinente. Só o recibo será tido, ali, como passivo perante eles, embora prove do pagamento.' },
      { question: 'Esse recibo MEI ajuda a preencher a declaração (DASN)?', answer: 'Sem dúividas! Reunir organizadamente seus recibos emitidos ao fim de um decurso de prazo formam o montante (Livro Caixa simplificado) somado das vendas feitas à PF, e será base vital pra construir com precisão a numeração real do relatório de Receita Bruta da Declaração.' },
      { question: 'Eu preciso mandar na gráfica para criar um talão de recibo MEI?', answer: 'Atuando de maneira digital, usando ferramentas PDF gratuitas (como esta em vigor), isso caiu num modelo em desuso pelo custo atrelado, pela poluição, além de não poder emitir remotamente e perdê-los rotineiramente, tornando um gerador eletrônico de longe a estratégia atual.' }
    ]
  },
  'servicos': {
    whatIsText: 'O Recibo de Prestação de Serviços formaliza repasses de valores efetuados por um cliente originados e provenientes do gozo de um trabalho braçal, criativo, administrativo ou consubstancial realizado pelo profissional autônomo (freelancer ou liberal). Este é o documento padrão para aqueles que, não constando regras especiais ou CNPJs impeditivos, precisam comprovar sem restrições ou ruídos que foram adimplentes no ofício prestado e honrados em pecúnia pela obrigação contratual.',
    whenToUseList: [
      'Trabalhos independentes (desenvolvedores web, designers free-lance, fotógrafos não engajados).',
      'Assessorias, consultorias abertas ou aulas particulares temporárias e contínuas.',
      'Autônomos prestadores que oferecem limpeza, marcenarias e reparações mecânicas em escopo flexível.',
      'Trabalhos não formalizados temporários prestando assessoria por etapas.',
      'Comprovante rápido quando uma nota fiscal burocratizada ainda não foi regularizada pela PJ do ente.'
    ],
    faqs: [
      { question: 'Serviço prestado como Pessoa Física dá problema sem o CNPJ?', answer: 'Desde que o pagamento por remuneração e ganhos seja lançado em obediência às matrizes de isenção de faturamentos federais nos rendimentos mensais declarados nos conformes estritamente, não ocasiona dolo ou penalizações pela mera ausência de uma conta PJ ou numeração CNPJ de registro empresarial.' },
      { question: 'Esse modelo trata-se da sigla famosa popular "RPA"?', answer: 'Eles interagem conceitualmente, mas diferem burocraticamente. O Recibo para Autônomo padrão aqui exposto assesta e exime as partes unicamente sobre ter ocorrido a liquidez financeira transacional. Um RPA efetivamente constituído deduz na fonte contribuições governamentais previdenciárias e fiscais complexas, por tabela retidas pelo contratante PJ com peso legal específico exigido.' },
      { question: 'Estou recebendo em parcelas pela minha prestação, quantos recibos devo confeccionar?', answer: 'Pelo pragmatismo da rastreabilidade da adimplência temporal, e sob pena da segurança recíproca dos fatos, em cada fase que houver depósitos de parcela ao triturar do cronograma do projeto, exige e emite-se um recibo da cota correspondendo fidedignamente que parte já amortizou o montante de valor original total em pendência.' },
      { question: 'O cliente me devolveu equipamentos na prestação, escrevo no campo recibo?', answer: 'É razoável para eximir eventuais queixas em distratos se as referências documentais descrevam amplamente no texto fatos ou insumos adjacentes para demonstrar clareza sobre o trabalho extinto. Se lhe deram os ativos juntamente a pecúnia adiantada, aloque este rol no campo e descarte o uso de recibos dúbios por insuficientes declarações.' },
      { question: 'Que força jurídica este recibo simples perante os trâmites dos Juizados detêm?', answer: 'Com extrema densidade probatória e comprovação. Sendo munido da assinatura confirmada, da qualificação incontestável com as numerações de controle (CPF em específico no caso) e do registro da cifra e temporalidade ali assentados, preenchendo todos pressupostos civilizados dos deveres normais contratuais firmados do cotidiano popular do prestador sem que seja derrogado ou fragilizado facilmente sem justificativa contrária.' }
    ]
  },
  'corretor': {
    whatIsText: 'O Recibo do Corretor de Imóveis é a forma pelo qual autônomos ou comissionados legalmente chancelados (pela credencial e regularização do CRECI de sua localidade) certificam perante o comprador ou alienante a percepção cabal de parcelas provindas da intermediação em compra, venda e permuta nos imóveis (seja de locação de carteiras, de loteamentos ou captações de corretores de praça). As comissões sendo elevadas num cenário real impendem segurança plena nas transferências.',
    whenToUseList: [
      'Quitação financeira pelo recebimento por honorários e percentuais auferidos provenientes de comissão após assinar as escrituras do alvo.',
      'Sinal ou depósitos na forma precursora a compra do terreno ou de sinal nas mãos do próprio corretor, comitente fiel.',
      'Gestão em administrações recorrentes na captação de chaves dos inquilinos.',
      'Para viabilizar àquelas deduções tributárias nos trâmites legais do custo integral do objeto que teve a aquisição.',
      'Divisão em repartir e atestar as premiações das corretoras entre autônomos de mesmo teto (partnership nas negociações).'
    ],
    faqs: [
      { question: 'Eu preciso exibir o número do meu CRECI no recibo de corretagem?', answer: 'Imprescindível! Para validar esse labor frente a conselhos profissionais e na tributação justa de transações com corretagem de modo crível e incontestável e dedutível pela contraparte pagante, colocar essa filiação e matrícula no rodapé ou referencial é vital na prática das grandes transações em correções imobiliárias em todo o país.' },
      { question: 'Alguém não credenciado legalmente pode usar esse recibo livremente?', answer: 'Corretagem tem seu exercício perigosamente protegido nos ditames. Não se pode legalmente titular-se ou documentar ser devidamente a transação de "honorários por via de corretagem imobiliária" não figurando credenciamentos CRECI, pois trata excludentemente do escopo legalizado das praxes, caindo o usurpador noutras esferas civis gravosas sem suporte válido ou passíveis ali à desconsideração fiscal tributária por quem paga.' },
      { question: 'Pode-se usar esse recibo emitido para provar um compromisso de "Sinal" entre cliente e Comprador?', answer: 'Normalmente, é usual ver corretores recepcionarem sinais por estrito mandato temporário na forma representativa, repassando ou integralizando no preço do promissário aos entes. Neste caso em si emitindo-se algo, atua estritamente não como suas taxas de honorários pessoais puramente per si, preencha então que tal recebimento assinalado recai na conta restrita para Arras repassadas perante o comprador tal, agindo restritamente sob procuração mandatária.' },
      { question: 'No caso de receber locações mensais, devo eu fazer por mim?', answer: 'Sendo contratado nas corretagens com gestor contínuo alugante nas frentes administravias daquele imóvel locatício, habitualmente pode e deve ele emitir aos cuidados dos locatários pela praxe firmada no mandato (os Recibos regulares de depósitos dos encargos locacionais) mas a contabilidade exigirá separações do seu montante recebido que ficará à base de comissão cobradas dos senhorios dos recebidos líquidos ali.' },
      { question: 'Como um corretor isenta essa remuneração se questionado a quem prestou?', answer: 'Esse preenchimento exige estapafúrdia exatidão: qualifique sempre o CPF daquele e para a transação que firmaram acordo e intermedeiam (os 6% cobrados sobre matrícula y de forma singular), com a assinatura clara sob a remuneração devida das chaves e do percentual da obra e pronto, seu direito foi plenamente consagrado.' }
    ]
  },
  'cuidador': {
    whatIsText: 'O Recibo do Cuidador de Idosos ratifica fidedignamente todo pagamento recebido daquele ou familiares responsáveis em recompensa do engajamento humanitário focado em saúde, conforto, manutenção diária terapêutica e convívio, conferindo amparos nos honorários firmados. Comprova o encerramento do fato gerador do trabalho de companhia daquelas valerosas jornadas prestadas muitas vezes nos finais de semana ou por folguistas que amparam entes sensíveis em domicílio e clínicas afins nas dependências vitais de seus clientes assistidos ali pelos familiares e contratantes engajados à quitação dessas labutas.',
    whenToUseList: [
      'Contratações eventuais não formalizadas em dias alternos e remuneração avulsas na labuta (finais de semana ou repousos no horário do expediente alheio).',
      'Registrar formal o atesto contra o receio em questionamentos na gerência e acompanhamentos dos responsáveis da idade e em trâmites nos direitos sobre passivos legais sem limites e sem justa remuneração comprovadas na lide familiar sensível e nos bens provisórios da classe em litígio ali.',
      'Sinal ou cobertura remanescente em viagens ou longas rotinas temporárias provando em recibos fracionados de semanas os repasses em montantes salariais e repasses em vale-transporte por esses adiantamentos nas quitações do idoso.',
      'Profissionais não portadores de MEI providenciando amparo de sua renda.'
    ],
    faqs: [
      { question: 'Existe necessidade nas assinaturas que seja da própria pessoa em idades avançadas?', answer: 'Caso o idoso receba esses suportes em lucidez e responda e controle seus cabedais fáticos integralmente com primazia e gerencie, de regra este pode efetivamente preencher no corpo dos pagadores; nas esferas de procuradores, interdições curadoras e de quem de fato lhes amparam nas teses das finanças, recai a quem pagou assinalar.' },
      { question: 'Eu preciso especificar detalhado sobre todas as funções terapêuticas e fisiológicas praticadas do idoso nos recibos exatos ali?', answer: 'Não se trata nestas praxes de descrever procedimentos fisiológicos, remédios com suas doses sensíveis dadas nas minúcias diárias para expor; esse registro trata simplesmente sobre o adimplemento por acompanhante cuidando nas referências avulsas. No campo do porquê, a frase "Prestação avulsa e remuneração pelas atividades exercendo cuidados de rotinas nas jornadas de {data} " supre com altivez a necessidade moral perene do papel nestes acordes.' },
      { question: 'Preciso lançar impostos retidos sem ser formalizado se receber altas quantias?', answer: 'Pode-se isentar dos percentuais de notas na informalidade como CPF natural, porém o profissional, por auferir rendimentos e honorários nos repasses mensais contínuos ou agudos repassados de outras pessoas naturais com volumes excedentes além das tabelas anuais isentas vigentes do governo, é devidamente obrigado ao programa de cálculos e retenções normais chamados de Carnê leão declaráveis sob sua conta, na pessoa dele perante o fato na esfera autoral e individual isentando sua figura.' },
      { question: 'O recibo como folguista ou plantonista precisa da delimitação total descritiva?', answer: 'É primoroso para obstar desentendimentos temporais. "Referente aos dois plantões correspondentes de sábado à noite" prevenidos com objetividade provam sem lacunas e mitigará que o acompanhante ali não está servindo sob vínculo contínuo excludente daquela folguista na praxe ou dias dos regulares na profissão ali naqueles lapsos sensíveis à lide do passivo familiar trabalhista e nas queixas infundadas futuras no porquê destas quitações da pessoa alheia por horas de folga em questão nas esferas domésticas que se aplicam em certas circunstâncias do país.' },
      { question: 'Pode ele substituir recibo e anotação assinada formal da carteira e vínculos legais trabalhistas nestas dinâmicas se já existirem labor diários?', answer: 'A folha em PDFs emitidas pelo gerador nos repasses semanais comprova unicamente da entrega estrita monetária. Caso este labor seja consolidado em obrigatoriedades de repouso, ordens estritas atreladas subordinações fáticas naquelas rotinas ou continuidade farta em muitos recortes semanais predeterminadas, nada impede os ritos normatizados. Estes papeis não subtraiem prerrogativas constitucionais aplicáveis caso existam tais vícios; são ferramentas complementares do fato lide apenas em quitação da lide e pecúnia nas mãos.' }
    ]
  }
};
