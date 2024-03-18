const { filmController } = require('../controller');

const express = require('express');
const router = express.Router();

//Tous les films listés
router.get('/', filmController.getAll);

//Récupération d'un film par son id
router.get('/:id', filmController.get);

//Ajout d'un nouveau film
router.post('/', filmController.add);

//Modification d'un film
router.put('/:id', filmController.update);

//Récupération tous le personnages pour un film
router.get('/personnage/:filmId', filmController.getAllPersonnageByFilm);