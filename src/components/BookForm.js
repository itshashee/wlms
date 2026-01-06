import { BookService } from '../services/BookService.js';

export function BookForm(book, onClose) {
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop open';

    backdrop.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>${book ? 'Edit Book' : 'Add New Book'}</h2>
        <button class="close-btn">&times;</button>
      </div>
      <form id="book-form">
        <div class="form-group">
          <label class="form-label">Title</label>
          <input type="text" name="title" class="form-control" value="${book?.title || ''}" required>
        </div>
        <div class="form-group">
          <label class="form-label">Author</label>
          <input type="text" name="author" class="form-control" value="${book?.author || ''}" required>
        </div>
        <div class="form-group">
          <label class="form-label">Category</label>
          <select name="category" class="form-control">
            <option value="Fiction" ${book?.category === 'Fiction' ? 'selected' : ''}>Fiction</option>
            <option value="Non-Fiction" ${book?.category === 'Non-Fiction' ? 'selected' : ''}>Non-Fiction</option>
            <option value="Science" ${book?.category === 'Science' ? 'selected' : ''}>Science</option>
            <option value="Programming" ${book?.category === 'Programming' ? 'selected' : ''}>Programming</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Total Stock</label>
          <input type="number" name="stock" class="form-control" value="${book?.stock || 1}" min="1" required>
        </div>
        <div style="text-align: right; margin-top: 1.5rem;">
          <button type="button" class="btn btn-ghost" id="cancel-btn">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Book</button>
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

    backdrop.querySelector('#book-form').onsubmit = (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const data = {
            title: fd.get('title'),
            author: fd.get('author'),
            category: fd.get('category'),
            stock: parseInt(fd.get('stock'))
        };

        if (book) {
            BookService.updateBook(book.id, data);
        } else {
            BookService.addBook(data);
        }
        close();
    };

    return backdrop;
}
