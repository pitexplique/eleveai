# masse_cm1_estimer.py
# EleveAI — Maths CM1 — série « Masses » (CP → CM2), ÉPISODE CM1 04 : estimer une masse
# (micro masse_estimer, notion masse), AVEC VOIX.
# Paysage 16:9, CEINTURE JAUNE. Short jumeau (blanche) : film Ti Margo (la plume sur la balance : « zéro » !).
# Décor et métier : Enzo, ORNITHOLOGUE (il pèse les oiseaux doucement, puis il les relâche).
# Mapping micro → écrans : 02 (la bonne unité : colibri g, aigle kg, avion t), 03 (un repère : 1 g = un
# trombone, colibri ≈ 3 g ; 1 kg = une brique de lait, aigle ≈ 5 kg), 04 question (un œuf ≈ 60 g),
# 05 piège (« un éléphant pèse 5 kg » : 5 kg, c'est un chat ; l'éléphant ≈ 5 t), 06 question (l'unité pour
# un éléphant : la tonne), 07 défi (moineau, chien, baleine ↔ 30 g, 30 kg, 30 t), 07b correction,
# 08 ce que tu as appris, 09 fin commune.
# Voix : manim/voix/cm1-masse-estimer.json (source : masse_voix.py, validée le 16/11).
# Marques : python manim/scripts/ce2/perimetre_marques.py masse:estimer:cm1
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/masse_cm1_estimer.py MasseEstimerCM1
# Sortie : manim/sorties/cm1/maths/masse/04-estimer/eleveai-maths-cm1-masse-estimer.mp4

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
EP = _V["cm1-masse-estimer"]
Q1, Q2 = EP["questions"]
C_G, C_KG, C_T = BLEU_D, VERT_OK, LOURD
KAKI = "#65a30d"
ROUGE_X = "#ef4444"


