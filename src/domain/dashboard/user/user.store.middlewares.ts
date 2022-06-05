import { createListenerMiddleware } from '@reduxjs/toolkit';
import { ASYNC_SIGN_IN } from './user.store';
import { updateJwt } from '@shared/services/api';
import Cookies from 'js-cookie';
import { addDays } from 'date-fns';
import { toast } from 'react-toastify';

export const userListener = createListenerMiddleware();

userListener.startListening({
  actionCreator: ASYNC_SIGN_IN.fulfilled,
  effect: action => {
    toast.success('Autenticado com sucesso', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    const { payload } = action;
    const user = payload.data;

    const photo = user?.photo ?? '';

    updateJwt(user.access_token);

    Cookies.set('@Sunize:user', JSON.stringify(user), {
      expires: addDays(new Date(), 3),
      secure: process.env.NODE_ENV === 'production',
    });
    Cookies.set('@Sunize:photo', photo, {
      expires: addDays(new Date(), 3),
      secure: process.env.NODE_ENV === 'production',
    });
    Cookies.set('@Sunize:is_admin', user.account_type, {
      expires: addDays(new Date(), 3),
      secure: process.env.NODE_ENV === 'production',
    });
  },
});
