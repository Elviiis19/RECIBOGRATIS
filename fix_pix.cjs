const fs = require('fs');
const file = 'src/pages/PixGenerator.tsx';
let code = fs.readFileSync(file, 'utf8');
const endIndex = code.lastIndexOf('  );');
code = code.substring(0, endIndex) + "    </div>\n    </div>\n" + code.substring(endIndex);
fs.writeFileSync(file, code);
