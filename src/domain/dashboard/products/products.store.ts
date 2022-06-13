import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STORE_DOMAIN } from '../../../store/store.constants';
import { RootState } from '../../../store/store';
import { api } from '@shared/services/api';
import { toast } from 'react-toastify';

export const ASYNC_GET_PRODUCTS = createAsyncThunk(
  'PRODUCTS/GET_PRODUCTS',
  async ({ userId }: { userId: number }) => {
    const response = await api.get(`users/${userId}/products-purcharsed`);

    return response.data;
  },
);

const productsReducer = createSlice({
  name: STORE_DOMAIN.PRODUCTS,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(ASYNC_GET_PRODUCTS.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(ASYNC_GET_PRODUCTS.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(ASYNC_GET_PRODUCTS.rejected, (state, action) => {
      state.isLoading = false;
      toast.error('Erro ao carregar produtos');
    });
  },
  initialState: {
    data: [],
    pagesInfos: {
      totalPages: 0,
      actualPage: 0,
    },
    isLoading: false,
  },
});

export const productSelector = (state: RootState) => state.products;

export default productsReducer.reducer;
