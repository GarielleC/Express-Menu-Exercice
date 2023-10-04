// Importation des modules requis
const mssql = require("mssql");
const ejs = require('ejs');
const { createDbConnection } = require('../utils/db_utils');


const menuController = {
    index: async (req, res) => {
        try {
            const db = await createDbConnection();
            const result = await db.request().query("SELECT * FROM Plats");

            const plats = result.recordset.map((row) => ({
                id: row["ID"],
                nom: row["Nom"],
                image: row["Image"],
                description: row["Description"],
                breveDescription: row["BreveDescription"],
                prix: row["Prix"],
                allergenes: row["Allergenes"],
            }));

            ejs.renderFile(
                `${require.main.path}/views/menu/index.ejs`,
                { plats },
                (error, pageRender) => {
                    if (error) {
                        console.error(error);
                        res.writeHead(500);
                        res.end();
                        return;
                    }

                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(pageRender);
                },
            );
        } catch (error) {
            console.error("An error occurred:", error);
            res.status(500).send("Internal Server Error");
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
                res.writeHead(404, { "Content-Type": "text/html" });
                res.end("Plat non trouvé");
                return;
            }

            const plat = result.recordset[0]; // Puisqu'on recherche un plat spécifique, on prend le premier

            console.log(plat); // Affiche le plat pour le débogage

            ejs.renderFile(
                `${require.main.path}/views/menu/details.ejs`,
                { plat },
                (error, pageRender) => {
                    if (error) {
                        console.error(error);
                        res.writeHead(500, { "Content-Type": "text/html" });
                        res.end("Erreur interne du serveur");
                        return;
                    }

                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(pageRender);
                },
            );
        } catch (error) {
            console.error("Une erreur s'est produite:", error);
            res.writeHead(500, { "Content-Type": "text/html" });
            res.end("Erreur interne du serveur");
        }
    },
};

module.exports = menuController;