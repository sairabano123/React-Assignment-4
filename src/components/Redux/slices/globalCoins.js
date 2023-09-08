import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getCoinData from "../api";
import { actionTypes } from "../actions/actionsTypes";

export const fetchCoinData = createAsyncThunk(actionTypes.GLOBAL_COINS, async() => {
    try {
        const data = await getCoinData();
        return data;
    } catch (error) {
        console.error("Error fetching data1:", error.message);
        throw new Error("API request failed.");
    }
});

const coinDataSlice = createSlice({
    name: actionTypes.GLOBAL_COINS,
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCoinData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCoinData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchCoinData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default coinDataSlice.reducer;
