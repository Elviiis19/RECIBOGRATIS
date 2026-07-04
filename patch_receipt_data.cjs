const fs = require('fs');
let code = fs.readFileSync('src/components/ReceiptGenerator.tsx', 'utf-8');

code = code.replace(
  /cuidadorTransporte\?: string;/,
  `cuidadorTransporte?: string;
  // Novos campos para Pintor
  pinturaEndereco?: string;
  pinturaAmbientes?: string;
  pinturaTipo?: string;`
);

code = code.replace(
  /cuidadorTransporte: "",/,
  `cuidadorTransporte: "",
    // Default Pintor
    pinturaEndereco: "",
    pinturaAmbientes: "",
    pinturaTipo: "",`
);

fs.writeFileSync('src/components/ReceiptGenerator.tsx', code);
