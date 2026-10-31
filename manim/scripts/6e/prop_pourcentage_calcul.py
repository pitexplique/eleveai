# prop_pourcentage_calcul.py
# EleveAI — Maths 6e — série « Proportionnalité », lot 3 (6e pourcentages),
# épisode 13 : CALCULER UN POURCENTAGE SIMPLE (micro du coach :
# pourcentage_calcul_simple), AVEC VOIX. Paysage 16:9, CEINTURE VERTE (la
# paysage complète du niveau : situation, trois raccourcis, piège, 2
# questions-pauses, défi corrigé). Short jumeau : prop_pourcentage_calcul_short.py.
# ⭐ Méthode travaillée : les RACCOURCIS sans calculatrice — 10 % = un dixième
# (÷ 10), 50 % = la moitié (÷ 2), 25 % = le quart (÷ 4) ; 20 % et 30 % en
# partant de 10 % (2 fois, 3 fois). « Sur 100 » se VOIT sur les 100 cases ; le
# tableau de proportionnalité (Prix → Réduction, flèche latérale « ÷ 10 »)
# relie « 10 sur 100 » et « 8 sur 80 ». ⛔ Pas de produit en croix (6e).
# Lien sans duplication : fractions 6e 12 (pourcentage ↔ fraction) et 13
# (pourcentage ↔ décimal) ; même grille de 100 cases (grille100 / BarrePourcent).
# ⭐ Leurres (consigne-videos-proportionnalite.md) : 1. AJOUTER/SOUSTRAIRE au
# lieu de prendre une part (question 1 : 140 = 150 − 10 ; question 2 : 15 =
# 40 − 25 ; écran 06 : « 80 − 20 » barré) ; 3. inverser l'opération (question
# 1 : 1 500 = 150 × 10) ; 6. pourcentage pris pour un nombre d'euros
# (question 2 : 25 €).
#
# Décor et métier : Karim, VENDEUR DE VÉLOS, pendant les soldes (vélo 80 €,
# casque 40 €, trottinette 120 €). Prix INVENTÉS : aucun chiffre du monde réel,
# pas de source à citer.
# Centres d'intérêt : velo (précision de « sport »), argent-budget.
#
# Micro → écrans : 10 % = ÷ 10 (02), nouveau prix (03), QUESTION 1 (04),
# 50 % = ÷ 2 et 25 % = ÷ 4 (05), le piège 20 % ≠ − 20 (06), QUESTION 2 (07),
# défi 30 % (08) et correction (08b), ce que tu as appris (09), fin (10).
# Écrans : 00 garde · 01 Karim et les soldes · 02 10 % = un dixième · 03 le
# nouveau prix · 04 QUESTION 1 · 05 la moitié et le quart · 06 le piège ·
# 07 QUESTION 2 · 08 défi trottinette · 08b correction · 09 ce que tu as
# appris · 10 fin.
#
# Voix : manim/voix/6e-prop-pourcentage-calcul.json (validée par Frédéric,
# débit −10), WAV dans public/sons/6e-prop-pourcentage-calcul/ ; marques mot à
# mot : manim/scripts/6e/prop_pourcentage_calcul_marques.json
# (scripts/marques_dump.ps1 puis scripts/cues2marques.py ; le second « 10 % »
# de 06-piege, jeté par cues2marques, ajouté à la main : [86, 10.376]).
# Outils : prop_commun.py + manim/canvas_proportion.py (non modifiés).
# BarrePourcent (mode « cases ») sert aux écrans 02, 06 et 08b, etiquette=False
# (son « 10 % » est sans_synchro : il s'afficherait avant d'être dit).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/prop_pourcentage_calcul.py PropPourcentageCalcul6e
# python -m manim render -qh --disable_caching manim/scripts/6e/prop_pourcentage_calcul.py PropPourcentageCalcul6e -o eleveai-maths-6e-prop-pourcentage-calcul --media_dir manim/media-prop-13
# Sortie : manim/sorties/6e/maths/proportionnalite/13-pourcentage-calcul/eleveai-maths-6e-prop-pourcentage-calcul.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403

CYAN_K = "#0ea5e9"      # le maillot de Karim, le cadre du vélo
ROUGE_SOLDE = "#dc2626"
CASE_1 = "#38bdf8"      # le premier 10 %
CASE_2 = "#a78bfa"      # le deuxième, le troisième 10 %


