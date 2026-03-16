# Flashcards

## Objectifs Pédagogiques

Ce projet vise la maîtrise du framework AdonisJS et de son architecture MVC. L'apprentissage se concentre sur l'utilisation de l'ORM Lucid pour la gestion des données MySQL et du moteur Edge pour créer des interfaces dynamiques. Un point essentiel concerne la mise en place de validations strictes avec VineJS pour garantir l'intégrité des données saisies. Enfin, le projet développe des compétences en gestion d'authentification par session et impose une rigueur professionnelle via l'utilisation systématique de Git pour le suivi des versions.

## Objectifs Produits

Flashcards est un outil d'apprentissage ludique basé sur le principe des cartes de révision. L'application permet de créer des "decks" thématiques contenant des cartes avec une question au recto et une réponse au verso. Les utilisateurs authentifiés peuvent gérer leurs propres collections et s'exercer via un mode dédié. Ce mode permet de tester ses connaissances, de vérifier les réponses et d'obtenir un score final. L'interface inclut des messages flash de confirmation pour chaque action réalisée.

## Installation Rapide

1.  **Dépendances** : `npm install`
2.  **Configuration** : Créer un fichier `.env` basé sur `.env.exemple`
3.  **Base de données** : `node ace migration:run`
4.  **Lancement** : `npm run dev`
5.  **Accès** : [http://localhost:3333/](http://localhost:3333/)

## Bilan

- **Fonctionnalités** : CRUD complet des decks et cartes, mode exercice et authentification fonctionnels.
- **Validation** : Règles strictes appliquées sur les titres, descriptions et questions.
- **Interface** : Utilisation de messages flash et respect des maquettes fournies.

## Stratégie IA

L'usage de l'intelligence artificielle a été ciblé pour optimiser le développement sans compromettre l'apprentissage, conformément aux directives. Ma stratégie a consisté à utiliser l'IA comme support pour la résolution de bugs et l'explication de concepts complexes d'AdonisJS.

Je me suis imposé de comprendre chaque instruction avant intégration. Par exemple, pour les validateurs VineJS, j'ai utilisé l'IA pour comprendre la syntaxe, puis j'ai rédigé les règles spécifiques. Cette approche garantit que je reste l'architecte de la logique métier. L'IA a été un assistant technique supervisé, assurant que le produit fini résulte d'une réflexion personnelle et d'une maîtrise réelle du framework.
