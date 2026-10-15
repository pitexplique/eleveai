# prop_pourcentages.py
# EleveAI — Maths 4e — Tout comprendre sur les pourcentages
# (notionId : prop_pourcentages), AVEC VOIX.
# Mêmes exemples que la fiche lib/fiches/maths-4e-pourcentages.tsx (02/10) :
# 80 € en dix cases, 10 % de 45 € = 4,50 €, la forêt et ses chênes, le sweat
# à − 20 %, le potager 40 → 46 kg, et le piège + 20 % / − 20 %.
# Voix validée par Frédéric le 03/10 : manim/voix/4e-prop-pourcentages.json
# (débit −7). Accroche : la console −20 % puis +20 % → 288 € (le jean −30 %
# est déjà l'accroche de la vidéo « Les bases » du calcul mental).
#
# ⭐ 03/10, Frédéric : « un maxi d'images visuelles et la voix avec
# l'affichage ». Chaque écran a son DESSIN (grille de 100 cases, ballons,
# barre de dix cases, forêt de 400 arbres, barres à l'échelle, flèches de
# coefficient), et chaque nombre dit est écrit quand il est dit (`au_mot`).
# Objectifs en UNE phrase (~9 s).
#
# Mapping micro-compétences (coach 4e, notion prop_pourcentages) → écrans :
# - prop_pourcentage          → 01-definition (100 cases, 40 % de 20 tirs), 04-taux (15 %)
# - prop_pourcentage_mental   → 02-dix (80 € ; 45 € → 4,50 €), 03-autres (20/30/5/100/200 %)
# - prop_coeff_multiplicateur → 05-coefficient (× 0,8 ; × 1,2)
# - prop_evolution            → 06-evolution (40 → 46 kg, + 15 %)
# - prop_pourcentage_defi     → 07-piege (300 → 240 → 288), 08-defi + correction (200 → 220 → 198)
#
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/prop_pourcentages.py PropPourcentages4e -o eleveai-maths-4e-prop-pourcentages --media_dir manim/scripts/4e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_sixieme import Notion6e

BLEU_P = "#3B82F6"
VERT_P = "#22C55E"
ROUGE_P = "#EF4444"
ORANGE_P = "#F59E0B"
GRIS_P = "#475569"

OBJECTIFS = [
    "Calculer un pourcentage de tête",
    "Utiliser le coefficient multiplicateur",
    "Déjouer le piège des évolutions",
]


class Notion4e(Notion6e):
    identite = "Maths 4e — EleveAI"


