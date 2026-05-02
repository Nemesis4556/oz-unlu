# Öz Ünlü Yangın — Proje Yapısı
**Ckr Tech** tarafından geliştirilmiştir.

---

## 📁 Klasör Yapısı

```
ozunlu-yangin/
│
├── index.html              ← Yalnızca HTML markup (stil/script yok)
│
├── css/
│   ├── base.css            ← CSS değişkenleri, reset, yardımcı sınıflar, animasyonlar
│   ├── layout.css          ← Loader, Navigasyon, Mobil Menü, Bottom Bar
│   └── sections.css        ← Hero, Stats, Features, Products (carousel), PASS, Contact
│
├── js/
│   ├── main.js             ← Loader, nav scroll, mobil menü, smooth scroll, reveal
│   └── carousel.js         ← Ürün carousel: mobil yatay kaydırma + dot göstergesi
│
└── assets/
    └── images/             ← Yerel görseller buraya eklenir
        └── .gitkeep
```

---

## 🎯 Her Dosyanın Sorumluluğu

### `index.html`
- Sadece HTML yapısı ve içerik
- `<style>` veya `<script>` bloğu yok
- Tüm CSS ve JS dosyaları dışarıdan bağlanır
- Erişilebilirlik için `aria-*` attribute'ları eklenmiştir

### `css/base.css`
- CSS custom property'ler (renk, font, easing paleti)
- Evrensel reset
- `.btn-lux`, `.lux-container`, `.section-header` gibi paylaşılan sınıflar
- Tüm `@keyframes` animasyonları (tek yerde!)
- `.rv` scroll-reveal sınıfı

### `css/layout.css`
- Sayfa iskeleti: Loader, Nav, Hamburger, Mobil Menü, Bottom Bar
- Bunların responsive halleri

### `css/sections.css`
- Hero, Stats, Features, Products, PASS, Contact bölümlerinin stilleri
- **Ürün grid responsive sistemi:**
  - `>1024px` → 4 sütun grid
  - `768–1024px` → 2 sütun grid
  - `<768px` → yatay scroll carousel (scroll-snap, parmakla kaydırma)
  - `<480px` → carousel kartları biraz daha geniş

### `js/main.js`
- Loader gizleme
- Nav scroll efekti (blur, border)
- Mobil menü aç/kapat (ESC ve dışına tıklama desteği)
- Smooth scroll
- IntersectionObserver ile scroll reveal

### `js/carousel.js`
- Sadece `<768px` ekranlarda çalışır
- Scroll pozisyonuna göre aktif dot'u günceller
- Dot'a tıklayınca ilgili karta animasyonlu kaydırma yapar

---

## 📱 Responsive Kırılma Noktaları

| Ekran           | Ürün Grid         | Nav              |
|-----------------|-------------------|------------------|
| > 1024px        | 4 sütun grid      | Tam menü + CTA   |
| 768px – 1024px  | 2 sütun grid      | Tam menü + CTA   |
| < 768px         | Yatay carousel    | Hamburger menü   |
| < 480px         | Carousel (geniş)  | Hamburger menü   |

---

## 🚀 Geliştirme İpuçları

### Yeni ürün eklemek:
`index.html` içindeki `products-grid` div'ine yeni `<article class="product-card rv">` bloğu ekle, `carousel.js`'deki dot sayısını güncelle.

### Yeni CSS bölümü eklemek:
`css/` klasörüne yeni bir `.css` dosyası oluştur, `index.html` `<head>` kısmına link ekle.

### Renk değiştirmek:
`css/base.css` başındaki `:root` bloğunu düzenle — tüm site otomatik güncellenir.

### Görsel eklemek:
`assets/images/` klasörüne koy, `index.html` içindeki `src` attribute'unu güncelle.

---

## ✅ Yapılabilecek Sonraki Adımlar

- [ ] Gerçek ürün fotoğrafları `assets/images/` klasörüne eklenmeli
- [ ] Gerçek telefon numarası tüm yerlerde güncellenmeli (`+90 500 000 00 00` playholder'lar)
- [ ] `favicon.ico` kök dizine eklenmeli
- [ ] Google Analytics / Meta Pixel entegrasyonu
- [ ] Schema.org LocalBusiness JSON-LD (SEO)
- [ ] KVKK/Cookie banner

---

*© 2026 Öz Ünlü Yangın · Designed by Ckr Tech*
