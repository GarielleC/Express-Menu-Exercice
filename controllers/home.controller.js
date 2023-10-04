const ejs = require('ejs');
const { createDbConnection } = require('../utils/db_utils');
const homeController = {

    index: async (req, res) => {
        //! Page d'accueil -> Nom, texte de présentation, images
    
        // Rendu de la page (callback)( /!\le require.main.path permet d'obtenir le répertoir racine)
        ejs.renderFile(`${require.main.path}/views/Home/index.ejs`, (error, pageRender)=>{
            // *Erreur lors de la génération du rendu
            if(error) {
                console.error(error);
                res.writeHead(500);
                res.end();
                return;
            }
            // * Génération de le vue réussi !
            res.writeHead(200, {"Content-Type" : "text/html"});
            res.end(pageRender);
        });
    },

    messagePOST: (req,res) => {
        //! Traitement des données du formulaire

    },
};
module.exports = homeController;