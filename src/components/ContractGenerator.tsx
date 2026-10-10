import React, { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";
import {
  Printer,
  FileCheck,
  Download,
  PenTool,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Share2
} from "lucide-react";
import { ContractModel } from "../data/contractModels";
import { SignatureModal } from "./SignatureModal";
import { saveDocument } from "../utils/documentHistory";

interface ContractFormData {
  // Parte 1
  party1Nome: string;
  party1Doc: string;
  party1Profissao: string;
  party1Endereco: string;
  party1Cidade: string;
  party1Estado: string;
  // Parte 2
  party2Nome: string;
  party2Doc: string;
  party2Profissao: string;
  party2Endereco: string;
  party2Cidade: string;
  party2Estado: string;
  // Conteúdo
  objeto: string;
  valor: string;
  formaPagamento: string;
  prazo: string;
  rescisao: string;
  foroCidade: string;
  dataEmissao: string;
  // Testemunhas
  testemunha1Nome: string;
  testemunha1Cpf: string;
  testemunha2Nome: string;
  testemunha2Cpf: string;
}

interface ContractGeneratorProps {
  model: ContractModel;
}

export function ContractGenerator({ model }: ContractGeneratorProps) {
  const componentRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Signatures
  const [signatureModalOpen, setSignatureModalOpen] = useState(false);
  const [signingParty, setSigningParty] = useState<1 | 2>(1);
  const [signature1, setSignature1] = useState<string | null>(null);
  const [signature2, setSignature2] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<ContractFormData>({
    party1Nome: "",
    party1Doc: "",
    party1Profissao: "",
    party1Endereco: "",
    party1Cidade: "São Paulo",
    party1Estado: "SP",
    party2Nome: "",
    party2Doc: "",
    party2Profissao: "",
    party2Endereco: "",
    party2Cidade: "São Paulo",
    party2Estado: "SP",
    objeto: model.defaultValues?.objeto || "",
    valor: model.defaultValues?.valor || "",
    formaPagamento: model.defaultValues?.formaPagamento || "",
    prazo: model.defaultValues?.prazo || "",
    rescisao: model.defaultValues?.rescisao || "",
    foroCidade: "São Paulo",
    dataEmissao: "",
    testemunha1Nome: "",
    testemunha1Cpf: "",
    testemunha2Nome: "",
    testemunha2Cpf: "",
  });

  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const formatted = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    setFormData((prev) => ({
      ...prev,
      dataEmissao: formatted,
    }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name.includes("Doc") || name.includes("Cpf")) {
      const numbers = newValue.replace(/\D/g, "");
      if (numbers.length <= 11) {
        // CPF format
        newValue = numbers
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      } else if (numbers.length <= 14) {
        // CNPJ format
        newValue = numbers
          .replace(/(\d{2})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1/$2")
          .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
      }
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${model.slug}_${Date.now()}`,
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

      const imgData = canvas.toDataURL("image/jpeg", 0.98);
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${model.slug}_1pagina.pdf`);

      // Save to document history
      try {
        saveDocument({
          category: "contrato",
          modelSlug: model.slug,
          title: `${model.title}: ${formData.party1Nome || "Contrato"} & ${formData.party2Nome || "Cliente"}`,
          formattedDate: new Date().toLocaleDateString("pt-BR"),
          pagador: formData.party2Nome,
          recebedor: formData.party1Nome,
          valor: formData.valor,
          descricao: `Contrato de 1 página: ${model.title}`,
          url: window.location.pathname,
          formData: formData,
        });
      } catch (err) {
        // Safe catch
      }
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Houve uma instabilidade ao gerar o PDF. Recomendamos usar o botão 'Imprimir' e selecionar a opção 'Salvar como PDF'.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleOpenSignature = (party: 1 | 2) => {
    setSigningParty(party);
    setSignatureModalOpen(true);
  };

  const handleSaveSignature = (dataUrl: string) => {
    if (signingParty === 1) {
      setSignature1(dataUrl);
    } else {
      setSignature2(dataUrl);
    }
    setSignatureModalOpen(false);
  };

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const formattedDate = formData.dataEmissao
    ? new Date(formData.dataEmissao + "T12:00:00").toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Signature Modal */}
      <SignatureModal
        isOpen={signatureModalOpen}
        onClose={() => setSignatureModalOpen(false)}
        onSave={handleSaveSignature}
        initialSignature={signingParty === 1 ? signature1 || undefined : signature2 || undefined}
        signerName={signingParty === 1 ? formData.party1Nome || model.party1Label : formData.party2Nome || model.party2Label}
      />

      {/* Editor / Form Section */}
      <div className="w-full lg:w-5/12 space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between pb-5 border-b border-gray-100 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Preencher Contrato</h2>
                <p className="text-xs text-emerald-700 font-semibold">Formato 1 Página A4 • Validade Jurídica</p>
              </div>
            </div>
            <button
              onClick={handleCopyLink}
              title="Copiar link deste modelo"
              className="text-xs text-gray-500 hover:text-emerald-700 flex items-center gap-1 bg-gray-50 hover:bg-emerald-50 px-3 py-1.5 rounded-lg border border-gray-200 transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? "Copiado!" : "Compartilhar"}</span>
            </button>
          </div>

          <div className="space-y-6">
            {/* Parte 1 */}
            <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/80">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-3">
                1. {model.party1Label} (Você ou sua Empresa)
              </span>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Nome Completo / Razão Social</label>
                  <input
                    type="text"
                    name="party1Nome"
                    value={formData.party1Nome}
                    onChange={handleChange}
                    placeholder="Ex: João da Silva / Silva Reformas MEI"
                    className="w-full p-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">CPF ou CNPJ</label>
                    <input
                      type="text"
                      name="party1Doc"
                      value={formData.party1Doc}
                      onChange={handleChange}
                      placeholder="000.000.000-00"
                      className="w-full p-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Profissão / Ramo</label>
                    <input
                      type="text"
                      name="party1Profissao"
                      value={formData.party1Profissao}
                      onChange={handleChange}
                      placeholder="Ex: Pintor Autônomo"
                      className="w-full p-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Endereço Completo</label>
                  <input
                    type="text"
                    name="party1Endereco"
                    value={formData.party1Endereco}
                    onChange={handleChange}
                    placeholder="Rua, número, bairro"
                    className="w-full p-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Cidade</label>
                    <input
                      type="text"
                      name="party1Cidade"
                      value={formData.party1Cidade}
                      onChange={handleChange}
                      placeholder="São Paulo"
                      className="w-full p-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">UF</label>
                    <input
                      type="text"
                      name="party1Estado"
                      value={formData.party1Estado}
                      onChange={handleChange}
                      placeholder="SP"
                      maxLength={2}
                      className="w-full p-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none uppercase"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Parte 2 */}
            <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/80">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block mb-3">
                2. {model.party2Label} (Cliente / Outra Parte)
              </span>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Nome Completo / Razão Social</label>
                  <input
                    type="text"
                    name="party2Nome"
                    value={formData.party2Nome}
                    onChange={handleChange}
                    placeholder="Ex: Carlos Mendes"
                    className="w-full p-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">CPF ou CNPJ</label>
                    <input
                      type="text"
                      name="party2Doc"
                      value={formData.party2Doc}
                      onChange={handleChange}
                      placeholder="000.000.000-00"
                      className="w-full p-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Cidade / UF</label>
                    <input
                      type="text"
                      name="party2Cidade"
                      value={formData.party2Cidade}
                      onChange={handleChange}
                      placeholder="São Paulo - SP"
                      className="w-full p-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Cláusulas Essenciais */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                3. Cláusulas e Condições Comerciais
              </span>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Objeto do Contrato (Descrição Clara)</label>
                <textarea
                  name="objeto"
                  rows={3}
                  value={formData.objeto}
                  onChange={handleChange}
                  placeholder="Descreva exatamente o serviço, o veículo ou o imóvel acordado..."
                  className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Valor Total (R$)</label>
                  <input
                    type="text"
                    name="valor"
                    value={formData.valor}
                    onChange={handleChange}
                    placeholder="Ex: 1.500,00"
                    className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Foro (Cidade)</label>
                  <input
                    type="text"
                    name="foroCidade"
                    value={formData.foroCidade}
                    onChange={handleChange}
                    placeholder="Ex: São Paulo"
                    className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Forma de Pagamento e Condições</label>
                <textarea
                  name="formaPagamento"
                  rows={2}
                  value={formData.formaPagamento}
                  onChange={handleChange}
                  placeholder="Ex: 50% de entrada via PIX e saldo na entrega..."
                  className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Prazo, Vigência ou Vencimento</label>
                <input
                  type="text"
                  name="prazo"
                  value={formData.prazo}
                  onChange={handleChange}
                  placeholder="Ex: 15 dias úteis a contar da assinatura"
                  className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Rescisão e Multa (Opcional)</label>
                <input
                  type="text"
                  name="rescisao"
                  value={formData.rescisao}
                  onChange={handleChange}
                  placeholder="Ex: Multa de 20% do valor restante em caso de quebra"
                  className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Data do Documento</label>
                <input
                  type="date"
                  name="dataEmissao"
                  value={formData.dataEmissao}
                  onChange={handleChange}
                  className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            {/* Assinatura Digital na Tela */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <PenTool className="w-4 h-4 text-amber-700" />
                <span>Assinatura Digital no Smartphone / Tela</span>
              </div>
              <p className="text-xs text-amber-800">
                Você e a outra parte podem assinar agora mesmo desenhando com o dedo na tela, ou deixar o espaço para assinar à caneta depois de imprimir.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleOpenSignature(1)}
                  className={`text-xs font-semibold py-2.5 px-3 rounded-xl border flex items-center justify-center gap-1.5 transition-colors ${
                    signature1
                      ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>{signature1 ? "✓ Assinado (Parte 1)" : "Assinar Parte 1"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenSignature(2)}
                  className={`text-xs font-semibold py-2.5 px-3 rounded-xl border flex items-center justify-center gap-1.5 transition-colors ${
                    signature2
                      ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>{signature2 ? "✓ Assinado (Parte 2)" : "Assinar Parte 2"}</span>
                </button>
              </div>
              {(signature1 || signature2) && (
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setSignature1(null);
                      setSignature2(null);
                    }}
                    className="text-[11px] text-gray-500 hover:text-red-600 flex items-center gap-1 underline"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Remover assinaturas digitais</span>
                  </button>
                </div>
              )}
            </div>

            {/* Testemunhas (Opcional) */}
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200/80">
              <span className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-2">
                4. Duas Testemunhas (Garante Força de Título Executivo)
              </span>
              <p className="text-[11px] text-gray-500 mb-3">
                Opcional. Se não preencher, serão impressas as linhas pontilhadas para assinatura à mão.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <input
                    type="text"
                    name="testemunha1Nome"
                    value={formData.testemunha1Nome}
                    onChange={handleChange}
                    placeholder="Nome 1ª Testemunha"
                    className="w-full p-2 bg-white border border-gray-200 rounded-lg outline-none"
                  />
                  <input
                    type="text"
                    name="testemunha1Cpf"
                    value={formData.testemunha1Cpf}
                    onChange={handleChange}
                    placeholder="CPF 1ª Testemunha"
                    className="w-full p-2 mt-1 bg-white border border-gray-200 rounded-lg outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="testemunha2Nome"
                    value={formData.testemunha2Nome}
                    onChange={handleChange}
                    placeholder="Nome 2ª Testemunha"
                    className="w-full p-2 bg-white border border-gray-200 rounded-lg outline-none"
                  />
                  <input
                    type="text"
                    name="testemunha2Cpf"
                    value={formData.testemunha2Cpf}
                    onChange={handleChange}
                    placeholder="CPF 2ª Testemunha"
                    className="w-full p-2 mt-1 bg-white border border-gray-200 rounded-lg outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => handlePrint()}
            className="flex-1 bg-gray-900 hover:bg-black text-white px-6 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <Printer className="w-5 h-5" />
            <span>Imprimir 1 Página</span>
          </button>
          <button
            onClick={handleGeneratePdf}
            disabled={isGeneratingPdf}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-6 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <Download className="w-5 h-5" />
            <span>{isGeneratingPdf ? "Gerando PDF..." : "Baixar PDF Grátis"}</span>
          </button>
        </div>

        {/* Internal Pillar Linking Box */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-2xl p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-emerald-600 text-white rounded-xl shrink-0 mt-0.5">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">
                Comprove os pagamentos deste contrato
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Ao receber a entrada, parcelas ou a quitação final dos valores combinados, emita sempre o{" "}
                <Link
                  to="/recibo-simples"
                  className="font-bold text-emerald-700 underline hover:text-emerald-800"
                >
                  recibo simples de pagamento
                </Link>{" "}
                oficial para evitar qualquer discussão jurídica sobre inadimplência.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Visual A4 Page Preview (Right Side) */}
      <div className="w-full lg:w-7/12">
        <div className="sticky top-24">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden print:shadow-none print:border-none print:rounded-none">
            {/* Top Toolbar Preview Banner */}
            <div className="bg-gray-100 border-b border-gray-200 px-4 py-2.5 flex items-center justify-between text-xs text-gray-600 print:hidden">
              <span className="font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Pré-visualização Oficial A4 (1 Folha Única)
              </span>
              <span className="text-[11px] bg-white px-2 py-0.5 rounded border border-gray-300 font-mono">
                210 × 297 mm
              </span>
            </div>

            {/* Printable Area - Designed carefully to fit 1 page */}
            <div
              ref={componentRef}
              className="w-full bg-white p-6 sm:p-10 md:p-12 text-gray-900 print:p-8"
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "13px",
                lineHeight: "1.45",
                color: "#111827",
              }}
            >
              {/* Header Title */}
              <div className="border-b-2 border-gray-900 pb-3 mb-4 text-center">
                <h1 className="text-lg sm:text-xl font-black uppercase tracking-wide text-gray-900">
                  {model.title.replace(" (1 Página)", "")}
                </h1>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">
                  Instrumento Particular com Força Executiva • Lei Federal nº 10.406/2002
                </p>
              </div>

              {/* Qualificação das Partes */}
              <div className="space-y-2 mb-3 bg-gray-50/70 p-3 rounded-lg border border-gray-200 text-xs">
                <p>
                  <strong>{model.party1Label.toUpperCase()}:</strong>{" "}
                  <strong>{formData.party1Nome || "[Nome / Razão Social da Parte 1]"}</strong>, inscrito(a) no CPF/CNPJ sob o nº{" "}
                  <strong>{formData.party1Doc || "[000.000.000-00]"}</strong>
                  {formData.party1Profissao ? `, profissão: ${formData.party1Profissao}` : ""}, com domicílio em{" "}
                  {formData.party1Endereco ? `${formData.party1Endereco}, ` : ""}{formData.party1Cidade || "Cidade"}-{formData.party1Estado || "UF"}.
                </p>
                <p>
                  <strong>{model.party2Label.toUpperCase()}:</strong>{" "}
                  <strong>{formData.party2Nome || "[Nome / Razão Social da Parte 2]"}</strong>, inscrito(a) no CPF/CNPJ sob o nº{" "}
                  <strong>{formData.party2Doc || "[000.000.000-00]"}</strong>
                  {formData.party2Profissao ? `, profissão: ${formData.party2Profissao}` : ""}, residente e domiciliado(a) na cidade de{" "}
                  {formData.party2Cidade || "Cidade"}-{formData.party2Estado || "UF"}.
                </p>
              </div>

              {/* Cláusulas Redigidas Sinteticamente para 1 Folha */}
              <div className="space-y-2 text-justify text-xs leading-relaxed text-gray-800">
                <p>
                  Têm entre si, justo e contratado, o presente instrumento particular, que mutuamente outorgam e aceitam, mediante as cláusulas e condições seguintes:
                </p>

                <p>
                  <strong>CLÁUSULA 1ª – DO OBJETO:</strong> O presente contrato tem por objeto:{" "}
                  <span className="font-medium text-gray-900">
                    {formData.objeto || "[Descrição detalhada do objeto, produto, veículo, imóvel ou serviço acordado]"}
                  </span>.
                </p>

                <p>
                  <strong>CLÁUSULA 2ª – DO PREÇO E PAGAMENTO:</strong> Pela fiel execução e cumprimento deste ajuste, pagará a segunda parte à primeira a quantia de{" "}
                  <strong className="text-gray-900">
                    R$ {formData.valor || "0,00"}
                  </strong>
                  , a ser liquidada da seguinte forma:{" "}
                  <span>{formData.formaPagamento || "à vista ou conforme parcelas combinadas entre as partes"}</span>.
                </p>

                <p>
                  <strong>CLÁUSULA 3ª – DO PRAZO E EXECUÇÃO:</strong> O presente instrumento vigorará pelo prazo de:{" "}
                  <span>{formData.prazo || "vigência estipulada entre as partes a contar da assinatura"}</span>, comprometendo-se as partes a agir com boa-fé, pontualidade e cooperação mútua.
                </p>

                <p>
                  <strong>CLÁUSULA 4ª – DA RESCISÃO E MULTA:</strong> Havendo descumprimento imotivado de qualquer das obrigações pactuadas,{" "}
                  <span>{formData.rescisao || "a parte infratora responderá por perdas e danos, arcando com multa de 20% sobre o saldo inadimplido"}</span>, sem prejuízo da cobrança judicial ou extrajudicial.
                </p>

                <p>
                  <strong>CLÁUSULA 5ª – DO FORO:</strong> Para dirimir eventuais controvérsias decorrentes deste contrato, as partes elegem o foro da comarca de{" "}
                  <strong>{formData.foroCidade || "domicílio das partes"}</strong>, com renúncia expressa a qualquer outro, por mais privilegiado que seja.
                </p>
              </div>

              {/* Data e Local */}
              <div className="mt-4 pt-2 text-right text-xs text-gray-700">
                <p>
                  {formData.party1Cidade || "Cidade"} - {formData.party1Estado || "UF"},{" "}
                  {formattedDate}.
                </p>
              </div>

              {/* Assinaturas Principais */}
              <div className="mt-5 grid grid-cols-2 gap-8 text-center text-xs">
                {/* Parte 1 */}
                <div className="flex flex-col items-center">
                  <div className="h-14 flex items-end justify-center w-full">
                    {signature1 ? (
                      <img
                        src={signature1}
                        alt="Assinatura Parte 1"
                        className="max-h-12 object-contain"
                      />
                    ) : (
                      <div className="w-full border-t border-gray-900"></div>
                    )}
                  </div>
                  {signature1 && <div className="w-full border-t border-gray-900 mt-1"></div>}
                  <p className="font-bold text-gray-900 mt-1">
                    {formData.party1Nome || model.party1Label}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    CPF/CNPJ: {formData.party1Doc || "---"}
                  </p>
                  <span className="text-[10px] text-emerald-700 font-semibold uppercase">
                    {model.party1Label}
                  </span>
                </div>

                {/* Parte 2 */}
                <div className="flex flex-col items-center">
                  <div className="h-14 flex items-end justify-center w-full">
                    {signature2 ? (
                      <img
                        src={signature2}
                        alt="Assinatura Parte 2"
                        className="max-h-12 object-contain"
                      />
                    ) : (
                      <div className="w-full border-t border-gray-900"></div>
                    )}
                  </div>
                  {signature2 && <div className="w-full border-t border-gray-900 mt-1"></div>}
                  <p className="font-bold text-gray-900 mt-1">
                    {formData.party2Nome || model.party2Label}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    CPF/CNPJ: {formData.party2Doc || "---"}
                  </p>
                  <span className="text-[10px] text-blue-700 font-semibold uppercase">
                    {model.party2Label}
                  </span>
                </div>
              </div>

              {/* Testemunhas */}
              <div className="mt-5 pt-3 border-t border-gray-200">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 text-center mb-2">
                  Testemunhas (Art. 784, III do Código de Processo Civil)
                </p>
                <div className="grid grid-cols-2 gap-8 text-[11px] text-gray-600">
                  <div className="text-center">
                    <div className="border-t border-gray-400 mt-6 pt-1"></div>
                    <p className="font-semibold text-gray-800">
                      {formData.testemunha1Nome || "1ª Testemunha"}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      CPF: {formData.testemunha1Cpf || "_________________________"}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="border-t border-gray-400 mt-6 pt-1"></div>
                    <p className="font-semibold text-gray-800">
                      {formData.testemunha2Nome || "2ª Testemunha"}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      CPF: {formData.testemunha2Cpf || "_________________________"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Watermark in print/pdf */}
              <div className="mt-4 pt-2 flex items-center justify-between text-[9px] text-gray-400 border-t border-gray-100">
                <span>Documento gerado gratuitamente pelo recibogratis.com.br</span>
                <span>Folha 1 de 1 • Validade Jurídica Integral</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
