# frac_simplifier.py
# EleveAI — Maths 5e — série « Fractions », épisode 02 : SIMPLIFIER UNE FRACTION
# (micro du coach : fraction_simplifier), AVEC VOIX. Paysage 16:9, CEINTURE
# VERTE : la paysage complète du niveau 5e (diviser haut ET bas par le même
# nombre, critères de divisibilité par 2, 5, 3 — prérequis div_critere_3_9 —,
# fraction irréductible, pas à pas ou en une seule étape, pièges, défi corrigé
# qui finit par la chaîne simplifier → décimal → pourcentage), repère de REGLES.md.
# Short jumeau : frac_simplifier_short.py (blanche, la tablette de chocolat).
# ⭐ C'est LA PREMIÈRE erreur des élèves de Frédéric sur les copies. Leurres
# tirés de ses copies : SOUSTRAIRE (6/8 → 4/6 ; 60/90 → 30/60), ne diviser
# qu'UN terme (6/8 → 3/8 ; 60/90 → 6/90), s'arrêter trop tôt (12/18 → 6/9).
#
# Décor et métier : la PISCINE ; Samir, ENTRAÎNEUR DE NATATION : séance de
# 90 min dont 60 min de crawl → 60/90 = 6/9 (paquets de 10 min) = 2/3.
# Défi : échauffement de 15 min sur 60 → 1/4 = 0,25 = 25 %.
# Chiffres inventés (aucune donnée du monde réel citée). Centres : sport.
# Vérifié (Python) : pgcd(60, 90) = 30 ; 42/75 = 14/25 (÷ 3) ; 6/8 = 3/4 ;
# 7/10 irréductible ; pgcd(12, 18) = 6 ; 15/60 = 3/12 = 1/4 ; 1 ÷ 4 = 0,25.
#
# Micro → écrans (banque 5e/maths/fractions.bank.ts) : diviser haut ET bas
# (02, 03 ; QUESTION 1 = fixed_1 « Simplifie 6/8 »), irréductible (03 ;
# QUESTION 2), critères (04), une seule étape (08 ; QUESTION 3 =
# genSimplifierDiviseur), pièges (06), défi (10).
# Écrans : 00 garde · 01 Samir · 02 paquets de 10 · 03 encore ÷ 3 → irréductible ·
# 04 critères · 05 QUESTION 1 · 06 pièges · 07 QUESTION 2 · 08 une seule étape ·
# 09 QUESTION 3 · 10 défi · 10b correction · 11 ce que tu as appris · 12 fin.
#
# ⭐ Bases : 5e/frac_lotg_commun.py (PaysageG ← 4e/frac_lotd_commun.py) ;
# figures canvas_fractions.py (non modifié). Ajouté ici : entraineur(), piscine().
# Voix : manim/voix/5e-frac-simplifier.json (débit −10), WAV dans
# public/sons/5e-frac-simplifier/ ; marques : 5e/frac_simplifier_marques.json
# (scripts/marques_dump.ps1 + scripts/cues2marques.py).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/5e/frac_simplifier.py FracSimplifier5e
# python -m manim render -qh --disable_caching manim/scripts/5e/frac_simplifier.py FracSimplifier5e -o eleveai-maths-5e-frac-simplifier --media_dir manim/scripts/5e/media-frac-simplifier
# Sortie : manim/sorties/5e/maths/fractions/02-simplifier/eleveai-maths-5e-frac-simplifier.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotg_commun import *  # noqa: E402,F403

CRAWL = BLEU_PART
EAU = "#0ea5e9"
POLO = "#1e3a8a"


