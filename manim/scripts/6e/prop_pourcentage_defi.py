# prop_pourcentage_defi.py
# EleveAI — Maths 6e — série « Proportionnalité », lot 3 (6e pourcentages),
# épisode 14 : DÉFIS SUR LES POURCENTAGES (micro du coach : pourcentage_defi),
# AVEC VOIX. Paysage 16:9, CEINTURE VERTE (la paysage complète du niveau ; un
# défi garde la verte, consigne du lot 1). Short jumeau :
# prop_pourcentage_defi_short.py (blanche).
# ⭐ Méthode travaillée : RAMENER À 100 avec le tableau de proportionnalité
# (l'opération écrite sur la flèche : × 2, × 5, ÷ 4), « sur 100 » vu sur les
# 100 cases ; COMPARER deux parts en les ramenant toutes deux sur 100.
# ⛔ Pas de produit en croix (6e) ; « ÷ » pour une division.
# Lien sans duplication : fractions 6e 12 (pourcentage ↔ fraction) et 13
# (pourcentage ↔ décimal) : même grille de 100 cases (grille100).
# ⭐ Leurres (consigne-videos-proportionnalite.md) : 6. le pourcentage pris
# pour un nombre (question 1 : 50 billets ; question 2 : 12 % ; le piège
# « 18 places ≠ 18 % ») ; 1. ajouter / soustraire au lieu de multiplier
# (question 1 : 150 = 200 − 50 ; question 2 : 62 % = 12 + 50).
#
# Décor et métier : MUSIQUE, Thomas, ORGANISATEUR D'UN FESTIVAL de musique
# (200 billets ; deux groupes et leurs salles ; un stand de crêpes ; les
# spectateurs à vélo). Chiffres INVENTÉS : aucun fait du monde réel, pas de
# source à citer. Centres d'intérêt : musique, jeux-defis.
#
# Micro → écrans : situation (01) ; 30 % de 200 par le tableau × 2 (02) ;
# QUESTION 1 (03, 50 % de 200) ; comparer 18 sur 20 et 85 % en ramenant à 100
# (04) ; le piège 18 places ≠ 18 % (05) ; QUESTION 2 (06, 12 sur 50) ; défi
# 25 % de 200 (07) et correction ÷ 4 (07b) ; ce que tu as appris (08) ; fin (09).
#
# Voix : manim/voix/6e-prop-pourcentage-defi.json (validée par Frédéric,
# débit −10), WAV dans public/sons/6e-prop-pourcentage-defi/ ; marques mot à
# mot : manim/scripts/6e/prop_pourcentage_defi_marques.json
# (scripts/marques_dump.ps1 puis scripts/cues2marques.py).
# Outils : prop_commun.py + manim/canvas_proportion.py (non modifiés).
# BarrePourcent (mode « chargement ») : les jauges de remplissage des salles
# (écran 04, finale), etiquette=False (son « 85 % » est sans_synchro : il
# s'afficherait avant d'être dit) ; les 100 cases viennent de grille100.
# Ajouté ICI (absent du module) : thomas(), scene_festival(), billet(),
# sieges() (les 20 places d'une salle), stand_crepes(), velo() ; ligne_rep
# surchargée (celle de prop_tableau.py).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/prop_pourcentage_defi.py PropPourcentageDefi6e
# python -m manim render -qh --disable_caching manim/scripts/6e/prop_pourcentage_defi.py PropPourcentageDefi6e -o eleveai-maths-6e-prop-pourcentage-defi --media_dir manim/media-prop-14
# Sortie : manim/sorties/6e/maths/proportionnalite/14-pourcentage-defi/eleveai-maths-6e-prop-pourcentage-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403

VIOLET_S = "#a78bfa"   # la scène du festival
SIEGE_P = "#f97316"    # une place remplie
SIEGE_V = "#334155"    # une place vide
CASE_C = "#38bdf8"     # les cases coloriées (bleu du coach)
JAUGE_A = "#22c55e"    # la jauge du groupe A
JAUGE_B = "#f59e0b"    # la jauge du groupe B


def muet(t):
    """Un Text décoratif ou dit en mots : ni attente de synchro, ni audit."""
    for f in t.get_family():
        if isinstance(f, Text):
            f.sans_synchro = True
            f._pas_audit = True
    return t


