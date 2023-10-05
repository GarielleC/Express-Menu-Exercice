// Import des modules nécessaires
const mssql = require('mssql'); // Bibliothèque pour interagir avec une base de données
const { createDbConnection } = require('../utils/db_utils'); // Fonction utilitaire pour

// Définition d'un objet commentController qui contient plusieurs méthodes de gestion des requêtes HTTP
const commentController = {
    // Méthode pour gérer la requête GET sur la route '/comment'
    index: async (req, res) => {
        try {
            // Création d'une connexion à la base de données
            const db = await createDbConnection();
            // Exécution d'une requête SQL pour récupérer tous les commentaires
            const result = await db.query('SELECT * FROM Commentaires');

            // Transformation des résultats de la requête en un format JSON
            const commentaires = result.recordset.map((row) => ({
                prenom: row.Prénom,
                nom: row.Nom,
                note: row.Note,
                email: row.Email,
                message: row.Message,
            }));

            // Utilisation de la fonction intégrée res.render pour le rendu EJS
            res.render("index.ejs", {
                page: "./Pages/comment/index",
                commentaires: commentaires,
            });

        } catch (err) {
            console.error("Erreur lors de la récupération des commentaires", err);
            res.status(500).send("Erreur lors de la récupération des commentaires");
        }
    },

    // Méthode pour gérer la requête GET sur la route '/comment/message'
    messageGET: (req, res) => {
        // Rendu d'une vue EJS pour afficher un formulaire d'ajout de commentaire
        res.render("index.ejs", {
            page: "Pages/comment/add",
        });
    },

    // Méthode pour gérer la requête POST sur la route '/comment/message'
    messagePOST: async (req, res) => {
        try {
            const { Prénom, Nom, Note, Email, Message } = req.body; // Obtenir les données du formulaire depuis la requête

            // Vérifier que toutes les données du formulaire sont présentes
            if (!Prénom || !Nom || !Note || !Email || !Message) {
                return res.status(400).send("Tous les champs sont obligatoires.");
            }

            // Création d'une connexion à la base de données
            const db = await createDbConnection();
            const request = new mssql.Request(db);

            // Définition des paramètres de la requête SQL avec les données du formulaire
            request.input("Prénom", mssql.NVarChar, Prénom);
            request.input("Nom", mssql.NVarChar, Nom);
            request.input("Note", mssql.Int, parseInt(Note));
            request.input("Email", mssql.NVarChar, Email);
            request.input("Message", mssql.NVarChar, Message);

            // Exécution de la requête SQL pour insérer un nouveau commentaire
            await request.query(
                "INSERT INTO Commentaires (Prénom, Nom, Note, Email, Message) VALUES (@Prénom, @Nom, @Note, @Email, @Message)"
            );

            res.status(200).send(`
                <h1>Commentaire ajouté avec succès</h1>
                <a href="/comment">Retour au commentaire</a>
            `);
        } catch (err) {
            console.error("Erreur lors de la gestion de la requête POST", err);
            res.status(500).send("Erreur lors de la gestion de la requête POST");
        }
    }
};

// Export de l'objet commentController pour être utilisé ailleurs
module.exports = commentController;