// import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import {Home} from "./Pages/Home"
import {Registration} from "./Pages/Registration"
import {Navbar} from "./Pages/Navbar"
import{Login} from "./Pages/Login"
import { AuthProvider } from "./Pages/auth"
import { Logout } from './Pages/Logout'
import { Service} from "./Pages/Service"
import { Admin} from "./Pages/Admin"
import { Adminservices } from './Pages/Adminservices'
import { Adminusers } from './Pages/Adminusers'
import { EditUserForm} from "./Pages/EditUserForm"

const App = () => {
  return(
    <Router>
      <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/register" element={<Registration />}/> 
        <Route path="/login" element={<Login />}/> 
        <Route path="/logout" element={<Logout />}/> 
        <Route path="/service" element={<Service />}/> 
        <Route path="/admin" element={<Admin/>}>
          <Route path="users" element={<Adminusers/>}></Route>
          <Route path="services" element={<Adminservices/>}></Route>
          <Route path="/admin/users/:id/edit" element={<EditUserForm />} />
        </Route>
      </Routes> 
      </AuthProvider> 
    </Router>
  )
}

export default App
