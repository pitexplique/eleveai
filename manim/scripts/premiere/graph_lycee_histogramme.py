# graph_lycee_histogramme.py
# EleveAI — Maths 1re (automatismes, épreuve anticipée SANS calculatrice)
# série « Graphiques », épisode 04 : LIRE UN HISTOGRAMME (classes, effectif =
# hauteur, bornes [a ; b[, effectif total, fréquence). Paysage, CEINTURE JAUNE.
# Pas de short, pas de sous-classe STMG (la micro n'existe qu'en 1re).
# ⭐ Données (inventées, plausibles) : 50 élèves d'un lycée, temps de trajet en
#   minutes ; classes [0 ; 10[ … [40 ; 50[ ; effectifs 8, 17, 12, 9, 4 (total 50).
#   Calculs : 8 + 17 = 25 ; 17 ÷ 50 = 0,34 ; 9 + 4 = 13 ; 13 ÷ 50 = 0,26 ;
#   12 ÷ 50 = 0,24.
# Écrans : 00 garde · 01 le lycée, l'horloge, 50 élèves, métiers · 02 question
# du jour · 03 les classes, barres collées · 04 hauteur = effectif (17) ·
# 05 les bornes [10 ; 20[ · 06 QUESTION (B) · 07 la fréquence · 08 piège
# (5 barres ≠ 50 élèves) · 09 QUESTION (A) · 10 défi · 10b correction ·
# 11 ce que tu as appris · 12 fin.
# Voix : manim/voix/lycee-graph-histogramme.json (validée le 24/11, débit −10) ;
# WAV : public/sons/lycee-graph-histogramme/ ; marques : graph_lycee_histogramme_marques.json.
# Outils (non modifiés) : la base PropLyceeEvoAdditifBase (prop_lycee_evo_additif.py),
# fin_commune.ecran_fin.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/premiere/graph_lycee_histogramme.py GraphLyceeHistogrammePremiere
# Brouillon : python -m manim render -ql --disable_caching manim/scripts/premiere/graph_lycee_histogramme.py GraphLyceeHistogrammePremiere -o eleveai-maths-premiere-graph-histogramme --media_dir manim/scripts/premiere/media-graph-lycee-histogramme

import sys
from pathlib import Path
import importlib.util

_ICI = Path(__file__).resolve().parent


def _charger(nom, chemin):
    spec = importlib.util.spec_from_file_location(nom, chemin)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_evo = _charger("prop_lycee_evo_additif_1re", _ICI / "prop_lycee_evo_additif.py")
from prop_ratio_ecrire import *  # noqa: E402,F403

sys.path.insert(0, str(_ICI))  # le dossier du script EN TÊTE

from fin_commune import ecran_fin  # noqa: E402

Base = _evo.PropLyceeEvoAdditifBase
gras, sans = _evo.gras, _evo.sans

EFF = [8, 17, 12, 9, 4]
C_BARRE = "#38bdf8"
C_LUE = "#fbbf24"


