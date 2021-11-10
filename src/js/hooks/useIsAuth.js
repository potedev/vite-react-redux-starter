import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useFetchCurrentUserQuery } from '../app/services/authApi';

import { setCredentials } from '../features/auth/authSlice';
import { getLocalStorageItem } from '../utils/localStorage';

export const useIsAuth = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    useEffect(() => {
        const accessToken = getLocalStorageItem('accessToken')
        const xsrfToken = getLocalStorageItem('xsrfToken')

        if (accessToken && xsrfToken) {
            dispatch(setCredentials({ accessToken, xsrfToken }))
        }
    }, [])

    const { data, isFetching, refetch } = useFetchCurrentUserQuery()

    //Todo remove cach from get /auth/me
    if(auth.isAuthenticated && !auth.user) {
        refetch();
    }

    return { isFetching }
}
