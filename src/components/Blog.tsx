
import { Calendar, ArrowRight, Clock, User } from 'lucide-react';

const Blog = () => {
  const articles = [
    {
      id: 1,
      title: 'Kijan pou prepare yon renovasyon ki gen siksè?',
      excerpt: 'Dekouvri etap esansyèl yo pou planifye ak reyalize yon pwojè renovasyon ki reponn ak bezwen ou yo ak bidjè ou.',
      image: 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      author: 'Ing. Réveillère Joseph',
      date: '15 Janvye 2024',
      readTime: '5 min',
      category: 'Konsèy Renovasyon'
    },
    {
      id: 2,
      title: 'Materyèl modèn pou konstriksyon an Ayiti',
      excerpt: 'Eksplorасyon nan nouvo materyèl ak teknoloji yo ki disponib pou pwojè konstriksyon nan kontèks klimatik Ayiti a.',
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      author: 'Arch. Marie-Claire Désir',
      date: '8 Janvye 2024',
      readTime: '7 min',
      category: 'Teknoloji'
    },
    {
      id: 3,
      title: 'Optimizasyon espas ak design minimalist',
      excerpt: 'Teknik ak konsèy yo pou maksimize espas nan kay ou ak kreye yon anviwonman ki gen style ak fonksyonèl.',
      image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      author: 'Arch. Marie-Claire Désir',
      date: '2 Janvye 2024',
      readTime: '4 min',
      category: 'Design Interyè'
    }
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-primary mb-4">
            Blog / Atik Konsèy
          </h2>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            Dekouvri konsèy ekspè, tendans nouvo yo, ak enfòmasyon itil pou pwojè konstriksyon ou yo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              {/* Article Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-inter font-medium">
                  {article.category}
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

                <button className="flex items-center gap-2 text-accent hover:text-accent/80 font-inter font-medium transition-colors duration-300">
                  Li plis
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-primary rounded-2xl p-8 text-white">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-poppins font-bold text-2xl mb-4">
              Abònman Newsletter Nou An
            </h3>
            <p className="font-inter text-lg mb-6 text-gray-200">
              Resevwa konsèy ekspè, nouvo pwojè nou yo, ak enfòmasyon sou tendans konstriksyon yo nan Ayiti.
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

        <div className="text-center mt-8">
          <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-inter font-semibold transition-colors duration-300">
            Wè Tout Atik Yo
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
