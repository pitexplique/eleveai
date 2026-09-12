# gabarit_bases.py
# LES BASES — la série SANS CLASSE.
#
# ── POURQUOI CETTE SÉRIE (11/09/2026) ─────────────────────────────────────────
# Frédéric : « une vidéo sur les fractions, il n'y a pas de classe, elle serait
# transversale — c'est pour ma fille, et même au lycée ils font des erreurs ».
# Puis : « ça sert aussi aux étudiants qui veulent réviser ».
#
# ⭐ LES CHIFFRES LUI DONNENT RAISON : les fractions traversent DOUZE classes du
# coach, du CE1 à la première spé — 103 micro-compétences. Six fiches existent,
# trois scripts Manim aussi, mais TOUS étiquetés par classe, et aucun n'a jamais
# été publié. Rien ne les rassemble.
#
# ⛔ DONC AUCUNE ÉTIQUETTE DE NIVEAU, nulle part : ni « collège », ni « 5e », ni
# un âge. C'est la règle du 06/09 appliquée à la lettre — une étiquette dit
# aussi à qui ce n'est PAS destiné, et ici on vise le collégien, le lycéen ET
# l'étudiant qui révise.
#
# ⚠️ NUANCE : nommer l'ORIGINE d'une question n'est pas étiqueter l'audience.
# « Posé au brevet des collèges » dit d'où vient l'exercice, pas à qui la vidéo
# s'adresse — et l'argument est justement qu'il piège bien au-delà. Mais c'est
# une affirmation vérifiable : elle se dit juste, ou elle ne se dit pas.
#
# ⭐ L'ÉCRAN DE FIN EST PROPRE À LA SÉRIE (Frédéric, 11/09) : il renvoie au
# COACH — « entraîne-toi sur le coach maths, eleveai.fr » — et porte l'appel à
# l'abonnement. Pas de vidéo longue à pointer comme les shorts de notion, pas de
# rubrique comme « Les maths en vrai » : ici, la suite logique est de PRATIQUER.

from manim import *

from charte import *
from gabarit_seconde import NotionSeconde, ShortSeconde


class _Fractions:
    """Les objets que toute la série dessine : une fraction, un gâteau, une barre."""

    def fraction(self, num, den, font_size=44, color=WHITE,
                 color_num=None, color_den=None):
        """Une fraction ÉCRITE : numérateur, barre, dénominateur.

        ⛔ Pas de LaTeX sur ce poste : la barre est un `Line`, et elle prend la
        largeur du plus long des deux nombres.
        """
        n = Text(str(num), font_size=font_size, color=color_num or color)
        d = Text(str(den), font_size=font_size, color=color_den or color)
        larg = max(n.width, d.width) + 0.16
        barre = Line(LEFT * larg / 2, RIGHT * larg / 2, color=color, stroke_width=3.5)
        return VGroup(n, barre, d).arrange(DOWN, buff=0.10)

    def disque(self, parts, prises, rayon=1.0, centre=ORIGIN,
               couleur=BLEU_CALCUL, vide=None):
        """Un gâteau coupé en `parts`, dont `prises` sont coloriées.

        ⭐ C'est l'image qui fait comprendre le partage — et surtout celle qui
        montre qu'une même part peut s'écrire de deux façons : 3/4 et 6/8
        colorient EXACTEMENT la même surface.
        """
        # ⛔ LE TRAIT S'AFFINE QUAND LES PARTS SE MULTIPLIENT. À 100 parts et
        # 2,5 d'épaisseur, les bords se touchent : le gâteau entier sortait
        # BLANC, exactement le contraire de ce que l'écran voulait montrer.
        trait = max(0.5, min(2.5, 60.0 / parts))
        g = VGroup()
        for i in range(parts):
            # ⛔ `radius`, PAS `outer_radius` : dans cette version, `Sector` le
            # transmet lui-même a `AnnularSector`, et le passer ici leve un
            # « got multiple values » au rendu.
            s = Sector(radius=rayon,
                       start_angle=PI / 2 - (i + 1) * TAU / parts,
                       angle=TAU / parts,
                       stroke_width=trait, stroke_color=WHITE)
            s.set_fill(couleur if i < prises else (vide or BLACK),
                       opacity=0.85 if i < prises else 0.12)
            g.add(s)
        return g.move_to(centre)

    def barre_parts(self, parts, prises, largeur=5.0, hauteur=0.8,
                    centre=ORIGIN, couleur=BLEU_CALCUL):
        """Une barre coupée en `parts` — plus lisible qu'un disque pour COMPARER
        deux fractions, parce que les longueurs s'alignent."""
        g = VGroup()
        cw = largeur / parts
        for i in range(parts):
            r = Rectangle(width=cw, height=hauteur, stroke_width=2, color=WHITE)
            r.move_to([-largeur / 2 + cw * (i + 0.5), 0, 0])
            if i < prises:
                r.set_fill(couleur, opacity=0.85)
            g.add(r)
        return g.move_to(centre)

    def droite_fractions(self, points, longueur=8.0, centre=ORIGIN, font_size=26):
        """La droite graduée de 0 à 1 — l'image qui dit qu'une fraction est un
        NOMBRE, et pas seulement un partage."""
        axe = NumberLine(x_range=[0, 1, 1], length=longueur, include_numbers=True,
                         label_constructor=Text, font_size=font_size, color=WHITE)
        axe.move_to(centre)
        marques = VGroup()
        for valeur, texte, coul in points:
            p = Dot(axe.n2p(valeur), color=coul, radius=0.085)
            lab = Text(texte, font_size=font_size, color=coul).next_to(p, UP, buff=0.18)
            marques.add(VGroup(p, lab))
        return axe, marques


