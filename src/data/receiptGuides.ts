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
