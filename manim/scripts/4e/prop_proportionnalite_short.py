# prop_proportionnalite_short.py
# EleveAI — Maths 4e — les HUIT shorts de la proportionnalité, un par micro
# (Frédéric, 04/10/2026). Voix validées le 04/10, débit −7 :
# manim/voix/4e-prop-proportionnalite-short-<nom>.json.
#   - ShortPropReconnaitre4e : salle de sport 30 € / 40 €, régulier ≠ proportionnel (prop_reconnaitre)
#   - ShortPropTableau4e     : 3 cookies 6 €, 5 cookies 10 € et pas 8 €          (prop_table)
#   - ShortPropGraphique4e   : une droite ne suffit pas, il faut l'origine        (prop_graphique)
#   - ShortPropUnite4e       : 5 croissants 6 € → 1,20 € → 8 croissants 9,60 €    (prop_coeff)
#   - ShortPropCroix4e       : 6 L pour 100 km → 15 L pour 250 km                 (prop_quatrieme)
#   - ShortPropProbleme4e    : le marathon en 70 minutes ? Non, environ 2 heures  (prop_probleme)
#   - ShortPropRelation4e    : y = x + 4 ? Non, y = 3 × x                         (prop_relation)
#   - ShortPropDefi4e        : 3 peintres 6 h → 6 peintres 3 h, pas 12 h          (prop_defi)
# Tous renvoient à la vidéo longue (prop_proportionnalite.py, https://youtu.be/ORVPvsNFTpY).
# ⛔ La voix correspond aux écrits : chaque nombre dit est écrit (`au_mot`).
#
# Rendu (un par classe) :
#   python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/prop_proportionnalite_short.py ShortPropTableau4e -o eleveai-maths-4e-prop-proportionnalite-short-tableau --media_dir manim/scripts/4e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *

from charte import *
from prop_ratio_short import Short4e

BLEU_P = "#3B82F6"
VERT_P = "#22C55E"
ROUGE_P = "#EF4444"
ORANGE_P = "#F59E0B"
GRIS_C = "#1E293B"


class ShortProp4e(Short4e):
    """Les dessins des shorts de proportionnalité."""

    def etiquette(self, texte, couleur, font_size=40):
        t = Text(texte, font_size=font_size, color=BLACK, weight=BOLD)
        fond = RoundedRectangle(width=t.width + 0.35, height=t.height + 0.28, corner_radius=0.12,
                                stroke_width=0).set_fill(couleur, opacity=1)
        g = VGroup(fond, t.move_to(fond))
        # ⛔ Le cadre vertical fait 4,5 : une étiquette ne le dépasse jamais.
        if g.width > config.frame_width - 0.5:
            g.scale_to_fit_width(config.frame_width - 0.5)
        return g

    def tableau(self, haut, bas, y, lignes=None, lc=1.0, ll=1.5, h=0.62, font_size=32):
        """Deux lignes, centrées. Renvoie (cadres, étiquettes, haut, bas, centres des cases du bas)."""
        n = len(haut)
        larg = (ll if lignes else 0) + lc * n
        x0 = -larg / 2
        cadres, etiq, th, tb, cases = VGroup(), VGroup(), VGroup(), VGroup(), []
        for r in range(2):
            yy = y - r * h
            if lignes:
                c = Rectangle(width=ll, height=h, stroke_width=2, color=GREY_B).set_fill(GRIS_C, opacity=1)
                c.move_to([x0 + ll / 2, yy, 0])
                cadres.add(c)
                etiq.add(Text(lignes[r], font_size=20, color=GREY_A).move_to(c))
            for j in range(n):
                x = x0 + (ll if lignes else 0) + lc * (j + 0.5)
                cadres.add(Rectangle(width=lc, height=h, stroke_width=2, color=GREY_B).move_to([x, yy, 0]))
                if r == 1:
                    cases.append(np.array([x, yy, 0]))
        for j in range(n):
            x = x0 + (ll if lignes else 0) + lc * (j + 0.5)
            th.add(Text(haut[j], font_size=font_size, color=WHITE).move_to([x, y, 0]))
            tb.add(Text(bas[j], font_size=font_size, color=BLEU_P).move_to([x, y - h, 0]))
        return cadres, etiq, th, tb, cases

    def axes(self, x_max, y_max, y_pas, centre, x_length=3.4, y_length=3.0, font_size=18):
        return Axes(
            x_range=[0, x_max, 1], y_range=[0, y_max, y_pas], x_length=x_length, y_length=y_length,
            axis_config={"include_numbers": True, "label_constructor": Text, "font_size": font_size,
                         "color": GREY_A},
            tips=False,
        ).move_to(centre)


