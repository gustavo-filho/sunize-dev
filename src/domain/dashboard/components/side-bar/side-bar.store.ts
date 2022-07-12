import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../../store/store';

const sideBarStore = createSlice({
  name: 'SideBar',
  reducers: {
    TOGGLE_SIDE_BAR: state => {
      state.isOpen = !state.isOpen;
    },
  },
  initialState: {
    isOpen: false,
  },
});

export const { TOGGLE_SIDE_BAR } = sideBarStore.actions;

export const sideBarSelector = (state: RootState) => state.sideBarStore;

export default sideBarStore.reducer;
