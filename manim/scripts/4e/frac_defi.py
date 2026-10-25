# frac_defi.py
# EleveAI — Maths 4e — série « Fractions », épisode 12 : DÉFIS SUR LES FRACTIONS
# (micro du coach : fraction_defi, notion fraction_calcul), AVEC VOIX.
# Paysage 16:9, CEINTURE ORANGE (même choix que le défi 6e et le défi de la
# série statistiques) : des problèmes en PLUSIEURS ÉTAPES qui font passer
# TOUTE la chaîne des erreurs de Frédéric : SIMPLIFIER → DÉCIMAL → POURCENTAGE,
# puis le reste (1 − 3/4), la fraction d'une fraction (2/3 de 3/4) et le piège
# des dénominateurs additionnés.
# Short jumeau : frac_defi_short.py (le post qui buzze, jaune).
#
# Décor et métier : la SANTÉ ; Amina, INFIRMIÈRE SCOLAIRE, enquête sur le
# sommeil d'une classe de 4e : 18 élèves sur 24 dorment moins de 9 h →
# 18/24 = 3/4 = 0,75 = 75 %. Défi : 210 élèves sur 600 se couchent après 22 h →
# 21/60 → 7/20 = 0,35 = 35 %. Enquête inventée (aucune donnée réelle citée).
# Centres d'intérêt : corps-sante, sciences.
# Vérifié (Python) : 18/24 = 3/4 (÷ 6) ; 12/18 = 2/3 ≠ 3/4 ; 16/20 = 4/5 ;
# 3 ÷ 4 = 0,75 ; 0,08 = 8 % ; 1 − 3/4 = 1/4 = 25 % ; 2/3 × 3/4 = 6/12 = 1/2 ;
# 1/2 de 24 = 12 ; 1/4 + 1/2 = 3/4 ; 210/600 = 21/60 = 7/20 = 0,35 = 35 %.
#
# Micro → écrans (banque 4e/maths/fractions.bank.ts) : la chaîne (02, 04, 05,
# 09), tpl_4 genDefiReste « 1 − a/b » et « fraction d'une fraction » (07,
# fixed_4 « 1/2 de 2/3 »), fixed_1 et open_1 « 1/2 + 1/3 = 2/5 ? » (QUESTION 3),
# fixed_3 « comparer par le décimal » (04). Leurres de SES copies : soustraire
# (18/24 → 12/18 ; 16/20 → 12/16), un seul terme (4/20), 3/4 = 3,4, 0,75 %.
# Écrans : 00 garde · 01 Amina et l'enquête · 02 simplifier · 03 QUESTION 1 ·
# 04 le décimal · 05 le pourcentage · 06 QUESTION 2 · 07 le reste et 2/3 de 3/4 ·
# 08 QUESTION 3 · 09 défi · 09b correction · 10 ce que tu as appris · 11 fin.
#
# ⭐ Bases : 4e/frac_lotf_commun.py (PaysageF) ; canvas_fractions.py (non modifié).
# Voix : manim/voix/4e-frac-defi.json (débit −10), WAV dans public/sons/4e-frac-defi/ ;
# marques : 4e/frac_defi_marques.json (scripts/marques_dump.ps1 + scripts/cues2marques.py).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/frac_defi.py FracDefi4e
# python -m manim render -qh --disable_caching manim/scripts/4e/frac_defi.py FracDefi4e -o eleveai-maths-4e-frac-defi --media_dir manim/scripts/4e/media-frac-defi
# Sortie : manim/sorties/4e/maths/fractions/12-defi/eleveai-maths-4e-frac-defi.mp4

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotf_commun import *  # noqa: E402,F403

LUNE = "#c4b5fd"
ECRAN_V = "#a78bfa"
KW = dict(largeur=5.4, hauteur=0.6)


