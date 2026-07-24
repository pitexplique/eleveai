# diagonale_des_fous.py
# EleveAI — Le Journal · « Un peu de maths » — La Diagonale des Fous
#
# UNE seule vidéo (muet + texte). On POSE d'abord la question du DOSAGE, la
# formule dR/dt = −k·effort²·(1+pente) reste AFFICHÉE EN HAUT tout du long, puis
# on déroule les TROIS cas sur le même profil de l'île :
#   1) allure 2  — trop lent → la barrière des 66 h
#   2) allure 6  — le bon dosage → arrivée, réserve vidée pile
#   3) allure 10 — trop fort → le mur, puis hors délai
# et enfin la leçon + l'appel.
#
# La physique est CELLE DU SITE : dR/dt = −C·effort²·(1+pente), Euler pas à pas,
# barrière 66 h, 165 km. Le margouillat EST le coureur.
#
# ⚠️ MUET + TEXTE (Frédéric) : le texte porte tout, waits généreux. 16:9.
#
# Rendu brouillon :
#   python -m manim render -ql manim/scripts/journal/diagonale_des_fous.py DiagonaleDesFous --media_dir manim/scripts/journal/media
# Rendu final :
#   python -m manim render -qh manim/scripts/journal/diagonale_des_fous.py DiagonaleDesFous -o eleveai-maths-journal-diagonale-des-fous --media_dir manim/scripts/journal/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np

from manim import *

from charte import *
from mascotte import MascotteMargouillat

ROUGE = "#ef4444"
FEU = "#e0561a"        # le coureur, le chemin parcouru
VERT_ILE = "#2f8f57"   # le relief de l'île

# ── Le profil de l'île (km, altitude m) — MÊMES points que le simulateur web ──
PTS = [(0, 50), (25, 2100), (45, 1200), (70, 2000),
       (100, 1100), (130, 2200), (150, 1500), (165, 20)]
L = 165.0
BARRIERE = 66.0
DT = 0.1
C = 0.05
ALT_MAX = 2400.0


def alt_at(x):
    x = max(0.0, min(L, x))
    for i in range(len(PTS) - 1):
        a, b = PTS[i], PTS[i + 1]
        if a[0] <= x <= b[0]:
            return a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0])
    return PTS[-1][1]


def grade_at(x):
    x = max(0.0, min(L, x))
    for i in range(len(PTS) - 1):
        a, b = PTS[i], PTS[i + 1]
        if a[0] <= x <= b[0]:
            return (b[1] - a[1]) / (b[0] - a[0])
    return 0.0


def simuler(e):
    """La course, pas à pas (Euler) — identique au simulateur de l'accueil."""
    x = t = 0.0
    R = 100.0
    wall = None
    ts, xs, Rs = [0.0], [0.0], [100.0]
    status = "course"
    guard = 0
    while status == "course" and guard < 200000:
        guard += 1
        g = grade_at(x)
        up = max(g, 0.0)
        base = 0.5 + 0.7 * e
        v = base / (1 + up / 120) if g >= 0 else base * (1 + min(-g / 400, 0.4))
        if R <= 0:
            v = min(v, 1.0)
        if R > 0:
            R += -C * e * e * (1 + up / 200) * DT
            if R <= 0:
                R = 0.0
                if wall is None:
                    wall = x
        x += v * DT
        t += DT
        ts.append(t)
        xs.append(min(x, L))
        Rs.append(max(R, 0.0))
        if x >= L:
            status = "fini"
            break
        if t >= BARRIERE:
            status = "hors-delai"
            break
    return {
        "ts": np.array(ts), "xs": np.array(xs), "Rs": np.array(Rs),
        "status": status, "t_fin": ts[-1], "x_fin": min(xs[-1], L),
        "R_fin": max(Rs[-1], 0.0), "wall": wall,
    }


# ── mapping île → cadre Manim (16:9). La formule vit en HAUT (bannière), donc le
#    profil est un peu plus bas pour lui laisser la place. ───────────────────────
XMIN, XMAX = -6.3, 6.3
YBASE, YTOP = -2.35, 1.55
GX, GY_BOT, GH, GW = 6.05, -0.5, 2.5, 0.5  # la jauge de réserve (à droite)

# Les trois courses (précalculées une fois).
CAS = [
    {"e": 2, "cas": "Allure 2 · trop lent", "coul": ROUGE_ERREUR},
    {"e": 6, "cas": "Allure 6 · le bon dosage", "coul": VERT_OK},
    {"e": 10, "cas": "Allure 10 · trop fort", "coul": ROUGE_ERREUR},
]
SIMS = {2: simuler(2), 6: simuler(6), 10: simuler(10)}


