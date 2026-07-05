const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf8');

const linkVerTodas = `                          <li>
                            <Link to="/ferramentas" className="text-sm font-bold text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 block py-2 px-3 rounded-lg transition-colors text-center mt-2 border border-emerald-100">
                              Ver Todas as Ferramentas &rarr;
                            </Link>
                          </li>
                        </ul>`;

if (!code.includes("Ver Todas as Ferramentas")) {
  code = code.replace("</ul>\n                      </div>\n                    </div>\n                  </div>", linkVerTodas + "\n                      </div>\n                    </div>\n                  </div>");
  
  // also add it to mobile menu
  code = code.replace('              <Link to="/consultador-codigo-ibge" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-emerald-700 hover:bg-gray-50">Consultador Código IBGE</Link>',
  '              <Link to="/consultador-codigo-ibge" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-emerald-700 hover:bg-gray-50">Consultador Código IBGE</Link>\n              <Link to="/ferramentas" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 mt-2">Ver Todas as Ferramentas &rarr;</Link>');

  fs.writeFileSync('src/components/Layout.tsx', code);
  console.log("Updated Layout.tsx");
}
