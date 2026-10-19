# KOPERASI Coffee — React + Vite + Supabase starter

Website KOPERASI menggunakan React 19, TypeScript, Vite, Tailwind CSS 4, dan (opsional) Supabase.

## Menjalankan di VS Code (Windows/macOS/Linux)

1. Install Node.js **22.12+** (Vite 8 membutuhkan versi Node modern).
2. Ekstrak ZIP, lalu buka folder yang langsung berisi `package.json` di VS Code.
3. Buka Terminal → New Terminal dan jalankan:

   ```bash
   npm install
   npm run dev
   ```

4. Buka URL yang dicetak Vite (konfigurasi proyek menggunakan port `3000`).
5. Validasi proyek dengan:

   ```bash
   npm run lint
   npm run build
   ```

Jika port 3000 sedang dipakai, hentikan proses lain atau gunakan URL port yang dicetak Vite.

## Menyiapkan Supabase

1. Buat project di Supabase.
2. Salin `.env.example` menjadi `.env.local`.
3. Isi `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` dari Project Settings → API.
4. Jalankan SQL di `supabase/migrations/001_initial_schema.sql` melalui Supabase SQL Editor setelah meninjau skemanya.
5. Jalankan migration `002_secure_profile_roles.sql` setelah skema awal, lalu restart Vite setelah mengubah `.env.local`.

`src/lib/supabase.ts` menyediakan client yang nullable sampai env diisi. **Integrasi ini merupakan fondasi, belum berarti seluruh aplikasi sudah bermigrasi dari localStorage ke Supabase.** Komponen produk, pesanan, stok, review, dan autentikasi masih perlu dipindahkan secara bertahap.

### Menyiapkan akses owner/admin

Admin dashboard hanya menerima akun Supabase dengan role `owner`; akun pelanggan biasa tidak dapat masuk, dan role tidak dapat dipilih dari browser.

1. Jalankan migration `002_secure_profile_roles.sql` setelah `001_initial_schema.sql` di Supabase SQL Editor.
2. Buat akun admin dari Supabase Dashboard → Authentication → Users → Add user.
3. Setelah akun dibuat, jalankan di SQL Editor:

   ```sql
   update public.profiles
   set role = 'owner'
   where id = (
     select id from auth.users where email = 'admin@koperasi.coffee'
   );
   ```

   Ganti email contoh dengan email akun owner yang dibuat dan pastikan query memperbarui tepat satu profil. Role `staff` dan `manager` belum diberi akses ke dashboard.
   Akun baru otomatis mendapat role `customer`. Untuk melihat atau mengubah role, gunakan SQL Editor:

   ```sql
   select u.email, p.full_name, p.role
   from auth.users u
   join public.profiles p on p.id = u.id;

   update public.profiles
   set role = 'customer'
   where id = (select id from auth.users where email = 'admin@koperasi.coffee');
   ```

   Ganti role menjadi `owner` untuk memberi akses admin atau `customer` untuk mencabutnya.
4. Isi `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` di `.env.local` untuk lokal dan Vercel → Project → Settings → Environment Variables untuk deployment.
5. Masuk ke halaman Admin menggunakan email dan kata sandi akun owner.

Jangan membuat pendaftaran owner publik atau menyimpan kata sandi admin di kode frontend. Role hanya boleh diubah oleh pemilik project melalui Supabase SQL Editor/dashboard.

### Keamanan penting

- Jangan pernah memasukkan `service_role` key, password payment gateway, atau rahasia webhook ke variabel `VITE_*` atau kode frontend.
- Login admin memakai Supabase Auth dan mensyaratkan role `owner` pada profil. Jalankan migration `002_secure_profile_roles.sql`; jangan gunakan PIN/password hard-coded di frontend.
- Login pelanggan yang belum terdaftar sekarang harus menggunakan tab Daftar; tetapi pendaftaran lokal yang masih tersisa **belum aman untuk produksi** karena belum dimigrasikan ke Supabase Auth.
- Checkout saat ini membuat pesanan `UNPAID` / `waiting_payment`. Ini bukan integrasi QRIS sungguhan. Jangan memproses pesanan atau mengurangi stok sebagai pesanan lunas sampai webhook payment gateway diverifikasi di backend.
- Skema SQL tidak memberi izin browser untuk menulis status pembayaran, stok, atau mengelola produk. Dashboard admin yang ada masih memakai data lokal browser; pindahkan operasi ke backend dengan pemeriksaan role sebelum digunakan sebagai sistem operasional multi-perangkat.

## Struktur utama

- `src/components/` — komponen UI seperti Navbar, checkout, login, struk, kartu produk.
- `src/views/` — halaman Home, Menu, About, Outlet, Review, Admin.
- `src/context/KoperasiContext.tsx` — state aplikasi yang saat ini sebagian besar masih menggunakan localStorage.
- `src/data/initialData.ts` — data demo awal.
- `src/types.ts` — tipe TypeScript.
- `src/lib/supabase.ts` — client Supabase.
- `supabase/migrations/` — skema awal database.

## Catatan pengujian

Jalankan `npm run lint` dan `npm run build`. Fitur pembayaran, autentikasi, sinkronisasi stok, dan panel admin harus diuji terpisah setelah integrasi backend selesai.
