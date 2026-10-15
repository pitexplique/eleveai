# demi_droite_graduee_short.py
# EleveAI — Maths 6e — les QUATRE shorts de « La demi-droite graduée », un par
# micro du coach (règle du 04/10/2026 : un short par micro). Voix validées le
# 05/10, débit −10. Tous renvoient à la vidéo longue (demi_droite_graduee.py).
# Exemples DIFFÉRENTS de la vidéo longue : l'élève qui regarde les deux ne
# revoit pas le même calcul.
#
# - ShortLireDemiDroite6e     : « A sur le 3e trait, c'est 3 ? »   (abscisse_lire)
# - ShortPlacerDemiDroite6e   : « où placer 1,7 ? »               (abscisse_placer)
# - ShortFractionDemiDroite6e : « 5/4 plus petit que 1 ? »        (abscisse_fraction)
# - ShortGraduerDemiDroite6e  : « 4 parts = 4 traits ? »          (abscisse_graduer)
#
# ⛔ Zone sûre du 9:16 : rien de vital au-dessus de y = 3,0 ni sous y = −2,2.
#
# Rendu (un par classe) :
#   python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/demi_droite_graduee_short.py ShortLireDemiDroite6e -o eleveai-maths-6e-demi-droite-short-lire --media_dir manim/scripts/6e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *

from charte import *
from gabarit_sixieme import Short6e
from demi_droite_graduee import DemiDroiteGraduee6e, ecrit

LG, CX = 3.2, -0.4    # une droite qui part de 0 : sa flèche finit à x = 2,1
LG2, CX2 = 3.0, -0.3  # une portion (1 → 2) : elle déborde aussi à gauche


class _Dessins:
    """Les dessins de la vidéo longue, repris tels quels."""

    demi_droite = DemiDroiteGraduee6e.demi_droite
    saut = DemiDroiteGraduee6e.saut
    zone = DemiDroiteGraduee6e.zone
    fraction = DemiDroiteGraduee6e.fraction
    barre_parts = DemiDroiteGraduee6e.barre_parts

    def faux(self, y, texte="FAUX !"):
        return self.grand(texte, font_size=80, color=ROUGE_ERREUR).rotate(0.15).move_to([0, y, 0])

    def a_toi(self):
        a = self.grand("À toi !", font_size=56, color=JAUNE_TITRE).move_to([0, 2.5, 0])
        self.play(Write(a))

    def poser(self, *args, **kw):
        """Une droite, posée d'un coup ; renvoie (axe, traits, étiquettes, pt)."""
        axe, tr, lb, pt = self.demi_droite(*args, **kw)
        self.play(Create(axe), Create(tr), FadeIn(lb))
        return axe, tr, lb, pt

    def rangs(self, pt, valeurs, y_dessous=0.55):
        """Les numéros des traits (1, 2, 3…), en orange, sous les traits non écrits."""
        return VGroup(*[Text(str(k + 1), font_size=24, color=ORANGE_RETENUE).move_to(pt(v) + DOWN * y_dessous)
                        for k, v in enumerate(valeurs)])


# ── 1 : lire une abscisse — le pas ne vaut pas toujours 1 ──────────────────

