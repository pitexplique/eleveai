# rond_point.py
# EleveAI — « Les maths en vrai » — Les bouchons au rond-point. CEINTURE NOIRE (Tle).
#
# ⭐ 13/10/2026, Frédéric : « résoudre les problèmes d'embouteillage à La
# Réunion », puis « simulation avec la loi exponentielle sur l'arrivée dans un
# rond-point », puis « il faut des simulations avec des billes ». Il se
# souvient avoir appris la théorie des files d'attente en DESS.
#
# Voix validée (« go ») : manim/voix/974-rond-point.json (Julie, débit −4).
# Le short blanc : rond_point_short.py — mêmes billes, même graine.
#
# ── LE MODÈLE (une file M/D/1) ───────────────────────────────────────────────
# Une entrée de rond-point ; une bille (une voiture) met S = 4 s à s'insérer.
# Les arrivées suivent la loi exponentielle. Simulation hors vidéo (300 heures
# de pointe par point) : 1 bille / 8 s → 2 s d'attente ; / 5 s → 8 s ;
# / 4,4 s → 19 s ; / 4 s → 62 s et 37 billes en file. La formule de
# Pollaczek-Khinchine W = ρS / (2(1 − ρ)) colle aux points.
# ⛔ Ce sont des chiffres de MODÈLE, pas des comptages réunionnais.
#
# ⭐ LES BILLES SONT UNE VRAIE SIMULATION : `File` calcule, pour une liste
# d'arrivées, l'instant où chaque bille entre ; la position de chaque bille est
# une fonction PURE du temps simulé, que pilote un ValueTracker. La graine 1270
# (4,4 s en moyenne, 400 s simulées) donne 94 billes — 91 attendues — et une
# file qui monte à 18, la valeur moyenne du maximum sur une heure.
#
# Rendu : python -m manim render -qh --disable_caching manim/scripts/974/rond_point.py RondPoint974 -o eleveai-maths-974-rond-point-paysage --media_dir manim/scripts/974/media

import math
import random
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *

from charte import *
from gabarit_sixieme import Notion6e
from signes_expression_2de import echelle_ceintures

BILLE = BLEU_CALCUL         # une bille qui roule
ATTENTE = ORANGE_RETENUE    # une bille qui attend
ROUTE = "#3A3A3A"

S_ENTREE = 4.0              # secondes pour entrer dans le rond-point
GRAINE_HASARD = 1270
DUREE_SIMULEE = 400.0

# Les points de la simulation (remplissage %, attente moyenne s), 300 h par point.
COURBE = [(40, 1.3), (50, 2.0), (57, 2.6), (67, 4.0), (73, 5.3), (80, 7.9), (83, 9.8),
          (87, 12.8), (91, 18.6), (93, 23.6), (95, 31.4), (98, 43.3), (100, 62.0)]


# ── la simulation ───────────────────────────────────────────────────────────

def arrivees_hasard(moyenne, duree, graine):
    """Les instants d'arrivée : des écarts tirés dans la loi exponentielle."""
    r = random.Random(graine)
    t, a = r.expovariate(1 / moyenne), []
    while t < duree:
        a.append(t)
        t += r.expovariate(1 / moyenne)
    return a


def arrivees_regulieres(ecart, duree):
    return [ecart * (k + 1) for k in range(int(duree / ecart))]


