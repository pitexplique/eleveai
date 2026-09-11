# miniature_short.py
# LA MINIATURE VERTICALE DES SHORTS — 1080 × 1920, charte « cahier ».
#
# ── POURQUOI CE FICHIER (10/09/2026) ──────────────────────────────────────────
# Frédéric : « on ne fait pas de miniature comme pour les CP écriture, c'est
# peut-être dommage ? ». Vérification faite, les « miniatures portrait » du CP
# (`manim/miniatures/cp/francais/fr/*-portrait.png`) ne sont PAS des miniatures :
# ce sont les pages de garde des vidéos exportées en image, fond noir compris.
# Elles n'apportent donc rien de plus que les trois images que YouTube propose
# tout seul. La vraie miniature « cahier » — papier quadrillé, badge bleu nuit,
# Ti-Margo, la photo de Frédéric — n'existait qu'en 1280 × 720, pour le paysage.
#
# ⚠️ CE QUE ÇA CHANGE, ET CE QUE ÇA NE CHANGE PAS. Dans le FLUX Shorts, personne
# ne voit la vignette : YouTube lance la vidéo. C'est la première seconde qui
# décide (voir l'image à 1 seconde des shorts). La vignette sert AILLEURS —
# l'onglet Shorts de la chaîne, les playlists, les partages — où l'on regarde
# une grille. C'est là qu'une série reconnaissable se gagne.
#
# ⛔ ZONE SÛRE. L'interface de YouTube recouvre le bas de l'image (titre, nom de
# chaîne, boutons) et mord un peu sur le haut. Rien de vital au-dessus de
# y = 190 ni sous y = 1630 — Ti-Margo et la signature peuvent y déborder, ils
# ne portent aucune information.
#
# Usage :
#   python manim/miniature_short.py               → toutes
#   python manim/miniature_short.py puissances    → celles dont le nom contient
#
# Les fichiers sortent dans `manim/miniatures/<dossier>/<nom>.png`.

import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from PIL import Image, ImageDraw

from miniature import (AVATAR, BLEU, CARREAU, CARREAU_FORT, JAUNE, NAVY, PAPIER,
                       ROUGE, SORTIE, TI_MARGO, VERT, police)

W, H = 1080, 1920
HAUT_SUR, BAS_SUR = 190, 1630


def centre(d, cx, y, txt, f, fill):
    d.text((cx - d.textlength(txt, font=f) / 2, y), txt, font=f, fill=fill)


def fond():
    img = Image.new("RGB", (W, H), PAPIER)
    d = ImageDraw.Draw(img)
    for x in range(0, W, 34):
        d.line([(x, 0), (x, H)], fill=CARREAU, width=1)
    for y in range(0, H, 34):
        d.line([(0, y), (W, y)], fill=CARREAU, width=1)
    for x in range(0, W, 170):
        d.line([(x, 0), (x, H)], fill=CARREAU_FORT, width=2)
    for y in range(0, H, 170):
        d.line([(0, y), (W, y)], fill=CARREAU_FORT, width=2)
    return img


def badge(d, cx, y, txt):
    f = police("ariblk.ttf", 34)
    l = d.textlength(txt, font=f)
    x = cx - (l + 56) / 2
    d.rounded_rectangle([x, y, x + l + 56, y + 62], radius=31, fill=NAVY)
    d.text((x + 28, y + 12), txt, font=f, fill=(255, 255, 255))


