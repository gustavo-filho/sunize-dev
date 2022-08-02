import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STORE_DOMAIN } from '../../../store/store.constants';
import { RootState } from '../../../store/store';
import { api } from '@shared/services/api';
import { toast } from 'react-toastify';

export const ASYNC_GET_PRODUCTS = createAsyncThunk(
  'PRODUCTS/GET_PRODUCTS',
  async ({ userId }: { userId: number }) => {
    const response = await api.get(`/users/${userId}/products`);
    return response.data;
  },
);

export const ASYNC_GET_CATEGORIES = createAsyncThunk(
  'PRODUCTS/GET_CATEGORIES',
  async () => {
    const response = await api.get(`/categories`);

    return response.data;
  },
);

export const ASYNC_GET_AFFILIATES = createAsyncThunk(
  'PRODUCTS/GET_AFFILIATES',
  async ({ userId, offset }: { userId: number; offset: number }) => {
    const response = await api.get(`/affiliates/${userId}/products`, {
      params: {
        page: offset,
        paginate: 6,
      },
    });

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

    builder.addCase(ASYNC_GET_CATEGORIES.fulfilled, (state, action) => {
      state.categories = action.payload.data;
    });

    builder.addCase(ASYNC_GET_AFFILIATES.fulfilled, (state, action) => {
      state.affiliatesProducts.data = action.payload.data;
      state.affiliatesProducts.totalPages = action.payload.totalPages;
    });

  },
  initialState: {
    data: [],
    categories: [],
    affiliatesProducts: {
      data: [],
      totalPages: 0,
      actualPage: 0,
    },
    pagesInfos: {
      totalPages: 0,
    },
    isLoading: false,
  },
});

export const productSelector = (state: RootState) => state.products;

export default productsReducer.reducer;
