# fractions_shorts.py
# EleveAI — « Les bases » — Les fractions : LES HUIT SHORTS.
# La vidéo longue est dans `fractions.py`.
#
# ⭐ UN SHORT PAR NOTION (Frédéric, 11/09/2026). Chacun tient sur un seul geste,
# et se regarde sans avoir vu les autres — c'est la condition pour qu'un élève
# qui bloque sur UN point le trouve.
#
# ⛔ AUCUNE ÉTIQUETTE DE NIVEAU : voir `manim/gabarit_bases.py`.
# ⭐ L'écran de fin renvoie au COACH et porte l'abonnement — la suite logique
# d'une leçon de base, c'est de pratiquer.
#
# Rendu (exemple) :
#   python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/bases/fractions_shorts.py FractionsShortOrdre -o eleveai-maths-bases-fractions-short-ordre --media_dir manim/scripts/bases/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_bases import ShortBases
from gabarit_seconde import SONS

V = SONS  # racine des voix


# ══════════════════════════════════════════════════════════════════════════════
#  1. C'EST QUOI UNE FRACTION — un partage, ET un nombre
# ══════════════════════════════════════════════════════════════════════════════

class FractionsShortDefinition(ShortBases):

    dossier_voix = V / "bases-fractions-short-definition"

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        f = self.fraction(3, 4, font_size=110, color=JAUNE_TITRE).move_to([0, 2.0, 0])
        self.play(FadeIn(f, shift=DOWN * 0.15), run_time=0.45)
        q = self.grand("c'est quoi, au juste ?", font_size=36, color=WHITE).move_to([0, 0.2, 0])
        self.play(FadeIn(q, shift=UP * 0.12), run_time=0.4)
        self.play(Flash(f, color=JAUNE_TITRE, line_length=0.4))
        self.attendre_voix(marge=0.4)

    def ecran_partage(self):
        self.clear()
        self.margo_bas()
        self.dire("01-partage")
        self.play(Write(self.grand("Un PARTAGE", font_size=48, color=JAUNE_TITRE).move_to([0, 3.1, 0])))
        g = self.disque(4, 3, rayon=1.15, centre=[0, 1.5, 0])
        self.play(LaggedStart(*[FadeIn(s) for s in g], lag_ratio=0.2))
        bloc = VGroup(
            self.grand("4 : en combien de parts", font_size=28, color=BLEU_CALCUL),
            self.grand("3 : combien on en prend", font_size=28, color=VERT_OK),
        ).arrange(DOWN, buff=0.26).move_to([0, -0.8, 0])
        self.play(FadeIn(bloc, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def ecran_nombre(self):
        self.clear()
        self.margo_bas()
        self.dire("02-nombre")
        self.play(Write(self.grand("Et un NOMBRE", font_size=48, color=JAUNE_TITRE).move_to([0, 3.1, 0])))
        axe, marques = self.droite_fractions(
            [(0.75, "3/4", JAUNE_TITRE)], longueur=3.6, centre=[0, 1.5, 0], font_size=24)
        self.play(Create(axe))
        self.play(FadeIn(marques))
        bloc = VGroup(
            self.grand("un point sur la droite", font_size=30, color=WHITE),
            self.grand("entre 0 et 1", font_size=30, color=WHITE),
        ).arrange(DOWN, buff=0.2).move_to([0, -0.3, 0])
        self.play(FadeIn(bloc, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def ecran_pourquoi(self):
        self.clear()
        self.margo_bas()
        self.dire("03-pourquoi")
        bloc = VGroup(
            self.grand("si tu vois", font_size=32, color=WHITE),
            self.grand("seulement un partage", font_size=30, color=ROUGE_ERREUR),
            self.grand("diviser par une fraction", font_size=28, color=ROUGE_ERREUR),
            self.grand("restera de la magie", font_size=30, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.24).move_to([0, 1.9, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.36)
        bas = VGroup(
            self.grand("si tu vois un NOMBRE", font_size=32, color=VERT_OK),
            self.grand("tout devient possible", font_size=32, color=VERT_OK),
        ).arrange(DOWN, buff=0.22).move_to([0, -0.6, 0])
        self.play(FadeIn(bas, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def ecran_retenir(self):
        self.clear()
        self.margo_bas()
        self.dire("04-retenir")
        bloc = VGroup(
            self.grand("une fraction", font_size=44, color=JAUNE_TITRE),
            self.grand("un PARTAGE", font_size=48, color=BLEU_CALCUL),
            self.grand("et un NOMBRE", font_size=48, color=VERT_OK),
        ).arrange(DOWN, buff=0.35).move_to([0, 1.4, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.42)
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche(); self.ecran_partage(); self.ecran_nombre()
        self.ecran_pourquoi(); self.ecran_retenir(); self.ecran_renvoi()


# ══════════════════════════════════════════════════════════════════════════════
#  2. JAMAIS ZÉRO EN BAS
# ══════════════════════════════════════════════════════════════════════════════

class FractionsShortZero(ShortBases):

    dossier_voix = V / "bases-fractions-short-zero"

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        f = self.fraction("a", 0, font_size=110, color=ROUGE_ERREUR).move_to([0, 1.9, 0])
        self.play(FadeIn(f, shift=DOWN * 0.15), run_time=0.45)
        q = VGroup(
            self.grand("pourquoi c'est", font_size=36, color=WHITE),
            self.grand("INTERDIT ?", font_size=52, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.22).move_to([0, 0.1, 0])
        self.play(FadeIn(q, shift=UP * 0.12), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_partage(self):
        self.clear()
        self.margo_bas()
        self.dire("01-partage")
        self.play(Write(self.grand("Reviens au partage", font_size=38, color=JAUNE_TITRE).move_to([0, 3.1, 0])))
        bloc = VGroup(
            self.grand("couper un gâteau", font_size=34, color=WHITE),
            self.grand("en ZÉRO part ?", font_size=42, color=ROUGE_ERREUR),
            self.grand("ça ne veut rien dire", font_size=32, color=ROUGE_ERREUR),
            self.grand("il n'y a pas de réponse", font_size=30, color=WHITE),
        ).arrange(DOWN, buff=0.28).move_to([0, 1.3, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_explosion(self):
        self.clear()
        self.margo_bas()
        self.dire("02-explosion")
        self.play(Write(self.grand("Regarde autrement", font_size=36, color=JAUNE_TITRE).move_to([0, 3.1, 0])))
        # ⛔ Les trois lignes se bornent chacune séparément si on passe par
        # `grand()` : la plus longue rétrécit seule et la suite ressemble à une
        # perspective. On les compose à taille égale, puis on borne le GROUPE.
        lignes = VGroup(*[
            Text(f"1 ÷ {den}  =  {res}", font_size=38, color=BLEU_CALCUL)
            for den, res in [("1/2", "2"), ("1/10", "10"), ("1/1000", "1000")]
        ]).arrange(DOWN, buff=0.42)
        if lignes.width > config.frame_width - 0.5:
            lignes.scale_to_fit_width(config.frame_width - 0.5)
        lignes.move_to([0, 1.3, 0])
        for l in lignes:
            self.play(FadeIn(l, shift=RIGHT * 0.12), run_time=0.5)
        self.attendre_voix(marge=0.4)

    def ecran_limite(self):
        self.clear()
        self.margo_bas()
        self.dire("03-limite")
        bloc = VGroup(
            self.grand("plus le bas", font_size=36, color=WHITE),
            self.grand("est PETIT", font_size=42, color=BLEU_CALCUL),
            self.grand("plus le résultat", font_size=36, color=WHITE),
            self.grand("EXPLOSE", font_size=52, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.26).move_to([0, 1.5, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.38)
        self.play(Flash(bloc[3], color=ORANGE_RETENUE, line_length=0.4))
        self.attendre_voix(marge=0.4)

    def ecran_retenir(self):
        self.clear()
        self.margo_bas()
        self.dire("04-retenir")
        f = self.fraction("a", 0, font_size=76, color=ROUGE_ERREUR).move_to([0, 2.1, 0])
        self.play(FadeIn(f))
        # ⚠️ Une fraction est HAUTE et ÉTROITE : une barre posée sur ses coins
        # sort presque verticale et ne se lit pas comme une rature. On l'étale
        # horizontalement bien au-delà du texte.
        barre = Line(f.get_corner(DL) + LEFT * 0.75, f.get_corner(UR) + RIGHT * 0.75,
                     color=ROUGE_ERREUR, stroke_width=7)
        self.play(Create(barre))
        bloc = VGroup(
            self.grand("aucun nombre", font_size=34, color=WHITE),
            self.grand("ne conviendrait", font_size=34, color=WHITE),
            self.grand("le bas n'est", font_size=34, color=VERT_OK),
            self.grand("JAMAIS zéro", font_size=42, color=VERT_OK),
        ).arrange(DOWN, buff=0.24).move_to([0, -0.3, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.36)
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche(); self.ecran_partage(); self.ecran_explosion()
        self.ecran_limite(); self.ecran_retenir(); self.ecran_renvoi()


# ══════════════════════════════════════════════════════════════════════════════
#  3. 3/3 = 4/4 = 1
# ══════════════════════════════════════════════════════════════════════════════

class FractionsShortEgales(ShortBases):

    dossier_voix = V / "bases-fractions-short-egales"

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        bloc = VGroup(
            self.fraction(3, 3, font_size=60, color=JAUNE_TITRE),
            self.fraction(4, 4, font_size=60, color=JAUNE_TITRE),
            self.fraction(100, 100, font_size=60, color=JAUNE_TITRE),
        ).arrange(RIGHT, buff=0.55).move_to([0, 1.9, 0])
        self.play(FadeIn(bloc, shift=DOWN * 0.15), run_time=0.5)
        q = self.grand("combien ça fait ?", font_size=40, color=WHITE).move_to([0, 0.1, 0])
        self.play(FadeIn(q, shift=UP * 0.12), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_un(self):
        self.clear()
        self.margo_bas()
        self.dire("01-un")
        un = self.grand("1", font_size=180, color=VERT_OK).move_to([0, 1.8, 0])
        self.play(GrowFromCenter(un))
        self.play(Flash(un, color=VERT_OK, line_length=0.5))
        bloc = VGroup(
            self.grand("à chaque fois", font_size=34, color=WHITE),
            self.grand("tu prends", font_size=34, color=WHITE),
            self.grand("TOUTES les parts", font_size=38, color=VERT_OK),
        ).arrange(DOWN, buff=0.24).move_to([0, -0.6, 0])
        self.play(FadeIn(bloc, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def ecran_gateau(self):
        self.clear()
        self.margo_bas()
        self.dire("02-gateau")
        g1 = self.disque(3, 3, rayon=0.85, centre=[-1.0, 1.9, 0], couleur=VERT_OK)
        g2 = self.disque(100, 100, rayon=0.85, centre=[1.0, 1.9, 0], couleur=VERT_OK)
        self.play(FadeIn(g1), FadeIn(g2))
        lab = VGroup(
            self.grand("coupé en 3", font_size=28, color=WHITE),
            self.grand("ou en 100", font_size=28, color=WHITE),
            self.grand("le gâteau ENTIER", font_size=36, color=VERT_OK),
        ).arrange(DOWN, buff=0.24).move_to([0, -0.2, 0])
        for m in lab:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_general(self):
        self.clear()
        self.margo_bas()
        self.dire("03-general")
        bloc = VGroup(
            self.fraction("n", "n", font_size=86, color=JAUNE_TITRE),
            self.grand("=", font_size=52, color=WHITE),
            self.grand("1", font_size=96, color=VERT_OK),
        ).arrange(DOWN, buff=0.42).move_to([0, 1.5, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.42)
        note = self.grand("sauf zéro, évidemment", font_size=30, color=ORANGE_RETENUE)
        note.move_to([0, -1.1, 0])
        self.play(FadeIn(note, shift=UP * 0.1))
        self.attendre_voix(marge=0.4)

    def ecran_utile(self):
        self.clear()
        self.margo_bas()
        self.dire("04-utile")
        self.play(Write(self.grand("Et ça sert", font_size=40, color=JAUNE_TITRE).move_to([0, 3.1, 0])))
        bloc = VGroup(
            self.grand("multiplier par 3/3", font_size=32, color=WHITE),
            self.grand("= multiplier par 1", font_size=32, color=VERT_OK),
            self.grand("ça ne change RIEN", font_size=34, color=VERT_OK),
            self.grand("c'est ce qu'on fait", font_size=28, color=BLEU_CALCUL),
            self.grand("pour le même dénominateur", font_size=26, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.24).move_to([0, 1.2, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.36)
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche(); self.ecran_un(); self.ecran_gateau()
        self.ecran_general(); self.ecran_utile(); self.ecran_renvoi()


# ══════════════════════════════════════════════════════════════════════════════
#  4. SIMPLIFIER
# ══════════════════════════════════════════════════════════════════════════════

class FractionsShortSimplifier(ShortBases):

    dossier_voix = V / "bases-fractions-short-simplifier"

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        f = self.fraction(6, 8, font_size=120, color=JAUNE_TITRE).move_to([0, 1.9, 0])
        self.play(FadeIn(f, shift=DOWN * 0.15), run_time=0.45)
        q = self.grand("comment on simplifie ?", font_size=34, color=WHITE).move_to([0, 0.1, 0])
        self.play(FadeIn(q, shift=UP * 0.12), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_regle(self):
        self.clear()
        self.margo_bas()
        self.dire("01-regle")
        bloc = VGroup(
            self.grand("je divise", font_size=40, color=WHITE),
            self.grand("le HAUT et le BAS", font_size=40, color=VERT_OK),
            self.grand("par le MÊME nombre", font_size=38, color=VERT_OK),
        ).arrange(DOWN, buff=0.3).move_to([0, 1.6, 0])
        cadre = SurroundingRectangle(bloc, color=VERT_OK, buff=0.3, stroke_width=3)
        self.play(FadeIn(bloc), Create(cadre))
        self.attendre_voix(marge=0.4)

    def ecran_exemple(self):
        self.clear()
        self.margo_bas()
        self.dire("02-exemple")
        suite = VGroup(
            self.grand("6 ÷ 2 = 3", font_size=40, color=BLEU_CALCUL),
            self.grand("8 ÷ 2 = 4", font_size=40, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.28).move_to([0, 2.4, 0])
        for m in suite:
            self.play(FadeIn(m, shift=RIGHT * 0.12), run_time=0.42)
        res = VGroup(
            self.fraction(6, 8, font_size=64, color=WHITE),
            self.grand("=", font_size=44, color=WHITE),
            self.fraction(3, 4, font_size=64, color=VERT_OK),
        ).arrange(RIGHT, buff=0.4).move_to([0, 0.5, 0])
        self.play(FadeIn(res, shift=UP * 0.12))
        self.play(Circumscribe(res[2], color=VERT_OK, buff=0.2))
        self.attendre_voix(marge=0.4)

    def ecran_meme_part(self):
        self.clear()
        self.margo_bas()
        self.dire("03-meme-part")
        b1 = self.barre_parts(8, 6, largeur=3.6, hauteur=0.6, centre=[0, 2.1, 0])
        l1 = self.grand("6/8", font_size=30, color=BLEU_CALCUL).move_to([0, 1.5, 0])
        self.play(Create(b1), FadeIn(l1))
        b2 = self.barre_parts(4, 3, largeur=3.6, hauteur=0.6, centre=[0, 0.7, 0],
                              couleur=VERT_OK)
        l2 = self.grand("3/4", font_size=30, color=VERT_OK).move_to([0, 0.1, 0])
        self.play(Create(b2), FadeIn(l2))
        note = VGroup(
            self.grand("la MÊME surface", font_size=36, color=JAUNE_TITRE),
            self.grand("l'écriture seule change", font_size=28, color=WHITE),
        ).arrange(DOWN, buff=0.2).move_to([0, -1.1, 0])
        self.play(FadeIn(note, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def ecran_piege(self):
        self.clear()
        self.margo_bas()
        self.dire("04-piege")
        self.play(Write(self.grand("Le piège", font_size=40, color=ROUGE_ERREUR).move_to([0, 3.1, 0])))
        bloc = VGroup(
            self.grand("le MÊME nombre", font_size=36, color=VERT_OK),
            self.grand("en haut ET en bas", font_size=36, color=VERT_OK),
            self.grand("diviser seulement", font_size=30, color=ROUGE_ERREUR),
            self.grand("le haut CHANGE", font_size=32, color=ROUGE_ERREUR),
            self.grand("la valeur", font_size=32, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.24).move_to([0, 1.3, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.36)
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche(); self.ecran_regle(); self.ecran_exemple()
        self.ecran_meme_part(); self.ecran_piege(); self.ecran_renvoi()


# ══════════════════════════════════════════════════════════════════════════════
#  5. FRACTION → DÉCIMAL → POURCENTAGE
# ══════════════════════════════════════════════════════════════════════════════

class FractionsShortEcritures(ShortBases):

    dossier_voix = V / "bases-fractions-short-ecritures"

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        bloc = VGroup(
            self.fraction(1, 5, font_size=76, color=JAUNE_TITRE),
            self.grand("0,2", font_size=64, color=BLEU_CALCUL),
            self.grand("20 %", font_size=64, color=VERT_OK),
        ).arrange(DOWN, buff=0.28).move_to([0, 1.7, 0])
        self.play(FadeIn(bloc, shift=DOWN * 0.15), run_time=0.5)
        q = VGroup(
            self.grand("le MÊME", font_size=40, color=WHITE),
            self.grand("nombre", font_size=40, color=WHITE),
        ).arrange(DOWN, buff=0.18).move_to([0, -0.9, 0])
        self.play(FadeIn(q, shift=UP * 0.12), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_decimal(self):
        self.clear()
        self.margo_bas()
        self.dire("01-decimal")
        self.play(Write(self.grand("Vers le décimal", font_size=40, color=JAUNE_TITRE).move_to([0, 3.1, 0])))
        bloc = VGroup(
            self.grand("je divise", font_size=36, color=WHITE),
            self.grand("le haut par le bas", font_size=34, color=WHITE),
            self.grand("1 ÷ 5 = 0,2", font_size=48, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.3).move_to([0, 1.4, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.42)
        self.attendre_voix(marge=0.4)

    def ecran_pourcentage(self):
        self.clear()
        self.margo_bas()
        self.dire("02-pourcentage")
        self.play(Write(self.grand("Vers le pourcentage", font_size=36, color=JAUNE_TITRE).move_to([0, 3.1, 0])))
        bloc = VGroup(
            self.grand("je multiplie", font_size=36, color=WHITE),
            self.grand("par 100", font_size=40, color=WHITE),
            self.grand("0,2 × 100 = 20", font_size=42, color=VERT_OK),
            self.grand("donc 20 %", font_size=48, color=VERT_OK),
        ).arrange(DOWN, buff=0.26).move_to([0, 1.3, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_meme_nombre(self):
        self.clear()
        self.margo_bas()
        self.dire("03-meme-nombre")
        # ⛔ L'étiquette d'un point se centre SUR LE POINT : « 1/5 = 0,2 = 20 % »
        # posée au-dessus de 0,2 sortait du cadre par la gauche (premier tirage).
        # Le point porte donc un libellé court, et l'égalité complète se pose au
        # centre de l'écran, où elle a toute la largeur.
        egal = self.grand("1/5 = 0,2 = 20 %", font_size=34, color=JAUNE_TITRE)
        egal.move_to([0, 3.0, 0])
        self.play(FadeIn(egal, shift=DOWN * 0.12))

        axe, marques = self.droite_fractions(
            [(0.2, "1/5", JAUNE_TITRE)],
            longueur=3.6, centre=[0, 1.7, 0], font_size=24)
        self.play(Create(axe))
        self.play(FadeIn(marques))
        note = VGroup(
            self.grand("exactement", font_size=36, color=WHITE),
            self.grand("le même point", font_size=40, color=VERT_OK),
        ).arrange(DOWN, buff=0.22).move_to([0, -0.1, 0])
        self.play(FadeIn(note, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def ecran_piege(self):
        self.clear()
        self.margo_bas()
        self.dire("04-piege")
        self.play(Write(self.grand("Mais attention", font_size=38, color=ROUGE_ERREUR).move_to([0, 3.1, 0])))
        bloc = VGroup(
            self.grand("1/3 = 0,333…", font_size=44, color=ROUGE_ERREUR),
            self.grand("ça ne s'arrête", font_size=32, color=WHITE),
            self.grand("JAMAIS", font_size=44, color=ROUGE_ERREUR),
            self.grand("ce n'est pas un bug", font_size=28, color=BLEU_CALCUL),
            self.grand("de la calculatrice", font_size=28, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.24).move_to([0, 1.2, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.36)
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche(); self.ecran_decimal(); self.ecran_pourcentage()
        self.ecran_meme_nombre(); self.ecran_piege(); self.ecran_renvoi()


# ══════════════════════════════════════════════════════════════════════════════
#  6. MULTIPLIER — ça passe tout droit
# ══════════════════════════════════════════════════════════════════════════════

class FractionsShortMultiplier(ShortBases):

    dossier_voix = V / "bases-fractions-short-multiplier"

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        expr = VGroup(
            self.fraction(2, 3, font_size=64, color=JAUNE_TITRE),
            self.grand("×", font_size=48, color=WHITE),
            self.fraction(3, 4, font_size=64, color=JAUNE_TITRE),
        ).arrange(RIGHT, buff=0.35).move_to([0, 2.0, 0])
        self.play(FadeIn(expr, shift=DOWN * 0.15), run_time=0.45)
        q = VGroup(
            self.grand("le calcul", font_size=34, color=WHITE),
            self.grand("le plus FACILE", font_size=40, color=VERT_OK),
        ).arrange(DOWN, buff=0.2).move_to([0, 0.3, 0])
        self.play(FadeIn(q, shift=UP * 0.12), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_regle(self):
        self.clear()
        self.margo_bas()
        self.dire("01-regle")
        bloc = VGroup(
            self.grand("les hauts entre eux", font_size=38, color=VERT_OK),
            self.grand("les bas entre eux", font_size=38, color=VERT_OK),
            self.grand("rien d'autre", font_size=34, color=WHITE),
        ).arrange(DOWN, buff=0.3).move_to([0, 1.6, 0])
        cadre = SurroundingRectangle(bloc, color=VERT_OK, buff=0.3, stroke_width=3)
        self.play(FadeIn(bloc), Create(cadre))
        self.attendre_voix(marge=0.4)

    def ecran_calcul(self):
        self.clear()
        self.margo_bas()
        self.dire("02-calcul")
        suite = VGroup(
            self.grand("2 × 3 = 6", font_size=44, color=BLEU_CALCUL),
            self.grand("3 × 4 = 12", font_size=44, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.3).move_to([0, 2.3, 0])
        for m in suite:
            self.play(FadeIn(m, shift=RIGHT * 0.12), run_time=0.42)
        res = self.fraction(6, 12, font_size=80, color=VERT_OK).move_to([0, 0.4, 0])
        self.play(FadeIn(res, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def ecran_simplifier(self):
        self.clear()
        self.margo_bas()
        self.dire("03-simplifier")
        res = VGroup(
            self.fraction(6, 12, font_size=64, color=WHITE),
            self.grand("=", font_size=44, color=WHITE),
            self.fraction(1, 2, font_size=64, color=VERT_OK),
        ).arrange(RIGHT, buff=0.4).move_to([0, 1.9, 0])
        self.play(FadeIn(res, shift=DOWN * 0.12))
        self.play(Circumscribe(res[2], color=VERT_OK, buff=0.2))
        note = self.grand("÷ 6 en haut et en bas", font_size=32, color=BLEU_CALCUL)
        note.move_to([0, 0.4, 0])
        self.play(FadeIn(note, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def ecran_tout_droit(self):
        self.clear()
        self.margo_bas()
        self.dire("04-tout-droit")
        bloc = VGroup(
            self.grand("ça passe", font_size=40, color=WHITE),
            self.grand("TOUT DROIT", font_size=54, color=VERT_OK),
        ).arrange(DOWN, buff=0.24).move_to([0, 2.2, 0])
        self.play(FadeIn(bloc, shift=DOWN * 0.12))
        self.play(Flash(bloc[1], color=VERT_OK, line_length=0.4))
        alerte = VGroup(
            self.grand("et c'est PARCE QUE", font_size=30, color=ORANGE_RETENUE),
            self.grand("c'est si simple", font_size=30, color=ORANGE_RETENUE),
            self.grand("qu'on se trompe", font_size=32, color=ROUGE_ERREUR),
            self.grand("sur l'addition", font_size=36, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.22).move_to([0, 0.1, 0])
        for m in alerte:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.36)
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche(); self.ecran_regle(); self.ecran_calcul()
        self.ecran_simplifier(); self.ecran_tout_droit(); self.ecran_renvoi()


# ══════════════════════════════════════════════════════════════════════════════
#  7. ADDITIONNER — ça ne passe PAS
# ══════════════════════════════════════════════════════════════════════════════

class FractionsShortAdditionner(ShortBases):

    dossier_voix = V / "bases-fractions-short-additionner"

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        expr = VGroup(
            self.fraction(1, 2, font_size=56, color=JAUNE_TITRE),
            self.grand("+", font_size=44, color=WHITE),
            self.fraction(1, 3, font_size=56, color=JAUNE_TITRE),
            self.grand("=", font_size=44, color=WHITE),
            self.fraction(2, 5, font_size=56, color=ROUGE_ERREUR),
        ).arrange(RIGHT, buff=0.26).move_to([0, 2.0, 0])
        self.play(FadeIn(expr, shift=DOWN * 0.15), run_time=0.5)
        q = self.grand("vraiment ?", font_size=52, color=WHITE).move_to([0, 0.5, 0])
        self.play(FadeIn(q, shift=UP * 0.12), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_verifier(self):
        self.clear()
        self.margo_bas()
        self.dire("01-verifier")
        self.play(Write(self.grand("Vérifions", font_size=42, color=JAUNE_TITRE).move_to([0, 3.1, 0])))
        bloc = VGroup(
            self.grand("1/2 = 0,5", font_size=38, color=BLEU_CALCUL),
            self.grand("1/3 ≈ 0,33", font_size=38, color=BLEU_CALCUL),
            self.grand("ensemble", font_size=32, color=WHITE),
            self.grand("plus de 0,8", font_size=44, color=VERT_OK),
        ).arrange(DOWN, buff=0.26).move_to([0, 1.3, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_faux(self):
        self.clear()
        self.margo_bas()
        self.dire("02-faux")
        bloc = VGroup(
            self.grand("or 2/5 = 0,4", font_size=44, color=ROUGE_ERREUR),
            self.grand("deux fois", font_size=34, color=ROUGE_ERREUR),
            self.grand("trop petit", font_size=44, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.28).move_to([0, 2.0, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.42)
        self.play(Flash(bloc[2], color=ROUGE_ERREUR, line_length=0.4))
        verdict = VGroup(
            self.grand("additionner", font_size=34, color=WHITE),
            self.grand("tout droit :", font_size=34, color=WHITE),
            self.grand("ça ne marche PAS", font_size=38, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.2).move_to([0, -0.4, 0])
        self.play(FadeIn(verdict, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def ecran_pourquoi(self):
        self.clear()
        self.margo_bas()
        self.dire("03-pourquoi")
        self.play(Write(self.grand("Pourquoi ?", font_size=42, color=JAUNE_TITRE).move_to([0, 3.15, 0])))
        b1 = self.barre_parts(2, 1, largeur=3.4, hauteur=0.55, centre=[0, 2.2, 0])
        l1 = self.grand("1/2", font_size=28, color=BLEU_CALCUL).move_to([0, 1.65, 0])
        b2 = self.barre_parts(3, 1, largeur=3.4, hauteur=0.55, centre=[0, 1.05, 0],
                              couleur=ORANGE_RETENUE)
        l2 = self.grand("1/3", font_size=28, color=ORANGE_RETENUE).move_to([0, 0.5, 0])
        self.play(Create(b1), FadeIn(l1))
        self.play(Create(b2), FadeIn(l2))
        note = VGroup(
            self.grand("pas la même", font_size=34, color=WHITE),
            self.grand("taille de part", font_size=34, color=WHITE),
            self.grand("impossible", font_size=32, color=ROUGE_ERREUR),
            self.grand("de les compter ensemble", font_size=26, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.2).move_to([0, -1.0, 0])
        for m in note:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.34)
        self.attendre_voix(marge=0.4)

    def ecran_solution(self):
        self.clear()
        self.margo_bas()
        self.dire("04-solution")
        self.play(Write(self.grand("La solution", font_size=42, color=VERT_OK).move_to([0, 3.15, 0])))
        suite = VGroup(
            self.grand("1/2 → 3/6", font_size=40, color=BLEU_CALCUL),
            self.grand("1/3 → 2/6", font_size=40, color=ORANGE_RETENUE),
            self.grand("même taille !", font_size=34, color=WHITE),
            self.grand("3 + 2 = 5/6", font_size=48, color=VERT_OK),
        ).arrange(DOWN, buff=0.26).move_to([0, 1.3, 0])
        for m in suite:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.4)
        self.play(Flash(suite[3], color=VERT_OK, line_length=0.35))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche(); self.ecran_verifier(); self.ecran_faux()
        self.ecran_pourquoi(); self.ecran_solution(); self.ecran_renvoi()


# ══════════════════════════════════════════════════════════════════════════════
#  8. L'ORDRE — la question du brevet des collèges
#
# ⛔ PROVENANCE : le brevet, PAS un test d'entrée à l'université (correction de
# Frédéric, 11/09). Citer la source d'une question, c'est une affirmation
# vérifiable — elle se dit juste ou ne se dit pas.
# ══════════════════════════════════════════════════════════════════════════════

class FractionsShortOrdre(ShortBases):

    dossier_voix = V / "bases-fractions-short-ordre"

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        origine = VGroup(
            self.grand("posé au brevet", font_size=32, color=BLEU_CALCUL),
            self.grand("des collèges", font_size=32, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.15).move_to([0, 2.9, 0])
        self.play(FadeIn(origine), run_time=0.4)
        expr = VGroup(
            self.fraction(2, 5, font_size=52, color=JAUNE_TITRE),
            self.grand("−", font_size=40, color=WHITE),
            self.fraction(3, 5, font_size=52, color=JAUNE_TITRE),
            self.grand("×", font_size=40, color=WHITE),
            self.fraction(1, 3, font_size=52, color=JAUNE_TITRE),
        ).arrange(RIGHT, buff=0.2).move_to([0, 1.3, 0])
        self.play(FadeIn(expr, shift=DOWN * 0.12), run_time=0.5)
        self.play(Flash(expr, color=JAUNE_TITRE, line_length=0.35))
        self.attendre_voix(marge=0.4)

    def ecran_piege(self):
        self.clear()
        self.margo_bas()
        self.dire("01-piege")
        self.play(Write(self.grand("Beaucoup font ça", font_size=36, color=ROUGE_ERREUR).move_to([0, 3.1, 0])))
        bloc = VGroup(
            self.grand("2/5 − 3/5", font_size=44, color=WHITE),
            self.grand("= − 1/5", font_size=48, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.3).move_to([0, 1.7, 0])
        cadre = SurroundingRectangle(bloc, color=ROUGE_ERREUR, buff=0.3, stroke_width=3)
        self.play(FadeIn(bloc), Create(cadre))
        barre = Line(cadre.get_corner(DL), cadre.get_corner(UR),
                     color=ROUGE_ERREUR, stroke_width=7)
        self.play(Create(barre))
        self.play(Write(self.grand("c'est FAUX", font_size=44, color=ROUGE_ERREUR).move_to([0, -0.5, 0])))
        self.attendre_voix(marge=0.4)

    def ecran_ordre(self):
        self.clear()
        self.margo_bas()
        self.dire("02-ordre")
        # ⚠️ « × » / « AVANT » / « − » empilés : le moins passait pour un
        # soulignement de AVANT. La règle tient sur UNE ligne, et c'est là
        # qu'elle se lit comme une règle.
        bloc = VGroup(
            self.grand("on ne calcule PAS", font_size=34, color=WHITE),
            self.grand("de gauche à droite", font_size=34, color=WHITE),
            self.grand("×  AVANT  −", font_size=56, color=VERT_OK),
            self.grand("Toujours.", font_size=38, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.42).move_to([0, 1.4, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.4)
        self.play(Flash(bloc[2], color=VERT_OK, line_length=0.35))
        self.attendre_voix(marge=0.4)

    def ecran_multiplier(self):
        self.clear()
        self.margo_bas()
        self.dire("03-multiplier")
        self.play(Write(self.grand("D'abord", font_size=40, color=JAUNE_TITRE).move_to([0, 3.15, 0])))
        # ⚠️ Une pile de FRACTIONS est bien plus haute qu'une pile de lignes :
        # centrée à 1,3 elle montait dans le titre. On la descend.
        suite = VGroup(
            VGroup(self.fraction(3, 5, font_size=40, color=WHITE),
                   self.grand("×", font_size=32, color=WHITE),
                   self.fraction(1, 3, font_size=40, color=WHITE)).arrange(RIGHT, buff=0.22),
            self.fraction(3, 15, font_size=48, color=BLEU_CALCUL),
            self.fraction(1, 5, font_size=56, color=VERT_OK),
        ).arrange(DOWN, buff=0.3).move_to([0, 0.7, 0])
        for m in suite:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.45)
        self.attendre_voix(marge=0.4)

    def ecran_soustraire(self):
        self.clear()
        self.margo_bas()
        self.dire("04-soustraire")
        self.play(Write(self.grand("Ensuite seulement", font_size=36, color=JAUNE_TITRE).move_to([0, 3.15, 0])))
        suite = VGroup(
            VGroup(self.fraction(2, 5, font_size=42, color=WHITE),
                   self.grand("−", font_size=34, color=WHITE),
                   self.fraction(1, 5, font_size=42, color=WHITE)).arrange(RIGHT, buff=0.25),
            self.grand("même dénominateur", font_size=28, color=BLEU_CALCUL),
            self.fraction(1, 5, font_size=76, color=VERT_OK),
        ).arrange(DOWN, buff=0.3).move_to([0, 0.7, 0])
        for m in suite:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.45)
        self.play(Flash(suite[2], color=VERT_OK, line_length=0.4))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche(); self.ecran_piege(); self.ecran_ordre()
        self.ecran_multiplier(); self.ecran_soustraire(); self.ecran_renvoi()
