import { Translation } from "../types";

export const modals = (): Translation['modals'] => ({
  createColumnModal: {
    addBtn: 'Добавить колонку',
    title: 'Заголовок колонки*',
    validateError: 'Пожалуйста, добавьте заголовок',
    createError: 'Невозможно создать колонку',
  },
  createTaskModal: {
    addBtn: 'Добавить задачу',
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
    edit: 'Редактировать задачу',
    participants: 'Участники',
    editError: 'Пожалуйста, добавьте заголовок',
  },
  newBoardModal: {
    create: 'Создать доску',
    name: 'Название доски*',
    description: 'Описание доски*',
    createError: 'Невозможно создать доску',
  },
  commonBtns: {
    cancel: 'отменить',
    save: 'сохранить',
  },
});