class ShortLireDemiDroite6e(_Dessins, Short6e):
    nom_voix = "6e-demi-droite-short-lire"

    def droite(self, y=1.3):
        return self.demi_droite(0, 10, 5, [0, 10], longueur=LG, centre=(CX, y), font_size=26)

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        axe, tr, lb, pt = self.droite()
        self.play(Create(axe), Create(tr), FadeIn(lb[0]))
        self.au_mot("et plus loin 10")
        self.play(FadeIn(lb[1], shift=UP * 0.2))
        self.au_mot("Le point A")
        a = self.point(pt, 6, "A", color=ORANGE_RETENUE, font_size=30)
        self.play(FadeIn(a, scale=0.5))
        self.au_mot("troisième trait")
        r = self.rangs(pt, [2, 4, 6])
        self.play(LaggedStart(*[FadeIn(x, shift=UP * 0.1) for x in r], lag_ratio=0.35))
        self.au_mot("Beaucoup répondent")
        q = self.grand("A = 3 ?", font_size=66, color=BLEU_CALCUL).move_to([0, -0.2, 0])
        self.play(GrowFromCenter(q))
        self.au_mot("Et c'est faux")
        self.play(FadeIn(self.faux(-1.5), scale=2.0))
        self.attendre_voix(marge=0.3)

    def ecran_piege(self):
        self.clear()
        self.margo_bas()
        self.dire("01-piege")
        axe, tr, lb, pt = self.droite()
        a = self.point(pt, 6, "A", color=ORANGE_RETENUE, font_size=30)
        r = self.rangs(pt, [2, 4, 6])
        self.add(axe, tr, lb, a, r)
        t1 = self.grand("3 = le nombre de traits", font_size=34, color=ORANGE_RETENUE).move_to([0, 0.0, 0])
        self.play(Write(t1), Indicate(r, color=ORANGE_RETENUE))
        self.au_mot("Pas l'abscisse")
        t2 = self.grand("pas l'abscisse !", font_size=40, color=ROUGE_ERREUR).move_to([0, -0.75, 0])
        self.play(FadeIn(t2, scale=1.3))
        self.au_mot("un trait ne vaut pas 1")
        t3 = self.grand("1 trait ≠ 1", font_size=56, color=JAUNE_TITRE).move_to([0, -1.65, 0])
        self.play(Write(t3))
        self.attendre_voix(marge=0.3)

    def ecran_pas(self):
        self.clear()
        self.margo_bas()
        self.dire("02-pas")
        t = self.grand("Je trouve le pas", font_size=44, color=JAUNE_TITRE).move_to([0, 2.6, 0])
        self.play(Write(t))
        axe, tr, lb, pt = self.droite()
        self.add(axe, tr, lb)
        self.au_mot("il y a 5 écarts")
        couleurs = [BLEU_CALCUL, VIOLET_ACCENT] * 3
        ecarts = VGroup(*[self.zone(pt, 2 * k, 2 * k + 2, couleur=couleurs[k]) for k in range(5)])
        nums = VGroup(*[Text(str(k + 1), font_size=24, color=couleurs[k]).move_to(pt(2 * k + 1) + UP * 0.4)
                        for k in range(5)])
        self.play(LaggedStart(*[AnimationGroup(Create(e), FadeIn(n)) for e, n in zip(ecarts, nums)],
                              lag_ratio=0.3), run_time=1.6)
        self.au_mot("10 divisé par 5")
        c = self.grand("10 ÷ 5 = 2", font_size=64, color=BLEU_CALCUL).move_to([0, -0.2, 0])
        self.play(Write(c))
        self.au_mot("Le pas vaut 2")
        p = self.grand("le pas = 2", font_size=56, color=ORANGE_RETENUE).move_to([0, -1.4, 0])
        self.play(GrowFromCenter(p))
        self.attendre_voix(marge=0.3)

    def ecran_compter(self):
        self.clear()
        self.margo_bas()
        self.dire("03-compter")
        t = self.grand("Je compte depuis 0", font_size=40, color=JAUNE_TITRE).move_to([0, 2.6, 0])
        axe, tr, lb, pt = self.droite(y=1.0)
        a = self.point(pt, 6, "A", color=ORANGE_RETENUE, font_size=30, haut=False)
        self.add(axe, tr, lb, a)
        self.play(Write(t))
        self.au_mot("de 2 en 2")
        precedent = 0
        for v, mot in ((2, "de 2 en 2 : 2"), (4, "4, 6"), (6, "6.")):
            self.au_mot(mot)
            self.play(Create(self.saut(pt, precedent, v, str(v), couleur=BLEU_CALCUL, font_size=28)), run_time=0.5)
            precedent = v
        self.au_mot("L'abscisse de A")
        r = self.grand("A = 6", font_size=84, color=VERT_OK).move_to([0, -0.9, 0])
        self.play(a.animate.set_color(VERT_OK), GrowFromCenter(r))
        self.play(Circumscribe(r, color=VERT_OK))
        self.attendre_voix(marge=0.3)

    def ecran_defi(self):
        self.clear()
        self.margo_bas()
        self.dire("04-defi")
        self.a_toi()
        axe, tr, lb, pt = self.poser(0, 20, 4, [0, 20], longueur=LG, centre=(CX, 1.2), font_size=26)
        self.au_mot("avec 4 écarts")
        e = self.grand("4 écarts", font_size=40, color=ORANGE_RETENUE).move_to([0, 0.1, 0])
        self.play(FadeIn(e))
        self.au_mot("Le point B")
        b = self.point(pt, 15, "B", color=BLEU_CALCUL, font_size=30)
        r = self.rangs(pt, [5, 10, 15])
        self.play(FadeIn(b, scale=0.5), FadeIn(r))
        self.au_mot("Quelle est son abscisse")
        q = self.grand("B = ?", font_size=76, color=JAUNE_TITRE).move_to([0, -1.2, 0])
        self.play(GrowFromCenter(q))
        self.attendre_voix(marge=2.0)

    def construct(self):
        self.ecran_accroche()
        self.ecran_piege()
        self.ecran_pas()
        self.ecran_compter()
        self.ecran_defi()
        self.ecran_renvoi("05-fin")


