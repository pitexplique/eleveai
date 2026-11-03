# « Mon cahier d'écriture » — une page A4 par chiffre puis par lettre, pensée
# pour les élèves qui arrivent en 6e sans savoir écrire (ULIS, AESH).
#
# ── POURQUOI CE FICHIER EXISTE (03/11/2026) ───────────────────────────────────
# ⭐⭐ Frédéric, en 6e : un élève avec AESH, qui devrait être en ULIS, faute de
# place. Il ne sait pas écrire. Devant les vidéos de CP, « au bout d'un moment,
# il n'avait pas écrit depuis 10 ans, il a écrit ». On ne leur achète pas de
# cahier : la feuille s'imprime. « J'ai 8 mois, je veux qu'ils sachent écrire
# quand je pars : des lettres, des chiffres et composer des mots. »
# Et : « les fiches d'écriture doivent être LUDIQUES, adaptées aux ULIS ».
#
# ⭐ CE QUI CHANGE PAR RAPPORT À `fiche_ecriture.py` (la fiche CP) :
#   · une phrase d'ENCOURAGEMENT de Ti Margo, différente à chaque page ;
#   · la MÉTHODE en trois pictos, la même sur toutes les pages (un élève qui lit
#     mal la reconnait à l'image, pas au texte) ;
#   · le SENS du geste : une flèche orange au départ du modèle, et un numéro
#     par trait quand on lève le crayon (4, 5, i…) ;
#   · QUATRE modèles par ligne au lieu de sept : finir une ligne doit rester
#     possible pour une main lente ;
#   · une ÉTOILE à colorier au bout de chaque ligne, et des smileys en bas :
#     il se voit avancer. ⛔ Aucun smiley triste — on valorise, on ne note pas.
#
# ⛔ MÊMES TRACÉS QUE LES VIDÉOS (`traces_scenes.py` lit les scènes Manim) :
# une seule source pour le film et la feuille.
#
# ── USAGE ─────────────────────────────────────────────────────────────────────
#   python manim/fiche_ecriture_ulis.py        → toutes les pages + le cahier
#   python manim/fiche_ecriture_ulis.py 3      → seulement la page du « 3 »
#
# Sortie : public/fiches-ecriture/mon-cahier/

import math
import sys
from pathlib import Path

from PIL import Image, ImageDraw

sys.path.insert(0, str(Path(__file__).resolve().parent))
from fiche_ecriture import (  # noqa: E402
    BLEU, GRIS_LIGNE, GRIS_MODELE, H, MARGE, NAVY, TI_MARGO, VERT, W,
    _un_trait, points_lettre, police, profondeur, tracer_lettre,
)
from traces_scenes import spec_chiffre, spec_lettre  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SORTIE = RACINE / "public" / "fiches-ecriture" / "mon-cahier"

ORANGE = (234, 108, 20)
JAUNE_CLAIR = (255, 246, 214)
JAUNE_BORD = (245, 196, 70)
ROSE = (225, 29, 92)

# ⭐ L'ORDRE DU CAHIER : les 10 chiffres d'abord (Frédéric, 03/11 : « prévois
# de faire les vidéos sur les 10 chiffres, et après alphabet »).
CHIFFRES = [str(n) for n in range(10)]

# ⭐ UNE PHRASE PAR PAGE, qui tourne : la même phrase trente fois ne se lit plus.
# Courtes, au présent, sur l'EFFORT et jamais sur le talent.
ENCOURAGEMENTS = [
    "Prends ton temps. Doucement, c'est très bien !",
    "Tu as le droit de te tromper. On recommence, c'est tout.",
    "Chaque ligne te rend plus fort.",
    "Lentement d'abord. La vitesse viendra toute seule.",
    "Tu y arrives de mieux en mieux !",
    "Respire, pose ton crayon, et c'est parti.",
    "Une belle lettre, c'est une lettre faite doucement.",
    "Je suis fier de toi quand tu essaies.",
]

ESPACE = 2.9  # en interlignes, d'un modèle au suivant : de l'air pour une main lente


