# 4e_3e_miniatures_poste2.py
# LES MINIATURES de la série 4e/3e « Périmètre, aire, volume et solides » (2e poste, 28 épisodes,
# intégrée au 1er poste le 17/11/2026).
# - Paysages : style « cahier » de 5e_miniatures_aire_volume.py : « TITRE » + pastille « EN N MIN »,
#   la maths en gros, l'échelle des ceintures avec celle de l'épisode.
# - Shorts : en 4e et 3e, ils restent en MANIM (REGLES.md, 09/11) : pas de mention « Dessin animé ».
#   Miniature verticale de miniature_short.py, l'échelle des ceintures sous l'accroche (ceinture blanche).
# Rangées À CÔTÉ DE LEUR VIDÉO (chemins `miniature` du manifeste) :
#   <nom>.png pour la paysage, <nom>-short-miniature.png pour le short.
# La durée « EN N MIN » est lue dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/4e_3e_miniatures_poste2.py [filtre]   (« volume-cone », « section »…)

import shutil
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from PIL import Image, ImageDraw  # noqa: E402

from miniature import BLEU, NAVY, ROUGE, VERT, police  # noqa: E402
from miniature_angles import ajuste, minutes  # noqa: E402
from miniature_essai_v2 import construire as construire_paysage  # noqa: E402
from miniature_short import ORANGE, W  # noqa: E402
from miniature_short import construire as construire_short  # noqa: E402
from miniature_short_expression import _COURANTE, badge_ceinture, echelle, lignes  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"
TEMP = "_poste2_4e_3e"  # sous manim/miniatures/, vidé après la copie

B, O, N, R, V = BLEU, ORANGE, NAVY, ROUGE, VERT

