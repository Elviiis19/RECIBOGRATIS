import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read blog posts
const blogFilePath = path.join(__dirname, '../src/data/blogPosts.ts');
const blogContent = fs.readFileSync(blogFilePath, 'utf-8');

// We need to parse the blog posts. Since it's a TS file with a complex structure,
// we can extract title, slug, excerpt, date using regex or just simple string matching.
// A better way is to import it, but we can't easily import TS in a JS script without transpiling.
// Actually, in vite we can use `vite-node` or just regex. Let's use regex for simplicity.

const posts = [];
const postBlocks = blogContent.split('export const blogPosts: BlogPost[] = [')[1].split('];')[0];

const blockRegex = /\{\s*id:[\s\S]*?slug:\s*['"]([^'"]+)['"][\s\S]*?title:\s*['"]([^'"]+)['"][\s\S]*?excerpt:\s*['"]([^'"]+)['"][\s\S]*?date:\s*['"]([^'"]+)['"]/g;

let match;
while ((match = blockRegex.exec(postBlocks)) !== null) {
  posts.push({
    slug: match[1],
    title: match[2],
    excerpt: match[3],
    date: match[4]
  });
}

const baseUrl = 'https://recibogratis.com.br';

const rssContent = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Blog - Recibo Grátis</title>
  <link>\${baseUrl}/blog</link>
  <description>Dicas de Financeiro, MEI e Legislação para Autônomos.</description>
  <atom:link href="\${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
  \${posts.map(post => {
    // Convert DD/MM/YYYY to a standard Date string if needed, or just use it.
    // RSS requires RFC 822 date format. We'll simplify and just use a standard date if parseable.
    const [day, month, year] = post.date.split('/');
    const pubDate = new Date(\`\${year}-\${month}-\${day}T12:00:00Z\`).toUTCString();
    
    return \`<item>
    <title>\${post.title}</title>
    <link>\${baseUrl}/blog/\${post.slug}</link>
    <description>\${post.excerpt}</description>
    <pubDate>\${pubDate}</pubDate>
    <guid>\${baseUrl}/blog/\${post.slug}</guid>
  </item>\`;
  }).join('\\n  ')}
</channel>
</rss>`;

const publicDir = path.join(__dirname, '../public');
fs.writeFileSync(path.join(publicDir, 'rss.xml'), rssContent);

console.log('RSS feed generated successfully!');
