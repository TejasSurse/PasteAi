import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
const initialState = {
  pastes:localStorage.getItem("pastes")
  ? JSON.parse(localStorage.getItem("pastes"))
  : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes : (state, action) => {
     const paste = action.payload;
      state.pastes.push(paste);// it 
      // add condition to chekc paste already exist 
      // come in centralize sttore
      localStorage.setItem("pastes", JSON.stringify(state.pastes)); // Localstorage store 
      toast("Paste Created Successfully");
    },
    updateToPastes : (state, action) => {
      const paste = action.payload
      const index = state.pastes.findIndex((item) =>{
        item._id === paste._id
      });
      if(index >= 0) {
        state.pastes[index] = paste;

        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast("Paste Updated Successfully");
      }
    },
    resetAllPastes : (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast("All Paste Reset Successfully");

    },
    removeFromPastes : (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((item) => item._id === pasteId);
      if(index >= 0){
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast("Paste Deleted Successfully");
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer
