import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://swapi.dev/api/'
    }),
    endpoints(builder) {
        return {
            fetchPeople: builder.query({
                query(limit = 10) {
                    return `/people?limit=${limit}`;
                }
            })
        }
    }
})

export const { useFetchPeopleQuery } = apiSlice