class DiagonaleDesFous(Scene):
    """Une vidéo : la question du dosage, la formule en permanence, les 3 cas."""

    LARGEUR_SURE = 12.8

    # — helpers standard EleveAI —
    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def T(self, texte, size=28, color=WHITE, **kw):
        t = Text(texte, font_size=size, color=color, **kw)
        if t.width > self.LARGEUR_SURE:
            t.scale_to_fit_width(self.LARGEUR_SURE)
        return t

    def anim_entree(self, m, mode=None, run_time=0.8):
        palette = ["fade_up", "pop", "slide_r", "grow", "fade_down", "slide_l", "write"]
        if mode is None:
            if not hasattr(self, "_ai"):
                self._ai = 0
            mode = palette[self._ai % len(palette)]
            self._ai += 1
        table = {
            "write": lambda: Write(m, run_time=run_time),
            "fade_up": lambda: FadeIn(m, shift=0.45 * UP, run_time=run_time),
            "fade_down": lambda: FadeIn(m, shift=0.45 * DOWN, run_time=run_time),
            "slide_r": lambda: FadeIn(m, shift=0.7 * RIGHT, run_time=run_time),
            "slide_l": lambda: FadeIn(m, shift=0.7 * LEFT, run_time=run_time),
            "pop": lambda: FadeIn(m, scale=0.5, run_time=run_time),
            "grow": lambda: GrowFromCenter(m, run_time=run_time),
        }
        return table[mode]()

    # — géométrie de l'île —
    def xman(self, km):
        return XMIN + (km / L) * (XMAX - XMIN)

    def yman(self, alt):
        return YBASE + (alt / ALT_MAX) * (YTOP - YBASE)

    def pt(self, km):
        return np.array([self.xman(km), self.yman(alt_at(km)), 0.0])

    def profil_fill(self):
        crete = [self.pt(km) for km in np.linspace(0, L, 166)]
        contour = crete + [np.array([self.xman(L), YBASE, 0.0]),
                           np.array([self.xman(0), YBASE, 0.0])]
        return Polygon(*contour, color=VERT_ILE, fill_color=VERT_ILE,
                       fill_opacity=0.16, stroke_width=0)

    def profil_ligne(self):
        pts = [self.pt(km) for km in np.linspace(0, L, 166)]
        return VMobject(color=VERT_ILE, stroke_width=4).set_points_as_corners(pts)

    def couvert(self, km):
        km = max(km, 0.4)
        n = max(2, int(km) + 1)
        pts = [self.pt(k) for k in np.linspace(0, km, n)]
        return VMobject(color=FEU, stroke_width=6).set_points_as_corners(pts)

    def jauge_fond(self):
        return Rectangle(width=GW, height=GH, stroke_width=3, color=WHITE) \
            .move_to([GX, GY_BOT + GH / 2, 0])

    def jauge_remplissage(self, R):
        frac = max(0.0, min(100.0, R)) / 100.0
        h = max(0.001, GH * frac)
        col = VERT_OK if R > 50 else (ORANGE_RETENUE if R > 20 else ROUGE_ERREUR)
        r = Rectangle(width=GW - 0.06, height=h, fill_color=col, fill_opacity=0.9,
                      stroke_width=0)
        r.move_to([GX, GY_BOT + h / 2, 0])
        return r

    # ── ÉCRAN D'OUVERTURE : la question + la formule (qui reste) ───────────────
    def ecran_intro(self):
        titre = self.T("La Diagonale des Fous", size=46, color=JAUNE_TITRE).to_edge(UP, buff=0.4)
        self.play(Write(titre))

        self.fill = self.profil_fill()
        self.ligne = self.profil_ligne()
        self.play(FadeIn(self.fill), Create(self.ligne), run_time=1.6)

        sp = self.T("Saint-Pierre", size=20).next_to(self.pt(0), UP, buff=0.1).shift(RIGHT * 0.55)
        sd = self.T("Saint-Denis", size=20).next_to(self.pt(L), UP, buff=0.1).shift(LEFT * 0.55)
        self.villes = VGroup(sp, sd)
        self.info = self.T("165 km  —  barrière 66 h", size=24).to_edge(DOWN, buff=0.28)
        self.play(FadeIn(self.villes), FadeIn(self.info))

        self.gfond = self.jauge_fond()
        self.glab = self.T("réserve", size=20).next_to(self.gfond, UP, buff=0.15)
        self.play(Create(self.gfond), FadeIn(self.glab))

        # LA QUESTION du dosage
        q1 = self.T("Trop vite, ou trop lent ?", size=36, color=WHITE).move_to([0, 0.5, 0])
        self.play(self.anim_entree(q1, mode="grow"))
        self.wait(0.8)
        q2 = self.T("Comment doser sa course ?", size=36, color=FEU).move_to([0, -0.4, 0])
        self.play(self.anim_entree(q2, mode="fade_up"))
        self.wait(1.6)

        # LA FORMULE — elle prend la place du titre, en haut, et RESTE. On DÉCODE
        # dR/dt (« la variation de ta réserve ») pour ne perdre personne.
        self.play(FadeOut(titre))
        f_txt = self.T("dR/dt = −k × effort² × (1 + pente)", size=30, color=BLEU_CALCUL)
        f_sub = self.T("dR/dt = la variation de ta réserve, à chaque instant",
                       size=18, color=WHITE).next_to(f_txt, DOWN, buff=0.1)
        f_inner = VGroup(f_txt, f_sub)
        f_box = SurroundingRectangle(f_inner, color=BLEU_CALCUL, buff=0.14, corner_radius=0.1)
        self.formule = VGroup(f_box, f_inner).to_edge(UP, buff=0.16)
        self.play(self.anim_entree(self.formule, mode="fade_down"))
        self.play(Indicate(f_sub, color=FEU, scale_factor=1.08))
        gloss = self.T("à effort ×2, la réserve se vide ×4 — et les montées comptent double",
                       size=22, color=WHITE).next_to(self.formule, DOWN, buff=0.2)
        self.play(FadeIn(gloss, shift=0.2 * UP))
        self.wait(2.6)
        self.play(FadeOut(q1), FadeOut(q2), FadeOut(gloss))

    # ── UN CAS : le margouillat court, la jauge se vide, le destin s'affiche ────
    def jouer_cas(self, cfg):
        sim = SIMS[cfg["e"]]
        label = self.T(cfg["cas"], size=30, color=cfg["coul"]).move_to([-3.7, 2.05, 0])
        self.play(self.anim_entree(label, mode="slide_l"))

        coureur = MascotteMargouillat().scale(0.4)
        coureur.move_to(self.pt(0) + UP * 0.30).set_z_index(10)
        self.play(FadeIn(coureur, scale=0.5), run_time=0.5)

        u_norm = sim["ts"] / sim["ts"][-1]
        u = ValueTracker(0.0)
        km_now = lambda: float(np.interp(u.get_value(), u_norm, sim["xs"]))
        R_now = lambda: float(np.interp(u.get_value(), u_norm, sim["Rs"]))

        trace = always_redraw(lambda: self.couvert(km_now()))
        remp = always_redraw(lambda: self.jauge_remplissage(R_now()))
        self.add(trace, remp)
        coureur.add_updater(lambda m: m.move_to(self.pt(km_now()) + UP * 0.30))

        self.play(u.animate.set_value(1.0), run_time=6.0, rate_func=linear)
        coureur.clear_updaters()

        if sim["wall"] is not None:
            marker = self.T("le mur !", size=26, color=ROUGE_ERREUR) \
                .move_to(self.pt(sim["wall"]) + UP * 0.9)
            self.play(FadeIn(marker, scale=0.4),
                      Flash(self.pt(sim["wall"]), color=ROUGE_ERREUR, flash_radius=0.7))
        elif sim["status"] == "fini":
            marker = self.T("arrivée !", size=26, color=VERT_OK) \
                .move_to(self.pt(L) + UP * 1.35 + LEFT * 0.95)
            self.play(FadeIn(marker, scale=0.4), Flash(self.pt(L), color=VERT_OK))
        else:
            marker = self.T("barrière 66 h", size=24, color=ROUGE_ERREUR) \
                .move_to(self.pt(sim["x_fin"]) + UP * 1.2 + LEFT * 1.3)
            self.play(FadeIn(marker, shift=0.3 * DOWN),
                      Flash(self.pt(sim["x_fin"]), color=ROUGE_ERREUR))
        self.wait(2.1)

        # on efface le transitoire, on GARDE le profil, la formule, la jauge vide
        trace.clear_updaters()
        remp.clear_updaters()
        self.play(FadeOut(coureur), FadeOut(trace), FadeOut(remp),
                  FadeOut(label), FadeOut(marker), run_time=0.6)

    # ── LA LEÇON + L'APPEL (la formule reste en haut) ──────────────────────────
    def ecran_conclusion(self):
        self.play(FadeOut(self.fill), FadeOut(self.ligne), FadeOut(self.gfond),
                  FadeOut(self.glab), FadeOut(self.villes), FadeOut(self.info))
        self.add_mascotte(scale=0.6)

        lecon1 = self.T("On tient en dosant, pas en fonçant.", size=36, color=JAUNE_TITRE) \
            .move_to([0, 1.35, 0])
        self.play(self.anim_entree(lecon1, mode="grow"))
        self.play(Indicate(self.formule, color=FEU, scale_factor=1.06))
        lecon2 = self.T("Le bon dosage vide la réserve pile à l'arrivée.", size=28, color=WHITE) \
            .move_to([0, 0.4, 0])
        self.play(self.anim_entree(lecon2, mode="fade_up"))
        self.wait(1.6)

        appel = self.T("Lance-toi dans la Diagonale des Fous", size=32, color=FEU) \
            .move_to([0, -1.05, 0])
        lien = self.T("eleveai.fr/diagonale-des-fous", size=24, color=BLEU_CALCUL) \
            .next_to(appel, DOWN, buff=0.25)
        self.play(self.anim_entree(appel, mode="pop"))
        self.play(FadeIn(lien, shift=0.2 * UP))
        signature = self.T(SIGNATURE, size=22, color=VERT_OK).to_edge(DOWN, buff=0.25)
        self.play(Write(signature))
        self.wait(3.0)

    def construct(self):
        self.ecran_intro()
        for cfg in CAS:
            self.jouer_cas(cfg)
        self.ecran_conclusion()
