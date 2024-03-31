import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./homeSlice";
export const store = configureStore({
    reducer:{
        home: homeSlice,
    },
})

// the store has been created
// this is the single source of truth