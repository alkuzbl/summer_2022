import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { repositoryReducer } from './reducers/repository-reducer';
import { userReducer } from './reducers/user-reducer';

const rootReducer = combineReducers({
  user: userReducer,
  repository: repositoryReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
