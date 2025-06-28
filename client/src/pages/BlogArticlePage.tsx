
import { useParams, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, ArrowLeft, ArrowRight, User, Clock, Tag } from 'lucide-react';
import { useStaticContent } from '@/hooks/useStaticContent';

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  author: string;
  date: string;
  read_time: string;
  category: string;
  image_url: string | null;
  published: boolean;
}

const BlogArticlePage = () => {
  const { slug } = useParams();
  const { content } = useStaticContent();

  const { data: article, isLoading, error } = useQuery({
    queryKey: ['blog', slug],
    queryFn: async () => {
      if (!slug) throw new Error('No slug provided');
      const response = await fetch(`/api/blogs/${slug}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Blog not found');
        }
        throw new Error('Failed to fetch blog');
      }
      return response.json() as Promise<Blog>;
    },
    enabled: !!slug,
  });

  const { data: allBlogs = [] } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const response = await fetch('/api/blogs');
      if (!response.ok) throw new Error('Failed to fetch blogs');
      return response.json() as Promise<Blog[]>;
    },
  });

  const relatedArticles = article 
    ? allBlogs.filter(blog => 
        blog.category === article.category && 
        blog.id !== article.id
      ).slice(0, 3)
    : [];

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-24 pb-16 bg-gray-50 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Ap chaje atik la...</p>
        </div>
      </div>
    );
  }

  // Article not found
  if (error || !article) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-24 pb-16 bg-gray-50 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Atik la pa jwenn</h1>
          <p className="text-gray-600 mb-8">Atik ou ap chèche a pa egziste oswa li pa pibliye.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-inter font-semibold transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Retounen sou Blog la
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

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
                  <span>{article.read_time}</span>
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
            {article.image_url && (
              <div className="mb-12">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
                />
              </div>
            )}

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
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-poppins font-bold text-2xl md:text-3xl mb-4">
              {content.cta_title || 'Ou gen pwojè ou vle reyalize?'}
            </h2>
            <p className="font-inter text-lg mb-8 text-gray-200">
              {content.cta_subtitle || 'Kontakte nou pou n planifye l ansanm. Nou la pou ede ou transforme vizyon ou an realite.'}
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
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-poppins font-bold text-2xl md:text-3xl text-primary mb-8 text-center">
                Atik ki Gen Rapò
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    to={`/blog/${relatedArticle.slug}`}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={relatedArticle.image_url || 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'}
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
                          <span>{relatedArticle.read_time}</span>
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
      )}

      <Footer />
    </div>
  );
};

export default BlogArticlePage;
