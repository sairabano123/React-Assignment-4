import { createSlice } from "@reduxjs/toolkit";
import { actionTypes } from "../actions/actionsTypes";


const initialState = {
    "Abdul Samad": {
        "BTC": 0.5,
        "LTC": 2.3,
        "ETH": 5.1
    }
}

const userCoinsSlice = createSlice({
    name: actionTypes.USER_COINS, // The name of the slice
    initialState,
    reducers: {
        updateUserCoins: (state, action) => {
            const { user, currency } = action.payload;
            if (state[user]) {
                delete state[user][currency];
            }
        },
    },
});

export const { updateUserCoins } = userCoinsSlice.actions;
export default userCoinsSlice.reducer;