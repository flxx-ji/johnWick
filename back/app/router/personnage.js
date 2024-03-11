const express = require ('express');
const router = express.Router();
const {personnageController} = require('../controller');

//Récupération de tous les personnages
router.get('/', personnageController.getAll);

//Récupération d'un personnages par son Id
router.get('/:id', personnageController.getById);

//Ajout d'un nouveau personnage
router.post('/', personnageController.add);

//Mise à jour personnage
 router.put('/:id', personnageController.update);

module.exports = router;