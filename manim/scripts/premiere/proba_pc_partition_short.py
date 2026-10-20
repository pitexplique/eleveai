# proba_pc_partition_short.py
# EleveAI — Maths 1re spé (micro pc_partition) — short jumeau de « Reconnaître
# une partition de l'univers ». Ceinture ORANGE.
# Il AMUSE : un pari sur un dé. « Pair » je gagne, « multiple de 3 » tu gagnes :
# toujours un seul gagnant ? Non ! Sur le 6 on gagne tous les deux, sur le 1 et
# le 5 personne : les deux paris ne forment pas une partition.
#   · en HAUT le dé qui roule, puis le cas étudié (le 6, puis le 1 et le 5) ;
#   · en BAS, EN MÊME TEMPS : les six faces, cadre bleu = « moi », anneau
#     orange = « toi » ; le chevauchement (6) et l'oubli (1, 5) s'allument ;
#   · fin : « pair » contre « premier » (2, 3 ou 5) : quelle face fait gagner
#     les deux ? « Réponds en commentaire ! », puis la phrase de fin.
# Ti-Margo en bas (margo_bas). Aucun tirage n'est simulé : le dé roule sans
# s'arrêter, puis on regarde des CAS (une face donnée), pas des résultats.
#
# Voix : manim/voix/premiere-proba-partition-short.json (débit −6), calée mot à
# mot par proba_pc_partition_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/proba_pc_partition_short.py ShortProbaPartitionPremiere -o eleveai-maths-premiere-proba-partition-short --media_dir manim/scripts/premiere/media-partition-1s

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_pc_partition import COUL_M3, COUL_PAIR, MotsCales, P, de, suite  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from annonce_probabilites import de_qui_roule  # noqa: E402

LARGEUR_MAX = 4.1


