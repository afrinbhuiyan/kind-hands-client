# 🤝 Kind Hands – Volunteer Management Platform

A modern volunteer management web application built with **React + Vite**, powered by **Firebase Authentication**, and styled with **Tailwind CSS + DaisyUI**.

> 🔐 Firebase handles authentication (email/password & social login). The app supports creating posts, managing volunteer requests, and displaying content responsively and beautifully.

---

## 🔗 Project Links

- 🔴 [Live Client Site](https://kind-hands-50929.web.app/)
- 🟠 [Server Repository](https://github.com/afrinbhuiyan/kind-hands-server-site)
- 🟡 [Client Repository](https://github.com/Programming-Hero-Web-Course4/b11a11-client-side-afrinbhuiyan)

---

## 🎯 Project Purpose

To build a volunteer management system where:
- Users can create, update, and delete volunteer posts
- Other users can join these posts as volunteers
- Each user has a dashboard to view their own posts
- JWT-secured routes ensure data protection
- Clean, user-friendly UI/UX is prioritized

---

## 🚀 Key Features

- 🔐 **Firebase Authentication** (email/password + social login)
- ✍ **Create / Update / Delete** volunteer need posts
- 🙋‍♂️ **Be a Volunteer** – users can request to join posts
- 📋 **My Posts** – view and manage your created posts
- 🌓 **Dark/Light Theme Toggle**
- 🖼️ **Responsive, animated UI** with motion effects
- 🔐 **JWT Authentication** for protected route access
- 📦 **RESTful API** backend integration
- 🧾 **Search / Filter** volunteer posts
- 📌 **Copy to Clipboard** share feature

---

## 📦 NPM Packages Used

| Purpose                | Packages                                                                 |
|------------------------|--------------------------------------------------------------------------|
| **Framework & Routing**| react, react-dom, react-router-dom                                       |
| **Styling**            | tailwindcss, daisyui, Mamba Ui                          |
| **Firebase Auth**      | firebase                                                                 |
| **UI Enhancements**    | framer-motion, lottie-react, swiper, react-icons, react-toastify         |
| **Animation & Effects**| react-spring, react-countup, react-datepicker, react-tooltip             |
| **State & Requests**   | axios                                                                    |
| **Notifications**      | sweetalert2, sonner, reapop                                              |
| **Utilities**          | react-helmet-async, react-spinners                                       |
| **Build Tools**        | vite, @vitejs/plugin-react                                               |
| **Linting**            | eslint, eslint-plugin-react-hooks, eslint-plugin-react-refresh           |

---

📁 Folder Structure Overview

src/
├── Auth/                 # Login, Register, AuthContext
├── components/           # Navbar, Footer, Spinner, etc.
├── layouts/              # Main layout wrapper
├── pages/                # Home, Posts, MyPosts, AddVolunteer, etc.
├── routes/               # Private route setup
├── services/api/         # API abstraction
├── firebase/             # Firebase config
├── hooks/                # Custom hooks
└── main.jsx              # App entry point


## 🔧 Installation

```bash
# 1. Clone the repo
git clone https://github.com/your-username/kind-hands-client.git
cd kind-hands-client