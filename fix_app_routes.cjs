const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes("import { AllTools }")) {
  code = code.replace("import { AllModels } from './pages/AllModels';", "import { AllModels } from './pages/AllModels';\nimport { AllTools } from './pages/AllTools';");
}

if (!code.includes('<Route path="ferramentas" element={<AllTools />} />')) {
  code = code.replace('<Route path="modelos" element={<AllModels />} />', '<Route path="modelos" element={<AllModels />} />\n        <Route path="ferramentas" element={<AllTools />} />');
}

fs.writeFileSync('src/App.tsx', code);
console.log('Updated App.tsx with AllTools');
