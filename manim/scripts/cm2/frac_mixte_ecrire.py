# frac_mixte_ecrire.py
# EleveAI — Maths CM2 — série « Fractions », épisode 10 : L'ÉCRITURE MIXTE
# (micro du coach : fraction_mixte_ecrire, CM2 seul), AVEC VOIX. Paysage 16:9.
# CEINTURE VERTE (la notion de CM2 complète : d/d = 1, faire des paquets, la
# table du dénominateur, le reste plus petit que le dénominateur, vers la
# virgule, défi du BO corrigé).
# Short jumeau : frac_mixte_ecrire_short.py (les quarts de pizza, blanche).
#
# Décor et métier : la ROBOTIQUE ; Inès, INGÉNIEURE EN ROBOTIQUE : batteries de
# 4 crans (1 cran = 1 quart) ; 7/4 = 1 + 3/4 ; 23/4 = 5 + 3/4 (table de 4) ;
# 7/4 = 1,75 (3/4 = 75 cases sur 100 = 0,75 : PRÉPARE fraction → décimal) ;
# défi du BO : 58/7 = 56/7 + 2/7 = 8 + 2/7. Aucune donnée du monde réel citée.
# Centres : technologie-ia.
# Vérifié (Python, Fraction) : 7/4 = 1 + 3/4 = 1,75 ; 9/4 = 2 + 1/4 ;
# 23/4 = 5 + 3/4 (4 × 5 = 20, 4 × 6 = 24) ; 1/4 = 0,25 ; 3/4 = 0,75 ;
# 58/7 = 8 + 2/7 (7 × 8 = 56, 7 × 9 = 63).
#
# Micro → écrans (banque cm2/maths/fractions-superieures.bank.ts) : d/d = 1
# (02, fixed_1 / tpl_3), écrire n/d = e + r/d (03, fixed_2 / tpl_1 / tpl_4),
# QUESTION 1 (leurres de tpl_1 / tpl_2 : 9 + 1/4 = le numérateur gardé,
# 1 + 5/4 = pas fini), la table (05, fixed_3), vers le décimal (06 + QUESTION 2,
# tpl_5 : leurres 7,4 = la barre lue comme une virgule, 1,3 = le reste après la
# virgule), défi 58/7 (fixed_3, l'exemple du BO).
# Écrans : 00 garde · 01 Inès · 02 d/d = 1 · 03 méthode · 04 QUESTION 1 ·
# 05 la table · 06 la virgule · 07 QUESTION 2 · 08 défi · 08b correction ·
# 09 ce que tu as appris · 10 fin.
#
# Bases : cm2/frac_cmk_commun.py (PaysageCM2) ← cm1/frac_cm_commun.py (NON modifié).
# Voix : manim/voix/cm2-frac-mixte-ecrire.json (débit −10) ; marques : frac_mixte_ecrire_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm2/frac_mixte_ecrire.py FracMixteEcrireCM2
# python -m manim render -qh --disable_caching manim/scripts/cm2/frac_mixte_ecrire.py FracMixteEcrireCM2 -o eleveai-maths-cm2-frac-mixte-ecrire --media_dir manim/scripts/cm2/media-frac-mixte-ecrire
# Sortie : manim/sorties/cm2/maths/fractions/10-mixte-ecrire/eleveai-maths-cm2-frac-mixte-ecrire.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_cmk_commun import *  # noqa: E402,F403

CRAN = VERT_PART
CRAN_VIDE = "#334155"


