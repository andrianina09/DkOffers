// ============================================================
// 1. TABLEAU DES OFFRES
// ============================================================
const offers = [
    {
        id: 1,
        icon: '₿',
        title: 'Binance',
        desc: 'Offer description',
        link: 'https://my.mylead.global/...' 
    },
    {
        id: 2,
        icon: '📊',
        title: 'Surveoo',
        desc: 'Offer description',
        link: 'https://my.mylead.global/...'
    },
    {
        id: 3,
        icon: '❤️',
        title: 'OnThatAss Smartlink',
        desc: 'Offer description',
        link: 'https://my.mylead.global/...'
    },
    {
        id: 4,
        icon: '💕',
        title: 'Gentlove Smartlink',
        desc: 'Offer description',
        link: 'https://my.mylead.global/...'
    },
    // Ajoute ici d'autres offres...
];

// ============================================================
// 2. GÉNÉRATION DES CARTES
// ============================================================
const track = document.getElementById('carouselTrack');
const indicatorsContainer = document.getElementById('indicators');

function renderCards() {
    track.innerHTML = '';
    offers.forEach((offer, index) => {
        const card = document.createElement('div');
        card.className = 'offer-card';
        card.innerHTML = `
            <div class="offer-icon">${offer.icon}</div>
            <div class="offer-title">${offer.title}</div>
            <div class="offer-desc">${offer.desc}</div>
            <a href="${offer.link}" target="_blank" class="offer-btn">Complete Offer</a>
        `;
        track.appendChild(card);
    });
}

// ============================================================
// 3. CARROUSEL - LOGIQUE DE DÉFILEMENT
// ============================================================
let currentIndex = 0;
let cardsPerView = 3; // sera recalculé au resize
let totalCards = offers.length;

// Calcul du nombre de cartes visibles selon la largeur
function getCardsPerView() {
    const width = window.innerWidth;
    if (width < 600) return 1;
    if (width < 992) return 2;
    return 3;
}

// Mise à jour de la position du track
function updateCarousel() {
    const containerWidth = track.parentElement.clientWidth;
    const gap = 20; // correspond au gap du flex
    const cardWidth = (containerWidth - (cardsPerView - 1) * gap) / cardsPerView;
    const offset = currentIndex * (cardWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;
    updateIndicators();
}

// Indicateurs (dots)
function renderIndicators() {
    const dotsCount = Math.ceil(totalCards / cardsPerView);
    indicatorsContainer.innerHTML = '';
    for (let i = 0; i < dotsCount; i++) {
        const dot = document.createElement('button');
        dot.className = 'dot';
        dot.dataset.index = i;
        dot.addEventListener('click', () => {
            currentIndex = i * cardsPerView;
            // Limiter pour ne pas dépasser le nombre total
            if (currentIndex + cardsPerView > totalCards) {
                currentIndex = totalCards - cardsPerView;
            }
            if (currentIndex < 0) currentIndex = 0;
            updateCarousel();
        });
        indicatorsContainer.appendChild(dot);
    }
}

function updateIndicators() {
    const dots = indicatorsContainer.querySelectorAll('.dot');
    const activeDotIndex = Math.floor(currentIndex / cardsPerView);
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeDotIndex);
    });
}

// Navigation
document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentIndex - cardsPerView >= 0) {
        currentIndex -= cardsPerView;
    } else {
        currentIndex = 0;
    }
    updateCarousel();
});

document.getElementById('nextBtn').addEventListener('click', () => {
    const maxIndex = totalCards - cardsPerView;
    if (currentIndex + cardsPerView < totalCards) {
        currentIndex += cardsPerView;
        if (currentIndex > maxIndex) currentIndex = maxIndex;
    } else {
        currentIndex = maxIndex;
    }
    if (currentIndex < 0) currentIndex = 0;
    updateCarousel();
});

// Recalcul au resize
window.addEventListener('resize', () => {
    const newCardsPerView = getCardsPerView();
    if (newCardsPerView !== cardsPerView) {
        cardsPerView = newCardsPerView;
        // Réinitialiser l'index pour éviter un dépassement
        if (currentIndex + cardsPerView > totalCards) {
            currentIndex = Math.max(0, totalCards - cardsPerView);
        }
        renderIndicators();
        updateCarousel();
    }
});

// ============================================================
// 4. INITIALISATION
// ============================================================
function initCarousel() {
    cardsPerView = getCardsPerView();
    renderCards();
    renderIndicators();
    // S'assurer que currentIndex est valide
    if (currentIndex + cardsPerView > totalCards) {
        currentIndex = Math.max(0, totalCards - cardsPerView);
    }
    updateCarousel();
}

initCarousel();