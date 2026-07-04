# 🚀 AlgoPilot

> **AI-Powered Multi-Agent Platform for DSA Interview Preparation**

AlgoPilot is a full-stack AI-powered platform that helps students prepare for coding interviews through personalized learning roadmaps, AI code reviews, interview coaching, and progress tracking.

Built using the **MERN Stack** and **Google Gemini AI**, AlgoPilot follows a **Multi-Agent Architecture**, where specialized AI agents collaborate to provide an intelligent interview preparation experience.

---

## 🎥 Demo Video

https://youtu.be/your-video-link

---

## 📸 Screenshots

### Dashboard

![Dashboard](./screenshots/dashboard.png)

### AI Roadmap

![Roadmap](./screenshots/roadmap.png)

### AI Code Reviewer

![Reviewer](./screenshots/reviewer.png)

### Interview Coach

![Interview](./screenshots/interview.png)

---

# ✨ Features

### 🤖 Personalized DSA Roadmap

Generate an AI-powered roadmap based on:

* Skill Level
* Target Company
* Daily Study Hours

Each roadmap includes:

* Learning phases
* Topics
* Recommended problems
* Coding platform
* Direct problem links

---

### 🧠 AI Code Reviewer

Submit your DSA solution and receive:

* Correctness Analysis
* Time Complexity
* Space Complexity
* Edge Case Analysis
* Optimization Suggestions

Every review is automatically stored for future reference.

---

### 💼 Interview Preparation

Generate company-specific interview questions using AI.

Prepare for companies such as:

* Google
* Amazon
* Microsoft
* Adobe
* Atlassian
* Flipkart
* Uber

and many more.

---

### 📊 Progress Tracking

Track your learning journey through:

* Reviewed Problems
* Previous AI Reviews
* Total Problems Solved

---

### 🔐 Authentication

* JWT Authentication
* Protected Routes
* Secure User Sessions

---

# 🤖 AI Agents

AlgoPilot is powered by multiple specialized AI agents.

## 📍 Planner Agent

Creates personalized DSA roadmaps based on user preferences.

---

## 📍 Reviewer Agent

Analyzes submitted DSA code and provides detailed feedback.

---

## 📍 Coach Agent

Guides users through interview preparation and learning.

---

## 📍 Interview Agent

Generates company-specific interview questions.

---

# 🏗️ Architecture

```text
                 React + Vite Frontend
                         │
                         ▼
                 Express.js Backend API
                         │
        ┌────────────────┼────────────────┼─────────────────┐
        │                │                |                 │
        ▼                ▼                ▼                 ▼
 Planner Agent     Reviewer Agent   Interview Agent      Coach Agent
        │                │                |                 │
        └────────────────┼────────────────┼─────────────────┘
                         │
                         ▼
                  Google Gemini API
                         │
                         ▼
                  MongoDB Atlas
```

---

# 🛠️ Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

## Authentication

* JWT

## AI

* Google Gemini API

---

# 📂 Project Structure

```text
AlgoPilot/
│
├── client/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── ...
│
├── server/
│   ├── agents/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── ...
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone https://github.com/Prashantsingh4056/AlgoPilot.git
```

```bash
cd AlgoPilot
```

---

## 2. Install Frontend Dependencies

```bash
cd client
npm install
```

---

## 3. Install Backend Dependencies

```bash
cd ../server
npm install
```

---

# 🔑 Environment Variables

Create a **.env** file inside the **server** directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key

CLIENT_URL=http://localhost:5173
```

---

# ▶️ Running the Project

### Start Backend

```bash
cd server
npm run dev
```

---

### Start Frontend

```bash
cd client
npm run dev
```

---

Frontend runs at:

```
http://localhost:5173
```

Backend runs at:

```
http://localhost:5000
```

---

# 🚀 Deployment

Frontend is deployed on **Vercel**

Backend is deployed on **Render**

Database is hosted on **MongoDB Atlas**

---

# 🔒 Security Features

* JWT Authentication
* Protected API Routes
* Password Hashing
* User-specific Database Queries
* Environment Variables for Secrets
* Secure API Communication

---

# 📈 Future Improvements

* Online Coding IDE
* AI-generated Hints
* Voice Mock Interviews
* Contest Tracking
* Problem Completion Tracking
* Topic Analytics
* LeetCode MCP Integration
* Additional AI Agents

---

# 🤝 Contributing

Contributions are welcome!

Feel free to fork the repository and submit pull requests.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Prashant Singh**

GitHub: https://github.com/Prashantsingh4056

LinkedIn: https://linkedin.com/in/your-linkedin

---

⭐ If you found this project helpful, consider giving it a star!