def karim(s=1.0):
    """Karim, vendeur de vélos : maillot cyan, casquette."""
    p = personne(peau="#a0673d", tenue=CYAN_K, cheveux="#111827", s=s)
    c = p.tete.get_center()
    r = p.tete.width / 2
    calotte = Sector(radius=r * 1.05, angle=PI, start_angle=0, fill_color="#1e3a8a", fill_opacity=1,
                     stroke_width=0).move_to(c + UP * r * 0.55)
    visiere = RoundedRectangle(width=r * 1.1, height=r * 0.22, corner_radius=r * 0.1, fill_color="#1e3a8a",
                               fill_opacity=1, stroke_width=0).move_to(c + P(r * 0.75, r * 0.12))
    p.add(calotte, visiere)
    return p


def velo(s=1.0, couleur=CYAN_K):
    """Un vélo : deux roues, cadre en triangle, selle, guidon."""
    R, F, C = P(-0.85, 0), P(0.85, 0), P(-0.05, 0)
    S, H = P(-0.32, 0.78), P(0.58, 0.82)
    roues = VGroup(*[VGroup(Circle(radius=0.55, stroke_color="#e2e8f0", stroke_width=6).move_to(x),
                            Dot(x, radius=0.06, color="#e2e8f0")) for x in (R, F)])
    cadre = VGroup(Line(R, C), Line(C, S), Line(S, R), Line(S, H), Line(H, C), Line(H, F)).set_stroke(couleur, 7)
    selle = RoundedRectangle(width=0.42, height=0.1, corner_radius=0.05, fill_color="#111827", fill_opacity=1,
                             stroke_color="#64748b", stroke_width=2).move_to(S + UP * 0.1)
    guidon = VGroup(Line(H, H + P(-0.08, 0.28)), Line(H + P(-0.08, 0.28), H + P(0.22, 0.3))).set_stroke("#e2e8f0", 6)
    pedale = Circle(radius=0.12, stroke_color="#e2e8f0", stroke_width=4).move_to(C)
    return VGroup(roues, cadre, pedale, selle, guidon).scale(s)


def casque(s=1.0):
    """Un casque de vélo vu de profil : coque orange bombée, trois aérations
    sombres, liseré, petite visière devant, sangle sous la coque."""
    coque = Polygon(*[P(0.8 * np.cos(a), 0.62 * np.sin(a)) for a in np.linspace(0, PI, 40)],
                    fill_color="#f97316", fill_opacity=1, stroke_color="#7c2d12", stroke_width=4)
    fentes = VGroup(*[Ellipse(width=0.34, height=0.12, fill_color="#1f2937", fill_opacity=1, stroke_width=0)
                      .rotate(a - PI / 2).move_to(P(0.5 * np.cos(a), 0.4 * np.sin(a)))
                      for a in (PI * 0.3, PI * 0.5, PI * 0.7)])
    lisere = Rectangle(width=1.6, height=0.1, fill_color="#1f2937", fill_opacity=1, stroke_width=0).move_to(
        P(0, 0.05))
    visiere = Polygon(P(0.62, 0.1), P(1.05, 0.0), P(0.78, 0.26), fill_color="#1f2937", fill_opacity=1,
                      stroke_width=0)
    sangle = Arc(radius=0.4, start_angle=PI * 1.15, angle=PI * 0.7, arc_center=P(0, 0.05), stroke_color="#1f2937",
                 stroke_width=5)
    return VGroup(sangle, coque, fentes, lisere, visiere).scale(s)


def trottinette(s=1.0):
    """Une trottinette : plateau, deux petites roues, colonne, guidon."""
    plateau = RoundedRectangle(width=1.5, height=0.14, corner_radius=0.06, fill_color="#334155", fill_opacity=1,
                               stroke_color="#94a3b8", stroke_width=2).move_to(P(-0.15, 0.15))
    roues = VGroup(*[Circle(radius=0.2, fill_color="#111827", fill_opacity=1, stroke_color="#e2e8f0",
                            stroke_width=4).move_to(P(x, 0)) for x in (-0.8, 0.75)])
    colonne = Line(P(0.75, 0), P(0.55, 1.6), color="#22c55e", stroke_width=8)
    guidon = Line(P(0.3, 1.6), P(0.8, 1.6), color="#e2e8f0", stroke_width=7)
    return VGroup(plateau, roues, colonne, guidon).scale(s)


