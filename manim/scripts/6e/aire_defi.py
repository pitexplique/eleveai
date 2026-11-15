# aire_defi.py
# EleveAI — Maths 6e — série « Aire » (lot A1-A4), épisode 04 : DÉFI D'AIRE (agrandir une figure)
# (micro aire_defi, notion aire_surface), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : 6e-aire-defi-short (pizza de 40 cm = 4 pizzas de 20 : A).
# Décor et métier : Théo, TECHNICIEN EN ÉNERGIES RENOUVELABLES (centres : technologie-ia, sciences).
# La 6e, un cran au-dessus du CM2 : les EFFETS D'UN AGRANDISSEMENT (une longueur doublée → aire × 2,
# les deux côtés doublés → aire × 4, périmètre × 2 seulement), et remonter de l'aire au côté.
# Mapping micro → écrans : aire_defi = 02 (toit 4 × 3 = 12 m², longueur doublée 8 × 3 = 24 m² : × 2),
# 03 (8 × 6 = 48 m² : × 4, le petit toit rangé 4 fois dans le grand, À L'ÉCHELLE),
# 04 (carré de 36 m² → côté 6 m ; rectangle de 24 m², largeur 4 m → 24 ÷ 4 = 6 m),
# 06 (piège : tour 14 → 28 m, × 2 ; aire 12 → 48 m², × 4), questions 05 (C : carré de 3 cm, côté doublé :
# 9 → 36 cm², × 4) et 07 (B : carré de 49 cm² → 7 cm), défi 08 (panneaux 2 × 1 sur un toit carré de 4 m :
# 8 panneaux ; côté doublé → 64 m², 32 panneaux, dessinés à l'échelle).
# Voix : manim/voix/6e-aire-defi.json (validée par Frédéric le 15/11, Julie, débit −6) ;
# marques : aire_defi_marques.json (python manim/scripts/6e/aire_surface_marques.py defi).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/aire_defi.py AireDefi6e
# python -m manim render -qh --disable_caching manim/scripts/6e/aire_defi.py AireDefi6e -o eleveai-maths-6e-aire-defi --media_dir manim/scripts/6e/media-aire6-04
# Sortie : manim/sorties/6e/maths/aire/04-defi/eleveai-maths-6e-aire-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_6e_commun import *  # noqa: E402,F403

COPIE_C, COPIE_B = "#a5b4fc", "#312e81"    # la copie du petit toit (indigo clair) dans le grand
TOIT_C, TOIT_B = "#cbd5e1", "#475569"      # le toit plat (béton gris), vu du ciel
PAN_C, PAN_B = "#1d4ed8", "#bfdbfe"        # un panneau solaire (cellules bleues, cadre clair)
TUILE_C, TUILE_B = "#ea580c", "#7c2d12"    # le toit de la maison (tuiles)
MUR_C, MUR_B = "#fde68a", "#78350f"        # le mur de la maison


def cote(mob, s, sens=LEFT, fs=30, couleur=JAUNE_TITRE, buff=0.18):
    """La mesure d'un côté, posée contre la figure (hors audit : un nombre déjà dit ou redit)."""
    return hors_audit(Text(s, font_size=fs, color=couleur, weight=BOLD).next_to(mob, sens, buff=buff))


def dedans(mob, s, fs=30, couleur="#0f172a"):
    """L'aire écrite au milieu de la figure (hors audit)."""
    return hors_audit(Text(s, font_size=fs, color=couleur, weight=BOLD).move_to(mob))


def plaque(n_col, n_rang, c, couleur, bord):
    """Une figure PLEINE (sans carreaux) de la taille de rect_cases(n_col, n_rang, c)."""
    return Rectangle(width=n_col * c, height=n_rang * c, fill_color=couleur, fill_opacity=1, stroke_color=bord,
                     stroke_width=3)


def double(n_col, n_rang, c, kx=2, ky=2):
    """Le grand rectangle (kx × n_col sur ky × n_rang carreaux), À L'ÉCHELLE, fait de copies du petit :
    les copies alternent bleu ciel / indigo. .blocs = les copies (rangée du haut d'abord)."""
    g = VGroup()
    blocs = VGroup()
    for by in range(ky):
        for bx in range(kx):
            col, bd = (CARREAU, CARREAU_B) if (bx + by) % 2 == 0 else (COPIE_C, COPIE_B)
            b = rect_cases(n_col, n_rang, c, col, bd).move_to(P((bx + 0.5) * n_col * c, -(by + 0.5) * n_rang * c))
            blocs.add(b)
            g.add(*b)
    g.blocs = blocs
    return g


