import React, { useEffect,useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { UserAuth } from './Context/AppState'




export default function ProtectedAdminRoute({ children }) {
   
    const { currUser } = UserAuth() 

    if (!currUser) {
        return <Navigate to = '/' />
    }
    return children
}