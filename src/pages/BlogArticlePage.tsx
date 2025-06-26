
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, ArrowLeft, ArrowRight, User, Clock, Tag } from 'lucide-react';

const BlogArticlePage = () => {
  const { slug } = useParams();

  // Mock data - en production, ceci viendrait d'une API ou CMS
  const article = {
    id: 1,
    title: 'Kijan pou Prepare yon Renovasyon ki Gen Siksè?',
    slug: 'kijan-pou-prepare-renovasyon',
    excerpt: 'Dekouvri etap esansyèl yo pou planifye ak reyalize yon pwojè renovasyon ki reponn ak bezwen ou yo ak bidjè ou.',
    content: `
      <p class="lead">Renovasyon kay ou a se yon desizyon enpòtan ki mande planifikasyon ak preparasyon. Nan atik sa a, nou pral gide ou nan etap prensipal yo pou asire siksè pwojè ou a.</p>

      <h2>1. Defini Objektif ak Bidjè ou</h2>
      <p>Avan nou kòmanse nenpòt travay, li enpòtan pou nou klè sou sa nou vle reyalize ak konbyen nou gen pou nou depanse.</p>
      
      <ul>
        <li><strong>Fè yon lis priyorite:</strong> Ki kote nan kay la ki pi enpòtan pou renovasyon?</li>
        <li><strong>Etabli yon bidjè realis:</strong> Mèt kote 10-20% bidjè ou pou depo ki pa prevwa</li>
        <li><strong>Rechèche pri yo:</strong> Konprann kombyen materyèl ak men-d'œuvre koute</li>
      </ul>

      <blockquote>
        "Yon bon planifikasyon se 50% nan siksè yon pwojè renovasyon. Pa janm kòmanse travay san yon plan klè."
        <cite>- Ing. Réveillère Joseph, Rev Konstriksyon</cite>
      </blockquote>

      <h2>2. Chwazi Ekip Pwofesyonèl la</h2>
      <p>Pwojè renovasyon mande ekspètiz ak eksperyans. Men pwen yo pou konsidere:</p>
      
      <ul>
        <li>Verifye lisans ak asirans konpayi yo</li>
        <li>Mande referans ak egzanp travay anterye</li>
        <li>Konprann pwosè yo ak echeye travay la</li>
        <li>Asire ou gen yon kontra ki klè ak detaye</li>
      </ul>

      <h2>3. Planifikasyon ak Permè yo</h2>
      <p>Selon travay ou vle fè a, ou ka bezwen permè nan otoritre lokal yo. Sa ka gen ladan:</p>
      
      <ul>
        <li>Permè konstriksyon pou travay gwo</li>
        <li>Permè elektrik ak plonbri</li>
        <li>Otorizasyon kominote a si nesesè</li>
      </ul>

      <p><em>Rev Konstriksyon ka ede ou ak tout pwosèdi legal yo pou asire pwojè ou an konfòme ak règleman yo.</em></p>

      <h2>4. Preparasyon Chantye a</h2>
      <p>Avan travay yo kòmanse, asire ou:</p>
      
      <ul>
        <li>Pwoteje mèb ak objè valè yo</li>
        <li>Prepare yon espas travay ki pwòp ak sekirite</li>
        <li>Enfòme vwazen yo sou travay yo</li>
        <li>Gen yon plan pou aksè ak estokaj materyèl yo</li>
      </ul>

      <h2>5. Swivi ak Kontwòl Kalite</h2>
      <p>Pandan travay yo ap fèt:</p>
      
      <ul>
        <li>Fè vizit regyè nan chantye a</li>
        <li>Kominike ak ekip la chak jou</li>
        <li>Verifye kalite travay yo nan chak etap</li>
        <li>Dokimante pwogresyon an ak foto</li>
      </ul>

      <p>Swiv konsèy sa yo pou ou gen yon renovasyon ki gen siksè ak ki va dire lontan. Sonje, yon bon preparasyon se kle pou rezilta ki depase atant ou yo.</p>
    `,
    image: 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    author: 'Ing. Réveillère Joseph',
    date: '15 Janvye 2024',
    readTime: '5 min',
    category: 'Konsèy Renovasyon',
    tags: ['renovasyon', 'planifikasyon', 'bidjè', 'konsèy']
  };

  const relatedArticles = [
    {
      id: 2,
      title: 'Materyèl Modèn pou Konstriksyon nan Ayiti',
      slug: 'materyel-modern-konstruksyon-ayiti',
      excerpt: 'Eksplorасyon nan nouvo materyèl ak teknoloji yo ki disponib pou pwojè konstriksyon.',
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      date: '8 Janvye 2024',
      readTime: '7 min'
    },
    {
      id: 3,
      title: 'Optimizasyon Espas ak Design Minimalist',
      slug: 'optimizasyon-espas-design-minimalist',
      excerpt: 'Teknik ak konsèy yo pou maksimize espas nan kay ou ak kreye yon anviwonman ki gen style.',
      image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      date: '2 Janvye 2024',
      readTime: '4 min'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Breadcrumb */}
      <section className="pt-24 pb-8 bg-secondary">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary transition-colors">Akèy</Link>
            <ArrowRight className="w-4 h-4" />
            <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <ArrowRight className="w-4 h-4" />
            <span className="text-primary">{article.category}</span>
          </nav>
        </div>
      </section>

      {/* Article Header */}
      <article className="bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Category & Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-inter font-medium">
                {article.category}
              </span>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="font-poppins font-bold text-3xl md:text-4xl lg:text-5xl text-primary mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="font-inter text-lg text-gray-600 mb-8 leading-relaxed">
              {article.excerpt}
            </p>

            {/* Featured Image */}
            <div className="mb-12">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none font-inter leading-relaxed
                prose-headings:font-poppins prose-headings:font-bold prose-headings:text-primary prose-headings:mb-4 prose-headings:mt-8
                prose-h2:text-2xl prose-h3:text-xl
                prose-p:mb-6 prose-p:text-gray-700 prose-p:leading-relaxed
                prose-ul:mb-6 prose-li:mb-2 prose-li:text-gray-700
                prose-strong:text-primary prose-strong:font-semibold
                prose-em:text-accent prose-em:font-medium
                prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:bg-secondary prose-blockquote:rounded-r-lg prose-blockquote:my-8
                prose-blockquote:text-primary prose-blockquote:font-medium prose-blockquote:italic
                .lead:text-xl .lead:font-medium .lead:text-primary .lead:mb-8"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-200">
              <Tag className="w-4 h-4 text-gray-400" />
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-secondary text-primary px-3 py-1 rounded-full text-sm font-inter hover:bg-accent hover:text-white transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-poppins font-bold text-2xl md:text-3xl mb-4">
              Ou gen pwojè ou vle reyalize?
            </h2>
            <p className="font-inter text-lg mb-8 text-gray-200">
              Kontakte nou pou n planifye l ansanm. Nou la pou ede ou transforme vizyon ou an realite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-inter font-semibold transition-colors duration-300"
              >
                Jwenn Konsèltasyon Gratis
              </Link>
              <Link
                to="/services"
                className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg font-inter font-semibold transition-colors duration-300"
              >
                Gade Sèvis Nou Yo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-poppins font-bold text-2xl md:text-3xl text-primary mb-8 text-center">
              Atik ki Gen Rapò
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  to={`/blog/${relatedArticle.slug}`}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-poppins font-semibold text-xl text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                      {relatedArticle.title}
                    </h3>
                    <p className="font-inter text-gray-600 mb-4 line-clamp-2">
                      {relatedArticle.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{relatedArticle.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{relatedArticle.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-inter font-semibold transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                Retounen sou Blog la
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogArticlePage;
