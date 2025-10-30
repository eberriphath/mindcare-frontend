# 🧠 MindCare — Client-Therapist Booking & Management System

![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?logo=flask&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

MindCare is a **full-stack web application** designed to connect **clients and therapists** for mental health session booking and management. The app offers **secure authentication**, **role-based dashboards**, and **session scheduling**, ensuring an efficient and intuitive user experience.

---

## 🚀 Tech Stack

###  Frontend
- ⚡ **Vite + React.js**
-  **Tailwind CSS**
-  **Context API** for authentication
-  **React Router** for navigation
-  **JWT Authentication**

### Backend
-  **Flask (Python)**
- **Flask-RESTful**, **Flask-JWT-Extended**, **Flask-Migrate**, **Flask-Bcrypt**
- **Flask-CORS** for API access
- **SQLite / PostgreSQL** as the database

---

##  MVP Features

### 1. Authentication & Roles
- Secure **JWT-based login/registration**
- Roles:
  - 🧍 Client
  - 👩‍⚕️ Therapist
  - 🧑‍💼 Admin

### 2. Session Booking
- Clients browse therapists and **book sessions**
- Therapists can **approve/reject** bookings
- Admin oversees **all users and bookings**

### 3. Dashboards
- **Client Dashboard** – session history & progress  
- **Therapist Dashboard** – manage appointments  
- **Admin Dashboard** – system overview  

### 4. Notifications & Progress Tracking
- Email or in-app **notifications** for booking updates  
- Clients track progress with their assigned therapists  

---

##  Folder Structure Overview

### Frontend (`mindcare-frontend/`)
```

src/
├── components/
│   ├── AdminDashboard.jsx
│   ├── ClientDashboard.jsx
│   ├── TherapistDashboard.jsx
│   ├── DashboardLayout.jsx
│   ├── Topbar.jsx
│   ├── Sidebar.jsx
│   ├── Navbar.jsx
│   ├── LogoutButton.jsx
│   └── ProtectedRoute.jsx
│
├── context/
│   └── AuthContext.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   └── login.jsx
│
├── App.jsx
├── main.jsx
├── App.css
├── index.css
└── mockData.js

```

### Backend (`mindcare-backend/`)
```

Mind_app/
├── routes/
│   ├── admin.py
│   ├── clients.py
│   ├── therapists.py
│   ├── session.py
│   ├── progress.py
│   ├── users.py
│   ├── center.py
│   └── notification.py
│
├── model.py
├── auth.py
├── app.py
├── **init**.py
├── migrations/
├── instance/
├── venv/
├── Pipfile
├── Pipfile.lock
└── requirements.txt

````

---

##  Setup Instructions

###  Backend Setup
1. Navigate to backend folder:
   ```bash
   cd mindcare-backend
````

2. Create and activate a virtual environment:

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```
4. Run migrations and start the server:

   ```bash
   flask db upgrade
   flask run
   ```
5. The backend will be available at:

   ```
   http://127.0.0.1:5000
   ```

---

###  Frontend Setup

1. Navigate to frontend folder:

   ```bash
   cd mindcare-frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start development server:

   ```bash
   npm run dev
   ```
4. Access the app at:

   ```
   http://localhost:5173
   ```

---

##  Environment Variables

### Backend `.env`

```
FLASK_APP=app.py
FLASK_ENV=development
JWT_SECRET_KEY=your_secret_key
DATABASE_URL=sqlite:///mindcare.db
```

### Frontend `.env`

```
VITE_API_URL=http://127.0.0.1:5000
```

---

##  Deployment

### 🔹 Frontend — Vercel

1. Push your frontend code to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/).
3. Import your `mindcare-frontend` repository.
4. Add environment variable:

   ```
   VITE_API_URL=https://mindcare-backend.onrender.com
   ```
5. Deploy — your frontend will be live instantly.

### 🔹 Backend — Render

1. Create a new Web Service on [Render](https://render.com/).
2. Connect your `mindcare-backend` GitHub repo.
3. Add environment variables:

   ```
   FLASK_ENV=production
   JWT_SECRET_KEY=your_secret_key
   DATABASE_URL=your_postgres_url
   ```
4. Set the **Start Command** to:

   ```bash
   gunicorn app:app
   ```
5. Deploy — your Flask API will go live.

---


##  Future Improvements

* 💬 Real-time client-therapist chat
* 📅 Integrated session calendar
* 📊 Advanced analytics and insights
* ☁️ Deployment on **Vercel + Render (production-ready)**

---

##  Contributing

Pull requests are welcome!
Please open an issue to discuss major feature additions or changes.


🌐 [GitHub Profile](https://github.com/eberriphath)


### 🪪 License

This project is licensed under the [MIT License](LICENSE).
