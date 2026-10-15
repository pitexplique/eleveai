# relatif_montees_cachees_short.py
# EleveAI — Maths 5e — short « Diagonale des Fous : 3 800 m de montées cachées ».
# Voix validée par Frédéric le 11/10/2026 (« go ») :
#   manim/voix/5e-relatif-nombre-short-montees-cachees.json, Julie, débit −8.
# Micro : 5e `relatif_operation_defi` (`relatif_defi` porte déjà le short « A à −4, B à +1 »).
#
# Les 35 points du descriptif officiel 2026 (gabarit_diagonale.PARCOURS).
# Variations d'un point au suivant : montées +6 419, descentes −6 372.
# D+ officiel 10 200 → environ 3 800 m cachés entre deux points.
# 6 419 − 6 372 = 47 = 49 − 2 : arrivée − départ, quel que soit le découpage.
# Question : +300 − 500 + 250 = +50 m.
#
# Rendu :
#   python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/5e/relatif_montees_cachees_short.py ShortMonteesCachees5e -o eleveai-maths-5e-relatif-nombre-short-montees-cachees --media_dir manim/scripts/5e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from carte_reunion import CarteReunion
from charte import *
from gabarit_diagonale import ALT_MAX, PARCOURS, ShortDiagonale

Y_MSG = -0.45  # la bande des calculs, entre la carte et le profil


def nom_index(nom):
    return next(i for i, p in enumerate(PARCOURS) if p[2] == nom)


