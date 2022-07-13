import { createSlice } from '@reduxjs/toolkit';

const adminStore = createSlice({
  name: 'ADMIN',
  reducers: {},
  initialState: {
    dashboard: null,
  },
});

export default adminStore.reducer;
