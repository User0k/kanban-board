import { header } from './en/header';
import { loggedInGroup } from './en/loggedInGroup';
import { logOutedGroup } from './en/logOutedGroup';
import { welcomePage } from './en/welcomePage';

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
