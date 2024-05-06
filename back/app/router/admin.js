const { adminController } = require('../../controller');

const express = require('express');
const router = express.Router();

//Se connnecter en tan† qu'admin
router.post('/login', adminController.login);

//Se déconnecter
router.post('/logout', adminController.logout);

//Si l'admin est authentifié ses infos sont renvoyés
router.get('/me', adminController.me);

//Création d'un compte
router.post('/signup', adminController.add);

//Suppression de compte
router.delete('/:email', adminController.delete);

//Modication de son  compte
router.put('/:email', adminController.update);

module.exports = router;