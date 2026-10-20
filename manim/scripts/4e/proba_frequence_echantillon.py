# proba_frequence_echantillon.py
# EleveAI — Maths 4e — Probabilités, épisode 12 : les petits échantillons
# (notion « fréquences », micro : frequence-echantillon), AVEC VOIX. Paysage ceinture ORANGE.
#
# ⭐ LE DESSIN QUI PORTE TOUT : les 5 DÉS EN RANGÉE (6, 2, 6, 4, 6 : trois six),
# puis d'autres rangées de 5 qui roulent (le hasard fait des surprises), puis
# l'HISTOGRAMME DES 600 LANCERS où le 6 sort 104 fois (≈ 1/6, ligne pointillée).
# Défi : deux pièces avec leurs compteurs (4 piles sur 5, 700 piles sur 1 000).
# Effectifs des 600 lancers : 98, 101, 95, 99, 103, 104.
# L'histogramme (classe Histogramme) vient de l'épisode 11, proba_frequence_repeter.py.
#
# Voix : manim/voix/4e-proba-frequence-echantillon.json (débit −7).
# Short jumeau (ceinture jaune) : proba_frequence_echantillon_short.py.
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/proba_frequence_echantillon.py ProbaFrequenceEchantillon4e -o eleveai-maths-4e-proba-frequence-echantillon --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/probabilites/12-frequence-echantillon/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_frequence_repeter import (TIRAGES, ZERO, Histogramme, Notion4e, P, de,  # noqa: E402
                                     de_qui_roule, freqs, piece_qui_tourne)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

RANGEE = [6, 2, 6, 4, 6]
EFF_600 = [98, 101, 95, 99, 103, 104]
CHEVAUX = ["#DC2626", "#2563EB", "#22C55E", JAUNE_TITRE]


def rangee(faces, cote=0.9, buff=0.22):
    return VGroup(*[de(f, cote) for f in faces]).arrange(RIGHT, buff=buff)


def rouler_rangee(scene, cible, run_time=1.2, periode=0.08):
    """Les dés de `cible` roulent puis s'arrêtent sur leurs faces (cible reste la vraie rangée)."""
    roules = []
    for k, d in enumerate(cible):
        r = de_qui_roule(d.get_center(), d.width, periode=periode, faces=TIRAGES[7 * k:7 * k + 30])
        roules.append(r)
        scene.add(r)
    scene.wait(run_time)
    for r in roules:
        r.clear_updaters()
        scene.remove(r)
    scene.add(cible)


class DessinsEchantillon:
    def plateau(self, c=1.1):
        """Un plateau de petits chevaux : 4 écuries de couleur et la croix du parcours."""
        g = VGroup(Square(2 * c, stroke_color=WHITE, stroke_width=3, fill_color="#F5F5F4", fill_opacity=0.15))
        for (sx, sy), col in zip([(-1, 1), (1, 1), (1, -1), (-1, -1)], CHEVAUX):
            g.add(Square(c * 0.78, stroke_width=0, fill_color=col, fill_opacity=0.9)
                  .move_to(P(sx * c * 0.61, sy * c * 0.61)))
            g.add(Circle(radius=c * 0.13, fill_color=WHITE, fill_opacity=1, stroke_color=col, stroke_width=3)
                  .move_to(P(sx * c * 0.61, sy * c * 0.61)))
        g.add(Square(c * 0.42, stroke_width=0, fill_color=JAUNE_TITRE, fill_opacity=0.5))
        return g


