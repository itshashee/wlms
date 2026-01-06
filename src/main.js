import './styles/main.css';
import './styles/components.css';
import './styles/dashboard.css';
import { Database } from './services/Database.js';
import { AuthService } from './services/AuthService.js';
import { AuthPage } from './pages/AuthPage.js';
import { AdminDashboard } from './pages/AdminDashboard.js';
import { UserDashboard } from './pages/UserDashboard.js';

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  Database.init();
  renderApp();
});

function renderApp() {
  const app = document.querySelector('#app');
  app.innerHTML = '';

  const user = AuthService.getCurrentUser();

  if (!user) {
    app.appendChild(AuthPage());
  } else {
    // Basic routing
    const dashboard = user.role === 'admin' ? AdminDashboard(user) : UserDashboard(user);
    app.appendChild(dashboard);
  }
}

// Global Re-render listener (simple event bus)
window.addEventListener('wlms:route', () => renderApp());
window.addEventListener('wlms:update', () => {
  // partial updates can be handled inside components, or full re-render
  // For simplicity, we might reload parts, but let's stick to component level updates mostly.
});
