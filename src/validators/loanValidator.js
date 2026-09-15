export function validateLoan({books, bookId, borrowerName}) {
    if (!borrowerName || borrowerName.trim() === "") {
        throw new Error("Nama peminjam wajib diisi");
    }
    const book = books.find(b => b.id === bookId);
    if(!book) {
        throw new Error("Buku tidak ditemukan");
    }
    if (book.stock <= 0) {
        throw new Error("Stock buku habis");
    }
    return book;
}
