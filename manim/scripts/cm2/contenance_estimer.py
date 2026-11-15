# contenance_estimer.py
# EleveAI — Maths CM2 — série « Contenance », épisode 03 : ESTIMER UNE CONTENANCE
# (micro contenance_estimer, notion contenance), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Short jumeau : cm2-contenance-estimer-short (parfum 50 mL : A).
# Décor et métier : Ibrahim, PLOMBIER (chasse d'eau, chauffe-eau, robinet qui fuit ; centres : métiers, maison).
# Le CM2, un cran au-dessus du CM1 : les repères ont des décimaux (grande bouteille 1,5 L), on calcule
# pour estimer (4 × 1,5 L = 6 L ; 24 × 20 cL = 480 cL = 4,8 L), on choisit l'unité AVANT le nombre.
# Mapping micro → écrans : contenance_estimer = 02 (les repères : cuillère 5 mL, verre 20 cL,
# grande bouteille 1,5 L, seau 10 L), 03 (la chasse d'eau ≈ 4 grandes bouteilles = 6 L ; 6 mL trop petit,
# 60 L trop grand), 04 (d'abord l'unité : gouttes, cuillère → mL ; verre, tasse → cL ; seau, baignoire,
# citerne → L), 06 (piège : « 2 » seul ne dit rien, 2 mL ou 2 L), questions 05 (bol de soupe : A, 30 cL)
# et 07 (chauffe-eau : C, 200 L), défi 08 (robinet qui fuit, 20 cL par heure, 24 h : 480 cL = 4,8 L).
# Voix : manim/voix/cm2-contenance-estimer.json (validée le 15/11, Julie, débit −6) ;
# marques : contenance_estimer_marques.json (python manim/scripts/cm2/aire_marques_cm2.py contenance:estimer).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm2/contenance_estimer.py ContenanceEstimerCM2
# python -m manim render -qh --disable_caching manim/scripts/cm2/contenance_estimer.py ContenanceEstimerCM2 -o eleveai-maths-cm2-contenance-estimer --media_dir manim/scripts/cm2/media-contenance-03
# Sortie : manim/sorties/cm2/maths/contenance/03-estimer/eleveai-maths-cm2-contenance-estimer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from contenance_cm2_commun import *  # noqa: E402,F403

METAL = "#cbd5e1"       # robinet, cuillère, anse du seau
FAIENCE = "#f1f5f9"     # la chasse d'eau, le chauffe-eau
FAIENCE_B = "#94a3b8"   # leur contour
SOUPE = "#f59e0b"       # la soupe du bol
BOL = "#60a5fa"         # le bol
NOM_IB = "#93c5fd"      # le nom d'Ibrahim (salopette bleue)


def cuillere(s=1.0):
    """Une cuillère à café (vue de côté) : le creux plein d'eau et le manche."""
    creux = Ellipse(width=0.42, height=0.24, fill_color=EAU, fill_opacity=0.85, stroke_color=METAL, stroke_width=4)
    manche = Line(P(0.2, 0.02), P(0.95, 0.22), color=METAL, stroke_width=7)
    return VGroup(creux, manche).scale(s)


def goutte(s=1.0, couleur=EAU):
    """Une goutte d'eau : un rond et sa pointe vers le haut."""
    rond = Circle(radius=0.1, fill_color=couleur, fill_opacity=1, stroke_width=0)
    pointe = Polygon(P(-0.087, 0.05), P(0.087, 0.05), P(0, 0.24), fill_color=couleur, fill_opacity=1, stroke_width=0)
    return VGroup(rond, pointe).scale(s)


def gouttes(n=3, s=1.0):
    g = VGroup(*[goutte(s) for _ in range(n)]).arrange(RIGHT, buff=0.12 * s)
    if n >= 3:
        g[1].shift(UP * 0.18 * s)
    return g


def verre(s=1.0, couleur=EAU):
    return recipient("verre", 0.85, 0.62, 0.8, couleur).scale(s)


def tasse(s=1.0, couleur="#a16207"):
    return recipient("tasse", 0.7, 0.75, 0.75, couleur).scale(s)


