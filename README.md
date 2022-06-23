# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Dossier services

Changer la adresse environnement si besoin :
 - `${import.meta.env.VITE_APP_API_URL}` 
 VITE_APP_API_URL étant l'adresse dirigée vers le BackEnd soit http:localhost:XXXXX/ il faudra la changer
 Stocké dans le fichier .env il fauda le créer 
 - VITE_APP_API_URL=http://localhost:5000/

## Config pour le backend

Installer CORS si problème vers le backEnd

- const cors = require('cors');

- const whitelist = ['http://localhost:3000/']; `changer adresse si besoin du frontend`
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if(whitelist.includes(origin))
      return callback(null, true)

      callback(new Error('Not allowed by CORS'));
  }
}

app.use(cors(corsOptions));

