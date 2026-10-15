# annonce_probabilites_short.py
# EleveAI — short 9:16 de la BANDE-ANNONCE « Probabilités, du CP à la terminale ».
# Il AMUSE, il n'enseigne pas. CEINTURE BLANCHE. Même concept que la paysage
# (annonce_probabilites.py, dont il reprend les dessins) : les probabilités qui
# grandissent avec l'élève, puis la question du vote.
#
# Mise en page (cadre 4,5 × 8) :
#   · en haut, le titre « Les probabilités » et l'échelle des ceintures ;
#   · la ZONE IMAGE, qui change à chaque étape : le sac (école), le dé et
#     l'histogramme des 600 lancers (collège, vrai tirage graine 1758), l'arbre
#     (lycée) ;
#   · en bas, EN MÊME TEMPS, un ESCALIER « CP · école → collège → lycée →
#     terminale » dont la marche s'allume quand la voix la nomme, et une bille
#     qui saute de marche en marche ;
#   · 04 : « plus de 300 vidéos », puis le questionnaire des classes dont les
#     cases CLIGNOTENT sans rester cochées (c'est au spectateur de choisir).
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/annonce-probabilites-short.json (Julie, débit −7).
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/annonce/annonce_probabilites_short.py ShortAnnonceProbabilites -o eleveai-annonce-probabilites-short --media_dir manim/scripts/annonce/media
# Puis copier le mp4 dans manim/sorties/annonce/probabilites/.

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from annonce_probabilites import (  # noqa: E402  (pose les chemins)
    BILLE_BLEUE, BILLE_ROUGE, GRIS_ETEINT, P, TIRAGES, bille, comptes, de, de_qui_roule, sac_vide,
)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1

# l'escalier du bas : (nom, couleur), de bas en haut
MARCHES = [("CP · école", VERT_OK), ("collège", BLEU_CALCUL),
           ("lycée", VIOLET_ACCENT), ("terminale", ORANGE_RETENUE)]
Y_MARCHES = [-2.6, -2.17, -1.74, -1.31]
X_MARCHES = [-0.45, -0.1, 0.25, 0.6]
L_MARCHE, H_MARCHE = 2.4, 0.36


def piece_muette(centre, r=0.42):
    """Une pièce qui tourne, SANS lettres (pas de PILE/FACE écrasés en tournant)."""
    etat = {"t": 0.0}

    def faire(t):
        c = math.cos(t * 5)
        disque = Circle(radius=r, fill_color=JAUNE_TITRE if c >= 0 else ORANGE_RETENUE, fill_opacity=1,
                        stroke_color=WHITE, stroke_width=3)
        anneau = Circle(radius=r * 0.7, stroke_color=WHITE, stroke_width=2, stroke_opacity=0.7)
        g = VGroup(disque, anneau)
        g.stretch(max(abs(c), 0.06), 0)
        return g.move_to(centre + UP * 0.18 * abs(math.sin(t * 2.5)))

    holder = VGroup(faire(0))

    def maj(m, dt):
        etat["t"] += dt
        m.remove(*m.submobjects)
        m.add(faire(etat["t"]))

    holder.add_updater(maj)
    return holder