# ═════════════════════════════════════════════════════════════════════════════
class ShortPropReconnaitre4e(ShortProp4e):
    nom_voix = "4e-prop-proportionnalite-short-reconnaitre"

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        self.play(Write(self.ligne("Salle de sport", 2.7, JAUNE_TITRE, 46)))
        self.au_mot("1 mois coûte 30")
        self.play(FadeIn(self.etiquette("1 mois : 30 €", WHITE, 40).move_to([0, 1.6, 0])))
        self.au_mot("2 mois coûtent 40")
        self.play(FadeIn(self.etiquette("2 mois : 40 €", WHITE, 40).move_to([0, 0.6, 0])))
        self.au_mot("Le prix est-il proportionnel")
        self.play(Write(self.ligne("Proportionnel ?", -0.6, ORANGE_RETENUE, 56)))
        self.attendre_voix(marge=0.4)

    def ecran_piege(self):
        self.clear()
        self.margo_bas()
        self.dire("01-piege")
        self.play(Write(self.ligne("30 € → 40 €", 2.4, WHITE, 56)))
        self.au_mot("toujours de 10 euros")
        self.play(Write(self.ligne("+ 10 € à chaque mois", 1.4, BLEU_CALCUL, 38)))
        self.au_mot("on croit que oui")
        f = self.ligne("donc oui ?", 0.4, WHITE, 50)
        self.play(Write(f))
        self.au_mot("régulier ne veut pas dire")
        self.play(Create(self.barrer(f)))
        self.play(Write(self.ligne("régulier ≠ proportionnel", -0.7, ROUGE_ERREUR, 40)))
        self.attendre_voix(marge=0.4)

    def ecran_quotients(self):
        self.clear()
        self.margo_bas()
        self.dire("02-quotients")
        self.play(Write(self.ligne("prix ÷ mois", 2.6, JAUNE_TITRE, 48)))
        self.au_mot("30 divisé par 1")
        self.play(Write(self.ligne("30 ÷ 1 = 30", 1.5, WHITE, 54)))
        self.au_mot("40 divisé par 2")
        self.play(Write(self.ligne("40 ÷ 2 = 20", 0.5, WHITE, 54)))
        self.au_mot("Le quotient change")
        self.play(Write(self.ligne("ça change !", -0.6, ROUGE_P, 56)))
        self.play(Write(self.ligne("pas proportionnel", -1.5, ROUGE_P, 42)))
        self.attendre_voix(marge=0.4)

    def ecran_reponse(self):
        self.clear()
        self.margo_bas()
        self.dire("03-reponse")
        self.au_mot("20 euros d'inscription")
        self.play(GrowFromCenter(self.etiquette("inscription : 20 €", ORANGE_P, 36).move_to([0, 2.5, 0])))
        self.au_mot("une seule fois")
        self.play(Write(self.ligne("payés une seule fois", 1.5, ORANGE_RETENUE, 40)))
        self.au_mot("le double")
        self.play(Write(self.ligne("si proportionnel :", 0.6, GREY_B, 38)))
        self.play(Write(self.ligne("2 mois = 2 × 30", -0.2, WHITE, 46)))
        self.au_mot("60 euros")
        self.play(Write(self.ligne("= 60 €", -1.2, VERT_OK, 64)))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_piege()
        self.ecran_quotients()
        self.ecran_reponse()
        self.defi("04-defi", [("40 euros de déplacement", "déplacement : 40 €", WHITE, 44),
                              ("30 euros de l'heure", "+ 30 € l'heure", WHITE, 44),
                              ("proportionnel au temps", "proportionnel ?", JAUNE_TITRE, 52)])
        self.ecran_renvoi("05-fin")


