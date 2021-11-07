import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import counterReducer from './counter'
import { apiSlice } from './starwars'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware, logger)
})