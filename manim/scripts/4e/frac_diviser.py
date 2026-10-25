# frac_diviser.py
# EleveAI — Maths 4e — série « Fractions », épisode 09 : DIVISER DES
# FRACTIONS (micro du coach : fraction_diviser, notion fraction_calcul), AVEC
# VOIX. Paysage 16:9, CEINTURE VERTE : la paysage complète du niveau 4e
# (diviser = compter « combien de fois », la règle « multiplier par
# l'inverse », le piège « on retourne la mauvaise », diviser par un entier,
# relatifs, défi corrigé, chaîne simplifier → décimal → pourcentage).
# Short jumeau : frac_diviser_short.py (diviser… et ça grossit !, blanche).
#
# Décor et métier : la PHARMACIE ; Amina, PRÉPARATRICE EN PHARMACIE : 3/4 L de
# sirop en flacons de 1/8 L → 3/4 ÷ 1/8 = 3/4 × 8 = 24/4 = 6 flacons ; défi :
# 6 L en flacons de 3/4 L → 6 × 4/3 = 24/3 = 8. Chiffres inventés (aucune
# donnée du monde réel citée). Centres : corps-sante, sciences.
# Vérifié (Python, fractions.Fraction) : 3/4 ÷ 1/8 = 6 ; 2/3 ÷ 4/5 = 5/6 (et
# 3/2 × 4/5 = 6/5, le piège ; 2/3 × 4/5 = 8/15) ; 4/5 ÷ 2 = 2/5 = 0,4 ;
# −3/5 ÷ 9/10 = −30/45 = −2/3 ; 1/2 ÷ 1/4 = 2 ; 6 ÷ 3/4 = 8.
#
# Micro → écrans (banque 4e/maths/fractions.bank.ts) : PARTAGES « combien de
# … » (01-02, défi 09), explQuotient « diviser par un nombre non nul, c'est
# multiplier par son inverse » (03), genQuotientQcm a/b (question 1 : 2/3 ÷ 4/5,
# leurres qMul(A, B) = 8/15 et B/A = 6/5), le piège (05, open_1), « a/k » et
# PARTAGES_FRACTION (06), « -a/b » (07), genDiviserRevientA (08 : 1/2 ÷ 1/4).
# Écrans : 00 garde · 01 Amina et le sirop · 02 compter les huitièmes · 03 la
# règle · 04 QUESTION 1 · 05 le piège · 06 par un entier · 07 relatifs ·
# 08 QUESTION 2 · 09 défi · 10 correction · 11 ce que tu as appris · 12 fin.
#
# ⭐ Bases : 4e/frac_lote_commun.py (PaysageE) ; retourner() de 4e/frac_inverse.py ;
# canvas_fractions.py (non modifié).
# Voix : manim/voix/4e-frac-diviser.json (débit −10), WAV dans
# public/sons/4e-frac-diviser/ ; marques : 4e/frac_diviser_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/frac_diviser.py FracDiviser4e
# python -m manim render -qh --disable_caching manim/scripts/4e/frac_diviser.py FracDiviser4e -o eleveai-maths-4e-frac-diviser --media_dir manim/scripts/4e/media-frac-diviser
# Sortie : manim/sorties/4e/maths/fractions/09-diviser/eleveai-maths-4e-frac-diviser.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lote_commun import *  # noqa: E402,F403
from frac_inverse import moins, retourner  # noqa: E402

SIROP = "#f472b6"
XB, LB = -3.3, 5.4


def preparatrice(s=1.0):
    """Amina : blouse blanche, foulard."""
    p = personne(peau="#8d5524", tenue="#0d9488", cheveux="#1f2937", longs=True, s=s)
    p.add(blouse(p))
    c = p.tete.get_center()
    r = p.tete.width / 2
    foulard = AnnularSector(inner_radius=r * 0.98, outer_radius=r * 1.3, angle=PI * 1.3, start_angle=-PI * 0.15,
                            fill_color="#0d9488", fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.2)
    p.add(foulard)
    return p