def panneau(w, h, couleur=PAN_C, n_col=None, n_rang=None):
    """Un panneau solaire : le fond bleu, le cadre clair, la grille fine des cellules."""
    n_col = n_col or max(2, round(w / 0.25))
    n_rang = n_rang or max(2, round(h / 0.25))
    fond = Rectangle(width=w, height=h, fill_color=couleur, fill_opacity=1, stroke_color=PAN_B, stroke_width=3)
    traits = VGroup(*[Line(fond.get_corner(UL) + RIGHT * w * k / n_col, fond.get_corner(DL) + RIGHT * w * k / n_col,
                           stroke_color=PAN_B, stroke_width=1.2, stroke_opacity=0.55) for k in range(1, n_col)],
                    *[Line(fond.get_corner(UL) + DOWN * h * k / n_rang, fond.get_corner(UR) + DOWN * h * k / n_rang,
                           stroke_color=PAN_B, stroke_width=1.2, stroke_opacity=0.55) for k in range(1, n_rang)])
    return VGroup(fond, traits)


def maison(s=1.0, n_pan=2):
    """Une maison vue de côté, n_pan panneaux sur le toit."""
    mur = Rectangle(width=2.8 * s, height=1.5 * s, fill_color=MUR_C, fill_opacity=1, stroke_color=MUR_B,
                    stroke_width=3)
    porte = Rectangle(width=0.45 * s, height=0.8 * s, fill_color="#92400e", fill_opacity=1, stroke_width=0) \
        .align_to(mur, DOWN).shift(LEFT * 0.6 * s)
    fen = Square(0.45 * s, fill_color="#7dd3fc", fill_opacity=1, stroke_color=WHITE, stroke_width=3) \
        .move_to(mur.get_center() + P(0.6 * s, 0.1 * s))
    haut = mur.get_top()[1]
    t = Polygon(P(-1.75 * s, haut), P(1.75 * s, haut), P(1.05 * s, haut + 1.25 * s), P(-1.05 * s, haut + 1.25 * s),
                fill_color=TUILE_C, fill_opacity=1, stroke_color=TUILE_B, stroke_width=3)
    t.shift(RIGHT * mur.get_x())
    pans = VGroup(*[panneau(0.55 * s, 0.45 * s, n_col=3, n_rang=2) for _ in range(n_pan)]).arrange(RIGHT, buff=0.08 * s)
    pans.move_to(t.get_center())
    g = VGroup(mur, porte, fen, t, pans)
    g.pans = pans
    return g


def soleil(s=1.0):
    return VGroup(Circle(0.32 * s, fill_color="#facc15", fill_opacity=1, stroke_width=0),
                  *[Line(P(0.42 * s * np.cos(a), 0.42 * s * np.sin(a)), P(0.62 * s * np.cos(a), 0.62 * s * np.sin(a)),
                         stroke_color="#facc15", stroke_width=4) for a in np.linspace(0, 2 * PI, 9)[:-1]])


def pas_synchro(m):
    """Un libellé sans nombre (« Aire : ») posé avec le morceau suivant : il n'attend aucun mot."""
    for f in m.get_family():
        f.sans_synchro = True
    return m


