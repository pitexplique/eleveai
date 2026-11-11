# suite_arith_variation_short.py
# EleveAI — Maths 1re (sans spé) — short « Sens de variation : tu paries que tu
# sais si elle monte ou descend, sans rien calculer ? » (9:16), ceinture BLANCHE
# (échelle entière sous le titre, 70 %). Série SUITES, épisode 06.
# Micro du coach : lin_suite_variation.
#   · 00-garde      : le titre, l'échelle, le pari en gros ; la flèche verte qui
#                     monte à « monte », la violette qui descend à « descend » ;
#   · 01-situation  : EN HAUT le bassin vu de dessus, un couloir par semaine : le
#                     nageur fait son 100 m ; EN BAS, sous chaque couloir, sa case
#                     (62 ; 61,5 ; 61) se remplit EN MÊME TEMPS ;
#   · 02-raison     : les flèches « − 0,5 » sautent de case en case, r = −0,5 ;
#   · 03/03b        : question-pause (C : décroissante), 3 s ; les temps descendent,
#                     « bonne nouvelle » (une médaille) ;
#   · 04-commentaire: « Et toi ? » 62 s, 8 semaines plus tard : ? (réponse 58 s =
#                     62 − 8 × 0,5, NON affichée), « Réponds en commentaire ! » ;
#   · 05-abonne     : la fin du 05/11 (« Un pouce · La cloche »).
# Code couleur (module commun) : bleu = termes, orange = raison, vert = juste et
# « croissante », violet = « décroissante ».
# Voix : manim/voix/premiere-suite-arith-variation-short.json (débit −6),
# calée par suite_arith_variation_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/suite_arith_variation_short.py SuiteArithVariationShort -o eleveai-maths-premiere-suite-arith-variation-short --media_dir manim/scripts/premiere/media-suite-arith-variation-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_variation import AuditMilliers, MONTE, DESCEND, PLAT, fleche_sens  # noqa: E402,F401

TEMPS = [62, 61.5, 61]
assert all(abs(b - a + 0.5) < 1e-9 for a, b in zip(TEMPS, TEMPS[1:]))     # r = −0,5 → C (décroissante)
assert 62 - 8 * 0.5 == 58                                                   # le commentaire : 58 s
XS = (-1.42, 0.0, 1.42)                    # les 3 couloirs (semaines 1 à 3) et leurs cases
Y_BAS, Y_HAUT, Y_CASES = 0.38, 1.42, -0.32
PEAU, BONNET, EAU_B = "#c68642", "#EC4899", "#0EA5E9"


def nageur(s=1.0):
    """Le nageur vu de dessus, tête vers le haut (crawl : un bras devant)."""
    corps = Ellipse(width=0.2, height=0.5, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, -0.12))
    tete = Circle(radius=0.085, fill_color=BONNET, fill_opacity=1, stroke_width=0).move_to(P(0, 0.2))
    b1 = Line(P(0.07, 0.08), P(0.12, 0.42), stroke_color=PEAU, stroke_width=6)
    b2 = Line(P(-0.07, 0.08), P(-0.2, -0.14), stroke_color=PEAU, stroke_width=6)
    remous = VGroup(*[Arc(radius=0.12 + 0.07 * k, start_angle=PI * 1.15, angle=PI * 0.7, stroke_color=WHITE,
                          stroke_width=2, stroke_opacity=0.7).move_to(P(0, -0.42 - 0.07 * k)) for k in range(2)])
    return VGroup(remous, corps, b1, b2, tete).scale(s)


def medaille(r=0.32):
    rub = VGroup(Polygon(P(-0.2, 0.75), P(-0.02, 0.75), P(0.06, 0.2), P(-0.1, 0.2)),
                 Polygon(P(0.2, 0.75), P(0.02, 0.75), P(-0.06, 0.2), P(0.1, 0.2)))
    rub.set_fill(TERME, 1).set_stroke(width=0)
    disque = Circle(radius=r, fill_color="#FACC15", fill_opacity=1, stroke_color="#CA8A04", stroke_width=4)
    etoile = Star(5, outer_radius=r * 0.55, inner_radius=r * 0.24, fill_color="#CA8A04", fill_opacity=1,
                  stroke_width=0)
    return VGroup(rub, disque, etoile).arrange(DOWN, buff=-0.08)


