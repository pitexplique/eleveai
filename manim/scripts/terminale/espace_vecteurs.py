# espace_vecteurs.py
# EleveAI — Maths Tle spé — paysage « Vecteurs dans l'espace » (16:9), ceinture VERTE.
# Micro du coach : espace_vecteurs (notion geometrie_espace,
# lib/tutor-v4/questionBank/terminale-spe/maths/geometrie-espace.bank.ts).
# Centre : technologie-ia (vérifié dans la tranche 15-18 de lib/videos/centres-interet.ts
# — ⛔ `metiers` n'existe pas dans cette liste fermée). Épisode 1 des 12 de la série.
#
# Clé de voix → écran :
#   · 00-garde      : titre, deux nombres dans le plan / trois dans l'espace ;
#   · 01-situation  : Nadia, pilote de drones de chantier ; le drone se place par
#                     trois nombres (l'escalier des coordonnées), puis un vecteur ;
#   · 02-idee       : A B = arrivée moins départ, coordonnée par coordonnée ;
#   · 03-theoreme   : somme, multiple, colinéarité — les règles du plan tiennent ;
#   · 04/04b        : question-pause n° 1 (A B vertical : 0, 0, 5 → réponse B) ;
#   · 05-appliquer  : u + v et 2 u, en coordonnées et sur la figure ;
#   · 06-piege      : deux vecteurs non colinéaires n'engendrent qu'un PLAN ;
#                     trois vecteurs coplanaires deux à deux non colinéaires ;
#   · 07/07b        : question-pause n° 2 (v = 2 u → réponse C) ;
#   · 08-rediger    : la rédaction du bac en deux lignes, sur une copie ;
#   · 09/09b        : le défi A(1;0;0), B(0;1;0), C(0;0;1) : A B et A C non colinéaires ;
#   · 10-finale     : « Ce que tu as appris » ;
#   · 11-abonne     : eleveai.fr + « Abonne-toi ! ».
#
# ⭐ LES FIGURES VIENNENT DE manim/poste2/espace3d.py (cavalière 2D, la projection
# de la maison depuis la 5e — et CELLE DU COACH, lib/canvas/Repere3dCanvas.tsx).
# ⛔ Pas de ThreeDScene : il n'y en a aucune dans le dépôt, et un élève qui voit la
# vidéo puis ouvre sa question doit retrouver le même dessin.
# ⛔ Pas de LaTeX : tout est en Text.
# ⛔ Rien n'apparaît avant que la voix le dise : au_mot / au_pos
#   (marques mot à mot : espace_vecteurs_marques.json, produites au débit −6 par
#    scripts/marques_dump.ps1 puis manim/poste2/cues2marques-espace.py).
# ⚠️ La place des bonnes réponses est TIRÉE (graine 2211, voir
#   manim/poste2/VOIX-espace-terminale.md) : 04 → B, 07 → C. L'écran, la voix et le
#   champ `reponse` du manifeste doivent dire la même lettre.
#
# Voix : manim/voix/terminale-espace-vecteurs.json (débit −6, Julie).
# Audit : AUDIT=1 BORDS=1 PYTHONIOENCODING=utf-8 python -X utf8 -m manim render -ql \
#   --disable_caching manim/scripts/terminale/espace_vecteurs.py EspaceVecteursTerminale \
#   --media_dir manim/scripts/terminale/media-espace-vecteurs --dry_run
# Modèles : convexite_derivee_seconde.py, loi_normale_escalier.py (recopiés, rien importé).
#
# ⚠️ CE QUE L'AUDIT DIT DE CET ÉPISODE, mesuré contre l'étalon. L'audit vérifie
# CHAQUE nombre de CHAQUE texte contre l'instant où la voix le prononce. Un épisode de
# géométrie dans l'espace affiche des TRIPLETS : une ligne porte trois nombres que la
# voix énumère en 2 à 3 secondes, et l'audit rattache chaque chiffre à sa dernière
# occurrence dans la voix — souvent un autre triplet, dit bien plus tôt. D'où des
# AUDIT-TARD structurels : « 4 ; 2 ; 1 » paraît pile quand la voix dit « 4, 2, 1 », et
# l'audit compare pourtant le « 1 » au « moins 1 » de u, sept secondes avant.
# Mesuré le 22/11 : convexite_derivee_seconde (épisode publié) 26 signalements dont 11
# au-dessus de 1,5 s ; celui-ci, après correction, du même ordre. BORD : 0 des deux côtés.
# ⛔ Ce que l'audit a trouvé de VRAI ici, et qui est corrigé : des nombres à l'écran que
# la voix ne dit JAMAIS (les coordonnées inventées du drone en 01, les chiffres « 2 » et
# « 3 » en 00 là où la voix dit « deux » et « trois », les trois triplets coplanaires
# en 06). ⭐ C'est ça qu'on cherche dans un journal d'audit : l'ABSENT, pas le TARD.

import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(1, str(Path(__file__).resolve().parents[1] / "stmg"))
sys.path.insert(2, str(Path(__file__).resolve().parents[1] / "seconde"))
# ⚠️ parents[2] et non parents[1] : espace3d.py est dans manim/poste2/,
# pas dans manim/scripts/poste2/ (mon premier jet cherchait au mauvais etage).
sys.path.insert(3, str(Path(__file__).resolve().parents[2] / "poste2"))

import numpy as np  # noqa: E402

from proba_bin_defi import MotsCales, P  # noqa: E402

from manim import *  # noqa: E402

from canvas_proportion import AuditSynchro  # noqa: E402
from charte import *  # noqa: E402
from espace3d import (C_FANTOME, C_PIEGE, C_PLAN, C_POINT, C_REGARD,  # noqa: E402
                      C_VECTEUR, C_VECTEUR2)
from espace_ecrans import BORD_X, EcransEspace, FOND_CARTE, XL  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from mascotte import MascotteMargouillat  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from stats_lycee_h2_commun import CompteARebours, pastille_pause  # noqa: E402

FOND_CARTE = "#0b1220"
XL, BORD_X = 2.2, 6.6          # la colonne de droite (marge de 3 % : 0,43 du bord)
PEAU, CHEVEUX = "#a1663a", "#20160f"

