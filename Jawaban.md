# Konfirmasi Sebelum Eksekusi

## 1. Ruang Lingkup Fitur

**Pilihan: Keduanya, Customer-facing + Admin/Internal dalam satu platform.**

Platform akan dibangun sebagai sistem MTO end-to-end yang mencakup sisi pelanggan dan sisi internal/admin.

### Customer-facing

* Landing page dan katalog fashion.
* Product detail.
* 3D Scrollytelling / Scroll-Triggered 3D Website.
* 3D Garment Configurator.
* Customization bahan, warna, potongan, dan detail pakaian.
* Measurement Profile pelanggan.
* Cart.
* Checkout.
* Payment.
* Order history.
* Live Production Tracker.
* Account/profile management.
* Notification.
* Customer support / live chat.
* Saved configuration.
* Wishlist atau saved items bila dibutuhkan.
* Order invoice dan payment information.

### Admin/Internal

* Admin dashboard.
* Order management.
* Order verification.
* MTO configuration review.
* Custom request review.
* Production management.
* Production status update.
* Fabric/material inventory.
* Product/catalog management.
* Garment configuration management.
* Customer management.
* Measurement management.
* Pricing rules.
* Payment management.
* Notification management.
* Customer support / live chat management.
* Analytics dan reporting.
* Audit log.

**Keputusan arsitektur:** Admin Panel tidak ditunda ke fase berikutnya. Struktur aplikasi, database, authorization, dan workflow sejak awal harus sudah mendukung sisi customer dan internal agar workflow MTO tidak perlu dibangun ulang.

---

# 2. Konfigurator MTO

**Pilihan: C, Template + Custom Request.**

Sistem akan mendukung dua jalur customization.

## 2.1 Template-based Customization

Pelanggan memilih desain dasar yang sudah disediakan, kemudian dapat mengubah:

* Jenis garment.
* Model/potongan.
* Fabric/material.
* Warna.
* Pattern.
* Collar.
* Sleeve.
* Button/zipper.
* Pocket.
* Embroidery.
* Monogram.
* Detail tambahan lainnya.
* Measurement profile.

Setiap perubahan konfigurasi harus terhubung dengan:

`Garment Configuration → 3D Preview → Pricing Engine → Order Configuration`

Sehingga tampilan 3D dan harga selalu merepresentasikan konfigurasi yang sedang dipilih.

## 2.2 Custom Request

Pelanggan juga dapat mengirimkan:

* Gambar referensi.
* Sketch/desain.
* Catatan kebutuhan.
* Detail ukuran.
* Permintaan modifikasi khusus.

Custom Request akan masuk ke workflow:

`Customer Request → Admin/Tailor Review → Discussion → Revision → Approval → Final Configuration → Order`

**Keputusan sistem:** Custom Request tidak langsung masuk produksi. Harus melalui validasi dan approval internal terlebih dahulu.

---

# 3. Visualisasi 3D, 3D Scrollytelling & Preview

**Pilihan: 3D Product Viewer menggunakan React Three Fiber + Three.js, yang diperluas dengan sistem 3D Scrollytelling / Scroll-Triggered 3D Website.**

README proyek menetapkan React Three Fiber sebagai teknologi 3D dan 3D Garment Configurator sebagai fitur inti.

Sistem visual 3D memiliki tiga lapisan:

1. **3D Scrollytelling**
2. **Interactive 3D Product Viewer**
3. **3D Garment Configurator**

Ketiganya menggunakan fondasi asset dan model 3D yang konsisten.

## 3.1 3D Scrollytelling / Scroll-Triggered 3D Website

3D Scrollytelling merupakan teknik storytelling visual menggunakan objek 3D yang pergerakan, animasi, transformasi, camera, material, atau bentuknya dikendalikan berdasarkan posisi scroll pengguna.

Konsep:

`User Scroll`
→ `Scroll Progress`
→ `Scene State`
→ `3D Animation`
→ `Camera Transformation`
→ `Garment Transformation`
→ `Storytelling Content`

3D Scrollytelling digunakan untuk:

