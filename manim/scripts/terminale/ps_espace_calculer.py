# ps_espace_calculer.py
# EleveAI — Maths Tle spé — paysage « Calculer un produit scalaire dans l'espace » (16:9),
# ceinture VERTE. Micro du coach : ps_espace_calculer (notion produit_scalaire_espace).
# Épisode 7 sur 12, et le PREMIER des six du produit scalaire.
# Centre : sport (liste fermée lib/videos/centres-interet.ts, tranche 15-18).
#
# Clé de voix → écran :
#   · 00-garde      : titre, « deux vecteurs » / « trois multiplications, une addition » ;
#   · 01-situation  : Kelly, kitesurf à l'Hermitage — seule la part du vent qui pousse ;
#   · 02-idee       : LE CALCUL, en toutes lettres : u(1;2;3) · v(4;−1;2) = 8 ;
#   · 03-theoreme   : un NOMBRE, la formule des normes, et u · u = ‖u‖² ;
#   · 04/04b        : question-pause n° 1 (u(2;0;−1) · v(1;5;2) → réponse B, zéro) ;
#   · 05-appliquer  : u · u = 14, donc ‖u‖ = √14 — deux lignes, et on a une longueur ;
#   · 06-piege      : symétrique ✓, distributif ✓, mais u·v = u·w n'implique PAS v = w ;
#   · 07/07b        : question-pause n° 2 (produit nul, vecteurs non nuls → réponse A) ;
#   · 08-rediger    : la copie — les coordonnées, puis la somme des trois produits ;
#   · 09/09b        : le défi — A G · A B = 1, A G · A C = 2, dans le cube unité ;
#   · 10-finale     : « Ce que tu as appris » ;
#   · 11-abonne     : eleveai.fr + « Abonne-toi ! ».
#
# ⭐ Le socle d'écran est dans manim/poste2/espace_ecrans.py, les figures dans
#   manim/poste2/espace3d.py. ⛔ Une correction d'OUTIL se fait là-bas, jamais recopiée ici.
# ⭐ Toutes les cotes de ce fichier viennent d'une COMMANDE :
#   `python -X utf8 manim/poste2/mesure-ps-espace-calculer.py` (recopié de celui de E6,
#   qui avait attrapé onze blocs rétrécis qu'aucun autre instrument ne voit).
#
# ⚠️ Bonne réponse : 04 → B, 07 → A (tirage graine 2211, table dans VOIX-espace-terminale.md).
# ✅ Les marques de cette voix ont été recontrôlées le 22/11 avec le convertisseur corrigé
#   (celui qui perdait les décimales répétées) : 890 marques, 0 cue non placée, fichier
#   identique à celui du dépôt. Le rendu peut donc se caler dessus sans réserve.
#
# ⛔⛔ LE ZÉRO DE CET ÉPISODE EST HORS AUDIT, ET C'EST STRUCTUREL. La voix dit « zéro »
#   EN TOUTES LETTRES partout où le sujet l'exige (« B : zéro », « Zéro fois 5 fait
#   zéro », « Les deux produits scalaires valent zéro »), et l'écran écrit 0 — seule
#   écriture juste d'un produit scalaire nul. Sans `self.zero()`, chaque 0 affiché
#   sortirait en `AUDIT-ABSENT` et noierait le seul vrai signalement qu'on cherche.
#   C'est la raison de `eq_zero` dans le socle, appliquée à un épisode qui parle DU zéro.
#
# Voix : manim/voix/terminale-ps-espace-calculer.json (débit −6, Julie).
# Audit : AUDIT=1 BORDS=1 PYTHONIOENCODING=utf-8 python -X utf8 -m manim render -qh \
#   --disable_caching manim/scripts/terminale/ps_espace_calculer.py PsEspaceCalculerTerminale \
#   --media_dir manim/scripts/terminale/media-ps-espace-calculer --dry_run

import sys
from pathlib import Path

# ⚠️ DEUX chemins : manim/poste2/ pour le socle et les figures, manim/ pour la charte.
sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "poste2"))
sys.path.insert(1, str(Path(__file__).resolve().parents[2]))

from manim import *  # noqa: E402,F403

import numpy as np  # noqa: E402

from espace3d import (C_FANTOME, C_PIEGE, C_PLAN, C_POINT, C_REGARD,  # noqa: E402
                      C_VECTEUR, C_VECTEUR2, Repere3D)
from charte import *  # noqa: E402,F401,F403
from espace_ecrans import CompteARebours, P, EcransEspace, pastille_pause  # noqa: E402

PEAU, CHEVEUX = "#c68642", "#2b1d12"
NEOPRENE, SANGLE = "#4338ca", "#fcd34d"

# ── les données de l'épisode, écrites UNE fois ─────────────────────────────
U02, V02 = (1, 2, 3), (4, -1, 2)          # 02 : l'exemple fondateur
U04, V04 = (2, 0, -1), (1, 5, 2)          # 04 : la question-pause n° 1
U05 = (1, 2, 3)                           # 05 : u · u = 14
U06, V06, W06 = (1, 0, 0), (0, 1, 0), (0, 0, 1)   # 06 : le contre-exemple
# ⭐ Le cube de 9 épisodes sur 12, dans le repère (A ; AB, AD, AE).
S = {"A": (0, 0, 0), "B": (1, 0, 0), "C": (1, 1, 0), "D": (0, 1, 0),
     "E": (0, 0, 1), "F": (1, 0, 1), "G": (1, 1, 1), "H": (0, 1, 1)}


def ps(u, v):
    """Le produit scalaire, recalculé ici — aucun nombre de cet épisode n'est recopié."""
    return sum(u[i] * v[i] for i in range(3))


def vec(m, n):
    return tuple(n[i] - m[i] for i in range(3))


def cavaliere(m):
    """Le projeté (x + 0,41 y ; z + 0,287 y), en unités de repère — pour vérifier HORS
    RENDU qu'une figure dit bien ce que l'écran prétend montrer."""
    return (m[0] + 0.41 * m[1], m[2] + 0.287 * m[1])


# ── la passe maths du script, refaite indépendamment de la voix ────────────
assert ps(U02, V02) == 8                       # 02 : 4 − 2 + 6
assert [U02[i] * V02[i] for i in range(3)] == [4, -2, 6]
assert ps(U04, V04) == 0                       # 04 : 2 + 0 − 2, bonne réponse B
assert 2 * V04[0] + 0 * V04[1] + 2 == 4        # le leurre A : le signe moins oublié
assert ps(U05, U05) == 14 and [U05[i] ** 2 for i in range(3)] == [1, 4, 9]
assert abs(14 ** 0.5 - (ps(U05, U05)) ** 0.5) < 1e-12
assert ps(U06, V06) == 0 and ps(U06, W06) == 0 and V06 != W06   # 06 : le contre-exemple
# ⭐ 09b : les deux produits du défi, et la prudence de la voix.
AG, AB, AC = vec(S["A"], S["G"]), vec(S["A"], S["B"]), vec(S["A"], S["C"])
assert AG == (1, 1, 1) and AB == (1, 0, 0) and AC == (1, 1, 0)
assert ps(AG, AB) == 1 and ps(AG, AC) == 2
# ⛔ « on ne compare pas ces deux nombres pour comparer deux angles » : c'est VRAI, et
# c'est la phrase la plus délicate de l'épisode. Les normes diffèrent (1 et √2), donc
# 1 < 2 ne dit rien des angles — ici l'angle à A B est d'ailleurs le PLUS GRAND.
assert ps(AB, AB) == 1 and ps(AC, AC) == 2
assert ps(AG, AB) / (ps(AG, AG) * ps(AB, AB)) ** 0.5 < \
    ps(AG, AC) / (ps(AG, AG) * ps(AC, AC)) ** 0.5


