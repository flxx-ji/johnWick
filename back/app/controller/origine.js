const { origineDataMapper } = require (" ../datamapper");

const controller = {

    async getAll(_, res, next) {
        // Je récupere toutes les origines de la BDD
        const { error, result } = await origineDataMapper.getAll();
        if (error) {
            // s'il y a une erreur
            next(error);
            // je reçois une erreur
        } else {
            //Sinon toutes les origines sont retournées
            res.json(result);
        }
    },


    async get(req, res, next) {
        //Je récupère toutes les origines par leur ID
        const { error, result } = await origineDataMapper.get(req.params.id);
         
        // Si j'ai une erreur
        if (error) {
        // Je reçois une erreur
        next (error);

        //Sinon toutes les ID sont retournées

        } else {
            res.json(result);
        }

     },

     async create(req, res, next) {
        // je créer une nouvelle origine
        const newOrigine = req.body;
        
        const { error, result } = await origineDataMapper.create(newOrigine);

        //Si j'ai erreur
        if (error) {
        
        //Alors je reçois un message d'erreur
        next (error);
        
        //Sinon la nouvelle origine est retournée
        } else {
            res.json(result);
        }
     },

     async update(req, res, next) {

        // Je récupère l'origine a modifier

        const { error, origine  } = await origineDataMapper.update(
            req.params.id,
            req.body
        );

        // Si j'ai une erreur
        if (error) {
        //Alors je reçois une erreur
         next(error);
        
        // Sinon la nouvelle origine est bien assimilée
        }else {
            res.json(origine);
        }
     }
}; 
//On exporte le controller
module.exports = controller;