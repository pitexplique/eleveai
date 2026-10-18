# proba_defi.py
# EleveAI — Maths CM1 — série « Probabilités », épisode 5 (fin de série) : le
# grand défi du hasard (micro : probabilite_defi), AVEC VOIX. Paysage 16:9,
# CEINTURE JAUNE. Short jumeau : proba_defi_short.py (le défi 3, sans réponse).
#
# ⭐ Les FIGURES DU COACH (lib/tutor-v4/components/ProbabilitesCanvas.tsx,
# banque cm1/maths/probabilites.bank.ts, micro probabilite_defi) :
#   · « billes » (billesCanvas / billesVariablesCanvas) : grille de 3 colonnes
#     au moins, cercle de couleur cerclé de bleu nuit, la lettre en blanc
#     (R, V, J) ; la carte blanche EST le sac (col et lien par-dessus) ;
#   · « roue » (roueRougeFavoriCanvas, roueAvecPoidsCanvas) : parts depuis midi
#     dans le sens des aiguilles, étiquettes blanches cerclées de noir, moyeu
#     noir, flèche noire en haut, sur la carte blanche.
# ⛔ PAS D'ÉCART (17/10) : chaque nombre écrit est dit au moment où il l'est ;
# seul le redondant (étiquettes, décor) s'écrit sans être dit.
#
# Écrans : 00 garde · 01 trois défis · 02 défi 1 (4 rouges : certain ?) · 02b
# correction · 03 défi 2 (sac A / sac B) · 03b correction (1 sur 2, 1 sur 5)
# · 04 défi 3 (roue 1 rouge, 3 bleues) · 04b correction (2 et 2) · 05 ce que
# tu as appris · 06 abonnement.
#
# Voix : manim/voix/cm1-proba-defi.json (débit −10).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/cm1/proba_defi.py ProbaDefiCM1 -o eleveai-maths-cm1-proba-defi --media_dir manim/scripts/cm1/media
# Puis copier le mp4 dans manim/sorties/cm1/maths/probabilites/05-defis/.

import math
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "annonce"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_probabilite_vocabulaire import Sac, mot  # noqa: E402
from proba_hasard import carte_coach, tourner_de  # noqa: E402

# les couleurs du coach (COULEURS de la banque)
COACH = {"R": "#ef4444", "B": "#3b82f6", "V": "#22c55e", "J": "#eab308"}
NOMS = {"R": "Rouge", "B": "Bleu", "V": "Vert", "J": "Jaune"}
NUIT = "#0f172a"


class NotionCM1(Notion6e):
    identite = "Maths CM1 — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


def bille(code, r=0.36):
    """Une bille du canvas « billes » : couleur du coach, bord bleu nuit,
    lettre blanche cerclée de bleu nuit (comme le coach)."""
    c = Circle(radius=r, fill_color=COACH[code], fill_opacity=1, stroke_color=NUIT, stroke_width=3)
    lettre = Text(code, font_size=int(r * 80), color=WHITE, weight=BOLD)
    lettre.set_stroke(NUIT, width=3, background=True)
    return VGroup(c, lettre.move_to(c))


def billes_dans(sac, codes, r=None):
    r = r or sac.cell * 0.34
    return VGroup(*[bille(c, r).move_to(sac.place(i)) for i, c in enumerate(codes)])


def part_roue(i, code, r, n=4, police=24):
    """La i-ème part (sur n égales) de la roue du coach, depuis midi, sens des aiguilles."""
    a0 = PI / 2 - i * TAU / n
    sect = Sector(radius=r, angle=-TAU / n, start_angle=a0, fill_color=COACH[code], fill_opacity=1,
                  stroke_color=NUIT, stroke_width=3)
    if not police:
        return VGroup(sect)
    am = a0 - PI / n
    lbl = Text(NOMS[code], font_size=police, color=WHITE, weight=BOLD)
    lbl.set_stroke(NUIT, width=3, background=True)
    lbl.move_to(P(0.62 * r * math.cos(am), 0.62 * r * math.sin(am)))
    return VGroup(sect, lbl)


