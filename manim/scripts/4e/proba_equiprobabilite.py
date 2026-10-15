# proba_equiprobabilite.py
# EleveAI — Maths 4e — Probabilités, épisode 4 : l'équiprobabilité, AVEC VOIX.
# Paysage 16:9, CEINTURE ORANGE. Short jumeau : proba_equiprobabilite_short.py.
#
# ⭐ LES DESSINS : la vaisselle, les deux enfants (une lettre « L » / « I » sur
# le tee-shirt, JAMAIS de prénom à l'écran), le chapeau et ses papiers bleus
# « L » (trois) et orange « I » (un) qui s'empilent en deux colonnes ; le dé et
# la pièce (équiprobables) ; la PUNAISE qui tombe (pointe en haut / sur le côté) ;
# le ticket de loto ; la roue à la grande couleur ; les deux sacs de billes du défi.
# Dé, pièce, sac, billes : ceux de la bande-annonce (annonce_probabilites.py).
#
# Voix : manim/voix/4e-proba-equiprobabilite.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/proba_equiprobabilite.py ProbaEquiprobabilite4e -o eleveai-maths-4e-proba-equiprobabilite --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/probabilites/04-equiprobabilite/.

import math
import random
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_evenement import Notion4e, P, chapeau  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from annonce_probabilites import (BILLE_BLEUE, BILLE_ROUGE, bille, de,  # noqa: E402
                                  de_qui_roule, piece_qui_tourne, sac_vide)

ROUGE = BILLE_ROUGE
BLEU = BILLE_BLEUE
PAPIER_L = "#2563EB"
PAPIER_I = ORANGE_RETENUE
PUNAISE = "#DC2626"


# ── les dessins communs (paysage et short) ──────────────────────────────────

def direction(deg):
    a = math.radians(deg)
    return np.array([math.cos(a), math.sin(a), 0.0])


def papier(lettre, s=1.0):
    """Un papier plié de couleur : bleu « L », orange « I »."""
    coul = PAPIER_L if lettre == "L" else PAPIER_I
    fond = Rectangle(width=0.62 * s, height=0.48 * s, fill_color=coul, fill_opacity=1,
                     stroke_color=WHITE, stroke_width=2)
    pli = Line(fond.get_corner(UR) + LEFT * 0.16 * s, fond.get_corner(UR) + DOWN * 0.13 * s,
               color=WHITE, stroke_width=2)
    l = Text(lettre, font_size=int(32 * s), color=WHITE if lettre == "L" else BLACK, weight=BOLD).move_to(fond)
    return VGroup(fond, pli, l)


