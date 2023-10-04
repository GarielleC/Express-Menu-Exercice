use DemoSql
go

-- Création de la table Plats
CREATE TABLE Plats (
	ID INT PRIMARY KEY IDENTITY(1,1),
	Nom NVARCHAR(50),
    Image NVARCHAR(255),
    BreveDescription NVARCHAR(30),
    Prix DECIMAL(10, 2) CHECK (Prix >= 0),
    Allergenes NVARCHAR(300)
);
-- Insertion des données pour les potages
INSERT INTO Plats (Nom, Image, Description, BreveDescription, Prix, Allergenes)
VALUES
    ('Potage Piquant', 'PotagePiquant.jpg', 'Le potage piquant est une soupe épicée préparée avec un bouillon de légumes ou de poulet comme base, des légumes variés, des épices (comme le piment, le cumin, le paprika), et éventuellement de la viande ou des protéines végétales. Il est garni de fromage, de crème aigre ou d autres ingrédients selon les préférences. C est un plat réconfortant, épicé et savoureux, apprécié pour sa combinaison de saveurs piquantes et riches en umami.','Soupe épicée et relevée', 4.80, 'Contient potentiellement des allergènes : gluten, soja, crustacés'),
    ('Potage Tomate', 'PotageTomate.jpg','Le potage tomate est une soupe à base de tomates mûres, parfumée aux herbes et aux épices, servie chaude et souvent garnie de crème fraîche, de basilic ou de croûtons. Il est apprécié pour sa simplicité, sa fraîcheur et sa polyvalence en tant qu entrée ou accompagnement léger.', 'Soupe à la tomate', 4.50, 'Peut contenir des allergènes : gluten, lait, sulfites'),
    ('Bouillon de Poulet aux Cheveux d Ange', 'BouillondePouletauxCheveuxdAnge.jpg','
Le bouillon de poulet aux cheveux d ange est une soupe légère et réconfortante associant un bouillon de poulet savoureux à de fines nouilles. Agrémenté de légumes frais, il offre un équilibre parfait entre chaleur apaisante et délicatesse des nouilles. C est une option populaire pour une entrée ou un repas léger, appréciée pour sa simplicité et son goût réconfortant.', 'Bouillon de poulet avec pâtes fines', 4.80, 'Peut contenir des allergènes : céleri, oeufs, sulfites'),
    ('Crème de Nid d Hirondelles', 'CremedeNiddHirondelles.jpg', 'La crème de nid d hirondelles est un plat délicat qui se caractérise par l utilisation d un ingrédient spécial : les nids comestibles fabriqués à partir de la salive d hirondelles. Ces nids sont cuits dans un bouillon parfumé jusqu à devenir translucides, puis mélangés à une crème pour créer une soupe onctueuse. Ce plat est apprécié pour sa saveur subtile et sa texture lisse, mais il suscite également des préoccupations liées à la durabilité de la récolte des nids d hirondelles. Certains restaurants proposent des alternatives végétales pour reproduire la texture sans utiliser ces nids.','Mets exquis, texture délicate, saveur subtile', 4.50, 'Peut contenir des allergènes : céleri, sulfites, œufs');

-- Insertion des données pour les plats traditionnels
INSERT INTO Plats (Nom, Image, Description,BreveDescription, Prix, Allergenes)
VALUES
    ('Filet de Canard sur Ti-Pan sauce Aigre-douce', 'FiletdeCanardsurTiPansauceAigredouce.jpg', 'Le Filet de Canard sur Ti-Pan sauce Aigre-douce est un plat délicieux qui offre une expérience gastronomique exceptionnelle. Il présente un filet de canard tendre et juteux, cuit à la perfection sur un Ti-Pan (wok), accompagné de légumes croquants. La star de ce plat est la sauce aigre-douce, équilibrée entre le sucré et l acide, qui enrobe chaque ingrédient pour créer une explosion de saveurs. Cette fusion de cuisine asiatique et de techniques de cuisson occidentales offre une expérience gustative mémorable et raffinée.','Canard aigre-doux savoureux', 15.90, 'Peut contenir des allergènes : arachides, lactose, crustacés'),
    ('Filet de Canard sur Ti-Pan sauce Piquante', 'FiletdeCanardsurTiPansaucePiquante.jpg', 'Le Filet de Canard sur Ti-Pan sauce Piquante est un plat audacieux qui présente un filet de canard préparé avec soin, cuit sur un Ti-Pan (wok) pour une texture tendre et sautillante. La sauce piquante qui l accompagne ajoute une intensité de saveur remarquable, créant une expérience culinaire vibrante pour les amateurs de plats épicés. Ce plat marie habilement le canard succulent et la vivacité de la sauce piquante pour une expérience gustative inoubliable.','Canard épicé sauté', 15.90, 'Peut contenir des allergènes : soja, lactose, sésame'),
    ('Blanc de Poulet sur Ti-Pan sauce Sha-cha', 'BlancdePouletsurTiPansauceShacha.jpg','Le blanc de poulet sur ti-pan avec sauce Sha-cha est un plat asiatique qui marie des morceaux de blanc de poulet tendre avec une sauce Sha-cha riche en saveurs. Cuit dans un wok ou un ti-pan, le poulet est rapidement sauté avec cette sauce composée d ingrédients tels que le sésame, l ail, les échalotes et les crevettes séchées, créant une combinaison umami unique. Des légumes frais comme les poivrons et les champignons peuvent être ajoutés. Servi avec du riz, ce plat offre un équilibre délicat entre salé et umami, avec une texture tendre, en faisant une option appréciée dans la cuisine asiatique.', 'Poulet, sauce Sha-cha', 15.90, 'Peut contenir des allergènes : soja, arachides, moutarde'),
    ('Émincés de Bœuf sur Ti-Pan sauce Piquante', 'EmincesdeBeufsurTiPansaucePiquante.jpg','Les émincés de bœuf sur ti-pan avec sauce piquante sont un plat asiatique délicieux qui marie des tranches fines de bœuf tendre avec une sauce épicée. Cuit dans un wok ou un ti-pan, le bœuf est rapidement sauté avec une sauce piquante composée d ingrédients tels que le piment, l ail, le gingembre, la sauce soja et le sucre. Des légumes comme les poivrons, les oignons et les carottes sont souvent ajoutés pour la fraîcheur et la texture. Servi avec du riz ou des nouilles, ce plat offre un mélange de saveurs audacieuses, de tendreté et de chaleur épicée, en faisant une option appréciée dans la cuisine asiatique.', 'Bœuf, sauce piquante.', 15.90, 'Peut contenir des allergènes : gluten, poisson, moutarde');


-- Table pour les commentaires
CREATE TABLE Commentaires(
    ID INT PRIMARY KEY IDENTITY(1,1),
    Prénom NVARCHAR(50),
    Nom NVARCHAR(50),
    Note INT CHECK (Note >= 0 AND Note <= 10),
    Email NVARCHAR(50),
    Message NVARCHAR(300) CHECK (LEN(Message) >= 10)
);

-- Insertion des données pour les commentaires
INSERT INTO Commentaires (Prénom, Nom, Note, Email, Message)
VALUES
    ('John', 'Smith', 7, '007@gmail.com', 'Bienvenue sur notre site!'),
    ('Alice', 'Johnson', 8, 'alice@example.com', 'Très bon service.'),
    ('Bob', 'Brown', 5, 'bob@example.com', 'Besoin d amelioration'),
    ('Eve', 'Evans', 9, 'eve@example.com', 'Excellent service fourni ici');


-- Création de la table Images d'acceuil 
CREATE TABLE ImagesAccueil (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Image VARCHAR(255) NOT NULL,
    Description NVARCHAR(30),
);

-- Insertion des données pour les images d'acceuils
-- Insérer des données dans la table
INSERT INTO ImagesAccueil (Image, Description)
VALUES ('entrée.jpg', 'Entrée de l établissement'),
       ('intérieur.jpg', 'Intérieur de l établissement'),
       ('intérieur2.jpg', 'Une autre vue de l intérieur'),
       ('terrasse.jpg', 'Terrasse extérieure'),
       ('jardin.jpg', 'Jardin et espace extérieur');
