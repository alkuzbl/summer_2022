import { createAsyncThunk } from '@reduxjs/toolkit';

import { gitHubApi } from '../../api/gitHub-api';
import { setStatusUser } from '../reducers/user-reducer';
import { AppDispatch } from '../store';
import { UserType } from '../types';

export const getUser = createAsyncThunk<
  UserType,
  string,
  {
    rejectValue: string;
    dispatch: AppDispatch;
  }
>('user/getUser', async (login: string, { rejectWithValue, dispatch }) => {
  dispatch(setStatusUser('loading'));
  try {
    const response = await gitHubApi.fetchUserByLogin(login);

    return response.data;
  } catch (err: any) {
    const error = err.response
      ? err.response.data.message
      : `${err.message}, more details in the console`;

    return rejectWithValue(error);
  }
});