* Memperkenalkan garment.
* Menjelaskan siluet.
* Menunjukkan material.
* Menampilkan warna.
* Menyoroti detail.
* Menjelaskan customization.
* Menghubungkan storytelling dengan MTO.
* Mengarahkan pengguna ke CTA yang jelas.

Animasi tidak boleh hanya menjadi dekorasi.

## 3.2 Struktur Scene

### Scene 01 — Garment Introduction

Memperkenalkan produk dan konteks desain.

### Scene 02 — Form & Silhouette

Menampilkan bentuk depan, samping, dan belakang garment.

### Scene 03 — Material Exploration

Menampilkan variasi material yang tersedia.

### Scene 04 — Color Exploration

Menampilkan perubahan warna berdasarkan scroll progress.

### Scene 05 — Garment Details

Menampilkan detail seperti collar, sleeve, pocket, button, zipper, embroidery, dan monogram.

### Scene 06 — Customization

Menghubungkan storytelling dengan 3D Garment Configurator.

### Scene 07 — Final Garment

Menampilkan hasil konfigurasi final.

### Scene 08 — CTA

CTA dapat mengarahkan pengguna menuju:

* Customize Garment.
* Start Made-to-Order.
* Continue Customization.
* Save Configuration.
* View Product Details.

CTA tidak menggunakan copy ambigu atau *vague hero text*.

## 3.3 Scroll Progress

Menggunakan normalized progress:

`0.0 → 1.0`

Contoh:

`0.00` → Initial State
`0.20` → Camera Movement
`0.40` → Garment Rotation
`0.60` → Material Transition
`0.80` → Detail Showcase
`1.00` → Final State

## 3.4 Sticky 3D Canvas

Menggunakan pola:

**Scrollable Content + Sticky 3D Canvas**

Canvas tetap berada pada viewport ketika storytelling section aktif dan mengikuti scroll progress sampai scene selesai.

## 3.5 Animation System

Dapat mengontrol:

* Rotation.
* Position.
* Scale.
* Camera position.
* Camera rotation.
* Camera zoom.
* Material transition.
* Color transition.
* Component visibility.
* Lighting.
* Environment.
* Object transformation.
* Scene transition.

## 3.6 Interactive 3D Product Viewer

* Rotate.
* Zoom.
* Pan.
* Material switching.
* Color switching.
* Garment option switching.
* Dynamic component visibility.
* Camera presets.
* Reset camera.
* Reset configuration.

## 3.7 Integrasi dengan 3D Garment Configurator

Alur:

`3D Asset`
→ `3D Viewer`
→ `3D Scrollytelling`
→ `3D Configurator`
→ `Final Configuration`
→ `MTO Order`

Configuration state dapat merepresentasikan:

* Product ID.
* Garment variant.
* Fabric.
* Color.
* Pattern.
* Component options.
* Decoration.
* Measurement profile.
* Custom request.
* Calculated price.

## 3.8 2D Fallback

Apabila WebGL/3D gagal digunakan, sistem menampilkan preview 2D dan seluruh informasi penting tetap dapat diakses.

## 3.9 Accessibility & Reduced Motion

Pengguna dengan Reduced Motion mendapatkan pengalaman dengan:

* Camera movement dikurangi.
* Rotation dikurangi.
* Transition disederhanakan.
* Animation dapat dinonaktifkan.
* Storytelling tetap tersedia dalam bentuk konten statis.
* CTA tetap tersedia.

## 3.10 Responsive 3D

### Desktop

Pengalaman 3D penuh.

### Tablet

Kompleksitas scene dapat dikurangi.

### Mobile

* Scroll responsif.
* Canvas proporsional.
* Camera movement lebih sederhana.
* Polygon dan texture dikurangi.
* Animation complexity dikurangi.
* Touch interaction dioptimalkan.

Mobile tidak boleh diperlakukan sebagai sekadar versi desktop yang diperkecil.

## 3.11 Performance Strategy

* Lazy loading asset.
* Code splitting.
* Optimasi model.
* Compression.
* Texture optimization.
* Level of Detail bila diperlukan.
* Membatasi dynamic lights.
* Mengurangi post-processing.
* Tidak merender object yang tidak terlihat.
* Menghentikan animation loop ketika tidak diperlukan.
* Adaptive quality berdasarkan device.
* 2D fallback.

