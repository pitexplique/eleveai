# 5e_manifeste.py — 2e poste, 15/11/2026
# Écrit manim/poste2/manifeste-5e.json : les 34 entrées (17 paysages + 17 shorts) de la série 5e « Aire, volume et
# conversions », au format de manim/manifeste-youtube.json (le 1er poste les y recopiera à la fusion ; pas_avant vide).
#   python manim/poste2/5e_manifeste.py
# Chapitres : temps « ECRAN … (s) » du dernier dry run (%TEMP%/dry-5e_<slug>.log, sinon relancé).
# Questions : lues dans les voix (manim/voix/5e-<slug>(-short).json), écrites avec les symboles (×, ÷, m², cm³…).
# Instant de la question d'un short : début du clip 02-question, recalculé depuis DUR et enchainer() du film.
import json
import os
import re
import subprocess
import sys
from pathlib import Path

RACINE = Path(__file__).resolve().parents[2]
TEMP = Path(os.environ.get("TEMP", "/tmp"))
SITE = "https://www.eleveai.fr"

NOTION = {"aire": "aire_surface", "volume": "volume_solide", "conversion": "grandeur_conversion"}
FICHE = {"aire": "aire-surface", "volume": "volume-solide", "conversion": "grandeur-conversion"}
SERIE_NOM = {"aire": "Aire", "volume": "Volume", "conversion": "Conversions"}
TAGS_FIN = ["maths", "5e", "collège", "cycle 4", "EleveAI"]

