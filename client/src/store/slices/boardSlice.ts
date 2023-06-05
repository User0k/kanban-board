import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IColumn, IGroupedTasks } from '../../models';

interface IState {
  columns: IColumn[];
  tasks: IGroupedTasks;
}

const initialState: IState = {
  columns: [],
  tasks: {},
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
  },
});

export const { updateColumnSet, updateTaskSet } = boardSlice.actions;
export default boardSlice.reducer;
