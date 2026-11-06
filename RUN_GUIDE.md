# CrimeScene Hub - Quickstart Guide

This guide provides step-by-step instructions for running both the **Backend** and **Frontend** together or individually.

---

## ⚡ Option 1: Run Both Together (Single Command - Recommended)

From the project root folder (`c:\Users\Welcome\Desktop\crime`):

```bash
npm run dev
```

This uses `concurrently` to start:
- 🟡 **Backend Server** on [http://localhost:5000](http://localhost:5000)
- 🔵 **Frontend Client** on [http://localhost:3000](http://localhost:3000)

Both will run simultaneously in the same terminal with color-coded prefix tags (`[backend]` and `[frontend]`), and will auto-reload on file edits.

---

## 🖥️ Option 2: Run in Separate Terminals

If you prefer dedicated terminal windows for backend logs and frontend logs:

### Terminal 1: Backend
```bash
cd backend
npm run dev
```
> The API server will boot on port `5000`. Test endpoint: [http://localhost:5000/api/health](http://localhost:5000/api/health)

### Terminal 2: Frontend
```bash
cd frontend
npm run dev
```
> The Vite development server will boot on [http://localhost:3000](http://localhost:3000) with automatic proxying to `/api`.

---

## 🌐 URLs & Service Ports

| Service | Port | Local URL | Description |
| :--- | :--- | :--- | :--- |
| **Frontend** | `3000` | [http://localhost:3000](http://localhost:3000) | Interactive React Web UI (Vite) |
| **Backend API** | `5000` | [http://localhost:5000](http://localhost:5000) | Express REST API & Database engine |
| **API Health** | `5000` | [http://localhost:5000/api/health](http://localhost:5000/api/health) | System health and accreditation status |

---

## 🧪 Testing Backend Endpoints

To verify that all backend controllers, database store, and cryptographic utilities are functioning:

```bash
cd backend
node test-api.js
```

---

## 📦 Building Frontend for Production

To create an optimized production build:

```bash
cd frontend
npm run build
```
The compiled assets will be placed in `frontend/dist/`.
To preview the production build locally:
```bash
npm run preview
```

---

## 🔍 Troubleshooting

- **Port Conflict (`EADDRINUSE: 5000` or `3000`)**:
  Check if a previous instance is still running in PowerShell:
  ```powershell
  Get-Process -Name node | Stop-Process -Force
  ```
- **Dependencies Missing**:
  Run `npm install` inside both `backend` and `frontend` folders.

