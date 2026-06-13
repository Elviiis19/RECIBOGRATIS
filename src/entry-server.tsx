import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

export function render(url: string) {
  const helmetContext = {} as any;
  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <App url={url} />
      </HelmetProvider>
    </StrictMode>
  );

  const { helmet } = helmetContext;
  
  let headTags = '';
  if (helmet) {
    headTags = `
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
      ${helmet.script.toString()}
    `;
  }

  return { html, headTags };
}
