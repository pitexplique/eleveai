# proba_probaC_faux_positifs.py
# EleveAI — Maths STMG ET 1re tronc commun — probabilités conditionnelles :
# les FAUX POSITIFS (micros : probaC_test_diagnostique en STMG,
# alea_cond_faux_positifs en 1re). AVEC VOIX. Paysage 16:9, CEINTURE MARRON.
# Short jumeau : proba_probaC_faux_positifs_short.py (ceinture jaune, le test médical).
#
# ⭐⭐ UNE voix, UN script, DEUX rendus (règle du 18/10, « pour vendre en pack ») :
# la classe de base porte toutes les scènes, les deux sous-classes ne changent
# que l'identité (ProbaFauxPositifsSTMG / ProbaFauxPositifsPremiere).
#
# ⭐ La figure est CELLE DU COACH (tableau_donnees de la micro
# probaC_test_diagnostique : « Contrôle automatique sur 10 000 lots ») : un
# tableau à double entrée EN EFFECTIFS, en-tête sombre, libellés bleu clair,
# cases blanches, ligne / colonne allumée en jaune. TableauCroise repris de
# premiere/proba_pc_conditionnelle.py.
# ⛔ PAS D'ÉCART : chaque effectif s'écrit QUAND la voix le dit (10 000, 200,
# 9 800, 190, 10, 8 820, 980, 1 170, 8 830) ; avant, sa case est vide.
#
# Écrans : 00 garde · 01 l'usine : panneaux solaires sur un tapis roulant, le
# détecteur (portique) · 02 le tableau se remplit : 10 000, 200, 9 800, 190, 10
# (faux négatifs) · 03 8 820, 980 (faux positifs) · 04 la COLONNE « Sonne »
# s'allume : 190 + 980 = 1 170, 190 sur 1 170 ≈ 0,16 · 05 le piège : la LIGNE
# Défectueux (P_D(S)) puis la COLONNE Sonne (P_S(D)) · 06 sensibilité,
# spécificité · 07 défi · 07b correction : la colonne « Ne sonne pas » ·
# 08 ce que tu as appris · 09 abonnement.
#
# Voix : manim/voix/stmg-premiere-proba-faux-positifs.json (débit −7).
# Rendus (media à soi : des rendus parallèles dans le même media → WinError 32) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaC_faux_positifs.py ProbaFauxPositifsSTMG -o eleveai-maths-stmg-proba-faux-positifs --media_dir manim/scripts/stmg/media-probaC_faux_positifs
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaC_faux_positifs.py ProbaFauxPositifsPremiere -o eleveai-maths-premiere-commun-proba-faux-positifs --media_dir manim/scripts/stmg/media-probaC_faux_positifs
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaC_faux_positifs_short.py ShortFauxPositifsSTMG -o eleveai-maths-stmg-proba-faux-positifs-short --media_dir manim/scripts/stmg/media-probaC_faux_positifs
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaC_faux_positifs_short.py ShortFauxPositifsPremiere -o eleveai-maths-premiere-commun-proba-faux-positifs-short --media_dir manim/scripts/stmg/media-probaC_faux_positifs
# Puis copier dans manim/sorties/stmg/maths/probabilites/06-faux-positifs/ et
# manim/sorties/premiere-commun/maths/probabilites/06-faux-positifs/.

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
from proba_pc_conditionnelle import ANNEAU, TableauCroise, frac, lettre, p_cond, suite  # noqa: E402

PANNEAU = "#1D4ED8"     # les cellules du panneau solaire
CADRE_PAN = "#CBD5E1"
TAPIS = "#334155"
VOYANT_OFF = "#475569"

LIGNES = ["Défectueux", "Bons", "Total"]
COLONNES = ["Sonne", "Ne sonne pas", "Total"]
# ⛔ PAS D'ÉCART : chaque nombre ne s'écrit qu'au moment où la voix le dit.
VALEURS = [["190", "10", "200"], ["980", "8 820", "9 800"], ["1 170", "8 830", "10 000"]]


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins : panneau solaire, tapis roulant, portique détecteur ────────

