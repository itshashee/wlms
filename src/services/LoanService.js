import { Database } from './Database.js';

export const LoanService = {
    getActiveLoans() {
        const loans = Database.getLoans();
        // Join with Users and Books for display
        const users = Database.getUsers();
        const books = Database.getBooks();

        return loans.filter(l => l.status === 'issued').map(loan => {
            const user = users.find(u => u.id == loan.userId);
            const book = books.find(b => b.id == loan.bookId);
            return {
                ...loan,
                userName: user?.name || 'Unknown',
                bookTitle: book?.title || 'Unknown'
            };
        });
    },

    issueBook(userId, bookId) {
        const books = Database.getBooks();
        const bookIndex = books.findIndex(b => b.id == bookId);

        if (bookIndex === -1) return { success: false, message: 'Book not found' };
        if (books[bookIndex].available <= 0) return { success: false, message: 'Book not available' };

        // Create Loan
        const loans = Database.getLoans();
        const newLoan = {
            id: Date.now(),
            userId,
            bookId,
            issueDate: new Date().toISOString(),
            status: 'issued'
        };
        loans.push(newLoan);
        Database.setLoans(loans);

        // Update Book
        books[bookIndex].available -= 1;
        books[bookIndex].issues += 1; // Increment global issue count for reports
        Database.setBooks(books);

        return { success: true };
    },

    returnBook(loanId) {
        const loans = Database.getLoans();
        const loanIndex = loans.findIndex(l => l.id === loanId);

        if (loanIndex === -1) return { success: false, message: 'Loan not found' };
        if (loans[loanIndex].status === 'returned') return { success: false, message: 'Already returned' };

        const loan = loans[loanIndex];

        // Update Loan
        loans[loanIndex].status = 'returned';
        loans[loanIndex].returnDate = new Date().toISOString();
        Database.setLoans(loans);

        // Update Book
        const books = Database.getBooks();
        const bookIndex = books.findIndex(b => b.id == loan.bookId);
        if (bookIndex !== -1) {
            books[bookIndex].available += 1;
            Database.setBooks(books);
        }

        return { success: true };
    }
};
