import React, { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { cpf, cnpj } from "cpf-cnpj-validator";
import {
  Printer,
  FileText,
  CheckCircle2,
  Download,
  AlertCircle
} from "lucide-react";
import { cn } from "../utils/cn";
import { AdSense } from "./AdSense";
import { saveDocument } from "../utils/documentHistory";

interface DeclarationData {
  // Common Declarante
  declaranteNome: string;
  declaranteNacionalidade: string;
  declaranteEstadoCivil: string;
  declaranteProfissao: string;
  declaranteCpf: string;
  declaranteRg: string;
  // Common Endereço
  cep: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  complemento: string;
  // Specific
  finalidade?: string;
  data: string;
  
  // Uniao Estavel
  declarante2Nome?: string;
  declarante2Nacionalidade?: string;
  declarante2EstadoCivil?: string;
  declarante2Profissao?: string;
  declarante2Cpf?: string;
  declarante2Rg?: string;
  dataInicioUniao?: string;
}

export function DeclarationGenerator({ modelId }: { modelId: string }) {
  const componentRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<DeclarationData>({
    declaranteNome: "",
    declaranteNacionalidade: "brasileiro(a)",
    declaranteEstadoCivil: "solteiro(a)",
    declaranteProfissao: "",
    declaranteCpf: "",
    declaranteRg: "",
    cep: "",
    endereco: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    complemento: "",
    finalidade: "",
    data: "",
    
    declarante2Nome: "",
    declarante2Nacionalidade: "brasileiro(a)",
    declarante2EstadoCivil: "solteiro(a)",
    declarante2Profissao: "",
    declarante2Cpf: "",
    declarante2Rg: "",
    dataInicioUniao: "",
  });

  const [isClient, setIsClient] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    setData(prev => ({
      ...prev,
      data: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`
    }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name.includes("Cpf") && newValue.length <= 14) {
      newValue = newValue.replace(/\D/g, "");
      if (newValue.length > 11) newValue = newValue.slice(0, 11);
      newValue = newValue.replace(/(\d{3})(\d)/, "$1.$2");
      newValue = newValue.replace(/(\d{3})(\d)/, "$1.$2");
      newValue = newValue.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    if (name === "cep" && newValue.length <= 9) {
      newValue = newValue.replace(/\D/g, "");
      if (newValue.length > 8) newValue = newValue.slice(0, 8);
      newValue = newValue.replace(/(\d{5})(\d)/, "$1-$2");
    }

    setData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Declaracao_${modelId}`,
  });

  const handleGeneratePdf = async () => {
    if (!componentRef.current) return;
    try {
      setIsGeneratingPdf(true);
      const [html2canvas, { jsPDF }] = await Promise.all([
        import("html2canvas-pro"),
        import("jspdf"),
      ]);
      const canvas = await html2canvas.default(componentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Declaracao_${modelId}_${Date.now()}.pdf`);

      // Save to local document history
      try {
        saveDocument({
          category: 'declaracao',
          modelSlug: modelId,
          title: `Declaração: ${data.declaranteNome || 'Documento'}`,
          formattedDate: new Date().toLocaleDateString('pt-BR'),
          pagador: data.declaranteNome,
          recebedor: data.titularNome || data.proprietarioNome || data.empresaNome,
          descricao: `Declaração de ${modelId.replace(/-/g, ' ')}`,
          url: window.location.pathname,
          formData: data,
        });
      } catch (e) {
        // Safe catch
      }
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Ocorreu um erro ao gerar o PDF. Tente usar o botão de Imprimir e selecione 'Salvar como PDF'.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const formattedDate = new Date(data.data + "T12:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  
  const getSecondPartyTitle = () => {
    switch (modelId) {
      case "uniao-estavel": return "{getSecondPartyTitle()}";
      case "dependencia-economica": return "Dados do Dependente";
      case "trabalho": return "Dados do Empregador / Empresa";
      case "comodato": return "Dados do Comodatário (Morador)";
      case "anuencia": return "Dados do Beneficiado";
      case "prestacao-servico": return "Dados do Tomador do Serviço";
      case "comparecimento": return "Dados da Instituição / Empresa";
      case "veiculo-autorizacao": return "Dados do Condutor Autorizado";
      case "perda-documentos": return "Documentos Perdidos (Apenas o Nome)";
      default: return "";
    }
  };

  const needsSecondParty = getSecondPartyTitle() !== "";

  const isValidCpf = data.declaranteCpf.length === 14 ? cpf.isValid(data.declaranteCpf) : true;

  const renderDeclarationContent = () => {
    switch (modelId) {
      case "residencia":
        return (
          <>
            <p className="text-justify leading-loose mb-6">
              Eu, <strong>{data.declaranteNome || "[Nome Completo]"}</strong>, {data.declaranteNacionalidade || "[nacionalidade]"}, {data.declaranteEstadoCivil || "[estado civil]"}, {data.declaranteProfissao || "[profissão]"}, portador(a) do RG nº {data.declaranteRg || "[RG]"} e inscrito(a) no CPF sob o nº {data.declaranteCpf || "[CPF]"},
            </p>
            <p className="text-justify leading-loose font-bold mb-6">
              DECLARO, sob as penas da Lei (art. 299 do Código Penal e Lei nº 7.115/1983), que resido e sou domiciliado(a) no seguinte endereço:
            </p>
            <p className="text-justify leading-loose mb-6">
              <strong>{data.endereco || "[Rua/Av]"}</strong>, nº <strong>{data.numero || "[Número]"}</strong>{data.complemento ? `, ${data.complemento}` : ""}
              <br />
              Bairro: {data.bairro || "[Bairro]"}
              <br />
              CEP: {data.cep || "[CEP]"} - {data.cidade || "[Cidade]"} / {data.estado || "[UF]"}
            </p>
            <p className="text-justify leading-loose mb-6">
              Por ser expressão da verdade, firmo a presente declaração para que produza seus efeitos legais e jurídicos.
            </p>
            {data.finalidade && (
              <p className="text-justify leading-loose mb-6">
                Observação / Finalidade: {data.finalidade}.
              </p>
            )}
          </>
        );
      case "hipossuficiencia":
        return (
          <>
            <p className="text-justify leading-loose mb-6">
              Eu, <strong>{data.declaranteNome || "[Nome Completo]"}</strong>, {data.declaranteNacionalidade || "[nacionalidade]"}, {data.declaranteEstadoCivil || "[estado civil]"}, {data.declaranteProfissao || "[profissão]"}, portador(a) do RG nº {data.declaranteRg || "[RG]"} e inscrito(a) no CPF sob o nº {data.declaranteCpf || "[CPF]"}, residente e domiciliado(a) na {data.endereco || "[Endereço]"}, nº {data.numero || "[Número]"}, Bairro {data.bairro || "[Bairro]"}, na cidade de {data.cidade || "[Cidade]"} / {data.estado || "[UF]"},
            </p>
            <p className="text-justify leading-loose font-bold mb-6">
              DECLARO, nos termos da Lei nº 7.115/1983 e do art. 99, § 3º do Código de Processo Civil, que sou pessoa pobre na acepção jurídica do termo.
            </p>
            <p className="text-justify leading-loose mb-6">
              Declaro, sob as penas da lei, não possuir condições financeiras para arcar com o pagamento de custas, despesas processuais, honorários advocatícios ou taxas de inscrição, sem que isso implique em prejuízo do meu próprio sustento e o de minha família.
            </p>
            <p className="text-justify leading-loose mb-6">
              Por ser a expressão da verdade, assumindo inteira responsabilidade pelas declarações acima, firmo o presente termo para que produza os seus efeitos legais.
            </p>
          </>
        );
      case "uniao-estavel":
        return (
          <>
            <p className="text-justify leading-loose mb-4">
              Nós, abaixo assinados:
            </p>
            <p className="text-justify leading-loose mb-4">
              1. <strong>{data.declaranteNome || "[Nome do 1º Declarante]"}</strong>, {data.declaranteNacionalidade || "[nacionalidade]"}, {data.declaranteEstadoCivil || "[estado civil]"}, {data.declaranteProfissao || "[profissão]"}, portador(a) do RG nº {data.declaranteRg || "[RG]"} e CPF nº {data.declaranteCpf || "[CPF]"};
            </p>
            <p className="text-justify leading-loose mb-6">
              2. <strong>{data.declarante2Nome || "[Nome do 2º Declarante]"}</strong>, {data.declarante2Nacionalidade || "[nacionalidade]"}, {data.declarante2EstadoCivil || "[estado civil]"}, {data.declarante2Profissao || "[profissão]"}, portador(a) do RG nº {data.declarante2Rg || "[RG]"} e CPF nº {data.declarante2Cpf || "[CPF]"};
            </p>
            <p className="text-justify leading-loose mb-6">
              Ambos residentes e domiciliados na {data.endereco || "[Endereço]"}, nº {data.numero || "[Número]"}, Bairro {data.bairro || "[Bairro]"}, CEP {data.cep || "[CEP]"}, na cidade de {data.cidade || "[Cidade]"} / {data.estado || "[UF]"},
            </p>
            <p className="text-justify leading-loose font-bold mb-6">
              DECLARAMOS, sob as penas da Lei (art. 299 do Código Penal), que convivemos em regime de UNIÃO ESTÁVEL, de natureza familiar, pública e duradoura, com o objetivo de constituição de família, desde {data.dataInicioUniao ? new Date(data.dataInicioUniao + "T12:00:00").toLocaleDateString("pt-BR") : "[Data de Início]"}.
            </p>
            <p className="text-justify leading-loose mb-6">
              Declaramos ainda que não possuímos impedimentos legais para o casamento e que assumimos inteira responsabilidade civil e criminal pela veracidade das informações aqui prestadas.
            </p>
          </>
        );
      
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
              Endereço: <strong>{data.endereco || "[Rua/Av]"}</strong>, nº <strong>{data.numero || "[Número]"}</strong>{data.complemento ? `, ${data.complemento}` : ""}<br />
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
      default:
        return (
          <p className="text-justify leading-loose mb-6">
            Modelo de declaração em desenvolvimento...
          </p>
        );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Form Section */}
      <div className="w-full lg:w-5/12 print:hidden space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-700" />
            Dados do Declarante
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                name="declaranteNome"
                value={data.declaranteNome}
                onChange={handleChange}
                placeholder="Ex: João da Silva"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  CPF
                </label>
                <input
                  type="text"
                  name="declaranteCpf"
                  value={data.declaranteCpf}
                  onChange={handleChange}
                  placeholder="000.000.000-00"
                  maxLength={14}
                  className={cn(
                    "w-full p-3 bg-gray-50 border rounded-xl focus:ring-2 transition-colors",
                    data.declaranteCpf.length === 14 && !isValidCpf
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-200 focus:ring-emerald-500 focus:border-emerald-500"
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  RG
                </label>
                <input
                  type="text"
                  name="declaranteRg"
                  value={data.declaranteRg}
                  onChange={handleChange}
                  placeholder="Apenas números"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Nacionalidade
                </label>
                <input
                  type="text"
                  name="declaranteNacionalidade"
                  value={data.declaranteNacionalidade}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Estado Civil
                </label>
                <select
                  name="declaranteEstadoCivil"
                  value={data.declaranteEstadoCivil}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                >
                  <option value="solteiro(a)">Solteiro(a)</option>
                  <option value="casado(a)">Casado(a)</option>
                  <option value="divorciado(a)">Divorciado(a)</option>
                  <option value="viúvo(a)">Viúvo(a)</option>
                  <option value="em união estável">Em união estável</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Profissão
              </label>
              <input
                type="text"
                name="declaranteProfissao"
                value={data.declaranteProfissao}
                onChange={handleChange}
                placeholder="Ex: Professor, Autônomo, Estudante"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {needsSecondParty && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-700" />
              Dados do 2º Declarante (Companheiro/a)
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  name="declarante2Nome"
                  value={data.declarante2Nome}
                  onChange={handleChange}
                  placeholder="Ex: Maria Souza"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">CPF</label>
                  <input
                    type="text"
                    name="declarante2Cpf"
                    value={data.declarante2Cpf}
                    onChange={handleChange}
                    placeholder="000.000.000-00"
                    maxLength={14}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">RG</label>
                  <input
                    type="text"
                    name="declarante2Rg"
                    value={data.declarante2Rg}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nacionalidade</label>
                  <input
                    type="text"
                    name="declarante2Nacionalidade"
                    value={data.declarante2Nacionalidade}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Profissão</label>
                  <input
                    type="text"
                    name="declarante2Profissao"
                    value={data.declarante2Profissao}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>
              {modelId === "uniao-estavel" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Data Início da União</label>
                <input
                  type="date"
                  name="dataInicioUniao"
                  value={data.dataInicioUniao}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>
            )}
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-700" />
            Endereço e Data
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  CEP
                </label>
                <input
                  type="text"
                  name="cep"
                  value={data.cep}
                  onChange={handleChange}
                  placeholder="00000-000"
                  maxLength={9}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Rua/Av
                </label>
                <input
                  type="text"
                  name="endereco"
                  value={data.endereco}
                  onChange={handleChange}
                  placeholder="Rua das Flores"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Número
                </label>
                <input
                  type="text"
                  name="numero"
                  value={data.numero}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Complemento
                </label>
                <input
                  type="text"
                  name="complemento"
                  value={data.complemento}
                  onChange={handleChange}
                  placeholder="Apto, Casa, etc."
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Bairro
                </label>
                <input
                  type="text"
                  name="bairro"
                  value={data.bairro}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Cidade
                </label>
                <input
                  type="text"
                  name="cidade"
                  value={data.cidade}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Estado (UF)
                </label>
                <select
                  name="estado"
                  value={data.estado}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                >
                  <option value="">Selecione...</option>
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Data de Emissão
                </label>
                <input
                  type="date"
                  name="data"
                  value={data.data}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>
            
            
            {["residencia", "veracidade", "anuencia", "prestacao-servico", "escolaridade", "renda", "comparecimento", "trabalho", "etnico-racial"].includes(modelId) && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {modelId === "renda" ? "Valor da Renda Média (R$)" : 
                   modelId === "comparecimento" ? "Data do Comparecimento (ex: 15/10/2023)" : 
                   modelId === "etnico-racial" ? "Nome do Concurso / Processo Seletivo" :
                   modelId === "escolaridade" ? "Grau de Escolaridade (ex: Ensino Médio)" :
                   "Finalidade / Observação / Serviço"}
                </label>
                <input
                  type="text"
                  name="finalidade"
                  value={data.finalidade}
                  onChange={handleChange}
                  placeholder="Preencha os detalhes..."
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>
            )}
            {modelId === "comparecimento" && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Hora de Início
                  </label>
                  <input
                    type="time"
                    name="declarante2Nacionalidade"
                    value={data.declarante2Nacionalidade}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Hora de Término
                  </label>
                  <input
                    type="time"
                    name="declarante2EstadoCivil"
                    value={data.declarante2EstadoCivil}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>
            )}


          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => handlePrint()}
            className="flex-1 bg-gray-900 hover:bg-black text-white px-6 py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Printer className="w-5 h-5" />
            Imprimir
          </button>
          <button
            onClick={handleGeneratePdf}
            disabled={isGeneratingPdf}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-6 py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Download className="w-5 h-5" />
            {isGeneratingPdf ? "Gerando..." : "Baixar PDF"}
          </button>
        </div>
      </div>

      {/* Preview Section */}
      <div className="w-full lg:w-7/12">
        <div className="sticky top-6">
          {/* A4 Paper Container */}
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden print:shadow-none print:border-none print:rounded-none">
            <div
              ref={componentRef}
              className="w-full bg-white p-8 sm:p-12 md:p-16 text-gray-900 print:p-0"
              style={{
                aspectRatio: "210/297",
                minHeight: isClient && window.innerWidth >= 768 ? "auto" : "1050px",
                fontFamily: "Arial, sans-serif",
                fontSize: "16px",
              }}
            >
              <h1 className="text-2xl font-bold text-center mb-12 uppercase tracking-wide">
                {modelId === "residencia" && "Declaração de Residência"}
                {modelId === "hipossuficiencia" && "Declaração de Hipossuficiência"}
                {modelId === "uniao-estavel" && "Declaração de União Estável"}
                {modelId === "dependencia-economica" && "Declaração de Dependência Econômica"}
                {modelId === "bons-antecedentes" && "Declaração de Bons Antecedentes"}
                {modelId === "anuencia" && "Declaração de Anuência"}
                {modelId === "renda-informal" && "Declaração de Renda Informal"}
                {modelId === "veracidade" && "Declaração de Veracidade das Informações"}
                {modelId === "comodato" && "Declaração de Comodato"}
                {modelId === "etnico-racial" && "Autodeclaração Étnico-Racial"}
                {modelId === "trabalho" && "Declaração de Trabalho"}
                {modelId === "estado-civil" && "Declaração de Estado Civil"}
                {modelId === "comparecimento" && "Declaração de Comparecimento"}
                {modelId === "abandono-emprego" && "Declaração de Abandono de Emprego"}
                {modelId === "perda-documento" && "Declaração de Perda de Documentos"}
              </h1>

              {renderDeclarationContent()}

              <div className="mt-16 pt-8">
                <p className="mb-16 text-right">
                  {data.cidade || "[Cidade]"} - {data.estado || "[UF]"}, {formattedDate}.
                </p>
                <div className="flex flex-col items-center gap-12 text-center">
                  <div className="w-full max-w-sm">
                    <div className="border-t border-gray-800 mb-2"></div>
                    <p className="font-bold">{data.declaranteNome || "Assinatura do Declarante"}</p>
                    <p className="text-sm">CPF: {data.declaranteCpf || "[CPF]"}</p>
                  </div>
                  
                  {modelId === "uniao-estavel" && (
                    <div className="w-full max-w-sm">
                      <div className="border-t border-gray-800 mb-2"></div>
                      <p className="font-bold">{data.declarante2Nome || "Assinatura do 2º Declarante"}</p>
                      <p className="text-sm">CPF: {data.declarante2Cpf || "[CPF]"}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Watermark only visible in PDF/Print */}
              <div className="hidden print:block fixed bottom-4 right-4 text-[10px] text-gray-400 font-mono">
                Gerado por recibogratis.com.br
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}