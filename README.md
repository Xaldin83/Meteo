# 🌤️ Application Météo — JavaScript / HTML / CSS

Une application web météo permettant de rechercher la météo actuelle d'une ville, d'afficher une icône météo correspondante, et de sauvegarder des villes en favoris via le `localStorage` du navigateur.

---

## 🖥️ Aperçu des fonctionnalités

- 🔎 **Rechercher** la météo d'une ville par son nom
- 🌡️ **Afficher** la température actuelle et une icône météo
- ⭐ **Ajouter** une ville aux favoris (persistance via `localStorage`)
- 📋 **Afficher** la liste des villes favorites avec leur météo en temps réel

---

## 🗂️ Structure du projet

```
📦 Projet
├── index.html      # Structure de la page
├── style.css       # Mise en page et styles visuels
├── script.js       # Logique applicative (API, DOM, favoris)
└── img/
    ├── Sunny.png
    ├── Sunny_intervals.png
    ├── Mostly_cloudy.png
    ├── White_cloud.png
    ├── Cloudy_with_heavy_rain.png
    ├── Cloud_with_sleet.png
    ├── Cloudy_with_heavy_snow.png
    ├── Light_rain_showers.png
    ├── Mist.png
    ├── Fog.png
    ├── Freezing_rain.png
    ├── Thunderstorms.png
    ├── Drizzle.png
    ├── Sandstorm.png
    └── Unknow.png
```

---

## 🌐 APIs utilisées

Le projet utilise deux APIs gratuites et sans clé d'authentification :

| API | Rôle | URL |
|---|---|---|
| **Open-Meteo Geocoding** | Convertit un nom de ville en coordonnées GPS | `https://geocoding-api.open-meteo.com/v1/search` |
| **Open-Meteo Forecast** | Retourne la météo actuelle à partir de coordonnées | `https://api.open-meteo.com/v1/forecast` |

---

## 🔢 Correspondance des codes météo (`weathercode`)

L'API retourne un code numérique converti en icône et en libellé :

| Code | Libellé | Icône |
|---|---|---|
| 0 | Indéterminée | `Unknow.png` |
| 1 | Ciel clair | `Sunny.png` |
| 2 | Légèrement nuageux | `Sunny_intervals.png` |
| 3 | Partiellement nuageux | `Mostly_cloudy.png` |
| 4 | Nuageux | `White_cloud.png` |
| 5 | Pluie | `Cloudy_with_heavy_rain.png` |
| 6 | Pluie et Neige | `Cloud_with_sleet.png` |
| 7 | Neige | `Cloudy_with_heavy_snow.png` |
| 8 | Averse | `Light_rain_showers.png` |
| 11 | Brouillard léger | `Mist.png` |
| 12 | Brouillard | `Fog.png` |
| 13 | Pluie Verglaçante | `Freezing_rain.png` |
| 14 | Orage | `Thunderstorms.png` |
| 15 | Bruine | `Drizzle.png` |
| 16 | Tempête de Sable | `Sandstorm.png` |

---

## ⚙️ Fonctionnement du code JavaScript

### Classe `Ville`
Représente une ville recherchée avec ses coordonnées géographiques.

| Attribut | Type | Description |
|---|---|---|
| `name` | string | Nom de la ville |
| `longitude` | number | Longitude (coordonnée GPS) |
| `latitude` | number | Latitude (coordonnée GPS) |

**Getter `Afficher`** — injecte dans le DOM le nom de la ville et un bouton "Rajouter aux favoris".

---

### Fonctions principales

**`calcWeatherCode(longitude, latitude)`**
Interroge l'API météo et retourne le `weathercode` correspondant aux coordonnées fournies.

**`affichage_favoris(nom)`**
Recherche les coordonnées de la ville par son nom, récupère sa météo actuelle, et affiche le résultat (température + icône) dans la section `#favoris`.

---

### Gestion des favoris

Les favoris sont stockés dans le `localStorage` du navigateur sous la clé `"favoris"`, sous forme d'une liste de noms séparés par des virgules.

- **Ajout** : clic sur le bouton "Rajouter aux favoris" — le nom est ajouté à la liste
- **Affichage** : clic sur "Afficher les favoris" — chaque ville de la liste est rechargée via l'API

---

## 🚀 Lancement

Aucune installation requise. Il suffit d'ouvrir `index.html` dans un navigateur moderne.

> ⚠️ Le projet utilise `fetch()` pour appeler des APIs externes. Il est recommandé de le servir via un serveur local (ex: extension **Live Server** sur VS Code) plutôt qu'en ouvrant directement le fichier, afin d'éviter les restrictions CORS de certains navigateurs.

---

## ⚠️ Limitations connues

- La liste des codes météo est indexée de 0 à 16, mais l'API Open-Meteo utilise des codes non contigus (ex : 0, 1, 2, 3, 45, 48, 51...). La correspondance actuelle peut donc être incorrecte pour certaines conditions météo.
- La classe `Ville` reçoit `temperature` et `weathercode` en paramètres du constructeur, mais ne les stocke pas — ils sont gérés séparément dans le code appelant.
- Les favoris ne sont pas dédupliqués : une même ville peut être ajoutée plusieurs fois.
