import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Teachers from './pages/Teachers'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthProvider } from './contexts/AuthContext'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App/>}>
            <Route index element={<Home/>}/>
            <Route path="teachers" element={<Teachers/>}/>
            <Route path="about" element={<About/>}/>
            <Route path="contact" element={<Contact/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="signup" element={<Signup/>}/>
            <Route path="forgot-password" element={<ForgotPassword/>}/>
            <Route path="reset-password" element={<ResetPassword/>}/>
            <Route path="dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)
