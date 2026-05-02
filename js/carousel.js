/**
 * carousel.js — Ürün Carousel + Galeri Scroll
 * Öz Ünlü Yangın | Ckr Tech
 *
 * Mantık:
 *  - Masaüstünde: Normal grid/flex görünüm
 *  - Mobil: scroll-snap'li yatay kaydırma + dot senkronizasyonu
 */

(function initCarousels() {
    
    /* ═══════════════════════════════════════
       ÜRÜN CAROUSEL
    ═══════════════════════════════════════ */
    const productGrid = document.querySelector('.products-grid');
    const productDots = document.querySelector('.products-grid + .carousel-dots, .carousel-dots');
    const productCards = productGrid ? productGrid.querySelectorAll('.product-card') : [];
    
    if (productGrid && productDots && productCards.length > 0) {
        const dotBtns = productDots.querySelectorAll('.carousel-dot');

        function getActiveProductIndex() {
            const scrollLeft = productGrid.scrollLeft;
            const cardWidth = productCards[0].offsetWidth + 16;
            return Math.round(scrollLeft / cardWidth);
        }

        function updateProductDots(index) {
            dotBtns.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        dotBtns.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                const cardWidth = productCards[0].offsetWidth + 16;
                productGrid.scrollTo({ left: cardWidth * i, behavior: 'smooth' });
            });
        });

        let productScrollTimer;
        productGrid.addEventListener('scroll', () => {
            clearTimeout(productScrollTimer);
            productScrollTimer = setTimeout(() => {
                updateProductDots(getActiveProductIndex());
            }, 50);
        }, { passive: true });

        const mqProduct = window.matchMedia('(max-width: 768px)');
        function setupProductCarousel() {
            if (mqProduct.matches) {
                productDots.style.display = 'flex';
                updateProductDots(0);
                productGrid.scrollLeft = 0;
            } else {
                productDots.style.display = 'none';
            }
        }
        mqProduct.addEventListener('change', setupProductCarousel);
        setupProductCarousel();
    }

    /* ═══════════════════════════════════════
       GALERİ SCROLL (Opsiyonel dot'lar)
    ═══════════════════════════════════════ */
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
        // Galeri için basit scroll progress indicator
        const galleryWrapper = galleryGrid.closest('.gallery-scroll-wrapper');
        
        if (galleryWrapper) {
            // Scroll progress bar
            const progressBar = document.createElement('div');
            progressBar.className = 'gallery-progress';
            progressBar.innerHTML = '<div class="gallery-progress-bar"></div>';
            galleryWrapper.appendChild(progressBar);

            // CSS ekle (inline olarak, mevcut CSS'e taşınabilir)
            const style = document.createElement('style');
            style.textContent = `
                .gallery-progress {
                    width: 100%;
                    height: 2px;
                    background: var(--border);
                    border-radius: 2px;
                    margin-top: 16px;
                    overflow: hidden;
                }
                .gallery-progress-bar {
                    height: 100%;
                    background: linear-gradient(90deg, var(--gold), var(--accent-light));
                    border-radius: 2px;
                    transition: width 0.1s linear;
                    width: 0%;
                }
            `;
            document.head.appendChild(style);

            galleryGrid.addEventListener('scroll', () => {
                const scrollWidth = galleryGrid.scrollWidth - galleryGrid.clientWidth;
                const scrolled = galleryGrid.scrollLeft;
                const progress = scrollWidth > 0 ? (scrolled / scrollWidth) * 100 : 0;
                progressBar.querySelector('.gallery-progress-bar').style.width = progress + '%';
            }, { passive: true });
        }
    }

})();