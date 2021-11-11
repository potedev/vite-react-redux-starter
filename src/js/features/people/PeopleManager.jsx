import React, { useState } from 'react'
import { useFetchPeopleQuery } from '../../app/services/peopleApi'

export const PeopleManager = () => {
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [limit, setLimit] = useState(10)
    const { data, isFetching } = useFetchPeopleQuery({ page, search });

    let nbPage;

    if (data) nbPage = Math.ceil(data.count / limit)

    console.log(search);

    return <div>
        <h1>Star wars character here</h1>
        <label>Search a character</label>
        <input type="text" onChange={(e) => setSearch(e.target.value)} />

        {isFetching ? <div style={{ marginTop: '20px' }}>Characters loading ...</div> :
            <div style={{ display: "flex", justifyContent: "center", marginTop: '35px' }}>
                {page != 1 && <button onClick={() => setPage(page - 1)}>{'<'}</button>}
                <div style={{ margin: "0 20px" }}>
                    {
                        data?.results?.map(people => {
                            return <div key={people.name}>
                                <p>{people.name}</p>
                            </div>
                        })
                    }
                </div>
                {nbPage != page && <button onClick={() => setPage(page + 1)}>{'>'}</button>}
            </div>
        }
    </div>
}