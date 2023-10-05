const express = require('express'); 
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/', menuController.index);
router.get('/:id', menuController.details);

module.exports = router;