class AireDefi6e(PaysageAire6eG):
    nom_voix = "6e-aire-defi"
    fichier_marques = "aire_defi_marques.json"
    ceinture = "bleue"

    # ── le toit du défi (08, 08b) : petit toit carré 4 × 4 dans le coin du grand 8 × 8, à l'échelle ──
    C_DEFI = 0.45

    def toit_defi(self):
        c = self.C_DEFI
        grand = Square(8 * c, stroke_color=JAUNE_TITRE, stroke_width=4, fill_opacity=0).move_to(P(-3.7, -0.85))
        petit = rect_cases(4, 4, c, TOIT_C, TOIT_B).align_to(grand, DL)
        return grand, petit

    def panneau_seul(self):
        c = self.C_DEFI
        return panneau(2 * c, c).move_to(P(-3.7, 2.2))

    @staticmethod
    def panneaux_sur(toit, c):
        """8 panneaux de 2 × 1 sur un toit de 4 × 4 carreaux : 4 rangées de 2."""
        pans = VGroup()
        for j in range(4):
            rg = VGroup(*[panneau(2 * c, c) for _ in range(2)]).arrange(RIGHT, buff=0)
            rg.move_to(toit.get_corner(UL) + P(2 * c, -(j + 0.5) * c))
            pans.add(rg)
        return pans

    def choix_2l(self, a, b, fs=28):
        """Un choix long sur deux lignes (sinon la carte le réduit en tout petit)."""
        g = VGroup(*[Text(x, font_size=fs, color=WHITE) for x in (a, b)]).arrange(DOWN, aligned_edge=LEFT, buff=0.04)
        for x in g:
            x._bloc = True
        return hors_audit(g)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Un défi d'aire", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Défi d'aire")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Que devient la surface", "quand on agrandit", "une figure ?"], 38)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        c = 0.3
        p = rect_cases(4, 3, c).move_to(P(2.0, 0.0))
        g = double(4, 3, c).move_to(P(4.6, 0.45))
        p.align_to(g, DOWN)
        self.au_mot("Que devient la surface")
        self.play(FadeIn(q[0], shift=UP * 0.2), LaggedStart(*[FadeIn(x, scale=1.5) for x in p], lag_ratio=0.02),
                  run_time=0.7)
        self.au_mot("quand on agrandit")
        self.play(FadeIn(q[1], shift=UP * 0.2), TransformFromCopy(p, g.blocs[2]), run_time=0.5)
        self.play(*[FadeIn(b, scale=0.8) for b in (g.blocs[0], g.blocs[1], g.blocs[3])], run_time=0.4)
        self.au_mot("une figure")
        qm = hors_audit(Text("?", font_size=44, color=JAUNE_TITRE, weight=BOLD)).next_to(g, UP, buff=0.15)
        self.play(FadeIn(q[2], shift=UP * 0.2), FadeIn(qm, scale=1.4), run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 01 : Théo, technicien en énergies renouvelables ─────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        th = theo(1.0).move_to(P(-5.2, 0.45))
        self.au_mot("Voici Théo")
        nom = self.t("Théo", 40, BLEU_CALCUL).next_to(th, UP, buff=0.2)
        self.play(FadeIn(th, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("technicien")
        met = self.bloc(["technicien en", "énergies", "renouvelables"], 26, BLEU_CALCUL).next_to(th, DOWN, buff=0.18)
        for m in met:
            m.set_x(th.get_x())
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        m1 = maison(0.8, 2).move_to(P(-1.3, 0.75))
        m2_ = maison(1.15, 5).move_to(P(2.75, 0.95)).align_to(m1, DOWN)
        so = soleil(0.9).move_to(P(5.3, 2.7))
        self.au_mot("panneaux solaires sur les toits")
        self.play(FadeIn(VGroup(*m1[:4]), shift=UP * 0.2), FadeIn(so, scale=0.6), run_time=0.5)
        self.play(LaggedStart(*[FadeIn(x, shift=DOWN * 0.2) for x in m1.pans], lag_ratio=0.3), run_time=0.45)
        self.au_mot("Plus la surface du toit est grande")
        l1 = self.t("Plus la surface du toit est grande,", 34, JAUNE_TITRE).move_to(P(0.6, -1.85))
        self.play(FadeIn(l1, shift=UP * 0.15), FadeIn(VGroup(*m2_[:4]), shift=UP * 0.2), run_time=0.5)
        self.au_mot("plus il peut poser de panneaux")
        l2 = self.t("plus il peut poser de panneaux.", 34, JAUNE_TITRE).move_to(P(0.6, -2.5))
        self.play(FadeIn(l2, shift=UP * 0.15),
                  LaggedStart(*[FadeIn(x, shift=DOWN * 0.2) for x in m2_.pans], lag_ratio=0.2), run_time=0.6)
        self.attendre_voix()

    # ── 02 : on double la longueur → l'aire double ──────────────────────────
    def ecran_longueur(self):
        self.ecran("02-doubler-longueur")
        c = 0.5
        p = rect_cases(4, 3, c).move_to(P(0, 1.55)).align_to(P(-5.4, 0), LEFT)
        g = double(4, 3, c, kx=2, ky=1).move_to(P(0, -1.3)).align_to(P(-5.4, 0), LEFT)
        self.au_mot("Un toit rectangulaire")
        self.play(LaggedStart(*[FadeIn(x, scale=1.4) for x in p], lag_ratio=0.02), run_time=0.6)
        self.au_mot("mesure 4")
        c4 = cote(p, "4 m", UP)
        self.play(FadeIn(c4, shift=DOWN * 0.1), run_time=0.3)
        self.au_mot("sur 3")
        c3 = cote(p, "3 m", LEFT)
        self.play(FadeIn(c3, shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("4 fois 3")
        l1 = self.ligne([("4 × 3", BLEU_D), ("= 12 m²", VERT_OK)], 40, buff=0.3)
        self.col(l1, 2.2)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("3, 12")
        a12 = dedans(p, "12 m²", 28)
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(a12, scale=1.2), run_time=0.35)
        self.au_mot("seulement la longueur")
        l2 = self.t("On double la longueur :", 36, JAUNE_TITRE)
        self.col(l2, 1.15)
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(c4, scale_factor=1.4), run_time=0.4)
        self.au_mot("8 mètres")
        c8 = cote(g, "8 m", UP)
        self.play(TransformFromCopy(p, g.blocs[0]), FadeIn(g.blocs[1], shift=RIGHT * 0.4), FadeIn(c8, shift=DOWN * 0.1),
                  run_time=0.3)
        self.au_mot("8 mètres sur 3")
        c3b = cote(g, "3 m", LEFT)
        l3 = self.ligne([("8 × 3", BLEU_D), ("= 24 m²", VERT_OK)], 40, buff=0.3)
        self.col(l3, 0.3)
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(c3b, shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("3 : 24")
        a24 = dedans(g, "24 m²", 34)
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(a24, scale=1.2), run_time=0.35)
        self.au_mot("L'aire double")
        res = self.gros("L'aire double !", fs=40)
        self.col(res, -0.8)
        self.play(FadeIn(res, scale=1.2), Indicate(g.blocs[0], color=WHITE, scale_factor=1.04),
                  Indicate(g.blocs[1], color=WHITE, scale_factor=1.04), run_time=0.5)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 03 : on double les deux côtés → l'aire × 4 ──────────────────────────
    def ecran_tout(self):
        self.ecran("03-doubler-tout")
        c = 0.42
        p = rect_cases(4, 3, c).move_to(P(-4.55, 2.0))
        g = double(4, 3, c).move_to(P(-3.7, -1.15))
        p.align_to(g, LEFT)
        c4, c3 = cote(p, "4 m", UP, 28), cote(p, "3 m", LEFT, 28)
        self.add(p, c4, c3)
        self.au_mot("la longueur ET la largeur")
        l1 = self.bloc(["On double la longueur", "ET la largeur :"], 34, JAUNE_TITRE)
        self.col(l1, 2.45)
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(c4, scale_factor=1.4), run_time=0.35)
        self.play(FadeIn(l1[1], shift=UP * 0.1), Indicate(c3, scale_factor=1.4), run_time=0.35)
        self.au_mot("8 mètres")
        c8 = cote(g, "8 m", UP, 28)
        self.play(TransformFromCopy(p, g.blocs[0]), FadeIn(c8, shift=DOWN * 0.1), run_time=0.2)
        self.au_mot("8 mètres sur 6")
        c6 = cote(g, "6 m", LEFT, 28)
        l2 = self.ligne([("8 × 6", BLEU_D), ("= 48 m²", VERT_OK)], 40, buff=0.3)
        self.col(l2, 1.3)
        self.play(FadeIn(g.blocs[1], shift=RIGHT * 0.3), FadeIn(g.blocs[2], shift=DOWN * 0.3),
                  FadeIn(g.blocs[3], shift=DR * 0.3), FadeIn(c6, shift=RIGHT * 0.1), FadeIn(l2[0], shift=UP * 0.1),
                  run_time=0.25)
        self.au_mot("6 : 48")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("L'aire n'est pas doublée")
        l3 = self.t("L'aire n'est pas doublée :", 34, GRAY_B)
        self.col(l3, 0.65)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        self.au_mot("multipliée par 4")
        res = self.gros("multipliée par 4 !", fs=32)
        self.col(res, -0.1)
        self.play(FadeIn(res, scale=1.2), run_time=0.4)
        self.insister(res, 1.1, 0.25)
        self.au_mot("Dans le grand toit")
        l4 = self.t("Dans le grand toit,", 34, WHITE)
        self.col(l4, -0.9)
        self.play(FadeIn(l4, shift=UP * 0.1), Indicate(g, color=WHITE, scale_factor=1.03), run_time=0.4)
        self.au_mot("on range 4")
        l5 = self.t("on range 4 fois le petit.", 34, WHITE)
        self.col(l5, -1.45)
        nums = hors_audit(VGroup(*[Text(str(k + 1), font_size=44, color="#0f172a", weight=BOLD).move_to(b)
                                   for k, b in enumerate(g.blocs)]))
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.3)
        self.play(LaggedStart(*[FadeIn(n, scale=1.5) for n in nums], lag_ratio=0.3),
                  LaggedStart(*[Indicate(b, color=WHITE, scale_factor=1.05) for b in g.blocs], lag_ratio=0.3),
                  run_time=1.0)
        self.attendre_voix()

    # ── 04 : dans l'autre sens, de l'aire au côté ───────────────────────────
    def ecran_cote(self):
        self.ecran("04-cote-cache")
        c = 0.38
        f = plaque(6, 6, c, CARREAU, CARREAU_B).move_to(P(-3.9, 1.35))
        k = rect_cases(6, 6, c).move_to(f)
        r = plaque(6, 4, c, COPIE_C, COPIE_B).move_to(P(-3.9, -1.75))
        rg = rect_cases(6, 4, c, COPIE_C, COPIE_B).move_to(r)
        xl = 0.0
        self.au_mot("l'autre sens")
        l0 = self.t("Dans l'autre sens :", 38, JAUNE_TITRE)
        self.col(l0, 2.9, xl)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        self.au_mot("Un toit carré")
        l1 = self.ligne([("Toit carré :", WHITE), ("36 m²", VERT_OK)], 34)
        self.col(l1, 2.3, xl)
        a36 = dedans(f, "36 m²", 36)
        q1, q2 = cote(f, "?", UP, 34), cote(f, "?", LEFT, 34)
        self.play(FadeIn(f, scale=0.9), FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("aire de 36")
        self.play(FadeIn(a36), FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(q1, scale=1.4), FadeIn(q2, scale=1.4), run_time=0.3)
        self.au_mot("Quel nombre")
        l2 = self.t("Quel nombre, fois lui-même,", 32, GRAY_B)
        self.col(l2, 1.7, xl)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.au_mot("donne 36")
        l2b = self.t("donne 36 ?", 32, GRAY_B)
        for x in l2b.get_family():
            x._pas_audit = True  # 36 redit
        self.col(l2b, 1.2, xl)
        self.play(FadeIn(l2b, shift=UP * 0.1), run_time=0.3)
        self.au_mot("6 fois 6")
        l3 = self.ligne([("6 × 6", BLEU_D), ("→ côté : 6 m", VERT_OK)], 38, buff=0.3)
        self.col(l3, 0.55, xl)
        c6h, c6g = cote(f, "6 m", UP, 30, CARREAU), cote(f, "6 m", LEFT, 30, CARREAU)
        self.play(FadeIn(l3[0], scale=1.2), FadeOut(a36), FadeIn(k), Transform(q1, c6h), Transform(q2, c6g),
                  run_time=0.4)
        self.au_mot("mesure 6")
        self.play(FadeIn(l3[1], shift=UP * 0.1), Indicate(k, color=VERT_OK, scale_factor=1.04), run_time=0.4)
        self.au_mot("rectangulaire de 24")
        l4 = self.ligne([("Toit rectangulaire :", WHITE), ("24 m²", VERT_OK)], 32)
        self.col(l4, -0.3, xl)
        a24 = dedans(r, "24 m²", 34)
        lq = cote(r, "? m", UP, 30)
        self.play(FadeIn(r, scale=0.9), FadeIn(a24), FadeIn(l4, shift=UP * 0.1), FadeIn(lq, scale=1.3), run_time=0.45)
        self.au_mot("largeur de 4")
        l5 = self.ligne([("largeur :", WHITE), ("4 m", ORANGE_RETENUE)], 32)
        self.col(l5, -0.85, xl)
        c4 = cote(r, "4 m", LEFT, 30, ORANGE_RETENUE)
        self.play(FadeIn(l5, shift=UP * 0.1), FadeIn(c4, shift=RIGHT * 0.1), run_time=0.35)
        self.au_mot("24 divisé par 4")
        l6 = self.ligne([("24 ÷ 4", BLEU_D), ("= 6 m", VERT_OK), ("de long", VERT_OK)], 38, buff=0.25)
        self.col(l6, -1.55, xl)
        self.play(FadeIn(l6[0], scale=1.2), run_time=0.3)
        self.au_mot("par 4, 6")
        c6 = cote(r, "6 m", UP, 30, CARREAU)
        self.play(FadeIn(l6[1], shift=UP * 0.1), FadeOut(a24), FadeIn(rg), Transform(lq, c6), run_time=0.3)
        self.au_mot("de long")
        self.play(FadeIn(l6[2], shift=UP * 0.1), run_time=0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        c = 0.36
        g = double(3, 3, c).move_to(P(-3.0, 1.25))
        p = rect_cases(3, 3, c).next_to(g, LEFT, buff=0.9).align_to(g, DOWN)
        cadre = DashedVMobject(Square(6 * c, stroke_color=JAUNE_TITRE, stroke_width=4).move_to(g), num_dashes=28)
        c3 = cote(p, "3 cm", UP, 26)
        qm = cote(cadre, "?", UP, 34)

        def autres_q(sc):
            sc.play(FadeIn(p, scale=0.9), FadeIn(c3), run_time=0.35)
            sc.play(Create(cadre), FadeIn(qm, scale=1.3), run_time=0.4)

        def apres(sc):
            sc.rep(0, avec=[Indicate(p, color=WHITE, scale_factor=1.08)])
            c6 = cote(g, "6 cm", UP, 26)
            sc.rep(1, avec=[FadeIn(g), FadeOut(cadre), Transform(qm, c6)])
            sc.rep_fin()

        self.question_gauche("05-question", "05b-reponse",
                             ["Un carré a 3 cm de côté.", "On double son côté.", "Que devient son aire ?"],
                             [self.choix("elle double"), self.choix("elle ne change pas"),
                              self.choix_2l("elle est multipliée", "par 4")], 2,
                             ["Avant : 3 × 3 = 9 cm².", "Après : 6 × 6 = 36 cm².", "Et 36 = 9 × 4."],
                             -0.05, mot_q="Un carré", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège (périmètre × 2, aire × 4) ─────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        c = 0.32
        p = rect_cases(4, 3, c).move_to(P(-4.9, 1.3))
        g = double(4, 3, c).move_to(P(-4.25, -1.3))
        p.align_to(g, LEFT)
        xl = -1.3
        self.add(p, g)
        self.au_mot("double les côtés")
        l1 = self.t("On double les côtés :", 36, JAUNE_TITRE)
        self.col(l1, 2.05, xl)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("le périmètre double")
        l2 = self.t("le périmètre double,", 34, PLINTHE)
        self.col(l2, 1.45, xl)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.au_mot("mais l'aire")
        l3 = self.ligne([("mais l'aire est", CARREAU), ("× 4 !", CARREAU)], 34)
        self.col(l3, 0.85, xl)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("multipliée par 4")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("4 sur 3")
        c4, c3 = cote(p, "4 m", UP, 26), cote(p, "3 m", LEFT, 26)
        self.play(FadeIn(c4), FadeIn(c3), Indicate(p, color=WHITE, scale_factor=1.05), run_time=0.35)
        self.au_mot("tour de 14")
        l4 = self.ligne([("Tour : 14 m", PLINTHE), ("→ 28 m", PLINTHE), ("(× 2)", PLINTHE)], 36, buff=0.25)
        self.col(l4, -0.05, xl)
        t1 = contour(p, PLINTHE, 7)
        self.play(FadeIn(l4[0], shift=UP * 0.1), Create(t1), run_time=0.45)
        self.au_mot("8 sur 6")
        c8, c6 = cote(g, "8 m", UP, 26), cote(g, "6 m", LEFT, 26)
        self.play(FadeIn(c8), FadeIn(c6), Indicate(g, color=WHITE, scale_factor=1.03), run_time=0.35)
        self.au_mot("tour de 28")
        t2 = contour(g, PLINTHE, 7)
        self.play(FadeIn(l4[1], shift=UP * 0.1), Create(t2), run_time=0.45)
        self.au_mot("2 fois plus")
        self.play(FadeIn(l4[2], scale=1.3), run_time=0.3)
        self.au_mot("Mais 12")
        l5 = self.ligne([("Aire :", CARREAU), ("12 m²", CARREAU), ("→ 48 m²", CARREAU), ("(× 4)", CARREAU)], 36,
                        buff=0.25)
        pas_synchro(l5[0])
        self.col(l5, -0.75, xl)
        a12 = m2("12 m²", 28, CARREAU).next_to(p, RIGHT, buff=0.2)
        self.play(FadeIn(l5[0], shift=UP * 0.1), FadeIn(l5[1], shift=UP * 0.1), FadeIn(a12, scale=1.2), run_time=0.35)
        self.au_mot("deviennent 48")
        a48 = dedans(g, "48 m²", 34)
        self.play(FadeIn(l5[2], shift=UP * 0.1), FadeIn(a48, scale=1.2), run_time=0.35)
        self.au_mot("4 fois plus")
        self.play(FadeIn(l5[3], scale=1.3),
                  LaggedStart(*[Indicate(b, color=WHITE, scale_factor=1.05) for b in g.blocs], lag_ratio=0.2),
                  run_time=0.6)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        c = 0.25
        f = plaque(7, 7, c, CARREAU, CARREAU_B).move_to(P(-3.7, 1.25))
        g = rect_cases(7, 7, c).move_to(f)
        a = dedans(f, "49 cm²", 30)
        qm = cote(f, "?", UP, 34)

        def autres_q(sc):
            sc.play(FadeIn(f, scale=0.9), FadeIn(a), FadeIn(qm), run_time=0.35)

        def apres(sc):
            c7 = cote(f, "7 cm", UP, 28, CARREAU)
            sc.play(FadeOut(a), FadeIn(g), Transform(qm, c7), run_time=0.4)

        self.question_gauche("07-question", "07b-reponse",
                             ["Un carré a une aire", "de 49 cm².", "Combien mesure son côté ?"],
                             [self.choix("12,25 cm"), self.choix("7 cm"), self.choix("24,5 cm")], 1,
                             ["On cherche : ? × ? = 49", "7 × 7 = 49.", "Le côté mesure 7 cm."],
                             -0.05, sans_audit=(0, 2), couper={1: ("7 × 7", "= 49.")}, mot_q="Un carré",
                             autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi (combien de panneaux ? et si le côté doublait ?) ──────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        c = self.C_DEFI
        grand, petit = self.toit_defi()
        pa = self.panneau_seul()
        xl = 0.3
        self.au_mot("Un panneau solaire")
        l0 = self.ligne([("Un panneau :", GRAY_B), ("2 m", WHITE), ("sur 1 m", WHITE)], 32)
        self.col(l0, 2.35, xl)
        c2 = cote(pa, "2 m", UP, 26)
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(pa, scale=0.8), run_time=0.35)
        self.au_mot("mesure 2")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(c2), run_time=0.25)
        self.au_mot("sur 1")
        c1 = cote(pa, "1 m", LEFT, 26)
        self.play(FadeIn(l0[2], shift=UP * 0.1), FadeIn(c1), run_time=0.25)
        self.au_mot("un toit carré")
        l1 = self.ligne([("Toit carré :", GRAY_B), ("4 m", WHITE), ("de côté", WHITE)], 32)
        self.col(l1, 1.75, xl)
        c4h, c4g = cote(petit, "4 m", UP, 28), cote(petit, "4 m", LEFT, 28)
        self.play(FadeIn(l1[0], shift=UP * 0.1), LaggedStart(*[FadeIn(q, scale=1.3) for q in petit], lag_ratio=0.02),
                  run_time=0.4)
        self.au_mot("carré de 4")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(c4h), FadeIn(c4g), run_time=0.25)
        self.au_mot("de côté")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.2)
        self.au_mot("Combien de panneaux")
        q = self.bloc(["Combien de panneaux,", "au maximum ?"], 36, JAUNE_TITRE)
        self.col(q, 0.8, xl)
        self.play(FadeIn(q[0], shift=UP * 0.1), Wiggle(pa), run_time=0.45)
        self.au_mot("au maximum")
        self.play(FadeIn(q[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("le côté du toit doublait")
        q2 = self.bloc(["Et si le côté", "du toit doublait ?"], 34, JAUNE_TITRE)
        self.col(q2, -0.4, xl)
        qm = cote(grand, "?", UP, 36)
        self.play(FadeIn(q2, shift=UP * 0.1), Create(DashedVMobject(grand, num_dashes=48)), FadeIn(qm, scale=1.4),
                  run_time=0.5)
        self.au_mot("Mets pause")
        pz = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        self.col(pz, -1.5, xl)
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        c = self.C_DEFI
        grand, petit = self.toit_defi()
        pa = self.panneau_seul()
        c2, c1 = cote(pa, "2 m", UP, 26), cote(pa, "1 m", LEFT, 26)
        c4h, c4g = cote(petit, "4 m", UP, 28), cote(petit, "4 m", LEFT, 28)
        self.add(pa, c2, c1, petit, c4h, c4g)
        xl = 0.3
        self.au_mot("Le toit : 4 fois 4")
        l0 = self.ligne([("Le toit :", GRAY_B), ("4 × 4", BLEU_D), ("= 16 m²", VERT_OK)], 32, buff=0.22)
        self.col(l0, 2.3, xl)
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(l0[1], shift=UP * 0.1),
                  Indicate(petit, color=WHITE, scale_factor=1.04), run_time=0.2)
        self.au_mot("4, 16")
        self.play(FadeIn(l0[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Un panneau : 2 fois 1")
        l1 = self.ligne([("Un panneau :", GRAY_B), ("2 × 1", BLEU_D), ("= 2 m²", VERT_OK)], 32, buff=0.22)
        self.col(l1, 1.7, xl)
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(l1[1], shift=UP * 0.1),
                  Indicate(pa, color=WHITE, scale_factor=1.1), run_time=0.35)
        self.au_mot("1, 2")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("16 divisé par 2")
        l2 = self.ligne([("16 ÷ 2", BLEU_D), ("= 8 panneaux,", VERT_OK)], 36, buff=0.2)
        self.col(l2, 1.05, xl)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("8 panneaux")
        pans = self.panneaux_sur(petit, c)
        self.play(FadeIn(l2[1], shift=UP * 0.1),
                  LaggedStart(*[FadeIn(x, shift=DOWN * 0.15) for rg in pans for x in rg], lag_ratio=0.12),
                  run_time=0.55)
        self.au_mot("en 4 rangées")
        l3 = self.ligne([("en 4 rangées", VERT_OK), ("de 2.", VERT_OK)], 34)
        self.col(l3, 0.5, xl)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("rangées de 2")
        self.play(FadeIn(l3[1], shift=UP * 0.1),
                  LaggedStart(*[Indicate(rg, color=JAUNE_TITRE, scale_factor=1.05) for rg in pans], lag_ratio=0.2),
                  run_time=0.7)
        self.au_mot("le côté double")
        l4 = self.ligne([("Côté doublé :", GRAY_B), ("8 m", WHITE)], 34)
        self.col(l4, -0.15, xl)
        self.play(FadeIn(l4[0], shift=UP * 0.1), Create(grand), FadeOut(c4h), run_time=0.4)
        self.au_mot("double, 8")
        c8h, c8g = cote(grand, "8 m", UP, 28), cote(grand, "8 m", LEFT, 28)
        un = VGroup(petit, pans)
        copies = VGroup(*[un.copy() for _ in range(3)])
        for cp, d in zip(copies, (UP, UP + RIGHT, RIGHT)):
            cp.shift(d * 4 * c)
        self.play(FadeIn(l4[1], shift=UP * 0.1), Transform(c4g, c8g), FadeIn(c8h), run_time=0.35)
        self.play(*[TransformFromCopy(un, cp) for cp in copies], run_time=0.7)
        self.bring_to_front(grand)
        self.au_mot("multipliée par 4")
        l5 = self.ligne([("aire × 4", CARREAU), ("= 64 m²", VERT_OK)], 34, buff=0.25)
        self.col(l5, -0.75, xl)
        self.play(FadeIn(l5[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("4, 64")
        self.play(FadeIn(l5[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("donc 32")
        res = self.gros("32 panneaux", fs=44)
        self.col(res, -1.55, xl)
        tous = VGroup(*pans, *[cp[1] for cp in copies])
        self.play(FadeIn(res, scale=1.2), Indicate(tous, color=JAUNE_TITRE, scale_factor=1.03), run_time=0.5)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        c = 0.25
        p = rect_cases(4, 3, c)
        lg = double(4, 3, c, kx=2, ky=1)
        tout = double(4, 3, c)
        fig = VGroup(p, lg, tout).arrange(DOWN, buff=0.35, aligned_edge=LEFT)
        lignes = self.finale_gauche(fig, textes=[
            ("Doubler un seul côté", "double l'aire."),
            ("Doubler tous les côtés", "multiplie l'aire par 4."),
            ("Le côté d'un carré : le nombre", "qui, fois lui-même, donne l'aire.")], fs=32)
        self.add(fig)
        self.au_mot("Doubler un seul")
        self.montrer_ligne(lignes[0], Indicate(lg, scale_factor=1.05))
        self.au_mot("Doubler tous")
        self.montrer_ligne(lignes[1], Indicate(tout, scale_factor=1.05))
        self.au_mot("pour retrouver")
        self.montrer_ligne(lignes[2], Indicate(p, scale_factor=1.08))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_longueur()
        self.ecran_tout()
        self.ecran_cote()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