# ═════════════════════════════════════════════════════════════════════════════
class ShortPropTableau4e(ShortProp4e):
    nom_voix = "4e-prop-proportionnalite-short-tableau"

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        cookies = VGroup(*[Circle(radius=0.32, stroke_width=3, color="#92400E").set_fill("#D97706", opacity=1)
                           for _ in range(3)]).arrange(RIGHT, buff=0.2).move_to([0, 2.5, 0])
        self.play(LaggedStart(*[FadeIn(c, scale=0.5) for c in cookies], lag_ratio=0.2))
        self.play(Write(self.ligne("3 cookies : 6 €", 1.5, WHITE, 50)))
        self.au_mot("Combien coûtent 5 cookies")
        self.play(Write(self.ligne("5 cookies : ?", 0.5, JAUNE_TITRE, 50)))
        self.au_mot("8 euros ?")
        self.play(Write(self.ligne("8 € ?", -0.6, ORANGE_RETENUE, 70)))
        self.attendre_voix(marge=0.4)

    def ecran_piege(self):
        self.clear()
        self.margo_bas()
        self.dire("01-piege")
        cadres, etiq, th, tb, cases = self.tableau(["3", "5"], ["6", "8"], 2.3, lc=1.3)
        self.play(FadeIn(cadres), FadeIn(th), FadeIn(tb[0]))
        self.au_mot("En haut, j'ajoute 2")
        self.play(Write(self.ligne("+ 2 en haut", 0.9, BLEU_CALCUL, 42)))
        self.au_mot("en bas, j'ajoute 2")
        self.play(FadeIn(tb[1]))
        self.play(Create(self.barrer(tb[1])))
        self.au_mot("on n'ajoute pas")
        self.play(Write(self.ligne("on n'ajoute pas", -0.1, ROUGE_P, 44)))
        self.au_mot("on multiplie")
        self.play(Write(self.ligne("on MULTIPLIE", -1.1, VERT_OK, 56)))
        self.attendre_voix(marge=0.4)

    def ecran_coefficient(self):
        self.clear()
        self.margo_bas()
        self.dire("02-coefficient")
        self.play(Write(self.ligne("Le coefficient", 2.7, JAUNE_TITRE, 48)))
        self.au_mot("6 divisé par 3")
        self.play(Write(self.ligne("6 ÷ 3 = 2", 1.7, WHITE, 60)))
        self.au_mot("Un cookie coûte 2 euros")
        self.play(Write(self.ligne("1 cookie : 2 €", 0.7, VERT_OK, 48)))
        self.au_mot("je multiplie par 2")
        cadres, etiq, th, tb, cases = self.tableau(["3", "5"], ["6", ""], -0.5, lc=1.0)
        fl = Arrow([1.3, -0.45, 0], [1.3, -1.15, 0], buff=0, color=JAUNE_TITRE, stroke_width=6)
        k = Text("× 2", font_size=34, color=JAUNE_TITRE).next_to(fl, RIGHT, buff=0.08)
        self.play(FadeIn(cadres), FadeIn(th), FadeIn(tb[0]), GrowArrow(fl), Write(k))
        self.attendre_voix(marge=0.4)

    def ecran_reponse(self):
        self.clear()
        self.margo_bas()
        self.dire("03-reponse")
        cadres, etiq, th, tb, cases = self.tableau(["3", "5"], ["6", "10"], 2.3, lc=1.3)
        self.add(cadres, th, tb[0])
        self.au_mot("5 fois 2")
        self.play(Write(self.ligne("5 × 2 = 10 €", 0.8, VERT_OK, 64)))
        self.play(FadeIn(tb[1].set_color(VERT_OK)))
        self.au_mot("Pas 8 euros")
        f = self.ligne("8 €", -0.5, ROUGE_P, 64)
        self.play(FadeIn(f))
        self.play(Create(self.barrer(f)))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_piege()
        self.ecran_coefficient()
        self.ecran_reponse()
        self.defi("04-defi", [("4 correspond à 10", "4 → 10", WHITE, 64),
                              ("À quoi correspond 6", "6 → ?", JAUNE_TITRE, 64)])
        self.ecran_renvoi("05-fin")


