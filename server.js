// Importation du module Dotenv pour la gestion des variables d'environnement
require("dotenv").config();


// Importation des modules requis
const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const express = require('express');
const app = express();

// Importation des contrôleurs
const homeController = require("./controllers/home.controller");
const commentController = require("./controllers/commentController");
const menuController = require("./controllers/menuController");
const aboutController = require("./controllers/aboutController");

// Importation du module DbUtils pour la gestion de la base de données
const DbUtils = require("./utils/db_utils");

// Test de la connexion à la base de données
DbUtils.testDbConnection();

// Création d'un serveur HTTP
const server = http.createServer((request, response) => {
    // Extraction des informations de la requête
    const requestUrl = request.url;
    const requestMethod = request.method;

    // Servir les fichiers statiques (par exemple, les fichiers CSS, JavaScript, images)
    if (url.parse(requestUrl).pathname.startsWith("/assets/")) {
        const filePath = path.join(__dirname, url.parse(requestUrl).pathname);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                // En cas d'erreur de lecture du fichier, renvoie une réponse 404
                response.writeHead(404);
                response.end("File not found");
                return;
            }
            // Renvoie le contenu du fichier avec un code de réponse 200 (OK)
            response.writeHead(200);
            response.end(data);
        });
        return;
    }

    // Affiche les informations de la requête dans la console
    console.log(`url: ${request.url}`);

    // Routage des requêtes HTTP vers les contrôleurs appropriés
    const parsedUrl = url.parse(requestUrl);
    if (parsedUrl.pathname === '/') {
        // Page d'accueil
        homeController.index(request, response);
    } else if (parsedUrl.pathname === '/menu') {
        // Affichage du menu
        menuController.index(request, response);
    } else if (/^\/menu\/\d+$/.test(parsedUrl.pathname)) {
        
        // Détails d'un plat du menu
        menuController.details(request, response);
        
    } else if (parsedUrl.pathname === "/about") {
        // Page À propos
        aboutController.index(request, response);
    } else if (parsedUrl.pathname === '/comment') {
        // Page de commentaires
        commentController.index(request, response);
    } else if (parsedUrl.pathname === '/comment/add' && requestMethod === "GET") {
        // Formulaire d'ajout de commentaire (GET)
        commentController.messageGET(request, response);
    } else if (parsedUrl.pathname === '/comment/add' && requestMethod === "POST") {
        // Traitement de l'ajout de commentaire (POST)
        commentController.messagePOST(request, response);
    } else {
        // Si l'URL n'est pas reconnue, renvoie une réponse 404
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end("<h1>Page introuvable</h1>");
    }
});

// Démarre le serveur sur le port spécifié dans les variables d'environnement 
const port = 3301
app.listen(port,console.log(`Serveur en écoute sur http://localhost:${port}`));
