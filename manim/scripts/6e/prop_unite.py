# prop_unite.py
# EleveAI — Maths 6e — série « Proportionnalité », lot 1, épisode 04 :
# PASSER PAR L'UNITÉ (micro du coach : prop_unite, « Passer par l'unité »,
# notion prop_proportionnalite), AVEC VOIX. Paysage 16:9, CEINTURE VERTE (la
# paysage complète du niveau : situation, méthode en deux étapes ÷ puis ×,
# piège « + 2 g », 2 questions-pauses, défi corrigé). Short jumeau :
# prop_unite_short.py (blanche).
# ⭐ Méthode travaillée : le PASSAGE PAR L'UNITÉ (figure Unite du module :
# 4 → 1 → 6 avec « ÷ 4 » puis « × 6 » sur les personnes ET sur les grammes) ;
# les 4 parts du gâteau qui se ramènent à 1 part, puis 6 parts.
# ⛔ Pas de produit en croix (6e) ; « ÷ » pour une division.
# ⭐ Leurres (consigne-videos-proportionnalite.md) : 1. ajouter au lieu de
# multiplier (piège 202 g ; question 2 : 13 € = 9 + 4 ; question 1 : 10 € =
# 15 − 5) ; 3. inverser / mauvaise ligne (question 1 : 75 € = 15 × 5 ;
# question 2 : 63 € = 9 × 7).
#
# Décor et métier : CUISINE, Yanis, PÂTISSIER (recette pour 4 → pour 6 :
# 200 g de farine → 50 g pour 1 → 300 g) ; mangues (question 1) ; cahiers
# (question 2) ; crêpes et lait (défi : 400 mL pour 8 → 50 mL → 500 mL pour 10).
# Centres d'intérêt : cuisine.
# Données : recette et prix fictifs, à l'ordre de grandeur réel (≈ 50 g de
# farine par part de gâteau ; ≈ 50 mL de lait par crêpe) : aucun chiffre du
# monde réel n'est cité, pas de source à donner.
#
# Micro → écrans : situation (01), pourquoi l'unité (02), diviser pour revenir
# à 1 (03), multiplier pour le nombre voulu (04), les deux étapes (05),
# QUESTION 1 (06, trouver la valeur pour 1), piège + 2 g (07), QUESTION 2 (08,
# deux étapes), défi (09) et correction (09b), ce que tu as appris (10), fin (11).
# Écrans : 00 garde · 01 Yanis, la recette · 02 ni double ni moitié · 03 ÷ 4 ·
# 04 × 6 · 05 deux étapes · 06 QUESTION 1 (mangues) · 07 piège 202 g ·
# 08 QUESTION 2 (cahiers) · 09 défi crêpes · 09b correction · 10 ce que tu as
# appris · 11 fin.
#
# Voix : manim/voix/6e-prop-unite.json (validée par Frédéric, débit −10),
# WAV dans public/sons/6e-prop-unite/ ; marques mot à mot :
# manim/scripts/6e/prop_unite_marques.json (scripts/marques_dump.ps1 puis
# scripts/cues2marques.py).
# Outils : prop_commun.py + manim/canvas_proportion.py (Unite, TableauProp).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/prop_unite.py PropUnite6e
# python -m manim render -qh --disable_caching manim/scripts/6e/prop_unite.py PropUnite6e -o eleveai-maths-6e-prop-unite --media_dir manim/scripts/6e/media-prop-unite
# Sortie : manim/sorties/6e/maths/proportionnalite/04-unite/eleveai-maths-6e-prop-unite.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403

PATE = "#f5c27a"      # le biscuit du gâteau
CREME = "#fff7ed"     # la crème
CERISE = "#dc2626"
FARINE = "#d6b88a"    # le sac kraft
ORANGE_MANGUE = "#fb923c"


def ss(u):
    """Les Text d'une figure Unite n'attendent pas leurs MOTS (« cahiers » dit
    plus loin retardait tout) : la scène les pose elle-même au mot (au_mot) ;
    l'AUDIT des NOMBRES, lui, les contrôle toujours."""
    for f in u.get_family():
        if isinstance(f, Text):
            f.sans_synchro = True
    return u


def toque(p):
    """Une toque blanche de pâtissier sur la tête du personnage p."""
    c = p.tete.get_center()
    r = p.tete.width / 2
    bande = RoundedRectangle(width=r * 1.9, height=r * 0.45, corner_radius=0.05, fill_color=WHITE, fill_opacity=1,
                             stroke_width=0).move_to(c + UP * r * 0.95)
    bouffe = VGroup(*[Circle(radius=r * 0.48, fill_color=WHITE, fill_opacity=1, stroke_width=0)
                      .move_to(c + UP * r * 1.55 + RIGHT * x * r) for x in (-0.5, 0, 0.5)])
    return VGroup(bouffe, bande)


