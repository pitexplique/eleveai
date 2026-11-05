# canvas_angles.py
# LES FIGURES DE LA SÉRIE « ANGLES » 6e (05/11/2026), notion angle_mesure.
# Créé par le pilote (01-reconnaitre) ; LECTURE SEULE pour les épisodes suivants :
# s'il leur manque quelque chose, ils l'ajoutent dans LEUR script et le disent.
# ⛔ Rien n'est ajouté à la scène : tout est RENVOYÉ (objets, animations) ; la
# scène décide quand, AU MOT de la voix. ⛔ Pas de LaTeX : que des Text.
# ⭐ Vraies mesures partout : un arc marqué 55° ouvre 55°. Directions en DEGRÉS,
# sens maths (0 = vers la droite, 90 = vers le haut).
#
# ── L'API EN BREF ─────────────────────────────────────────────────────────────
#   sys.path : manim/ (comme canvas_proportion) ; `from prop_commun import *` PUIS
#   `from canvas_angles import *` ; bases de scène : PaysageProp / ShortProp.
#
#   a = Angle(sommet, dir1, dir2, longueur=3, noms=("A","O","B"), arc=True,
#             mesure=None | "55°" | True (nombre vivant), fleches=False, secteur=0.16)
#     a.cote1 a.cote2 a.arc a.fond a.coin a.point a.lettre1 a.lettre_s a.lettre2 a.etiquette
#     a.ouvrir(90)          # animation : l'angle s'ouvre/se ferme, tout suit ; à 90° le
#                           # petit carré (a.coin) remplace l'arc tout seul
#     a.tourner(30)         # animation : tout l'angle tourne autour du sommet
#     a.glisser(p)          # animation : le sommet va en p (⛔ jamais .animate.shift :
#                           # les updaters le ramèneraient ; ou bien a.figer() d'abord)
#     a.mesure_ · a.p1 · a.p2 · a.s · a.milieu(r)   # géométrie du moment
#     a.figer() · a.copie() # coupe les updaters / une copie figée (.scale, .shift permis)
#     a.maj()               # À APPELER avant de montrer un morceau resté hors scène
#     a.t_long.set_value(0) ; a.maj() ; self.add(a.cote1, a.cote2, a.point) ;
#     self.play(a.construire()) # les côtés poussent DEPUIS le sommet
#   r = Rapporteur(centre, rayon=3, zero_a_droite=True)
#     r.fond r.graduations[v] r.nombres["int"|"ext"][v] r.centre_marque
#     r.poser(sommet, dir_zero, rangee="int")   # animation : centre sur le sommet, le 0
#                           # de cette rangée sur la direction dir_zero ; nombres droits
#     r.allumer_rangee("int") / r.eteindre_rangees()         # animations
#     r.allumer_nombre(55, "int") / r.eteindre_nombre(55, "int")   # animations
#     r.allumer_graduation(55) / r.eteindre_graduation(55)   # animations
#     r.suivre(35, "int", pas=10)   # liste d'animations : du 0 au nombre (LaggedStart)
#     r.direction(55, "int") · r.point_sur(55, "int", k=1.0)  # direction absolue / point
#     r.lecture(55)         # {"int": 55, "ext": 125} : ce qu'on lit de chaque rangée
#   e = Equerre(sommet, direction=0, taille=1.8, sens=1)  # coin droit en sommet
#     e.poser(sommet, direction)    # animation : elle glisse et tourne jusque-là
#   Noms : nom_angle("A","O","B") (.sommet = la lettre du milieu, rouge) ;
#          demi_droite("O","A") = « [OA) » ; famille(150) = ("obtus", couleur).
#   Couleurs : COTE ARC SOMMET JUSTE PIEGE ; FAMILLE = {"aigu": …, "droit": …,
#          "obtus": …, "plat": …} (mêmes couleurs dans tous les épisodes).
#
# ── L'AUDIT ───────────────────────────────────────────────────────────────────
#   Repris de canvas_proportion (AuditSynchro, déjà dans PaysageProp / ShortProp) :
#   AUDIT=1 BORDS=1 python -m manim render --dry_run <script> <Classe>
#   Les nombres du rapporteur sont `sans_synchro` et `_pas_audit` (données d'une
#   figure qu'on LIT) ; a.etiquette n'est audité que si `mesure` est un texte fixe.

