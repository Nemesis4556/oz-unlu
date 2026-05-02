/**
 * main.js — Temel JS: Loader, Nav, Mobil Menü, Smooth Scroll, Reveal,
 *                    Dil Değişimi, Tema Değişimi, Çerez Banner, Teklif Formu
 * Öz Ünlü Yangın | Ckr Tech
 */

/* ═══════════════════════════════════════
   LOADER
═══════════════════════════════════════ */
(function initLoader() {
    // Sayfa açılışında kaydırmayı kilitliyoruz
    document.body.style.overflow = 'hidden';

    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        
        // KRİTİK ÇÖZÜM: Eğer bu sayfada loader HTML'i yoksa (örn: blog sayfaları)
        // kilidi hemen aç ve işlemi durdur. Sayfa kilitli kalmasın!
        if (!loader) {
            document.body.style.overflow = '';
            return;
        }

        // Eğer loader varsa animasyonu oynatıp kilidi öyle aç
        setTimeout(() => {
            loader.classList.add('done');
            document.body.style.overflow = '';
        }, 1400);
    });
})();

/* ═══════════════════════════════════════
   NAV SCROLL
═══════════════════════════════════════ */
(function initNavScroll() {
    const navbar    = document.getElementById('navbar');
    const bottomBar = document.getElementById('bottomBar');
    let ticking = false;

    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (ticking) return;
        requestAnimationFrame(() => {
            const y = window.scrollY;
            navbar.classList.toggle('scrolled', y > 60);
            if (bottomBar) bottomBar.classList.toggle('show', y > 400);
            ticking = false;
        });
        ticking = true;
    }, { passive: true });
})();

/* ═══════════════════════════════════════
   MOBİL MENÜ
═══════════════════════════════════════ */
(function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!menuToggle || !mobileMenu) return;

    function toggleMenu(open) {
        menuToggle.classList.toggle('open', open);
        mobileMenu.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
    }

    menuToggle.addEventListener('click', () => {
        toggleMenu(!mobileMenu.classList.contains('open'));
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) toggleMenu(false);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
            toggleMenu(false);
        }
    });
})();

/* ═══════════════════════════════════════
   SMOOTH SCROLL
═══════════════════════════════════════ */
(function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const offset = 90;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
})();

/* ═══════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════ */
(function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.rv').forEach(el => observer.observe(el));
})();

/* ═══════════════════════════════════════
   HERO PARALLAX
═══════════════════════════════════════ */
(function initHeroParallax() {
    const heroVisual = document.querySelector('.hero-visual');
    const hero       = document.querySelector('.hero');
    if (!heroVisual || !hero) return;
    if (!window.matchMedia('(min-width: 769px)').matches) return;

    hero.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth  - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        heroVisual.style.transform = `translate(${x}px, ${y}px)`;
    });

    hero.addEventListener('mouseleave', () => {
        heroVisual.style.transform = '';
    });
})();

/* ═══════════════════════════════════════
   DİL DEĞİŞİMİ (TR/EN)
═══════════════════════════════════════ */




/* ═══════════════════════════════════════
   ÇEREZ BANNER
═══════════════════════════════════════ */
(function initCookieBanner() {
    const banner = document.getElementById('cookieBanner');
    const acceptBtn = document.getElementById('cookieAccept');
    if (!banner) return;

    // Daha önce kabul edilmiş mi?
    const cookieAccepted = localStorage.getItem('cookieAccepted');
    
    if (!cookieAccepted) {
        // Bottom bar yüksekliğini hesapla ve banner'ı onun üstünde göster
        setTimeout(() => {
            banner.classList.add('show');
        }, 2000); // 2 saniye sonra göster
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookieAccepted', 'true');
            banner.classList.remove('show');
        });
    }

    // Ayarlar butonu (şimdilik sadece kabul et gibi çalışıyor, ileride modüle açılabilir)
    const settingsBtn = document.getElementById('cookieSettings');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            // Basit implementasyon: sadece kabul et
            localStorage.setItem('cookieAccepted', 'true');
            banner.classList.remove('show');
        });
    }
})();