## 3.12 Teknologi

* React Three Fiber.
* Three.js.
* Framer Motion.

Stack tersebut sesuai technology direction proyek.

---

# 4. Pembayaran

**Pilihan: Payment Gateway lokal + dukungan DP.**

Primary payment gateway:

**Midtrans**

Arsitektur dibuat modular agar dapat diperluas ke provider lain.

Workflow:

`Configure`
→ `Price Calculation`
→ `Order`
→ `DP Payment`
→ `Order Verification`
→ `Production`
→ `Final Payment`
→ `Shipping`

Sistem menangani:

* Total harga.
* DP amount.
* Remaining balance.
* Payment status.
* DP status.
* Final payment status.
* Payment expiration.
* Payment verification.
* Refund status.
* Payment history.

Harga ditampilkan transparan melalui Dynamic Pricing Engine.

---

# 5. Realtime Scope

**Pilihan: Semua diimplementasikan.**

## 5.1 Live Order Status

Customer dapat melihat status tanpa refresh:

`Order Confirmed`
→ `Measurement Verification`
→ `Material Preparation`
→ `Cutting`
→ `Sewing`
→ `Quality Control`
→ `Finishing`
→ `Ready`
→ `Shipping`
→ `Completed`

## 5.2 Admin Live Dashboard

Realtime event:

* Pesanan baru.
* Pembayaran.
* Custom request.
* Pesan customer.
* Production update.
* Inventory update.
* Order issue.

## 5.3 Live Chat

Customer dapat berkomunikasi realtime dengan admin/tailor.

## 5.4 Supabase Realtime Architecture

* Postgres Changes.
* Broadcast.
* Presence.

Authorization harus memastikan customer hanya menerima event yang berkaitan dengan akun/order mereka.

---

# 6. Multi-bahasa & Multi-currency

**Bahasa Indonesia + English dan IDR + USD.**

## Language

Primary:

**Bahasa Indonesia**

Secondary:

**English**

Internationalization diterapkan sejak awal.

## Currency

Primary:

**IDR**

Secondary:

**USD**

Sistem menyediakan:

* Currency selector.
* Currency formatting.
* Price conversion.
* Currency-aware checkout.
* Currency-aware invoice.
* Exchange-rate snapshot.

Harga transaksi yang telah dibuat bersifat immutable.

---

# 7. Skala, Urutan Fase, dan Dependensi

Platform dikembangkan secara bertahap, tetapi **Enterprise Architecture disiapkan sejak awal**.

Fase tidak boleh dikerjakan secara acak. Setiap fase memiliki dependency terhadap foundation, data model, security, dan output fase sebelumnya.

## 7.1 Urutan Eksekusi Utama

Urutan resmi implementasi:

`Phase 0`
→ `Phase 1`
→ `Phase 2`
→ `Phase 3`
→ `Phase 4`
→ `Phase 5`

Dengan:

`Phase 0 = Architecture & Foundation`

Kemudian:

`Phase 1 = Foundation + Core MTO`

`Phase 2 = Production + Realtime`

`Phase 3 = Advanced Customization`

`Phase 4 = Communication + Business Intelligence`

`Phase 5 = Optimization + Enterprise Hardening`

---

# 7.2 Phase 0 — Architecture & Foundation

Phase 0 ditambahkan sebagai **prasyarat teknis** sebelum Core MTO.

### Tujuan

Membangun fondasi yang menjadi dependency seluruh fase berikutnya.

### Scope

* Project initialization.
* Next.js App Router foundation.
* Environment strategy.
* Dependency management.
* Base folder architecture.
* Supabase project integration.
* Prisma integration.
* Database foundation.
* Authentication foundation.
* Authorization foundation.
* Base design system.
* Material Design token foundation.
* Base Shadcn UI configuration.
* Error handling foundation.
* Validation foundation.
* Logging foundation.
* Storage foundation.
* Basic CI/build validation.
* Base responsive layout.
* Base accessibility conventions.

### Dependency

**Tidak mempunyai dependency terhadap fase aplikasi lainnya.**

