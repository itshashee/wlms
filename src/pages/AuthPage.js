import { AuthService } from '../services/AuthService.js';

export function AuthPage() {
    const container = document.createElement('div');
    container.className = 'auth-container';

    const box = document.createElement('div');
    box.className = 'auth-box glass-panel';

    let isLogin = true;

    const render = () => {
        box.innerHTML = `
      <h1 class="auth-title">WLMS <span class="text-accent">${isLogin ? 'Login' : 'Register'}</span></h1>
      <form id="auth-form">
        ${!isLogin ? `
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" name="name" class="form-control" required placeholder="John Doe">
          </div>
        ` : ''}
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" name="email" class="form-control" required placeholder="user@wlms.com">
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <input type="password" name="password" class="form-control" required placeholder="••••••••">
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%">
          ${isLogin ? 'Sign In' : 'Create Account'}
        </button>
      </form>
      <div class="auth-link">
        ${isLogin ? "Don't have an account?" : "Already have an account?"}
        <span id="toggle-auth">${isLogin ? 'Register' : 'Login'}</span>
      </div>
      <div id="error-msg" class="text-danger" style="text-align: center; margin-top: 1rem; min-height: 1.5rem"></div>
    `;

        box.querySelector('#toggle-auth').addEventListener('click', () => {
            isLogin = !isLogin;
            render();
        });

        box.querySelector('#auth-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const fd = new FormData(e.target);
            const email = fd.get('email');
            const password = fd.get('password');
            const errorDiv = box.querySelector('#error-msg');

            let result;
            if (isLogin) {
                result = AuthService.login(email, password);
            } else {
                const name = fd.get('name');
                result = AuthService.register(name, email, password);
                if (result.success) {
                    // Auto login after register or ask to login? let's auto login 
                    result = AuthService.login(email, password);
                }
            }

            if (result.success) {
                window.location.reload(); // Simple reload to trigger main.js check
            } else {
                errorDiv.textContent = result.message;
            }
        });
    };

    render();
    container.appendChild(box);
    return container;
}
