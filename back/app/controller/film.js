const { filmDataMapper} = require ("../datamaper");
const { filmPersonnageDataMapper} = require("../datamapper");

const controller = {
    
    //J'obtient tous les films

    async getAll(_, res, next) {
        
        //je recupere tous les films en BDD

        const { error, result } = await filmDataMapper.getAll();

        //si j'ai une erreur
        if (error) {
            // j'ai un msg d'erreur
            next(error);
        } else {
            //sinon je retourne tous les films
            res.json(result);
        }
    },
    
   //Récuperer un film

   async get(req, res, next) {

    //je recupere un film par son ID
    const { error, result } = await filmDataMapper.get(req.params.id);
    
    //si j'ai une erreur
    if (error) {
        // j'aurais un msg d'erreur
        next(error);
     } else {
        //sinon je retourne les films
        res.json(result)
     }
   },

   //Ajout d'un nouveau film

   async add(req, res, next) {

    const newFilm = req.body;
    //J'retourne le film dans la bdd avec son ID

    const { error, post } = await filmDataMapper.create(newFilm);

    try {
        newFilm.category.map(
            async (item) => 
            await filmPersonnageDataMapper.create(film.id, item.personnage_id)
        );
    } catch (error) {
        console.log(error);
    }
    
     //si j'ai une erreur
    if (error) {
     //alors je reçois une erreur
     next (error);
    } else {
        //si je retourne le film
        res.json(film);
    }

   },

   //mise a jour d'un film

   async update(req, res, next) {
    // je recupere le film qui doit etre modifier dans la bdd
    const { error, post } = await filmDataMapper.update(
        req.params.id,
        req.body
    );
     
    //si j'ai une erreur
    if (error) {
    //alors j'aurais un msg d'erreur
    next(error);

    }else {
        //sinon le film mis a jour est retourné
        res.json(film);
    }
   },

   async getAllPersonnageByFilm(req, res, next) {
    //Recuperation de tous les personnages d'un film 
    const { error, result} = await filmDataMapper.getAllPersonnageByFilm(
    
    req.params.personnageId
    );

    //si j'ai une erreur
    if (error) {
    //alors j'ai un msg d'erreur
    next(error);
    } else {
    //sinon j'obtient le resultat
    res.json(result);
    }
   }
 
};

modules.exports = controller; 

