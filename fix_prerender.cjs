const fs = require('fs');
let code = fs.readFileSync('scripts/prerender.js', 'utf-8');

const importReplacement = `
    const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
    const { receiptModels } = await vite.ssrLoadModule('/src/data/receiptModels.ts');
    const { declarationModels } = await vite.ssrLoadModule('/src/data/declarationModels.ts');
    const { blogPosts } = await vite.ssrLoadModule('/src/data/blogPosts.ts');
`;

code = code.replace(/const \{ render \} = await vite\.ssrLoadModule\('\/src\/entry-server\.tsx'\);\s*const \{ receiptModels \} = await vite\.ssrLoadModule\('\/src\/data\/receiptModels\.ts'\);\s*const \{ blogPosts \} = await vite\.ssrLoadModule\('\/src\/data\/blogPosts\.ts'\);/, importReplacement);

const generationReplacement = `
    for (const model of receiptModels) {
      routes.push({
        path: \`/\${model.slug}\`,
        title: model.seoTitle || \`\${model.title} | Gerador Online em PDF Grátis\`,
        description: model.seoDescription || model.shortDescription,
      });
    }
    routes.push({
      path: '/declaracoes',
      title: 'Modelos de Declarações Prontas em PDF | Recibo Grátis',
      description: 'Gerador de declarações online. Preencha e imprima declarações de residência, trabalho, união estável, renda e muito mais gratuitamente.',
    });
    for (const model of declarationModels) {
      routes.push({
        path: \`/declaracoes/\${model.slug}\`,
        title: model.seoTitle || \`\${model.title} | Gerador de Declaração Online em PDF\`,
        description: model.seoDescription || model.shortDescription,
      });
    }
`;

code = code.replace(/for \(const model of receiptModels\) \{[\s\S]*?routes\.push\(\{[\s\S]*?path: '\/blog'[\s\S]*?\}\);/, generationReplacement + `    routes.push({
      path: '/blog',
      title: 'Blog - Dicas de Financeiro e MEI | Recibo Grátis',
      description: 'Acompanhe nosso blog e fique por dentro das melhores dicas de gestão financeira, MEI, legislação simplificada e recibos com validade legal.'
    });`);

fs.writeFileSync('scripts/prerender.js', code);
