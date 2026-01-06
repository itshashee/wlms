# Web-Based Library Management System (WLMS)

A professional, web-based software solution for managing library resources, user circulation, and book availability. Built with modern web technologies (Vite, Vanilla JS, CSS3) to demonstrate a robust Client-Server architecture simulation.

## Introduction

### Purpose
The WLMS automates library operations, replacing manual tracking systems with a responsive web application. It serves as a comprehensive reference implementation for university software development projects.

### Scope
- **User Management**: Registration and Authentication.
- **Catalog**: Searchable book database with real-time availability.
- **Administration**: Tools for adding books and managing user loans.
- **Circulation**: Issue and return processing.

## Features

- **Role-Based Access Control**: Separate dashboards for Admins and Students.
- **Real-Time Availability**: Visual indicators for stock status.
- **Modern UI**: Glassmorphism design system with responsive layout.
- **Reports**: "Most Borrowed Books" analytics.
- **Mocked Backend**: Uses `localStorage` to simulate a persistent database and API layer.

## Project Structure

```
wlms/
├── index.html              # Application Entry Point
├── package.json            # Dependencies and Scripts
├── src/
│   ├── main.js             # App Initialization & Routing
│   ├── pages/              # View Controllers
│   │   ├── AuthPage.js
│   │   ├── AdminDashboard.js
│   │   └── UserDashboard.js
│   ├── components/         # Reusable UI Elements
│   │   ├── BookList.js
│   │   ├── Sidebar.js
│   │   └── ...
│   ├── services/           # Data & Logic Layer (Simulated Backend)
│   │   ├── AuthService.js
│   │   ├── Database.js
│   │   └── ...
│   └── styles/             # CSS Design System
```

## Setup & Run Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. Navigate to the project directory:
   ```bash
   cd wlms
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the development server:
```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` (or the port shown in the terminal).

## Usage Guide

### Default Credentials (Seeded Data)

**Admin Account**
- **Email**: `admin@wlms.com`
- **Password**: `admin123`

**Student Account**
- **Email**: `student@wlms.com`
- **Password**: `student123`

### Workflows

1. **Admin Workflow**:
   - Log in as Admin.
   - Go to "Books" to add new inventory.
   - Go to "Books", click the "Lightning" icon to Issue a book to a registered student.
   - Go to "Loans" to view active issues and Return books.

2. **Student Workflow**:
   - Register a new account or log in.
   - Browse the catalog to see available books.
   - View currently borrowed items in "My Books".

## Software Requirements Specification (SRS) Compliance

| ID | Requirement | Implementation Status |
|----|-------------|----------------------|
| 3.1.1 | User Registration | ✅ Implemented in AuthPage |
| 3.1.2 | User Login | ✅ Implemented via AuthService |
| 3.1.3 | View Books | ✅ Implemented in UserDashboard |
| 3.1.4 | Add/Edit Books | ✅ Implemented in AdminDashboard |
| 3.1.5 | Availability | ✅ Real-time badges in BookList |
| 3.1.6 | Issue/Return | ✅ Implemented in LoanService/UI |
| 3.1.7 | Most Borrowed | ✅ Admin Dashboard Widget |

## Technology Stack

- **Frontend**: HTML5, CSS3 (Variables, Flexbox/Grid), JavaScript (ES6 Modules)
- **Build Tool**: Vite
- **Storage**: LocalStorage (Simulated DB)

## Troubleshooting

### 'npm' Execution Policy Error
If you encounter an error in PowerShell stating "running scripts is disabled on this system", it is due to Windows security settings. You can bypass this easily by running the command with `cmd /c` prefix:

```bash
cmd /c npm run dev
```

Alternatively, you can run the command in the standard **Command Prompt (cmd)** instead of PowerShell.
