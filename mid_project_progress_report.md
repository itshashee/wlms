# Project Progress Report: Web-Based Library Management System (WLMS)

**Course:** CSE3292 - Software Development III: Web Programming  
**Date of Submission:** 2026-01-12  
**Group ID:** 13  
**Group Members:**
1.  **Mst.Tisma Hossain** - 42230200729
2.  **Sadika afrin tumpa** - 42230200745
3.  **Md. Asraful Islam** - 42230101580

---

## 1. Project Overview and Current Status

### 1.1. Project Summary
**Goal:** To develop a professional, web-based software solution for managing library resources, automating user circulation, and tracking book availability in real-time using a simulated client-server architecture.  
**Technologies Used:** Vite, Vanilla JavaScript (ES6 Modules), CSS3 (Glassmorphism Design), LocalStorage (Simulated Database).  
**Current Completion Status:** Approximately 90% complete.  
**High-Level Status Statement:** All foundational SRS requirements including User Management, Book Catalog, and Loan Processing are fully implemented. The system successfully simulates a backend using LocalStorage, and we are currently finalizing the UI polish and preparing for final documentation.

### 1.2. Progress Against Schedule
**Status:** Ahead of Schedule  
**Reason for Deviation:** Rapid development cycle enabled by Vite and the decision to use a simulated backend (LocalStorage) allowing for faster iteration on frontend logic without waiting for complex server setups.

---

## 2. Detailed Development Progress

### 2.1. Backend and Database Implementation (Simulated)
| Component | Description of Functionality | Status |
| :--- | :--- | :--- |
| **Database Schema** | Key collections (`wlms_users`, `wlms_books`, `wlms_loans`) designed and implemented in LocalStorage. | **Complete** |
| **Authentication Module** | User registration, Login (mocked security), and Role-Based Access Control (Admin/Student). | **Complete** |
| **Data CRUD APIs** | Service layer (`BookService`, `LoanService`) handling business logic and data persistence. | **Complete** |

### 2.2. Key Features Implementation
We have successfully implemented the following core library features:

1.  **Book Issues and Return**:
    *   **Functionality:** Admins can issue books to registered students and mark them as returned.
    *   **Implementation:** The `LoanService` handles the creation of loan records with timestamps. Usage is tracked in the "Loans" tab of the Admin Dashboard.
2.  **Track Book Availability**:
    *   **Functionality:** Real-time tracking of stock vs. available copies.
    *   **Implementation:** When a book is issued, its `available` count is legally decremented. Development ensures that a book cannot be issued if `available <= 0`.
3.  **Most Borrowed Reports**:
    *   **Functionality:** A statistical widget on the Admin Dashboard showing the most popular books.
    *   **Implementation:** Based on the global `issues` count stored in the book object, sorted and displayed in a dedicated table.

### 2.3. Frontend Implementation
| Component | Description of UI/UX | Integration Status |
| :--- | :--- | :--- |
| **Login/Registration Pages** | Completed forms with validation and state management via `AuthPage.js`. | **Yes** |
| **Main Dashboard/Home Page** | Role-specific views: Admin Dashboard for management, Student Dashboard for browsing. | **Yes** |
| **Data Entry/Creation Form** | "Add New Book" form with validation for Admins. | **Yes** |
| **Navigation/Layout** | Responsive Sidebar navigation and dynamic view switching (`main.js` routing). | **Complete** |

**Screenshot:** *(Please insert a screenshot of the Admin Dashboard showing the Book List and Availability badges here)*

---

## 3. Verification and Testing

### 3.1. Testing Summary
**Unit Tests:** 0% code coverage. Testing has been primarily manual due to the project scope and architecture.  
**Integration Tests:** Successfully tested the flow from User Registration -> Login -> Book Browse -> Issue Book -> Admin Return.  
**Example Successful Test Case:**
*   **Scenario:** Student borrows a book.
*   **Steps:**
    1.  Student logs in and clicks "Issue" on "Clean Code" (Availability: 3).
    2.  `LoanService` verifies stock and creates a loan record.
    3.  Book availability is updated to 2.
    4.  Admin logs in and sees the active loan.
*   **Result:** The book count updates correctly across both dashboards. (Verified)

### 3.2. Identified Issues/Bugs
*   **Major Issue 1:** **Security Simulation.** Passwords are stored using simple Base64 encoding.  
    *   *Status:* **Resolved (By Design)** - As this is a simulation, true encryption was out of scope.
*   **Major Issue 2:** **Browser Refresh Reset.**  
    *   *Status:* **Resolved** - Implemented `localStorage` persistence so data survives page reloads.

---

## 4. Technical Challenges and Solutions

### 4.1. Challenge 1: Simulating Relational Data in NoSQL Storage
**Description:** `LocalStorage` is a key-value store, making it difficult to perform "JOIN" operations (e.g., showing User Name and Book Title on the Loans list).  
**Solution Implemented:** Created a Service Layer (`LoanService.js`) that manually fetches related IDs from `wlms_users` and `wlms_books` arrays and merges them before passing data to the View. This keeps the View logic clean.

### 4.2. Challenge 2: Client-Side Routing in Vanilla JS
**Description:** Managing different views (Login vs Admin vs Student) without a framework like React Router or page reloads.  
**Solution Implemented:** Built a lightweight custom event bus (`window.addEventListener('wlms:route')`) in `main.js`. Components emit events to trigger a root-level `renderApp()` function, ensuring the UI always reflects the current authentication state.

---

## 5. Work Plan and Next Steps

### 5.1. Remaining Tasks
1.  **Refine UI Styling:** improve mobile responsiveness for the Data Tables on smaller screens.
2.  **Implement Search/Filter:** Add comprehensive filtering to the Admin "Loan History" table.
3.  **Data Validation:** stricter input validation for the "Add Book" form.
4.  **Final Documentation:** Complete the User Manual and Architecture Diagram.

### 5.2. Proposed Timeline
| Task Group | Estimated Completion Date |
| :--- | :--- |
| **Core Feature Implementation** | *Completed* (2026-01-10) |
| **Testing and Bug Fixing** | 2026-01-14 |
| **Final Documentation/Deployment** | 2026-01-15 |