def yanis(s=1.0):
    """Yanis, pâtissier : veste blanche à boutons, toque, tablier bleu."""
    p = personne(peau="#8d5524", tenue="#f8fafc", cheveux="#111827", s=s)
    cb = p.corps.get_bottom()
    tablier = RoundedRectangle(width=0.9 * s, height=0.85 * s, corner_radius=0.08 * s, fill_color="#1d4ed8",
                               fill_opacity=1, stroke_width=0).move_to(cb + UP * 0.45 * s)
    boutons = VGroup(*[Dot(radius=0.04 * s, color="#94a3b8").move_to(p.corps.get_center() + P(x * s, y * s))
                       for x in (-0.12, 0.12) for y in (0.45, 0.25)])
    p.add(tablier, boutons, toque(p))
    return p


def part(r=0.9, angle=PI / 2, debut=PI / 2):
    """Une part de gâteau (biscuit, bord de crème, cerise) : secteur de `angle`."""
    s = AnnularSector(inner_radius=0, outer_radius=r, angle=-angle, start_angle=debut, fill_color=PATE,
                      fill_opacity=1, stroke_color="#7c4a1e", stroke_width=3)
    bord = Arc(radius=r * 0.93, start_angle=debut, angle=-angle, stroke_color=CREME, stroke_width=7)
    milieu = debut - angle / 2
    cer = Circle(radius=r * 0.1, fill_color=CERISE, fill_opacity=1, stroke_width=0).move_to(
        r * 0.62 * np.array([np.cos(milieu), np.sin(milieu), 0]))
    return VGroup(s, bord, cer)


def gateau(n=4, r=0.9, centre=ORIGIN):
    """Un gâteau rond coupé en n parts ; .parts[i]."""
    g = VGroup(*[part(r, TAU / n, PI / 2 - i * TAU / n) for i in range(n)])
    g.parts = g
    return g.move_to(centre)


def assiette(r=0.22):
    return VGroup(Ellipse(width=2 * r, height=r * 1.1, fill_color=WHITE, fill_opacity=1, stroke_color="#94a3b8",
                          stroke_width=2),
                  Ellipse(width=1.2 * r, height=r * 0.62, stroke_color="#cbd5e1", stroke_width=2))


def assiettes(n, r=0.22):
    return VGroup(*[assiette(r) for _ in range(n)]).arrange(RIGHT, buff=0.1)


def sac_farine(h=1.1):
    """Un sac de farine en papier kraft, le mot FARINE dessus (sans nombre)."""
    corps = Polygon(P(-0.42, -0.55), P(0.42, -0.55), P(0.36, 0.42), P(-0.36, 0.42), fill_color=FARINE,
                    fill_opacity=1, stroke_color="#78350f", stroke_width=2)
    pli = Polygon(P(-0.36, 0.42), P(0.36, 0.42), P(0.3, 0.58), P(-0.3, 0.58), fill_color="#b08d57",
                  fill_opacity=1, stroke_width=0)
    epi = Text("FARINE", font_size=18, color="#78350f", weight=BOLD).scale_to_fit_width(0.6).move_to(P(0, -0.05))
    epi.sans_synchro = epi._pas_audit = True  # décor : n'attend pas le mot « farine »
    return VGroup(corps, pli, epi).scale(h / 1.13)


def mangue(r=0.3):
    corps = Ellipse(width=2.1 * r, height=1.55 * r, fill_color=ORANGE_MANGUE, fill_opacity=1,
                    stroke_color="#9a3412", stroke_width=2).rotate(0.35)
    rouge = Ellipse(width=1.0 * r, height=0.8 * r, fill_color="#f43f5e", fill_opacity=0.6,
                    stroke_width=0).move_to(corps.get_center() + P(0.35 * r, 0.25 * r))
    feuille = Ellipse(width=0.9 * r, height=0.35 * r, fill_color="#22c55e", fill_opacity=1,
                      stroke_width=0).rotate(-0.5).move_to(corps.get_center() + P(-0.55 * r, 0.75 * r))
    return VGroup(corps, rouge, feuille)


def cahier(couleur="#38bdf8", l=0.8, h=1.05):
    """Un cahier : couverture, spirale, étiquette blanche."""
    couv = RoundedRectangle(width=l, height=h, corner_radius=0.06, fill_color=couleur, fill_opacity=1,
                            stroke_color=WHITE, stroke_width=2)
    spir = VGroup(*[Circle(radius=0.035, stroke_color="#e2e8f0", stroke_width=2)
                    .move_to(couv.get_left() + P(0.06, h / 2 - 0.12 - i * (h - 0.24) / 6)) for i in range(7)])
    eti = Rectangle(width=l * 0.55, height=h * 0.2, fill_color=WHITE, fill_opacity=1, stroke_width=0)
    return VGroup(couv, spir, eti.move_to(couv.get_center() + UP * h * 0.15))


