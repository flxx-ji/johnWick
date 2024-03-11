require ("dotenv").config();
const express = require("express");
const pgPromise = require("pg-promise");
const cors = require("cors");

const app = express();
const pgp = pgPromise();

app.use(express.json());

app.use(cors());


const PORT = process.env.PORT || 3001;

//Démarage serveur
app.listen(PORT, () => {
    console.log(`Dammn! le serveur a démarré sur le prot ${PORT}`);
});
