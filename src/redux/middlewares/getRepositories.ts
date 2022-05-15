import { createAsyncThunk } from '@reduxjs/toolkit';

import { gitHubApi } from '../../api/gitHub-api';
import { RequestGitHubType } from '../../api/types';
import { getStatusRepository } from '../reducers/repository-reducer';
import { AppDispatch } from '../store';
import { RepositoryType } from '../types';

export const getRepositories = createAsyncThunk<
  RepositoryType[],
  RequestGitHubType,
  { rejectValue: string; dispatch: AppDispatch }
>('repository/getRepositories', async (data, { rejectWithValue, dispatch }) => {
  dispatch(getStatusRepository('loading'));
  try {
    const response = await gitHubApi.getRepositories(data);

    return response.data;
  } catch (err: any) {
    const error = err.response
      ? err.response.data.message
      : `${err.message}, more details in the console`;

    return rejectWithValue(error);
  }
});
