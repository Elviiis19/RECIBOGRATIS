import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the receiptModels.ts file to extract slugs
const modelsFilePath = path.join(__dirname, '../src/data/receiptModels.ts');
const modelsContent = fs.readFileSync(modelsFilePath, 'utf-8');

const slugRegex = /slug:\s*'([^']+)'/g;
const slugs = [];
let match;

while ((match = slugRegex.exec(modelsContent)) !== null) {
  slugs.push(match[1]);
}

// Read blog slugs
const blogFilePath = path.join(__dirname, '../src/data/blogPosts.ts');
const blogContent = fs.readFileSync(blogFilePath, 'utf-8');
const blogSlugRegex = /slug:\s*['"]([^'"]+)['"]/g;
const blogSlugs = [];
while ((match = blogSlugRegex.exec(blogContent)) !== null) {
  if (match[1] !== "financas-pessoais") { // simple ignore
    blogSlugs.push(match[1]);
  }
}

// Read blog categories
const blogTypesFilePath = path.join(__dirname, '../src/data/blogTypes.ts');
const blogTypesContent = fs.readFileSync(blogTypesFilePath, 'utf-8');
const categorySlugRegex = /slug:\s*'([^']+)'/g;
const blogCategorySlugs = [];
while ((match = categorySlugRegex.exec(blogTypesContent)) !== null) {
  blogCategorySlugs.push(match[1]);
}

const baseUrl = 'https://recibogratis.com.br';

const ferramentas = [
  'gerador-pix-copia-e-cola',
  'valor-por-extenso',
  'calculadora-retencao-impostos',
  'calculadora-desconto-multa',
  'calculadora-maquininha-cartao',
  'calculadora-dias-uteis',
  'conversor-horas-trabalhadas',
  'validador-formatador-cpf-cnpj',
  'consultador-codigo-ibge'
];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/gerador-qr-code-pix</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
${ferramentas.map(slug => `  <url>
    <loc>${baseUrl}/ferramentas/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('\n')}
  <url>
    <loc>${baseUrl}/termos-de-uso</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/politica-de-privacidade</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/como-funciona</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/contato</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
${slugs.map(slug => `  <url>
    <loc>${baseUrl}/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
  <url>
    <loc>${baseUrl}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
${blogSlugs.map(slug => `  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
${blogCategorySlugs.map(slug => `  <url>
    <loc>${baseUrl}/blog/categoria/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n')}
</urlset>`;

const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent);

const robotsContent = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`;

fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent);

console.log('Sitemap and robots.txt generated successfully!');
