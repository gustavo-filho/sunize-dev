import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import dashboardReducer from '../../src/domain/dashboard/dashboard.store';
import userReducer from '../domain/auth/user/user.store';
import { createLogger } from 'redux-logger';
import { userListener } from '../domain/auth/user/user.store.middlewares';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(createLogger())
      .prepend(userListener.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
