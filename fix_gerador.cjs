const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync('seo_data.json', 'utf8'));
const item = data.find(d => d.file === "src/pages/tools/GeradorPixCopiaECola.tsx");

const filePath = path.resolve(item.file);
let code = fs.readFileSync(filePath, 'utf8');

// Replace the prose section from <div className="mt-16 bg-white ... prose ..."> to the EOF
const proseRegex = /<div className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 prose prose-emerald max-w-none">[\s\S]*$/;

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
        </div>
        <AdSense />
      </div>
    </>
  );
}`;

if (proseRegex.test(code)) {
  code = code.replace(proseRegex, newProse);
  fs.writeFileSync(filePath, code);
  console.log(`Fixed ${item.file}`);
} else {
  console.log(`Regex did not match for ${item.file}`);
}