class ShortAnnonceProbabilites(Short6e):
    nom_voix = "annonce-probabilites-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def ligne(self, morceaux, font_size=30, buff=0.16):
        g = VGroup(*[Text(m, font_size=font_size, color=c) for m, c in morceaux]).arrange(RIGHT, buff=buff)
        if g.width > LARGEUR_MAX:
            g.scale_to_fit_width(LARGEUR_MAX)
        return g

    def fraction(self, num, den, font_size=34, color=WHITE):
        n = Text(str(num), font_size=font_size, color=color)
        d = Text(str(den), font_size=font_size, color=color)
        larg = max(n.width, d.width) + 0.14
        barre = Line(LEFT * larg / 2, RIGHT * larg / 2, color=color, stroke_width=3.5)
        return VGroup(n, barre, d).arrange(DOWN, buff=0.08)

    def insister(self, mob, k=1.35, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    # ── l'escalier ──────────────────────────────────────────────────────────

    def escalier(self):
        g = VGroup()
        for (nom, c), x, y in zip(MARCHES, X_MARCHES, Y_MARCHES):
            r = RoundedRectangle(width=L_MARCHE, height=H_MARCHE, corner_radius=0.08,
                                 fill_color=c, fill_opacity=0.12, stroke_color=c, stroke_width=2,
                                 stroke_opacity=0.5).move_to(P(x, y))
            lbl = self.t(nom, 22, GRIS_ETEINT).move_to(r)
            g.add(VGroup(r, lbl))
        return g

    def place_bille(self, i):
        """Où se pose la bille : à gauche de la marche i."""
        return P(X_MARCHES[i] - L_MARCHE / 2 - 0.2, Y_MARCHES[i])

    def allumer(self, i, sauts=True):
        """La marche i s'allume (et grossit un instant) ; la bille y saute."""
        r, lbl = self.marches[i]
        c = MARCHES[i][1]
        anims = [r.animate.set_fill(c, 0.75).set_stroke(c, 3, 1), lbl.animate.set_color(WHITE)]
        if sauts:
            arc = ArcBetweenPoints(self.grimpeur.get_center(), self.place_bille(i), angle=-PI / 2)
            anims.append(MoveAlongPath(self.grimpeur, arc))
        self.play(*anims, run_time=0.4)
        self.insister(self.marches[i], 1.15, 0.2)

    def devise(self, texte, couleur):
        """« on joue ! », « on mesure ! », « on prévoit ! » : la phrase de la voix,
        en grand dans la zone image, le temps que le dessin arrive."""
        d = self.grand(texte, font_size=40, color=couleur, marge=1.0).move_to(P(0, 1.2))
        self.play(FadeIn(d, scale=0.6), run_time=0.3)
        self.insister(d, 1.15, 0.2)
        return d

    def eteindre_tout(self):
        anims = []
        for (r, lbl), (_, c) in zip(self.marches, MARCHES):
            anims += [r.animate.set_fill(c, 0.12).set_stroke(c, 2, 0.5), lbl.animate.set_color(GRIS_ETEINT)]
        return anims

    # ── 00 : l'accroche ─────────────────────────────────────────────────────

    def accroche(self):
        self.dire("00-accroche")
        titre = self.grand("Les probabilités", font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("blanche").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.72))
        self.titre, self.badge = titre, badge

        piece = piece_muette(P(-1.45, 1.35))
        d = de_qui_roule(P(0.0, 1.35), 0.85)
        sac = sac_vide(1.0, 1.0).move_to(P(1.45, 1.25))
        billes = VGroup(*[bille(c, 0.13) for c in [BILLE_ROUGE, BILLE_ROUGE, BILLE_BLEUE, BILLE_ROUGE]])
        bases = [P(1.22, 0.98), P(1.5, 0.95), P(1.75, 1.0), P(1.38, 1.22)]
        for b, p in zip(billes, bases):
            b.move_to(p)
        horloge = {"t": 0.0}

        def secoue(g, dt):
            horloge["t"] += dt
            tt = horloge["t"]
            for k, (b, p) in enumerate(zip(g, bases)):
                b.move_to(p + P(0.06 * math.sin(tt * 6 + k * 1.7), 0.08 * abs(math.sin(tt * 5 + k * 2.3))))

        billes.add_updater(secoue)
        self.marches = self.escalier()
        self.grimpeur = bille(JAUNE_TITRE, 0.13).move_to(self.place_bille(0) + UP * 1.5).set_opacity(0)

        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), run_time=0.8)
        self.add(piece, d)
        self.play(FadeIn(sac), FadeIn(billes),
                  LaggedStart(*[FadeIn(m, shift=UP * 0.2) for m in self.marches], lag_ratio=0.2), run_time=0.8)

        self.au_mot("du CP")
        self.add(self.grimpeur)
        self.play(self.grimpeur.animate.set_opacity(1).move_to(self.place_bille(0)), run_time=0.3,
                  rate_func=rate_functions.ease_in_quad)
        self.allumer(0, sauts=False)
        self.au_mot("à la terminale")
        for i in (1, 2, 3):
            arc = ArcBetweenPoints(self.grimpeur.get_center(), self.place_bille(i), angle=-PI / 2)
            r, lbl = self.marches[i]
            c = MARCHES[i][1]
            self.play(MoveAlongPath(self.grimpeur, arc), r.animate.set_fill(c, 0.75).set_stroke(c, 3, 1),
                      lbl.animate.set_color(WHITE), run_time=0.22)
        self.insister(self.marches[3], 1.15, 0.2)

        self.au_mot("Et toi")
        q = self.grand("Et toi, tu commences où ?", font_size=30, color=BLEU_CALCUL).move_to(P(0, 0.1))
        self.play(FadeIn(q, scale=0.8), *self.eteindre_tout(),
                  self.grimpeur.animate.move_to(self.place_bille(0)), run_time=0.6)
        self.insister(q, 1.15, 0.25)
        self.attendre_voix(marge=0.2)
        for m in (piece, d, billes):
            m.clear_updaters()
        self.play(FadeOut(VGroup(piece, d, sac, billes, q), shift=UP * 0.3), run_time=0.35)

    # ── 01 : l'école ────────────────────────────────────────────────────────

    def ecole(self):
        self.dire("01-ecole")
        self.au_mot("À l'école")
        self.allumer(0)
        dev = self.devise("on joue !", VERT_OK)
        sac = sac_vide(1.5, 1.45).move_to(P(-1.05, 0.95))
        cibles = [P(-1.45, 0.55), P(-1.0, 0.5), P(-1.25, 0.95), P(-0.6, 0.65)]
        rouges = VGroup(*[bille(BILLE_ROUGE, 0.19).move_to(c + UP * 2.6) for c in cibles[:3]])
        bleue = bille(BILLE_BLEUE, 0.19).move_to(cibles[3] + UP * 2.6)

        self.au_mot("3 billes rouges")
        self.play(FadeOut(dev, shift=UP * 0.3), FadeIn(sac, scale=0.8), run_time=0.3)
        t1 = self.ligne([("3", JAUNE_TITRE), ("rouges", BILLE_ROUGE)], 34).move_to(P(1.1, 1.3))
        self.add(rouges)
        self.play(LaggedStart(*[b.animate.move_to(c) for b, c in zip(rouges, cibles[:3])], lag_ratio=0.25),
                  FadeIn(t1, scale=0.7), run_time=0.7, rate_func=rate_functions.ease_out_bounce)
        self.au_mot("1 bleue")
        t2 = self.ligne([("1", JAUNE_TITRE), ("bleue", BILLE_BLEUE)], 34).move_to(P(1.1, 0.65))
        self.add(bleue)
        self.play(bleue.animate.move_to(cibles[3]), FadeIn(t2, scale=0.7), run_time=0.5,
                  rate_func=rate_functions.ease_out_bounce)

        self.au_mot("tirer une rouge")
        self.play(rouges[2].animate.move_to(P(-1.05, 2.0)).scale(1.3), run_time=0.45)
        mots = VGroup(self.t("certain", 28, GRIS_ETEINT), self.t("possible", 28, GRIS_ETEINT),
                      self.t("impossible", 28, GRIS_ETEINT)).arrange(RIGHT, buff=0.28)
        if mots.width > LARGEUR_MAX:
            mots.scale_to_fit_width(LARGEUR_MAX)
        mots.move_to(P(0, -0.25))
        for extrait, m in zip(["c'est certain", "possible, ou", "impossible ?"], mots):
            self.au_mot(extrait)
            self.play(FadeIn(m, shift=UP * 0.15), m.animate.set_color(WHITE), run_time=0.3)
        self.wait(0.2)
        self.play(mots[1].animate.set_color(VERT_OK), mots[0].animate.set_opacity(0.35),
                  mots[2].animate.set_opacity(0.35), run_time=0.35)
        self.insister(mots[1], 1.4, 0.3)
        cadre = SurroundingRectangle(mots[1], color=VERT_OK, buff=0.1)
        self.play(Create(cadre), run_time=0.4)
        self.attendre_voix(marge=0.4)
        self.play(FadeOut(VGroup(sac, rouges, bleue, t1, t2, mots, cadre), shift=UP * 0.3), run_time=0.35)

    # ── 02 : le collège ─────────────────────────────────────────────────────

    def college(self):
        self.dire("02-college")
        self.au_mot("Au collège")
        self.allumer(1)
        dev = self.devise("on mesure !", BLEU_CALCUL)
        y1 = 1.95
        x_de = -1.75
        self.au_mot("Un dé")
        d = de(6, 0.62).move_to(P(x_de, y1))
        self.play(FadeOut(dev, shift=UP * 0.3), SpinInFromNothing(d), run_time=0.4)

        self.au_mot("1 chance sur 6")
        chance = self.t("1 chance sur 6", 26, BLEU_CALCUL, largeur=3.3)
        chance.move_to(P(0, y1)).align_to(P(x_de + 0.45, 0), LEFT)
        egal = self.t("=", 30)
        frac = self.fraction(1, 6, 30, JAUNE_TITRE)
        VGroup(egal, frac).arrange(RIGHT, buff=0.14).move_to(P(chance.get_center()[0], 1.25))
        self.play(Write(chance), run_time=0.55)
        self.play(FadeIn(egal), FadeIn(frac, shift=UP * 0.15), run_time=0.3)
        self.insister(frac, 1.4, 0.25)

        # l'histogramme des 600 lancers (même tirage que la paysage)
        base_y, pas, larg = -0.62, 0.6, 0.44
        x0 = -2.5 * pas
        echelle = 0.8 / 110
        axe = Line(P(x0 - 0.35, base_y), P(-x0 + 0.35, base_y), stroke_width=2)
        faces = VGroup(*[self.t(str(i + 1), 18, JAUNE_TITRE if i == 5 else WHITE)
                         .next_to(P(x0 + i * pas, base_y), DOWN, buff=0.06) for i in range(6)])
        n = ValueTracker(0)

        def barres():
            c = comptes(int(n.get_value()))
            g = VGroup()
            for i in range(6):
                h = max(c[i] * echelle, 0.001)
                g.add(Rectangle(width=larg, height=h, stroke_width=0, fill_opacity=0.9,
                                fill_color=JAUNE_TITRE if i == 5 else BLEU_CALCUL)
                      .move_to(P(x0 + i * pas, base_y + h / 2)))
            return g

        hist = always_redraw(barres)
        compteur = always_redraw(lambda: self.ligne(
            [(str(int(n.get_value())), JAUNE_TITRE), ("lancers", WHITE)], 22).move_to(P(-1.0, 0.55)))

        self.au_mot("600 lancers")
        roule = de_qui_roule(P(x_de, y1), 0.62, periode=0.06, faces=TIRAGES[:60])
        self.remove(d)
        self.add(roule)
        self.play(Create(axe), FadeIn(faces), FadeIn(compteur), run_time=0.25)
        self.add(hist)
        self.play(n.animate.set_value(600), run_time=1.3, rate_func=rate_functions.ease_in_quad)
        roule.clear_updaters()
        self.remove(roule)
        d = de(6, 0.62).move_to(P(x_de, y1))
        self.add(d)
        hist.clear_updaters()
        compteur.clear_updaters()
        self.insister(compteur, 1.2, 0.2)

        self.au_mot("environ 100 six")
        cent = self.ligne([("≈ 100", VERT_OK), ("six", WHITE)], 22).move_to(P(1.15, 0.55))
        fleche = Arrow(cent.get_bottom(), hist[5].get_top() + UP * 0.02, buff=0.08, color=VERT_OK,
                       stroke_width=3, max_tip_length_to_length_ratio=0.25)
        self.play(FadeIn(cent, scale=0.7), GrowArrow(fleche),
                  Indicate(faces[5], color=JAUNE_TITRE, scale_factor=1.6), run_time=0.5)
        self.insister(cent, 1.2, 0.25)
        self.attendre_voix(marge=0.4)
        self.play(FadeOut(VGroup(d, chance, egal, frac, axe, faces, hist, compteur, cent, fleche),
                          shift=UP * 0.3), run_time=0.35)

    # ── 03 : le lycée ───────────────────────────────────────────────────────

    def lycee(self):
        self.dire("03-lycee")
        self.au_mot("Au lycée")
        self.allumer(2)
        dev = self.devise("on prévoit !", VIOLET_ACCENT)

        self.au_mot("un arbre")
        self.play(FadeOut(dev, shift=UP * 0.3), run_time=0.2)
        r = P(-1.6, 1.3)
        n1 = [P(-0.4, 1.9), P(-0.4, 0.7)]
        n2 = [P(1.0, 2.15), P(1.0, 1.65), P(1.0, 0.95), P(1.0, 0.45)]
        rac = Dot(r, radius=0.07)
        b1 = VGroup(*[Line(r, p, stroke_width=4, color=BLEU_CALCUL, buff=0.18) for p in n1])
        l1 = VGroup(*[bille(c, 0.14).move_to(p) for c, p in zip([BILLE_ROUGE, BILLE_BLEUE], n1)])
        b2 = VGroup(*[Line(n1[i // 2], p, stroke_width=4, color=VERT_OK, buff=0.18)
                      for i, p in enumerate(n2)])
        l2 = VGroup(*[bille(c, 0.12).move_to(p)
                      for c, p in zip([BILLE_ROUGE, BILLE_BLEUE, BILLE_ROUGE, BILLE_BLEUE], n2)])
        self.play(FadeIn(rac), Create(b1), run_time=0.35)
        self.play(FadeIn(l1, scale=0.5), run_time=0.2)
        self.play(Create(b2), run_time=0.35)
        self.play(FadeIn(l2, scale=0.5), run_time=0.2)

        self.au_mot("les probabilités conditionnelles")
        c = self.t("probabilités conditionnelles", 26, BLEU_CALCUL).move_to(P(0, -0.05))
        self.play(FadeIn(c, shift=UP * 0.15), run_time=0.4)
        self.au_mot("la loi binomiale")
        lb = self.t("loi binomiale", 32, VERT_OK).move_to(P(0, -0.5))
        self.play(FadeIn(lb, scale=0.7), run_time=0.3)
        self.allumer(3)
        self.insister(lb, 1.3, 0.25)
        self.attendre_voix(marge=0.5)
        self.play(FadeOut(VGroup(rac, b1, l1, b2, l2, c, lb), shift=UP * 0.3),
                  FadeOut(VGroup(self.marches, self.grimpeur), shift=DOWN * 0.3), run_time=0.4)

    # ── 04 : la question ────────────────────────────────────────────────────

    def question(self):
        self.dire("04-question")
        self.au_mot("Plus de 300 vidéos")
        gros = VGroup(Text("plus de", font_size=30), Text("300", font_size=64, color=JAUNE_TITRE),
                      Text("vidéos", font_size=30)).arrange(RIGHT, buff=0.18)
        gros.scale_to_fit_width(LARGEUR_MAX - 0.3).move_to(P(0, 1.95))
        self.play(FadeIn(gros, scale=0.8), run_time=0.4)
        self.insister(gros, 1.12, 0.3)

        self.au_mot("Écris ta classe")
        colonnes = [("école", ["CM1", "CM2"]), ("collège", ["6e", "5e", "4e", "3e"]),
                    ("lycée", ["2de", "1re", "Tle"])]
        couleurs = [VERT_OK, BLEU_CALCUL, VIOLET_ACCENT]
        xs = [-1.85, -0.35, 1.15]
        entetes, cases, mots = VGroup(), [], []
        for (ent, classes), x, coul in zip(colonnes, xs, couleurs):
            entetes.add(self.t(ent, 20, coul).move_to(P(x + 0.35, 1.35)))
            for j, cl in enumerate(classes):
                y = 0.97 - 0.37 * j
                box = Square(0.26, stroke_color=WHITE, stroke_width=3).move_to(P(x, y))
                txt = Text(cl, font_size=24).next_to(box, RIGHT, buff=0.12)
                cases.append(box)
                mots.append(txt)
        self.play(FadeIn(entetes), LaggedStart(*[FadeIn(VGroup(b, m), shift=RIGHT * 0.2)
                                                for b, m in zip(cases, mots)], lag_ratio=0.12), run_time=0.9)

        def vague(run_time=1.1):
            """Chaque case s'allume puis S'ÉTEINT : aucune ne reste cochée."""
            anims = []
            for b, m in zip(cases, mots):
                anims.append(Succession(
                    AnimationGroup(b.animate.set_fill(VERT_OK, 0.6).set_stroke(VERT_OK),
                                   m.animate.set_color(VERT_OK), run_time=0.15),
                    AnimationGroup(b.animate.set_fill(VERT_OK, 0).set_stroke(WHITE),
                                   m.animate.set_color(WHITE), run_time=0.15)))
            self.play(LaggedStart(*anims, lag_ratio=0.25), run_time=run_time)

        vague()
        appel = VGroup(self.grand("Réponds en", font_size=40, color=VERT_OK),
                       self.grand("commentaire !", font_size=40, color=VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -0.97))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        poignee = Text("@eleveai974", font_size=28, color=BLEU_CALCUL).move_to(P(0, -1.9))
        self.play(GrowFromCenter(poignee), run_time=0.35)

        self.au_mot("la plus demandée")
        prem = self.t("la plus demandée passera en premier !", 20, largeur=3.9).move_to(P(0, -2.35))
        self.play(FadeIn(prem, shift=UP * 0.1), run_time=0.35)
        vague(1.0)
        self.attendre_voix(marge=0.3)
        vague(1.0)
        self.wait(0.6)

    def construct(self):
        self.margo_bas()
        self.accroche()
        self.ecole()
        self.college()
        self.lycee()
        self.question()
