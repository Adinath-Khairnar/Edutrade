# 📚 EduTrade

**EduTrade** is a full-stack web application designed to streamline the buying and selling of second-hand educational resources such as books, notes, stationery, and university question papers. It helps students exchange academic materials affordably through a user-friendly and secure platform.

---

## 🚀 Features

- 🔐 User registration and login (Node.js + React + PHP)
- 📘 Book listings with advanced search and filters
- 📝 Upload and browse class notes and question papers
- 🖊️ List and explore stationery products
- 💬 Real-time chat between buyers and sellers (books & stationery)
- ⭐ Favorite/unfavorite items
- 🧾 Leave reviews and ratings for sellers
- 🧑‍💼 User profile with uploaded items, favorites, messages
- 🔁 Change password securely
- 📊 Search history tracking (for future personalization)

---

## 🛠️ Tech Stack

### Frontend
- **React.js** – UI & SPA framework
- **Tailwind CSS** – Utility-first styling
- **Framer Motion** – Smooth animations and transitions

### Backend
- **PHP** – Core API and business logic
- **Node.js** – Email verification and authentication system

### Database
- **MySQL** – Relational data management

---


------------------------------------------------------------------

⚙️ Setup Instructions
1️⃣ Backend (PHP + MySQL)
Open XAMPP Control Panel

Start Apache and MySQL

Open phpMyAdmin in your browser

Create a new database named:


edutrade
Import the provided edutrade.sql file

2️⃣ Frontend (React)

cd MARKV
npm install
npm run dev

3️⃣ Auth Server (Node.js)

cd auth-server
npm install
node index.js

✉️ Email Verification Setup
Open the .env file inside the auth-server directory

Add your Gmail address and an app-specific password:

EMAIL=your_email@gmail.com

PASS=your_app_password
⚠️ Make sure your Gmail account has 2-step verification enabled to generate an App Password.
EMAIL=your_email@gmail.com
PASS=your_app_password
