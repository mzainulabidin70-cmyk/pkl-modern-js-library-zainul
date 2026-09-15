import fs from 'fs/promises';

// Tugas 10 & 12: Membaca file JSON dengan Error Handling (Pengaman Eror)
export async function readJson(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Jalur merah: Jika gagal, periksa jenis erornya
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
