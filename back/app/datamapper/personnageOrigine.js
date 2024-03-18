const pool = require ('../services/dbPool');

const personnageOrigineDataMapper = {

    //Création liaison entre les table personnage et origine

    async create(personnageId, origineId) {
        const sqlQuery = `INSERT INTO "personnageOrigine" (personnageId, origineId)
                          VALUES ($1, $2) RETURNING *;`;
     
    let values = [personnageId, origineId];

    let personnageOrigine;
    let error;
    try {
        const response = await pool.query(sqlQuery, values);
        personnageOrigine = response.rows[0];
    } catch (err) {
        error = err;
    }
    return { error, personnageOrigine };

    },


    //Mise à jour liaison 


    async update(id, updatePersonnageOrigine) {

        const sqlQuery = `UPDATE "personnageOrigine" SET origineId = $2  WHERE personnageId = $1 RETURNING *;`;
        const values = [id, updatePersonnageOrigine.personnageId, updatePersonnageOrigine.origineId];

        let personnageOrigine;
        let error;
        try {
            const response = await pool.query(sqlQuery, values);

            personnageOrigine = response.rows[0];
        } catch (err) {
            error = err
        }

        return { error, personnageOrigine };
    }
};

module.exports = personnageOrigineDataMapper;