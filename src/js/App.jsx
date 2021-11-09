import React from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";

import '../css/App.css'

import { RequireAuth } from './features/auth/requireAuth'

import { LoginPage } from './features/login/loginPage';
import { UsersManager } from './features/users/usersManager';
import { RegisterPage } from './features/register/registerPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <UsersManager />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </div>
  )
}

export default App
