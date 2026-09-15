import { validateLoan } from '../validators/loanValidator.js';
import { updateBookStock } from './bookService.js';

export function createLoan({ books, loans, bookId, borrowerName }) {
  const book = validateLoan({ books, bookId, borrowerName });
  const updatedBooks = updateBookStock(books, bookId, book.stock - 1);

  const newLoan = {
    id: `L${String(loans.length + 1).padStart(2, '0')}`,
    bookId,
    borrowerName,
    status: 'borrowed',
    loanDate: new Date().toISOString().split('T')
  };
  const updatedLoans = [...loans, newLoan];

  return { updatedBooks, updatedLoans };
}
