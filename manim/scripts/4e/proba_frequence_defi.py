# proba_frequence_defi.py
# EleveAI — Maths 4e — Probabilités, épisode 13 (dernier de la série) : le défi
# des fréquences (micro propre à la 4e), AVEC VOIX.
# Paysage 16:9, CEINTURE ORANGE. Short jumeau : proba_frequence_defi_short.py (jaune).
#
# ⭐ LE DESSIN QUI PORTE TOUT : un bouchon de bouteille DESSINÉ dans ses trois
# positions (à l'endroit, à l'envers, sur le côté). On ne peut pas calculer :
# on le lance 1 000 fois, trois barres poussent (400 / 500 / 100). Puis 50
# bouchons gris dont environ 20 passent « à l'endroit » (rouges) pour PRÉVOIR.
#
# Voix : manim/voix/4e-proba-frequence-defi.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/proba_frequence_defi.py ProbaFrequenceDefi4e -o eleveai-maths-4e-proba-frequence-defi --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/probabilites/13-frequence-defi/.

import math
import random
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

BOUCHON = "#DC2626"
BOUCHON_CLAIR = "#F87171"
BOUCHON_BORD = "#7F1D1D"
BOUCHON_DEDANS = "#3F0A0A"
GRIS = "#6B7280"
GRIS_CLAIR = "#9CA3AF"
GRIS_BORD = "#374151"
COUL_ENDROIT = BOUCHON
COUL_ENVERS = BLEU_CALCUL
COUL_COTE = VIOLET_ACCENT


class Notion4e(Notion6e):
    identite = "Maths 4e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins ─────────────────────────────────────────────────────────────

def bouchon(pos="endroit", s=1.0, gris=False):
    """Un bouchon de bouteille DESSINÉ, vu de profil, avec ses stries.
    endroit : le dessus plein en haut ; envers : l'intérieur (creux) en haut ;
    cote : roulé sur le côté (le profil debout)."""
    fond, clair, bord = (GRIS, GRIS_CLAIR, GRIS_BORD) if gris else (BOUCHON, BOUCHON_CLAIR, BOUCHON_BORD)
    w, h = 1.0, 0.46
    bas = Ellipse(width=w, height=0.26, fill_color=fond, fill_opacity=1, stroke_color=bord,
                  stroke_width=2).move_to(P(0, -h / 2))
    corps = Rectangle(width=w, height=h, fill_color=fond, fill_opacity=1, stroke_width=0)
    cotes = VGroup(Line(P(-w / 2, -h / 2), P(-w / 2, h / 2)), Line(P(w / 2, -h / 2), P(w / 2, h / 2)))
    cotes.set_stroke(bord, 2)
    stries = VGroup(*[Line(P(x, -h / 2 - 0.08), P(x, h / 2 - 0.06)) for x in np.arange(-0.36, 0.37, 0.12)])
    stries.set_stroke(bord, 2, opacity=0.8)
    if pos == "envers":
        dessus = VGroup(
            Ellipse(width=w, height=0.26, fill_color=clair, fill_opacity=1, stroke_color=bord, stroke_width=2),
            Ellipse(width=w * 0.82, height=0.18, fill_color=BOUCHON_DEDANS if not gris else "#1F2937",
                    fill_opacity=1, stroke_width=0)).move_to(P(0, h / 2))
    else:
        dessus = Ellipse(width=w, height=0.26, fill_color=clair, fill_opacity=1, stroke_color=bord,
                         stroke_width=2).move_to(P(0, h / 2))
    g = VGroup(bas, corps, cotes, stries, dessus)
    if pos == "cote":
        g.rotate(PI / 2)
    return g.scale(s)


def qui_saute(mob, sol_y, hauteur=1.0, vitesse=4.0):
    """Le lancer SANS FIN (updater) : l'objet monte, tourne, retombe."""
    etat = {"t": 0.0}
    base = mob.copy()
    x = mob.get_x()

    def maj(m, dt):
        etat["t"] += dt
        t = etat["t"] * vitesse
        neuf = base.copy().rotate(t * 1.6)
        neuf.move_to(P(x, sol_y + base.height / 2 + hauteur * abs(math.sin(t * 0.8))))
        m.become(neuf)

    mob.add_updater(maj)
    return mob


