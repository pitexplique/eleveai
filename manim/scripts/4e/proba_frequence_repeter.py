# proba_frequence_repeter.py
# EleveAI — Maths 4e — Probabilités, épisode 11 : répéter l'expérience
# (notion « fréquences », micro : frequence-repeter), AVEC VOIX. Paysage ceinture ORANGE.
#
# ⭐ LE DESSIN QUI PORTE TOUT : l'HISTOGRAMME DES FRÉQUENCES des 6 faces d'un dé
# (même style que la bande-annonce), avec la ligne pointillée à 1/6. Les barres
# bougent de 10 à 100 puis 600 lancers et se rangent sur la ligne.
# Effectifs FIXES (ceux que dit la voix) :
#   10 lancers  : 2, 1, 4, 2, 0, 1      (le 3 sorti 4 fois, le 5 jamais)
#   100 lancers : 15, 21, 18, 12, 17, 17 (entre 12 et 21)
#   600 lancers : 96, 99, 102, 106, 97, 100 (le vrai tirage de la bande-annonce)
# La hauteur d'une barre = sa FRÉQUENCE (effectif ÷ nombre de lancers), sinon les
# barres de 10 lancers seraient invisibles à côté de celles de 600.
# Écran « la règle » : la fréquence cumulée du 5 dans le vrai tirage (graine 1758).
#
# Voix : manim/voix/4e-proba-frequence-repeter.json (débit −7).
# Short jumeau (ceinture blanche) : proba_frequence_repeter_short.py.
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/proba_frequence_repeter.py ProbaFrequenceRepeter4e -o eleveai-maths-4e-proba-frequence-repeter --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/probabilites/11-frequence-repeter/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "annonce"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from annonce_probabilites import TIRAGES, de, de_qui_roule, piece_qui_tourne  # noqa: E402

EFF_10 = [2, 1, 4, 2, 0, 1]
EFF_100 = [15, 21, 18, 12, 17, 17]
EFF_600 = [96, 99, 102, 106, 97, 100]
ZERO = [0.0] * 6


def freqs(eff):
    n = sum(eff)
    return [e / n for e in eff]


class Notion4e(Notion6e):
    identite = "Maths 4e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


