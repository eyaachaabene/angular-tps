import type { Project } from '../models/project.model';

export const PROJECTS: Project[] = [
  {
    id: 1,
    name: 'Refonte du site vitrine',
    description: 'Moderniser l’identité visuelle et améliorer le parcours de contact.',
    status: 'En cours',
    tasks: [
      { id: 101, title: 'Valider les maquettes', priority: 'Haute', status: 'Terminé' },
      { id: 102, title: 'Intégrer la page d’accueil', priority: 'Haute', status: 'En cours' },
      { id: 103, title: 'Rédiger les textes', priority: 'Moyenne', status: 'En attente' },
    ],
  },
  {
    id: 2,
    name: 'Application mobile',
    description: 'Préparer une première version mobile pour le suivi des commandes.',
    status: 'En attente',
    tasks: [
      { id: 201, title: 'Definir les besoins utilisateurs', priority: 'Moyenne', status: 'En cours' },
      { id: 202, title: 'Dessiner le parcours de connexion', priority: 'Basse', status: 'En attente' },
    ],
  },
  {
    id: 3,
    name: 'Migration des données',
    description: 'Migrer les données clients vers la nouvelle plateforme.',
    status: 'Terminé',
    tasks: [],
  },
  {
    id: 4,
    name: 'Espace documentation',
    description: 'Centraliser les guides et procédures pour toute l’équipe.',
    status: 'En cours',
    tasks: [
      { id: 401, title: 'Lister les guides existants', priority: 'Basse', status: 'Terminé' },
      { id: 402, title: 'Créer le guide de démarrage', priority: 'Moyenne', status: 'En cours' },
    ],
  },
];
