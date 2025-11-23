// Données des animes (importées depuis animes-data.js)
let currentFilter = 'all';

// Éléments DOM
const animeGrid = document.getElementById('animeGrid');
const searchInput = document.getElementById('searchInput');
const navItems = document.querySelectorAll('.nav-item');

// Initialisation
function init() {
    loadWeeklyReleases('day');
    renderAnimes();
    setupEventListeners();
    setupReleaseTabs();
}

// Afficher les animes
function renderAnimes(filter = 'all', searchTerm = '') {
    animeGrid.innerHTML = '';
    
    let filteredAnimes = animesData.filter(anime => {
        const matchesFilter = filter === 'all' || 
                            (filter === 'films' && anime.isFilm) || 
                            (filter === 'series' && !anime.isFilm);
        const matchesSearch = anime.animeName.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    filteredAnimes.forEach((anime, index) => {
        const card = createAnimeCard(anime, index);
        animeGrid.appendChild(card);
    });

    if (filteredAnimes.length === 0) {
        animeGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--gray); font-size: 1.2rem;">Aucun anime trouvé</p>';
    }
}

// Créer une carte d'anime
function createAnimeCard(anime, index) {
    const card = document.createElement('div');
    card.className = 'anime-card';
    card.onclick = () => goToDetails(index);
    
    const type = anime.isFilm ? 'Film' : 'Série';
    
    card.innerHTML = `
        <div class="anime-poster">
            <img src="${anime.animeImage}" alt="${anime.animeName}" onerror="this.src='https://via.placeholder.com/250x350?text=Anime'">
        </div>
        <div class="anime-info">
            <div class="anime-title">${anime.animeName}</div>
            <div class="anime-description">${anime.animeDescription}</div>
            <span class="anime-type">${type}</span>
        </div>
    `;
    
    return card;
}

// Aller à la page de détails
function goToDetails(index) {
    localStorage.setItem('selectedAnimeIndex', index);
    window.location.href = 'details.html';
}

// Configuration des écouteurs d'événements
function setupEventListeners() {
    // Filtres de navigation (desktop)
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const filter = item.dataset.filter;
            if (filter) {
                e.preventDefault();
                navItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                currentFilter = filter;
                renderAnimes(currentFilter, searchInput.value);
            }
        });
    });
    
    // Filtres de navigation (mobile)
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const filter = item.dataset.filter;
            if (filter) {
                e.preventDefault();
                mobileNavItems.forEach(i => i.classList.remove('active'));
                navItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                
                // Mettre à jour aussi le menu desktop
                const desktopItem = document.querySelector(`.nav-item[data-filter="${filter}"]`);
                if (desktopItem) desktopItem.classList.add('active');
                
                currentFilter = filter;
                renderAnimes(currentFilter, searchInput.value);
                closeMobileMenu();
            }
        });
    });
    
    // Recherche
    searchInput.addEventListener('input', (e) => {
        renderAnimes(currentFilter, e.target.value);
    });
    
    // Menu mobile
    setupMobileMenu();
}

// Configuration du menu mobile
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) {
                closeMobileMenu();
            }
        });
    }
}

