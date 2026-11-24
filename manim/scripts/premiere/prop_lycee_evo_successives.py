# prop_lycee_evo_successives.py
# EleveAI — Maths 1re, STMG et 2de (automatismes SANS calculatrice) — série
# « Évolutions en pourcentage », épisode COMMUN 12 : LES ÉVOLUTIONS
# SUCCESSIVES (micro du coach : auto_evo_successives ; en 2de :
# info_evolutions_successives), AVEC VOIX. Paysage, CEINTURE ORANGE (short
# jumeau : prop_lycee_evo_successives_short.py).
# Trois sous-classes : PropLyceeEvoSuccessivesPremiere (rendue en entier),
# PropLyceeEvoSuccessivesStmg et PropLyceeEvoSuccessivesSeconde (gardes
# seules, GARDE_SEULE=1, puis collage avec frac_cm_commun.py coller).
# ⭐ Méthode : on MULTIPLIE les coefficients (× 0,7 puis × 0,8 = × 0,56) ;
# le coefficient total donne le taux total ; on n'additionne jamais les taux.
# ⭐ Dessins : chaîne de flèches « × 0,7 » « × 0,8 » (100 € → 70 € → 56 €) ;
# barre de 100 % (56 % qui restent, 44 % retirés).
# Questions : 06 (+ 10 % puis + 10 %) bonne A = + 21 % ; 08 (+ 20 % puis − 10 %)
# bonne C = + 8 %.
# Décor : soldes d'un blouson (deux démarques), panier de courses (prix Insee).
# Centres : mode, argent-budget. Source : prix à la consommation en France,
# + 5,2 % en 2022, + 4,9 % en 2023, moyennes annuelles (Insee).
# Base commune : EvoLyceeBase, chargée de prop_lycee_evo_valeur_initiale.py.
#
# Voix : manim/voix/lycee-evo-successives.json (« go » le 23/11, débit −10) ;
# WAV : public/sons/lycee-evo-successives/ ; marques :
# prop_lycee_evo_successives_marques.json.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/premiere/prop_lycee_evo_successives.py PropLyceeEvoSuccessivesPremiere
# Brouillon : python -m manim render -ql --disable_caching manim/scripts/premiere/prop_lycee_evo_successives.py PropLyceeEvoSuccessivesPremiere -o eleveai-maths-premiere-evo-successives --media_dir manim/scripts/premiere/media-prop-lycee-evo-successives
# Gardes seules : GARDE_SEULE=1 … PropLyceeEvoSuccessivesStmg / PropLyceeEvoSuccessivesSeconde

import sys
from pathlib import Path
import importlib.util

_ICI = Path(__file__).resolve().parent
_spec = importlib.util.spec_from_file_location("prop_lycee_evo_valeur_initiale_base",
                                               _ICI / "prop_lycee_evo_valeur_initiale.py")
_b10 = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_b10)
from prop_ratio_ecrire import *  # noqa: E402,F403

sys.path.insert(0, str(_ICI))  # le dossier du script EN TÊTE

EvoLyceeBase = _b10.EvoLyceeBase
boite, nombre_dans, fleche, pas_audit = _b10.boite, _b10.nombre_dans, _b10.fleche, _b10.pas_audit
gras, sans, BarreCent = _b10.gras, _b10.sans, _b10.BarreCent
DEP, ARR, HAUSSE, BAISSE = _b10.DEP, _b10.ARR, _b10.HAUSSE, _b10.BAISSE
BLOUSON = "#7c3aed"


def blouson(s=1.0):
    """Un blouson : corps, manches, col, fermeture éclair."""
    corps = Polygon(P(-0.6, 0.7), P(0.6, 0.7), P(0.7, -0.8), P(-0.7, -0.8), fill_color=BLOUSON, fill_opacity=1,
                    stroke_width=0)
    mg = Polygon(P(-0.6, 0.7), P(-1.15, -0.55), P(-0.85, -0.7), P(-0.55, 0.1), fill_color="#6d28d9",
                 fill_opacity=1, stroke_width=0)
    md = mg.copy().flip(UP).shift(RIGHT * 0.0)
    md.move_to(P(-mg.get_x(), mg.get_y()))
    col = Polygon(P(-0.3, 0.7), P(0.3, 0.7), P(0, 0.35), fill_color="#ddd6fe", fill_opacity=1, stroke_width=0)
    zip_ = Line(P(0, 0.35), P(0, -0.8), color="#fbbf24", stroke_width=4)
    return VGroup(mg, md, corps, col, zip_).scale(s)


