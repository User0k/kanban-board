export const registerPage = () => ({
  registerError: 'Unable to create account',
  existError: 'User with this email already exists',
  header: 'Create a new account',
  name: 'Name*',
  email: 'Email*',
  password: 'Password*',
  createBtn: 'Create account',
  validateError: {
    name: 'Should be from 1 to 32 characters long',
    email: 'Should be a valid email',
    password: 'Should be from 6 to 32 characters long',
  },
});