# classe, nom (après « eleveai-maths-<classe>- »), dossier (sous <classe>/maths/),
# paysage : titre, haut, bas, bas en vert ?, ceinture
# short   : titre, sous-titre, 3 lignes (texte, taille, couleur)
EP = [
    ("4e", "volume-lien-aire", "volume/11-volume-lien-aire",
     ["LE VOLUME", "ET L'AIRE DU FOND"], "V = aire du fond × h", "puis 1 m³ = 1 000 L !", True, "verte",
     ["COMBIEN DE", "LITRES ?"], "la piscine gonflable du jardin",
     [("3 m² × 0,5 m", 96, B), ("= 1,5 m³", 100, B), ("= ? litres", 90, O)]),
    ("4e", "volume-pyramide", "volume/12-volume-pyramide",
     ["LE VOLUME", "D'UNE PYRAMIDE"], "V = aire de la base × h ÷ 3", "le tiers du prisme !", True, "verte",
     ["PRISME OU", "PYRAMIDE ?"], "même base, même hauteur",
     [("60 cm³ de sable", 90, B), ("combien de", 76, N), ("pyramides ?", 100, O)]),
    ("4e", "volume-cone", "volume/13-volume-cone",
     ["LE VOLUME", "D'UN CÔNE"], "V = π × r × r × h ÷ 3", "le tiers du cylindre !", True, "verte",
     ["LE CORNET", "OU LE POT ?"], "lequel contient le plus ?",
     [("cornet : r = 3, h = 12", 72, B), ("pot : r = 3, h = 4", 72, B), ("lequel ?", 100, O)]),
    ("4e", "volume-defi", "volume/14-volume-defi",
     ["DÉFIS", "SUR LES VOLUMES"], "cylindre + cône", "on additionne, puis en litres !", True, "bleue",
     ["LA CITERNE", "ET LA SÉCHERESSE"], "combien de jours d'eau ?",
     [("10 000 L", 120, B), ("− 400 L par jour", 84, R), ("combien de jours ?", 76, O)]),
    ("4e", "solides-reconnaitre", "solides/15-solides-reconnaitre",
     ["RECONNAÎTRE", "LES SOLIDES"], "faces, arêtes, sommets", "on compte, on reconnaît !", True, "jaune",
     ["QUEL", "SOLIDE ?"], "le chapeau du personnage",
     [("une base ronde", 84, B), ("une pointe en haut", 76, B), ("pas d'arête : ?", 84, O)]),
    ("4e", "solides-vues", "solides/16-solides-vues",
     ["LES VUES", "D'UN SOLIDE"], "face · dessus · côté", "chaque vue est à plat !", True, "verte",
     ["PAVÉ OU", "CYLINDRE ?"], "deux vues suffisent",
     [("de face : rectangle", 72, B), ("de dessus : disque", 72, B), ("alors ?", 100, O)]),
    ("4e", "solides-perspective", "solides/17-solides-perspective",
     ["LA PERSPECTIVE", "CAVALIÈRE"], "les fuyantes sont parallèles", "les cachées en pointillés !", True, "verte",
     ["LES FUYANTES", "D'UN CUBE"], "parallèles ou pas ?",
     [("parallèles ?", 90, B), ("perpendiculaires ?", 76, B), ("vraie longueur ?", 80, O)]),
    ("4e", "patron-pyramide", "solides/18-patron-pyramide",
     ["LE PATRON", "D'UNE PYRAMIDE"], "la base + des triangles", "ils se referment en pointe !", True, "verte",
     ["QUEL PATRON", "SE REFERME ?"], "une pyramide à base carrée",
     [("1 carré", 90, B), ("+ 4 triangles", 90, B), ("A, B ou C ?", 100, O)]),
    ("4e", "section-comprendre", "solides/19-section-comprendre",
     ["COMPRENDRE", "LA SECTION"], "on coupe : une figure plane", "un cylindre en travers : un disque", True, "verte",
     ["DEUX FOIS", "PLUS LARGE"], "combien de fois plus fort ?",
     [("le muscle coupé", 84, B), ("diamètre × 2", 96, B), ("section × ?", 100, O)]),
    ("4e", "solides-defi", "solides/20-solides-defi",
     ["DÉFIS", "SUR LES SOLIDES"], "pavé + prisme", "les vues → le solide → le volume", True, "bleue",
     ["CE QUE VOIT", "LE DRONE"], "quel solide pour le toit ?",
     [("dessus : rectangle", 72, B), ("face : un triangle", 72, B), ("le toit = ?", 100, O)]),
    ("4e", "perimetre-polygones", "perimetre/21-perimetre-polygones",
     ["COMPRENDRE", "LE PÉRIMÈTRE"], "le tour = la somme des côtés", "des m, pas des m² !", False, "jaune",
     ["COMBIEN DE", "BORDURE ?"], "la rampe du skatepark",
     [("8 + 6 + 10", 120, B), ("= ? m", 110, O), ("tout autour", 76, N)]),
    ("4e", "perimetre-cercle", "perimetre/22-perimetre-cercle",
     ["LA LONGUEUR", "D'UN CERCLE"], "L = π × diamètre", "le diamètre, pas le rayon !", False, "verte",
     ["12,6 M", "DE TOUR"], "un bassin de 4 m de large",
     [("π × 4 ≈ 12,6 m", 90, B), ("× 40 € le mètre", 80, B), ("= ? €", 110, O)]),
    ("4e", "perimetre-figure-composee", "perimetre/23-perimetre-figure-composee",
     ["LE PÉRIMÈTRE D'UNE", "FIGURE COMPOSÉE"], "3 × 20 + π × 20 ÷ 2", "le demi-cercle, pas le cercle !", False, "verte",
     ["LE VIRAGE", "COMPTE 31 M"], "pas 20 !",
     [("3 × 20 m", 100, B), ("+ 31 m", 100, B), ("= ? m", 110, O)]),
    ("4e", "perimetre-probleme", "perimetre/24-perimetre-probleme",
     ["UN PROBLÈME", "DE PÉRIMÈTRE"], "2 droites + 2 virages = 400 m", "les virages font un cercle !", True, "verte",
     ["CINQ TOURS", "DE PISTE"], "ça fait combien de km ?",
     [("5 × 400 m", 120, B), ("= ? km", 110, O), ("1 km = 1 000 m", 76, N)]),
    ("4e", "perimetre-defi", "perimetre/25-perimetre-defi",
     ["DÉFIS SUR", "LES PÉRIMÈTRES"], "100 m : carré ou cercle ?", "même grillage, pas même enclos !", True, "bleue",
     ["RAYON", "DOUBLÉ"], "le grillage × combien ?",
     [("r → 2 × r", 120, B), ("le tour × ?", 110, O), ("réponds en commentaire", 60, N)]),
    ("4e", "aire-rectangle-carre", "aire/26-aire-rectangle-carre",
     ["L'AIRE DU RECTANGLE", "ET DU CARRÉ"], "A = L × l", "des cm², pas des cm !", False, "jaune",
     ["LE PLUS", "GRAND ÉCRAN ?"], "deux téléphones, même prix",
     [("16 × 7", 120, B), ("ou", 70, N), ("15 × 8 ?", 120, O)]),
    ("4e", "aire-disque", "aire/27-aire-disque",
     ["L'AIRE", "D'UN DISQUE"], "A = π × r × r", "le rayon, deux fois !", True, "verte",
     ["UN TAMBOUR", "DEUX FOIS PLUS LARGE"], "la peau coûte combien ?",
     [("r → 2 × r", 120, B), ("l'aire × 4 !", 110, V), ("pas × 2", 90, R)]),
    ("4e", "aire-figure-composee", "aire/28-aire-figure-composee",
     ["L'AIRE D'UNE", "FIGURE COMPOSÉE"], "rectangle + rectangle", "on découpe, puis on additionne !", True, "verte",
     ["UNE TERRASSE", "EN L"], "un trait, deux rectangles",
     [("8 × 5", 110, B), ("+ 3 × 2", 110, B), ("= ? m²", 110, O)]),
    ("4e", "aire-probleme", "aire/29-aire-probleme",
     ["UN PROBLÈME", "D'AIRE"], "le grand − le trou", "on enlève le bassin !", True, "verte",
     ["CARRÉ MOINS", "DISQUE"], "combien de m² à carreler ?",
     [("8 × 8 = 64 m²", 90, B), ("− π × 2 × 2", 90, R), ("= ? m²", 110, O)]),
    ("4e", "aire-defi", "aire/30-aire-defi",
     ["DÉFIS", "SUR LES AIRES"], "1 m² = 10 000 cm²", "pas 100 !", False, "bleue",
     ["18 FLOCAGES", "EN M² ?"], "563 cm² chacun",
     [("18 × 563 cm²", 90, B), ("= 10 134 cm²", 90, B), ("= ? m²", 110, O)]),
    ("3e", "volume-boule", "volume/31-volume-boule",
     ["LE VOLUME", "D'UNE BOULE"], "V = 4 ÷ 3 × π × r³", "le rayon au cube !", True, "verte",
     ["TOUT L'AIR DE", "TES POUMONS"], "quel rayon de ballon ?",
     [("4 L", 120, B), ("= 4 000 cm³", 100, B), ("r = ? cm", 110, O)]),
    ("3e", "volume-reduction-section", "volume/32-volume-reduction-section",
     ["LA RÉDUCTION", "PAR UNE SECTION"], "hauteur ÷ 2 → volume ÷ 8", "pas la moitié !", False, "bleue",
     ["À MI-HAUTEUR", "LA MOITIÉ ?"], "le gobelet conique",
     [("hauteur ÷ 2", 100, B), ("volume ÷ 2 ?", 100, R), ("non : ÷ 8 !", 100, V)]),
    ("3e", "section-pave-cube", "sections/33-section-pave-cube",
     ["LA SECTION D'UN", "PAVÉ OU D'UN CUBE"], "toujours un rectangle", "parallèle à une face ou à une arête", True, "jaune",
     ["LA TRANCHE", "EN BIAIS"], "plus grande ou pas ?",
     [("coupe droite", 90, B), ("ou en biais ?", 90, B), ("laquelle est la plus grande ?", 56, O)]),
    ("3e", "section-cylindre", "sections/34-section-cylindre",
     ["LA SECTION", "D'UN CYLINDRE"], "disque ou rectangle", "selon le sens de la coupe !", True, "verte",
     ["L'AIRE", "DE LA COUPE"], "un tube de 3 cm de rayon",
     [("coupé en travers", 84, B), ("π × 3 × 3", 100, B), ("≈ ? cm²", 110, O)]),
    ("3e", "section-cone-pyramide", "sections/35-section-cone-pyramide",
     ["LA SECTION D'UN CÔNE", "ET D'UNE PYRAMIDE"], "une réduction de la base", "à mi-hauteur : tout ÷ 2 !", True, "verte",
     ["LE VOLCAN", "À MI-HAUTEUR"], "quel rayon dans la coupe ?",
     [("en bas : 1 000 m", 86, B), ("à mi-hauteur :", 86, B), ("r = ? m", 110, O)]),
    ("3e", "section-sphere", "sections/36-section-sphere",
     ["LA SECTION", "D'UNE SPHÈRE"], "toujours un cercle", "le plus grand passe par le centre !", True, "bleue",
     ["LE PLUS", "GRAND CERCLE ?"], "l'équateur ou le parallèle",
     [("l'équateur", 100, B), ("ou", 70, N), ("le parallèle ?", 100, O)]),
    ("3e", "section-longueur", "sections/37-section-longueur",
     ["UNE LONGUEUR", "DANS UNE SECTION"], "le triangle rectangle caché", "puis Pythagore !", True, "bleue",
     ["LA DIAGONALE", "D'UNE FACE"], "un cube de 6 cm d'arête",
     [("6 + 6 = 12 cm ?", 96, R), ("non !", 90, V), ("Pythagore : ? cm", 84, O)]),
    ("3e", "section-defi", "sections/38-section-defi",
     ["DÉFIS SUR", "LES SECTIONS"], "les tranches → le solide", "on empile, on reconnaît !", True, "marron",
     ["TROIS TRANCHES", "UN SOLIDE"], "le scanner de l'imprimante 3D",
     [("carré, petit carré", 76, B), ("puis un point", 76, B), ("quel solide ?", 100, O)]),
]


