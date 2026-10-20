# proba2_calculer.py
# EleveAI — Maths 2de — série « Probabilités », épisode 3 : calculer une
# probabilité en additionnant les probabilités des issues (micro :
# proba_calculer), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : proba2_calculer_short.py (ceinture jaune).
#
# Écrans : 00 garde · 01 la roue de kermesse aux parts inégales (0,4 / 0,25 /
# 0,2 / 0,15) · 02 la règle (on ne compte pas, on additionne) · 03 A = couleur
# chaude, P(A) = 0,4 + 0,15 = 0,55 · 04 on vérifie la loi (somme = 1) ·
# 05 le cas équiprobable (1/n, favorables sur possibles) · 06 le piège 2/4 ·
# 07 défi « pas bleu » · 07b correction 0,75 · 08 ce que tu as appris ·
# 09 fin (eleveai.fr + abonne-toi).
#
# ⭐ Canvas du coach repris (lib/tutor-v4/components/ProbabilitesCanvas.tsx,
# générateurs calcLoiDecP / figureP de la banque seconde) :
#   · « roue » : secteurs proportionnels aux poids, du haut dans le sens des
#     aiguilles, rouge #ef4444 / bleu #3b82f6 / vert #22c55e / jaune #eab308,
#     contour sombre, étiquette blanche cerclée de sombre à 0,62 du rayon ;
#   · « tableau » (tableauLoiP) : « Issue | … » sur fond gris clair,
#     « Probabilité | … » sur fond blanc, cases surlignées en ambre.
#
# Voix : manim/voix/seconde-proba-calculer.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/seconde/proba2_calculer.py Proba2Calculer -o eleveai-maths-seconde-proba-calculer --media_dir manim/scripts/seconde/media
# Puis copier le mp4 dans manim/sorties/seconde/maths/probabilites/03-calculer/.

import importlib.util
import math
import sys
from pathlib import Path

import numpy as np

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parents[1]))
sys.path.insert(0, str(ICI))

from manim import *  # noqa: E402

from charte import *  # noqa: E402


def _charger(nom_fichier, nom_module):
    """Importe un module de CE dossier par son chemin exact (des modules de même
    nom existent ailleurs)."""
    if nom_module in sys.modules:
        return sys.modules[nom_module]
    spec = importlib.util.spec_from_file_location(nom_module, ICI / nom_fichier)
    mod = importlib.util.module_from_spec(spec)
    sys.modules[nom_module] = mod
    spec.loader.exec_module(mod)
    return mod


_ep2 = _charger("proba_modele.py", "seconde_proba_modele_ep2")
_signes = _charger("signes_expression_2de.py", "seconde_signes_expression_2de")
echelle_ceintures = _signes.echelle_ceintures
NotionSeconde2 = _ep2.NotionSeconde2
TableauLoi, roue_coach, etiquette_roue, frac_txt = _ep2.TableauLoi, _ep2.roue_coach, _ep2.etiquette_roue, _ep2.frac_txt
AMBRE_FOND, AMBRE_ENCRE, AMBRE_BORD, ENTETE_FOND = _ep2.AMBRE_FOND, _ep2.AMBRE_ENCRE, _ep2.AMBRE_BORD, _ep2.ENTETE_FOND
SOMBRE = _ep2.SOMBRE
ROUGE_C, BLEU_C, VERT_C = _ep2.ROUGE_C, _ep2.BLEU_C, _ep2.VERT_C
JAUNE_C = "#EAB308"

POIDS = [0.4, 0.25, 0.2, 0.15]
TXT = ["0,4", "0,25", "0,2", "0,15"]
COULEURS = [ROUGE_C, BLEU_C, VERT_C, JAUNE_C]
NOMS = ["Rouge", "Bleu", "Vert", "Jaune"]


def P(x, y):
    return np.array([x, y, 0.0])


