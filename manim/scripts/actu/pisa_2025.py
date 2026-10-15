# pisa_2025.py
# EleveAI — PISA 2025 : « Le niveau baisse. Et pourtant 81 % y croient. »
# LA VIDÉO PAYSAGE et ses quatre shorts.
#
# ── POURQUOI CETTE VIDÉO (11/09/2026) ─────────────────────────────────────────
# Les résultats du PISA 2025 sont sortis le 8 septembre, et toute la presse dit
# la même chose : « le niveau dégringole ». Frédéric : « je veux être une voix
# dissonante ». La dissonance qui TIENT est celle que la note pays de l'OCDE
# porte elle-même : ce qui baisse, c'est l'ancien socle ; ce que PISA mesure de
# neuf, la France le tient ; et 81 % des élèves pensent pouvoir progresser —
# le record de l'OCDE.
#
# ⛔ PAS D'ÎLE. 87 % de l'audience est métropolitaine et le sujet est national :
# ni carte, ni « les maths de l'île ». D'où le gabarit « Les bases » (sans
# classe, écran de fin vers le coach) avec l'identité « PISA 2025 · EleveAI ».
#
# ⛔ CHAQUE CHIFFRE A SA SOURCE, et elle est dans la description YouTube :
# « Résultats du PISA 2025 (Volume I) – Note pays : France », OCDE, 8/09/2026 ;
# Rosser et al., Archives of Surgery, 2007 (chirurgiens et jeux vidéo). Une voix
# dissonante signée d'un enseignant ne se permet pas un chiffre de mémoire.
#
# ⭐ LES CHIFFRES DE LA NOTE PAYS (tous relus le 11/09) :
#   maths 458 (OCDE 463) · 2018 : 495 · 2022 : 474 · sous niveau 2 : 24 → 36 %
#   depuis 2015 · niveau 5-6 : 11 → 5 % · écart 10 % haut / 10 % bas inchangé
#   2022→2025 · 39 % dans le quart favorisé mondial, 534 en sciences · 100 points
#   entre quartiles (OCDE 85) · croissance 81 % (OCDE 69, +31 pts) · efforts
#   54 % (60) · planifient 33 % (37) · bruit 47 % (31) · écran en cours −24 pts
#   (−11) · environnement 76 % (74) · curiosité 75 % (73).
#
# Rendu :
#   python -m manim render -qh --disable_caching manim/scripts/actu/pisa_2025.py Pisa2025Longue -o eleveai-maths-actu-pisa-2025 --media_dir manim/scripts/actu/media
#   python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/actu/pisa_2025.py Pisa2025ShortIa -o eleveai-maths-actu-pisa-2025-short-ia --media_dir manim/scripts/actu/media
#   (idem ShortFavorises / ShortEcart / ShortCroire)

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_bases import NotionBases, ShortBases
from gabarit_seconde import SONS

VOIX = SONS / "pisa-2025"
VOIX_IA = SONS / "pisa-2025-short-ia"
VOIX_FAV = SONS / "pisa-2025-short-favorises"
VOIX_ECART = SONS / "pisa-2025-short-ecart"
VOIX_CROIRE = SONS / "pisa-2025-short-croire"


class _Pisa:
    """Les objets que toute la fratrie dessine : deux barres France/OCDE, une
    cloche, un écart entre déciles."""

    def duo(self, fr, ocde, unite="%", largeur=2.4, couleur=BLEU_CALCUL,
            font_size=26, epaisseur=0.4, vmax=None):
        """France au-dessus, OCDE en dessous — la barre suit la valeur."""
        vmax = vmax or max(fr, ocde) * 1.12
        rangs = VGroup()
        for nom, v, coul in (("France", fr, couleur), ("OCDE", ocde, GREY_B)):
            lab = Text(nom, font_size=font_size, color=WHITE)
            barre = Rectangle(width=max(0.06, largeur * v / vmax), height=epaisseur,
                              stroke_width=0, fill_color=coul, fill_opacity=0.9)
            val = Text(f"{v} {unite}".strip(), font_size=font_size + 6, color=coul)
            rangs.add(VGroup(lab, barre, val).arrange(RIGHT, buff=0.16))
        rangs.arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        # les deux barres partent du même x : on aligne sur l'étiquette la plus large
        larg = max(r[0].width for r in rangs)
        for r in rangs:
            r[1].shift(RIGHT * (larg - r[0].width))
            r[2].shift(RIGHT * (larg - r[0].width))
        return rangs

    def cloche(self, centre_x, y_base, largeur=3.2, hauteur=1.4, couleur=BLEU_CALCUL):
        """Une distribution en cloche, tracée point par point — sans LaTeX."""
        pts = []
        for i in range(61):
            t = -1 + 2 * i / 60
            pts.append([centre_x + t * largeur / 2,
                        y_base + hauteur * math.exp(-(t / 0.36) ** 2 / 2), 0])
        c = VMobject(stroke_color=couleur, stroke_width=4)
        c.set_points_smoothly(pts)
        return c

    def crochet(self, x1, x2, y, couleur=WHITE, haut=0.16):
        """Un crochet horizontal entre deux abscisses — dessiné, pas un Brace."""
        return VGroup(
            Line([x1, y, 0], [x2, y, 0], color=couleur, stroke_width=3),
            Line([x1, y, 0], [x1, y - haut, 0], color=couleur, stroke_width=3),
            Line([x2, y, 0], [x2, y - haut, 0], color=couleur, stroke_width=3),
        )


# ══════════════════════════════════════════════════════════════════════════════
#  LA VIDÉO PAYSAGE
# ══════════════════════════════════════════════════════════════════════════════