class SuiteArithVariationShort(AuditMilliers, ShortSuites):
    fichier_marques = "suite_arith_variation_short_marques.json"
    nom_voix = "premiere-suite-arith-variation-short"
    identite = "Maths 1re — EleveAI"
    ceinture = "blanche"

    def entete(self, titre, extrait=None, fs=40):
        """Celle du module commun, le titre un peu plus haut et l'échelle un peu
        plus bas : les jambages du titre ne touchent plus les ceintures."""
        if getattr(self, "_margo", None) is None:
            self._margo = self.margo_bas()
        self.badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7)
        self.badge.move_to(P(0, 2.86))
        self.titre_s = self.t(titre, fs, JAUNE_TITRE).move_to(P(0, 3.52))
        self.add(self.badge)
        self.au_mot(extrait or titre)
        self.play(Write(self.titre_s), run_time=0.5)
        return self.titre_s, self.badge

    def bassin(self):
        eau = Rectangle(width=4.1, height=Y_HAUT - Y_BAS + 0.2, fill_color=EAU_B, fill_opacity=0.3,
                        stroke_color=EAU_B, stroke_width=3).move_to(P(0, (Y_HAUT + Y_BAS) / 2))
        lignes = VGroup(*[DashedLine(P(x, Y_BAS - 0.1), P(x, Y_HAUT + 0.1), stroke_color=WHITE, stroke_width=2,
                                     dash_length=0.08) for x in (-0.71, 0.71)])
        return VGroup(eau, lignes)

    def construct(self):
        # ── 00 : la garde : titre, échelle (70 %), le pari ; les deux flèches ──
        self.dire("00-garde")
        self.entete("Sens de variation", extrait="Sens", fs=40)
        pari = self.paragraphe(["Tu paries que", "tu sais si elle", ("monte ou descend,", TERME),
                                ("sans rien calculer ?", RAISON)], self.fs_grand - 4, buff=0.2, y=1.15)
        for ligne, ex in zip(pari[:2], ("Tu paries", "tu sais")):
            self.au_mot(ex)
            self.play(FadeIn(ligne, shift=UP * 0.1), run_time=0.25)
        fm = fleche_sens(1, 1.25, 12).move_to(P(-1.0, -1.55))
        fd = fleche_sens(-1, 1.25, 12).move_to(P(1.0, -1.55))
        self.au_mot("monte")
        self.play(FadeIn(pari[2], shift=UP * 0.1), GrowArrow(fm), run_time=0.3)
        self.au_mot("descend")
        self.play(GrowArrow(fd), run_time=0.3)
        self.au_mot("sans rien")
        self.play(FadeIn(pari[3], shift=UP * 0.1), run_time=0.3)
        pt = self.t("?", 64, RAISON).move_to(P(0, -1.55))
        self.play(FadeIn(pt, scale=1.5), run_time=0.3)
        self.attendre_voix(marge=0.2)

        # ── 01 : EN HAUT le bassin ; EN BAS les cases, sous les couloirs ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        nom = self.t("Un nageur", 42, JAUNE_TITRE).move_to(P(0, 2.22))
        dist = self.t("s'entraîne au 100 m", 34, TERME).move_to(P(0, 1.82))
        self.au_mot("nageur")
        self.play(FadeIn(nom, shift=UP * 0.1), run_time=0.3)
        self.au_mot("100")
        bas = self.bassin()
        self.play(FadeIn(dist, shift=UP * 0.1), FadeIn(bas), run_time=0.35)
        cs = self.t("chaque semaine", 38, GREY_A).move_to(P(0, -1.3))
        self.au_mot("Chaque semaine")
        self.play(FadeIn(cs, shift=UP * 0.1), run_time=0.3)
        gagne = VGroup(self.t("il gagne", 40), self.t("0,5 s", 48, RAISON)).arrange(RIGHT, buff=0.2)
        gagne.move_to(P(0, -2.05))
        self.au_mot("il gagne")
        self.play(FadeIn(gagne[0], shift=UP * 0.1), run_time=0.25)
        self.suivre("0,5")
        self.play(FadeIn(gagne[1], scale=1.3), run_time=0.3)
        lg = LigneTermes([fr(v) for v in TEMPS], xs=XS, centre=P(0, Y_CASES), largeur=1.25, hauteur=0.78, fs=34)
        nag = []
        for k, v in enumerate(TEMPS):
            self.suivre(fr(v))
            n = nageur(0.85).move_to(P(XS[k], Y_BAS + 0.3))
            lien = DashedLine(P(XS[k], Y_BAS - 0.1), lg.cases[k][0].get_top() + UP * 0.03, color=GREY_B,
                              stroke_width=2, dash_length=0.06)
            self.play(FadeIn(n, scale=0.8), FadeIn(lg.cases[k][0], scale=0.8), FadeIn(lg.cases[k][1], scale=1.4),
                      Create(lien), run_time=0.25)
            self.play(n.animate.move_to(P(XS[k], Y_HAUT - 0.3)), run_time=0.45, rate_func=smooth)
            nag.append(VGroup(n, lien))
        self.attendre_voix(marge=0.2)

        # ── 02 : la raison −0,5 ──
        self.dire("02-raison")
        self.play(FadeOut(cs), FadeOut(gagne), run_time=0.25)        # effacés AVANT les arcs
        self.au_mot("retire")
        sauts = [lg.saut(k, "− 0,5", fs=32, creux=0.2) for k in range(2)]
        self.suivre("0,5")
        self.play(*[Create(s[0]) for s in sauts], run_time=0.3)
        self.play(*[FadeIn(s[1], scale=1.4) for s in sauts], run_time=0.2)
        self.au_mot("la raison")
        rr = VGroup(self.t("raison :", 42), self.t("r =", 46, RAISON), self.t("−0,5", 46, RAISON))
        rr.arrange(RIGHT, buff=0.15)
        rr[1:].shift(RIGHT * 0.1)
        rr[2].shift(RIGHT * 0.15)                        # une espace nette après le « = »
        if rr.width > 3.4:
            rr.scale_to_fit_width(3.4)
        rr.move_to(P(0, -2.15))
        self.play(FadeIn(rr[:2], shift=UP * 0.1), run_time=0.25)
        self.suivre("0,5")
        cadr = self.encadre(rr[1:], RAISON, 0.12)
        self.play(FadeIn(rr[2], scale=1.4), Create(cadr), run_time=0.3)
        self.insister(VGroup(rr, cadr), 1.08)
        self.attendre_voix(marge=0.3)

        # ── 03 : question-pause → C ──
        q = self.poser_question("03-question",
                                [(self.t("La suite", 42), "La suite"), (self.t("de ses temps est :", 42), "de ses")],
                                ["croissante", "constante", "décroissante"], 2, y_question=2.85)
        self.dire("03b-reponse")
        ok = self.q_reponse(q, 2)
        haut = q.cartes[0].get_center()
        self.play(FadeOut(q.cartes[0]), FadeOut(q.cartes[1]), FadeOut(q.question), run_time=0.25)
        self.play(VGroup(q.cartes[2], ok).animate.move_to(P(0, 2.1)), run_time=0.35)
        neg = self.t("la raison est négative", 40, DESCEND).move_to(P(0, 1.05))
        self.au_mot("négative")
        self.play(FadeIn(neg, shift=UP * 0.1), run_time=0.3)
        fd = fleche_sens(-1, 0.7, 10)
        td = VGroup(self.t("les temps", 34), self.t("descendent", 34, DESCEND)).arrange(DOWN, buff=0.1)
        VGroup(fd, td).arrange(RIGHT, buff=0.3).move_to(P(0, -0.2))
        self.au_mot("les temps")
        self.play(GrowArrow(fd), FadeIn(td, shift=LEFT * 0.1), run_time=0.4)
        med = medaille(0.34)
        bn = VGroup(self.t("une bonne", 40, JUSTE), self.t("nouvelle !", 40, JUSTE)).arrange(DOWN, buff=0.1)
        VGroup(med, bn).arrange(RIGHT, buff=0.3).move_to(P(0, -1.95))
        self.au_mot("bonne")
        self.play(FadeIn(med, scale=0.6), FadeIn(bn, shift=UP * 0.1), run_time=0.4)
        self.play(Flash(med, color="#FACC15", line_length=0.2), run_time=0.4)
        self.attendre_voix(marge=0.3)
        del haut

        # ── 04 : la question en commentaire, dans l'ordre de la voix ──
        self.nouvel_ecran("04-commentaire", garder=(self.badge,))
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 54, JAUNE_TITRE).move_to(P(0, 3.45))
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        lc = LigneTermes(["62 s", "?"], xs=(-1.3, 1.3), centre=P(0, 2.0), largeur=1.45, hauteur=0.82, fs=42)
        self.au_mot("62")
        self.montrer_case(lc, 0)
        question = self.paragraphe([("Quel temps", RAISON), "fera-t-il après", ("8 semaines ?", RAISON)], 46,
                                   buff=0.14, y=-0.05)
        fl = Arrow(lc.cases[0][0].get_right(), lc.cases[1][0].get_left(), buff=0.12, color=RAISON, stroke_width=5,
                   max_tip_length_to_length_ratio=0.25)
        h8 = self.t("8 semaines", 32, RAISON).move_to(P(0, 1.3))
        self.au_mot("quel temps")
        self.play(FadeIn(question[0], shift=UP * 0.1), FadeIn(lc.cases[1], scale=1.3), run_time=0.3)
        self.au_mot("fera")
        self.play(FadeIn(question[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("8 semaines")
        self.play(FadeIn(question[2], shift=UP * 0.1), GrowArrow(fl), FadeIn(h8), run_time=0.35)
        self.play(Indicate(lc.cases[1], color=RAISON), run_time=0.4)
        self.appel_commentaire(-2.35)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne")