class ProbaFrequenceDefi4e(Notion4e):
    nom_voix = "4e-proba-frequence-defi"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.22):
        g = VGroup()
        for m, c in morceaux:
            g.add(m if isinstance(m, Mobject) else self.t(m, font_size, c))
        return g.arrange(RIGHT, buff=buff)

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def trois_bouchons(self, s=1.2, y=0.6, xs=(-4.2, -1.0, 2.2), legende=True, fs=30):
        g = VGroup()
        for pos, x, nom, c in zip(("endroit", "envers", "cote"), xs,
                                  ("à l'endroit", "à l'envers", "sur le côté"),
                                  (COUL_ENDROIT, COUL_ENVERS, COUL_COTE)):
            b = bouchon(pos, s).move_to(P(x, y))
            lbl = self.t(nom, fs, c).move_to(P(x, y - 0.5 * s - 0.35))
            g.add(VGroup(b, lbl) if legende else VGroup(b))
        return g

    def barres(self, x0=-4.2, pas=2.4, base_y=-2.2, h_max=3.0, larg=1.2, icone=0.55, fs=34):
        """Trois barres vides (hauteur 0) + leurs bouchons sous l'axe."""
        axe = Line(P(x0 - 1.0, base_y), P(x0 + 2 * pas + 1.0, base_y), stroke_width=3)
        icones = VGroup(*[bouchon(p, icone).move_to(P(x0 + i * pas, base_y - 0.45))
                          for i, p in enumerate(("endroit", "envers", "cote"))])
        return axe, icones

    def pause_cherche(self):
        self.attendre_voix(marge=0.3)
        ch = self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)
        self.play(Write(ch), run_time=0.8)
        self.insister(ch, 0.35)
        self.wait(3.0)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Le défi des fréquences", 54, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("orange").move_to(P(-0.6, -2.6))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        trois = self.trois_bouchons(1.1, 0.75, (-4.0, -0.6, 2.8), legende=False)
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 1.2) for b in trois], lag_ratio=0.25),
                  run_time=1.0, rate_func=rate_functions.ease_out_bounce)
        self.au_mot("Quand on ne peut pas")
        q = self.t("Quand on ne peut pas calculer la probabilité…", 36, BLEU_CALCUL).move_to(P(-0.6, -0.8))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.6)
        self.au_mot("calculer la probabilité")
        self.play(LaggedStart(*[Wiggle(b) for b in trois], lag_ratio=0.2), run_time=1.0)
        self.attendre_voix(marge=0.8)

    # ── 01 : la situation ───────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Un bouchon qui tombe")
        trois = self.trois_bouchons(1.5, 1.1)
        self.au_mot("à l'endroit")
        self.play(FadeIn(trois[0][0], shift=DOWN * 2), run_time=0.6, rate_func=rate_functions.ease_out_bounce)
        self.play(FadeIn(trois[0][1]), run_time=0.3)
        self.au_mot("à l'envers")
        self.play(FadeIn(trois[1][0], shift=DOWN * 2), run_time=0.6, rate_func=rate_functions.ease_out_bounce)
        self.play(FadeIn(trois[1][1]), run_time=0.3)
        self.au_mot("sur le côté")
        self.play(FadeIn(trois[2][0], shift=DOWN * 2), run_time=0.6, rate_func=rate_functions.ease_out_bounce)
        self.play(FadeIn(trois[2][1]), run_time=0.3)

        self.au_mot("impossible de calculer")
        imp = self.ligne([("P(à l'endroit) =", WHITE), ("?", ROUGE_ERREUR)], 40, 0.25).move_to(P(-1.0, -1.15))
        self.play(FadeIn(imp, shift=UP * 0.15), run_time=0.5)
        self.insister(imp[1])
        self.au_mot("pas équiprobables")
        pe = self.t("Les issues ne sont pas équiprobables.", 34, ORANGE_RETENUE).move_to(P(-1.0, -2.0))
        self.play(FadeIn(pe, shift=UP * 0.15), Indicate(trois[2][0], color=WHITE, scale_factor=1.3), run_time=0.7)
        self.au_mot("Alors comment faire")
        self.play(FadeOut(pe), run_time=0.3)
        ch = self.chute("Alors, comment faire ?", color=BLEU_CALCUL, font_size=42)
        self.play(Write(ch), run_time=0.7)
        self.attendre_voix()

    # ── 02 : on le lance 1 000 fois ─────────────────────────────────────────

    def construire_barres(self, n, x0, pas, base_y, h_max, larg):
        vals = (400, 500, 100)
        couls = (COUL_ENDROIT, COUL_ENVERS, COUL_COTE)
        g = VGroup()
        for i in range(3):
            h = max(vals[i] * n / 1000 / 500 * h_max, 0.001)
            g.add(Rectangle(width=larg, height=h, stroke_width=0, fill_opacity=0.85, fill_color=couls[i])
                  .move_to(P(x0 + i * pas, base_y + h / 2)))
        return g

    def ecran_idee(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-idee")
        self.titre_ecran("On le lance beaucoup !")
        x0, pas, base_y, h_max, larg = -4.6, 2.4, -2.1, 3.3, 1.3
        axe, icones = self.barres(x0, pas, base_y, h_max, larg)
        b = bouchon("endroit", 1.2).move_to(P(4.0, -0.9))
        sol = Line(P(3.0, -1.2), P(5.0, -1.2), stroke_width=3, color=GREY_B)
        self.play(FadeIn(b), Create(sol), run_time=0.5)
        self.au_mot("La classe lance")
        n = ValueTracker(0)
        compteur = always_redraw(lambda: self.ligne(
            [(f"{int(n.get_value()):,}".replace(",", " "), JAUNE_TITRE), ("lancers", WHITE)], 40, 0.2)
            .move_to(P(4.0, 1.6)))
        hist = always_redraw(lambda: self.construire_barres(n.get_value(), x0, pas, base_y, h_max, larg))
        self.play(Create(axe), FadeIn(icones), FadeIn(compteur), run_time=0.5)
        self.add(hist)
        qui_saute(b, -1.2, 1.0)
        self.au_mot("1 000 fois")
        self.play(n.animate.set_value(1000), run_time=2.6, rate_func=linear)
        hist.clear_updaters()
        compteur.clear_updaters()
        b.clear_updaters()
        self.play(b.animate.become(bouchon("endroit", 1.2).move_to(P(4.0, -0.9))), run_time=0.3)
        self.insister(compteur)

        for i, (mot, val, c) in enumerate((("400 fois", "400", COUL_ENDROIT), ("500 fois", "500", COUL_ENVERS),
                                            ("100 fois", "100", COUL_COTE))):
            self.au_mot(mot)
            lab = self.t(val, 38, c).next_to(hist[i], UP, buff=0.15)
            self.play(FadeIn(lab, shift=DOWN * 0.15), Indicate(icones[i], color=WHITE, scale_factor=1.4),
                      run_time=0.5)
            self.insister(lab, 0.3)
        self.attendre_voix()

    # ── 03 : estimer la probabilité ─────────────────────────────────────────

    def petites_barres(self, x0=-5.6, pas=1.2, base_y=-1.6, h_max=2.4, larg=0.8, labels=True):
        axe = Line(P(x0 - 0.6, base_y), P(x0 + 2 * pas + 0.6, base_y), stroke_width=3)
        hist = self.construire_barres(1000, x0, pas, base_y, h_max, larg)
        icones = VGroup(*[bouchon(p, 0.42).move_to(P(x0 + i * pas, base_y - 0.38))
                          for i, p in enumerate(("endroit", "envers", "cote"))])
        labs = VGroup(*[self.t(v, 28, c).next_to(hist[i], UP, buff=0.1)
                        for i, (v, c) in enumerate((("400", COUL_ENDROIT), ("500", COUL_ENVERS),
                                                    ("100", COUL_COTE)))])
        g = VGroup(axe, hist, icones)
        if labels:
            g.add(labs)
        return g

    def ecran_estimer(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-estimer")
        self.titre_ecran("Estimer la probabilité")
        pb = self.petites_barres()
        self.add(pb)
        tot = self.t("sur 1 000 lancers", 26, GREY_B).next_to(pb, DOWN, buff=0.25)
        self.add(tot)

        self.au_mot("Fréquence de")
        l0 = self.ligne([("Fréquence de", WHITE), ("« à l'endroit »", COUL_ENDROIT), (":", WHITE)], 36, 0.18)
        l0.move_to(P(1.6, 2.2))
        self.play(FadeIn(l0, shift=UP * 0.15), Indicate(pb[1][0], color=WHITE), run_time=0.6)
        self.au_mot("400 sur 1 000")
        f = self.fraction(400, "1 000", 42, JAUNE_TITRE).move_to(P(-0.3, 1.0))
        self.play(FadeIn(f, shift=UP * 0.15), run_time=0.5)
        self.au_mot("c'est 0,4")
        calc = self.t("400 ÷ 1 000 = 0,4", 40, BLEU_CALCUL).next_to(f, RIGHT, buff=0.7)
        self.play(Write(calc), run_time=0.8)
        self.au_mot("soit 40 %")
        pc = self.t("soit 40 %", 40, JAUNE_TITRE).next_to(calc, DOWN, buff=0.35).align_to(calc, LEFT)
        self.play(FadeIn(pc, shift=UP * 0.15), run_time=0.5)
        self.insister(pc)

        self.au_mot("Sur un si grand échantillon")
        gr = self.ligne([("1 000 lancers", JAUNE_TITRE), (": un grand échantillon", WHITE)], 30, 0.15)
        gr.move_to(P(1.9, -0.6))
        self.play(FadeIn(gr, shift=UP * 0.15), Indicate(tot, color=JAUNE_TITRE), run_time=0.6)
        self.au_mot("la fréquence est proche")
        pr = self.t("fréquence ≈ probabilité", 34, BLEU_CALCUL).next_to(gr, DOWN, buff=0.3)
        self.play(FadeIn(pr, shift=UP * 0.15), run_time=0.5)
        self.au_mot("On estime donc")
        res = self.ligne([("P(à l'endroit)", WHITE), ("≈ 0,4", VERT_OK)], 38, 0.25).move_to(P(1.3, -2.5))
        cadre = SurroundingRectangle(res, color=VERT_OK, buff=0.18)
        self.play(Write(res), run_time=0.7)
        self.play(Create(cadre), run_time=0.4)
        self.insister(VGroup(res, cadre))
        self.attendre_voix()

    # ── 04 : prévoir ────────────────────────────────────────────────────────

    def ecran_prevoir(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-prevoir")
        self.titre_ecran("Et ça permet de prévoir !")
        self.au_mot("Sur 50 lancers")
        demain = self.ligne([("Demain :", WHITE), ("50", JAUNE_TITRE), ("lancers", WHITE)], 36, 0.18)
        demain.move_to(P(-3.3, 2.25))
        grille = VGroup(*[bouchon("endroit", 0.42, gris=True) for _ in range(50)])
        grille.arrange_in_grid(rows=5, cols=10, buff=(0.14, 0.24)).move_to(P(-3.3, 0.35))
        self.play(FadeIn(demain), LaggedStart(*[FadeIn(b, shift=DOWN * 0.3) for b in grille], lag_ratio=0.02),
                  run_time=1.2)
        self.au_mot("combien de fois à l'endroit")
        q = self.ligne([("à l'endroit :", COUL_ENDROIT), ("?", BLEU_CALCUL)], 36, 0.2).move_to(P(3.4, 1.9))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.5)

        self.au_mot("40 % de 50")
        l1 = self.t("40 % de 50", 40, JAUNE_TITRE).move_to(P(3.4, 0.9))
        self.play(Write(l1), run_time=0.6)
        self.au_mot("0,4 fois 50")
        l2 = self.t("0,4 × 50 = 20", 44, BLEU_CALCUL).move_to(P(3.4, -0.1))
        self.play(Write(l2[:6]), run_time=0.6)
        self.au_mot("égale 20")
        self.play(Write(l2[6:]), run_time=0.4)
        self.insister(l2)

        self.au_mot("Environ 20 fois")
        random.seed(13)
        choix = sorted(random.sample(range(50), 20))
        rouges = [bouchon("endroit", 0.42).move_to(grille[k]) for k in choix]
        self.play(LaggedStart(*[Transform(grille[k], r) for k, r in zip(choix, rouges)], lag_ratio=0.05),
                  run_time=1.3)
        res = self.t("≈ 20 fois", 48, VERT_OK).move_to(P(3.4, -1.2))
        self.play(FadeIn(res, scale=0.7), run_time=0.4)
        self.insister(res)
        legende = self.ligne([(bouchon("endroit", 0.4), None), ("à l'endroit", COUL_ENDROIT)], 28, 0.15)
        legende.next_to(grille, DOWN, buff=0.35)
        self.play(FadeIn(legende), run_time=0.4)
        self.attendre_voix()

    # ── 05 : vérifier ───────────────────────────────────────────────────────

    def ecran_verifier(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-verifier")
        self.titre_ecran("Vérification")
        trois = self.trois_bouchons(1.1, 1.55, (-4.4, -1.2, 2.0))
        self.add(trois)
        freqs = VGroup(*[self.t(v, 40, c).next_to(trois[i], DOWN, buff=0.25).align_to(trois[0], DOWN).shift(DOWN * 0.7)
                         for i, (v, c) in enumerate((("0,4", COUL_ENDROIT), ("0,5", COUL_ENVERS),
                                                     ("0,1", COUL_COTE)))])
        # la bande de longueur 1, découpée 0,4 / 0,5 / 0,1
        L, x_g, y_b = 8.0, -5.2, -1.3
        morceaux = VGroup()
        x = x_g
        for v, c in ((0.4, COUL_ENDROIT), (0.5, COUL_ENVERS), (0.1, COUL_COTE)):
            morceaux.add(Rectangle(width=L * v, height=0.6, stroke_color=WHITE, stroke_width=2, fill_color=c,
                                   fill_opacity=0.8).move_to(P(x + L * v / 2, y_b)))
            x += L * v
        cadre = Rectangle(width=L, height=0.6, stroke_color=WHITE, stroke_width=3).move_to(P(x_g + L / 2, y_b))
        self.play(Create(cadre), run_time=0.5)
        calc = self.t("0,4 + 0,5 + 0,1 = 1", 44, BLEU_CALCUL).move_to(P(-1.2, -2.2))
        parts = (calc[0:3], calc[3:7], calc[7:11], calc[11:])
        for i, mot in enumerate(("0,4 plus", "0,5 plus", "0,1 égale")):
            self.au_mot(mot)
            self.play(FadeIn(freqs[i], shift=UP * 0.15), GrowFromEdge(morceaux[i], LEFT),
                      FadeIn(parts[i]), run_time=0.6)
        self.au_mot("égale 1")
        un = self.t("1", 34, VERT_OK).next_to(cadre, RIGHT, buff=0.3)
        self.play(FadeIn(parts[3]), FadeIn(un), cadre.animate.set_stroke(VERT_OK, 5), run_time=0.5)
        self.insister(parts[3])
        self.au_mot("Les fréquences de toutes")
        self.play(Write(self.chute("Les fréquences de toutes les issues font toujours 1.",
                                   color=VERT_OK, font_size=36)), run_time=0.9)
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        self.au_mot("exactement 20 fois")
        faux = self.t("« exactement 20 fois »", 38, ROUGE_ERREUR).move_to(P(-2.9, 1.8))
        self.play(FadeIn(faux, shift=UP * 0.15), run_time=0.5)
        self.au_mot("Non")
        barre = Line(faux.get_corner(DL) + LEFT * 0.1, faux.get_corner(UR) + RIGHT * 0.1, color=ROUGE_ERREUR,
                     stroke_width=6)
        self.play(Create(barre), run_time=0.4)
        self.au_mot("environ 20")
        bon = self.t("environ 20 fois", 46, VERT_OK).move_to(P(-3.0, 0.6))
        self.play(FadeIn(bon, scale=0.7), run_time=0.5)
        self.insister(bon)

        # trois « journées » de 50 lancers : jamais pile 20
        base_y, x0, pas = -1.9, 1.6, 1.3
        ech = 0.11
        axe = Line(P(x0 - 0.8, base_y), P(x0 + 2 * pas + 0.8, base_y), stroke_width=3)
        ref = DashedLine(P(x0 - 0.8, base_y + 20 * ech), P(x0 + 2 * pas + 0.8, base_y + 20 * ech),
                         color=VERT_OK, stroke_width=3)
        lab20 = self.t("20", 30, VERT_OK).next_to(ref, LEFT, buff=0.15)
        haut = (18, 23, 21)
        barres = VGroup(*[Rectangle(width=0.8, height=0.001, stroke_width=0, fill_color=COUL_ENDROIT,
                                    fill_opacity=0.85).move_to(P(x0 + i * pas, base_y)) for i in range(3)])
        cibles = [Rectangle(width=0.8, height=h * ech, stroke_width=0, fill_color=COUL_ENDROIT, fill_opacity=0.85)
                  .move_to(P(x0 + i * pas, base_y + h * ech / 2)) for i, h in enumerate(haut)]
        icones = VGroup(*[bouchon("endroit", 0.4).move_to(P(x0 + i * pas, base_y - 0.35)) for i in range(3)])
        self.au_mot("Ce n'est qu'une estimation")
        est = self.t("Ce n'est qu'une estimation.", 34, BLEU_CALCUL).move_to(P(-3.0, -0.6))
        self.play(FadeIn(est, shift=UP * 0.15), Create(axe), Create(ref), FadeIn(lab20), FadeIn(icones),
                  run_time=0.7)
        self.play(LaggedStart(*[Transform(b, c) for b, c in zip(barres, cibles)], lag_ratio=0.3), run_time=1.2)
        self.au_mot("le hasard fera des écarts")
        ecarts = self.t("Le hasard fait des écarts.", 34, ORANGE_RETENUE).move_to(P(-3.0, -1.5))
        self.play(FadeIn(ecarts, shift=UP * 0.15), *[Wiggle(b) for b in barres], run_time=0.8)
        self.attendre_voix(marge=2.0)

    # ── 07 : le défi ────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-defi")
        self.titre_ecran("À toi de jouer !")
        pb = self.petites_barres(x0=-5.2, base_y=-0.9)
        tot = self.t("sur 1 000 lancers", 26, GREY_B).next_to(pb, DOWN, buff=0.25)
        self.au_mot("Même bouchon")
        self.play(FadeIn(pb), FadeIn(tot), run_time=0.6)
        b = bouchon("cote", 1.6).move_to(P(1.3, 1.0))
        self.au_mot("Sur 200 lancers")
        q1 = self.ligne([("Sur", WHITE), ("200", JAUNE_TITRE), ("lancers,", WHITE)], 40, 0.18).move_to(P(2.6, -0.4))
        self.play(FadeIn(b, shift=DOWN * 1.5), FadeIn(q1, shift=UP * 0.15), run_time=0.6,
                  rate_func=rate_functions.ease_out_bounce)
        self.au_mot("combien de fois sur le côté")
        q2 = self.ligne([("sur le côté :", COUL_COTE), ("≈ ? fois", BLEU_CALCUL)], 40, 0.25).move_to(P(2.4, -1.3))
        self.play(FadeIn(q2, shift=UP * 0.15), Indicate(pb[1][2], color=WHITE, scale_factor=1.4), run_time=0.6)
        self.insister(q2[1])
        self.pause_cherche()

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        b = bouchon("cote", 1.3).move_to(P(-5.0, 1.6))
        self.add(b)
        self.au_mot("Sur le côté")
        l0 = self.t("Sur le côté :", 38, COUL_COTE).move_to(P(-2.4, 1.6))
        self.play(FadeIn(l0, shift=UP * 0.15), Indicate(b, color=WHITE), run_time=0.5)
        self.au_mot("100 sur 1 000")
        f = self.fraction(100, "1 000", 42, JAUNE_TITRE).next_to(l0, RIGHT, buff=0.4)
        self.play(FadeIn(f, shift=UP * 0.15), run_time=0.5)
        self.au_mot("c'est 0,1")
        c1 = self.t("100 ÷ 1 000 = 0,1", 40, BLEU_CALCUL).move_to(P(-2.6, 0.45))
        self.play(Write(c1), run_time=0.7)
        self.au_mot("Et 0,1 fois 200")
        c2 = self.t("0,1 × 200 = 20", 46, BLEU_CALCUL).move_to(P(-2.6, -0.55))
        self.play(Write(c2[:7]), run_time=0.6)
        self.au_mot("égale 20")
        self.play(Write(c2[7:]), run_time=0.4)
        self.insister(c2)
        self.au_mot("Environ 20 fois")
        res = self.t("≈ 20 fois sur le côté", 44, VERT_OK).move_to(P(-2.6, -1.85))
        cadre = SurroundingRectangle(res, color=VERT_OK, buff=0.2)
        grille = VGroup(*[bouchon("cote", 0.4) for _ in range(20)]).arrange_in_grid(rows=4, cols=5,
                                                                                    buff=(0.3, 0.15))
        grille.move_to(P(3.6, -0.6))
        self.play(FadeIn(res, scale=0.7), Create(cadre),
                  LaggedStart(*[FadeIn(g, shift=DOWN * 0.4) for g in grille], lag_ratio=0.05), run_time=1.1)
        self.insister(VGroup(res, cadre))
        self.attendre_voix(marge=2.0)

    # ── 08 : ce que tu as appris ─────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ("Quand on ne peut pas calculer", "Pas de calcul possible ? On estime la probabilité"),
            ("par la fréquence observée", "par la fréquence, sur un grand nombre d'essais."),
            ("Puis on s'en sert pour prévoir", "On s'en sert pour prévoir… environ !"),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 34)).arrange(RIGHT, buff=0.3) for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        if lignes.width > 12.0:
            lignes.scale_to_fit_width(12.0)
        lignes.move_to(P(-0.4, 1.2))
        lignes[1][0].set_opacity(0)   # la 2e ligne prolonge la 1re
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("Tu as fini la série")
        fini = self.t("Tu as fini la série des probabilités de 4e !", 40, JAUNE_TITRE).move_to(P(-0.8, -1.15))
        trois = self.trois_bouchons(0.7, -2.4, (-4.5, -3.3, -2.1), legende=False)
        self.play(FadeIn(fini, scale=0.7), run_time=0.6)
        self.insister(fini)
        self.au_mot("Bravo")
        bravo = self.t("Bravo !", 56, VERT_OK).move_to(P(0.6, -2.4))
        self.play(FadeIn(bravo, scale=0.5), LaggedStart(*[FadeIn(b, shift=DOWN * 1.0) for b in trois],
                                                        lag_ratio=0.2), run_time=0.8,
                  rate_func=rate_functions.ease_out_bounce)
        self.play(Flash(bravo, color=VERT_OK, line_length=0.4), run_time=0.6)
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_idee()
        self.ecran_estimer()
        self.ecran_prevoir()
        self.ecran_verifier()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
