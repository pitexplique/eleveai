# proba_conc_bienayme_short.py
# EleveAI — Maths Tle spé (micro concentration_inegalite_bienayme) — short
# jumeau de « L'inégalité de Bienaymé-Tchebychev ». Ceinture ORANGE.
# Il AMUSE : au cinéma, 120 entrées en moyenne, variance 400 ; s'écarter de
# 50 entrées ? Bienaymé-Tchebychev dit « au plus 0,16 »… et sur 300 séances
# simulées, seulement 8 sortent : moins de 3 % ! La borne est large.
#   · en HAUT la carte `stat_graph` en nuage de points : les 300 VRAIES
#     séances simulées (graine 974, celles de la paysage) tombent ;
#   · en BAS, EN MÊME TEMPS : 120, 400, 50, 0,16, puis 8 sur 300 ;
#   · fin : un écart de 100 ? « Réponds en commentaire ! », puis la phrase
#     de fin.
#
# Voix : manim/voix/terminale-proba-conc-bienayme-short.json (débit −6).
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/proba_conc_bienayme_short.py ShortProbaConcBienaymeTerminale -o eleveai-maths-terminale-proba-conc-bienayme-short --media_dir manim/scripts/terminale/media-conc_bienayme-1s-s

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_conc_bienayme import D, MU, SEANCES, salle, spectateur  # noqa: E402
from proba_conc_moyenne import BATON, BLEU_NB, CHEMIN, CarteNuage, P, frac, suite  # noqa: E402
from proba_conc_moyenne_short import ShortProbaConcMoyenneBase  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

ENCRE = "#0F172A"


