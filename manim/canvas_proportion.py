# canvas_proportion.py
# LES FIGURES DE PROPORTIONNALITÉ DU COACH, REDESSINÉES POUR MANIM (série
# « Proportionnalité », 6e et 4e d'abord, puis CM1 → lycée). Créé le 31/10/2026
# par l'épisode PILOTE 6e 01-reconnaitre (micro prop_reconnaitre) ; importé par
# TOUS les épisodes de la série, comme `charte`, `canvas_stats`, `canvas_fractions`.
#
# ⭐ POURQUOI : l'élève regarde la vidéo, puis s'entraîne dans le coach. Il doit
# reconnaître LA MÊME figure : lib/canvas/TableauProportionnaliteCanvas.tsx =
# carte blanche aux coins arrondis (rounded-xl), grille slate, libellés de ligne
# en gras slate-700, valeurs slate-800, case « ? » bleu ciel (blue-50, bord
# blue-300), case allumée ambre (amber-100, texte amber-900).
# Ajouté pour la vidéo (le coach ne les dessine pas, le professeur les trace au
# tableau) : flèche LATÉRALE « × 7 » d'une ligne à l'autre (le coefficient),
# flèches de COLONNE « × 2 » en haut / en bas (la linéarité), « + » entre deux
# colonnes, croix rouge sur une case fausse.
#
# ⛔ Les épisodes NE MODIFIENT PAS ce module (lecture seule après le pilote) :
# s'il leur manque quelque chose, ils l'ajoutent dans LEUR script et le disent.
# ⛔ Rien n'est ajouté à la scène : chaque méthode RENVOIE un objet ou une
# animation ; la scène décide quand (AU MOT de la voix).
# ⛔ Pas de LaTeX sur ce poste : que des Text. « ÷ » partout, jamais 5/2.
# ⛔ Produit en croix INTERDIT en 6e (BO) : aucune figure ici ne le dessine.
#
# ── L'API EN BREF ─────────────────────────────────────────────────────────────
#   from canvas_proportion import *
#   tb = TableauProp(["Nombre de places", "Prix (€)"], [[1, 2, 4], [7, 14, 28]],
#                    montrer=False)      # montrer=False : cases vides, valeurs à poser au mot
#     tb.fond                    # carte + grille + libellés (à faire apparaître d'abord)
#     tb.valeur(r, c)            # le Text de la case (créé, placé, PAS ajouté) → FadeIn au mot
#     tb.poser(r, c, v)          # change la valeur prévue de la case puis renvoie son Text
#     tb.trou(r, c)              # la case « ? » (fond bleu ciel + « ? » bleu) → FadeIn
#     tb.remplir(r, c, v)        # animation : le « ? » s'efface, la valeur entre (pop)
#     tb.allumer(r, c) / tb.eteindre(r, c)   # animations (case ambre du coach)
#     tb.fleche_lat("× 7")       # VGroup(flèche, étiquette) à DROITE, ligne 0 → ligne 1
#     tb.fleche_lat("÷ 7", sens="haut", cote=LEFT)   # ligne 1 → ligne 0, à gauche
#     tb.fleche_col(0, 1, "× 2", ligne=0)   # en HAUT, colonne 0 → 1 (ligne=1 : en BAS)
#     tb.plus(0, 1)              # « + » entre les colonnes 0 et 1, au-dessus du tableau
#     tb.barrer(r, c)            # croix rouge sur la case (r, c)
#     tb.case(r, c) · tb.colonne(c) · tb.x(c) · tb.y(r)
#   u = Unite(5, 15, 8, "cahiers", "€")   # passage par l'unité 5 → 1 → 8 (÷ 5 puis × 8)
#     u.lignes[i] = VGroup(quantité, flèche, valeur) · u.fl_q[k] / u.fl_v[k] (k = 0 : ÷, 1 : ×)
#     u.etapes  : la liste des morceaux à montrer dans l'ordre (au mot)
#   bi = Billes(3, 4)            # 3 colonnes de 4 billes ; bi.colonnes[i] · bi.encadrer("colonnes"|"rangees")
#   dr = DroiteOrigine(xmax, ymax, pas_x, pas_y, largeur, hauteur)   # repère du coach
#     dr.p(x, y) · dr.point(x, y, couleur) · dr.droite_origine(x, y) (pointillé par O) · dr.fond
#   ec = EchelleCarte(3, 25000)  # 3 cm sur la carte, échelle 1/25 000
#     ec.carte · ec.segment · ec.mesure (« 3 cm ») · ec.conversions() → [Text…] (cm → m → km)
#   BarrePourcent(…)             # = canvas_fractions.Pourcentage (100 cases ou chargement)
#
# ⭐ SYNCHRO : les valeurs des cases et les étiquettes de flèche sont des Text
# ordinaires (la synchro par jetons des scènes les fait attendre leur mot).
# Seuls les LIBELLÉS de ligne sont `sans_synchro` (« Prix (€) » attendait le
# mot « prix » dit 9 s plus loin). Une étiquette « × 2 » dite « le double » :
# le script la marque `_pas_audit` (et `sans_synchro`).
#
# ── L'AUDIT (règle du 25/10, REGLES.md) ──────────────────────────────────────
#   class MaScene(AuditSynchro, PaysageLotC): …   (AuditSynchro EN PREMIER)
#   AUDIT=1 BORDS=1 python -m manim render --dry_run <script> <Classe>
#   → « AUDIT-AVANCE » : un nombre écrit AVANT que la voix le dise (doit être 0) ;
#     « AUDIT-TARD » : écrit plus de 0,4 s après son DERNIER dit (à relire) ;
#     « AUDIT-ABSENT » : un nombre écrit que la voix ne dit pas (étiquette « × 2 »
#     quand la voix dit « deux fois », à relire) ;
#     « BORD » : un objet à moins de 3 % du bord du cadre (doit être 0).
#   Un objet ajouté par self.add() (figure reprise d'un écran précédent) n'est
#   pas audité ; un Text marqué `_pas_audit = True` non plus.