def signature(img, d, sig="Frédéric, ton prof"):
    """En bas, CENTRÉE — et volontairement dans la bande que l'interface mord :
    elle n'a rien de vital, elle signe."""
    diam, y = 108, 1508
    x = 96
    av = Image.open(AVATAR).convert("RGBA")
    s = min(av.size)
    av = av.crop(((av.width - s) // 2, (av.height - s) // 2,
                  (av.width + s) // 2, (av.height + s) // 2)).resize((diam, diam), Image.LANCZOS)
    masque = Image.new("L", (diam, diam), 0)
    ImageDraw.Draw(masque).ellipse([0, 0, diam, diam], fill=255)
    img.paste(av, (x, y), masque)
    d.ellipse([x - 4, y - 4, x + diam + 4, y + diam + 4], outline=NAVY, width=6)
    tx = x + diam + 22
    d.text((tx, y + 8), sig, font=police("arialbd.ttf", 34), fill=NAVY)
    d.text((tx, y + 54), "eleveai.fr", font=police("ariblk.ttf", 42), fill=BLEU)


# ══════════════════════════════════════════════════════════════════════════════
#  LES ACCROCHES — le cœur de l'image, au CENTRE de la zone sûre.
#  ⚠️ Un short se juge dans une grille de vignettes hautes de quelques
#  centimètres : trois éléments au plus, et le plus gros porte le message.
# ══════════════════════════════════════════════════════════════════════════════

def acc_puissances_parenthese(d):
    centre(d, W // 2, 700, "(7³)⁴", police("ariblk.ttf", 190), BLEU)
    centre(d, W // 2, 980, "3 × 4", police("ariblk.ttf", 104), VERT)
    centre(d, W // 2, 1110, "pas 3 + 4", police("ariblk.ttf", 96), ROUGE)


def acc_racine_somme(d):
    centre(d, W // 2, 700, "√9 + √16", police("ariblk.ttf", 138), BLEU)
    centre(d, W // 2, 900, "≠", police("ariblk.ttf", 130), ROUGE)
    centre(d, W // 2, 1070, "√25", police("ariblk.ttf", 138), ROUGE)


def acc_racine_simplifier(d):
    centre(d, W // 2, 720, "√50", police("ariblk.ttf", 168), JAUNE)
    centre(d, W // 2, 950, "=", police("ariblk.ttf", 96), NAVY)
    centre(d, W // 2, 1080, "5√2", police("ariblk.ttf", 168), VERT)


def acc_racine_negatif(d):
    """⚠️ La ligne du bas ne REPETE PAS le titre (« ça n'existe pas ») : elle
    donne la RAISON. Une vignette qui dit deux fois la même chose gâche sa
    moitié basse — et c'est la raison qui donne envie d'ouvrir."""
    centre(d, W // 2, 700, "√−9", police("ariblk.ttf", 190), ROUGE)
    # la barre qui dit « impossible »
    d.line([(300, 830), (780, 760)], fill=ROUGE, width=16)
    centre(d, W // 2, 1010, "aucun carré", police("ariblk.ttf", 86), NAVY)
    centre(d, W // 2, 1120, "n'est négatif", police("ariblk.ttf", 86), NAVY)


def acc_repere_diagonales(d):
    """Le parallélogramme et ses deux diagonales — une figure se reconnait en
    petit, là où une formule ne se lit plus."""
    A, B, C, D = (300, 1090), (700, 990), (790, 760), (390, 850)
    for p, q in ((A, B), (B, C), (C, D), (D, A)):
        d.line([p, q], fill=NAVY, width=7)
    d.line([A, C], fill=VERT, width=14)
    d.line([B, D], fill=ROUGE, width=14)
    for p in (A, B, C, D):
        d.ellipse([p[0] - 12, p[1] - 12, p[0] + 12, p[1] + 12], fill=BLEU)
    centre(d, W // 2, 640, "les DIAGONALES", police("ariblk.ttf", 78), NAVY)
    centre(d, W // 2, 1180, "pas les côtés", police("ariblk.ttf", 72), ROUGE)


def acc_ir_double_produit(d):
    centre(d, W // 2, 690, "(3 + 4)²", police("ariblk.ttf", 116), JAUNE)
    centre(d, W // 2, 870, "49 ≠ 25", police("ariblk.ttf", 128), ROUGE)
    centre(d, W // 2, 1060, "il manque 24", police("ariblk.ttf", 76), NAVY)


def acc_ir_difference(d):
    centre(d, W // 2, 700, "x² − 9", police("ariblk.ttf", 150), JAUNE)
    centre(d, W // 2, 900, "=", police("ariblk.ttf", 90), NAVY)
    centre(d, W // 2, 1030, "(x−3)(x+3)", police("ariblk.ttf", 104), VERT)


def acc_ir_calcul_mental(d):
    centre(d, W // 2, 680, "99²", police("ariblk.ttf", 190), JAUNE)
    centre(d, W // 2, 950, "9 801", police("ariblk.ttf", 150), VERT)
    centre(d, W // 2, 1140, "de tête", police("ariblk.ttf", 82), NAVY)


def acc_eq_retournement(d):
    centre(d, W // 2, 690, "−2x > 6", police("ariblk.ttf", 128), JAUNE)
    centre(d, W // 2, 880, "x < −3", police("ariblk.ttf", 128), VERT)
    centre(d, W // 2, 1070, "le sens se retourne", police("ariblk.ttf", 64), ROUGE)


def acc_eq_balance(d):
    centre(d, W // 2, 700, "5x − 3 = 12", police("ariblk.ttf", 104), JAUNE)
    centre(d, W // 2, 900, "↓", police("ariblk.ttf", 90), NAVY)
    centre(d, W // 2, 1030, "x = 3", police("ariblk.ttf", 140), VERT)


def acc_eq_probleme(d):
    for i, (txt, coul) in enumerate([("1. nommer", NAVY), ("2. traduire", NAVY),
                                     ("3. résoudre", NAVY), ("4. répondre", VERT)]):
        centre(d, W // 2, 680 + i * 118, txt, police("ariblk.ttf", 76), coul)


def acc_fv_dissymetrie(d):
    centre(d, W // 2, 680, "IMAGE", police("ariblk.ttf", 96), VERT)
    centre(d, W // 2, 790, "unique", police("ariblk.ttf", 68), VERT)
    centre(d, W // 2, 940, "ANTÉCÉDENT", police("ariblk.ttf", 78), ROUGE)
    centre(d, W // 2, 1050, "0, 1, 2, ou plus", police("ariblk.ttf", 58), ROUGE)


def acc_fv_image(d):
    centre(d, W // 2, 690, "f(4)", police("ariblk.ttf", 150), JAUNE)
    centre(d, W // 2, 900, "4² − 2×4", police("ariblk.ttf", 88), NAVY)
    centre(d, W // 2, 1040, "= 8", police("ariblk.ttf", 130), VERT)


def acc_fv_lecture(d):
    centre(d, W // 2, 680, "l'image", police("ariblk.ttf", 72), VERT)
    centre(d, W // 2, 780, "je MONTE", police("ariblk.ttf", 88), VERT)
    centre(d, W // 2, 940, "l'antécédent", police("ariblk.ttf", 66), ROUGE)
    centre(d, W // 2, 1040, "je TRAVERSE", police("ariblk.ttf", 82), ROUGE)


def acc_py_egal(d):
    centre(d, W // 2, 690, "x = x + 1", police("ariblk.ttf", 112), JAUNE)
    centre(d, W // 2, 880, "=  range", police("ariblk.ttf", 82), VERT)
    centre(d, W // 2, 1000, "== compare", police("ariblk.ttf", 82), ROUGE)


def acc_py_boucles(d):
    centre(d, W // 2, 670, "for", police("ariblk.ttf", 92), VERT)
    centre(d, W // 2, 780, "= POUR", police("ariblk.ttf", 62), VERT)
    centre(d, W // 2, 930, "while", police("ariblk.ttf", 92), ROUGE)
    centre(d, W // 2, 1040, "= TANT QUE", police("ariblk.ttf", 62), ROUGE)


def acc_py_tracer(d):
    f = police("ariblk.ttf", 62)
    for i, (a, b) in enumerate([("i", "s"), ("1", "2"), ("2", "6"), ("3", "12"), ("4", "20")]):
        coul = BLEU if i == 0 else (VERT if i == 4 else NAVY)
        d.text((420, 660 + i * 74), a, font=f, fill=coul)
        d.text((600, 660 + i * 74), b, font=f, fill=coul)
    d.line([(400, 728), (700, 728)], fill=BLEU, width=4)


def acc_974_fait(d):
    centre(d, W // 2, 660, "26°", police("ariblk.ttf", 130), JAUNE)
    centre(d, W // 2, 800, "à Saint-Gilles", police("ariblk.ttf", 52), JAUNE)
    centre(d, W // 2, 930, "11°", police("ariblk.ttf", 130), BLEU)
    centre(d, W // 2, 1070, "au Maïdo", police("ariblk.ttf", 52), BLEU)


def acc_974_antecedent(d):
    centre(d, W // 2, 680, "20 °C", police("ariblk.ttf", 128), JAUNE)
    centre(d, W // 2, 850, "à quelle", police("ariblk.ttf", 68), NAVY)
    centre(d, W // 2, 950, "altitude ?", police("ariblk.ttf", 68), NAVY)
    centre(d, W // 2, 1090, "923 m", police("ariblk.ttf", 96), VERT)


def acc_974_pourquoi(d):
    centre(d, W // 2, 670, "plus près", police("ariblk.ttf", 76), JAUNE)
    centre(d, W // 2, 770, "du soleil", police("ariblk.ttf", 76), JAUNE)
    centre(d, W // 2, 920, "et plus", police("ariblk.ttf", 76), BLEU)
    centre(d, W // 2, 1020, "FROID", police("ariblk.ttf", 110), BLEU)


SHORTS = {
    "eleveai-maths-974-temperature-altitude": {
        "badge": "LES MATHS EN VRAI", "titre": ["15 DEGRÉS", "D'ÉCART"], "taille": 92,
        "sous": "sur la même île, le même matin", "accroche": acc_974_fait,
        "dossier": "974/maths/fr",
    },
    "eleveai-maths-974-temperature-altitude-short-antecedent": {
        "badge": "LES MATHS EN VRAI", "titre": ["OÙ FAIT-IL", "20 DEGRÉS ?"], "taille": 88,
        "sous": "une équation, et un lieu réel", "accroche": acc_974_antecedent,
        "dossier": "974/maths/fr",
    },
    "eleveai-maths-974-temperature-altitude-short-pourquoi": {
        "badge": "LES MATHS EN VRAI", "titre": ["POURQUOI IL", "FAIT FROID"], "taille": 84,
        "sous": "en haut de la montagne", "accroche": acc_974_pourquoi,
        "dossier": "974/maths/fr",
    },
    "eleveai-maths-seconde-python-short-egal": {
        "badge": "MATHS · SECONDE", "titre": ["LE SIGNE =", "EN PYTHON"], "taille": 88,
        "sous": "il range, il ne compare pas", "accroche": acc_py_egal,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-python-short-boucles": {
        "badge": "MATHS · SECONDE", "titre": ["QUELLE", "BOUCLE ?"], "taille": 96,
        "sous": "combien de fois, ou jusqu'à quand", "accroche": acc_py_boucles,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-python-short-tracer": {
        "badge": "MATHS · SECONDE", "titre": ["TRACER UN", "PROGRAMME"], "taille": 90,
        "sous": "ne devine pas, note", "accroche": acc_py_tracer,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-fonction-vocabulaire-short-dissymetrie": {
        "badge": "MATHS · SECONDE", "titre": ["IMAGE OU", "ANTÉCÉDENT ?"], "taille": 84,
        "sous": "tout le monde les confond", "accroche": acc_fv_dissymetrie,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-fonction-vocabulaire-short-image": {
        "badge": "MATHS · SECONDE", "titre": ["CALCULER", "UNE IMAGE"], "taille": 90,
        "sous": "il suffit de remplacer", "accroche": acc_fv_image,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-fonction-vocabulaire-short-lecture": {
        "badge": "MATHS · SECONDE", "titre": ["LIRE SUR", "UNE COURBE"], "taille": 90,
        "sous": "deux gestes différents", "accroche": acc_fv_lecture,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-equations-inequations-short-retournement": {
        "badge": "MATHS · SECONDE", "titre": ["DIVISER PAR", "UN NÉGATIF"], "taille": 82,
        "sous": "l'exception qui coûte des points", "accroche": acc_eq_retournement,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-equations-inequations-short-balance": {
        "badge": "MATHS · SECONDE", "titre": ["RÉSOUDRE UNE", "ÉQUATION"], "taille": 82,
        "sous": "la balance, en trois gestes", "accroche": acc_eq_balance,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-equations-inequations-short-probleme": {
        "badge": "MATHS · SECONDE", "titre": ["METTRE EN", "ÉQUATION"], "taille": 88,
        "sous": "la méthode en quatre étapes", "accroche": acc_eq_probleme,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-identites-remarquables-short-doubleproduit": {
        "badge": "MATHS · SECONDE", "titre": ["LE DOUBLE", "PRODUIT"], "taille": 90,
        "sous": "celui qu'on oublie", "accroche": acc_ir_double_produit,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-identites-remarquables-short-difference": {
        "badge": "MATHS · SECONDE", "titre": ["FACTORISER", "x² − 9"], "taille": 84,
        "sous": "une différence de carrés", "accroche": acc_ir_difference,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-identites-remarquables-short-calculmental": {
        "badge": "MATHS · SECONDE", "titre": ["99² DE TÊTE", "EN 3 SECONDES"], "taille": 68,
        "sous": "l'astuce du nombre rond", "accroche": acc_ir_calcul_mental,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-puissances-short": {
        "badge": "MATHS · SECONDE", "titre": ["LES", "PUISSANCES"], "taille": 96,
        "sous": "la parenthèse multiplie", "accroche": acc_puissances_parenthese,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-racine-carree-2de-short-somme": {
        "badge": "MATHS · SECONDE", "titre": ["LA RACINE", "CARRÉE"], "taille": 96,
        "sous": "le piège de la somme", "accroche": acc_racine_somme,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-racine-carree-2de-short-simplifier": {
        "badge": "MATHS · SECONDE", "titre": ["SIMPLIFIER", "UNE RACINE"], "taille": 84,
        "sous": "sortir le plus grand carré", "accroche": acc_racine_simplifier,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-racine-carree-2de-short-negatif": {
        # ⚠️ Le titre de la vignette dit la MÊME phrase que le titre YouTube :
        # « Pourquoi √(−9) n'existe pas ». Deux formulations pour une seule
        # vidéo, et le spectateur ne sait plus s'il a déjà vu celle-là.
        "badge": "MATHS · SECONDE", "titre": ["POURQUOI", "√−9 N'EXISTE PAS"], "taille": 72,
        "sous": "un carré est toujours positif", "accroche": acc_racine_negatif,
        "dossier": "seconde/maths/fr",
    },
    "eleveai-maths-seconde-repere-coordonnees-short": {
        "badge": "MATHS · SECONDE", "titre": ["PARALLÉLO-", "GRAMME ?"], "taille": 84,
        "sous": "compare les diagonales", "accroche": acc_repere_diagonales,
        "dossier": "seconde/maths/fr",
    },
}


def construire(nom, spec):
    img = fond()
    d = ImageDraw.Draw(img)

    # Ti-Margo en bas à droite, à cheval sur la bande que l'interface recouvre.
    m = Image.open(TI_MARGO).convert("RGBA")
    h = 560
    w = int(m.width * h / m.height)
    m = m.resize((w, h), Image.LANCZOS)
    img.paste(m, (W - w - 10, H - h - 8), m)

    badge(d, W // 2, HAUT_SUR + 20, spec["badge"])

    ft = police("ariblk.ttf", spec["taille"])
    centre(d, W // 2, 320, spec["titre"][0], ft, NAVY)
    centre(d, W // 2, 320 + spec["taille"] + 26, spec["titre"][1], ft, NAVY)
    centre(d, W // 2, 320 + 2 * (spec["taille"] + 26) + 6,
           spec["sous"], police("arialbd.ttf", 40), BLEU)

    spec["accroche"](d)
    signature(img, d, spec.get("sig", "Frédéric, ton prof"))

    dossier = SORTIE / spec["dossier"] if spec.get("dossier") else SORTIE
    os.makedirs(dossier, exist_ok=True)
    chemin = dossier / f"{nom}.png"
    img.save(chemin, "PNG")
    print(chemin)


def main():
    filtre = sys.argv[1] if len(sys.argv) > 1 else None
    for nom, spec in SHORTS.items():
        if filtre and filtre not in nom:
            continue
        construire(nom, spec)


if __name__ == "__main__":
    main()
