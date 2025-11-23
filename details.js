// Données de l'anime sélectionné
let currentAnime = null;
let animeIndex = null;

// Éléments DOM
const animeTitle = document.getElementById('animeTitle');
const animeDescription = document.getElementById('animeDescription');
const animeImage = document.getElementById('animeImage');
const seasonsGrid = document.getElementById('seasonsGrid');

// Initialisation
function init() {
    animeIndex = localStorage.getItem('selectedAnimeIndex');
    
    if (animeIndex === null) {
        window.location.href = 'index.html';
        return;
    }
    
    loadAnimeDetails();
}

// Charger les détails de l'anime
function loadAnimeDetails() {
    currentAnime = animesData[animeIndex];
    
    if (!currentAnime) {
        window.location.href = 'index.html';
        return;
    }
    
    renderDetails();
}

// Afficher les détails
function renderDetails() {
    const animeImagePoster = document.getElementById('animeImagePoster');
    const animeType = document.getElementById('animeType');
    
    animeTitle.textContent = currentAnime.animeName;
    animeDescription.textContent = currentAnime.animeDescription;
    animeImage.src = currentAnime.animeImage;
    animeImagePoster.src = currentAnime.animeImage;
    animeType.textContent = currentAnime.isFilm ? 'Film' : 'Série';
    
    animeImage.onerror = () => {
        animeImage.src = 'https://via.placeholder.com/300x450?text=Anime';
    };
    animeImagePoster.onerror = () => {
        animeImagePoster.src = 'https://via.placeholder.com/300x450?text=Anime';
    };
    
    // Si c'est un film, rediriger directement vers le lecteur
    if (currentAnime.isFilm) {
        localStorage.setItem('selectedSeason', 'film');
        window.location.href = 'player.html';
        return;
    }
    
    // Afficher les saisons
    renderSeasons();
}

// Afficher les saisons
function renderSeasons() {
    seasonsGrid.innerHTML = '';
    
    Object.keys(currentAnime.seasons).forEach(seasonName => {
        const episodeCount = Object.keys(currentAnime.seasons[seasonName]).length;
        
        const seasonCard = document.createElement('div');
        seasonCard.className = 'season-card';
        seasonCard.onclick = () => goToPlayer(seasonName);
        
        seasonCard.innerHTML = `
            <div class="season-name">${seasonName}</div>
            <div class="season-episodes">${episodeCount} épisode${episodeCount > 1 ? 's' : ''}</div>
        `;
        
        seasonsGrid.appendChild(seasonCard);
    });
}

// Aller au lecteur
function goToPlayer(seasonName) {
    localStorage.setItem('selectedSeason', seasonName);
    window.location.href = 'player.html';
}

// Démarrer l'application
init();
