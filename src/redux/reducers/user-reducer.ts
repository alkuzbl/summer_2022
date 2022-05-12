import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getUser } from '../middlewares/getUser';
import { InitStateUserType, StatusType, UserType } from '../types';

const initStateUser: InitStateUserType = {
  status: 'idle',
  user: {} as UserType,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initStateUser,
  reducers: {
    setStatusUser: (state, action: PayloadAction<StatusType>) => {
      state.status = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getUser.fulfilled, (state, action: PayloadAction<UserType>) => {
      state.status = 'succeed';
      state.user = action.payload;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.error = action.payload as string;
      state.status = 'failed';
      state.user = {} as UserType;
    });
  },
});

export const userReducer = userSlice.reducer;

export const { setStatusUser } = userSlice.actions;
