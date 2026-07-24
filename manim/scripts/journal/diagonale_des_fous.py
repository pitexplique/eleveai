# diagonale_des_fous.py
# EleveAI — Le Journal · « Un peu de maths » — La Diagonale des Fous
# (l'article /diagonale-des-fous : le Grand Raid de La Réunion en équation
# différentielle). TRIPTYQUE — trois courses, trois destins, une même équation :
#
#   DiagonaleTropLent  — allure 2  : jamais le mur, mais la barrière des 66 h.
#   DiagonaleBonDosage — allure 6  : la réserve se vide PILE à l'arrivée.
#   DiagonaleLeMur     — allure 10 : le mur avant la mi-course, puis hors délai.
#
# La physique est CELLE DU SITE : dR/dt = −C·effort²·(1+pente), intégrée pas à
# pas (méthode d'Euler), barrière 66 h, 165 km. Le margouillat EST le coureur.
#
# ⚠️ MUET + TEXTE (Frédéric) : le texte porte toute l'explication, waits généreux.
# Format article du journal (jumeau de loi_normale.py) : 16:9, hors banques.
#
# Rendu brouillon :
#   python -m manim render -ql manim/scripts/journal/diagonale_des_fous.py DiagonaleBonDosage --media_dir manim/scripts/journal/media
# Rendu final (les trois) :
#   python -m manim render -qh manim/scripts/journal/diagonale_des_fous.py DiagonaleTropLent  -o eleveai-maths-journal-diagonale-trop-lent  --media_dir manim/scripts/journal/media
#   python -m manim render -qh manim/scripts/journal/diagonale_des_fous.py DiagonaleBonDosage -o eleveai-maths-journal-diagonale-bon-dosage --media_dir manim/scripts/journal/media
#   python -m manim render -qh manim/scripts/journal/diagonale_des_fous.py DiagonaleLeMur     -o eleveai-maths-journal-diagonale-le-mur     --media_dir manim/scripts/journal/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np

from manim import *

from charte import *
from mascotte import MascotteMargouillat

# Couleurs propres à la scène (comme loi_normale définit ROUGE/OR_ESCALIER) :
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


# ── mapping île → cadre Manim (16:9) ──────────────────────────────────────────
XMIN, XMAX = -6.3, 6.3
YBASE, YTOP = -2.35, 2.0
GX, GY_BOT, GH, GW = 6.05, -0.4, 3.0, 0.5  # la jauge de réserve (à droite)


