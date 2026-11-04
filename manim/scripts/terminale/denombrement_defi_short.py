# denombrement_defi_short.py
# EleveAI — Maths Tle spé — short « Les poignées de main » (9:16), ceinture
# BLANCHE. Paysage jumelle : denombrement_defi.py (micro denombrement_defi).
#   · 00 : la rentrée, 30 élèves, chacun serre la main de chacun ;
#   · 01 : Fatou, organisatrice de congrès : EN HAUT 4 personnes qui se serrent
#          la main deux à deux, EN BAS 4 points et un trait par poignée ;
#   · 02 : question-pause (A : 16, B : 12, C : 6 → C), 3 s ;
#   · 03 : 30 élèves : les 435 traits se dessinent ; 30 × 29 / 2 = 435 ;
#          3 s par poignée : 1 305 s, presque 22 minutes ;
#   · 04 : et pour 12 personnes ? (66, NON affiché) ; réponds en commentaire ;
#   · 05 : « Entraîne-toi sur eleveai.fr ».
# Code couleur du lot : orange = sans ordre / combinaison, vert = juste,
# rouge = piège (compter deux fois).
# Voix : manim/voix/terminale-denombrement-defi-short.json (débit −6).
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/denombrement_defi_short.py DenombrementDefiShort -o eleveai-maths-terminale-denombrement-defi-short --media_dir manim/scripts/terminale/media-denombrement-defi-short
# Sortie : manim/sorties/terminale/maths/probabilites/denombrement-defi/

import math
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(1, str(Path(__file__).resolve().parents[1] / "stmg"))
sys.path.insert(2, str(Path(__file__).resolve().parents[1] / "seconde"))

from proba_bin_defi import P  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from denombrement_pascal import binom, personne  # noqa: E402
from denombrement_pascal_short import OutilsShort  # noqa: E402
from stats_lycee_h2_commun import CompteARebours, pastille_pause  # noqa: E402

C = math.comb
assert C(4, 2) == 6 and 4 * 4 == 16 and 4 * 3 == 12
assert C(30, 2) == 435 == 30 * 29 // 2 and 435 * 3 == 1305 and 1305 / 60 == 21.75
assert C(12, 2) == 66

SANS_ORDRE = ORANGE_RETENUE
COULEURS = [BLEU_CALCUL, VERT_OK, "#F472B6", JAUNE_TITRE]


def cercle_points(n, centre, r, rayon_pt=0.06, color=WHITE):
    pts = [centre + P(r * math.cos(PI / 2 + TAU * k / n), r * math.sin(PI / 2 + TAU * k / n)) for k in range(n)]
    return pts, VGroup(*[Dot(p, radius=rayon_pt, color=color) for p in pts])


