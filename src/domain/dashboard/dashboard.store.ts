import { createSlice } from '@reduxjs/toolkit';

const dashboardStore = createSlice({
  name: 'DASHBOARD',
  reducers: {
    SET_USER: (state, action) => {
      state.user = action.payload;
    },
  },
  initialState: {
    user: {
      name: 'Gustavo',
    },
  },
});

export const { SET_USER } = dashboardStore.actions;
export default dashboardStore.reducer;