def entraineur(s=1.0):
    """Samir : polo bleu marine, sifflet au cou, chrono à la main."""
    p = personne(peau=PEAUX[1], tenue=POLO, cheveux="#111827")
    cordon = VGroup(Line(P(-0.25, -0.5), P(0, -0.95), color=WHITE, stroke_width=3),
                    Line(P(0.25, -0.5), P(0, -0.95), color=WHITE, stroke_width=3))
    sifflet = RoundedRectangle(width=0.22, height=0.12, corner_radius=0.05, fill_color="#facc15", fill_opacity=1,
                               stroke_width=0).move_to(P(0, -1.0))
    chrono = VGroup(Circle(radius=0.2, fill_color=WHITE, fill_opacity=1, stroke_color="#111827", stroke_width=3),
                    Line(P(0, 0), P(0, 0.13), color="#ef4444", stroke_width=3),
                    Rectangle(width=0.08, height=0.08, fill_color="#111827", fill_opacity=1,
                              stroke_width=0).move_to(P(0, 0.25))).move_to(P(0.75, -1.25))
    p.add(cordon, sifflet, chrono)
    return p.scale(s)


def piscine(largeur=3.0, h=1.8, centre=ORIGIN):
    """Un bassin vu de dessus : l'eau, 3 lignes d'eau, 3 nageurs."""
    eau = RoundedRectangle(width=largeur, height=h, corner_radius=0.12, fill_color=EAU, fill_opacity=1,
                           stroke_color="#e2e8f0", stroke_width=6)
    lignes = VGroup(*[DashedLine(P(-largeur / 2 + 0.1, y), P(largeur / 2 - 0.1, y), color="#fef08a", stroke_width=4,
                                 dash_length=0.12) for y in (-h / 6, h / 6)])
    nageurs = VGroup()
    for k, y in enumerate((-h / 3, 0, h / 3)):
        x = -0.8 + 0.6 * k
        nageurs.add(VGroup(Circle(radius=0.11, fill_color="#f97316", fill_opacity=1, stroke_width=0),
                           Line(P(-0.3, 0.05), P(0.3, -0.05), color=WHITE, stroke_width=4)).move_to(P(x, y)))
    g = VGroup(eau, lignes, nageurs).move_to(centre)
    g.nageurs = nageurs
    return g