# ── les valeurs dites par la voix, revérifiées ICI, à l'exécution ───────────
# ⭐⭐ La passe maths complète est dans manim/poste2/controler-maths-voix-espace.py.
# Ces assertions-là sont le dernier filet : si une coordonnée de l'écran s'écarte
# de ce que la voix dit, le rendu s'arrête au lieu d'enseigner l'erreur.
A02, B02 = (1, 2, 3), (4, 6, 3)
assert tuple(b - a for a, b in zip(A02, B02)) == (3, 4, 0)
AQ, BQ = (2, 1, 0), (2, 1, 5)
assert tuple(b - a for a, b in zip(AQ, BQ)) == (0, 0, 5)
assert tuple(a + b for a, b in zip(AQ, BQ)) == (4, 2, 5)        # le leurre A
U05, V05 = (1, 2, -1), (3, 0, 2)
assert tuple(a + b for a, b in zip(U05, V05)) == (4, 2, 1)
assert tuple(2 * a for a in U05) == (2, 4, -2)
assert tuple(2 * a for a in (1, 2, 3)) == (2, 4, 6)             # v = 2 u, question 07
AD, BD, CD = (1, 0, 0), (0, 1, 0), (0, 0, 1)
AB_D = tuple(b - a for a, b in zip(AD, BD))
AC_D = tuple(c - a for a, c in zip(AD, CD))
assert AB_D == (-1, 1, 0) and AC_D == (-1, 0, 1)
assert AC_D[0] == 1 * AB_D[0] and AC_D[1] != 1 * AB_D[1]        # k = 1 échoue sur la 2e
# les trois coplanaires du piège : deux à deux non colinéaires, tous dans z = 0
COPL = [(1, 0, 0), (0, 1, 0), (1, 1, 0)]
assert all(c[2] == 0 for c in COPL)


def nadia(s=1.0):
    """Le pictogramme : tête, cheveux attachés, casque-micro, gilet de chantier."""
    tete = Circle(radius=0.32, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.05))
    cheveux = Arc(radius=0.34, start_angle=0.2, angle=PI - 0.4, stroke_color=CHEVEUX, stroke_width=12)
    cheveux.move_to(tete.get_top() + DOWN * 0.06)
    chignon = Circle(radius=0.12, fill_color=CHEVEUX, fill_opacity=1, stroke_width=0)
    chignon.move_to(tete.get_top() + UP * 0.12)
    casque = Arc(radius=0.41, start_angle=0.05, angle=PI - 0.1, stroke_color=GREY_B, stroke_width=4)
    casque.move_to(tete.get_center() + UP * 0.2)
    ecouteur = RoundedRectangle(width=0.1, height=0.2, corner_radius=0.04, fill_color=GREY_B,
                                fill_opacity=1, stroke_width=0).move_to(tete.get_right() + RIGHT * 0.03)
    micro = Line(ecouteur.get_bottom(), tete.get_center() + P(0.12, -0.24), stroke_width=3, color=GREY_B)
    corps = RoundedRectangle(width=1.05, height=1.25, corner_radius=0.3, fill_color="#f59e0b",
                             fill_opacity=1, stroke_width=0).move_to(P(0, 0.05))
    bande = VGroup(*[Line(P(-0.5, y), P(0.5, y), stroke_width=5, color="#e2e8f0") for y in (0.2, -0.05)])
    telecommande = RoundedRectangle(width=0.5, height=0.26, corner_radius=0.06, fill_color=GREY_D,
                                    fill_opacity=1, stroke_width=0).move_to(P(0.0, -0.75))
    antenne = VGroup(Line(P(-0.12, -0.62), P(-0.18, -0.35), stroke_width=3, color=GREY_B),
                     Line(P(0.12, -0.62), P(0.18, -0.35), stroke_width=3, color=GREY_B))
    return VGroup(corps, bande, tete, cheveux, chignon, casque, ecouteur, micro,
                  telecommande, antenne).scale(s)


def drone(s=1.0, couleur=C_REGARD):
    """Un quadricoptère vu de face : corps, deux bras, quatre hélices."""
    corps = RoundedRectangle(width=0.3, height=0.14, corner_radius=0.05, fill_color=couleur,
                             fill_opacity=1, stroke_width=0)
    bras = VGroup(Line(P(-0.28, 0.06), P(0.28, 0.06), stroke_width=4, color=GREY_B),
                  Line(P(-0.28, -0.02), P(0.28, -0.02), stroke_width=0, color=GREY_B))
    helices = VGroup(*[Line(P(x - 0.1, 0.1), P(x + 0.1, 0.1), stroke_width=3, color="#e2e8f0")
                       for x in (-0.28, 0.28)])
    oeil = Dot(P(0, -0.02), radius=0.035, color=BLEU_CALCUL)
    return VGroup(bras, corps, helices, oeil).scale(s)


