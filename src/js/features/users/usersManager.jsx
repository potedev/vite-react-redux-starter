import React from 'react'
import { useFetchCurrentUserQuery } from '../../app/services/authApi'

export const UsersManager = () => {

    const { data, isFetching } = useFetchCurrentUserQuery()

    if (isFetching) return <p>Loading</p>

    return <h1>Salut mon pote, {data?.username}</h1>
}