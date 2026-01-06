const USERS_KEY = 'wlms_users';
const BOOKS_KEY = 'wlms_books';
const LOANS_KEY = 'wlms_loans';

export const Database = {
  init() {
    if (!localStorage.getItem(USERS_KEY)) {
      this.seedUsers();
    }
    if (!localStorage.getItem(BOOKS_KEY)) {
      this.seedBooks();
    }
    if (!localStorage.getItem(LOANS_KEY)) {
      localStorage.setItem(LOANS_KEY, JSON.stringify([]));
    }
  },

  getAll(collection) {
    const data = localStorage.getItem(collection);
    return data ? JSON.parse(data) : [];
  },

  save(collection, data) {
    localStorage.setItem(collection, JSON.stringify(data));
  },

  seedUsers() {
    const users = [
      { id: 1, name: 'Admin User', email: 'admin@wlms.com', password: btoa('admin123'), role: 'admin' }, // Base64 'hash'
      { id: 2, name: 'John Student', email: 'student@wlms.com', password: btoa('student123'), role: 'user' }
    ];
    this.save(USERS_KEY, users);
  },

  seedBooks() {
    const books = [
      { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', stock: 5, available: 5, issues: 2 },
      { id: 2, title: 'Clean Code', author: 'Robert C. Martin', category: 'Programming', stock: 3, available: 3, issues: 10 },
      { id: 3, title: 'Introduction to Algorithms', author: 'Cormen', category: 'Education', stock: 2, available: 2, issues: 5 },
      { id: 4, title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction', stock: 4, available: 4, issues: 8 },
      { id: 5, title: 'Design Patterns', author: 'Gamma et al.', category: 'Programming', stock: 3, available: 3, issues: 12 }
    ];
    this.save(BOOKS_KEY, books);
  },

  // Helpers
  getUsers() { return this.getAll(USERS_KEY); },
  setUsers(users) { this.save(USERS_KEY, users); },
  
  getBooks() { return this.getAll(BOOKS_KEY); },
  setBooks(books) { this.save(BOOKS_KEY, books); },

  getLoans() { return this.getAll(LOANS_KEY); },
  setLoans(loans) { this.save(LOANS_KEY, loans); }
};