def grande_bouteille(s=1.0, couleur=EAU, niveau=0.85):
    return recipient("bouteille", 1.5, 0.6, niveau, couleur).scale(s)


def seau(s=1.0, couleur=EAU):
    """Un seau : un verre large, et son anse."""
    r = recipient("verre", 1.0, 1.05, 0.8, couleur)
    anse = Arc(radius=0.5, start_angle=0, angle=PI, color=METAL, stroke_width=4).move_to(r.corps.get_top() + UP * 0.25)
    r.add(anse)
    return r.scale(s)


def baignoire(s=1.0, couleur=EAU):
    """Une baignoire : la cuve arrondie, l'eau, le rebord et deux pieds."""
    cuve = RoundedRectangle(width=2.6, height=0.95, corner_radius=0.35, fill_opacity=0, stroke_color=WHITE,
                            stroke_width=4)
    eau = Rectangle(width=2.35, height=0.55, fill_color=couleur, fill_opacity=0.85, stroke_width=0)
    eau.align_to(cuve, DOWN).shift(UP * 0.1)
    rebord = Line(P(-1.42, 0.47), P(1.42, 0.47), color=WHITE, stroke_width=7)
    pieds = VGroup(*[Circle(radius=0.09, fill_color=METAL, fill_opacity=1, stroke_width=0)
                     .move_to(P(x, -0.55)) for x in (-1.0, 1.0)])
    return VGroup(eau, cuve, rebord, pieds).scale(s)


def citerne(s=1.0):
    """Une citerne d'eau de pluie : un cylindre gris, son couvercle."""
    bas = Ellipse(width=1.1, height=0.32, fill_color="#475569", fill_opacity=1, stroke_width=0).move_to(P(0, -0.7))
    corps = Rectangle(width=1.1, height=1.4, fill_color="#64748b", fill_opacity=1, stroke_width=0)
    haut = Ellipse(width=1.1, height=0.32, fill_color="#94a3b8", fill_opacity=1, stroke_color="#cbd5e1",
                   stroke_width=2).move_to(P(0, 0.7))
    cou = Rectangle(width=0.3, height=0.14, fill_color="#334155", fill_opacity=1, stroke_width=0).move_to(P(0, 0.78))
    cerc = VGroup(*[Line(P(-0.55, y), P(0.55, y), color="#94a3b8", stroke_width=2) for y in (-0.25, 0.25)])
    return VGroup(bas, corps, cerc, haut, cou).scale(s)


def chasse_eau(s=1.0, niveau=0.75):
    """Les toilettes vues de face : le réservoir (on voit l'eau dedans), son bouton, la cuvette.
    g.reservoir = la cuve du réservoir, g.eau = l'eau du réservoir."""
    res = RoundedRectangle(width=1.5, height=1.0, corner_radius=0.1, fill_color=FAIENCE, fill_opacity=0.12,
                           stroke_color=FAIENCE_B, stroke_width=4).move_to(P(0, 0.95))
    eau = Rectangle(width=1.36, height=0.86 * niveau, fill_color=EAU, fill_opacity=0.9, stroke_width=0)
    eau.align_to(res, DOWN).shift(UP * 0.07)
    bouton = RoundedRectangle(width=0.42, height=0.12, corner_radius=0.05, fill_color=METAL, fill_opacity=1,
                              stroke_width=0).next_to(res, UP, buff=0)
    tuyau = Rectangle(width=0.26, height=0.3, fill_color=FAIENCE, fill_opacity=1, stroke_width=0).move_to(P(0, 0.32))
    bol = Polygon(P(-0.82, 0.05), P(0.82, 0.05), P(0.45, -0.72), P(-0.45, -0.72), fill_color=FAIENCE, fill_opacity=1,
                  stroke_color=FAIENCE_B, stroke_width=3)
    pied = Rectangle(width=0.7, height=0.25, fill_color=FAIENCE, fill_opacity=1, stroke_color=FAIENCE_B,
                     stroke_width=3).move_to(P(0, -0.84))
    siege = Ellipse(width=1.75, height=0.38, fill_color="#e2e8f0", fill_opacity=1, stroke_color=FAIENCE_B,
                    stroke_width=3).move_to(P(0, 0.07))
    g = VGroup(bol, pied, siege, tuyau, eau, res, bouton)
    g.reservoir, g.eau = res, eau
    return g.scale(s)