def kelly(s=1.0):
    """Kelly, kitesurfeuse à l'Hermitage : combinaison, harnais, planche, et son aile.

    ⛔ Les trois règles payées sur les personnages des épisodes 1 à 4, appliquées ici :
    1. AUCUN trait de visage — les quatre personnages de la série n'en ont pas, et une
       bouche dessinée à cette taille se lit comme une tache (E4) ;
    2. un accessoire ne doit JAMAIS être de la couleur de ce qu'il touche (piège n° 17
       des entiers) : la queue de cheval part du BORD de la tête (x = 0,31) et sort
       franchement de sa silhouette, sinon elle fond dans la chevelure ;
    3. l'aile est posée EN HAUT À GAUCHE, reliée par deux lignes à la barre : une aile
       collée au personnage se lirait comme un chapeau.
    ⭐ L'aile est en ambre (C_REGARD) : dans cet épisode, c'est elle qu'on regarde — le
    vent la pousse, et c'est la part utile de cette poussée qu'on va mesurer."""
    corps = RoundedRectangle(width=0.92, height=1.10, corner_radius=0.28,
                             fill_color=NEOPRENE, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.25))
    harnais = RoundedRectangle(width=0.96, height=0.15, corner_radius=0.06,
                               fill_color=SANGLE, fill_opacity=1,
                               stroke_width=0).move_to(P(0, 0.02))
    # ⛔⛔ VU SEULEMENT AU GROS PLAN (×2,8) : sans jambes, le torse posé directement sur
    # la planche se lisait comme un BUSTE coupé à mi-corps. Elles font 0,50, soit la
    # moitié du torse — en dessous elles ne se voient pas, au-dessus elle flotte.
    jambes = VGroup(Line(P(-0.20, -0.26), P(-0.24, -0.78), stroke_width=13,
                         color=NEOPRENE),
                    Line(P(0.20, -0.26), P(0.26, -0.78), stroke_width=13,
                         color=NEOPRENE))
    tete = Circle(radius=0.31, fill_color=PEAU, fill_opacity=1,
                  stroke_width=0).move_to(P(0, 1.14))
    cheveux = Arc(radius=0.35, start_angle=0.08, angle=PI - 0.16,
                  stroke_color=CHEVEUX, stroke_width=14)
    cheveux.move_to(tete.get_top() + DOWN * 0.05)
    # ⚠️ La queue part de x = 0,30 — le BORD du disque de la tête, pas son milieu.
    queue = ArcBetweenPoints(P(0.30, 1.26), P(0.62, 0.74), angle=-1.0)
    queue.set_stroke(CHEVEUX, 9)
    # ⚠️ Le bras part de l'ÉPAULE (x = −0,36, le bord du torse), pas du milieu du buste :
    # au gros plan on le voyait sortir du ventre.
    bras = Line(P(-0.36, 0.60), P(-0.70, 0.95), stroke_width=8, color=PEAU)
    barre = Line(P(-0.86, 1.05), P(-0.60, 0.87), stroke_width=7, color="#94a3b8")
    # ⛔⛔ VU SEULEMENT AU GROS PLAN : l'arc était tourné vers le BAS, et une aile
    # concave vers le haut se lit comme un BOL. Une aile de kite est convexe vers le
    # haut, bouts en bas — c'est par ces bouts que partent les lignes.
    aile = Arc(radius=0.62, start_angle=0.35, angle=PI - 0.70,
               stroke_color=C_REGARD, stroke_width=13).move_to(P(-1.45, 2.05))
    # ⚠️ Chaque ligne va du bout le plus PROCHE de son extrémité de barre : croisées,
    # elles feraient un X au milieu de la figure.
    lignes = VGroup(Line(aile.get_end(), P(-0.86, 1.05), stroke_width=2, color="#cbd5e1"),
                    Line(aile.get_start(), P(-0.60, 0.87), stroke_width=2, color="#cbd5e1"))
    planche = Ellipse(width=1.25, height=0.22, fill_color=SANGLE, fill_opacity=1,
                      stroke_width=0).rotate(-0.10).move_to(P(0.02, -0.84))
    mer = Line(P(-1.00, -1.00), P(1.05, -1.00), stroke_width=5, color=C_PLAN)
    return VGroup(mer, planche, jambes, corps, harnais, bras, tete, cheveux, queue,
                  lignes, barre, aile).scale(s)


def poussee(s=1.0):
    """LE SCHÉMA QUI EST TOUT L'ÉPISODE : une direction, un vent oblique, et la part du
    vent qui pousse DANS cette direction.

    ⭐ C'est un schéma PLAN, pas une figure de l'espace : rien n'y est projeté, donc rien
    n'y ment. (⛔ Un morceau de plan ou un repère cavalière à cet endroit aurait fait
    croire à une figure de l'espace — voir le NOYAU de la cavalière dans espace3d.py.)
    ⚠️ Le trait vert part de l'ORIGINE et s'arrête SOUS la pointe du vent : c'est
    exactement la projection, et c'est ce que le produit scalaire mesure."""
    sens = Arrow(P(0, 0), P(2.00, 0), buff=0, stroke_width=5, color=C_REGARD,
                 max_tip_length_to_length_ratio=0.10)
    vent = Arrow(P(0, 0), P(1.30, 1.15), buff=0, stroke_width=7, color=C_VECTEUR,
                 max_tip_length_to_length_ratio=0.14)
    chute = DashedLine(P(1.30, 1.15), P(1.30, 0), dash_length=0.10).set_stroke(C_FANTOME, 3)
    part = Line(P(0, 0.02), P(1.30, 0.02), stroke_width=11, color=VERT_OK)
    return VGroup(sens, vent, chute, part).scale(s)


