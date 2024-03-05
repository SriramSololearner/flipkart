import { configureStore } from '@reduxjs/toolkit';
import Slider from './reducer/slice';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, Slider)


export const Store = configureStore({
    reducer: {
        Ecommerce: persistedReducer
    }
})


export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
export default persistStore(Store)  