import sys

import numpy as np
from manim import *

from canvas_proportion import AuditSynchro  # noqa: F401
from charte import ROUGE_ERREUR, VERT_OK

# ── le code couleur, constant dans toute la série ───────────────────────────
COTE = "#60a5fa"     # côtés bleus
ARC = "#fb923c"      # arc orange
SOMMET = "#ef4444"   # sommet rouge
JUSTE = VERT_OK      # résultat juste
PIEGE = ROUGE_ERREUR  # piège
FAMILLE = {"aigu": "#22d3ee", "droit": "#facc15", "obtus": "#c084fc", "plat": "#f472b6"}
EQUERRE = "#bfdbfe"  # l'équerre, bleu pâle
RAPPORTEUR = "#bae6fd"
RANGEE = {"int": "#ffffff", "ext": "#fde68a"}  # les deux rangées, jamais confondues


def polaire(deg, r=1.0, centre=ORIGIN):
    a = np.deg2rad(deg)
    return np.array(centre, dtype=float) + r * np.array([np.cos(a), np.sin(a), 0.0])


def famille(mesure):
    """(nom, couleur) de la famille d'un angle ; ≤ 180°."""
    nom = "aigu" if mesure < 90 else "droit" if mesure == 90 else "obtus" if mesure < 180 else "plat"
    return nom, FAMILLE[nom]


def nom_angle(a, o, b, fs=44, couleur=WHITE):
    """« AOB » : le sommet au milieu, en rouge. g.sommet = la lettre du milieu."""
    g = VGroup(Text(a, font_size=fs, color=couleur, weight=BOLD), Text(o, font_size=fs, color=SOMMET, weight=BOLD),
               Text(b, font_size=fs, color=couleur, weight=BOLD)).arrange(RIGHT, buff=0.14 * fs / 44)
    for m in g:
        m.align_to(g, DOWN)
    g.sommet = g[1]
    return g


def demi_droite(o, a, fs=40, couleur=COTE):
    """« [OA) » : la façon d'écrire une demi-droite d'origine O."""
    return Text(f"[{o}{a})", font_size=fs, color=couleur, weight=BOLD)