def crepe(r=0.55):
    """Une crêpe vue de dessus : disque doré, taches dorées."""
    d = Circle(radius=r, fill_color="#fcd34d", fill_opacity=1, stroke_color="#b45309", stroke_width=3)
    taches = VGroup(*[Circle(radius=r * k, fill_color="#d97706", fill_opacity=0.55, stroke_width=0)
                      .move_to(P(x * r, y * r)) for x, y, k in ((-0.4, 0.2, 0.12), (0.3, 0.35, 0.09),
                                                                (0.1, -0.4, 0.13), (0.45, -0.15, 0.08))])
    return VGroup(d, taches)


def pile_crepes(n, l=1.6):
    """Une pile de n crêpes vue de côté (assiette dessous)."""
    a = Ellipse(width=l * 1.25, height=0.3, fill_color=WHITE, fill_opacity=1, stroke_color="#94a3b8",
                stroke_width=2)
    cs = VGroup(*[Ellipse(width=l * (1 - 0.02 * (i % 2)), height=0.2, fill_color="#fcd34d", fill_opacity=1,
                          stroke_color="#b45309", stroke_width=2).move_to(P(0.03 * ((-1) ** i), 0.08 + 0.1 * i))
                  for i in range(n)])
    return VGroup(a, cs)


def bouteille_lait(h=1.5):
    corps = RoundedRectangle(width=0.62, height=1.0, corner_radius=0.12, fill_color=WHITE, fill_opacity=1,
                             stroke_color="#94a3b8", stroke_width=2)
    col = Polygon(P(-0.31, 0.45), P(0.31, 0.45), P(0.13, 0.75), P(-0.13, 0.75), fill_color=WHITE,
                  fill_opacity=1, stroke_color="#94a3b8", stroke_width=2)
    bouchon = Rectangle(width=0.3, height=0.14, fill_color="#2563eb", fill_opacity=1, stroke_width=0)
    eti = Rectangle(width=0.62, height=0.32, fill_color="#93c5fd", fill_opacity=1, stroke_width=0)
    mot = Text("LAIT", font_size=16, color="#1e3a8a", weight=BOLD)
    mot.sans_synchro = mot._pas_audit = True  # décor
    g = VGroup(col, corps, bouchon.move_to(P(0, 0.8)), eti.move_to(P(0, -0.05)), mot.move_to(P(0, -0.05)))
    return g.scale(h / 1.5)