def enzo(s=1.0):
    """Enzo, ornithologue : gilet kaki, chapeau de brousse, jumelles autour du cou."""
    p = visage(personne(peau="#c68642", tenue=KAKI, cheveux="#1f2937", s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    bord = Ellipse(width=r * 3.0, height=r * 0.42, fill_color="#a16207", fill_opacity=1, stroke_color="#713f12",
                   stroke_width=2).move_to(c + UP * r * 0.72)
    calotte = AnnularSector(inner_radius=0, outer_radius=r * 0.95, angle=PI, start_angle=0, fill_color="#ca8a04",
                            fill_opacity=1, stroke_color="#713f12", stroke_width=2).move_to(c + UP * r * 1.1)
    cou = p.tete.get_bottom()
    jum = VGroup(*[RoundedRectangle(width=r * 0.42, height=r * 0.7, corner_radius=r * 0.1, fill_color="#111827",
                                    fill_opacity=1, stroke_color="#4b5563", stroke_width=2)
                   .move_to(cou + P(dx * r, -r * 1.05)) for dx in (-0.25, 0.25)])
    sangle = VGroup(*[Line(cou + P(dx * r * 0.6, 0), jum[i].get_top(), color="#4b5563", stroke_width=2)
                      for i, dx in enumerate((-1, 1))])
    p.add(calotte, bord, sangle, jum)
    return p


def oiseau(s=1.0, corps="#a16207", ventre="#fde68a", aile="#78350f", bec="#f59e0b", long_bec=False, tete=None):
    """Un oiseau de profil, tourné vers la droite : corps rond, tête, aile, queue, bec (long pour le colibri)."""
    contour = dict(stroke_color="#1f2937", stroke_width=2)
    cp = Ellipse(width=1.0 * s, height=0.68 * s, fill_color=corps, fill_opacity=1, **contour)
    vt = Ellipse(width=0.55 * s, height=0.36 * s, fill_color=ventre, fill_opacity=1, stroke_width=0)
    vt.move_to(P(0.08 * s, -0.12 * s))
    tt = Circle(radius=0.24 * s, fill_color=tete or corps, fill_opacity=1, **contour).move_to(P(0.46 * s, 0.24 * s))
    lb = 0.55 if long_bec else 0.2
    bc = Polygon(P(0.66 * s, 0.3 * s), P((0.66 + lb) * s, 0.22 * s), P(0.66 * s, 0.16 * s), fill_color=bec,
                 fill_opacity=1, stroke_width=0)
    oe = Dot(P(0.52 * s, 0.3 * s), radius=0.04 * s, color="#111827")
    al = Ellipse(width=0.62 * s, height=0.3 * s, fill_color=aile, fill_opacity=1, stroke_width=0).rotate(0.25)
    al.move_to(P(-0.1 * s, 0.06 * s))
    qu = Polygon(P(-0.45 * s, 0.05 * s), P(-0.9 * s, 0.22 * s), P(-0.85 * s, -0.12 * s), fill_color=aile,
                 fill_opacity=1, **contour)
    pt = VGroup(*[Line(P(x * s, -0.32 * s), P(x * s, -0.48 * s), color="#78350f", stroke_width=3 * s)
                  for x in (-0.05, 0.12)])
    return VGroup(qu, pt, cp, vt, al, tt, bc, oe)


def colibri(s=1.0):
    return oiseau(s, corps="#14b8a6", ventre="#ccfbf1", aile="#0f766e", bec="#1f2937", long_bec=True)


def moineau(s=1.0):
    return oiseau(s, corps="#a16207", ventre="#fef3c7", aile="#78350f", bec="#d97706", tete="#92400e")


def aigle(s=1.0):
    """Un aigle aux ailes ouvertes : corps brun, tête blanche, bec jaune crochu."""
    contour = dict(stroke_color="#1f2937", stroke_width=2)
    ailes = VGroup(*[Polygon(P(0, 0.1 * s), P(u * 1.3 * s, 0.55 * s), P(u * 1.15 * s, 0.1 * s), P(u * 0.9 * s, 0.2 * s),
                             P(u * 0.75 * s, -0.05 * s), P(u * 0.5 * s, 0.05 * s), P(0, -0.2 * s),
                             fill_color="#78350f", fill_opacity=1, **contour) for u in (-1, 1)])
    cp = Ellipse(width=0.5 * s, height=0.95 * s, fill_color="#92400e", fill_opacity=1, **contour).move_to(P(0, -0.1 * s))
    qu = Polygon(P(-0.18 * s, -0.5 * s), P(0.18 * s, -0.5 * s), P(0.26 * s, -0.85 * s), P(-0.26 * s, -0.85 * s),
                 fill_color=WHITE, fill_opacity=1, **contour)
    tt = Circle(radius=0.22 * s, fill_color=WHITE, fill_opacity=1, **contour).move_to(P(0, 0.48 * s))
    bc = Polygon(P(0.12 * s, 0.5 * s), P(0.36 * s, 0.42 * s), P(0.26 * s, 0.3 * s), P(0.12 * s, 0.38 * s),
                 fill_color="#facc15", fill_opacity=1, stroke_width=0)
    oe = Dot(P(0.07 * s, 0.54 * s), radius=0.035 * s, color="#111827")
    return VGroup(ailes, qu, cp, tt, bc, oe)


def avion(s=1.0):
    """Un avion de ligne de profil, nez à droite."""
    fus = RoundedRectangle(width=2.6 * s, height=0.5 * s, corner_radius=0.24 * s, fill_color="#e2e8f0", fill_opacity=1,
                           stroke_color="#64748b", stroke_width=2)
    nez = Polygon(P(1.2 * s, 0.25 * s), P(1.55 * s, 0.0), P(1.2 * s, -0.25 * s), fill_color="#e2e8f0", fill_opacity=1,
                  stroke_color="#64748b", stroke_width=2)
    der = Polygon(P(-1.05 * s, 0.2 * s), P(-1.35 * s, 0.85 * s), P(-1.0 * s, 0.85 * s), P(-0.6 * s, 0.22 * s),
                  fill_color="#2563eb", fill_opacity=1, stroke_width=0)
    aile = Polygon(P(0.2 * s, -0.05 * s), P(-0.5 * s, -0.75 * s), P(-0.15 * s, -0.75 * s), P(0.6 * s, -0.05 * s),
                   fill_color="#94a3b8", fill_opacity=1, stroke_color="#64748b", stroke_width=2)
    hub = VGroup(*[Circle(radius=0.06 * s, fill_color="#1e3a8a", fill_opacity=1, stroke_width=0)
                   .move_to(P(x * s, 0.08 * s)) for x in (-0.6, -0.35, -0.1, 0.15, 0.4, 0.65, 0.9)])
    return VGroup(der, fus, nez, aile, hub)


def oeuf(s=1.0):
    """Un œuf de poule, beige, posé debout."""
    e = Ellipse(width=0.62 * s, height=0.82 * s, fill_color="#fde7c4", fill_opacity=1, stroke_color="#b45309",
                stroke_width=2)
    reflet = Ellipse(width=0.12 * s, height=0.22 * s, fill_color=WHITE, fill_opacity=0.7, stroke_width=0)
    reflet.move_to(e.get_center() + P(-0.14 * s, 0.14 * s))
    return VGroup(e, reflet)


def elephant(s=1.0):
    """Un éléphant de profil, tourné vers la droite : grand corps gris, oreille, trompe, défense, 4 pattes."""
    gris, contour = "#9ca3af", dict(stroke_color="#374151", stroke_width=2.5)
    pattes = VGroup(*[Rectangle(width=0.3 * s, height=0.6 * s, fill_color=gris, fill_opacity=1, **contour)
                      .move_to(P(x * s, -0.55 * s)) for x in (-0.6, -0.25, 0.25, 0.55)])
    cp = Ellipse(width=1.9 * s, height=1.15 * s, fill_color=gris, fill_opacity=1, **contour).move_to(P(0, 0.05 * s))
    tt = Circle(radius=0.42 * s, fill_color=gris, fill_opacity=1, **contour).move_to(P(0.95 * s, 0.25 * s))
    trompe = VMobject(stroke_color=gris, stroke_width=16 * s).set_points_smoothly(
        [P(1.25 * s, 0.1 * s), P(1.4 * s, -0.25 * s), P(1.38 * s, -0.6 * s), P(1.5 * s, -0.72 * s)])
    oreille = Ellipse(width=0.55 * s, height=0.75 * s, fill_color="#d1d5db", fill_opacity=1, **contour)
    oreille.move_to(P(0.72 * s, 0.22 * s))
    defense = Polygon(P(1.2 * s, -0.02 * s), P(1.45 * s, -0.2 * s), P(1.2 * s, -0.12 * s), fill_color=WHITE,
                      fill_opacity=1, stroke_width=0)
    oe = Dot(P(1.05 * s, 0.4 * s), radius=0.045 * s, color="#111827")
    queue = Line(P(-0.92 * s, 0.15 * s), P(-1.1 * s, -0.25 * s), color="#374151", stroke_width=4 * s)
    return VGroup(queue, pattes, cp, trompe, tt, oreille, defense, oe)


def baleine(s=1.0):
    """Une baleine bleue de profil, tête à droite, queue relevée, un jet d'eau."""
    contour = dict(stroke_color="#1e3a8a", stroke_width=2.5)
    cp = Ellipse(width=2.3 * s, height=0.85 * s, fill_color="#3b82f6", fill_opacity=1, **contour)
    vt = Ellipse(width=1.6 * s, height=0.35 * s, fill_color="#bfdbfe", fill_opacity=1, stroke_width=0)
    vt.move_to(P(0.2 * s, -0.22 * s))
    queue = Polygon(P(-1.05 * s, 0.0), P(-1.45 * s, 0.45 * s), P(-1.3 * s, 0.05 * s), P(-1.5 * s, -0.25 * s),
                    fill_color="#3b82f6", fill_opacity=1, **contour)
    oe = Dot(P(0.75 * s, 0.05 * s), radius=0.05 * s, color="#111827")
    bouche = Line(P(0.85 * s, -0.12 * s), P(1.1 * s, -0.08 * s), color="#1e3a8a", stroke_width=3)
    jet = VGroup(*[Line(P(0.45 * s, 0.42 * s), P((0.45 + dx) * s, 0.85 * s), color="#7dd3fc", stroke_width=4 * s)
                   for dx in (-0.15, 0.0, 0.15)])
    return VGroup(queue, cp, vt, oe, bouche, jet)


def croix(m, couleur=ROUGE_X):
    """Une croix rouge par-dessus m."""
    a, b = m.get_corner(UL), m.get_corner(DR)
    c, d = m.get_corner(DL), m.get_corner(UR)
    return VGroup(Line(a, b, color=couleur, stroke_width=8), Line(c, d, color=couleur, stroke_width=8))


class MasseEstimerCM1Base(MasseChoisirUniteCE2Base):
    nom_voix = "cm1-masse-estimer"
    fichier_marques = "masse_cm1_estimer_marques.json"
    ceinture = "jaune"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Estimer une masse", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Estimer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        co = colibri(2.2).move_to(P(-3.6, 0.6))
        self.au_mot("colibri")
        self.play(FadeIn(co, shift=RIGHT * 0.4), run_time=0.4)
        us = [self.t(s_, 50, c) for s_, c in (("3 g ?", C_G), ("3 kg ?", C_KG), ("3 t ?", C_T))]
        for u, x in zip(us, (0.0, 2.3, 4.6)):
            u.move_to(P(x, 0.6))
        base_commune(VGroup(*us))
        for u, mot in zip(us, ("3 grammes,", 4.68, "3 tonnes")):
            self.au_t(mot) if isinstance(mot, float) else self.au_mot(mot)
            self.play(FadeIn(u, scale=1.15), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 01 : Enzo, ornithologue ─────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        X = -2.4
        pe = enzo(1.45).move_to(P(-5.3, -0.2))
        nom = self.t("Enzo", 42, "#84cc16").next_to(pe, UP, buff=0.35)
        self.au_mot("Voici Enzo")
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        met = self.t("ornithologue", 28, "#84cc16").next_to(pe, DOWN, buff=0.15)
        self.au_mot("ornithologue")
        self.play(FadeIn(met), run_time=0.35)
        l0 = self.t("Il étudie les oiseaux.", 40, WHITE)
        gauche(l0, X, 2.4)
        mo = moineau(1.3).move_to(P(4.6, 2.3))
        self.au_mot("étudie")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        self.au_mot("oiseaux")
        self.play(FadeIn(mo, shift=LEFT * 0.4), run_time=0.35)
        l1 = self.t("Il les pèse doucement,", 38, GRAY_B)
        gauche(l1, X, 1.1)
        bal = balance_electronique("28 g", 1.5).move_to(P(1.2, -1.3))
        self.au_mot("pèse")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(bal, shift=UP * 0.2), run_time=0.35)
        self.play(mo.animate.scale(0.85).next_to(bal.plateau, UP, buff=0.02), run_time=0.6)
        l2 = self.t("puis il les relâche.", 38, GRAY_B)
        gauche(l2, X, 0.35)
        self.au_mot("puis")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("relâche")
        self.play(mo.animate.shift(P(4.2, 2.6)).rotate(0.3), run_time=0.8)
        self.attendre_voix()

    # ── 02 : d'abord la bonne unité ─────────────────────────────────────────
    def ecran_unite(self):
        self.ecran("02-unite")
        tit = self.t("D'abord, la bonne unité", 46, JAUNE_TITRE).move_to(P(0, 2.95))
        self.au_mot("D'abord")
        self.play(Write(tit), run_time=0.45)
        xs = (-4.7, -0.3, 4.1)
        figs = [colibri(1.6), aigle(1.4), avion(1.25)]
        for f, x in zip(figs, xs):
            f.move_to(P(x, 0.85))
        noms = ["Un colibri :", "Un aigle :", "Un avion :"]
        us = [("quelques g", C_G, "quelques grammes"), ("quelques kg", C_KG, "quelques kilogrammes"),
              ("des t", C_T, "des tonnes")]
        for f, x, n, (u, c, mot), mn in zip(figs, xs, noms, us, ("colibri", "aigle", "avion")):
            gn = self.t(n, 34, WHITE).move_to(P(x, -0.85))
            gu = self.t(u, 40, c).move_to(P(x, -1.75))
            self.au_mot(mn)
            self.play(FadeIn(f, shift=DOWN * 0.2), FadeIn(gn, shift=UP * 0.1), run_time=0.35)
            self.au_mot(mot)
            self.play(FadeIn(gu, scale=1.15), run_time=0.3)
        self.attendre_voix()

    # ── 03 : puis un repère (trombone 1 g, brique 1 kg) ─────────────────────
    def ecran_repere(self):
        self.ecran("03-repere")
        tit = self.t("Puis un repère", 46, JAUNE_TITRE).move_to(P(0, 3.0))
        self.au_mot("Puis")
        self.play(Write(tit), run_time=0.4)
        X = -4.3
        tr = trombone_m(2.0).move_to(P(-5.6, 1.75))
        l0 = base_commune(self.ligne([("1 g", C_G), ("= un trombone", WHITE)], 44, buff=0.25))
        gauche(l0, X, 1.85)
        self.au_mot("1 gramme,")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("trombone")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(tr, shift=DOWN * 0.2), run_time=0.35)
        co = colibri(1.25).move_to(P(4.9, 1.0))
        l1 = base_commune(self.ligne([("Le colibri :", WHITE), ("environ 3 g", JAUNE_TITRE)], 40, buff=0.22))
        gauche(l1, X, 0.85)
        self.au_mot("le colibri")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(co, shift=LEFT * 0.3), run_time=0.35)
        self.au_t(5.24)
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.insister(l1[1], 1.12, 0.25)
        br = brique_lait(1.25).move_to(P(-5.6, -0.95))
        l2 = base_commune(self.ligne([("1 kg", C_KG), ("= une brique de lait", WHITE)], 44, buff=0.25))
        gauche(l2, X, -0.85)
        self.au_t(7.32)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("brique")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(br, shift=DOWN * 0.2), run_time=0.35)
        ai = aigle(0.95).move_to(P(5.0, -1.9))
        l3 = base_commune(self.ligne([("Un aigle :", WHITE), ("environ 5 kg", JAUNE_TITRE)], 40, buff=0.22))
        gauche(l3, X, -1.95)
        self.au_mot("un aigle")
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(ai, shift=LEFT * 0.3), run_time=0.35)
        self.au_t(10.66)
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.insister(l3[1], 1.12, 0.25)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (un œuf de poule ≈ 60 g) ────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        oe = oeuf(2.0).move_to(P(-5.2, 1.9))

        def avant_q(sc):
            sc.play(FadeIn(oe, shift=DOWN * 0.2), run_time=0.2)

        self._ph_mots = {(0, 0): "Un œuf", (1, 0): "environ 60", (2, 0): 4.99,
                         (3, 0): "qu'une demi-brique"}
        self.question_gauche("04-question", "04b-reponse",
                             ["Environ combien", "pèse un œuf", "de poule ?"],
                             [self.choix(abr(c_), fs=26) for c_ in Q1["choix"]], Q1["reponse"],
                             ["Un œuf pèse", "environ 60 g.", "600 g, c'est plus", "qu'une demi-brique !"],
                             -0.2, mot_q="Environ combien", avant_q=avant_q)
        self._ph_mots, self._q_apres = {}, {}

    # ── 05 : le piège (un éléphant de 5 kg ?) ───────────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        tit = self.t("Attention à l'unité !", 46, ROUGE_X).move_to(P(0, 3.0))
        self.au_mot("Attention")
        self.play(Write(tit), run_time=0.45)
        ard = ardoise("Un éléphant pèse 5 kg.", 1.15).move_to(P(0, 1.65))
        hors_audit(ard)
        self.au_mot("écrit")
        self.play(FadeIn(ard, shift=DOWN * 0.2), run_time=0.4)
        ch = chat(1.7).move_to(P(-4.6, -1.0))
        l1 = self.t("5 kg, c'est un chat !", 36, WHITE)
        hors_audit(l1)
        gauche(l1, -6.3, -2.6)
        self.au_mot("5 kilogrammes, c'est")
        self.play(FadeIn(ch, shift=UP * 0.2), FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        t_ = ard[1]
        w = Text("5 kg", font_size=int(34 * 1.15)).width
        d = t_.get_right()[0] - 0.1
        zone = Rectangle(width=w + 0.1, height=t_.height * 1.05).move_to(P(d - w / 2, t_.get_center()[1]))
        x = croix(zone)
        self.au_mot("chat")
        self.play(Create(x), Indicate(ch, color=ORANGE_RETENUE, scale_factor=1.08), run_time=0.45)
        el = elephant(1.55).move_to(P(2.6, -0.85))
        l2 = base_commune(self.ligne([("L'éléphant :", WHITE), ("environ 5 t", C_T)], 36, buff=0.2))
        gauche(l2, -0.5, -2.6)
        self.au_mot("L'éléphant")
        self.play(FadeIn(el, shift=LEFT * 0.3), FadeIn(l2[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("environ 5 tonnes")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.insister(l2[1], 1.12, 0.25)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (l'unité pour un éléphant : la tonne) ──────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        el = elephant(1.0).move_to(P(-5.0, 2.0))

        def avant_q(sc):
            sc.play(FadeIn(el, shift=LEFT * 0.2), run_time=0.2)

        self._ph_mots = {(0, 0): "Un éléphant", (1, 0): "environ 5", (2, 0): "la tonne est",
                         (3, 0): "l'unité adaptée"}
        self.question_gauche("06-question", "06b-reponse",
                             ["Quelle unité", "pour la masse", "d'un éléphant ?"],
                             [self.choix(c_, fs=26) for c_ in Q2["choix"]], Q2["reponse"],
                             ["Un éléphant pèse", "environ 5 t :", "la tonne est", "l'unité adaptée."],
                             -0.2, mot_q="Quelle unité", avant_q=avant_q)
        self._ph_mots, self._q_apres = {}, {}

    # ── 07 : le défi (moineau, chien, baleine ↔ 30 g, 30 kg, 30 t) ──────────
    def rangees(self):
        figs = [moineau(1.2), chien(1.0), baleine(0.95)]
        noms = ["Le moineau :", "Le chien :", "La baleine :"]
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
        for (f, t_, y), mot in zip(rows, ("Un moineau", "un chien", "une baleine")):
            for g_ in t_.get_family():
                g_.sans_synchro = True
            self.au_mot(mot)
            self.play(FadeIn(f, shift=DOWN * 0.2), FadeIn(t_, shift=UP * 0.1), run_time=0.3)
        vals = [self.t(s_, 40, c) for s_, c in (("30 g", C_G), ("30 kg", C_KG), ("30 t", C_T))]
        for v, y in zip(vals, (-1.45, 1.75, 0.15)):  # mélangées : pas en face de leur animal
            gauche(v, 3.7, y)
        cadre = SurroundingRectangle(VGroup(*vals), color=GRAY_B, buff=0.3, corner_radius=0.12, stroke_width=3)
        for v, mot in zip(vals, ("30 grammes,", 6.26, 7.58)):
            self.au_t(mot) if isinstance(mot, float) else self.au_mot(mot)
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
        vals = [("30 g", C_G, "30 grammes."), ("30 kg", C_KG, "30 kilogrammes."), ("30 t", C_T, "30 tonnes.")]
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
        l1 = base_commune(self.ligne([("1.", JAUNE_TITRE), ("on choisit l'unité :", WHITE)], 40, buff=0.22))
        hors_audit(l1[0])
        gauche(l1, -5.2, 0.85)
        us = base_commune(self.ligne([("g", C_G), ("kg", C_KG), ("t", C_T)], 44, buff=0.45))
        hors_audit(us)
        us.next_to(l1, RIGHT, buff=0.35)
        us.shift(UP * (l1[1][0].get_bottom()[1] - us[0][0].get_bottom()[1]))
        self.au_mot("choisit")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(us, shift=UP * 0.1), run_time=0.35)
        l2 = base_commune(self.ligne([("2.", JAUNE_TITRE), ("on compare à un repère connu.", WHITE)], 40, buff=0.22))
        hors_audit(l2[0])
        gauche(l2, -5.2, -0.2)
        self.au_mot("compare")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        tr = trombone_m(1.6).move_to(P(-3.2, -1.75))
        gt = hors_audit(self.t("1 g", 40, C_G)).next_to(tr, RIGHT, buff=0.35)
        br = brique_lait(1.1).move_to(P(1.0, -1.75))
        gb = hors_audit(self.t("1 kg", 40, C_KG)).next_to(br, RIGHT, buff=0.35)
        self.au_mot("repère")
        self.play(FadeIn(tr, shift=DOWN * 0.2), FadeIn(gt), FadeIn(br, shift=DOWN * 0.2), FadeIn(gb), run_time=0.45)
        self.attendre_voix(marge=1.8)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_unite()
        self.ecran_repere()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        ecran_fin(self, "paysage", voix="09-abonne")


class MasseEstimerCM1(MasseEstimerCM1Base):
    identite = "Maths CM1 — EleveAI"
    ceinture = "jaune"
