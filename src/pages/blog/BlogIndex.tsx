import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FileText, ArrowRight, BookOpen, Clock } from 'lucide-react';
import { blogPosts } from '../../data/blogPosts';
import { blogCategories } from '../../data/blogTypes';
import { SEO } from '../../components/SEO';

export const BlogIndex = () => {
  const { category: categorySlug } = useParams();
  
  const currentCategory = categorySlug 
    ? blogCategories.find(c => c.slug === categorySlug) 
    : null;

  const filteredPosts = currentCategory 
    ? blogPosts.filter(p => p.category === categorySlug)
    : blogPosts;

  const title = currentCategory 
    ? `Blog - ${currentCategory.name} | Recibo Grátis` 
    : 'Blog - Dicas de Financeiro e MEI | Recibo Grátis';
    
  const desc = currentCategory
    ? `Leia os melhores artigos sobre ${currentCategory.name.toLowerCase()}. Dicas práticas, legislação simplificada e gestão para autônomos e MEI.`
    : 'Acompanhe nosso blog e fique por dentro das melhores dicas de gestão financeira, MEI, legislação simplificada e recibos com validade legal.';

  return (
    <>
      <SEO 
        title={title}
        description={desc}
        url={`https://recibogratis.com.br/blog${categorySlug ? `/categoria/${categorySlug}` : ''}`}
      />

      {/* Hero Header */}
      <section className="pt-24 pb-12 bg-emerald-900 border-b border-emerald-800 text-white relative flex flex-col items-center">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            {currentCategory ? currentCategory.name : 'Blog do Recibo Grátis'}
          </h1>
          <p className="text-lg md:text-xl text-emerald-100/90 max-w-2xl mx-auto font-medium">
            O guia definitivo de estruturação financeira para quem não tem tempo a perder.
          </p>
        </div>
      </section>

      {/* Main Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content Area */}
          <div className="w-full lg:w-3/4">
            {filteredPosts.length === 0 ? (
              <div className="bg-emerald-50 rounded-2xl p-12 text-center border border-emerald-100">
                <BookOpen className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-emerald-900 mb-2">Nenhum artigo encontrado</h3>
                <p className="text-emerald-700">Ainda não publicamos conteúdos nesta categoria.</p>
                <Link to="/blog" className="mt-6 inline-flex text-emerald-700 font-semibold hover:text-emerald-800 underline">
                  Voltar para todos os artigos
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[...filteredPosts].reverse().map((post) => {
                  const cat = blogCategories.find(c => c.slug === post.category);
                  return (
                    <article key={post.slug} className="group bg-white border border-gray-100 hover:border-emerald-200 shadow-sm hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-300 flex flex-col">
                      <div className="p-8 flex flex-col flex-grow">
                        <div className="mb-4">
                          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                            {cat?.name || 'Artigo'}
                          </span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-4 group-hover:text-emerald-700 transition-colors">
                          <Link to={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h2>
                        <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                          {post.intro.acordo} {post.intro.promessa}
                        </p>
                        <div className="mt-auto pt-6 border-t border-gray-50">
                          <Link 
                            to={`/blog/${post.slug}`}
                            className="inline-flex items-center font-bold text-emerald-600 group-hover:text-emerald-700"
                          >
                            Ler artigo completo
                            <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 space-y-8">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                Categorias
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/blog" 
                    className={`block px-4 py-2 rounded-xl text-sm font-medium transition-colors ${!currentCategory ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    Todos os Artigos
                  </Link>
                </li>
                {blogCategories.map((category) => (
                  <li key={category.slug}>
                    <Link 
                      to={`/blog/categoria/${category.slug}`} 
                      className={`block px-4 py-2 rounded-xl text-sm font-medium transition-colors ${currentCategory?.slug === category.slug ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Geradores Úteis</h4>
                <div className="space-y-3">
                  <Link to="/recibo-simples" className="group flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl hover:border-emerald-200 transition-colors">
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-emerald-700">Recibo Simples</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-500" />
                  </Link>
                  <Link to="/recibo-para-mei" className="group flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl hover:border-emerald-200 transition-colors">
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-emerald-700">Recibo MEI</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-500" />
                  </Link>
                </div>
              </div>
            </div>
          </aside>
          
        </div>
      </main>
    </>
  );
};
