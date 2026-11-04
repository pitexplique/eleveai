# puissance_zero_negatif.py
# EleveAI — Maths 4e ET 2de (épisode COMMUN) — série « Puissances », épisode 04 :
# PUISSANCE ZÉRO PUIS EXPOSANT NÉGATIF. Paysage 16:9, AVEC VOIX.
# ⭐ Une voix, un script, DEUX rendus : PuissanceZeroNegatif4e (ceinture ORANGE)
# et PuissanceZeroNegatif2de (ceinture JAUNE). ⛔ L'écran 04b-quotient-2de
# (5³ ÷ 5³ = 1 = 5⁰) n'existe QUE dans la version 2de : la 4e l'enjambe (son
# WAV est généré pour tous, la 4e ne le joue pas).
# Micros couvertes : 4e `puissance_exposant_negatif` (+ la puissance zéro),
# 2de `puiss_exposant_negatif`.
# Code couleur constant : BLEU = la base, ORANGE = l'exposant, VERT = résultat
# juste, ROUGE = le piège (a⁰ = 0, exposant négatif = nombre négatif).
#
# Décor et métier : TECHNOLOGIE (une ingénieure en microélectronique, la puce
# d'un téléphone et ses pistes minuscules). Centres : technologie-ia, sciences.
#
# Écrans : garde (00) ; la puce (01) ; la table qui descend 10³ → 10¹ (02) ;
# 10⁰ = 1 (03) ; la table de 2 à côté, a⁰ = 1 (04) ; QUESTION 1 7⁰ (04q) ;
# [2de] 5³ ÷ 5³ = 5⁰ = 1 (04b) ; sous zéro 0,1 ; 0,01 ; 0,001 (05) ; le rang
# après la virgule (06) ; a⁻ⁿ = 1/aⁿ (07) ; QUESTION 2 10⁻² (07q) ; défi (08)
# et correction (08b) ; ce que tu as appris (09) ; fin (10).
#
# Voix : manim/voix/4e-puissance-zero-negatif.json (validée, débit −6), WAV
# dans public/sons/4e-puissance-zero-negatif/ ; marques :
# puissance_zero_negatif_marques.json (marques_dump.ps1 + cues2marques.py ;
# le 2e « 1 » de « moins 1 : 1 divisé » remis à la main, cues2marques le
# fusionnait).
# Outils : manim/scripts/6e/prop_commun.py (non modifié).
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/puissance_zero_negatif.py PuissanceZeroNegatif2de
# python -m manim render -qh --disable_caching manim/scripts/4e/puissance_zero_negatif.py PuissanceZeroNegatif4e -o eleveai-maths-4e-puissance-zero-negatif --media_dir manim/scripts/4e/media-puiss-04-4e
# python -m manim render -qh --disable_caching manim/scripts/4e/puissance_zero_negatif.py PuissanceZeroNegatif2de -o eleveai-maths-seconde-puissance-zero-negatif --media_dir manim/scripts/4e/media-puiss-04-seconde
# Sorties : manim/sorties/4e/maths/puissances/04-zero-negatif/eleveai-maths-4e-puissance-zero-negatif.mp4
#           manim/sorties/seconde/maths/puissances/04-zero-negatif/eleveai-maths-seconde-puissance-zero-negatif.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))  # le dossier du script EN TÊTE

from prop_commun import *  # noqa: E402,F403

BASE_C = BLEU_CALCUL       # la base
EXPO_C = ORANGE_RETENUE    # l'exposant
PIEGE = ROUGE_ERREUR
CIEL = "#93c5fd"           # les flèches « ÷ 10 »
OR = "#fbbf24"             # les pistes de la puce
X_P, X_EG, X_NB = -5.35, -3.7, -3.2   # colonnes de la table : puissance, « = », nombre


def T(s, fs=40, c=WHITE, audit=True):
    """Un texte posé AU MOT par le script ; audit=False : une donnée de figure
    (numéros des rangs) ou un rappel déjà dit."""
    t = Text(s, font_size=fs, color=c)
    t.sans_synchro = True
    if not audit:
        t._pas_audit = True
    return t


def puiss(b, e, fs=60, cb=BASE_C, ce=EXPO_C, audit=True):
    """Une puissance COMPOSÉE : la base, l'exposant plus petit en haut (.base .expo)."""
    base = T(str(b), fs, cb, audit)
    expo = T(str(e), fs * 0.6, ce, audit)
    expo.next_to(base, UR, buff=0.03).shift(DOWN * fs * 0.006)
    if str(b).isalpha() and str(b).islower():  # « a » : petite lettre, l'exposant monte au niveau des chiffres
        expo.shift(UP * fs * 0.0025)
    g = VGroup(base, expo)
    g.base, g.expo = base, expo
    return g


def frac(num, den, fs=50, c=WHITE):
    """Une fraction EMPILÉE : num et den (textes ou mobjects), le trait entre."""
    n = num if isinstance(num, Mobject) else T(num, fs, c)
    d = den if isinstance(den, Mobject) else T(den, fs, c)
    w = max(n.width, d.width) + 0.2
    trait = Line(LEFT * w / 2, RIGHT * w / 2, color=c, stroke_width=4)
    n.next_to(trait, UP, buff=0.12)
    d.next_to(trait, DOWN, buff=0.12)
    g = VGroup(n, trait, d)
    g.num, g.trait, g.den = n, trait, d
    return g


def sans_audit(m):
    for f in m.get_family():
        f._pas_audit = True
    return m


# ── les dessins ────────────────────────────────────────────────────────────

def ingenieure(s=1.0):
    p = personne(peau="#8d5524", tenue="#0e7490", cheveux="#111827", longs=True, s=s)
    p.add(lunettes(p))
    return p


def puce(c=1.5):
    """La puce : un carré sombre, ses pattes dorées sur les quatre côtés, un
    petit cœur gravé au centre."""
    corps = RoundedRectangle(width=c, height=c, corner_radius=0.08, fill_color="#1f2937", fill_opacity=1,
                             stroke_color="#64748b", stroke_width=3)
    pattes = VGroup()
    n = 6
    for k in range(n):
        u = -c / 2 + c * (k + 0.5) / n
        for dx, dy, w, h in ((u, c / 2 + 0.09, 0.07, 0.18), (u, -c / 2 - 0.09, 0.07, 0.18),
                             (c / 2 + 0.09, u, 0.18, 0.07), (-c / 2 - 0.09, u, 0.18, 0.07)):
            pattes.add(Rectangle(width=w, height=h, fill_color=OR, fill_opacity=1, stroke_width=0).move_to(P(dx, dy)))
    coeur = Square(side_length=c * 0.42, fill_color="#334155", fill_opacity=1, stroke_color=OR, stroke_width=2)
    g = VGroup(pattes, corps, coeur)
    g.coeur = coeur
    return g


def pistes(r=1.25, n=11, graine=4):
    """Ce qu'on voit à la loupe : des pistes fines et serrées (dans le cercle
    de rayon r), qui tournent à angle droit."""
    import random
    rd = random.Random(graine)
    g = VGroup()
    pas = 2 * r * 0.8 / (n - 1)
    for k in range(n):
        y = -r * 0.8 + k * pas
        demi = np.sqrt(max(r * r - y * y, 0)) - 0.12
        xc = rd.uniform(-demi * 0.4, demi * 0.4)
        y2 = y + (pas * 0.5 if k < n - 1 else 0)
        d2 = np.sqrt(max(r * r - y2 * y2, 0)) - 0.12
        g.add(VMobject(stroke_color=OR, stroke_width=2.2).set_points_as_corners(
            [P(-demi, y), P(xc, y), P(xc + pas * 0.5, y2), P(min(d2, demi), y2)]))
    return g


