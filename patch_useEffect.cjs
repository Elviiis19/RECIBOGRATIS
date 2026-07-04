const fs = require('fs');
let code = fs.readFileSync('src/components/ReceiptGenerator.tsx', 'utf-8');

code = code.replace(
  /  const \[errors, setErrors\] = useState/,
  `  useEffect(() => {
    if (title.toLowerCase().includes("pintor") || title.toLowerCase().includes("pintura")) {
      const parts = [];
      if (data.pinturaTipo) parts.push(\`serviços de pintura \${data.pinturaTipo}\`);
      else parts.push(\`serviços de pintura\`);
      
      if (data.pinturaAmbientes) parts.push(\`nos ambientes: \${data.pinturaAmbientes}\`);
      if (data.pinturaEndereco) parts.push(\`no imóvel localizado em: \${data.pinturaEndereco}\`);
      
      if (parts.length > 1 || data.pinturaTipo) {
        setData((prev) => ({
          ...prev,
          referenteA: \`Pagamento referente a \${parts.join(", ")}.\`,
        }));
      }
    }
  }, [
    data.pinturaTipo,
    data.pinturaAmbientes,
    data.pinturaEndereco,
    title,
  ]);

  const [errors, setErrors] = useState`
);

fs.writeFileSync('src/components/ReceiptGenerator.tsx', code);
