# prop_lycee_pourcentage_de_pourcentage_short.py
# EleveAI — Maths 2de, 1re ET STMG — short jumeau de l'épisode commun « Un
# pourcentage d'un pourcentage » (micros info_pourcentage_de_pourcentage,
# auto_prop_pourcentage_de_pourcentage, auto_prop_de_proportion), série
# « Proportionnalité » LYCÉE. Rendu UNE fois, copié sous les trois noms (il
# n'affiche aucune classe). CEINTURE BLANCHE (règle du short blanc, REGLES.md).
# Il AMUSE : « 50 % de tirs cadrés, 50 % de buts : ça fait 100 % ? »
#   · EN HAUT, l'image qui bouge : 20 ballons (les tirs, 10 × 2) ; les 10 de
#     gauche (cadrés) passent en BLEU, puis les 5 du bas de ceux-là (les buts)
#     en ORANGE et filent vers le filet ; EN BAS, AU MÊME INSTANT, le carré de
#     100 % : la bande de 50 % (bleue) puis le rectangle de 50 % de la bande
#     (orange) = 25 % ; code couleur partagé : bleu = cadrés, orange = buts ;
#   · 1 question-pause (3 s) : 40 % × 50 % → B 20 % (A 90 % = additionner ;
#     C 10 % = leurre) ;
#   · fin : 60 % cadrés, 30 % des cadrés au fond ; sur 50 tirs ? (18 %, 9 buts)
#     en commentaire.
# Centre d'intérêt : sport. Nombres inventés (un match type) : pas de source.
#
# Voix : manim/voix/lycee-prop-pourcentage-de-pourcentage-short.json (validée le
# 02/11, débit −10) ; WAV : public/sons/lycee-prop-pourcentage-de-pourcentage-short/ ;
# marques : manim/scripts/premiere/prop_lycee_pourcentage_de_pourcentage_short_marques.json.
# Ajouté ICI : ballon(), carre() (le même que la paysage, recopié), la phrase de
# la réponse à la taille de la question (28).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/premiere/prop_lycee_pourcentage_de_pourcentage_short.py PropLyceePourcentageDePourcentageShort
# PYTHONIOENCODING=utf-8 python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/prop_lycee_pourcentage_de_pourcentage_short.py PropLyceePourcentageDePourcentageShort -o eleveai-maths-seconde-prop-pourcentage-de-pourcentage-short --media_dir manim/scripts/premiere/media-prop-lycee-pdp-short
# Sorties (le même fichier, copié) :
#   manim/sorties/seconde/maths/proportionnalite/02-pourcentage-de-pourcentage/eleveai-maths-seconde-prop-pourcentage-de-pourcentage-short.mp4
#   manim/sorties/premiere/maths/proportionnalite/06-pourcentage-de-pourcentage/eleveai-maths-premiere-prop-pourcentage-de-pourcentage-short.mp4
#   manim/sorties/stmg/maths/proportionnalite/04-pourcentage-de-pourcentage/eleveai-maths-stmg-prop-pourcentage-de-pourcentage-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))  # le dossier du script EN TÊTE

from prop_commun import *  # noqa: E402,F403

CADRE_C = "#38bdf8"   # les tirs cadrés : ballons bleus = bande bleue
BUT_C = "#fb923c"     # les buts : ballons orange = petit rectangle orange
FOND_C = "#334155"    # le reste du carré


def sans(m):
    for f in m.get_family():
        if isinstance(f, Text):
            f.sans_synchro = True
            f._pas_audit = True
    return m


def ballon(r=0.17):
    """Un ballon : disque blanc, pentagone noir au centre, liseré sombre."""
    d = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color=NUIT, stroke_width=2)
    pent = RegularPolygon(5, fill_color=NUIT, fill_opacity=1, stroke_width=0).scale(r * 0.38).move_to(d)
    traits = VGroup(*[Line(v, d.get_center() + (v - d.get_center()) * r / np.linalg.norm(v - d.get_center()),
                           stroke_color=NUIT, stroke_width=1.5) for v in pent.get_vertices()])
    g = VGroup(d, traits, pent)
    g.disque = d
    return g