class Angle(VGroup):
    """Deux demi-droites à leur vraie mesure. Tout suit trois réglages : la
    direction de chaque côté (t1, t2) et le sommet (tx, ty)."""

    def __init__(self, sommet=ORIGIN, dir1=0, dir2=55, longueur=3.0, noms=None, arc=True, mesure=None,
                 fleches=False, secteur=0.16, rayon_arc=0.6, fs=36, sw=6, couleur=COTE, couleur_arc=ARC, **kw):
        super().__init__(**kw)
        s = np.array(sommet, dtype=float)
        self.tx, self.ty = ValueTracker(s[0]), ValueTracker(s[1])
        self.t1, self.t2 = ValueTracker(float(dir1)), ValueTracker(float(dir2))
        self.longueur, self.rayon_arc, self.fleches = longueur, rayon_arc, fleches
        self._fs, self._ech_tip, self._coul_arc = fs, 0.2 * sw / 6, couleur_arc
        self.t_long = ValueTracker(1.0)  # 0 → 1 : la longueur des côtés (construire)

        self.fond = VMobject(fill_color=couleur_arc, fill_opacity=secteur if arc else 0, stroke_width=0)
        self.arc = VMobject(stroke_color=couleur_arc, stroke_width=sw, stroke_opacity=1 if arc else 0, fill_opacity=0)
        self.coin = VMobject(stroke_color=couleur_arc, stroke_width=max(4, sw - 1), stroke_opacity=0, fill_opacity=0)
        self._a_arc = arc
        self.cote1 = self._faire_cote(couleur, sw)
        self.cote2 = self._faire_cote(couleur, sw)
        self.point = Dot(s, radius=0.09, color=SOMMET)
        self.add(self.fond, self.arc, self.coin, self.cote1, self.cote2, self.point)

        self.lettre1 = self.lettre_s = self.lettre2 = None
        self.lettres = VGroup()
        if noms:
            self.lettre1 = Text(noms[0], font_size=fs, color=WHITE, weight=BOLD)
            self.lettre_s = Text(noms[1], font_size=fs, color=SOMMET, weight=BOLD)
            self.lettre2 = Text(noms[2], font_size=fs, color=WHITE, weight=BOLD)
            self.lettres.add(self.lettre1, self.lettre_s, self.lettre2)
            self.add(self.lettres)
        self.etiquette = None
        self._vivant = mesure is True
        if mesure is not None:
            txt = f"{int(round(self.mesure_))}°" if self._vivant else str(mesure)
            self.etiquette = Text(txt, font_size=fs, color=couleur_arc, weight=BOLD)
            if self._vivant:
                self.etiquette.sans_synchro = self.etiquette._pas_audit = True
            self.add(self.etiquette)
        self._etat_coin = None
        self._mettre_a_jour_tout()
        self._brancher()

    # ── la géométrie du moment ───────────────────────────────────────────────
    @property
    def s(self):
        return np.array([self.tx.get_value(), self.ty.get_value(), 0.0])

    @property
    def mesure_(self):
        return abs(self.t2.get_value() - self.t1.get_value())

    @property
    def p1(self):
        return polaire(self.t1.get_value(), self.longueur * self.t_long.get_value(), self.s)

    @property
    def p2(self):
        return polaire(self.t2.get_value(), self.longueur * self.t_long.get_value(), self.s)

    def milieu(self, r=1.0):
        """Le point à distance r du sommet, sur la bissectrice."""
        return polaire((self.t1.get_value() + self.t2.get_value()) / 2, r, self.s)

    # ── le dessin : seuls les POINTS changent, jamais le style ───────────────
    def _faire_cote(self, couleur, sw):
        trait = Line(LEFT, RIGHT, color=couleur, stroke_width=sw)
        pointe = VMobject(fill_color=couleur, fill_opacity=1 if self.fleches else 0, stroke_width=0)
        return VGroup(trait, pointe)

    def _poser_cote(self, cote, deg):
        s, u = self.s, polaire(deg)
        lg = max(0.01, self.longueur * self.t_long.get_value())
        v = np.array([-u[1], u[0], 0.0])
        tip = self._ech_tip * min(1.0, lg / 0.8)  # la pointe grandit avec le côté
        cote[0].put_start_and_end_on(s, s + u * max(0.005, lg - (tip if self.fleches else 0)))
        b = s + u * lg
        cote[1].set_points_as_corners([b, b - u * tip * 1.5 + v * tip * 0.75, b - u * tip * 1.5 - v * tip * 0.75, b])

    def _poser_arc(self):
        a1, a2 = self.t1.get_value(), self.t2.get_value()
        ang = a2 - a1
        if abs(ang) < 0.5:
            ang = 0.5
        d, an = np.deg2rad(a1), np.deg2rad(ang)
        self.arc.set_points(Arc(radius=self.rayon_arc, start_angle=d, angle=an, arc_center=self.s).get_points())
        self.fond.set_points(AnnularSector(inner_radius=0.0, outer_radius=self.rayon_arc, angle=an, start_angle=d,
                                           arc_center=self.s).get_points())

    def _poser_coin(self):
        c = 0.36
        s, u, v = self.s, polaire(self.t1.get_value()), polaire(self.t2.get_value())
        self.coin.set_points_as_corners([s + u * c, s + (u + v) * c, s + v * c])
        droit = abs(self.mesure_ - 90) < 0.5
        if droit != self._etat_coin:
            self._etat_coin = droit
            if self._a_arc:
                self.arc.set_stroke(opacity=0 if droit else 1)
                self.coin.set_stroke(opacity=1 if droit else 0)

    def _poser_lettres(self):
        if self.lettre1 is None:
            return
        a1, a2 = self.t1.get_value(), self.t2.get_value()
        lg = self.longueur * self.t_long.get_value()
        self.lettre_s.move_to(polaire((a1 + a2) / 2 + 180, 0.42, self.s))
        sens = 1 if a2 >= a1 else -1  # chaque lettre DEHORS de l'ouverture, au bout du côté
        self.lettre1.move_to(polaire(a1 - sens * 90, 0.44, polaire(a1, lg * 0.9, self.s)))
        self.lettre2.move_to(polaire(a2 + sens * 90, 0.44, polaire(a2, lg * 0.9, self.s)))

    def _poser_etiquette(self):
        if self.etiquette is None:
            return
        if self._vivant:
            txt = f"{int(round(self.mesure_))}°"
            if txt != self.etiquette.original_text:
                # pas de become : il perd la couleur quand le nombre change plusieurs fois
                neuf = Text(txt, font_size=self._fs, color=self._coul_arc, weight=BOLD)
                self.etiquette.submobjects = neuf.submobjects
                self.etiquette.original_text = txt
        # hors de l'arc, sur la bissectrice ; plus loin si l'angle est très fermé
        r = self.rayon_arc + 0.28 + self.etiquette.width / 2 + max(0.0, (40 - self.mesure_) * 0.012)
        self.etiquette.move_to(self.milieu(r))

    def _mettre_a_jour_tout(self):
        self._poser_cote(self.cote1, self.t1.get_value())
        self._poser_cote(self.cote2, self.t2.get_value())
        self._poser_arc()
        self._poser_coin()
        self.point.move_to(self.s)
        self._poser_lettres()
        self._poser_etiquette()

    def _brancher(self):
        """Un updater par morceau : un morceau montré seul (FadeIn(a.arc)) suit aussi."""
        self.cote1.add_updater(lambda m: self._poser_cote(self.cote1, self.t1.get_value()))
        self.cote2.add_updater(lambda m: self._poser_cote(self.cote2, self.t2.get_value()))
        self.arc.add_updater(lambda m: self._poser_arc())
        self.fond.add_updater(lambda m: self._poser_arc())
        self.coin.add_updater(lambda m: self._poser_coin())
        self.point.add_updater(lambda m: m.move_to(self.s))
        if self.lettre1 is not None:
            self.lettres.add_updater(lambda m: self._poser_lettres())
        if self.etiquette is not None:
            self.etiquette.add_updater(lambda m: self._poser_etiquette())

    def maj(self):
        """Remet tout à jour : À APPELER avant de montrer un morceau resté hors
        de la scène pendant que l'angle bougeait (ex. l'arc, FadeIn(a.arc))."""
        self._mettre_a_jour_tout()
        return self

    def figer(self):
        """Coupe les updaters : l'angle redevient un dessin ordinaire."""
        self.clear_updaters(recursive=True)
        return self

    def copie(self):
        """Une copie figée, indépendante, à l'état du moment."""
        return self.copy().figer()

    # ── les animations ───────────────────────────────────────────────────────
    def ouvrir(self, mesure):
        """L'angle s'ouvre (ou se ferme) jusqu'à `mesure`, le côté 2 bouge."""
        sens = 1 if self.t2.get_value() >= self.t1.get_value() else -1
        return self.t2.animate.set_value(self.t1.get_value() + sens * mesure)

    def tourner(self, delta):
        """Tout l'angle tourne de delta degrés autour du sommet."""
        return AnimationGroup(self.t1.animate.set_value(self.t1.get_value() + delta),
                              self.t2.animate.set_value(self.t2.get_value() + delta))

    def glisser(self, p):
        """Le sommet glisse jusqu'en p, sans tourner."""
        return AnimationGroup(self.tx.animate.set_value(p[0]), self.ty.animate.set_value(p[1]))

    def construire(self):
        """Les côtés poussent depuis le sommet : a.t_long.set_value(0), self.add(a),
        puis self.play(a.construire())."""
        return self.t_long.animate.set_value(1.0)


