const pool = require ('../services/dbPool');

const filmPersonnageDataMapper = {

//Création de la liaison entre film et personnage

async create(filmId, personnageId) {
    const sqlQuery = ` INSERT INTO "filmPersonnage"
    (filmId, personnageId)
    VALUES
    ($1, $2)
    RETURNING * ;`;

    let values = [filmId,personnageId];
    let filmPersonnage;
    let error;
    try {
        const response = await pool.query(sqlQuery, values);
        filmPersonnage = response.rows[0];
    }catch (err) {
        error = err;
    }
    return { error, filmPersonnage};
},

  //Mise a jour liaison

   async update(id, updateFilmPersonnage) {

    const sqlQuery = ` UPDATE film SET filmId = $2, personnageId = $3 
                      WHERE id = $1 RETURNING *;`;
    const values = [id, updateFilmPersonnage.filmId,
                        updateFilmPersonnage.personnageId];

     let filmPersonnage;
     let error;
     try {
        const response = await pool.query(sqlQuery, values);

        filmPersonnage = response.rows[0];
     }catch (err) {
        error = err;
     }

     return { error, filmPersonnage};
   }
}

module.exports = filmPersonnageDataMapper;