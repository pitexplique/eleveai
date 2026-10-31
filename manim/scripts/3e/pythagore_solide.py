# pythagore_solide.py
# EleveAI — Maths 3e — Pythagore dans un solide : le gobelet du brevet
# (notionId : pythagore_theoreme, micro : pythagore_solide), AVEC VOIX.
#
# ⭐ 13/10/2026 — le brevet 2026 (Asie, exercice 2) : un gobelet en tronc de
# cône. On remet la pointe, le triangle OAD apparaît, rectangle en A ;
# OA² = 8,2² − 1,8² = 67,24 − 3,24 = 64, donc OA = 8 cm. CEINTURE VERTE.
# Le short jumeau (ceinture orange) : pythagore_solide_short.py.
# Code couleur de la série Pythagore : angle droit BLEU, hypoténuse ORANGE.
#
# Mapping micro (coach 3e, pythagore_solide) → écrans :
#   repérer le triangle caché        → 02-cone-complet, 03-triangle, 04-hypotenuse
#   cône / gobelet (une étape)       → 05-calcul, 06-piege, 08-rediger
#   pyramide, pavé                   → 07-partout
#   pavé en deux étapes (défi)       → 09-defi, 09b-correction
#
# ⭐ 31/10/2026 : refonte « questions-pauses » (manim/questions-pythagore.md, 3e) :
# Q1 après 06-piege (1,5²), Q2 après 07-partout (hauteur d'un cône), compte à rebours
# de 5 s ; fin du 19/10. Module commun : ../4e/pythagore_pauses.py (importé, pas copié).
# Marques mot à mot : 3e-pythagore-solide.marques.json (ici). Avant tout rendu :
#   AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/3e/pythagore_solide.py PythagoreSolide3e
#
# Voix : manim/voix/3e-pythagore-solide.json (Julie, débit −7), validée le 13/10 (« go ») ;
# clés 06q/06r/07q/07r et 11-abonne ajoutées ou changées le 31/10.
# Rendu : python -m manim render -qh --disable_caching manim/scripts/3e/pythagore_solide.py PythagoreSolide3e -o eleveai-maths-3e-pythagore-solide --media_dir manim/scripts/3e/media
# Puis copier le mp4 dans manim/sorties/3e/maths/pythagore/01-gobelet-brevet/.

import re
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "4e"))

from pythagore_hypotenuse import COTE, COUL_DROIT, COUL_HYP, P, PythagoreHypotenuse4e, echelle_ceintures  # noqa: E402
from pythagore_pauses import PausesPaysage, sans_audit  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402

CORPS = "#38BDF8"          # le gobelet
TRI_FOND = "#FB923C"       # le triangle caché, colorié


def arc_ellipse(c, rx, ry, t0, t1, pointille=False, color=WHITE, width=3):
    """Une portion d'ellipse (la base d'un cône vue en perspective)."""
    f = ParametricFunction(lambda t: c + np.array([rx * np.cos(t), ry * np.sin(t), 0.0]),
                           t_range=[t0, t1], color=color, stroke_width=width)
    return DashedVMobject(f, num_dashes=18, dashed_ratio=0.55) if pointille else f


def pointilles(a, b, color=GRAY_B, width=3):
    return DashedLine(a, b, color=color, stroke_width=width, dash_length=0.12)


# Le mixin EN PREMIER, sauf si la scène parente (ép. 3, un autre agent) l'a déjà : MRO cohérent.
_BASES = ((PythagoreHypotenuse4e,) if issubclass(PythagoreHypotenuse4e, PausesPaysage)
          else (PausesPaysage, PythagoreHypotenuse4e))


