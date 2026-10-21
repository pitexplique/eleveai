# canvas_stats.py
# LES FIGURES DE STATISTIQUES DU COACH, REDESSINÉES POUR MANIM (série
# « Statistiques », du CM1 à la terminale). Créé le 21/10/2026 avec l'épisode
# CM 05-graphique-lire ; importé par TOUS les épisodes, comme `charte`.
#
# ⭐ POURQUOI : l'élève regarde la vidéo, puis s'entraîne dans le coach. Il doit
# reconnaître LA MÊME figure : carte blanche, encre bleu nuit, axe gradué avec
# une grille légère, barre allumée bordée d'ambre, camembert aux couleurs
# franches, tableau à en-tête sombre et colonne des libellés bleu clair.
# Les modèles : lib/canvas/StatGraphCanvas.tsx (barres, bâtons, courbe,
# camembert) et lib/canvas/TableauDonneesCanvas.tsx (`tableau_donnees`).
#
# ⛔ Les épisodes NE MODIFIENT PAS ce module. S'il leur manque quelque chose,
# ils l'ajoutent dans LEUR script (sous-classe ou fonction locale).
#
# ── L'API EN BREF ─────────────────────────────────────────────────────────────
#   from canvas_stats import Barres, Courbe, Camembert, Tableau, fr
#
#   g = Barres(["Or", "Argent", "Bronze"], [16, 26, 22], pas=4, sous_pas=2,
#              couleurs=[OR, ARGENT, BRONZE], nom_axe="Médailles",
#              titre="France, Paris 2024", centre=P(-3, -0.3))
#   self.play(FadeIn(g.fond))          # carte, grille, axes, nombres, catégories
#   self.play(g.pousser())             # les barres poussent depuis l'axe
#   fl = g.monter(0); self.play(GrowArrow(fl))       # je monte la barre
#   tr = g.vers_axe(0); self.play(Create(tr))        # je vais vers les nombres
#   self.play(g.focus(0))   # barre allumée, les autres pâlissent (UN Transform par barre)
#   self.play(g.rallumer())  # tout revient ; allumer/eteindre/estomper/rallumer = Animations
#   lu = g.lu(26); self.play(FadeIn(lu))   # « 26 » écrit à gauche de son petit trait
#
# ⭐ Un graphique est un VGroup : on peut le déplacer ou l'agrandir, tous les
# points se recalculent (deux repères invisibles suivent la figure).
# ⛔ Rien n'est ajouté à la scène par le module : chaque méthode RENVOIE un
# objet ou une animation, la scène décide quand (au mot de la voix).
# ⛔ PAS D'ÉCART : les valeurs ne s'écrivent pas au-dessus des barres par
# défaut (lire = sur l'axe). `valeur(i)` les crée à la demande.

import math

import numpy as np
from manim import *

# ── les couleurs du coach (Tailwind, celles des .tsx) ───────────────────────
NUIT = "#0f172a"         # encre : axes, catégories, valeurs (slate-900)
ENCRE = "#334155"        # nombres des graduations, bord des barres (slate-700)
GRIS_NOM = "#475569"     # nom de l'axe (slate-600)
GRILLE = "#e2e8f0"       # grille légère, bord de la carte (slate-200)
CARTE = "#ffffff"
AMBRE = "#f59e0b"        # barre / point allumé, pointillé de lecture (amber-500)
BLEU_COURBE = "#2563eb"  # la courbe (blue-600)
ORANGE_Q = "#ea580c"     # les cases « ? » (orange-600)

# barres et bâtons sans couleur donnée : les gris du coach
GRIS_BARRES = ["#94a3b8", "#cbd5e1", "#e2e8f0", "#d1d5db", "#e5e7eb", "#f1f5f9"]
# le camembert : teintes franches et claires (20/10/2026, « le gris ne se lisait pas »)
COULEURS_CAMEMBERT = ["#93c5fd", "#fcd34d", "#6ee7b7", "#fca5a5", "#c4b5fd", "#fdba74", "#5eead4", "#f9a8d4"]

# le tableau `tableau_donnees`
EN_TETE = "#1e293b"      # bg-slate-800, texte blanc
LIBELLE = "#e0f2fe"      # bg-sky-100, colonne des libellés
RAYURE = "#f8fafc"       # bg-slate-50, une ligne sur deux
BORD_TABLEAU = "#cbd5e1" # border-slate-300
CASE_ALLUMEE = "#fef08a" # bg-yellow-200
ANNEAU = "#eab308"       # ring-yellow-500


def P(x, y):
    return np.array([x, y, 0.0])


def fr(n):
    """Écriture française d'un nombre : virgule décimale, espace des milliers."""
    if isinstance(n, str):
        return n
    if float(n).is_integer():
        s = f"{int(round(n)):,}".replace(",", " ")
    else:
        s = f"{n:,.2f}".rstrip("0").rstrip(".").replace(",", " ").replace(".", ",")
    return s