Namun Phase 0 menjadi dependency:

`Phase 1 + Phase 2 + Phase 3 + Phase 4 + Phase 5`

### Acceptance Criteria

Phase 0 diterima apabila:

* Development environment dapat berjalan.
* Production build dapat dilakukan.
* Supabase terhubung.
* Prisma terhubung.
* Database foundation tersedia.
* Auth foundation tersedia.
* Authorization foundation tersedia.
* Storage foundation tersedia.
* Design tokens tersedia.
* Shadcn UI foundation tersedia.
* Error handling dasar tersedia.
* Validation layer tersedia.
* Environment variable strategy tersedia.
* Tidak ada secret yang hard-coded.
* Struktur aplikasi dapat menampung customer dan admin.
* Responsive foundation berjalan.

**Output Phase 0:**

`Stable Technical Foundation`

---

# 7.3 Phase 1 — Foundation + Core MTO

### Dependency

**Wajib bergantung pada:**

`Phase 0`

### Scope

* Authentication.
* Customer profile.
* Product catalog.
* Product detail.
* Fabric/material system.
* Measurement profile.
* 3D viewer.
* 3D Scrollytelling foundation.
* 3D configurator dasar.
* Dynamic pricing.
* Cart.
* Checkout.
* Order creation.
* Payment.
* Basic admin panel.

### Urutan Internal

Implementasi disarankan:

`Auth`
→ `User/Profile`
→ `Product`
→ `Fabric/Material`
→ `Measurement`
→ `Configuration`
→ `3D Viewer`
→ `3D Scrollytelling`
→ `Pricing`
→ `Cart`
→ `Checkout`
→ `Payment`
→ `Order`
→ `Basic Admin`

### Acceptance Criteria

#### Authentication

* Register, login, logout, session recovery berjalan.
* Protected routes terlindungi.
* Role admin tidak dapat diakses customer.
* Authorization server-side diterapkan.

#### Catalog

* Produk berasal dari database.
* Product detail berjalan.
* Variant dan material berasal dari data aktual.
* Tidak ada fake metrics/reviews/counters.

#### MTO Configurator

* Template garment dapat dipilih.
* Opsi customization dapat diubah.
* Invalid combination ditolak.
* Configuration state konsisten.
* Configuration dapat direview.

#### Measurement

* Measurement profile dapat dibuat.
* Input tervalidasi.
* Profile dapat digunakan pada order.

#### 3D Viewer

* Model dapat dirender.
* Rotate dan zoom bekerja.
* Material/color switching bekerja.
* Configuration merefleksikan pilihan user.
* Fallback tersedia.

#### 3D Scrollytelling

* Scroll menghasilkan normalized progress.
* Progress mengontrol scene.
* Camera/object animation bekerja.
* Scene transition konsisten.
* Sticky canvas tidak mengunci halaman.
* CTA dapat digunakan.
* Reduced Motion tersedia.

#### Pricing

* Base price benar.
* Modifier price benar.
* Total price konsisten.
* Price breakdown terlihat.

#### Cart & Checkout

* Configuration dapat masuk cart.
* Cart mempertahankan configuration.
* Checkout menggunakan total yang benar.
* Invalid order tidak dapat dibuat.

#### Payment

* Payment flow menghasilkan status yang benar.
* DP dapat dicatat.
* Remaining balance benar.
* Payment state dapat dikaitkan dengan order.

#### Admin

* Admin dapat melihat order.
* Admin dapat melihat configuration.
* Admin dapat melakukan verification dasar.

### Gate untuk masuk Phase 2

Tidak boleh masuk Phase 2 sebelum:

`Auth`
+
`Product`
+
`Configuration`
+
`Measurement`
+
`Pricing`
+
`Cart`
+
`Checkout`
+
`Payment`
+
`Order`
+
`Basic Admin`

berjalan end-to-end.

**Output Phase 1:**

`Customer → Configure → Price → Cart → Checkout → Payment → Order`

---

# 7.4 Phase 2 — Production & Realtime

### Dependency

**Wajib bergantung pada:**

`Phase 0`
+
`Phase 1`

Terutama dependency terhadap:

