import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { kEY, URL } from "@env"
import axios from "axios"

const BASE_URL = URL
const API_KEY = kEY

export const getTrending = createAsyncThunk("trending/getTrending",async ()=>{
    console.log('yes');
    try {
        const res = await axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
         console.log(res.data.results);
        return res.data.results
    } catch (error) {
        throw new Error(error.message)
    }
});



const trendingSlice = createSlice({
    name :"trending",
    initialState : { 
        Alltrending: [],
        loading: false,
} ,
reducers :{},

extraReducers: (builder) => {
    builder
        .addCase(getTrending.pending, (state) => {
            state.loading = true;
            console.log("pending", state.loading);
        })
        .addCase(getTrending.fulfilled, (state, { payload }) => {
            state.Alltrending = payload;
            state.loading = false;
        })
        .addCase(getTrending.rejected, (state) => {
            console.log("response rejected");
        });
},
});

  export default trendingSlice.reducer
