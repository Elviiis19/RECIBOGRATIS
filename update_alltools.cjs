const fs = require('fs');

const file = 'src/pages/AllTools.tsx';
let code = fs.readFileSync(file, 'utf8');

const newTool = `    {
      title: 'Leitor de QR Code',
      description: 'Envie uma imagem e decodifique o conteúdo de um QR Code (URL, texto ou PIX) diretamente no seu navegador com total segurança e privacidade.',
      icon: <QrCode className="w-8 h-8 text-pink-600" />,
      link: '/leitor-decodificador-qr-code',
      color: 'bg-pink-50 text-pink-700 border-pink-100',
      hover: 'hover:border-pink-300 hover:shadow-md'
    },
`;

if (!code.includes('Leitor de QR Code')) {
  code = code.replace(
    "const tools = [",
    "const tools = [\n" + newTool
  );
  fs.writeFileSync(file, code);
}
