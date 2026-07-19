# 🎓 CampusConnect - College Event Management Portal

A full-stack web application that allows students to discover, register for, and manage college events while providing administrators with complete event and announcement management capabilities.

## 🚀 Live Demo

Frontend: https://campus-connect-8nes.vercel.app/
Backend: https://campusconnect-backend-6at4.onrender.com/


---

# ✨ Features

## 👨‍🎓 Student Features

- Secure student registration and login
- JWT-based authentication
- Protected student dashboard
- Browse upcoming college events
- View event details:
  - Event banner
  - Description
  - Category
  - Date
  - Venue
  - Available seats
  - Registration deadline
- Register for events
- Cancel registrations
- View personal registered events
- View announcements


## 👨‍💼 Admin Features

- Secure admin authentication
- Admin dashboard
- View platform statistics
- Create events
- Upload event banners
- Update events
- Delete events
- Manage available seats
- Publish announcements
- Delete announcements


---

# 🛠️ Tech Stack

## Frontend

- React.js
- TypeScript
- Tailwind CSS
- React Router
- Axios
- React Hook Form
- Lucide React


## Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt


## Other Services

- MongoDB Atlas (Database)
- Cloudinary (Image Storage)
- Render (Backend Deployment)
- Vercel (Frontend Deployment)


---

# 🏗️ Project Architecture


```
CampusConnect

│
├── frontend
│
│   ├── components
│   ├── pages
│   ├── context
│   ├── services
│   └── App.tsx
│
│
└── backend
    │
    ├── controllers
    ├── models
    ├── routes
    ├── middleware
    ├── config
    ├── utils
    └── server.ts

```


---

# 🗄️ Database Schema


## User Collection

Stores student and admin information.

Fields:

```
_id
name
email
password
role
avatar
createdAt
updatedAt
```


Role values:

```
student
admin
```


---

## Event Collection

Stores all college events.

Fields:

```
_id
title
description
banner
category
venue
date
deadline
capacity
availableSeats
createdBy
createdAt
updatedAt
```


---

## Registration Collection

Stores event registrations.

Fields:

```
_id
student
event
status
registeredAt
createdAt
updatedAt
```


Status:

```
registered
cancelled
```


---

## Announcement Collection

Stores admin announcements.

Fields:

```
_id
title
description
createdAt
```


---

# 🔐 Authentication Flow

- User registers with email and password
- Password is encrypted using bcrypt
- JWT token is generated after login
- Token is stored using HTTP-only cookies
- Protected routes verify authentication middleware
- Admin routes additionally verify admin role


---

# ⚙️ Installation & Setup


## Clone Repository

```bash
git clone https://github.com/your-username/campus-connect.git

cd campus-connect
```


---

# Backend Setup


Navigate to backend:

```bash
cd backend
```


Install dependencies:

```bash
npm install
```


Create `.env` file:

```
PORT=5050

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key


CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


NODE_ENV=development
```


Run backend:

Development:

```bash
npm run dev
```


Production build:

```bash
npm run build

npm start
```


---

# Frontend Setup


Navigate to frontend:

```bash
cd frontend
```


Install dependencies:

```bash
npm install
```


Create `.env` file:

```
VITE_API_URL=http://localhost:5050/api
```


Run frontend:

```bash
npm run dev
```


---

# 🔑 Admin Credentials

Admin access is restricted.


```
Email:
admin@campusconnect.com


Password:
Admin@123
```


Only administrators can:

- Create events
- Edit events
- Delete events
- Publish announcements
- Access admin dashboard


---


# 🔮 Future Improvements

Possible future enhancements:

- Dark mode
- Event search and filters
- Calendar view
- Email confirmation after registration
- QR code based event entry
- Analytics dashboard
- Real-time notifications


---

# 👩‍💻 Developer

**Jiya Agrawal**

B.Tech Computer Science Engineering

GitHub:
https://github.com/jiyaaggarwal267-maker


---

# 📄 License

This project is developed for educational purposes.

