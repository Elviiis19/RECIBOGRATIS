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
        
        <div className="prose prose-emerald max-w-none mt-12 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <h2>Como Validar e Formatar CPFs e CNPJs grátis online?</h2>
          <p>O <strong>Validador Inverso de Documentos Brasileiros</strong> é essencial para processos financeiros, auditorias de frete ou cadastros sensíveis de sistema. Basta inserir no campo principal os dados soltos e contíguos de um <strong>Cadastro de Pessoas Físicas (CPF de 11 números)</strong> ou de um <strong>Cadastro Nacional da Pessoa Jurídica (CNPJ de 14 números)</strong> — com ou sem acentos e pontos. Em frações de segundo, nosso motor não só aplica inteligentemente a pontuação padrão legível ("000.000.000-00", ou "00.000.000/0000-00"), como audita a combinação sob a severa régua do algoritmo do governo apontando "Válido" ou "Inválido".</p>

          <h2>Como funciona a conferência e formatação do Dígito Verificador da Receita?</h2>
          <p>Tanto o CPF quanto o CNPJ atuam nos dias modernos como peças e chaves-mestras identificadoras de trâmites vitais administradas severamente de ponte a ponta pelas amarras da <strong>Receita Federal do Brasil</strong>. Essa nossa base algorítmica aberta gratuita trabalha destrinchando se o input e formato digitados deságua nos critérios fixos e inquebráveis matemáticos declarados na derradeira e famosa última placa posicional, indicando se os resíduos numéricos condizem ou rebatem e refutam com rigor analítico absoluto para travar checagens e aprovações sensíveis operantes nos nós e nas veias vitais das engrenagens do SERPRO, das barreiras de emissão bancária, e do crivos e barreiras analíticas unificadas do eSocial.</p>

          <h3>A lógica hermética e algorítmica do cálculo do Módulo 11</h3>
          <p>
             Um número contínuo regular de <strong>CPF possui 11 algarismos</strong> atrelados, espremidos corriqueiramente na máscara padrão amigável "000.000.000-00", enquanto que o braço corporativo do <strong>CNPJ dispõe de uma grade estendida de 14 casas maciças</strong> travadas operando na máscara exposta diária "00.000.000/0000-00" (onde o bloco das 4 cravadas contra-barras 0001 identifica tipicamente aberturas de filiais matrizes originárias). Os últimos dois blocos terminais nessas strings são o <strong>Dígito Verificador Oficial restrito de chancelamento (conhecidos pela famosa sigla DV)</strong>. 
          </p>
          <p>
             Esses dois algarismos jamais são criados de maneira aleatória: eles são resultantes da equação matemática de <em>Módulo 11</em>. Este cálculo engarrafa todos os numerais de base fixada em multiplicações encadeadas. Quando o nosso validador ou o nosso emissor de recibos e notas no site aponta "Válido", é a garantia de que o documento não contém falsificações matemáticas de digitação ou erros de batida, escapando limpo e válido para faturamentos ou validações bancárias estritas.
          </p>

          <hr className="my-8" />
          
          <h2>Perguntas Frequentes (FAQ)</h2>
          
          <div className="space-y-4 not-prose mt-6">
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                Se o validador indicar CPF Válido garante que a pessoa não possui nome sujo?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                <strong>Não.</strong> O status numérico validado positivo de algarismo <strong>sertifica restrito puramente ao fato de que o bloco preenchido faz sentido prático para os critérios de matemática na engenharia de TI criados pelo SERPRO do governo</strong>. Validar ele aqui no site do Brasil atesta portanto com garantias apenas de que alguém não bateu o dedo errado num botão numérico na hora de você salvar uma venda e do Pix travar — não serve ao propósito ou utilidade para analisar SPC, SEPRASA, situação do SERASA Score ou dívida da União ou Estadual da Receita associado aquela persona real.
              </p>
            </details>
            
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                Vocês armazenam meu documento no servidor quando eu valído?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                <strong>Não. Garantido por nós integralmente.</strong> Os nossos blocos em React convertem e reúnem as engrenagens de verificação (o cálculo Módulo 11) de todo modelo client-side rodando as verificações 100% locadas de volta dentro apenas do JavaScript do seu terminal ou do browser nativo de um navegador celular (Chrome). Seu banco de dados privado não aciona requests aos nossos web servers da nuvem para preenchimento.
              </p>
            </details>
          </div>
        </div>
      </div>
    </>
  );
}
