// Import des modules nécessaires
const mssql = require('mssql'); // Bibliothèque pour interagir avec une base de données Microsoft SQL Server
const ejs = require('ejs'); // Moteur de modèle EJS pour générer du HTML dynamique
const { createDbConnection } = require('../utils/db_utils'); // Fonction utilitaire pour créer une connexion à la base de données
const queryString = require('querystring'); // Module pour analyser les données envoyées dans la requête HTTP

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

            // Rendu d'une vue EJS avec les commentaires récupérés
            ejs.renderFile(`${require.main.path}/views/comment/index.ejs`,
                { commentaires }, (error, pageRender) => {
                    if (error) {
                        console.error(error);
                        res.writeHead(500);
                        res.end();
                        return;
                    }

                    // Envoi de la réponse HTTP avec le HTML généré
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(pageRender);
                });
        } catch (err) {
            console.error("Erreur lors de la récupération des commentaires", err);
            res.writeHead(500, { "Content-Type": "text/html" });
            res.end("Erreur lors de la récupération des commentaires");
        }
    },

    // Méthode pour gérer la requête GET sur la route '/comment/message'
    messageGET: (req, res) => {
        // Rendu d'une vue EJS pour afficher un formulaire d'ajout de commentaire
        ejs.renderFile(
            `${require.main.path}/views/comment/add.ejs`,
            {},
            (erreur, pageRender) => {
                if (erreur) {
                    console.error(erreur);
                    res.writeHead(500);
                    res.end();
                    return;
                }

                // Envoi de la réponse HTTP avec le HTML généré
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                res.end(pageRender);
            }
        );
    },

    // Méthode pour gérer la requête POST sur la route '/comment/message'
    messagePOST: async (req, res) => {
        try {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', async () => {
                // Analyse des données du formulaire envoyées dans le corps de la requête
                const parsedBody = queryString.parse(body);
                const { Prénom, Nom, Note, Email, Message } = parsedBody;

                // Création d'une connexion à la base de données
                const db = await createDbConnection();
                const request = new mssql.Request(db);

                // Définition des paramètres de la requête SQL avec les données du formulaire
                request.input("Prénom", mssql.NVarChar, Prénom);
                request.input("Nom", mssql.NVarChar, Nom);
                request.input("Note", mssql.Int, parseInt(Note));
                request.input("Email", mssql.NVarChar, Email);
                request.input("Message", mssql.NVarChar, Message);

                try {
                    // Exécution de la requête SQL pour insérer un nouveau commentaire
                    await request.query(
                        "INSERT INTO Commentaires (Prénom, Nom, Note, Email, Message) VALUES (@Prénom, @Nom, @Note, @Email, @Message)"
                    );

                    // Envoi d'une réponse HTTP pour indiquer que le commentaire a été ajouté avec succès
                    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                    res.end(`<h1>Commentaire ajouté avec succès</h1>
                        <a href="/comment">Retour au commentaire</a>`);

                } catch (err) {
                    console.error("Erreur lors de l'ajout du commentaire", err);
                    res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
                    res.end("Erreur lors de l'ajout du commentaire");
                }
            });
        } catch (err) {
            console.error("Erreur lors de la gestion de la requête POST", err);
            res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
            res.end("Erreur lors de la gestion de la requête POST");
        }
    }
};

// Export de l'objet commentController pour être utilisé ailleurs
module.exports = commentController;

