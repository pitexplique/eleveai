# proba_pc_registres_short.py
# EleveAI — Maths 1re spé — short jumeau de l'épisode 2 des probabilités
# conditionnelles (« parmi », « sachant que »). CEINTURE ORANGE. Il AMUSE :
# « 60 % des retards ont lieu sous la pluie… donc quand il pleut, 60 % ? »
#   · en HAUT le car jaune sous la pluie (puis le bocal du loto) ;
#   · en BAS, EN MÊME TEMPS, le tableau à double entrée du coach : la COLONNE
#     Retard s'allume, puis la LIGNE Pluie — même case, pas le même groupe ;
#   · fin : « parmi les gagnants du loto, 100 % ont joué », « Réponds en
#     commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/premiere-proba-registres-short.json (débit −6).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/proba_pc_registres_short.py ShortProbaRegistresPremiere -o eleveai-maths-premiere-proba-registres-short --media_dir manim/scripts/premiere/media
# Puis copier le mp4 dans manim/sorties/premiere/maths/probabilites/02-parmi-sachant/.

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_pc_registres import (  # noqa: E402  (pose les chemins)
    C_P, C_R, ENCRE, P, TableauCar, car_jaune, colorer, nuage, pluie)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.2
COULEURS = [JAUNE_TITRE, BLEU_CALCUL, VERT_OK, ORANGE_RETENUE, VIOLET_ACCENT]


def tableau_court(lignes=(("Pluie (P)", "P"), ("Pas de pluie", None)),
                  colonnes=(("Retard (R)", "R"), ("Pas de retard", None)), coin="Jours"):
    tab = TableauCar(w_lab=2.6, w_col=2.7, h_ent=0.75, h_lig=0.85, fs=28, coin=coin, lignes=lignes,
                     colonnes=colonnes)
    return tab.scale_to_fit_width(LARGEUR_MAX)