# ── 2 : placer 1,7 — on avance de 7 dixièmes ──────────────────────────────

class ShortPlacerDemiDroite6e(_Dessins, Short6e):
    nom_voix = "6e-demi-droite-short-placer"

    def droite(self, n=10, y=0.8):
        return self.demi_droite(1, 2, n, [1, 2], longueur=LG2, centre=(CX2, y), font_size=30, origine=False)

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        q = self.grand("Placer 1,7", font_size=72, color=BLEU_CALCUL).move_to([0, 2.3, 0])
        self.play(GrowFromCenter(q))
        self.au_mot("Entre 1 et 2")
        axe, tr, lb, pt = self.droite(n=1)
        self.play(Create(axe), Create(tr), FadeIn(lb))
        self.play(Create(self.zone(pt, 1, 2)))
        self.au_mot("où exactement")
        o = self.grand("Où exactement ?", font_size=48, color=JAUNE_TITRE).move_to([0, -0.9, 0])
        self.play(Write(o))
        self.attendre_voix(marge=0.3)

    def ecran_dixiemes(self):
        self.clear()
        self.margo_bas()
        self.dire("01-dixiemes")
        axe, tr, lb, pt = self.droite()
        self.play(Create(axe), Create(VGroup(tr[0], tr[10])), FadeIn(lb))
        self.au_mot("en 10")
        self.play(LaggedStart(*[Create(tr[k]) for k in range(1, 10)], lag_ratio=0.12))
        dix = self.grand("10 parts", font_size=44, color=WHITE).move_to([0, 2.3, 0])
        self.play(FadeIn(dix))
        self.au_mot("Chaque petit trait")
        r = VGroup(self.grand("1 petit trait", font_size=44, color=VIOLET_ACCENT),
                   self.grand("= 0,1", font_size=64, color=VIOLET_ACCENT)).arrange(DOWN, buff=0.25)
        r.move_to([0, -0.9, 0])
        self.play(Write(r))
        self.attendre_voix(marge=0.3)

    def ecran_avancer(self):
        self.clear()
        self.margo_bas()
        self.dire("02-avancer")
        axe, tr, lb, pt = self.droite()
        self.add(axe, tr, lb)
        self.au_mot("Je vais à 1")
        cur = Dot(pt(1), color=ORANGE_RETENUE, radius=0.1)
        compteur = self.grand("1", font_size=96, color=ORANGE_RETENUE).move_to([0, -0.8, 0])
        self.play(FadeIn(cur, scale=2), FadeIn(compteur))
        self.au_mot("j'avance de 7 dixièmes")
        sept = self.grand("+ 7 dixièmes", font_size=44, color=VIOLET_ACCENT).move_to([0, 2.3, 0])
        self.play(FadeIn(sept))
        for k in range(1, 8):
            v = round(1 + k / 10, 1)
            self.au_mot(f"1 virgule {k}")
            s = self.saut(pt, round(v - 0.1, 1), v, None, couleur=ORANGE_RETENUE)
            self.play(Create(s), cur.animate.move_to(pt(v)),
                      Transform(compteur, self.grand(ecrit(v), font_size=96, color=ORANGE_RETENUE).move_to(compteur)),
                      run_time=0.4)
        p = Dot(pt(1.7), color=VERT_OK, radius=0.12)
        self.play(FadeOut(cur), FadeIn(p, scale=0.5), compteur.animate.set_color(VERT_OK))
        self.attendre_voix(marge=0.3)

    def ecran_verifier(self):
        self.clear()
        self.margo_bas()
        self.dire("03-verifier")
        t = self.grand("Je vérifie", font_size=48, color=JAUNE_TITRE).move_to([0, 2.5, 0])
        axe, tr, lb, pt = self.droite()
        p = self.point(pt, 1.7, "1,7", color=VERT_OK, font_size=28)
        self.add(axe, tr, lb, p)
        self.play(Write(t))
        self.au_mot("1 virgule 5 est pile au milieu")
        m = Line(pt(1.5) + DOWN * 0.3, pt(1.5) + UP * 0.3, color=JAUNE_TITRE, stroke_width=6)
        lm = Text("1,5", font_size=28, color=JAUNE_TITRE).move_to(pt(1.5) + DOWN * 0.55)
        mil = self.grand("1,5 = le milieu", font_size=44, color=JAUNE_TITRE).move_to([0, -0.4, 0])
        self.play(Create(m), FadeIn(lm), Write(mil))
        self.au_mot("après le milieu")
        self.play(Create(self.zone(pt, 1.5, 2, couleur=VERT_OK)))
        self.au_mot("plus près de 2")
        r = self.grand("plus près de 2 que de 1", font_size=36, color=VERT_OK).move_to([0, -1.4, 0])
        self.play(Write(r), Indicate(lb[1], color=VERT_OK, scale_factor=1.6))
        self.attendre_voix(marge=0.3)

    def ecran_defi(self):
        self.clear()
        self.margo_bas()
        self.dire("04-defi")
        self.a_toi()
        axe, tr, lb, pt = self.poser(3, 4, 10, [3, 4], longueur=LG2, centre=(CX2, 0.9),
                                     font_size=30, origine=False)
        self.au_mot("sur quel trait")
        q = VGroup(self.grand("3,4 :", font_size=64, color=BLEU_CALCUL),
                   self.grand("quel trait ?", font_size=56, color=JAUNE_TITRE)).arrange(DOWN, buff=0.3)
        q.move_to([0, -0.9, 0])
        self.play(Write(q))
        self.attendre_voix(marge=2.0)

    def construct(self):
        self.ecran_accroche()
        self.ecran_dixiemes()
        self.ecran_avancer()
        self.ecran_verifier()
        self.ecran_defi()
        self.ecran_renvoi("05-fin")


