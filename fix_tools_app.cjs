const fs = require('fs');

// Add to App.tsx
let code = fs.readFileSync('src/App.tsx', 'utf8');

const importsToAdd = `
import { GeradorCarnePagamento } from './pages/tools/GeradorCarnePagamento';
import { CalculadoraPrecificacao } from './pages/tools/CalculadoraPrecificacao';
import { CalculadoraHoraExtra } from './pages/tools/CalculadoraHoraExtra';
import { ControleFiados } from './pages/tools/ControleFiados';
`;

if (!code.includes("GeradorCarnePagamento")) {
  code = code.replace("import { AllTools } from './pages/AllTools';", "import { AllTools } from './pages/AllTools';" + importsToAdd);
  
  const routesToAdd = `
        <Route path="gerador-carne-pagamento" element={<GeradorCarnePagamento />} />
        <Route path="calculadora-precificacao-produtos" element={<CalculadoraPrecificacao />} />
        <Route path="calculadora-hora-extra" element={<CalculadoraHoraExtra />} />
        <Route path="controle-de-fiados" element={<ControleFiados />} />
`;
  code = code.replace('<Route path="ferramentas" element={<AllTools />} />', '<Route path="ferramentas" element={<AllTools />} />' + routesToAdd);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Updated App.tsx");
}

// Add to prerender.js
let prerenderCode = fs.readFileSync('scripts/prerender.js', 'utf8');
if (!prerenderCode.includes("gerador-carne-pagamento")) {
  const routesPrerender = `
  { path: '/gerador-carne-pagamento', title: 'Gerador Carnê | Recibo Grátis', description: '...' },
  { path: '/calculadora-precificacao-produtos', title: 'Calculadora de Precificação | Recibo Grátis', description: '...' },
  { path: '/calculadora-hora-extra', title: 'Hora Extra | Recibo Grátis', description: '...' },
  { path: '/controle-de-fiados', title: 'Controle Fiados | Recibo Grátis', description: '...' },`;
  
  prerenderCode = prerenderCode.replace("{ path: '/validador-formatador-cpf-cnpj', title: 'Validador CPF/CNPJ | Recibo Grátis', description: '...' },", 
    "{ path: '/validador-formatador-cpf-cnpj', title: 'Validador CPF/CNPJ | Recibo Grátis', description: '...' }," + routesPrerender);
  fs.writeFileSync('scripts/prerender.js', prerenderCode);
  console.log("Updated prerender.js");
}

// Add to generate-sitemap.js
let sitemapCode = fs.readFileSync('scripts/generate-sitemap.js', 'utf8');
if (!sitemapCode.includes("gerador-carne-pagamento")) {
  sitemapCode = sitemapCode.replace("'consultador-codigo-ibge'", "'consultador-codigo-ibge',\n  'gerador-carne-pagamento',\n  'calculadora-precificacao-produtos',\n  'calculadora-hora-extra',\n  'controle-de-fiados'");
  fs.writeFileSync('scripts/generate-sitemap.js', sitemapCode);
  console.log("Updated generate-sitemap.js");
}