def roue(codes, centre, r=1.5, police=24):
    """La roue du coach posée sur sa carte. Renvoie (carte, parts, moyeu + flèche)."""
    parts = VGroup(*[part_roue(i, c, r, len(codes), police) for i, c in enumerate(codes)])
    k = 1.6 * r / 86.4
    moyeu = Dot(ORIGIN, radius=7 * k / 1.3, color=NUIT)
    fleche = Polygon(P(0, r + 8 * k), P(-8 * k, r - 12 * k), P(8 * k, r - 12 * k),
                     fill_color=NUIT, fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)
    fond = carte_coach(2 * r + 0.7, 2 * r + 0.9).move_to(P(0, 0.12))
    g = VGroup(fond, parts, VGroup(moyeu, fleche)).shift(centre)
    return g[0], g[1], g[2]


def icone_pause(h=0.9, color=ORANGE_RETENUE):
    barres = VGroup(*[RoundedRectangle(width=h * 0.3, height=h, corner_radius=0.06, fill_color=color,
                                       fill_opacity=1, stroke_width=0) for _ in range(2)])
    return barres.arrange(RIGHT, buff=h * 0.25)


class ProbaDefiCM1(NotionCM1):
    nom_voix = "cm1-proba-defi"
    XC = -0.6  # le centre de la zone utile (Ti-Margo occupe le coin bas-droit)

    def t(self, texte, font_size=40, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.35):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def pulser(self, mobs, k=1.3):
        self.play(*[m.animate.scale(k) for m in mobs], run_time=0.3)
        self.play(*[m.animate.scale(1 / k) for m in mobs], run_time=0.3)

    def cadre(self, x, y, w=3.0, h=2.6):
        return RoundedRectangle(width=w, height=h, corner_radius=0.18, stroke_color=BLEU_CALCUL,
                                stroke_width=3, fill_color="#0F172A", fill_opacity=0.6).move_to(P(x, y))

    def pause(self, marge=2.0):
        """« Mets pause, et cherche ! » en orange, l'icône pause qui bat."""
        self.au_mot("Mets pause")
        ch = self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)
        ic = icone_pause(0.55).next_to(ch, LEFT, buff=0.35)
        self.play(Write(ch), FadeIn(ic, scale=0.5), run_time=0.8)
        self.insister(ic, 0.3)
        self.attendre_voix(marge=marge)

    def tourner(self, parts, centre, vitesse=6.0):
        etat = {"v": vitesse, "angle": 0.0}

        def maj(m, dt):
            d = etat["v"] * dt
            etat["angle"] += d
            tourner_de(m, centre, d)

        parts.add_updater(maj)
        return etat

    def arreter(self, parts, etat, centre, sur=0.0, run_time=2.0):
        """La roue ralentit et s'arrête : la flèche pointe au milieu de la part
        qui était à l'angle `sur` (mesuré depuis midi, sens des aiguilles)."""
        parts.clear_updaters()
        tour = etat.get("angle", 0.0)
        cible = tour + 2 * PI
        cible = cible + ((sur - cible) % TAU)
        fait = {"a": 0.0}

        def pas(m, alpha):
            a = (cible - tour) * alpha
            tourner_de(m, centre, a - fait["a"])
            fait["a"] = a

        self.play(UpdateFromAlphaFunc(parts, pas), run_time=run_time, rate_func=rate_functions.ease_out_cubic)
        etat["angle"] = cible

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Le grand défi du hasard !", 58, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("jaune").move_to(P(self.XC, -2.75))
        s = Sac(P(-3.0, 0.0), cols=3, rows=2, cell=0.8)
        bs = billes_dans(s, ["R", "R", "V", "J", "B"])
        centre = P(1.9, -0.05)
        fond, parts, fixe = roue(["R", "B", "B", "B"], centre, 1.05, None)
        self.add(s.dessin, bs, fond, parts, fixe, ech)
        self.tourner(parts, centre, 7.0)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), run_time=1.0)
        self.attendre_voix(marge=0.8)
        parts.clear_updaters()

    # ── 01 : trois défis ────────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("3 défis", 52)
        xs, y = [-4.6, -1.0, 2.6], 0.5
        cadres = [self.cadre(x, y, 3.3, 3.0) for x in xs]
        self.au_mot("Trois défis")
        self.play(LaggedStart(*[FadeIn(c, scale=0.9) for c in cadres], lag_ratio=0.25), run_time=0.8)
        self.au_mot("avec des sacs")
        s1 = Sac(P(xs[0], y - 0.25), cols=3, rows=2, cell=0.7)
        b1 = billes_dans(s1, ["R", "R", "R", "R"])
        sa = Sac(P(xs[1] - 0.72, y - 0.25), cols=1, rows=2, cell=0.6)
        sb = Sac(P(xs[1] + 0.62, y - 0.25), cols=2, rows=3, cell=0.48)
        ba, bb = billes_dans(sa, ["V", "J"]), billes_dans(sb, ["V", "J", "J", "J", "J"])
        self.play(FadeIn(s1.dessin, b1, shift=DOWN * 0.3), run_time=0.4)
        self.play(FadeIn(VGroup(sa.dessin, ba, sb.dessin, bb), shift=DOWN * 0.3), run_time=0.4)
        self.au_mot("une roue")
        centre = P(xs[2], y - 0.1)
        fond, parts, fixe = roue(["R", "B", "B", "B"], centre, 1.0, None)
        self.play(FadeIn(VGroup(fond, parts, fixe), scale=0.8), run_time=0.4)
        etat = self.tourner(parts, centre, 7.0)
        self.au_mot("mets pause et cherche")
        ic = icone_pause(0.6).move_to(P(self.XC - 2.4, -2.1))
        ch = self.t("Mets pause, et cherche !", 40, ORANGE_RETENUE).next_to(ic, RIGHT, buff=0.35)
        self.play(FadeIn(ic, scale=0.5), Write(ch), run_time=0.7)
        self.insister(ic, 0.3)
        self.arreter(parts, etat, centre, 0.0, 1.6)
        self.attendre_voix()

    # ── 02 : défi 1 ─────────────────────────────────────────────────────────

    SAC1 = P(-4.6, -0.2)

    def sac1(self):
        s = Sac(self.SAC1, cols=3, rows=2, cell=1.15)
        return s, billes_dans(s, ["R", "R", "R", "R"])

    def trio(self, centre):
        tr = VGroup(mot("certain", 34), mot("possible", 34), mot("impossible", 34)).arrange(RIGHT, buff=0.22)
        tr.move_to(centre)
        if tr.get_right()[0] > 6.6:
            tr.shift(LEFT * (tr.get_right()[0] - 6.6))
        return tr

    def ecran_defi1(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("02-defi1")
        self.titre_ecran("Défi 1", 52)
        s, bs = self.sac1()
        self.au_mot("Dans un sac")
        self.play(FadeIn(s.dessin, shift=UP * 0.2), run_time=0.4)
        self.au_mot("4 billes rouges")
        n4 = VGroup(self.t("4", 96, JAUNE_TITRE), self.t("rouges", 60, COACH["R"])).arrange(RIGHT, buff=0.3)
        n4.move_to(P(2.6, 2.0))
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 1.0) for b in bs], lag_ratio=0.3),
                  FadeIn(n4[0], scale=0.5), run_time=1.0)
        self.play(FadeIn(n4[1], shift=LEFT * 0.2), run_time=0.3)
        self.au_mot("Tirer une bille rouge")
        cible = bille("R", 0.5).move_to(P(1.9, 0.55))
        q = self.t("?", 84, JAUNE_TITRE).next_to(cible, RIGHT, buff=0.3)
        self.play(FadeIn(cible, scale=0.5), FadeIn(q), run_time=0.4)
        tr = self.trio(P(2.1, -0.75))
        for ex, m in zip(["certain,", "possible ou", "impossible ?"], tr):
            self.au_mot(ex)
            self.play(GrowFromCenter(m), run_time=0.3)
        self.pause()

    def ecran_correction1(self):
        self.clear()
        self.add_mascotte()
        self.dire("02b-correction1")
        self.titre_ecran("Correction", 52)
        s, bs = self.sac1()
        cible = bille("R", 0.5).move_to(P(1.9, 0.55))
        tr = self.trio(P(2.1, -0.75))
        self.add(s.dessin, bs, cible, tr)
        self.au_mot("Il n'y a que des rouges")
        self.pulser(bs, 1.35)
        self.pulser(bs, 1.35)
        self.au_mot("c'est certain")
        self.play(tr[1].animate.set_opacity(0.2), tr[2].animate.set_opacity(0.2), run_time=0.3)
        ok = self.coche(taille=0.45).next_to(cible, RIGHT, buff=0.4)
        self.play(Create(ok), tr[0].animate.scale(1.25), run_time=0.4)
        self.insister(tr[0], 0.3)
        self.attendre_voix()

    # ── 03 : défi 2 : sac A ou sac B ────────────────────────────────────────

    XA, XB, YS = -5.0, -0.95, 0.15

    def sacs_ab(self):
        sa = Sac(P(self.XA, self.YS), cols=3, rows=2, cell=0.95)
        sb = Sac(P(self.XB, self.YS), cols=3, rows=2, cell=0.95)
        ba = billes_dans(sa, ["V", "J"])
        bb = billes_dans(sb, ["V", "J", "J", "J", "J"])
        la = self.t("Sac A", 40, JAUNE_TITRE).next_to(sa.dessin, UP, buff=0.2)
        lb = self.t("Sac B", 40, JAUNE_TITRE).next_to(sb.dessin, UP, buff=0.2)
        return sa, sb, ba, bb, la, lb

    def compte(self, x, vert, jaune):
        """Sous le sac : le nombre de vertes (en vert), le nombre de jaunes (en jaune)."""
        nv = VGroup(bille("V", 0.26), self.t(vert, 56, COACH["V"])).arrange(RIGHT, buff=0.15)
        nj = VGroup(bille("J", 0.26), self.t(jaune, 56, COACH["J"])).arrange(RIGHT, buff=0.15)
        return VGroup(nv, nj).arrange(RIGHT, buff=0.6).move_to(P(x, self.YS - 2.05))

    def ecran_defi2(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("03-defi2")
        self.titre_ecran("Défi 2", 52)
        sa, sb, ba, bb, la, lb = self.sacs_ab()
        ca, cb = self.compte(self.XA, "1", "1"), self.compte(self.XB, "1", "4")
        self.au_mot("Sac A")
        self.play(FadeIn(sa.dessin, shift=UP * 0.2), FadeIn(la), run_time=0.4)
        self.au_mot("1 bille verte et 1 jaune")
        self.play(FadeIn(ba[0], shift=DOWN), FadeIn(ca[0], scale=0.5), run_time=0.4)
        self.au_mot("et 1 jaune")
        self.play(FadeIn(ba[1], shift=DOWN), FadeIn(ca[1], scale=0.5), run_time=0.4)
        self.au_mot("Sac B")
        self.play(FadeIn(sb.dessin, shift=UP * 0.2), FadeIn(lb), run_time=0.4)
        self.au_mot("1 bille verte et 4")
        self.play(FadeIn(bb[0], shift=DOWN), FadeIn(cb[0], scale=0.5), run_time=0.4)
        self.au_mot("4 jaunes")
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN) for b in bb[1:]], lag_ratio=0.2),
                  FadeIn(cb[1], scale=0.5), run_time=0.8)
        self.au_mot("Pour tirer une verte")
        cible = bille("V", 0.5).move_to(P(3.35, 1.6))
        self.play(FadeIn(cible, scale=0.5), run_time=0.4)
        self.au_mot("quel sac")
        q = self.t("Quel sac ?", 48, WHITE).move_to(P(3.6, 0.4))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.play(Indicate(la, color=ORANGE_RETENUE), Indicate(lb, color=ORANGE_RETENUE), run_time=0.6)
        self.pause()

    def ecran_correction2(self):
        self.clear()
        self.add_mascotte()
        self.dire("03b-correction2")
        self.titre_ecran("Correction", 52)
        sa, sb, ba, bb, la, lb = self.sacs_ab()
        self.add(sa.dessin, sb.dessin, ba, bb, la, lb)
        y = self.YS - 2.05
        ra = self.ligne_sur(["1", "verte sur", "2"], self.XA, y)
        rb = self.ligne_sur(["1", "verte sur", "5"], self.XB, y)
        self.au_mot("Dans le sac A")
        self.play(sa.dessin[1].animate.set_stroke(JAUNE_TITRE, 6), run_time=0.3)
        self.au_mot("1 verte sur 2")
        self.play(FadeIn(ra[0], scale=0.5), FadeIn(ra[1]), Indicate(ba[0], scale_factor=1.4), run_time=0.5)
        self.play(FadeIn(ra[2], scale=0.5), self.vague(ba), run_time=0.6)
        self.au_mot("Dans le sac B")
        self.play(sa.dessin[1].animate.set_stroke("#cbd5e1", 4), sb.dessin[1].animate.set_stroke(JAUNE_TITRE, 6),
                  run_time=0.3)
        self.au_mot("1 verte sur 5")
        self.play(FadeIn(rb[0], scale=0.5), FadeIn(rb[1]), Indicate(bb[0], scale_factor=1.4), run_time=0.5)
        self.play(FadeIn(rb[2], scale=0.5), self.vague(bb), run_time=0.8)
        self.au_mot("Le sac A donne plus")
        self.play(sb.dessin[1].animate.set_stroke("#cbd5e1", 4), sa.dessin[1].animate.set_stroke(VERT_OK, 8),
                  run_time=0.3)
        pc = VGroup(self.t("Sac A", 52, JAUNE_TITRE), mot("plus de chances", 38, VERT_OK)).arrange(DOWN, buff=0.3)
        pc.move_to(P(4.2, 0.9))
        self.play(FadeIn(pc[0], shift=LEFT * 0.2), run_time=0.3)
        self.play(GrowFromCenter(pc[1]), run_time=0.4)
        self.insister(pc, 0.3)
        self.attendre_voix()

    def ligne_sur(self, morceaux, x, y):
        """« 1 verte sur 2 » : le 1 en vert, le total en jaune."""
        a = self.t(morceaux[0], 52, COACH["V"])
        b = self.t(morceaux[1], 34, WHITE)
        c = self.t(morceaux[2], 52, JAUNE_TITRE)
        return VGroup(a, b, c).arrange(RIGHT, buff=0.22, aligned_edge=DOWN).move_to(P(x, y))

    def vague(self, billes):
        """Les billes du sac sautent l'une après l'autre : on les compte toutes."""
        return LaggedStart(*[Indicate(b, color=JAUNE_TITRE, scale_factor=1.3) for b in billes], lag_ratio=0.25)

    # ── 04 : défi 3 : la roue ───────────────────────────────────────────────

    ROUE_C = P(-3.7, -0.15)
    R3 = 1.75

    def roue3(self, codes=("R", "B", "B", "B")):
        return roue(list(codes), self.ROUE_C, self.R3, 28)

    def egal(self, y, x=2.6):
        """Le pictogramme « autant de rouge que de bleu » : bille rouge = bille bleue."""
        g = VGroup(Circle(radius=0.4, fill_color=COACH["R"], fill_opacity=1, stroke_color=NUIT, stroke_width=3),
                   self.t("=", 80, WHITE),
                   Circle(radius=0.4, fill_color=COACH["B"], fill_opacity=1, stroke_color=NUIT, stroke_width=3))
        return g.arrange(RIGHT, buff=0.4).move_to(P(x, y))

    def ecran_defi3(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("04-defi3")
        self.titre_ecran("Défi 3", 52)
        fond, parts, fixe = self.roue3()
        self.au_mot("Une roue")
        self.play(FadeIn(fond), FadeIn(fixe), run_time=0.3)
        self.au_mot("4 parts")
        p4 = VGroup(self.t("4", 80, JAUNE_TITRE), self.t("parts", 52)).arrange(RIGHT, buff=0.25)
        p4.move_to(P(2.6, 2.1))
        self.play(LaggedStart(*[FadeIn(p, scale=0.8) for p in parts], lag_ratio=0.3), FadeIn(p4, scale=0.6),
                  run_time=1.0)
        self.add_foreground_mobject(fixe)
        self.au_mot("1 rouge")
        l2 = VGroup(self.t("1", 72, COACH["R"]), self.t("rouge", 46, COACH["R"]),
                    self.t("3", 72, COACH["B"]), self.t("bleues", 46, COACH["B"]))
        l2.arrange(RIGHT, buff=0.22, aligned_edge=DOWN)
        l2[2].shift(RIGHT * 0.35)
        l2[3].shift(RIGHT * 0.35)
        l2.move_to(P(2.6, 1.0))
        self.play(FadeIn(l2[:2], scale=0.6), Indicate(parts[0], scale_factor=1.15), run_time=0.5)
        self.au_mot("3 bleues")
        self.play(FadeIn(l2[2:], scale=0.6), *[Indicate(p, scale_factor=1.1) for p in parts[1:]], run_time=0.6)
        self.au_mot("Combien de parts rouges")
        q = self.t("Combien de parts rouges ?", 40, ORANGE_RETENUE).move_to(P(2.75, -0.1))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.5)
        self.au_mot("autant de chances")
        eg = self.egal(-1.15)
        self.play(GrowFromCenter(eg), run_time=0.4)
        self.insister(eg, 0.3)
        etat = self.tourner(parts, self.ROUE_C, 6.5)
        self.au_mot("toujours 4 parts")
        self.insister(p4, 0.35)
        self.arreter(parts, etat, self.ROUE_C, PI / 4 + PI / 2, 1.4)
        self.pause()
        self.remove_foreground_mobject(fixe)

    def ecran_correction3(self):
        self.clear()
        self.add_mascotte()
        self.dire("04b-correction3")
        self.titre_ecran("Correction", 52)
        fond, parts, fixe = self.roue3()
        self.add(fond, parts, fixe)
        self.add_foreground_mobject(fixe)
        self.au_mot("2 parts rouges")
        neuve = part_roue(1, "R", self.R3, 4, 28).shift(self.ROUE_C)
        l2 = VGroup(self.t("2", 72, COACH["R"]), self.t("rouges", 46, COACH["R"]),
                    self.t("2", 72, COACH["B"]), self.t("bleues", 46, COACH["B"]))
        l2.arrange(RIGHT, buff=0.22, aligned_edge=DOWN)
        l2[2].shift(RIGHT * 0.35)
        l2[3].shift(RIGHT * 0.35)
        l2.move_to(P(2.6, 1.7))
        vieille = parts[1]
        self.play(FadeOut(vieille), FadeIn(neuve), run_time=0.6)
        parts.submobjects[1] = neuve
        self.remove(vieille, neuve)
        self.play(FadeIn(l2[:2], scale=0.6), *[Indicate(p, scale_factor=1.12) for p in parts[:2]], run_time=0.6)
        self.au_mot("2 parts bleues")
        self.play(FadeIn(l2[2:], scale=0.6), *[Indicate(p, scale_factor=1.12) for p in parts[2:]], run_time=0.6)
        self.au_mot("autant de chances")
        eg = self.egal(0.2)
        self.play(GrowFromCenter(eg), run_time=0.4)
        self.insister(eg, 0.35)
        etat = self.tourner(parts, self.ROUE_C, 6.5)
        self.wait(1.0)
        self.arreter(parts, etat, self.ROUE_C, PI / 4, 1.4)
        self.attendre_voix()
        self.remove_foreground_mobject(fixe)

    # ── 05 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("05-finale")
        self.play(Write(self.t("Ce que tu as appris", 48, JAUNE_TITRE).to_edge(UP)))
        trio = VGroup(mot("certain", 40), mot("possible", 40), mot("impossible", 40)).arrange(RIGHT, buff=0.25)
        lignes = VGroup(VGroup(self.coche(taille=0.3), trio).arrange(RIGHT, buff=0.4),
                        VGroup(self.coche(taille=0.3), self.t("Comparer les chances", 48)).arrange(RIGHT, buff=0.4),
                        VGroup(self.coche(taille=0.3), self.t("Compter : tant de chances sur tant", 48))
                        .arrange(RIGHT, buff=0.4))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 11.5:
            lignes.scale_to_fit_width(11.5)
        lignes.move_to(P(self.XC, 0.7))
        for ex, k in zip(["Certain", "possible,", "impossible."], range(3)):
            self.au_mot(ex)
            self.play(GrowFromCenter(trio[k]), run_time=0.3)
        self.play(Create(lignes[0][0]), run_time=0.3)
        for ex, l in zip(["Comparer les chances", "Compter tant"], lignes[1:]):
            self.au_mot(ex)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.5)
            self.play(Create(l[0]), run_time=0.3)
        self.au_mot("Bravo")
        ch = self.chute("Bravo, tu as fini la série !", color=VERT_OK, font_size=44)
        self.play(Write(ch), run_time=0.8)
        self.insister(ch, 0.35)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_defi1()
        self.ecran_correction1()
        self.ecran_defi2()
        self.ecran_correction2()
        self.ecran_defi3()
        self.ecran_correction3()
        self.ecran_finale()
        self.page_abonnement(voix="06-abonne")