/* ═══════════════════════════════════════
   TEKLİF FORMU — WhatsApp Entegrasyonu
═══════════════════════════════════════ */
(function initQuoteForm() {
    const form = document.getElementById('quoteForm');
    const submitBtn = document.getElementById('quoteSubmit');
    if (!form || !submitBtn) return;

    submitBtn.addEventListener('click', () => {
        const area = document.getElementById('quoteArea')?.value;
        const type = document.getElementById('quoteType')?.value;
        const capacity = document.getElementById('quoteCapacity')?.value;
        const quantity = document.getElementById('quoteQuantity')?.value;
        const note = document.getElementById('quoteNote')?.value;

        // Validasyon
        if (!area || !type || !capacity) {
            const lang = localStorage.getItem('lang') || 'tr';
            const msg = lang === 'tr' 
                ? 'Lütfen tüm zorunlu alanları doldurun.' 
                : 'Please fill in all required fields.';
            alert(msg);
            return;
        }

        const lang = localStorage.getItem('lang') || 'tr';
        
        // Mesaj oluştur
        let message;
        if (lang === 'tr') {
            message = `Merhaba Öz Ünlü Yangın ekibi,\n\nFiyat teklifi almak istiyorum:\n\n` +
                `📍 Kullanım Alanı: ${area}\n` +
                `🧯 Söndürücü Tipi: ${type}\n` +
                `⚖️ Kapasite: ${capacity}\n` +
                `📦 Adet: ${quantity}\n` +
                (note ? `\n📝 Ek Not: ${note}\n` : '') +
                `\nBilgi verir misiniz?`;
        } else {
            message = `Hello Öz Ünlü Yangın team,\n\nI would like to get a price quote:\n\n` +
                `📍 Usage Area: ${area}\n` +
                `🧯 Extinguisher Type: ${type}\n` +
                `⚖️ Capacity: ${capacity}\n` +
                `📦 Quantity: ${quantity}\n` +
                (note ? `\n📝 Additional Note: ${note}\n` : '') +
                `\nCould you provide information?`;
        }

        // WhatsApp URL oluştur
        const phone = '905327986434';
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

        // Yeni sekmede aç
        window.open(whatsappUrl, '_blank');
    });
    /* ═══════════════════════════════════════
   İNTERAKTİF HARİTA (TOOLTIP & BÖLGELER)
═══════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", function() {
    // Haritadaki grupları (g etiketlerini) ve tooltip kutusunu seç
    const provinceGroups = document.querySelectorAll('.turkey-map svg g');
    const tooltip = document.getElementById('map-tooltip');

    if (!tooltip || provinceGroups.length === 0) return;

    // --- 1. BÖLGE YÖNETİMİ (PLAKA KODLARI) ---
    const hqPlate = "45"; // Manisa (Merkez Ofis)
    const activePlates = [
        // Marmara Bölgesi
        "34", "22", "39", "59", "17", "41", "77", "54", "11", "16", "10",
        // Ege Bölgesi (45 Manisa hariç, o merkez)
        "35", "09", "20", "48", "03", "43", "64",
        // İç Anadolu Bölgesi
        "06", "42", "26", "38", "58", "71", "68", "70", "40", "51", "50", "66", "18"
    ];

    // --- 2. RENKLENDİRME VE İSİM GÖSTERİMİ ---
    provinceGroups.forEach(group => {
        const plaka = group.getAttribute('data-plakakodu');
        const ilAdi = group.getAttribute('data-iladi');
        const path = group.querySelector('path'); // Çizimin kendisi

        if (!path || !plaka) return; // Geçersiz etiketleri atla

        // JavaScript ile plakalara göre sınıfları otomatik dağıt
        if (plaka === hqPlate) {
            group.classList.add('hq-service');
        } else if (activePlates.includes(plaka)) {
            group.classList.add('active-service');
        }

        // Fare ilin sınırlarına girdiğinde (Hover)
        path.addEventListener('mouseenter', () => {
            if (ilAdi) {
                tooltip.textContent = ilAdi;
                tooltip.classList.add('visible');
            }
        });

        // Fare ilin üzerinde gezinirken (Tooltip Takibi)
        path.addEventListener('mousemove', (e) => {
            tooltip.style.left = (e.clientX + 15) + 'px';
            tooltip.style.top = (e.clientY + 15) + 'px';
        });

        // Fare ilin sınırlarından çıktığında
        path.addEventListener('mouseleave', () => {
            tooltip.classList.remove('visible');
        });
    });
});
})();