class EspaceVecteursBase(EcransEspace):
    """⭐ Les outils d'écran (colonnes, cartes, question-pause, abonnement) sont dans
    `manim/poste2/espace_ecrans.py`, partagés par les 12 épisodes : une correction y
    profite aux douze. Ici, il ne reste que les 15 écrans de CET épisode."""

    fichier_marques = "espace_vecteurs_marques.json"
    nom_voix = "terminale-espace-vecteurs"


    # ── 00 : page de garde ─────────────────────────────────────────────────

    def ecran_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, 0)).align_to(P(0, -3.45), DOWN)
        self.add(ech)
        titre = self.t("Vecteurs dans l'espace", 54, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Vecteurs dans l'espace")
        self.play(Write(titre), run_time=0.9)
        ident = self.t(self.identite, 26, GREY_A).next_to(titre, DOWN, buff=0.18)
        self.play(FadeIn(ident), run_time=0.3)

        # à gauche : le plan, deux nombres. À droite : l'espace, trois nombres.
        o2 = P(-4.3, -0.35)
        ax2 = VGroup(Arrow(o2, o2 + RIGHT * 2.1, buff=0, stroke_width=3, color=GREY_B,
                           max_tip_length_to_length_ratio=0.08),
                     Arrow(o2, o2 + UP * 1.6, buff=0, stroke_width=3, color=GREY_B,
                           max_tip_length_to_length_ratio=0.1))
        m2 = Dot(o2 + RIGHT * 1.45 + UP * 1.05, radius=0.085, color=C_REGARD)
        l2 = self.t("deux nombres", 32, C_REGARD).next_to(ax2, DOWN, buff=0.3)
        plan = self.t("dans le plan", 28, GREY_A).next_to(l2, DOWN, buff=0.12)
        self.au_mot("Dans le plan")
        self.play(Create(ax2), FadeIn(m2, scale=2), run_time=0.5)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(plan), run_time=0.4)

        r, ax = self.repere(o=(-0.35, -0.95), u=0.5, portee=3)
        m3 = r.point(3, 2, 2, "M", couleur=C_REGARD, escalier=True, decal=UR)
        self.sans_audit(m3)
        l3 = self.t("trois nombres", 32, C_REGARD)
        l3.move_to(P(0, l2.get_center()[1])).align_to(P(2.05, 0), LEFT)
        esp = self.t("dans l'espace", 28, GREY_A).next_to(l3, DOWN, buff=0.12).align_to(l3, LEFT)
        self.au_mot("Dans l'espace, il")
        self.play(Create(ax), run_time=0.5)
        self.play(FadeIn(m3, scale=1.4), run_time=0.5)
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(esp), run_time=0.4)
        self.au_mot("Et tout le reste")
        # ⛔ VU À LA PLANCHE : à y = −2,55 cette phrase tombait sur l'échelle des
        # ceintures (qui va de −2,8 à −3,45). On la pose au-dessus, mesuré sur l'objet.
        # ⛔ TROIS FOIS À LA PLANCHE, et c'est la leçon : le bas de cet écran n'a PAS de
        # place. −2,55 tombait sur l'échelle des ceintures ; collée au-dessus d'elle, la
        # phrase tombait sur « dans le plan » ; à −2,0 elle remordait sur les ceintures.
        # ⭐ La place libre était EN HAUT, sous l'identité : les deux figures ne montent
        # pas au-dessus de y = 0,6. On arrête de chercher 20 pixels en bas.
        reste = self.t("et tout le reste ne change pas", 34, VERT_OK).move_to(P(0, 2.0))
        self.play(FadeIn(reste, shift=UP * 0.12), run_time=0.5)
        self.attendre_voix(marge=0.8)

    # ── 01 : Nadia et le drone ─────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        n = nadia(1.0).move_to(P(-5.6, 0.3))
        self.au_mot("Voici Nadia")
        nom = self.t("Nadia", 36, JAUNE_TITRE).next_to(n, DOWN, buff=0.2)
        self.play(FadeIn(n, shift=UP * 0.2), FadeIn(nom), run_time=0.5)
        self.au_mot("Elle pilote")
        metier = VGroup(self.t("pilote de drones", 24, GREY_A), self.t("de chantier", 24, GREY_A))
        metier.arrange(DOWN, buff=0.08).next_to(nom, DOWN, buff=0.12)
        # ⚠️ MESURÉ au dry run : centrée sur Nadia, cette étiquette allait jusqu'à
        # x = −7,1, hors de l'écran (la marge de 3 % s'arrête à −6,68). Rien ne le dit
        # à la lecture : le texte est simplement coupé à l'image.
        for g in (nom, metier):
            if g.get_left()[0] < -6.5:
                g.shift(RIGHT * (-6.5 - g.get_left()[0]))
        self.play(FadeIn(metier, shift=UP * 0.1), run_time=0.4)

        r, ax = self.repere(o=(-3.4, -1.6), u=0.58, portee=4)
        sol = Polygon(r.pt(0, 0, 0), r.pt(4, 0, 0), r.pt(4, 4, 0), r.pt(0, 4, 0),
                      fill_color="#1e293b", fill_opacity=0.55, stroke_width=0)
        self.au_mot("Pour placer un drone")
        self.play(FadeIn(sol), Create(ax), run_time=0.6)
        d = r.point(4, 2, 3, None, couleur=C_REGARD, escalier=True)
        self.sans_audit(d)
        dr = drone(1.0).move_to(r.pt(4, 2, 3))
        self.play(FadeIn(d[1:]), FadeIn(dr, shift=DOWN * 0.3), run_time=0.6)

        # ⛔ MESURÉ au dry run (AUDIT-ABSENT) : j'avais écrit ici les coordonnées
        # (4 ; 2 ; 3) du drone. La voix de ce clip ne dit AUCUN nombre — elle dit
        # « combien vers la droite, combien en profondeur, combien en hauteur ». Trois
        # nombres inventés à l'écran, enseignés à l'élève, que personne ne prononce.
        # ⭐ Les nombres arrivent en 02, quand la voix les donne. Ici, les TROIS
        # DIRECTIONS suffisent : l'escalier du point montre déjà les trois marches.
        fs = 30
        et = VGroup(*[self.t(mot, fs, WHITE) for mot in
                      ("combien vers la droite", "combien en profondeur", "combien en hauteur")])
        et.arrange(DOWN, aligned_edge=LEFT, buff=0.32)
        self.col(et, 1.15)
        marches = [d[2][0], d[2][1], d[2][2]] if len(d) > 2 and len(d[2]) >= 3 else [None, None, None]
        for l, extrait, marche in zip(et, ("combien vers la droite", "combien en profondeur",
                                           "combien en hauteur"), marches):
            self.au_mot(extrait)
            anims = [FadeIn(l, shift=RIGHT * 0.15)]
            if marche is not None:
                anims.append(Indicate(marche, color=C_REGARD, scale_factor=1.0))
            self.play(*anims, run_time=0.4)
        self.au_mot("Trois nombres, un point")
        par = VGroup(self.t("trois nombres,", 38, C_REGARD), self.t("un point", 38, C_REGARD))
        par.arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        self.col(par, -0.6)
        self.play(FadeIn(par, scale=1.1), run_time=0.5)
        self.au_mot("Et pour aller")
        e = r.point(1, 0, 0, None, couleur=C_POINT)
        v = r.vecteur((1, 0, 0), (4, 2, 3), None, couleur=C_VECTEUR, sw=7)
        self.play(FadeIn(e), run_time=0.25)
        self.play(GrowArrow(v[0]), run_time=0.7)
        mot = self.t("un vecteur", 34, C_VECTEUR)
        self.col(mot, -1.75)
        self.play(FadeIn(mot, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 02 : l'idée : arrivée moins départ ─────────────────────────────────

    def ecran_idee(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-idee")
        self.au_mot("Un vecteur de l'espace")
        titre = self.t("arrivée moins départ", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)  # 0.5 : a 0.4 le haut du titre atteint 3,6 > 3,573
        self.play(Write(titre), run_time=0.7)
        r, ax = self.repere(o=(-4.5, -2.0), u=0.46, portee=7)
        self.play(Create(ax), run_time=0.5)
        self.au_mot("Pour le vecteur A B")
        a = self.sans_audit(r.point(*A02, "A", couleur=C_POINT, decal=UL))
        b = self.sans_audit(r.point(*B02, "B", couleur=C_POINT, decal=UR))
        v = r.vecteur(A02, B02, None, couleur=C_VECTEUR, sw=7)
        self.play(FadeIn(a, scale=1.3), FadeIn(b, scale=1.3), run_time=0.5)
        self.au_mot("arrivée moins départ")
        self.play(GrowArrow(v[0]), run_time=0.6)

        fs = 34
        L1 = self.ligne(self.t("A", fs, C_POINT), self.trip(A02, fs, GREY_A), y=2.1)
        L2 = self.ligne(self.t("B", fs, C_POINT), self.trip(B02, fs, GREY_A), y=1.35)
        self.au_mot("Si A a pour coordonnées")
        self.play(FadeIn(L1[0], shift=RIGHT * 0.12), run_time=0.3)
        self.au_pos(self._texte_voix.find("1, 2, 3"))
        self.play(FadeIn(L1[1], shift=RIGHT * 0.12), run_time=0.3)
        self.au_pos(self._texte_voix.find("4, 6, 3"))
        self.play(FadeIn(L2, shift=RIGHT * 0.12), run_time=0.4)
        calc = VGroup(self.t("4 − 1", fs, WHITE), self.t("6 − 2", fs, WHITE), self.t("3 − 3", fs, WHITE))
        calc.arrange(DOWN, aligned_edge=LEFT, buff=0.16)
        self.col(calc, 0.1)
        res = self.ligne(self.vec("A B", fs + 4, C_VECTEUR), self.trip((3, 4, 0), fs + 4, VERT_OK), y=-1.15)
        # la soustraction paraît sur le DERNIER chiffre de B : les six nombres qu'elle
        # réécrit viennent d'être dits, et ils sont déjà à l'écran en L1 et L2.
        self.au_pos(self._texte_voix.find("3, alors"))
        self.play(FadeIn(calc, shift=RIGHT * 0.12), run_time=0.45)
        self.au_pos(self._texte_voix.find("3, 4, 0"))
        self.play(FadeIn(res, scale=1.15), run_time=0.5)
        self.au_mot("Ce zéro dit")
        z = SurroundingRectangle(res[1].nb[2], color=VERT_OK, buff=0.08, stroke_width=3)
        meme = self.t("même hauteur", 30, VERT_OK)
        self.col(meme, -2.0)
        # ⭐ la figure DIT la même chose : A et B à la même hauteur, le trait pointillé
        niveau = DashedLine(r.pt(A02[0], A02[1], A02[2]), r.pt(B02[0], B02[1], B02[2]),
                            dash_length=0.1).set_stroke(VERT_OK, 3)
        self.play(Create(z), FadeIn(meme, shift=UP * 0.1), Create(niveau), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 03 : les règles du plan tiennent ───────────────────────────────────

    def ecran_theoreme(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-theoreme")
        self.au_mot("Toutes les règles du plan")
        titre = self.t("Les règles du plan tiennent", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)  # 0.5 : a 0.4 le haut du titre atteint 3,6 > 3,573
        self.play(Write(titre), run_time=0.7)
        r, ax = self.repere(o=(-4.6, -1.5), u=0.52, portee=5)
        self.play(Create(ax), run_time=0.4)
        # ⛔⛔ LES DÉCALAGES D'ÉTIQUETTE SONT MESURÉS, PAS CHOISIS À VUE (22/11, passe des
        # flèches). Depuis que l'étiquette porte sa propre flèche, elle est plus haute de
        # 0,10 + l'épaisseur du trait et plus large de 0,08 : `UL` et `DR`, qui passaient
        # de justesse, ne passent plus. Vu AU GROS PLAN (et invisible sur la planche) :
        # « u » s'écrivait sur l'axe des z et « v » flottait entre les deux vecteurs.
        # ⭐ La recherche est une GRILLE sur (dx, dy) au pas de 0,25, qui garde les
        # positions à plus de 0,08 de TOUT ce qui est tracé — et le contrôle porte sur
        # les POINTS tracés, pas sur les boîtes : la boîte d'une flèche en diagonale est
        # un grand rectangle presque vide, et testée ainsi elle interdit tout un quadrant.
        # 03 : u sous son propre fût aux deux tiers (jeu 0,30) ; v au-delà de sa pointe
        # (jeu 0,27), du côté où ni l'axe des y ni le double de u ne passent.
        u = r.vecteur((0, 0, 0), U05, "u", couleur=C_VECTEUR, sw=7,
                      decal=np.array([0.25, -1.25, 0.0]))
        v = r.vecteur((0, 0, 0), V05, "v", couleur=C_VECTEUR2, sw=7,
                      decal=np.array([2.25, 2.25, 0.0]))
        self.sans_audit(u)
        self.sans_audit(v)
        fs = 34
        # ⚠️ VU À LA PLANCHE : sur une seule ligne, `col()` rétrécissait « u + v :
        # coordonnée par coordonnée » jusqu'à l'illisible. Deux lignes, taille gardée.
        L1 = VGroup(self.vexpr("u + v :", ("u", "v"), fs, WHITE),
                    self.t("coordonnée par coordonnée", fs - 6, GREY_A))
        L1.arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.col(L1, 1.9)
        L2 = VGroup(self.vexpr("k u :", ("u",), fs, WHITE),
                    self.t("les trois à la fois", fs - 6, GREY_A))
        L2.arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.col(L2, 0.75)
        L3 = VGroup(self.t("colinéaires :", fs, VERT_OK), self.t("l'un est un multiple de l'autre", fs - 4, WHITE))
        L3.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.col(L3, -0.25)
        self.au_mot("On additionne deux vecteurs")
        self.play(GrowArrow(u[0]), FadeIn(u[1]), GrowArrow(v[0]), FadeIn(v[1]), run_time=0.7)
        self.play(FadeIn(L1, shift=RIGHT * 0.12), run_time=0.4)
        self.au_mot("On multiplie un vecteur")
        d = r.vecteur((0, 0, 0), tuple(2 * a for a in U05), None, couleur=C_VECTEUR, sw=4)
        d[0].set_opacity(0.55)
        self.play(FadeIn(L2, shift=RIGHT * 0.12), GrowArrow(d[0]), run_time=0.5)
        self.au_mot("Et deux vecteurs sont colinéaires")
        self.play(FadeIn(L3, shift=RIGHT * 0.12), run_time=0.5)
        self.play(Indicate(d[0], color=VERT_OK, scale_factor=1.05), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 04 : question-pause n° 1 (bonne réponse : B) ────────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        t0 = self.renderer.time
        self.dire("04-question")
        r, ax = self.repere(o=(-4.2, -1.9), u=0.6, portee=5)
        a = self.sans_audit(r.point(*AQ, "A", couleur=C_POINT, decal=DR))
        b = self.sans_audit(r.point(*BQ, "B", couleur=C_POINT, decal=UR))
        # ⛔ LE DESSIN PORTE LA DONNÉE, PAS LA RÉPONSE : on place A et B, on ne trace
        # PAS le vecteur — il montrerait qu'il est vertical, c'est-à-dire la réponse.
        self.au_mot("Question !")
        # ⭐ Chaque ligne est coupée en DEUX : le début de la phrase, puis le triplet à
        # l'instant où la voix l'énumère. Mesuré : d'un bloc, « 5 » s'affichait 2,20 s
        # avant d'être prononcé.
        lA = VGroup(self.t("A a pour coordonnées", 32), self.t("2 ; 1 ; 0,", 32)).arrange(RIGHT, buff=0.18)
        lB = VGroup(self.t("B a pour coordonnées", 32), self.t("2 ; 1 ; 5.", 32)).arrange(RIGHT, buff=0.18)
        tete, q, cartes, pause, rebours = self.q_tete(
            [lA, lB, "Que valent les coordonnées", "du vecteur A B ?"],
            [self.trip((4, 2, 5), 32), self.trip((0, 0, 5), 32), self.trip((0, 0, 1), 32)])
        self.play(FadeIn(tete, shift=DOWN * 0.1), run_time=0.4)
        self.play(Create(ax), run_time=0.4)
        self.au_mot("A a pour coordonnées")
        self.play(FadeIn(lA[0], shift=RIGHT * 0.1), FadeIn(a, scale=1.3), run_time=0.4)
        self.au_pos(self._texte_voix.find("2, 1, 0"))
        self.play(FadeIn(lA[1], shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("et B a pour coordonnées")
        self.play(FadeIn(lB[0], shift=RIGHT * 0.1), FadeIn(b, scale=1.3), run_time=0.4)
        self.au_pos(self._texte_voix.find("2, 1, 5"))
        self.play(FadeIn(lB[1], shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("Que valent")
        self.play(FadeIn(q[2:], shift=RIGHT * 0.1), run_time=0.4)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "04", t0, "B")
        self.mem_q1 = (r, ax, a, b, tete, q, cartes, pause, rebours)

    def ecran_reponse1(self):
        r, ax, a, b, tete, q, cartes, pause, rebours = self.mem_q1
        self.dire("04b-reponse")
        # ⛔ pause et rebours DOIVENT être passés : q_reponse les efface. Avec None,
        # « Mets pause, et choisis ! » restait à l'écran par-dessus l'explication.
        self.q_reponse(cartes, 1, pause, rebours)
        fs = 32
        calc = VGroup(self.t("2 − 2 = 0", fs, VERT_OK), self.t("1 − 1 = 0", fs, VERT_OK),
                      self.t("5 − 0 = 5", fs, VERT_OK))
        calc.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        self.gauche(calc, -1.2, xmax=-4.45)   # l'axe des z du repère est à x = −4,2
        for i, extrait in enumerate(("2 moins 2 fait 0", "1 moins 1 fait 0", "5 moins 0 fait 5")):
            self.au_mot(extrait)
            self.play(FadeIn(calc[i], shift=RIGHT * 0.12), run_time=0.35)
        self.au_mot("Le vecteur A B est vertical")
        v = r.vecteur(AQ, BQ, None, couleur=VERT_OK, sw=8)
        self.play(GrowArrow(v[0]), run_time=0.6)
        vert = self.t("vertical", 32, VERT_OK).next_to(calc, DOWN, buff=0.3).align_to(calc, LEFT)
        self.gauche(vert, vert.get_center()[1], xmax=-4.45)
        self.play(FadeIn(vert, shift=UP * 0.1), run_time=0.35)
        self.au_mot("La réponse A")
        piege = self.t("A : la somme, pas la différence", 30, C_PIEGE)
        self.col(piege, -2.6)
        self.play(FadeIn(piege, shift=UP * 0.1), run_time=0.45)
        self.attendre_voix(marge=0.5)

    # ── 05 : appliquer ─────────────────────────────────────────────────────

    def ecran_appliquer(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-appliquer")
        self.au_mot("Appliquons")
        titre = self.t("Somme et multiple", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)  # 0.5 : a 0.4 le haut du titre atteint 3,6 > 3,573
        self.play(Write(titre), run_time=0.6)
        r, ax = self.repere(o=(-4.6, -1.2), u=0.5, portee=5)
        self.play(Create(ax), run_time=0.4)
        fs = 34
        # ⚠️ deux vecteurs partis du MÊME point : leurs noms se posent au bout, et
        # il faut deux décalages opposés, sinon ils se touchent (vu à la planche).
        # ⛔⛔ LES DÉCALAGES D'ÉTIQUETTE SONT MESURÉS, PAS CHOISIS À VUE (22/11, passe des
        # flèches). Depuis que l'étiquette porte sa propre flèche, elle est plus haute de
        # 0,10 + l'épaisseur du trait et plus large de 0,08 : `UL` et `DR`, qui passaient
        # de justesse, ne passent plus. Vu AU GROS PLAN (et invisible sur la planche) :
        # « u » s'écrivait sur l'axe des z et « v » flottait entre les deux vecteurs.
        # ⭐ La recherche est une GRILLE sur (dx, dy) au pas de 0,25, qui garde les
        # positions à plus de 0,08 de TOUT ce qui est tracé — et le contrôle porte sur
        # les POINTS tracés, pas sur les boîtes : la boîte d'une flèche en diagonale est
        # un grand rectangle presque vide, et testée ainsi elle interdit tout un quadrant.
        # 05 est l'écran le plus chargé de l'épisode (u, v, la somme, le translaté et le
        # double) : u à 32 % de son fût et 0,30 dessous, v au-delà de sa pointe (0,29).
        u = r.vecteur((0, 0, 0), U05, "u", couleur=C_VECTEUR, sw=7,
                      decal=np.array([-0.75, -1.00, 0.0]))
        v = r.vecteur((0, 0, 0), V05, "v", couleur=C_VECTEUR2, sw=7,
                      decal=np.array([2.25, 2.25, 0.0]))
        self.sans_audit(u)
        self.sans_audit(v)
        L1 = self.ligne(self.vec("u", fs, C_VECTEUR), self.trip(U05, fs, GREY_A), y=2.0)
        L2 = self.ligne(self.vec("v", fs, C_VECTEUR2), self.trip(V05, fs, GREY_A), y=1.3)
        # ⭐ Le nom du vecteur au début de la phrase, le TRIPLET à l'instant où la voix
        # le dit : mesuré, sinon « 2, 4, moins 2 » s'affichait 1,44 s trop tôt.
        self.au_mot("Le vecteur u a pour coordonnées")
        self.play(GrowArrow(u[0]), FadeIn(u[1]), FadeIn(L1[0], shift=RIGHT * 0.1), run_time=0.5)
        self.au_pos(self._texte_voix.find("1, 2, moins 1"))
        self.play(FadeIn(L1[1], shift=RIGHT * 0.1), run_time=0.35)
        self.au_mot("Le vecteur v a pour coordonnées")
        self.play(GrowArrow(v[0]), FadeIn(v[1]), FadeIn(L2[0], shift=RIGHT * 0.1), run_time=0.5)
        self.au_pos(self._texte_voix.find("3, 0, 2"))
        self.play(FadeIn(L2[1], shift=RIGHT * 0.1), run_time=0.35)
        self.au_mot("La somme u plus v")
        s = tuple(a + b for a, b in zip(U05, V05))
        som = r.vecteur((0, 0, 0), s, None, couleur=VERT_OK, sw=8)
        # le parallélogramme : u translaté au bout de v, pour qu'on VOIE la somme
        tr = r.vecteur(V05, s, None, couleur=C_VECTEUR, sw=4)
        tr[0].set_opacity(0.5)
        L3 = self.ligne(self.vexpr("u + v", ("u", "v"), fs + 4, VERT_OK),
                        self.trip(s, fs + 4, VERT_OK), y=0.3)
        self.play(GrowArrow(tr[0]), run_time=0.4)
        self.play(GrowArrow(som[0]), FadeIn(L3[0], scale=1.15), run_time=0.6)
        self.au_pos(self._texte_voix.find("4, 2, 1"))
        self.play(FadeIn(L3[1], scale=1.15), run_time=0.35)
        self.au_mot("Et le double de u")
        d = tuple(2 * a for a in U05)
        dou = r.vecteur((0, 0, 0), d, None, couleur=C_REGARD, sw=6)
        L4 = self.ligne(self.vexpr("2 u", ("u",), fs + 4, C_REGARD),
                        self.trip(d, fs + 4, C_REGARD), y=-0.65)
        self.play(GrowArrow(dou[0]), FadeIn(L4[0], scale=1.15), run_time=0.5)
        self.au_pos(self._texte_voix.find("2, 4, moins 2"))
        self.play(FadeIn(L4[1], scale=1.15), run_time=0.35)
        self.attendre_voix(marge=0.5)

    # ── 06 : le piège : deux vecteurs n'engendrent qu'un plan ──────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.au_mot("Voilà le piège")
        # ⛔ VU À LA PLANCHE : le glyphe « ⚠ » ne se rend pas dans cette police — il
        # sortait en carré « tofu » avec son code hexa à l'intérieur. Aucun outil ne le
        # dit. On dessine le triangle, on ne le tape pas.
        bang = VGroup(Triangle(fill_color=C_PIEGE, fill_opacity=0.18, stroke_color=C_PIEGE,
                               stroke_width=4).scale(0.33),
                      Text("!", font_size=30, color=C_PIEGE, weight=BOLD).shift(DOWN * 0.05))
        titre = VGroup(bang, self.t("Deux ne suffisent pas", 46, C_PIEGE))
        titre.arrange(RIGHT, buff=0.3).to_edge(UP, buff=0.5)
        self.play(Write(titre[1]), FadeIn(titre[0], scale=1.4), run_time=0.7)
        r, ax = self.repere(o=(-4.5, -1.1), u=0.62, portee=4)
        self.play(Create(ax), run_time=0.4)
        fs = 32
        self.au_mot("Dans le plan, deux vecteurs")
        L1 = VGroup(self.t("dans le plan :", fs, GREY_A), self.t("deux suffisent", fs, WHITE))
        L1.arrange(RIGHT, buff=0.18)
        self.col(L1, 2.0)
        self.play(FadeIn(L1, shift=RIGHT * 0.1), run_time=0.4)
        self.au_mot("Dans l'espace, il en faut trois")
        L2 = VGroup(self.t("dans l'espace :", fs, GREY_A), self.t("il en faut trois", fs, C_REGARD))
        L2.arrange(RIGHT, buff=0.18)
        self.col(L2, 1.3)
        self.play(FadeIn(L2, shift=RIGHT * 0.1), run_time=0.4)

        # le morceau de plan z = 0, et les trois vecteurs DEDANS
        self.au_mot("Deux vecteurs non colinéaires")
        morceau = Polygon(r.pt(0, 0, 0), r.pt(3, 0, 0), r.pt(3, 3, 0), r.pt(0, 3, 0),
                          fill_color=C_PLAN, fill_opacity=0.28, stroke_color=C_PLAN, stroke_width=3)
        v1 = r.vecteur((0, 0, 0), COPL[0], None, couleur=C_VECTEUR, sw=7)
        v2 = r.vecteur((0, 0, 0), COPL[1], None, couleur=C_VECTEUR2, sw=7)
        self.play(FadeIn(morceau), GrowArrow(v1[0]), GrowArrow(v2[0]), run_time=0.8)
        L3 = self.col(self.t("un plan, et rien de plus", fs, C_PLAN), 0.5)
        self.play(FadeIn(L3, shift=RIGHT * 0.1), run_time=0.4)
        self.au_mot("Trois vecteurs peuvent très bien")
        v3 = r.vecteur((0, 0, 0), COPL[2], None, couleur=C_PIEGE, sw=7)
        self.play(GrowArrow(v3[0]), run_time=0.5)
        # ⛔ MESURÉ au dry run (AUDIT-ABSENT x3) : j'affichais ici les trois triplets
        # (1;0;0), (0;1;0), (1;1;0) — or la voix de ce clip ne les dit JAMAIS. Un nombre
        # à l'écran que la voix ne prononce pas est un écart, pas un bonus : les trois
        # vecteurs tracés dans le morceau de plan disent déjà tout.
        trois = VGroup(self.t("deux à deux non colinéaires,", 30, WHITE),
                       self.t("et tous dans le même plan", 30, C_PIEGE))
        trois.arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        self.col(trois, -0.9)
        self.play(FadeIn(trois, shift=RIGHT * 0.1), run_time=0.4)
        self.au_mot("coplanaires")
        mot = self.col(self.t("coplanaires", 38, C_PIEGE), -2.3)
        self.play(FadeIn(mot, scale=1.2), Indicate(morceau, color=C_PIEGE, scale_factor=1.03), run_time=0.7)
        self.attendre_voix(marge=0.5)

    # ── 07 : question-pause n° 2 (bonne réponse : C) ───────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        t0 = self.renderer.time
        self.dire("07-question")
        r, ax = self.repere(o=(-4.3, -1.4), u=0.44, portee=7)
        # ⛔ On ne dessine PAS les deux vecteurs : superposés, ils DONNENT la réponse.
        # Le repère seul tient le décor ; les coordonnées sont dans la question.
        self.au_mot("Question !")
        lu = VGroup(self.vexpr("Le vecteur u a pour coordonnées", ("u",), 32),
                    self.t("1 ; 2 ; 3,", 32))
        lu.arrange(RIGHT, buff=0.18)
        lv = VGroup(self.vexpr("et le vecteur v a pour coordonnées", ("v",), 32),
                    self.t("2 ; 4 ; 6.", 32))
        lv.arrange(RIGHT, buff=0.18)
        tete, q, cartes, pause, rebours = self.q_tete(
            [lu, lv, "Que peut-on dire ?"],
            [self.choix2("ils ne sont pas", "colinéaires"), self.t("on ne peut pas savoir", 28),
             self.choix2("ils sont", "colinéaires")])
        self.play(FadeIn(tete, shift=DOWN * 0.1), run_time=0.4)
        self.play(Create(ax), run_time=0.4)
        self.au_mot("Le vecteur u a pour coordonnées")
        self.play(FadeIn(lu[0], shift=RIGHT * 0.1), run_time=0.4)
        self.au_pos(self._texte_voix.find("1, 2, 3"))
        self.play(FadeIn(lu[1], shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("et le vecteur v a pour coordonnées")
        self.play(FadeIn(lv[0], shift=RIGHT * 0.1), run_time=0.4)
        self.au_pos(self._texte_voix.find("2, 4, 6"))
        self.play(FadeIn(lv[1], shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("Que peut-on dire")
        self.play(FadeIn(q[2], shift=RIGHT * 0.1), run_time=0.35)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "07", t0, "C")
        self.mem_q2 = (r, ax, tete, q, cartes, pause, rebours)

    def ecran_reponse2(self):
        r, ax, tete, q, cartes, pause, rebours = self.mem_q2
        self.dire("07b-reponse")
        self.q_reponse(cartes, 2, pause, rebours)
        fs = 32
        calc = VGroup(self.t("2 = 2 × 1", fs, VERT_OK), self.t("4 = 2 × 2", fs, VERT_OK),
                      self.t("6 = 2 × 3", fs, VERT_OK))
        calc.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        self.gauche(calc, -0.4, xmax=-4.55)   # l'origine du repère de 07 est à x = −4,3
        for i, extrait in enumerate(("2 égale 2 fois 1", "4 égale 2 fois 2", "6 égale 2 fois 3")):
            self.au_mot(extrait)
            self.play(FadeIn(calc[i], shift=RIGHT * 0.12), run_time=0.35)
        # maintenant seulement, la figure peut montrer la colinéarité : c'est la réponse
        # decal=DR : en UL, le nom « u » tombait sur la colonne de calcul (vu au gros plan)
        # ⛔⛔ ET DR NE TIENT PLUS DEPUIS LA FLÈCHE : « u » se posait pile sur l'axe des
        # y, dont la direction de fuite passe juste là. Vu au gros plan, invisible sur la
        # planche — et c'est bien la flèche qui l'a causé : sur le rendu HD publié,
        # le « u » nu passait à côté de l'axe.
        # ⭐ u et v sont COLINÉAIRES (v = 2 u) : leurs deux étiquettes sont sur la MÊME
        # droite, donc on les met de part et d'autre du fût — u à gauche (76 % du fût,
        # jeu 0,31), v à droite (63 %, jeu 0,23). Mesuré contre les axes, la colonne de
        # calcul ET la phrase « le même facteur partout », qui borde la figure en bas.
        u = r.vecteur((0, 0, 0), (1, 2, 3), "u", couleur=C_VECTEUR, sw=8,
                      decal=np.array([-0.25, 1.50, 0.0]))
        v = r.vecteur((0, 0, 0), (2, 4, 6), "v", couleur=VERT_OK, sw=5,
                      decal=np.array([1.25, 0.75, 0.0]))
        self.sans_audit(u)
        self.sans_audit(v)
        self.au_mot("Le même facteur 2")
        self.play(GrowArrow(v[0]), FadeIn(v[1]), run_time=0.6)
        self.play(GrowArrow(u[0]), FadeIn(u[1]), run_time=0.5)
        meme = self.t("le même facteur partout", fs, VERT_OK).next_to(calc, DOWN, buff=0.35)
        self.gauche(meme, meme.get_center()[1], xmax=-3.2)   # sous le repère, pas dedans
        self.play(FadeIn(meme, shift=UP * 0.1), run_time=0.4)
        self.au_mot("un seul écart")
        ecart = self.col(self.t("un seul écart, et c'est fini", 30, C_PIEGE), -2.6)
        self.play(FadeIn(ecart, shift=UP * 0.1), run_time=0.45)
        self.attendre_voix(marge=0.5)

    # ── 08 : rédiger ───────────────────────────────────────────────────────

    def ecran_rediger(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-rediger")
        self.au_mot("Au bac, deux lignes")
        titre = self.t("Au bac, deux lignes", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)  # 0.5 : a 0.4 le haut du titre atteint 3,6 > 3,573
        self.play(Write(titre), run_time=0.7)
        # la copie
        copie = RoundedRectangle(width=9.6, height=4.3, corner_radius=0.18, stroke_color=GREY_B,
                                 stroke_width=3, fill_color="#0b1220", fill_opacity=1).move_to(P(-0.5, -0.5))
        marge = Line(copie.get_corner(UL) + RIGHT * 0.75 + DOWN * 0.1,
                     copie.get_corner(DL) + RIGHT * 0.75 + UP * 0.1, stroke_width=2, color=ROUGE_ERREUR)
        self.play(Create(copie), Create(marge), run_time=0.6)
        fs = 34
        un = VGroup(self.pastille(1), VGroup(
            self.t("on calcule les coordonnées des deux vecteurs,", fs),
            self.t("arrivée moins départ", fs, C_VECTEUR)).arrange(DOWN, aligned_edge=LEFT, buff=0.1))
        un.arrange(RIGHT, buff=0.3, aligned_edge=UP)
        deux = VGroup(self.pastille(2), VGroup(
            self.t("on cherche un nombre k tel que", fs),
            self.t("le second vecteur soit k fois le premier", fs, VERT_OK)).arrange(
                DOWN, aligned_edge=LEFT, buff=0.1))
        deux.arrange(RIGHT, buff=0.3, aligned_edge=UP)
        lignes = VGroup(un, deux).arrange(DOWN, aligned_edge=LEFT, buff=0.55)
        if lignes.width > 8.6:
            lignes.scale_to_fit_width(8.6)
        lignes.move_to(copie.get_center() + UP * 0.35).align_to(marge.get_center() + RIGHT * 0.3, LEFT)
        self.au_mot("Un : on calcule")
        self.play(FadeIn(un[0], scale=1.3), FadeIn(un[1][0], shift=RIGHT * 0.15), run_time=0.5)
        self.au_mot("arrivée moins départ")
        self.play(FadeIn(un[1][1], shift=RIGHT * 0.15), run_time=0.4)
        self.au_mot("Deux : on cherche")
        self.play(FadeIn(deux[0], scale=1.3), FadeIn(deux[1][0], shift=RIGHT * 0.15), run_time=0.5)
        self.au_mot("soit k fois le premier")
        self.play(FadeIn(deux[1][1], shift=RIGHT * 0.15), run_time=0.4)
        self.au_mot("Si un seul et même k")
        trois = self.t("le même k pour les TROIS coordonnées", 34, C_REGARD)
        trois.next_to(lignes, DOWN, buff=0.45).align_to(lignes, LEFT)
        if trois.get_right()[0] > 6.3:
            trois.scale_to_fit_width(6.3 - trois.get_left()[0])
        cad = SurroundingRectangle(trois, color=C_REGARD, buff=0.14, stroke_width=3)
        self.play(FadeIn(trois, shift=UP * 0.1), Create(cad), run_time=0.6)
        self.attendre_voix(marge=0.6)


    # ── 09 : le défi ───────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte()
        self.dire("09-defi")
        self.au_mot("À toi de jouer")
        tete = VGroup(pastille_pause(0.38), self.t("À toi de jouer !", 42, ORANGE_RETENUE))
        tete.arrange(RIGHT, buff=0.25).to_edge(UP, buff=0.5)
        self.play(FadeIn(tete, shift=DOWN * 0.12), run_time=0.5)
        # u = 1,3 : à 0,95 les trois points se tassaient dans un coin et le nom de
        # l'axe y touchait B (vu au gros plan).
        r, ax = self.repere(o=(-4.3, -1.6), u=1.3, portee=2)
        self.play(Create(ax), run_time=0.4)
        fs = 36
        pts = []
        # ⭐ Le point au début de la phrase, le triplet à l'instant où la voix le dit :
        # mesuré, sinon « 1, 0, 0 » s'affichait 1,52 s AVANT d'être prononcé.
        for nom, c, extrait, dit, decal in (("A", AD, "A a pour coordonnées", "1, 0, 0", DR),
                                            ("B", BD, "B a pour coordonnées", "0, 1, 0", UR),
                                            ("C", CD, "C a pour coordonnées", "0, 0, 1", UL)):
            self.au_mot(extrait)
            p = self.sans_audit(r.point(*c, nom, couleur=C_REGARD, decal=decal, fs=30))
            L = self.ligne(self.t(nom, fs, C_REGARD), self.trip(c, fs, GREY_A), y=2.0 - 0.8 * len(pts))
            self.play(FadeIn(p, scale=1.3), FadeIn(L[0], shift=RIGHT * 0.12), run_time=0.4)
            self.au_pos(self._texte_voix.find(dit))
            self.play(FadeIn(L[1], shift=RIGHT * 0.12), run_time=0.3)
            pts.append((p, L))
        self.au_mot("Calcule les coordonnées")
        cons = VGroup(self.vexpr("les coordonnées de A B et A C,", ("A B", "A C"), 32, WHITE),
                      self.t("puis : sont-ils colinéaires ?", 32, ORANGE_RETENUE))
        cons.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.col(cons, -0.8)
        self.play(FadeIn(cons, shift=RIGHT * 0.1), run_time=0.5)
        self.au_mot("Mets pause, et cherche")
        pause = self.col(self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE), -2.1)
        rebours = CompteARebours(5, r=0.34, fs=32).next_to(pause, DOWN, buff=0.3)
        rebours.align_to(pause, LEFT)
        self.play(FadeIn(pause, scale=0.85), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        self.mem_defi = (r, ax, tete, pts, cons, pause, rebours)

    def ecran_correction(self):
        r, ax, tete, pts, cons, pause, rebours = self.mem_defi
        self.play(FadeOut(cons), FadeOut(pause), FadeOut(rebours), run_time=0.3)
        self.dire("09b-correction")
        self.au_mot("Correction")
        fs = 34
        vab = r.vecteur(AD, BD, None, couleur=C_VECTEUR, sw=7)
        vac = r.vecteur(AD, CD, None, couleur=C_VECTEUR2, sw=7)
        L1 = self.ligne(self.vec("A B", fs, C_VECTEUR), self.trip(AB_D, fs, VERT_OK), y=-0.75)
        L2 = self.ligne(self.vec("A C", fs, C_VECTEUR2), self.trip(AC_D, fs, VERT_OK), y=-1.5)
        self.au_mot("Le vecteur A B a pour coordonnées")
        self.play(GrowArrow(vab[0]), run_time=0.5)
        self.au_pos(self._texte_voix.find("moins 1, 1, 0"))
        self.play(FadeIn(L1, shift=RIGHT * 0.12), run_time=0.4)
        self.au_mot("Le vecteur A C a pour coordonnées")
        self.play(GrowArrow(vac[0]), run_time=0.5)
        self.au_pos(self._texte_voix.find("moins 1, 0, 1"))
        self.play(FadeIn(L2, shift=RIGHT * 0.12), run_time=0.4)
        # le k qui marche sur la première coordonnée, et qui tombe sur la deuxième
        self.au_mot("Les premières coordonnées sont égales")
        k1 = SurroundingRectangle(VGroup(L1[1].nb[0], L2[1].nb[0]), color=C_REGARD, buff=0.08,
                                  stroke_width=3)
        kv = self.t("k = 1 ?", 34, C_REGARD)
        kv.next_to(L2, DOWN, buff=0.4).align_to(L2, LEFT)
        self.play(Create(k1), FadeIn(kv, shift=UP * 0.1), run_time=0.6)
        self.au_mot("Mais avec k égal à 1")
        k2 = SurroundingRectangle(VGroup(L1[1].nb[1], L2[1].nb[1]), color=C_PIEGE, buff=0.08,
                                  stroke_width=3)
        self.play(Create(k2), run_time=0.5)
        self.au_mot("et elle vaut 0")
        faux = self.t("1 ≠ 0", 36, C_PIEGE).next_to(kv, RIGHT, buff=0.4)
        self.play(FadeIn(faux, scale=1.3), run_time=0.45)
        self.au_mot("ne sont donc pas colinéaires")
        concl = VGroup(self.t("non colinéaires :", 34, VERT_OK),
                       self.t("A, B et C ne sont pas alignés", 34, VERT_OK))
        concl.arrange(DOWN, aligned_edge=LEFT, buff=0.1).move_to(P(0, -2.75))
        concl.align_to(P(-6.2, 0), LEFT)
        # ⭐ le triangle se ferme : trois points NON alignés font un vrai triangle
        tri = Polygon(r.pt(*AD), r.pt(*BD), r.pt(*CD), stroke_color=VERT_OK, stroke_width=4,
                      fill_color=VERT_OK, fill_opacity=0.12)
        self.play(FadeIn(concl, shift=UP * 0.1), Create(tri), run_time=0.8)
        self.attendre_voix(marge=0.6)

    # ── 10 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-finale")
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        fs = 42
        b1 = VGroup(self.t("un vecteur de l'espace :", fs), self.t("trois coordonnées", fs, C_REGARD))
        b2 = VGroup(self.vexpr("A B :", ("A B",), fs, C_VECTEUR),
                    self.t("arrivée moins départ", fs, C_REGARD))
        b3 = VGroup(self.t("colinéaires :", fs, VERT_OK),
                    self.t("un seul et même nombre", fs), self.t("pour les trois", fs, C_REGARD))
        for b in (b1, b2):
            b.arrange(RIGHT, buff=0.25)
        b3[1:].arrange(RIGHT, buff=0.22)
        b3_ = VGroup(b3[0], VGroup(b3[1], b3[2]).arrange(RIGHT, buff=0.22)).arrange(RIGHT, buff=0.25)
        lignes = VGroup(*[VGroup(self.coche(), b).arrange(RIGHT, buff=0.3, aligned_edge=UP)
                          for b in (b1, b2, b3_)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 11.4:
            lignes.scale_to_fit_width(11.4)
        lignes.move_to(P(-0.4, 0.1))
        self.au_mot("Un vecteur de l'espace")
        self.play(Create(lignes[0][0]), FadeIn(b1[0], shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("trois coordonnées")
        self.play(FadeIn(b1[1], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Le vecteur A B")
        self.play(Create(lignes[1][0]), FadeIn(b2[0], shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("arrivée moins départ")
        self.play(FadeIn(b2[1], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Et deux vecteurs sont colinéaires")
        self.play(Create(lignes[2][0]), FadeIn(b3[0], shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("un seul et même nombre")
        self.play(FadeIn(b3[1], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("les trois coordonnées")
        self.play(FadeIn(b3[2], shift=RIGHT * 0.2), run_time=0.4)
        self.attendre_voix(marge=0.8)

    # ── 11 : la fin (règle du 19/10, comme les modèles) ────────────────────


    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_idee()
        self.ecran_theoreme()
        self.ecran_question1()
        self.ecran_reponse1()
        self.ecran_appliquer()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_reponse2()
        self.ecran_rediger()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.page_abonnement()


class EspaceVecteursTerminale(EspaceVecteursBase):
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"
