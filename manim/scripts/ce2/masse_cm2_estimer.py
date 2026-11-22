# masse_cm2_estimer.py
# EleveAI — Maths CM2 — série « Masses » (CP → CM2), ÉPISODE CM2 03 : estimer une masse
# (micro masse_estimer, notion masse), AVEC VOIX.
# Paysage 16:9, CEINTURE JAUNE. Short jumeau (blanche) : film Ti Margo (un grain de riz pèse-t-il 1 g ?).
# Décor et métier : Juliette, OCÉANOGRAPHE (elle étudie la mer et ses animaux, elle estime la masse des baleines).
# Mapping micro → écrans : 02 (la baleine bleue : 150 t = 150 000 kg ≈ 150 voitures), 03 (des repères : un poisson
# de 1,2 kg ≈ une brique de lait ; une tortue de 150 kg ≈ deux adultes), 04 question (un dauphin ≈ 200 kg),
# 05 piège (le crabe : 0,5 kg, pas 0,5 t = 500 kg), 06 question (le cartable de « 4 500 kg » : 4 500 g),
# 07 défi (crevette, requin, orque ↔ 8 g, 300 kg, 5 t), 07b correction, 08 ce que tu as appris, 09 fin commune.
# Voix : manim/voix/cm2-masse-estimer.json (source : masse_voix.py, validée le 16/11).
# Marques : python manim/scripts/ce2/perimetre_marques.py masse:estimer:cm2
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/masse_cm2_estimer.py MasseEstimerCM2
# Sortie : manim/sorties/cm2/maths/masse/03-estimer/eleveai-maths-cm2-masse-estimer.mp4

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))  # dossier manim/ (fin_commune)

from masse_commun import *  # noqa: E402,F403
from masse_choisir_unite import MasseChoisirUniteCE2Base  # noqa: E402
from masse_cm1_comparer import abr, muet  # noqa: E402
from masse_cm1_estimer import baleine, croix  # noqa: E402
from masse_relations import camion_m  # noqa: E402
from fin_commune import ecran_fin  # noqa: E402

_V = {e["id"]: e for e in json.load(open(Path(__file__).resolve().parent / "masse_voix.json", encoding="utf-8"))}
EP = _V["cm2-masse-estimer"]
Q1, Q2 = EP["questions"]
C_G, C_KG, C_T = BLEU_D, VERT_OK, LOURD
OCEAN = "#0e7490"
ROUGE_X = "#ef4444"
CONTOUR = dict(stroke_color="#1f2937", stroke_width=2)


