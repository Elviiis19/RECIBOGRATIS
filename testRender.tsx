import { renderToString } from 'react-dom/server';
import App from './src/App';
import React from 'react';

console.log(renderToString(<App url="/blog" />));
