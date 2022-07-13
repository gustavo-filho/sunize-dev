import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../../store/store';
import { api } from '@shared/services/api';

export const ASYNC_GET_NOTIFICATIONS = createAsyncThunk(
  'NOTIFICATIONS/GET',
  async ({ userId }: { userId: number }) => {
    const { data } = await api.get(`/user/notifications/${userId}`);
    return data;
  },
);

const notificationsStore = createSlice({
  name: 'NOTIFICATIONS',
  reducers: {},
  initialState: {
    isLoading: false,
    data: {
      affiliates: [],
      coProduction: [],
    },
  },
  extraReducers: builder => {
    builder.addCase(ASYNC_GET_NOTIFICATIONS.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(ASYNC_GET_NOTIFICATIONS.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(ASYNC_GET_NOTIFICATIONS.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const notificationsSelector = (state: RootState) =>
  state.notifications.data;

export default notificationsStore.reducer;
