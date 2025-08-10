# 🤝 Kind Hands – Volunteer Management Platform

![Kind Hands Banner](https://raw.githubusercontent.com/afrinbhuiyan/kind-hands-client/main/assets/screenshot.png)

A modern full-stack platform that connects organizations with volunteers, enabling secure, real-time coordination and efficient volunteer management.

---

## 🌐 Live Demo

- **Client (Frontend):** https://kind-hands-50929.web.app/  
- **Server (Backend):** https://kind-hands-server.vercel.app/  
- **Server Repository:** https://github.com/afrinbhuiyan/kind-hands-server-site

---

## ✨ Key Features

### 🔒 Security & Authentication
- Firebase Authentication (Email/Google Login)
- JWT Protected APIs
- Role-Based Access Control (Admin/User)

### 📊 Volunteer Management
- Create, Edit, and Delete Volunteer Posts
- Real-Time Volunteer Request System
- Personalized User Dashboards
- Advanced Search & Filtering Options

### 🎨 UI/UX & Performance
- Dark/Light Mode Support
- Smooth Animations (Framer Motion)
- Mobile-First Responsive Design
- Interactive Data Visualization
- Consistent Styling with Tailwind CSS & DaisyUI

---

## 🛠 Tech Stack

### Frontend
| Category   | Technologies               |
| ---------- | -------------------------- |
| Core       | React 18 + Vite            |
| State      | Context API + Custom Hooks |
| Styling    | Tailwind CSS + DaisyUI     |
| Animation  | Framer Motion, Lottie      |
| UI Library | Flowbite, React Icons      |

### Backend
| Category   | Technologies               |
| ---------- | -------------------------- |
| Server     | Node.js + Express          |
| Database   | MongoDB Atlas              |
| Auth       | Firebase Admin + JWT       |
| API Design | RESTful Architecture       |

---

## 💻 Local Development Guide

### Backend (Server)
```bash
# 1. Clone the repository
git clone https://github.com/afrinbhuiyan/kind-hands-server-site.git

# 2. Navigate into the project folder
cd kind-hands-server-site

# 3. Install dependencies
npm install

# 4. Create a .env file and add:
PORT=3000
DB_URI=your_mongodb_uri
FIREBASE_SERVICE_ACCOUNT=your_firebase_config
JWT_SECRET=your_secret_key

# 5. Run the server
nodemon index.js
```
Server will run at: **http://localhost:3000**

---

### Frontend (Client)
```bash
# 1. Clone the repository
git clone https://github.com/afrinbhuiyan/kind-hands-client.git

# 2. Navigate into the project folder
cd kind-hands-client

# 3. Install dependencies
npm install

# 4. Run the client
npm run dev
```
Client will run at: **http://localhost:5173**

---

## 📄 License
This project is licensed under the **MIT License** – you are free to use, modify, and contribute.

---

## 🧠 Author
**Mst Afrin**  
📍 Dhaka, Bangladesh  
📧 Email: [mstafrinbhuiyan@gmail.com](mailto:mstafrinbhuiyan@gmail.com)  
💻 GitHub: [afrinbhuiyan](https://github.com/afrinbhuiyan)  

Built with ❤️ using **React, Firebase, Node.js, and Tailwind CSS**.
