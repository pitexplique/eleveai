# frac_mixte.py
# EleveAI — Maths 6e — série « Fractions », épisode 06 : ENCADRER ET RANGER,
# ÉCRITURE MIXTE (micro du coach : fraction_mixte), AVEC VOIX. Paysage 16:9,
# CEINTURE VERTE (la paysage complète du niveau : méthode, piège, défi corrigé,
# repère de REGLES.md). Short jumeau : frac_mixte_short.py (blanche).
# ⭐ LA STRATÉGIE DU BO (en-tête de la micro dans fractions.bank.ts) : on ne met
# pas au même dénominateur pour ranger ; on compare d'abord à 1, puis au repère
# 1/2, on encadre entre deux entiers, on écrit le nombre mixte. Tout se fait
# SUR LA DEMI-DROITE GRADUÉE (le canvas `droiteMixte` du coach), pas sur des disques.
# ⚠️ Le piège du chapitre : dans 7/4, le 7 compte des QUARTS, pas des unités.
#
# Décor et métier : la MUSIQUE ; Awa, PRODUCTRICE DE MUSIQUE : dans son logiciel,
# une mesure = 4 temps ; son effet sonore dure 7 temps = 7/4 de mesure = 1 + 3/4.
# Une mesure = une unité de la demi-droite. Aucune donnée du monde réel citée.
# Centres d'intérêt : musique, technologie-ia (le logiciel de musique).
#
# Micro → écrans (banque + fiche maths-6e-fractions.tsx) : placer 7/4 (02, fiche
# propriété 6), comparer à 1 (03, fiche réflexe 3 : 3/4 et 7/4 autour de 1,
# fixed_3), écriture mixte 7/4 = 1 + 3/4 (04, fixed_1), le piège « 7 compte des
# quarts » (05), encadrer 7/3 (06 question, fixed_2), repère 1/2 en doublant le
# numérateur (07, tpl_ouverte cas 4), ranger sans calcul (08, tpl_ouverte cas 1),
# question 4/9 < 1/2 (09), défi 3/2 ; 5/4 ; 1 + 3/4 (10, fixed_4 et fiche
# usage 2), la chaîne 3/4 = 0,75 = 75 % → 7/4 = 1,75 (11).
# Écrans : 00 garde · 01 Awa · 02 la demi-droite, 7 sauts · 03 comparer à 1 ·
# 04 écriture mixte · 05 le piège · 06 QUESTION 1 · 07 le repère 1/2 · 08 ranger ·
# 09 QUESTION 2 · 10 défi · 10b correction · 11 la chaîne · 12 ce que tu as appris · 13 fin.
#
# Voix : manim/voix/6e-frac-mixte.json (débit −10), WAV dans public/sons/6e-frac-mixte/ ;
# marques : frac_mixte_marques.json (scripts/marques_dump.ps1 + scripts/cues2marques.py).
# Outils du lot : frac_lotb_commun.py.
# python -m manim render -qh --disable_caching manim/scripts/6e/frac_mixte.py FracMixte6e -o eleveai-maths-6e-frac-mixte --media_dir manim/scripts/6e/media-frac-mixte
# Sortie : manim/sorties/6e/maths/fractions/06-mixte/eleveai-maths-6e-frac-mixte.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotb_commun import *  # noqa: E402,F403

VIOLET_SON = "#a78bfa"
X0 = -6.1   # le bord gauche des lignes de texte sous la demi-droite


def productrice(s=1.0):
    """Awa, productrice : casque sur les oreilles, sweat violet."""
    p = personnage(peau="#5c3a1e", haut="#7c3aed", cheveux="#111827", s=s)
    arceau = Arc(radius=0.5, start_angle=0.15, angle=PI - 0.3, color="#e5e7eb", stroke_width=7).move_to(P(0, 0.3))
    ecout = VGroup(*[RoundedRectangle(width=0.2, height=0.36, corner_radius=0.08, fill_color="#f472b6",
                                      fill_opacity=1, stroke_width=0).move_to(P(x, 0.0)) for x in (-0.47, 0.47)])
    return VGroup(p, VGroup(arceau, ecout).scale(s, about_point=ORIGIN))


