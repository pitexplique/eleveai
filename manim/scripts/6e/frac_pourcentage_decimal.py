# frac_pourcentage_decimal.py
# EleveAI — Maths 6e — série « Fractions », épisode 13 : POURCENTAGE ET
# DÉCIMAL (micro du coach : pourcentage_decimal, « Relier pourcentage et
# décimal », notion pourcentage_nombre), AVEC VOIX. Paysage 16:9, CEINTURE
# VERTE : la paysage complète du niveau (méthode, piège, défi corrigé).
# Short jumeau : frac_pourcentage_decimal_short.py (blanche).
# ⭐ C'est la TROISIÈME erreur des 6e de Frédéric : décimal → pourcentage
# (0,75 = 75 %, leurre 0,75 %), écran 06 ; la chaîne complète simplifier →
# décimal → pourcentage, écran 09.
#
# Décor et métier : NATURE / OCÉANS ; Léa, OCÉANOGRAPHE : son logiciel
# affiche la part de la Terre couverte d'eau, 0,71 → 71 %. Puis le CORPS :
# environ 0,6 d'eau chez un adulte → 60 %. Défi : algues sur deux plages
# (0,4 et 0,04, chiffres inventés).
# Données réelles (vérifiées par WebSearch le 25/10/2026) :
#   · environ 71 % de la surface de la Terre est couverte d'eau (USGS, Water
#     Science School, « How Much Water is There on Earth? ») ;
#   · le corps d'un adulte contient environ 60 % d'eau (USGS, « The Water in
#     You: Water and the Human Body » ; 65 % chez le nourrisson).
# Centres d'intérêt : nature-ecologie, corps-sante.
#
# Micro → écrans (banque pourcentages.bank.ts) : décimal → pourcentage par les
# centièmes (02) et par × 100, chiffres qui glissent (03, 04, question 1),
# leurre 0,75 % (06), pourcentage → décimal ÷ 100 et le zéro des dixièmes
# (07, question 2 : 5 % = 0,05, leurre 0,5), chaîne 6/8 → 3/4 → 0,75 → 75 %
# (09), défi 0,4 / 0,04 (10).
# Écrans : 00 garde · 01 Léa et son logiciel · 02 71 centièmes · 03 la méthode
# × 100 (tableau) · 04 le corps 0,6 = 60 % · 05 QUESTION 1 (0,5) · 06 le piège
# 0,75 % · 07 dans l'autre sens ÷ 100 · 08 QUESTION 2 (5 %) · 09 la chaîne ·
# 10 défi · 10b correction · 11 ce que tu as appris · 12 fin.
#
# Voix : manim/voix/6e-frac-pourcentage-decimal.json (débit −10), WAV dans
# public/sons/6e-frac-pourcentage-decimal/ ; marques :
# manim/scripts/6e/frac_pourcentage_decimal_marques.json (marques_dump.ps1 +
# cues2marques.py). Outils : frac_commun.py + frac_lotc_commun.py.
# python -m manim render -qh --disable_caching manim/scripts/6e/frac_pourcentage_decimal.py FracPourcentageDecimal6e -o eleveai-maths-6e-frac-pourcentage-decimal --media_dir manim/scripts/6e/media-frac-pourcentage-decimal
# Sortie : manim/sorties/6e/maths/fractions/13-pourcentage-decimal/eleveai-maths-6e-frac-pourcentage-decimal.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotc_commun import *  # noqa: E402,F403

OCEAN = "#1d4ed8"
TERRE = "#16a34a"
RANGS = ["dizaines", "unités", "dixièmes", "centièmes"]


def oceanographe(s=1.0):
    """Léa : cheveux longs, veste bleu océan, lunettes."""
    p = personne(peau="#f1c27d", tenue="#0e7490", cheveux="#7c2d12", longs=True, s=s)
    p.add(lunettes(p))
    return p


