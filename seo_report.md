Revisamos e implementamos a estruturação de SEO em todas as suas ferramentas (as 9 páginas). Eis o que foi feito em código (já testado e construído):
- **Adicionado Schema `FAQPage`** para o Google entender as perguntas frequentes.
- **Hierarquia de Títulos (H2, H3, H4)**: Organizada a estrutura de leitura ("prose") para o padrão ideal de SEO.
- **Conteúdo Robusto**: O conteúdo explicativo foi injetado de forma organizada nas ferramentas.
- **Correção do Blog**: O problema de seus artigos novos não aparecerem no topo do `/blog` foi resolvido (o código estava invertendo a ordem original, escondendo os novos lá no fundo).

---

### Sobre atingir 100/100 (PageSpeed / Lighthouse)

Como você pediu para **não tomar nenhuma decisão ainda**, aqui estão as opções do que *pode* ser feito no futuro sem prejudicar a usabilidade:

1. **Atrasar o carregamento do Google AdSense (Lazy Loading):** Scripts de anúncios são o fator número 1 que destrói a nota no Mobile. Podemos configurar para que o script do AdSense só carregue quando o usuário rolar a tela ou após 3 segundos. Isso eleva a nota no mobile para perto de 100, mas requer cuidado para não afetar as impressões de anúncios no "topo" da página.
2. **Otimização de Fontes:** Certificar-nos de que as fontes (Inter, JetBrains Mono) estão sendo pré-carregadas (Preload) e usando `font-display: swap` para evitar bloqueios de renderização.
3. **Imagens Next-Gen:** Sempre utilizar imagens no formato WebP com as dimensões corretas (width e height declarados).

A diferença entre Desktop e Mobile no Google é que o teste mobile simula uma rede 4G lenta e um processador de celular médio. Por isso, a nota mobile é sempre mais difícil de chegar em 100 e costuma esbarrar no peso dos scripts de terceiros (como o AdSense).

### Sobre "Navegação Agêntica" (2/2 vs 2/3)

O termo "Navegação agêntica" não é uma nomenclatura oficial padrão do Google Search Console ou ferramentas de SEO (pode ser uma tradução automática de alguma ferramenta específica que você está usando). No entanto, isso geralmente pode significar duas coisas:

1. **Breadcrumbs (Trilha de Migalhas em Dados Estruturados):** O seu site pode estar mostrando 2 níveis (Ex: *Início > Ferramentas*), enquanto o concorrente mostra 3 níveis (*Início > Ferramentas > Nome da Ferramenta*). Ter 3 níveis costuma ajudar o Google a entender melhor a estrutura profunda do site.
2. **Core Web Vitals (Principais Métricas da Web):** O Google usa 3 métricas principais (LCP, CLS e INP). "2/3" pode significar que o concorrente está passando em 2 das 3 métricas, ou que você está passando em "2/2" métricas medidas até agora.

Você poderia me dizer **em qual ferramenta ou site** você viu esse termo "Navegação agêntica"? Assim posso te dar a resposta 100% exata!