class NotionBases(NotionSeconde, _Fractions):
    """Une vidéo longue de la série « Les bases » — format paysage."""

    # ⭐ L'IDENTITÉ EST UN PARAMÈTRE (11/09/2026) : une vidéo d'actualité sans
    # classe (PISA 2025) reprend ce gabarit — même écran de fin vers le coach,
    # même absence d'étiquette — mais pas sous le nom « Les bases ».
    identite = "Les bases · EleveAI"

    def page_de_garde(self, titre, accroche, promesse, voix="00-garde"):
        """⛔ Identique à celle des notions, SAUF l'identité : pas de classe.
        « Les bases · EleveAI » remplace « Maths seconde — EleveAI »."""
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire(voix)

        t = Text(titre, font_size=54, color=JAUNE_TITRE).to_edge(UP, buff=0.9)
        if t.width > config.frame_width - 1.0:
            t.scale_to_fit_width(config.frame_width - 1.0)
        identite = Text(self.identite, font_size=30, color=WHITE)
        identite.next_to(t, DOWN, buff=0.35)
        acc = Text(accroche, font_size=34, color=BLEU_CALCUL)
        acc.next_to(identite, DOWN, buff=0.95)
        prom = Text(promesse, font_size=26, color=WHITE)
        prom.next_to(acc, DOWN, buff=0.55)

        self.play(Write(t), FadeIn(identite, shift=DOWN * 0.2))
        self.play(GrowFromCenter(acc))
        self.play(Flash(acc, color=BLEU_CALCUL, line_length=0.3))
        self.play(FadeIn(prom, shift=UP * 0.2))
        self.attendre_voix()

    def page_abonnement(self, voix="11-abonne"):
        """⭐ L'écran de fin de la série : le COACH d'abord, l'abonnement ensuite.
        La suite logique d'une leçon de base, c'est de s'entraîner.

        ⛔ CET ÉCRAN A SA PROPRE VOIX, et il la nomme. Écrit d'abord avec
        `dossier=None`, il cherchait `abonne.wav` dans le dossier de la notion —
        introuvable, et `dire()` renvoie 0 sans rien dire : la vidéo se terminait
        sur deux secondes de silence, et rien dans le rendu ne le signalait.
        ⚠️ On n'emprunte PAS `cp-commun/abonne.wav` : il est enregistré au débit
        du CP et ne parle pas du coach.
        """
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)

        entraine = Text("Entraîne-toi sur le coach", font_size=44, color=JAUNE_TITRE)
        entraine.move_to([0, 2.05, 0])
        site = Text("eleveai.fr", font_size=58, color=BLEU_CALCUL).move_to([0, 1.05, 0])
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)

        abonne = Text("Abonne-toi à la chaîne !", font_size=38, color=VERT_OK)
        abonne.move_to([0, -0.55, 0])
        poignee = Text("@eleveai974", font_size=46, color=VERT_OK).move_to([0, -1.5, 0])

        self.play(Write(entraine))
        self.play(GrowFromCenter(site), Create(cadre))
        self.play(FadeIn(abonne, shift=UP * 0.15))
        self.play(GrowFromCenter(poignee))
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3))
        self.attendre_voix(marge=1.4)


class ShortBases(ShortSeconde, _Fractions):
    """Un short de la série « Les bases » — format 9:16."""

    def ecran_renvoi(self, voix="05-fin"):
        """⭐ Le coach ET l'abonnement, sur un seul écran : un short n'a pas la
        place d'en faire deux, et la voix dit déjà les deux phrases."""
        self.clear()
        self.margo_bas()
        self.dire(voix)

        entraine = VGroup(
            self.grand("Entraîne-toi", font_size=42, color=JAUNE_TITRE),
            self.grand("sur le coach", font_size=42, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.18).move_to([0, 2.55, 0])
        self.play(FadeIn(entraine, shift=DOWN * 0.12))

        site = self.grand("eleveai.fr", font_size=52, color=BLEU_CALCUL).move_to([0, 1.25, 0])
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.24, stroke_width=3)
        self.play(GrowFromCenter(site), Create(cadre))

        abonne = self.grand("Abonne-toi !", font_size=40, color=VERT_OK).move_to([0, -0.15, 0])
        poignee = self.grand("@eleveai974", font_size=46, color=VERT_OK).move_to([0, -1.05, 0])
        cadre2 = SurroundingRectangle(poignee, color=VERT_OK, buff=0.22, stroke_width=3)
        self.play(FadeIn(abonne, shift=UP * 0.12))
        self.play(GrowFromCenter(poignee), Create(cadre2))
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3))

        auteur = self.grand("Frédéric Lacoste", font_size=24, color=WHITE).move_to([0, -2.1, 0])
        self.play(FadeIn(auteur))
        self.attendre_voix(marge=1.2)