def carre(cote=2.0, pb=0.5, pr=0.5, centre=ORIGIN):
    """Le carré de 100 % : la bande verticale pb (gauche), le rectangle pr du bas de la bande."""
    fond = Square(cote, fill_color=FOND_C, fill_opacity=1, stroke_width=0)
    bande = Rectangle(width=cote * pb, height=cote, fill_color=CADRE_C, fill_opacity=1, stroke_color=NUIT,
                      stroke_width=2).align_to(fond, LEFT)
    rect = Rectangle(width=cote * pb, height=cote * pr, fill_color=BUT_C, fill_opacity=1, stroke_color=NUIT,
                     stroke_width=2).align_to(fond, LEFT).align_to(fond, DOWN)
    contour = Square(cote, stroke_color=WHITE, stroke_width=4)
    g = VGroup(fond, bande, rect, contour).move_to(centre)
    g.fond, g.bande, g.rect, g.contour = fond, bande, rect, contour
    return g


def cage(l=2.4, h=0.9):
    """Un but de foot : deux poteaux, la barre, le filet."""
    pot = VGroup(Line(P(-l / 2, 0), P(-l / 2, h)), Line(P(l / 2, 0), P(l / 2, h)), Line(P(-l / 2, h), P(l / 2, h)))
    pot.set_stroke(WHITE, 6)
    filet = VGroup(*[Line(P(-l / 2 + l * k / 8, 0), P(-l / 2 + l * k / 8, h)) for k in range(1, 8)],
                   *[Line(P(-l / 2, h * k / 3), P(l / 2, h * k / 3)) for k in (1, 2)]).set_stroke(GREY_B, 1.5)
    return VGroup(filet, pot)


