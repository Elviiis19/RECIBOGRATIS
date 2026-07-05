import React, { useState } from 'react';
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
        title="Validador e Formatador de CPF e CNPJ Online - Grátis"
        description="Teste se um CPF ou CNPJ é válido utilizando a checagem dos Dígitos Verificadores. Formate, coloque máscara ou limpe a pontuação de documentos numéricos."
        keywords="validador de cpf, validar cnpj, formatar cpf cnpj, tirar pontuacao cnpj, algoritmo cpf, checar cpf falso, mascara cpf cnpj"
        schema={`{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"O que é um CPF ou CNPJ inválido?","acceptedAnswer":{"@type":"Answer","text":"Um documento é considerado matematicamente inválido quando seus dois últimos dígitos (Dígitos Verificadores) não correspondem à conta matemática atrelada aos primeiros números. Ele é pego em formulários e no site da Receita."}},{"@type":"Question","name":"Esse validador consulta o nome e situação na Receita Federal?","acceptedAnswer":{"@type":"Answer","text":"Não. Esta ferramenta não realiza consultas na base de dados da Receita Federal (como status 'Regular' ou 'Cancelado'). Ela apenas executa o <strong>algoritmo de validação matemática</strong> universal de geração de dígitos verificadores para atestar que o CPF/CNPJ estruturalmente faz sentido e pode existir."}},{"@type":"Question","name":"Por que devo validar o documento antes de emitir o recibo?","acceptedAnswer":{"@type":"Answer","text":"Erros de digitação são comuns. Validar a máscara e o algoritmo do documento impede que você preencha e assine um contrato, nota promissória ou recibo comercial com um CPF incorreto do seu cliente."}}]}`}
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
        
        <div className="prose prose-emerald max-w-none mt-12 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <h2>Como funciona a Validação de CPF e CNPJ?</h2>
<p>O <strong>Validador de CPF e CNPJ</strong> verifica matematicamente a estrutura dos números inseridos. No Brasil, todo documento oficial conta com uma sequência lógica terminada com um ou dois dígitos de verificação, desenhados para mitigar erros comuns de digitação por seres humanos e identificar adulterações primárias.</p>

<h3>O papel do Dígito Verificador</h3>
<p>Os dois últimos números de um CPF ou de um CNPJ servem exclusivamente como trava de segurança. Um algoritmo padrão pega todos os números anteriores, multiplica-os por pesos diferentes e encontra o que devem ser os números finais. Se você inserir um CPF falso como <em>111.111.111-11</em>, a ferramenta logo avisará que é inválido.</p>

<h3>Formatador e Removedor de Máscaras (Pontuação)</h3>
<p>Frequentemente, plataformas de governo ou notas fiscais (NF-e, NFS-e) exigem que o cadastro da pessoa jurídica vá apenas com números limpos (sem os pontos, traços e barras). Com a funcionalidade de nosso painel de formatar ou limpar, você transita da máscara legível <em>00.000.000/0001-00</em> para a leitura estrita de máquina <em>00000000000100</em> num simples clique, otimizando o envio e integração nas ferramentas burocráticas e emissão de recibos e carnês.</p>
          
          <hr className="my-8" />
          
          <h2>Perguntas Frequentes (FAQ)</h2>
          <div className="space-y-4 not-prose mt-6">

            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                O que é um CPF ou CNPJ inválido?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: `Um documento é considerado matematicamente inválido quando seus dois últimos dígitos (Dígitos Verificadores) não correspondem à conta matemática atrelada aos primeiros números. Ele é pego em formulários e no site da Receita.` }} />
            </details>
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                Esse validador consulta o nome e situação na Receita Federal?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: `Não. Esta ferramenta não realiza consultas na base de dados da Receita Federal (como status 'Regular' ou 'Cancelado'). Ela apenas executa o <strong>algoritmo de validação matemática</strong> universal de geração de dígitos verificadores para atestar que o CPF/CNPJ estruturalmente faz sentido e pode existir.` }} />
            </details>
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                Por que devo validar o documento antes de emitir o recibo?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: `Erros de digitação são comuns. Validar a máscara e o algoritmo do documento impede que você preencha e assine um contrato, nota promissória ou recibo comercial com um CPF incorreto do seu cliente.` }} />
            </details>
          </div>
        </div>
      </div>
    </>
  );
}