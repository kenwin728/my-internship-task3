import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  datas: [],
  idToViewEditDelete: "",
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    getDatas: (state) => {
      const jsonString = localStorage.getItem("datas");
      if (jsonString) {
        state.datas = JSON.parse(jsonString);
      }
      console.log(localStorage.getItem("datas"));
    },
    addData: (state, { payload }) => {
      const data = {
        id: uuidv4(),
        name: payload.name,
        birthDate: payload.birthDate,
        gender: payload.gender,
        address: payload.address,
        city: payload.city,
        mobileNumber: payload.mobileNumber,
      };
      state.datas = [...state.datas, data];
      const jsonString = JSON.stringify(state.datas);
      localStorage.setItem("datas", jsonString);
      console.log(localStorage.getItem("datas"));
    },
    updateData: (state, { payload }) => {
      const updatedDatas = state.datas.map((data) =>
        data.id === state.idToViewEditDelete ? { ...data, ...payload } : data
      );
      state.datas = updatedDatas;
      const jsonString = JSON.stringify(state.datas);
      localStorage.setItem("datas", jsonString);
      console.log(localStorage.getItem("datas"));
    },
    setIdToViewEditDelete: (state, { payload }) => {
      state.idToViewEditDelete = payload;
      console.log(state.idToViewEditDelete);
    },
    deleteData: (state) => {
      state.datas = state.datas.filter(
        (data) => data.id !== state.idToViewEditDelete
      );
      const jsonString = JSON.stringify(state.datas);
      localStorage.setItem("datas", jsonString);
      console.log(localStorage.getItem("datas"));
    },
  },
});

export default dataSlice.reducer;
export const {
  getDatas,
  addData,
  updateData,
  setIdToViewEditDelete,
  deleteData,
} = dataSlice.actions;
