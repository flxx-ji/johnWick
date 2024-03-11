// J'importe la classe Pool de pg 

const { Pool } = require ("pg");

//Les variables d'environement sont charger depuis .env avec le module dotenv
require('dotenv').config();

//Ensuite je crée une nouvelle instance Pool en incluant les informations de mon dotenv

const pool = new Pool();

// Connexion a la bdd
// la methode connect renvoir une promesse pour gérer la connexion de asynchrone
pool.connect()
    .then(()=> {
        console.log("la connexion avec la bdd est réussie");
    })
     .catch((error) => {
        //Si une erreur se manifeste pendant la connexion.
        console.error("Erreur de connexion a la bdd", error.message);
     });

module.exports = pool;