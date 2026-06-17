import React, { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import CurrencyInput from 'react-currency-input-field';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import extenso from 'extenso';
import { Printer, FileText, ChevronRight, ChevronLeft, CheckCircle2, MessageCircle, Upload, QrCode, Download } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { cn } from '../utils/cn';
import { generatePixPayload } from '../utils/pix';

import { AdSense } from './AdSense';

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
  // Novos campos para Aluguel
  aluguelMesRef?: string;
  aluguelAnoRef?: string;
  aluguelCep?: string;
  aluguelEndereco?: string;
  aluguelNumero?: string;
  aluguelBairro?: string;
  aluguelComplemento?: string;
  aluguelCidade?: string;
  aluguelUf?: string;
  aluguelTipo?: string;
  observacao?: string;
  pagamentoDetalhes?: string; // Para conta, chave pix específica, etc.
  
  // Novos campos para Promissória
  vencimento?: string;
  quantidadeParcelas?: string;
  periodicidade?: 'mensal' | 'anual';
  avalistaNome?: string;
  avalistaDocumento?: string;
  avalistaTelefone?: string;
  devedorCep?: string;
  devedorEndereco?: string;
  devedorNumero?: string;
  devedorBairro?: string;
  devedorComplemento?: string;
  devedorCidade?: string;
  devedorUf?: string;
}

