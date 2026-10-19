# proba_va_notation.py
# EleveAI — Maths STMG ET Maths 1re spé — série « Probabilités » : UNE VARIABLE
# ALÉATOIRE, lire « X = a » et « X ≤ a » (micros : va_ecritures en STMG,
# va_notation en 1re spé), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : proba_va_notation_short.py (ceinture jaune, un jeu à 0 / 5 / 20 €).
#
# ⭐⭐ UNE voix, UN script, DEUX rendus (18/10, « pour vendre en pack ») :
# ProbaVaNotationBase porte toutes les scènes ; ProbaVaNotationSTMG et
# ProbaVaNotationPremiereSpe ne changent que l'identité de la page de garde.
#
# ⭐ Les figures :
#   · la ROUE de kermesse, au style de la roue du coach (carte blanche, parts
#     cerclées d'encre, départ en haut dans le sens horaire, étiquettes blanches
#     liserées, moyeu et pointe noirs) : 0 € (60 %), 2 € (30 %), 10 € (10 %) ;
#   · le TABLEAU DE LOI du coach (`canvasLoi`, tableau_donnees) : ligne « xᵢ »
#     en en-tête sombre, ligne « P(X = xᵢ) » en libellé bleu clair, cases
#     blanches, colonne allumée en jaune.
# ⛔ PAS D'ÉCART : les valeurs 0, 2, 10 s'écrivent quand la voix les dit ; 0,1
# en 03 ; 0,6 et 0,3 seulement en 04, quand la voix les dit.
#
# Écrans : 00 garde · 01 la roue, X = le gain · 02 ses trois valeurs ·
# 03 « X = 10 » : la case 10 € s'allume, P(X = 10) = 0,1 · 04 « X ≤ 2 » : les
# secteurs 0 € et 2 € s'allument ensemble, 0,6 + 0,3 = 0,9 · 05 le piège :
# « X ≤ 2 » ≠ « X = 2 », la flèche qui ramasse 0 et 2 · 06 défi (X ≥ 2) ·
# 06b correction : 2 et 10, 0,3 + 0,1 = 0,4 · 07 ce que tu as appris ·
# 08 fin (« Entraîne-toi sur eleveai.fr », « Abonne-toi ! @eleveai974 »).
#
# Voix : manim/voix/stmg-premiere-spe-proba-va-notation.json (Julie, débit −7).
# Rendus (depuis la racine du dépôt ; media à soi, sinon WinError 32) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_va_notation.py ProbaVaNotationSTMG -o eleveai-maths-stmg-proba-va-notation --media_dir manim/scripts/stmg/media-va_notation
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_va_notation.py ProbaVaNotationPremiereSpe -o eleveai-maths-premiere-proba-va-notation --media_dir manim/scripts/stmg/media-va_notation
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_va_notation_short.py ShortProbaVaNotationSTMG -o eleveai-maths-stmg-proba-va-notation-short --media_dir manim/scripts/stmg/media-va_notation
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_va_notation_short.py ShortProbaVaNotationPremiereSpe -o eleveai-maths-premiere-proba-va-notation-short --media_dir manim/scripts/stmg/media-va_notation
# (le short n'affiche aucune classe : un seul rendu suffit, copié sous les deux noms)
# Puis copier dans manim/sorties/stmg/maths/probabilites/23-va-notation/ et
# manim/sorties/premiere/maths/probabilites/23-va-notation/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "premiere"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import ANNEAU, BORD, ENCRE, ENTETE, ETEINT, LIBELLE, SURLIGNE, suite  # noqa: E402

# Les couleurs de la roue (palette du coach)
COUL_0 = "#94A3B8"      # 0 €
COUL_2 = "#3B82F6"      # 2 €
COUL_10 = "#F97316"     # 10 €
ETEINTE = "#334155"     # un secteur hors de l'événement
CARTE_BORD = "#E2E8F0"
ALLUME = "#FDE047"      # le liseré d'un secteur allumé


def P(x, y):
    return np.array([x, y, 0.0])


def etiquette_blanche(texte, fs):
    t = Text(texte, font_size=fs, color=WHITE, weight=BOLD)
    t.set_stroke(ENCRE, width=4, background=True)
    return t


