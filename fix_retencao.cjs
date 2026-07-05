const fs = require('fs');
const file = 'src/pages/tools/RetencaoImpostos.tsx';
let code = fs.readFileSync(file, 'utf8');

// The file currently ends with:
//      </section>
//    </div>
//    </div>
//  );
//}
// or something like that. We want it to be:
//      </section>
//    </>
//  );
//}
code = code.replace(/<\/section>\s*<\/div>\s*<\/div>\s*\);\s*}/s, "</section>\n    </>\n  );\n}");
code = code.replace(/<\/section>\s*<\/div>\s*\);\s*}/s, "</section>\n    </>\n  );\n}"); // if it has only one </div>
fs.writeFileSync(file, code);
