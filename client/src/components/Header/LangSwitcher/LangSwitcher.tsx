import { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function LangSwitcher() {
  const [language, setLanguage] = useState(
    localStorage.getItem('lang') || 'En'
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
        className={language === 'En' ? 'lang-active' : ''}
        onClick={() => handleLangChange('En')}>
        En
      </Button>
      <Button
        className={language === 'Ru' ? 'lang-active' : ''}
        onClick={() => handleLangChange('Ru')}>
        Ru
      </Button>
    </ButtonGroup>
  );
}
