import notificationsReducer from '@domain/dashboard/components/Notifications/notifications.store';
import sideBarReducer from '@domain/dashboard/components/side-bar/side-bar.store';
import videoClassReducer from '@domain/dashboard/products/video-class/video-class.store';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import dashboardReducer from '../../src/domain/dashboard/dashboard.store';
import productsReducer from '../../src/domain/dashboard/products/products.store';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    products: productsReducer,
    sidebar: sideBarReducer,
    notifications: notificationsReducer,
    videoClass: videoClassReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