def batterie(k=0, n=4, w=1.9, h=0.8):
    """Une batterie de n crans égaux (k pleins) : .crans[i] ; la borne à droite."""
    corps = RoundedRectangle(width=w, height=h, corner_radius=0.12, fill_color="#0f172a", fill_opacity=1,
                             stroke_color="#cbd5e1", stroke_width=4)
    borne = RoundedRectangle(width=0.14 * w / 1.9, height=h * 0.4, corner_radius=0.04, fill_color="#cbd5e1",
                             fill_opacity=1, stroke_width=0).next_to(corps, RIGHT, buff=0)
    m = 0.08 * w / 1.9
    cw = (w - 2 * m - (n - 1) * m) / n
    crans = VGroup(*[RoundedRectangle(width=cw, height=h - 2 * m, corner_radius=0.04, stroke_width=0,
                                      fill_color=CRAN if i < k else CRAN_VIDE, fill_opacity=1)
                     .move_to(corps.get_left() + RIGHT * (m + cw / 2 + i * (cw + m))) for i in range(n)])
    g = VGroup(corps, borne, crans)
    g.crans, g.corps = crans, corps
    return g


def remplir(b, idx, run_time=0.6):
    return LaggedStart(*[b.crans[i].animate.set_fill(CRAN, 1) for i in idx], lag_ratio=0.25, run_time=run_time)


def robot(s=1.0, couleur="#94a3b8"):
    corps = RoundedRectangle(width=1.0, height=0.9, corner_radius=0.15, fill_color=couleur, fill_opacity=1,
                             stroke_width=0)
    tete = RoundedRectangle(width=0.8, height=0.55, corner_radius=0.12, fill_color=couleur, fill_opacity=1,
                            stroke_width=0).next_to(corps, UP, buff=0.08)
    yeux = VGroup(*[Circle(radius=0.08, fill_color="#22d3ee", fill_opacity=1, stroke_width=0)
                    .move_to(tete.get_center() + RIGHT * x) for x in (-0.18, 0.18)])
    antenne = VGroup(Line(tete.get_top(), tete.get_top() + UP * 0.22, color=couleur, stroke_width=4),
                     Dot(tete.get_top() + UP * 0.25, radius=0.06, color=ROUGE_ERREUR))
    roues = VGroup(*[Circle(radius=0.15, fill_color="#334155", fill_opacity=1, stroke_width=0)
                     .move_to(corps.get_bottom() + RIGHT * x) for x in (-0.3, 0.3)])
    ecran = RoundedRectangle(width=0.55, height=0.3, corner_radius=0.05, fill_color="#0f172a", fill_opacity=1,
                             stroke_width=0).move_to(corps.get_center() + UP * 0.1)
    return VGroup(roues, corps, ecran, tete, yeux, antenne).scale(s)


def ingenieure(s=0.9):
    return metier("#8d5524", "#0e7490", "#111827", longs=True, s=s, accessoires=(blouse, lunettes))


def table(d, lignes, x, y0, pas=0.62, fs=38, pales=()):
    """Les lignes « d × k = … » (k dans lignes) en colonne ; celles de `pales`
    sont du décor lu (pâles, non auditées)."""
    g = VGroup()
    for i, k in enumerate(lignes):
        t = Text(f"{d} × {k} = {d * k}", font_size=fs, color=GREY_B if k in pales else WHITE)
        t.move_to(P(x, y0 - i * pas))
        if k in pales:
            pas_audit(t)
        g.add(sans_synchro(t))
    return g


