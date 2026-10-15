# gabarit_diagonale.py
# Ce que partagent les trois shorts « Diagonale des Fous 2026 » (09/10/2026).
#
# Frédéric, 09/10 : trois shorts autour du Grand Raid (départ jeudi 15/10,
# 22 h), chacun branché sur un micro DÉFI du coach. Chiffres : recherche web du
# 09/10 (180 km, 10 200 m D+, ancien tracé 175 km / 10 500 m, vainqueur 2025
# Baptiste Chassagne en 23 h 31 min 54 s).
#
# ⛔ Tout short finit par une QUESTION à laquelle on répond en commentaire
# (Frédéric, 09/10 : « j'adore recevoir les commentaires ») → `ecran_question`.

from manim import *

from charte import *
from gabarit_sixieme import Short6e


# ── Le parcours officiel 2026 (descriptif de l'organisation, reçu le 11/10) ──
# ⚠️ Km de Roche Plate absent du tableau : 116,5 estimé. Positions carte approchées.
# (km, altitude, nom, longitude, latitude, étiquette sur la carte ?)
PARCOURS = [
    (0, 2, "Saint-Pierre", 55.465, -21.335, DOWN),
    (6.6, 131, "Bassin Plat", 55.49, -21.32, None),
    (14, 649, "Domaine Vidot", 55.54, -21.30, None),
    (33.4, 1686, "Notre-Dame de la Paix", 55.60, -21.26, None),
    (45.4, 2023, "Nez de Bœuf", 55.62, -21.21, RIGHT),
    (51, 1686, "Chalet des Pâtres", 55.60, -21.195, None),
    (55.6, 1604, "Mare à Boue", 55.565, -21.175, None),
    (65.1, 2187, "Coteau Kerveguen", 55.51, -21.125, None),
    (67.6, 2475, "Croisée Kerveguen", 55.49, -21.11, None),
    (70.5, 2154, "Cap Anglais", 55.50, -21.09, None),
    (76.4, 1502, "Bélouve", 55.535, -21.07, None),
    (80.6, 995, "Hell-Bourg", 55.52, -21.06, RIGHT),
    (84.3, 745, "Bras Marron", 55.51, -21.045, None),
    (85.9, 896, "Mare d'Affouches", 55.495, -21.04, None),
    (87.2, 1051, "Grand Sable", 55.48, -21.045, None),
    (93.1, 1775, "Col de Fourche", 55.455, -21.05, None),
    (93.8, 1808, "Plaine des Merles", 55.445, -21.045, None),
    (96, 1635, "Sentier Scout", 55.435, -21.04, None),
    (102.4, 896, "La Plaque", 55.425, -21.055, None),
    (104.4, 889, "Îlet à Bourse", 55.42, -21.06, None),
    (107.8, 665, "Grand Place", 55.405, -21.065, None),
    (111.3, 544, "Roche Ancrée", 55.395, -21.07, None),
    (116.5, 1256, "Roche Plate", 55.385, -21.075, None),
    (118.9, 1294, "La Brèche", 55.38, -21.075, None),
    (122.4, 2029, "Ti Col", 55.378, -21.072, None),
    (123.9, 1950, "Maïdo", 55.37, -21.07, LEFT),
    (140.5, 133, "Îlet Savannah", 55.30, -21.00, LEFT),
    (147.9, 440, "Ratinaud", 55.33, -20.96, None),
    (153.9, 52, "Grande Montagne", 55.34, -20.935, None),
    (155.1, 20, "La Possession", 55.345, -20.925, LEFT),
    (164.5, 10, "Grande Chaloupe", 55.385, -20.905, None),
    (169, 456, "Saint-Bernard", 55.405, -20.905, None),
    (173.8, 682, "Colorado", 55.425, -20.905, None),
    (177.8, 347, "La Vigie", 55.44, -20.895, None),
    (180.8, 49, "La Redoute", 55.45, -20.89, UP),
]

ALT_MAX = 2475


