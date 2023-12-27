import { defaultLang } from '../constants';
import { Language } from '../models';

const validateLanguage = (lang: string | null) => {
  if ((lang as Language) !== undefined) {
    return lang as Language;
  }
};

export const getLanguage = () => {
  const langFromLS = localStorage.getItem('lang');

  return (
    validateLanguage(langFromLS) ||
    validateLanguage(navigator.language.split('-')[0]) ||
    defaultLang
  );
};
