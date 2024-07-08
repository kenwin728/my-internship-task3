import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isViewModalOpen: false,
};

const viewModalSlice = createSlice({
  name: "viewModal",
  initialState,
  reducers: {
    openViewModal: (state) => {
      state.isViewModalOpen = true;
    },
    closeViewModal: (state) => {
      state.isViewModalOpen = false;
    },
  },
});

export default viewModalSlice.reducer;
export const { openViewModal, closeViewModal } = viewModalSlice.actions;
