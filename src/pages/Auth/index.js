import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup  from './Signup'
import Login  from './Login'
import Forgot from './ForgotPassword'

export default function index() {
  return (
   <Routes>
    <Route path='signup' element={<Signup />} />
    <Route path='login' element={<Login />} />
    <Route path='forgot' element={<Forgot />} />
   </Routes>
  )
}
