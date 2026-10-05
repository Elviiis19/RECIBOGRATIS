const fs = require('fs');
const path = require('path');

// 1. Run build_30_articles.cjs and build_batch2.cjs and build_batch3.cjs
require('./build_30_articles.cjs');
require('./build_batch2.cjs');
require('./build_batch3.cjs');

const batch1 = JSON.parse(fs.readFileSync('/tmp/articles_batch1.json', 'utf-8'));
const batch2 = JSON.parse(fs.readFileSync('/tmp/articles_batch2.json', 'utf-8'));
const batch3 = JSON.parse(fs.readFileSync('/tmp/articles_batch3.json', 'utf-8'));

const all30 = [...batch1, ...batch2, ...batch3];
console.log(`Loaded ${all30.length} articles!`);

const blogPostsPath = path.join(__dirname, '../src/data/blogPosts.ts');
let content = fs.readFileSync(blogPostsPath, 'utf-8');

// Find the last "];" in the file
const lastBracketIndex = content.lastIndexOf('];');
if (lastBracketIndex === -1) {
  console.error("Could not find closing '];' in blogPosts.ts");
  process.exit(1);
}

// Convert each post object to a TypeScript code string
const postsCode = all30.map(post => {
  return '  ' + JSON.stringify(post, null, 2).replace(/\n/g, '\n  ') + ',';
}).join('\n\n');

const newContent = content.slice(0, lastBracketIndex) + postsCode + '\n];\n';
fs.writeFileSync(blogPostsPath, newContent, 'utf-8');

console.log("Successfully appended 30 articles to src/data/blogPosts.ts!");
