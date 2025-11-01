import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../api/axios'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [resetToken, setResetToken] = useState('')

  async function submit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setResetToken('')
    
    if (!email) {
      setError('Email is required')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post('/auth/forgot-password', { email })
      setSuccess(response.data.msg || 'Reset link has been sent to your email')
      // In development, show the token (remove in production!)
      if (response.data.resetToken) {
        setResetToken(response.data.resetToken)
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to send reset link. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Forgot Password</h2>
              <p className="text-center text-muted mb-4">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              
              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {error}
                  <button type="button" className="btn-close" onClick={() => setError('')}></button>
                </div>
              )}
              
              {success && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  {success}
                  <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
                </div>
              )}
              
              {resetToken && (
                <div className="alert alert-info">
                  <strong>Development Mode:</strong> Reset token (for testing only):
                  <br />
                  <code className="d-block mt-2 p-2 bg-light rounded">{resetToken}</code>
                  <br />
                  <a href={`/reset-password?token=${resetToken}`} className="btn btn-sm btn-primary">
                    Use Reset Token
                  </a>
                </div>
              )}
              
              <form onSubmit={submit}>
                <div className="mb-4">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
                
                <div className="text-center">
                  <p className="mb-0">
                    Remember your password?{' '}
                    <Link to="/login" className="text-decoration-none">Login here</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

