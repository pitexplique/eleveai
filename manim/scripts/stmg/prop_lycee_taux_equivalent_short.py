# prop_lycee_taux_equivalent_short.py
# EleveAI — Maths Terminale STMG — short jumeau de l'épisode 06 « Taux
# proportionnel, taux équivalent » (micro suiteT_taux_equivalent_proportionnel,
# notion suite_comparer). CEINTURE BLANCHE (règle du short blanc, REGLES.md) :
# on VOIT les intérêts s'ajouter. Il AMUSE : « 1 % par mois, ça fait 12 % par an ? »
#   · EN HAUT, l'image qui bouge : une tirelire de 100 €, une pièce y tombe
#     chaque mois, le compteur 101 ; 102,01 ; 103,03 … 112,68 € ;
#   · EN BAS, au même instant, la frise des 12 mois s'allume case par case ;
#     code couleur partagé : le VERT du compteur = la case du mois gagné ;
#   · la surprise : 112,68 € face à « 112 € » barré ;
#   · 1 question-pause (3 s) : 1 % par mois pendant 12 mois → ≈ 12,7 % ;
#   · fin : 2 % par mois pendant 12 mois, quel taux sur l'année ? (≈ 26,8 %).
# Centres d'intérêt : argent-budget, jeux-defis.
# Chiffres : une tirelire de 100 € à 1 % par mois, inventée : pas de source.
# Calculs : 100 × 1,01^k (k = 1 à 12) : 101 ; 102,01 ; 103,03 ; 104,06 ;
# 105,10 ; 106,15 ; 107,21 ; 108,29 ; 109,37 ; 110,46 ; 111,57 ; 112,68.
#
# Voix : manim/voix/stmg-prop-taux-equivalent-short.json (validée par Frédéric
# le 02/11, débit −10) ; WAV : public/sons/stmg-prop-taux-equivalent-short/ ;
# marques : manim/scripts/stmg/prop_lycee_taux_equivalent_short_marques.json.
# Outils (non modifiés) : prop_commun.py (ShortProp), canvas_proportion.py.
# Ajouté ICI : tirelire(), piece(), frise_mois(), puiss() (exposant).
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/stmg/prop_lycee_taux_equivalent_short.py PropLyceeTauxEquivalentShort
# PYTHONIOENCODING=utf-8 python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/prop_lycee_taux_equivalent_short.py PropLyceeTauxEquivalentShort -o eleveai-maths-stmg-prop-taux-equivalent-short --media_dir manim/scripts/stmg/media-prop-lycee-taux-short
# Sortie : manim/sorties/stmg/maths/proportionnalite/06-taux-equivalent/eleveai-maths-stmg-prop-taux-equivalent-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))  # le dossier du script EN TÊTE

from prop_commun import *  # noqa: E402,F403

GAIN = "#22c55e"       # l'argent gagné, la case du mois (vert)
OR_C = "#fbbf24"
ROSE = "#f9a8d4"
VALEURS = ["101", "102,01", "103,03", "104,06", "105,10", "106,15", "107,21", "108,29", "109,37", "110,46",
           "111,57", "112,68"]


def pas_audit(m):
    """Décor ou donnée redite : sans synchro ni audit (toute la famille de m)."""
    for f in m.get_family():
        f._pas_audit = True
        f.sans_synchro = True
    return m


def tirelire(s=1.0):
    """Une tirelire cochon : corps, groin, oreille, œil, pattes, fente."""
    corps = Ellipse(width=2.2, height=1.5, fill_color=ROSE, fill_opacity=1, stroke_color="#db2777", stroke_width=4)
    groin = Ellipse(width=0.45, height=0.55, fill_color="#f472b6", fill_opacity=1, stroke_width=0).move_to(P(1.12, -0.05))
    narines = VGroup(*[Dot(P(1.12, dy), radius=0.05, color="#9d174d") for dy in (0.08, -0.15)])
    oreille = Triangle(fill_color="#f472b6", fill_opacity=1, stroke_width=0).scale(0.28).move_to(P(0.55, 0.78))
    oeil = Dot(P(0.7, 0.25), radius=0.07, color="#111827")
    pattes = VGroup(*[RoundedRectangle(width=0.28, height=0.4, corner_radius=0.08, fill_color="#f472b6",
                                       fill_opacity=1, stroke_width=0).move_to(P(x, -0.78)) for x in (-0.6, 0.55)])
    fente = RoundedRectangle(width=0.55, height=0.09, corner_radius=0.04, fill_color="#831843", fill_opacity=1,
                             stroke_width=0).move_to(P(-0.1, 0.68))
    queue = Arc(radius=0.15, start_angle=0, angle=1.6 * PI, color="#db2777", stroke_width=4).move_to(P(-1.2, 0.15))
    return VGroup(pattes, queue, corps, oreille, groin, narines, oeil, fente).scale(s)


