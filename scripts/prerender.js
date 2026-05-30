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
  },
  {
    path: '/modelos',
    title: 'Todos os Modelos de Recibos | Recibo Grátis',
    description: 'Confira nossa lista completa com mais de 40 modelos de recibos prontos para preencher e imprimir em PDF gratuitamente.',
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

      const { html: rawAppHtml, helmet } = render(route.path);
      
      let appHtml = rawAppHtml;
      let hoistedTags = '';

      // Extract all <title>, <meta>, <link rel="canonical">, <script type="application/ld+json"> from appHtml
      const tagRegex = /(<title>.*?<\/title>|<meta[^>]*>|<link[^>]*rel="canonical"[^>]*>|<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>)/gi;
      
      appHtml = appHtml.replace(tagRegex, (match) => {
        hoistedTags += match + '\n';
        return '';
      });
      
      let html = template;
      
      const originalHeadMatches = html.match(/<head>([\s\S]*?)<\/head>/);
      let originalHead = originalHeadMatches ? originalHeadMatches[1] : '';
      
      // Remove default tags so we can replace them correctly
      originalHead = originalHead.replace(/<title>.*?<\/title>/ig, '');
      originalHead = originalHead.replace(/<meta[^>]*name="description"[^>]*>/ig, '');
      originalHead = originalHead.replace(/<meta[^>]*name="keywords"[^>]*>/ig, '');
      originalHead = originalHead.replace(/<meta[^>]*property="og:[^"]+"[^>]*>/ig, '');
      originalHead = originalHead.replace(/<meta[^>]*name="twitter:[^"]+"[^>]*>/ig, '');
      originalHead = originalHead.replace(/<link[^>]*rel="canonical"[^>]*>/ig, '');

      html = html.replace(
        /<head>[\s\S]*?<\/head>/i,
        `<head>
          ${originalHead}
          ${hoistedTags}
        </head>`
      );

      // Inject app HTML
      html = html.replace(
        /<div id="root"[^>]*>[\s\S]*?<\/div>/,
        `<div id="root" suppressHydrationWarning>${appHtml}</div>`
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
