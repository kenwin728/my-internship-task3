import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./features/data/dataSlice";
import createModalReducer from "./features/modal/createModalSlice";
import deleteModalReducer from "./features/modal/deleteModalSlice";
import updateModalReducer from "./features/modal/updateModalSlice";
import viewModalReducer from "./features/modal/viewModalSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    createModal: createModalReducer,
    deleteModal: deleteModalReducer,
    updateModal: updateModalReducer,
    viewModal: viewModalReducer,
  },
});
