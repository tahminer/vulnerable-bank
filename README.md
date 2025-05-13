# 💸 Vulnerable Bank App (JWT Security Lab)

A deliberately insecure Node.js and Express-based banking web application built for educational purposes, especially for practicing web application security, JWT attacks, and hidden API discovery.

---

## 📌 Project Goals

This lab demonstrates how common vulnerabilities in JWT handling and API endpoint security can be exploited. It is designed to simulate a real-world banking environment where the following vulnerabilities can be explored:

- Weak secret key for JWT
- Insecure role-based access control
- Hidden/unlisted API endpoints
- Sensitive data exposure via misconfigured endpoints

---

## 🏗️ Tech Stack

- **Backend**: Node.js + Express  
- **Authentication**: JWT (JSON Web Token)  
- **Environment Config**: dotenv  
- **Tools for exploitation**: `ffuf`, `hashcat`, `jwt.io`, and custom Python scripts  

---

## 📁 Folder Structure Overview

```
project-root/
├── app/
│   ├── routes/         # Route definitions for dashboard, auth, etc.
│   ├── middleware/     # JWT token verification logic
│   └── app.js          # Main app setup and route integration
├── server.js           # App entry point and server bootstrap
├── .env                # Environment variables (e.g., PORT, JWT_SECRET)
├── package.json        # Dependencies and scripts
```

---

## 🚀 How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/vulnerable-bank.git
cd vulnerable-bank
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
JWT_SECRET=your_weak_secret
```

### 4. Start the Application

```bash
node server.js
```

App will be running at:  
**http://localhost:5000**

---

## 🧪 Lab Workflow (How to Attack)

1. **Fuzz for Hidden Login API**
   - Use `ffuf` to discover `/api/auth/login`
2. **Obtain JWT**
   - Login and extract the JWT from response
3. **Crack Weak Secret**
   - Use `hashcat` with mode `16500` on the JWT to find the signing key
4. **Forge Admin Token**
   - Modify token payload to change role to `"admin"` and re-sign
5. **Fuzz Admin Endpoints**
   - Use `ffuf` again with `Authorization: Bearer <forged_token>` to find sensitive endpoints

---

## 🔐 Secure Coding Tips

- Never use guessable JWT secrets (use long, random keys)  
- Always validate roles on the server (not just client JWT)  
- Hide and protect API routes using proper access control  
- Don’t expose sensitive endpoints without authentication  

---

## 📄 Report Includes

- Vulnerability Mapping  
- Exploitation Steps  
- Remediation Tips  
- Persian Documentation (for course/lab submission)  

---

## ⚠️ Disclaimer

This project is **intentionally insecure** and for educational purposes **only**. Do **not** deploy in production environments.

---

## 📬 Contact

Made for security learning and lab exercises.  
For feedback or questions, open an issue or contact the author.
