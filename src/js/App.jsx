import React from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";

//auth
import { RequireAuth } from './features/auth/requireAuth'
import { useIsAuth } from './hooks/useIsAuth'

//Public
import { LoginPage } from './features/login/LoginPage';
import { UsersManager } from './features/users/usersManager';
import { RegisterPage } from './features/register/RegisterPage';

//Protected
import { PeopleManager } from './features/people/PeopleManager';
import { StartshipsManager } from './features/starships/starshipsManageR';

import '../css/App.css'
import { Layout } from './features/layout/Layout';

function App() {

  const { isFetching } = useIsAuth();

  console.log('IS FETCHING USER', isFetching);

  if (isFetching) return <p>App is Loading</p>

  return (
    <div className="App">
      <Routes>
        <Route>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <UsersManager />
                </RequireAuth>
              }
            />
            <Route
              path="/people"
              element={
                <RequireAuth>
                  <PeopleManager />
                </RequireAuth>
              }
            />
            <Route
              path="/starships"
              element={
                <RequireAuth>
                  <StartshipsManager />
                </RequireAuth>
              }
            />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
