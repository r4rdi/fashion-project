# Endew Fashion Style

Platform fashion Made-to-Order (MTO) berbasis web dengan pengalaman 3D interaktif, realtime production tracking, dan arsitektur enterprise. Dibangun untuk melayani pelanggan individu dan operasional internal studio fashion Endew.

**Domain Resmi:** [endewfashion.web.id](https://endewfashion.web.id)

---

## Daftar Isi

1. [Ringkasan Proyek](#1-ringkasan-proyek)
2. [Identitas Domain](#2-identitas-domain)
3. [Fitur Utama](#3-fitur-utama)
4. [Technology Stack](#4-technology-stack)
5. [Arsitektur Sistem](#5-arsitektur-sistem)
6. [Struktur Direktori](#6-struktur-direktori)
7. [Database Blueprint](#7-database-blueprint)
8. [Authentication dan Authorization](#8-authentication-dan-authorization)
9. [Realtime Architecture](#9-realtime-architecture)
10. [3D System](#10-3d-system)
11. [Design System](#11-design-system)
12. [Responsive Web Design dan Fluid Grid Layout](#12-responsive-web-design-dan-fluid-grid-layout)
13. [Internationalization dan Currency](#13-internationalization-dan-currency)
14. [Security](#14-security)
15. [SEO dan Performance](#15-seo-dan-performance)
16. [Observability dan Operations](#16-observability-dan-operations)
17. [Roadmap Implementasi](#17-roadmap-implementasi)
18. [Definition of Done](#18-definition-of-done)
19. [Development Setup](#19-development-setup)
20. [Environment Variables](#20-environment-variables)
21. [Scripts](#21-scripts)
22. [Quality Gate](#22-quality-gate)
23. [Kontribusi](#23-kontribusi)
24. [Lisensi](#24-lisensi)

---

## 1. Ringkasan Proyek

Endew Fashion Style adalah platform digital untuk bisnis fashion Made-to-Order yang menghubungkan pelanggan dengan studio produksi dalam satu sistem terintegrasi. Pelanggan dapat menjelajahi katalog, mengonfigurasi pakaian dalam 3D, mengajukan custom request, melakukan pembayaran DP, dan memantau progres produksi secara realtime. Tim internal mengelola order, produksi, inventory, komunikasi, dan analitik melalui dashboard admin yang sama platformnya.

Proyek ini dibangun dengan pendekatan bertahap namun dengan fondasi arsitektur enterprise sejak awal. Setiap fase memiliki dependency, acceptance criteria, dan quality gate yang harus dilalui sebelum fase berikutnya dimulai.

**Lokasi Studio:** Perum Jl. Tongkol Raya No.33, Mladangan, Minomartani, Kec. Ngaglik, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55581

**Instagram:** [@endewfashionn](https://www.instagram.com/endewfashionn/)

**Website:** [endewfashion.web.id](https://endewfashion.web.id)

---

## 2. Identitas Domain

### 2.1 Domain Resmi

Platform ini menggunakan domain:

```
endewfashion.web.id
```

URL production:

```
https://endewfashion.web.id
```

### 2.2 Alasan Pemilihan Domain

Domain `endewfashion.web.id` dipilih dengan pertimbangan berikut:

- **Relevansi nama brand:** Nama domain secara langsung merepresentasikan nama bisnis Endew Fashion, sehingga konsisten dengan identitas brand di seluruh touchpoint digital.
- **Ekstensi .web.id:** Ekstensi ini berada di bawah naungan domain Indonesia (`id`) yang dikelola oleh PANDI. Ekstensi `.web.id` umumnya dikhususkan untuk organisasi, komunitas, atau badan usaha yang ingin menonjolkan identitas digital lokal Indonesia dengan nuansa situs web resmi.
- **Kredibilitas lokal:** Penggunaan ekstensi Indonesia memperkuat positioning sebagai brand lokal Yogyakarta yang serius, sekaligus memudahkan pelanggan domestik mengingat dan memercayai alamat situs.
- **Kesesuaian dengan target pasar:** Mengingat basis pelanggan utama berada di Indonesia, ekstensi `.web.id` lebih relevan dibanding ekstensi internasional untuk kebutuhan jangka pendek, sambil tetap dapat dipadukan dengan subdomain bahasa untuk pasar internasional.
- **Biaya operasional:** Ekstensi `.web.id` umumnya lebih terjangkau dibanding `.com` atau `.co.id`, sehingga efisien untuk tahap awal operasional tanpa mengorbankan kredibilitas.
- **Ketersediaan:** Nama `endewfashion.web.id` masih tersedia saat proses pendaftaran, sedangkan beberapa varian seperti `.com` dan `.co.id` kemungkinan telah digunakan pihak lain.

### 2.3 Konsistensi Brand

Domain resmi wajib konsisten dengan:

| Touchpoint | Nilai |
|---|---|
| Domain | endewfashion.web.id |
| Instagram | @endewfashionn |
| Nama brand | Endew Fashion Style |
| Email resmi (rekomendasi) | hello@endewfashion.web.id |
| Email support (rekomendasi) | support@endewfashion.web.id |
| Email billing (rekomendasi) | billing@endewfashion.web.id |

Email pada domain resmi direkomendasikan agar komunikasi transaksional (invoice, notifikasi order, komunikasi tailor) terlihat profesional dan tidak masuk ke folder spam pelanggan.

### 2.4 Konfigurasi Domain

Rekomendasi konfigurasi DNS dan routing:

- **Root domain:** `endewfashion.web.id` mengarah ke aplikasi Next.js production
- **www redirect:** `www.endewfashion.web.id` melakukan redirect 301 ke root domain untuk mencegah duplikasi SEO
- **Locale routing:** `/id` dan `/en` sebagai prefix locale, root domain default mengarah ke `id`
- **Subdomain opsional:**
  - `admin.endewfashion.web.id` untuk admin panel (opsional, bila ingin pemisahan tegas)
  - `api.endewfashion.web.id` untuk API publik (opsional, bila dibutuhkan)
  - `cdn.endewfashion.web.id` untuk aset statis dan 3D (opsional, bila menggunakan CDN terpisah)

### 2.5 Sertifikat dan Keamanan

- SSL/TLS wajib aktif pada seluruh subdomain
- HSTS diaktifkan untuk memaksa HTTPS
- Redirect HTTP ke HTTPS
- CAA record untuk membatasi penerbit sertifikat

### 2.6 Environment URL

| Environment | URL |
|---|---|
| Development | http://localhost:3000 |
| Staging | https://staging.endewfashion.web.id |
| Production | https://endewfashion.web.id |

Nilai `NEXT_PUBLIC_APP_URL` wajib disesuaikan per environment.

---

## 3. Fitur Utama

### 3.1 Customer-Facing

- Landing page dan storytelling visual dengan 3D scrollytelling
- Katalog fashion dengan filter dan pencarian
- Product detail dengan preview 3D
- 3D Garment Configurator (fabric, warna, potongan, detail)
- Custom Request dengan upload referensi dan review tailor
- Measurement profile tersimpan
- Cart dan checkout
- Pembayaran Midtrans dengan dukungan DP dan pelunasan
- Order tracking realtime
- Live chat dengan admin dan tailor
- Akun, riwayat order, dan saved configuration
- Wishlist
- Multi-bahasa (Indonesia, English)
- Multi-currency (IDR, USD)

### 3.2 Admin dan Internal

- Dashboard operasional realtime
- Manajemen order dan verifikasi
- Manajemen produksi dengan kanban per stage
- Manajemen inventory dan material
- Review custom request
- Manajemen customer
- Manajemen produk dan katalog
- Manajemen pricing rules
- Manajemen notifikasi
- Live chat management
- Analytics dan reporting
- Audit log

---

## 4. Technology Stack

### 4.1 Framework dan Bahasa

- Next.js App Router
- TypeScript
- React

### 4.2 Frontend

- TailwindCSS
- ShadcnUI
- Framer Motion
- React Three Fiber
- Three.js

### 4.3 Backend dan Data

- Supabase Auth
- Supabase Realtime
- Supabase Storage
- PostgreSQL (via Supabase)
- Prisma ORM

### 4.4 State dan Utility

- Zustand
- React Hook Form
- Zod
- date-fns
- next-intl

### 4.5 Payment

- Midtrans (primary)
- Arsitektur modular untuk provider tambahan

### 4.6 Tooling

- npm
- PowerShell (untuk perintah development pada environment Windows)
- ESLint
- Prettier
- Prisma CLI

---

## 5. Arsitektur Sistem

### 5.1 Prinsip

- Server Components sebagai default, Client Components hanya ketika dibutuhkan
- Pemisahan tegas antara data layer, business logic, dan presentation
- Realtime sebagai first-class citizen, bukan fitur tambahan
- 3D sebagai bagian product experience, bukan dekorasi
- Keamanan diterapkan di setiap lapisan, termasuk RLS dan server-side guard
- Semua copy dari sumber terjemahan, tidak hard-coded
- Semua harga dari pricing engine, tidak hard-coded

### 5.2 Data Flow

```
Database (Supabase Postgres)
  -> Prisma ORM (server)
  -> Server Component atau Route Handler
  -> Client Component
  -> UI Render
```

### 5.3 Realtime Flow

```
Database Change
  -> Supabase Realtime Channel
  -> Authorized Client Subscription (RLS)
  -> Local State Update
  -> UI Update tanpa refresh
```

### 5.4 3D Flow

```
3D Asset
  -> 3D Viewer
  -> 3D Scrollytelling
  -> 3D Configurator
  -> Final Configuration
  -> MTO Order
```

### 5.5 Payment Flow

```
Configure
  -> Price Calculation
  -> Order
  -> DP Payment
  -> Order Verification
  -> Production
  -> Final Payment
  -> Shipping
```

---

## 6. Struktur Direktori

```
app/
  (marketing)/
  (shop)/
  (configurator)/
  (account)/
  (auth)/
  (admin)/
  api/
  layout.tsx
  globals.css
components/
  ui/
  marketing/
  shop/
  configurator/
  three/
  admin/
  shared/
lib/
  supabase/
  prisma/
  auth/
  pricing/
  i18n/
  currency/
  validators/
  utils/
stores/
  configurator/
  cart/
  ui/
prisma/
  schema.prisma
  migrations/
public/
  3d/
  textures/
  models/
messages/
  id.json
  en.json
```

### 6.1 Route Groups

| Route Group | Fungsi | Akses |
|---|---|---|
| (marketing) | Landing, about, scrollytelling | Publik |
| (shop) | Katalog dan product detail | Publik |
| (configurator) | 3D viewer dan konfigurator | Publik, save butuh auth |
| (auth) | Login, register, reset | Publik |
| (account) | Profil, measurement, order, chat | Auth customer |
| (admin) | Dashboard dan manajemen | Auth role internal |

---

## 7. Database Blueprint

### 7.1 Identity

- User (id, email, name, phone, role, locale, currency, avatar, timestamps)
- Profile (userId, preferences, defaultAddress, defaultMeasurementProfileId)
- Address (userId, label, recipient, phone, fullAddress, city, province, postalCode, isDefault)

### 7.2 Catalog

- Product (slug, name_id, name_en, description_id, description_en, basePriceIdr, categoryId, isPublished)
- Category (slug, name_id, name_en)
- ProductImage (productId, url, alt_id, alt_en, order)
- Product3DAsset (productId, modelUrl, textureUrls, lodVariants, defaultCamera)
- GarmentTemplate (productId, type, baseOptions)
- GarmentOption (templateId, group, value, priceModifier, imageUrl)
- Fabric (sku, name_id, name_en, colorHex, textureUrl, pricePerMeter, stockMeters, supplier)
- FabricColor (fabricId, name_id, name_en, colorHex, textureUrl)

### 7.3 Configuration

- Configuration (id, userId, productId, templateId, snapshotJson, priceBreakdownIdr, priceBreakdownUsd, status, timestamps)
- ConfigurationOption (configurationId, optionGroup, optionValue, priceModifier)
- SavedConfiguration (userId, configurationId, name, isFavorite)
- CustomRequest (id, userId, productId, description, references, status, assignedTailorId, timestamps)
- CustomRequestFile (requestId, fileUrl, fileType, fileSize, uploadedAt)
- CustomRequestMessage (requestId, senderId, message, attachments, createdAt)
- CustomRequestRevision (requestId, revisionNumber, description, createdAt)

### 7.4 Measurement

- MeasurementProfile (id, userId, name, gender, unit, isDefault)
- MeasurementValue (profileId, key, valueCm)

Key pengukuran: chest, waist, hip, shoulder, sleeve, inseam, neck, thigh, armhole.

### 7.5 Commerce

- Cart (id, userId, updatedAt)
- CartItem (cartId, configurationId, quantity, snapshotPriceIdr)
- Order (id, orderNumber, userId, status, subtotalIdr, taxIdr, shippingIdr, totalIdr, currency, exchangeRateSnapshot, createdAt)
- OrderItem (orderId, configurationId, productSnapshot, quantity, unitPriceIdr, totalIdr)
- OrderStatusHistory (orderId, status, notes, actorId, createdAt)

### 7.6 Payment

- Payment (id, orderId, provider, providerRef, type, amountIdr, status, expiresAt, paidAt)
- PaymentEvent (paymentId, eventType, rawPayload, createdAt)

Tipe pembayaran: DP, FINAL, FULL, REFUND.

### 7.7 Production

- ProductionJob (id, orderItemId, status, assignedStaffId, startedAt, completedAt, notes)
- ProductionStage (jobId, stage, status, startedAt, completedAt, actorId)

Stage produksi: ORDER_CONFIRMED, MEASUREMENT_VERIFICATION, MATERIAL_PREPARATION, CUTTING, SEWING, QUALITY_CONTROL, FINISHING, READY, SHIPPING, COMPLETED.

### 7.8 Inventory

- InventoryItem (fabricId, sku, stockMeters, reservedMeters, reorderLevel)
- InventoryMovement (itemId, type, quantity, reference, actorId, createdAt)

Tipe pergerakan: IN, OUT, RESERVE, RELEASE, ADJUST.

### 7.9 Communication

- Conversation (id, userId, orderId nullable, subject, status, createdAt)
- Message (conversationId, senderId, senderRole, body, attachments, createdAt, readAt)
- Notification (userId, type, title_id, title_en, body_id, body_en, referenceUrl, readAt)

### 7.10 Analytics dan Audit

- AuditLog (actorId, action, resourceType, resourceId, metadataJson, ipAddress, userAgent, createdAt)
- ExchangeRate (baseCurrency, quoteCurrency, rate, fetchedAt)

### 7.11 Enums

- Role: CUSTOMER, TAILOR, PRODUCTION_STAFF, INVENTORY_STAFF, ADMIN, SUPER_ADMIN
- OrderStatus: DRAFT, PENDING_PAYMENT, DP_PAID, IN_PRODUCTION, READY, SHIPPED, COMPLETED, CANCELLED, REFUNDED
- ConfigurationStatus: DRAFT, SAVED, PENDING_REVIEW, APPROVED, REJECTED, LOCKED
- CustomRequestStatus: SUBMITTED, REVIEWING, REVISION_REQUESTED, APPROVED, REJECTED, CONVERTED_TO_ORDER
- PaymentStatus: PENDING, PAID, EXPIRED, FAILED, REFUNDED

### 7.12 Aturan Integritas Data

- Configuration snapshot immutable setelah order dibuat
- Order menyimpan exchangeRateSnapshot agar harga transaksi tidak berubah
- Measurement profile di-snapshot saat order dibuat
- Audit log append-only
- Setiap perubahan status order dan production wajib membuat record history

---

## 8. Authentication dan Authorization

### 8.1 Auth Flow

- Supabase Auth sebagai identity provider
- Metode: email plus password, magic link, OAuth Google
- Session disimpan via cookie HttpOnly dengan helper Supabase SSR
- Middleware Next.js melakukan refresh session dan route guard

### 8.2 RBAC Matrix

| Resource | Customer | Tailor | Production Staff | Inventory Staff | Admin | Super Admin |
|---|---|---|---|---|---|---|
| Product catalog (read) | Ya | Ya | Ya | Ya | Ya | Ya |
| Product catalog (write) | Tidak | Tidak | Tidak | Tidak | Ya | Ya |
| Own order (read) | Ya | Tidak | Tidak | Tidak | Ya | Ya |
| All order (read) | Tidak | Terbatas | Terbatas | Tidak | Ya | Ya |
| Custom request review | Tidak | Ya | Tidak | Tidak | Ya | Ya |
| Production update | Tidak | Ya | Ya | Tidak | Ya | Ya |
| Inventory update | Tidak | Tidak | Tidak | Ya | Ya | Ya |
| Analytics | Tidak | Tidak | Tidak | Tidak | Ya | Ya |
| User role management | Tidak | Tidak | Tidak | Tidak | Tidak | Ya |
| Audit log | Tidak | Tidak | Tidak | Tidak | Ya | Ya |

### 8.3 Supabase RLS Strategy

- Setiap tabel dengan data user wajib RLS aktif
- Policy read untuk customer: `auth.uid() = user_id`
- Policy read untuk admin: cek role via JWT metadata atau tabel roles
- Policy write dibatasi service role atau server action dengan validasi tambahan
- Realtime channel authorization memakai RLS Postgres Changes

### 8.4 Server-Side Guard

- Semua server action dan route handler memvalidasi session dan role sebelum mutasi
- Route /admin diproteksi di middleware dan dicek ulang di layout server
- Mutasi order dan payment memakai idempotency key

---

## 9. Realtime Architecture

### 9.1 Channel Strategy

- `user:{userId}` untuk notifikasi personal
- `order:{orderId}` untuk status tracking
- `conversation:{conversationId}` untuk live chat
- `admin:events` untuk order baru, payment, custom request
- `production:jobs` untuk update produksi
- `inventory:events` untuk perubahan stok

### 9.2 Event Taxonomy

Format: `{domain}.{entity}.{action}`

Contoh:
- `order.status.updated`
- `payment.status.updated`
- `production.stage.changed`
- `inventory.stock.low`
- `chat.message.created`
- `custom_request.status.updated`

### 9.3 Delivery Pattern

- Postgres Changes untuk sinkronisasi tabel
- Broadcast untuk event non-persistent (typing, presence)
- Presence untuk indikator online pada live chat

### 9.4 Reliability

- Reconnect otomatis dengan exponential backoff
- Deduplikasi event berdasarkan id dan timestamp
- Fallback polling ketika realtime gagal
- Server-side revalidation sebagai jaring pengaman

### 9.5 Live Order Status

```
Order Confirmed
  -> Measurement Verification
  -> Material Preparation
  -> Cutting
  -> Sewing
  -> Quality Control
  -> Finishing
  -> Ready
  -> Shipping
  -> Completed
```

### 9.6 Admin Live Dashboard

Realtime event yang diterima admin:
- Pesanan baru
- Pembayaran
- Custom request
- Pesan customer
- Production update
- Inventory update
- Order issue

---

## 10. 3D System

### 10.1 Prinsip

```
Storytelling -> Exploration -> Customization -> Conversion
```

Bukan:

```
Decoration -> Animation -> Decoration
```

### 10.2 Tiga Lapisan 3D

1. 3D Scrollytelling
2. Interactive 3D Product Viewer
3. 3D Garment Configurator

Ketiganya berbagi asset dan model yang konsisten.

### 10.3 3D Scrollytelling Scene

1. Scene 01: Garment Introduction
2. Scene 02: Form dan Silhouette
3. Scene 03: Material Exploration
4. Scene 04: Color Exploration
5. Scene 05: Garment Details
6. Scene 06: Customization
7. Scene 07: Final Garment
8. Scene 08: CTA

### 10.4 Scroll Progress

Normalized `0.0` sampai `1.0`:

```
0.00 -> Initial State
0.20 -> Camera Movement
0.40 -> Garment Rotation
0.60 -> Material Transition
0.80 -> Detail Showcase
1.00 -> Final State
```

Pola implementasi: Scrollable Content plus Sticky 3D Canvas.

### 10.5 Animation System

Dapat mengontrol:
- Rotation
- Position
- Scale
- Camera position, rotation, zoom
- Material dan color transition
- Component visibility
- Lighting dan environment
- Scene transition

### 10.6 Interactive 3D Product Viewer

- Rotate, zoom, pan
- Material dan color switching
- Garment option switching
- Dynamic component visibility
- Camera presets
- Reset camera dan reset configuration

### 10.7 Asset Pipeline

- Format model: glTF binary (.glb)
- Texture: WebP atau KTX2
- Target ukuran: model di bawah 2 MB, texture di bawah 1 MB per material
- LOD minimal 2 tingkat (high, low)
- Naming convention: `{product}-{variant}-{lod}.glb`

### 10.8 Performance Tier

| Tier | Device | Model | Texture | Light | Post FX |
|---|---|---|---|---|---|
| High | Desktop modern | Full LOD | Full | 3+ | Ya |
| Medium | Tablet, laptop | Medium LOD | Medium | 2 | Terbatas |
| Low | Mobile mid | Low LOD | Low | 1 | Tidak |
| Fallback | Tanpa WebGL | 2D | 2D | Tidak | Tidak |

### 10.9 Accessibility dan Reduced Motion

- Deteksi `prefers-reduced-motion`
- Matikan camera movement dan rotasi otomatis
- Transisi material menjadi instan
- Konten statis tetap tersedia
- CTA tetap tersedia

### 10.10 2D Fallback

Ketika WebGL tidak tersedia, sistem menampilkan preview 2D dan seluruh informasi penting tetap dapat diakses.

---

## 11. Design System

### 11.1 Design Token

**Warna:**

- Background utama: Off-white `#F8F9FA`
- Text dan foreground: Eerie Black `#1A1A1A`
- Surface sekunder: Light Gray `#E9ECEF`
- Aksen lembut: Nude `#F4F1EA`
- Border: turunan dari `#E9ECEF`
- Error, Success, Warning: standar Material

**Tipografi:**

- Geometric sans untuk display, humanist sans untuk body
- Skala: 12, 14, 16, 18, 20, 24, 32, 40, 56, 72
- Line height: 1.5 body, 1.2 heading
- Weight: 400, 500, 600, 700

**Spacing:**

- Skala 4, 8, 12, 16, 24, 32, 48, 64, 96

**Radius:**

- Small 4, Medium 8, Large 12, Extra 16
- Tidak memakai pill radius

**Elevation:**

- Level 0 sampai Level 5 mengikuti Material

**Motion:**

- Duration: 120, 200, 300, 500 ms
- Easing: standard, decelerate, accelerate

### 11.2 Komponen ShadcnUI

- Button (primary, secondary, outline, ghost, destructive)
- Input, Textarea, Select, Checkbox, Radio, Switch
- Card, Tabs, Accordion, Dialog, Sheet, Drawer
- Table, DataTable, Pagination
- Form, Label, Fieldset
- Toast, Alert, AlertDialog
- Dropdown Menu, Context Menu, Popover, Tooltip
- Avatar, Badge, Separator, Skeleton
- Command palette untuk admin

### 11.3 Custom Components

- PriceBreakdown
- MeasurementForm
- ConfiguratorShell
- SceneController
- RealtimeStatusPill
- OrderTimeline
- ProductionKanbanCard
- ChatBubble
- CurrencySwitcher
- LocaleSwitcher
- FabricSwatch
- ColorSwatch

### 11.4 Layout Grid

- Container max width 1280 px
- Kolom: 12 desktop, 8 tablet, 4 mobile
- Gutter: 24 desktop, 16 tablet, 16 mobile
- Section spacing: 64 sampai 96 px desktop, 40 sampai 56 px mobile

### 11.5 Anti-Pattern Checklist

Dilarang menggunakan:

- Vague hero text
- Fake counters
- Fake reviews
- Fake metrics
- Pill shaped buttons
- Emoji icons
- AI-generated images
- AI slop copy
- Tag "made with AI"
- Dark patterns
- Animasi tanpa fungsi UX
- Informasi palsu untuk social proof

Setiap komponen baru wajib melewati checklist ini sebelum merge.

---

## 12. Responsive Web Design dan Fluid Grid Layout

### 12.1 Prinsip Dasar

Platform Endew Fashion Style menerapkan **Responsive Web Design (RWD)** dengan pendekatan **Fluid Grid Layout**, yaitu tata letak yang menggunakan ukuran relatif seperti persentase, unit viewport, `rem`, `em`, `fr`, dan `clamp()` alih-alih ukuran tetap dalam pixel. Tujuannya adalah agar setiap elemen halaman dapat meregang atau menyusut secara proporsional mengikuti ukuran viewport perangkat, sehingga tampilan tetap utuh, proporsional, dan nyaman digunakan di semua ukuran layar.

Pendekatan ini bukan sekadar mengecilkan tampilan desktop untuk layar kecil. Mobile diperlakukan sebagai pengalaman utama tersendiri, dengan struktur informasi, urutan konten, ukuran interaksi, dan beban visual yang dirancang khusus untuk layar sentuh.

### 12.2 Mengapa Fluid Grid Layout, Bukan Fixed Layout

- **Ukuran tetap dalam pixel** membuat elemen pecah atau overflow ketika viewport lebih kecil dari lebar yang ditentukan.
- **Ukuran relatif** memungkinkan layout, tipografi, spacing, dan komponen menyesuaikan diri terhadap lebar atau tinggi viewport tanpa memerlukan banyak breakpoint.
- **Kombinasi fluid layout dengan breakpoint** memberikan kontrol presisi untuk kasus khusus (misalnya perubahan struktur navigasi pada mobile), sementara fluid layout menangani penyesuaian halus di antara breakpoint.

### 12.3 Unit Relatif yang Digunakan

| Unit | Kegunaan Utama |
|---|---|
| `%` | Lebar kolom, gambar, kontainer |
| `fr` | Grid track pada CSS Grid |
| `rem` | Tipografi, spacing, radius, mengikuti root font size |
| `em` | Spacing kontekstual dalam komponen |
| `vw` / `vh` | Section hero, tinggi viewport, elemen layar penuh |
| `svh` / `dvh` | Tinggi viewport aman pada mobile (mengakomodasi address bar dinamis) |
| `vmin` / `vmax` | Elemen yang menyesuaikan orientasi |
| `clamp()` | Tipografi dan spacing fluid dengan batas minimum dan maksimum |
| `min()` / `max()` | Batas dinamis untuk ukuran komponen |

Aturan: tidak boleh memakai satuan `px` untuk layout utama, tipografi, atau spacing. `px` hanya boleh digunakan pada border tipis, hairline, atau nilai teknis yang tidak memengaruhi fleksibilitas layout.

### 12.4 Breakpoint yang Diterapkan

Pendekatan mobile-first. Base style dirancang untuk mobile, kemudian ditingkatkan untuk layar lebih besar melalui `min-width` media query.

| Nama | Rentang Viewport | Fokus |
|---|---|---|
| Base (Mobile Small) | 320 sampai 480 px | Handphone kecil dan sedang |
| Mobile Large | 481 sampai 767 px | Handphone besar, phablet |
| Tablet | 768 sampai 1023 px | Tablet portrait |
| Desktop Small | 1024 sampai 1279 px | Laptop kecil, tablet landscape |
| Desktop | 1280 sampai 1535 px | Laptop dan desktop umum |
| Desktop Large | 1536 px ke atas | Monitor besar, desktop wide |

Breakpoint bukan sekadar titik potong, melainkan titik di mana struktur layout berubah (misalnya grid 1 kolom menjadi 2 kolom, navigasi horizontal menjadi drawer).

### 12.5 Container dan Grid

- **Container:** lebar maksimum 1280 px dengan padding horizontal fluid menggunakan `clamp()` antara 16 px dan 32 px.
- **Grid:** 4 kolom mobile, 8 kolom tablet, 12 kolom desktop, dengan gutter fluid.
- **Grid fluid:** menggunakan `grid-template-columns` dengan `repeat(auto-fit, minmax(...))` dan `fr` untuk membuat kolom yang meregang otomatis.
- **Konten maksimum:** paragraf dibatasi sekitar 65 sampai 75 karakter per baris untuk keterbacaan.
- **Aspect ratio:** gambar dan media menggunakan `aspect-ratio` untuk menjaga proporsi pada setiap ukuran.

### 12.6 Tipografi Fluid

- Ukuran font utama menggunakan `clamp(min, fluid, max)` sehingga otomatis menyesuaikan antara ukuran minimum untuk mobile dan maksimum untuk desktop tanpa memerlukan media query tambahan.
- Contoh konsep (bukan implementasi): heading utama memiliki rentang antara sekitar 32 px sampai 72 px, body antara sekitar 16 px sampai 18 px.
- Line height tetap proporsional: 1.5 untuk body, 1.2 untuk heading.
- Letter spacing untuk display text disesuaikan negatif halus pada layar besar.

### 12.7 Spacing Fluid

- Spacing antar section, antar komponen, dan dalam komponen menggunakan `clamp()` atau kelipatan `rem` yang diperkecil pada mobile.
- Section spacing direduksi pada mobile untuk mengurangi scroll panjang tanpa menghilangkan kejelasan hierarki.

### 12.8 Gambar dan Media

- Semua gambar menggunakan `next/image` dengan `sizes` yang tepat dan format modern (WebP/AVIF).
- Gambar 3D dan texture dimuat dengan resolusi yang menyesuaikan device pixel ratio dan lebar viewport.
- Media menggunakan `aspect-ratio` dan `object-fit` untuk mencegah distorsi.
- Video dan animasi berat hanya dimuat pada tier perangkat yang mendukung.

### 12.9 Penyesuaian Otomatis untuk Layar Handphone

Ini merupakan bagian paling kritis. Berikut penyesuaian yang wajib diterapkan ketika viewport berada pada rentang handphone:

#### 12.9.1 Viewport dan Meta

- `meta viewport` menggunakan `width=device-width, initial-scale=1` tanpa melarang zoom.
- `viewport-fit=cover` diterapkan agar konten aman pada perangkat dengan notch atau punch hole.
- Menggunakan `env(safe-area-inset-*)` untuk padding pada area notch dan gesture bar.

#### 12.9.2 Navigasi Mobile

- Navigasi utama berubah menjadi **bottom navigation bar** atau **drawer** yang dapat dipicu dari header.
- Target sentuh minimal 44 x 44 px untuk setiap item navigasi.
- Menu tetap dapat diakses dengan ibu jari tanpa harus menjangkau bagian atas layar.
- Header sticky dengan tinggi terkontrol agar tidak memakan ruang vertikal berlebih.

#### 12.9.3 Layout Konten Mobile

- Grid otomatis beralih ke satu kolom untuk katalog, detail produk, dan form.
- Sidebar dan filter berubah menjadi sheet atau drawer yang muncul dari bawah atau samping.
- Urutan konten diubah menggunakan `order` pada flex atau grid agar informasi penting muncul lebih dulu.
- Kartu produk menampilkan informasi inti (nama, harga, thumbnail) tanpa memerlukan scroll horizontal.

#### 12.9.4 Tipografi Mobile

- Ukuran font body tidak kurang dari 16 px untuk mencegah zoom otomatis pada input iOS.
- Jarak antar baris cukup longgar untuk kenyamanan membaca di layar kecil.
- Heading utama tidak mendominasi sehingga mendorong CTA keluar dari layar pertama.

#### 12.9.5 Touch Interaction

- Semua elemen interaktif memiliki ukuran minimum 44 x 44 px.
- Jarak antar target sentuh minimal 8 px untuk mengurangi salah tekan.
- Gunakan `touch-action` yang sesuai untuk mencegah konflik antara scroll dan gesture.
- Gesture pada 3D viewer (rotate, zoom, pan) dipetakan ke touch satu jari, dua jari, dan pinch.
- Double-tap zoom dinonaktifkan pada elemen kontrol tertentu menggunakan `touch-action: manipulation`.

#### 12.9.6 Form Mobile

- Input dikelompokkan dalam satu kolom penuh.
- `inputmode` dan `type` yang sesuai (numeric, tel, email) agar keyboard yang muncul tepat.
- `autocomplete` diaktifkan untuk mempercepat pengisian.
- Validasi realtime dengan pesan error yang jelas dan terbaca.
- Tombol submit menempel di bagian bawah layar (sticky) bila form panjang.

#### 12.9.7 3D Canvas pada Mobile

- Canvas mengikuti lebar container 100 persen dan tinggi berdasarkan `aspect-ratio`.
- Pixel ratio dibatasi maksimum 2 untuk mengurangi beban GPU.
- Scene menggunakan LOD lebih rendah dibanding desktop.
- Post-processing dimatikan.
- Jumlah dynamic light dikurangi menjadi satu.
- Animasi scroll disederhanakan, kamera bergerak lebih halus dan lebih pendek.
- Render loop dijeda ketika canvas tidak terlihat pada viewport.
- Jika performa tidak memadai, sistem otomatis turun ke mode 2D fallback.

#### 12.9.8 Tabel dan Data Padat (Admin)

- Tabel data diubah menjadi **card list** pada mobile, dengan informasi utama di bagian atas dan detail dapat diperluas.
- Kolom prioritas ditampilkan; kolom sekunder tersembunyi dan dapat dibuka.
- Filter dan pencarian dipindahkan ke sheet yang dapat diakses dari toolbar.
- Pagination diganti infinite scroll atau "load more" agar nyaman di layar kecil.

#### 12.9.9 Notifikasi dan Feedback

- Toast muncul di bagian bawah layar dengan lebar hampir penuh.
- Dialog besar diubah menjadi sheet dari bawah.
- Confirm dialog tetap di tengah dengan tinggi terkontrol.
- Skeleton loading disesuaikan dengan ukuran konten mobile.

#### 12.9.10 Performa Mobile

- Bundle JavaScript mobile dioptimalkan dengan code splitting.
- Gambar dan 3D asset dimuat hanya ketika masuk viewport.
- Prefetch hanya untuk route yang relevan dengan konteks pengguna.
- Font subset dan preload untuk mengurangi FOIT.
- Lazy load untuk komponen berat seperti chat dan peta.

#### 12.9.11 Orientasi Layar

- Layout diuji pada orientasi portrait dan landscape.
- Konten penting tetap dapat diakses pada landscape meski tinggi viewport terbatas.
- 3D scrollytelling pada landscape mobile mengurangi tinggi canvas agar konten tetap terlihat.

#### 12.9.12 Aksesibilitas Mobile

- Kontras warna tetap memenuhi WCAG AA.
- Focus state terlihat jelas untuk pengguna dengan keyboard eksternal.
- Text dapat diperbesar tanpa merusak layout hingga 200 persen.
- Motion dikurangi bila pengguna mengaktifkan Reduced Motion.
- Semua informasi tetap tersedia tanpa mengandalkan gesture eksklusif.

### 12.10 Container Queries

- Komponen kompleks (kartu produk, kartu production, chat bubble) menggunakan **container queries** agar dapat menyesuaikan diri terhadap lebar parent, bukan hanya viewport.
- Ini memungkinkan komponen yang sama tampil optimal di sidebar, grid, atau drawer tanpa duplikasi style.

### 12.11 Testing Responsif

- Pengujian manual pada perangkat nyata: Android mid-range, Android flagship, iPhone SE, iPhone standar, iPhone Pro Max, tablet Android, iPad, laptop, dan monitor besar.
- Pengujian emulator dan browser DevTools untuk memverifikasi fluid behavior pada rentang viewport kontinu.
- Pengujian orientasi (portrait dan landscape).
- Pengujian dengan berbagai skala text size sistem (small, default, large, extra large).
- Pengujian dengan Reduced Motion aktif.

### 12.12 Prinsip yang Tidak Boleh Dilanggar

- Tidak menggunakan fixed width untuk layout utama.
- Tidak menyembunyikan fungsi penting hanya karena layar kecil.
- Tidak mengandalkan hover untuk informasi kritis.
- Tidak memaksa zoom user dengan `maximum-scale=1` atau `user-scalable=no`.
- Tidak menggunakan scroll horizontal pada konten utama.
- Tidak mengasumsikan rasio layar tertentu.
- Tidak mengunci tinggi container utama dengan satuan `px` yang tidak fleksibel.
- Tidak mengabaikan safe area pada perangkat dengan notch.

### 12.13 Acceptance Criteria Responsif

Suatu halaman atau komponen dinyatakan lolos uji responsif apabila:

- Layout tidak mengalami overflow horizontal pada viewport 320 px.
- Semua konten terbaca tanpa perlu zoom.
- Semua target sentuh memenuhi ukuran minimum.
- Grid dan tipografi menyesuaikan secara proporsional antara 320 px dan 1920 px.
- 3D canvas tetap interaktif dan performan pada mobile mid-range.
- Fallback 2D muncul ketika perangkat tidak mendukung WebGL secara memadai.
- Navigasi dapat dioperasikan dengan satu tangan pada handphone.
- Tidak ada elemen yang tertutup oleh notch, gesture bar, atau address bar.
- Orientasi landscape tidak memecah layout kritis.
- Reduced Motion dihormati.

---

## 13. Internationalization dan Currency

### 13.1 Language

- Primary: Bahasa Indonesia
- Secondary: English
- Library: next-intl
- Routing locale prefix: `/id/...` dan `/en/...`
- Semua copy dari `messages/id.json` dan `messages/en.json`
- Format tanggal dan angka mengikuti locale
- Metadata SEO per locale

### 13.2 Currency

- Base currency: IDR
- Secondary display: USD
- Sumber rate: API eksternal plus cache di tabel ExchangeRate
- Rate di-snapshot di order saat checkout
- Format sesuai locale dan currency
- Checkout tetap dalam IDR untuk payment gateway lokal
- Harga transaksi yang telah dibuat bersifat immutable

---

## 14. Security

### 14.1 Authentication

- Password policy kuat
- Verifikasi email untuk aksi sensitif
- Rate limit pada endpoint auth
- Rotasi session
- Device log untuk login penting

### 14.2 Authorization

- RBAC granular
- RLS Supabase pada semua tabel user-related
- Server-side check pada setiap mutasi
- Middleware guard untuk route admin

### 14.3 Data Protection

- Enkripsi transit TLS
- Secret via environment variable, tidak hard-coded
- PII minimal
- Log tanpa PII sensitif

### 14.4 Upload Security

- Validasi tipe MIME dan ekstensi
- Batas ukuran file
- Scan virus bila tersedia
- Simpan di Supabase Storage dengan signed URL
- Akses file hanya via URL bertanda tangan

### 14.5 Payment Security

- Verifikasi signature webhook Midtrans
- Idempotency key pada order creation
- Validasi jumlah pembayaran terhadap order
- Log setiap event payment
- Tidak menyimpan data kartu

### 14.6 Audit

- Semua aksi kritis dicatat
- Audit log append-only
- Retensi sesuai kebijakan internal

---

## 15. SEO dan Performance

### 15.1 SEO

- Metadata dinamis per produk dan kategori
- Struktur URL bersih dan deskriptif
- Sitemap otomatis
- robots.txt mengecualikan /admin dan /account
- Open Graph image per produk
- Structured data: Product, BreadcrumbList, Organization
- Canonical URL
- Hreflang untuk id dan en
- Copy unik, bukan AI slop
- Canonical domain menggunakan `https://endewfashion.web.id`

### 15.2 Performance

- Server Components sebagai default
- Route-level code splitting
- 3D asset lazy load hanya ketika canvas masuk viewport
- Image optimization via next/image
- Font subset dan preload
- Cache-Control tepat
- ISR untuk halaman katalog
- Dynamic rendering untuk halaman account dan admin
- Target Core Web Vitals: LCP < 2.5 s, INP < 200 ms, CLS < 0.1

### 15.3 Accessibility

- Kontras minimal WCAG AA
- Focus visible di semua elemen interaktif
- Keyboard navigasi penuh
- ARIA label pada ikon dan kontrol kustom
- Form error diumumkan ke screen reader
- Reduced Motion dihormati
- Informasi tidak hanya dari warna
- Alt text deskriptif dari database

---

## 16. Observability dan Operations

### 16.1 Logging

- Structured logging server-side
- Log level: error, warn, info, debug
- Correlation ID per request
- Redaction untuk PII

### 16.2 Error Tracking

- Integrasi error monitoring
- Source map untuk production
- Alert untuk error rate tinggi
- Grouping berdasarkan stack

### 16.3 Metric

- Realtime connection success rate
- API latency p50, p95, p99
- 3D render FPS pada tier perangkat
- Conversion rate configurator ke order
- Payment success rate

### 16.4 Backup dan Recovery

- Backup harian database
- Retensi 30 hari minimum
- Prosedur restore terdokumentasi dan diuji
- Backup konfigurasi storage

### 16.5 Deployment

- Environment: development, staging, production
- Domain production: `endewfashion.web.id`
- Domain staging: `staging.endewfashion.web.id`
- CI menjalankan lint, typecheck, test, build
- Migration Prisma dijalankan terkontrol
- Rollback strategy

---

## 17. Roadmap Implementasi

Platform dikembangkan secara bertahap, tetapi arsitektur enterprise disiapkan sejak awal. Setiap fase memiliki dependency, acceptance criteria, dan gate sebelum fase berikutnya dimulai.

### 17.1 Urutan Fase

```
Phase 0 -> Phase 1 -> Phase 2 -> Phase 3 -> Phase 4 -> Phase 5
```

### 17.2 Phase 0: Architecture dan Foundation

Tujuan: membangun fondasi yang menjadi dependency seluruh fase berikutnya.

Scope:

1. Inisialisasi Next.js App Router dengan TypeScript
2. Setup Tailwind, ShadcnUI, design token
3. Setup Supabase project (Auth, Database, Storage, Realtime)
4. Setup Prisma dan koneksi database
5. Struktur folder, route group kosong, layout dasar
6. Auth foundation plus middleware
7. RBAC foundation
8. Validasi dan error handling global
9. Logging dan observability dasar
10. Environment variable strategy
11. CI pipeline dasar: lint, typecheck, build
12. Aksesibilitas base
13. Fondasi Responsive Web Design: meta viewport, container fluid, breakpoint, unit relatif

Acceptance Criteria:

- Development environment berjalan
- Production build berhasil
- Supabase terhubung
- Prisma terhubung
- Database foundation tersedia
- Auth dan authorization foundation tersedia
- Storage foundation tersedia
- Design token tersedia
- ShadcnUI foundation tersedia
- Tidak ada secret hard-coded
- Layout dasar responsif dan fluid dari 320 px hingga 1920 px

Output: Stable Technical Foundation.

### 17.3 Phase 1: Foundation dan Core MTO

Dependency: Phase 0.

Scope:

1. Auth lengkap
2. Profil customer
3. Katalog produk
4. Product detail
5. Fabric dan color system
6. Measurement profile
7. Konfigurator dasar
8. 3D Viewer
9. 3D Scrollytelling
10. Dynamic pricing
11. Cart
12. Checkout
13. Midtrans integration plus DP
14. Order creation dan riwayat
15. Admin panel dasar

Urutan internal:

```
Auth -> User/Profile -> Product -> Fabric/Material -> Measurement
  -> Configuration -> 3D Viewer -> 3D Scrollytelling -> Pricing
  -> Cart -> Checkout -> Payment -> Order -> Basic Admin
```

Gate ke Phase 2: seluruh alur customer sampai order end-to-end berjalan, termasuk pada viewport handphone.

Output: Customer sampai Order end-to-end.

### 17.4 Phase 2: Production dan Realtime

Dependency: Phase 0 plus Phase 1.

Scope:

1. Production workflow
2. Live Production Tracker
3. Supabase Realtime foundation
4. Admin realtime dashboard
5. Notification system
6. Order timeline
7. Inventory management
8. Reconnect dan fallback

Urutan internal:

```
Order -> Production Workflow -> Production Status -> Inventory
  -> Realtime Events -> Customer Tracker -> Admin Dashboard -> Notifications
```

Gate ke Phase 3: `Order -> Approved -> Production -> Realtime Update -> Customer Tracking` berhasil, termasuk pada mobile.

Output: Order, Production, Realtime Tracking.

### 17.5 Phase 3: Advanced Customization

Dependency: Phase 1 plus Phase 2.

Scope:

1. Custom Request end-to-end
2. Upload dan storage
3. Tailor review workflow
4. Revision dan approval
5. Advanced garment option
6. Advanced 3D configuration
7. Advanced Scrollytelling scene

Urutan internal:

```
Custom Request -> Upload -> Review -> Discussion -> Revision
  -> Approval -> Advanced Configuration -> 3D Preview
  -> Final Configuration -> Order/Production
```

Gate ke Phase 4: workflow custom request sampai order berhasil, termasuk upload dari perangkat mobile.

Output: Template MTO plus Custom MTO.

### 17.6 Phase 4: Communication dan Business Intelligence

Dependency: Phase 2 plus Phase 3.

Scope:

1. Live chat
2. Customer support workflow
3. Analytics module
4. Reporting module
5. Export
6. Integrasi data lintas domain

Urutan internal:

```
Customer/Admin Communication -> Message Data -> Support Workflow
  -> Event/Data Collection -> Analytics Model -> Dashboard -> Reporting
```

Gate ke Phase 5: communication layer dan analytics menggunakan data aktual.

Output: Communication plus Operational Intelligence.

### 17.7 Phase 5: Optimization dan Enterprise Hardening

Dependency: Phase 1, 2, 3, dan 4.

Scope:

1. Security hardening
2. Performance optimization
3. SEO optimization
4. Accessibility refinement
5. Mobile optimization lanjutan
6. Caching strategy
7. Observability lengkap
8. Backup dan recovery
9. 3D optimization lanjutan
10. Production deployment hardening

Urutan internal:

```
Security Hardening -> Performance -> Accessibility -> SEO
  -> Observability -> Backup/Recovery -> 3D Optimization
  -> Mobile Optimization -> Production Hardening -> Final Validation
```

Final Gate: seluruh area lolos validasi (Functionality, Security, Performance, Accessibility, SEO, Realtime Reliability, 3D Reliability, Observability, Backup/Recovery, Responsive).

Output: Production-Ready Enterprise MTO Platform.

### 17.8 Dependency Matrix

| Phase | Dependency Utama | Tidak Boleh Dimulai Sebelum |
|---|---|---|
| Phase 0 | Tidak ada | Project scope ditetapkan |
| Phase 1 | Phase 0 | Foundation stabil |
| Phase 2 | Phase 0 + Phase 1 | Order, payment, admin dasar berjalan |
| Phase 3 | Phase 1 + Phase 2 | Configuration, storage, review, production foundation tersedia |
| Phase 4 | Phase 2 + Phase 3 | Production, customer, communication data tersedia |
| Phase 5 | Phase 1 + 2 + 3 + 4 | Seluruh core business workflow berjalan |

### 17.9 Critical Path

```
Architecture
  -> Auth dan RBAC
  -> Database
  -> Product
  -> Measurement
  -> MTO Configuration
  -> 3D Viewer
  -> 3D Scrollytelling
  -> Dynamic Pricing
  -> Cart
  -> Checkout
  -> Payment
  -> Order
  -> Production
  -> Realtime
  -> Custom Request
  -> Communication
  -> Analytics
  -> Security Hardening
  -> Performance
  -> Mobile Optimization
  -> Production Readiness
```

Tulang punggung bisnis: `Configuration -> Pricing -> Order -> Production`.

### 17.10 Parallel Development yang Diperbolehkan

Setelah Phase 0, dapat paralel:
- Catalog
- Auth
- Measurement
- 3D asset preparation
- Design system
- Responsive layout foundation

Setelah core order tersedia, dapat paralel:
- Production UI
- Realtime architecture
- Inventory UI
- Notification UI
- Mobile-specific components

Setelah custom request foundation tersedia, dapat paralel:
- Tailor review
- 3D advanced components
- Scrollytelling scene
- Custom request UI

Parallel development tidak boleh melewati dependency data dan authorization.

---

## 18. Definition of Done

Setiap fitur baru wajib memenuhi:

### 18.1 Functional

- Requirement feature terpenuhi
- Happy path berjalan
- Error path memiliki handling
- Empty state tersedia
- Loading state tersedia
- Success state tersedia

### 18.2 UI/UX

- Mengikuti Material Design
- Design token konsisten
- Responsive pada semua breakpoint, terutama handphone
- Fluid grid dan unit relatif diterapkan
- Accessible
- CTA jelas
- Tidak menggunakan fake information
- Tidak menggunakan prohibited design patterns

### 18.3 Data

- Data berasal dari source yang benar
- Validation diterapkan
- Authorization diterapkan
- Tidak terjadi inconsistent state

### 18.4 Security

- Authentication sesuai kebutuhan
- Authorization sesuai role
- Input tervalidasi
- Sensitive data terlindungi

### 18.5 Performance

- Asset hanya dimuat ketika dibutuhkan
- 3D menggunakan lazy loading
- Unnecessary render diminimalkan
- Mobile tetap usable

### 18.6 Realtime

- Subscription yang benar
- Authorization divalidasi
- Reconnect ditangani
- Duplicate event tidak corrupt state
- Fallback tersedia

### 18.7 Responsive

- Layout fluid dari 320 px hingga 1920 px
- Tidak ada overflow horizontal
- Touch target memenuhi ukuran minimum pada mobile
- 3D canvas menyesuaikan ukuran dan performa perangkat
- Orientasi portrait dan landscape diuji
- Safe area dihormati pada perangkat dengan notch

### 18.8 Production

Standar:

```
Implemented -> Validated -> Tested -> Security Checked
  -> Responsive Checked -> Accessibility Checked
  -> Performance Checked -> Production Ready
```

---

## 19. Development Setup

### 19.1 Prasyarat

- Node.js versi LTS
- npm
- PowerShell (environment Windows)
- Akun Supabase
- Akun Midtrans (sandbox untuk development)
- Git
- Domain `endewfashion.web.id` (untuk konfigurasi staging dan production)

### 19.2 Langkah Inisialisasi

Semua perintah dijalankan di PowerShell dari root project.

```
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

### 19.3 Menjalankan Development Server

```
npm run dev
```

Aplikasi berjalan di `http://localhost:3000`.

Untuk menguji tampilan mobile dari perangkat fisik pada jaringan lokal:

```
npm run dev -- --hostname 0.0.0.0
```

Kemudian akses `http://<IP-LOCAL-PC>:3000` dari handphone.

### 19.4 Prisma

Generate client:

```
npx prisma generate
```

Buat migration baru:

```
npx prisma migrate dev --name nama_migration
```

Terapkan migration di staging atau production:

```
npx prisma migrate deploy
```

Buka Prisma Studio:

```
npx prisma studio
```

Catatan: pada staging dan production wajib memakai migration, bukan `db push`.

---

## 20. Environment Variables

Buat file `.env.local` di root project. Semua secret tidak boleh di-commit ke repository.

Variabel yang dibutuhkan:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
DIRECT_URL=
MIDTRANS_SERVER_KEY=
MIDTRANS_CLIENT_KEY=
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=
MIDTRANS_IS_PRODUCTION=false
EXCHANGE_RATE_API_KEY=
NEXT_PUBLIC_APP_URL=https://endewfashion.web.id
```

Catatan:
- `SUPABASE_SERVICE_ROLE_KEY` hanya boleh dipakai di server
- `MIDTRANS_SERVER_KEY` hanya boleh dipakai di server
- `NEXT_PUBLIC_` prefix hanya untuk value yang aman terekspos ke client
- `NEXT_PUBLIC_APP_URL` menyesuaikan environment: `http://localhost:3000` untuk development, `https://staging.endewfashion.web.id` untuk staging, `https://endewfashion.web.id` untuk production

---

## 21. Scripts

Perintah npm yang tersedia:

| Script | Fungsi |
|---|---|
| `npm run dev` | Menjalankan development server |
| `npm run build` | Build production |
| `npm run start` | Menjalankan build production |
| `npm run lint` | Menjalankan ESLint |
| `npm run format` | Menjalankan Prettier |
| `npm run typecheck` | Menjalankan TypeScript check |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:migrate` | Jalankan migration development |
| `npm run prisma:deploy` | Deploy migration ke production |
| `npm run prisma:studio` | Buka Prisma Studio |

---

## 22. Quality Gate

Setiap phase memiliki gate yang harus lolos sebelum phase berikutnya dimulai:

| Gate | Kriteria |
|---|---|
| Phase 0 ke 1 | Fondasi stabil, build hijau, dan layout fluid berjalan |
| Phase 1 ke 2 | Order end-to-end berjalan termasuk pada mobile |
| Phase 2 ke 3 | Realtime tracking berjalan termasuk pada mobile |
| Phase 3 ke 4 | Custom request workflow berjalan termasuk upload dari mobile |
| Phase 4 ke 5 | Analytics dan komunikasi berjalan |
| Final | Seluruh kriteria production-ready terpenuhi |

Kriteria final:

```
Functionality
  + Security
  + Performance
  + Accessibility
  + SEO
  + Realtime Reliability
  + 3D Reliability
  + Responsive
  + Observability
  + Backup/Recovery
```

---

## 23. Kontribusi

Aturan kontribusi internal:

1. Setiap perubahan melalui pull request
2. Wajib melewati lint, typecheck, dan build
3. Wajib melalui anti-pattern checklist untuk UI
4. Wajib melalui pengujian responsif minimal pada viewport 320 px, 768 px, dan 1440 px
5. Wajib memiliki test untuk critical path
6. Wajib memperbarui dokumentasi bila mengubah schema, API, atau flow
7. Wajib menyertakan acceptance criteria pada deskripsi PR

Konvensi commit:

```
feat: tambah fitur
fix: perbaikan bug
chore: pekerjaan rutin
refactor: perbaikan struktur
docs: dokumentasi
test: penambahan atau perbaikan test
```

---

## 24. Lisensi

Hak cipta Endew Fashion Style. Seluruh hak dilindungi.