class PropLyceePourcentageDePourcentageShort(ShortProp):
    nom_voix = "lycee-prop-pourcentage-de-pourcentage-short"
    fichier_marques = "prop_lycee_pourcentage_de_pourcentage_short_marques.json"
    ceinture = "blanche"

    def _disposer_q(self, question, choix, phrase):
        """La phrase de la réponse à la taille de la question (28)."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        neuve = self.bloc(phrase, 28, VERT_OK).next_to(cartes, DOWN, buff=0.15).set_x(0)
        self.ph_q = neuve
        self.q_q = q
        return tete, q, cartes, pause, rebours, neuve

    def _q_au_mot(self, sc, mots):
        """avant_q : chaque ligne de la question à SON nombre (la synchro par
        jetons attendait « tirs », 1,2 s après « 40 % ») ; la question vidée
        ensuite pour que question_pause ne la rejoue pas."""
        for ligne, mot in zip(list(sc.q_q.submobjects), mots):
            for f in ligne.get_family():
                f.sans_synchro = True
            sc.au_mot(mot)
            sc.play(FadeIn(ligne, shift=UP * 0.15), run_time=0.3)
        sc.q_q.submobjects = []

    def _rep_q(self, sc):
        lg = sc.ligne_rep(0, ["0,4 ×", "0,5 =", "0,2", "= 20 %"], fs=28)
        for m, mot in zip(lg, ["0,4 fois", "fois 0,5", "égale 0,2", "soit 20"]):
            sc.au_mot(mot)
            sc.play(FadeIn(m, shift=UP * 0.12), run_time=0.25)
        sc.play(GrowFromEdge(self.mini.rect, DOWN), run_time=0.4)
        sc.play(Indicate(self.mini.rect, color=WHITE, scale_factor=1.3), run_time=0.5)
        sc.rep_fini()

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Tirs et buts", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [margo, titre, badge]

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au_mot("50 % de tirs")
        l1 = self.ligne([("50 %", CADRE_C), ("de tirs cadrés,", WHITE)], 34).move_to(P(0, 1.75))
        self.play(Write(titre), FadeIn(l1[0], scale=1.3), run_time=0.5)
        self.au_mot("cadrés")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.12), run_time=0.3)
        l2 = self.ligne([("50 %", BUT_C), ("de buts.", WHITE)], 34).move_to(P(0, 1.1))
        cg = cage(2.6, 0.95).move_to(P(0, -1.0))
        b = ballon(0.2).move_to(P(-1.6, -2.3))
        self.au_mot("50 %", 2)
        self.play(FadeIn(l2[0], scale=1.3), FadeIn(cg), FadeIn(b), run_time=0.4)
        self.au_mot("de buts")
        self.play(FadeIn(l2[1], shift=RIGHT * 0.12), b.animate.move_to(P(0.6, -0.8)).rotate(-2 * PI),
                  run_time=0.6)
        q = self.t("= 100 % ?", 44, AMBRE).move_to(P(0, 0.3))
        self.au_mot("100 %")
        self.play(FadeIn(q, scale=1.3), run_time=0.4)
        self.insister(q, 1.15)
        self.attendre_voix(marge=0.2)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        # ── 01 : 20 tirs, 10 cadrés, 5 buts ; en bas le carré se remplit ──
        self.dire("01-image")
        bal = VGroup(*[ballon(0.15) for _ in range(20)]).arrange_in_grid(2, 10, buff=0.09).move_to(P(0, 1.7))
        cadres = VGroup(*[bal[r * 10 + c] for r in range(2) for c in range(5)])
        buts = VGroup(*[bal[10 + c] for c in range(5)])
        c = carre(2.0, centre=P(0, -0.6))
        lt = self.ligne([("20 tirs", WHITE)], 32).move_to(P(0, 0.85))
        self.au_mot("20 tirs")
        self.play(LaggedStart(*[FadeIn(x, scale=0.5) for x in bal], lag_ratio=0.04), FadeIn(lt[0], scale=1.2),
                  FadeIn(c.fond), Create(c.contour), run_time=0.8)
        l10 = self.t("10 cadrés", 30, CADRE_C)
        self.au_mot("La moitié sont")
        self.play(*[x.disque.animate.set_fill(CADRE_C) for x in cadres], GrowFromEdge(c.bande, LEFT), run_time=0.6)
        self.au_mot("cadrés : 10")
        lt2 = VGroup(lt[0].copy(), l10).arrange(RIGHT, buff=0.35).move_to(P(0, 0.85))
        self.play(lt[0].animate.move_to(lt2[0]), FadeIn(l10.move_to(lt2[1]), scale=1.3), run_time=0.4)
        l5 = self.t("5 buts", 30, BUT_C)
        self.au_mot("finissent au fond")
        self.play(*[x.disque.animate.set_fill(BUT_C) for x in buts], GrowFromEdge(c.rect, DOWN), run_time=0.5)
        self.play(LaggedStart(*[x.animate(rate_func=there_and_back).shift(DOWN * 0.15) for x in buts],
                              lag_ratio=0.15), run_time=0.6)
        self.au_mot("5 buts")
        lt3 = VGroup(lt[0].copy(), l10.copy(), l5).arrange(RIGHT, buff=0.3).move_to(P(0, 0.85))
        self.borne(lt3, 0.7)
        self.play(lt[0].animate.move_to(lt3[0]).scale(lt3[0].height / lt[0].height),
                  l10.animate.move_to(lt3[1]).scale(lt3[1].height / l10.height), FadeIn(l5.move_to(lt3[2]),
                                                                                           scale=1.3), run_time=0.4)
        k1 = self.ligne([("5 sur 20", BUT_C), ("= 25 %", VERT_OK)], 32).move_to(P(0, -1.95))
        p25 = self.t("25 %", 22, NUIT).move_to(c.rect)
        self.au_mot("5 sur 20")
        self.play(FadeIn(k1[0], shift=RIGHT * 0.12), Indicate(buts, color=WHITE, scale_factor=1.2), run_time=0.45)
        self.au_mot("25 %")
        self.play(FadeIn(k1[1], scale=1.3), FadeIn(p25, scale=1.3), run_time=0.35)
        k2 = self.ligne([("50 % de 50 %", CADRE_C), ("= 25 %", VERT_OK)], 32).move_to(P(0, -2.5))
        self.borne(k2, 0.7)
        self.au_mot("50 % de 50")
        self.play(FadeIn(k2[0], shift=RIGHT * 0.12), Indicate(c.bande, color=WHITE, scale_factor=1.05),
                  run_time=0.45)
        self.au_mot("25 %", 2)
        self.play(FadeIn(k2[1], scale=1.3), Indicate(c.rect, color=WHITE, scale_factor=1.15), run_time=0.45)
        self.insister(k2, 1.08)
        self.attendre_voix(marge=0.3)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        # ── 02 : la question-pause (3 s) ──
        self.mini = carre(0.7, 0.4, 0.5, centre=P(1.5, -3.2))
        self.play(FadeIn(self.mini.fond), Create(self.mini.contour), FadeIn(self.mini.bande), run_time=0.3)
        self.question_pause("02-question", "02b-reponse",
                            ["40 % des tirs sont cadrés,", "50 % des cadrés : buts.", "Quelle part des tirs ?"],
                            [self.t("90 %", 30), self.t("20 %", 30), self.t("10 %", 30)], 1,
                            ["0,4 × 0,5 = 0,2 = 20 %"],
                            avant_q=lambda sc: self._q_au_mot(sc, ["40 %", "50 %", "Quelle part"]),
                            autres_r=self._rep_q)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        # ── 03 : la question en commentaire ──
        self.dire("03-commentaire")
        et = self.t("À toi !", 40, AMBRE).move_to(P(0, 2.0))
        self.au_mot("À toi")
        self.play(FadeIn(et, scale=1.2), run_time=0.35)
        f3 = carre(1.5, 0.6, 0.3, centre=P(0, -0.15))
        m1 = self.ligne([("60 %", CADRE_C), ("des tirs cadrés,", WHITE)], 32).move_to(P(0, 1.35))
        self.au_mot("60 %")
        self.play(FadeIn(m1[0], scale=1.3), FadeIn(f3.fond), Create(f3.contour), GrowFromEdge(f3.bande, LEFT),
                  run_time=0.45)
        self.au_mot("sont cadrés")
        self.play(FadeIn(m1[1], shift=RIGHT * 0.12), run_time=0.3)
        m2 = self.ligne([("30 %", BUT_C), ("des cadrés : buts.", WHITE)], 32).move_to(P(0, 0.8))
        self.au_mot("30 %")
        self.play(FadeIn(m2[0], scale=1.3), GrowFromEdge(f3.rect, DOWN), run_time=0.4)
        self.au_mot("sont des buts")
        self.play(FadeIn(m2[1], shift=RIGHT * 0.12), run_time=0.3)
        r1 = self.borne(self.t("Quelle part des tirs ?", 34, AMBRE), 0.9).move_to(P(0, -1.15))
        self.au_mot("Quelle part")
        self.play(FadeIn(r1, scale=1.2), Indicate(f3.rect, color=WHITE, scale_factor=1.2), run_time=0.4)
        r2 = VGroup(self.t("Sur 50 tirs :", 30, WHITE), self.t("combien de buts ?", 30, AMBRE))
        r2[0].move_to(P(0, -1.7))
        r2[1].move_to(P(0, -2.2))
        self.au_mot("Et sur 50")
        self.play(FadeIn(r2[0], shift=RIGHT * 0.12), run_time=0.3)
        self.au_mot("combien de buts")
        self.play(FadeIn(r2[1], scale=1.2), run_time=0.35)
        self.insister(r2[1], 1.05)
        self.appel_commentaire(y=-2.68)