def panneau(s=1.0, defectueux=False):
    """Un panneau solaire 3 × 2 cellules ; le défectueux porte une fissure rouge."""
    fond = Rectangle(width=0.9, height=0.6, fill_color=CADRE_PAN, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    cel = VGroup(*[Rectangle(width=0.26, height=0.24, fill_color=PANNEAU, fill_opacity=1, stroke_width=0)
                   for _ in range(6)]).arrange_in_grid(2, 3, buff=0.03).move_to(fond)
    g = VGroup(fond, cel)
    if defectueux:
        f = VMobject(stroke_color=ROUGE_ERREUR, stroke_width=4)
        f.set_points_as_corners([P(-0.3, 0.22), P(-0.08, 0.02), P(-0.18, -0.06), P(0.12, -0.24)])
        g.add(f)
    return g.scale(s)


def tapis(larg=9.0):
    bande = RoundedRectangle(width=larg, height=0.28, corner_radius=0.14, fill_color=TAPIS, fill_opacity=1,
                             stroke_color=WHITE, stroke_width=2)
    rouleaux = VGroup(*[Circle(radius=0.1, stroke_color=WHITE, stroke_width=2, fill_color=TAPIS, fill_opacity=1)
                        .move_to(P(x, 0)) for x in np.linspace(-larg / 2 + 0.25, larg / 2 - 0.25, 10)])
    return VGroup(bande, rouleaux)


def portique(s=1.0):
    """Le détecteur : deux montants, une traverse, un voyant (index 3)."""
    g = Rectangle(width=0.16, height=1.6, fill_color="#94A3B8", fill_opacity=1, stroke_color=WHITE,
                  stroke_width=2).move_to(P(-0.75, 0))
    d = g.copy().move_to(P(0.75, 0))
    tr = Rectangle(width=1.66, height=0.26, fill_color="#94A3B8", fill_opacity=1, stroke_color=WHITE,
                   stroke_width=2).move_to(P(0, 0.9))
    voyant = Circle(radius=0.17, fill_color=VOYANT_OFF, fill_opacity=1, stroke_color=WHITE,
                    stroke_width=2).move_to(P(0, 1.25))
    return VGroup(g, d, tr, voyant).scale(s)


def ondes(centre, color=ROUGE_ERREUR, r=0.3):
    """Les arcs du « bip » de part et d'autre du voyant."""
    g = VGroup()
    for k in (1, 2):
        for sens in (0, PI):
            g.add(Arc(radius=r * k, start_angle=sens - 0.6, angle=1.2, color=color, stroke_width=4).move_arc_center_to(centre))
    return g


class ProbaFauxPositifsBase(Notion6e):
    ceinture = "marron"  # 20/10 : la 1re spé passe en marron (sous-classe)
    nom_voix = "stmg-premiere-proba-faux-positifs"
    identite = "Maths — EleveAI"

    T_CENTRE = P(-2.55, 0.0)   # le tableau, à gauche
    T_ECHELLE = 0.8
    NOTE_X = 4.35               # la colonne des calculs, à droite

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def note(self, texte, y, fs=32, color=WHITE, largeur=4.5):
        n = self.t(texte, fs, color) if isinstance(texte, str) else texte
        if n.width > largeur:
            n.scale_to_fit_width(largeur)
        return n.move_to(P(self.NOTE_X, y))

    def tableau(self, posees=(), centre=None, echelle=None):
        """Le tableau du coach en effectifs ; seuls les nombres de `posees` y sont écrits."""
        tb = TableauCroise(LIGNES, COLONNES, VALEURS, larg_lab=2.7, larg=2.4, h=0.78, h_ent=0.8, fs=28)
        for fam, w in ((tb.ent, 2.4), (tb.lab, 2.7)):
            k = min(1.0, min((w - 0.2) / m.width for m in fam))
            for m in fam:
                m.scale(k)
        tb.scale(self.T_ECHELLE if echelle is None else echelle)
        tb.move_to(self.T_CENTRE if centre is None else centre)
        for i, rang in enumerate(tb.val):
            for j, m in enumerate(rang):
                if (i, j) not in posees:
                    tb.vals.remove(m)
        tb.posees = set(posees)
        return tb

    def cadre_ligne(self, tb, i):
        return SurroundingRectangle(VGroup(tb.rect[i + 1][0], tb.rect[i + 1][3]), color=ANNEAU, buff=0.05,
                                    stroke_width=6)

    def cadre_colonne(self, tb, j):
        return SurroundingRectangle(VGroup(tb.rect[0][j + 1], tb.rect[3][j + 1]), color=ANNEAU, buff=0.05,
                                    stroke_width=6)

    def cerne(self, tb, i, j, color):
        """La case (i, j) cernée de couleur (faux négatifs, faux positifs)."""
        return SurroundingRectangle(tb.case(i, j), color=color, buff=0.02, stroke_width=7).set_z_index(6)

    def formule(self, cond, cible, fs=60):
        return p_cond(cond, cible, fs, WHITE, JAUNE_TITRE, VERT_OK)

    def voyant(self, port, color, avec_ondes=False):
        anims = [port[3].animate.set_fill(color, 1)]
        o = None
        if avec_ondes:
            o = ondes(port[3].get_center(), color, r=0.28 * port.height / 1.75)
            anims.append(Create(o))
        return anims, o

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Les faux positifs", 56, JAUNE_TITRE).to_edge(UP, buff=0.55)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, -2.8))
        port = portique(0.85).move_to(P(-0.6, 0.45))
        pan = panneau(1.0).move_to(P(-3.2, -0.08))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(port), FadeIn(pan),
                  run_time=1.0)
        self.au_mot("quand un test sonne")
        q = self.t("Quand un test sonne, est-ce vraiment grave ?", 34, BLEU_CALCUL).move_to(P(-0.9, -1.5))
        self.play(pan.animate.move_to(P(-0.6, -0.08)), run_time=0.6)
        anims, o = self.voyant(port, ROUGE_ERREUR, True)
        self.play(*anims, FadeIn(q, shift=UP * 0.2), run_time=0.6)
        self.play(FadeOut(o), run_time=0.3)
        self.attendre_voix(marge=1.0)

    # ── 01 : l'usine : le tapis roulant et le détecteur ─────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("L'usine de panneaux solaires")
        tp = tapis(8.0).move_to(P(-2.6, -1.0))
        xs = [-6.2, -5.1, -4.0, -2.9]
        pans = VGroup(*[panneau(1.0, defectueux=(k == 2)).move_to(P(x, -0.56)) for k, x in enumerate(xs)])
        pans.set_z_index(2)
        self.au_mot("Une usine")
        self.play(FadeIn(tp), LaggedStart(*[FadeIn(p, shift=DOWN * 0.3) for p in pans], lag_ratio=0.15),
                  run_time=1.0)
        self.au_mot("2 %")
        n1 = suite(self.t("2 %", 36, ROUGE_ERREUR), self.t("sont défectueux", 32), buff=0.18)
        n1 = self.note(n1, 1.8)
        self.play(FadeIn(n1, shift=LEFT * 0.2), Indicate(pans[2], color=ROUGE_ERREUR, scale_factor=1.3),
                  run_time=0.7)
        self.insister(n1[0], 0.3)
        self.au_mot("Un détecteur")
        port = portique(1.0).move_to(P(-1.6, -0.06)).set_z_index(1)
        port[1].set_z_index(3)  # le montant de droite passe devant les panneaux
        self.play(FadeIn(port, shift=DOWN * 0.3), run_time=0.6)
        self.au_mot("les contrôle tous")
        self.play(pans.animate.shift(RIGHT * 1.3), run_time=1.0)
        anims, _ = self.voyant(port, VERT_OK)
        self.play(*anims, run_time=0.3)
        self.au_mot("On le dit fiable")
        fiable = self.t("« fiable »", 34, BLEU_CALCUL)
        fiable = self.note(fiable, 0.95)
        self.play(FadeIn(fiable, scale=0.7), run_time=0.4)
        self.au_mot("il repère 95 %")
        self.play(pans.animate.shift(RIGHT * 1.1), port[3].animate.set_fill(VOYANT_OFF, 1), run_time=0.8)
        anims, o = self.voyant(port, ROUGE_ERREUR, True)
        n2 = suite(self.t("repère", 30), self.t("95 %", 36, JAUNE_TITRE), self.t("des défectueux", 30), buff=0.16)
        n2 = self.note(n2, 0.15)
        self.play(*anims, FadeIn(n2, shift=LEFT * 0.2), run_time=0.6)
        self.play(FadeOut(o), run_time=0.3)
        self.insister(n2[1], 0.3)
        self.au_mot("il laisse passer 90 %")
        self.play(pans.animate.shift(RIGHT * 1.1), port[3].animate.set_fill(VOYANT_OFF, 1), run_time=0.8)
        anims, _ = self.voyant(port, VERT_OK)
        n3 = suite(self.t("laisse passer", 30), self.t("90 %", 36, JAUNE_TITRE), self.t("des bons", 30), buff=0.16)
        n3 = self.note(n3, -0.65)
        self.play(*anims, FadeIn(n3, shift=LEFT * 0.2), run_time=0.6)
        self.insister(n3[1], 0.3)
        self.attendre_voix()

    # ── 02 : le tableau se remplit : 10 000, 200, 9 800, 190, 10 ────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-tableau")
        self.titre_ecran("Sur 10 000 panneaux")
        tb = self.tableau()
        self.play(FadeIn(tb, shift=UP * 0.2), run_time=0.6)
        self.au_mot("10 000")
        self.play(tb.poser(2, 2), *tb.etat(cases=((2, 2),), eteindre=False), run_time=0.5)
        self.au_mot("2 %")
        n1 = suite(self.t("2 %", 32, ROUGE_ERREUR), self.t("de 10 000", 30), buff=0.15)
        n1 = self.note(n1, 1.6)
        self.play(FadeIn(n1, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("200 défectueux")
        self.play(tb.poser(0, 2), *tb.etat(cases=((0, 2),), eteindre=False), run_time=0.5)
        self.au_mot("9 800 bons")
        self.play(tb.poser(1, 2), *tb.etat(cases=((1, 2),), eteindre=False), run_time=0.5)
        self.au_mot("95 % des 200")
        n2 = suite(self.t("95 %", 32, JAUNE_TITRE), self.t("des 200", 30), buff=0.15)
        n2 = self.note(n2, 0.6)
        self.play(FadeIn(n2, shift=LEFT * 0.2), *tb.etat(lignes=(0,)), run_time=0.5)
        self.au_mot(": 190")
        self.play(tb.poser(0, 0), run_time=0.5)
        self.insister(tb.val[0][0], 0.3)
        self.au_mot("pour 10 d'entre")
        self.play(tb.poser(0, 1), run_time=0.5)
        self.au_mot("faux négatifs")
        c = self.cerne(tb, 0, 1, ORANGE_RETENUE)
        n3 = self.note("10 : faux négatifs", -0.5, fs=34, color=ORANGE_RETENUE)
        self.play(Create(c), FadeIn(n3, shift=LEFT * 0.2), run_time=0.6)
        self.play(Indicate(n3, color=ORANGE_RETENUE, scale_factor=1.2), run_time=0.6)
        self.attendre_voix()

    # ── 03 : 8 820 et 980 : les faux positifs ───────────────────────────────

    POSEES_02 = ((2, 2), (0, 2), (1, 2), (0, 0), (0, 1))

    def ecran_faux_positifs(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-faux-positifs")
        self.titre_ecran("Les faux positifs")
        tb = self.tableau(self.POSEES_02)
        self.add(tb, *[tb.val[i][j] for i, j in self.POSEES_02])
        self.au_mot("Les 9 800 bons")
        self.play(*tb.etat(lignes=(1,)), run_time=0.6)
        self.insister(tb.val[1][2], 0.3)
        self.au_mot("90 %")
        n1 = suite(self.t("90 %", 32, JAUNE_TITRE), self.t("des 9 800", 30), buff=0.15)
        n1 = self.note(n1, 1.4)
        self.play(FadeIn(n1, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("soit 8 820")
        self.play(tb.poser(1, 1), run_time=0.5)
        self.au_mot("pour 980")
        self.play(tb.poser(1, 0), run_time=0.5)
        self.insister(tb.val[1][0], 0.35)
        self.au_mot("faux positifs")
        c = self.cerne(tb, 1, 0, ROUGE_ERREUR)
        n2 = self.note("980 : faux positifs", 0.0, fs=36, color=ROUGE_ERREUR)
        self.play(Create(c), FadeIn(n2, shift=LEFT * 0.2), run_time=0.6)
        self.play(Indicate(n2, color=ROUGE_ERREUR, scale_factor=1.2), run_time=0.7)
        self.attendre_voix()

    # ── 04 : il sonne : la COLONNE « Sonne » s'allume ───────────────────────

    POSEES_03 = POSEES_02 + ((1, 1), (1, 0))

    def ecran_question(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-question")
        self.titre_ecran("Il sonne : est-il défectueux ?")
        tb = self.tableau(self.POSEES_03)
        self.add(tb, *[tb.val[i][j] for i, j in self.POSEES_03])
        port = portique(0.75).move_to(P(self.NOTE_X, 1.55))
        self.au_mot("Le détecteur sonne")
        anims, o = self.voyant(port, ROUGE_ERREUR, True)
        self.play(FadeIn(port), run_time=0.4)
        self.play(*anims, run_time=0.4)
        self.play(FadeOut(o), run_time=0.3)
        self.au_mot("On allume la colonne")
        cad = self.cadre_colonne(tb, 0)
        self.play(*tb.etat(colonnes=(0,)), run_time=0.7)
        self.play(Create(cad), run_time=0.5)
        self.au_mot("190 plus 980")
        somme = self.t("190 + 980", 36)
        somme = self.note(somme, 0.0)
        self.play(FadeIn(somme, shift=LEFT * 0.2), Indicate(tb.val[0][0], color=VERT_OK),
                  Indicate(tb.val[1][0], color=ROUGE_ERREUR), run_time=0.7)
        self.au_mot("égale 1 170")
        eg = suite(self.t("= 1 170", 36, JAUNE_TITRE), buff=0.1).next_to(somme, DOWN, buff=0.25)
        self.play(FadeIn(eg, shift=UP * 0.15), tb.poser(2, 0), run_time=0.6)
        self.insister(tb.val[2][0], 0.3)
        self.au_mot("Parmi eux, 190")
        self.play(Indicate(tb.val[0][0], color=VERT_OK, scale_factor=1.6), run_time=0.7)
        self.au_mot("190 sur 1 170")
        fr_ = frac("190", "1 170", 40)
        approx = self.t("≈", 44)
        res = self.t("0,16", 48, JAUNE_TITRE)
        ligne = suite(fr_, approx, res, buff=0.25).move_to(P(self.NOTE_X, -1.35))
        self.play(FadeOut(VGroup(somme, eg), shift=UP * 0.2), FadeIn(fr_, shift=UP * 0.2), run_time=0.6)
        self.au_mot("environ 0,16")
        self.play(FadeIn(approx), FadeIn(res, scale=0.6), run_time=0.5)
        self.insister(res, 0.4)
        self.attendre_voix()

    # ── 05 : le piège : la LIGNE Défectueux, puis la COLONNE Sonne ──────────

    POSEES_04 = POSEES_03 + ((2, 0),)

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        tb = self.tableau(self.POSEES_04, centre=P(-2.2, 0.0))
        lD = lettre("D", 40, BLEU_CALCUL).next_to(tb.rect[1][0], LEFT, buff=0.15)
        lS = lettre("S", 40, BLEU_CALCUL).next_to(tb.rect[0][1], UP, buff=0.12)
        self.add(tb, *[tb.val[i][j] for i, j in self.POSEES_04])
        self.play(FadeIn(lD), FadeIn(lS), run_time=0.4)
        self.au_mot("croire que c'est 95 %")
        faux = self.t("95 % ?", 48, ROUGE_ERREUR)
        faux = self.note(faux, 1.6)
        self.play(FadeIn(faux, scale=0.6), run_time=0.4)
        self.insister(faux, 0.3)
        self.au_mot("c'est P indice D de S")
        f1 = self.formule("D", "S", 56)
        eg1 = self.t("= 95 %", 44)
        l1 = suite(f1, eg1, buff=0.25)
        eg1.match_y(f1[0])
        l1.move_to(P(self.NOTE_X, 1.6))
        self.play(FadeOut(faux), FadeIn(l1, shift=UP * 0.2), run_time=0.5)
        self.au_mot("parmi les défectueux")
        cl = self.cadre_ligne(tb, 0)
        p1 = self.note("parmi les défectueux", 0.85, fs=28, color=JAUNE_TITRE)
        self.play(*tb.etat(lignes=(0,)), Create(cl), FadeIn(p1), Indicate(lD, color=JAUNE_TITRE, scale_factor=1.6),
                  run_time=0.8)
        self.au_mot("Nous cherchions P indice S de D")
        f2 = self.formule("S", "D", 56).move_to(P(self.NOTE_X, -0.25))
        self.play(FadeIn(f2, shift=UP * 0.2), run_time=0.5)
        self.au_mot("parmi ceux qui font sonner")
        cc = self.cadre_colonne(tb, 0)
        p2 = self.note("parmi ceux qui font sonner", -1.0, fs=28, color=JAUNE_TITRE)
        self.play(FadeOut(cl), *tb.etat(colonnes=(0,)), Create(cc), FadeIn(p2),
                  Indicate(lS, color=JAUNE_TITRE, scale_factor=1.6), run_time=0.8)
        self.insister(f2, 0.35)
        self.au_mot("Comme les défectueux sont rares")
        self.play(FadeOut(cc), *tb.etat(cases=((0, 0), (1, 0))), run_time=0.6)
        self.au_mot("les faux positifs sont plus nombreux")
        c = self.cerne(tb, 1, 0, ROUGE_ERREUR)
        fp = self.t("faux positifs", 30, ROUGE_ERREUR).next_to(tb.rect[3][1], DOWN, buff=0.25)
        self.play(Create(c), FadeIn(fp, shift=UP * 0.15), run_time=0.5)
        self.insister(tb.val[1][0], 0.4)
        self.attendre_voix()

    # ── 06 : les mots du métier ─────────────────────────────────────────────

    POSEES_TOUT = POSEES_04

    def ecran_vocabulaire(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-vocabulaire")
        self.titre_ecran("Les mots du métier")
        tb = self.tableau(self.POSEES_TOUT)
        self.add(tb, *[tb.val[i][j] for i, j in self.POSEES_TOUT])
        self.au_mot("La sensibilité")
        s1 = suite(self.t("Sensibilité :", 34, VERT_OK), self.t("95 %", 38, JAUNE_TITRE), buff=0.2)
        s1 = self.note(s1, 1.5)
        self.play(FadeIn(s1[0], shift=LEFT * 0.2), *tb.etat(lignes=(0,)), run_time=0.6)
        self.au_mot("95 %")
        self.play(FadeIn(s1[1], scale=0.6), run_time=0.4)
        self.au_mot("la part des défectueux")
        d1 = self.note("la part des défectueux repérés", 0.85, fs=26)
        self.play(FadeIn(d1), Indicate(tb.val[0][0], color=VERT_OK, scale_factor=1.5), run_time=0.7)
        self.au_mot("La spécificité")
        s2 = suite(self.t("Spécificité :", 34, VERT_OK), self.t("90 %", 38, JAUNE_TITRE), buff=0.2)
        s2 = self.note(s2, -0.25)
        self.play(FadeIn(s2[0], shift=LEFT * 0.2), *tb.etat(lignes=(1,)), run_time=0.6)
        self.au_mot("90 %")
        self.play(FadeIn(s2[1], scale=0.6), run_time=0.4)
        self.au_mot("la part des bons")
        d2 = self.note("la part des bons laissés passer", -0.9, fs=26)
        self.play(FadeIn(d2), Indicate(tb.val[1][1], color=VERT_OK, scale_factor=1.5), run_time=0.7)
        self.attendre_voix()

    # ── 07 : défi : il ne sonne pas ─────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        tp = tapis(6.0).move_to(P(-0.6, -0.4))
        port = portique(1.0).move_to(P(-0.6, 0.54)).set_z_index(1)
        port[1].set_z_index(3)
        pan = panneau(1.0).move_to(P(-3.0, 0.04)).set_z_index(2)
        self.play(FadeIn(tp), FadeIn(port), FadeIn(pan), run_time=0.5)
        self.au_mot("Le détecteur ne sonne pas")
        self.play(pan.animate.move_to(P(-0.6, 0.04)), run_time=0.8)
        anims, _ = self.voyant(port, VERT_OK)
        self.play(*anims, run_time=0.3)
        self.au_mot("Quelle est la probabilité")
        q1 = self.t("Il ne sonne pas.", 34).move_to(P(-0.9, -1.15))
        q2 = self.t("Probabilité qu'il soit quand même défectueux ?", 32, BLEU_CALCUL).move_to(P(-0.9, -1.85))
        self.play(FadeIn(q1, shift=UP * 0.15), FadeIn(q2, shift=UP * 0.15), run_time=0.6)
        self.au_mot("quand même défectueux")
        self.play(Indicate(q2, color=ORANGE_RETENUE, scale_factor=1.08), run_time=0.6)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    # ── 07b : correction : la colonne « Ne sonne pas » ──────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        tb = self.tableau(self.POSEES_TOUT)
        self.add(tb, *[tb.val[i][j] for i, j in self.POSEES_TOUT])
        self.au_mot("Il ne sonne pas pour")
        cad = self.cadre_colonne(tb, 1)
        self.play(*tb.etat(colonnes=(1,)), run_time=0.6)
        self.play(Create(cad), run_time=0.4)
        self.au_mot("10 plus 8 820")
        somme = self.note("10 + 8 820", 1.4, fs=36)
        self.play(FadeIn(somme, shift=LEFT * 0.2), Indicate(tb.val[0][1], color=ORANGE_RETENUE),
                  Indicate(tb.val[1][1], color=VERT_OK), run_time=0.7)
        self.au_mot("égale 8 830")
        eg = self.t("= 8 830", 36, JAUNE_TITRE).next_to(somme, DOWN, buff=0.25)
        self.play(FadeIn(eg, shift=UP * 0.15), tb.poser(2, 1), run_time=0.6)
        self.insister(tb.val[2][1], 0.3)
        self.au_mot("Parmi eux, 10")
        self.play(Indicate(tb.val[0][1], color=ORANGE_RETENUE, scale_factor=1.7), run_time=0.7)
        self.au_mot("10 sur 8 830")
        fr_ = frac("10", "8 830", 40)
        approx = self.t("≈", 44)
        res = self.t("0,001", 48, JAUNE_TITRE)
        suite(fr_, approx, res, buff=0.25).move_to(P(self.NOTE_X, -0.6))
        self.play(FadeIn(fr_, shift=UP * 0.2), run_time=0.5)
        self.au_mot("environ 0,001")
        self.play(FadeIn(approx), FadeIn(res, scale=0.6), run_time=0.5)
        self.insister(res, 0.4)
        self.au_mot("on peut lui faire confiance")
        ok = self.coche(taille=0.28)
        conf = self.t("On peut lui faire confiance", 30, VERT_OK)
        g = suite(ok, conf, buff=0.2).move_to(P(-2.3, -2.05))
        self.play(Create(ok), FadeIn(conf, shift=UP * 0.15), run_time=0.6)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 38
        l1 = VGroup(self.t("Un test fiable peut sonner souvent à tort", fs),
                    self.t("quand ce qu'il cherche est rare", fs)).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        l2 = VGroup(self.t("On prend 10 000 cas, on remplit le tableau,", fs),
                    self.t("on allume la colonne « Sonne »", fs)).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        l3 = suite(self.formule("D", "S", fs + 8), self.t("n'est pas", fs, ROUGE_ERREUR),
                   self.formule("S", "D", fs + 8), buff=0.22)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3, aligned_edge=UP) for l in (l1, l2, l3)])
        for lg in lignes:
            lg[0].shift(DOWN * 0.12)
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.7)
        if lignes.width > 11.0:
            lignes.scale_to_fit_width(11.0)
        lignes.move_to(P(-0.9, 0.2))
        for mot, lg in zip(["Un test fiable", "on prend 10 000 cas", "P indice D de S n'est"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(lg[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(lg[0]), run_time=0.4)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tableau()
        self.ecran_faux_positifs()
        self.ecran_question()
        self.ecran_piege()
        self.ecran_vocabulaire()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class ProbaFauxPositifsSTMG(ProbaFauxPositifsBase):
    identite = "Maths STMG — EleveAI"


class ProbaFauxPositifsPremiere(ProbaFauxPositifsBase):
    identite = "Maths 1re — EleveAI"


# 19/10 : la même vidéo pour la 1re SPÉ (micro jumelle, pack par classe).
class ProbaFauxPositifsPremiereSpe(ProbaFauxPositifsBase):
    identite = "Maths 1re spé — EleveAI"
    ceinture = "marron"