import os
import re

import numpy as np
from manim import *

from canvas_stats import AMBRE, CARTE, NUIT, P, texte  # noqa: F401
from canvas_fractions import Pourcentage
from charte import BLEU_CALCUL, ROUGE_ERREUR, VERT_OK  # noqa: F401

# ── les couleurs du coach (TableauProportionnaliteCanvas.tsx) ───────────────
GRILLE_P = "#cbd5e1"      # border-slate-200 du coach, un ton plus franc pour la vidéo
LIBELLE_P = "#334155"     # libellés de ligne (slate-700, gras)
VALEUR_P = "#1e293b"      # valeurs (slate-800, gras)
TROU_FOND = "#eff6ff"     # case « ? » (bg-blue-50)
TROU_BORD = "#93c5fd"     # son bord (border-blue-300)
TROU_TXT = "#2563eb"      # le « ? » (blue-600)
ALLUME_FOND = "#fef3c7"   # case allumée (bg-amber-100)
ALLUME_TXT = "#78350f"    # son texte (text-amber-900)
FLECHE_K = AMBRE          # la flèche latérale du coefficient (× 7)
FLECHE_COL = "#38bdf8"    # les flèches de colonne (linéarité)
ROUGE_P = "#ef4444"       # une case fausse

BarrePourcent = Pourcentage  # même figure que la série fractions (100 cases / chargement)


def _txt(v):
    """Le texte d'une valeur : 1 000 → « 1 000 », 1.5 → « 1,5 »."""
    if isinstance(v, float) and v.is_integer():
        v = int(v)
    if isinstance(v, int):
        return f"{v:,}".replace(",", " ")
    if isinstance(v, float):
        return f"{v}".replace(".", ",")
    return str(v)


def fleche_courbe(a, b, angle, couleur, sw=5, tip=0.2):
    """Une flèche courbe de a vers b (angle > 0 : sens trigonométrique)."""
    return CurvedArrow(a, b, angle=angle, color=couleur, stroke_width=sw, tip_length=tip)


