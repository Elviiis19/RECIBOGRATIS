import { useState } from 'react';
import { SEO } from '../../components/SEO';
import { AdSense } from '../../components/AdSense';
import { ShieldCheck, CheckCircle, XCircle } from 'lucide-react';

export function ValidadorCpfCnpj() {
  const [doc, setDoc] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [docType, setDocType] = useState<string>('');

  const cleanDocument = (value: string) => value.replace(/\D/g, '');

  const formatDocument = (value: string) => {
    const cleaned = cleanDocument(value);
    if (cleaned.length <= 11) {
      return cleaned
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .substring(0, 14);
    } else {
      return cleaned
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{1,2})/, '$1-$2')
        .substring(0, 18);
    }
  };

  const checkCPF = (strCPF: string) => {
    let sum;
    let rest;
    sum = 0;
    if (strCPF === "00000000000" || strCPF === "11111111111" || strCPF === "22222222222") return false;

    for (let i = 1; i <= 9; i++) sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    rest = (sum * 10) % 11;

    if ((rest === 10) || (rest === 11)) rest = 0;
    if (rest !== parseInt(strCPF.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    rest = (sum * 10) % 11;

    if ((rest === 10) || (rest === 11)) rest = 0;
    if (rest !== parseInt(strCPF.substring(10, 11))) return false;
    return true;
  };

  const checkCNPJ = (cnpj: string) => {
    if (cnpj === "00000000000000") return false;
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(0))) return false;
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(1))) return false;
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formatted = formatDocument(rawValue);
    setDoc(formatted);

    const cleaned = cleanDocument(formatted);
    if (cleaned.length === 11) {
      setIsValid(checkCPF(cleaned));
      setDocType('CPF');
    } else if (cleaned.length === 14) {
      setIsValid(checkCNPJ(cleaned));
      setDocType('CNPJ');
    } else {
      setIsValid(null);
      setDocType('');
    }
  };

  return (
    <>
      <SEO 
        title="Validador e Formatador de CPF e CNPJ Online"
        description="Cheque se um número de CPF ou CNPJ é válido de acordo com o algoritmo da Receita Federal. Ferramenta grátis de pontuação e formatação."
        keywords="validar cpf, checar cnpj, formatador cnpj, validar cnpj algoritmo, verificar validade rf"
      />
      <div className="bg-emerald-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <ShieldCheck className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl font-extrabold mb-4">Validador de CPF e CNPJ</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Verifique instantaneamente se a pontuação e os dígitos verificadores de um documento são válidos.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <AdSense />
        
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 my-8 text-center">
          <label className="block text-sm font-semibold text-gray-900 mb-4">Insira o Documento (Apenas Números ou Pontuado)</label>
          <input
            type="text"
            value={doc}
            onChange={handleChange}
            placeholder="000.000.000-00"
            className="w-full max-w-md mx-auto px-6 py-4 text-2xl text-center border rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500 font-bold transition-all"
          />

          <div className="mt-8 h-24 flex items-center justify-center">
            {isValid === true && (
              <div className="flex flex-col items-center text-green-600 animate-in fade-in zoom-in duration-300">
                <CheckCircle className="w-12 h-12 mb-2" />
                <span className="font-bold text-xl">{docType} Válido!</span>
              </div>
            )}
            {isValid === false && (
              <div className="flex flex-col items-center text-red-600 animate-in fade-in zoom-in duration-300">
                <XCircle className="w-12 h-12 mb-2" />
                <span className="font-bold text-xl">{docType || 'Documento'} Inválido!</span>
                 <p className="text-sm text-gray-500 mt-1">Falha na verificação algorítmica.</p>
              </div>
            )}
             {isValid === null && doc.length > 0 && (
                <div className="text-gray-400 font-medium">Continue digitando ({cleanDocument(doc).length} dígitos)</div>
             )}
          </div>
        </div>

        <AdSense />
      </div>
    </>
  );
}
