# masse_cm1_mesurer.py
# EleveAI — Maths CM1 — série « Masses » (CP → CM2), ÉPISODE CM1 02 : lire une balance, mesurer une masse
# (micro masse_mesurer, notion masse), AVEC VOIX.
# Paysage 16:9, CEINTURE JAUNE. Short jumeau (blanche) : film Ti Margo (la pastèque entre 2 et 3 kg).
# Décor et métier : Kenza, HERBORISTE (elle pèse ses plantes à tisane sur une balance à aiguille).
# Mapping micro → écrans : 02 (la graduation : de 100 en 100 g, 5 intervalles de 20 g, la loupe),
# 03 (lire : 3 petits traits après 400 → 460 g), 04 question (au milieu de 500 et 600), 05 (balance à
# plateaux : 500 g + 200 g + 50 g = 750 g), 06 question (2 kg, 200 g et 100 g), 07 défi (pèse-personne :
# de 10 en 10 kg, 4 traits après 30), 07b correction, 08 ce que tu as appris, 09 fin commune.
# Voix : manim/voix/cm1-masse-mesurer.json (source : masse_voix.py, validée le 16/11).
# Marques : python manim/scripts/ce2/perimetre_marques.py masse:mesurer:cm1
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/masse_cm1_mesurer.py MasseMesurerCM1
# Sortie : manim/sorties/cm1/maths/masse/02-mesurer/eleveai-maths-cm1-masse-mesurer.mp4

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))  # dossier manim/ (fin_commune)

from masse_commun import *  # noqa: E402,F403
from masse_choisir_unite import MasseChoisirUniteCE2Base  # noqa: E402
from masse_cm1_comparer import abr, muet  # noqa: E402
from fin_commune import ecran_fin  # noqa: E402

_V = {e["id"]: e for e in json.load(open(Path(__file__).resolve().parent / "masse_voix.json", encoding="utf-8"))}
EP = _V["cm1-masse-mesurer"]
Q1, Q2 = EP["questions"]
C_G, C_KG = BLEU_D, VERT_OK
HERBE = "#16a34a"
KRAFT = "#c8a27a"
ENCRE = "#1f2937"


# ── Dessins ─────────────────────────────────────────────────────────────────────────────────────
def kenza(s=1.0):
    """Kenza, herboriste : tenue verte, tablier crème, un foulard vert d'eau sur les cheveux."""
    p = visage(personne(peau="#a0522d", tenue=HERBE, cheveux="#1f2937", longs=True, s=s))
    p.add(tablier(p, "#fef3c7"))
    c, r = p.tete.get_center(), p.tete.width / 2
    foulard = AnnularSector(inner_radius=0, outer_radius=r * 1.08, angle=PI, start_angle=0, fill_color="#5eead4",
                            fill_opacity=1, stroke_color="#0f766e", stroke_width=2).move_to(c + UP * r * 0.62)
    feuille = Ellipse(width=r * 0.7, height=r * 0.3, fill_color=HERBE, fill_opacity=1, stroke_width=0)
    feuille.rotate(0.6).move_to(p.corps.get_center() + UP * r * 0.2) if hasattr(p, "corps") else None
    p.add(foulard, feuille)
    return p


def brin(s=1.0, couleur=HERBE, h=1.0):
    """Un brin de plante : une tige et quatre feuilles."""
    tige = Line(P(0, 0), P(0, h * s), color="#15803d", stroke_width=4 * s)
    g = VGroup(tige)
    for k, y in enumerate((0.3, 0.5, 0.7, 0.9)):
        f = Ellipse(width=0.34 * s, height=0.14 * s, fill_color=couleur, fill_opacity=1, stroke_width=0)
        cote = 1 if k % 2 == 0 else -1
        f.rotate(0.5 * cote).move_to(P(0.15 * s * cote, y * h * s))
        g.add(f)
    return g


