import {configureStore} from "@reduxjs/toolkit";
import productSlice from "../service/productSlice";
import userSlice from "../service/userSlice";
export const store = configureStore({
    reducer : {
        products : productSlice,
        user : userSlice,
    }
})