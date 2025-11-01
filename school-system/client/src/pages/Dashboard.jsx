import React, { useEffect, useState, useContext } from 'react'
import axios from '../api/axios'
import { AuthContext } from '../contexts/AuthContext'

export default function Dashboard(){
  const [counts,setCounts] = useState({teachers:0,applied:0,accepted:0})
  const [teachers,setTeachers] = useState([])
  const [students,setStudents] = useState([])
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState('')
  const [showTeacherForm, setShowTeacherForm] = useState(false)
  const [editingTeacher, setEditingTeacher] = useState(null)
  const [teacherFormData, setTeacherFormData] = useState({name: '', subject: '', email: ''})
  const { token } = useContext(AuthContext)

  useEffect(()=>{
    async function fetchAll(){
      try {
        setLoading(true)
        const config = {headers:{'x-auth-token':token}}
        const t = await axios.get('/teachers')
        const s = await axios.get('/students',config)
        setTeachers(t.data)
        setStudents(s.data)
        const applied = s.data.filter(x=>x.status==='applied').length
        const accepted = s.data.filter(x=>x.status==='accepted').length
        setCounts({teachers:t.data.length,applied,accepted})
      } catch(err) {
        setError('Failed to load data')
      }
      setLoading(false)
    }
    if(token) fetchAll()
  },[token])

  async function changeStatus(id,newStatus){
    try {
      const config = {headers:{'x-auth-token':token}}
      await axios.put(`/students/${id}`,{status:newStatus},config)
      const s = await axios.get('/students',config)
      setStudents(s.data)
      setCounts(prev=>({ ...prev, applied: s.data.filter(x=>x.status==='applied').length, accepted: s.data.filter(x=>x.status==='accepted').length }))
    } catch(err) {
      setError('Failed to update student')
    }
  }

  async function deleteTeacher(id){
    try {
      const config = {headers:{'x-auth-token':token}}
      await axios.delete(`/teachers/${id}`,config)
      const t = await axios.get('/teachers')
      setTeachers(t.data)
      setCounts(prev=>({ ...prev, teachers: t.data.length }))
    } catch(err) {
      setError('Failed to delete teacher')
    }
  }

  async function deleteStudent(id){
    try {
      const config = {headers:{'x-auth-token':token}}
      await axios.delete(`/students/${id}`,config)
      const s = await axios.get('/students',config)
      setStudents(s.data)
      setCounts(prev=>({ ...prev, applied: s.data.filter(x=>x.status==='applied').length, accepted: s.data.filter(x=>x.status==='accepted').length }))
    } catch(err) {
      setError('Failed to delete student')
    }
  }

  function openTeacherForm(teacher = null) {
    if(teacher) {
      setEditingTeacher(teacher)
      setTeacherFormData({name: teacher.name, subject: teacher.subject, email: teacher.email})
    } else {
      setEditingTeacher(null)
      setTeacherFormData({name: '', subject: '', email: ''})
    }
    setShowTeacherForm(true)
  }

  async function submitTeacher(e) {
    e.preventDefault()
    try {
      const config = {headers:{'x-auth-token':token}}
      if(editingTeacher) {
        await axios.put(`/teachers/${editingTeacher._id}`, teacherFormData, config)
      } else {
        await axios.post('/teachers', teacherFormData, config)
      }
      const t = await axios.get('/teachers')
      setTeachers(t.data)
      setCounts(prev=>({ ...prev, teachers: t.data.length }))
      setShowTeacherForm(false)
      setTeacherFormData({name: '', subject: '', email: ''})
      setEditingTeacher(null)
    } catch(err) {
      setError('Failed to save teacher')
    }
  }

  if(loading) return <div className="container py-4"><div className="text-center">Loading...</div></div>
  
  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h2 className="mb-0">Admin Dashboard</h2>
        <button className="btn btn-primary px-4 py-2" onClick={() => openTeacherForm()}>+ Add Teacher</button>
      </div>
      {error && <div className="alert alert-warning alert-dismissible" role="alert">{error}<button type="button" className="btn-close" onClick={()=>setError('')}></button></div>}
      
      {/* Teacher Form Modal */}
      {showTeacherForm && (
        <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingTeacher ? 'Edit Teacher' : 'Add Teacher'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowTeacherForm(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={submitTeacher}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" value={teacherFormData.name} onChange={e => setTeacherFormData({...teacherFormData, name: e.target.value})} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Subject</label>
                    <input type="text" className="form-control" value={teacherFormData.subject} onChange={e => setTeacherFormData({...teacherFormData, subject: e.target.value})} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={teacherFormData.email} onChange={e => setTeacherFormData({...teacherFormData, email: e.target.value})} required />
                  </div>
                  <div className="d-flex gap-2 flex-wrap">
                    <button type="submit" className="btn btn-primary px-4 py-2">{editingTeacher ? 'Update' : 'Add'}</button>
                    <button type="button" className="btn btn-secondary px-4 py-2" onClick={() => setShowTeacherForm(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row mb-4">
        <div className="col-sm-4">
          <div className="p-3 border rounded">
            <h5>Teachers</h5>
            <h2>{counts.teachers}</h2>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="p-3 border rounded">
            <h5>Applied</h5>
            <h2>{counts.applied}</h2>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="p-3 border rounded">
            <h5>Accepted</h5>
            <h2>{counts.accepted}</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Teachers</h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Subject</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.length === 0 ? (
                      <tr><td colSpan="4" className="text-center text-muted py-3">No teachers yet</td></tr>
                    ) : (
                      teachers.map(t=>(
                        <tr key={t._id}>
                          <td>{t.name}</td>
                          <td>{t.subject}</td>
                          <td>{t.email}</td>
                          <td>
                            <button className="btn btn-sm btn-warning me-2 mb-1" onClick={() => openTeacherForm(t)}>Edit</button>
                            <button className="btn btn-sm btn-danger mb-1" onClick={() => deleteTeacher(t._id)}>Delete</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 mb-4">
          <div className="card">
            <div className="card-header bg-success text-white">
              <h4 className="mb-0">Students</h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.length === 0 ? (
                      <tr><td colSpan="4" className="text-center text-muted py-3">No students yet</td></tr>
                    ) : (
                      students.map(s=>(
                        <tr key={s._id}>
                          <td>{s.name}</td>
                          <td>{s.email}</td>
                          <td><span className={`badge ${s.status === 'accepted' ? 'bg-success' : s.status === 'rejected' ? 'bg-danger' : 'bg-warning'}`}>{s.status}</span></td>
                          <td>
                            <button className="btn btn-sm btn-success me-2 mb-1" onClick={()=>changeStatus(s._id,'accepted')}>Accept</button>
                            <button className="btn btn-sm btn-warning me-2 mb-1" onClick={()=>changeStatus(s._id,'rejected')}>Reject</button>
                            <button className="btn btn-sm btn-danger mb-1" onClick={() => deleteStudent(s._id)}>Delete</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
