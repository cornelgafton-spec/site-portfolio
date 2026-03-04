document.addEventListener('DOMContentLoaded', () => {

    // --- 1. FILTRARE (Funcționează deja, o păstrăm curată) ---
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

    // --- 2. CREARE LIGHTBOX (Elementul de mărire) ---
    // Verificăm dacă există deja, dacă nu, îl creăm
    let lb = document.getElementById('lb-overlay');
    if (!lb) {
        lb = document.createElement('div');
        lb.id = 'lb-overlay';
        
        // Stiluri aplicate direct pentru a fi sigur că funcționează fără să modifici CSS
        Object.assign(lb.style, {
            display: 'none',
            position: 'fixed',
            zIndex: '99999',
            top: '0', left: '0',
            width: '100%', height: '100%',
            background: 'rgba(0, 0, 0, 0.95)',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'zoom-out'
        });
        
        lb.innerHTML = `<img id="lb-img" src="" style="max-width: 90%; max-height: 85vh; border-radius: 8px; box-shadow: 0 0 30px rgba(0,0,0,0.8); transform: scale(0.9); transition: transform 0.3s ease;">`;
        document.body.appendChild(lb);
    }

    const lbImg = document.getElementById('lb-img');

    // --- 3. ACTIVARE CLICK PE TOATE ELEMENTELE DIN GALERIE ---
    // Selectăm toate containerele de poze
    const allGalleryItems = document.querySelectorAll('.gallery-item');

    allGalleryItems.forEach(item => {
        // Punem click-ul pe tot containerul (astfel prindem și click-ul pe overlay)
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                lbImg.src = img.src;
                lb.style.display = 'flex';
                // Mic delay pentru a face animația de zoom
                setTimeout(() => { lbImg.style.transform = 'scale(1)'; }, 10);
                document.body.style.overflow = 'hidden'; // Oprește scroll-ul paginii
            }
        });
    });

    // --- 4. ÎNCHIDERE LIGHTBOX ---
    lb.addEventListener('click', () => {
        lbImg.style.transform = 'scale(0.9)';
        setTimeout(() => {
            lb.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 200);
    });

    // Actualizare An Footer
    const y = document.getElementById('year');
    if(y) y.textContent = new Date().getFullYear();
});
// GESTIONARE FORMULAR PROGRAMARE
const bookingForm = document.getElementById('appointment-form');
const formStatus = document.getElementById('form-status');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Oprește reîncărcarea paginii
        
        // Colectăm datele (opțional pentru test)
        const formData = new FormData(this);
        const name = formData.get('name');

        // Simulăm o trimitere
        formStatus.style.display = 'block';
        formStatus.style.color = '#005a2b';
        formStatus.textContent = `Mulțumim, ${name}! Programarea a fost trimisă. Te contactăm imediat.`;

        // Resetăm formularul
        bookingForm.reset();

        // Opțional: Ascundem mesajul după 5 secunde
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    });
}
// script.js
document.querySelector('.map-container').onclick = function() {
    this.querySelector('iframe').style.pointerEvents = 'auto';
};

document.querySelector('.map-container').onmouseleave = function() {
    this.querySelector('iframe').style.pointerEvents = 'none';
};
const wrapper = document.querySelector('.map-wrapper iframe');

// Dezactivează scroll-ul pe hartă la început
wrapper.style.pointerEvents = 'none';

// Activează harta doar când se dă click pe ea
document.querySelector('.map-wrapper').onclick = function() {
    wrapper.style.pointerEvents = 'auto';
};

// Dezactivează la loc când mouse-ul pleacă
document.querySelector('.map-wrapper').onmouseleave = function() {
    wrapper.style.pointerEvents = 'none';
};
document.addEventListener("DOMContentLoaded", function() {
    const iframe = document.querySelector('.map-wrapper iframe');
    if(iframe) {
        iframe.style.pointerEvents = 'none';
        document.querySelector('.map-wrapper').onclick = () => {
            iframe.style.pointerEvents = 'auto';
        };
    }
});
function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    menu.classList.toggle('active');
}
document.getElementById('mobile-menu').addEventListener('click', function() {
    document.querySelector('.nav-list').classList.toggle('active');
});