def affiche(l=3.2, h=2.6):
    return RoundedRectangle(width=l, height=h, corner_radius=0.15, fill_color="#450a0a", fill_opacity=1,
                            stroke_color=BAISSE, stroke_width=5)


def panier(s=1.0):
    """Un panier de courses : corbeille, anse, trois produits."""
    anse = Arc(radius=0.55, start_angle=0, angle=PI, color="#94a3b8", stroke_width=6).move_to(P(0, 0.35))
    prods = VGroup(Rectangle(width=0.3, height=0.6, fill_color="#ef4444", fill_opacity=1, stroke_width=0).move_to(P(-0.35, 0.2)),
                   Circle(radius=0.22, fill_color="#22c55e", fill_opacity=1, stroke_width=0).move_to(P(0.05, 0.12)),
                   Rectangle(width=0.32, height=0.45, fill_color="#fbbf24", fill_opacity=1, stroke_width=0).move_to(P(0.42, 0.15)))
    corb = Polygon(P(-0.8, 0.05), P(0.8, 0.05), P(0.6, -0.65), P(-0.6, -0.65), fill_color="#b45309", fill_opacity=1,
                   stroke_width=0)
    traits = VGroup(*[Line(P(x, 0.0), P(x * 0.78, -0.6), color="#78350f", stroke_width=3) for x in (-0.4, 0, 0.4)])
    return VGroup(anse, prods, corb, traits).scale(s)


def courbe_action(s=1.0):
    """Un petit graphique boursier : axes, une montée puis une descente."""
    ax = VGroup(Line(P(-1.2, -0.8), P(1.3, -0.8), color=GREY_B, stroke_width=3),
                Line(P(-1.2, -0.8), P(-1.2, 0.9), color=GREY_B, stroke_width=3))
    c1 = Line(P(-1.0, -0.5), P(0.1, 0.6), color=HAUSSE, stroke_width=6)
    c2 = Line(P(0.1, 0.6), P(1.1, 0.25), color=BAISSE, stroke_width=6)
    return VGroup(ax, c1, c2).scale(s)


