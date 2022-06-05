import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STORE_DOMAIN } from '../../../store/store.constants';
import { RootState } from '../../../store/store';
import { api } from '@shared/services/api';
import { API_ROUTES } from '@shared/services/api-routes.constants';
import { UserAuthProps } from './user.types';
import { toast } from 'react-toastify';

export const ASYNC_SIGN_IN = createAsyncThunk(
  'USER/SIGN_IN',
  async ({ email, password }: UserAuthProps) => {
    const response = await api
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
    },
    loading: false,
    error: {},
  },
  name: STORE_DOMAIN.USER,
  reducers: {},
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
  },
});

export const userSelector = (state: RootState) => state.user;
export default userReducer.reducer;
