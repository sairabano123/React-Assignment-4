import { configureStore } from "@reduxjs/toolkit";
import currentUserSlice from "./slices/currentUser"
import coinDataSlice from "./slices/globalCoins"
import userCoinsSlice from "./slices/userCoins"

const store = configureStore({
    reducer: {
        userReducer: currentUserSlice,
        globalCoinDataReducer: coinDataSlice,
        userCoinsReducer: userCoinsSlice,
    }
});

export default store;
