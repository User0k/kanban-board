export const modals = () => ({
  createColumnModal: {
    addBtn: 'Add a column',
    title: 'Column title*',
    validateError: 'Please, specify a title',
    createError: 'Unable to create column',
  },
  createTaskModal: {
    header: 'Add a task',
    title: 'Task title*',
    description: 'Task description',
    validateError: 'Please, specify a title',
    createError: 'Unable to create task',
  },
  deleteConfirmModal: {
    confirmation: 'Are you sure you want to delete the ',
    deleteBtn: 'Delete',
    tooltip: 'Delete',
  },
  editBoardModal: {
    edit: 'Edit the board',
    name: 'Board name*',
    description: 'Board description*',
    updateError: 'Unable to update board',
    updateBtn: 'Update',
    tooltip: 'Update board',
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
    editError: 'Unable to update task',
    header: 'Edit task',
    participants: 'Participants',
    title: 'Task title*',
    description: 'Task description',
    validateError: 'Please, specify a title',
    tooltip: 'Assign user',
  },
  newBoardModal: {
    header: 'Create a board',
    name: 'Board name*',
    description: 'Board description*',
    createError: 'Unable to create board',
    createBtn: 'Create',
  },
  commonBtns: {
    cancel: 'cancel',
    save: 'save',
  },
});
