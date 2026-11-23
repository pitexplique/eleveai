# espace_droite_parametrique_short.py
# EleveAI — Maths Tle spé — short « les coefficients de t sont la direction » (9:16),
# ceinture VERTE. Micro du coach : espace_droite_parametrique.
# Paysage jumeau : espace_droite_parametrique.py (HD livré).
#
# ⭐ UNE SEULE IDÉE : dans les trois lignes, les nombres SANS t donnent un point et les
# coefficients DE t donnent la direction. ⛔ Un short ne résume pas son épisode.
#
#   · 00-accroche   : la droite dans le repère cavalière, avec son vecteur directeur ;
#   · 01-idee       : le système, puis le point en ambre et la direction en rose ;
#   · 02/02b        : question-pause (A : 3 ; −1 ; 4), 3 s ;
#   · 03-commentaire: la droite d prime — ⛔ sa réponse (−2 ; 3 ; 1) n'est ni dite ni
#                     affichée ;
#   · 04-abonne     : la fin commune.
#
# ⭐ La figure est en projection CAVALIÈRE, comme le canvas du coach
# (`lib/canvas/Repere3dCanvas.tsx`) : un élève qui voit le short puis ouvre sa question
# doit retrouver le même dessin. ⛔ Pas de `ThreeDScene` dans cette série.
#
# Voix : manim/voix/terminale-espace-droite-parametrique-short.json (débit −6).
# Mesure : python -X utf8 manim/scripts/terminale/espace_mesure_short.py E3
# Dry run : AUDIT=1 BORDS=1 PYTHONIOENCODING=utf-8 python -X utf8 -m manim render --dry_run -qh -r 1080,1920 manim/scripts/terminale/espace_droite_parametrique_short.py EspaceDroiteParametriqueShort
# Planche : PYTHONIOENCODING=utf-8 python -X utf8 -m manim render -ql -r 1080,1920 --disable_caching manim/scripts/terminale/espace_droite_parametrique_short.py EspaceDroiteParametriqueShort -o eleveai-maths-terminale-espace-droite-parametrique-short --media_dir manim/scripts/terminale/media-espace-droite-parametrique-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import numpy as np  # noqa: E402

from espace_commun_short import *  # noqa: E402,F403

# ── LES DONNÉES, au niveau du module, vérifiées à l'import ──────────────────
# L'exemple de l'écran 01 : x = 1 + 2t, y = 2 − t, z = 3t
POINT_1, DIR_1 = (1, 2, 0), (2, -1, 3)
# La question : x = 2 + 3t, y = −t, z = 1 + 4t
POINT_Q, DIR_Q = (2, 0, 1), (3, -1, 4)
BONNE = 0                                   # A — tirage des shorts (B C A C A B)
# A : le directeur · B : le POINT (les nombres sans t) · C : le signe oublié
CHOIX = (DIR_Q, POINT_Q, (3, 1, 4))
assert CHOIX[BONNE] == DIR_Q
assert len(set(CHOIX)) == 3                                  # les trois choix s'excluent
# ⛔ Le leurre C doit être un VRAI leurre : non colinéaire au directeur, sinon il serait
# juste. 3/3 = 1 mais 1/(−1) = −1 : il ne l'est pas.
assert not all(CHOIX[2][i] * DIR_Q[j] == CHOIX[2][j] * DIR_Q[i]
               for i in range(3) for j in range(3))
assert DIR_1 == (2, -1, 3) and POINT_1 == (1, 2, 0)


def systeme_lignes(e, point, direction, nom="", fs=26, couleur=WHITE, c_dir=None):
    """Les trois lignes d'une représentation paramétrique, écrites comme au tableau.
    ⭐ Elles passent par `ligne_param` du socle paysage (importé par
    `espace_ecrans`) : « y = 2 − t » et non « y = 2 − 1t », et le vrai signe − (U+2212).
    ⛔ Un épisode qui réécrit ses nombres à la main en perd un au quatrième écran."""
    from espace_ecrans import ligne_param
    out = []
    for i, v in enumerate("xyz"):
        s = ligne_param(v, point[i], direction[i])
        if i == 0 and nom:
            s = f"{nom} : {s}"
        out.append(e.t(s, fs, c_dir or couleur, larg=None))
    return out


