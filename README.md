# Daneo — Frontend

> Interface web/mobile-first de Daneo, l'app de flashcards de vocabulaire coréen assistée par IA.

Ce dépôt contient le **frontend Vue 3** de Daneo. Il consomme l'API du [backend Spring Boot](https://github.com/LaurentGourouvin/daneo) (dépôt séparé) pour créer, consulter et réviser des flashcards de coréen.

Le nom vient du coréen **단어 (*daneo*)**, « le mot ».

---

## Aperçu

L'utilisateur saisit un mot français, l'IA (via le backend) propose sa traduction coréenne, l'application affiche la romanisation et une illustration, puis la carte est sauvegardée et devient révisable. Le frontend gère toute l'expérience : saisie, validation des propositions, consultation des decks, et sessions de révision.

Priorité absolue au **smartphone** (conçu autour de 390 px de large), avec adaptation tablette et desktop.

---

## Stack technique

| Outil | Rôle |
|---|---|
| Vue 3 (Composition API, `<script setup>`) | Framework UI |
| Vite | Build & serveur de dev |
| TypeScript | Typage statique |
| Vue Router | Navigation / routes |
| Pinia | Gestion d'état |
| Tailwind CSS v4 | Styles (design tokens via `@theme`) |
| Axios | Client HTTP vers l'API |
| Vitest | Tests unitaires |
| lucide-vue-next | Icônes |

---

## Design system

L'identité visuelle est déclarée en **design tokens** dans le CSS (Tailwind v4, directive `@theme`).

**Couleurs**

| Token | Rôle |
|---|---|
| `primary` | Indigo — couleur principale |
| `primary-pressed` | État pressé |
| `primary-tint` | Teinte indigo claire (fonds, surbrillance) |
| `accent` | Abricot — réussite, progression, actions positives |
| `paper` | Fond principal de l'app |
| `surface` | Surfaces / cartes |
| `ink` | Texte principal |
| `ink-soft` | Texte secondaire |

Plus les couleurs d'état (maîtrisé / à revoir / difficile), chacune avec un fond pâle et un texte foncé assorti.

**Typographie** — trois niveaux, une police par niveau :

- `font-hangul` — Noto Serif KR (le coréen, élément principal)
- `font-mono` — DM Mono (la romanisation)
- `font-sans` — Instrument Sans (le français et l'interface)

Règle : on nomme et on style **par rôle**, pas par langue. Le français est en `font-sans`, mais la romanisation (pourtant latine) reste en `font-mono`.

---

## Démarrage

### Prérequis

- Node.js LTS (≥ 24)
- Le [backend Daneo](https://github.com/LaurentGourouvin/daneo) démarré et accessible

### Configuration

Créer un fichier `.env` à la racine :

```
VITE_API_BASE_URL=http://localhost:8080/api
```

L'URL pointe vers l'API du backend (en dev, le port par défaut de Spring Boot). En production, cette valeur pointe vers le sous-domaine de l'API.

> **CORS** : le backend doit autoriser l'origine du frontend. En dev, le front tourne sur `http://localhost:5173` (port par défaut de Vite) ; cette origine doit figurer dans la configuration CORS du backend.

### Installer & lancer

```bash
npm install
npm run dev
```

Le serveur de dev démarre sur `http://localhost:5173`.

### Autres commandes

```bash
npm run build      # build de production
npm run preview    # prévisualiser le build
npm run test:unit  # tests unitaires (Vitest)
```

---

## Structure du projet

```
src/
├── api/          Instance Axios configurée (DaneoAxios)
├── assets/       CSS global, design tokens (@theme)
├── components/   Composants réutilisables (DaneoButton, DaneoField, StatePill, NavBar…)
├── views/        Vues = écrans associés à une route
├── router/       Définition des routes
├── stores/       Stores Pinia (état partagé)
├── services/     Fonctions d'appel à l'API (deckService, flashcardService…)
└── types/        Types TypeScript miroir des DTO du backend
```

**Chaîne de responsabilité** : `composant → store (Pinia) → service (Axios) → API backend`. Un composant ne parle jamais directement à Axios — il passe par le store, qui passe par le service.

---

## Conventions

- **Composition API** avec `<script setup lang="ts">` partout.
- Les **types** TypeScript sont le miroir des DTO du backend : quand un DTO change côté back, mettre à jour le type côté front.
- Styles via **classes Tailwind** et tokens du design system, pas de CSS brut sauf nécessité.
- Composants nommés `Daneo*` pour les briques de base du design system.

---

## Périmètre (MVP)

- Consulter la liste des decks et le détail d'un deck (ses cartes)
- Créer / renommer / supprimer un deck
- Créer une flashcard : saisie → traduction IA → choix du sens → illustration (optionnelle) → sauvegarde
- Réviser : afficher une carte, révéler la réponse

Volontairement hors MVP (à venir) : répétition espacée (SRS) et notation Facile/Moyen/Difficile, statistiques, écran de gestion des cartes non classées.

---

## Lien avec le backend

Ce frontend ne fonctionne pas seul : il a besoin de l'[API Daneo](https://github.com/LaurentGourouvin/daneo). Toute la logique (traduction IA, romanisation, génération et stockage d'images, persistance) vit côté backend. Le frontend est la couche de présentation et d'interaction.