import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../models';

interface IState {
  isLoggedIn: boolean;
  currentUser: IUser | null;
}

const initialState: IState = {
  isLoggedIn: false,
  currentUser: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload;
    },
    resetAuth: () => initialState,
  },
});

export const { resetAuth, setIsLoggedIn, setUser } = authSlice.actions;
export default authSlice.reducer;