def avec_indice(avant, apres="", fs=30, color=WHITE, weight=NORMAL):
    """« P(X = x » + i en indice + « ) » : le i DESCEND, comme au coach."""
    a = Text(avant, font_size=fs, color=color, weight=weight)
    i = Text("i", font_size=int(fs * 0.62), color=color, weight=weight)
    i.next_to(a, RIGHT, buff=0.02).align_to(a[-1], DOWN).shift(DOWN * fs * 0.004)
    g = VGroup(a, i)
    if apres:
        b = Text(apres, font_size=fs, color=color, weight=weight)
        b.next_to(i, RIGHT, buff=0.02)
        b.match_y(a[1] if len(a) > 1 else a)
        g.add(b)
    return g


class RoueKermesse(VGroup):
    """La roue : secteurs proportionnels aux probabilités, départ en haut, sens
    horaire. self.sect[k], self.lab[k] ; self.disque = ce qui tourne."""

    def __init__(self, gains=("0 €", "2 €", "10 €"), parts=(0.6, 0.3, 0.1), couleurs=(COUL_0, COUL_2, COUL_10),
                 centre=P(-4.3, -0.35), r=1.75, fs=30, carte=True, **kw):
        super().__init__(**kw)
        self.c, self.r = centre, r
        self.sect, self.lab, self.milieux = VGroup(), VGroup(), []
        self.couleurs = couleurs
        cumul = 0.0
        for g, p, coul in zip(gains, parts, couleurs):
            a0 = PI / 2 - cumul * TAU
            s = AnnularSector(inner_radius=0, outer_radius=r, angle=-p * TAU, start_angle=a0, fill_color=coul,
                              fill_opacity=1, stroke_color=ENCRE, stroke_width=3).shift(centre)
            m = a0 - p * TAU / 2
            rr = 0.62 if p > 0.15 else 0.7
            t = etiquette_blanche(g, fs if p > 0.15 else int(fs * 0.82))
            t.move_to(centre + P(rr * r * np.cos(m), rr * r * np.sin(m))).set_z_index(2)
            self.sect.add(s)
            self.lab.add(t)
            self.milieux.append((cumul + p / 2) * TAU)   # angle horaire depuis le haut
            cumul += p
        self.disque = VGroup(self.sect, self.lab)
        self.moyeu = Dot(centre, radius=0.09, color=ENCRE).set_z_index(3)
        self.pointe = Polygon(P(0, 0), P(-0.19, 0.34), P(0.19, 0.34), fill_color=ENCRE, fill_opacity=1,
                              stroke_color=WHITE, stroke_width=1.5).move_to(centre + UP * (r + 0.36),
                                                                             aligned_edge=DOWN)
        self.carte = RoundedRectangle(width=2 * r + 0.95, height=2 * r + 1.3, corner_radius=0.2, fill_color=WHITE,
                                      fill_opacity=1, stroke_color=CARTE_BORD, stroke_width=2)
        self.carte.move_to(centre + UP * 0.16)
        if carte:
            self.add(self.carte)
        self.add(self.sect, self.moyeu, self.pointe)   # les étiquettes s'ajoutent quand la voix les dit

    def avec_etiquettes(self):
        self.add(self.lab)
        return self

    def allumer(self, ks):
        """Les secteurs ks s'allument (liseré jaune), les autres s'éteignent."""
        anims = []
        for k, s in enumerate(self.sect):
            if k in ks:
                anims.append(s.animate.set_fill(self.couleurs[k], 1).set_stroke(ALLUME, 9).set_z_index(1))
            else:
                anims.append(s.animate.set_fill(ETEINTE, 1).set_stroke(ENCRE, 3).set_z_index(0))
                anims.append(self.lab[k].animate.set_opacity(0.4))
        return anims

    def lancer(self, scene, k, tours=2, run_time=2.2):
        """La roue tourne (sens horaire) et s'arrête le secteur k sous la pointe."""
        angle = -(tours * TAU + (TAU - self.milieux[k]))
        depart = self.disque.copy()

        def tourne(m, a):
            m.become(depart)
            m.rotate(angle * a, about_point=self.c)
            for t in m[1]:
                t.rotate(-angle * a)

        scene.play(UpdateFromAlphaFunc(self.disque, tourne), run_time=run_time,
                   rate_func=rate_functions.ease_out_cubic)


