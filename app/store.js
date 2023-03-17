import { configureStore } from '@reduxjs/toolkit';
import trendingReducer from "../features/trending/trendingSlice"


const store = configureStore({
  reducer: {

    trending : trendingReducer,

  }
});

export { store };

