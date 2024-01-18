import { board } from './en/board';
import { boardPage } from './en/boardPage';
import { column } from './en/column';
import { header } from './en/header';
import { loginPage } from './en/loginPage';
import { mainPage } from './en/mainPage';
import { modals } from './en/modals';
import { pageNotFound } from './en/pageNotFound';
import { profilePage } from './en/profilePage';
import { registerPage } from './en/registerPage';
import { task } from './en/task';
import { welcomePage } from './en/welcomePage';

const translatedObj = {
  header,
  board,
  boardPage,
  column,
  loginPage,
  mainPage,
  modals,
  pageNotFound,
  profilePage,
  registerPage,
  task,
  welcomePage,
};

type TranslationFn = typeof translatedObj;
export type Translation = {
  [K in keyof TranslationFn]: TranslationFn[K] extends () => infer T
    ? T
    : never;
};