class ShortDiagonale(Short6e):
    """Un short 9:16 de la série Diagonale des Fous."""

    def zone(self, *mobs):
        """Remplace ce qui occupe le milieu de l'écran."""
        anciens = getattr(self, "_zone", None)
        nouveau = VGroup(*mobs)
        anims = [FadeIn(nouveau, shift=UP * 0.15)] if len(nouveau) else []
        if anciens is not None and len(anciens):
            anims[:0] = [FadeOut(m) for m in anciens]
        if anims:
            self.play(*anims)
        self._zone = nouveau
        return nouveau

    def ajouter(self, *mobs, anim=None):
        """Ajoute au milieu sans effacer ce qui y est déjà."""
        for m in mobs:
            self.play(anim(m) if anim else FadeIn(m, shift=UP * 0.15))
            self._zone.add(m)

    def bandeau(self, texte="Diagonale des Fous 2026"):
        t = Text(texte, font_size=22, color=JAUNE_TITRE).move_to([0, 2.85, 0])
        self.play(Write(t))
        self._bandeau = t
        return t

    def accroche_sauf_a(self):
        """« Les maths, ça sert à rien… sauf à courir la Diagonale des Fous. »"""
        self.dire("00-accroche")
        a = VGroup(self.grand("Les maths,", font_size=50),
                   self.grand("ça sert à rien…", font_size=50)).arrange(DOWN, buff=0.2)
        a.move_to([0, 1.6, 0])
        self.play(Write(a))
        self.au_mot("sauf à")
        b = VGroup(self.grand("… sauf à courir", font_size=42, color=JAUNE_TITRE),
                   self.grand("la Diagonale", font_size=50, color=JAUNE_TITRE),
                   self.grand("des Fous", font_size=50, color=JAUNE_TITRE)).arrange(DOWN, buff=0.15)
        b.move_to([0, -0.6, 0])
        self.play(FadeIn(b, scale=1.2))
        self.attendre_voix(marge=0.4)
        self.play(FadeOut(a), FadeOut(b))

    def barre(self, valeur, vmax, texte, couleur, y, largeur_max=3.6, hauteur=0.42):
        """Une barre horizontale proportionnelle, son texte posé dessus."""
        l = largeur_max * valeur / vmax
        r = Rectangle(width=l, height=hauteur, stroke_width=0,
                      fill_color=couleur, fill_opacity=0.85)
        r.move_to([-largeur_max / 2 + l / 2, y, 0])
        t = Text(texte, font_size=24, color=WHITE).move_to(r.get_center())
        if t.width > l - 0.1:
            t.next_to(r, RIGHT, buff=0.08)
        return VGroup(r, t)

    def ecran_regle(self, voix, lignes, couleur=JAUNE_TITRE):
        """La phrase à retenir, en grand, seule à l'écran."""
        self.dire(voix)
        self.play(*[FadeOut(m) for m in self.mobjects if m not in self._margo])
        self._zone = None
        g = VGroup(*[self.grand(l, font_size=40, color=couleur) for l in lignes])
        g.arrange(DOWN, buff=0.25).move_to([0, 0.6, 0])
        self.play(LaggedStart(*[FadeIn(m, shift=UP * 0.2) for m in g], lag_ratio=0.5))
        self.play(Circumscribe(g, color=couleur))
        self.attendre_voix(marge=0.6)
        self.play(FadeOut(g))

    def ecran_fin(self):
        """⚠️ Pas de « vidéo complète » à pointer : ces shorts n'ont pas de
        paysage. La fin est l'écran d'abonnement (voix partagée `abonne.wav`)."""
        self.clear()
        self.margo_bas()
        self.page_abonnement()

    def ecran_question(self, voix, lignes, fin="Réponds en commentaire !"):
        """⛔ La question finale : on y répond en commentaire."""
        self.dire(voix)
        a = self.grand("À toi !", font_size=60, color=ORANGE_RETENUE).move_to([0, 2.3, 0])
        self.play(GrowFromCenter(a))
        q = VGroup(*[self.grand(l, font_size=36) for l in lignes]).arrange(DOWN, buff=0.2)
        q.move_to([0, 0.75, 0])
        self.play(LaggedStart(*[FadeIn(m, shift=UP * 0.15) for m in q], lag_ratio=0.4))
        self.au_mot("commentaire")
        c = self.grand(fin, font_size=34, color=VERT_OK).move_to([0, -1.1, 0])
        cadre = SurroundingRectangle(c, color=VERT_OK, buff=0.2, stroke_width=3)
        self.play(FadeIn(c, scale=1.2), Create(cadre))
        self.play(Indicate(c, color=VERT_OK))
        self.attendre_voix(marge=1.6)
