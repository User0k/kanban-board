import { Translation } from "../types";

export const loginPage = (): Translation['loginPage'] => ({
  credentialsError: 'Email или пароль неверен',
  serverError: 'Сервер временно недоступен',
  email: 'Email*',
  password: 'Пароль*',
  logIn: 'Войти',
  validateError: {
    email: 'Должен быть реальным email',
    password: 'Должен содержать от 6 до 32 символов',
  },
});