def bouteille(h=2.4, w=1.3, niveau=0.75, couleur=SIROP):
    corps = RoundedRectangle(width=w, height=h * 0.78, corner_radius=0.2, stroke_color="#cbd5e1", stroke_width=5)
    col = Rectangle(width=w * 0.36, height=h * 0.22, stroke_color="#cbd5e1", stroke_width=5).next_to(corps, UP, buff=0)
    H = corps.height - 0.14
    liq = Rectangle(width=w - 0.16, height=H * niveau, fill_color=couleur, fill_opacity=0.9, stroke_width=0)
    liq.move_to(P(corps.get_x(), corps.get_bottom()[1] + 0.07 + H * niveau / 2))
    g = VGroup(liq, corps, col)
    g.liq, g.corps = liq, corps
    return g


def fiole(couleur=SIROP, plein=True, s=0.5):
    """Un petit flacon (vide ou plein)."""
    corps = RoundedRectangle(width=0.6, height=0.8, corner_radius=0.1, stroke_color="#cbd5e1", stroke_width=4,
                             fill_color=couleur, fill_opacity=0.9 if plein else 0)
    bouchon = Rectangle(width=0.3, height=0.18, fill_color="#94a3b8", fill_opacity=1, stroke_width=0)
    bouchon.next_to(corps, UP, buff=0)
    return VGroup(corps, bouchon).scale(s / 0.5)


def ligne_fr(*items, fs=54):
    """expression() dont la hauteur est alignée sur les traits."""
    return expression(*items, fs=fs)


