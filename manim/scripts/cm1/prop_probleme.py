# prop_probleme.py
# EleveAI — Maths CM1 ET CM2 — série « Proportionnalité » CM, lot CM-B,
# épisode 07 : RÉSOUDRE UN PROBLÈME DE PROPORTIONNALITÉ (micro du coach :
# prop_probleme), épisode COMMUN, AVEC VOIX. Paysage 16:9 : CM1 CEINTURE VERTE
# (la paysage complète du niveau), CM2 CEINTURE JAUNE (le même cours en rappel,
# comme prop_tableau.py). Short jumeau : prop_probleme_short.py (blanche).
# ⭐ La méthode en QUATRE ÉTAPES, affichées à gauche comme une liste qui se
# coche (« Les étapes ») : 1 la question (que cherche-t-on ?), 2 un tableau, 3 on calcule,
# 4 une phrase réponse. Calcul par la LINÉARITÉ : 7 = 2 + 5, donc on ADDITIONNE
# deux colonnes (6 + 15 = 21) ; question 1 : 10 = 2 fois 5 (× 2 entre colonnes).
# ⛔ Pas de produit en croix ; « × » écrit, la voix dit « fois ».
# ⭐ Le piège : la DONNÉE INUTILE (chaque robot mesure 30 cm ; les 3 roues),
# barrée puis mise de côté.
# ⭐ Leurres : 1. ajouter au lieu de multiplier (question 1 : 25 = 15 + 10 ;
# question 2 : 8 = 4 + 4) ; 2. utiliser la donnée inutile (question 2 :
# 18 = 6 × 3 roues) ; 3. le mauvais nombre (question 1 : 60 = 6 × 10).
#
# Décor et métier : TECHNOLOGIE, Zoé, INGÉNIEURE en robots (petits robots pour
# une école). Nombres inventés, aucun chiffre du monde réel : pas de source.
# Centres d'intérêt : technologie-ia.
#
# Micro → écrans : garde (00) ; situation (01) ; étape 1 que cherche-t-on (02) ;
# étape 2 le tableau (03) ; étape 3 le calcul 6 + 15 = 21 (04) ; QUESTION 1
# (05, 10 robots) ; étape 4 la phrase (06) ; le piège des 30 cm (07) ;
# QUESTION 2 (08, capteurs, 3 roues inutiles) ; défi (09) et correction (09b,
# les vis) ; ce que tu as appris (10) ; fin (11).
#
# Voix : manim/voix/cm-prop-probleme.json (validée par Frédéric le 01/11, débit
# −10, ne cite aucune classe), WAV dans public/sons/cm-prop-probleme/ ; marques
# mot à mot : manim/scripts/cm1/prop_probleme_marques.json (scripts/marques_dump.ps1
# puis scripts/cues2marques.py).
# Outils : ../6e/prop_commun.py + manim/canvas_proportion.py (TableauProp), non
# modifiés. Ajouté ICI : robot(), pile(), regle(), zoe(), panneau() (la liste
# des étapes qui se coche), plus_bas(), ligne_rep() bornée et _disposer_q()
# en 34 (prop_tableau.py CM), garde() sans audit de l'identité (« CM1 »).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/prop_probleme.py PropProblemeCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/prop_probleme.py PropProblemeCM1 -o eleveai-maths-cm1-prop-probleme --media_dir manim/scripts/cm1/media-prop-probleme
# Garde CM2 seule : GARDE_SEULE=1 python -m manim render -qh --disable_caching manim/scripts/cm1/prop_probleme.py PropProblemeCM2 -o garde-cm2-prop-probleme --media_dir manim/scripts/cm1/media-prop-probleme
# python manim/scripts/cm1/frac_cm_commun.py coller <cm1.mp4> <garde-cm2.mp4> <cm2.mp4>
# Sorties : manim/sorties/cm1/maths/proportionnalite/07-probleme/eleveai-maths-cm1-prop-probleme.mp4
#           manim/sorties/cm2/maths/proportionnalite/07-probleme/eleveai-maths-cm2-prop-probleme.mp4

import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403

GRIS_ROBOT = "#94a3b8"
BLEU_ROBOT = "#3b82f6"
YEUX = "#22d3ee"
CAPTEUR = "#f59e0b"
VERT_PILE = "#22c55e"
GRIS_INUTILE = "#cbd5e1"
ETAPES = ["La question", "Un tableau", "On calcule", "Une phrase"]


def pas_audit(m):
    """Décor ou donnée déjà dite : ni synchro, ni audit (toute la famille de m)."""
    for f in m.get_family():
        f._pas_audit = True
        f.sans_synchro = True
    return m


def roue(r=0.12):
    return VGroup(Circle(radius=r, fill_color="#1f2937", fill_opacity=1, stroke_color="#e2e8f0", stroke_width=2),
                  Dot(radius=r * 0.3, color="#e2e8f0"))