// Fermer le menu mobile
function closeMobileMenu() {
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    if (mobileMenuOverlay) {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Charger les sorties de la semaine
async function loadWeeklyReleases(type = 'day') {
    const container = document.getElementById('releasesContainer');
    
    // Afficher le loading
    container.innerHTML = `
        <div class="loading-releases">
            <div class="loading-spinner"></div>
            <p>Chargement des sorties...</p>
        </div>
    `;
    
    try {
        const res = await fetch(`https://api-v3.hyakanime.fr/agenda/${type}`).then(r => r.json());
        
        if (!res || res.length === 0) {
            container.innerHTML = `
                <div class="error-message">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <p>Aucune sortie prévue pour le moment</p>
                </div>
            `;
            return;
        }
        
        if (type === 'day') {
            renderDayReleases(res, container);
        } else {
            renderTimelineReleases(res, container);
        }
    } catch (error) {
        console.error('Erreur de chargement:', error);
        container.innerHTML = `
            <div class="error-message">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <p>Erreur de connexion à l'API</p>
            </div>
        `;
    }
}

// Afficher les sorties du jour
function renderDayReleases(data, container) {
    const listAnime = data.map(anime => ({
        ...anime,
        timestamp: Number(anime.episode?.timestamp)
    })).sort((a, b) => a.timestamp - b.timestamp);
    
    const html = `
        <div class="releases-list">
            ${listAnime.map(anime => {
                const date = new Date(anime.episode?.timestamp ?? Date.now());
                const episodeTitle = anime.episode?.title ?? "Épisode sans titre";
                const animeTitle = anime.episode?.animeTitle 
                    || anime.media?.title 
                    || anime.media?.romanji 
                    || anime.media?.titleJP 
                    || "Titre inconnu";
                
                return `
                    <div class="release-item">
                        <div class="release-time">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12 6 12 12 16 14"/>
                            </svg>
                            ${formatTimeAgo(date)}
                        </div>
                        <div class="release-info">
                            <div class="release-title">${animeTitle.replaceAll('*', '')}</div>
                            <div class="release-episode">${episodeTitle}</div>
                        </div>
                        <div class="release-badge">Nouveau</div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
    
    container.innerHTML = html;
}

// Afficher la timeline de la semaine
function renderTimelineReleases(data, container) {
    const html = data.map(dayData => {
        const animes = dayData.airing.filter(anime => anime.displayCalendar);
        
        if (animes.length === 0) return '';
        
        const dayDate = new Date(animes[0].timestamp);
        const dayName = dayDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
        
        return `
            <div class="timeline-day">
                <div class="day-header">
                    <div class="day-date">${dayName}</div>
                    <div class="day-count">${animes.length} sortie${animes.length > 1 ? 's' : ''}</div>
                </div>
                <div class="releases-list">
                    ${animes.map(anime => {
                        const date = new Date(anime.timestamp);
                        const animeTitle = (anime.episode?.animeTitle 
                            || anime.media?.title 
                            || anime.media?.romanji 
                            || anime.media?.titleJP 
                            || "Titre inconnu").replaceAll('*', '');
                        const episodeTitle = `Épisode ${anime.number ?? "?"}`;
                        
                        return `
                            <div class="release-item">
                                <div class="release-time">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <circle cx="12" cy="12" r="10"/>
                                        <polyline points="12 6 12 12 16 14"/>
                                    </svg>
                                    ${date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                </div>
                                <div class="release-info">
                                    <div class="release-title">${animeTitle}</div>
                                    <div class="release-episode">${episodeTitle}</div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }).filter(day => day.length > 0).join('');
    
    container.innerHTML = html || `
        <div class="error-message">
            <p>Aucune sortie prévue cette semaine</p>
        </div>
    `;
}

// Formater le temps relatif
function formatTimeAgo(date) {
    const now = new Date();
    const diff = date - now;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (diff < 0) {
        const absMinutes = Math.abs(minutes);
        const absHours = Math.abs(hours);
        if (absMinutes < 60) return `Il y a ${absMinutes} min`;
        if (absHours < 24) return `Il y a ${absHours}h`;
        return `Il y a ${Math.abs(days)} jour${Math.abs(days) > 1 ? 's' : ''}`;
    }
    
    if (minutes < 60) return `Dans ${minutes} min`;
    if (hours < 24) return `Dans ${hours}h`;
    return `Dans ${days} jour${days > 1 ? 's' : ''}`;
}

// Configuration des onglets de sorties
function setupReleaseTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.type;
            
            // Mettre à jour l'onglet actif
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Charger les données
            loadWeeklyReleases(type);
        });
    });
}

// Démarrer l'application
init();
