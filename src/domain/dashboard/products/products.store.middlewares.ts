import { createListenerMiddleware } from '@reduxjs/toolkit';
import { ASYNC_SIGN_IN } from '@domain/auth/user/user.store';

export const productsListener = createListenerMiddleware();

productsListener.startListening({
  actionCreator: ASYNC_SIGN_IN.fulfilled,
  effect: action => {},
});