class PythagoreSolide3e(*_BASES):
    nom_voix = "3e-pythagore-solide"
    identite = "Maths 3e — EleveAI"

    # ── le gobelet ──────────────────────────────────────────────────────────

    def gobelet(self, cx=-4.0, yO=-3.0, yB=2.2, rB=2.4, ech=1.0):  # (31/10) yO −3,4 → −3,0 : 3 % du bas
        """Le gobelet (tronc de cône) et sa pointe imaginaire.

        Au brevet OA : OB = 8 : 20 ; le dessin prend 0,45 au lieu de 0,4 pour
        que le triangle OAD, celui du calcul, se lise.
        Renvoie un dict : 'corps', 'pointe' (pointillés), et les points O, A, D, B.
        """
        O = P(cx, yO)
        B = P(cx, yB)
        k = 0.45
        A = O + (B - O) * k
        rA = rB * k
        ryB, ryA = 0.36 * ech, 0.36 * k * ech
        bg, bd = B + LEFT * rB, B + RIGHT * rB
        ag, ad = A + LEFT * rA, A + RIGHT * rA
        flanc = Polygon(bg, ag, ad, bd, stroke_width=0, fill_color=CORPS, fill_opacity=0.28)
        cotes = VGroup(Line(bg, ag), Line(bd, ad)).set_stroke(WHITE, 3)
        bord = Ellipse(width=2 * rB, height=2 * ryB, color=WHITE, stroke_width=3,
                       fill_color=CORPS, fill_opacity=0.15).move_to(B)
        fond_avant = arc_ellipse(A, rA, ryA, PI, TAU)
        fond_arriere = arc_ellipse(A, rA, ryA, 0, PI, pointille=True, color=GRAY_B)
        corps = VGroup(flanc, cotes, bord, fond_avant, fond_arriere)
        pointe = VGroup(pointilles(ag, O), pointilles(ad, O))
        return dict(corps=corps, pointe=pointe, O=O, A=A, D=ad, B=B, rA=rA)

    def triangle_cache(self, g):
        """Le triangle OAD : fond orange, côtés de l'angle droit bleus, hypoténuse orange."""
        O, A, D = g["O"], g["A"], g["D"]
        fond = Polygon(O, A, D, stroke_width=0, fill_color=TRI_FOND, fill_opacity=0.35)
        oa = Line(O, A, color=COUL_DROIT, stroke_width=7)
        ad = Line(A, D, color=COUL_DROIT, stroke_width=7)
        od = Line(O, D, color=COUL_HYP, stroke_width=9)
        carre = self.carre_droit(A, O - A, D - A, s=0.2)
        return fond, oa, ad, od, carre

    def lettre(self, nom, pt, direction, size=32, color=WHITE):
        return self.t(nom, size, color).move_to(pt + direction * 0.32)

    # ── (31/10) MORCEAU PAR MORCEAU (copie des helpers de 4e/pythagore_rediger.py) ─

    def morceler(self, morceaux, font_size, color):
        """Une ligne en morceaux (des Text), posés EXACTEMENT comme la ligne entière."""
        txts = [m[0] if isinstance(m, tuple) else m for m in morceaux]
        F = self.t(" ".join(txts), font_size, color)
        ms = [self.t(x, font_size, color) for x in txts]
        n = [len([c for c in x if not c.isspace()]) for x in txts]
        if len(F) == sum(n) and all(len(m) == k for m, k in zip(ms, n)):
            i = 0
            for m, k in zip(ms, n):
                m.shift(F[i].get_center() - m[0].get_center())
                i += k
        else:
            VGroup(*ms).arrange(RIGHT, buff=0.14 * font_size / 30)
        for m, x in zip(ms, txts):
            if re.fullmatch(r"\d\.", x.strip()):
                sans_audit(m)  # le « 1. » de la copie se dit « Un : »
        g = VGroup(*ms)
        g.morceaux, g.cues = ms, [m[1] if isinstance(m, tuple) else None for m in morceaux]
        return g

    def copie_m(self, lignes, x, y0, pas, font_size):
        """Comme copie(), mais chaque ligne = liste de morceaux (str, ou (str, extrait de la voix))."""
        g = VGroup()
        for k, spec in enumerate(lignes):
            l = self.morceler(spec[0], font_size, spec[1])
            retrait = spec[2] if len(spec) > 2 else 0.0
            l.move_to(P(0, y0 - k * pas)).align_to(P(x + retrait, 0), LEFT)
            g.add(l)
        return g

    def poser_copie(self, lignes, depuis=0):
        """Chaque morceau paraît à SON mot : l'extrait donné, sinon son 1er mot et son dernier
        nombre ; un extrait "" = dans la MÊME animation que le morceau d'avant."""
        groupes = []
        for l in lignes:
            for m, cue in zip(l.morceaux, l.cues):
                if cue == "" and groupes:
                    groupes[-1][1].append(m)
                else:
                    groupes.append((cue, [m]))
        for cue, ms in groupes:
            if cue is not None and cue != "":
                j = self._texte_voix.find(cue, depuis + 1 if depuis else 0)  # après le morceau d'avant
                if j < 0:
                    raise ValueError(f"« {cue} » absent de la voix après {depuis}")
                self._attendre_pos(j)
                depuis = j
            elif cue is None:
                i, depuis = self._cue(ms[0], depuis)
                if i is not None:
                    self._attendre_pos(i)
            self.play(*[FadeIn(m, shift=RIGHT * 0.15) for m in ms], run_time=0.3)
        return depuis    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Pythagore dans un solide", 58, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2))
        self.au_mot("Ceinture verte")
        self.play(FadeIn(echelle_ceintures("verte").move_to(P(-0.6, -2.4))))
        self.au_mot("Où se cache")
        q1 = self.t("Où se cache le triangle rectangle", 40, BLEU_CALCUL)
        q2 = self.t("dans un gobelet ?", 40, BLEU_CALCUL)
        VGroup(q1, q2).arrange(DOWN, buff=0.2).move_to(P(0, 0.4))
        self.play(FadeIn(q1, shift=UP * 0.2))
        self.play(FadeIn(q2, shift=UP * 0.2))
        self.attendre_voix(marge=1.0)

    # ── 01 : le gobelet ─────────────────────────────────────────────────────

    def ecran_gobelet(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-gobelet")
        g = self.gobelet()
        self.play(FadeIn(g["corps"]), run_time=1.2)
        self.au_mot("tronc de cône")
        self.play(FadeIn(self.ligne("un tronc de cône", 2.0, 40, CORPS, x=2.6)))
        self.au_mot("coupé la pointe")
        self.play(FadeIn(self.ligne("= un cône sans sa pointe", 1.3, 32, WHITE, x=2.6)))
        # (31/10) dans l'ordre de la voix : « l'exercice 2 du brevet 2026 », chacun à son mot
        badge = self.morceler([("Exercice 2", "2 du brevet"), "— brevet 2026"], 32, JAUNE_TITRE)
        cadre = SurroundingRectangle(badge, color=JAUNE_TITRE, buff=0.18, corner_radius=0.1)
        VGroup(badge, cadre).move_to(P(2.6, 0.2))
        self.au_mot("C'est l'exercice")
        self.play(Create(cadre), run_time=0.3)
        self.poser_copie([badge], self._pos("C'est l'exercice"))
        self.au_mot("la hauteur de la partie coupée")
        q = self.t("?", 60, COTE).move_to((g["A"] + g["O"]) / 2)
        self.play(FadeIn(q, scale=1.6))
        self.play(FadeIn(self.ligne("hauteur de la partie coupée ?", -1.0, 32, COTE, x=2.6)))
        self.attendre_voix()

    # ── 02 : on remet la pointe ─────────────────────────────────────────────

    def ecran_cone_complet(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-cone-complet")
        g = self.gobelet()
        self.add(g["corps"])
        self.play(FadeIn(self.ligne("Idée : on remet la pointe", 2.0, 38, JAUNE_TITRE, x=2.6)))
        self.au_mot("on remet la pointe")
        self.play(Create(g["pointe"]), run_time=1.8)
        self.au_mot("jusqu'au sommet O")
        o = Dot(g["O"], radius=0.08)
        lo = self.lettre("O", g["O"], DOWN)
        self.play(FadeIn(o), FadeIn(lo))
        self.play(Flash(o, color=JAUNE_TITRE))
        self.au_mot("redevient un cône")
        cone = VGroup(g["corps"].copy(), g["pointe"].copy())
        self.play(Indicate(cone, color=CORPS, scale_factor=1.04))
        self.play(FadeIn(self.ligne("un cône entier", 0.9, 40, CORPS, x=2.6)))
        self.attendre_voix()

    # ── 03 : le triangle caché ──────────────────────────────────────────────

    def ecran_triangle(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-triangle")
        g = self.gobelet()
        self.add(g["corps"], g["pointe"], Dot(g["O"], radius=0.08), self.lettre("O", g["O"], DOWN))
        self.titre_ecran("Le triangle caché")
        self.au_mot("A est le centre")
        a = Dot(g["A"], radius=0.08)
        self.play(FadeIn(a), FadeIn(self.lettre("A", g["A"], LEFT)))
        self.au_mot("D un point")
        d = Dot(g["D"], radius=0.08)
        self.play(FadeIn(d), FadeIn(self.lettre("D", g["D"], RIGHT)))
        fond, oa, ad, od, carre = self.triangle_cache(g)
        self.au_mot("La hauteur OA")
        self.play(Create(oa))
        self.play(FadeIn(self.ligne("OA tombe droit sur le fond", 1.6, 32, COUL_DROIT, x=2.6)))
        self.au_mot("perpendiculaire au rayon")
        self.play(Create(ad), GrowFromCenter(carre))
        self.play(carre.animate.scale(2.2))
        self.play(carre.animate.scale(1 / 2.2))
        self.au_mot("Le triangle OAD est rectangle")
        self.play(Create(od), FadeIn(fond))
        res = self.ligne("OAD est rectangle en A", 0.5, 40, VERT_OK, x=2.6)
        self.play(Write(res))
        self.play(Circumscribe(res, color=VERT_OK))
        self.attendre_voix()

    # ── 04 : qui est l'hypoténuse ───────────────────────────────────────────

    def figure_complete(self, g, cotes=True):
        """Le gobelet, sa pointe, le triangle OAD et ses trois lettres."""
        fond, oa, ad, od, carre = self.triangle_cache(g)
        objets = VGroup(g["corps"], g["pointe"], fond, oa, ad, od, carre,
                        self.lettre("O", g["O"], DOWN), self.lettre("A", g["A"], LEFT),
                        self.lettre("D", g["D"], RIGHT))
        return objets, od, oa, ad

    def ecran_hypotenuse(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-hypotenuse")
        g = self.gobelet()
        fig, od, oa, ad = self.figure_complete(g)
        self.add(fig)
        self.titre_ecran("Qui est l'hypoténuse ?")
        self.au_mot("Le côté en face")
        self.play(od.animate.set_stroke(width=16))
        self.play(od.animate.set_stroke(width=9))
        self.play(FadeIn(self.ligne("hypoténuse : OD", 1.8, 38, COUL_HYP, x=2.6)))
        self.au_mot("8 virgule 2")  # (31/10) à son nombre
        l_od = self.t("8,2 cm", 30, COUL_HYP).next_to((g["O"] + g["D"]) / 2, RIGHT, buff=0.2)
        self.play(FadeIn(l_od), FadeIn(self.ligne("OD = 8,2 cm", 0.9, 36, COUL_HYP, x=2.6)))
        self.au_mot("1 virgule 8")
        l_ad = self.t("1,8 cm", 26, COUL_DROIT).next_to(Line(g["A"], g["D"]), UP, buff=0.32)
        self.play(FadeIn(l_ad), FadeIn(self.ligne("AD = 1,8 cm", 0.2, 36, COUL_DROIT, x=2.6)))
        self.au_mot("On cherche OA")
        l_oa = self.t("?", 34, COTE).next_to(Line(g["O"], g["A"]), LEFT, buff=0.2)
        self.play(FadeIn(l_oa), Indicate(oa, color=COTE))
        self.play(Write(self.ligne("OA = ?", -0.7, 44, COTE, x=2.6)))
        self.play(FadeIn(self.ligne("un côté de l'angle droit", -1.4, 30, COTE, x=2.6)))
        self.attendre_voix()

    # ── 05 : le calcul ──────────────────────────────────────────────────────

    def ecran_calcul(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-calcul")
        g = self.gobelet(cx=-4.6, yO=-3.0, yB=1.9, rB=1.6)
        fig, od, oa, ad = self.figure_complete(g)
        self.add(fig, self.t("8,2", 26, COUL_HYP).next_to((g["O"] + g["D"]) / 2, RIGHT, buff=0.15))
        self.titre_ecran("On soustrait")
        x0 = 2.0
        self.au_mot("OA au carré égale")
        self.play(Write(self.ligne("OA² = OD² − AD²", 2.0, 40, x=x0)))
        # (31/10) chaque nombre à son mot (marques) : 0 avance.
        l1 = self.morceler(["8,2²", "= 67,24"], 36, COUL_HYP).move_to(P(x0, 1.15))
        l2 = self.morceler(["1,8²", "= 3,24"], 36, COUL_DROIT).move_to(P(x0, 0.45))
        l3 = self.morceler(["OA² = 67,24", "− 3,24", "= 64"], 38, WHITE).move_to(P(x0, -0.35))
        self.poser_copie([l1, l2, l3], self._pos("moins AD"))
        res = VGroup(self.t("OA =", 44, VERT_OK), self.radical(64, font_size=44, color=VERT_OK),
                     self.t("= 8 cm", 44, VERT_OK)).arrange(RIGHT, buff=0.2).move_to(P(x0, -1.35))
        self.au_mot("OA égale racine")
        self.play(FadeIn(res[0]), oa.animate.set_color(VERT_OK), run_time=0.4)
        self.au_nb("racine de 64")
        self.play(FadeIn(res[1]), run_time=0.3)
        self.au_nb("64 : 8")
        self.play(FadeIn(res[2]), run_time=0.3)
        self.play(res.animate.scale(1.3))
        self.play(res.animate.scale(1 / 1.3))
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        # (31/10) titre plus vif : la voix dit « 8 virgule 2 » dès la 1re seconde
        self.play(Write(Text("Le piège : le carré d'un décimal", font_size=40, color=JAUNE_TITRE).to_edge(UP)),
                  run_time=0.5)
        faux = self.morceler(["8,2²", "= 64,4"], 46, ROUGE_ERREUR).move_to(P(-2.6, 1.9))
        self.poser_copie([faux])  # (31/10) « 8,2 » puis « 64,4 », chacun à son mot
        self.play(FadeIn(self.ligne("8² = 64 et 2² = 4, recollés", 1.15, 26, ROUGE_ERREUR, x=-2.6)))
        self.play(Create(Line(faux.get_left(), faux.get_right(), color=ROUGE_ERREUR, stroke_width=6)))
        juste = self.morceler([("8,2 × 8,2", "8 virgule 2 par"), "= 67,24"], 44, VERT_OK).move_to(P(-2.6, 0.2))
        self.poser_copie([juste], self._pos("On multiplie"))
        # Le carré de côté 8,2 : 64 au centre, et les bandes que l'erreur oublie.
        u = 0.36
        o = P(1.4, -2.2)
        g8 = Square(8 * u).set_stroke(WHITE, 2).set_fill(BLEU_CALCUL, 0.35)
        g8.move_to(o + np.array([4 * u, 4 * u, 0]))
        e = 0.2 * u * 4  # la bande de 0,2, épaissie ×4 pour se voir
        b1 = Rectangle(width=e, height=8 * u).set_stroke(WHITE, 2).set_fill(ORANGE_RETENUE, 0.7)
        b1.next_to(g8, RIGHT, buff=0)
        b2 = Rectangle(width=8 * u, height=e).set_stroke(WHITE, 2).set_fill(ORANGE_RETENUE, 0.7)
        b2.next_to(g8, UP, buff=0)
        coin = Square(e).set_stroke(WHITE, 2).set_fill(ORANGE_RETENUE, 0.9)
        coin.next_to(b1, UP, buff=0)
        self.play(FadeIn(g8), FadeIn(self.t("64", 34).move_to(g8)), run_time=0.5)  # (31/10) resserré
        self.play(FadeIn(b1), FadeIn(b2), FadeIn(coin), run_time=0.5)
        self.play(FadeIn(self.t("1,6", 22, ORANGE_RETENUE).next_to(b1, RIGHT, buff=0.1)),
                  FadeIn(self.t("1,6", 22, ORANGE_RETENUE).next_to(b2, UP, buff=0.1)),
                  FadeIn(self.t("0,04", 20, ORANGE_RETENUE).next_to(coin, UR, buff=0.05)), run_time=0.5)
        self.play(FadeIn(self.ligne("64 + 1,6 + 1,6 + 0,04 = 67,24", -0.6, 26, ORANGE_RETENUE, x=-2.6)), run_time=0.5)
        self.au_mot("Le carré d'un décimal")
        self.play(Write(self.chute("Le carré d'un décimal se calcule entier, sans couper.",
                                   color=VERT_OK, font_size=30)))
        self.attendre_voix()

    # ── 07 : dans tous les solides ──────────────────────────────────────────

    def petit_cone(self, c):
        S, O = c + UP * 1.4, c + DOWN * 1.0
        A = O + RIGHT * 1.1
        corps = VGroup(Polygon(S, O + LEFT * 1.1, A, stroke_width=0, fill_color=CORPS, fill_opacity=0.25),
                       Line(S, O + LEFT * 1.1), Line(S, A),
                       arc_ellipse(O, 1.1, 0.26, PI, TAU), arc_ellipse(O, 1.1, 0.26, 0, PI, True, GRAY_B))
        corps[1].set_stroke(WHITE, 3)
        corps[2].set_stroke(WHITE, 3)
        return corps, (O, S, A)

    def petite_pyramide(self, c):
        A, B = c + P(-1.2, -1.0), c + P(0.7, -1.0)
        C, D = c + P(1.3, -0.45), c + P(-0.6, -0.45)
        H = (A + C) / 2
        S = H + UP * 2.3
        corps = VGroup(Polygon(A, B, C, S, stroke_width=0, fill_color=CORPS, fill_opacity=0.25),
                       Line(A, B), Line(B, C), Line(S, A), Line(S, B), Line(S, C),
                       pointilles(A, D), pointilles(D, C), pointilles(S, D), pointilles(A, C, width=2))
        for k in range(1, 6):
            corps[k].set_stroke(WHITE, 3)
        return corps, (H, S, A)

    def pave(self, c, L=2.2, l=1.1, h=1.8, dx=0.75, dy=0.5):
        """Un pavé ABCDEFGH en perspective cavalière ; D (arrière gauche) caché."""
        u = np.array([dx, dy, 0]) / np.hypot(dx, dy)
        A = c + P(-L / 2 - 0.3, -h / 2 - 0.2)
        B = A + RIGHT * L
        C = B + u * l
        D = A + u * l
        E, F, G, H = A + UP * h, B + UP * h, C + UP * h, D + UP * h
        corps = VGroup(Polygon(A, B, C, G, H, E, stroke_width=0, fill_color=CORPS, fill_opacity=0.22),
                       Line(A, B), Line(B, C), Line(C, G), Line(G, H), Line(H, E), Line(E, A),
                       Line(E, F), Line(F, G), Line(B, F),
                       pointilles(A, D), pointilles(D, C), pointilles(D, H))
        for k in range(1, 10):
            corps[k].set_stroke(WHITE, 3)
        return corps, dict(A=A, B=B, C=C, D=D, E=E, F=F, G=G, H=H)

    def colorie(self, droit, haut, bas, s=0.18):
        fond = Polygon(droit, haut, bas, stroke_width=0, fill_color=TRI_FOND, fill_opacity=0.4)
        return VGroup(fond, Line(droit, haut, color=COUL_DROIT, stroke_width=6),
                      Line(droit, bas, color=COUL_DROIT, stroke_width=6),
                      Line(haut, bas, color=COUL_HYP, stroke_width=7),
                      self.carre_droit(droit, haut - droit, bas - droit, s=s))

    def legende(self, l1, l2, color, x):
        return VGroup(self.t(l1, 22, color), self.t(l2, 22, color)).arrange(DOWN, buff=0.08).move_to(P(x, -2.15))

    def ecran_partout(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-partout")
        self.titre_ecran("Le même geste dans tous les solides")
        y = 0.3
        self.au_mot("Dans un cône")
        cone, (O, S, A) = self.petit_cone(P(-4.6, y))
        self.play(FadeIn(cone))
        self.play(FadeIn(self.colorie(O, S, A)))
        self.play(FadeIn(self.t("cône", 30, JAUNE_TITRE).move_to(P(-4.6, -1.5))),
                  FadeIn(self.legende("hypoténuse :", "la génératrice", COUL_HYP, -4.6)))
        self.au_mot("Dans une pyramide")
        pyr, (H, S2, A2) = self.petite_pyramide(P(-0.9, y))
        self.play(FadeIn(pyr))
        self.play(FadeIn(self.colorie(H, S2, A2)))
        self.play(FadeIn(self.t("pyramide", 30, JAUNE_TITRE).move_to(P(-0.9, -1.5))),
                  FadeIn(self.legende("la hauteur tombe", "au centre de la base", COUL_DROIT, -0.9)))
        self.au_mot("Dans un pavé")
        pv, p = self.pave(P(2.9, y + 0.1), L=2.0, l=1.0, h=1.7)
        self.play(FadeIn(pv))
        self.play(FadeIn(self.colorie(p["C"], p["G"], p["A"])))
        self.play(FadeIn(self.t("pavé", 30, JAUNE_TITRE).move_to(P(2.9, -1.5))),
                  FadeIn(self.legende("arête verticale", "+ diagonale du fond", COUL_DROIT, 2.9)))
        self.au_mot("Toujours la même question")
        self.play(Write(self.chute("Toujours la même question : où est l'angle droit ?",
                                   color=JAUNE_TITRE, font_size=32)))
        self.attendre_voix()

    # ── 06q / 07q : les questions-pauses ──────────────────────────────────

    def question_decimal(self):
        self.ecran_question("06q-question", "06r-reponse", ["Combien vaut 1,5² ?"], ["2,25", "1,25", "3"], 0,
                            [["1,5 × 1,5,", "calculé entier."]])

    def question_cone(self):
        cone, (O, S, A) = self.petit_cone(P(-4.1, 0.0))
        fig = VGroup(cone, self.colorie(O, S, A)).scale(1.25)
        self.LARG, self.FS_Q = 7.0, 32  # (31/10) la question tient sur 3 lignes lisibles
        self.ecran_question("07q-question", "07r-reponse",
                            ["Un cône : la génératrice", ["mesure 10 cm,", "le rayon 6 cm."], "Sa hauteur ?"],
                            ["8 cm", "4 cm", "11,7 cm"], 0,
                            ["La génératrice est l'hypoténuse :", ["100", "− 36", "= 64,", "√64", "= 8."]],
                            figure=fig, x_col=2.3)
        del self.LARG, self.FS_Q

    # ── 08 : rédiger au brevet ──────────────────────────────────────────────

    def ecran_rediger(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-rediger")
        self.titre_ecran("Comment rédiger au brevet")
        # (31/10) chaque morceau à son mot (marques) ; le numéro de ligne se dit « Ligne un ».
        lignes = [
            ("Ligne un", [("Le triangle OAD est rectangle en A.", "le triangle")], WHITE),
            ("Ligne deux", [("D'après le théorème de Pythagore :", "d'après"), ("OD² = OA² + AD²", "OD au carré")], WHITE),
            ("Ligne trois", [("OA²", "OA au carré"), "= 67,24", "− 3,24", "= 64"], WHITE),
            ("Ligne quatre", [("OA = √64", "OA égale"), "= 8 cm"], VERT_OK),
        ]
        ys = [1.9, 0.9, -0.1, -1.1]
        for (mot, morceaux, coul), yy in zip(lignes, ys):
            chiffre = {"un": "1", "deux": "2", "trois": "3", "quatre": "4"}[mot.split()[1]]
            num = sans_audit(self.t(chiffre, 34, JAUNE_TITRE)).move_to(P(-6.0, yy))
            txt = self.morceler(morceaux, 32, coul).next_to(num, RIGHT, buff=0.45)
            if txt.get_right()[0] > 6.4:
                txt.scale_to_fit_width(6.4 - txt.get_left()[0])
                txt.next_to(num, RIGHT, buff=0.45)
            self.au_mot(mot)
            self.play(FadeIn(num), run_time=0.3)
            self.poser_copie([txt], self._pos(mot))
            if mot == "Ligne quatre":
                self.play(Circumscribe(txt, color=VERT_OK))
        self.attendre_voix()

    # ── 09 : défi ───────────────────────────────────────────────────────────

    def pave_defi(self):
        pv, p = self.pave(P(-3.4, 0.0), L=2.6, l=1.3, h=3.6)
        lettres = VGroup()
        decal = dict(A=DL, B=DR, C=RIGHT, D=UL, E=LEFT, F=UL, G=UR, H=UP)
        for nom, d in decal.items():
            lettres.add(self.t(nom, 28).move_to(p[nom] + d * 0.3))
        return pv, p, lettres

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        pv, p, lettres = self.pave_defi()
        self.au_mot("Une boîte")
        self.play(FadeIn(pv), FadeIn(lettres))
        self.au_nb("AB égale 4")
        self.play(FadeIn(self.t("4 cm", 28, COTE).next_to(Line(p["A"], p["B"]), DOWN, buff=0.35)))
        self.au_nb("BC égale 3")
        self.play(FadeIn(self.t("3 cm", 28, COTE).next_to((p["B"] + p["C"]) / 2, DR, buff=0.12)))
        self.au_nb("CG égale 12")
        self.play(FadeIn(self.t("12 cm", 28, COTE).next_to(Line(p["C"], p["G"]), RIGHT, buff=0.35)))
        self.au_mot("Combien mesure")
        ag = DashedLine(p["A"], p["G"], color=COUL_HYP, stroke_width=6)
        self.play(Create(ag))
        self.play(Write(self.ligne("AG = ?", 0.8, 56, COUL_HYP, x=3.0)))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("09b-correction")
        self.titre_ecran("Correction : deux triangles")
        pv, p, lettres = self.pave_defi()
        self.add(pv, lettres)
        x0 = 2.6
        self.au_mot("Dans le fond")
        t1 = self.colorie(p["B"], p["C"], p["A"], s=0.16)
        self.play(FadeIn(t1))
        self.play(FadeIn(self.ligne("ABC rectangle en B", 2.0, 30, COUL_DROIT, x=x0)))
        ac = self.morceler([("AC² = 4² + 3²", "AC au carré"), "= 16", "+ 9", "= 25"], 32, WHITE).move_to(P(x0, 1.35))
        d = self.poser_copie([ac], self._pos("Dans le fond"))  # (31/10) chaque nombre à son mot
        self.au_mot("Puis ACG")
        t2 = self.colorie(p["C"], p["G"], p["A"], s=0.18)
        self.play(FadeOut(t1), FadeIn(t2))
        self.play(FadeIn(self.ligne("ACG rectangle en C", 0.55, 30, COUL_DROIT, x=x0)))
        ag = self.morceler([("AG²", "AG au carré"), "= 25 + 12²", "= 25 + 144", "= 169"], 30, WHITE).move_to(P(x0 + 0.25, -0.1))  # (31/10) ne touche plus le pavé
        self.poser_copie([ag], self._pos("Puis ACG"))
        res = VGroup(self.t("AG =", 44, VERT_OK), self.radical(169, font_size=44, color=VERT_OK),
                     self.t("= 13 cm", 44, VERT_OK)).arrange(RIGHT, buff=0.2).move_to(P(x0, -1.1))
        self.au_mot("AG égale racine")
        self.play(FadeIn(res[0]), run_time=0.4)
        self.au_nb("racine de 169")
        self.play(FadeIn(res[1]), run_time=0.3)
        self.au_nb("169 : 13")
        self.play(FadeIn(res[2]), run_time=0.3)
        self.play(Circumscribe(res, color=VERT_OK))
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-finale")
        self.play(Write(self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP)))
        points = [
            ("Un cône coupé", "Un cône coupé : on lui remet sa pointe."),
            ("Dans un solide", "Le triangle rectangle se cache où une hauteur tombe droit."),
            ("Le carré d'un décimal", "Le carré d'un décimal se calcule entier : 8,2² = 67,24."),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 28)).arrange(RIGHT, buff=0.3) for _, txt in points])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55).move_to(P(-0.4, 0.5))
        for (mot, _), l in zip(points, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("Pour t'entraîner")
        self.play(Write(self.chute("Coach : la micro « Pythagore dans un solide »", color=VERT_OK, font_size=32)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_gobelet()
        self.ecran_cone_complet()
        self.ecran_triangle()
        self.ecran_hypotenuse()
        self.ecran_calcul()
        self.ecran_piege()
        self.question_decimal()
        self.ecran_partout()
        self.question_cone()
        self.ecran_rediger()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="11-abonne")
