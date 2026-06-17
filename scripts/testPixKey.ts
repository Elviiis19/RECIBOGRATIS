import { generatePixPayload } from "../src/utils/pix";

console.log('Phone without +55:', generatePixPayload("11999999999", "Nome", "Cidade", "10,00"));
console.log('Phone with +55:', generatePixPayload("+5511999999999", "Nome", "Cidade", "10,00"));