# slug, famille, n°, dossier, microId, ceinture, film (série, épisode), personne, chapitres 02/03/04,
# titre paysage, intro, puces, défi, tags, centres, titre short, intro short, tags short
M = [
    ("aire-comprendre", "aire", 1, "aire/01-comprendre", "aire_comprendre", "jaune", ("5e-aire", "comprendre"),
     "Awa, maçonne", ["Compter les carrés", "L'aire et le tour", "Même aire, autre forme"],
     "Un mur de 4 m sur 3 m : combien de m² d'enduit ? — Comprendre l'aire",
     "Awa est maçonne. Elle doit couvrir un mur d'enduit, et l'enduit se vend au mètre carré. Combien de mètres carrés faut-il ?",
     ["l'aire = le nombre de carrés-unité : 3 rangées de 4 carrés, 12 m²",
      "le tour (14 m) n'est pas l'aire (12 m²) : des m, pas des m²",
      "deux murs différents, même aire : 4 × 3 et 6 × 2, 12 m²",
      "le piège : le petit 2 de m² compte"],
     "enduire 4 murs (deux de 4 m sur 2,5 m, deux de 3 m sur 2,5 m) avec des sacs de 10 m²",
     ["aire", "mètre carré", "aire et périmètre", "unité d'aire", "maçonne"], ["art-design", "argent-budget"],
     "Pizza carrée ou rectangle : laquelle est la plus grande ?",
     "Ma pizza est carrée, 20 cm sur 20. Celle de mon frère est un rectangle, 25 cm sur 16. Il dit que la sienne est plus grande, parce qu'elle est plus longue… On compte ?",
     ["aire", "pizza", "comparer des aires"]),
    ("aire-triangle", "aire", 2, "aire/02-triangle", "aire_triangle", "verte", ("5e-aire", "triangle"),
     "Ibrahim, agriculteur", ["Le rectangle autour", "La moitié", "La méthode"],
     "Un coin de champ en triangle : combien de m² à semer ? — L'aire du triangle",
     "Ibrahim est agriculteur. Au bout de son champ, il reste un coin en triangle, où il veut semer des fleurs pour les abeilles. Combien de mètres carrés doit-il semer ?",
     ["le rectangle autour du triangle : 8 × 5 = 40 m²",
      "le triangle en prend la moitié : 40 ÷ 2 = 20 m²",
      "la formule : base × hauteur ÷ 2",
      "le piège : la hauteur n'est pas le côté penché, et on n'oublie pas le ÷ 2"],
     "retrouver la hauteur d'un triangle de 20 m² et de base 8 m, puis compter les fleurs",
     ["aire du triangle", "base", "hauteur", "formule", "agriculteur"], ["nature-ecologie", "cuisine"],
     "J'achète la peinture pour 12 m²… erreur ?",
     "Je peins le haut de ma cabane : un triangle de 4 m de base et de 3 m de haut. 4 × 3 = 12, j'achète de la peinture pour 12 m²… Bonne idée ?",
     ["aire du triangle", "cabane", "peinture"]),
    ("aire-parallelogramme", "aire", 3, "aire/03-parallelogramme", "aire_parallelogramme", "verte",
     ("5e-aire", "parallelogramme"), "Soraya, graphiste", ["Découper, glisser", "Le rectangle", "La méthode"],
     "Une forme penchée : comment mesurer son aire ? — L'aire du parallélogramme",
     "Soraya est graphiste. Son motif préféré pour les tissus : un parallélogramme, une forme penchée. Pour l'imprimer, elle doit connaître son aire.",
     ["couper le petit triangle, le glisser de l'autre côté : un rectangle",
      "6 × 4 = 24 cm² : rien n'a été perdu",
      "la formule : base × hauteur, sans diviser par 2",
      "le piège : la hauteur n'est pas le côté penché"],
     "combien de fois l'aire d'un motif tient dans un tissu de 60 cm sur 40 cm",
     ["aire du parallélogramme", "base", "hauteur", "graphiste", "motif"], ["reseaux-sociaux", "jeux-defis"],
     "Un coup de ciseaux change-t-il l'aire ?",
     "J'ai une feuille en parallélogramme : 5 cm de base, 2 cm de hauteur. Clac ! Je coupe le petit triangle et je le recolle de l'autre côté : un rectangle !",
     ["aire du parallélogramme", "ciseaux", "découpage"]),
    ("aire-composer", "aire", 4, "aire/04-composer", "aire_composer", "verte", ("5e-aire", "composer"),
     "Leïla, technicienne en énergies renouvelables", ["Découper en rectangles", "Compléter puis enlever", "La méthode"],
     "Un toit en L : combien de m² de panneaux solaires ? — L'aire d'une figure composée",
     "Leïla pose des panneaux solaires. Ce toit a une drôle de forme : un L. Combien de mètres carrés de toit a-t-elle ?",
     ["découper le L en deux rectangles : 24 + 6 = 30 m²",
      "ou compléter en un grand rectangle et enlever le morceau en trop : 36 − 6 = 30 m²",
      "la méthode : découper, calculer chaque morceau, additionner ou enlever",
      "le piège : chaque morceau compte une seule fois"],
     "un toit rectangle avec un triangle au bout : combien de panneaux de 2 m² ?",
     ["figure composée", "aire", "découper", "panneaux solaires", "énergies renouvelables"],
     ["nature-ecologie", "technologie-ia"],
     "La pancarte maison : quelle aire ?",
     "Je fabrique une pancarte en forme de maison : un carré de 4 dm de côté, et un toit en triangle de 4 dm de base et 3 dm de haut. Combien de peinture ?",
     ["figure composée", "pancarte", "maison"]),
    ("aire-defi", "aire", 5, "aire/05-defi", "aire_defi", "bleue", ("5e-aire", "defi"),
     "Mehdi, menuisier agenceur", ["Remonter la formule", "Vérifier", "La méthode"],
     "24 dm² et 8 dm de base : quelle hauteur ? — Défis sur les aires",
     "Mehdi est menuisier agenceur. Une cliente veut une tablette en triangle de 24 dm², avec une base de 8 dm. Quelle hauteur doit-il découper ?",
     ["remonter la formule : base × hauteur = 24 × 2 = 48, puis 48 ÷ 8 = 6 dm",
      "vérifier : 8 × 6 ÷ 2 = 24 dm²",
      "triangle : hauteur = aire × 2 ÷ base ; parallélogramme : base = aire ÷ hauteur",
      "le piège : le × 2 ne sert que pour le triangle"],
     "un plan de travail en L : combien de plaques de revêtement de 0,50 m² ?",
     ["aire", "défi", "retrouver une longueur", "formule", "menuisier"], ["argent-budget", "sciences"],
     "12 m² et 4 m de long : mon tapis rentre-t-il ?",
     "J'ai acheté un tapis de 12 m², long de 4 m. Mon couloir fait 2 m de large. Le tapis va-t-il rentrer ?",
     ["aire", "tapis", "retrouver une longueur"]),
    ("patron-prisme-cylindre", "volume", 1, "volume/01-patron-prisme-cylindre", "patron_prisme_cylindre", "verte",
     ("5e-volume", "patron-prisme-cylindre"), "Gaël, concepteur d'emballages",
     ["Le patron du cylindre", "La longueur du rectangle", "Le patron du prisme"],
     "Que voit-on quand on déplie une boîte ronde ? — Le patron d'un prisme et d'un cylindre",
     "Gaël est concepteur d'emballages. Avant de fabriquer une boîte, il dessine son patron : la boîte dépliée à plat.",
     ["le patron d'un cylindre : deux disques et un rectangle",
      "la longueur du rectangle = le tour du disque : 2 × π × rayon",
      "le patron d'un prisme droit : deux bases et un rectangle par côté",
      "le piège : le rectangle n'est pas long comme le diamètre"],
     "les dimensions et l'aire de l'étiquette d'une boîte de rayon 3 cm et de hauteur 12 cm",
     ["patron", "cylindre", "prisme droit", "périmètre du cercle", "emballage"], ["nature-ecologie", "sciences"],
     "Mon étiquette ne fait pas le tour de la boîte !",
     "Je colle une étiquette autour de ma boîte de conserve, de rayon 2 cm. Je la coupe à 4 cm, comme le diamètre… il manque un gros morceau !",
     ["patron du cylindre", "étiquette", "boîte de conserve"]),
    ("volume-comprendre", "volume", 2, "volume/02-volume-comprendre", "volume_comprendre", "jaune",
     ("5e-volume", "volume-comprendre"), "Tiago, logisticien", ["Ranger des cubes", "Le volume", "Aire ou volume ?"],
     "Combien de caisses dans le camion ? — Comprendre le volume",
     "Tiago est logisticien. Il remplit des camions et des conteneurs. Son problème de chaque jour : combien de caisses vont rentrer ?",
     ["ranger des cubes-unité couche par couche : 12 cubes, puis 24",
      "le volume se compte en cubes : 24 dm³",
      "une aire se compte en carrés (cm²), un volume en cubes (cm³)",
      "le piège : le petit 2 pour une aire, le petit 3 pour un volume"],
     "combien de caisses de 1 m de côté dans un conteneur de 6 m, 2 m et 2 m, et combien pèse le chargement",
     ["volume", "cube-unité", "centimètre cube", "aire et volume", "logistique"], ["transports", "argent-budget"],
     "Combien de boîtes dans ma valise ?",
     "Je pars en vacances et je range mes boîtes cubiques dans ma valise : une rangée de 3 boîtes, deux rangées, et une deuxième couche par-dessus.",
     ["volume", "valise", "compter des cubes"]),
    ("volume-pave", "volume", 3, "volume/03-volume-pave", "volume_pave", "verte", ("5e-volume", "volume-pave"),
     "Yuna, technicienne en climatisation", ["Une couche au sol", "Jusqu'au plafond", "La méthode"],
     "Quel climatiseur pour cette pièce ? — Le volume du pavé droit",
     "Yuna est technicienne en climatisation. Pour choisir le bon climatiseur, elle doit connaître le volume d'air d'une pièce.",
     ["au sol : 6 × 4 = 24 cubes de 1 m³, l'aire de la base",
      "3 couches jusqu'au plafond : 24 × 3 = 72 m³",
      "la formule : longueur × largeur × hauteur (ou aire de la base × hauteur)",
      "le piège : on multiplie les trois dimensions, on ne les additionne pas"],
     "deux salles à climatiser, un climatiseur pour 80 m³ : combien en faut-il ?",
     ["volume du pavé droit", "formule", "mètre cube", "climatisation"], ["technologie-ia", "sciences"],
     "Mon aquarium contient-il 12 litres ?",
     "Mon aquarium mesure 5 dm de long, 3 de large et 4 de haut. 5 + 3 + 4 = 12 litres ? Je verse 12 litres… le fond est à peine mouillé !",
     ["volume du pavé", "aquarium", "litre"]),
    ("volume-prisme", "volume", 4, "volume/04-volume-prisme", "volume_prisme", "verte", ("5e-volume", "volume-prisme"),
     "Maïa, fabricante de tentes", ["L'aire de la base", "Empiler sur la longueur", "La méthode"],
     "Combien d'air dans une tente ? — Le volume du prisme droit",
     "Maïa fabrique des tentes de randonnée. Une tente doit être légère, mais assez grande pour dormir. Combien d'air y a-t-il dedans ?",
     ["la base de la tente, un triangle : 2 × 1,5 ÷ 2 = 1,5 m²",
      "le triangle se répète sur 3 m de long : 1,5 × 3 = 4,5 m³",
      "la formule : aire de la base × hauteur du prisme",
      "le piège : le ÷ 2 du triangle, et la hauteur du triangle n'est pas celle du prisme"],
     "combien de campeurs dans une grande tente, avec 1,5 m³ d'air chacun",
     ["volume du prisme", "prisme droit", "aire de la base", "tente"], ["sport", "transports"],
     "Combien de coups de pompe pour ma tente ?",
     "Je gonfle ma tente : vue de face, un triangle de 2 m de base et 1 m de haut, sur 3 m de long. Ma super pompe envoie 1 m³ à chaque coup.",
     ["volume du prisme", "tente", "camping"]),
    ("volume-cylindre", "volume", 5, "volume/05-volume-cylindre", "volume_cylindre", "bleue",
     ("5e-volume", "volume-cylindre"), "Hakim, ingénieur de l'eau", ["Empiler des disques", "L'aire du disque", "La méthode"],
     "Combien d'eau dans un réservoir rond ? — Le volume du cylindre",
     "Hakim est ingénieur de l'eau. Il construit des réservoirs pour l'eau potable d'une ville. Ses réservoirs sont ronds : ce sont des cylindres.",
     ["un cylindre, c'est un disque empilé : aire de la base × hauteur",
      "l'aire du disque : π × rayon × rayon",
      "rayon 3 cm, hauteur 5 cm : 28,26 × 5 = 141,3 cm³",
      "le piège : le rayon, pas le diamètre ; rayon × rayon, pas rayon × 2"],
     "le volume d'un réservoir de rayon 2 m et de hauteur 3 m, en m³ puis en litres",
     ["volume du cylindre", "aire du disque", "pi", "réservoir", "eau potable"], ["sciences", "corps-sante"],
     "Ma canette contient-elle plus de 200 cm³ ?",
     "Je bois du jus dans une canette : 3 cm de rayon, 10 cm de haut. Mon copain parie qu'elle contient moins de 200 cm³. Moi, je dis plus !",
     ["volume du cylindre", "canette", "pari"]),
    ("volume-assemblage", "volume", 6, "volume/06-volume-assemblage", "volume_assemblage", "bleue",
     ("5e-volume", "volume-assemblage"), "Chloé, pâtissière", ["Additionner", "Enlever le creux", "La méthode"],
     "Un gâteau à étages : quel volume de pâte ? — Le volume d'un assemblage",
     "Chloé est pâtissière. Elle crée des gâteaux à étages. Pour préparer juste assez de pâte, elle doit connaître le volume de chaque gâteau.",
     ["un pavé et un prisme collés : 40 + 30 = 70 cm³",
      "un pavé creusé d'un trou : 80 − 8 = 72 cm³",
      "la méthode : découper en solides simples, additionner ou enlever",
      "le piège : on additionne des volumes, jamais des longueurs"],
     "le volume d'un gâteau à deux étages, et combien de litres de pâte",
     ["volume", "assemblage de solides", "pavé", "pâtisserie"], ["cuisine", "jeux-defis"],
     "Mon frère calcule le sable du château…",
     "Je construis un château de sable : un bloc de 40 dm³ et une tour de 10 dm³ par-dessus. Mon frère dit 40 × 10 = 400, et part chercher 400 dm³ de sable…",
     ["volume", "château de sable", "additionner des volumes"]),
    ("volume-unite", "volume", 7, "volume/07-volume-unite", "volume_unite", "verte", ("5e-volume", "volume-unite"),
     "Fanta, pompière", ["1 L = 1 dm³", "1 m³ = 1 000 L", "La méthode"],
     "Combien de litres dans un mètre cube ? — Les unités de volume",
     "Fanta est pompière. Sur la citerne de son camion, c'est écrit en mètres cubes ; sur la lance, en litres. Elle doit passer de l'un à l'autre.",
     ["un cube de 1 dm, c'est 10 × 10 × 10 = 1 000 cm³, et 1 litre d'eau",
      "un cube de 1 m, c'est 1 000 dm³ : 1 m³ = 1 000 L",
      "d'une unité de volume à la suivante : × 1 000 ou ÷ 1 000",
      "le piège : pas × 10 comme les longueurs, × 1 000"],
     "en combien de minutes la lance vide une citerne de 3,5 m³ à 500 L par minute",
     ["unités de volume", "litre", "mètre cube", "conversion", "pompière"], ["sport", "sciences"],
     "1 litre dans une boîte de 10 cm : ça déborde ?",
     "J'ai une bouteille de 1 litre et une boîte cubique de 10 cm de côté. Je verse toute la bouteille dans la boîte… glou, glou, glou…",
     ["unités de volume", "litre", "centimètre cube"]),
    ("volume-defi", "volume", 8, "volume/08-volume-defi", "volume_defi", "bleue", ("5e-volume", "volume-defi"),
     "Jonas, installateur de récupérateurs d'eau de pluie", ["La cuve", "Le jardin", "La méthode"],
     "Combien de jours d'arrosage dans la cuve ? — Défis sur les volumes",
     "Jonas installe des récupérateurs d'eau de pluie. À La Réunion, beaucoup de maisons gardent l'eau du toit pour arroser le jardin. Jonas doit choisir la bonne cuve.",
     ["le volume d'une cuve cylindrique : 3,14 × 1 × 1 × 2 = 6,28 m³, soit 6 280 L",
      "le jardin boit 150 L par jour : 6 280 ÷ 150, un peu plus de 41 jours",
      "la méthode : la formule, la conversion, puis la vraie question",
      "le piège : les longueurs dans la même unité avant de multiplier"],
     "60 m² de toit, 40 mm de pluie, une cuve de 2 000 L : déborde-t-elle ?",
     ["volume", "défi", "litre", "mètre cube", "eau de pluie", "La Réunion"], ["nature-ecologie", "meteo-climat"],
     "Mon bidon remplira-t-il l'arrosoir ?",
     "Il pleut. Je mets un bidon sous la gouttière : 30 cm sur 20, et 10 de haut. Mon arrosoir fait 5 litres. Le bidon pourra-t-il le remplir ?",
     ["volume", "litre", "eau de pluie"]),
    ("conversion-decimal", "conversion", 1, "conversion/01-decimal", "conversion_decimal", "jaune",
     ("5e-conversion", "decimal"), "Samir, pharmacien", ["Des grammes aux milligrammes", "Les autres unités", "La méthode"],
     "0,5 g sur l'ordonnance, une balance en mg : que lire ? — Convertir une longueur, une masse, une contenance",
     "Samir est pharmacien. Une ordonnance indique 0,5 gramme, et sa balance affiche des milligrammes. Une erreur, et le médicament est faux.",
     ["1 g = 1 000 mg : 0,5 × 1 000 = 500 mg",
      "pareil pour les autres unités : 2,4 kg = 2 400 g, 3,5 km = 3 500 m, 0,75 L = 75 cL",
      "vers une unité plus petite on multiplie, vers une plus grande on divise",
      "le piège : se tromper de sens"],
     "un sirop : 0,15 L d'eau en mL et 0,02 kg de sucre en g",
     ["conversion", "masse", "contenance", "longueur", "nombre décimal", "pharmacien"], ["corps-sante", "sciences"],
     "1,5 kilo de farine : je mets 15 grammes ?",
     "Je fais un gâteau. La recette dit 1,5 kilo de farine, ma balance compte en grammes. Je mets 15 grammes : une petite cuillère…",
     ["conversion", "kilo", "gramme", "recette"]),
    ("conversion-duree", "conversion", 2, "conversion/02-duree", "conversion_duree", "verte", ("5e-conversion", "duree"),
     "Léna, monteuse de films", ["Des paquets de 60", "135 minutes", "La méthode"],
     "Pourquoi une heure ne fait pas 100 minutes ? — Convertir une durée",
     "Léna est monteuse de films. Son logiciel compte en minutes, mais le cinéma veut la durée en heures et minutes.",
     ["1 h = 60 min, pas 100 ; 1 min = 60 s",
      "135 min : 60 + 60 = 120, il reste 15, donc 2 h 15 min",
      "dans l'autre sens : 2 h 45 = 2 × 60 + 45 = 165 min",
      "le piège : 1 h 50 + 20 min, ce n'est pas 1 h 70"],
     "un documentaire en trois parties : sa durée en heures et minutes, et combien couper pour 2 h pile",
     ["durée", "conversion", "heure", "minute", "montage vidéo"], ["cinema-series", "musique"],
     "Un film de 100 minutes : je finis à 21 h ?",
     "Ce soir, je regarde un film de 100 minutes. Il commence à 20 heures. 100 minutes, c'est 1 heure pile ? Alors je finis à 21 heures !",
     ["durée", "film", "heures et minutes"]),
    ("conversion-avant-calcul", "conversion", 3, "conversion/03-avant-calcul", "conversion_avant_calcul", "verte",
     ("5e-conversion", "avant-calcul"), "Lucie, cheffe cuisinière", ["Comparer", "Soustraire", "La méthode"],
     "Peut-on additionner des litres et des centilitres ? — Convertir avant de calculer",
     "Lucie est cheffe cuisinière. Ses recettes mélangent les unités : des litres, des centilitres, des millilitres. Avant de calculer, elle met tout dans la même unité.",
     ["comparer 0,5 L, 75 cL et 400 mL : tout en mL, 500, 750 et 400",
      "1,2 m − 45 cm : 120 cm − 45 cm = 75 cm",
      "la méthode : une seule unité, on convertit tout, puis on calcule",
      "le piège : 1,2 − 45 ne veut rien dire"],
     "1,5 L de crème, 60 cL pour une sauce, 250 mL pour un dessert : combien en reste-t-il ?",
     ["conversion", "même unité", "comparer", "cuisine", "contenance"], ["cuisine", "argent-budget"],
     "1 mètre moins 30 centimètres : moins 29 ?",
     "Mon ruban de cadeau mesure 1 mètre. J'en coupe 30 centimètres pour le nœud. 1 moins 30… moins 29 ? Un ruban plus petit que rien ?!",
     ["conversion", "ruban", "même unité"]),
    ("conversion-coherence", "conversion", 4, "conversion/04-coherence", "conversion_coherence", "bleue",
     ("5e-conversion", "coherence"), "Ana, contrôleuse qualité", ["L'ordre de grandeur", "Des repères", "La méthode"],
     "Un paquet de riz de 24 grammes ? — Contrôler une conversion",
     "Ana est contrôleuse qualité dans une usine. Sur ce paquet de riz, l'étiquette dit 2,4 kilos ; la fiche dit 24 grammes. Ana sent qu'il y a un problème.",
     ["24 g, c'est quelques morceaux de sucre : le bon résultat, 2 400 g",
      "des repères : 1 L, une grande bouteille ; 1 kg, un paquet de farine ; 1 km, un quart d'heure de marche",
      "après une conversion : le résultat est-il possible ?",
      "le piège : un résultat propre peut être faux, on vérifie le sens"],
     "48 boîtes de 250 g et une étiquette de 120 kg : est-ce cohérent ?",
     ["conversion", "ordre de grandeur", "vérifier un résultat", "contrôle qualité"], ["technologie-ia", "transports"],
     "J'ai commandé 1,5 litre de jus… on m'apporte un bouchon !",
     "J'ai commandé 1,5 litre de jus en ligne. Le livreur m'apporte… un bouchon. Sur le bon : 1,5 centilitre. Quelqu'un s'est trompé en convertissant !",
     ["conversion", "litre", "centilitre", "ordre de grandeur"]),
]

