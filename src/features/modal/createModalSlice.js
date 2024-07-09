import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCreateModalOpen: false,
};

const createModalSlice = createSlice({
  name: "createModal",
  initialState,
  reducers: {
    openCreateModal: (state) => {
      state.isCreateModalOpen = true;
    },
    closeCreateModal: (state) => {
      state.isCreateModalOpen = false;
    },
  },
});

export default createModalSlice.reducer;
export const { openCreateModal, closeCreateModal } = createModalSlice.actions;
