# Online Teacher Transfer Management System (TTMS)

A comprehensive web-based system for managing teacher transfers across schools and woredas in West Gojjam Educational Office.

## Project Overview

This system was developed from a legacy PHP/MySQL project and modernized using:
- **Frontend:** Next.js 14 with React, TypeScript, and Tailwind CSS
- **Backend:** Express.js with Node.js and TypeScript
- **Database:** MongoDB

## Features

### User Roles
- **Admin:** System administration, user management
- **Zone MERSU Officer (ZMERSU):** Manage woredas, oversee woreda-to-woreda transfers
- **Woreda MERSU Officer (WMERSU):** Manage schools and teachers, handle school-to-school transfers
- **School Director:** Report vacant positions, manage school information
- **Teacher:** Submit transfer requests, view transfer results

### Core Features
- ✅ Teacher Management - Register and manage teacher information
- ✅ School Management - Manage schools and available positions
- ✅ Woreda Management - Organize educational zones
- ✅ Transfer Requests - Submit and track transfer applications
- ✅ User Management - Create and manage system users
- ✅ Role-Based Access Control - Secure access based on user roles
- ✅ Transfer History - Archive and track all transfers
- ✅ Report Generation - Generate transfer reports

## Technical Stack

### Frontend
```
- Next.js 14.2.3
- React 18.3.1
- TypeScript 5.3.3
- Tailwind CSS 3.4.1
- Axios for API calls
- Zustand for state management
- React Hook Form for forms
```

### Backend
```
- Express.js 4.18.2
- Node.js (TypeScript)
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
```

## Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- MongoDB (local or cloud instance)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB URI and JWT secret:
```
MONGODB_URI=mongodb://localhost:27017/ttms
JWT_SECRET=your-secret-key-here
PORT=5000
```

5. Start the backend server:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` from `.env.example`:
```bash
cp .env.example .env.local
```

4. Update `.env.local` if needed (default should work):
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

5. Start the frontend development server:
```bash
npm run dev
```

Application will run on `http://localhost:3000`

## Running Both Servers

From the root directory, run both servers concurrently:
```bash
npm run dev
```

This will start:
- Backend on `http://localhost:5000`
- Frontend on `http://localhost:3000`

## API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify token

### Teachers
- `GET /api/teachers` - Get all teachers
- `POST /api/teachers` - Create teacher (WMERSU/Admin)
- `PUT /api/teachers/:id` - Update teacher
- `DELETE /api/teachers/:id` - Delete teacher (Admin)

### Schools
- `GET /api/schools` - Get all schools
- `POST /api/schools` - Create school
- `PUT /api/schools/:id` - Update school
- `DELETE /api/schools/:id` - Delete school

### Woredas
- `GET /api/woredas` - Get all woredas
- `POST /api/woredas` - Create woreda (ZMERSU/Admin)
- `PUT /api/woredas/:id` - Update woreda
- `DELETE /api/woredas/:id` - Delete woreda

### Transfers
- `GET /api/transfers` - Get all transfers
- `POST /api/transfers` - Create transfer request
- `PUT /api/transfers/:id/approve` - Approve transfer (WMERSU/ZMERSU)
- `PUT /api/transfers/:id/reject` - Reject transfer

### Users (Admin)
- `GET /api/users` - Get all users
- `PUT /api/users/:id` - Update user
- `PUT /api/users/:id/status` - Activate/Deactivate user
- `DELETE /api/users/:id` - Delete user

## Project Structure

```
teacher-transfer-system/
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── login/
│   │       ├── page.tsx
│   │       ├── layout.tsx
│   │       └── globals.css
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── tsconfig.json
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Teacher.ts
│   │   │   ├── School.ts
│   │   │   ├── Woreda.ts
│   │   │   └── Transfer.ts
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── teacher.ts
│   │   │   ├── school.ts
│   │   │   ├── woreda.ts
│   │   │   ├── transfer.ts
│   │   │   └── user.ts
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── .gitignore
└── package.json
```

## Database Schema

### Users
- username (unique)
- email (unique)
- password (hashed)
- role (admin, zmersu, wmersu, teacher, director)
- status (active/inactive)

### Teachers
- firstName, lastName
- email, phone, idNumber (unique)
- qualifications, serviceYears
- maritalStatus, healthStatus
- currentSchool, currentWoreda
- bonusService

### Schools
- name, code (unique)
- woreda, classification
- teacherCapacity, currentTeacherCount
- availablePositions
- location, director

### Woredas
- name (unique), code (unique)
- zone, totalSchools, totalTeachers
- mersuOfficer

### Transfers
- teacher, transferType (school-to-school, woreda-to-woreda)
- currentLocation, requestedLocations
- reason, status (pending, approved, rejected, completed)
- serviceYearsAtTransfer, approvedBy, transferDate

## Transfer Logic

### Service Requirements
- **School-to-School Transfer:** Minimum 1 year of service
- **Woreda-to-Woreda Transfer:** Minimum 2 years of service

### Bonus Service Classification
1. Finote Selam town - No bonus
2. All woredas and towns (except Finote Selam) - 1 month per year
3. Remote areas - 2-5 months per year

### Transfer Priority
1. Service years (higher years first)
2. Marital status (married first if equal service)
3. Workplace classification (uncomfortable first)
4. Gender (female first if all else equal)

## Testing

### Backend API Testing
Use Postman or similar tools with the provided API endpoints.

Example Login:
```json
POST http://localhost:5000/api/auth/login
{
  "username": "admin",
  "password": "password123"
}
```

### Frontend Testing
- Open `http://localhost:3000` in browser
- Test login functionality
- Navigate through different role dashboards

## Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy to Vercel
```

### Backend (Heroku, Railway, etc.)
```bash
npm run build
# Deploy to your chosen platform
```

## Security Considerations

- All passwords are hashed using bcryptjs
- JWT tokens expire after 24 hours
- Role-based access control on all endpoints
- Input validation on all forms and API requests
- CORS configured for production environments

## Future Enhancements

- SMS notifications for transfer results
- Mobile app for teachers
- Advanced reporting and analytics
- Email notifications
- Support for multiple educational zones
- Integration with educational management systems
- Automated backup system
- System audit logs

## Contributors

This project was developed as part of a Bachelor of Science in Computer Science at Debre Markos University, Bure Campus.

## License

This project is confidential and for educational purposes only.

## Support

For issues or questions, please contact the development team or the West Gojjam Educational Office.

---

**Last Updated:** July 2024