class DiagonaleBase(Scene):
    """Helpers communs (mêmes que loi_normale.py) + les dessins de la Diagonale."""

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

    # — ÉCRAN 1 : la course (profil + équation + jauge + le margouillat court) —
    def ecran_course(self, cfg, seconds=7.5):
        self.clear()
        titre = self.T(cfg["titre"], size=40, color=JAUNE_TITRE).to_edge(UP, buff=0.35)
        self.play(GrowFromCenter(titre))

        fill = self.profil_fill()
        ligne = self.profil_ligne()
        self.play(FadeIn(fill), Create(ligne), run_time=1.6)

        sp = self.T("Saint-Pierre", size=20).next_to(self.pt(0), UP, buff=0.12).shift(RIGHT * 0.55)
        sd = self.T("Saint-Denis", size=20).next_to(self.pt(L), UP, buff=0.12).shift(LEFT * 0.55)
        info = self.T("165 km  —  barrière 66 h", size=24).to_edge(DOWN, buff=0.28)
        self.play(FadeIn(sp), FadeIn(sd), FadeIn(info))

        # l'équation, montrée puis effacée (on déclutte pour la course)
        eq = self.T("dR/dt = −k × effort² × (1 + pente)", size=28, color=BLEU_CALCUL) \
            .move_to([0, 2.55, 0])
        self.play(self.anim_entree(eq, mode="grow"))
        self.play(Indicate(eq, color=FEU, scale_factor=1.12))
        gloss = self.T("la réserve se vide : vite si l'effort est grand, plus vite si ça monte",
                       size=22, color=WHITE).move_to([0, 1.95, 0])
        self.play(FadeIn(gloss, shift=0.3 * UP))
        self.wait(1.6)
        self.play(FadeOut(eq), FadeOut(gloss))

        # la jauge de réserve + son étiquette
        fond = self.jauge_fond()
        lab = self.T("réserve", size=20).next_to(fond, UP, buff=0.15)
        allure = self.T(cfg["allure"], size=24, color=FEU).move_to([-4.2, 2.5, 0])
        self.play(Create(fond), FadeIn(lab), self.anim_entree(allure, mode="slide_l"))

        # le coureur (le margouillat) au départ
        coureur = MascotteMargouillat().scale(0.4)
        coureur.move_to(self.pt(0) + UP * 0.30).set_z_index(10)
        self.add(coureur)
        self.play(FadeIn(coureur, scale=0.5))

        # LA COURSE : un ValueTracker balaie le TEMPS de la simulation ; le
        # margouillat suit le profil, la jauge se vide, le tracé se dessine.
        sim = cfg["sim"]
        u_norm = sim["ts"] / sim["ts"][-1]
        u = ValueTracker(0.0)
        km_now = lambda: float(np.interp(u.get_value(), u_norm, sim["xs"]))
        R_now = lambda: float(np.interp(u.get_value(), u_norm, sim["Rs"]))

        trace = always_redraw(lambda: self.couvert(km_now()))
        remp = always_redraw(lambda: self.jauge_remplissage(R_now()))
        self.add(trace, remp)
        coureur.add_updater(lambda m: m.move_to(self.pt(km_now()) + UP * 0.30))

        self.play(u.animate.set_value(1.0), run_time=seconds, rate_func=linear)
        coureur.clear_updaters()
        self.wait(0.6)

        # le marqueur du destin (le mur, ou l'arrivée)
        if sim["wall"] is not None:
            mur = self.T("le mur !", size=26, color=ROUGE_ERREUR) \
                .move_to(self.pt(sim["wall"]) + UP * 0.85)
            self.play(FadeIn(mur, scale=0.4),
                      Flash(self.pt(sim["wall"]), color=ROUGE_ERREUR, flash_radius=0.7))
        if sim["status"] == "fini":
            drap = self.T("arrivée !", size=26, color=VERT_OK) \
                .move_to(self.pt(L) + UP * 1.35 + LEFT * 0.95)
            self.play(FadeIn(drap, scale=0.4), Flash(self.pt(L), color=VERT_OK))
        else:
            barr = self.T("barrière 66 h", size=24, color=ROUGE_ERREUR) \
                .move_to(self.pt(sim["x_fin"]) + UP * 1.2 + LEFT * 1.3)
            self.play(FadeIn(barr, shift=0.3 * DOWN),
                      Flash(self.pt(sim["x_fin"]), color=ROUGE_ERREUR))
        self.wait(2.2)

    # — ÉCRAN 2 : le verdict + la leçon + l'appel —
    def ecran_verdict(self, cfg):
        self.clear()
        self.add_mascotte(scale=0.6)
        titre = self.T(cfg["verdict_titre"], size=44, color=cfg["verdict_color"]).to_edge(UP)
        self.play(GrowFromCenter(titre))

        lignes = VGroup(*[self.T(t, size=28) for t in cfg["verdict_lines"]]) \
            .arrange(DOWN, aligned_edge=LEFT, buff=0.45).move_to([0, 1.05, 0])
        for i, l in enumerate(lignes):
            self.play(self.anim_entree(l, mode=["fade_up", "slide_r", "slide_l"][i % 3]))

        lecon = self.T(cfg["lesson"], size=32, color=JAUNE_TITRE).move_to([0, -0.75, 0])
        self.play(self.anim_entree(lecon, mode="grow"))
        self.play(Circumscribe(lecon, color=FEU, run_time=1.3))
        self.wait(1.6)

        appel = self.T("Lance-toi dans la Diagonale des Fous", size=32, color=FEU) \
            .move_to([0, -1.95, 0])
        lien = self.T("eleveai.fr/diagonale-des-fous", size=24, color=BLEU_CALCUL) \
            .next_to(appel, DOWN, buff=0.25)
        self.play(self.anim_entree(appel, mode="pop"))
        self.play(FadeIn(lien, shift=0.2 * UP))
        signature = self.T(SIGNATURE, size=22, color=VERT_OK).to_edge(DOWN, buff=0.2)
        self.play(Write(signature))
        self.wait(3.0)

    def jouer(self, cfg):
        self.ecran_course(cfg)
        self.ecran_verdict(cfg)


# ── LES TROIS COURSES ─────────────────────────────────────────────────────────
_SIM2 = simuler(2)
_SIM6 = simuler(6)
_SIM10 = simuler(10)


class DiagonaleTropLent(DiagonaleBase):
    def construct(self):
        s = _SIM2
        self.jouer({
            "titre": "Partir trop doucement",
            "allure": "allure 2 / 10",
            "sim": s,
            "verdict_titre": "La barrière te rattrape",
            "verdict_color": ROUGE_ERREUR,
            "verdict_lines": [
                f"Réserve encore à {round(s['R_fin'])} % : jamais le mur.",
                f"Mais trop lent : à 66 h, arrêté au km {round(s['x_fin'])} sur 165.",
            ],
            "lesson": "Trop prudent, c'est perdre aussi.",
        })


class DiagonaleBonDosage(DiagonaleBase):
    def construct(self):
        s = _SIM6
        self.jouer({
            "titre": "Le bon dosage",
            "allure": "allure 6 / 10",
            "sim": s,
            "verdict_titre": "Arrivée à Saint-Denis",
            "verdict_color": VERT_OK,
            "verdict_lines": [
                f"165 km en {round(s['t_fin'])} h, dans les temps.",
                f"La réserve se vide pile à l'arrivée : il reste {round(s['R_fin'])} %.",
            ],
            "lesson": "On tient en dosant, pas en fonçant.",
        })


class DiagonaleLeMur(DiagonaleBase):
    def construct(self):
        s = _SIM10
        self.jouer({
            "titre": "Partir trop fort",
            "allure": "allure 10 / 10",
            "sim": s,
            "verdict_titre": "Le mur",
            "verdict_color": ROUGE_ERREUR,
            "verdict_lines": [
                f"La réserve s'effondre vers le km {round(s['wall'])}.",
                f"Ensuite on ne fait que marcher : hors délai au km {round(s['x_fin'])}.",
            ],
            "lesson": "Doubler l'allure quadruple la dépense (effort au carré).",
        })
