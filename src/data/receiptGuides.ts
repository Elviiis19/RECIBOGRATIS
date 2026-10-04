export interface ReceiptGuide {
  legalDisclaimer: {
    badge: string;
    lawReference: string;
    title: string;
    description: string;
  };
  commonErrors: {
    title: string;
    errors: {
      number: number;
      title: string;
      description: string;
    }[];
  };
  whenNotToUse: {
    title: string;
    description: string;
    items: string[];
    practicalRule: string;
  };
}

export const specificReceiptGuides: Record<string, ReceiptGuide> = {
  'recibo-pix': {
    legalDisclaimer: {
      badge: 'Segurança Jurídica',
      lawReference: 'Lei Federal nº 10.406/2002 e Normas do Banco Central',
      title: 'Aviso Legal e Validade Probatória perante a Lei',
      description:
        'Os recibos gerados nesta plataforma têm caráter utilitário e pleno valor probatório de quitação civil (Artigos 319 e 320 do Código Civil Brasileiro). O documento atesta irrevogavelmente que o valor acordado foi recebido. Para operações de compra de imóveis, dissolução de sociedades empresariais ou transações com exigência fiscal contábil, consulte sempre um advogado ou contador registrado no CRC.'
    },
    commonErrors: {
      title: '4 Erros Fatais ao Emitir um Recibo PIX (e Como Evitar)',
      errors: [
        {
          number: 1,
          title: 'Achar que o print do banco basta',
          description:
            'O print bancário só atesta que o dinheiro saiu de uma conta e entrou na outra. Ele não prova o motivo, não detalha qual serviço foi prestado e não dá quitação formal. Sem o recibo assinado, você fica desprotegido em caso de cobrança indevida.'
        },
        {
          number: 2,
          title: 'Aceitar comprovante de PIX Agendado',
          description:
            'Golpistas costumam agendar a transferência para o dia seguinte, enviam o print com aspecto de pago e cancelam o agendamento minutos depois. Só emita o recibo de quitação após o valor cair de fato no extrato da sua conta.'
        },
        {
          number: 3,
          title: 'Usar descrições vagas como "serviços"',
          description:
            'No campo "Referente a", descreva detalhadamente a entrega (ex: "Pintura interna de 3 cômodos residenciais com acabamento fosco"). Descrições genéricas enfraquecem a prova perante a justiça ou Procon.'
        },
        {
          number: 4,
          title: 'Não colher a assinatura de quem recebeu',
          description:
            'Pelo Código Civil (Art. 320), o recibo só é formalmente perfeito com a assinatura de quem recebeu o dinheiro. Nosso gerador já prepara o campo de assinatura no PDF para assinatura física com caneta ou assinatura digital.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar o Recibo PIX',
      description:
        'Embora o Recibo PIX seja perfeito para autônomos, diaristas, prestadores de serviços, aluguéis e negócios particulares, a legislação brasileira exige outros documentos específicos em certas situações:',
      items: [
        'Venda de mercadorias no comércio: Empresas comerciais (ME, EPP, LTDA) que vendem produtos físicos devem emitir obrigatoriamente a Nota Fiscal Eletrônica (NF-e ou NFC-e) para apuração de ICMS.',
        'Serviços corporativos com retenção de tributos federais/municipais: Empresas tomadoras que exigem retenção na fonte de ISS, PIS, COFINS ou IRRF demandam Nota Fiscal de Serviço (NFS-e).',
        'Transferência oficial de imóveis e veículos: A transferência de veículos exige o ATPV-e no Detran, e imóveis acima de 30 salários mínimos exigem Escritura Pública em Cartório de Notas.'
      ],
      practicalRule:
        'Para serviços autônomos, diaristas, freelances, aluguéis de particulares e vendas de itens usados entre pessoas físicas ou MEI, o Recibo PIX é 100% legal, suficiente e recomendado.'
    }
  },

  'recibo-simples': {
    legalDisclaimer: {
      badge: 'Quitação Civil Válida',
      lawReference: 'Artigos 319 e 320 do Código Civil (Lei 10.406/2002)',
      title: 'Aviso Legal e Validade Jurídica do Recibo Simples',
      description:
        'O recibo simples é o instrumento jurídico fundamental do direito brasileiro para comprovar a liberação de dívidas e quitação de pagamentos. Possui ampla força probatória na Justiça Comum e nos Juizados Especiais Cíveis (Lei 9.099/95). Não substitui notas fiscais comerciais para empresas com obrigação tributária perante a Secretaria da Fazenda.'
    },
    commonErrors: {
      title: '4 Erros Comuns ao Preencher um Recibo Simples (e Como Evitar)',
      errors: [
        {
          number: 1,
          title: 'Omitir o valor por extenso',
          description:
            'Escrever apenas o número (ex: R$ 500,00) abre margem para adulterações maliciosas (como adicionar um zero à direita). Sempre preencha o valor por extenso — nossa ferramenta converte automaticamente para evitar qualquer fraude.'
        },
        {
          number: 2,
          title: 'Não colher a assinatura de quem recebeu',
          description:
            'A lei civil exige que quem recebeu os valores assine o documento. Recibo sem assinatura de quem recebeu não tem qualquer valor probatório perante a justiça.'
        },
        {
          number: 3,
          title: 'Descrições genéricas no campo "Referente a"',
          description:
            'Evite escrever apenas "pagamento de contas" ou "serviço". Especifique claramente o objeto (ex: "Quitação da parcela 2/5 referente à compra do computador Dell modelo Inspiron").'
        },
        {
          number: 4,
          title: 'Não guardar a via assinada pelo prazo legal',
          description:
            'O prazo prescricional para cobranças de dívidas no Código Civil varia de 3 a 5 anos. Guarde o recibo assinado em papel ou PDF na nuvem durante esse período para blindar seu patrimônio.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar o Recibo Simples',
      description:
        'O recibo simples é universal para pessoas físicas e autônomos, mas não deve ser empregado nos seguintes casos:',
      items: [
        'Relação de emprego formal subordinada (CLT): Pagamento de salários mensais de funcionários exige holerite oficial com discriminação de INSS, FGTS e descontos legais.',
        'Venda de produtos físicos no comércio: Estabelecimentos comerciais com CNPJ são obrigados por lei a emitir Cupom Fiscal ou Nota Fiscal Eletrônica (NF-e).',
        'Acordos judiciais em andamento: Acordos em processos judiciais devem ser protocolados e homologados pelo juiz da causa para ter eficácia de título executivo judicial.'
      ],
      practicalRule:
        'Para compras de bens usados, serviços pontuais entre particulares, empréstimos familiares e quitação de débitos pessoais, o recibo simples é 100% eficaz e seguro.'
    }
  },

  'recibo-de-prestacao-de-servicos': {
    legalDisclaimer: {
      badge: 'Proteção Contratual',
      lawReference: 'Artigos 593 a 609 do Código Civil Brasileiro',
      title: 'Aviso Legal para Prestadores de Serviços e Autônomos',
      description:
        'Este recibo formaliza a liquidação da contraprestação acordada entre o prestador e o tomador de serviços. Funciona como comprovante de entrega do serviço e quitação mútua. Não substitui o Recibo de Pagamento a Autônomo (RPA) caso o tomador seja pessoa jurídica com dever de retenção de tributos federais e previdenciários.'
    },
    commonErrors: {
      title: '4 Erros Graves ao Emitir Recibo de Prestação de Serviços',
      errors: [
        {
          number: 1,
          title: 'Confundir recibo comum com RPA (quando o cliente é PJ)',
          description:
            'Se você presta serviços para uma empresa (Pessoa Jurídica), a empresa contratante precisa recolher o INSS e o IRRF na fonte através de um RPA ou exigir sua Nota Fiscal de Serviços (NFS-e).'
        },
        {
          number: 2,
          title: 'Não detalhar o escopo das tarefas executadas',
          description:
            'Nunca escreva apenas "serviço prestado". Liste sucintamente o que foi feito (ex: "Instalação de 4 pontos de ar-condicionado e tubulação de cobre"). Isso impede que o cliente exija tarefas extras sem pagar a mais.'
        },
        {
          number: 3,
          title: 'Não especificar se o material está incluso',
          description:
            'Deixe claro se o valor pago é exclusivo para a mão de obra ou se inclui peças e insumos. Isso evita disputas sobre reembolsos posteriores.'
        },
        {
          number: 4,
          title: 'Esquecer de informar no Carnê-Leão da Receita Federal',
          description:
            'Rendimentos de serviços recebidos de pessoas físicas acima da faixa de isenção devem ser lançados mensalmente no programa Carnê-Leão da Receita Federal pelo prestador autônomo.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar este Recibo de Serviços',
      description:
        'A emissão do recibo autônomo é inadequada nas seguintes hipóteses:',
      items: [
        'Vínculo empregatício caracterizado: Se o profissional cumpre horário obrigatório diário, obedece ordens diretas de chefe e trabalha com habitualidade, a relação é regida pela CLT (Art. 3º).',
        'Contratos públicos com órgãos governamentais: Exigem medição técnica oficial e emissão compulsória de Nota Fiscal Eletrônica de Serviços (NFS-e).',
        'Serviços de engenharia ou arquitetura com ART/RRT: Obras estruturais que exigem Anotação de Responsabilidade Técnica demandam contrato formal e nota fiscal correspondente.'
      ],
      practicalRule:
        'Para reparos, manutenções, consultorias pontuais, freelancers de design e tecnologia, pintores, pedreiros e técnicos prestando serviços avulsos a pessoas físicas, este recibo confere segurança irrefutável.'
    }
  },

  'recibo-de-aluguel': {
    legalDisclaimer: {
      badge: 'Lei do Inquilinato',
      lawReference: 'Lei Federal nº 8.245/1991 (Art. 22, Inciso VI)',
      title: 'Obrigatoriedade e Validade do Recibo de Aluguel',
      description:
        'Pela Lei do Inquilinato, o locador é expressamente obrigado a fornecer ao locatário recibo discriminado das importâncias pagas, vedada a quitação genérica. O locatário tem o direito legal de reter o pagamento caso o proprietário se recuse a fornecer o comprovante discriminado de quitação.'
    },
    commonErrors: {
      title: '4 Erros Fatais no Recibo de Aluguel (que Geram Processos)',
      errors: [
        {
          number: 1,
          title: 'Não discriminar os encargos (aluguel, IPTU e condomínio)',
          description:
            'Juntar aluguel e encargos em um número só é infração à Lei do Inquilinato. O recibo deve separar o valor do aluguel das quotas de condomínio, IPTU e consumo de água/gás para evitar alegações de repasse indevido.'
        },
        {
          number: 2,
          title: 'Não colocar o mês de referência / competência',
          description:
            'Obrigatoriamente deve constar: "competência / mês de referência: Mês/Ano". Sem isso, em uma ação de despejo, o inquilino pode alegar que pagou o mês cobrado e não o mês anterior.'
        },
        {
          number: 3,
          title: 'Cobrar aluguel antecipado quando há fiador ou caução',
          description:
            'O locador só pode exigir o pagamento antecipado do aluguel se a locação NÃO tiver nenhuma garantia (Art. 20 da Lei 8.245/91). Exigir aluguel adiantado havendo caução ou fiador é contravenção penal punível com prisão simples ou multa.'
        },
        {
          number: 4,
          title: 'Não emitir segunda via para o locador arquivar',
          description:
            'O locador deve sempre colher a assinatura do inquilino na segunda via ou arquivar o comprovante bancário vinculado ao recibo emitido para controle do IRPF (Imposto de Renda).'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar o Recibo Comum de Aluguel',
      description:
        'Este recibo padrão de locação residencial/comercial direta não se aplica a:',
      items: [
        'Sublocação não autorizada: Sublocar imóvel sem autorização prévia por escrito do proprietário é quebra contratual que motiva despejo imediato.',
        'Estadias de hospedagem temporária (Airbnb / Hotéis): Locações por temporada de curta permanência através de plataformas já possuem regras e faturas de intermediação eletrônica próprias.',
        'Locação de vagas de garagem autônomas em condomínios comerciais: Regidas por regras de estacionamento comercial e recolhimento de ISS.'
      ],
      practicalRule:
        'Em locações residenciais ou comerciais diretas entre proprietário e inquilino (sem taxa de imobiliária), este recibo discriminado é o instrumento que resguarda ambas as partes contra despejos e litígios judiciais.'
    }
  },

  'recibo-para-mei': {
    legalDisclaimer: {
      badge: 'Legislação do MEI',
      lawReference: 'Resolução CGSN nº 140/2018 (Art. 106, II, "a")',
      title: 'Validade do Recibo Emitido por Microempreendedor Individual',
      description:
        'O Microempreendedor Individual (MEI) está legalmente desobrigado de emitir Nota Fiscal Eletrônica quando prestar serviços ou vender mercadorias para pessoas físicas (consumidores finais). O recibo com os dados do MEI (CNPJ e Razão Social) possui pleno valor legal para atestar a quitação e compor o Relatório Mensal de Receitas Brutas.'
    },
    commonErrors: {
      title: '4 Erros Comuns que o MEI Comete com Recibos',
      errors: [
        {
          number: 1,
          title: 'Não emitir Nota Fiscal quando o cliente for empresa (PJ)',
          description:
            'A dispensa de Nota Fiscal do MEI vale apenas para clientes pessoas físicas. Se o cliente for uma empresa privada, cooperativa ou órgão público com CNPJ, a emissão da NFS-e ou NF-e é obrigatória.'
        },
        {
          number: 2,
          title: 'Omitir o CNPJ do MEI no corpo do recibo',
          description:
            'O MEI deve sempre preencher sua Razão Social e número do CNPJ no campo do recebedor para comprovar perante os bancos que o faturamento é da atividade comercial e não renda informal desprotegida.'
        },
        {
          number: 3,
          title: 'Não lançar o valor no Relatório Mensal de Receitas',
          description:
            'Todo recibo emitido deve ser somado no Relatório Mensal das Receitas Brutas até o dia 20 do mês seguinte, para controle do limite anual de faturamento de R$ 81.000 do MEI.'
        },
        {
          number: 4,
          title: 'Prestar serviços fora das atividades (CNAEs) do CNPJ',
          description:
            'Emitir recibos de atividades profissionais não cadastradas no seu Certificado de Condição de Microempreendedor Individual (CCMEI) pode gerar desenquadramento fiscal pela Receita Federal.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando o MEI NÃO Pode Usar Apenas Recibo',
      description:
        'O MEI deve emitir Nota Fiscal oficial (e não apenas recibo) nos seguintes cenários:',
      items: [
        'Vendas ou serviços para Pessoas Jurídicas (outras empresas ou entidades com CNPJ): A legislação do Simples Nacional torna a emissão da nota fiscal obrigatória.',
        'Vendas interestaduais de mercadorias físicas: O transporte rodoviário ou envio pelos Correios entre estados exige o Danfe da NF-e para não sofrer apreensão em postos fiscais da Sefaz.',
        'Quando o cliente pessoa física exigir expressamente a Nota Fiscal: O MEI é obrigado a emitir caso o consumidor final solicite formalmente o documento fiscal.'
      ],
      practicalRule:
        'Para todos os atendimentos a clientes pessoas físicas no balcão, domicílio ou internet, o Recibo do MEI gerado aqui é 100% legal, rápido e cumpre todas as exigências da Receita Federal.'
    }
  },

  'recibo-de-compra-e-venda': {
    legalDisclaimer: {
      badge: 'Alienação e Compra e Venda',
      lawReference: 'Artigos 481 a 504 do Código Civil Brasileiro',
      title: 'Aviso Legal de Quitação de Compra e Venda',
      description:
        'Este recibo confere quitação irrevogável da obrigação financeira assumida no contrato de compra e venda de bens móveis, semoventes ou equipamentos. Ele prova que o vendedor recebeu o preço avençado e que o comprador adimpliu sua prestação. Para veículos automotores e imóveis, atos registrais adicionais são exigidos por lei.'
    },
    commonErrors: {
      title: '4 Erros Fatais ao Emitir Recibo de Compra e Venda',
      errors: [
        {
          number: 1,
          title: 'Achar que o recibo transfere o veículo no Detran',
          description:
            'O recibo quita a dívida financeira entre as partes, mas a transferência da propriedade do veículo perante o Estado exige obrigatoriamente a assinatura da Autorização para Transferência de Veículo (ATPV-e) com comunicação formal de venda no Detran.'
        },
        {
          number: 2,
          title: 'Não individualizar o bem vendido',
          description:
            'Sempre detalhe marca, modelo, número de série, chassi, placa ou IMEI no campo "Referente a". Descrições incompletas impossibilitam a cobrança de garantia ou a defesa contra alegações de produto falso.'
        },
        {
          number: 3,
          title: 'Não incluir a cláusula de vistoria e estado do bem',
          description:
            'Para itens usados, é fundamental constar que o comprador inspecionou, testou e aceitou o bem no estado em que se encontra, evitando devoluções injustificadas após a entrega.'
        },
        {
          number: 4,
          title: 'Cair no golpe do falso intermediário',
          description:
            'Nunca entregue o bem nem transfira valores para terceiros que afirmam ser "primos", "sócios" ou "intermediários". O pagamento e o recibo devem ser feitos exclusivamente entre o titular do bem e o comprador real.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar Apenas este Recibo de Compra e Venda',
      description:
        'Existem transações que dependem de instrumentos públicos e registros cartorários solenes:',
      items: [
        'Imóveis de valor superior a 30 salários mínimos: O Artigo 108 do Código Civil determina que a escritura pública em Cartório de Notas é da substância do ato.',
        'Veículos alienados ou financiados sem autorização do banco: A venda de veículo com gravame ativo sem quitação do saldo devedor perante a instituição financeira configura fraude.',
        'Bens de herança sem inventário concluído: Bens integrantes de espólio não podem ser alienados individualmente sem alvará judicial ou partilha definitiva.'
      ],
      practicalRule:
        'Para móveis, eletrônicos, ferramentas, animais, maquinários e para comprovar a quitação do valor acordado em carros e motos, o recibo assinado é a maior blindagem contra estelionato e cobrança duplicada.'
    }
  },

  'recibo-de-diarista': {
    legalDisclaimer: {
      badge: 'Trabalho Doméstico',
      lawReference: 'Lei Complementar nº 150/2015 e Jurisprudência do TST',
      title: 'Aviso Legal e Segurança Jurídica no Trabalho Doméstico',
      description:
        'A emissão do recibo de diária assinado no término de cada jornada é o documento fundamental para comprovar a descontinuidade da prestação de serviços. Protege o contratante contra ações trabalhistas de falso vínculo empregatício e garante à diarista a comprovação de renda autônoma.'
    },
    commonErrors: {
      title: '4 Erros que Podem Gerar Vínculo Empregatício com Diaristas',
      errors: [
        {
          number: 1,
          title: 'Contratar por 3 ou mais dias na mesma semana com recibo de diária',
          description:
            'A Lei Complementar 150/2015 e o TST determinam que trabalhar 3 ou mais dias por semana na mesma residência gera vínculo obrigatório de Empregado Doméstico, exigindo carteira assinada e registro no eSocial.'
        },
        {
          number: 2,
          title: 'Deixar acumular diárias para pagar no final do mês',
          description:
            'Pagar mensalmente passa a impressão jurídica de salário habitual. A regra de ouro da diarista é: diária cumprida, diária paga e recibo assinado no mesmo dia.'
        },
        {
          number: 3,
          title: 'Não discriminar a ajuda de custo do transporte',
          description:
            'Se você paga o transporte à parte, discrimine no recibo (ex: R$ 180 de diária + R$ 20 de auxílio transporte). Isso afasta alegações de falta de vale-transporte.'
        },
        {
          number: 4,
          title: 'Não guardar os recibos assinados por ordem cronológica',
          description:
            'Mantenha todos os recibos físicos ou fotos legíveis arquivados por pelo menos 2 anos após o término da prestação para resguardo contra eventuais reclamatórias trabalhistas.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar o Recibo de Diarista',
      description:
        'O recibo de diária autônoma é estritamente vedado nas seguintes condições:',
      items: [
        'Trabalho de 3 ou mais dias por semana no mesmo lar: Exige contratação formal como Empregada Doméstica com registro no eSocial Doméstico, recolhimento de FGTS e INSS.',
        'Limpeza em empresas comerciais ou escritórios: O trabalho diário em pessoas jurídicas deve ser prestado por funcionário contratado, terceirizado ou MEI com emissão de nota fiscal.',
        'Cuidador de idosos ou babá com jornada contínua: Atividades de cuidado com escala semanal contínua exigem contrato de trabalho específico.'
      ],
      practicalRule:
        'Para faxinas residenciais de 1 ou 2 vezes por semana, o pagamento efetuado no próprio dia com o recibo assinado em mãos é a segurança jurídica máxima do contratante residencial.'
    }
  },

  'recibo-de-honorarios': {
    legalDisclaimer: {
      badge: 'Profissionais Liberais',
      lawReference: 'Código Civil (Arts. 653 e seguintes) e Conselhos de Classe',
      title: 'Aviso Legal para Honorários de Profissionais Liberais',
      description:
        'Comprovante civil de remuneração de serviços técnicos e intelectuais prestados por advogados, contadores, arquitetos, psicólogos, médicos, dentistas e consultores. Atende às exigências de prestação de contas dos respectivos Conselhos de Classe (OAB, CRC, CFM, CFP).'
    },
    commonErrors: {
      title: '4 Erros ao Emitir Recibo de Honorários Profissionais',
      errors: [
        {
          number: 1,
          title: 'Não discriminar a natureza dos honorários',
          description:
            'Especifique se o repasse é pró-labore inicial, honorários mensais fixos, taxa de êxito (ad exitum) ou adiantamento para custas e despesas operacionais.'
        },
        {
          number: 2,
          title: 'Omitir o número do Conselho de Classe (OAB, CRC, CRM)',
          description:
            'A indicação do número do conselho profissional e CPF do profissional é obrigatória para dar fé pública ao documento perante a Receita Federal e o Judiciário.'
        },
        {
          number: 3,
          title: 'Deixar de vincular ao contrato de honorários',
          description:
            'Faça referência ao contrato prévio (ex: "referente à cláusula 3ª do contrato de prestação de serviços advocatícios firmado em 10/02/2026").'
        },
        {
          number: 4,
          title: 'Não recolher o Carnê-Leão e o ISS municipal',
          description:
            'Honorários recebidos de clientes pessoas físicas devem ser escriturados no Carnê-Leão mensalmente para apuração do IRPF devido.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar este Recibo de Honorários',
      description:
        'A utilização deste modelo é inadequada nos seguintes procedimentos:',
      items: [
        'Honorários de sucumbência judicial: Valores fixados pelo juiz em sentença devem ser levantados por alvará judicial ou requisição de pequeno valor (RPV/Precatório).',
        'Serviços prestados por sociedade unipessoal ou limitada de advogados/contadores: Se a contratação foi com o CNPJ da sociedade, exige-se emissão de Nota Fiscal de Serviços (NFS-e).'
      ],
      practicalRule:
        'Para consultas, assessorias, perícias e atuações técnicas individuais perante pessoas físicas, este recibo cumpre todos os requisitos fiscais e éticos da sua profissão.'
    }
  },

  'recibo-de-sinal': {
    legalDisclaimer: {
      badge: 'Garantia Contratual (Arras)',
      lawReference: 'Artigos 417 a 420 do Código Civil (Lei 10.406/2002)',
      title: 'Aviso Legal sobre o Recebimento de Sinal ou Arras',
      description:
        'O recibo de sinal formaliza o princípio de pagamento que confirma o negócio jurídico preliminar entre as partes. Se o pagador desistir injustificadamente, perde o sinal em favor do recebedor; se o recebedor desistir, é obrigado a restituir o sinal mais o equivalente (em dobro), conforme o Artigo 418 do Código Civil.'
    },
    commonErrors: {
      title: '4 Erros Críticos ao Emitir Recibo de Sinal (Arras)',
      errors: [
        {
          number: 1,
          title: 'Não definir a data limite para o pagamento do saldo restante',
          description:
            'O recibo de sinal deve conter a data fatal para quitação do valor remanescente e a assinatura do contrato definitivo, evitando que o bem fique travado indefinidamente.'
        },
        {
          number: 2,
          title: 'Não definir se as arras são confirmatórias ou penitenciais',
          description:
            'Arras confirmatórias não permitem arrependimento (cabendo execução forçada ou perdas e danos). Se houver direito de arrependimento, o texto deve declarar expressamente que as arras são penitenciais.'
        },
        {
          number: 3,
          title: 'Não individualizar o bem reservado',
          description:
            'Descreva com exatidão o bem objeto da promessa (ex: "Sinal para reserva do veículo Honda Civic 2022, placa ABC-1234, pelo valor total acordado de R$ 115.000").'
        },
        {
          number: 4,
          title: 'Receber sinal sem checar débitos e ônus reais',
          description:
            'Antes de pagar ou receber sinal, certifique-se de que o bem não possui multas graves, alienações judiciais ou penhoras que impeçam a transferência.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar o Recibo de Sinal',
      description:
        'Não utilize recibo de sinal nas seguintes circunstâncias de risco:',
      items: [
        'Venda de bens por quem não é o proprietário legal: Pagar sinal para intermediários sem procuração pública por instrumento em cartório é o golpe mais comum do mercado.',
        'Loteamentos clandestinos ou imóveis sem matrícula individualizada: A venda de frações de loteamentos não registrados é crime contra a administração pública (Lei 6.766/79).'
      ],
      practicalRule:
        'Para compras de veículos, móveis sob medida, locações residenciais com reserva e negócios entre particulares, o recibo de sinal formaliza a seriedade da negociação e protege quem investiu.'
    }
  },

  'recibo-de-quitacao': {
    legalDisclaimer: {
      badge: 'Extinção de Dívida',
      lawReference: 'Artigos 319, 320 e 324 do Código Civil',
      title: 'Eficácia Jurídica do Recibo de Quitação Plena',
      description:
        'O recibo de quitação plena e irrevogável é o documento definitivo que atesta a extinção da relação obrigacional entre credor e devedor. Uma vez assinado, o credor declara nada mais ter a reclamar, impedindo legalmente a cobrança de juros, multas ou valores retroativos sobre o débito quitado.'
    },
    commonErrors: {
      title: '4 Erros ao Emitir Recibo de Quitação Definitiva',
      errors: [
        {
          number: 1,
          title: 'Dar quitação antes da compensação bancária dos fundos',
          description:
            'Nunca assine recibo de quitação antes de o valor do PIX, TED ou compensação do cheque estar devidamente creditado e desbloqueado na sua conta bancária.'
        },
        {
          number: 2,
          title: 'Não constar a cláusula de "plena, rasa e geral quitação"',
          description:
            'A ausência dessa cláusula sacramental pode permitir que o credor tente cobrar diferenças de atualização monetária ou juros posteriormente na justiça.'
        },
        {
          number: 3,
          title: 'Não identificar a dívida ou contrato de origem',
          description:
            'O recibo deve especificar claramente qual contrato, nota promissória ou negócio foi totalmente extinto por aquele pagamento.'
        },
        {
          number: 4,
          title: 'Não exigir a devolução dos títulos de crédito originais',
          description:
            'Se a dívida envolvia notas promissórias ou cheques, o devedor deve exigir a devolução dos títulos físicos originais com a palavra "PAGO" carimbada.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar o Recibo de Quitação Comum',
      description:
        'Casos especiais que demandam homologação ou procedimentos específicos:',
      items: [
        'Rescisão contratual de trabalho com estabilidade provisória: Requer homologação sindical ou homologação pelo Centro Judiciário de Solução de Conflitos (Cejusc).',
        'Execução judicial com penhora de bens ativa: A quitação deve ser comunicada por petição assinada por advogado para que o juiz determine o cancelamento da penhora no sistema BacenJud/SisbaJud.'
      ],
      practicalRule:
        'Ao liquidar a última parcela de um parcelamento, empréstimo particular ou acerto financeiro, a emissão deste recibo de quitação é a sua garantia vitalícia de paz e solvência.'
    }
  },

  'recibo-de-salario': {
    legalDisclaimer: {
      badge: 'Legislação Trabalhista',
      lawReference: 'Artigo 464 da Consolidação das Leis do Trabalho (CLT)',
      title: 'Aviso Legal sobre o Pagamento de Salário',
      description:
        'Conforme o Art. 464 da CLT, o pagamento de salário deve ser efetuado contra recibo, assinado pelo empregado; em se tratando de analfabeto, mediante sua impressão digital. O comprovante de depósito bancário em conta salário nominal também tem força de recibo.'
    },
    commonErrors: {
      title: '4 Erros Trabalhistas Fatais no Recibo de Salário',
      errors: [
        {
          number: 1,
          title: 'Praticar o salário complessivo (proibido pela Súmula 91 do TST)',
          description:
            'É nula a cláusula que fixa valor global englobando salário, horas extras e adicionais sem discriminar cada rubrica. O recibo deve discriminar cada verba separadamente.'
        },
        {
          number: 2,
          title: 'Pagar após o 5º dia útil do mês subsequente',
          description:
            'Atrasar o pagamento além do 5º dia útil gera incidência de correção monetária e multa em favor do trabalhador conforme a legislação trabalhista.'
        },
        {
          number: 3,
          title: 'Não colher a assinatura na via da empresa',
          description:
            'Sem a assinatura do empregado ou o comprovante de PIX/TED nominal em conta própria, a Justiça do Trabalho presume que o salário não foi pago, condenando a empresa a pagar de novo.'
        },
        {
          number: 4,
          title: 'Fazer descontos ilegais não autorizados',
          description:
            'Pelo Art. 462 da CLT, são vedados descontos não autorizados previamente por escrito (exceto adiantamentos, dispositivo de lei ou contrato coletivo).'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar o Recibo de Salário',
      description:
        'O recibo de salário é exclusivo para relações formais de emprego subordinado:',
      items: [
        'Prestadores de serviço autônomos ou freelancers: Devem receber mediante Recibo de Prestação de Serviços ou RPA.',
        'Diaristas com frequência de até 2 vezes por semana: Devem receber por Recibo de Diarista para não criar confusão de vínculo trabalhista.'
      ],
      practicalRule:
        'Para funcionários domésticos registrados no eSocial, ajudantes e colaboradores contratados, a entrega da via assinada do recibo mensal é a proteção absoluta do empregador contra passivos trabalhistas.'
    }
  },

  'nota-promissoria': {
    legalDisclaimer: {
      badge: 'Título de Crédito Executivo',
      lawReference: 'Decreto nº 2.044/1908 e Decreto nº 57.663/1966 (LUG)',
      title: 'Força Executiva da Nota Promissória',
      description:
        'A nota promissória é um título de crédito executivo extrajudicial (Art. 784, I, do Código de Processo Civil). Em caso de inadimplência, permite ao credor ingressar diretamente com Ação de Execução de Título Extrajudicial na justiça, sem a necessidade de audiências prévias de conhecimento.'
    },
    commonErrors: {
      title: '4 Erros que Anulam a Validade da Nota Promissória',
      errors: [
        {
          number: 1,
          title: 'Não constar o termo "Nota Promissória" no corpo do título',
          description:
            'A Lei Uniforme de Genebra exige a denominação expressa "Nota Promissória" inserida no próprio texto do documento para que ele tenha eficácia executiva.'
        },
        {
          number: 2,
          title: 'Divergência entre o valor numérico e o valor por extenso',
          description:
            'A lei cambial determina que, em caso de divergência entre o algarismo e a escrita por extenso, prevalece incondicionalmente o valor indicado por extenso.'
        },
        {
          number: 3,
          title: 'Omitir o local de pagamento e a praça de emissão',
          description:
            'Indicar a cidade de pagamento é essencial para determinar qual será o foro judicial competente para dirimir a cobrança em caso de litígio.'
        },
        {
          number: 4,
          title: 'Assinatura do avalista sem dados de identificação',
          description:
            'O avalista assume responsabilidade solidária pela dívida. Sua assinatura deve ser acompanhada de nome legível, CPF e preferencialmente dados do cônjuge se casado em comunhão de bens.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Emitir Nota Promissória',
      description:
        'Evite o uso da promissória nas seguintes condições ilegais:',
      items: [
        'Cobrança de juros extorsivos superiores ao limite legal: Prática de agiotagem é crime contra a economia popular (Decreto 22.626/33) e anula os juros cobrados.',
        'Vinculada a contratos nulos ou de causa ilícita: A nota promissória não pode ser executada se for comprovado que teve origem em ilícito civil ou penal.'
      ],
      practicalRule:
        'Para vendas a prazo entre particulares, garantia de empréstimos mútuos legítimos e acordos de parcelamento, a nota promissória preenchida corretamente é o título de garantia mais rápido e poderoso do direito brasileiro.'
    }
  },

  'recibo-de-entrega-de-chaves': {
    legalDisclaimer: {
      badge: 'Fim da Locação',
      lawReference: 'Lei Federal nº 8.245/1991 e Código Civil Brasileiro',
      title: 'Validade do Termo de Entrega de Chaves do Imóvel',
      description:
        'A entrega formal das chaves atesta que o locatário devolveu a posse direta do imóvel ao locador. Ela encerra a responsabilidade do inquilino e de seus fiadores quanto aos aluguéis futuros, fixando o marco temporal da desocupação.'
    },
    commonErrors: {
      title: '4 Erros Graves na Entrega de Chaves do Imóvel',
      errors: [
        {
          number: 1,
          title: 'Deixar as chaves na portaria sem recibo assinado pelo dono',
          description:
            'Deixar as chaves na portaria sem termo assinado pelo proprietário ou imobiliária permite ao locador continuar cobrando os aluguéis dos meses seguintes até a imissão formal de posse.'
        },
        {
          number: 2,
          title: 'Não realizar a vistoria final conjunta no mesmo ato',
          description:
            'O locador deve realizar a vistoria final acompanhado do inquilino para apontar eventuais reparos antes que o imóvel sofra qualquer alteração posterior.'
        },
        {
          number: 3,
          title: 'Não anotar a medição dos relógios de água, luz e gás',
          description:
            'Registre os números das leituras finais dos medidores no termo para garantir a cobrança proporcional das faturas de consumo do período final.'
        },
        {
          number: 4,
          title: 'Achar que entregar as chaves perdoa débitos anteriores',
          description:
            'A entrega das chaves encerra novos aluguéis, mas não isenta o inquilino de aluguéis em atraso ou danos apurados no laudo de vistoria de saída.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar o Termo de Entrega de Chaves',
      description:
        'Não substitui procedimentos judiciais nas seguintes situações:',
      items: [
        'Imóvel abandonado com pertences deixados pelo inquilino: Exige pedido judicial de Imissão de Posse para arrombamento legal e inventário de bens deixados.',
        'Locatário que se recusa a assinar o termo de desocupação: Deve-se notificar extrajudicialmente via Cartório de Títulos e Documentos.'
      ],
      practicalRule:
        'Na entrega amigável de imóvel alugado, a assinatura deste termo é a certidão de óbito do contrato de locação e a paz jurídica do inquilino e do proprietário.'
    }
  },

  'recibo-de-montador-de-moveis': {
    legalDisclaimer: {
      badge: 'Contrato de Empreitada',
      lawReference: 'Artigos 610 a 626 do Código Civil e Art. 26 do CDC',
      title: 'Aviso Legal para Serviços de Montagem de Móveis',
      description:
        'O recibo de montador de móveis atesta a execução e conclusão da montagem nas dependências do cliente. O Código de Defesa do Consumidor concede 90 dias de garantia legal sobre a mão de obra prestada (nivelamento, regulagem de dobradiças e fixações).'
    },
    commonErrors: {
      title: '4 Erros Comuns ao Emitir Recibo de Montador de Móveis',
      errors: [
        {
          number: 1,
          title: 'Não inspecionar peças arranhadas antes da montagem',
          description:
            'Se a caixa do móvel tiver peças danificadas de fábrica, alerte o cliente antes de montar e anote no recibo para não ser responsabilizado por avarias da loja ou transporte.'
        },
        {
          number: 2,
          title: 'Não pedir conferência das portas e gavetas',
          description:
            'Sempre peça para o cliente abrir e fechar gavetas e portas na sua presença antes de assinar a quitação do recibo.'
        },
        {
          number: 3,
          title: 'Fixação em paredes com canos sem verificação prévia',
          description:
            'Ao furar paredes para painéis de TV ou armários suspensos, peça ao morador a confirmação de que não passam tubulações de água ou gás no alinhamento da furação.'
        },
        {
          number: 4,
          title: 'Não constar se a desmontagem estava inclusa',
          description:
            'Separe no recibo o valor da desmontagem do móvel antigo do valor da montagem do móvel novo.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar o Recibo Comum de Montador',
      description:
        'Evite usar este modelo simples nas seguintes situações:',
      items: [
        'Montagem industrial ou corporativa com exigência de Nota Fiscal: Lojas de departamento e grandes empresas com CNPJ exigem a emissão de NFS-e.',
        'Móveis planejados sob medida com fabricação própria: Exigem contrato prévio de marcenaria com projeto executivo 3D.'
      ],
      practicalRule:
        'Para montagens residenciais avulsas de móveis comprados na internet ou lojas físicas, este recibo assinado é a prova irrefutável de serviço concluído com excelência.'
    }
  },

  'recibo-de-instalador-de-ar-condicionado': {
    legalDisclaimer: {
      badge: 'Garantia de Climatização',
      lawReference: 'Artigo 26 do Código de Defesa do Consumidor (Lei 8.078/90)',
      title: 'Termo de Entrega Técnica e Garantia de Ar-Condicionado',
      description:
        'A instalação de aparelhos de climatização (Split e ACJ) exige protocolo técnico de estanqueidade e vácuo. Este recibo comprova a entrega do equipamento em pleno funcionamento e fixa a garantia legal de 90 dias sobre as conexões frigorígenas e a fiação de comando.'
    },
    commonErrors: {
      title: '4 Erros Fatais na Instalação de Ar-Condicionado',
      errors: [
        {
          number: 1,
          title: 'Não especificar se houve vácuo na linha frigorígena',
          description:
            'O teste de vácuo com vacuômetro digital é exigência de todos os fabricantes. Mencionar no recibo que o procedimento foi realizado protege o instalador perante assistências autorizadas.'
        },
        {
          number: 2,
          title: 'Não informar a metragem de tubulação de cobre instalada',
          description:
            'Fabricantes exigem distância mínima (geralmente de 2 a 3 metros) para evitar vibração excessiva no compressor. Registre a metragem no campo de descrição.'
        },
        {
          number: 3,
          title: 'Assumir garantia de defeito de fabricação do aparelho',
          description:
            'O instalador responde apenas pela mão de obra de fixação, tubos e gás. Deixe claro no recibo que defeitos eletrônicos ou mecânicos do motor são cobertos pelo fabricante.'
        },
        {
          number: 4,
          title: 'Não testar o dreno de condensado na frente do cliente',
          description:
            'Despeje água na bandeja evaporadora para testar o escoamento antes de colher a assinatura de quitação do cliente.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar Apenas este Recibo de Instalação',
      description:
        'Não substitui documentações regulatórias em casos específicos:',
      items: [
        'Edifícios comerciais com PMOC compulsório: Ambientes climatizados de uso coletivo exigem Plano de Manutenção, Operação e Controle assinado por engenheiro mecânico (Lei 13.589/18).',
        'Contratações corporativas com retenção de ISS: Empresas tomadoras exigem a Nota Fiscal de Serviços eletrônica (NFS-e).'
      ],
      practicalRule:
        'Para instalações residenciais de ar-condicionado direto para o proprietário ou inquilino, o recibo assinado garante segurança técnica e quitação imediata.'
    }
  },

  'recibo-de-gesseiro-e-drywall': {
    legalDisclaimer: {
      badge: 'Construção Civil',
      lawReference: 'Artigos 610 e seguintes do Código Civil Brasileiro',
      title: 'Aviso Legal de Medição e Quitação de Gesso e Drywall',
      description:
        'Este recibo formaliza a entrega e a medição de forros, molduras, sancas e divisórias em gesso acartonado. Ele comprova que a área em metros quadrados ou lineares foi conferida e aceita pelo contratante.'
    },
    commonErrors: {
      title: '4 Erros na Emissão do Recibo de Gesso e Drywall',
      errors: [
        {
          number: 1,
          title: 'Não discriminar a metragem quadrada (m²) medida',
          description:
            'Sempre coloque o total de m² executado no texto para evitar que o cliente tente renegociar o valor após a entrega.'
        },
        {
          number: 2,
          title: 'Não definir se os materiais foram fornecidos pelo gesseiro',
          description:
            'Deixe explícito se o preço inclui chapas de gesso, tabicas, tirantes e massa ou apenas a mão de obra de colocação.'
        },
        {
          number: 3,
          title: 'Não avisar sobre o tempo de secagem antes da pintura',
          description:
            'O gesso precisa de cura completa (7 a 15 dias) antes da primeira demão de tinta para não descascar. Alerte o cliente no recibo.'
        },
        {
          number: 4,
          title: 'Não colher o ateste de nivelamento do teto',
          description:
            'Verifique com laser ou nível bolha na presença do cliente antes de assinar a quitação definitiva.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar o Recibo Simples de Gesso',
      description:
        'Existem obras que demandam controle documental formal:',
      items: [
        'Grandes construtoras e incorporadoras: Exigem medições técnicas com emissão de Nota Fiscal Eletrônica e retenção previdenciária de INSS de mão de obra.',
        'Reformas estruturais em condomínios com ART/RRT: Condomínios que exigem laudo de arquiteto conforme a NBR 16280.'
      ],
      practicalRule:
        'Para reformas residenciais e comerciais diretas com donos de imóveis, o recibo com metragem e assinatura é a prova de execução perfeita.'
    }
  },

  'recibo-de-serralheiro': {
    legalDisclaimer: {
      badge: 'Serralheria e Estruturas',
      lawReference: 'Artigos 481 e 610 do Código Civil e Art. 26 do CDC',
      title: 'Aviso Legal de Entrega e Fabricação de Portões e Grades',
      description:
        'Comprovante civil de fabricação, montagem e instalação de estruturas metálicas. Garante ao serralheiro o recebimento do sinal de entrada para compra do ferro e a quitação do saldo após a instalação.'
    },
    commonErrors: {
      title: '4 Erros Graves ao Emitir Recibo de Serralheria',
      errors: [
        {
          number: 1,
          title: 'Não especificar as medidas e tipo de ferro empregado',
          description:
            'Indique se o portão é em chapa galvanizada, tubo quadrado ou ferro fundido para demonstrar que o material entregue confere com o orçamento.'
        },
        {
          number: 2,
          title: 'Não separar a venda mecânica da motorização eletrônica',
          description:
            'Se você fabricou o portão mas o motor foi fornecido por terceiro, declare no recibo que a garantia é restrita à parte mecânica e balanceamento.'
        },
        {
          number: 3,
          title: 'Não emitir recibo de sinal de entrada para compra do material',
          description:
            'Sempre emita o recibo no momento em que receber o adiantamento para compra do ferro na distribuidora.'
        },
        {
          number: 4,
          title: 'Não discriminar se a pintura definitiva está inclusa',
          description:
            'Deixe claro se o portão foi entregue apenas com zarcão/primer ou com esmalte sintético automotivo final.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar o Recibo Simples de Serralheria',
      description:
        'Casos com obrigatoriedade fiscal adicional:',
      items: [
        'Venda de esquadrias em série para lojas revendedoras: Exige emissão de NF-e com IPI e ICMS de indústria metalúrgica.',
        'Estruturas metálicas de grande vão com cálculo de engenharia: Galpões que exigem projeto assinado por engenheiro calculista com ART.'
      ],
      practicalRule:
        'Para portões residenciais basculantes, grades, corrimãos e reparos sob medida para particulares, este recibo garante segurança total.'
    }
  },

  'recibo-de-vidraceiro': {
    legalDisclaimer: {
      badge: 'Norma ABNT NBR 14207',
      lawReference: 'Artigo 26 do Código de Defesa do Consumidor e ABNT',
      title: 'Aviso Legal para Instalação de Vidros e Boxes',
      description:
        'O recibo de vidraçaria atesta a entrega de vidros temperados, laminados e espelhos instalados de acordo com as normas de segurança. A garantia legal cobre roldanas, perfis e vedação por 90 dias.'
    },
    commonErrors: {
      title: '4 Erros na Instalação de Vidros e Espelhos',
      errors: [
        {
          number: 1,
          title: 'Não anotar a espessura e cor do vidro no recibo',
          description:
            'Sempre indique no texto se o vidro instalado é de 6mm, 8mm ou 10mm, incolor, fumê ou verde.'
        },
        {
          number: 2,
          title: 'Não colher a assinatura atestando vidros intactos',
          description:
            'Certifique-se de que o cliente conferiu que não há lascas ou trincas nos cantos do vidro antes de assinar a quitação.'
        },
        {
          number: 3,
          title: 'Não orientar a cura do silicone antifungo',
          description:
            'Oriente o cliente a não utilizar o box de banheiro nas primeiras 24 horas para garantir a cura completa do silicone vedante.'
        },
        {
          number: 4,
          title: 'Não alertar sobre a revisão preventiva anual do box',
          description:
            'A norma NBR 14207 recomenda revisão de roldanas e batedores a cada 12 meses para prevenir quebras espontâneas.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar Apenas este Recibo de Vidro',
      description:
        'Situações que demandam documentação técnica suplementar:',
      items: [
        'Fechamento de sacadas em edifícios que exigem ART: Exige laudo técnico assinado por engenheiro mecânico registrado no CREA.',
        'Vidros antivandalismo e blindados para bancos: Regidos por certificação específica do Exército Brasileiro.'
      ],
      practicalRule:
        'Para boxes de banheiro, espelhos lapidados, portas blindex e janelas residenciais, este recibo confere respaldo ao profissional e tranquilidade ao cliente.'
    }
  },

  'recibo-de-calheiro': {
    legalDisclaimer: {
      badge: 'Funilaria e Calhas',
      lawReference: 'Artigos 610 a 626 do Código Civil Brasileiro',
      title: 'Aviso Legal para Instalação de Calhas e Rufos',
      description:
        'Comprovante civil de fabricação e montagem de calhas galvanizadas, pingadeiras e condutores. Comprova que o teste de caimento e vedação foi executado antes da quitação.'
    },
    commonErrors: {
      title: '4 Erros na Fabricação e Colocação de Calhas',
      errors: [
        {
          number: 1,
          title: 'Não discriminar a metragem linear total instalada',
          description:
            'Indique os metros lineares exatos das calhas e rufos para não haver divergência com a medição do telhado.'
        },
        {
          number: 2,
          title: 'Não especificar o tipo de chapa utilizada (ex: chapa 28 ou 26)',
          description:
            'Informar a espessura da chapa galvanizada prova que o material atende à resistência mecânica orçada.'
        },
        {
          number: 3,
          title: 'Não constar o teste de escoamento de água',
          description:
            'Faça o teste de queda dágua para garantir que não haverá acúmulo de água parada na calha antes de liberar o recibo.'
        },
        {
          number: 4,
          title: 'Não definir a responsabilidade pelo descarte das calhas velhas',
          description:
            'Alerte se o entulho de ferro enferrujado retirado foi descartado pelo cliente ou transportado pelo calheiro.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar este Recibo de Calhas',
      description:
        'Casos onde a legislação exige notas fiscais:',
      items: [
        'Fornecimento para grandes galpões industriais com exigência de NF-e corporativa.',
        'Obras públicas licitadas que exigem medição por boletim e certidões negativas de débito.'
      ],
      practicalRule:
        'Para residências, sítios e comércios locais, o recibo de calheiro assinado é a garantia de telhado protegido contra infiltrações.'
    }
  },

  'recibo-de-motoboy-e-entregador': {
    legalDisclaimer: {
      badge: 'Transporte e Motofrete',
      lawReference: 'Lei Federal nº 12.009/2009 e Art. 442-B da CLT',
      title: 'Aviso Legal de Quitação de Entregas e Motofrete',
      description:
        'Comprovante de pagamento de corridas de transporte rápido de mercadorias, documentos e encomendas. Atesta o recebimento da remuneração e a inexistência de subordinação contínua de emprego.'
    },
    commonErrors: {
      title: '4 Erros no Pagamento de Motoboys e Entregadores',
      errors: [
        {
          number: 1,
          title: 'Não discriminar a quantidade de entregas ou saídas',
          description:
            'Registre se o valor é por corrida avulsa, por quilômetro rodado ou diária fechada de entrega.'
        },
        {
          number: 2,
          title: 'Não exigir a assinatura do protocolo de entrega dos pacotes',
          description:
            'O recibo quita o frete, mas o protocolo assinado pelo destinatário prova que a mercadoria chegou ao destino.'
        },
        {
          number: 3,
          title: 'Deixar acumular pagamentos semanais sem assinatura',
          description:
            'Colha a assinatura no recibo em cada fechamento para evitar alegações de corridas não pagas.'
        },
        {
          number: 4,
          title: 'Não discriminar taxa de chuva ou sobretaxa noturna',
          description:
            'Se houver adicionais acordados, detalhe no texto para manter a clareza do repasse financeiro.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar o Recibo de Motoboy Avulso',
      description:
        'Situações em que há relação de emprego formal:',
      items: [
        'Entregador com horário fixo diário, obrigatoriedade de presença exclusiva e subordinação direta: Relação que configura vínculo de emprego regido pela CLT.',
        'Transporte de cargas perigosas ou inflamáveis sem credenciamento no Contran.'
      ],
      practicalRule:
        'Para motofretistas autônomos e entregas pontuais para empresas e comércios, o recibo assinado no fechamento confere total segurança financeira.'
    }
  },

  'recibo-de-guincho-e-reboque': {
    legalDisclaimer: {
      badge: 'Auto Socorro e Remoção',
      lawReference: 'Código Civil (Arts. 730 a 756) e Código de Trânsito Brasileiro',
      title: 'Aviso Legal de Remoção e Transporte de Veículos',
      description:
        'Comprovante de socorro mecânico e reboque rodoviário ou urbano em plataforma hidráulica. Serve como comprovante de despesa para reembolso de seguradoras e quitação de frete de veículos.'
    },
    commonErrors: {
      title: '4 Erros na Emissão do Recibo de Guincho',
      errors: [
        {
          number: 1,
          title: 'Não colocar a placa e modelo do veículo transportado',
          description:
            'A identificação completa do automóvel é indispensável para pedidos de reembolso em seguradoras e associações de proteção veicular.'
        },
        {
          number: 2,
          title: 'Omitir o trajeto (endereço de origem e destino)',
          description:
            'Descreva de onde o carro foi removido até onde foi entregue para comprovar a distância percorrida.'
        },
        {
          number: 3,
          title: 'Não apontar avarias anteriores na lataria do veículo',
          description:
            'Se o carro sofreu colisão prévia, mencione na descrição para afastar acusações de danos causados durante o içamento na prancha.'
        },
        {
          number: 4,
          title: 'Não conferir se a chave do veículo foi entregue à oficina',
          description:
            'Colha a assinatura de quem recebeu o carro no destino (mecânico ou proprietário).'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar este Recibo de Reboque',
      description:
        'Casos especiais que exigem outros documentos:',
      items: [
        'Veículos apreendidos por autoridade policial ou de trânsito em pátios públicos: Exigem liberação formal pelo Detran ou órgão municipal.',
        'Transporte interestadual de frotas com emissão obrigatória de Conhecimento de Transporte Eletrônico (CT-e) e MDF-e.'
      ],
      practicalRule:
        'Para remoções urbanas particulares de carros com pane ou colisão, este recibo é o documento oficial para acerto e reembolso.'
    }
  },

  'recibo-de-estetica-automotiva': {
    legalDisclaimer: {
      badge: 'Detailing Automotivo',
      lawReference: 'Artigo 26 do Código de Defesa do Consumidor e Código Civil',
      title: 'Termo de Entrega Técnica e Garantia de Estética Automotiva',
      description:
        'Comprovante de execução de polimento comercial/técnico, vitrificação cerâmica, descontaminação de pintura e higienização interna de veículos. Fixa os prazos de durabilidade e quitação.'
    },
    commonErrors: {
      title: '4 Erros Comuns em Estúdios de Estética Automotiva',
      errors: [
        {
          number: 1,
          title: 'Não discriminar a marca do vitrificador e tempo de proteção',
          description:
            'Se o serviço incluiu vitrificação 9H com garantia de 1 a 3 anos, o produto e a durabilidade devem constar expressamente no recibo.'
        },
        {
          number: 2,
          title: 'Não orientar sobre o tempo de cura antes da primeira lavagem',
          description:
            'A vitrificação exige até 7 dias sem lavagens agressivas com shampoo ácido/alcalino para fixar a ancoragem do produto.'
        },
        {
          number: 3,
          title: 'Não inspecionar a lataria na entrega com o cliente',
          description:
            'Aponte sob luz de inspeção que todos os hologramas foram eliminados e colha a assinatura no recibo.'
        },
        {
          number: 4,
          title: 'Omitir a placa e cor do veículo tratado',
          description:
            'Identifique claramente o carro no recibo para vincular o serviço àquele chassi e placa.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar o Recibo Simples de Detailing',
      description:
        'Casos corporativos:',
      items: [
        'Frotistas e concessionárias que exigem Nota Fiscal de Serviços eletrônica (NFS-e) para abatimento contábil de manutenção de frota.'
      ],
      practicalRule:
        'Para clientes particulares que buscam proteção e brilho para seus veículos, o recibo assinado é o certificado de garantia definitivo.'
    }
  },

  'recibo-de-personal-trainer': {
    legalDisclaimer: {
      badge: 'Profissional de Educação Física',
      lawReference: 'Lei Federal nº 9.696/1998 e Resoluções do CONFEF / CREF',
      title: 'Aviso Legal para Serviços de Personal Trainer',
      description:
        'Comprovante de remuneração de serviços de Educação Física e treinamento esportivo individualizado. O registro regular no Conselho Regional de Educação Física (CREF) é indispensável para validade ética e reembolsos.'
    },
    commonErrors: {
      title: '4 Erros ao Emitir Recibo de Personal Trainer',
      errors: [
        {
          number: 1,
          title: 'Não constar o número de registro do CREF',
          description:
            'A ausência do número do CREF no recibo inviabiliza pedidos de reembolso dos alunos perante planos de saúde e convênios corporativos.'
        },
        {
          number: 2,
          title: 'Não especificar a quantidade de aulas contratadas no mês',
          description:
            'Discrimine se a mensalidade contempla 2x, 3x ou 5x na semana, e a duração de cada sessão (ex: 60 minutos).'
        },
        {
          number: 3,
          title: 'Não definir a política de desmarcações e reposições',
          description:
            'Insira no recibo ou contrato que faltas sem aviso prévio de 24 horas não dão direito à reposição de aula.'
        },
        {
          number: 4,
          title: 'Esquecer de declarar no Carnê-Leão da Receita Federal',
          description:
            'Personal trainers autônomos que recebem de pessoas físicas devem lançar os recibos no Carnê-Leão mensalmente.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar o Recibo de Personal Autônomo',
      description:
        'Situações em que há relação institucional:',
      items: [
        'Aulas ministradas como instrutor contratado de academia sob CLT: Devem ser pagas mediante folha de salário da empresa.',
        'Atuação sem registro ativo no CREF: O exercício da profissão de Educação Física sem registro constitui contravenção penal de exercício ilegal de profissão.'
      ],
      practicalRule:
        'Para personal trainers autônomos atendendo alunos em academias, condomínios ou residências, este recibo cumpre todos os requisitos fiscais e de reembolso.'
    }
  },

  'recibo-de-chaveiro': {
    legalDisclaimer: {
      badge: 'Segurança Patrimonial',
      lawReference: 'Artigo 26 do Código de Defesa do Consumidor e Código Civil',
      title: 'Aviso Legal para Serviços de Chaveiro',
      description:
        'Comprovante de abertura técnica de fechaduras, cópias de chaves codificadas e substituição de cilindros de segurança. Comprova quem solicitou a intervenção e a quitação do serviço prestado.'
    },
    commonErrors: {
      title: '4 Erros na Emissão do Recibo de Chaveiro',
      errors: [
        {
          number: 1,
          title: 'Não conferir a identidade de quem contratou a abertura',
          description:
            'Exija documento com foto do morador ou condutor antes de abrir a porta para se resguardar contra invasões de domicílio ou furtos.'
        },
        {
          number: 2,
          title: 'Não anotar a quantidade de cópias de chaves entregues',
          description:
            'Discrimine quantas chaves foram fornecidas e testadas na presença do cliente.'
        },
        {
          number: 3,
          title: 'Não indicar a marca e modelo da fechadura trocada',
          description:
            'Informar a marca (Pado, Yale, Papaiz, Stam, Aliança) comprova a qualidade da peça de reposição utilizada.'
        },
        {
          number: 4,
          title: 'Não testar a abertura interna e externa antes de sair',
          description:
            'Certifique-se de que a lingueta e trancas correm suaves sem prender na contra-testa do batente.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar o Recibo de Chaveiro',
      description:
        'Situações de risco legal:',
      items: [
        'Aberturas de portas judiciais sem mandado: Aberturas de imóveis litigiosos exigem ordem judicial expressa e acompanhamento de Oficial de Justiça.'
      ],
      practicalRule:
        'Para aberturas residenciais e automotivas convencionais, trocas de segredo e cópias de chaves, o recibo assinado garante respaldo total.'
    }
  },

  'recibo-de-lavagem-de-estofados': {
    legalDisclaimer: {
      badge: 'Higienização Têxtil',
      lawReference: 'Artigos 593 e seguintes do Código Civil e Art. 26 do CDC',
      title: 'Aviso Legal para Lavagem e Impermeabilização de Estofados',
      description:
        'Comprovante de higienização por extração e aplicação de protetores de tecidos. Comprova a entrega dos estofados limpos e fixa as condições de secagem e garantia da blindagem impermeabilizante.'
    },
    commonErrors: {
      title: '4 Erros na Higienização e Blindagem de Sofás',
      errors: [
        {
          number: 1,
          title: 'Não apontar manchas profundas pré-existentes',
          description:
            'Manchas antigas de gordura ou queimaduras químicas que não saem 100% devem ser registradas no recibo antes do início do procedimento.'
        },
        {
          number: 2,
          title: 'Não alertar o tempo de secagem (6 a 12 horas)',
          description:
            'Oriente o cliente a manter o ambiente ventilado e não cobrir o sofá com mantas antes da secagem completa.'
        },
        {
          number: 3,
          title: 'Não especificar o tipo de produto impermeabilizante usado',
          description:
            'Utilize apenas produtos não inflamáveis registrados na Anvisa e anote no recibo para segurança contra riscos de incêndio.'
        },
        {
          number: 4,
          title: 'Não demonstrar o teste de repelência com gotas de água',
          description:
            'Faça o teste de gotas dágua na frente do cliente após a secagem para atestar o efeito lótus da impermeabilização.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar este Recibo de Estofados',
      description:
        'Situações em que é necessária documentação fiscal:',
      items: [
        'Higienização de frotas de ônibus ou aeronaves: Exige laudo químico e Nota Fiscal Eletrônica de prestação de serviços.'
      ],
      practicalRule:
        'Para lavagem e impermeabilização residencial de sofás, poltronas e colchões, este recibo confere garantia e profissionalismo.'
    }
  },

  'recibo-de-tatuador': {
    legalDisclaimer: {
      badge: 'Biossegurança e Arte',
      lawReference: 'Normas da Vigilância Sanitária (Anvisa) e Código Civil',
      title: 'Aviso Legal para Serviços de Tatuagem e Body Piercing',
      description:
        'Comprovante de remuneração de serviços artísticos de tatuagem e perfurações corporais. Atesta a realização do procedimento com insumos estéreis e descartáveis em conformidade sanitária.'
    },
    commonErrors: {
      title: '4 Erros Críticos no Estúdio de Tatuagem',
      errors: [
        {
          number: 1,
          title: 'Não exigir a assinatura do Termo de Consentimento e Saúde',
          description:
            'O recibo quita o valor financeiro, mas a ficha de anamnese assinada com perguntas sobre alergias, hepatite e gravidez é indispensável.'
        },
        {
          number: 2,
          title: 'Não discriminar sinal de reserva e valor da sessão',
          description:
            'Deixe claro no texto se o valor recebido é o sinal não reembolsável para criação do desenho ou o pagamento da sessão executada.'
        },
        {
          number: 3,
          title: 'Não fornecer as instruções escritas de pós-cuidados',
          description:
            'Entregue as orientações de higienização com sabonete neutro e uso de pomada para afastar acusações de infecções causadas por descuido do cliente.'
        },
        {
          number: 4,
          title: 'Tatuar menores de idade sem autorização legal',
          description:
            'Certifique-se da maioridade do cliente ou da autorização formal com firma reconhecida dos pais conforme a lei estadual aplicável.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Emitir Apenas o Recibo de Tatuagem',
      description:
        'Exigências mandatórias:',
      items: [
        'O recibo não substitui o Termo de Responsabilidade e Consentimento Informado exigido pela Vigilância Sanitária.'
      ],
      practicalRule:
        'Para tatuadores e body piercers autônomos, este recibo emitido a clientes particulares formaliza a quitação com máxima seriedade.'
    }
  },

  'recibo-de-limpeza-pos-obra': {
    legalDisclaimer: {
      badge: 'Limpeza Técnica Especializada',
      lawReference: 'Artigos 593 a 609 do Código Civil Brasileiro',
      title: 'Aviso Legal de Entrega e Vistoria de Limpeza Pós-Obra',
      description:
        'Comprovante de execução de faxina técnica pós-reforma com remoção de incrustações, respingos de tinta e pó de gesso. Comprova que os pisos e vidros foram entregues vistoriados e íntegros.'
    },
    commonErrors: {
      title: '4 Erros na Limpeza Pós-Obra',
      errors: [
        {
          number: 1,
          title: 'Não fazer a vistoria prévia de riscos em vidros e pisos',
          description:
            'Vidros e porcelanatos frequentemente já chegam riscados pelos pedreiros. Registre no recibo que os danos anteriores foram apontados na entrada.'
        },
        {
          number: 2,
          title: 'Usar ácidos em porcelanatos sem teste de mancha',
          description:
            'Removedores ácidos atacam o esmalte do porcelanato polido. Use apenas produtos neutros ou alcalinos específicos pós-obra.'
        },
        {
          number: 3,
          title: 'Não estipular a metragem quadrada do imóvel atendido',
          description:
            'Informe a área do imóvel no texto para justificar o valor da diária técnica da equipe.'
        },
        {
          number: 4,
          title: 'Não colher a assinatura da vistoria final de saída',
          description:
            'Peça para o proprietário ou arquiteto assinar o recibo no local após checar a limpeza de rodapés, esquadrias e vidraças.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar o Recibo Simples de Limpeza Técnica',
      description:
        'Grandes empreendimentos:',
      items: [
        'Limpeza de entregas de torres prediais para incorporadoras: Exigem medição por lote e emissão obrigatória de Nota Fiscal de Serviços.'
      ],
      practicalRule:
        'Para apartamentos e casas residenciais recém-reformadas, este recibo assinado no término do serviço encerra a obra com chave de ouro.'
    }
  },

  'recibo-de-diaria-de-garcom': {
    legalDisclaimer: {
      badge: 'Serviço Eventual',
      lawReference: 'Artigo 442-B da CLT (Trabalho Autônomo Eventual)',
      title: 'Aviso Legal de Diária de Garçom e Equipe de Eventos',
      description:
        'Comprovante civil de remuneração de diária avulsa de garçom, copeiro ou barman para eventos sociais pontuais. Atesta o pagamento imediato e a ausência de subordinação contínua de emprego.'
    },
    commonErrors: {
      title: '4 Erros no Pagamento de Garçons Avulsos',
      errors: [
        {
          number: 1,
          title: 'Não colher a assinatura no término da festa',
          description:
            'Nunca deixe para pagar ou colher a assinatura no dia seguinte. Diária de evento cumprida deve ser paga e assinada na saída da equipe.'
        },
        {
          number: 2,
          title: 'Não discriminar a carga horária trabalhada',
          description:
            'Mencione quantas horas durou o atendimento (ex: 6 horas de plantão) para comprovar a inexistência de horas extras pendentes.'
        },
        {
          number: 3,
          title: 'Não incluir ajuda de custo de transporte e alimentação',
          description:
            'Se você pagou o transporte ou forneceu a refeição, declare no recibo para afastar questionamentos trabalhistas.'
        },
        {
          number: 4,
          title: 'Contratar o mesmo garçom com habitualidade semanal',
          description:
            'Trabalho semanal contínuo no mesmo restaurante gera risco de vínculo CLT. O recibo de diária destina-se a eventos avulsos.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar o Recibo de Diária de Garçom',
      description:
        'Restaurantes e bares comerciais:',
      items: [
        'Garçons que cumprem escala fixa semanal em bares e restaurantes: Devem ser registrados em carteira de trabalho ou sob contrato de trabalho intermitente (Art. 452-A da CLT).'
      ],
      practicalRule:
        'Para casamentos, aniversários, churrascos e eventos particulares de finais de semana, este recibo é a quitação perfeita da equipe.'
    }
  },

  'recibo-de-churrasqueiro': {
    legalDisclaimer: {
      badge: 'Gastronomia em Eventos',
      lawReference: 'Artigos 593 e seguintes do Código Civil Brasileiro',
      title: 'Aviso Legal para Serviços de Churrasqueiro em Festas',
      description:
        'Comprovante de prestação de serviços culinários especializados para eventos particulares e corporativos. Atesta a realização do serviço de assador e quitação integral.'
    },
    commonErrors: {
      title: '4 Erros Comuns ao Contratar Churrasqueiro',
      errors: [
        {
          number: 1,
          title: 'Não definir o horário de início e término do serviço',
          description:
            'Estabeleça no recibo a duração do atendimento (ex: das 12h às 17h) e o valor acordado caso o cliente solicite horas extras.'
        },
        {
          number: 2,
          title: 'Não discriminar se os insumos foram comprados pelo cliente',
          description:
            'Deixe claro que o valor refere-se exclusivamente à mão de obra de assador profissional, tendo o cliente fornecido carnes e carvão.'
        },
        {
          number: 3,
          title: 'Não cobrar sinal para reserva da data',
          description:
            'Churrasqueiros devem sempre emitir recibo do sinal de agendamento de 30% a 50% para garantir a reserva do fim de semana.'
        },
        {
          number: 4,
          title: 'Não combinar a limpeza da grelha na saída',
          description:
            'Alerte na contratação se o churrasqueiro entrega a bancada e espetos limpos ao encerrar o corte das carnes.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar o Recibo de Churrasqueiro',
      description:
        'Casos comerciais:',
      items: [
        'Trabalho diário em churrascarias ou restaurantes comerciais com subordinação direta (exige carteira de trabalho assinada).'
      ],
      practicalRule:
        'Para confraternizações residenciais, chácaras e festas particulares, o recibo assinado garante a tranquilidade do churrasqueiro e dos anfitriões.'
    }
  },

  'recibo-de-seguranca-de-eventos': {
    legalDisclaimer: {
      badge: 'Vigilância Desarmada',
      lawReference: 'Lei Federal nº 7.102/1983 e Art. 442-B da CLT',
      title: 'Aviso Legal para Segurança e Controle de Portaria em Eventos',
      description:
        'Comprovante de pagamento de serviços autônomos de recepção, fiscalização de acesso e segurança patrimonial preventiva desarmada em eventos sociais privados.'
    },
    commonErrors: {
      title: '4 Erros na Contratação de Segurança para Festas',
      errors: [
        {
          number: 1,
          title: 'Não discriminar a natureza desarmada da atividade',
          description:
            'Sempre declare no texto que o serviço prestado foi de vigilância e fiscalização de acesso desarmada, em estrita conformidade com a lei.'
        },
        {
          number: 2,
          title: 'Omitir o horário exato da jornada cumprida',
          description:
            'Registre o horário de início e término do plantão (ex: das 21h às 04h) para comprovar a quitação total da diária.'
        },
        {
          number: 3,
          title: 'Não colher a assinatura no término do evento',
          description:
            'Realize o pagamento e colha a assinatura no recibo na liberação da equipe ao final da festa.'
        },
        {
          number: 4,
          title: 'Não fornecer água e alimentação durante plantões longos',
          description:
            'Declare no recibo que as condições acordadas de alimentação e repouso foram cumpridas satisfatoriamente.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar este Recibo de Segurança',
      description:
        'Situações vedadas:',
      items: [
        'Vigilância armada ou transporte de valores (atividade privativa de empresas de segurança privada autorizadas pelo Departamento de Polícia Federal).',
        'Vigilância contínua diária em condomínios (exige contratação formal sob a CLT).'
      ],
      practicalRule:
        'Para eventos privados, formaturas, aniversários e casamentos, o recibo de diária assinado confere respaldo jurídico absoluto aos contratantes.'
    }
  },

  'recibo-de-musico-e-dj': {
    legalDisclaimer: {
      badge: 'Cachê Artístico',
      lawReference: 'Lei Federal nº 6.533/1978 (Profissão de Artista) e Código Civil',
      title: 'Aviso Legal de Quitação de Cachê Musical e Sonorização',
      description:
        'Comprovante de remuneração de apresentação artística musical, performance ao vivo ou discotecagem de DJ. Comprova o cumprimento do tempo de palco e a quitação do cachê acordado.'
    },
    commonErrors: {
      title: '4 Erros no Pagamento de Músicos e DJs',
      errors: [
        {
          number: 1,
          title: 'Não especificar a duração da apresentação (tempo de show)',
          description:
            'Mencione quantas horas durou o show ou discotecagem (ex: 3 horas de apresentação com intervalo de 15 minutos).'
        },
        {
          number: 2,
          title: 'Não discriminar se o som e iluminação estavam inclusos',
          description:
            'Deixe claro se o artista forneceu apenas sua voz e instrumentos ou se também levou PA, caixas de som e iluminação.'
        },
        {
          number: 3,
          title: 'Não cobrar sinal para segurar a data na agenda',
          description:
            'Artistas devem cobrar de 30% a 50% de sinal de reserva para garantir a data do show na agenda do fim de semana.'
        },
        {
          number: 4,
          title: 'Achar que o recibo do músico quita a taxa do ECAD',
          description:
            'O recibo quita apenas o cachê do profissional; o recolhimento de direitos autorais do ECAD cabe ao organizador do evento.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar o Recibo Simples de Cachê',
      description:
        'Grandes produções:',
      items: [
        'Contratações artísticas por órgãos públicos com verba de prefeitura ou governo: Exigem emissão obrigatória de Nota Fiscal de Serviços e certidões negativas.'
      ],
      practicalRule:
        'Para apresentações em bares, casamentos, aniversários e festas particulares, este recibo formaliza o cachê artístico com rapidez e fé pública.'
    }
  },

  'recibo-de-animador-de-festas': {
    legalDisclaimer: {
      badge: 'Recreação Infantil',
      lawReference: 'Artigos 593 e seguintes do Código Civil Brasileiro',
      title: 'Aviso Legal para Serviços de Animação e Recreação',
      description:
        'Comprovante de realização de atividades lúdicas, gincanas, maquiagem artística e esculturas em balões para festas de aniversário. Formaliza a quitação da equipe de recreação.'
    },
    commonErrors: {
      title: '4 Erros Comuns na Recreação Infantil',
      errors: [
        {
          number: 1,
          title: 'Não especificar as atividades contratadas',
          description:
            'Liste no texto se foram realizadas brincadeiras com bola, caça ao tesouro, pintura facial e esculturas de bexigas.'
        },
        {
          number: 2,
          title: 'Usar maquiagens e tintas não hipoalergênicas',
          description:
            'Declare no recibo que as tintas faciais são atóxicas e aprovadas pela Anvisa para evitar alegações de alergias em crianças.'
        },
        {
          number: 3,
          title: 'Não definir a quantidade de recreadores presentes',
          description:
            'Informar o tamanho da equipe no recibo comprova a proporcionalidade de monitores por quantidade de crianças na festa.'
        },
        {
          number: 4,
          title: 'Não estipular a taxa de hora adicional caso a festa atrase',
          description:
            'Deixe acordado o valor da hora extra de recreação caso os pais peçam para estender a brincadeira até mais tarde.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar o Recibo de Recreação',
      description:
        'Eventos corporativos de grande porte:',
      items: [
        'Contratos com shoppings centers e grandes empresas que exigem emissão de NFS-e e seguro de responsabilidade civil para eventos.'
      ],
      practicalRule:
        'Para aniversários infantis residenciais e salões de festas, este recibo emitido aos pais garante tranquilidade financeira total.'
    }
  },

  'recibo-de-adestrador-de-caes': {
    legalDisclaimer: {
      badge: 'Comportamento Canino',
      lawReference: 'Artigos 593 a 609 do Código Civil Brasileiro',
      title: 'Aviso Legal de Adestramento Canino e Dog Walking',
      description:
        'Comprovante de prestação de serviços de adestramento comportamental, aulas de obediência e passeios diários. Atesta a aplicação de metodologia técnica e a quitação do pacote contratado.'
    },
    commonErrors: {
      title: '4 Erros no Adestramento e Passeio de Cães',
      errors: [
        {
          number: 1,
          title: 'Não identificar o nome e raça do animal no recibo',
          description:
            'Vincule o serviço ao cão específico para comprovar perante o tutor o histórico das aulas ministradas.'
        },
        {
          number: 2,
          title: 'Não registrar a quantidade de aulas do pacote',
          description:
            'Discrimine quantas aulas práticas foram contratadas no mês (ex: 8 aulas semanais de 50 minutos).'
        },
        {
          number: 3,
          title: 'Não alertar que o tutor precisa praticar os comandos em casa',
          description:
            'Alerte no texto que o adestramento é um processo contínuo que depende da cooperação de toda a família no domicílio.'
        },
        {
          number: 4,
          title: 'Dog Walkers sem confirmação de vacinação do cão',
          description:
            'Certifique-se de que o animal possui vacina antirrábica e polivalente (V10) em dia antes de realizar passeios em vias públicas.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar o Recibo de Adestrador',
      description:
        'Situações médicas:',
      items: [
        'Procedimentos cirúrgicos ou tratamentos de saúde animal (atividade privativa de médicos veterinários com CRMV ativo).'
      ],
      practicalRule:
        'Para adestradores e passeadores autônomos que atendem famílias e tutores de pets, este recibo confere respaldo profissional indiscutível.'
    }
  },

  'recibo-de-manutencao-de-portao-eletronico': {
    legalDisclaimer: {
      badge: 'Automação Predial',
      lawReference: 'Artigo 26 do Código de Defesa do Consumidor e Código Civil',
      title: 'Aviso Legal de Assistência Técnica de Portões Eletrônicos',
      description:
        'Comprovante de manutenção corretiva, substituição de peças, motores e centrais de comando em portões automáticos. Fixa a garantia legal de 90 dias nas peças instaladas e na mão de obra.'
    },
    commonErrors: {
      title: '4 Erros na Manutenção de Motores de Portão',
      errors: [
        {
          number: 1,
          title: 'Não listar os componentes substituídos (ex: placa, capacitor, cremalheira)',
          description:
            'Discriminar exatamente o que foi trocado prova a transparência do orçamento e a origem das peças novas.'
        },
        {
          number: 2,
          title: 'Não testar a trava de segurança anti-esmagamento na presença do cliente',
          description:
            'Verifique se o sensor antiesmagamento e o freio do motor estão funcionando perfeitamente antes de colher a assinatura.'
        },
        {
          number: 3,
          title: 'Não informar a quantidade de controles codificados e entregues',
          description:
            'Anote no recibo quantos controles remotos novos foram programados e entregues ao morador ou síndico.'
        },
        {
          number: 4,
          title: 'Não ressalvar queimas decorrentes de raios e tempestades',
          description:
            'Alerte que descargas elétricas atmosféricas na rede pública não são cobertas pela garantia do fabricante da placa.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar o Recibo Simples de Portão',
      description:
        'Grandes contratos:',
      items: [
        'Contratos mensais de manutenção preventiva de condomínios com exigência de emissão compulsória de Nota Fiscal Eletrônica (NFS-e).'
      ],
      practicalRule:
        'Para manutenções emergenciais e reparos avulsos em residências e pequenos condomínios, o recibo assinado garante a quitação e a segurança do serviço.'
    }
  },

  'recibo-de-dedetizacao': {
    legalDisclaimer: {
      badge: 'Controle de Pragas',
      lawReference: 'RDC nº 52/2009 da Anvisa e Código de Defesa do Consumidor',
      title: 'Aviso Legal e Garantia de Dedetização e Controle de Pragas',
      description:
        'Comprovante de execução de controle químico de pragas urbanas (desinsetização, desratização e descupinização). Fixa o prazo de assistência técnica garantida e as orientações de biossegurança.'
    },
    commonErrors: {
      title: '4 Erros Graves na Emissão do Recibo de Dedetização',
      errors: [
        {
          number: 1,
          title: 'Não constar o tempo mínimo de afastamento do imóvel',
          description:
            'Alerte no texto que pessoas, crianças e animais domésticos devem permanecer fora do local pelo período orientado pelo químico responsável (geralmente de 4 a 12 horas).'
        },
        {
          number: 2,
          title: 'Não discriminar quais pragas foram combatidas',
          description:
            'Indique se o serviço combateu baratas, formigas, cupins de madeira, escorpiões ou roedores, evitando cobranças de pragas não tratadas.'
        },
        {
          number: 3,
          title: 'Não especificar o prazo de assistência garantida',
          description:
            'Informe claramente se a garantia de reforço pontual é de 3 meses, 6 meses ou 1 ano a contar da aplicação.'
        },
        {
          number: 4,
          title: 'Não orientar sobre a limpeza de superfícies após o retorno',
          description:
            'Oriente sobre a limpeza de bancadas de alimentos com pano úmido e descarte de materiais contaminados.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar Apenas o Recibo de Dedetização',
      description:
        'Comércio de alimentos e indústrias:',
      items: [
        'Restaurantes, padarias, hospitais e cozinhas industriais exigem obrigatoriamente o Certificado de Desinsetização assinado pelo Responsável Técnico químico/biólogo (CRQ/CRBio) perante a Vigilância Sanitária.'
      ],
      practicalRule:
        'Para dedetizações em residências, condomínios particulares e chácaras, este recibo emitido pelo aplicador atesta a quitação e o prazo de garantia contratado.'
    }
  },

  'recibo-de-tapeceiro': {
    legalDisclaimer: {
      badge: 'Tapeçaria Artesanal',
      lawReference: 'Artigo 26 do Código de Defesa do Consumidor e Código Civil',
      title: 'Aviso Legal para Serviços de Tapeçaria e Reforma de Sofás',
      description:
        'Comprovante civil de reforma de móveis estofados, substituição de tecidos, costuras e espumas. Assegura a quitação do sinal para compra dos insumos e a entrega técnica do estofado renovado.'
    },
    commonErrors: {
      title: '4 Erros Comuns na Reforma de Sofás e Tapeçaria',
      errors: [
        {
          number: 1,
          title: 'Não especificar o código e tipo do tecido aprovado pelo cliente',
          description:
            'Registre o nome do tecido (ex: Linho Bege ref. 104) para comprovar que a forração coincide com a amostra escolhida no mostruário.'
        },
        {
          number: 2,
          title: 'Não discriminar a densidade da espuma instalada',
          description:
            'Mencione a densidade da espuma substituída (ex: D28 ou D33) para atestar a firmeza e qualidade estrutural do assento.'
        },
        {
          number: 3,
          title: 'Não emitir recibo do sinal para compra do tecido',
          description:
            'Tapeceiros devem sempre formalizar o recebimento do sinal de entrada que custeia a compra dos metros de tecido e insumos.'
        },
        {
          number: 4,
          title: 'Não registrar pequenas avarias na madeira ao retirar o móvel',
          description:
            'Se a carcaça de madeira do sofá já apresentava pés quebrados ou cupim ao ser recolhido na casa do cliente, anote no recibo inicial.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar o Recibo Simples de Tapeceiro',
      description:
        'Casos especiais:',
      items: [
        'Revestimento de estofados aeronáuticos ou navais com exigência de tecidos antichamas certificados pela ANAC/Marinha do Brasil.'
      ],
      practicalRule:
        'Para sofás, poltronas, cadeiras de jantar e cabeceiras residenciais sob medida, o recibo assinado é a garantia da arte e da durabilidade do móvel.'
    }
  },

  'recibo-de-telhadista': {
    legalDisclaimer: {
      badge: 'Construção e Telhados',
      lawReference: 'Artigos 610 a 626 do Código Civil Brasileiro',
      title: 'Aviso Legal para Serviços de Telhadista e Conserto de Telhados',
      description:
        'Comprovante de execução de reparos em coberturas residenciais, troca de telhas trincadas, impermeabilização e alinhamento de madeiramento. Formaliza a entrega do telhado estanque e sem vazamentos.'
    },
    commonErrors: {
      title: '4 Erros na Manutenção de Telhados e Coberturas',
      errors: [
        {
          number: 1,
          title: 'Não detalhar os pontos reparados no telhado',
          description:
            'Indique se o conserto foi realizado nas cumeeiras, espigões, águas-furtadas ou troca pontual de telhas quebradas.'
        },
        {
          number: 2,
          title: 'Não definir se os materiais foram fornecidos pelo telhadista',
          description:
            'Esclareça se as telhas cerâmicas/esmaltadas e argamassas foram custeadas pelo cliente ou se estavam inclusas no preço total.'
        },
        {
          number: 3,
          title: 'Não realizar o teste com mangueira dágua antes de descer',
          description:
            'Simule a chuva nos pontos consertados e confira a ausência de pingueiras no forro antes de colher a assinatura do proprietário.'
        },
        {
          number: 4,
          title: 'Não alertar sobre a fragilidade de telhas antigas',
          description:
            'Alerte se o telhado possui telhas ressecadas pelo tempo que demandam cautela de circulação.'
        }
      ]
    },
    whenNotToUse: {
      title: 'Quando NÃO Usar o Recibo Simples de Telhadista',
      description:
        'Grandes coberturas industriais:',
      items: [
        'Instalação de galpões com estruturas metálicas pesadas que exigem projeto estrutural com ART registrada no CREA.'
      ],
      practicalRule:
        'Para consertos de goteiras, troca de telhas e reformas residenciais, este recibo assinado garante a quitação e comprova a entrega técnica sem infiltrações.'
    }
  }
};

/**
 * Retorna o guia específico ou monta um guia rico e contextualizado para qualquer modelo de recibo.
 */
export function getReceiptGuide(slug: string, title: string): ReceiptGuide {
  if (specificReceiptGuides[slug]) {
    return specificReceiptGuides[slug];
  }

  const cleanTitle = title.replace(/^recibo\s*(de\s*|para\s*|com\s*)?/i, '').trim();

  return {
    legalDisclaimer: {
      badge: 'Validade Probatória',
      lawReference: 'Artigos 319 e 320 da Lei Federal nº 10.406/2002 (Código Civil)',
      title: `Aviso Legal e Segurança Jurídica: ${title}`,
      description:
        `O presente documento possui plena validade probatória de quitação civil em todo o território nacional. Ele comprova que a quantia estipulada para ${title.toLowerCase()} foi efetivamente recebida pelo credor, liberando o pagador de cobranças futuras duplicadas. Para operações com exigência fiscal contábil compulsória, certifique-se da necessidade de documentação complementar.`
    },
    commonErrors: {
      title: `4 Erros Fatais ao Emitir ${title} (e Como Evitar)`,
      errors: [
        {
          number: 1,
          title: 'Não preencher o valor por extenso',
          description:
            'O valor por extenso é a proteção máxima contra rasuras e acréscimos indevidos. Nosso gerador preenche o extenso automaticamente para garantir total blindagem.'
        },
        {
          number: 2,
          title: 'Omitir a assinatura de quem recebeu o dinheiro',
          description:
            'Sem a assinatura física com caneta ou assinatura digital do recebedor, o documento não possui força de quitação perante a legislação civil.'
        },
        {
          number: 3,
          title: 'Usar descrições vagas e genéricas',
          description:
            'Descreva minuciosamente a causa do pagamento no campo "Referente a", evitando termos ambíguos que dificultem a prova em eventuais cobranças indevidas.'
        },
        {
          number: 4,
          title: 'Não salvar uma cópia física ou digital em PDF',
          description:
            'Mantenha sempre uma via assinada guardada em local seguro ou na nuvem pelo prazo mínimo prescricional de 5 anos.'
        }
      ]
    },
    whenNotToUse: {
      title: `Quando NÃO Usar o ${title}`,
      description:
        `Embora este recibo seja ideal e seguro para a comprovação de ${cleanTitle || 'pagamentos'}, existem situações regulatórias que exigem instrumentos próprios:`,
      items: [
        'Operações comerciais de venda com incidência de ICMS por empresas: Exigem emissão obrigatória de Nota Fiscal Eletrônica (NF-e).',
        'Contratações sob regime CLT com subordinação direta: Relações empregatícias exigem folha de pagamento oficial (holerite) e recolhimentos de FGTS/INSS.',
        'Transferência solene de bens imóveis de grande valor: O Artigo 108 do Código Civil exige Escritura Pública lavrada em Cartório de Notas.'
      ],
      practicalRule:
        `Para prestadores autônomos, profissionais liberais, MEI e acertos particulares entre pessoas físicas, o ${title} emitido nesta plataforma cumpre todos os requisitos legais para quitação incontestável.`
    }
  };
}
