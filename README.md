# Simple Banking System

## 🚀 Overview
This project is a **Simple Banking System** built as part of the **Full Stack Developer Internship Assignment** for **Enpointe.io**.  
It follows the **MVC Architecture**, uses **Node.js (Express) + React.js**, and integrates **MySQL** as the database.

---

## 🛠️ Tech Stack
| Layer        | Technology Used |
|-------------|------------------|
| Frontend     | React.js |
| Backend      | Node.js (Express.js) |
| Database     | MySQL |
| Authentication | JWT-based Access Token |
| Hosting | Render (Backend) + Vercel (Frontend) |

---

## 📌 Assignment Requirements (Mapped with Implementation)

### ✔ 1. Database Setup
- Database Name: `bank`
- Tables:
  - `users` → Stores Banker & Customer details  
  - `accounts` → Stores customer balance & transactions  

### ✔ 2. Customer Login
- Email & password-based login  
- On success → **36-char access token generated & stored**  
- Token is sent as **Authorization Header** for secure API requests  

### ✔ 3. Customer Transaction Page
- View transaction history  
- Deposit & Withdraw buttons with **modal popup**  
- Shows **current balance**  
- Validations:
  - Prevents negative input  
  - Prevents withdrawal beyond balance  
  - Confirmation popup before submission  
  - Success / failure alert messages  

### ✔ 4. Banker Login
- Separate login page for bankers  
- Banker dashboard:
  - View all customers  
  - View total balance & customer count  
  - Click on any customer → See their transaction history  

---

## 📂 Project Structure (MVC Based)

```
backend/
├── src/
│   ├── config/db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── customerController.js
│   │   └── bankerController.js
│   ├── middleware/authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Account.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bankerRoutes.js
|   |  └── customerRoutes.js
│   └── app.js
|   └── server.js
|   
└── package.json

frontend/
├── src/
│   ├── api/
│   │   ├── authApi.js
│   │   ├── bankerApi.js
│   │   └── customerApi.js
│   ├── components/
|   |   ├── Layout.jsx
│   │   ├── Modal.jsx
│   │   ├── TransactionTable.jsx
│   └── pages/
│       ├── BankerLogin.jsx
│       ├── BankerAccounts.jsx
|       ├── BankerUserTransaction.jsx
│       ├── CustomerLogin.jsx
│       ├── CustomerTransactions.jsx
│       └── RegisterCustomer.jsx
└── main.jsx
└── App.jsx
└── index.css
└── app.css
```

---

## 🗄️ Database Schema (MySQL)

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('CUSTOMER', 'BANKER') NOT NULL,
  access_token VARCHAR(255)
);

CREATE TABLE accounts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  balance DECIMAL(10,2) DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);
```

## 🧪 Sample Test Users (Insert in MySQL)

```sql
INSERT INTO users (name, email, password_hash, role) VALUES
('Main Banker', 'banker1@bank.com', '<hashed_password>', 'BANKER'),
('test', 'test@bank.com', '<hashed_password>', 'CUSTOMER');
```

---

---

## 🔐 Authentication Flow
1. User logs in → Server verifies credentials  
2. JWT token generated → Sent to frontend  
3. Token is stored in `localStorage`  
4. API requests include:
   ```
   Authorization: Bearer <token>
   ```
5. Protected routes validated using middleware

---

## 🚀 Setup Instructions

Follow the steps below to run the project locally and deploy to production.

---

## 📦 1️⃣ Clone the Repository

```bash
git clone https://github.com/JadhaoR181/Simple-Banking-System.git
cd simple-banking-system
```

---

## 🛠️ 2️⃣ Backend Setup (`/backend`)

### 📌 Install Dependencies

```bash
cd backend
npm install
```

### 📌 Create `.env` File

Create a `.env` file inside the `backend` folder with the following variables:

```env
PORT=5000
DB_HOST=your-db-host
DB_USER=your-db-username
DB_PASS=your-db-password
DB_NAME=your-db-name
DB_PORT=your-db-port
JWT_SECRET=your-secret-key
```

### 📌 Start Backend (Development)

```bash
npm run dev
```

### 📌 Start Backend (Production)

```bash
npm start
```

---

## 🗄️ 3️⃣ Database Setup (MySQL)

Run the following SQL queries to create the required tables:

```sql
CREATE DATABASE bank;

