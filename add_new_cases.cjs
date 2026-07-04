const fs = require('fs');
let code = fs.readFileSync('src/components/DeclarationGenerator.tsx', 'utf-8');

const newCases = `
      case "imposto-renda-isento":
        return (
          <>
            <p className="text-justify leading-loose mb-6">
              Eu, <strong>{data.declaranteNome || "[Nome Completo]"}</strong>, {data.declaranteNacionalidade || "[nacionalidade]"}, {data.declaranteEstadoCivil || "[estado civil]"}, portador(a) do RG nº {data.declaranteRg || "[RG]"} e inscrito(a) no CPF sob o nº {data.declaranteCpf || "[CPF]"},
            </p>
            <p className="text-justify leading-loose font-bold mb-6">
              DECLARO, sob as penas da Lei nº 7.115/1983 e do art. 299 do Código Penal Brasileiro, para os devidos fins, que sou isento(a) da entrega da Declaração de Ajuste Anual do Imposto de Renda Pessoa Física (IRPF).
            </p>
            <p className="text-justify leading-loose mb-6">
              Atesto que meus rendimentos não atingiram o limite mínimo estipulado pela Receita Federal para a obrigatoriedade da declaração no último ano-exercício.
            </p>
            <p className="text-justify leading-loose mb-6">
              Por ser verdade, firmo a presente.
            </p>
          </>
        );
      case "nao-vinculo":
        return (
          <>
            <p className="text-justify leading-loose mb-6">
              Eu, <strong>{data.declaranteNome || "[Nome Completo]"}</strong>, portador(a) do RG nº {data.declaranteRg || "[RG]"} e CPF nº {data.declaranteCpf || "[CPF]"}, domiciliado(a) na {data.endereco || "[Endereço]"},
            </p>
            <p className="text-justify leading-loose font-bold mb-6">
              DECLARO, para os devidos fins e sob as sanções da Lei nº 7.115/1983, que NÃO POSSUO nenhum vínculo empregatício formal (anotação na Carteira de Trabalho e Previdência Social – CTPS) com qualquer instituição pública ou privada.
            </p>
            <p className="text-justify leading-loose mb-6">
              Declaro ainda que, atualmente, obtenho minha renda através de atividades autônomas/informais no valor aproximado de R$ {data.finalidade || "[Valor]"}, ou dependo de familiares.
            </p>
            <p className="text-justify leading-loose mb-6">
              Por ser a expressão da verdade, assino este documento.
            </p>
          </>
        );
      case "perda-documentos":
        return (
          <>
            <p className="text-justify leading-loose font-bold mb-6">
              DECLARAÇÃO DE PERDA / EXTRAVIO DE DOCUMENTOS
            </p>
            <p className="text-justify leading-loose mb-6">
              Eu, <strong>{data.declaranteNome || "[Nome Completo]"}</strong>, nascido(a) em {data.finalidade || "[Data de Nascimento]"}, {data.declaranteNacionalidade || "[Nacionalidade]"}, portador(a) do RG nº {data.declaranteRg || "[RG]"} e CPF nº {data.declaranteCpf || "[CPF]"},
            </p>
            <p className="text-justify leading-loose font-bold mb-6">
              DECLARO sob as penas da Lei que perdi/extraviei os seguintes documentos: <strong>{data.declarante2Nome || "[Descreva os documentos perdidos]"}</strong>.
            </p>
            <p className="text-justify leading-loose mb-6">
              Assumo a inteira responsabilidade civil e criminal por esta declaração.
            </p>
          </>
        );
      case "vida-residencia":
        return (
          <>
            <p className="text-justify leading-loose mb-6">
              Eu, <strong>{data.declaranteNome || "[Nome Completo]"}</strong>, {data.declaranteEstadoCivil || "[estado civil]"}, portador(a) do RG nº {data.declaranteRg || "[RG]"} e inscrito(a) no CPF sob o nº {data.declaranteCpf || "[CPF]"},
            </p>
            <p className="text-justify leading-loose font-bold mb-6">
              DECLARO, sob as penas da Lei nº 7.115/1983, para fins de PROVA DE VIDA E RESIDÊNCIA junto a {data.finalidade || "[INSS, Banco, etc]"}, que me encontro vivo(a) e resido de forma permanente no endereço abaixo:
            </p>
            <p className="text-justify leading-loose mb-6">
              Endereço: <strong>{data.endereco || "[Rua/Av]"}</strong>, nº <strong>{data.numero || "[Número]"}</strong>{data.complemento ? \`, \${data.complemento}\` : ""}<br />
              Bairro: {data.bairro || "[Bairro]"}<br />
              CEP: {data.cep || "[CEP]"} - {data.cidade || "[Cidade]"} / {data.estado || "[UF]"}
            </p>
            <p className="text-justify leading-loose mb-6">
              Por ser verdade, dato e assino.
            </p>
          </>
        );
      case "veiculo-autorizacao":
        return (
          <>
            <p className="text-justify leading-loose mb-6">
              Eu, <strong>{data.declaranteNome || "[Nome do Proprietário]"}</strong>, portador(a) do RG nº {data.declaranteRg || "[RG]"} e CPF nº {data.declaranteCpf || "[CPF]"}, legítimo(a) proprietário(a) do veículo de placas <strong>{data.finalidade || "[Placa do Veículo]"}</strong>,
            </p>
            <p className="text-justify leading-loose font-bold mb-6">
              AUTORIZO o(a) Sr(a). <strong>{data.declarante2Nome || "[Nome do Condutor Autorizado]"}</strong>, portador(a) do RG nº {data.declarante2Rg || "[RG do Condutor]"} e CPF/CNH nº {data.declarante2Cpf || "[CPF/CNH do Condutor]"},
            </p>
            <p className="text-justify leading-loose mb-6">
              A conduzir o referido veículo em todo o território nacional (ou países do Mercosul, se aplicável), assumindo o condutor a responsabilidade civil e criminal pelos atos praticados na direção do veículo durante o período de uso.
            </p>
            <p className="text-justify leading-loose mb-6">
              Por ser verdade, dato e assino. (Recomenda-se reconhecimento de firma).
            </p>
          </>
        );
`;

code = code.replace(/default:\s*return \(\s*<p className="text-justify leading-loose mb-6">\s*Modelo de declaração em desenvolvimento\.\.\.\s*<\/p>\s*\);\s*\}/, `${newCases}      default:\n        return (\n          <p className="text-justify leading-loose mb-6">\n            Modelo de declaração em desenvolvimento...\n          </p>\n        );\n    }`);
fs.writeFileSync('src/components/DeclarationGenerator.tsx', code);
