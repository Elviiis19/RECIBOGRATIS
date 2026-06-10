export interface BlogCategory {
  slug: string;
  name: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  seoTitle: string;
  seoDescription: string;
  intro: {
    acordo: string;
    promessa: string;
    previa: string;
  };
  sections: Array<{
    h2: string;
    content: string; // HTML allowed
    hasAd?: boolean;
    hasCta?: {
      text: string;
      link: string;
      ctaLabel: string;
    }
  }>;
  conclusion: string;
  faqs: Array<{ question: string; answer: string }>;
}

export const blogCategories: BlogCategory[] = [
  { slug: 'financas-pessoais', name: 'Finanças Pessoais' },
  { slug: 'mei-e-empresas', name: 'MEI e Pequenas Empresas' },
  { slug: 'burocracia-descomplicada', name: 'Burocracia Descomplicada' },
  { slug: 'autonomos', name: 'Profissionais Autônomos' },
  { slug: 'prestacao-de-servicos', name: 'Prestação de Serviços' },
];
