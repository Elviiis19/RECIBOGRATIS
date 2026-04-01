import React, { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import CurrencyInput from 'react-currency-input-field';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import { porExtenso } from 'numero-por-extenso';
import { Printer, FileText, ChevronRight, ChevronLeft, CheckCircle2, MessageCircle, Upload, QrCode, Download } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { cn } from '../utils/cn';
import { generatePixPayload } from '../utils/pix';

interface ReceiptData {
  numero: string;
  valor: string;
  pagadorNome: string;
  pagadorDocumento: string;
  recebedorNome: string;
  recebedorDocumento: string;
  referenteA: string;
  cidade: string;
  data: string;
  formaPagamento: string;
  logo: string;
  chavePix: string;
}

interface ReceiptGeneratorProps {
  title: string;
  defaultReferenteA?: string;
}

const STEPS = [
  { id: 'valor', title: 'Valor e Pagamento' },
  { id: 'pagador', title: 'Dados do Pagador' },
  { id: 'recebedor', title: 'Dados do Recebedor' },
  { id: 'detalhes', title: 'Detalhes do Recibo' },
  { id: 'concluido', title: 'Finalizar' }
];

export function ReceiptGenerator({ title, defaultReferenteA = '' }: ReceiptGeneratorProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [data, setData] = useState<ReceiptData>({
    numero: '001',
    valor: '',
    pagadorNome: '',
    pagadorDocumento: '',
    recebedorNome: '',
    recebedorDocumento: '',
    referenteA: defaultReferenteA,
    cidade: '',
    data: (() => {
      const today = new Date();
      return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    })(),
    formaPagamento: 'Dinheiro',
    logo: '',
    chavePix: '',
  });

  useEffect(() => {
    const savedData = localStorage.getItem('receiptIssuerData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setData(prev => ({
          ...prev,
          recebedorNome: parsed.recebedorNome || '',
          recebedorDocumento: parsed.recebedorDocumento || '',
          cidade: parsed.cidade || '',
          logo: parsed.logo || '',
          chavePix: parsed.chavePix || '',
        }));
      } catch (e) {
        console.error('Failed to parse saved issuer data', e);
      }
    }
  }, []);

  useEffect(() => {
    const issuerData = {
      recebedorNome: data.recebedorNome,
      recebedorDocumento: data.recebedorDocumento,
      cidade: data.cidade,
      logo: data.logo,
      chavePix: data.chavePix,
    };
    localStorage.setItem('receiptIssuerData', JSON.stringify(issuerData));
  }, [data.recebedorNome, data.recebedorDocumento, data.cidade, data.logo, data.chavePix]);

  const [errors, setErrors] = useState<Partial<Record<keyof ReceiptData, string>>>({});
  const [duasVias, setDuasVias] = useState(false);
  const isReciboSimples = title.toLowerCase().includes('simples');

  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Recibo_${data.pagadorNome || 'Documento'}`,
  });

  const validateDocument = (doc: string) => {
    const cleanDoc = doc.replace(/\D/g, '');
    if (!cleanDoc) return true; // allow empty while typing
    if (cleanDoc.length <= 11) {
      return cpf.isValid(cleanDoc);
    }
    return cnpj.isValid(cleanDoc);
  };

  const formatDocument = (doc: string) => {
    const cleanDoc = doc.replace(/\D/g, '');
    if (cleanDoc.length <= 11) {
      return cpf.format(cleanDoc);
    }
    return cnpj.format(cleanDoc);
  };

  const handleDocumentChange = (field: 'pagadorDocumento' | 'recebedorDocumento', value: string) => {
    const formatted = formatDocument(value);
    setData((prev) => ({ ...prev, [field]: formatted }));
    
    if (value && !validateDocument(value)) {
      setErrors((prev) => ({ ...prev, [field]: 'CPF/CNPJ inválido' }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof ReceiptData]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof ReceiptData];
        return newErrors;
      });
    }
  };

  const validateCurrentStep = () => {
    const newErrors: Partial<Record<keyof ReceiptData, string>> = {};
    let isValid = true;

    if (currentStep === 0) {
      if (!data.valor || data.valor === '0,00') {
        newErrors.valor = 'O valor é obrigatório';
        isValid = false;
      }
    } else if (currentStep === 1) {
      if (!data.pagadorNome.trim()) {
        newErrors.pagadorNome = 'O nome do pagador é obrigatório';
        isValid = false;
      }
      if (data.pagadorDocumento && !validateDocument(data.pagadorDocumento)) {
        newErrors.pagadorDocumento = 'CPF/CNPJ inválido';
        isValid = false;
      }
    } else if (currentStep === 2) {
      if (!data.recebedorNome.trim()) {
        newErrors.recebedorNome = 'O nome do recebedor é obrigatório';
        isValid = false;
      }
      if (data.recebedorDocumento && !validateDocument(data.recebedorDocumento)) {
        newErrors.recebedorDocumento = 'CPF/CNPJ inválido';
        isValid = false;
      }
    } else if (currentStep === 3) {
      if (!data.referenteA.trim()) {
        newErrors.referenteA = 'A referência é obrigatória';
        isValid = false;
      }
      if (!data.cidade.trim()) {
        newErrors.cidade = 'A cidade é obrigatória';
        isValid = false;
      }
      if (!data.data) {
        newErrors.data = 'A data é obrigatória';
        isValid = false;
      }
    }

    setErrors(prev => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const nextStep = () => {
    if (validateCurrentStep() && currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const generatePDFBlob = async () => {
    if (!componentRef.current) return null;
    
    try {
      const canvas = await html2canvas(componentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdfWidth = 210; // Base width in mm
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      const pdf = new jsPDF({
        orientation: pdfHeight > pdfWidth ? 'portrait' : 'landscape',
        unit: 'mm',
        format: [pdfWidth, pdfHeight],
      });
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      return pdf.output('blob');
    } catch (error) {
      console.error('Error generating PDF:', error);
      return null;
    }
  };

  const formatDate = (dateString: string, full: boolean = false) => {
    if (!dateString) return '';
    try {
      const [year, month, day] = dateString.split('T')[0].split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      if (full) {
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
      }
      return date.toLocaleDateString('pt-BR');
    } catch (e) {
      return dateString;
    }
  };

  const handleWhatsApp = async () => {
    const formattedDate = data.data ? formatDate(data.data) : '';
    const text = `*RECIBO - R$ ${data.valor}*\n\nRecebi(emos) de *${data.pagadorNome}*${data.pagadorDocumento ? ` (CPF/CNPJ: ${data.pagadorDocumento})` : ''}, a importância de *R$ ${data.valor}*.\n\nReferente a: ${data.referenteA}.\nPagamento efetuado através de: ${data.formaPagamento}.\n\n${data.cidade}, ${formattedDate}.\n\nRecebedor: *${data.recebedorNome}*${data.recebedorDocumento ? ` (CPF/CNPJ: ${data.recebedorDocumento})` : ''}\n\n_Gerado gratuitamente em recibogratis.com.br_`;
    
    // Try to share PDF if supported (mostly mobile)
    if (navigator.share) {
      try {
        const blob = await generatePDFBlob();
        if (blob) {
          const file = new File([blob], `Recibo_${data.pagadorNome || 'Documento'}.pdf`, { type: 'application/pdf' });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: 'Recibo',
              text: text,
              files: [file],
            });
            return; // Success!
          }
        }
      } catch (e) {
        console.error('Error sharing file:', e);
        // Fallback to text
      }
    }
    
    // Fallback to text-only WhatsApp link (Desktop)
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      const blob = await generatePDFBlob();
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Recibo_${data.pagadorNome || 'Documento'}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        alert('Não foi possível gerar o PDF. Tente novamente.');
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Ocorreu um erro ao gerar o PDF.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const getValorExtenso = (valorStr: string) => {
    if (!valorStr) return '';
    try {
      const numericValue = parseFloat(valorStr.replace(/\./g, '').replace(',', '.'));
      if (isNaN(numericValue)) return '';
      return `(${porExtenso(numericValue, porExtenso.estilo.monetario)})`;
    } catch (e) {
      return '';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Form Section - Wizard */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <FileText className="text-emerald-600" />
            Preenchimento Inteligente
          </h2>
          <p className="text-gray-500 text-sm">Passo {currentStep + 1} de {STEPS.length}: {STEPS[currentStep].title}</p>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-100 h-2 rounded-full mt-4 overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="min-h-[280px]">
          {currentStep === 0 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="numero" className="block text-sm font-semibold text-gray-900 mb-2">Número do Recibo</label>
                  <input
                    id="numero"
                    type="text"
                    name="numero"
                    value={data.numero}
                    onChange={handleChange}
                    placeholder="001"
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="formaPagamento" className="block text-sm font-semibold text-gray-900 mb-2">Como foi feito o pagamento?</label>
                  <select
                    id="formaPagamento"
                    name="formaPagamento"
                    value={data.formaPagamento}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white"
                  >
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="PIX">PIX</option>
                    <option value="Transferência">Transferência</option>
                    <option value="Cartão de Crédito">Cartão de Crédito</option>
                    <option value="Cartão de Débito">Cartão de Débito</option>
                    <option value="Cheque">Cheque</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="valor" className="block text-sm font-semibold text-gray-900 mb-2">Qual o valor do recibo? <span className="text-red-500">*</span></label>
                <CurrencyInput
                  id="valor"
                  name="valor"
                  placeholder="0,00"
                  decimalsLimit={2}
                  decimalSeparator=","
                  groupSeparator="."
                  prefix="R$ "
                  className={cn(
                    "w-full px-4 py-3 text-lg border rounded-xl focus:ring-2 outline-none transition-all",
                    errors.valor ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                  )}
                  onValueChange={(value) => {
                    setData((prev) => ({ ...prev, valor: value || '' }));
                    if (errors.valor) setErrors(prev => ({ ...prev, valor: undefined }));
                  }}
                  value={data.valor}
                  autoFocus
                />
                {errors.valor && <p className="text-red-500 text-sm mt-2">{errors.valor}</p>}
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div>
                <label htmlFor="pagadorNome" className="block text-sm font-semibold text-gray-900 mb-2">Quem está pagando? (Pagador) <span className="text-red-500">*</span></label>
                <input
                  id="pagadorNome"
                  type="text"
                  name="pagadorNome"
                  value={data.pagadorNome}
                  onChange={handleChange}
                  placeholder="Nome completo ou Razão Social"
                  className={cn(
                    "w-full px-4 py-3 text-lg border rounded-xl focus:ring-2 outline-none transition-all",
                    errors.pagadorNome ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                  )}
                  autoFocus
                />
                {errors.pagadorNome && <p className="text-red-500 text-sm mt-2">{errors.pagadorNome}</p>}
              </div>
              <div>
                <label htmlFor="pagadorDocumento" className="block text-sm font-semibold text-gray-900 mb-2">CPF ou CNPJ do Pagador</label>
                <input
                  id="pagadorDocumento"
                  type="text"
                  value={data.pagadorDocumento}
                  onChange={(e) => handleDocumentChange('pagadorDocumento', e.target.value)}
                  placeholder="000.000.000-00"
                  maxLength={18}
                  className={cn(
                    "w-full px-4 py-3 text-lg border rounded-xl focus:ring-2 outline-none transition-all",
                    errors.pagadorDocumento ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                  )}
                />
                {errors.pagadorDocumento && <p className="text-red-500 text-sm mt-2">{errors.pagadorDocumento}</p>}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              {!isReciboSimples && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Logotipo (Opcional)</label>
                  <div className="flex items-center gap-4">
                    {data.logo && (
                      <div className="relative w-16 h-16 rounded-lg border border-gray-200 overflow-hidden bg-white flex-shrink-0">
                        <img src={data.logo} alt="Logo" className="w-full h-full object-contain" />
                        <button 
                          onClick={() => setData(prev => ({ ...prev, logo: '' }))}
                          className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-xs rounded-bl-lg"
                        >
                          ×
                        </button>
                      </div>
                    )}
                    <label className="flex-1 cursor-pointer">
                      <div className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 text-gray-600">
                        <Upload className="w-5 h-5" />
                        <span>{data.logo ? 'Trocar Logo' : 'Fazer upload do Logo'}</span>
                      </div>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setData(prev => ({ ...prev, logo: reader.result as string }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              )}
              <div>
                <label htmlFor="recebedorNome" className="block text-sm font-semibold text-gray-900 mb-2">Quem está recebendo? (Recebedor) <span className="text-red-500">*</span></label>
                <input
                  id="recebedorNome"
                  type="text"
                  name="recebedorNome"
                  value={data.recebedorNome}
                  onChange={handleChange}
                  placeholder="Nome completo ou Razão Social"
                  className={cn(
                    "w-full px-4 py-3 text-lg border rounded-xl focus:ring-2 outline-none transition-all",
                    errors.recebedorNome ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                  )}
                  autoFocus
                />
                {errors.recebedorNome && <p className="text-red-500 text-sm mt-2">{errors.recebedorNome}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="recebedorDocumento" className="block text-sm font-semibold text-gray-900 mb-2">CPF ou CNPJ do Recebedor</label>
                  <input
                    id="recebedorDocumento"
                    type="text"
                    value={data.recebedorDocumento}
                    onChange={(e) => handleDocumentChange('recebedorDocumento', e.target.value)}
                    placeholder="000.000.000-00"
                    maxLength={18}
                    className={cn(
                      "w-full px-4 py-3 text-lg border rounded-xl focus:ring-2 outline-none transition-all",
                      errors.recebedorDocumento ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                    )}
                  />
                  {errors.recebedorDocumento && <p className="text-red-500 text-sm mt-2">{errors.recebedorDocumento}</p>}
                </div>
                <div>
                  <label htmlFor="chavePix" className="block text-sm font-semibold text-gray-900 mb-2">Chave PIX (Opcional)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <QrCode className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="chavePix"
                      type="text"
                      name="chavePix"
                      value={data.chavePix}
                      onChange={handleChange}
                      placeholder="CPF, E-mail, Celular..."
                      className="w-full pl-10 px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div>
                <label htmlFor="referenteA" className="block text-sm font-semibold text-gray-900 mb-2">Referente a quê? <span className="text-red-500">*</span></label>
                <textarea
                  id="referenteA"
                  name="referenteA"
                  value={data.referenteA}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Ex: Pagamento de aluguel referente ao mês de Março"
                  className={cn(
                    "w-full px-4 py-3 text-lg border rounded-xl focus:ring-2 outline-none transition-all resize-none",
                    errors.referenteA ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                  )}
                  autoFocus
                />
                {errors.referenteA && <p className="text-red-500 text-sm mt-2">{errors.referenteA}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cidade" className="block text-sm font-semibold text-gray-900 mb-2">Cidade de Emissão <span className="text-red-500">*</span></label>
                  <input
                    id="cidade"
                    type="text"
                    name="cidade"
                    value={data.cidade}
                    onChange={handleChange}
                    placeholder="Sua Cidade"
                    className={cn(
                      "w-full px-4 py-3 text-lg border rounded-xl focus:ring-2 outline-none transition-all",
                      errors.cidade ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                    )}
                  />
                  {errors.cidade && <p className="text-red-500 text-sm mt-2">{errors.cidade}</p>}
                </div>
                <div>
                  <label htmlFor="data" className="block text-sm font-semibold text-gray-900 mb-2">Data <span className="text-red-500">*</span></label>
                  <input
                    id="data"
                    type="date"
                    name="data"
                    value={data.data}
                    onChange={handleChange}
                    className={cn(
                      "w-full px-4 py-3 text-lg border rounded-xl focus:ring-2 outline-none transition-all",
                      errors.data ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                    )}
                  />
                  {errors.data && <p className="text-red-500 text-sm mt-2">{errors.data}</p>}
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 text-center py-8">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Recibo Pronto!</h3>
              <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                Seu recibo foi gerado com sucesso. Revise a prévia ao lado e escolha como deseja compartilhar.
              </p>
              
              <div className="flex items-center justify-center gap-2 mb-8">
                <input
                  type="checkbox"
                  id="duasVias"
                  checked={duasVias}
                  onChange={(e) => setDuasVias(e.target.checked)}
                  className="w-5 h-5 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                />
                <label htmlFor="duasVias" className="text-gray-700 font-medium cursor-pointer">
                  Imprimir em duas vias (2 cópias)
                </label>
              </div>

              <div className="flex flex-col gap-4 max-w-xs mx-auto">
                <button
                  onClick={() => handlePrint()}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg"
                >
                  <Printer className="w-6 h-6" />
                  Imprimir
                </button>

                <button
                  onClick={handleDownloadPDF}
                  disabled={isGeneratingPDF}
                  className={`w-full ${isGeneratingPDF ? 'bg-teal-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'} text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg`}
                >
                  <Download className="w-6 h-6" />
                  {isGeneratingPDF ? 'Gerando...' : 'Baixar PDF'}
                </button>
                
                <button
                  onClick={handleWhatsApp}
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg"
                >
                  <MessageCircle className="w-6 h-6" />
                  Enviar por WhatsApp
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        {currentStep < 4 && (
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors",
                currentStep === 0 
                  ? "text-gray-300 cursor-not-allowed" 
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <ChevronLeft className="w-5 h-5" />
              Voltar
            </button>
            <button
              onClick={nextStep}
              className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-xl font-medium transition-all shadow-sm hover:shadow-md"
            >
              Próximo
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
        {currentStep === 4 && (
          <div className="flex justify-center mt-8 pt-6 border-t border-gray-100">
             <button
              onClick={() => setCurrentStep(0)}
              className="text-emerald-600 hover:text-emerald-700 font-medium underline underline-offset-4"
            >
              Editar dados novamente
            </button>
          </div>
        )}
      </div>

      {/* Preview Section */}
      <div className="sticky top-24">
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 mb-4">
          <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
            <h3 className="font-semibold text-gray-700">Prévia do Documento</h3>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full font-bold tracking-wide uppercase">Padrão Jurídico Atualizado</span>
          </div>
        </div>

        {/* The Actual Receipt to Print */}
        <div className="bg-gray-100 p-4 sm:p-8 rounded-2xl flex justify-center overflow-x-auto border border-gray-200" style={{ minHeight: '400px' }}>
          <div ref={componentRef} className="bg-white text-black font-sans shadow-xl overflow-hidden print:shadow-none print:w-full print:max-w-none border-2 border-black" style={{ width: '100%', maxWidth: '800px', margin: '0 auto', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
            
            {/* Primeira Via */}
            <div className="p-6 md:p-8 relative">
              {/* Receipt Header */}
              <div className="flex justify-between items-start mb-6 border-b-2 border-black pb-4">
                <div className="flex items-center gap-4 w-1/4">
                  {data.logo && !isReciboSimples && (
                    <img src={data.logo} alt="Logo" className="w-16 h-16 object-contain" />
                  )}
                </div>
                <div className="w-2/4 text-center">
                  <h1 className="text-3xl font-bold uppercase tracking-widest text-black">RECIBO</h1>
                  <p className="text-sm font-bold mt-1">Nº {data.numero || '001'}</p>
                </div>
                <div className="w-1/4 text-right">
                  <span className="text-xl font-bold text-black bg-gray-100 px-4 py-2 rounded border-2 border-black inline-block">
                    VALOR: R$ {data.valor || '0,00'}
                  </span>
                </div>
              </div>

              {/* Receipt Body */}
              <div className="space-y-6 text-[16px] leading-relaxed text-black mt-8">
                <p className="text-justify indent-12">
                  Recebi(emos) de <span className="font-bold uppercase">{data.pagadorNome || '________________________________________________'}</span>, 
                  inscrito(a) no CPF/CNPJ sob o nº <span className="font-bold">{data.pagadorDocumento || '_________________________'}</span>, 
                  a importância de <span className="font-bold">R$ {data.valor || '0,00'}</span> {data.valor ? `(${getValorExtenso(data.valor)})` : ''}, 
                  referente a <span className="font-bold uppercase">{data.referenteA || '________________________________________________________________________________________________'}</span>.
                </p>

                <p className="text-justify indent-12">
                  Para maior clareza, firmo(amos) o presente recibo para que produza os seus efeitos legais, dando plena, rasa e geral quitação pelo valor recebido.
                </p>

                <p>
                  <span className="font-bold">Forma de Pagamento:</span> {data.formaPagamento}
                </p>
              </div>

              {/* Receipt Footer / Signatures */}
              <div className="mt-16">
                <div className="text-right mb-16">
                  <span className="text-[16px]"><span className="font-bold uppercase">{data.cidade || '_________________________'}</span>, {data.data ? formatDate(data.data) : '___/___/20__'}</span>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between mt-12 gap-8">
                  <div className="flex-1 flex flex-col items-center justify-center w-full">
                    <div className="w-80 border-t-2 border-black mb-2"></div>
                    <p className="text-[16px] font-bold uppercase">{data.recebedorNome || 'Assinatura do Recebedor'}</p>
                    {data.recebedorDocumento && (
                      <p className="text-[14px]">CPF/CNPJ: {data.recebedorDocumento}</p>
                    )}
                  </div>
                  
                  {data.chavePix && data.formaPagamento === 'PIX' && (
                    <div className="flex flex-col items-center p-3 border-2 border-black rounded-xl bg-gray-50">
                      <p className="text-xs font-bold text-black mb-2 uppercase tracking-wide">Pague com PIX</p>
                      <div className="bg-white p-2 rounded-lg shadow-sm mb-2 border border-gray-300">
                        <QRCodeCanvas 
                          value={generatePixPayload(data.chavePix, data.recebedorNome || 'Recebedor', data.cidade || 'Cidade', data.valor)} 
                          size={80}
                          level="M"
                        />
                      </div>
                      <p className="text-[10px] text-black font-mono break-all text-center max-w-[120px]">
                        Chave: {data.chavePix}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Segunda Via (Opcional) */}
            {duasVias && (
              <>
                <div className="w-full border-t-2 border-dashed border-gray-400 my-2 relative print:my-6">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-gray-400 text-[10px] uppercase tracking-widest">
                    Tesoura / Corte Aqui
                  </div>
                </div>
                
                <div className="p-6 md:p-8 relative">
                  {/* Receipt Header */}
                  <div className="flex justify-between items-start mb-6 border-b-2 border-black pb-4">
                    <div className="flex items-center gap-4 w-1/4">
                      {data.logo && !isReciboSimples && (
                        <img src={data.logo} alt="Logo" className="w-16 h-16 object-contain" />
                      )}
                    </div>
                    <div className="w-2/4 text-center">
                      <h1 className="text-3xl font-bold uppercase tracking-widest text-black">RECIBO</h1>
                      <p className="text-sm font-bold mt-1">Nº {data.numero || '001'}</p>
                    </div>
                    <div className="w-1/4 text-right">
                      <span className="text-xl font-bold text-black bg-gray-100 px-4 py-2 rounded border-2 border-black inline-block">
                        VALOR: R$ {data.valor || '0,00'}
                      </span>
                    </div>
                  </div>

                  {/* Receipt Body */}
                  <div className="space-y-6 text-[16px] leading-relaxed text-black mt-8">
                    <p className="text-justify indent-12">
                      Recebi(emos) de <span className="font-bold uppercase">{data.pagadorNome || '________________________________________________'}</span>, 
                      inscrito(a) no CPF/CNPJ sob o nº <span className="font-bold">{data.pagadorDocumento || '_________________________'}</span>, 
                      a importância de <span className="font-bold">R$ {data.valor || '0,00'}</span> {data.valor ? `(${getValorExtenso(data.valor)})` : ''}, 
                      referente a <span className="font-bold uppercase">{data.referenteA || '________________________________________________________________________________________________'}</span>.
                    </p>

                    <p className="text-justify indent-12">
                      Para maior clareza, firmo(amos) o presente recibo para que produza os seus efeitos legais, dando plena, rasa e geral quitação pelo valor recebido.
                    </p>

                    <p>
                      <span className="font-bold">Forma de Pagamento:</span> {data.formaPagamento}
                    </p>
                  </div>

                  {/* Receipt Footer / Signatures */}
                  <div className="mt-16">
                    <div className="text-right mb-16">
                      <span className="text-[16px]"><span className="font-bold uppercase">{data.cidade || '_________________________'}</span>, {data.data ? formatDate(data.data) : '___/___/20__'}</span>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between mt-12 gap-8">
                      <div className="flex-1 flex flex-col items-center justify-center w-full">
                        <div className="w-80 border-t-2 border-black mb-2"></div>
                        <p className="text-[16px] font-bold uppercase">{data.recebedorNome || 'Assinatura do Recebedor'}</p>
                        {data.recebedorDocumento && (
                          <p className="text-[14px]">CPF/CNPJ: {data.recebedorDocumento}</p>
                        )}
                      </div>
                      
                      {data.chavePix && data.formaPagamento === 'PIX' && (
                        <div className="flex flex-col items-center p-3 border-2 border-black rounded-xl bg-gray-50">
                          <p className="text-xs font-bold text-black mb-2 uppercase tracking-wide">Pague com PIX</p>
                          <div className="bg-white p-2 rounded-lg shadow-sm mb-2 border border-gray-300">
                            <QRCodeCanvas 
                              value={generatePixPayload(data.chavePix, data.recebedorNome || 'Recebedor', data.cidade || 'Cidade', data.valor)} 
                              size={80}
                              level="M"
                            />
                          </div>
                          <p className="text-[10px] text-black font-mono break-all text-center max-w-[120px]">
                            Chave: {data.chavePix}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
