# expression_reduire.py
# EleveAI — Maths 3e — Expression littérale, épisode 3 : réduire une expression,
# et SURTOUT enlever une parenthèse précédée d'un moins
# (notionId : litteral_calcul, micro : litteral_reduire), AVEC VOIX.
#
# ⭐ 13/10/2026 : série « expression littérale » 5e/4e/3e, une paysage PAR MICRO
# + son short jumeau. Paysage ceinture VERTE, même structure que l'épisode 4
# de 4e (scripts/4e/expression_reduire.py). Short jumeau (ceinture blanche) :
# expression_reduire_short.py (la parenthèse-boîte dont les signes basculent).
#
# ⭐ LE DESSIN QUI PORTE TOUT : un « − » devant une parenthèse est un
# INTERRUPTEUR. Chaque terme de la parenthèse porte son signe dans une pastille
# (« + » bleu, « − » rose) ; quand l'interrupteur s'allume, les pastilles
# basculent UNE PAR UNE. Avec un « + » devant, l'interrupteur reste éteint et
# rien ne bascule. Les familles : les cartes-termes et leurs boîtes de la 4e.
# Couleurs : COEFFICIENT VERT, TERME CONSTANT ORANGE, LETTRE JAUNE, faux ROUGE.
#
# Défi : 4x² − x − (x² − 5x + 2) → 3x² + 4x − 2.
#
# Voix : manim/voix/3e-expression-reduire.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/3e/expression_reduire.py ExpressionReduire3e -o eleveai-maths-3e-expression-reduire --media_dir manim/scripts/3e/media
# Puis copier le mp4 dans manim/sorties/3e/maths/expression-litterale/03-reduire/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *

from charte import *
from gabarit_sixieme import Notion6e
from signes_expression_2de import echelle_ceintures

COUL_COEF = VERT_OK
COUL_CONST = ORANGE_RETENUE
COUL_LETTRE = JAUNE_TITRE
FAM_CARRE = "#C084FC"
FAM_X = JAUNE_TITRE
FAM_NB = ORANGE_RETENUE
FOND_CARTE = "#1E293B"
CUIR = "#8B5E3C"
# les pastilles de signe : « + » bleu, « − » rose (jamais le rouge du faux)
SIGNE_PLUS = BLEU_CALCUL
SIGNE_MOINS = "#F472B6"
LETTRES = "xya²"


class Notion3e(Notion6e):
    identite = "Maths 3e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


def colorier(texte, font_size=60):
    """Une expression coloriée : coefficient VERT (avec son signe collé),
    lettre JAUNE, terme constant ORANGE (avec son signe collé)."""
    m = Text(texte, font_size=font_size, color=WHITE)
    s = texte.replace(" ", "")
    if len(s) != len(m):
        return m
    i = 0
    while i < len(s):
        c = s[i]
        if c in "0123456789":
            j = i
            while j < len(s) and s[j] in "0123456789":
                j += 1
            coul = COUL_COEF if j < len(s) and s[j] in "xya" else COUL_CONST
            for k in range(i, j):
                m[k].set_color(coul)
            i = j
            continue
        if c in LETTRES:
            m[i].set_color(COUL_LETTRE)
        i += 1
    pos = 0
    for k, c in enumerate(texte):
        if c == " ":
            continue
        if c == "−" and k + 1 < len(texte) and texte[k + 1] in "0123456789":
            m[pos].set_color(m[pos + 1].get_color())
        pos += 1
    return m


def pastille(signe, r=0.24, font_size=34):
    """Le signe d'un terme, dans une pastille ronde."""
    coul = SIGNE_PLUS if signe == "+" else SIGNE_MOINS
    rond = Circle(radius=r, fill_color=FOND_CARTE, fill_opacity=1, stroke_color=coul, stroke_width=4)
    return VGroup(rond, Text(signe, font_size=font_size, color=coul).move_to(rond))


def interrupteur(largeur=0.9):
    """L'interrupteur, éteint : bouton à gauche, piste grise."""
    piste = RoundedRectangle(width=largeur, height=0.42, corner_radius=0.21, stroke_color=GREY_B,
                             stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1)
    bouton = Circle(radius=0.15, fill_color=GREY_B, fill_opacity=1, stroke_width=0)
    bouton.move_to(piste.get_left() + RIGHT * 0.22)
    return VGroup(piste, bouton)