class ProbaFrequenceEchantillon4e(Histogramme, DessinsEchantillon, Notion4e):
    nom_voix = "4e-proba-frequence-echantillon"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.22):
        return VGroup(*[m if isinstance(m, Mobject) else self.t(m[0], font_size, m[1])
                        for m in morceaux]).arrange(RIGHT, buff=buff)

    def borne(self, mob, w):
        if mob.width > w:
            mob.scale_to_fit_width(w)
        return mob

    def insister(self, mob, run_time=0.45):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.08, mob.get_corner(UR) + RIGHT * 0.08,
                    stroke_width=6, color=color)

    def cadres_six(self, r):
        return VGroup(*[SurroundingRectangle(d, color=JAUNE_TITRE, buff=0.07, stroke_width=5)
                        for d, f in zip(r, RANGEE) if f == 6])

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Les petits échantillons", 56, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("orange").move_to(P(-0.6, -2.75))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech))
        r = rangee(RANGEE, 1.0, 0.3).move_to(P(-0.6, 0.65))
        rouler_rangee(self, r, 1.0)
        cad = self.cadres_six(r)
        self.play(Create(cad), run_time=0.4)
        self.au_mot("Ce qu'ils ne prouvent pas")
        q = self.t("Ce qu'ils ne prouvent pas", 40, BLEU_CALCUL).move_to(P(-0.6, -0.9))
        self.play(FadeIn(q, shift=UP * 0.2))
        self.insister(q, 0.4)
        self.attendre_voix(marge=1.5)

    # ── 01 : la situation ───────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Avant les petits chevaux")
        self.au_mot("petits chevaux")
        pl = self.plateau(1.15).move_to(P(-5.0, 0.9))
        self.play(FadeIn(pl, scale=0.7), run_time=0.5)
        self.play(Rotate(pl, angle=PI / 2), run_time=0.6)
        self.au_mot("lance son dé 5 fois")
        r = rangee(RANGEE, 0.95, 0.25).move_to(P(1.3, 1.3))
        l1 = self.ligne([("5", JAUNE_TITRE), ("lancers", WHITE)], 38).move_to(P(1.3, 0.35))
        self.play(FadeIn(l1), run_time=0.3)
        for d in r:
            rr = de_qui_roule(d.get_center(), d.width, periode=0.06)
            self.add(rr)
            self.wait(0.35)
            rr.clear_updaters()
            self.remove(rr)
            self.add(d)
        self.au_mot("Il fait 3 six")
        cad = self.cadres_six(r)
        l2 = self.ligne([("3", JAUNE_TITRE), ("six", WHITE)], 38).next_to(l1, RIGHT, buff=0.6)
        grp = VGroup(l1, l2)
        self.play(Create(cad), FadeIn(l2), grp.animate.arrange(RIGHT, buff=0.7).move_to(P(1.3, 0.35)), run_time=0.6)
        self.insister(l2, 0.35)
        self.au_mot("Mon dé est truqué")
        bulle_txt = self.t("« Mon dé est truqué ! »", 40, ORANGE_RETENUE)
        bulle = RoundedRectangle(width=bulle_txt.width + 0.6, height=bulle_txt.height + 0.6, corner_radius=0.3,
                                 stroke_color=ORANGE_RETENUE, stroke_width=4)
        b = VGroup(bulle, bulle_txt).move_to(P(1.3, -1.0))
        queue = Polygon(P(-1.2, -0.85), P(-0.6, -1.15), P(-0.6, -0.75), stroke_color=ORANGE_RETENUE,
                        stroke_width=4)
        queue.next_to(bulle, LEFT, buff=-0.02)
        self.play(GrowFromCenter(b), FadeIn(queue), run_time=0.6)
        self.au_mot("A-t-il la preuve")
        self.play(Write(self.chute("A-t-il la preuve ?", color=BLEU_CALCUL, font_size=42)))
        self.attendre_voix()

    # ── 02 : la fréquence ───────────────────────────────────────────────────

    def ecran_frequence(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-frequence")
        self.titre_ecran("La fréquence du 6")
        r = rangee(RANGEE, 0.85, 0.22).move_to(P(-3.6, 1.9))
        cad = self.cadres_six(r)
        self.add(r, cad)
        self.au_mot("3 sur 5")
        f35 = self.fraction(3, 5, 48, JAUNE_TITRE)
        l1 = self.ligne([("fréquence du 6 =", WHITE), f35], 40, 0.3).move_to(P(-3.6, 0.5))
        self.play(FadeIn(l1), run_time=0.5)
        self.insister(f35, 0.35)
        self.au_mot("3 divisé par 5")
        l2 = self.ligne([("3 ÷ 5 =", WHITE), ("0,6", JAUNE_TITRE)], 42).move_to(P(-3.6, -0.75))
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.5)
        self.au_mot("soit 60 %")
        l3 = self.ligne([("soit", WHITE), ("60 %", JAUNE_TITRE)], 42).move_to(P(-3.6, -1.65))
        self.play(FadeIn(l3, shift=UP * 0.15), run_time=0.5)
        # les deux jauges : 60 % contre 1/6
        xg, yb, Hg = 2.2, -2.3, 4.0
        cadre_a = Rectangle(width=1.0, height=Hg, stroke_color=WHITE, stroke_width=3).move_to(P(xg, yb + Hg / 2))
        cadre_b = cadre_a.copy().shift(RIGHT * 1.9)
        jauge_a = Rectangle(width=1.0, height=0.6 * Hg, stroke_width=0, fill_color=JAUNE_TITRE,
                            fill_opacity=0.9).move_to(P(xg, yb + 0.3 * Hg))
        jauge_b = Rectangle(width=1.0, height=Hg / 6, stroke_width=0, fill_color=VERT_OK,
                            fill_opacity=0.9).move_to(P(xg + 1.9, yb + Hg / 12))
        la = self.t("60 %", 30, JAUNE_TITRE).next_to(cadre_a, UP, buff=0.15)
        self.play(Create(cadre_a), GrowFromEdge(jauge_a, DOWN), FadeIn(la), run_time=0.8)
        self.au_mot("loin de 1 sur 6")
        lb = self.fraction(1, 6, 30, VERT_OK).next_to(cadre_b, UP, buff=0.15)
        self.play(Create(cadre_b), GrowFromEdge(jauge_b, DOWN), FadeIn(lb), run_time=0.8)
        loin = self.t("loin !", 36, ORANGE_RETENUE).move_to(P(xg + 0.95, yb + Hg + 0.95))
        self.play(FadeIn(loin, scale=0.7), run_time=0.3)
        self.au_mot("que 5 fois")
        ch = self.chute("Mais seulement 5 lancers !", color=ORANGE_RETENUE, font_size=40)
        self.play(Write(ch), Indicate(r, color=ORANGE_RETENUE, scale_factor=1.1), run_time=0.9)
        self.attendre_voix()

    # ── 03 : le hasard ──────────────────────────────────────────────────────

    def ecran_hasard(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-hasard")
        self.titre_ecran("Sur 5 lancers, le hasard s'amuse")
        lignes = [[2, 5, 1, 6, 3], [4, 4, 1, 2, 5], [6, 3, 6, 1, 6], [1, 6, 2, 6, 4]]
        rs = VGroup(*[rangee(fs, 0.62, 0.15) for fs in lignes]).arrange(DOWN, buff=0.32).move_to(P(-4.1, -0.1))
        self.au_mot("Sur 5 lancers")
        l1 = self.ligne([("Sur", WHITE), ("5", JAUNE_TITRE), ("lancers : des surprises", WHITE)], 36)
        l1.move_to(P(2.6, 1.9))
        self.play(FadeIn(l1), run_time=0.4)
        for rr in rs:
            rouler_rangee(self, rr, 0.45, 0.06)
        self.au_mot("3 six sur 5")
        cad = VGroup(*[SurroundingRectangle(d, color=JAUNE_TITRE, buff=0.05, stroke_width=4)
                       for d, f in zip(rs[2], lignes[2]) if f == 6])
        l2 = self.ligne([("3", JAUNE_TITRE), ("six sur", WHITE), ("5", JAUNE_TITRE), (":", WHITE),
                         ("rare", ORANGE_RETENUE)], 36).move_to(P(2.6, 0.9))
        self.play(Create(cad), FadeIn(l2), run_time=0.6)
        self.au_mot("mais ça arrive")
        l3 = self.t("mais ça arrive !", 38, VERT_OK).move_to(P(2.6, 0.1))
        self.play(FadeIn(l3), run_time=0.4)
        self.insister(rs[2], 0.35)
        self.au_mot("c'est un petit échantillon")
        l4 = self.ligne([("5", JAUNE_TITRE), ("lancers = un petit échantillon", WHITE)], 34).move_to(P(2.6, -0.9))
        self.borne(l4, 6.2)
        self.play(FadeIn(l4), run_time=0.5)
        self.au_mot("il ne prouve rien")
        self.play(Write(self.chute("Il ne prouve rien.", color=ORANGE_RETENUE, font_size=44)))
        self.attendre_voix()

    # ── 04 : un grand échantillon ───────────────────────────────────────────

    def compteur_fab(self, n):
        return self.ligne([(str(n), JAUNE_TITRE), ("lancers", WHITE)], 40, 0.2).move_to(P(4.9, 2.25))

    def ecran_grand(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-grand")
        self.titre_ecran("Il faut beaucoup de lancers")
        self.regler_histo(x0=-5.2, pas=1.15, larg=0.8, base=-1.85, H=12.0, font=30, cote_de=0.45)
        axe = self.axe_histo()
        hold = self.barres(ZERO)
        cpt = self.compteur_fab(0)
        d = de(6, 0.9).move_to(P(2.35, 2.25))
        self.au_mot("beaucoup de lancers")
        self.play(FadeIn(axe), FadeIn(d), FadeIn(cpt), run_time=0.5)
        self.add(hold)
        self.au_mot("relance 600 fois")
        roule = de_qui_roule(d.get_center(), 0.9, periode=0.07, faces=TIRAGES[:80])
        self.remove(d)
        self.add(roule)
        self.faire_monter(hold, ZERO, freqs(EFF_600), 2.4, cpt, 0, 600, self.compteur_fab)
        roule.clear_updaters()
        self.remove(roule)
        self.add(de(6, 0.9).move_to(P(2.35, 2.25)))
        self.au_mot("Le 6 sort 104 fois")
        eff = self.effectifs(freqs(EFF_600), EFF_600, font=26)
        eff[5].set_color(JAUNE_TITRE)
        self.play(hold[5].animate.set_fill(JAUNE_TITRE), FadeIn(eff), run_time=0.5)
        l1 = self.ligne([("le 6 :", WHITE), ("104 fois", JAUNE_TITRE)], 38).move_to(P(4.1, 1.15))
        self.play(FadeIn(l1), Indicate(axe[1][5], scale_factor=1.4), run_time=0.5)
        self.insister(eff[5], 0.35)
        self.au_mot("104 divisé par 600")
        l2 = self.t("104 ÷ 600", 36).move_to(P(4.1, 0.2))
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.4)
        self.au_mot("environ 0,17")
        l2b = self.ligne([("104 ÷ 600 ≈", WHITE), ("0,17", JAUNE_TITRE)], 36).move_to(P(4.1, 0.2))
        self.play(ReplacementTransform(l2, l2b), run_time=0.4)
        self.au_mot("très proche de 1 sur 6")
        lig = self.ligne_sixieme()
        f6 = self.fraction(1, 6, 40, VERT_OK)
        l3 = self.ligne([("très proche de", VERT_OK), f6], 36, 0.25).move_to(P(4.1, -0.85))
        self.play(Create(lig[0]), FadeIn(lig[1]), FadeIn(l3), run_time=0.7)
        self.au_mot("n'est pas truqué")
        self.play(Write(self.chute("Son dé n'est pas truqué.", color=VERT_OK, font_size=42)))
        self.attendre_voix()

    # ── 05 : la méthode ─────────────────────────────────────────────────────

    def ecran_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-methode")
        self.titre_ecran("La méthode")
        self.au_mot("regarder la taille de l'échantillon")
        m = self.t("Avant de conclure : la taille de l'échantillon ?", 36, BLEU_CALCUL).move_to(P(-0.6, 2.25))
        self.borne(m, 11.0)
        self.play(FadeIn(m, shift=UP * 0.15), run_time=0.5)
        self.au_mot("Petit échantillon")
        petit = rangee(RANGEE, 0.55, 0.12).move_to(P(-3.9, 0.7))
        lp = self.t("petit échantillon", 34, ORANGE_RETENUE).move_to(P(-3.9, -0.6))
        cp = self.t("on ne conclut pas", 34).move_to(P(-3.9, -1.35))
        self.play(LaggedStart(*[FadeIn(d, shift=DOWN * 0.4) for d in petit], lag_ratio=0.15), FadeIn(lp), run_time=0.8)
        croix = VGroup(Line(P(-0.25, 0.25), P(0.25, -0.25)), Line(P(-0.25, -0.25), P(0.25, 0.25))).set_stroke(
            ROUGE_ERREUR, 7).next_to(cp, LEFT, buff=0.25)
        self.play(FadeIn(cp), Create(croix), run_time=0.5)
        self.au_mot("Grand échantillon")
        faces = [TIRAGES[k] for k in range(60)]
        grand = VGroup(*[de(f, 0.3) for f in faces]).arrange_in_grid(5, 12, buff=0.06).move_to(P(2.6, 0.95))
        lg = self.t("grand échantillon", 34, VERT_OK).move_to(P(2.6, -0.6))
        cg = self.t("la fréquence est fiable", 34).move_to(P(2.6, -1.35))
        self.play(LaggedStart(*[FadeIn(d, scale=0.3) for d in grand], lag_ratio=0.02), FadeIn(lg), run_time=1.2)
        co = self.coche().next_to(cg, LEFT, buff=0.25)
        self.play(FadeIn(cg), Create(co), run_time=0.5)
        self.insister(VGroup(lg, cg, co), 0.4)
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def carte(self, mot="PERDU", col=ROUGE_ERREUR):
        r = RoundedRectangle(width=1.7, height=2.1, corner_radius=0.15, fill_color="#1F2937", fill_opacity=1,
                             stroke_color=col, stroke_width=4)
        return VGroup(r, self.t(mot, 24, col).move_to(r))

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        self.au_mot("trois ou quatre essais")
        l0 = self.ligne([("Conclure après", WHITE), ("3", JAUNE_TITRE), ("ou", WHITE), ("4", JAUNE_TITRE),
                         ("essais", WHITE)], 38).move_to(P(-0.6, 2.2))
        self.play(FadeIn(l0), run_time=0.4)
        self.au_mot("J'ai perdu trois fois")
        cartes = VGroup(*[self.carte() for _ in range(3)]).arrange(RIGHT, buff=0.35).move_to(P(-3.9, 0.3))
        for c in cartes:
            dos = RoundedRectangle(width=1.7, height=2.1, corner_radius=0.15, fill_color=BLEU_CALCUL,
                                   fill_opacity=0.8, stroke_color=WHITE, stroke_width=3).move_to(c)
            self.add(dos)
            self.play(dos.animate.stretch(0.02, 0), run_time=0.15)
            self.remove(dos)
            c.stretch(0.02, 0)
            self.add(c)
            self.play(c.animate.stretch(50, 0), run_time=0.15)
        b = self.t("« J'ai perdu 3 fois :", 34, ORANGE_RETENUE)
        b2 = self.t("ce jeu est truqué ! »", 34, ORANGE_RETENUE)
        bulle = VGroup(b, b2).arrange(DOWN, buff=0.15).move_to(P(2.6, 0.7))
        self.play(FadeIn(bulle), run_time=0.5)
        self.au_mot("ce jeu est truqué")
        self.play(Indicate(b2, color=ORANGE_RETENUE), run_time=0.5)
        self.au_mot("Non : trop peu")
        self.play(Create(self.barrer(bulle)), run_time=0.4)
        nf = self.t("Non : trop peu d'essais.", 42, ROUGE_ERREUR).move_to(P(-0.6, -1.7))
        self.play(FadeIn(nf, scale=0.8), run_time=0.4)
        self.insister(nf, 0.35)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def compteur_piece(self, piles, lancers, font=34):
        return VGroup(self.ligne([(f"{piles:,}".replace(",", " "), JAUNE_TITRE), ("piles", WHITE)], font, 0.15),
                      self.ligne([("sur", WHITE), (f"{lancers:,}".replace(",", " "), JAUNE_TITRE), ("lancers", WHITE)],
                                 font, 0.15)).arrange(DOWN, buff=0.15)

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        xs = [-3.8, 1.4]
        self.au_mot("Une pièce")
        # phase / vitesse : les deux pièces ne montrent pas la même face en même temps
        pcs = [piece_qui_tourne(P(x, 1.3), 0.7, phase=ph, vitesse=v)
               for x, ph, v in zip(xs, [0.0, 0.37], [1.0, 1.13])]
        noms = VGroup(*[self.t(n, 30, BLEU_CALCUL).move_to(P(x, 2.45)) for n, x in zip(["1er élève", "2e élève"], xs)])
        self.add(*pcs)
        self.play(FadeIn(noms), run_time=0.4)
        for x, (piles, lancers), ext in zip(xs, [(4, 5), (700, 1000)],
                                            ["4 piles sur 5 lancers", "700 piles sur 1 000 lancers"]):
            self.au_mot(ext)
            s = ValueTracker(0)
            c = self.compteur_piece(0, 0).move_to(P(x, -0.25))
            c.add_updater(lambda m, x=x, piles=piles, lancers=lancers: m.become(
                self.compteur_piece(int(round(piles * s.get_value())), int(round(lancers * s.get_value())))
                .move_to(P(x, -0.25))))
            self.add(c)
            self.play(s.animate.set_value(1), run_time=1.2, rate_func=rate_functions.ease_out_sine)
            c.clear_updaters()
            self.play(c.animate.scale(1.2), run_time=0.25)
            self.play(c.animate.scale(1 / 1.2), run_time=0.25)
        self.au_mot("Lequel peut soupçonner")
        q = self.t("Lequel peut soupçonner une pièce truquée ?", 36, BLEU_CALCUL).move_to(P(-0.9, -1.75))
        self.borne(q, 10.5)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.5)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)
        for p in pcs:
            p.clear_updaters()

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        xs = [-4.4, 1.2]
        cols = VGroup()
        for x, nm, (pi, la) in zip(xs, ["1er élève", "2e élève"], [(4, 5), (700, 1000)]):
            n = self.t(nm, 28, BLEU_CALCUL)
            c = self.compteur_piece(pi, la, 28)
            cols.add(VGroup(n, c).arrange(DOWN, buff=0.15).move_to(P(x, 2.0)))
        self.add(cols)
        self.au_mot("Tom")
        cad = SurroundingRectangle(cols[1], color=VERT_OK, buff=0.15)
        self.play(Create(cad), run_time=0.4)
        self.au_mot("700 sur 1 000")
        f = self.fraction(700, "1 000", 36, JAUNE_TITRE)
        l1 = self.ligne([f, ("c'est", WHITE), ("70 %", JAUNE_TITRE)], 36, 0.25).move_to(P(1.1, 0.45))
        self.play(FadeIn(l1[0]), run_time=0.4)
        # la jauge de 0 % à 100 %
        xa, xb, y = -3.4, 4.0, -0.75

        def X(v):
            return P(xa + (xb - xa) * v, y)

        fond = Rectangle(width=xb - xa, height=0.45, stroke_color=WHITE, stroke_width=3).move_to((X(0) + X(1)) / 2)
        self.au_mot("c'est 70 %")
        rempli = Rectangle(width=(xb - xa) * 0.7, height=0.45, stroke_width=0, fill_color=JAUNE_TITRE,
                           fill_opacity=0.9).move_to((X(0) + X(0.7)) / 2)
        l70 = self.t("70 %", 32, JAUNE_TITRE).next_to(X(0.7), DOWN, buff=0.38)
        self.play(FadeIn(l1[1:]), Create(fond), GrowFromEdge(rempli, LEFT), FadeIn(l70), run_time=0.8)
        self.au_mot("loin de 50 %")
        m50 = Line(X(0.5) + UP * 0.4, X(0.5) + DOWN * 0.4, color=VERT_OK, stroke_width=6)
        l50 = self.t("50 %", 32, VERT_OK).next_to(m50, DOWN, buff=0.1)
        ecart = DoubleArrow(X(0.5) + UP * 0.55, X(0.7) + UP * 0.55, buff=0, color=ORANGE_RETENUE, stroke_width=4,
                            tip_length=0.15)
        self.play(Create(m50), FadeIn(l50), GrowFromCenter(ecart), run_time=0.6)
        self.au_mot("c'est suspect")
        s = self.ligne([("grand échantillon :", WHITE), ("suspect !", VERT_OK)], 36, 0.5).move_to(P(0.3, -2.1))
        self.play(FadeIn(s), run_time=0.4)
        self.insister(s[1], 0.35)
        self.au_mot("que 5 fois")
        cad2 = SurroundingRectangle(cols[0], color=ORANGE_RETENUE, buff=0.15)
        self.play(Create(cad2), run_time=0.4)
        self.au_mot("on ne peut rien dire")
        rien = VGroup(self.t("5 lancers :", 28, ORANGE_RETENUE), self.t("on ne peut rien dire", 28, ORANGE_RETENUE))
        rien.arrange(DOWN, buff=0.1).next_to(cad2, DOWN, buff=0.15)
        self.play(FadeIn(rien), run_time=0.4)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ("Un petit échantillon", "Petit échantillon : il ne prouve rien"),
            ("le hasard y fait", "Le hasard y fait de gros écarts"),
            ("Sur un grand échantillon", "Grand échantillon : un gros écart devient suspect"),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 36)).arrange(RIGHT, buff=0.3) for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        self.borne(lignes, 11.0).move_to(P(-0.6, 0.8))
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode suivant")
        self.play(Write(self.chute("Épisode suivant : le défi des fréquences", color=VERT_OK, font_size=36)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_frequence()
        self.ecran_hasard()
        self.ecran_grand()
        self.ecran_methode()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
