const fs = require('fs');
let code = fs.readFileSync('src/components/DeclarationGenerator.tsx', 'utf-8');

const getSecondPartyTitle = `
  const getSecondPartyTitle = () => {
    switch (modelId) {
      case "uniao-estavel": return "Dados do 2º Declarante (Companheiro/a)";
      case "dependencia-economica": return "Dados do Dependente";
      case "trabalho": return "Dados do Empregador / Empresa";
      case "comodato": return "Dados do Comodatário (Morador)";
      case "anuencia": return "Dados do Beneficiado";
      case "prestacao-servico": return "Dados do Tomador do Serviço";
      case "comparecimento": return "Dados da Instituição / Empresa";
      default: return "";
    }
  };

  const needsSecondParty = getSecondPartyTitle() !== "";
`;

if (!code.includes("getSecondPartyTitle = () =>")) {
  code = code.replace(/const isValidCpf = /, `${getSecondPartyTitle}\n  const isValidCpf = `);
}

code = code.replace(/\{modelId === "uniao-estavel" && \(\s*<div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">/, `{needsSecondParty && (\n          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">`);
code = code.replace(/Dados do 2º Declarante \(Companheiro\/a\)/, `{getSecondPartyTitle()}`);

fs.writeFileSync('src/components/DeclarationGenerator.tsx', code);
