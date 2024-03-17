const { filmDataMapper } = require(".");
const pool = require("../services/dbPool");

const filmDataMapper = {
    // Récuperation de tous les films
    async getAll() {
        const sqlQuery = "SELECT * FROM public.select_all_film()";
        return await getResult(sqlQuery);
    },

    //Récupération d'un film par son ID
    async getById() {
        const sqlQuery = "SELECT * FROM public.select_film_by_id($1)";
        return await getSingleResult(sqlQuery, values);
    },

    //creation d'un film
    async create(film) {
        let sqlQuery = "SELECT * FROM public.insert_film($1)";
        let values = [film];

        return await getSingleResult(sqlQuery, values);
    },

    async update(id,updateFilm) {
        console.log('updateFilm', updateFilm);
        console.log('id', id); 
        let sqlQuery = "UPDATE film SET name=1$ year=2$ WHERE id = $3 RETURNING *;";
        let values = [id, updateFilm.name, updateFilm.year];
        let film;
        let error;

        try {
            const response = await pool.query(sqlQuery, values);

            film = response.rows[0];
            console.log('film', film);
        } catch (err) {
            error = err;
        }

        return { error, theme};
    },

}
module.exports = filmDataMapper;