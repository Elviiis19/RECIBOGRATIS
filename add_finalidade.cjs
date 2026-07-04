const fs = require('fs');
let code = fs.readFileSync('src/components/DeclarationGenerator.tsx', 'utf-8');

const finalidadeBlock = `
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            Outras Informações
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Finalidade / Valor / Motivo
              </label>
              <input
                type="text"
                name="finalidade"
                value={data.finalidade}
                onChange={handleChange}
                placeholder="Ex: Matrícula Escolar, R$ 2.500,00, Cancelamento de Protesto..."
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              />
            </div>
            {modelId === "uniao-estavel" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Data de Início da União
                </label>
                <input
                  type="date"
                  name="dataInicioUniao"
                  value={data.dataInicioUniao || ""}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>
            )}
          </div>
        </div>
`;

code = code.replace(/<div className="flex gap-4">/, `${finalidadeBlock}\n        <div className="flex gap-4">`);
fs.writeFileSync('src/components/DeclarationGenerator.tsx', code);