def piece(r=0.16):
    d = Circle(radius=r, fill_color=OR_C, fill_opacity=1, stroke_color="#b45309", stroke_width=3)
    e = Text("€", font_size=int(r * 90), color="#92400e", weight=BOLD).move_to(d)
    return pas_audit(VGroup(d, e))


def frise_mois(largeur=4.0, h=0.42, centre=ORIGIN):
    w = largeur / 12
    cases = VGroup(*[RoundedRectangle(width=w - 0.05, height=h, corner_radius=0.05, fill_color="#1e293b",
                                      fill_opacity=1, stroke_color="#94a3b8", stroke_width=2)
                     .move_to(P((i + 0.5) * w - largeur / 2, 0)) for i in range(12)])
    noms = pas_audit(VGroup(*[Text(str(i + 1), font_size=14, color=GREY_B).move_to(c) for i, c in enumerate(cases)]))
    g = VGroup(cases, noms).move_to(centre)
    g.cases, g.noms = cases, noms
    return g


def puiss(base, expo, fs, couleur):
    b = Text(base, font_size=fs, color=couleur)
    e = Text(expo, font_size=int(fs * 0.6), color=couleur)
    ref = Text("1", font_size=fs).move_to(b)
    e.next_to(b, RIGHT, buff=0.03)
    e.set_y(ref.get_top()[1] - e.height * 0.25)
    return b, e


def ligne_p(items, fs=30, buff=0.12):
    out, x = [], 0.0
    for it in items:
        if len(it) == 3:
            b, e = puiss(it[0], it[1], fs, it[2])
            dx = x - b.get_left()[0]
            b.shift(RIGHT * dx + UP * (0 - b.get_y()))
            e.shift(RIGHT * dx + UP * (0 - Text(it[0], font_size=fs).get_y()))
            out += [b, e]
            x = e.get_right()[0] + buff
        else:
            t = Text(it[0], font_size=fs, color=it[1])
            t.shift(RIGHT * (x - t.get_left()[0]) + UP * (0 - t.get_y()))
            out.append(t)
            x = t.get_right()[0] + buff
    return VGroup(*out)


def garder_q(sc):
    """Ce qui ne bouge jamais pendant la réponse (Ti-Margo, titre, ceintures)."""
    return getattr(sc, "_garder", [])


