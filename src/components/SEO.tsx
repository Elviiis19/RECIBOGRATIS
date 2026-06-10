import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  schema?: string;
  url?: string;
}

export function SEO({ title, description, keywords, schema, url }: SEOProps) {
  let pathname = '';
  try {
    const location = useLocation();
    pathname = location.pathname;
  } catch (e) {
    // In case SEO is used outside of Router
  }
  
  const basePath = typeof window !== 'undefined' ? window.location.pathname : pathname;
  
  // Clean trailing slash
  const cleanPath = basePath !== '/' && basePath.endsWith('/') 
    ? basePath.slice(0, -1) 
    : basePath;

  const currentUrl = url || `https://recibogratis.com.br${cleanPath}`;
  const normalizedUrl = currentUrl.length > 29 && currentUrl.endsWith('/') 
    ? currentUrl.slice(0, -1) 
    : currentUrl;
  
  const hasSuffix = title.includes('Recibo Grátis') || title.includes('Recibo Online Grátis') || title.includes('Recibo grátis');
  const fullTitle = hasSuffix ? title : `${title} | Recibo Grátis`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={normalizedUrl} />
      
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={normalizedUrl} />
      <meta property="og:image" content="https://recibogratis.com.br/og-image.webp" />
      <meta property="og:image:type" content="image/webp" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      
      {schema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} data-rh="true" />
      )}
    </Helmet>
  );
}