# Les textes DE LA CARTE sont en Arial, la police sans empattement du coach ;
# les titres posés hors de la carte gardent la police des vidéos (police=None).
POLICE = "Arial"


def texte(s, fs=32, color=NUIT, gras=True, police=POLICE):
    """Un texte de la carte : encre bleu nuit, gras comme dans le coach."""
    kw = {"font": police} if police else {}
    return Text(fr(s), font_size=fs, color=color, weight=BOLD if gras else NORMAL, **kw)


def pourcentages_entiers(valeurs):
    """Des pourcentages entiers dont la SOMME fait 100 (plus fort reste),
    comme `pourcentagesEntiers` du coach : jamais 33 + 33 + 33 = 99 %."""
    total = sum(valeurs)
    if total <= 0:
        return [0 for _ in valeurs]
    exacts = [v / total * 100 for v in valeurs]
    bas = [math.floor(e) for e in exacts]
    reste = 100 - sum(bas)
    for _, i in sorted(((e - math.floor(e), i) for i, e in enumerate(exacts)), reverse=True):
        if reste <= 0:
            break
        bas[i] += 1
        reste -= 1
    return bas


def carte_autour(mob, marge=0.35, rayon=0.25):
    """La carte blanche du coach (rounded-xl, bord slate-200) autour de mob."""
    return RoundedRectangle(width=mob.width + 2 * marge, height=mob.height + 2 * marge, corner_radius=rayon,
                            fill_color=CARTE, fill_opacity=1, stroke_color=GRILLE, stroke_width=3).move_to(mob)


# ── le repère commun : axe vertical gradué, catégories en bas ───────────────

