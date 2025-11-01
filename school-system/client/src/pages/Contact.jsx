import React, { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    console.log('Contact form submitted:', formData)
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="display-4 fw-bold text-primary">Get In Touch</h1>
          <p className="lead text-muted">We'd love to hear from you</p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center">
              <div className="display-4 mb-3">📍</div>
              <h4>Visit Us</h4>
              <p className="text-muted">
                123 Education Street<br />
                Learning City, LC 12345<br />
                United States
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center">
              <div className="display-4 mb-3">📞</div>
              <h4>Call Us</h4>
              <p className="text-muted">
                Phone: +1 (555) 123-4567<br />
                Fax: +1 (555) 123-4568
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center">
              <div className="display-4 mb-3">📧</div>
              <h4>Email Us</h4>
              <p className="text-muted">
                General: info@schoolsystem.com<br />
                Admissions: admissions@schoolsystem.com
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-lg-8 mx-auto">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-5">
              <h3 className="mb-4">Send Us a Message</h3>
              {submitted && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  Thank you! Your message has been sent successfully.
                  <button type="button" className="btn-close" onClick={() => setSubmitted(false)}></button>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Your Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Your Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Subject</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Message</label>
                  <textarea 
                    className="form-control" 
                    rows="5"
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-lg w-100 px-4 py-2">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <div className="bg-light p-4 rounded text-center">
            <h4 className="mb-3">Follow Us</h4>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <a href="#" className="btn btn-outline-primary px-4 py-2">Facebook</a>
              <a href="#" className="btn btn-outline-info px-4 py-2">Twitter</a>
              <a href="#" className="btn btn-outline-primary px-4 py-2">LinkedIn</a>
              <a href="#" className="btn btn-outline-danger px-4 py-2">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

