# frac_defi.py
# EleveAI — Maths 6e — série « Fractions », épisode 07 : DÉFIS SUR LES FRACTIONS
# (micro du coach : fraction_defi), AVEC VOIX. Paysage 16:9, CEINTURE ORANGE :
# des problèmes en PLUSIEURS ÉTAPES qui mêlent les micros de la notion (égalité,
# fraction d'une quantité, comparaison par le décimal, toute la chaîne
# simplifier → décimal → pourcentage) — un cran au-dessus de la verte (même
# choix que le défi de la série statistiques 6e). Short : frac_defi_short.py (jaune).
#
# Décor et métier : l'ESPACE ; Inaya, INGÉNIEURE SPATIALE, prépare un rover pour
# Mars : batterie 4/8 = 1/2 (défi 1), 1/4 de 24 panneaux solaires (question 1),
# trajet 2/8 = 1/4 (question 2), réservoirs 2/3 et 3/4 (question 3 + le décimal),
# oxygène 9/12 = 3/4 = 0,75 = 75 % (défi final, la chaîne entière).
# Aucune donnée du monde réel citée (rover imaginaire). Centres : espace, sciences.
#
# Micro → écrans (banque fractions.bank.ts) : moitié 4/8 (02, fixed_1 et
# tpl_moitie, regroupement fixed_6), 1/4 de 24 (03, fixed_4 « samoussas »),
# 2/8 = 1/4 (04, fixed_3), 2/3 et 3/4 (05-06, fixed_5 : par les décimaux),
# égalité + chaîne (07, tpl_2 / tpl_fraction_egale). Leurres : 4 (le
# dénominateur) et 20 (24 − 4) ; 1/7 (soustraire 1) et 2/4 (ne diviser qu'en bas).
# Écrans : 00 garde · 01 Inaya et le rover · 02 défi 1 (batterie) · 03 QUESTION 1
# (panneaux) · 04 QUESTION 2 (trajet) · 05 QUESTION 3 (réservoirs) · 06 les
# décimaux · 07 défi final (oxygène) · 07b correction · 08 ce que tu as appris · 09 fin.
#
# Voix : manim/voix/6e-frac-defi.json (débit −10), WAV dans public/sons/6e-frac-defi/ ;
# marques : frac_defi_marques.json (scripts/marques_dump.ps1 + scripts/cues2marques.py).
# Outils du lot : frac_lotb_commun.py.
# python -m manim render -qh --disable_caching manim/scripts/6e/frac_defi.py FracDefi6e -o eleveai-maths-6e-frac-defi --media_dir manim/scripts/6e/media-frac-defi
# Sortie : manim/sorties/6e/maths/fractions/07-defi/eleveai-maths-6e-frac-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotb_commun import *  # noqa: E402,F403

ROUILLE = "#c2410c"    # Mars
LIQUIDE = "#22d3ee"


def ingenieure(s=1.0):
    """Inaya : blouse blanche, badge de mission, tablette."""
    p = personnage(peau="#c68642", haut="#f8fafc", cheveux="#111827", longs=True, s=s)
    col = Polygon(P(-0.22, -0.45), P(0.22, -0.45), P(0, -0.85), fill_color="#1e3a8a", fill_opacity=1,
                  stroke_width=0)
    badge = VGroup(Circle(radius=0.14, fill_color="#1d4ed8", fill_opacity=1, stroke_width=0),
                   Star(n=5, outer_radius=0.09, fill_color=WHITE, fill_opacity=1, stroke_width=0)).move_to(P(0.33, -0.9))
    tablette = RoundedRectangle(width=0.55, height=0.75, corner_radius=0.06, fill_color="#334155", fill_opacity=1,
                                stroke_color="#94a3b8", stroke_width=3).move_to(P(-0.85, -1.2)).rotate(0.2)
    return VGroup(p, VGroup(col, badge, tablette).scale(s, about_point=ORIGIN))


