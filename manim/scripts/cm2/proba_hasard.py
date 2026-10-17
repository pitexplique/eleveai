# proba_hasard.py
# EleveAI — Maths CM2 — série « Probabilités », épisode 2 : hasard ou pas
# hasard ? (micro : probabilite_hasard), AVEC VOIX. Paysage 16:9, CEINTURE
# BLANCHE. Short jumeau : proba_hasard_short.py (pile, pile, pile, pile…).
#
# Écrans : 00 garde · 01 le chapeau des équipes de foot · 02 la définition
# (le dé du coach : les 6 faces connues, laquelle ?) · 03 le tri (chapeau,
# météo, 12 × 3) · 04 la méthode des deux questions (la roue du coach) ·
# 05 le piège pile × 4 (la pièce n'a pas de mémoire) · 06 défi anniversaire /
# tombola · 06b correction · 07 ce que tu as appris · 08 abonnement.
#
# ⭐ Canvas repris du coach (lib/tutor-v4/components/ProbabilitesCanvas.tsx,
# banque cm2/maths/probabilites.bank.ts, micro probabilite_hasard) :
#   · « de » : carte blanche, 6 faces en 3 × 2, points noirs aux mêmes places,
#     face surlignée sur fond ambré ;
#   · « roue » : 4 secteurs égaux Rouge / Bleu / Vert / Jaune, départ en haut,
#     sens des aiguilles d'une montre, liseré foncé, étiquettes blanches
#     cerclées de foncé, pointe noire en haut, moyeu noir ;
#   · « billes » : billes en grille, lettre R / B / V au centre.
#
# Voix : manim/voix/cm2-proba-hasard.json (Julie, débit −10).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/cm2/proba_hasard.py ProbaHasardCM2 -o eleveai-maths-cm2-proba-hasard --media_dir manim/scripts/cm2/media
# Puis copier le mp4 dans manim/sorties/cm2/maths/probabilites/02-hasard/.

import math
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "annonce"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from annonce_probabilites import piece_qui_tourne  # noqa: E402

# Les couleurs du coach (COULEURS de la banque CM2)
C_ROUGE = "#ef4444"
C_BLEU = "#3b82f6"
C_VERT = "#22c55e"
C_JAUNE = "#eab308"
ENCRE = "#0f172a"        # liserés et points du coach
FACE_DE = "#f8fafc"
FACE_ACTIVE = "#fef3c7"  # face surlignée (ambre)
BORD_ACTIF = "#fbbf24"
GRIS_ETEINT = "#6B7280"


class NotionCM2(Notion6e):
    identite = "Maths CM2 — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les canvas du coach ─────────────────────────────────────────────────────

POINTS_COACH = {
    1: [(50, 50)],
    2: [(30, 30), (70, 70)],
    3: [(30, 30), (50, 50), (70, 70)],
    4: [(30, 30), (70, 30), (30, 70), (70, 70)],
    5: [(30, 30), (70, 30), (50, 50), (30, 70), (70, 70)],
    6: [(30, 28), (70, 28), (30, 50), (70, 50), (30, 72), (70, 72)],
}


def de_coach(face, cote=1.0, actif=False):
    """Une face de dé comme sur le coach : carré arrondi, liseré foncé, points
    aux positions du composant (viewBox 100, carré de 84)."""
    k = cote / 84
    corps = RoundedRectangle(width=cote, height=cote, corner_radius=16 * k,
                             fill_color=FACE_ACTIVE if actif else FACE_DE, fill_opacity=1,
                             stroke_color=ENCRE, stroke_width=3)
    pts = VGroup(*[Dot(P((x - 50) * k, -(y - 50) * k), radius=6 * k, color=ENCRE)
                   for x, y in POINTS_COACH[face]])
    return VGroup(corps, pts)


def carte_de(cote=0.9, gap=0.22):
    """Le canvas « de » : carte blanche, les 6 faces en grille 3 × 2.
    Renvoie (carte, faces)."""
    faces = VGroup(*[de_coach(f, cote) for f in range(1, 7)])
    faces.arrange_in_grid(rows=2, cols=3, buff=gap)
    fond = RoundedRectangle(width=faces.width + 0.5, height=faces.height + 0.5, corner_radius=0.2,
                            fill_color=WHITE, fill_opacity=1, stroke_color="#e2e8f0", stroke_width=2)
    fond.move_to(faces)
    return VGroup(fond, faces), faces


