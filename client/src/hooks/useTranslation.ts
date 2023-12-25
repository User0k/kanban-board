import { useEffect, useState } from 'react';
import { Translation } from '../../locales/types';

export const useTranslation = (lang: string) => {
  const [translation, setTranslation] = useState<Translation | null>(null);

  useEffect(() => {
    const fetchTranslation = async () => {
      try {
        const module = await import(`../../locales/${lang}/index.ts`);
        setTranslation(module[lang]());
      } catch (error) {
        console.error('This language is unsupportable');
        setTranslation(null);
      }
    };

    fetchTranslation();
  }, [lang]);

  return translation;
};
