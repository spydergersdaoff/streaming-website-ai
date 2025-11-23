# 🎌 AnimeStream

<div align="center">

![AnimeStream Banner](https://img.shields.io/badge/AnimeStream-Streaming-8b5cf6?style=for-the-badge&logo=play&logoColor=white)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/fr/docs/Web/JavaScript)

**Votre destination ultime pour le streaming d'animes en haute qualité**

[Fonctionnalités](#-fonctionnalités) • [Installation](#-installation) • [Utilisation](#-utilisation) • [Technologies](#-technologies)

</div>

---

## 📖 À propos

**AnimeStream** est une plateforme de streaming d'animes moderne et élégante, conçue pour offrir une expérience utilisateur exceptionnelle. Avec son design ultra-moderne inspiré des meilleures plateformes de streaming, AnimeStream vous permet de découvrir et regarder vos animes préférés dans une interface fluide et intuitive.

### ✨ Points forts

- 🎨 **Design moderne** - Interface élégante avec effets glassmorphism et animations fluides
- 📱 **100% Responsive** - Expérience optimale sur mobile, tablette et desktop
- 🌙 **Mode sombre** - Design sombre reposant pour les yeux
- ⚡ **Performance** - Chargement rapide et navigation fluide
- 🔍 **Recherche avancée** - Trouvez rapidement vos animes favoris
- 📺 **Multi-lecteurs** - Plusieurs options de lecture pour chaque épisode

---

## 🚀 Fonctionnalités

### 🏠 Page d'accueil
- **Hero section** impressionnante avec statistiques en temps réel
- **Sorties de la semaine** - Intégration de l'API HyakAnime pour les dernières sorties
- **Catalogue complet** - Grille d'animes avec filtres (Séries/Films)
- **Recherche instantanée** - Barre de recherche avec résultats en temps réel

### 📋 Page détails
- **Affichage immersif** - Backdrop image avec effet blur
- **Informations complètes** - Synopsis, type, année, qualité
- **Liste des saisons** - Navigation facile entre les saisons
- **Design moderne** - Cartes avec effets hover et animations

### 🎬 Lecteur vidéo
- **Interface épurée** - Lecteur intégré avec contrôles intuitifs
- **Multi-lecteurs** - Choix entre plusieurs sources de streaming
- **Navigation épisodes** - Boutons précédent/suivant
- **Liste latérale** - Sidebar avec tous les épisodes de la saison
- **Responsive** - Adaptation parfaite sur tous les écrans

### 📱 Menu mobile
- **Menu hamburger** - Navigation latérale élégante
- **Animations fluides** - Transitions douces et naturelles
- **Overlay avec blur** - Effet glassmorphism moderne

---

## 🛠️ Technologies

### Frontend
- **HTML5** - Structure sémantique
- **CSS3** - Styles modernes avec variables CSS, gradients, animations
- **JavaScript (Vanilla)** - Logique applicative sans framework
- **Google Fonts** - Police Poppins pour une typographie élégante

### Design
- **Glassmorphism** - Effets de verre dépoli
- **Gradients dynamiques** - Dégradés violet/rose/cyan
- **Animations CSS** - Transitions et keyframes fluides
- **SVG Icons** - Icônes vectorielles optimisées

### API
- **HyakAnime API** - Données des sorties hebdomadaires d'animes

---

## 📦 Installation

### Prérequis
- Un navigateur web moderne (Chrome, Firefox, Edge, Safari)
- Un éditeur de code (VS Code recommandé)

### Étapes

1. **Cloner le repository**
```bash
git clone https://github.com/002-sans/Streaming-Website
cd animestream
```

2. **Ouvrir le projet**
```bash
# Ouvrir index.html dans votre navigateur
# Ou utiliser Live Server dans VS Code
```

3. **C'est tout !** 🎉
Le site fonctionne sans serveur backend, directement dans le navigateur.

---

## 💻 Utilisation

### Structure des fichiers
```
animestream/
├── index.html          # Page d'accueil
├── details.html        # Page de détails d'un anime
├── player.html         # Lecteur vidéo
├── style.css           # Styles globaux
├── home.js             # Logique page d'accueil
├── details.js          # Logique page détails
├── player.js           # Logique lecteur
├── animes-data.js      # Base de données des animes
└── README.md           # Documentation
```

### Ajouter un anime

Éditez le fichier `animes-data.js` :

```javascript
const animesData = [
    {
        "animeName": "Nom de l'anime",
        "animeDescription": "Description...",
        "animeImage": "URL de l'image",
        "isFilm": false,
        "seasons": {
            "Saison 1": {
                "Épisode 1": [
                    "URL lecteur 1",
                    "URL lecteur 2"
                ]
            }
        }
    }
];
```

### Personnalisation

#### Couleurs
Modifiez les variables CSS dans `style.css` :
```css
:root {
    --primary: #8b5cf6;
    --secondary: #ec4899;
    --accent: #06b6d4;
    /* ... */
}
```

#### Polices
Changez la police dans `index.html` :
```html
<link href="https://fonts.googleapis.com/css2?family=VotrePolice&display=swap" rel="stylesheet">
```

---

## 🎨 Captures d'écran

### Page d'accueil
- Hero section avec gradient animé
- Section sorties de la semaine
- Grille d'animes avec filtres

### Page détails
- Backdrop immersif
- Informations complètes
- Liste des saisons

### Lecteur
- Interface épurée
- Multi-lecteurs
- Navigation intuitive

---

## 🌟 Fonctionnalités à venir

- [ ] Système de favoris (localStorage)
- [ ] Historique de visionnage
- [ ] Recommandations personnalisées
- [ ] Mode clair/sombre toggle
- [ ] Partage sur réseaux sociaux
- [ ] Commentaires et notes
- [ ] Sous-titres intégrés

---

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus d'informations.

---

## 📞 Contact

Pour toute question ou suggestion :
- 💬 Discord : https://discord.gg/prevnames-1294586125234737232

---

## 🙏 Remerciements

- [HyakAnime API](https://hyakanime.fr) - Pour les données des sorties d'animes
- [Google Fonts](https://fonts.google.com) - Pour la police Poppins
- La communauté anime pour l'inspiration

---

<div align="center">

**⭐ Si vous aimez ce projet, n'hésitez pas à lui donner une étoile ! ⭐**

---

*Développé avec ❤️ et l'assistance de l'IA*

</div>