* User.
* Order.
* Order items.
* Configuration.
* Payment.
* Admin role.

### Scope

* Production workflow.
* Live Production Tracker.
* Supabase Realtime.
* Admin realtime dashboard.
* Notifications.
* Order timeline.
* Production management.
* Inventory management.

### Urutan Internal

`Order`
→ `Production Workflow`
→ `Production Status`
→ `Inventory`
→ `Realtime Events`
→ `Customer Tracker`
→ `Admin Dashboard`
→ `Notifications`

### Acceptance Criteria

#### Production

* Order approved dapat masuk production.
* Production status memiliki lifecycle.
* Permission status update diterapkan.
* History status tersedia.

#### Live Tracker

* Customer melihat status terbaru tanpa refresh.
* Event diterima realtime.
* Data customer lain tidak terlihat.

#### Admin Dashboard

* Order baru muncul realtime.
* Payment update muncul realtime.
* Production update muncul realtime.
* Inventory event tersedia.

#### Notifications

* Event penting menghasilkan notification.
* Read/unread tersedia.
* Duplicate notification ditangani.

#### Inventory

* Material dapat dikelola.
* Stock dapat diperbarui.
* Material unavailable tidak dapat digunakan secara invalid.
* Stock event tercatat.

#### Reliability

* Reconnect ditangani.
* Duplicate events tidak corrupt state.
* Fallback revalidation tersedia.

### Gate untuk masuk Phase 3

Harus berhasil:

`Order`
→ `Approved`
→ `Production`
→ `Realtime Update`
→ `Customer Tracking`

**Output Phase 2:**

`Order → Production → Realtime Tracking`

---

# 7.5 Phase 3 — Advanced Customization

### Dependency

**Wajib bergantung pada:**

`Phase 1`
+
`Phase 2`

Dependency utama:

* Product.
* Configuration.
* Measurement.
* Storage.
* Order.
* Admin/Tailor role.
* Production workflow.

### Scope

* Custom request.
* Reference image/sketch upload.
* Tailor review.
* Custom approval workflow.
* Advanced garment customization.
* Advanced 3D configuration.
* Advanced Scrollytelling scenes.

### Urutan Internal

`Custom Request`
→ `Upload`
→ `Review`
→ `Discussion`
→ `Revision`
→ `Approval`
→ `Advanced Configuration`
→ `3D Preview`
→ `Final Configuration`
→ `Order/Production`

### Acceptance Criteria

#### Custom Request

* Request dapat dibuat.
* File dapat di-upload.
* Format dan ukuran file tervalidasi.
* Request memiliki lifecycle.

#### Tailor Review

* Tailor dapat membuka request.
* Feedback dapat diberikan.
* Customer menerima feedback.
* Revision dapat dilakukan.
* Histori tersedia.

#### Approval

* Request tidak dapat bypass review.
* Configuration wajib approved sebelum production.
* Approved configuration memiliki snapshot.
* Perubahan berikutnya tidak mengubah snapshot lama secara diam-diam.

#### Advanced 3D

* Advanced component customization divisualisasikan.
* Material/color state konsisten.
* Detail garment dapat ditampilkan.
* Scrollytelling dapat menggunakan valid configuration state.

### Gate untuk masuk Phase 4

Workflow harus berhasil:

`Customer Request`
→ `Review`
→ `Revision`
→ `Approval`
→ `Final Configuration`
→ `Order`

**Output Phase 3:**

`Template MTO + Custom MTO`

---

# 7.6 Phase 4 — Communication & Business Intelligence

### Dependency

**Wajib bergantung pada:**

`Phase 2`
+
`Phase 3`

Karena communication dan analytics memerlukan data order, production, customer, inventory, serta customization yang telah berjalan.

### Scope

* Live chat.
* Customer support.
* Advanced analytics.
* Sales analytics.
* Production analytics.
* Inventory analytics.
* Customer analytics.
* Operational reporting.

### Urutan Internal

`Customer/Admin Communication`
→ `Message Data`
→ `Support Workflow`
→ `Event/Data Collection`
→ `Analytics Model`
→ `Dashboard`
→ `Reporting`

### Acceptance Criteria