def robot(s=1.0, roues=2, capteurs=False, couleur=BLEU_ROBOT):
    """Un petit robot d'école : tête grise (yeux cyan, antenne), corps bleu,
    roues en bas. capteurs=True : deux capteurs orange sur les côtés de la
    tête. .tete .corps .roues .capteurs (VGroup, vide sans capteurs)."""
    tete = RoundedRectangle(width=0.7, height=0.5, corner_radius=0.12, fill_color=GRIS_ROBOT, fill_opacity=1,
                            stroke_color=WHITE, stroke_width=2).move_to(P(0, 0.98))
    yeux = VGroup(*[Circle(radius=0.075, fill_color=YEUX, fill_opacity=1, stroke_width=0).move_to(P(x, 1.0))
                    for x in (-0.15, 0.15)])
    ant = VGroup(Line(P(0, 1.23), P(0, 1.42), color=WHITE, stroke_width=3),
                 Circle(radius=0.06, fill_color="#ef4444", fill_opacity=1, stroke_width=0).move_to(P(0, 1.45)))
    corps = RoundedRectangle(width=0.86, height=0.6, corner_radius=0.1, fill_color=couleur, fill_opacity=1,
                             stroke_color=WHITE, stroke_width=2).move_to(P(0, 0.42))
    voyant = Circle(radius=0.07, fill_color="#facc15", fill_opacity=1, stroke_width=0).move_to(P(0, 0.45))
    xs = [-0.28, 0.28] if roues == 2 else [-0.3, 0, 0.3]
    rr = VGroup(*[roue(0.12 if roues == 2 else 0.1).move_to(P(x, 0.04)) for x in xs])
    cap = VGroup()
    if capteurs:
        cap = VGroup(*[RoundedRectangle(width=0.12, height=0.24, corner_radius=0.05, fill_color=CAPTEUR,
                                        fill_opacity=1, stroke_width=0).move_to(P(x, 0.98)) for x in (-0.41, 0.41)])
    g = VGroup(ant, rr, corps, voyant, tete, yeux, cap).scale(s)
    g.tete, g.corps, g.roues, g.capteurs = tete, corps, rr, cap
    return pas_audit(g)


def pile(s=1.0):
    """Une pile verte (borne grise en haut)."""
    corps = RoundedRectangle(width=0.24, height=0.44, corner_radius=0.04, fill_color=VERT_PILE, fill_opacity=1,
                             stroke_color=WHITE, stroke_width=1.5)
    borne = Rectangle(width=0.1, height=0.06, fill_color="#e2e8f0", fill_opacity=1, stroke_width=0)
    borne.next_to(corps, UP, buff=0)
    return pas_audit(VGroup(corps, borne).scale(s))


def regle(h, couleur=GRIS_INUTILE):
    """Une toise verticale de hauteur h (trait + graduations)."""
    trait = Line(P(0, 0), P(0, h), color=couleur, stroke_width=4)
    grads = VGroup(*[Line(P(0, h * k / 6), P(0.12 if k % 3 else 0.2, h * k / 6), color=couleur, stroke_width=3)
                     for k in range(7)])
    return VGroup(trait, grads)


def zoe(s=1.0):
    """Zoé, ingénieure en robots : blouse turquoise, lunettes, badge."""
    p = personne(peau="#8d5524", tenue="#0f766e", cheveux="#1f2937", longs=True, s=s)
    p.add(lunettes(p, "#e2e8f0"))
    badge = RoundedRectangle(width=0.26 * s, height=0.18 * s, corner_radius=0.03, fill_color=YEUX, fill_opacity=1,
                             stroke_width=0).move_to(p.corps.get_center() + P(0.25 * s, 0.35 * s))
    p.add(badge)
    return pas_audit(p)


def plus_bas(tb, c0, c1, couleur=FLECHE_COL, fs=None):
    """Le « + » de la linéarité SOUS la carte (prop_resoudre.py)."""
    t = Text("+", font_size=fs or int(tb.fs * 1.3), color=couleur, weight=BOLD)
    return t.move_to(P((tb.x(c0) + tb.x(c1)) / 2, tb.carte.get_bottom()[1] - 0.35))