class FracDiviserBase(PaysageE):
    nom_voix = "4e-frac-diviser"
    fichier_marques = "frac_diviser_marques.json"

    def barre(self, n, k=0, y=0.0, couleur=SIROP, largeur=LB, x=XB, **kw):
        return Barre(n, k, largeur=largeur, hauteur=0.6, couleur=couleur, marge=0.2, centre=P(x, y), **kw)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Diviser des fractions", self.identite, self.ceinture, y_ech=-2.7)
        self.au_mot("Diviser")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        ex = expression((3, 4), "÷", (1, 8), "=", "?", fs=80).move_to(P(-0.6, 0.2))
        ex[4].set_color(AMBRE)
        self.montre(["3 quarts", "par 1 huitième"], [ex[0], ex[1:3]])
        self.au_mot("combien")
        self.play(FadeIn(ex[3:], scale=0.5), run_time=0.4)
        self.insister(ex[4], 1.4, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Amina et le sirop ──────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = preparatrice(1.0).move_to(P(-5.4, -0.6))
        self.au_mot("Voici Amina")
        nom = self.t("Amina", 38, BLEU_CALCUL).next_to(pers, UP, buff=0.35)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.5)
        self.au_mot("préparatrice")
        metier = self.bloc(["préparatrice", "en pharmacie"], 26, BLEU_CALCUL).next_to(pers, DOWN, buff=0.15)
        bloc_fixe(metier)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.4)
        bt = bouteille(2.6, 1.4, 0.75).move_to(P(-2.6, 0.4))
        l1 = VGroup(self.t("sirop :", 40, SIROP), EcritureFraction(3, 4, fs=54, couleur=SIROP), self.t("L", 40, SIROP))
        l1.arrange(RIGHT, buff=0.2)
        self.col(l1, 2.0)
        self.au_nb("Elle a 3")
        self.play(FadeIn(bt, shift=UP * 0.2), FadeIn(l1, scale=1.1), run_time=0.5)
        fl = VGroup(*[fiole(plein=False, s=0.45) for _ in range(6)]).arrange(RIGHT, buff=0.12).move_to(P(-1.85, -2.1))
        l2 = VGroup(self.t("flacon :", 40), EcritureFraction(1, 8, fs=54), self.t("L", 40)).arrange(RIGHT, buff=0.2)
        self.col(l2, 0.6)
        self.au_nb("flacons d'1")
        self.play(FadeIn(l2, scale=1.1), LaggedStart(*[FadeIn(f, shift=UP * 0.2) for f in fl], lag_ratio=0.1),
                  run_time=0.6)
        self.au_mot("Combien de flacons")
        q = self.col(self.t("Combien de flacons ?", 42, ORANGE_RETENUE), -0.7)
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 02 : compter les huitièmes dans 3/4 ─────────────────────────────────
    def ecran_compter(self):
        self.ecran("02-compter")
        b = self.barre(4, 3, 1.4)
        self.au_mot("On compte les huitièmes")
        self.play(b.apparaitre(0.6), run_time=0.6)
        f = EcritureFraction(3, 4, fs=60, couleur=SIROP)
        eg = egalite(f, EcritureFraction(6, 8, fs=60, couleur=SIROP), buff=0.4)
        self.col(eg, 2.2)
        self.au_mot("3 quarts, c'est")
        self.play(FadeIn(f, scale=1.2), run_time=0.3)
        b8, anim = b.repartager(2, run_time=0.8)
        self.au_mot("6 huitièmes")
        self.play(anim, FadeIn(eg[1:], scale=1.2))
        self.au_nb("il y a 6")
        nums = VGroup(*[Text(str(i + 1), font_size=30, color=NUIT, weight=BOLD).move_to(b8.parts[i]) for i in range(6)])
        pas_audit(nums)
        fl = VGroup(*[fiole(plein=False, s=0.5) for _ in range(6)]).arrange(RIGHT, buff=0.18).move_to(P(XB, -0.6))
        self.play(LaggedStart(*[FadeIn(n, scale=1.5) for n in nums], lag_ratio=0.15), FadeIn(fl), run_time=0.8)
        self.calc([("6 × 1/8 = 6/8", WHITE)], 0.7, 44)
        self.au_mot("6 flacons")
        pleins = VGroup(*[fiole(plein=True, s=0.5).move_to(f) for f in fl])
        r = self.col(self.t("6 flacons !", 50, VERT_OK), -0.9)
        self.play(LaggedStart(*[FadeIn(p) for p in pleins], lag_ratio=0.12), FadeIn(r, scale=1.3), run_time=0.7)
        self.attendre_voix()

    # ── 03 : la règle ───────────────────────────────────────────────────────
    def ecran_regle(self):
        self.ecran("03-regle")
        self.au_mot("La règle")
        tit = self.titre("La règle")
        r = self.col(self.bloc(["Diviser par une fraction,", "c'est multiplier", "par son inverse."], 36, AMBRE), 1.9)
        self.au_mot("diviser par une fraction")
        self.poser_lignes(r, "up", 0.3)
        e = expression((3, 4), "÷", (1, 8), fs=72).move_to(P(-3.3, 0.6))
        self.montre(["3 quarts divisé", "par 1 huitième"], [e[0], e[1:]])
        g, anim = retourner(e[2], couleur=VERT_OK)
        fois = Text("×", font_size=72).move_to(e[1])
        fois.sans_synchro = True
        self.au_nb("3 quarts fois 8")
        self.play(anim, Transform(e[1], fois), run_time=0.7)
        self.add(g)
        self.au_mot("3 fois 8")
        self.calc([("3 × 8 =", WHITE), ("24", BLEU_CALCUL)], 0.6, 46)
        f24 = EcritureFraction(24, 4, fs=64)
        res = VGroup(Text("=", font_size=64), f24, Text("=", font_size=64), Text("6", font_size=72, color=VERT_OK))
        res.arrange(RIGHT, buff=0.3)
        for m in (res[0], res[2], res[3]):
            m.sans_synchro = True
            m.set_y(f24.trait.get_y())
        self.col(res, -1.0)
        self.au_mot("24 quarts")
        self.play(FadeIn(res[:2], scale=1.2), run_time=0.35)
        self.au_nb("On simplifie par 4 : 6")
        self.play(FadeIn(res[2:], scale=1.3), run_time=0.35)
        self.au_mot("On retrouve")
        r2 = self.col(self.t("6 flacons !", 44, VERT_OK), -2.4)
        self.play(FadeIn(r2, scale=1.2), Create(self.encadrer(res[3], buff=0.12)), run_time=0.4)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (2/3 ÷ 4/5) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        f = EcritureFraction(4, 5, fs=130, couleur=AMBRE).move_to(P(-3.3, 0.4))

        def apres(sc):
            sc.au_nb("l'inverse de 4")
            sc.play(FadeIn(f, scale=1.2), run_time=0.3)
            g, anim = retourner(f, couleur=VERT_OK)
            sc.au_nb("de 4 cinquièmes : 5")
            sc.rep(0, avec=[anim])
            sc.add(g)
            sc.au_mot("2 fois 5")
            sc.rep(1)
            sc.au_mot("3 fois 4")
            sc.rep(2)
            sc.au_mot("10 douzièmes")
            sc.rep(3)
            sc.rep_fin()

        self.question_pause("04-question", "04b-reponse", ["2 tiers", "÷ 4 cinquièmes ?"],
                            [self.inline("8/15"), self.inline("5/6"), self.inline("6/5")], 1,
                            ["÷ 4/5 → × 5/4", "2 × 5 = 10", "3 × 4 = 12", "10/12 = 5/6"], mot_q="2 tiers",
                            autres_r=apres)

    # ── 05 : le piège : on retourne la DEUXIÈME ─────────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        self.au_mot("Attention au piège")
        tit = self.titre("Attention au piège !", ROUGE_ERREUR)
        bon = expression((2, 3), "×", (5, 4, VERT_OK), fs=64).move_to(P(-3.3, 1.1))
        faux = expression((3, 2, ROUGE_ERREUR), "×", (4, 5), "=", (6, 5, ROUGE_ERREUR), fs=64).move_to(P(-3.3, -1.3))
        ok = self.coche(VERT_OK, 0.35).next_to(bon, RIGHT, buff=0.3)
        self.au_nb("Pour 2")
        self.play(FadeIn(bon[0], scale=1.1), run_time=0.3)
        r = self.col(self.bloc(["On retourne seulement", "la deuxième fraction."], 38, VERT_OK), 1.6)
        self.au_mot("on retourne seulement")
        self.poser_lignes(r, "up", 0.3)
        self.au_nb("fraction : 5")
        self.play(FadeIn(bon[1:], scale=1.1), Create(ok), run_time=0.4)
        r2 = self.col(self.bloc(["Retourner la première :", "faux !"], 38, ROUGE_ERREUR), -0.9)
        for m in r2:
            m.sans_synchro = True
        self.au_mot("Si on retourne la première")
        self.play(FadeIn(r2[0], shift=UP * 0.2), run_time=0.35)
        self.montre(["3 demis", "fois 4 cinquièmes, on", "6 cinquièmes"], [faux[0], faux[1:3], faux[3:]])
        self.au_mot("c'est faux")
        self.play(Create(croix(faux, sw=6).set_stroke(opacity=0.9)), FadeIn(r2[1], scale=1.2), run_time=0.35)
        self.attendre_voix()

    # ── 06 : diviser par un entier (4/5 ÷ 2) ────────────────────────────────
    def ecran_entier(self):
        self.ecran("06-entier")
        self.au_mot("Et diviser par un entier")
        tit = self.titre("Par un entier ?")
        b = self.barre(5, 4, 1.6)
        e = expression((4, 5), "÷", "2", fs=60)
        self.col(e, 1.8)
        self.au_mot("4 cinquièmes divisé")
        self.play(FadeIn(e[0], scale=1.2), b.apparaitre(0.5), run_time=0.5)
        self.au_nb("divisé par 2")
        self.play(FadeIn(e[1:], scale=1.2), run_time=0.3)
        l1 = self.col(self.ligne([("2 = 2/1", WHITE), ("→ inverse :", WHITE), ("1/2", VERT_OK)], 40), 0.6)
        self.au_mot("2, c'est 2 sur 1")
        self.poser_lignes(l1, "fade", 0.3)
        e2 = expression("=", (4, 5), "×", (1, 2, VERT_OK), "=", (4, 10), "=", (2, 5, VERT_OK), fs=50)
        self.col(e2, -0.7)
        self.montre(["4 cinquièmes fois", "fois 1 demi", "4 dixièmes", "on simplifie, 2"], [e2[:2], e2[2:4], e2[4:6], e2[6:]])
        b10, anim = b.repartager(2, run_time=0.6)
        self.au_mot("prendre la moitié")
        moit = Barre(10, 4, largeur=LB, hauteur=0.6, couleur=VERT_OK, marge=0.2, centre=P(XB, 0.0))
        self.play(anim, FadeIn(moit, shift=DOWN * 0.2), run_time=0.7)
        lg = self.col(self.ligne([("= 0,4", BLEU_CALCUL), ("= 40 %", VERT_OK)], 46), -2.1)
        self.au_mot("c'est 0,4")
        self.poser_lignes(lg, "fade", 0.3)
        self.attendre_voix()

    # ── 07 : avec des relatifs (−3/5 ÷ 9/10) ────────────────────────────────
    def ecran_relatifs(self):
        self.ecran("07-relatifs")
        self.au_mot("Avec des relatifs")
        tit = self.titre("Avec des relatifs")
        e = expression("−", (3, 5), "÷", (9, 10), fs=64).move_to(P(-3.2, 1.6))
        self.montre(["moins 3 cinquièmes divisé", "par 9 dixièmes"], [e[:2], e[2:]])
        e2 = expression("=", "−", (3, 5), "×", (10, 9, VERT_OK), fs=64).move_to(P(-3.0, -0.4))
        self.montre(["égale moins 3", "fois 10 neuvièmes"], [e2[:3], e2[3:]])
        regle = self.col(self.t("− × + → −", 50, ROUGE_ERREUR), 2.2)
        pas_audit(regle)
        self.au_mot("Moins fois plus")
        self.play(FadeIn(regle, shift=RIGHT * 0.15), run_time=0.35)
        self.au_mot("3 fois 10")
        self.calc([("3 × 10 =", WHITE), ("30", BLEU_CALCUL)], 1.1, 44)
        self.au_mot("5 fois 9")
        self.calc([("5 × 9 =", WHITE), ("45", BLEU_CALCUL)], 0.1, 44)
        f = EcritureFraction(30, 45, fs=56)
        g = EcritureFraction(2, 3, fs=56, couleur=VERT_OK)
        res = VGroup(Text("−", font_size=56), f, Text("= −", font_size=56), g).arrange(RIGHT, buff=0.25)
        for m in (res[0], res[2]):
            m.sans_synchro = True
        self.col(res, -1.5)
        self.au_nb("Moins 30")
        self.play(FadeIn(res[:2], scale=1.2), run_time=0.35)
        self.au_nb("par 15, moins 2")
        self.play(FadeIn(res[2:], scale=1.3), run_time=0.35)
        self.play(Create(self.encadrer(res[2:], buff=0.12)), run_time=0.3)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (1/2 ÷ 1/4) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        b = self.barre(4, 2, 0.4)

        def avant(sc):
            sc.play(FadeIn(b), run_time=0.3)

        def apres(sc):
            sc.au_mot("1 demi fois 4")
            sc.rep(0)
            sc.au_mot("Dans 1 demi")
            sc.rep(1, avec=[Create(b.groupes(1)[:2])])
            sc.rep_fin()

        self.question_pause("08-question", "08b-reponse", ["1 demi", "÷ 1 quart ?"],
                            [self.inline("1/8"), self.inline("2"), self.inline("1/2")], 1,
                            ["1/2 × 4 = 4/2 = 2", "Dans 1/2, il y a 2 quarts !"], mot_q="1 demi", avant_q=avant,
                            autres_r=apres)

    # ── 09 : défi (6 L en flacons de 3/4 L) ─────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        t = self.titre("À toi de jouer !", fs=50)
        bts = VGroup(*[bouteille(1.5, 0.75, 1.0, couleur=BLEU_PART) for _ in range(6)]).arrange(RIGHT, buff=0.15)
        bts.move_to(P(-3.4, 0.6))
        self.au_nb("Amina a 6")
        l1 = self.col(self.t("6 L de solution", 42, BLEU_PART), 1.8)
        l1.sans_synchro = True
        self.play(LaggedStart(*[FadeIn(b, shift=UP * 0.2) for b in bts], lag_ratio=0.1), FadeIn(l1), run_time=0.6)
        l2 = VGroup(self.t("flacons de", 40), EcritureFraction(3, 4, fs=54), self.t("L", 40)).arrange(RIGHT, buff=0.2)
        self.col(l2, 0.5)
        for m in l2.get_family():
            m.sans_synchro = True
        fl = VGroup(*[fiole(couleur=BLEU_PART, plein=False, s=0.5) for _ in range(5)]).arrange(RIGHT, buff=0.2)
        fl.move_to(P(-3.4, -1.5))
        self.au_nb("flacons de 3")
        self.play(FadeIn(l2, scale=1.1), FadeIn(fl), run_time=0.45)
        self.au_mot("Combien de flacons")
        q = self.col(self.t("Combien de flacons ?", 40, ORANGE_RETENUE), -0.7)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.35)
        self.pause_defi(y=-1.8)

    def ecran_correction(self):
        self.ecran("10-correction", 0.65)
        t = self.titre("Correction", fs=50)
        barres = VGroup(*[Barre(4, 4, largeur=3.6, hauteur=0.36, couleur=BLEU_PART, marge=0.08, sw=2)
                          for _ in range(6)]).arrange(DOWN, buff=0.1).move_to(P(-3.6, -0.2))
        self.add(barres)
        e = expression("6", "÷", (3, 4), "=", "6", "×", (4, 3, VERT_OK), fs=54)
        self.col(e, 1.9)
        self.montre(["6 divisé", "par 3 quarts", "égale 6", "fois 4 tiers"], [e[0], e[1:3], e[3:5], e[5:]])
        self.au_mot("6 fois 4", n=2)
        self.calc([("6 × 4 =", WHITE), ("24", BLEU_CALCUL)], 0.6, 46)
        self.au_mot("24 tiers")
        f = EcritureFraction(24, 3, fs=56)
        res = VGroup(Text("=", font_size=56), f, Text("= 8", font_size=56, color=VERT_OK)).arrange(RIGHT, buff=0.25)
        for m in (res[0], res[2]):
            m.sans_synchro = True
        self.col(res, -0.75)
        self.play(FadeIn(res[:2], scale=1.2), run_time=0.35)
        self.au_nb("On simplifie par 3 : 8")
        # les 24 quarts, rangés par 3 : 8 flacons de 3/4 L
        teintes = [BLEU_PART, VERT_PART]
        anims = []
        for k in range(24):
            r, c = divmod(k, 4)
            anims.append(barres[r].parts[c].animate.set_fill(teintes[(k // 3) % 2], 1))
        self.play(FadeIn(res[2], scale=1.3), LaggedStart(*anims, lag_ratio=0.03), run_time=0.8)
        self.au_mot("Amina remplit")
        r8 = self.col(self.t("8 flacons !", 50, VERT_OK), -2.1)
        self.play(FadeIn(r8, scale=1.3), run_time=0.35)
        self.play(Create(self.encadrer(r8, buff=0.12)), run_time=0.3)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        fig = VGroup(expression((3, 4), "÷", (1, 8), fs=46), expression("=", (3, 4), "×", (8, 1, VERT_OK), fs=46),
                     expression("=", "6", fs=46)).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("Diviser par une fraction,", "c'est × par son inverse."),
                                                         ("On retourne seulement", "la deuxième fraction."),
                                                         ("Règle des signes,", "puis on simplifie."),
                                                         ("÷ par moins qu'1 :", "ça donne plus grand !")], fs=34)
        self.au_mot("Diviser par une fraction")
        self.montrer_ligne(lignes[0])
        self.au_mot("On retourne seulement")
        self.montrer_ligne(lignes[1])
        self.au_mot("On applique")
        self.montrer_ligne(lignes[2])
        for x in lignes[3].get_family():
            x.sans_synchro = True
        self.au_nb("plus petite qu'1")
        self.play(Create(lignes[3][0]), FadeIn(lignes[3][1], shift=RIGHT * 0.2), run_time=0.4)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_compter()
        self.ecran_regle()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_entier()
        self.ecran_relatifs()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class FracDiviser4e(FracDiviserBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