interface ReceiptGeneratorProps {
  key?: string;
  title: string;
  defaultReferenteA?: string;
}

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
    aluguelMesRef: 'Janeiro',
    aluguelAnoRef: new Date().getFullYear().toString(),
    aluguelCep: '',
    aluguelEndereco: '',
    aluguelNumero: '',
    aluguelBairro: '',
    aluguelComplemento: '',
    aluguelCidade: '',
    aluguelUf: '',
    aluguelTipo: '',
    observacao: '',
    pagamentoDetalhes: '',
    
    // Default Promissória
    vencimento: (() => {
      const today = new Date();
      today.setMonth(today.getMonth() + 1);
      return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    })(),
    quantidadeParcelas: '1',
    periodicidade: 'mensal',
    avalistaNome: '',
    avalistaDocumento: '',
    avalistaTelefone: '',
    devedorCep: '',
    devedorEndereco: '',
    devedorNumero: '',
    devedorBairro: '',
    devedorComplemento: '',
    devedorCidade: '',
    devedorUf: '',
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

  const getDocType = () => {
    const t = title.toLowerCase();
    if (t.includes('promissória')) return 'promissoria';
    if (t.includes('orçamento')) return 'orcamento';
    if (t.includes('ordem de serviço')) return 'os';
    if (t.includes('termo')) return 'termo';
    if (t.includes('vale-transporte')) return 'vale';
    if (t.includes('vale alimentação') || t.includes('vale-alimentação')) return 'vale-alimentacao';
    if (t.includes('aluguel') || t.includes('locação')) return 'aluguel';
    return 'recibo';
  };
  const docType = getDocType();

  const isSemLogo = isReciboSimples || (docType === 'aluguel' && !title.toLowerCase().includes('logo')) || docType === 'promissoria';
  const isComAvalista = title.toLowerCase().includes('avalista');

  const getStepTitle = (type: 'pagador' | 'recebedor') => {
    if (type === 'pagador') {
      if (docType === 'aluguel') return 'Dados do Locatário';
      if (docType === 'vale' || docType === 'vale-alimentacao') return 'Dados do Empregador';
      return 'Dados do Pagador';
    } else {
      if (docType === 'aluguel') return 'Dados do Locador';
      if (docType === 'vale' || docType === 'vale-alimentacao') return 'Dados do Funcionário';
      return 'Dados do Recebedor';
    }
  };

  const steps = docType === 'promissoria' 
    ? [
        { id: 'valor', title: 'Valores e Vencimento' },
        { id: 'credor', title: 'Dados do Credor' },
        { id: 'devedor', title: 'Dados do Devedor' },
        ...(isComAvalista ? [{ id: 'avalista', title: 'Dados do Avalista' }] : []),
        { id: 'detalhes', title: 'Praça de Pagamento' },
        { id: 'concluido', title: 'Finalizar' }
      ]
    : [
        { id: 'valor', title: 'Valor e Pagamento' },
        { id: 'pagador', title: getStepTitle('pagador') },
        { id: 'recebedor', title: getStepTitle('recebedor') },
        { id: 'detalhes', title: 'Detalhes do Recibo' },
        { id: 'concluido', title: 'Finalizar' }
      ];

  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Recibo_${data.pagadorNome || 'Documento'}`,
    onPrintError: (error) => {
      console.error('Print failed', error);
      alert('Não foi possível imprimir. Se você estiver no ambiente de visualização, abra o aplicativo em uma nova aba, ou use o botão de baixar PDF.');
    },
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

  const handleDocumentChange = (field: 'pagadorDocumento' | 'recebedorDocumento' | 'avalistaDocumento', value: string) => {
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
    const stepId = steps[currentStep].id;

    if (stepId === 'valor') {
      if (!data.valor || data.valor === '0,00' || data.valor === '0' || data.valor === '') {
        newErrors.valor = 'O valor é obrigatório';
        isValid = false;
      }
      if (docType === 'promissoria' && (!data.quantidadeParcelas || Number(data.quantidadeParcelas) < 1)) {
        newErrors.quantidadeParcelas = 'Quantia inválida';
        isValid = false;
      }
      if (docType === 'promissoria' && !data.vencimento) {
        newErrors.vencimento = 'Vencimento obrigatório';
        isValid = false;
      }
    } else if (stepId === 'pagador' || stepId === 'devedor') {
      if (!data.pagadorNome.trim()) {
        newErrors.pagadorNome = 'Nome é obrigatório';
        isValid = false;
      }
      if (data.pagadorDocumento && !validateDocument(data.pagadorDocumento)) {
        newErrors.pagadorDocumento = 'CPF/CNPJ inválido';
        isValid = false;
      }
    } else if (stepId === 'recebedor' || stepId === 'credor') {
      if (!data.recebedorNome.trim()) {
        newErrors.recebedorNome = 'Nome é obrigatório';
        isValid = false;
      }
      if (data.recebedorDocumento && !validateDocument(data.recebedorDocumento)) {
        newErrors.recebedorDocumento = 'CPF/CNPJ inválido';
        isValid = false;
      }
    } else if (stepId === 'avalista') {
      if (!data.avalistaNome?.trim()) {
        newErrors.avalistaNome = 'Nome do avalista é obrigatório';
        isValid = false;
      }
    } else if (stepId === 'detalhes') {
      if (docType !== 'aluguel' && docType !== 'promissoria' && !data.referenteA.trim()) {
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
    if (validateCurrentStep() && currentStep < steps.length - 1) {
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
      // Dynamically import heavy libraries for PDF generation
      const [html2canvasModule, jsPDFModule] = await Promise.all([
        import('html2canvas-pro'),
        import('jspdf')
      ]);
      const html2canvas = html2canvasModule.default;
      const { jsPDF } = jsPDFModule;

      // Force element to use desktop width for consistent PDF output
      const originalWidth = componentRef.current.style.width;
      const originalMaxWidth = componentRef.current.style.maxWidth;
      componentRef.current.style.width = '800px';
      componentRef.current.style.maxWidth = '800px';

      const canvas = await html2canvas(componentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff', // Ensures the gap rendering is white
        windowWidth: 800,
      });

      // Restore original styles
      componentRef.current.style.width = originalWidth;
      componentRef.current.style.maxWidth = originalMaxWidth;
      
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = 210; // A4 width
      const pdfHeight = 297; // A4 height
      const margin = 15; // standard print margin
      let contentWidth = pdfWidth - margin * 2;
      let contentHeight = (canvas.height * contentWidth) / canvas.width;
      
      // Prevent overflow if the receipt is unusually long
      if (contentHeight > pdfHeight - margin * 2) {
        contentHeight = pdfHeight - margin * 2;
        contentWidth = (canvas.width * contentHeight) / canvas.height;
      }
      
      // Center horizontally if width was scaled down
      const xPos = margin + (pdfWidth - margin * 2 - contentWidth) / 2;
      
      pdf.addImage(imgData, 'JPEG', xPos, margin, contentWidth, contentHeight);
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
    const text = `*${getDocTitle()} - R$ ${formatCurrency(data.valor)}*\n\nRecebi(emos) de *${data.pagadorNome}*${data.pagadorDocumento ? ` (CPF/CNPJ: ${data.pagadorDocumento})` : ''}, a importância de *R$ ${formatCurrency(data.valor)}*.\n\n${docType === 'aluguel' ? 'Referente ao pagamento do aluguel do imóvel.' : `Referente a: ${data.referenteA}.`}\nPagamento efetuado através de: ${data.formaPagamento}${data.pagamentoDetalhes ? ` - ${data.pagamentoDetalhes}` : ''}.\n\n${data.cidade}, ${formattedDate}.\n\nRecebedor: *${data.recebedorNome}*${data.recebedorDocumento ? ` (CPF/CNPJ: ${data.recebedorDocumento})` : ''}\n\n_Gerado gratuitamente em recibogratis.com.br_`;
    
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
    alert('Aviso: O WhatsApp Web (no computador) não permite enviar arquivos PDF diretamente pelo link. O sistema preencherá apenas o texto. Para enviar o documento, por favor, clique em "Baixar PDF" e anexe o arquivo manualmente na conversa.');
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
      const cleanStr = valorStr.replace(',', '.');
      const numericValue = parseFloat(cleanStr);
      if (isNaN(numericValue)) return '';
      return extenso(numericValue, { mode: 'currency' });
    } catch (e) {
      return '';
    }
  };

  const formatCurrency = (valorStr: string) => {
    if (!valorStr) return '0,00';
    try {
      const cleanStr = valorStr.replace(',', '.');
      const numericValue = parseFloat(cleanStr);
      if (isNaN(numericValue)) return '0,00';
      return numericValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } catch (e) {
      return '0,00';
    }
  };

  const getDocTitle = () => {
    if (docType === 'promissoria') return 'NOTA PROMISSÓRIA';
    if (docType === 'orcamento') return 'ORÇAMENTO';
    if (docType === 'os') return 'ORDEM DE SERVIÇO';
    if (docType === 'termo') return 'TERMO DE PRESTAÇÃO DE SERVIÇO';
    if (docType === 'vale') return 'VALE-TRANSPORTE';
    if (docType === 'vale-alimentacao') return 'RECIBO DE VALE-ALIMENTAÇÃO';
    if (docType === 'aluguel') return 'RECIBO DE ALUGUEL';
    return 'RECIBO';
  };

  const getDocumentBodyText = () => {
    switch (docType) {
      case 'promissoria':
        return (
          <>
            <p className="text-justify indent-8">
              Aos <span className="font-bold">{data.data ? formatDate(data.data) : '___/___/20__'}</span> pagarei(emos) por esta única via de NOTA PROMISSÓRIA a <span className="font-bold uppercase">{data.recebedorNome || '________________________________________________'}</span>, 
              inscrito(a) no CPF/CNPJ sob o nº <span className="font-bold">{data.recebedorDocumento || '_________________________'}</span> ou à sua ordem, a quantia de <span className="font-bold">R$ {formatCurrency(data.valor)}</span> {data.valor && data.valor !== '0,00' ? `(${getValorExtenso(data.valor)})` : ''},
              pagável em <span className="font-bold uppercase">{data.cidade || '_________________________'}</span>.
            </p>
            <p className="text-justify indent-8">
              Esta nota promissória é referente a <span className="font-bold uppercase">{data.referenteA || '________________________________________________________________________________________________'}</span>. 
              Fica eleito o foro desta referida praça de pagamento para dirimir qualquer dúvida.
            </p>
          </>
        );
      case 'orcamento':
      case 'os':
      case 'termo':
        return (
          <>
            <p className="text-justify indent-8">
              Empresa / Profissional: <span className="font-bold uppercase">{data.recebedorNome || '________________________________________________'}</span>, inscrito(a) no CPF/CNPJ sob o nº <span className="font-bold">{data.recebedorDocumento || '_________________________'}</span>.
            </p>
            <p className="text-justify indent-8">
              Cliente: <span className="font-bold uppercase">{data.pagadorNome || '________________________________________________'}</span>, inscrito(a) no CPF/CNPJ sob o nº <span className="font-bold">{data.pagadorDocumento || '_________________________'}</span>.
            </p>
            <p className="text-justify indent-8 mt-2">
              Apresentamos o presente {getDocTitle()} no valor total de <span className="font-bold">R$ {formatCurrency(data.valor)}</span> {data.valor && data.valor !== '0,00' ? `(${getValorExtenso(data.valor)})` : ''}, 
              referente aos seguintes serviços / produtos:
            </p>
            <p className="text-justify indent-8 mt-2 italic border border-gray-300 p-2">
              <span className="font-bold uppercase">{data.referenteA || '________________________________________________________________________________________________'}</span>
            </p>
            <p className="mt-4">
              <span className="font-bold">Forma de Pagamento sugerida/acordada:</span> {data.formaPagamento} {data.pagamentoDetalhes ? ` - ${data.pagamentoDetalhes}` : ''}
            </p>
          </>
        );
      case 'vale':
        return (
          <>
            <p className="text-justify indent-8">
              Recebi(emos) de <span className="font-bold uppercase">{data.pagadorNome || '________________________________________________'}</span>, 
              inscrito(a) no CPF/CNPJ sob o nº <span className="font-bold">{data.pagadorDocumento || '_________________________'}</span>, 
              o correspondente a vale-transporte / auxílio deslocamento no valor de <span className="font-bold">R$ {formatCurrency(data.valor)}</span> {data.valor && data.valor !== '0,00' ? `(${getValorExtenso(data.valor)})` : ''}, 
              referente a <span className="font-bold uppercase">{data.referenteA || '________________________________________________________________________________________________'}</span>.
            </p>

            <p className="text-justify indent-8">
              Declaro que os valores recebidos serão utilizados exclusivamente para despesas de deslocamento e assumo a responsabilidade por estas informações.
            </p>
          </>
        );
      case 'vale-alimentacao':
        return (
          <>
            <p className="text-justify indent-8">
              Recebi(emos) de <span className="font-bold uppercase">{data.pagadorNome || '________________________________________________'}</span>, 
              inscrito(a) no CPF/CNPJ sob o nº <span className="font-bold">{data.pagadorDocumento || '_________________________'}</span>, 
              o correspondente a vale-alimentação / auxílio alimentação no valor de <span className="font-bold">R$ {formatCurrency(data.valor)}</span> {data.valor && data.valor !== '0,00' ? `(${getValorExtenso(data.valor)})` : ''}, 
              referente a <span className="font-bold uppercase">{data.referenteA || '________________________________________________________________________________________________'}</span>.
            </p>

            <p className="text-justify indent-8">
              Declaro que os valores recebidos serão utilizados exclusivamente para despesas com alimentação e assumo a responsabilidade por estas informações.
            </p>
          </>
        );
      case 'aluguel':
        return (
          <>
            <p className="text-justify indent-8">
              Recebi(emos) de <span className="font-bold uppercase">{data.pagadorNome || '________________________________________________'}</span>, 
              inscrito(a) no CPF/CNPJ sob o nº <span className="font-bold">{data.pagadorDocumento || '_________________________'}</span>, 
              a importância de <span className="font-bold">R$ {formatCurrency(data.valor)}</span> {data.valor && data.valor !== '0,00' ? `(${getValorExtenso(data.valor)})` : ''}, 
              referente ao pagamento do aluguel do imóvel localizado em: <span className="font-bold">{data.aluguelEndereco || '______________________'}, {data.aluguelNumero || '___'} {data.aluguelComplemento ? ` - ${data.aluguelComplemento}` : ''} - {data.aluguelBairro || '______________'} - {data.aluguelCidade || '______________'}/{data.aluguelUf || '__'} - CEP: {data.aluguelCep || '________-___'} - {data.aluguelTipo || '_____________'}</span>,
              competência / mês de referência: <span className="font-bold uppercase">{data.aluguelMesRef || '_____'} / {data.aluguelAnoRef || '____'}</span>.
            </p>

            <p className="text-justify indent-8">
              Para maior clareza, firmo(amos) o presente documento para que produza os seus efeitos legais, dando plena, rasa e geral quitação pelo valor acima recebido.
            </p>

            <p>
              <span className="font-bold">Forma de Pagamento:</span> {data.formaPagamento} {data.pagamentoDetalhes ? ` - ${data.pagamentoDetalhes}` : ''}
            </p>
            {data.observacao && (
              <p className="mt-2 text-justify">
                <span className="font-bold">Observação:</span> {data.observacao}
              </p>
            )}
          </>
        );
      default:
        // Padrão (Recibo)
        return (
          <>
            <p className="text-justify indent-8">
              Recebi(emos) de <span className="font-bold uppercase">{data.pagadorNome || '________________________________________________'}</span>, 
              inscrito(a) no CPF/CNPJ sob o nº <span className="font-bold">{data.pagadorDocumento || '_________________________'}</span>, 
              a importância de <span className="font-bold">R$ {formatCurrency(data.valor)}</span> {data.valor && data.valor !== '0,00' ? `(${getValorExtenso(data.valor)})` : ''}, 
              referente a <span className="font-bold uppercase">{data.referenteA || '________________________________________________________________________________________________'}</span>.
            </p>

            <p className="text-justify indent-8">
              Para maior clareza, firmo(amos) o presente documento para que produza os seus efeitos legais, dando plena, rasa e geral quitação pelo valor acima recebido.
            </p>

            <p>
              <span className="font-bold">Forma de Pagamento:</span> {data.formaPagamento} {data.pagamentoDetalhes ? ` - ${data.pagamentoDetalhes}` : ''}
            </p>
          </>
        );
    }
  };

  const getPagadorLabel = () => {
    if (docType === 'promissoria') return 'Nome do Emitente (Quem vai pagar)';
    if (docType === 'orcamento' || docType === 'os' || docType === 'termo') return 'Nome do Cliente';
    if (docType === 'vale' || docType === 'vale-alimentacao') return 'Nome da Empresa / Empregador (Quem paga)';
    if (docType === 'aluguel') return 'Locatário(a)';
    return 'Quem está pagando? (Pagador)';
  };

  const getRecebedorLabel = () => {
    if (docType === 'promissoria') return 'Nome do Credor / Beneficiário';
    if (docType === 'orcamento' || docType === 'os' || docType === 'termo') return 'Nome do Profissional ou Empresa';
    if (docType === 'vale' || docType === 'vale-alimentacao') return 'Nome do Funcionário / Beneficiário';
    if (docType === 'aluguel') return 'Locador(a)';
    return 'Quem está recebendo? (Recebedor)';
  };

  const getSignatureTitle = () => {
    if (docType === 'promissoria') return 'Assinatura do Emitente (Pagador)';
    if (docType === 'orcamento' || docType === 'os') return 'Assinatura do Profissional / Empresa';
    if (docType === 'vale' || docType === 'vale-alimentacao') return 'Assinatura do Beneficiário';
    return 'Assinatura do Recebedor';
  };

  const getSignatureName = () => {
    if (docType === 'promissoria') return data.pagadorNome || getSignatureTitle();
    return data.recebedorNome || getSignatureTitle();
  };
  
  const getSignatureDoc = () => {
    if (docType === 'promissoria') return data.pagadorDocumento;
    return data.recebedorDocumento;
  };

  const renderPromissoria = (index: number, total: number) => {
    // Calculando a data de vencimento da parcela atual
    let currentVencimento = '';
    if (data.vencimento) {
      const vDate = new Date(data.vencimento + 'T12:00:00'); // Evitar problemas de timezone
      if (data.periodicidade === 'mensal') {
        vDate.setMonth(vDate.getMonth() + index);
      } else if (data.periodicidade === 'anual') {
        vDate.setFullYear(vDate.getFullYear() + index);
      }
      currentVencimento = formatDate(vDate.toISOString().split('T')[0]);
    } else {
      currentVencimento = '___/___/20__';
    }

    const nTitulo = total > 1 ? `Nº ${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}` : `Nº 01 / 01`;

    return (
      <div key={`promissoria-${index}`} className="bg-[#FFFFE0] p-4 relative shadow-xl print:shadow-none border-2 border-black break-inside-avoid w-full mb-6 print:mb-4 font-sans">
        
        {/* Avalista Sidebar (Classic yellow style) */}
        {isComAvalista && (
          <div className="absolute left-0 top-0 bottom-0 w-8 border-r-2 border-black flex items-center justify-center writing-vertical-lr rotate-180">
            <span className="text-xs font-bold tracking-widest uppercase">Avalista(s)</span>
          </div>
        )}

        <div className={`flex justify-between items-center border-b border-black pb-2 mb-3 ${isComAvalista ? 'ml-10' : ''}`}>
          <div className="w-1/3">
            <p className="text-lg font-bold">{nTitulo}</p>
            <p className="font-semibold text-xs mt-1 uppercase">Vencimento: <span className="bg-white border text-sm border-black px-2 py-1 inline-block min-w-[120px] text-center ml-2">{currentVencimento}</span></p>
          </div>
          <div className="w-1/3 text-center">
            <h1 className="text-xl font-bold uppercase tracking-widest leading-tight">
              NOTA PROMISSÓRIA
            </h1>
          </div>
          <div className="w-1/3 flex justify-end">
             <div className="flex items-center text-lg font-bold">
               <span className="mr-2">R$</span>
               <div className="bg-white border text-xl border-black px-4 py-1 min-w-[150px] text-right">
                 {formatCurrency(data.valor)}
               </div>
             </div>
          </div>
        </div>

        <div className={`space-y-3 text-[13px] leading-relaxed text-black ${isComAvalista ? 'ml-10' : ''}`}>
          <p className="text-justify indent-8 tracking-tight">
            Aos <span className="font-bold underline px-1">{currentVencimento}</span> pagarei(emos) por esta única via de NOTA PROMISSÓRIA a <span className="font-bold uppercase underline px-1">{data.recebedorNome || '________________________________________________'}</span>, 
            CPF/CNPJ <span className="font-bold underline px-1">{data.recebedorDocumento || '_________________________'}</span>, ou à sua ordem, a quantia de <span className="font-bold bg-gray-200 border border-gray-400 px-2 inline-block"> {data.valor && data.valor !== '0,00' ? getValorExtenso(data.valor) : '____________________________________________________'} </span>,
            em moeda corrente deste país, pagável em <span className="font-bold uppercase underline px-1">{data.cidade || '_________________________'}</span>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border-t border-black pt-2">
            <div>
              <p className="font-bold text-[11px] uppercase mb-1">Emitente (Devedor):</p>
              <div className="text-xs space-y-1">
                <p>Nome: <span className="uppercase border-b border-black border-dotted block w-full">{data.pagadorNome || ''}</span></p>
                <div className="flex gap-2">
                  <p className="w-1/2">CPF/CNPJ: <span className="border-b border-black border-dotted block w-full">{data.pagadorDocumento || ''}</span></p>
                  <p className="w-1/2">Data Emissão: <span className="border-b border-black border-dotted block w-full">{data.data ? formatDate(data.data) : ''}</span></p>
                </div>
                <p>Endereço: <span className="uppercase border-b border-black border-dotted block w-full">{data.devedorEndereco ? `${data.devedorEndereco}, ${data.devedorNumero} ${data.devedorComplemento ? '- ' + data.devedorComplemento : ''}` : ''}</span></p>
              </div>
            </div>
            {isComAvalista ? (
              <div>
                <p className="font-bold text-[11px] uppercase mb-1">Avalista:</p>
                <div className="text-xs space-y-1">
                  <p>Nome: <span className="uppercase border-b border-black border-dotted block w-full">{data.avalistaNome || ''}</span></p>
                  <div className="flex gap-2">
                    <p className="w-1/2">CPF/CNPJ: <span className="border-b border-black border-dotted block w-full">{data.avalistaDocumento || ''}</span></p>
                    <p className="w-1/2">Telefone: <span className="border-b border-black border-dotted block w-full">{data.avalistaTelefone || ''}</span></p>
                  </div>
                  <p>Endereço: <span className="uppercase border-b border-black border-dotted block w-full"></span></p>
                </div>
              </div>
            ) : (
              <div className="flex items-end justify-end">
                 <div className="text-xs flex flex-col items-center w-[250px]">
                   <div className="w-full border-t border-black border-dashed mb-1"></div>
                   <p className="font-bold uppercase text-[10px]">Assinatura do Emitente</p>
                 </div>
              </div>
            )}
          </div>

          {isComAvalista && (
            <div className="flex justify-between items-end mt-4 pt-2">
               <div className="text-xs w-1/3">
                 <p className="font-bold text-[10px] uppercase">Praça Pagamento:</p>
                 <p className="border-b border-black border-dotted">{data.cidade || ''}</p>
               </div>
               
               <div className="flex gap-4 w-2/3 justify-end">
                 <div className="flex flex-col items-center w-[200px]">
                   <div className="w-full border-t border-black mb-1"></div>
                   <p className="text-[10px] font-bold uppercase">{data.pagadorNome || 'Assinatura Emitente'}</p>
                 </div>

                 <div className="flex flex-col items-center w-[200px]">
                   <div className="w-full border-t border-black mb-1"></div>
                   <p className="text-[10px] font-bold uppercase">{data.avalistaNome || 'Assinatura Avalista'}</p>
                 </div>
               </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-8">
      {/* Form Section - Wizard */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <FileText className="text-emerald-600" />
            Preenchimento Inteligente
          </h2>
          <p className="text-gray-500 text-sm">Passo {currentStep + 1} de {steps.length}: {steps[currentStep].title}</p>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-100 h-2 rounded-full mt-4 overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="min-h-[280px]">
          {steps[currentStep].id === 'valor' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              {docType === 'promissoria' ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                    <div className="md:col-span-2">
                      <label htmlFor="quantidadeParcelas" className="block text-sm font-semibold text-gray-900 mb-2">Quantas?</label>
                      <input
                        id="quantidadeParcelas"
                        type="number"
                        min="1"
                        max="120"
                        name="quantidadeParcelas"
                        value={data.quantidadeParcelas}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      />
                    </div>
                    <div className="md:col-span-4">
                      <label htmlFor="valor-promissoria" className="block text-sm font-semibold text-gray-900 mb-2">Valor <span className="text-red-500">*</span></label>
                      <CurrencyInput
                         id="valor-promissoria"
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
                       />
                       {errors.valor && <p className="text-red-500 text-sm mt-2">{errors.valor}</p>}
                    </div>
                    <div className="md:col-span-4">
                      <label htmlFor="vencimento" className="block text-sm font-semibold text-gray-900 mb-2">Vencimento <span className="text-red-500">*</span></label>
                      <input
                        id="vencimento"
                        type="date"
                        name="vencimento"
                        value={data.vencimento}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      />
                    </div>
                    <div className="md:col-span-2 pb-2">
                      <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="periodicidade" value="mensal" checked={data.periodicidade === 'mensal'} onChange={handleChange} className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" />
                          <span className="text-sm font-medium">mensal</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="periodicidade" value="anual" checked={data.periodicidade === 'anual'} onChange={handleChange} className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" />
                          <span className="text-sm font-medium">anual</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
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
                    onChange={(e) => {
                      handleChange(e);
                      setData(prev => ({ ...prev, pagamentoDetalhes: '' })); // clear on change
                    }}
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white"
                  >
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="PIX">PIX</option>
                    <option value="Transferência">Transferência / Depósito</option>
                    <option value="Cartão de Crédito">Cartão de Crédito</option>
                    <option value="Cartão de Débito">Cartão de Débito</option>
                    <option value="Cheque">Cheque</option>
                  </select>
                </div>
              </div>
              
              {(data.formaPagamento === 'PIX' || data.formaPagamento.includes('Transferência') || data.formaPagamento.includes('Cartão') || data.formaPagamento === 'Cheque') && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <label htmlFor="pagamentoDetalhes" className="block text-sm font-semibold text-gray-900 mb-2">
                    {data.formaPagamento === 'PIX' && 'Qual a chave PIX utilizada? (Opcional)'}
                    {data.formaPagamento.includes('Transferência') && 'Banco, Agência e Conta (Opcional)'}
                    {data.formaPagamento.includes('Cartão') && 'Bandeira e/ou 4 últimos dígitos (Opcional)'}
                    {data.formaPagamento === 'Cheque' && 'Número do Cheque / Banco (Opcional)'}
                  </label>
                  <input
                    id="pagamentoDetalhes"
                    type="text"
                    name="pagamentoDetalhes"
                    value={data.pagamentoDetalhes}
                    onChange={handleChange}
                    placeholder={
                      data.formaPagamento === 'PIX' ? 'Ex: (11) 99999-9999' :
                      data.formaPagamento.includes('Transferência') ? 'Ex: Banco Itaú, Ag 1234, Cc 12345-6' :
                      data.formaPagamento.includes('Cartão') ? 'Ex: Visa final 1234' :
                      'Ex: Cheque nº 000001 Banco Bradesco'
                    }
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
              )}

              {docType === 'aluguel' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div>
                    <label htmlFor="aluguelMesRef" className="block text-sm font-semibold text-gray-900 mb-2">Mês de ref.:</label>
                    <select
                      id="aluguelMesRef"
                      name="aluguelMesRef"
                      value={data.aluguelMesRef}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white"
                    >
                      {['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'].map(mes => (
                        <option key={mes} value={mes}>{mes}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="aluguelAnoRef" className="block text-sm font-semibold text-gray-900 mb-2">Ano:</label>
                    <input
                      id="aluguelAnoRef"
                      type="text"
                      name="aluguelAnoRef"
                      value={data.aluguelAnoRef}
                      onChange={handleChange}
                      maxLength={4}
                      className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  </div>
                </div>
              )}
              
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
            </>
          )}
        </div>
      )}

          {(steps[currentStep].id === 'pagador' || steps[currentStep].id === 'devedor') && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div>
                <label htmlFor="pagadorNome" className="block text-sm font-semibold text-gray-900 mb-2">
                  {getPagadorLabel()}
                   <span className="text-red-500">*</span>
                </label>
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
                <label htmlFor="pagadorDocumento" className="block text-sm font-semibold text-gray-900 mb-2">
                  {docType === 'promissoria' ? 'CPF ou CNPJ do Emitente' : 
                   (docType === 'orcamento' || docType === 'os' || docType === 'termo') ? 'CPF ou CNPJ do Cliente' : 
                   (docType === 'aluguel' ? 'CPF ou CNPJ (Opcional)' : 
                   'CPF ou CNPJ do Pagador')}
                </label>
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

              {docType === 'promissoria' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div>
                    <label htmlFor="devedorCep" className="block text-sm font-semibold text-gray-900 mb-2">CEP</label>
                    <input id="devedorCep" name="devedorCep" value={data.devedorCep} onChange={handleChange} placeholder="00000-000" className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div>
                    <label htmlFor="devedorEndereco" className="block text-sm font-semibold text-gray-900 mb-2">Endereço</label>
                    <input id="devedorEndereco" name="devedorEndereco" value={data.devedorEndereco} onChange={handleChange} placeholder="Rua, Avenida..." className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div>
                    <label htmlFor="devedorNumero" className="block text-sm font-semibold text-gray-900 mb-2">Número</label>
                    <input id="devedorNumero" name="devedorNumero" value={data.devedorNumero} onChange={handleChange} className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div>
                    <label htmlFor="devedorBairro" className="block text-sm font-semibold text-gray-900 mb-2">Bairro</label>
                    <input id="devedorBairro" name="devedorBairro" value={data.devedorBairro} onChange={handleChange} className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div>
                    <label htmlFor="devedorComplemento" className="block text-sm font-semibold text-gray-900 mb-2">Complemento</label>
                    <input id="devedorComplemento" name="devedorComplemento" value={data.devedorComplemento} onChange={handleChange} className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="devedorCidade" className="block text-sm font-semibold text-gray-900 mb-2">Cidade</label>
                      <input id="devedorCidade" name="devedorCidade" value={data.devedorCidade} onChange={handleChange} className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    <div>
                      <label htmlFor="devedorUf" className="block text-sm font-semibold text-gray-900 mb-2">UF</label>
                      <input id="devedorUf" name="devedorUf" value={data.devedorUf} onChange={handleChange} maxLength={2} className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 uppercase" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {(steps[currentStep].id === 'recebedor' || steps[currentStep].id === 'credor') && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              {!isSemLogo && (
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
                <label htmlFor="recebedorNome" className="block text-sm font-semibold text-gray-900 mb-2">
                  {getRecebedorLabel()}
                   <span className="text-red-500">*</span>
                </label>
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
                  <label htmlFor="recebedorDocumento" className="block text-sm font-semibold text-gray-900 mb-2">
                    {docType === 'promissoria' ? 'CPF ou CNPJ do Credor' : 
                     (docType === 'orcamento' || docType === 'os' || docType === 'termo') ? 'CNPJ ou CPF do Profissional' : 
                     (docType === 'aluguel' ? 'CPF ou CNPJ (Opcional)' : 
                     'CPF ou CNPJ do Recebedor')}
                  </label>
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

          {steps[currentStep].id === 'avalista' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="font-bold text-gray-900 border-b pb-2 mb-4 uppercase text-sm">Dados do Avalista</h3>
              <div>
                <label htmlFor="avalistaNome" className="block text-sm font-semibold text-gray-900 mb-2">Nome <span className="text-red-500">*</span></label>
                <input
                  id="avalistaNome"
                  type="text"
                  name="avalistaNome"
                  value={data.avalistaNome}
                  onChange={handleChange}
                  placeholder="Nome do avalista"
                  autoFocus
                  className={cn(
                    "w-full px-4 py-3 text-lg border rounded-xl focus:ring-2 outline-none transition-all",
                    errors.avalistaNome ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                  )}
                />
                {errors.avalistaNome && <p className="text-red-500 text-sm mt-2">{errors.avalistaNome}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="avalistaDocumento" className="block text-sm font-semibold text-gray-900 mb-2">CPF ou CNPJ</label>
                  <input
                    id="avalistaDocumento"
                    type="text"
                    value={data.avalistaDocumento}
                    onChange={(e) => handleDocumentChange('avalistaDocumento', e.target.value)}
                    placeholder="000.000.000-00"
                    maxLength={18}
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="avalistaTelefone" className="block text-sm font-semibold text-gray-900 mb-2">Telefone (opcional)</label>
                  <input
                    id="avalistaTelefone"
                    type="text"
                    name="avalistaTelefone"
                    value={data.avalistaTelefone}
                    onChange={handleChange}
                    placeholder="(00) 00000-0000"
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {steps[currentStep].id === 'detalhes' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              {docType === 'aluguel' ? (
                <>
                  <h3 className="font-bold text-gray-900 border-b pb-2 mb-4 uppercase text-sm">Endereço do Imóvel Locado</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="aluguelCep" className="block text-sm font-semibold text-gray-900 mb-2">CEP</label>
                      <input id="aluguelCep" name="aluguelCep" value={data.aluguelCep} onChange={handleChange} placeholder="00000-000" className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    <div>
                      <label htmlFor="aluguelEndereco" className="block text-sm font-semibold text-gray-900 mb-2">Endereço</label>
                      <input id="aluguelEndereco" name="aluguelEndereco" value={data.aluguelEndereco} onChange={handleChange} placeholder="Rua, Avenida..." className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    <div>
                      <label htmlFor="aluguelNumero" className="block text-sm font-semibold text-gray-900 mb-2">Número</label>
                      <input id="aluguelNumero" name="aluguelNumero" value={data.aluguelNumero} onChange={handleChange} className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    <div>
                      <label htmlFor="aluguelBairro" className="block text-sm font-semibold text-gray-900 mb-2">Bairro</label>
                      <input id="aluguelBairro" name="aluguelBairro" value={data.aluguelBairro} onChange={handleChange} className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    <div>
                      <label htmlFor="aluguelComplemento" className="block text-sm font-semibold text-gray-900 mb-2">Complemento</label>
                      <input id="aluguelComplemento" name="aluguelComplemento" value={data.aluguelComplemento} onChange={handleChange} className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    <div>
                      <label htmlFor="aluguelCidade" className="block text-sm font-semibold text-gray-900 mb-2">Cidade do Imóvel</label>
                      <input id="aluguelCidade" name="aluguelCidade" value={data.aluguelCidade} onChange={handleChange} className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    <div>
                      <label htmlFor="aluguelUf" className="block text-sm font-semibold text-gray-900 mb-2">UF</label>
                      <input id="aluguelUf" name="aluguelUf" value={data.aluguelUf} onChange={handleChange} maxLength={2} className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 uppercase" />
                    </div>
                    <div>
                      <label htmlFor="aluguelTipo" className="block text-sm font-semibold text-gray-900 mb-2">Tipo Imóvel</label>
                      <input id="aluguelTipo" name="aluguelTipo" value={data.aluguelTipo} onChange={handleChange} placeholder="Ex: Apartamento, Casa, Sala..." className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="observacao" className="block text-sm font-semibold text-gray-900 mb-2">Observação (Opcional)</label>
                    <textarea id="observacao" name="observacao" value={data.observacao} onChange={handleChange} rows={2} className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 resize-none" />
                  </div>
                </>
              ) : (
                <div>
                  <label htmlFor="referenteA" className="block text-sm font-semibold text-gray-900 mb-2">
                    {docType === 'promissoria' ? 'Termos e acordos do pagamento' : 
                     (docType === 'orcamento' || docType === 'os') ? 'Descrição dos serviços orçados/executados' : 
                     'Referente a quê (Serviços/Produtos)?'} 
                     <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="referenteA"
                    name="referenteA"
                    value={data.referenteA}
                    onChange={handleChange}
                    onFocus={(e) => {
                      if (e.target.value === defaultReferenteA) {
                        setData(prev => ({ ...prev, referenteA: '' }));
                      } else if (e.target.value.includes('[descreva o motivo do pagamento]')) {
                        setData(prev => ({ ...prev, referenteA: '' }));
                      }
                    }}
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
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cidade" className="block text-sm font-semibold text-gray-900 mb-2">
                    {docType === 'promissoria' ? 'Cidade/Estado (Praça)' : 'Cidade de Emissão'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="cidade"
                    type="text"
                    name="cidade"
                    value={data.cidade}
                    onChange={handleChange}
                    placeholder={docType === 'promissoria' ? "Ex: Anitápolis/SC" : "Sua Cidade"}
                    className={cn(
                      "w-full px-4 py-3 text-lg border rounded-xl focus:ring-2 outline-none transition-all",
                      errors.cidade ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                    )}
                  />
                  {errors.cidade && <p className="text-red-500 text-sm mt-2">{errors.cidade}</p>}
                </div>
                <div>
                  <label htmlFor="data" className="block text-sm font-semibold text-gray-900 mb-2">
                    {docType === 'promissoria' ? 'Data de Emissão' : 
                     (docType === 'orcamento') ? 'Data de Validade (Ou Emissão)' : 
                     'Data de Emissão'} <span className="text-red-500">*</span>
                  </label>
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
              {docType === 'promissoria' && (
                <div>
                  <label htmlFor="observacao" className="block text-sm font-semibold text-gray-900 mb-2">Observação (Opcional)</label>
                  <textarea
                    id="observacao"
                    name="observacao"
                    value={data.observacao}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 resize-none"
                  />
                </div>
              )}
            </div>
          )}

          {steps[currentStep].id === 'concluido' && (
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
        {steps[currentStep].id === 'concluido' && (
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
        <div className="bg-gray-100 p-4 rounded-2xl flex justify-center overflow-x-auto border border-gray-200">
          <div ref={componentRef} className="text-black font-sans print:w-full print:max-w-none" style={{ width: '100%', maxWidth: '800px', margin: '0 auto', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact', padding: '10px 0', backgroundColor: '#ffffff' }}>
            
            {docType === 'promissoria' ? (
              Array.from({ length: Number(data.quantidadeParcelas || 1) }).map((_, i) => {
                const totalParcelas = Number(data.quantidadeParcelas || 1);
                const isLast = i === totalParcelas - 1;
                const isLastOnPage = (i + 1) % 3 === 0;

                return (
                  <div key={i} className={isLastOnPage ? "print:break-after-page" : ""}>
                    {renderPromissoria(i, totalParcelas)}
                    {!isLast && !isLastOnPage && (
                      <div className="w-full border-t-2 border-dashed border-gray-400 my-8 relative print:my-8 hidden print:block">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                          Tesoura / Corte Aqui
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <>
                {/* Primeira Via */}
                <div className="bg-white p-4 md:p-6 relative shadow-xl print:shadow-none border-2 border-black break-inside-avoid">
                  {/* Receipt Header */}
                  <div className="flex justify-between items-start mb-4 border-b-2 border-black pb-3">
                    <div className="flex items-center gap-4 w-1/4">
                      {data.logo && !isSemLogo && (
                        <img src={data.logo} alt="Logo" className="w-16 h-16 object-contain" />
                      )}
                    </div>
                    <div className="w-2/4 text-center">
                      <div className="text-3xl font-bold uppercase tracking-widest text-black">{getDocTitle()}</div>
                      <p className="text-sm font-bold mt-1">Nº {data.numero || '001'}</p>
                    </div>
                    <div className="w-1/4 flex justify-end">
                      <span className="text-xl font-bold text-black bg-gray-100 px-4 py-2 rounded border-2 border-black whitespace-nowrap">
                        VALOR: R$ {formatCurrency(data.valor)}
                      </span>
                    </div>
                  </div>

                  {/* Receipt Body */}
                  <div className="space-y-2 text-[15px] md:text-[16px] leading-snug text-black mt-4">
                    {getDocumentBodyText()}
                  </div>

                  {/* Receipt Footer / Signatures */}
                  <div className="mt-6">
                    <div className="text-right mb-6">
                      <span className="text-[15px] md:text-[16px]"><span className="font-bold uppercase">{data.cidade || '_________________________'}</span>, {data.data ? formatDate(data.data) : '___/___/20__'}</span>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-6">
                      <div className="flex-1 flex flex-col items-center justify-center w-full">
                        <div className="w-80 border-t-2 border-black mb-2"></div>
                        <p className="text-[16px] font-bold uppercase">{getSignatureName()}</p>
                        {getSignatureDoc() && (
                          <p className="text-[14px]">CPF/CNPJ: {getSignatureDoc()}</p>
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
                    {/* Divisória Tesoura */}
                    <div className="w-full border-t-2 border-dashed border-gray-400 my-8 relative print:my-10">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                        Tesoura / Corte Aqui
                      </div>
                    </div>

                    <div className="bg-white p-4 md:p-6 relative shadow-xl print:shadow-none border-2 border-black break-inside-avoid">
                    {/* Receipt Header */}
                      <div className="flex justify-between items-start mb-4 border-b-2 border-black pb-3">
                        <div className="flex items-center gap-4 w-1/4">
                          {data.logo && !isSemLogo && (
                            <img src={data.logo} alt="Logo" className="w-16 h-16 object-contain" />
                          )}
                        </div>
                        <div className="w-2/4 text-center">
                          <div className="text-3xl font-bold uppercase tracking-widest text-black">{getDocTitle()}</div>
                          <p className="text-sm font-bold mt-1">Nº {data.numero || '001'}</p>
                        </div>
                        <div className="w-1/4 flex justify-end">
                          <span className="text-xl font-bold text-black bg-gray-100 px-4 py-2 rounded border-2 border-black whitespace-nowrap">
                            VALOR: R$ {formatCurrency(data.valor)}
                          </span>
                        </div>
                      </div>

                      {/* Receipt Body */}
                      <div className="space-y-2 text-[15px] md:text-[16px] leading-snug text-black mt-4">
                        {getDocumentBodyText()}
                      </div>

                      {/* Receipt Footer / Signatures */}
                      <div className="mt-6">
                        <div className="text-right mb-6">
                          <span className="text-[15px] md:text-[16px]"><span className="font-bold uppercase">{data.cidade || '_________________________'}</span>, {data.data ? formatDate(data.data) : '___/___/20__'}</span>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-6">
                          <div className="flex-1 flex flex-col items-center justify-center w-full">
                            <div className="w-80 border-t-2 border-black mb-2"></div>
                            <p className="text-[16px] font-bold uppercase">{getSignatureName()}</p>
                            {getSignatureDoc() && (
                              <p className="text-[14px]">CPF/CNPJ: {getSignatureDoc()}</p>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
