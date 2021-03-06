import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getRepositories } from '../middlewares/getRepositories';
import { getUser } from '../middlewares/getUser';
import { InitStateRepositoryType, StatusType } from '../types';

import { clearStore } from './user-reducer';

const initStateRepository: InitStateRepositoryType = {
  status: 'idle',
  repository: [],
  currentPage: 1,
  perPage: 4,
  error: null,
};

const repositorySlice = createSlice({
  name: 'repository',
  initialState: initStateRepository,
  reducers: {
    getStatusRepository: (state, action: PayloadAction<StatusType>) => {
      state.status = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload.currentPage;
    },
  },
  extraReducers: builder => {
    builder.addCase(getRepositories.fulfilled, (state, action) => {
      state.repository = action.payload;
      state.status = 'succeed';
    });
    builder.addCase(getRepositories.rejected, (state, action) => {
      state.error = action.payload as string;
      state.status = 'failed';
    });
    builder.addCase(getUser.pending, () => initStateRepository);
    builder.addCase(clearStore, () => initStateRepository);
  },
});

export const repositoryReducer = repositorySlice.reducer;

export const { getStatusRepository, setCurrentPage } = repositorySlice.actions;
