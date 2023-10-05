const aboutController = {
    index: async (req, res) => {
        try {
            // Utilisation de la fonction intégrée res.render pour le rendu EJS
            res.render("index.ejs", {
                page: "pages/about/index",
            });
        } catch (error) {
            console.error("An error occurred:", error);
            res.status(500).send("Internal Server Error");
        }
    }
};

module.exports = aboutController;