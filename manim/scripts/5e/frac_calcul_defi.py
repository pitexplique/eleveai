# frac_calcul_defi.py
# EleveAI — Maths 5e — série « Fractions », épisode 10 : DÉFI, CALCULER AVEC
# LES FRACTIONS (micro du coach : fraction_calcul_defi, notion fraction_calcul),
# AVEC VOIX. Paysage 16:9, CEINTURE ORANGE (au-dessus de la verte : un problème
# à plusieurs étapes — additionner trois fractions, puis toute la chaîne de SES
# erreurs : SIMPLIFIER → DÉCIMAL → POURCENTAGE, puis une fraction d'une
# quantité ; comme les défis 6e et 4e, orange).
# Short jumeau : frac_calcul_defi_short.py (le trophée d'e-sport, jaune).
#
# Décor et métier : un VOYAGE DE CLASSE ; Romane, ORGANISATRICE DE VOYAGES
# SCOLAIRES : budget 1 200 € ; car 3/20, hébergement 1/2, repas 1/4 :
# 3/20 + 10/20 + 5/20 = 18/20 = 9/10 = 0,9 = 90 % ; reste 10 % = 1/10 de
# 1 200 € = 120 € ; défi : sortie au musée, 800 € : 1/5 + 3/10 = 5/10 = 1/2 =
# 0,5 = 50 %, reste 400 €. Chiffres inventés (aucune donnée du monde réel).
# Centres : argent-budget, histoire-geographie (le voyage, le musée).
# Vérifié (Python, fractions.Fraction) : 3/20 + 1/2 + 1/4 = 9/10 ; 12/16 = 3/4 ;
# 3/5 = 0,6 ; 1/10 × 1 200 = 120 ; 1/5 + 3/10 = 1/2 ; 800 ÷ 2 = 400.
#
# Micro → écrans (banque 5e/maths/fractions.bank.ts, genCalculDefi et la chaîne
# de la notion) : deux ou trois parts d'une quantité et le reste (01, 09, défi),
# « l'erreur classique : additionner les numérateurs ET les dénominateurs » (02),
# simplifier (03, question 1), fraction → décimal (05, question 2), décimal →
# pourcentage (07, question 3).
# Écrans : 00 garde · 01 Romane et le budget · 02 additionner · 03 étape 1
# simplifier · 04 QUESTION 1 · 05 étape 2 décimal · 06 QUESTION 2 · 07 étape 3
# pourcentage · 08 QUESTION 3 · 09 le reste · 10 défi · 10b correction ·
# 11 ce que tu as appris · 12 fin.
#
# ⭐ Bases : 5e/frac_loth_commun.py (PaysageH, L()) ; canvas_fractions.py (non modifié).
# Voix : manim/voix/5e-frac-calcul-defi.json (débit −10), WAV dans
# public/sons/5e-frac-calcul-defi/ ; marques : 5e/frac_calcul_defi_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/5e/frac_calcul_defi.py FracCalculDefi5e
# python -m manim render -qh --disable_caching manim/scripts/5e/frac_calcul_defi.py FracCalculDefi5e -o eleveai-maths-5e-frac-calcul-defi --media_dir manim/scripts/5e/media-frac-calcul-defi
# Sortie : manim/sorties/5e/maths/fractions/10-calcul-defi/eleveai-maths-5e-frac-calcul-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_loth_commun import *  # noqa: E402,F403

C_CAR = ORANGE_PART
C_HEB = BLEU_PART
C_REP = VERT_PART
XB, LB = -3.3, 5.6


def organisatrice(s=1.0):
    """Romane : veste rouge, un porte-documents."""
    p = personne(peau="#f1c27d", tenue="#be123c", cheveux="#78350f", longs=True, s=s)
    doc = RoundedRectangle(width=0.55 * s, height=0.7 * s, corner_radius=0.05 * s, fill_color="#e5e7eb",
                           fill_opacity=1, stroke_color="#475569", stroke_width=3)
    doc.move_to(p.corps.get_center() + RIGHT * 0.5 * s + DOWN * 0.2 * s)
    p.add(doc)
    return p


