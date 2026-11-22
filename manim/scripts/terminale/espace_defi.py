# espace_defi.py
# EleveAI — Maths Tle spé — paysage « Exercice type bac : géométrie dans l'espace » (16:9),
# ceinture VERTE. Micro du coach : espace_defi (notion geometrie_espace).
# Épisode 6 sur 12. Centre : jeux-defis (liste fermée lib/videos/centres-interet.ts,
# tranche 15-18).
#
# Clé de voix → écran :
#   · 00-garde      : titre, « un cube, un repère » / « quatre questions qui s'enchaînent » ;
#   · 01-situation  : la forme de l'exercice — un solide, un repère, quatre questions ;
#   · 02-idee       : LE TABLEAU DES HUIT SOMMETS — que des zéros et des uns ;
#   · 03-theoreme   : la boîte à outils, quatre objets, et le geste qui relie tout ;
#   · 04/04b        : question-pause n° 1 (le centre du cube → réponse A) ;
#   · 05-appliquer  : A, Ω et G alignés — A G = 2 A Ω ;
#   · 06-piege      : (A C) et (E B) SEMBLENT se croiser ; et l'arête vaut 1, pas 6 cm ;
#   · 07/07b        : question-pause n° 2 (alignement = colinéarité → réponse B) ;
#   · 08-rediger    : le squelette d'une copie en quatre points ;
#   · 09/09b        : le défi — P : x + z − 1 = 0, (A G), et leur intersection ;
#   · 10-finale     : « Ce que tu as appris » ;
#   · 11-abonne     : eleveai.fr + « Abonne-toi ! ».
#
# ⭐ Le socle d'écran est dans manim/poste2/espace_ecrans.py, les figures dans
#   manim/poste2/espace3d.py. ⛔ Une correction d'OUTIL se fait là-bas, jamais recopiée ici.
#
# ⛔⛔ CE QUI A ÉTÉ CORRIGÉ DANS UN OUTIL *AVANT* D'ÉCRIRE CET ÉPISODE, et c'est la
#   première chose à savoir : `manim/poste2/cues2marques-espace.py` perdait les marques
#   des DÉCIMALES RÉPÉTÉES. La note de reprise annonçait « 13 cues non placées » sur cette
#   voix ; mesuré, c'était pire que « non placées » — huit marques tombaient sur le MAUVAIS
#   mot. Le « 0,5 » du choix C de `04-question` portait 14,12 s au lieu de 17,32 s, et le
#   « 0,5 » final de `09b-correction` 36,69 s au lieu de 39,93 s. `q_montrer_choix` aurait
#   donc affiché les cartes B et C **trois et quatre secondes avant** que la voix les dise,
#   et rien ne l'aurait signalé : `verifier-avant-rendu.py` vérifie qu'une marque EXISTE à
#   l'offset, pas qu'elle est juste.
#   La cause, et la règle, sont écrites dans le convertisseur. Effet mesuré : 912 → 923
#   marques, 0 cue non placée, et les 10 autres voix de la série sont inchangées au diff —
#   sauf `espace_repere_coordonnees` (E2), dont le cas est documenté dans
#   manim/REPRISE-espace-terminale.md (son HD est livré, son fichier n'a PAS été régénéré).
#
# ⚠️ Cet épisode N'A PAS DE PERSONNAGE : sa voix ne nomme personne, son « contexte » est
#   l'exercice du bac lui-même. La figure à regarder au gros plan est donc LE CUBE, et c'est
#   elle qui porte les neuf écrans sur quinze. (Le recadrage ×2,5 reste obligatoire : sur
#   E4 et E5, la moitié des défauts de figure n'étaient visibles qu'en grand.)
# ⚠️ Bonne réponse : 04 → A, 07 → B (tirage graine 2211, table dans VOIX-espace-terminale.md).
#
# Voix : manim/voix/terminale-espace-defi.json (débit −6, Julie).
# Audit : AUDIT=1 BORDS=1 PYTHONIOENCODING=utf-8 python -X utf8 -m manim render -qh \
#   --disable_caching manim/scripts/terminale/espace_defi.py EspaceDefiTerminale \
#   --media_dir manim/scripts/terminale/media-espace-defi --dry_run

import sys
from pathlib import Path

# ⚠️ DEUX chemins : manim/poste2/ pour le socle et les figures, manim/ pour la charte.
sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "poste2"))
sys.path.insert(1, str(Path(__file__).resolve().parents[2]))

from manim import *  # noqa: E402,F403

import numpy as np  # noqa: E402

from espace3d import (C_DROITE, C_PIEGE, C_PLAN, C_POINT, C_REGARD,  # noqa: E402
                      C_VECTEUR, C_VECTEUR2, Repere3D, platitude)
from charte import *  # noqa: E402,F401,F403
from espace_ecrans import (CompteARebours, P, EcransEspace, equation_plan,  # noqa: E402
                           ligne_param, pastille_pause)

# ── le cube de l'énoncé, dans le repère (A ; AB, AD, AE) ───────────────────
# ⭐ C'est le cube de 9 épisodes sur 12, et ses huit sommets ne contiennent que des 0
# et des 1 : c'est TOUT le propos de l'écran 02.
S = {"A": (0, 0, 0), "B": (1, 0, 0), "C": (1, 1, 0), "D": (0, 1, 0),
     "E": (0, 0, 1), "F": (1, 0, 1), "G": (1, 1, 1), "H": (0, 1, 1)}
OMEGA = (0.5, 0.5, 0.5)                 # le centre du cube, milieu de [A G]
P09 = (1, 0, 1, -1)                     # le plan du défi : x + z − 1 = 0


def milieu(m, n):
    return tuple((m[i] + n[i]) / 2 for i in range(3))


def vaut(plan, m):
    """a x + b y + c z + d, évalué en m : ZÉRO si et seulement si m est dans le plan."""
    return plan[0] * m[0] + plan[1] * m[1] + plan[2] * m[2] + plan[3]


def cavaliere(m):
    """Le point projeté (x + 0,41 y ; z + 0,287 y), en unités de repère — pour vérifier
    HORS RENDU qu'une figure dit bien ce que l'écran prétend montrer."""
    return (m[0] + 0.41 * m[1], m[2] + 0.287 * m[1])


def se_croisent_a_lecran(a1, a2, b1, b2):
    """Les deux SEGMENTS projetés se croisent-ils à l'écran ? ⭐ C'est la mesure qui
    fonde l'écran 06 : il faut deux droites qui SEMBLENT se couper alors qu'elles ne
    sont pas coplanaires. Choisies à vue, elles ne se croisent pas (essayé : (A G) et
    (B D) ratent de 0,06)."""
    (x1, y1), (x2, y2) = cavaliere(a1), cavaliere(a2)
    (x3, y3), (x4, y4) = cavaliere(b1), cavaliere(b2)
    den = (x2 - x1) * (y4 - y3) - (y2 - y1) * (x4 - x3)
    if abs(den) < 1e-9:
        return None
    t = ((x3 - x1) * (y4 - y3) - (y3 - y1) * (x4 - x3)) / den
    s = ((x3 - x1) * (y2 - y1) - (y3 - y1) * (x2 - x1)) / den
    return (t, s) if 0 < t < 1 and 0 < s < 1 else None


def coplanaires(a, u, b, v):
    """Les deux droites (a, u) et (b, v) sont-elles coplanaires ? (déterminant nul)"""
    w = tuple(b[i] - a[i] for i in range(3))
    return abs(u[0] * (v[1] * w[2] - v[2] * w[1])
               - u[1] * (v[0] * w[2] - v[2] * w[0])
               + u[2] * (v[0] * w[1] - v[1] * w[0])) < 1e-9


# ── 04/05 : le centre du cube et l'alignement A, Ω, G ──────────────────────
assert OMEGA == milieu(S["A"], S["G"])                       # réponse A de la question 1
assert milieu(milieu(S["E"], S["G"]), milieu(S["F"], S["H"])) == (0.5, 0.5, 1)
# ⭐ le leurre C est le centre de la face du haut E F G H, et le leurre B est le sommet G
assert S["G"] == (1, 1, 1)
# « 1, 1, 1, c'est deux fois 0,5 ; 0,5 ; 0,5 » : A G = 2 A Ω, donc A, Ω, G alignés
assert S["G"] == tuple(2 * c for c in OMEGA)

# ── 06 : deux droites qui SEMBLENT se croiser et ne sont pas coplanaires ───
U_AC = tuple(S["C"][i] - S["A"][i] for i in range(3))        # (1 ; 1 ; 0)
V_EB = tuple(S["B"][i] - S["E"][i] for i in range(3))        # (1 ; 0 ; −1)
assert not coplanaires(S["A"], U_AC, S["E"], V_EB)
assert se_croisent_a_lecran(S["A"], S["C"], S["E"], S["B"]) is not None
# ⚠️ et elles n'ont AUCUN point commun : (t ; t ; 0) = (s ; 0 ; 1 − s) imposerait t = 0
# et s = 1 à la fois, donc t ≠ s. Vérifié par le déterminant ci-dessus (non coplanaires
# ⟹ aucun point commun), mais écrit ici parce que c'est la phrase de la voix.

# ── 09/09b : le défi ───────────────────────────────────────────────────────
assert vaut(P09, S["B"]) == 0 and vaut(P09, S["E"]) == 0      # question 1
assert vaut(P09, S["C"]) == 0 and vaut(P09, S["H"]) == 0      # la section est B C H E
assert vaut(P09, S["A"]) != 0 and vaut(P09, S["G"]) != 0      # A et G ne sont PAS dans P
# la droite (A G) passe par l'origine et porte (1 ; 1 ; 1) : x = t, y = t, z = t
assert [ligne_param(n, S["A"][i], S["G"][i]) for i, n in enumerate("xyz")] == \
    ["x = t", "y = t", "z = t"]
