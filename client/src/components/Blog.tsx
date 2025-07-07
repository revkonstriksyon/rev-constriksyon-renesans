
import { Calendar, ArrowRight, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBlogs } from '@/hooks/useBlogs';
import { useStaticContent } from '@/hooks/useStaticContent';
import Newsletter from './Newsletter';

const Blog = () => {
  const { blogs, isLoading, error } = useBlogs();
  const { content } = useStaticContent();

  if (isLoading) {
    return (
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Ap chaje blog yo...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-gray-600">Tanpri eseye ankò pi ta.</p>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return (
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-primary mb-4">
            {content.blog_section_title || 'Blog / Atik Konsèy'}
          </h2>
          <p className="font-inter text-lg text-gray-600">
            Pa gen atik pibliye pou kounye a. Tounen pi ta!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-primary mb-4">
            {content.blog_section_title || 'Blog / Atik Konsèy'}
          </h2>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            {content.blog_section_subtitle || 'Dekouvri konsèy ekspè, tendans nouvo yo, ak enfòmasyon itil pou pwojè konstriksyon ou yo.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-200"
            >
              {/* Article Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={blog.image_url || 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>
                <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-inter font-medium">
                  {blog.category}
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6">
                <h3 className="font-poppins font-semibold text-xl text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                  {blog.title}
                </h3>

                <p className="font-inter text-gray-600 mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>

                {/* Article Meta */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(blog.created_at).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{blog.read_time}</span>
                  </div>
                </div>

                <Link
                  to={`/blog/${blog.slug}`}
                  className="flex items-center gap-2 text-accent hover:text-black font-inter font-medium transition-colors duration-300"
                >
                  Li plis
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16">
          <Newsletter />
        </div>

        <div className="text-center mt-8">
          <Link
            to="/blog"
            className="bg-accent hover:bg-black hover:border-accent border-2 border-accent text-white px-8 py-4 rounded-lg font-inter font-semibold transition-all duration-300"
          >
            Wè Tout Atik Yo
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