class FracMixteEcrireBase(PaysageCM2):
    nom_voix = "cm2-frac-mixte-ecrire"
    fichier_marques = "frac_mixte_ecrire_marques.json"

    def ecrans(self):
        return [self.page_de_garde, self.ecran_situation, self.ecran_entier, self.ecran_methode,
                self.ecran_question1, self.ecran_table, self.ecran_virgule, self.ecran_question2,
                self.ecran_defi, self.ecran_correction, self.ecran_finale]

    def batteries(self, ks, y, w=1.9, buff=0.35, x=-3.0):
        g = VGroup(*[batterie(k, w=w, h=w * 0.42) for k in ks]).arrange(RIGHT, buff=buff).move_to(P(x, y))
        return g

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("L'écriture mixte", self.identite, self.ceinture, y_ech=-2.7)
        self.au_mot("L'écriture")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        f = EcritureFraction(7, 4, fs=110).move_to(P(-2.4, 0.3))
        q = self.t("= ? + ?", 80, AMBRE).next_to(f, RIGHT, buff=0.4)
        q.set_y(f.trait.get_y())
        au_fil(self, [("7 quarts", [f], []), ("combien", [q], [])])
        self.insister(q, 1.15, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Inès, ingénieure en robotique ──────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ines = ingenieure(0.9).move_to(P(-5.6, -1.9))
        nom, met = nom_metier(self, ines, "Inès", ["ingénieure", "en robotique"])
        rob = robot(0.9).move_to(P(-1.6, -1.9))
        au_fil(self, [("Voici Inès", [ines, nom], []), ("ingénieure", [met], []), ("Ses robots", [rob], [])])
        b = batterie(0, w=3.6, h=1.4).move_to(P(-3.0, 1.6))
        l1 = ligne_calc(self, [("chaque cran", WHITE), ("= 1 quart", BLEU_PART)], 2.3, fs=42)
        au_fil(self, [("batterie de 4", [b], []), ("chaque cran", [l1[0]], [remplir(b, [0], 0.4)]),
                      ("1 quart de batterie", [l1[1]], [Indicate(b.crans[0], color=AMBRE, scale_factor=1.15)])])
        f = EcritureFraction(7, 4, fs=72)
        l2 = VGroup(self.inline("utilisé :", 40), f).arrange(RIGHT, buff=0.3)
        l2[0].set_y(f.trait.get_y())
        self.col(l2, 0.8)
        au_fil(self, [("a utilisé 7", [l2], [])])
        q = self.col(self.bloc(["Combien de batteries", "entières ?"], 40, ORANGE_RETENUE), -0.7)
        self.au_mot("Combien")
        self.poser_lignes(q, "up", 0.3)
        self.attendre_voix()

    # ── 02 : d/d = 1 ────────────────────────────────────────────────────────
    def ecran_entier(self):
        self.ecran("02-entier")
        b = batterie(0, w=3.6, h=1.4).move_to(P(-3.2, 2.0))
        self.add(b)
        e1 = frac_ligne([(4, 4), "=", ["1", VERT_OK]], fs=60)
        self.col(e1, 2.2)
        cle = self.col(self.t("C'est la clé !", 40, AMBRE), 0.95)
        au_fil(self, [("c'est 4", [], [remplir(b, range(4), 0.8)]), ("4 quarts", [e1[0]], []),
                      ("égale 1", [e1[1], e1[2]], [Flash(b, color=VERT_OK, line_length=0.3, flash_radius=2.0)]),
                      ("la clé", [cle], [])])
        b7 = Barre(7, 7, largeur=5.0, hauteur=0.6, marge=0.15, centre=P(-3.2, 0.0))
        b10 = Barre(10, 10, largeur=5.0, hauteur=0.6, marge=0.15, centre=P(-3.2, -1.5))
        e2 = frac_ligne([(7, 7), "=", ["1", VERT_OK]], fs=56)
        e3 = frac_ligne([(10, 10), "=", ["1", VERT_OK]], fs=56)
        self.col(e2, -0.25)
        self.col(e3, -1.75)
        au_fil(self, [("De même, 7", [e2[0]], [b7.apparaitre(0.6)]), ("égale 1, et", [e2[1], e2[2]], []),
                      ("et 10", [e3[0]], [b10.apparaitre(0.6)]), ("dixièmes égale 1", [e3[1], e3[2]], [])])
        self.attendre_voix()

    # ── 03 : la méthode (7/4 = 1 + 3/4) ─────────────────────────────────────
    def ecran_methode(self):
        self.ecran("03-methode")
        bs = self.batteries([0, 0], 2.0, w=2.6, buff=0.5)
        self.add(bs)
        idx = [(0, i) for i in range(4)] + [(1, i) for i in range(3)]
        cad = self.encadrer(bs[0], AMBRE, buff=0.12)
        e1 = self.t("1 entier", 34, VERT_OK).next_to(bs[0], DOWN, buff=0.3)
        au_fil(self, [("Dans 7 quarts", [], [LaggedStart(*[bs[j].crans[i].animate.set_fill(CRAN, 1) for j, i in idx],
                                                          lag_ratio=0.2, run_time=1.0)]),
                      ("paquet de 4", [], [Create(cad)]), ("1 batterie entière", [e1], [])])
        c1 = ligne_calc(self, [("7 −", WHITE), ("4", WHITE), ("= 3", AMBRE)], 2.3, fs=48)
        r3 = self.t("3 quarts", 34, AMBRE).next_to(bs[1], DOWN, buff=0.3)
        au_fil(self, [("reste 7", [c1[0]], []), ("moins 4", [c1[1]], []), ("4 : 3", [c1[2], r3], [])])
        e = frac_ligne([(7, 4), "=", ["1", VERT_OK], "+", (3, 4, AMBRE)], fs=64)
        self.col(e, 0.9)
        au_fil(self, [("Donc 7", [e[0]], []), ("égale 1", [e[1], e[2]], []), ("plus 3", [e[3], e[4]], [])])
        lu = self.col(self.t("« 1 et 3 quarts »", 40, BLEU_PART), -0.5)
        d = Droite(0, 2, 8, etiquettes={0: "0", 1: "1", 2: "2"}, longueur=4.8, centre=P(-3.3, -1.7))
        pt = pas_audit(d.point(1.75, (7, 4), fs=34, haut=0.6))
        au_fil(self, [("On lit", [], [FadeIn(d)])])
        self.poser_lignes(VGroup(lu), "fade", 0.3)
        au_fil(self, [(None, [pt], [])])
        self.attendre_voix()

    # ── 04 : QUESTION 1 (9/4) ───────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        bs = self.batteries([0, 0, 0], 0.6, w=1.8, buff=0.3, x=-3.3)
        self.add(bs)

        def apres(sc):
            sc.rep(0, avec=[remplir(bs[0], range(4), 0.4), remplir(bs[1], range(4), 0.4)])
            sc.rep(1, avec=[remplir(bs[2], [0], 0.3)])
            sc.rep_fin()

        self.question_pause("04-question", "04b-reponse", ["9 quarts, c'est…"],
                            [choix_multi("2 + 1/4"), choix_multi("9 + 1/4"), choix_multi("1 + 5/4")], 0,
                            ["8 quarts = 2 batteries,", "il reste 1 quart.", "Pas fini : 1 + 5/4"],
                            mot_q="9 quarts", autres_r=apres)

    # ── 05 : la table (23/4 = 5 + 3/4) ──────────────────────────────────────
    def ecran_table(self):
        self.ecran("05-table")
        self.au_mot("Pour une grande")
        self.titre("Une grande fraction ?")
        f = EcritureFraction(23, 4, fs=64)
        l0 = VGroup(f, self.t("?", 56, AMBRE)).arrange(RIGHT, buff=0.3)
        self.col(l0, 1.7)
        au_fil(self, [("23 quarts", [l0], [])])
        tb = table(4, [1, 2, 3, 4], -4.4, 2.2, pales=(1, 2, 3, 4))
        l5 = Text("4 × 5 = 20", font_size=38, color=VERT_OK).move_to(P(-4.4, 2.2 - 4 * 0.62))
        l6 = Text("4 × 6 = 24", font_size=38, color=ROUGE_ERREUR).move_to(P(-4.4, 2.2 - 5 * 0.62))
        trop = self.t("trop !", 34, ROUGE_ERREUR).next_to(l6, RIGHT, buff=0.3)
        au_fil(self, [("table de 4", [], [FadeIn(tb, lag_ratio=0.2)])])
        self.poser_lignes(VGroup(l5, l6), "fade", 0.3)
        au_fil(self, [("trop", [trop], [])])
        vu(l5, l6)
        c = ligne_calc(self, [("5 entiers", VERT_OK)], 0.6, fs=44)
        au_fil(self, [("Donc 5", [c[0]], [Indicate(l5, color=VERT_OK)])])
        c2 = ligne_calc(self, [("23 −", WHITE), ("20", WHITE), ("= 3", AMBRE)], -0.4, fs=44)
        au_fil(self, [("reste 23", [c2[0]], []), ("moins 20", [c2[1]], []), ("20 : 3", [c2[2]], [])])
        e = frac_ligne([(23, 4), "=", ["5", VERT_OK], "+", (3, 4, AMBRE)], fs=60)
        self.col(e, -1.75)
        bs = VGroup(*[batterie(4 if i < 5 else 3, w=0.82, h=0.38) for i in range(6)]).arrange(RIGHT, buff=0.14)
        bs.move_to(P(-3.4, -2.7))
        au_fil(self, [("23 quarts égale", [e[0]], []), ("égale 5", [e[1], e[2]], [FadeIn(bs, lag_ratio=0.15)]),
                      ("plus 3", [e[3], e[4]], [])])
        self.play(Create(self.encadrer(e, buff=0.15)), run_time=0.35)
        self.attendre_voix()

    # ── 06 : vers la virgule (1/4 = 0,25 ; 3/4 = 0,75 ; 1 + 3/4 = 1,75) ──────
    def ecran_virgule(self):
        self.ecran("06-virgule")
        self.au_mot("Et avec une virgule")
        self.titre("Et avec une virgule ?")
        g = grille100(0, cote=0.36, centre=P(-3.4, -0.2))
        cent = pas_audit(self.t("100 cases", 34, WHITE).next_to(g, UP, buff=0.2))
        au_fil(self, [("Sur 100", [cent], [g.apparaitre(0.6)])])
        l1 = ligne_calc(self, [("1/4", BLEU_PART), ("= 25 cases", WHITE), ("= 0,25", VERT_OK)], 1.6, fs=44)
        au_fil(self, [("1 quart", [l1[0]], [g.colorier(quadrant(0), run_time=0.6)]), ("25 cases", [l1[1]], []),
                      ("0,25", [l1[2]], [])])
        l2 = ligne_calc(self, [("3/4", BLEU_PART), ("= 75 cases", WHITE), ("= 0,75", VERT_OK)], 0.4, fs=44)
        au_fil(self, [("3 quarts", [l2[0]], [g.colorier(quadrant(1) + quadrant(2), run_time=0.8)]),
                      ("75 cases", [l2[1]], []), ("0,75", [l2[2]], [])])
        l3 = ligne_calc(self, [("1 + 3/4", WHITE), ("= 1,75", VERT_OK)], -1.2, fs=52)
        au_fil(self, [("Donc 1 et 3", [l3[0]], []), ("1,75", [l3[1]], [])])
        self.play(Create(self.encadrer(l3, buff=0.15)), run_time=0.35)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (7/4 en décimal) ────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        b = batterie(4, w=2.4, h=1.0).move_to(P(-4.4, 1.6))
        b2 = batterie(3, w=2.4, h=1.0).move_to(P(-1.6, 1.6))
        f = EcritureFraction(7, 4, fs=72).move_to(P(-3.0, -0.6))

        def avant(sc):
            sc.au_nb("! 7")
            sc.play(FadeIn(b), FadeIn(b2), FadeIn(f, scale=1.2), run_time=0.4)

        def apres(sc):
            e = ligne_calc(sc, [("1", WHITE), ("+ 0,75", AMBRE), ("= 1,75", VERT_OK)], centre=P(-3.0, -2.2), fs=48)
            sc.rep(0)
            au_fil(sc, [("quarts : 1", [e[0]], []), ("plus 0,75", [e[1]], []), ("c'est 1,75", [e[2]], [])])
            sc.rep_fin()

        self.question_pause("07-question", "07b-reponse", ["7 quarts, en", "nombre décimal ?"],
                            [self.inline("7,4"), self.inline("1,75"), self.inline("1,3")], 1,
                            ["7/4 = 1 + 3/4", "La barre n'est pas", "une virgule !"],
                            avant_q=avant, autres_r=apres)

    # ── 08 : défi (58/7, l'exemple du BO) ───────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.5)
        self.au_mot("À toi de jouer")
        self.titre("À toi de jouer !", fs=50)
        rob = robot(1.5, couleur="#f59e0b").move_to(P(-4.6, -0.3))
        f = EcritureFraction(58, 7, fs=80)
        l1 = VGroup(self.inline("utilisé :", 40), f).arrange(RIGHT, buff=0.3)
        l1[0].set_y(f.trait.get_y())
        self.col(l1, 1.5)
        au_fil(self, [("Le grand robot", [rob], []), ("utilisé 58", [l1], [])])
        q = self.col(self.bloc(["Écris-le avec un entier", "et une fraction", "plus petite que 1."], 36,
                               ORANGE_RETENUE), -0.45)
        self.au_mot("Écris-le")
        self.poser_lignes(q, "up", 0.3)
        self.pause_defi(y=-2.1)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.5)
        self.titre("Correction", fs=50)
        c0 = frac_ligne([(7, 7), "=", ["1 entier", VERT_OK]], fs=52)
        self.col(c0, 1.9)
        au_fil(self, [("Correction. 7", [c0[0]], []), ("1 entier", [c0[1], c0[2]], [])])
        tb = table(7, [5, 6, 7], -4.4, 2.2, pales=(5, 6, 7))
        l8 = Text("7 × 8 = 56", font_size=38, color=VERT_OK).move_to(P(-4.4, 2.2 - 3 * 0.62))
        l9 = Text("7 × 9 = 63", font_size=38, color=ROUGE_ERREUR).move_to(P(-4.4, 2.2 - 4 * 0.62))
        trop = self.t("trop !", 34, ROUGE_ERREUR).next_to(l9, RIGHT, buff=0.3)
        au_fil(self, [("table de 7", [], [FadeIn(tb, lag_ratio=0.2)])])
        self.poser_lignes(VGroup(l8, l9), "fade", 0.3)
        au_fil(self, [("trop", [trop], [])])
        vu(l8, l9)
        c2 = ligne_calc(self, [("58 −", WHITE), ("56", WHITE), ("= 2", AMBRE)], 0.6, fs=46)
        au_fil(self, [("reste 58", [c2[0]], []), ("moins 56", [c2[1]], []), ("56 : 2", [c2[2]], [])])
        e = frac_ligne([(58, 7), "=", ["8", VERT_OK], "+", (2, 7, AMBRE)], fs=64)
        self.col(e, -1.0)
        au_fil(self, [("58 septièmes égale", [e[0]], []), ("égale 8", [e[1], e[2]], [Indicate(l8, color=VERT_OK)]),
                      ("plus 2", [e[3], e[4]], [])])
        self.play(Create(self.encadrer(e, buff=0.15)), run_time=0.35)
        self.attendre_voix(marge=1.2)

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.5)
        b = batterie(4, w=2.6, h=1.1)
        e = frac_ligne([(7, 4), "=", "1", "+", (3, 4)], fs=52)
        fig = VGroup(b, e).arrange(DOWN, buff=0.5)
        pas_audit(fig)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("Le dénominateur dit combien", "de parts font 1 entier."),
                                                         ("On cherche dans la table", "combien d'entiers on peut faire."),
                                                         ("Le reste est plus petit", "que le dénominateur.")], fs=36)
        for mot, lg in zip(["Le dénominateur dit", "On cherche", "Le reste"], lignes):
            self.au_mot(mot)
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.0)


class FracMixteEcrireCM2(FracMixteEcrireBase):
    identite = "Maths CM2 — EleveAI"
    ceinture = "verte"
