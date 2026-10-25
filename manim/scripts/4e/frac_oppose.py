# frac_oppose.py
# EleveAI — Maths 4e — série « Fractions », épisode 11 : L'OPPOSÉ D'UNE FRACTION
# (micro du coach : fraction_oppose, notion fraction_calcul), AVEC VOIX.
# Paysage 16:9, CEINTURE VERTE : la paysage complète du niveau 4e (même
# distance à 0 de l'autre côté, somme nulle, place du signe « − », le piège
# opposé / inverse, défi corrigé qui passe par simplifier → décimal).
# Short jumeau : frac_oppose_short.py (le tir à la corde, blanche).
#
# Décor et métier : la MER ; Manon, CAPITAINE DE PORT, lit l'échelle de marée :
# 0 = niveau moyen ; marée haute +3/4 m, marée basse −3/4 m. Défi : −6/15 m
# au lever du jour, niveau opposé à midi → 2/5 = 0,4 m = 40 cm.
# Chiffres inventés (aucune donnée du monde réel citée).
# Centres d'intérêt : nature-ecologie, sciences.
# Vérifié (Python) : 3/4 + (−3/4) = 0 ; −3 ÷ 4 = 3 ÷ (−4) = −0,75 ;
# (−3)/(−4) = 3/4 ; inverse de 3/4 = 4/3 (3/4 × 4/3 = 1) ; 2/(−7) = −2/7 ;
# −6/15 = −2/5 ; 2 ÷ 5 = 0,4.
#
# Micro → écrans (banque 4e/maths/fractions.bank.ts) : fixed_1/3 et tpl_2
# « on change le signe » (02, 03), fixed_4 et open_1 « somme nulle » (04),
# fixed_2 et tpl_3 « opposé d'un négatif » (QUESTION 1), tirerOppose formes
# « num » / « den » : (−3)/4 = 3/(−4) = −3/4 (06, QUESTION 2), fixed_5
# opposé ≠ inverse (07). Leurres : l'inverse (9/5), la même fraction (−5/9).
# Écrans : 00 garde · 01 Manon et l'échelle de marée · 02 le signe · 03 la
# droite graduée · 04 la somme vaut 0 · 05 QUESTION 1 · 06 où placer le « − »
# · 07 le piège opposé / inverse · 08 QUESTION 2 · 09 défi · 09b correction ·
# 10 ce que tu as appris · 11 fin.
#
# ⭐ Bases : 4e/frac_lotf_commun.py (PaysageF, moins_frac) ; canvas_fractions.py
# (non modifié). Voix : manim/voix/4e-frac-oppose.json (débit −10), WAV dans
# public/sons/4e-frac-oppose/ ; marques : 4e/frac_oppose_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/frac_oppose.py FracOppose4e
# python -m manim render -qh --disable_caching manim/scripts/4e/frac_oppose.py FracOppose4e -o eleveai-maths-4e-frac-oppose --media_dir manim/scripts/4e/media-frac-oppose
# Sortie : manim/sorties/4e/maths/fractions/11-oppose/eleveai-maths-4e-frac-oppose.mp4

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotf_commun import *  # noqa: E402,F403

MER = "#0ea5e9"
HAUT_C, BAS_C = "#4ade80", "#f472b6"   # au-dessus du 0 / au-dessous du 0
XR, Y0, U = -2.7, -0.25, 2.4           # l'échelle de marée : x, le 0, unités par mètre


def capitaine(s=1.0):
    """Manon : vareuse bleu marine, casquette blanche à visière."""
    p = personnage(peau="#e0ac69", haut="#1e3a8a", cheveux="#7c2d12", longs=True, s=s)
    cas = VGroup(Rectangle(width=0.95, height=0.22, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(0, 0.42)),
                 Rectangle(width=1.1, height=0.07, fill_color="#111827", fill_opacity=1, stroke_width=0)
                 .move_to(P(0.1, 0.3)),
                 Dot(P(0, 0.44), radius=0.06, color="#facc15"))
    return VGroup(p, cas.scale(s, about_point=ORIGIN))


def y_de(v):
    return Y0 + U * v