#### Live Chat

* Conversation dapat dibuat.
* Message dapat dikirim.
* Message realtime.
* Authorization conversation diterapkan.
* Conversation dapat dikaitkan dengan order.

#### Customer Support

* Support request dapat dibuat.
* Status support tersedia.
* Admin dapat menangani request.
* History tersedia.

#### Analytics

* Dashboard berasal dari data aktual.
* Order analytics tersedia.
* Revenue/payment analytics tersedia.
* Production analytics tersedia.
* Inventory analytics tersedia.
* Customer analytics tersedia.

#### Reporting

* Filtering periode tersedia.
* Data konsisten dengan source.
* Empty state digunakan ketika tidak ada data.
* Tidak ada dummy metrics.

### Gate untuk masuk Phase 5

* Communication layer berjalan.
* Analytics menggunakan data aktual.
* Data authorization benar.
* Reporting dapat ditelusuri ke source data.

**Output Phase 4:**

`Communication + Operational Intelligence`

---

# 7.7 Phase 5 — Optimization & Enterprise Hardening

### Dependency

**Bergantung pada:**

`Phase 1`
+
`Phase 2`
+
`Phase 3`
+
`Phase 4`

Phase 5 bukan hanya fase tambahan, tetapi fase final untuk memastikan seluruh sistem siap digunakan secara production-grade.

### Scope

* Performance optimization.
* Advanced security.
* Audit logging.
* Fine-grained RBAC.
* SEO optimization.
* Accessibility refinement.
* Mobile optimization.
* Caching.
* Observability.
* Backup dan disaster recovery.
* Production deployment hardening.
* Advanced WebGL/3D optimization.

### Urutan Internal

`Security Hardening`
→ `Performance`
→ `Accessibility`
→ `SEO`
→ `Observability`
→ `Backup/Recovery`
→ `3D Optimization`
→ `Production Hardening`
→ `Final Validation`

### Acceptance Criteria

#### Performance

* 3D asset lazy-loaded.
* Non-3D page tidak menunggu asset berat.
* Render loop dioptimalkan.
* Mobile memiliki adaptive quality.
* Fallback tersedia.

#### Security

* Authentication benar.
* Authorization benar.
* Resource isolation benar.
* Upload validation aktif.
* Sensitive configuration aman.
* Database access mengikuti permission.

#### Audit

* Critical action tercatat.
* Actor tercatat.
* Timestamp tercatat.
* Resource tercatat.
* Audit log tidak dapat dimodifikasi sembarangan.

#### RBAC

Minimal mendukung role:

* Customer.
* Admin.
* Tailor.
* Production Staff.
* Inventory Staff.
* Super Admin.

Permission harus dapat dibedakan secara granular.

#### SEO

* Public page mempunyai metadata.
* Product page dapat diindeks sesuai kebutuhan.
* Open Graph tersedia.
* Private/admin route terlindungi dari indexing.

#### Accessibility

* Keyboard navigation.
* Visible focus state.
* Form labeling.
* Accessible error state.
* Contrast sesuai.
* Reduced Motion.
* Information tidak bergantung hanya pada animasi/warna.

#### Observability

* Critical error dapat dilacak.
* Realtime failure dapat terdeteksi.
* Server error dapat ditelusuri.
* Critical action dapat diaudit.

#### Backup & Recovery

* Backup tersedia.
* Restore strategy terdokumentasi.
* Critical data memiliki recovery process.

#### Deployment

* Environment terpisah.
* Secret aman.
* Production build berhasil.
* Critical routes tersedia.
* Database deployment workflow terdokumentasi.

### Final Gate

Platform dinyatakan **Production Ready** ketika seluruh area berikut telah lolos:

`Functionality`
+
`Security`
+
`Performance`
+
`Accessibility`
+
`SEO`
+
`Realtime Reliability`
+
`3D Reliability`
+
`Observability`
+
`Backup/Recovery`

**Output Phase 5:**

`Production-Ready Enterprise MTO Platform`

---

# 8. Dependency Matrix

