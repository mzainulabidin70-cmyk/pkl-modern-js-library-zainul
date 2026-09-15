export function findBookById(books, id) {
    return books.find(book => book.id === id) || null;
}