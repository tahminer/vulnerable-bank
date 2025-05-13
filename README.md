# 💸 Vulnerable Bank App 

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
├── Dockerfile
├── docker-compose.yml
├── package.json        # Dependencies and scripts
```

---

## 🚀 How to Run the Project
Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/vulnerable-bank.git
   cd vulnerable-bank
   ```
### 🐳 Option 1: Using Docker (Recommended)

> 🔸 If you're on **Windows**, first open **Docker Desktop**.

Then run:

```bash
docker-compose up --build
```

The application will be available at:  
**http://localhost:5000**

---

### 🖥️ Option 2: Running Locally Without Docker

1. Make sure you have **Node.js** and **npm** installed
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and set the following:
   ```
   PORT=5000
   JWT_SECRET=your_weak_secret_key
   ```
4. Start the app:
   ```bash
   node server.js
   ```

Then visit:  
http://localhost:PORT

---

## 🧪 Lab Workflow (How to Attack)

1. **Obtain JWT**  
   - Use Burp's repeater or proxy to login and capture the **JWT token** from the response

2. **Crack Weak Secret**  
   - Use `hashcat` with mode `16500` on the JWT to find the signing key (brute-force dictionary attack)

3. **Forge Admin Token**  
   - Modify the payload (`"role": "admin"`) and re-sign using the cracked secret key

4. **Find Admin Endpoints**  
   - Use `ffuf` or Burp with the **forged JWT token** in `Authorization: Bearer ...` header  
   - Discover admin-only routes and extract sensitive data or flags

---

## 🔐 Secure Coding Tips

- Never use guessable JWT secrets (use long, random keys)  
- Always validate roles on the server (not just client JWT)  
- Hide and protect API routes using proper access control  
- Don’t expose sensitive endpoints without authentication  

---

## ⚠️ Disclaimer

This project is **intentionally insecure** and for educational purposes **only**. Do **not** deploy in production environments.

---

## 📬 Contact

Made for security learning and lab exercises.  
For feedback or questions, open an issue or contact the author.
