
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, Clock, User, ArrowLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url?: string;
  category: string;
  author: string;
  date: string;
  read_time: string;
  slug: string;
  published: boolean;
}

const BlogArticlePage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('slug', slug || '')
          .eq('published', true)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            setNotFound(true);
          } else {
            throw error;
          }
        } else {
          setPost({
            id: data.id,
            title: data.title,
            excerpt: data.excerpt,
            content: data.content,
            image_url: data.image_url || undefined,
            category: data.category,
            author: data.author,
            date: data.date,
            read_time: data.read_time,
            slug: data.slug,
            published: data.published,
          });
          fetchRelatedPosts(data.category, data.id);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchRelatedPosts = async (category: string, currentId: string) => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('category', category)
          .eq('published', true)
          .neq('id', currentId)
          .limit(3);

        if (error) throw error;
        setRelatedPosts(data.map(post => ({
          id: post.id,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          image_url: post.image_url || undefined,
          category: post.category,
          author: post.author,
          date: post.date,
          read_time: post.read_time,
          slug: post.slug,
          published: post.published,
        })) || []);
      } catch (error) {
        console.error('Error fetching related posts:', error);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  useEffect(() => {
    // Smooth scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all content elements
    const elements = document.querySelectorAll('.blog-content p, .blog-content h1, .blog-content h2, .blog-content h3, .blog-content blockquote, .blog-content ul, .blog-content ol');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [post]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="h-64 bg-gray-200 rounded mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Atik pa jwenn</h1>
            <p className="text-gray-600 mb-8">Atik ou ap chèche a pa egziste oswa li pa pibliye ankò.</p>
            <Link to="/blog">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retounen sou Blog
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary transition-colors">
              Akèy
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium truncate max-w-xs">
              {post.title}
            </span>
          </nav>
        </div>
      </div>

      <article className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <div className="mb-6">
            <Link to="/blog">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retounen sou Blog
              </Button>
            </Link>
          </div>

          {/* Article header */}
          <header className="mb-8 bg-white rounded-2xl p-8 shadow-sm">
            <div className="mb-4">
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.read_time}</span>
              </div>
            </div>

            {post.image_url && (
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-64 md:h-96 object-cover"
                />
              </div>
            )}
          </header>

          {/* Article content */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div 
              className="blog-content prose prose-lg max-w-none
                prose-headings:text-gray-900 prose-headings:font-bold prose-headings:mb-6 prose-headings:mt-8
                prose-h1:text-3xl prose-h1:mb-8 prose-h1:mt-10 prose-h1:text-primary prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-4
                prose-h2:text-2xl prose-h2:mb-6 prose-h2:mt-8 prose-h2:text-primary
                prose-h3:text-xl prose-h3:mb-4 prose-h3:mt-6 prose-h3:text-gray-800
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-justify prose-p:text-base
                prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-a:transition-all
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-em:text-gray-800 prose-em:italic
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-gray-50 
                prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic 
                prose-blockquote:text-gray-700 prose-blockquote:font-medium prose-blockquote:shadow-sm
                prose-ul:space-y-3 prose-ol:space-y-3 prose-ul:my-6 prose-ol:my-6
                prose-li:text-gray-700 prose-li:leading-relaxed prose-li:marker:text-primary
                prose-img:rounded-lg prose-img:shadow-md prose-img:my-8
                prose-hr:border-gray-200 prose-hr:my-8
                first:prose-p:mt-0 last:prose-p:mb-0"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Atik ki gen rapò</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link 
                    key={relatedPost.id} 
                    to={`/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                      {relatedPost.image_url && (
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={relatedPost.image_url}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="text-sm text-primary font-medium mb-2">
                          {relatedPost.category}
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                          {relatedPost.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <span>{relatedPost.author}</span>
                          <span>{relatedPost.read_time}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Call to action */}
          <div className="mt-12 bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Ou gen yon pwojè nan tèt ou?</h2>
            <p className="text-lg mb-6 opacity-90">
              Ann diskite sou jan nou ka ede w konstwi rèv ou yo.
            </p>
            <Link to="/contact">
              <Button size="lg" variant="secondary">
                Kominike ak nou
              </Button>
            </Link>
          </div>
        </div>
      </article>

      <Footer />

      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
          }
          
          .blog-content > * {
            opacity: 0;
            transform: translateY(20px);
          }
          
          /* Enhanced typography and spacing */
          .blog-content p {
            text-align: justify;
            margin-bottom: 1.5rem;
            line-height: 1.8;
            color: #374151;
            font-size: 1rem;
            padding: 0 1rem;
          }
          
          .blog-content h1, .blog-content h2, .blog-content h3 {
            margin-top: 2.5rem;
            margin-bottom: 1.5rem;
            font-weight: 700;
            padding: 0 1rem;
          }
          
          .blog-content h1 {
            color: hsl(var(--primary));
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 1rem;
          }
          
          .blog-content h2 {
            color: hsl(var(--primary));
          }
          
          .blog-content ul, .blog-content ol {
            padding-left: 2rem;
            margin: 1.5rem 0;
          }
          
          .blog-content li {
            margin-bottom: 0.75rem;
            line-height: 1.7;
            color: #374151;
          }
          
          .blog-content li::marker {
            color: hsl(var(--primary));
            font-weight: 600;
          }
          
          .blog-content blockquote {
            background: #f9fafb;
            border-left: 4px solid hsl(var(--primary));
            padding: 1.5rem;
            margin: 2rem 1rem;
            border-radius: 0 8px 8px 0;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          
          .blog-content a {
            color: hsl(var(--primary));
            font-weight: 500;
            transition: all 0.2s ease;
          }
          
          .blog-content a:hover {
            text-decoration: underline;
            color: hsl(var(--accent));
          }
          
          .blog-content img {
            margin: 2rem auto;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          
          .blog-content hr {
            margin: 2.5rem 0;
            border-color: #e5e7eb;
          }
          
          @media (max-width: 768px) {
            .blog-content p, .blog-content h1, .blog-content h2, .blog-content h3 {
              padding: 0 0.5rem;
            }
            
            .blog-content blockquote {
              margin: 2rem 0.5rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default BlogArticlePage;