class DenombrementDefiShort(OutilsShort):
    fichier_marques = "denombrement_defi_short_marques.json"
    nom_voix = "terminale-denombrement-defi-short"

    def construct(self):
        titre, badge = self.entete("Les poignées de main")

        # ── 00 : la rentrée, 30 élèves ──
        self.dire("00-accroche")
        a = personne(habit=BLEU_CALCUL, s=0.55).move_to(P(-0.75, 1.55))
        b = personne(peau="#e0ac69", habit="#F472B6", s=0.55, longs=True).move_to(P(0.75, 1.55))
        mains = VGroup(Line(a.get_right() + DOWN * 0.15, P(0, 1.45), stroke_width=8, color="#8d5524"),
                       Line(b.get_left() + DOWN * 0.15, P(0, 1.45), stroke_width=8, color="#e0ac69"))
        self.au_mot("À la rentrée")
        rentree = self.t("À la rentrée", 30, JAUNE_TITRE).move_to(P(0, 2.3))
        self.play(FadeIn(rentree), FadeIn(a, shift=RIGHT * 0.2), FadeIn(b, shift=LEFT * 0.2), run_time=0.45)
        self.au_nb("classe de", "30")
        pts30, dots30 = cercle_points(30, P(0, -1.5), 1.3)
        l30 = self.t("30 élèves", 28).move_to(P(0, 0.5))
        self.play(LaggedStart(*[FadeIn(d, scale=2) for d in dots30], lag_ratio=0.03), FadeIn(l30), run_time=0.45)
        self.play(Create(mains), run_time=0.4)
        self.play(mains.animate.shift(UP * 0.08), rate_func=there_and_back, run_time=0.3)
        self.play(mains.animate.shift(UP * 0.08), rate_func=there_and_back, run_time=0.3)
        self.au_mot("une seule fois")
        une = self.t("une seule fois", 26, GREY_A).move_to(P(0, 0.12))
        self.play(FadeIn(une, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Combien")
        q = VGroup(self.t("Combien de", 26, VERT_OK), self.t("poignées de main ?", 26, VERT_OK)).arrange(DOWN, buff=0.08)
        q.scale_to_fit_width(min(q.width, 2.1)).move_to(P(0, -1.5))
        self.play(FadeIn(q, scale=1.2), run_time=0.4)
        self.attendre_voix(marge=0.2)

        # ── 01 : Fatou ; 4 personnes en haut, 4 points en bas ──
        self.dire("01-image")
        self.au_mot("Voici Fatou")
        fatou = personne(peau="#5c3a1e", habit=VERT_OK, cheveux="#140c06", s=0.55, longs=True).move_to(P(-1.35, 1.6))
        n1 = self.t("Fatou", 30, VERT_OK).move_to(P(0.55, 1.95))
        self.play(FadeOut(VGroup(a, b, mains, rentree, l30, une, q, dots30)), FadeIn(fatou, shift=UP * 0.15),
                  FadeIn(n1), run_time=0.5)
        self.au_mot("organisatrice")
        n2 = self.t("organisatrice de congrès", 22, largeur=2.6).move_to(P(0.6, 1.5))
        self.play(FadeIn(n2, shift=UP * 0.08), run_time=0.3)
        self.au_mot("prévoir le temps")
        horloge = VGroup(Circle(radius=0.32, stroke_color=WHITE, stroke_width=3),
                         Line(ORIGIN, UP * 0.22, stroke_width=3), Line(ORIGIN, RIGHT * 0.16, stroke_width=3)).move_to(P(0.6, 0.85))
        self.play(FadeIn(horloge, scale=1.3), Rotate(horloge[2], -PI, about_point=horloge[0].get_center()), run_time=0.6)
        self.au_mot("4 personnes")
        gens = VGroup(*[personne(peau=p, habit=c, s=0.3) for p, c in
                        zip(["#8d5524", "#e0ac69", "#5c3a1e", "#c68642"], COULEURS)]).arrange(RIGHT, buff=0.5)
        gens.move_to(P(0, 1.25))
        self.play(FadeOut(VGroup(fatou, n1, n2, horloge)), LaggedStart(*[FadeIn(g, shift=UP * 0.1) for g in gens],
                                                                       lag_ratio=0.15), run_time=0.5)
        self.au_mot("4 points")
        pts4 = [P(-0.85, -0.55), P(0.85, -0.55), P(0.85, -2.25), P(-0.85, -2.25)]
        dots4 = VGroup(*[Dot(p, radius=0.13, color=c) for p, c in zip(pts4, COULEURS)])
        self.play(LaggedStart(*[FadeIn(d, scale=2) for d in dots4], lag_ratio=0.15), run_time=0.5)
        self.au_mot("un trait")
        paires = [(i, j) for i in range(4) for j in range(i + 1, 4)]
        traits = VGroup()
        arcs = VGroup()
        for (i, j) in paires:
            t = Line(pts4[i], pts4[j], stroke_width=5, color=SANS_ORDRE)
            ar = ArcBetweenPoints(gens[i].get_top() + UP * 0.05, gens[j].get_top() + UP * 0.05, angle=-PI / 2,
                                  color=SANS_ORDRE, stroke_width=4).set_fill(opacity=0)
            traits.add(t)
            arcs.add(ar)
            self.add(t)
            self.bring_to_front(dots4)
            self.play(Create(t), Create(ar), Indicate(gens[i], scale_factor=1.15), Indicate(gens[j], scale_factor=1.15),
                      run_time=0.42)
            self.play(ar.animate.set_stroke(opacity=0.35), run_time=0.1)
        self.attendre_voix(marge=0.2)

        # ── 02 : question-pause ──
        self.dire("02-question")
        t0 = self.renderer.time
        graphe = VGroup(traits, dots4)
        self.au_mot("Question")
        tete = VGroup(pastille_pause(0.3), self.t("Question !", 32, ORANGE_RETENUE)).arrange(RIGHT, buff=0.18)
        rebours = CompteARebours(3, r=0.24, fs=26)
        VGroup(tete, rebours).arrange(RIGHT, buff=0.35).move_to(P(0, 0.35))
        self.play(FadeOut(gens), FadeOut(arcs), graphe.animate.scale(0.75).move_to(P(0, 1.75)),
                  FadeIn(tete, shift=DOWN * 0.15), run_time=0.5)
        self.au_mot("Combien")
        qq = self.morceaux("Poignées de main entre 4 personnes ?", 24)
        qq.scale_to_fit_width(min(qq.width, 3.9)).move_to(P(0, -0.15))
        self.play(*[FadeIn(m) for m in qq if m.original_text != "4"], run_time=0.3)
        self.reveler([m for m in qq if m.original_text == "4"], self.trouver("entre"))
        cartes = VGroup(*[self.carte(l, c) for l, c in zip("ABC", ["16", "12", "6"])]).arrange(DOWN, buff=0.08)
        cartes.move_to(P(0, -1.3))
        self.montrer_cartes(cartes)
        pause = self.t("Mets pause, et choisis !", 26, ORANGE_RETENUE).move_to(P(0, -2.4))
        self.au_mot("Mets pause")
        self.play(FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.35)
        self.attendre_voix(marge=0.1)
        rebours.jouer(self)
        print(f"QUESTION 02-question t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f}) reponse=2", flush=True)

        # ── 02b : la réponse ──
        self.dire("02b-reponse")
        ok = self.bonne_reponse(cartes, 2, pause, rebours)
        self.au_mot("c'est 2 personnes")
        self.au_nb("c'est", "2")
        e1 = self.t("2 personnes, sans ordre :", 26, SANS_ORDRE).move_to(P(0, 0.75))
        self.play(FadeOut(qq), FadeOut(tete), FadeIn(e1, shift=UP * 0.1), Indicate(traits[0], color=SANS_ORDRE), run_time=0.4)
        self.au_nb("2 parmi", "4")
        bn = binom(4, 2, 30)
        eg = self.t("= 6", 32, VERT_OK)
        VGroup(bn, eg).arrange(RIGHT, buff=0.15).move_to(P(0, 0.0))
        self.play(FadeIn(bn, scale=1.3), run_time=0.3)
        self.au_mot("égale 6")
        self.au_nb("égale", "6")
        self.play(FadeIn(eg, scale=1.4), LaggedStart(*[Indicate(t, color=VERT_OK, scale_factor=1.05) for t in traits],
                                                     lag_ratio=0.1), run_time=0.6)
        self.au_mot("12, c'est")
        aller = CurvedArrow(dots4[0].get_center() + DOWN * 0.1, dots4[1].get_center() + DOWN * 0.1, angle=PI / 3,
                            color=ROUGE_ERREUR, stroke_width=3, tip_length=0.12)
        retour = CurvedArrow(dots4[1].get_center() + UP * 0.1, dots4[0].get_center() + UP * 0.1, angle=PI / 3,
                             color=ROUGE_ERREUR, stroke_width=3, tip_length=0.12)
        e2 = self.t("12 : chaque poignée", 24, ROUGE_ERREUR)
        e2b = self.t("comptée deux fois", 24, ROUGE_ERREUR)
        g2 = VGroup(e2, e2b).arrange(DOWN, buff=0.06)
        g2.move_to((cartes[0].get_center() + cartes[1].get_center()) / 2)
        self.play(FadeOut(cartes[0]), FadeOut(cartes[1]), FadeIn(g2), Create(aller), run_time=0.4)
        self.au_mot("deux fois")
        self.play(Create(retour), run_time=0.4)
        self.attendre_voix(marge=0.2)

        # ── 03 : 30 élèves : 435 traits, 1 305 s, presque 22 minutes ──
        self.dire("03-surprise")
        self.au_mot("Et pour 30")
        self.au_nb("pour", "30")
        l30 = self.t("Et pour 30 élèves ?", 30, JAUNE_TITRE).move_to(P(0, 2.25))
        pts, dots = cercle_points(30, P(0, -1.5), 1.32, 0.05)
        self.play(FadeOut(VGroup(graphe, aller, retour, e1, bn, eg, g2, ok, cartes[2])),
                  FadeIn(l30, shift=DOWN * 0.1), LaggedStart(*[FadeIn(d, scale=2) for d in dots], lag_ratio=0.02),
                  run_time=0.6)
        self.au_nb("2 parmi", "30")
        b30 = binom(30, 2, 30)
        num = self.morceaux("30 × 29", 28)
        fr = VGroup(num, Line(LEFT * 0.75, RIGHT * 0.75, stroke_width=3), self.t("2", 28)).arrange(DOWN, buff=0.08)
        eg1, eg2 = self.t("=", 30), self.t("=", 30, VERT_OK)
        res = self.t("435", 34, VERT_OK)
        ligne = VGroup(b30, eg1, fr, eg2, res).arrange(RIGHT, buff=0.15)
        ligne.scale_to_fit_width(min(ligne.width, 3.5)).move_to(P(0, 1.42))
        self.play(FadeIn(b30, scale=1.3), run_time=0.3)
        segs = VGroup(*[Line(pts[i], pts[j], stroke_width=1.1, color=SANS_ORDRE).set_opacity(0.55)
                        for i in range(30) for j in range(i + 1, 30)])
        self.add(segs)
        self.bring_to_front(dots)
        i = self.trouver("30 fois")
        self.au_pos(i)
        self.play(FadeIn(eg1), FadeIn(num[0]), LaggedStart(*[Create(s) for s in segs[:150]], lag_ratio=0.01),
                  run_time=0.7)
        i = self.reveler([num[2]], i + 2)
        self.play(FadeIn(num[1]), LaggedStart(*[Create(s) for s in segs[150:300]], lag_ratio=0.01), run_time=0.6)
        self.au_nb("sur", "2")
        self.play(FadeIn(fr[1]), FadeIn(fr[2]), LaggedStart(*[Create(s) for s in segs[300:]], lag_ratio=0.01),
                  run_time=0.6)
        self.au_mot("435")
        self.play(FadeIn(eg2), FadeIn(res, scale=1.6), segs.animate.set_opacity(0.8), run_time=0.4)
        self.insister(res, 1.4)
        self.au_nb("À", "3")
        horloge = VGroup(Circle(radius=0.22, stroke_color=WHITE, stroke_width=3),
                         Line(ORIGIN, UP * 0.15, stroke_width=3), Line(ORIGIN, RIGHT * 0.11, stroke_width=3))
        l3 = self.t("3 s par poignée, l'une après l'autre", 22, largeur=3.3)
        VGroup(horloge, l3).arrange(RIGHT, buff=0.15).move_to(P(0, 0.55))
        horloge[1:].move_to(horloge[0].get_center(), aligned_edge=DL)
        self.play(FadeIn(horloge), FadeIn(l3, shift=UP * 0.08), run_time=0.35)
        self.au_mot("1 305")
        tot = self.t("1 305 secondes", 30, ORANGE_RETENUE).move_to(P(0, 0.03))
        tot._pas_audit = True
        self.play(FadeIn(tot, scale=1.3), Rotate(horloge[2], -TAU, about_point=horloge[0].get_center()), run_time=0.6)
        self.au_mot("22 minutes")
        gros = self.t("≈ 22 minutes !", 44, VERT_OK, largeur=3.5).move_to(P(0, -1.5))
        fond = BackgroundRectangle(gros, color=BLACK, fill_opacity=0.75, buff=0.12)
        self.play(FadeIn(fond), FadeIn(gros, scale=2.0), run_time=0.45)
        self.insister(gros, 1.12)
        self.attendre_voix(marge=0.2)

        # ── 04 : et pour 12 personnes ? (66, non affiché) ──
        self.dire("04-commentaire")
        self.au_mot("À toi")
        toi = self.t("À toi !", 36, JAUNE_TITRE).move_to(P(0, 2.2))
        self.play(FadeOut(VGroup(l30, ligne, horloge, l3, tot, gros, fond, segs, dots)), FadeIn(toi, scale=1.2),
                  run_time=0.45)
        self.au_nb("entre", "12")
        l12 = self.t("12 personnes :", 30).move_to(P(0, 1.55))
        p12, d12 = cercle_points(12, P(0, -0.5), 1.2, 0.09, SANS_ORDRE)
        self.play(FadeIn(l12, shift=UP * 0.1), LaggedStart(*[FadeIn(d, scale=2) for d in d12], lag_ratio=0.06),
                  run_time=0.6)
        qm = self.t("combien de poignées ?", 28, VERT_OK).move_to(P(0, 1.0))
        inter = self.t("?", 60, ORANGE_RETENUE).move_to(P(0, -0.5))
        l05 = Line(p12[0], p12[5], stroke_width=2, color=SANS_ORDRE)
        self.play(FadeIn(qm), FadeIn(inter, scale=1.6), Create(l05),
                  run_time=0.4)
        self.au_mot("Réponds en commentaire")
        appel = self.t("Réponds en commentaire !", 30, VERT_OK, largeur=3.9).move_to(P(0, -2.3))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.06)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne", [titre, badge, toi, l12, qm, inter, d12, l05, appel])
