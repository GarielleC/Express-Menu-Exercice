const mssql = require("mssql");
const { createDbConnection } = require('../utils/db_utils');

const homeController = {
    index: async (req, res) => {
        try {
            const db = await createDbConnection();

            // Récupérer les données de la page d'accueil (Supposant une seule entrée)
            const result = await db.request().query("SELECT TOP 1 * FROM Accueil");
            const accueilData = result.recordset[0];

            // Utilisation de la fonction intégrée res.render pour le rendu EJS
            // res.render('pages/home/index', { accueilData });
            res.render("index.ejs", {
                page: "pages/home/index",
                accueilData: accueilData,
            });
        } catch (error) {
            console.error("An error occurred:", error);
            res.status(500).send("Internal Server Error");
        }
    },
};

module.exports = homeController;