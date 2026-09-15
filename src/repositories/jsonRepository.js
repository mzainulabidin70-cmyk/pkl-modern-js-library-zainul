import fs from 'fs/promises';

export async function readJson(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {

    if (error.code === 'ENOENT') {
      console.error("File data tidak ditemukan");
    } else {
      console.error("Format JSON tidak valid");
    }
    throw error;
  }
}

export async function writeJson(filePath, data) {
  const jsonString = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, jsonString, 'utf-8');
}

export async function loadLibraryData() {
  const [books, authors, loans] = await Promise.all([
    readJson('./data/books.json'),
    readJson('./data/authors.json'),
    readJson('./data/loans.json')
  ]);
  return { books, authors, loans };
}
