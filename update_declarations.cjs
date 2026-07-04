const fs = require('fs');
let code = fs.readFileSync('src/components/DeclarationGenerator.tsx', 'utf-8');

const replacement = `
      case "dependencia-economica":
        return (
          <>
            <p className="text-justify leading-loose mb-6">
              Eu, <strong>{data.declaranteNome || "[Nome do Titular]"}</strong>, {data.declaranteNacionalidade || "[nacionalidade]"}, {data.declaranteEstadoCivil || "[estado civil]"}, {data.declaranteProfissao || "[profissão]"}, portador(a) do RG nº {data.declaranteRg || "[RG]"} e inscrito(a) no CPF sob o nº {data.declaranteCpf || "[CPF]"}, residente e domiciliado(a) na {data.endereco || "[Endereço]"}, nº {data.numero || "[Número]"}, Bairro {data.bairro || "[Bairro]"}, na cidade de {data.cidade || "[Cidade]"} / {data.estado || "[UF]"},
            </p>
            <p className="text-justify leading-loose font-bold mb-6">
              DECLARO, sob as penas da Lei nº 7.115/1983 e do art. 299 do Código Penal, para fins de comprovação de dependência econômica, que:
            </p>
            <p className="text-justify leading-loose mb-6">
              O(a) Sr(a). <strong>{data.declarante2Nome || "[Nome do Dependente]"}</strong>, {data.declarante2Nacionalidade || "[nacionalidade do dependente]"}, {data.declarante2EstadoCivil || "[estado civil do dependente]"}, portador(a) do RG nº {data.declarante2Rg || "[RG do dependente]"} e CPF nº {data.declarante2Cpf || "[CPF do dependente]"}, vive sob minha dependência econômica, não possuindo rendimentos próprios suficientes para a sua manutenção.
            </p>
            <p className="text-justify leading-loose mb-6">
              Por ser a expressão da verdade, assumindo inteira responsabilidade pelas declarações acima, firmo o presente termo.
            </p>
          </>
        );
      case "bons-antecedentes":
        return (
          <>
            <p className="text-justify leading-loose mb-6">
              Eu, <strong>{data.declaranteNome || "[Nome Completo]"}</strong>, {data.declaranteNacionalidade || "[nacionalidade]"}, {data.declaranteEstadoCivil || "[estado civil]"}, {data.declaranteProfissao || "[profissão]"}, portador(a) do RG nº {data.declaranteRg || "[RG]"} e inscrito(a) no CPF sob o nº {data.declaranteCpf || "[CPF]"}, residente e domiciliado(a) na {data.endereco || "[Endereço]"}, nº {data.numero || "[Número]"}, Bairro {data.bairro || "[Bairro]"}, na cidade de {data.cidade || "[Cidade]"} / {data.estado || "[UF]"},
            </p>
            <p className="text-justify leading-loose font-bold mb-6">
              DECLARO, para os devidos fins de direito e sob as penas da Lei (Lei nº 7.115/1983 e art. 299 do Código Penal Brasileiro), que possuo BONS ANTECEDENTES.
            </p>
            <p className="text-justify leading-loose mb-6">
              Declaro ainda não estar respondendo a nenhum inquérito policial ou a processo criminal que possa inviabilizar o exercício de minhas atividades civis e profissionais, ou que me torne incompatível com os requisitos exigidos.
            </p>
            <p className="text-justify leading-loose mb-6">
              Por ser expressão da verdade, firmo a presente declaração.
            </p>
          </>
        );
      case "trabalho":
        return (
          <>
            <p className="text-justify leading-loose mb-6">
              Eu, <strong>{data.declarante2Nome || "[Nome do Empregador/Responsável]"}</strong>, inscrito(a) no CPF/CNPJ sob o nº {data.declarante2Cpf || "[CPF/CNPJ do Empregador]"}, com sede/residência na {data.endereco || "[Endereço do Empregador]"}, nº {data.numero || "[Número]"}, Bairro {data.bairro || "[Bairro]"}, na cidade de {data.cidade || "[Cidade]"} / {data.estado || "[UF]"},
            </p>
            <p className="text-justify leading-loose font-bold mb-6">
              DECLARO, para os devidos fins, que o(a) Sr(a). <strong>{data.declaranteNome || "[Nome do Empregado]"}</strong>, portador(a) do RG nº {data.declaranteRg || "[RG]"} e CPF nº {data.declaranteCpf || "[CPF]"},
            </p>
            <p className="text-justify leading-loose mb-6">
              Presta (ou prestou) serviços para esta empresa/pessoa física exercendo o cargo/função de <strong>{data.declaranteProfissao || "[Função/Cargo]"}</strong>.
            </p>
            {data.finalidade && (
              <p className="text-justify leading-loose mb-6">
                Observações adicionais: {data.finalidade}
              </p>
            )}
            <p className="text-justify leading-loose mb-6">
              Por ser verdade, dato e assino o presente documento.
            </p>
          </>
        );
      case "veracidade":
        return (
          <>
            <p className="text-justify leading-loose mb-6">
              Eu, <strong>{data.declaranteNome || "[Nome Completo]"}</strong>, {data.declaranteNacionalidade || "[nacionalidade]"}, {data.declaranteEstadoCivil || "[estado civil]"}, {data.declaranteProfissao || "[profissão]"}, portador(a) do RG nº {data.declaranteRg || "[RG]"} e inscrito(a) no CPF sob o nº {data.declaranteCpf || "[CPF]"}, residente e domiciliado(a) na {data.endereco || "[Endereço]"}, nº {data.numero || "[Número]"}, Bairro {data.bairro || "[Bairro]"}, na cidade de {data.cidade || "[Cidade]"} / {data.estado || "[UF]"},
            </p>
            <p className="text-justify leading-loose font-bold mb-6">
              DECLARO, sob as penas da lei e em pleno gozo de minhas faculdades civis e mentais, que todas as informações prestadas, bem como os documentos por mim apresentados para a finalidade de {data.finalidade || "[descrever finalidade/cadastro]"} são VERDADEIROS e autênticos.
            </p>
            <p className="text-justify leading-loose mb-6">
              Estou ciente de que a falsidade das informações aqui prestadas e dos documentos apresentados sujeitar-me-á às sanções cíveis, administrativas e criminais previstas na legislação brasileira, especialmente no art. 299 do Código Penal (Falsidade Ideológica).
            </p>
            <p className="text-justify leading-loose mb-6">
              Por ser verdade, firmo a presente declaração.
            </p>
          </>
        );
      case "estado-civil":
        return (
          <>
            <p className="text-justify leading-loose mb-6">
              Eu, <strong>{data.declaranteNome || "[Nome Completo]"}</strong>, {data.declaranteNacionalidade || "[nacionalidade]"}, {data.declaranteProfissao || "[profissão]"}, portador(a) do RG nº {data.declaranteRg || "[RG]"} e inscrito(a) no CPF sob o nº {data.declaranteCpf || "[CPF]"}, residente e domiciliado(a) na {data.endereco || "[Endereço]"}, nº {data.numero || "[Número]"}, Bairro {data.bairro || "[Bairro]"}, na cidade de {data.cidade || "[Cidade]"} / {data.estado || "[UF]"},
            </p>
            <p className="text-justify leading-loose font-bold mb-6">
              DECLARO, sob as penas da Lei nº 7.115/1983 e do art. 299 do Código Penal Brasileiro, para os devidos fins de direito, que meu estado civil atual é: <strong>{data.declaranteEstadoCivil || "[solteiro(a) / divorciado(a) / viúvo(a)]"}</strong>.
            </p>
            <p className="text-justify leading-loose mb-6">
              Declaro ainda que não convivo em regime de união estável e não possuo nenhum impedimento legal que altere esta condição declarada.
            </p>
            <p className="text-justify leading-loose mb-6">
              Por ser a expressão da verdade e ciente das sanções legais cabíveis em caso de declaração falsa, firmo o presente documento.
            </p>
          </>
        );
      case "comodato":
        return (
          <>
            <p className="text-justify leading-loose mb-6">
              Eu, <strong>{data.declaranteNome || "[Nome do Comodante/Proprietário]"}</strong>, portador(a) do RG nº {data.declaranteRg || "[RG]"} e inscrito(a) no CPF sob o nº {data.declaranteCpf || "[CPF]"}, legítimo(a) proprietário(a) e possuidor(a) do imóvel situado na {data.endereco || "[Endereço do Imóvel]"}, nº {data.numero || "[Número]"}, Bairro {data.bairro || "[Bairro]"}, na cidade de {data.cidade || "[Cidade]"} / {data.estado || "[UF]"},
            </p>
            <p className="text-justify leading-loose font-bold mb-6">
              DECLARO, para os devidos fins de comprovação de residência e demais efeitos legais, que cedi o referido imóvel, a título de COMODATO GRATUITO, para:
            </p>
            <p className="text-justify leading-loose mb-6">
              O(a) Sr(a). <strong>{data.declarante2Nome || "[Nome do Comodatário/Morador]"}</strong>, portador(a) do RG nº {data.declarante2Rg || "[RG do Morador]"} e CPF nº {data.declarante2Cpf || "[CPF do Morador]"}, que nele reside atualmente.
            </p>
            <p className="text-justify leading-loose mb-6">
              Por ser verdade, dato e assino o presente documento sob as penas da Lei.
            </p>
          </>
        );
      case "etnico-racial":
        return (
          <>
            <p className="text-justify leading-loose mb-6">
              Eu, <strong>{data.declaranteNome || "[Nome Completo]"}</strong>, {data.declaranteNacionalidade || "[nacionalidade]"}, {data.declaranteEstadoCivil || "[estado civil]"}, portador(a) do RG nº {data.declaranteRg || "[RG]"} e inscrito(a) no CPF sob o nº {data.declaranteCpf || "[CPF]"}, residente e domiciliado(a) na {data.endereco || "[Endereço]"}, na cidade de {data.cidade || "[Cidade]"} / {data.estado || "[UF]"},
            </p>
            <p className="text-justify leading-loose font-bold mb-6">
              DECLARO, sob as penas da lei, para fins de participação no sistema de cotas / reserva de vagas do {data.finalidade || "[Nome do Concurso/Vestibular]"}, que sou de cor/raça <strong>{data.declaranteProfissao || "[Preta, Parda ou Indígena]"}</strong>.
            </p>
            <p className="text-justify leading-loose mb-6">
              Estou ciente de que, em caso de falsidade ideológica, ficarei sujeito(a) às sanções cíveis, penais (Art. 299 do Código Penal) e administrativas, incluindo o cancelamento da inscrição ou anulação de matrícula, além de possível encaminhamento ao Ministério Público.
            </p>
            <p className="text-justify leading-loose mb-6">
              Por ser expressão da verdade, firmo a presente declaração.
            </p>
          </>
        );
      case "anuencia":
        return (
          <>
            <p className="text-justify leading-loose mb-6">
              Eu, <strong>{data.declaranteNome || "[Nome do Anuente/Credor]"}</strong>, inscrito(a) no CPF/CNPJ sob o nº {data.declaranteCpf || "[CPF/CNPJ]"}, residente e domiciliado(a) / com sede na {data.endereco || "[Endereço]"}, nº {data.numero || "[Número]"}, cidade de {data.cidade || "[Cidade]"} / {data.estado || "[UF]"},
            </p>
            <p className="text-justify leading-loose font-bold mb-6">
              DECLARO que ANUO (concordo plenamente) com {data.finalidade || "[descrever o ato: o cancelamento de protesto / o prosseguimento da obra / a transferência de titularidade, etc...]"},
            </p>
            <p className="text-justify leading-loose mb-6">
              Em favor de <strong>{data.declarante2Nome || "[Nome do Beneficiado]"}</strong>, inscrito(a) no CPF/CNPJ nº {data.declarante2Cpf || "[CPF/CNPJ do Beneficiado]"}, atestando nada ter a opor contra o referido ato.
            </p>
            <p className="text-justify leading-loose mb-6">
              Por ser verdade, firmo a presente declaração, autorizando os órgãos competentes a procederem com as formalidades legais pertinentes.
            </p>
          </>
        );
      case "prestacao-servico":
        return (
          <>
            <p className="text-justify leading-loose mb-6">
              Eu, <strong>{data.declaranteNome || "[Nome do Prestador/Autônomo]"}</strong>, inscrito(a) no CPF/CNPJ sob o nº {data.declaranteCpf || "[CPF/CNPJ]"}, profissão: {data.declaranteProfissao || "[Profissão]"}, residente e domiciliado(a) na {data.endereco || "[Endereço]"},
            </p>
            <p className="text-justify leading-loose font-bold mb-6">
              DECLARO, para os devidos fins de comprovação de experiência e atividade autônoma, que prestei (ou presto) serviços para:
            </p>
            <p className="text-justify leading-loose mb-6">
              <strong>{data.declarante2Nome || "[Nome do Tomador do Serviço]"}</strong>, inscrito(a) no CPF/CNPJ sob o nº {data.declarante2Cpf || "[CPF/CNPJ do Tomador]"}, realizando atividades referentes a: {data.finalidade || "[Descrição do Serviço]"}.
            </p>
            <p className="text-justify leading-loose mb-6">
              Por ser verdade, emito esta declaração.
            </p>
          </>
        );
      case "escolaridade":
        return (
          <>
            <p className="text-justify leading-loose mb-6">
              Eu, <strong>{data.declaranteNome || "[Nome Completo]"}</strong>, {data.declaranteNacionalidade || "[nacionalidade]"}, {data.declaranteEstadoCivil || "[estado civil]"}, portador(a) do RG nº {data.declaranteRg || "[RG]"} e inscrito(a) no CPF sob o nº {data.declaranteCpf || "[CPF]"},
            </p>
            <p className="text-justify leading-loose font-bold mb-6">
              DECLARO, sob as penas da Lei nº 7.115/1983 e do art. 299 do Código Penal, para fins de {data.finalidade || "[trabalho/matrícula]"}, que possuo o seguinte grau de escolaridade:
            </p>
            <p className="text-justify leading-loose mb-6">
              <strong>{data.declaranteProfissao || "[Ex: Ensino Médio Completo / Ensino Superior Incompleto]"}</strong>.
            </p>
            <p className="text-justify leading-loose mb-6">
              Comprometo-me a apresentar, caso e quando exigido, os documentos comprobatórios (histórico ou certificado) oficiais emitidos pela instituição de ensino.
            </p>
          </>
        );
      case "renda":
        return (
          <>
            <p className="text-justify leading-loose mb-6">
              Eu, <strong>{data.declaranteNome || "[Nome Completo]"}</strong>, {data.declaranteNacionalidade || "[nacionalidade]"}, {data.declaranteEstadoCivil || "[estado civil]"}, portador(a) do RG nº {data.declaranteRg || "[RG]"} e inscrito(a) no CPF sob o nº {data.declaranteCpf || "[CPF]"}, domiciliado(a) na {data.endereco || "[Endereço]"}, na cidade de {data.cidade || "[Cidade]"} / {data.estado || "[UF]"},
            </p>
            <p className="text-justify leading-loose font-bold mb-6">
              DECLARO, sob as penas da Lei nº 7.115/1983, que exerço a atividade profissional autônoma / informal de <strong>{data.declaranteProfissao || "[Ex: Pintor, Vendedor Ambulante]"}</strong>.
            </p>
            <p className="text-justify leading-loose mb-6">
              Declaro ainda que, do exercício desta atividade, aufiro uma renda média mensal de <strong>R$ {data.finalidade || "[Valor da Renda]"}</strong>, sendo esta a única/principal fonte de sustento de minha família.
            </p>
            <p className="text-justify leading-loose mb-6">
              Por ser a expressão da verdade, assumindo inteira responsabilidade civil e criminal, assino a presente.
            </p>
          </>
        );
      case "comparecimento":
        return (
          <>
            <p className="text-justify leading-loose font-bold mb-6">
              DECLARAÇÃO DE COMPARECIMENTO
            </p>
            <p className="text-justify leading-loose mb-6">
              Declaramos, para os devidos fins de justificativa e comprovação, que o(a) Sr(a). <strong>{data.declaranteNome || "[Nome da Pessoa que Compareceu]"}</strong>, portador(a) do RG nº {data.declaranteRg || "[RG]"} e CPF nº {data.declaranteCpf || "[CPF]"},
            </p>
            <p className="text-justify leading-loose mb-6">
              Compareceu neste local/instituição ({data.declarante2Nome || "[Nome da Instituição/Empresa]"}) na data de <strong>{data.finalidade || "[Data do Comparecimento]"}</strong>, no período compreendido entre <strong>{data.declarante2Nacionalidade || "[Hora de Início]"}</strong> e <strong>{data.declarante2EstadoCivil || "[Hora de Término]"}</strong>.
            </p>
            <p className="text-justify leading-loose mb-6">
              Motivo do comparecimento: {data.declaranteProfissao || "[Ex: Reunião escolar, acompanhamento familiar, exame, etc.]"}.
            </p>
            <p className="text-justify leading-loose mb-6">
              Por ser expressão da verdade, firmamos a presente.
            </p>
          </>
        );
`;

code = code.replace(/default:\s*return \(\s*<p className="text-justify leading-loose mb-6">\s*Modelo de declaração em desenvolvimento\.\.\.\s*<\/p>\s*\);\s*\}/, `${replacement}      default:\n        return (\n          <p className="text-justify leading-loose mb-6">\n            Modelo de declaração em desenvolvimento...\n          </p>\n        );\n    }`);

fs.writeFileSync('src/components/DeclarationGenerator.tsx', code);