def bouquet(s=1.0):
    """Un bouquet de plantes à tisane (menthe, verveine) noué d'un ruban."""
    g = VGroup(brin(s, "#22c55e", 1.1).rotate(0.25), brin(s, "#16a34a", 1.25),
               brin(s, "#4ade80", 1.0).rotate(-0.25))
    g.arrange(RIGHT, buff=-0.15 * s, aligned_edge=DOWN)
    ruban = RoundedRectangle(width=0.36 * s, height=0.12 * s, corner_radius=0.05 * s, fill_color="#e11d48",
                             fill_opacity=1, stroke_width=0).move_to(g.get_bottom() + UP * 0.25 * s)
    g.add(ruban)
    return g


def sachet(texte=None, s=1.0):
    """Un sachet de papier kraft, une feuille dessinée dessus (ou son étiquette)."""
    corps = Polygon(P(-0.45, -0.55), P(0.45, -0.55), P(0.4, 0.45), P(-0.4, 0.45), fill_color=KRAFT, fill_opacity=1,
                    stroke_color="#78350f", stroke_width=2).scale(s, about_point=ORIGIN)
    pli = Polygon(P(-0.4, 0.45), P(0.4, 0.45), P(0.36, 0.62), P(-0.36, 0.62), fill_color="#b08960", fill_opacity=1,
                  stroke_color="#78350f", stroke_width=2).scale(s, about_point=ORIGIN)
    g = VGroup(corps, pli)
    if texte:
        et = hors_audit(Text(texte, font_size=int(22 * s), color=ENCRE, weight=BOLD)).move_to(corps)
        if et.width > corps.width * 0.85:
            et.scale_to_fit_width(corps.width * 0.85)
        g.add(et)
    else:
        f = Ellipse(width=0.42 * s, height=0.2 * s, fill_color=HERBE, fill_opacity=1, stroke_width=0).rotate(0.5)
        g.add(f.move_to(corps.get_center() + DOWN * 0.05 * s))
    return g


def cadran(maxi=1000, pas=100, n=5, r=2.0, valeur=0, unite="g", fs=24, plateau=True):
    """Balance de cuisine à aiguille, cadran ROND : un nombre tous les `pas`, `n` petits intervalles entre deux
    nombres (traits longs sur les nombres). g.angle(v), g.pt(v, d), g.traits {v: Line}, g.nums {v: Text},
    g.aiguille (tourne autour de g.centre), g.valeur."""
    corps = RoundedRectangle(width=2 * r + 0.7, height=2 * r + 0.7, corner_radius=0.45, fill_color="#e2e8f0",
                             fill_opacity=1, stroke_color="#94a3b8", stroke_width=3)
    face = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color="#475569", stroke_width=4)
    face.move_to(corps)
    c = face.get_center()
    axe = Dot(c, radius=0.08, color=ENCRE)

    def angle(v):
        return PI / 2 - TAU * 0.9 * v / maxi

    def pt(v, d):
        a = angle(v)
        return axe.get_center() + d * np.array([np.cos(a), np.sin(a), 0])

    traits, petit = {}, pas / n
    for k in range(int(round(maxi / petit)) + 1):
        v = round(k * petit, 6)
        grand = k % n == 0
        L = 0.36 * r / 2 if grand else 0.2 * r / 2
        traits[v] = Line(pt(v, r - 0.06), pt(v, r - 0.06 - L), color=ENCRE, stroke_width=4 if grand else 2.5)
    nums = {v: hors_audit(Text(str(v), font_size=int(fs * 0.85), color=ENCRE, weight=BOLD)).move_to(pt(v, 0.69 * r))
            for v in range(0, maxi, pas)}
    u = hors_audit(Text(unite, font_size=int(fs * 0.9), color="#475569")).move_to(c + DOWN * 0.3 * r)
    aig = Line(c, pt(valeur, r - 0.1), color=ROUGE_ERREUR, stroke_width=6)
    g = VGroup(corps, face, *traits.values(), *nums.values(), u, aig, axe)
    if plateau:
        pl = Ellipse(width=2 * r, height=0.36, fill_color="#cbd5e1", fill_opacity=1, stroke_color="#94a3b8",
                     stroke_width=2).next_to(corps, UP, buff=-0.06)
        g.add_to_back(pl)
        g.plateau = pl
    g.angle, g.pt, g.traits, g.nums, g.aiguille, g.axe, g.valeur = angle, pt, traits, nums, aig, axe, valeur
    return g