class Pisa2025Longue(NotionBases, _Pisa):

    dossier_voix = VOIX
    identite = "PISA 2025 · EleveAI"

    # ── écran 1 : le titre, et le chiffre ──────────────────────────────────

    def ecran_titre(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-titre")
        self.titre_ecran("Le titre, et le chiffre")

        # Une règle graduée de 440 à 480, et deux points : la France avec son
        # incertitude, la moyenne OCDE. Le second est DANS la barre du premier.
        x0, x1, y = -5.6, -0.4, 0.4
        axe = Line([x0, y, 0], [x1, y, 0], color=WHITE, stroke_width=2)
        grad = VGroup()
        for s in (440, 450, 460, 470, 480):
            x = x0 + (s - 440) / 40 * (x1 - x0)
            grad.add(Line([x, y - 0.1, 0], [x, y + 0.1, 0], color=WHITE, stroke_width=2),
                     Text(str(s), font_size=20, color=GREY_B).move_to([x, y - 0.42, 0]))
        self.play(Create(axe), FadeIn(grad))

        def xs(s):
            return x0 + (s - 440) / 40 * (x1 - x0)

        barre = Line([xs(453), y + 0.9, 0], [xs(463), y + 0.9, 0], color=ROUGE_ERREUR, stroke_width=6)
        fr = Dot([xs(458), y + 0.9, 0], color=ROUGE_ERREUR, radius=0.11)
        lab_fr = VGroup(Text("France", font_size=24, color=ROUGE_ERREUR),
                        Text("458", font_size=34, color=ROUGE_ERREUR)).arrange(DOWN, buff=0.08)
        lab_fr.next_to(fr, UP, buff=0.22)
        self.play(GrowFromCenter(fr), Create(barre), FadeIn(lab_fr))

        oc = Dot([xs(463), y + 0.9, 0], color=VERT_OK, radius=0.11)
        lab_oc = VGroup(Text("OCDE", font_size=24, color=VERT_OK),
                        Text("463", font_size=34, color=VERT_OK)).arrange(DOWN, buff=0.08)
        lab_oc.next_to(oc, DOWN, buff=0.22).shift(RIGHT * 0.5)
        self.play(GrowFromCenter(oc), FadeIn(lab_oc))
        self.play(Flash(oc, color=VERT_OK, line_length=0.3))

        droite = VGroup(
            Text("les journaux :", font_size=26, color=WHITE),
            Text("« la France décroche »", font_size=30, color=ROUGE_ERREUR),
            Text("l'OCDE :", font_size=26, color=WHITE),
            Text("« proche de la moyenne »", font_size=30, color=VERT_OK),
            Text("5 points : dans l'incertitude", font_size=26, color=GREY_B),
            Text("37 points depuis 2018 : ça, c'est sûr", font_size=28, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.28).move_to([3.5, 0.55, 0])
        for m in droite:
            self.play(FadeIn(m, shift=RIGHT * 0.15), run_time=0.45)

        self.play(Write(self.chute("Ce qui est sûr, ce n'est pas la place. C'est la chute.")))
        self.attendre_voix()

    # ── écran 2 : trois ans, et dix ans ────────────────────────────────────

    def ecran_chute(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-chute")
        self.titre_ecran("Trois ans, et dix ans")

        # La courbe : trois points, tracés à la main (pas d'Axes numérotés).
        pts = [(2018, 495), (2022, 474), (2025, 458)]
        cx, cy = -3.6, -0.3

        def p(annee, score):
            return [cx + (annee - 2021.5) * 0.62, cy + (score - 476) * 0.055, 0]

        base = Line(p(2016.5, 445), p(2026.5, 445), color=WHITE, stroke_width=2)
        self.play(Create(base))
        dots = VGroup()
        for i, (a, s) in enumerate(pts):
            d = Dot(p(a, s), color=ROUGE_ERREUR if i else JAUNE_TITRE, radius=0.1)
            lab = VGroup(Text(str(s), font_size=30, color=d.color),
                         Text(str(a), font_size=22, color=GREY_B)).arrange(DOWN, buff=0.06)
            lab.next_to(d, UP if i < 2 else DOWN, buff=0.18)
            if i:
                self.play(Create(Line(dots[-1].get_center(), d.get_center(),
                                      color=ROUGE_ERREUR, stroke_width=5)), run_time=0.5)
            self.play(GrowFromCenter(d), FadeIn(lab), run_time=0.4)
            dots.add(d)

        droite = VGroup(
            Text("sur dix ans", font_size=28, color=JAUNE_TITRE),
            VGroup(Text("sous le niveau 2 :", font_size=26, color=WHITE),
                   Text("24 % → 36 %", font_size=34, color=ROUGE_ERREUR)).arrange(DOWN, buff=0.1),
            VGroup(Text("niveau 5-6, les très bons :", font_size=26, color=WHITE),
                   Text("11 % → 5 %", font_size=34, color=ROUGE_ERREUR)).arrange(DOWN, buff=0.1),
        ).arrange(DOWN, buff=0.45).move_to([3.4, 0.4, 0])
        for m in droite:
            self.play(FadeIn(m, shift=RIGHT * 0.15), run_time=0.5)

        self.play(Write(self.chute("Moins de bons, plus de faibles. Ça, c'est vrai.")))
        self.attendre_voix()

    # ── écran 3 : ⭐ la translation ────────────────────────────────────────

    def ecran_translation(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-translation")
        self.titre_ecran("Et pourtant, l'écart n'a pas bougé")

        y0 = -1.6
        axe = Line([-6.6, y0, 0], [0.4, y0, 0], color=WHITE, stroke_width=2)
        self.play(Create(axe))

        c22 = self.cloche(-2.6, y0, largeur=4.6, hauteur=2.0, couleur=GREY_B)
        lab22 = Text("2022", font_size=24, color=GREY_B).move_to([-2.6, y0 + 2.3, 0])
        self.play(Create(c22), FadeIn(lab22))

        # les déciles : deux traits sur la courbe, et le crochet entre les deux
        bas, haut = -2.6 - 1.55, -2.6 + 1.55
        d_bas = Line([bas, y0, 0], [bas, y0 + 0.5, 0], color=ROUGE_ERREUR, stroke_width=4)
        d_haut = Line([haut, y0, 0], [haut, y0 + 0.5, 0], color=VERT_OK, stroke_width=4)
        l_bas = Text("10 % du bas", font_size=20, color=ROUGE_ERREUR).next_to(d_bas, DOWN, buff=0.35)
        l_haut = Text("10 % du haut", font_size=20, color=VERT_OK).next_to(d_haut, DOWN, buff=0.35)
        cro = self.crochet(bas, haut, y0 + 0.75, couleur=ORANGE_RETENUE)
        l_cro = Text("l'écart", font_size=24, color=ORANGE_RETENUE).next_to(cro, UP, buff=0.1)
        self.play(Create(d_bas), Create(d_haut), FadeIn(l_bas), FadeIn(l_haut))
        self.play(Create(cro), FadeIn(l_cro))

        # ⭐ Tout glisse ENSEMBLE : la courbe, les deux déciles, le crochet.
        groupe = VGroup(c22, d_bas, d_haut, cro)
        lab25 = Text("2025", font_size=24, color=BLEU_CALCUL).move_to([-2.6 - 1.0, y0 + 2.3, 0])
        self.play(groupe.animate.shift(LEFT * 1.0), l_bas.animate.shift(LEFT * 1.0),
                  l_haut.animate.shift(LEFT * 1.0), l_cro.animate.shift(LEFT * 1.0),
                  run_time=1.6)
        # ⚠️ « 2022 » s'efface quand la courbe devient 2025 : côte à côte, les
        # deux années se lisaient comme une seule date (brouillon du 11/09).
        self.play(c22.animate.set_stroke(BLEU_CALCUL), FadeOut(lab22), FadeIn(lab25), run_time=0.4)
        # ⚠️ Le mot plus long se repose AU-DESSUS du crochet déjà glissé, sinon il
        # descend dans le trait.
        cible = Text("l'écart : INCHANGÉ", font_size=26, color=ORANGE_RETENUE).next_to(cro, UP, buff=0.12)
        self.play(Transform(l_cro, cible))
        self.play(Flash(l_cro, color=ORANGE_RETENUE, line_length=0.25))

        droite = VGroup(
            Text("toute la distribution", font_size=30, color=WHITE),
            Text("a glissé de 16 points", font_size=32, color=BLEU_CALCUL),
            Text("ENSEMBLE", font_size=40, color=JAUNE_TITRE),
            Text("ni le haut ni le bas", font_size=26, color=WHITE),
            Text("n'a décroché plus que l'autre", font_size=26, color=WHITE),
        ).arrange(DOWN, buff=0.3).move_to([3.6, 0.5, 0])
        for m in droite:
            self.play(FadeIn(m, shift=RIGHT * 0.15), run_time=0.45)

        self.play(Write(self.chute("Une translation : le problème, c'est tout le monde.", color=JAUNE_TITRE)))
        self.attendre_voix()

    # ── écran 4 : ce que la moyenne cache ──────────────────────────────────

    def ecran_ecart(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-ecart")
        self.titre_ecran("Ce que la moyenne cache")

        gauche = VGroup(
            VGroup(Text("39 %", font_size=44, color=JAUNE_TITRE),
                   Text("dans le quart le plus favorisé du monde", font_size=24, color=WHITE)
                   ).arrange(DOWN, buff=0.1),
            VGroup(Text("534", font_size=48, color=VERT_OK),
                   Text("en sciences : parmi les meilleurs", font_size=24, color=WHITE)
                   ).arrange(DOWN, buff=0.1),
        ).arrange(DOWN, buff=0.5).move_to([-3.6, 0.5, 0])
        for m in gauche:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.5)

        titre_d = Text("entre le quart du haut et le quart du bas", font_size=24, color=WHITE)
        titre_d.move_to([3.4, 1.7, 0])
        barres = self.duo(100, 85, unite="points", largeur=3.6, couleur=ROUGE_ERREUR,
                          font_size=28, epaisseur=0.5).move_to([3.4, 0.3, 0])
        self.play(FadeIn(titre_d))
        for r in barres:
            self.play(FadeIn(r, shift=RIGHT * 0.2), run_time=0.5)
        self.play(Flash(barres[0][2], color=ROUGE_ERREUR, line_length=0.3))

        self.play(Write(self.chute("Un groupe très haut, un groupe très bas : la moyenne est au milieu.")))
        self.attendre_voix()

    # ── écran 5 : ⭐ la dissonance — ce que le titre ne dit pas ───────────

    def ecran_neuf(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-neuf")
        self.titre_ecran("Ce que le titre ne dit pas")

        lignes = VGroup()
        for gauche, droite, coul in [
            ("résoudre des problèmes avec un ordinateur", "moyenne OCDE", BLEU_CALCUL),
            ("sciences de l'environnement", "76 % (OCDE 74)", VERT_OK),
            ("curiosité", "75 % (OCDE 73)", VERT_OK),
            ("« je peux progresser »", "81 % (OCDE 69) — record", JAUNE_TITRE),
        ]:
            lignes.add(VGroup(Text(gauche, font_size=26, color=WHITE),
                              Text(droite, font_size=28, color=coul)
                              ).arrange(RIGHT, buff=0.5))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.38).move_to([-0.6, 1.1, 0])
        for l in lignes:
            self.play(FadeIn(l, shift=RIGHT * 0.2), run_time=0.5)
        self.play(Circumscribe(lignes[3][1], color=JAUNE_TITRE, buff=0.12))

        bilan = VGroup(
            Text("ce qui baisse : l'ancien socle", font_size=28, color=ROUGE_ERREUR),
            Text("ce qui est neuf : ils le tiennent", font_size=28, color=VERT_OK),
        ).arrange(RIGHT, buff=1.2).move_to([-0.6, -1.05, 0])
        self.play(FadeIn(bilan, shift=UP * 0.12))

        chir = Text("chirurgiens joueurs : −37 % d'erreurs au bloc (Rosser, 2007)",
                    font_size=24, color=GREY_B).move_to([-0.6, -1.85, 0])
        self.play(FadeIn(chir))
        self.play(Write(self.chute("La compétence vient parfois d'où personne ne regarde.", color=JAUNE_TITRE)))
        self.attendre_voix()

    # ── écran 6 : ce qui manque — et qui s'apprend ─────────────────────────

    def ecran_manque(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-manque")
        self.titre_ecran("Ce qui manque — et qui s'apprend")

        t1 = Text("redoublent d'efforts quand c'est dur", font_size=24, color=WHITE).move_to([-3.6, 2.0, 0])
        b1 = self.duo(54, 60, largeur=2.6, couleur=ORANGE_RETENUE, font_size=24).move_to([-3.6, 0.95, 0])
        t2 = Text("planifient leur travail", font_size=24, color=WHITE).move_to([-3.6, -0.35, 0])
        b2 = self.duo(33, 37, largeur=2.6, couleur=ORANGE_RETENUE, font_size=24, vmax=67).move_to([-3.6, -1.4, 0])
        for m in (t1, b1, t2, b2):
            self.play(FadeIn(m, shift=RIGHT * 0.15), run_time=0.5)

        classe = VGroup(
            Text("et la classe", font_size=28, color=JAUNE_TITRE),
            VGroup(Text("le bruit perturbe la plupart des cours :", font_size=24, color=WHITE),
                   Text("47 %  (OCDE 31)", font_size=32, color=ROUGE_ERREUR)).arrange(DOWN, buff=0.1),
            VGroup(Text("un écran en cours :", font_size=24, color=WHITE),
                   Text("−24 points  (OCDE −11)", font_size=32, color=ROUGE_ERREUR)).arrange(DOWN, buff=0.1),
        ).arrange(DOWN, buff=0.4).move_to([3.4, 0.5, 0])
        for m in classe:
            self.play(FadeIn(m, shift=RIGHT * 0.15), run_time=0.5)

        self.play(Write(self.chute("Rien de ça n'est une fatalité : ça s'apprend, et ça se décide.", color=VERT_OK)))
        self.attendre_voix()

    # ── écran 7 : ⭐⭐ et l'IA, alors ? ─────────────────────────────────────

    def ecran_ia(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-ia")
        self.titre_ecran("Et l'IA, alors ?")

        # ⚠️ Centrée à −3,4 en taille 36, la ligne sortait du cadre à gauche :
        # le « 3 » de « 3x » était coupé (brouillon du 11/09).
        eq = VGroup(Text("3x + 7 = 22", font_size=32, color=WHITE),
                    Text("→", font_size=32, color=BLEU_CALCUL),
                    Text("x = 5", font_size=36, color=VERT_OK),
                    Text("en 1 seconde", font_size=20, color=GREY_B)).arrange(RIGHT, buff=0.3)
        eq.move_to([-3.0, 2.05, 0])
        self.play(FadeIn(eq, shift=DOWN * 0.12))

        gauche = VGroup(
            VGroup(Text("POSER", font_size=34, color=JAUNE_TITRE),
                   Text("quelle équation ? c'est toi", font_size=24, color=WHITE)).arrange(DOWN, buff=0.08),
            VGroup(Text("VÉRIFIER", font_size=34, color=JAUNE_TITRE),
                   Text("tu ne peux pas vérifier", font_size=24, color=WHITE),
                   Text("ce que tu ne sais pas faire", font_size=24, color=WHITE)).arrange(DOWN, buff=0.08),
            VGroup(Text("niveau 5-6 de PISA :", font_size=22, color=GREY_B),
                   Text("5 %  (11 % en 2015)", font_size=30, color=ROUGE_ERREUR)).arrange(DOWN, buff=0.08),
        ).arrange(DOWN, buff=0.35).move_to([-3.4, -0.35, 0])
        for m in gauche:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.5)

        droite = VGroup(
            Text("20 équations, pas 200", font_size=34, color=VERT_OK),
            Text("les échecs : le moteur bat tout le monde", font_size=24, color=WHITE),
            Text("depuis 1997", font_size=24, color=WHITE),
            Text("et le niveau humain a MONTÉ", font_size=30, color=BLEU_CALCUL),
            Text("parce qu'ils apprennent avec lui", font_size=24, color=WHITE),
        ).arrange(DOWN, buff=0.28).move_to([3.5, 0.5, 0])
        for m in droite:
            self.play(FadeIn(m, shift=RIGHT * 0.15), run_time=0.45)
        self.play(Circumscribe(droite[3], color=BLEU_CALCUL, buff=0.12))

        self.play(Write(self.chute("Résous-en assez pour posséder l'idée. Puis crée avec l'IA.", color=JAUNE_TITRE)))
        self.attendre_voix()

    # ── défi et correction ─────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        self.play(Write(Text("Défi", font_size=48, color=JAUNE_TITRE).to_edge(UP)))

        # Les deux classes, DESSINÉES : chaque élève est un point sur une règle.
        def classe(nom, notes, y, coul):
            axe = Line([-4.0, y, 0], [4.0, y, 0], color=WHITE, stroke_width=2)
            grad = VGroup(*[Text(str(n), font_size=18, color=GREY_B).move_to([-4.0 + n * 0.4, y - 0.35, 0])
                            for n in (0, 6, 10, 12, 14, 18, 20)])
            pts = VGroup(*[Dot([-4.0 + n * 0.4, y + 0.2 + 0.18 * (i % 3), 0], color=coul, radius=0.07)
                           for i, n in enumerate(notes)])
            lab = Text(nom, font_size=26, color=coul).next_to(axe, LEFT, buff=0.4)
            moy = Line([-4.0 + 12 * 0.4, y - 0.15, 0], [-4.0 + 12 * 0.4, y + 0.8, 0],
                       color=JAUNE_TITRE, stroke_width=3)
            return VGroup(axe, grad, lab, pts, moy)

        A = classe("classe A", [10, 10, 11, 11, 12, 12, 12, 13, 13, 14, 14], 1.7, BLEU_CALCUL)
        B = classe("classe B", [6, 6, 6, 6, 6, 18, 18, 18, 18, 18], 0.1, ORANGE_RETENUE)
        self.play(FadeIn(A), run_time=0.7)
        self.play(FadeIn(B), run_time=0.7)
        self.play(FadeIn(Text("même moyenne : 12", font_size=28, color=JAUNE_TITRE).move_to([0, -0.9, 0])))

        q = VGroup(
            Text("1.  Laquelle a un problème d'écart ?", font_size=28, color=WHITE),
            Text("2.  Si toute la classe A perd 2 points : sa moyenne ? son écart ?", font_size=28, color=WHITE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3).move_to([-0.3, -1.95, 0])
        for m in q:
            self.play(FadeIn(m, shift=RIGHT * 0.2), run_time=0.5)

        pause = self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=32)
        self.play(Write(pause), Flash(pause, color=ORANGE_RETENUE, line_length=0.25))
        self.attendre_voix(marge=4.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("09-correction")
        self.titre_ecran("Correction")

        g = VGroup(
            Text("1.  la classe B", font_size=30, color=ORANGE_RETENUE),
            Text("écart : 18 − 6 = 12", font_size=30, color=WHITE),
            Text("classe A : 14 − 10 = 4", font_size=30, color=WHITE),
            Text("même moyenne,", font_size=26, color=GREY_B),
            Text("deux situations sans rapport", font_size=26, color=GREY_B),
        ).arrange(DOWN, buff=0.28).move_to([-3.4, 0.5, 0])
        for m in g:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.42)

        d = VGroup(
            Text("2.  A perd 2 points", font_size=30, color=BLEU_CALCUL),
            Text("moyenne : 12 → 10", font_size=30, color=WHITE),
            Text("écart : 4 → 4", font_size=34, color=VERT_OK),
            Text("une TRANSLATION", font_size=34, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.3).move_to([3.3, 0.5, 0])
        for m in d:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.42)
        self.play(Circumscribe(d[2], color=VERT_OK, buff=0.15))

        self.play(Write(self.chute("Exactement ce qui est arrivé à la France en trois ans.")))
        self.attendre_voix()

    def construct(self):
        self.page_de_garde(
            titre="Le niveau baisse ?",
            accroche="Et pourtant 81 % y croient. Qui a raison ?",
            promesse="Lire un chiffre · voir l'écart · savoir quoi faire",
        )
        self.page_objectifs([
            "lire un score PISA sans te faire avoir par un titre",
            "voir ce qu'une moyenne cache : l'écart, la translation",
            "savoir ce qui manque — et quoi apprendre quand l'IA résout",
        ])
        self.ecran_titre()
        self.ecran_chute()
        self.ecran_translation()
        self.ecran_ecart()
        self.ecran_neuf()
        self.ecran_manque()
        self.ecran_ia()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "5 points, c'est l'incertitude ; 37 points, c'est la chute",
                "une moyenne cache l'écart — et peut baisser sans qu'il bouge",
                "quand l'IA résout, il reste à poser, et à vérifier",
            ],
            rappel="On ne leur dit pas qu'ils sont nuls. On leur dit quoi faire.",
        )
        self.page_abonnement()


# ══════════════════════════════════════════════════════════════════════════════
#  LES QUATRE SHORTS
#  Chacun tient sur UNE idée et se regarde sans les autres. La première ligne
#  de la garde est un paradoxe — c'est ce qui a fait 852 vues ce matin.
# ══════════════════════════════════════════════════════════════════════════════

class Pisa2025ShortIa(ShortBases, _Pisa):
    """L'IA résout l'équation. Alors pourquoi l'apprendre ?"""

    dossier_voix = VOIX_IA

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        t = VGroup(
            self.grand("L'IA RÉSOUT", font_size=52, color=JAUNE_TITRE),
            self.grand("l'équation", font_size=36, color=WHITE),
            self.grand("alors pourquoi", font_size=34, color=WHITE),
            self.grand("L'APPRENDRE ?", font_size=54, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.26).move_to([0, 1.4, 0])
        self.play(FadeIn(t[0]), FadeIn(t[1]), run_time=0.45)
        self.play(FadeIn(t[2]), FadeIn(t[3]), run_time=0.4)
        self.play(Flash(t[3], color=BLEU_CALCUL, line_length=0.4))
        self.attendre_voix(marge=0.4)

    def ecran_resout(self):
        self.clear()
        self.margo_bas()
        self.dire("01-resout")
        self.play(Write(self.grand("Elle résout", font_size=44, color=JAUNE_TITRE).move_to([0, 3.1, 0])))
        eq = self.grand("3x + 7 = 22", font_size=54, color=WHITE).move_to([0, 1.9, 0])
        self.play(FadeIn(eq, shift=DOWN * 0.12))
        fl = Arrow([0, 1.3, 0], [0, 0.5, 0], color=BLEU_CALCUL, stroke_width=4, buff=0)
        self.play(Create(fl), run_time=0.4)
        x = self.grand("x = 5", font_size=76, color=VERT_OK).move_to([0, -0.2, 0])
        self.play(GrowFromCenter(x))
        self.play(Flash(x, color=VERT_OK, line_length=0.4))
        self.play(FadeIn(self.grand("en 1 seconde, sans se tromper", font_size=28,
                                    color=BLEU_CALCUL).move_to([0, -1.3, 0])))
        self.attendre_voix(marge=0.4)

    def ecran_poser(self):
        self.clear()
        self.margo_bas()
        self.dire("02-poser")
        self.play(Write(self.grand("Mais laquelle ?", font_size=44, color=JAUNE_TITRE).move_to([0, 3.1, 0])))
        pb = VGroup(
            self.grand("forfait A : 12 € + 0,05 €/min", font_size=26, color=WHITE),
            self.grand("forfait B : 20 € + 0,02 €/min", font_size=26, color=WHITE),
            self.grand("à partir de quand B est moins cher ?", font_size=24, color=GREY_B),
        ).arrange(DOWN, buff=0.22).move_to([0, 2.0, 0])
        for m in pb:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.4)
        eq = self.grand("12 + 0,05 m = 20 + 0,02 m", font_size=34, color=JAUNE_TITRE).move_to([0, 0.5, 0])
        cadre = SurroundingRectangle(eq, color=JAUNE_TITRE, buff=0.22, stroke_width=3)
        self.play(FadeIn(eq), Create(cadre))
        bas = VGroup(
            self.grand("l'écrire, c'est comprendre", font_size=30, color=WHITE),
            self.grand("POSER, c'est toi", font_size=42, color=VERT_OK),
        ).arrange(DOWN, buff=0.22).move_to([0, -1.1, 0])
        self.play(FadeIn(bas, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def ecran_verifier(self):
        self.clear()
        self.margo_bas()
        self.dire("03-verifier")
        self.play(Write(self.grand("Et si elle se trompe ?", font_size=40, color=JAUNE_TITRE).move_to([0, 3.1, 0])))
        faux = self.grand("x = 15", font_size=64, color=ROUGE_ERREUR).move_to([0, 2.0, 0])
        self.play(FadeIn(faux, shift=DOWN * 0.12))
        verif = VGroup(
            self.grand("3 × 15 + 7 = 52", font_size=38, color=WHITE),
            self.grand("52 ≠ 22", font_size=48, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.25).move_to([0, 0.6, 0])
        for m in verif:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.45)
        self.play(Flash(verif[1], color=ROUGE_ERREUR, line_length=0.35))
        bas = VGroup(
            self.grand("tu ne peux pas VÉRIFIER", font_size=30, color=BLEU_CALCUL),
            self.grand("ce que tu ne sais pas FAIRE", font_size=30, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.2).move_to([0, -1.2, 0])
        self.play(FadeIn(bas, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def ecran_pisa(self):
        self.clear()
        self.margo_bas()
        self.dire("04-pisa")
        self.play(Write(self.grand("PISA le mesure", font_size=42, color=JAUNE_TITRE).move_to([0, 3.1, 0])))
        haut = VGroup(
            self.grand("le niveau le plus haut :", font_size=26, color=WHITE),
            self.grand("POSER et CHOISIR", font_size=36, color=BLEU_CALCUL),
            self.grand("pas exécuter", font_size=28, color=GREY_B),
        ).arrange(DOWN, buff=0.18).move_to([0, 2.1, 0])
        for m in haut:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.4)
        pct = VGroup(
            self.grand("5 %", font_size=80, color=ROUGE_ERREUR),
            self.grand("des élèves en France", font_size=26, color=WHITE),
            self.grand("11 % en 2015", font_size=28, color=GREY_B),
        ).arrange(DOWN, buff=0.14).move_to([0, 0.4, 0])
        self.play(GrowFromCenter(pct[0]), FadeIn(pct[1]), FadeIn(pct[2]))
        bas = VGroup(
            self.grand("20 équations, pas 200", font_size=34, color=VERT_OK),
            self.grand("après, elle est à toi", font_size=30, color=WHITE),
        ).arrange(DOWN, buff=0.2).move_to([0, -1.3, 0])
        self.play(FadeIn(bas, shift=UP * 0.12))
        self.play(Flash(bas[0], color=VERT_OK, line_length=0.35))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche(); self.ecran_resout(); self.ecran_poser()
        self.ecran_verifier(); self.ecran_pisa(); self.ecran_renvoi()


class Pisa2025ShortFavorises(ShortBases, _Pisa):
    """Les favorisés excellent, et la France est moyenne : pourquoi ?"""

    dossier_voix = VOIX_FAV

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        t = VGroup(
            self.grand("LES FAVORISÉS", font_size=44, color=JAUNE_TITRE),
            self.grand("EXCELLENT", font_size=52, color=JAUNE_TITRE),
            self.grand("et la France", font_size=34, color=WHITE),
            self.grand("est MOYENNE", font_size=50, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.24).move_to([0, 1.4, 0])
        self.play(FadeIn(t[0]), FadeIn(t[1]), run_time=0.45)
        self.play(FadeIn(t[2]), FadeIn(t[3]), run_time=0.4)
        self.play(Flash(t[3], color=BLEU_CALCUL, line_length=0.4))
        self.attendre_voix(marge=0.4)

    def ecran_favorises(self):
        self.clear()
        self.margo_bas()
        self.dire("01-favorises")
        self.play(Write(self.grand("Les favorisés", font_size=44, color=JAUNE_TITRE).move_to([0, 3.1, 0])))
        haut = VGroup(
            self.grand("39 %", font_size=64, color=JAUNE_TITRE),
            self.grand("des élèves français", font_size=26, color=WHITE),
            self.grand("dans le quart le plus favorisé", font_size=24, color=WHITE),
            self.grand("de tous les pays testés", font_size=24, color=WHITE),
        ).arrange(DOWN, buff=0.14).move_to([0, 1.7, 0])
        for m in haut:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.35)
        bas = VGroup(
            self.grand("534", font_size=84, color=VERT_OK),
            self.grand("en sciences", font_size=28, color=WHITE),
            self.grand("parmi les meilleurs du monde", font_size=26, color=VERT_OK),
        ).arrange(DOWN, buff=0.12).move_to([0, -0.7, 0])
        self.play(GrowFromCenter(bas[0]), FadeIn(bas[1]), FadeIn(bas[2]))
        self.play(Flash(bas[0], color=VERT_OK, line_length=0.4))
        self.attendre_voix(marge=0.4)

    def ecran_ecart(self):
        self.clear()
        self.margo_bas()
        self.dire("02-ecart")
        self.play(Write(self.grand("L'écart", font_size=48, color=JAUNE_TITRE).move_to([0, 3.1, 0])))
        sous = VGroup(
            self.grand("entre les 25 % du haut", font_size=26, color=WHITE),
            self.grand("et les 25 % du bas", font_size=26, color=WHITE),
        ).arrange(DOWN, buff=0.12).move_to([0, 2.2, 0])
        self.play(FadeIn(sous))
        # ⚠️ « 100 points » est large : à 2,1 de barre, les étiquettes sortaient
        # du cadre des deux côtés (brouillon du 11/09). 1,3 tient.
        barres = self.duo(100, 85, unite="points", largeur=1.3, couleur=ROUGE_ERREUR,
                          font_size=22, epaisseur=0.42).move_to([0, 0.7, 0])
        for r in barres:
            self.play(FadeIn(r, shift=RIGHT * 0.15), run_time=0.5)
        self.play(Flash(barres[0][2], color=ROUGE_ERREUR, line_length=0.35))
        self.play(FadeIn(self.grand("15 points de plus qu'ailleurs", font_size=28,
                                    color=ROUGE_ERREUR).move_to([0, -1.0, 0])))
        self.attendre_voix(marge=0.4)

    def ecran_moyenne(self):
        self.clear()
        self.margo_bas()
        self.dire("03-moyenne")
        self.play(Write(self.grand("La moyenne", font_size=46, color=JAUNE_TITRE).move_to([0, 3.1, 0])))
        # Un groupe en haut, un groupe en bas, et la moyenne au milieu.
        # ⚠️ Tout est calé à GAUCHE : les étiquettes partent vers la droite et
        # sortaient du cadre quand l'axe était au centre (brouillon du 11/09).
        axe = Line([-1.7, -1.3, 0], [-1.7, 2.3, 0], color=WHITE, stroke_width=2)
        self.play(Create(axe))
        haut = VGroup(*[Dot([-1.3 + 0.3 * (i % 3), 1.75 + 0.22 * (i // 3), 0], color=VERT_OK, radius=0.08)
                        for i in range(6)])
        bas = VGroup(*[Dot([-1.3 + 0.3 * (i % 3), -0.95 + 0.22 * (i // 3), 0], color=ROUGE_ERREUR, radius=0.08)
                       for i in range(6)])
        l_h = self.grand("très haut", font_size=26, color=VERT_OK).next_to(haut, RIGHT, buff=0.3)
        l_b = self.grand("très bas", font_size=26, color=ROUGE_ERREUR).next_to(bas, RIGHT, buff=0.3)
        self.play(LaggedStart(*[FadeIn(d) for d in haut], lag_ratio=0.1), FadeIn(l_h))
        self.play(LaggedStart(*[FadeIn(d) for d in bas], lag_ratio=0.1), FadeIn(l_b))
        moy = Line([-2.0, 0.5, 0], [-0.4, 0.5, 0], color=JAUNE_TITRE, stroke_width=5)
        # ⚠️ Sur DEUX lignes : en une, « moyenne… moyenne » sortait encore du
        # cadre — un Text de taille 24 fait ~0,15 unité par signe, pas 0,11.
        l_m = VGroup(self.grand("moyenne…", font_size=26, color=JAUNE_TITRE),
                     self.grand("moyenne", font_size=26, color=JAUNE_TITRE),
                     ).arrange(DOWN, buff=0.06).next_to(moy, RIGHT, buff=0.2)
        self.play(Create(moy), FadeIn(l_m))
        self.play(Flash(moy, color=JAUNE_TITRE, line_length=0.3))
        self.play(FadeIn(self.grand("le chiffre du journal ne dit rien de ça", font_size=24,
                                    color=GREY_B).move_to([0, -1.9, 0])))
        self.attendre_voix(marge=0.4)

    def ecran_retenir(self):
        self.clear()
        self.margo_bas()
        self.dire("04-retenir")
        bloc = VGroup(
            self.grand("le problème de la France", font_size=32, color=WHITE),
            self.grand("ce n'est pas le NIVEAU", font_size=40, color=GREY_B),
            self.grand("c'est l'ÉCART", font_size=54, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.35).move_to([0, 1.5, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.45)
        self.play(FadeIn(self.grand("et une moyenne ne le montre jamais", font_size=28,
                                    color=BLEU_CALCUL).move_to([0, -0.7, 0])))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche(); self.ecran_favorises(); self.ecran_ecart()
        self.ecran_moyenne(); self.ecran_retenir(); self.ecran_renvoi()


class Pisa2025ShortEcart(ShortBases, _Pisa):
    """−16 points, et l'écart n'a pas bougé : qui a baissé ?"""

    dossier_voix = VOIX_ECART

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        t = VGroup(
            self.grand("−16 POINTS", font_size=64, color=ROUGE_ERREUR),
            self.grand("en maths", font_size=30, color=WHITE),
            self.grand("et l'écart", font_size=34, color=WHITE),
            self.grand("n'a pas bougé", font_size=46, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.24).move_to([0, 1.4, 0])
        self.play(FadeIn(t[0]), FadeIn(t[1]), run_time=0.45)
        self.play(FadeIn(t[2]), FadeIn(t[3]), run_time=0.4)
        self.play(Flash(t[3], color=BLEU_CALCUL, line_length=0.4))
        self.attendre_voix(marge=0.4)

    def ecran_chute(self):
        self.clear()
        self.margo_bas()
        self.dire("01-chute")
        self.play(Write(self.grand("En trois ans", font_size=44, color=JAUNE_TITRE).move_to([0, 3.1, 0])))
        a = VGroup(self.grand("2022", font_size=26, color=GREY_B),
                   self.grand("474", font_size=64, color=WHITE)).arrange(DOWN, buff=0.1).move_to([0, 1.9, 0])
        self.play(FadeIn(a, shift=DOWN * 0.12))
        fl = Arrow([0, 1.15, 0], [0, 0.2, 0], color=ROUGE_ERREUR, stroke_width=5, buff=0)
        self.play(Create(fl), run_time=0.45)
        b = VGroup(self.grand("2025", font_size=26, color=GREY_B),
                   self.grand("458", font_size=72, color=ROUGE_ERREUR)).arrange(DOWN, buff=0.1).move_to([0, -0.5, 0])
        self.play(FadeIn(b, shift=DOWN * 0.12))
        m16 = self.grand("− 16", font_size=48, color=ROUGE_ERREUR).move_to([0, -1.6, 0])
        self.play(GrowFromCenter(m16), Flash(m16, color=ROUGE_ERREUR, line_length=0.35))
        self.attendre_voix(marge=0.4)

    def ecran_deciles(self):
        self.clear()
        self.margo_bas()
        self.dire("02-deciles")
        self.play(Write(self.grand("Le haut et le bas", font_size=40, color=JAUNE_TITRE).move_to([0, 3.1, 0])))
        y0 = 0.3
        axe = Line([-2.05, y0, 0], [2.05, y0, 0], color=WHITE, stroke_width=2)
        self.play(Create(axe))
        # ⚠️ Déciles à ±1,0 et glissement de 0,45 : à ±1,2 et 0,6, « 10 % du bas »
        # sortait du cadre à gauche (brouillon du 11/09).
        d_bas = Dot([-1.0, y0, 0], color=ROUGE_ERREUR, radius=0.11)
        d_haut = Dot([1.0, y0, 0], color=VERT_OK, radius=0.11)
        # ⚠️ Étiquettes sur DEUX lignes : en une, les deux se touchaient au
        # centre et « 10 % du bas » sortait à gauche après le glissement.
        l_bas = VGroup(self.grand("10 %", font_size=22, color=ROUGE_ERREUR),
                       self.grand("du bas", font_size=22, color=ROUGE_ERREUR),
                       ).arrange(DOWN, buff=0.05).next_to(d_bas, DOWN, buff=0.25)
        l_haut = VGroup(self.grand("10 %", font_size=22, color=VERT_OK),
                        self.grand("du haut", font_size=22, color=VERT_OK),
                        ).arrange(DOWN, buff=0.05).next_to(d_haut, DOWN, buff=0.25)
        self.play(GrowFromCenter(d_bas), GrowFromCenter(d_haut), FadeIn(l_bas), FadeIn(l_haut))
        cro = self.crochet(-1.0, 1.0, y0 + 0.55, couleur=ORANGE_RETENUE)
        l_cro = self.grand("l'écart", font_size=28, color=ORANGE_RETENUE).next_to(cro, UP, buff=0.12)
        self.play(Create(cro), FadeIn(l_cro))
        # tout glisse de la même quantité
        groupe = VGroup(d_bas, d_haut, l_bas, l_haut, cro, l_cro)
        self.play(groupe.animate.shift(LEFT * 0.45), run_time=1.4)
        # ⚠️ Le mot plus grand se repose AU-DESSUS du crochet (déjà glissé) :
        # centré sur l'ancien, il descendait dans le trait.
        cible = self.grand("INCHANGÉ", font_size=36, color=ORANGE_RETENUE).next_to(cro, UP, buff=0.14)
        self.play(Transform(l_cro, cible))
        self.play(Flash(l_cro, color=ORANGE_RETENUE, line_length=0.3))
        self.play(FadeIn(self.grand("ni plus grand, ni plus petit", font_size=26,
                                    color=WHITE).move_to([0, -1.4, 0])))
        self.attendre_voix(marge=0.4)

    def ecran_translation(self):
        self.clear()
        self.margo_bas()
        self.dire("03-translation")
        y0 = -0.4
        axe = Line([-2.1, y0, 0], [2.1, y0, 0], color=WHITE, stroke_width=2)
        self.play(Create(axe))
        c = self.cloche(0.4, y0, largeur=3.0, hauteur=1.6, couleur=GREY_B)
        self.play(Create(c))
        self.play(c.animate.shift(LEFT * 0.7).set_stroke(BLEU_CALCUL), run_time=1.4)
        bloc = VGroup(
            self.grand("TOUT LE MONDE", font_size=40, color=JAUNE_TITRE),
            self.grand("a glissé", font_size=34, color=WHITE),
            self.grand("ENSEMBLE", font_size=44, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.2).move_to([0, 2.3, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.4)
        self.play(FadeIn(self.grand("de 16 points", font_size=30, color=ROUGE_ERREUR).move_to([0, -1.3, 0])))
        self.attendre_voix(marge=0.4)

    def ecran_retenir(self):
        self.clear()
        self.margo_bas()
        self.dire("04-retenir")
        bloc = VGroup(
            self.grand("une moyenne peut baisser", font_size=30, color=WHITE),
            self.grand("sans que l'écart bouge", font_size=30, color=WHITE),
            self.grand("une TRANSLATION", font_size=46, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.26).move_to([0, 1.8, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.45)
        bas = VGroup(
            self.grand("ce n'est pas un groupe", font_size=28, color=GREY_B),
            self.grand("c'est TOUT LE MONDE", font_size=36, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.2).move_to([0, -0.7, 0])
        self.play(FadeIn(bas, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche(); self.ecran_chute(); self.ecran_deciles()
        self.ecran_translation(); self.ecran_retenir(); self.ecran_renvoi()


class Pisa2025ShortCroire(ShortBases, _Pisa):
    """⭐ LA VOIX DISSONANTE : on leur dit qu'ils dégringolent, eux y croient à 81 %."""

    dossier_voix = VOIX_CROIRE

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        t = VGroup(
            self.grand("on leur dit", font_size=32, color=WHITE),
            self.grand("qu'ils DÉGRINGOLENT", font_size=40, color=ROUGE_ERREUR),
            self.grand("eux, à 81 %", font_size=60, color=JAUNE_TITRE),
            self.grand("pensent progresser", font_size=34, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.24).move_to([0, 1.4, 0])
        self.play(FadeIn(t[0]), FadeIn(t[1]), run_time=0.45)
        self.play(FadeIn(t[2]), FadeIn(t[3]), run_time=0.4)
        self.play(Flash(t[2], color=JAUNE_TITRE, line_length=0.4))
        self.attendre_voix(marge=0.4)

    def ecran_duo(self, voix, titre, fr, ocde, sous, note=None, couleur=BLEU_CALCUL):
        self.clear()
        self.margo_bas()
        self.dire(voix)
        self.play(Write(self.grand(titre, font_size=42, color=JAUNE_TITRE).move_to([0, 3.1, 0])))
        s = VGroup(*[self.grand(l, font_size=26, color=WHITE) for l in sous]).arrange(DOWN, buff=0.12)
        s.move_to([0, 2.2, 0])
        self.play(FadeIn(s))
        barres = self.duo(fr, ocde, largeur=2.1, couleur=couleur, font_size=24,
                          epaisseur=0.46, vmax=100).move_to([0, 0.7, 0])
        for r in barres:
            self.play(FadeIn(r, shift=RIGHT * 0.15), run_time=0.5)
        self.play(Flash(barres[0][2], color=couleur, line_length=0.35))
        if note:
            n = VGroup(*[self.grand(l, font_size=28, color=couleur) for l in note]).arrange(DOWN, buff=0.15)
            self.play(FadeIn(n.move_to([0, -1.1, 0]), shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def ecran_retenir(self):
        self.clear()
        self.margo_bas()
        self.dire("04-retenir")
        bloc = VGroup(
            self.grand("les deux ont raison", font_size=34, color=JAUNE_TITRE),
            self.grand("le niveau mesuré baisse", font_size=28, color=ROUGE_ERREUR),
            self.grand("et ce qui manque", font_size=28, color=WHITE),
            self.grand("S'APPREND", font_size=48, color=VERT_OK),
        ).arrange(DOWN, buff=0.24).move_to([0, 1.7, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.42)
        bas = VGroup(
            self.grand("ne leur dites pas qu'ils sont nuls", font_size=26, color=GREY_B),
            self.grand("dites-leur quoi faire", font_size=34, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.2).move_to([0, -0.9, 0])
        self.play(FadeIn(bas, shift=UP * 0.12))
        self.play(Flash(bas[1], color=BLEU_CALCUL, line_length=0.35))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_duo("01-croire", "Y croire", 81, 69,
                       ["« on peut développer", "son intelligence »"],
                       note=["record de l'OCDE", "+31 points en sciences"], couleur=VERT_OK)
        self.ecran_duo("02-effort", "S'accrocher", 54, 60,
                       ["« je redouble d'efforts", "quand c'est dur »"], couleur=ORANGE_RETENUE)
        self.ecran_duo("03-planifier", "Prévoir", 33, 37,
                       ["« je planifie", "mon travail »"],
                       note=["la croyance est là", "la pratique, moins"], couleur=ORANGE_RETENUE)
        self.ecran_retenir()
        self.ecran_renvoi()