def pieces(e):
    """BÂTIT et POSITIONNE les six écrans, sans rien jouer."""
    p = {}
    titre, badge = e.entete_blocs("Droites")

    # ── 00 : la droite dans le repère, et ce qui est écrit dedans ───────────
    a1 = e.blocs_phrase("Une représentation paramétrique, c'est trois lignes.", 1.72, 26)
    r, axes = e.repere(o=(0.0, 0.0), u=0.46, portee=3)
    # ⚠️ LA DROITE NE PART PAS DE L'ORIGINE, et c'est mesuré ailleurs dans la série :
    # une droite qui porte (1 ; 0 ; 0) depuis l'origine se confond trait pour trait avec
    # l'axe des x (épisode 5). Celle-ci part de A (1 ; 2 ; 0) et sa direction a ses trois
    # coordonnées non nulles : aucun axe ne la double.
    # ⚠️ LE MORCEAU DE DROITE S'ARRÊTE AVANT L'AXE DES y, et c'est une cote mesurée :
    # à t = −0,45 la droite redescend sous le plan du sol et passe à **0,038** du nom
    # « y » de l'axe. C'est le défaut de l'épisode 11 — « les noms des axes n'étaient
    # comparés à RIEN » — et il n'a été vu ni au dry run ni à la planche.
    # ⚠️⚠️ LE « y » DE L'AXE EST ÉCARTÉ, et il a fallu une recherche en grille pour le
    # croire : la droite ET le vecteur directeur passent tous les deux à **0,038** de
    # lui. Allonger l'axe (le remède que `espace3d.py` recommande) ne sert à RIEN ici —
    # mesuré à portée 4 : 0,057, et à portée 5 : **0,008**, c'est-à-dire pire, parce que
    # le nom suit la direction de fuite, qui est justement celle de la droite.
    # ⭐ Grille au pas de 0,05 entre −0,7 et +0,7, à plus de 0,14 de tout trait, classée
    # par distance à la place d'origine : 226 positions libres, la plus proche à 0,14 en
    # (−0,10 ; +0,10) — 0,167 du trait le plus proche.
    axes[3].shift(np.array([-0.10, 0.10, 0.0]))        # axes[3] : le nom « y »
    dte = r.droite(POINT_1, DIR_1, t0=-0.12, t1=0.75, couleur=C_DROITE, sw=5)
    # ⚠️ Le nom du point est poussé plus loin que le `decal` par défaut (0,26) : à sa
    # place habituelle il est à 0,016 du fût de la droite, qui part justement de lui.
    pA = r.point(*POINT_1, nom="A", couleur=C_REGARD, decal=(-1.9, -1.9), fs=24)
    e.sans_audit(pA)                     # « A » est un NOM, pas un nombre dit
    # ⛔⛔ LE VECTEUR DIRECTEUR N'EST PAS ÉTIQUETÉ, pour la même raison qu'à l'écran 01
    # du short des vecteurs : mesuré à **0,069** de son propre fût, et la grille ne
    # laisse pas 0,55 de bande libre entre la droite et l'axe des y. ⭐ La voix dit
    # « une direction », et la COULEUR relie la flèche rose à « 2 ; −1 ; 3 », rose lui
    # aussi, à l'écran suivant (remède de l'écran 09b de l'épisode 8).
    vu = r.vecteur(POINT_1, tuple(a + b for a, b in zip(POINT_1, DIR_1)),
                   couleur=C_VECTEUR2, sw=6)
    fig = VGroup(axes, dte, pA, vu)
    fig.move_to(P(-0.10, -0.08))
    a2 = e.blocs_phrase("Et tout y est écrit : un point, et une direction.", -2.20, 26, C_REGARD)
    p["00-accroche"] = [("titre", titre), ("badge", badge), ("accroche", a1),
                        ("figure", fig), ("un point, une direction", a2)]

    # ── 01 : le système, le point, la direction ─────────────────────────────
    syst = e.pose(VGroup(*systeme_lignes(e, POINT_1, DIR_1, fs=28)).arrange(
        DOWN, buff=0.12, aligned_edge=LEFT), 1.80)
    ph1 = e.blocs_phrase("Les nombres sans t donnent un point de la droite :", 0.58, 24, GREY_A)
    t1 = e.pose(e.trip(POINT_1, 30, C_REGARD), -0.30)
    ph2 = e.blocs_phrase("Les coefficients de t, avec leurs signes, donnent le vecteur "
                         "directeur :", -1.30, 24, GREY_A)
    t2 = e.pose(e.trip(DIR_1, 30, C_VECTEUR2), -2.40)
    p["01-idee"] = [("titre", titre), ("badge", badge), ("le système", syst),
                    ("sans t", ph1), ("le point", t1), ("coefficients de t", ph2),
                    ("la direction", t2)]

    # ── 02 / 02b : la question-pause ────────────────────────────────────────
    # ⭐ 24/24 vient d'un balayage hors rendu : c'est le plus grand couple qui garde
    # toute police au-dessus de 22 px avec CINQ lignes de question (les trois du système
    # et les deux de la consigne).
    fsq, fsc = 24, 24
    q_lignes = systeme_lignes(e, POINT_Q, DIR_Q, nom="d", fs=fsq)
    q_lignes += e.lignes("Vecteur directeur de d ?", fsq)[0]
    choix = [e.trip(t, fsc, WHITE) for t in CHOIX]
    tete, q, cartes, pause, rebours = e.q_tete(q_lignes, choix, fs_q=fsq, fs_c=fsc)
    p["02-question"] = [("titre", titre), ("badge", badge), ("tête", tete),
                        ("rebours", rebours), ("question", q), ("cartes", cartes),
                        ("pause", pause)]
    # ⚠️ L'écran de réponse hérite : seules la tête et la question s'effacent, et la
    # place libérée au-dessus des cartes est la seule disponible en 9:16.
    haut = float(cartes.get_top()[1])
    r1 = e.pose(e.trip(DIR_Q, 32, VERT_OK), haut + 1.55)
    cadre_r1 = SurroundingRectangle(r1, color=VERT_OK, buff=0.12, stroke_width=3)
    r2 = e.blocs_phrase("un point, pas une direction.", haut + 0.60, 24, "#dc2626")
    p["02b-reponse"] = [("titre", titre), ("badge", badge), ("cartes", cartes),
                        ("la bonne réponse", VGroup(r1, cadre_r1)), ("le leurre B", r2)]

    # ── 03 : la question en commentaire ─────────────────────────────────────
    et = e.pose(e.t("À toi !", 38, JAUNE_TITRE, larg=None), 3.50)
    syst3 = e.pose(VGroup(*systeme_lignes(e, (4, 0, -1), (-2, 3, 1), nom="d'", fs=28)).arrange(
        DOWN, buff=0.12, aligned_edge=LEFT), 1.55)
    dq = e.blocs_phrase("Quel est un vecteur directeur ?", -0.55, 30, C_REGARD)
    appel = e.appel_blocs(-2.05)
    p["03-commentaire"] = [("à toi", et), ("le système", syst3), ("question", dq),
                           ("appel", appel)]
    return p


