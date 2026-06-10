import fs from 'fs';
import { createServer } from 'vite';

async function test() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });
  const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
  const { html, helmet } = render('/recibo-simples');
  console.log("Helmet:", !!helmet);
  process.exit(0);
}
test();