class TableauLoi(VGroup):
    """Le tableau de loi du coach : en-tête sombre « xᵢ | 0 | 2 | 10 », ligne
    « P(X = xᵢ) » au libellé bleu clair, cases blanches. Les valeurs et les
    probabilités sont CACHÉES au départ : `valeur(j)` et `poser(j)` les écrivent."""

    def __init__(self, valeurs=("0", "2", "10"), probas=("0,6", "0,3", "0,1"), larg_lab=2.7, larg=1.45,
                 h=0.82, fs=30, **kw):
        super().__init__(**kw)
        n = len(valeurs)
        xs = [larg_lab / 2] + [larg_lab + larg * (j + 0.5) for j in range(n)]
        ws = [larg_lab] + [larg] * n
        self.rect = [[None] * (n + 1) for _ in range(2)]
        fonds = VGroup()
        for r in range(2):
            for c in range(n + 1):
                coul = ENTETE if r == 0 else (LIBELLE if c == 0 else WHITE)
                rc = Rectangle(width=ws[c], height=h, fill_color=coul, fill_opacity=1, stroke_color=BORD,
                               stroke_width=2).move_to(P(xs[c], -h * (r + 0.5)))
                self.rect[r][c] = rc
                fonds.add(rc)
        self.lab_x = avec_indice("x", "", fs, WHITE, BOLD).move_to(self.rect[0][0])
        self.lab_p = avec_indice("P(X = x", ")", int(fs * 0.9), ENCRE, BOLD).move_to(self.rect[1][0])
        self.val = VGroup(*[Text(v, font_size=int(fs * 1.1), color=WHITE, weight=BOLD).move_to(self.rect[0][j + 1])
                            for j, v in enumerate(valeurs)])
        self.pro = VGroup(*[Text(p, font_size=int(fs * 1.1), color=ENCRE, weight=BOLD).move_to(self.rect[1][j + 1])
                            for j, p in enumerate(probas)])
        for m in (self.lab_x, self.lab_p, self.val, self.pro):
            m.set_z_index(3)
        self.fonds = fonds
        self.add(fonds, self.lab_x, self.lab_p)
        self.montres_v, self.montres_p = set(), set()

    def _caler(self):
        """Les nombres cachés suivent le tableau (il a pu bouger depuis sa création)."""
        for j in range(len(self.val)):
            self.val[j].move_to(self.rect[0][j + 1])
            self.pro[j].move_to(self.rect[1][j + 1])

    def deja(self, valeurs=(), probas=()):
        self._caler()
        """Sans animation : des nombres DÉJÀ dits à un écran précédent."""
        for j in valeurs:
            self.add(self.val[j])
            self.montres_v.add(j)
        for j in probas:
            self.add(self.pro[j])
            self.montres_p.add(j)
        return self

    def valeur(self, j):
        self._caler()
        self.montres_v.add(j)
        return FadeIn(self.val[j], scale=1.6)

    def poser(self, j):
        self._caler()
        self.montres_p.add(j)
        return FadeIn(self.pro[j], scale=1.6)

    def colonnes(self, js):
        """Les colonnes js s'allument (jaune, comme le coach), les autres s'estompent."""
        anims = []
        for j in range(len(self.val)):
            on = j in js
            haut, bas = self.rect[0][j + 1], self.rect[1][j + 1]
            if on:
                anims += [bas.animate.set_fill(SURLIGNE, 1).set_stroke(ANNEAU, 5).set_z_index(1),
                          haut.animate.set_stroke(ANNEAU, 5).set_z_index(1)]
            else:
                anims += [bas.animate.set_fill(WHITE, ETEINT).set_stroke(BORD, 2).set_z_index(0),
                          haut.animate.set_fill(ENTETE, ETEINT + 0.2).set_stroke(BORD, 2).set_z_index(0)]
            if j in self.montres_v:
                anims.append(self.val[j].animate.set_opacity(1 if on else 0.35))
            if j in self.montres_p:
                anims.append(self.pro[j].animate.set_opacity(1 if on else 0.35))
        return anims


X0 = -1.15   # le bord gauche de la colonne de droite (la roue occupe la gauche)


