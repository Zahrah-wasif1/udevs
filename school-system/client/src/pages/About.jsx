import React from 'react'

export default function About() {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-12 mb-5">
          <h1 className="display-4 fw-bold text-center mb-4">About Our School</h1>
          <p className="lead text-center text-muted">Excellence in Education Since Day One</p>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-lg-6 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h3 className="card-title text-primary mb-4">Our Mission</h3>
              <p className="card-text">
                To provide quality education that nurtures the intellectual, social, and emotional growth 
                of our students, preparing them to be responsible citizens and future leaders.
              </p>
              <p className="card-text">
                We believe in fostering a learning environment that encourages critical thinking, 
                creativity, and collaboration among students.
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-6 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h3 className="card-title text-success mb-4">Our Vision</h3>
              <p className="card-text">
                To be a leading educational institution recognized for academic excellence, 
                innovative teaching methods, and holistic development of students.
              </p>
              <p className="card-text">
                We envision a school where every student reaches their full potential and 
                contributes meaningfully to society.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-12">
          <h2 className="text-center mb-4">Why Choose Us?</h2>
        </div>
        <div className="col-lg-4 col-md-6 mb-3">
          <div className="text-center p-4">
            <div className="display-1 mb-3">📚</div>
            <h4>Quality Education</h4>
            <p className="text-muted">Comprehensive curriculum designed for real-world success</p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 mb-3">
          <div className="text-center p-4">
            <div className="display-1 mb-3">👥</div>
            <h4>Expert Faculty</h4>
            <p className="text-muted">Experienced teachers dedicated to student success</p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 mb-3">
          <div className="text-center p-4">
            <div className="display-1 mb-3">🎯</div>
            <h4>Career Focused</h4>
            <p className="text-muted">Prepare for future opportunities and challenges</p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 mb-3">
          <div className="text-center p-4">
            <div className="display-1 mb-3">💡</div>
            <h4>Innovation</h4>
            <p className="text-muted">Modern teaching methods and technology integration</p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 mb-3">
          <div className="text-center p-4">
            <div className="display-1 mb-3">🤝</div>
            <h4>Individual Attention</h4>
            <p className="text-muted">Personalized learning for every student</p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 mb-3">
          <div className="text-center p-4">
            <div className="display-1 mb-3">🌍</div>
            <h4>Global Perspective</h4>
            <p className="text-muted">Diverse and inclusive community</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="bg-light p-5 rounded">
            <h3 className="text-center mb-4">Our Commitment</h3>
            <p className="text-center lead">
              We are committed to providing an exceptional educational experience that equips 
              students with the knowledge, skills, and values they need to thrive in an 
              ever-changing world. Join us in shaping the leaders of tomorrow.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