def echelle():
    """L'échelle de marée : une règle verticale de −1 m à 1 m, graduée en quarts."""
    regle = Rectangle(width=0.5, height=U * 2 + 0.3, fill_color="#f8fafc", fill_opacity=1, stroke_color=BORD,
                      stroke_width=3).move_to(P(XR, Y0))
    ticks = VGroup(*[Line(P(XR - 0.25, y_de(k / 4)), P(XR + (0.05 if k % 4 else 0.25), y_de(k / 4)), color=BORD,
                          stroke_width=4 if k % 4 else 6) for k in range(-4, 5)])
    zero = Line(P(XR - 0.25, Y0), P(XR + 0.25, Y0), color=ROUGE_ZERO, stroke_width=8)
    lab = VGroup(*[texte(t, 26, color=ROUGE_ZERO if t == "0" else WHITE) for t in ("1", "0", "−1")])
    for t, v in zip(lab, (1, 0, -1)):
        t.next_to(P(XR - 0.3, y_de(v)), LEFT, buff=0.12)
        t.set_color(ROUGE_ZERO if v == 0 else WHITE)
    g = VGroup(regle, ticks, zero, lab)
    g.zero, g.lab = zero, lab
    pas_audit(VGroup(lab[0], lab[2]))
    return g


def eau(v):
    """La mer jusqu'au niveau v (en mètres), derrière l'échelle."""
    bas = Y0 - U - 0.6
    h = y_de(v) - bas
    return Rectangle(width=2.6, height=h, fill_color=MER, fill_opacity=0.45, stroke_width=0) \
        .move_to(P(XR, bas + h / 2))


def droite_pm(longueur=8.0, centre=ORIGIN, n=8):
    """La droite graduée du coach, de −1 à 1."""
    d = Droite(-1, 1, n, etiquettes={-1: "−1", 0: "0", 1: "1"}, longueur=longueur, centre=centre)
    return d