class Histo(VGroup):
    """L'histogramme : minutes (0 à 50) en bas, effectifs (0 à 18) à gauche.
    Graduations : une figure qu'on LIT (sans synchro, sans audit)."""

    def __init__(self, ox=-5.6, oy=-2.3, L=5.0, H=4.5, ymax=18, fs=20, nombres=True, noms=True, mn_droite=False,
                 **kw):
        super().__init__(**kw)
        self.ox, self.oy, self.L, self.H, self.ymax = ox, oy, L, H, ymax
        grille = VGroup(*[Line(self.p(0, y), self.p(50, y), color="#334155", stroke_width=1.2)
                          for y in range(1, ymax + 1)])
        for y in range(5, ymax + 1, 5):
            grille[y - 1].set_stroke(color="#475569", width=2)
        ax = VGroup(Arrow(self.p(0, 0), self.p(50, 0) + RIGHT * 0.35, buff=0, color=GREY_B, stroke_width=3,
                          max_tip_length_to_length_ratio=0.04),
                    Arrow(self.p(0, 0), self.p(0, ymax) + UP * 0.3, buff=0, color=GREY_B, stroke_width=3,
                          max_tip_length_to_length_ratio=0.05))
        self.barres = VGroup(*[Rectangle(width=L / 5, height=e * H / ymax, fill_color=C_BARRE, fill_opacity=0.85,
                                         stroke_color=WHITE, stroke_width=2)
                               .move_to(self.p(10 * i + 5, e / 2)) for i, e in enumerate(EFF)])
        self.textes = VGroup()
        if nombres:
            for x in range(0, 51, 10):
                self.textes.add(Text(str(x), font_size=fs, color=GREY_A).next_to(self.p(x, 0), DOWN, buff=0.1))
            for y in range(5, ymax + 1, 5):
                self.textes.add(Text(str(y), font_size=fs, color=GREY_A).next_to(self.p(0, y), LEFT, buff=0.1))
        if noms:
            mn = Text("minutes", font_size=fs + 2, color=GREY_A)
            if mn_droite:  # petit histogramme : la phrase de réponse est juste dessous
                self.textes.add(mn.next_to(self.p(50, 0) + RIGHT * 0.4, RIGHT, buff=0.08))
            else:
                self.textes.add(mn.next_to(self.p(50, 0), DOWN, buff=0.1 + 1.6 * mn.height)
                                .align_to(self.p(50, 0) + RIGHT * 0.3, RIGHT))
            self.textes.add(Text("élèves", font_size=fs + 2, color=GREY_A)
                            .next_to(self.p(0, ymax) + UP * 0.3, RIGHT, buff=0.12))
        self.fond = VGroup(grille, ax, self.textes)
        self.add(self.fond, self.barres)
        self.grille, self.axes = grille, ax
        sans(self)

    def p(self, x, y):
        return P(self.ox + x * self.L / 50, self.oy + y * self.H / self.ymax)

    def vers_axe(self, i, couleur=C_LUE):
        b = self.barres[i]
        return DashedLine(b.get_corner(UL), self.p(0, EFF[i]), color=couleur, stroke_width=3, dash_length=0.1)

    def lu(self, v, couleur=C_LUE, fs=24):
        t = Text(str(v), font_size=fs, color=BLACK, weight=BOLD)
        f = RoundedRectangle(width=t.width + 0.2, height=t.height + 0.16, corner_radius=0.08, fill_color=couleur,
                             fill_opacity=1, stroke_width=0)
        g = VGroup(f, t)
        return g.move_to(self.p(0, v)).align_to(self.p(0, v) + LEFT * 0.06, RIGHT)

    def focus(self, idx, faible=0.25):
        return [b.animate.set_fill(C_LUE if i in idx else C_BARRE, 0.95 if i in idx else faible)
                for i, b in enumerate(self.barres)]

    def rallumer(self):
        return [b.animate.set_fill(C_BARRE, 0.85) for b in self.barres]

    def haut(self, i, v=None, fs=24, couleur=WHITE):
        """L'effectif écrit au-dessus de la barre i."""
        return Text(str(EFF[i] if v is None else v), font_size=fs, color=couleur).next_to(self.barres[i], UP,
                                                                                         buff=0.08)


def lycee(s=1.0):
    corps = Rectangle(width=2.4, height=1.3, fill_color="#e2e8f0", fill_opacity=1, stroke_width=0)
    fronton = Polygon(P(-1.35, 0.65), P(0, 1.3), P(1.35, 0.65), fill_color="#94a3b8", fill_opacity=1,
                      stroke_width=0)
    porte = Rectangle(width=0.45, height=0.7, fill_color="#1e3a8a", fill_opacity=1,
                      stroke_width=0).move_to(P(0, -0.3))
    fen = VGroup(*[Square(0.32, fill_color="#38bdf8", fill_opacity=1, stroke_width=0).move_to(P(x, y))
                   for x in (-0.85, -0.42, 0.42, 0.85) for y in (0.25,)])
    mat = Line(P(0, 1.3), P(0, 1.85), color=GREY_B, stroke_width=4)
    drap = Polygon(P(0, 1.85), P(0.45, 1.72), P(0, 1.58), fill_color="#ef4444", fill_opacity=1, stroke_width=0)
    return VGroup(corps, fronton, porte, fen, mat, drap).scale(s)