| Phase       | Dependency Utama    | Tidak Boleh Dimulai Sebelum                                    |
| ----------- | ------------------- | -------------------------------------------------------------- |
| **Phase 0** | Tidak ada           | Project scope sudah ditetapkan                                 |
| **Phase 1** | Phase 0             | Foundation stabil                                              |
| **Phase 2** | Phase 0 + Phase 1   | Order, payment, admin dasar berjalan                           |
| **Phase 3** | Phase 1 + Phase 2   | Configuration, storage, review, production foundation tersedia |
| **Phase 4** | Phase 2 + Phase 3   | Production, customer, communication data tersedia              |
| **Phase 5** | Phase 1 + 2 + 3 + 4 | Seluruh core business workflow sudah berjalan                  |

---

# 9. Critical Path

Critical path utama:

`Architecture`
→ `Auth & RBAC`
→ `Database`
→ `Product`
→ `Measurement`
→ `MTO Configuration`
→ `3D Viewer`
→ `3D Scrollytelling`
→ `Dynamic Pricing`
→ `Cart`
→ `Checkout`
→ `Payment`
→ `Order`
→ `Production`
→ `Realtime`
→ `Custom Request`
→ `Communication`
→ `Analytics`
→ `Security Hardening`
→ `Performance`
→ `Production Readiness`

Bagian yang paling penting adalah **Configuration → Pricing → Order → Production**, karena alur tersebut menjadi tulang punggung bisnis MTO.

---

# 10. Dependency Antar-Modul

## Identity Dependency

`Auth`
→ `Profile`
→ `RBAC`
→ `Customer/Admin/Tailor/Staff`

## Catalog Dependency

`Product`
→ `Variant`
→ `Fabric`
→ `Customization Option`
→ `Pricing Rule`

## MTO Dependency

`Product`
→ `Configuration`
→ `Measurement`
→ `3D Preview`
→ `Price`

## Commerce Dependency

`Configuration`
→ `Pricing`
→ `Cart`
→ `Checkout`
→ `Payment`
→ `Order`

## Production Dependency

`Order`
→ `Verification`
→ `Production`
→ `Inventory`
→ `Production Status`

## Realtime Dependency

`Database Event`
→ `Realtime Event`
→ `Authorized Client`
→ `UI State`

## Custom Request Dependency

`Customer`
→ `Custom Request`
→ `Storage`
→ `Tailor Review`
→ `Approval`
→ `Configuration`
→ `Order`

## Analytics Dependency

`Customer`
+
`Order`
+
`Payment`
+
`Production`
+
`Inventory`
+
`Support`

→ `Analytics`
→ `Reporting`

---

# 11. Parallel Development yang Diperbolehkan

Walaupun fase mempunyai urutan, beberapa pekerjaan dapat berjalan secara paralel setelah dependency minimum terpenuhi.

Contoh:

### Setelah Phase 0

Dapat dikerjakan paralel:

`Catalog`
+
`Auth`
+
`Measurement`
+
`3D Asset Preparation`
+
`Design System`

### Setelah Core Order tersedia

Dapat dikerjakan paralel:

`Production UI`
+
`Realtime Architecture`
+
`Inventory UI`
+
`Notification UI`

### Setelah Custom Request foundation tersedia

Dapat dikerjakan paralel:

`Tailor Review`
+
`3D Advanced Components`
+
`Scrollytelling Scene`
+
`Custom Request UI`

Tetapi **parallel development tidak boleh melewati dependency data dan authorization**.

---

# 12. Definition of Done Global

Selain acceptance criteria per fase, setiap feature baru harus memenuhi Definition of Done:

### Functional

* Requirement feature terpenuhi.
* Happy path berjalan.
* Error path memiliki handling.
* Empty state tersedia.
* Loading state tersedia.
* Success state tersedia.

### UI/UX

* Mengikuti Material Design.
* Menggunakan design token konsisten.
* Responsive.
* Accessible.
* CTA jelas.
* Tidak menggunakan fake information.
* Tidak menggunakan prohibited design patterns.

### Data

* Data berasal dari source yang benar.
* Validation diterapkan.
* Authorization diterapkan.
* Tidak terjadi inconsistent state.

### Security

