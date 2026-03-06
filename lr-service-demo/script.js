document.addEventListener('DOMContentLoaded', () => {

    // --- 1. FILTRARE GALERIE ---
    window.filterGallery = function(category, event) {
        const items = document.querySelectorAll('.gallery-item');
        const buttons = document.querySelectorAll('.filter-btn');
        
        buttons.forEach(btn => btn.classList.remove('active'));
        if (event) event.currentTarget.classList.add('active');
        
        items.forEach(item => {
            if (category === 'all' || item.classList.contains(category)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    };

    // --- 2. LIGHTBOX (Mărire poze) ---
    let lb = document.getElementById('lb-overlay');
    if (!lb) {
        lb = document.createElement('div');
        lb.id = 'lb-overlay';
        Object.assign(lb.style, {
            display: 'none', position: 'fixed', zIndex: '99999',
            top: '0', left: '0', width: '100%', height: '100%',
            background: 'rgba(0, 0, 0, 0.95)', alignItems: 'center',
            justifyContent: 'center', cursor: 'zoom-out'
        });
        lb.innerHTML = `<img id="lb-img" src="" style="max-width: 90%; max-height: 85vh; border-radius: 8px; box-shadow: 0 0 30px rgba(0,0,0,0.8); transform: scale(0.9); transition: transform 0.3s ease;">`;
        document.body.appendChild(lb);
    }

    const lbImg = document.getElementById('lb-img');
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                lbImg.src = img.src;
                lb.style.display = 'flex';
                setTimeout(() => { lbImg.style.transform = 'scale(1)'; }, 10);
                document.body.style.overflow = 'hidden';
            }
        });
    });

    lb.addEventListener('click', () => {
        lbImg.style.transform = 'scale(0.9)';
        setTimeout(() => {
            lb.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 200);
    });

    // --- 3. MENIU MOBIL (Singura versiune necesară) ---
    const menuBtn = document.querySelector('#mobile-menu');
    const navMenu = document.querySelector('.hero-nav');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuBtn.classList.toggle('is-active'); // Activează animația pentru X
        });

        // Închide meniul când dai click pe un link
        document.querySelectorAll('.hero-nav a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuBtn.classList.remove('is-active');
            });
        });
    }

    // --- 4. CONTROL HARTĂ (Previne scroll-ul nedorit) ---
    const mapWrapper = document.querySelector('.map-wrapper');
    const iframe = document.querySelector('.map-wrapper iframe');
    if(mapWrapper && iframe) {
        iframe.style.pointerEvents = 'none';
        mapWrapper.onclick = () => { iframe.style.pointerEvents = 'auto'; };
        mapWrapper.onmouseleave = () => { iframe.style.pointerEvents = 'none'; };
    }

    // --- 5. ACTUALIZARE AN FOOTER ---
    const y = document.getElementById('year');
    if(y) y.textContent = new Date().getFullYear();

});

// --- 6. FORMULAR PROGRAMARE ---
const bookingForm = document.getElementById('appointment-form');
const formStatus = document.getElementById('form-status');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const name = formData.get('name');
        formStatus.style.display = 'block';
        formStatus.style.color = '#00ff85';
        formStatus.textContent = `Mulțumim, ${name}! Te contactăm imediat.`;
        bookingForm.reset();
        setTimeout(() => { formStatus.style.display = 'none'; }, 5000);
    });
}
const yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}
function acceptCookies() {
    // Salvează în memoria browserului că utilizatorul a acceptat
    localStorage.setItem('lr_cookies_accepted', 'true');
    
    // Ascunde bannerul cu un efect vizual (opțional)
    const banner = document.getElementById('cookie-banner');
    if (banner) {
        banner.style.display = 'none';
    }
}

// Verificăm la încărcarea paginii dacă trebuie să afișăm bannerul
window.addEventListener('load', function() {
    const banner = document.getElementById('cookie-banner');
    const isAccepted = localStorage.getItem('lr_cookies_accepted');

    // Dacă NU a fost acceptat anterior și bannerul există în HTML, îl afișăm
    if (!isAccepted && banner) {
        banner.style.display = 'flex'; // Folosim 'flex' pentru alinierea elementelor din interior
    }
});