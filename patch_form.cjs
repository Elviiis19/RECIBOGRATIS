const fs = require('fs');
let code = fs.readFileSync('src/components/ReceiptGenerator.tsx', 'utf-8');

const replacement = `) : docType === "pintor" ? (
                  <>
                    <h3 className="font-bold text-gray-900 border-b pb-2 mb-4 uppercase text-sm">
                      Detalhes da Pintura
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="md:col-span-2">
                        <label
                          htmlFor="pinturaEndereco"
                          className="block text-sm font-semibold text-gray-900 mb-2"
                        >
                          Endereço do Imóvel Pintado
                        </label>
                        <input
                          id="pinturaEndereco"
                          name="pinturaEndereco"
                          value={data.pinturaEndereco}
                          onChange={handleChange}
                          placeholder="Rua, Número, Bairro - Cidade/UF"
                          className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="pinturaAmbientes"
                          className="block text-sm font-semibold text-gray-900 mb-2"
                        >
                          Ambientes (Ex: Sala, Quarto)
                        </label>
                        <input
                          id="pinturaAmbientes"
                          name="pinturaAmbientes"
                          value={data.pinturaAmbientes}
                          onChange={handleChange}
                          placeholder="Sala, Cozinha, Quarto..."
                          className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="pinturaTipo"
                          className="block text-sm font-semibold text-gray-900 mb-2"
                        >
                          Tipo (Ex: Acrílica, Textura)
                        </label>
                        <input
                          id="pinturaTipo"
                          name="pinturaTipo"
                          value={data.pinturaTipo}
                          onChange={handleChange}
                          placeholder="Acrílica, Epóxi, Textura..."
                          className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="referenteA"
                        className="block text-sm font-semibold text-gray-900 mb-2"
                      >
                        Descrição Final (Pode editar se desejar)
                      </label>
                      <textarea
                        id="referenteA"
                        name="referenteA"
                        value={data.referenteA}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 resize-none"
                      />
                    </div>
                  </>
                ) : (`;

code = code.replace(
  /                  <>[\s\S]*?<\/textarea>\s*<\/div>\s*<\/>\s*\) : \(/,
  (match) => match.replace(/\) : \(/, replacement)
);

fs.writeFileSync('src/components/ReceiptGenerator.tsx', code);