* Authentication sesuai kebutuhan.
* Authorization sesuai role.
* Input tervalidasi.
* Sensitive data terlindungi.

### Performance

* Asset hanya dimuat ketika dibutuhkan.
* 3D menggunakan lazy loading.
* Unnecessary render/update diminimalkan.
* Mobile tetap usable.

### Realtime

Feature realtime harus:

* Memiliki subscription yang benar.
* Memvalidasi authorization.
* Menangani reconnect.
* Tidak corrupt state karena duplicate event.
* Memiliki fallback.

### Production

Feature tidak dianggap selesai hanya karena berfungsi pada development.

Standar:

`Implemented`
→ `Validated`
→ `Tested`
→ `Security Checked`
→ `Responsive Checked`
→ `Accessibility Checked`
→ `Performance Checked`
→ `Production Ready`

---

# 13. Keputusan Final

| No | Pertanyaan        | Keputusan                                                                           |
| -- | ----------------- | ----------------------------------------------------------------------------------- |
| 1  | Ruang lingkup     | **Customer + Admin/Internal**                                                       |
| 2  | MTO Configurator  | **C. Template + Custom Request**                                                    |
| 3  | Visualisasi       | **3D React Three Fiber + Three.js + 2D fallback**                                   |
| 4  | 3D Experience     | **3D Scrollytelling + Interactive 3D Viewer + 3D Configurator**                     |
| 5  | Payment           | **Midtrans + DP + Pelunasan**                                                       |
| 6  | Realtime          | **Live Tracking + Admin Dashboard + Live Chat**                                     |
| 7  | Language/Currency | **Indonesia + English / IDR + USD**                                                 |
| 8  | Development       | **Bertahap dengan Enterprise Architecture sejak awal**                              |
| 9  | Urutan            | **Phase 0 → 1 → 2 → 3 → 4 → 5**                                                     |
| 10 | Quality Gate      | **Setiap fase wajib lolos Acceptance Criteria sebelum dependency phase berikutnya** |

---

# 14. Technology Direction

Fondasi teknologi:

* **Next.js App Router**
* **Tailwind CSS**
* **Shadcn UI**
* **Supabase Auth**
* **Supabase Realtime**
* **Supabase Storage**
* **Prisma ORM**
* **React Three Fiber**
* **Three.js**
* **Framer Motion**
* **Zustand**
* **date-fns**

Stack tersebut sesuai technology direction proyek Endew Fashion Style.

---

# 15. Design Direction

Frontend wajib menggunakan:

* Material Design.
* Off-white `#F8F9FA`.
* Eerie Black `#1A1A1A`.
* Light Gray `#E9ECEF`.
* Nude `#F4F1EA`.
* Modern dan premium.
* Clean visual hierarchy.
* Clear CTA.
* Responsive desktop, tablet, dan mobile.
* Accessible interaction.
* High readability.
* Consistent spacing.
* Intuitive navigation.
* Performance-oriented visual system.

## Strict UI/UX Restrictions

Tidak diperbolehkan:

* Vague hero text.
* Fake counters.
* Fake reviews.
* Fake metrics.
* Pill-shaped buttons.
* Emoji icons.
* AI-generated images.
* AI slop copy.
* Dark patterns.
* Animasi tanpa fungsi UX.
* Informasi palsu untuk meningkatkan persepsi social proof.

Semua informasi yang ditampilkan pada UI harus berasal dari data nyata, data sistem, atau konten produk yang memang tersedia. Pedoman desain tersebut merupakan bagian dari spesifikasi proyek.

---

# 16. Prinsip Utama 3D Experience

3D pada Endew Fashion Style mengikuti:

**Storytelling → Exploration → Customization → Conversion**

Bukan:

**Decoration → Animation → Decoration**

Alur pengalaman:

`Brand Presentation`
→ `Product Story`
→ `3D Garment`
→ `Material`
→ `Color`
→ `Details`
→ `Customization`
→ `Final Configuration`
→ `MTO`
→ `Production`
→ `Delivery`

3D Scrollytelling menjadi bagian dari product experience yang terintegrasi dengan 3D Garment Configurator, Dynamic Pricing, MTO workflow, dan Production Tracking.
