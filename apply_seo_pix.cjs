const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync('seo_data_3.json', 'utf8'));

for (const item of data) {
  const filePath = path.resolve(item.file);
  let code = fs.readFileSync(filePath, 'utf8');

  // Generate the FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": item.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  const schemaString = JSON.stringify(faqSchema);

  // Replace <SEO ... />
  const seoRegex = /<SEO\s+[^>]*\/>/;
  
  const newSeo = `<SEO \n        title="${item.seo.title}"\n        description="${item.seo.description}"\n        keywords="${item.seo.keywords}"\n        schema={\`${schemaString}\`}\n        url="https://recibogratis.com.br/gerador-qr-code-pix"\n      />`;

  if (seoRegex.test(code)) {
    code = code.replace(seoRegex, newSeo);
  }

  // Replace <div className="mt-16 ... prose ..."> ... </div>
  const proseRegex = /<div className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 prose prose-emerald max-w-none">[\s\S]*?(?=<\/div>\s*<AdSense \/>)/;

  const faqsHtml = item.faqs.map(faq => `
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                ${faq.q}
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: \`${faq.a}\` }} />
            </details>`).join('');

  const newProse = `<div className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 prose prose-emerald max-w-none">
          ${item.content}
          
          <hr className="my-8" />
          
          <h2>Perguntas Frequentes (FAQ)</h2>
          <div className="space-y-4 not-prose mt-6">
${faqsHtml}
          </div>
        </div>`;

  if (proseRegex.test(code)) {
    code = code.replace(proseRegex, newProse);
    console.log(`Prose replaced for ${item.file}`);
  } else {
    console.log(`Prose regex failed for ${item.file}`);
  }

  fs.writeFileSync(filePath, code);
  console.log(`Updated ${item.file}`);
}