def calculatrice(s=1.0):
    """Une calculatrice : boîtier, écran, 12 touches."""
    boite = RoundedRectangle(width=1.1, height=1.6, corner_radius=0.12, fill_color="#334155", fill_opacity=1,
                             stroke_color="#94a3b8", stroke_width=3)
    ecran = Rectangle(width=0.85, height=0.32, fill_color="#bbf7d0", fill_opacity=1, stroke_width=0).move_to(
        boite.get_top() + DOWN * 0.3)
    touches = VGroup(*[RoundedRectangle(width=0.18, height=0.16, corner_radius=0.03, fill_color="#e2e8f0",
                                        fill_opacity=1, stroke_width=0).move_to(P(-0.27 + 0.27 * (i % 3),
                                                                                    0.12 - 0.24 * (i // 3)))
                       for i in range(12)])
    return VGroup(boite, ecran, touches.shift(DOWN * 0.15)).scale(s)


def eclair(s=1.0, couleur=JAUNE_TITRE):
    """Un éclair : le raccourci."""
    return Polygon(P(0.1, 0.6), P(-0.3, -0.05), P(-0.02, -0.05), P(-0.15, -0.6), P(0.3, 0.1), P(0.02, 0.1),
                   fill_color=couleur, fill_opacity=1, stroke_color="#a16207", stroke_width=3).scale(s)


def etiquette_prix(txt, fs=36, couleur="#fef3c7", texte_c="#78350f"):
    """L'étiquette de prix du magasin : carte jaune pâle, œillet, prix."""
    t = Text(txt, font_size=fs, color=texte_c, weight=BOLD)
    l, h = t.width + 0.7, t.height + 0.36
    forme = Polygon(P(-l / 2, h / 2), P(l / 2 - 0.25, h / 2), P(l / 2, 0), P(l / 2 - 0.25, -h / 2), P(-l / 2, -h / 2),
                    fill_color=couleur, fill_opacity=1, stroke_color="#a16207", stroke_width=3)
    oeil = Circle(radius=0.06, fill_color=BLACK, fill_opacity=1, stroke_color="#a16207",
                  stroke_width=2).move_to(P(l / 2 - 0.28, 0))
    t.move_to(P(-0.12, 0))
    g = VGroup(forme, oeil, t)
    g.texte = t
    return g


class PropPourcentageCalculBase(PaysageProp):
    nom_voix = "6e-prop-pourcentage-calcul"
    fichier_marques = "prop_pourcentage_calcul_marques.json"

    def lc(self, morceaux, y, fs=40, x=1.3):
        """Une ligne de calcul centrée en x (non jouée)."""
        return self.ligne(morceaux, fs).move_to(P(x, y))

    def montrer(self, lg, mots, run_time=0.3, avec=None):
        """Chaque morceau de lg AU MOT donné (None : avec le morceau d'avant) ;
        avec[i] : animations jouées avec le morceau i."""
        avec = avec or {}
        for i, (m, mot) in enumerate(zip(lg, mots)):
            if mot:
                self.au_mot(*mot) if isinstance(mot, tuple) else self.au_mot(mot)
            self.play(FadeIn(m, shift=RIGHT * 0.15) if i else FadeIn(m, shift=UP * 0.12), *avec.get(i, []),
                      run_time=run_time)

    def ligne_rep(self, i, morceaux, fs=None):
        """Celle de prop_tableau.py : la ligne de réponse a la taille de la
        phrase qu'elle remplace, et reste à gauche de BORD_X."""
        lg = super().ligne_rep(i, morceaux, fs)
        ref = self.ph_q[i]
        lg.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
        g = lg.get_left()[0]
        if lg.get_right()[0] > self.BORD_X - 0.05:
            lg.scale_to_fit_width(self.BORD_X - 0.05 - g).align_to(P(g, 0), LEFT)
        return lg

    def table_reduc(self, valeurs, centre, fs=36, lc=1.4, ll=3.1):
        return TableauProp(["Prix (€)", "Réduction (€)"], valeurs, montrer=False, largeur_case=lc,
                           largeur_libelle=ll, fs=fs, centre=centre)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Calculer un pourcentage simple", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Calculer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        calc = calculatrice(1.2).move_to(P(-3.6, 0.35))
        self.au_mot("sans calculatrice")
        self.play(FadeIn(calc, scale=0.7), run_time=0.4)
        self.play(Create(croix(calc, sw=9)), run_time=0.4)
        cartes = VGroup()
        for _ in range(3):
            fond = RoundedRectangle(width=1.3, height=1.6, corner_radius=0.18, fill_color="#1e293b", fill_opacity=1,
                                    stroke_color=JAUNE_TITRE, stroke_width=4)
            cartes.add(VGroup(fond, eclair(1.0).move_to(fond)))
        cartes.arrange(RIGHT, buff=0.35).move_to(P(1.4, 0.35))
        self.au_mot("Trois raccourcis")
        self.play(LaggedStart(*[FadeIn(c, shift=UP * 0.3) for c in cartes], lag_ratio=0.25), run_time=0.8)
        self.play(LaggedStart(*[Indicate(c[1], color=WHITE, scale_factor=1.25) for c in cartes], lag_ratio=0.2),
                  run_time=0.8)
        self.attendre_voix(marge=0.6)

    # ── 01 : Karim, vendeur de vélos, et les soldes ─────────────────────────
    def decor_magasin(self, objet, prix, cle_prix, cle_pct, pct, mot_q, nom=True, mot_soldes="soldes", y_ban=2.75):
        """Le décor commun aux écrans 01 et 08 : Karim, l'objet, son étiquette,
        la bannière SOLDES, et la colonne « Prix / Réduction / En moins »."""
        pers = karim(1.0).move_to(P(-5.55, -1.0))
        if nom:
            self.au_mot("Voici Karim")
            n = self.t("Karim", 40, CYAN_K).next_to(pers, UP, buff=0.25)
            self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(n), run_time=0.5)
            self.au_mot("vend des vélos")
            met = self.t("vendeur de vélos", 28, CYAN_K).next_to(pers, DOWN, buff=0.2)
            met.shift(RIGHT * max(0, -6.5 - met.get_left()[0]))
            self.play(FadeIn(met, shift=DOWN * 0.1), FadeIn(objet, shift=LEFT * 0.4), run_time=0.5)
        else:
            self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(objet, shift=LEFT * 0.4), run_time=0.5)
        tag = etiquette_prix(f"{prix} €", 38).next_to(objet, UP, buff=0.3)
        l1 = self.ligne([("Prix :", WHITE), (f"{prix} €", JAUNE_TITRE)], 40)
        l1[0].sans_synchro = True
        self.col(l1, 1.75)
        self.au_mot(cle_prix)
        self.play(FadeIn(tag, scale=1.3), FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot(mot_soldes)
        ban = VGroup(RoundedRectangle(width=2.3, height=0.7, corner_radius=0.12, fill_color=ROUGE_SOLDE,
                                      fill_opacity=1, stroke_width=0))
        ban.add(Text("SOLDES", font_size=34, color=WHITE, weight=BOLD).move_to(ban[0]))
        ban.move_to(P(-2.4, y_ban))
        self.play(FadeIn(ban, scale=1.3), run_time=0.35)
        pastille = VGroup(Circle(radius=0.62, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_color=ROUGE_SOLDE,
                                 stroke_width=5))
        pct_t = Text(f"−{pct} %", font_size=30, color=ROUGE_SOLDE, weight=BOLD)
        pct_t.scale_to_fit_width(min(pct_t.width, 0.95))
        pastille.add(pct_t.move_to(pastille[0]))
        pastille.next_to(ban, RIGHT, buff=0.25)
        l2 = self.ligne([("Réduction :", WHITE), (f"{pct} %", ROUGE_SOLDE)], 40)
        l2[0].sans_synchro = True
        self.col(l2, 0.75)
        self.au_mot(cle_pct)
        self.play(FadeIn(pastille, scale=1.5), FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.insister(pastille, 1.2, 0.2)
        l3 = self.ligne([("En moins :", WHITE), ("? €", ORANGE_RETENUE)], 40)
        l3[0].sans_synchro = l3[1].sans_synchro = True
        self.col(l3, -0.25)
        self.au_mot(mot_q)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.4)
        self.insister(l3[1], 1.3, 0.2)
        return VGroup(pers, tag, ban, pastille, l1, l2, l3)

    def ecran_situation(self):
        self.ecran("01-situation")
        v = velo(1.35).move_to(P(-2.1, -0.75))
        self.decor_magasin(v, 80, "80 €", "10 %", 10, "Combien")
        self.attendre_voix()

    # ── 02 : 10 % = 10 sur 100 = un dixième : on divise par 10 ──────────────
    def ecran_dix(self):
        self.ecran("02-dix")
        bp = BarrePourcent(10, mode="cases", cote=0.32, etiquette=False, centre=P(-4.5, 0.9))
        tb = self.table_reduc([[100, 80], [10, 8]], centre=P(1.2, 1.75))
        self.play(FadeIn(bp, shift=UP * 0.2), run_time=0.5)
        l1 = self.lc([("10 %", WHITE), ("=", WHITE), ("10 sur", CASE_1), ("100", CASE_1)], -0.2)
        self.montrer(l1, [None, None, "10 sur", "sur 100"],
                     avec={2: [bp.remplir(run_time=0.3), FadeIn(tb.fond), FadeIn(tb.valeur(1, 0), scale=1.4)],
                           3: [FadeIn(tb.valeur(0, 0), scale=1.4)]})
        self.play(tb.allumer(1, 0), tb.allumer(0, 0), run_time=0.3)
        rang = SurroundingRectangle(bp.grille.liste[:10], color=AMBRE, buff=0.06, stroke_width=5)
        l2 = self.lc([("= 1 sur", WHITE), ("10 :", WHITE), ("un dixième", JAUNE_TITRE)], -0.95)
        self.montrer(l2, ["1 sur", "10 : un", "un dixième"], avec={0: [Create(rang)]})
        self.insister(l2[2], 1.15, 0.2)
        fl = tb.fleche_lat("÷ 10")
        self.au_mot("on divise")
        self.play(Create(fl.fleche), tb.eteindre(0, 0), tb.eteindre(1, 0), run_time=0.5)
        self.au_mot("par 10")
        self.play(FadeIn(fl.etiquette, scale=1.4), run_time=0.3)
        self.insister(fl.etiquette, 1.3, 0.2)
        l3 = self.lc([("80 ÷", WHITE), ("10", AMBRE), ("=", WHITE), ("8 €", VERT_OK)], -1.95, fs=46)
        self.au_mot("80 divisé")
        self.play(FadeIn(l3[0], shift=UP * 0.12), FadeIn(tb.valeur(0, 1), scale=1.4), FadeIn(tb.trou(1, 1)),
                  tb.allumer(0, 1), run_time=0.35)
        self.au_mot("par 10, égale")
        self.play(FadeIn(l3[1], shift=RIGHT * 0.15), FadeIn(l3[2]), Indicate(fl.etiquette, color=AMBRE), run_time=0.3)
        self.au_mot("égale 8")
        self.play(FadeIn(l3[3], scale=1.3), tb.remplir(1, 1, 8), run_time=0.4)
        self.au_mot("La réduction")
        self.play(tb.eteindre(0, 1), tb.allumer(1, 1), Indicate(tb.libelles[1], color=AMBRE), run_time=0.5)
        self.play(Create(self.encadrer(l3[3])), run_time=0.3)
        self.insister(l3[3], 1.2, 0.2)
        self.attendre_voix()

    # ── 03 : le nouveau prix : 80 − 8 = 72 € ───────────────────────────────
    def ecran_prix(self):
        self.ecran("03-prix")
        v = velo(1.5).move_to(P(-3.4, -0.9))
        self.play(FadeIn(v, shift=LEFT * 0.3), run_time=0.4)
        tit = self.t("Le nouveau prix", 46, JAUNE_TITRE)
        self.col(tit, 2.3)
        self.au_mot("nouveau prix")
        self.play(Write(tit), run_time=0.4)
        vieux = etiquette_prix("80 €", 40).move_to(P(-4.6, 1.4))
        lg = self.ligne([("80 −", WHITE), ("8", ROUGE_SOLDE), ("=", WHITE), ("72 €", VERT_OK)], 56)
        self.col(lg, 0.6)
        self.au_mot("80 moins")
        self.play(FadeIn(lg[0], shift=UP * 0.12), FadeIn(vieux, scale=1.3), run_time=0.35)
        moins = Text("− 8 €", font_size=40, color=ROUGE_SOLDE, weight=BOLD).next_to(vieux, RIGHT, buff=0.35)
        self.au_mot("8, égale")
        self.play(FadeIn(lg[1], shift=RIGHT * 0.15), FadeIn(moins, scale=1.3), run_time=0.3)
        neuf = etiquette_prix("72 €", 40, couleur="#dcfce7", texte_c="#14532d").move_to(P(-2.3, 2.3))
        barre = Line(vieux.get_corner(DL), vieux.get_corner(UR), color=ROUGE_SOLDE, stroke_width=7)
        self.au_mot("72 €")
        self.play(FadeIn(lg[2]), FadeIn(lg[3], scale=1.3), Create(barre), FadeIn(neuf, scale=1.4), run_time=0.4)
        self.play(Create(self.encadrer(lg[3])), run_time=0.3)
        self.insister(neuf, 1.2, 0.25)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (10 % de 150 €) ─────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        deco = VGroup(karim(0.9).move_to(P(-5.6, -1.0)), velo(1.2).move_to(P(-2.5, -0.6)))
        self.add(deco)
        tb = self.table_reduc([[150], ["?"]], centre=P(-4.0, 0.3), fs=40, lc=1.5, ll=2.9)
        fl = tb.fleche_lat("÷ 10")

        def apres(sc):
            sc.play(FadeOut(deco), FadeIn(tb.fond), FadeIn(tb.trou(1, 0)), run_time=0.3)
            l0 = sc.ligne_rep(0, ["150 ÷", "10 =", "15 €."])
            sc.au_mot("150 divisé")
            sc.play(FadeIn(l0[0], shift=UP * 0.12), FadeIn(tb.valeur(0, 0), scale=1.4), run_time=0.3)
            sc.au_mot("par 10")
            sc.play(FadeIn(l0[1], shift=UP * 0.12), Create(fl.fleche), FadeIn(fl.etiquette, scale=1.3), run_time=0.35)
            sc.au_mot("15 €")
            sc.play(FadeIn(l0[2], scale=1.3), tb.remplir(1, 0, 15), run_time=0.4)
            sc.play(tb.allumer(1, 0), run_time=0.3)
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse", ["Combien font", "10 % de 150 € ?"],
                            [self.t("15 €", 34), self.t("140 €", 34), self.t("1 500 €", 34)], 0,
                            ["150 ÷ 10 = 15 €."], mot_q="Combien", autres_r=apres)

    # ── 05 : 50 % = la moitié (÷ 2) ; 25 % = le quart (÷ 4) ─────────────────
    def colonne_raccourci(self, x, pct, nom, div, res, indices, mots):
        """Une colonne de l'écran 05 : la grille de 100 cases, puis trois lignes
        « 50 % = la moitié », « ÷ 2 », « 50 % de 80 € = 40 € », chacune au mot."""
        gr = grille100(0, cote=0.24, centre=P(x, 1.1), couleur=CASE_1)
        l1 = self.lc([(f"{pct} %", WHITE), (f"= {nom}", JAUNE_TITRE)], -0.95, fs=40, x=x)
        l2 = self.lc([("÷", AMBRE), (f"{div}", AMBRE)], -1.75, fs=54, x=x)
        l3 = self.lc([(f"{pct} % de", WHITE), ("80 € =", WHITE), (f"{res} €", VERT_OK)], -2.6, fs=38, x=x)
        m_pct, m_nom, m_div, m_de, m_80, m_res = mots
        self.au_mot(m_pct)
        self.play(FadeIn(gr, shift=UP * 0.2), FadeIn(l1[0], shift=UP * 0.12), run_time=0.4)
        self.au_mot(m_nom)
        self.play(FadeIn(l1[1], shift=RIGHT * 0.15), gr.colorier(indices, lag=0.01, run_time=0.9))
        self.au_mot(m_div)
        self.play(FadeIn(l2[0], scale=1.3), run_time=0.25)
        self.play(FadeIn(l2[1], scale=1.3), run_time=0.3)
        self.insister(l2, 1.25, 0.2)
        self.montrer(l3, [m_de, m_80, m_res])
        self.insister(l3[2], 1.15, 0.2)
        return VGroup(gr, l1, l2, l3)

    def ecran_moitie_quart(self):
        self.ecran("05-moitie-quart")
        tit = self.t("Deux autres raccourcis", 44, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.au_mot("Deux autres")
        self.play(Write(tit), run_time=0.5)
        self.colonne_raccourci(-3.6, 50, "la moitié", 2, 40, range(50),
                               ["50 %, c", "la moitié", "divise par 2", "50 % de 80", "80 €, égale 40", "égale 40"])
        self.colonne_raccourci(2.2, 25, "le quart", 4, 20, quadrant(0),
                               ["25 %, c", "le quart", "divise par 4", "25 % de 80", "80 €, égale 20", "égale 20"])
        self.attendre_voix()

    # ── 06 : le piège : 20 % de 80 € ≠ 80 − 20 ─────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        tit = self.t("Attention au piège !", 44, ROUGE_ERREUR).move_to(P(-0.4, 3.1))
        self.au_mot("Attention")
        self.play(Write(tit), run_time=0.5)
        l1 = self.lc([("20 % de", WHITE), ("80 €", WHITE), ("≠", ROUGE_ERREUR), ("80 −", ROUGE_ERREUR),
                      ("20", ROUGE_ERREUR)], 2.2, fs=44, x=-0.4)
        self.montrer(l1, ["20 % de 80", "80 €, ce", "n'est pas", "80 moins", "20. 20"])
        barre = Line(l1[3].get_corner(DL) + P(-0.1, 0), l1[4].get_corner(UR) + P(0.1, 0), color=ROUGE_ERREUR,
                     stroke_width=7)
        self.play(Create(barre), run_time=0.3)
        bp = BarrePourcent(20, mode="cases", cote=0.36, etiquette=False, centre=P(-4.45, -0.6))
        g = bp.grille
        xl = -1.0
        l2 = self.lc([("20 %", WHITE), ("= 2 ×", WHITE), ("10 %", CASE_1)], 0.8, fs=42)
        l2.align_to(P(xl, 0), LEFT)
        self.au_mot("20 %, c")
        self.play(FadeIn(bp, shift=UP * 0.2), FadeIn(l2[0], shift=UP * 0.12), run_time=0.4)
        self.au_mot("2 fois 10")
        self.play(FadeIn(l2[1], shift=RIGHT * 0.15), g.colorier(range(10), lag=0.02), run_time=0.4)
        self.au_mot("10 %. 10")
        l2[2].sans_synchro = True  # dit à l'instant (8,66 s), redit à 10,38 s : ne pas attendre le second
        self.play(FadeIn(l2[2], shift=RIGHT * 0.15), g.colorier(range(10, 20), couleur=CASE_2, lag=0.02), run_time=0.4)
        # « 8 € » écrit DANS chaque rangée coloriée (à côté, les deux étiquettes se touchaient)
        lab0 = Text("8 €", font_size=26, color=NUIT, weight=BOLD).move_to(VGroup(*g.cases[0]))
        lab1 = Text("8 €", font_size=26, color=NUIT, weight=BOLD).move_to(VGroup(*g.cases[1]))
        l3 = self.lc([("10 % de", WHITE), ("80 =", WHITE), ("8", VERT_OK)], -0.2, fs=42).align_to(P(xl, 0), LEFT)
        self.montrer(l3, ["10 % de 80", "80, égale", "égale 8"], avec={2: [FadeIn(lab0, scale=1.3)]})
        l4 = self.lc([("20 % =", WHITE), ("2 ×", WHITE), ("8", WHITE), ("=", WHITE), ("16 €", VERT_OK)], -1.2,
                     fs=42).align_to(P(xl, 0), LEFT)
        self.montrer(l4, ["Donc 20", "2 fois 8", "8 : 16", None, "16 €"], avec={2: [FadeIn(lab1, scale=1.3)]})
        self.play(Create(self.encadrer(l4[4])), run_time=0.3)
        self.insister(l4[4], 1.2, 0.2)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (25 % de 40 €, le casque) ───────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        deco = VGroup(karim(0.9).move_to(P(-5.6, -1.0)), casque(1.5).move_to(P(-2.6, 0.2)))
        self.add(deco)
        gr = grille100(0, cote=0.36, centre=P(-3.4, 0.1), couleur=CASE_1)

        def apres(sc):
            sc.play(FadeOut(deco), FadeIn(gr), run_time=0.3)
            l0 = sc.ligne_rep(0, ["25 %,", "c'est le quart."])
            sc.au_mot("25 %, c")
            sc.play(FadeIn(l0[0], shift=UP * 0.12), run_time=0.3)
            sc.au_mot("le quart")
            sc.play(FadeIn(l0[1], shift=UP * 0.12), gr.colorier(quadrant(0), lag=0.02, run_time=0.8))
            l1 = sc.ligne_rep(1, ["40 ÷", "4 =", "10 €."])
            for m, mot in zip(l1, ["40 divisé", "par 4", "10 €"]):
                sc.au_mot(mot)
                sc.play(FadeIn(m, shift=UP * 0.12) if mot != "10 €" else FadeIn(m, scale=1.3), run_time=0.3)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse", ["Un casque coûte 40 €.", "Combien font", "25 % de 40 € ?"],
                            [self.t("15 €", 34), self.t("25 €", 34), self.t("10 €", 34)], 2,
                            ["25 %, c'est le quart.", "40 ÷ 4 = 10 €."], mot_q="Un casque", autres_r=apres)

    # ── 08 : défi : la trottinette, 30 % de 120 € ───────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.play(Write(tit), run_time=0.6)
        tr = trottinette(1.3).move_to(P(-2.2, -1.0))
        self.au_mot("Une trottinette")
        self.decor_magasin(tr, 120, "120 €", "30 %", 30, "Combien", nom=False, mot_soldes="Karim fait", y_ban=1.9)
        self.pause_defi(y=-1.35)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.15))
        self.play(Write(tit), run_time=0.5)
        bp = BarrePourcent(30, mode="cases", cote=0.3, etiquette=False, centre=P(-4.4, -0.2))
        g = bp.grille
        self.play(FadeIn(bp, shift=UP * 0.2), run_time=0.4)
        xl = -1.6
        l1 = self.lc([("10 % de", WHITE), ("120 =", WHITE), ("12 €", CASE_1)], 1.9, fs=42).align_to(P(xl, 0), LEFT)
        self.montrer(l1, ["10 % de 120", "120, égale", "égale 12"],
                     avec={0: [g.colorier(range(10), lag=0.02, run_time=0.6)]})
        l2 = self.lc([("30 %", WHITE), ("= 3 ×", WHITE), ("10 %", CASE_1)], 0.9, fs=42).align_to(P(xl, 0), LEFT)
        self.montrer(l2, ["30 %, c", "3 fois 10", "10 %. 3"],
                     avec={1: [g.colorier(range(10, 20), couleur=CASE_2, lag=0.02, run_time=0.5)],
                           2: [g.colorier(range(20, 30), couleur=CASE_2, lag=0.02, run_time=0.5)]})
        l3 = self.lc([("3 ×", WHITE), ("12 =", WHITE), ("36 €", VERT_OK)], -0.1, fs=42).align_to(P(xl, 0), LEFT)
        self.montrer(l3, ["3 fois 12", "12, égale", "36 €"])
        self.insister(l3[2], 1.2, 0.2)
        l4 = self.lc([("120 −", WHITE), ("36 =", WHITE), ("84 €", VERT_OK)], -1.25, fs=46).align_to(P(xl, 0), LEFT)
        tr = trottinette(0.75).next_to(l4, RIGHT, buff=0.5)
        self.montrer(l4, ["120 moins", "36 : 84", "84 €"], avec={0: [FadeIn(tr, shift=LEFT * 0.3)]})
        self.play(Create(self.encadrer(l4[2])), run_time=0.3)
        self.insister(l4[2], 1.2, 0.2)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        grs = VGroup(grille100(10, cote=0.2, couleur=CASE_1), grille100(50, cote=0.2, couleur=CASE_1),
                     grille100(colories=quadrant(0), cote=0.2, couleur=CASE_1)).arrange(DOWN, buff=0.25)
        divs = VGroup(*[Text(s, font_size=44, color=AMBRE, weight=BOLD).next_to(g, LEFT, buff=0.3)
                        for s, g in zip(["÷ 10", "÷ 2", "÷ 4"], grs)])
        fig = VGroup(grs, divs)
        self.add(grs)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("10 % : on divise par 10.",), ("50 % : on divise par 2.",), ("25 % : on divise par 4.",),
            ("Pour 20 % ou 30 %,", "on part de 10 %.")], fs=36)
        for i, (mot, d) in enumerate(zip(["10 % : on", "50 % : on", "25 % : on"], [10, 2, 4])):
            self.au_mot(mot)
            self.montrer_ligne(lignes[i], Indicate(grs[i], color=AMBRE, scale_factor=1.05))
            self.au_mot(f"par {d}")
            self.play(FadeIn(divs[i], scale=1.3), run_time=0.3)
        self.au_mot("Pour 20")
        self.montrer_ligne(lignes[3])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_dix()
        self.ecran_prix()
        self.ecran_question1()
        self.ecran_moitie_quart()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PropPourcentageCalcul6e(PropPourcentageCalculBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
