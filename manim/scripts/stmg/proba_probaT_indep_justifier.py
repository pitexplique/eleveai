# proba_probaT_indep_justifier.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — probabilités :
# JUSTIFIER que deux événements sont indépendants… ou pas (micros :
# probaT_indep_justifier en STMG, alea_indep_justifier en 1re), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba_probaT_indep_justifier_short.py.
#
# ⭐⭐ UNE voix, UN script, DEUX rendus (18/10, « pour vendre en pack ») :
# IndepJustifierBase porte toutes les scènes ; IndepJustifierSTMG et
# IndepJustifierPremiere ne changent que l'identité de la page de garde.
#
# ⭐ La figure est CELLE DU COACH (`canvasTableau` en STMG, tableau d'effectifs
# en 1re) : 2 × 2 avec marges « Total », en-tête sombre, libellés bleu clair,
# cases blanches, ligne / colonne / case allumée en jaune.
# ⛔ PAS D'ÉCART : seuls 120, 200, 300 et 500 sont dits ; les autres cases
# restent vides.
# ⭐ Le test est une BALANCE : P(T ∩ S) d'un côté, P(T) × P(S) de l'autre.
# Égaux : elle s'équilibre, en vert. Différents : elle penche, en rouge.
#
# Écrans : 00 garde · 01 l'entreprise : 500 points, le tableau se remplit ·
# 02 les trois probabilités, l'une sous l'autre · 03 la balance s'équilibre ·
# 04 la rédaction en 3 lignes, comme une copie · 05 la seconde entreprise :
# 0,3 contre 0,24, la balance penche · 06 le piège : « un seul nombre » barré ·
# 07 défi · 07b correction · 08 ce que tu as appris · 09 fin (eleveai.fr).
#
# Voix : manim/voix/stmg-premiere-proba-indep-justifier.json (débit −7).
# Rendus (depuis la racine du dépôt) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaT_indep_justifier.py IndepJustifierSTMG -o eleveai-maths-stmg-proba-indep-justifier --media_dir manim/scripts/stmg/media-probaT_indep_justifier
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaT_indep_justifier.py IndepJustifierPremiere -o eleveai-maths-premiere-commun-proba-indep-justifier --media_dir manim/scripts/stmg/media-probaT_indep_justifier
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaT_indep_justifier_short.py ShortIndepJustifier -o eleveai-maths-stmg-proba-indep-justifier-short --media_dir manim/scripts/stmg/media-probaT_indep_justifier
# (le short n'affiche aucune classe : un seul rendu, copié sous les deux noms)
# Puis copier dans manim/sorties/stmg/maths/probabilites/15-indep-justifier/ et
# manim/sorties/premiere-commun/maths/probabilites/15-indep-justifier/.

import math
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "premiere"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import ENCRE, TableauCroise, frac, lettre, suite  # noqa: E402

COUL_T = "#F97316"       # télétravail (orange)
COUL_S = VERT_OK         # satisfait (anneau vert)
GRIS_SAL = "#94A3B8"     # un salarié
PAPIER = "#FEFCE8"       # la copie


def P(x, y):
    return np.array([x, y, 0.0])


# ── la BALANCE (type Roberval : les plateaux restent à plat) ────────────────

