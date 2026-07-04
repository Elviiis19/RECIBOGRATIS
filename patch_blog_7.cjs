const fs = require('fs');
let code = fs.readFileSync('src/data/blogPosts.ts', 'utf-8');

const newPost = `  {
    slug: 'como-fazer-uma-declaracao-de-residencia-aceita-em-qualquer-lugar',
    title: 'Como Fazer uma Declaração de Residência Aceita em Qualquer Lugar (e Fugir da Burocracia)',
    category: 'burocracia-descomplicada',
    seoTitle: 'Como Fazer Declaração de Residência Aceita em Qualquer Lugar',
    seoDescription: 'Aprenda como fazer uma declaração de residência online e grátis. Saiba o que não pode faltar no documento para ser aceito sem burocracia.',
    intro: {
      acordo: 'Você chega ao balcão de atendimento para abrir uma conta, assumir uma vaga de emprego ou matricular o filho na escola. Tudo certo, até a atendente pedir: "comprovante de endereço atualizado no seu nome, por favor". Se você mora com os pais, divide apartamento ou aluga um imóvel onde as contas continuam no nome do proprietário, essa simples frase costuma gerar uma dor de cabeça enorme.',
      promessa: 'A boa notícia é que você não precisa correr para tentar transferir uma conta de luz às pressas.',
      previa: 'A legislação brasileira permite que você comprove onde mora através de uma declaração de residência. O segredo não é apenas escrever um texto qualquer, mas sim formatar um documento que seja inquestionável.'
    },
    sections: [
      {
        h2: 'Por que a declaração substitui a conta de água ou luz?',
        content: \`
          <p>Muitos balcões de atendimento tentam dificultar, mas a verdade é amparada por lei (Lei 7.115/83): a declaração de próprio punho ou impressa e assinada tem total validade para comprovar moradia. O objetivo desse documento é transferir para você a responsabilidade legal sobre aquela informação. Ou seja, ao assinar, você atesta sob as penas da lei que mora naquele local, resolvendo a ausência de uma fatura de serviços.</p>
        \`
      },
      {
        h2: 'O que não pode faltar para o seu documento não ser barrado',
        content: \`
          <p>Para que a sua declaração passe direto pela triagem de bancos, faculdades ou órgãos públicos, ela precisa ser objetiva, mas cirúrgica nas informações. Um documento seguro e com credibilidade precisa conter:</p>
          <ul class="list-disc pl-5 my-4 space-y-2">
            <li><strong>Identificação total do declarante:</strong> Seu nome completo, nacionalidade, estado civil, profissão, RG e CPF.</li>
            <li><strong>O endereço completo e exato:</strong> Rua, número, complemento (se for apartamento ou fundos, deixe isso claro), bairro, cidade, estado e CEP.</li>
            <li><strong>O termo de responsabilidade:</strong> Uma frase clara afirmando que você tem ciência das penalidades criminais caso preste uma informação falsa.</li>
            <li><strong>Data, local e assinatura:</strong> Essenciais para fechar a validade do documento.</li>
          </ul>
          <p class="mt-4">Se a sua moradia envolve o pagamento de aluguel diretamente para o proprietário, também é fundamental manter o seu <a href="/recibo-de-aluguel" class="text-emerald-700 font-semibold hover:underline">recibo de aluguel online</a> ou <a href="/recibo-de-aluguel-com-logo" class="text-emerald-700 font-semibold hover:underline">recibo de aluguel com logo</a> em dia para evitar conflitos futuros e comprovar o vínculo.</p>
        \`
      },
      {
        h2: 'Cuidado com os modelos baixados na internet',
        content: \`
          <p>A primeira reação de quem precisa desse documento é procurar no Google e baixar um modelo editável. O risco aqui é alto. Você perde tempo tentando arrumar a formatação que desconfigurou no Word, esquece de apagar o dado do modelo antigo ou acaba deletando a linha que continha a lei de validação.</p>
          <p class="mt-4">Um documento mal formatado, com fontes diferentes ou desalinhado, levanta suspeitas no balcão de atendimento e aumenta as chances do seu comprovante ser recusado pelo atendente.</p>
        \`
      },
      {
        h2: 'A solução definitiva: Gere sua declaração online e de graça',
        content: \`
          <p>A forma mais inteligente de resolver isso é usar a tecnologia a seu favor, focando em acessibilidade e rapidez. Ao invés de brigar com editores de texto, você pode utilizar um gerador online focado na emissão de documentos.</p>
          <p class="mt-4">Você abre a ferramenta direto no navegador do celular — sem precisar baixar nenhum aplicativo —, insere os seus dados pessoais e o endereço. O sistema cuida do resto, entregando um PDF com diagramação profissional, margens corretas e o texto jurídico exato que os órgãos exigem.</p>
        \`,
        hasCta: {
            text: "Gere agora a sua declaração de residência em PDF:",
            link: "/declaracoes/declaracao-de-residencia",
            ctaLabel: "Emitir Declaração de Residência"
        }
      }
    ],
    conclusion: 'A dica de ouro é: gere a sua declaração digital, imprima, assine com firmeza e apresente. Você resolve uma burocracia que levaria dias em questão de minutos, com total segurança e sem gastar um centavo.',
    faqs: [
      {
        question: 'Preciso reconhecer firma no cartório?',
        answer: 'Na esmagadora maioria dos casos (especialmente em órgãos públicos), o reconhecimento de firma não é mais obrigatório, bastando que a sua assinatura no papel seja idêntica à do seu documento de identidade (RG ou CNH). No entanto, algumas empresas privadas (como bancos mais tradicionais ou imobiliárias) ainda podem exigir o selo do cartório por políticas internas.'
      }
    ]
  },
  {`;

code = code.replace(
  /export const blogPosts: BlogPost\[\] = \[\s*\{/,
  `export const blogPosts: BlogPost[] = [\n${newPost}`
);

fs.writeFileSync('src/data/blogPosts.ts', code);