CHAP_FIXES = {"04-methode": "La méthode", "05-question": "Question 1", "06-piege": "Le piège",
              "07-question": "Question 2", "08-defi": "À toi de jouer", "08b-correction": "Correction",
              "09-finale": "Ce que tu as appris"}

SYMB = [(" centimètres cubes", " cm³"), (" décimètres cubes", " dm³"), (" mètres cubes", " m³"),
        (" mètre cube", " m³"), (" centimètre cube", " cm³"), (" décimètre cube", " dm³"),
        (" centimètres carrés", " cm²"), (" décimètres carrés", " dm²"), (" mètres carrés", " m²"),
        (" mètre carré", " m²"), (" millimètres", " mm"), (" centimètres", " cm"), (" centimètre", " cm"),
        (" décimètres", " dm"), (" kilomètres", " km"), (" kilomètre", " km"), (" mètres", " m"), (" mètre", " m"),
        (" millilitres", " mL"), (" centilitres", " cL"), (" centilitre", " cL"), (" litres", " L"), (" litre", " L"),
        (" milligrammes", " mg"), (" grammes", " g"), (" gramme", " g"), (" kilos", " kg"), (" kilo", " kg"),
        (" tonnes", " t"), (" tonne", " t"), (" fois ", " × "), (" divisé par ", " ÷ "), (" divisée par ", " ÷ "),
        (" plus ", " + "), (" moins ", " − "), (" égale ", " = "), ("pi égal 3,14", "π = 3,14"), (" pi ", " π ")]


