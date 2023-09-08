import { createSlice } from "@reduxjs/toolkit";
import { actionTypes } from "../actions/actionsTypes";

const initialState = {
    currentUser: ""
}

const currentUserSlice = createSlice({
    name: actionTypes.CURRENT_USER, //name of slice
    initialState: initialState,
    reducers: {
        updateUser: (state, action) => {
            state.currentUser = action.payload
        }
    }
})

export const { updateUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
