# exponentielle.py
# EleveAI — Maths première spécialité — La fonction exponentielle (notionId : exponentielle)
#
# ⭐ TROIS VIDÉOS PAYSAGE, DEUX FICHES (Frédéric, 15/09/2026 : « il faut suivre
# fiche 1 pour la première et fiche 2 pour la deuxième », puis « tu peux faire
# 3 vidéos, et dans la description je rajouterai le lien vers la fiche »,
# « avec enseignement explicite en annonçant l'objectif »).
#
#   ExponentielleCalculer  → fiche partie 1, première moitié : définition, e,
#                            relation fonctionnelle, règles, simplifier, signe
#   ExponentielleResoudre  → fiche partie 1, seconde moitié : e^a = e^b ⇔ a = b
#   ExponentielleEtude     → fiche partie 2 : dériver e^(at), étudier (ax + b)e^x
#
# La partie 1 est coupée en deux parce qu'elle tiendrait huit minutes en une
# seule vidéo, et parce que la seconde moitié est TOUTE la consigne de Frédéric
# sur la résolution : « le but est que l'élève sache que e(a) = e(b) alors a = b,
# idem pour inéquation » — la micro `exp_equations` du coach.
#
# Mêmes exemples, mêmes nombres que lib/fiches/maths-premiere-exponentielle.tsx
# et lib/fiches/maths-premiere-exponentielle-etude.tsx.
#
# Mapping micro-compétences (notion exponentielle, 12 micros, TOUTES couvertes) :
#   exp_definition     → Calculer, écran 1
#   exp_nombre_e       → Calculer, écran 2
#   exp_relation       → Calculer, écran 3
#   exp_proprietes     → Calculer, écran 4 + défi
#   exp_simplifier     → Calculer, écran 5 + défi
#   exp_signe          → Calculer, écran 6 ; Résoudre, écran 5
#   exp_equations      → Résoudre, écrans 2 à 6 + défi
#   exp_derivee        → Résoudre, écran 1 (croissance) ; Étude, écrans 3 à 6 + défi
#   exp_courbe         → Étude, écran 1
#   exp_derivee_affine → Étude, écran 2
#   exp_modelisation   → Étude, écran 7 (le cari)
#   exp_suite_geo      → ⚠️ seule micro sans écran : elle vit dans la fiche 2
#
# Briques : `manim/gabarit_seconde.py` (voix, objectifs, finale, abonnement,
# puissance composée). ⛔ Pas de LaTeX sur ce poste : tout est Text + dessin, et
# les exposants se composent (`puissance`), jamais en Unicode.
#
# Rendu (sans cache, sinon les sons sautent) :
#   python -m manim render -qh --disable_caching manim/scripts/premiere/exponentielle.py ExponentielleCalculer -o eleveai-maths-premiere-exponentielle-calculer --media_dir manim/scripts/premiere/media
#   … ExponentielleResoudre -o eleveai-maths-premiere-exponentielle-resoudre
#   … ExponentielleEtude    -o eleveai-maths-premiere-exponentielle-etude

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from gabarit_seconde import SONS, NotionSeconde


