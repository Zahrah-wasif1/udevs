import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../api/axios'

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitError('')
    setSubmitSuccess(false)
    try {
      await axios.post('/students', formData)
      setSubmitSuccess(true)
      setFormData({ name: '', email: '' })
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (err) {
      setSubmitError('Failed to submit application. Please try again.')
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h1 className="display-3 fw-bold mb-4 text-white">Welcome to Our School</h1>
              <p className="lead mb-4 text-white" style={{fontSize: '1.25rem', lineHeight: '1.8', fontWeight: '400'}}>
                Empowering students through quality education and dedicated teachers. 
                Join us in shaping the leaders of tomorrow.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/teachers" className="btn btn-light btn-lg px-4 py-2">View Our Teachers</Link>
                <Link to="/about" className="btn btn-outline-light btn-lg px-4 py-2">Learn More</Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="bg-white text-dark p-4 rounded shadow-lg">
                <h2 className="text-center mb-4 text-primary">Student Application</h2>
                {submitSuccess && (
                  <div className="alert alert-success alert-dismissible fade show">
                    Application submitted successfully! We'll contact you soon.
                    <button type="button" className="btn-close" onClick={() => setSubmitSuccess(false)}></button>
                  </div>
                )}
                {submitError && (
                  <div className="alert alert-danger alert-dismissible fade show">
                    {submitError}
                    <button type="button" className="btn-close" onClick={() => setSubmitError('')}></button>
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Your Full Name</label>
                    <input 
                      type="text" 
                      className="form-control form-control-lg" 
                      placeholder="Enter your name" 
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Your Email</label>
                    <input 
                      type="email" 
                      className="form-control form-control-lg" 
                      placeholder="Enter your email" 
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      required 
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg w-100 px-4 py-2">
                    Apply Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Features Section */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center mb-5">
              <h2 className="display-5 fw-bold">Why Choose Our School?</h2>
              <p className="lead text-muted">Excellence in education meets innovation</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="text-center p-4">
                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                  <span style={{fontSize: '2.5rem'}}>📚</span>
                </div>
                <h4>Quality Education</h4>
                <p className="text-muted">
                  Comprehensive curriculum designed for real-world success and career readiness
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="text-center p-4">
                <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                  <span style={{fontSize: '2.5rem'}}>👥</span>
                </div>
                <h4>Expert Faculty</h4>
                <p className="text-muted">
                  Experienced and dedicated teachers committed to your success
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="text-center p-4">
                <div className="bg-info text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                  <span style={{fontSize: '2.5rem'}}>🎯</span>
                </div>
                <h4>Career Focused</h4>
                <p className="text-muted">
                  Programs designed to prepare you for future opportunities
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="display-6 fw-bold mb-4">Ready to Start Your Journey?</h2>
              <p className="lead text-muted mb-4">
                Join hundreds of successful students who chose our school for their education
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <Link to="/contact" className="btn btn-primary btn-lg px-4 py-2">Contact Us</Link>
                <Link to="/teachers" className="btn btn-outline-primary btn-lg px-4 py-2">View Teachers</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
