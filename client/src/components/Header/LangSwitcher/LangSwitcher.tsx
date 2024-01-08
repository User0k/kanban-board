import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setLanguage } from '../../../store/slices/langSlice';
import { Language } from '../../../models';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function LangSwitcher() {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.langReducer);
  const handleLangChange = (language: Language) => {
    localStorage.setItem('lang', language);
    dispatch(setLanguage(language));
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
