import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '@shared/services/api';
import { API_ROUTES } from '@shared/services/api-routes.constants';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { RootState } from '../../../store/store';
import { STORE_DOMAIN } from '../../../store/store.constants';
import { UserAuthProps } from './user.types';

export const ASYNC_SIGN_IN = createAsyncThunk(
  'USER/SIGN_IN',
  async ({ email, password, access_token, code, by_pass }: UserAuthProps) => {
    const response = code
      ? await api
          .post(
            API_ROUTES.AUTH.SIGN_IN_TFA,
            {
              code,
              by_pass,
            },
            {
              headers: {
                'sunize-access-token': String(access_token),
              },
            },
          )
          .catch(err => {
            toast.error(err.response.data.message, {
              position: 'top-right',
              autoClose: 5000,
            });
            return err;
          })
      : await api
          .post(API_ROUTES.AUTH.SIGN_IN, {
            email,
            password,
          })
          .catch(err => {
            toast.error(err.response.data.message, {
              position: 'top-right',
              autoClose: 5000,
            });
            return err;
          });

    return response.data;
  },
);

export const ASYNC_RECOVERY_PASSWORD = createAsyncThunk(
  'USER/RECOVERY_PASSWORD',
  async ({ email }: { email: string }) => {
    const response = await api
      .post(API_ROUTES.AUTH.RECOVERY_PASSWORD, {
        email,
      })
      .then(res => {
        toast.success('Email enviado', {
          position: 'top-right',
          autoClose: 5000,
        });
        return res.data;
      })
      .catch(err => {
        toast.error(`Erro ao recuperar senha. ${err.response.data.message}`, {
          position: 'top-right',
          autoClose: 5000,
        });
        return err.data;
      });

    return response.data;
  },
);

const userReducer = createSlice({
  initialState: {
    data: {
      name: '',
      account_type: '',
      id: 0,
      access_token: '',
      photo: '',
    },
    loading: false,
    error: {},
    recoveryPassword: {
      loading: false,
    },
  },
  name: STORE_DOMAIN.USER,
  reducers: {
    INITIAL_LOGIN: state => {
      if (Cookies.get('@Sunize:user'))
        state.data = JSON.parse(Cookies.get('@Sunize:user') ?? '');
    },
    SIGN_OUT: state => {
      Cookies.set('@Sunize:user', '');
      state.data = userReducer.getInitialState().data;
    },
    UPDATE_PHOTO: state => {
      if (Cookies.get('@Sunize:photo')) {
        state.data = {
          ...state.data,
          photo: Cookies.get('@Sunize:photo') ?? '',
        };

        const oldUser = JSON.parse(Cookies.get('@Sunize:user') ?? '');
        if (oldUser) {
          oldUser.photo = state.data.photo;
          Cookies.set('@Sunize:user', JSON.stringify(oldUser));
        }
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(ASYNC_SIGN_IN.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(ASYNC_SIGN_IN.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(ASYNC_SIGN_IN.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.loading = false;
    });
    builder.addCase(ASYNC_RECOVERY_PASSWORD.rejected, (state, action) => {
      state.recoveryPassword.loading = false;
    });
    builder.addCase(ASYNC_RECOVERY_PASSWORD.fulfilled, (state, action) => {
      state.recoveryPassword.loading = false;
    });
    builder.addCase(ASYNC_RECOVERY_PASSWORD.pending, (state, action) => {
      state.recoveryPassword.loading = true;
    });
  },
});

export const { INITIAL_LOGIN, SIGN_OUT } = userReducer.actions;
export const userSelector = (state: RootState) => state.user;
export default userReducer.reducer;