class ShortProbaConcBienaymeBase(ShortProbaConcMoyenneBase):
    fichier_marques = "proba_conc_bienayme_short_marques.json"
    nom_voix = "terminale-proba-conc-bienayme-short"

    def marque(self, c, v, texte, color, fs=24):
        y = c.y_axe()
        tr = Line(P(c.x_de(v), y - 0.08), P(c.x_de(v), y + 0.08), color=color, stroke_width=3)
        t = Text(texte, font_size=fs, color=color, weight=BOLD).move_to(P(c.x_de(v), y - 0.28))
        return VGroup(tr, t)

    def construct(self):
        self.margo_bas()

        # ── 00 : 120 entrées, variance 400, un écart de 50 : au plus 0,16 ──
        self.dire("00-accroche")
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        titre = self.t("Au cinéma", 58, JAUNE_TITRE).move_to(P(0, 3.3))
        sa = salle(rangs=3, places=7, s=0.75).move_to(P(0, 0.45))
        self.add(badge, titre, sa)
        tetes = VGroup(*[spectateur(f) for f in sa[2]])
        self.play(LaggedStart(*[FadeIn(h, scale=1.5) for h in tetes], lag_ratio=0.03), run_time=0.8)
        self.au_mot("120 entrées")
        cent20 = suite(self.t("120", 60, VERT_OK), self.t("entrées", 40), buff=0.2).move_to(P(0, -1.4))
        self.play(FadeIn(cent20, scale=1.4), run_time=0.4)
        self.au_mot("variance 400")
        v = suite(self.t("variance", 40), self.t("400", 56, BLEU_NB), buff=0.2).move_to(P(0, -2.15))
        self.play(FadeIn(v, scale=1.4), run_time=0.4)
        self.au_mot("s'écarter de 50")
        c = CarteNuage(larg=4.2, haut=3.0, a=40, b=200, pas=4, r=0.025, marge_bas=0.6).move_to(P(0, 0.45))
        m = VGroup(self.marque(c, 70, "70", CHEMIN), self.marque(c, MU, "120", VERT_OK),
                   self.marque(c, 170, "170", CHEMIN))
        zones = VGroup(*[Rectangle(width=c.x_de(b) - c.x_de(a), height=1.9, stroke_width=0, fill_color=ROUGE_ERREUR,
                                   fill_opacity=0.2).move_to(P((c.x_de(a) + c.x_de(b)) / 2, c.y_axe() + 0.95))
                         for a, b in ((40, 70), (170, 200))])
        ecart = suite(self.t("écart", 40), self.t("50", 56, CHEMIN), buff=0.2).move_to(P(0, -1.4))
        self.play(FadeOut(sa), FadeOut(tetes), FadeIn(c), FadeIn(m), FadeIn(zones), FadeOut(cent20), FadeOut(v),
                  FadeIn(ecart, shift=UP * 0.15), run_time=0.6)
        self.au_mot("au plus 0,16")
        borne = self.cap(suite(self.t("au plus", 42), self.t("0,16", 66, ORANGE_RETENUE), buff=0.25)).move_to(P(0, -2.3))
        self.play(FadeIn(borne, scale=1.4), run_time=0.4)
        self.insister(borne[1], 1.3)
        self.attendre_voix(marge=0.1)

        # ── 01 : 300 séances simulées : seulement 8 dehors ──
        self.dire("01-image")
        self.au_mot("300 séances")
        pts = c.nuage(SEANCES, 0, color=BATON)
        trois = suite(self.t("300", 54, BLEU_NB), self.t("séances", 40), buff=0.2).move_to(P(0, -1.4))
        sur = self.t("Surprise !", 58, JAUNE_TITRE).move_to(P(0, 3.3))
        self.play(ReplacementTransform(titre, sur), FadeOut(ecart), FadeIn(trois, shift=UP * 0.15),
                  LaggedStart(*[FadeIn(p, shift=DOWN * 1.0) for p in pts], lag_ratio=0.004), run_time=1.6)
        self.au_mot("seulement 8")
        rouges = [p for p, s in zip(pts, SEANCES) if abs(s - MU) >= D]
        huit = suite(self.t("8", 66, ROUGE_ERREUR), self.t("dehors", 40), buff=0.2).move_to(P(0, -1.4))
        self.play(*[p.animate.set_color(ROUGE_ERREUR).scale(1.8) for p in rouges], FadeOut(trois),
                  FadeIn(huit, scale=1.4), run_time=0.6)
        self.au_mot("moins de 3 %")
        moins = self.cap(suite(self.t("moins de", 42), self.t("3 % !", 66, ROUGE_ERREUR), buff=0.25)).move_to(P(0, -2.3))
        self.play(FadeOut(borne), FadeIn(moins, scale=1.4), run_time=0.4)
        self.insister(moins[1], 1.3)
        self.au_mot("un majorant")
        maj = VGroup(self.t("0,16 : un majorant,", 40, ORANGE_RETENUE), self.t("souvent large", 40, ORANGE_RETENUE))
        maj.arrange(DOWN, buff=0.08).move_to(P(0, -1.7))
        self.play(FadeOut(VGroup(huit, moins)), FadeIn(maj, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix(marge=0.1)

        # ── 02 : un écart de 100 ? ──
        self.dire("02-question")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 58, JAUNE_TITRE).move_to(P(0, 3.3))
        self.play(ReplacementTransform(sur, et), FadeOut(maj), FadeOut(VGroup(c, m, zones, VGroup(*pts))), run_time=0.4)
        self.au_mot("écart de 100")
        cent = suite(self.t("écart", 50), self.t("100", 80, CHEMIN), buff=0.25).move_to(P(0, 0.9))
        self.play(FadeIn(cent, scale=1.4), run_time=0.5)
        self.au_mot("que vaut la borne")
        qb = self.t("la borne ?", 60, ORANGE_RETENUE).move_to(P(0, -0.4))
        self.play(FadeIn(qb, scale=1.2), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 42, VERT_OK), self.t("commentaire !", 42, VERT_OK))
        appel.arrange(DOWN, buff=0.04).move_to(P(0, -2.0))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=0.6)

        # ── 03 : la fin ──
        self.fin_short("03-abonne", [badge, et, cent, qb, appel])


class ShortProbaConcBienaymeTerminale(ShortProbaConcBienaymeBase):
    identite = "Maths Tle spé — EleveAI"
    ceinture = "orange"