class ExponentielleBase(NotionSeconde):
    """Le gabarit du lycée, avec ce que l'exponentielle demande en plus."""

    identite = "Maths première — EleveAI"
    # ⭐ « vidéo n sur 3 » SUR LA GARDE (Frédéric, 15/09 : « en page de garde ça
    # serait bien ») : annoncer la suite fait regarder la suivante. « vidéo » et
    # non « partie », pour ne pas confondre avec les fiches partie 1 et partie 2.
    episode = ""

    def page_de_garde(self, titre, accroche, promesse, voix="00-garde"):
        """La garde du gabarit, à une ligne près : le gabarit écrit « Maths
        seconde » en dur. On la recompose ici plutôt que de toucher au gabarit
        partagé par les vidéos de seconde."""
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire(voix)

        t = Text(titre, font_size=54, color=JAUNE_TITRE).to_edge(UP, buff=0.9)
        if t.width > config.frame_width - 1.0:
            t.scale_to_fit_width(config.frame_width - 1.0)
        identite = Text(f"Maths première — vidéo {self.episode} sur 3" if self.episode else self.identite,
                        font_size=30, color=WHITE)
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

    # ── la composition des formules ─────────────────────────────────────────

    def T(self, texte, font_size=40, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def e(self, exposant, font_size=40, color=WHITE, color_exp=None):
        """e puissance quelque chose, composé : base et exposant séparés."""
        g = self.puissance("e", exposant, font_size=font_size, color=color, color_exp=color_exp)
        g.est_puissance = True
        return g

    # Les caractères posés SUR la ligne de base : ni jambage (g, p, y, parenthèses),
    # ni signe flottant (=, +, −). Leur bas EST la ligne de base.
    SUR_LA_LIGNE = set("abcdehiklmnorstuvwxzABCDEFGHIJKLMNOPRSTUVWXYZ0123456789éèàùâêîôûç")

    def ligne_de_base(self, m):
        """L'ordonnée de la ligne de base d'un morceau, ou None s'il n'en a pas."""
        if hasattr(m, "decalage_base"):
            return m.get_center()[1] + m.decalage_base
        if getattr(m, "est_puissance", False):
            m = m[0]
        if not isinstance(m, Text):
            return None
        glyphes = [c for c in m.text if not c.isspace()]
        if len(glyphes) != len(m.submobjects):
            return None
        bas = [s.get_bottom()[1] for c, s in zip(glyphes, m.submobjects) if c in self.SUR_LA_LIGNE]
        return float(np.median(bas)) if bas else None

    def rang(self, *morceaux, font_size=40, color=WHITE, buff=None):
        """Une ligne de calcul, alignée comme sur un cahier.

        ⛔ Premier brouillon (15/09/2026) : les morceaux étaient centrés les uns
        sur les autres, et « exp(x) s'écrit eˣ » montait et descendait — les
        parenthèses et les accents déplacent le centre d'un texte, pas sa ligne de
        base. Désormais : les chaînes voisines sont FUSIONNÉES en un seul Text, et
        chaque morceau est posé sur la LIGNE DE BASE de ses lettres ; ce qui n'a
        pas de lettres (fraction, parenthèse seule) se centre sur l'axe du calcul,
        à mi-hauteur d'un « x ».
        """
        buff = 0.16 * font_size / 40 if buff is None else buff
        fusion = []
        for m in morceaux:
            if isinstance(m, str) and fusion and isinstance(fusion[-1], str):
                fusion[-1] = f"{fusion[-1]} {m}"
            else:
                fusion.append(m)
        objets = [self.T(m, font_size, color) if isinstance(m, str) else m for m in fusion]
        ligne = VGroup(*objets).arrange(RIGHT, buff=buff)
        bases = [self.ligne_de_base(o) for o in objets]
        connues = [b for b in bases if b is not None]
        if connues:
            y = connues[0]
            axe = y + 0.5 * self.T("x", font_size).height
            for o, b in zip(objets, bases):
                if b is not None:
                    o.shift(UP * (y - b))
                else:
                    o.shift(UP * (axe - o.get_center()[1]))
            ligne.decalage_base = y - ligne.get_center()[1]
        return ligne

    def frac(self, haut, bas, color=WHITE):
        largeur = max(haut.width, bas.width) + 0.25
        trait = Line(LEFT * largeur / 2, RIGHT * largeur / 2, color=color, stroke_width=2.5)
        return VGroup(haut, trait, bas).arrange(DOWN, buff=0.14)

    def paren_puissance(self, interieur, n, font_size=40, color=WHITE):
        """(quelque chose)ⁿ : la parenthèse, puis le petit n en haut à droite."""
        g = self.rang("(", interieur, ")", font_size=font_size * 1.1, color=color, buff=0.05)
        expo = self.T(str(n), font_size * 0.62, color).next_to(g, UR, buff=0.02)
        groupe = VGroup(g, expo)
        if hasattr(g, "decalage_base"):
            groupe.decalage_base = g.get_center()[1] + g.decalage_base - groupe.get_center()[1]
        return groupe

    def barrer(self, m, couleur=ROUGE_ERREUR):
        return Line(m.get_corner(DL) + LEFT * 0.08, m.get_corner(UR) + RIGHT * 0.08,
                    color=couleur, stroke_width=5)

    def encadre(self, m, couleur=BLEU_CALCUL, buff=0.25):
        return VGroup(m, SurroundingRectangle(m, color=couleur, buff=buff, stroke_width=2.5))

    def titre_compose(self, *morceaux, font_size=40):
        """Un titre d'écran qui contient une puissance."""
        t = self.rang(*morceaux, font_size=font_size, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def courbe(self, ax, f, x_min, x_max, color, stroke_width=4):
        return ax.plot(f, x_range=[x_min, x_max], color=color, stroke_width=stroke_width)


# ══════════════════════════════════════════════════════════════════════════════
#  VIDÉO 1 — CALCULER (fiche partie 1)
# ══════════════════════════════════════════════════════════════════════════════

class ExponentielleCalculer(ExponentielleBase):

    dossier_voix = SONS / "premiere-exponentielle-calculer"
    episode = "1"

    # ── écran 1 : exp_definition ────────────────────────────────────────────

    def ecran_definition(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-definition")
        self.titre_ecran("Égale à sa propre dérivée")

        regle = self.encadre(self.T("f ′ = f      et      f(0) = 1", 40)).move_to([0, 2.3, 0])
        self.play(Write(regle[0]), Create(regle[1]))

        # ⛔ Brouillon du 15/09 : à 4,4 de haut, les graduations passaient sous la phrase du bas.
        ax = self.axes_notion([-3, 2, 1], [-1, 7, 1], x_length=5.2, y_length=3.6, font_size=20)
        ax.move_to([-3.2, -0.45, 0])
        c = self.courbe(ax, np.exp, -3, np.log(7), BLEU_CALCUL)
        self.play(Create(ax), run_time=0.8)
        self.play(Create(c), run_time=1.3)

        # En (0 ; 1) : hauteur 1, pente 1.
        a = Dot(ax.c2p(0, 1), color=VERT_OK, radius=0.09)
        t0 = self.courbe(ax, lambda x: x + 1, -1, 1.6, ROUGE_ERREUR, stroke_width=3)
        l1 = VGroup(self.T("en (0 ; 1)", 30, VERT_OK), self.T("hauteur 1 → pente 1", 30))
        l1.arrange(DOWN, aligned_edge=LEFT, buff=0.15).move_to([3.3, 0.7, 0])
        self.play(FadeIn(a), Create(t0))
        self.play(FadeIn(l1, shift=LEFT * 0.2))

        # En (1 ; e) : hauteur e, pente e.
        b = Dot(ax.c2p(1, np.e), color=ORANGE_RETENUE, radius=0.09)
        t1 = self.courbe(ax, lambda x: np.e * x, 0.25, 1.6, ORANGE_RETENUE, stroke_width=3)
        l2 = VGroup(self.T("en (1 ; e)", 30, ORANGE_RETENUE), self.T("hauteur e → pente e", 30))
        l2.arrange(DOWN, aligned_edge=LEFT, buff=0.15).move_to([3.3, -0.8, 0])
        self.play(FadeIn(b), Create(t1))
        self.play(FadeIn(l2, shift=LEFT * 0.2))

        self.play(Write(self.chute("Sa pente est toujours égale à sa hauteur.")))
        self.attendre_voix()

    # ── écran 2 : exp_nombre_e ──────────────────────────────────────────────

    def ecran_nombre_e(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-nombre-e")
        self.titre_ecran("Le nombre e")

        l1 = self.rang("e", "=", "exp(1)", "≈", self.T("2,718", 52, VERT_OK), font_size=52).move_to([0, 2.0, 0])
        self.play(Write(l1))
        self.play(Circumscribe(l1[-1], color=VERT_OK, buff=0.12))

        l2 = self.rang("exp(x)", "s'écrit", self.e("x", 48, color=BLEU_CALCUL), font_size=44).move_to([0, 0.75, 0])
        self.play(FadeIn(l2, shift=DOWN * 0.2))
        l3 = self.rang("exp(3)", "=", self.e("3", 44), font_size=44).move_to([0, -0.3, 0])
        self.play(FadeIn(l3, shift=DOWN * 0.2))

        piege = self.rang(self.e("3", 40, color=ORANGE_RETENUE), "≠", "3 × e", font_size=40, color=ORANGE_RETENUE)
        piege.move_to([0, -1.45, 0])
        chiffres = self.T("environ 20, contre environ 8", 30, WHITE).move_to([0, -2.2, 0])
        self.play(Write(piege))
        self.play(FadeIn(chiffres))

        self.play(Write(self.chute("e, c'est l'image de 1.")))
        self.attendre_voix()

    # ── écran 3 : exp_relation ──────────────────────────────────────────────

    def ecran_relation(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-relation")
        self.titre_ecran("Une somme devient un produit")

        regle = self.encadre(self.rang(
            self.e("a + b", 46, color_exp=JAUNE_TITRE), "=", self.e("a", 46), "×", self.e("b", 46),
            font_size=46,
        )).move_to([0, 2.05, 0])
        self.play(FadeIn(regle[0]), Create(regle[1]))

        contexte = self.rang("Des vues multipliées par", self.e("0,3", 32, color=BLEU_CALCUL), "chaque jour",
                             font_size=32).move_to([0, 0.85, 0])
        self.play(FadeIn(contexte))

        j2 = self.rang(self.T("2 jours :", 36, BLEU_CALCUL), self.e("0,3", 38), "×", self.e("0,3", 38), "=",
                       self.e("0,6", 40, color=VERT_OK), font_size=38).move_to([0, -0.2, 0])
        self.play(FadeIn(j2, shift=RIGHT * 0.2))
        j10 = self.rang(self.T("10 jours :", 36, BLEU_CALCUL), self.e("3", 40, color=VERT_OK),
                        "≈ 20 fois plus", font_size=38).move_to([0, -1.3, 0])
        self.play(FadeIn(j10, shift=RIGHT * 0.2))

        self.play(Write(self.chute("Les facteurs se multiplient, les exposants s'additionnent.")))
        self.attendre_voix()

    # ── écran 4 : exp_proprietes ────────────────────────────────────────────

    def ecran_regles(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-regles")
        self.titre_ecran("Les règles de calcul")

        r1 = self.rang(self.e("−a", 40), "=", self.frac(self.T("1", 34), self.e("a", 34)), font_size=40)
        r2 = self.rang(self.frac(self.e("a", 34), self.e("b", 34)), "=",
                       self.e("a − b", 40, color_exp=JAUNE_TITRE), font_size=40)
        r3 = self.rang(self.paren_puissance(self.e("a", 36), "n", 36), "=",
                       self.e("na", 40, color_exp=JAUNE_TITRE), font_size=40)
        regles = VGroup(r1, r2, r3).arrange(RIGHT, buff=1.8).move_to([0, 1.6, 0])

        # ⛔ Brouillon du 15/09 : sur une ligne, « quotient : on soustrait » et
        # « puissance : on multiplie » se touchaient.
        def legende(haut, bas, sous):
            return VGroup(self.T(haut, 26, BLEU_CALCUL), self.T(bas, 26, BLEU_CALCUL)).arrange(
                DOWN, buff=0.08).next_to(sous, DOWN, buff=0.3)

        legendes = VGroup(
            legende("un inverse,", "pas un négatif", r1),
            legende("quotient :", "on soustrait", r2),
            legende("puissance :", "on multiplie", r3),
        )
        for r, l in zip(regles, legendes):
            self.play(FadeIn(r, shift=DOWN * 0.2), FadeIn(l), run_time=0.7)

        somme = self.rang(self.e("a", 40), "+", self.e("b", 40), "≠", self.e("a + b", 40), font_size=40)
        bloc = self.encadre(somme, ROUGE_ERREUR).move_to([0, -1.0, 0])
        self.play(FadeIn(bloc[0]), Create(bloc[1]))
        preuve = self.rang("avec a = b = 0 :   1 + 1 = 2,   mais", self.e("0", 30), "= 1",
                           font_size=30).move_to([0, -2.1, 0])
        self.play(FadeIn(preuve))

        self.play(Write(self.chute("Produits et quotients : oui. Sommes : jamais.", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── écran 5 : exp_simplifier ────────────────────────────────────────────

    def ecran_simplifier(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-simplifier")
        self.titre_ecran("Simplifier : tout se joue dans l'exposant")

        a = self.rang("A =", self.frac(self.rang(self.e("2x", 38), "×", self.e("3", 38), font_size=38),
                                       self.e("x + 1", 38)), font_size=42).move_to([-4.0, 1.3, 0])
        self.play(FadeIn(a, shift=DOWN * 0.2))

        s1 = self.rang(self.T("en haut, un produit :", 30, BLEU_CALCUL), "2x + 3", font_size=34)
        s2 = self.rang(self.T("puis le quotient :", 30, BLEU_CALCUL), "2x + 3 −",
                       self.T("(x + 1)", 34, ORANGE_RETENUE), font_size=34)
        s3 = self.T("= x + 2", 36, VERT_OK)
        etapes = VGroup(s1, s2, s3).arrange(DOWN, aligned_edge=LEFT, buff=0.45).move_to([2.6, 1.3, 0])
        self.play(FadeIn(s1, shift=LEFT * 0.2))
        self.play(FadeIn(s2, shift=LEFT * 0.2))
        self.play(Circumscribe(s2[-1], color=ORANGE_RETENUE, buff=0.1))
        self.play(Write(s3))

        resultat = self.rang("A =", self.e("x + 2", 52, color=VERT_OK), font_size=52).move_to([-2.5, -0.9, 0])
        self.play(FadeIn(resultat, shift=UP * 0.2))
        self.play(Circumscribe(resultat, color=VERT_OK, buff=0.18))

        sans = self.T("sans parenthèses :", 30, WHITE)
        calcul_faux = self.T("2x + 3 − x + 1 = x + 4", 30, ROUGE_ERREUR)
        VGroup(sans, calcul_faux).arrange(RIGHT, buff=0.35).move_to([0, -2.1, 0])
        self.play(FadeIn(sans), FadeIn(calcul_faux))
        self.play(Create(self.barrer(calcul_faux)))

        self.play(Write(self.chute("On soustrait TOUT l'exposant du bas.", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── écran 6 : exp_signe ─────────────────────────────────────────────────

    def ecran_signe(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-signe")
        self.titre_ecran("Toujours strictement positive")

        ax = self.axes_notion([-3, 3, 1], [-2, 6, 1], x_length=5.6, y_length=4.0, font_size=20)
        ax.move_to([-3.3, -0.2, 0])
        c = self.courbe(ax, np.exp, -3, np.log(6), BLEU_CALCUL)
        self.play(Create(ax), run_time=0.8)
        self.play(Create(c), run_time=1.2)

        t0 = self.rang(self.e("x", 36), "> 0  pour tout x", font_size=34).move_to([3.4, 2.0, 0])
        self.play(Write(t0))

        d2 = DashedLine(ax.c2p(-3, 2), ax.c2p(3, 2), color=VERT_OK)
        p2 = Dot(ax.c2p(np.log(2), 2), color=VERT_OK, radius=0.09)
        t1 = self.rang(self.e("x", 32), "= 2 :", self.T("une solution", 32, VERT_OK), font_size=32)
        t1.move_to([3.4, 0.75, 0])
        self.play(Create(d2), FadeIn(p2))
        self.play(FadeIn(t1, shift=LEFT * 0.2))

        dm1 = DashedLine(ax.c2p(-3, -1), ax.c2p(3, -1), color=ROUGE_ERREUR)
        t2 = self.rang(self.e("x", 32), "= −1 :", self.T("aucune solution", 32, ROUGE_ERREUR), font_size=32)
        t2.move_to([3.4, -0.45, 0])
        self.play(Create(dm1))
        self.play(FadeIn(t2, shift=LEFT * 0.2))

        t3 = self.rang(self.e("−x", 30), "> 0 aussi : c'est un inverse", font_size=30).move_to([3.4, -1.65, 0])
        self.play(FadeIn(t3))

        self.play(Write(self.chute("Jamais nulle, jamais négative.")))
        self.attendre_voix()

    # ── défi et correction ──────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        titre = Text("Défi", font_size=48, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        consigne = self.T("Simplifie :", 36, JAUNE_TITRE).move_to([0, 2.0, 0])
        self.play(Write(consigne))
        d1 = self.rang("1.", self.e("3", 46), "×", self.e("−5", 46), font_size=46).move_to([0, 0.8, 0])
        d2 = self.rang("2.", self.paren_puissance(self.e("2x", 40), 3, 40), "×", self.e("−x", 46),
                       font_size=46).move_to([0, -0.55, 0])
        self.play(FadeIn(d1, shift=DOWN * 0.2))
        self.play(FadeIn(d2, shift=DOWN * 0.2))

        pause = self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=32)
        self.play(Write(pause), Flash(pause, color=ORANGE_RETENUE, line_length=0.25))
        self.attendre_voix(marge=4.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-correction")
        self.titre_ecran("Correction")

        c1 = self.rang("1.", self.e("3", 40), "×", self.e("−5", 40), "=", self.e("3 + (−5)", 40), "=",
                       self.e("−2", 44, color=VERT_OK), font_size=40).move_to([0, 1.7, 0])
        self.play(FadeIn(c1, shift=RIGHT * 0.2))
        n1 = self.T("un produit : on additionne les exposants", 28, BLEU_CALCUL).next_to(c1, DOWN, buff=0.25)
        self.play(FadeIn(n1))

        c2 = self.rang("2.", self.paren_puissance(self.e("2x", 36), 3, 36), "=", self.e("6x", 40, color=BLEU_CALCUL),
                       font_size=40).move_to([0, -0.2, 0])
        n2 = self.T("la puissance d'abord : 2x × 3 = 6x", 28, BLEU_CALCUL).next_to(c2, DOWN, buff=0.25)
        self.play(FadeIn(c2, shift=RIGHT * 0.2), FadeIn(n2))

        c3 = self.rang(self.e("6x", 40), "×", self.e("−x", 40), "=", self.e("5x", 46, color=VERT_OK),
                       font_size=40).move_to([0, -1.9, 0])
        self.play(FadeIn(c3, shift=RIGHT * 0.2))
        self.play(Circumscribe(c3[-1], color=VERT_OK, buff=0.15))
        self.attendre_voix()

    def construct(self):
        self.page_de_garde(
            titre="La fonction exponentielle",
            accroche="Plus elle est haute, plus elle monte vite ?",
            promesse="Définir · calculer · simplifier",
        )
        self.page_objectifs([
            "connaître la définition, le nombre e et le signe",
            "calculer avec la relation fonctionnelle et les règles",
            "simplifier une expression avec l'exponentielle",
        ])
        self.ecran_definition()
        self.ecran_nombre_e()
        self.ecran_relation()
        self.ecran_regles()
        self.ecran_simplifier()
        self.ecran_signe()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "la définition, le nombre e et le signe",
                "la relation fonctionnelle et les règles de calcul",
                "simplifier en travaillant sur les exposants",
            ],
            rappel="Une somme d'exponentielles ne se simplifie JAMAIS.",
        )
        self.page_abonnement()


# ══════════════════════════════════════════════════════════════════════════════
#  VIDÉO 2 — RÉSOUDRE (fiche partie 1)
# ══════════════════════════════════════════════════════════════════════════════

class ExponentielleResoudre(ExponentielleBase):

    dossier_voix = SONS / "premiere-exponentielle-resoudre"
    episode = "2"

    # ── écran 1 : la croissance, d'où tout part ─────────────────────────────

    def ecran_croissante(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-croissante")
        self.titre_ecran("Strictement croissante")

        ax = self.axes_notion([-2, 2, 1], [0, 7, 1], x_length=5.0, y_length=4.0, font_size=20)
        ax.move_to([-3.6, -0.25, 0])
        c = self.courbe(ax, np.exp, -2, np.log(7), BLEU_CALCUL)
        self.play(Create(ax), run_time=0.8)
        self.play(Create(c), run_time=1.2)

        # Deux abscisses a < b, et leurs deux hauteurs, dans le même ordre.
        reperes = VGroup()
        # ⛔ Brouillon du 15/09 : avec a = −1,5, e^a collait à l'axe et son
        # étiquette mangeait celle de a. a = 0,5 et b = 1,6 : deux hauteurs lisibles.
        for x, nom, coul in [(0.5, "a", ORANGE_RETENUE), (1.6, "b", VERT_OK)]:
            v = DashedLine(ax.c2p(x, 0), ax.c2p(x, np.exp(x)), color=coul)
            h = DashedLine(ax.c2p(0, np.exp(x)), ax.c2p(x, np.exp(x)), color=coul)
            p = Dot(ax.c2p(x, np.exp(x)), color=coul, radius=0.09)
            lx = self.T(nom, 32, coul).next_to(ax.c2p(x, 0), UP, buff=0.12).shift(RIGHT * 0.22)
            ly = self.e(nom, 30, color=coul).next_to(p, RIGHT, buff=0.18)
            reperes.add(VGroup(v, h, p, lx, ly))
        for r in reperes:
            self.play(Create(r[0]), Create(r[1]), FadeIn(r[2]), FadeIn(r[3]), FadeIn(r[4]), run_time=0.8)

        ordre = self.rang("si  a < b,  alors", self.e("a", 34), "<", self.e("b", 34), font_size=34)
        ordre.move_to([3.3, 2.05, 0])
        self.play(Write(ordre))

        eq = self.encadre(self.rang(self.e("a", 42), "=", self.e("b", 42), "⇔", self.T("a = b", 42, VERT_OK),
                                    font_size=42)).move_to([3.3, 0.6, 0])
        ineq = self.encadre(self.rang(self.e("a", 42), "<", self.e("b", 42), "⇔", self.T("a < b", 42, VERT_OK),
                                      font_size=42)).move_to([3.3, -0.95, 0])
        self.play(FadeIn(eq[0]), Create(eq[1]))
        self.play(FadeIn(ineq[0]), Create(ineq[1]))

        self.play(Write(self.chute("Deux exponentielles sont rangées comme leurs exposants.")))
        self.attendre_voix()

    # ── écran 2 : une équation ──────────────────────────────────────────────

    def ecran_equation(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-equation")
        self.titre_ecran("Une équation : on compare les exposants")

        eq = self.rang(self.e("2x − 1", 56, color_exp=JAUNE_TITRE), "=",
                       self.e("x + 3", 56, color_exp=JAUNE_TITRE), font_size=56).move_to([0, 1.8, 0])
        self.play(FadeIn(eq, shift=DOWN * 0.2))
        self.play(Indicate(eq[0][1], color=JAUNE_TITRE), Indicate(eq[2][1], color=JAUNE_TITRE))

        l2 = self.rang(self.T("⇔", 60, JAUNE_TITRE), "2x − 1 = x + 3", font_size=46, buff=0.35).move_to([0, 0.45, 0])
        self.play(TransformFromCopy(VGroup(eq[0][1], eq[2][1]), l2[1]), FadeIn(l2[0]))

        l3 = self.rang(self.T("⇔", 60, JAUNE_TITRE), self.T("x = 4", 56, VERT_OK), font_size=46, buff=0.35).move_to([0, -0.85, 0])
        self.play(FadeIn(l3, shift=DOWN * 0.2))
        self.play(Circumscribe(l3[1], color=VERT_OK, buff=0.15))

        note = self.T("Aucune exponentielle calculée.", 32, BLEU_CALCUL).move_to([0, -2.0, 0])
        self.play(FadeIn(note))

        self.play(Write(self.chute("L'exponentielle disparaît dès la première ligne.")))
        self.attendre_voix()

    # ── écran 3 : quand le second membre vaut 1 ou e ────────────────────────

    def ecran_un_et_e(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-un-et-e")
        self.titre_ecran("Quand le second membre vaut 1")

        separation = Line([0.35, 2.55, 0], [0.35, -2.1, 0], color=GREY_B, stroke_width=1.5)

        eq = self.rang(self.e("2x − 4", 46), "= 1", font_size=46).move_to([-3.4, 2.0, 0])
        self.play(FadeIn(eq))
        faux = self.T("2x − 4 = 1", 40, ROUGE_ERREUR).move_to([-4.2, 0.85, 0])
        etiquette = self.T("le piège", 28, ROUGE_ERREUR).next_to(faux, RIGHT, buff=0.4)
        self.play(FadeIn(faux), FadeIn(etiquette))
        self.play(Create(self.barrer(faux)))

        juste = self.rang(self.e("2x − 4", 42), "=", self.e("0", 42, color_exp=JAUNE_TITRE), font_size=42)
        juste.move_to([-3.4, -0.3, 0])
        self.play(FadeIn(juste, shift=DOWN * 0.2))
        self.play(Indicate(juste[2], color=JAUNE_TITRE))
        res = self.T("2x − 4 = 0   donc   x = 2", 38, VERT_OK).move_to([-3.4, -1.45, 0])
        self.play(Write(res))

        self.play(Create(separation))
        eq2 = self.rang(self.e("−2x + 3", 42), "= e", font_size=42).move_to([3.7, 2.0, 0])
        rw2 = self.rang(self.e("−2x + 3", 42), "=", self.e("1", 42, color_exp=JAUNE_TITRE), font_size=42)
        rw2.move_to([3.7, 0.8, 0])
        res2 = self.T("−2x + 3 = 1   donc   x = 1", 36, VERT_OK).move_to([3.7, -0.4, 0])
        self.play(FadeIn(eq2))
        self.play(FadeIn(rw2, shift=DOWN * 0.2))
        self.play(Write(res2))

        self.play(Write(self.chute("D'abord, écrire le second membre en exponentielle.", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── écran 4 : une inéquation ────────────────────────────────────────────

    def ecran_inequation(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-inequation")
        self.titre_ecran("Une inéquation : le sens est conservé")

        lignes = VGroup(
            self.rang(self.e("3x", 44), "≤", self.e("x + 6", 44), font_size=44),
            self.T("3x ≤ x + 6", 40),
            self.T("2x ≤ 6", 40),
            self.T("x ≤ 3", 46, VERT_OK),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.42).move_to([-3.6, 0.45, 0])
        for l in lignes:
            self.play(FadeIn(l, shift=DOWN * 0.15), run_time=0.7)

        axe = NumberLine(x_range=[-1, 5, 1], length=5.4, include_numbers=True,
                         label_constructor=Text, font_size=26, color=WHITE)
        axe.move_to([3.3, 0.9, 0])
        self.play(Create(axe))
        solution = Line(axe.n2p(-1) + LEFT * 0.35, axe.n2p(3), color=VERT_OK, stroke_width=9)
        crochet = self.T("]", 52, VERT_OK).move_to(axe.n2p(3))
        self.play(Create(solution), FadeIn(crochet))
        ens = self.T("S = ]−∞ ; 3]", 42, VERT_OK).move_to([3.3, -0.4, 0])
        self.play(Write(ens))

        note = self.T("Enlever les exponentielles ne retourne jamais le sens.", 30, BLEU_CALCUL)
        note.move_to([0, -2.05, 0])
        self.play(FadeIn(note))

        self.play(Write(self.chute("Le sens ne change qu'en divisant par un négatif.", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── écran 5 : regarder le second membre ─────────────────────────────────

    def ecran_second_membre(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-second-membre")
        self.titre_ecran("Regarder le second membre d'abord")

        def carte(formule, verdict, couleur, sous):
            contenu = VGroup(formule, self.T(verdict, 32, couleur), sous).arrange(DOWN, buff=0.35)
            cadre = RoundedRectangle(corner_radius=0.2, width=4.1, height=contenu.height + 0.7,
                                     color=couleur, stroke_width=2.5)
            return VGroup(cadre, contenu)

        c1 = carte(self.rang(self.e("x + 1", 38), "= −2", font_size=38), "aucune solution", ROUGE_ERREUR,
                   VGroup(self.T("une exponentielle", 24), self.T("n'est jamais négative", 24)).arrange(DOWN, buff=0.08))
        c2 = carte(self.rang(self.e("x + 1", 38), "> −2", font_size=38), "tous les réels", VERT_OK,
                   VGroup(self.T("c'est toujours", 24), self.T("vrai", 24)).arrange(DOWN, buff=0.08))
        c3 = carte(self.rang("(2x − 4)", self.e("x", 38), "= 0", font_size=34), "x = 2 seulement", BLEU_CALCUL,
                   VGroup(self.rang(self.e("x", 26), "ne vaut", font_size=24), self.T("jamais 0", 24)).arrange(DOWN, buff=0.08))
        cartes = VGroup(c1, c2, c3).arrange(RIGHT, buff=0.35).move_to([0, 0.45, 0])
        for c in cartes:
            self.play(Create(c[0]), FadeIn(c[1], shift=UP * 0.15), run_time=0.9)

        self.play(Write(self.chute("Une exponentielle est toujours strictement positive.")))
        self.attendre_voix()

    # ── écran 6 : le lien avec le second degré ──────────────────────────────

    def ecran_second_degre(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-second-degre")
        self.titre_ecran("Et si l'exposant contient x² ?")

        eq = self.rang(self.e("x²", 54, color_exp=JAUNE_TITRE), "=", self.e("2x + 3", 54, color_exp=JAUNE_TITRE),
                       font_size=54).move_to([0, 1.95, 0])
        self.play(FadeIn(eq, shift=DOWN * 0.2))

        etapes = VGroup(
            self.T("x² = 2x + 3", 40),
            self.T("x² − 2x − 3 = 0", 40),
            self.T("Δ = 4 + 12 = 16     √Δ = 4", 36, BLEU_CALCUL),
            self.T("x = −1   ou   x = 3", 46, VERT_OK),
        ).arrange(DOWN, buff=0.38).move_to([0, -0.55, 0])
        for l in etapes:
            self.play(FadeIn(l, shift=DOWN * 0.15), run_time=0.7)
        self.play(Circumscribe(etapes[-1], color=VERT_OK, buff=0.15))

        self.play(Write(self.chute("L'exponentielle ne sert qu'à la première ligne.")))
        self.attendre_voix()

    # ── défi et correction ──────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        titre = Text("Défi", font_size=48, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        consigne = self.T("Résous dans ℝ :", 36, JAUNE_TITRE).move_to([0, 2.0, 0])
        self.play(Write(consigne))
        d1 = self.rang("1.", self.e("3x − 2", 46), "=", self.e("x + 4", 46), font_size=46).move_to([0, 0.8, 0])
        d2 = self.rang("2.", self.e("x + 2", 46), "<", self.e("4x − 7", 46), font_size=46).move_to([0, -0.45, 0])
        self.play(FadeIn(d1, shift=DOWN * 0.2))
        self.play(FadeIn(d2, shift=DOWN * 0.2))
        indice = self.T("Dans le 2, attention à la dernière étape.", 28, BLEU_CALCUL).move_to([0, -1.6, 0])
        self.play(FadeIn(indice))

        pause = self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=32)
        self.play(Write(pause), Flash(pause, color=ORANGE_RETENUE, line_length=0.25))
        self.attendre_voix(marge=4.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-correction")
        self.titre_ecran("Correction")

        g = VGroup(
            self.T("1.", 36, JAUNE_TITRE),
            self.T("3x − 2 = x + 4", 38),
            self.T("2x = 6", 38),
            self.T("x = 3", 44, VERT_OK),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.4).move_to([-3.8, 0.3, 0])
        for l in g:
            self.play(FadeIn(l, shift=DOWN * 0.15), run_time=0.55)

        d = VGroup(
            self.T("2.", 36, JAUNE_TITRE),
            self.T("x + 2 < 4x − 7", 38),
            self.T("−3x < −9", 38),
            self.T("÷ (−3), négatif : le sens change", 30, ORANGE_RETENUE),
            self.T("x > 3      S = ]3 ; +∞[", 42, VERT_OK),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.34).move_to([2.9, 0.05, 0])
        for l in d:
            self.play(FadeIn(l, shift=DOWN * 0.15), run_time=0.55)
        self.play(Circumscribe(d[3], color=ORANGE_RETENUE, buff=0.1))
        self.attendre_voix()

    def construct(self):
        self.page_de_garde(
            titre="Résoudre avec l'exponentielle",
            accroche="Résoudre sans calculer une seule exponentielle ?",
            promesse="Équations · inéquations · pièges",
        )
        self.page_objectifs([
            "résoudre une équation avec l'exponentielle",
            "résoudre une inéquation avec l'exponentielle",
            "repérer une équation qui n'a pas de solution",
        ])
        self.ecran_croissante()
        self.ecran_equation()
        self.ecran_un_et_e()
        self.ecran_inequation()
        self.ecran_second_membre()
        self.ecran_second_degre()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "résoudre une équation : on compare les exposants",
                "résoudre une inéquation : le sens est conservé",
                "repérer une équation sans solution",
            ],
            rappel="Si e puissance u vaut 1, alors u vaut 0 — pas 1.",
        )
        self.page_abonnement()


# ══════════════════════════════════════════════════════════════════════════════
#  VIDÉO 3 — DÉRIVER ET ÉTUDIER (fiche partie 2)
# ══════════════════════════════════════════════════════════════════════════════

class ExponentielleEtude(ExponentielleBase):

    dossier_voix = SONS / "premiere-exponentielle-etude"
    episode = "3"

    # ── écran 1 : exp_courbe ────────────────────────────────────────────────

    def ecran_courbes(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-courbes")
        self.titre_ecran("Toutes partent de (0 ; 1)")

        ax = self.axes_notion([-2, 2, 1], [-1, 6, 1], x_length=5.4, y_length=4.0, font_size=20)
        ax.move_to([-3.4, -0.2, 0])
        self.play(Create(ax), run_time=0.8)
        for a, coul in [(2, BLEU_CALCUL), (0.5, VERT_OK), (-0.5, ORANGE_RETENUE), (-2, ROUGE_ERREUR)]:
            borne = np.log(6) / a
            x_min, x_max = (-2, min(2, borne)) if a > 0 else (max(-2, borne), 2)
            self.play(Create(self.courbe(ax, lambda x, a=a: np.exp(a * x), x_min, x_max, coul)), run_time=0.7)
        self.play(FadeIn(Dot(ax.c2p(0, 1), color=WHITE, radius=0.1)))

        monte = VGroup(
            self.rang(self.T("a = 2", 32, BLEU_CALCUL), self.T("a = 0,5", 32, VERT_OK), buff=0.6),
            self.T("a > 0 : elle MONTE", 34),
        ).arrange(DOWN, buff=0.2).move_to([3.3, 1.5, 0])
        descend = VGroup(
            self.rang(self.T("a = −0,5", 32, ORANGE_RETENUE), self.T("a = −2", 32, ROUGE_ERREUR), buff=0.6),
            self.T("a < 0 : elle DESCEND", 34),
            self.T("sans jamais toucher l'axe", 28, BLEU_CALCUL),
        ).arrange(DOWN, buff=0.2).move_to([3.3, -0.45, 0])
        self.play(FadeIn(monte, shift=LEFT * 0.2))
        self.play(FadeIn(descend, shift=LEFT * 0.2))

        self.play(Write(self.chute("Plus a est loin de 0, plus c'est rapide.")))
        self.attendre_voix()

    # ── écran 2 : exp_derivee_affine ────────────────────────────────────────

    def ecran_deriver(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-deriver")
        self.titre_compose("Dériver", self.e("at", 40, color=JAUNE_TITRE))

        regle = self.encadre(self.rang(
            self.rang("(", self.e("at", 46), ")′", font_size=46, buff=0.05), "=",
            self.T("a", 50, JAUNE_TITRE), self.e("at", 46), font_size=46,
        )).move_to([0, 2.0, 0])
        self.play(FadeIn(regle[0]), Create(regle[1]))

        ex = self.rang(
            self.rang("(100", self.e("−0,2t", 38), ")′", font_size=38, buff=0.05), "=",
            "100 × (−0,2)", self.e("−0,2t", 38), font_size=38,
        ).move_to([0, 0.6, 0])
        self.play(FadeIn(ex, shift=DOWN * 0.2))
        ex2 = self.rang("=", self.T("−20", 44, VERT_OK), self.e("−0,2t", 42), font_size=42)
        ex2.next_to(ex, DOWN, buff=0.3).align_to(ex[1], LEFT)
        self.play(FadeIn(ex2, shift=DOWN * 0.15))
        self.play(Circumscribe(ex2[1], color=VERT_OK, buff=0.12))

        faux = self.rang(self.rang("(", self.e("5t", 36, color=ROUGE_ERREUR), ")′", font_size=36,
                                   color=ROUGE_ERREUR, buff=0.05),
                         "=", "5t", self.e("5t", 36, color=ROUGE_ERREUR), font_size=36, color=ROUGE_ERREUR)
        faux.move_to([-3.3, -1.75, 0])
        juste = self.rang(self.rang("(", self.e("5t", 36), ")′", font_size=36, buff=0.05),
                          "=", self.T("5", 38, VERT_OK), self.e("5t", 36), font_size=36)
        juste.move_to([3.3, -1.75, 0])
        self.play(FadeIn(faux))
        self.play(Create(self.barrer(faux)))
        self.play(FadeIn(juste, shift=LEFT * 0.2))

        self.play(Write(self.chute("C'est le nombre a qui sort, pas l'exposant entier.", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── écran 3 : le fil de la fiche 2 ──────────────────────────────────────

    def ecran_signe(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-signe")
        self.titre_ecran("L'exponentielle ne décide jamais du signe")

        fp = self.rang("f ′(x) =", self.T("(x − 1)", 54, BLEU_CALCUL), self.e("x", 54, color=VERT_OK),
                       font_size=54).move_to([0, 1.75, 0])
        self.play(FadeIn(fp, shift=DOWN * 0.2))

        b1 = Brace(fp[1], DOWN, color=BLEU_CALCUL)
        # ⛔ Brouillon du 15/09 : posées sous leurs accolades, les deux légendes se
        # recouvraient. L'une part à gauche, l'autre à droite.
        t1 = self.T("c'est LUI qui décide", 30, BLEU_CALCUL).next_to(b1, DOWN, buff=0.15).shift(LEFT * 1.1)
        b2 = Brace(fp[2][0], DOWN, color=VERT_OK)
        t2 = self.T("toujours > 0", 30, VERT_OK).next_to(b2, DOWN, buff=0.15).shift(RIGHT * 1.3)
        self.play(GrowFromCenter(b2), FadeIn(t2))
        self.play(GrowFromCenter(b1), FadeIn(t1))

        faux = self.rang("« f est croissante car", self.e("x", 34, color=ROUGE_ERREUR), "> 0 »",
                         font_size=34, color=ROUGE_ERREUR).move_to([-1.0, -0.85, 0])
        etiquette = self.T("FAUX", 36, ROUGE_ERREUR).next_to(faux, RIGHT, buff=0.5)
        self.play(FadeIn(faux))
        self.play(Create(self.barrer(faux)), FadeIn(etiquette))

        aussi = self.rang("et même", self.e("−2x", 34, color=VERT_OK), "est positif", font_size=32)
        aussi.move_to([0, -2.0, 0])
        self.play(FadeIn(aussi))

        self.play(Write(self.chute("C'est l'autre facteur qui commande.")))
        self.attendre_voix()

    # ── écran 4 : l'étude, en trois temps ───────────────────────────────────

    def ecran_etude(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-etude")
        self.titre_compose("Étudier  f(x) = (x − 2)", self.e("x", 40, color=JAUNE_TITRE))

        s1 = VGroup(
            self.T("1. Je dérive le produit", 30, BLEU_CALCUL),
            self.rang("f ′(x) = 1 ×", self.e("x", 38), "+ (x − 2)", self.e("x", 38), font_size=38),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.18)
        s2 = VGroup(
            self.T("2. Je factorise par l'exponentielle", 30, BLEU_CALCUL),
            self.rang("f ′(x) =", self.T("(x − 1)", 38, ORANGE_RETENUE), self.e("x", 38), font_size=38),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.18)
        s3 = VGroup(
            self.T("3. Je lis le signe", 30, BLEU_CALCUL),
            self.rang(self.e("x", 34), "> 0,  donc  f ′(x)  a le signe de", self.T("x − 1", 34, ORANGE_RETENUE),
                      font_size=34),
            self.T("négatif avant 1, positif après", 34, VERT_OK),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.18)
        blocs = VGroup(s1, s2, s3).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([-0.6, -0.1, 0])
        for b in blocs:
            self.play(FadeIn(b, shift=RIGHT * 0.2), run_time=0.8)

        self.attendre_voix()

    # ── écran 5 : le tableau et la courbe ───────────────────────────────────

    def tableau_variations(self, centre):
        """Le tableau de variations de (x − 2)eˣ, dessiné — avec la valeur exacte −e."""
        L, G = 6.0, 1.4
        h_x, h_d, h_v = 0.7, 0.8, 1.8
        x0, y0 = centre[0] - L / 2, centre[1] + (h_x + h_d + h_v) / 2
        y1, y2, y3 = y0 - h_x, y0 - h_x - h_d, y0 - h_x - h_d - h_v
        milieu = x0 + G + (L - G) / 2
        traits = VGroup(
            Rectangle(width=L, height=h_x + h_d + h_v, color=WHITE, stroke_width=2).move_to(
                [centre[0], (y0 + y3) / 2, 0]),
            Line([x0, y1, 0], [x0 + L, y1, 0], color=WHITE, stroke_width=2),
            Line([x0, y2, 0], [x0 + L, y2, 0], color=WHITE, stroke_width=2),
            Line([x0 + G, y0, 0], [x0 + G, y3, 0], color=WHITE, stroke_width=2),
            DashedLine([milieu, y1, 0], [milieu, y2, 0], color=GREY_B, stroke_width=1.5),
        )
        textes = VGroup(
            self.T("x", 30).move_to([x0 + G / 2, (y0 + y1) / 2, 0]),
            self.T("f ′(x)", 30).move_to([x0 + G / 2, (y1 + y2) / 2, 0]),
            self.T("f", 30).move_to([x0 + G / 2, (y2 + y3) / 2, 0]),
            self.T("−∞", 28).move_to([x0 + G + 0.45, (y0 + y1) / 2, 0]),
            self.T("1", 30).move_to([milieu, (y0 + y1) / 2, 0]),
            self.T("+∞", 28).move_to([x0 + L - 0.45, (y0 + y1) / 2, 0]),
            self.T("−", 40, ROUGE_ERREUR).move_to([(x0 + G + milieu) / 2, (y1 + y2) / 2, 0]),
            self.T("0", 30).move_to([milieu, (y1 + y2) / 2, 0]),
            self.T("+", 40, VERT_OK).move_to([(milieu + x0 + L) / 2, (y1 + y2) / 2, 0]),
        )
        descente = Arrow([x0 + G + 0.35, y2 - 0.3, 0], [milieu - 0.3, y3 + 0.55, 0], buff=0,
                         color=ORANGE_RETENUE, stroke_width=4)
        valeur = self.T("−e", 34, VERT_OK).move_to([milieu, y3 + 0.32, 0])
        montee = Arrow([milieu + 0.3, y3 + 0.55, 0], [x0 + L - 0.35, y2 - 0.3, 0], buff=0,
                       color=ORANGE_RETENUE, stroke_width=4)
        return traits, textes, VGroup(descente, valeur, montee)

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-tableau")
        self.titre_ecran("Le tableau de variations")

        traits, textes, fleches = self.tableau_variations([-3.3, 0.55, 0])
        self.play(Create(traits), run_time=1.0)
        self.play(FadeIn(textes[:6]))
        self.play(FadeIn(textes[6:]))
        self.play(GrowArrow(fleches[0]))
        self.play(FadeIn(fleches[1]))
        self.play(GrowArrow(fleches[2]))

        calcul = self.rang("f(1) = (1 − 2) × e =", self.T("−e", 40, VERT_OK), font_size=36).move_to([-3.3, -2.0, 0])
        self.play(Write(calcul))

        ax = self.axes_notion([-4, 3, 1], [-3, 3, 1], x_length=5.0, y_length=3.8, font_size=18)
        ax.move_to([3.5, 0.25, 0])
        c = self.courbe(ax, lambda x: (x - 2) * np.exp(x), -4, 2.3, BLEU_CALCUL)
        self.play(Create(ax), run_time=0.7)
        self.play(Create(c), run_time=1.2)
        creux = Dot(ax.c2p(1, -np.e), color=VERT_OK, radius=0.1)
        etiquette = self.T("(1 ; −e)", 28, VERT_OK).next_to(creux, RIGHT, buff=0.2)
        self.play(FadeIn(creux), FadeIn(etiquette))
        self.play(Flash(creux, color=VERT_OK, line_length=0.25))

        self.play(Write(self.chute("Minimum −e, atteint en x = 1.")))
        self.attendre_voix()

    # ── écran 6 : le piège de l'extremum ────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("L'extremum n'est pas là où f s'annule")

        f = self.rang("f(x) = (x + 2)", self.e("x", 46), font_size=46).move_to([0, 2.0, 0])
        self.play(FadeIn(f, shift=DOWN * 0.2))

        gauche = VGroup(
            self.T("f s'annule en", 32),
            self.T("x = −2", 46, ROUGE_ERREUR),
            self.T("ce n'est PAS l'extremum", 28, ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.3).move_to([-3.6, 0.0, 0])
        self.play(FadeIn(gauche, shift=RIGHT * 0.2))

        droite = VGroup(
            self.rang("f ′(x) = (x + 3)", self.e("x", 36), font_size=36),
            self.T("change de signe en", 30),
            self.T("x = −3", 46, VERT_OK),
            self.rang("minimum :  f(−3) = −", self.e("−3", 34, color=VERT_OK), font_size=34, color=VERT_OK),
        ).arrange(DOWN, buff=0.3).move_to([3.3, -0.2, 0])
        self.play(FadeIn(droite, shift=LEFT * 0.2))
        self.play(Circumscribe(droite[2], color=VERT_OK, buff=0.12))

        self.play(Write(self.chute("L'extremum se lit sur f ′, pas sur f.", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── écran 7 : exp_modelisation, le cari ─────────────────────────────────

    def ecran_cari(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-cari")
        self.titre_ecran("Retour au cari de Saint-Joseph")

        lignes = VGroup(
            self.rang("T(t) = 25 + 60", self.e("−0,05t", 36), font_size=36),
            self.rang("T′(t) = −3", self.e("−0,05t", 36), "< 0", font_size=36),
            self.T("il ne fait que refroidir", 30, BLEU_CALCUL),
            self.rang("60", self.e("−0,05t", 34), "> 0   donc   T(t) > 25", font_size=34),
            self.T("jamais sous 25 °C", 38, VERT_OK),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.36)
        # ⛔ Brouillon du 15/09 : centré en x = −3,5, le bloc touchait le bord gauche.
        lignes.scale_to_fit_width(min(lignes.width, 6.2)).move_to([-3.35, 0.1, 0])
        for l in lignes:
            self.play(FadeIn(l, shift=RIGHT * 0.15), run_time=0.65)

        ax = Axes(
            x_range=[0, 60, 10], y_range=[0, 90, 15], x_length=5.0, y_length=3.9,
            axis_config={"include_numbers": True, "label_constructor": Text, "font_size": 18},
            tips=False,
        ).move_to([3.7, -0.1, 0])
        c = ax.plot(lambda t: 25 + 60 * np.exp(-0.05 * t), x_range=[0, 60], color=BLEU_CALCUL, stroke_width=4)
        seuil = DashedLine(ax.c2p(0, 25), ax.c2p(60, 25), color=ORANGE_RETENUE)
        legende = self.T("25 °C", 26, ORANGE_RETENUE).next_to(ax.c2p(60, 25), DOWN, buff=0.15).shift(LEFT * 0.4)
        self.play(Create(ax), run_time=0.7)
        self.play(Create(c), run_time=1.3)
        self.play(Create(seuil), FadeIn(legende))

        self.play(Write(self.chute("Il s'approche de 25 °C sans jamais les franchir.")))
        self.attendre_voix()

    # ── défi et correction ──────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        titre = Text("Défi", font_size=48, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        consigne = self.T("Trouve l'extremum de", 36, JAUNE_TITRE).move_to([0, 1.8, 0])
        f = self.rang("f(x) = (x − 3)", self.e("x", 54), font_size=54).move_to([0, 0.5, 0])
        indice = self.T("Dérive, factorise, étudie le signe.", 30, BLEU_CALCUL).move_to([0, -0.9, 0])
        self.play(Write(consigne))
        self.play(FadeIn(f, shift=DOWN * 0.2))
        self.play(FadeIn(indice))

        pause = self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=32)
        self.play(Write(pause), Flash(pause, color=ORANGE_RETENUE, line_length=0.25))
        self.attendre_voix(marge=4.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("09-correction")
        self.titre_ecran("Correction")

        lignes = VGroup(
            self.rang("f ′(x) =", self.e("x", 38), "+ (x − 3)", self.e("x", 38), font_size=38),
            self.rang("f ′(x) =", self.T("(x − 2)", 38, ORANGE_RETENUE), self.e("x", 38), font_size=38),
            self.T("signe de x − 2 : négatif avant 2, positif après", 32, BLEU_CALCUL),
            self.T("f décroît puis croît : minimum en x = 2", 34),
            self.rang("f(2) = (2 − 3)", self.e("2", 38), "= −", self.e("2", 40, color=VERT_OK),
                      font_size=38),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.38).move_to([-0.4, -0.15, 0])
        for l in lignes:
            self.play(FadeIn(l, shift=RIGHT * 0.15), run_time=0.65)
        self.play(Circumscribe(lignes[-1], color=VERT_OK, buff=0.15))
        self.attendre_voix()

    def construct(self):
        self.page_de_garde(
            titre="Dériver et étudier l'exponentielle",
            accroche="Pourquoi le cari ne descend jamais sous 25 °C ?",
            promesse="Dériver · étudier · trouver l'extremum",
        )
        self.page_objectifs([
            "dériver une exponentielle",
            "étudier le signe d'une dérivée avec l'exponentielle",
            "dresser le tableau et trouver l'extremum",
        ])
        self.ecran_courbes()
        self.ecran_deriver()
        self.ecran_signe()
        self.ecran_etude()
        self.ecran_tableau()
        self.ecran_piege()
        self.ecran_cari()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "dériver une exponentielle : le nombre a sort",
                "étudier le signe : l'exponentielle ne décide jamais",
                "dresser le tableau et trouver l'extremum",
            ],
            rappel="C'est l'AUTRE facteur qui donne le signe, jamais l'exponentielle.",
        )
        self.page_abonnement()