def infirmiere(s=1.0):
    """Amina : blouse blanche, croix verte, stéthoscope."""
    p = personnage(peau="#5c3a1e", haut="#f8fafc", cheveux="#111827", longs=True, s=s)
    croix_v = VGroup(Rectangle(width=0.26, height=0.08, fill_color="#16a34a", fill_opacity=1, stroke_width=0),
                     Rectangle(width=0.08, height=0.26, fill_color="#16a34a", fill_opacity=1, stroke_width=0)) \
        .move_to(P(0.3, -0.85))
    steth = VGroup(Arc(radius=0.3, start_angle=PI, angle=PI, color="#334155", stroke_width=5).move_to(P(0, -0.75)),
                   Dot(P(-0.05, -1.05), radius=0.07, color="#94a3b8"))
    return VGroup(p, VGroup(croix_v, steth).scale(s, about_point=ORIGIN))


def eleves(n=24, pris=18, cols=6, r=0.17, pas=0.48):
    """La classe : n petits ronds (des têtes), les `pris` premiers en violet (peu de sommeil)."""
    g = VGroup()
    for i in range(n):
        c = LUNE if i < pris else "#e2e8f0"
        g.add(VGroup(Circle(radius=r, fill_color=c, fill_opacity=1, stroke_width=0),
                     RoundedRectangle(width=2.2 * r, height=1.3 * r, corner_radius=0.08, fill_color=c, fill_opacity=0.7,
                                      stroke_width=0).shift(DOWN * 1.35 * r))
                 .move_to(P((i % cols) * pas, -(i // cols) * pas * 1.25)))
    return g


class FracDefiBase(PaysageF):
    nom_voix = "4e-frac-defi"
    fichier_marques = "frac_defi_marques.json"

    def L(self, specs, y, fs=40, x=None, buff=0.18):
        g = self.ligne_mots(specs, fs=fs, buff=buff)
        self.col(g, y)
        if x is not None:
            g.set_x(x)
        self.jouer_mots(g)
        return g

    def F(self, a, b, fs=48, c=WHITE):
        return EcritureFraction(a, b, fs=fs, couleur=c)

    def au_nb(self, extrait, n=1):
        i = -1
        for _ in range(n):
            i = self._texte_voix.find(extrait, i + 1)
        k = [m.start() for m in re.finditer(r"\d+(?:,\d+)?", extrait)]
        self._attendre_pos(i + (k[-1] if k else 0))

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défis sur les fractions", self.identite, self.ceinture, y_ech=-2.7)
        cl = eleves().scale(0.9).move_to(P(-1.6, 0.0))
        self.au_mot("Défis")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.play(LaggedStart(*[FadeIn(e, scale=0.5) for e in cl], lag_ratio=0.03), run_time=0.8)
        self.au_mot("une enquête")
        q = self.t("?", 90, AMBRE).next_to(cl, RIGHT, buff=0.8)
        self.play(FadeIn(q, scale=0.4), run_time=0.4)
        self.insister(q, 1.25, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Amina et l'enquête ─────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = infirmiere(1.05).move_to(P(-5.5, -1.0))
        self.au_mot("Voici Amina")
        nom = self.col(self.t("Amina", 44, BLEU_CALCUL), 2.95)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("infirmière scolaire")
        met = self.col(self.t("infirmière scolaire", 32, BLEU_CALCUL), 2.35)
        self.play(FadeIn(met, shift=UP * 0.2), run_time=0.4)
        cl = eleves(pris=0).move_to(P(-2.3, 0.6))
        self.au_mot("le sommeil")
        lune = VGroup(Circle(radius=0.32, fill_color="#fde68a", fill_opacity=1, stroke_width=0),
                      Circle(radius=0.28, fill_color=BLACK, fill_opacity=1, stroke_width=0).shift(RIGHT * 0.15 + UP * 0.08)) \
            .move_to(P(-4.6, 2.9))
        self.play(FadeIn(lune), run_time=0.4)
        self.L([("Classe :", WHITE, None), ("24 élèves", WHITE, "24 élèves",
                                           lambda: [LaggedStart(*[FadeIn(e, scale=0.5) for e in cl], lag_ratio=0.02,
                                                                run_time=0.6)])], 1.45, fs=36)
        self.L([("18", LUNE, "18 dorment", lambda: [LaggedStart(*[cl[i][k].animate.set_fill(LUNE) for i in range(18)
                                                                 for k in range(2)], lag_ratio=0.01, run_time=0.6)]),
                ("dorment moins de", WHITE, None), ("9 h", LUNE, "9 heures")], 0.6, fs=36)
        self.au_mot("un pourcentage")
        lp = self.col(self.ligne([("→ un", WHITE), ("pourcentage", ORANGE_RETENUE), ("?", ORANGE_RETENUE)], 38), -0.35)
        self.play(FadeIn(lp, scale=0.8), run_time=0.4)
        self.L([("simplifier", AMBRE, "simplifier,"), ("→ décimal", AMBRE, "passer au décimal"),
                ("→ pourcentage", AMBRE, "puis au pourcentage")], -1.45, fs=32)
        self.attendre_voix()

    # ── 02 : étape 1 : simplifier (et le piège « enlever 6 ») ───────────────
    def ecran_simplifier(self):
        self.ecran("02-simplifier")
        self.au_mot("Étape 1")
        tit = self.col(self.t("Étape 1 : simplifier", 40, JAUNE_TITRE), 3.1)
        b1 = Barre(24, 18, centre=P(-3.4, 1.7), **KW)
        self.play(Write(tit), b1.apparaitre(0.8), run_time=0.8)
        f = self.F(18, 24, 52)
        g = self.F(12, 18, 52, ROUGE_ERREUR)
        eg = egalite(f, g, signe="≠", buff=1.0)
        self.col(eg, 1.6)
        haut, bas = fleches(f, g, "− 6", couleur=ROUGE_ERREUR, fs=32)
        self.au_mot("18 sur 24")
        self.play(FadeIn(f, scale=1.2), run_time=0.35)
        self.au_nb("enlever 6")
        self.play(Create(haut[0]), FadeIn(haut[1]), Create(bas[0]), FadeIn(bas[1]), run_time=0.5)
        b2 = Barre(18, 12, centre=P(-3.4, 0.35), couleur=ROUGE_COACH, **KW)
        self.au_mot("12 sur 18")
        self.play(FadeIn(g, scale=1.2), b2.apparaitre(0.6), run_time=0.6)
        self.au_mot("pas la même part")
        t1, t2 = b1.fin_coloriee(vers=-1.6), b2.fin_coloriee(vers=-0.3, couleur=ROUGE_ERREUR)
        self.play(Create(t1), Create(t2), FadeIn(eg[1], scale=1.4), run_time=0.6)
        pm = self.col(self.t("pas la même part !", 34, ROUGE_ERREUR), 0.25)
        self.play(FadeIn(pm, shift=UP * 0.15), run_time=0.35)
        self.au_mot("On divise par le même")
        self.play(FadeOut(VGroup(b2, t2, g, eg[1], haut, bas, pm)), run_time=0.4)
        self.L([("18 et", WHITE, "18 et 24"), ("24 :", WHITE, "24 sont"), ("table de 6", AMBRE, "6. 18")], 0.2, fs=36)
        self.L([("18 ÷", WHITE, "18 divisé"), ("6", WHITE, "6, égale 3"), ("= 3", VERT_OK, "3. 24")], -0.75, fs=38)
        self.L([("24 ÷", WHITE, "24 divisé"), ("6", WHITE, "6, égale 4"), ("= 4", VERT_OK, "4. 18")], -1.6, fs=38)
        b4, anim = b1.regrouper(6, run_time=1.0)
        lg = self.ligne_mots([(self.F(18, 24, 50), WHITE, ("18 sur 24 égale", 1), lambda: [anim]), ("=", WHITE, None),
                              (self.F(3, 4, 50, VERT_OK), WHITE, "3 quarts")], fs=44)
        self.col(lg, -2.65)
        self.jouer_mots(lg)
        self.play(Create(self.encadrer(lg, buff=0.12)), run_time=0.3)
        self.attendre_voix()

    # ── 03 : QUESTION 1 (simplifier 16/20) ──────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b = Barre(20, 16, centre=P(-3.4, 0.3), largeur=5.2, hauteur=0.6)
        self.add(b)
        etat = {}

        def regroupe():
            nb, anim = b.regrouper(4, run_time=0.8)
            etat["b"] = nb
            return [anim]

        f1620 = self.F(16, 20, 54).next_to(b, UP, buff=0.4)

        def montrer(sc):
            sc.au_mot("16 sur 20")
            sc.play(FadeIn(f1620, scale=1.2), run_time=0.3)

        self.question_b("03-question", "03b-reponse", ["Simplifie la fraction."],
                        [bloc_fixe(self.inline("12/16")), bloc_fixe(self.inline("4/5")), bloc_fixe(self.inline("4/20"))], 1,
                        [[("16 ÷", WHITE, "16 divisé", regroupe), ("4", WHITE, "4, égale 4"), ("= 4", VERT_OK, "4. 20")],
                         [("20 ÷", WHITE, "20 divisé"), ("4", WHITE, "4, égale 5"), ("= 5", VERT_OK, "5. Enlever")],
                         [("pièges : − ", ROUGE_ERREUR, "Enlever"), ("4", ROUGE_ERREUR, "4, ou"),
                          ("ou un seul terme", ROUGE_ERREUR, "ne diviser")]],
                        mot_q="Simplifie", avant_q=montrer)

    # ── 04 : étape 2 : le décimal ───────────────────────────────────────────
    def ecran_decimal(self):
        self.ecran("04-decimal")
        self.au_mot("Étape 2")
        tit = self.col(self.t("Étape 2 : le décimal", 40, JAUNE_TITRE), 3.1)
        self.play(Write(tit), run_time=0.5)
        self.L([(self.F(3, 4, 56), WHITE, ("3 quarts, c'est", 1)), ("= 3 ÷", WHITE, ("3 divisé", 1)),
                ("4", WHITE, "4. On")], 1.9, fs=46)
        dv = pas_audit(Division(3, 4, decimales=2, mode="pose", fs=60).move_to(P(-3.5, 0.6)))  # redit le calcul
        self.au_mot("On pose")
        self.play(FadeIn(dv.etapes[0]), run_time=0.5)
        self.L([(self.F(3, 4, 56), WHITE, ("3 divisé", 2)),
                ("= 0,75", VERT_OK, "0,75. Attention",
                 lambda: [LaggedStart(*[FadeIn(e) for e in dv.etapes[1:]], lag_ratio=0.3, run_time=0.8)])], 0.35, fs=46)
        self.au_mot("Attention")
        lp = self.ligne_mots([(self.F(3, 4, 56), WHITE, ("3 quarts, ce", 1)), ("≠ 3,4", ROUGE_ERREUR, "3,4")], fs=46)
        self.col(lp, -1.45)
        self.jouer_mots(lp)
        self.play(Create(croix(lp[1], sw=6)), run_time=0.4)
        self.attendre_voix()

    # ── 05 : étape 3 : le pourcentage ───────────────────────────────────────
    def ecran_pourcentage(self):
        self.ecran("05-pourcentage")
        self.au_mot("Étape 3")
        tit = self.col(self.t("Étape 3 : le pourcentage", 40, JAUNE_TITRE), 3.1)
        self.play(Write(tit), run_time=0.5)
        pc = Pourcentage(75, mode="cases", cote=0.42, etiquette=False).vide().move_to(P(-3.5, 0.0))
        self.play(FadeIn(pc), run_time=0.4)
        self.L([("0,75 =", WHITE, ("0,75, c'est", 1)), (self.F(75, 100, 52), WHITE, "75 centièmes")], 1.9, fs=46)
        self.L([("75 cases sur", BLEU_CALCUL, ("75 cases", 1), lambda: [pc.remplir(0.7)]), ("100", BLEU_CALCUL, "100. Donc")], 0.8, fs=38)
        self.L([("= 75 %", VERT_OK, "75 %. Et")], -0.2, fs=56)
        self.L([("0,75 %", ROUGE_ERREUR, "0,75 % :"), (": même pas", ROUGE_ERREUR, "même pas"),
                ("1 case !", ROUGE_ERREUR, "1 case")], -1.4, fs=38)
        self.play(Indicate(pc.grille.liste[0], color=ROUGE_ERREUR, scale_factor=1.8), run_time=0.6)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (0,08 en pourcentage) ───────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        pc = Pourcentage(8, mode="cases", cote=0.42, etiquette=False).vide().move_to(P(-3.5, 0.0))
        self.add(pc)

        self.question_b("06-question", "06b-reponse", ["0,08,", "en pourcentage,", "c'est combien ?"],
                        [bloc_fixe(self.inline("80 %")), bloc_fixe(self.inline("8 %")), bloc_fixe(self.inline("0,08 %"))], 1,
                        [[("0,08 =", WHITE, ("0,08, c'est", 1)), (self.F(8, 100, 40), WHITE, "8 centièmes",
                                                                 lambda: [pc.remplir(0.8)]),
                          ("= 8 %", VERT_OK, "8 %.")]],
                        mot_q="0,08")

    # ── 07 : le reste (1 − 3/4) et 2/3 de 3/4 ───────────────────────────────
    def ecran_reste(self):
        self.ecran("07-reste")
        b = Barre(4, 3, centre=P(-3.5, 2.0), largeur=5.0, hauteur=0.7, couleur=LUNE)
        self.au_mot("Amina va plus loin")
        self.play(b.apparaitre(0.7), run_time=0.7)
        self.L([("1 −", WHITE, "1 moins"), (self.F(3, 4, 46), WHITE, ("3 quarts, égale", 1)), ("=", WHITE, None),
                (self.F(1, 4, 46, AMBRE), WHITE, "1 quart", lambda: [Indicate(b.parts[3], color=AMBRE, run_time=0.4)]),
                ("= 25 %", VERT_OK, "25 %")], 2.3, fs=40)
        self.au_mot("2 tiers ont")
        ecr = self.mor("écran", 30, ECRAN_V).next_to(b.carte, DOWN, buff=0.15).align_to(b.carte, LEFT)
        self.play(b.parts[0].animate.set_fill(ECRAN_V), b.parts[1].animate.set_fill(ECRAN_V), FadeIn(ecr), run_time=0.5)
        self.L([(self.F(2, 3, 46, ECRAN_V), WHITE, "2 tiers de"), ("de", WHITE, None),
                (self.F(3, 4, 46, LUNE), WHITE, "3 quarts : 2")], 1.05, fs=40)
        self.L([(self.F(2, 3, 46), WHITE, "2 tiers fois"), ("×", WHITE, None),
                (self.F(3, 4, 46), WHITE, ("3 quarts, égale 6", 1)), ("=", WHITE, None),
                (self.F(6, 12, 46), WHITE, "6 douzièmes"), ("=", WHITE, None),
                (self.F(1, 2, 46, VERT_OK), WHITE, "1 demi",
                 lambda: [GrowFromCenter(Brace(VGroup(b.parts[0], b.parts[1]), UP, color=VERT_OK), run_time=0.4)])],
               -0.25, fs=40, buff=0.14)
        cl = eleves(24, 0, cols=8, r=0.13, pas=0.38).move_to(P(-3.5, -1.3))
        self.add(cl)
        cl.set_opacity(0.0)
        self.L([("50 %", VERT_OK, "50 %", lambda: [cl.animate.set_opacity(1)]),
                ("soit", WHITE, None),
                ("12 élèves", VERT_OK, "12 élèves",
                 lambda: [AnimationGroup(*[cl[i][k].animate.set_fill(ECRAN_V) for i in range(12) for k in range(2)])])],
               -1.55, fs=42)
        self.attendre_voix()

    # ── 08 : QUESTION 3 (1/4 + 1/2) ─────────────────────────────────────────
    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        b = Barre(4, 0, centre=P(-3.4, 0.3), largeur=5.0, hauteur=0.7)
        self.add(b)

        self.question_b("08-question", "08b-reponse", ["Un élève écrit :", "1/4 + 1/2 = 2/6.", "La bonne somme ?"],
                        [bloc_fixe(self.inline("2/6")), bloc_fixe(self.inline("3/4")), bloc_fixe(self.inline("2/4"))], 1,
                        [[("1/2", WHITE, ("1 demi, c'est", 1), lambda: [b.colorier([1, 2], couleur=BLEU_PART)]),
                          ("= 2/4", WHITE, "2 quarts. 1")],
                         [("1/4", AMBRE, "1 quart plus 2", lambda: [b.colorier([0], couleur=AMBRE)]),
                          ("+ 2/4", WHITE, "2 quarts, égale"), ("= 3/4", VERT_OK, "3 quarts. On")],
                         [("on n'additionne jamais", ROUGE_ERREUR, "On n'additionne"),
                          ("les dénominateurs !", ROUGE_ERREUR, "les dénominateurs")]],
                        mot_q="Un élève")

    # ── 09 : défi (210 sur 600) ─────────────────────────────────────────────
    def college(self):
        bat = Rectangle(width=3.6, height=2.2, fill_color="#475569", fill_opacity=1, stroke_width=0)
        toit = Polygon(P(-2.0, 1.1), P(2.0, 1.1), P(0, 2.0), fill_color="#7f1d1d", fill_opacity=1, stroke_width=0)
        fen = VGroup(*[Rectangle(width=0.45, height=0.4, fill_color="#fde68a" if (i + j) % 3 else "#1e293b",
                                 fill_opacity=1, stroke_width=0).move_to(P(-1.2 + 0.8 * i, 0.55 - 0.65 * j))
                       for i in range(4) for j in range(3)])
        lune = VGroup(Circle(radius=0.35, fill_color="#fde68a", fill_opacity=1, stroke_width=0),
                      Circle(radius=0.3, fill_color=BLACK, fill_opacity=1, stroke_width=0).shift(RIGHT * 0.16 + UP * 0.08)) \
            .move_to(P(1.6, 2.6))
        return VGroup(bat, toit, fen, lune)

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        self.titre("À toi de jouer !", fs=50, y=3.05, centre=True)
        co = self.college().move_to(P(-3.5, 0.1))
        self.au_mot("Dans tout le collège")
        self.play(FadeIn(co, shift=UP * 0.2), run_time=0.6)
        self.L([("210", LUNE, "210 élèves"), ("élèves sur", WHITE, None), ("600", WHITE, "600 se")], 1.8, fs=40)
        self.L([("couchés après", WHITE, None), ("22 h", LUNE, "22 heures")], 0.9, fs=40)
        self.au_mot("la fraction simplifiée")
        q1 = self.col(self.ligne([("→ fraction", WHITE), ("simplifiée ?", ORANGE_RETENUE)], 38), -0.1)
        self.play(FadeIn(q1, shift=RIGHT * 0.15), run_time=0.4)
        self.au_mot("puis le pourcentage")
        q2 = self.col(self.ligne([("→", WHITE), ("pourcentage ?", ORANGE_RETENUE)], 38), -0.9)
        self.play(FadeIn(q2, shift=RIGHT * 0.15), run_time=0.4)
        self.pause_defi(y=-2.0)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.05))
        self.play(Write(tit), run_time=0.5)
        f1 = self.F(210, 600, 60)
        f2 = self.F(21, 60, 60)
        f3 = self.F(7, 20, 60, VERT_OK)
        VGroup(f1, f2, f3).arrange(RIGHT, buff=2.4).move_to(P(-0.6, 0.45))
        h1, b1 = fleches(f1, f2, "÷ 10", fs=34)
        h2, b2 = fleches(f2, f3, "÷ 3", fs=34)
        self.au_mot("210 sur 600")
        self.play(FadeIn(f1, scale=1.2), run_time=0.4)
        self.au_nb("par 10")
        self.play(Create(h1[0]), FadeIn(h1[1]), Create(b1[0]), FadeIn(b1[1]), run_time=0.5)
        self.au_mot("21 sur 60")
        self.play(FadeIn(f2, scale=1.2), run_time=0.4)
        self.au_nb("par 3")
        self.play(Create(h2[0]), FadeIn(h2[1]), Create(b2[0]), FadeIn(b2[1]), run_time=0.5)
        self.au_mot("7 vingtièmes")
        self.play(FadeIn(f3, scale=1.3), run_time=0.4)
        self.play(Create(self.encadrer(f3, buff=0.12)), run_time=0.3)
        l2 = self.ligne_mots([("7 ÷", WHITE, "7 divisé"), ("20", WHITE, "20, égale"),
                              ("= 0,35", BLEU_CALCUL, ("0,35.", 1)), ("= 35 %", VERT_OK, "35 %")], fs=48)
        l2.move_to(P(-0.6, -2.0))
        self.jouer_mots(l2)
        self.insister(l2[3], 1.2, 0.25)
        self.au_mot("Toute la chaîne")
        l5 = self.ligne_mots([("Toute la chaîne, sans erreur !", AMBRE, None)], fs=40)
        l5.move_to(P(-0.6, -2.85))
        self.play(FadeIn(l5, shift=UP * 0.15), run_time=0.4)
        self.play(Create(self.encadrer(l5, AMBRE, buff=0.15)), run_time=0.4)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        b = Barre(4, 3, largeur=2.6, hauteur=0.5, etiquette="frac", fs=30, centre=P(-4.7, -0.3))
        fig = VGroup(b)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("Simplifier : on divise en haut", "et en bas par le même nombre."),
                                                         ("Une fraction, c'est une division :", "3/4 = 0,75."),
                                                         ("Et 0,75, c'est", "75 %."),
                                                         ("Simplifier → décimal", "→ pourcentage : la chaîne !")],
                                     fs=34)
        mots = [("Pour simplifier", "par le même"), ("Une fraction", None), ("0,75, c'est", None),
                ("Simplifier, décimal", "pourcentage : la")]
        for lg, (m1, m2) in zip(lignes, mots):
            for t in lg[1]:
                t.sans_synchro = True
            self.au_mot(m1)
            self.play(Create(lg[0]), FadeIn(lg[1][0], shift=RIGHT * 0.2), run_time=0.35)
            if m2:
                self.au_mot(m2)
                self.play(FadeIn(lg[1][1], shift=RIGHT * 0.2), run_time=0.35)
            else:  # la ligne de nombres : chaque nombre à son mot
                old = lg[1][1]
                if old.original_text.startswith("3/4"):
                    specs = [("3/4", WHITE, "3 quarts égale"), ("= 0,75.", WHITE, ("0,75.", 1))]
                else:
                    specs = [("75 %.", WHITE, "75 %.")]
                nv = self.ligne_mots(specs, fs=old.font_size, buff=0.12)
                nv.align_to(old, LEFT).set_y(old.get_y())
                self.jouer_mots(nv)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_simplifier()
        self.ecran_question1()
        self.ecran_decimal()
        self.ecran_pourcentage()
        self.ecran_question2()
        self.ecran_reste()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class FracDefi4e(FracDefiBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "orange"
