# Aplikasi Asmaul Husna

Aplikasi Asmaul Husna merupakan aplikasi berbasis web yang menampilkan 99 nama Allah SWT beserta tulisan Arab, transliterasi, dan arti dalam Bahasa Indonesia maupun Bahasa Inggris. Aplikasi ini menggunakan **AlAdhan API** sebagai sumber data utama.

## Fitur Aplikasi

- **Menampilkan 99 Asmaul Husna** dalam bentuk daftar kartu.
- **Detail Asmaul Husna** untuk melihat informasi setiap nama secara lebih lengkap.
- **Navigasi nama** untuk berpindah ke nama sebelumnya atau berikutnya.
- **Pilihan bahasa** untuk menampilkan arti dalam Bahasa Indonesia atau Bahasa Inggris.
- **Pencarian** untuk mencari Asmaul Husna berdasarkan nomor, tulisan Arab, transliterasi, maupun arti.
- **Integrasi API** untuk mengambil data Asmaul Husna secara langsung dari AlAdhan API.

## Teknologi yang Digunakan

- HTML
- CSS
- JavaScript
- AlAdhan API

## Cara Menggunakan Aplikasi

1. Buka aplikasi melalui browser.
2. Tunggu hingga data 99 Asmaul Husna selesai dimuat.
3. Jelajahi daftar nama Allah SWT yang ditampilkan pada halaman utama.
4. Klik salah satu kartu Asmaul Husna untuk melihat detail nama, tulisan Arab, transliterasi, dan artinya.
5. Gunakan tombol sebelumnya dan berikutnya untuk berpindah antar-detail Asmaul Husna.
6. Gunakan pilihan bahasa untuk mengganti arti ke Bahasa Indonesia atau Bahasa Inggris.
7. Masukkan kata kunci pada kolom pencarian untuk menemukan nama Asmaul Husna yang diinginkan.

## Cara Menjalankan Aplikasi Secara Lokal

1. Unduh atau clone repository ini.
2. Buka folder proyek menggunakan Visual Studio Code.
3. Jalankan file `index.html` menggunakan ekstensi Live Server.
4. Aplikasi akan terbuka secara otomatis melalui browser.
5. Pastikan perangkat terhubung ke internet agar aplikasi dapat mengambil data dari API.

## Struktur Folder

```text
asmaul-husna/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## Sumber Data API

Data Asmaul Husna diperoleh dari:

[AlAdhan API – Asmaul Husna](https://aladhan.com/)

Endpoint API yang digunakan:

`https://api.aladhan.com/v1/asmaAlHusna`

## Catatan

Aplikasi ini membutuhkan koneksi internet untuk mengambil data dari API. Terjemahan Bahasa Indonesia disimpan secara lokal di dalam JavaScript, sedangkan data utama Asmaul Husna diperoleh melalui AlAdhan API.

---

**Aplikasi Asmaul Husna**  
Dibuat sebagai proyek pembelajaran pengembangan aplikasi berbasis web.
