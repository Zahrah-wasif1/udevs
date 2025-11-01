import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import axios from '../api/axios'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState('')
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const tokenParam = searchParams.get('token')
    if (tokenParam) {
      setToken(tokenParam)
    } else {
      setError('Reset token is missing')
    }
  }, [searchParams])

  async function submit(e) {
    e.preventDefault()
    setError('')
    
    if (!password || !confirmPassword) {
      setError('All fields are required')
      return
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!token) {
      setError('Reset token is required')
      return
    }

    setLoading(true)
    try {
      await axios.post('/auth/reset-password', { token, password })
      setSuccess(true)
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to reset password. Token may be expired.')
    }
    setLoading(false)
  }

  if (success) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5">
            <div className="card shadow-sm border-0">
              <div className="card-body p-5 text-center">
                <div className="mb-4">
                  <svg width="64" height="64" className="text-success" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 2.384 5.323a.75.75 0 0 0-1.06 1.061L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                  </svg>
                </div>
                <h3 className="mb-3">Password Reset Successful!</h3>
                <p className="text-muted mb-4">Your password has been reset successfully.</p>
                <p>Redirecting to login page...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Reset Password</h2>
              <p className="text-center text-muted mb-4">
                Enter your new password below.
              </p>
              
              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {error}
                  <button type="button" className="btn-close" onClick={() => setError('')}></button>
                </div>
              )}
              
              <form onSubmit={submit}>
                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Enter new password (min 6 characters)"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                
                <div className="mb-4">
                  <label className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 mb-3"
                  disabled={loading || !token}
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
                
                <div className="text-center">
                  <Link to="/login" className="text-decoration-none">Back to Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