class File:
    """Une voie vers un rond-point, et ses billes en fonction du temps simulé."""

    def __init__(self, arrivees, y, x0=-6.9, xg=3.4, rayon=0.5, vitesse=0.25,
                 ecart=0.24, r_bille=0.09, tour=20.0):
        self.y, self.x0, self.xg, self.rayon = y, x0, xg, rayon
        self.v, self.ecart, self.r_bille, self.tour = vitesse, ecart, r_bille, tour
        self.trajet = (xg - x0) / vitesse
        self.a = arrivees
        self.g = [x + self.trajet for x in arrivees]   # arrivée à la porte
        self.d, libre = [], 0.0                        # entrée dans l'anneau
        for g in self.g:
            e = max(g, libre)
            self.d.append(e)
            libre = e + S_ENTREE

    def decor(self):
        route = Rectangle(width=self.xg - self.x0 + 0.3, height=0.32).set_fill(ROUTE, 1).set_stroke(width=0)
        route.move_to([(self.x0 + self.xg) / 2, self.y, 0])
        c = [self.xg + self.rayon, self.y, 0]
        anneau = Circle(radius=self.rayon).set_stroke(ROUTE, 22).move_to(c)
        ilot = Circle(radius=self.rayon - 0.2).set_fill(GREEN_E, 0.8).set_stroke(width=0).move_to(c)
        sortie = Rectangle(width=0.9, height=0.32).set_fill(ROUTE, 1).set_stroke(width=0)
        sortie.move_to([self.xg + 2 * self.rayon + 0.4, self.y, 0])
        porte = Line([self.xg, self.y - 0.2, 0], [self.xg, self.y + 0.2, 0], color=WHITE, stroke_width=3)
        return VGroup(route, sortie, anneau, ilot, porte)

    def en_file(self, t):
        return sum(1 for g, d in zip(self.g, self.d) if g <= t < d)

    def billes(self, t):
        groupe = VGroup()
        devant = 0                      # billes déjà là et pas encore entrées
        cx = self.xg + self.rayon
        for a, d in zip(self.a, self.d):
            if t < a:
                break
            if t < d:
                libre = self.x0 + self.v * (t - a)
                cible = self.xg - devant * self.ecart
                attend = libre >= cible - 1e-6
                x = min(libre, cible)
                devant += 1
                if x >= self.x0 - 0.2:
                    groupe.add(Dot([x, self.y, 0], radius=self.r_bille, color=ATTENTE if attend else BILLE))
            elif t < d + self.tour:
                ang = PI + PI * (t - d) / self.tour
                groupe.add(Dot([cx + self.rayon * math.cos(ang), self.y + self.rayon * math.sin(ang), 0],
                               radius=self.r_bille, color=BILLE))
        return groupe

    def fin(self):
        return self.d[-1] if self.d else 0.0


def jouer_file(scene, files, duree_simulee, run_time, compteurs=()):
    """Fait rouler les billes de 0 à `duree_simulee`, en `run_time` secondes."""
    tps = ValueTracker(0.0)
    vues = [always_redraw(lambda f=f: f.billes(tps.get_value())) for f in files]
    scene.add(*vues, *compteurs)
    scene.play(tps.animate.set_value(duree_simulee), run_time=run_time, rate_func=linear)
    return tps, vues


def compteur_file(f, tps, pos, prefixe="file : ", taille=26, record=False, sep="   "):
    """La file en direct ; avec `record`, aussi le plus haut atteint — la voix
    dit « elle monte jusqu'à 18 » quand la file est déjà redescendue."""
    # Le maximum se lit aux instants d'arrivée, pas image par image : une
    # pointe plus brève qu'une image ne doit pas disparaître du compteur.
    pics = [(g, f.en_file(g)) for g in f.g]

    def vue():
        t = tps.get_value()
        n = f.en_file(t)
        txt = f"{prefixe}{n} bille{'s' if n > 1 else ''}"
        if record:
            txt += f"{sep}(maximum : {max([n] + [q for g, q in pics if g <= t])})"
        return Text(txt, font_size=taille, color=ATTENTE if n else VERT_OK).move_to(pos)
    return always_redraw(vue)


def voiture(couleur=BILLE, l=0.9):
    caisse = RoundedRectangle(width=l, height=l * 0.36, corner_radius=0.06).set_fill(couleur, 1).set_stroke(width=0)
    toit = RoundedRectangle(width=l * 0.5, height=l * 0.24, corner_radius=0.05).set_fill(couleur, 1).set_stroke(width=0)
    toit.next_to(caisse, UP, buff=-0.02)
    roues = VGroup(*[Circle(radius=l * 0.1).set_fill(GREY_E, 1).set_stroke(GREY_B, 2)
                     .move_to(caisse.get_bottom() + [dx * l, 0, 0]) for dx in (-0.27, 0.27)])
    return VGroup(toit, caisse, roues)


