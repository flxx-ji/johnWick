const pool = require("../services/dbPool");

const personnageDataMapper = {
    //je récupère tous les personnages, et les retourne tous
    async getAll() {
        const sqlQuery = " SELECT * FROM public.select_all_personnage()";
        return await getResult(sqlQuery);
    },

    //je récupére un personnage par son Id
    //Son identifiant
    //retourne un personnage
    async getById(id) {
        const sqlQuery = "SELECT * FROM public.select_personnage_by_id($1)";
        const values = [id];
        return await getSingleResult(sqlQuery, values);
    },

    //j'ajoute un personnage
    //ses données
    // retourne le nouveau personnage
    
    async add(personnageAdd) {
        const sqlQuery = `INSERT INTO "personnage"(nom, origine, role) VALUES ($1, $2, $3) 
         RETURNING *;`

        const values = [personnageAdd.nom, personnageAdd.origine, personnageAdd.role];

        return await getResult(sqlQuery, values);
    },

    async update(id, updatePersonnage) {
        const sqlQuery = `UPDATE personnage SET nom = $2, origine = $3, role = $4 WHERE id = $1 RETURNING *`;
        const values = [id, updatePersonnage.nom, updatePersonnage.origine, updatePersonnage.role];
        return await getResult(sqlQuery, values)
    }
};

module.exports = personnageDataMapper;

async function getResult(sqlQuery, values){
//les resultats sont stockés dans la variable
  let result;
// les erreurs si il y en a seront stockées dans cette variable
  let error;

  try{
    //la requete SQL est executé dans la bdd avec les valeurs
    const response = await pool.query(sqlQuery, values);
    // si la requete est réussi, la variable result stockera les résultats
    result = response.rows;
  } catch (err) {
    // si iy a une erreur pendant l'execution , un msg d'erreur sera envoyée
    error = err;
  }
  //un objet est retourné avec les résultats ou les erreurs
  return { error, result};
}

async function getSingleResult (sqlQuery, values) {
    //Un seul résultat sera stocker dans la variable
    let result;
    // Comme précedement création d'une variable pour les eventuelles erreures
    let error;

    try {
        //La requete SQL s'execute dans la bdd ainsi que les valeurs
        const response = await pool.query(sqlQuery, values);

        //Si la requete fonctionne , le resultat sera stocké dans la variable result
        result = response.rows[0];
    }catch (err) {
        error = err;
        //Si une erreur survient pendant l'execution un msg d'erreur sera envoyée
    }
    //Le resultat unique retourne sous forme d'objet ainsi que les eventuelles erreurs
    return { error, result };
}