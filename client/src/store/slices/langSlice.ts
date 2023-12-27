import { createSlice } from '@reduxjs/toolkit';
import { getLanguage } from '../../utils/getLanguage';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Language } from '../../models';

interface IState {
  language: Language;
}

const initialState: IState = {
  language: getLanguage(),
};

export const langSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = langSlice.actions;
export default langSlice.reducer;
