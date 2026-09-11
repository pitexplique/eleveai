# temperature_altitude_notion.py
# EleveAI — « Les maths en vrai » — La température et l'altitude
# LA VIDÉO LONGUE et ses deux shorts supplémentaires.
#
# ⭐ FORMAT HABITUEL APPLIQUÉ À LA SÉRIE 974 (Frédéric, 10/09/2026 : « on va
# faire comme d'habitude, tu vas créer le paysage et des shorts »). Le short
# `temperature_altitude.py` reste le premier de la fratrie ; celui-ci ajoute la
# vidéo paysage et deux shorts de plus.
#
# ⛔ CE N'EST PAS UNE VIDÉO DE NOTION. Pas de notionId, pas de fiche : la série
# vit dans « Les maths en vrai » (`/maths-974`) et renvoie à SA rubrique.
# ⭐ Mais les gestes viennent du coach de seconde : `affine_forme` (reconnaitre
# une fonction affine) et `fonction_antecedent` (rechercher un antécédent).
#
# ⭐⭐ CE QUI FAIT LA VALEUR DE CETTE VIDÉO, ET QU'AUCUNE FICHE NE DIT :
# l'écran des LIMITES. Le modèle affine ignore le vent, la saison, et surtout
# l'opposition côte au vent / côte sous le vent — Saint-Benoît est à 24 °C et
# Saint-Gilles à 26 °C alors que les deux sont au niveau de la mer. Un modèle
# n'est pas la réalité : il en donne une bonne idée, et on doit savoir où il
# s'arrête. C'est cela qu'on veut faire réfléchir.
#
# Rendu :
#   python -m manim render -qh --disable_caching manim/scripts/974/temperature_altitude_notion.py TemperatureAltitude974Longue -o eleveai-maths-974-temperature-altitude-paysage --media_dir manim/scripts/974/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from carte_reunion import LIEUX, PENTE, T0, CarteReunion, temperature
from gabarit_seconde import SONS, NotionSeconde, ShortSeconde

VOIX = SONS / "974-temperature-altitude"
VOIX_ANT = SONS / "974-temperature-altitude-short-antecedent"
VOIX_POURQUOI = SONS / "974-temperature-altitude-short-pourquoi"

# Les lieux du relevé, du bord de mer au sommet.
RELEVE = ["Saint-Gilles", "Saint-Denis", "Cilaos", "Le Maïdo", "Piton des Neiges"]


class _Commun:
    """Ce qui sert à la vidéo longue comme aux shorts."""

    def montagne(self, largeur=3.8, hauteur=2.4, centre=ORIGIN):
        """Une coupe de l'île : la mer, et le sommet."""
        g = centre + np.array([-largeur / 2, -hauteur / 2, 0])
        d = centre + np.array([largeur / 2, -hauteur / 2, 0])
        s = centre + np.array([0.05 * largeur, hauteur / 2, 0])
        mont = Polygon(g, s, d, color=VERT_OK, stroke_width=3)
        mont.set_fill(VERT_OK, opacity=0.22)
        mer = Line(g + LEFT * 0.5, d + RIGHT * 0.5, color=BLEU_CALCUL, stroke_width=4)
        return VGroup(mer, mont), s, g

    def graphique(self, x_length=6.0, y_length=3.6, centre=ORIGIN, font_size=20):
        axes = self.axes_notion([0, 3200, 1000], [0, 30, 10],
                                x_length=x_length, y_length=y_length, font_size=font_size)
        axes.move_to(centre)
        droite = axes.plot(lambda h: temperature(h), x_range=[0, 3100, 50],
                           color=BLEU_CALCUL, stroke_width=5)
        return axes, droite


