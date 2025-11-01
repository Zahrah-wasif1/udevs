# School Management System

A full-stack MERN application for managing school teachers and student applications with an admin dashboard.

## Features

### Public Features
- **Home Page** with teacher cards display
- **Student Application Form** for new enrollments
- **Responsive Design** for all screen sizes
- **Navigation Bar** with links to different sections
- **Footer** with contact information

### Admin Features
- **Login Authentication** (JWT-based)
- **Dashboard** with statistics overview
- **Teacher Management**: Add, Edit, Delete teachers
- **Student Management**: View, Accept, Reject, Delete students
- **Protected Routes** requiring authentication

## Technology Stack

### Frontend
- React 19
- React Router DOM
- Bootstrap 5
- Axios for API calls
- Vite for build tooling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to server directory:
```bash
cd school-system/server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/school-system
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ADMIN_EMAIL=admin@school.com
ADMIN_PASSWORD=admin123
```

4. Seed the admin user:
```bash
npm run seed
```

5. Start the server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
```bash
cd school-system/client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The client will run on `http://localhost:5173`

## Default Login Credentials

- **Email**: admin@school.com
- **Password**: admin123

## API Endpoints

### Public Endpoints
- `GET /api/teachers` - Get all teachers
- `POST /api/students` - Submit student application

### Protected Endpoints (Require JWT Token)
- `POST /api/auth/login` - Admin login
- `GET /api/teachers` - Get all teachers (admin view)
- `POST /api/teachers` - Add new teacher
- `PUT /api/teachers/:id` - Update teacher
- `DELETE /api/teachers/:id` - Delete teacher
- `GET /api/students` - Get all students
- `PUT /api/students/:id` - Update student status
- `DELETE /api/students/:id` - Delete student

## Project Structure

```
school-system/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   ├── pages/         # Page components
│   │   ├── api/          # API configuration
│   │   └── main.jsx      # Entry point
│   └── package.json
│
├── server/                # Node.js backend
│   ├── config/           # Database configuration
│   ├── middleware/       # Auth middleware
│   ├── models/          # Mongoose models
│   ├── routers/         # API routes
│   ├── seed/            # Database seeding
│   ├── server.js        # Entry point
│   └── package.json
│
└── README.md
```

## Features Implemented

✅ Login page with authentication
✅ Admin dashboard with statistics
✅ Teacher management (Add, Edit, Delete)
✅ Student management (Accept, Reject, Delete)
✅ Public home page with teacher cards
✅ Student application form
✅ Responsive design
✅ Navigation bar and footer
✅ Protected routes
✅ Error handling
✅ Loading states

## Contributing

This is a MERN stack development internship task. Feel free to fork and enhance!

## License

ISC

