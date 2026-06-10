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
  
  console.log("Helmet context after render:", Object.keys(helmetContext));

  return { html, helmet: helmetContext.helmet };
}