class Rapporteur(VGroup):
    """Le demi-disque gradué, deux rangées de nombres. Par défaut (zero_a_droite)
    la rangée intérieure a son 0 à droite, l'extérieure a son 0 à gauche, comme
    un vrai rapporteur ; zero_a_droite=False les échange. Les nombres restent
    droits quand il tourne. ⛔ Pas de .scale ni .shift : r.poser()."""

    def __init__(self, centre=ORIGIN, rayon=3.0, zero_a_droite=True, **kw):
        super().__init__(**kw)
        self.rayon, self.rot = rayon, 0.0
        self.c = np.array(centre, dtype=float)
        self.zero_a_droite = zero_a_droite
        k = rayon / 3.0
        self.fond = VGroup(
            AnnularSector(inner_radius=0.0, outer_radius=rayon, angle=PI, start_angle=0, arc_center=self.c,
                          fill_color=RAPPORTEUR, fill_opacity=0.14, stroke_width=0),
            Rectangle(width=2 * rayon, height=0.22 * k, fill_color=RAPPORTEUR, fill_opacity=0.14,
                      stroke_width=0).move_to(self.c + DOWN * 0.11 * k),
            Arc(radius=rayon, start_angle=0, angle=PI, arc_center=self.c, stroke_color=RAPPORTEUR, stroke_width=3),
            Line(self.c + LEFT * rayon, self.c + RIGHT * rayon, color=RAPPORTEUR, stroke_width=3))
        self.graduations = {}
        gr = VGroup()
        for v in range(0, 181, 5):
            lg = (0.3 if v % 30 == 0 else 0.22 if v % 10 == 0 else 0.12) * k
            t = Line(polaire(v, rayon - lg, self.c), polaire(v, rayon, self.c), color=RAPPORTEUR,
                     stroke_width=3 if v % 10 == 0 else 2)
            self.graduations[v] = t
            gr.add(t)
        self.gr = gr
        m = 0.13 * k
        self.centre_marque = VGroup(Line(self.c + LEFT * m, self.c + RIGHT * m, color=SOMMET, stroke_width=4),
                                    Line(self.c + DOWN * m, self.c + UP * m, color=SOMMET, stroke_width=4),
                                    Circle(radius=m * 0.75, stroke_color=SOMMET, stroke_width=3).move_to(self.c))
        self.add(self.fond, gr, self.centre_marque)
        self.nombres = {"int": {}, "ext": {}}
        self.rangees = {"int": VGroup(), "ext": VGroup()}
        for rg, rr, fs in (("ext", 0.835, 17), ("int", 0.695, 16)):
            for v in range(0, 181, 10):
                t = Text(str(v), font_size=fs * k, color=RANGEE[rg])
                t.sans_synchro = t._pas_audit = True
                t._rr = rr
                self.nombres[rg][v] = t
                self.rangees[rg].add(t)
                t.move_to(self._place_nombre(rg, v))
        self.add(self.rangees["ext"], self.rangees["int"])

    # ── la géométrie ─────────────────────────────────────────────────────────
    def _zero_a_droite_de(self, rangee):
        return (rangee == "int") == self.zero_a_droite

    def _local(self, v, rangee):
        return v if self._zero_a_droite_de(rangee) else 180 - v

    def direction(self, v, rangee="int"):
        """La direction absolue (degrés) du nombre v de cette rangée."""
        return self._local(v, rangee) + self.rot

    def point_sur(self, v, rangee="int", k=1.0):
        """Le point sur le bord (k=1) ou à k × rayon, dans la direction de v."""
        return polaire(self.direction(v, rangee), self.rayon * k, self.c)

    def lecture(self, mesure):
        """Ce qu'on lit de chaque rangée, côté ouvert de `mesure` depuis le 0 droit."""
        return {"int": mesure if self.zero_a_droite else 180 - mesure,
                "ext": 180 - mesure if self.zero_a_droite else mesure}

    def _place_nombre(self, rangee, v):
        loc = self._local(v, rangee)
        if v in (0, 180):  # posés au-dessus de la base, pas à cheval sur elle
            loc += (3.5 if loc == 0 else -3.5)
        return polaire(loc + self.rot, self.rayon * self.nombres[rangee][v]._rr, self.c)

    def _placer(self, c, rot):
        d = rot - self.rot
        for m in (self.fond, self.gr, self.centre_marque):
            m.rotate(np.deg2rad(d), about_point=self.c)
            m.shift(c - self.c)
        self.c, self.rot = np.array(c, dtype=float), rot
        for rg in self.nombres:
            for v, t in self.nombres[rg].items():
                t.move_to(self._place_nombre(rg, v))

    def poser(self, sommet, dir_zero=0.0, rangee="int"):
        """Animation : le centre va sur `sommet`, le 0 de `rangee` sur dir_zero."""
        c0, r0 = self.c.copy(), self.rot
        c1 = np.array(sommet, dtype=float)
        r1 = dir_zero if self._zero_a_droite_de(rangee) else dir_zero - 180
        return UpdateFromAlphaFunc(self, lambda m, a: m._placer(c0 + (c1 - c0) * a, r0 + (r1 - r0) * a))

    # ── allumer ──────────────────────────────────────────────────────────────
    def allumer_rangee(self, rangee="int", couleur=VERT_OK):
        autre = "ext" if rangee == "int" else "int"
        return AnimationGroup(self.rangees[rangee].animate.set_color(couleur),
                              self.rangees[autre].animate.set_opacity(0.3))

    def eteindre_rangees(self):
        return AnimationGroup(*[self.rangees[r].animate.set_color(RANGEE[r]).set_opacity(1) for r in ("int", "ext")])

    def allumer_nombre(self, v, rangee="int", couleur=VERT_OK, k=1.6):
        return self.nombres[rangee][v].animate.set_color(couleur).scale(k)

    def eteindre_nombre(self, v, rangee="int", k=1.6):
        return self.nombres[rangee][v].animate.set_color(RANGEE[rangee]).scale(1 / k)

    def allumer_graduation(self, v, couleur=VERT_OK):
        return self.graduations[v].animate.set_stroke(couleur, width=7)

    def eteindre_graduation(self, v):
        return self.graduations[v].animate.set_stroke(RAPPORTEUR, width=3 if v % 10 == 0 else 2)

    def suivre(self, v, rangee="int", pas=10, couleur="#fbbf24"):
        """Du 0 au nombre v : la liste d'animations du doigt qui suit la rangée
        (les nombres de pas en pas, jusqu'au dernier multiple de 10 avant v)."""
        vals = [x for x in range(0, 181, pas) if x <= v and x in self.nombres[rangee]]
        return [Indicate(self.nombres[rangee][x], color=couleur, scale_factor=1.5) for x in vals]


