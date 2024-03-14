const { origineController } = require ('../controller');

const express = require ('express');
const router = express.Router;

//Affichage des toutes les origines 
router.get('/', origineController.getAll);

//Accéder à une origine par son ID
router.get('/:id', origineController.get);

//Créer une origine
router.post('/', origineController.add);

//Modifier une origine
router.put('/:id', origineController.update);

//exportation du router
module.exports = router;