def surligner_face(face_mob, on=True):
    """La face « surlignée » du coach : fond ambré, bordure ambre."""
    face_mob[0].set_fill(FACE_ACTIVE if on else FACE_DE)
    face_mob[0].set_stroke(BORD_ACTIF if on else ENCRE, 6 if on else 3)


ROUE = [("Rouge", C_ROUGE), ("Bleu", C_BLEU), ("Vert", C_VERT), ("Jaune", C_JAUNE)]


def etiquette_blanche(texte, font_size):
    t = Text(texte, font_size=font_size, color=WHITE, weight=BOLD)
    t.set_stroke(ENCRE, width=4, background=True)
    return t


def disque_roue(r=1.4, font_size=26):
    """Le disque de la roue du coach (sans la pointe) : départ en haut, sens horaire."""
    secteurs, labels = VGroup(), VGroup()
    for i, (nom, coul) in enumerate(ROUE):
        debut = PI / 2 - i * PI / 2  # en haut, puis on tourne dans le sens horaire
        s = AnnularSector(inner_radius=0, outer_radius=r, angle=-PI / 2, start_angle=debut,
                          fill_color=coul, fill_opacity=1, stroke_color=ENCRE, stroke_width=3)
        milieu = debut - PI / 4
        lbl = etiquette_blanche(nom, font_size).move_to(P(0.6 * r * math.cos(milieu), 0.6 * r * math.sin(milieu)))
        secteurs.add(s)
        if font_size:  # étiquettes du coach : redondantes avec les couleurs (tolérées, 17/10)
            labels.add(lbl)
    return VGroup(secteurs, labels)


def roue_coach(centre, r=1.4, font_size=26, carte=True):
    """Le canvas « roue » : disque, moyeu noir, pointe noire en haut, sur carte blanche.
    Renvoie (tout, disque)."""
    disque = disque_roue(r, font_size).move_to(centre)
    moyeu = Dot(centre, radius=r * 0.05, color=ENCRE)
    pointe = Polygon(P(0, -0.0), P(-0.16, 0.34), P(0.16, 0.34), fill_color=ENCRE, fill_opacity=1,
                     stroke_width=0).scale(r / 1.4).move_to(centre + UP * (r + 0.06), aligned_edge=DOWN)
    pointe.shift(DOWN * 0.22 * r / 1.4)
    g = VGroup()
    if carte:
        g.add(RoundedRectangle(width=2 * r + 0.8, height=2 * r + 1.0, corner_radius=0.2, fill_color=WHITE,
                               fill_opacity=1, stroke_color="#e2e8f0", stroke_width=2).move_to(centre + UP * 0.1))
    g.add(disque, moyeu, pointe)
    return g, disque