class _Repere(VGroup):
    """L'axe gradué du coach (`showAxis`, `step`, `axeY`), commun à Barres et Courbe.

    categories : les étiquettes du bas (une par barre / point).
    valeurs    : les effectifs. pas : l'écart entre deux nombres de l'axe.
    sous_pas   : un PETIT TRAIT sans nombre tous les `sous_pas` (ex. pas=4,
                 sous_pas=2 → un petit trait entre deux nombres, qui vaut 2 de plus).
    maxi       : le haut de l'axe (par défaut, le multiple de `pas` au-dessus du max).
    mini       : le bas de l'axe (0 ; plus haut = l'axe TRONQUÉ du JT, `yMin`).
    largeur, hauteur : la zone de tracé, en unités Manim (hors nombres et catégories).
    nom_axe    : écrit en haut de l'axe, en gris (`axeY`). titre : au-dessus de la carte.
    fs         : taille des nombres et des catégories (≥ 28 pour un téléphone).

    Morceaux : .carte .grille .axe_x .axe_y .traits {v: trait} .nombres {v: Text}
    .etiquettes (VGroup, une par catégorie) .nom_axe .titre (dans la carte, en haut)
    .marques (barres…)
    .fond = tout sauf les marques (à faire apparaître d'abord).
    """

    def __init__(self, categories, valeurs, pas, sous_pas=None, maxi=None, mini=0, largeur=7.0, hauteur=4.2,
                 nom_axe=None, titre=None, centre=ORIGIN, fs=32, carte=True, colonne_lue=False, **kw):
        super().__init__(**kw)
        self.categories, self.valeurs = list(categories), list(valeurs)
        self.n = len(self.valeurs)
        self.pas, self.sous_pas, self.mini = pas, sous_pas, mini
        haut = max([mini + pas] + list(self.valeurs))
        self.maxi = maxi if maxi is not None else math.ceil((haut - mini) / pas - 1e-9) * pas + mini
        self.L, self.H, self.fs = largeur, hauteur, fs
        # deux repères INVISIBLES qui suivent la figure quand on la déplace
        self.ref_x = Line(P(0, 0), P(largeur, 0), stroke_width=0)
        self.ref_y = Line(P(0, 0), P(0, hauteur), stroke_width=0)
        self._construire_axes(nom_axe, titre)
        self.marques = self._construire_marques()
        self.carte = VMobject()
        self.add(self.grille, self.marques, self.axe_x, self.axe_y, *self.traits.values(), *self.nombres.values(),
                 self.etiquettes, self.ref_x, self.ref_y)
        if self.nom_axe is not None:
            self.add(self.nom_axe)
        if colonne_lue:
            # une place réservée dans la carte, à gauche des nombres, pour lu()
            larg = texte(fr(self.maxi), fs + 4).width + 0.4
            self.add(VectorizedPoint(P(self._x_lu() - larg, 0)))
        if self.titre is not None:
            # le titre DANS la carte, en haut, comme `figure.title` du coach
            self.titre.next_to(VGroup(*self.submobjects), UP, buff=0.3)
            self.add(self.titre)
        if carte:
            self.carte = carte_autour(VGroup(*self.submobjects))
            self.add_to_back(self.carte)
        self.move_to(centre)

    # -- la géométrie (recalculée à partir des repères : déplacer reste sûr) --

    def _o(self):
        return self.ref_x.get_start()

    def _ux(self):
        """Un pas horizontal = la largeur d'une case de catégorie."""
        return (self.ref_x.get_end() - self.ref_x.get_start()) / max(1, self.n)

    def _uy(self):
        """Une unité de valeur, verticalement."""
        return (self.ref_y.get_end() - self.ref_y.get_start()) / (self.maxi - self.mini)

    def point(self, i, v=None):
        """Le point (milieu de la case i, valeur v) ; v = la valeur de i par défaut."""
        v = self.valeurs[i] if v is None else v
        v = min(max(v, self.mini), self.maxi)
        return self._o() + self._ux() * (i + 0.5) + self._uy() * (v - self.mini)

    def base(self, i):
        """Le pied de la marque i, sur l'axe horizontal."""
        return self.point(i, self.mini)

    def y_axe(self, v):
        """Le point de l'axe vertical à la hauteur de v."""
        return self._o() + self._uy() * (min(max(v, self.mini), self.maxi) - self.mini)

    def _haut(self, i):
        """Le point d'où part la ligne de lecture (le haut de la marque, côté axe)."""
        return self.point(i)

    def _valeurs_axe(self, pas):
        k, vals = 0, []
        while self.mini + k * pas <= self.maxi + 1e-9:
            vals.append(round(self.mini + k * pas, 9))
            k += 1
        return vals

    def _construire_axes(self, nom_axe, titre):
        L, H, fs = self.L, self.H, self.fs
        y = lambda v: (v - self.mini) / (self.maxi - self.mini) * H  # noqa: E731
        majeurs = self._valeurs_axe(self.pas)
        self.grille = VGroup(*[Line(P(0, y(v)), P(L, y(v)), color=GRILLE, stroke_width=2.5)
                               for v in majeurs if v > self.mini])
        self.axe_x = Line(P(0, 0), P(L + 0.1, 0), color=NUIT, stroke_width=5)
        self.axe_y = Line(P(0, 0), P(0, H + 0.25), color=NUIT, stroke_width=5)
        self.traits, self.nombres = {}, {}
        for v in majeurs:
            self.traits[v] = Line(P(-0.22, y(v)), P(0, y(v)), color=NUIT, stroke_width=4)
            nb = texte(v, fs, ENCRE)
            nb.move_to(P(-0.34, y(v)), aligned_edge=RIGHT)
            self.nombres[v] = nb
        if self.sous_pas:
            for v in self._valeurs_axe(self.sous_pas):
                if v not in self.traits:
                    # le PETIT TRAIT : sans nombre, plus court, mais bien visible
                    self.traits[v] = Line(P(-0.15, y(v)), P(0, y(v)), color=NUIT, stroke_width=4)
        slot = L / max(1, self.n)
        self.etiquettes = VGroup()
        for i, c in enumerate(self.categories):
            e = texte(c, fs, NUIT)
            if e.width > slot * 0.88:  # un blanc entre deux catégories voisines
                e.scale_to_fit_width(slot * 0.88)
            e.move_to(P(slot * (i + 0.5), -0.25), aligned_edge=UP)
            self.etiquettes.add(e)
        self.nom_axe = None
        if nom_axe:
            self.nom_axe = texte(nom_axe, max(26, int(fs * 0.85)), GRIS_NOM)
            self.nom_axe.move_to(P(-0.1, H + 0.6), aligned_edge=LEFT)
        self.titre = texte(titre, int(fs * 1.05), NUIT) if titre else None

    def _construire_marques(self):
        return VGroup()

    @property
    def fond(self):
        """Tout sauf les marques : la carte, la grille, les axes, les nombres,
        les catégories, le nom de l'axe et le titre (à faire apparaître d'abord)."""
        return VGroup(*[m for m in self.submobjects if m is not self.marques])

    # -- les getters --

    def trait(self, v):
        """Le trait de l'axe à la valeur v (grand trait numéroté ou petit trait)."""
        return self.traits[round(v, 9)]

    def nombre(self, v):
        return self.nombres[round(v, 9)]

    # -- les gestes de LECTURE (chaque méthode RENVOIE l'objet, non ajouté) --

    def monter(self, i, couleur=NUIT):
        """La flèche « je monte jusqu'en haut » : du pied au haut de la marque i.
        À jouer avec GrowArrow."""
        a, b = self.base(i), self.point(i)
        return Arrow(a, b, buff=0, color=couleur, stroke_width=7, max_tip_length_to_length_ratio=0.12,
                     tip_length=0.25)

    def vers_axe(self, i, v=None, couleur=AMBRE, jusqu_au_lu=False):
        """Le pointillé « je vais vers les nombres » : du haut de la marque i
        jusqu'à l'axe gradué, à l'horizontale (ou, avec jusqu_au_lu=True, à
        travers la colonne des nombres jusqu'à la pastille de lu()). Create."""
        haut = self._haut(i) if v is None else self.point(i, v)
        fin = self.y_axe(self.valeurs[i] if v is None else v)
        if jusqu_au_lu:
            fin = P(self._x_lu(), fin[1])
        return DashedLine(haut, fin, color=couleur, stroke_width=6, dash_length=0.14, dashed_ratio=0.6)

    def vers_bas(self, i, couleur=AMBRE):
        """Le pointillé vertical du haut de la marque jusqu'à l'axe du bas (coach, courbe)."""
        return DashedLine(self.point(i), self.base(i), color=couleur, stroke_width=5, dash_length=0.12)

    def _x_lu(self):
        """L'abscisse juste à gauche de la colonne des nombres."""
        return min(nb.get_left()[0] for nb in self.nombres.values()) - 0.12 * self._echelle()

    def lu(self, v, couleur=AMBRE, fs=None):
        """La valeur LUE, dans une pastille ambre, à GAUCHE de la colonne des
        nombres, à la hauteur de v : sur un petit trait (qui n'a pas de nombre),
        c'est là qu'on écrit « 26 ». Avec colonne_lue=True, la carte lui garde
        la place. Avec vers_axe(i, jusqu_au_lu=True), le pointillé y mène."""
        t = texte(v, fs or self.fs + 4, WHITE)
        fond = RoundedRectangle(width=t.width + 0.26, height=t.height + 0.2, corner_radius=0.1,
                                fill_color=couleur, fill_opacity=1, stroke_width=0)
        g = VGroup(fond, t.move_to(fond)).scale(self._echelle())
        return g.move_to(P(self._x_lu(), self.y_axe(v)[1]), aligned_edge=RIGHT)

    def _echelle(self):
        """Le facteur d'agrandissement actuel de la figure (1 à la construction)."""
        return np.linalg.norm(self.ref_y.get_end() - self.ref_y.get_start()) / self.H

    # -- les animations des marques --

    def pousser(self, indices=None, run_time=1.2, lag=0.25):
        """Les marques poussent depuis l'axe du bas (une à une si plusieurs)."""
        idx = range(self.n) if indices is None else ([indices] if isinstance(indices, int) else indices)
        return LaggedStart(*[GrowFromEdge(self.marques[i], DOWN) for i in idx], lag_ratio=lag, run_time=run_time)

    # ⭐ Chaque marque a un ÉTAT (allumée ou non, opacité) ; chaque geste renvoie
    # UN Transform par marque vers une copie restylée. Deux `.animate` sur la
    # même barre dans un même play se battent (le dernier gagne) : focus(i)
    # remplace donc « allumer(i) + estomper(i) ».

    def _style(self, m, avant, allume, opacite, couleur):
        """Restyle la copie m (barres : bord ambre épais si allumée)."""
        m.set_stroke(couleur if allume else ENCRE, width=9 if allume else 3)
        m.set_opacity(opacite)

    def _vers(self, i, allume=None, opacite=None, couleur=AMBRE):
        if not hasattr(self, "_allumees"):
            self._allumees, self._opacites = set(), {}
        avant = i in self._allumees
        a = avant if allume is None else allume
        o = self._opacites.get(i, 1.0) if opacite is None else opacite
        t = self.marques[i].copy()
        self._style(t, avant, a, o, couleur)
        (self._allumees.add if a else self._allumees.discard)(i)
        self._opacites[i] = o
        return Transform(self.marques[i], t)

    def allumer(self, i, couleur=AMBRE):
        """La marque i s'allume : bord ambre épais (`highlightIndex` du coach). Animation."""
        return self._vers(i, allume=True, couleur=couleur)

    def eteindre(self, i):
        """La marque i reprend son style normal. Animation."""
        return self._vers(i, allume=False)

    def focus(self, i, opacite=0.3, couleur=AMBRE):
        """La marque i s'allume ET les autres pâlissent (et s'éteignent). Animation."""
        return AnimationGroup(*[self._vers(j, allume=(j == i), opacite=1.0 if j == i else opacite, couleur=couleur)
                                for j in range(self.n)])

    def estomper(self, garder, opacite=0.3):
        """Les marques hors de `garder` pâlissent, les autres reviennent à 1. Animation."""
        garder = [garder] if isinstance(garder, int) else list(garder)
        return AnimationGroup(*[self._vers(j, opacite=1.0 if j in garder else opacite) for j in range(self.n)])

    def rallumer(self):
        """Toutes les marques reviennent à l'opacité 1 et s'éteignent. Animation."""
        return AnimationGroup(*[self._vers(j, allume=False, opacite=1.0) for j in range(self.n)])

    def valeur(self, i, fs=None, color=NUIT):
        """La valeur écrite AU-DESSUS de la marque i (`showValues`), non ajoutée.
        ⛔ Seulement quand la voix la dit : lire se fait sur l'axe."""
        t = texte(self.valeurs[i], fs or self.fs + 2, color)
        t.set_stroke(WHITE, width=6, background=True)
        t.scale(self._echelle())
        return t.next_to(self.marques[i].get_top(), UP, buff=0.14 * self._echelle())


