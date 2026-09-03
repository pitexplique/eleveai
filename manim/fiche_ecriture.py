# Fiches d'écriture du CP — une feuille A4 par lettre, à imprimer.
#
# ── POURQUOI CE FICHIER EXISTE (03/09/2026) ───────────────────────────────────
# ⭐⭐ Frédéric, après avoir vu les vidéos : « c'est super mais je viens de me
# rendre compte qu'il faut des fiches d'écriture ». Et il a raison : une vidéo
# montre le geste, elle ne le fait pas faire. L'enfant apprend à écrire avec un
# crayon dans la main, pas en regardant. La feuille est la moitié manquante.
#
# ⭐ MÊMES POINTS DE CONTRÔLE QUE LES VIDÉOS. La lettre de la feuille est
# EXACTEMENT celle du film : mêmes Bézier, même point de départ, même sens.
# Une feuille qui montrerait un « a » un peu différent apprendrait à l'enfant
# que le modèle change selon le support — c'est précisément ce qu'il ne faut pas.
# 👉 Les tracés viennent de `manim/miniature.py` (table `TRACES`), qui est déjà
# le miroir PIL des scripts Manim. Pas de troisième copie.
#
# ⛔ PAS DE PASSAGE PAR CHROME. `scripts/build-fiches-pdf.ts` rend une PAGE du
# site ; ici il n'y a pas de page, et il n'en faut pas : une feuille de réglure
# est de la géométrie pure. PIL écrit le PDF directement, sans serveur, sans
# navigateur, sans dépendance nouvelle.
#
# ── USAGE ─────────────────────────────────────────────────────────────────────
#   python manim/fiche_ecriture.py          → toutes les lettres connues
#   python manim/fiche_ecriture.py o        → seulement le « o »
#
# Sortie : public/fiches-ecriture/eleveai-francais-cp-ecriture-<x>.pdf

import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

sys.path.insert(0, str(Path(__file__).resolve().parent))
from miniature import TRACES, _bezier  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
FONTS = Path("C:/Windows/Fonts")
TI_MARGO = RACINE / "public" / "cahier-vacances" / "ti-margo.png"
SORTIE = RACINE / "public" / "fiches-ecriture"

# ── A4 à 300 points par pouce ────────────────────────────────────────────────
# ⚠️ 300 dpi et pas 150 : la feuille est FAITE pour être imprimée, et un tracé
# en pointillé à 150 dpi bave à l'impression.
W, H = 2480, 3508
MARGE = 190

# La charte, en RVB (les constantes Manim ne servent qu'à l'écran).
NAVY = (7, 42, 74)
BLEU = (37, 99, 175)
GRIS_LIGNE = (176, 196, 222)
GRIS_MODELE = (198, 208, 220)
VERT = (22, 163, 90)
JAUNE = (245, 176, 0)

# ⭐ INTERLIGNE DE 150 px ≈ 12 mm, bien plus grand qu'un Seyès du commerce (4 mm).
# Au CP la main n'est pas encore précise : lui demander de tenir dans 4 mm, c'est
# lui faire rater un geste qu'il maitrise. La taille se réduira au CE1.
IL = 150
ESPACE_LETTRE = 2.30  # en interlignes, d'un départ de lettre au suivant


def police(nom, taille):
    return ImageFont.truetype(str(FONTS / nom), taille)


def points_lettre(spec, bx, by, il):
    """Les points du chemin, dans le repère de la feuille (y vers le bas)."""
    def P(x, y):
        return (bx + x * il, by - y * il)

    cur = spec["depart"]
    pts = [P(*cur)]
    for c1, c2, fin in spec["courbes"]:
        pts += _bezier(P(*cur), P(*c1), P(*c2), P(*fin))
        cur = fin
    return pts