class FracSimplifierBase(PaysageG):
    nom_voix = "5e-frac-simplifier"
    fichier_marques = "frac_simplifier_marques.json"

    def barre9(self, k=0, centre=P(-3.2, 2.0)):
        return Barre(9, k, largeur=5.6, hauteur=0.8, couleur=CRAWL, centre=centre)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Simplifier une fraction", self.identite, self.ceinture, y_ech=-2.7)
        b1 = Barre(9, 6, largeur=4.4, hauteur=0.55, centre=P(-0.8, 0.75))
        b2 = Barre(3, 2, largeur=4.4, hauteur=0.55, centre=P(-0.8, -0.65))
        self.au_mot("Simplifier une")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("la même fraction")
        self.play(b1.apparaitre(0.9), b2.apparaitre(0.9))
        self.au_mot("plus petits")
        q = self.t("?", 90, AMBRE).next_to(VGroup(b1, b2), RIGHT, buff=0.5)
        self.play(FadeIn(q, scale=0.4), Create(b1.fin_coloriee(vers=-1.95)), run_time=0.6)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Samir, entraîneur de natation ──────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers, nom, met = self.personnage(entraineur(1.05), "Samir", ["entraîneur", "de natation"], x=-5.1, y=-0.6)
        self.au_mot("Voici Samir")
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("entraîneur")
        self.play(FadeIn(met, shift=UP * 0.2), run_time=0.4)
        bassin = piscine(centre=P(-1.9, 0.9))
        self.L([("séance :", WHITE, "Sa séance"), ("90 min", BLEU_CALCUL, "dure 90")], 2.4,
               avec=[FadeIn(bassin, shift=UP * 0.2)])
        self.L([("60 min", CRAWL, "font 60"), ("de crawl", WHITE, "de crawl")], 1.5,
               avec=[n.animate.shift(RIGHT * 1.0) for n in bassin.nageurs])
        self.au_mot("Quelle fraction")
        q = self.col(self.t("Quelle fraction ?", 40, ORANGE_RETENUE), 0.55)
        self.play(FadeIn(q, scale=0.8), run_time=0.4)
        self.au_nb("60 sur")
        f = EcritureFraction(60, 90, fs=84)
        self.col(f, -0.95)
        self.play(FadeIn(f, scale=1.3), run_time=0.4)
        self.au_mot("les nombres sont grands")
        tg = self.t("grands !", 36, AMBRE).next_to(f, RIGHT, buff=0.5)
        self.play(FadeIn(tg, shift=RIGHT * 0.2), Indicate(f, color=AMBRE), run_time=0.6)
        self.attendre_voix()

    # ── 02 : les paquets de 10 minutes (÷ 10) ───────────────────────────────
    def ecran_dix(self):
        self.ecran("02-dix")
        b = self.barre9()
        self.L([("paquets de", WHITE, "par paquets"), ("10 min", AMBRE, "paquets de 10")], 2.5, avec=[b.apparaitre()])
        self.L([("90 ÷", WHITE, "90 divisé"), ("10 =", WHITE, "90 divisé par 10"), ("9 paquets", BLEU_CALCUL, "égale 9")],
               1.6)
        self.play(LaggedStart(*[Indicate(p, color=AMBRE, scale_factor=1.12) for p in b.parts], lag_ratio=0.08),
                  run_time=0.9)
        self.L([("60 ÷", WHITE, "60 divisé"), ("10 =", WHITE, "60 divisé par 10"), ("6 paquets", CRAWL, "égale 6 paq")],
               0.7, avec=[b.colorier(range(6))])
        f, g = EcritureFraction(60, 90, fs=70), EcritureFraction(6, 9, fs=70)
        eg = egalite(f, g, buff=1.2).move_to(P(-3.2, -1.05))
        haut, bas = fleches(f, g, "÷ 10", fs=36, angle=TAU / 7)
        self.au_nb("crawl. 60")
        self.play(FadeIn(f, scale=1.2), run_time=0.4)
        self.au_nb("égale 6 neuv")
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.3), run_time=0.4)
        self.au_nb("bas par 10")
        self.play(Create(haut[0]), FadeIn(haut[1]), Create(bas[0]), FadeIn(bas[1]), run_time=0.6)
        self.play(Create(self.encadrer(VGroup(eg, haut, bas), buff=0.12)), run_time=0.4)
        self.attendre_voix()

    # ── 03 : encore ÷ 3 → 2/3, irréductible ─────────────────────────────────
    def ecran_encore(self):
        self.ecran("03-encore")
        b = self.barre9(6)
        self.add(b)
        f, g = EcritureFraction(6, 9, fs=84), EcritureFraction(2, 3, fs=84)
        eg = egalite(f, g, buff=1.2).move_to(P(-3.2, -1.1))
        haut, bas = fleches(f, g, "÷ 3", fs=38, angle=TAU / 7)
        self.au_mot("Encore plus simple")
        self.titre("Encore plus simple ?", AMBRE, 42)
        self.L([("6", WHITE, "simple ? 6"), ("et 9 :", WHITE, "6 et 9"), ("table de 3", AMBRE, "table de 3")], 1.9,
               avec=[FadeIn(f, scale=1.2)])
        self.play(Indicate(VGroup(f.num, f.den), color=AMBRE), run_time=0.5)
        self.au_nb("on divise par 3")
        self.play(Create(haut[0]), FadeIn(haut[1]), Create(bas[0]), FadeIn(bas[1]), run_time=0.6)
        self.au_nb("2 tiers")
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.3), run_time=0.4)
        self.au_mot("on regroupe")
        gr = b.groupes(3)
        self.play(LaggedStart(*[Create(r) for r in gr], lag_ratio=0.15), run_time=0.8)
        b3, anim = b.regrouper(3, run_time=1.0)
        self.play(anim, FadeOut(gr), run_time=1.0)
        self.au_mot("ne bouge pas")
        self.play(Create(b3.fin_coloriee(vers=-0.3)), Indicate(VGroup(*b3.parts[:2]), color=WHITE), run_time=0.7)
        self.L([("2", WHITE, "pas. 2"), ("et 3 : plus de diviseur", WHITE, "2 et 3")], 0.85, fs=36)
        self.L([("commun, à part 1.", WHITE, "à part 1")], 0.3, fs=36)
        self.au_mot("irréductible")
        irr = self.col(self.t("irréductible", 52, VERT_OK), -0.9)
        self.play(FadeIn(irr, scale=1.4), Circumscribe(g, color=VERT_OK), run_time=0.6)
        self.play(Create(self.encadrer(irr)), run_time=0.4)
        self.attendre_voix()

    # ── 04 : les critères de divisibilité ───────────────────────────────────
    def ecran_criteres(self):
        self.ecran("04-criteres")
        self.au_mot("utilise les critères")
        tit = self.t("Les critères de divisibilité", 46, JAUNE_TITRE).move_to(P(0, 3.0))
        tit.sans_synchro = True
        self.play(Write(tit), run_time=0.6)
        x0 = -5.6
        for y, specs in ((1.95, [("Par 2 :", AMBRE, "Par 2"), ("le nombre est pair.", WHITE, "le nombre est")]),
                         (1.1, [("Par 5 :", AMBRE, "Par 5"), ("il finit par 0", WHITE, "finit par 0"),
                                ("ou par 5.", WHITE, "ou par 5")]),
                         (0.25, [("Par 3 :", AMBRE, "Par 3"), ("somme des chiffres", WHITE, "la somme"),
                                 ("dans la table de 3.", WHITE, "table de 3")])):
            self.L(specs, y, fs=38, gauche=x0)
        n1, n2 = self.t("42", 70, BLEU_CALCUL), self.t("75", 70, BLEU_CALCUL)
        VGroup(n1, n2).arrange(RIGHT, buff=3.6).move_to(P(-1.4, -1.05))
        self.au_nb("Exemple : 42")
        self.play(FadeIn(n1, scale=1.3), run_time=0.3)
        self.au_nb("et 75")
        self.play(FadeIn(n2, scale=1.3), run_time=0.3)
        for n, specs in ((n1, [("4 +", WHITE, "Exemple : 42 et 75. 4"), ("2 =", WHITE, "4 plus 2"), ("6", VERT_OK, "égale 6")]),
                         (n2, [("7 +", WHITE, "6. 7"), ("5 =", WHITE, "7 plus 5"), ("12", VERT_OK, "égale 12")])):
            g = self.morceaux(specs, fs=38).next_to(n, DOWN, buff=0.3)
            self.jouer(g)
        self.au_nb("sont dans la table de 3")
        t3 = self.t("table de 3 !", 44, VERT_OK).move_to(P(-1.4, -2.85))
        t3.sans_synchro = True
        self.play(FadeIn(t3, scale=1.3), Indicate(VGroup(n1, n2), color=VERT_OK), run_time=0.6)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (6/8) ───────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b = Barre(8, 6, largeur=5.0, hauteur=0.7, centre=P(-3.4, 1.2))
        f = EcritureFraction(6, 8, fs=90).move_to(P(-3.4, -0.9))
        b4 = Barre(4, 3, largeur=5.0, hauteur=0.7, centre=P(-3.4, 1.2))

        def avant(sc):
            sc.au_nb("Simplifie 6")
            sc.q_tete(FadeIn(f, scale=1.2), b.apparaitre(0.6))

        def apres(sc):
            gr = b.groupes(2)
            sc.rep_mots(0, [("6 ÷", None, "Réponse C. 6"), ("2 =", None, ("divisé par 2", 1)), ("3", None, "égale 3"),
                            ("et 8 ÷", None, "et 8"), ("2 =", None, ("divisé par 2", 2)), ("4", None, "égale 4")],
                        avec=[Create(gr)])
            nb, anim = b.regrouper(2, run_time=0.8)
            sc.play(anim, FadeOut(gr), run_time=0.8)
            sc.rep_mots(1, [("4/6 :", None, "Avec 4"), ("on a soustrait 2.", None, "soustrait 2")])
            sc.rep_mots(2, [("3/8 :", None, "Avec 3"), ("seul le haut est divisé.", None, "seul le haut")])
            sc.fin_rep()

        self.question_pause("05-question", "05b-reponse", ["Simplifie 6/8."],
                            [self.inline("4/6"), self.inline("3/8"), self.inline("3/4")], 2,
                            ["6 ÷ 2 = 3 et 8 ÷ 2 = 4", "4/6 : on a soustrait 2.", "3/8 : seul le haut est divisé."],
                            avant_q=avant, autres_r=apres)

    # ── 06 : les pièges (soustraire ; un seul terme) ────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        kw = dict(largeur=4.6, hauteur=0.55, marge=0.2)
        ba = Barre(9, 6, centre=P(-2.75, 1.75), **kw)
        bb = Barre(2, 1, centre=P(-2.75, 0.55), couleur=ROUGE_COACH, **kw)
        bc = Barre(15, 1, centre=P(-2.75, -1.15), couleur=ROUGE_COACH, **kw)
        la, lb, lc = (self.inline(s, 30, c).next_to(x, LEFT, buff=0.12)
                      for s, c, x in (("60/90", VERT_OK, ba), ("30/60", ROUGE_ERREUR, bb), ("6/90", ROUGE_ERREUR, bc)))
        self.au_mot("Attention aux deux")
        tit = self.t("Attention aux pièges !", 46, ROUGE_ERREUR).move_to(P(-0.6, 3.15))
        tit.sans_synchro = True
        self.play(Write(tit), run_time=0.5)
        self.au_mot("soustraire")
        f1, g1 = EcritureFraction(60, 90, fs=42), EcritureFraction(30, 60, fs=42, couleur=ROUGE_ERREUR)
        e1 = egalite(f1, g1, signe="→", buff=0.6)
        self.col(e1, 1.5)
        p1 = self.bloc(["on", "soustrait ?"], 26, AMBRE).next_to(e1, RIGHT, buff=0.25)
        self.play(FadeIn(p1, shift=RIGHT * 0.2), run_time=0.35)
        h1, b1 = fleches(f1, g1, "− 30", couleur=ROUGE_ERREUR, fs=30, angle=TAU / 12)
        self.au_nb("60 quatre-vingt-dixièmes, moins")
        self.play(FadeIn(f1), FadeIn(ba), FadeIn(la), run_time=0.5)
        self.au_nb("moins 30")
        self.play(Create(h1[0]), FadeIn(h1[1]), Create(b1[0]), FadeIn(b1[1]), run_time=0.5)
        self.au_nb("bas : 30")
        self.play(FadeIn(e1[1]), FadeIn(g1, scale=1.3), FadeIn(bb), FadeIn(lb), run_time=0.5)
        self.au_mot("Faux !")
        self.play(Create(croix(g1, sw=5).set_stroke(opacity=0.85)), run_time=0.4)
        self.au_mot("la moitié")
        self.play(Create(ba.fin_coloriee(vers=-1.3)), Indicate(bb.parts[0], color=ROUGE_ERREUR), run_time=0.7)
        self.au_mot("diviser un seul")
        f2, g2 = EcritureFraction(60, 90, fs=42), EcritureFraction(6, 90, fs=42, couleur=ROUGE_ERREUR)
        e2 = egalite(f2, g2, signe="→", buff=0.6)
        self.col(e2, -1.55)
        p2 = self.bloc(["un seul", "nombre ?"], 28, AMBRE).next_to(e2, RIGHT, buff=0.4)
        self.play(FadeIn(p2, shift=RIGHT * 0.2), run_time=0.35)
        h2, _ = fleches(f2, g2, "÷ 10", bas="", couleur=ROUGE_ERREUR, fs=30, angle=TAU / 12)
        self.au_nb("nombre. 60")
        self.play(FadeIn(f2), run_time=0.3)
        self.au_nb("60 divisé par 10")
        self.play(Create(h2[0]), FadeIn(h2[1]), run_time=0.4)
        self.au_nb("mais 90")
        self.play(Indicate(f2.den, color=ROUGE_ERREUR, scale_factor=1.5), run_time=0.5)
        self.au_nb("bas : 6")
        self.play(FadeIn(e2[1]), FadeIn(g2, scale=1.3), FadeIn(bc), FadeIn(lc), run_time=0.5)
        self.au_mot("Faux aussi")
        self.play(Create(croix(g2, sw=5).set_stroke(opacity=0.85)), run_time=0.4)
        self.au_mot("On divise en haut")
        r = self.t("En haut ET en bas : ÷ le même nombre !", 34, VERT_OK).move_to(P(-0.4, -2.75))
        r.sans_synchro = True
        self.play(FadeIn(r, shift=UP * 0.2), run_time=0.5)
        self.insister(r, 1.08, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (laquelle est irréductible ?) ───────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        lp = VGroup(Circle(radius=1.2, stroke_color=AMBRE, stroke_width=10),
                    Line(P(0.86, -0.86), P(1.9, -1.9), stroke_color=AMBRE, stroke_width=16)).move_to(P(-3.3, 0.4))
        qm = self.t("?", 110, AMBRE).move_to(lp[0])
        self.add(lp, qm)
        b = Barre(10, 7, largeur=5.0, hauteur=0.7, couleur=VERT_PART, centre=P(-3.3, -2.3))

        def apres(sc):
            sc.rep_mots(0, [("7", None, "Réponse B. 7"), ("et 10 :", None, "7 et 10"),
                            ("rien en commun.", None, "pas de diviseur")],
                        avec=[FadeOut(qm), lp.animate.set_opacity(0.25), b.apparaitre(0.6)])
            sc.rep_mots(1, [("9", None, "1. 9"), ("et 12 :", None, "9 et 12"), ("table de 3.", None, "table de 3")])
            sc.rep_mots(2, [("10", None, "3. 10"), ("et 15 :", None, "10 et 15"), ("table de 5.", None, "table de 5")])
            sc.fin_rep()

        self.question_pause("07-question", "07b-reponse", ["Laquelle de ces fractions", "est irréductible ?"],
                            [self.inline("9/12"), self.inline("7/10"), self.inline("10/15")], 1,
                            ["7 et 10 : rien en commun.", "9 et 12 : table de 3.", "10 et 15 : table de 5."],
                            mot_q="Laquelle", autres_r=apres)

    # ── 08 : en une seule étape (÷ 30) ──────────────────────────────────────
    def ecran_etape(self):
        self.ecran("08-etape")
        b9 = self.barre9(6, centre=P(-3.2, 2.1))
        b3 = Barre(3, 2, largeur=5.6, hauteur=0.8, couleur=CRAWL, centre=P(-3.2, 0.55))
        self.au_mot("une seule étape")
        self.titre("En une seule étape ?", AMBRE, 42)
        self.play(b9.apparaitre(0.8), run_time=0.8)
        self.L([("60", WHITE, "Oui ! 60"), ("et 90 :", WHITE, "et 90"), ("table de 30", AMBRE, "table de 30")], 1.9)
        f, g = EcritureFraction(60, 90, fs=78), EcritureFraction(2, 3, fs=78, couleur=VERT_OK)
        eg = egalite(f, g, buff=1.3).move_to(P(-3.2, -1.3))
        h, bb = fleches(f, g, "÷ 30", fs=36, angle=TAU / 7)
        self.L([("60 ÷", WHITE, "60 divisé"), ("30 =", WHITE, "60 divisé par 30"), ("2", WHITE, "égale 2")], 1.0,
               avec={0: [FadeIn(f, scale=1.2)], 1: [Create(h[0]), FadeIn(h[1])]})
        self.L([("90 ÷", WHITE, "90 divisé"), ("30 =", WHITE, "90 divisé par 30"), ("3", WHITE, "égale 3")], 0.1,
               avec={1: [Create(bb[0]), FadeIn(bb[1])]})
        self.au_nb("tout de suite 2")
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.3), b3.apparaitre(0.8), run_time=0.8)
        self.play(Create(b9.fin_coloriee(vers=-1.35)), run_time=0.5)
        self.au_mot("Pas à pas")
        r = self.col(self.bloc(["Pas à pas, ou d'un coup :", "le même résultat !"], 36, VERT_OK), -1.3)
        self.play(FadeIn(r, shift=UP * 0.2), run_time=0.5)
        self.play(Create(self.encadrer(g)), run_time=0.4)
        self.attendre_voix()

    # ── 09 : QUESTION 3 (12/18 en une seule étape : ÷ 6) ────────────────────
    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        f, g = EcritureFraction(12, 18, fs=90), EcritureFraction(2, 3, fs=90, couleur=VERT_OK)
        eg = egalite(f, g, buff=1.2).move_to(P(-3.1, 0.3))
        h, b = fleches(f, g, "÷ 6", fs=44)

        def avant(sc):
            sc.au_nb("simplifier 12")
            sc.q_tete(FadeIn(f, scale=1.2))

        def apres(sc):
            sc.rep_mots(0, [("12 =", None, "Réponse C. 12"), ("6 ×", None, "égale 6"), ("2", None, "fois 2"),
                            ("et 18 =", None, "et 18"), ("6 ×", None, "18 égale 6"), ("3", None, "fois 3")],
                        avec={1: [Create(h[0]), FadeIn(h[1]), Create(b[0]), FadeIn(b[1])]})
            sc.rep_mots(1, [("donc 2/3, d'un coup !", None, "3 : 2")], avec=[FadeIn(eg[1]), FadeIn(g, scale=1.3)])
            sc.rep_mots(2, [("÷ 2 →", None, "Avec 2"), ("6/9 : il faut continuer !", None, "trouve 6")])
            sc.fin_rep()

        self.question_pause("09-question", "09b-reponse", ["Pour simplifier 12/18 en une", "seule étape, on divise par :"],
                            [self.inline("2"), self.inline("3"), self.inline("6")], 2,
                            ["12 = 6 × 2 et 18 = 6 × 3", "donc 2/3, d'un coup !", "÷ 2 → 6/9 : il faut continuer !"],
                            avant_q=avant, autres_r=apres)

    # ── 10 : défi (l'échauffement) ──────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        self.au_mot("À toi de jouer")
        self.titre("À toi de jouer !", fs=50)
        bassin = piscine(centre=P(-3.3, 0.2))
        self.L([("séance :", WHITE, "une séance"), ("60 min", BLEU_CALCUL, "séance de 60")], 2.0,
               avec=[FadeIn(bassin, shift=UP * 0.2)])
        self.L([("échauffement :", WHITE, "l'échauffement"), ("15 min", AMBRE, "dure 15")], 1.15,
               avec={1: [n.animate.shift(RIGHT * 0.5) for n in bassin.nageurs]})
        self.au_mot("Quelle fraction")
        l3 = self.col(self.t("Quelle fraction de la séance ?", 36, ORANGE_RETENUE), 0.3)
        self.play(FadeIn(l3, scale=0.8), run_time=0.4)
        self.au_mot("Simplifie-la")
        l4 = self.col(self.t("Simplifie au maximum !", 38, AMBRE), -0.5)
        self.play(FadeIn(l4, shift=UP * 0.2), run_time=0.4)
        self.pause_defi(y=-1.4)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        self.titre("Correction", fs=50)
        fs = 66
        f1, f2, f3 = EcritureFraction(15, 60, fs=fs), EcritureFraction(3, 12, fs=fs), \
            EcritureFraction(1, 4, fs=fs, couleur=VERT_OK)
        ch = VGroup(f1, f2, f3).arrange(RIGHT, buff=1.15).move_to(P(-3.3, 1.2))
        for x in (f2, f3):
            x.shift(UP * (f1.trait.get_y() - x.trait.get_y()))
        egs = [self.t("=", fs).move_to((a.get_right() + b.get_left()) / 2).set_y(f1.trait.get_y())
               for a, b in ((f1, f2), (f2, f3))]
        for e in egs:
            e.sans_synchro = True
        h1, b1 = fleches(f1, f2, "÷ 5", fs=32, angle=TAU / 6)
        h2, b2 = fleches(f2, f3, "÷ 3", fs=32, angle=TAU / 6)
        self.au_nb("Correction. 15")
        self.play(FadeIn(f1, scale=1.3), run_time=0.4)
        self.L([("finissent par 5", AMBRE, "finissent par 5"), ("et 0 :", AMBRE, "et par 0"),
                ("÷ 5", AMBRE, "on divise par 5")], 2.15, fs=36, buff=0.14)
        self.L([("15 ÷", WHITE, "15 divisé"), ("5 =", WHITE, "15 divisé par 5"), ("3", WHITE, "égale 3")], 1.35, fs=38,
               avec={1: [Create(h1[0]), FadeIn(h1[1])]})
        self.L([("60 ÷", WHITE, "60 divisé"), ("5 =", WHITE, "60 divisé par 5"), ("12", WHITE, "égale 12")], 0.6, fs=38,
               avec={1: [Create(b1[0]), FadeIn(b1[1])]})
        self.au_nb("12. 3")
        self.play(FadeIn(egs[0]), FadeIn(f2, scale=1.3), run_time=0.4)
        self.L([("3", AMBRE, "douzièmes. 3"), ("et 12 :", AMBRE, "3 et 12"), ("table de 3", AMBRE, "table de 3")], -0.2,
               fs=36)
        self.au_nb("encore par 3")
        self.play(Create(h2[0]), FadeIn(h2[1]), Create(b2[0]), FadeIn(b2[1]), run_time=0.5)
        self.au_nb("3. 1")
        br = Barre(4, 1, largeur=5.4, hauteur=0.7, couleur=AMBRE, centre=P(-3.3, -1.3))
        self.play(FadeIn(egs[1]), FadeIn(f3, scale=1.3), br.apparaitre(0.8), run_time=0.8)
        self.au_mot("irréductible")
        irr = self.col(self.t("irréductible", 40, VERT_OK), -1.0)
        self.play(FadeIn(irr, scale=1.2), Create(self.encadrer(f3)), run_time=0.4)
        l6 = self.L([("1 ÷", BLEU_CALCUL, "c'est 1"), ("4 =", BLEU_CALCUL, "divisé par 4"),
                     ("0,25", BLEU_CALCUL, "égale 0,25")], -1.95, fs=44)
        l7 = self.L([("= 25 %", VERT_OK, "soit 25")], -2.8, fs=44)
        self.play(Indicate(VGroup(l6, l7), color=AMBRE, scale_factor=1.08), run_time=0.6)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        ba = Barre(9, 6, largeur=4.4, hauteur=0.6, etiquette="frac", fs=34, centre=P(-3.6, 0.8))
        bb = Barre(3, 2, largeur=4.4, hauteur=0.6, etiquette="frac", fs=34, centre=P(-3.6, -1.4))
        tir = ba.fin_coloriee(vers=-(ba.contour.get_bottom()[1] - bb.contour.get_bottom()[1]) - 0.2)
        fig = VGroup(ba, bb, tir)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("Diviser en haut ET en bas", "par le même nombre."),
                                                         ("Les critères disent", "par quoi diviser."),
                                                         ("Continuer jusqu'à la", "fraction irréductible."),
                                                         ("Jamais de soustraction !",)], fs=36)
        self.montrer2(lignes[0], "Simplifier, c'est", "par le même")
        self.montrer2(lignes[1], "Les critères", "par quoi diviser")
        self.montrer2(lignes[2], "On continue", "la fraction irr")
        self.montrer2(lignes[3], "Et on ne soustrait")
        lignes[3][1].set_color(ROUGE_ERREUR)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_dix()
        self.ecran_encore()
        self.ecran_criteres()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_etape()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class FracSimplifier5e(FracSimplifierBase):
    identite = "Maths 5e — EleveAI"
    ceinture = "verte"
