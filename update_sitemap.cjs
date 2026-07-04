const fs = require('fs');

const file = 'public/sitemap.xml';
let xml = fs.readFileSync(file, 'utf-8');

const newSlugs = [
  'declaracao-de-isento-imposto-de-renda',
  'declaracao-de-nao-vinculo-empregaticio',
  'declaracao-de-perda-de-documentos',
  'declaracao-de-vida-e-residencia',
  'declaracao-autorizacao-uso-de-veiculo'
];

let newUrls = '';
for (const slug of newSlugs) {
  if (!xml.includes(slug)) {
    newUrls += `
  <url>
    <loc>https://recibogratis.com.br/declaracoes/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }
}

xml = xml.replace('</urlset>', newUrls + '\n</urlset>');
fs.writeFileSync(file, xml);