def tourner(cad, v, run_time=0.8):
    """L'animation de l'aiguille du cadran vers la valeur v."""
    a = cad.angle(v) - cad.angle(cad.valeur)
    cad.valeur = v
    return Rotate(cad.aiguille, a, about_point=cad.axe.get_center(), run_time=run_time)


def regle(v0, v1, pas, n, larg, fs=30, num_dessous=True, couleur=ENCRE):
    """Une graduation DROITE de v0 à v1 (la loupe d'un cadran, la fenêtre d'un pèse-personne) :
    un nombre tous les `pas` (hors audit), `n` intervalles entre deux nombres. g.x(v), g.traits {v: Line}."""
    def x(v):
        return -larg / 2 + (v - v0) / (v1 - v0) * larg

    base = Line(P(x(v0), 0), P(x(v1), 0), color=couleur, stroke_width=4)
    traits, petit = {}, pas / n
    for k in range(int(round((v1 - v0) / petit)) + 1):
        v = round(v0 + k * petit, 6)
        grand = k % n == 0
        L = 0.5 if grand else 0.28
        traits[v] = Line(P(x(v), 0), P(x(v), L), color=couleur, stroke_width=5 if grand else 3)
    nums = {}
    v = v0
    while v <= v1 + 1e-9:
        t = hors_audit(Text(str(int(v)), font_size=fs, color=couleur, weight=BOLD))
        t.next_to(P(x(v), 0), DOWN if num_dessous else UP, buff=0.15)
        nums[int(v)] = t
        v += pas
    g = VGroup(base, *traits.values(), *nums.values())
    g.x_ = x
    g.traits, g.nums = traits, nums

    def pos(v):
        return base.get_left() + RIGHT * (x(v) - x(v0))

    g.pos = pos
    return g


def pese_personne_aiguille(v0=20, v1=50, valeur=34, larg=5.2):
    """Un pèse-personne vu de dessus : la fenêtre montre la graduation (de 10 en 10 kg, 10 petits traits),
    l'aiguille rouge fixe au milieu de la fenêtre. g.regle, g.aiguille."""
    corps = RoundedRectangle(width=larg, height=larg * 0.78, corner_radius=0.5, fill_color="#e5e7eb",
                             fill_opacity=1, stroke_color="#9ca3af", stroke_width=4)
    fen = RoundedRectangle(width=larg - 0.5, height=1.55, corner_radius=0.15, fill_color=WHITE, fill_opacity=1,
                           stroke_color="#475569", stroke_width=3).move_to(corps.get_top() + DOWN * 1.05)
    rg = regle(v0, v1, 10, 10, larg - 1.4, fs=30)
    rg.move_to(fen).shift(UP * 0.1)
    aig = Line(rg.pos(valeur) + DOWN * 0.15, rg.pos(valeur) + UP * 0.75, color=ROUGE_ERREUR, stroke_width=6)
    u = hors_audit(Text("kg", font_size=22, color="#475569")).next_to(fen, DOWN, buff=0.12).shift(RIGHT * 1.6)
    pieds = VGroup(*[RoundedRectangle(width=1.1, height=1.25, corner_radius=0.45, fill_color="#cbd5e1",
                                      fill_opacity=1, stroke_width=0).move_to(corps.get_center() + P(dx, -0.95))
                     for dx in (-0.85, 0.85)])
    g = VGroup(corps, fen, pieds, rg, u, aig)
    g.regle, g.aiguille = rg, aig
    return g