def horloge(s=1.0, demi=False):
    cad = Circle(radius=0.6, fill_color=WHITE, fill_opacity=1, stroke_color="#1e293b", stroke_width=6)
    g = VGroup(cad)
    if demi:
        g.add(Sector(radius=0.56, angle=-PI, start_angle=PI / 2, fill_color="#fb923c", fill_opacity=0.8,
                     stroke_width=0))
    g.add(*[Line(P(0.48 * np.cos(a), 0.48 * np.sin(a)), P(0.56 * np.cos(a), 0.56 * np.sin(a)), color="#1e293b",
                 stroke_width=3) for a in np.arange(0, TAU, TAU / 12)])
    g.add(Line(ORIGIN, P(0, 0.42), color="#1e293b", stroke_width=6),
          Line(ORIGIN, P(0.3, -0.12) if not demi else P(0, -0.3), color="#1e293b", stroke_width=6),
          Dot(ORIGIN, radius=0.05, color="#1e293b"))
    return g.scale(s)


def eleve(c, s=0.13):
    t = Circle(radius=0.5, fill_color="#f1c27d", fill_opacity=1, stroke_width=0).move_to(P(0, 0.75))
    corps = RoundedRectangle(width=1.1, height=1.0, corner_radius=0.3, fill_color=c, fill_opacity=1,
                             stroke_width=0).move_to(P(0, -0.3))
    return VGroup(corps, t).scale(s)


