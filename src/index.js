import readline from 'readline';
import { loadLibraryData, writeJson } from './repositories/jsonRepository.js';
import { findBookById, getAvailableBooks } from './services/bookService.js';
import { createLoan } from './services/loanService.js';
import { generateLibraryReport } from './utils/reportFormatter.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

async function main() {
  let { books, authors, loans } = await loadLibraryData();

  let running = true;
  while (running) {
    console.log("=== APLIKASI PERPUSTAKAAN TERMINAL ===");
    console.log("1. Daftar Buku Tersedia");
    console.log("2. Cari Buku");
    console.log("3. Pinjam Buku");
    console.log("4. Laporan Perpustakaan");
    console.log("0. Keluar");

    const choice = await askQuestion("Pilih menu: ");

    switch (choice) {
      case '1':
        const available = getAvailableBooks(books);
        console.log("\n--- Buku yang Tersedia ---");
        available.forEach(b => console.log(`[${b.id}] ${b.title} (Stok: ${b.stock})`));
        console.log("");
        break;

      case '2':
        const searchId = await askQuestion("Masukkan ID Buku: ");
        const book = findBookById(books, searchId);
        if (book) {
          console.log(`\nDitemukan: ${book.title} | Stok: ${book.stock}\n`);
        } else {
          console.log("\nBuku tidak ditemukan.\n");
        }
        break;

      case '3':
        const bookId = await askQuestion("Masukkan ID Buku yang ingin dipinjam: ");
        const borrowerName = await askQuestion("Masukkan Nama Anda: ");
        try {
          const result = createLoan({ books, loans, bookId, borrowerName });
          books = result.updatedBooks;
          loans = result.updatedLoans;

          await writeJson('./data/books.json', books);
          await writeJson('./data/loans.json', loans);

          console.log("\nPeminjaman berhasil dicatat!\n");
        } catch (error) {
          console.log(`\nGagal meminjam: ${error.message}\n`);
        }
        break;

      case '4':
        generateLibraryReport(books, authors, loans);
        break;

      case '0':
        console.log("Terima kasih telah menggunakan perpustakaan!");
        running = false;
        rl.close();
        break;

      default:
        console.log("\nPilihan tidak tersedia. Silakan coba lagi.\n");
        break;
    }
  }
}

main().catch(err => {
  console.error("Terjadi kesalahan sistem:", err);
  rl.close();
});
