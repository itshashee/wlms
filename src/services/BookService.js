import { Database } from './Database.js';

export const BookService = {
    getAll() {
        return Database.getBooks();
    },

    search(query) {
        const books = Database.getBooks();
        if (!query) return books;

        const lowerQuery = query.toLowerCase();
        return books.filter(book =>
            book.title.toLowerCase().includes(lowerQuery) ||
            book.author.toLowerCase().includes(lowerQuery) ||
            book.category.toLowerCase().includes(lowerQuery)
        );
    },

    addBook(book) {
        const books = Database.getBooks();
        const newBook = {
            id: Date.now(),
            ...book,
            stock: parseInt(book.stock),
            available: parseInt(book.stock), // Initially all available
            issues: 0
        };
        books.push(newBook);
        Database.setBooks(books);
        return newBook;
    },

    updateBook(id, updates) {
        const books = Database.getBooks();
        const index = books.findIndex(b => b.id === id);
        if (index !== -1) {
            // If stock changes, adjust availability difference
            if (updates.stock !== undefined) {
                const diff = updates.stock - books[index].stock;
                books[index].available += diff;
            }

            books[index] = { ...books[index], ...updates };
            Database.setBooks(books);
            return true;
        }
        return false;
    },

    getMostBorrowed(limit = 5) {
        const books = Database.getBooks();
        return books.sort((a, b) => b.issues - a.issues).slice(0, limit);
    }
};
