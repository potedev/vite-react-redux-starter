import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

//Services
import { peopleApi } from './services/peopleApi'
import { authApi } from './services/authApi'

//Features
import counterReducer from '../features/counter/counterSlice'
import auth from '../features/auth/authSlice'

export const store = configureStore({
    reducer: {
        [peopleApi.reducerPath]: peopleApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        counter: counterReducer,
        auth,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(peopleApi.middleware, authApi.middleware, logger)
})