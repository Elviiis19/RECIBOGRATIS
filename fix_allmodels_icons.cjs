const fs = require('fs');

let code = fs.readFileSync('src/pages/AllModels.tsx', 'utf8');

if (!code.includes("Key,")) {
  code = code.replace("Search\n} from 'lucide-react';", "Search,\n  Key\n} from 'lucide-react';");
}

if (!code.includes("Key: <Key")) {
  code = code.replace("FileText: <FileText className=\"w-8 h-8 text-emerald-700\" />,", "FileText: <FileText className=\"w-8 h-8 text-emerald-700\" />,\n  Key: <Key className=\"w-8 h-8 text-emerald-700\" />,");
}

fs.writeFileSync('src/pages/AllModels.tsx', code);
console.log("Updated AllModels.tsx");
