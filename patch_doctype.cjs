const fs = require('fs');
let code = fs.readFileSync('src/components/ReceiptGenerator.tsx', 'utf-8');

code = code.replace(
  /if \(t\.includes\("cuidador"\)\) return "cuidador";/,
  `if (t.includes("cuidador")) return "cuidador";
    if (t.includes("pintor") || t.includes("pintura")) return "pintor";`
);

code = code.replace(
  /if \(docType === "cuidador"\) return "Dados do Responsável";/,
  `if (docType === "cuidador") return "Dados do Responsável";
      if (docType === "pintor") return "Dados do Cliente";`
);

code = code.replace(
  /if \(docType === "cuidador"\) return "Dados do Cuidador";/,
  `if (docType === "cuidador") return "Dados do Cuidador";
      if (docType === "pintor") return "Dados do Pintor/Profissional";`
);

fs.writeFileSync('src/components/ReceiptGenerator.tsx', code);
