# passe_volume_6e.py
# Passe finale de la série VOLUME ET SOLIDES de la 6e (15/11/2026, semaine PÉRIMÈTRE, AIRE, VOLUME) : les
# entrées du manifeste (paysage Manim + short Ti Margo en dessin animé par épisode), pour DEUX notions du coach :
#   volume_solide  → 6e-volume-<ep>  (unite, compter, comparer, assemblage, defi), manim/sorties/6e/maths/volume/
#   vision_espace  → 6e-vision-<ep>  (vues, representation, patron-pave, defi),   manim/sorties/6e/maths/vision-espace/
# Copie de passe_solides_cm1.py : temps des chapitres et des questions relevés dans l'AUDIO des mp4, questions lues
# dans les voix validées (15/11, « Oui, valide les 18 »). Le manifeste a des modifications non commitées d'autres
# sessions : on relit la copie de travail et on ajoute ou remplace SEULEMENT nos entrées.
# Micros branchées par `aussi` seulement (manim/REPRISE-6e-volume-solides.md) : volume_lire ← 6e-volume-unite ;
# vision_denombrer et volume_compter ← cm1-solides-defi ; vision_representation ← cm1-solides-patron.
#
#   python manim/passe_volume_6e.py temps [slug|id]  → un temps.json par notion (dossier de la notion)
#   python manim/passe_volume_6e.py voir             → affiche les entrées sans rien écrire
#   python manim/passe_volume_6e.py manifeste        → ajoute ou remplace les entrées 6e-volume-* / 6e-vision-*[-short]
#   python manim/passe_volume_6e.py aussi            → ajoute les `aussi` 6e aux entrées cm1-solides-defi/patron(-short)
import json
import shutil
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from passe_relatifs import mesurer, mmss  # noqa: E402
from passe_decimaux import question, chapitres  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"
VOIX = RACINE / "manim" / "voix"
MANIFESTE = RACINE / "manim" / "manifeste-youtube.json"
COACH = "https://www.eleveai.fr/coach/serie?classe=6e&matiere=maths&notion={notion}&microId={micro}&display=simple"
NOM_CEINT = {"blanche": "Ceinture blanche", "verte": "Ceinture verte", "jaune": "Ceinture jaune", "orange": "Ceinture orange", "bleue": "Ceinture bleue"}

# Les deux notions : préfixe des ids, dossier des sorties, nom de la série dans l'accroche, hashtag du short.
NOTIONS = {
    "volume": dict(notion="volume_solide", rep="volume", serie="Volume", hashtag="#volume"),
    "vision": dict(notion="vision_espace", rep="vision-espace", serie="Solides et espace", hashtag="#solides"),
}

# Dates `pas_avant` confirmées le 15/11 : 1 paysage + son short par jour, après l'Aire 6e (08 → 11/04/2027).
DATES = {
    "6e-volume-unite": "2027-04-12",
    "6e-volume-compter": "2027-04-13",
    "6e-volume-comparer": "2027-04-14",
    "6e-volume-assemblage": "2027-04-15",
    "6e-volume-defi": "2027-04-16",
    "6e-vision-vues": "2027-04-17",
    "6e-vision-representation": "2027-04-18",
    "6e-vision-patron-pave": "2027-04-19",
    "6e-vision-defi": "2027-04-20",
}

# Les `aussi` de nos entrées (micro 6e sans vidéo à elle).
AUSSI = {
    "6e-volume-unite": [{"classe": "6e", "notionId": "volume_solide", "microId": "volume_lire"}],
}

# Mode `aussi` : ajouts aux entrées CM1 EXISTANTES (paysage et short).
AUSSI_CM1 = {
    "cm1-solides-defi": [{"classe": "6e", "notionId": "vision_espace", "microId": "vision_denombrer"},
                         {"classe": "6e", "notionId": "volume_solide", "microId": "volume_compter"}],
    "cm1-solides-patron": [{"classe": "6e", "notionId": "vision_espace", "microId": "vision_representation"}],
}