# ── LE TABLEAU DE PROPORTIONNALITÉ DU COACH ─────────────────────────────────
class TableauProp(VGroup):
    """Tableau à 2 lignes (ou plus) : libellés à gauche (avec unités), une
    colonne par valeur. valeurs[r][c] : nombre ou texte ; "?" = case « ? » ;
    None = case vide. montrer=False : aucune valeur dans .fond (on les pose
    au mot avec valeur()/trou()). Les Text des cases ne sont créés qu'à la
    demande et ne sont PAS ajoutés au groupe tant que la scène ne les joue pas."""

    def __init__(self, libelles, valeurs, largeur_case=1.5, largeur_libelle=3.3, hauteur=0.85, fs=34,
                 centre=ORIGIN, montrer=True, marge=0.22, **kw):
        super().__init__(**kw)
        self.nl, self.nc = len(valeurs), len(valeurs[0])
        self.valeurs = [list(r) for r in valeurs]
        self.fs, self.w, self.h, self.L = fs, largeur_case, hauteur, largeur_libelle
        larg = largeur_libelle + self.nc * largeur_case
        haut = self.nl * hauteur
        x0, y0 = -larg / 2, haut / 2
        self._x0, self._y0 = x0, y0
        # cases un peu plus petites que la grille : une case animée (allumer) repasse
        # au premier plan sans jamais recouvrir les traits de la grille
        self.cases = [[Rectangle(width=largeur_case - 0.06, height=hauteur - 0.06, stroke_width=0, fill_color=CARTE,
                                 fill_opacity=1).move_to(P(x0 + largeur_libelle + (c + 0.5) * largeur_case,
                                                           y0 - (r + 0.5) * hauteur))
                       for c in range(self.nc)] for r in range(self.nl)]
        grille = VGroup()
        for r in range(self.nl + 1):
            grille.add(Line(P(x0, y0 - r * hauteur), P(x0 + larg, y0 - r * hauteur)))
        for c in range(self.nc + 2):
            x = x0 if c == 0 else x0 + largeur_libelle + (c - 1) * largeur_case
            grille.add(Line(P(x, y0), P(x, y0 - haut)))
        grille.set_stroke(GRILLE_P, 3)
        self.libelles = VGroup()
        for r, s in enumerate(libelles):
            t = texte(s, fs * 0.82, LIBELLE_P)
            if t.width > largeur_libelle - 0.25:
                t.scale_to_fit_width(largeur_libelle - 0.25)
            t.sans_synchro = True  # libellé de figure (sans nombre) : affiché d'un bloc
            self.libelles.add(t.move_to(P(x0 + largeur_libelle / 2, y0 - (r + 0.5) * hauteur)))
        inner = VGroup(*[c for r in self.cases for c in r], grille, self.libelles)
        self.carte = RoundedRectangle(width=larg + 2 * marge, height=haut + 2 * marge, corner_radius=0.22,
                                      fill_color=CARTE, fill_opacity=1, stroke_color="#e2e8f0", stroke_width=3)
        self.grille = grille
        self.fond = VGroup(self.carte, *[c for r in self.cases for c in r], grille, self.libelles)
        self.add(self.fond)
        self.textes = [[None] * self.nc for _ in range(self.nl)]
        self.trous = [[None] * self.nc for _ in range(self.nl)]
        if montrer:
            for r in range(self.nl):
                for c in range(self.nc):
                    v = self.valeurs[r][c]
                    if v == "?":
                        self.add(self.trou(r, c))
                    elif v is not None:
                        self.add(self.valeur(r, c))
        self.move_to(centre)

    # -- repères --
    def case(self, r, c):
        return self.cases[r][c]

    def x(self, c):
        return self.cases[0][c].get_x()

    def y(self, r):
        return self.cases[r][0].get_y()

    def colonne(self, c):
        """Les cases de la colonne c PUIS leurs textes déjà créés (un Indicate
        sur ce groupe le remet au premier plan : les textes restent devant)."""
        return VGroup(*[self.cases[r][c] for r in range(self.nl)],
                      *[t for t in (self.textes[r][c] for r in range(self.nl)) if t is not None])

    # -- les contenus des cases --
    def valeur(self, r, c, couleur=VALEUR_P):
        """Le Text de la case (r, c), centré dans la case. Créé une fois."""
        if self.textes[r][c] is None:
            t = texte(_txt(self.valeurs[r][c]), self.fs, couleur)
            if t.width > self.w - 0.2:
                t.scale_to_fit_width(self.w - 0.2)
            self.textes[r][c] = t.move_to(self.cases[r][c])
        return self.textes[r][c]

    def poser(self, r, c, v, couleur=VALEUR_P):
        """Change la valeur de la case (r, c) et renvoie son NOUVEAU Text."""
        self.valeurs[r][c] = v
        self.textes[r][c] = None
        return self.valeur(r, c, couleur)

    def trou(self, r, c):
        """La case « ? » du coach : fond bleu ciel, bord bleu, « ? » bleu."""
        if self.trous[r][c] is None:
            cs = self.cases[r][c]
            fond = RoundedRectangle(width=cs.width - 0.22, height=cs.height - 0.2, corner_radius=0.1,
                                    fill_color=TROU_FOND, fill_opacity=1, stroke_color=TROU_BORD, stroke_width=3)
            q = texte("?", self.fs, TROU_TXT).move_to(cs)
            q._pas_audit = True
            self.trous[r][c] = VGroup(fond.move_to(cs), q)
        return self.trous[r][c]

    def remplir(self, r, c, v=None, couleur=VALEUR_P):
        """Animation : le « ? » (s'il est là) s'efface, la valeur entre."""
        t = self.poser(r, c, v, couleur) if v is not None else self.valeur(r, c, couleur)
        anims = [FadeIn(t, scale=1.4)]
        if self.trous[r][c] is not None:
            anims.insert(0, FadeOut(self.trous[r][c]))
        return AnimationGroup(*anims)

    def allumer(self, r, c, fond=ALLUME_FOND, txt=ALLUME_TXT):
        """Animation : la case s'allume (ambre du coach), son texte aussi."""
        anims = [self.cases[r][c].animate.set_fill(fond, 1)]
        if self.textes[r][c] is not None:
            anims.append(self.textes[r][c].animate.set_color(txt))
        return AnimationGroup(*anims)

    def eteindre(self, r, c):
        anims = [self.cases[r][c].animate.set_fill(CARTE, 1)]
        if self.textes[r][c] is not None:
            anims.append(self.textes[r][c].animate.set_color(VALEUR_P))
        return AnimationGroup(*anims)

    def barrer(self, r, c, couleur=ROUGE_P, sw=6):
        cs = self.cases[r][c]
        a, b = cs.get_corner(UL) + P(0.18, -0.12), cs.get_corner(DR) + P(-0.18, 0.12)
        e, d = cs.get_corner(UR) + P(-0.18, -0.12), cs.get_corner(DL) + P(0.18, 0.12)
        return VGroup(Line(a, b), Line(e, d)).set_stroke(couleur, sw)

    # -- les flèches du professeur --
    def fleche_lat(self, etiquette="× 7", sens="bas", cote=RIGHT, r0=0, r1=1, couleur=FLECHE_K, fs=None):
        """La flèche LATÉRALE du coefficient, hors de la carte : de la ligne r0
        à la ligne r1 (sens="bas") ou l'inverse (sens="haut"), à droite
        (cote=RIGHT) ou à gauche. Renvoie VGroup(flèche, étiquette) ; .fleche, .etiquette."""
        x = (self.carte.get_right()[0] + 0.12) if np.array_equal(cote, RIGHT) else (self.carte.get_left()[0] - 0.12)
        ya, yb = self.y(r0), self.y(r1)
        a, b = (P(x, ya), P(x, yb)) if sens == "bas" else (P(x, yb), P(x, ya))
        droite = np.array_equal(cote, RIGHT)
        ang = (-1 if (sens == "bas") == droite else 1) * PI * 0.75
        fl = fleche_courbe(a, b, ang, couleur, sw=6, tip=0.22)
        t = Text(etiquette, font_size=fs or int(self.fs * 1.15), color=couleur, weight=BOLD)
        t.next_to(fl, RIGHT if droite else LEFT, buff=0.12)
        g = VGroup(fl, t)
        g.fleche, g.etiquette = fl, t
        return g

    def fleche_col(self, c0, c1, etiquette="× 2", ligne=0, couleur=FLECHE_COL, fs=None, hauteur=None):
        """Flèche de COLONNE c0 → c1, au-dessus de la carte (ligne=0) ou en
        dessous (ligne=1, c.-à-d. la dernière ligne). VGroup(flèche, étiquette)."""
        haut = ligne == 0
        y = (self.carte.get_top()[1] + 0.06) if haut else (self.carte.get_bottom()[1] - 0.06)
        a, b = P(self.x(c0), y), P(self.x(c1), y)
        sgn = 1 if (self.x(c1) > self.x(c0)) else -1
        ang = (-1 if haut else 1) * sgn * (hauteur or PI / 2.2)
        fl = fleche_courbe(a, b, ang, couleur, sw=5, tip=0.2)
        t = Text(etiquette, font_size=fs or int(self.fs * 0.95), color=couleur, weight=BOLD)
        t.next_to(fl, UP if haut else DOWN, buff=0.08)
        g = VGroup(fl, t)
        g.fleche, g.etiquette = fl, t
        return g

    def plus(self, c0, c1, couleur=FLECHE_COL, fs=None):
        """Le « + » de la linéarité entre les colonnes c0 et c1, au-dessus de la carte."""
        t = Text("+", font_size=fs or int(self.fs * 1.3), color=couleur, weight=BOLD)
        return t.move_to(P((self.x(c0) + self.x(c1)) / 2, self.carte.get_top()[1] + 0.35))


