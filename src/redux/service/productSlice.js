import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getProduct} from "../../service/productService";

const productSlice = createSlice({
    name : 'product',
    initialState : {
        products: [],
        error: null,
        status: "idle"
    },
    reducers: {},
    extraReducers : (builder) => {
        builder
            .addCase(featchProduct.pending, (state) => {
                state.status = "loading";
        })
            .addCase(featchProduct.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(featchProduct.fulfilled, (state, action) => {

                state.status = "success";
                state.products = action.payload;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.status = "success";
                state.products.push(action.payload);
            })
    }
})

export const featchProduct = createAsyncThunk(
    "product/getAll",async ()=> {
        const res = await getProduct();
        const data = res.data;
        return data;
    }
);
export const addProduct = createAsyncThunk(
    "product/add",async (product)=> {
        const res = await addProduct(product);
        const data = res.data;
        return data;
    }
);
export default productSlice.reducer;