class ShortProbaPartitionPremiere(MotsCales, Short6e):
    fichier_marques = "proba_pc_partition_short_marques.json"
    nom_voix = "premiere-proba-partition-short"
    identite = "Maths 1re spé — EleveAI"
    ceinture = "orange"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.4, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def construct(self):
        self.margo_bas()

        # ── 00 : le pari ──
        self.dire("00-accroche")
        titre = self.grand("Pari sur un dé", font_size=44, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), run_time=0.6)
        roule = de_qui_roule(P(0, 0.85), cote=1.25)
        self.add(roule)
        fs = VGroup(*[de(k, 0.56) for k in range(1, 7)]).arrange(RIGHT, buff=0.16).move_to(P(0, -0.75))
        self.play(LaggedStart(*[FadeIn(f, scale=0.5) for f in fs], lag_ratio=0.1), run_time=0.7)
        self.au_mot("Pair")
        moi = self.t("Moi : pair", 32, COUL_PAIR).move_to(P(0, -1.55))
        cadres = VGroup(*[SurroundingRectangle(fs[k - 1], color=COUL_PAIR, buff=0.06, stroke_width=5)
                          for k in (2, 4, 6)])
        self.play(FadeIn(moi, scale=1.3), LaggedStart(*[Create(c) for c in cadres], lag_ratio=0.2), run_time=0.6)
        self.au_mot("Multiple de 3")
        toi = self.t("Toi : multiple de 3", 32, COUL_M3).move_to(P(0, -2.1))
        anneaux = VGroup(*[Circle(radius=0.38, color=COUL_M3, stroke_width=5).move_to(fs[k - 1]) for k in (3, 6)])
        self.play(FadeIn(toi, scale=1.3), LaggedStart(*[Create(c) for c in anneaux], lag_ratio=0.2), run_time=0.6)
        self.au_mot("Toujours un seul gagnant")
        q = self.t("Un seul gagnant ?", 34, JAUNE_TITRE).move_to(P(0, 2.3))
        self.play(FadeOut(badge), FadeIn(q, scale=1.3), run_time=0.4)
        self.attendre_voix(marge=0.1)

        # ── 01 : non ! le 6 : deux gagnants ; le 1 et le 5 : personne ──
        self.dire("01-surprise")
        self.au_mot("Non")
        non = self.grand("NON !", font_size=60, color=ROUGE_ERREUR).move_to(P(0, 2.3))
        roule.clear_updaters()
        self.play(FadeOut(q), FadeIn(non, scale=2), FadeOut(roule), run_time=0.4)
        self.au_mot("Sur le 6")
        six = de(6, 1.25).move_to(P(0, 0.85))
        deux = VGroup(self.t("moi", 30, COUL_PAIR), self.t("toi", 30, COUL_M3)).arrange(RIGHT, buff=1.9)
        deux.move_to(P(0, 0.85))
        self.play(FadeOut(non), FadeIn(six, scale=0.6), run_time=0.4)
        self.au_mot("tous les deux")
        self.play(FadeIn(deux, scale=1.5), Indicate(fs[5], color=ROUGE_ERREUR, scale_factor=1.4),
                  Flash(six, color=JAUNE_TITRE), run_time=0.6)
        self.au_mot("Sur le 1")
        cas = VGroup(de(1, 1.05), de(5, 1.05)).arrange(RIGHT, buff=0.7).move_to(P(0, 0.85))
        self.play(FadeOut(six), FadeOut(deux), FadeIn(cas, scale=0.6), run_time=0.4)
        trous = VGroup(*[Circle(radius=0.38, color=ROUGE_ERREUR, stroke_width=5).move_to(fs[k - 1]) for k in (1, 5)])
        self.play(Create(trous), run_time=0.4)
        self.au_mot("personne")
        pers = self.t("personne !", 40, ROUGE_ERREUR).move_to(P(0, 2.3))
        self.play(FadeIn(pers, scale=1.5), *[Wiggle(c) for c in cas], run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question : « pair » contre « premier » ──
        self.dire("02-question")
        self.play(FadeOut(cas), FadeOut(pers), FadeOut(trous), run_time=0.3)
        self.au_mot("« premier »")
        toi2 = self.t("Toi : premier", 32, COUL_M3).move_to(toi)
        self.play(Transform(toi, toi2), FadeOut(anneaux), run_time=0.5)
        self.au_mot("2, 3 ou 5")
        an2 = VGroup(*[Circle(radius=0.38, color=COUL_M3, stroke_width=5).move_to(fs[k - 1]) for k in (2, 3, 5)])
        self.play(LaggedStart(*[Create(c) for c in an2], lag_ratio=0.3), run_time=0.7)
        self.au_mot("Quelle face")
        pq = self.grand("?", font_size=120, color=JAUNE_TITRE).move_to(P(0, 0.85))
        self.play(FadeIn(pq, scale=0.4), run_time=0.4)
        self.insister(pq, 1.25)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 40, VERT_OK), self.t("commentaire !", 40, VERT_OK))
        appel.arrange(DOWN, buff=0.06).move_to(P(0, 2.45))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.08)
        self.attendre_voix(marge=0.3)

        # ── 03 : la fin ──
        self.dire("03-fin")
        self.play(FadeOut(VGroup(titre, appel, pq, fs, cadres, an2, moi, toi)), run_time=0.4)
        entraine = self.t("Entraîne-toi sur", 36, JAUNE_TITRE).move_to(P(0, 2.2))
        site = self.t("eleveai.fr", 50, BLEU_CALCUL).move_to(P(0, 1.2))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.2, stroke_width=3)
        abonne = self.t("Abonne-toi !", 40, VERT_OK).move_to(P(0, -0.2))
        poignee = self.t("@eleveai974", 40, VERT_OK).move_to(P(0, -1.0))
        self.play(Write(entraine), run_time=0.5)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.5)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), run_time=0.5)
        self.play(Indicate(poignee, color=VERT_OK, scale_factor=1.15))
        self.attendre_voix(marge=1.0)