class PropLyceeEvoSuccessivesBase(EvoLyceeBase):
    nom_voix = "lycee-evo-successives"
    fichier_marques = "prop_lycee_evo_successives_marques.json"
    ceinture = "orange"

    # ── 00 : page de garde : − 30 % puis − 20 % = − 50 % ? ──────────────────
    def page_de_garde(self):
        def dessin(sc):
            bl = blouson(1.0).move_to(P(-4.4, 0.35))
            sc.play(FadeIn(bl, shift=UP * 0.2), run_time=0.4)
            L = sc.lc([("− 30 %", BAISSE), ("puis", WHITE), ("− 20 %", BAISSE), ("= − 50 % ?", AMBRE)], 0.35, fs=46,
                      xl=-2.6)
            sc.jouer(L, ["Moins 30", "puis moins", "moins 20", "moins 50"])
            sc.play(Circumscribe(L[3], color=AMBRE, buff=0.1), run_time=0.7)
        self.garde_evo("Les évolutions successives", "Les évolutions", dessin)

    # ── 01 : les soldes du blouson ; les prix en France (Insee) ─────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        bl = blouson(0.9).move_to(P(-5.4, 1.4))
        af = affiche(l=4.0).move_to(P(-2.0, 1.3))
        self.montre("un magasin", FadeIn(af, shift=UP * 0.2), rt=0.4)
        self.montre("un blouson", FadeIn(bl, shift=RIGHT * 0.2), rt=0.4)
        a1 = gras("− 30 %", 46, WHITE).move_to(af.get_center() + P(0, 0.75))
        a2 = gras("puis − 20 %", 40, WHITE).move_to(af.get_center() + P(0, 0.0))
        a3 = gras("jusqu'à − 50 % !", 34, JAUNE_TITRE).move_to(af.get_center() + P(0, -0.75))
        for a in (a1, a2, a3):
            a.scale_to_fit_width(min(a.width, 3.6)).set_x(af.get_x())
        self.montre("moins 30", FadeIn(a1, scale=1.3), rt=0.4)
        self.montre("moins 20", FadeIn(a2, scale=1.2), rt=0.4)
        self.montre("jusqu'à", FadeIn(a3, scale=1.2), rt=0.4)
        self.insister(a3, 1.15, 0.2)
        pn = panier(1.0).move_to(P(2.0, 1.4))
        self.montre("Et les prix", FadeIn(pn, shift=UP * 0.2), rt=0.4)
        L1 = self.lc([("+ 5,2 %", BAISSE), ("en 2022", GREY_B)], 0.0, fs=40, xl=0.6)
        L2 = self.lc([("puis + 4,9 %", BAISSE), ("en 2023", GREY_B)], -0.8, fs=40, xl=0.6)
        fr = self.t("en France :", 32, WHITE).next_to(L1, UP, buff=0.2).align_to(L1, LEFT)
        self.montre("en France", FadeIn(fr), rt=0.35)
        self.jouer(L1, ["plus 5,2", "en 2022"])
        self.jouer(L2, ["puis plus 4,9", "en 2023"])
        src = self.source(["Source : Insee : prix à la consommation en France, + 5,2 % en 2022, + 4,9 % en 2023",
                           "(moyennes annuelles)."])
        self.play(FadeIn(src), run_time=0.4)
        self.attendre_voix()

    # ── 02 : la question du jour : − 50 % ? ─────────────────────────────────
    def ecran_question_jour(self):
        self.ecran("02-question-du-jour")
        bl = blouson(1.2).move_to(P(-4.3, 0.8))
        self.montre("Au total", FadeIn(bl, shift=UP * 0.2), rt=0.4)
        L = self.lc([("− 50 % ?", AMBRE)], 0.8, fs=72, xl=0.6)
        self.montre("50 %", FadeIn(L, scale=1.3), rt=0.45)
        self.play(Circumscribe(L, color=AMBRE, buff=0.15), Wiggle(bl), run_time=0.8)
        self.attendre_voix()

    # ── 03 : la chaîne des coefficients : × 0,7 puis × 0,8 ─────────────────
    def chaine3(self, y, textes=("", "", ""), l=1.55):
        xs = (-5.1, -1.6, 1.9)
        bs = [boite(t, c, 38, l=l, centre=P(x, y)) for t, c, x in zip(textes, (DEP, AMBRE, ARR), xs)]
        f1, _ = fleche(bs[0], bs[1])
        f2, _ = fleche(bs[1], bs[2])
        return bs, f1, f2

    def ecran_chaine(self):
        self.ecran("03-chaine")
        self.titre_haut("On enchaîne les coefficients", "On enchaîne")
        bs, f1, f2 = self.chaine3(0.9)
        self.play(*[FadeIn(b, shift=RIGHT * 0.15) for b in bs], GrowArrow(f1), GrowArrow(f2), run_time=0.5)
        b1 = gras("− 30 %", 30, BAISSE).next_to(f1, DOWN, buff=0.12)
        h1 = gras("× 0,7", 36, AMBRE).next_to(f1, UP, buff=0.12)
        b2 = gras("− 20 %", 30, BAISSE).next_to(f2, DOWN, buff=0.12)
        h2 = gras("× 0,8", 36, AMBRE).next_to(f2, UP, buff=0.12)
        self.montre("Moins 30", FadeIn(b1, shift=UP * 0.1), rt=0.35)
        self.montre("fois 0,7", FadeIn(h1, scale=1.3), rt=0.35)
        self.montre("Puis moins 20", FadeIn(b2, shift=UP * 0.1), rt=0.35)
        self.montre("fois 0,8", FadeIn(h2, scale=1.3), rt=0.35)
        L = self.lc([("Deux baisses :", WHITE), ("× 0,7", AMBRE), ("puis", WHITE), ("× 0,8", AMBRE)], -1.3, fs=46,
                    xl=-4.6)
        self.jouer(L, ["Deux baisses", ("fois 0,7", 2), "puis fois", ("fois 0,8", 2)])
        self.play(Indicate(h1, color=AMBRE), Indicate(h2, color=AMBRE), run_time=0.6)
        self.attendre_voix()

    # ── 04 : 0,7 × 0,8 = 0,56 ; il reste 56 % : − 44 % ; 100 → 70 → 56 ─────
    def ecran_calcul(self):
        self.ecran("04-calcul")
        L1 = self.lc([("0,7 × 0,8", WHITE), ("=", WHITE), ("0,56", AMBRE)], 2.75, fs=50, xl=-3.6)
        self.jouer(L1, ["0,7 fois", None, "égale 0,56"])
        self.insister(L1[2], 1.2, 0.2)
        br = self.barre(y=1.05, largeur=6.0, x=-2.4)
        for m in br.morceaux:
            m.set_fill(BAISSE, 1)
        reste = Rectangle(width=br.lm * 5.6, height=br.hh, fill_color=DEP, fill_opacity=1, stroke_width=0)
        reste.align_to(br.morceaux[0], LEFT).set_y(br.morceaux[0].get_y())
        self.play(FadeIn(br, shift=UP * 0.2), run_time=0.3)
        a56, t56 = self.accolade(reste, "il reste 56 %", DEP, DOWN)
        self.montre("Il reste", GrowFromEdge(reste, LEFT), GrowFromCenter(a56), rt=0.5)
        self.montre("56 % du", FadeIn(t56, scale=1.2), rt=0.3)
        rouge = Rectangle(width=br.lm * 4.4, height=br.hh).align_to(br.morceaux[9], RIGHT).set_y(reste.get_y())
        a44, t44 = self.accolade(rouge, "− 44 %", BAISSE, UP)
        self.montre("baisse de 44", GrowFromCenter(a44), FadeIn(t44, scale=1.3), rt=0.4)
        pas50 = self.lc([("pas − 50 %", ROUGE_ERREUR)], 1.05, fs=40, xl=3.9)
        self.montre("pas de 50", FadeIn(pas50, shift=LEFT * 0.15), rt=0.35)
        bs, f1, f2 = self.chaine3(-1.75, ("100 €", "70 €", "56 €"))
        h1 = gras("× 0,7", 32, AMBRE).next_to(f1, UP, buff=0.1)
        h2 = gras("× 0,8", 32, AMBRE).next_to(f2, UP, buff=0.1)
        pas_audit(VGroup(h1, h2))
        self.montre("100 €", FadeIn(bs[0], shift=RIGHT * 0.15), rt=0.35)
        self.montre("70 €", GrowArrow(f1), FadeIn(h1), FadeIn(bs[1], scale=1.2), rt=0.4)
        self.montre("puis 56", GrowArrow(f2), FadeIn(h2), FadeIn(bs[2], scale=1.2), rt=0.4)
        self.play(Create(self.cadre(bs[2])), run_time=0.3)
        self.attendre_voix()

    # ── 05 : le piège : on n'additionne pas les taux ────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        self.titre_haut("Attention au piège !", "Attention", couleur=ROUGE_ERREUR, fs=44)
        L1 = pas_audit(self.lc([("− 30 % − 20 % = − 50 %", WHITE)], 2.15, fs=44, xl=-3.4))
        self.montre("On n'additionne", FadeIn(L1, shift=RIGHT * 0.15), rt=0.4)
        self.montre("pas les taux", Create(self.barrer(L1)), L1.animate.set_color(ROUGE_ERREUR), rt=0.4)
        b1 = self.barre(y=0.85, largeur=5.0, x=-3.5)
        b2 = BarreCent("", largeur=3.5, h=0.75, centre=P(-4.25, -0.45))
        for m in list(b1.morceaux) + list(b2.morceaux):
            m.set_fill(DEP, 1)
        n1 = self.t("prix de départ", 32, DEP).next_to(b1, RIGHT, buff=0.3)
        n2 = self.t("prix déjà baissé", 32, AMBRE).next_to(b2, RIGHT, buff=0.3)
        self.montre("La deuxième", FadeIn(b1, shift=UP * 0.2), FadeIn(b2, shift=UP * 0.2), *b2.colorer([8, 9], BAISSE),
                    rt=0.5)
        self.montre("déjà baissé", FadeIn(n2, shift=LEFT * 0.15), Indicate(b2, color=AMBRE, scale_factor=1.05), rt=0.5)
        self.montre("pas sur le prix", FadeIn(n1, shift=LEFT * 0.15), rt=0.4)
        self.play(Create(self.barrer(n1)), run_time=0.3)
        L2 = self.lc([("Les coefficients", VERT_OK), ("se multiplient :", VERT_OK)], -1.6, fs=40, xl=-5.6)
        k = pas_audit(gras("× 0,7 × 0,8", 44, AMBRE)).next_to(L2, DOWN, buff=0.25).align_to(L2, LEFT)
        self.jouer(L2, ["Les coefficients", "se multiplient"])
        self.play(FadeIn(k, scale=1.2), run_time=0.35)
        self.insister(k, 1.15, 0.2)
        self.attendre_voix()

    # ── 06 : QUESTION 1 (+ 10 % puis + 10 % ; A = + 21 %) ───────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b = self.barre(y=1.75, largeur=4.0, x=-4.1)
        for m in b.morceaux:
            m.set_fill(DEP, 1)
        bt = self.bout_hausse(b, 1)
        bt2 = Rectangle(width=b.lm * 1.1, height=b.hh, fill_color=HAUSSE, fill_opacity=1, stroke_color=WHITE,
                        stroke_width=2).next_to(bt, RIGHT, buff=0.04)

        def avant(sc):
            sc.play(FadeIn(b, shift=UP * 0.2), FadeIn(bt, shift=LEFT * 0.2), run_time=0.4)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["1,1 × 1,1", "= 1,21", "= + 21 %"])
            l1 = sc.ligne_rep(1, ["B : on additionne ;", "C : 10 × 10."])
            sc.montre("1,1 fois", FadeIn(l0[0], shift=UP * 0.15), rt=0.35)
            sc.montre("égale 1,21", FadeIn(l0[1], scale=1.3), FadeIn(bt2, shift=LEFT * 0.2), rt=0.4)
            a21, t21 = sc.accolade(VGroup(bt, bt2), "+ 21 %", HAUSSE, DOWN)
            sc.montre("plus 21", FadeIn(l0[2], scale=1.3), GrowFromCenter(a21), FadeIn(t21, scale=1.3), rt=0.4)
            sc.montre("B additionne", FadeIn(l1[0], shift=UP * 0.15), Create(sc.barrer_choix(1)), rt=0.4)
            sc.montre("C multiplie", FadeIn(l1[1], shift=UP * 0.15), Create(sc.barrer_choix(2)), rt=0.4)
            sc.rep_fini()

        self.question_pause("06-question", "06b-reponse", ["+ 10 %, puis + 10 % :", "au total ?"],
                            [self.t("+ 21 %", 36), self.t("+ 20 %", 36), self.t("+ 100 %", 36)], 0,
                            ["1,1 × 1,1 = 1,21 = + 21 %", "B : on additionne ; C : 10 × 10."],
                            mot_q="Plus 10", avant_q=avant, autres_r=apres)

    # ── 07 : les prix en France : 1,052 × 1,049 ≈ 1,104 → + 10,4 % ─────────
    def ecran_prix(self):
        self.ecran("07-prix")
        self.titre_haut("Les prix en France", "Les prix")
        pn = panier(1.3).move_to(P(-5.0, 1.3))
        self.play(FadeIn(pn, shift=UP * 0.2), run_time=0.4)
        xl = -3.0
        L1 = self.lc([("+ 5,2 %", BAISSE), ("puis", WHITE), ("+ 4,9 %", BAISSE)], 1.9, fs=44, xl=xl)
        self.jouer(L1, ["plus 5,2", "puis plus", "plus 4,9"])
        L2 = self.lc([("1,052 × 1,049", WHITE), ("≈ 1,104", AMBRE)], 0.9, fs=46, xl=xl)
        self.jouer(L2, ["1,052 fois", "environ 1,104"])
        L3 = self.lc([("→ + 10,4 %", VERT_OK), ("en deux ans", WHITE)], -0.1, fs=46, xl=xl)
        L3[1].shift(RIGHT * 0.2)
        self.jouer(L3, ["Plus 10,4", "en deux ans"])
        self.play(Create(self.cadre(L3[0])), run_time=0.3)
        L4 = self.lc([("un peu plus que", GREY_B), ("5,2 + 4,9", GREY_B)], -1.1, fs=40, xl=xl)
        self.jouer(L4, ["un peu plus", "5,2 plus"])
        self.attendre_voix()

    # ── 08 : QUESTION 2 (+ 20 % puis − 10 % ; C = + 8 %) ─────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        ca = courbe_action(1.4).move_to(P(-3.9, 1.6))

        def avant(sc):
            sc.play(FadeIn(ca[0]), Create(ca[1]), Create(ca[2]), run_time=0.6)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["1,2 × 0,9", "= 1,08", "= + 8 %"])
            l1 = sc.ligne_rep(1, ["A : on additionne ;"])
            l2 = sc.ligne_rep(2, ["B : taux × taux."])
            sc.montre("1,2 fois", FadeIn(l0[0], shift=UP * 0.15), rt=0.35)
            sc.montre("égale 1,08", FadeIn(l0[1], scale=1.3), rt=0.35)
            sc.montre("plus 8", FadeIn(l0[2], scale=1.3), Indicate(ca, color=HAUSSE, scale_factor=1.05), rt=0.4)
            sc.montre("A additionne", FadeIn(l1[0], shift=UP * 0.15), Create(sc.barrer_choix(0)), rt=0.4)
            sc.montre("B multiplie", FadeIn(l2[0], shift=UP * 0.15), Create(sc.barrer_choix(1)), rt=0.4)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse", ["Une action : + 20 %,", "puis − 10 %.", "Au total ?"],
                            [self.t("+ 10 %", 36), self.t("+ 2 %", 36), self.t("+ 8 %", 36)], 2,
                            ["1,2 × 0,9 = 1,08 = + 8 %", "A : on additionne ;", "B : taux × taux."],
                            mot_q="Une action", avant_q=avant, autres_r=apres)

    # ── 09 : défi : + 5 % deux fois ; − 50 % deux fois ──────────────────────
    def chaines_defi(self):
        def ch(y, couleur):
            xs = (-6.0, -3.2, -0.4)
            bs = [boite("", c, 30, l=1.1, h=0.8, centre=P(x, y)) for x, c in zip(xs, (DEP, couleur, couleur))]
            f1, _ = fleche(bs[0], bs[1])
            f2, _ = fleche(bs[1], bs[2])
            return bs, f1, f2
        return ch(1.5, AMBRE), ch(-0.75, AMBRE)

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.titre_haut("À toi de jouer !", "À toi de jouer", fs=50)
        (b1, f1, g1), (b2, f2, g2) = self.chaines_defi()
        n1 = sans(self.t("un loyer", 28, GREY_B)).next_to(b1[0], UP, buff=0.15).align_to(b1[0], LEFT)
        n2 = sans(self.t("un prix", 28, GREY_B)).next_to(b2[0], UP, buff=0.15).align_to(b2[0], LEFT)
        self.montre("Un loyer", *[FadeIn(b) for b in b1], FadeIn(n1), rt=0.4)
        t1 = gras("+ 5 %", 28, HAUSSE).next_to(f1, UP, buff=0.08)
        t2 = pas_audit(gras("+ 5 %", 28, HAUSSE).next_to(g1, UP, buff=0.08))
        self.montre("5 %", GrowArrow(f1), FadeIn(t1, scale=1.3), rt=0.35)
        self.montre("deux années", GrowArrow(g1), FadeIn(t2, scale=1.3), rt=0.35)
        q1 = self.t("au total ?", 34, AMBRE).next_to(b1[2], RIGHT, buff=0.3)
        self.montre("quel taux", FadeIn(q1, shift=LEFT * 0.1), rt=0.35)
        self.montre("un prix", *[FadeIn(b) for b in b2], FadeIn(n2), rt=0.4)
        t3 = gras("− 50 %", 28, BAISSE).next_to(f2, UP, buff=0.08)
        t4 = gras("− 50 %", 28, BAISSE).next_to(g2, UP, buff=0.08)
        self.montre("baisse de 50", GrowArrow(f2), FadeIn(t3, scale=1.3), rt=0.35)
        self.montre("encore de 50", GrowArrow(g2), FadeIn(t4, scale=1.3), rt=0.35)
        q2 = self.t("au total ?", 34, AMBRE).next_to(b2[2], RIGHT, buff=0.3)
        self.montre(("quel taux", 2), FadeIn(q2, shift=LEFT * 0.1), rt=0.35)
        self.pause_defi(y=-2.25)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        xl = 0.0
        L1 = self.lc([("1,05 × 1,05", WHITE), ("= 1,1025", AMBRE)], 1.85, fs=40, xl=xl)
        L1b = self.lc([("+ 10,25 %", VERT_OK)], 1.15, fs=44, xl=xl + 0.5)
        L2 = self.lc([("0,5 × 0,5", WHITE), ("= 0,25", AMBRE)], -0.4, fs=40, xl=xl)
        L2b = self.lc([("il reste 25 % :", WHITE), ("− 75 %", VERT_OK)], -1.1, fs=44, xl=xl + 0.5)
        b1 = self.barre(y=1.5, largeur=4.6, x=-3.6)
        for m in b1.morceaux:
            m.set_fill(DEP, 1)
        bt = Rectangle(width=b1.lm * 1.025, height=b1.hh, fill_color=HAUSSE, fill_opacity=1, stroke_color=WHITE,
                       stroke_width=2).next_to(b1.bp.piste, RIGHT, buff=0.04)
        b2 = self.barre(y=-0.75, largeur=4.6, x=-3.6)
        for m in b2.morceaux:
            m.set_fill(DEP, 1)
        self.play(Write(tit), FadeIn(b1, shift=UP * 0.2), run_time=0.4)
        self.jouer(L1, ["1,05 fois", "égale 1,1025"])
        self.montre("plus 10,25", FadeIn(L1b, scale=1.3), FadeIn(bt, shift=LEFT * 0.2), rt=0.4)
        self.play(Create(self.cadre(L1b)), run_time=0.3)
        self.montre("0,5 fois", FadeIn(L2[0], shift=RIGHT * 0.15), FadeIn(b2, shift=UP * 0.2), rt=0.35)
        self.montre("égale 0,25", FadeIn(L2[1], scale=1.3), *b2.colorer(range(5, 10), BAISSE), rt=0.4)
        self.montre("il reste", FadeIn(L2b[0], shift=RIGHT * 0.15), *b2.colorer(range(3, 5), BAISSE),
                    FadeIn(b2.demi(2, BAISSE).align_to(b2.morceaux[2], RIGHT)), rt=0.45)
        self.montre("baisse de 75", FadeIn(L2b[1], scale=1.3), rt=0.4)
        self.play(Create(self.cadre(L2b[1])), run_time=0.3)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        bs, f1, f2 = self.chaine3(0.6, l=1.0)
        for b, x in zip(bs, (-6.0, -3.75, -1.5)):
            b.move_to(P(x, 0.6))
        f1, _ = fleche(bs[0], bs[1])
        f2, _ = fleche(bs[1], bs[2])
        h1 = gras("× c₁", 32, AMBRE).next_to(f1, UP, buff=0.1)
        h2 = gras("× c₂", 32, AMBRE).next_to(f2, UP, buff=0.1)
        ct = gras("c total = c₁ × c₂", 34, VERT_OK).move_to(P(-3.75, -0.5))
        fig = pas_audit(VGroup(*bs, f1, f2, h1, h2, ct))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Évolutions successives :", "on multiplie les coefficients."),
            ("Le coefficient total", "donne le taux total."),
            ("On n'additionne jamais", "les taux.")], fs=36)
        self.au_mot("Pour des")
        self.montrer_ligne(lignes[0], Indicate(VGroup(h1, h2), color=AMBRE))
        self.au_mot("Le coefficient total")
        self.montrer_ligne(lignes[1], Indicate(ct, color=VERT_OK))
        self.au_mot("On n'additionne")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.finir([self.page_de_garde, self.ecran_situation, self.ecran_question_jour, self.ecran_chaine,
                    self.ecran_calcul, self.ecran_piege, self.ecran_question1, self.ecran_prix,
                    self.ecran_question2, self.ecran_defi, self.ecran_correction, self.ecran_finale])


class PropLyceeEvoSuccessivesPremiere(PropLyceeEvoSuccessivesBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "orange"


class PropLyceeEvoSuccessivesStmg(PropLyceeEvoSuccessivesBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "orange"


class PropLyceeEvoSuccessivesSeconde(PropLyceeEvoSuccessivesBase):
    identite = "Maths 2de — EleveAI"
    ceinture = "orange"