class Panneau(VGroup):
    """« Les étapes » : la liste des 4 étapes qui se coche, à gauche de l'écran.
    .cadre .titre · .lignes[i] = VGroup(boîte, texte) · .coches[i] (non ajoutées)."""

    def __init__(self, centre=P(-4.35, 0.35), fs=32, **kw):
        super().__init__(**kw)
        self.cadre = RoundedRectangle(width=4.1, height=3.9, corner_radius=0.2, fill_color="#0f172a", fill_opacity=1,
                                      stroke_color="#475569", stroke_width=3).move_to(centre)
        self.titre = pas_audit(Text("Les étapes", font_size=32, color=JAUNE_TITRE, weight=BOLD))
        self.titre.move_to(self.cadre.get_top() + DOWN * 0.42)
        self.lignes, self.coches = VGroup(), VGroup()
        for i, s in enumerate(ETAPES):
            boite = RoundedRectangle(width=0.4, height=0.4, corner_radius=0.06, stroke_color=WHITE, stroke_width=3,
                                     fill_color="#1e293b", fill_opacity=1)
            txt = Text(f"{i + 1}. {s}", font_size=fs, color=WHITE)
            txt.sans_synchro = True  # posée AU MOT « Étape N » par la scène (l'audit la contrôle)
            self.lignes.add(VGroup(boite, txt).arrange(RIGHT, buff=0.18))
        self.lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.42)
        if self.lignes.width > self.cadre.width - 0.4:
            self.lignes.scale_to_fit_width(self.cadre.width - 0.4)
        self.lignes.next_to(self.titre, DOWN, buff=0.4).align_to(self.cadre.get_left() + RIGHT * 0.22, LEFT)
        for lg in self.lignes:
            c = VMobject(stroke_color=VERT_OK, stroke_width=6)
            t = 0.16
            c.set_points_as_corners([[-t, 0, 0], [-t * 0.25, -t * 0.75, 0], [t, t * 0.8, 0]])
            self.coches.add(c.move_to(lg[0]))
        self.add(self.cadre, self.titre)

    def etat(self, visibles=4, cochees=0):
        """Ce qui est déjà à l'écran (repris d'un écran précédent) : à self.add."""
        g = VGroup(self.cadre, self.titre)
        for i in range(visibles):
            pas_audit(self.lignes[i])
            if i < cochees:
                self.lignes[i][1].set_color(VERT_OK)
            g.add(self.lignes[i])
            if i < cochees:
                g.add(self.coches[i])  # PAR-DESSUS la boîte (pleine)
        return g


