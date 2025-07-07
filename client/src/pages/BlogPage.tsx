
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import SEOManager from '@/components/SEO/SEOManager';
import { OrganizationStructuredData } from '@/components/SEO/StructuredData';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Clock, User, Search, Tag } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useBlogs } from '@/hooks/useBlogs';
import { useStaticContent } from '@/hooks/useStaticContent';
import { Pagination } from '@/components/ui/pagination';
import { stripHtmlTags } from '@/utils/textHelpers';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const { blogs, isLoading, error } = useBlogs();
  const { content } = useStaticContent();
  
  const ITEMS_PER_PAGE = 9;

  // Get unique categories from blogs
  const categories = [
    { id: 'all', label: 'Tout Atik', count: blogs.length },
    ...Array.from(new Set(blogs.map(blog => blog.category))).map(cat => ({
      id: cat,
      label: cat,
      count: blogs.filter(blog => blog.category === cat).length
    }))
  ];

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stripHtmlTags(blog.excerpt).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of blog section
    const blogSection = document.getElementById('blog-content');
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <>
        <SEOManager
          title="Blog Konstriksyon ak Konsèy Firme de Construction nan Ayiti"
          description="Dekouvri konsèy ekspè sou konstriksyon ak renovasyon nan Ayiti. Blog Rev Konstriksyon ak atik sou plan achitekti, deviz estimatif, ak nouvo tendans nan domèn konstriksyon ak bureau d'étude."
          keywords="blog konstriksyon Ayiti, konsèy renovasyon Haiti, atik firme de construction, tips bati lakay, Rev Konstriksyon blog, enfòmasyon bureau d'étude, deviz konstriksyon, plan achitekti Haiti"
          canonicalUrl="https://www.revkonstriksyon.com/blog"
        />
        <div className="min-h-screen">
          <Header />
          <div className="pt-24 pb-16 bg-gray-50 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-gray-600">Ap chaje atik yo...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <SEOManager
          title="Blog Konstriksyon ak Konsèy Firme de Construction nan Ayiti"
          description="Dekouvri konsèy ekspè sou konstriksyon ak renovasyon nan Ayiti."
          keywords="blog konstriksyon Ayiti, konsèy renovasyon Haiti"
          canonicalUrl="https://www.revkonstriksyon.com/blog"
        />
        <div className="min-h-screen">
          <Header />
          <div className="pt-24 pb-16 bg-gray-50 text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Erè nan chaje blog yo</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-inter font-semibold transition-colors duration-300"
            >
              Eseye Ankò
            </button>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <SEOManager
        title="Blog Konstriksyon ak Konsèy Firme de Construction nan Ayiti"
        description="Dekouvri konsèy ekspè sou konstriksyon ak renovasyon nan Ayiti. Blog Rev Konstriksyon ak atik sou plan achitekti, deviz estimatif, siveyans chantye ak nouvo tendans nan domèn firme de construction ak bureau d'étude."
        keywords="blog konstriksyon Ayiti, konsèy renovasyon Haiti, atik firme de construction, tips bati lakay, Rev Konstriksyon blog, enfòmasyon bureau d'étude, deviz konstriksyon, plan achitekti Haiti, siveyans chantye, entreprise de bâtiment Haiti"
        canonicalUrl="https://www.revkonstriksyon.com/blog"
        ogTitle="Blog Rev Konstriksyon - Konsèy ak Enfòmasyon Firme de Construction"
        ogDescription="Li konsèy ekspè ak atik itil sou konstriksyon ak renovasyon nan Ayiti. Blog firme de construction Rev Konstriksyon ki ka ede ou nan pwojè ou yo."
      />
      <OrganizationStructuredData />
      
      <div className="min-h-screen">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-primary to-primary/80">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-6">
              {content.blog_section_title || 'Blog Firme de Construction Rev Konstriksyon'}
            </h1>
            <p className="font-inter text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
              {content.blog_section_subtitle || 'Dekouvri konsèy ekspè, tendans nouvo yo, ak enfòmasyon itil sou plan achitekti, deviz estimatif, ak pwojè konstriksyon nan Ayiti. Bureau d\'étude ak firme de construction ki ka ede ou reyalize rèv ou yo.'}
            </p>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Chèche atik sou konstriksyon..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent"
                  aria-label="Chèche atik blog konstriksyon"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`px-4 py-2 rounded-lg font-inter font-medium transition-all duration-300 flex items-center gap-2 ${
                      selectedCategory === category.id
                        ? 'bg-accent text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md'
                    }`}
                    aria-label={`Filtre atik pa kategori: ${category.label}`}
                  >
                    <Tag className="w-4 h-4" />
                    {category.label}
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        {filteredBlogs.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="font-poppins font-bold text-2xl text-primary mb-8">Atik ki gen Pi Gwo Entèrès</h2>
              <div className="bg-secondary rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-auto">
                    <img
                      src={filteredBlogs[0].image_url || 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
                      alt={`${filteredBlogs[0].title} - Rev Konstriksyon firme de construction`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-inter font-medium">
                      {filteredBlogs[0].category}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <h3 className="font-poppins font-bold text-2xl text-primary mb-4">
                      {filteredBlogs[0].title}
                    </h3>
                    <p className="font-inter text-gray-600 mb-6">
                      {stripHtmlTags(filteredBlogs[0].excerpt)}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{filteredBlogs[0].author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{filteredBlogs[0].date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{filteredBlogs[0].read_time}</span>
                      </div>
                    </div>
                    
                    <Link
                      to={`/blog/${filteredBlogs[0].slug}`}
                      className="flex items-center gap-2 text-accent hover:text-accent/80 font-inter font-medium transition-colors duration-300"
                      aria-label={`Li atik konplè: ${filteredBlogs[0].title}`}
                    >
                      Li Atik Konplè A
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Articles Grid */}
        <section id="blog-content" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            {filteredBlogs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 font-inter text-lg">
                  {searchTerm || selectedCategory !== 'all' 
                    ? 'Pa gen atik ki koresspòn ak rechèch ou a.'
                    : 'Pa gen atik pibliye pou kounye a.'
                  }
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedBlogs.map((blog) => (
                  <article
                    key={blog.id}
                    className="bg-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    {/* Article Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={blog.image_url || 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
                        alt={`${blog.title} - Rev Konstriksyon firme de construction`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
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
                        {stripHtmlTags(blog.excerpt)}
                      </p>

                      {/* Article Meta */}
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{blog.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{blog.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{blog.read_time}</span>
                        </div>
                      </div>

                      <Link
                        to={`/blog/${blog.slug}`}
                        className="flex items-center gap-2 text-accent hover:text-accent/80 font-inter font-medium transition-colors duration-300"
                        aria-label={`Li atik: ${blog.title}`}
                      >
                        Li Plis
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
            
            {/* Pagination */}
            {filteredBlogs.length > ITEMS_PER_PAGE && (
              <div className="mt-12 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  className="justify-center"
                />
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <Newsletter 
              variant="light"
              title="Abònman Newsletter Firme de Construction Nou An"
              subtitle="Resevwa konsèy ekspè, nouvo atik yo, ak enfòmasyon sou tendans konstriksyon ak renovasyon nan Ayiti chak semèn."
            />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default BlogPage;
