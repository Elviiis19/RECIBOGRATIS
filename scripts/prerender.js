import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ferramentasRoutes = [
  { path: '/ferramentas/valor-por-extenso', title: 'Calculadora de Valor por Extenso | Recibo Grátis', description: 'O conversor de valor por extenso é uma ferramenta online e gratuita...' },
  { path: '/ferramentas/calculadora-retencao-impostos', title: 'Calculadora Retenção de Impostos | Recibo Grátis', description: '...' },
  { path: '/ferramentas/calculadora-desconto-multa', title: 'Calculadora de Desconto e Multa | Recibo Grátis', description: '...' },
  { path: '/ferramentas/calculadora-maquininha-cartao', title: 'Calculadora Taxas da Maquininha | Recibo Grátis', description: '...' },
  { path: '/ferramentas/calculadora-dias-uteis', title: 'Calculadora de Dias Úteis | Recibo Grátis', description: '...' },
  { path: '/ferramentas/conversor-horas-trabalhadas', title: 'Conversor de Horas | Recibo Grátis', description: '...' },
  { path: '/ferramentas/validador-formatador-cpf-cnpj', title: 'Validador CPF/CNPJ | Recibo Grátis', description: '...' },
  { path: '/ferramentas/consultador-codigo-ibge', title: 'Consultador IBGE | Recibo Grátis', description: '...' },
  { path: '/ferramentas/gerador-pix-copia-e-cola', title: 'Gerador PIX Copia e Cola | Recibo Grátis', description: '...' }
];

const routes = [
  ...ferramentasRoutes,
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
    path: '/como-funciona',
    title: 'Como Funciona | Recibo Grátis',
    description: 'Entenda como funciona o nosso gerador de recibos online. Processo simples, 100% gratuito, seguro e em conformidade com a LGPD.',
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
    const { blogPosts } = await vite.ssrLoadModule('/src/data/blogPosts.ts');
    const { blogCategories } = await vite.ssrLoadModule('/src/data/blogTypes.ts');

    for (const model of receiptModels) {
      routes.push({
        path: `/${model.slug}`,
        title: model.seoTitle || `${model.title} | Gerador Online em PDF Grátis`,
        description: model.seoDescription || model.shortDescription,
      });
    }

    routes.push({
      path: '/blog',
      title: 'Blog - Dicas de Financeiro e MEI | Recibo Grátis',
      description: 'Acompanhe nosso blog e fique por dentro das melhores dicas de gestão financeira, MEI, legislação simplificada e recibos com validade legal.'
    });

    for (const post of blogPosts) {
      if (post.slug !== 'financas-pessoais') {
        routes.push({
          path: `/blog/${post.slug}`,
          title: post.seoTitle || post.title,
          description: post.seoDescription,
        });
      }
    }

    for (const cat of blogCategories) {
      routes.push({
        path: `/blog/categoria/${cat.slug}`,
        title: `Blog - ${cat.name} | Recibo Grátis`,
        description: `Leia os melhores artigos sobre ${cat.name.toLowerCase()}. Dicas práticas, legislação simplificada e gestão para autônomos e MEI.`,
      });
    }

    for (const route of routes) {
      const routeDir = path.join(distDir, route.path);
      
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }

      const { html: appHtml } = render(route.path);
      
      let html = template;
      
      // We process the original <head> from index.html
      let originalHeadMatches = html.match(/<head>([\s\S]*?)<\/head>/);
      let originalHeadContent = originalHeadMatches ? originalHeadMatches[1] : '';
      
      originalHeadContent = originalHeadContent.replace(/<title[^>]*>.*?<\/title>/ig, '');
      originalHeadContent = originalHeadContent.replace(/<meta[^>]*name="description"[^>]*>/ig, '');
      originalHeadContent = originalHeadContent.replace(/<meta[^>]*name="keywords"[^>]*>/ig, '');
      originalHeadContent = originalHeadContent.replace(/<meta[^>]*property="og:[^"]+"[^>]*>/ig, '');
      originalHeadContent = originalHeadContent.replace(/<meta[^>]*name="twitter:[^"]+"[^>]*>/ig, '');
      originalHeadContent = originalHeadContent.replace(/<link[^>]*rel="canonical"[^>]*>/ig, '');

      let cleanAppHtml = appHtml;
      
      let hoistedTags = '';

      // Extract Title
      const titleMatch = cleanAppHtml.match(/<title[^>]*>.*?<\/title>/i);
      if (titleMatch) {
         hoistedTags += titleMatch[0] + '\n';
         cleanAppHtml = cleanAppHtml.replace(/<title[^>]*>.*?<\/title>/i, '');
      }

      // Extract all Meta
      const metaRegex = /<meta[^>]+>/ig;
      let metaMatch;
      while ((metaMatch = metaRegex.exec(cleanAppHtml)) !== null) {
          hoistedTags += metaMatch[0] + '\n';
      }
      cleanAppHtml = cleanAppHtml.replace(/<meta[^>]+>/ig, '');

      // Extract canonical links
      const linkRegex = /<link[^>]+rel="canonical"[^>]*>/ig;
      let linkMatch;
      while ((linkMatch = linkRegex.exec(cleanAppHtml)) !== null) {
          hoistedTags += linkMatch[0] + '\n';
      }
      cleanAppHtml = cleanAppHtml.replace(/<link[^>]+rel="canonical"[^>]*>/ig, '');

      // Extract JSON-LD
      const ldJsonRegex = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/ig;
      let ldJsonMatch;
      while ((ldJsonMatch = ldJsonRegex.exec(cleanAppHtml)) !== null) {
          hoistedTags += ldJsonMatch[0] + '\n';
      }
      cleanAppHtml = cleanAppHtml.replace(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/ig, '');

      html = html.replace(
        /<head>[\s\S]*?<\/head>/i,
        `<head>
          ${originalHeadContent}
          ${hoistedTags}
        </head>`
      );

      // Inject app HTML
      html = html.replace(
        /<div id="root"[^>]*>[\s\S]*?<\/div>/,
        `<div id="root" suppressHydrationWarning>${cleanAppHtml}</div>`
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