# ── le diagramme en barres (ou en bâtons) ───────────────────────────────────

class Barres(_Repere):
    """Le diagramme en barres du coach (`stat_graph` barres), ou en bâtons
    (`batons=True`). Paramètres de _Repere, plus :
    couleurs : une couleur par barre (par défaut les gris du coach) ;
    largeur_barre : la part de la case occupée par la barre (0,62 comme le coach).
    Morceaux : .barres (= .marques) ; barres[i] est un RoundedRectangle (ou, en
    bâtons, VGroup(trait, point)).
    """

    def __init__(self, categories, valeurs, pas, couleurs=None, batons=False, largeur_barre=0.62, **kw):
        self.couleurs = list(couleurs) if couleurs else [GRIS_BARRES[i % len(GRIS_BARRES)]
                                                          for i in range(len(valeurs))]
        self.batons, self.largeur_barre = batons, largeur_barre
        super().__init__(categories, valeurs, pas, **kw)
        self.barres = self.marques

    def _construire_marques(self):
        slot = self.L / max(1, self.n)
        h = lambda v: max(0.001, (v - self.mini) / (self.maxi - self.mini) * self.H)  # noqa: E731
        g = VGroup()
        for i, v in enumerate(self.valeurs):
            x = slot * (i + 0.5)
            if self.batons:
                trait = Line(P(x, 0), P(x, h(v)), color=self.couleurs[i], stroke_width=12)
                pt = Dot(P(x, h(v)), radius=0.11, fill_color=self.couleurs[i], fill_opacity=1,
                         stroke_color=NUIT, stroke_width=3)
                g.add(VGroup(trait, pt))
            else:
                w = max(0.5, slot * self.largeur_barre)
                b = RoundedRectangle(width=w, height=h(v), corner_radius=min(0.07, h(v) / 2),
                                     fill_color=self.couleurs[i], fill_opacity=1, stroke_color=ENCRE, stroke_width=3)
                g.add(b.move_to(P(x, 0), aligned_edge=DOWN))
        return g

    def _haut(self, i):
        """En barres, la lecture part du coin haut côté axe (le bord gauche)."""
        if self.batons:
            return self.point(i)
        return self.marques[i].get_corner(UL)

    def _style(self, m, avant, allume, opacite, couleur):
        if not self.batons:
            return super()._style(m, avant, allume, opacite, couleur)
        m.set_opacity(opacite)
        m[1].set_stroke(couleur if allume else NUIT, width=7 if allume else 3)
        if allume != avant:
            m[1].scale(1.3 if allume else 1 / 1.3)