def accroche_paysage(haut, bas, vert, ceinture, y0=352):
    def f(d):
        th = ajuste(d, haut, 92, 900)
        tb = ajuste(d, bas, 58, 900)
        d.text((56, y0), haut, font=police("ariblk.ttf", th), fill=BLEU)
        d.text((60, y0 + th + 26), bas, font=police("ariblk.ttf", tb), fill=VERT if vert else ROUGE)
        echelle(d, 690, 592, ceinture, s=0.5)
    return f


def accroche_short(items):
    def f(d):
        echelle(d, W // 2, 1265, "blanche", s=0.8)
        lignes(d, items, y0=690, pas=175)
    return f


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    filtre = sys.argv[1] if len(sys.argv) > 1 else ""
    sonde = ImageDraw.Draw(Image.new("RGB", (W, 10)))
    for (cl, slug, rep, tit, haut, bas, vert, ceint, tit_s, sous, items) in EP:
        if filtre and filtre not in slug:
            continue
        rel = f"{cl}/maths/{rep}"
        nom = f"eleveai-maths-{cl}-{slug}"
        mp4 = SORTIES / rel / (nom + ".mp4")
        if not mp4.exists():
            print("pas encore de vidéo :", nom)
            continue
        construire_paysage(nom, {
            "badge": f"MATHS · {cl}", "duree": f"EN {minutes(mp4)} MIN",
            "titre": tit, "accroche": accroche_paysage(haut, bas, vert, ceint), "dossier": rel,
        })
        # Le short : ceinture blanche (manifeste), Manim, pas de « Dessin animé ».
        nom_s = nom + "-short"
        taille = 96
        while taille > 60 and max(sonde.textlength(t, font=police("ariblk.ttf", taille)) for t in tit_s) > W - 80:
            taille -= 4
        for txt, tl, _ in items:
            l = sonde.textlength(txt, font=police("ariblk.ttf", tl))
            if l > W - 80:
                print(f"  ⛔ DÉBORDE « {txt} » : {l:.0f} px")
        _COURANTE[0] = "blanche"
        construire_short(nom_s, {
            "badge": f"MATHS · {cl.upper()}", "titre": tit_s, "taille": taille, "sous": sous,
            "taille_sous": 44, "couleur_sous": ORANGE, "accroche": accroche_short(items), "dossier": TEMP,
        })
        source = RACINE / "manim" / "miniatures" / TEMP / f"{nom_s}.png"
        cible = SORTIES / rel / f"{nom_s}-miniature.png"
        shutil.move(source, cible)
        print(cible)
    tmp = RACINE / "manim" / "miniatures" / TEMP
    if tmp.is_dir() and not any(tmp.iterdir()):
        tmp.rmdir()


if __name__ == "__main__":
    main()
