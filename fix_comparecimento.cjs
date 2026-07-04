const fs = require('fs');
let code = fs.readFileSync('src/components/DeclarationGenerator.tsx', 'utf-8');

const additionalFields = `
            {modelId === "comparecimento" && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Hora de Início
                  </label>
                  <input
                    type="time"
                    name="declarante2Nacionalidade"
                    value={data.declarante2Nacionalidade}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Hora de Término
                  </label>
                  <input
                    type="time"
                    name="declarante2EstadoCivil"
                    value={data.declarante2EstadoCivil}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>
            )}
`;

// we can insert it right after the `finalidade` input block replacement we just did
code = code.replace(/\{modelId === "renda" \? "Valor da Renda Média \(R\$\)" : [\s\S]*?<\/div>\s*\)\}/, (match) => {
  return match + additionalFields;
});

fs.writeFileSync('src/components/DeclarationGenerator.tsx', code);
