import {configureStore} from "@reduxjs/toolkit";
import productSlice from "../service/productSlice";
export const store = configureStore({
    reducer : {
        products : productSlice,
    }
})