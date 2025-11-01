import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export default function Navbar() {
  const { token, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div className="container-fluid px-3 px-md-4">
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <span className="me-2 fs-3">🏫</span>
          <span className="d-none d-sm-inline">School System</span>
          <span className="d-sm-none">School</span>
        </Link>
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/teachers">Teachers</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white d-none d-md-block" to="/contact">Contact</Link>
            </li>
            {token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-semibold" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item ms-2">
                  <button 
                    className="btn btn-outline-light px-4 py-2" 
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-primary px-4 py-2" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
