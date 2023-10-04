const ejs = require('ejs');
const { createDbConnection } = require('../utils/db_utils');
const aboutController = {

    index: async (req, res) => {
        //! Page d'accueil -> Nom, texte de présentation, images
    
        //  Récupération des données depuis la DB
        // const db = await createDBConnection();
        // const result = await db.query('')
        // console.log(res);

        // Rendu de la page (callback)( /!\le require.main.path permet d'obtenir le répertoir racine)
        ejs.renderFile(`${require.main.path}/views/about/index.ejs`, (error, pageRender)=>{
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

    // formulaire
    // messageGET: (req,res) => {
        // ! Page de formulaire
        // Rendu de la page (Promise) 
    //     console.log("test");
    //     ejs.renderFile(`'${require.main.path}/views/comment/add.ejs'`)
    //     .then(pageRender =>{

            // *Génération de la vue réussi !
    //         res.writeHead(200,{'content-type': 'text/html'});
    //         res.end(pageRender);
    //     }
    //         )
    //         .catch(error => {
        //  *Erreur lors de la génération du rendu
    //         res.writeHead(500);
    //         res.end();
    //         })
    // },
    messagePOST: (req,res) => {
        //! Traitement des données du formulaire

    },
};
module.exports = aboutController;