# on remplace : t + t − 1 = 0, donc 2t = 1, donc t = 0,5 — et le point est le CENTRE
assert vaut(P09, (0.5, 0.5, 0.5)) == 0 and (0.5, 0.5, 0.5) == OMEGA
# « la grande diagonale la traverse en son centre » : le centre de B C H E est bien Ω
assert milieu(milieu(S["B"], S["H"]), milieu(S["C"], S["E"])) == OMEGA
# les écritures, telles qu'elles seront à l'écran
assert equation_plan(*P09) == "x + z − 1 = 0"

# ⭐ `platitude` AVANT de poser le moindre morceau de plan (leçon de l'épisode 5) : la
# normale de P est (1 ; 0 ; 1), à 26,1° de la direction que la cavalière écrase. Au-dessus
# de 12°, le plan se dessine comme une surface — donc ici, PAS besoin de `plan_dessine`.
# ⭐⭐ Et mieux : la section de P dans le cube est le rectangle B C H E, un vrai
# quadrilatère du solide. On le dessine LUI, pas un morceau de plan flottant : c'est exact,
# et c'est la figure que l'élève doit garder (« une grande section rectangulaire du cube »).
assert platitude(P09[:3]) > 12


class EspaceDefiBase(EcransEspace):
    fichier_marques = "espace_defi_marques.json"
    nom_voix = "terminale-espace-defi"

    # ── le cube, partout le même ───────────────────────────────────────────

    def cube_repere(self, o, u, rouges=(), fs=24):
        """LE CUBE UNITÉ ABCDEFGH — ⛔ SANS AXES, et c'est une correction payée à l'image.

        ⭐ `cote=1` : dans le repère (A ; AB, AD, AE) l'arête VAUT 1, et c'est le second
        piège de l'écran 06. Un cube dessiné avec `cote=3` mettrait G en (3 ; 3 ; 3) sur
        des axes gradués — l'écran dirait alors le contraire de la leçon.

        ⛔⛔ VU SEULEMENT AU GROS PLAN (recadrage ×3), ET LE DÉFAUT ÉTAIT STRUCTUREL :
        dans CE repère-là, les trois axes sont PORTÉS PAR TROIS ARÊTES DU CUBE (A B, A D,
        A E). Dessinés avec `portee=2`, ils se superposent donc exactement aux arêtes sur
        leur première moitié — on ne voyait pas des axes, on voyait des arêtes grises
        doublées — et surtout **le bout de l\'axe des y tombe À L\'INTÉRIEUR du cube** : le
        projeté de (0 ; 2 ; 0) est (0,82 ; 0,57), et la silhouette du cube va jusqu\'à
        (1,41 ; 1,29). Résultat à l\'image : une flèche grise plantée dans le solide et un
        « y » italique collé sous le F. ⛔ Et allonger la portée n\'arrange rien avant 4,
        où les axes feraient quatre fois le cube.
        ⭐ C\'est la figure des manuels : pour un cube muni du repère (A ; AB, AD, AE), on
        dessine le cube, et le repère est DIT, pas tracé. L\'écran 02 le montre autrement,
        avec `base_repere` : trois flèches sur les trois arêtes qui partent de A.
        ⚠️ Et `u` est généreux (1,25 à 1,6) : à 0,95 l\'arête fait 0,95 à l\'écran quand une
        étiquette de sommet est posée à 0,26 — les noms se touchaient."""
        r = Repere3D(o=np.array([o[0], o[1], 0.0]), u=u, portee=2)
        cube = self.sans_audit(r.cube(cote=1, rouges=rouges, couleur=C_POINT, sw=4, fs=fs))
        return r, cube

    def base_repere(self, r, couleur=C_VECTEUR, sw=6):
        """LES TROIS VECTEURS DE BASE A B, A D, A E — le repère de l\'énoncé, montré.
        ⭐ Trois flèches posées SUR les trois arêtes qui partent de A : c\'est exactement
        ce que la voix dit (« avec le repère A, A B, A D, A E ») et ça ne demande aucun
        axe. ⛔ Sans lettres : les coordonnées sont dans le tableau, à droite, et un « y »
        posé au bout de A D tomberait dans le cube (voir `cube_repere`)."""
        return VGroup(*[r.vecteur(S["A"], S[s], None, couleur=couleur, sw=sw)
                        for s in ("B", "D", "E")])

    def diagonale(self, r, couleur=C_REGARD, sw=6):
        """La grande diagonale [A G] — la droite de l'alignement et du défi."""
        return Line(r.pt(*S["A"]), r.pt(*S["G"])).set_stroke(couleur, sw)

    def section_bche(self, r, couleur=C_PLAN, op=0.30, sw=3):
        """LA SECTION DU PLAN P : x + z − 1 = 0 DANS LE CUBE — le rectangle B C H E.

        ⛔ Pas `r.plan(...)` : un morceau de plan carré centré sur Ω ne coïnciderait avec
        AUCUN sommet, et l'écran 09b doit justement montrer que B, C, H et E sont dessus.
        ⭐ Ici les quatre coins SONT les quatre sommets, donc la figure ne peut pas mentir.
        (`platitude((1 ; 0 ; 1))` = 26,1° : ce plan-là se projette très bien, cf. l'assert
        en tête de fichier.)"""
        return Polygon(*[r.pt(*S[s]) for s in ("B", "C", "H", "E")], fill_color=couleur,
                       fill_opacity=op, stroke_color=couleur, stroke_width=sw)

    def coords(self, nom, xyz, fs=24, c_nom=C_REGARD, c_nb=WHITE):
        """« A (0 ; 0 ; 0) » : le nom du sommet, puis son triplet entre parenthèses."""
        g = VGroup(self.t(nom, fs, c_nom), self.t("(", fs, c_nb),
                   self.trip(xyz, fs, c_nb), self.t(")", fs, c_nb))
        g.arrange(RIGHT, buff=0.10)
        g.nb = g[2].nb
        return g

    # ── 00 : page de garde ─────────────────────────────────────────────────

    def ecran_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        ech = self.echelle().align_to(P(0, -3.45), DOWN)
        self.add(ech)
        titre = self.t("Exercice type bac", 50, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Exercice type bac")
        self.play(Write(titre), run_time=0.9)
        ident = self.t(self.identite, 26, GREY_A).next_to(titre, DOWN, buff=0.18)
        self.play(FadeIn(ident), run_time=0.3)
        # ⚠️ MESURÉ hors rendu : « quatre questions qui s'enchaînent » fait 6,68 à 38, donc
        # avec sa pastille le bloc fait 7,1 — centré en x = −0,9 il s'arrête à 2,65, loin
        # de Ti-Margo, dont la boîte commence à 4,87 à scale 0,8.
        fs = 38
        promesses = (("un cube, un repère", C_PLAN, "Un cube, un repère"),
                     ("quatre questions qui s'enchaînent", C_REGARD,
                      "quatre questions qui s'enchaînent"))
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
        fin = self.t("c'est l'exercice que tu auras", 32, VERT_OK).move_to(P(-0.9, -1.55))
        self.au_mot("c'est l'exercice que tu auras")
        self.play(FadeIn(fin, shift=UP * 0.12), run_time=0.7)
        self.attendre_voix(marge=0.8)

    # ── 01 : la forme de l'exercice ────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.au_mot("presque toujours la même forme")
        titre = self.t("Toujours la même forme", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.8)

        # ⚠️ Repère MESURÉ : o = (−5,1 ; −0,75), u = 1,3 → x ∈ [−5,41 ; −3,04],
        # y ∈ [−1,01 ; 1,22] — au-dessus des deux lignes posées à partir de −2,15.
        r, cube = self.cube_repere(o=(-5.1, -0.75), u=1.3)
        self.au_mot("Un solide, souvent un cube ou un pavé")
        self.play(FadeIn(cube), run_time=0.7)

        fs = 28
        un = self.col(VGroup(self.pastille(1),
                             VGroup(self.t("un solide : souvent", fs, C_POINT),
                                    self.t("un cube ou un pavé", fs, C_POINT))
                             .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
                      .arrange(RIGHT, buff=0.24, aligned_edge=UP), 2.55)
        self.play(FadeIn(un, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("Un repère donné par l'énoncé")
        deux = self.col(VGroup(self.pastille(2),
                               VGroup(self.t("un repère donné", fs, C_VECTEUR),
                                      self.t("par l'énoncé", fs, C_VECTEUR))
                               .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
                        .arrange(RIGHT, buff=0.24, aligned_edge=UP), 1.45)
        self.play(FadeIn(deux, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("une suite de questions qui montent")
        trois = self.col(VGroup(self.pastille(3),
                                VGroup(self.t("des questions", fs, C_REGARD),
                                       self.t("qui montent :", fs, C_REGARD))
                                .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
                         .arrange(RIGHT, buff=0.24, aligned_edge=UP), 0.35)
        self.play(FadeIn(trois, shift=RIGHT * 0.12), run_time=0.5)
        # ⭐ Les quatre maillons de la chaîne, un par mot de la voix. ⚠️ run_time court
        # (0,25) : la voix les enchaîne en moins d'une seconde chacun, et deux au_mot
        # séparés de moins de 0,6 s sortent en RETARD (piège n° 5 des entiers).
        maillons = (("des coordonnées", "des coordonnées"), ("une droite", "puis une droite"),
                    ("un plan", "puis un plan"), ("une intersection", "puis une intersection"))
        chaine = VGroup()
        for txt, _ in maillons:
            chaine.add(VGroup(self.t("→", 26, GREY_B), self.t(txt, 26, WHITE))
                       .arrange(RIGHT, buff=0.14))
        chaine.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        # ⛔⛔ −1,05 ET NON −1,15, ET L'ÉCART EST D'UN CENTIÈME. À −1,15 le bas de ce bloc
        # de quatre lignes tombe à **−1,96**, donc sous le −1,95 du garde-fou de `col()`
        # qui protège Ti-Margo : les quatre maillons étaient rétrécis de 3,45 à 2,50,
        # c'est-à-dire à **18,8 px**. Vu à la planche, pas par un outil — rien ne sort du
        # cadre, rien n'est en avance, le texte est simplement deux fois trop petit.
        self.col(chaine, -1.05, xl=2.8)
        for b, (_, extrait) in zip(chaine, maillons):
            self.au_mot(extrait)
            self.play(FadeIn(b, shift=RIGHT * 0.12), run_time=0.25)

        self.au_mot("Chaque question prépare la suivante")
        prep = self.gauche(self.t("chaque question prépare la suivante", 30, C_REGARD),
                           -2.15, xmax=1.6)
        self.play(FadeIn(prep, shift=UP * 0.1), run_time=0.5)
        # ⭐ La CONCLUSION va à gauche, sous la figure, en grand (défaut n° 4 de E3).
        self.au_mot("Celui qui connaît le fil ne se perd pas")
        fil = self.t("celui qui connaît le fil ne se perd pas", 34, VERT_OK)
        cad = SurroundingRectangle(fil, color=VERT_OK, buff=0.16, stroke_width=3)
        # ⛔ On pose le GROUPE texte + cadre : gauche() borne le TEXTE, pas le cadre.
        self.gauche(VGroup(fil, cad), -2.95, xmax=1.6)
        self.play(FadeIn(fil, scale=1.08), Create(cad), run_time=0.7)
        self.attendre_voix(marge=0.5)

    # ── 02 : le tableau des huit sommets ───────────────────────────────────

    def ecran_idee(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-idee")
        self.au_mot("La première chose à faire")
        titre = self.t("Avant tout calcul", 48, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.7)

        fs = 28
        self.au_mot("se placer dans le repère de l'énoncé")
        un = self.col(VGroup(self.pastille(1),
                             VGroup(self.t("se placer dans le", fs, C_VECTEUR),
                                    self.t("repère de l'énoncé", fs, C_VECTEUR))
                             .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
                      .arrange(RIGHT, buff=0.24, aligned_edge=UP), 2.55)
        self.play(FadeIn(un, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("écrire les coordonnées de tous les points utiles")
        deux = self.col(VGroup(self.pastille(2),
                               VGroup(self.t("écrire les coordonnées", fs, C_REGARD),
                                      self.t("de tous les points utiles", fs, C_REGARD))
                               .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
                        .arrange(RIGHT, buff=0.24, aligned_edge=UP), 1.45)
        self.play(FadeIn(deux, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("Le dessin sert à comprendre la situation")
        des = self.col(VGroup(self.t("le dessin sert", fs, GREY_A),
                              self.t("à comprendre", fs, GREY_A))
                       .arrange(DOWN, aligned_edge=LEFT, buff=0.08), 0.35)
        self.play(FadeIn(des, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("les coordonnées servent à démontrer")
        dem = self.col(VGroup(self.t("les coordonnées", fs, VERT_OK),
                              self.t("servent à démontrer", fs, VERT_OK))
                       .arrange(DOWN, aligned_edge=LEFT, buff=0.08), -0.75)
        self.play(FadeIn(dem, shift=RIGHT * 0.12), run_time=0.5)

        # ⚠️ Repère MESURÉ : o = (−5,2 ; 0,0), u = 1,25 → x ∈ [−5,51 ; −3,16],
        # y ∈ [−0,31 ; 1,92]. Il reste au-dessus du tableau des sommets (haut −2,17).
        r, cube = self.cube_repere(o=(-5.2, 0.0), u=1.25)
        self.au_mot("Dans le cube A B C D E F G H")
        self.play(FadeIn(cube), run_time=0.6)
        # ⭐ LE REPÈRE DE L\'ÉNONCÉ, MONTRÉ : trois flèches sur A B, A D et A E. C\'est le
        # seul écran de l\'épisode qui le dessine — les autres n\'en ont pas besoin, et des
        # axes tracés y seraient faux (voir `cube_repere`).
        self.au_mot("avec le repère A, A B, A D, A E")
        base = self.sans_audit(self.base_repere(r))
        self.play(*[GrowArrow(v[0]) for v in base], run_time=0.7)

        # ⭐⭐ LE TABLEAU DES HUIT SOMMETS, EN DEUX RANGÉES DE QUATRE : la base A B C D
        # au-dessus, le dessus E F G H en dessous. C'est l'écran que l'élève reviendra
        # chercher, et c'est pour ça qu'il est dans la largeur (8,1 de place à gauche
        # contre 4,4 dans la colonne de droite) et pas dans une colonne de huit lignes.
        # ⛔⛔ sans_audit, ET LA RAISON EST CELLE DE L'ÉPISODE 3 : la voix dit « les huit
        # sommets ne contiennent que des ZÉROS et des UNS », en toutes lettres. Les 24
        # chiffres du tableau sortiraient donc en AUDIT-ABSENT, un par nombre — 24 faux
        # signalements qui noieraient le seul vrai qu'on cherche. Ce tableau est la DONNÉE
        # d'une figure qu'on LIT, comme les étiquettes d'une droite graduée (piège n° 25
        # des entiers), pas un résultat qui s'enseigne.
        rangees = VGroup()
        for groupe in ("ABCD", "EFGH"):
            rangee = VGroup(*[self.coords(s, S[s], 24) for s in groupe])
            rangee.arrange(RIGHT, buff=0.42)
            rangees.add(rangee)
        rangees.arrange(DOWN, aligned_edge=LEFT, buff=0.26)
        self.sans_audit(rangees)
        # ⛔⛔ MESURÉ : ce tableau fait **9,25** de large, et `gauche(..., xmax=1.6)` ne lui
        # offre que 8,10 — il le rétrécissait donc à 21 px, c'est-à-dire que le TABLEAU DE
        # RÉFÉRENCE de l'épisode devenait son plus petit texte (défaut n° 4 de l'épisode 3).
        # ⭐ Le remède n'est pas la police, c'est la PLACE : à y = −2,55 la colonne de
        # droite est vide (son dernier bloc s'arrête à −1,10), donc le tableau prend toute
        # la largeur. Centré en x = −0,9 il va de −5,52 à 3,73 — loin de Ti-Margo (x ≥ 5,54).
        if rangees.width > 11.0:
            rangees.scale_to_fit_width(11.0)
        rangees.move_to(P(-0.9, -2.55))
        self.au_mot("les huit sommets ne contiennent que des zéros et des uns")
        self.play(FadeIn(rangees[0], shift=UP * 0.1), run_time=0.5)
        self.play(FadeIn(rangees[1], shift=UP * 0.1), run_time=0.5)
        self.attendre_voix(marge=0.5)

    # ── 03 : la boîte à outils ─────────────────────────────────────────────

    def ecran_theoreme(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-theoreme")
        self.au_mot("Ta boîte à outils")
        titre = self.t("Quatre objets, et ils suffisent", 44, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.8)
        fs = 30
        # ⭐ Un tableau se lit en RANGÉES sur toute la largeur, pas dans la colonne de
        # droite : chaque rangée est « l'outil → ce qu'il sert à démontrer ». Recette de
        # l'écran 03 de l'épisode 5 : on arrange, on borne à 10,6 et on centre en −0,75,
        # à l'écart de Ti-Margo (x ≥ 5,54).
        outils = (("coordonnées et milieux", C_POINT, None, "Un : coordonnées et milieux"),
                  ("la colinéarité", C_REGARD, "l'alignement et le parallélisme",
                   "la colinéarité, pour l'alignement et le parallélisme"),
                  ("la représentation paramétrique", C_DROITE, "une droite",
                   "la représentation paramétrique, pour une droite"),
                  ("l'équation cartésienne", C_PLAN, "un plan",
                   "l'équation cartésienne, pour un plan"))
        rangs, extraits = [], []
        for k, (gauche_, coul, pour, extrait) in enumerate(outils, start=1):
            morceaux = [self.pastille(k), self.t(gauche_, fs, coul)]
            if pour:
                morceaux += [self.t("→", fs, GREY_B), self.t(pour, fs, WHITE)]
            rangs.append(VGroup(*morceaux).arrange(RIGHT, buff=0.30, aligned_edge=UP))
            extraits.append(extrait)
        rangees = VGroup(*rangs).arrange(DOWN, aligned_edge=LEFT, buff=0.40)
        if rangees.width > 10.6:
            rangees.scale_to_fit_width(10.6)
        rangees.move_to(P(-0.75, 0.70))
        for b, extrait in zip(rangs, extraits):
            self.au_mot(extrait)
            self.play(FadeIn(b[0], scale=1.3), FadeIn(b[1:], shift=RIGHT * 0.15),
                      run_time=0.45)
        # ⭐ Le GESTE qui relie tout : encadré, en bas, sur toute la largeur.
        self.au_mot("le geste qui relie tout")
        geste = VGroup(self.t("le geste qui relie tout :", 30, GREY_A),
                       self.t("on remplace la droite dans l'équation du plan", 30, VERT_OK))
        geste.arrange(DOWN, buff=0.12)
        cad = SurroundingRectangle(geste, color=VERT_OK, buff=0.18, stroke_width=3)
        VGroup(geste, cad).move_to(P(-0.75, -2.30))
        self.play(FadeIn(geste[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("on remplace la droite dans l'équation du plan")
        self.play(FadeIn(geste[1], shift=UP * 0.1), Create(cad), run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 04 : question-pause n° 1 (bonne réponse : A) ────────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        t0 = self.renderer.time
        self.dire("04-question")
        self.au_mot("Question !")
        # ⛔ Le dessin porte la DONNÉE (le cube et son repère), jamais la RÉPONSE : ni la
        # grande diagonale, ni le point Ω. Les deux arrivent en 04b.
        # ⚠️ Repère MESURÉ : o = (−5,4 ; 0,35), u = 1,5 → x ∈ [−5,76 ; −2,91],
        # y ∈ [0,04 ; 2,65]. Les trois blocs de 04b descendent à partir de −0,26.
        r, cube = self.cube_repere(o=(-5.4, 0.35), u=1.5)
        self.play(FadeIn(cube), run_time=0.7)
        # ⚠️ Cartes de 4,9 à partir de x = 1,65, MESURÉ et pas choisi : les trois choix sont
        # des TRIPLETS, donc courts, mais « 0,5 ; 0,5 ; 0,5 » dépasse quand même les 2,20
        # qu'une carte de 4,1 offre à son texte — à 4,1 la carte A tombait à **26,4 px**
        # quand les deux autres tenaient à 32. À 4,9, les trois sont à **32,0 sans aucune
        # réduction**, et le bas des cartes remonte à −1,01 (la pause à −1,26, bien
        # au-dessus de la tête de Ti-Margo à −2,15).
        tete, q, cartes, pause, rebours = self.q_tete(
            ["quelles sont les coordonnées", "du centre du cube ?"],
            [self.trip(OMEGA, 32), self.trip(S["G"], 32), self.trip((0.5, 0.5, 1), 32)],
            largeur=4.9, xl=1.65)
        self.play(FadeIn(tete, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("quelles sont les coordonnées du centre du cube")
        self.play(FadeIn(q, shift=RIGHT * 0.1), run_time=0.45)
        # ⭐ q_montrer_choix retarde un TRIPLET jusqu'à son dernier nombre dit. C'est
        # EXACTEMENT ce que les marques corrigées rendent possible ici : avant le
        # correctif du convertisseur, les cartes B et C partaient 3 et 4 s trop tôt.
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "04", t0, "A")
        self.mem_q1 = (r, cartes, pause, rebours)

    def ecran_reponse1(self):
        r, cartes, pause, rebours = self.mem_q1
        self.dire("04b-reponse")
        # ⛔ On passe pause ET rebours : sans eux, « Mets pause, et choisis ! » et le
        # compte à rebours restent par-dessus l'explication (défaut n° 1 de l'épisode 1).
        self.q_reponse(cartes, 0, pause, rebours)
        fs = 28
        # ⭐⭐ LES TROIS BLOCS SONT COMPTÉS DU BAS VERS LE HAUT : la marge de 3 % s'arrête
        # à −3,573, le dernier bloc fait deux lignes (0,76 de haut), il est donc posé à
        # −3,00 au plus bas. Mesurés hors rendu, pas posés à vue.
        # ⚠️ L'ORDRE EST CELUI DE LA VOIX, et `verifier-avant-rendu` l'a dit : la première
        # version posait la FIGURE à « le milieu de la grande diagonale A G » (2,92 s) puis
        # le TEXTE à « Le centre du cube est le milieu » (1,71 s) — un au_mot qui remonte
        # dans le temps, donc un RETARD de 1,20 s dès le deuxième geste de l'écran.
        self.au_mot("Le centre du cube est le milieu")
        l1 = VGroup(self.t("le centre est le milieu de", fs, WHITE),
                    self.t("la grande diagonale A G", fs, C_REGARD))
        l1.arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        # ⚠️ xmax = 1,45 : les cartes de cet écran commencent à x = 1,65 et leur bas est
        # à −1,01, donc ce bloc-ci (−1,04 à −0,26) les longe et doit s'arrêter avant.
        self.gauche(l1, -0.65, xmax=1.45)
        self.play(FadeIn(l1[0], shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("la grande diagonale A G")
        diag = self.diagonale(r)
        om = self.sans_audit(r.point(*OMEGA, nom="Ω", couleur=VERT_OK, r=0.09, fs=26,
                                     decal=UL))
        self.play(FadeIn(l1[1], shift=RIGHT * 0.12), Create(diag), run_time=0.5)
        self.play(FadeIn(om, scale=1.4), run_time=0.4)
        # ⭐ xmax = 4,6 pour les trois blocs qui suivent, et c'est la même mesure que pour
        # le tableau de l'écran 02 : SOUS les cartes (bas −1,01) la largeur est libre
        # jusqu'à Ti-Margo (x ≥ 5,54). À xmax = 1,6 les deux leurres étaient rétrécis ;
        # ici aucun ne l'est.
        self.au_fin("on fait la moyenne de 0, 0, 0 et de 1, 1, 1")
        moy = self.gauche(VGroup(self.t("la moyenne de", fs, GREY_A),
                                 self.trip(S["A"], fs, WHITE), self.t("et de", fs, GREY_A),
                                 self.trip(S["G"], fs, WHITE)).arrange(RIGHT, buff=0.22),
                          -1.55, xmax=4.6)
        self.play(FadeIn(moy, shift=RIGHT * 0.12), run_time=0.6)
        # ⭐ Les deux leurres, nommés : le premier est un SOMMET, le second le centre
        # d'une FACE. C'est ce qui fait qu'ils s'excluent de la bonne réponse.
        self.au_fin("Le triplet 1, 1, 1")
        lB = VGroup(self.croix(r=0.13), self.trip(S["G"], fs, C_PIEGE),
                    self.t(": le sommet G lui-même", fs, C_PIEGE))
        lB.arrange(RIGHT, buff=0.20)
        self.gauche(lB, -2.25, xmax=4.6)
        self.play(FadeIn(lB[:2], shift=RIGHT * 0.12), run_time=0.5)
        # ⭐ PAS de au_mot ici, et c'est le remède du piège n° 6 des entiers : « c'est le
        # sommet G lui-même » est dit 0,35 s après la fin de « Le triplet 1, 1, 1 », donc
        # sous le garde-fou de 0,6 s. On ENCHAÎNE — la synchro de la ligne suivante la cale
        # toute seule, et rappeler au_mot ne produirait qu'un RETARD.
        self.play(FadeIn(lB[2], shift=RIGHT * 0.12), run_time=0.45)
        self.au_fin("Et 0,5 ; 0,5 ; 1")
        lC = VGroup(VGroup(self.croix(r=0.13), self.trip((0.5, 0.5, 1), fs, C_PIEGE),
                           self.t(": le centre de la face", fs, C_PIEGE))
                    .arrange(RIGHT, buff=0.20),
                    self.t("du haut E F G H — la hauteur 1 aurait dû t'alerter", 26, C_PIEGE))
        lC.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.gauche(lC, -3.00, xmax=4.6)
        self.play(FadeIn(lC[0], shift=RIGHT * 0.12), run_time=0.5)
        # ⚠️ au_fin ET SUR « la hauteur 1 » SEUL, pas sur la phrase entière : posée à
        # « la », cette ligne mettait son « 1 » à l'écran 0,13 s avant qu'il soit dit. Un
        # dixième de seconde ne se voit pas — et la tolérance est de 0 s.
        # ⛔⛔ Et il était CACHÉ derrière un `AUDIT-TARD` de 3,25 s : l'audit avait
        # rattaché ce « 1 » au « 1, 1, 1 » du début du clip. C'est la sixième fois de la
        # série qu'un gros TARD recouvre une vraie avance.
        self.au_fin("la hauteur 1")
        self.play(FadeIn(lC[1], shift=RIGHT * 0.12), run_time=0.5)
        self.attendre_voix(marge=0.5)

    # ── 05 : A, Ω et G sont alignés ────────────────────────────────────────

    def ecran_appliquer(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-appliquer")
        self.au_mot("Appliquons")
        titre = self.t("Montrons un alignement", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.7)
        # ⚠️ Repère MESURÉ : o = (−5,3 ; −1,60), u = 1,6 → x ∈ [−5,69 ; −2,65],
        # y ∈ [−1,91 ; 0,88]. La ligne de conclusion est posée à −2,80, dessous.
        r, cube = self.cube_repere(o=(-5.3, -1.60), u=1.6, rouges=("A", "G"))
        self.play(FadeIn(cube), run_time=0.7)
        self.au_mot("Montrons que A, le centre du cube et G sont alignés")
        diag = self.diagonale(r)
        self.play(Create(diag), run_time=0.6)
        self.au_mot("Appelons oméga ce centre")
        om = self.sans_audit(r.point(*OMEGA, nom="Ω", couleur=VERT_OK, r=0.09, fs=28,
                                     decal=UL))
        self.play(FadeIn(om, scale=1.4), run_time=0.45)
        self.play(Flash(om[0], color=VERT_OK, line_length=0.24), run_time=0.4)

        fs = 28
        self.au_fin("A oméga a pour coordonnées 0,5 ; 0,5 ; 0,5")
        b1 = self.col(VGroup(self.vec("A Ω", fs, VERT_OK), self.trip(OMEGA, fs, WHITE))
                      .arrange(RIGHT, buff=0.24), 2.45)
        self.play(FadeIn(b1, shift=RIGHT * 0.12), run_time=0.55)
        self.au_fin("A G a pour coordonnées 1, 1, 1")
        b2 = self.col(VGroup(self.vec("A G", fs, C_REGARD), self.trip(S["G"], fs, WHITE))
                      .arrange(RIGHT, buff=0.24), 1.60)
        self.play(FadeIn(b2, shift=RIGHT * 0.12), run_time=0.55)
        # ⛔⛔ `par=True` : un triplet MULTIPLIÉ veut ses parenthèses. Sans elles,
        # « 1 ; 1 ; 1 = 2 × 0,5 ; 0,5 ; 0,5 » se lit « 2 × 0,5 » et la ligne devient
        # FAUSSE — vu à la planche de l'épisode 3, et aucun audit ne peut le voir.
        # ⚠️ sans_audit sur le seul « 2 × » : la voix dit « deux fois », en lettres, et
        # l'écran écrit le produit. Le reste de la ligne reste sous audit.
        # ⛔ DEUX LIGNES, ET C'EST UNE MESURE : d'un seul tenant cette égalité fait 5,62 de
        # large, et la colonne de droite n'en offre que 4,40 — `col()` la rétrécissait donc,
        # c'est-à-dire que LA LIGNE QUI PORTE TOUTE LA DÉMONSTRATION devenait le plus petit
        # texte de l'écran (défaut n° 4 de l'épisode 3). Coupée après le « = », les deux
        # morceaux font 2,24 et 3,44 : aucun n'est touché.
        self.au_fin("Et 1, 1, 1, c'est deux fois 0,5 ; 0,5 ; 0,5")
        deux = self.sans_audit(self.t("2 ×", fs, C_REGARD))
        b3 = self.col(VGroup(VGroup(self.trip(S["G"], fs, C_REGARD), self.t("=", fs, GREY_A))
                             .arrange(RIGHT, buff=0.18),
                             VGroup(deux, self.trip(OMEGA, fs, WHITE, par=True))
                             .arrange(RIGHT, buff=0.18))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.10), 0.70)
        self.play(FadeIn(b3, shift=RIGHT * 0.12), run_time=0.6)
        self.au_mot("est donc égal à deux fois le vecteur A oméga")
        eg = self.sans_audit(self.vexpr("A G = 2 A Ω", ("A G", "A Ω"), 34, VERT_OK))
        cad = SurroundingRectangle(eg, color=VERT_OK, buff=0.14, stroke_width=3)
        self.col(VGroup(eg, cad), -0.20)
        self.play(FadeIn(eg, scale=1.1), Create(cad), run_time=0.6)
        self.au_mot("les deux vecteurs sont colinéaires")
        colin = self.col(VGroup(self.coche(VERT_OK, 0.15), self.t("colinéaires", 32, VERT_OK))
                         .arrange(RIGHT, buff=0.22), -1.10)
        self.play(FadeIn(colin, scale=1.1), run_time=0.5)
        self.au_mot("les trois points sont alignés")
        # ⚠️ −1,69 et non −1,85, MESURÉ : à −1,85 le bas du bloc tombe à −2,01, donc sous
        # le −1,95 du garde-fou de `col()` qui protège Ti-Margo — et comme il dépasse
        # x = 5,3, il était rétréci de 4,30 à 3,10. À −1,72 son bas est à −1,88 : il passe.
        # ⭐ C'est le défaut n° 4 de l'épisode 3 : le bas de la colonne de droite est
        # réservé aux lignes COURTES, et « A, Ω et G alignés » n'en est pas une.
        al = self.col(VGroup(self.coche(VERT_OK, 0.15), self.t("A, Ω et G alignés", 32, VERT_OK))
                      .arrange(RIGHT, buff=0.22), -1.69)
        self.play(FadeIn(al, scale=1.1), run_time=0.5)
        self.au_mot("Deux lignes, et c'est démontré")
        fin = self.gauche(self.t("deux lignes, et c'est démontré", 32, C_REGARD), -2.80,
                          xmax=1.6)
        self.play(FadeIn(fin, shift=UP * 0.1), run_time=0.6)
        self.attendre_voix(marge=0.5)

    # ── 06 : le piège — ne jamais conclure sur le dessin ───────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.au_mot("Voilà le piège")
        # ⛔ Le glyphe ⚠ ne se rend pas (carré « tofu ») : on DESSINE le triangle.
        bang = VGroup(Triangle(fill_color=C_PIEGE, fill_opacity=0.18, stroke_color=C_PIEGE,
                               stroke_width=4).scale(0.33),
                      Text("!", font_size=30, color=C_PIEGE, weight=BOLD).shift(DOWN * 0.05))
        titre = VGroup(bang, self.t("Ne conclus jamais sur le dessin", 40, C_PIEGE))
        titre.arrange(RIGHT, buff=0.3).to_edge(UP, buff=0.5)
        self.au_mot("Ne conclus jamais sur le dessin")
        self.play(Write(titre[1]), FadeIn(titre[0], scale=1.4), run_time=0.9)

        # ⭐⭐ LA FIGURE DE CET ÉCRAN EST UNE MESURE, PAS UN DESSIN D'INTENTION. Il faut
        # deux droites du cube qui SEMBLENT se couper à l'écran alors qu'elles ne sont pas
        # coplanaires. (A C) et (E B) le font : `se_croisent_a_lecran` les donne croisées
        # à (t ; s) = (0,59 ; 0,83) — deux paramètres différents, donc deux points
        # DIFFÉRENTS de l'espace qui se superposent à la projection. ⛔ Les paires
        # choisies à vue ratent : (A G) et (B H) se coupent VRAIMENT (au centre), et
        # (A G) et (B D) ne se croisent même pas à l'écran (0,348 contre 0,41).
        # ⚠️ Repère MESURÉ : o = (−5,1 ; −1,00), u = 1,3 → y ∈ [−1,31 ; 0,97]. Les trois
        # lignes du second piège sont posées à partir de −2,05 (haut −1,85).
        r, cube = self.cube_repere(o=(-5.1, -1.00), u=1.3)
        self.play(FadeIn(cube), run_time=0.6)
        self.au_mot("deux droites peuvent sembler se croiser")
        ac = Line(r.pt(*S["A"]), r.pt(*S["C"])).set_stroke(C_DROITE, 5)
        eb = Line(r.pt(*S["E"]), r.pt(*S["B"])).set_stroke(C_VECTEUR2, 5)
        t_croise = se_croisent_a_lecran(S["A"], S["C"], S["E"], S["B"])[0]
        faux = Circle(radius=0.17, stroke_color=C_PIEGE, stroke_width=4).move_to(
            r.pt(*[S["A"][i] + t_croise * U_AC[i] for i in range(3)]))
        self.play(Create(ac), Create(eb), run_time=0.7)
        self.play(Create(faux), run_time=0.35)

        fs = 28
        sem = self.col(VGroup(self.t("(A C) et (E B) semblent", fs, C_PIEGE),
                              self.t("se croiser ici", fs, C_PIEGE))
                       .arrange(DOWN, aligned_edge=LEFT, buff=0.08), 2.50)
        self.play(FadeIn(sem, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("alors qu'elles ne sont pas coplanaires")
        pas = self.col(VGroup(self.croix(r=0.13),
                              VGroup(self.t("elles ne sont pas", fs, WHITE),
                                     self.t("coplanaires", fs, WHITE))
                              .arrange(DOWN, aligned_edge=LEFT, buff=0.08))
                       .arrange(RIGHT, buff=0.22), 1.45)
        self.play(FadeIn(pas, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("un point peut sembler posé sur un plan sans y être")
        pt = self.col(VGroup(self.t("un point peut sembler", fs, WHITE),
                             self.t("posé sur un plan", fs, WHITE),
                             self.t("sans y être", fs, WHITE))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.08), 0.30)
        self.play(FadeIn(pt, shift=RIGHT * 0.12), run_time=0.55)
        self.au_mot("La figure sert à choisir la méthode")
        meth = self.col(VGroup(self.t("la figure sert à", fs, C_REGARD),
                               self.t("choisir la méthode", fs, C_REGARD))
                        .arrange(DOWN, aligned_edge=LEFT, buff=0.08), -0.85)
        self.play(FadeIn(meth, shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("la preuve est dans les coordonnées")
        prv = self.col(VGroup(self.t("la preuve est dans", fs, VERT_OK),
                              self.t("les coordonnées", fs, VERT_OK))
                       .arrange(DOWN, aligned_edge=LEFT, buff=0.08), -1.80)
        self.play(FadeIn(prv, shift=RIGHT * 0.12), run_time=0.5)

        # ⭐ LE SECOND PIÈGE, À GAUCHE SOUS LA FIGURE : l'arête vaut 1, pas 6 cm. C'est
        # pour ça que `cube_repere` dessine un cube de côté 1 et non de côté 3 (voir sa
        # docstring) — l'écran et la leçon doivent dire la même chose.
        self.au_mot("Deuxième piège, plus discret")
        d2 = self.gauche(self.t("deuxième piège, plus discret : le repère", 28, C_REGARD),
                         -2.05, xmax=1.9)
        self.play(FadeIn(d2, shift=UP * 0.1), run_time=0.5)
        self.au_mot("l'arête du cube vaut 1")
        # ⚠️ 28/32 et xmax = 4,6, MESURÉ : à 30/34 ce groupe fait 11,47 de large et
        # `gauche(..., xmax=1.6)` (8,10 offert) le rétrécissait. À 28/32 il fait 10,82, et
        # sous la colonne de droite (dernier bloc à −1,45) la largeur est libre jusqu'à
        # 4,6 — donc 11,10 : il passe sans réduction.
        ar = self.gauche(VGroup(self.t("l'arête du cube vaut", 28, WHITE),
                                self.t("1", 32, VERT_OK),
                                self.t(", même si ton brouillon dit", 28, WHITE),
                                self.t("6 cm", 32, C_PIEGE)).arrange(RIGHT, buff=0.16),
                         -2.65, xmax=4.6)
        # ⛔⛔ QUATRE GESTES ET NON DEUX, ET C'EST LE DRY RUN QUI L'A DIT : posés avec
        # leur phrase, le « 1 » arrivait **1,12 s** et le « 6 cm » **1,39 s** avant d'être
        # dits. C'est le piège n° 6 des entiers (« une ligne qui finit par un nombre se pose
        # à l'instant de CE nombre »), et il revient dès qu'un nombre clôt un membre de
        # phrase — ici deux fois dans la même ligne.
        self.play(FadeIn(ar[0], shift=RIGHT * 0.1), run_time=0.4)
        self.au_fin("l'arête du cube vaut 1")
        # ⚠️ 0,25 et non 0,3 : `verifier-avant-rendu` annonce « RETARD probable » ici,
        # parce que la voix enchaîne « vaut 1 » et « même si » en 0,35 s et qu'il ne
        # connaît pas le `run_time`. C'est son GARDE-FOU, pas la mesure (piège n° 32 des
        # entiers) : on écrit pourquoi l'écart est tenu, et on laisse le dry run trancher
        # — il mesure 0 RETARD.
        self.play(FadeIn(ar[1], scale=1.2), run_time=0.25)
        self.au_mot("même si le cube mesure")
        self.play(FadeIn(ar[2], shift=RIGHT * 0.1), run_time=0.4)
        self.au_fin("le cube mesure 6 centimètres")
        self.play(FadeIn(ar[3], scale=1.2), run_time=0.3)
        self.au_mot("pas des centimètres")
        zu = self.gauche(self.t("des zéros et des uns, pas des centimètres", 30, C_PIEGE),
                         -3.20, xmax=4.6)
        self.play(FadeIn(zu, shift=UP * 0.1), run_time=0.55)
        self.attendre_voix(marge=0.5)

    # ── 07 : question-pause n° 2 (bonne réponse : B) ────────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        t0 = self.renderer.time
        self.dire("07-question")
        self.au_mot("Question !")
        # ⛔ AUCUNE figure : trois points dessinés alignés donneraient la réponse.
        # ⛔⛔ LA PLACE OFFERTE AU TEXTE D'UNE CARTE N'EST PAS `largeur − 1,15`, C'EST
        # `largeur − 1,90`, ET LA NOTE DE REPRISE DISAIT 4,10 POUR 6,0 — c'est juste, mais
        # je l'ai d'abord lu comme « 4,85 ». Mesuré ici, carte par carte : le rond et son
        # buff mangent 0,75 de plus que le `largeur − 1,15` du code.
        #   · largeur 6,0 et trois choix sur DEUX lignes → polices 23,4 / 22,1 / 26,0 ;
        #   · largeur 6,3, choix B sur TROIS lignes      → polices 25,8 / 25,8 / 25,8 ✅
        # ⚠️ Et le choix B ne peut PAS tenir sur deux lignes : « on montre que les vecteurs
        # A B et A C sont colinéaires » fait 53 caractères, et 4,40 de large n'en porte que
        # 22 à 26 px. ⛔ On ne raccourcit pas : la voix le dit mot pour mot.
        # ⚠️ Mettre A sur trois lignes AUSSI serait pire, et pour une raison qui n'a rien
        # d'évident : `col()` rétrécit un bloc dont le bas passe −1,95 en dépassant x = 5,3,
        # et il mesure les cartes CENTRÉES EN y = 0. Trois cartes à trois lignes y
        # descendent à −2,10, donc le garde-fou s'allume et les trois choix tombent à
        # **20,4 px**. C'est la leçon de l'épisode 3 (« rétrécir la question descend les
        # cartes ») sous sa forme la plus traître : ici c'est AJOUTER une ligne qui rapetisse.
        # ⚠️ Les cartes vont donc de x = 0,35 à 6,60 : la donnée de gauche s'arrête avant
        # x = 0,15 (xmax = −0,1), et `intro` passe à 28 px (à 30 il faisait 6,8 pour 6,40
        # de place). gauche() CENTRE en hauteur : ce bloc de trois lignes posé à 1,70 monte
        # à 2,24 et descend à 1,16.
        fs = 28
        intro = VGroup(self.t("pour démontrer que trois points", fs, WHITE),
                       self.t("A, B et C de l'espace", fs, WHITE),
                       self.t("sont alignés", fs, C_REGARD))
        intro.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        self.gauche(intro, 1.70, xmax=-0.1)
        tete, q, cartes, pause, rebours = self.q_tete(
            ["que fait-on ?"],
            # ⛔⛔ DEUX COTES CHANGÉES LE 22/11 POUR UNE SEULE CAUSE : LES FLÈCHES.
            # Chaque ligne qui porte un nom de vecteur gagne 0,10 + l'épaisseur du trait,
            # et il y en avait TROIS ici (deux dans le choix A, une dans le choix B) :
            # le bloc des cartes grandissait de 0,28 de haut. Mesuré : à 26 px il descend
            # alors à −2,19, c'est-à-dire sur la tête de Ti-Margo (boîte y ≥ −2,15), et
            # `col()` le rétrécissait — les trois choix tombaient de 25,8 px à **20,4**.
            # ⭐ Deux remèdes, mesurés ensemble, et aucun ne touche un mot de la voix :
            #   · le choix A se coupe après « A C » et non après « et », donc UNE seule
            #     de ses deux lignes porte des noms : 0,14 de haut récupéré ;
            #   · 24 px demandés au lieu de 26.
            # Résultat : **23,8 px** obtenus (contre 20,4), bas des cartes à −1,87, soit
            # 0,28 au-dessus de Ti-Margo. ⛔ 25 px ne passe PAS : le bas tombe à −1,94,
            # à un centième du seuil de `col()` — et cet épisode a déjà payé qu'un
            # centième décide.
            [self.choix2("on montre que A B et A C", "ont la même norme", fs=24,
                         noms=("A B", "A C")),
             self.choix3("on montre que les", "vecteurs A B et A C", "sont colinéaires",
                         fs=24, noms=("A B", "A C")),
             self.choix2("on montre qu'ils sont", "dans un même plan", fs=24)],
            largeur=6.3, xl=0.35)
        self.play(FadeIn(tete, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("Pour démontrer que trois points A, B et C de l'espace sont alignés")
        self.play(FadeIn(intro[:2], shift=RIGHT * 0.1), run_time=0.5)
        self.play(FadeIn(intro[2], shift=RIGHT * 0.1), run_time=0.35)
        self.au_mot("que fait-on ?")
        self.play(FadeIn(q, shift=RIGHT * 0.1), run_time=0.45)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "07", t0, "B")
        self.mem_q2 = (cartes, pause, rebours)

    def ecran_reponse2(self):
        cartes, pause, rebours = self.mem_q2
        self.dire("07b-reponse")
        self.q_reponse(cartes, 1, pause, rebours)
        fs = 28
        # ⭐⭐ QUATRE BLOCS, ET DEUX LARGEURS, parce que les cartes ne descendent que
        # jusqu'à −1,70 : le premier bloc les LONGE (xmax = −0,1, soit 6,40 de place), les
        # trois autres passent DESSOUS et prennent toute la largeur jusqu'à Ti-Margo
        # (xmax = 4,6, soit 11,10). À 0,2 pour tous, les trois derniers étaient rétrécis.
        # ⚠️ Comptés du bas vers le haut : le dernier bloc et son cadre occupent
        # −3,54 à −2,86, sous la marge de −3,573 de 0,03.
        self.au_mot("on cherche un nombre k")
        l1 = VGroup(self.t("on cherche un nombre k tel que", fs, WHITE),
                    self.sans_audit(self.vexpr("A C = k × A B", ("A C", "A B"), 34, VERT_OK)))
        l1.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        self.gauche(l1, -0.35, xmax=-0.1)
        self.play(FadeIn(l1[0], shift=RIGHT * 0.12), run_time=0.5)
        # ⚠️ sans_audit assumé sur « A C = k × A B » : la voix dit « k FOIS le vecteur
        # A B », en lettres, et l'écran écrit le produit — seule écriture juste d'une
        # colinéarité. Il n'y a de toute façon aucun NOMBRE dans cette ligne.
        self.au_fin("k fois le vecteur A B")
        self.play(FadeIn(l1[1], scale=1.1), run_time=0.5)
        # ⛔⛔ VU À LA PLANCHE, ET C'EST LE DÉFAUT N° 1 DE L'ÉPISODE 3 REFAIT : ce bloc
        # s'écrivait PAR-DESSUS la carte C. La mesure que j'avais faite valait pour des
        # cartes à deux lignes (bas −1,23) ; en passant le choix B à TROIS lignes, le bas
        # des cartes est descendu à **−1,70**, et rien ne me l'a rappelé.
        # ⭐ La règle qui en sort : quand on change la hauteur des cartes, on recompte
        # TOUS les blocs de l'écran de réponse, pas seulement ceux qu'on vient d'écrire.
        # ⭐ Ici il reste à GAUCHE des cartes (xmax = −0,1, 6,40 de place) et passe donc à
        # trois lignes de 24 — mesuré : 5,23 de large, aucune réduction.
        self.au_mot("La même norme")
        l2 = VGroup(VGroup(self.croix(r=0.12),
                           self.t("la même norme : B et C sont", 24, C_PIEGE))
                    .arrange(RIGHT, buff=0.18),
                    self.t("à la même distance de A —", 24, C_PIEGE),
                    self.t("rien à voir avec l'alignement", 24, C_PIEGE))
        l2.arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        # ⚠️ −1,53 et non −1,45, MESURÉ le 22/11 : la flèche de « A C = k × A B » a
        # grandi le bloc du dessus de 0,09, et l'écart entre les deux est tombé de 0,14 à
        # **0,05**. Deux textes à cinq centièmes l'un de l'autre se lisent collés.
        self.gauche(l2, -1.53, xmax=-0.1)
        self.play(FadeIn(l2[0], shift=RIGHT * 0.12), run_time=0.5)
        # ⛔⛔ `l2[1:]` ET NON `l2[1]` : en passant ce bloc de deux lignes à TROIS, la
        # troisième (« rien à voir avec l'alignement ») n'était plus jamais jouée. À
        # l'image on lisait « à la même distance de A — » puis plus rien : un tiret dans le
        # vide, au milieu de l'explication. ⛔ Aucun outil ne peut le dire — le mobjet
        # existe, il est bien placé, il n'est simplement jamais affiché. Vu à la planche.
        self.au_mot("n'a rien à voir avec l'alignement")
        self.play(FadeIn(l2[1:], shift=RIGHT * 0.12), run_time=0.5)
        # ⭐⭐ LE MEILLEUR LEURRE DE LA SÉRIE, et il mérite son encadré : « trois points
        # sont toujours dans un même plan » est une phrase VRAIE qui ne démontre rien.
        # ⚠️ UNE SEULE LIGNE, à 26 : mesuré 11,01 de large, donc elle tient tout juste dans
        # les 11,10 offerts. Sur deux lignes elle prendrait 0,37 de haut en plus, et le
        # cadre de la conclusion n'aurait plus sa place au-dessus de la marge.
        self.au_mot("trois points de l'espace sont toujours dans un même plan")
        l3 = self.gauche(self.t("trois points de l'espace sont TOUJOURS dans un même plan",
                                26, C_REGARD), -2.50, xmax=4.6)
        self.play(FadeIn(l3, shift=RIGHT * 0.12), run_time=0.6)
        self.au_mot("elle ne démontre jamais rien")
        fin = self.t("vrai, et ça ne démontre jamais rien", 32, C_PIEGE)
        cad = SurroundingRectangle(fin, color=C_PIEGE, buff=0.14, stroke_width=3)
        # ⚠️ −3,17 : à −3,20 le bas du cadre tombait à −3,57, soit **3 millièmes** au-dessus
        # de la marge de 3 % (−3,573). Un chiffre juste n'est pas un chiffre sûr.
        self.gauche(VGroup(fin, cad), -3.17, xmax=4.6)
        self.play(FadeIn(fin, scale=1.08), Create(cad), run_time=0.65)
        self.attendre_voix(marge=0.5)

    # ── 08 : le squelette d'une copie ──────────────────────────────────────

    def ecran_rediger(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-rediger")
        self.au_mot("Le squelette d'une copie")
        titre = self.t("Le squelette d'une copie", 44, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.8)
        # ⚠️ hauteur 3,5 et centre −0,55 : la copie descend à −2,30, au-dessus de la ligne
        # posée dessous, qui s'arrête à −3,15 (marge : −3,573).
        copie = RoundedRectangle(width=10.2, height=3.5, corner_radius=0.18, stroke_color=GREY_B,
                                 stroke_width=3, fill_color="#0b1220",
                                 fill_opacity=1).move_to(P(-0.6, -0.55))
        marge = Line(copie.get_corner(UL) + RIGHT * 0.75 + DOWN * 0.1,
                     copie.get_corner(DL) + RIGHT * 0.75 + UP * 0.1, stroke_width=2,
                     color=ROUGE_ERREUR)
        self.play(Create(copie), Create(marge), run_time=0.6)
        fs = 26
        points = (("on écrit TOUTES les coordonnées, dans le repère donné", C_VECTEUR,
                   "on a les coordonnées suivantes"),
                  ("on annonce ce qu'on va faire avant de le faire", C_REGARD,
                   "on annonce ce qu'on va faire avant de le faire"),
                  ("on vérifie son résultat sur un point de l'énoncé", C_POINT,
                   "on vérifie son résultat sur un point de l'énoncé"),
                  ("on écrit la conclusion en français, pas en calculs", VERT_OK,
                   "on écrit la conclusion en français"))
        rangs, extraits = [], []
        for k, (txt, coul, extrait) in enumerate(points, start=1):
            rangs.append(VGroup(self.pastille(k), self.t(txt, fs, coul))
                         .arrange(RIGHT, buff=0.30))
            extraits.append(extrait)
        lignes = VGroup(*rangs).arrange(DOWN, aligned_edge=LEFT, buff=0.34)
        # ⛔ VU AU GROS PLAN SUR L'ÉPISODE 5 : à 9,1 le dernier caractère SORTAIT de la
        # copie. La place réelle : la copie va jusqu'à x = 4,5, le texte commence après la
        # marge rouge à −4,65, il reste 9,15 — 8,6 laisse 0,55.
        if lignes.width > 8.6:
            lignes.scale_to_fit_width(8.6)
        lignes.move_to(copie.get_center()).align_to(marge.get_center() + RIGHT * 0.3, LEFT)
        for b, extrait in zip(rangs, extraits):
            self.au_mot(extrait)
            self.play(FadeIn(b[0], scale=1.3), FadeIn(b[1], shift=RIGHT * 0.15), run_time=0.5)
        self.au_mot("pas seulement en calculs")
        rappel = self.t("une conclusion en français, pas seulement en calculs", fs, C_REGARD)
        cad = SurroundingRectangle(rappel, color=C_REGARD, buff=0.12, stroke_width=3)
        VGroup(rappel, cad).next_to(copie, DOWN, buff=0.26)
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
        # ni la section B C H E (qui répondrait à la question 1), ni la diagonale (A G)
        # (qui répondrait à la 2), ni leur point commun (la 3). Les trois arrivent en 09b.
        # ⚠️ Repère MESURÉ : o = (−5,3 ; 0,30), u = 1,3 → x ∈ [−5,61 ; −3,24],
        # y ∈ [−0,01 ; 2,27]. ⭐ Le cube est REMONTÉ par rapport aux autres écrans, pour
        # dégager toute la bande du bas : les trois questions du défi y vont.
        r, cube = self.cube_repere(o=(-5.3, 0.30), u=1.3)
        self.au_mot("Dans le cube")
        self.play(FadeIn(cube), run_time=0.7)

        self.au_fin("le plan P a pour équation x plus z moins 1 égale zéro")
        eqP = self.col(VGroup(self.t("P :", 32, C_PLAN),
                              self.eq_plan(*P09, fs=30, color=C_PLAN))
                       .arrange(DOWN, aligned_edge=LEFT, buff=0.1), 2.55)
        self.play(FadeIn(eqP, shift=RIGHT * 0.12), run_time=0.7)

        # ⛔⛔ LES TROIS QUESTIONS VONT À GAUCHE, SOUS LE CUBE, ET C'EST UNE MESURE : dans
        # la colonne de droite elles font 6,02 à 6,18 de large pour 4,40 offerts, donc
        # `col()` les rétrécissait à **18,5 px** — les trois consignes du défi, c'est-à-dire
        # ce que l'élève doit LIRE pendant qu'il met pause, devenaient le plus petit texte
        # de la vidéo. Vu à la planche ; aucun outil ne le dit.
        # ⭐ À gauche, sous le cube, la place est de 11,10 : elles tiennent à 26 px.
        fs = 26
        questions = (("vérifie que B et E sont dans P",),
                     ("donne une représentation paramétrique", "de la droite A G"),
                     ("trouve le point d'intersection de la droite A G", "et du plan P"))
        extraits = (("Première question", "vérifie que B et E sont dans P"),
                    ("Deuxième :", "donne une représentation paramétrique de la droite A G"),
                    ("Troisième :", "trouve le point d'intersection de la droite A G"))
        ys = (-0.45, -1.25, -2.15)
        blocs = []
        for k, (lignes_q, y) in enumerate(zip(questions, ys), start=1):
            corps = VGroup(*[self.t(s, fs, WHITE) for s in lignes_q])
            corps.arrange(DOWN, aligned_edge=LEFT, buff=0.08)
            b = self.gauche(VGroup(self.pastille(k), corps)
                            .arrange(RIGHT, buff=0.26, aligned_edge=UP), y, xmax=4.6)
            blocs.append(b)
        for b, (e_past, e_txt) in zip(blocs, extraits):
            self.au_mot(e_past)
            self.play(FadeIn(b[0], scale=1.3), run_time=0.3)
            self.au_mot(e_txt)
            self.play(FadeIn(b[1], shift=RIGHT * 0.12), run_time=0.45)

        # ⚠️ Le compte à rebours est posé À CÔTÉ de la pause et non dessous (`rebours_sous`
        # le met à 0,3 en dessous) : à cette hauteur-là, dessous, il sortirait du cadre.
        self.au_mot("Mets pause, et cherche")
        pause = self.gauche(self.t("Mets pause, et cherche !", 30, ORANGE_RETENUE), -3.05,
                            xmax=4.6)
        rebours = CompteARebours(5, r=0.34, fs=32).next_to(pause, RIGHT, buff=0.35)
        self.play(FadeIn(pause, scale=0.85), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        self.mem_defi = (r, VGroup(*blocs), pause, rebours)

    def ecran_correction(self):
        r, blocs, pause, rebours = self.mem_defi
        # ⛔ L'écran de correction HÉRITE de l'écran de défi, et l'héritage descend plus
        # bas qu'on ne croit (payé sur E3 PUIS sur E5). Ce qui s'efface : les trois
        # questions, la pause, le rebours. Ce qui RESTE : le cube, son repère et
        # l'équation de P — les données de l'exercice. Le bas de ce qui reste est donc
        # l'équation de P (2,13), et la colonne de droite ne recommence qu'à 2,0.
        self.play(FadeOut(blocs), FadeOut(pause), FadeOut(rebours), run_time=0.3)
        self.dire("09b-correction")
        fs = 26
        # ── ① B et E sont dans P ──────────────────────────────────────────
        self.au_fin("B a pour coordonnées 1, 0, 0")
        bB = self.col(VGroup(VGroup(self.t("B", fs, C_REGARD), self.trip(S["B"], fs, WHITE))
                             .arrange(RIGHT, buff=0.20),
                             self.eq_zero("1 + 0 − 1", fs, WHITE))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.10), 1.55)
        self.play(FadeIn(bB[0], shift=RIGHT * 0.12), run_time=0.5)
        self.au_fin("1 plus 0 moins 1 fait zéro")
        self.play(FadeIn(bB[1], shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("B est dans P")
        okB = self.coche(VERT_OK, 0.15).next_to(bB, RIGHT, buff=0.25)
        self.play(Create(okB), run_time=0.35)
        self.au_fin("E a pour coordonnées 0, 0, 1")
        bE = self.col(VGroup(VGroup(self.t("E", fs, C_REGARD), self.trip(S["E"], fs, WHITE))
                             .arrange(RIGHT, buff=0.20),
                             self.eq_zero("0 + 1 − 1", fs, WHITE))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.10), 0.55)
        self.play(FadeIn(bE[0], shift=RIGHT * 0.12), run_time=0.5)
        self.au_fin("0 plus 1 moins 1 fait zéro")
        self.play(FadeIn(bE[1], shift=RIGHT * 0.12), run_time=0.5)
        self.au_mot("E aussi")
        okE = self.coche(VERT_OK, 0.15).next_to(bE, RIGHT, buff=0.25)
        self.play(Create(okE), run_time=0.35)

        # ── ② la représentation paramétrique de (A G) ─────────────────────
        self.au_fin("A G a pour coordonnées 1, 1, 1")
        diag = self.diagonale(r)
        # ⚠️ DEUX lignes : d'un seul tenant ce bloc fait 4,53 et la colonne n'offre que
        # 4,40 — `col()` le rétrécissait. Coupé, les deux morceaux font 2,24 et 1,63.
        vAG = self.col(VGroup(VGroup(self.vec("A G", fs, C_REGARD), self.trip(S["G"], fs, WHITE))
                              .arrange(RIGHT, buff=0.18),
                              self.t("A = origine", fs, GREY_A))
                       .arrange(DOWN, aligned_edge=LEFT, buff=0.10), -0.35)
        self.play(Create(diag), FadeIn(vAG, shift=RIGHT * 0.12), run_time=0.6)
        syst = self.systeme([ligne_param(n, S["A"][i], S["G"][i]) for i, n in enumerate("xyz")],
                            30, c_acc=C_DROITE)
        # ⚠️ −1,64 et non −1,30, MESURÉ le 22/11. Le bloc « A G (1 ; 1 ; 1) / A = origine »
        # gagne la hauteur de sa flèche : son bas passe de −0,73 à −0,82, et l'accolade du
        # système, dont le haut est à −0,60, lui rentrait dedans de 0,22. ⚠️ Et elle
        # mordait DÉJÀ de 0,13 dans l'épisode publié — vu au gros plan sur le HD du matin,
        # jamais signalé par un outil. Le système descend donc, il occupe maintenant
        # −2,34 à −0,94, et l'écart au bloc du dessus est de 0,12.
        self.col(syst, -1.64)
        # ⭐ DEUX ancres pour trois lignes, et c'est le remède du piège n° 6 des entiers :
        # « x égale t, y égale t, z égale t » se dit en 1,3 s, donc trois au_mot d'affilée
        # tomberaient à 0,3 s l'un de l'autre et sortiraient en RETARD. On pose l'accolade
        # et la première ligne à son mot, les deux autres au dernier.
        self.au_fin("x égale t")
        self.play(Create(syst.acc), FadeIn(syst.eq[0], shift=RIGHT * 0.12), run_time=0.4)
        self.au_fin("z égale t")
        self.play(FadeIn(syst.eq[1], shift=RIGHT * 0.12),
                  FadeIn(syst.eq[2], shift=RIGHT * 0.12), run_time=0.45)

        # ── ③ l'intersection, à GAUCHE sous la figure ─────────────────────
        # ⭐ La substitution va à GAUCHE, sous la figure, et ses deux lignes sont dans la
        # MÊME colonne : un calcul ne se coupe jamais entre les deux colonnes (piège n° 28
        # des entiers — sur B4, « le 5 vaut » d'un côté et « 5 × 10 » de l'autre).
        self.au_mot("on remplace dans l'équation du plan")
        # ⛔ DEUX LIGNES, ET C'EST MESURÉ : d'un seul tenant cette substitution fait 11,02
        # de large, et la place à gauche n'est que de 8,40 — parce que le système de (A G)
        # occupe la colonne de droite de −2,00 à −0,60, donc tout ce qui est posé à cette
        # hauteur doit s'arrêter avant x = 2,2. Elle était rétrécie de 24 %.
        subst = self.gauche(VGroup(VGroup(self.t("on remplace :", 28, GREY_A),
                                          self.eq_zero("t + t − 1", 30, WHITE))
                                   .arrange(RIGHT, buff=0.14),
                                   VGroup(self.t("donc", 28, GREY_A),
                                          self.t("2t = 1", 30, C_REGARD),
                                          self.t(", donc", 28, GREY_A),
                                          self.sans_audit(self.t("t = 0,5", 32, VERT_OK)))
                                   .arrange(RIGHT, buff=0.14))
                            .arrange(DOWN, aligned_edge=LEFT, buff=0.12), -1.30, xmax=1.9)
        self.play(FadeIn(subst[0][0], shift=RIGHT * 0.12), run_time=0.45)
        # ⛔⛔ LE DÉFAUT LE PLUS GRAVE DE L'ÉPISODE, ET IL ÉTAIT CACHÉ DERRIÈRE UN
        # `AUDIT-TARD` DE 10,94 s. « t + t − 1 = 0 » était posé avec « on remplace », à
        # 28,8 s, alors que la voix ne dit « moins 1 » qu'à 32,0 s : **2,7 s d'avance**.
        # L'audit, lui, avait rattaché ce « 1 » à un « 1 » dit 11 s plus tôt (il y en a
        # neuf dans ce clip) et criait « en retard ». ⭐ Le contrôle qui l'a trouvé est
        # celui de l'épisode 5 : relire À LA MAIN les plus gros TARD, triés par valeur.
        # Septième cas du genre dans la série.
        self.au_fin("t plus t moins 1 égale zéro")
        self.play(FadeIn(subst[0][1], shift=RIGHT * 0.12), run_time=0.4)
        self.au_fin("donc 2 t égale 1")
        self.play(FadeIn(subst[1][:2], shift=RIGHT * 0.12), run_time=0.45)
        # ⚠️ sans_audit assumé sur « t = 0,5 » : la voix dit « donc t VAUT zéro virgule
        # cinq » ; l'écran écrit l'égalité, seule écriture juste d'une valeur de paramètre
        # (même raison qu'à l'écran 02 de l'épisode 5). ⚠️ au_fin quand même, parce que la
        # ligne FINIT par un nombre : hors audit, aucun instrument ne l'aurait dit.
        self.au_fin("donc t vaut 0,5")
        self.play(FadeIn(subst[1][2:], shift=RIGHT * 0.12), run_time=0.45)

        self.au_mot("Les trois coordonnées valent")
        om = self.sans_audit(r.point(*OMEGA, nom="Ω", couleur=VERT_OK, r=0.09, fs=26,
                                     decal=UL))
        concl = VGroup(self.t("le point d'intersection est", 32, VERT_OK),
                       self.t("le centre du cube", 32, VERT_OK),
                       self.trip(OMEGA, 30, VERT_OK))
        concl[1:].arrange(RIGHT, buff=0.24)
        concl = VGroup(concl[0], VGroup(concl[1], concl[2]))
        concl.arrange(DOWN, aligned_edge=LEFT, buff=0.10)
        cad = SurroundingRectangle(concl, color=VERT_OK, buff=0.14, stroke_width=3)
        # ⚠️ −2,30 et xmax = 1,6 : le système de (A G) occupe la colonne de droite de
        # −2,34 à −0,94 (descendu le 22/11, voir plus haut), donc ce cadre (qui monte à
        # −1,71) doit rester à gauche de 2,0.
        self.gauche(VGroup(concl, cad), -2.32, xmax=1.6)
        self.play(FadeIn(om, scale=1.5), run_time=0.4)
        self.au_mot("le point d'intersection est le centre du cube")
        self.play(FadeIn(concl, scale=1.06), Create(cad), run_time=0.7)

        # ── « et ce n'est pas un hasard » : la section B C H E ────────────
        # ⭐ Elle n'arrive QU'ICI, et elle est la réponse : le plan P coupe le cube en un
        # rectangle dont les quatre coins sont des sommets, et la grande diagonale le
        # traverse en son centre. ⛔ Dessinée comme la SECTION du solide, pas comme un
        # morceau de plan flottant (voir `section_bche`).
        self.au_mot("le plan P contient B, C, H et E")
        sec = self.section_bche(r)
        self.play(FadeIn(sec), run_time=0.6)
        # ⭐ La diagonale et Ω repassent devant : l'aplat de la section les recouvre.
        self.add(diag, om)
        # ⚠️ UNE SEULE LIGNE, et c'est une contrainte de place mesurée : à y = −3,25 il
        # reste 0,33 entre le cadre de la conclusion (bas −2,89) et la marge (−3,573). La
        # phrase complète (« …que la grande diagonale traverse… ») fait 14,13 à 24 px ;
        # celle-ci en fait 11,24, et xmax = 4,8 en offre 11,30 — Ti-Margo commence à 5,54.
        self.au_mot("la grande diagonale la traverse en son centre")
        has = self.gauche(self.t("P coupe le cube selon le rectangle B C H E, "
                                 "traversé en son centre", 24, C_PLAN),
                          -3.25, xmax=4.8)
        self.play(FadeIn(has, shift=UP * 0.1), run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 10 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-finale")
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(tit), run_time=0.7)
        fs = 30
        faits = (
            (("la figure guide,", C_POINT), ("les coordonnées prouvent", VERT_OK),
             "la figure guide"),
            (("alignement, parallélisme :", C_REGARD), ("la colinéarité", WHITE),
             "Pour un alignement ou un parallélisme"),
            (("une intersection :", C_DROITE),
             ("on remplace la droite dans l'équation du plan", WHITE),
             "Pour une intersection"),
            (("et toujours en premier :", C_PLAN), ("écrire les coordonnées", WHITE),
             "on commence toujours par écrire les coordonnées"),
        )
        blocs = []
        for (g, cg), (d, cd), _ in faits:
            blocs.append(VGroup(self.t(g, fs, cg), self.t(d, fs, cd)).arrange(RIGHT, buff=0.22))
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


class EspaceDefiTerminale(EspaceDefiBase):
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"
