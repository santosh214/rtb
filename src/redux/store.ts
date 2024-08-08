import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/users";

export const store = configureStore({
    reducer: {
        list: userReducer,
        // more reducers...
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;