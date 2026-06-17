// test logic to see what getExtenso does 
import { porExtenso, estilo } from "numero-por-extenso";

const getValorExtenso = (valorStr) => {
    if (!valorStr) return '';
    try {
      // Remove dots (thousands separators) and replace comma with dot
      const cleanStr = valorStr.replace(/\./g, '').replace(',', '.');
      const numericValue = parseFloat(cleanStr);
      if (isNaN(numericValue)) return '';
      return porExtenso(numericValue, estilo.monetario);
    } catch (e) {
      return '';
    }
  };

console.log(getValorExtenso("1200.50"));
console.log(getValorExtenso("1,200.50"));
console.log(getValorExtenso("1200,50"));
console.log("formatCurrency:");

 const formatCurrency = (valorStr) => {
    if (!valorStr) return '0,00';
    try {
      // Remove dots (thousands separators) and replace comma with dot
      const cleanStr = valorStr.replace(/\./g, '').replace(',', '.');
      const numericValue = parseFloat(cleanStr);
      if (isNaN(numericValue)) return '0,00';
      return numericValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } catch (e) {
      return '0,00';
    }
  };
console.log(formatCurrency("1200.50"));