class ProbaVaNotationBase(Notion6e):
    """Toutes les scènes ; les sous-classes ne changent que l'identité."""

    nom_voix = "stmg-premiere-spe-proba-va-notation"
    identite = "Maths — EleveAI"

    def t(self, texte, font_size=36, color=WHITE, weight=NORMAL):
        return Text(texte, font_size=font_size, color=color, weight=weight)

    def insister(self, mob, run_time=0.3, bord=None):
        """Agrandir puis rétrécir (×1,5 puis ÷1,5)."""
        self.play(mob.animate.scale(1.5, about_edge=bord), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5, about_edge=bord), run_time=run_time)

    def calcul(self, morceaux, fs=44, buff=0.18):
        """Une ligne de calcul ; morceaux = [(texte, couleur), …]."""
        g = suite(*[self.t(x, fs, c) for x, c in morceaux], buff=buff)
        return self.ligne_de_base(g, [x for x, _ in morceaux])

    def ligne_de_base(self, g, textes):
        """Les nombres posés sur la ligne de base du premier morceau (la virgule
        d'un « 0,1 » ne doit pas le faire remonter), les signes à mi-hauteur."""
        k0 = next(k for k, x in enumerate(textes) if x[0].isalnum())
        ref = g[k0][0]
        base, mi = ref.get_bottom()[1], ref.get_bottom()[1] + ref.height / 2
        for k, (m, x) in enumerate(zip(g, textes)):
            if k == k0:
                continue
            if x[0].isalnum() or x[0] == "?":
                m.shift(UP * (base - m[0].get_bottom()[1]))
            else:
                m.set_y(mi)
        return g

    def gauche(self, mob, y):
        return mob.move_to(P(X0, y), aligned_edge=LEFT)

    def roue(self, etiquettes=True):
        r = RoueKermesse()
        return r.avec_etiquettes() if etiquettes else r

    def tableau(self, valeurs=(0, 1, 2), probas=()):
        tb = TableauLoi()
        tb.move_to(P(X0, 1.85), aligned_edge=LEFT)
        return tb.deja(valeurs, probas)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Une variable aléatoire", 52, JAUNE_TITRE).to_edge(UP, buff=0.55)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.85))
        r = RoueKermesse(centre=P(-4.0, -0.15), r=1.25)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(r, shift=UP * 0.2),
                  run_time=1.0)
        self.au_mot("lire X égale a")
        l1 = self.gauche(suite(self.t("lire", 44), self.t("X = a", 56, BLEU_CALCUL, BOLD), buff=0.3), 0.55)
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.6)
        self.au_mot("et X inférieur")
        l2 = self.gauche(suite(self.t("et", 44), self.t("X ≤ a", 56, JAUNE_TITRE, BOLD), buff=0.3), -0.55)
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.6)
        self.insister(l2[1], 0.3)
        self.attendre_voix(marge=1.0)

    # ── 01 : la roue de la kermesse ; X = le gain ───────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("La roue de la kermesse")
        r = self.roue(etiquettes=False)
        self.play(FadeIn(r, shift=UP * 0.2), run_time=0.6)
        self.au_mot("gagner 0")
        self.play(FadeIn(r.lab[0], scale=1.6), Indicate(r.sect[0], color=ALLUME, scale_factor=1.05), run_time=0.5)
        self.au_mot("2 ou 10")
        self.play(FadeIn(r.lab[1], scale=1.6), Indicate(r.sect[1], color=ALLUME, scale_factor=1.05), run_time=0.5)
        self.au_mot("10 euros")
        self.play(FadeIn(r.lab[2], scale=1.6), Indicate(r.sect[2], color=ALLUME, scale_factor=1.08), run_time=0.5)
        self.au_mot("On appelle X")
        l1 = self.gauche(suite(self.t("X", 72, BLEU_CALCUL, BOLD), self.t("=", 56), self.t("le gain", 52),
                               buff=0.3), 1.6)
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.6)
        self.insister(l1[0], 0.3)
        self.au_mot("X est une variable")
        l2 = self.gauche(self.t("une variable aléatoire :", 40, JAUNE_TITRE), 0.35)
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.6)
        self.au_mot("un nombre qui dépend")
        l3 = self.gauche(VGroup(self.t("un nombre", 40), self.t("qui dépend du hasard", 40))
                         .arrange(DOWN, aligned_edge=LEFT, buff=0.15), -0.75)
        self.play(FadeIn(l3, shift=UP * 0.15), run_time=0.6)
        r.lancer(self, 1, tours=2, run_time=2.4)
        self.attendre_voix()

    # ── 02 : ses trois valeurs ──────────────────────────────────────────────

    def ecran_valeurs(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-valeurs")
        self.titre_ecran("Les valeurs de X")
        r = self.roue()
        tb = self.tableau(valeurs=())
        self.play(FadeIn(r), FadeIn(tb, shift=LEFT * 0.3), run_time=0.6)
        self.au_mot("trois valeurs")
        l1 = self.gauche(self.t("X peut prendre 3 valeurs", 42, JAUNE_TITRE), -0.1)
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.5)
        for k, mot in enumerate(["valeurs : 0", "2 et", "et 10"]):
            self.au_mot(mot)
            self.play(tb.valeur(k), Indicate(r.sect[k], color=ALLUME, scale_factor=1.06),
                      Indicate(r.lab[k], scale_factor=1.4), run_time=0.45)
        self.attendre_voix()

    # ── 03 : « X = 10 » ; P(X = 10) = 0,1 ───────────────────────────────────

    def ecran_egal(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-egal")
        self.titre_ecran("X = 10")
        r = self.roue()
        tb = self.tableau()
        self.add(r, tb)
        self.au_mot("X égale 10")
        l1 = self.gauche(self.t("X = 10", 56, BLEU_CALCUL, BOLD), 0.1)
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.5)
        self.au_mot("on gagne 10 euros")
        l2 = self.t("« on gagne 10 € »", 38).next_to(l1, RIGHT, buff=0.35)
        self.play(FadeIn(l2, shift=LEFT * 0.2), *r.allumer([2]), *tb.colonnes([2]), run_time=0.7)
        self.au_mot("P de X égale 10")
        l3 = self.gauche(self.calcul([("P(X = 10)", WHITE), ("=", WHITE), ("0,1", VERT_OK)], 56), -1.3)
        self.play(FadeIn(l3[0], shift=UP * 0.15), run_time=0.6)
        self.au_mot("Ici, 0,1")
        self.play(tb.poser(2), FadeIn(l3[1]), TransformFromCopy(tb.pro[2], l3[2]), run_time=0.7)
        self.insister(l3[2], 0.3, LEFT)
        self.attendre_voix()

    # ── 04 : « X ≤ 2 » : 0 ou 2 ; 0,6 + 0,3 = 0,9 ───────────────────────────

    def ecran_inferieur(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-inferieur")
        self.titre_ecran("X ≤ 2")
        r = self.roue()
        tb = self.tableau(probas=(2,))
        self.add(r, tb)
        self.au_mot("X inférieur ou égal à 2")
        l1 = self.gauche(self.t("X ≤ 2", 56, JAUNE_TITRE, BOLD), 0.25)
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.5)
        self.au_mot("on gagne 2 euros ou moins")
        l2 = self.t("« 2 € ou moins »", 38).next_to(l1, RIGHT, buff=0.35)
        self.play(FadeIn(l2, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("0 ou 2")
        l3 = self.gauche(suite(self.t("0", 44, BLEU_CALCUL, BOLD), self.t("ou", 38),
                               self.t("2", 44, BLEU_CALCUL, BOLD), buff=0.25), -0.6)
        self.play(*r.allumer([0, 1]), *tb.colonnes([0, 1]), FadeIn(l3, shift=UP * 0.15), run_time=0.8)
        self.au_mot("c'est 0,6")
        self.play(tb.poser(0), run_time=0.45)
        self.insister(tb.pro[0], 0.25)
        self.au_mot("c'est 0,3")
        self.play(tb.poser(1), run_time=0.45)
        self.insister(tb.pro[1], 0.25)
        self.au_mot("Donc P de X")
        c1 = self.gauche(self.calcul([("P(X ≤ 2)", WHITE), ("=", WHITE), ("0,6", BLEU_CALCUL), ("+", WHITE),
                                      ("0,3", BLEU_CALCUL)], 48), -1.55)
        self.play(FadeOut(l3), FadeIn(c1[0], shift=UP * 0.15), run_time=0.5)
        self.au_mot("égale 0,6 plus")
        self.play(FadeIn(c1[1]), TransformFromCopy(tb.pro[0], c1[2]), run_time=0.6)
        self.au_mot("plus 0,3")
        self.play(FadeIn(c1[3]), TransformFromCopy(tb.pro[1], c1[4]), run_time=0.6)
        self.au_mot("égale 0,9")
        c2 = self.calcul([("=", WHITE), ("0,9", VERT_OK)], 56, 0.3)
        c2.next_to(c1[1], DOWN, buff=0.4, aligned_edge=LEFT)
        cadre = SurroundingRectangle(c2[1], color=VERT_OK, buff=0.12, stroke_width=4)
        self.play(FadeIn(c2[0]), FadeIn(c2[1], scale=1.6), run_time=0.5)
        self.play(Create(cadre), run_time=0.4)
        self.insister(c2[1], 0.3, LEFT)
        self.attendre_voix()

    # ── 05 : le piège : « X ≤ 2 » n'est pas « X = 2 » ; la flèche ramasse ───

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        self.au_mot("lire")
        g = self.t("X ≤ 2", 64, JAUNE_TITRE, BOLD).move_to(P(-3.0, 2.0))
        self.play(FadeIn(g, shift=UP * 0.15), run_time=0.5)
        self.au_mot("comme")
        neq = self.t("≠", 80, ROUGE_ERREUR).move_to(P(-0.6, 2.0))
        d = self.t("X = 2", 64, ORANGE_RETENUE, BOLD).move_to(P(1.8, 2.0))
        self.play(FadeIn(d, shift=LEFT * 0.2), run_time=0.5)
        self.play(GrowFromCenter(neq), run_time=0.4)
        self.insister(neq, 0.3)
        # les trois gains, en cases (comme l'en-tête du tableau de loi)
        cases = VGroup()
        for v in ("0", "2", "10"):
            rc = RoundedRectangle(width=1.7, height=1.15, corner_radius=0.12, fill_color=ENTETE, fill_opacity=1,
                                  stroke_color=BORD, stroke_width=2)
            cases.add(VGroup(rc, self.t(v, 52, WHITE, BOLD).move_to(rc)))
        cases.arrange(RIGHT, buff=0.6).move_to(P(-0.6, -0.25))
        self.au_mot("Inférieur ou égal, ce sont")
        self.play(LaggedStart(*[FadeIn(c, shift=UP * 0.2) for c in cases], lag_ratio=0.25), run_time=0.8)
        self.au_mot("jusqu'à 2")
        fl = CurvedArrow(cases[1].get_bottom() + DOWN * 0.15, cases[0].get_bottom() + DOWN * 0.15 + LEFT * 0.5,
                         radius=-1.6, color=JAUNE_TITRE, stroke_width=7, tip_length=0.3)
        self.play(Create(fl), run_time=0.9)
        lasso = SurroundingRectangle(VGroup(cases[0], cases[1]), color=JAUNE_TITRE, buff=0.18, corner_radius=0.25,
                                     stroke_width=7)
        self.play(Create(lasso), *[c[0].animate.set_fill(SURLIGNE, 1) for c in cases[:2]],
                  *[c[1].animate.set_color(ENCRE) for c in cases[:2]], cases[2].animate.set_opacity(0.35),
                  run_time=0.6)
        self.au_mot("le 2 compris")
        comp = self.t("le 2 compris", 38, VERT_OK).next_to(cases[1], UP, buff=0.3)
        ok = self.coche(taille=0.24).next_to(comp, RIGHT, buff=0.2)
        self.play(FadeIn(comp, shift=DOWN * 0.15), Create(ok), run_time=0.5)
        self.insister(cases[1], 0.3)
        self.au_mot("ici, 0 et 2")
        fin = suite(self.t("X ≤ 2", 48, JAUNE_TITRE, BOLD), self.t(":", 44), self.t("0 et 2", 48, BLEU_CALCUL, BOLD),
                    buff=0.25).move_to(P(-0.6, -2.55))
        self.play(FadeIn(fin, shift=UP * 0.15), run_time=0.6)
        self.insister(fin[2], 0.3, LEFT)
        self.attendre_voix()

    # ── 06 : défi : X ≥ 2 ───────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        r = self.roue()
        tb = self.tableau(probas=(0, 1, 2))
        self.play(FadeIn(r), FadeIn(tb), run_time=0.5)
        self.au_mot("Que veut dire")
        q1 = self.gauche(suite(self.t("Que veut dire", 40), self.t("X ≥ 2", 52, JAUNE_TITRE, BOLD),
                               self.t("?", 40), buff=0.25), 0.15)
        self.play(FadeIn(q1, shift=UP * 0.15), run_time=0.6)
        self.au_mot("quelle est sa probabilité")
        q2 = self.gauche(self.calcul([("P(X ≥ 2)", WHITE), ("=", WHITE), ("?", ORANGE_RETENUE)], 52), -1.0)
        self.play(FadeIn(q2, shift=UP * 0.15), run_time=0.6)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        r = self.roue()
        tb = self.tableau(probas=(0, 1, 2))
        self.add(r, tb)
        self.au_mot("On gagne 2 euros ou plus")
        l1 = self.gauche(suite(self.t("X ≥ 2", 52, JAUNE_TITRE, BOLD), self.t("« 2 € ou plus »", 38), buff=0.35),
                         0.25)
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.6)
        self.au_mot("2 ou 10")
        l2 = self.gauche(suite(self.t("2", 44, BLEU_CALCUL, BOLD), self.t("ou", 38),
                               self.t("10", 44, BLEU_CALCUL, BOLD), buff=0.25), -0.6)
        self.play(*r.allumer([1, 2]), *tb.colonnes([1, 2]), FadeIn(l2, shift=UP * 0.15), run_time=0.8)
        self.au_mot("P de X supérieur")
        c1 = self.gauche(self.calcul([("P(X ≥ 2)", WHITE), ("=", WHITE), ("0,3", BLEU_CALCUL), ("+", WHITE),
                                      ("0,1", BLEU_CALCUL)], 48), -1.55)
        self.play(FadeOut(l2), FadeIn(c1[0], shift=UP * 0.15), run_time=0.5)
        self.au_mot("égale 0,3")
        self.play(FadeIn(c1[1]), TransformFromCopy(tb.pro[1], c1[2]), run_time=0.6)
        self.au_mot("plus 0,1")
        self.play(FadeIn(c1[3]), TransformFromCopy(tb.pro[2], c1[4]), run_time=0.6)
        self.au_mot("égale 0,4")
        c2 = self.calcul([("=", WHITE), ("0,4", VERT_OK)], 56, 0.3)
        c2.next_to(c1[1], DOWN, buff=0.4, aligned_edge=LEFT)
        cadre = SurroundingRectangle(c2[1], color=VERT_OK, buff=0.12, stroke_width=4)
        ok = self.coche(taille=0.26).next_to(cadre, RIGHT, buff=0.3)
        self.play(FadeIn(c2[0]), FadeIn(c2[1], scale=1.6), run_time=0.5)
        self.play(Create(cadre), Create(ok), run_time=0.4)
        self.insister(c2[1], 0.3, LEFT)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 40
        items = [
            (self.t("Une variable aléatoire :", fs, JAUNE_TITRE), self.t("un nombre qui dépend du hasard", fs)),
            (self.t("X = a :", fs, BLEU_CALCUL, BOLD), self.t("X prend exactement la valeur a", fs)),
            (self.t("X ≤ a :", fs, JAUNE_TITRE, BOLD), self.t("toutes les valeurs jusqu'à a, a compris", fs)),
        ]
        lignes = VGroup()
        for h, b in items:
            txt = VGroup(h, b).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
            lignes.add(VGroup(self.coche(), txt).arrange(RIGHT, buff=0.3, aligned_edge=UP))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.45)
        if lignes.width > 11.4:
            lignes.scale_to_fit_width(11.4)
        lignes.move_to(P(-0.6, 0.55))
        for l in lignes:
            l[0].shift(DOWN * 0.12)
        for mot, l in zip(["Une variable aléatoire est", "X égale a :", "X inférieur ou égal à a :"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("Prochaine vidéo")
        ch = suite(self.t("Prochaine vidéo :", 36, VERT_OK), self.t("la loi de probabilité", 36), buff=0.22)
        ch.move_to(P(-0.9, -2.75))
        self.play(FadeIn(ch, shift=UP * 0.15), run_time=0.6)
        self.attendre_voix(marge=1.0)

    # ── 08 : la fin (règle du 19/10) ────────────────────────────────────────

    def page_abonnement(self, voix="08-abonne"):
        """« Entraîne-toi sur » + eleveai.fr encadré, puis « Abonne-toi ! » +
        @eleveai974. Rien d'autre : la voix ne parle plus du coach."""
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
        self.ecran_valeurs()
        self.ecran_egal()
        self.ecran_inferieur()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement()


class ProbaVaNotationSTMG(ProbaVaNotationBase):
    identite = "Maths STMG — EleveAI"


class ProbaVaNotationPremiereSpe(ProbaVaNotationBase):
    identite = "Maths 1re spé — EleveAI"
