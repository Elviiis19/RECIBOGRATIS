const fs = require('fs');
let code = fs.readFileSync('src/pages/blog/BlogIndex.tsx', 'utf8');

const target = `<article key={post.slug} className="group bg-white border border-gray-100 hover:border-emerald-200 shadow-sm hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-300 flex flex-col">
                      <div className="p-8 flex flex-col flex-grow">
                        <div className="mb-4">
                          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                            {cat?.name || 'Artigo'}
                          </span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-4 group-hover:text-emerald-700 transition-colors">
                          <Link to={\`/blog/\${post.slug}\`}>
                            {post.title}
                          </Link>
                        </h2>
                        <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                          {post.intro.acordo} {post.intro.promessa}
                        </p>
                        <div className="mt-auto pt-6 border-t border-gray-50">
                          <Link 
                            to={\`/blog/\${post.slug}\`}
                            className="inline-flex items-center font-bold text-emerald-700 group-hover:text-emerald-800"
                          >
                            Ler artigo completo
                            <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </article>`;

const replacement = `<Link to={\`/blog/\${post.slug}\`} key={post.slug} className="group bg-white border border-gray-100 hover:border-emerald-200 shadow-sm hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-300 flex flex-col cursor-pointer">
                      <article className="p-8 flex flex-col flex-grow">
                        <div className="mb-4">
                          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                            {cat?.name || 'Artigo'}
                          </span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-4 group-hover:text-emerald-700 transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                          {post.intro.acordo} {post.intro.promessa}
                        </p>
                        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center font-bold text-emerald-700 group-hover:text-emerald-800">
                          Ler artigo completo
                          <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </article>
                    </Link>`;

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('src/pages/blog/BlogIndex.tsx', code);
    console.log("Success");
} else {
    console.log("Target not found");
}
