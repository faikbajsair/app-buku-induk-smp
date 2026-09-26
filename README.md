# 📚 APLIKASI BUKU INDUK & RAPOR K13 MODERN (EDISI KOMERSIAL)
> Sistem Manajemen Arsip Buku Induk Siswa & Transkrip Nilai Kurikulum Nasional Berbasis Google Apps Script (GAS), Google Sheets, & Modern Cloud SPA.

![Badge Versi](https://img.shields.io/badge/Version-2.5.0_Modern_Pro-88AB8E?style=for-the-badge)
![Badge Stack](https://img.shields.io/badge/Stack-HTML5_|_CSS3_|_JS_|_GAS-AFC8AD?style=for-the-badge)
![Badge Deployment](https://img.shields.io/badge/Deploy-GitHub_&_Vercel-2E4036?style=for-the-badge)

---

## 🌟 FITUR UTAMA & KEUNGGULAN

1. **Dual Mode Backend (Live GAS & Instant Demo)**:
   - Berjalan instan dengan data simulasi realistis tanpa konfigurasi rumit.
   - Terkoneksi secara live dengan Google Sheets melalui Google Apps Script REST API.
2. **Branding & Desain Soft Green Pastel**:
   - Palette warna modern & elegan (`#88AB8E`, `#AFC8AD`, `#EEE7DA`, `#2E4036`, `#F4F7F4`).
   - Dynamic Appearance CMS: ganti Logo, Nama Sekolah, NPSN, Alamat, Tanda Tangan Digital & Preset Warna tanpa mengubah baris kode.
3. **Role Management & Authentication**:
   - **Kepala Sekolah**: Mode Read-Only, Analytics Dashboard, Verifikasi & Approval Lembar Pemeriksaan Buku Induk, dan Hak Cetak Dokumen.
   - **Tata Usaha (TU)**: Full Management CRUD Siswa, Wizard Input 4-Langkah, Matriks Nilai 6 Semester, Impor/Ekspor Massal Excel.
4. **Wizard Pendaftaran Siswa (4-Step Multi-Stage Form)**:
   - **Step 1**: Identitas Diri + Upload & Preview Pas Foto 3x4.
   - **Step 2**: Alamat Lengkap, Kontak, & Keterangan Jasmani/Kesehatan.
   - **Step 3**: Pendidikan Asal (SD/MI), Nomor Ijazah, & Riwayat Penerimaan / Beasiswa.
   - **Step 4**: Data Orang Tua Kandung (Ayah & Ibu) + Data Wali Lengkap.
5. **Modul Akademik & Nilai Rapor K13**:
   - Form matriks input nilai 6 Semester (Pengetahuan, Keterampilan, Sikap Spiritual/Sosial) + Nilai Ujian Sekolah/Ijazah.
   - Perhitungan otomatis predikat (A / B / C / D) berbasis KKM.
   - Catatan ekstrakurikuler (Pramuka Wajib, BTQ / Tahfidz, Olahraga & Seni).
6. **Engine Percetakan Presisi Standar Kearsipan (A4 Precision Print Engine)**:
   - **Cover / Sampul Buku Induk Formal** (Bingkai Ganda Ornate).
   - **Halaman Petunjuk Pengisian & Ketentuan Kearsipan**.
   - **Lembar Pemeriksaan Buku Induk (Audit Sheet)**.
   - **Rekapitulasi Daftar Siswa & Nomor Induk (NIS/NISN)**.
   - **Lembar Biodata Resmi Siswa** (Dilengkapi Frame Pas Foto 3x4 dan Cap/Stempel).
   - **Lembar Transkrip Nilai Rapor K13 (6 Semester)**.
7. **Kompatibilitas Komersial & Backup Cepat**:
   - Backup dan Restore otomatis menggunakan SheetJS (.xlsx / .csv).

---

## 📂 STRUKTUR DIREKTORI PROYEK

```
App Buku Induk SMP/
├── Code.gs             # Backend Google Apps Script Controller & REST API
├── index.html          # Frontend SPA Layout + Modals + Print Preview
├── styles.css          # Design System, Pastel Theme Variables & Print CSS
├── app.js              # Frontend MVC Architecture, State Store & Controllers
├── vercel.json         # Konfigurasi Cloud Deployment Vercel
├── package.json        # Manifest Node & Dev Scripts
└── README.md           # Panduan Lengkap Instalasi & Dokumentasi Teknis
```

---

## 🚀 PANDUAN DEPLOYMENT & INTEGRASI GOOGLE APPS SCRIPT

### Langkah 1: Siapkan Google Sheets & Google Apps Script
1. Buka [Google Sheets](https://sheets.new) di browser Anda dan beri nama Spreadsheet: **"Database Buku Induk Siswa"**.
2. Klik menu **Ekstensi (Extensions)** > **Apps Script**.
3. Hapus seluruh kode bawaan pada editor `Code.gs`, lalu salin seluruh isi berkas [Code.gs](file:///Users/faikbajsair/Downloads/App%20Buku%20Induk%20SMP/Code.gs).
4. Klik tombol **Save (Ikon Disket)**.

### Langkah 2: Inisialisasi Database Relasional
1. Di bagian atas editor Apps Script, pilih fungsi `setupDatabase` pada dropdown, lalu klik **Run (Jalankan)**.
2. Berikan izin akses (Authorize access) pada akun Google Anda.
3. Seluruh tabel relasional (`CONFIG`, `STUDENTS`, `PARENTS`, `HISTORIES`, `SUBJECTS`, `GRADES`, `AUDITS`) akan otomatis terbuat beserta data sampel awal!

### Langkah 3: Deploy sebagai Web App
1. Klik tombol **Deploy** di pojok kanan atas > pilih **New deployment**.
2. Klik ikon gerigi (Select type) > pilih **Web app**.
3. Isi konfigurasi:
   - **Description**: `API Buku Induk SMP v2.5`
   - **Execute as**: `Me (email Anda)`
   - **Who has access**: `Anyone` *(Penting agar frontend SPA dapat mengakses API)*
4. Klik **Deploy**, lalu salin **Web App URL** yang dihasilkan (contoh: `https://script.google.com/macros/s/AKfycbx.../exec`).

### Langkah 4: Hubungkan Frontend SPA
1. Buka aplikasi web frontend pada browser.
2. Masuk ke menu **Pengaturan & Tampilan**.
3. Tempelkan URL Web App pada kolom **Google Apps Script Web App URL**.
4. Klik **Tes Koneksi** > jika muncul indikator hijau **"Google Sheets Online"**, aplikasi telah tersambung sepenuhnya!

---

## 🌐 DEPLOYMENT KE GITHUB & VERCEL

1. **Inisialisasi Git & Push ke GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: inisialisasi aplikasi buku induk dan rapor k13 modern"
   git branch -M main
   git remote add origin https://github.com/USERNAME/app-buku-induk-smp.git
   git push -u origin main
   ```
2. **Deploy ke Vercel**:
   - Masuk ke [Vercel Dashboard](https://vercel.com).
   - Klik **Add New Project** > Import repository GitHub Anda.
   - Pada konfigurasi Framework Preset, biarkan **Other (Static)**.
   - Klik **Deploy**. Website akan langsung online dalam hitungan detik!

---

## 📄 LISENSI & HAK CIPTA
Aplikasi ini dirancang untuk siap komersialisasi (Commercial Ready) dan dapat diadaptasi untuk berbagai tingkatan sekolah (SD/MI, SMP/MTs, SMA/SMK/MA).