class PropProblemeBaseCM(PaysageProp):
    nom_voix = "cm-prop-probleme"
    fichier_marques = "prop_probleme_marques.json"
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"
    LIBS = ["Robots", "Piles"]
    VALS = [[2, 5, 7], [6, 15, 21]]
    XC = 2.15   # le centre de la zone de droite (à droite du panneau)

    def garde(self, *a, **k):
        """L'identité (« CM1 » porte un 1) et l'échelle sont du décor."""
        titre, ident, ech = super().garde(*a, **k)
        pas_audit(ident)
        pas_audit(ech)
        return titre, ident, ech

    def ligne_rep(self, i, morceaux, fs=None):
        """Celle de prop_commun, à la taille de la ligne remplacée et bornée à
        droite (BORD_X), comme prop_tableau.py (CM)."""
        lg = super().ligne_rep(i, morceaux, fs)
        ref = self.ph_q[i]
        lg.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
        g = lg.get_left()[0]
        if lg.get_right()[0] > self.BORD_X - 0.05:
            lg.scale_to_fit_width(self.BORD_X - 0.05 - g).align_to(P(g, 0), LEFT)
        return lg

    def _disposer_q(self, question, choix, phrase):
        """CM : la phrase de réponse en 34 (au lieu de 30), sous les cartes."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        fs, gap = getattr(self, "_ph_fs", 34), getattr(self, "_ph_gap", 0.2)
        ph2 = self.col(self.bloc(phrase, fs, VERT_OK, buff=0.1), cartes.get_bottom()[1] - 0.3)
        ph2.align_to(P(0, cartes.get_bottom()[1] - gap), UP)
        self.ph_q = ph2
        return tete, q, cartes, pause, rebours, ph2

    def table(self, vals=None, libs=None, centre=None, larg=1.4, lib=2.0, fs=42):
        return TableauProp(libs or self.LIBS, vals or self.VALS, montrer=False, largeur_case=larg,
                           largeur_libelle=lib, hauteur=0.9, fs=fs,
                           centre=centre if centre is not None else P(self.XC, 0.9))

    def lc(self, morceaux, y, fs=46, x=None):
        """Une ligne de calcul centrée dans la zone de droite (non jouée)."""
        return self.ligne(morceaux, fs).move_to(P(self.XC if x is None else x, y))

    def jouer_ligne(self, lg, mots, avec=None):
        """Chaque morceau de lg à SON mot ; avec[k] : animations jouées avec lui."""
        for k, (m, mot) in enumerate(zip(lg, mots)):
            if mot:
                self.au_mot(mot)
            anims = [FadeIn(m, shift=RIGHT * 0.2) if k < len(lg) - 1 else FadeIn(m, scale=1.3)]
            if avec and avec.get(k):
                anims += avec[k]
            self.play(*anims, run_time=0.35)

    def etape(self, pn, i, mot, indiquer=True):
        """La ligne i du panneau entre AU MOT (le « 2 » de « Étape 2 : »)."""
        self.au_mot(mot)
        self.play(FadeIn(pn.lignes[i], shift=RIGHT * 0.25), run_time=0.3 if not indiquer else 0.45)
        if indiquer:
            self.play(Indicate(pn.lignes[i], color=AMBRE, scale_factor=1.12), run_time=0.5)

    def cocher(self, pn, i):
        self.play(Create(pn.coches[i]), pn.lignes[i][1].animate.set_color(VERT_OK), run_time=0.45)
        self.play(Flash(pn.lignes[i][0], color=VERT_OK, line_length=0.18, flash_radius=0.35), run_time=0.4)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Résoudre un problème de proportionnalité", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Résoudre")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        rb = robot(1.15).move_to(P(-2.3, 0.15))
        pl = VGroup(*[pile(0.9) for _ in range(3)]).arrange(RIGHT, buff=0.12).next_to(rb, LEFT, buff=0.5)
        self.au_mot("problème")
        self.play(FadeIn(rb, shift=UP * 0.3), LaggedStart(*[FadeIn(p, shift=DOWN * 0.2) for p in pl],
                                                          lag_ratio=0.15), run_time=0.7)
        q = self.t("Par où commencer ?", 50, ORANGE_RETENUE).move_to(P(2.3, 0.2))
        self.au_mot("Par où")
        self.play(FadeIn(q, scale=1.2), run_time=0.5)
        self.insister(q, 1.12, 0.25)
        self.attendre_voix(marge=0.6)

    # ── 01 : Zoé, ingénieure en robots ──────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = zoe(1.0).move_to(P(-5.45, -0.95))
        self.au_mot("Voici Zoé")
        nom = self.t("Zoé", 42, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("ingénieure")
        met = self.t("ingénieure", 32, BLEU_CALCUL).next_to(pers, DOWN, buff=0.15)
        met.shift(RIGHT * max(0, -6.4 - met.get_left()[0]))
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        rb = robot(1.2).move_to(P(-3.0, 1.25))
        self.au_mot("petits robots")
        self.play(FadeIn(rb, shift=RIGHT * 0.6), run_time=0.6)
        self.play(rb.animate(rate_func=there_and_back).shift(UP * 0.15), run_time=0.4)
        rg = regle(rb.height).next_to(rb, RIGHT, buff=0.15).align_to(rb, DOWN)
        l0 = self.ligne([("Chaque robot :", GRIS_INUTILE), ("30 cm", GRIS_INUTILE)], 40).move_to(P(0, 2.55))
        l0.align_to(P(-1.1, 0), LEFT)
        self.au_mot("Chaque robot")
        self.play(FadeIn(l0[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("30 centimètres")
        self.play(FadeIn(l0[1], scale=1.3), Create(rg), run_time=0.5)
        lignes = []
        for k, (q, v, mq, mv) in enumerate((("2 robots", "6 piles", "2 robots", "6 piles"),
                                            ("5 robots", "15 piles", "5 robots", "15 piles"))):
            lg = self.ligne([(q, WHITE), ("→", WHITE), (v, VERT_OK)], 46).move_to(P(0, 1.35 - 1.0 * k))
            lg.align_to(P(-1.1, 0), LEFT)
            self.au_mot(mq)
            self.play(FadeIn(lg[0], shift=RIGHT * 0.2), FadeIn(lg[1]), run_time=0.4)
            self.au_mot(mv)
            self.play(FadeIn(lg[2], scale=1.3), run_time=0.4)
            lignes.append(lg)
        l3 = self.ligne([("7 robots", WHITE), ("→", WHITE), ("? piles", ORANGE_RETENUE)], 46).move_to(P(0, -0.65))
        l3.align_to(P(-1.1, 0), LEFT)
        pas_audit(l3[2])
        self.au_mot("Combien")
        q = self.t("Combien ?", 40, ORANGE_RETENUE).move_to(P(1.4, -1.75))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.35)
        self.au_mot("pour 7")
        self.play(FadeIn(l3[0], shift=RIGHT * 0.2), FadeIn(l3[1]), FadeIn(l3[2], scale=1.3), run_time=0.45)
        self.insister(l3[2], 1.2, 0.2)
        self.attendre_voix()

    # ── 02 : étape 1, que cherche-t-on ? ────────────────────────────────────
    def ecran_chercher(self):
        self.ecran("02-chercher")
        pn = Panneau()
        self.play(FadeIn(pn, shift=RIGHT * 0.3), run_time=0.4)
        self.etape(pn, 0, "1 :")
        carte = RoundedRectangle(width=7.2, height=1.9, corner_radius=0.2, stroke_color=ORANGE_RETENUE,
                                 stroke_width=5, fill_color="#1c1206", fill_opacity=1).move_to(P(self.XC, 1.55))
        l1 = self.t("Le nombre de piles", 48).move_to(carte.get_center() + UP * 0.38)
        l2 = self.t("pour 7 robots", 48, ORANGE_RETENUE).move_to(carte.get_center() + DOWN * 0.42)
        self.au_mot("Le nombre")
        self.play(Create(carte), FadeIn(l1, shift=UP * 0.15), run_time=0.5)
        sept = VGroup(*[robot(0.42) for _ in range(7)]).arrange(RIGHT, buff=0.14).move_to(P(self.XC - 0.6, -1.0))
        pq = VGroup(pile(1.3), self.t("?", 64, ORANGE_RETENUE)).arrange(RIGHT, buff=0.15)
        pas_audit(pq).next_to(sept, RIGHT, buff=0.5)
        self.au_mot("pour 7")
        self.play(FadeIn(l2, scale=1.2), LaggedStart(*[FadeIn(r, shift=DOWN * 0.2) for r in sept], lag_ratio=0.08),
                  run_time=0.8)
        self.play(FadeIn(pq, scale=1.3), run_time=0.4)
        self.insister(l2, 1.12, 0.25)
        self.cocher(pn, 0)
        self.attendre_voix()

    # ── 03 : étape 2, le tableau ────────────────────────────────────────────
    def ecran_tableau(self):
        self.ecran("03-tableau")
        pn = Panneau()
        self.add(pn.etat(1, 1))
        self.etape(pn, 1, "2 :", indiquer=False)
        tb = self.table()
        self.au_mot("on range")
        self.play(FadeIn(tb.fond, shift=UP * 0.2), Indicate(pn.lignes[1], color=AMBRE, scale_factor=1.12),
                  run_time=0.6)
        for (r, c), mot in (((0, 0), "2 robots"), ((1, 0), "6 piles"), ((0, 1), "5 robots"), ((1, 1), "15 piles"),
                            ((0, 2), "7 robots")):
            self.au_mot(mot)
            self.play(FadeIn(tb.valeur(r, c), scale=1.4), tb.allumer(r, c), run_time=0.35)
            self.play(tb.eteindre(r, c), run_time=0.2)
        self.au_mot("la case vide")
        t = tb.trou(1, 2)
        self.play(FadeIn(t, scale=1.4), run_time=0.35)
        self.play(Indicate(t, color=AMBRE, scale_factor=1.3), run_time=0.6)
        self.cocher(pn, 1)
        self.attendre_voix()

    # ── 04 : étape 3, le calcul (7 = 2 + 5, donc 6 + 15 = 21) ───────────────
    def ecran_calcul(self):
        self.ecran("04-calcul")
        pn = Panneau()
        self.add(pn.etat(2, 2))
        tb = self.table()
        self.add(tb.fond, *[pas_audit(tb.valeur(r, c)) for r, c in ((0, 0), (1, 0), (0, 1), (1, 1), (0, 2))],
                 tb.trou(1, 2))
        self.etape(pn, 2, "3 :")
        l1 = self.lc([("7 =", WHITE), ("2 +", WHITE), ("5", WHITE)], -1.15)
        hp = tb.plus(0, 1)
        self.jouer_ligne(l1, ["7 robots", "2 robots plus", "5 robots"],
                         {0: [tb.allumer(0, 2)], 1: [tb.allumer(0, 0), FadeIn(hp, scale=1.5)], 2: [tb.allumer(0, 1)]})
        bp = plus_bas(tb, 0, 1)
        self.au_mot("on ajoute")
        self.play(*[tb.eteindre(0, c) for c in range(3)], tb.allumer(1, 0), tb.allumer(1, 1), FadeIn(bp, scale=1.5),
                  run_time=0.45)
        l2 = self.lc([("6 +", WHITE), ("15 =", WHITE), ("21 piles", VERT_OK)], -2.1)
        self.jouer_ligne(l2, ["6 plus", "15, égale", "21 piles"],
                         {2: [tb.remplir(1, 2, 21), tb.eteindre(1, 0), tb.eteindre(1, 1)]})
        self.play(tb.allumer(1, 2), run_time=0.25)
        self.insister(l2[2], 1.2, 0.25)
        self.cocher(pn, 2)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (10 robots : 2 fois plus que 5) ─────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        tb = self.table(vals=[[2, 5, 7, 10], [6, 15, 21, 30]], centre=P(-3.15, 1.1), larg=1.15, lib=1.7, fs=38)
        self.add(tb.fond, *[pas_audit(tb.valeur(r, c)) for r in range(2) for c in range(3)])
        g5 = [VGroup(*[robot(0.3) for _ in range(5)]).arrange(RIGHT, buff=0.07) for _ in range(2)]
        dix = VGroup(*g5).arrange(RIGHT, buff=0.45).move_to(P(-3.15, -1.65))
        cadres = VGroup(*[SurroundingRectangle(g, color=FLECHE_COL, buff=0.1, corner_radius=0.1) for g in g5])

        def apres(sc):
            l0 = sc.ligne_rep(0, ["10 robots :", "2 fois plus", "que 5."])
            l1 = sc.ligne_rep(1, ["15 ×", "2 =", "30 piles."])
            h = tb.fleche_col(1, 3, "× 2", ligne=0)
            b = tb.fleche_col(1, 3, "× 2", ligne=1)
            sc.au_mot("10 robots")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), FadeIn(tb.valeur(0, 3), scale=1.4), FadeIn(tb.trou(1, 3)),
                    LaggedStart(*[FadeIn(r, shift=DOWN * 0.15) for r in list(dix[0]) + list(dix[1])], lag_ratio=0.04),
                    run_time=0.6)
            sc.au_mot("2 fois plus")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), tb.allumer(0, 1), tb.allumer(0, 3), Create(h.fleche),
                    FadeIn(h.etiquette, scale=1.3), run_time=0.45)
            sc.au_mot("que 5")
            sc.play(FadeIn(l0[2], shift=UP * 0.15), LaggedStart(*[Create(c) for c in cadres], lag_ratio=0.4),
                    run_time=0.6)
            sc.au_mot("Donc 2 fois")
            sc.play(tb.eteindre(0, 1), tb.eteindre(0, 3), tb.allumer(1, 1), Create(b.fleche),
                    FadeIn(b.etiquette, scale=1.3), run_time=0.45)
            sc.au_mot("15 fois")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("2, égale")
            sc.play(FadeIn(l1[1], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("30 piles")
            sc.play(FadeIn(l1[2], scale=1.3), tb.remplir(1, 3, 30), tb.eteindre(1, 1), run_time=0.4)
            sc.play(tb.allumer(1, 3), run_time=0.25)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse", ["Combien de piles", "pour 10 robots ?"],
                            [self.t("25 piles", 36), self.t("30 piles", 36), self.t("60 piles", 36)], 1,
                            ["10 robots : 2 fois plus que 5.", "15 × 2 = 30 piles."],
                            mot_q="combien", autres_r=apres)

    # ── 06 : étape 4, la phrase réponse ─────────────────────────────────────
    def ecran_phrase(self):
        self.ecran("06-phrase")
        pn = Panneau()
        self.add(pn.etat(3, 3))
        tb = self.table(centre=P(self.XC, 1.75))
        self.add(tb.fond, *[pas_audit(tb.valeur(r, c)) for r in range(2) for c in range(3)])
        self.etape(pn, 3, "4 :")
        r1 = self.ligne([("Zoé a besoin", WHITE), ("de 21 piles", VERT_OK)], 46)
        r2 = self.ligne([("pour 7 robots.", WHITE)], 46)
        bloc = VGroup(r1, r2).arrange(DOWN, buff=0.25).move_to(P(self.XC, -0.95))
        cadre = SurroundingRectangle(bloc, color=VERT_OK, buff=0.3, corner_radius=0.15, stroke_width=5)
        self.au_mot("Zoé a besoin")
        self.play(FadeIn(r1[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("de 21")
        self.play(FadeIn(r1[1], scale=1.3), tb.allumer(1, 2), run_time=0.4)
        self.au_mot("pour 7")
        self.play(FadeIn(r2[0], shift=RIGHT * 0.2), tb.allumer(0, 2), run_time=0.4)
        self.play(Create(cadre), run_time=0.45)
        self.cocher(pn, 3)
        self.play(Indicate(VGroup(pn.lignes, pn.coches), color=VERT_OK, scale_factor=1.06), run_time=0.7)  # coches DESSUS
        self.attendre_voix()

    # ── 07 : le piège, le nombre inutile (30 cm) ────────────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 48, ROUGE_ERREUR).move_to(P(-0.4, 3.1))
        self.play(Write(tit), run_time=0.5)
        sous = self.t("Un problème peut cacher un nombre inutile.", 36).move_to(P(-0.4, 2.3))
        self.au_mot("Un problème")
        self.play(FadeIn(sous, shift=UP * 0.15), run_time=0.5)
        carte = RoundedRectangle(width=7.5, height=2.9, corner_radius=0.2, fill_color="#0f172a", fill_opacity=1,
                                 stroke_color="#475569", stroke_width=3).move_to(P(-2.55, 0.05))
        e0 = self.ligne([("Chaque robot mesure", GRIS_INUTILE), ("30 cm.", GRIS_INUTILE)], 36, buff=0.16)
        e1 = pas_audit(self.t("2 robots : 6 piles.", 36))
        e2 = pas_audit(self.t("5 robots : 15 piles.", 36))
        lignes = VGroup(e0, e1, e2).arrange(DOWN, aligned_edge=LEFT, buff=0.35).move_to(carte)
        self.au_mot("nombre inutile")
        self.play(FadeIn(carte), FadeIn(e1), FadeIn(e2), run_time=0.5)
        rb = robot(1.3).move_to(P(3.3, 0.15))
        rg = regle(rb.height).next_to(rb, RIGHT, buff=0.15).align_to(rb, DOWN)
        cm = self.t("30 cm", 34, GRIS_INUTILE).next_to(rg, RIGHT, buff=0.45)
        self.au_mot("Chaque robot")
        self.play(FadeIn(rb, shift=UP * 0.2), FadeIn(e0[0], shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("30 centimètres")
        self.play(FadeIn(e0[1], scale=1.2), Create(rg), FadeIn(cm, scale=1.2), run_time=0.45)
        self.au_mot("ne sert pas")
        barre = Line(e0.get_left() + LEFT * 0.1, e0.get_right() + RIGHT * 0.1, color=ROUGE_ERREUR, stroke_width=6)
        croix = VGroup(Line(cm.get_corner(UL), cm.get_corner(DR)), Line(cm.get_corner(DL), cm.get_corner(UR)))
        croix.set_stroke(ROUGE_ERREUR, 6)
        self.play(Create(barre), Create(croix), run_time=0.5)
        self.au_mot("compter les piles")
        self.play(Indicate(VGroup(e1, e2), color=VERT_OK, scale_factor=1.08), run_time=0.7)
        cote = RoundedRectangle(width=6.2, height=0.95, corner_radius=0.15, stroke_color=GRIS_INUTILE,
                                stroke_width=3).set_stroke(opacity=0.8).move_to(P(-2.55, -2.35))
        lab = self.t("De côté", 30, GRIS_INUTILE).next_to(cote, UP, buff=0.08).align_to(cote, LEFT)
        self.au_mot("On le laisse")
        self.play(Create(cote), FadeIn(lab), run_time=0.4)
        mot = VGroup(e0, barre)
        self.play(mot.animate.scale(0.8).move_to(cote).set_opacity(0.55),
                  VGroup(e1, e2).animate.move_to(carte), run_time=0.8)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (capteurs ; les 3 roues sont inutiles) ──────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        deux = VGroup(*[robot(1.05, roues=3, capteurs=True) for _ in range(2)]).arrange(RIGHT, buff=0.7)
        deux.move_to(P(-3.2, -1.45))
        self.add(deux)
        tb = self.table(vals=[[2, 6], [4, 12]], libs=["Robots", "Capteurs"], centre=P(-3.2, 1.55), larg=1.35,
                        lib=2.3, fs=40)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["4 ×", "3 =", "12 capteurs."])
            l1 = sc.ligne_rep(1, ["Les 3 roues :", "inutiles !"])
            h = tb.fleche_col(0, 1, "× 3", ligne=0)
            b = tb.fleche_col(0, 1, "× 3", ligne=1)
            sc.au_mot("6 robots")
            sc.play(FadeIn(tb.fond), FadeIn(pas_audit(tb.valeur(0, 0))), FadeIn(pas_audit(tb.valeur(1, 0))),
                    FadeIn(tb.valeur(0, 1), scale=1.4), FadeIn(tb.trou(1, 1)), run_time=0.45)
            sc.au_mot("3 fois plus")
            sc.play(tb.allumer(0, 0), tb.allumer(0, 1), Create(h.fleche), FadeIn(h.etiquette, scale=1.3),
                    run_time=0.45)
            sc.au_mot("4 fois")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), tb.eteindre(0, 0), tb.eteindre(0, 1), tb.allumer(1, 0),
                    Indicate(VGroup(*[r.capteurs for r in deux]), color=WHITE, scale_factor=1.3), run_time=0.4)
            sc.au_mot("3, égale")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), Create(b.fleche), FadeIn(b.etiquette, scale=1.3), run_time=0.35)
            sc.au_mot("12 capteurs")
            sc.play(FadeIn(l0[2], scale=1.3), tb.remplir(1, 1, 12), tb.eteindre(1, 0), run_time=0.4)
            sc.play(tb.allumer(1, 1), run_time=0.25)
            croix = VGroup()
            for r in deux:
                for w in r.roues:
                    c = w.get_center()
                    d = w.width * 0.75
                    croix.add(VGroup(Line(c + P(-d, -d), c + P(d, d)), Line(c + P(-d, d), c + P(d, -d)))
                              .set_stroke(ROUGE_ERREUR, 5))
            sc.au_mot("Les 3 roues")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), LaggedStart(*[Create(x) for x in croix], lag_ratio=0.1),
                    run_time=0.6)
            sc.au_mot("ne servaient")
            sc.play(FadeIn(l1[1], scale=1.2), run_time=0.35)
            sc.rep_fini()

        self._ph_fs, self._ph_gap = 32, 0.15  # 3 lignes de question : la réponse plus serrée (bord bas)
        self.question_pause("08-question", "08b-reponse",
                            ["2 robots ont 4 capteurs.", "Chaque robot a 3 roues.", "Combien pour 6 robots ?"],
                            [self.t("18 capteurs", 36), self.t("12 capteurs", 36), self.t("8 capteurs", 36)], 1,
                            ["4 × 3 = 12 capteurs.", "Les 3 roues : inutiles !"], mot_q="2 robots",
                            autres_r=apres)
        self._ph_fs, self._ph_gap = 34, 0.2

    # ── 09 : défi : les vis ─────────────────────────────────────────────────
    VALS_D = [[3, 4, 7], [9, 12, 21]]

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        pn = Panneau()
        self.add(pn.etat(4, 0))
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(self.XC, 3.1))
        self.play(Write(tit), run_time=0.6)
        tb = self.table(vals=self.VALS_D, libs=["Robots", "Vis"], centre=P(self.XC, 1.35))
        self.au_mot("3 robots")
        self.play(FadeIn(tb.fond, shift=UP * 0.2), FadeIn(tb.valeur(0, 0), scale=1.4), run_time=0.45)
        for (r, c), mot in (((1, 0), "9 vis"), ((0, 1), "4 robots"), ((1, 1), "12 vis"), ((0, 2), "7 robots")):
            self.au_mot(mot)
            self.play(FadeIn(tb.valeur(r, c), scale=1.4), run_time=0.35)
        self.play(FadeIn(tb.trou(1, 2), scale=1.4), run_time=0.3)
        ph = self.t("Ta phrase réponse :", 36, BLEU_CALCUL).move_to(P(0, -0.45)).align_to(P(-1.6, 0), LEFT)
        tir = DashedLine(ph.get_right() + RIGHT * 0.2, P(5.6, ph.get_y() - 0.18), color=BLEU_CALCUL,
                         dash_length=0.15)
        tir.shift(DOWN * 0.18)
        self.au_mot("ta phrase")
        self.play(FadeIn(ph, shift=RIGHT * 0.2), Create(tir), Indicate(pn.lignes[3], color=AMBRE), run_time=0.6)
        self.pause_defi(y=-1.6)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        pn = Panneau()
        self.add(pn.etat(4, 0))
        tb = self.table(vals=self.VALS_D, libs=["Robots", "Vis"], centre=P(self.XC, 1.2))
        self.add(tb.fond, *[pas_audit(tb.valeur(r, c)) for r, c in ((0, 0), (1, 0), (0, 1), (1, 1), (0, 2))],
                 tb.trou(1, 2))
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(self.XC, 3.3))
        self.au_mot("Correction")
        self.play(Write(tit), run_time=0.5)
        self.play(*[Create(pn.coches[i]) for i in (0, 1)], *[pn.lignes[i][1].animate.set_color(VERT_OK) for i in (0, 1)],
                  run_time=0.4)
        l1 = self.lc([("7 =", WHITE), ("3 +", WHITE), ("4", WHITE)], -1.0, fs=42)
        hp = tb.plus(0, 1)
        self.jouer_ligne(l1, ["7 robots", "3 robots plus", "4 robots"],
                         {0: [tb.allumer(0, 2)], 1: [tb.allumer(0, 0), FadeIn(hp, scale=1.5)], 2: [tb.allumer(0, 1)]})
        bp = plus_bas(tb, 0, 1)
        l2 = self.lc([("9 +", WHITE), ("12 =", WHITE), ("21 vis", VERT_OK)], -1.72, fs=42)
        self.jouer_ligne(l2, ["9 plus", "12, égale", "21 vis"],
                         {0: [*[tb.eteindre(0, c) for c in range(3)], tb.allumer(1, 0), FadeIn(bp, scale=1.5)],
                          1: [tb.allumer(1, 1)],
                          2: [tb.remplir(1, 2, 21), tb.eteindre(1, 0), tb.eteindre(1, 1)]})
        self.play(tb.allumer(1, 2), run_time=0.25)
        self.cocher(pn, 2)
        r1 = self.ligne([("Il faut", WHITE), ("21 vis", VERT_OK)], 40)
        r2 = self.ligne([("pour 7 robots.", WHITE)], 40)
        VGroup(r1, r2).arrange(DOWN, buff=0.12).move_to(P(self.XC - 0.4, -2.78))
        self.au_mot("il faut 21")
        self.play(FadeIn(r1[0], shift=RIGHT * 0.2), FadeIn(r1[1], scale=1.3), run_time=0.45)
        self.au_mot("pour 7")
        self.play(FadeIn(r2[0], shift=RIGHT * 0.2), run_time=0.4)
        self.cocher(pn, 3)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        rb = robot(0.8).move_to(P(5.5, 2.6))
        self.add(rb)
        lignes = VGroup()
        for s, couleur in (("On cherche la question.", WHITE), ("On range les données dans un tableau.", WHITE),
                           ("On calcule.", WHITE), ("On répond par une phrase.", WHITE),
                           ("On laisse de côté les nombres inutiles.", ROUGE_ERREUR)):
            lignes.add(VGroup(self.coche(), VGroup(self.t(s, 38, couleur))).arrange(RIGHT, buff=0.25))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.36).align_to(P(-5.9, 0), LEFT).align_to(P(0, 2.45), UP)
        for lg, mot in zip(lignes, ["on cherche", "on range", "on calcule", "puis on répond", "Et on laisse"]):
            self.au_mot(mot)
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.0)

    def construct(self):
        ecrans = [self.page_de_garde, self.ecran_situation, self.ecran_chercher, self.ecran_tableau,
                  self.ecran_calcul, self.ecran_question1, self.ecran_phrase, self.ecran_piege,
                  self.ecran_question2, self.ecran_defi, self.ecran_correction, self.ecran_finale]
        if os.environ.get("GARDE_SEULE") == "1":  # la garde CM2 seule (voir l'en-tête)
            ecrans[0]()
            return
        for e in ecrans:
            e()
        self.page_abonnement("11-abonne")


class PropProblemeCM1(PropProblemeBaseCM):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"


class PropProblemeCM2(PropProblemeBaseCM):
    identite = "Maths CM2 — EleveAI"
    ceinture = "jaune"
