import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/translations';

export type Language = 'ht' | 'fr' | 'en';

export interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

export const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'ht', name: 'Kreyòl Ayisyen', flag: '🇭🇹' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Static translations for UI elements
const staticTranslations: Record<Language, Record<string, string>> = {
  ht: {
    // Navigation
    'nav.home': 'Akèy',
    'nav.about': 'Sou Nou',
    'nav.services': 'Sèvis yo',
    'nav.projects': 'Pwojè yo',
    'nav.blog': 'Blog',
    'nav.contact': 'Kontak',
    'nav.testimonials': 'Temwayaj yo',
    
    // Common buttons
    'btn.readMore': 'Li plis',
    'btn.contactUs': 'Kontakte nou',
    'btn.viewAll': 'Gade tout',
    'btn.getQuote': 'Jwenn yon devis',
    'btn.submit': 'Voye',
    'btn.cancel': 'Anile',
    'btn.save': 'Konsève',
    'btn.edit': 'Modifye',
    'btn.delete': 'Efase',
    'btn.publish': 'Pibliye',
    'btn.unpublish': 'Pa pibliye',
    
    // Contact
    'contact.title': 'Kontakte Nou',
    'contact.subtitle': 'N ap tann nou pou diskite sou pwojè w la',
    'contact.phone': 'Telefòn',
    'contact.email': 'Imel',
    'contact.address': 'Adrès',
    'contact.hours': 'Orè travay',
    'contact.form.name': 'Non w',
    'contact.form.email': 'Imel w',
    'contact.form.subject': 'Sijè',
    'contact.form.message': 'Mesaj',
    'contact.form.success': 'Mesaj ou an voye avèk siksè!',
    
    // Footer
    'footer.company': 'Rev Konstriksyon',
    'footer.description': 'Ekspètiz ak kalite nan konstriksyon ak renovasyon depi gen plizyè ane.',
    'footer.quickLinks': 'Lyen rapid yo',
    'footer.followUs': 'Swiv nou',
    'footer.copyright': 'Tout dwa rezève.',
    
    // Blog
    'blog.title': 'Blog nou an',
    'blog.subtitle': 'Konsèy ak nouvèl sou konstriksyon',
    'blog.readTime': 'minit pou li',
    'blog.category': 'Kategori',
    'blog.author': 'Otè',
    'blog.publishedOn': 'Pibliye nan',
    'blog.relatedPosts': 'Atik ki gen rapò',
    
    // Services
    'services.title': 'Sèvis nou yo',
    'services.subtitle': 'N ap ofri yon seri konplè sèvis konstriksyon ak renovasyon',
    'services.features': 'Karakteristik yo',
    'services.priceRange': 'Gamme pri',
    'services.duration': 'Dire',
    
    // Projects
    'projects.title': 'Pwojè nou yo',
    'projects.subtitle': 'Gade nan kèk nan pwojè nou yo ki pi bon yo',
    'projects.before': 'Anvan',
    'projects.after': 'Apre',
    'projects.location': 'Kote',
    'projects.completedOn': 'Fini nan',
    'projects.category': 'Kategori',
    
    // About
    'about.title': 'Sou Nou',
    'about.ourTeam': 'Ekip nou an',
    'about.ourValues': 'Valè nou yo',
    'about.ourMission': 'Misyon nou an',
    
    // Admin
    'admin.login': 'Konekte',
    'admin.dashboard': 'Dashboard',
    'admin.logout': 'Dekonekte',
    'admin.blogs': 'Blog yo',
    'admin.projects': 'Pwojè yo',
    'admin.services': 'Sèvis yo',
    'admin.staticContent': 'Kontni estatik',
    'admin.contactInfo': 'Enfòmasyon kontak',
    'admin.translations': 'Tradiksyon yo',
    'admin.addNew': 'Ajoute nouvo',
    'admin.editTranslations': 'Modifye tradiksyon yo',
    
    // Form validation
    'validation.required': 'Champ sa a obligatwa',
    'validation.email': 'Imel sa a pa valid',
    'validation.minLength': 'Twò kout',
    'validation.maxLength': 'Twò long',
    
    // Loading states
    'loading.blogs': 'N ap chaje blog yo...',
    'loading.projects': 'N ap chaje pwojè yo...',
    'loading.services': 'N ap chaje sèvis yo...',
    'loading.content': 'N ap chaje kontni an...',
    
    // Error states
    'error.loadingFailed': 'Echèk nan chajman',
    'error.tryAgain': 'Eseye ankò',
    'error.somethingWrong': 'Gen yon bagay ki pa mache',
  },
  
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.services': 'Services',
    'nav.projects': 'Projets',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.testimonials': 'Témoignages',
    
    // Common buttons
    'btn.readMore': 'Lire plus',
    'btn.contactUs': 'Nous contacter',
    'btn.viewAll': 'Voir tout',
    'btn.getQuote': 'Obtenir un devis',
    'btn.submit': 'Envoyer',
    'btn.cancel': 'Annuler',
    'btn.save': 'Sauvegarder',
    'btn.edit': 'Modifier',
    'btn.delete': 'Supprimer',
    'btn.publish': 'Publier',
    'btn.unpublish': 'Dépublier',
    
    // Contact
    'contact.title': 'Nous Contacter',
    'contact.subtitle': 'Nous sommes là pour discuter de votre projet',
    'contact.phone': 'Téléphone',
    'contact.email': 'Email',
    'contact.address': 'Adresse',
    'contact.hours': 'Horaires',
    'contact.form.name': 'Votre nom',
    'contact.form.email': 'Votre email',
    'contact.form.subject': 'Sujet',
    'contact.form.message': 'Message',
    'contact.form.success': 'Votre message a été envoyé avec succès !',
    
    // Footer
    'footer.company': 'Rev Construction',
    'footer.description': 'Expertise et qualité en construction et rénovation depuis plusieurs années.',
    'footer.quickLinks': 'Liens rapides',
    'footer.followUs': 'Suivez-nous',
    'footer.copyright': 'Tous droits réservés.',
    
    // Blog
    'blog.title': 'Notre Blog',
    'blog.subtitle': 'Conseils et actualités sur la construction',
    'blog.readTime': 'min de lecture',
    'blog.category': 'Catégorie',
    'blog.author': 'Auteur',
    'blog.publishedOn': 'Publié le',
    'blog.relatedPosts': 'Articles connexes',
    
    // Services
    'services.title': 'Nos Services',
    'services.subtitle': 'Nous offrons une gamme complète de services de construction et rénovation',
    'services.features': 'Caractéristiques',
    'services.priceRange': 'Gamme de prix',
    'services.duration': 'Durée',
    
    // Projects
    'projects.title': 'Nos Projets',
    'projects.subtitle': 'Découvrez quelques-uns de nos meilleurs projets',
    'projects.before': 'Avant',
    'projects.after': 'Après',
    'projects.location': 'Localisation',
    'projects.completedOn': 'Terminé le',
    'projects.category': 'Catégorie',
    
    // About
    'about.title': 'À Propos',
    'about.ourTeam': 'Notre Équipe',
    'about.ourValues': 'Nos Valeurs',
    'about.ourMission': 'Notre Mission',
    
    // Admin
    'admin.login': 'Connexion',
    'admin.dashboard': 'Tableau de bord',
    'admin.logout': 'Déconnexion',
    'admin.blogs': 'Blogs',
    'admin.projects': 'Projets',
    'admin.services': 'Services',
    'admin.staticContent': 'Contenu statique',
    'admin.contactInfo': 'Informations de contact',
    'admin.translations': 'Traductions',
    'admin.addNew': 'Ajouter nouveau',
    'admin.editTranslations': 'Modifier les traductions',
    
    // Form validation
    'validation.required': 'Ce champ est requis',
    'validation.email': 'Cet email n\'est pas valide',
    'validation.minLength': 'Trop court',
    'validation.maxLength': 'Trop long',
    
    // Loading states
    'loading.blogs': 'Chargement des blogs...',
    'loading.projects': 'Chargement des projets...',
    'loading.services': 'Chargement des services...',
    'loading.content': 'Chargement du contenu...',
    
    // Error states
    'error.loadingFailed': 'Échec du chargement',
    'error.tryAgain': 'Réessayer',
    'error.somethingWrong': 'Quelque chose s\'est mal passé',
  },
  
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.projects': 'Projects',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.testimonials': 'Testimonials',
    
    // Common buttons
    'btn.readMore': 'Read more',
    'btn.contactUs': 'Contact us',
    'btn.viewAll': 'View all',
    'btn.getQuote': 'Get quote',
    'btn.submit': 'Submit',
    'btn.cancel': 'Cancel',
    'btn.save': 'Save',
    'btn.edit': 'Edit',
    'btn.delete': 'Delete',
    'btn.publish': 'Publish',
    'btn.unpublish': 'Unpublish',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'We\'re here to discuss your project',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.address': 'Address',
    'contact.hours': 'Hours',
    'contact.form.name': 'Your name',
    'contact.form.email': 'Your email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.success': 'Your message has been sent successfully!',
    
    // Footer
    'footer.company': 'Rev Construction',
    'footer.description': 'Expertise and quality in construction and renovation for several years.',
    'footer.quickLinks': 'Quick links',
    'footer.followUs': 'Follow us',
    'footer.copyright': 'All rights reserved.',
    
    // Blog
    'blog.title': 'Our Blog',
    'blog.subtitle': 'Tips and news about construction',
    'blog.readTime': 'min read',
    'blog.category': 'Category',
    'blog.author': 'Author',
    'blog.publishedOn': 'Published on',
    'blog.relatedPosts': 'Related posts',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'We offer a complete range of construction and renovation services',
    'services.features': 'Features',
    'services.priceRange': 'Price range',
    'services.duration': 'Duration',
    
    // Projects
    'projects.title': 'Our Projects',
    'projects.subtitle': 'Check out some of our best projects',
    'projects.before': 'Before',
    'projects.after': 'After',
    'projects.location': 'Location',
    'projects.completedOn': 'Completed on',
    'projects.category': 'Category',
    
    // About
    'about.title': 'About Us',
    'about.ourTeam': 'Our Team',
    'about.ourValues': 'Our Values',
    'about.ourMission': 'Our Mission',
    
    // Admin
    'admin.login': 'Login',
    'admin.dashboard': 'Dashboard',
    'admin.logout': 'Logout',
    'admin.blogs': 'Blogs',
    'admin.projects': 'Projects',
    'admin.services': 'Services',
    'admin.staticContent': 'Static content',
    'admin.contactInfo': 'Contact information',
    'admin.translations': 'Translations',
    'admin.addNew': 'Add new',
    'admin.editTranslations': 'Edit translations',
    
    // Form validation
    'validation.required': 'This field is required',
    'validation.email': 'This email is not valid',
    'validation.minLength': 'Too short',
    'validation.maxLength': 'Too long',
    
    // Loading states
    'loading.blogs': 'Loading blogs...',
    'loading.projects': 'Loading projects...',
    'loading.services': 'Loading services...',
    'loading.content': 'Loading content...',
    
    // Error states
    'error.loadingFailed': 'Loading failed',
    'error.tryAgain': 'Try again',
    'error.somethingWrong': 'Something went wrong',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('ht'); // Default to Haitian Creole

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['ht', 'fr', 'en'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string, fallback?: string): string => {
    // First try our dynamic translations
    const dynamicTranslation = translations[currentLanguage]?.[key];
    if (dynamicTranslation) return dynamicTranslation;
    
    // Fallback to static translations
    const staticTranslation = staticTranslations[currentLanguage]?.[key];
    return staticTranslation || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};