def chauffe_eau(s=1.0):
    """Un chauffe-eau (ballon) : grand cylindre blanc, son voyant, les tuyaux d'eau chaude et froide."""
    corps = RoundedRectangle(width=1.15, height=2.0, corner_radius=0.45, fill_color=FAIENCE, fill_opacity=1,
                             stroke_color=FAIENCE_B, stroke_width=4)
    bande = Rectangle(width=1.15, height=0.12, fill_color="#cbd5e1", fill_opacity=1, stroke_width=0).move_to(P(0, -0.45))
    voyant = Circle(radius=0.09, fill_color="#ef4444", fill_opacity=1, stroke_width=0).move_to(P(0, 0.35))
    cadran = Circle(radius=0.2, fill_opacity=0, stroke_color=FAIENCE_B, stroke_width=3).move_to(P(0, 0.35))
    chaud = Line(P(-0.25, -1.0), P(-0.25, -1.35), color="#ef4444", stroke_width=8)
    froid = Line(P(0.25, -1.0), P(0.25, -1.35), color="#3b82f6", stroke_width=8)
    return VGroup(chaud, froid, corps, bande, cadran, voyant).scale(s)


def bol_soupe(s=1.0):
    """Un bol de soupe vu de côté : la demi-ellipse bleue, la soupe dessus, la vapeur."""
    import numpy as np
    pts = [P(1.0 * np.cos(a), 0.62 * np.sin(a)) for a in np.linspace(PI, 2 * PI, 32)]
    bol = Polygon(*pts, fill_color=BOL, fill_opacity=1, stroke_color="#1d4ed8", stroke_width=3)
    pied = Rectangle(width=0.6, height=0.12, fill_color="#1d4ed8", fill_opacity=1, stroke_width=0).move_to(P(0, -0.66))
    soupe = Ellipse(width=1.96, height=0.34, fill_color=SOUPE, fill_opacity=1, stroke_color="#1d4ed8",
                    stroke_width=3)
    vap = VGroup(*[ArcBetweenPoints(P(x, 0.3), P(x, 0.85), angle=PI / 3, color=GRAY_B, stroke_width=3)
                   for x in (-0.4, 0.0, 0.4)])
    return VGroup(pied, bol, soupe, vap).scale(s)


def robinet(s=1.0):
    """Un robinet (vu de côté) qui fuit : le tuyau du mur, le bec, la poignée ; g.bec = le bout du bec."""
    tuyau = RoundedRectangle(width=1.3, height=0.24, corner_radius=0.08, fill_color=METAL, fill_opacity=1,
                             stroke_width=0)
    bec = RoundedRectangle(width=0.24, height=0.5, corner_radius=0.06, fill_color=METAL, fill_opacity=1,
                           stroke_width=0).move_to(P(0.53, -0.3))
    tige = Rectangle(width=0.1, height=0.25, fill_color="#94a3b8", fill_opacity=1, stroke_width=0).move_to(P(-0.1, 0.24))
    poignee = RoundedRectangle(width=0.6, height=0.12, corner_radius=0.05, fill_color="#ef4444", fill_opacity=1,
                               stroke_width=0).move_to(P(-0.1, 0.4))
    mur = Rectangle(width=0.18, height=0.9, fill_color="#78716c", fill_opacity=1, stroke_width=0).move_to(P(-0.74, 0))
    g = VGroup(mur, tuyau, tige, poignee, bec)
    g.bec = bec
    return g.scale(s)


def croix_sur(m, s=0.55):
    return VGroup(Line(UL, DR), Line(UR, DL)).set_color(ROUGE_ERREUR).set_stroke(width=8).scale(s).move_to(m)