def enfant(lettre, s=1.0):
    """Un enfant stylisé : la lettre sur le tee-shirt, de la couleur de ses papiers."""
    coul = PAPIER_L if lettre == "L" else PAPIER_I
    corps = RoundedRectangle(width=0.9 * s, height=1.0 * s, corner_radius=0.3 * s, fill_color=coul,
                             fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    tete = Circle(radius=0.3 * s, fill_color="#8D5524", fill_opacity=1, stroke_color=WHITE,
                  stroke_width=2).next_to(corps, UP, buff=0.04 * s)
    yeux = VGroup(*[Dot(tete.get_center() + P(dx * s, 0.05 * s), radius=0.035 * s, color=WHITE)
                    for dx in (-0.1, 0.1)])
    sourire = Arc(radius=0.12 * s, start_angle=PI * 1.15, angle=PI * 0.7, color=WHITE,
                  stroke_width=2).move_to(tete.get_center() + P(0, -0.1 * s))
    l = Text(lettre, font_size=int(36 * s), color=WHITE if lettre == "L" else BLACK, weight=BOLD).move_to(corps)
    return VGroup(corps, tete, yeux, sourire, l)


def vaisselle(s=1.0):
    """Une pile d'assiettes sales et quelques bulles."""
    assiettes = VGroup(*[Ellipse(width=1.6 * s, height=0.42 * s, fill_color=WHITE, fill_opacity=1,
                                 stroke_color=GREY_B, stroke_width=2).shift(UP * 0.13 * s * k)
                         for k in range(5)])
    taches = VGroup(*[Dot(P(x * s, (0.52 + y) * s), radius=0.05 * s, color="#B45309")
                      for x, y in [(-0.3, 0.02), (0.2, -0.04), (0.05, 0.06)]])
    bulles = VGroup(*[Circle(radius=r * s, stroke_color="#7DD3FC", stroke_width=2).move_to(P(x * s, y * s))
                      for x, y, r in [(0.7, 0.9, 0.12), (0.95, 1.2, 0.08), (0.55, 1.35, 0.1), (-0.8, 1.0, 0.09)]])
    return VGroup(assiettes, taches, bulles)


def punaise(s=1.0):
    """Une punaise DE PROFIL, pointe en haut ; sa base (la tête) en y = 0."""
    tete = RoundedRectangle(width=0.9 * s, height=0.2 * s, corner_radius=0.08 * s, fill_color=PUNAISE,
                            fill_opacity=1, stroke_color=WHITE, stroke_width=2).move_to(P(0, 0.1 * s))
    dome = Polygon(P(-0.25 * s, 0.2 * s), P(0.25 * s, 0.2 * s), P(0.14 * s, 0.38 * s), P(-0.14 * s, 0.38 * s),
                   fill_color=PUNAISE, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    pique = Polygon(P(-0.05 * s, 0.38 * s), P(0.05 * s, 0.38 * s), P(0, 1.0 * s),
                    fill_color="#D1D5DB", fill_opacity=1, stroke_color="#9CA3AF", stroke_width=1.5)
    return VGroup(pique, tete, dome)


def punaise_posee(sol, x, cote=False, s=1.0, sens=1):
    """La punaise posée sur le sol (y = `sol`), pointe en haut ou couchée sur le côté."""
    p = punaise(s)
    if cote:
        coin = P(0.45 * s, 0.0)
        pointe = P(0, 1.0 * s)
        v = pointe - coin
        alpha = math.atan2(v[1], v[0])
        p.rotate(-alpha, about_point=coin)
        if sens < 0:
            p.flip(UP)
    p.shift(P(x - p.get_center()[0], sol - p.get_bottom()[1]))
    return p


def tomber(scene, mob, hauteur=2.5, tours=1.5, run_time=0.8):
    """`mob` (déjà à sa place d'arrivée) tombe du ciel en tournant puis se pose."""
    final = mob.copy()
    c = final.get_center()

    def maj(m, a):
        m.become(final.copy().rotate(TAU * tours * (1 - a), about_point=c).shift(UP * hauteur * (1 - a) ** 2))

    scene.add(mob)
    scene.play(UpdateFromAlphaFunc(mob, maj), run_time=run_time, rate_func=linear)


def ticket_loto(larg=3.2, haut=2.3):
    fond = RoundedRectangle(width=larg, height=haut, corner_radius=0.15, fill_color="#FEF3C7",
                            fill_opacity=1, stroke_color=ORANGE_RETENUE, stroke_width=4)
    mot = Text("LOTO", font_size=34, color="#7C2D12", weight=BOLD).move_to(fond.get_top() + DOWN * 0.35)
    grille = VGroup(*[Square(0.32, stroke_color="#7C2D12", stroke_width=1.5) for _ in range(28)])
    grille.arrange_in_grid(4, 7, buff=0.06).move_to(fond.get_center() + DOWN * 0.25)
    croix = VGroup()
    for k in (2, 9, 12, 17, 23, 26):
        q = grille[k]
        croix.add(VGroup(Line(q.get_corner(UL), q.get_corner(DR)), Line(q.get_corner(UR), q.get_corner(DL)))
                  .set_stroke(ROUGE_ERREUR, 3))
    return VGroup(fond, mot, grille, croix)


def roue(parts, r, centre):
    secteurs = VGroup(*[
        Sector(radius=r, start_angle=math.radians(d), angle=math.radians(a), arc_center=centre,
               fill_color=c, fill_opacity=1, stroke_color=WHITE, stroke_width=3)
        for c, d, a in parts])
    contour = Circle(radius=r, stroke_color=WHITE, stroke_width=4).move_to(centre)
    return secteurs, contour


def piece_fixe(centre, cote, r=0.6):
    disque = Circle(radius=r, fill_color=JAUNE_TITRE if cote == "P" else ORANGE_RETENUE, fill_opacity=1,
                    stroke_color=WHITE, stroke_width=3)
    mot = Text("PILE" if cote == "P" else "FACE", font_size=int(r * 34), color=BLACK, weight=BOLD)
    return VGroup(disque, mot.move_to(disque)).move_to(centre)


# les places des billes dans un sac de 2,4 × 2,4 (relatives à son centre)
PLACES_SAC = [P(-0.6, -0.65), P(0.0, -0.7), P(0.6, -0.65), P(-0.55, -0.05), P(0.05, -0.1), P(0.6, -0.05)]


class ProbaEquiprobabilite4e(Notion4e):
    nom_voix = "4e-proba-equiprobabilite"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=36, buff=0.22):
        return VGroup(*[m if isinstance(m, Mobject) else self.t(m[0], font_size, m[1])
                        for m in morceaux]).arrange(RIGHT, buff=buff)

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.08, mob.get_corner(UR) + RIGHT * 0.08,
                    stroke_width=6, color=color)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("L'équiprobabilité", 58, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("orange").move_to(P(-0.6, -2.75))
        d = de_qui_roule(P(-5.1, 0.0), 1.3, periode=0.3)
        pc = piece_qui_tourne(P(3.9, 0.0), 0.75)
        self.add(d, pc)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech))
        self.au_mot("Toutes les issues")
        q = VGroup(self.t("Toutes les issues ont-elles", 36, BLEU_CALCUL),
                   self.t("la même chance ?", 40, BLEU_CALCUL)).arrange(DOWN, buff=0.2).move_to(P(-0.6, 0.0))
        self.play(FadeIn(q, shift=UP * 0.2))
        self.insister(q[1], 0.45)
        self.attendre_voix(marge=1.2)
        d.clear_updaters()
        pc.clear_updaters()

    # ── 01 : la vaisselle ───────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Qui fait la vaisselle ?")
        self.au_mot("la vaisselle")
        v = vaisselle(1.0).move_to(P(-5.0, 0.4))
        self.play(LaggedStart(*[FadeIn(a, shift=DOWN * 0.3) for a in v[0]], lag_ratio=0.15),
                  FadeIn(v[1]), run_time=0.8)
        self.play(LaggedStart(*[GrowFromCenter(b) for b in v[2]], lag_ratio=0.2), run_time=0.6)
        self.au_mot("Léo et sa sœur")
        eL = enfant("L").move_to(P(-2.4, 0.3))
        eI = enfant("I", 0.88).move_to(P(-1.0, 0.2))
        self.play(FadeIn(eL, shift=UP * 0.3), run_time=0.4)
        self.au_mot("Inès tirent")
        self.play(FadeIn(eI, shift=UP * 0.3), run_time=0.4)
        self.au_mot("tirent au sort")
        self.play(Wiggle(eL), Wiggle(eI), run_time=0.7)
        ch = chapeau(2.4, 1.6).move_to(P(2.6, -1.1))
        self.au_mot("écrit les prénoms")
        self.play(FadeIn(ch, shift=UP * 0.3), Indicate(eI, color=PAPIER_I), run_time=0.6)
        ordre = ["L", "L", "L", "I"]
        xs = [1.2, 2.15, 3.1, 4.05]
        paps = VGroup(*[papier(l, 1.2).move_to(P(x, 1.35)) for l, x in zip(ordre, xs)])
        for ext, k in [("Léo, Léo", 0), ("Léo, Léo, Léo", 1), ("Léo, et Inès", 2), ("et Inès. Le", 3)]:
            self.au_mot(ext)
            self.play(FadeIn(paps[k], shift=DOWN * 0.3, scale=0.6), run_time=0.3)
        trou = ch[4].get_center()
        self.play(LaggedStart(*[p.animate.scale(0.5).move_to(trou).set_opacity(0) for p in paps],
                              lag_ratio=0.2), run_time=1.0)
        self.au_mot("Le tirage est-il juste")
        self.play(Wiggle(ch), Write(self.chute("Le tirage est-il juste ?", color=BLEU_CALCUL, font_size=40)))
        self.attendre_voix()

    # ── 02 : non, pas la même chance ────────────────────────────────────────

    def ecran_reponse(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-reponse")
        self.titre_ecran("Pas la même chance")
        ch = chapeau(2.0, 1.3).move_to(P(-5.2, 0.9))
        self.add(ch)
        sol = -1.9
        xL, xI = -3.4, -1.9
        sortie = ch[4].get_center()
        cibles = [P(xL, sol + 0.35), P(xL, sol + 0.95), P(xL, sol + 1.55), P(xI, sol + 0.35)]
        paps = VGroup(*[papier(l, 1.25).move_to(sortie) for l in "LLLI"])
        socle = Line(P(xL - 0.8, sol), P(xI + 0.8, sol), color=GREY_B, stroke_width=3)
        self.au_mot("Non")
        non = self.t("Non !", 60, ROUGE_ERREUR).move_to(P(2.3, 2.0))
        self.play(FadeIn(non, scale=0.6), Create(socle), run_time=0.4)
        self.add(paps)
        self.bring_to_front(ch)
        self.play(LaggedStart(*[p.animate.move_to(c) for p, c in zip(paps, cibles)], lag_ratio=0.25), run_time=1.3)
        self.au_mot("Il y a 2 issues")
        l1 = self.ligne([("2 issues :", WHITE), ("L", PAPIER_L), ("ou", WHITE), ("I", PAPIER_I)], 40).move_to(P(2.3, 0.95))
        l1[1].set_color(BLEU_CALCUL)
        self.play(FadeIn(l1[0]), run_time=0.3)
        self.au_mot("Léo, ou")
        self.play(FadeIn(l1[1]), Indicate(paps[:3], color=BLEU_CALCUL), run_time=0.4)
        self.au_mot("ou Inès")
        self.play(FadeIn(l1[2:]), Indicate(paps[3], color=PAPIER_I), run_time=0.4)
        self.au_mot("écrit 3 fois")
        l2 = self.ligne([("L :", BLEU_CALCUL), ("écrit 3 fois", WHITE)], 40).move_to(P(2.3, 0.05))
        cad = SurroundingRectangle(paps[:3], color=BLEU_CALCUL, buff=0.1)
        self.play(FadeIn(l2), Create(cad), run_time=0.5)
        self.insister(l2[1][5:], 0.35)
        self.au_mot("beaucoup plus de chances")
        l3 = self.t("beaucoup plus de chances", 36, BLEU_CALCUL).move_to(P(2.3, -0.85))
        self.play(FadeIn(l3, shift=UP * 0.15), run_time=0.4)
        self.play(paps[:3].animate.shift(UP * 0.2), rate_func=there_and_back, run_time=0.5)
        self.au_mot("Les 2 issues")
        self.play(Write(self.chute("Les 2 issues n'ont pas la même chance.", color=ORANGE_RETENUE, font_size=38)))
        self.attendre_voix()

    # ── 03 : la définition ──────────────────────────────────────────────────

    def ecran_definition(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-definition")
        self.titre_ecran("Des issues équiprobables")
        defi = VGroup(self.t("Équiprobables :", 32, VERT_OK),
                      self.t("toutes les issues ont la même chance", 32)).arrange(RIGHT, buff=0.25)
        defi.scale_to_fit_width(min(defi.width, 11.0)).move_to(P(-0.4, 2.15))
        self.play(FadeIn(defi[1]), run_time=0.6)
        self.au_mot("équiprobables. Un")
        cadre = SurroundingRectangle(defi, color=VERT_OK, buff=0.2)
        self.play(FadeIn(defi[0], shift=RIGHT * 0.2), Create(cadre), run_time=0.6)
        self.insister(defi[0], 0.35)
        self.au_mot("Un dé bien équilibré")
        d = de_qui_roule(P(-3.7, 0.6), 1.3, periode=0.25)
        self.add(d)
        lde = self.t("un dé équilibré", 30, BLEU_CALCUL).move_to(P(-3.7, -0.4))
        self.play(FadeIn(lde), run_time=0.4)
        self.au_mot("les 6 faces")
        faces = VGroup(*[de(k, 0.5) for k in range(1, 7)]).arrange(RIGHT, buff=0.14).move_to(P(-3.7, -1.15))
        l6 = self.ligne([("les 6 faces :", WHITE), ("équiprobables", VERT_OK)], 30).move_to(P(-3.7, -1.95))
        self.play(LaggedStart(*[FadeIn(f, scale=0.5) for f in faces], lag_ratio=0.15), FadeIn(l6[0]), run_time=0.9)
        self.play(FadeIn(l6[1]), run_time=0.3)
        self.au_mot("Une pièce normale")
        pc = piece_qui_tourne(P(2.3, 0.6), 0.8)
        self.add(pc)
        lpc = self.t("une pièce normale", 30, BLEU_CALCUL).move_to(P(2.3, -0.4))
        self.play(FadeIn(lpc), run_time=0.4)
        self.au_mot("pile et face")
        pf = VGroup(piece_fixe(ORIGIN, "P", 0.38), piece_fixe(ORIGIN, "F", 0.38)).arrange(RIGHT, buff=0.4)
        pf.move_to(P(2.3, -1.15))
        l2 = self.ligne([("pile et face :", WHITE), ("équiprobables", VERT_OK)], 30).move_to(P(2.3, -1.95))
        self.play(FadeIn(pf, scale=0.5), FadeIn(l2), run_time=0.6)
        self.insister(VGroup(l6[1], l2[1]), 0.35)
        self.attendre_voix()
        d.clear_updaters()
        pc.clear_updaters()

    # ── 04 : la punaise ─────────────────────────────────────────────────────

    def ecran_punaise(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-contre-exemple")
        self.titre_ecran("La punaise")
        sol = 0.3
        self.play(Create(Line(P(-6.3, sol), P(-0.8, sol), color=GREY_B, stroke_width=3)), run_time=0.4)
        self.au_mot("Une punaise")
        p1 = punaise_posee(sol, -5.2, False, 1.1)
        tomber(self, p1, 2.3, 1.5, 0.9)
        self.au_mot("pointe en haut")
        lh = self.t("pointe en haut", 28, BLEU_CALCUL).move_to(P(-5.2, sol - 0.4))
        self.play(FadeIn(lh), Indicate(p1, color=BLEU_CALCUL), run_time=0.5)
        self.au_mot("pointe sur le côté")
        p2 = punaise_posee(sol, -2.2, True, 1.1)
        tomber(self, p2, 2.3, 1.25, 0.8)
        lc = self.t("sur le côté", 28, ORANGE_RETENUE).move_to(P(-2.2, sol - 0.4))
        self.play(FadeIn(lc), run_time=0.4)
        self.au_mot("2 issues")
        l1 = self.t("2 issues", 44).move_to(P(2.6, 1.3))
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.4)
        self.au_mot("mais elles n'ont pas")
        l2 = self.t("pas la même chance", 40, ORANGE_RETENUE).move_to(P(2.6, 0.4))
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.4)
        # une poignée de punaises lancées : la plupart se couchent
        bac_h = [P(-5.5 + 0.6 * k, -1.65) for k in range(2)]
        bac_c = [P(-2.95 + 0.75 * (k % 3), -1.05 - 0.6 * (k // 3)) for k in range(6)]
        petites = [punaise_posee(p[1], p[0], False, 0.45) for p in bac_h]
        petites += [punaise_posee(p[1], p[0], True, 0.45, 1 if k % 2 else -1) for k, p in enumerate(bac_c)]
        ordre = [2, 3, 0, 4, 5, 6, 1, 7]
        for k in ordre:
            tomber(self, petites[k], 1.6, 1.0, 0.25)
        self.au_mot("La forme")
        self.play(Write(self.chute("La forme de la punaise compte.", color=VERT_OK, font_size=38)))
        self.attendre_voix()

    # ── 05 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        self.au_mot("2 issues")
        f = self.fraction(1, 2, 48, ROUGE_ERREUR)
        l1 = self.ligne([("2 issues", WHITE), ("≠", ROUGE_ERREUR), f], 46, 0.4).move_to(P(-0.6, 1.9))
        self.play(FadeIn(l1[0]), run_time=0.4)
        self.au_mot("ne veut pas dire")
        self.play(FadeIn(l1[1], scale=0.5), run_time=0.3)
        self.au_mot("1 chance sur 2")
        self.play(FadeIn(f, shift=UP * 0.15), run_time=0.4)
        self.insister(l1[1], 0.3)
        self.au_mot("Au loto")
        tk = ticket_loto().move_to(P(-3.9, -0.9))
        self.play(FadeIn(tk[:3], shift=UP * 0.3), run_time=0.5)
        self.play(LaggedStart(*[Create(c) for c in tk[3]], lag_ratio=0.2), run_time=0.8)
        self.au_mot("tu gagnes")
        g = self.t("gagner", 40, VERT_OK).move_to(P(1.2, 0.35))
        self.play(FadeIn(g, shift=UP * 0.15), run_time=0.3)
        self.au_mot("tu perds")
        pe = self.t("perdre", 40, ROUGE_ERREUR).move_to(P(1.2, -0.45))
        self.play(FadeIn(pe, shift=UP * 0.15), run_time=0.3)
        self.au_mot("2 issues. Mais")
        acc = Brace(VGroup(g, pe), RIGHT, color=WHITE)
        l2 = self.t("2 issues", 38).next_to(acc, RIGHT, buff=0.2)
        self.play(GrowFromCenter(acc), FadeIn(l2), run_time=0.5)
        self.au_mot("tu n'as pas")
        f2 = self.fraction(1, 2, 44, WHITE)
        l3 = self.ligne([("gagner :", VERT_OK), f2], 40, 0.3).move_to(P(1.8, -1.65))
        self.play(FadeIn(l3), run_time=0.5)
        b = self.barrer(f2)
        self.play(Create(b), run_time=0.3)
        fx = self.t("Non !", 46, ROUGE_ERREUR).next_to(l3, RIGHT, buff=0.4)
        self.play(FadeIn(fx, scale=0.6), run_time=0.3)
        self.insister(fx, 0.3)
        self.attendre_voix()

    # ── 06 : la méthode ─────────────────────────────────────────────────────

    def ecran_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-methode")
        self.titre_ecran("La méthode")
        self.au_mot("se demander")
        q = self.t("Quelque chose avantage-t-il une issue ?", 38, BLEU_CALCUL).move_to(P(-0.4, 2.05))
        cq = SurroundingRectangle(q, color=BLEU_CALCUL, buff=0.2)
        self.play(FadeIn(q), Create(cq), run_time=0.7)
        xs = [-4.4, -0.6, 3.1]
        y, yl = 0.2, -1.55
        # 1. le papier écrit plusieurs fois
        self.au_mot("Un papier")
        paps = VGroup(*[papier(l, 1.15) for l in "LLLI"]).arrange_in_grid(2, 2, buff=0.18).move_to(P(xs[0], y))
        lab1 = VGroup(self.t("un papier écrit", 28), self.t("plusieurs fois", 28)).arrange(DOWN, buff=0.08)
        lab1.move_to(P(xs[0], yl))
        self.play(LaggedStart(*[FadeIn(p, scale=0.6) for p in paps], lag_ratio=0.2), FadeIn(lab1), run_time=0.8)
        self.play(Indicate(paps[:3], color=BLEU_CALCUL), run_time=0.5)
        # 2. la couleur plus grande
        self.au_mot("une couleur plus grande")
        c = P(xs[1], y)
        sect, cont = roue([(ROUGE, 90, 240), (BLEU, 330, 60), ("#22C55E", 30, 60)], 1.05, c)
        aig = VGroup(Arrow(c, c + UP * 0.85, buff=0, color=WHITE, stroke_width=7,
                           max_tip_length_to_length_ratio=0.3), Dot(c, radius=0.1, color=WHITE))
        lab2 = VGroup(self.t("une couleur", 28), self.t("plus grande", 28)).arrange(DOWN, buff=0.08).move_to(P(xs[1], yl))
        self.play(FadeIn(sect, scale=0.6), Create(cont), FadeIn(aig), FadeIn(lab2), run_time=0.6)
        self.play(Rotate(aig, angle=-TAU * 2 - 2.3, about_point=c, rate_func=rate_functions.ease_out_cubic),
                  run_time=1.2)
        # 3. l'objet déséquilibré
        self.au_mot("un objet déséquilibré")
        sol = y - 0.6
        pu = punaise_posee(sol, xs[2], True, 1.3)
        socle = Line(P(xs[2] - 1.1, sol), P(xs[2] + 1.1, sol), color=GREY_B, stroke_width=3)
        lab3 = VGroup(self.t("un objet", 28), self.t("déséquilibré", 28)).arrange(DOWN, buff=0.08).move_to(P(xs[2], yl))
        self.play(Create(socle), FadeIn(lab3), run_time=0.3)
        tomber(self, pu, 1.8, 1.25, 0.7)
        self.play(Wiggle(pu), run_time=0.6)
        self.attendre_voix(marge=1.6)

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def sac_rempli(self, couleurs, x, y=0.55):
        sac = sac_vide(2.4, 2.4).move_to(P(x, y))
        centre = sac[0].get_center()
        billes = VGroup(*[bille(col, 0.26).move_to(centre + p) for col, p in zip(couleurs, PLACES_SAC)])
        return sac, billes

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        xa, xb = -4.4, 0.6
        sa, ba = self.sac_rempli([ROUGE, ROUGE, ROUGE, BLEU, BLEU, BLEU], xa)
        sb, bb = self.sac_rempli([ROUGE, ROUGE, ROUGE, ROUGE, BLEU, BLEU], xb)
        self.au_mot("Sac A")
        ta = self.t("Sac A", 38, JAUNE_TITRE).next_to(sa, UP, buff=0.15)
        self.play(FadeIn(sa), FadeIn(ta), run_time=0.4)
        self.au_mot("3 billes rouges")
        ca = self.ligne([("3 rouges", ROUGE), ("et", WHITE), ("3 bleues", BLEU_CALCUL)], 32).next_to(sa, DOWN, buff=0.25)
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.8) for b in ba[:3]], lag_ratio=0.25), FadeIn(ca[0]),
                  run_time=0.8)
        self.au_mot("et 3 bleues")
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.8) for b in ba[3:]], lag_ratio=0.25), FadeIn(ca[1:]),
                  run_time=0.8)
        self.au_mot("Sac B")
        tb = self.t("Sac B", 38, JAUNE_TITRE).next_to(sb, UP, buff=0.15)
        self.play(FadeIn(sb), FadeIn(tb), run_time=0.4)
        self.au_mot("4 rouges")
        cb = self.ligne([("4 rouges", ROUGE), ("et", WHITE), ("2 bleues", BLEU_CALCUL)], 32).next_to(sb, DOWN, buff=0.25)
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.8) for b in bb[:4]], lag_ratio=0.2), FadeIn(cb[0]),
                  run_time=0.8)
        self.au_mot("et 2 bleues")
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.8) for b in bb[4:]], lag_ratio=0.25), FadeIn(cb[1:]),
                  run_time=0.6)
        self.au_mot("On regarde la couleur")
        oeil = VGroup(self.t("on regarde", 30, GREY_B), self.t("la couleur", 30, GREY_B)).arrange(DOWN, buff=0.1).move_to(P(4.4, 0.55))
        self.play(FadeIn(oeil), run_time=0.4)
        self.au_mot("Dans quel sac")
        q = self.t("Dans quel sac les couleurs sont-elles équiprobables ?", 32, BLEU_CALCUL)
        q.scale_to_fit_width(min(q.width, 10.4)).move_to(P(-0.7, -1.9))
        self.play(Write(q), run_time=1.0)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=38)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        xa, xb = -4.4, 0.6
        sa, ba = self.sac_rempli([ROUGE, ROUGE, ROUGE, BLEU, BLEU, BLEU], xa)
        sb, bb = self.sac_rempli([ROUGE, ROUGE, ROUGE, ROUGE, BLEU, BLEU], xb)
        ta = self.t("Sac A", 34, JAUNE_TITRE).next_to(sa, UP, buff=0.12)
        tb = self.t("Sac B", 34, JAUNE_TITRE).next_to(sb, UP, buff=0.12)
        self.add(sa, ba, sb, bb, ta, tb)
        # les billes se rangent : une rangée de rouges, une rangée de bleues
        def rangees(billes, x, nr):
            anims = []
            for k, b in enumerate(billes):
                if k < nr:
                    anims.append(b.animate.move_to(P(x - 0.85 + 0.57 * k, 0.75)))
                else:
                    anims.append(b.animate.move_to(P(x - 0.85 + 0.57 * (k - nr), 0.1)))
            return anims
        self.au_mot("Dans le sac A")
        self.play(*rangees(ba, xa, 3), Indicate(ta), run_time=0.8)
        self.au_mot("3 rouges")
        ca = self.ligne([("3 rouges,", ROUGE), ("3 bleues", BLEU_CALCUL)], 32).next_to(sa, DOWN, buff=0.2)
        self.play(FadeIn(ca[0]), Indicate(ba[:3], color=ROUGE), run_time=0.5)
        self.au_mot("3 bleues")
        self.play(FadeIn(ca[1]), Indicate(ba[3:], color=BLEU_CALCUL), run_time=0.5)
        self.au_mot("autant de chaque")
        paires = VGroup(*[Line(ba[k].get_bottom(), ba[k + 3].get_top(), color=WHITE, stroke_width=4) for k in range(3)])
        self.play(LaggedStart(*[Create(l) for l in paires], lag_ratio=0.3), run_time=0.7)
        self.au_mot("les couleurs sont équiprobables")
        ra = VGroup(self.coche(), self.t("équiprobables", 34, VERT_OK)).arrange(RIGHT, buff=0.2)
        ra.next_to(ca, DOWN, buff=0.25)
        self.play(FadeIn(ra[1]), Create(ra[0]), run_time=0.5)
        self.insister(ra, 0.35)
        self.au_mot("Dans le sac B")
        self.play(*rangees(bb, xb, 4), Indicate(tb), run_time=0.8)
        pb = VGroup(*[Line(bb[k].get_bottom(), bb[k + 4].get_top(), color=WHITE, stroke_width=4) for k in range(2)])
        self.play(LaggedStart(*[Create(l) for l in pb], lag_ratio=0.3), run_time=0.5)
        self.au_mot("plus de rouges")
        cb = self.t("plus de rouges", 32, ROUGE).next_to(sb, DOWN, buff=0.2)
        cad = SurroundingRectangle(bb[2:4], color=ORANGE_RETENUE, buff=0.08)
        self.play(FadeIn(cb), Create(cad), run_time=0.5)
        self.insister(VGroup(bb[2:4], cad), 0.3)
        self.au_mot("le rouge est avantagé")
        rb = self.t("le rouge est avantagé", 32, ORANGE_RETENUE).next_to(cb, DOWN, buff=0.25)
        self.play(FadeIn(rb, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        f = self.fraction(1, 2, 32)
        acquis = [
            ("Des issues sont", [("Équiprobables : toutes les issues ont la même chance", WHITE)]),
            ("2 issues ne veut", [("2 issues ne veut pas dire", WHITE), f]),
            ("On cherche", [("On cherche ce qui avantage une issue", WHITE)]),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.ligne(m, 34, 0.25)).arrange(RIGHT, buff=0.3)
                          for _, m in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        if lignes.width > 10.4:
            lignes.scale_to_fit_width(10.4)
        lignes.move_to(P(-0.8, 0.4))
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 5")
        self.play(Write(self.chute("Épisode 5 : calculer une probabilité", color=VERT_OK, font_size=36)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_reponse()
        self.ecran_definition()
        self.ecran_punaise()
        self.ecran_piege()
        self.ecran_methode()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