def etoile(d, cx, cy, r, couleur=JAUNE_BORD, largeur=8):
    pts = []
    for k in range(10):
        a = -math.pi / 2 + k * math.pi / 5
        rr = r if k % 2 == 0 else r * 0.45
        pts.append((cx + rr * math.cos(a), cy + rr * math.sin(a)))
    d.polygon(pts, outline=couleur, width=largeur)


def smiley(d, cx, cy, r, bouche):
    """Un smiley À COLORIER : un contour, deux yeux, une bouche."""
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=NAVY, width=8)
    for sx in (-1, 1):
        ox, oy = cx + sx * r * 0.36, cy - r * 0.25
        d.ellipse([ox - r * 0.09, oy - r * 0.12, ox + r * 0.09, oy + r * 0.12], fill=NAVY)
    box = [cx - r * 0.5, cy - r * 0.25, cx + r * 0.5, cy + r * 0.55]
    if bouche == "grand":
        d.chord(box, 10, 170, outline=NAVY, fill=None, width=8)
    elif bouche == "sourire":
        d.arc(box, 25, 155, fill=NAVY, width=8)
    else:  # « encore un peu » : bouche droite, jamais triste
        d.line([(cx - r * 0.35, cy + r * 0.35), (cx + r * 0.35, cy + r * 0.35)], fill=NAVY, width=8)


