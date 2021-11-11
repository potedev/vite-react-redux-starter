import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useFetchCurrentUserQuery } from '../app/services/authApi';

import { setCredentials, setIsInitialized } from '../features/auth/authSlice';
import { getLocalStorageItem } from '../utils/localStorage';

export const useIsAuth = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    useEffect(() => {
        const accessToken = getLocalStorageItem('accessToken')
        const xsrfToken = getLocalStorageItem('xsrfToken')

        if (accessToken && xsrfToken) {
            dispatch(setCredentials({ accessToken, xsrfToken }))
        } else {
            dispatch(setIsInitialized())
        }
    }, [])

    const { error, refetch } = useFetchCurrentUserQuery()

    if (auth.isAuthenticated && !auth.user) {
        refetch();
    }

    if (error) {
        console.log('error in fetching user')
        dispatch(setIsInitialized())
    }
}
