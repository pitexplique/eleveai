# rond_point_short.py
# EleveAI — « Les maths en vrai » — short « le hasard crée le bouchon ». CEINTURE BLANCHE.
# Voix validée : manim/voix/974-rond-point-short-hasard.json (Julie, débit −4).
# La paysage (ceinture noire) : rond_point.py — mêmes billes, même graine.
#
# ⭐ RÈGLE DU SHORT BLANC : en HAUT l'image (deux voies vers le rond-point), en
# BAS les nombres qui se remplissent en même temps (la file, son maximum).
# ⭐ Pas de formule : la question finale est un calcul à une seule réponse
# (3 600 ÷ 4 = 900 voitures en 1 h).
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/974/rond_point_short.py RondPoint974Short -o eleveai-maths-974-rond-point-short-hasard --media_dir manim/scripts/974/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *

from charte import *
from gabarit_sixieme import Short6e
from signes_expression_2de import echelle_ceintures
from rond_point import (ATTENTE, BILLE, DUREE_SIMULEE, GRAINE_HASARD, File, arrivees_hasard,
                        arrivees_regulieres, compteur_file, voiture)

VOIE = dict(x0=-2.15, xg=1.15, rayon=0.35, vitesse=0.08, ecart=0.15, r_bille=0.06, tour=40.0)


class RondPoint974Short(Short6e):
    nom_voix = "974-rond-point-short-hasard"

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Pourquoi ce bouchon ?", font_size=38, color=JAUNE_TITRE).move_to([0, 2.75, 0])
        echelle = echelle_ceintures("blanche", largeur=0.4, buff=0.06)
        echelle.scale_to_fit_width(3.6).move_to([0, 2.0, 0])
        self.play(FadeIn(titre, shift=DOWN * 0.2), FadeIn(echelle), run_time=0.6)
        f = File([], y=0.3, **VOIE)
        file18 = VGroup(*[Dot([f.xg - k * f.ecart, f.y, 0], radius=f.r_bille, color=ATTENTE) for k in range(18)])
        self.play(FadeIn(f.decor()), LaggedStart(*[FadeIn(b, shift=RIGHT * 0.3) for b in file18], lag_ratio=0.05),
                  run_time=1.2)
        self.au_mot("Pas d'accident")
        non = VGroup(self.grand("pas d'accident", font_size=28), self.grand("pas de feu rouge", font_size=28))
        non.arrange(DOWN, buff=0.15).move_to([0, -0.9, 0])
        self.play(FadeIn(non[0], shift=UP * 0.15), run_time=0.4)
        self.au_mot("pas de feu rouge")
        self.play(GrowFromCenter(non[1]), run_time=0.4)
        self.attendre_voix(marge=0.2)

        # ── 01 : une bille = une voiture ──
        self.play(FadeOut(VGroup(file18, non, echelle)), run_time=0.3)
        self.dire("01-billes")
        auto = voiture(BILLE, 1.1).move_to([0, 1.5, 0])
        self.play(FadeIn(auto, shift=RIGHT * 0.3))
        self.au_mot("c'est une voiture")
        self.play(Transform(auto, Dot([0, 1.5, 0], radius=0.22, color=BILLE)))
        egal = self.grand("1 bille = 1 voiture", font_size=32).move_to([0, 0.95, 0])
        self.play(FadeIn(egal))
        self.au_mot("toutes les 4 secondes")
        quatre = self.grand("1 entrée toutes les 4 s", font_size=30, color=JAUNE_TITRE).move_to([0, -0.4, 0])
        self.play(GrowFromCenter(quatre))
        self.attendre_voix(marge=0.2)

        # ── 02 : régulier ──
        self.play(FadeOut(VGroup(auto, egal, quatre)), FadeOut(f.decor()), run_time=0.3)
        self.remove(*self.mobjects)
        self.margo_bas()
        self.add(titre)
        self.dire("02-regulier")
        reg = File(arrivees_regulieres(4.4, DUREE_SIMULEE), y=1.3, **VOIE)
        lbl1 = self.grand("régulier : 1 toutes les 4,4 s", font_size=24).move_to([0, 1.75, 0])
        self.play(FadeIn(reg.decor()), FadeIn(lbl1, shift=RIGHT * 0.2), run_time=0.5)
        tps = ValueTracker(0.0)
        v_reg = always_redraw(lambda: reg.billes(tps.get_value()))
        self.add(v_reg)
        self.play(tps.animate.set_value(170), run_time=3.2, rate_func=linear)
        self.au_mot("file, 0 bille")
        zero = self.grand("file : 0 bille", font_size=30, color=VERT_OK).move_to([0, 0.85, 0])
        self.play(tps.animate.set_value(230), FadeIn(zero, scale=1.3), run_time=1.0, rate_func=linear)
        self.attendre_voix(marge=0.2)

        # ── 03 : au hasard ──
        self.dire("03-hasard")
        has = File(arrivees_hasard(4.4, DUREE_SIMULEE, GRAINE_HASARD), y=-0.1, **VOIE)
        lbl2 = self.grand("au hasard : même moyenne", font_size=24, color=ATTENTE).move_to([0, 0.35, 0])
        self.play(FadeOut(zero), FadeIn(has.decor()), FadeIn(lbl2, shift=LEFT * 0.2), run_time=0.5)
        self.remove(v_reg)
        tps2 = ValueTracker(0.0)
        vues = [always_redraw(lambda f=f: f.billes(tps2.get_value())) for f in (reg, has)]
        cpt = compteur_file(has, tps2, [0, -1.0, 0], taille=30, record=True, sep="\n")
        self.add(*vues, cpt)
        fin = DUREE_SIMULEE + has.trajet
        self.play(tps2.animate.set_value(fin), run_time=6.2, rate_func=linear)
        dix8 = self.grand("18 !", font_size=64, color=ATTENTE).move_to([0, -2.0, 0])
        self.play(GrowFromCenter(dix8), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("04-question")
        coupable = self.grand("Le coupable : le hasard", font_size=32, color=ATTENTE).move_to([0, 2.6, 0])
        self.play(FadeIn(coupable, scale=1.2))
        self.au_mot("À toi")
        a_toi = self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to([0, 1.7, 0])
        self.play(Write(a_toi))
        g = VGroup(self.grand("1 voiture entre", font_size=30),
                   self.grand("toutes les 4 s", font_size=30, color=BLEU_CALCUL),
                   self.grand("combien en 1 h,", font_size=34, color=JAUNE_TITRE),
                   self.grand("au maximum ?", font_size=34, color=JAUNE_TITRE)).arrange(DOWN, buff=0.14)
        g.move_to([0, 0.1, 0])
        self.au_mot("une voiture toutes les 4")
        self.play(FadeIn(g[:2], shift=UP * 0.15))
        self.au_mot("en 1 heure")
        self.play(FadeIn(g[2:], shift=UP * 0.15))
        self.au_mot("Réponds en commentaire")
        rep = self.grand("en commentaire !", font_size=34, color=VERT_OK).move_to([0, -1.65, 0])
        self.play(FadeIn(rep))
        self.attendre_voix(marge=1.5)