class ShortProbaRegistresPremiere(Short6e):
    nom_voix = "premiere-proba-registres-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def badge(self):
        return echelle_ceintures("orange").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))

    def car_qui_roule(self, centre, s=0.5):
        """Le car avance et recule doucement, ses roues tressautent : il vit."""
        car = car_jaune(s).move_to(centre)
        horloge = {"t": 0.0}

        def roule(m, dt):
            horloge["t"] += dt
            tt = horloge["t"]
            m.move_to(centre + P(0.35 * math.sin(tt * 1.3), 0.03 * math.sin(tt * 9.0)))

        car.add_updater(roule)
        return car

    def bocal(self, centre, r=0.6):
        verre = Circle(radius=r, stroke_color=WHITE, stroke_width=4, fill_color="#E0F2FE",
                       fill_opacity=0.08).move_to(centre)
        boules = VGroup()
        for k, n in enumerate([7, 23, 41, 12, 36, 5, 49]):
            b = Circle(radius=0.14, fill_color=COULEURS[k % 5], fill_opacity=1, stroke_color=WHITE, stroke_width=2)
            boules.add(VGroup(b, Text(str(n), font_size=13, color=BLACK, weight=BOLD).move_to(b)))
        vit = [3.1, -2.4, 3.9, -3.3, 2.7, -4.2, 3.5]
        pha = [0.0, 2.3, 4.1, 1.2, 5.5, 3.1, 0.7]
        horloge = {"t": 0.0}

        def tourne(m, dt):
            horloge["t"] += dt
            tt = horloge["t"]
            for k, b in enumerate(m):
                a = tt * vit[k] + pha[k]
                rr = r * (0.45 + 0.2 * math.sin(tt * (2.3 + 0.6 * vit[k]) + k * 1.3))
                b.move_to(centre + P(rr * math.cos(a), rr * math.sin(a)))

        tourne(boules, 0)
        boules.add_updater(tourne)
        return verre, boules

    def construct(self):
        self.margo_bas()
        YT = -0.55

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Les retards du car", font_size=44, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = self.badge()
        nu = nuage(0.45).move_to(P(0.75, 1.6))
        gt = pluie(P(0.75, 1.0), 0.9, 1.0, 9)
        car = self.car_qui_roule(P(-0.45, 0.75))
        tab = tableau_court().move_to(P(0, YT))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(nu), FadeIn(car), FadeIn(tab),
                  run_time=0.8)
        self.add(gt)
        cadre = tab.cadre_colonne(0)
        self.play(*tab.etat(colonnes=[0]), Create(cadre), run_time=0.5)
        l1 = self.t("60 % des retards : sous la pluie", 28)
        colorer(l1, "60 % des retards : sous la pluie", "60 %", JAUNE_TITRE)
        colorer(l1, "60 % des retards : sous la pluie", "retards", C_R)
        colorer(l1, "60 % des retards : sous la pluie", "pluie", C_P)
        l1.move_to(P(0, -1.6))
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.4)
        self.au_mot("Donc quand il pleut")
        cadre2 = tab.cadre_ligne(0)
        self.play(*tab.etat(lignes=[0]), ReplacementTransform(cadre, cadre2), run_time=0.5)
        l2 = self.t("quand il pleut : 60 % ?", 34, ORANGE_RETENUE)
        colorer(l2, "quand il pleut : 60 % ?", "il pleut", C_P)
        l2.move_to(P(0, -2.05))
        self.au_mot("60 % de chances")
        self.play(FadeIn(l2, scale=0.6), run_time=0.35)
        self.insister(l2, 1.15, 0.25)
        self.attendre_voix(marge=0.1)

        # ── 01 : non ! parmi QUI ? ──
        self.dire("01-image")
        non = self.grand("Non !", font_size=60, color=ROUGE_ERREUR).move_to(P(0, -1.8))
        self.play(FadeOut(VGroup(l1, l2)), FadeIn(non, scale=0.5), run_time=0.35)
        self.play(Wiggle(non), run_time=0.5)
        self.au_mot("parmi les retards")
        cadre3 = tab.cadre_colonne(0)
        self.play(*tab.etat(colonnes=[0]), ReplacementTransform(cadre2, cadre3), FadeOut(non), run_time=0.5)
        m1 = self.t("parmi les retards : 60 %", 28)
        colorer(m1, "parmi les retards : 60 %", "retards", C_R)
        colorer(m1, "parmi les retards : 60 %", "60 %", JAUNE_TITRE)
        m1.move_to(P(0, -1.55))
        self.play(FadeIn(m1, shift=UP * 0.15), run_time=0.35)
        self.au_mot("Parmi les jours de pluie")
        cadre4 = tab.cadre_ligne(0)
        self.play(*tab.etat(lignes=[0]), ReplacementTransform(cadre3, cadre4), run_time=0.5)
        self.au_mot("peut-être 30 %")
        m2 = self.t("parmi les jours de pluie : peut-être 30 %", 28)
        colorer(m2, "parmi les jours de pluie : peut-être 30 %", "pluie", C_P)
        colorer(m2, "parmi les jours de pluie : peut-être 30 %", "30 %", JAUNE_TITRE)
        m2.move_to(P(0, -2.0))
        self.play(FadeIn(m2, shift=UP * 0.15), run_time=0.35)
        self.insister(VGroup(*m2[-3:]), 1.4, 0.2)
        self.au_mot("parmi QUI")
        qui = self.grand("parmi QUI ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, -1.8))
        self.play(FadeOut(VGroup(m1, m2)), FadeIn(qui, scale=0.5), run_time=0.35)
        self.insister(qui, 1.2, 0.25)
        # la ligne, puis la colonne : même case, pas le même groupe
        self.play(*tab.etat(colonnes=[0]), ReplacementTransform(cadre4, tab.cadre_colonne(0)), run_time=0.4)
        self.attendre_voix(marge=0.1)
        car.clear_updaters()
        gt.clear_updaters()

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.4))
        verre, boules = self.bocal(P(0, 1.2), 0.58)
        lt = tableau_court(lignes=(("Gagnants", None), ("Perdants", None)),
                           colonnes=(("A joué", None), ("N'a pas joué", None)), coin="Loto")
        lt.move_to(P(0, -0.2))
        self.play(Write(toi), FadeIn(verre), FadeIn(boules), FadeIn(lt), run_time=0.6)
        self.au_mot("parmi les gagnants")
        c1 = lt.cadre_ligne(0, VERT_OK)
        self.play(*lt.etat(lignes=[0]), Create(c1), run_time=0.45)
        self.au_mot("100 % ont joué")
        cent = Text("100 %", font_size=30, color=ENCRE, weight=BOLD)
        cent.scale_to_fit_height(lt.cases[0][0].height * 0.42).move_to(lt.cases[0][0])
        self.play(FadeIn(cent, scale=0.4), run_time=0.35)
        self.insister(cent, 1.4, 0.2)
        self.au_mot("Donc jouer")
        c2 = lt.cadre_colonne(0, ORANGE_RETENUE)
        self.play(*lt.etat(colonnes=[0]), ReplacementTransform(c1, c2), run_time=0.45)
        q = self.t("jouer : 100 % de gagner ?", 28, ORANGE_RETENUE).move_to(P(0, -1.2))
        colorer(q, "jouer : 100 % de gagner ?", "100 %", JAUNE_TITRE)
        self.au_mot("c'est 100 %")
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.35)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=42, color=VERT_OK),
                       self.grand("commentaire !", font_size=42, color=VERT_OK)).arrange(DOWN, buff=0.08)
        appel.move_to(P(0, -1.95))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
        boules.clear_updaters()