def car(s=1.0):
    corps = RoundedRectangle(width=2.0, height=0.8, corner_radius=0.15, fill_color="#facc15", fill_opacity=1,
                             stroke_width=0)
    vitres = VGroup(*[RoundedRectangle(width=0.32, height=0.28, corner_radius=0.05, fill_color="#bae6fd",
                                       fill_opacity=1, stroke_width=0).move_to(P(-0.7 + 0.42 * i, 0.15))
                      for i in range(4)])
    roues = VGroup(*[Circle(radius=0.17, fill_color="#111827", fill_opacity=1, stroke_width=0).move_to(P(x, -0.42))
                     for x in (-0.6, 0.6)])
    return VGroup(corps, vitres, roues).scale(s)


def colorier_grille(g, k, run_time=0.8, couleur=BLEU_PART):
    """Colorie les k premières cases d'une Grille (ordre de lecture)."""
    return LaggedStart(*[g.liste[i].animate.set_fill(couleur, 1) for i in range(k)], lag_ratio=0.02,
                       run_time=run_time)


def etape(n, txt, couleur=AMBRE, fs=40):
    """Le titre d'une étape : une pastille numérotée + le texte."""
    rond = Circle(radius=0.3, fill_color=couleur, fill_opacity=1, stroke_width=0)
    k = Text(str(n), font_size=34, color=NUIT, weight=BOLD).move_to(rond)
    t = Text(txt, font_size=fs, color=couleur)
    g = VGroup(VGroup(rond, k), t).arrange(RIGHT, buff=0.2)
    return g


