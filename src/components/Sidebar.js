import { AuthService } from '../services/AuthService.js';

export function Sidebar(user, activeTab, onTabChange) {
    const aside = document.createElement('aside');
    aside.className = 'sidebar';

    const isAdmin = user.role === 'admin';

    const menuItems = isAdmin ? [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'books', label: 'Books', icon: '📚' },
        { id: 'loans', label: 'Loans', icon: '🔄' },
        { id: 'members', label: 'Members', icon: '👥' } // Maybe simplified for now
    ] : [
        { id: 'dashboard', label: 'My Books', icon: '📚' },
        { id: 'browse', label: 'Browse', icon: '🔍' }
    ];

    aside.innerHTML = `
    <div class="logo">
      <span>🏛️</span> WLMS
    </div>
    <nav class="nav-menu"></nav>
    <div class="user-profile">
      <div class="user-avatar">${user.name.charAt(0)}</div>
      <div style="flex:1; overflow:hidden">
        <div style="font-weight:600; white-space:nowrap; text-overflow:ellipsis">${user.name}</div>
        <div style="font-size:0.8rem; color:var(--color-text-secondary)">${user.role}</div>
      </div>
      <button class="btn-ghost" id="logout-btn" title="Logout">🚪</button>
    </div>
  `;

    const nav = aside.querySelector('.nav-menu');
    menuItems.forEach(item => {
        const link = document.createElement('a');
        link.href = '#';
        link.className = `nav-link ${activeTab === item.id ? 'active' : ''}`;
        link.innerHTML = `<span>${item.icon}</span> ${item.label}`;
        link.onclick = (e) => {
            e.preventDefault();
            onTabChange(item.id);
        };
        nav.appendChild(link);
    });

    aside.querySelector('#logout-btn').addEventListener('click', () => {
        AuthService.logout();
    });

    return aside;
}
