import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

export function render(url: string) {
  const helmetContext: any = {};
  const html = renderToString(
    <StrictMode>
      <App url={url} helmetContext={helmetContext} />
    </StrictMode>
  );
  
  const { helmet } = helmetContext;

  return { html, helmet };
}