def thomas(s=1.0):
    """Thomas, organisateur du festival : t-shirt violet, casque audio, badge."""
    p = personne(peau="#c68642", tenue="#7c3aed", cheveux="#1f2937", longs=False, s=s)
    p.add(casque_audio(p))
    c = p.corps.get_center()
    badge = RoundedRectangle(width=0.36 * s, height=0.26 * s, corner_radius=0.04 * s, fill_color=WHITE,
                             fill_opacity=1, stroke_width=0).move_to(c + P(0.18 * s, 0.25 * s))
    cordon = VGroup(Line(badge.get_top(), p.tete.get_bottom() + LEFT * 0.2 * s),
                    Line(badge.get_top(), p.tete.get_bottom() + RIGHT * 0.25 * s)).set_stroke("#facc15", 3)
    p.add(cordon, badge)
    return p


def note(s=1.0, couleur=JAUNE_TITRE):
    """Une croche de musique."""
    tete = Ellipse(width=0.26, height=0.19, fill_color=couleur, fill_opacity=1, stroke_width=0).rotate(0.4)
    hampe = Line(P(0.11, 0.03), P(0.11, 0.55), color=couleur, stroke_width=5)
    drapeau = CubicBezier(P(0.11, 0.55), P(0.3, 0.45), P(0.32, 0.3), P(0.24, 0.18), stroke_color=couleur,
                          stroke_width=5)
    return VGroup(tete, hampe, drapeau).scale(s)


def scene_festival(s=1.0):
    """La scène : plancher, fond violet, deux projecteurs, des notes."""
    fond = RoundedRectangle(width=3.6, height=2.0, corner_radius=0.15, fill_color="#312e81", fill_opacity=1,
                            stroke_color=VIOLET_S, stroke_width=4).move_to(P(0, 0.35))
    plancher = Rectangle(width=4.0, height=0.3, fill_color="#78350f", fill_opacity=1, stroke_width=0).move_to(
        P(0, -0.8))
    faisceaux = VGroup(*[Polygon(P(x, 1.3), P(x + d * 0.35, 1.3), P(x + d * 1.2, -0.62), P(x + d * 0.5, -0.62),
                                 fill_color="#fde68a", fill_opacity=0.28, stroke_width=0)
                         for x, d in ((-1.5, 1), (1.5, -1))])
    spots = VGroup(*[Circle(radius=0.13, fill_color="#fde68a", fill_opacity=1, stroke_width=0).move_to(P(x, 1.3))
                     for x in (-1.5, 1.5)])
    notes = VGroup(note(0.8).move_to(P(-0.6, 0.55)), note(0.65, "#f472b6").move_to(P(0.2, 0.85)),
                   note(0.75, "#38bdf8").move_to(P(0.85, 0.4)))
    g = VGroup(fond, faisceaux, plancher, spots, notes).scale(s)
    g.notes = notes
    return g


def billet(s=1.0, couleur="#fde68a"):
    """Un billet de concert : rectangle, encoche pointillée, une note."""
    corps = RoundedRectangle(width=1.4, height=0.7, corner_radius=0.08, fill_color=couleur, fill_opacity=1,
                             stroke_color="#a16207", stroke_width=2)
    coupe = DashedLine(P(0.35, 0.32), P(0.35, -0.32), color="#a16207", stroke_width=2, dash_length=0.06)
    n = note(0.5, "#7c3aed").move_to(P(-0.2, 0))
    return VGroup(corps, coupe, n).scale(s)