class PsEspaceCalculerBase(EcransEspace):
    fichier_marques = "ps_espace_calculer_marques.json"
    nom_voix = "terminale-ps-espace-calculer"

    # ── les outils propres à cet épisode ───────────────────────────────────

    def zero(self, fs=28, color=WHITE):
        """LE CHIFFRE 0, HORS AUDIT — et dans cet épisode-là, c'est structurel.
        La voix dit « zéro » en toutes lettres (« B : zéro », « Zéro fois 5 fait
        zéro », « Les deux produits scalaires valent zéro »), l'écran écrit 0 : seule
        écriture juste. Même raison que `eq_zero` dans le socle, mais ici le zéro est
        le SUJET de l'épisode, donc il revient sur six écrans."""
        return self.sans_audit(self.t("0", fs, color))

    def nomme(self, nom, t3, c_nom, fs=28, c_nb=WHITE):
        """« u⃗ (1 ; 2 ; 3) » : le nom du vecteur AVEC SA FLÈCHE, dans sa couleur, puis
        son triplet.
        ⭐ Bleu pour u, rose pour v, partout dans l'épisode : c'est le code couleur
        annoncé dans la voix.
        ⛔⛔ `self.vec` ET NON `self.t`, et c'est la correction demandée par Frédéric le
        22/11 : « u (1 ; 2 ; 3) » sans flèche se lit comme une FONCTION de trois
        variables, et « u · v » comme un produit de deux nombres. Dans un épisode dont
        toute la leçon est « les facteurs sont des vecteurs, le résultat est un
        nombre », c'était la faute qui contredisait le propos."""
        g = VGroup(self.vec(nom, fs, c_nom), self.t("(", fs, c_nb),
                   self.trip(t3, fs, c_nb), self.t(")", fs, c_nb))
        g.arrange(RIGHT, buff=0.10)
        g.nb = g[2].nb
        return g

    def cube_repere(self, o, u, rouges=(), fs=24):
        """LE CUBE UNITÉ ABCDEFGH — ⛔ SANS AXES, et c'est une correction payée à l'image
        sur l'épisode 6 (recopiée ici telle quelle, avec sa raison).

        Dans CE repère-là, les trois axes sont PORTÉS PAR TROIS ARÊTES DU CUBE (A B,
        A D, A E) : dessinés avec `portee=2`, ils se superposent exactement aux arêtes
        sur leur première moitié — on ne voit pas des axes, on voit des arêtes grises
        doublées — et surtout le bout de l'axe des y tombe À L'INTÉRIEUR du cube (le
        projeté de (0 ; 2 ; 0) est (0,82 ; 0,57) et la silhouette du cube va jusqu'à
        (1,41 ; 1,29)). ⛔ Allonger la portée n'arrange rien avant 4, où les axes
        feraient quatre fois le cube.
        ⭐ Le repère est DIT, pas tracé : `base_repere` le montre par trois flèches
        posées sur les trois arêtes qui partent de A.
        ⚠️ `u` reste entre 1,25 et 1,6 : à 0,95 les noms des sommets se touchent."""
        r = Repere3D(o=np.array([o[0], o[1], 0.0]), u=u, portee=2)
        cube = self.sans_audit(r.cube(cote=1, rouges=rouges, couleur=C_POINT, sw=4, fs=fs))
        return r, cube

    def base_repere(self, r, couleur=C_VECTEUR, sw=5):
        """LES TROIS VECTEURS DE BASE A B, A D, A E — le repère de l'énoncé, montré.
        ⛔ Sans lettres : un « y » posé au bout de A D tomberait dans le cube."""
        return VGroup(*[r.vecteur(S["A"], S[s], None, couleur=couleur, sw=sw)
                        for s in ("B", "D", "E")])

    # ── 00 : page de garde ─────────────────────────────────────────────────

    def ecran_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        ech = self.echelle().align_to(P(0, -3.45), DOWN)
        self.add(ech)
        titre = self.t("Produit scalaire dans l'espace", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Produit scalaire dans l'espace")
        self.play(Write(titre), run_time=0.9)
        ident = self.t(self.identite, 26, GREY_A).next_to(titre, DOWN, buff=0.18)
        self.play(FadeIn(ident), run_time=0.3)
        # ⚠️ MESURÉ hors rendu : « trois multiplications, une addition » fait 6,26 à 38,
        # donc avec sa pastille le bloc fait 6,7 — centré en x = −0,9 il s'arrête à 2,45,
        # loin de Ti-Margo, dont la boîte commence à 4,87 à scale 0,8.
        fs = 38
        promesses = (("deux vecteurs", C_VECTEUR, "Deux vecteurs"),
                     ("trois multiplications, une addition", C_REGARD,
                      "trois multiplications"))
        lignes = VGroup()
        for txt, coul, _ in promesses:
            lignes.add(VGroup(Dot(radius=0.08, color=coul), self.t(txt, fs, coul))
                       .arrange(RIGHT, buff=0.26))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        lignes.move_to(P(-0.9, 0.95))
        for b, (_, _, extrait) in zip(lignes, promesses):
            self.au_mot(extrait)
            self.play(FadeIn(b, shift=RIGHT * 0.15), run_time=0.5)
        # ⛔ UNE SEULE LIGNE, et à −1,55 : `echelle()` alignée en bas occupe y de −3,45 à
        # −1,98 (mesuré sur l'épisode 5, où la note de reprise annonçait −2,6 et avait
        # tort). Une ligne simple à −1,55 descend à −1,75 : elle passe de 0,23.
        fin = self.t("un nombre, pas un vecteur", 32, VERT_OK).move_to(P(-0.9, -1.55))
        self.au_mot("un nombre, pas un vecteur")
        self.play(FadeIn(fin, shift=UP * 0.12), run_time=0.7)
        self.attendre_voix(marge=0.8)

    # ── 01 : Kelly, et la part du vent qui pousse ──────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        k = kelly(0.68).move_to(P(-5.45, 0.90))
        self.au_mot("Voici Kelly")
        nom = self.t("Kelly", 32, JAUNE_TITRE).next_to(k, DOWN, buff=0.20)
        # ⛔ Le garde-fou AVANT le play, et pas après (défaut n° 7 de l'épisode 1, refait
        # sur E4) : un nom centré sous un personnage posé à gauche part hors marge.
        if nom.get_left()[0] < -6.5:
            nom.shift(RIGHT * (-6.5 - nom.get_left()[0]))
        self.play(FadeIn(k, shift=UP * 0.2), FadeIn(nom), run_time=0.6)
        self.au_mot("kitesurf à l'Hermitage")
        metier = self.t("kitesurf à l'Hermitage", 24, GREY_A).next_to(nom, DOWN, buff=0.12)
        if metier.get_left()[0] < -6.5:
            metier.shift(RIGHT * (-6.5 - metier.get_left()[0]))
        self.play(FadeIn(metier, shift=UP * 0.1), run_time=0.4)

        # ⭐ LE SCHÉMA ARRIVE EN DEUX TEMPS, et c'est la leçon qu'il porte : d'abord le
        # vent et la direction, PUIS la part qui pousse — sinon la réponse est à l'écran
        # avant la question.
        self.au_mot("Le vent pousse son aile")
        sch = poussee(0.92).move_to(P(-2.75, 0.75))
        self.play(GrowArrow(sch[0]), GrowArrow(sch[1]), run_time=0.7)
        et_vent = self.sans_audit(self.t("vent", 24, C_VECTEUR)).next_to(sch[1], UP, buff=0.10)
        self.play(FadeIn(et_vent), run_time=0.3)

        fs = 28
        self.au_mot("seule la partie du vent")
        self.play(Create(sch[2]), Create(sch[3]), run_time=0.6)
        pousse = self.sans_audit(self.t("ce qui pousse", 24, VERT_OK))
        pousse.next_to(sch[3], DOWN, buff=0.16)
        self.play(FadeIn(pousse), run_time=0.3)
        # ⛔ MESURÉ : « qui va dans le bon sens » porte le bloc à 4,55 pour 4,40 offerts,
        # donc `col()` le rétrécissait. Coupé à « dans le bon sens », il fait 3,70.
        b1 = self.col(VGroup(self.t("seule la partie", fs, C_REGARD),
                             self.t("dans le bon sens", fs, C_REGARD))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.08), 2.50)
        self.play(FadeIn(b1, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("un vent de côté ne sert à rien")
        b2 = self.col(VGroup(self.croix(r=0.13),
                             VGroup(self.t("un vent de côté", fs, C_PIEGE),
                                    self.t("ne sert à rien", fs, C_PIEGE))
                             .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
                      .arrange(RIGHT, buff=0.22), 1.35)
        self.play(FadeIn(b2, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("ce que mesure un produit scalaire")
        b3 = self.col(VGroup(self.coche(VERT_OK, 0.15),
                             VGroup(self.t("c'est ce que mesure", fs, VERT_OK),
                                    self.t("un produit scalaire", fs, VERT_OK))
                             .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
                      .arrange(RIGHT, buff=0.22), 0.20)
        self.play(FadeIn(b3, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("En physique, c'est le travail d'une force")
        b4 = self.col(VGroup(self.t("en physique :", fs, GREY_A),
                             self.t("le travail d'une force", fs, GREY_A))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.08), -0.95)
        self.play(FadeIn(b4, shift=RIGHT * 0.12), run_time=0.5)
        # ⭐ La CONCLUSION va à gauche, sous la figure, en grand (défaut n° 4 de E3) :
        # le bas de la colonne de droite est réservé aux lignes COURTES.
        self.au_mot("un seul nombre qui résume l'accord entre deux directions")
        # ⚠️ 26 ET NON 28, MESURÉ : à 28 le texte et son cadre font 11,73 pour les 11,10
        # offerts à gauche, donc `gauche()` les rétrécissait — c'est la phrase qui résume
        # l'épisode, elle ne doit pas être son plus petit texte.
        fil = self.t("un seul nombre qui résume l'accord entre deux directions", 26, C_REGARD)
        cad = SurroundingRectangle(fil, color=C_REGARD, buff=0.16, stroke_width=3)
        # ⛔ On pose le GROUPE texte + cadre : gauche() borne le TEXTE, pas le cadre.
        self.gauche(VGroup(fil, cad), -2.60, xmax=4.6)
        self.play(FadeIn(fil, scale=1.05), Create(cad), run_time=0.8)
        self.attendre_voix(marge=0.5)

    # ── 02 : le calcul en coordonnées ──────────────────────────────────────

    def ecran_idee(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-idee")
        self.au_mot("Dans un repère orthonormé")
        titre = self.t("Le calcul en coordonnées", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.8)
        fs = 28
        # ⭐ LA CONDITION D'ABORD, ET ENCADRÉE : « et cette condition est obligatoire »
        # est dite dans la voix, entre deux tirets. C'est la seule phrase de l'épisode
        # qui peut rendre tout le reste faux.
        # ⛔ TROIS LIGNES, ET C'EST UNE MESURE : « repère ORTHONORMÉ » d'un seul tenant
        # porte le bloc et son cadre à 4,83 pour 4,40 offerts — `col()` le rétrécissait,
        # et c'est justement la condition sans laquelle tout le reste est faux.
        cond = VGroup(self.t("repère", fs, C_REGARD),
                      self.t("ORTHONORMÉ", fs, C_REGARD),
                      self.t("obligatoire", 26, C_PIEGE))
        cond.arrange(DOWN, buff=0.10)
        cadc = SurroundingRectangle(cond, color=C_PIEGE, buff=0.14, stroke_width=3)
        # ⛔⛔ VU À LA PLANCHE, ET AUCUN OUTIL NE POUVAIT LE DIRE : à y = 2,45 ce cadre de
        # trois lignes monte à 3,25 et S'ÉCRIVAIT SUR LE TITRE, qui descend à 2,88. La
        # mesure voyait les deux objets, elle ne les COMPARAIT pas — le titre est posé
        # par `to_edge`, pas par `col()`. ⭐ Le haut de la colonne de droite est libre
        # jusqu'à 2,78, pas jusqu'à 3,15 : la tête « Question ! » y tient parce qu'elle
        # fait UNE ligne. Tout ce qui est posé ici se mesure contre le titre.
        self.col(VGroup(cond, cadc), 1.95)
        self.play(FadeIn(cond, shift=RIGHT * 0.12), Create(cadc), run_time=0.7)
        self.au_mot("On multiplie les x entre eux")
        b2 = self.col(VGroup(self.t("on multiplie les x,", fs, C_VECTEUR),
                             self.t("les y, les z", fs, C_VECTEUR))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.08), 0.45)
        self.play(FadeIn(b2, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("Puis on additionne les trois résultats")
        b3 = self.col(VGroup(self.t("puis on additionne", fs, VERT_OK),
                             self.t("les trois résultats", fs, VERT_OK))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.08), -0.55)
        self.play(FadeIn(b3, shift=RIGHT * 0.12), run_time=0.5)

        # ── l'exemple, à GAUCHE, du haut vers le bas ──────────────────────
        # ⚠️ xmax = 1,9 tant que la colonne de droite est occupée (son dernier bloc
        # descend à −0,19) ; en dessous, la largeur est libre jusqu'à Ti-Margo.
        self.au_fin("u de coordonnées 1, 2, 3")
        lu = self.gauche(self.nomme("u", U02, C_VECTEUR, 32), 2.35, xmax=1.9)
        self.play(FadeIn(lu, shift=RIGHT * 0.12), run_time=0.5)
        self.au_fin("v de coordonnées 4, moins 1, 2")
        lv = self.gauche(self.nomme("v", V02, C_VECTEUR2, 32), 1.55, xmax=1.9)
        self.play(FadeIn(lv, shift=RIGHT * 0.12), run_time=0.5)

        # ⭐ Les trois produits sont posés ENSEMBLE puis montrés un à un : construits
        # ligne par ligne, le bloc se recentrerait à chaque fois (et le sursaut ne se
        # voit qu'à l'image). Même raison que l'accolade de `systeme` dans le socle.
        produits = (("les x :", "1 × 4 = 4", "1 fois 4, c'est 4"),
                    ("les y :", "2 × (−1) = −2", "2 fois moins 1, c'est moins 2"),
                    ("les z :", "3 × 2 = 6", "3 fois 2, c'est 6"))
        rangs = [VGroup(self.t(g, 26, GREY_A), self.t(d, 30, WHITE))
                 .arrange(RIGHT, buff=0.22) for g, d, _ in produits]
        bloc = VGroup(*rangs).arrange(DOWN, aligned_edge=LEFT, buff=0.22)
        self.gauche(bloc, -1.10, xmax=4.6)
        for r_, (_, _, extrait) in zip(rangs, produits):
            self.au_fin(extrait)
            self.play(FadeIn(r_, shift=RIGHT * 0.12), run_time=0.45)
        self.au_fin("4 moins 2 plus 6, donc 8")
        tot = VGroup(self.t("total :", 28, GREY_A), self.t("4 − 2 + 6 = 8", 34, VERT_OK))
        tot.arrange(RIGHT, buff=0.22)
        cadt = SurroundingRectangle(tot[1], color=VERT_OK, buff=0.14, stroke_width=3)
        self.gauche(VGroup(tot, cadt), -2.75, xmax=4.6)
        self.play(FadeIn(tot, shift=UP * 0.1), Create(cadt), run_time=0.7)
        self.attendre_voix(marge=0.5)

    # ── 03 : les trois choses à retenir ────────────────────────────────────

    def ecran_theoreme(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-theoreme")
        self.au_mot("Trois choses à retenir")
        titre = self.t("Trois choses à retenir", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.8)
        fs = 30
        # ⭐ Un tableau se lit en RANGÉES sur toute la largeur, pas dans la colonne de
        # droite : chaque rangée est « l'idée → ce qu'elle dit ». Recette de l'écran 03
        # de E5 et de E6 : on arrange, on borne à 10,6 et on centre en −0,75, à l'écart
        # de Ti-Margo (x ≥ 5,54).
        # ⚠️ Les trois formules sont SANS AUDIT : « ‖u‖² » et « cos θ » ne portent aucun
        # nombre que la voix pourrait dire, et le « 2 » de l'exposant n'est pas un
        # nombre dit mais une notation (la voix dit « le carré »).
        # ⚠️ LES LIBELLÉS DE GAUCHE SONT COURTS, ET C'EST MESURÉ : avec « une seconde
        # formule : » le tableau faisait 10,73 de large pour un plafond de 10,60, donc
        # `scale_to_fit_width` le réduisait de 1,2 % — invisible à l'œil, et c'est
        # exactement le genre de réduction silencieuse que la mesure existe pour voir.
        lignes = (("le résultat :", C_POINT, "un nombre réel, jamais un vecteur", C_PIEGE,
                   "Le résultat est un nombre réel"),
                  ("seconde formule :", C_REGARD,
                   ("u · v = ‖u‖ × ‖v‖ × cos θ", ("u", "v")), WHITE,
                   "Il existe une seconde formule"),
                  ("le plus utile :", C_VECTEUR, ("u · u = ‖u‖²", ("u",)), VERT_OK,
                   "le cas particulier le plus utile"))
        rangs, extraits = [], []
        for k, (g, cg, d, cd, extrait) in enumerate(lignes, start=1):
            # ⚠️ buff 0,24 et non 0,30 : à 0,30 le tableau fait 10,85 de large pour un
            # plafond de 10,60, donc `scale_to_fit_width` le réduisait de 2 % — personne
            # ne l'aurait vu, et c'est exactement le genre de réduction silencieuse que
            # cette mesure existe pour attraper.
            # ⭐ Un libellé de droite est soit une phrase, soit une FORMULE donnée avec
            # la liste de ses vecteurs : `vexpr` pose alors une flèche sur chacun.
            corps = (self.vexpr(d[0], d[1], fs, cd) if isinstance(d, tuple)
                     else self.t(d, fs, cd))
            rangs.append(VGroup(self.pastille(k), self.t(g, fs, cg),
                                self.sans_audit(corps))
                         .arrange(RIGHT, buff=0.24))
            extraits.append(extrait)
        rangees = VGroup(*rangs).arrange(DOWN, aligned_edge=LEFT, buff=0.50)
        if rangees.width > 10.6:
            rangees.scale_to_fit_width(10.6)
        rangees.move_to(P(-0.75, 0.85))
        for b, extrait in zip(rangs, extraits):
            self.au_mot(extrait)
            self.play(FadeIn(b[0], scale=1.3), FadeIn(b[1:], shift=RIGHT * 0.15),
                      run_time=0.5)
        # ⭐ La troisième ligne est celle qui sert à l'écran 05 et au bac : elle est
        # reprise en grand, encadrée, sous le tableau.
        self.au_mot("est le carré de sa norme")
        # ⛔ DEUX LIGNES, MESURÉ : d'un seul tenant cette phrase et son cadre font 14,14
        # pour 11,10 offerts. Coupée, la plus longue ligne en fait 8,4.
        rap = self.sans_audit(VGroup(
            self.t("le produit scalaire d'un vecteur par lui-même", 28, VERT_OK),
            self.t("est le carré de sa norme", 28, VERT_OK))
            .arrange(DOWN, aligned_edge=LEFT, buff=0.10))
        cad = SurroundingRectangle(rap, color=VERT_OK, buff=0.16, stroke_width=3)
        self.gauche(VGroup(rap, cad), -2.45, xmax=4.6)
        self.play(FadeIn(rap, scale=1.04), Create(cad), run_time=0.8)
        self.attendre_voix(marge=0.6)

    # ── 04 : question-pause n° 1 (bonne réponse : B) ────────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        t0 = self.renderer.time
        self.dire("04-question")
        self.au_mot("Question !")
        # ⛔ Le dessin porte la DONNÉE (les deux triplets), jamais la RÉPONSE : aucun
        # calcul, aucune flèche. Tout arrive en 04b.
        # ⚠️ Les cartes vont de x = 1,65 à 6,55 : la donnée de gauche s'arrête à 1,45.
        self.au_fin("u a pour coordonnées 2, 0, moins 1")
        lu = self.gauche(self.nomme("u", U04, C_VECTEUR, 34), 1.50, xmax=1.45)
        self.au_fin("v a pour coordonnées 1, 5, 2")
        lv = self.gauche(self.nomme("v", V04, C_VECTEUR2, 34), 0.60, xmax=1.45)
        # ⭐ Le choix C porte un TRIPLET, et on lui accroche `.nb` : `q_montrer_choix`
        # retarde alors la carte jusqu'au dernier nombre DIT (« 2, 0, moins 2 »).
        # ⛔ Sans ça, les trois nombres du leurre seraient à l'écran ~1,5 s avant d'être
        # prononcés — c'est le piège n° 6 des entiers, dans une carte de choix.
        cC = VGroup(self.t("le vecteur", 28, WHITE), self.trip((2, 0, -2), 30, WHITE))
        cC.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
        cC.nb = cC[1].nb
        tete, q, cartes, pause, rebours = self.q_tete(
            [self.t("que vaut le produit scalaire", 32),
             self.vexpr("de u et v ?", ("u", "v"), 32)],
            [self.t("4", 34, WHITE), self.zero(34, WHITE), cC],
            largeur=4.9, xl=1.65)
        self.play(FadeIn(tete, shift=DOWN * 0.1), run_time=0.4)
        self.play(FadeIn(lu, shift=RIGHT * 0.12), run_time=0.45)
        self.play(FadeIn(lv, shift=RIGHT * 0.12), run_time=0.45)
        self.au_mot("Que vaut le produit scalaire de u et v")
        self.play(FadeIn(q, shift=RIGHT * 0.1), run_time=0.45)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "04", t0, "B")
        self.mem_q1 = (cartes, pause, rebours)

    def ecran_reponse1(self):
        cartes, pause, rebours = self.mem_q1
        self.dire("04b-reponse")
        # ⛔ On passe pause ET rebours : sans eux, « Mets pause, et choisis ! » et le
        # compte à rebours restent par-dessus l'explication (défaut n° 1 de l'épisode 1).
        self.q_reponse(cartes, 1, pause, rebours)
        fs = 28
        # ⭐⭐ LES BLOCS SONT COMPTÉS DU BAS VERS LE HAUT : la marge de 3 % s'arrête à
        # −3,573, et le dernier bloc est un cadre d'une ligne (haut 0,70 avec son buff),
        # donc son centre ne descend pas sous −3,20. Mesurés hors rendu.
        # ⛔⛔ ET L'ORDRE DES y EST CELUI DE LA LECTURE, PAS CELUI DE LA VOIX : les cartes
        # occupent x ≥ 1,65 de y = 1,63 à −1,25. Tout ce qui est posé DANS cette bande
        # doit s'arrêter à xmax = 1,45 ; ce qui passe dessous (y ≤ −1,85) prend toute la
        # largeur jusqu'à Ti-Margo (xmax = 4,6). Une première version posait les deux
        # leurres à y = 1,55 et 0,75 avec xmax = 4,6 : ils se seraient écrits PAR-DESSUS
        # les cartes A et B — c'est le défaut n° 1 de l'épisode 3, et la mesure l'a
        # attrapé avant le rendu.
        # ⛔⛔ VU À LA PLANCHE, ET C'EST LE DÉFAUT N° 1 DE L'ÉPISODE 3 À SA QUATRIÈME
        # RÉCIDIVE : cet écran HÉRITE de l'écran 04, qui laisse u (2 ; 0 ; −1) à y = 1,50
        # et v (1 ; 5 ; 2) à y = 0,60 — ce sont les DONNÉES de l'exercice, elles ne
        # s'effacent pas. Les trois lignes de calcul, posées à 1,55 / 0,75 / −0,05,
        # s'écrivaient par-dessus : à l'image, trois textes empilés au même endroit.
        # ⭐ Elles sont maintenant UN SEUL bloc, posé SOUS les données, et la somme en est
        # la quatrième ligne — un calcul se lit d'un bloc, pas en quatre morceaux épars.
        # ⚠️ La somme est hors audit : la voix l'énonce EN LETTRES (« Deux, plus zéro,
        # moins deux : zéro »), donc chaque chiffre affiché sortirait en ABSENT ou en
        # TARD sur une autre occurrence. Idem pour les deux « 0 » de la ligne des y.
        lignes_c = (self.t("2 × 1 = 2", 32, WHITE),
                    VGroup(self.zero(32), self.t("× 5 =", 32, WHITE), self.zero(32))
                    .arrange(RIGHT, buff=0.18),
                    self.t("(−1) × 2 = −2", 32, WHITE),
                    self.sans_audit(self.t("2 + 0 − 2 = 0", 36, VERT_OK)))
        calc = VGroup(*lignes_c).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        self.gauche(calc, -0.78, xmax=1.45)
        ancres = (("2 fois 1 fait 2", True), ("Zéro fois 5 fait zéro", True),
                  ("moins 1 fois 2 fait moins 2", True),
                  ("Deux, plus zéro, moins deux", False))
        for mob, (extrait, fin) in zip(lignes_c, ancres):
            self.au_fin(extrait) if fin else self.au_mot(extrait)
            self.play(FadeIn(mob, shift=RIGHT * 0.12), run_time=0.45)

        # ── les deux leurres, nommés : une ERREUR DE SIGNE et une erreur de TYPE ──
        # ⛔ au_fin ET NON au_mot, ET C'EST LE DRY RUN QUI L'A DIT : posée à « La », cette
        # ligne mettait son « 4 » à l'écran **1,04 s** avant qu'il soit dit. C'est le
        # piège n° 6 des entiers — une ligne qui porte un nombre se pose à l'instant de CE
        # nombre — et il revient à chaque épisode de la série.
        self.au_fin("La réponse A, 4")
        lA = VGroup(self.croix(r=0.12), self.t("4", 30, C_PIEGE),
                    self.t(": le signe moins oublié", 26, C_PIEGE))
        lA.arrange(RIGHT, buff=0.18)
        self.gauche(lA, -2.15, xmax=4.6)
        self.play(FadeIn(lA, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("la réponse C n'est même pas du bon type")
        lC = VGroup(self.croix(r=0.12),
                    self.t("un produit scalaire est un NOMBRE, pas un vecteur",
                           26, C_PIEGE))
        lC.arrange(RIGHT, buff=0.18)
        self.gauche(lC, -2.60, xmax=4.6)
        self.play(FadeIn(lC, shift=RIGHT * 0.12), run_time=0.5)
        # ⭐ La phrase que l'élève doit retenir, et qui annonce l'épisode suivant.
        self.au_mot("ce zéro n'est pas rien")
        ort = self.sans_audit(self.vexpr("ce zéro n'est pas rien : u et v sont ORTHOGONAUX",
                                         ("u", "v"), 28, VERT_OK))
        cado = SurroundingRectangle(ort, color=VERT_OK, buff=0.16, stroke_width=3)
        self.gauche(VGroup(ort, cado), -3.20, xmax=4.6)
        self.play(FadeIn(ort, scale=1.04), Create(cado), run_time=0.7)
        self.attendre_voix(marge=0.5)

    # ── 05 : u · u, et la norme ────────────────────────────────────────────

    def ecran_appliquer(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-appliquer")
        self.au_mot("Appliquons le cas particulier")
        # ⛔ VU PAR L'AUDIT DES FLÈCHES : le TITRE lui-même nommait un vecteur à nu.
        # C'est l'écran dont toute la leçon est « u⃗ · u⃗ est le carré de la norme ».
        titre = self.vexpr("Le cas u · u", ("u",), 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.7)
        # ⚠️ Repère MESURÉ : o = (−4,85 ; −1,85), u = 0,62, portée 4.
        # ⭐ C'est le SEUL écran où les axes sont tracés avec un vecteur : u = (1 ; 2 ; 3)
        # n'est porté par aucun axe, donc rien ne se superpose (⛔ ce qui n'est pas le cas
        # du cube des écrans 09/09b, ni des trois vecteurs de l'écran 06).
        r, ax = self.repere(o=(-4.85, -1.85), u=0.62, portee=4)
        self.play(FadeIn(ax), run_time=0.5)
        self.au_fin("u de coordonnées 1, 2, 3")
        # ⛔ VU AU GROS PLAN : `decal=UR` (le défaut) pose l'étiquette SUR le fût,
        # parce que ce vecteur monte justement vers la droite — et depuis que
        # l'étiquette porte sa propre flèche, les deux flèches se croisaient.
        # ⭐ La règle : l'étiquette va du côté où le vecteur ne va PAS.
        fu = r.vecteur((0, 0, 0), U05, "u", couleur=C_VECTEUR, sw=7, decal=UL)
        esc = self.sans_audit(r.point(*U05, nom=None, couleur=C_VECTEUR, r=0.06,
                                      escalier=True))
        self.play(GrowArrow(fu[0]), FadeIn(fu.nom), run_time=0.6)
        self.play(Create(esc), run_time=0.5)

        fs = 28
        lu = self.col(self.nomme("u", U05, C_VECTEUR, 30), 2.45)
        self.play(FadeIn(lu, shift=RIGHT * 0.12), run_time=0.5)
        # ⛔ DEUX LIGNES, ET C'EST UNE MESURE : d'un seul tenant « u · u = 1 × 1 + 2 × 2
        # + 3 × 3 » dépasse les 4,40 de la colonne de droite, donc `col()` le
        # rétrécirait — c'est-à-dire que LA LIGNE QUI PORTE LA LEÇON deviendrait le plus
        # petit texte de l'écran (défaut n° 4 de l'épisode 3).
        self.au_fin("1 fois 1, plus 2 fois 2, plus 3 fois 3")
        b1 = self.col(VGroup(self.sans_audit(self.vexpr("u · u =", ("u",), fs, C_REGARD)),
                             self.t("1 × 1 + 2 × 2 + 3 × 3", fs, WHITE))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.10), 1.35)
        self.play(FadeIn(b1, shift=RIGHT * 0.12), run_time=0.6)
        self.au_fin("1 plus 4 plus 9, donc 14")
        b2 = self.col(self.t("= 1 + 4 + 9 = 14", 32, WHITE), 0.40)
        self.play(FadeIn(b2, shift=RIGHT * 0.12), run_time=0.55)
        self.au_fin("la norme de u vaut racine de 14")
        nor = VGroup(self.sans_audit(self.vexpr("‖u‖ =", ("u",), 34, VERT_OK)),
                     self.t("√14", 34, VERT_OK)).arrange(RIGHT, buff=0.16)
        cadn = SurroundingRectangle(nor, color=VERT_OK, buff=0.14, stroke_width=3)
        self.col(VGroup(nor, cadn), -0.60)
        self.play(FadeIn(nor, scale=1.08), Create(cadn), run_time=0.7)
        # ⭐ La conclusion va à gauche, sous la figure, en grand.
        self.au_mot("Deux lignes, et on a une longueur")
        fin = self.gauche(self.t("deux lignes, et on a une longueur", 32, C_REGARD),
                          -3.10, xmax=4.6)
        self.play(FadeIn(fin, shift=UP * 0.1), run_time=0.6)
        self.attendre_voix(marge=0.5)

    # ── 06 : le piège — on ne simplifie pas ────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.au_mot("Voilà le piège")
        # ⛔ Le glyphe ⚠ ne se rend pas (carré « tofu ») : on DESSINE le triangle.
        bang = VGroup(Triangle(fill_color=C_PIEGE, fill_opacity=0.18, stroke_color=C_PIEGE,
                               stroke_width=4).scale(0.33),
                      Text("!", font_size=30, color=C_PIEGE, weight=BOLD).shift(DOWN * 0.05))
        titre = VGroup(bang, self.t("On ne simplifie jamais", 42, C_PIEGE))
        titre.arrange(RIGHT, buff=0.3).to_edge(UP, buff=0.5)
        self.play(Write(titre[1]), FadeIn(titre[0], scale=1.4), run_time=0.9)
        fs = 28
        self.au_mot("ressemble à une multiplication")
        res = self.gauche(VGroup(self.t("ça ressemble à", fs, GREY_A),
                                 self.t("une multiplication...", fs, GREY_A))
                          .arrange(DOWN, aligned_edge=LEFT, buff=0.08), 2.30, xmax=1.9)
        self.play(FadeIn(res, shift=RIGHT * 0.12), run_time=0.5)

        # ── ce qui est VRAI, dans la colonne de droite ────────────────────
        # ⚠️ Les deux formules sont hors audit : « u · v = v · u » ne porte aucun nombre,
        # et la voix les dit en toutes lettres (« u scalaire v égale v scalaire u »).
        self.au_mot("Il est bien symétrique")
        b1 = self.col(VGroup(self.coche(VERT_OK, 0.15),
                             VGroup(self.t("symétrique :", fs, VERT_OK),
                                    self.sans_audit(self.vexpr("u · v = v · u",
                                                               ("u", "v"), fs, WHITE)))
                             .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
                      .arrange(RIGHT, buff=0.22, aligned_edge=UP), 2.55)
        self.play(FadeIn(b1, shift=RIGHT * 0.12), run_time=0.55)
        self.au_mot("Il est bien distributif")
        b2 = self.col(VGroup(self.coche(VERT_OK, 0.15),
                             VGroup(self.t("distributif :", fs, VERT_OK),
                                    self.sans_audit(self.vexpr("u · (v + w) =",
                                                               ("u", "v", "w"), fs, WHITE)),
                                    self.sans_audit(self.vexpr("u · v + u · w",
                                                               ("u", "v", "w"), fs, WHITE)))
                             .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
                      .arrange(RIGHT, buff=0.22, aligned_edge=UP), 1.20)
        self.play(FadeIn(b2, shift=RIGHT * 0.12), run_time=0.6)
        self.au_mot("on ne peut pas conclure que v égale w")
        b3 = self.col(VGroup(self.croix(r=0.13),
                             VGroup(self.sans_audit(self.vexpr("si u · v = u · w,",
                                                               ("u", "v", "w"), fs, C_PIEGE)),
                                    self.t("on ne conclut PAS", fs, C_PIEGE),
                                    self.sans_audit(self.vexpr("que v = w", ("v", "w"),
                                                               fs, C_PIEGE)))
                             .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
                      .arrange(RIGHT, buff=0.22, aligned_edge=UP), -0.35)
        self.play(FadeIn(b3, shift=RIGHT * 0.12), run_time=0.6)

        # ── le contre-exemple : trois vecteurs, SANS AXES ─────────────────
        # ⛔⛔ PAS D'AXES ICI, et c'est la leçon de l'épisode 6 transposée : u = (1;0;0),
        # v = (0;1;0) et w = (0;0;1) sont EXACTEMENT les trois vecteurs de base. Tracés
        # dans un repère, ils se superposeraient trait pour trait aux trois axes — on
        # verrait trois flèches doublées, et les noms u, v, w tomberaient sur x, y, z.
        # ⭐ Les trois flèches SONT le repère : elles se suffisent, avec leurs noms.
        self.au_mot("Exemple")
        # ⚠️ u = 1,45 et non 1,05, VU À LA PLANCHE : à 1,05 les trois flèches tenaient dans
        # 1,22 × 1,47, c'est-à-dire trois traits de 1 cm à l'écran d'un téléphone. Elles
        # sont LA figure de l'écran, et la place à gauche est libre.
        r = Repere3D(o=np.array([-5.00, -1.30, 0.0]), u=1.45, portee=2)
        fleches = []
        for nom, t3, coul, dec, extrait in (
                # ⛔ LE `decal` DE CHAQUE ÉTIQUETTE EST CHOISI CONTRE LA DIRECTION DU
                # VECTEUR, et c'est un défaut vu au gros plan : `w` monte, donc `UP`
                # posait son étiquette sur le fût et la flèche de l'étiquette percutait
                # la pointe du vecteur. u part à droite → étiquette DESSOUS ; v fuit en
                # diagonale → en haut à DROITE ; w monte → à GAUCHE.
                # ⚠️ v est COURT en cavalière (le projeté de (0 ; 1 ; 0) fait 0,41 ; 0,287),
                # donc son milieu est près de l'origine : `DR` posait son étiquette
                # exactement sur le fût de u, qui est horizontal. Vu au gros plan.
                ("u", U06, C_VECTEUR, DOWN, "u de coordonnées 1, 0, 0"),
                ("v", V06, C_VECTEUR2, UR, "v de coordonnées 0, 1, 0"),
                ("w", W06, C_PLAN, LEFT, "w de coordonnées 0, 0, 1")):
            f = r.vecteur((0, 0, 0), t3, nom, couleur=coul, sw=7, fs=28, decal=dec)
            fleches.append((f, extrait))
        # ⚠️ 0,30 et non 0,45, MESURÉ AU DRY RUN : la voix enchaîne « w de coordonnées
        # 0, 0, 1 » et « Les deux produits scalaires valent zéro » sans respirer, et à
        # 0,45 la ligne suivante sortait en RETARD de 0,30 s.
        for f, extrait in fleches:
            self.au_fin(extrait)
            self.play(GrowArrow(f[0]), FadeIn(f.nom), run_time=0.30)

        # ⚠️ Posés à −2,45 et −3,15, SOUS la colonne de droite (dernier bloc à −0,86) :
        # la largeur y est libre jusqu'à Ti-Margo, donc xmax = 4,6.
        self.au_mot("Les deux produits scalaires valent zéro")
        deux = VGroup(self.sans_audit(self.vexpr("u · v =", ("u", "v"), 30, WHITE)),
                      self.zero(30, VERT_OK), self.t("et", 28, GREY_A),
                      self.sans_audit(self.vexpr("u · w =", ("u", "w"), 30, WHITE)),
                      self.zero(30, VERT_OK))
        deux.arrange(RIGHT, buff=0.18)
        self.gauche(deux, -2.45, xmax=4.6)
        self.play(FadeIn(deux, shift=RIGHT * 0.12), run_time=0.6)
        self.au_mot("v et w sont deux vecteurs complètement différents")
        pt = self.sans_audit(self.vexpr("et pourtant v ≠ w", ("v", "w"), 34, C_PIEGE))
        cadp = SurroundingRectangle(pt, color=C_PIEGE, buff=0.14, stroke_width=3)
        # ⚠️ −3,17 et non −3,20 : la flèche de v⃗ et celle de w⃗ montent de 0,13
        # au-dessus du texte, et le bas du cadre tombait à −3,59 — sous la marge de
        # 3 % (−3,573). Une notation qui change la HAUTEUR d'un bloc oblige à recompter
        # tout ce qui est posé en bas d'écran.
        self.gauche(VGroup(pt, cadp), -3.17, xmax=4.6)
        self.play(FadeIn(pt, scale=1.08), Create(cadp), run_time=0.7)
        self.attendre_voix(marge=0.5)

    # ── 07 : question-pause n° 2 (bonne réponse : A) ────────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        t0 = self.renderer.time
        self.dire("07-question")
        self.au_mot("Question !")
        # ⛔ AUCUNE figure : deux flèches dessinées perpendiculaires donneraient la réponse.
        # ⚠️ Cartes de 6,3 à partir de x = 0,35 (donc jusqu'à 6,65) : la donnée de gauche
        # s'arrête avant x = 0,15, d'où xmax = −0,1 — c'est le réglage de l'épisode 5,
        # et il est nécessaire ici parce que « l'un des deux est le vecteur nul » fait
        # 36 caractères, qu'une carte de 4,1 ramènerait à ~15 px.
        fs = 30
        don = VGroup(VGroup(self.sans_audit(self.vexpr("u · v =", ("u", "v"), fs, WHITE)),
                            self.zero(fs, C_REGARD)).arrange(RIGHT, buff=0.18),
                     VGroup(self.sans_audit(self.vexpr("u ≠", ("u",), fs, WHITE)),
                            self.zero(fs, WHITE), self.t("et", 26, GREY_A),
                            self.sans_audit(self.vexpr("v ≠", ("v",), fs, WHITE)),
                            self.zero(fs, WHITE))
                     .arrange(RIGHT, buff=0.16))
        don.arrange(DOWN, aligned_edge=LEFT, buff=0.22)
        self.gauche(don, 1.55, xmax=-0.1)
        tete, q, cartes, pause, rebours = self.q_tete(
            ["que peut-on dire ?"],
            [self.t("ils sont orthogonaux", 28), self.t("ils sont colinéaires", 28),
             self.choix2("l'un des deux est", "le vecteur nul", fs=28)],
            largeur=6.3, xl=0.35)
        self.play(FadeIn(tete, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("Le produit scalaire de u et v est nul")
        self.play(FadeIn(don[0], shift=RIGHT * 0.1), run_time=0.45)
        self.au_mot("ni u ni v n'est le vecteur nul")
        self.play(FadeIn(don[1], shift=RIGHT * 0.1), run_time=0.45)
        self.au_mot("Que peut-on dire ?")
        self.play(FadeIn(q, shift=RIGHT * 0.1), run_time=0.45)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "07", t0, "A")
        self.mem_q2 = (cartes, pause, rebours)

    def ecran_reponse2(self):
        cartes, pause, rebours = self.mem_q2
        self.dire("07b-reponse")
        self.q_reponse(cartes, 0, pause, rebours)
        fs = 28
        # ⭐⭐ DEUX LARGEURS, parce que les cartes ne descendent que jusqu'à un certain
        # point : le premier bloc les LONGE (xmax = −0,1), les trois autres passent
        # DESSOUS et prennent toute la largeur jusqu'à Ti-Margo (xmax = 4,6).
        # ⚠️ Comptés du bas vers le haut : le dernier bloc est un cadre d'une ligne.
        # ⚠️ 26 et non 28, MESURÉ : à 28 ce bloc fait 6,63 pour les 6,40 que laissent les
        # cartes (xmax = −0,1), donc `gauche()` le rétrécissait.
        self.au_mot("c'est la définition même de l'orthogonalité")
        l1 = VGroup(self.coche(VERT_OK, 0.14),
                    VGroup(self.t("produit nul, vecteurs non nuls :", 26, VERT_OK),
                           self.t("c'est LA définition", 26, VERT_OK),
                           self.t("de l'orthogonalité", 26, VERT_OK))
                    .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
        l1.arrange(RIGHT, buff=0.20, aligned_edge=UP)
        self.gauche(l1, -0.45, xmax=-0.1)
        self.play(FadeIn(l1, shift=RIGHT * 0.12), run_time=0.6)
        # ⭐ UN SEUL BLOC DE DEUX LIGNES, et c'est une contrainte de PLACE : en trois
        # blocs séparés, la conclusion encadrée n'avait plus la hauteur de tenir
        # au-dessus de la marge (−3,573) sans toucher le bloc du dessus.
        self.au_mot("Colinéaires, c'est au contraire le cas extrême opposé")
        l2 = VGroup(self.croix(r=0.12),
                    VGroup(self.t("colinéaires : le cas extrême OPPOSÉ —", 26, C_PIEGE),
                           self.sans_audit(
                               self.t("le produit scalaire y vaut le produit des normes",
                                      26, C_PIEGE)))
                    .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
        l2.arrange(RIGHT, buff=0.18, aligned_edge=UP)
        self.gauche(l2, -1.95, xmax=4.6)
        self.play(FadeIn(l2[0], shift=RIGHT * 0.12), FadeIn(l2[1][0], shift=RIGHT * 0.12),
                  run_time=0.5)
        # ⛔ `l2[1][1]` et non `l2[1]` : le bloc est passé de une à deux lignes, et un
        # `play` qui porte sur le groupe entier rejouerait la première (défaut de E6 :
        # « une ligne qui existe, bien placée, et jamais jouée »).
        self.au_mot("il vaut le produit des normes")
        self.play(FadeIn(l2[1][1], shift=RIGHT * 0.12), run_time=0.5)
        # ⛔ DEUX LIGNES, MESURÉ : d'un seul tenant cette phrase et son cadre font 11,89
        # pour 11,10 offerts. ⚠️ Et à −3,00 le bas du cadre tombe à −3,545 : il passe de
        # 3 centièmes (c'est la même marge qu'au dernier écran de l'épisode 6).
        self.au_mot("la réponse C se contredit elle-même")
        l3 = VGroup(self.t("la réponse C se contredit elle-même :", 26, C_REGARD),
                    self.t("lis toujours l'énoncé jusqu'au bout", 26, C_REGARD))
        l3.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
        cad = SurroundingRectangle(l3, color=C_REGARD, buff=0.14, stroke_width=3)
        self.gauche(VGroup(l3, cad), -3.00, xmax=4.6)
        self.play(FadeIn(l3[0], shift=UP * 0.1), Create(cad), run_time=0.5)
        self.au_mot("Lis toujours l'énoncé jusqu'au bout")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.45)
        self.attendre_voix(marge=0.5)

    # ── 08 : les deux lignes de la copie ───────────────────────────────────

    def ecran_rediger(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-rediger")
        self.au_mot("Au bac, deux lignes suffisent")
        titre = self.t("Deux lignes, mais écrites", 44, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.8)
        # ⚠️ hauteur 3,0 et centre −0,45 : la copie descend à −1,95, au-dessus du rappel
        # posé dessous, qui s'arrête à −3,00 (marge : −3,573).
        copie = RoundedRectangle(width=10.2, height=3.0, corner_radius=0.18,
                                 stroke_color=GREY_B, stroke_width=3, fill_color="#0b1220",
                                 fill_opacity=1).move_to(P(-0.6, -0.45))
        marge = Line(copie.get_corner(UL) + RIGHT * 0.75 + DOWN * 0.1,
                     copie.get_corner(DL) + RIGHT * 0.75 + UP * 0.1, stroke_width=2,
                     color=ROUGE_ERREUR)
        self.play(Create(copie), Create(marge), run_time=0.6)
        # ⛔ 24 ET DES LIGNES COURTES, ET C'EST UNE MESURE : la première version faisait
        # 11,27 de large pour les 8,60 que la copie offre — `scale_to_fit_width` les
        # ramenait à **19,8 px**, c'est-à-dire que le MODÈLE DE RÉDACTION devenait le plus
        # petit texte de l'épisode (défaut n° 3 de l'épisode 3). Ici rien n'est réduit.
        fs = 24
        points = ((("les coordonnées de u et de v", ("u", "v")),
                   C_VECTEUR, "dans le repère orthonormé"),
                  ("la somme des trois produits, signes visibles",
                   C_REGARD, "on écrit la somme des trois produits"),
                  ("puis seulement le résultat", VERT_OK, "avant de donner le résultat"))
        rangs, extraits = [], []
        for k, (txt, coul, extrait) in enumerate(points, start=1):
            corps = (self.vexpr(txt[0], txt[1], fs, coul) if isinstance(txt, tuple)
                     else self.t(txt, fs, coul))
            rangs.append(VGroup(self.pastille(k), self.sans_audit(corps))
                         .arrange(RIGHT, buff=0.30))
            extraits.append(extrait)
        lignes = VGroup(*rangs).arrange(DOWN, aligned_edge=LEFT, buff=0.34)
        # ⛔ VU AU GROS PLAN SUR L'ÉPISODE 5 : à 9,1 le dernier caractère SORTAIT de la
        # copie. La place réelle : la copie va jusqu'à x = 4,5, le texte commence après
        # la marge rouge à −4,65, il reste 9,15 — 8,6 laisse 0,55.
        if lignes.width > 8.6:
            lignes.scale_to_fit_width(8.6)
        lignes.move_to(copie.get_center()).align_to(marge.get_center() + RIGHT * 0.3, LEFT)
        for b, extrait in zip(rangs, extraits):
            self.au_mot(extrait)
            self.play(FadeIn(b[0], scale=1.3), FadeIn(b[1], shift=RIGHT * 0.15),
                      run_time=0.5)
        # ⛔ DEUX LIGNES, MESURÉ : d'un seul tenant ce rappel fait 12,26 de large et sort
        # de la marge de 3 % des DEUX côtés (−6,73 et 5,53). `BORDS=1` l'aurait dit au
        # dry run ; la mesure le dit avant.
        self.au_mot("Le correcteur cherche la ligne de calcul")
        rappel = VGroup(self.t("le correcteur cherche la ligne de calcul,", 26, C_REGARD),
                        self.t("pas seulement le nombre", 26, C_REGARD))
        rappel.arrange(DOWN, buff=0.08)
        cad = SurroundingRectangle(rappel, color=C_REGARD, buff=0.12, stroke_width=3)
        VGroup(rappel, cad).next_to(copie, DOWN, buff=0.28)
        self.play(FadeIn(rappel, shift=UP * 0.1), Create(cad), run_time=0.7)
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
        # ⛔ LE DESSIN PORTE LA DONNÉE, JAMAIS LA RÉPONSE : le cube et son repère, oui ;
        # les trois vecteurs A G, A B et A C, NON — ce sont eux qu'on demande de
        # calculer, et les tracer avant la pause fait la moitié du travail.
        # ⚠️ Repère MESURÉ : o = (−5,3 ; 0,25), u = 1,3.
        r, cube = self.cube_repere(o=(-5.3, 0.25), u=1.3)
        self.au_mot("Dans le cube")
        self.play(FadeIn(cube), run_time=0.7)
        # ⭐ « d'arête 1 » est dit par la voix, et c'est la donnée qui rend le calcul
        # possible : elle est écrite, dans la colonne de droite.
        # ⛔ ET ELLE PASSE AVANT LE REPÈRE, parce que la voix le dit dans CET ordre
        # (« dans le cube A B C D E F G H d'arête 1, avec le repère A, A B, A D, A E »).
        # Posé après, cet au_fin remontait de 0,35 s dans le temps — `verifier-avant-rendu`
        # l'a dit, et c'est exactement le défaut d'ordre payé sur l'écran 04b de E6.
        self.au_fin("d'arête 1")
        ar = self.col(VGroup(self.t("cube d'arête", 30, C_REGARD),
                             self.t("1", 32, VERT_OK)).arrange(RIGHT, buff=0.18), 2.55)
        # ⚠️ 0,25 et non 0,5 : la voix enchaîne « d'arête 1 » et « avec le repère » en
        # 0,35 s, et `verifier-avant-rendu` annonce « RETARD probable » parce qu'il ne
        # connaît pas le `run_time` (piège n° 32 des entiers). C'est son GARDE-FOU, pas
        # la mesure : on écrit pourquoi l'écart est tenu, et le dry run tranche.
        self.play(FadeIn(ar, shift=RIGHT * 0.12), run_time=0.25)
        self.au_mot("avec le repère A, A B, A D, A E")
        base = self.sans_audit(self.base_repere(r))
        self.play(*[GrowArrow(v[0]) for v in base], run_time=0.7)

        # ⛔⛔ LES DEUX QUESTIONS VONT À GAUCHE, SOUS LE CUBE : dans la colonne de droite
        # elles font plus de 6 de large pour 4,40 offerts, donc `col()` les rétrécirait
        # — c'est-à-dire que ce que l'élève doit LIRE pendant qu'il met pause deviendrait
        # le plus petit texte de la vidéo (défaut payé sur l'épisode 6).
        fs = 26
        questions = (((("calcule le produit scalaire", ()),
                       ("de A G et A B", ("A G", "A B"))),
                      "Première question", "calcule le produit scalaire de A G et A B"),
                     ((("puis celui de A G et A C", ("A G", "A C")),),
                      "Deuxième", "puis celui de A G et A C"))
        blocs = []
        for k, (lignes_q, _, _) in enumerate(questions, start=1):
            corps = VGroup(*[self.vexpr(x, n, fs, WHITE) if n else self.t(x, fs, WHITE)
                             for x, n in lignes_q])
            corps.arrange(DOWN, aligned_edge=LEFT, buff=0.08)
            blocs.append(self.gauche(VGroup(self.pastille(k), corps)
                                     .arrange(RIGHT, buff=0.26, aligned_edge=UP),
                                     (-1.25, -2.25)[k - 1], xmax=4.6))
        # ⚠️ La voix ne dit « Première question » ni « Deuxième » nulle part : les deux
        # consignes s'enchaînent dans une seule phrase. On pose donc la pastille ET le
        # corps au même mot, sans ancre intermédiaire (piège n° 5 des entiers : deux
        # au_mot à moins de 0,6 s sortent en RETARD).
        for b, (_, _, extrait) in zip(blocs, questions):
            self.au_mot(extrait)
            self.play(FadeIn(b[0], scale=1.3), FadeIn(b[1], shift=RIGHT * 0.12),
                      run_time=0.5)

        # ⚠️ Le compte à rebours est posé À CÔTÉ de la pause et non dessous : à cette
        # hauteur-là, dessous, il sortirait du cadre.
        self.au_mot("Mets pause, et cherche")
        pause = self.gauche(self.t("Mets pause, et cherche !", 30, ORANGE_RETENUE), -3.10,
                            xmax=4.6)
        rebours = CompteARebours(5, r=0.34, fs=32).next_to(pause, RIGHT, buff=0.35)
        self.play(FadeIn(pause, scale=0.85), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        self.mem_defi = (r, cube, base, ar, VGroup(*blocs), pause, rebours)

    def ecran_correction(self):
        r, cube, base, ar, blocs, pause, rebours = self.mem_defi
        # ⛔ L'écran de correction HÉRITE de l'écran de défi, et l'héritage descend plus
        # bas qu'on ne croit (payé sur E3 PUIS sur E5). Ce qui s'efface : les deux
        # questions, la pause, le rebours — ET les trois flèches du repère, parce que
        # A B est l'une d'elles : laissées en place, la flèche bleue de la correction se
        # superposerait trait pour trait à celle de la base, et on lirait une arête
        # doublée au lieu d'un vecteur. Ce qui RESTE : le cube et « cube d'arête 1 ».
        self.play(FadeOut(blocs), FadeOut(pause), FadeOut(rebours), FadeOut(base),
                  run_time=0.3)
        self.dire("09b-correction")
        fs = 26
        # ── ① A G ─────────────────────────────────────────────────────────
        self.au_fin("A G a pour coordonnées 1, 1, 1")
        fAG = r.vecteur(S["A"], S["G"], None, couleur=C_REGARD, sw=7)
        bAG = self.col(self.nomme("A G", S["G"], C_REGARD, 30), 1.60)
        self.play(GrowArrow(fAG[0]), FadeIn(bAG, shift=RIGHT * 0.12), run_time=0.6)
        # ── ② A G · A B = 1 ───────────────────────────────────────────────
        self.au_fin("A B a pour coordonnées 1, 0, 0")
        fAB = r.vecteur(S["A"], S["B"], None, couleur=C_VECTEUR, sw=7)
        bAB = self.col(self.nomme("A B", S["B"], C_VECTEUR, 30), 0.70)
        self.play(GrowArrow(fAB[0]), FadeIn(bAB, shift=RIGHT * 0.12), run_time=0.6)
        # ⛔ TROIS LIGNES, ET C'EST UNE MESURE : même coupée en deux, cette ligne faisait
        # 4,51 pour les 4,40 de la colonne de droite, donc `col()` la rétrécissait — et
        # c'est LE calcul que le défi demande. Le « = 1 » part donc à la ligne.
        self.au_fin("1 fois 1, plus 1 fois 0, plus 1 fois 0, donc 1")
        c1 = self.col(VGroup(self.sans_audit(self.vexpr("A G · A B =", ("A G", "A B"),
                                                        fs, GREY_A)),
                             VGroup(self.t("1 × 1 + 1 ×", fs, WHITE), self.zero(fs),
                                    self.t("+ 1 ×", fs, WHITE), self.zero(fs))
                             .arrange(RIGHT, buff=0.14),
                             VGroup(self.t("=", fs, WHITE), self.t("1", 32, VERT_OK))
                             .arrange(RIGHT, buff=0.14))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.10), -0.30)
        self.play(FadeIn(c1, shift=RIGHT * 0.12), run_time=0.6)
        # ── ③ A G · A C = 2 ───────────────────────────────────────────────
        # ⚠️ −1,25 et non −1,10, VU À LA PLANCHE : le bloc du dessus fait TROIS lignes
        # (il descend à −0,84) et « A C (1 ; 1 ; 0) » montait à −0,91. Deux centièmes
        # d'écart au calcul, deux textes qui se touchent à l'image.
        self.au_fin("A C a pour coordonnées 1, 1, 0")
        fAC = r.vecteur(S["A"], S["C"], None, couleur=C_VECTEUR2, sw=7)
        bAC = self.col(self.nomme("A C", S["C"], C_VECTEUR2, 30), -1.25)
        self.play(GrowArrow(fAC[0]), FadeIn(bAC, shift=RIGHT * 0.12), run_time=0.6)
        self.au_fin("1 plus 1 plus 0, donc 2")
        c2 = self.col(VGroup(self.sans_audit(self.vexpr("A G · A C =", ("A G", "A C"),
                                                        fs, GREY_A)),
                             VGroup(self.t("1 + 1 +", fs, WHITE), self.zero(fs),
                                    self.t("=", fs, WHITE), self.t("2", 32, VERT_OK))
                             .arrange(RIGHT, buff=0.14))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.10), -2.00)
        self.play(FadeIn(c2, shift=RIGHT * 0.12), run_time=0.6)

        # ── la prudence, à GAUCHE sous le cube ────────────────────────────
        # ⭐⭐ C'EST LA PHRASE LA PLUS IMPORTANTE DE L'ÉPISODE, et c'est pour ça qu'elle
        # est encadrée en bas : deux produits scalaires ne se comparent pas pour comparer
        # deux angles, parce que les normes diffèrent (‖A B‖ = 1 et ‖A C‖ = √2). Ici le
        # plus GRAND produit correspond d'ailleurs au plus PETIT angle — l'assert en tête
        # de fichier le vérifie, et personne ne l'aurait vu à l'écran.
        self.au_mot("Les deux résultats sont positifs")
        pos = self.gauche(self.t("les deux résultats sont positifs", 28, VERT_OK),
                          -1.20, xmax=1.9)
        self.play(FadeIn(pos, shift=UP * 0.1), run_time=0.5)
        # ⛔⛔ DEUX LIGNES *ET* xmax = 1,9, et les deux sont des mesures : d'un seul tenant
        # la phrase fait 11,42 pour 11,10 offerts ; et surtout, à cette hauteur-là la
        # colonne de droite est encore occupée (« A G · A C » descend à −2,35), donc un
        # bloc posé jusqu'à x = 4,6 s'écrirait PAR-DESSUS. C'est le défaut n° 1 de
        # l'épisode 3, attrapé ici par la mesure et non par la planche.
        self.au_mot("on ne peut pas comparer directement ces deux nombres")
        att = self.gauche(VGroup(self.croix(r=0.12),
                                 VGroup(self.t("on ne compare PAS ces deux nombres :",
                                               26, C_PIEGE),
                                        self.t("les normes diffèrent", 26, C_PIEGE))
                                 .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
                          .arrange(RIGHT, buff=0.18, aligned_edge=UP), -2.38, xmax=1.9)
        self.play(FadeIn(att, shift=RIGHT * 0.12), run_time=0.6)
        self.au_mot("il faudra diviser par les normes")
        ang = self.t("pour les angles : on divise par les normes", 28, C_REGARD)
        cad = SurroundingRectangle(ang, color=C_REGARD, buff=0.14, stroke_width=3)
        self.gauche(VGroup(ang, cad), -3.20, xmax=4.6)
        self.play(FadeIn(ang, scale=1.05), Create(cad), run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 10 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-finale")
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(tit), run_time=0.7)
        # ⚠️ 28 ET NON 30, MESURÉ : à 30 le bloc fait 11,05 pour un plafond de 10,60,
        # donc il était réduit de 4 % sans que rien ne le dise. À 28, aucune réduction.
        fs = 28
        faits = (
            # ⛔ MESURÉ : avec « la somme des trois produits de coordonnées » le bloc fait
            # 14,52 pour un plafond de 10,60 — `scale_to_fit_width` l'aurait réduit de
            # 27 %, soit 30 px ramenés à 21,9. La FINALE est l'écran que l'élève relit :
            # elle ne peut pas être le plus petit texte de la vidéo.
            (("repère orthonormé :", C_REGARD),
             ("la somme des trois produits", WHITE),
             "Dans un repère orthonormé"),
            (("le résultat :", C_POINT), ("un nombre, jamais un vecteur", WHITE),
             "Le résultat est un nombre"),
            ((("u · u :", ("u",)), C_VECTEUR), ("le carré de la norme", WHITE),
             "Le produit scalaire d'un vecteur par lui-même"),
            (("produit scalaire nul :", C_PLAN), ("orthogonaux", VERT_OK),
             "un produit scalaire nul signifie orthogonal"),
        )
        blocs = []
        for (g, cg), (d, cd), _ in faits:
            gauche_ = (self.vexpr(g[0], g[1], fs, cg) if isinstance(g, tuple)
                       else self.t(g, fs, cg))
            blocs.append(VGroup(self.sans_audit(gauche_), self.t(d, fs, cd))
                         .arrange(RIGHT, buff=0.22))
        lignes = VGroup(*[VGroup(self.coche(), b).arrange(RIGHT, buff=0.3, aligned_edge=UP)
                          for b in blocs])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.45)
        # ⚠️ 10,6 de large, centré en x = −0,75 : le bloc s'arrête à 4,55, à l'écart de
        # Ti-Margo à scale 0,65 (boîte à partir de x = 5,30).
        if lignes.width > 10.6:
            lignes.scale_to_fit_width(10.6)
        lignes.move_to(P(-0.75, 0.10))
        for i, (_, _, extrait) in enumerate(faits):
            self.au_mot(extrait)
            self.play(Create(lignes[i][0]), FadeIn(blocs[i][0], shift=RIGHT * 0.2),
                      run_time=0.4)
            self.play(FadeIn(blocs[i][1], shift=RIGHT * 0.2), run_time=0.35)
        self.attendre_voix(marge=0.8)

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


class PsEspaceCalculerTerminale(PsEspaceCalculerBase):
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"
