# apple-ku

Repository ini berisi aplikasi mobile/web yang dibuat dengan Expo + TypeScript dan file-based routing (Expo Router).

Ringkasan singkat
- Nama proyek: apple-ku
- Teknologi: Expo, React Native, TypeScript, Expo Router

Screenshot Project
<a href="https://imgbox.com/lhKBjX9v" target="_blank"><img src="https://thumbs2.imgbox.com/0b/4a/lhKBjX9v_t.jpg" alt="image host"/></a> <a href="https://imgbox.com/Uj9CNH7s" target="_blank"><img src="https://thumbs2.imgbox.com/52/dc/Uj9CNH7s_t.jpg" alt="image host"/></a> <a href="https://imgbox.com/GlI9o5zl" target="_blank"><img src="https://thumbs2.imgbox.com/f5/71/GlI9o5zl_t.jpg" alt="image host"/></a> <a href="https://imgbox.com/H5daTGbi" target="_blank"><img src="https://thumbs2.imgbox.com/51/74/H5daTGbi_t.jpg" alt="image host"/></a> <a href="https://imgbox.com/Opmw1SgH" target="_blank"><img src="https://thumbs2.imgbox.com/01/f3/Opmw1SgH_t.jpg" alt="image host"/></a> <a href="https://imgbox.com/DPOc7zyG" target="_blank"><img src="https://thumbs2.imgbox.com/c2/4a/DPOc7zyG_t.jpg" alt="image host"/></a>
Konten ini ditulis dalam bahasa Indonesia agar mudah dipahami oleh kontributor lokal.

## Cepat mulai

1. Pasang dependensi

```powershell
npm install
```

2. Jalankan aplikasi (Expo)

```powershell
npx expo start
```

Setelah perintah di atas, buka Metro/Expo Dev Tools lalu pilih perangkat target:
- Development build (jika sudah menyiapkan dev build)
- Android emulator
- iOS simulator (macOS) atau perangkat fisik
- Expo Go (tersedia untuk pengujian cepat, namun beberapa fitur mungkin tidak tersedia)

3. Reset project (opsional — tersedia di template)

```powershell
npm run reset-project
```

## Struktur proyek (ringkasan)

- `app/` — Semua route dan UI utama berbasis file (Expo Router). Contoh: `app/index.tsx`, `app/(tabs)/`, `app/product/[id].tsx`.
- `components/` — Komponen UI kembali-pakai seperti `ProductCard`, `ImagePicker`, `CartItem`.
- `assets/` — Gambar dan aset statis.
- `constants/` — Konstanta aplikasi, daftar produk, tema, dsb.
- `hooks/` — Custom hooks, mis. `use-theme-color`.
- `stores/` — State management sederhana (mis. `CartStore`, `ProductStore`).
- `types/` — Tipe TypeScript yang digunakan di seluruh proyek.

Contoh file penting:
- `app/_layout.tsx` — Layout root untuk routing
- `app/(tabs)/index.tsx` — Halaman utama yang menampung tab
- `components/ProductFormModal.tsx` — Modal untuk menambah/ubah produk

## Catatan pengembangan

- Proyek memakai TypeScript. Pastikan editor Anda memuat tipe yang benar (VS Code direkomendasikan).
- Gunakan file-based routing milik Expo Router untuk menambah halaman baru: cukup buat file di `app/`.
- Untuk styling, cek `constants/theme.ts` dan komponen `themed-*`.

Edge cases & tips
- Jika Metro bundler menampilkan cache error, jalankan `expo start -c` untuk membersihkan cache.
- Untuk debugging di Android/iOS, gunakan log perangkat (adb logcat atau Console.app pada macOS).

## Kontribusi

1. Fork repo
2. Buat branch fitur: `git checkout -b feat/nama-fitur`
3. Commit perubahan dengan pesan jelas
4. Buka pull request dan jelaskan perubahan

## Lisensi
Lisensi belum ditentukan di repo ini (periksa file `LICENSE` jika ada). Jika Anda pemilik repo, tambahkan lisensi yang sesuai.

## Kontak
Jika ada pertanyaan mengenai kode atau setup, buka issue di repository atau hubungi pemilik proyek.

--
README ini dibuat / disesuaikan untuk proyek `apple-ku` (template Expo). Semoga membantu untuk memulai dan berkontribusi.
