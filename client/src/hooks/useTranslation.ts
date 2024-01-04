import { useEffect, useState } from 'react';
import { Translation } from '../locales/types';
import { useAppSelector } from './useAppSelector';

export const useTranslation = <T extends keyof Translation>(
  component: T
): Translation[T] | null => {
  const { language } = useAppSelector((state) => state.langReducer);
  const [translation, setTranslation] = useState<Translation[T] | null>(null);

  useEffect(() => {
    const fetchTranslation = async () => {
      try {
        const module = await import(`../locales/${language}/${component}.ts`);
        setTranslation(module[component]);
      } catch (error) {
        console.error(error, 'This language is unsupportable');
      }
    };

    fetchTranslation();
  }, [language, component]);

  return translation;
};
