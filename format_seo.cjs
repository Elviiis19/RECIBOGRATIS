const fs = require('fs');
const path = require('path');

const dir = 'src/pages/tools/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let code = fs.readFileSync(filePath, 'utf8');

  // We are looking for something like:
  // <article>
  //   <h2>...</h2>
  //   <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
  //      ...
  //   </div>
  // </article>
  //
  // We want to transform it to:
  // <article>
  //   <h2>...</h2>
  //   <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
  //     <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
  //        ...
  //     </div>
  //   </div>
  // </article>
  
  // A simple regex approach won't work well because of nested divs.
  // Instead, let's just do a string replacement on the exact `prose` opening div, 
  // but we only want to do it when it's inside an <article>.
  // And we need to add the closing </div> right before </article>.
  
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
}
