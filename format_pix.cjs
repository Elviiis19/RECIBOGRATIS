const fs = require('fs');

const filePath = 'src/pages/PixGenerator.tsx';
let code = fs.readFileSync(filePath, 'utf8');

if (code.includes('className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed"')) {
  const parts = code.split('</article>');
  let newCode = '';
  
  for (let i = 0; i < parts.length - 1; i++) {
    let part = parts[i];
    if (part.includes('className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed"')) {
      // wrap it
      part = part.replace(
        '<div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">', 
        '<div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">\n                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">'
      );
      part = part + '\n              </div>\n            ';
    }
    newCode += part + '</article>';
  }
  newCode += parts[parts.length - 1];
  
  fs.writeFileSync(filePath, newCode);
}