class Equerre(VGroup):
    """Le triangle bleu pâle, le coin droit au point `sommet`, un côté sur
    `direction`, l'autre à +90° (sens=1) ou −90° (sens=-1). ⛔ e.poser() pour bouger."""

    def __init__(self, sommet=ORIGIN, direction=0.0, taille=1.8, sens=1, **kw):
        super().__init__(**kw)
        self.c, self.rot = np.array(sommet, dtype=float), float(direction)
        u, v = polaire(direction), polaire(direction + sens * 90)
        self.triangle = Polygon(self.c, self.c + u * taille * 1.25, self.c + v * taille, fill_color=EQUERRE,
                                fill_opacity=0.32, stroke_color=EQUERRE, stroke_width=4)
        d = 0.3
        self.coin = VMobject(stroke_color=WHITE, stroke_width=4)
        self.coin.set_points_as_corners([self.c + u * d, self.c + (u + v) * d, self.c + v * d])
        self.add(self.triangle, self.coin)

    def poser(self, sommet, direction=None):
        """Animation : elle glisse (et tourne) jusqu'au sommet et à la direction voulus."""
        c0, r0 = self.c.copy(), self.rot
        c1 = np.array(sommet, dtype=float)
        r1 = r0 if direction is None else float(direction)
        etat = {"c": c0.copy(), "r": r0}

        def maj(m, a):
            c, r = c0 + (c1 - c0) * a, r0 + (r1 - r0) * a
            m.rotate(np.deg2rad(r - etat["r"]), about_point=etat["c"])
            m.shift(c - etat["c"])
            etat["c"], etat["r"] = c, r
            m.c, m.rot = c, r

        return UpdateFromAlphaFunc(self, maj)


