import { header } from './en/shared/header';
import { loggedInGroup } from './en/shared/loggedInGroup';
import { logOutedGroup } from './en/shared/logOutedGroup';
import { welcomePage } from './en/pages/welcomePage';

const translatedObj = {
  header,
  loggedInGroup,
  logOutedGroup,
  welcomePage,
};

type TranslationFn = typeof translatedObj;
export type Translation = {
  [K in keyof TranslationFn]: TranslationFn[K] extends () => infer T ? T : never;
};
