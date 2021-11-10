import { createSlice } from '@reduxjs/toolkit'
import { authApi } from '../../app/services/authApi'
import { setLocalStorageItem } from '../../utils/localStorage'

const initialState = {
    user: null,
    accessToken: null,
    accessTokenExpiresIn: null,
    refreshToken: null,
    refreshTokenExpiresIn: null,
    xsrfToken: null,
    isAuthenticated: false,
    isLoading: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => initialState,
        setCredentials: (state, action) => {
            console.log(action);
            state.accessToken = action.payload.accessToken
            state.xsrfToken = action.payload.xsrfToken
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(authApi.endpoints.login.matchPending, (state, action) => {
                console.log('pending', action);
                state.isLoading = true
            })
            .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
                console.log('fulfilled', action);
                state.isAuthenticated = true;
                state.accessToken = action.payload.accessToken;
                setLocalStorageItem(action.payload.accessToken, 'accessToken')
                state.accessTokenExpiresIn = action.payload.accessTokenExpiresIn;
                state.refreshToken = action.payload.refreshToken;
                state.refreshTokenExpiresIn = action.payload.refreshTokenExpiresIn;
                state.xsrfToken = action.payload.xsrfToken;
                setLocalStorageItem(action.payload.xsrfToken, 'xsrfToken')
                state.isLoading = false
            })
            .addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
                console.log('rejected', action);
                state.isLoading = false
            })
            .addMatcher(authApi.endpoints.fetchCurrentUser.matchPending, (state, action) => {
                console.log('pending fetching current user', action);
                state.isLoading = true
            })
            .addMatcher(authApi.endpoints.fetchCurrentUser.matchFulfilled, (state, action) => {
                console.log('fullfilled fetching current user', action);
                state.isAuthenticated = true;
                state.isLoading = false
                state.user = action.payload
            })
            .addMatcher(authApi.endpoints.fetchCurrentUser.matchRejected, (state, action) => {
                console.log('rejected fetching current user', action);
                state = initialState
            })
    },
})

// Action creators are generated for each case reducer function
export const { logout, setCredentials, setIsLoading } = authSlice.actions

export default authSlice.reducer