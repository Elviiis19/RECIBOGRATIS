import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

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

async function prerender() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  const distDir = path.resolve(__dirname, '../dist');
  const indexHtmlPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(indexHtmlPath)) {
    console.error('index.html not found in dist directory. Run build first.');
    process.exit(1);
  }

  const template = fs.readFileSync(indexHtmlPath, 'utf-8');

  try {
    const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
    const { receiptModels } = await vite.ssrLoadModule('/src/data/receiptModels.ts');

    for (const model of receiptModels) {
      routes.push({
        path: `/${model.slug}`,
        title: model.seoTitle || `${model.title} | Recibo Grátis`,
        description: model.seoDescription || model.shortDescription,
      });
    }

    for (const route of routes) {
      const routeDir = path.join(distDir, route.path);
      
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }

      const { html: appHtml } = render(route.path);
      
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

      // Inject app HTML
      html = html.replace(
        /<div id="root">[\s\S]*?<\/div>/,
        `<div id="root">${appHtml}</div>`
      );

      const outputPath = path.join(routeDir, 'index.html');
      fs.writeFileSync(outputPath, html);
      console.log(`Generated static HTML for ${route.path}`);
    }
  } catch (e) {
    console.error(e);
  } finally {
    vite.close();
  }

  console.log('Static HTML generation complete.');
}

prerender();