class ContenanceEstimerCM2(PaysageContenanceCM2):
    nom_voix = "cm2-contenance-estimer"
    fichier_marques = "contenance_estimer_marques.json"
    ceinture = "jaune"

    def _disposer_q(self, question, choix, phrase):
        """Phrase de réponse : lignes coupées recalées sur la ligne d'un bloc, interlignes réguliers."""
        r = super()._disposer_q(question, choix, phrase)
        if self._ph_couper:
            phrase_reguliere(r[5], self._ph_couper)
        return r

    def pause_defi(self, y=-1.4, marge=2.0, xl=0.4):
        """« Mets pause, et cherche ! » en 34, entier, dans la colonne du défi, au-dessus de Ti-Margo."""
        self.au_mot("Mets pause")
        p = self.col(self.t("Mets pause, et cherche !", 34, ORANGE_RETENUE), y, xl)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=marge)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Estimer une contenance", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Estimer une contenance")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.t("Une chasse d'eau :", 38)
        q1 = self.ligne([("6 mL ?", JAUNE_TITRE), ("6 L ?", JAUNE_TITRE), ("60 L ?", JAUNE_TITRE)], 38, buff=0.45)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        ch = chasse_eau(0.85).move_to(P(3.4, 0.35))
        self.au_mot("Une chasse d'eau")
        self.play(FadeIn(q0, shift=UP * 0.2), FadeIn(ch, scale=1.1), run_time=0.3)
        for k, mot in enumerate(("6 millilitres", "6 litres", "ou 60")):
            self.au_mot(mot)
            self.play(FadeIn(q1[k], shift=UP * 0.2), run_time=0.25)
        self.play(Indicate(ch.reservoir, color=JAUNE_TITRE, scale_factor=1.06), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 01 : Ibrahim, plombier ──────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        XL = 0.9
        pe = ibrahim(0.95).move_to(P(-5.1, 0.35))
        self.au_mot("Voici Ibrahim")
        nom = self.t("Ibrahim", 42, NOM_IB).next_to(pe, UP, buff=0.3)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il est plombier")
        met = self.t("plombier", 26, NOM_IB).next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.3)
        ch = chasse_eau(0.95).move_to(P(-2.2, 0.2))
        l0 = self.bloc(["Il installe une nouvelle", "chasse d'eau."], 32)
        self.col(l0, 2.35, XL)
        self.au_mot("Il installe une nouvelle")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("nouvelle chasse d'eau")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(ch, shift=UP * 0.2), run_time=0.35)
        l1 = self.t("Le client demande :", 32, GRAY_B)
        self.col(l1, 1.1, XL)
        self.au_mot("Le client demande")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        q = self.bloc(["Combien d'eau part", "à chaque fois ?"], 38, JAUNE_TITRE)
        self.col(q, 0.2, XL)
        self.au_mot("combien d'eau part")
        self.play(FadeIn(q[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("à chaque fois")
        self.play(FadeIn(q[1], shift=UP * 0.1), Indicate(ch.reservoir, color=JAUNE_TITRE, scale_factor=1.05),
                  run_time=0.4)
        l2 = self.bloc(["Pas besoin de mesurer :", "il estime !"], 34, VERT_OK)
        self.col(l2, -1.3, XL)
        self.au_mot("besoin de mesurer")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("il estime")
        self.play(FadeIn(l2[1], scale=1.2), run_time=0.3)
        self.attendre_voix()

    # ── 02 : les repères ────────────────────────────────────────────────────
    def reperes(self):
        objs = [cuillere(1.4), verre(1.3), grande_bouteille(1.05), seau(1.2)]
        xs = [-4.9, -2.5, -0.1, 2.5]
        for o, x in zip(objs, xs):
            o.move_to(P(x, 0)).align_to(P(0, -0.55), DOWN)
        objs[0].align_to(P(0, -0.45), DOWN)
        return objs

    def ecran_reperes(self):
        self.ecran("02-reperes")
        self.au_mot("Pour estimer")
        tit = self.t("Pour estimer : des repères !", 42, JAUNE_TITRE).move_to(P(0, 2.75))
        self.play(Write(tit), run_time=0.35)
        objs = self.reperes()
        noms = ["cuillère à café", "verre", "grande bouteille", "seau"]
        etis = ["5 mL", "20 cL", "1,5 L", "10 L"]
        mots = [("cuillère à café", "café : 5"), ("Un verre", "verre : 20"), ("grande bouteille", "d'eau : 1,5"),
                ("Un seau", "seau : 10")]
        for o, n, e, (m1, m2) in zip(objs, noms, etis, mots):
            nm = self.t(n, 26, GRAY_B).next_to(o, UP, buff=0.25)
            self.au_mot(m1)
            self.play(FadeIn(o, shift=UP * 0.2), FadeIn(nm), run_time=0.25)
            self.au_mot(m2)
            et = contenance(o, e, 34, audit=True)
            et.set_y(-0.95)
            self.play(FadeIn(et), run_time=0.2)
        self.attendre_voix()

    # ── 03 : la chasse d'eau ≈ 4 grandes bouteilles = 6 L ──────────────────
    def ecran_chasse(self):
        self.ecran("03-chasse")
        XP = 0.6
        ch = chasse_eau(0.95).move_to(P(-5.15, 1.55))
        bs = VGroup(*[grande_bouteille(0.68) for _ in range(4)]).arrange(RIGHT, buff=0.22, aligned_edge=DOWN)
        bs.move_to(P(-2.4, 1.75))
        self.add(ch)
        l0 = self.bloc(["Le réservoir : à peu près", "4 grandes bouteilles."], 32)
        self.col(l0, 2.55, XP)
        self.au_mot("Le réservoir")
        self.play(FadeIn(l0[0], shift=UP * 0.1), Indicate(ch.reservoir, color=JAUNE_TITRE, scale_factor=1.05),
                  run_time=0.3)
        self.au_mot("4 grandes bouteilles")
        self.play(FadeIn(l0[1], shift=UP * 0.1), LaggedStart(*[FadeIn(b, shift=UP * 0.2) for b in bs],
                                                             lag_ratio=0.25), run_time=0.45)
        l1 = self.ligne([("4 × 1,5", BLEU_D), ("= 6 L", VERT_OK)], 42, buff=0.3)
        self.col(l1, 1.15, XP)
        acc = Brace(bs, DOWN, color=VERT_OK, buff=0.12)
        e6 = hors_audit(Text("6 L", font_size=30, color=VERT_OK, weight=BOLD)).next_to(acc, DOWN, buff=0.08)
        self.au_mot("4 fois 1,5")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("1,5 : 6")
        self.play(FadeIn(l1[1], scale=1.2), GrowFromCenter(acc), FadeIn(e6), run_time=0.2)
        # trop petit : la cuillère
        cu = cuillere(1.3).move_to(P(-5.0, -0.85))
        ecu = contenance(cu, "6 mL", 28, ROUGE_ERREUR, buff=0.4)
        l2 = self.ligne([("6 mL :", ROUGE_ERREUR), ("une cuillère,", WHITE)], 34, buff=0.2)
        self.col(l2, 0.3, XP)
        l2b = self.t("bien trop petit !", 34, ROUGE_ERREUR)
        self.col(l2b, -0.3, XP)
        self.au_mot("6 millilitres")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(cu, shift=UP * 0.2), FadeIn(ecu), run_time=0.3)
        self.au_mot("qu'une cuillère")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("bien trop petit")
        self.play(FadeIn(l2b, shift=UP * 0.1), Create(croix_sur(cu[0], 0.32)), run_time=0.3)
        # trop grand : 6 seaux
        ss = VGroup(*[seau(0.42) for _ in range(6)]).arrange_in_grid(2, 3, buff=(0.18, 0.22))
        ss.move_to(P(-2.3, -0.95))
        ess = contenance(ss, "60 L", 28, ROUGE_ERREUR, buff=0.25)
        l3 = self.ligne([("60 L :", ROUGE_ERREUR), ("6 seaux,", WHITE)], 34, buff=0.2)
        self.col(l3, -1.05, XP)
        l3b = self.t("bien trop grand !", 34, ROUGE_ERREUR)
        self.col(l3b, -1.65, XP)
        self.au_mot("60 litres")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("6 seaux")
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(ss, lag_ratio=0.15), FadeIn(ess), run_time=0.35)
        self.au_mot("bien trop grand")
        self.play(FadeIn(l3b, shift=UP * 0.1), Create(croix_sur(ss, 0.6)), run_time=0.3)
        res = self.gros("Environ 6 L", fs=44)
        self.col(res, -2.6, XP)
        self.au_mot("environ 6")
        self.play(FadeIn(res, scale=1.2), Indicate(ch.reservoir, color=VERT_OK, scale_factor=1.06), run_time=0.45)
        self.attendre_voix()

    # ── 04 : d'abord la bonne unité ─────────────────────────────────────────
    def ecran_unite(self):
        self.ecran("04-unite")
        self.au_mot("Choisis d'abord la bonne unité")
        tit = self.t("Choisis d'abord la bonne unité !", 40, JAUNE_TITRE).move_to(P(0, 2.8))
        self.play(Write(tit), run_time=0.35)
        Y = 0.25  # le bas des dessins
        objs = [gouttes(3, 1.3), cuillere(1.15), verre(1.15), tasse(1.25), seau(0.85), baignoire(0.6), citerne(0.95)]
        xs = [-5.75, -4.3, -2.7, -1.3, 0.3, 1.95, 3.75]
        noms = ["gouttes", "cuillère", "verre", "tasse", "seau", "baignoire", "citerne"]
        mots = ["quelques gouttes", "ou une cuillère", "Pour un verre", "ou une tasse", "Pour un seau",
                "une baignoire", "ou une citerne"]
        nms = []
        for o, x, n in zip(objs, xs, noms):
            o.move_to(P(x, 0)).align_to(P(0, Y), DOWN)
            nms.append(self.t(n, 26, GRAY_B).next_to(P(x, Y), DOWN, buff=0.3))
        objs[1].align_to(P(0, Y + 0.1), DOWN)
        seps = VGroup(*[DashedLine(P(x, 1.9), P(x, -2.3), color=GRAY_D, stroke_width=2, dash_length=0.12)
                        for x in (-3.5, -0.55)])
        self.add(seps)
        unites = [("mL", -5.0, (0, 1)), ("cL", -2.0, (2, 3)), ("L", 2.0, (4, 5, 6))]
        um = {"mL": "le millilitre", "cL": "le centilitre", "L": "le litre"}
        k = 0
        for u, xu, ids in unites:
            for i in ids:
                self.au_mot(mots[i])
                self.play(FadeIn(objs[i], shift=UP * 0.2), FadeIn(nms[i]), run_time=0.25)
                k += 1
            self.au_mot(um[u])
            tu = self.t(u, 64, VERT_OK).move_to(P(xu, -1.45))
            self.play(FadeIn(tu, scale=1.4), run_time=0.3)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b = bol_soupe(1.3).move_to(P(-3.8, 2.05))

        def autres_q(sc):
            sc.play(FadeIn(b), run_time=0.35)

        self.question_gauche("05-question", "05b-reponse",
                             ["Quelle est la contenance", "d'un bol de soupe ?"],
                             [self.choix("30 cL"), self.choix("3 mL"), self.choix("3 L")], 0,
                             ["Un bol : un peu plus", "qu'un verre de 20 cL,", "environ 30 cL.",
                              "3 mL : moins", "qu'une cuillère ;", "3 L : deux", "grandes bouteilles."],
                             0.6, couper={3: ("3 mL :", "moins"), 5: ("3 L :", "deux")},
                             mot_q="Quelle est la contenance", autres_q=autres_q)

    # ── 06 : le piège (un nombre seul ne dit rien) ──────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        l0 = self.t("Un nombre seul ne dit rien :", 36, JAUNE_TITRE)
        gauche(l0, -6.2, 2.15)
        self.au_mot("Un nombre seul")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        l1 = self.ligne([("2", BLEU_D), ("c'est tout petit…", WHITE), ("ou énorme !", WHITE)], 36, buff=0.25)
        gauche(l1, -6.2, 1.4)
        self.au_mot("rien : 2")
        self.play(FadeIn(l1[0], scale=1.4), run_time=0.2)
        self.au_mot("tout petit")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("ou énorme")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.25)
        XG, XD = -3.9, 1.3
        gt = gouttes(2, 2.0).move_to(P(XG, 0.15))
        bt = recipient("bouteille", 1.1, 0.75, 0.85, EAU).move_to(P(XD, 0.3))
        a1 = VGroup(self.t("2 mL :", 36, BLEU_D), self.t("quelques gouttes", 34)).arrange(DOWN, buff=0.12)
        a1.next_to(P(XG, -0.6), DOWN, buff=0)
        a2 = VGroup(self.t("2 L :", 36, BLEU_D), self.t("une grosse bouteille", 34)).arrange(DOWN, buff=0.12)
        a2.next_to(P(XD, -0.6), DOWN, buff=0)
        self.au_mot("2 millilitres")
        self.play(FadeIn(a1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("quelques gouttes")
        self.play(FadeIn(a1[1], shift=UP * 0.1), FadeIn(gt, shift=DOWN * 0.2), run_time=0.3)
        self.au_mot("2 litres")
        self.play(FadeIn(a2[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("grosse bouteille")
        self.play(FadeIn(a2[1], shift=UP * 0.1), FadeIn(bt, shift=UP * 0.2), run_time=0.3)
        l3 = self.ligne([("Regarde toujours l'unité,", ORANGE_RETENUE)], 34)
        gauche(l3, -6.2, -2.3)
        l4 = self.ligne([("et compare avec un repère.", ORANGE_RETENUE)], 34)
        gauche(l4, -6.2, -2.9)
        self.au_mot("Regarde toujours")
        self.play(FadeIn(l3, shift=UP * 0.1), Indicate(VGroup(a1[0], a2[0]), color=ORANGE_RETENUE), run_time=0.35)
        self.au_mot("et compare")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        c = chauffe_eau(0.95).move_to(P(-3.8, 2.15))

        def autres_q(sc):
            sc.play(FadeIn(c), run_time=0.35)

        self.question_gauche("07-question", "07b-reponse",
                             ["Ibrahim remplit", "un chauffe-eau.", "Combien contient-il ?"],
                             [self.choix("2 L"), self.choix("20 cL"), self.choix("200 L")], 2,
                             ["Un chauffe-eau : comme", "20 seaux de 10 L,", "environ 200 L.",
                              "2 L : une bouteille ;", "20 cL : un verre."],
                             0.6, couper={1: ("20", "seaux", "de 10 L,"), 3: ("2 L :", "une bouteille ;"),
                                          4: ("20 cL :", "un verre.")},
                             mot_q="Ibrahim remplit", autres_q=autres_q)

    # ── 08 : le défi (le robinet qui fuit) ──────────────────────────────────
    def figure_defi(self):
        rb = robinet(1.3).move_to(P(-4.4, 2.0))
        vr = verre(1.25).move_to(P(-3.7, 0.0))
        vr.set_x(rb.bec.get_x())
        gs = VGroup(goutte(0.9), goutte(0.9)).arrange(DOWN, buff=0.18)
        gs.next_to(rb.bec, DOWN, buff=0.15)
        return rb, gs, vr

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        rb, gs, vr = self.figure_defi()
        XL = 0.0
        l0 = self.t("Un robinet fuit :", 36)
        self.col(l0, 2.2, XL)
        self.au_mot("robinet qui fuit")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(rb, shift=RIGHT * 0.2), FadeIn(gs, shift=DOWN * 0.2),
                  run_time=0.35)
        l1 = self.ligne([("un verre de", WHITE), ("20 cL", JAUNE_TITRE)], 36, buff=0.2)
        self.col(l1, 1.5, XL)
        self.au_mot("environ un verre")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(vr, shift=UP * 0.2), run_time=0.3)
        self.au_mot("verre de 20")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(contenance(vr, "20 cL", 30)), run_time=0.3)
        l2 = self.t("par heure.", 36, JAUNE_TITRE)
        self.col(l2, 0.85, XL)
        self.au_mot("par heure")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        q0 = self.t("Combien de litres perdus", 36, JAUNE_TITRE)
        q1 = self.ligne([("en une journée", JAUNE_TITRE), ("de 24 h ?", JAUNE_TITRE)], 36, buff=0.2)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        self.col(q, -0.25, XL)
        self.au_mot("Combien de litres")
        self.play(FadeIn(q[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("en une journée")
        self.play(FadeIn(q1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("24 heures")
        self.play(FadeIn(q1[1], shift=UP * 0.1), Wiggle(gs), run_time=0.45)
        self.pause_defi(y=-1.4, xl=0.0)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        vs = VGroup(*[recipient("verre", 0.42, 0.34, 0.8, EAU) for _ in range(24)])
        vs.arrange_in_grid(4, 6, buff=(0.16, 0.16)).move_to(P(-3.8, 1.25))
        bs = VGroup(*[recipient("bouteille", 0.85, 0.42, 0.85 if k < 4 else 0.68, EAU) for k in range(5)])
        bs.arrange(RIGHT, buff=0.25, aligned_edge=DOWN).move_to(P(-3.8, -1.45))
        XL = 0.4
        l1 = self.ligne([("24 × 20", BLEU_D), ("= 480 cL", VERT_OK)], 42, buff=0.3)
        self.col(l1, 2.2, XL)
        self.au_mot("24 fois 20")
        self.play(FadeIn(l1[0], shift=UP * 0.1), LaggedStart(*[FadeIn(v, scale=1.3) for v in vs], lag_ratio=0.04),
                  run_time=0.6)
        self.au_mot("20 : 480")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Indicate(vs, color=VERT_OK, scale_factor=1.03), run_time=0.35)
        l2 = self.ligne([("480 cL", BLEU_D), ("= 4,8 L", VERT_OK)], 42, buff=0.3)
        self.col(l2, 1.35, XL)
        self.au_mot("centilitres. 480")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("c'est 4,8")
        e48 = hors_audit(Text("4,8 L", font_size=30, color=VERT_OK, weight=BOLD)).next_to(bs, DOWN, buff=0.18)
        self.play(FadeIn(l2[1], shift=UP * 0.1), LaggedStart(*[FadeIn(b, shift=UP * 0.2) for b in bs], lag_ratio=0.2),
                  FadeIn(e48), run_time=0.5)
        l3 = self.bloc(["presque 5 L perdus", "en une seule journée !"], 36, ORANGE_RETENUE)
        self.col(l3, 0.25, XL)
        self.au_mot("presque 5")
        self.play(FadeIn(l3[0], scale=1.1), Indicate(bs, color=ORANGE_RETENUE, scale_factor=1.05), run_time=0.35)
        self.au_mot("seule journée")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        l4 = self.t("Ibrahim change le joint.", 32, NOM_IB)
        self.col(l4, -1.05, XL)
        self.au_mot("Ibrahim change")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = VGroup(cuillere(1.2), verre(1.0), grande_bouteille(0.8), seau(0.9)).arrange(RIGHT, buff=0.25,
                                                                                           aligned_edge=DOWN)
        fig.scale_to_fit_width(3.3)
        lignes = self.finale_gauche(fig, textes=[
            ("Pour estimer : d'abord l'unité,", "puis compare avec un repère."),
            ("une cuillère : 5 mL ;",),
            ("un verre : 20 cL ;",),
            ("une grande bouteille : 1,5 L ;",),
            ("un seau : 10 L.",)], fs=32)
        self.add(fig)
        self.au_mot("Pour estimer")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        for k, mot in enumerate(("cuillère, 5", "verre, 20", "bouteille, 1,5", "seau, 10")):
            self.au_mot(mot)
            self.montrer_ligne(lignes[k + 1], Indicate(fig[k], color=VERT_OK, scale_factor=1.1))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_reperes()
        self.ecran_chasse()
        self.ecran_unite()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
