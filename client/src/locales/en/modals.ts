export const modals = () => ({
  createColumnModal: {
    addBtn: 'Add a column',
    title: 'Column title*',
    validateError: 'Please, specify a title',
    createError: 'Unable to create column',
  },
  createTaskModal: {
    addBtn: 'Add a task',
    title: 'Task title*',
    description: 'Task description',
    validateError: 'Please, specify a title',
    createError: 'Unable to create task',
  },
  deleteConfirmModal: {
    confirmation: 'Are you sure you want to delete the ',
    deleteBtn: 'Delete',
  },
  editBoardModal: {
    edit: 'Edit the board',
    name: 'Board name*',
    description: 'Board description*',
    updateError: 'Unable to update board',
  },
  editProfileModal: {
    edit: 'Edit profile',
    name: 'Name*',
    email: 'Email*',
    validateError: {
      name: 'Should be from 1 to 32 characters long',
      email: 'Should be a valid email',
    },
  },
  editTaskModal: {
    edit: 'Edit task',
    participants: 'Participants',
    editError: 'Please, specify a title',
  },
  newBoardModal: {
    create: 'Create a board',
    name: 'Board name*',
    description: 'Board description*',
    createError: 'Unable to create board',
  },
  commonBtns: {
    cancel: 'cancel',
    save: 'save',
  },
});
