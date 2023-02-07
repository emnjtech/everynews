import React from 'react'

import { Navigate } from 'react-router-dom'
import { UserAuth } from './Context/AppState' 


export default function ProtectedRouteSignIn({ children }) {
    const { currUser } = UserAuth()

    if (currUser) {
        return <Navigate to="/" />
    }
    return children
}