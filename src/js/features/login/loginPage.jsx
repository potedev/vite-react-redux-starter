import React from 'react'
import { useLoginMutation } from '../../app/services/authApi'
import { useLocation, useNavigate } from 'react-router-dom'

export const LoginPage = () => {

    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const [login, { isLoading, isUpdating }] = useLoginMutation()

    const body = {
        email: 'banane.dan@gmail.com',
        password: 'derpderp'
    }


    console.log(isLoading);
    console.log(isUpdating);

    const handleSubmit = () => {
        login(body).then(() => navigate(from, { replace: true }))
    }

    return <button onClick={handleSubmit}>login</button>
}