class ShortMonteesCachees5e(ShortDiagonale):
    nom_voix = "5e-relatif-nombre-short-montees-cachees"

    # ── repères ─────────────────────────────────────────────────────────────

    def pp(self, km, alt):
        """Un point du profil (bas de l'écran)."""
        return np.array([-1.7 + km / 180.8 * 3.8, -2.1 + alt / ALT_MAX * 1.15, 0])

    def pc(self, i):
        p = PARCOURS[i]
        return self.carte.point(p[3], p[4])

    def etiquette(self, i, texte=None, direction=None, couleur=WHITE):
        p = PARCOURS[i]
        lab = Text(texte or p[2], font_size=14, color=couleur)
        lab.next_to(self.pc(i), direction if direction is not None else (p[5] if p[5] is not None else UP), buff=0.07)
        if lab.get_left()[0] < -2.15:
            lab.align_to([-2.15, 0, 0], LEFT)
        if lab.get_right()[0] > 2.15:
            lab.align_to([2.15, 0, 0], RIGHT)
        return lab

    def msg(self, *lignes):
        """Remplace le calcul de la bande du milieu (une ou deux lignes)."""
        g = VGroup(*lignes).arrange(DOWN, buff=0.1).move_to([0, Y_MSG, 0])
        return self.zone(g)

    def segment(self, i, couleur, epaisseur=7):
        """Le tronçon i → i+1, surligné sur la carte ET le profil."""
        a, b = PARCOURS[i], PARCOURS[i + 1]
        lc = Line(self.pc(i), self.pc(i + 1), color=couleur, stroke_width=epaisseur)
        lp = Line(self.pp(a[0], a[1]), self.pp(b[0], b[1]), color=couleur, stroke_width=epaisseur)
        return VGroup(lc, lp)

    # ── les écrans ──────────────────────────────────────────────────────────

    def ecran_accroche(self):
        self.dire("00-accroche")
        a = VGroup(self.grand("Les maths,", font_size=50),
                   self.grand("ça sert à rien…", font_size=50)).arrange(DOWN, buff=0.2).move_to([0, 1.6, 0])
        self.play(Write(a))
        self.au_mot("sauf à")
        b = VGroup(self.grand("… sauf à mesurer", font_size=42, color=JAUNE_TITRE),
                   self.grand("la Diagonale", font_size=50, color=JAUNE_TITRE),
                   self.grand("des Fous", font_size=50, color=JAUNE_TITRE)).arrange(DOWN, buff=0.15).move_to([0, -0.6, 0])
        self.play(FadeIn(b, scale=1.2))
        self.attendre_voix(marge=0.4)
        self.play(FadeOut(a), FadeOut(b))

    def ecran_depart(self):
        self.dire("01-depart")
        self.bandeau()
        self.carte = CarteReunion(hauteur=2.3, centre=[0, 1.2, 0], opacite=0.25)
        axe = Line(self.pp(0, 0), self.pp(180.8, 0), color=BLEU_CALCUL, stroke_width=2)
        lmer = Text("0 m", font_size=14, color=BLEU_CALCUL).next_to(axe, LEFT, buff=0.06)
        self.play(FadeIn(self.carte.mer()), Create(self.carte.contour()), Create(axe), FadeIn(lmer), run_time=1.2)
        self.au_mot("Saint-Pierre")
        d0 = Dot(self.pc(0), radius=0.06, color=WHITE)
        l0 = self.etiquette(0, "Saint-Pierre : 2 m")
        self.play(FadeIn(d0, scale=2), FadeIn(l0))
        self.au_mot("Arrivée")
        n = len(PARCOURS) - 1
        d1 = Dot(self.pc(n), radius=0.06, color=WHITE)
        l1 = self.etiquette(n, "La Redoute : 49 m")
        self.play(FadeIn(d1, scale=2), FadeIn(l1))
        self.depart_arrivee = VGroup(d0, l0, d1, l1)
        self.au_mot("180,8")
        self._zone = None
        self.msg(self.grand("180,8 km", font_size=46, color=BLEU_CALCUL))
        self.attendre_voix(marge=0.3)

    def ecran_points(self):
        self.dire("02-points")
        self.msg(self.grand("35 points de pointage", font_size=34))
        pts = VGroup(*[Dot(self.pc(i), radius=0.03, color=WHITE) for i in range(len(PARCOURS))])
        self.play(LaggedStart(*[FadeIn(p, scale=2) for p in pts], lag_ratio=0.05), run_time=1.6)
        self.add(pts)
        self.au_mot("À chaque tronçon")
        self.msg(self.grand("variation", font_size=34, color=JAUNE_TITRE),
                 self.grand("= arrivée − départ", font_size=34, color=JAUNE_TITRE))
        # Le parcours se trace, vert quand ça monte, rouge quand ça descend.
        trace = []
        for i in range(len(PARCOURS) - 1):
            a, b = PARCOURS[i], PARCOURS[i + 1]
            col = VERT_OK if b[1] > a[1] else ROUGE_ERREUR
            trace += [Create(Line(self.pc(i), self.pc(i + 1), color=col, stroke_width=3)),
                      Create(Line(self.pp(a[0], a[1]), self.pp(b[0], b[1]), color=col, stroke_width=3))]
        self.play(LaggedStart(*trace, lag_ratio=0.1), run_time=4.0)
        self.attendre_voix(marge=0.3)

    def ecran_tronçon(self, voix, nom_a, nom_b, mot_a, mot_b, mot_calc, calcul, resultat, couleur, mot_fin, fin,
                      dir_a=LEFT, dir_b=RIGHT):
        self.dire(voix)
        i = nom_index(nom_a)
        self.au_mot(mot_a)
        la = self.etiquette(i, nom_a, direction=dir_a)
        self.msg(self.grand(f"{nom_a} : {PARCOURS[i][1]:,} m".replace(",", " "), font_size=30))
        self.play(FadeIn(la))
        self.au_mot(mot_b)
        lb = self.etiquette(i + 1, nom_b, direction=dir_b)
        self.msg(self.grand(f"{nom_b} : {PARCOURS[i + 1][1]:,} m".replace(",", " "), font_size=30))
        seg = self.segment(i, couleur)
        self.play(FadeIn(lb), Create(seg))
        self.au_mot(mot_calc)
        self.msg(self.grand(calcul, font_size=36),
                 self.grand(resultat, font_size=44, color=couleur))
        self.play(Indicate(seg, color=couleur, scale_factor=1.05))
        self.au_mot(mot_fin)
        # ⚠️ Pas au-dessus de la bande : il y aurait chevauché « Saint-Pierre ».
        self.msg(self.grand(resultat, font_size=44, color=couleur),
                 self.grand(fin, font_size=28, color=couleur))
        self.attendre_voix(marge=0.3)
        self.play(FadeOut(la), FadeOut(lb), seg.animate.set_stroke(width=3))

    def ecran_compteurs(self):
        self.dire("05-compteurs")
        self.msg(self.grand("on additionne tout", font_size=34))
        self.au_mot("Les montées")
        dp = ValueTracker(0)
        cp = always_redraw(lambda: self.grand(f"montées : +{round(dp.get_value()):,}".replace(",", " "),
                                              font_size=34, color=VERT_OK).move_to([0, Y_MSG + 0.22, 0]))
        self.zone()
        self.add(cp)
        self.play(dp.animate.set_value(6419), run_time=1.8)
        self.au_mot("Les descentes")
        dm = ValueTracker(0)
        cm = always_redraw(lambda: self.grand(f"descentes : −{round(dm.get_value()):,}".replace(",", " "),
                                              font_size=34, color=ROUGE_ERREUR).move_to([0, Y_MSG - 0.25, 0]))
        self.add(cm)
        self.play(dm.animate.set_value(6372), run_time=1.8)
        self.attendre_voix(marge=0.3)
        # On fige les compteurs en textes simples pour pouvoir les effacer.
        fp = self.grand("montées : +6 419", font_size=34, color=VERT_OK).move_to(cp.get_center())
        fm = self.grand("descentes : −6 372", font_size=34, color=ROUGE_ERREUR).move_to(cm.get_center())
        self.remove(cp, cm)
        self.add(fp, fm)
        self._zone = VGroup(fp, fm)

    def ecran_manque(self):
        self.dire("06-manque")
        self.msg(self.grand("officiel : +10 200 m", font_size=38, color=JAUNE_TITRE))
        self.au_mot("Il en manque")
        self.msg(self.grand("10 200 − 6 419", font_size=34),
                 self.grand("≈ 3 800 m qui manquent", font_size=32, color=ORANGE_RETENUE))
        self.au_mot("Où sont-ils")
        q = self.grand("?", font_size=90, color=ORANGE_RETENUE).move_to([1.7, 1.2, 0])
        self.play(FadeIn(q, scale=2))
        self.attendre_voix(marge=0.3)
        self.play(FadeOut(q))

    def ecran_cachees(self):
        self.dire("07-cachees")
        # Un tronçon du profil, avec les bosses que le tableau ne voit pas.
        i = nom_index("Mare à Boue")
        a, b = PARCOURS[i], PARCOURS[i + 1]
        pa, pb = self.pp(a[0], a[1]), self.pp(b[0], b[1])
        bosses = [pa]
        for k in range(1, 9):
            t = k / 9
            p = pa + (pb - pa) * t
            bosses.append(p + UP * (0.14 if k % 2 else -0.06))
        bosses.append(pb)
        dents = VMobject(color=ORANGE_RETENUE, stroke_width=4).set_points_as_corners(bosses)
        loupe = Circle(radius=0.55, color=ORANGE_RETENUE, stroke_width=3).move_to((pa + pb) / 2)
        self.msg(self.grand("cachées entre deux points", font_size=32, color=ORANGE_RETENUE))
        self.play(Create(loupe))
        self.au_mot("chaque petite bosse")
        self.play(Create(dents), run_time=1.5)
        self.au_mot("Plus on mesure souvent")
        self.msg(self.grand("plus on mesure souvent,", font_size=30, color=JAUNE_TITRE),
                 self.grand("plus on trouve de montée", font_size=30, color=JAUNE_TITRE))
        self.attendre_voix(marge=0.3)
        self.play(FadeOut(loupe), FadeOut(dents))

    def ecran_somme(self):
        self.dire("08-somme")
        self.msg(self.grand("6 419 − 6 372 = 47", font_size=40))
        self.au_mot("Comme 49")
        self.msg(self.grand("6 419 − 6 372 = 47", font_size=34),
                 self.grand("= 49 − 2", font_size=44, color=JAUNE_TITRE))
        self.play(Indicate(self.depart_arrivee, color=JAUNE_TITRE, scale_factor=1.15))
        self.au_mot("l'arrivée moins le départ")
        self.msg(self.grand("47 = 49 − 2", font_size=40, color=JAUNE_TITRE),
                 self.grand("= arrivée − départ", font_size=32, color=JAUNE_TITRE))
        self.au_mot("ne change jamais")
        self.play(Circumscribe(self._zone, color=JAUNE_TITRE))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.margo_bas()
        self._margo = list(self.mobjects)
        self.ecran_accroche()
        self.ecran_depart()
        self.ecran_points()
        self.ecran_tronçon("03-montee", "Domaine Vidot", "Notre-Dame de la Paix",
                           "Domaine Vidot", "Notre-Dame", "1686 moins 649",
                           "1 686 − 649", "= +1 037", VERT_OK, "La plus grosse", "la plus grosse montée")
        self.ecran_tronçon("04-descente", "Maïdo", "Îlet Savannah",
                           "Maïdo", "Îlet Savannah", "133 moins 1950",
                           "133 − 1 950", "= −1 817", ROUGE_ERREUR, "La plus grosse", "la plus grosse descente",
                           dir_a=RIGHT, dir_b=LEFT)
        self.ecran_compteurs()
        self.ecran_manque()
        self.ecran_cachees()
        self.ecran_somme()
        self.play(*[FadeOut(m) for m in self.mobjects if m not in self._margo])
        self._zone = None
        self.ecran_question("09-question", ["+300 m, −500 m,", "puis +250 m :", "combien de gagné ?"])
        self.ecran_fin()