class FracOpposeBase(PaysageF):
    nom_voix = "4e-frac-oppose"
    fichier_marques = "frac_oppose_marques.json"

    def L(self, specs, y, fs=40, x=None, buff=0.18):
        g = self.ligne_mots(specs, fs=fs, buff=buff)
        self.col(g, y)
        if x is not None:
            g.set_x(x)
        self.jouer_mots(g)
        return g

    def fr_(self, num, den, fs=48, c=WHITE, moins=False):
        return moins_frac(num, den, fs=fs, couleur=c) if moins else EcritureFraction(num, den, fs=fs, couleur=c)

    def repere(self, v, txt_c, moins=False, fs=36):
        """Un trait de niveau sur l'échelle + la fraction à droite de l'échelle."""
        c = HAUT_C if v > 0 else BAS_C
        tr = Line(P(XR - 0.45, y_de(v)), P(XR + 0.45, y_de(v)), color=c, stroke_width=8)
        f = self.fr_(3, 4, fs, c, moins).next_to(P(XR + 0.5, y_de(v)), RIGHT, buff=0.15)
        f.shift(UP * (y_de(v) - f.trait.get_y()))
        return tr, f

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("L'opposé d'une fraction", self.identite, self.ceinture, y_ech=-2.7)
        d = droite_pm(7.0, P(-0.6, -0.3))
        self.au_mot("L'opposé")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(d), run_time=0.8)
        self.au_mot("De l'autre côté")
        a = CurvedArrow(d.p(0.5) + UP * 0.35, d.p(-0.5) + UP * 0.35, angle=TAU / 5, color=AMBRE, stroke_width=6)
        self.play(Create(a), Flash(d.p(0), color=ROUGE_ZERO), run_time=0.8)
        self.attendre_voix(marge=0.8)

    # ── 01 : Manon et l'échelle de marée ────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = capitaine(1.05).move_to(P(-5.5, -1.0))
        self.au_mot("Voici Manon")
        nom = self.col(self.t("Manon", 44, BLEU_CALCUL), 2.9)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("capitaine de port")
        met = self.col(self.t("capitaine de port", 32, BLEU_CALCUL), 2.3)
        self.play(FadeIn(met, shift=UP * 0.2), run_time=0.4)
        ech = echelle()
        self.au_mot("l'échelle de marée")
        self.play(FadeIn(ech[:2]), FadeIn(ech.lab[0]), FadeIn(ech.lab[2]), run_time=0.6)
        l0 = self.L([("0", ROUGE_ZERO, "0, c'est", lambda: [Create(ech.zero), FadeIn(ech.lab[1], scale=1.5)]), ("= niveau moyen de la mer", WHITE, "niveau moyen")], 1.45, fs=34)
        mer = eau(0)
        self.add(mer)
        self.bring_to_front(ech)
        mer.set_opacity(0)
        self.au_mot("marée haute")
        self.play(mer.animate.become(eau(0.75)), run_time=1.0)
        tr, f = self.repere(0.75, None)
        lh = self.ligne_mots([("marée haute :", HAUT_C, None), (self.fr_(3, 4, 46, HAUT_C), WHITE, "3 quarts de mètre au"),
                              ("m au-dessus", WHITE, None)], fs=34)
        self.col(lh, 0.4)
        lh.extras[1] = lambda: [Create(tr), FadeIn(f)]
        self.jouer_mots(lh)
        self.au_mot("marée basse")
        self.play(mer.animate.become(eau(-0.75)), run_time=1.0)
        tb, g = self.repere(-0.75, None)
        lb = self.ligne_mots([("marée basse :", BAS_C, None), (self.fr_(3, 4, 46, BAS_C), WHITE, ("3 quarts", 2)),
                              ("m au-dessous", WHITE, None)], fs=34)
        self.col(lb, -0.75)
        lb.extras[1] = lambda: [Create(tb), FadeIn(g)]
        self.jouer_mots(lb)
        self.au_mot("Comment l'écrire")
        q = self.col(self.ligne([("Comment", WHITE), ("l'écrire", ORANGE_RETENUE), ("?", ORANGE_RETENUE)], 40), -1.9)
        self.play(FadeIn(q, scale=0.8), run_time=0.4)
        self.attendre_voix()
        self.decor = (ech, mer, tr, f, tb, g)

    # ── 02 : le signe ───────────────────────────────────────────────────────
    def ecran_signe(self):
        ech, mer, tr, f, tb, g = self.decor
        self.ecran("02-signe")
        self.add(mer, ech, tr, f, tb, g)
        tit = self.col(self.t("Avec un signe", 44, JAUNE_TITRE), 2.95)
        self.au_mot("Au-dessus du 0")
        self.play(Write(tit), Indicate(VGroup(tr, f), color=HAUT_C), run_time=0.5)
        self.L([("au-dessus :", HAUT_C, None), (self.fr_(3, 4, 54, HAUT_C), WHITE, ("3 quarts", 1))], 1.8)
        self.au_mot("Au-dessous")
        self.play(Indicate(VGroup(tb, g), color=BAS_C), run_time=0.5)
        g2 = self.fr_(3, 4, 46, BAS_C, moins=True).move_to(g, LEFT)
        g2.shift(UP * (g.trait.get_y() - g2.trait.get_y()))
        self.L([("au-dessous :", BAS_C, None), (self.fr_(3, 4, 54, BAS_C, moins=True), WHITE, "3 quarts. Même",
                                                 lambda: [Transform(g, g2)])], 0.55)
        self.au_mot("Même distance")
        acc1 = BraceBetweenPoints(P(XR + 1.75, y_de(0.75)), P(XR + 1.75, Y0), RIGHT, color=HAUT_C)
        acc2 = BraceBetweenPoints(P(XR + 1.75, Y0), P(XR + 1.75, y_de(-0.75)), RIGHT, color=BAS_C)
        self.play(GrowFromCenter(acc1), GrowFromCenter(acc2), run_time=0.6)
        ld = self.col(self.t("même distance au 0", 36, AMBRE), -0.6)
        self.play(FadeIn(ld, shift=UP * 0.15), run_time=0.4)
        lo = self.ligne_mots([(self.fr_(3, 4, 50, HAUT_C), WHITE, ("3 quarts et", 1)), ("et", WHITE, None),
                              (self.fr_(3, 4, 50, BAS_C, moins=True), WHITE, "3 quarts sont")], fs=38)
        self.col(lo, -1.75)
        self.jouer_mots(lo)
        self.au_mot("nombres opposés")
        op = self.col(self.t("sont des nombres opposés", 36, VERT_OK), -2.75)
        self.play(FadeIn(op, scale=1.1), run_time=0.4)
        self.play(Create(self.encadrer(VGroup(lo, op), buff=0.15)), run_time=0.4)
        self.attendre_voix()

    # ── 03 : la droite graduée ──────────────────────────────────────────────
    def ecran_droite(self):
        self.ecran("03-droite")
        d = droite_pm(9.0, P(-0.4, 1.3))
        # la carte du coach, allongée vers le bas pour loger les accolades (canvas_fractions.py non modifié)
        grande = RoundedRectangle(width=d.carte.width, height=d.carte.height + 0.4, corner_radius=0.22, fill_color=CARTE,
                                  fill_opacity=1, stroke_color=GRILLE, stroke_width=3).align_to(d.carte, UP)
        grande.set_x(d.carte.get_x())
        d.carte.set_opacity(0)
        self.au_mot("droite graduée")
        self.play(FadeIn(grande, shift=UP * 0.2), FadeIn(d, shift=UP * 0.2), run_time=0.6)
        self.au_mot("3 quarts et")
        ph = d.point(0.75, "3/4", couleur=HAUT_C)
        self.play(FadeIn(ph, shift=DOWN * 0.2), run_time=0.35)
        self.au_mot("3 quarts sont")
        pb = d.point(-0.75, "−3/4", couleur=BAS_C)
        self.play(FadeIn(pb, shift=DOWN * 0.2), run_time=0.35)
        self.au_mot("symétriques")
        a1 = BraceBetweenPoints(d.p(0), d.p(0.75), DOWN, color=HAUT_C).shift(DOWN * 0.75)
        a2 = BraceBetweenPoints(d.p(-0.75), d.p(0), DOWN, color=BAS_C).shift(DOWN * 0.75)
        miroir = DashedLine(d.p(0) + UP * 1.3, d.p(0) + DOWN * 1.2, color=ROUGE_ZERO, stroke_width=4)
        self.play(GrowFromCenter(a1), GrowFromCenter(a2), Create(miroir), run_time=0.7)
        l1 = self.ligne_mots([("l'opposé de", WHITE, "L'opposé de 3"), (self.fr_(3, 4, 42), WHITE, ("3 quarts, c'est", 1)),
                              ("est", WHITE, None), (self.fr_(3, 4, 42, VERT_OK, moins=True), WHITE, "3 quarts. Et")],
                             fs=38)
        l1.move_to(P(-0.4, -0.98))
        self.jouer_mots(l1)
        l2 = self.ligne_mots([("l'opposé de", WHITE, "l'opposé de moins"),
                              (self.fr_(3, 4, 42, moins=True), WHITE, ("3 quarts, c'est", 2)),
                              ("est", WHITE, None), (self.fr_(3, 4, 42, VERT_OK), WHITE, "3 quarts. On")], fs=38)
        l2.move_to(P(-0.4, -2.08))
        self.jouer_mots(l2)
        self.au_mot("On change seulement le signe")
        r = self.t("On change seulement le signe !", 34, AMBRE).move_to(P(-0.6, -3.0))
        self.play(FadeIn(r, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 04 : la somme de deux opposés vaut 0 ────────────────────────────────
    def ecran_somme(self):
        self.ecran("04-somme")
        d = droite_pm(9.0, P(-0.4, 1.3))
        self.add(d)
        self.au_mot("La mer monte")
        f1 = Arrow(d.p(0) + UP * 0.5, d.p(0.75) + UP * 0.5, buff=0, color=HAUT_C, stroke_width=8)
        self.play(GrowArrow(f1), run_time=0.8)
        self.au_mot("redescend")
        f2 = Arrow(d.p(0.75) + UP * 1.0, d.p(0) + UP * 1.0, buff=0, color=BAS_C, stroke_width=8)
        self.play(GrowArrow(f2), run_time=0.8)
        self.au_mot("revient au 0")
        self.play(Flash(d.p(0), color=ROUGE_ZERO, flash_radius=0.4), Indicate(d.etiquettes[0], color=ROUGE_ZERO),
                  run_time=0.6)
        lg = self.ligne_mots([(self.fr_(3, 4, 56, HAUT_C), WHITE, "3 quarts plus"), ("+ (", WHITE, None),
                              (self.fr_(3, 4, 56, BAS_C, moins=True), WHITE, "3 quarts, égale"), (")", WHITE, None),
                              ("= 0", VERT_OK, "0. La")], fs=48, buff=0.15)
        lg.move_to(P(-0.4, -1.0))
        self.jouer_mots(lg)
        self.play(Create(self.encadrer(lg)), run_time=0.4)
        r = self.ligne_mots([("somme de deux opposés", WHITE, "La somme"), ("= 0", VERT_OK, ("0.", 3))], fs=40)
        r.move_to(P(-0.6, -2.5))
        self.jouer_mots(r)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (opposé de −5/9) ────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        d = droite_pm(4.3, P(-3.5, 0.0), n=18)

        def montrer(sc):
            sc.play(FadeIn(d), run_time=0.4)

        def points():
            return [FadeIn(d.point(-5 / 9, "−5/9", couleur=BAS_C, fs=28), run_time=0.3),
                    FadeIn(d.point(5 / 9, "5/9", couleur=HAUT_C, fs=28), run_time=0.3)]

        self.question_b("05-question", "05b-reponse", ["Quel est l'opposé", "de −5/9 ?"],
                        [bloc_fixe(self.inline("9/5")), bloc_fixe(self.inline("5/9")), bloc_fixe(self.inline("−5/9"))], 1,
                        [[("On change seulement le signe :", WHITE, "On change")],
                         [("−5/9", BAS_C, "5 neuvièmes devient", points), ("→", WHITE, None),
                          ("5/9", HAUT_C, "5 neuvièmes. Leur")],
                         [("somme = 0", VERT_OK, "0.")]],
                        mot_q="Quel est", avant_q=lambda sc: (montrer(sc), sc.q_au_mot("5 neuvièmes ?")))

    # ── 06 : où placer le signe « − » ───────────────────────────────────────
    def ecran_signes(self):
        self.ecran("06-signes")
        self.au_mot("Sur la tablette")
        tab = RoundedRectangle(width=12.4, height=1.9, corner_radius=0.25, fill_color="#0b1220", fill_opacity=1,
                               stroke_color=MER, stroke_width=5).move_to(P(-0.2, 2.15))
        self.play(FadeIn(tab, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("en haut")
        fh = self.t("en haut", 30, AMBRE).move_to(P(-4.4, 1.0))
        self.play(FadeIn(fh), run_time=0.3)
        self.au_mot("en bas")
        fb = self.t("en bas", 30, AMBRE).move_to(P(-1.4, 1.0))
        self.play(FadeIn(fb), run_time=0.3)
        fa = EcritureFraction("−3", 4, fs=60).move_to(P(-4.4, 2.15))
        fbb = EcritureFraction(3, "−4", fs=60).move_to(P(-1.4, 2.15))
        e1 = self.mor("=", 60).move_to(P(-2.9, 2.15))
        e2 = self.mor("=", 60).move_to(P(0.1, 2.15))
        fc = moins_frac(3, 4, fs=60, couleur=VERT_OK).move_to(P(1.7, 2.15))
        l1 = self.ligne_mots([("−3 ÷", WHITE, "3 divisé par 4", lambda: [FadeIn(fa, scale=1.2)]),
                              ("4", WHITE, "4, égale moins"), ("= −0,75", BLEU_CALCUL, ("0,75", 1))], fs=40)
        l1.move_to(P(-2.9, 0.15))
        self.jouer_mots(l1)
        l2 = self.ligne_mots([("3 ÷", WHITE, "3 divisé par moins", lambda: [FadeIn(fbb, scale=1.2)]),
                              ("(−4)", WHITE, "4, égale aussi"), ("= −0,75", BLEU_CALCUL, ("0,75", 2))], fs=40)
        l2.move_to(P(-2.9, -0.8))
        self.jouer_mots(l2)
        self.au_mot("Les trois écritures")
        self.play(FadeIn(e1), FadeIn(e2), FadeIn(pas_audit(fc), scale=1.2), run_time=0.5)
        self.au_mot("un seul signe moins")
        r = self.t("un seul signe « − » suffit", 36, VERT_OK).move_to(P(-2.6, -1.8))
        self.play(FadeIn(r, shift=UP * 0.15), Circumscribe(fc, color=VERT_OK), run_time=0.6)
        self.au_mot("avec 2 signes")
        fd = pas_audit(EcritureFraction("−3", "−4", fs=56)).move_to(P(3.4, -0.4))
        self.play(FadeIn(fd, scale=1.2), run_time=0.4)
        self.au_mot("s'annulent")
        self.play(Indicate(VGroup(fd.num, fd.den), color=AMBRE, scale_factor=1.3), run_time=0.5)
        lg = self.ligne_mots([("=", WHITE, None), (self.fr_(3, 4, 56, VERT_OK), WHITE, "3 quarts.")], fs=50)
        lg.next_to(fd, RIGHT, buff=0.3)
        lg.shift(UP * (fd.trait.get_y() - lg[1].trait.get_y()))
        self.jouer_mots(lg)
        self.attendre_voix()

    # ── 07 : le piège : l'opposé n'est pas l'inverse ────────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.titre("Attention au piège !", ROUGE_ERREUR, fs=44, y=3.0, centre=True)
        self.au_mot("L'opposé n'est pas")
        to = self.t("L'opposé", 42, VERT_OK).move_to(P(-3.4, 1.9))
        ti = self.t("L'inverse", 42, BLEU_CALCUL).move_to(P(2.6, 1.9))
        ne = self.t("≠", 60, ROUGE_ERREUR).move_to(P(-0.4, 1.9))
        self.play(FadeIn(to), FadeIn(ne), FadeIn(ti), run_time=0.5)
        a = self.ligne_mots([(self.fr_(3, 4, 54), WHITE, ("3 quarts, c'est", 1)), ("→", WHITE, None),
                             (self.fr_(3, 4, 54, VERT_OK, moins=True), WHITE, "3 quarts : leur")], fs=44)
        a.move_to(P(-3.4, 0.55))
        self.jouer_mots(a)
        sa = self.ligne_mots([("somme = 0", VERT_OK, "0. L'inverse")], fs=38).move_to(P(-3.4, -0.75))
        self.jouer_mots(sa)
        b = self.ligne_mots([(self.fr_(3, 4, 54), WHITE, ("3 quarts, c'est", 2)), ("→", WHITE, None),
                             (self.fr_(4, 3, 54, BLEU_CALCUL), WHITE, "4 tiers")], fs=44)
        b.move_to(P(2.6, 0.55))
        self.jouer_mots(b)
        self.au_mot("on retourne")
        self.play(Indicate(b[2], color=BLEU_CALCUL, scale_factor=1.3), run_time=0.5)
        sb = self.ligne_mots([("produit = 1", BLEU_CALCUL, "1. Retourner")], fs=38).move_to(P(2.6, -0.75))
        self.jouer_mots(sb)
        self.au_mot("Retourner la fraction")
        r = self.t("Retourner la fraction ne donne pas l'opposé !", 34, ROUGE_ERREUR).move_to(P(-0.6, -2.1))
        self.play(FadeIn(r, shift=UP * 0.2), run_time=0.5)
        self.play(Create(self.encadrer(r, ROUGE_ERREUR)), run_time=0.4)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (opposé de 2/(−7)) ──────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        d = droite_pm(4.3, P(-3.5, 0.0), n=14)

        def montrer(sc):
            sc.play(FadeIn(d), run_time=0.4)

        def points():
            return [FadeIn(d.point(-2 / 7, "−2/7", couleur=BAS_C, fs=28), run_time=0.3)]

        def point2():
            return [FadeIn(d.point(2 / 7, "2/7", couleur=HAUT_C, fs=28), run_time=0.3)]

        fq = EcritureFraction(2, "−7", fs=64).move_to(P(-3.5, 2.2))

        def poser_fq(sc):
            montrer(sc)
            sc.au_mot("2 sur")
            sc.play(FadeIn(VGroup(fq.num, fq.trait), scale=1.2), run_time=0.3)
            sc.au_mot("7 ? A")
            sc.play(FadeIn(fq.den, scale=1.2), run_time=0.3)

        self.question_b("08-question", "08b-reponse", ["Quel est l'opposé", "de cette fraction ?"],
                        [bloc_fixe(self.inline("−2/7")), bloc_fixe(self.inline("2/7")), bloc_fixe(self.inline("7/2"))], 1,
                        [[(EcritureFraction(2, "−7", fs=40), WHITE, "2 sur moins 7 égale"), ("= −2/7", BAS_C, "2 septièmes. Son", points)],
                         [("son opposé :", WHITE, "Son opposé"), ("2/7", HAUT_C, ("2 septièmes.", 2), point2)]],
                        mot_q="Quel est", avant_q=poser_fq)

    # ── 09 : défi (−6/15 m → niveau opposé, en décimal) ─────────────────────
    def tablette(self):
        t = RoundedRectangle(width=2.6, height=1.6, corner_radius=0.2, fill_color="#0b1220", fill_opacity=1,
                             stroke_color=MER, stroke_width=5).move_to(P(-5.3, 2.0))
        return t

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        self.titre("À toi de jouer !", fs=50, y=3.05, centre=True)
        ech = echelle()
        self.add(ech, eau(-0.4))
        self.bring_to_front(ech)
        tab = self.tablette()
        self.au_mot("la tablette")
        self.play(FadeIn(tab, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("6 quinzièmes")
        v = moins_frac(6, 15, fs=46, couleur=BAS_C).move_to(tab).shift(LEFT * 0.25)
        m = self.mor("m", 36, BAS_C).next_to(v, RIGHT, buff=0.15)
        self.play(FadeIn(VGroup(v, m), scale=1.2), run_time=0.4)
        self.au_mot("À midi")
        lm = self.col(self.ligne([("À midi :", WHITE), ("niveau opposé", ORANGE_RETENUE)], 38), 1.6)
        self.play(FadeIn(lm, shift=RIGHT * 0.15), run_time=0.4)
        self.au_mot("en nombre décimal")
        q = self.col(self.ligne([("en nombre", WHITE), ("décimal ?", ORANGE_RETENUE)], 40), 0.5)
        self.play(FadeIn(q, scale=0.8), run_time=0.4)
        self.au_mot("Simplifie d'abord")
        s = self.col(self.t("Simplifie d'abord !", 36, AMBRE), -0.6)
        self.play(FadeIn(s, shift=UP * 0.15), run_time=0.4)
        self.pause_defi(y=-1.8)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.05))
        ech = echelle()
        mer = eau(-0.4)
        self.add(ech)
        self.add(mer)
        self.bring_to_front(ech)
        self.play(Write(tit), run_time=0.5)
        self.L([("6 et", WHITE, "6 et"), ("15 :", WHITE, "15 sont"), ("table de 3", AMBRE, "3 :")], 2.0, fs=38)
        l2 = self.ligne_mots([(moins_frac(6, 15, fs=50), WHITE, "6 quinzièmes égale"), ("=", WHITE, None),
                              (moins_frac(2, 5, fs=50, couleur=BAS_C), WHITE, "2 cinquièmes. L'opposé")], fs=44)
        self.col(l2, 0.95)
        self.jouer_mots(l2)
        tb = Line(P(XR - 0.45, y_de(-0.4)), P(XR + 0.45, y_de(-0.4)), color=BAS_C, stroke_width=8)
        self.play(Create(tb), run_time=0.3)
        th = Line(P(XR - 0.45, y_de(0.4)), P(XR + 0.45, y_de(0.4)), color=HAUT_C, stroke_width=8)
        l3 = self.ligne_mots([("opposé :", WHITE, "L'opposé"),
                              (self.fr_(2, 5, 50, HAUT_C), WHITE, ("2 cinquièmes.", 2),
                               lambda: [mer.animate.become(eau(0.4)), Create(th)])], fs=40)
        self.col(l3, -0.2)
        self.jouer_mots(l3)
        self.L([("2 ÷", WHITE, "2 divisé"), ("5", WHITE, "5, égale"), ("= 0,4", BLEU_CALCUL, ("0,4. À", 1))], -1.2,
               fs=40)
        l5 = self.L([("0,4 m", VERT_OK, ("0,4 mètre", 1)), ("= 40 cm", VERT_OK, "40 centimètres")], -2.2, fs=38)
        self.play(Create(self.encadrer(l5)), run_time=0.4)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        d = droite_pm(4.3, P(-3.5, -0.6))
        fig = VGroup(d, pas_audit(d.point(0.75, "3/4", couleur=HAUT_C)), pas_audit(d.point(-0.75, "−3/4", couleur=BAS_C)))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("L'opposé : même distance", "à 0, de l'autre côté."),
                                                         ("On change seulement", "le signe."),
                                                         ("Un nombre + son opposé", "= 0."),
                                                         ("L'opposé n'est pas", "l'inverse.")], fs=34)
        mots = [("L'opposé d'une", "0, de l'autre"), ("on change", "le signe."), ("Un nombre", "0. Et"),
                ("Et l'opposé", "pas l'inverse")]
        for lg, (m1, m2) in zip(lignes, mots):
            for t in lg[1]:
                t.sans_synchro = True  # chaque ligne est posée AU MOT ci-dessous
            self.au_mot(m1)
            self.play(Create(lg[0]), FadeIn(lg[1][0], shift=RIGHT * 0.2), run_time=0.35)
            self.au_mot(m2)
            self.play(FadeIn(lg[1][1], shift=RIGHT * 0.2), run_time=0.35)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_signe()
        self.ecran_droite()
        self.ecran_somme()
        self.ecran_question1()
        self.ecran_signes()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class FracOppose4e(FracOpposeBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