class PuissanceZeroNegatifBase(PaysageProp):
    nom_voix = "4e-puissance-zero-negatif"
    fichier_marques = "puissance_zero_negatif_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "orange"
    avec_2de = False  # l'écran 04b-quotient-2de

    def au(self, extrait, *anims, n=1, rt=0.35):
        """Au mot `extrait` (n-ième fois), joue les animations."""
        self.au_mot(extrait, n)
        if anims:
            self.play(*anims, run_time=rt)

    # ── une ligne de table : 10³ = 1 000 ───────────────────────────────────
    def ligne_table(self, b, e, nb, y, fs=54, audit=True, c_nb=WHITE, x0=0.0, de=0.0):
        p = puiss(b, e, fs=fs, audit=audit)
        eg = T("=", fs * 0.9, WHITE, audit)
        n = T(nb, fs * 0.92, c_nb, audit and " " not in nb)  # « 1 000 » : dit au mot, l'audit ne lit pas l'espace
        p.move_to(P(0, y)).align_to(P(X_P + x0, 0), LEFT)
        eg.move_to(P(X_EG + x0 + de, y))
        n.move_to(P(0, y)).align_to(P(X_NB + x0 + de, 0), LEFT)
        n.align_to(p.base, DOWN)
        g = VGroup(p, eg, n)
        g.p, g.eg, g.nb = p, eg, n
        return g

    def fleche_div(self, y1, y2, x, txt="÷ 10", fs=28, audit=True):
        """La flèche « ÷ 10 » qui descend d'une ligne à la suivante (à droite)."""
        f = CurvedArrow(P(x, y1 - 0.12), P(x, y2 + 0.12), angle=-PI * 0.7, color=CIEL, stroke_width=4,
                        tip_length=0.16)
        lab = T(txt, fs, CIEL, audit).next_to(f, RIGHT, buff=0.08)
        g = VGroup(f, lab)
        g.f, g.lab = f, lab
        return g

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Puissance zéro et exposant négatif", self.identite, self.ceinture,
                                       y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        sans_audit(ident)  # « Maths 2de » : l'identité, jamais dite
        self.au("Puissance", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.8)
        q1 = VGroup(T("Que vaut", 50), puiss(10, 0, fs=84), T("?", 60, EXPO_C)).arrange(RIGHT, buff=0.3)
        q1[2].align_to(q1[1].base, DOWN)
        q1.move_to(P(-3.0, 0.55))
        q2 = VGroup(T("Et", 50), puiss(10, "−3", fs=84), T("?", 60, EXPO_C)).arrange(RIGHT, buff=0.45)
        q2[2].align_to(q2[1].base, DOWN)
        q2.move_to(P(3.0, 0.55))
        self.au("Que vaut", FadeIn(q1[0], shift=RIGHT * 0.2), rt=0.3)
        self.au("10 puissance", FadeIn(q1[1].base, scale=1.3), rt=0.3)
        self.au("0 ?", FadeIn(q1[1].expo, scale=1.6), FadeIn(q1[2]), rt=0.35)
        self.insister(q1[1].expo, 1.6, 0.2, about=q1[1].expo.get_center())
        self.au("Et 10", FadeIn(q2[0], shift=RIGHT * 0.2), FadeIn(q2[1].base, scale=1.3), rt=0.35)
        self.au("3 ?", FadeIn(q2[1].expo, scale=1.6), FadeIn(q2[2]), rt=0.35)
        self.insister(q2[1].expo, 1.6, 0.2, about=q2[1].expo.get_center())
        self.attendre_voix(marge=0.6)

    # ── 01 : l'ingénieure et la puce ───────────────────────────────────────
    def ecran_puce(self):
        self.ecran("01-puce")
        p = ingenieure(0.7).move_to(P(-5.55, -1.85))
        met = VGroup(T("ingénieure en", 26, CIEL), T("microélectronique", 26, CIEL)).arrange(DOWN, buff=0.06)
        met.scale(0.92).next_to(p, UP, buff=0.15).align_to(P(-6.4, 0), LEFT)
        pc = puce(1.5).move_to(P(-2.55, -1.75))
        tel = RoundedRectangle(width=1.0, height=1.8, corner_radius=0.15, stroke_color="#94a3b8", stroke_width=3)
        tel.move_to(P(-0.4, -1.75))
        mini = puce(0.38).move_to(tel.get_center() + UP * 0.25)
        self.au("Une ingénieure", FadeIn(p, shift=UP * 0.3), FadeIn(met[0]), rt=0.45)
        self.au("microélectronique", FadeIn(met[1], shift=UP * 0.1), rt=0.3)
        self.au("dessine", FadeIn(pc, scale=0.6), rt=0.45)
        self.au("téléphones", Create(tel), FadeIn(mini, scale=0.5), rt=0.45)
        # la loupe : la puce agrandie, ses pistes fines
        loupe = Circle(radius=1.25, stroke_color=WHITE, stroke_width=4, fill_color="#0b1220", fill_opacity=1)
        loupe.move_to(P(-2.55, 1.55))
        manche = VGroup(DashedLine(pc.coeur.get_corner(UL), loupe.point_at_angle(PI * 1.2), color=GREY_B,
                                   stroke_width=2),
                        DashedLine(pc.coeur.get_corner(UR), loupe.point_at_angle(PI * 1.8), color=GREY_B,
                                   stroke_width=2))
        pis = pistes(1.25).move_to(loupe)
        self.au("Ses traits", Create(manche), GrowFromCenter(loupe), rt=0.4)
        l1 = VGroup(T("Ses traits sont minuscules :", 36), T("quelques milliardièmes", 36, EXPO_C),
                    T("de mètre", 36, EXPO_C)).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.col(l1, 2.0)
        self.au("minuscules", FadeIn(l1[0], shift=RIGHT * 0.2), Create(pis, lag_ratio=0.15), rt=0.7)
        self.au("quelques", FadeIn(l1[1], shift=RIGHT * 0.2), rt=0.35)
        self.au("de mètre", FadeIn(l1[2], shift=RIGHT * 0.2), rt=0.3)
        l2 = VGroup(T("Des nombres aussi petits ?", 36),
                    T("Les puissances de 10", 36, BASE_C),
                    T("descendent sous zéro.", 36, EXPO_C)).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.col(l2, -0.45)
        fl = Arrow(P(0, 0.4), P(0, -0.6), color=EXPO_C, stroke_width=8, buff=0,
                   max_tip_length_to_length_ratio=0.35).next_to(l2[2], RIGHT, buff=0.25)
        self.au("Pour écrire", FadeIn(l2[0], shift=RIGHT * 0.2), rt=0.35)
        self.au("10 descendent", FadeIn(l2[1], shift=RIGHT * 0.2), rt=0.35)
        self.au("descendent", FadeIn(l2[2], shift=DOWN * 0.2), GrowArrow(fl), rt=0.45)
        self.insister(l2[2], 1.12, 0.25)
        self.attendre_voix()

    # ── 02 : la table qui descend : 10³, 10², 10¹ ──────────────────────────
    YS = (2.15, 1.05, -0.05, -1.15)  # les lignes de la table (exposants 3, 2, 1, 0)
    X_FL = -1.0                       # les flèches « ÷ 10 »

    def ecran_table(self):
        self.ecran("02-table")
        tit = T("La table qui descend", 42, JAUNE_TITRE).move_to(P(-3.3, 3.15))
        self.au("Regarde", Write(tit), rt=0.5)
        self.rangs = {}
        mots = ((3, "1 000", "3 :", "1 000."), (2, "100", "2 :", "100."), (1, "10", "1 :", "10. À"))
        for k, (e, nb, mot_e, mot_n) in enumerate(mots):
            lg = self.ligne_table(10, e, nb, self.YS[k])
            self.rangs[e] = lg
            self.au("10 puissance", FadeIn(lg.p.base, shift=DOWN * 0.2), n=k + 1, rt=0.3)
            self.au(mot_e, FadeIn(lg.p.expo, scale=1.6), rt=0.3)
            self.au(mot_n, FadeIn(lg.eg), FadeIn(lg.nb, shift=DOWN * 0.2), rt=0.35)
        c1 = T("À chaque ligne :", 38).move_to(P(0, 1.9))
        c2 = VGroup(T("l'exposant baisse de", 38, EXPO_C), T("1", 38, EXPO_C)).arrange(RIGHT, buff=0.18)
        c3 = VGroup(T("on divise par", 38, CIEL), T("10", 38, CIEL)).arrange(RIGHT, buff=0.18)
        for m, y in ((c1, 1.9), (c2, 1.15), (c3, 0.4)):
            self.col(m, y)
        moins = VGroup(*[T("−1", 28, EXPO_C, audit=False).move_to(P(-5.85, (self.YS[k] + self.YS[k + 1]) / 2))
                         for k in range(2)])
        self.au("À chaque", FadeIn(c1, shift=RIGHT * 0.2), rt=0.35)
        self.au("l'exposant", FadeIn(c2[0], shift=RIGHT * 0.2),
                *[Indicate(r.p.expo, color=EXPO_C, scale_factor=1.6) for r in self.rangs.values()], rt=0.5)
        self.au("1, et", FadeIn(c2[1], scale=1.4), LaggedStart(*[FadeIn(m, scale=1.4) for m in moins],
                                                              lag_ratio=0.3), rt=0.5)
        self.fl10 = [self.fleche_div(self.YS[k], self.YS[k + 1], self.X_FL) for k in range(2)]
        self.au("on divise", FadeIn(c3[0], shift=RIGHT * 0.2),
                LaggedStart(*[Create(f.f) for f in self.fl10], lag_ratio=0.3), rt=0.4)
        self.au("10.", FadeIn(c3[1], scale=1.3), *[FadeIn(f.lab, shift=LEFT * 0.1) for f in self.fl10], n=2, rt=0.3)
        self.moins, self.col02 = moins, VGroup(c1, c2, c3)
        self.attendre_voix(marge=0.3)

    # ── 03 : 10 ÷ 10 = 1, donc 10⁰ = 1 (sur la même table) ────────────────
    def ecran_zero(self):
        self.dire("03-zero")
        r0 = self.ligne_table(10, 0, "1", self.YS[3], c_nb=VERT_OK)
        self.rangs[0] = r0
        f = self.fleche_div(self.YS[2], self.YS[3], self.X_FL)
        self.fl10.append(f)
        calc = VGroup(T("10 ÷", 40), T("10 =", 40), T("1", 44, VERT_OK)).arrange(RIGHT, buff=0.28)
        self.col(calc, -0.55)
        self.au("10 divisé", Create(f.f), FadeIn(calc[0], shift=RIGHT * 0.2),
                Indicate(self.rangs[1].nb, color=WHITE, scale_factor=1.3), rt=0.4)
        self.au("10 : 1", FadeIn(f.lab, shift=LEFT * 0.1), FadeIn(calc[1], shift=RIGHT * 0.2), rt=0.3)
        self.au("1. Donc", FadeIn(r0.nb, scale=1.5), FadeIn(calc[2], scale=1.4), rt=0.35)
        m3 = T("−1", 28, EXPO_C, audit=False).move_to(P(-5.85, (self.YS[2] + self.YS[3]) / 2))
        self.moins.add(m3)
        self.au("10 puissance", FadeIn(r0.p.base, shift=DOWN * 0.2), rt=0.3)
        self.au("0 égale", FadeIn(r0.p.expo, scale=1.8), FadeIn(r0.eg), FadeIn(m3, scale=1.4), rt=0.35)
        self.au("1. Pas", Indicate(r0.nb, color=VERT_OK, scale_factor=1.4), rt=0.4)
        pas = VGroup(T("Pas", 48, PIEGE), T("0", 52, PIEGE), T(":", 48), T("1 !", 52, VERT_OK)).arrange(RIGHT, buff=0.2)
        self.col(pas, -1.5)
        barre = Line(pas[1].get_corner(DL) + P(-0.08, -0.05), pas[1].get_corner(UR) + P(0.08, 0.05), color=WHITE,
                     stroke_width=7)
        self.au("Pas 0", FadeIn(pas[0], shift=RIGHT * 0.2), rt=0.2)
        self.au("0 : 1 !", FadeIn(pas[1], scale=1.3), FadeIn(pas[2]), rt=0.2)
        self.play(Create(barre), run_time=0.2)
        self.au("1 !", FadeIn(pas[3], scale=1.4), rt=0.3)
        # 10⁰ = 1 : AGRANDIR puis rétrécir
        cad = self.encadrer(r0, buff=0.15)
        self.play(r0.animate.scale(1.45), run_time=0.35)
        self.play(r0.animate.scale(1 / 1.45), run_time=0.35)
        self.play(Create(cad), run_time=0.3)
        self.cad0, self.col03 = cad, VGroup(calc, pas, barre)
        self.attendre_voix(marge=0.4)

    # ── 04 : la même table avec 2, à côté : 2⁰ = 1 ─────────────────────────
    def ecran_base2(self):
        self.dire("04-base2")
        self.play(FadeOut(self.col02), FadeOut(self.col03), run_time=0.3)
        x0 = 6.35
        t1 = T("Avec 2,", 40, JAUNE_TITRE)
        t2 = T("c'est pareil", 40, JAUNE_TITRE)
        VGroup(t1, t2).arrange(RIGHT, buff=0.2).move_to(P(3.0, 3.15))
        self.au("2, c'est", FadeIn(t1, shift=DOWN * 0.2), rt=0.3)
        self.au("c'est pareil", FadeIn(t2, shift=DOWN * 0.2), rt=0.35)
        r2 = {}
        mots = ((3, "8", "3 : 8", "8."), (2, "4", "2 : 4", "4."), (1, "2", "1 : 2", "2. On"))
        for k, (e, nb, mot_e, mot_n) in enumerate(mots):
            lg = self.ligne_table(2, e, nb, self.YS[k], x0=x0)
            r2[e] = lg
            self.au("2 puissance", FadeIn(lg.p.base, shift=DOWN * 0.2), n=k + 1, rt=0.3)
            self.au(mot_e, FadeIn(lg.p.expo, scale=1.6), rt=0.3)
            self.au(mot_n, FadeIn(lg.eg), FadeIn(lg.nb, shift=DOWN * 0.2), rt=0.35)
        fl2 = [self.fleche_div(self.YS[k], self.YS[k + 1], 3.7, "÷ 2") for k in range(3)]
        self.au("On divise", LaggedStart(*[Create(f.f) for f in fl2], lag_ratio=0.25), rt=0.6)
        self.au("2 : 2", *[FadeIn(f.lab, shift=LEFT * 0.1) for f in fl2], rt=0.3)
        r = self.ligne_table(2, 0, "1", self.YS[3], c_nb=VERT_OK, x0=x0)
        self.au("2 puissance", FadeIn(r.p.base, shift=DOWN * 0.2), n=4, rt=0.3)
        self.au("0 égale", FadeIn(r.p.expo, scale=1.8), FadeIn(r.eg), rt=0.3)
        self.au("1. Quelle", FadeIn(r.nb, scale=1.5), rt=0.3)
        cad2 = self.encadrer(r, buff=0.15)
        self.play(Create(cad2), run_time=0.3)
        quelle = [Indicate(VGroup(self.rangs[0], self.cad0), color=VERT_OK, scale_factor=1.15),
                  Indicate(VGroup(r, cad2), color=VERT_OK, scale_factor=1.15)]
        q = T("Quelle que soit la base :", 38).move_to(P(0, -2.6)).align_to(P(-5.9, 0), LEFT)
        a0 = VGroup(puiss("a", 0, fs=76), T("=", 60), T("1", 68, VERT_OK)).arrange(RIGHT, buff=0.25)
        a0[2].align_to(a0[0].base, DOWN)
        a0[1].set_y(a0[2].get_y())
        a0.next_to(q, RIGHT, buff=0.45).align_to(a0[0].base, DOWN)
        a0.shift(UP * (q.get_bottom()[1] - a0[0].base.get_bottom()[1]))
        self.au("Quelle", FadeIn(q, shift=UP * 0.15), *quelle, rt=0.6)
        self.au("a puissance", FadeIn(a0[0].base, scale=1.3), rt=0.3)
        self.au("0 égale", FadeIn(a0[0].expo, scale=1.6), FadeIn(a0[1]), n=2, rt=0.3)
        self.au("1.", FadeIn(a0[2], scale=1.4), n=2, rt=0.3)
        ca = self.encadrer(a0, buff=0.18)
        self.play(Create(ca), run_time=0.3)
        self.insister(VGroup(a0, ca), 1.25, 0.25)
        self.attendre_voix(marge=0.4)

    # ── outils des questions (recopiés de l'épisode 03) ────────────────────
    def _disposer_q(self, question, choix, phrase):
        r = super()._disposer_q(question, choix, phrase)
        self.q_q = r[1]
        return r

    def poser_mots(self, t, plan, rt=0.25, avec=None):
        """La question écrite MORCEAU PAR MORCEAU, chacun à son mot (épisode 03)."""
        s = t.original_text
        debuts = [a if isinstance(a, int) else s.find(a) for a, _ in plan]
        assert debuts[0] == 0 and all(d >= 0 for d in debuts), (s, plan)
        bornes = debuts + [len(s)]
        k, pieces = 0, []
        for a, b in zip(bornes[:-1], bornes[1:]):
            n = sum(1 for c in s[a:b] if not c.isspace())
            pieces.append(VGroup(*t.submobjects[k:k + n]))
            k += n
        for j, ((_, ex), pc) in enumerate(zip(plan, pieces)):
            self.au_mot(ex)
            self.play(FadeIn(pc, shift=UP * 0.12), *((avec or {}).get(j, [])), run_time=rt)

    @staticmethod
    def choix_synchro(choix):
        for c in choix:
            for f in c.get_family():
                f.sans_synchro = False
        return choix

    def barrer(self, m, couleur=PIEGE):
        return Line(m.get_corner(DL) + P(-0.08, -0.05), m.get_corner(UR) + P(0.08, 0.05), color=couleur,
                    stroke_width=6)

    # ── 04q : QUESTION 1 (7⁰ ?) ─────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        p = puiss(7, 0, fs=130)
        eg = T("=", 96)
        qm = T("?", 96, EXPO_C)
        fig = VGroup(p, eg, qm).arrange(RIGHT, buff=0.35).move_to(P(-3.5, 0.6))
        un = T("1", 110, VERT_OK, audit=False).move_to(qm)

        def avant(sc):
            sc.poser_mots(sc.q_q[0], [("", "Combien"), ("7", "7 puissance"), ("0 ?", "0 ?")],
                          avec={1: [FadeIn(p.base, scale=1.3)], 2: [FadeIn(p.expo, scale=1.6), FadeIn(eg), FadeIn(qm)]})
            sc.q_q.submobjects = []

        def apres(sc):
            sc.rep(0, avec=[FadeOut(qm, scale=0.5), FadeIn(un, scale=1.5)])
            piege = sc.cartes_q[0][1][1]
            sc.play(piege.animate.set_color(PIEGE).set_opacity(1), run_time=0.25)
            sc.play(Create(sc.barrer(piege)), run_time=0.25)
            sc.insister(VGroup(p, eg, un), 1.25, 0.25)
            sc.rep_fin()

        self.question_pause("04q-question", "04r-reponse", ["Combien vaut 7 puissance 0 ?"],
                            [self.t("0", 36), self.t("7", 36), self.t("1", 36)], 2,
                            ["Réponse C : 1.", "Une puissance d'exposant 0", "vaut toujours 1."],
                            avant_q=avant, autres_r=apres)

    # ── 04b (2de seulement) : 5³ ÷ 5³ = 1 et 5³⁻³ = 5⁰ ──────────────────────
    def ecran_quotient(self):
        self.ecran("04b-quotient-2de")
        tit = VGroup(T("En seconde :", 42, JAUNE_TITRE), T("une autre preuve", 42, JAUNE_TITRE)).arrange(RIGHT, buff=0.25)
        tit.move_to(P(-0.5, 3.15))
        self.au("En seconde", FadeIn(tit[0], shift=DOWN * 0.2), rt=0.35)
        self.au("une autre", FadeIn(tit[1], shift=DOWN * 0.2), rt=0.35)
        a, b = puiss(5, 3, fs=84), puiss(5, 3, fs=84)
        dv = T("÷", 70)
        haut = VGroup(a, dv, b).arrange(RIGHT, buff=0.3).move_to(P(-0.5, 1.75))
        self.au("5 puissance", FadeIn(a.base, scale=1.3), rt=0.3)
        self.au("3 divisé", FadeIn(a.expo, scale=1.5), FadeIn(dv), rt=0.3)
        self.au("5 puissance", FadeIn(b.base, scale=1.3), n=2, rt=0.3)
        self.au("3 : un", FadeIn(b.expo, scale=1.5), rt=0.3)
        fg = Arrow(P(-1.5, 1.2), P(-3.6, 0.6), color=GREY_B, stroke_width=5, buff=0)
        fd = Arrow(P(0.5, 1.2), P(3.0, 0.6), color=GREY_B, stroke_width=5, buff=0)
        lg = VGroup(T("un nombre divisé", 32), T("par lui-même", 32)).arrange(DOWN, buff=0.08).move_to(P(-3.9, -1.35))
        un = T("1", 90, VERT_OK).move_to(P(-3.9, -0.1))
        self.au("un nombre", GrowArrow(fg), FadeIn(lg[0], shift=DOWN * 0.15), rt=0.4)
        self.au("par lui", FadeIn(lg[1], shift=DOWN * 0.15), rt=0.3)
        self.au("1. Et", FadeIn(un, scale=1.5), rt=0.35)
        ld = VGroup(T("la règle", 32), T("des exposants", 32)).arrange(DOWN, buff=0.08).move_to(P(3.0, -1.35))
        self.au("Et la règle", GrowArrow(fd), FadeIn(ld[0], shift=DOWN * 0.15), rt=0.4)
        self.au("exposants", FadeIn(ld[1], shift=DOWN * 0.15), rt=0.3)
        b5 = T("5", 84, BASE_C)
        e1, e2 = T("3", 50, EXPO_C), T("−3", 50, EXPO_C)
        ex = VGroup(e1, e2).arrange(RIGHT, buff=0.05)
        ex.next_to(b5, UR, buff=0.03).shift(DOWN * 0.5)
        eg = T("=", 66)
        p0 = puiss(5, 0, fs=84)
        droite = VGroup(VGroup(b5, ex), eg, p0).arrange(RIGHT, buff=0.3).move_to(P(3.0, -0.25))
        self.au("5 puissance", FadeIn(b5, scale=1.3), n=3, rt=0.3)
        self.au("3 moins", FadeIn(e1, scale=1.5), rt=0.25)
        self.au("3 : 5", FadeIn(e2, scale=1.5), rt=0.25)
        self.au("5 puissance", FadeIn(eg), FadeIn(p0.base, scale=1.3), n=4, rt=0.3)
        self.au("0. Donc", FadeIn(p0.expo, scale=1.6), rt=0.3)
        fin = VGroup(T("Donc", 48), puiss(5, 0, fs=84), T("=", 64), T("1", 74, VERT_OK)).arrange(RIGHT, buff=0.3)
        fin[0].align_to(fin[1].base, DOWN)
        fin[3].align_to(fin[1].base, DOWN)
        fin.move_to(P(-0.5, -2.6))
        self.au("Donc", FadeIn(fin[0], shift=UP * 0.15), rt=0.3)
        self.au("5 puissance", FadeIn(fin[1].base, scale=1.3), n=5, rt=0.3)
        self.au("0 égale", FadeIn(fin[1].expo, scale=1.6), FadeIn(fin[2]), rt=0.3)
        self.au("1.", FadeIn(fin[3], scale=1.4), Indicate(un, color=VERT_OK), Indicate(p0, color=EXPO_C), n=2, rt=0.4)
        cad = self.encadrer(fin[1:], buff=0.18)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(fin, cad), 1.2, 0.25)
        self.attendre_voix(marge=0.4)

    # ── 05 : sous zéro : 10⁻¹ = 0,1 ; 10⁻² = 0,01 ; 10⁻³ = 0,001 ───────────
    YN = (2.3, 1.3, 0.3, -0.7, -1.7)  # exposants 1, 0, −1, −2, −3

    def ecran_negatif(self):
        self.ecran("05-negatif")
        tit = T("Et sous zéro ?", 44, JAUNE_TITRE).move_to(P(-3.3, 3.15))
        self.au("Et sous", Write(tit), rt=0.5)
        r1 = self.ligne_table(10, 1, "10", self.YN[0], audit=False, de=0.5)
        r0 = self.ligne_table(10, 0, "1", self.YN[1], audit=False, c_nb=VERT_OK, de=0.5)
        f0 = self.fleche_div(self.YN[0], self.YN[1], -0.55, audit=False)
        zero = DashedLine(P(-6.0, 0.8), P(-0.6, 0.8), color=GREY_B, stroke_width=2, dash_length=0.12)
        self.play(FadeIn(VGroup(r1, r0, f0)), Create(zero), run_time=0.5)
        c1 = VGroup(T("On continue", 36), VGroup(T("de diviser par", 36, CIEL), T("10", 36, CIEL)).arrange(RIGHT, buff=0.15)
                    ).arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        self.col(c1, 2.0, xl=1.4)
        self.au("On continue", FadeIn(c1[0], shift=RIGHT * 0.2), rt=0.35)
        fl = [self.fleche_div(self.YN[k], self.YN[k + 1], -0.55) for k in range(1, 4)]
        self.au("de diviser", FadeIn(c1[1][0], shift=RIGHT * 0.2), Create(fl[0].f), rt=0.4)
        self.au("10. 10", FadeIn(c1[1][1], scale=1.3), FadeIn(fl[0].lab, shift=LEFT * 0.1), rt=0.3)
        mots = (("1 : 1", "0,1", "0,1."), ("2 :", "0,01", "0,01."), ("3 :", "0,001", "0,001."))
        rangs = []
        for k, (mot_e, nb, mot_n) in enumerate(mots):
            lg = self.ligne_table(10, f"−{k + 1}", nb, self.YN[k + 2], de=0.5)
            rangs.append(lg)
            avec = [Create(fl[k].f), FadeIn(fl[k].lab)] if k else []
            self.au("10 puissance", FadeIn(lg.p.base, shift=DOWN * 0.2), *avec, n=k + 1, rt=0.3)
            self.au(mot_e, FadeIn(lg.p.expo, scale=1.6), rt=0.3)
            if k == 0:
                calc = VGroup(T("1 ÷", 40), T("10 =", 40), T("0,1", 44, VERT_OK)).arrange(RIGHT, buff=0.28)
                self.col(calc, 0.3, xl=1.4)
                self.au("1 divisé", FadeIn(calc[0], shift=RIGHT * 0.2), Indicate(r0.nb, color=VERT_OK), rt=0.3)
                self.au("10, 0,1", FadeIn(calc[1], shift=RIGHT * 0.2), rt=0.3)
                self.au(mot_n, FadeIn(lg.eg), FadeIn(lg.nb, shift=DOWN * 0.2), FadeIn(calc[2], scale=1.3), rt=0.35)
            else:
                self.au(mot_n, FadeIn(lg.eg), FadeIn(lg.nb, shift=DOWN * 0.2), rt=0.35)
            self.play(Indicate(lg.nb, color=WHITE, scale_factor=1.2), run_time=0.35)
        self.attendre_voix(marge=0.5)

    # ── 06 : lire 10⁻ⁿ : le 1 est à la n-ième place après la virgule ──────
    def ecran_rang(self):
        self.ecran("06-rang")
        pn = puiss(10, "−n", fs=64)
        dp = T(":", 48)
        r1 = T("le 1 est à la n-ième place", 40)
        r2 = T("après la virgule", 40)
        l1 = VGroup(pn, dp, r1).arrange(RIGHT, buff=0.25)
        dp.align_to(pn.base, DOWN)
        r1.align_to(pn.base, DOWN)
        l1.move_to(P(-0.5, 2.85))
        r2.next_to(r1, DOWN, buff=0.15).align_to(r1, LEFT)
        self.au("10 puissance", FadeIn(pn.base, scale=1.3), rt=0.3)
        self.au("moins n", FadeIn(pn.expo, scale=1.6), FadeIn(dp), rt=0.3)
        self.au("1 est", FadeIn(r1, shift=RIGHT * 0.2), rt=0.35)
        self.au("après", FadeIn(r2, shift=RIGHT * 0.2), rt=0.35)
        cad = self.encadrer(VGroup(l1, r2), buff=0.18)
        self.play(Create(cad), run_time=0.3)
        nb = T("0,001", 150).move_to(P(-1.9, -0.45))
        chiffres = nb[2:]
        self.au("0,001 :", FadeIn(nb, scale=1.2), rt=0.4)
        virg = nb[1]
        self.au("le 1 est", Indicate(virg, color=EXPO_C, scale_factor=1.8), n=2, rt=0.4)
        rangs = VGroup(*[T(str(k + 1), 40, EXPO_C, audit=False).next_to(c, UP, buff=0.3) for k, c in enumerate(chiffres)])
        self.au("troisième", LaggedStart(*[AnimationGroup(FadeIn(r, shift=DOWN * 0.15, scale=1.4),
                                                          Indicate(c, color=EXPO_C, scale_factor=1.15))
                                           for r, c in zip(rangs, chiffres)], lag_ratio=0.7), rt=0.5)
        trois = VGroup(T("3e place", 36, VERT_OK, audit=False)).next_to(chiffres[2], DOWN, buff=0.3)  # « troisième », dit à l'instant
        self.au("place.", chiffres[2].animate.set_color(VERT_OK), FadeIn(trois, shift=UP * 0.15), rt=0.35)
        self.insister(chiffres[2], 1.4, 0.2, about=chiffres[2].get_center())
        eg = T("=", 80)
        p3 = puiss(10, "−3", fs=96)
        res = VGroup(eg, p3).arrange(RIGHT, buff=0.3).next_to(nb, RIGHT, buff=0.5)
        res.shift(UP * (nb.get_y() - p3.base.get_y()))
        self.au("C'est", FadeIn(eg), rt=0.25)
        self.au("10 puissance", FadeIn(p3.base, scale=1.3), n=2, rt=0.3)
        self.au("3.", ReplacementTransform(rangs[2].copy(), p3.expo), rt=0.45)
        self.insister(p3.expo, 1.5, 0.2, about=p3.expo.get_center())
        self.attendre_voix(marge=0.5)

    # ── 07 : 2⁻¹ = 0,5 ; a⁻ⁿ = 1/aⁿ ; 2⁻³ = 1/8 ────────────────────────────
    def barre(self, n, y, x0=2.3, w=2.9, h=0.45):
        """Une barre (l'unité) coupée en n parts égales ; .parts, .cadre."""
        cadre = Rectangle(width=w, height=h, stroke_color=WHITE, stroke_width=3).move_to(P(x0 + w / 2, y))
        parts = VGroup(*[Rectangle(width=w / n, height=h, stroke_width=0, fill_color=VERT_OK, fill_opacity=0.85)
                         .move_to(P(x0 + w / n * (k + 0.5), y)) for k in range(n)])
        traits = VGroup(*[Line(P(x0 + w / n * k, y - h / 2), P(x0 + w / n * k, y + h / 2), color=WHITE, stroke_width=2)
                          for k in range(1, n)])
        g = VGroup(cadre, traits)
        g.parts, g.cadre, g.traits = parts, cadre, traits
        return g

    def ecran_regle(self):
        self.ecran("07-regle")
        tit = T("Avec une autre base", 42, JAUNE_TITRE).move_to(P(-3.0, 3.15))
        self.au("Avec une", Write(tit), rt=0.5)
        # 2⁻¹ = 1 ÷ 2 = 0,5, et la barre coupée en deux
        p1 = puiss(2, "−1", fs=72)
        l1 = VGroup(p1, T("=", 56), T("1 ÷", 52), T("2 =", 52), T("0,5", 58, VERT_OK)).arrange(RIGHT, buff=0.25)
        for m in l1[1:]:
            m.set_y(p1.base.get_y())
        l1.move_to(P(0, 2.05)).align_to(P(-5.9, 0), LEFT)
        b2 = self.barre(2, 2.15)
        self.au("2 puissance", FadeIn(p1.base, scale=1.3), rt=0.3)
        self.au("1, c'est", FadeIn(p1.expo, scale=1.6), rt=0.3)
        self.au("1 divisé", FadeIn(l1[1]), FadeIn(l1[2], shift=RIGHT * 0.2), Create(b2.cadre), rt=0.35)
        self.au("2 : 0,5", FadeIn(l1[3], shift=RIGHT * 0.2), Create(b2.traits), rt=0.3)
        self.au("0,5.", FadeIn(l1[4], scale=1.4), FadeIn(b2.parts[0]), rt=0.35)
        # la règle : a⁻ⁿ = 1 / aⁿ, en fraction empilée
        eng = T("En général :", 38).move_to(P(0, 0.35)).align_to(P(-5.9, 0), LEFT)
        pa = puiss("a", "−n", fs=80)
        f = frac(T("1", 64), puiss("a", "n", fs=64), fs=64)
        regle = VGroup(pa, T("=", 64), f).arrange(RIGHT, buff=0.3).next_to(eng, RIGHT, buff=0.5)
        regle[1].set_y(f.trait.get_y())
        pa.shift(UP * (f.trait.get_y() - pa.base.get_center()[1]))
        self.au("En général", FadeIn(eng, shift=RIGHT * 0.2), rt=0.35)
        self.au("a puissance", FadeIn(pa.base, scale=1.3), rt=0.3)
        self.au("moins n", FadeIn(pa.expo, scale=1.6), rt=0.3)
        self.au("égale 1", FadeIn(regle[1]), rt=0.2)
        self.au("1 sur a", FadeIn(f.num, scale=1.3), Create(f.trait), n=1, rt=0.3)
        self.au("a puissance", FadeIn(f.den.base, scale=1.3), n=2, rt=0.3)
        cad = self.encadrer(regle, buff=0.18)
        self.au("n. 2", FadeIn(f.den.expo, scale=1.6), Create(cad), rt=0.3)
        # 2⁻³ = 1 / 2³ = 1/8, et la barre coupée en huit
        p3 = puiss(2, "−3", fs=72)
        f3 = frac(T("1", 56), puiss(2, 3, fs=56), fs=56)
        f8 = frac(T("1", 56), T("8", 56, VERT_OK), fs=56)
        f8.num.set_color(VERT_OK)
        f8.trait.set_color(VERT_OK)
        l3 = VGroup(p3, T("=", 56), f3, T("=", 56), f8).arrange(RIGHT, buff=0.3)
        l3.move_to(P(0, -1.75)).align_to(P(-5.9, 0), LEFT)
        for m in (l3[1], l3[3]):
            m.set_y(f3.trait.get_y())
        p3.shift(UP * (f3.trait.get_y() - p3.base.get_center()[1]))
        b8 = self.barre(8, -1.55)
        self.au("2 puissance", FadeIn(p3.base, scale=1.3), n=2, rt=0.3)
        self.au("3 : 1", FadeIn(p3.expo, scale=1.6), rt=0.3)
        self.au("1 sur 2", FadeIn(l3[1]), FadeIn(f3.num, scale=1.3), Create(f3.trait), rt=0.3)
        self.au("2 puissance", FadeIn(f3.den.base, scale=1.3), n=3, rt=0.3)
        self.au("3, 1", FadeIn(f3.den.expo, scale=1.6), rt=0.3)
        self.au("1 sur 8", FadeIn(l3[3]), FadeIn(f8.num, scale=1.3), Create(f8.trait), Create(b8.cadre),
                Create(b8.traits), rt=0.35)
        self.au("8.", FadeIn(f8.den, scale=1.4), FadeIn(b8.parts[0]), rt=0.35)
        self.insister(f8, 1.3, 0.25)
        self.attendre_voix(marge=0.4)

    # ── 07q : QUESTION 2 (10⁻² ?) ───────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        p = puiss(10, "−2", fs=100)
        eg = T("=", 90)
        qm = T("?", 90, EXPO_C)
        fig = VGroup(p, eg, qm).arrange(RIGHT, buff=0.3).move_to(P(-4.0, 1.0))
        res = T("0,01", 80, VERT_OK, audit=False).next_to(eg, RIGHT, buff=0.35)
        neg = VGroup(T("négatif ?", 44, PIEGE), T("petit !", 48, VERT_OK)).arrange(DOWN, buff=0.45)
        neg.move_to(P(-3.6, -1.3))
        barre_neg = self.barrer(neg[0], WHITE)

        def avant(sc):
            sc.poser_mots(sc.q_q[0], [("", "Combien"), ("10", "10 puissance"), ("2 ?", "2 ?")],
                          avec={1: [FadeIn(p.base, scale=1.3)], 2: [FadeIn(p.expo, scale=1.6), FadeIn(eg), FadeIn(qm)]})
            sc.q_q.submobjects = []

        def apres(sc):
            sc.rep(0, avec=[FadeOut(qm, scale=0.5), FadeIn(res, scale=1.4)])
            for j in (0, 2):
                piege = sc.cartes_q[j][1][1]
                sc.play(piege.animate.set_color(PIEGE).set_opacity(1), run_time=0.2)
            sc.au_mot("Un exposant")
            sc.rep(1)
            sc.au_mot("négatif ne")
            sc.play(FadeIn(neg[0], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("négatif : il")
            sc.play(Create(barre_neg), run_time=0.3)
            sc.rep(2)
            sc.au_mot("il le rend")
            sc.rep(3, avec=[FadeIn(neg[1], scale=1.3)])
            sc.insister(res, 1.25, 0.25)
            sc.rep_fin()

        self.question_pause("07q-question", "07r-reponse", ["Combien vaut 10 puissance moins 2 ?"],
                            self.choix_synchro([T("−100", 36), T("0,01", 36), T("−20", 36)]), 1,
                            ["Réponse B : 0,01.", "Un exposant négatif ne rend pas", "le nombre négatif :",
                             "il le rend petit."],
                            avant_q=avant, autres_r=apres)

    # ── 08 : défi : la puce, 10⁻⁹ mètre ; 4⁻¹ ──────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.5)
        tit = T("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.12))
        self.au("À toi", Write(tit), rt=0.6)
        pc = puce(1.3).move_to(P(-4.6, -1.6))
        loupe = Circle(radius=1.1, stroke_color=WHITE, stroke_width=4, fill_color="#0b1220", fill_opacity=1)
        loupe.move_to(P(-4.6, 1.05))
        pis = pistes(1.1, n=9, graine=7).move_to(loupe)
        manche = VGroup(DashedLine(pc.coeur.get_corner(UL), loupe.point_at_angle(PI * 1.2), color=GREY_B,
                                   stroke_width=2),
                        DashedLine(pc.coeur.get_corner(UR), loupe.point_at_angle(PI * 1.8), color=GREY_B,
                                   stroke_width=2))
        l1 = VGroup(T("Le trait", 40), T("d'une puce :", 40)).arrange(RIGHT, buff=0.2)
        self.col(l1, 2.05, xl=-1.6)
        self.au("Le trait", FadeIn(l1[0], shift=RIGHT * 0.2), FadeIn(pc, scale=0.6), rt=0.4)
        self.au("d'une puce", FadeIn(l1[1], shift=RIGHT * 0.2), Create(manche), GrowFromCenter(loupe), rt=0.45)
        self.play(Create(pis, lag_ratio=0.15), run_time=0.6)
        un = pis[4].copy().set_stroke(VERT_OK, width=5)
        p9 = puiss(10, "−9", fs=84)
        m9 = T("mètre", 44)
        l2 = VGroup(p9, m9).arrange(RIGHT, buff=0.3)
        m9.align_to(p9.base, DOWN)
        self.col(l2, 1.05, xl=-1.6)
        self.au("10 puissance", FadeIn(p9.base, scale=1.3), Create(un), rt=0.35)
        self.au("9 mètre", FadeIn(p9.expo, scale=1.6), FadeIn(m9, shift=LEFT * 0.2), rt=0.35)
        self.insister(p9.expo, 1.5, 0.2, about=p9.expo.get_center())
        l3 = T("Écris ce nombre en décimal.", 38)
        self.col(l3, 0.0, xl=-1.6)
        self.au("Écris", FadeIn(l3, shift=RIGHT * 0.2), rt=0.35)
        p4 = puiss(4, "−1", fs=72)
        l4 = VGroup(T("Puis calcule", 38), p4, T(".", 38)).arrange(RIGHT, buff=0.25)
        l4[0].align_to(p4.base, DOWN)
        l4[2].align_to(p4.base, DOWN)
        self.col(l4, -1.0, xl=-1.6)
        self.au("Puis calcule", FadeIn(l4[0], shift=RIGHT * 0.2), rt=0.3)
        self.au("4 puissance", FadeIn(p4.base, scale=1.3), rt=0.3)
        self.au("1. Mets", FadeIn(p4.expo, scale=1.6), FadeIn(l4[2]), rt=0.3)
        self.au_mot("Mets pause")
        pz = self.col(self.t("Mets pause, et cherche !", 34, ORANGE_RETENUE), -2.1, xl=-1.6)
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    # ── 08b : correction : 0,000 000 001 mètre ; 4⁻¹ = 1/4 = 0,25 ─────────
    def ecran_correction(self):
        self.ecran("08b-correction", 0.5)
        tit = T("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.12))
        self.play(Write(tit), run_time=0.5)
        p9 = puiss(10, "−9", fs=64)
        dp = T(":", 44)
        r1 = VGroup(T("le 1 est à la neuvième place", 34), T("après la virgule", 34)).arrange(RIGHT, buff=0.2)
        l1 = VGroup(p9, dp, r1).arrange(RIGHT, buff=0.25)
        dp.align_to(p9.base, DOWN)
        r1.align_to(p9.base, DOWN)
        if l1.width > 12.0:
            l1.scale_to_fit_width(12.0)
        l1.move_to(P(-0.4, 2.15))
        self.au("10 puissance", FadeIn(p9.base, scale=1.3), rt=0.3)
        self.au("9 : le", FadeIn(p9.expo, scale=1.6), FadeIn(dp), rt=0.3)
        self.au("1 est", FadeIn(r1[0], shift=RIGHT * 0.2), rt=0.4)
        self.au("après", FadeIn(r1[1], shift=RIGHT * 0.2), rt=0.3)
        nb = T("0,000 000 001", 96).move_to(P(-1.2, 0.35))
        m = T("mètre", 50).next_to(nb, RIGHT, buff=0.35).align_to(nb, DOWN)
        chiffres = nb[2:]
        rangs = VGroup(*[T(str(k + 1), 28, EXPO_C, audit=False).next_to(c, UP, buff=0.22)
                         for k, c in enumerate(chiffres)])
        self.au("virgule", LaggedStart(*[FadeIn(r, shift=DOWN * 0.12, scale=1.4) for r in rangs], lag_ratio=0.4),
                rt=1.2)
        self.au("0,000", FadeIn(nb[:2], scale=1.2), FadeIn(nb[2:5], scale=1.2), rt=0.35)
        self.au("000 001", FadeIn(nb[5:8], scale=1.2), rt=0.3)
        self.au("001 mètre", FadeIn(nb[8:], scale=1.2), rt=0.3)
        self.play(nb[-1].animate.set_color(VERT_OK), Indicate(rangs[-1], color=VERT_OK, scale_factor=1.6),
                  run_time=0.35)
        self.au("mètre :", FadeIn(m, shift=LEFT * 0.2), rt=0.3)
        mil = T("un milliardième de mètre", 40, VERT_OK).move_to(P(-0.8, -0.85))
        self.au("un milliardième", FadeIn(mil, shift=UP * 0.15), rt=0.4)
        self.insister(nb[-1], 1.6, 0.2, about=nb[-1].get_center())
        # 4⁻¹ = 1/4 = 0,25
        p4 = puiss(4, "−1", fs=72)
        f4 = frac(T("1", 56), T("4", 56), fs=56)
        res = T("0,25", 64, VERT_OK)
        l4 = VGroup(p4, T("=", 56), f4, T("=", 56), res).arrange(RIGHT, buff=0.42).move_to(P(-1.2, -2.45))
        for x in (l4[1], l4[3], res):
            x.set_y(f4.trait.get_y())
        p4.shift(UP * (f4.trait.get_y() - p4.base.get_center()[1]))
        self.au("4 puissance", FadeIn(p4.base, scale=1.3), rt=0.3)
        self.au("1 : 1", FadeIn(p4.expo, scale=1.6), rt=0.3)
        self.au("1 sur 4", FadeIn(l4[1]), FadeIn(f4.num, scale=1.3), Create(f4.trait), rt=0.3)
        self.au("4, 0,25", FadeIn(f4.den, scale=1.3), rt=0.3)
        self.au("0,25.", FadeIn(l4[3]), FadeIn(res, scale=1.4), rt=0.35)
        cad = self.encadrer(res, buff=0.15)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(res, cad), 1.3, 0.25)
        self.attendre_voix(marge=0.5)

    # ── 09 : ce que tu as appris ───────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.5)
        tit = T("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.au("Ce que", Write(tit), rt=0.7)
        X0 = -5.6
        # 1) a⁰ = 1, jamais 0
        c1 = self.coche()
        a0 = puiss("a", 0, fs=64)
        e1 = VGroup(T("=", 50), T("1,", 54, VERT_OK), T("jamais", 44), T("0.", 50, PIEGE)).arrange(RIGHT, buff=0.22)
        l1 = VGroup(c1, a0, e1).arrange(RIGHT, buff=0.3)
        for x in e1:
            x.align_to(a0.base, DOWN)
        e1[0].set_y(e1[1][0].get_y())
        l1.move_to(P(0, 1.7)).align_to(P(X0, 0), LEFT)
        self.au("a puissance", Create(c1), FadeIn(a0.base, scale=1.3), rt=0.35)
        self.au("0 égale", FadeIn(a0.expo, scale=1.6), FadeIn(e1[0]), rt=0.3)
        self.au("1, jamais", FadeIn(e1[1], scale=1.3), rt=0.3)
        self.au("jamais", FadeIn(e1[2], shift=RIGHT * 0.15), rt=0.25)
        self.au("0. 10", FadeIn(e1[3], scale=1.3), rt=0.25)
        # 2) 10⁻ⁿ : le 1 à la n-ième place après la virgule
        c2 = self.coche()
        pn = puiss(10, "−n", fs=64)
        t2 = VGroup(T(": le 1 est à la n-ième place", 40), T("après la virgule.", 40)).arrange(DOWN, aligned_edge=LEFT,
                                                                                               buff=0.1)
        l2 = VGroup(c2, pn, t2).arrange(RIGHT, buff=0.3)
        t2[0].align_to(pn.base, DOWN)
        t2[1].next_to(t2[0], DOWN, buff=0.12).align_to(t2[0], LEFT)
        l2.move_to(P(0, 0.15)).align_to(P(X0, 0), LEFT)
        self.au("10 puissance", Create(c2), FadeIn(pn.base, scale=1.3), rt=0.35)
        self.au("moins n", FadeIn(pn.expo, scale=1.6), rt=0.3)
        self.au("1 est", FadeIn(t2[0], shift=RIGHT * 0.2), rt=0.35)
        self.au("après", FadeIn(t2[1], shift=RIGHT * 0.2), rt=0.35)
        # 3) a⁻ⁿ = 1 / aⁿ
        c3 = self.coche()
        pa = puiss("a", "−n", fs=64)
        f = frac(T("1", 52), puiss("a", "n", fs=52), fs=52)
        eg = T("=", 52)
        l3 = VGroup(c3, pa, eg, f).arrange(RIGHT, buff=0.3)
        for x in (c3, eg):
            x.set_y(f.trait.get_y())
        pa.shift(UP * (f.trait.get_y() - pa.base.get_center()[1]))
        l3.move_to(P(0, -1.55)).align_to(P(X0, 0), LEFT)
        self.au("a puissance", Create(c3), FadeIn(pa.base, scale=1.3), n=2, rt=0.35)
        self.au("moins n", FadeIn(pa.expo, scale=1.6), FadeIn(eg), n=2, rt=0.3)
        self.au("1 sur a", FadeIn(f.num, scale=1.3), Create(f.trait), rt=0.3)
        self.au("a puissance", FadeIn(f.den.base, scale=1.3), n=3, rt=0.3)
        self.au("n. Alors", FadeIn(f.den.expo, scale=1.6), rt=0.3)
        ep = VGroup(T("Épisode 5 :", 36, JAUNE_TITRE), T("la notation scientifique", 36)).arrange(RIGHT, buff=0.25)
        ep.move_to(P(0, -2.95)).align_to(P(X0, 0), LEFT)
        self.au("5 t'attend", FadeIn(ep[0], shift=UP * 0.15), rt=0.35)
        self.au("la notation", FadeIn(ep[1], shift=UP * 0.15), rt=0.35)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_puce()
        self.ecran_table()
        self.ecran_zero()
        self.ecran_base2()
        self.ecran_question1()
        if self.avec_2de:
            self.ecran_quotient()
        self.ecran_negatif()
        self.ecran_rang()
        self.ecran_regle()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PuissanceZeroNegatif4e(PuissanceZeroNegatifBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "orange"


class PuissanceZeroNegatif2de(PuissanceZeroNegatifBase):
    identite = "Maths 2de — EleveAI"
    ceinture = "jaune"
    avec_2de = True