# ── la courbe (une évolution) ───────────────────────────────────────────────

class Courbe(_Repere):
    """La courbe du coach (`stat_graph` courbe) : points bleus reliés, un par
    catégorie (mois, année…). Paramètres de _Repere, plus `couleur`.
    Morceaux : .ligne (la ligne brisée) ; .ronds (= .marques), ronds[i] = Dot (⛔ pas « points » : nom réservé de Manim).
    Gestes : vers_bas(i) (pointillé vertical du coach), vers_axe(i), monter(i).
    """

    def __init__(self, categories, valeurs, pas, couleur=BLEU_COURBE, **kw):
        self.couleur = couleur
        super().__init__(categories, valeurs, pas, **kw)
        self.ronds = self.marques

    def _construire_marques(self):
        slot = self.L / max(1, self.n)
        y = lambda v: (min(max(v, self.mini), self.maxi) - self.mini) / (self.maxi - self.mini) * self.H  # noqa: E731
        pts = [P(slot * (i + 0.5), y(v)) for i, v in enumerate(self.valeurs)]
        self.ligne = VMobject(stroke_color=self.couleur, stroke_width=6, joint_type=LineJointType.ROUND)
        self.ligne.set_points_as_corners(pts)
        g = VGroup(*[Dot(p, radius=0.11, fill_color=self.couleur, fill_opacity=1, stroke_color=WHITE,
                         stroke_width=3) for p in pts])
        self.grille.add(self.ligne)  # la ligne passe SOUS les points (et dans .fond : voir tracer)
        return g

    @property
    def fond(self):
        """Comme _Repere.fond, mais SANS la ligne (elle se trace avec tracer())."""
        return VGroup(*[m for m in self.submobjects if m is not self.marques and m is not self.grille],
                      VGroup(*[m for m in self.grille if m is not self.ligne]))

    def tracer(self, run_time=2.0):
        """Les points apparaissent un à un, la ligne se trace avec eux."""
        return AnimationGroup(Create(self.ligne, rate_func=linear),
                              LaggedStart(*[FadeIn(p, scale=0.3) for p in self.ronds], lag_ratio=1.0),
                              run_time=run_time)

    def pousser(self, indices=None, run_time=2.0, lag=0.25):
        return self.tracer(run_time)

    def _style(self, m, avant, allume, opacite, couleur):
        """Le point allumé : ambre et plus gros (`highlightIndex`)."""
        m.set_fill(couleur if allume else self.couleur, opacity=opacite)
        m.set_stroke(WHITE, width=3, opacity=opacite)
        if allume != avant:
            m.scale(1.45 if allume else 1 / 1.45)


