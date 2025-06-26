import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Clock, User, Search, Tag } from 'lucide-react';
import { useState } from 'react';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Tout Atik', count: 12 },
    { id: 'conseils', label: 'Konsèy Konstriksyon', count: 4 },
    { id: 'projets', label: 'Etid Pwojè', count: 3 },
    { id: 'materiaux', label: 'Materyèl ak Teknoloji', count: 3 },
    { id: 'tendances', label: 'Tendans ak Design', count: 2 }
  ];

  const articles = [
    {
      id: 1,
      title: 'Kijan pou Prepare yon Renovasyon ki Gen Siksè?',
      slug: 'kijan-pou-prepare-renovasyon',
      excerpt: 'Dekouvri etap esansyèl yo pou planifye ak reyalize yon pwojè renovasyon ki reponn ak bezwen ou yo ak bidjè ou.',
      content: 'Renovasyon kay ou a se yon desizyon enpòtan ki mande planifikasyon ak preparasyon...',
      image: 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      author: 'Ing. Réveillère Joseph',
      date: '15 Janvye 2024',
      readTime: '5 min',
      category: 'conseils',
      categoryLabel: 'Konsèy Renovasyon',
      tags: ['renovasyon', 'planifikasyon', 'bidjè', 'konsèy']
    },
    {
      id: 2,
      title: 'Materyèl Modèn pou Konstriksyon nan Ayiti',
      slug: 'materyel-modern-konstruksyon-ayiti',
      excerpt: 'Eksplorасyon nan nouvo materyèl ak teknoloji yo ki disponib pou pwojè konstriksyon nan kontèks klimatik Ayiti a.',
      content: 'Nan ane kap vini yo, endustri konstriksyon an nan Ayiti ap chanje ak nouvo materyèl yo...',
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      author: 'Arch. Marie-Claire Désir',
      date: '8 Janvye 2024',
      readTime: '7 min',
      category: 'materiaux',
      categoryLabel: 'Materyèl ak Teknoloji',
      tags: ['materyèl', 'teknoloji', 'inovasyon', 'klimat']
    },
    {
      id: 3,
      title: 'Optimizasyon Espas ak Design Minimalist',
      slug: 'optimizasyon-espas-design-minimalist',
      excerpt: 'Teknik ak konsèy yo pou maksimize espas nan kay ou ak kreye yon anviwonman ki gen style ak fonksyonèl.',
      content: 'Design minimalist pa vle di kay ou a dwe vid oswa san karaktè...',
      image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      author: 'Arch. Marie-Claire Désir',
      date: '2 Janvye 2024',
      readTime: '4 min',
      category: 'tendances',
      categoryLabel: 'Design Interyè',
      tags: ['design', 'minimalist', 'espas', 'interyè']
    },
    {
      id: 4,
      title: 'Sekirite nan Chantye: Pi Bon Pratik yo',
      slug: 'sekirite-chantye-bon-pratik',
      excerpt: 'Mesí sekirite esansyèl yo pou pwoteje travayè yo ak vizitè yo nan yon chantye konstriksyon.',
      content: 'Sekirite nan chantye se yon priyorite absolí nan tout pwojè Rev Konstriksyon yo...',
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      author: 'Eng. Patrick Moreau',
      date: '28 Desanm 2023',
      readTime: '6 min',
      category: 'conseils',
      categoryLabel: 'Konsèy Profesyonèl',
      tags: ['sekirite', 'chantye', 'travayè', 'pwoteksyon']
    },
    {
      id: 5,
      title: 'Etid Ka: Villa Modèn Péguy-Ville',
      slug: 'etid-ka-villa-modern-peguy-ville',
      excerpt: 'Analiz konplè nan pwojè konstriksyon villa sa a: defi yo, solisyon yo, ak rezilta final la.',
      content: 'Pwojè villa sa a nan Péguy-Ville te prezante plizyè defi enteresan...',
      image: 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      author: 'Ing. Réveillère Joseph',
      date: '20 Desanm 2023',
      readTime: '8 min',
      category: 'projets',
      categoryLabel: 'Etid Pwojè',
      tags: ['villa', 'etid-ka', 'modern', 'peguy-ville']
    },
    {
      id: 6,
      title: 'Konstriksyon Ekolojik: Avantay ak Defi yo',
      slug: 'konstruksyon-ekolojik-avantay-defi',
      excerpt: 'Eksplorе konsèp konstriksyon dirab ak kijan pou nou integre pratik ekolojik yo nan pwojè yo.',
      content: 'Konstriksyon ekolojik pa sèlman yon tendans, men yon nesesite nan kontèks aktyèl la...',
      image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      author: 'Arch. Marie-Claire Désir',
      date: '15 Desanm 2023',
      readTime: '9 min',
      category: 'tendances',
      categoryLabel: 'Konstriksyon Ekolojik',
      tags: ['ekolojik', 'dirab', 'anviwonman', 'enèji']
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-6">
            Blog Rev Konstriksyon
          </h1>
          <p className="font-inter text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
            Dekouvri konsèy ekspè, tendans nouvo yo, ak enfòmasyon itil pou pwojè konstriksyon ou yo nan Ayiti.
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
                placeholder="Chèche atik..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-inter font-medium transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-accent text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md'
                  }`}
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
      {filteredArticles.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="font-poppins font-bold text-2xl text-primary mb-8">Atik ki gen Pi Gwo Entèrès</h2>
            <div className="bg-secondary rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={filteredArticles[0].image}
                    alt={filteredArticles[0].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-inter font-medium">
                    {filteredArticles[0].categoryLabel}
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="font-poppins font-bold text-2xl text-primary mb-4">
                    {filteredArticles[0].title}
                  </h3>
                  <p className="font-inter text-gray-600 mb-6">
                    {filteredArticles[0].excerpt}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{filteredArticles[0].author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{filteredArticles[0].date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{filteredArticles[0].readTime}</span>
                    </div>
                  </div>
                  
                  <Link
                    to={`/blog/${filteredArticles[0].slug}`}
                    className="flex items-center gap-2 text-accent hover:text-accent/80 font-inter font-medium transition-colors duration-300"
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.slice(1).map((article) => (
              <article
                key={article.id}
                className="bg-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                {/* Article Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-inter font-medium">
                    {article.categoryLabel}
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6">
                  <h3 className="font-poppins font-semibold text-xl text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                    {article.title}
                  </h3>

                  <p className="font-inter text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Article Meta */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
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

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-white text-accent px-2 py-1 rounded text-xs font-inter"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/blog/${article.slug}`}
                    className="flex items-center gap-2 text-accent hover:text-accent/80 font-inter font-medium transition-colors duration-300"
                  >
                    Li Plis
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-inter font-semibold transition-colors duration-300">
              Chaje Pi Gwo Atik
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-poppins font-bold text-2xl mb-4">
              Abònman Newsletter Nou An
            </h3>
            <p className="font-inter text-lg mb-6 text-gray-200">
              Resevwa konsèy ekspè, nouvo atik yo, ak enfòmasyon sou tendans konstriksyon yo nan Ayiti chak semèn.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Antre email ou a..."
                className="flex-1 px-4 py-3 rounded-lg text-primary font-inter"
                required
              />
              <button
                type="submit"
                className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg font-inter font-semibold transition-colors duration-300"
              >
                Abònman
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
