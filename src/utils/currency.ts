export const formatCurrency = (val: string | number) => {
  if (typeof val === 'number') val = val.toString();
  return val;
};

// Implementação simples de valor por extenso em reais
export function getValorExtenso(formattedValue: string): string {
  // Input: "1.234,56" ou "12,00"
  if (!formattedValue || formattedValue === '0,00') return '';

  const cleanVal = formattedValue.replace(/\./g, '');
  const parts = cleanVal.split(',');
  const integerPart = parseInt(parts[0], 10);
  const decimalPart = parseInt(parts[1] || '0', 10);

  const units = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
  const teens = ["dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
  const tens = ["", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
  const hundreds = ["", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];

  function converterNumeroParaExtenso(num: number): string {
    if (num === 0) return "";
    if (num === 100) return "cem";

    let ext = "";
    const c = Math.floor(num / 100);
    const remainder = num % 100;

    if (c > 0) {
      ext += hundreds[c];
      if (remainder > 0) ext += " e ";
    }

    if (remainder >= 10 && remainder < 20) {
      ext += teens[remainder - 10];
    } else {
      const t = Math.floor(remainder / 10);
      const u = remainder % 10;
      if (t > 0) {
        ext += tens[t];
        if (u > 0) ext += " e ";
      }
      if (u > 0) {
        ext += units[u];
      }
    }
    return ext;
  }

  let finalString = "";

  if (integerPart > 0) {
    if (integerPart >= 1000000000) return "valor muito alto"; // Simplificação
    
    const millions = Math.floor(integerPart / 1000000);
    const thousands = Math.floor((integerPart % 1000000) / 1000);
    const rem = integerPart % 1000;

    if (millions > 0) {
      finalString += converterNumeroParaExtenso(millions) + (millions === 1 ? " milhão" : " milhões");
      if (thousands > 0 || rem > 0) finalString += (thousands > 0 && rem === 0) ? " e " : ", ";
    }

    if (thousands > 0) {
      finalString += (thousands === 1 ? "" : converterNumeroParaExtenso(thousands) + " ") + "mil";
      if (rem > 0) {
        if (rem < 100 || rem % 100 === 0) finalString += " e ";
        else finalString += ", ";
      }
    }

    if (rem > 0 || (millions === 0 && thousands === 0)) {
      finalString += converterNumeroParaExtenso(rem);
    }

    finalString += integerPart === 1 ? " real" : " reais";
  }

  if (decimalPart > 0) {
    if (finalString) finalString += " e ";
    finalString += converterNumeroParaExtenso(decimalPart);
    finalString += decimalPart === 1 ? " centavo" : " centavos";
  }

  return finalString.trim() || 'zero reais';
}