# ═════════════════════════════════════════════════════════════════════════════
class ShortPropGraphique4e(ShortProp4e):
    nom_voix = "4e-prop-proportionnalite-short-graphique"

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        ax = self.axes(6, 20, 5, [0.15, 1.3, 0], font_size=16)
        self.play(Create(ax))
        self.au_mot("une belle droite qui monte")
        self.play(Create(Line(ax.c2p(0, 5), ax.c2p(6, 17), color=BLEU_P, stroke_width=5)))
        self.au_mot("forcément proportionnel")
        self.play(Write(self.ligne("Proportionnel ?", -1.0, ORANGE_RETENUE, 56)))
        self.attendre_voix(marge=0.4)

    def ecran_piege(self):
        self.clear()
        self.margo_bas()
        self.dire("01-piege")
        f = self.ligne("une droite = proportionnel ?", 2.2, WHITE, 40)
        self.play(Write(f))
        self.au_mot("Une droite ne suffit pas")
        self.play(Create(self.barrer(f)))
        self.play(Write(self.ligne("une droite ne suffit pas", 1.0, ROUGE_P, 40)))
        self.au_mot("passer par l'origine")
        self.play(Write(self.ligne("+ passer par l'origine", -0.1, VERT_OK, 42)))
        self.play(Write(self.ligne("(0 ; 0)", -1.1, VERT_OK, 60)))
        self.attendre_voix(marge=0.4)

    def ecran_deux(self):
        self.clear()
        self.margo_bas()
        self.dire("02-deux-droites")
        ax = self.axes(5, 20, 5, [0.15, 1.15, 0], font_size=16)
        self.add(ax)
        self.au_mot("Un marcheur")
        self.play(Write(self.ligne("marcheur : 4 km par heure", 3.2, BLEU_P, 30)))
        self.au_mot("0 heure, 0 kilomètre")
        o = Dot(ax.c2p(0, 0), radius=0.1, color=BLEU_P)
        self.play(GrowFromCenter(o))
        self.au_mot("Sa droite part de l'origine")
        self.play(Create(Line(ax.c2p(0, 0), ax.c2p(5, 20), color=BLEU_P, stroke_width=5)))
        self.play(Write(self.ligne("par l'origine : oui", -1.2, BLEU_P, 36)))
        self.au_mot("Une plante mesure 5")
        self.play(Write(self.ligne("plante : 5 cm, + 2 cm par jour", -1.85, ORANGE_P, 28)))
        self.au_mot("Sa droite part de 5")
        p = Dot(ax.c2p(0, 5), radius=0.1, color=ORANGE_P)
        self.play(GrowFromCenter(p), Create(Line(ax.c2p(0, 5), ax.c2p(5, 15), color=ORANGE_P, stroke_width=5)))
        self.au_mot("pas proportionnel")
        self.play(Write(self.ligne("part de 5 : non", -2.45, ORANGE_P, 36)))
        self.attendre_voix(marge=0.4)

    def ecran_reponse(self):
        self.clear()
        self.margo_bas()
        self.dire("03-reponse")
        self.play(Write(self.ligne("Proportionnel =", 2.6, JAUNE_TITRE, 48)))
        self.au_mot("des points alignés")
        self.play(Write(self.ligne("1. des points alignés", 1.5, WHITE, 42)))
        self.au_mot("avec l'origine")
        self.play(Write(self.ligne("2. avec l'origine", 0.6, WHITE, 42)))
        self.au_mot("Les deux conditions")
        self.play(Write(self.ligne("les DEUX !", -0.6, VERT_OK, 70)))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_piege()
        self.ecran_deux()
        self.ecran_reponse()
        self.defi("04-defi", [("par l'origine", "droite par l'origine", WHITE, 42),
                              ("le point 5 ; 15", "et par (5 ; 15)", WHITE, 50),
                              ("quand x vaut 8", "x = 8 → y = ?", JAUNE_TITRE, 54)])
        self.ecran_renvoi("05-fin")


