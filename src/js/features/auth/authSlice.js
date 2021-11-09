import { createSlice } from '@reduxjs/toolkit'
import { authApi } from '../../app/services/authApi'

const initialState = {
    user: null,
    accessToken: null,
    accessTokenExpiresIn: null,
    refreshToken: null,
    refreshTokenExpiresIn: null,
    isAuthenticated: false,
    isLoading: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => initialState,
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
                state.accessTokenExpiresIn = action.payload.accessTokenExpiresIn;
                state.refreshToken = action.payload.refreshToken;
                state.refreshTokenExpiresIn = action.payload.refreshTokenExpiresIn;
                state.isLoading = false
            })
            .addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
                console.log('rejected', action);
                state.isLoading = false
            });
    },
})

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions

export default authSlice.reducer