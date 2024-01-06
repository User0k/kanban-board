import { Translation } from "../types";

export const registerPage = (): Translation['registerPage'] => ({
  registerError: 'Невозможно создать аккаунт',
  existError: 'Пользователь с таким email уже зарегестрирован',
  header: 'Создать новый аккаунт',
  name: 'Имя*',
  email: 'Email*',
  password: 'Пароль*',
  createBtn: 'Создать аккаунт',
  validateError: {
    name: 'Должен содержать от 1 до 32 символов',
    email: 'Должен быть реальным email',
    password: 'Должен содержать от 6 до 32 символов',
  },
});
