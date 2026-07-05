import React, { useState, useEffect } from 'react';
import { SEO  } from '../../components/SEO';
import { AdSense } from '../../components/AdSense';
import { Wallet, Book, Plus, User, DollarSign, Trash2, Phone, Save, CheckCircle2, ShieldCheck, Clock, Calculator } from 'lucide-react';

interface Fiado {
  id: string;
  nome: string;
  telefone: string;
  valor: number;
  data: string;
  descricao: string;
}

import { ChevronDown, ChevronUp } from 'lucide-react';

export function ControleFiados() {
  const faqs = [
    {
      question: "O que é o Controle de Fiados?",
      answer: "O Controle de Fiados (caderneta digital) é uma ferramenta para registrar vendas a prazo na confiança para seus clientes. Ele substitui o tradicional caderno de papel, permitindo que você acompanhe quem deve, quanto deve e registre os pagamentos parciais ou totais."
    },
    {
      question: "Os dados ficam salvos onde?",
      answer: "Os dados ficam salvos no seu próprio navegador (Local Storage). Se você limpar o histórico do navegador ou acessar de outro celular, as informações não estarão lá. Para maior segurança, exporte seus dados para PDF ou imprima com frequência."
    },
    {
      question: "Posso cobrar juros sobre vendas fiadas?",
      answer: "Sim, porém é importante que o cliente esteja ciente disso no momento da compra. Recomendamos emitir notas promissórias ou carnês para formalizar a dívida se os valores forem altos."
    },
    {
      question: "A ferramenta é gratuita?",
      answer: "Sim! Nosso controle de caderneta de clientes é 100% gratuito e não possui limite de clientes ou registros."
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Schema Inject:

  const [fiados, setFiados] = useState<Fiado[]>([]);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('recibogratis_fiados');
    if (saved) {
      try {
        setFiados(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse fiados");
      }
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('recibogratis_fiados', JSON.stringify(fiados));
  }, [fiados]);

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const vValor = parseFloat(valor.replace(',', '.'));
    if (isNaN(vValor) || !nome) return;

    const newFiado: Fiado = {
      id: Date.now().toString(),
      nome,
      telefone,
      valor: vValor,
      descricao,
      data: new Date().toISOString()
    };

    setFiados([newFiado, ...fiados]);
    setNome('');
    setTelefone('');
    setValor('');
    setDescricao('');
  };

  const removeFiado = (id: string) => {
    if (window.confirm("Deseja realmente apagar este registro?")) {
      setFiados(fiados.filter(f => f.id !== id));
    }
  };

  const cobrarWhatsApp = (f: Fiado) => {
    const telefoneLimpo = f.telefone.replace(/\D/g, '');
    if (!telefoneLimpo) {
      alert("Por favor, edite ou recrie o registro informando um número de WhatsApp.");
      return;
    }
    
    // Gerar texto para cobrar
    const texto = `Olá ${f.nome}, tudo bem? Estou passando para lembrar do valor de ${formatCurrency(f.valor)} referente a ${f.descricao ? f.descricao : 'sua compra com a gente'}. Quando puder, me avise!`;
    const url = `https://wa.me/55${telefoneLimpo}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  };

  const totalFiado = fiados.reduce((acc, f) => acc + f.valor, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <SEO 
        title="Controle de Fiados e Caderneta Virtual Grátis | Recibo Grátis"
        description="Anote os fiados dos seus clientes, controle quem está te devendo de forma simples no celular e envie cobrança automática pelo WhatsApp."
        keywords="controle de fiado, caderneta virtual de clientes, aplicativo fiado, anotar quem deve, sistema de cobrança grátis"
        url="https://recibogratis.com.br/controle-de-fiados"
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
          <Book className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl font-extrabold mb-4">Controle de Fiados</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Sua caderneta virtual segura. Anote dívidas, controle o total e cobre pelo WhatsApp com um clique. Tudo salvo apenas no seu aparelho.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-600" />
                Novo Registro
              </h2>

              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nome do Cliente</label>
                  <input
                    type="text"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="João Silva"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp (com DDD)</label>
                  <input
                    type="text"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="11999999999"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Valor (R$)</label>
                  <input
                    type="text"
                    required
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="50.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Descrição</label>
                  <input
                    type="text"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="Produtos diversos..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Save className="w-5 h-5" />
                  Salvar Fiado
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-8">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-emerald-600" />
                  Caderneta Virtual
                </h2>
                <div className="text-right">
                  <p className="text-xs text-gray-500 uppercase font-semibold">Total a Receber</p>
                  <p className="text-2xl font-black text-rose-600">{formatCurrency(totalFiado)}</p>
                </div>
              </div>

              {fiados.length === 0 ? (
                <div className="text-center text-gray-400 py-12">
                  <Book className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>Nenhum fiado registrado. Adicione o primeiro ali ao lado!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {fiados.map(fiado => (
                    <div key={fiado.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-gray-900">{fiado.nome}</h3>
                        <p className="text-sm text-gray-600">{fiado.descricao}</p>
                        <p className="text-xs text-gray-400 mt-1">Registrado em {new Date(fiado.data).toLocaleDateString('pt-BR')}</p>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                        <span className="font-bold text-rose-600 text-lg">
                          {formatCurrency(fiado.valor)}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => cobrarWhatsApp(fiado)}
                            title="Cobrar via WhatsApp"
                            className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                          >
                            <Phone className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => removeFiado(fiado.id)}
                            title="Apagar / Pago"
                            className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <AdSense />
          </div>

        </div>

                {/* SEO Content Section */}
        <section className="py-16 md:py-24 bg-white border-t border-gray-100 mt-12 rounded-3xl">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              <article>
                <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                  Por que aposentar a caderneta de papel?
                </h2>
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                  <p>Anotar as dívidas e os "fiados" dos clientes num caderno de papel é uma prática centenária, mas extremamente vulnerável. Cadernos molham, são perdidos ou têm páginas rasgadas, gerando prejuízos incalculáveis para padarias, mercearias, autônomos e pequenas lojas.</p>
                  <p>Com o <strong>Controle de Fiados Digital</strong>, você mantém um registro seguro no seu próprio aparelho e nunca mais perde a conta de quem te deve.</p>
                </div>
              
              </div>
            </article>

              <article>
                <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                  Privacidade Total: Sem Nuvem
                </h3>
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                  <p>A privacidade financeira dos seus clientes é coisa séria. Nós não enviamos nenhum dado preenchido no nosso painel para servidores na internet (nuvem). Toda a sua carteira de clientes devedores e valores ficam guardados na memória local do seu navegador e só você tem acesso.</p>
                </div>
              
              </div>
            </article>

              <article>
                <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Wallet className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                  Cobrança Inteligente via WhatsApp
                </h3>
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                  <p>Cobrar um cliente pessoalmente pode gerar constrangimento. Nosso sistema de controle de fiados tem um botão dedicado ao WhatsApp que formata automaticamente uma mensagem cordial, amigável, com o valor exato da dívida, agilizando o seu recebimento e mantendo a relação boa com o freguês.</p>
                </div>
              
              </div>
            </article>

              <hr className="border-gray-100" />

              <article>
                <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-8">
                  Dúvidas Frequentes sobre Fiado
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div 
                      key={index} 
                      className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 hover:border-emerald-200 bg-white"
                    >
                      <button
                        type="button"
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-emerald-50/50 transition-colors"
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
                        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                          openFaq === index ? 'max-h-96 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
                        }`}
                      >
                        <p className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