def symboles(s):
    s = " " + s
    for a, b in SYMB:
        s = s.replace(a, b)
    return s.strip()


def calculs(s):
    """« 20 × 2, 40. » → « 20 × 2 = 40. » ; « 40 ÷ 8 : 5 cm » → « 40 ÷ 8 = 5 cm » (l'écrit d'un calcul dit)."""
    s = re.sub(r"([×÷+−] [\d   ]*\d(?:,\d+)?), (?=\d)", lambda m: m.group(1) + " = ", s)
    return re.sub(r"([×÷+−] [\d   ]*\d(?:,\d+)?(?: [a-zA-Z²³]+)?) : (?=\d)", lambda m: m.group(1) + " = ", s)


def mmss(t):
    t = int(t + 0.5)
    return f"{t // 60:02d}:{t % 60:02d}"


def ecrans(slug):
    """Les débuts d'écran du dernier dry run (relancé s'il manque)."""
    log = TEMP / f"dry-5e_{slug.replace('-', '_')}.log"
    if not log.exists():
        script = RACINE / "manim" / "scripts" / "5e" / f"5e_{slug.replace('-', '_')}.py"
        scene = re.search(r"^class (\w+)\(", script.read_text(encoding="utf-8"), re.M).group(1)
        env = dict(os.environ, PYTHONIOENCODING="utf-8", AUDIT="1")
        with open(log, "w", encoding="utf-8") as f:
            subprocess.run([sys.executable, "-m", "manim", "render", "--dry_run", str(script), scene],
                           cwd=RACINE, env=env, stdout=f, stderr=subprocess.STDOUT)
    txt = log.read_text(encoding="utf-8", errors="replace").replace("\r", "\n")
    return {m.group(1): float(m.group(2)) for m in re.finditer(r"ECRAN (\S+) t=\S+ \(([\d.]+)\)", txt)}