# ── LE PASSAGE PAR L'UNITÉ (5 → 1 → 8) ──────────────────────────────────────
class Unite(VGroup):
    """Trois lignes « 5 cahiers → 15 € », « 1 cahier → 3 € », « 8 cahiers → 24 € »,
    avec ÷ n puis × m À GAUCHE (sur les quantités) ET À DROITE (sur les valeurs).
    valeur_1 est calculée (valeur ÷ n) ; tout est affiché en Text ordinaire.
    .lignes[i] = VGroup(q, flèche, v) · .fl_q[k] / .fl_v[k] (k = 0 : « ÷ n », 1 : « × m »)
    .etapes : [ligne 0, (fl_q[0], fl_v[0]), ligne 1, (fl_q[1], fl_v[1]), ligne 2]."""

    def __init__(self, n, valeur, m, nom_q="cahiers", unite_v="€", nom_q1=None, fs=40, ecart=1.15,
                 couleur_v=VERT_OK, centre=ORIGIN, **kw):
        super().__init__(**kw)
        v1 = valeur / n
        vm = v1 * m
        nom_q1 = nom_q1 or (nom_q[:-1] if nom_q.endswith("s") else nom_q)
        donnees = [(n, nom_q, valeur), (1, nom_q1, v1), (m, nom_q, vm)]
        self.lignes = VGroup()
        for k, (q, nom, v) in enumerate(donnees):
            tq = Text(f"{_txt(q)} {nom}", font_size=fs, color=WHITE)
            fl = Arrow(LEFT * 0.6, RIGHT * 0.6, color=GREY_B, stroke_width=5, buff=0, max_tip_length_to_length_ratio=0.3)
            tv = Text(f"{_txt(round(v, 2))} {unite_v}", font_size=fs, color=couleur_v if k else WHITE)
            lg = VGroup(tq, fl, tv).arrange(RIGHT, buff=0.35).move_to(P(0, -k * ecart))
            self.lignes.add(lg)
        for l in self.lignes:  # les flèches alignées, quantités calées à droite
            l[0].shift(RIGHT * (max(x[0].get_right()[0] for x in self.lignes) - l[0].get_right()[0]))
            l[1].next_to(l[0], RIGHT, buff=0.35)
            l[2].next_to(l[1], RIGHT, buff=0.35)
        self.fl_q, self.fl_v = VGroup(), VGroup()
        for k, lab in enumerate([f"÷ {_txt(n)}", f"× {_txt(m)}"]):
            a, b = self.lignes[k], self.lignes[k + 1]
            for cote, grp in ((LEFT, self.fl_q), (RIGHT, self.fl_v)):
                x = (min(a[0].get_left()[0], b[0].get_left()[0]) - 0.15) if np.array_equal(cote, LEFT) \
                    else (max(a[2].get_right()[0], b[2].get_right()[0]) + 0.15)
                ang = PI * 0.7 if np.array_equal(cote, LEFT) else -PI * 0.7
                fl = fleche_courbe(P(x, a.get_y()), P(x, b.get_y()), ang, AMBRE, sw=5, tip=0.18)
                t = Text(lab, font_size=int(fs * 0.85), color=AMBRE, weight=BOLD).next_to(fl, cote, buff=0.1)
                grp.add(VGroup(fl, t))
        self.add(self.lignes, self.fl_q, self.fl_v)
        self.etapes = [self.lignes[0], VGroup(self.fl_q[0], self.fl_v[0]), self.lignes[1],
                       VGroup(self.fl_q[1], self.fl_v[1]), self.lignes[2]]
        self.move_to(centre)


