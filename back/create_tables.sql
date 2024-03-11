BEGIN;

TRUNCATE TABLE "Personnage", "Film","Origine","FilmPersonnage","PersonnageOrigine" RESTART IDENTITY CASCADE;

`//Création de la table "Personnage" `
CREATE TABLE
   IF NOT EXISTS "Personnage" (
    id serial PRIMARY KEY,
    nom_personnage text NOT NULL,
    role_personnage text NOT NULL
   );
`//Création de la table  "Film"`
  CREATE TABLE 
   IF NOT EXISTS "Film"(
    id serial PRIMARY KEY,
    titre_film text NOT NULL,
    annee_sortie integer
   );
`//Création de la table "Origine"`
CREATE TABLE 
 IF NOT EXISTS "Origine" (
    id serial PRIMARY KEY,
    nom_origine text NOT NULL
 );
`//creation de la table d'association "FilmPersonnage"`
CREATION TABLE
 IF NOT EXISTS "FilmPersonnage" (
    id serial PRIMARY KEY,
    id_film integer NOT NULL,
    id_personnage integer NOT NULL,
    CONSTRAINT film_personnage-film_id_fkey FOREIGN KEY (id_film) REFERENCES Film (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE NOT VALID,
    CONSTRAINT film_personnage_personnage_id_fkey FOREIGN KEY (id._personnage) REFERENCES (id) MATCH SIMPLE ON UPDATE NO ACTION NOT VALID
 );


`//Création de la table d'association "PersonnageOrigine `
CREATION TABLE
 IF NOT EXISTS "PersonnageOrigine" (
    id serial PRIMARY KEY,
    id_personnage integer NOT NULL,
    id_origine integer NOT NULL,
    CONSTRAINT personnage_origine-personnage_id_fkey FOREIGN KEY (id_personnage) REFERENCES (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE NOT VALID,
    CONSTRAINT personnage_origine_origine_id_fkey FOREIGN KEY (id_origine) REFERENCES Origine (id) MATCH SIMPLE ON UPDATE NO ACTION NOT VALID
 );

COMMIT;