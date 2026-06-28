import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  User,
  FileSignature,
  ArrowRight,
} from "lucide-react";
import { blogPosts } from "../../data/blogPosts";
import { blogCategories } from "../../data/blogTypes";
import { AdSenseBlock } from "../../components/AdSenseBlock";
import { SEO } from "../../components/SEO";

export const BlogPostView = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const post = blogPosts.find((p) => p.slug === slug);
  const category = post
    ? blogCategories.find((c) => c.slug === post.category)
    : null;

  useEffect(() => {
    if (!post) {
      navigate("/blog", { replace: true });
    }
  }, [post, navigate]);

  if (!post) return null;

  const faqSchema =
    post.faqs && post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription,
    image: post.image ? `https://recibogratis.com.br${post.image}` : "https://recibogratis.com.br/og-image.webp",
    datePublished: "2024-05-15T08:00:00+08:00",
    dateModified: new Date().toISOString(),
    author: {
      "@type": "Person",
      name: "Elvis Dias",
      jobTitle: "Jornalista (DRT 1466/RO)",
    },
    publisher: {
      "@type": "Organization",
      name: "Recibo Grátis",
      logo: {
        "@type": "ImageObject",
        url: "https://recibogratis.com.br/logo.png"
      }
    }
  };

  const schemas: any[] = [{ ...articleSchema, "@context": undefined }];
  if (faqSchema) schemas.push({ ...faqSchema, "@context": undefined });

  const schemaString = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": schemas,
  });

  return (
    <>
      <SEO
        title={post.seoTitle}
        description={post.seoDescription}
        url={`https://recibogratis.com.br/blog/${post.slug}`}
        schema={schemaString}
      />

      <article className="min-h-screen bg-gray-50 pb-20">
        {/* Header Block */}
        <header className="bg-emerald-900 border-b border-emerald-800 text-white relative pt-20 pb-16 px-4">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')] opacity-20"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <Link
              to="/blog"
              className="inline-flex items-center text-emerald-300 hover:text-white font-medium mb-8 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar para o Blog
            </Link>

            <div className="mb-6">
              <span className="inline-flex items-center rounded-full bg-emerald-800/80 px-4 py-1.5 text-sm font-semibold text-emerald-100 ring-1 ring-inset ring-emerald-500/30">
                {category?.name || "Artigo"}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8 leading-tight">
              {post.title}
            </h1>

            {/* E-E-A-T Top Author Signature */}
            <div className="flex items-center gap-4 bg-emerald-800/40 p-4 rounded-xl border border-emerald-700/50 inline-flex">
              <div className="bg-emerald-700 p-2 rounded-full">
                <FileSignature className="w-6 h-6 text-emerald-100" />
              </div>
              <div>
                <p className="text-sm text-emerald-100 font-medium">
                  Por <strong className="text-white">Elvis Dias</strong>
                </p>
                <p className="text-xs text-emerald-300">
                  Jornalista Profissional (DRT 1466/RO)
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
            {/* Introdução Método APP */}
            {post.image && (
              <div className="mb-10 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-auto object-cover max-h-[500px]"
                  loading="lazy"
                />
              </div>
            )}

            <div className="prose prose-lg prose-emerald max-w-none mb-12">
              <p className="lead text-xl text-gray-600 leading-relaxed font-medium">
                {post.intro.acordo}
              </p>
              <p className="text-gray-800 font-semibold mt-4">
                {post.intro.promessa}
              </p>
              <p className="text-gray-700 mt-4">{post.intro.previa}</p>
            </div>

            <AdSenseBlock slot="intro-bottom" />

            {/* Table of Contents - Índice */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 mb-12">
              <h3 className="text-lg font-bold text-gray-900 mb-4 tracking-tight uppercase">
                Índice do Conteúdo
              </h3>
              <ul className="space-y-3">
                {post.sections.map((sec, idx) => {
                  const anchorId = `sec-${idx}`;
                  return (
                    <li key={idx}>
                      <a
                        href={`#${anchorId}`}
                        className="text-emerald-700 font-medium hover:text-emerald-800 hover:underline flex items-start gap-2"
                      >
                        <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-400" />
                        {sec.h2}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Body Content */}
            <div className="prose prose-lg prose-emerald max-w-none">
              {post.sections.map((section, idx) => (
                <div key={idx} id={`sec-${idx}`} className="mb-12 scroll-mt-24">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                    {section.h2}
                  </h2>
                  <div
                    className="text-gray-700 leading-relaxed space-y-4 article-content"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />

                  {section.hasAd && (
                    <AdSenseBlock
                      slot={`mid-article-${idx}`}
                      className="my-10"
                    />
                  )}

                  {/* Contextual CTA */}
                  {section.hasCta && (
                    <div className="my-10 bg-emerald-50 border border-emerald-200 rounded-2xl p-8 shadow-sm">
                      <h4 className="text-xl font-bold text-emerald-900 mb-3">
                        {section.hasCta.text}
                      </h4>
                      <Link
                        to={section.hasCta.link}
                        className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                      >
                        {section.hasCta.ctaLabel}
                      </Link>
                    </div>
                  )}
                </div>
              ))}

              <hr className="my-12 border-gray-100" />

              {/* Conclusion */}
              <div
                className="text-gray-700 leading-relaxed font-medium bg-gray-50 p-8 rounded-2xl border-l-4 border-emerald-500"
                dangerouslySetInnerHTML={{ __html: post.conclusion }}
              />
            </div>

            {/* E-E-A-T Author Bio Footer */}
            <div className="mt-16 bg-white border border-gray-200 rounded-2xl p-8 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-sm">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-10 h-10 text-emerald-700" />
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-xl font-bold text-gray-900">Elvis Dias</h4>
                <p className="text-emerald-700 font-medium mb-3">
                  Jornalista (DRT 1466/RO) e Especialista em Conteúdo Digital
                </p>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Com anos de atuação rigorosa em apuração de dados e elaboração
                  de informações focadas em simplificar a burocracia financeira
                  do brasileiro. Toda a informação deste guia foi curada para
                  blindar você e seu negócio.
                </p>
              </div>
            </div>

            <AdSenseBlock slot="above-faq" className="mt-12" />

            {/* FAQs Section for Featured Snippets */}
            {post.faqs && post.faqs.length > 0 && (
              <div className="mt-16 pt-12 border-t border-gray-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight text-center md:text-left">
                  Perguntas Frequentes
                </h2>
                <div className="space-y-6">
                  {post.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:border-emerald-200 transition-colors"
                    >
                      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        {faq.question}
                      </h3>
                      <p className="text-gray-700 m-0 ml-8 text-sm md:text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    </>
  );
};