def fleche(d, pts, il):
    """La flèche du SENS, posée à côté du début du premier trait."""
    n = len(pts)
    a, b = pts[min(4, n - 1)], pts[min(n - 1, max(12, n // 7))]
    dx, dy = b[0] - a[0], b[1] - a[1]
    L = math.hypot(dx, dy) or 1
    ux, uy = dx / L, dy / L
    nx, ny = -uy, ux
    # Décalée hors du trait, du côté extérieur, pour ne pas le cacher.
    off = 0.45 * il
    p0 = (a[0] + nx * off, a[1] + ny * off)
    p1 = (p0[0] + ux * 0.55 * il, p0[1] + uy * 0.55 * il)
    d.line([p0, p1], fill=ORANGE, width=10)
    t = 0.18 * il
    d.polygon([
        (p1[0] + ux * t, p1[1] + uy * t),
        (p1[0] - ux * t * 0.4 + nx * t * 0.8, p1[1] - uy * t * 0.4 + ny * t * 0.8),
        (p1[0] - ux * t * 0.4 - nx * t * 0.8, p1[1] - uy * t * 0.4 - ny * t * 0.8),
    ], fill=ORANGE)


def bande(d, spec, y_base, il, titre, mode, y_titre):
    x0, x1 = MARGE, W - MARGE
    d.text((x0, y_titre), titre, font=police("ariblk.ttf", 50), fill=BLEU)
    for k in range(4):
        y = y_base - k * il
        forte = k == 0
        d.line([(x0, y), (x1 - 170, y)], fill=NAVY if forte else GRIS_LIGNE,
               width=7 if forte else 3)
    # L'étoile de fin de ligne, à colorier.
    etoile(d, x1 - 70, y_base - 1.5 * il, 62)

    gauche = min(x for t in spec["traits"] for x, _ in t)
    bx = x0 + 70 + max(0.0, -gauche) * il
    for i in range(4):
        traits = points_lettre(spec, bx, y_base, il)
        if mode == "modele" and i == 0:
            tracer_lettre(d, spec, bx, y_base, il, BLEU, 16)
            fleche(d, traits[0], il)
        elif mode in ("modele", "pointille"):
            tracer_lettre(d, spec, bx, y_base, il, GRIS_MODELE, 14, pointille=True)
        # Le point de départ de CHAQUE trait, numéroté s'il y en a plusieurs.
        for k, t in enumerate(traits):
            dx, dy = t[0]
            d.ellipse([dx - 19, dy - 19, dx + 19, dy + 19], fill=VERT)
            if len(traits) > 1 and (mode != "seul" or i == 0):
                d.text((dx - 60 + k * 84, dy - 72), str(k + 1), font=police("ariblk.ttf", 44), fill=ORANGE)
        bx += ESPACE * il


def methode(d, y):
    """Les trois gestes, toujours les mêmes, toujours dans le même ordre."""
    d.rounded_rectangle([MARGE, y, W - MARGE, y + 300], radius=40, fill=JAUNE_CLAIR,
                        outline=JAUNE_BORD, width=6)
    d.text((MARGE + 40, y + 24), "Ma méthode", font=police("ariblk.ttf", 52), fill=NAVY)
    col = (W - 2 * MARGE - 80) / 3
    for k, texte in enumerate(["Je pose mon crayon\nsur le point vert",
                               "Je suis la flèche,\ntout doucement",
                               "Ligne finie ?\nJe colorie l'étoile"]):
        cx = MARGE + 40 + k * col
        cy = y + 190
        if k == 0:
            d.ellipse([cx + 10, cy - 34, cx + 78, cy + 34], fill=VERT)
        elif k == 1:
            d.line([(cx, cy), (cx + 70, cy)], fill=ORANGE, width=12)
            d.polygon([(cx + 95, cy), (cx + 62, cy - 24), (cx + 62, cy + 24)], fill=ORANGE)
        else:
            etoile(d, cx + 45, cy, 44, largeur=7)
        d.multiline_text((cx + 115, cy - 58), texte, font=police("arialbd.ttf", 42),
                         fill=NAVY, spacing=8)


def construire(glyphe, rang):
    chiffre = glyphe.isdigit()
    spec = spec_chiffre(int(glyphe)) if chiffre else spec_lettre(glyphe)
    haut = max(y for t in spec["traits"] for _, y in t)
    prof = profondeur(spec)
    # ⛔ LA PLACE SE CALCULE, ELLE NE SE FIXE PAS : 3 bandes entre la méthode
    # (fin à 1070) et les smileys (H − 560). Premier essai à 170 px fixes : la
    # 3ᵉ ligne passait SOUS les smileys, et le « f » montait dans la consigne.
    # ⭐ Interligne plafonné à 155 px ≈ 13 mm, plus grand que la fiche CP.
    hb = (H - 560 - 1110) / 3
    monte = max(3.0, haut + 0.15)
    il = min(155, int((hb - 72 - 60) / (monte + prof)))

    img = Image.new("RGB", (W, H), (255, 255, 255))
    d = ImageDraw.Draw(img)

    # ── L'en-tête ────────────────────────────────────────────────────────────
    d.rounded_rectangle([MARGE, 140, MARGE + 1010, 262], radius=60, fill=ORANGE)
    d.text((MARGE + 50, 168), "MON CAHIER D'ÉCRITURE", font=police("ariblk.ttf", 54),
           fill=(255, 255, 255))
    d.text((1400, 150), "Prénom :", font=police("arialbd.ttf", 54), fill=NAVY)
    d.line([(1650, 222), (W - MARGE, 222)], fill=GRIS_LIGNE, width=5)
    d.text((1400, 250), "Date :", font=police("arialbd.ttf", 54), fill=NAVY)
    d.line([(1590, 322), (W - MARGE, 322)], fill=GRIS_LIGNE, width=5)

    quoi = "le chiffre" if chiffre else "la lettre"
    d.text((MARGE, 360), f"J'écris {quoi}", font=police("ariblk.ttf", 110), fill=NAVY)
    # Le glyphe lui-même, en grand, à côté du titre (le tracé cursif, pas une police).
    g_il = min(95, int(230 / (haut + prof)))
    gx = MARGE + d.textlength(f"J'écris {quoi}", font=police("ariblk.ttf", 110)) + 70
    gx += max(0.0, -min(x for t in spec["traits"] for x, _ in t)) * g_il
    tracer_lettre(d, spec, gx, 365 + haut * g_il, g_il, ROSE, 15)

    # Ti Margo et sa bulle.
    m = Image.open(TI_MARGO).convert("RGBA")
    mh = 330
    m = m.resize((int(m.width * mh / m.height), mh), Image.LANCZOS)
    img.paste(m, (W - MARGE - m.width, 400), m)
    bulle_x1 = W - MARGE - m.width - 30
    d.rounded_rectangle([MARGE, 590, bulle_x1, 720], radius=36, outline=VERT, width=6,
                        fill=(236, 252, 243))
    d.polygon([(bulle_x1 - 6, 620), (bulle_x1 + 34, 600), (bulle_x1 - 6, 680)],
              fill=(236, 252, 243))
    d.text((MARGE + 36, 624), ENCOURAGEMENTS[rang % len(ENCOURAGEMENTS)],
           font=police("arialbd.ttf", 50), fill=(20, 110, 60))

    methode(d, 770)

    # ── Les trois lignes ─────────────────────────────────────────────────────
    for k, (titre, mode) in enumerate([("1. Je regarde, puis je repasse", "modele"),
                                       ("2. Je repasse encore", "pointille"),
                                       ("3. J'écris tout seul !", "seul")]):
        haut_bande = 1110 + k * hb
        bande(d, spec, haut_bande + 72 + monte * il, il, titre, mode, haut_bande)

    # ── Le bas : comment je me sens, et le mot du maître ─────────────────────
    yb = H - 540
    d.text((MARGE, yb), "Je colorie mon smiley :", font=police("ariblk.ttf", 48), fill=NAVY)
    for k, (bouche, mot) in enumerate([("grand", "Super !"), ("sourire", "Bien"),
                                        ("droit", "Encore un peu")]):
        cx = MARGE + 110 + k * 360
        smiley(d, cx, yb + 165, 72, bouche)
        f = police("arialbd.ttf", 38)
        d.text((cx - d.textlength(mot, font=f) / 2, yb + 250), mot, font=f, fill=NAVY)
    bx0 = MARGE + 1150
    d.rounded_rectangle([bx0, yb - 10, W - MARGE, yb + 300], radius=30, outline=GRIS_LIGNE, width=5)
    d.text((bx0 + 30, yb + 10), "Le mot de mon prof :", font=police("arialbd.ttf", 42), fill=BLEU)

    d.line([(MARGE, H - 220), (W - MARGE, H - 220)], fill=GRIS_LIGNE, width=3)
    d.text((MARGE, H - 185), "eleveai.fr", font=police("ariblk.ttf", 54), fill=BLEU)
    d.text((MARGE + 320, H - 172), "Les vidéos du geste : eleveai.fr/video · classe CP",
           font=police("arialbd.ttf", 42), fill=NAVY)

    SORTIE.mkdir(parents=True, exist_ok=True)
    base = f"cahier-ecriture-{'chiffre' if chiffre else 'lettre'}-{glyphe}"
    img.save(SORTIE / f"{base}.pdf", "PDF", resolution=300)
    img.resize((W // 3, H // 3), Image.LANCZOS).save(SORTIE / f"{base}.png", "PNG")
    print(SORTIE / f"{base}.pdf")
    return img


def _enregistrer(img, base):
    SORTIE.mkdir(parents=True, exist_ok=True)
    img.save(SORTIE / f"{base}.pdf", "PDF", resolution=300)
    img.resize((W // 3, H // 3), Image.LANCZOS).save(SORTIE / f"{base}.png", "PNG")
    print(SORTIE / f"{base}.pdf")
    return img


def _glyphe(d, g, cx, base_y, il, couleur, ep, haut_max=None):
    """Un chiffre ou une lettre CURSIVE (le tracé des vidéos), centré sur cx.

    `haut_max` (px) : la lettre entière tient dedans — le « f » (5,33 interlignes
    de haut) sortait de sa case du tableau de réussite. `base_y` est alors le
    CENTRE vertical voulu, et non plus la ligne de base.
    """
    spec = spec_chiffre(int(g)) if g.isdigit() else spec_lettre(g)
    ys = [y for t in spec["traits"] for _, y in t]
    if haut_max:
        il = min(il, haut_max / (max(ys) - min(ys)))
        base_y = base_y + (max(ys) + min(ys)) / 2 * il
    xs = [x for t in spec["traits"] for x, _ in t]
    bx = cx - (min(xs) + max(xs)) / 2 * il
    tracer_lettre(d, spec, bx, base_y, il, couleur, ep)


def couverture(glyphes):
    """⭐ LA COUVERTURE À SON NOM + LE TABLEAU DE RÉUSSITE.

    Frédéric, 03/11 : « je veux qu'à la fin, elle se sente valorisée ». Un
    cahier qui porte son prénom est À ELLE ; le tableau lui montre, page après
    page, tout ce qu'elle sait déjà faire — une étoile coloriée par tracé appris.
    """
    img = Image.new("RGB", (W, H), (255, 255, 255))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([MARGE, 160, W - MARGE, 1180], radius=60, fill=JAUNE_CLAIR,
                        outline=JAUNE_BORD, width=8)
    f = police("ariblk.ttf", 120)
    t = "Mon cahier"
    d.text(((W - d.textlength(t, font=f)) / 2, 230), t, font=f, fill=ORANGE)
    f2 = police("ariblk.ttf", 90)
    t = "d'écriture"
    d.text(((W - d.textlength(t, font=f2)) / 2, 380), t, font=f2, fill=NAVY)
    m = Image.open(TI_MARGO).convert("RGBA")
    mh = 420
    m = m.resize((int(m.width * mh / m.height), mh), Image.LANCZOS)
    img.paste(m, (W - MARGE - m.width - 40, 640), m)
    d.text((MARGE + 80, 640), "Ce cahier appartient à :", font=police("arialbd.ttf", 60), fill=NAVY)
    d.line([(MARGE + 80, 860), (W - MARGE - m.width - 90, 860)], fill=NAVY, width=6)
    d.text((MARGE + 80, 920), "J'apprends à écrire, doucement, et je progresse !",
           font=police("arialbd.ttf", 46), fill=(20, 110, 60))

    d.text((MARGE, 1290), "Mon tableau de réussite", font=police("ariblk.ttf", 70), fill=NAVY)
    d.text((MARGE, 1390), "Quand je sais écrire un chiffre ou une lettre, je colorie son étoile.",
           font=police("arialbd.ttf", 44), fill=BLEU)
    # Une grille : 6 colonnes, une case = le glyphe cursif + une étoile.
    cols, cw, ch = 6, (W - 2 * MARGE) / 6, 290
    y0 = 1500
    for k, g in enumerate(glyphes):
        r, c = divmod(k, cols)
        x = MARGE + c * cw
        y = y0 + r * ch
        d.rounded_rectangle([x + 12, y, x + cw - 12, y + ch - 24], radius=26, outline=GRIS_LIGNE, width=4)
        _glyphe(d, g, x + cw * 0.36, y + 133, 62 if g.isdigit() else 58, BLEU, 7, haut_max=200)
        etoile(d, x + cw * 0.76, y + 130, 46, largeur=6)
    _enregistrer(img, "cahier-ecriture-couverture")
    return img


def diplome(titre, glyphes, base):
    """⭐ LE DIPLÔME : la fin d'une étape se FÊTE, elle ne se coche pas."""
    img = Image.new("RGB", (W, H), (255, 255, 255))
    d = ImageDraw.Draw(img)
    for k, c in enumerate([ORANGE, JAUNE_BORD, VERT]):
        o = 70 + k * 34
        d.rounded_rectangle([o, o, W - o, H - o], radius=70, outline=c, width=14)
    f = police("ariblk.ttf", 150)
    t = "DIPLÔME"
    d.text(((W - d.textlength(t, font=f)) / 2, 330), t, font=f, fill=ORANGE)
    f2 = police("ariblk.ttf", 70)
    t = "de la belle écriture"
    d.text(((W - d.textlength(t, font=f2)) / 2, 530), t, font=f2, fill=NAVY)
    for k in range(5):
        etoile(d, W / 2 + (k - 2) * 200, 760, 70 if k == 2 else 52, largeur=10)
    f3 = police("arialbd.ttf", 62)
    t = "Bravo"
    d.text(((W - d.textlength(t, font=f3)) / 2, 920), t, font=f3, fill=NAVY)
    d.line([(W / 2 - 700, 1130), (W / 2 + 700, 1130)], fill=NAVY, width=6)
    f4 = police("ariblk.ttf", 72)
    d.text(((W - d.textlength(titre, font=f4)) / 2, 1220), titre, font=f4, fill=(20, 110, 60))
    # Tout ce qu'il ou elle sait écrire, en cursive, en couleur.
    par_ligne = 10
    for k, g in enumerate(glyphes):
        r, c = divmod(k, par_ligne)
        n_l = min(par_ligne, len(glyphes) - r * par_ligne)
        cx = W / 2 + (c - (n_l - 1) / 2) * 190
        # ⭐ Même LIGNE DE BASE pour toutes : c'est une ligne d'écriture.
        _glyphe(d, g, cx, 1560 + r * 300, 80 if g.isdigit() else 55,
                [ORANGE, BLEU, VERT, ROSE][k % 4], 10)
    m = Image.open(TI_MARGO).convert("RGBA")
    mh = 760
    m = m.resize((int(m.width * mh / m.height), mh), Image.LANCZOS)
    img.paste(m, (int(W / 2 - m.width / 2), H - 1420), m)
    f5 = police("arialbd.ttf", 50)
    d.text((MARGE + 120, H - 560), "Le", font=f5, fill=NAVY)
    d.line([(MARGE + 210, H - 510), (MARGE + 900, H - 510)], fill=GRIS_LIGNE, width=5)
    d.text((W - MARGE - 880, H - 560), "Mon prof :", font=f5, fill=NAVY)
    d.line([(W - MARGE - 600, H - 510), (W - MARGE - 120, H - 510)], fill=GRIS_LIGNE, width=5)
    f6 = police("arialbd.ttf", 46)
    t = "Je suis fier de toi. Continue, tu progresses chaque jour !"
    d.text(((W - d.textlength(t, font=f6)) / 2, H - 400), t, font=f6, fill=(20, 110, 60))
    return _enregistrer(img, base)


def lettres_presentes():
    scenes = RACINE / "manim" / "scripts" / "cp"
    return sorted(f.stem.removeprefix("lettre_") for f in scenes.glob("lettre_[a-z].py"))


if __name__ == "__main__":
    filtre = sys.argv[1] if len(sys.argv) > 1 else None
    lettres = lettres_presentes()
    pages = []
    if not filtre or filtre == "couverture":
        pages.append(couverture(CHIFFRES + lettres))
    for rang, g in enumerate(CHIFFRES + lettres):
        if filtre and filtre != g:
            continue
        pages.append(construire(g, rang))
        # ⭐ Un diplôme à chaque étape : après les chiffres, puis à la fin.
        if not filtre and g == CHIFFRES[-1]:
            pages.append(diplome("Je sais écrire les 10 chiffres !", CHIFFRES,
                                 "cahier-ecriture-diplome-chiffres"))
    if filtre == "diplomes" or not filtre:
        d_l = diplome("Je sais écrire les lettres !", lettres, "cahier-ecriture-diplome-lettres")
        if not filtre:
            pages.append(d_l)
        else:
            diplome("Je sais écrire les 10 chiffres !", CHIFFRES, "cahier-ecriture-diplome-chiffres")
    # ⭐ LE CAHIER ENTIER EN UN PDF : un seul fichier à imprimer pour l'année.
    # ⚠️ À 300 dpi il pesait 13 Mo (et une palette réduite, essayée, fait un PDF
    # NON compressé de 500 Mo). 200 dpi suffisent à l'imprimante du collège.
    if not filtre and pages:
        pages = [p.resize((W * 2 // 3, H * 2 // 3), Image.LANCZOS) for p in pages]
        pages[0].save(SORTIE / "mon-cahier-d-ecriture-complet.pdf", "PDF", resolution=200, quality=80,
                      save_all=True, append_images=pages[1:])
        print(SORTIE / "mon-cahier-d-ecriture-complet.pdf")
