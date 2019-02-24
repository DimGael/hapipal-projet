# hpal

## Démarrer l'application
Exécuter la commande suivante pour démarrer les conteneurs docker puis démarrer l'application

`npm run docker:start`

OU

1. `docker-compose up -d`

2. `npm start`

## Détails

### Base de données
Base de données utilisée : PostgreSQL [fichier docker utilisé](docker-compose.yml)

Fichier de config Schwifty : [fichier manifest.js](server/manifest.js#L47)

### Version Node
Version de NodeJs utilisée : 8.14 [release notes](https://nodejs.org/en/blog/release/v8.14.0/)
