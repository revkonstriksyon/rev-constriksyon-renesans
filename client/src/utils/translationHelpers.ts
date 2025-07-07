import { Language } from '@/contexts/LanguageContext';

// Helper function to get translated content from multilang data
export function getTranslatedContent<T>(
  data: T | null | undefined,
  field: string,
  language: Language,
  fallback?: string
): string {
  if (!data || typeof data !== 'object') {
    return fallback || '';
  }

  const obj = data as Record<string, any>;
  
  // Try to get the translation for the current language
  const translatedField = `${field}_${language}`;
  if (obj[translatedField]) {
    return obj[translatedField];
  }

  // Fallback to Haitian Creole (default)
  const defaultField = `${field}_ht`;
  if (obj[defaultField]) {
    return obj[defaultField];
  }

  // Fallback to the base field (for backward compatibility)
  if (obj[field]) {
    return obj[field];
  }

  return fallback || '';
}

// Helper to get all available translations for a field
export function getAllTranslations<T>(
  data: T | null | undefined,
  field: string
): Record<Language, string> {
  if (!data || typeof data !== 'object') {
    return { ht: '', fr: '', en: '' };
  }

  const obj = data as Record<string, any>;
  
  return {
    ht: obj[`${field}_ht`] || obj[field] || '',
    fr: obj[`${field}_fr`] || obj[field] || '',
    en: obj[`${field}_en`] || obj[field] || '',
  };
}

// Helper to create translation object for database inserts
export function createTranslationFields(
  baseField: string,
  translations: Partial<Record<Language, string>>
): Record<string, string> {
  const result: Record<string, string> = {};
  
  Object.entries(translations).forEach(([lang, text]) => {
    if (text && text.trim()) {
      result[`${baseField}_${lang}`] = text.trim();
    }
  });
  
  return result;
}