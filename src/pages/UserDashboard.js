import { Sidebar } from '../components/Sidebar.js';
import { BookList } from '../components/BookList.js';
import { Database } from '../services/Database.js';

export function UserDashboard(user) {
    const container = document.createElement('div');
    container.className = 'app-container';

    let activeTab = 'browse'; // Default to browse for users
    let mainContent;

    const renderContent = () => {
        mainContent.innerHTML = '';

        // Header
        const header = document.createElement('div');
        header.className = 'header';
        header.innerHTML = `
      <h1 class="page-title">${activeTab === 'dashboard' ? 'My Books' : 'Browse Library'}</h1>
      <div>Welcome, ${user.name.split(' ')[0]}</div>
    `;
        mainContent.appendChild(header);

        if (activeTab === 'dashboard') {
            renderMyBooks(mainContent, user);
        } else if (activeTab === 'browse') {
            const bookList = BookList(false, null, null);
            mainContent.appendChild(bookList);
        }
    };

    const updateTab = (tabId) => {
        activeTab = tabId;
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

function renderMyBooks(container, user) {
    // Current loans for this user
    const loans = Database.getLoans().filter(l => l.userId == user.id && l.status === 'issued');
    const books = Database.getBooks();

    const div = document.createElement('div');

    if (loans.length === 0) {
        div.innerHTML = `
            <div class="glass-panel" style="padding: 3rem; text-align: center; color: var(--color-text-secondary)">
                <h2>No books currently borrowed</h2>
                <p style="margin-top: 1rem">Go to "Browse" to check available books.</p>
            </div>
        `;
    } else {
        div.className = 'stats-grid';
        div.innerHTML = loans.map(loan => {
            const book = books.find(b => b.id == loan.bookId);
            return `
                <div class="glass-panel stat-card" style="border-left: 4px solid var(--color-accent)">
                    <h3 style="margin-bottom: 0.5rem">${book.title}</h3>
                    <p class="text-accent">${book.author}</p>
                    <div style="margin-top: 1rem; font-size: 0.8rem; color: var(--color-text-secondary)">
                        Generic Due Date: 14 days from issue
                    </div>
                </div>
            `;
        }).join('');
    }

    container.appendChild(div);
}