# ── les finitions communes (contrôle du pilote, 05/11/2026) ─────────
def visage(p, couleur=BLACK):
    """Des yeux et un sourire SOUS la frange, sur la peau : à appeler sur TOUT
    personnage de `personne(...)`, qui n'a pas de visage. Renvoie p."""
    c, r = p.tete.get_center(), p.tete.width / 2
    yeux = VGroup(*[Dot(c + np.array([x * r, -0.18 * r, 0]), radius=0.11 * r, color=couleur) for x in (-0.36, 0.36)])
    bouche = Arc(radius=0.36 * r, start_angle=-2.5, angle=1.84, arc_center=c + np.array([0, -0.2 * r, 0]),
                 color=couleur, stroke_width=max(1.5, 7 * r))
    p.yeux, p.bouche = yeux, bouche
    p.add(yeux, bouche)
    return p


def interligne_regulier(lignes):
    """Espace des lignes de Text par leur LIGNE DE BASE (arrange les espace par leur
    boîte : les jambages du p ou du g rendaient l'interligne irrégulier). Hauteur totale
    gardée, première ligne fixe. Renvoie le groupe."""
    if len(lignes) < 2:
        return lignes
    base = lambda l: float(np.median([m.get_bottom()[1] for m in (l.submobjects or [l])]))
    b0, b1 = base(lignes[0]), base(lignes[-1])
    pas = (b0 - b1) / (len(lignes) - 1)
    for i, l in enumerate(lignes):
        l.shift(UP * (b0 - i * pas - base(l)))
    return lignes


# Corrigés ici et pas dans prop_commun, partagé avec d'autres séries : seuls les
# scripts de cette série (qui importent ce module) changent.
_pc = sys.modules.get("prop_commun")
if _pc is not None:
    for _cl in (_pc.PaysageProp, _pc.ShortProp):
        def _bloc(self, lignes, fs=38, color=WHITE, buff=0.14, _orig=_cl.bloc):
            return interligne_regulier(_orig(self, lignes, fs, color, buff))
        _cl.bloc = _bloc

    def _disposer_q(self, question, choix, phrase, _orig=_pc.ShortProp._disposer_q):
        """Short : le compte à rebours reste dans la marge de 3 %."""
        res = _orig(self, question, choix, phrase)
        rebours = res[4]
        trop = rebours.get_right()[0] - config.frame_width * 0.46  # 0,46 : le contour de l'anneau déborde de sa boîte
        if trop > 0:
            rebours.shift(LEFT * trop)
        return res
    _pc.ShortProp._disposer_q = _disposer_q
