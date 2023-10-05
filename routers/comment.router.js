const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.get('/', commentController.index);
router.get('/add', commentController.messageGET);
router.post('/add', commentController.messagePOST);

// Exporte le routeur configuré pour la gestion des commentaires
module.exports = router;