def rover(s=1.0):
    """Un rover martien : caisse, mât et caméra, panneau solaire, 6 roues."""
    caisse = RoundedRectangle(width=2.2, height=0.6, corner_radius=0.1, fill_color="#e5e7eb", fill_opacity=1,
                              stroke_width=0)
    panneau = Rectangle(width=2.0, height=0.12, fill_color="#1d4ed8", fill_opacity=1, stroke_width=0).move_to(P(0, 0.38))
    mat = Line(P(0.75, 0.3), P(0.75, 1.05), color="#9ca3af", stroke_width=6)
    cam = RoundedRectangle(width=0.42, height=0.24, corner_radius=0.05, fill_color="#9ca3af", fill_opacity=1,
                           stroke_width=0).move_to(P(0.8, 1.12))
    oeil = Dot(P(0.95, 1.12), radius=0.05, color="#0ea5e9")
    roues = VGroup(*[Circle(radius=0.22, fill_color="#1f2937", fill_opacity=1, stroke_color="#6b7280",
                            stroke_width=4).move_to(P(x, -0.45)) for x in (-0.8, 0, 0.8)])
    return VGroup(panneau, caisse, mat, cam, oeil, roues).scale(s)


def reservoir(n=12, k=0, h=3.0, w=1.2, couleur=LIQUIDE):
    """Un réservoir vertical gradué en n ; .liquide (hauteur k/n) ; .niveau(k) : animation."""
    cuve = RoundedRectangle(width=w, height=h, corner_radius=0.18, stroke_color="#cbd5e1", stroke_width=5,
                            fill_color="#0b1220", fill_opacity=1)
    traits = VGroup(*[Line(P(-w / 2, -h / 2 + h * i / n), P(-w / 2 + 0.22, -h / 2 + h * i / n), color="#94a3b8",
                           stroke_width=3) for i in range(1, n)])
    liq = Rectangle(width=w - 0.14, height=max(0.001, h * k / n - 0.07), fill_color=couleur, fill_opacity=0.85,
                    stroke_width=0).move_to(P(0, -h / 2 + 0.07), DOWN)
    g = VGroup(cuve, liq, traits)
    g.liquide, g.h, g.n = liq, h, n

    def niveau(k2, run_time=1.0):
        bas = g[0].get_bottom() + UP * 0.07

        def maj(m, a):
            m.stretch_to_fit_height(max(0.001, (g.h * k2 / g.n - 0.07) * a))
            m.move_to(bas, DOWN)

        return UpdateFromAlphaFunc(liq, maj, run_time=run_time, rate_func=smooth)

    g.niveau = niveau
    return g


