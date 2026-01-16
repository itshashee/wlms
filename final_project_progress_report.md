# FINAL PROJECT REPORT

**Project Title:** Web-Based Library Management System (WLMS)  
**Course:** CSE3292 Programming Language III - Web Programming  
**Submission Date:** 20th January 2026  

**Prepared by:**  
*   **Mst.Tisma Hossain** (ID: 42230200729)  
*   **Sadika afrin tumpa** (ID: 42230200745)  
*   **Md. Asraful Islam** (ID: 42230101580)  

**Group ID:** 13  

**Submitted to:**  
Md Intekhabul Hafiz  
Department of CSE  
Northern University, Bangladesh  

---

## Table of Contents

1.  [Executive Summary](#executive-summary)
2.  [Introduction](#introduction)
3.  [System Requirements Specification](#system-requirements-specification)
4.  [System Design & Architecture](#system-design--architecture)
5.  [Implementation Details](#implementation-details)
6.  [Testing & Quality Assurance](#testing--quality-assurance)
7.  [User Manual & Screenshots](#user-manual--screenshots)
8.  [Conclusion & Future Work](#conclusion--future-work)
9.  [Video Demonstration](#video-demonstration)
10. [Source Code](#source-code)

---

## 1. Executive Summary

### The Problem
Traditional library management often relies on manual record-keeping or outdated legacy systems, leading to inefficiencies in tracking book availability, managing student loans, and generating circulation reports. Students often struggle to know which books are available without visiting the library physically.

### The Solution
The Web-Based Library Management System (WLMS) is a modern, responsive web application designed to automate and streamline these processes. It provides a centralized platform where specific roles (Admin and Student) can interact with the library's resources. The system features real-time availability tracking, automated loan processing, and instant reporting on borrowed books.

### Key Features
*   **Role-Based Access Control (RBAC):** Distinct dashboards for Admins (Management) and Students (Browsing).
*   **Real-time Availability:** Book stock updates instantly upon issue/return.
*   **Automated Loan Management:** Seamless issuing and returning of books with validation.
*   **Analytics:** "Most Borrowed Books" reporting for administrative insights.

### Technical Implementation
The application is built using a modern **Vanilla JavaScript** stack powered by **Vite** for rapid development. It utilizes **CSS3** for a responsive Glassmorphism design and simulates a full backend architecture using **LocalStorage** for data persistence, ensuring a functional offline-first experience.

---

## 2. Introduction

### 2.1 Project Purpose
The primary purpose of WLMS is to digitize library operations, reducing manual errors and improving the user experience for both librarians and students. It serves as a comprehensive academic project demonstrating full-stack web development concepts including state management, asynchronous data handling, and client-side routing.

### 2.2 Target Audience
*   **Admins (Librarians):** Need tools to manage inventory, issue books, and view reports.
*   **Students:** Need a user-friendly interface to browse the catalog and check book availability.

---

## 3. System Requirements Specification

### 3.1 Functional Requirements (FR)

| ID | Feature | Description |
| :--- | :--- | :--- |
| **FR-1** | **User Authentication** | The system allows Users and Admins to log in with secure access control. |
| **FR-2** | **Book Management (CRUD)** | Admins can Add, Edit, and Delete books from the system catalog. |
| **FR-3** | **Issue/Return System** | Admins can check out books to students and check them back in, updating stock levels. |
| **FR-4** | **Real-Time Availability** | The system prevents issuing a book if stock key is <= 0. |
| **FR-5** | **Dashboards** | Specific tailored views for Admins (Tables/Forms) vs Students (Grid/List). |

### 3.2 Non-Functional Requirements (NFR)

| ID | Requirement | Criteria |
| :--- | :--- | :--- |
| **NFR-1** | **Performance** | The application loads in under 1 second due to Vite's verified build optimization. |
| **NFR-2** | **Responsiveness** | UI adapts seamlessly to Desktop, Tablet, and Mobile screens using CSS Flexbox/Grid. |
| **NFR-3** | **Data Persistence** | Data remains intact after browser refresh using LocalStorage abstraction. |
| **NFR-4** | **Usability** | Intuitive navigation with clear visual cues (Glassmorphism UI). |

---

## 4. System Design & Architecture

### 4.1 System Architecture Diagram
*(Conceptual 3-Tier Layered Architecture)*

1.  **Presentation Layer (Frontend):**
    *   HTML5 / CSS3 / JavaScript (ES6)
    *   Components: `AuthPage`, `AdminDashboard`, `StudentDashboard`
2.  **Business Logic Layer (Services):**
    *   `AuthService`: Handles login/session.
    *   `BookService`: Manages catalog logic.
    *   `LoanService`: Handles transaction rules (Issue/Return).
3.  **Data Persistence Layer (Simulated DB):**
    *   Browser `LocalStorage` acting as NoSQL document store.

### 4.2 Database Schema (Simulated ERD)

**Table: `wlms_users`**
*   `id` (PK): Unique User ID
*   `name`: Full Name
*   `role`: 'admin' | 'student'
*   `email`: User Email

**Table: `wlms_books`**
*   `id` (PK): Unique Book ID
*   `title`: Book Title
*   `author`: Author Name
*   `category`: Genre/Category
*   `totalStock`: Total physical copies
*   `available`: Currently available copies

**Table: `wlms_loans`**
*   `id` (PK): Loan Transaction ID
*   `bookId` (FK): Reference to `wlms_books`
*   `userId` (FK): Reference to `wlms_users`
*   `issueDate`: Date of issue
*   `status`: 'active' | 'returned'

### 4.3 API Design (Service Methods)

| Service | Method | Description |
| :--- | :--- | :--- |
| `BookService` | `getAllBooks()` | Returns all book objects. |
| `BookService` | `addBook(bookData)` | Validates and saves a new book. |
| `LoanService` | `issueBook(userId, bookId)` | Decrements stock, creates loan record. |
| `LoanService` | `returnBook(loanId)` | Increments stock, closes loan record. |

---

## 5. Implementation Details

### 5.1 Tech Stack
*   **Frontend Framework:** Vanilla JavaScript (ES Modules) structure.
*   **Build Tool:** Vite (for fast HMR and optimized production build).
*   **Styling:** CSS3 (Variables, Flexbox, Glass effect).
*   **Data Store:** Browser LocalStorage (Simulated Backend).

### 5.2 Key Algorithms & Logic
**Availability Tracking Algorithm:**
When an Admin attempts to issue a book:
1.  Check `wlms_books` for `available > 0`.
2.  If true, decrement `available` count.
3.  Create record in `wlms_loans`.
4.  If false, throw "Out of Stock" error.

### 5.3 Challenges & Solutions

**Challenge 1: Relational Data in Key-Value Store**
*   *Issue:* LocalStorage cannot perform SQL JOINs to show "User Name" on a Loan row.
*   *Resolution:* Implemented a `LoanService` aggregator that fetches the raw Loan ID, then "hydrates" it by looking up the corresponding User and Book objects before rendering to the UI.

**Challenge 2: State Management without React**
*   *Issue:* Keeping the UI in sync when data changes (e.g., after return).
*   *Resolution:* Built a custom Event Bus. Components dispatch `wlms:update` events, triggering data re-fetch and re-render of active views.

---

## 6. Testing & Quality Assurance

### 6.1 Testing Strategy
We employed a **Manual Integration Testing** strategy. We verified independent modules (`BookService`) first, then tested complete User Flows (Login -> Issue -> Return).

### 6.2 Test Cases (Functional Testing)

| Test ID | Scenario | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-01** | **Admin Login** | Redirect to Admin Dashboard. | Redirected successfully. | ✅ Pass |
| **TC-02** | **Add Book** | Book appears in list with correct info. | Added and visible. | ✅ Pass |
| **TC-03** | **Issue Stock Check** | Prevent issue if Stock = 0. | Error "Book Unavailable". | ✅ Pass |
| **TC-04** | **Return Update** | Stock count increases by 1. | Count updated instantly. | ✅ Pass |

### 6.3 Bug Log
*   **Bug 01:** Page refresh logged user out.
    *   *Fix:* Added persistence check on initialization in `main.js`.
*   **Bug 02:** Duplicate book IDs.
    *   *Fix:* Changed ID generation to use `Date.now()` timestamp.

---

## 7. User Manual & Screenshots

*(Placeholders for future screenshots)*

*   **Login Screen:**  
    ![Login Screen](./report_assets/login.PNG)

*   **Admin Dashboard:**  
    ![Admin Dashboard](./report_assets/dashboard.PNG)

*   **Book Management:**  
    ![Book List](./report_assets/books.PNG)

---

## 8. Conclusion & Future Work

### Conclusion
The WLMS project successfully demonstrates a functional, responsive library system. It meets all critical business requirements including safe data handling and role-based security. The usage of Vite provided a superior developer experience, allowing us to focus on logic rather than configuration.

### Future Enhancements
1.  **Backend Migration:** Move from LocalStorage to a real MongoDB/Node.js backend.
2.  **Fine Calculations:** Implement logic for overdue fines.
3.  **Email Notifications:** Send email alerts for due dates.

---

## 9. Video Demonstration

**Video Link:** [https://drive.google.com/file/d/1-b2l2H4bIxFA48w1lNGSg6xyqfpSZALs/view?usp=sharing]

*(Instruction: Upload your 5-minute demo video to YouTube (Unlisted) or Google Drive and paste the link above.)*

---

## 10. Source Code

**GitHub Repository:** [ https://github.com/itshashee/wlms ]

**Locally Run Instructions:**
1.  Navigate to project folder.
2.  Run `npm install` to install dependencies.
3.  Run `npm run dev` to start the local server.
4.  Open browser at `http://localhost:5173`.
