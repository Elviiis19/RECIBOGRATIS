import { formatPixKey } from "../src/utils/pix";

console.log('Phone without +55:', formatPixKey("11999999999"));
console.log('Phone with +55:', formatPixKey("+5511999999999"));
console.log('Valid CPF:', formatPixKey("123.456.789-00")); // wait, that will output 12345678900 if valid, let's use a fake valid cpf
import { cpf } from 'cpf-cnpj-validator';
const validCpf = cpf.generate();
console.log('Valid CPF:', formatPixKey(validCpf));
console.log('Valid CPF formatted:', formatPixKey(cpf.format(validCpf)));
console.log('Email:', formatPixKey("test@test.com"));
