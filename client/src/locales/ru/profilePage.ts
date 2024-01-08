import { Translation } from '../types';

export const profilePage = (): Translation['profilePage'] => ({
  header: 'Добро пожаловать в профиль',
  name: 'Имя: ',
  email: 'Email: ',
  delete: 'Удалить аккаунт',
  edit: 'Изменить профиль',
  element: 'профиль',
  deleteError: 'Невозможно удалить аккаунт',
  updateError: 'Невозможно изменить профиль',
});
