// Importe la bibliothèque Express.js
const express = require('express');

// Création d'un routeur Express
const router = express.Router();

// Importe les fichiers de routeurs spécifiques pour différentes parties de l'application
const routerAbout = require("./about.router"); // Routeur pour la page À propos
const routerComment = require("./comment.router"); // Routeur pour les Commentaires
const routerHome = require("./home.router"); // Routeur pour la page d'accueil
const routerMenu = require("./menu.router"); // Routeur pour le menu

// Associe chaque routeur importé à une URL spécifique
router.use("/about", routerAbout); 
router.use("/comment", routerComment); 
router.use("/menu", routerMenu); 
router.use("/", routerHome); 

// Exporte le routeur configuré pour une utilisation ultérieure dans l'application
module.exports = router;