def juliette(s=1.0):
    """Juliette, océanographe : combinaison bleu pétrole, masque de plongée relevé sur le front, tablette étanche."""
    p = visage(personne(peau="#8d5524", tenue=OCEAN, cheveux="#111827", longs=True, s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    sangle = Arc(radius=r * 1.02, start_angle=0.15, angle=PI - 0.3, stroke_color="#0f172a",
                 stroke_width=5 * s).move_arc_center_to(c)
    masque = RoundedRectangle(width=r * 1.5, height=r * 0.55, corner_radius=r * 0.2, fill_color="#7dd3fc",
                              fill_opacity=0.9, stroke_color="#0f172a", stroke_width=3).move_to(c + UP * r * 0.78)
    cou = p.tete.get_bottom()
    tab = RoundedRectangle(width=r * 1.1, height=r * 0.8, corner_radius=r * 0.08, fill_color="#fbbf24",
                           fill_opacity=1, stroke_color="#78350f", stroke_width=2).move_to(cou + P(r * 1.2, -r * 1.9))
    ecran_t = Rectangle(width=r * 0.8, height=r * 0.5, fill_color="#164e63", fill_opacity=1,
                        stroke_width=0).move_to(tab)
    vague = VMobject(stroke_color="#67e8f9", stroke_width=2).set_points_smoothly(
        [ecran_t.get_left() + P(r * 0.05, 0), ecran_t.get_center() + P(-r * 0.15, r * 0.1),
         ecran_t.get_center() + P(r * 0.15, -r * 0.1), ecran_t.get_right() + P(-r * 0.05, 0)])
    p.add(sangle, masque, tab, ecran_t, vague)
    return p


def adulte(s=1.0, tenue="#6366f1", peau="#e0ac69", longs=False):
    return visage(personne(peau=peau, tenue=tenue, cheveux="#3f2a14", longs=longs, s=s))


def deux_adultes(s=1.0):
    return VGroup(adulte(s, "#6366f1"), adulte(s, "#db2777", "#8d5524", True)).arrange(RIGHT, buff=0.15 * s)


def dauphin(s=1.0):
    """Un dauphin de profil, tête à droite : corps gris-bleu, rostre, nageoire dorsale, queue."""
    cp = Ellipse(width=2.0 * s, height=0.62 * s, fill_color="#60a5fa", fill_opacity=1, **CONTOUR)
    vt = Ellipse(width=1.3 * s, height=0.24 * s, fill_color="#cbd5e1", fill_opacity=1, stroke_width=0)
    vt.move_to(P(0.15 * s, -0.17 * s))
    ro = Ellipse(width=0.5 * s, height=0.16 * s, fill_color="#60a5fa", fill_opacity=1, **CONTOUR)
    ro.move_to(P(1.05 * s, -0.08 * s))
    do = Polygon(P(-0.25 * s, 0.27 * s), P(-0.2 * s, 0.55 * s), P(0.2 * s, 0.27 * s), fill_color="#3b82f6",
                 fill_opacity=1, **CONTOUR)
    qu = Polygon(P(-0.95 * s, 0.0), P(-1.35 * s, 0.32 * s), P(-1.22 * s, 0.0), P(-1.35 * s, -0.32 * s),
                 fill_color="#3b82f6", fill_opacity=1, **CONTOUR)
    oe = Dot(P(0.68 * s, 0.05 * s), radius=0.045 * s, color="#111827")
    sourire = Arc(radius=0.18 * s, start_angle=-PI / 2 - 0.6, angle=0.9, stroke_color="#1e3a8a",
                  stroke_width=2).move_to(P(0.85 * s, -0.08 * s))
    return VGroup(qu, do, ro, cp, vt, oe, sourire)


def tortue_mer(s=1.0):
    """Une tortue de mer vue de dessus, tête à droite : carapace verte à écailles, 4 nageoires."""
    vert = "#65a30d"
    pattes = VGroup(*[Ellipse(width=0.62 * s, height=0.22 * s, fill_color=vert, fill_opacity=1, **CONTOUR)
                      .rotate(a).move_to(P(dx * s, dy * s))
                      for dx, dy, a in ((0.4, 0.5, 0.55), (0.4, -0.5, -0.55), (-0.45, 0.4, -0.5),
                                        (-0.45, -0.4, 0.5))])
    car = Ellipse(width=1.45 * s, height=1.0 * s, fill_color="#3f6212", fill_opacity=1, stroke_color="#1a2e05",
                  stroke_width=3)
    motif = VGroup(*[RegularPolygon(6, fill_color="#84cc16", fill_opacity=0.7, stroke_width=0)
                     .scale(0.15 * s).move_to(P(dx * s, dy * s))
                     for dx, dy in ((0, 0), (-0.32, 0.2), (0.32, 0.2), (-0.32, -0.2), (0.32, -0.2))])
    tete = Ellipse(width=0.42 * s, height=0.32 * s, fill_color=vert, fill_opacity=1, **CONTOUR)
    tete.move_to(P(0.88 * s, 0))
    oe = Dot(P(0.98 * s, 0.06 * s), radius=0.035 * s, color="#111827")
    return VGroup(pattes, tete, car, motif, oe)


def crabe(s=1.0):
    """Un crabe rouge vu de face : carapace, deux pinces, pattes, yeux sur tiges."""
    rouge = "#dc2626"
    pattes = VGroup(*[Line(P(u * 0.35 * s, y * s), P(u * 0.85 * s, (y - 0.25) * s), color="#991b1b",
                           stroke_width=6 * s) for u in (-1, 1) for y in (0.0, -0.12, -0.24)])
    car = Ellipse(width=1.1 * s, height=0.7 * s, fill_color=rouge, fill_opacity=1, **CONTOUR)
    pinces = VGroup()
    for u in (-1, 1):
        bras = Line(P(u * 0.45 * s, 0.15 * s), P(u * 0.75 * s, 0.5 * s), color=rouge, stroke_width=8 * s)
        pi_ = Circle(radius=0.2 * s, fill_color=rouge, fill_opacity=1, **CONTOUR).move_to(P(u * 0.8 * s, 0.62 * s))
        pinces.add(bras, pi_)
    yeux = VGroup()
    for u in (-1, 1):
        yeux.add(Line(P(u * 0.15 * s, 0.3 * s), P(u * 0.2 * s, 0.5 * s), color="#991b1b", stroke_width=3),
                 Circle(radius=0.07 * s, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(u * 0.2 * s, 0.53 * s)),
                 Dot(P(u * 0.2 * s, 0.53 * s), radius=0.035 * s, color="#111827"))
    return VGroup(pattes, pinces, car, yeux)


def requin(s=1.0):
    """Un requin de profil, tête à droite : gris, grande nageoire dorsale, queue en croissant, branchies."""
    gris = "#94a3b8"
    cp = Ellipse(width=2.2 * s, height=0.6 * s, fill_color=gris, fill_opacity=1, **CONTOUR)
    vt = Ellipse(width=1.4 * s, height=0.2 * s, fill_color="#e2e8f0", fill_opacity=1, stroke_width=0)
    vt.move_to(P(0.2 * s, -0.17 * s))
    do = Polygon(P(-0.25 * s, 0.26 * s), P(0.0, 0.85 * s), P(0.3 * s, 0.26 * s), fill_color="#64748b",
                 fill_opacity=1, **CONTOUR)
    qu = Polygon(P(-1.05 * s, 0.0), P(-1.45 * s, 0.6 * s), P(-1.25 * s, 0.0), P(-1.4 * s, -0.4 * s),
                 fill_color="#64748b", fill_opacity=1, **CONTOUR)
    br = VGroup(*[Line(P(x * s, 0.1 * s), P((x - 0.04) * s, -0.1 * s), color="#334155", stroke_width=2)
                  for x in (0.55, 0.65, 0.75)])
    oe = Dot(P(0.85 * s, 0.07 * s), radius=0.04 * s, color="#111827")
    return VGroup(qu, do, cp, vt, br, oe)


def orque(s=1.0):
    """Une orque de profil, tête à droite : noire, ventre et tache blancs, grande nageoire dorsale."""
    noir = "#111827"
    bord = dict(stroke_color="#94a3b8", stroke_width=2)
    cp = Ellipse(width=2.4 * s, height=0.8 * s, fill_color=noir, fill_opacity=1, **bord)
    vt = Ellipse(width=1.5 * s, height=0.28 * s, fill_color=WHITE, fill_opacity=1, stroke_width=0)
    vt.move_to(P(0.25 * s, -0.22 * s))
    tache = Ellipse(width=0.34 * s, height=0.16 * s, fill_color=WHITE, fill_opacity=1, stroke_width=0)
    tache.move_to(P(0.7 * s, 0.15 * s))
    do = Polygon(P(-0.3 * s, 0.35 * s), P(-0.05 * s, 1.05 * s), P(0.2 * s, 0.35 * s), fill_color=noir,
                 fill_opacity=1, **bord)
    qu = Polygon(P(-1.15 * s, 0.0), P(-1.55 * s, 0.38 * s), P(-1.4 * s, 0.0), P(-1.55 * s, -0.38 * s),
                 fill_color=noir, fill_opacity=1, **bord)
    return VGroup(qu, do, cp, vt, tache)


def rangee_voitures(n=5, s=0.5):
    cs = ("#3b82f6", "#ef4444", "#22c55e", "#f59e0b", "#a855f7")
    return VGroup(*[voiture_m(s, cs[k % len(cs)]) for k in range(n)]).arrange(RIGHT, buff=0.18)


class MasseEstimerCM2Base(MasseChoisirUniteCE2Base):
    nom_voix = "cm2-masse-estimer"
    fichier_marques = "masse_cm2_estimer_marques.json"
    ceinture = "jaune"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Estimer une masse", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Estimer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        ba = baleine(1.7).move_to(P(-3.3, 0.7))
        self.au_mot("baleine")
        self.play(FadeIn(ba, shift=RIGHT * 0.4), run_time=0.4)
        us = [self.t(s_, 52, c) for s_, c in (("150 kg ?", C_KG), ("150 t ?", C_T))]
        for u, x in zip(us, (0.9, 4.5)):
            u.move_to(P(x, 0.7))
        base_commune(VGroup(*us))
        for u, mot in zip(us, ("150 kilogrammes,", "ou 150 tonnes")):
            self.au_mot(mot)
            self.play(FadeIn(u, scale=1.15), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 01 : Juliette, océanographe ─────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        X = -2.4
        pj = juliette(1.45).move_to(P(-5.3, -0.2))
        nom = self.t("Juliette", 42, "#22d3ee").next_to(pj, UP, buff=0.3)
        self.au_mot("Juliette.")
        self.play(FadeIn(pj, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        l0 = self.t("Océanographe", 42, JAUNE_TITRE)
        gauche(l0, X, 2.4)
        self.au_mot("océanographe")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        l1 = self.t("Elle étudie la mer", 36, WHITE)
        l1b = self.t("et ses animaux.", 36, WHITE)
        gauche(l1, X, 1.5)
        gauche(l1b, X, 0.8)
        self.au_mot("étudie")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("animaux")
        self.play(FadeIn(l1b, shift=UP * 0.1), run_time=0.3)
        ba = baleine(1.35).move_to(P(4.6, 1.3))
        l2 = self.t("Elle estime la masse", 36, WHITE)
        l2b = self.t("des baleines…", 36, WHITE)
        gauche(l2, X, -0.4)
        gauche(l2b, X, -1.1)
        self.au_mot("estime")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("baleines")
        self.play(FadeIn(l2b, shift=UP * 0.1), FadeIn(ba, shift=LEFT * 0.4), run_time=0.4)
        bal = balance_electronique("? kg", 1.1).move_to(P(5.0, -0.6))
        hors_audit(bal)
        l3 = self.t("sans pouvoir les peser !", 36, ORANGE_RETENUE)
        gauche(l3, X, -2.2)
        self.au_mot("sans pouvoir")
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(bal, shift=UP * 0.2), run_time=0.35)
        self.au_mot("peser")
        self.play(Create(croix(bal)), run_time=0.4)
        self.attendre_voix()

    # ── 02 : la baleine bleue (150 t = 150 000 kg ≈ 150 voitures) ───────────
    def ecran_baleine(self):
        self.ecran("02-baleine")
        tit = self.t("La baleine bleue", 46, JAUNE_TITRE).move_to(P(0, 3.0))
        self.au_mot("Une baleine")
        self.play(Write(tit), run_time=0.4)
        ba = baleine(2.1).move_to(P(-3.6, 1.2))
        self.play(FadeIn(ba, shift=RIGHT * 0.4), run_time=0.4)
        X = 0.4
        l1 = base_commune(self.ligne([("environ", WHITE), ("150 t", C_T)], 46, buff=0.25))
        gauche(l1, X, 1.6)
        self.au_mot("environ")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("150 tonnes")
        self.play(FadeIn(l1[1], scale=1.15), run_time=0.3)
        l2 = base_commune(self.ligne([("=", WHITE), ("150 000 kg", C_KG)], 46, buff=0.25))
        gauche(l2, X, 0.6)
        self.au_mot("soit")
        self.play(FadeIn(l2[0]), run_time=0.25)
        self.au_mot("150 000")
        self.play(FadeIn(l2[1], scale=1.15), run_time=0.3)
        rv = rangee_voitures(5, 0.55).move_to(P(-2.9, -1.6))
        l3 = base_commune(self.ligne([("≈", WHITE), ("150 voitures !", ORANGE_RETENUE)], 44, buff=0.25))
        gauche(l3, 0.55, -1.6)
        self.au_mot("autant")
        self.play(LaggedStart(*[FadeIn(v, shift=LEFT * 0.3) for v in rv], lag_ratio=0.15), run_time=0.6)
        self.au_mot("150 voitures")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.insister(l3[1], 1.12, 0.25)
        self.attendre_voix()

    # ── 03 : des repères (poisson 1,2 kg ≈ brique de lait ; tortue 150 kg ≈ 2 adultes) ─
    def ecran_reperes(self):
        self.ecran("03-reperes")
        tit = self.t("On prend un repère", 46, JAUNE_TITRE).move_to(P(0, 3.0))
        self.au_mot("on prend")
        self.play(Write(tit), run_time=0.45)
        X = -3.6
        po = poisson(1.5, "#f97316", "#fed7aa").move_to(P(-5.4, 1.55))
        l1 = base_commune(self.ligne([("Un poisson :", WHITE), ("1,2 kg", C_KG)], 40, buff=0.22))
        gauche(l1, X, 1.85)
        self.au_mot("Un poisson")
        self.play(FadeIn(po, shift=RIGHT * 0.3), FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("1,2")
        self.play(FadeIn(l1[1], scale=1.15), run_time=0.3)
        br = brique_lait(1.05).move_to(P(5.2, 1.5))
        l1b = self.t("un peu plus qu'une brique de lait", 32, GRAY_B)
        gauche(l1b, X, 1.05)
        self.au_mot("un peu plus")
        self.play(FadeIn(l1b, shift=UP * 0.1), run_time=0.3)
        self.au_mot("brique")
        self.play(FadeIn(br, shift=DOWN * 0.2), run_time=0.35)
        to = tortue_mer(1.2).move_to(P(-5.3, -1.2))
        l2 = base_commune(self.ligne([("Une tortue :", WHITE), ("150 kg", C_KG)], 40, buff=0.22))
        gauche(l2, X, -0.75)
        self.au_mot("Une tortue")
        self.play(FadeIn(to, shift=RIGHT * 0.3), FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("150 kilogrammes")
        self.play(FadeIn(l2[1], scale=1.15), run_time=0.3)
        ad = deux_adultes(0.85).move_to(P(3.7, -1.35))
        l2b = self.t("comme deux adultes", 32, GRAY_B)
        gauche(l2b, X, -1.55)
        self.au_mot("comme")
        self.play(FadeIn(l2b, shift=UP * 0.1), run_time=0.3)
        self.au_mot("adultes")
        self.play(FadeIn(ad, shift=UP * 0.2), run_time=0.35)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (un dauphin ≈ 200 kg) ──────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        da = dauphin(1.15).move_to(P(-4.9, 2.2))

        def avant_q(sc):
            sc.play(FadeIn(da, shift=RIGHT * 0.2), run_time=0.2)
            sc._q_mots = {1: "vraisemblable", 2: "d'un dauphin"}

        self._ph_mots = {(0, 0): "Un dauphin", (1, 0): "environ", (1, 1): "200 kilogrammes", (2, 0): "moins",
                         (3, 0): "plus que"}
        self.question_gauche("04-question", "04b-reponse",
                             ["La masse la plus", "vraisemblable", "d'un dauphin ?"],
                             [self.choix(abr(c_), fs=26) for c_ in Q1["choix"]], Q1["reponse"],
                             ["Un dauphin pèse", "environ 200 kg :", "moins qu'une voiture,",
                              "plus que deux adultes."],
                             -0.2, couper={1: ("environ", "200 kg :")}, mot_q="La masse", avant_q=avant_q)
        self._ph_mots, self._q_apres = {}, {}

    # ── 05 : le piège (le crabe : 0,5 kg, pas 0,5 t) ───────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        tit = self.t("Attention à l'unité et à la virgule !", 40, ROUGE_X).move_to(P(0, 3.0))
        self.au_mot("Attention")
        self.play(Write(tit), run_time=0.5)
        cr = crabe(1.5).move_to(P(-4.6, 1.0))
        X = -1.9
        l1 = base_commune(self.ligne([("Un crabe :", WHITE), ("0,5 kg", C_KG)], 46, buff=0.25))
        gauche(l1, X, 1.4)
        self.au_mot("Un crabe")
        self.play(FadeIn(cr, shift=UP * 0.2), FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("0,5")
        self.play(FadeIn(l1[1], scale=1.15), run_time=0.3)
        l2 = base_commune(self.ligne([("pas", WHITE), ("0,5 t", C_T)], 46, buff=0.25))
        gauche(l2, X, 0.3)
        self.au_mot("pas")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.25)
        self.au_t(6.43)
        self.play(FadeIn(l2[1], scale=1.15), run_time=0.3)
        self.au_mot("tonne.")
        self.play(Create(croix(l2[1])), run_time=0.4)
        l3 = base_commune(self.ligne([("0,5 t", C_T), ("=", WHITE), ("500 kg !", ORANGE_RETENUE)], 46, buff=0.25))
        gauche(l3, X, -1.1)
        self.au_t(8.87)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("c'est")
        self.play(FadeIn(l3[1]), run_time=0.2)
        self.au_mot("500")
        self.play(FadeIn(l3[2], scale=1.15), run_time=0.3)
        vo = voiture_m(0.8, "#f59e0b").move_to(P(-4.6, -1.3))
        self.play(FadeIn(vo, shift=RIGHT * 0.3), run_time=0.35)
        self.insister(l3[2], 1.12, 0.25)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (le cartable de « 4 500 kg ») ──────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        ca = cartable(1.0).move_to(P(-5.2, 2.2))

        def avant_q(sc):
            sc.play(FadeIn(ca, shift=DOWN * 0.2), run_time=0.2)
            sc._q_mots = {0: "mon cartable", 1: "4 500 kilogrammes.", 2: "Que voulait-il"}

        self._ph_mots = {(0, 0): "4 500 grammes,", (1, 0): "un vrai", (2, 0): "4 500 kilogrammes",
                         (3, 0): "un camion"}
        self.question_gauche("06-question", "06b-reponse",
                             ["« Mon cartable", "pèse 4 500 kg. »", "Que voulait-il", "écrire ?"],
                             [self.choix(abr(c_), fs=26) for c_ in Q2["choix"]], Q2["reponse"],
                             ["4 500 g = 4,5 kg :", "un vrai cartable.", "4 500 kg,", "c'est un camion !"],
                             -0.2, mot_q="Un élève", avant_q=avant_q)
        self._ph_mots, self._q_apres = {}, {}

    # ── 07 : le défi (crevette, requin, orque ↔ 8 g, 300 kg, 5 t) ───────────
    def rangees(self):
        figs = [crevette(1.85), requin(0.8), orque(0.75)]
        noms = ["La crevette :", "Le requin :", "L'orque :"]
        ys = (1.75, 0.15, -1.45)
        rows = []
        for f, n, y in zip(figs, noms, ys):
            f.move_to(P(-5.0, y))
            t_ = self.t(n, 40, WHITE)
            gauche(t_, -3.2, y)
            rows.append((f, t_, y))
        return rows

    def ecran_defi(self):
        self.ecran("07-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        rows = self.rangees()
        for (f, t_, y), mot in zip(rows, ("Une crevette", "un requin", "une orque")):
            for g_ in t_.get_family():
                g_.sans_synchro = True
            self.au_mot(mot)
            self.play(FadeIn(f, shift=DOWN * 0.2), FadeIn(t_, shift=UP * 0.1), run_time=0.3)
        vals = [self.t(s_, 40, c) for s_, c in (("8 g", C_G), ("300 kg", C_KG), ("5 t", C_T))]
        for v, y in zip(vals, (-1.45, 1.75, 0.15)):  # mélangées : pas en face de leur animal
            gauche(v, 3.7, y)
        cadre = SurroundingRectangle(VGroup(*vals), color=GRAY_B, buff=0.3, corner_radius=0.12, stroke_width=3)
        for v, mot in zip(vals, ("8 grammes,", "300 kilogrammes,", "5 tonnes.")):
            self.au_mot(mot)
            self.play(FadeIn(v, scale=1.15), *([Create(cadre)] if v is vals[0] else []), run_time=0.3)
        q = self.t("Qui pèse quoi ?", 40, JAUNE_TITRE).move_to(P(0, -2.5))
        self.au_mot("Qui pèse")
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Mets pause")
        p = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(p, -6.0, -3.2)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("07b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        rows = self.rangees()
        for f, t_, y in rows:
            hors_audit(t_)
        self.play(*[FadeIn(m) for f, t_, y in rows for m in (f, t_)], run_time=0.35)
        vals = [("8 g", C_G, "8 grammes."), ("300 kg", C_KG, "300 kilogrammes."), ("5 t", C_T, "5 tonnes.")]
        for (f, t_, y), (s_, c, mot) in zip(rows, vals):
            v = base_commune(VGroup(t_.copy(), self.t(s_, 44, c)))[1]
            v.next_to(t_, RIGHT, buff=0.3)
            v.shift(UP * (t_[0].get_bottom()[1] - v[0].get_bottom()[1]))
            self.au_mot(mot)
            self.play(FadeIn(v, scale=1.2), run_time=0.3)
            self.insister(v, 1.15, 0.2)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.65)
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        l0 = self.t("Pour estimer une masse :", 42, WHITE)
        gauche(l0, -5.6, 1.9)
        self.au_mot("Pour estimer")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        l1 = base_commune(self.ligne([("1.", JAUNE_TITRE), ("on choisit l'unité adaptée :", WHITE)], 40, buff=0.22))
        hors_audit(l1[0])
        gauche(l1, -5.2, 0.85)
        us = base_commune(self.ligne([("g", C_G), ("kg", C_KG), ("t", C_T)], 44, buff=0.45))
        hors_audit(us)
        us.next_to(l1, RIGHT, buff=0.35)
        us.shift(UP * (l1[1][0].get_bottom()[1] - us[0][0].get_bottom()[1]))
        self.au_mot("choisit")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(us, shift=UP * 0.1), run_time=0.35)
        l2 = base_commune(self.ligne([("2.", JAUNE_TITRE), ("on compare à un repère.", WHITE)], 40, buff=0.22))
        hors_audit(l2[0])
        gauche(l2, -5.2, -0.2)
        self.au_mot("compare")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        br = brique_lait(0.9).move_to(P(4.6, -0.3))
        self.au_mot("repère")
        self.play(FadeIn(br, shift=DOWN * 0.2), run_time=0.35)
        l3 = self.t("Attention à la virgule !", 40, ROUGE_X)
        gauche(l3, -5.2, -1.55)
        ex = hors_audit(base_commune(self.ligne([("0,5 kg", C_KG), ("≠", WHITE), ("0,5 t", C_T)], 40, buff=0.25)))
        gauche(ex, -4.6, -2.45)
        self.au_mot("Attention")
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(ex, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix(marge=1.8)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_baleine()
        self.ecran_reperes()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        ecran_fin(self, "paysage", voix="09-abonne")


class MasseEstimerCM2(MasseEstimerCM2Base):
    identite = "Maths CM2 — EleveAI"
    ceinture = "jaune"