# ═════════════════════════════════════════════════════════════════════════════
class ShortPropUnite4e(ShortProp4e):
    nom_voix = "4e-prop-proportionnalite-short-unite"

    def croissants(self, n, y, couleur="#F59E0B"):
        g = VGroup(*[Ellipse(width=0.5, height=0.3, stroke_width=2, color=WHITE).set_fill(couleur, opacity=1)
                     for _ in range(n)])
        return g.arrange(RIGHT, buff=0.08).move_to([0, y, 0])

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        c = self.croissants(5, 2.6)
        self.play(LaggedStart(*[FadeIn(x, scale=0.5) for x in c], lag_ratio=0.15))
        self.play(Write(self.ligne("5 croissants : 6 €", 1.7, WHITE, 46)))
        self.au_mot("Combien coûtent 8")
        self.play(FadeIn(self.croissants(8, 0.6)))
        self.play(Write(self.ligne("8 croissants : ?", -0.3, JAUNE_TITRE, 46)))
        self.attendre_voix(marge=0.4)

    def ecran_piege(self):
        self.clear()
        self.margo_bas()
        self.dire("01-piege")
        self.play(Write(self.ligne("Passer par 1 croissant", 2.5, JAUNE_TITRE, 40)))
        self.play(FadeIn(self.croissants(1, 1.6)))
        self.au_mot("5 divisé par 6")
        f = self.ligne("5 ÷ 6", 0.4, WHITE, 80)
        self.play(Write(f))
        self.au_mot("c'est faux")
        self.play(Create(self.barrer(f)))
        self.play(Write(self.ligne("le mauvais sens !", -0.8, ROUGE_P, 46)))
        self.attendre_voix(marge=0.4)

    def ecran_unite(self):
        self.clear()
        self.margo_bas()
        self.dire("02-unite")
        self.au_mot("le prix divisé par le nombre")
        self.play(Write(self.ligne("prix ÷ nombre", 2.5, JAUNE_TITRE, 48)))
        self.au_mot("6 divisé par 5")
        self.play(Write(self.ligne("6 ÷ 5", 1.3, WHITE, 70)))
        self.au_mot("1 euro 20")
        self.play(FadeIn(self.croissants(1, 0.2)))
        self.play(Write(self.ligne("1 croissant : 1,20 €", -0.6, VERT_OK, 44)))
        self.attendre_voix(marge=0.4)

    def ecran_reponse(self):
        self.clear()
        self.margo_bas()
        self.dire("03-reponse")
        self.play(FadeIn(self.croissants(8, 2.4)))
        self.au_mot("8 fois 1 virgule 20")
        self.play(Write(self.ligne("8 × 1,20", 1.2, WHITE, 70)))
        self.au_mot("9 euros 60")
        self.play(Write(self.ligne("= 9,60 €", -0.1, VERT_OK, 80)))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_piege()
        self.ecran_unite()
        self.ecran_reponse()
        self.defi("04-defi", [("4 kilos de pommes", "4 kg de pommes : 10 €", WHITE, 40),
                              ("Combien coûtent 7 kilos", "7 kg : ?", JAUNE_TITRE, 60)])
        self.ecran_renvoi("05-fin")