def feu_tricolore(h=0.9):
    boite = RoundedRectangle(width=h * 0.42, height=h, corner_radius=0.06).set_fill(GREY_E, 1).set_stroke(GREY_B, 2)
    feux = VGroup(*[Circle(radius=h * 0.12).set_fill(c, 1).set_stroke(width=0) for c in (RED, YELLOW, GREEN)])
    feux.arrange(DOWN, buff=h * 0.07).move_to(boite)
    return VGroup(boite, feux)


class RondPoint974(Notion6e):
    nom_voix = "974-rond-point"
    identite = "Maths Terminale — Les maths en vrai"

    def t(self, texte, font_size=32, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def borne(self, m, largeur):
        if m.width > largeur:
            m.scale_to_fit_width(largeur)
        return m

    def compteur(self, f, tps, pos, prefixe="file : ", taille=26, record=False):
        return compteur_file(f, tps, pos, prefixe, taille, record)

    # ── 00 ──────────────────────────────────────────────────────────────────

    def ecran_accroche(self):
        self.clear()
        self.add_mascotte(scale=0.7)
        self.dire("00-accroche")
        titre = self.t("Les bouchons au rond-point", 50, JAUNE_TITRE).to_edge(UP, buff=0.35)
        identite = self.t(self.identite, 24).next_to(titre, DOWN, buff=0.15)
        echelle = echelle_ceintures("noire", largeur=0.45, buff=0.08).move_to([3.9, 1.75, 0])
        self.play(Write(titre), FadeIn(identite), FadeIn(echelle), run_time=1.0)

        f = File([], y=-1.0)
        self.play(FadeIn(f.decor()))
        heure = self.t("7 h du matin", 34, WHITE).move_to([-4.6, 1.75, 0])
        self.play(FadeIn(heure, shift=RIGHT * 0.2))

        trois = VGroup(self.t("pas d'accident", 28), self.t("pas de feu rouge", 28),
                       self.t("pas de travaux", 28)).arrange(RIGHT, buff=0.6).move_to([-1.2, 0.55, 0])
        for mot, m, anim in zip(("Pas d'accident", "pas de feu rouge", "pas de travaux"), trois,
                                (lambda m: FadeIn(m, shift=DOWN * 0.2), lambda m: GrowFromCenter(m),
                                 lambda m: FadeIn(m, shift=LEFT * 0.2))):
            self.au_mot(mot)
            self.play(anim(m), run_time=0.45)

        self.au_mot("la file s'allonge")
        file37 = VGroup(*[Dot([f.xg - k * f.ecart, f.y, 0], radius=f.r_bille, color=ATTENTE) for k in range(37)])
        self.play(LaggedStart(*[FadeIn(b, shift=RIGHT * 0.4) for b in file37], lag_ratio=0.06), run_time=2.0)
        n37 = self.t("37 voitures", 40, ATTENTE).move_to([-2.4, -1.85, 0])
        self.play(GrowFromCenter(n37))
        self.au_mot("Qui a créé")
        q = self.chute("Qui a créé ce bouchon ?", color=JAUNE_TITRE, font_size=34)
        self.play(Write(q))
        self.attendre_voix()

    # ── 01 ──────────────────────────────────────────────────────────────────

    def ecran_billes(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-billes")
        self.titre_ecran("Une voiture = une bille")
        auto = voiture(BILLE, 1.6).move_to([-4.0, 0.6, 0])
        self.play(FadeIn(auto, shift=RIGHT * 0.3))
        self.au_mot("par une bille")
        bille = Dot([-4.0, 0.6, 0], radius=0.3, color=BILLE)
        self.play(Transform(auto, bille))

        f = File([], y=-1.2, x0=-6.5, xg=1.6, rayon=0.8)
        self.play(FadeIn(f.decor()))
        self.au_mot("Pour entrer")
        quatre = self.t("4 s pour entrer", 36, JAUNE_TITRE).move_to([3.4, 0.6, 0])
        self.play(FadeIn(quatre, scale=1.3))
        b = Dot([-6.3, f.y, 0], radius=0.14, color=BILLE)
        self.play(b.animate.move_to([f.xg, f.y, 0]), run_time=1.2, rate_func=smooth)
        b.set_color(ATTENTE)
        c = [f.xg + f.rayon, f.y, 0]
        arc = Arc(radius=f.rayon, start_angle=PI, angle=PI, arc_center=c)
        horloge = self.t("4 s", 30, ATTENTE).next_to(b, UP, buff=0.25)
        self.play(FadeIn(horloge), Indicate(b, color=ATTENTE), run_time=0.8)
        b.set_color(BILLE)
        self.play(MoveAlongPath(b, arc), FadeOut(horloge), run_time=1.0)
        self.attendre_voix()

    # ── 02 / 03 ─────────────────────────────────────────────────────────────

    def ecran_regulier_hasard(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-regulier")
        titre = self.titre_ecran("Premier essai : des billes régulières")
        acc = 40.0
        reg = File(arrivees_regulieres(4.4, DUREE_SIMULEE), y=0.9)
        self.play(FadeIn(reg.decor()))
        lbl1 = self.t("1 bille toutes les 4,4 s", 26).move_to([-4.3, reg.y + 0.5, 0])
        self.au_mot("une toutes les 4,4")
        self.play(FadeIn(lbl1, shift=RIGHT * 0.2))
        vite = self.t("(accéléré)", 20, GREY_B).move_to([-5.8, 3.0 - 0.75, 0])
        tps = ValueTracker(0.0)
        v_reg = always_redraw(lambda: reg.billes(tps.get_value()))
        self.add(v_reg, vite)
        self.play(tps.animate.set_value(140), run_time=140 / acc, rate_func=linear)
        self.au_mot("File : 0 bille")
        bilan1 = VGroup(self.t("file : 0 bille", 28, VERT_OK), self.t("attente : 0 seconde", 28, VERT_OK))
        bilan1.arrange(RIGHT, buff=0.5).move_to([-1.4, reg.y - 0.55, 0])
        self.play(tps.animate.set_value(200), FadeIn(bilan1[0], shift=UP * 0.15), run_time=60 / acc, rate_func=linear)
        self.au_mot("Attente : 0")
        self.play(tps.animate.set_value(260), FadeIn(bilan1[1], shift=UP * 0.15), run_time=60 / acc, rate_func=linear)
        self.attendre_voix(marge=0.2)

        # ── 03 : la même voie, et dessous la voie au hasard ──
        self.dire("03-hasard")
        titre2 = self.t("Deuxième essai : des billes au hasard", 40, JAUNE_TITRE).to_edge(UP)
        self.play(FadeOut(titre, shift=UP * 0.3), FadeIn(titre2, shift=UP * 0.3), FadeOut(bilan1), run_time=0.6)
        has = File(arrivees_hasard(4.4, DUREE_SIMULEE, GRAINE_HASARD), y=-1.5)
        lbl2 = self.t("au hasard : 1 bille toutes les 4,4 s en moyenne", 26, ATTENTE).move_to([-2.6, has.y + 0.5, 0])
        self.play(FadeIn(has.decor()), FadeIn(lbl2, shift=LEFT * 0.2), run_time=0.6)
        self.remove(v_reg)
        tps2 = ValueTracker(0.0)
        cpt_reg = self.compteur(reg, tps2, [1.6, reg.y - 0.5, 0], taille=24)
        cpt_has = self.compteur(has, tps2, [-0.8, has.y - 0.5, 0], taille=28, record=True)
        vues = [always_redraw(lambda f=f: f.billes(tps2.get_value())) for f in (reg, has)]
        self.add(*vues, cpt_reg, cpt_has)
        fin = DUREE_SIMULEE + has.trajet
        self.play(tps2.animate.set_value(fin), run_time=fin / acc, rate_func=linear)
        self.au_mot("jusqu'à 18 billes")
        maxi = self.t("jusqu'à 18 billes", 40, ATTENTE).move_to([-0.8, has.y - 1.25, 0])
        self.play(GrowFromCenter(maxi))
        self.play(maxi.animate.scale(1.3), run_time=0.4)
        self.play(maxi.animate.scale(1 / 1.3), run_time=0.4)
        self.attendre_voix()

    # ── 04 / 05 ─────────────────────────────────────────────────────────────

    def ecran_loi(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-loi")
        self.titre_ecran("Le hasard a une loi")
        ax = self.axes_notion([0, 20, 2], [0, 1, 0.25], x_length=6.6, y_length=3.8, font_size=20)
        ax.move_to([-2.6, -0.5, 0])
        lx = self.t("t (s)", 22).next_to(ax.x_axis, RIGHT, buff=0.15)
        ly = self.t("probabilité", 22).next_to(ax.y_axis, UP, buff=0.15)
        self.au_mot("la loi exponentielle")
        nom = self.t("la loi exponentielle", 36, BLEU_CALCUL).move_to([3.6, 2.0, 0])
        self.play(GrowFromCenter(nom))
        self.au_mot("en moyenne toutes les 6")
        moy = self.t("en moyenne : 1 voiture toutes les 6 s", 26).move_to([3.6, 1.25, 0])
        self.play(FadeIn(moy, shift=LEFT * 0.2))
        self.au_mot("la probabilité que la suivante")
        self.play(Create(ax), FadeIn(lx), FadeIn(ly))
        courbe = ax.plot(lambda x: math.exp(-x / 6), x_range=[0, 20], color=BLEU_CALCUL, stroke_width=5)
        self.play(Create(courbe), run_time=1.4)
        self.au_mot("c'est e puissance")
        formule = VGroup(self.t("P(T > t) =", 40), self.puissance("e", "−t/6", font_size=44)).arrange(RIGHT, buff=0.2)
        formule.move_to([3.6, 0.1, 0])
        cadre = SurroundingRectangle(formule, color=JAUNE_TITRE, buff=0.2)
        self.play(Write(formule), Create(cadre))
        self.attendre_voix(marge=0.3)
        self._loi = (ax, courbe, formule, cadre, nom, moy)

    def ecran_calcul(self):
        ax, courbe, formule, cadre, nom, moy = self._loi
        self.dire("05-calcul")
        self.play(FadeOut(nom), FadeOut(moy), VGroup(formule, cadre).animate.move_to([3.6, 2.1, 0]))
        self.au_mot("Pour t égal à 4")
        p = ax.c2p(4, math.exp(-4 / 6))
        vert = DashedLine(ax.c2p(4, 0), p, color=JAUNE_TITRE)
        horiz = DashedLine(p, ax.c2p(0, math.exp(-4 / 6)), color=JAUNE_TITRE)
        point = Dot(p, color=JAUNE_TITRE, radius=0.09)
        self.play(Create(vert), FadeIn(point, scale=2))
        calc = VGroup(self.t("t = 4 :", 32), self.puissance("e", "−4/6", font_size=36), self.t("≈ 0,51", 32, JAUNE_TITRE))
        calc.arrange(RIGHT, buff=0.18).move_to([3.6, 1.0, 0])
        self.au_mot("environ 0,51")
        self.play(Create(horiz), FadeIn(calc, shift=LEFT * 0.2))
        self.au_mot("0,49")
        comp = self.t("1 − 0,51 = 0,49", 34, ATTENTE).move_to([3.6, 0.1, 0])
        self.play(GrowFromCenter(comp))
        self.au_mot("presque une fois sur deux")
        phrase = VGroup(self.t("presque 1 fois sur 2,", 28), self.t("la suivante arrive", 28),
                        self.t("moins de 4 s après", 28, ATTENTE)).arrange(DOWN, buff=0.12).move_to([3.6, -1.15, 0])
        self.play(FadeIn(phrase, shift=UP * 0.15))
        zone = ax.get_area(courbe, x_range=[0, 4], color=ATTENTE, opacity=0.35)
        self.play(FadeIn(zone))
        self.au_mot("La porte est occupée")
        self.play(Write(self.chute("La porte est occupée : elle attend.", color=ATTENTE, font_size=30)))
        self.attendre_voix()

    # ── 06 / 07 ─────────────────────────────────────────────────────────────

    def ecran_courbe(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-courbe")
        titre = self.titre_ecran("L'attente selon le nombre de billes")
        ax = self.axes_notion([40, 100, 10], [0, 70, 10], x_length=7.0, y_length=4.6, font_size=20)
        ax.move_to([-2.5, -0.55, 0])
        lx = self.t("remplissage (%)", 22).next_to(ax.x_axis, DOWN, buff=0.45)
        ly = self.t("attente (s)", 22).next_to(ax.y_axis, UP, buff=0.12)
        self.play(Create(ax), FadeIn(lx), FadeIn(ly))
        reperes = [("Une toutes les 8", "1 bille / 8 s : 2 s", 50, 2.0),
                   ("Toutes les 5", "1 bille / 5 s : 8 s", 80, 7.9),
                   ("Toutes les 4,4", "1 bille / 4,4 s : 19 s", 91, 18.6),
                   ("Toutes les 4 secondes", "1 bille / 4 s : 62 s", 100, 62.0)]
        liste, points = VGroup(), VGroup()
        for k, (mot, txt, x, y) in enumerate(reperes):
            self.au_mot(mot)
            ligne = self.t(txt, 26, ATTENTE if k == 3 else WHITE).move_to([4.3, 1.7 - 0.6 * k, 0])
            pt = Dot(ax.c2p(x, y), radius=0.09, color=ATTENTE)
            entree = (FadeIn(ligne, shift=LEFT * 0.2), GrowFromCenter(ligne),
                      FadeIn(ligne, shift=UP * 0.2), FadeIn(ligne, scale=1.3))[k]
            self.play(entree, FadeIn(pt, scale=2.5), run_time=0.6)
            liste.add(ligne)
            points.add(pt)
        self.au_mot("La courbe reste plate")
        courbe = VMobject(color=BLEU_CALCUL, stroke_width=5)
        courbe.set_points_smoothly([ax.c2p(x, y) for x, y in COURBE])
        self.play(Create(courbe), run_time=1.6)
        self.au_mot("puis elle explose")
        self.play(liste[3].animate.scale(1.35), Flash(points[3], color=ATTENTE, line_length=0.3), run_time=0.5)
        self.play(liste[3].animate.scale(1 / 1.35), run_time=0.4)
        self.attendre_voix(marge=0.3)
        self._courbe = (titre, ax, liste, points, courbe)

    def ecran_formule(self):
        titre, ax, liste, points, courbe = self._courbe
        self.dire("07-formule")
        titre2 = self.t("La formule des files d'attente", 40, JAUNE_TITRE).to_edge(UP)
        self.play(FadeOut(titre, shift=UP * 0.3), FadeIn(titre2, shift=UP * 0.3), FadeOut(liste), run_time=0.6)
        self.au_mot("W égale")
        morceaux = VGroup(self.t("W = ρ × S ÷ (2 × ", 34), self.t("(1 − ρ)", 34, ATTENTE), self.t(")", 34))
        morceaux.arrange(RIGHT, buff=0.06)
        self.borne(morceaux, 5.6).move_to([4.0, 1.6, 0])
        cadre = SurroundingRectangle(morceaux, color=JAUNE_TITRE, buff=0.18)
        self.play(Write(morceaux), Create(cadre))
        self.au_mot("Rhô, c'est le remplissage")
        rho = self.t("ρ : le remplissage", 28).move_to([4.0, 0.7, 0])
        self.play(FadeIn(rho, shift=LEFT * 0.2))
        self.au_mot("S, les 4 secondes")
        s4 = self.t("S = 4 s pour entrer", 28).move_to([4.0, 0.1, 0])
        self.play(FadeIn(s4, shift=UP * 0.2))
        formule = ax.plot(lambda r: (r / 100) * S_ENTREE / (2 * (1 - r / 100)), x_range=[40, 96.5],
                          color=JAUNE_TITRE, stroke_width=4)
        self.play(Create(DashedVMobject(formule, num_dashes=40)), run_time=1.4)
        self.au_mot("Quand rhô s'approche de 1")
        self.play(Circumscribe(morceaux[1], color=ATTENTE, buff=0.08))
        self.au_mot("presque nul")
        nul = self.t("1 − ρ presque nul", 28, ATTENTE).move_to([4.0, -0.7, 0])
        self.play(FadeIn(nul, scale=1.3))
        self.au_mot("l'attente explose")
        self.play(morceaux.animate.scale(1.2), run_time=0.4)
        self.play(morceaux.animate.scale(1 / 1.2), run_time=0.4)
        self.attendre_voix()

    # ── 08 ──────────────────────────────────────────────────────────────────

    def ecran_solution(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-solution")
        self.titre_ecran("Enlever 1 bille sur 10")
        self.au_mot("chaque bille compte")
        rangee = VGroup(*[Dot(radius=0.2, color=ATTENTE) for _ in range(10)]).arrange(RIGHT, buff=0.22)
        rangee.move_to([-3.0, 1.7, 0])
        self.play(LaggedStart(*[GrowFromCenter(b) for b in rangee], lag_ratio=0.08))
        self.au_mot("Enlève 1 bille sur 10")
        croix = Cross(rangee[9], stroke_color=ROUGE_ERREUR, stroke_width=5)
        self.play(Create(croix))
        self.play(FadeOut(VGroup(rangee[9], croix), shift=UP * 0.6))
        dix = self.t("1 bille sur 10 en moins", 28).next_to(rangee, DOWN, buff=0.3)
        self.play(FadeIn(dix))

        base, u = -2.6, 0.05
        b62 = Rectangle(width=1.2, height=62 * u).set_fill(ATTENTE, 0.85).set_stroke(WHITE, 1)
        b62.move_to([2.4, base + 62 * u / 2, 0])
        b19 = Rectangle(width=1.2, height=19 * u).set_fill(VERT_OK, 0.85).set_stroke(WHITE, 1)
        b19.move_to([4.2, base + 19 * u / 2, 0])
        self.au_mot("de 62 secondes")
        self.play(GrowFromEdge(b62, DOWN))
        l62 = self.t("62 s", 30, ATTENTE).next_to(b62, UP, buff=0.12)
        self.play(FadeIn(l62))
        self.au_mot("à 19 secondes")
        self.play(GrowFromEdge(b19, DOWN))
        l19 = self.t("19 s", 30, VERT_OK).next_to(b19, UP, buff=0.12)
        self.play(FadeIn(l19))
        self.au_mot("3 fois moins")
        trois = self.t("3 fois moins", 44, JAUNE_TITRE).move_to([-3.0, -1.0, 0])
        self.play(GrowFromCenter(trois))
        self.play(trois.animate.scale(1.25), run_time=0.4)
        self.play(trois.animate.scale(1 / 1.25), run_time=0.4)
        self.attendre_voix()

    # ── 09 / 10 ─────────────────────────────────────────────────────────────

    def liste_cochee(self, mots_lignes, y0, voix_mots, taille=32, x=-0.6):
        lignes = VGroup(*[VGroup(self.coche(), self.borne(self.t(txt, taille), 10.5)).arrange(RIGHT, buff=0.3)
                          for txt in mots_lignes])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.45).move_to([x, y0, 0])
        anims = (lambda m: FadeIn(m, shift=RIGHT * 0.2), lambda m: FadeIn(m, scale=1.2),
                 lambda m: FadeIn(m, shift=UP * 0.2))
        for k, (mot, l) in enumerate(zip(voix_mots, lignes)):
            self.au_mot(mot)
            self.play(anims[k % 3](l), run_time=0.5)
        return lignes

    def ecran_conseils(self):
        self.clear()
        self.add_mascotte()
        self.dire("09-automobilistes")
        self.titre_ecran("Pour toi, en voiture")
        auto = voiture(BILLE, 1.4).move_to([4.6, 1.6, 0])
        self.play(FadeIn(auto, shift=LEFT * 0.4))
        # ⭐ « vitesse régulière » : l'idée de Frédéric (13/10) — la régularité
        # enlève le hasard, comme les billes régulières de l'écran 02.
        self.liste_cochee(["partir 10 minutes plus tôt", "covoiturer",
                           "conduire prudemment, à vitesse régulière", "s'insérer franchement, sans hésiter"],
                          0.0, ["partir 10 minutes", "covoiturer", "conduire prudemment", "s'insérer franchement"])
        self.attendre_voix()

        self.clear()
        self.add_mascotte()
        self.dire("10-region")
        self.titre_ecran("Pour la région")
        feu = feu_tricolore(1.3).move_to([4.6, -1.2, 0])
        lignes = self.liste_cochee(["décaler de 15 minutes les horaires des lycées et des bureaux",
                                    "poser des feux qui rendent les arrivées régulières"],
                                   1.0, ["décaler de 15 minutes", "poser des feux"], taille=28, x=-1.0)
        self.play(FadeIn(feu, shift=DOWN * 0.3))
        self.au_mot("Souviens-toi")
        reg = File(arrivees_regulieres(4.4, 200), y=-1.4, x0=-6.0, xg=2.0)
        self.play(FadeIn(reg.decor()))
        tps = ValueTracker(0.0)
        v = always_redraw(lambda: reg.billes(tps.get_value()))
        self.add(v)
        self.play(tps.animate.set_value(110), run_time=2.5, rate_func=linear)
        self.play(Write(self.chute("Sans hasard, pas de file.", color=VERT_OK, font_size=34)))
        self.attendre_voix()

    # ── 11 + correction (muette) ────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("11-defi")
        self.play(Write(self.t("Défi", 52, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("toutes les 5 secondes")
        donnee = self.t("en moyenne : 1 voiture toutes les 5 s", 32, BLEU_CALCUL).move_to([0, 2.0, 0])
        self.play(FadeIn(donnee, shift=DOWN * 0.2))
        q1 = VGroup(self.t("1.  Probabilité que la suivante arrive", 32),
                    self.t("     moins de 4 s après ?", 32)).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        q2 = VGroup(self.t("2.  Rond-point rempli à 80 % :", 32),
                    self.t("     attente moyenne d'après la formule ?", 32)).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        VGroup(q1, q2).arrange(DOWN, aligned_edge=LEFT, buff=0.45).move_to([-0.6, 0.0, 0])
        self.au_mot("Un :")
        self.play(FadeIn(q1, shift=RIGHT * 0.2))
        self.au_mot("Deux :")
        self.play(FadeIn(q2, shift=RIGHT * 0.2))
        rappel = self.t("W = ρ × S ÷ (2 × (1 − ρ))   avec S = 4 s", 26, GREY_B).move_to([-0.6, -2.3, 0])
        self.play(FadeIn(rappel))
        self.attendre_voix(marge=4.0)

        self.clear()
        self.add_mascotte()
        self.play(Write(self.t("Correction", 44, JAUNE_TITRE).to_edge(UP)))
        c1 = VGroup(self.t("1.", 34, BLEU_CALCUL), self.t("1 −", 36), self.puissance("e", "−4/5", font_size=38),
                    self.t("≈ 1 − 0,45 = 0,55", 36, BLEU_CALCUL)).arrange(RIGHT, buff=0.2)
        c2 = VGroup(self.t("2.", 34, VERT_OK), self.t("0,8 × 4 ÷ (2 × 0,2) = 8 s", 36, VERT_OK)).arrange(RIGHT, buff=0.2)
        VGroup(c1, c2).arrange(DOWN, aligned_edge=LEFT, buff=0.7).move_to([-0.4, 0.4, 0])
        self.play(FadeIn(c1, shift=UP * 0.15))
        self.play(FadeIn(c2, shift=UP * 0.15))
        self.play(Circumscribe(c2[1], color=VERT_OK, buff=0.12))
        self.wait(4.5)

    # ── 12 ──────────────────────────────────────────────────────────────────

    def ecran_appris(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("12-appris")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        self.liste_cochee(["la loi exponentielle décrit des arrivées au hasard",
                           "c'est ce hasard qui crée les bouchons",
                           "près du maximum : un peu moins de voitures = beaucoup moins d'attente"],
                          1.3, ["la loi exponentielle", "C'est ce hasard", "Et près du maximum"], taille=28)
        self.au_mot("Et toi")
        q = VGroup(self.t("Quel rond-point bouchonne près de chez toi ?", 32, BLEU_CALCUL),
                   self.t("Dis-le-moi en commentaire !", 30, VERT_OK)).arrange(DOWN, buff=0.22).move_to([-0.4, -1.6, 0])
        for m in q:
            self.borne(m, 11.0)
        cadre = SurroundingRectangle(q, color=VERT_OK, buff=0.25, stroke_width=2)
        self.play(FadeIn(q), Create(cadre))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.ecran_accroche()
        self.ecran_billes()
        self.ecran_regulier_hasard()
        self.ecran_loi()
        self.ecran_calcul()
        self.ecran_courbe()
        self.ecran_formule()
        self.ecran_solution()
        self.ecran_conseils()
        self.ecran_defi()
        self.ecran_appris()
        self.page_abonnement()
