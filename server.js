// Import des différentes librairies
require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dbUtils = require("./utils/db_utils");

// Test de la connexion à la base de données
dbUtils.testDbConnection();

// Middlewares d'entrées
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
// bodyparser lie les donner que l'ont envoie via un formulaire
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/assets", express.static("assets")); // Pour servir les fichiers statiques

// Routage
const routerBase = require("./routers/base.router");
app.use("", routerBase);

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).send("Page introuvable");
});

// Gestion des erreurs globales
app.use((error, req, res, next) => {
    console.error("Erreur URL : ", req.url);
    console.error("Erreur : ", error);
    res.status(500).send("Erreur interne du serveur");
});

const port = process.env.PORT || 8002;
app.listen(port, () => {
    console.log(`Serveur Web démarré sur le port : http://localhost:${port}`);
});