class MasseMesurerCM1Base(MasseChoisirUniteCE2Base):
    nom_voix = "cm1-masse-mesurer"
    fichier_marques = "masse_cm1_mesurer_marques.json"
    ceinture = "jaune"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Lire une masse", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Lire")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        cad = cadran(r=1.2, fs=16).move_to(P(-1.9, 0.3))
        self.au_mot("Où pointe")
        self.play(FadeIn(cad, shift=UP * 0.2), run_time=0.4)
        self.au_mot("l'aiguille")
        self.play(tourner(cad, 460, 0.9))
        q = self.t("?", 110, JAUNE_TITRE).move_to(P(1.2, 0.5))
        self.au_mot("balance")
        self.play(FadeIn(q, scale=1.3), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 01 : Kenza, herboriste ──────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        X = 0.3
        pk = kenza(1.45).move_to(P(-5.45, -0.2))
        nom = self.t("Kenza", 42, HERBE).next_to(pk, UP, buff=0.3)
        self.au_mot("Voici Kenza")
        self.play(FadeIn(pk, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        met = self.t("herboriste", 28, HERBE).next_to(pk, DOWN, buff=0.15)
        l0 = self.t("Elle vend des plantes", 38, WHITE)
        l0b = self.t("pour les tisanes.", 38, WHITE)
        gauche(l0, X, 2.5)
        gauche(l0b, X, 1.75)
        self.au_mot("herboriste")
        self.play(FadeIn(met), run_time=0.3)
        bq = bouquet(1.3).move_to(P(-2.5, 1.2))
        self.au_mot("elle vend")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(bq, shift=UP * 0.2), run_time=0.4)
        self.au_mot("tisanes")
        self.play(FadeIn(l0b, shift=UP * 0.1), run_time=0.3)
        cad = cadran(r=1.0, fs=14).move_to(P(-2.5, -1.65))
        l1 = self.t("Elle les pèse sur", 36, GRAY_B)
        l1b = self.t("une balance à aiguille.", 36, JAUNE_TITRE)
        gauche(l1, X, 0.45)
        gauche(l1b, X, -0.3)
        self.au_mot("Elle les")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(cad, shift=UP * 0.2), run_time=0.4)
        self.au_mot("balance")
        self.play(FadeIn(l1b, shift=UP * 0.1),
                  bq.animate.move_to(cad.plateau.get_center() + UP * 0.05, aligned_edge=DOWN),
                  tourner(cad, 460, 0.8))
        self.attendre_voix()

    # ── 02 et 03 : le cadran et sa loupe ────────────────────────────────────
    def poste(self):
        """Le grand cadran à gauche, la loupe (graduation de 400 à 500 en grand) à droite."""
        cad = cadran(r=1.95, fs=24).move_to(P(-4.15, -0.45))
        lp = regle(400, 500, 100, 5, 5.0, fs=34, couleur=WHITE)
        lp.move_to(P(2.3, -0.3))
        cadre = RoundedRectangle(width=lp.width + 0.7, height=2.45, corner_radius=0.15, stroke_color=GRAY_B,
                                 stroke_width=2).move_to(lp.get_bottom() + UP * 1.1)
        fils = VGroup(DashedLine(cad.pt(400, cad.width / 2 - 0.3), cadre.get_corner(DL), color=GRAY_B,
                                 stroke_width=2),
                      DashedLine(cad.pt(500, cad.width / 2 - 0.3), cadre.get_corner(UL), color=GRAY_B,
                                 stroke_width=2))
        return cad, lp, VGroup(cadre, fils)

    def ecran_graduation(self):
        self.ecran("02-graduation")
        X = -1.0
        cad, lp, loupe = self.poste()
        l0 = self.t("D'abord : la graduation.", 40, JAUNE_TITRE)
        gauche(l0, X, 2.75)
        self.au_mot("D'abord")
        self.play(FadeIn(cad, shift=UP * 0.2), FadeIn(l0, shift=UP * 0.1), run_time=0.45)
        l1 = base_commune(self.ligne([("De", WHITE), ("100", C_G), ("en", WHITE), ("100 g", C_G)], 38, buff=0.18))
        gauche(l1, X, 1.95)
        self.au_mot("Les nombres")
        self.play(*[Indicate(cad.nums[v], color=BLEU_D, scale_factor=1.3) for v in (300, 400, 500, 600)],
                  run_time=0.6)
        self.au_mot("100 en 100")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Entre deux")
        jaune = [cad.traits[v] for v in (420, 440, 460, 480)]
        self.play(Create(loupe), FadeIn(lp, shift=LEFT * 0.3),
                  *[t.animate.set_color(JAUNE_TITRE).set_stroke(width=4) for t in jaune], run_time=0.6)
        rangs = VGroup()
        for k in range(5):
            m = muet(self.t(str(k + 1), 28, ORANGE_RETENUE))
            m.move_to((lp.pos(400 + 20 * k) + lp.pos(420 + 20 * k)) / 2 + UP * 0.9)
            rangs.add(m)
        segs = VGroup(*[Line(lp.pos(400 + 20 * k), lp.pos(420 + 20 * k),
                             color=(ORANGE_RETENUE, JAUNE_TITRE)[k % 2], stroke_width=9) for k in range(5)])
        l2 = base_commune(self.ligne([("5", ORANGE_RETENUE), ("intervalles :", WHITE)], 38, buff=0.18))
        gauche(l2, X, -1.5)
        self.au_mot("5 intervalles")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.25)
        for sg, m in zip(segs, rangs):
            self.play(Create(sg), FadeIn(m, scale=1.2), run_time=0.17)
        l3 = base_commune(self.ligne([("chacun vaut", WHITE), ("20 g", C_G)], 38, buff=0.2))
        gauche(l3, X, -2.2)
        vingts = VGroup(*[self.t("20 g", 28, C_G).move_to(m) for m in rangs])
        for v in vingts[1:]:
            muet(v)
        self.au_mot("chacun")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("20 grammes")
        self.play(FadeIn(l3[1], shift=UP * 0.1), *[ReplacementTransform(m, v) for m, v in zip(rangs, vingts)],
                  run_time=0.4)
        calc = muet(self.t("100 g ÷ 5 = 20 g", 30, GRAY_B))
        gauche(calc, X, -2.95)
        self.play(FadeIn(calc, shift=UP * 0.1), run_time=0.3)
        self.insister(l3[1], 1.2, 0.25)
        self.attendre_voix()

    # ── 03 : lire (3 petits traits après 400 → 460 g) ───────────────────────
    def ecran_lire(self):
        self.ecran("03-lire")
        X = -1.0
        cad, lp, loupe = self.poste()
        for v in (420, 440, 460, 480):
            cad.traits[v].set_color(JAUNE_TITRE).set_stroke(width=4)
        self.play(FadeIn(cad), FadeIn(lp), FadeIn(loupe), run_time=0.3)
        fl = Arrow(lp.pos(460) + UP * 1.35, lp.pos(460) + UP * 0.05, buff=0, color=ROUGE_ERREUR,
                   stroke_width=7, max_tip_length_to_length_ratio=0.3)
        self.au_mot("L'aiguille")
        self.play(tourner(cad, 460, 0.9), GrowArrow(fl))
        compte = VGroup()
        for k, v in enumerate((420, 440, 460)):
            m = muet(self.t(str(k + 1), 30, ORANGE_RETENUE)).move_to((lp.pos(v - 20) + lp.pos(v)) / 2 + UP * 0.9)
            compte.add(m)
        l0 = base_commune(self.ligne([("3", ORANGE_RETENUE), ("petits traits", WHITE)], 38, buff=0.18))
        gauche(l0, X, 2.75)
        self.au_mot("3 petits")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.25)
        for k, v in enumerate((420, 440, 460)):
            self.play(lp.traits[v].animate.set_color(ORANGE_RETENUE).set_stroke(width=7), FadeIn(compte[k]),
                      run_time=0.2)
        l1 = base_commune(self.ligne([("après", WHITE), ("400.", C_G)], 38, buff=0.18))
        gauche(l1, X, 2.05)
        self.au_mot("après")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("400.")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Indicate(lp.nums[400], color=C_G, scale_factor=1.3),
                  run_time=0.35)
        l2 = base_commune(self.ligne([("400", C_G), ("+ 3", ORANGE_RETENUE), ("× 20", C_G)], 46, buff=0.25))
        gauche(l2, X, -1.6)
        self.morceaux(l2, ("400 plus", "3 fois", "20 :"))
        l3 = base_commune(self.ligne([("=", WHITE), ("460 g", JAUNE_TITRE)], 54, buff=0.25))
        gauche(l3, X, -2.6)
        self.au_mot("460 grammes")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.insister(l3[1], 1.2, 0.25)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (au milieu de 500 et 600) ───────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()

        def avant_q(sc):
            sc._q_mots = {0: "100 en 100", 1: "L'aiguille", 2: "500 et", 3: "600."}

        self._ph_mots = {(0, 0): "Au milieu", (1, 0): "500 et", (1, 1): "600,", (2, 0): "550 grammes"}
        self.question_gauche("04-question", "04b-reponse",
                             ["De 100 en 100 g.", "L'aiguille : au milieu", "de 500", "et 600."],
                             [self.choix(abr(c_), fs=26) for c_ in Q1["choix"]], Q1["reponse"],
                             ["Au milieu", "de 500 et 600 :", "550 g."],
                             -0.2, couper={1: ("de 500", "et 600 :")},
                             mot_q="Les nombres", avant_q=avant_q)
        self._ph_mots, self._q_apres = {}, {}

    # ── 05 : balance à plateaux (500 g + 200 g + 50 g = 750 g) ──────────────
    def ecran_masses(self):
        self.ecran("05-masses")
        X = -0.3
        l0 = self.t("Balance à plateaux :", 40, JAUNE_TITRE)
        l0b = self.t("on additionne les masses.", 36, WHITE)
        gauche(l0, X, 2.6)
        gauche(l0b, X, 1.85)
        b = Balance(4.4, 0.0, s=1.25).move_to(P(-3.7, -0.8))
        sk = sachet("? g", 1.1)
        b.poser(sk, "g")
        self.au_mot("Sur une")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(b, shift=UP * 0.2), run_time=0.4)
        self.au_mot("on additionne")
        self.play(FadeIn(l0b, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Kenza")
        self.play(FadeIn(sk, shift=DOWN * 0.4), run_time=0.3)
        basculer(self, b, 0.8, [sk], [], run_time=0.5)
        ms = [masse_marquee(t, sc) for t, sc in (("500 g", 1.1), ("200 g", 0.95), ("50 g", 0.8))]
        rang = VGroup(*[m.copy() for m in ms]).arrange(RIGHT, buff=0.02, aligned_edge=DOWN)
        l1 = base_commune(self.ligne([("500 g", C_G), ("+ 200 g", C_G), ("+ 50 g", C_G)], 40, buff=0.22))
        gauche(l1, X + 0.5, 0.55)
        penches = (0.45, 0.12, 0.0)
        poses = []
        for k, (m, mot) in enumerate(zip(ms, ("500 grammes", "200 grammes", "50 grammes"))):
            rang.move_to(b.sur("d"), aligned_edge=DOWN)
            m.move_to(rang[k])
            self.au_mot(mot)
            self.play(FadeIn(m, shift=DOWN * 0.4), FadeIn(l1[k], shift=UP * 0.1), run_time=0.3)
            poses.append(m)
            basculer(self, b, penches[k], [sk], poses, run_time=0.45)
        l2 = base_commune(self.ligne([("=", WHITE), ("750 g", JAUNE_TITRE)], 54, buff=0.25))
        gauche(l2, X + 0.5, -0.65)
        n = sachet("750 g", 1.1).move_to(sk)
        self.au_mot("750 grammes")
        self.play(FadeIn(l2, shift=UP * 0.1), Transform(sk, n), run_time=0.35)
        eq = muet(self.t("équilibre !", 32, VERT_OK)).next_to(b, DOWN, buff=0.2)
        self.play(FadeIn(eq, scale=1.1), run_time=0.3)
        self.insister(l2[1], 1.2, 0.25)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (2 kg, 200 g et 100 g) ──────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()

        def avant_q(sc):
            sc._q_mots = {0: "Pour", 1: "2 kilogrammes,", 2: "200 grammes", 3: "100 grammes."}

        self._ph_mots = {(0, 0): "2 kilogrammes,", (1, 0): "2 000 grammes.", (2, 0): 3.96, (2, 1): "200 plus",
                         (3, 0): "100 :", (4, 0): "2 300 grammes"}
        self.question_gauche("06-question", "06b-reponse",
                             ["Pour équilibrer un paquet :", "2 kg,", "200 g", "et 100 g."],
                             [self.choix(abr(c_), fs=26) for c_ in Q2["choix"]], Q2["reponse"],
                             ["2 kg =", "2 000 g.", "2 000 + 200", "+ 100 =", "2 300 g."],
                             -0.4, couper={2: ("2 000", "+ 200")},
                             mot_q="Pour", avant_q=avant_q)
        self._ph_mots, self._q_apres = {}, {}

    # ── 07 : le défi (pèse-personne, 4 traits après 30) ─────────────────────
    def ecran_defi(self):
        self.ecran("07-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        X = 0.3
        pp = pese_personne_aiguille(larg=6.0).move_to(P(-3.6, -0.3))
        l0 = base_commune(self.ligne([("De", WHITE), ("10", C_KG), ("en", WHITE), ("10 kg.", C_KG)], 38, buff=0.18))
        gauche(l0, X, 2.2)
        self.au_mot("Sur le")
        self.play(FadeIn(pp, shift=UP * 0.2), run_time=0.4)
        self.au_mot("10 en 10")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        l1 = self.t("Entre deux nombres :", 36, GRAY_B)
        l1b = base_commune(self.ligne([("10", ORANGE_RETENUE), ("petits traits.", WHITE)], 38, buff=0.18))
        gauche(l1, X, 1.4)
        gauche(l1b, X, 0.7)
        self.au_mot("Entre deux")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("10 petits")
        self.play(FadeIn(l1b, shift=UP * 0.1),
                  *[pp.regle.traits[v].animate.set_color(ORANGE_RETENUE) for v in range(31, 40)], run_time=0.4)
        l2 = base_commune(self.ligne([("L'aiguille :", WHITE), ("4", ORANGE_RETENUE), ("traits", WHITE)], 38,
                                     buff=0.18))
        l2b = base_commune(self.ligne([("après", WHITE), ("30.", C_KG)], 38, buff=0.18))
        gauche(l2, X, -0.25)
        gauche(l2b, X, -0.95)
        self.au_mot("L'aiguille")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(pp.aiguille, color=ROUGE_ERREUR, scale_factor=1.15),
                  run_time=0.35)
        self.morceaux(l2[1:], ("4 traits", None))
        self.morceaux(l2b, ("après", "30."))
        q = self.t("Quelle masse ?", 46, JAUNE_TITRE)
        gauche(q, X, -1.95)
        self.au_mot("Quelle masse")
        self.play(FadeIn(q, scale=1.1), run_time=0.3)
        self.au_mot("Mets pause")
        p = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(p, -6.3, -3.2)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("07b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        X = 0.3
        pp = pese_personne_aiguille(larg=4.3).move_to(P(-4.4, 1.2))
        lp = regle(30, 40, 10, 10, 5.0, fs=34, couleur=WHITE).move_to(P(-3.55, -2.05))
        cadre = RoundedRectangle(width=lp.width + 0.6, height=2.0, corner_radius=0.15, stroke_color=GRAY_B,
                                 stroke_width=2).move_to(lp.get_bottom() + UP * 0.92)
        fils = VGroup(DashedLine(pp.regle.pos(30), cadre.get_corner(UL), color=GRAY_B, stroke_width=2),
                      DashedLine(pp.regle.pos(40), cadre.get_corner(UR), color=GRAY_B, stroke_width=2))
        fl = Arrow(lp.pos(34) + UP * 1.0, lp.pos(34) + UP * 0.02, buff=0, color=ROUGE_ERREUR, stroke_width=7,
                   max_tip_length_to_length_ratio=0.3)
        self.play(FadeIn(pp), run_time=0.3)
        self.play(Create(cadre), Create(fils), FadeIn(lp, shift=DOWN * 0.2), GrowArrow(fl), run_time=0.5)
        l0 = base_commune(self.ligne([("10", ORANGE_RETENUE), ("traits pour", WHITE), ("10 kg :", C_KG)], 38,
                                     buff=0.18))
        gauche(l0, X, 2.2)
        self.morceaux(l0, ("10 petits", None, "10 kilogrammes"))
        l1 = base_commune(self.ligne([("1 trait", ORANGE_RETENUE), ("=", WHITE), ("1 kg.", C_KG)], 44, buff=0.22))
        gauche(l1, X, 1.3)
        self.au_mot("chaque trait")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(l1[1]), run_time=0.3)
        self.au_mot("1 kilogramme")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        self.insister(l1, 1.1, 0.25)
        compte = VGroup()
        for k, v in enumerate((31, 32, 33, 34)):
            m = muet(self.t(str(k + 1), 28, ORANGE_RETENUE)).move_to((lp.pos(v - 1) + lp.pos(v)) / 2 + UP * 0.75)
            compte.add(m)
        l2 = base_commune(self.ligne([("4", ORANGE_RETENUE), ("traits après", WHITE), ("30 :", C_KG)], 38,
                                     buff=0.18))
        gauche(l2, X, 0.15)
        self.au_mot("4 traits")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        for k, v in enumerate((31, 32, 33, 34)):
            seg = Line(lp.pos(v - 1), lp.pos(v), color=(ORANGE_RETENUE, JAUNE_TITRE)[k % 2], stroke_width=9)
            self.play(lp.traits[v].animate.set_color(ORANGE_RETENUE).set_stroke(width=6), Create(seg),
                      FadeIn(compte[k]), run_time=0.15)
        self.au_mot("30 :")
        self.play(FadeIn(l2[2], shift=UP * 0.1), Indicate(lp.nums[30], color=C_KG, scale_factor=1.3),
                  run_time=0.3)
        l3 = base_commune(self.ligne([("30 + 4 =", WHITE), ("34 kg", JAUNE_TITRE)], 54, buff=0.25))
        muet(l3[0])
        gauche(l3, X, -1.0)
        self.au_mot("34 kilogrammes")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.insister(l3[1], 1.2, 0.25)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.65)
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        cad = cadran(r=1.15, valeur=460, fs=15).move_to(P(-4.7, 0.75))
        b = Balance(3.2, 0.0, s=0.7).move_to(P(-4.35, -2.0))
        sk = sachet(None, 0.75)
        b.poser(sk, "g")
        mm = VGroup(masse_marquee("500 g", 0.7), masse_marquee("200 g", 0.7)).arrange(RIGHT, buff=0.05)
        b.poser(mm, "d")
        hors_audit(VGroup(cad, b, sk, mm))
        X = -1.9
        l0 = self.t("Pour lire une balance :", 36, WHITE)
        l0b = self.t("ce que vaut un petit trait.", 36, VERT_OK)
        gauche(l0, X, 1.55)
        gauche(l0b, X, 0.85)
        self.au_mot("Pour lire")
        self.play(FadeIn(cad, shift=UP * 0.2), FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("ce que")
        self.play(FadeIn(l0b, shift=UP * 0.1), run_time=0.35)
        l1 = self.t("Balance à plateaux :", 36, WHITE)
        l1b = self.t("on additionne les masses.", 36, JAUNE_TITRE)
        gauche(l1, X, -0.6)
        gauche(l1b, X, -1.3)
        self.au_mot("Sur une")
        self.play(FadeIn(VGroup(b, sk, mm), shift=UP * 0.2), FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("on additionne")
        self.play(FadeIn(l1b, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix(marge=1.8)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_graduation()
        self.ecran_lire()
        self.ecran_question1()
        self.ecran_masses()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        ecran_fin(self, "paysage", voix="09-abonne")


class MasseMesurerCM1(MasseMesurerCM1Base):
    identite = "Maths CM1 — EleveAI"
    ceinture = "jaune"
