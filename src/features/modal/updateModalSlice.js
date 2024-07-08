import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUpdateModalOpen: false,
};

const updateModalSlice = createSlice({
  name: "updateModal",
  initialState,
  reducers: {
    openUpdateModal: (state) => {
      state.isUpdateModalOpen = true;
    },
    closeUpdateModal: (state) => {
      state.isUpdateModalOpen = false;
    },
  },
});

export default updateModalSlice.reducer;
export const { openUpdateModal, closeUpdateModal } = updateModalSlice.actions;
