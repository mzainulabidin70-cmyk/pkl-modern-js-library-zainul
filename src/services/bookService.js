export function findBookById(books, id) {
    return books.find(book => book.id === id) || null;
}

export function getAvailableBooks(books) {
    return books.filter (book => book.stock > 0);
}

export function calculateBookStats(books) {
    const totalTitles = books.length;
    const totalStock = books.Reduce((sum, book) => sum + book.stock, 0);
    const outOfStock = books.filter(book => book.stock === 0).length;

    return { totalTitles, totalStock, outOfStock };
}