# ── LES BILLES (12 billes : 3 colonnes de 4, encadrées par colonnes puis rangées) ──
class Billes(VGroup):
    """n_col colonnes de n_rang billes. .billes[c][r] · .colonnes[c] (VGroup)
    · .rangees[r] · encadrer("colonnes"|"rangees") → VGroup de cadres (à Create)."""

    def __init__(self, n_col=3, n_rang=4, r=0.18, ecart=0.55, couleur="#38bdf8", centre=ORIGIN, **kw):
        super().__init__(**kw)
        self.billes = [[Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
                        .move_to(P(c * ecart, -k * ecart)) for k in range(n_rang)] for c in range(n_col)]
        self.colonnes = VGroup(*[VGroup(*col) for col in self.billes])
        self.rangees = VGroup(*[VGroup(*[self.billes[c][k] for c in range(n_col)]) for k in range(n_rang)])
        self.add(self.colonnes)
        self.move_to(centre)

    def encadrer(self, quoi="colonnes", couleur=AMBRE):
        grp = self.colonnes if quoi == "colonnes" else self.rangees
        return VGroup(*[SurroundingRectangle(g, color=couleur, buff=0.1, corner_radius=0.12, stroke_width=4)
                        for g in grp])


# ── LE REPÈRE : des points alignés avec l'origine, ou non ───────────────────
class DroiteOrigine(VGroup):
    """Repère du coach (FonctionGraphiqueCanvas) : carte blanche, grille légère,
    axes bleu nuit, graduations. .p(x, y) · .point(x, y) · .droite_origine(x, y)
    (pointillé de O jusqu'au bord, passant par (x, y)) · .fond."""

    def __init__(self, xmax=10, ymax=10, pas_x=1, pas_y=1, largeur=5.5, hauteur=4.0, fs=24, nom_x=None,
                 nom_y=None, centre=ORIGIN, **kw):
        super().__init__(**kw)
        self.xmax, self.ymax, self.L, self.H = xmax, ymax, largeur, hauteur
        o = P(-largeur / 2, -hauteur / 2)
        self._o = Dot(o, radius=0.001, fill_opacity=0, stroke_width=0)  # suit les déplacements
        grille = VGroup()
        for i in range(0, int(round(xmax / pas_x)) + 1):
            x = o[0] + i * pas_x * largeur / xmax
            grille.add(Line(P(x, o[1]), P(x, o[1] + hauteur)))
        for j in range(0, int(round(ymax / pas_y)) + 1):
            y = o[1] + j * pas_y * hauteur / ymax
            grille.add(Line(P(o[0], y), P(o[0] + largeur, y)))
        grille.set_stroke("#e2e8f0", 2)
        axes = VGroup(Arrow(o, o + RIGHT * (largeur + 0.3), buff=0, stroke_width=4, color=NUIT, tip_length=0.18),
                      Arrow(o, o + UP * (hauteur + 0.3), buff=0, stroke_width=4, color=NUIT, tip_length=0.18))
        nombres = VGroup()
        for i in range(0, int(round(xmax / pas_x)) + 1, max(1, int(round(xmax / pas_x)) // 5)):
            nombres.add(texte(_txt(i * pas_x), fs, "#334155").next_to(self.p(i * pas_x, 0), DOWN, buff=0.12))
        for j in range(1, int(round(ymax / pas_y)) + 1, max(1, int(round(ymax / pas_y)) // 5)):
            nombres.add(texte(_txt(j * pas_y), fs, "#334155").next_to(self.p(0, j * pas_y), LEFT, buff=0.12))
        for t in nombres:
            t._pas_audit = True  # graduations : une figure qu'on LIT
        noms = VGroup()
        if nom_x:
            noms.add(texte(nom_x, fs, "#475569").next_to(o + RIGHT * largeur, DOWN, buff=0.45).align_to(o + RIGHT * largeur, RIGHT))
        if nom_y:
            noms.add(texte(nom_y, fs, "#475569").next_to(o + UP * hauteur, RIGHT, buff=0.25))
        tout = VGroup(grille, axes, nombres, noms)
        self.carte = RoundedRectangle(width=tout.width + 0.6, height=tout.height + 0.6, corner_radius=0.22,
                                      fill_color=CARTE, fill_opacity=1, stroke_color="#e2e8f0",
                                      stroke_width=3).move_to(tout)
        self.fond = VGroup(self.carte, grille, axes, nombres, noms)
        self.add(self.fond, self._o)
        self.move_to(centre)

    def p(self, x, y):
        o = self._o.get_center()
        return o + RIGHT * x * self.L / self.xmax + UP * y * self.H / self.ymax

    def point(self, x, y, couleur="#dc2626", r=0.09):
        return Dot(self.p(x, y), radius=r, color=couleur)

    def droite_origine(self, x, y, couleur="#2563eb"):
        """La droite qui passe par O et (x, y), coupée au cadre, en pointillé."""
        k = min(self.xmax / x if x else 1e9, self.ymax / y if y else 1e9)
        return DashedLine(self.p(0, 0), self.p(x * k, y * k), color=couleur, stroke_width=4, dash_length=0.12)


# ── L'ÉCHELLE D'UNE CARTE ───────────────────────────────────────────────────
class EchelleCarte(VGroup):
    """Une carte (fond vert pâle, chemin), un segment mesuré « 3 cm » et sa
    distance réelle. .carte · .segment · .mesure · .echelle_txt (« 1/25 000 »
    écrit « 1 cm pour 25 000 cm ») · conversions() → liste de Text
    [« 3 × 25 000 = 75 000 cm », « = 750 m », « = 0,75 km »] à poser au mot."""

    def __init__(self, cm=3, echelle=25000, largeur=5.0, hauteur=3.2, fs=30, centre=ORIGIN, **kw):
        super().__init__(**kw)
        self.cm, self.e, self.fs = cm, echelle, fs
        self.carte = RoundedRectangle(width=largeur, height=hauteur, corner_radius=0.2, fill_color="#ecfccb",
                                      fill_opacity=1, stroke_color="#84cc16", stroke_width=3)
        route = VMobject(stroke_color="#a16207", stroke_width=6).set_points_smoothly(
            [P(-largeur * 0.42, -hauteur * 0.3), P(-largeur * 0.1, hauteur * 0.1), P(largeur * 0.2, -hauteur * 0.05),
             P(largeur * 0.42, hauteur * 0.3)])
        a, b = P(-largeur * 0.3, -hauteur * 0.36), P(largeur * 0.3, -hauteur * 0.36)
        self.segment = VGroup(Line(a, b, color="#dc2626", stroke_width=6),
                              Line(a + UP * 0.12, a + DOWN * 0.12, color="#dc2626", stroke_width=6),
                              Line(b + UP * 0.12, b + DOWN * 0.12, color="#dc2626", stroke_width=6))
        self.mesure = texte(f"{_txt(cm)} cm", fs, "#dc2626").next_to(self.segment, UP, buff=0.1)
        self.echelle_txt = texte(f"1 cm pour {_txt(echelle)} cm", int(fs * 0.8), NUIT).move_to(
            self.carte.get_corner(UL) + P(1.6, -0.3))
        self.add(self.carte, route, self.segment)
        self.move_to(centre)

    def conversions(self, couleur=WHITE):
        cm_reel = self.cm * self.e
        m = cm_reel / 100
        km = m / 1000
        return [Text(f"{_txt(self.cm)} × {_txt(self.e)} = {_txt(cm_reel)} cm", font_size=self.fs + 4, color=couleur),
                Text(f"= {_txt(m)} m", font_size=self.fs + 4, color=couleur),
                Text(f"= {_txt(km)} km", font_size=self.fs + 4, color=VERT_OK)]


# ── AUDIT de la synchro voix / écrit + contrôle des BORDS ───────────────────
# Repris de manim/scripts/4e/frac_lotd_commun.py (lui-même modèle stmg/j1) :
# mesuré à CHAQUE vraie animation (renderer.play), donc APRÈS les attentes de
# la synchro par jetons. La scène doit fournir _marques(), _cle_voix,
# _texte_voix, _debut_voix (c'est le cas des bases PaysageLotC / ShortLotC).
_NB = re.compile(r"\d+(?:,\d+)?")


def _txts(m):
    return [f for f in m.get_family() if isinstance(f, Text) and getattr(f, "original_text", None)]


class AuditSynchro:
    """Mixin (À METTRE EN PREMIER dans les bases de la scène) : AUDIT=1 et/ou BORDS=1."""

    def setup(self):
        super().setup()
        if os.environ.get("AUDIT") != "1" and os.environ.get("BORDS") != "1":
            return
        orig = self.renderer.play

        def play(scene, *a, **k):
            avant = {id(t) for m in scene.mobjects for t in _txts(m)}
            t0 = self.renderer.time
            orig(scene, *a, **k)
            if os.environ.get("AUDIT") == "1":
                self._auditer(avant, t0)
            if os.environ.get("BORDS") == "1":
                self._bords()

        self.renderer.play = play

    def _auditer(self, avant, t0):
        cle = getattr(self, "_cle_voix", None)
        voix = getattr(self, "_texte_voix", "") or ""
        marques = self._marques().get(cle, []) if cle else []
        for m in self.mobjects:
            if type(m).__name__ == "CompteARebours" or any(type(f).__name__ == "CompteARebours"
                                                           for f in m.get_family()):
                for f in m.get_family():
                    if type(f).__name__ == "CompteARebours":
                        for g in f.get_family():
                            g._pas_audit = True
        for m in self.mobjects:
            for t in _txts(m):
                if id(t) in avant or getattr(t, "_pas_audit", False) or getattr(t, "_audite", False):
                    continue
                if t.get_fill_opacity() < 0.05:
                    continue
                t._audite = True
                s = t.original_text.replace("−", "").replace(" ", " ")
                s = re.sub(r"(?<=\d) (?=\d{3}\b)", "", s)  # « 1 000 » → « 1000 »
                for nb in _NB.findall(s):
                    occ = [x.start() for x in re.finditer(r"(?<![\d,])" + re.escape(nb) + r"(?![\d]|,\d)", voix)]
                    if not occ:
                        print(f"AUDIT-ABSENT {cle} « {nb} » ({t.original_text[:30]})", flush=True)
                        continue
                    tps = [max([mm[1] for mm in marques if mm[0] <= i] or [0.0]) + getattr(self, "_debut_voix", 0)
                           for i in occ]
                    if t0 < tps[0] - 0.06:
                        print(f"AUDIT-AVANCE {cle} « {nb} » ({t.original_text[:30]}) {tps[0] - t0:.2f} s", flush=True)
                    else:
                        dernier = max(x for x in tps if x <= t0 + 0.06)
                        if t0 - dernier > 0.4:
                            print(f"AUDIT-TARD {cle} « {nb} » ({t.original_text[:30]}) {t0 - dernier:.2f} s",
                                  flush=True)

    def _bords(self):
        mg = config.frame_width * 0.03
        lx, ly = config.frame_width / 2 - mg, config.frame_height / 2 - mg
        vus = getattr(self, "_bords_vus", set())
        for mob in self.mobjects:
            if type(mob).__name__.startswith("Mascotte"):
                continue
            for f in [mob] + list(mob.submobjects):
                if type(f).__name__.startswith("Mascotte") or (not f.has_points() and not f.submobjects):
                    continue
                if f.width < 1e-3 and f.height < 1e-3:
                    continue
                if isinstance(f, VMobject) and not f.submobjects and f.get_fill_opacity() < 0.05 \
                        and f.get_stroke_opacity() < 0.05:
                    continue
                g, d, b, h = f.get_left()[0], f.get_right()[0], f.get_bottom()[1], f.get_top()[1]
                if g < -lx or d > lx or b < -ly or h > ly:
                    c = (getattr(self, "_cle_voix", "?"), type(f).__name__, round(g, 1), round(d, 1), round(b, 1),
                         round(h, 1))
                    if c not in vus:
                        vus.add(c)
                        print(f"BORD {c[0]} {c[1]} x[{c[2]}, {c[3]}] y[{c[4]}, {c[5]}]", flush=True)
        self._bords_vus = vus