class PropUniteBase(PaysageProp):
    nom_voix = "6e-prop-unite"
    fichier_marques = "prop_unite_marques.json"
    CU = P(0.9, 1.1)      # le centre de la figure Unite (écrans 02 à 05)
    CG = P(-5.4, 1.1)     # le gâteau, à gauche

    def u_farine(self):
        return ss(Unite(4, 200, 6, "personnes", "g", fs=36, centre=self.CU))

    def ligne_sous(self, morceaux, y, fs=44, x=None):
        """Une ligne de calcul centrée sous la figure Unite (non jouée)."""
        return self.ligne(morceaux, fs).move_to(P(self.CU[0] if x is None else x, y))

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Passer par l'unité", self.identite, self.ceinture, y_ech=-2.45)
        ident.sans_synchro = ident._pas_audit = True  # « Maths 6e » : le 6 de la classe, pas celui de la voix
        self.au_mot("Passer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        g = gateau(4, 0.85, P(-4.3, 0.35))
        self.au_mot("recette")
        self.play(FadeIn(g, scale=0.6), run_time=0.4)
        self.au_mot("pour 4")
        p4 = self.t("pour 4", 44, BLEU_CALCUL).move_to(P(-2.35, 0.35))
        self.play(FadeIn(p4, shift=RIGHT * 0.2), run_time=0.35)
        fl = Arrow(P(-1.2, 0.35), P(0.2, 0.35), color=GREY_B, stroke_width=6, buff=0)
        self.au_mot("comment")
        self.play(GrowArrow(fl), run_time=0.4)
        self.au_mot("pour 6")
        p6 = self.t("pour 6 ?", 44, AMBRE).next_to(P(0.2, 0.35), RIGHT, buff=0.3)
        a6 = assiettes(6, 0.2).next_to(p6, DOWN, buff=0.3)
        self.play(FadeIn(p6, shift=RIGHT * 0.2), LaggedStart(*[FadeIn(a, scale=0.5) for a in a6], lag_ratio=0.15),
                  run_time=0.6)
        self.insister(p6, 1.2, 0.25)
        self.attendre_voix(marge=0.6)

    # ── 01 : Yanis, pâtissier, et sa recette ────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = yanis(1.1).move_to(P(-5.4, -0.9))
        self.au_mot("Voici Yanis")
        nom = self.t("Yanis", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.3)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("pâtissier")
        met = self.t("pâtissier", 32, BLEU_CALCUL).next_to(pers, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        g = gateau(4, 0.95, P(-2.4, 1.1))
        table = RoundedRectangle(width=2.8, height=0.18, corner_radius=0.05, fill_color="#92400e", fill_opacity=1,
                                 stroke_width=0).next_to(g, DOWN, buff=0.08)
        l1 = self.col(self.ligne([("Recette pour", WHITE), ("4 personnes :", BLEU_CALCUL)], 40), 2.6)
        a4 = assiettes(4).next_to(l1, DOWN, buff=0.2).align_to(l1, LEFT)
        self.au_mot("recette de gâteau")
        self.play(FadeIn(g, scale=0.7), FadeIn(table), FadeIn(l1[0], shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("4 personnes")
        self.play(FadeIn(l1[1], scale=1.2), LaggedStart(*[FadeIn(a, scale=0.5) for a in a4], lag_ratio=0.2),
                  run_time=0.5)
        sac = sac_farine(1.0).move_to(P(-2.4, -1.05))
        l2 = self.col(self.ligne([("200 g", VERT_OK), ("de farine", WHITE)], 40), 1.15)
        self.au_mot("200 g")
        self.play(FadeIn(l2[0], scale=1.3), FadeIn(sac, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("farine")
        self.play(FadeIn(l2[1], shift=RIGHT * 0.2), run_time=0.3)
        l3 = self.col(self.ligne([("Ce soir :", WHITE), ("6", AMBRE), ("à table", AMBRE)], 40), -0.15)
        a6 = assiettes(6).next_to(l3, DOWN, buff=0.2).align_to(l3, LEFT)
        self.au_mot("Ce soir")
        self.play(FadeIn(l3[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("6 à table")
        self.play(FadeIn(l3[1], scale=1.3), LaggedStart(*[FadeIn(a, scale=0.5) for a in a6], lag_ratio=0.12),
                  run_time=0.6)
        self.au_mot("table")
        self.play(FadeIn(l3[2], shift=RIGHT * 0.2), run_time=0.3)
        q = self.col(self.ligne([("Combien de farine ?", ORANGE_RETENUE)], 42), -1.75)
        self.au_mot("Combien")
        self.play(FadeIn(q, shift=UP * 0.2), Indicate(sac, color=ORANGE_RETENUE), run_time=0.5)
        self.insister(q, 1.15, 0.25)
        self.attendre_voix()

    # ── 02 : ni le double, ni la moitié : on passe par 1 ────────────────────
    def ecran_ni_double(self):
        self.ecran("02-ni-double")
        u = self.u_farine()
        g = gateau(4, 0.95, self.CG)
        self.au_mot("6 n'est")
        self.play(FadeIn(u.lignes[2][0], shift=RIGHT * 0.2), run_time=0.35)
        d = self.t("le double ?", 38).move_to(P(-1.4, -1.45))
        m = self.t("la moitié ?", 38).move_to(P(3.0, -1.45))
        self.au_mot("double")
        self.play(FadeIn(d, shift=UP * 0.15), run_time=0.3)
        self.play(Create(croix(d, sw=6)), run_time=0.3)
        self.au_mot("moitié")
        self.play(FadeIn(m, shift=UP * 0.15), run_time=0.3)
        self.play(Create(croix(m, sw=6)), run_time=0.3)
        self.au_mot("de 4")
        self.play(FadeIn(u.lignes[0][0], shift=RIGHT * 0.2), FadeIn(g, scale=0.7), run_time=0.4)
        self.au_mot("Alors")
        self.play(*[FadeOut(x) for x in self.mobjects if x not in (u.lignes[0][0], u.lignes[2][0], g)
                    and type(x).__name__ != "MascotteMargouillat"], run_time=0.3)
        self.au_mot("1 personne")
        cadre = SurroundingRectangle(u.lignes[1][0], color=AMBRE, buff=0.12, corner_radius=0.1, stroke_width=4)
        lu = self.ligne([("1 personne :", WHITE), ("l'unité", AMBRE)], 42).move_to(P(self.CU[0], -1.5))
        self.play(FadeIn(u.lignes[1][0], scale=1.3), FadeIn(lu[0], shift=UP * 0.15),
                  *[g.parts[i].animate.set_opacity(0.2) for i in (1, 2, 3)], run_time=0.45)
        self.au_mot("l'unité")
        self.play(Create(cadre), FadeIn(lu[1], scale=1.3), run_time=0.45)
        self.insister(lu[1], 1.25, 0.25)
        self.attendre_voix()

    # ── 03 : pour 1 personne, 4 fois moins (÷ 4) ────────────────────────────
    def ecran_diviser(self):
        self.ecran("03-diviser")
        u = self.u_farine()
        g = gateau(4, 0.95, self.CG)
        self.add(g, *[u.lignes[k][0] for k in range(3)])
        self.au_mot("4 personnes")
        self.play(Indicate(u.lignes[0][0], color=BLEU_CALCUL), run_time=0.5)
        e200 = self.t("200 g", 36, WHITE).next_to(g, DOWN, buff=0.3)
        self.au_mot("200 g")
        self.play(GrowArrow(u.lignes[0][1]), FadeIn(u.lignes[0][2], scale=1.3), FadeIn(e200, scale=1.3),
                  run_time=0.45)
        self.au_mot("1 personne")
        self.play(Indicate(u.lignes[1][0], color=AMBRE), run_time=0.5)
        self.au_mot("4 fois moins")
        p0 = g.parts[0]
        self.play(Create(u.fl_q[0][0]), FadeIn(u.fl_q[0][1], scale=1.3),
                  p0.animate.shift(P(0.05, 0.4)), *[g.parts[i].animate.set_opacity(0.2) for i in (1, 2, 3)],
                  e200.animate.set_opacity(0.35), run_time=0.6)
        l = self.ligne_sous([("200 ÷", WHITE), ("4", AMBRE), ("=", WHITE), ("50 g", VERT_OK)], -1.45)
        self.au_mot("200 divisé")
        self.play(FadeIn(l[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("par 4")
        self.play(FadeIn(l[1], scale=1.3), FadeIn(l[2]), Create(u.fl_v[0][0]), FadeIn(u.fl_v[0][1], scale=1.3),
                  run_time=0.4)
        e50 = self.t("50 g", 36, VERT_OK).next_to(p0.copy().shift(P(0.05, 0.4)), UP, buff=0.12)
        self.au_mot("50 g")
        self.play(FadeIn(l[3], scale=1.3), GrowArrow(u.lignes[1][1]), FadeIn(u.lignes[1][2], scale=1.3),
                  FadeIn(e50, scale=1.3), run_time=0.45)
        self.insister(u.lignes[1][2], 1.3, 0.25)
        self.attendre_voix()

    # ── 04 : pour 6 personnes, 6 fois plus (× 6) ────────────────────────────
    def six_parts(self, r=0.62):
        """6 parts d'un quart de gâteau, 2 rangées de 3, à gauche."""
        ps = VGroup(*[part(r) for _ in range(6)])
        ps.arrange_in_grid(2, 3, buff=(0.22, 0.3))
        return ps.move_to(self.CG + UP * 0.1)

    def ecran_multiplier(self):
        self.ecran("04-multiplier")
        u = self.u_farine()
        self.add(u.lignes[0], u.lignes[1], u.fl_q[0], u.fl_v[0], u.lignes[2][0])
        ps = self.six_parts()
        une = ps[0].copy()
        e50 = self.t("50 g", 32, VERT_OK).next_to(ps, UP, buff=0.2)
        e50._pas_audit = True  # la part de 50 g de l'écran précédent (dit juste avant)
        e50.sans_synchro = True
        self.add(une, e50)
        self.au_mot("6 personnes")
        self.play(Indicate(u.lignes[2][0], color=BLEU_CALCUL), run_time=0.5)
        self.au_mot("6 fois plus")
        self.play(Create(u.fl_q[1][0]), FadeIn(u.fl_q[1][1], scale=1.3),
                  LaggedStart(*[TransformFromCopy(une, ps[i]) for i in range(1, 6)], lag_ratio=0.15),
                  run_time=0.9)
        l = self.ligne_sous([("6", AMBRE), ("× 50 =", WHITE), ("300 g", VERT_OK)], -1.45)
        self.au_mot("6 fois 50")
        self.play(FadeIn(l[0], scale=1.3), Create(u.fl_v[1][0]), FadeIn(u.fl_v[1][1], scale=1.3), run_time=0.4)
        self.au_mot("50, égale")
        self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.3)
        e300 = self.t("300 g", 36, VERT_OK).next_to(ps, DOWN, buff=0.3)
        self.au_mot("300 g")
        self.play(FadeIn(l[2], scale=1.3), GrowArrow(u.lignes[2][1]), FadeIn(u.lignes[2][2], scale=1.3),
                  FadeIn(e300, scale=1.3), run_time=0.45)
        sac = sac_farine(0.9).move_to(P(-3.4, -2.35))
        self.au_mot("Yanis prend")
        self.play(FadeIn(sac, shift=UP * 0.2), run_time=0.4)
        self.au_mot("300 g de farine")
        cad = SurroundingRectangle(u.lignes[2][2], color=VERT_OK, buff=0.12, corner_radius=0.1, stroke_width=4)
        self.play(Create(cad), Indicate(sac, color=VERT_OK), run_time=0.5)
        self.insister(VGroup(u.lignes[2][2], cad), 1.2, 0.25)
        self.attendre_voix()

    # ── 05 : deux étapes ────────────────────────────────────────────────────
    def ecran_etapes(self):
        self.ecran("05-etapes")
        u = self.u_farine()
        self.add(u)
        tit = self.t("Deux étapes", 46, JAUNE_TITRE).move_to(P(self.CU[0], 3.2))
        self.au_mot("Deux étapes")
        self.play(Write(tit), run_time=0.5)
        l1 = self.col(self.ligne([("D'abord on divise", AMBRE), (": pour revenir à 1.", WHITE)], 34), -1.45, xl=-4.6)
        l2 = self.col(self.ligne([("Puis on multiplie", AMBRE), (": pour aller au nombre voulu.", WHITE)], 34),
                      -2.3, xl=-4.6)
        self.au_mot("D'abord")
        self.play(FadeIn(l1[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("divise")
        self.play(Indicate(u.fl_q[0], color=AMBRE, scale_factor=1.25),
                  Indicate(u.fl_v[0], color=AMBRE, scale_factor=1.25), run_time=0.7)
        self.au_mot("pour revenir")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.2), Indicate(u.lignes[1], color=AMBRE), run_time=0.6)
        self.au_mot("Puis")
        self.play(FadeIn(l2[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("multiplie")
        self.play(Indicate(u.fl_q[1], color=AMBRE, scale_factor=1.25),
                  Indicate(u.fl_v[1], color=AMBRE, scale_factor=1.25), run_time=0.7)
        self.au_mot("pour aller")
        self.play(FadeIn(l2[1], shift=RIGHT * 0.2), Indicate(u.lignes[2], color=AMBRE), run_time=0.6)
        self.attendre_voix()

    # ── 06 : QUESTION 1 (5 mangues 15 € ; 1 mangue ?) ───────────────────────
    def cagette(self, objets, l=3.6, h=0.7):
        """Une cagette en bois, les objets posés dedans (décor sans nombre)."""
        bois = Rectangle(width=l, height=h, fill_color="#a16207", fill_opacity=1, stroke_color="#451a03",
                         stroke_width=3)
        lattes = VGroup(*[Line(bois.get_left() + UP * y, bois.get_right() + UP * y, color="#451a03",
                               stroke_width=2) for y in (-0.12, 0.12)])
        objets.arrange(RIGHT, buff=0.08).next_to(bois, UP, buff=-0.25)
        return VGroup(objets, bois, lattes)

    def figure_gauche_u(self, u):
        """La figure Unite d'une réponse, recadrée à gauche de la colonne."""
        return ss(self.cadrer(u, gauche=-6.4, droite=0.55, haut=2.3, bas=-1.6))

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        deco = self.cagette(VGroup(*[mangue(0.34) for _ in range(5)])).move_to(P(-3.0, 0.3))
        self.add(deco)
        u = self.figure_gauche_u(Unite(5, 15, 2, "mangues", "€", fs=36))

        def apres(sc):
            l0 = sc.ligne_rep(0, ["15 ÷", "5 =", "3 €"])
            l1 = sc.ligne_rep(1, ["pour 1 mangue."])
            sc.au_mot("15 divisé")
            sc.play(FadeOut(deco), FadeIn(l0[0], shift=UP * 0.15), FadeIn(u.lignes[0][2], scale=1.3), run_time=0.3)
            sc.au_mot("par 5")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), FadeIn(u.lignes[0][0], scale=1.2), GrowArrow(u.lignes[0][1]),
                    Create(u.fl_q[0][0]), FadeIn(u.fl_q[0][1]), Create(u.fl_v[0][0]), FadeIn(u.fl_v[0][1]),
                    run_time=0.4)
            sc.au_mot("3 €")
            sc.play(FadeIn(l0[2], scale=1.3), GrowArrow(u.lignes[1][1]), FadeIn(u.lignes[1][2], scale=1.3),
                    run_time=0.35)
            sc.au_mot("1 mangue")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), FadeIn(u.lignes[1][0], scale=1.2), run_time=0.35)
            sc.rep_fini()

        self.question_pause("06-question", "06b-reponse", ["5 mangues coûtent 15 €.", "Combien coûte 1 mangue ?"],
                            [self.t("10 €", 34), self.t("3 €", 34), self.t("75 €", 34)], 1,
                            ["15 ÷ 5 = 3 €", "pour 1 mangue."], mot_q="5 mangues", autres_r=apres)

    # ── 07 : le piège : on n'ajoute pas 2 g ─────────────────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        tit = self.t("Attention au piège !", 44, ROUGE_ERREUR).move_to(P(-0.4, 3.1))
        tb = TableauProp(["Personnes", "Farine (g)"], [[4, 6], [200, 202]], montrer=False, largeur_case=1.5,
                         largeur_libelle=2.8, fs=38, centre=P(-2.6, 0.75))
        v200 = tb.valeur(1, 0)
        v200._pas_audit = True  # la recette (200 g), dite aux écrans 01 et 03
        v200.sans_synchro = True
        self.au_mot("Attention")
        self.play(Write(tit), FadeIn(tb.fond), FadeIn(v200), run_time=0.6)
        self.au_mot("4 à")
        self.play(FadeIn(tb.valeur(0, 0), scale=1.4), run_time=0.3)
        self.au_mot("6 personnes")
        self.play(FadeIn(tb.valeur(0, 1), scale=1.4), run_time=0.3)
        h = tb.fleche_col(0, 1, "+ 2", ligne=0)
        self.au_mot("ajoute 2")
        self.play(Create(h.fleche), FadeIn(h.etiquette, scale=1.3), run_time=0.5)
        b = tb.fleche_col(0, 1, "+ 2 ?", ligne=1, couleur=ROUGE_P)
        self.au_mot("n'ajoute pas")
        self.play(Create(b.fleche), run_time=0.4)
        self.au_mot("2 g")
        self.play(FadeIn(b.etiquette, scale=1.3), run_time=0.3)
        l1 = self.col(VGroup(self.t("202 g,", 42, ROUGE_ERREUR), self.t("ce serait faux !", 42, ROUGE_ERREUR))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.15), 0.75, xl=1.3)
        self.au_mot("202 g")
        self.play(FadeIn(tb.valeur(1, 1, ROUGE_P), scale=1.4), FadeIn(l1[0], scale=1.3), run_time=0.4)
        self.au_mot("ce serait faux")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.2), Create(tb.barrer(1, 1)), Create(croix(b, sw=6)), run_time=0.5)
        self.insister(l1, 1.06, 0.25)
        l2 = self.col(self.ligne([("On passe par", VERT_OK), ("1 personne.", VERT_OK)], 42), -2.15, xl=-4.6)
        self.au_mot("On passe")
        self.play(FadeIn(l2[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("1 personne")
        self.play(FadeIn(l2[1], scale=1.3), run_time=0.35)
        self.insister(l2, 1.12, 0.25)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (3 cahiers 9 € ; 7 cahiers ?) ───────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        cs = VGroup(*[cahier(c) for c in ("#38bdf8", "#f472b6", "#a3e635")]).arrange(RIGHT, buff=0.35)
        deco = cs.scale(1.3).move_to(P(-3.0, 0.4))
        self.add(deco)
        u = self.figure_gauche_u(Unite(3, 9, 7, "cahiers", "€", fs=36))

        def apres(sc):
            l0 = sc.ligne_rep(0, ["1 cahier :", "9 ÷", "3 =", "3 €."])
            l1 = sc.ligne_rep(1, ["7 cahiers :", "7 ×", "3 =", "21 €."])
            sc.au_mot("1 cahier")
            sc.play(FadeOut(deco), FadeIn(l0[0], shift=UP * 0.15), FadeIn(u.lignes[1][0], scale=1.2), run_time=0.3)
            sc.au_mot("9 divisé")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), FadeIn(u.lignes[0][2], scale=1.3), run_time=0.3)
            sc.au_mot("par 3")
            sc.play(FadeIn(l0[2], shift=UP * 0.15), FadeIn(u.lignes[0][0], scale=1.2), GrowArrow(u.lignes[0][1]),
                    Create(u.fl_q[0][0]), FadeIn(u.fl_q[0][1]), Create(u.fl_v[0][0]), FadeIn(u.fl_v[0][1]),
                    run_time=0.4)
            sc.au_mot("3 €")
            sc.play(FadeIn(l0[3], scale=1.3), GrowArrow(u.lignes[1][1]), FadeIn(u.lignes[1][2], scale=1.3),
                    run_time=0.35)
            sc.au_mot("7 cahiers")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), FadeIn(u.lignes[2][0], scale=1.2), run_time=0.3)
            sc.au_mot("7 fois")
            sc.play(FadeIn(l1[1], shift=UP * 0.15), Create(u.fl_q[1][0]), FadeIn(u.fl_q[1][1]),
                    Create(u.fl_v[1][0]), FadeIn(u.fl_v[1][1]), run_time=0.4)
            sc.au_mot("3, égale", 2)
            sc.play(FadeIn(l1[2], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("21 €")
            sc.play(FadeIn(l1[3], scale=1.3), GrowArrow(u.lignes[2][1]), FadeIn(u.lignes[2][2], scale=1.3),
                    run_time=0.35)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse", ["3 cahiers coûtent 9 €.", "Combien coûtent 7 cahiers ?"],
                            [self.t("13 €", 34), self.t("21 €", 34), self.t("63 €", 34)], 1,
                            ["1 cahier : 9 ÷ 3 = 3 €.", "7 cahiers : 7 × 3 = 21 €."], mot_q="3 cahiers",
                            autres_r=apres)

    # ── 09 : défi : les crêpes ──────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.play(Write(tit), run_time=0.6)
        pile = pile_crepes(8).move_to(P(-5.0, 0.6))
        lait = bouteille_lait(1.6).move_to(P(-2.9, 0.85))
        la = self.ligne([("8 crêpes", BLEU_CALCUL), ("→", GREY_B), ("400 mL", WHITE), ("de lait", WHITE)], 40)
        lb = self.ligne([("10 crêpes", BLEU_CALCUL), ("→", GREY_B), ("? mL", ORANGE_RETENUE)], 40)
        x0 = -1.6
        la.move_to(P(0, 1.35)).align_to(P(x0, 0), LEFT)
        lb.move_to(P(0, 0.2)).align_to(P(x0, 0), LEFT)
        xf = max(la[0].get_right()[0], lb[0].get_right()[0]) + 0.25
        for lg in (la, lb):
            lg[1].next_to(P(xf, lg[0].get_y()), RIGHT, buff=0)
            for k in range(2, len(lg)):
                lg[k].next_to(lg[k - 1], RIGHT, buff=0.2)
        duo = VGroup(la, lb)
        if duo.get_right()[0] > self.BORD_X - 0.1:
            duo.scale_to_fit_width(self.BORD_X - 0.1 - x0).align_to(P(x0, 0), LEFT)
        self.au_mot("8 crêpes")
        self.play(FadeIn(pile, shift=DOWN * 0.3), FadeIn(la[0], shift=RIGHT * 0.2), FadeIn(la[1]), run_time=0.45)
        self.au_mot("400 mL")
        self.play(FadeIn(lait, shift=UP * 0.2), FadeIn(la[2], scale=1.3), run_time=0.4)
        self.au_mot("lait")
        self.play(FadeIn(la[3], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("10 crêpes")
        self.play(FadeIn(lb[0], shift=RIGHT * 0.2), FadeIn(lb[1]), FadeIn(lb[2], scale=1.3), run_time=0.4)
        self.insister(lb[2], 1.25, 0.25)
        self.pause_defi(y=-1.5)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        u = ss(Unite(8, 400, 10, "crêpes", "mL", fs=36, centre=P(1.0, 1.0)))
        pile = pile_crepes(8, 1.3).move_to(P(-5.55, 1.0))
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.15))
        self.add(pile, u.lignes[0], u.lignes[2][0])
        self.au_mot("Correction")
        self.play(Write(tit), run_time=0.5)
        self.au_mot("1 crêpe")
        self.play(FadeIn(u.lignes[1][0], scale=1.3), run_time=0.35)
        l1 = self.ligne_sous([("400 ÷", WHITE), ("8", AMBRE), ("=", WHITE), ("50 mL", VERT_OK)], -1.4, x=1.0)
        self.au_mot("400 divisé")
        self.play(FadeIn(l1[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("par 8")
        self.play(FadeIn(l1[1], scale=1.3), FadeIn(l1[2]), Create(u.fl_q[0][0]), FadeIn(u.fl_q[0][1], scale=1.3),
                  Create(u.fl_v[0][0]), FadeIn(u.fl_v[0][1], scale=1.3), run_time=0.4)
        self.au_mot("50 mL")
        self.play(FadeIn(l1[3], scale=1.3), GrowArrow(u.lignes[1][1]), FadeIn(u.lignes[1][2], scale=1.3),
                  run_time=0.4)
        self.au_mot("10 crêpes")
        self.play(Indicate(u.lignes[2][0], color=BLEU_CALCUL), run_time=0.5)
        l2 = self.ligne_sous([("10", AMBRE), ("× 50 =", WHITE), ("500 mL", VERT_OK)], -2.35, x=1.0)
        self.au_mot("10 fois")
        self.play(FadeIn(l2[0], scale=1.3), Create(u.fl_q[1][0]), FadeIn(u.fl_q[1][1], scale=1.3),
                  Create(u.fl_v[1][0]), FadeIn(u.fl_v[1][1], scale=1.3), run_time=0.4)
        self.au_mot("50, égale")
        self.play(FadeIn(l2[1], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("500 mL")
        cad = SurroundingRectangle(u.lignes[2][2], color=VERT_OK, buff=0.12, corner_radius=0.1, stroke_width=4)
        self.play(FadeIn(l2[2], scale=1.3), GrowArrow(u.lignes[2][1]), FadeIn(u.lignes[2][2], scale=1.3),
                  run_time=0.4)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(u.lignes[2][2], cad), 1.2, 0.25)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        fig = ss(Unite(4, 200, 6, "personnes", "g", fs=36))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Ni double, ni moitié ?", "On passe par l'unité."),
            ("D'abord on divise :", "la valeur pour 1."),
            ("Puis on multiplie :", "le nombre voulu.")], fs=36)
        fig.scale(0.9)  # l'Indicate des flèches (× 1,1) reste loin du bord gauche (verifier-bords)
        self.au_mot("Quand ni")
        self.montrer_ligne(lignes[0], Indicate(fig.lignes[1], color=AMBRE, scale_factor=1.1))
        self.au_mot("D'abord")
        self.montrer_ligne(lignes[1], Indicate(VGroup(fig.fl_q[0], fig.fl_v[0]), color=AMBRE, scale_factor=1.1))
        self.au_mot("Puis")
        self.montrer_ligne(lignes[2], Indicate(VGroup(fig.fl_q[1], fig.fl_v[1]), color=AMBRE, scale_factor=1.1))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_ni_double()
        self.ecran_diviser()
        self.ecran_multiplier()
        self.ecran_etapes()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class PropUnite6e(PropUniteBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
