
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth_slice"

const store = configureStore({
    reducer: {
        auth: authReducer
    },
    devTools: true,
})



export default store;