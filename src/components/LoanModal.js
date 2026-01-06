import { LoanService } from '../services/LoanService.js';
import { Database } from '../services/Database.js';

export function LoanModal(book, onClose) {
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop open';

    const users = Database.getUsers().filter(u => u.role === 'user');

    backdrop.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>Issue Book</h2>
        <button class="close-btn">&times;</button>
      </div>
      <div style="margin-bottom: 1.5rem">
        <div style="font-size: 0.9rem; color: var(--color-text-secondary)">Book Title</div>
        <div style="font-weight: 600; font-size: 1.1rem">${book.title}</div>
      </div>
      <form id="loan-form">
        <div class="form-group">
          <label class="form-label">Select Student</label>
          <select name="userId" class="form-control" required>
            <option value="">-- Select Student --</option>
            ${users.map(u => `<option value="${u.id}">${u.name} (${u.email})</option>`).join('')}
          </select>
        </div>
        <div style="text-align: right; margin-top: 1.5rem;">
          <button type="button" class="btn btn-ghost" id="cancel-btn">Cancel</button>
          <button type="submit" class="btn btn-primary">Issue Book</button>
        </div>
      </form>
    </div>
  `;

    const close = () => {
        backdrop.classList.remove('open');
        setTimeout(() => backdrop.remove(), 300);
        if (onClose) onClose();
    };

    backdrop.querySelector('.close-btn').onclick = close;
    backdrop.querySelector('#cancel-btn').onclick = close;

    backdrop.querySelector('#loan-form').onsubmit = (e) => {
        e.preventDefault();
        const userId = e.target.userId.value;

        const result = LoanService.issueBook(userId, book.id);
        if (result.success) {
            close();
        } else {
            alert(result.message);
        }
    };

    return backdrop;
}