class FracCalculDefiBase(PaysageH):
    nom_voix = "5e-frac-calcul-defi"
    fichier_marques = "frac_calcul_defi_marques.json"
    ceinture = "orange"

    def budget(self, y=0.0, n=20, couleurs=None, largeur=LB):
        """La barre du budget en n parts ; couleurs : {indice: couleur}."""
        b = Barre(n, 0, largeur=largeur, hauteur=0.6, marge=0.2, centre=P(XB, y))
        for i, c in (couleurs or {}).items():
            b.parts[i].set_fill(c, 1)
        return b

    def titre_etape(self, n, txt, mot):
        self.au_mot(mot)
        g = etape(n, txt)
        sans_synchro(g)
        g._pas_audit = True
        for f in g.get_family():
            f._pas_audit = True
        self.col(g, 3.0)
        self.play(FadeIn(g, shift=DOWN * 0.15), run_time=0.4)
        return g

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défi : calculer avec les fractions", self.identite, self.ceinture, y_ech=-2.7)
        self.au_mot("Défi")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        cases = VGroup()
        for txt, c in (("simplifier", VERT_OK), ("décimal", BLEU_CALCUL), ("pourcentage", AMBRE)):
            t = Text(txt, font_size=40, color=c)
            cases.add(VGroup(SurroundingRectangle(t, color=c, buff=0.2, corner_radius=0.12, stroke_width=4), t))
        fl = [Text("→", font_size=48) for _ in range(2)]
        ch = VGroup(cases[0], fl[0], cases[1], fl[1], cases[2]).arrange(RIGHT, buff=0.3)
        ch.scale_to_fit_width(min(ch.width, 11.0)).move_to(P(-0.4, 0.4))
        sans_synchro(ch)
        self.au_mot("Simplifier")
        self.play(FadeIn(cases[0], scale=1.2), run_time=0.35)
        self.au_mot("écrire en décimal")
        self.play(FadeIn(fl[0]), FadeIn(cases[1], scale=1.2), run_time=0.35)
        self.au_mot("en pourcentage")
        self.play(FadeIn(fl[1]), FadeIn(cases[2], scale=1.2), run_time=0.35)
        self.au_mot("sans tomber")
        p = Text("sans tomber dans les pièges !", font_size=38, color=ROUGE_ERREUR).move_to(P(-0.4, -0.9))
        p.sans_synchro = True
        self.play(FadeIn(p, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix(marge=0.8)

    # ── 01 : Romane et le budget ────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        self.personnage(organisatrice(1.0), "Romane", ["organisatrice", "de voyages"], x=-5.1, y=-0.6)
        bus = car(1.0).move_to(P(-2.6, 1.6))
        self.au_mot("Le voyage")
        self.play(FadeIn(bus, shift=RIGHT * 0.4), run_time=0.5)
        self.L([("Budget :", WHITE, "un budget"), ("1 200 €", AMBRE, "de 1 200")], 2.6, 44)
        self.L([("car :", C_CAR, "Le car"), (EcritureFraction(3, 20, fs=42, couleur=C_CAR), None, "coûte 3")], 1.5, 38)
        self.L([("hébergement :", C_HEB, "L'hébergement"), (EcritureFraction(1, 2, fs=42, couleur=C_HEB), None,
                                                            "hébergement, 1")], 0.35, 38)
        self.L([("repas :", C_REP, "Les repas"), (EcritureFraction(1, 4, fs=42, couleur=C_REP), None, "repas, 1")],
               -0.8, 38)
        self.au_mot("Quelle part")
        q1 = self.col(self.t("Dépensé : ? du budget", 34, ORANGE_RETENUE), -1.8)
        q1.sans_synchro = True
        self.play(FadeIn(q1, shift=UP * 0.15), run_time=0.35)
        self.au_mot("combien reste-t-il")
        q2 = self.col(self.t("Activités : ? €", 34, ORANGE_RETENUE), -2.4)
        q2.sans_synchro = True
        self.play(FadeIn(q2, shift=UP * 0.15), run_time=0.35)
        self.attendre_voix()

    # ── 02 : additionner (3/20 + 10/20 + 5/20 = 18/20) ──────────────────────
    def ecran_additionner(self):
        self.ecran("02-additionner")
        b = self.budget(0.3)
        lab = pas_audit(self.inline("le budget", 30, GREY_B).next_to(b, UP, buff=0.12))
        self.au_mot("on additionne")
        self.play(FadeIn(b), FadeIn(lab), run_time=0.4)
        e = expression((3, 20, C_CAR), "+", (1, 2, C_HEB), "+", (1, 4, C_REP), fs=44)
        pas_audit(e)  # les trois fractions de l'écran d'avant
        self.col(e, 2.6)
        self.play(FadeIn(e), run_time=0.3)
        self.L([("20", AMBRE, "20 est"), ("est un multiple de 2", WHITE, "multiple de 2"), ("et de 4", WHITE, "et de 4")],
               1.65, 34, buff=0.15)
        self.L([(EcritureFraction(1, 2, fs=42, couleur=C_HEB), None, "1 demi égale"), ("=", WHITE, None),
                (EcritureFraction(10, 20, fs=42, couleur=C_HEB), None, "égale 10")], 0.6, 40,
               avec={1: [b.colorier(range(3, 13), couleur=C_HEB, lag=0.03, run_time=0.5)]})
        self.L([(EcritureFraction(1, 4, fs=42, couleur=C_REP), None, "1 quart égale"), ("=", WHITE, None),
                (EcritureFraction(5, 20, fs=42, couleur=C_REP), None, "égale 5")], -0.6, 40,
               avec={1: [b.colorier(range(13, 18), couleur=C_REP, lag=0.04, run_time=0.4)]})
        self.add(b)
        self.L([("3", C_CAR, "vingtièmes. 3"), ("+ 10", C_HEB, "3 plus 10"), ("+ 5", C_REP, "plus 10 plus 5"),
                ("= 18", VERT_OK, "égale 18")], -1.75, 44,
               avec={0: [b.colorier(range(3), couleur=C_CAR, lag=0.1, run_time=0.4)]})
        self.au_mot("18 vingtièmes")
        acc = b.accolade(None, couleur=VERT_OK, dessus=False)
        t18 = pas_audit(self.inline("18/20", 34, VERT_OK).next_to(acc, DOWN, buff=0.08))
        self.play(FadeIn(acc), FadeIn(t18, scale=1.2), run_time=0.4)
        self.au_mot("Et surtout pas")
        faux = self.L([("pas", ROUGE_ERREUR, "Et surtout pas"), ("5/26", ROUGE_ERREUR, "pas 5"),
                       ("!", ROUGE_ERREUR, None)], -2.45, 40, xl=XB - 1.0)
        self.au_mot("on n'ajoute pas")
        self.play(Create(croix(faux[1], sw=5)), run_time=0.3)
        self.attendre_voix()
        return b

    # ── 03 : étape 1, simplifier (18/20 = 9/10) ─────────────────────────────
    def ecran_simplifier(self, b):
        self.ecran("03-simplifier")
        self.add(b)
        self.titre_etape(1, "Simplifier", "Étape 1")
        f, g = EcritureFraction(18, 20, fs=56), EcritureFraction(9, 10, fs=56, couleur=VERT_OK)
        eg = egalite(f, g, buff=1.0)
        self.col(eg, 0.1)
        self.L([("18", WHITE, "simplifier. 18"), ("et", WHITE, None), ("20", WHITE, "et 20"), ("sont pairs", WHITE,
                                                                                            "sont pairs")], 2.15, 36,
               avec={0: [FadeIn(f, scale=1.2)]})
        haut, bas = fleches(f, g, "÷ 2", fs=28, angle=TAU / 14)
        self.au_nb("on divise par 2")
        b10, an = b.regrouper(2, run_time=0.8)
        self.play(Create(haut[0]), FadeIn(haut[1]), Create(bas[0]), FadeIn(bas[1]), an)
        self.au_nb("9 dixièmes")
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.3), run_time=0.4)
        self.play(Create(self.encadrer(g, buff=0.15)), run_time=0.3)
        self.au_mot("On ne soustrait pas")
        faux = self.L([("18", ROUGE_ERREUR, "18 moins"), ("− 2", ROUGE_ERREUR, "18 moins 2"), ("sur", ROUGE_ERREUR, None),
                       ("20", ROUGE_ERREUR, "20 moins"), ("− 2", ROUGE_ERREUR, "20 moins 2"),
                       ("= 16/18", ROUGE_ERREUR, "16 dix-huitièmes")], -2.05, 36, buff=0.15)
        self.au_mot("c'est faux")
        self.play(Create(croix(faux, sw=6).set_stroke(opacity=0.9)), run_time=0.3)
        self.attendre_voix()
        return b10

    # ── 04 : QUESTION 1 (simplifier 12/16) ──────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b = Barre(16, 12, largeur=5.2, hauteur=0.6, couleur=C_HEB, marge=0.2, centre=P(XB, 0.3))
        self.add(b)

        def apres(sc):
            sc.au_nb("On divise par 4")
            b4, an = b.regrouper(4, run_time=0.8)
            sc.rep(0, avec=[an])
            sc.au_mot("Enlever 2")
            sc.rep(1)
            sc.rep_fin()

        self.question_pause("04-question", "04b-reponse", ["Simplifie", "12 seizièmes."],
                            [self.inline("10/14"), self.inline("3/4"), self.inline("6/16")], 1,
                            ["÷ 4 en haut et en bas : 3/4", "Enlever 2 : piège !"],
                            mot_q="Comment simplifier", autres_r=apres)

    # ── 05 : étape 2, le nombre décimal (9/10 = 0,9) ────────────────────────
    def ecran_decimal(self):
        self.ecran("05-decimal")
        self.titre_etape(2, "Le nombre décimal", "Étape 2")
        dr = pas_audit(Droite(0, 1, 10, etiquettes={0: "0", 1: "1"}, longueur=4.6, fs=30, centre=P(-3.0, -0.2)))
        self.play(FadeIn(dr), run_time=0.4)
        self.L([(EcritureFraction(9, 10, fs=56, couleur=VERT_OK), None, "9 dixièmes")], 1.9, 44)
        self.L([("9", WHITE, "9 divisé"), ("÷ 10", WHITE, "par 10"), ("= 0,9", BLEU_CALCUL, "0,9")], 0.7, 52,
               avec={2: [FadeIn(Dot(dr.p(0.9), radius=0.13, color=BLEU_POINT), scale=2)]})
        pt = pas_audit(self.inline("0,9", 34, BLEU_CALCUL).next_to(dr.p(0.9), UP, buff=0.35))
        self.play(FadeIn(pt), run_time=0.3)
        self.au_nb("Pas 9,10")
        faux = self.col(self.inline("9,10", 52, ROUGE_ERREUR), -0.7)
        self.play(FadeIn(faux, scale=1.2), run_time=0.3)
        self.play(Create(croix(faux, sw=6)), run_time=0.3)
        self.au_mot("on divise")
        r = self.col(self.t("une fraction, c'est une division !", 32, AMBRE), -1.6)
        r.sans_synchro = True
        self.play(FadeIn(r, shift=UP * 0.15), run_time=0.35)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (3/5 en décimal) ────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        dr = pas_audit(Droite(0, 1, 5, etiquettes={0: "0", 1: "1"}, longueur=4.6, fs=30, centre=P(-3.0, 0.0)))
        self.add(dr)

        def apres(sc):
            sc.au_mot("3 divisé")
            sc.rep(0, avec=[FadeIn(Dot(dr.p(0.6), radius=0.13, color=BLEU_POINT), scale=2)])
            sc.au_mot("3,5 colle")
            sc.play(FadeIn(sans_synchro(sc.ph_q[1]), shift=UP * 0.15), run_time=0.3)  # d un bloc, au mot
            sc._deja = getattr(sc, "_deja", set()) | {1}
            sc.rep_fin()

        self.question_pause("06-question", "06b-reponse", ["3 cinquièmes", "en nombre décimal ?"],
                            [self.inline("3,5"), self.inline("0,6"), self.inline("5,3")], 1,
                            ["3 ÷ 5 = 0,6", "3,5 : piège !"], mot_q="3 cinquièmes",
                            autres_r=apres)

    # ── 07 : étape 3, le pourcentage (0,9 = 90 %) ───────────────────────────
    def ecran_pourcentage(self):
        self.ecran("07-pourcentage")
        self.titre_etape(3, "Le pourcentage", "Étape 3")
        g = grille100(0, cote=0.36, centre=P(XB, -0.2))
        self.play(FadeIn(g), run_time=0.4)
        self.L([("0,9", BLEU_CALCUL, "0,9, c'est")], 1.9, 52)
        self.L([("=", WHITE, "c'est 90"), ("90/100", WHITE, None)], 0.8, 48,
               avec={0: [colorier_grille(g, 90, 0.8)]})
        self.L([("= 90 %", VERT_OK, "centièmes : 90")], -0.3, 56)
        self.au_mot("Romane a dépensé")
        r = self.col(self.t("dépensé : 90 % du budget", 34, AMBRE), -1.4)
        r.sans_synchro = True
        r._pas_audit = True
        self.play(FadeIn(r, shift=UP * 0.15), run_time=0.35)
        self.attendre_voix()

    # ── 08 : QUESTION 3 (0,45 en %) ─────────────────────────────────────────
    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        g = grille100(0, cote=0.36, centre=P(XB, 0.0))
        self.add(g)

        def apres(sc):
            sc.au_mot("0,45, c'est")
            sc.rep(0, avec=[colorier_grille(g, 45, 0.6)])
            sc.rep_fin()

        self.question_pause("08-question", "08b-reponse", ["0,45", "en pourcentage ?"],
                            [self.inline("0,45 %"), self.inline("4,5 %"), self.inline("45 %")], 2,
                            ["0,45 = 45 centièmes = 45 %"], mot_q="0,45", autres_r=apres)

    # ── 09 : le reste (10 % = 1/10 de 1 200 € = 120 €) ──────────────────────
    def ecran_reste(self):
        self.ecran("09-reste")
        b = self.budget(0.3, n=10, couleurs={i: C_HEB for i in range(9)})
        self.au_mot("Et pour les activités")
        self.play(FadeIn(b), run_time=0.4)
        self.L([("reste :", WHITE, "Il reste"), ("10 %", ORANGE_RETENUE, "reste 10")], 2.2, 44,
               avec={1: [b.parts[9].animate.set_fill(ORANGE_RETENUE, 1)]})
        self.L([("=", WHITE, "1 dixième"), (EcritureFraction(1, 10, fs=50, couleur=ORANGE_RETENUE), None, None),
                ("du budget", WHITE, None)], 1.15, 42)
        self.L([("1 200", WHITE, "1 200 divisé"), ("÷ 10", WHITE, "par 10"), ("= 120 €", VERT_OK, "égale 120")], -0.1, 46)
        t = pas_audit(self.inline("120 €", 30, ORANGE_RETENUE).next_to(b.parts[9], DOWN, buff=0.4))
        self.play(FadeIn(t, scale=1.3), run_time=0.3)
        self.attendre_voix()

    # ── 10 : défi (800 €, 1/5 et 3/10) ──────────────────────────────────────
    def ecran_defi(self):
        self.ecran("10-defi")
        self.au_mot("À toi de jouer")
        self.titre("À toi de jouer !", fs=50, centre=True)
        mus = VGroup(Polygon(P(-1, 0.4), P(1, 0.4), P(0, 1.0), fill_color="#e5e7eb", fill_opacity=1, stroke_width=0),
                     *[Rectangle(width=0.18, height=1.0, fill_color="#e5e7eb", fill_opacity=1, stroke_width=0)
                       .move_to(P(-0.7 + 0.47 * i, -0.15)) for i in range(4)],
                     Rectangle(width=2.1, height=0.15, fill_color="#e5e7eb", fill_opacity=1, stroke_width=0)
                     .move_to(P(0, -0.72))).move_to(P(-3.5, 0.0))
        self.au_mot("sortie au musée")
        self.play(FadeIn(mus, shift=UP * 0.2), run_time=0.5)
        self.L([("Budget :", WHITE, "le budget"), ("800 €", AMBRE, "de 800")], 2.2, 42)
        self.L([("car :", C_CAR, "Le car"), (EcritureFraction(1, 5, fs=42, couleur=C_CAR), None, "coûte 1")], 1.1, 38)
        self.L([("billets :", C_HEB, "les billets"), (EcritureFraction(3, 10, fs=42, couleur=C_HEB), None, "billets 3")],
               -0.1, 38)
        self.au_mot("Quel pourcentage")
        q1 = self.col(self.t("Dépensé : ? %", 34, ORANGE_RETENUE), -1.15)
        q1.sans_synchro = True
        self.play(FadeIn(q1, shift=UP * 0.15), run_time=0.35)
        self.au_mot("Combien d'euros")
        q2 = self.col(self.t("Reste : ? €", 34, ORANGE_RETENUE), -1.75)
        q2.sans_synchro = True
        self.play(FadeIn(q2, shift=UP * 0.15), run_time=0.35)
        self.pause_defi(y=-2.4)

    def ecran_correction(self):
        self.ecran("10b-correction")
        self.titre("Correction", fs=50, centre=True)
        b = self.budget(-2.55, n=10, largeur=5.0)
        self.add(b)
        self.L([(EcritureFraction(1, 5, fs=46, couleur=C_CAR), None, "Correction. 1"), ("=", WHITE, None),
                (EcritureFraction(2, 10, fs=46, couleur=C_CAR), None, "égale 2")], 2.0, 40, xl=-5.8,
               avec={1: [b.colorier([0, 1], couleur=C_CAR, lag=0.1, run_time=0.4)]})
        self.L([("2", C_CAR, "dixièmes. 2"), ("+ 3", C_HEB, "2 plus 3"), ("= 5", VERT_OK, "égale 5")], 0.9, 44,
               xl=-5.8, avec={1: [b.colorier([2, 3, 4], couleur=C_HEB, lag=0.1, run_time=0.4)]})
        f, g = EcritureFraction(5, 10, fs=56), EcritureFraction(1, 2, fs=56, couleur=VERT_OK)
        eg = egalite(f, g, buff=0.9)
        eg.move_to(P(-3.6, -0.95))
        self.au_mot("5 dixièmes")
        self.play(FadeIn(f, scale=1.2), run_time=0.3)
        haut, bas = fleches(f, g, "÷ 5", fs=28, angle=TAU / 10)
        self.au_nb("par 5")
        b2, an = b.regrouper(5, run_time=0.6)
        self.play(Create(haut[0]), FadeIn(haut[1]), Create(bas[0]), FadeIn(bas[1]), an, run_time=0.6)
        self.au_mot("1 demi. 1")
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.3), run_time=0.35)
        self.L([(EcritureFraction(1, 2, fs=50, couleur=VERT_OK), None, ("1 demi, c'est", 1)),
                ("= 0,5", BLEU_CALCUL, "c'est 0,5"), ("= 50 %", VERT_OK, "0,5 : 50")], 1.6, 46)
        self.L([("reste :", WHITE, "Il reste"), ("800", WHITE, "800 divisé"), ("÷ 2", WHITE, "par 2"),
                ("= 400 €", VERT_OK, "égale 400")], 0.2, 46)
        self.play(Indicate(b2.parts[1], color=AMBRE), run_time=0.4)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale")
        fig = VGroup(expression((18, 20), "=", (9, 10), fs=44), Text("= 9 ÷ 10 = 0,9", font_size=40),
                     Text("= 90 %", font_size=40, color=VERT_OK)).arrange(DOWN, aligned_edge=LEFT, buff=0.35)
        sans_synchro(fig)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("On simplifie : on divise le haut", "et le bas par le même nombre."),
                                                         ("Une fraction, c'est une division :", "9/10 = 9 ÷ 10 = 0,9."),
                                                         ("0,9 = 90 centièmes", "= 90 %.")], fs=34)
        self.au_mot("On simplifie")
        self.montrer_ligne(lignes[0])
        self.au_mot("Une fraction")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et 0,9")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        b = self.ecran_additionner()
        self.ecran_simplifier(b)
        self.ecran_question1()
        self.ecran_decimal()
        self.ecran_question2()
        self.ecran_pourcentage()
        self.ecran_question3()
        self.ecran_reste()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class FracCalculDefi5e(FracCalculDefiBase):
    identite = "Maths 5e — EleveAI"
    ceinture = "orange"
