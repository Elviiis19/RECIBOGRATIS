import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = [
  {
    path: '/',
    title: 'Gerador de Recibos Online Grátis e com Pix | Recibo Grátis',
    description: 'O Maior Portal de Recibos do Brasil. Gerador de recibo online simples, rápido e pronto para imprimir ou enviar por WhatsApp. Multiplataforma e 100% gratuito.',
  },
  {
    path: '/gerador-qr-code-pix',
    title: 'Gerador de QR Code PIX Grátis | Recibo Grátis',
    description: 'Gere QR Codes do PIX gratuitamente para receber pagamentos de forma rápida e segura. Funciona em qualquer banco.',
  },
  {
    path: '/termos-de-uso',
    title: 'Termos de Uso | Recibo Grátis',
    description: 'Leia nossos termos de uso para entender as regras e condições de utilização do nosso gerador de recibos online.',
  },
  {
    path: '/politica-de-privacidade',
    title: 'Política de Privacidade | Recibo Grátis',
    description: 'Saiba como protegemos seus dados. Nossa política de privacidade garante que suas informações estão seguras e não são armazenadas em nossos servidores.',
  },
  {
    path: '/contato',
    title: 'Contato | Recibo Grátis',
    description: 'Entre em contato com a equipe do Recibo Grátis para dúvidas, sugestões ou parcerias.',
  },
  {
    path: '/faq',
    title: 'Dúvidas Frequentes (FAQ) | Recibo Grátis',
    description: 'Encontre respostas para as perguntas mais comuns sobre como usar nosso gerador de recibos online e QR Code PIX.',
  }
];

const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('index.html not found in dist directory. Run build first.');
  process.exit(1);
}

const template = fs.readFileSync(indexHtmlPath, 'utf-8');

routes.forEach(route => {
  const routeDir = path.join(distDir, route.path);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }

  // Replace title and description in the template
  let html = template;
  
  // Replace title
  html = html.replace(
    /<title>(.*?)<\/title>/,
    `<title>${route.title}</title>`
  );
  html = html.replace(
    /<meta property="og:title" content="(.*?)" \/>/,
    `<meta property="og:title" content="${route.title}" />`
  );
  
  // Replace description
  html = html.replace(
    /<meta name="description" content="(.*?)" \/>/,
    `<meta name="description" content="${route.description}" />`
  );
  html = html.replace(
    /<meta property="og:description" content="(.*?)" \/>/,
    `<meta property="og:description" content="${route.description}" />`
  );

  // Write the new index.html
  const outputPath = path.join(routeDir, 'index.html');
  fs.writeFileSync(outputPath, html);
  console.log(`Generated static HTML for ${route.path}`);
});

console.log('Static HTML generation complete.');
