import { render } from './src/entry-server';
const res = render('/recibo-simples');
console.log("Helmet:", res.helmet ? Object.keys(res.helmet) : "Undefined");
