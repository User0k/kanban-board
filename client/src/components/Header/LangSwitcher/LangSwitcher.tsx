import { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function LangSwitcher() {
  const [language, setLanguage] = useState(
    localStorage.getItem('lang') || 'en'
  );
  const handleLangChange = (language: string) => {
    setLanguage(language);
    localStorage.setItem('lang', language);
  };

  return (
    <ButtonGroup
      variant="text"
      aria-label="lang switcher"
      className="lang-switcher">
      <Button
        className={language === 'en' ? 'lang-active' : ''}
        onClick={() => handleLangChange('en')}>
        En
      </Button>
      <Button
        className={language === 'ru' ? 'lang-active' : ''}
        onClick={() => handleLangChange('ru')}>
        Ru
      </Button>
    </ButtonGroup>
  );
}