def sieges(remplis=18, n=20, par_rang=10, cote=0.34, ecart=0.08):
    """Les places d'une salle : n petits fauteuils, les `remplis` premiers en
    orange. .places (VGroup) ; .remplir(k) → animation des k premières."""
    g = VGroup(*[RoundedRectangle(width=cote, height=cote, corner_radius=0.06,
                                  fill_color=SIEGE_P if i < remplis else SIEGE_V, fill_opacity=1,
                                  stroke_color=WHITE, stroke_width=1.5)
                 .move_to(P((i % par_rang) * (cote + ecart), -(i // par_rang) * (cote + ecart))) for i in range(n)])
    g.places = g
    return g.move_to(ORIGIN)


def stand_crepes(s=1.0):
    """Un stand de crêpes : comptoir, toit rayé, une pile de crêpes."""
    comptoir = Rectangle(width=2.6, height=1.0, fill_color="#b45309", fill_opacity=1, stroke_color="#78350f",
                         stroke_width=3).move_to(P(0, -0.6))
    poteaux = VGroup(*[Line(P(x, -0.1), P(x, 1.2), color="#e5e7eb", stroke_width=6) for x in (-1.2, 1.2)])
    toit = VGroup(*[Polygon(P(-1.5 + 0.5 * k, 1.2), P(-1.0 + 0.5 * k, 1.2), P(-1.0 + 0.5 * k, 1.55),
                            P(-1.5 + 0.5 * k, 1.55), fill_color="#ef4444" if k % 2 == 0 else WHITE,
                            fill_opacity=1, stroke_width=0) for k in range(6)])
    pile = VGroup(*[Ellipse(width=1.0, height=0.16, fill_color="#fcd34d", fill_opacity=1, stroke_color="#b45309",
                            stroke_width=2).move_to(P(0, 0.0 + 0.09 * k)) for k in range(5)])
    mot = muet(Text("CRÊPES", font_size=26, color=WHITE, weight=BOLD)).move_to(P(0, -0.6))
    return VGroup(poteaux, toit, comptoir, pile, mot).scale(s)


def velo(s=1.0, couleur="#22d3ee"):
    """Un vélo de profil : deux roues, cadre, guidon, selle."""
    r1 = Circle(radius=0.45, stroke_color=WHITE, stroke_width=4).move_to(P(-0.75, 0))
    r2 = Circle(radius=0.45, stroke_color=WHITE, stroke_width=4).move_to(P(0.75, 0))
    cadre = VGroup(Line(P(-0.75, 0), P(-0.1, 0)), Line(P(-0.1, 0), P(0.45, 0.55)), Line(P(-0.75, 0), P(-0.25, 0.55)),
                   Line(P(-0.25, 0.55), P(0.45, 0.55)), Line(P(-0.25, 0.55), P(-0.1, 0)),
                   Line(P(0.45, 0.55), P(0.75, 0))).set_stroke(couleur, 6)
    selle = Line(P(-0.4, 0.68), P(-0.12, 0.68), color=WHITE, stroke_width=7)
    guidon = VGroup(Line(P(0.45, 0.55), P(0.42, 0.8)), Line(P(0.32, 0.82), P(0.6, 0.82))).set_stroke(WHITE, 5)
    return VGroup(r1, r2, cadre, selle, guidon).scale(s)


class PropPourcentageDefiBase(PaysageProp):
    nom_voix = "6e-prop-pourcentage-defi"
    fichier_marques = "prop_pourcentage_defi_marques.json"

    def ligne_rep(self, i, morceaux, fs=None):
        """Celle de prop_tableau.py : la ligne de réponse garde la taille de la
        phrase qu'elle remplace et reste bornée à droite (BORD_X)."""
        lg = super().ligne_rep(i, morceaux, fs)
        ref = self.ph_q[i]
        lg.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
        g = lg.get_left()[0]
        if lg.get_right()[0] > self.BORD_X - 0.05:
            lg.scale_to_fit_width(self.BORD_X - 0.05 - g).align_to(P(g, 0), LEFT)
        return lg

    def montrer(self, lg, mots, run_time=0.3, avec=None, sc=None):
        """Chaque morceau de lg AU MOT donné (None : avec le morceau d'avant) ;
        avec[i] : animations jouées avec le morceau i."""
        sc = sc or self
        avec = avec or {}
        for i, (m, mot) in enumerate(zip(lg, mots)):
            if mot:
                sc.au_mot(*mot) if isinstance(mot, tuple) else sc.au_mot(mot)
            sc.play(FadeIn(m, shift=RIGHT * 0.15) if i else FadeIn(m, shift=UP * 0.12), *avec.get(i, []),
                    run_time=run_time)

    def table_billets(self, centre=P(3.5, 0.85)):
        return TableauProp(["Billets en vente", "Billets vendus"], [[100, 200], [30, "?"]], montrer=False,
                           largeur_case=1.3, largeur_libelle=2.9, fs=36, centre=centre)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défis sur les pourcentages", self.identite, self.ceinture, y_ech=-2.45)
        sc_ = scene_festival(0.75).move_to(P(-1.9, 0.55))
        b1 = billet(0.9).move_to(P(1.9, 0.95)).rotate(0.15)
        b2 = billet(0.9, "#a5f3fc").move_to(P(2.3, 0.35)).rotate(-0.1)
        self.au_mot("Défis")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        self.play(FadeIn(sc_, shift=UP * 0.3), FadeIn(b1, shift=LEFT * 0.4), FadeIn(b2, shift=LEFT * 0.4),
                  run_time=0.6)
        q = self.t("Qui a le meilleur score ?", 42, ORANGE_RETENUE).move_to(P(-0.3, -1.25))
        self.au_mot("Qui a")
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.5)
        self.au_mot("score")
        self.play(Indicate(q, color=AMBRE, scale_factor=1.08),
                  LaggedStart(*[Indicate(n, color=WHITE, scale_factor=1.3) for n in sc_.notes], lag_ratio=0.3),
                  run_time=1.0)
        self.attendre_voix(marge=0.6)

    # ── 01 : Thomas, organisateur du festival ───────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = thomas(1.0).move_to(P(-5.3, -0.4))
        nom = self.t("Thomas", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.au_mot("Voici Thomas")
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        met = self.bloc(["organisateur", "de festival"], 28, BLEU_CALCUL).next_to(pers, DOWN, buff=0.2)
        for t in met:
            t.set_x(pers.get_x())
        sc_ = scene_festival(0.85).move_to(P(-1.6, 0.9))
        self.au_mot("organise")
        self.play(FadeIn(met[0], shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("festival")
        self.play(FadeIn(sc_, shift=UP * 0.3), FadeIn(met[1], shift=DOWN * 0.1), run_time=0.6)
        self.play(LaggedStart(*[n.animate(rate_func=there_and_back).shift(UP * 0.25) for n in sc_.notes],
                              lag_ratio=0.25), run_time=0.9)
        tas = VGroup(*[billet(0.75).rotate(0.12 * (k - 2)).shift(P(0.18 * k, 0.05 * k)) for k in range(5)])
        tas.move_to(P(1.75, 2.45))
        l1 = self.t("200 billets", 40, JAUNE_TITRE).next_to(tas, RIGHT, buff=0.3)
        self.au_mot("200 billets")
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.3) for b in tas], lag_ratio=0.15),
                  FadeIn(l1, scale=1.3), run_time=0.6)
        self.insister(l1, 1.1, 0.2)
        l2 = self.ligne([("Premier jour :", WHITE), ("30 %", BLEU_CALCUL), ("vendus", WHITE)], 40)
        self.col(l2, 0.6, xl=0.9)
        self.montrer(l2, ["Le premier", "30 %", None])
        self.insister(l2[1], 1.25, 0.2)
        l3 = self.ligne([("Combien de", WHITE), ("billets ?", ORANGE_RETENUE)], 38)
        self.col(l3, -0.6, xl=0.9)
        self.au_mot("Combien")
        self.play(FadeIn(l3, shift=UP * 0.15), run_time=0.45)
        self.insister(l3[1], 1.08, 0.25)
        self.attendre_voix()

    # ── 02 : 30 % = 30 sur 100 ; le tableau × 2 ─────────────────────────────
    def ecran_tableau(self):
        self.ecran("02-tableau")
        g = grille100(0, cote=0.3, centre=P(-4.0, 0.2), couleur=CASE_C)
        l0 = self.ligne([("30 %", BLEU_CALCUL), ("=", WHITE), ("30 sur 100", AMBRE)], 36)
        l0.next_to(g, UP, buff=0.3).set_x(g.get_x())
        self.au_mot("30 %, c")
        self.play(FadeIn(g, shift=UP * 0.2), FadeIn(l0[0], scale=1.3), run_time=0.45)
        self.au_mot("c'est 30")
        self.play(FadeIn(l0[1]), FadeIn(l0[2], shift=RIGHT * 0.15), g.colorier(range(30), lag=0.03, run_time=1.0),
                  run_time=1.0)
        tb = self.table_billets()
        self.au_mot("Pour 100")
        self.play(FadeIn(tb.fond, shift=UP * 0.2), FadeIn(tb.valeur(0, 0), scale=1.4), tb.allumer(0, 0),
                  Circumscribe(g, color=AMBRE, buff=0.08), run_time=0.45)
        self.au_mot("30 vendus")
        self.play(FadeIn(tb.valeur(1, 0), scale=1.4), tb.allumer(1, 0), tb.eteindre(0, 0), run_time=0.4)
        self.au_mot("200 billets")
        self.play(FadeIn(tb.valeur(0, 1), scale=1.4), FadeIn(tb.trou(1, 1), scale=1.3), tb.eteindre(1, 0),
                  tb.allumer(0, 1), run_time=0.45)
        h = tb.fleche_col(0, 1, "× 2", ligne=0)
        b = tb.fleche_col(0, 1, "× 2", ligne=1)
        self.au_mot("2 fois plus")
        self.play(Create(h.fleche), FadeIn(h.etiquette, scale=1.3), tb.eteindre(0, 1), run_time=0.45)
        lg = self.ligne([("30 × 2 =", WHITE), ("60 billets", VERT_OK)], 46, buff=0.4)
        self.col(lg, -1.75, xl=1.3)
        self.au_mot("30 fois 2")
        self.play(Create(b.fleche), FadeIn(b.etiquette, scale=1.3), FadeIn(lg[0], shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("60 billets")
        self.play(FadeIn(lg[1], scale=1.3), tb.remplir(1, 1, 60), run_time=0.45)
        self.play(tb.allumer(1, 1), Create(self.encadrer(lg[1], buff=0.12)), run_time=0.35)
        self.insister(lg[1], 1.15, 0.2)
        self.attendre_voix()

    # ── 03 : QUESTION 1 (50 % des 200 billets) ──────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = grille100(0, cote=0.4, centre=P(-3.5, 0.2), couleur=CASE_C)
        tas = VGroup(*[billet(0.6).rotate(0.12 * (k - 2)).shift(P(0.15 * k, 0.04 * k)) for k in range(5)])
        tas.next_to(g, UP, buff=0.25)
        self.add(g, tas)

        def apres(sc):
            x = g.liste.get_x()
            coupe = Line(P(g.liste.get_left()[0] - 0.12, x * 0 + g.cases[5][0].get_top()[1]),
                         P(g.liste.get_right()[0] + 0.12, g.cases[5][0].get_top()[1]), color=ORANGE_RETENUE,
                         stroke_width=8)
            l0 = sc.ligne_rep(0, ["50 %,", "c'est la moitié."])
            sc.au_mot("50 %, c")
            sc.play(FadeIn(l0[0], shift=UP * 0.12), run_time=0.3)
            sc.au_mot("la moitié")
            sc.play(FadeIn(l0[1], shift=UP * 0.12), Create(coupe), g.colorier(range(50), lag=0.02, run_time=0.9))
            l1 = sc.ligne_rep(1, ["200 ÷", "2 =", "100 billets."])
            self.montrer(l1, ["200 divisé", "par 2", "100 billets"], sc=sc,
                         avec={0: [Indicate(tas, color=AMBRE, scale_factor=1.08)]})
            sc.insister(l1[2], 1.12, 0.2)
            sc.rep_fini()

        self.question_pause("03-question", "03b-reponse",
                            ["Deuxième jour :", "50 % des 200 billets.", "Combien ?"],
                            [self.t("50 billets", 34), self.t("100 billets", 34), self.t("150 billets", 34)], 1,
                            ["50 %, c'est la moitié.", "200 ÷ 2 = 100 billets."], mot_q="Le deuxième",
                            autres_r=apres)

    # ── 04 : comparer deux groupes : 18 sur 20 et 85 % ──────────────────────
    def jauge(self, v, couleur, centre, largeur=4.6):
        j = BarrePourcent(v, mode="chargement", largeur=largeur, hauteur=0.5, couleur=couleur, etiquette=False,
                          centre=centre)
        return j

    def ecran_comparer(self):
        self.ecran("04-comparer")
        ga = self.t("Groupe A", 30, SIEGE_P).move_to(P(-5.45, 2.9))
        sa = sieges(18, cote=0.3, ecart=0.06).move_to(P(-2.4, 2.9))
        vides = VGroup(*[s.copy().set_fill(SIEGE_V, 1) for s in sa])
        tb = TableauProp(["Places", "Remplies"], [[20, 100], [18, "?"]], montrer=False, largeur_case=1.3,
                         largeur_libelle=2.3, fs=38, centre=P(3.6, 1.15))
        self.au_mot("compare deux")
        self.play(FadeIn(ga, shift=RIGHT * 0.2), FadeIn(vides), FadeIn(tb.fond, shift=UP * 0.2), run_time=0.5)
        la = self.ligne([("18 places", SIEGE_P), ("sur 20", WHITE)], 36).next_to(sa, DOWN, buff=0.25)
        la.set_x(sa.get_x())
        self.au_mot("18 places")
        self.play(LaggedStart(*[FadeIn(s, scale=1.3) for s in sa[:18]], lag_ratio=0.04), FadeIn(la[0], scale=1.2),
                  FadeIn(tb.valeur(1, 0), scale=1.4), run_time=0.8)
        self.au_mot("sur 20")
        self.play(FadeIn(sa[18:]), FadeIn(la[1], shift=RIGHT * 0.15), FadeIn(tb.valeur(0, 0), scale=1.4),
                  run_time=0.45)
        gb = self.t("Groupe B", 30, JAUGE_B).move_to(P(-5.45, 0.95))
        jb = self.jauge(85, JAUGE_B, P(-3.35, 0.25))
        pb = self.t("85 %", 40, JAUGE_B).next_to(gb, RIGHT, buff=0.4)
        self.au_mot("Le groupe B")
        self.play(FadeIn(gb, shift=RIGHT * 0.2), FadeIn(jb.piste), run_time=0.4)
        self.au_mot("85 %")
        jb.plein.set_opacity(1)
        self.play(FadeIn(pb, scale=1.3), jb.remplir(0.9), run_time=0.9)
        q = self.t("Lequel remplit le mieux ?", 36, ORANGE_RETENUE).move_to(P(-3.4, -0.75))
        self.au_mot("Lequel")
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.au_mot("ramène à 100")
        self.play(FadeIn(tb.valeur(0, 1), scale=1.4), FadeIn(tb.trou(1, 1), scale=1.3), tb.allumer(0, 1), run_time=0.4)
        h = tb.fleche_col(0, 1, "× 5", ligne=0)
        b = tb.fleche_col(0, 1, "× 5", ligne=1)
        l1 = self.ligne([("20 ×", WHITE), ("5 =", WHITE), ("100", WHITE)], 42)
        self.col(l1, -1.35, xl=1.3)
        self.montrer(l1, ["20 fois", "5, égale", "égale 100"], avec={1: [Create(h.fleche), FadeIn(h.etiquette,
                                                                                             scale=1.3)]})
        l2 = self.ligne([("18 ×", WHITE), ("5 =", WHITE), ("90", VERT_OK)], 42)
        self.col(l2, -2.05, xl=1.3)
        self.montrer(l2, ["18 fois", ("5, égale", 2), "égale 90"],
                     avec={0: [tb.eteindre(0, 1)], 1: [Create(b.fleche), FadeIn(b.etiquette, scale=1.3)],
                           2: [tb.remplir(1, 1, 90)]})
        self.play(tb.allumer(1, 1), run_time=0.3)
        ja = self.jauge(90, JAUGE_A, P(-3.35, -1.5))
        lga = self.ligne([("Groupe A :", SIEGE_P), ("90 %", JAUGE_A)], 36).next_to(ja, UP, buff=0.18)
        lga.align_to(ja, LEFT)
        repere = DashedLine(P(jb.plein.get_right()[0], jb.piste.get_bottom()[1]), P(jb.plein.get_right()[0],
                            ja.piste.get_bottom()[1] - 0.1), color=JAUGE_B, stroke_width=3)
        self.au_mot("Le groupe A :", 1)
        self.play(FadeOut(q), FadeIn(lga[0], shift=RIGHT * 0.15), FadeIn(ja.piste), run_time=0.4)
        self.au_mot("A : 90")
        ja.plein.set_opacity(1)
        self.play(FadeIn(lga[1], scale=1.3), ja.remplir(0.9), Create(repere), run_time=0.9)
        v = self.tampon("Il gagne !", VERT_OK, 38).next_to(ja, DOWN, buff=0.35).set_x(-3.35)
        self.au_mot("Il gagne")
        self.play(FadeIn(v, scale=1.3), Indicate(sa, color=VERT_OK, scale_factor=1.04), run_time=0.45)
        self.insister(v, 1.1, 0.2)
        self.attendre_voix()

    # ── 05 : le piège : 18 places ≠ 18 % ────────────────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        self.col(tit, 3.0, xl=0.9)
        self.au_mot("Attention")
        self.play(Write(tit), run_time=0.5)
        sa = sieges(18).move_to(P(-3.5, 2.3))
        g = grille100(0, cote=0.22, centre=P(-3.5, -0.75), couleur=ROUGE_P)
        l1 = self.ligne([("18 places", SIEGE_P), ("≠", ROUGE_ERREUR), ("18 %", ROUGE_P)], 48)
        self.col(l1, 1.75, xl=0.9)
        self.au_mot("18 places")
        self.play(LaggedStart(*[FadeIn(s, scale=1.3) for s in sa], lag_ratio=0.03), FadeIn(l1[0], scale=1.2),
                  run_time=0.7)
        self.au_mot("pas 18")
        self.play(FadeIn(g, shift=UP * 0.2), FadeIn(l1[1], scale=1.4), FadeIn(l1[2], scale=1.2), run_time=0.4)
        self.play(g.colorier(range(18), lag=0.03, run_time=0.7))
        self.insister(l1[1], 1.4, 0.2)
        l2 = self.ligne([("Le total :", WHITE), ("20,", SIEGE_P), ("pas", WHITE), ("100", ROUGE_P)], 44)
        self.col(l2, 0.55, xl=0.9)
        self.montrer(l2, ["Le total", "est 20", "pas 100", None],
                     avec={1: [Indicate(sa, color=AMBRE, scale_factor=1.06)],
                           3: [Circumscribe(g, color=AMBRE, buff=0.08)]})
        v = self.tampon("Toujours ramener à 100", VERT_OK, 27)
        self.col(v, -0.9, xl=1.1)
        self.au_mot("Il faut toujours")
        self.play(FadeIn(v, scale=1.3), run_time=0.45)
        self.insister(v, 1.05, 0.25)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (12 crêpes sur 50) ──────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        st = stand_crepes(1.3).move_to(P(-3.4, 0.3))
        self.add(st)
        tb = TableauProp(["Crêpes en tout", "Crêpes vendues"], [[50, 100], [12, "?"]], montrer=False,
                         largeur_case=1.3, largeur_libelle=2.9, fs=38, centre=P(-3.25, 0.2))

        def apres(sc):
            h = tb.fleche_col(0, 1, "× 2", ligne=0)
            b = tb.fleche_col(0, 1, "× 2", ligne=1)
            sc.play(FadeOut(st), FadeIn(tb.fond), run_time=0.3)
            l0 = sc.ligne_rep(0, ["50 ×", "2 =", "100."])
            self.montrer(l0, ["50 fois", "2, égale", "égale 100"], sc=sc,
                         avec={0: [FadeIn(tb.valeur(0, 0), scale=1.4)],
                               1: [Create(h.fleche), FadeIn(h.etiquette, scale=1.3)],
                               2: [FadeIn(tb.valeur(0, 1), scale=1.4)]})
            l1 = sc.ligne_rep(1, ["12 ×", "2 =", "24."])
            self.montrer(l1, ["12 fois", ("2, égale", 2), "égale 24"], sc=sc,
                         avec={0: [FadeIn(tb.valeur(1, 0), scale=1.4)],
                               1: [Create(b.fleche), FadeIn(b.etiquette, scale=1.3)],
                               2: [tb.remplir(1, 1, 24)]})
            l2 = sc.ligne_rep(2, ["24 %."])
            sc.au_mot("24 %")
            sc.play(FadeIn(l2[0], scale=1.3), tb.allumer(1, 1), run_time=0.35)
            sc.insister(l2[0], 1.25, 0.2)
            sc.rep_fini()

        self.question_pause("06-question", "06b-reponse",
                            ["Un stand vend 12 crêpes", "sur 50.", "Quel pourcentage ?"],
                            [self.t("12 %", 34), self.t("24 %", 34), self.t("62 %", 34)], 1,
                            ["50 × 2 = 100.", "12 × 2 = 24.", "24 %."], mot_q="Un stand", autres_r=apres)

    # ── 07 : à toi de jouer : 25 % des 200 spectateurs à vélo ───────────────
    def ecran_defi(self):
        self.ecran("07-defi", 0.65)
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.au_mot("À toi de jouer")
        self.play(Write(tit), run_time=0.6)
        foule = VGroup(*[personne(peau=PEAUX[k % 5], tenue=["#38bdf8", "#f472b6", "#a3e635", "#fb923c"][k % 4],
                                  longs=k % 2 == 1, s=0.22) for k in range(12)]).arrange_in_grid(2, 6, buff=(0.06, 0.1))
        foule.move_to(P(-3.8, 1.2))
        vl = velo(1.0).move_to(P(-3.8, -1.0))
        l1 = self.t("200 spectateurs", 44, WHITE)
        self.col(l1, 1.6, xl=0.9)
        self.au_mot("200 spectateurs")
        self.play(LaggedStart(*[FadeIn(p, shift=UP * 0.2) for p in foule], lag_ratio=0.05), FadeIn(l1, scale=1.2),
                  run_time=0.7)
        l2 = self.ligne([("25 %", BLEU_CALCUL), ("viennent à vélo", WHITE)], 44)
        self.col(l2, 0.6, xl=0.9)
        self.montrer(l2, ["25 %", "viennent"], avec={1: [FadeIn(vl, shift=RIGHT * 0.6)]})
        l3 = self.bloc(["Combien de spectateurs", "à vélo ?"], 40, ORANGE_RETENUE)
        self.col(l3, -0.55, xl=0.9)
        self.au_mot("Combien")
        self.play(FadeIn(l3, shift=UP * 0.15), run_time=0.45)
        self.play(Rotate(vl[0], -TAU, run_time=0.8), Rotate(vl[1], -TAU, run_time=0.8))
        self.pause_defi(y=-1.9)

    # ── 07b : correction : 25 % = le quart ; 200 ÷ 4 = 50 ───────────────────
    def ecran_correction(self):
        self.ecran("07b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.15))
        self.play(Write(tit), run_time=0.5)
        g = grille100(0, cote=0.36, centre=P(-4.1, -0.45), couleur=CASE_C)
        x0, y0 = g.cases[0][5].get_left()[0], g.cases[5][0].get_top()[1]
        coupe = VGroup(Line(P(x0, g.liste.get_top()[1] + 0.12), P(x0, g.liste.get_bottom()[1] - 0.12)),
                       Line(P(g.liste.get_left()[0] - 0.12, y0), P(g.liste.get_right()[0] + 0.12, y0))
                       ).set_stroke(ORANGE_RETENUE, 8)
        l0 = self.ligne([("25 %", BLEU_CALCUL), ("= le quart", AMBRE)], 40)
        l0.next_to(g, UP, buff=0.25).set_x(g.get_x())
        self.au_mot("25 %")
        self.play(FadeIn(g, shift=UP * 0.2), FadeIn(l0[0], scale=1.3), run_time=0.45)
        self.au_mot("le quart")
        self.play(FadeIn(l0[1], shift=RIGHT * 0.15), Create(coupe), run_time=0.5)
        self.play(g.colorier(quadrant(0), lag=0.02, run_time=0.8))
        tb = TableauProp(["Spectateurs", "À vélo"], [[200], ["?"]], montrer=False, largeur_case=1.4,
                         largeur_libelle=2.4, fs=40, centre=P(2.4, 1.25))
        fl = tb.fleche_lat("÷ 4")
        lg = self.ligne([("200 ÷", WHITE), ("4 =", AMBRE), ("50", VERT_OK)], 46)
        self.col(lg, -0.4, xl=1.0)
        fin = self.ligne([("50 spectateurs", VERT_OK), ("à vélo", VERT_OK)], 38)
        cad = SurroundingRectangle(fin, color=VERT_OK, buff=0.22, corner_radius=0.12, stroke_width=5)
        bloc = VGroup(cad, fin)
        self.col(bloc, -1.4, xl=0.7)
        vl = velo(0.55).next_to(bloc, DOWN, buff=0.2).align_to(bloc, LEFT)
        self.montrer(lg, ["200 divisé", "par 4", "égale 50"],
                     avec={0: [FadeIn(tb.fond, shift=UP * 0.2), FadeIn(tb.valeur(0, 0), scale=1.4),
                               FadeIn(tb.trou(1, 0), scale=1.3), tb.allumer(0, 0)],
                           1: [Create(fl.fleche), FadeIn(fl.etiquette, scale=1.3), tb.eteindre(0, 0)],
                           2: [tb.remplir(1, 0, 50), FadeIn(fin[0], scale=1.2), Create(cad)]})
        self.play(tb.allumer(1, 0), run_time=0.3)
        self.au_mot("à vélo.")
        self.play(FadeIn(fin[1], shift=RIGHT * 0.15), FadeIn(vl, shift=RIGHT * 0.5), run_time=0.4)
        self.insister(bloc, 1.08, 0.25)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.65)
        ja = self.jauge(90, JAUGE_A, ORIGIN, largeur=4.0)
        jb = self.jauge(85, JAUGE_B, ORIGIN, largeur=4.0)
        ta = self.t("A : 90 %", 30, JAUGE_A)
        tbb = self.t("B : 85 %", 30, JAUGE_B)
        jauges = VGroup(VGroup(ta, ja).arrange(DOWN, aligned_edge=LEFT, buff=0.12),
                        VGroup(tbb, jb).arrange(DOWN, aligned_edge=LEFT, buff=0.12)).arrange(DOWN, buff=0.3,
                                                                                            aligned_edge=LEFT)
        tb = self.table_billets(ORIGIN)
        for r, c, v in ((0, 0, 100), (0, 1, 200), (1, 0, 30), (1, 1, 60)):
            tb.add(tb.poser(r, c, v))
        tb.add(tb.fleche_col(0, 1, "× 2", ligne=0), tb.fleche_col(0, 1, "× 2", ligne=1))
        fig = VGroup(jauges, tb).arrange(DOWN, buff=0.5)
        for f in fig.get_family():
            if isinstance(f, Text):
                f._pas_audit = True
                f.sans_synchro = True
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Pour comparer des parts,", "on les ramène toutes sur 100."),
            ("Pour trouver une quantité,", "on lit le pourcentage, puis", "on complète le tableau.")], fs=36)
        self.au_mot("Pour comparer")
        self.montrer_ligne(lignes[0], Circumscribe(jauges, color=AMBRE, buff=0.12))
        self.au_mot("Pour trouver")
        self.montrer_ligne(lignes[1], Circumscribe(tb.carte, color=AMBRE, buff=0.1))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tableau()
        self.ecran_question1()
        self.ecran_comparer()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class PropPourcentageDefi6e(PropPourcentageDefiBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