class RoueKermesse(VGroup):
    """La roue du coach, posée en `centre`. self.sect[k] : secteurs ;
    self.fixe : moyeu + flèche ; self.lbl(k, texte) : étiquette du secteur k."""

    def __init__(self, centre, rayon, poids=POIDS, couleurs=COULEURS):
        super().__init__()
        self.centre, self.rayon = np.array(centre), rayon
        self.sect, self.milieux, self.fixe = roue_coach(poids, couleurs, rayon)
        VGroup(self.sect, self.fixe).shift(self.centre)
        self.add(self.sect, self.fixe)

    def point(self, k, r=0.62):
        a = self.milieux[k]
        return self.centre + r * self.rayon * P(math.cos(a), math.sin(a))

    def lbl(self, k, texte, fs=28):
        return etiquette_roue(texte, fs).move_to(self.point(k))

    def tourner(self, tours=2, run_time=1.6):
        return Rotate(self.sect, angle=-tours * TAU, about_point=self.centre, run_time=run_time,
                      rate_func=rate_functions.ease_out_cubic)


class Proba2Calculer(NotionSeconde2):
    nom_voix = "seconde-proba-calculer"

    C_ROUE = P(-4.45, 0.15)
    R_ROUE = 2.0

    # ── petits outils (comme l'épisode 2) ───────────────────────────────────

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.2):
        return VGroup(*[m if isinstance(m, Mobject) else self.t(m, font_size, c)
                        for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR, sw=6):
        return Line(mob.get_corner(DL) + P(-0.08, -0.04), mob.get_corner(UR) + P(0.08, 0.04),
                    stroke_width=sw, color=color)

    def etiquette(self, texte, color, font_size=30):
        lbl = self.t(texte, font_size, BLACK)
        fond = RoundedRectangle(width=lbl.width + 0.4, height=lbl.height + 0.3, corner_radius=0.12,
                                fill_color=color, fill_opacity=1, stroke_width=0)
        return VGroup(fond, lbl.move_to(fond))

    def roue(self, centre=None, rayon=None):
        return RoueKermesse(self.C_ROUE if centre is None else centre, rayon or self.R_ROUE)

    def tableau(self, probas=None, y=1.45):
        tab = TableauLoi(NOMS, probas, larg_lab=2.4, larg=1.55, fs=28)
        tab.move_to(P(2.2, y))
        return tab

    def allumer(self, tab, ks):
        """Les colonnes ks du tableau passent en ambre."""
        return [x.animate.set_fill(AMBRE_FOND) for k in ks for x in (tab.ent[k], tab.val[k])]

    def eteindre_secteurs(self, roue, ks, op=0.25):
        return [roue.sect[k].animate.set_fill(opacity=op).set_stroke(opacity=op) for k in ks]

    def somme(self, tete, termes, y, x_gauche=-1.9, fs=40):
        """Prépare « tete = t1 + t2 … » : renvoie (tête, [morceaux de chaque terme])."""
        h = self.ligne([(tete, BLEU_CALCUL), ("=", WHITE)], fs, 0.2)
        h.move_to(P(0, y)).align_to(P(x_gauche, 0), LEFT)
        morceaux, prec = [], h
        for i, (s, c) in enumerate(termes):
            m = self.ligne(([("+", WHITE)] if i else []) + [(s, c)], fs, 0.2)
            m.next_to(prec, RIGHT, buff=0.22)
            morceaux.append(m)
            prec = m
        return h, morceaux

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Calculer une probabilité", 54, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.6))
        roue = self.roue(P(-2.6, 0.2), 1.35)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech),
                  FadeIn(roue, scale=0.8), run_time=1.0)
        self.play(roue.tourner(2, 1.8))
        self.au_mot("additionner")
        sous = self.t("additionner les issues", 44, ORANGE_RETENUE).move_to(P(2.4, 0.2))
        self.play(FadeIn(sous, scale=0.6), run_time=0.5)
        self.insister(sous, 0.35)
        self.attendre_voix(marge=1.0)

    # ── 01 : la roue de kermesse ────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Une roue de kermesse")
        roue = self.roue()
        self.play(FadeIn(roue.sect, scale=0.8), FadeIn(roue.fixe), run_time=0.6)
        self.play(roue.tourner(2, 1.6))
        self.au_mot("pas égales")
        ineg = self.etiquette("parts inégales", ORANGE_RETENUE, 30).next_to(roue, DOWN, buff=0.35)
        self.play(GrowFromCenter(ineg), Indicate(roue.sect[0], color=ROUGE_C, scale_factor=1.06), run_time=0.6)
        self.play(Indicate(roue.sect[3], color=JAUNE_C, scale_factor=1.06), run_time=0.5)
        tab = self.tableau()
        self.play(FadeIn(tab.fonds), FadeIn(tab.txt_lab), run_time=0.5)
        for k, ex in enumerate(["Rouge :", "Bleu :", "Vert :", "Jaune :"]):
            self.au_mot(ex)
            self.play(FadeIn(tab.t_ent[k], shift=DOWN * 0.1), Indicate(roue.sect[k], color=COULEURS[k], scale_factor=1.06),
                      run_time=0.35)
            self.au_mot(TXT[k] + ".")
            self.play(FadeIn(roue.lbl(k, TXT[k]), scale=0.5), FadeIn(tab.ecrire(k, TXT[k]), scale=0.5), run_time=0.4)
        self.attendre_voix()

    def decor(self, avec_tableau=True, y_tab=1.45):
        """La roue étiquetée et le tableau rempli, posés d'un coup (déjà dits)."""
        roue = self.roue()
        lbls = VGroup(*[roue.lbl(k, TXT[k]) for k in range(4)])
        self.add(roue, lbls)
        tab = None
        if avec_tableau:
            tab = self.tableau(TXT, y=y_tab)
            self.add(tab)
        return roue, lbls, tab

    # ── 02 : la règle ───────────────────────────────────────────────────────

    def ecran_regle(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-regle")
        self.titre_ecran("Des issues pas équiprobables")
        roue, lbls, tab = self.decor()
        self.au_mot("pas équiprobables")
        self.play(*[Indicate(roue.sect[k], color=COULEURS[k], scale_factor=1.08) for k in range(4)], run_time=0.7)
        self.au_mot("on ne compte pas")
        compte = self.t("compter les parts", 40, WHITE).move_to(P(2.2, -0.75))
        self.play(FadeIn(compte, shift=UP * 0.15), run_time=0.5)
        self.play(Create(self.barrer(compte, sw=7)), run_time=0.4)
        self.au_mot("on additionne")
        add = self.t("additionner leurs probabilités", 40, VERT_OK).move_to(P(2.2, -1.85))
        cadre = SurroundingRectangle(add, color=VERT_OK, buff=0.2)
        self.play(FadeIn(add, shift=UP * 0.15), *self.allumer(tab, range(4)), run_time=0.6)
        self.play(Create(cadre), run_time=0.4)
        self.insister(add, 0.35)
        self.attendre_voix()

    # ── 03 : A = couleur chaude ─────────────────────────────────────────────

    def ecran_calcul(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-calcul")
        self.titre_ecran("La probabilité d'un événement")
        roue, lbls, tab = self.decor()
        self.au_mot("L'événement A")
        ev = self.etiquette("A : « couleur chaude »", ORANGE_RETENUE, 30).move_to(P(2.2, -0.35))
        self.play(GrowFromCenter(ev), run_time=0.5)
        self.au_mot("rouge ou")
        self.play(*self.allumer(tab, [0]), Indicate(roue.sect[0], color=ROUGE_C, scale_factor=1.08), run_time=0.4)
        self.au_mot("jaune.")
        self.play(*self.allumer(tab, [3]), Indicate(roue.sect[3], color=JAUNE_C, scale_factor=1.08), run_time=0.4)
        self.play(*self.eteindre_secteurs(roue, [1, 2]), lbls[1].animate.set_opacity(0.3),
                  lbls[2].animate.set_opacity(0.3), run_time=0.5)
        self.au_mot("P de A")
        h, (m1, m2) = self.somme("P(A)", [("0,4", ROUGE_C), ("0,15", JAUNE_C)], y=-1.6, x_gauche=-1.6, fs=44)
        self.play(FadeIn(h, shift=UP * 0.15), run_time=0.4)
        self.au_mot("0,4 plus")
        self.play(TransformFromCopy(tab.t_val[0], m1[-1]), run_time=0.5)
        self.au_mot("plus 0,15")
        self.play(FadeIn(m2[0]), TransformFromCopy(tab.t_val[3], m2[-1]), run_time=0.5)
        self.au_mot("soit 0,55")
        res = self.ligne([("=", WHITE), ("0,55", VERT_OK)], 44, 0.2).next_to(m2, RIGHT, buff=0.25)
        self.play(FadeIn(res, scale=0.5), run_time=0.4)
        self.play(Create(SurroundingRectangle(res[1], color=VERT_OK, buff=0.12)), run_time=0.3)
        self.insister(res[1], 0.35)
        self.attendre_voix()

    # ── 04 : on vérifie la loi ──────────────────────────────────────────────

    def ecran_verifier(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-verifier")
        self.titre_ecran("On vérifie la loi")
        roue, lbls, tab = self.decor()
        self.au_mot("On vérifie")
        self.play(Indicate(tab.txt_lab[1], color=BLEU_CALCUL), run_time=0.5)
        ms = [self.t(TXT[0], 40, COULEURS[0])]
        for k in range(1, 4):
            ms.append(self.ligne([("+", WHITE), (TXT[k], COULEURS[k])], 40, 0.2))
        un = self.ligne([("=", WHITE), ("1", VERT_OK)], 44, 0.2)
        VGroup(*ms, un).arrange(RIGHT, buff=0.22).move_to(P(2.2, -0.75))
        for k, ex in enumerate(["0,4 plus", "plus 0,25", "0,2 plus", "plus 0,15"]):
            self.au_mot(ex)
            cible = ms[k] if k == 0 else ms[k][-1]
            anims = [TransformFromCopy(tab.t_val[k], cible), *self.allumer(tab, [k]),
                     Indicate(roue.sect[k], color=COULEURS[k], scale_factor=1.06)]
            if k:
                anims.append(FadeIn(ms[k][0]))
            self.play(*anims, run_time=0.4)
        self.au_mot("égale 1")
        self.play(FadeIn(un, scale=0.5), run_time=0.4)
        self.insister(un[1], 0.35)
        self.au_mot("correcte")
        ok = VGroup(self.coche(taille=0.28), self.t("loi correcte", 38, VERT_OK)).arrange(RIGHT, buff=0.3)
        ok.move_to(P(2.2, -1.9))
        self.play(Create(ok[0]), FadeIn(ok[1], shift=RIGHT * 0.2), run_time=0.6)
        self.attendre_voix()

    # ── 05 : le cas équiprobable ────────────────────────────────────────────

    def ecran_equiprobable(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-equiprobable")
        self.titre_ecran("Et si c'est équiprobable ?")
        six = [ROUGE_C, BLEU_C, VERT_C, JAUNE_C, "#A855F7", "#F97316"]
        roue = RoueKermesse(self.C_ROUE, self.R_ROUE, poids=[1] * 6, couleurs=six)
        self.au_mot("équiprobables")
        self.play(FadeIn(roue, scale=0.8), run_time=0.5)
        self.play(roue.tourner(1, 1.2))
        self.au_mot("1 sur n")
        lbls = VGroup(*[roue.lbl(k, "1/n", 26) for k in range(6)])
        chacune = self.ligne([("chaque issue :", WHITE), (frac_txt(1, "n", 38, JAUNE_TITRE), None)], 40, 0.3)
        chacune.move_to(P(2.2, 1.6))
        self.play(LaggedStart(*[FadeIn(x, scale=0.5) for x in lbls], lag_ratio=0.1), FadeIn(chacune, shift=UP * 0.15),
                  run_time=0.8)
        self.au_mot("Additionner")
        self.play(*[roue.sect[k].animate.set_fill(opacity=0.25) for k in (2, 3, 4, 5)],
                  *[lbls[k].animate.set_opacity(0.3) for k in (2, 3, 4, 5)], run_time=0.5)
        self.au_mot("compter")
        eg = self.ligne([("additionner", BLEU_CALCUL), ("=", WHITE), ("compter", BLEU_CALCUL)], 40, 0.3)
        eg.move_to(P(2.2, 0.45))
        self.play(FadeIn(eg, shift=UP * 0.15), run_time=0.5)
        self.au_mot("favorables sur possibles")
        f = VGroup(self.t("favorables", 36, VERT_OK), Line(LEFT * 1.3, RIGHT * 1.3, color=WHITE, stroke_width=3),
                   self.t("possibles", 36, WHITE)).arrange(DOWN, buff=0.1)
        form = self.ligne([("P =", WHITE), (f, None)], 40, 0.3).move_to(P(2.2, -0.95))
        self.play(FadeIn(form, shift=UP * 0.15), run_time=0.6)
        self.insister(form, 0.3)
        self.au_mot("cas particulier")
        cp = self.etiquette("un cas particulier", ORANGE_RETENUE, 30).move_to(P(2.2, -2.35))
        self.play(GrowFromCenter(cp), run_time=0.5)
        self.attendre_voix()

    # ── 06 : le piège 2/4 ───────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        roue, lbls, _ = self.decor(avec_tableau=False)
        self.au_mot("dire 2 sur 4")
        faux = self.ligne([("P(A)", WHITE), ("=", WHITE), (frac_txt(2, 4, 44, ORANGE_RETENUE), None),
                           ("?", ORANGE_RETENUE)], 44, 0.25).move_to(P(1.6, 1.6))
        self.play(FadeIn(faux, shift=DOWN * 0.15), run_time=0.5)
        self.insister(faux[2], 0.3)
        self.au_mot("2 couleurs sur 4")
        self.play(*self.eteindre_secteurs(roue, [1, 2], 0.35), lbls[1].animate.set_opacity(0.3),
                  lbls[2].animate.set_opacity(0.3), run_time=0.4)
        self.play(Indicate(roue.sect[0], color=ROUGE_C, scale_factor=1.08),
                  Indicate(roue.sect[3], color=JAUNE_C, scale_factor=1.08), run_time=0.6)
        self.au_mot("Faux")
        self.play(Create(self.barrer(faux[2], sw=8)), run_time=0.4)
        self.au_mot("pas la même taille")
        grand = roue.sect[0].copy().set_fill(opacity=1).set_stroke(opacity=1)
        petit = roue.sect[3].copy().set_fill(opacity=1).set_stroke(opacity=1)
        self.play(grand.animate.move_to(P(0.4, -0.4)), petit.animate.move_to(P(3.0, -0.4)), run_time=0.8)
        self.insister(grand, 0.3)
        self.au_mot("Ici, c'est 0,55")
        bon = self.ligne([("P(A)", BLEU_CALCUL), ("=", WHITE), ("0,55", VERT_OK)], 44, 0.25).move_to(P(1.6, -2.2))
        self.play(FadeIn(bon, scale=0.5), run_time=0.4)
        self.play(Create(SurroundingRectangle(bon[2], color=VERT_OK, buff=0.12)), run_time=0.3)
        self.insister(bon[2], 0.3)
        self.attendre_voix()

    # ── 07 : défi « pas bleu » ──────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        roue, lbls, tab = self.decor()
        self.au_mot("la même roue")
        self.play(roue.tourner(2, 1.4))
        self.au_mot("ne pas tomber sur le bleu")
        ev = self.etiquette("pas bleu", BLEU_C, 30).move_to(P(2.2, -0.4))
        self.play(*self.eteindre_secteurs(roue, [1], 0.25), lbls[1].animate.set_opacity(0.3), GrowFromCenter(ev),
                  run_time=0.5)
        q = self.ligne([("P(pas bleu)", BLEU_CALCUL), ("=", WHITE), ("?", ORANGE_RETENUE)], 44, 0.25)
        q.move_to(P(2.2, -1.5))
        self.play(FadeIn(q, scale=0.6), run_time=0.4)
        self.insister(q[2], 0.3)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        roue, lbls, tab = self.decor()
        self.play(*self.eteindre_secteurs(roue, [1], 0.25), lbls[1].animate.set_opacity(0.3), run_time=0.4)
        for k, ex in [(0, "Rouge,"), (2, "vert et"), (3, "jaune :")]:
            self.au_mot(ex)
            self.play(*self.allumer(tab, [k]), Indicate(roue.sect[k], color=COULEURS[k], scale_factor=1.08), run_time=0.4)
        tete = self.ligne([("P(pas bleu)", BLEU_CALCUL), ("=", WHITE)], 42, 0.25)
        tete.move_to(P(0, -0.5)).align_to(P(-1.9, 0), LEFT)
        termes = [self.t("0,4", 42, ROUGE_C), self.t("+", 42), self.t("0,2", 42, VERT_C), self.t("+", 42),
                  self.t("0,15", 42, JAUNE_C), self.t("=", 42), self.t("0,75", 46, VERT_OK)]
        rang = VGroup(*termes).arrange(RIGHT, buff=0.22).move_to(P(0, -1.6)).align_to(P(-1.4, 0), LEFT)
        for ex, k, idx in [("0,4 plus", 0, 0), ("plus 0,2", 2, 2), ("plus 0,15", 3, 4)]:
            self.au_mot(ex)
            anims = [TransformFromCopy(tab.t_val[k], termes[idx])]
            if idx == 0:
                anims.append(FadeIn(tete, shift=UP * 0.15))
            else:
                anims.append(FadeIn(termes[idx - 1]))
            self.play(*anims, run_time=0.4)
        self.au_mot("0,75")
        self.play(FadeIn(termes[5]), FadeIn(termes[6], scale=0.5), run_time=0.4)
        self.play(Create(SurroundingRectangle(termes[6], color=VERT_OK, buff=0.12)), run_time=0.3)
        self.insister(termes[6], 0.3)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 40
        l1 = VGroup(self.ligne([("P(événement)", BLEU_CALCUL), ("=", WHITE), ("la somme", WHITE)], fs, 0.2),
                    self.t("des probabilités de ses issues", fs)).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        l2 = VGroup(self.ligne([("Compter", ORANGE_RETENUE), ("ne marche que si", WHITE)], fs, 0.2),
                    self.t("les issues sont équiprobables", fs)).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.7)
        if lignes.width > 10.4:
            lignes.scale_to_fit_width(10.4)
        lignes.move_to(P(-0.9, 0.5))
        for mot, l in zip(["La probabilité d'un événement", "Compter ne marche"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 4")
        self.play(Write(self.chute("Épisode 4 : l'événement contraire", color=VERT_OK, font_size=36)))
        self.attendre_voix(marge=1.0)

    # ── 09 : la fin (règle du 19/10) ────────────────────────────────────────

    def page_abonnement(self, voix="09-abonne"):
        """« Entraîne-toi sur » + eleveai.fr encadré, puis « Abonne-toi ! » +
        @eleveai974. Rien d'autre."""
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        entraine = self.t("Entraîne-toi sur", 46, JAUNE_TITRE).move_to(P(0, 2.05))
        site = self.t("eleveai.fr", 62, BLEU_CALCUL).move_to(P(0, 1.0))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        abonne = self.t("Abonne-toi !", 44, VERT_OK).move_to(P(0, -0.6))
        poignee = self.t("@eleveai974", 48, VERT_OK).move_to(P(0, -1.6))
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), run_time=0.4)
        self.play(GrowFromCenter(poignee), run_time=0.4)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3))
        self.attendre_voix(marge=1.4)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_regle()
        self.ecran_calcul()
        self.ecran_verifier()
        self.ecran_equiprobable()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
