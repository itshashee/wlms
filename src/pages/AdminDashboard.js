import { Sidebar } from '../components/Sidebar.js';
import { BookList } from '../components/BookList.js';
import { BookForm } from '../components/BookForm.js';
import { LoanModal } from '../components/LoanModal.js';
import { Database } from '../services/Database.js';
import { LoanService } from '../services/LoanService.js';
import { BookService } from '../services/BookService.js';

export function AdminDashboard(user) {
    const container = document.createElement('div');
    container.className = 'app-container';

    let activeTab = 'dashboard';
    let mainContent;

    const renderContent = () => {
        mainContent.innerHTML = '';

        // Header
        const header = document.createElement('div');
        header.className = 'header';
        header.innerHTML = `
      <h1 class="page-title">${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
      <div>${new Date().toLocaleDateString()}</div>
    `;
        mainContent.appendChild(header);

        // Tab Content
        if (activeTab === 'dashboard') {
            renderDashboardStats(mainContent);
        } else if (activeTab === 'books') {
            const bookList = BookList(true,
                (book) => { // On Edit/Add
                    document.body.appendChild(BookForm(book, () => renderContent()));
                },
                (book) => { // On Issue
                    document.body.appendChild(LoanModal(book, () => renderContent()));
                }
            );
            mainContent.appendChild(bookList);
        } else if (activeTab === 'loans') {
            renderLoans(mainContent);
        } else if (activeTab === 'members') {
            renderMembers(mainContent);
        }
    };

    const updateTab = (tabId) => {
        activeTab = tabId;
        // Update sidebar active state
        const sidebar = container.querySelector('.sidebar');
        const newSidebar = Sidebar(user, activeTab, updateTab);
        container.replaceChild(newSidebar, sidebar);
        renderContent();
    };

    container.appendChild(Sidebar(user, activeTab, updateTab));

    mainContent = document.createElement('main');
    mainContent.className = 'main-content';
    container.appendChild(mainContent);

    renderContent();
    return container;
}

function renderDashboardStats(container) {
    const books = Database.getBooks();
    const users = Database.getUsers().filter(u => u.role === 'user');
    const loans = LoanService.getActiveLoans();
    const mostBorrowed = BookService.getMostBorrowed();

    const stats = `
    <div class="stats-grid">
      <div class="glass-panel stat-card">
        <div class="stat-label">Total Books</div>
        <div class="stat-value text-accent">${books.length}</div>
        <div class="stat-label">Stock: ${books.reduce((a, b) => a + b.stock, 0)}</div>
      </div>
      <div class="glass-panel stat-card">
        <div class="stat-label">Active Loans</div>
        <div class="stat-value text-warning">${loans.length}</div>
        <div class="stat-label">Pending Returns</div>
      </div>
      <div class="glass-panel stat-card">
        <div class="stat-label">Registered Members</div>
        <div class="stat-value text-success">${users.length}</div>
      </div>
    </div>

    <div class="glass-panel" style="padding: 1.5rem">
        <h3 style="margin-bottom: 1rem">Most Borrowed Books</h3>
        <table class="table">
            <thead><tr><th>Title</th><th>Category</th><th>Total Issues</th></tr></thead>
            <tbody>
                ${mostBorrowed.map(b => `
                    <tr>
                        <td>${b.title}</td>
                        <td>${b.category}</td>
                        <td>${b.issues}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </div>
  `;

    const div = document.createElement('div');
    div.innerHTML = stats;
    container.appendChild(div);
}

function renderLoans(container) {
    const loans = LoanService.getActiveLoans();

    const div = document.createElement('div');
    div.className = 'glass-panel table-container';
    div.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Book</th>
          <th>Student</th>
          <th>Issue Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${loans.map(loan => `
          <tr>
            <td><strong>${loan.bookTitle}</strong></td>
            <td>${loan.userName}</td>
            <td>${new Date(loan.issueDate).toLocaleDateString()}</td>
            <td>
              <button class="btn-ghost text-accent return-btn" data-id="${loan.id}">Return</button>
            </td>
          </tr>
        `).join('')}
        ${loans.length === 0 ? '<tr><td colspan="4" style="text-align:center">No active loans</td></tr>' : ''}
      </tbody>
    </table>
  `;

    div.querySelectorAll('.return-btn').forEach(btn => {
        btn.onclick = () => {
            LoanService.returnBook(parseInt(btn.dataset.id));
            renderLoans(container.parentNode); // Re-render logic slight hack
            // Ideally trigger full page refresh or component refresh
            const event = new Event('wlms:route'); // Using our global event
            window.dispatchEvent(event);
        };
    });

    container.appendChild(div);
}

function renderMembers(container) {
    const users = Database.getUsers().filter(u => u.role === 'user');

    const div = document.createElement('div');
    div.className = 'glass-panel table-container';
    div.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        ${users.map(u => `
          <tr>
            <td><strong>${u.name}</strong></td>
            <td>${u.email}</td>
            <td><span class="badge badge-success">Active</span></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
    container.appendChild(div);
}