def billes_coach(cote=0.56, r=0.22):
    """Le canvas « billes » de la banque : R R R / B B V, lettre au centre."""
    elems = [(C_ROUGE, "R")] * 3 + [(C_BLEU, "B")] * 2 + [(C_VERT, "V")]
    g = VGroup()
    for k, (coul, lettre) in enumerate(elems):
        c = Circle(radius=r, fill_color=coul, fill_opacity=1, stroke_color=ENCRE, stroke_width=2.5)
        t = etiquette_blanche(lettre, int(r * 80)).move_to(c)
        g.add(VGroup(c, t).move_to(P((k % 3) * cote, -(k // 3) * cote)))
    return g


def piece(face="PILE", r=0.55):
    """Une pièce posée : PILE (jaune) ou FACE (orange), comme la pièce qui tourne."""
    pile = face == "PILE"
    disque = Circle(radius=r, fill_color=JAUNE_TITRE if pile else ORANGE_RETENUE, fill_opacity=1,
                    stroke_color=WHITE, stroke_width=3)
    bord = Circle(radius=r * 0.82, stroke_color=BLACK, stroke_width=1.5, stroke_opacity=0.35)
    mot = Text(face, font_size=int(r * 34), color=BLACK, weight=BOLD).move_to(disque)
    return VGroup(disque, bord, mot)


# ── les autres dessins ──────────────────────────────────────────────────────

def chapeau(s=1.0):
    """Un chapeau haut-de-forme, ouverture vers le HAUT (on y tire les papiers)."""
    bord = Ellipse(width=2.6, height=0.5, fill_color="#1F2937", fill_opacity=1, stroke_color=WHITE,
                   stroke_width=3).move_to(P(0, -0.95))
    corps = Polygon(P(-0.9, -0.95), P(0.9, -0.95), P(0.8, 0.7), P(-0.8, 0.7), fill_color="#111827",
                    fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    ruban = Polygon(P(-0.88, -0.75), P(0.88, -0.75), P(0.86, -0.5), P(-0.86, -0.5), fill_color=C_ROUGE,
                    fill_opacity=1, stroke_width=0)
    ouverture = Ellipse(width=1.6, height=0.36, fill_color="#030712", fill_opacity=1, stroke_color=WHITE,
                        stroke_width=3).move_to(P(0, 0.7))
    return VGroup(bord, corps, ruban, ouverture).scale(s)


def papier(s=1.0, couleur=WHITE):
    """Un petit papier plié (on ne lit pas le nom)."""
    f = Polygon(P(-0.32, -0.2), P(0.32, -0.2), P(0.32, 0.2), P(-0.32, 0.2), fill_color=couleur,
                fill_opacity=1, stroke_color=GREY_B, stroke_width=1.5)
    pli = Line(P(0, -0.2), P(0, 0.2), color=GREY_B, stroke_width=1.5)
    traits = VGroup(Line(P(-0.24, 0.05), P(-0.06, 0.05)), Line(P(0.06, 0.05), P(0.24, 0.05)),
                    Line(P(-0.24, -0.06), P(-0.1, -0.06))).set_stroke(GREY_C, 2)
    return VGroup(f, pli, traits).scale(s)


def ballon(r=0.45):
    rond = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color=BLACK, stroke_width=2)
    penta = RegularPolygon(5, fill_color=BLACK, fill_opacity=1, stroke_width=0).scale(r * 0.32).move_to(rond)
    autour = VGroup(*[RegularPolygon(5, fill_color=BLACK, fill_opacity=1, stroke_width=0).scale(r * 0.2)
                      .move_to(rond.get_center() + r * 0.78 * np.array([math.cos(a), math.sin(a), 0]))
                      for a in [PI / 2 + k * 2 * PI / 5 for k in range(5)]])
    rayons = VGroup(*[Line(penta.get_center(), m.get_center(), color=BLACK, stroke_width=1.5) for m in autour])
    return VGroup(rond, rayons, penta, autour)


def maillot(couleur, s=1.0):
    pts = [P(-0.35, 0.45), P(-0.12, 0.45), P(0, 0.35), P(0.12, 0.45), P(0.35, 0.45), P(0.6, 0.2),
           P(0.45, 0.05), P(0.32, 0.15), P(0.32, -0.45), P(-0.32, -0.45), P(-0.32, 0.15), P(-0.45, 0.05),
           P(-0.6, 0.2)]
    return Polygon(*pts, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2).scale(s)


def nuage(s=1.0, couleur="#CBD5E1"):
    bulles = VGroup(Circle(0.35).move_to(P(-0.4, 0)), Circle(0.5).move_to(P(0.05, 0.2)),
                    Circle(0.38).move_to(P(0.5, 0.0)), Rectangle(width=1.0, height=0.4).move_to(P(0.05, -0.15)))
    bulles.set_fill(couleur, 1).set_stroke(width=0)
    return bulles.scale(s)


def soleil(s=1.0):
    disque = Circle(0.38, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0)
    rayons = VGroup(*[Line(0.5 * np.array([math.cos(a), math.sin(a), 0]), 0.7 * np.array([math.cos(a), math.sin(a), 0]),
                           color=JAUNE_TITRE, stroke_width=5) for a in np.linspace(0, 2 * PI, 9)[:-1]])
    return VGroup(rayons, disque).scale(s)


def gouttes(s=1.0):
    return VGroup(*[Line(P(x, 0.12), P(x - 0.08, -0.12), color=C_BLEU, stroke_width=5)
                    for x in (-0.3, 0.0, 0.3)]).scale(s)


def gateau(s=1.0):
    """Un gâteau d'anniversaire à trois bougies."""
    base = RoundedRectangle(width=1.8, height=0.75, corner_radius=0.1, fill_color="#F472B6", fill_opacity=1,
                            stroke_color=WHITE, stroke_width=2).move_to(P(0, -0.4))
    creme = RoundedRectangle(width=1.85, height=0.22, corner_radius=0.1, fill_color=WHITE, fill_opacity=1,
                             stroke_width=0).move_to(P(0, -0.05))
    plat = Line(P(-1.1, -0.8), P(1.1, -0.8), color=GREY_B, stroke_width=5)
    bougies = VGroup()
    for x in (-0.5, 0, 0.5):
        b = Rectangle(width=0.12, height=0.45, fill_color=C_BLEU, fill_opacity=1, stroke_width=0).move_to(P(x, 0.28))
        fl = Ellipse(width=0.13, height=0.22, fill_color=ORANGE_RETENUE, fill_opacity=1, stroke_width=0).move_to(P(x, 0.62))
        bougies.add(b, fl)
    return VGroup(plat, base, creme, bougies).scale(s)


def calendrier(s=1.0):
    page = RoundedRectangle(width=1.3, height=1.4, corner_radius=0.1, fill_color=WHITE, fill_opacity=1,
                            stroke_color=GREY_B, stroke_width=2)
    haut = Rectangle(width=1.3, height=0.35, fill_color=C_ROUGE, fill_opacity=1, stroke_width=0)
    haut.move_to(page.get_top(), aligned_edge=UP)
    num = Star(5, outer_radius=0.36, fill_color=C_ROUGE, fill_opacity=1, stroke_width=0).move_to(
        page.get_center() + DOWN * 0.15)
    anneaux = VGroup(*[Line(P(x, 0.62), P(x, 0.82), color=GREY_D, stroke_width=5) for x in (-0.35, 0.35)])
    return VGroup(page, haut, num, anneaux).scale(s)


def ticket(numero, s=1.0, couleur=JAUNE_TITRE):
    f = Rectangle(width=1.1, height=0.55, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    encoches = VGroup(*[Circle(0.08, fill_color="#0F172A", fill_opacity=1, stroke_width=0).move_to(f.get_edge_center(d))
                        for d in (LEFT, RIGHT)])
    n = Text(str(numero), font_size=28, color=BLACK, weight=BOLD).move_to(f)
    return VGroup(f, encoches, n).scale(s)


def urne_tombola(s=1.0):
    """La boîte de la tombola, avec sa fente et des tickets dedans."""
    boite = Rectangle(width=2.0, height=1.5, fill_color="#7C3AED", fill_opacity=0.85, stroke_color=WHITE,
                      stroke_width=3)
    fente = Rectangle(width=0.9, height=0.1, fill_color="#0F172A", fill_opacity=1, stroke_width=0)
    fente.move_to(boite.get_top() + DOWN * 0.18)
    mot = Text("TOMBOLA", font_size=22, color=WHITE, weight=BOLD).move_to(boite.get_center() + DOWN * 0.15)
    return VGroup(boite, fente, mot).scale(s)


def de_coach_qui_roule(centre, cote=1.2, periode=0.16, faces=None):
    """La face du coach qui roule SANS FIN (updater)."""
    faces = faces or [3, 5, 2, 6, 1, 4]
    etat = {"t": 0.0}
    holder = VGroup(de_coach(faces[0], cote).move_to(centre))

    def maj(m, dt):
        etat["t"] += dt
        k = int(etat["t"] / periode)
        ang = 0.35 * math.sin(etat["t"] * 9)
        saut = 0.12 * abs(math.sin(etat["t"] * 9))
        m.remove(*m.submobjects)
        m.add(de_coach(faces[k % len(faces)], cote).rotate(ang).move_to(centre + UP * saut))

    holder.add_updater(maj)
    return holder


def faire_tourner(disque, centre, vitesse=5.0):
    """La roue tourne (sens horaire) tant que l'updater est en place."""
    disque.add_updater(lambda m, dt: m.rotate(-vitesse * dt, about_point=centre))


# ── la vidéo ────────────────────────────────────────────────────────────────

class ProbaHasardCM2(NotionCM2):
    nom_voix = "cm2-proba-hasard"

    def t(self, texte, font_size=40, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def etiquette(self, texte, color, font_size=34):
        lbl = self.t(texte, font_size, BLACK)
        fond = RoundedRectangle(width=lbl.width + 0.45, height=lbl.height + 0.32, corner_radius=0.12,
                                fill_color=color, fill_opacity=1, stroke_width=0)
        return VGroup(fond, lbl.move_to(fond))

    def croix(self, mob, color=ROUGE_ERREUR, sw=8):
        return VGroup(Line(mob.get_corner(UL), mob.get_corner(DR)),
                      Line(mob.get_corner(UR), mob.get_corner(DL))).set_stroke(color, sw)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Hasard ou pas hasard ?", 60, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("blanche").move_to(P(-0.6, -2.75))
        centre = P(-0.6, -0.05)
        roue, disque = roue_coach(centre, 1.1, 18)
        self.add(ech)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(roue, scale=0.8), run_time=1.0)
        faire_tourner(disque, centre, 7.0)
        self.attendre_voix(marge=1.0)
        disque.clear_updaters()

    # ── 01 : le chapeau des équipes ─────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.au_mot("deux équipes")
        self.play(Write(self.t("Deux équipes de foot", 40, JAUNE_TITRE).to_edge(UP)), run_time=0.6)
        rouge = maillot(C_ROUGE, 1.5).move_to(P(-5.0, 1.15))
        bleu = maillot(C_BLEU, 1.5).move_to(P(-5.0, -1.55))
        bal = ballon(0.4).move_to(P(-5.0, -0.2))
        self.play(FadeIn(rouge, shift=RIGHT * 0.3), FadeIn(bleu, shift=RIGHT * 0.3), FadeIn(bal, scale=0.5),
                  run_time=0.6)
        self.play(Rotate(bal, -2 * PI), run_time=0.6)
        self.au_mot("on tire les noms")
        ch = chapeau(1.15).move_to(P(0.6, -0.55))
        self.play(FadeIn(ch, shift=UP * 0.3), run_time=0.5)
        bouche = ch[3].get_center()
        papiers = VGroup(*[papier(1.2).move_to(P(0.6 + dx, 2.3)) for dx in (-1.2, -0.4, 0.4, 1.2)])
        self.au_mot("dans un chapeau")
        self.play(LaggedStart(*[FadeIn(p, shift=DOWN * 0.2) for p in papiers], lag_ratio=0.15), run_time=0.5)
        self.play(LaggedStart(*[FadeOut(p, target_position=bouche, scale=0.4) for p in papiers],
                              lag_ratio=0.15), run_time=0.8)
        self.au_mot("Personne ne peut tricher")
        self.play(Wiggle(ch, scale_value=1.08, rotation_angle=0.08 * TAU), run_time=0.7)
        # on tire : un papier pour les rouges, un pour les bleus…
        for c in [P(-3.6, 1.15), P(-3.6, -1.55)]:
            p = papier(0.9).move_to(bouche + UP * 1.0)
            self.play(FadeIn(p, shift=UP * 0.6, scale=0.5), run_time=0.25)
            self.play(p.animate.move_to(c), run_time=0.3)
        self.au_mot("c'est le hasard")
        ch_txt = self.chute("C'est le hasard qui décide.", color=VERT_OK, font_size=44)
        self.play(Write(ch_txt), run_time=0.7)
        self.insister(ch_txt[7:13])
        self.attendre_voix()

    # ── 02 : la définition ──────────────────────────────────────────────────

    def ecran_hasard(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-hasard")
        self.titre_ecran("Une situation de hasard")
        carte, faces = carte_de(0.95, 0.24)
        carte.move_to(P(-3.3, 0.35))
        fond = carte[0]
        self.play(FadeIn(fond), run_time=0.3)
        self.au_mot("on connaît tous")
        self.play(LaggedStart(*[FadeIn(f, scale=0.5) for f in faces], lag_ratio=0.18), run_time=1.3)
        l1 = VGroup(self.coche(taille=0.25), self.t("résultats possibles", 36, VERT_OK)).arrange(RIGHT, buff=0.25)
        l1.next_to(carte, DOWN, buff=0.4)
        self.play(FadeIn(l1[1], shift=UP * 0.15), Create(l1[0]), run_time=0.5)
        self.au_mot("mais on ne sait pas")
        roule = de_coach_qui_roule(P(2.3, 0.55), 1.5)
        self.add(roule)
        q = self.t("?", 130, ORANGE_RETENUE).move_to(P(4.3, 0.55))
        self.play(FadeIn(q, scale=0.5), run_time=0.4)
        self.au_mot("lequel va sortir")
        l2 = self.t("lequel va sortir ?", 36, ORANGE_RETENUE).move_to(P(2.9, -1.25))
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.4)
        self.insister(q, 0.3)
        self.attendre_voix(marge=1.0)
        roule.clear_updaters()

    # ── 03 : le tri ─────────────────────────────────────────────────────────

    def cadre(self, x, y=0.55, w=3.4, h=2.9):
        return RoundedRectangle(width=w, height=h, corner_radius=0.2, stroke_color=BLEU_CALCUL, stroke_width=3,
                                fill_color="#0F172A", fill_opacity=0.6).move_to(P(x, y))

    def ecran_tri(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-tri")
        xs = [-4.6, -0.8, 3.0]
        cadres = [self.cadre(x) for x in xs]
        yl = -1.45
        # 1. le chapeau
        self.au_mot("Tirer un nom")
        ch = chapeau(0.62).move_to(P(xs[0], 0.15))
        self.play(FadeIn(cadres[0]), FadeIn(ch, shift=UP * 0.2), run_time=0.5)
        pp = papier(0.9).move_to(P(xs[0], 1.5))
        self.play(FadeIn(pp, shift=UP * 0.6, scale=0.5), run_time=0.5)
        self.au_mot("hasard. La")
        h1 = self.etiquette("hasard", VERT_OK).move_to(P(xs[0], yl))
        self.play(GrowFromCenter(h1), run_time=0.4)
        # 2. la météo
        self.au_mot("La météo")
        so = soleil(0.8).move_to(P(xs[1] - 0.55, 1.0))
        nu = nuage(0.95).move_to(P(xs[1] + 0.3, 0.55))
        go = gouttes(1.0).move_to(P(xs[1] + 0.3, -0.25))
        self.play(FadeIn(cadres[1]), FadeIn(so, scale=0.6), FadeIn(nu, shift=LEFT * 0.3), run_time=0.6)
        self.au_mot("on ne sait pas vraiment")
        self.play(FadeIn(go, shift=DOWN * 0.2), run_time=0.3)
        self.play(FadeOut(go, shift=DOWN * 0.2), Rotate(so, PI / 4), run_time=0.5)
        self.play(FadeIn(go, shift=DOWN * 0.2), run_time=0.3)
        self.au_mot("il y a du hasard")
        h2 = self.etiquette("du hasard", VERT_OK).move_to(P(xs[1], yl))
        self.play(GrowFromCenter(h2), run_time=0.4)
        # 3. le calcul
        self.au_mot("12 fois 3")
        calc = self.t("12 × 3", 60).move_to(P(xs[2], 1.25))
        self.play(FadeIn(cadres[2]), Write(calc), run_time=0.6)
        self.au_mot("pas de hasard")
        h3 = self.etiquette("pas de hasard", ROUGE_ERREUR).move_to(P(xs[2], yl))
        self.play(GrowFromCenter(h3), run_time=0.4)
        self.au_mot("toujours 36")
        res = self.t("= 36", 60, JAUNE_TITRE).move_to(P(xs[2], -0.1))
        self.play(FadeIn(res, shift=UP * 0.2), run_time=0.4)
        self.insister(res, 0.3)
        self.attendre_voix()

    # ── 04 : la méthode des deux questions ──────────────────────────────────

    def ecran_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-methode")
        self.titre_ecran("Deux questions")
        centre = P(-5.15, 0.2)
        roue, disque = roue_coach(centre, 1.3, 18)
        self.play(FadeIn(roue, scale=0.8), run_time=0.6)
        x_q = -3.2
        self.au_mot("Est-ce que je connais")
        q1 = self.t("Je connais les résultats possibles ?", 31)
        q1.move_to(P(0, 1.45)).align_to(P(x_q, 0), LEFT)
        self.play(FadeIn(q1, shift=UP * 0.15), run_time=0.5)
        self.play(LaggedStart(*[Indicate(l, color=WHITE, scale_factor=1.12) for l in disque[0]], lag_ratio=0.3),
                  run_time=1.6)
        self.bring_to_front(disque[1], roue[-2], roue[-1])  # les étiquettes, le moyeu et la pointe repassent devant
        self.au_mot("Est-ce que je peux savoir")
        q2 = self.t("Je peux savoir lequel sortira ?", 31)
        q2.move_to(P(0, 0.05)).align_to(P(x_q, 0), LEFT)
        self.play(FadeIn(q2, shift=UP * 0.15), run_time=0.5)
        faire_tourner(disque, centre, 8.0)
        self.au_mot("Oui, puis")
        oui = self.t("oui", 46, VERT_OK).move_to(P(5.5, 1.45))
        self.play(FadeIn(oui, scale=0.5), run_time=0.35)
        self.au_mot("puis non")
        non = self.t("non", 46, ROUGE_ERREUR).move_to(P(5.5, 0.05))
        self.play(FadeIn(non, scale=0.5), run_time=0.35)
        self.au_mot("c'est le hasard")
        h = self.etiquette("c'est le hasard", VERT_OK, 40).move_to(P(0.6, -1.6))
        self.play(GrowFromCenter(h), run_time=0.5)
        self.insister(h, 0.3)
        disque.clear_updaters()
        self.attendre_voix()

    # ── 05 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        xs = [-5.4, -4.0, -2.6, -1.2]
        y = 1.3
        pieces = VGroup()
        for ex, x in zip(["Le piège : pile", "pile, pile, pile. Ce", "pile, pile. Ce", "pile. Ce"], xs):
            self.au_mot(ex)
            pc = piece("PILE", 0.6).move_to(P(x, y))
            pieces.add(pc)
            self.play(FadeIn(pc, shift=DOWN * 0.5, scale=0.6), run_time=0.3)
        self.au_mot("Ce n'est pas plus facile")
        tourne = piece_qui_tourne(P(1.6, y), 0.75)
        self.add(tourne)
        face_q = self.t("face ?", 40, ORANGE_RETENUE).move_to(P(3.6, y))
        self.play(FadeIn(face_q, scale=0.6), run_time=0.35)
        pf = self.t("pas plus facile", 38, ROUGE_ERREUR).move_to(P(2.6, y - 1.25))
        self.play(FadeIn(pf, shift=UP * 0.15), run_time=0.4)
        self.au_mot("ne se souvient de rien")
        oubli = SurroundingRectangle(pieces, color=GRIS_ETEINT, buff=0.15, corner_radius=0.15)
        self.play(Create(oubli), run_time=0.4)
        self.play(pieces.animate.set_opacity(0.15), oubli.animate.set_stroke(opacity=0.3), run_time=1.0)
        self.au_mot("toujours 1 chance sur 2")
        tourne.clear_updaters()
        moitie_g = Rectangle(width=2.4, height=0.9, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_color=WHITE,
                             stroke_width=3)
        moitie_d = moitie_g.copy().set_fill(ORANGE_RETENUE)
        barre = VGroup(moitie_g, moitie_d).arrange(RIGHT, buff=0).move_to(P(-0.6, -1.15))
        mots = VGroup(piece("PILE", 0.42).move_to(moitie_g), piece("FACE", 0.42).move_to(moitie_d))
        mots[0][0].set_stroke(BLACK, 3)
        mots[1][0].set_stroke(BLACK, 3)
        self.play(FadeIn(barre), FadeIn(mots), run_time=0.4)
        une = self.chute("1 chance sur 2", color=JAUNE_TITRE, font_size=52)
        self.play(Write(une), run_time=0.6)
        self.insister(une[0], 0.3)
        self.attendre_voix()

    # ── 06 : défi ───────────────────────────────────────────────────────────

    XA, XB, YC = -3.75, 2.15, 0.8

    def deux_situations(self):
        ca = self.cadre(self.XA, self.YC, 5.4, 3.1)
        cb = self.cadre(self.XB, self.YC, 5.4, 3.1)
        ga = gateau(1.2).move_to(P(self.XA - 1.1, self.YC - 0.1))
        cal = calendrier(1.25).move_to(P(self.XA + 1.45, self.YC))
        urne = urne_tombola(1.25).move_to(P(self.XB - 0.85, self.YC - 0.3))
        tks = VGroup(*[ticket("?", 0.95, c).rotate(a).move_to(P(self.XB + 1.55, self.YC + dy))
                       for c, a, dy in [(JAUNE_TITRE, 0.2, 0.85), (C_VERT, -0.15, 0.0), (C_BLEU, 0.1, -0.85)]])
        la = self.t("le jour de son anniversaire", 28).next_to(ca, DOWN, buff=0.2)
        lb = self.t("un numéro à la tombola", 28).next_to(cb, DOWN, buff=0.2)
        return ca, cb, VGroup(ga, cal), VGroup(urne, tks), la, lb

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 50, JAUNE_TITRE).to_edge(UP)))
        ca, cb, A, B, la, lb = self.deux_situations()
        self.au_mot("Choisir le jour")
        self.play(FadeIn(ca), FadeIn(A, shift=UP * 0.2), FadeIn(la), run_time=0.7)
        self.au_mot("Tirer un numéro")
        self.play(FadeIn(cb), FadeIn(B, shift=UP * 0.2), FadeIn(lb), run_time=0.7)
        self.play(Wiggle(B[0]), run_time=0.6)
        self.au_mot("Lequel est")
        q = self.t("Lequel est une situation de hasard ?", 38, BLEU_CALCUL).move_to(P(-0.6, -1.85))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.5)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=42)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        ca, cb, A, B, la, lb = self.deux_situations()
        self.add(ca, cb, A, B)
        self.au_mot("Le numéro de la tombola")
        lb = self.t("le numéro de la tombola", 28).next_to(cb, DOWN, buff=0.2)
        self.play(FadeIn(lb, shift=UP * 0.1), run_time=0.3)
        urne, tks = B
        sortant = ticket("?", 0.9, ORANGE_RETENUE).move_to(urne[1])
        self.play(sortant.animate.move_to(urne.get_top() + UP * 0.5), run_time=0.6)
        self.au_mot("c'est le hasard")
        self.play(cb.animate.set_stroke(VERT_OK, 6), run_time=0.3)
        h = self.etiquette("c'est le hasard", VERT_OK, 34).move_to(P(self.XB, -2.0))
        self.play(GrowFromCenter(h), run_time=0.4)
        self.play(Indicate(h, color=WHITE, scale_factor=1.15), run_time=0.6)
        self.au_mot("Le jour de son anniversaire")
        cal = A[1]
        self.play(FadeIn(la, shift=UP * 0.1), run_time=0.3)
        self.play(Indicate(cal, color=JAUNE_TITRE, scale_factor=1.25), run_time=0.7)
        self.au_mot("on le connaît déjà")
        self.play(ca.animate.set_stroke(ROUGE_ERREUR, 6), run_time=0.3)
        k = self.etiquette("on le connaît déjà", ROUGE_ERREUR, 34).move_to(P(self.XA, -2.0))
        self.play(GrowFromCenter(k), run_time=0.4)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 48, JAUNE_TITRE).to_edge(UP)))
        l1 = VGroup(self.coche(), self.t("Le hasard : on connaît les résultats possibles,", 34)).arrange(RIGHT, buff=0.3)
        l1b = self.t("pas celui qui va sortir.", 34, ORANGE_RETENUE)
        l2 = VGroup(self.coche(), self.t("Une pièce ou un dé n'ont pas de mémoire.", 34)).arrange(RIGHT, buff=0.3)
        l1.move_to(P(-0.3, 1.7)).align_to(P(-5.6, 0), LEFT)
        l1b.next_to(l1[1], DOWN, buff=0.25).align_to(l1[1], LEFT)
        l2.move_to(P(-0.3, -0.2)).align_to(P(-5.6, 0), LEFT)
        icones = VGroup(piece("PILE", 0.42), de_coach(5, 0.8)).arrange(RIGHT, buff=0.3).next_to(l2, DOWN, buff=0.35)
        icones.align_to(l2[1], LEFT)
        self.au_mot("Le hasard")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("pas celui")
        self.play(FadeIn(l1b, shift=RIGHT * 0.2), Create(l1[0]), run_time=0.6)
        self.au_mot("Une pièce")
        self.play(FadeIn(l2[1], shift=RIGHT * 0.2), FadeIn(icones, shift=UP * 0.2), run_time=0.6)
        self.play(Create(l2[0]), run_time=0.4)
        self.au_mot("L'épisode 3")
        self.play(Write(self.chute("L'épisode 3 t'attend : comparer les chances.", color=VERT_OK, font_size=38)))
        self.attendre_voix(marge=1.0)

    # ── 08 : abonnement (la page du gabarit, réécrite : rien qui ne soit dit) ──

    def page_abonnement(self, voix="08-abonne"):
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        self.au_mot("va sur le coach")
        entraine = self.t("Va sur le coach", 46, JAUNE_TITRE).move_to(P(0, 2.05))
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("sur éleveai")
        site = self.t("eleveai.fr", 58, BLEU_CALCUL).move_to(P(0, 1.05))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("abonne-toi")
        abonne = self.t("Abonne-toi à la chaîne !", 44, VERT_OK).move_to(P(0, -0.7))
        self.play(FadeIn(abonne, shift=UP * 0.15), run_time=0.5)
        self.play(Flash(abonne, color=VERT_OK, line_length=0.3), run_time=0.6)
        self.attendre_voix(marge=1.4)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_hasard()
        self.ecran_tri()
        self.ecran_methode()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")
