import React from 'react'
import { useFetchPeopleQuery } from '../../app/services/peopleApi'

export const PeopleManager = () => {
    const { data, isFetching } = useFetchPeopleQuery();

    if (isFetching) return <div>People loading ...</div>

    return <div>
        <h1>Fetch people here</h1>
        {
            data?.results?.map(people => {
                return <div key={people.name}>
                    <p>{people.name}</p>
                </div>
            })
        }
    </div>
}