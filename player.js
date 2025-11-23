// Données de l'anime et de la saison
let currentAnime = null;
let currentSeason = null;
let currentSeasonName = null;
let episodesList = [];
let currentEpisodeIndex = 0;

// Éléments DOM
const animeTitle = document.getElementById('animeTitle');
const seasonTitle = document.getElementById('seasonTitle');
const videoPlayer = document.getElementById('videoPlayer');
const currentEpisodeEl = document.getElementById('currentEpisode');
const episodesListEl = document.getElementById('episodesList');
const lecteurButtons = document.getElementById('lecteurButtons');
const prevEpisodeBtn = document.getElementById('prevEpisode');
const nextEpisodeBtn = document.getElementById('nextEpisode');
const backToDetails = document.getElementById('backToDetails');

// Initialisation
function init() {
    const animeIndex = localStorage.getItem('selectedAnimeIndex');
    currentSeasonName = localStorage.getItem('selectedSeason');
    
    if (animeIndex === null || currentSeasonName === null) {
        window.location.href = 'index.html';
        return;
    }
    
    loadAnimeData(animeIndex);
    setupEventListeners();
}

// Charger les données de l'anime
function loadAnimeData(animeIndex) {
    currentAnime = animesData[animeIndex];
    
    if (!currentAnime) {
        window.location.href = 'index.html';
        return;
    }
    
    animeTitle.textContent = currentAnime.animeName;
    
    if (currentAnime.isFilm) {
        setupFilm();
    } else {
        setupSeries();
    }
}

// Configuration pour un film
function setupFilm() {
    seasonTitle.textContent = 'Film';
    currentEpisodeEl.textContent = currentAnime.animeName;
    
    // Masquer la navigation d'épisodes
    prevEpisodeBtn.style.display = 'none';
    nextEpisodeBtn.style.display = 'none';
    episodesListEl.parentElement.style.display = 'none';
    
    // Afficher les lecteurs
    renderLecteurs(currentAnime.lecteurs);
}

// Configuration pour une série
function setupSeries() {
    currentSeason = currentAnime.seasons[currentSeasonName];
    
    if (!currentSeason) {
        window.location.href = 'details.html';
        return;
    }
    
    seasonTitle.textContent = currentSeasonName;
    
    // Créer la liste des épisodes
    episodesList = Object.keys(currentSeason).map((episodeName, index) => ({
        name: episodeName,
        lecteurs: currentSeason[episodeName],
        index: index
    }));
    
    // Afficher la liste des épisodes
    renderEpisodesList();
    
    // Charger le premier épisode
    loadEpisode(0);
}

// Afficher la liste des épisodes
function renderEpisodesList() {
    episodesListEl.innerHTML = '';
    
    episodesList.forEach((episode, index) => {
        const episodeItem = document.createElement('div');
        episodeItem.className = 'episode-item';
        episodeItem.textContent = episode.name;
        episodeItem.onclick = () => loadEpisode(index);
        
        if (index === currentEpisodeIndex) {
            episodeItem.classList.add('active');
        }
        
        episodesListEl.appendChild(episodeItem);
    });
}

// Charger un épisode
function loadEpisode(index) {
    if (index < 0 || index >= episodesList.length) return;
    
    currentEpisodeIndex = index;
    const episode = episodesList[index];
    
    currentEpisodeEl.textContent = episode.name;
    
    // Mettre à jour la liste des épisodes
    document.querySelectorAll('.episode-item').forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            item.classList.remove('active');
        }
    });
    
    // Mettre à jour les boutons de navigation
    prevEpisodeBtn.disabled = index === 0;
    nextEpisodeBtn.disabled = index === episodesList.length - 1;
    
    // Afficher les lecteurs
    renderLecteurs(episode.lecteurs);
}

// Afficher les lecteurs
function renderLecteurs(lecteurs) {
    lecteurButtons.innerHTML = '';
    
    lecteurs.forEach((url, index) => {
        const btn = document.createElement('button');
        btn.className = 'lecteur-btn';
        btn.textContent = `Lecteur ${index + 1}`;
        btn.onclick = () => loadVideo(url, btn);
        lecteurButtons.appendChild(btn);
    });
    
    // Charger automatiquement le premier lecteur
    if (lecteurs.length > 0) {
        const firstBtn = lecteurButtons.querySelector('.lecteur-btn');
        loadVideo(lecteurs[0], firstBtn);
    }
}

// Charger la vidéo
function loadVideo(url, btn) {
    // Retirer la classe active de tous les boutons lecteur
    document.querySelectorAll('.lecteur-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Forcer HTTPS pour éviter les erreurs de contenu mixte
    const secureUrl = url.replace(/^http:\/\//i, 'https://');
    videoPlayer.src = secureUrl;
}

// Configuration des écouteurs d'événements
function setupEventListeners() {
    // Navigation entre épisodes
    prevEpisodeBtn.addEventListener('click', () => {
        loadEpisode(currentEpisodeIndex - 1);
    });
    
    nextEpisodeBtn.addEventListener('click', () => {
        loadEpisode(currentEpisodeIndex + 1);
    });
    
    // Retour aux détails
    backToDetails.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'details.html';
    });
}

// Démarrer l'application
init();
