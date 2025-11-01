import React, { useEffect, useState } from 'react'
import axios from '../api/axios'

export default function Teachers() {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const res = await axios.get('/teachers')
        setTeachers(res.data)
      } catch (err) {
        console.error('Failed to load teachers')
      }
      setLoading(false)
    }
    fetchTeachers()
  }, [])

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary">Our Experienced Teachers</h1>
        <p className="lead text-muted">Meet our dedicated and qualified teaching faculty</p>
      </div>
      
      {teachers.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted fs-5">No teachers available at the moment.</p>
          <p className="text-muted">Please check back later.</p>
        </div>
      ) : (
        <div className="row">
          {teachers.map(teacher => (
            <div key={teacher._id} className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{width: '80px', height: '80px', fontSize: '2rem'}}>
                      👨‍🏫
                    </div>
                  </div>
                  <h5 className="card-title fw-bold">{teacher.name}</h5>
                  <p className="card-text">
                    <span className="badge bg-primary mb-2">{teacher.subject}</span>
                  </p>
                  <p className="card-text">
                    <i className="bi bi-envelope"></i> {' '}
                    <a href={`mailto:${teacher.email}`} className="text-decoration-none">{teacher.email}</a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

