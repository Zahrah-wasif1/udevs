import React, { createContext, useState } from 'react'
import axios from '../api/axios'
export const AuthContext = createContext()
export function AuthProvider({children}){
  const [token,setToken] = useState(localStorage.getItem('token') || null)
  const login = async (email,password) => {
    const res = await axios.post('/auth/login',{email,password})
    if(res.data.token) {
      const t = res.data.token
      setToken(t)
      localStorage.setItem('token',t)
    } else {
      throw new Error('No token received')
    }
  }
  const logout = () => {
    setToken(null)
    localStorage.removeItem('token')
  }
  return <AuthContext.Provider value={{token,login,logout}}>{children}</AuthContext.Provider>
}
