const fs = require('fs');

const file = 'src/App.tsx';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes('<Route path="ferramentas/:tool" element={<ToolRedirect />} />')) {
  // We can add a catch-all for ferramentas/* to redirect to /*
  
  const redirectComponent = `
function ToolRedirect() {
  const { tool } = useParams();
  return <Navigate to={\`/\${tool}\`} replace />;
}
`;

  if (!code.includes('ToolRedirect')) {
    code = code.replace("function RemoveTrailingSlash", redirectComponent + "\nfunction RemoveTrailingSlash");
    code = code.replace(
      '<Route path="ferramentas" element={<AllTools />} />',
      '<Route path="ferramentas" element={<AllTools />} />\n        <Route path="ferramentas/:tool" element={<ToolRedirect />} />'
    );
    
    // Also we need to import useParams from react-router-dom
    if (!code.includes('useParams')) {
        code = code.replace("import { BrowserRouter", "import { BrowserRouter, useParams");
    }

    fs.writeFileSync(file, code);
  }
}