def globe(r=1.1):
    """La Terre : l'océan bleu, trois continents verts."""
    mer = Circle(radius=r, fill_color=OCEAN, fill_opacity=1, stroke_color="#93c5fd", stroke_width=3)
    c1 = Polygon(*[P(x * r, y * r) for x, y in [(-0.6, 0.5), (-0.2, 0.7), (0.0, 0.3), (-0.3, -0.1), (-0.6, 0.1)]])
    c2 = Polygon(*[P(x * r, y * r) for x, y in [(0.2, 0.2), (0.6, 0.4), (0.7, -0.2), (0.4, -0.6), (0.15, -0.3)]])
    c3 = Polygon(*[P(x * r, y * r) for x, y in [(-0.5, -0.5), (-0.2, -0.45), (-0.25, -0.8), (-0.5, -0.75)]])
    for c in (c1, c2, c3):
        c.set_fill(TERRE, 1).set_stroke(width=0)
    return VGroup(mer, c1, c2, c3)


def fenetre(lignes, largeur=5.4, fs=32):
    """Une fenêtre de logiciel : bandeau gris, puis des lignes (Text déjà faits)."""
    corps = VGroup(*lignes).arrange(DOWN, aligned_edge=LEFT, buff=0.18)
    h = corps.height + 0.9
    fond = RoundedRectangle(width=largeur, height=h, corner_radius=0.15, fill_color="#0b1220", fill_opacity=1,
                            stroke_color="#94a3b8", stroke_width=3)
    bande = Rectangle(width=largeur - 0.06, height=0.3, fill_color="#334155", fill_opacity=1, stroke_width=0)
    bande.align_to(fond, UP).shift(DOWN * 0.03)
    pts = VGroup(*[Dot(radius=0.05, color=c) for c in ("#ef4444", "#f59e0b", "#22c55e")]).arrange(RIGHT, buff=0.1)
    pts.move_to(bande).align_to(bande, LEFT).shift(RIGHT * 0.15)
    corps.next_to(bande, DOWN, buff=0.25).align_to(fond, LEFT).shift(RIGHT * 0.3)
    g = VGroup(fond, bande, pts, corps)
    g.cadre = VGroup(fond, bande, pts)
    return g


class Numeration(VGroup):
    """Le tableau de numération (dizaines, unités | dixièmes, centièmes).
    .x(rang) .entete ; chiffre(c, rang, y) → un Text posé dans la colonne."""

    def __init__(self, largeur_col=1.5, y_haut=2.2, lignes=2, h=0.95, fs=22, centre_x=-3.3, **kw):
        super().__init__(**kw)
        self.w, self.h = largeur_col, h
        x0 = centre_x - 2 * largeur_col
        self.x0 = x0
        self.entete = VGroup(*[Text(r, font_size=fs, color=BLEU_CALCUL).move_to(P(x0 + (i + 0.5) * largeur_col, y_haut))
                               for i, r in enumerate(RANGS)])
        for t in self.entete:
            t.sans_synchro = True
        bas = y_haut - 0.35 - lignes * h
        self.ys = [y_haut - 0.35 - (k + 0.5) * h for k in range(lignes)]
        traits = VGroup(*[Line(P(x0 + i * largeur_col, y_haut + 0.3), P(x0 + i * largeur_col, bas),
                               stroke_color="#64748b", stroke_width=3) for i in range(5)])
        traits.add(Line(P(x0, y_haut - 0.3), P(x0 + 4 * largeur_col, y_haut - 0.3), stroke_color="#64748b",
                        stroke_width=3))
        virg = Line(P(x0 + 2 * largeur_col, y_haut + 0.3), P(x0 + 2 * largeur_col, bas), stroke_color=AMBRE,
                    stroke_width=6)
        self.traits, self.virgule = traits, virg
        self.add(traits, virg, self.entete)

    def x(self, rang):
        return self.x0 + (rang + 0.5) * self.w

    def chiffre(self, c, rang, ligne, couleur=WHITE, fs=60):
        t = Text(c, font_size=fs, color=couleur).move_to(P(self.x(rang), self.ys[ligne]))
        t.sans_synchro = True
        return t

    def vir(self, ligne, fs=60):
        """La virgule écrite entre les unités et les dixièmes."""
        t = Text(",", font_size=fs, color=AMBRE).move_to(P(self.x0 + 2 * self.w, self.ys[ligne] - 0.18))
        t.sans_synchro = True
        return t


