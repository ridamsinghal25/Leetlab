# 🧠 LeetLab — Platform for Learning, Solving & Collaborating

**LeetLab** is a **full-stack web application** designed for practicing algorithmic coding challenges, collaborating with peers in real time, and tracking your coding performance over time.

> Built for developers, learners, and educators who want to solve problems, share solutions, and grow together.

---

## 🧩 Tech Stack Overview

### 🔹 Frontend (Vite + React 19)

| Feature          | Libraries                          |
| ---------------- | ---------------------------------- |
| UI Components    | Radix UI, TailwindCSS, Shadcn UI   |
| State Management | Zustand, React Hook Form           |
| Routing & Themes | React Router DOM                   |
| Real-Time Collab | Liveblocks, Yjs, y-monaco          |
| Code Editor      | Monaco Editor                      |
| Charts & Output  | Recharts, React Syntax Highlighter |
| Validations      | Zod                                |
| Utilities        | date-fns, lodash                   |

### 🔸 Backend (Express + Node.js)

| Feature          | Libraries                      |
| ---------------- | ------------------------------ |
| API & Auth       | Express 5, JWT, bcryptjs       |
| Database ORM     | Prisma                         |
| Payments         | Cashfree                       |
| File Uploads     | ImageKit, multer               |
| Emails           | Resend                         |
| IP/Rate Limiting | request-ip, express-rate-limit |
| AI Integration   | Google GenAI API               |

---

## 🎯 Core Features

### ✅ Problem Solving

- Challenge questions with input/output specs
- Monaco code editor with syntax highlighting and auto-complete
- Input/output test cases
- Submit and get real-time evaluation (extendable to Judge0, etc.)

### 🧠 Collaboration

- Multiple users can collaborate in real time
- Cursor presence and editor sync with **Liveblocks + Yjs**
- Great for mock interviews or group learning

### 📊 Analytics

- Track solved problems, accuracy
- Visual feedback using Recharts
- Custom dashboards

### 🧪 Premium Features (via Cashfree)

- Unlock exclusive questions, performance graphs, and themes
- Integrated Cashfree payment gateway (frontend + backend)

### 🖼️ Image & Avatar Uploads

- Via ImageKit API
- Used in user profiles and shared discussions

### 📬 Notifications

- Integrated email system with Resend

---
