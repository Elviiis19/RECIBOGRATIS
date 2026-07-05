const fs = require('fs');

const code = `import React, { useState } from 'react';
import { SEO } from '../../components/SEO';
import { AdSense } from '../../components/AdSense';
import { FileText, Printer, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import jsPDF from 'jspdf';

export function GeradorCarnePagamento() {
  const [empresa, setEmpresa] = useState('');
  const [cliente, setCliente] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [parcelas, setParcelas] = useState('3');
  const [vencimentoInicial, setVencimentoInicial] = useState('');
  const [descricao, setDescricao] = useState('');

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const gerarPDF = (e: React.FormEvent) => {
    e.preventDefault();
    const vTotal = parseFloat(valorTotal.replace(',', '.'));
    const nParcelas = parseInt(parcelas);
    
    if (isNaN(vTotal) || isNaN(nParcelas) || !vencimentoInicial) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    const valorParcela = vTotal / nParcelas;
    const dataInicial = new Date(vencimentoInicial + 'T12:00:00');

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    let yOffset = 15;
    const carnesPorPagina = 3;

    for (let i = 0; i < nParcelas; i++) {
      if (i > 0 && i % carnesPorPagina === 0) {
        doc.addPage();
        yOffset = 15;
      }

      const dataVenc = new Date(dataInicial);
      dataVenc.setMonth(dataVenc.getMonth() + i);
      const dataStr = dataVenc.toLocaleDateString('pt-BR');
      
      const vParcelaFormat = valorParcela.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

      doc.setDrawColor(150);
      doc.setLineWidth(0.5);
      doc.rect(10, yOffset, 60, 80); // canhoto
      doc.rect(75, yOffset, 125, 80); // corpo

      // CANHOTO
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("CANHOTO DO CARNÊ", 15, yOffset + 7);
      
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(\`Parcela: \${i + 1} / \${nParcelas}\`, 15, yOffset + 15);
      doc.text(\`Vencimento: \${dataStr}\`, 15, yOffset + 20);
      doc.text(\`Valor: \${vParcelaFormat}\`, 15, yOffset + 25);
      doc.text(\`Cliente: \${cliente.substring(0, 20)}\`, 15, yOffset + 30);
      if (cpf) doc.text(\`CPF/CNPJ: \${cpf}\`, 15, yOffset + 35);
      
      doc.text("Data Pagamento: ___/___/___", 15, yOffset + 48);
      doc.text("Assinatura:", 15, yOffset + 58);
      doc.line(15, yOffset + 68, 65, yOffset + 68);

      // Linha tracejada
      doc.setLineDashPattern([2, 2], 0);
      doc.line(72.5, yOffset, 72.5, yOffset + 80);
      doc.setLineDashPattern([], 0);

      // CORPO PRINCIPAL
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(empresa || "Carnê de Pagamento", 80, yOffset + 10);
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(\`PARCELA \${i + 1} DE \${nParcelas}\`, 160, yOffset + 10);

      doc.setLineWidth(0.2);
      doc.line(75, yOffset + 15, 200, yOffset + 15);

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      
      doc.text("Pagador (Cliente):", 80, yOffset + 22);
      doc.setFont("helvetica", "bold");
      doc.text(cliente, 110, yOffset + 22);
      
      if (cpf) {
        doc.setFont("helvetica", "normal");
        doc.text("CPF/CNPJ:", 80, yOffset + 27);
        doc.setFont("helvetica", "bold");
        doc.text(cpf, 100, yOffset + 27);
      }

      if (endereco) {
        doc.setFont("helvetica", "normal");
        doc.text("Endereço:", 80, yOffset + 32);
        doc.setFont("helvetica", "bold");
        doc.text(endereco.substring(0, 45), 100, yOffset + 32);
      }
      
      doc.setFont("helvetica", "normal");
      doc.text("Referente a:", 80, yOffset + 40);
      doc.setFont("helvetica", "bold");
      doc.text(descricao, 80, yOffset + 45);

      doc.rect(155, yOffset + 17, 40, 12);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text("Vencimento", 157, yOffset + 21);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(dataStr, 157, yOffset + 27);

      doc.rect(155, yOffset + 31, 40, 12);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text("Valor da Parcela", 157, yOffset + 35);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(vParcelaFormat, 157, yOffset + 41);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text("Observações:", 80, yOffset + 55);
      doc.text("Após o vencimento, sujeito a multa e juros. O canhoto serve como controle do recebedor.", 80, yOffset + 60);
      
      doc.text("Autenticação / Assinatura do Recebedor", 120, yOffset + 68);
      doc.line(120, yOffset + 75, 195, yOffset + 75);

      yOffset += 90;
    }

    doc.save("Carne_de_Pagamento.pdf");
  };

  const faqs = [
    {
      question: "Para que serve o Carnê de Pagamento?",
      answer: "O carnê é uma forma física de parcelamento. É ideal para lojistas e autônomos que realizam vendas parceladas e não possuem máquina de cartão de crédito. Você entrega o carnê para o cliente, e ele paga as parcelas mensalmente (em dinheiro, PIX, etc.), assinando o canhoto a cada pagamento."
    },
    {
      question: "O carnê tem validade legal?",
      answer: "Sim. O carnê preenchido com os dados corretos (CPF, endereço) e assinado pelas partes comprova o compromisso de pagamento da dívida. Em caso de inadimplência, pode ser utilizado como prova."
    },
    {
      question: "Posso cobrar juros e multa no carnê atrasado?",
      answer: "Sim, é recomendado que você deixe claro no ato da venda quais serão as multas por atraso e juros mensais, e até adicione essas regras na descrição (Referente a) para ficar registrado."
    },
    {
      question: "Preciso de algum programa especial para imprimir?",
      answer: "Não! Nossa ferramenta gera um arquivo PDF comum que pode ser aberto e impresso em qualquer computador ou celular. Cada folha A4 acomoda 3 parcelas (carnês) formatadas."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <SEO 
        title="Gerador de Carnê de Pagamento em PDF Grátis | Recibo Grátis"
        description="Gere carnês de pagamento simples para impressão com parcelas mensais, canhoto, CPF e endereço do cliente. Ferramenta grátis para lojistas e autônomos."
        keywords="gerador de carne, carne de pagamento pdf, emitir carne simples, carne de parcelas, impressao de carne, carne para cliente, como fazer carne"
        url="https://recibogratis.com.br/gerador-carne-pagamento"
      />

      {/* FAQ Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        })}
      </script>

      <div className="bg-emerald-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FileText className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl font-extrabold mb-4">Gerador de Carnê de Pagamento</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Crie carnês em PDF prontos para impressão com dados completos. Divida o valor, configure vencimentos e entregue as parcelas ao cliente.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8">
          
          <form onSubmit={gerarPDF} className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Dados do Favorecido (Você/Sua Empresa)</h3>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nome da sua Empresa ou Seu Nome</label>
              <input
                type="text"
                required
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="Sua Loja Ltda"
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4 mt-6">Dados do Cliente (Pagador)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nome Completo</label>
                  <input
                    type="text"
                    required
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="João da Silva"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">CPF ou CNPJ</label>
                  <input
                    type="text"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="000.000.000-00"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Endereço do Cliente</label>
                  <input
                    type="text"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="Rua Exemplo, 123 - Bairro - Cidade/UF"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4 mt-6">Dados do Parcelamento</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Valor Total (R$)</label>
                  <input
                    type="text"
                    required
                    value={valorTotal}
                    onChange={(e) => setValorTotal(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="1500.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nº de Parcelas</label>
                  <select
                    value={parcelas}
                    onChange={(e) => setParcelas(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    {[...Array(36)].map((_, i) => (
                      <option key={i+1} value={i+1}>{i+1}x parcelas</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Data 1º Vencimento</label>
                  <input
                    type="date"
                    required
                    value={vencimentoInicial}
                    onChange={(e) => setVencimentoInicial(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Referente a (Descrição)</label>
                <input
                  type="text"
                  required
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="Ex: Compra de roupas, Tratamento odontológico..."
                />
              </div>
            </div>
            
            <div className="pt-6">
              <button
                type="submit"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm hover:shadow-md"
              >
                <Printer className="w-6 h-6" />
                Gerar Carnê em PDF (Pronto para Imprimir)
              </button>
            </div>
          </form>
        </div>

        <AdSense />

        <div className="prose prose-emerald max-w-none mt-12 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <h2>Como funciona o Carnê de Pagamento Simples?</h2>
          <p>
            O carnê de pagamento físico é uma das formas mais tradicionais de parcelamento para pequenos negócios que não querem arcar com as altas taxas de maquininhas de cartão ou custos de emissão de boletos bancários. É ideal para confecções, dentistas, clínicas de estética e vendas porta a porta.
          </p>
          <p>
            Ao preencher nosso gerador, o sistema calcula automaticamente o valor exato de cada parcela e programa os vencimentos com intervalo de 1 mês a partir da data inicial. Você receberá um arquivo PDF formatado com 3 carnês por página, contendo a via do cliente (corpo principal) e o seu canhoto de controle para assinatura (que fica com você após o pagamento).
          </p>
          
          <h3>Por que incluir CPF e Endereço?</h3>
          <p>
            Para aumentar a segurança jurídica da sua venda. Caso o cliente pare de pagar, você tem os dados corretos (CPF e endereço) impressos no documento para acioná-lo no Juizado Especial Cível (Pequenas Causas) ou enviar a dívida para protesto em cartório.
          </p>
        </div>

        {/* FAQs */}
        <div className="mt-12 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Dúvidas Frequentes</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 hover:border-emerald-200"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center bg-gray-50 hover:bg-emerald-50/50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  aria-expanded={openFaq === index}
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                <div 
                  className={\`px-6 overflow-hidden transition-all duration-300 ease-in-out \${
                    openFaq === index ? 'max-h-96 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
                  }\`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/pages/tools/GeradorCarnePagamento.tsx', code);