# ═════════════════════════════════════════════════════════════════════════════
class ShortPropCroix4e(ShortProp4e):
    nom_voix = "4e-prop-proportionnalite-short-croix"

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        self.play(Write(self.ligne("6 L pour 100 km", 2.3, WHITE, 54)))
        self.au_mot("Combien pour 250")
        self.play(Write(self.ligne("? L pour 250 km", 1.0, JAUNE_TITRE, 54)))
        self.attendre_voix(marge=0.4)

    def ecran_piege(self):
        self.clear()
        self.margo_bas()
        self.dire("01-piege")
        self.play(Write(self.ligne("Produit en croix", 2.6, JAUNE_TITRE, 48)))
        self.au_mot("multiplient les mauvais nombres")
        f = self.ligne("250 × 100 ÷ 6", 1.4, WHITE, 56)
        self.play(Write(f))
        self.au_mot("plus de 4 000 litres")
        self.play(Write(self.ligne("≈ 4 167 L !", 0.3, ROUGE_P, 64)))
        self.play(Create(self.barrer(f)))
        self.attendre_voix(marge=0.4)

    def ecran_tableau(self):
        self.clear()
        self.margo_bas()
        self.dire("02-tableau")
        cadres, etiq, th, tb, cases = self.tableau(["100", "250"], ["6", ""], 2.6, ["km", "litres"], lc=1.15, ll=1.2)
        self.au_mot("en haut les kilomètres")
        self.play(FadeIn(cadres), FadeIn(etiq), Write(th))
        self.au_mot("En bas les litres")
        q = Text("?", font_size=34, color=JAUNE_TITRE).move_to(cases[1])
        self.play(Write(tb[0]), Write(q))
        self.au_mot("Je multiplie en diagonale")
        diag = Line(th[1].get_center() + DL * 0.15, tb[0].get_center() + UR * 0.15, color=JAUNE_TITRE, stroke_width=5)
        self.play(Create(diag))
        self.au_mot("250 fois 6")
        self.play(Write(self.ligne("250 × 6 = 1 500", 0.9, WHITE, 50)))
        self.au_mot("je divise par le nombre qui reste")
        self.play(Create(Circle(radius=0.36, color=ORANGE_P, stroke_width=4).move_to(th[0])))
        self.play(Write(self.ligne("1 500 ÷ 100", -0.2, WHITE, 50)))
        self.attendre_voix(marge=0.4)

    def ecran_reponse(self):
        self.clear()
        self.margo_bas()
        self.dire("03-reponse")
        self.play(Write(self.ligne("15 litres", 2.3, VERT_OK, 80)))
        self.au_mot("Je contrôle")
        self.play(Write(self.ligne("contrôle :", 1.1, JAUNE_TITRE, 44)))
        self.au_mot("2 fois et demie 100")
        self.play(Write(self.ligne("250 = 2,5 × 100", 0.2, WHITE, 46)))
        self.au_mot("6 fois 2 virgule 5")
        self.play(Write(self.ligne("6 × 2,5 = 15", -0.7, VERT_OK, 52)))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_piege()
        self.ecran_tableau()
        self.ecran_reponse()
        self.defi("04-defi", [("4 litres pour 100", "4 L pour 100 km", WHITE, 52),
                              ("Combien pour 350", "? L pour 350 km", JAUNE_TITRE, 52)])
        self.ecran_renvoi("05-fin")


# ═════════════════════════════════════════════════════════════════════════════
class ShortPropProbleme4e(ShortProp4e):
    nom_voix = "4e-prop-proportionnalite-short-probleme"

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        self.play(Write(self.ligne("100 m en 10 s", 2.4, WHITE, 60)))
        self.au_mot("un marathon")
        self.play(Write(self.ligne("marathon : 42 km", 1.2, WHITE, 50)))
        self.au_mot("en 70 minutes")
        self.play(Write(self.ligne("en 70 min ?", 0.0, ORANGE_RETENUE, 64)))
        self.attendre_voix(marge=0.4)

    def ecran_piege(self):
        self.clear()
        self.margo_bas()
        self.dire("01-piege")
        self.play(Write(self.ligne("produit en croix", 2.6, GREY_B, 40)))
        f = self.ligne("70 min", 1.6, WHITE, 70)
        self.play(Write(f))
        self.au_mot("le record du monde")
        self.play(Create(self.barrer(f)))
        self.play(Write(self.ligne("record du monde :", 0.3, JAUNE_TITRE, 44)))
        self.au_mot("environ 2 heures")
        self.play(Write(self.ligne("≈ 2 heures !", -0.7, VERT_OK, 70)))
        self.attendre_voix(marge=0.4)

    def ecran_doubler(self):
        self.clear()
        self.margo_bas()
        self.dire("02-doubler")
        self.au_mot("si je double la distance")
        self.play(Write(self.ligne("distance × 2", 2.4, BLEU_CALCUL, 52)))
        self.au_mot("le temps double-t-il")
        self.play(Write(self.ligne("temps × 2 ?", 1.4, WHITE, 52)))
        self.au_mot("on se fatigue")
        self.play(Write(self.ligne("on se fatigue, on ralentit", 0.3, ORANGE_RETENUE, 34)))
        self.au_mot("Ce n'est pas proportionnel")
        self.play(Write(self.ligne("pas proportionnel", -0.7, ROUGE_P, 52)))
        self.attendre_voix(marge=0.4)

    def ecran_reponse(self):
        self.clear()
        self.margo_bas()
        self.dire("03-reponse")
        self.play(Write(self.ligne("Le produit en croix", 2.5, JAUNE_TITRE, 46)))
        self.au_mot("ne prévient pas")
        self.play(Write(self.ligne("ne prévient pas", 1.5, ROUGE_P, 52)))
        self.au_mot("C'est à moi de vérifier")
        self.play(Write(self.ligne("D'ABORD je vérifie", 0.2, VERT_OK, 52)))
        self.play(Write(self.ligne("que c'est proportionnel", -0.7, VERT_OK, 40)))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_piege()
        self.ecran_doubler()
        self.ecran_reponse()
        self.defi("04-defi", [("Le prix de l'essence", "prix et litres d'essence", WHITE, 36),
                              ("La taille d'un enfant", "taille et âge d'un enfant", WHITE, 36),
                              ("Le périmètre d'un carré", "périmètre et côté d'un carré", WHITE, 34),
                              (None, "proportionnel ?", JAUNE_TITRE, 52)])
        self.ecran_renvoi("05-fin")