EP = [
 # ───── VOLUME (notion volume_solide) ─────
 dict(k="volume", n=1, slug="unite", micro="volume_unite", nom="L'unité de volume", ceinture="jaune",
      titre="Centimètre cube, mètre cube : mesurer un volume en cubes",
      intro="Mathis est maître-nageur. Chaque matin, il verse un produit dans la piscine pour garder l'eau propre. La dose dépend de la place que prend l'eau : son volume. Mais un volume, comment le mesure-t-on ?",
      points=["le cube unité : 1 cm de côté, c'est 1 cm³",
              "cm, cm², cm³ : une longueur, une aire, un volume",
              "lire un volume : 18 cm³, ce sont 18 cubes de 1 cm³",
              "le mètre cube pour les grands objets : la piscine fait 300 m³",
              "le piège : 24 cm², c'est une aire, pas un volume"],
      defi="trois élèves écrivent le volume d'un dé : 8 cm, 8 cm² ou 8 cm³. Qui a raison, et combien de petits cubes ?",
      chap={"00-garde": "Mesurer la place d'un objet", "02-cube-unite": "Le centimètre cube",
            "03-trois-unites": "cm, cm², cm³", "04-lire": "Lire un volume", "05-question": "Question 1",
            "06-metre-cube": "Le mètre cube", "07-piege": "Le piège", "08-question": "Question 2",
            "09-defi": "À toi de jouer", "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
      tags=["volume", "unité de volume", "centimètre cube", "mètre cube", "cm³", "piscine", "maître-nageur"],
      centres=["natation", "sport"],
      s_titre="Ma boîte de 20 cm³ prend 60 cubes, tu paries ?", s_ceinture="blanche",
      s_accroche="Ma boîte à trésors est vide. Sur l'étiquette, c'est écrit : 20 cm³. Je prépare des petits cubes de 1 cm de côté… 60, ça devrait aller ?",
      s_toi="un coffre de 35 cm³ contient déjà 12 petits cubes de 1 cm³ : combien en manque-t-il ?",
      s_tags=["cm³", "volume", "boîte à trésors", "cubes"], s_centres=["jeux-defis"]),
 dict(k="volume", n=2, slug="compter", micro="volume_compter", nom="Compter les cubes", ceinture="verte",
      titre="Le volume d'un pavé : compter les cubes par couches",
      intro="Yanis est logisticien : il organise le chargement des camions. Aujourd'hui, il range des cartons en forme de cube dans une remorque. Combien de cartons vont tenir, sans les compter un par un ?",
      points=["une couche : longueur × largeur (3 × 2 = 6 cubes)",
              "puis les couches : 6 × 2 = 12 cubes, soit 12 cm³",
              "volume du pavé = longueur × largeur × hauteur",
              "le piège : les cubes cachés du fond et du dessous comptent aussi",
              "un cube de 3 cm d'arête : une couche ne suffit pas"],
      defi="une remorque de 8 cartons de long, 4 de large et 3 de haut : combien de cartons ?",
      chap={"00-garde": "Compter sans compter un par un", "02-couche": "Une couche",
            "03-multiplier": "Multiplier les couches", "04-formule": "Longueur × largeur × hauteur",
            "05-question": "Question 1", "06-piege": "Les cubes cachés", "07-question": "Question 2",
            "08-defi": "À toi de jouer", "08b-correction": "Correction", "09-finale": "Ce que tu as appris"},
      tags=["volume", "pavé droit", "longueur × largeur × hauteur", "couches", "cubes", "logistique", "camion"],
      centres=["transports"],
      s_titre="9 sucres dans mon bloc, tu paries ?", s_ceinture="blanche",
      s_accroche="Je construis un bloc avec des morceaux de sucre : 4 de long, 2 de large, et j'empile 3 étages pareils. 4, 2, 3… ça fait 9 morceaux ? Vraiment ?",
      s_toi="un bloc de 5 sucres de long, 3 de large et 2 étages : combien de morceaux ?",
      s_tags=["sucre", "pavé", "couches", "volume"], s_centres=["cuisine"]),
 dict(k="volume", n=3, slug="comparer", micro="volume_comparer", nom="Comparer des volumes", ceinture="jaune",
      titre="La cuve la plus haute est-elle la plus grande ?",
      intro="Léna est ingénieure de l'eau. À La Réunion, beaucoup de maisons gardent l'eau de pluie dans une cuve. Léna doit choisir une cuve pour une école : laquelle garde le plus d'eau ?",
      points=["comparer deux volumes : on compte les cubes de chacun (14 contre 12)",
              "la plus haute n'est pas forcément la plus grande : 20 cubes contre 24",
              "deux formes différentes peuvent avoir le même volume",
              "le piège : juger à l'œil, ou à la hauteur"],
      defi="ranger trois cuves de la plus petite à la plus grande : 3 × 2 × 4, 5 × 5 × 1 et 2 × 2 × 5.",
      chap={"00-garde": "Le plus haut, le plus grand ?", "02-compter": "Compter pour comparer",
            "03-haut": "Haute ou large ?", "04-meme": "Même volume, autre forme", "05-question": "Question 1",
            "06-piege": "Le piège", "07-question": "Question 2", "08-defi": "À toi de jouer",
            "08b-correction": "Correction", "09-finale": "Ce que tu as appris"},
      tags=["comparer des volumes", "volume", "pavé droit", "cubes", "cuve", "eau de pluie", "La Réunion", "ingénieure de l'eau"],
      centres=["nature-ecologie", "sciences"],
      s_titre="Ma tour de 10 cubes gagne, tu paries ?", s_ceinture="blanche",
      s_accroche="Ma tour de cubes monte jusqu'au ciel : 10 cubes, l'un sur l'autre ! Mon copain a fait un bloc tout plat : 3 sur 2 sur 2. Ma tour est bien plus grande… non ?",
      s_toi="une tour de 15 cubes, l'un sur l'autre, et un bloc de 4 sur 2 sur 2 : lequel a le plus de cubes ?",
      s_tags=["tour de cubes", "comparer", "volume", "cubes"], s_centres=["construction"]),
 dict(k="volume", n=4, slug="assemblage", micro="volume_assemblage", nom="Assembler des volumes", ceinture="jaune",
      titre="Coller deux solides : que devient le volume ?",
      intro="Manon est menuisière. Elle fabrique des meubles en assemblant des caissons en bois, comme de gros blocs. Avant de construire, elle fait une maquette en cubes : quel volume prendra le meuble entier ?",
      points=["coller, c'est additionner : 8 + 4 = 12 cubes",
              "la forme change, mais aucun cube ne disparaît",
              "avec les unités : 18 cm³ + 12 cm³ = 30 cm³",
              "enlever un morceau, c'est soustraire : 20 − 6 = 14 cubes",
              "le piège : les faces collées se cachent, mais les cubes restent"],
      defi="la maquette d'une armoire : un bloc de 4 × 2 × 3 cubes, un bloc de 2 × 2 × 1 collé dessus, puis une niche de 2 cubes creusée. Quel volume final ?",
      chap={"00-garde": "Coller deux solides", "02-coller": "Coller, c'est additionner",
            "03-forme": "La forme change", "04-unites": "Avec des cm³", "05-question": "Question 1",
            "06-enlever": "Enlever un morceau", "07-piege": "Le piège", "08-question": "Question 2",
            "09-defi": "À toi de jouer", "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
      tags=["volume", "assemblage", "additionner des volumes", "cm³", "solides", "menuiserie", "meuble"],
      centres=["construction", "art-design"],
      s_titre="Coller ma tour fait perdre des cubes, tu paries ?", s_ceinture="blanche",
      s_accroche="Je construis mon château en cubes : un donjon de 18 cubes, une tour de 7 cubes. Je colle la tour contre le donjon… clac ! Combien de cubes maintenant ?",
      s_toi="je colle un pont de 9 cubes et deux tours de 6 cubes chacune : combien de cubes en tout ?",
      s_tags=["château", "cubes", "assembler", "volume"], s_centres=["jeux-defis"]),
 dict(k="volume", n=5, slug="defi", micro="volume_defi", nom="Défis sur les volumes", ceinture="bleue",
      titre="Ce qui manque, les couches : un défi de volumes",
      intro="Clara est pâtissière et chocolatière. Elle range ses chocolats, en forme de petits cubes, dans des boîtes en pavé droit. Pour chaque boîte, combien de chocolats faut-il ? Et s'il en manque ?",
      points=["une boîte de 4 × 3 × 2 : 12 chocolats par couche, 2 couches",
              "ce qui manque se trouve par une soustraction (24 − 17 = 7)",
              "le nombre de couches se trouve par une division (36 ÷ 12 = 3)",
              "le piège : le bon nombre avec la mauvaise unité (cm² au lieu de cm³)",
              "un cube de 4 cm d'arête : une couche, puis 4 couches"],
      defi="deux boîtes de 6 × 2 × 2 et de 3 × 3 × 3 : laquelle contient le plus de chocolats, et combien de plus ?",
      chap={"00-garde": "Retrouver un volume", "02-boite": "La première boîte", "03-manque": "Ce qui manque",
            "04-hauteur": "Combien de couches ?", "05-question": "Question 1", "06-piege": "Le piège de l'unité",
            "07-question": "Question 2", "08-defi": "À toi de jouer", "08b-correction": "Correction",
            "09-finale": "Ce que tu as appris"},
      tags=["volume", "défi", "pavé droit", "cm³", "division", "chocolat", "pâtisserie"],
      centres=["cuisine"],
      s_titre="24 bacs de glaçons pour ma fête, tu paries ?", s_ceinture="blanche",
      s_accroche="C'est la fête ! Il me faut 48 glaçons en forme de cube. Mon bac à glaçons fait 6 cases de long et 4 de large. Combien de bacs pleins dois-je faire ?",
      s_toi="une boîte de dés fait 3 sur 3 sur 3 et j'en ai déjà rangé 20 : combien en manque-t-il ?",
      s_tags=["glaçons", "volume", "division", "fête"], s_centres=["cuisine"]),
 # ───── SOLIDES ET ESPACE (notion vision_espace) ─────
 dict(k="vision", n=1, slug="vues", micro="vision_vues", nom="Les quatre vues", ceinture="jaune",
      titre="De face, de dessus, de côté : les vues d'un assemblage",
      intro="Samuel est architecte. Avant de construire une maison, il la dessine sous plusieurs angles : vue de dessus, vue de face, vues de côté. Chaque vue est un dessin plat. Aujourd'hui, il présente sa maquette en cubes.",
      points=["une vue est plate : elle garde deux dimensions sur trois",
              "de face : la longueur et la hauteur (4 × 2 = 8 carreaux)",
              "de droite : la largeur et la hauteur ; de gauche, le même dessin en miroir",
              "de dessus : la longueur et la largeur (4 × 3 = 12 carreaux)",
              "le piège : la vue de dessus compte les colonnes, pas les cubes"],
      defi="une rangée de 4 colonnes de 1, 3, 2 et 1 cubes : combien de carreaux dans la vue de face, et dans la vue de dessus ?",
      chap={"00-garde": "Quatre vues", "02-face": "La vue de face", "03-cotes": "Les vues de côté",
            "04-dessus": "La vue de dessus", "05-question": "Question 1", "06-piege": "Le piège",
            "07-question": "Question 2", "08-defi": "À toi de jouer", "08b-correction": "Correction",
            "09-finale": "Ce que tu as appris"},
      tags=["vues", "vue de dessus", "vue de face", "assemblage de cubes", "architecte", "maquette"],
      centres=["art-design", "construction"],
      s_titre="Mon drone voit les 10 cubes, tu paries ?", s_ceinture="blanche",
      s_accroche="Mon copain a construit deux tours de 5 cubes, collées. Moi, je les survole avec mon drone ! Vu d'en haut, combien de carreaux je vois ?",
      s_toi="un escalier de 4 colonnes, de 4, 3, 2 et 1 cubes : combien de carreaux dans sa vue de face ?",
      s_tags=["vue de dessus", "drone", "cubes", "vues"], s_centres=["technologie-ia"]),
 dict(k="vision", n=2, slug="representation", micro="vision_representation", nom="La perspective cavalière", ceinture="verte",
      titre="Dessiner un cube en volume sur une feuille plate",
      intro="Lina est animatrice 3D : elle crée des objets en volume pour des dessins animés. Mais avant l'ordinateur, elle fait toujours un croquis à main levée, sur une feuille plate. Comment donner de la profondeur au dessin ?",
      points=["la face avant en vraie grandeur : pour un cube, un vrai carré",
              "les traits en biais : même direction, même longueur, plus courts que l'arête",
              "les arêtes cachées en pointillés : 3 pour un cube",
              "le pavé droit : les arêtes parallèles restent parallèles",
              "le piège : seules la face avant et la face arrière gardent leur vraie forme",
              "le patron déplie le solide à plat : 6 carrés pour le cube"],
      defi="un pavé droit dont la face avant fait 4 carreaux sur 2 : combien de traits en biais, et combien d'arêtes en pointillés ?",
      chap={"00-garde": "Dessiner en volume", "02-face": "La face avant", "03-biais": "Les traits en biais",
            "04-cachees": "Les arêtes cachées", "05-question": "Question 1", "06-pave": "Le pavé droit",
            "07-piege": "Le piège", "08-question": "Question 2", "09-patron": "Du dessin au patron",
            "10-defi": "À toi de jouer", "10b-correction": "Correction", "11-finale": "Ce que tu as appris"},
      tags=["perspective cavalière", "cube", "pavé droit", "arêtes cachées", "pointillés", "patron", "animation 3D"],
      centres=["cinema-series", "dessin-manga"],
      s_titre="Mon cube n'est qu'un carré, tu paries ?", s_ceinture="blanche",
      s_accroche="J'ai dessiné un cube pour mon copain. Il me dit : « C'est un carré, ton truc ! » Ma feuille est plate… Comment montrer la profondeur ?",
      s_toi="sur le dessin d'un cube en perspective cavalière, combien d'arêtes en tout, pointillés compris ?",
      s_tags=["perspective cavalière", "cube", "dessin", "pointillés"], s_centres=["dessin-manga"]),
 dict(k="vision", n=3, slug="patron-pave", micro="patron_pave_dimensions", nom="Le patron du pavé", ceinture="verte",
      titre="Les mesures de chaque face : le patron d'un pavé droit",
      intro="Jeanne est designer d'emballages. Elle invente la boîte d'une nouvelle marque de céréales : 20 cm de long, 8 de large, 30 de haut. Avant de l'imprimer, elle trace son patron, à plat : quelles mesures pour chaque face ?",
      points=["6 faces rectangulaires, pareilles deux par deux : 3 sortes de rectangles",
              "chaque face prend deux des trois mesures : 20 sur 30, 8 sur 30, 20 sur 8",
              "le patron : 4 faces en bande, le dessus et le dessous accrochés en haut et en bas",
              "le piège : deux faces pliées ensemble ont un bord de même longueur"],
      defi="une boîte à chaussures de 30 cm de long, 20 de large et 10 de haut : les mesures de ses 6 faces.",
      chap={"00-garde": "Les mesures du patron", "02-six": "Six faces, trois paires",
            "03-mesures": "Les mesures des faces", "04-assembler": "Assembler le patron", "05-question": "Question 1",
            "06-piege": "Le piège des bords", "07-question": "Question 2", "08-defi": "À toi de jouer",
            "08b-correction": "Correction", "09-finale": "Ce que tu as appris"},
      tags=["patron", "pavé droit", "faces", "dimensions", "emballage", "boîte", "design"],
      centres=["art-design"],
      s_titre="Un couvercle de 6 sur 4 ferme ma boîte, tu paries ?", s_ceinture="blanche",
      s_accroche="Je fabrique une boîte cadeau : 10 cm de long, 6 de large, 4 de haut. Je plie… et mon couvercle est trop petit ! La boîte reste ouverte !",
      s_toi="une boîte de 12 cm de long, 5 de large et 3 de haut : quelles sont les mesures de ses deux faces de côté ?",
      s_tags=["patron", "boîte cadeau", "pavé droit", "couvercle"], s_centres=["art-design"]),
 dict(k="vision", n=4, slug="defi", micro="vision_defi", nom="Défis dans l'espace", ceinture="bleue",
      titre="Cubes cachés, cube peint : un défi dans l'espace",
      intro="Enzo est dessinateur-projeteur : à partir d'un plan vu de dessus, il imagine la pièce en volume. Aujourd'hui, il prépare des énigmes en cubes pour un escape game. Sauras-tu voir ce qu'on ne voit pas ?",
      points=["un plan vu de dessus, un nombre par carreau : on additionne (3 + 1 + 2 + 2 = 8 cubes)",
              "une pyramide de cubes : étage par étage (9 + 4 + 1 = 14 cubes)",
              "le cube peint puis découpé : les coins, les arêtes, les faces… et le centre",
              "le piège : un cube caché au centre n'apparaît sur aucune vue",
              "vérifier : le total doit retomber sur le nombre de petits cubes"],
      defi="un grand cube de 4 × 4 × 4 peint, puis découpé en 64 petits cubes : combien n'ont aucune face peinte ?",
      chap={"00-garde": "Voir ce qu'on ne voit pas", "02-plan": "Le plan vu de dessus",
            "03-pyramide": "La pyramide de cubes", "04-question": "Question 1", "05-peint": "Le cube peint : les coins",
            "06-aretes": "Les arêtes et les faces", "07-question": "Question 2", "08-piege": "Le piège",
            "09-defi": "À toi de jouer", "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
      tags=["cube peint", "cubes cachés", "dénombrer", "pyramide de cubes", "plan coté", "défi", "escape game", "énigme"],
      centres=["jeux-defis", "sciences"],
      s_titre="12 morceaux tout chocolat dans mon gâteau, tu paries ?", s_ceinture="blanche",
      s_accroche="Mon gâteau en cube, 3 sur 3 sur 3, est recouvert de chocolat dehors. Je le coupe en 27 petits cubes. Les gourmands veulent ceux qui ont 3 faces au chocolat : combien y en a-t-il ?",
      s_toi="combien de morceaux ont exactement 2 faces au chocolat ?",
      s_tags=["cube peint", "gâteau", "chocolat", "cubes"], s_centres=["cuisine"]),
]

COMMUNS = {
    "volume": ["volume", "cm³", "grandeurs et mesures", "maths", "6e", "sixième", "collège", "cycle 3", "CRPE", "EleveAI"],
    "vision": ["solides", "géométrie dans l'espace", "maths", "6e", "sixième", "collège", "cycle 3", "CRPE", "EleveAI"],
}


def ident(e):
    return f"6e-{e['k']}-{e['slug']}"


def dossier(e):
    """Chemin relatif à manim/sorties/ : 6e/maths/volume/01-unite, 6e/maths/vision-espace/03-patron-pave…"""
    return f"6e/maths/{NOTIONS[e['k']]['rep']}/{e['n']:02d}-{e['slug']}"


def fichier_temps(k):
    return SORTIES / "6e" / "maths" / NOTIONS[k]["rep"] / "temps.json"


def lire_temps():
    res = {}
    for k in NOTIONS:
        f = fichier_temps(k)
        if f.exists():
            res.update(json.loads(f.read_text(encoding="utf-8")))
    return res


def entrees(dates=False):
    temps = lire_temps()
    out = []
    for e in EP:
        n, k = e["n"], e["k"]
        no = NOTIONS[k]
        idt = ident(e)
        if idt not in temps:
            continue
        dos = dossier(e)
        nom = f"eleveai-maths-{idt}"
        coach = COACH.format(notion=no["notion"], micro=e["micro"])
        voix = json.loads((VOIX / f"{idt}.json").read_text(encoding="utf-8"))
        t = temps[idt]
        date = DATES[idt]
        if dates and date is None:
            raise SystemExit("date manquante : " + idt)
        titre = f"{e['titre']} — {e['nom']} — épisode {n} · Maths 6e"
        acc = e["intro"] + "\n\nDans cette vidéo :\n" + "\n".join("• " + p for p in e["points"])
        acc += (f"\n\n⏸ 2 questions-pauses : mets pause, et choisis !\n🥋 {NOM_CEINT[e['ceinture']]}.\n"
                f"Un défi en fin de vidéo, avec sa correction : {e['defi']}")
        acc += f"\n\nPour s'entraîner :\n• la série du coach sur cette compétence : {coach}"
        acc += f"\n\n🔢 Épisode {n} de la série {no['serie']} d'EleveAI, en 6e."
        qs = [dict(t=mmss(t["clips"][c]), **question(voix, c)) for c in voix if c.endswith("-question")]
        inutiles = [c for c in e["chap"] if c not in voix]
        if inutiles:
            raise SystemExit(f"chapitres absents de la voix {idt} : {inutiles}")
        v = {
            "id": idt, "pas_avant": date, "prioritaire": True, "notionId": no["notion"], "microId": e["micro"], "classe": "6e",
            "ceinture": e["ceinture"], "serie": "Maths 6e", "type": "longue", "fichier": f"{dos}/{nom}.mp4",
            "miniature": f"{dos}/{nom}.png", "titre": titre, "accroche": acc,
            "chapitres": chapitres(e["chap"], t["clips"], t["duree"]),
            "tags": e["tags"] + [x for x in COMMUNS[k] if x not in e["tags"]], "questions": qs, "centres": e["centres"],
        }
        if idt in AUSSI:
            v["aussi"] = AUSSI[idt]
        out.append(v)
        if f"{idt}-short" not in temps:
            continue
        sv = json.loads((VOIX / f"{idt}-short.json").read_text(encoding="utf-8"))
        ts = temps[f"{idt}-short"]
        stitre = f"{e['s_titre']} #maths #6e"
        sc = e.get("s_ceinture", "blanche")
        sacc = e["s_accroche"] + (f"\n\nDessin animé, voix de synthèse.\n🥋 {NOM_CEINT[sc]}"
                                  + (" : pour découvrir." if sc == "blanche" else ".")
                                  + f"\n👉 À toi : {e['s_toi']} Réponds en commentaire !")
        sacc += (f"\n\n▶️ L'épisode complet : {{{{LONGUE}}}}\n🎯 Le coach : {coach}\n\n"
                 f"Fait à La Réunion 🌋 — Frédéric Lacoste\n\n#Shorts #maths {no['hashtag']} #6e #college")
        s = {
            "id": f"{idt}-short", "pas_avant": date, "prioritaire": True, "notionId": no["notion"], "microId": e["micro"],
            "classe": "6e", "ceinture": sc, "serie": "Maths 6e", "type": "short", "renvoie_vers": idt,
            "fichier": f"{dos}/{nom}-short.mp4", "miniature": f"{dos}/{nom}-short-miniature.png",
            "titre": stitre, "accroche": sacc,
            "tags": e["s_tags"] + ["Ti Margo", "dessin animé", NOM_CEINT[sc].lower()]
                    + [x for x in COMMUNS[k] if x not in e["s_tags"]] + ["Shorts"],
            "questions": [dict(t=mmss(ts["clips"][c]), **question(sv, c)) for c in sv if c.endswith("-question")],
            "centres": e["s_centres"],
        }
        if idt in AUSSI:
            s["aussi"] = AUSSI[idt]
        out.append(s)
    for x in out:
        if len(x["titre"]) > 100:
            print(f"TITRE TROP LONG ({len(x['titre'])}) : {x['titre']}", file=sys.stderr)
    return out


def ecrire_manifeste(data, texte):
    sortie = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
    MANIFESTE.write_text(sortie, encoding="utf-8", newline="\n" if "\r\n" not in texte else "\r\n")


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    mode = sys.argv[1]
    if mode == "temps":
        filtre = sys.argv[2] if len(sys.argv) > 2 else ""
        for k in NOTIONS:
            f = fichier_temps(k)
            res = json.loads(f.read_text(encoding="utf-8")) if f.exists() else {}
            avant = dict(res)
            for e in EP:
                if e["k"] != k or (filtre and filtre not in (e["slug"], ident(e))):
                    continue
                for suf in ("", "-short"):
                    nom = f"{ident(e)}{suf}"
                    mp4 = SORTIES / dossier(e) / f"eleveai-maths-{nom}.mp4"
                    if not mp4.exists():
                        print("pas encore :", nom)
                        continue
                    clips, duree = mesurer(nom, mp4)
                    res[nom] = {"duree": duree, "clips": clips}
                    print(nom, duree, "fin", clips[list(clips)[-1]])
            if res != avant:
                f.parent.mkdir(parents=True, exist_ok=True)
                f.write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding="utf-8")
    elif mode == "voir":
        print(json.dumps(entrees(), ensure_ascii=False, indent=1))
    elif mode == "manifeste":
        vides = [i for i, d in DATES.items() if d is None]
        if vides:
            raise SystemExit("dates à remplir dans DATES : " + ", ".join(vides))
        neuves = entrees(dates=True)
        sauve = Path(tempfile.gettempdir()) / "manifeste-youtube.avant-volume-6e.json"
        shutil.copy(MANIFESTE, sauve)
        texte = MANIFESTE.read_text(encoding="utf-8")
        data = json.loads(texte)
        ids = {n["id"] for n in neuves}
        avant = len(data["videos"])
        for v in data["videos"]:
            if v["id"] in ids and v.get("url"):
                raise SystemExit("déjà publiée : " + v["id"])
        data["videos"] = [v for v in data["videos"] if v["id"] not in ids] + neuves
        ecrire_manifeste(data, texte)
        print("manifeste :", avant, "→", len(data["videos"]), "sauvegarde", sauve)
    elif mode == "aussi":
        sauve = Path(tempfile.gettempdir()) / "manifeste-youtube.avant-aussi-6e.json"
        shutil.copy(MANIFESTE, sauve)
        texte = MANIFESTE.read_text(encoding="utf-8")
        data = json.loads(texte)
        par_id = {v["id"]: v for v in data["videos"]}
        ajouts = 0
        for base, liens in AUSSI_CM1.items():
            for idt in (base, f"{base}-short"):
                v = par_id.get(idt)
                if v is None:
                    raise SystemExit("entrée absente du manifeste : " + idt)
                deja = v.setdefault("aussi", [])
                for lien in liens:
                    if lien not in deja:
                        deja.append(dict(lien))
                        ajouts += 1
                        print("aussi :", idt, "←", lien["microId"])
        if ajouts:
            ecrire_manifeste(data, texte)
        print("aussi :", ajouts, "lien(s) ajouté(s), sauvegarde", sauve)
    else:
        raise SystemExit("mode inconnu : " + mode)


if __name__ == "__main__":
    main()
