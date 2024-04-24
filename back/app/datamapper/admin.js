const pool = require("../services/dbPool");

const adminDataMapper = {


// Récupérations des administrateurs

async getAll() {
    let sqlQuery = "SELECT * FROM public.select_all_admin";

    return await getManyResults(sqlQuery);
},

// Ajout d'un admin

async add(adminInsert) {
    let sqlQuery = `INSERT INTO "admin" (name, email, password) VALUES ($1, $2, $3) RETURNING *;`;
    
    let values = [
        adminInsert.admin,
        adminInsert.mail,
        adminInsert.password,
    ];

    let admin;
    let error;

    try {
        const response = await pool.query(sqlQuery, values);
        admin = response.rows[0];
    } catch (err) {
        error = err;
    }
    //le nouveau admin remonter lorsque il n'y a pas d'erreur

    return { error, admin};
},

async login(email) {

    let sqlQuery = `SELECT * FROM "admin" WHERE email =$1`;

    let values = [email];

    return await getSingleResult(sqlQuery, values);
},

async get(name) {
    let sqlQuery = "SELECT * FROM select_admin_by_name($1)";
    
    let values = [name];

    return await getSingleResult(sqlQuery, values);
},

//Supprimer un admin

async delete(name) {
    let sqlQuery = "DELETE  FROM admin WHERE name = $1";
    let values = [name];

    return await getSingleResult(sqlQuery, values);
},

//admin mit à jour

async update(adminInfo) {
    let sqlQuery = "UPDATE admin SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *";

    let values = [adminInfo.name, adminInfo.email, adminInfo.password, adminInfo.id];

    return await getSingleResult (sqlQuery, values);
},


};

module.exports = adminDataMapper;

async function getManyResults (sqlQuery) {
    let result;
    let error;

    try {
        let response = await pool.query(sqlQuery);
        result = response.rows;
    } catch (err) {
        error = err;
    }
    return { error, result };
}

async function getSingleResult(sqlQuery, values) {
    let result;
    let error;

    try {
        let response = await pool.query(sqlQuery, values);
        result = response.rows[0];
    } catch (err) {
         
            error = err;

     }
      return { error, result };
}

