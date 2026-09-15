export function findBookById(books, id) {
    return books.find(book => book.id === id) || null;
}

export function getAvailableBooks(books) {
    return books.filter (book => book.stock > 0);
}