class PropLyceeTauxEquivalentShort(ShortProp):
    nom_voix = "stmg-prop-taux-equivalent-short"
    fichier_marques = "prop_lycee_taux_equivalent_short_marques.json"
    ceinture = "blanche"
    YC = 0.05       # le compteur

    def compteur(self, v, couleur=GAIN):
        return Text(f"{v} €", font_size=50, color=couleur, weight=BOLD).move_to(P(0, self.YC))

    def chute(self, cochon):
        """Une pièce tombe dans la fente (décor)."""
        fente = cochon[-1].get_center()
        p = piece(0.15).move_to(fente + UP * 0.45)
        return p, Succession(FadeIn(p, run_time=0.1), p.animate(run_time=0.3).move_to(fente),
                             FadeOut(p, run_time=0.1))

    def _disposer_q(self, question, choix, phrase):
        """03/11 : la phrase de réponse en 28 (au lieu de 26), même place."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        ph2 = self.bloc(phrase, 28, VERT_OK).next_to(cartes, DOWN, buff=0.12).set_x(0)
        self.ph_q = ph2
        return tete, q, cartes, pause, rebours, ph2

    def _rep_q(self, sc):
        ref = sc.ph_q[0]
        l0 = ligne_p([("1,01", "12", VERT_OK), ("≈ 1,1268 :", VERT_OK)], fs=30)
        if l0.width > config.frame_width - 0.9:
            l0.scale_to_fit_width(config.frame_width - 0.9)
        l0.move_to(ref)
        l0b = sc.ligne_rep(1, ["≈ 12,7 %."], fs=28)
        # 03/11 : tout en 28 ; « Les intérêts rapportent » tient sur deux lignes (4,6 de large en 28) :
        # les choix A et C (faux, pâlis) s'effacent, la carte B (et sa coche) monte à la place de A
        l1 = sc.ligne_rep(2, ["Les intérêts"], fs=28)
        l1c = sc.ligne_rep(3, ["rapportent"], fs=28)
        l1b = sc.ligne_rep(4, ["des intérêts."], fs=28)
        ca, cb, c = sc.cartes_q
        coche = [m for m in sc.mobjects if len(m.get_all_points()) and cb not in m.get_family()
                 and m not in garder_q(sc)
                 and cb.get_left()[0] < m.get_center()[0] < cb.get_right()[0]
                 and abs(m.get_y() - cb.get_y()) < cb.height / 2]
        dyb = ca.get_top()[1] - cb.get_top()[1]
        dy = cb.get_bottom()[1] + dyb - 0.12 - l0.get_top()[1]
        for m in (l0, l0b, l1, l1c, l1b):
            m.shift(UP * dy)
        sc.play(FadeOut(c), FadeOut(ca), cb.animate.shift(UP * dyb), *[m.animate.shift(UP * dyb) for m in coche],
                run_time=0.2)
        sc.au_mot("1,01")
        sc.play(FadeIn(l0[0], shift=UP * 0.12), run_time=0.3)
        sc.au_mot("puissance 12")
        sc.play(FadeIn(l0[1], scale=1.3), run_time=0.3)
        sc.au_mot("environ 1,1268")
        sc.play(FadeIn(l0[2], shift=UP * 0.12), run_time=0.3)
        sc.au_mot("environ 12")
        sc.play(FadeIn(l0b, scale=1.3), run_time=0.35)
        sc.au_mot("Les intérêts")
        sc.play(FadeIn(l1, shift=UP * 0.12), run_time=0.3)
        sc.au_mot("rapportent")
        sc.play(FadeIn(l1c, shift=UP * 0.12), run_time=0.3)
        sc.au_mot("des intérêts")
        sc.play(FadeIn(l1b, shift=UP * 0.12), run_time=0.3)
        sc.rep_fini()

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("La tirelire", self.ceinture)
        titre.sans_synchro = True  # le titre de la vidéo : posé d'un bloc
        self.add(badge)
        garder = [margo, titre, badge]
        self._garder = garder
        co = tirelire(0.8).move_to(P(0, 1.45))

        # ── 00 : l'accroche : 1 % par mois = 12 % par an ? ──
        self.dire("00-accroche")
        l1 = self.ligne([("1 %", AMBRE), ("par mois,", WHITE)], 42).move_to(P(0, -0.4))
        l2 = self.ligne([("12 % par an ?", ORANGE_RETENUE)], 36).move_to(P(0, -1.4))
        self.au_mot("1 %")
        self.play(Write(titre), FadeIn(co, shift=DOWN * 0.2), FadeIn(l1[0], scale=1.3), run_time=0.5)
        self.au_mot("par mois")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.12), run_time=0.3)
        self.au_mot("12 %")
        self.play(FadeIn(l2, scale=1.2), run_time=0.4)
        self.insister(l2, 1.1)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(l1), FadeOut(l2), run_time=0.3)

        # ── 01 : le compteur 100 → 101 → 102,01 → 103,03 … 112,68 ; la frise ──
        self.dire("01-image")
        cadre = RoundedRectangle(width=3.9, height=0.95, corner_radius=0.14, fill_color="#0b1220", fill_opacity=1,
                                 stroke_color="#94a3b8", stroke_width=3).move_to(P(0, self.YC))
        cpt = self.compteur("100", WHITE)
        self.au_mot("100 euros")
        self.play(FadeIn(cadre), FadeIn(cpt, scale=1.3), run_time=0.4)
        plus = self.ligne([("+ 1 %", AMBRE), ("chaque mois", WHITE)], 28).move_to(P(0, -0.8))
        fr = frise_mois(4.0, 0.42, P(0, -1.5))
        self.au_mot("Plus 1")
        self.play(FadeIn(plus[0], scale=1.3), run_time=0.3)
        self.au_mot("chaque mois")
        self.play(FadeIn(plus[1], shift=RIGHT * 0.12), FadeIn(fr, shift=UP * 0.15), run_time=0.4)
        for k, mot in ((0, "101"), (1, "102,01"), (2, "103")):
            p, chute = self.chute(co)
            self.au_mot(mot)
            nv = self.compteur(VALEURS[k])
            self.play(FadeOut(cpt, shift=UP * 0.25), FadeIn(nv, shift=UP * 0.25), fr.cases[k].animate.set_fill(GAIN, 1),
                      chute, run_time=0.5)
            cpt = nv
            self.remove(p)
        self.au_mot("Au bout")
        for k in range(3, 11):
            nv = pas_audit(self.compteur(VALEURS[k]))
            self.play(FadeOut(cpt, shift=UP * 0.2), FadeIn(nv, shift=UP * 0.2), fr.cases[k].animate.set_fill(GAIN, 1),
                      run_time=0.18)
            cpt = nv
        self.au_mot("112,68")
        nv = self.compteur(VALEURS[11])
        self.play(FadeOut(cpt, shift=UP * 0.25), FadeIn(nv, shift=UP * 0.25), fr.cases[11].animate.set_fill(GAIN, 1),
                  Indicate(co, color=GAIN), run_time=0.45)
        cpt = nv
        self.insister(cpt, 1.15)
        cmp = self.ligne([("Pas", WHITE), ("112 €", ROUGE_ERREUR), ("!", WHITE)], 44).move_to(P(0, -2.3))
        self.au_mot("Pas 112")
        self.play(FadeIn(cmp, scale=1.2), run_time=0.35)
        self.play(Create(Line(cmp[1].get_left() + LEFT * 0.08, cmp[1].get_right() + RIGHT * 0.08,
                              color=ROUGE_ERREUR, stroke_width=7)), run_time=0.3)
        self.attendre_voix(marge=0.3)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        # ── 02 : la question-pause (3 s) ──
        self.question_pause("02-question", "02b-reponse", ["1 % par mois pendant 12 mois.", "Combien sur l'année ?"],
                            [self.t("12 %", 30), self.t("≈ 12,7 %", 30), self.t("1 %", 30)], 1,
                            ["1,01^12 ≈ 1,1268 :", "≈ 12,7 %.", "Les intérêts", "rapportent", "des intérêts."],
                            mot_q="1 % par mois", autres_r=self._rep_q)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        # ── 03 : la question en commentaire : 2 % par mois ──
        self.dire("03-commentaire")
        co3 = pas_audit(tirelire(0.8)).move_to(P(0, 1.45))
        c1 = self.ligne([("2 %", AMBRE), ("par mois", WHITE)], 42).move_to(P(0, 0.05))
        self.au_mot("À toi")
        self.play(FadeIn(co3, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("2 %")
        self.play(FadeIn(c1[0], scale=1.3), run_time=0.3)
        self.au_mot("par mois")
        self.play(FadeIn(c1[1], shift=RIGHT * 0.12), run_time=0.3)
        c2 = self.ligne([("pendant", WHITE), ("12 mois", AMBRE)], 40).move_to(P(0, -0.75))
        self.au_mot("pendant")
        self.play(FadeIn(c2[0], shift=RIGHT * 0.12), run_time=0.3)
        self.au_mot("12 mois")
        self.play(FadeIn(c2[1], scale=1.2), run_time=0.3)
        c3 = self.ligne([("Quel taux", ORANGE_RETENUE), ("sur l'année ?", ORANGE_RETENUE)], 29).move_to(P(0, -1.5))
        self.au_mot("Quel taux")
        self.play(FadeIn(c3, scale=1.2), run_time=0.4)
        self.play(Indicate(c3, color=ORANGE_RETENUE, scale_factor=1.0), run_time=0.4)
        self.appel_commentaire(y=-2.3)
