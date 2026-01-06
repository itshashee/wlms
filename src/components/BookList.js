import { BookService } from '../services/BookService.js';

export function BookList(isAdmin, onEdit, onIssue) {
    const container = document.createElement('div');

    // State
    let books = BookService.getAll();

    const render = () => {
        container.innerHTML = `
      <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
        <input type="text" id="search-input" placeholder="Search books..." class="form-control" style="max-width: 300px">
        ${isAdmin ? `<button id="add-btn" class="btn btn-primary"><span>+</span> Add Book</button>` : ''}
      </div>
      <div class="glass-panel table-container">
        <table class="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Status</th>
              ${isAdmin ? '<th>Actions</th>' : ''}
            </tr>
          </thead>
          <tbody>
            ${books.map(book => {
            const available = book.available > 0;
            return `
              <tr>
                <td><strong>${book.title}</strong></td>
                <td>${book.author}</td>
                <td><span class="badge" style="background:rgba(255,255,255,0.1)">${book.category}</span></td>
                <td>
                  <span class="badge ${available ? 'badge-success' : 'badge-danger'}">
                    ${available ? `Available (${book.available})` : 'Issued'}
                  </span>
                </td>
                ${isAdmin ? `
                  <td>
                    <button class="btn-ghost edit-btn" data-id="${book.id}">✏️</button>
                    ${available ? `<button class="btn-ghost text-accent issue-btn" data-id="${book.id}" title="Issue">⚡</button>` : ''}
                  </td>
                ` : ''}
              </tr>
            `}).join('')}
            ${books.length === 0 ? '<tr><td colspan="5" style="text-align:center">No books found</td></tr>' : ''}
          </tbody>
        </table>
      </div>
    `;

        // Events
        container.querySelector('#search-input').addEventListener('input', (e) => {
            books = BookService.search(e.target.value);
            render();
            // Re-focus after render is tricky with full innerHTML replace. 
            // Ideally we'd use virtual DOM or targeted updates. 
            // For this demo, let's just restore focus if possible or debouce.
            // Actually, rerendering kills focus. Let's just update the tbody.
            // Simplifying for this "University Project" level:
            const input = container.querySelector('#search-input');
            input.focus();
            // Fix: The typed character is lost if we re-render immediately logic is naive.
            // Better: Don't re-render input.
        });

        // Better search handling to preserve input focus
        const input = container.querySelector('#search-input');
        if (input) {
            input.value = ""; // or keep value?
            // Actually, let's just not re-render the whole thing on search for this step 
            // to avoid complexity. Just filter logic.
        }

        if (isAdmin) {
            container.querySelector('#add-btn').addEventListener('click', () => onEdit(null));
            container.querySelectorAll('.edit-btn').forEach(btn => {
                btn.onclick = () => onEdit(books.find(b => b.id == btn.dataset.id));
            });
            container.querySelectorAll('.issue-btn').forEach(btn => {
                btn.onclick = () => onIssue(books.find(b => b.id == btn.dataset.id));
            });
        }
    };

    // Improved Render handling for search
    // Separate pure render logic
    const buildTableBody = (filteredBooks) => {
        return filteredBooks.map(book => {
            const available = book.available > 0;
            return `
        <tr>
          <td><strong>${book.title}</strong></td>
          <td>${book.author}</td>
          <td><span class="badge" style="background:rgba(255,255,255,0.1)">${book.category}</span></td>
          <td>
            <span class="badge ${available ? 'badge-success' : 'badge-danger'}">
              ${available ? `Available (${book.available})` : 'Issued'}
            </span>
          </td>
          ${isAdmin ? `
            <td>
              <button class="btn-ghost edit-btn" data-id="${book.id}">✏️</button>
              ${available ? `<button class="btn-ghost text-accent issue-btn" data-id="${book.id}" title="Issue">⚡</button>` : ''}
            </td>
          ` : ''}
        </tr>
      `}).join('') || '<tr><td colspan="5" style="text-align:center">No books found</td></tr>';
    };

    const attachTableEvents = (tbody) => {
        if (isAdmin) {
            tbody.querySelectorAll('.edit-btn').forEach(btn => {
                btn.onclick = () => onEdit(books.find(b => b.id == btn.dataset.id));
            });
            tbody.querySelectorAll('.issue-btn').forEach(btn => {
                btn.onclick = () => onIssue(books.find(b => b.id == btn.dataset.id));
            });
        }
    };

    // First render structure
    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
        <input type="text" id="search-input" placeholder="Search books..." class="form-control" style="max-width: 300px">
        ${isAdmin ? `<button id="add-btn" class="btn btn-primary"><span>+</span> Add Book</button>` : ''}
      </div>
      <div class="glass-panel table-container">
        <table class="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Status</th>
              ${isAdmin ? '<th>Actions</th>' : ''}
            </tr>
          </thead>
          <tbody id="book-tbody">
            ${buildTableBody(books)}
          </tbody>
        </table>
      </div>
  `;

    if (isAdmin) {
        container.querySelector('#add-btn').addEventListener('click', () => onEdit(null));
    }

    const tbody = container.querySelector('#book-tbody');
    attachTableEvents(tbody);

    container.querySelector('#search-input').addEventListener('input', (e) => {
        const query = e.target.value;
        const filtered = BookService.search(query);
        // We keep 'books' as global but filter for view
        tbody.innerHTML = buildTableBody(filtered);
        attachTableEvents(tbody);
    });

    return container;
}