# ═════════════════════════════════════════════════════════════════════════════
class ShortPropRelation4e(ShortProp4e):
    nom_voix = "4e-prop-proportionnalite-short-relation"

    def table(self, y):
        return self.tableau(["2", "5"], ["6", "15"], y, ["x", "y"], lc=1.15, ll=0.8, font_size=36)

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        cadres, etiq, th, tb, cases = self.table(2.6)
        self.add(cadres, etiq)
        self.au_mot("x vaut 2, y vaut 6")
        self.play(Write(th[0]), Write(tb[0]))
        self.au_mot("x vaut 5, y vaut 15")
        self.play(Write(th[1]), Write(tb[1]))
        self.au_mot("y égale x plus 4")
        self.play(Write(self.ligne("y = x + 4 ?", 0.6, ORANGE_RETENUE, 70)))
        self.attendre_voix(marge=0.4)

    def ecran_piege(self):
        self.clear()
        self.margo_bas()
        self.dire("01-piege")
        cadres, etiq, th, tb, cases = self.table(2.6)
        self.add(cadres, etiq, th, tb)
        self.au_mot("Pour 2 et 6")
        self.play(Write(self.ligne("2 + 4 = 6", 1.0, VERT_OK, 56)))
        self.au_mot("5 plus 4")
        self.play(Write(self.ligne("5 + 4 = 9", 0.0, ROUGE_P, 56)))
        self.au_mot("pas 15")
        self.play(Write(self.ligne("pas 15 !", -1.0, ROUGE_P, 56)))
        self.au_mot("toutes les colonnes")
        self.play(Write(self.ligne("toutes les colonnes", -1.9, JAUNE_TITRE, 38)))
        self.attendre_voix(marge=0.4)

    def ecran_coefficient(self):
        self.clear()
        self.margo_bas()
        self.dire("02-coefficient")
        self.play(Write(self.ligne("y ÷ x", 2.6, JAUNE_TITRE, 56)))
        self.au_mot("6 divisé par 2")
        self.play(Write(self.ligne("6 ÷ 2 = 3", 1.5, WHITE, 56)))
        self.au_mot("15 divisé par 5")
        self.play(Write(self.ligne("15 ÷ 5 = 3", 0.5, WHITE, 56)))
        self.au_mot("Toujours 3")
        self.play(Write(self.ligne("toujours 3 : le coefficient", -0.6, VERT_OK, 36)))
        self.attendre_voix(marge=0.4)

    def ecran_reponse(self):
        self.clear()
        self.margo_bas()
        self.dire("03-reponse")
        self.au_mot("y égale 3 fois x")
        self.play(GrowFromCenter(self.ligne("y = 3 × x", 2.2, VERT_OK, 90)))
        self.au_mot("3 fois 2, 6")
        self.play(Write(self.ligne("3 × 2 = 6", 0.7, WHITE, 52)))
        self.au_mot("3 fois 5, 15")
        self.play(Write(self.ligne("3 × 5 = 15", -0.3, WHITE, 52)))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_piege()
        self.ecran_coefficient()
        self.ecran_reponse()
        self.defi("04-defi", [("x vaut 4, y vaut 10", "x = 4 → y = 10", WHITE, 50),
                              ("x vaut 10, y vaut 25", "x = 10 → y = 25", WHITE, 50),
                              ("Écris la relation", "y = ?", JAUNE_TITRE, 70)])
        self.ecran_renvoi("05-fin")


