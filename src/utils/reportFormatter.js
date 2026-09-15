import { calculateBookStats, buildCatalog } from '../services/bookService.js';

export function generateLibraryReport(books, authors, loans) {
  const stats = calculateBookStats(books);
  const activeLoans = loans.filter(l => l.status === 'borrowed').length;
  const catalog = buildCatalog(books, authors);

  // Hitung buku paling populer
  const loanCounts = {};
  loans.forEach(l => loanCounts[l.bookId] = (loanCounts[l.bookId] || 0) + 1);

  let mostBorrowedBookId = '';
  let maxLoans = 0;
  for (const bookId in loanCounts) {
    if (loanCounts[bookId] > maxLoans) {
      maxLoans = loanCounts[bookId];
      mostBorrowedBookId = bookId;
    }
  }
  const popularBook = books.find(b => b.id === mostBorrowedBookId);

  console.log("\n====== LAPORAN PERPUSTAKAAN ======");
  console.log(`Total Judul Buku       : ${stats.totalTitles}`);
  console.log(`Total Stok Buku        : ${stats.totalStock}`);
  console.log(`Buku Habis (Stok 0)    : ${stats.outOfStock}`);
  console.log(`Jumlah Pinjaman Aktif  : ${activeLoans}`);
  console.log(`Buku Paling Populer    : ${popularBook ? popularBook.title : '-'}`);
  console.log("----------------------------------");
  console.log("Daftar Buku & Penulis:");
  catalog.forEach(item => {
    console.log(`- [${item.id}] ${item.title} oleh ${item.authorName} (Stok: ${item.stock})`);
  });
  console.log("==================================\n");
}
