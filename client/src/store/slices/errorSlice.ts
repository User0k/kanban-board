import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IState {
  errorMessage: string | null;
}

const initialState: IState = {
  errorMessage: null,
};

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    clearError: (state) => {
      state.errorMessage = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { clearError, setError } = errorSlice.actions;
export default errorSlice.reducer;
