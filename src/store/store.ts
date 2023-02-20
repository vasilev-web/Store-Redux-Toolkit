import { configureStore } from '@reduxjs/toolkit';
import basketSlice from './basketReducer';

const store = configureStore({
    reducer: {
        basket: basketSlice
    },
    devTools: true
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