def tracer_lettre(d, spec, bx, by, il, couleur, epaisseur, pointille=False):
    """Trace la lettre — pleine, ou en pointillé pour être repassée.

    ⭐ LE POINTILLÉ EST FAIT DE SEGMENTS DU CHEMIN, pas d'un motif de trait.
    PIL ne sait pas pointiller une courbe ; on découpe la liste des points et on
    n'en dessine qu'un morceau sur deux. Le pointillé suit donc exactement la
    lettre, y compris dans ses virages.
    """
    pts = points_lettre(spec, bx, by, il)
    if pointille:
        # ⚠️ TIRETS COURTS, TROU COURT. Premier essai : 7 points dessinés, 7
        # sautés — la lettre partait en miettes éparses, l'enfant ne voyait plus
        # de chemin à suivre. Un pointillé d'écriture doit se LIRE comme un
        # trait, il n'est interrompu que pour laisser passer le crayon.
        tiret, trou = 5, 4
        i = 0
        while i < len(pts) - 1:
            bout = pts[i : min(i + tiret, len(pts))]
            if len(bout) > 1:
                d.line(bout, fill=couleur, width=epaisseur, joint="curve")
            i += tiret + trou
    else:
        d.line(pts, fill=couleur, width=epaisseur, joint="curve")
    if spec["point"]:
        px, py = points_lettre({"depart": spec["point"], "courbes": []}, bx, by, il)[0]
        r = max(6, epaisseur // 2 + 4)
        if pointille:
            d.ellipse([px - r, py - r, px + r, py + r], outline=couleur, width=3)
        else:
            d.ellipse([px - r, py - r, px + r, py + r], fill=couleur)


def bande(d, spec, y_base, titre, mode, nb):
    """Une bande d'écriture : trois interlignes, sa consigne, et son contenu.

    ⭐ TROIS INTERLIGNES, JAMAIS DEUX — l'arbitrage de Frédéric pour les vidéos
    vaut ici : le modèle, le pointillé à repasser, et une ligne où l'enfant
    écrit seul. La feuille reprend la même réglure que le film.
    """
    x0, x1 = MARGE, W - MARGE
    d.text((x0, y_base - 3 * IL - 66), titre, font=police("arialbd.ttf", 46), fill=BLEU)
    for k in range(4):
        y = y_base - k * IL
        forte = k == 0
        d.line([(x0, y), (x1, y)], fill=NAVY if forte else GRIS_LIGNE,
               width=6 if forte else 3)

    # ⚠️ On décale du départ de la lettre : les lettres ne commencent pas toutes
    # au même endroit de leur boite (le « i » part à −0,44, le « a » à 0,00).
    dep_x = spec["depart"][0]
    bx = x0 + 110 + abs(min(dep_x, -0.84)) * IL
    # ⛔ LE NOMBRE DE LETTRES SE CALCULE, IL NE SE FIXE PAS. Écrit en dur (7), la
    # dernière sortait de la marge droite et se retrouvait coupée par le bord de
    # la feuille — visible seulement une fois la page rendue.
    largeur_lettre = 1.40 * IL  # la plus large des lettres connues, avec sa sortie
    nb = min(nb, int((x1 - bx - largeur_lettre) // (ESPACE_LETTRE * IL)) + 1)
    for _ in range(nb):
        if mode == "modele":
            tracer_lettre(d, spec, bx, y_base, IL, BLEU, 14)
            dx, dy = points_lettre(spec, bx, y_base, IL)[0]
            d.ellipse([dx - 17, dy - 17, dx + 17, dy + 17], fill=VERT)
        elif mode == "pointille":
            tracer_lettre(d, spec, bx, y_base, IL, GRIS_MODELE, 12, pointille=True)
            dx, dy = points_lettre(spec, bx, y_base, IL)[0]
            d.ellipse([dx - 15, dy - 15, dx + 15, dy + 15], fill=VERT)
        else:  # « seul » : rien que le point de départ
            dx, dy = points_lettre(spec, bx, y_base, IL)[0]
            d.ellipse([dx - 15, dy - 15, dx + 15, dy + 15], fill=VERT)
        bx += ESPACE_LETTRE * IL


def construire(lettre):
    spec = TRACES[lettre]
    img = Image.new("RGB", (W, H), (255, 255, 255))
    d = ImageDraw.Draw(img)

    # ── L'en-tête ────────────────────────────────────────────────────────────
    d.rounded_rectangle([MARGE, 150, MARGE + 900, 270], radius=58, fill=NAVY)
    d.text((MARGE + 52, 178), "FRANÇAIS CP · ÉCRITURE",
           font=police("ariblk.ttf", 52), fill=(255, 255, 255))
    d.text((MARGE, 320), f"J'écris la lettre {lettre}",
           font=police("ariblk.ttf", 132), fill=NAVY)
    d.text((MARGE, 486), "en cursive · je repasse, puis j'écris tout seul",
           font=police("arialbd.ttf", 52), fill=BLEU)

    # ⭐ LA LIGNE DU PRÉNOM. Une feuille d'écriture sans prénom ne revient pas à
    # son propriétaire — et l'écrire est le premier exercice d'écriture de
    # l'année.
    # ⚠️ ELLE MONTE À CÔTÉ DU BADGE, PAS À CÔTÉ DU TITRE : « J'écris la lettre a »
    # en corps 132 court jusqu'à x≈1425, et « Prénom : » posé à 1390 tombait
    # dessus. Le bandeau, lui, s'arrête à 1090.
    d.text((1460, 172), "Prénom :", font=police("arialbd.ttf", 56), fill=NAVY)
    d.line([(1710, 252), (W - MARGE, 252)], fill=GRIS_LIGNE, width=5)

    # ⚠️ TI-MARGO REMONTE ET RÉTRÉCIT : à 330 px posé en 470, il descendait
    # jusqu'à 800 et se posait SUR la réglure de la première bande, dont la
    # consigne commence à 664.
    m = Image.open(TI_MARGO).convert("RGBA")
    h = 275
    m = m.resize((int(m.width * h / m.height), h), Image.LANCZOS)
    img.paste(m, (W - MARGE - m.width, 330), m)

    # ── Les quatre bandes ────────────────────────────────────────────────────
    # ⭐ La progression est celle de la classe : je REGARDE, je REPASSE deux
    # fois, puis j'écris SEUL. La dernière bande n'a que les points de départ —
    # c'est la seule qui dise vraiment si le geste est acquis.
    y = 1180
    bande(d, spec, y, "1. Je regarde le modèle", "modele", 5)
    bande(d, spec, y + 620, "2. Je repasse sur les pointillés", "pointille", 7)
    bande(d, spec, y + 1240, "3. Je repasse encore", "pointille", 7)
    bande(d, spec, y + 1860, "4. J'écris tout seul, en partant du point vert",
          "seul", 7)

    # ── Le pied ──────────────────────────────────────────────────────────────
    d.line([(MARGE, H - 260), (W - MARGE, H - 260)], fill=GRIS_LIGNE, width=3)
    d.text((MARGE, H - 220), "eleveai.fr", font=police("ariblk.ttf", 58), fill=BLEU)
    d.text((MARGE + 340, H - 208),
           "Frédéric Lacoste — La Réunion", font=police("arialbd.ttf", 46), fill=NAVY)

    # ⭐ RANGÉ PAR OBJET, PAS PAR MATIÈRE (arbitrage du 03/09). Un parent tape
    # « fiche écriture chiffre 3 », jamais « fiche maths écriture » : le chiffre
    # rangé sous `maths/` serait dans le seul dossier où personne ne le cherche.
    # Les familles à venir : majuscules/, chiffres/, nombres/, mots/, ailleurs/.
    dossier = SORTIE / "lettres"
    dossier.mkdir(parents=True, exist_ok=True)
    # ⭐ LE NOM DE FICHIER VISE LA REQUÊTE : Google indexe les PDF comme des
    # documents à part entière, et « ecriture-cursive-lettre-a-cp-a-imprimer »
    # est très exactement ce qui se tape. Cinq sites vivent déjà de cette
    # requête (professeur-o, ecriture-cp, bienenseigner…) — aucun n'a la vidéo
    # du geste à côté, c'est là qu'on passe devant.
    base = f"ecriture-cursive-lettre-{lettre}-cp-a-imprimer"
    chemin = dossier / f"{base}.pdf"
    img.save(chemin, "PDF", resolution=300)
    img.resize((W // 3, H // 3), Image.LANCZOS).save(dossier / f"{base}.png", "PNG")

    # ⭐ LA VIGNETTE DE LA VIDÉO PART AUSSI DANS public/. Le hub affiche une
    # IMAGE, jamais une iframe : une iframe YouTube tire ~1 Mo de script avant
    # même qu'on clique, et le hub doit tenir à mille fiches (Frédéric, 03/09).
    # ⚠️ On copie celle du DROITIER : la page de la lettre porte les deux mains,
    # le hub n'a la place que d'une.
    src = RACINE / "manim" / "miniatures" / "cp" / "francais" / (
        f"eleveai-francais-cp-lettre-{lettre}-droitier.png"
    )
    if src.exists():
        Image.open(src).save(dossier / f"vignette-lettre-{lettre}.png", "PNG")
    print(chemin)
    return chemin


if __name__ == "__main__":
    filtre = sys.argv[1] if len(sys.argv) > 1 else None
    for lettre in TRACES:
        if filtre and filtre != lettre:
            continue
        construire(lettre)