def question(texte_q, texte_r):
    m = re.match(r"Question ! (.*?) A : (.*?)\. B : (.*?)\. C : (.*?)\. Mets pause", texte_q)
    q, *choix = m.groups()
    r = re.match(r"Réponse ([ABC]) ?[.!] ?(.*)", texte_r)
    return {"question": symboles(q).replace("… ", "… "), "choix": [symboles(c) for c in choix],
            "reponse": "ABC".index(r.group(1)), "explication": calculs(symboles(r.group(2)))}


def debut_question_short(serie, ep):
    js = (RACINE / "prototypes" / "ti-margo" / "films" / f"{serie}-{ep}.js").read_text(encoding="utf-8")
    dur = dict((k, float(v)) for k, v in re.findall(r"'([0-9a-z-]+)':([\d.]+)", re.search(r"DUR=\{(.*?)\}", js).group(1)))
    m = re.search(r"enchainer\(([\d.]+),Object\.keys\(DUR\),DUR,\{(.*?)\}(?:,([\d.]+))?\)", js)
    t, apres = float(m.group(1)), dict((k, float(v)) for k, v in re.findall(r"'([0-9a-z-]+)':([\d.]+)", m.group(2)))
    ecart = float(m.group(3)) if m.group(3) else 0.2
    for c in dur:
        if c == "02-question":
            return t
        t += dur[c] + apres.get(c, ecart)
    raise ValueError(ep)


