import React from 'react'
import {  Routes, Route } from 'react-router-dom'
import AdminLogin from './admin/adminLogin'
export default function Admin() {
  return (
    
        <Routes>
            <Route path="/admin" element={<AdminLogin />} />




        </Routes>
      

  )
}
