import { Translation } from "../types";

export const pageNotFound = (): Translation['pageNotFound'] => ({
  header: 'О нет! Запрашивамая вами страница потерялась!',
  back: 'Домой',
});