USE bank;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password_hash VARCHAR(255),
  role ENUM('CUSTOMER', 'BANKER') DEFAULT 'CUSTOMER',
  access_token VARCHAR(255)
);

CREATE TABLE accounts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  balance DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

### 👨‍💼 Insert Banker Manually (Admin Controlled)

```sql
INSERT INTO users (name, email, password_hash, role) VALUES (
  'Banker One',
  'banker1@bank.com',
  '$2b$10$abcHashedPasswordHereXYZ123', -- use bcrypt hash
  'BANKER'
);
```

> Replace the sample `password_hash` with a real bcrypt-hashed password.

---

## 💻 4️⃣ Frontend Setup (`/frontend`)

```bash
cd ../frontend
npm install
npm run dev   # Local development
npm run build # Production build
```

### 📌 Create `.env` File in Frontend

Create a `.env` file in the `frontend` folder:

```env
VITE_API_URL=https://your-backend-url.com/api
```

---

## 🌐 5️⃣ Deploying

### 🔷 Backend – Render

1. Push the `backend` code to GitHub.  
2. Go to https://render.com  
3. Click **Create → Web Service** and select your backend repository.  
4. Set **Build Command**:
```bash
npm install
```
5. Set **Start Command**:
```bash
npm start
```
6. Add all `.env` variables in the Render dashboard.  
7. Deploy 🚀

- Backend (Render): [https://simple-banking-system-backend-jdkp.onrender.com](https://simple-banking-system-backend-jdkp.onrender.com)

### 🔷 Frontend – Vercel

1. Push the `frontend` code to GitHub.  
2. Go to https://vercel.com  
3. Click **New Project** and select your frontend repository.  
4. Add environment variable:
```env
VITE_API_URL=https://your-render-backend-url.com/api
```
5. Deploy 🚀

- Frontend (Vercel): [https://react-test-case-generator-app.vercel.app](https://simple-banking-system-teal.vercel.app)
---

## 📌 How to Test API (Postman)
### Login (Customer/Banker)
```
POST /api/auth/login
{
  "email": "example@bank.com",
  "password": "example@123"
}
```
**Response**
```json
{
  "token": "generated_token",
  "role": "CUSTOMER",
  "name": "John Doe"
}
```

---


## 🎯 Final Output Screens
- Login Screens (Customer & Banker)
- Customer Dashboard
- Deposit / Withdraw Modal
- Banker Dashboard with Stats
- Transaction History Table (Paginated)

---
## 📝 Note – Banker Login and Customer Login difference

In this system, customer login and registration are fully implemented with access token authentication.
However, banker accounts are not created via the frontend. Instead, banker credentials are manually inserted into the database because bankers are treated as trusted administrative users, similar to real-world banking systems where employees are added internally and not allowed to self-register.

- This ensures:
  - Only authorized bankers can access customer transaction data.
  - No public registration for banker accounts.
  - Realistic security flow: customers sign up, bankers are assigned.

## 🧠 Learning Outcomes
✔ MVC Architecture  
✔ REST API Development  
✔ React State Management  
✔ MySQL Integration  
✔ Authentication & Authorization  
✔ Deployment on Render & Vercel  

---

## 📌 Contact
**Ravindra Jadhav**  
📧 Email: jadhaor181@gmail.com  
🌐 Portfolio: [https://ravindra-portfolio-vite.vercel.app]( https://ravindra-portfolio-vite.vercel.app/)  
💼 LinkedIn: [linkedin.com/in/ravindrajadhav08](https://www.linkedin.com/in/ravindrajadhav08/)


---

💡 _Feel free to fork this repo & improve it. Contributions are welcome!_

---  


