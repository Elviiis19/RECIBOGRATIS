import { porExtenso, estilo } from "numero-por-extenso";

const getValorExtenso = (valorStr) => {
    if (!valorStr) return '';
    try {
      const cleanStr = valorStr.replace(',', '.');
      const numericValue = parseFloat(cleanStr);
      console.log('numericValue', numericValue);
      if (isNaN(numericValue)) return '';
      return porExtenso(numericValue, estilo.monetario);
    } catch (e) {
      console.error(e);
      return '';
    }
  };

console.log('Test 22,22:', getValorExtenso("22,22"));
console.log('Test 2.222,22:', getValorExtenso("2.222,22"));
