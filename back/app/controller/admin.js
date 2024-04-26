const { adminDataMapper } = require("../datamapper");
const tokenService = require("../services/token");
const bcrypt = require("bcrypt");

const controller = {

    //Récupération des admin

    async getAll(_, res, next) {
        
        //je récupère tous les admins
        const { error, result } = await adminDataMapper.getAll();
        // si j'ai une erreur
        if (error) {
            next (error);

        // sinon j'affiche / je retourne tous les admin
         } else {
            res.json(result);
         }
    },

    //Ajout d'un admin 

    async add(req, res, next) {
       
        const newAdmin = req.body;

        //le password est haché pour éviter toute sorte d'attaque
        const passwordH = await bcrypt.hash(newAdmin.password, 10);
        newAdmin.password = passwordH;

        //Vérification de l'exactitude des infos requises

         const { error, admin } = await adminDataMapper.add(newAdmin);
         
        // si j'ai une erreur
         if (error) {
        //alors je reçois ce msg
        next(error);
        
         // sinon 
         } else {
            const token = tokenService.get(admin);
            res.json({admin, token});
         }
    },

    //Vérification des infos email/password

    async login (req, res) {
        //récupération de email et password de la requête
        const { email, password } = req.body;

        //Vérification si l'admin existe dans la bdd
        const admin = await adminDataMapper.login(email);

        //Si l'admin est nulle part, une erreur 401 sera renvoyer
        if (!admin) {
            return res.status(401).json({message: `"Utitlisateur n'existe pas!"`});
        }

        //Vérification du password/mot de passe
        const match = await bcrypt.compare(password, admin.result.password);

        //Si le password/mot de passe ne correspond pas , une erreur sera envoyé
        if (!match) {
            return response.status(401).json({message: "mot de passe incorrect."});
        }

        //En cas oú l'admin existe et le password est correct, alors la session est activée
        req.session.adminId = admin.result.id;
        req.session.adminEmail = admin.result.email;

        req.session.isAuth = true;
        
        //Alors une reponse dit 200 indique le succès de la connexion, et l'admin est renvoyé
        //avec un cookie.
        const token = tokenService.get(admin);
        res.status(200).json({message: "Connexion établie", admin, token});
     },

     //Déconnexion et suppression du cookie
     async logout(req, res) {

        //Destruction de la session
        req.session.destroy();

        //Suppression du Cookie 
        res.clearCookie("connect.sid");

        //Un message de succés est renvoyé en Json
        res.status(200).json({message: "Déconnexion réussie" });
     },

     //Récupération du profil par l'email

    async  getProfile(req, res, next) {

        //Récupération de l'email dans les parametres de la requete
        const email = req.params.email;

        const { error, result } = await adminDataMapper.get(email);
    
        //S'il l'email n'existe pas 
        if (error) {
        //Donc un message d'erreur est envoyé
        next(error);
        
        //sinon l'admin est envoyé
        }else {
            res.json(result);
        }
    },

    async delete(req, res, next) {
      
    //Récupération de l'email dans les parametres de la requete
    const email = req.params.email;

    const {error, result} = await adminDataMapper.delete(email);

    //Si il y a une erreur
    if (error) {
    //Un message d'erreur est envoyé
    next(error)
    
    //sinon le message de suppression est envoyé
    res.json(result);
    }
    },

    //Mise à jour du profil 

    async update(req, res, next) {

    //Récupération du profil à modifier dans la bdd
    const email = req.params.email;
    const adminUpdate = req.body;
    adminUpdate.email = email;
    //Admin.email retourne le profil modifié dans la bdd
    const { error, result } = await adminDataMapper.update(adminUpdate);

    //Si il y a une erreur 
    if (error) {
         //Alors un message d'erreur est envoyé
    next (error);

    //Sinon l'admin est renvoyé modifié
    }else {
        res.json(result);

    }
     },

};

module.exports = controller;