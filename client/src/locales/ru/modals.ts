import { Translation } from '../types';

export const modals = (): Translation['modals'] => ({
  createColumnModal: {
    addBtn: 'Добавить колонку',
    title: 'Заголовок колонки*',
    validateError: 'Пожалуйста, добавьте заголовок',
    createError: 'Невозможно создать колонку',
  },
  createTaskModal: {
    header: 'Добавить задачу',
    title: 'Заголовок задачи*',
    description: 'Описание задачи',
    validateError: 'Пожалуйста, добавьте заголовок',
    createError: 'Невозможно создать задачу',
  },
  deleteConfirmModal: {
    confirmation: 'Вы уверены, что хотите удалить ',
    deleteBtn: 'Удалить',
  },
  editBoardModal: {
    edit: 'Изменить доску',
    name: 'Название доски*',
    description: 'Описание доски*',
    updateError: 'Невозможно изменить доску',
    updateBtn: 'Изменить',
  },
  editProfileModal: {
    edit: 'Редактировать профиль',
    name: 'Имя*',
    email: 'Email*',
    validateError: {
      name: 'Должен содержать от 1 до 32 символов',
      email: 'Должен быть реальным email',
    },
  },
  editTaskModal: {
    editError: 'Невозможно изменить задачу',
    header: 'Редактировать задачу',
    participants: 'Участники',
    title: 'Заголовок задачи*',
    description: 'Описание задачи',
    validateError: 'Пожалуйста, добавьте заголовок',
  },
  newBoardModal: {
    header: 'Создать доску',
    name: 'Название доски*',
    description: 'Описание доски*',
    createError: 'Невозможно создать доску',
    createBtn: 'Создать',
  },
  commonBtns: {
    cancel: 'отменить',
    save: 'сохранить',
  },
});