class Balance:
    """Une balance dessinée à chaque image : `ang` > 0 → le plateau GAUCHE
    descend. `poser(mob, cote)` accroche un objet sur un plateau."""

    def __init__(self, pivot, demi=2.8, larg=3.2, h_pied=1.5, poteau=0.4, ep=8):
        self.pivot = np.array(pivot, dtype=float)
        self.demi, self.larg, self.h_pied, self.poteau, self.ep = demi, larg, h_pied, poteau, ep
        self.ang = ValueTracker(0.0)
        self.coul = WHITE
        self.mob = always_redraw(self.dessin)

    def bout(self, cote):
        a = self.ang.get_value()
        s = -1 if cote == "g" else 1
        return self.pivot + P(s * self.demi * math.cos(a), s * self.demi * math.sin(a))

    def dessus(self, cote):
        return self.bout(cote) + P(0, self.poteau + 0.12)

    def dessin(self):
        cx, cy = self.pivot[0], self.pivot[1]
        pied = VGroup(Line(P(cx, cy), P(cx, cy - self.h_pied), stroke_width=7, color=GREY_B),
                      Polygon(P(cx - 0.7, cy - self.h_pied - 0.2), P(cx + 0.7, cy - self.h_pied - 0.2),
                              P(cx, cy - self.h_pied + 0.1), fill_color=GREY_B, fill_opacity=1, stroke_width=0))
        g, d = self.bout("g"), self.bout("d")
        fleau = Line(g, d, stroke_width=self.ep, color=self.coul)
        grp = VGroup(pied, fleau)
        for b in (g, d):
            grp.add(Line(b, b + P(0, self.poteau), stroke_width=5, color=GREY_B))
            grp.add(RoundedRectangle(width=self.larg, height=0.14, corner_radius=0.06, fill_color=self.coul,
                                     fill_opacity=1, stroke_width=0).move_to(b + P(0, self.poteau + 0.05)))
        grp.add(Dot(P(cx, cy), radius=0.11, color=JAUNE_TITRE))
        return grp

    def poser(self, mob, cote):
        """Place `mob` sur le plateau ; CHAQUE morceau suit le plateau (on peut
        alors les faire apparaître un à un)."""
        mob.move_to(self.dessus(cote), aligned_edge=DOWN)
        self.parts = getattr(self, "parts", []) + list(mob)
        for part in mob:
            dec = part.get_center() - self.dessus(cote)
            part.add_updater(lambda m, dec=dec: m.move_to(self.dessus(cote) + dec))
        return mob

    def caler(self):
        """⚠️ Un morceau hors de la scène ne suit pas le plateau : on le recale
        AVANT de le faire apparaître (sinon il saute à la fin du FadeIn)."""
        for p in getattr(self, "parts", []):
            p.update()


# ── le tableau croisé du coach ──────────────────────────────────────────────

LIGNES = ["Télétravail", "Pas de télétravail", "Total"]
COLONNES = ["Satisfait", "Pas satisfait", "Total"]
# ⛔ PAS D'ÉCART : seuls 120, 200, 300 et 500 sont dits.
VALEURS = [[120, None, 200], [None, None, None], [300, None, 500]]
VALEURS_2 = [[150, None, 200], [None, None, None], [300, None, 500]]


def grille_salaries(pas=0.175, r=0.06):
    """500 points : 25 colonnes × 20 lignes. Les 8 lignes du haut = les 200 en
    télétravail ; les 15 colonnes de gauche = les 300 satisfaits ; le coin
    commun = 8 × 15 = 120. La grille a la forme du tableau."""
    pts = VGroup()
    for i in range(20):
        for j in range(25):
            pts.add(Circle(radius=r, fill_color=GRIS_SAL, fill_opacity=1, stroke_width=0)
                    .move_to(P(j * pas, -i * pas)))
    return pts


def idx(i, j):
    return i * 25 + j


from proba_probaC_tableau import immeuble  # noqa: E402


