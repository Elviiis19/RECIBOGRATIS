const fs = require('fs');

let code = fs.readFileSync('src/pages/declarations/DeclarationIndex.tsx', 'utf8');

if (!code.includes("ShieldAlert")) {
  code = code.replace("UserCheck\n} from \"lucide-react\";", "UserCheck,\n  ShieldAlert,\n  Plane\n} from \"lucide-react\";");
}

fs.writeFileSync('src/pages/declarations/DeclarationIndex.tsx', code);

// Need to update the dynamic icon mapping in DeclarationIndex.tsx
let iconMap = `
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home': return <Home className="w-8 h-8 text-emerald-600" />;
      case 'Scale': return <Scale className="w-8 h-8 text-emerald-600" />;
      case 'Heart': return <Heart className="w-8 h-8 text-emerald-600" />;
      case 'Baby': return <Baby className="w-8 h-8 text-emerald-600" />;
      case 'Briefcase': return <Briefcase className="w-8 h-8 text-emerald-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-8 h-8 text-emerald-600" />;
      case 'UserCheck': return <UserCheck className="w-8 h-8 text-emerald-600" />;
      case 'ShieldAlert': return <ShieldAlert className="w-8 h-8 text-emerald-600" />;
      case 'Plane': return <Plane className="w-8 h-8 text-emerald-600" />;
      case 'FileText': default: return <FileText className="w-8 h-8 text-emerald-600" />;
    }
  };
`;

if (!code.includes("case 'Plane':")) {
  code = code.replace(/const getIcon = [\s\S]*?};/, iconMap);
  fs.writeFileSync('src/pages/declarations/DeclarationIndex.tsx', code);
  console.log("Updated DeclarationIndex.tsx icons");
}

