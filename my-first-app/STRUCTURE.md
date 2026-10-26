# Structure du projet

## `src/app/`
Ce dossier contient le composant racine Angular, son template HTML, ses styles et la configuration de l’application.
Il contient également la définition des routes, qui est actuellement vide.

## `src/styles.css`
Cette feuille regroupe les styles globaux chargés par l’application.
Elle importe Tailwind CSS pour rendre ses utilitaires disponibles dans les templates.

## `src/index.html`
Ce fichier fournit la page HTML initiale du navigateur et l’élément `<app-root>` dans lequel Angular démarre.
Il définit aussi les métadonnées de base et le titre de la page.

## `src/main.ts`
Ce fichier est le point d’entrée TypeScript de l’application.
Il démarre le composant racine `App` avec la configuration Angular définie dans `app.config.ts`.

## `angular.json`
Ce fichier configure le projet Angular pour la compilation, le serveur de développement et les tests.
Il indique notamment les fichiers d’entrée, les ressources et les styles globaux utilisés au build.

## `package.json`
Ce fichier décrit le projet, ses scripts npm et ses dépendances Angular et Tailwind CSS.
Il permet d’installer les paquets nécessaires et d’exécuter les commandes de développement et de build.
