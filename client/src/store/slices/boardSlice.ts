import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { imgMaximizer } from '../../utils/imgMaximizer';
import {
  AssignedUser,
  IColumn,
  IGroupedTasks,
  IUsersInTasks,
} from '../../models';

interface IState {
  bgImage: string;
  columns: IColumn[];
  tasks: IGroupedTasks;
  assignedUsers: IUsersInTasks;
}

interface IUserPayload {
  taskId: string;
  user: AssignedUser;
}

const initialState: IState = {
  bgImage: '',
  columns: [],
  tasks: {},
  assignedUsers: {},
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    updateImage: (state, action: PayloadAction<string>) => {
      state.bgImage = imgMaximizer(action.payload);
    },
    updateColumnSet: (state, action: PayloadAction<IColumn[]>) => {
      state.columns = action.payload;
    },
    updateTaskSet: (state, action: PayloadAction<IGroupedTasks>) => {
      state.tasks = action.payload;
    },
    updateAssignedSet: (state, action: PayloadAction<IUsersInTasks>) => {
      state.assignedUsers = action.payload;
    },
    addUserToTask: (state, action: PayloadAction<IUserPayload>) => {
      const { taskId, user } = action.payload;
      const users = state.assignedUsers[taskId];
      users ? users.push(user) : (state.assignedUsers[taskId] = [user]);
    },
    removeUserFromTask: (state, action: PayloadAction<IUserPayload>) => {
      const {
        taskId,
        user: { id },
      } = action.payload;

      const index = state.assignedUsers[taskId]?.findIndex(
        (user) => user.id === id
      );

      if (index !== undefined && index >= 0) {
        state.assignedUsers[taskId]?.splice(index, 1);
      }
    },
  },
});

export const {
  updateImage,
  updateColumnSet,
  updateTaskSet,
  updateAssignedSet,
  addUserToTask,
  removeUserFromTask,
} = boardSlice.actions;
export default boardSlice.reducer;
