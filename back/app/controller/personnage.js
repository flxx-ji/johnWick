const { personnageDataMapper} = require ("../datamapper");

const { personnageOrigineDataMapper } = require ("../datamapper");
 
const controller = {

    // je récupere tous les personnages

    async getAll(_, res, next) {
        const { error, result } = await personnageDataMapper.getAll();
        //Si j'ai une error
        if (error) {
            // j'ai une erreur
            next(error);
        } else {
            //Sinon je donne tous les personnages
            res.json(result);
        }
    },

    //Je recupere un personnage par son ID

    async getById(req, res, next) {
    
    // Je recupere un personnage par l'ID du perso
    
    const { error, result } = await personnageDataMapper.getById(req.params.id);
    //Si j'ai une erreur
    if (error) {
        
        //J'ai une erreur
        next(error);
    } else {
        //Sinon je donne le personnage
        res.json(result)
    }

    },

    //J'ajoute un personnage

    async add(req, res, next) {
        const newPersonnage = req.body;

        //J'envoie le nouveau personnage dans la bdd avec son id
        const { error, result } = await personnageDataMapper.add(newPersonnage);
        // Si j'ai une erreur
        if (error) {
          // J'ai une erreur
          next(error);
        } else {
            // Mon nouveau personnage est ajouté
            res.json(result);
        }
    },

    //Mise a jour d'un personnage

    async update (req, res, next) {
    // Je recupere le personnage que je veux modifier
    const { error, result } = await personnageDataMapper.update(req.params.id, req.body);
    
    //si j'ai une erreur
    if (error) {
      // j'ai une erreur
      next(error);
    } else {
        //sinon je renvoie le personnage modifie
        res.json(result);
    }

         
    },

    //récuperer les personnages par leur origine 
    
   async getAllPersonnageByOrigine(req, res, next) {
    //Recuperation de tous les personnages d'une origine 
    const { error, result} = await personnageOrigineDataMapper.getAllPersonnageByOrigin(
    
    req.params.origineId
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
}


module.exports = controller;