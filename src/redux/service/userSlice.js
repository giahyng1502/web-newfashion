import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    name : '',
    avatar : '',
    email : '',
}
const userSlice = createSlice({
    name : 'user',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.name = action.payload.name;
            state.avatar = action.payload.avatar;
            state.email = action.payload.email;
        },
    }
})
export default userSlice.reducer;