# vue-project

Ce projet est une application construite avec Vue.js, un framework JavaScript progressif pour construire des interfaces utilisateur modernes et réactives. Il utilise Vite pour un développement rapide et des performances accrues. Cette application est un gestionnaire de tache dynamique créé lors du module de Web Engineering.

## Structure du projet

Voici un aperçu des principaux fichiers et dossiers du projet :
- package.json : Contient les dépendances et les scripts du projet.
- vite.config.js : Configuration pour Vite.
- src/ : Dossier principal pour le code source.
- main.js : Point d'entrée de l'application.
- App.vue : Composant racine de l'application.
- components/ : Contient les composants Vue réutilisables.
- public/ : Fichiers statiques accessibles directement.
- node_modules/ : Dépendances installées.

## Prérequis

Assurez-vous que les logiciels suivants sont installés sur votre système :
- Node.js (version 16 ou supérieure recommandée)
- npm

## Installation

- Clonez ce dépôt sur votre machine locale :
```bash
git clone https://github.com/Theo-dlrd/tpWebVue.git
```

- Accédez au dossier du projet :
```bash
cd vue-project
```

- Installez les dépendances :
```bash
npm install
```

## Scripts disponibles

Dans le fichier ``package.json``, plusieurs scripts sont configurés :
- Démarrer le serveur de développement :
```bash
npm run dev
```
Accédez ensuite à l'application dans votre navigateur à l'adresse http://localhost:3000.

- Build pour la production :
```bash
npm run build
```
Les fichiers optimisés pour la production seront générés dans le dossier dist/.

- Prévisualiser le build de production :
```bash
npm run preview
```

## Configuration

- __Vite__ : Le fichier vite.config.js contient la configuration de l'environnement de développement et de production. Vous pouvez le modifier pour ajouter des plugins ou configurer des chemins d'accès personnalisés.

- __Environnements__ : Utilisez des fichiers .env pour définir des variables d'environnement. Par exemple : VITE_API_URL=https://api.example.com

## Structure des composants

Les composants Vue se trouvent dans le dossier ``src/components/``. Voici un exemple de structure :
```bash
src/
├── components/
│   ├── Header.vue
│   ├── Footer.vue
│   └── ExampleComponent.vue
```

## Tests

Pour lancer les tests unitaires, vous pouvez les exécuter avec :
```bash
npm run test
```

## Contribution

[Théo DULUARD](theo.duluard@etudiant.univ-rennes.fr)