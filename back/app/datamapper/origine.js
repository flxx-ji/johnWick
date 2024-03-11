const pool = require("../services/dbPool");

const origineDataMapper = {
    
    //récupération de toutes les origines

    async getAll() {
        let sqlQuery = "SELECT * FROM origine.select_all_post()";

        return await getManyResults(sqlQuery);
    },

    // récupération d'une origine par son id 

    async get(id) {
        let sqlQuery = "SELECT * FROM origine.select_origine_by_id($1)";
        let values = [id];

        return await getSingleResult(sqlQuery, values);
    },

    //création de l'origine d'un personnage
   
    async create(origine) {
        let sqlQuery = "SELECT * FROM origine.insert_origine($1)";
        let values = [origine];

        return await getSingleResult(sqlQuery, values);
    },

    //Mise à jour de l'origine

    async update (id, updateOrigine) {
        console.log('updateOrigine', updateOrigine);
        console.log('id', id);
        
        let sqlQuery = "UPDATE origine name=$3 country=$2 WHERE id = $1 RETURNING *;";
        let values = [id, updateOrigine.name, updateOrigine.country];
        let origine;
        let error;
        try {
            const response = await pool.query(sqlQuery, values);

            origine = response.rows[0];
            console.log('origine', origine);
        }catch (err) {
            error = err;
        }

        return { error, theme};
    }
};

module.exports = origineDataMapper;