class EspaceDroiteParametriqueShort(ShortEspace):
    fichier_marques = "espace_droite_parametrique_short_marques.json"
    nom_voix = "terminale-espace-droite-parametrique-short"

    def construct(self):
        p = pieces(self)
        titre, badge = p["00-accroche"][0][1], p["00-accroche"][1][1]
        a1, fig, a2 = (x[1] for x in p["00-accroche"][2:])

        # ── 00 ──────────────────────────────────────────────────────────────
        # ⛔ Titre AJOUTÉ avant la voix (mesuré E1 : un `Write` de 0,5 s met la première
        # ligne de la phrase 0,50 s en retard sur son propre mot).
        self.margo_bas()
        self.add(titre, badge)
        self.dire("00-accroche")
        self.jouer_phrase(a1, "Une représentation paramétrique, c'est trois lignes.")
        axes, dte, pA, vu = fig
        self.play(Create(axes), run_time=0.4)
        self.play(Create(dte), FadeIn(pA), run_time=0.6)
        self.play(GrowArrow(vu[0]), run_time=0.5)
        self.jouer_phrase(a2, "Et tout y est écrit : un point, et une direction.")
        self.attendre_voix(marge=0.25)

        # ── 01 ──────────────────────────────────────────────────────────────
        self.dire("01-idee")
        syst, ph1, t1, ph2, t2 = (x[1] for x in p["01-idee"][2:])
        self.play(FadeOut(VGroup(a1, fig, a2)), run_time=0.25)
        # ⭐ Chaque ligne du système attend d'avoir été FINIE de dire : posée à son
        # premier mot, « x égale 1 plus 2 t » met son « 2t » à l'écran avant qu'il soit
        # prononcé — les 35 AUDIT-AVANCE de l'épisode 3 venaient exactement de là.
        for ligne, extrait in zip(syst, ("x égale 1 plus 2 t", "y égale 2 moins t",
                                         "z égale 3 t")):
            self.au_fin(extrait)
            self.play(FadeIn(ligne, shift=RIGHT * 0.1), run_time=0.3)
        self.jouer_phrase(ph1, "Les nombres sans t donnent un point de la droite :")
        self.au_fin("1, 2, 0")
        self.play(FadeIn(t1, scale=1.2), run_time=0.35)
        self.jouer_phrase(ph2, "Les coefficients de t, avec leurs signes, donnent le "
                               "vecteur directeur :")
        self.au_fin("2, moins 1, 3")
        self.play(FadeIn(t2, scale=1.2), run_time=0.35)
        self.insister(t2, 1.08)
        self.attendre_voix(marge=0.3)

        # ── 02 ──────────────────────────────────────────────────────────────
        self.dire("02-question")
        t0 = self.renderer.time
        tete, rebours, q, cartes, pause = (x[1] for x in p["02-question"][2:])
        self.play(FadeOut(VGroup(syst, ph1, t1, ph2, t2)), run_time=0.3)
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.12), run_time=0.3)
        for ligne, extrait in zip(q[:3], ("x égale 2 plus 3 t", "y égale moins t",
                                          "z égale 1 plus 4 t")):
            self.au_fin(extrait)
            self.play(FadeIn(ligne, shift=RIGHT * 0.1), run_time=0.25)
        self.au_mot("Vecteur directeur")
        self.play(FadeIn(q[3:], shift=UP * 0.08), run_time=0.3)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "02-question", t0, BONNE)

        # ── 02b ─────────────────────────────────────────────────────────────
        self.dire("02b-reponse")
        r1g, r2 = p["02b-reponse"][3][1], p["02b-reponse"][4][1]
        ok = self.q_reponse(cartes, BONNE, pause, rebours)
        self.play(FadeOut(VGroup(tete, q)), run_time=0.25)
        self.au_fin("3, moins 1 et 4")
        self.play(FadeIn(r1g[0], scale=1.2), Create(r1g[1]), run_time=0.4)
        self.jouer_phrase(r2, "un point, pas une direction.")
        self.play(Indicate(cartes[1], color="#dc2626", scale_factor=1.05), run_time=0.5)
        self.attendre_voix(marge=0.3)

        # ── 03 ──────────────────────────────────────────────────────────────
        self.dire("03-commentaire")
        et, syst3, dq, appel = (x[1] for x in p["03-commentaire"])
        self.play(FadeOut(VGroup(cartes, r1g, r2, ok, titre, badge)), run_time=0.3)
        self.au_mot("À toi")
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        for ligne, extrait in zip(syst3, ("x égale 4 moins 2 t", "y égale 3 t",
                                          "z égale moins 1 plus t")):
            self.au_fin(extrait)
            self.play(FadeIn(ligne, shift=RIGHT * 0.1), run_time=0.3)
        self.jouer_phrase(dq, "Quel est un vecteur directeur ?")
        self.jouer_appel(appel)
        self.attendre_voix(marge=0.5)

        # ── 04 ──────────────────────────────────────────────────────────────
        self.fin_short("04-abonne", [et, syst3, dq, appel])