# ── le diagramme circulaire (camembert) ─────────────────────────────────────

class Camembert(VGroup):
    """Le camembert du coach (`stat_graph` camembert) : la 1re part part de
    midi, dans le sens des aiguilles ; couleurs franches ; bord blanc.

    etiquettes : le nom de chaque part ; valeurs : les effectifs.
    montrer_etiquettes : les noms sur les parts (`showLabels`).
    valeurs_parts : la valeur sous le nom (`valeursParts`) ; pourcentages : en %
      entiers dont la somme fait 100 (`pourcentages`).
    total : écrit « total : N » sous le disque (`showValues`).
    Une PETITE part écrit son nom DEHORS (même règle que le coach).
    Morceaux : .parts[i] (Sector) .textes[i] (VGroup, peut être vide) .carte .titre
    Gestes : apparaitre(), allumer(i), focus(i), sortir(i), estomper(garder), rallumer(),
    moitie(), quarts().
    """

    def __init__(self, etiquettes, valeurs, rayon=1.8, couleurs=None, montrer_etiquettes=True, valeurs_parts=False,
                 pourcentages=False, total=False, titre=None, centre=ORIGIN, fs=30, carte=True, **kw):
        super().__init__(**kw)
        self.etiquettes_txt, self.valeurs, self.r, self.fs = list(etiquettes), list(valeurs), rayon, fs
        couleurs = couleurs or [COULEURS_CAMEMBERT[i % len(COULEURS_CAMEMBERT)] for i in range(len(valeurs))]
        somme = sum(valeurs)
        pc = pourcentages_entiers(valeurs)
        self.ref_c = Dot(ORIGIN, radius=0.01, fill_opacity=0, stroke_width=0)
        self.ref_r = Line(ORIGIN, P(rayon, 0), stroke_width=0)  # suit les agrandissements
        self.parts, self.textes, self._milieux = VGroup(), VGroup(), []
        debut = PI / 2
        for i, v in enumerate(valeurs):
            ang = v / somme * TAU if somme else 0
            s = Sector(radius=rayon, start_angle=debut, angle=-ang, fill_color=couleurs[i], fill_opacity=1,
                       stroke_color=WHITE, stroke_width=4)
            if len(valeurs) == 1:
                s = Circle(radius=rayon, fill_color=couleurs[i], fill_opacity=1, stroke_color=WHITE, stroke_width=4)
            milieu = debut - ang / 2
            self._milieux.append(milieu)
            n_lettres = len(str(etiquettes[i]))
            petite = ang < (0.75 if valeurs_parts else 0.55) + max(0, n_lettres - 4) * 0.2
            lignes = []
            if montrer_etiquettes:
                lignes.append(texte(etiquettes[i], fs, NUIT))
            if valeurs_parts:
                lignes.append(texte(f"{pc[i]} %" if pourcentages else fr(v), fs - 2, NUIT))
            t = VGroup(*lignes).arrange(DOWN, buff=0.08) if lignes else VGroup()
            for m in t:
                m.set_stroke(WHITE, width=5, background=True)
            if lignes:
                d = np.array([math.cos(milieu), math.sin(milieu), 0.0])
                if petite:
                    t.move_to(d * (rayon + 0.25), aligned_edge=LEFT if d[0] >= 0 else RIGHT)
                    t.shift(UP * d[1] * t.height / 2)
                else:
                    t.move_to(d * rayon * 0.62)
            self.parts.add(s)
            self.textes.add(t)
            debut -= ang
        self.add(self.parts, self.textes, self.ref_c, self.ref_r)
        if total:
            self.total = texte(f"total : {fr(somme)}", fs - 2, GRIS_NOM).next_to(self.parts, DOWN, buff=0.3)
            self.add(self.total)
        self.titre = None
        if titre:  # dans la carte, en haut (`figure.title` du coach)
            self.titre = texte(titre, int(fs * 1.05), NUIT).next_to(VGroup(*self.submobjects), UP, buff=0.3)
            self.add(self.titre)
        self.carte = VMobject()
        if carte:
            self.carte = carte_autour(VGroup(*self.submobjects), marge=0.4)
            self.add_to_back(self.carte)
        self.move_to(centre)

    @property
    def centre(self):
        return self.ref_c.get_center()

    def _rayon(self):
        """Le rayon actuel (la figure a pu être agrandie)."""
        return np.linalg.norm(self.ref_r.get_end() - self.ref_r.get_start())

    def _dir(self, i):
        a = self._milieux[i]
        return np.array([math.cos(a), math.sin(a), 0.0])

    @property
    def fond(self):
        """La carte, le titre et le total (les parts viennent avec apparaitre())."""
        return VGroup(*[m for m in (self.carte, self.titre, getattr(self, "total", None)) if m is not None])

    def apparaitre(self, run_time=1.6, lag=0.35):
        """Les parts poussent du centre, l'une après l'autre, puis leurs noms."""
        c = self.centre
        return LaggedStart(*[AnimationGroup(GrowFromPoint(p, c), FadeIn(t)) for p, t in zip(self.parts, self.textes)],
                           lag_ratio=lag, run_time=run_time)

    def _vers(self, i, allume=None, opacite=None, couleur=AMBRE):
        """UN Transform par part vers une copie restylée (voir _Repere._vers)."""
        if not hasattr(self, "_allumees"):
            self._allumees, self._opacites = set(), {}
        a = (i in self._allumees) if allume is None else allume
        o = self._opacites.get(i, 1.0) if opacite is None else opacite
        t = self.parts[i].copy()
        t.set_fill(opacity=o).set_stroke(couleur if a else WHITE, width=10 if a else 4)
        self.parts[i].set_z_index(1 if a else 0)  # la part allumée passe devant
        (self._allumees.add if a else self._allumees.discard)(i)
        self._opacites[i] = o
        return Transform(self.parts[i], t)

    def allumer(self, i, couleur=AMBRE):
        """La part i s'allume : bord ambre épais (`highlightIndex`), passée devant. Animation."""
        return self._vers(i, allume=True, couleur=couleur)

    def eteindre(self, i):
        return self._vers(i, allume=False)

    def focus(self, i, opacite=0.3, couleur=AMBRE):
        """La part i s'allume ET les autres pâlissent. Animation."""
        return AnimationGroup(*[self._vers(j, allume=(j == i), opacite=1.0 if j == i else opacite, couleur=couleur)
                                for j in range(len(self.parts))])

    def sortir(self, i, d=0.25):
        """La part i (et son nom) glisse vers l'extérieur : « regarde cette part »."""
        return VGroup(self.parts[i], self.textes[i]).animate.shift(self._dir(i) * d * self._rayon() / self.r)

    def rentrer(self, i, d=0.25):
        return VGroup(self.parts[i], self.textes[i]).animate.shift(-self._dir(i) * d * self._rayon() / self.r)

    def estomper(self, garder, opacite=0.3):
        """Les parts hors de `garder` pâlissent. Animation."""
        garder = [garder] if isinstance(garder, int) else list(garder)
        return AnimationGroup(*[self._vers(j, opacite=1.0 if j in garder else opacite) for j in range(len(self.parts))])

    def rallumer(self):
        return AnimationGroup(*[self._vers(j, allume=False, opacite=1.0) for j in range(len(self.parts))])

    def moitie(self, couleur=NUIT):
        """Le diamètre vertical en pointillé : la MOITIÉ du disque (parts depuis midi)."""
        c, r = self.centre, self._rayon()
        return DashedLine(c + UP * (r + 0.15), c + DOWN * (r + 0.15), color=couleur, stroke_width=5,
                          dash_length=0.14).set_z_index(2)

    def quarts(self, couleur=NUIT):
        """Les deux diamètres en pointillé : les QUARTS du disque."""
        c, r = self.centre, self._rayon()
        h = DashedLine(c + LEFT * (r + 0.15), c + RIGHT * (r + 0.15), color=couleur, stroke_width=5,
                       dash_length=0.14).set_z_index(2)
        return VGroup(self.moitie(couleur), h)


