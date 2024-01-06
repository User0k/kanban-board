import { Translation } from '../types';

export const task = (): Translation['task'] => ({
  unassignUser: 'Убрать из задачи',
  edit: 'Редактировать задачу',
  element: 'задачу',
  deleteError: 'Невозможно удалить задачу',
});
