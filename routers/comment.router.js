const express = require('express');
const router = express.Router();

// Simulation d'une base de données de commentaires
const commentsDatabase = [];

// Route GET pour récupérer la liste des commentaires
router.get("/", (req, res) => {
  // Renvoie la liste des commentaires depuis la base de données
  res.json(commentsDatabase);
});

// Route GET pour afficher un formulaire d'ajout de commentaire
router.get("/message", (req, res) => {
  res.send(`./comment/index.ejs`);
});

// Route POST pour enregistrer un nouveau commentaire
router.post("/message", (req, res) => {

  // Récupère les données du formulaire
  const { prenom, nom, note, email, message } = req.body;

  // Vous pouvez valider les données et les ajouter à la base de données
  const newComment = { prenom, nom, note, email, message };
  commentsDatabase.push(newComment);

  // Renvoie un message de confirmation
  res.send("Commentaire ajouté avec succès");
});

// Route PUT pour mettre à jour un commentaire existant (à implémenter)
router.put("/:id", (req, res) => {

  // Récupère l'ID du commentaire à mettre à jour depuis les paramètres de l'URL
  const commentId = req.params.id;

  // Récupère les données du formulaire
  const { prenom, nom, note, email, message } = req.body;

  // Renvoie un message de confirmation
  res.send("Commentaire mis à jour avec succès");
});

// Route DELETE pour supprimer un commentaire par son ID
router.delete("/:id", (req, res) => {
    
  // Récupère l'ID du commentaire à supprimer depuis les paramètres de l'URL
  const commentId = req.params.id;

  // Suppression du commentaire
  res.send("Commentaire supprimé avec succès");
});

// Exporte le routeur configuré pour la gestion des commentaires
module.exports = router;