def coach(fam, micro):
    return f"{SITE}/coach/serie?classe=5e&matiere=maths&notion={NOTION[fam]}&microId={micro}&display=simple"


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sortie = {}
    for (slug, fam, n, dos, micro, ceint, (serie, ep), personne, chap, titre, intro, puces, defi, tags, centres,
         titre_s, intro_s, tags_s) in M:
        voix = json.loads((RACINE / "manim" / "voix" / f"5e-{slug}.json").read_text(encoding="utf-8"))
        voix_s = json.loads((RACINE / "manim" / "voix" / f"5e-{slug}-short.json").read_text(encoding="utf-8"))
        nom = f"eleveai-maths-5e-{slug}"
        if not (RACINE / "manim" / "sorties" / "5e" / "maths" / dos / f"{nom}.mp4").exists():
            print("pas encore rendu :", slug)
            continue
        E = ecrans(slug)
        cles = list(voix)
        lib = {cles[0]: voix[cles[0]].split(".")[0].split("?")[0], cles[1]: personne}
        for k, c in zip([k for k in cles[2:] if k[:2] in ("02", "03", "04")], chap):
            lib[k] = c
        lib.update(CHAP_FIXES)
        chapitres = [["00:00", lib[cles[0]]]] + [[mmss(E[k]), lib[k]] for k in cles[1:]
                                               if k in lib and k in E and k != cles[0]]
        qs = []
        for kq in ("05-question", "07-question"):
            d = question(voix[kq], voix[kq.replace("-question", "b-reponse")])
            qs.append({"t": mmss(E[kq]), **d})
        nomserie = SERIE_NOM[fam]
        accroche = (intro + "\n\nDans cette vidéo :\n" + "\n".join("• " + p for p in puces) +
                    f"\n\n⏸ 2 questions-pauses : mets pause, et choisis !\n🥋 Ceinture {ceint}.\n"
                    f"Un défi en fin de vidéo, avec sa correction : {defi}.\n\nPour s'entraîner :\n"
                    f"• la fiche de cours : {SITE}/fiches-cours/maths/5e/{FICHE[fam]}\n"
                    f"• les exercices corrigés : {SITE}/fiches-exercices/maths/5e/{FICHE[fam]}\n"
                    f"• la série du coach sur cette compétence : {coach(fam, micro)}\n\n"
                    f"📐 Épisode {n} de la série {nomserie} d'EleveAI, en 5e.")
        base = {"pas_avant": "", "notionId": NOTION[fam], "microId": micro, "classe": "5e"}
        sortie[f"5e-{slug}"] = {
            "id": f"5e-{slug}", **base, "ceinture": ceint, "serie": "Maths 5e", "type": "longue",
            "fichier": f"5e/maths/{dos}/{nom}.mp4", "miniature": f"5e/maths/{dos}/{nom}.png",
            "titre": f"{titre} — épisode {n} · Maths 5e", "accroche": accroche, "chapitres": chapitres,
            "tags": tags + TAGS_FIN, "questions": qs, "centres": centres}
        d = question(voix_s["02-question"], voix_s["02b-reponse"])
        a_toi = voix_s["04-commentaire"]
        sortie[f"5e-{slug}-short"] = {
            "id": f"5e-{slug}-short", **base, "ceinture": "blanche", "serie": "Maths 5e", "type": "short",
            "renvoie_vers": f"5e-{slug}", "fichier": f"5e/maths/{dos}/{nom}-short.mp4",
            "miniature": f"5e/maths/{dos}/{nom}-short-miniature.png",
            "titre": f"{titre_s} #maths #5e",
            "accroche": (f"{intro_s}\n\nDessin animé, voix de synthèse.\n🥋 Ceinture blanche : la version 100 % visuelle.\n"
                         f"👉 {symboles(a_toi)}\n\n▶️ L'épisode complet : {{{{LONGUE}}}}\n🎯 Le coach : {coach(fam, micro)}\n\n"
                         f"Fait à La Réunion 🌋 — Frédéric Lacoste\n\n#Shorts #maths #{fam} #5e"),
            "tags": tags_s + ["Ti Margo", "dessin animé", "ceinture blanche"] + TAGS_FIN + ["Shorts"],
            "questions": [{"t": mmss(debut_question_short(serie, ep)), **d}], "centres": centres}
    p = RACINE / "manim" / "poste2" / "manifeste-5e.json"
    p.write_text(json.dumps(sortie, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("écrit", p, len(sortie), "entrées")


if __name__ == "__main__":
    main()
