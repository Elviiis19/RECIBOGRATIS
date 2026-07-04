const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf-8');

code = code.replace(
  /'Básicos': \['simples', 'pagamento', 'quitacao', 'sinal'\],/,
  `'Básicos': ['simples', 'recibo-com-logo', 'pagamento', 'quitacao', 'sinal'],`
);

fs.writeFileSync('src/components/Layout.tsx', code);
