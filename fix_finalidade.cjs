const fs = require('fs');
let code = fs.readFileSync('src/components/DeclarationGenerator.tsx', 'utf-8');

const replacement = `
            {["residencia", "veracidade", "anuencia", "prestacao-servico", "escolaridade", "renda", "comparecimento", "trabalho", "etnico-racial"].includes(modelId) && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {modelId === "renda" ? "Valor da Renda Média (R$)" : 
                   modelId === "comparecimento" ? "Data do Comparecimento (ex: 15/10/2023)" : 
                   modelId === "etnico-racial" ? "Nome do Concurso / Processo Seletivo" :
                   modelId === "escolaridade" ? "Grau de Escolaridade (ex: Ensino Médio)" :
                   "Finalidade / Observação / Serviço"}
                </label>
                <input
                  type="text"
                  name="finalidade"
                  value={data.finalidade}
                  onChange={handleChange}
                  placeholder="Preencha os detalhes..."
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>
            )}
`;

code = code.replace(/\{modelId === "residencia" && \([\s\S]*?<\/div>\s*\)\}/, replacement);
fs.writeFileSync('src/components/DeclarationGenerator.tsx', code);