class OutilsSignes:
    """Les gestes partagés par la paysage et le short."""

    def basculer(self, p, run_time=0.6):
        """La pastille tourne sur elle-même et ressort avec l'autre signe."""
        nouveau = "−" if p[1].text == "+" else "+"
        n = pastille(nouveau, r=p[0].width / 2, font_size=p[1].font_size).move_to(p)
        self.play(p.animate.stretch(0.05, 0), run_time=run_time * 0.4)
        n.stretch(0.05, 0)
        self.remove(p)
        self.add(n)
        self.play(n.animate.stretch(20, 0), Flash(n, color=n[0].get_stroke_color(), line_length=0.15,
                                                   flash_radius=n.width * 0.75), run_time=run_time * 0.6)
        return n

    def allumer(self, inter, run_time=0.5):
        piste, bouton = inter
        self.play(bouton.animate.move_to(piste.get_right() + LEFT * 0.22).set_fill(WHITE),
                  piste.animate.set_fill(VERT_OK, 0.9).set_stroke(VERT_OK), run_time=run_time)


class ExpressionReduire3e(OutilsSignes, Notion3e):
    nom_voix = "3e-expression-reduire"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def expr(self, texte, font_size=60):
        return colorier(texte, font_size)

    def ligne(self, morceaux, buff=0.28):
        return VGroup(*morceaux).arrange(RIGHT, buff=buff)

    def insister(self, mob, f=1.5):
        self.play(mob.animate.scale(f), run_time=0.5)
        self.play(mob.animate.scale(1 / f), run_time=0.5)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.08, mob.get_corner(UR) + RIGHT * 0.08,
                    stroke_width=6, color=color)

    def suite(self, ligne_haut, texte, font_size=60, buff=0.55):
        """« = … » sous une ligne, l'expression alignée sur la gauche de
        l'expression du haut (sans son « = » s'il y en a un)."""
        ref = ligne_haut[1] if isinstance(ligne_haut[0], Text) and ligne_haut[0].text == "=" else ligne_haut
        l = self.ligne([self.t("=", font_size), self.expr(texte, font_size)], buff=0.3)
        l.next_to(ligne_haut, DOWN, buff=buff)
        l.shift(RIGHT * (ref.get_left()[0] - l[1].get_left()[0]))
        return l

    def pastilles(self, termes, signes, haut=0.5):
        return [pastille(s).move_to(m.get_center() + UP * haut).set_y(m.get_top()[1] + haut)
                for m, s in zip(termes, signes)]

    # ── cartes et boîtes (comme la 4e) ──────────────────────────────────────

    def carte(self, texte, fam, font_size=44):
        e = self.expr(texte, font_size)
        fond = RoundedRectangle(width=max(e.width + 0.4, 1.0), height=e.height + 0.36, corner_radius=0.12,
                                fill_color=FOND_CARTE, fill_opacity=1, stroke_color=fam, stroke_width=3)
        return VGroup(fond, e.move_to(fond))

    def boite(self, nom, fam, centre, largeur=3.0, hauteur=2.0):
        cadre = RoundedRectangle(width=largeur, height=hauteur, corner_radius=0.2,
                                 stroke_color=fam, stroke_width=4, fill_color=fam, fill_opacity=0.08)
        cadre.move_to(centre)
        lbl = self.t(nom, 30, fam).next_to(cadre.get_top(), DOWN, buff=0.12)
        return VGroup(cadre, lbl)

    def ranger(self, cartes, boite, buff=0.15):
        cible = VGroup(*[c.copy() for c in cartes]).arrange(RIGHT, buff=buff)
        zone = boite[0]
        if cible.width > zone.width - 0.3:
            cible.scale_to_fit_width(zone.width - 0.3)
        cible.move_to(zone.get_center() + DOWN * 0.22)
        return cible

    def tirer(self, morceaux, cartes, boite, run_time=1.2):
        cible = self.ranger(cartes, boite)
        for c, p in zip(cartes, cible):
            c.scale(p.width / c.width).move_to(p)
        self.play(*[TransformFromCopy(m, c) for m, c in zip(morceaux, cartes)],
                  *[m.animate.set_opacity(0.35) for m in morceaux], run_time=run_time)

    def fusionner(self, cartes, texte, fam, boite):
        une = self.carte(texte, fam).move_to(boite[0].get_center() + DOWN * 0.22)
        self.play(ReplacementTransform(VGroup(*cartes), une), run_time=0.9)
        return une

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Réduire une expression littérale", 50, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("verte").move_to(P(-0.6, -2.4))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech))
        self.au_mot("un moins se trouve")
        q = self.ligne([self.expr("5x − (2x − 3)", 72), self.t("= ?", 72, BLEU_CALCUL)], buff=0.4)
        q.move_to(P(-0.6, 0.3))
        self.play(FadeIn(q, shift=UP * 0.2))
        moins = q[0][2]
        self.play(moins.animate.set_color(SIGNE_MOINS))
        self.insister(moins, 1.8)
        self.attendre_voix(marge=1.5)

    # ── 01 : les familles ───────────────────────────────────────────────────

    def ecran_familles(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-familles")
        self.titre_ecran("Rappel : les familles")
        self.au_mot("on ne regroupe que")
        regle = self.t("On ne regroupe que les termes de la même famille.", 32, BLEU_CALCUL).move_to(P(-0.6, 2.6))
        self.play(FadeIn(regle, shift=DOWN * 0.2))
        sep = DashedLine(P(-0.2, 2.1), P(-0.2, -2.4), color=GREY_B, dash_length=0.15)
        self.add(sep)

        # à gauche : 4a − 2a + 3
        xg = -3.8
        ba = self.boite("a", FAM_X, P(xg - 1.35, -0.1), largeur=2.7, hauteur=1.9)
        bn = self.boite("nombres", FAM_NB, P(xg + 1.5, -0.1), largeur=2.3, hauteur=1.9)
        self.au_mot("4 a moins 2 a plus 3")
        e1 = self.expr("4a − 2a + 3", 52).move_to(P(xg, 1.6))
        self.play(Write(e1), FadeIn(ba), FadeIn(bn))
        ca = [self.carte("4a", FAM_X), self.carte("− 2a", FAM_X)]
        cn = [self.carte("+ 3", FAM_NB)]
        self.tirer([e1[0:2], e1[2:5]], ca, ba)
        self.tirer([e1[5:7]], cn, bn, run_time=0.8)
        self.au_mot(": 2 a plus 3")
        ua = self.fusionner(ca, "2a", FAM_X, ba)
        r1 = self.ligne([self.expr("4a − 2a + 3", 40), self.t("=", 40), self.expr("2a + 3", 40)], buff=0.22)
        r1.move_to(P(xg, -1.75))
        self.play(Write(r1))
        cadre = SurroundingRectangle(r1[2], color=VERT_OK, buff=0.12)
        self.play(Create(cadre), Indicate(ua, color=FAM_X))

        # à droite : 2x + 3x² ≠ 5x²
        xd = 2.7
        self.au_mot("Et 2 x plus 3 x au carré")
        e2 = self.expr("2x + 3x²", 56).move_to(P(xd - 0.7, 1.6))
        self.play(Write(e2))
        self.au_mot("ne fait pas 5 x au carré")
        f2 = self.ligne([self.t("=", 56, ROUGE_ERREUR), self.t("5x²", 56, ROUGE_ERREUR)], buff=0.2)
        f2.next_to(e2, RIGHT, buff=0.25)
        self.play(FadeIn(f2))
        self.play(Create(self.barrer(f2)))
        bx = self.boite("x", FAM_X, P(xd - 1.3, -0.1), largeur=2.3, hauteur=1.9)
        b2 = self.boite("x²", FAM_CARRE, P(xd + 1.3, -0.1), largeur=2.3, hauteur=1.9)
        self.au_mot(": x et x au carré")
        self.play(FadeIn(bx), FadeIn(b2))
        self.tirer([e2[0:2]], [self.carte("2x", FAM_X)], bx, run_time=0.9)
        self.tirer([e2[2:6]], [self.carte("+ 3x²", FAM_CARRE)], b2, run_time=0.9)
        self.au_mot("ne sont pas de la même famille")
        self.play(Write(self.chute("x et x² : deux familles différentes.", color=ROUGE_ERREUR, font_size=34)))
        self.attendre_voix()

    # ── 02 et 03 : la parenthèse et son interrupteur ────────────────────────

    def ecran_parenthese(self, voix, signe):
        """Un écran « + ( … ) » ou « − ( … ) » : même mise en page, seul
        l'interrupteur change tout."""
        self.clear()
        self.add_mascotte()
        self.dire(voix)
        plus = signe == "+"
        mot = "plus" if plus else "moins"
        self.titre_ecran(f"Un {signe} devant une parenthèse")
        if plus:
            self.au_mot("on l'enlève sans rien changer")
            regle = self.t("+ ( … ) : on enlève les parenthèses, rien ne change.", 32, BLEU_CALCUL)
        else:
            self.au_mot("on change le signe")
            regle = self.t("− ( … ) : on change le signe de CHAQUE terme.", 32, SIGNE_MOINS)
        regle.move_to(P(-0.6, 2.6))
        self.play(FadeIn(regle, shift=DOWN * 0.2))

        e = self.expr(f"5x {signe} (2x − 3)", 72).move_to(P(-1.0, 1.05))
        e[2].set_color(SIGNE_PLUS if plus else SIGNE_MOINS)
        inter = interrupteur().move_to(P(e[2].get_x(), e.get_bottom()[1] - 0.4))
        lbl = self.t("interrupteur", 22, GREY_B).next_to(inter, DOWN, buff=0.1)
        self.au_mot(f"5 x {mot}, parenthèse")
        self.play(Write(e[0:4]), FadeIn(inter), FadeIn(lbl))
        self.au_mot("2 x moins 3 :")
        ps = self.pastilles([e[4:6], e[6:8]], ["+", "−"], haut=0.42)
        self.play(Write(e[4:9]), *[GrowFromCenter(p) for p in ps])
        self.au_mot(f": 5 x {mot} 2 x")
        if plus:
            # rien ne bascule : l'interrupteur reste éteint
            self.play(Indicate(inter, color=GREY_B), e[3].animate.set_opacity(0.3), e[8].animate.set_opacity(0.3))
            self.play(*[Indicate(p, color=p[0].get_stroke_color(), scale_factor=1.3) for p in ps])
            l2 = self.suite(e, "5x + 2x − 3", 60, buff=1.15)
            self.play(Write(l2))
            rien = self.t("rien ne bascule", 28, BLEU_CALCUL).next_to(ps[1], RIGHT, buff=0.35)
            self.play(FadeIn(rien))
            self.au_mot("donc 7 x moins 3")
            l3 = self.suite(l2, "7x − 3", 60, buff=0.45)
        else:
            self.allumer(inter)
            self.play(e[3].animate.set_opacity(0.3), e[8].animate.set_opacity(0.3), run_time=0.4)
            ps = [self.basculer(p) for p in ps]
            l2 = self.suite(e, "5x − 2x + 3", 60, buff=1.15)
            self.play(Write(l2))
            self.play(*[Indicate(l2[1][i], color=c, scale_factor=1.8)
                        for i, c in ((2, SIGNE_MOINS), (5, SIGNE_PLUS))])
            self.au_mot("Donc 3 x plus 3")
            l3 = self.suite(l2, "3x + 3", 60, buff=0.45)
        self.play(Write(l3))
        cadre = SurroundingRectangle(l3[1], color=VERT_OK, buff=0.15)
        self.play(Create(cadre))
        self.insister(VGroup(l3, cadre), 1.3)
        self.attendre_voix()

    # ── 04 : pourquoi ───────────────────────────────────────────────────────

    def ecran_pourquoi(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-pourquoi")
        self.titre_ecran("Pourquoi ?")
        sep = DashedLine(P(-0.3, 2.7), P(-0.3, -2.6), color=GREY_B, dash_length=0.15)
        self.add(sep)
        xg = -3.8
        self.au_mot("Enlever 2 x moins 3")
        haut = self.ligne([self.t("Enlever", 40, BLEU_CALCUL), self.expr("(2x − 3)", 44)], buff=0.25)
        haut.move_to(P(xg, 2.4))
        # le porte-monnaie : dedans, 2x, et un 3 déjà retiré
        corps = RoundedRectangle(width=3.6, height=1.5, corner_radius=0.3, fill_color=CUIR, fill_opacity=0.45,
                                 stroke_color=WHITE, stroke_width=3).move_to(P(xg, 0.85))
        fermoir = VGroup(*[Circle(radius=0.12, fill_color=GREY_B, fill_opacity=1, stroke_width=0)
                           .move_to(corps.get_top() + RIGHT * dx) for dx in (-0.16, 0.16)])
        c2x = self.carte("2x", FAM_X).move_to(P(xg - 0.8, 0.8))
        c3 = self.carte("− 3", FAM_NB).move_to(P(xg + 0.8, 0.8))
        self.play(Write(haut), FadeIn(corps), FadeIn(fermoir), FadeIn(c2x), FadeIn(c3))
        self.au_mot("c'est enlever 2 x")
        r2x = self.carte("− 2x", FAM_X).move_to(P(xg - 1.0, -0.9))
        self.play(ReplacementTransform(c2x, r2x), run_time=1.0)
        self.au_mot("mais ce n'est pas enlever 3")
        self.play(Wiggle(c3, scale_value=1.2))
        self.au_mot("le moins 3, on l'avait déjà retiré")
        r3 = self.carte("+ 3", FAM_NB).move_to(P(xg + 1.0, -0.9))
        self.play(ReplacementTransform(c3, r3), run_time=1.0)
        self.play(Flash(r3, color=SIGNE_PLUS, flash_radius=0.7))
        note = VGroup(self.t("Le − 3 était déjà retiré :", 26, GREY_A),
                      self.t("on le rend.", 26, GREY_A)).arrange(DOWN, buff=0.1).move_to(P(xg, -2.05))
        self.play(FadeIn(note))

        xd = 2.7
        self.au_mot("Vérifions pour x égale 1")
        xv = self.t("Si x = 1", 40, JAUNE_TITRE).move_to(P(xd, 2.4))
        self.play(FadeIn(xv))
        self.au_mot("5 moins, parenthèse, 2 moins 3")
        v1 = self.expr("5 − (2 − 3)", 44).move_to(P(xd + 0.2, 1.5))
        self.play(Write(v1))
        self.au_mot("ça fait 5 moins moins 1")
        v2 = self.suite(v1, "5 − (−1)", 44, buff=0.3)
        self.play(Write(v2))
        self.au_mot("donc 6")
        v3 = self.suite(v2, "6", 44, buff=0.3)
        self.play(Write(v3))
        self.insister(v3[1])
        self.au_mot("Et 3 plus 3")
        w = self.ligne([self.expr("3x + 3", 40), self.t("→", 40), self.expr("3 + 3", 40)], buff=0.22)
        w.move_to(P(xd - 0.2, -1.05))
        self.play(Write(w))
        self.au_mot(": 6.")
        w2 = self.ligne([self.t("=", 40), self.expr("6", 40)], buff=0.2).next_to(w, RIGHT, buff=0.2)
        self.play(Write(w2))
        ok = self.ligne([self.t("6 = 6", 44, VERT_OK), self.coche()], buff=0.3).move_to(P(xd - 0.3, -2.05))
        self.play(FadeIn(ok[0]))
        self.play(Create(ok[1]))
        self.insister(ok)
        self.attendre_voix()

    # ── 05 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        e = self.expr("5x − (2x − 3)", 72).move_to(P(-1.0, 1.55))
        e[2].set_color(SIGNE_MOINS)
        ps = self.pastilles([e[4:6], e[6:8]], ["+", "−"], haut=0.42)
        self.add(e, *ps)
        self.au_mot("changer seulement le premier signe")
        p0 = self.basculer(ps[0])
        oubli = Circle(radius=0.36, color=ROUGE_ERREUR, stroke_width=5).move_to(ps[1])
        self.play(Create(oubli))
        self.au_mot("5 x moins 2 x moins 3")
        f = self.ligne([self.t("=", 60), self.expr("5x − 2x − 3", 60)], buff=0.3)
        f.next_to(e, DOWN, buff=1.2)
        f.shift(RIGHT * (e.get_left()[0] - f[1].get_left()[0]))
        self.play(Write(f))
        self.au_mot("c'est faux")
        self.play(f.animate.set_color(ROUGE_ERREUR))
        self.play(Create(self.barrer(f)))
        self.au_mot("Le moins s'applique")
        yb = e.get_bottom()[1] - 0.12
        fl = VGroup(*[CurvedArrow(P(e[2].get_x(), yb), P(m.get_x(), yb), angle=0.9,
                                  color=SIGNE_MOINS, stroke_width=4, tip_length=0.18)
                      for m in (e[4:6], e[6:8])])
        self.play(LaggedStart(*[Create(a) for a in fl], lag_ratio=0.4), run_time=1.2)
        self.play(FadeOut(oubli), run_time=0.3)
        self.basculer(ps[1])
        self.play(Write(self.chute("Le − s'applique à TOUTE la parenthèse.", color=SIGNE_MOINS, font_size=36)))
        self.attendre_voix()

    # ── 06 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("Réduis")
        self.play(FadeIn(self.t("Réduis :", 40, BLEU_CALCUL).move_to(P(-0.6, 1.9))))
        e = self.expr("4x² − x − (x² − 5x + 2)", 64).move_to(P(-0.6, 0.6))
        e[5].set_color(SIGNE_MOINS)
        self.au_mot("4 x au carré moins x")
        self.play(Write(e[0:5]))
        self.au_mot(", moins, parenthèse")
        self.play(Write(e[5:7]))
        self.au_mot("x au carré moins 5 x")
        self.play(Write(e[7:12]))
        self.au_mot("plus 2")
        self.play(Write(e[12:15]))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        e = self.expr("4x² − x − (x² − 5x + 2)", 56).move_to(P(-0.8, 2.15))
        e[5].set_color(SIGNE_MOINS)
        self.add(e)
        inter = interrupteur(0.8).move_to(P(e[5].get_x(), e.get_bottom()[1] - 0.35))
        self.au_mot("J'enlève la parenthèse")
        ps = [pastille(s, r=0.21, font_size=30).next_to(m, DOWN, buff=0.2)
              for m, s in zip((e[7:9], e[9:12], e[12:14]), "+−+")]
        self.play(FadeIn(inter), *[GrowFromCenter(p) for p in ps])
        self.au_mot("en changeant les signes")
        self.allumer(inter, run_time=0.4)
        self.play(e[6].animate.set_opacity(0.3), e[14].animate.set_opacity(0.3), run_time=0.3)
        ps = [self.basculer(p, run_time=0.5) for p in ps]
        self.au_mot(": 4 x au carré moins x moins x au carré plus 5 x moins 2")
        l2 = self.ligne([self.t("=", 52), self.expr("4x² − x − x² + 5x − 2", 52)], buff=0.3).move_to(P(-0.8, 0.75))
        self.play(Write(l2), run_time=2.2)
        l = l2[1]
        b2 = self.boite("x²", FAM_CARRE, P(-4.5, -1.05), largeur=3.2, hauteur=1.75)
        b1 = self.boite("x", FAM_X, P(-0.85, -1.05), largeur=3.4, hauteur=1.75)
        b0 = self.boite("nombres", FAM_NB, P(2.6, -1.05), largeur=2.6, hauteur=1.75)
        self.au_mot("Les x au carré :")
        self.play(FadeIn(b2), FadeIn(b1), FadeIn(b0), run_time=0.6)
        c2 = [self.carte("4x²", FAM_CARRE), self.carte("− x²", FAM_CARRE)]
        self.tirer([l[0:3], l[5:8]], c2, b2)
        self.au_mot(": 3 x au carré.")
        u2 = self.fusionner(c2, "3x²", FAM_CARRE, b2)
        self.insister(u2, 1.3)
        self.au_mot("Les x : 4 x")
        c1 = [self.carte("− x", FAM_X), self.carte("+ 5x", FAM_X)]
        self.tirer([l[3:5], l[8:11]], c1, b1)
        u1 = self.fusionner(c1, "4x", FAM_X, b1)
        self.insister(u1, 1.3)
        self.au_mot("Le résultat")
        c0 = [self.carte("− 2", FAM_NB)]
        self.tirer([l[11:13]], c0, b0, run_time=0.7)
        res = self.ligne([self.t("=", 54), self.expr("3x² + 4x − 2", 54)], buff=0.3).move_to(P(-0.8, -2.75))
        self.play(Write(res))
        cadre = SurroundingRectangle(res[1], color=VERT_OK, buff=0.14)
        self.play(Create(cadre))
        self.insister(VGroup(res, cadre), 1.25)
        self.attendre_voix(marge=1.5)

    # ── 07 : ce que tu sais faire maintenant ────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        affirmations = [
            ("On regroupe par familles", "On regroupe par familles."),
            ("Un plus devant", "Un + devant une parenthèse ne change rien."),
            ("Un moins change", "Un − change tous les signes."),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 36)).arrange(RIGHT, buff=0.3)
                          for _, txt in affirmations])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6).move_to(P(-0.3, 0.5))
        for (mot, _), l in zip(affirmations, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 4")
        self.play(Write(self.chute("Épisode 4 : développer", color=VERT_OK, font_size=38)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_familles()
        self.ecran_parenthese("02-plus-parenthese", "+")
        self.ecran_parenthese("03-moins-parenthese", "−")
        self.ecran_pourquoi()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")
