
import { useState } from 'react';
import { useNewsletter } from '@/hooks/useNewsletter';
import { Mail, Send } from 'lucide-react';

interface NewsletterProps {
  title?: string;
  subtitle?: string;
  showTitle?: boolean;
  variant?: 'light' | 'dark';
}

const Newsletter = ({ 
  title = "Abònman Newsletter Nou An",
  subtitle = "Resevwa konsèy ekspè, nouvo pwojè nou yo, ak enfòmasyon sou tendans konstriksyon yo nan Ayiti.",
  showTitle = true,
  variant = 'dark'
}: NewsletterProps) => {
  const { subscribe, isLoading } = useNewsletter();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await subscribe(email)) {
      setEmail('');
    }
  };

  const isDark = variant === 'dark';

  return (
    <div className={`rounded-2xl p-8 ${isDark ? 'bg-primary text-white' : 'bg-secondary text-primary'}`}>
      <div className="max-w-2xl mx-auto text-center">
        {showTitle && (
          <div className="flex items-center justify-center gap-3 mb-4">
            <Mail className={`w-8 h-8 ${isDark ? 'text-accent' : 'text-primary'}`} />
            <h3 className="font-poppins font-bold text-2xl">
              {title}
            </h3>
          </div>
        )}
        <p className={`font-inter text-lg mb-6 ${isDark ? 'text-gray-200' : 'text-gray-600'}`}>
          {subtitle}
        </p>
        <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Antre email ou a..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`flex-1 px-4 py-3 rounded-lg font-inter border focus:ring-2 focus:ring-accent focus:border-transparent ${
              isDark 
                ? 'text-primary border-gray-300' 
                : 'text-primary border-gray-300 bg-white'
            }`}
            required
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`px-8 py-3 rounded-lg font-inter font-semibold transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 ${
              isDark
                ? 'bg-accent hover:bg-accent/90 text-white'
                : 'bg-primary hover:bg-primary/90 text-white'
            }`}
          >
            <Send className="w-5 h-5" />
            {isLoading ? 'Ap ajoute...' : 'Abònman'}
          </button>
        </form>
        <p className={`font-inter text-sm mt-4 ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
          Nou respekte vi prive ou. Ou ka retire abònman ou nenpòt lè.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
