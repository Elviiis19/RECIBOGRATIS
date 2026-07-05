const fs = require('fs');
let code = fs.readFileSync('src/pages/PixGenerator.tsx', 'utf8');
code = code.replace("import { Link , ChevronDown, ChevronUp } from 'react-router-dom';", "import { Link } from 'react-router-dom';");
code = code.replace("import { Copy, CheckCircle2, QrCode, AlertCircle } from 'lucide-react';", "import { Copy, CheckCircle2, QrCode, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';");
fs.writeFileSync('src/pages/PixGenerator.tsx', code);