class TemperatureAltitude974Longue(NotionSeconde, _Commun):

    dossier_voix = VOIX

    # ── écran 1 : le constat, sur la carte ─────────────────────────────────

    def ecran_constat(self):
        self.clear()
        self.dire("01-constat")
        self.titre_ecran("Le même matin, sur la même île")

        carte = CarteReunion(hauteur=4.4, centre=[-3.1, -0.5, 0])
        self.add(carte.mer())
        self.play(FadeIn(carte.contour()))

        # Les cinq relevés s'allument un par un, du plus chaud au plus froid.
        directions = {"Saint-Gilles": DR, "Saint-Denis": UR, "Cilaos": RIGHT,
                      "Le Maïdo": UR, "Piton des Neiges": DR}
        lignes = VGroup()
        for nom in RELEVE:
            _, _, alt, t = LIEUX[nom]
            coul = JAUNE_TITRE if t >= 20 else BLEU_CALCUL
            self.play(FadeIn(carte.pastille(nom, f"{t}°", couleur=coul, taille=26,
                                            direction=directions[nom])),
                      run_time=0.42)
            lignes.add(VGroup(
                Text(nom, font_size=24, color=WHITE),
                Text(f"{alt} m", font_size=24, color=BLEU_CALCUL),
                Text(f"{t}°", font_size=26, color=coul),
            ).arrange(RIGHT, buff=0.45))

        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.34).move_to([3.4, 0.35, 0])
        self.play(LaggedStart(*[FadeIn(l, shift=RIGHT * 0.15) for l in lignes],
                              lag_ratio=0.22))

        ecart = Text("20 degrés d'écart", font_size=34, color=ORANGE_RETENUE)
        ecart.move_to([3.4, -1.85, 0])
        self.play(Write(ecart))
        self.play(Write(self.chute("Et jamais plus de 30 km entre les deux.")))
        self.attendre_voix()

    # ── écran 2 : la cause physique ────────────────────────────────────────

    def ecran_cause(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-cause")
        self.titre_ecran("La cause : l'altitude, pas la distance")

        coupe, sommet, base = self.montagne(largeur=4.0, hauteur=2.4, centre=[-3.3, -0.9, 0])
        self.play(Create(coupe))

        # ⭐ DEUX COLONNES D'AIR, pas une nappe : c'est leur DIFFÉRENCE DE
        # HAUTEUR qui explique tout. Au-dessus du bord de mer, une haute colonne
        # d'air appuie ; au-dessus du sommet, il en reste beaucoup moins.
        # ⚠️ Premier tirage : des rangées superposées au-dessus de la montagne —
        # on ne comprenait pas que l'air s'amincissait.
        def colonne(x, y_bas, y_haut, couleur):
            pts = VGroup()
            y = y_bas
            while y <= y_haut:
                pts.add(Dot([x, y, 0], color=couleur, radius=0.052))
                y += 0.30
            return pts

        col_mer = colonne(-4.7, -1.75, 2.25, BLEU_CALCUL)
        col_sommet = colonne(-3.1, 0.85, 2.25, BLEU_CALCUL)
        self.play(LaggedStart(*[FadeIn(d) for d in col_mer], lag_ratio=0.05))
        self.play(LaggedStart(*[FadeIn(d) for d in col_sommet], lag_ratio=0.08))

        # ⚠️ À GAUCHE, pas dessous : sous la colonne, l'étiquette tombait sur la
        # ligne de mer et s'y faisait barrer.
        beaucoup = Text("beaucoup", font_size=22, color=BLEU_CALCUL)
        beaucoup2 = Text("d'air", font_size=22, color=BLEU_CALCUL)
        VGroup(beaucoup, beaucoup2).arrange(DOWN, buff=0.1).next_to(col_mer, LEFT, buff=0.18)
        peu = Text("peu d'air", font_size=22, color=BLEU_CALCUL)
        peu.next_to(col_sommet, UP, buff=0.12)
        self.play(FadeIn(beaucoup), FadeIn(beaucoup2), FadeIn(peu))

        explique = VGroup(
            Text("plus on monte,", font_size=30, color=WHITE),
            Text("moins il y a d'air au-dessus", font_size=30, color=WHITE),
            Text("l'air se DÉTEND", font_size=32, color=JAUNE_TITRE),
            Text("et un gaz qui se détend", font_size=28, color=WHITE),
            Text("se REFROIDIT", font_size=32, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.28).move_to([3.2, 0.3, 0])
        for m in explique:
            self.play(FadeIn(m, shift=RIGHT * 0.15), run_time=0.45)

        self.play(Write(self.chute("Comme une bombe aérosol qui refroidit dans la main.")))
        self.attendre_voix()

    # ── écran 3 : le gradient, une proportionnalité ────────────────────────

    def ecran_gradient(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-gradient")
        self.titre_ecran("La règle : −0,65 °C tous les 100 m")

        regle = Text("− 0,65 °C  pour  + 100 m", font_size=42, color=BLEU_CALCUL)
        cadre = SurroundingRectangle(regle, color=BLEU_CALCUL, buff=0.3, stroke_width=3)
        VGroup(regle, cadre).move_to([0, 2.0, 0])
        self.play(FadeIn(regle), Create(cadre))

        # La proportionnalité, montrée sur trois paliers.
        lignes = VGroup()
        for h, dt in [(100, "− 0,65 °C"), (1000, "− 6,5 °C"), (2000, "− 13 °C")]:
            lignes.add(VGroup(
                Text(f"+ {h} m", font_size=32, color=WHITE),
                Text("→", font_size=32, color=BLEU_CALCUL),
                Text(dt, font_size=32, color=ORANGE_RETENUE),
            ).arrange(RIGHT, buff=0.5))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.0, 0])
        for l in lignes:
            self.play(FadeIn(l, shift=RIGHT * 0.2), run_time=0.5)

        note = Text("la perte est PROPORTIONNELLE à l'altitude gagnée",
                    font_size=30, color=VERT_OK).move_to([0, -1.75, 0])
        if note.width > 11.5:
            note.scale_to_fit_width(11.5)
        self.play(Write(note))
        self.attendre_voix()

    # ── écran 4 : la fonction affine ───────────────────────────────────────

    def ecran_affine(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-affine")
        self.titre_ecran("Une fonction affine")

        formule = Text("T = 26 − 0,0065 × h", font_size=46, color=JAUNE_TITRE)
        formule.move_to([0, 2.15, 0])
        self.play(FadeIn(formule, shift=DOWN * 0.15))

        axes, droite = self.graphique(x_length=5.6, y_length=3.2, centre=[-3.0, -0.85, 0])
        self.play(Create(axes))
        self.play(Create(droite))
        for nom in RELEVE:
            _, _, alt, t = LIEUX[nom]
            coul = JAUNE_TITRE if t >= 20 else BLEU_CALCUL
            self.play(GrowFromCenter(Dot(axes.c2p(alt, t), color=coul, radius=0.07)),
                      run_time=0.28)

        lecture = VGroup(
            VGroup(Text("26", font_size=34, color=JAUNE_TITRE),
                   Text("l'ordonnée à l'origine", font_size=25, color=WHITE),
                   ).arrange(DOWN, buff=0.14),
            Text("la température à h = 0", font_size=24, color=WHITE),
            VGroup(Text("− 0,0065", font_size=34, color=BLEU_CALCUL),
                   Text("le coefficient directeur", font_size=25, color=WHITE),
                   ).arrange(DOWN, buff=0.14),
            Text("négatif : la droite descend", font_size=24, color=WHITE),
        ).arrange(DOWN, buff=0.4).move_to([3.4, -0.6, 0])
        for m in lecture:
            self.play(FadeIn(m, shift=RIGHT * 0.15), run_time=0.5)
        self.attendre_voix()

    # ── écran 5 : les deux sens ────────────────────────────────────────────

    def ecran_deux_sens(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-deux-sens")
        self.titre_ecran("Elle se lit dans les deux sens")

        gauche = VGroup(
            Text("l'altitude → la température", font_size=30, color=VERT_OK),
            Text("je REMPLACE", font_size=34, color=VERT_OK),
            Text("c'est une IMAGE", font_size=30, color=WHITE),
            Text("un calcul", font_size=26, color=WHITE),
        ).arrange(DOWN, buff=0.3).move_to([-3.4, 0.5, 0])
        cadre_g = SurroundingRectangle(gauche, color=VERT_OK, buff=0.3, stroke_width=2.5)

        droite = VGroup(
            Text("la température → l'altitude", font_size=30, color=ORANGE_RETENUE),
            Text("je RÉSOUS", font_size=34, color=ORANGE_RETENUE),
            Text("c'est un ANTÉCÉDENT", font_size=30, color=WHITE),
            Text("une équation", font_size=26, color=WHITE),
        ).arrange(DOWN, buff=0.3).move_to([3.4, 0.5, 0])
        cadre_d = SurroundingRectangle(droite, color=ORANGE_RETENUE, buff=0.3, stroke_width=2.5)

        self.play(FadeIn(gauche), Create(cadre_g))
        self.play(FadeIn(droite), Create(cadre_d))

        fleche = Arrow([-1.0, 0.5, 0], [1.0, 0.5, 0], buff=0.1, color=WHITE, stroke_width=3)
        fleche2 = Arrow([1.0, -0.1, 0], [-1.0, -0.1, 0], buff=0.1, color=WHITE, stroke_width=3)
        self.play(Create(fleche), Create(fleche2))

        self.play(Write(self.chute("La même fonction, deux questions différentes.")))
        self.attendre_voix()

    # ── écran 6 : ⭐ LES LIMITES DU MODÈLE ─────────────────────────────────

    def ecran_limites(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-limites")
        self.titre_ecran("Ce que le modèle ignore")

        oublis = VGroup(
            Text("le vent", font_size=30, color=WHITE),
            Text("l'humidité", font_size=30, color=WHITE),
            Text("la saison", font_size=30, color=WHITE),
        ).arrange(RIGHT, buff=0.9).move_to([0, 2.05, 0])
        self.play(LaggedStart(*[FadeIn(m, shift=DOWN * 0.12) for m in oublis], lag_ratio=0.3))

        # ⭐ La preuve locale : deux villes au niveau de la mer, deux températures.
        carte = CarteReunion(hauteur=3.0, centre=[-3.3, -0.85, 0])
        self.add(carte.mer())
        self.play(FadeIn(carte.contour()))
        self.play(FadeIn(carte.pastille("Saint-Gilles", "26°", couleur=JAUNE_TITRE,
                                        taille=26, direction=DR)),
                  FadeIn(carte.pastille("Saint-Benoît", "24°", couleur=BLEU_CALCUL,
                                        taille=26, direction=LEFT)))

        constat = VGroup(
            Text("les deux au niveau de la mer", font_size=28, color=WHITE),
            Text("et 2 degrés d'écart", font_size=32, color=ORANGE_RETENUE),
            Text("côte au vent, à l'est :", font_size=26, color=BLEU_CALCUL),
            Text("plus fraîche, plus humide", font_size=26, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.32).move_to([3.2, -0.3, 0])
        for m in constat:
            self.play(FadeIn(m, shift=RIGHT * 0.15), run_time=0.5)

        self.play(Write(self.chute("Un modèle n'est pas la réalité : sache où il s'arrête.",
                                   color=JAUNE_TITRE)))
        self.attendre_voix()

    # ── défi ───────────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        titre = Text("Défi", font_size=48, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        rappel = Text("T = 26 − 0,0065 × h", font_size=38, color=BLEU_CALCUL)
        rappel.move_to([0, 2.0, 0])
        self.play(FadeIn(rappel))

        q = VGroup(
            Text("1.  Quelle température à 1500 m ?", font_size=34, color=WHITE),
            Text("2.  À quelle altitude fait-il 20 °C ?", font_size=34, color=WHITE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.55).move_to([0, 0.5, 0])
        for m in q:
            self.play(FadeIn(m, shift=RIGHT * 0.2), run_time=0.55)

        indice = Text("La deuxième demande de résoudre une équation.",
                      font_size=28, color=ORANGE_RETENUE).move_to([0, -0.95, 0])
        self.play(FadeIn(indice, shift=UP * 0.15))

        pause = self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=32)
        self.play(Write(pause), Flash(pause, color=ORANGE_RETENUE, line_length=0.25))
        self.attendre_voix(marge=4.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-correction")
        self.titre_ecran("Correction")

        t1 = Text("1.  une IMAGE : je remplace", font_size=28, color=VERT_OK)
        t1.move_to([-3.4, 2.15, 0])
        self.play(Write(t1))
        c1 = VGroup(
            Text("26 − 0,0065 × 1500", font_size=30, color=WHITE),
            Text("= 26 − 9,75", font_size=30, color=WHITE),
            Text("≈ 16 °C", font_size=38, color=VERT_OK),
        ).arrange(DOWN, buff=0.28).move_to([-3.4, 0.8, 0])
        for m in c1:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.42)

        t2 = Text("2.  un ANTÉCÉDENT : je résous", font_size=28, color=ORANGE_RETENUE)
        t2.move_to([3.2, 2.15, 0])
        self.play(Write(t2))
        c2 = VGroup(
            Text("26 − 0,0065 h = 20", font_size=30, color=WHITE),
            Text("− 0,0065 h = − 6", font_size=30, color=WHITE),
            Text("h ≈ 923 m", font_size=38, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.28).move_to([3.2, 0.8, 0])
        for m in c2:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.42)
        self.play(Circumscribe(c2[2], color=ORANGE_RETENUE, buff=0.18))

        lieu = Text("≈ l'altitude de la Plaine des Palmistes",
                    font_size=32, color=JAUNE_TITRE).move_to([0, -1.5, 0])
        self.play(Write(lieu))
        self.play(Write(self.chute("Un antécédent, et c'est un endroit réel.")))
        self.attendre_voix()

    def construct(self):
        self.page_de_garde(
            titre="La température et l'altitude",
            accroche="26° à Saint-Gilles, 11° au Maïdo. Pourquoi ?",
            promesse="Comprendre · modéliser · prévoir",
        )
        self.page_objectifs([
            "expliquer pourquoi il fait plus froid en altitude",
            "écrire la fonction affine qui relie température et altitude",
            "s'en servir dans les deux sens",
        ])
        self.ecran_constat()
        self.ecran_cause()
        self.ecran_gradient()
        self.ecran_affine()
        self.ecran_deux_sens()
        self.ecran_limites()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "on perd 0,65 °C tous les 100 mètres",
                "T = 26 − 0,0065 h : une affine de pente NÉGATIVE",
                "image dans un sens, antécédent dans l'autre",
            ],
            rappel="Un modèle n'est pas la réalité — sache où il s'arrête.",
        )
        self.page_abonnement()


# ══════════════════════════════════════════════════════════════════════════════
#  LES DEUX SHORTS SUPPLÉMENTAIRES
#  (le premier de la fratrie est dans `temperature_altitude.py`)
# ══════════════════════════════════════════════════════════════════════════════

class _Short974(ShortSeconde, _Commun):
    """L'écran de fin de la série — il renvoie à la RUBRIQUE, pas à une vidéo."""

    def ecran_renvoi(self, voix="05-fin"):
        self.clear()
        self.margo_bas()
        self.dire(voix)
        titre = VGroup(
            self.grand("Les maths", font_size=48, color=JAUNE_TITRE),
            self.grand("en vrai", font_size=48, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.15).move_to([0, 2.3, 0])
        self.play(FadeIn(titre, shift=DOWN * 0.12))
        site = self.grand("eleveai.fr", font_size=54, color=BLEU_CALCUL).move_to([0, 0.9, 0])
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        self.play(GrowFromCenter(site), Create(cadre))
        self.play(Flash(site, color=BLEU_CALCUL, line_length=0.3))
        sous = self.grand("les maths de l'île", font_size=34, color=VERT_OK).move_to([0, -0.5, 0])
        self.play(FadeIn(sous, shift=UP * 0.12))
        auteur = VGroup(
            self.grand("Frédéric Lacoste", font_size=26, color=WHITE),
            self.grand("La Réunion", font_size=26, color=WHITE),
        ).arrange(DOWN, buff=0.15).move_to([0, -1.6, 0])
        self.play(FadeIn(auteur))
        self.attendre_voix(marge=1.4)


class TemperatureAltitude974ShortAntecedent(_Short974):
    """L'ANTÉCÉDENT — à quelle altitude fait-il 20 °C ?"""

    dossier_voix = VOIX_ANT

    def ecran_accroche(self):
        self.clear()
        self.dire("00-accroche")
        carte = CarteReunion(hauteur=2.9, centre=[0.2, 1.5, 0])
        self.add(carte.mer())
        self.play(FadeIn(carte.contour()), run_time=0.45)
        q = VGroup(
            self.grand("où fait-il", font_size=40, color=WHITE),
            self.grand("20 °C ?", font_size=88, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.25).move_to([0, -1.3, 0])
        self.play(FadeIn(q, shift=UP * 0.12), run_time=0.45)
        self.play(Flash(q[1], color=JAUNE_TITRE, line_length=0.4))
        self.attendre_voix(marge=0.4)

    def ecran_formule(self):
        self.clear()
        self.margo_bas()
        self.dire("01-formule")
        self.play(Write(self.grand("La règle", font_size=42, color=JAUNE_TITRE).move_to([0, 3.15, 0])))
        bloc = VGroup(
            self.grand("26 °C au bord de l'eau", font_size=30, color=WHITE),
            self.grand("− 0,65 °C / 100 m", font_size=36, color=BLEU_CALCUL),
            self.grand("T = 26 − 0,0065 h", font_size=42, color=VERT_OK),
        ).arrange(DOWN, buff=0.32).move_to([0, 1.4, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.45)
        self.attendre_voix(marge=0.4)

    def ecran_equation(self):
        self.clear()
        self.margo_bas()
        self.dire("02-equation")
        haut = VGroup(
            self.grand("on CONNAÎT T", font_size=38, color=VERT_OK),
            self.grand("on cherche h", font_size=38, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.25).move_to([0, 2.4, 0])
        self.play(FadeIn(haut, shift=DOWN * 0.12))
        bas = VGroup(
            self.grand("pas un calcul :", font_size=34, color=WHITE),
            self.grand("une ÉQUATION", font_size=48, color=ORANGE_RETENUE),
            self.grand("26 − 0,0065 h = 20", font_size=38, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.3).move_to([0, 0.4, 0])
        for m in bas:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.45)
        self.attendre_voix(marge=0.4)

    def ecran_resoudre(self):
        self.clear()
        self.margo_bas()
        self.dire("03-resoudre")
        suite = VGroup(
            self.grand("26 − 0,0065 h = 20", font_size=36, color=WHITE),
            self.grand("− 0,0065 h = − 6", font_size=36, color=WHITE),
            self.grand("h ≈ 923", font_size=72, color=VERT_OK),
        ).arrange(DOWN, buff=0.38).move_to([0, 1.5, 0])
        for m in suite:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.5)
        note = VGroup(
            self.grand("les deux moins", font_size=30, color=ORANGE_RETENUE),
            self.grand("s'annulent", font_size=30, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.18).move_to([0, -1.1, 0])
        self.play(FadeIn(note, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def ecran_lieu(self):
        self.clear()
        self.dire("04-lieu")
        carte = CarteReunion(hauteur=2.9, centre=[0.2, 1.4, 0])
        self.add(carte.mer())
        self.play(FadeIn(carte.contour()))
        self.play(FadeIn(carte.pastille("Plaine-des-Palmistes", "≈ 20°",
                                        couleur=VERT_OK, taille=36, direction=UR)))
        bloc = VGroup(
            self.grand("923 m", font_size=64, color=VERT_OK),
            self.grand("la Plaine", font_size=34, color=WHITE),
            self.grand("des Palmistes", font_size=34, color=WHITE),
        ).arrange(DOWN, buff=0.22).move_to([0, -1.5, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.42)
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_formule()
        self.ecran_equation()
        self.ecran_resoudre()
        self.ecran_lieu()
        self.ecran_renvoi()


class TemperatureAltitude974ShortPourquoi(_Short974):
    """LE POURQUOI — plus près du soleil, et pourtant plus froid."""

    dossier_voix = VOIX_POURQUOI

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        t = VGroup(
            self.grand("plus près", font_size=46, color=JAUNE_TITRE),
            self.grand("du soleil", font_size=46, color=JAUNE_TITRE),
            self.grand("et pourtant", font_size=34, color=WHITE),
            self.grand("plus FROID", font_size=54, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.24).move_to([0, 1.5, 0])
        self.play(FadeIn(t[0]), FadeIn(t[1]), run_time=0.45)
        self.play(FadeIn(t[2]), FadeIn(t[3]), run_time=0.45)
        self.play(Flash(t[3], color=BLEU_CALCUL, line_length=0.4))
        self.attendre_voix(marge=0.4)

    def ecran_paradoxe(self):
        self.clear()
        self.margo_bas()
        self.dire("01-paradoxe")
        coupe, sommet, base = self.montagne(largeur=3.4, hauteur=2.2, centre=[0, 1.5, 0])
        self.play(Create(coupe))
        haut = VGroup(
            self.grand("3070 m", font_size=32, color=BLEU_CALCUL),
            self.grand("6 °C", font_size=42, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.12).move_to([0, 3.1, 0])
        bas = VGroup(
            self.grand("0 m", font_size=32, color=JAUNE_TITRE),
            self.grand("26 °C", font_size=42, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.12).move_to([0, -0.4, 0])
        self.play(FadeIn(haut), FadeIn(bas))
        self.play(Write(self.grand("20 °C d'écart", font_size=44,
                                   color=ORANGE_RETENUE).move_to([0, -1.6, 0])))
        self.attendre_voix(marge=0.4)

    def ecran_distance(self):
        self.clear()
        self.margo_bas()
        self.dire("02-distance")
        self.play(Write(self.grand("Le soleil ?", font_size=44, color=JAUNE_TITRE).move_to([0, 3.15, 0])))
        bloc = VGroup(
            self.grand("150 000 000 km", font_size=44, color=WHITE),
            self.grand("3 km de plus", font_size=36, color=BLEU_CALCUL),
            self.grand("ou de moins", font_size=36, color=BLEU_CALCUL),
            self.grand("ça ne compte pas", font_size=38, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.3).move_to([0, 1.3, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.42)
        self.attendre_voix(marge=0.4)

    def ecran_air(self):
        self.clear()
        self.margo_bas()
        self.dire("03-air")
        self.play(Write(self.grand("C'est l'AIR", font_size=52, color=JAUNE_TITRE).move_to([0, 3.15, 0])))
        bloc = VGroup(
            self.grand("moins d'air au-dessus", font_size=32, color=WHITE),
            self.grand("il appuie moins", font_size=32, color=WHITE),
            self.grand("l'air se DÉTEND", font_size=40, color=BLEU_CALCUL),
            self.grand("et se REFROIDIT", font_size=40, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.3).move_to([0, 1.3, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.42)
        self.attendre_voix(marge=0.4)

    def ecran_aerosol(self):
        self.clear()
        self.margo_bas()
        self.dire("04-aerosol")
        self.play(Write(self.grand("Tu l'as déjà senti", font_size=40,
                                   color=JAUNE_TITRE).move_to([0, 3.15, 0])))

        # La bombe aérosol : un cylindre et son jet.
        corps = RoundedRectangle(width=0.75, height=1.5, corner_radius=0.12,
                                 color=WHITE, stroke_width=3).move_to([0, 1.5, 0])
        buse = Rectangle(width=0.22, height=0.3, color=WHITE, stroke_width=3)
        buse.next_to(corps, UP, buff=0)
        self.play(Create(corps), Create(buse))
        jet = VGroup(*[Dot([0.35 + k * 0.22, 2.5 + k * 0.12, 0],
                           color=BLEU_CALCUL, radius=0.05) for k in range(5)])
        self.play(LaggedStart(*[FadeIn(d) for d in jet], lag_ratio=0.15))

        froid = self.grand("le tube devient FROID", font_size=34, color=BLEU_CALCUL)
        froid.move_to([0, -0.2, 0])
        self.play(Write(froid))
        meme = VGroup(
            self.grand("c'est le même", font_size=32, color=WHITE),
            self.grand("phénomène", font_size=32, color=WHITE),
        ).arrange(DOWN, buff=0.18).move_to([0, -1.4, 0])
        self.play(FadeIn(meme, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_paradoxe()
        self.ecran_distance()
        self.ecran_air()
        self.ecran_aerosol()
        self.ecran_renvoi()