class FracDefiBase(PaysageB):
    nom_voix = "6e-frac-defi"
    fichier_marques = "frac_defi_marques.json"

    def sol_mars(self):
        return Rectangle(width=6.6, height=0.5, fill_color=ROUILLE, fill_opacity=0.55, stroke_width=0)

    def etiquette_defi(self, txt, y=3.0):
        return self.t(txt, 40, AMBRE).move_to(P(-3.3, y))

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défis sur les fractions", self.identite, self.ceinture)
        r = rover(1.1).move_to(P(-0.8, 0.3))
        sol = self.sol_mars().move_to(P(-0.8, -0.45))
        self.au_mot("Défis")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("mission sur Mars")
        self.play(FadeIn(sol), FadeIn(r, shift=RIGHT * 0.6), run_time=0.8)
        q = self.t("?", 90, AMBRE).next_to(r, RIGHT, buff=0.6)
        self.play(FadeIn(q, scale=0.4), run_time=0.4)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Inaya, ingénieure spatiale ─────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = ingenieure(1.15).move_to(P(-5.2, -0.4))
        self.au_mot("Voici Inaya")
        nom = self.col(self.t("Inaya", 44, BLEU_CALCUL), 2.9)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("ingénieure spatiale")
        met = self.col(self.t("ingénieure spatiale", 36, BLEU_CALCUL), 2.2)
        self.play(FadeIn(met, shift=UP * 0.2), run_time=0.4)
        self.au_mot("un rover")
        r = rover(0.95).move_to(P(-1.9, 0.2))
        sol = Rectangle(width=3.6, height=0.4, fill_color=ROUILLE, fill_opacity=0.55, stroke_width=0)
        sol.move_to(P(-1.9, -0.45))
        self.play(FadeIn(sol), FadeIn(r, shift=RIGHT * 0.4), run_time=0.6)
        self.au_mot("Mars")
        mars = Circle(radius=0.45, fill_color=ROUILLE, fill_opacity=1, stroke_width=0).move_to(P(-1.0, 2.4))
        self.play(GrowFromCenter(mars), run_time=0.4)
        self.au_mot("5 défis")
        cases = VGroup(*[Square(0.42, stroke_color=AMBRE, stroke_width=4) for _ in range(5)]).arrange(RIGHT, buff=0.22)
        lg = self.ligne_mots([("5", AMBRE, "5 défis"), ("défis :", WHITE, None)], fs=44)
        grp = VGroup(lg, cases).arrange(RIGHT, buff=0.35)
        self.col(grp, 0.6)
        self.jouer_mots(lg, avec=[LaggedStart(*[Create(c) for c in cases], lag_ratio=0.2, run_time=0.8)])
        self.au_mot("Relève-les")
        rel = self.col(self.t("Relève-les avec elle !", 40, VERT_OK), -0.6)
        self.play(FadeIn(rel, scale=0.8), run_time=0.4)
        self.attendre_voix()

    # ── 02 : défi 1, la batterie (4/8 = 1/2) ────────────────────────────────
    def ecran_batterie(self):
        self.ecran("02-batterie")
        tag = self.etiquette_defi("Défi 1 : la batterie")
        b = Barre(8, 0, largeur=5.2, hauteur=1.0, couleur=VERT_PART, centre=P(-3.4, 1.0))
        borne = RoundedRectangle(width=0.22, height=0.5, corner_radius=0.05, fill_color="#cbd5e1", fill_opacity=1,
                                 stroke_width=0).next_to(b.contour, RIGHT, buff=0.04)
        self.au_mot("Défi 1")
        self.play(Write(tag), run_time=0.5)
        f = EcritureFraction(4, 8, fs=72)
        g = EcritureFraction(1, 2, fs=72)
        eg = egalite(f, g, buff=1.0)
        self.col(eg, 1.35)
        haut, bas = fleches(f, g, "÷ 4", fs=40)
        self.au_mot("8 cases")
        self.play(b.apparaitre(0.8), FadeIn(borne), FadeIn(VGroup(f.trait, f.den), scale=1.3), run_time=0.8)
        self.au_mot("4 sont chargées")
        self.play(b.colorier(range(4), lag=0.12), FadeIn(f.num, scale=1.4), run_time=0.8)
        self.au_mot("la moitié ?")
        q = self.t("la moitié ?", 38, ORANGE_RETENUE).move_to(P(-3.4, -0.4))
        self.play(FadeIn(q, scale=0.8), run_time=0.35)
        self.au_mot("4 par 4")
        gr = b.groupes(4)
        self.play(LaggedStart(*[Create(r) for r in gr], lag_ratio=0.3), Create(haut[0]), FadeIn(haut[1]),
                  Create(bas[0]), FadeIn(bas[1]), run_time=0.8)
        b2, anim = b.regrouper(4, run_time=0.9)
        self.play(anim, FadeOut(gr), run_time=0.9)
        self.au_mot("1 demi")
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.3), run_time=0.4)
        self.au_mot("Oui")
        oui = self.col(self.t("Oui, c'est la moitié !", 40, VERT_OK), -1.55)
        self.play(FadeOut(q), FadeIn(oui, scale=1.2), Create(self.encadrer(eg)), run_time=0.5)
        self.attendre_voix()

    # ── 03 : QUESTION 1 (1/4 de 24 panneaux) ────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        gr = Grille(4, 6, 0, cote=0.75, couleur="#a16207", vide="#1d4ed8", centre=P(-3.3, 0.2))
        for c in gr.liste:
            c.set_stroke("#93c5fd", 3)
        tag = self.etiquette_defi("Défi 2 : les panneaux", y=3.05)

        def avant(sc):  # la grille (sans nombre écrit) entre pendant « Le rover a… »
            sc.play(FadeIn(tag), gr.apparaitre(0.8), run_time=0.8)

        def poussiere():
            return [gr.colorier(range(6), lag=0.08, run_time=0.6), Create(gr.entourer_lignes([0])[0], run_time=0.6)]

        self.question_b("03-question", "03b-reponse", ["24 panneaux, 1 quart", "couvert de poussière :", "combien à nettoyer ?"],
                        [bloc_fixe(self.inline("6")), bloc_fixe(self.inline("4")), bloc_fixe(self.inline("20"))], 0,
                        [[("24 ÷ 4", WHITE, "24 divisé"), ("= 6", VERT_OK, "6 :", poussiere)],
                         [("une rangée sur 4", VERT_OK, "4.")]],
                        avant_q=avant)

    # ── 04 : QUESTION 2 (2/8 = 1/4, le leurre 1/7) ──────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        tag = self.etiquette_defi("Défi 3 : le trajet", y=3.05)
        b = Barre(8, 2, largeur=5.4, hauteur=0.7, couleur=ORANGE_PART, centre=P(-3.3, 0.3))
        r = rover(0.32)
        r.next_to(P(b.x_trait(2), b.carte.get_top()[1]), UP, buff=0.02)
        etat = {}

        def avant(sc):
            sc.play(FadeIn(tag), b.apparaitre(0.8), FadeIn(r), run_time=0.8)

        def regroupe():
            b2, anim = b.regrouper(2, run_time=0.8)
            etat["b"] = b2
            return [anim]

        self.question_b("04-question", "04b-reponse", ["2 huitièmes du trajet :", "quelle fraction plus simple ?"],
                        [bloc_fixe(self.inline("1/4")), bloc_fixe(self.inline("1/7")), bloc_fixe(self.inline("2/4"))], 0,
                        [[("÷ 2 en haut ET en bas :", WHITE, "par 2"), ("2/8", VERT_OK, "2 huitièmes égale", regroupe),
                          ("= 1/4", VERT_OK, "1 quart.")],
                         [("1/7 :", ROUGE_ERREUR, "1 septième, c'est"), ("piège !", ROUGE_ERREUR, "piège")],
                         [("on a enlevé 1.", ROUGE_ERREUR, "1.")]],
                        fs_rep=30, avant_q=avant)

    # ── 05 : QUESTION 3 (2/3 ou 3/4 ?) ──────────────────────────────────────
    def deux_reservoirs(self):
        ra = reservoir(3, 0, h=3.2, w=1.3).move_to(P(-4.6, 0.0))
        rb = reservoir(4, 0, h=3.2, w=1.3).move_to(P(-2.0, 0.0))
        la = EcritureFraction(2, 3, fs=48).next_to(ra, DOWN, buff=0.2)
        lb = EcritureFraction(3, 4, fs=48).next_to(rb, DOWN, buff=0.2)
        return ra, rb, la, lb

    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        tag = self.etiquette_defi("Défi 4 : les réservoirs", y=3.05)
        ra, rb, la, lb = self.deux_reservoirs()

        def avant(sc):
            sc.au_mot("Deux réservoirs")
            sc.play(FadeIn(tag), FadeIn(ra), FadeIn(rb), run_time=0.6)
            sc.au_mot("2 tiers")
            sc.play(FadeIn(la, scale=1.3), run_time=0.3)
            sc.au_mot("3 quarts")
            sc.play(FadeIn(lb, scale=1.3), run_time=0.3)

        def remplir():
            return [ra.niveau(2, 0.9), rb.niveau(3, 0.9)]

        self.question_b("05-question", "05b-reponse", ["Lequel est", "le plus rempli ?"],
                        [bloc_fixe(self.inline("2/3")), bloc_fixe(self.inline("3/4")),
                         bloc_fixe(self.inline("ils sont pareils"))], 1,
                        [[("3/4", VERT_OK, ("3 quarts", 1), remplir)],
                         [("Vérifions !", AMBRE, "Vérifions")]],
                        avant_q=avant)
        return ra, rb, la, lb

    # ── 06 : les décimaux (2 ÷ 3 ≈ 0,67 ; 3 ÷ 4 = 0,75) ─────────────────────
    def ecran_decimaux(self, ra, rb, la, lb):
        self.ecran("06-decimaux")
        self.add(ra, rb, la, lb)
        l1 = self.ligne_mots([(EcritureFraction(2, 3, fs=56), WHITE, "2 tiers, c'est"), ("= 2 ÷ 3", WHITE, "2 divisé"),
                              ("≈ 0,67", BLEU_CALCUL, "0,67. 3")], fs=44, buff=0.22)
        self.col(l1, 2.3)
        nb = self.col(self.mor("(la division ne s'arrête pas)", 28, "#94a3b8"), 1.3)
        self.jouer_mots(self.serie((l1[0], l1.mots[0]), (l1[1], l1.mots[1]), (nb, "ne s'arrête pas"),
                                   (l1[2], l1.mots[2])))
        l2 = self.ligne_mots([(EcritureFraction(3, 4, fs=56), WHITE, "3 quarts, c'est"), ("= 3 ÷ 4", WHITE, "3 divisé"),
                              ("= 0,75", BLEU_CALCUL, "0,75. Et")], fs=44, buff=0.22)
        self.col(l2, 0.2)
        self.jouer_mots(l2)
        l3 = self.ligne_mots([("0,75 >", VERT_OK, "0,75 est"), ("0,67", WHITE, "0,67 :")], fs=48)
        self.col(l3, -1.1)
        self.jouer_mots(l3)
        self.au_mot("3 quarts est le plus")
        fin = self.col(self.mor("3/4 est le plus rempli !", 38, VERT_OK), -2.2)
        self.play(FadeIn(fin, scale=1.2), Indicate(rb, color=VERT_OK, scale_factor=1.05), run_time=0.5)
        self.attendre_voix()

    # ── 07 : défi final (9/12 = 75 % ?) ─────────────────────────────────────
    def ecran_defi(self):
        self.ecran("07-defi", 0.65)
        ro = reservoir(12, 0, h=4.2, w=1.6).move_to(P(-4.2, -0.1))
        o2 = self.mor("oxygène", 34, LIQUIDE).next_to(ro, UP, buff=0.15)
        self.au_mot("À toi de jouer")
        tit = self.col(self.t("À toi de jouer !", 50, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.6)
        self.au_mot("réservoir d'oxygène")
        self.play(FadeIn(ro), FadeIn(o2), run_time=0.5)
        l1 = self.ligne_mots([("rempli aux", WHITE, "rempli aux"),
                              (EcritureFraction(9, 12, fs=56, couleur=LIQUIDE), WHITE, "9 douzièmes",
                               lambda: [ro.niveau(9, 0.8)])], fs=40)
        self.col(l1, 1.75)
        self.jouer_mots(l1)
        l2 = self.ligne_mots([("Inaya :", BLEU_CALCUL, "Inaya dit"), ("« c'est", WHITE, "c'est 75"), ("75 % »", WHITE, "75 %")],
                             fs=40)
        self.col(l2, 0.6)
        self.jouer_mots(l2)
        self.au_mot("A-t-elle raison")
        q = self.col(self.t("A-t-elle raison ?", 40, ORANGE_RETENUE), -0.3)
        self.play(FadeIn(q, scale=0.8), run_time=0.4)
        l3 = self.ligne_mots([("simplifier", AMBRE, "Simplifie"), ("→ décimal", AMBRE, "décimal"),
                              ("→ pourcentage", AMBRE, "au pourcentage")], fs=34)
        self.col(l3, -1.2)
        self.jouer_mots(l3)
        self.pause_defi(y=-2.1)
        return ro

    def ecran_correction(self, ro):
        self.ecran("07b-correction", 0.65)
        ro.scale(0.8).move_to(P(-5.5, -0.1))
        pc = Pourcentage(75, mode="cases", cote=0.3, etiquette=False, centre=P(-2.45, -0.1)).vide()
        self.add(ro, pc)
        f, g = EcritureFraction(9, 12, fs=60), EcritureFraction(3, 4, fs=60)
        eg = egalite(f, g, buff=0.9)
        self.col(eg, 1.95)
        haut, bas = fleches(f, g, "÷ 3", fs=36, angle=TAU / 6)
        self.play(FadeIn(f, scale=1.2), run_time=0.4)
        self.au_mot("table de 3")
        self.play(Indicate(VGroup(f.num, f.den), color=AMBRE, scale_factor=1.3), run_time=0.5)
        self.au_mot("9 divisé")
        self.play(Create(haut[0]), FadeIn(haut[1]), run_time=0.45)
        self.au_mot("3. 12")
        self.play(FadeIn(eg[1]), FadeIn(g.num, scale=1.4), FadeIn(g.trait), run_time=0.35)
        self.au_mot("12 divisé")
        self.play(Create(bas[0]), FadeIn(bas[1]), run_time=0.45)
        self.au_mot("4. Donc")
        self.play(FadeIn(g.den, scale=1.4), run_time=0.35)
        self.au_mot("Donc 9")
        self.play(Create(self.encadrer(eg)), run_time=0.4)
        r2 = self.ligne_mots([("3 ÷ 4", WHITE, "3 divisé par 4"), ("= 0,75", BLEU_CALCUL, "0,75. Et")], fs=44)
        self.col(r2, -0.35)
        self.jouer_mots(r2)
        r3 = self.ligne_mots([("0,75", BLEU_CALCUL, "0,75, c'est"),
                              ("= 75 %", VERT_OK, "75 %. Inaya", lambda: [pc.remplir(1.2)])], fs=44)
        self.col(r3, -1.3)
        self.jouer_mots(r3)
        r4 = self.ligne_mots([("Inaya a raison :", VERT_OK, "Inaya a raison"),
                              ("toute la chaîne !", AMBRE, "toute la chaîne")], fs=30)
        r4.move_to(P(-2.9, -2.6))
        self.jouer_mots(r4)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.65)
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.3)
        fig = VGroup(Barre(8, 4, largeur=3.6, hauteur=0.55, couleur=VERT_PART, etiquette="frac", fs=30),
                     Pourcentage(75, mode="cases", cote=0.24, etiquette=False)).arrange(DOWN, buff=0.35)
        for i in range(75):
            fig[1].grille.liste[i].set_fill(BLEU_PART, 1)
        fig.move_to(P(-4.0, -0.4))
        self.add(fig)
        self.play(Write(tit), run_time=0.6)
        specs = [[("Fractions égales ?", WHITE, "deux fractions"), ("On simplifie.", WHITE, "on simplifie")],
                 [("1/4 de", WHITE, "1 quart"), ("24", WHITE, "24, c'est"), ("= 24 ÷", WHITE, "24 divisé"),
                  ("4", WHITE, "4. Pour")],
                 [("Comparer :", WHITE, "Pour comparer"), ("passer au décimal.", WHITE, "passer au décimal")],
                 [("fraction", AMBRE, "fraction,"), ("→ décimal", AMBRE, "décimal, pourcentage"),
                  ("→ pourcentage", AMBRE, "pourcentage.")]]
        for k, sp in enumerate(specs):
            lg = self.ligne_mots(sp, fs=36, buff=0.16)
            ch = self.coche().next_to(lg, LEFT, buff=0.25)
            ligne = VGroup(ch, lg)
            self.col(ligne, 2.0 - k * 1.05, xl=-0.9)
            lg.extras[0] = (lambda c=ch: [Create(c)])
            self.jouer_mots(lg)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_batterie()
        self.ecran_question1()
        self.ecran_question2()
        ra, rb, la, lb = self.ecran_question3()
        self.ecran_decimaux(ra, rb, la, lb)
        ro = self.ecran_defi()
        self.ecran_correction(ro)
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class FracDefi6e(FracDefiBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "orange"
