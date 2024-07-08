import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDeleteModalOpen: false,
};

const deleteModalSlice = createSlice({
  name: "deleteModal",
  initialState,
  reducers: {
    openDeleteModal: (state) => {
      state.isDeleteModalOpen = true;
    },
    closeDeleteModal: (state) => {
      state.isDeleteModalOpen = false;
    },
  },
});

export default deleteModalSlice.reducer;
export const { openDeleteModal, closeDeleteModal } = deleteModalSlice.actions;
