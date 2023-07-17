import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IColumn, IGroupedTasks, IUsersInTasks } from '../../models';

interface IState {
  columns: IColumn[];
  tasks: IGroupedTasks;
  assignedUsers: IUsersInTasks;
}

const initialState: IState = {
  columns: [],
  tasks: {},
  assignedUsers: {},
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    updateColumnSet: (state, action: PayloadAction<IColumn[]>) => {
      state.columns = action.payload;
    },
    updateTaskSet: (state, action: PayloadAction<IGroupedTasks>) => {
      state.tasks = action.payload;
    },
    updateAssignedSet: (state, action: PayloadAction<IUsersInTasks>) => {
      state.assignedUsers = action.payload;
    },
  },
});

export const { updateColumnSet, updateTaskSet, updateAssignedSet } =
  boardSlice.actions;
export default boardSlice.reducer;