class PropPourcentages4e(Notion4e):
    nom_voix = "4e-prop-pourcentages"

    # ── les dessins ─────────────────────────────────────────────────────────

    def txt(self, texte, font_size=34, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def gauche(self, mob, x, y):
        """Pose `mob` avec son bord GAUCHE en x."""
        return mob.move_to([0, y, 0]).align_to(np.array([x, 0, 0]), LEFT)

    def barrer(self, mob):
        return Cross(mob, stroke_color=ROUGE_ERREUR, stroke_width=6, scale_factor=0.9)

    def cases(self, n, couleur, cw=0.5, h=0.55, textes=None, font_size=22, couleur_texte=BLACK):
        """Une rangée de cases égales. Chaque case est VGroup(cadre, nombre) :
        le nombre n'est PAS un enfant du rectangle (sinon `set_fill` le recolore)."""
        g = VGroup()
        for i in range(n):
            r = Rectangle(width=cw, height=h, stroke_width=2.5, stroke_color=WHITE)
            r.set_fill(couleur, opacity=0.95)
            g.add(VGroup(r))
        g.arrange(RIGHT, buff=0)
        if textes:
            for c, t in zip(g, textes):
                c.add(Text(t, font_size=font_size, color=couleur_texte, weight=BOLD).move_to(c[0]))
        return g

    def grille100(self, cote=0.27):
        g = VGroup(*[Square(side_length=cote, stroke_width=1.2, color=GREY_B).set_fill(GREY_E, opacity=0.6)
                     for _ in range(100)])
        g.arrange_in_grid(rows=10, cols=10, buff=0)
        return g

    def etiquette(self, texte, couleur, font_size=34):
        """Une étiquette de prix : un rectangle arrondi et son texte."""
        t = Text(texte, font_size=font_size, color=BLACK, weight=BOLD)
        fond = RoundedRectangle(width=t.width + 0.4, height=t.height + 0.3, corner_radius=0.12,
                                stroke_width=0).set_fill(couleur, opacity=1)
        return VGroup(fond, t.move_to(fond))

    def console(self):
        corps = RoundedRectangle(width=2.6, height=1.3, corner_radius=0.45, stroke_width=3,
                                 color=WHITE).set_fill(GREY_D, opacity=1)
        croix_h = Rectangle(width=0.5, height=0.14, stroke_width=0).set_fill(WHITE, opacity=1)
        croix_v = Rectangle(width=0.14, height=0.5, stroke_width=0).set_fill(WHITE, opacity=1)
        croix = VGroup(croix_h, croix_v).move_to(corps.get_center() + LEFT * 0.7)
        b1 = Circle(radius=0.11, stroke_width=0).set_fill(ROUGE_P, opacity=1).move_to(corps.get_center() + RIGHT * 0.55 + UP * 0.15)
        b2 = Circle(radius=0.11, stroke_width=0).set_fill(VERT_P, opacity=1).move_to(corps.get_center() + RIGHT * 0.85 + DOWN * 0.12)
        return VGroup(corps, croix, b1, b2)

    def fleche_coef(self, depart, coef, arrivee, couleur, y, x0=-5.6, font_size=36):
        """[départ] —× coef→ [arrivée] : la multiplication par le coefficient, dessinée."""
        a = self.etiquette(depart, GREY_B, font_size)
        b = self.etiquette(arrivee, couleur, font_size)
        self.gauche(a, x0, y)
        fl = Arrow([a.get_right()[0] + 0.15, y, 0], [a.get_right()[0] + 2.6, y, 0], buff=0, color=couleur, stroke_width=6)
        lab = Text(coef, font_size=32, color=couleur).next_to(fl, UP, buff=0.1)
        b.next_to(fl, RIGHT, buff=0.15)
        return a, fl, lab, b

    def chaine(self, valeurs, coefs, couleurs, y0=1.6, ech=0.016, x0=-5.4, pas=1.15):
        """Des barres À L'ÉCHELLE (une par valeur), et le coefficient entre deux."""
        barres, labels, fleches = VGroup(), VGroup(), VGroup()
        for i, (v, c) in enumerate(zip(valeurs, couleurs)):
            y = y0 - pas * i
            b = Rectangle(width=v * ech, height=0.55, stroke_width=2, color=WHITE).set_fill(c, opacity=0.9)
            self.gauche(b, x0, y)
            barres.add(b)
            # Les prix tous alignés APRÈS la plus longue barre : la ligne
            # pointillée du départ ne les traverse pas.
            lab = Text(f"{v} €", font_size=34, color=c)
            labels.add(self.gauche(lab, x0 + max(valeurs) * ech + 0.3, y))
        for i, k in enumerate(coefs):
            y = y0 - pas * (i + 0.5)
            fleches.add(Text(k, font_size=28, color=JAUNE_TITRE).move_to([x0 - 0.75, y, 0]))
        return barres, labels, fleches

    # ── 00 : la page de garde, parlée (la console) ──────────────────────────

    def page_de_garde(self, titre, accroche, promesse, voix="00-garde"):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire(voix)
        t = Text(titre, font_size=52, color=JAUNE_TITRE).to_edge(UP, buff=0.6)
        if t.width > config.frame_width - 1.4:
            t.scale_to_fit_width(config.frame_width - 1.4)
        identite = Text(self.identite, font_size=28).next_to(t, DOWN, buff=0.25)
        self.play(Write(t), FadeIn(identite, shift=DOWN * 0.2))
        l1 = Text("Les maths, ça sert à rien… sauf à ne pas se faire avoir pendant les soldes.",
                  font_size=26, color=BLEU_CALCUL)
        if l1.width > 11.5:
            l1.scale_to_fit_width(11.5)
        l1.move_to([-0.4, 1.6, 0])
        self.play(FadeIn(l1, shift=UP * 0.15))

        self.au_mot("Une console à 300")
        c = self.console().move_to([-4.2, -0.2, 0])
        prix = self.etiquette("300 €", WHITE, 40).next_to(c, DOWN, buff=0.3)
        self.play(FadeIn(c, shift=UP * 0.2), FadeIn(prix))
        self.au_mot("moins 20 %")
        e1 = self.etiquette("− 20 %", ROUGE_P, 40).move_to([-1.0, 0.4, 0])
        self.play(GrowFromCenter(e1))
        self.au_mot("remonte de 20 %")
        e2 = self.etiquette("+ 20 %", VERT_P, 40).move_to([-1.0, -0.6, 0])
        self.play(GrowFromCenter(e2))
        self.au_mot("Elle revient à 300")
        q = Text("300 € ?", font_size=56).move_to([2.2, 0.0, 0])
        self.play(Write(q))
        self.au_mot("Non : 288")
        self.play(Create(self.barrer(q)))
        r = Text("288 €", font_size=72, color=VERT_OK).move_to([2.2, -1.25, 0])
        self.play(GrowFromCenter(r))
        self.au_mot("tu sauras pourquoi")
        self.play(Write(self.chute("Pourquoi ? Réponse dans la vidéo !", color=JAUNE_TITRE)))
        self.attendre_voix()

    # ── 01 : tant sur cent ──────────────────────────────────────────────────

    def ecran_definition(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-definition")
        self.titre_ecran("Un pourcentage : tant sur cent")

        g = self.grille100().move_to([-4.3, 0.3, 0])
        self.play(FadeIn(g))
        self.au_mot("30 %, c'est 30 cases")
        self.play(LaggedStart(*[g[i].animate.set_fill(BLEU_P, opacity=1) for i in range(30)], lag_ratio=0.03))
        l = Text("30 % = 30 cases sur 100", font_size=28, color=BLEU_P).next_to(g, DOWN, buff=0.3)
        self.play(FadeIn(l))

        self.au_mot("je multiplie par le pourcentage")
        f = Text("p % de N = N × p ÷ 100", font_size=34, color=JAUNE_TITRE)
        self.gauche(f, -1.6, 2.2)
        self.play(Write(f))

        self.au_mot("Une joueuse de basket")
        ballons = VGroup(*[Circle(radius=0.17, stroke_width=2, color=WHITE).set_fill(ORANGE_P, opacity=1)
                           for _ in range(20)]).arrange_in_grid(rows=2, cols=10, buff=0.12)
        self.gauche(ballons, -1.6, 1.15)
        lt = Text("20 tirs, 40 % réussis", font_size=30).next_to(ballons, DOWN, buff=0.3)
        lt.align_to(ballons, LEFT)
        self.play(LaggedStart(*[FadeIn(b, scale=0.5) for b in ballons], lag_ratio=0.05), FadeIn(lt))
        self.au_mot("20 fois 40")
        calc = Text("20 × 40 ÷ 100 = 8", font_size=40, color=BLEU_CALCUL)
        self.gauche(calc, -1.6, -0.75)
        self.play(Write(calc))
        self.au_mot("8 tirs réussis")
        self.play(LaggedStart(*[ballons[i].animate.set_fill(VERT_OK, opacity=1) for i in range(8)], lag_ratio=0.1))
        self.play(Write(self.chute("8 tirs réussis sur 20", color=VERT_OK)))
        self.attendre_voix()

    # ── 02 : tout part de 10 % ──────────────────────────────────────────────

    def ecran_dix(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-dix")
        self.titre_ecran("De tête : tout part de 10 %")

        tot = Text("80 €", font_size=34).move_to([-3.6, 2.25, 0])
        b = self.cases(10, "#1E293B", cw=0.5, h=0.6, textes=["8"] * 10, font_size=24, couleur_texte=WHITE).move_to([-3.6, 1.55, 0])
        self.play(FadeIn(tot), FadeIn(b))
        self.au_mot("on divise par 10")
        self.play(b[0][0].animate.set_fill(BLEU_P, opacity=1))
        r10 = Text("10 % = ÷ 10", font_size=40, color=BLEU_P).move_to([2.6, 1.6, 0])
        self.play(Write(r10))

        self.au_mot("10 % de 80 euros")
        q1 = Text("10 % de 80 €", font_size=36).move_to([-3.6, 0.1, 0])
        n80 = Text("80", font_size=80).move_to([-4.1, -1.15, 0])
        self.play(FadeIn(q1), FadeIn(n80))
        self.au_mot("on l'enlève")
        self.play(n80[1].animate.set_color(ROUGE_ERREUR))
        self.play(FadeOut(n80[1], shift=DOWN * 0.4))
        self.au_mot("8 euros")
        r1 = Text("= 8 €", font_size=60, color=VERT_OK).next_to(n80[0], RIGHT, buff=0.5)
        self.play(Write(r1))

        self.au_mot("10 % de 45 euros")
        q2 = Text("10 % de 45 €", font_size=36).move_to([2.4, 0.1, 0])
        a = Text("45,0", font_size=72).move_to([1.6, -1.15, 0])
        self.play(FadeIn(q2), FadeIn(a))
        self.au_mot("on décale la virgule")
        bb = Text("4,50", font_size=72, color=VERT_OK).move_to([1.6, -1.15, 0])
        fl = CurvedArrow(a.get_top() + RIGHT * 0.15 + UP * 0.1, a.get_top() + LEFT * 0.35 + UP * 0.1,
                         angle=TAU / 4, color=JAUNE_TITRE)
        self.play(Create(fl))
        self.play(TransformMatchingShapes(a, bb))
        self.au_mot("4 euros 50")
        self.play(Write(Text("€", font_size=72, color=VERT_OK).next_to(bb, RIGHT, buff=0.2)))
        self.attendre_voix()

    # ── 03 : tous les autres, à partir de 10 % ──────────────────────────────

    def ecran_autres(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-autres")
        self.titre_ecran("Avec 10 %, on a tous les autres")

        tot = Text("80 €", font_size=30).move_to([-3.6, 2.45, 0])
        b = self.cases(10, "#1E293B", cw=0.5, h=0.6, textes=["8"] * 10, font_size=24, couleur_texte=WHITE).move_to([-3.6, 1.85, 0])
        self.play(FadeIn(tot), FadeIn(b))

        lignes = [
            ("10 %, c'est 8", "10 %  →  8 €", 1, BLEU_P),
            ("20 %, c'est le double", "20 %  →  2 × 8 = 16 €", 2, BLEU_P),
            ("30 %, le triple", "30 %  →  3 × 8 = 24 €", 3, BLEU_P),
            ("5 %, la moitié", "5 %  →  8 ÷ 2 = 4 €", 0.5, ORANGE_P),
            ("100 %, c'est le tout", "100 %  →  80 €", 10, VERT_P),
            ("200 %, le double du tout", "200 %  →  2 × 80 = 160 €", 20, VERT_OK),
        ]
        cadre = None
        bis = None
        for i, (mot, texte, k, c) in enumerate(lignes):
            self.au_mot(mot)
            t = Text(texte, font_size=30, color=c)
            self.gauche(t, -6.1, 0.95 - 0.55 * i)
            # le cadre jaune entoure les cases prises (la moitié d'une case pour 5 %)
            largeur = min(k, 10) * 0.5
            nouveau = Rectangle(width=largeur, height=0.72, stroke_width=5, color=JAUNE_TITRE)
            self.gauche(nouveau, b.get_left()[0], b.get_y())
            anims = [Write(t)]
            anims.append(Create(nouveau) if cadre is None else Transform(cadre, nouveau))
            if k == 20:
                bis = b.copy().next_to(b, RIGHT, buff=0.12)
                anims.append(FadeIn(bis, shift=LEFT * 0.4))
            self.play(*anims)
            if cadre is None:
                cadre = nouveau
        self.attendre_voix()

    # ── 04 : retrouver le pourcentage ───────────────────────────────────────

    def ecran_taux(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-taux")
        self.titre_ecran("Retrouver le pourcentage")

        # la forêt : 400 arbres en 20 × 20, les 60 chênes en orange
        arbres = VGroup(*[Triangle(stroke_width=0).set_fill(VERT_P, opacity=1).scale(0.075) for _ in range(400)])
        arbres.arrange_in_grid(rows=20, cols=20, buff=0.06).move_to([-4.0, 0.0, 0])
        self.au_mot("400 arbres")
        self.play(FadeIn(arbres))
        l400 = Text("400 arbres", font_size=28, color=VERT_P).next_to(arbres, DOWN, buff=0.25)
        self.play(FadeIn(l400))
        self.au_mot("60 chênes")
        self.play(*[arbres[i].animate.set_fill(ORANGE_P, opacity=1) for i in range(60)])
        l60 = Text("60 chênes", font_size=28, color=ORANGE_P).next_to(arbres, UP, buff=0.2)
        self.play(FadeIn(l60))

        self.au_mot("Je divise la partie par le total")
        fr = VGroup(self.fraction(60, 400, font_size=46, color_num=ORANGE_P, color_den=VERT_P))
        self.gauche(fr, -0.8, 0.9)
        self.play(Write(fr))
        self.au_mot("Puis je multiplie par 100")
        reste = Text("× 100 = 15 %", font_size=46, color=BLEU_CALCUL).next_to(fr, RIGHT, buff=0.3)
        self.play(Write(reste))
        self.au_mot("Les chênes font 15 %")
        self.play(Write(self.chute("Les chênes font 15 % de la forêt", color=VERT_OK)))
        self.attendre_voix()

    # ── 05 : le coefficient multiplicateur ──────────────────────────────────

    def ecran_coefficient(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-coefficient")
        self.titre_ecran("Le coefficient multiplicateur")

        sweat = self.etiquette("Sweat : 45 €", WHITE, 34).move_to([-4.0, 2.2, 0])
        solde = self.etiquette("− 20 %", ROUGE_P, 34).next_to(sweat, RIGHT, buff=0.3)
        self.play(FadeIn(sweat), GrowFromCenter(solde))

        self.au_mot("Il reste 80 %")
        reste = Rectangle(width=4.0, height=0.55, stroke_width=2, color=WHITE).set_fill(BLEU_P, opacity=0.9)
        perdu = Rectangle(width=1.0, height=0.55, stroke_width=2, color=WHITE).set_fill(ROUGE_P, opacity=0.5)
        barre = VGroup(reste, perdu).arrange(RIGHT, buff=0)
        self.gauche(barre, -6.1, 1.25)
        lr = Text("80 % restent", font_size=24, color=BLACK, weight=BOLD).move_to(reste)
        lp = Text("− 20 %", font_size=17, color=WHITE).move_to(perdu)
        self.play(FadeIn(barre), FadeIn(lr), FadeIn(lp))
        self.au_mot("80 %, c'est 0 virgule 8")
        k = Text("80 % = 0,8", font_size=40, color=BLEU_P).move_to([2.6, 1.25, 0])
        self.play(Write(k))

        self.au_mot("Une seule multiplication")
        a, fl, lab, b = self.fleche_coef("45 €", "× 0,8", "36 €", VERT_OK, y=0.1)
        self.play(FadeIn(a))
        self.play(GrowArrow(fl), Write(lab))
        self.au_mot("36 euros")
        self.play(GrowFromCenter(b))

        self.au_mot("pour une hausse de 20 %")
        h = Text("hausse de 20 % :  100 % + 20 % = 120 %", font_size=30)
        self.gauche(h, -6.1, -1.05)
        self.play(Write(h))
        self.au_mot("c'est fois 1 virgule 2")
        k2 = Text("= × 1,2", font_size=34, color=VERT_OK).next_to(h, RIGHT, buff=0.3)
        self.play(Write(k2))
        self.au_mot("c'est le coefficient multiplicateur")
        self.play(Write(self.chute("× 0,8 ou × 1,2 : le coefficient multiplicateur", color=JAUNE_TITRE)))
        self.attendre_voix()

    # ── 06 : l'évolution ────────────────────────────────────────────────────

    def ecran_evolution(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-evolution")
        self.titre_ecran("Le pourcentage d'évolution")

        ech = 0.11
        b40 = Rectangle(width=40 * ech, height=0.6, stroke_width=2, color=WHITE).set_fill(ROUGE_P, opacity=0.85)
        self.gauche(b40, -6.0, 1.9)
        l40 = Text("40 kg", font_size=32, color=ROUGE_P).next_to(b40, RIGHT, buff=0.25)
        an1 = Text("l'année 1", font_size=22, color=GREY_B).next_to(b40, UP, buff=0.08).align_to(b40, LEFT)
        self.play(FadeIn(b40), FadeIn(l40), FadeIn(an1))
        self.au_mot("puis 46 kilos")
        b46 = Rectangle(width=46 * ech, height=0.6, stroke_width=2, color=WHITE).set_fill(ROUGE_P, opacity=0.85)
        self.gauche(b46, -6.0, 0.95)
        l46 = Text("46 kg", font_size=32, color=ROUGE_P).next_to(b46, RIGHT, buff=0.25)
        an2 = Text("l'année 2", font_size=22, color=GREY_B).next_to(b46, UP, buff=0.08).align_to(b46, LEFT)
        self.play(FadeIn(b46), FadeIn(l46), FadeIn(an2))

        self.au_mot("Elle a gagné 6 kilos")
        gain = Rectangle(width=6 * ech, height=0.6, stroke_width=0).set_fill(VERT_OK, opacity=0.9)
        self.gauche(gain, -6.0 + 40 * ech, 0.95)
        lg = Text("+ 6 kg", font_size=30, color=VERT_OK).next_to(gain, DOWN, buff=0.15)
        self.play(FadeIn(gain), FadeIn(lg))

        self.au_mot("Je divise par la récolte de départ")
        fr = self.fraction(6, 40, font_size=44, color_num=VERT_OK, color_den=ROUGE_P)
        self.gauche(fr, -6.0, -1.0)
        suite = Text("× 100", font_size=42).next_to(fr, RIGHT, buff=0.3)
        self.play(Write(fr), Write(suite))
        self.play(Indicate(b40, color=JAUNE_TITRE))
        self.au_mot("15 %")
        r = Text("= + 15 %", font_size=48, color=VERT_OK).next_to(suite, RIGHT, buff=0.3)
        self.play(Write(r))
        self.au_mot("Attention")
        self.play(Write(self.chute("On divise toujours par la valeur de DÉPART", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── 07 : le piège + / − 20 % ────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-piege")
        self.titre_ecran("Le piège : − 20 % puis + 20 %")

        barres, labels, fleches = self.chaine([300, 240, 288], ["× 0,8", "× 1,2"], [GREY_B, ROUGE_P, VERT_P])
        ref = DashedLine([barres[0].get_right()[0], 2.0, 0], [barres[0].get_right()[0], -0.95, 0],
                         color=GREY_B, stroke_width=2)
        self.play(FadeIn(barres[0]), FadeIn(labels[0]), Create(ref))
        self.au_mot("Moins 20 %")
        self.play(FadeIn(fleches[0]))
        self.au_mot("240 euros")
        self.play(GrowFromEdge(barres[1], LEFT), FadeIn(labels[1]))
        self.au_mot("Mais 20 % de 240")
        cle = Text("20 % de 240 = 48, pas 60 !", font_size=32, color=JAUNE_TITRE).move_to([-1.2, -1.75, 0])
        cadre = SurroundingRectangle(cle, color=JAUNE_TITRE, buff=0.15)
        self.play(Write(cle), Create(cadre))
        self.au_mot("240 fois 1 virgule 2")
        self.play(FadeIn(fleches[1]))
        self.play(GrowFromEdge(barres[2], LEFT), FadeIn(labels[2]))
        self.au_mot("288 euros")
        self.play(Circumscribe(labels[2], color=VERT_OK))
        self.au_mot("ne s'annulent pas")
        self.play(Write(self.chute("Les deux 20 % ne portent pas sur le même prix", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── 08 : défi et correction ─────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        self.titre_ecran("Défi", font_size=48)
        v = self.etiquette("Vélo : 200 €", WHITE, 48).move_to([-0.5, 1.6, 0])
        self.play(FadeIn(v, shift=DOWN * 0.2))
        self.au_mot("augmente de 10 %")
        e1 = self.etiquette("+ 10 %", VERT_P, 44).move_to([-2.9, 0.3, 0])
        self.play(GrowFromCenter(e1))
        self.au_mot("puis baisse de 10 %")
        e2 = self.etiquette("puis − 10 %", ROUGE_P, 44).move_to([1.3, 0.3, 0])
        self.play(GrowFromCenter(e2))
        self.au_mot("Quel est son prix final")
        self.play(Write(Text("Prix final ?", font_size=50, color=JAUNE_TITRE).move_to([-0.5, -1.0, 0])))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=38)))
        self.attendre_voix(marge=3.5)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("08b-correction")
        self.titre_ecran("Correction")
        barres, labels, fleches = self.chaine([200, 220, 198], ["× 1,1", "× 0,9"], [GREY_B, VERT_P, ROUGE_P], ech=0.02)
        ref = DashedLine([barres[0].get_right()[0], 2.0, 0], [barres[0].get_right()[0], -0.95, 0],
                         color=GREY_B, stroke_width=2)
        self.play(FadeIn(barres[0]), FadeIn(labels[0]), Create(ref))
        self.au_mot("200 fois 1 virgule 1")
        self.play(FadeIn(fleches[0]), GrowFromEdge(barres[1], LEFT), FadeIn(labels[1]))
        self.au_mot("220 fois 0 virgule 9")
        self.play(FadeIn(fleches[1]), GrowFromEdge(barres[2], LEFT), FadeIn(labels[2]))
        self.au_mot("Le vélo coûte 198")
        self.play(Circumscribe(labels[2], color=VERT_OK))
        self.au_mot("2 euros de moins")
        self.play(Write(self.chute("198 € : 2 € de moins qu'au départ", color=VERT_OK)))
        self.attendre_voix()

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde(
            titre="Tout comprendre sur les pourcentages",
            accroche="", promesse="",
        )
        self.page_objectifs(OBJECTIFS)
        self.ecran_definition()
        self.ecran_dix()
        self.ecran_autres()
        self.ecran_taux()
        self.ecran_coefficient()
        self.ecran_evolution()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "De tête, tout part de 10 %",
                "Hausse ou baisse : × le coefficient",
                "Deux évolutions ne s'annulent pas",
            ],
            rappel="La deuxième évolution porte sur le NOUVEAU prix.",
            voix="09-finale",
        )
        self.page_abonnement(voix="10-abonne")
