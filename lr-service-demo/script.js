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

    // --- 3. MENIU MOBIL ---
    const menuBtn = document.querySelector('#mobile-menu');
    const navMenu = document.querySelector('.hero-nav');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuBtn.classList.toggle('is-active');
        });

        document.querySelectorAll('.hero-nav a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuBtn.classList.remove('is-active');
            });
        });
    }

    // --- 4. CONTROL HARTĂ ---
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
window.addEventListener('load', function() {
    const form = document.getElementById('appointment-form');
    const status = document.getElementById('form-status');
    const currentLang = document.documentElement.lang; 

    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const nume = document.getElementById('name').value;
            const tel = document.getElementById('phone').value;
            const masina = document.getElementById('car-model').value;
            const data = document.getElementById('booking-date').value;
            const ora = document.getElementById('booking-time').value;

            if (tel.replace(/\s+/g, '').length < 6) {
                status.style.display = 'block';
                status.style.color = '#ff4d4d';
                status.innerText = (currentLang === 'ru') 
                    ? "⚠️ Пожалуйста, введите корректный номер телефона." 
                    : "⚠️ Te rugăm să introduci un număr de telefon valid.";
                return;
            }

            status.style.display = 'block';
            status.style.color = '#00ff85';
            status.innerText = (currentLang === 'ru')
                ? `✅ Спасибо, ${nume}! Открываем WhatsApp...`
                : `✅ Mulțumim, ${nume}! Se deschide WhatsApp...`;

            let mesaj;
            if(currentLang === 'ru') {
                mesaj = `Здравствуйте! Я ${nume}. Хочу записаться на сервис для Land Rover ${masina}. Дата: ${data}, Время: ${ora}. Тел: ${tel}`;
            } else {
                mesaj = `Salut! Sunt ${nume}. Doresc o programare pentru un Land Rover ${masina}. Data: ${data}, Ora: ${ora}. Tel: ${tel}`;
            }

            const url = `https://wa.me/37360400400?text=${encodeURIComponent(mesaj)}`;

            setTimeout(() => {
                window.open(url, '_blank');
            }, 1000);
        });
    }

    // Setare data minimă (azi)
    const dateInput = document.getElementById('booking-date');
    if(dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});

// --- 7. COOKIE BANNER ---
function acceptCookies() {
    localStorage.setItem('lr_cookies_accepted', 'true');
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.style.display = 'none';
}

window.addEventListener('load', function() {
    const banner = document.getElementById('cookie-banner');
    const isAccepted = localStorage.getItem('lr_cookies_accepted');
    if (!isAccepted && banner) {
        banner.style.display = 'flex';
    }
});