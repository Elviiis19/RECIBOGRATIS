import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ferramentasRoutes = [
  { path: '/valor-por-extenso', title: 'Calculadora de Valor por Extenso | Recibo Grátis', description: 'O conversor de valor por extenso é uma ferramenta online e gratuita...' },
  { path: '/calculadora-retencao-impostos', title: 'Calculadora Retenção de Impostos | Recibo Grátis', description: '...' },
  { path: '/calculadora-desconto-multa', title: 'Calculadora de Desconto e Multa | Recibo Grátis', description: '...' },
  { path: '/calculadora-maquininha-cartao', title: 'Calculadora Taxas da Maquininha | Recibo Grátis', description: '...' },
  { path: '/calculadora-dias-uteis', title: 'Calculadora de Dias Úteis | Recibo Grátis', description: '...' },
  { path: '/conversor-horas-trabalhadas', title: 'Conversor de Horas | Recibo Grátis', description: '...' },
  { path: '/validador-formatador-cpf-cnpj', title: 'Validador CPF/CNPJ | Recibo Grátis', description: '...' },
  { path: '/gerador-carne-pagamento', title: 'Gerador Carnê | Recibo Grátis', description: '...' },
  { path: '/calculadora-precificacao-produtos', title: 'Calculadora de Precificação | Recibo Grátis', description: '...' },
  { path: '/calculadora-hora-extra', title: 'Hora Extra | Recibo Grátis', description: '...' },
  { path: '/controle-de-fiados', title: 'Controle Fiados | Recibo Grátis', description: '...' },
  { path: '/consultador-codigo-ibge', title: 'Consultador IBGE | Recibo Grátis', description: '...' },
  { path: '/gerador-pix-copia-e-cola', title: 'Gerador PIX Copia e Cola | Recibo Grátis', description: '...' },
  { path: '/leitor-decodificador-qr-code', title: 'Leitor e Decodificador de QR Code Online | Recibo Grátis', description: '...' }
];

