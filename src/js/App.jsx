import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './store/counter'
import { useFetchPeopleQuery } from './store/starwars';
import logo from '../assets/logo.svg'
import '../css/App.css'

function App() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  // const [count, setCount] = useState(0)

  const { data = [], isFetching, } = useFetchPeopleQuery()

  console.log(data);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          {/* <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button> */}
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <span>{count}</span>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>

        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
        { isFetching && <span>loading</span>}
        <div>
          <p>Number of people fetched : {data.length}</p>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Birth year</th>
              </tr>
            </thead>
            <tbody>
              {
                data.results &&
                data.results.map((people) => (
                  <tr key={people.name}>
                    <td>{people.name}</td>
                    <td>{people.birth_year}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </header>
    </div>
  )
}

export default App