# ═════════════════════════════════════════════════════════════════════════════
class ShortPropDefi4e(ShortProp4e):
    nom_voix = "4e-prop-proportionnalite-short-defi"

    def peintres(self, n, y, couleur=BLEU_P):
        def bonhomme():
            tete = Circle(radius=0.1, color=couleur, stroke_width=4).set_fill(couleur, opacity=1)
            corps = Line(DOWN * 0.1, DOWN * 0.42, color=couleur, stroke_width=5)
            bras = VGroup(Line(DOWN * 0.18, DOWN * 0.34 + LEFT * 0.15, color=couleur, stroke_width=4),
                          Line(DOWN * 0.18, DOWN * 0.34 + RIGHT * 0.15, color=couleur, stroke_width=4))
            jambes = VGroup(Line(DOWN * 0.42, DOWN * 0.66 + LEFT * 0.13, color=couleur, stroke_width=4),
                            Line(DOWN * 0.42, DOWN * 0.66 + RIGHT * 0.13, color=couleur, stroke_width=4))
            return VGroup(tete, corps, bras, jambes)
        return VGroup(*[bonhomme() for _ in range(n)]).arrange(RIGHT, buff=0.18).move_to([0, y, 0])

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        p = self.peintres(3, 2.7)
        self.play(LaggedStart(*[FadeIn(x, shift=UP * 0.2) for x in p], lag_ratio=0.2))
        self.play(Write(self.ligne("3 peintres : 6 h", 1.8, WHITE, 52)))
        self.au_mot("pour 6 peintres")
        self.play(FadeIn(self.peintres(6, 0.9)))
        self.play(Write(self.ligne("6 peintres : ?", 0.0, JAUNE_TITRE, 52)))
        self.au_mot("12 heures ?")
        self.play(Write(self.ligne("12 h ?", -1.0, ORANGE_RETENUE, 70)))
        self.attendre_voix(marge=0.4)

    def ecran_piege(self):
        self.clear()
        self.margo_bas()
        self.dire("01-piege")
        f = self.ligne("6 × 6 ÷ 3 = 12 h", 2.3, WHITE, 50)
        self.play(Write(f))
        self.au_mot("on va plus vite")
        self.play(Create(self.barrer(f)))
        self.play(Write(self.ligne("plus de peintres", 1.0, VERT_OK, 46)))
        self.play(Write(self.ligne("= plus VITE !", 0.1, VERT_OK, 56)))
        self.attendre_voix(marge=0.4)

    def ecran_doubler(self):
        self.clear()
        self.margo_bas()
        self.dire("02-doubler")
        self.au_mot("Je double les peintres")
        self.play(Write(self.ligne("peintres : 3 → 6", 2.5, BLEU_CALCUL, 46)))
        self.play(Write(self.ligne("× 2", 1.6, BLEU_CALCUL, 56)))
        self.au_mot("il est divisé par 2")
        self.play(Write(self.ligne("temps : ÷ 2", 0.5, ORANGE_P, 56)))
        self.au_mot("Ce n'est pas de la proportionnalité")
        self.play(Write(self.ligne("pas proportionnel", -0.7, ROUGE_P, 52)))
        self.attendre_voix(marge=0.4)

    def ecran_reponse(self):
        self.clear()
        self.margo_bas()
        self.dire("03-reponse")
        self.play(FadeIn(self.peintres(6, 2.6)))
        self.au_mot("6 divisé par 2")
        self.play(Write(self.ligne("6 h ÷ 2 = 3 h", 1.4, VERT_OK, 60)))
        self.au_mot("est interdit")
        self.play(Write(self.ligne("produit en croix :", 0.1, ROUGE_P, 44)))
        self.play(GrowFromCenter(self.ligne("INTERDIT", -0.9, ROUGE_P, 76)))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_piege()
        self.ecran_doubler()
        self.ecran_reponse()
        self.defi("04-defi", [("4 robinets", "4 robinets : 10 h", WHITE, 50),
                              ("avec 8 robinets", "8 robinets : ?", JAUNE_TITRE, 50),
                              ("Et avec 2", "2 robinets : ?", JAUNE_TITRE, 50)])
        self.ecran_renvoi("05-fin")