const routes = [
  { path: '/ferramentas', title: 'Ferramentas Online | Recibo Grátis', description: 'Diversas ferramentas úteis.' },
  ...ferramentasRoutes,
  {
    path: '/',
    title: 'Recibo Grátis | Recibo Online, Simples e de Pagamento',
    description: 'Gere recibo online grátis na hora. Emita recibo simples, de pagamento, prestação de serviços e aluguel em PDF e Word sem cadastro e com opção de QR Code Pix.',
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
  },
  {
    path: '/meus-documentos',
    title: 'Meus Documentos Salvos | Histórico de Recibos | Recibo Grátis',
    description: 'Acesse e gerencie seus recibos e declarações gerados. Duplique documentos com 1 clique, compartilhe no WhatsApp ou reabra sem custos ou marcas d\'água.',
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

  // Load CSS for inlining to eliminate render-blocking stylesheet
  const assetsDir = path.join(distDir, 'assets');
  let inlineCss = '';
  if (fs.existsSync(assetsDir)) {
    const cssFiles = fs.readdirSync(assetsDir).filter(f => f.endsWith('.css'));
    if (cssFiles.length > 0) {
      inlineCss = fs.readFileSync(path.join(assetsDir, cssFiles[0]), 'utf-8');
      console.log(`Loaded CSS for inlining (${Math.round(inlineCss.length / 1024)} KB)`);
    }
  }

  try {
    
    const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
    const { receiptModels } = await vite.ssrLoadModule('/src/data/receiptModels.ts');
    const { declarationModels } = await vite.ssrLoadModule('/src/data/declarationModels.ts');
    const { blogPosts } = await vite.ssrLoadModule('/src/data/blogPosts.ts');

    const { blogCategories } = await vite.ssrLoadModule('/src/data/blogTypes.ts');

    
    for (const model of receiptModels) {
      // Unificação de autoridade: recibo-de-pagamento redireciona para recibo-simples
      if (model.slug === 'recibo-de-pagamento') continue;
      routes.push({
        path: `/${model.slug}`,
        title: model.seoTitle || `${model.title} | Gerador Online em PDF Grátis`,
        description: model.seoDescription || model.shortDescription,
      });
    }
    routes.push({
      path: '/declaracoes',
      title: 'Modelos de Declarações Prontas em PDF | Recibo Grátis',
      description: 'Gerador de declarações online. Preencha e imprima declarações de residência, trabalho, união estável, renda e muito mais gratuitamente.',
    });
    for (const model of declarationModels) {
      routes.push({
        path: `/declaracoes/${model.slug}`,
        title: model.seoTitle || `${model.title} | Gerador de Declaração Online em PDF`,
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

      // Inline CSS to eliminate render-blocking stylesheet request
      if (inlineCss) {
        originalHeadContent = originalHeadContent.replace(
          /<link rel="stylesheet"[^>]*href="\/assets\/index-[^"]+\.css"[^>]*>/i,
          `<style id="critical-css">${inlineCss}</style>`
        );
      }

      // Filter route-specific modulepreload links to save mobile bandwidth
      if (route.path === '/') {
        originalHeadContent = originalHeadContent.replace(
          /<link rel="modulepreload"[^>]*href="\/assets\/(data-blog|data-declarations|data-receipt-seo|pages-tools|pages-blog)[^"]*"[^>]*>\s*/ig,
          ''
        );
      } else {
        if (!route.path.startsWith('/blog')) {
          originalHeadContent = originalHeadContent.replace(
            /<link rel="modulepreload"[^>]*href="\/assets\/(data-blog|pages-blog)[^"]*"[^>]*>\s*/ig,
            ''
          );
        }
        if (!route.path.startsWith('/declaracoes')) {
          originalHeadContent = originalHeadContent.replace(
            /<link rel="modulepreload"[^>]*href="\/assets\/data-declarations[^"]*"[^>]*>\s*/ig,
            ''
          );
        }
        if (!route.path.startsWith('/calculadora') && !route.path.startsWith('/conversor') && !route.path.startsWith('/gerador') && !route.path.startsWith('/leitor') && !route.path.startsWith('/validador') && !route.path.startsWith('/consultador') && !route.path.startsWith('/controle') && !route.path.startsWith('/valor')) {
          originalHeadContent = originalHeadContent.replace(
            /<link rel="modulepreload"[^>]*href="\/assets\/pages-tools[^"]*"[^>]*>\s*/ig,
            ''
          );
        }
      }

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

      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }

      const outputPath = path.join(routeDir, 'index.html');
      fs.writeFileSync(outputPath, html);
      console.log(`Generated static HTML for ${route.path}`);
    }

    // Criar redirecionamento 301 definitivo para recibo-de-pagamento -> recibo-simples
    const redirectDir = path.join(distDir, 'recibo-de-pagamento');
    if (!fs.existsSync(redirectDir)) {
      fs.mkdirSync(redirectDir, { recursive: true });
    }
    const redirectHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=/recibo-simples">
  <link rel="canonical" href="https://recibogratis.com.br/recibo-simples" />
  <title>Recibo Simples e Recibo de Pagamento Online | Recibo Grátis</title>
  <script>window.location.replace("/recibo-simples");</script>
</head>
<body>
  <p>Redirecionando para <a href="/recibo-simples">Recibo Simples e Recibo de Pagamento Online</a>...</p>
</body>
</html>`;
    fs.writeFileSync(path.join(redirectDir, 'index.html'), redirectHtml, 'utf-8');
    console.log('Generated 301 redirect for /recibo-de-pagamento -> /recibo-simples');

    // Ensure ads.txt is present in dist directory
    const publicAdsPath = path.resolve(__dirname, '../public/ads.txt');
    const distAdsPath = path.join(distDir, 'ads.txt');
    if (fs.existsSync(publicAdsPath)) {
      fs.copyFileSync(publicAdsPath, distAdsPath);
      console.log('Ensured ads.txt is present in dist/');
    }

    // Ensure fresh sitemap.xml and rss.xml are present in dist
    const publicSitemap = path.resolve(__dirname, '../public/sitemap.xml');
    const distSitemap = path.join(distDir, 'sitemap.xml');
    if (fs.existsSync(publicSitemap)) {
      fs.copyFileSync(publicSitemap, distSitemap);
      console.log('Ensured fresh sitemap.xml is present in dist/');
    }

    const publicRss = path.resolve(__dirname, '../public/rss.xml');
    const distRss = path.join(distDir, 'rss.xml');
    if (fs.existsSync(publicRss)) {
      fs.copyFileSync(publicRss, distRss);
      console.log('Ensured fresh rss.xml is present in dist/');
    }
  } catch (e) {
    console.error(e);
  } finally {
    vite.close();
  }

  console.log('Static HTML generation complete.');
}

prerender();