# ── le tableau `tableau_donnees` ────────────────────────────────────────────

class Tableau(VGroup):
    """Le tableau du coach (`tableau_donnees`) : en-tête sombre au texte blanc,
    colonne des libellés bleu clair, cases blanches (une ligne sur deux grisée),
    case / ligne / colonne allumée en jaune avec un anneau.

    entetes : les titres des colonnes de valeurs.
    lignes  : liste de listes de valeurs (nombre, texte, "?" en orange, None = vide).
    libelles : un libellé par ligne (colonne de gauche) ; coin : le texte du coin
      haut gauche (« Données » dans le coach ; "" pour le laisser vide).
    largeur_case, largeur_libelle, hauteur : tailles en unités Manim.
    Morceaux : .cases[r][c] = VGroup(rect, texte) ; .tetes[c] ; .libelles[r] ; .coin
    Gestes : allumer_case(r, c), allumer_ligne(r), allumer_colonne(c), eteindre(),
    remplir(r, c, valeur), case(r, c), texte_case(r, c).
    """

    def __init__(self, entetes, lignes, libelles=None, coin="Données", largeur_case=1.7, largeur_libelle=2.6,
                 hauteur=0.8, fs=30, rayures=True, titre=None, centre=ORIGIN, carte=True, **kw):
        super().__init__(**kw)
        self.fs, self.rayures, self.h0 = fs, rayures, hauteur
        avec_lib = bool(libelles) and any(str(x).strip() for x in libelles)
        x0 = largeur_libelle if avec_lib else 0.0
        w, h = largeur_case, hauteur

        def rect(cx, cy, larg, fond):
            return Rectangle(width=larg, height=h, fill_color=fond, fill_opacity=1, stroke_color=BORD_TABLEAU,
                             stroke_width=2.5).move_to(P(cx, cy))

        def case_txt(val, fond, cx, cy, larg, color=NUIT):
            r = rect(cx, cy, larg, fond)
            t = self._texte(val, color).move_to(r)
            if t.width > larg * 0.9:
                t.scale_to_fit_width(larg * 0.9)
            return VGroup(r, t)

        self.coin = None
        if avec_lib:
            self.coin = case_txt(coin or "", EN_TETE, largeur_libelle / 2, 0, largeur_libelle, WHITE)
            self.add(self.coin)
        self.tetes = VGroup(*[case_txt(e, EN_TETE, x0 + w * (j + 0.5), 0, w, WHITE) for j, e in enumerate(entetes)])
        self.add(self.tetes)
        self.libelles, self.cases, self._fonds = VGroup(), [], []
        for i, ligne in enumerate(lignes):
            cy = -h * (i + 1)
            fond = RAYURE if (rayures and i % 2 == 1) else CARTE
            if avec_lib:
                self.libelles.add(case_txt(libelles[i], LIBELLE, largeur_libelle / 2, cy, largeur_libelle))
            rang = [case_txt(v, fond, x0 + w * (j + 0.5), cy, w) for j, v in enumerate(ligne)]
            self.cases.append(rang)
            self._fonds.append(fond)
        self.add(self.libelles, *[c for rang in self.cases for c in rang])
        self.titre = None
        if titre:  # dans la carte, en haut (`figure.title` du coach)
            self.titre = texte(titre, int(fs * 1.05), NUIT).next_to(VGroup(*self.submobjects), UP, buff=0.3)
            self.add(self.titre)
        self.carte = VMobject()
        if carte:
            self.carte = carte_autour(VGroup(*self.submobjects), marge=0.3, rayon=0.3)
            self.add_to_back(self.carte)
        self.move_to(centre)

    def _texte(self, val, color=NUIT):
        if val is None or str(val).strip() == "":
            return VectorizedPoint()
        if str(val).strip() == "?":
            return texte("?", self.fs + 4, ORANGE_Q)
        return texte(val, self.fs, color)

    # -- les getters --

    def case(self, r, c):
        """Le rectangle de la case (ligne r, colonne c), en comptant les valeurs depuis 0."""
        return self.cases[r][c][0]

    def texte_case(self, r, c):
        return self.cases[r][c][1]

    # -- les gestes --

    def _allumer(self, coords, couleur=CASE_ALLUMEE, anneau=ANNEAU):
        anims = []
        for r, c in coords:
            self.cases[r][c].set_z_index(1)
            anims.append(self.case(r, c).animate.set_fill(couleur).set_stroke(anneau, width=7))
        return anims

    def allumer_case(self, r, c, **kw):
        """La case (r, c) s'allume : jaune et anneau (`highlight.cell`). Liste d'animations."""
        return self._allumer([(r, c)], **kw)

    def allumer_ligne(self, r, **kw):
        """Toute la ligne r s'allume (`highlight.row`). Liste d'animations."""
        return self._allumer([(r, c) for c in range(len(self.cases[r]))], **kw)

    def allumer_colonne(self, c, **kw):
        """Toute la colonne c s'allume (`highlight.col`). Liste d'animations."""
        return self._allumer([(r, c) for r in range(len(self.cases))], **kw)

    def eteindre(self):
        """Toutes les cases reprennent leur fond. Liste d'animations."""
        anims = []
        for r, rang in enumerate(self.cases):
            for c, cs in enumerate(rang):
                cs.set_z_index(0)
                anims.append(cs[0].animate.set_fill(self._fonds[r]).set_stroke(BORD_TABLEAU, width=2.5))
        return anims

    def remplir(self, r, c, valeur, color=NUIT):
        """La case (r, c) reçoit `valeur` (un « ? » qui devient un nombre, par
        exemple) : l'ancien texte s'efface, le nouveau grossit en place. Animation."""
        vieux = self.cases[r][c][1]
        rect = self.case(r, c)
        neuf = self._texte(valeur, color)
        neuf.scale(rect.height / self.h0).move_to(rect)  # la figure a pu être agrandie
        if neuf.width > rect.width * 0.9:
            neuf.scale_to_fit_width(rect.width * 0.9)
        self.cases[r][c].remove(vieux)
        self.cases[r][c].add(neuf)
        return AnimationGroup(FadeOut(vieux, scale=0.5), FadeIn(neuf, scale=1.6))