class FracPourcentageDecimalBase(PaysageLotC):
    nom_voix = "6e-frac-pourcentage-decimal"
    fichier_marques = "frac_pourcentage_decimal_marques.json"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Pourcentages et nombres décimaux", self.identite, self.ceinture)
        self.au_mot("Pourcentages")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("0,75")
        d = self.t("0,75", 90, BLEU_CALCUL).move_to(P(-2.6, 0.25))
        self.play(FadeIn(d, scale=1.3), run_time=0.4)
        self.au_mot("combien de pour cent")
        fl = Arrow(P(-1.2, 0.25), P(0.4, 0.25), color=AMBRE, stroke_width=8)
        q = self.t("? %", 90, AMBRE).move_to(P(1.6, 0.25))
        self.play(GrowArrow(fl), FadeIn(q, scale=0.4), run_time=0.5)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Léa, océanographe ──────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = oceanographe(1.1).move_to(P(-5.15, -0.5))
        self.au_mot("Voici Léa")
        nom = self.t("Léa", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.3)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("océanographe")
        metier = self.t("océanographe", 30, BLEU_CALCUL).next_to(pers, DOWN, buff=0.2)
        g = globe(1.15).move_to(P(-2.6, 1.6))
        self.play(FadeIn(metier, shift=UP * 0.2), GrowFromCenter(g), run_time=0.6)
        self.play(Rotate(g, angle=-PI / 8), run_time=0.8)
        l1 = self.t("Part de la Terre", 30, "#e2e8f0")
        l2 = self.t("couverte d'eau :", 30, "#e2e8f0")
        v = self.t("0,71", 54, "#38bdf8")
        f = fenetre([l1, l2, v], largeur=4.6)
        self.col(f, 1.5)
        self.au_mot("Son logiciel")
        self.play(FadeIn(f.cadre, scale=0.9), run_time=0.4)
        self.au_mot("la part de la Terre")
        self.play(FadeIn(l1, shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("couverte d'eau")
        self.play(FadeIn(l2, shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("0,71")
        self.play(FadeIn(v, scale=1.4), Indicate(g, color="#38bdf8", scale_factor=1.05), run_time=0.5)
        art = VGroup(self.t("Article :", 34), self.t("? %", 50, ORANGE_RETENUE)).arrange(RIGHT, buff=0.3)
        self.au_mot("son article")
        self.col(art, -0.9)
        self.play(FadeIn(art[0], shift=UP * 0.15), run_time=0.3)
        self.au_mot("un pourcentage")
        self.play(FadeIn(art[1], scale=0.5), run_time=0.4)
        self.au_mot("Que doit-elle écrire")
        self.play(Circumscribe(art, color=ORANGE_RETENUE), run_time=0.8)
        self.attendre_voix()

    # ── 02 : 71 centièmes ───────────────────────────────────────────────────
    def ecran_centiemes(self):
        self.ecran("02-centiemes")
        gr = grille100(0, cote=0.5, centre=P(-3.4, -0.1), couleur="#38bdf8")
        self.au_mot("0,71, c'est")
        d = self.col(self.t("0,71", 64, BLEU_CALCUL), 2.7)
        self.play(FadeIn(d, scale=1.3), run_time=0.35)
        self.calc([("= 71 centièmes", WHITE)], 1.75, 44)
        self.au_mot("Sur une grille")
        self.play(gr.apparaitre(0.8))
        self.au_mot("71 cases")
        self.play(gr.colorier(range(71), lag=0.02), run_time=1.3)
        self.au_mot("71 sur 100")
        f = EcritureFraction(71, 100, fs=50)
        eg = VGroup(self.t("=", 54), f).arrange(RIGHT, buff=0.3)
        self.col(eg, 0.62)
        self.play(FadeIn(eg, scale=1.2), run_time=0.4)
        self.au_mot("71 %")
        r = self.col(self.t("= 71 %", 60, VERT_OK), -0.85)
        self.play(FadeIn(r, scale=1.3), run_time=0.4)
        self.play(Create(self.encadrer(r)), run_time=0.3)
        self.au_mot("Environ 71 %")
        src = self.bloc(["Environ 71 % de la surface", "de la Terre : de l'eau !"], 30, "#93c5fd")
        g = globe(0.42)
        ligne = VGroup(g, src).arrange(RIGHT, buff=0.25)
        self.col(ligne, -1.95)
        self.play(FadeIn(ligne, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix()

    # ── 03 : la méthode × 100 (le tableau de numération) ───────────────────
    def ecran_methode(self):
        self.ecran("03-methode")
        tb = Numeration(largeur_col=1.58, y_haut=2.0, centre_x=-3.4)
        self.au_mot("on multiplie par 100")
        tit = self.col(self.t("× 100", 64, JAUNE_TITRE), 2.7)
        self.play(Write(tit), run_time=0.5)
        a = [tb.chiffre("0", 1, 0), tb.chiffre("7", 2, 0), tb.chiffre("1", 3, 0)]
        self.au_mot("Dans le tableau")
        self.play(FadeIn(tb), *[FadeIn(c) for c in a], run_time=0.6)
        self.au_mot("glisse de deux rangs")
        fl = Arrow(P(-1.0, -1.25), P(-3.9, -1.25), color=AMBRE, stroke_width=7)
        ftxt = self.t("2 rangs", 32, AMBRE).next_to(fl, DOWN, buff=0.1)
        self.play(GrowArrow(fl), FadeIn(ftxt), run_time=0.6)
        sept = tb.chiffre("7", 0, 1, VERT_OK)
        un = tb.chiffre("1", 1, 1, VERT_OK)
        self.au_mot("Le 7 des dixièmes")
        self.play(Indicate(a[1], color=AMBRE, scale_factor=1.4), run_time=0.5)
        self.au_mot("7 dizaines")
        self.play(TransformFromCopy(a[1], sept, path_arc=-PI / 3), run_time=0.7)
        self.au_mot("Le 1 des centièmes")
        self.play(Indicate(a[2], color=AMBRE, scale_factor=1.4), run_time=0.5)
        self.au_mot("1 unité")
        self.play(TransformFromCopy(a[2], un, path_arc=-PI / 3), run_time=0.7)
        self.au_mot("0,71 fois 100")
        self.calc([("0,71 × 100 =", WHITE), ("71", VERT_OK)], 1.5, 46)
        self.au_mot("Donc 0,71")
        lg = self.calc([("0,71 =", WHITE), ("71 %", VERT_OK)], 0.3, 56)
        self.play(Create(self.encadrer(lg)), run_time=0.3)
        self.attendre_voix()

    # ── 04 : le corps humain, 0,6 = 60 % ────────────────────────────────────
    def ecran_corps(self):
        self.ecran("04-corps")
        p = personne(peau="#c68642", tenue="#64748b", cheveux="#1f2937", s=0.75).move_to(P(-5.6, 1.6))
        gr = grille100(0, cote=0.36, centre=P(-2.6, 0.2), couleur="#38bdf8")
        self.au_mot("le corps d'un adulte")
        self.play(FadeIn(p, shift=UP * 0.2), gr.apparaitre(0.7), run_time=0.7)
        self.au_mot("environ 0,6")
        d = self.col(self.t("0,6", 64, BLEU_CALCUL), 2.6)
        self.play(FadeIn(d, scale=1.3), run_time=0.35)
        self.au_mot("0,6, c'est")
        self.calc([("0,6 =", WHITE), ("0,60", AMBRE)], 1.6, 48)
        self.calc([("= 60 centièmes", WHITE)], 0.75, 44)
        self.play(gr.colorier(range(60), lag=0.02), run_time=1.2)
        self.au_mot("0,6 fois 100")
        self.calc([("0,6 × 100 =", WHITE), ("60", VERT_OK)], -0.25, 46)
        self.au_mot("environ 60 %")
        r = self.col(self.t("≈ 60 % d'eau", 56, VERT_OK), -1.35)
        self.play(FadeIn(r, scale=1.3), run_time=0.4)
        self.play(Create(self.encadrer(r)), run_time=0.3)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (0,5 = ? %) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        gr = grille100(0, cote=0.46, centre=P(-3.4, 0.1), couleur="#38bdf8")
        self.add(gr)

        def apres(sc):
            sc.au_mot("0,5 égale 0,50")
            sc.rep(0, avec=[gr.colorier(range(50), lag=0.02, run_time=1.0)])
            sc.au_mot("50 centièmes")
            sc.rep(1)
            sc.au_mot("0,5 fois 100")
            sc.rep(2)
            sc.rep_fin()

        self.question_pause("05-question", "05b-reponse", ["0,5, c'est", "combien de pour cent ?"],
                            [self.inline("5 %"), self.inline("50 %"), self.inline("0,5 %")], 1,
                            ["0,5 = 0,50 :", "50 centièmes.", "0,5 × 100 = 50 → 50 %"], mot_q="0,5",
                            autres_r=apres)

    # ── 06 : le piège 0,75 % ────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR).move_to(P(0, 3.05))
        ga = grille100(0, cote=0.28, centre=P(-4.75, 0.55))
        gb = grille100(0, cote=0.28, centre=P(-1.05, 0.55), couleur="#38bdf8")
        self.au_mot("Attention au piège")
        self.play(Write(tit), run_time=0.5)
        self.au_mot("0,75, ce n'est pas")
        faux = self.inline("0,75 = 0,75 %", 50, ROUGE_ERREUR).move_to(P(4.15, 1.6))
        self.play(FadeIn(faux, scale=1.2), run_time=0.3)
        self.au_mot("pas 0,75 %")
        x = croix(faux, sw=6).set_stroke(opacity=0.9)
        self.play(Create(x), run_time=0.3)
        self.au_mot("moins d'une case")
        c0 = ga.liste[0]
        bout = Rectangle(width=c0.width * 0.75, height=c0.height, fill_color=ROUGE_COACH, fill_opacity=1,
                         stroke_width=0).align_to(c0, LEFT).align_to(c0, UP)
        la = self.bloc(["0,75 % :", "moins d'1 case"], 30, ROUGE_ERREUR).next_to(ga, DOWN, buff=0.2)
        for m in la:
            m.set_x(ga.get_x())
            m.sans_synchro = True
        self.play(ga.apparaitre(0.4), FadeIn(la, shift=UP * 0.1), run_time=0.4)
        self.add(bout)
        loupe = Circle(radius=0.35, stroke_color=AMBRE, stroke_width=6).move_to(c0)
        self.play(FadeIn(bout), Create(loupe), run_time=0.5)
        self.au_mot("minuscule")
        self.play(loupe.animate.scale(1.5), run_time=0.3)
        self.play(loupe.animate.scale(1 / 1.5), run_time=0.3)
        self.au_mot("0,75, c'est 75")
        lb = VGroup(self.t("0,75 = 75 cases", 30, VERT_OK), self.t("→ 75 %", 30, VERT_OK)).arrange(DOWN, buff=0.1)
        lb.next_to(gb, DOWN, buff=0.2)
        for m in lb:
            m.sans_synchro = True
        self.play(gb.apparaitre(0.4), FadeIn(lb[0], shift=UP * 0.1), run_time=0.4)
        self.play(gb.colorier(range(75), lag=0.01), run_time=0.9)
        self.au_mot("cases sur 100 : 75 %")
        self.play(FadeIn(lb[1], shift=UP * 0.1), run_time=0.3)
        r = self.bloc(["Pas de « % » collé :", "on multiplie par 100 !"], 36, VERT_OK).move_to(P(4.15, -0.3))
        self.au_mot("On ne colle pas")
        self.play(FadeIn(r[0], shift=UP * 0.15), run_time=0.3)
        self.au_mot("on multiplie par 100")
        self.play(FadeIn(r[1], shift=UP * 0.15), run_time=0.3)
        self.insister(r, 1.08, 0.25)
        self.attendre_voix()

    # ── 07 : dans l'autre sens, ÷ 100 ───────────────────────────────────────
    def ecran_inverse(self):
        self.ecran("07-inverse")
        tb = Numeration(largeur_col=1.58, y_haut=2.0, centre_x=-3.4)
        self.au_mot("on divise par 100")
        tit = self.col(self.t("÷ 100", 64, JAUNE_TITRE), 2.7)
        self.play(Write(tit), FadeIn(tb), run_time=0.5)
        self.au_mot("25 %, c'est")
        self.calc([("25 % =", WHITE), ("25 centièmes", WHITE), ("=", WHITE), ("0,25", VERT_OK)], 1.5, 40)
        self.au_mot("Et 8 %")
        huit = tb.chiffre("8", 1, 0)
        self.play(FadeIn(huit, scale=1.3), run_time=0.3)
        self.calc([("8 % =", WHITE), ("8 centièmes", WHITE)], 0.4, 40)
        cible = tb.chiffre("8", 3, 1, VERT_OK)
        self.play(TransformFromCopy(huit, cible, path_arc=PI / 3), run_time=0.7)
        self.au_mot("0,08")
        z1, z2 = tb.chiffre("0", 1, 1, VERT_OK), tb.chiffre("0", 2, 1, AMBRE)
        r = self.col(self.t("= 0,08", 56, VERT_OK), -0.6)
        self.play(FadeIn(z1), FadeIn(z2), FadeIn(r, scale=1.3), run_time=0.4)
        self.au_mot("Le zéro garde")
        self.play(Circumscribe(z2, color=AMBRE), run_time=0.7)
        z = self.col(self.bloc(["Le 0 garde la place", "des dixièmes !"], 34, AMBRE), -1.8)
        self.play(FadeIn(z, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (5 % = quel décimal ?) ──────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        gr = grille100(0, cote=0.46, centre=P(-3.4, 0.1), couleur="#38bdf8")
        self.add(gr)

        def apres(sc):
            sc.au_mot("5 %, c'est 5 centièmes")
            sc.rep(0, avec=[gr.colorier(range(5), lag=0.1, run_time=0.6)])
            sc.au_mot(": 0,05")
            sc.rep(1)
            sc.au_mot("Et 0,5")
            sc.rep(2)
            sc.rep_fin()

        self.question_pause("08-question", "08b-reponse", ["5 %, c'est quel", "nombre décimal ?"],
                            [self.inline("0,5"), self.inline("0,05"), self.inline("5,0")], 1,
                            ["5 % = 5 centièmes", "= 0,05", "0,5 serait 50 % !"], mot_q="5 %",
                            autres_r=apres)

    # ── 09 : toute la chaîne 6/8 → 3/4 → 0,75 → 75 % ───────────────────────
    def ecran_chaine(self):
        self.ecran("09-chaine")
        tit = self.t("Toute la chaîne", 48, JAUNE_TITRE).move_to(P(0, 3.0))
        self.au_mot("Toute la chaîne")
        self.play(Write(tit), run_time=0.5)
        xs = [-5.6, -2.6, 0.9, 4.8]
        y = 0.4
        f1, f2 = EcritureFraction(6, 8, fs=84).move_to(P(xs[0], y)), EcritureFraction(3, 4, fs=84).move_to(P(xs[1], y))
        d = self.t("0,75", 64, BLEU_CALCUL).move_to(P(xs[2], y))
        pc = self.t("75 %", 64, VERT_OK).move_to(P(xs[3], y))
        ends = [(xs[0] + 0.55, xs[1] - 0.55), (xs[1] + 0.55, d.get_left()[0] - 0.2), (d.get_right()[0] + 0.2,
                                                                                    pc.get_left()[0] - 0.2)]
        fl = [Arrow(P(a, y), P(b, y), color=AMBRE, stroke_width=6, buff=0) for a, b in ends]
        noms = [self.t(s, 28, AMBRE) for s in ("simplifier", "3 ÷ 4", "× 100")]
        for n_, a in zip(noms, fl):
            n_.move_to(P(a.get_x(), y + 1.25))
        bas = [self.t(s, 28, BLEU_CALCUL) for s in ("fraction", "fraction simple", "décimal", "pourcentage")]
        for b_, x in zip(bas, xs):
            b_.move_to(P(x, -1.0))
        self.frac(f1, "6 huitièmes")
        self.au_mot("on simplifie")
        self.play(GrowArrow(fl[0]), FadeIn(noms[0], shift=DOWN * 0.1), run_time=0.4)
        self.frac(f2, "3 quarts")
        self.au_mot("3 divisé par 4")
        self.play(GrowArrow(fl[1]), FadeIn(noms[1], shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("égale 0,75")
        self.play(FadeIn(d, scale=1.3), run_time=0.4)
        self.au_mot("0,75 fois 100")
        self.play(GrowArrow(fl[2]), FadeIn(noms[2], shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("75 %")
        self.play(FadeIn(pc, scale=1.3), run_time=0.4)
        self.insister(pc, 1.3, 0.25)
        self.play(LaggedStart(*[FadeIn(b_, shift=UP * 0.1) for b_ in bas], lag_ratio=0.25), run_time=1.0)
        self.attendre_voix()

    # ── 10 : défi (algues : 0,4 et 0,04) ────────────────────────────────────
    def plages(self, k1=0, k2=0):
        g1 = grille100(k1, cote=0.25, couleur=VERT_PART, centre=P(-4.95, -0.1))
        g2 = grille100(k2, cote=0.25, couleur=VERT_PART, centre=P(-1.55, -0.1))
        t1 = self.t("plage 1", 30, "#fde68a").next_to(g1, UP, buff=0.15)
        t2 = self.t("plage 2", 30, "#fde68a").next_to(g2, UP, buff=0.15)
        for t in (t1, t2):
            t.sans_synchro = True
        return g1, g2, t1, t2

    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        g1, g2, t1, t2 = self.plages()
        self.au_mot("À toi de jouer")
        tit = self.col(self.t("À toi de jouer !", 50, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.6)
        self.au_mot("Sur une plage")
        self.play(g1.apparaitre(0.6), FadeIn(t1), run_time=0.6)
        l1 = self.col(self.ligne([("plage 1 :", WHITE), ("0,4", VERT_OK)], 42), 1.8)
        l1[0].sans_synchro = True
        self.au_mot("algues : 0,4")
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.3)
        l2 = self.col(self.ligne([("plage 2 :", WHITE), ("0,04", VERT_OK)], 42), 0.9)
        l2[0].sans_synchro = True
        self.au_mot("Sur une autre plage")
        self.play(g2.apparaitre(0.5), FadeIn(t2), FadeIn(l2[0], shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("0,04")
        self.play(FadeIn(l2[1], scale=1.3), run_time=0.3)
        self.au_mot("Écris ces deux nombres")
        l3 = self.col(self.bloc(["Écris-les", "en pourcentage !"], 38, ORANGE_RETENUE), -0.3)
        self.poser_lignes(l3, "up", 0.3)
        self.pause_defi(y=-1.6)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        g1, g2, t1, t2 = self.plages()
        self.add(g1, g2, t1, t2)
        tit = self.col(self.t("Correction", 50, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("0,4 égale")
        self.calc([("0,4 =", WHITE), ("0,40", AMBRE), ("= 40 centièmes", WHITE)], 1.8, 38,
                  avec=[g1.colorier(range(40), lag=0.02, run_time=1.0)])
        self.au_mot("donc 40 %")
        r1 = self.col(self.t("→ 40 %", 50, VERT_OK), 1.0)
        self.play(FadeIn(r1, scale=1.3), run_time=0.35)
        self.au_mot("0,04, c'est")
        self.calc([("0,04 =", WHITE), ("4 centièmes", WHITE)], -0.1, 38,
                  avec=[g2.colorier(range(4), lag=0.15, run_time=0.8)])
        self.au_mot("4 %")
        r2 = self.col(self.t("→ 4 %", 50, VERT_OK), -0.9)
        self.play(FadeIn(r2, scale=1.3), run_time=0.35)
        self.au_mot("Un zéro de plus")
        z = self.col(self.bloc(["Un zéro de plus :", "10 fois moins !"], 36, AMBRE), -2.1)
        self.poser_lignes(z, "up", 0.3)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        g = grille100(75, cote=0.4, couleur="#38bdf8")
        lab = self.inline("0,75 = 75 %", 40, VERT_OK).next_to(g, DOWN, buff=0.3)
        fig = VGroup(g, lab)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("Décimal → pourcentage :", "on multiplie par 100."),
                                                         ("0,75 = 75 %,", "jamais 0,75 % !"),
                                                         ("Pourcentage → décimal :", "on divise par 100 : 8 % = 0,08."),
                                                         ("0,6 = 60 %, pas 6 %.",)], fs=36)
        self.au_mot("Pour écrire un décimal")
        self.montrer_ligne(lignes[0])
        self.au_mot("0,75, c'est")
        self.montrer_ligne(lignes[1], Indicate(lab, color=AMBRE))
        self.au_mot("Pour écrire un pourcentage")
        self.montrer_ligne(lignes[2])
        self.au_mot("Et 0,6")
        self.montrer_ligne(lignes[3])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_centiemes()
        self.ecran_methode()
        self.ecran_corps()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_inverse()
        self.ecran_question2()
        self.ecran_chaine()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class FracPourcentageDecimal6e(FracPourcentageDecimalBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
