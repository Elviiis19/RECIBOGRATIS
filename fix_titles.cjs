const fs = require('fs');
let code = fs.readFileSync('src/components/DeclarationGenerator.tsx', 'utf-8');

code = code.replace(/case "comparecimento": return "Dados da Instituição \/ Empresa";/, 'case "comparecimento": return "Dados da Instituição / Empresa";\n      case "veiculo-autorizacao": return "Dados do Condutor Autorizado";\n      case "perda-documentos": return "Documentos Perdidos (Apenas o Nome)";');

fs.writeFileSync('src/components/DeclarationGenerator.tsx', code);
