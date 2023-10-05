// Importation des modules requis
const mssql = require("mssql");
const { createDbConnection } = require('../utils/db_utils');

const menuController = {
    index: async (req, res) => {
        try {
            const db = await createDbConnection();
            const result = await db.request().query("SELECT * FROM Plats");

            const plats = result.recordset.map((row) => ({
                id: row.ID,
                nom: row.Nom,
                image: row.Image,
                description: row.Description,
                breveDescription: row.BreveDescription,
                prix: row.Prix,
                allergenes: row.Allergenes,
            }));

            // Utilisation de la fonction intégrée res.render pour le rendu EJS
            res.render("index.ejs", {
                page: "./Pages/menu/index",
                menu: plats,
            });
        } catch (err) {
            console.error("Erreur lors de la gestion de la requête GET", err); 
            res.status(500).send("Erreur lors de la gestion de la requête GET"); 
        }
    },

    details: async (req, res) => {
        try {
            const id = req.url.split("/").pop(); // Extrait l'ID depuis l'URL
            const db = await createDbConnection();

            const result = await db
                .request()
                .input("id", mssql.Int, id)
                .query("SELECT * FROM Plats WHERE ID = @id");

            if (result.recordset.length === 0) {
                console.log("Aucun plat trouvé pour l'ID donné");
                res.status(404).send("Plat non trouvé"); 
                return;
            }

            const plat = result.recordset[0]; 
            console.log(plat);

            // Utilisation de la fonction intégrée res.render pour le rendu EJS
            res.render("index.ejs", {
                page: "./Pages/menu/details",
                detail: plat, 
            });
        } catch (err) {
            console.error("Erreur lors de la gestion de la requête GET", err); 
            res.status(500).send("Erreur lors de la gestion de la requête GET"); 
        }
    },
};

module.exports = menuController;