class Histogramme:
    """L'histogramme des fréquences des 6 faces, et ce qui l'anime.

    Géométrie dans self.hx0 (abscisse de la face 1), self.hpas, self.hlarg,
    self.hbase (ordonnée de l'axe), self.hH (hauteur d'une fréquence égale à 1).
    """

    def regler_histo(self, x0, pas, larg, base, H, font=30, cote_de=0.45):
        self.hx0, self.hpas, self.hlarg, self.hbase, self.hH = x0, pas, larg, base, H
        self.hfont, self.hcote = font, cote_de

    def hx(self, i):
        return self.hx0 + i * self.hpas

    def barres(self, fr, couleur=BLEU_CALCUL):
        g = VGroup()
        for i, f in enumerate(fr):
            h = max(f * self.hH, 0.001)
            g.add(Rectangle(width=self.hlarg, height=h, stroke_width=0, fill_opacity=0.88,
                            fill_color=couleur).move_to(P(self.hx(i), self.hbase + h / 2)))
        return g

    def axe_histo(self):
        axe = Line(P(self.hx(0) - self.hpas * 0.6, self.hbase), P(self.hx(5) + self.hpas * 0.6, self.hbase),
                   stroke_width=3)
        des = VGroup(*[de(k + 1, self.hcote).move_to(P(self.hx(k), self.hbase - self.hcote / 2 - 0.12))
                       for k in range(6)])
        return VGroup(axe, des)

    def ligne_sixieme(self, avec_frac=True, gauche=True, dessus=False):
        y = self.hbase + self.hH / 6
        l = DashedLine(P(self.hx(0) - self.hpas * 0.6, y), P(self.hx(5) + self.hpas * 0.6, y),
                       color=VERT_OK, stroke_width=4, dash_length=0.14)
        if not avec_frac:
            return VGroup(l)
        f = self.fraction(1, 6, self.hfont, VERT_OK)
        if dessus:
            f.next_to(l.get_right(), UP, buff=0.08).align_to(l, RIGHT)
        elif gauche:
            f.next_to(l, LEFT, buff=0.15)
        else:
            f.next_to(l, RIGHT, buff=0.15)
        return VGroup(l, f)

    def effectifs(self, fr, eff, font=None, couleur=WHITE):
        font = font or self.hfont
        return VGroup(*[Text(str(e), font_size=font, color=couleur)
                        .move_to(P(self.hx(i), self.hbase + max(f * self.hH, 0) + 0.25))
                        for i, (f, e) in enumerate(zip(fr, eff))])

    def faire_monter(self, holder, A, B, run_time=2.0, compteur=None, nA=0, nB=0, fabrique=None,
                     rate=rate_functions.ease_in_out_sine, autres=()):
        """Les barres passent des fréquences A aux fréquences B ; le compteur suit."""
        s = ValueTracker(0)
        # ⛔ Animer UNE barre seule (Wiggle…) la sort du groupe dans la scène :
        # le groupe n'y est plus, son updater ne tourne plus. On le remet.
        if holder not in self.mobjects:
            self.remove(*holder.submobjects)
            self.add(holder)

        def maj(m):
            # Les rectangles sont modifiés EN PLACE : ils gardent leur couleur.
            k = s.get_value()
            for i, r in enumerate(m):
                h = max((A[i] + (B[i] - A[i]) * k) * self.hH, 0.001)
                r.stretch_to_fit_height(h)
                r.move_to(P(self.hx(i), self.hbase + h / 2))

        holder.add_updater(maj)
        if compteur is not None:
            compteur.add_updater(lambda m: m.become(fabrique(int(round(nA + (nB - nA) * s.get_value())))))
        self.play(s.animate.set_value(1), *autres, run_time=run_time, rate_func=rate)
        holder.clear_updaters()
        if compteur is not None:
            compteur.clear_updaters()


