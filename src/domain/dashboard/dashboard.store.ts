import { createSlice } from '@reduxjs/toolkit';

const dashboardStore = createSlice({
  name: 'DASHBOARD',
  reducers: {},
  initialState: {
    dashboard: null,
  },
});

// export const {} = dashboardStore.actions;
export default dashboardStore.reducer;