def ecran_logiciel(larg=4.6, h=2.2):
    """L'écran du logiciel de musique : 2 mesures de 4 temps, une piste violette."""
    fond = RoundedRectangle(width=larg, height=h, corner_radius=0.2, fill_color="#111827", fill_opacity=1,
                            stroke_color="#475569", stroke_width=4)
    g = VGroup(fond)
    x0, w = -larg / 2 + 0.3, (larg - 0.6) / 8
    for j in range(9):
        fort = j % 4 == 0
        g.add(Line(P(x0 + j * w, h / 2 - 0.35), P(x0 + j * w, -h / 2 + 0.3), color="#94a3b8" if fort else "#334155",
                   stroke_width=4 if fort else 2))
    g.piste = Rectangle(width=7 * w, height=0.5, fill_color=VIOLET_SON, fill_opacity=0.9, stroke_width=0)
    g.piste.move_to(P(x0 + 3.5 * w, -0.1))
    g.x0, g.w = x0, w
    return g


class FracMixteBase(PaysageB):
    nom_voix = "6e-frac-mixte"
    fichier_marques = "frac_mixte_marques.json"

    def droite(self, a, b, n, etiq=None, y=2.05, longueur=11.0, x=-0.35, fs=34):
        etiq = {v: str(v) for v in range(a, b + 1)} if etiq is None else etiq
        return Droite(a, b, n, etiquettes=etiq, longueur=longueur, fs=fs, centre=P(x, y))

    def pt(self, dr, v, frac=None, couleur=BLEU_POINT, haut=0.85, fs=32, droite=True):
        """Le point du coach (tige + rond) et sa fraction écrite À CÔTÉ du rond."""
        g = dr.point(v, None, couleur=couleur, haut=haut)
        if frac is not None:
            e = EcritureFraction(*frac, fs=fs, couleur=couleur, police="Arial", gras=True) \
                if isinstance(frac, tuple) else self.mor(frac, fs, couleur)
            e.next_to(g[1], RIGHT if droite else LEFT, buff=0.1)
            g.add(e)
        return g

    def rang(self, specs, k, fs=40, haut=None):
        """Une ligne sous la demi-droite (rangée k), calée à gauche."""
        lg = self.ligne_mots(specs, fs)
        y0 = (haut if haut is not None else -0.05) - k * 1.2
        lg.move_to(P(0, y0)).align_to(P(X0, 0), LEFT)
        return lg

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Encadrer, ranger, écriture mixte", self.identite, self.ceinture)
        dr = Droite(0, 2, 8, etiquettes={0: "0", 1: "1", 2: "2"}, longueur=7.5, centre=P(-0.6, 0.1))
        self.au_mot("Encadrer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(dr), run_time=0.8)
        self.au_mot("7 quarts")
        p = self.pt(dr, 1.75, (7, 4))
        self.play(FadeIn(p, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("plus ou moins")
        q = self.t("?", 90, AMBRE).next_to(dr.carte, RIGHT, buff=0.4)
        self.play(FadeIn(q, scale=0.4), Indicate(dr.etiquettes[1], color=AMBRE), run_time=0.5)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Awa, productrice de musique ────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = productrice(1.15).move_to(P(-5.3, -0.4))
        self.au_mot("Voici Awa")
        nom = self.col(self.t("Awa", 44, BLEU_CALCUL), 2.9)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("productrice")
        met = self.col(self.t("productrice de musique", 36, BLEU_CALCUL), 2.2)
        self.play(FadeIn(met, shift=UP * 0.2), run_time=0.4)
        lo = ecran_logiciel().move_to(P(-1.55, 0.6))
        self.au_mot("son logiciel")
        self.play(FadeIn(lo, shift=UP * 0.2), run_time=0.5)
        l1 = self.ligne_mots([("1 mesure =", WHITE, "une mesure"), ("4 temps", BLEU_CALCUL, "4 temps")], fs=40)
        self.col(l1, 1.15)
        self.jouer_mots(l1, avec=[Indicate(VGroup(*lo[1:6]), color=AMBRE)])
        x0 = lo[0].get_left()[0] + 0.3
        lo.piste.stretch_to_fit_width(0.001).move_to(P(x0, lo[0].get_y() - 0.1), LEFT)
        self.add(lo.piste)
        pousser = lambda: [lo.piste.animate(run_time=0.7).stretch_to_fit_width(7 * lo.w).align_to(P(x0, 0), LEFT)]  # noqa
        l2 = self.ligne_mots([("effet :", WHITE, "effet sonore"), ("7 temps", VIOLET_SON, "7 temps", pousser)], fs=40)
        self.col(l2, 0.3)
        self.jouer_mots(l2)
        l3 = self.ligne_mots([("=", WHITE, "7 quarts"), (EcritureFraction(7, 4, fs=52, couleur=VIOLET_SON), WHITE, None),
                              ("de mesure", WHITE, None)], fs=40)
        self.col(l3, -0.75)
        self.jouer_mots(l3)
        self.au_mot("Où se termine")
        q = self.col(self.t("Où se termine-t-il ?", 40, ORANGE_RETENUE), -2.0)
        self.play(FadeIn(q, scale=0.8), run_time=0.4)
        self.attendre_voix()

    # ── la demi-droite des mesures (0 à 2, en quarts) ───────────────────────
    def droite_mesures(self, n=8):
        dr = self.droite(0, 2, n)
        noms = VGroup(*[self.mor(f"mesure {k}", 26, "#64748b").move_to(P(dr.p(k - 0.5)[0], dr.p(0)[1] - 0.62))
                        for k in (1, 2)])
        return dr, noms

    def sauts(self, dr, k1, k2, pas=0.25, couleur=AMBRE):
        """Les arcs des sauts d'un quart (de k1 à k2 quarts), numérotés."""
        arcs, nums = VGroup(), VGroup()
        for k in range(k1, k2):
            a = ArcBetweenPoints(dr.p(k * pas) + UP * 0.08, dr.p((k + 1) * pas) + UP * 0.08, angle=-PI / 2,
                                 color=couleur, stroke_width=5)
            arcs.add(a)
            nums.add(self.mor(str(k + 1), 34, couleur).next_to(a, UP, buff=0.04))
        return arcs, nums

    # ── 02 : la demi-droite, 7 sauts d'un quart ─────────────────────────────
    def ecran_droite(self):
        self.ecran("02-droite")
        d2 = self.droite(0, 2, 2)
        dr, noms = self.droite_mesures()
        self.au_mot("Sur la demi-droite")
        self.play(FadeIn(d2.carte), Create(d2.axe), *[Create(t) for t in d2.ticks.values()],
                  *[FadeIn(e) for e in d2.etiquettes.values()], run_time=0.8)
        self.au_mot("chaque unité est une mesure")
        self.play(LaggedStart(*[FadeIn(n, shift=UP * 0.1) for n in noms], lag_ratio=0.4), run_time=0.7)
        self.au_mot("On coupe chaque mesure")
        d8, anim = d2.graduer(8, run_time=1.0)
        self.play(anim)
        self.add(noms)
        self.au_mot("des quarts")
        q = self.mor("1 quart", 36, AMBRE)
        acc = Brace(Line(d8.p(0), d8.p(0.25)), UP, color=AMBRE, buff=0.12)
        q.next_to(acc, UP, buff=0.04)
        self.play(FadeIn(acc), FadeIn(q), run_time=0.4)
        arcs, nums = self.sauts(d8, 0, 7)
        mots = ["1, 2", "2, 3", "3, 4", "4, 5", "5, 6", "6, 7", "7. L'effet"]
        for k, (a, nb, mot) in enumerate(zip(arcs, nums, mots)):
            self.au_mot(mot)
            self.play(Create(a), FadeIn(nb, scale=1.3), *([FadeOut(VGroup(acc, q))] if k == 0 else []), run_time=0.3)
        p = self.pt(d8, 1.75, (7, 4), couleur=VIOLET_SON, haut=1.0)
        p[2].next_to(p[1], RIGHT, buff=0.12)
        self.au_mot("7 quarts.")
        self.play(FadeIn(p, shift=DOWN * 0.2), run_time=0.4)
        self.insister(p[2], 1.3, 0.25)
        self.attendre_voix()
        return d8, noms, p

    # ── 03 : comparer à 1 ───────────────────────────────────────────────────
    def ecran_comparer_1(self, dr, noms, p):
        self.ecran("03-comparer-1")
        self.add(dr, noms, p)
        self.au_mot("on compare à 1")
        self.play(Indicate(dr.etiquettes[1], color=AMBRE, scale_factor=1.6), run_time=0.6)
        acc = Line(dr.p(0), dr.p(1), color=BLEU_CALCUL, stroke_width=14).set_opacity(0.8)
        l1 = self.rang([(EcritureFraction(4, 4, fs=38), WHITE, ("4 quarts égale", 1)), ("= 1", WHITE, "1. Ici")], 0)
        self.jouer_mots(l1, avec=[Create(acc)])
        l2 = self.rang([("7 > 4", VERT_OK, "7 est plus grand"), ("donc", WHITE, "7 quarts est"),
                        (EcritureFraction(7, 4, fs=46, couleur=VIOLET_SON), WHITE, None),
                        ("> 1", VERT_OK, "1. Avec")], 1)
        self.jouer_mots(l2)
        p3 = self.pt(dr, 0.75, (3, 4), couleur=BLEU_POINT, haut=1.0)
        l3 = self.rang([("3 < 4", ORANGE_RETENUE, "3 est plus petit"), ("donc", WHITE, "3 quarts est"),
                        (EcritureFraction(3, 4, fs=38), WHITE, None), ("< 1", ORANGE_RETENUE, "1.")], 2)
        l3.mots[-1] = ("1.", 4)
        self.au_mot("Avec 3 quarts")
        self.play(FadeIn(p3, shift=DOWN * 0.2), run_time=0.4)
        self.jouer_mots(l3)
        self.attendre_voix()

    # ── 04 : l'écriture mixte ───────────────────────────────────────────────
    def ecran_mixte(self, dr, noms, p):
        self.ecran("04-mixte")
        self.add(dr, noms, p)
        a1 = Line(dr.p(0), dr.p(1), color=BLEU_CALCUL, stroke_width=14).set_opacity(0.8)
        a2 = Line(dr.p(1), dr.p(1.75), color=VIOLET_SON, stroke_width=14).set_opacity(0.9)
        l1 = self.rang([(EcritureFraction(7, 4, fs=38, couleur=VIOLET_SON), WHITE, ("7 quarts", 1)),
                        ("=", WHITE, None), (EcritureFraction(4, 4, fs=38), WHITE, "4 quarts"),
                        ("+", WHITE, "plus 3"), (EcritureFraction(3, 4, fs=38), WHITE, "3 quarts. Donc")], 0,
                       haut=0.0)
        l1.extras[2] = lambda: [Create(a1)]
        l1.extras[4] = lambda: [Create(a2)]
        self.jouer_mots(l1)
        l2 = self.rang([(EcritureFraction(7, 4, fs=38, couleur=VIOLET_SON), WHITE, "7 quarts égale"),
                        ("=", WHITE, None), ("1", BLEU_CALCUL, "1 plus"), ("+", WHITE, None),
                        (EcritureFraction(3, 4, fs=46, couleur=VIOLET_SON), WHITE, "3 quarts. On")], 1)
        self.jouer_mots(l2)
        lit = self.rang([("on lit : « 1 et 3 quarts »", AMBRE, "1 et 3")], 2, fs=36)
        self.jouer_mots(lit)
        self.au_mot("l'écriture mixte")
        m = self.t("l'écriture mixte", 40, VERT_OK).next_to(l2, RIGHT, buff=0.6)
        self.play(FadeIn(m, scale=1.2), Create(self.encadrer(l2)), run_time=0.5)
        self.attendre_voix()

    # ── 05 : le piège (7 compte des quarts) ─────────────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR).move_to(P(-0.4, 3.05))
        dr = self.droite(0, 8, 8, y=1.0)
        self.au_mot("Attention au piège")
        self.play(Write(tit), FadeIn(dr), run_time=0.6)
        self.au_mot("Le 7")
        faux = self.pt(dr, 7, "7 ?", couleur=ROUGE_ERREUR, haut=0.8)
        x7 = croix(faux[1].copy().scale(2.2), sw=6)
        self.play(FadeIn(faux, shift=DOWN * 0.2), run_time=0.4)
        l1 = self.rang([("le 7 compte des", WHITE, "il compte"), ("quarts", AMBRE, None)], 0, haut=-1.0)
        self.au_mot("ne compte pas des mesures")
        self.play(Create(x7), run_time=0.4)
        self.jouer_mots(l1)
        self.au_mot("7 quarts n'est pas")
        bon = self.pt(dr, 1.75, (7, 4), couleur=VIOLET_SON, haut=0.8)
        self.play(FadeIn(bon, shift=DOWN * 0.2), run_time=0.4)
        l2 = self.rang([("1 <", VERT_OK, "1 et 2"), (EcritureFraction(7, 4, fs=38, couleur=VIOLET_SON), WHITE, None),
                        ("< 2", VERT_OK, "2 :")], 1, haut=-1.0)
        self.jouer_mots(l2, avec=[Indicate(VGroup(dr.etiquettes[1], dr.etiquettes[2]), color=VERT_OK)])
        self.au_mot("c'est encadrer")
        e = self.t("c'est encadrer !", 40, VERT_OK).next_to(l2, RIGHT, buff=0.6)
        self.play(FadeIn(e, scale=1.2), Create(self.encadrer(l2)), run_time=0.5)
        self.attendre_voix()

    # ── questions : la loupe, puis la demi-droite de la réponse ─────────────
    def loupe(self, r=1.2):
        return VGroup(Circle(radius=r, stroke_color=AMBRE, stroke_width=10),
                      Line(P(r * 0.72, -r * 0.72), P(r * 1.6, -r * 1.6), stroke_color=AMBRE, stroke_width=16))

    def debut_question(self):
        self.clear()
        self.add_mascotte()
        lp = self.loupe().move_to(P(-3.3, 0.3))
        qm = self.t("?", 110, AMBRE).move_to(lp[0])
        self.add(lp, qm)
        return VGroup(lp, qm)

    def marque_demi(self, dr, couleur="#b45309", dessous=False):
        """Le repère 1/2 : un trait ambre et « 1/2 » juste au-dessus de l'axe."""
        x = dr.p(0.5)
        t = Line(x + DOWN * 0.28, x + UP * 0.28, color=AMBRE, stroke_width=7)
        e = EcritureFraction(1, 2, fs=28, couleur=couleur, police="Arial", gras=True)
        if dessous:  # sous l'axe (la petite droite de la question 2 : 4/9 est juste à gauche, au-dessus)
            e.next_to(x + DOWN * 0.3, DOWN, buff=0.05)
        else:
            e.next_to(x + UP * 0.3, UP, buff=0.05)
        return VGroup(t, e)

    # ── 06 : QUESTION 1 (7/3 entre 2 et 3) ──────────────────────────────────
    def ecran_question1(self):
        loupe = self.debut_question()
        dr = Droite(0, 3, 9, etiquettes={0: "0", 1: "1", 2: "2", 3: "3"}, longueur=5.4, centre=P(-3.2, 0.4))
        p7 = self.pt(dr, 7 / 3, (7, 3), haut=0.85, fs=30)
        sortir = lambda: [FadeOut(loupe, run_time=0.3), FadeIn(dr, run_time=0.3)]  # noqa: E731
        self.question_b("06-question", "06b-reponse", ["Entre quels entiers", "se trouve 7 tiers ?"],
                        [bloc_fixe(self.inline("entre 2 et 3")), bloc_fixe(self.inline("entre 7 et 8")),
                         bloc_fixe(self.inline("entre 1 et 2"))], 0,
                        [[("6/3", WHITE, "6 tiers", sortir), ("= 2", WHITE, "2, et",
                                                            lambda: [Indicate(dr.etiquettes[2], color=VERT_OK, run_time=0.3)]),
                          ("et 9/3", WHITE, "9 tiers"), ("= 3", WHITE, "3. 7",
                                                         lambda: [Indicate(dr.etiquettes[3], color=VERT_OK, run_time=0.3)])],
                         [("6 < 7 < 9", AMBRE, "7 est entre", lambda: [FadeIn(p7, shift=DOWN * 0.2, run_time=0.3)])],
                         [("7/3", VERT_OK, "7 tiers égale"), ("= 2", VERT_OK, "2 plus"), ("+ 1/3", VERT_OK, "1 tiers.")]],
                        mot_q="Entre quels")

    # ── 07 : le repère 1/2 (doubler le numérateur) ──────────────────────────
    def ecran_demi(self):
        self.ecran("07-demi")
        dr = self.droite(0, 1, 5)
        self.add(dr)
        dm = self.marque_demi(dr)
        self.au_mot("1 demi.")
        self.play(Create(dm[0]), FadeIn(dm[1], scale=1.3), run_time=0.5)
        p2 = self.pt(dr, 0.4, (2, 5), haut=0.85, droite=False)
        p3 = self.pt(dr, 0.6, (3, 5), couleur=VIOLET_SON, haut=0.85)
        self.au_mot("2 cinquièmes, 3")
        self.play(FadeIn(p2, shift=DOWN * 0.2), run_time=0.35)
        self.au_mot("3 cinquièmes :")
        self.play(FadeIn(p3, shift=DOWN * 0.2), run_time=0.35)
        h = self.rang([("On double le numérateur :", AMBRE, "On double")], 0, fs=36, haut=0.2)
        self.jouer_mots(h)
        r1 = self.rang([("2 × 2", WHITE, "2 fois 2"), ("= 4", WHITE, "4 : moins"), ("< 5", ORANGE_RETENUE, "5. Donc 2"),
                        ("donc", WHITE, "2 cinquièmes est"), (EcritureFraction(2, 5, fs=38, couleur=BLEU_CALCUL), WHITE,
                                                              None), ("< 1/2", ORANGE_RETENUE, ("1 demi. 2", 2))], 1, fs=40)
        self.jouer_mots(r1)
        r2 = self.rang([("2 × 3", WHITE, "2 fois 3"), ("= 6", WHITE, "6 : plus"), ("> 5", VERT_OK, "5. Donc 3"),
                        ("donc", WHITE, "3 cinquièmes est"), (EcritureFraction(3, 5, fs=38, couleur=VIOLET_SON), WHITE,
                                                              None), ("> 1/2", VERT_OK, None)], 2, fs=40)
        self.jouer_mots(r2)
        self.attendre_voix()

    # ── 08 : ranger sans calcul (2/5 < 3/4 < 5/3) ───────────────────────────
    def ecran_ranger(self):
        self.ecran("08-ranger")
        dr = self.droite(0, 2, 4)
        dm = self.marque_demi(dr)
        h = self.rang([("Ranger sans calcul", JAUNE_TITRE, "range sans calcul")], 0, fs=40, haut=0.2)
        self.play(FadeIn(dr), FadeIn(dm), run_time=0.5)
        self.jouer_mots(h)
        sons = self.rang([("Les sons :", WHITE, "trois sons"),
                          (EcritureFraction(5, 3, fs=38, couleur=VIOLET_SON), WHITE, "5 tiers, 3"), (";", WHITE, None),
                          (EcritureFraction(3, 4, fs=38, couleur=VIOLET_SON), WHITE, "3 quarts et"), (";", WHITE, None),
                          (EcritureFraction(2, 5, fs=38, couleur=VIOLET_SON), WHITE, "2 cinquièmes. 5")], 1, fs=40)
        self.jouer_mots(sons)
        zones = [(1, 2, VERT_OK, 5 / 3, (5, 3), "5 tiers dépasse"), (0.5, 1, BLEU_CALCUL, 0.75, (3, 4), "3 quarts est entre"),
                 (0, 0.5, ORANGE_RETENUE, 0.4, (2, 5), "2 cinquièmes est plus petit")]
        for a, b, c, v, fr_, mot in zones:
            z = Line(dr.p(a), dr.p(b), color=c, stroke_width=14).set_opacity(0.8)
            pt = self.pt(dr, v, fr_, couleur=VIOLET_SON, haut=0.85, fs=30, droite=v > 0.5)
            self.au_mot(mot)
            self.play(Create(z), FadeIn(pt, shift=DOWN * 0.2), run_time=0.5)
        ordre = self.rang([(EcritureFraction(2, 5, fs=38), WHITE, "2 cinquièmes, puis"), ("<", WHITE, "3 quarts, puis"),
                           (EcritureFraction(3, 4, fs=38), WHITE, None), ("<", WHITE, "5 tiers."),
                           (EcritureFraction(5, 3, fs=38), WHITE, None)], 2, fs=38)
        self.jouer_mots(ordre)
        self.play(Create(self.encadrer(ordre)), run_time=0.4)
        self.attendre_voix()

    # ── 09 : QUESTION 2 (4/9 < 1/2) ─────────────────────────────────────────
    def ecran_question2(self):
        loupe = self.debut_question()
        dr = Droite(0, 1, 9, etiquettes={0: "0", 1: "1"}, longueur=5.4, centre=P(-3.2, 0.4))
        dm = self.marque_demi(dr, dessous=True)
        p4 = self.pt(dr, 4 / 9, (4, 9), haut=1.0, fs=30, droite=False)
        sortir = lambda: [FadeOut(loupe, run_time=0.3), FadeIn(dr, run_time=0.3), FadeIn(dm, run_time=0.3)]  # noqa: E731
        self.question_b("09-question", "09b-reponse", ["Laquelle est plus", "petite que 1 demi ?"],
                        [bloc_fixe(self.inline("3/5")), bloc_fixe(self.inline("4/9")), bloc_fixe(self.inline("5/8"))], 1,
                        [[("2 × 4", WHITE, "2 fois 4", sortir), ("= 8", WHITE, "8 : moins"), ("< 9", ORANGE_RETENUE, "9. Donc")],
                         [("4/9", VERT_OK, "4 neuvièmes est", lambda: [FadeIn(p4, shift=DOWN * 0.2, run_time=0.3)]),
                          ("< 1/2", VERT_OK, "1 demi.")]],
                        mot_q="Laquelle")

    # ── 10 : défi (3/2 ; 5/4 ; 1 + 3/4) ─────────────────────────────────────
    def capsule(self, y):
        return RoundedRectangle(width=4.2, height=1.05, corner_radius=0.5, fill_color=VIOLET_SON, fill_opacity=0.25,
                                stroke_color=VIOLET_SON, stroke_width=4).move_to(P(-3.3, y))

    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.col(self.t("À toi de jouer !", 50, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.6)
        r = self.col(self.bloc(["Range dans", "l'ordre croissant :"], 40), 1.6)
        self.play(FadeIn(r, shift=RIGHT * 0.2), run_time=0.4)
        caps = [self.capsule(y) for y in (1.6, 0.2, -1.2)]
        specs = [[(EcritureFraction(3, 2, fs=38), WHITE, "3 demis")],
                 [(EcritureFraction(5, 4, fs=38), WHITE, "5 quarts")],
                 [("1 +", WHITE, "1 plus 3"), (EcritureFraction(3, 4, fs=38), WHITE, "3 quarts. Mets")]]
        for c, sp in zip(caps, specs):
            lg = self.ligne_mots(sp, fs=38).move_to(c)
            self.jouer_mots(lg, avec=[FadeIn(c, scale=0.9)])
        self.pause_defi(y=-0.2)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        dr = Droite(1, 2, 4, etiquettes={1: "1", 2: "2"}, longueur=10.0, centre=P(-0.6, 2.05))
        self.play(FadeIn(dr), run_time=0.5)
        self.au_mot("1 et 2")
        self.play(Indicate(VGroup(dr.etiquettes[1], dr.etiquettes[2]), color=AMBRE, scale_factor=1.5), run_time=0.6)
        pts = {v: self.pt(dr, v, fr_, haut=0.85, fs=30) for v, fr_ in ((1.25, (5, 4)), (1.5, (3, 2)), (1.75, (7, 4)))}
        r1 = self.rang([(EcritureFraction(5, 4, fs=38), WHITE, "5 quarts égale", lambda: [FadeIn(pts[1.25])]),
                        ("= 1 +", WHITE, "1 plus 1"), (EcritureFraction(1, 4, fs=38, couleur=VERT_OK), WHITE, "1 quart.")],
                       0, fs=40, haut=-0.05)
        self.jouer_mots(r1)
        r2 = self.rang([(EcritureFraction(3, 2, fs=38), WHITE, "3 demis égale", lambda: [FadeIn(pts[1.5])]),
                        ("= 1 +", WHITE, "1 plus 1 demi"), (EcritureFraction(1, 2, fs=38), WHITE, "1 demi, c'est"),
                        ("= 1 +", WHITE, None), (EcritureFraction(2, 4, fs=38, couleur=VERT_OK), WHITE, "2 quarts")],
                       0, fs=40, haut=-1.25)
        self.jouer_mots(r2)
        r3 = self.rang([("1 +", WHITE, "3 quarts. L'ordre", lambda: [FadeIn(pts[1.75])]),
                        (EcritureFraction(3, 4, fs=38, couleur=VERT_OK), WHITE, None)], 0, fs=40, haut=-0.05)
        r3.align_to(P(1.6, 0), LEFT)
        self.au_mot("Le dernier")
        self.play(Indicate(dr.ticks[3], color=VERT_OK, scale_factor=2), run_time=0.4)
        self.jouer_mots(r3)
        ordre = self.rang([(EcritureFraction(5, 4, fs=38), WHITE, "5 quarts, puis"), ("<", WHITE, "3 demis, puis"),
                           (EcritureFraction(3, 2, fs=38), WHITE, None), ("<", WHITE, "1 plus 3 quarts."),
                           ("1 +", WHITE, None), (EcritureFraction(3, 4, fs=38), WHITE, None)], 0, fs=38, haut=-2.45)
        self.jouer_mots(ordre)
        self.play(Create(self.encadrer(ordre)), run_time=0.4)
        self.attendre_voix()

    # ── 11 : la chaîne (3/4 = 0,75 = 75 % ; 7/4 = 1,75) ─────────────────────
    def ecran_chaine(self):
        self.ecran("11-chaine")
        kw = dict(mode="chargement", largeur=4.8, hauteur=0.6, fs=40, couleur=VIOLET_SON)
        b1 = Pourcentage(100, centre=P(-3.2, 1.1), **kw).vide()
        b2 = Pourcentage(75, centre=P(-3.2, -0.9), **kw).vide()
        for b, k in ((b1, 1), (b2, 2)):
            b.etiquette.set_opacity(0)
            b.nom = self.mor(f"mesure {k}", 30, VIOLET_SON).next_to(b.piste, UP, buff=0.12).align_to(b.piste, LEFT)
        self.play(*[FadeIn(VGroup(b.piste, b.nom)) for b in (b1, b2)], run_time=0.5)
        self.add(b1.plein, b2.plein)
        l1 = self.ligne_mots([(EcritureFraction(3, 4, fs=56), WHITE, "3 quarts égale"), ("= 0,75", BLEU_CALCUL, "0,75 :"),
                              ("= 75 %", VERT_OK, "75 %. Donc")], fs=38)
        self.col(l1, 1.6)
        self.jouer_mots(l1)
        l2 = self.ligne_mots([(EcritureFraction(7, 4, fs=56, couleur=VIOLET_SON), WHITE, "7 quarts égale"),
                              ("= 1,75", BLEU_CALCUL, "1,75 :")], fs=38)
        self.col(l2, -0.1)
        self.jouer_mots(l2)
        self.au_mot("une mesure entière")
        self.play(b1.remplir(0.9), run_time=0.9)
        self.au_mot("75 % de la")
        self.play(b2.remplir(1.0), b2.etiquette.animate.set_opacity(1), run_time=1.0)
        self.attendre_voix()

    # ── 12 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("12-finale", 0.65)
        dr = Droite(0, 2, 8, etiquettes={0: "0", 1: "1", 2: "2"}, longueur=5.2, fs=30)
        p = self.pt(dr, 1.75, (7, 4), couleur=VIOLET_SON, haut=0.8, fs=28)
        fig = VGroup(dr, p)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("On compare à 1 : numérateur", "plus grand, ça dépasse 1."),
                                                         ("Puis à 1/2 : on double", "le numérateur."),
                                                         ("On encadre entre", "deux entiers."),
                                                         ("7/4 = 1 + 3/4",)], fs=36)
        for k, mot in enumerate(["On compare", "Puis à", "On encadre"]):
            self.au_mot(mot)
            self.play(Create(lignes[k][0]), FadeIn(lignes[k][1][0], shift=RIGHT * 0.2), run_time=0.35)
            if len(lignes[k][1]) > 1:
                self.poser_lignes(VGroup(*lignes[k][1][1:]), "fade", 0.35)
        dern = lignes[3][1][0]
        fs = dern.font_size
        lg = self.ligne_mots([("7/4 =", WHITE, "quarts égale 1"), ("1 +", WHITE, "1 plus 3"), ("3/4", WHITE, "3 quarts.")],
                             fs=36, buff=0.15)
        lg.scale_to_fit_height(dern.height).move_to(dern, LEFT)
        self.jouer_mots(lg, avec=[Create(lignes[3][0])])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        dr, noms, p = self.ecran_droite()
        self.ecran_comparer_1(dr, noms, p)
        self.ecran_mixte(dr, noms, p)
        self.ecran_piege()
        self.ecran_question1()
        self.ecran_demi()
        self.ecran_ranger()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_chaine()
        self.ecran_finale()
        self.page_abonnement("13-abonne")


class FracMixte6e(FracMixteBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
