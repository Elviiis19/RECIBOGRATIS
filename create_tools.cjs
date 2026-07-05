const fs = require('fs');

const createTool = (name, title, desc, keywords, content) => {
  const code = `import React, { useState } from 'react';
import { SEO } from '../../components/SEO';
import { AdSense } from '../../components/AdSense';
import { Calculator } from 'lucide-react';

export function ${name}() {
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <SEO 
        title="${title}"
        description="${desc}"
        keywords="${keywords}"
      />

      <div className="bg-emerald-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Calculator className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl font-extrabold mb-4">${title.split(' - ')[0]}</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            ${desc}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
          <p className="text-gray-600 text-center">
            Ferramenta em desenvolvimento. Em breve você poderá utilizar todos os recursos aqui.
          </p>
        </div>

        <AdSense />

        <div className="prose prose-emerald max-w-none mt-12 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <h2>Sobre a Ferramenta</h2>
          <p>${content}</p>
        </div>
      </div>
    </div>
  );
}
`;
  fs.writeFileSync(`src/pages/tools/${name}.tsx`, code);
};

createTool('GeradorCarnePagamento', 'Gerador de Carnê de Pagamento (Carnê Simples) - PDF Grátis', 'Gere páginas de carnê em PDF (com parcelas por folha) para imprimir e entregar ao cliente para pagamentos mensais.', 'gerador de carne, carne de pagamento, carne de parcelas, emitir carne simples, gerar carne pdf', 'O Gerador de Carnê de Pagamento é ideal para lojistas e autônomos que realizam vendas parceladas e precisam entregar um carnê físico para o cliente.');
createTool('CalculadoraPrecificacao', 'Calculadora de Precificação de Produtos/Serviços (Markup)', 'Insira o custo e a margem de lucro para descobrir exatamente por quanto deve vender seu produto ou serviço.', 'calculadora de precificacao, markup, calcular lucro, preco de venda, margem de lucro', 'Nossa Calculadora de Precificação ajuda você a definir o preço de venda ideal para não ter prejuízo, aplicando a técnica de markup corretamente.');
createTool('CalculadoraHoraExtra', 'Calculadora de Hora Extra e Adicional Noturno', 'Calcule online o valor das suas horas extras e adicional noturno com base no seu salário.', 'calculadora hora extra, adicional noturno, calcular hora extra online, calcular salario', 'Ajuda tanto o trabalhador a conferir seu holerite quanto o pequeno empregador a pagar corretamente as horas excedentes.');
createTool('ControleFiados', 'Controle de Fiados / Caderneta Virtual', 'Anote vendas fiado, controle dívidas de clientes e gere links de cobrança pelo WhatsApp com PIX.', 'controle de fiado, caderneta virtual, anotar fiado online, cobrar cliente whatsapp, app fiado', 'Uma caderneta virtual simples para anotar quem está te devendo, salvar as informações no seu próprio navegador e cobrar os clientes de forma fácil.');

console.log("Created 4 tool files.");
