import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { useLanguage, languages, Language } from '@/contexts/LanguageContext';
import { Globe, Save, Edit3 } from 'lucide-react';
import { getAllTranslations, createTranslationFields } from '@/utils/translationHelpers';

interface TranslationFormProps {
  title: string;
  description?: string;
  initialData?: any;
  fields: Array<{
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'array';
    required?: boolean;
  }>;
  onSave: (translations: Record<string, any>) => Promise<void>;
  onCancel: () => void;
}

const TranslationForm: React.FC<TranslationFormProps> = ({
  title,
  description,
  initialData,
  fields,
  onSave,
  onCancel
}) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<Record<Language, Record<string, any>>>(() => {
    const data: Record<Language, Record<string, any>> = {
      ht: {},
      fr: {},
      en: {}
    };

    // Initialize form data with existing translations
    fields.forEach(field => {
      const translations = getAllTranslations(initialData, field.key);
      languages.forEach(lang => {
        data[lang.code][field.key] = translations[lang.code] || '';
      });
    });

    return data;
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = (language: Language, fieldKey: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [language]: {
        ...prev[language],
        [fieldKey]: value
      }
    }));
  };

  const handleArrayFieldChange = (language: Language, fieldKey: string, index: number, value: string) => {
    const currentArray = formData[language][fieldKey] || [''];
    const newArray = [...currentArray];
    newArray[index] = value;
    
    handleFieldChange(language, fieldKey, newArray);
  };

  const addArrayItem = (language: Language, fieldKey: string) => {
    const currentArray = formData[language][fieldKey] || [];
    handleFieldChange(language, fieldKey, [...currentArray, '']);
  };

  const removeArrayItem = (language: Language, fieldKey: string, index: number) => {
    const currentArray = formData[language][fieldKey] || [];
    const newArray = currentArray.filter((_: any, i: number) => i !== index);
    handleFieldChange(language, fieldKey, newArray);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Convert form data to database format
      const translationData: Record<string, any> = {};

      fields.forEach(field => {
        languages.forEach(lang => {
          const value = formData[lang.code][field.key];
          if (value && (typeof value === 'string' ? value.trim() : value.length > 0)) {
            translationData[`${field.key}_${lang.code}`] = value;
          }
        });
      });

      await onSave(translationData);
    } catch (error) {
      console.error('Error saving translations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderField = (field: any, language: Language) => {
    const value = formData[language][field.key] || '';

    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => handleFieldChange(language, field.key, e.target.value)}
            placeholder={`${field.label} en ${languages.find(l => l.code === language)?.name}`}
            rows={4}
            className="min-h-[100px]"
          />
        );
      
      case 'array':
        const arrayValue = Array.isArray(value) ? value : [''];
        return (
          <div className="space-y-2">
            {arrayValue.map((item: string, index: number) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => handleArrayFieldChange(language, field.key, index, e.target.value)}
                  placeholder={`${field.label} ${index + 1}`}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeArrayItem(language, field.key, index)}
                  disabled={arrayValue.length === 1}
                >
                  ×
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addArrayItem(language, field.key)}
            >
              + Ajouter
            </Button>
          </div>
        );
      
      default:
        return (
          <Input
            value={value}
            onChange={(e) => handleFieldChange(language, field.key, e.target.value)}
            placeholder={`${field.label} en ${languages.find(l => l.code === language)?.name}`}
          />
        );
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          {title}
        </CardTitle>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="ht" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {languages.map((language) => (
              <TabsTrigger key={language.code} value={language.code} className="flex items-center gap-2">
                <span>{language.flag}</span>
                {language.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {languages.map((language) => (
            <TabsContent key={language.code} value={language.code} className="space-y-4 mt-6">
              {fields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label htmlFor={`${field.key}_${language.code}`}>
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  {renderField(field, language.code)}
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            {t('btn.cancel')}
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Saving...' : t('btn.save')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TranslationForm;