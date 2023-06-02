import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IColumn } from '../../models';

interface IState {
  columns: IColumn[];
}

const initialState: IState = {
  columns: [],
};

export const columnSetSlice = createSlice({
  name: 'columnSet',
  initialState,
  reducers: {
    updateColumnSet: (state, action: PayloadAction<IColumn[]>) => {
      state.columns = action.payload;
    },
  },
});

export const { updateColumnSet } = columnSetSlice.actions;
export default columnSetSlice.reducer;