# ── 3 : une fraction plus grande que 1 — cinq quarts ──────────────────────

class ShortFractionDemiDroite6e(_Dessins, Short6e):
    nom_voix = "6e-demi-droite-short-fraction"

    def droite(self, y=0.2):
        return self.demi_droite(0, 2, 8, [0, 1, 2], longueur=LG, centre=(CX, y), font_size=28)

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        f = self.fraction(5, 4, font_size=96, color=BLEU_CALCUL)
        q = Text("< 1 ?", font_size=80, color=JAUNE_TITRE)
        g = VGroup(f, q).arrange(RIGHT, buff=0.35).move_to([0, 1.7, 0])
        self.play(GrowFromCenter(f))
        self.play(FadeIn(q, scale=1.3))
        self.au_mot("Plaçons-le")
        axe, tr, lb, pt = self.droite(y=-0.6)
        self.play(Create(axe), Create(VGroup(tr[0], tr[4], tr[8])), FadeIn(lb))
        self.attendre_voix(marge=0.3)

    def ecran_quarts(self):
        self.clear()
        self.margo_bas()
        self.dire("01-quarts")
        axe, tr, lb, pt = self.droite()
        self.add(axe, VGroup(tr[0], tr[4], tr[8]), lb)
        self.au_mot("On coupe l'unité")
        barre = self.barre_parts(4, 0, largeur=LG / 2, hauteur=0.4,
                                 centre=[(pt(0)[0] + pt(1)[0]) / 2, 1.9, 0], couleur=VIOLET_ACCENT)
        self.play(FadeIn(barre, shift=DOWN * 0.2))
        self.play(Create(VGroup(*[tr[k] for k in (1, 2, 3, 5, 6, 7)])))
        self.au_mot("Chaque trait vaut")
        r = VGroup(Text("1 trait =", font_size=44), self.fraction(1, 4, font_size=48, color=VIOLET_ACCENT))
        r.arrange(RIGHT, buff=0.25).move_to([0, -1.2, 0])
        self.play(Write(r))
        self.attendre_voix(marge=0.3)

    def ecran_compter(self):
        self.clear()
        self.margo_bas()
        self.dire("02-compter")
        axe, tr, lb, pt = self.droite()
        barre = self.barre_parts(4, 0, largeur=LG / 2, hauteur=0.4,
                                 centre=[(pt(0)[0] + pt(1)[0]) / 2, 1.9, 0], couleur=VIOLET_ACCENT)
        self.add(axe, tr, lb, barre)
        self.fr = {}
        for k, mot in ((1, "un quart"), (2, "deux quarts"), (3, "trois quarts"), (4, "quatre quarts.")):
            self.au_mot(mot)
            coul = JAUNE_TITRE if k == 4 else VIOLET_ACCENT
            f = self.fraction(k, 4, font_size=22, color=coul).move_to(pt(k / 4) + UP * 0.65)
            self.play(FadeIn(f, shift=DOWN * 0.1), barre[k - 1].animate.set_fill(VIOLET_ACCENT, opacity=0.85),
                      run_time=0.45)
        self.au_mot("pile sur 1")
        p = Dot(pt(1), color=JAUNE_TITRE, radius=0.11)
        r = VGroup(self.fraction(4, 4, font_size=56, color=JAUNE_TITRE), Text("= 1", font_size=60, color=JAUNE_TITRE))
        r.arrange(RIGHT, buff=0.3).move_to([0, -1.2, 0])
        self.play(FadeIn(p, scale=0.5), Indicate(lb[1], color=JAUNE_TITRE, scale_factor=1.6), Write(r))
        self.attendre_voix(marge=0.3)

    def ecran_cinq(self):
        self.clear()
        self.margo_bas()
        self.dire("03-cinq")
        axe, tr, lb, pt = self.droite()
        fr = VGroup(*[self.fraction(k, 4, font_size=22, color=JAUNE_TITRE if k == 4 else VIOLET_ACCENT)
                      .move_to(pt(k / 4) + UP * 0.65) for k in range(1, 5)])
        self.add(axe, tr, lb, fr)
        self.au_mot("Encore un trait")
        s = self.saut(pt, 1, 1.25, None, couleur=VERT_OK, haut=0.12)
        self.play(Create(s))
        f5 = self.fraction(5, 4, font_size=22, color=VERT_OK).move_to(pt(1.25) + UP * 0.65)
        p = Dot(pt(1.25), color=VERT_OK, radius=0.12)
        self.play(FadeIn(p, scale=0.5), FadeIn(f5))
        self.au_mot("On a dépassé 1")
        d = self.grand("On a dépassé 1 !", font_size=48, color=VERT_OK).move_to([0, -1.2, 0])
        self.play(GrowFromCenter(d), Create(self.zone(pt, 0, 1, couleur=JAUNE_TITRE)))
        self.attendre_voix(marge=0.3)

    def ecran_verdict(self):
        self.clear()
        self.margo_bas()
        self.dire("04-verdict")
        f = self.fraction(5, 4, font_size=84, color=WHITE, color_num=ORANGE_RETENUE, color_den=BLEU_CALCUL)
        sup = Text("> 1", font_size=76, color=VERT_OK)
        g = VGroup(f, sup).arrange(RIGHT, buff=0.3).move_to([0.45, 1.5, 0])
        self.play(GrowFromCenter(f))
        self.play(Write(sup))
        self.au_mot("Quand le haut")
        haut = Text("haut", font_size=30, color=ORANGE_RETENUE).next_to(f[0], LEFT, buff=0.35)
        bas = Text("bas", font_size=30, color=BLEU_CALCUL).next_to(f[2], LEFT, buff=0.35)
        self.play(FadeIn(haut), FadeIn(bas))
        regle = VGroup(self.grand("haut > bas", font_size=56, color=ORANGE_RETENUE),
                       self.grand("la fraction dépasse 1", font_size=38, color=VERT_OK)).arrange(DOWN, buff=0.3)
        regle.move_to([0, -0.9, 0])
        self.play(Write(regle[0]))
        self.au_mot("la fraction dépasse 1")
        self.play(Write(regle[1]))
        self.attendre_voix(marge=0.3)

    def ecran_defi(self):
        self.clear()
        self.margo_bas()
        self.dire("05-defi")
        self.a_toi()
        f = self.fraction(3, 2, font_size=96, color=BLEU_CALCUL).move_to([0, 1.2, 0])
        self.play(GrowFromCenter(f))
        choix = VGroup(*[self.grand(t, font_size=40, color=WHITE)
                         for t in ("entre 0 et 1 ?", "entre 1 et 2 ?", "entre 2 et 3 ?")])
        choix.arrange(DOWN, buff=0.35).move_to([0, -0.9, 0])
        for c, mot in zip(choix, ("entre 0 et 1", "entre 1 et 2", "entre 2 et 3")):
            self.au_mot(mot)
            self.play(FadeIn(c, shift=RIGHT * 0.2), run_time=0.4)
        self.attendre_voix(marge=2.0)

    def construct(self):
        self.ecran_accroche()
        self.ecran_quarts()
        self.ecran_compter()
        self.ecran_cinq()
        self.ecran_verdict()
        self.ecran_defi()
        self.ecran_renvoi("06-fin")


