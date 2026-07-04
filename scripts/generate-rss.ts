import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { blogPosts } from '../src/data/blogPosts.js'; // Note: in tsx, omitting extension or using .js works

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://recibogratis.com.br';
const pubDate = new Date('2024-01-01T12:00:00Z').toUTCString();

const rssItems = blogPosts.map(post => {
  // Escape special XML characters in title and description
  const title = (post.title || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  const description = (post.seoDescription || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  
  return `  <item>
    <title>${title}</title>
    <link>${baseUrl}/blog/${post.slug}</link>
    <description>${description}</description>
    <pubDate>${pubDate}</pubDate>
    <guid>${baseUrl}/blog/${post.slug}</guid>
  </item>`;
}).join('\n');

const rssContent = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Blog - Recibo Grátis</title>
  <link>${baseUrl}/blog</link>
  <description>Dicas de Financeiro, MEI e Legislação para Autônomos.</description>
  <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
${rssItems}
</channel>
</rss>`;

const publicDir = path.join(__dirname, '../public');
fs.writeFileSync(path.join(publicDir, 'rss.xml'), rssContent);

console.log('RSS feed generated successfully!');