class ProbaFrequenceRepeter4e(Histogramme, Notion4e):
    nom_voix = "4e-proba-frequence-repeter"

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

    # la géométrie des écrans d'histogramme (02, 03, 04)
    XP = 3.3  # centre du panneau de droite

    def histo_standard(self):
        self.regler_histo(x0=-5.7, pas=1.0, larg=0.72, base=-1.85, H=8.0, font=30, cote_de=0.42)

    def compteur_fab(self, n):
        return self.ligne([(str(n), JAUNE_TITRE), ("lancers", WHITE)], 40, 0.2).move_to(P(self.XP + 0.7, 2.25))

    def scene_histo(self, eff_depart, n_depart, avec_ligne):
        """Pose l'axe, les barres de départ, le dé et le compteur ; renvoie tout."""
        self.histo_standard()
        axe = self.axe_histo()
        hold = self.barres(freqs(eff_depart) if n_depart else ZERO)
        cpt = self.compteur_fab(n_depart)
        d = de(6, 0.9).move_to(P(self.XP - 1.55, 2.25))
        self.add(axe, hold, cpt, d)
        lig = self.ligne_sixieme()
        if avec_ligne:
            self.add(lig)
        return axe, hold, cpt, d, lig

    def lancer(self, d, hold, A, B, nA, nB, cpt, run_time=2.4):
        roule = de_qui_roule(d.get_center(), 0.9, periode=0.07, faces=TIRAGES[:80])
        self.remove(d)
        self.add(roule)
        self.faire_monter(hold, A, B, run_time, cpt, nA, nB, self.compteur_fab)
        roule.clear_updaters()
        self.remove(roule)
        d2 = de(TIRAGES[nB - 1], 0.9).move_to(d.get_center())
        self.add(d2)
        return d2

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Répéter l'expérience", 56, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("orange").move_to(P(-0.6, -2.75))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech))
        self.regler_histo(x0=-2.4, pas=0.8, larg=0.56, base=-1.25, H=4.6, font=26, cote_de=0.32)
        axe = self.axe_histo()
        lig = self.ligne_sixieme()
        hold = self.barres(ZERO)
        d = de_qui_roule(P(-5.0, -0.3), 1.3, periode=0.12)
        self.add(d)
        self.play(FadeIn(axe), FadeIn(lig), run_time=0.5)
        self.add(hold)
        self.faire_monter(hold, ZERO, freqs(EFF_10), 0.9)
        self.au_mot("Plus on lance")
        acc = self.t("Plus on lance, plus l'écart se réduit.", 36, BLEU_CALCUL).move_to(P(-0.6, 1.45))
        self.play(FadeIn(acc, shift=UP * 0.2), run_time=0.6)
        self.faire_monter(hold, freqs(EFF_10), freqs(EFF_600), 2.2)
        self.play(Indicate(lig[0], color=VERT_OK, scale_factor=1.05), run_time=0.6)
        self.attendre_voix(marge=1.5)
        d.clear_updaters()

    # ── 01 : la situation ───────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("On lance, encore et encore")
        self.au_mot("On lance un dé")
        d = de_qui_roule(P(-4.4, 0.9), 1.8, periode=0.16)
        self.add(d)
        self.au_mot("la fréquence de chaque face")
        faces = VGroup(*[de(k, 0.72) for k in range(1, 7)]).arrange(RIGHT, buff=0.22).move_to(P(1.8, 1.6))
        fq = self.t("la fréquence de chaque face", 36, BLEU_CALCUL).move_to(P(1.8, 0.65))
        self.play(LaggedStart(*[FadeIn(f, scale=0.5) for f in faces], lag_ratio=0.12), FadeIn(fq), run_time=1.0)
        etapes = VGroup(self.ligne([("10", JAUNE_TITRE), ("lancers", WHITE)], 38),
                        self.ligne([("100", JAUNE_TITRE), ("lancers", WHITE)], 38),
                        self.ligne([("600", JAUNE_TITRE), ("lancers", WHITE)], 38))
        etapes.arrange(RIGHT, buff=1.3).move_to(P(-0.6, -1.0))
        fl = VGroup(*[Arrow(etapes[k].get_right() + RIGHT * 0.15, etapes[k + 1].get_left() + LEFT * 0.15, buff=0,
                            color=WHITE, stroke_width=5) for k in range(2)])
        for ext, e, f in zip(["Après 10 lancers", "puis 100", "puis 600"], etapes, [None, fl[0], fl[1]]):
            self.au_mot(ext)
            anims = [FadeIn(e, shift=UP * 0.2)]
            if f is not None:
                anims.append(GrowArrow(f))
            self.play(*anims, run_time=0.45)
            self.play(e[0].animate.scale(1.4), run_time=0.25)
            self.play(e[0].animate.scale(1 / 1.4), run_time=0.25)
        self.au_mot("Que va-t-il se passer")
        self.play(Write(self.chute("Que va-t-il se passer ?", color=BLEU_CALCUL, font_size=42)))
        self.attendre_voix()
        d.clear_updaters()

    # ── 02 : après 10 lancers ───────────────────────────────────────────────

    def ecran_dix(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-dix")
        self.titre_ecran("Après 10 lancers")
        axe, hold, cpt, d, lig = self.scene_histo(EFF_10, 0, False)
        self.au_mot("Après 10 lancers")
        d = self.lancer(d, hold, ZERO, freqs(EFF_10), 0, 10, cpt, 2.0)
        fr = freqs(EFF_10)
        eff = self.effectifs(fr, EFF_10)
        self.au_mot("le 3 est sorti 4 fois")
        l1 = self.ligne([("le 3 :", WHITE), ("4 fois", JAUNE_TITRE)], 38).move_to(P(self.XP, 1.1))
        eff[2].set_color(JAUNE_TITRE)
        self.play(FadeIn(eff[2], shift=DOWN * 0.15), FadeIn(l1), Indicate(axe[1][2], scale_factor=1.4),
                  hold[2].animate.set_fill(JAUNE_TITRE), run_time=0.6)
        self.insister(eff[2], 0.35)
        self.au_mot("le 5 jamais")
        l2 = self.ligne([("le 5 :", WHITE), ("jamais", ORANGE_RETENUE), ("(0 fois)", ORANGE_RETENUE)], 38)
        self.borne(l2, 5.0).move_to(P(self.XP, 0.3))
        eff[4].set_color(ORANGE_RETENUE)
        self.play(FadeIn(eff[4], shift=DOWN * 0.15), FadeIn(l2), Indicate(axe[1][4], scale_factor=1.4), run_time=0.6)
        self.insister(eff[4], 0.35)
        self.au_mot("Les barres sont toutes différentes")
        l3 = self.borne(self.t("barres toutes différentes", 34), 5.0).move_to(P(self.XP, -0.55))
        self.play(FadeIn(VGroup(*[eff[i] for i in (0, 1, 3, 5)])), FadeIn(l3), run_time=0.5)
        self.play(LaggedStart(*[Wiggle(b, scale_value=1.08) for b in hold], lag_ratio=0.1), run_time=1.0)
        self.au_mot("loin de 1 sur 6")
        self.play(Create(lig[0]), FadeIn(lig[1]), run_time=0.8)
        f6 = self.fraction(1, 6, 40, VERT_OK)
        l4 = self.ligne([("loin de", ORANGE_RETENUE), f6], 40, 0.25).move_to(P(self.XP, -1.5))
        self.play(FadeIn(l4), run_time=0.5)
        self.insister(f6, 0.4)
        self.attendre_voix()

    # ── 03 : après 100 lancers ──────────────────────────────────────────────

    def ecran_cent(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-cent")
        self.titre_ecran("Après 100 lancers")
        axe, hold, cpt, d, lig = self.scene_histo(EFF_10, 10, True)
        self.au_mot("Après 100 lancers")
        d = self.lancer(d, hold, freqs(EFF_10), freqs(EFF_100), 10, 100, cpt, 2.2)
        self.au_mot("les barres se rapprochent")
        l1 = self.borne(self.t("les barres se rapprochent", 34, BLEU_CALCUL), 5.0).move_to(P(self.XP, 1.1))
        self.play(FadeIn(l1), Indicate(lig[0], color=VERT_OK, scale_factor=1.04), run_time=0.7)
        fr = freqs(EFF_100)
        self.au_mot("entre 12 et 21 fois")
        eff = self.effectifs(fr, EFF_100)
        l2 = self.ligne([("chaque face :", WHITE)], 36).move_to(P(self.XP, 0.2))
        l3 = self.ligne([("entre", WHITE), ("12", JAUNE_TITRE), ("et", WHITE), ("21", JAUNE_TITRE),
                         ("fois", WHITE)], 40)
        self.borne(l3, 5.0).move_to(P(self.XP, -0.6))
        self.play(FadeIn(eff), FadeIn(l2), FadeIn(l3), run_time=0.6)
        c12 = SurroundingRectangle(eff[3], color=JAUNE_TITRE, buff=0.08)
        c21 = SurroundingRectangle(eff[1], color=JAUNE_TITRE, buff=0.08)
        self.play(Create(c12), Create(c21), run_time=0.5)
        self.insister(l3, 0.4)
        self.attendre_voix()

    # ── 04 : après 600 lancers ──────────────────────────────────────────────

    def ecran_six_cents(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-six-cents")
        self.titre_ecran("Après 600 lancers")
        axe, hold, cpt, d, lig = self.scene_histo(EFF_100, 100, True)
        self.au_mot("Après 600 lancers")
        d = self.lancer(d, hold, freqs(EFF_100), freqs(EFF_600), 100, 600, cpt, 2.4)
        fr = freqs(EFF_600)
        self.au_mot("à peu près 100 fois")
        eff = self.effectifs(fr, EFF_600, font=26)
        l1 = self.ligne([("≈ 100", JAUNE_TITRE), ("fois chacune", WHITE)], 40).move_to(P(self.XP, 1.1))
        self.play(FadeIn(eff), FadeIn(l1), run_time=0.6)
        self.insister(l1[0], 0.4)
        self.au_mot("proches de 1 sur 6")
        f6 = self.fraction(1, 6, 42, VERT_OK)
        l2 = self.ligne([("fréquences ≈", WHITE), f6], 38, 0.25).move_to(P(self.XP, 0.05))
        self.play(FadeIn(l2), Indicate(lig, color=VERT_OK, scale_factor=1.05), run_time=0.7)
        self.au_mot("environ 0,17")
        l3 = self.ligne([("1 ÷ 6 ≈", WHITE), ("0,17", VERT_OK)], 42).move_to(P(self.XP, -1.05))
        self.play(FadeIn(l3, shift=UP * 0.15), run_time=0.5)
        self.insister(l3[1], 0.4)
        self.attendre_voix()

    # ── 05 : la règle ───────────────────────────────────────────────────────

    def ecran_loi(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-loi")
        self.titre_ecran("La règle")
        x0, L, yb, H = -6.2, 6.6, -2.3, 8.0  # fréquence 0,5 → 4 unités
        axe_x = Arrow(P(x0, yb), P(x0 + L + 0.4, yb), buff=0, color=WHITE, stroke_width=3,
                      max_tip_length_to_length_ratio=0.03)
        axe_y = Arrow(P(x0, yb), P(x0, yb + 0.5 * H + 0.3), buff=0, color=WHITE, stroke_width=3,
                      max_tip_length_to_length_ratio=0.06)
        lx = self.t("nombre de lancers", 24).next_to(axe_x, DOWN, buff=0.15).align_to(axe_x, RIGHT)
        ly = self.t("fréquence du", 24).next_to(axe_y, UP, buff=0.12).align_to(axe_y, LEFT)
        d5 = de(5, 0.38).next_to(ly, RIGHT, buff=0.15)
        ysix = yb + H / 6
        six = DashedLine(P(x0, ysix), P(x0 + L, ysix), color=VERT_OK, stroke_width=4, dash_length=0.14)
        f6 = self.fraction(1, 6, 28, VERT_OK).next_to(six, LEFT, buff=0.12)
        self.play(GrowArrow(axe_x), GrowArrow(axe_y), FadeIn(lx), FadeIn(ly), FadeIn(d5), run_time=0.7)
        self.play(Create(six), FadeIn(f6), run_time=0.5)
        c = 0
        pts = []
        for n, v in enumerate(TIRAGES, 1):
            c += v == 5
            pts.append(P(x0 + L * n / 600, yb + min(c / n, 0.5) * H))
        courbe = VMobject(stroke_color=BLEU_CALCUL, stroke_width=4).set_points_as_corners(pts)
        point = Dot(pts[0], radius=0.09, color=JAUNE_TITRE)
        self.au_mot("quand on répète")
        l1 = VGroup(self.t("on répète", 36), self.t("un grand nombre de fois", 36)).arrange(DOWN, buff=0.15)
        l1.move_to(P(3.9, 1.6))
        self.play(FadeIn(l1), run_time=0.4)
        self.add(point)
        self.play(Create(courbe), MoveAlongPath(point, courbe), run_time=3.6, rate_func=rate_functions.ease_out_sine)
        self.au_mot("la fréquence observée")
        l2 = self.t("fréquence observée", 36, BLEU_CALCUL).move_to(P(3.9, 0.35))
        fl = VGroup(Line(P(3.9, 0.05), P(3.9, -0.5), color=WHITE, stroke_width=6),
                    Triangle(fill_color=WHITE, fill_opacity=1, stroke_width=0).scale(0.14).rotate(PI)
                    .move_to(P(3.9, -0.58)))
        l3 = self.t("probabilité", 40, VERT_OK).move_to(P(3.9, -1.0))
        self.play(FadeIn(l2), run_time=0.4)
        self.au_mot("se rapproche de la probabilité")
        self.play(Create(fl), FadeIn(l3, shift=DOWN * 0.15), run_time=0.6)
        cadre = SurroundingRectangle(VGroup(l2, l3), color=VERT_OK, buff=0.2)
        self.play(Create(cadre), Indicate(six, color=VERT_OK), run_time=0.7)
        self.insister(l3, 0.4)
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        self.au_mot("croire que le dé se souvient")
        q = self.t("Le dé se souvient ?", 42, ORANGE_RETENUE).move_to(P(-0.6, 2.2))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.5)
        self.au_mot("Après trois 6 de suite")
        des = VGroup(*[de(6, 1.1) for _ in range(3)]).arrange(RIGHT, buff=0.3).move_to(P(-4.0, 0.7))
        for dd in des:
            self.play(FadeIn(dd, shift=DOWN * 0.6), run_time=0.3)
        l0 = self.ligne([("3", JAUNE_TITRE), ("six de suite", WHITE)], 34).next_to(des, DOWN, buff=0.3)
        self.play(FadeIn(l0), run_time=0.3)
        self.au_mot("« en retard »")
        b1 = self.t("le 6 est « en retard » ?", 34).move_to(P(2.6, 1.0))
        self.play(FadeIn(b1), run_time=0.4)
        self.au_mot("« usé »")
        b2 = self.t("le 6 est « usé » ?", 34).move_to(P(2.6, 0.2))
        self.play(FadeIn(b2), run_time=0.4)
        x1, x2 = self.barrer(b1), self.barrer(b2)
        self.play(Create(x1), Create(x2), run_time=0.5)
        nf = self.t("Non !", 50, ROUGE_ERREUR).move_to(P(2.6, -0.75))
        self.play(FadeIn(nf, scale=0.7), run_time=0.3)
        self.au_mot("À chaque lancer")
        roule = de_qui_roule(P(-4.0, -1.55), 1.0, periode=0.12)
        self.add(roule)
        self.au_mot("1 chance sur 6")
        f6 = self.fraction(1, 6, 46, VERT_OK)
        l = self.ligne([("À chaque lancer :", VERT_OK), f6], 40, 0.3).move_to(P(1.4, -2.2))
        self.play(FadeIn(l), run_time=0.5)
        self.insister(f6, 0.4)
        self.attendre_voix()
        roule.clear_updaters()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def colonne(self, x, nom, lancers, freq, y=1.35, r=0.55, font=34, phase=0.0, vitesse=1.0):
        # phase / vitesse : les pièces des élèves ne montrent pas la même face en même temps
        pc = piece_qui_tourne(P(x, y), r, phase=phase, vitesse=vitesse)
        n = self.t(nom, 28, BLEU_CALCUL).move_to(P(x, y + r + 0.45))
        f = self.ligne([("pile :", WHITE), (freq, JAUNE_TITRE)], font, 0.18).move_to(P(x, y - r - 0.5))
        l = self.ligne([(lancers, JAUNE_TITRE), ("lancers", WHITE)], font - 4, 0.15).move_to(P(x, y - r - 1.15))
        return pc, n, f, l

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        xs = [-4.6, -1.2, 2.2]
        cols = [self.colonne(x, nm, la, fr, phase=ph, vitesse=v) for x, nm, la, fr, ph, v in
                zip(xs, ["1er élève", "2e élève", "3e élève"], ["10", "100", "1 000"], ["0,7", "0,55", "0,51"],
                    [0.0, 0.37, 0.81], [1.0, 1.13, 0.91])]
        self.au_mot("Trois élèves lancent une pièce")
        for pc, n, f, l in cols:
            self.add(pc)
        self.play(*[FadeIn(c[1]) for c in cols], run_time=0.5)
        for (pc, n, f, l), e1, e2 in zip(cols, ["0,7 pour", "0,55 pour", "0,51 pour"],
                                         ["après 10 lancers", "après 100 lancers", "après 1 000 lancers"]):
            self.au_mot(e1)
            self.play(FadeIn(f, shift=UP * 0.15), run_time=0.4)
            self.au_mot(e2)
            self.play(FadeIn(l, shift=UP * 0.15), run_time=0.4)
        self.au_mot("Qui a lancé le plus")
        q1 = self.t("Qui a lancé le plus ?", 38, BLEU_CALCUL).move_to(P(-1.2, -1.45))
        self.play(FadeIn(q1, shift=UP * 0.15), run_time=0.5)
        self.au_mot("la plus proche de 0,5")
        q2 = self.ligne([("Pourquoi sa fréquence est-elle la plus proche de", BLEU_CALCUL),
                         ("0,5", JAUNE_TITRE), ("?", BLEU_CALCUL)], 32, 0.15)
        self.borne(q2, 10.4).move_to(P(-1.2, -2.2))
        self.play(FadeIn(q2, shift=UP * 0.15), run_time=0.5)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)
        for c in cols:
            c[0].clear_updaters()

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        xs = [-4.6, -1.2, 2.2]
        cols = [self.colonne(x, nm, la, fr, y=1.75, r=0.4, font=30, phase=ph, vitesse=v) for x, nm, la, fr, ph, v in
                zip(xs, ["1er élève", "2e élève", "3e élève"], ["10", "100", "1 000"], ["0,7", "0,55", "0,51"],
                    [0.0, 0.37, 0.81], [1.0, 1.13, 0.91])]
        for c in cols:
            self.add(*c)
        self.au_mot("1 000 lancers")
        cadre = SurroundingRectangle(VGroup(*cols[2][1:]), color=VERT_OK, buff=0.15)
        self.play(Create(cadre), run_time=0.5)
        self.insister(cols[2][3], 0.4)
        # la droite de 0,4 à 0,8
        a, b, xa, xb, y = 0.4, 0.8, -5.6, 2.6, -1.4

        def X(v):
            return P(xa + (xb - xa) * (v - a) / (b - a), y)

        axe = Line(X(a) + LEFT * 0.3, X(b) + RIGHT * 0.3, stroke_width=3)
        ticks = VGroup(*[Line(X(v) + DOWN * 0.12, X(v) + UP * 0.12, stroke_width=3) for v in (0.4, 0.5, 0.6, 0.7, 0.8)])
        labs = VGroup(*[self.t(s, 26).move_to(X(v) + DOWN * 0.45) for v, s in
                        [(0.4, "0,4"), (0.5, "0,5"), (0.6, "0,6"), (0.7, "0,7"), (0.8, "0,8")]])
        self.au_mot("Plus on lance")
        self.play(Create(axe), FadeIn(ticks), FadeIn(labs), run_time=0.6)
        couls = [ORANGE_RETENUE, BLEU_CALCUL, VERT_OK]
        pts = VGroup()
        for v, ccol, la in zip([0.7, 0.55, 0.51], couls, ["10", "100", "1 000"]):
            p = Dot(X(v), radius=0.13, color=ccol)
            lab = self.t(la, 26, ccol).next_to(p, UP, buff=0.65 if la == "100" else 0.18)
            pts.add(VGroup(p, lab))
            self.play(FadeIn(p, scale=2.0), FadeIn(lab), run_time=0.35)
        self.au_mot("la probabilité, 0,5")
        cible = Circle(radius=0.25, color=VERT_OK, stroke_width=5).move_to(X(0.5))
        prob = self.t("probabilité : 0,5", 30, VERT_OK).move_to(X(0.5) + DOWN * 0.95)
        self.play(Create(cible), FadeIn(prob), labs[1].animate.set_color(VERT_OK), run_time=0.6)
        self.insister(prob, 0.4)
        self.play(Write(self.chute("Plus on lance, plus la fréquence se rapproche de 0,5.", color=VERT_OK,
                                   font_size=34)))
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ("Sur peu d'essais", "Peu d'essais : la fréquence peut être loin de la probabilité"),
            ("Sur beaucoup d'essais", "Beaucoup d'essais : elle s'en rapproche"),
            ("Le hasard n'a pas de mémoire", "Le hasard n'a pas de mémoire"),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 36)).arrange(RIGHT, buff=0.3) for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        self.borne(lignes, 11.0).move_to(P(-0.6, 0.8))
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode suivant")
        self.play(Write(self.chute("Épisode suivant : ce qu'un petit échantillon ne prouve pas",
                                   color=VERT_OK, font_size=34)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_dix()
        self.ecran_cent()
        self.ecran_six_cents()
        self.ecran_loi()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
