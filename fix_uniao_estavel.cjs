const fs = require('fs');
let code = fs.readFileSync('src/components/DeclarationGenerator.tsx', 'utf-8');

// The original one doesn't have the condition inside the block.
code = code.replace(/<div>\s*<label className="block text-sm font-semibold text-gray-700 mb-1">Data Início da União<\/label>\s*<input\s*type="date"\s*name="dataInicioUniao"\s*value=\{data.dataInicioUniao\}\s*onChange=\{handleChange\}\s*className="[^"]+"\s*\/>\s*<\/div>/, `{modelId === "uniao-estavel" && (\n              <div>\n                <label className="block text-sm font-semibold text-gray-700 mb-1">Data Início da União</label>\n                <input\n                  type="date"\n                  name="dataInicioUniao"\n                  value={data.dataInicioUniao}\n                  onChange={handleChange}\n                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"\n                />\n              </div>\n            )}`);

fs.writeFileSync('src/components/DeclarationGenerator.tsx', code);
