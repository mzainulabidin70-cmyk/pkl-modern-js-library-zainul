export function findBookById(books, id) {
    return books.find(book => book.id === id) || null;
}

export function getAvailableBooks(books) {
    return books.filter (book => book.stock > 0);
}

export function calculateBookStats(books) {
    const totalTitles = books.length;
    const totalStock = books.reduce((sum, book) => sum + book.stock, 0);
    const outOfStock = books.filter(book => book.stock === 0).length;

    return { totalTitles, totalStock, outOfStock };
}

export function updateBookStock(books, bookId, newStock) {
    if (newStock < 0) throw new Error("Stock tidak boleh negatif");

    const bookExits = books.some(b => b.id === bookId);
    if (!bookExits) throw new Error("ID buku tidak ditemukan");

    return books.map(book => book.id === bookId ? {...book, stock: newStock} : book);
}

export function buildCatalog(books, authors) {
  return books.map(book => {
    const author = authors.find(a => a.id === book.authorId);
    return {
      id: book.id,
      title: book.title,
      authorName: author ? author.name : "Unknown",
      stock: book.stock,
      available: book.stock > 0
    };
  });
}