def foule(n=50, cols=10, s=0.13, dx=0.36, dy=0.36):
    teintes = ["#6366f1", "#22c55e", "#f97316", "#ec4899", "#0ea5e9"]
    g = VGroup(*[eleve(teintes[k % 5], s) for k in range(n)])
    for k, e in enumerate(g):
        e.move_to(P((k % cols) * dx, -(k // cols) * dy))
    return g


class GraphLyceeHistogrammeBase(Base):
    nom_voix = "lycee-graph-histogramme"
    fichier_marques = "graph_lycee_histogramme_marques.json"
    identite = "Maths 1re — EleveAI"
    ceinture = "jaune"
    XR = 0.55

    def petit_histo(self):
        return Histo(ox=-5.65, oy=-0.45, L=4.3, H=3.3, fs=17, mn_droite=True)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("L'histogramme", self.identite, self.ceinture, y_ech=-2.45)
        sans(ident)
        sans(ech)
        self.au_mot("L'histogramme")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        h = Histo(ox=-2.4, oy=-1.45, L=3.6, H=2.6, nombres=False, noms=False)
        self.play(FadeIn(h.fond), run_time=0.3)
        self.play(LaggedStart(*[GrowFromEdge(b, DOWN) for b in h.barres], lag_ratio=0.2), run_time=0.9)
        self.au_mot("Que dit chaque barre")
        q = self.t("?", 110, ORANGE_RETENUE).move_to(P(2.4, 0.0))
        self.play(FadeIn(q, scale=0.4), Indicate(h.barres[1], color=C_LUE), run_time=0.5)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.6)

    # ── 01 : le lycée, l'horloge, 50 élèves, les métiers ────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ly = lycee(0.95).move_to(P(-4.6, 1.75))
        hl = horloge(0.9).move_to(P(-1.85, 1.75))
        self.montre("Un lycée", FadeIn(ly, shift=UP * 0.2), rt=0.5)
        fl = CurvedArrow(P(-1.2, 2.45), P(-1.2, 1.1), angle=-PI * 0.8, color=AMBRE, stroke_width=4)
        self.montre("décaler l'heure", FadeIn(hl, scale=0.7), rt=0.4)
        self.play(Rotate(hl[-2], angle=-PI / 3, about_point=hl[0].get_center()), Create(fl), run_time=0.6)
        fo = foule().move_to(P(-3.5, -1.55))
        L1 = self.lc([("50 élèves", AMBRE)], 2.5, fs=40, xl=self.XR)
        self.jouer(L1, ["50 élèves"], {0: [LaggedStart(*[FadeIn(e, scale=0.5) for e in fo], lag_ratio=0.02)]})
        L2 = self.lc([("temps de trajet ?", WHITE)], 1.75, fs=38, xl=self.XR)
        self.jouer(L2, ["temps de trajet"])
        for y, nom, mot in ((0.75, "urbaniste", "L'urbaniste"), (0.0, "responsable des transports", "la responsable"),
                            (-0.75, "statisticien", "le statisticien")):
            t = self.t(nom, 30, WHITE).move_to(P(0, y)).align_to(P(self.XR + 0.35, 0), LEFT)
            puce = Dot(P(self.XR + 0.1, y), radius=0.08, color=AMBRE)
            self.montre(mot, FadeIn(puce, scale=0.5), FadeIn(t, shift=RIGHT * 0.15), rt=0.4)
        h = Histo(ox=self.XR + 0.1, oy=-3.0, L=2.2, H=1.05, nombres=False, noms=False)
        th = self.t("un histogramme", 30, C_BARRE).move_to(P(0, -1.6)).align_to(P(self.XR + 0.1, 0), LEFT)
        self.montre("un histogramme", FadeIn(h, shift=UP * 0.15), FadeIn(th, shift=RIGHT * 0.15), rt=0.5)
        self.attendre_voix()

    # ── 02 : la question du jour ────────────────────────────────────────────
    def ecran_question_du_jour(self):
        self.ecran("02-question-du-jour")
        fo = foule().move_to(P(-3.6, -0.6))
        hl = horloge(1.3, demi=True).move_to(P(-3.6, 1.8))
        self.add(fo)
        q = VGroup(self.t("Combien d'élèves", 46, ORANGE_RETENUE), self.t("mettent au moins", 46, ORANGE_RETENUE),
                   self.t("une demi-heure ?", 46, ORANGE_RETENUE)).arrange(DOWN, aligned_edge=LEFT, buff=0.2)
        q.move_to(P(0, 0.6)).align_to(P(self.XR + 0.2, 0), LEFT)
        self.montre("Combien", FadeIn(q[0], shift=UP * 0.15), rt=0.35)
        self.montre("mettent au moins", FadeIn(q[1], shift=UP * 0.15), rt=0.35)
        self.montre("une demi-heure", FadeIn(q[2], shift=UP * 0.15), FadeIn(hl, scale=0.7), rt=0.4)
        self.play(Circumscribe(q, color=AMBRE, buff=0.15), run_time=0.8)
        self.attendre_voix()

    # ── 03 : les classes, une barre par classe, collées ─────────────────────
    def ecran_classes(self):
        self.ecran("03-classes")
        h = Histo()
        self.montre("En bas", FadeIn(h.fond), rt=0.5)
        seg = [Line(h.p(10 * i, 0), h.p(10 * i + 10, 0), color=AMBRE, stroke_width=9) for i in range(5)]
        L0 = self.lc([("rangés par classes :", WHITE)], 2.55, fs=38, xl=self.XR)
        self.jouer(L0, ["rangés par classes"])
        L1 = self.lc([("[0 ; 10[", AMBRE), ("[10 ; 20[", AMBRE), ("…", AMBRE)], 1.85, fs=40, xl=self.XR + 0.3)
        self.jouer(L1, ["de 0 à 10", self.nieme("10", "minutes, de"), "et ainsi de suite"],
                   {0: [Create(seg[0])], 1: [Create(seg[1])], 2: [Create(s) for s in seg[2:]]})
        L2 = self.lc([("une barre", C_BARRE), ("par classe", WHITE)], 1.0, fs=40, xl=self.XR)
        self.jouer(L2, ["Une barre", self.nieme("par classe", "Une barre")],
                   {0: [LaggedStart(*[GrowFromEdge(b, DOWN) for b in h.barres], lag_ratio=0.15)]})
        jo = VGroup(*[Line(h.p(10 * i, 0), h.p(10 * i, min(EFF[i - 1], EFF[i])), color=C_LUE, stroke_width=7)
                      for i in range(1, 5)])
        L3 = self.lc([("collées :", C_LUE), ("sans trou", VERT_OK)], 0.1, fs=40, xl=self.XR)
        self.jouer(L3, ["se touchent", "sans trou"], {0: [LaggedStart(*[Create(j) for j in jo], lag_ratio=0.15)]})
        self.play(Create(self.cadre(L3[1])), run_time=0.3)
        self.attendre_voix()

    # ── 04 : la hauteur = l'effectif ────────────────────────────────────────
    def ecran_effectif(self):
        self.ecran("04-effectif")
        h = Histo()
        self.add(h)
        br = Brace(h.barres[1], RIGHT, buff=0.06, color=C_LUE)
        L1 = self.lc([("hauteur", C_LUE), ("=", WHITE), ("effectif", VERT_OK)], 2.4, fs=46, xl=self.XR)
        self.jouer(L1, ["La hauteur", None, "l'effectif"], {0: [GrowFromCenter(br)]})
        L2 = self.lc([("la barre", WHITE), ("[10 ; 20[", AMBRE)], 1.35, fs=40, xl=self.XR)
        self.jouer(L2, ["La barre", "de 10 à 20"], {1: h.focus([1])})
        tr, lu = h.vers_axe(1), h.lu(17)
        self.montre("monte jusqu'à 17", Create(tr), FadeIn(lu, scale=1.5), FadeOut(br), rt=0.3)
        L3 = self.lc([("17 élèves", VERT_OK)], 0.3, fs=44, xl=self.XR)
        L4 = self.lc([("entre 10", WHITE), ("et 20 minutes", WHITE)], -0.5, fs=38, xl=self.XR)
        self.jouer(VGroup(*L3, *L4), [("17", 2), self.nieme("entre 10", "17 élèves"), self.nieme("20", "entre 10")], run_time=0.25)
        self.play(Create(self.cadre(L3[0])), run_time=0.3)
        self.insister(lu, 1.4, 0.2)
        self.attendre_voix()

    # ── 05 : les bornes : [10 ; 20[ ────────────────────────────────────────
    def ecran_bornes(self):
        self.ecran("05-bornes")
        h = Histo()
        self.add(h)
        self.play(*h.focus([1]), run_time=0.3)
        bo = VGroup(self.t("[", 90, VERT_OK), self.t("10 ; 20", 72, WHITE), self.t("[", 90, ROUGE_ERREUR))
        bo.arrange(RIGHT, buff=0.12).move_to(P(3.3, 2.3))
        self.montre("La classe de 10", FadeIn(bo[1], scale=1.2), rt=0.4)
        f = Dot(h.p(10, 0), radius=0.11, color=VERT_OK)
        o = Circle(radius=0.11, color=ROUGE_ERREUR, stroke_width=5, fill_color=BLACK, fill_opacity=1).move_to(h.p(20, 0))
        c1 = self.t("10 compris", 34, VERT_OK).move_to(P(1.9, 1.15))
        c2 = VGroup(self.t("20", 34, ROUGE_ERREUR), self.t("non compris", 34, ROUGE_ERREUR)).arrange(RIGHT, buff=0.18)
        c2.move_to(P(4.5, 0.45))
        self.montre(self.nieme("10 compris", "20 :"), FadeIn(bo[0], scale=1.5), FadeIn(c1, shift=DOWN * 0.1),
                    FadeIn(f, scale=2), rt=0.3)
        self.montre("20 non compris", FadeIn(bo[2], scale=1.5), FadeIn(c2[0], shift=DOWN * 0.1), FadeIn(o, scale=2),
                    rt=0.25)
        self.montre("non compris", FadeIn(c2[1], shift=DOWN * 0.1), rt=0.25)
        el = eleve("#ec4899", 0.34).move_to(h.p(20, 0) + UP * 0.45)
        L3 = self.lc([("pile 20 min", AMBRE), ("→ barre suivante", WHITE)], -0.6, fs=36, xl=self.XR)
        self.jouer(L3, ["pile 20", "dans la barre suivante"], {0: [FadeIn(el, scale=0.5)],
                                                                1: [el.animate.move_to(h.barres[2].get_center()),
                                                                    *h.focus([2])]})
        self.play(Indicate(h.barres[2], color=C_LUE), run_time=0.5)
        self.attendre_voix()

    # ── 06 : QUESTION (B) : moins de 20 minutes ─────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        h = self.petit_histo()

        def avant(sc):
            sc.play(FadeIn(h), run_time=0.3)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["Moins de 20 min :", "deux barres."], fs=30)
            l1 = sc.ligne_rep(1, ["8", "+ 17", "= 25."], fs=30)
            l2 = sc.ligne_rep(2, ["A : une barre ;", "C : la borne 20."], fs=30)
            sc.montre("Moins de 20", FadeIn(l0[0], shift=UP * 0.15), rt=0.35)
            sc.montre("deux premières barres", FadeIn(l0[1], shift=UP * 0.15), *h.focus([0, 1]), rt=0.4)
            t8, t17 = h.haut(0, fs=22), h.haut(1, fs=22)
            sc.montre("8 plus", FadeIn(l1[0], shift=UP * 0.15), FadeIn(t8, scale=1.4), rt=0.3)
            sc.montre("17", FadeIn(l1[1], shift=UP * 0.15), FadeIn(t17, scale=1.4), rt=0.3)
            sc.montre("égale 25", FadeIn(l1[2], scale=1.3), rt=0.3)
            sc.montre("A ne prend", FadeIn(l2[0], shift=UP * 0.15), Create(sc.barrer_choix(0)), rt=0.35)
            sc.montre("et C", FadeIn(l2[1], shift=UP * 0.15), Create(sc.barrer_choix(2)), rt=0.35)
            sc.rep_fini()

        self.question_pause("06-question", "06b-reponse", ["Combien d'élèves mettent", "moins de 20 minutes ?"],
                            [self.t("17", 36), self.t("25", 36), self.t("20", 36)], 1,
                            ["Moins de 20 min : deux barres.", "8 + 17 = 25.", "A : une barre ; C : la borne 20."],
                            mot_q="Combien", avant_q=avant, autres_r=apres)

    # ── 07 : la fréquence ───────────────────────────────────────────────────
    def ecran_frequence(self):
        self.ecran("07-frequence")
        h = Histo()
        self.add(h)
        L0 = self.lc([("Fréquence", AMBRE)], 2.6, fs=46, xl=self.XR)
        self.jouer(L0, ["Une fréquence"])
        L1 = self.lc([("effectif de la classe", WHITE)], 1.8, fs=36, xl=self.XR)
        self.jouer(L1, ["l'effectif de la classe"], {0: h.focus([1])})
        L2 = self.lc([("÷ effectif total", WHITE)], 1.15, fs=36, xl=self.XR)
        self.jouer(L2, ["divisé par l'effectif total"])
        L3 = self.lc([("17", C_LUE), ("÷ 50", WHITE), ("= 0,34", VERT_OK)], 0.15, fs=46, xl=self.XR)
        self.jouer(L3, ["17 divisé", "50", "0,34"], {0: [Create(h.vers_axe(1)), FadeIn(h.lu(17), scale=1.4)]})
        pb = Rectangle(width=4.0, height=0.42, stroke_color=WHITE, stroke_width=2).move_to(P(0, -0.85))
        pb.align_to(P(self.XR, 0), LEFT)
        rem = Rectangle(width=4.0 * 0.34, height=0.42, fill_color=VERT_OK, fill_opacity=0.9, stroke_width=0)
        rem.align_to(pb, LEFT).set_y(pb.get_y())
        L4 = self.lc([("34 %", VERT_OK), ("des élèves", WHITE)], -1.55, fs=42, xl=self.XR)
        self.jouer(L4, ["34 %", "des élèves"], {0: [FadeIn(pb), GrowFromEdge(rem, LEFT)]})
        self.play(Create(self.cadre(L4[0])), run_time=0.3)
        self.attendre_voix()

    # ── 08 : le piège : 5 barres ≠ 50 élèves ────────────────────────────────
    def ecran_piege(self):
        self.ecran("08-piege")
        self.titre_haut("Attention au piège !", "Attention", couleur=ROUGE_ERREUR, fs=44)
        h = Histo(ox=-5.6, oy=-2.5, L=4.8, H=4.3)
        self.add(h)
        x = self.XR
        L1 = self.lc([("effectif total", AMBRE)], 2.3, fs=40, xl=x)
        self.jouer(L1, ["L'effectif total"])
        L1b = self.lc([("≠", ROUGE_ERREUR), ("nombre de barres", WHITE)], 1.65, fs=40, xl=x)
        self.jouer(L1b, ["ce n'est pas", "le nombre de barres"])
        L2 = self.lc([("5 barres", ROUGE_ERREUR), ("mais", WHITE), ("50 élèves", VERT_OK)], 0.85, fs=40, xl=x)
        self.jouer(L2, ["5 barres", None, "50 élèves"],
                   {0: [LaggedStart(*[Indicate(b, color=ROUGE_ERREUR) for b in h.barres], lag_ratio=0.15)]})
        L3 = self.lc([("on additionne", WHITE), ("les hauteurs", C_LUE)], 0.1, fs=38, xl=x)
        self.jouer(L3, ["on additionne", "les hauteurs"])
        L4 = self.lc([("8", WHITE), ("+ 17", WHITE), ("+ 12", WHITE), ("+ 9", WHITE), ("+ 4", WHITE),
                      ("= 50", VERT_OK)], -0.75, fs=40, xl=x)
        mots = ["8, 17", "17, 12", "12, 9", "9 et", "4 :", ("50", 2)]
        anims = {k: [FadeIn(h.haut(k, fs=24), scale=1.4), *h.focus([k], 0.5)] for k in range(5)}
        anims[5] = h.rallumer()
        self.jouer(L4, mots, anims)
        self.play(Create(self.cadre(L4[5])), run_time=0.3)
        self.attendre_voix()

    # ── 09 : QUESTION (A) : au moins 30 minutes ─────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        h = self.petit_histo()

        def avant(sc):
            sc.play(FadeIn(h), run_time=0.3)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["Deux dernières barres :", "9", "+ 4", "= 13."], fs=30)
            l1 = sc.ligne_rep(1, ["13", "÷ 50", "= 0,26", "= 26 %."], fs=30)
            l2 = sc.ligne_rep(2, ["B oublie ÷ 50 ;", "C : une barre."], fs=30)
            sc.montre("Les deux dernières", FadeIn(l0[0], shift=UP * 0.15), *h.focus([3, 4]), rt=0.4)
            t9, t4 = h.haut(3, fs=22), h.haut(4, fs=22)
            sc.montre("9 plus", FadeIn(l0[1], shift=UP * 0.15), FadeIn(t9, scale=1.4), rt=0.3)
            sc.montre("4, égale", FadeIn(l0[2], shift=UP * 0.15), FadeIn(t4, scale=1.4), rt=0.3)
            sc.montre("égale 13", FadeIn(l0[3], scale=1.3), rt=0.3)
            sc.montre("13 divisé", FadeIn(l1[0], shift=UP * 0.15), rt=0.3)
            sc.montre("50, égale", FadeIn(l1[1], shift=UP * 0.15), rt=0.3)
            sc.montre("0,26", FadeIn(l1[2], scale=1.3), rt=0.3)
            sc.montre("26 %", FadeIn(l1[3], scale=1.3), rt=0.3)
            sc.montre("B oublie", FadeIn(l2[0], shift=UP * 0.15), Create(sc.barrer_choix(1)), rt=0.35)
            sc.montre("et C", FadeIn(l2[1], shift=UP * 0.15), Create(sc.barrer_choix(2)), rt=0.35)
            sc.rep_fini()

        self.question_pause("09-question", "09b-reponse", ["Quelle part des élèves", "met au moins 30 minutes ?"],
                            [self.t("26 %", 36), self.t("13 %", 36), self.t("9 %", 36)], 0,
                            ["Deux dernières barres : 9 + 4 = 13.", "13 ÷ 50 = 0,26 = 26 %.",
                             "B oublie ÷ 50 ; C : une barre."],
                            mot_q="Quelle part", avant_q=avant, autres_r=apres)

    # ── 10 : défi ───────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        self.titre_haut("À toi de jouer !", "À toi de jouer", fs=50)
        h = Histo(ox=-5.6, oy=-2.5, L=4.8, H=4.3)
        self.add(h)
        x = self.XR
        L1 = self.lc([("1.", AMBRE), ("La classe la plus", WHITE)], 1.9, fs=36, xl=x)
        sans(L1[0])
        self.jouer(L1, ["Quelle est", "la classe la plus"])
        L1b = self.lc([("représentée ?", ORANGE_RETENUE)], 1.25, fs=36, xl=x + 0.45)
        self.jouer(L1b, ["représentée"], {0: [LaggedStart(*[Indicate(b, color=C_LUE) for b in h.barres],
                                                          lag_ratio=0.15)]})
        L2 = self.lc([("2.", AMBRE), ("Quelle part met", WHITE)], 0.35, fs=36, xl=x)
        sans(L2[0])
        self.jouer(L2, ["Et quelle", "quelle part"])
        L2b = self.lc([("entre 20 et 30 min ?", ORANGE_RETENUE)], -0.3, fs=36, xl=x + 0.45)
        self.jouer(L2b, ["entre 20"])
        self.pause_defi(y=-1.3)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        tit = sans(self.t("Correction", 50, JAUNE_TITRE)).move_to(P(-0.4, 3.1))
        h = Histo(ox=-5.6, oy=-2.5, L=4.8, H=4.3)
        self.add(tit, h)
        x = self.XR
        L1 = self.lc([("1.", AMBRE), ("la plus haute :", WHITE), ("[10 ; 20[", C_LUE)], 2.0, fs=38, xl=x)
        sans(L1[0])
        self.jouer(L1, ["La barre", "la plus haute", "de 10 à 20"], {1: h.focus([1])})
        L1b = self.lc([("17 élèves", VERT_OK)], 1.3, fs=38, xl=x + 0.45)
        self.jouer(L1b, ["17 élèves"], {0: [Create(h.vers_axe(1)), FadeIn(h.lu(17), scale=1.4)]})
        self.play(Create(self.cadre(L1b)), run_time=0.3)
        L2 = self.lc([("2.", AMBRE), ("[20 ; 30[ :", C_LUE), ("12 élèves", WHITE)], 0.3, fs=38, xl=x)
        sans(L2[0])
        self.jouer(L2, ["Entre 20", None, "12 élèves"],
                   {1: h.focus([2]), 2: [Create(h.vers_axe(2)), FadeIn(h.lu(12), scale=1.4)]})
        L3 = self.lc([("12", WHITE), ("÷ 50", WHITE), ("= 0,24", WHITE), ("= 24 %", VERT_OK)], -0.55, fs=40,
                     xl=x + 0.45)
        self.jouer(L3, ["12 divisé", "50, égale", "0,24", "24 %"])
        self.play(Create(self.cadre(L3[3])), run_time=0.3)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        h = Histo(ox=-5.9, oy=-2.3, L=3.6, H=3.4, nombres=False, noms=False)
        self.add(h)
        self.XL = -0.9  # figure plus petite : le texte gagne de la place (24/11)
        lignes = self.finale_colonne(figure=h, textes=[
            ("Une barre par classe ;", "sa hauteur donne l'effectif."),
            ("Effectif total : on additionne", "toutes les barres."),
            ("Fréquence : effectif de la classe", "÷ effectif total.")], fs=40)
        self.au_mot("Une barre")
        self.montrer_ligne(lignes[0], *h.focus([1], 0.5))
        self.au_mot("Pour l'effectif total")
        self.montrer_ligne(lignes[1], *h.rallumer())
        self.au_mot("La fréquence")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def nieme(self, extrait, ancre):
        """(extrait, n) : la première fois où la voix dit `extrait` APRÈS `ancre`."""
        v = self._texte_voix
        j = v.find(extrait, v.find(ancre))
        n, i = 0, -1
        while True:
            i = v.find(extrait, i + 1)
            if i < 0 or i > j:
                break
            n += 1
        return (extrait, n)

    def construct(self):
        for e in (self.page_de_garde, self.ecran_situation, self.ecran_question_du_jour, self.ecran_classes,
                  self.ecran_effectif, self.ecran_bornes, self.ecran_question1, self.ecran_frequence,
                  self.ecran_piege, self.ecran_question2, self.ecran_defi, self.ecran_correction,
                  self.ecran_finale):
            e()
        ecran_fin(self, "paysage", voix="12-abonne")


class GraphLyceeHistogrammePremiere(GraphLyceeHistogrammeBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "jaune"
