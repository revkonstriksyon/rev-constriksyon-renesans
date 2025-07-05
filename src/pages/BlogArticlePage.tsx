
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOManager from '@/components/SEO/SEOManager';
import { BlogPostStructuredData, OrganizationStructuredData } from '@/components/SEO/StructuredData';
import { Calendar, ArrowLeft, ArrowRight, User, Clock, Tag, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useStaticContent } from '@/hooks/useStaticContent';
import { useBlog } from '@/hooks/useBlogs';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslatedContent } from '@/utils/translationHelpers';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

interface RelatedBlog {
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
  created_at: string;
  // Multilang fields
  title_ht?: string;
  title_fr?: string;
  title_en?: string;
  excerpt_ht?: string;
  excerpt_fr?: string;
  excerpt_en?: string;
  category_ht?: string;
  category_fr?: string;
  category_en?: string;
  author_ht?: string;
  author_fr?: string;
  author_en?: string;
}

const BlogArticlePage = () => {
  const { slug } = useParams();
  const { blog, isLoading, error } = useBlog(slug || '');
  const [relatedArticles, setRelatedArticles] = useState<RelatedBlog[]>([]);
  const [isLoadingRelated, setIsLoadingRelated] = useState(false);
  const { content } = useStaticContent();
  const { currentLanguage } = useLanguage();

  // Fetch related articles when blog is loaded
  useEffect(() => {
    const fetchRelatedArticles = async () => {
      if (!blog) return;

      try {
        setIsLoadingRelated(true);
        
        const { data: relatedData, error: relatedError } = await supabase
          .from('blogs')
          .select('*')
          .eq('category', blog.category)
          .eq('published', true)
          .neq('id', blog.id)
          .limit(3);

        if (!relatedError && relatedData) {
          // Translate related articles
          const translatedRelated = relatedData.map(article => ({
            ...article,
            title: getTranslatedContent(article, 'title', currentLanguage, article.title),
            excerpt: getTranslatedContent(article, 'excerpt', currentLanguage, article.excerpt),
            category: getTranslatedContent(article, 'category', currentLanguage, article.category),
            author: getTranslatedContent(article, 'author', currentLanguage, article.author),
            date: article.date || new Date(article.created_at).toLocaleDateString('fr-FR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            }),
          }));
          setRelatedArticles(translatedRelated);
        }
      } catch (error) {
        console.error('Error fetching related articles:', error);
      } finally {
        setIsLoadingRelated(false);
      }
    };

    fetchRelatedArticles();
  }, [blog, currentLanguage]);

  // Loading state
  if (isLoading) {
    return (
      <>
        <SEOManager
          title="Ap chaje atik la..."
          description="Atik blog Rev Konstriksyon ap chaje..."
          noIndex={true}
        />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <Header />
          <div className="pt-32 pb-20">
            <div className="container mx-auto px-4 text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl max-w-md mx-auto">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-6"></div>
                <p className="text-lg font-medium text-gray-700">Ap chaje atik la...</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Error or article not found
  if (error || !blog) {
    return (
      <>
        <SEOManager
          title="Atik la pa jwenn - Rev Konstriksyon"
          description="Atik ou ap chèche a pa egziste oswa li pa pibliye."
          noIndex={true}
        />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <Header />
          <div className="pt-32 pb-20">
            <div className="container mx-auto px-4 text-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-xl max-w-lg mx-auto">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">😕</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Atik la pa jwenn</h1>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {error || 'Atik ou ap chèche a pa egziste oswa li pa pibliye.'}
                </p>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-inter font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Retounen sou Blog la
                </Link>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  const articleUrl = `https://www.revkonstriksyon.com/blog/${blog.slug}`;
  const publishedDate = new Date(blog.created_at).toISOString();

  return (
    <>
      <SEOManager
        title={`${blog.title} - Blog Rev Konstriksyon`}
        description={blog.excerpt}
        keywords={`${blog.category}, konstriksyon Ayiti, ${blog.title.toLowerCase()}, Rev Konstriksyon, blog konstriksyon`}
        canonicalUrl={articleUrl}
        ogTitle={blog.title}
        ogDescription={blog.excerpt}
        ogImage={blog.image_url || undefined}
        ogType="article"
        articlePublishedTime={publishedDate}
        articleAuthor={blog.author}
        articleSection={blog.category}
      />
      <BlogPostStructuredData
        title={blog.title}
        description={blog.excerpt}
        author={blog.author}
        datePublished={publishedDate}
        image={blog.image_url || undefined}
        url={articleUrl}
      />
      <OrganizationStructuredData />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Header />
        
        {/* Breadcrumb Section */}
        <section className="pt-28 pb-8 bg-white/80 backdrop-blur-sm border-b border-gray-100">
          <div className="container mx-auto px-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" className="text-gray-500 hover:text-primary transition-colors font-medium">
                      🏠 Akèy
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/blog" className="text-gray-500 hover:text-primary transition-colors font-medium">
                      📝 Blog
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-primary font-semibold">
                    {blog.category}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Article Header */}
        <article className="bg-white">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
              {/* Category & Meta */}
              <div className="flex flex-wrap items-center gap-6 mb-8 animate-fade-in">
                <span className="bg-gradient-to-r from-accent to-accent/80 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg">
                  {blog.category}
                </span>
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium">{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium">{blog.date}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Clock className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium">{blog.read_time}</span>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl text-primary mb-8 leading-tight animate-fade-in">
                {blog.title}
              </h1>

              {/* Excerpt */}
              <div className="bg-gradient-to-r from-secondary to-secondary/50 rounded-2xl p-8 mb-12 animate-fade-in">
                <p className="font-inter text-xl text-gray-700 leading-relaxed italic">
                  "{blog.excerpt}"
                </p>
              </div>

              {/* Featured Image */}
              {blog.image_url && (
                <div className="mb-16 animate-fade-in">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src={blog.image_url}
                      alt={blog.title}
                      className="w-full h-64 md:h-96 lg:h-[500px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
              )}

              {/* Article Content with enhanced styling */}
              <div className="animate-fade-in">
                <div 
                  className="prose prose-xl max-w-none font-inter leading-relaxed
                    prose-headings:font-poppins prose-headings:font-bold prose-headings:text-primary prose-headings:mb-6 prose-headings:mt-12
                    prose-h1:text-4xl prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-4
                    prose-h2:text-3xl prose-h2:text-accent prose-h2:relative prose-h2:pl-6
                    prose-h2:before:content-[''] prose-h2:before:absolute prose-h2:before:left-0 prose-h2:before:top-2 prose-h2:before:w-1 prose-h2:before:h-8 prose-h2:before:bg-accent prose-h2:before:rounded-full
                    prose-h3:text-2xl prose-h3:text-primary/80
                    prose-h4:text-xl prose-h4:text-primary/70
                    prose-p:mb-8 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-lg
                    prose-ul:mb-8 prose-ol:mb-8 prose-li:mb-3 prose-li:text-gray-700 prose-li:text-lg
                    prose-strong:text-primary prose-strong:font-bold prose-strong:bg-primary/5 prose-strong:px-1 prose-strong:rounded
                    prose-em:text-accent prose-em:font-medium prose-em:not-italic
                    prose-a:text-accent prose-a:no-underline prose-a:font-semibold hover:prose-a:text-accent/80 prose-a:transition-colors
                    prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:bg-gradient-to-r prose-blockquote:from-secondary/50 prose-blockquote:to-transparent
                    prose-blockquote:pl-8 prose-blockquote:py-6 prose-blockquote:rounded-r-2xl prose-blockquote:my-12 prose-blockquote:shadow-lg
                    prose-blockquote:text-primary prose-blockquote:font-medium prose-blockquote:italic prose-blockquote:text-xl
                    prose-img:rounded-2xl prose-img:shadow-xl prose-img:my-12 prose-img:border prose-img:border-gray-100
                    prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-6 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:shadow-lg
                    prose-code:bg-gray-100 prose-code:text-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-base prose-code:font-medium
                    prose-hr:border-gray-200 prose-hr:my-16
                    .lead:text-2xl .lead:font-medium .lead:text-primary .lead:mb-12 .lead:p-6 .lead:bg-gradient-to-r .lead:from-secondary/30 .lead:to-transparent .lead:rounded-xl .lead:border-l-4 .lead:border-primary"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>
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
    </>
  );
};

export default BlogArticlePage;
