import https from 'https';
import fs from 'fs';
import path from 'path';

const url = 'https://i.pinimg.com/736x/6d/72/55/6d72551441ea6e408dbfadadecef1ecf.jpg';
const dest = path.join(process.cwd(), 'public', 'modelo-recibo-simples-preenchido.png');

const file = fs.createWriteStream(dest);

https.get(url, (response) => {
  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Download Completed');
  });
}).on('error', (err) => {
  fs.unlink(dest, () => {});
  console.error('Error downloading:', err.message);
});
