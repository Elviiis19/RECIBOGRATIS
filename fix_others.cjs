const fs = require('fs');
['src/pages/tools/CalculadoraHoraExtra.tsx', 'src/pages/tools/ControleFiados.tsx'].forEach(file => {
  let code = fs.readFileSync(file, 'utf8');
  const endIndex = code.lastIndexOf('  );');
  code = code.substring(0, endIndex) + "    </div>\n" + code.substring(endIndex);
  fs.writeFileSync(file, code);
});