# ── 4 : graduer — 4 parts, mais 3 traits ──────────────────────────────────

class ShortGraduerDemiDroite6e(_Dessins, Short6e):
    nom_voix = "6e-demi-droite-short-graduer"

    CM = 0.45  # 8 cm → 3,6 unités

    def x(self, c):
        return -1.95 + c * self.CM

    def segment(self, y, n_cm=8):
        seg = Line([self.x(0), y, 0], [self.x(n_cm), y, 0], stroke_width=5)
        bouts = VGroup(*[Line([self.x(c), y - 0.2, 0], [self.x(c), y + 0.2, 0], stroke_width=5)
                         for c in (0, n_cm)])
        return VGroup(seg, bouts)

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        s = self.segment(2.0)
        self.play(Create(s))
        p = self.grand("4 parts égales", font_size=44, color=VIOLET_ACCENT).move_to([0, 1.1, 0])
        self.play(FadeIn(p))
        self.au_mot("combien de traits")
        q = self.grand("combien de traits ?", font_size=40, color=JAUNE_TITRE).move_to([0, 0.1, 0])
        self.play(Write(q))
        self.au_mot("4 ?")
        q4 = self.grand("4 ?", font_size=80, color=BLEU_CALCUL).move_to([0, -0.6, 0])
        self.play(GrowFromCenter(q4))
        self.au_mot("Non")
        self.play(FadeIn(self.faux(-1.75, "NON !"), scale=2.0))
        self.attendre_voix(marge=0.3)

    def ecran_segment(self):
        self.clear()
        self.margo_bas()
        self.dire("01-segment")
        s = self.segment(1.3)
        l8 = self.grand("8 cm", font_size=44).move_to([0, 2.2, 0])
        self.play(Create(s), FadeIn(l8))
        self.au_mot("4 parts égales")
        p = self.grand("4 parts égales", font_size=40, color=VIOLET_ACCENT).move_to([0, 0.2, 0])
        self.play(FadeIn(p))
        self.au_mot("8 divisé par 4")
        c = self.grand("8 ÷ 4 = 2", font_size=72, color=BLEU_CALCUL).move_to([0, -1.0, 0])
        self.play(Write(c))
        self.attendre_voix(marge=0.3)

    def traits(self, y):
        g = VGroup()
        for c in (2, 4, 6):
            m = Line([self.x(c), y - 0.28, 0], [self.x(c), y + 0.28, 0], color=ORANGE_RETENUE, stroke_width=6)
            l = Text(f"{c} cm", font_size=22, color=ORANGE_RETENUE).move_to([self.x(c), y - 0.55, 0])
            g.add(VGroup(m, l))
        return g

    def ecran_traits(self):
        self.clear()
        self.margo_bas()
        self.dire("02-traits")
        t = self.grand("un trait tous les 2 cm", font_size=36, color=ORANGE_RETENUE).move_to([0, 2.4, 0])
        s = self.segment(1.0)
        self.add(s)
        self.play(Write(t))
        tr = self.traits(1.0)
        for m, mot in zip(tr, ("à 2", "à 4", "à 6")):
            self.au_mot(mot)
            self.play(Create(m[0]), FadeIn(m[1]), run_time=0.4)
        self.attendre_voix(marge=0.3)

    def ecran_compter(self):
        self.clear()
        self.margo_bas()
        self.dire("03-compter")
        y = 1.0
        s = self.segment(y)
        tr = self.traits(y)
        self.add(s, tr)
        self.au_mot("Je compte les parts")
        couleurs = [BLEU_CALCUL, VIOLET_ACCENT, BLEU_CALCUL, VIOLET_ACCENT]
        for k in range(4):
            self.au_mot(f"{k + 1}, " if k < 3 else "4. Et")
            part = Line([self.x(2 * k), y, 0], [self.x(2 * k + 2), y, 0], color=couleurs[k], stroke_width=10)
            n = Text(str(k + 1), font_size=30, color=couleurs[k]).move_to([self.x(2 * k + 1), y + 0.45, 0])
            self.play(Create(part), FadeIn(n), run_time=0.35)
        self.au_mot("Et les traits")
        for k in range(3):
            self.au_mot(("intérieur : 1", "intérieur : 1, 2", "1, 2, 3. 4")[k])
            self.play(Indicate(tr[k][0], color=ORANGE_RETENUE, scale_factor=1.4), run_time=0.4)
        self.au_mot("4 parts, mais")
        r = VGroup(self.grand("4 parts", font_size=56, color=VIOLET_ACCENT),
                   self.grand("3 traits !", font_size=64, color=ORANGE_RETENUE)).arrange(DOWN, buff=0.3)
        r.move_to([0, -0.9, 0])
        self.play(Write(r[0]))
        self.play(GrowFromCenter(r[1]))
        self.attendre_voix(marge=0.3)

    def ecran_defi(self):
        self.clear()
        self.margo_bas()
        self.dire("04-defi")
        self.a_toi()
        s = self.segment(1.4)
        l = self.grand("15 cm", font_size=44).move_to([0, 0.75, 0])
        self.au_mot("Un segment de 15")
        self.play(Create(s), FadeIn(l))
        self.au_mot("5 parts égales")
        p = self.grand("5 parts égales", font_size=42, color=VIOLET_ACCENT).move_to([0, -0.05, 0])
        self.play(FadeIn(p))
        self.au_mot("Tous les combien")
        q = VGroup(self.grand("un trait", font_size=44, color=JAUNE_TITRE),
                   self.grand("tous les ? cm", font_size=52, color=JAUNE_TITRE)).arrange(DOWN, buff=0.2)
        q.move_to([0, -1.3, 0])
        self.play(Write(q))
        self.attendre_voix(marge=2.0)

    def construct(self):
        self.ecran_accroche()
        self.ecran_segment()
        self.ecran_traits()
        self.ecran_compter()
        self.ecran_defi()
        self.ecran_renvoi("05-fin")
