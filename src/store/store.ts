import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import dashboardReducer from '../../src/domain/dashboard/dashboard.store';
import productsReducer from '../../src/domain/dashboard/products/products.store';
import sideBarReducer from '@domain/dashboard/components/side-bar/side-bar.store';
import notificationsReducer from '@domain/dashboard/components/Notifications/notifications.store';
import userReducer from '../domain/auth/user/user.store';
import { createLogger } from 'redux-logger';
import { userListener } from '../domain/auth/user/user.store.middlewares';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    user: userReducer,
    products: productsReducer,
    sidebar: sideBarReducer,
    notifications: notificationsReducer,
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
