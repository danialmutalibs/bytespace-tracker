# 🏢 ByteSpace Workforce Access System (Lite)

A lightweight enterprise-ready workforce access monitoring system built to simulate a real-world corporate check-in / check-out terminal with live operational visibility.

Designed as an MVP to demonstrate scalable architecture, clean API design, and workforce tracking capabilities.

---

## 🚀 Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Prisma ORM (v6)
- SQLite (local database)
- TailwindCSS
- RESTful API architecture

---

## 🎯 Project Purpose

This system simulates a corporate access control terminal that:

- Allows employees to check in and check out
- Displays real-time access confirmation
- Shows employee name after authentication
- Tracks total active staff count
- Provides a management dashboard for operational visibility

The goal is to demonstrate:

- Clean backend architecture
- Relational database modeling
- Foreign key integrity enforcement
- Real-time workforce headcount tracking
- Enterprise-style UI experience

---

## 🏗 Architecture Overview

### Data Layer
- Prisma ORM
- SQLite relational database
- Foreign key integrity between Employee and Activity

### API Layer
- `/api/auth/register`
- `/api/auth/login`
- `/api/activity/checkin`
- `/api/activity/checkout`
- `/api/dashboard`

### UI Layer
- `/employee` → Check-In Terminal
- `/checkout` → Check-Out Terminal
- `/dashboard` → Manager View

---

## 📊 Database Schema

### Employee
- id (UUID)
- name
- email (unique)
- password (hashed)
- createdAt

### Activity
- id (UUID)
- employeeId (FK → Employee)
- checkIn
- checkOut
- createdAt

Foreign key constraints ensure data integrity and prevent invalid check-ins.

---

## ⚙️ Setup Instructions

### 1️⃣ Install Dependencies

```bash
npm install