class IndepJustifierBase(Notion6e):
    nom_voix = "stmg-premiere-proba-indep-justifier"
    identite = "Maths — EleveAI"

    def t(self, texte, font_size=36, color=WHITE, **kw):
        return Text(texte, font_size=font_size, color=color, **kw)

    def insister(self, mob, run_time=0.3):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def tableau(self, centre, echelle, valeurs=VALEURS, montres=None, lettres=True):
        """Le tableau du coach. Les nombres de `montres` (tous par défaut) sont
        déjà écrits ; les autres se posent avec `tb.poser`."""
        tb = TableauCroise(lignes=LIGNES, colonnes=COLONNES, valeurs=valeurs, larg_lab=3.6, larg=2.9)
        groupe = VGroup(tb)
        lT = lS = None
        if lettres:
            lT = lettre("T", 50, BLEU_CALCUL).next_to(tb.rect[1][0], LEFT, buff=0.2)
            lS = lettre("S", 50, BLEU_CALCUL).next_to(tb.rect[0][1], UP, buff=0.14)
            groupe.add(lT, lS)
        groupe.scale(echelle).move_to(centre)
        tous = {(i, j) for i, l in enumerate(valeurs) for j, v in enumerate(l) if v is not None}
        montres = tous if montres is None else set(montres)
        for (i, j) in tous:
            if (i, j) in montres:
                tb.posees.add((i, j))
            else:
                tb.vals.remove(tb.val[i][j])
        return tb, lT, lS

    def ligne_proba(self, nom, n, d, res, fs=44, c_res=VERT_OK):
        """« P(T) = 200/500 = 0,4 » : les morceaux, à poser un à un."""
        lab = self.t(nom, fs)
        eg = self.t("=", fs)
        fr_ = frac(n, d, int(fs * 0.8), WHITE)
        eg2 = self.t("=", fs)
        r = self.t(res, fs, c_res)
        g = suite(lab, eg, fr_, eg2, r, buff=0.25)
        for m in (eg, eg2, r):
            m.match_y(lab)
        return g

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Prouver que deux événements sont indépendants", 44, JAUNE_TITRE)
        if titre.width > 12.8:
            titre.scale_to_fit_width(12.8)
        titre.to_edge(UP, buff=0.55)
        sous = self.t("… ou pas.", 42, BLEU_CALCUL).next_to(titre, DOWN, buff=0.22)
        identite = self.t(self.identite, 28).next_to(sous, DOWN, buff=0.22)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.75))
        bal = Balance(P(-0.6, -0.55), demi=2.0, larg=2.2, h_pied=1.0)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(bal.mob), run_time=1.0)
        self.play(bal.ang.animate.set_value(0.12), run_time=0.6)
        self.au_mot("ou pas")
        self.play(FadeIn(sous, shift=UP * 0.15), bal.ang.animate.set_value(-0.12), run_time=0.7)
        bal.coul = VERT_OK
        self.play(bal.ang.animate.set_value(0.0), run_time=0.6)
        self.attendre_voix(marge=1.0)

    # ── 01 : l'entreprise : 500 points, le tableau se remplit ───────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Une entreprise")
        pts = grille_salaries().move_to(P(-4.3, 0.85))
        tb, lT, lS = self.tableau(P(2.85, 1.25), 0.52, montres=(), lettres=False)
        imm = immeuble(0.62).move_to(P(2.3, -1.95))
        self.au_mot("Une entreprise")
        self.play(FadeIn(imm, shift=UP * 0.2), run_time=0.5)
        self.au_mot("500 salariés")
        n500 = self.t("500 salariés", 34).next_to(pts, DOWN, buff=0.3)
        self.play(FadeIn(pts, lag_ratio=0.002), FadeIn(n500), FadeIn(tb, shift=UP * 0.2), run_time=1.0)
        self.play(tb.poser(2, 2), run_time=0.45)
        self.au_mot("200 font")
        tele = VGroup(*[pts[idx(i, j)] for i in range(8) for j in range(25)])
        legT = suite(Circle(radius=0.1, fill_color=COUL_T, fill_opacity=1, stroke_width=0),
                     self.t("Télétravail", 30, COUL_T), buff=0.2)
        legT.move_to(P(-6.4 + legT.width / 2, -1.95))
        self.play(*[d.animate.set_fill(COUL_T) for d in tele], FadeIn(legT), tb.poser(0, 2), run_time=0.7)
        self.au_mot("300 se disent")
        sat = VGroup(*[pts[idx(i, j)] for i in range(20) for j in range(15)])
        legS = suite(Circle(radius=0.1, fill_opacity=0, stroke_color=COUL_S, stroke_width=3),
                     self.t("Satisfait", 30, COUL_S), buff=0.2)
        legS.move_to(P(-6.4 + legS.width / 2, -2.65))
        self.play(*[d.animate.set_stroke(COUL_S, 2.5) for d in sat], FadeIn(legS), tb.poser(2, 0), run_time=0.7)
        self.au_mot("Et 120")
        coin = VGroup(*[pts[idx(i, j)] for i in range(8) for j in range(15)])
        cad = SurroundingRectangle(coin, color=JAUNE_TITRE, buff=0.05, stroke_width=5)
        self.play(Create(cad), tb.poser(0, 0), *tb.etat(cases=((0, 0),), eteindre=False), run_time=0.6)
        self.insister(tb.val[0][0], 0.35)
        self.attendre_voix()

    # ── 02 : les trois probabilités, l'une sous l'autre ─────────────────────

    def ecran_trois(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-trois")
        self.titre_ecran("Trois probabilités")
        tb, lT, lS = self.tableau(P(-0.4, 1.7), 0.6)
        self.play(FadeIn(tb), FadeIn(lT, scale=1.6), FadeIn(lS, scale=1.6), run_time=0.6)
        x0 = -6.2
        lignes = [("P de T :", "200 sur 500", "égale 0,4", "P(T)", (0, 2), "0,4"),
                  ("P de S :", "300 sur 500", "égale 0,6", "P(S)", (2, 0), "0,6"),
                  ("P de T inter S", "120 sur 500", "égale 0,24", "P(T ∩ S)", (0, 0), "0,24")]
        ys = [0.05, -1.15, -2.35]
        groupes = []
        for (m_nom, m_frac, m_res, nom, ij, res), y in zip(lignes, ys):
            g = self.ligne_proba(nom, VALEURS[ij[0]][ij[1]], 500, res)
            g.move_to(P(x0 + g.width / 2, y))
            self.au_mot(m_nom)
            self.play(FadeIn(g[0], shift=RIGHT * 0.2), *tb.etat(cases=(ij, (2, 2))), run_time=0.5)
            self.au_mot(m_frac)
            self.play(FadeIn(g[1]), TransformFromCopy(tb.val[ij[0]][ij[1]], g[2][0]), GrowFromCenter(g[2][1]),
                      TransformFromCopy(tb.val[2][2], g[2][2]), run_time=0.7)
            self.au_mot(m_res)
            self.play(FadeIn(g[3]), FadeIn(g[4], scale=0.6), run_time=0.45)
            groupes.append(g)
        self.play(*tb.etat(), run_time=0.4)
        self.insister(groupes[2][4], 0.3)
        self.attendre_voix()

    # ── 03 : le test : la BALANCE s'équilibre ───────────────────────────────

    def plateau(self, *lignes):
        """Les lignes d'un plateau, centrées l'une sous l'autre."""
        return VGroup(*lignes).arrange(DOWN, buff=0.14)

    def ecran_test(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-test")
        self.titre_ecran("Le test")
        tete = suite(self.t("On compare", 34), self.t("P(T ∩ S)", 34, JAUNE_TITRE), self.t("et", 34),
                     self.t("P(T) × P(S)", 34, BLEU_CALCUL), buff=0.22).move_to(P(-0.4, 2.45))
        bal = Balance(P(-0.6, -0.95), demi=3.2, larg=3.9, h_pied=1.45)
        gauche = bal.poser(self.plateau(self.t("P(T ∩ S)", 38, JAUNE_TITRE), self.t("0,24", 50, VERT_OK)), "g")
        # à droite, le calcul tient sur UNE ligne : rien ne flotte au-dessus d'un vide
        calc = suite(self.t("0,4 × 0,6", 40), self.t("= 0,24", 48, VERT_OK), buff=0.2)
        lab_d = self.t("P(T) × P(S)", 38, BLEU_CALCUL)
        self.plateau(lab_d, calc)
        droite = bal.poser(VGroup(lab_d, calc[0], calc[1]), "d")
        self.au_mot("Le test")
        self.play(FadeIn(bal.mob), FadeIn(tete[0]), run_time=0.6)
        self.au_mot("on compare P de T inter S")
        bal.caler()
        self.play(FadeIn(tete[1:3]), FadeIn(gauche, shift=DOWN * 0.3), run_time=0.6)
        self.play(bal.ang.animate.set_value(0.13), run_time=0.6)
        self.au_mot("avec P de T fois")
        bal.caler()
        self.play(FadeIn(tete[3]), run_time=0.6)
        self.au_mot("0,4 fois 0,6")
        bal.caler()
        self.play(FadeIn(droite[0], shift=DOWN * 0.3), FadeIn(droite[1], shift=DOWN * 0.3), run_time=0.6)
        self.au_mot("égale 0,24")
        bal.caler()
        self.play(FadeIn(droite[2], scale=0.6), run_time=0.45)
        self.play(bal.ang.animate.set_value(0.0), run_time=0.9, rate_func=rate_functions.ease_out_back)
        self.au_mot("Les deux sont égaux")
        bal.coul = VERT_OK
        x_mil = (gauche.get_right()[0] + droite[1].get_left()[0]) / 2
        egal = self.t("=", 90, VERT_OK).move_to(P(x_mil, droite[1].get_center()[1]))
        self.play(GrowFromCenter(egal), Indicate(gauche[1], color=VERT_OK), Indicate(droite[2], color=VERT_OK),
                  run_time=0.7)
        self.au_mot("T et S sont indépendants")
        ccl = self.chute("Égaux : T et S sont indépendants", color=VERT_OK, font_size=40)
        self.play(FadeIn(ccl, shift=UP * 0.15), run_time=0.6)
        self.insister(ccl, 0.3)
        self.attendre_voix()

    # ── 04 : la rédaction, en 3 lignes, comme une copie ─────────────────────

    def copie(self, larg=11.6, haut=4.2, centre=P(-0.7, -0.1), n=4):
        fond = Rectangle(width=larg, height=haut, fill_color=PAPIER, fill_opacity=1, stroke_color="#CBD5E1",
                         stroke_width=2).move_to(centre)
        pas = haut / (n + 1)
        reglure = VGroup(*[Line(fond.get_left() + P(0.05, haut / 2 - pas * (k + 1)),
                                fond.get_right() + P(-0.05, haut / 2 - pas * (k + 1)),
                                stroke_color="#93C5FD", stroke_width=2) for k in range(n)])
        marge = Line(fond.get_corner(UL) + P(1.0, 0), fond.get_corner(DL) + P(1.0, 0), stroke_color="#F87171",
                     stroke_width=3)
        return VGroup(fond, reglure, marge), [fond.get_top()[1] - pas * (k + 1) for k in range(n)]

    def ecran_phrase(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-phrase")
        self.titre_ecran("On rédige")
        page, ys = self.copie()
        x0 = page[0].get_left()[0] + 1.3
        fs = 35

        def encre(txt, color=ENCRE):
            return self.t(txt, fs, color, slant=ITALIC)

        l1a = encre("P(T) × P(S) = 0,24")
        l1b = encre("et P(T ∩ S) = 0,24.")
        l2 = encre("Ces deux nombres sont égaux,")
        l3 = encre("donc T et S sont indépendants.", "#15803D")
        suite(l1a, l1b, buff=0.3)
        for m, y in ((l1a, ys[0]), (l2, ys[1]), (l3, ys[2])):
            m.move_to(P(x0 + m.width / 2, y + 0.22))
        l1b.next_to(l1a, RIGHT, buff=0.3).align_to(l1a, DOWN)
        self.au_mot("On rédige")
        self.play(FadeIn(page, shift=UP * 0.2), run_time=0.6)
        self.au_mot("P de T fois P de S égale")
        self.play(Write(l1a), run_time=1.0)
        self.au_mot("et P de T inter S")
        self.play(Write(l1b), run_time=1.0)
        self.au_mot("Ces deux nombres")
        self.play(Write(l2), run_time=1.0)
        self.au_mot("donc T et S")
        self.play(Write(l3), run_time=1.0)
        souligne = Line(l3.get_corner(DL) + P(0, -0.08), l3.get_corner(DR) + P(0, -0.08), color="#15803D",
                        stroke_width=4)
        self.play(Create(souligne), run_time=0.4)
        self.attendre_voix()

    # ── 05 : la seconde entreprise : 0,3 contre 0,24, la balance penche ─────

    def ecran_autre(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-autre")
        self.titre_ecran("Une autre entreprise")
        tb, lT, lS = self.tableau(P(-3.35, 1.75), 0.47, valeurs=VALEURS_2, montres=())
        bal = Balance(P(-0.4, -1.3), demi=2.8, larg=3.2, h_pied=1.2)
        gauche = bal.poser(self.plateau(self.t("P(T ∩ S)", 34, JAUNE_TITRE), self.t("0,3", 52, ORANGE_RETENUE)), "g")
        droite = bal.poser(self.plateau(self.t("P(T) × P(S)", 34, BLEU_CALCUL), self.t("0,24", 52, VERT_OK)), "d")
        self.au_mot("Une autre entreprise")
        self.play(FadeIn(tb), FadeIn(lT), FadeIn(lS), FadeIn(bal.mob), run_time=0.7)
        for mot, ij in (("toujours 200", (0, 2)), ("300 satisfaits", (2, 0)), ("mais 150", (0, 0))):
            self.au_mot(mot)
            self.play(tb.poser(*ij), run_time=0.45)
        self.play(*tb.etat(cases=((0, 0),), eteindre=False), run_time=0.4)
        self.insister(tb.val[0][0], 0.3)
        g = self.ligne_proba("P(T ∩ S)", 150, 500, "0,3", fs=38, c_res=ORANGE_RETENUE)
        g.move_to(P(3.45, 1.75))
        self.au_mot("150 sur 500")
        self.play(FadeIn(g[0]), FadeIn(g[1]), tb.poser(2, 2), run_time=0.5)
        self.play(TransformFromCopy(tb.val[0][0], g[2][0]), GrowFromCenter(g[2][1]),
                  TransformFromCopy(tb.val[2][2], g[2][2]), *tb.etat(cases=((0, 0), (2, 2))), run_time=0.7)
        self.au_mot("égale 0,3")
        self.play(FadeIn(g[3]), FadeIn(g[4], scale=0.6), run_time=0.45)
        bal.caler()
        self.play(FadeIn(gauche, shift=DOWN * 0.3), *tb.etat(), run_time=0.5)
        self.play(bal.ang.animate.set_value(0.14), run_time=0.6)
        self.au_mot("vaut toujours 0,24")
        bal.caler()
        self.play(FadeIn(droite, shift=DOWN * 0.3), run_time=0.5)
        self.play(bal.ang.animate.set_value(0.08), run_time=0.7, rate_func=rate_functions.ease_out_back)
        self.au_mot("0,3 n'est pas 0,24")
        bal.coul = ROUGE_ERREUR
        diff = self.t("≠", 90, ROUGE_ERREUR).move_to(bal.pivot + P(0, 1.1))
        self.play(GrowFromCenter(diff), bal.ang.animate.set_value(0.11), run_time=0.6)
        self.au_mot("T et S ne sont pas")
        ccl = self.chute("0,3 ≠ 0,24 : T et S ne sont pas indépendants", color=ROUGE_ERREUR, font_size=38)
        self.play(FadeIn(ccl, shift=UP * 0.15), run_time=0.6)
        self.attendre_voix()

    # ── 06 : le piège : « un seul nombre » barré, « DEUX nombres » ──────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        un = suite(self.t("Conclure avec", 42), self.t("un seul nombre", 42, ROUGE_ERREUR), buff=0.25)
        un.move_to(P(-0.6, 2.3))
        self.au_mot("un seul nombre")
        self.play(FadeIn(un, shift=UP * 0.15), run_time=0.6)
        self.au_mot("« P de T inter S")
        phrase = self.t("« P(T ∩ S) = 0,3, donc ils sont indépendants »", 34)
        carte = VGroup(RoundedRectangle(width=phrase.width + 0.6, height=phrase.height + 0.5, corner_radius=0.15,
                                        fill_color="#0F172A", fill_opacity=0.9, stroke_color=ROUGE_ERREUR,
                                        stroke_width=3), phrase).move_to(P(-0.6, 1.0))
        phrase.move_to(carte[0])
        self.play(FadeIn(carte, shift=UP * 0.15), run_time=0.7)
        self.au_mot("ne veut rien dire")
        croix = VGroup(Line(carte.get_corner(UL), carte.get_corner(DR)), Line(carte.get_corner(DL), carte.get_corner(UR)))
        croix.set_stroke(ROUGE_ERREUR, 8)
        barre = Line(un[1].get_left() + LEFT * 0.1, un[1].get_right() + RIGHT * 0.1, color=ROUGE_ERREUR,
                     stroke_width=8)
        self.play(Create(croix), Create(barre), phrase.animate.set_opacity(0.45), run_time=0.7)
        self.au_mot("Il faut toujours DEUX")
        deux = suite(self.t("Il faut", 40), self.t("DEUX", 60, VERT_OK, weight=BOLD), self.t("nombres à comparer", 40),
                     buff=0.25).move_to(P(-0.6, -0.4))
        bal = Balance(P(-0.6, -2.35), demi=2.1, larg=2.7, h_pied=0.8, ep=6)
        g = bal.poser(VGroup(self.t("P(T ∩ S)", 32, JAUNE_TITRE)), "g")
        d = bal.poser(VGroup(self.t("P(T) × P(S)", 32, BLEU_CALCUL)), "d")
        self.play(FadeIn(deux, scale=0.8), FadeIn(bal.mob), run_time=0.6)
        self.insister(deux[1], 0.3)
        self.play(FadeIn(g, shift=DOWN * 0.2), FadeIn(d, shift=DOWN * 0.2), run_time=0.6)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        lignes = VGroup(self.t("P(A) = 0,5", 50), self.t("P(B) = 0,2", 50), self.t("P(A ∩ B) = 0,15", 50))
        lignes.arrange(DOWN, buff=0.4, aligned_edge=LEFT).move_to(P(-0.6, 0.75))
        for mot, l in zip(("P de A égale 0,5", "P de B égale 0,2", "P de A inter B égale 0,15"), lignes):
            self.au_mot(mot)
            self.play(FadeIn(l, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("A et B sont-ils")
        q = self.t("A et B sont-ils indépendants ?", 42, BLEU_CALCUL).move_to(P(-0.6, -1.3))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.6)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        fs = 42
        l1 = suite(self.t("P(A) × P(B)", fs, BLEU_CALCUL), self.t("= 0,5 × 0,2", fs), self.t("= 0,1", fs, VERT_OK),
                   buff=0.25).move_to(P(-0.4, 2.35))
        l2 = suite(self.t("P(A ∩ B)", fs, JAUNE_TITRE), self.t("= 0,15", fs, ORANGE_RETENUE), buff=0.25)
        l2.move_to(P(-0.4, 1.45))
        bal = Balance(P(-0.4, -1.25), demi=2.8, larg=3.0, h_pied=1.2)
        gauche = bal.poser(self.plateau(self.t("P(A ∩ B)", 34, JAUNE_TITRE), self.t("0,15", 52, ORANGE_RETENUE)), "g")
        droite = bal.poser(self.plateau(self.t("P(A) × P(B)", 34, BLEU_CALCUL), self.t("0,1", 52, VERT_OK)), "d")
        self.play(FadeIn(bal.mob), run_time=0.4)
        self.au_mot("P de A fois P de B")
        self.play(FadeIn(l1[0], shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("0,5 fois 0,2")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("égale 0,1")
        bal.caler()
        self.play(FadeIn(l1[2], scale=0.6), run_time=0.4)
        self.play(FadeIn(droite, shift=DOWN * 0.3), run_time=0.45)
        self.play(bal.ang.animate.set_value(-0.13), run_time=0.6)
        self.au_mot("Et P de A inter B")
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.5)
        bal.caler()
        self.play(FadeIn(gauche, shift=DOWN * 0.3), run_time=0.45)
        self.play(bal.ang.animate.set_value(0.1), run_time=0.8, rate_func=rate_functions.ease_out_back)
        self.au_mot("0,15 n'est pas 0,1")
        bal.coul = ROUGE_ERREUR
        diff = self.t("≠", 90, ROUGE_ERREUR).move_to(bal.pivot + P(0, 1.1))
        self.play(GrowFromCenter(diff), bal.ang.animate.set_value(0.12), run_time=0.6)
        self.au_mot("A et B ne sont pas")
        ccl = self.chute("0,15 ≠ 0,1 : A et B ne sont pas indépendants", color=ROUGE_ERREUR, font_size=38)
        self.play(FadeIn(ccl, shift=UP * 0.15), run_time=0.6)
        self.insister(ccl, 0.3)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 40
        l1 = suite(self.t("Calculer", fs), self.t("P(A) × P(B)", fs, BLEU_CALCUL), buff=0.2)
        l2 = suite(self.t("Calculer", fs), self.t("P(A ∩ B)", fs, JAUNE_TITRE), buff=0.2)
        l3 = self.t("Comparer :", fs)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.45).move_to(P(-2.0, 1.0))
        eg = self.t("Égaux : indépendants", 38, VERT_OK)
        di = self.t("Différents : pas indépendants", 38, ROUGE_ERREUR)
        eg.next_to(lignes[2], DOWN, buff=0.35).align_to(lignes[2][1], LEFT).shift(RIGHT * 0.6)
        di.next_to(eg, DOWN, buff=0.25).align_to(eg, LEFT)
        for mot, l in zip(["calculer P de A fois", "calculer P de A inter", "et comparer"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.5)
            self.play(Create(l[0]), run_time=0.35)
        self.au_mot("Égaux")
        self.play(FadeIn(eg, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Différents")
        self.play(FadeIn(di, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Prochaine vidéo")
        ch = VGroup(self.t("Prochaine vidéo :", 30, VERT_OK),
                    self.t("ne plus confondre indépendants et incompatibles", 30))
        ch.arrange(DOWN, buff=0.15, aligned_edge=LEFT).move_to(P(-0.9, -2.85))
        self.play(FadeIn(ch, shift=UP * 0.15), run_time=0.6)
        self.attendre_voix(marge=1.0)

    # ── 09 : l'écran de fin (règle du 19/10) ────────────────────────────────

    def page_abonnement(self, voix="09-abonne"):
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        self.au_mot("Entraîne-toi")
        entraine = self.t("Entraîne-toi sur", 50, JAUNE_TITRE).move_to(P(0, 2.0))
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("éleveai point")
        site = self.t("eleveai.fr", 64, BLEU_CALCUL).move_to(P(0, 0.85))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.28, stroke_width=3)
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("abonne-toi")
        abonne = self.t("Abonne-toi !", 52, VERT_OK).move_to(P(0, -0.85))
        chaine = self.t("@eleveai974", 40).next_to(abonne, DOWN, buff=0.3)
        self.play(FadeIn(abonne, shift=UP * 0.15), FadeIn(chaine, shift=UP * 0.15), run_time=0.5)
        self.play(Flash(abonne, color=VERT_OK, line_length=0.3), run_time=0.6)
        self.attendre_voix(marge=1.4)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_trois()
        self.ecran_test()
        self.ecran_phrase()
        self.ecran_autre()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class IndepJustifierSTMG(IndepJustifierBase):
    identite = "Maths STMG — EleveAI"


class IndepJustifierPremiere(IndepJustifierBase):
    identite = "Maths 1re — EleveAI"
