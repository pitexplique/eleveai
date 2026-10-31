# prop_reconnaitre.py
# EleveAI — Maths 6e — série « Proportionnalité », épisode 01 (PILOTE) :
# RECONNAÎTRE LA PROPORTIONNALITÉ (micro du coach : prop_reconnaitre,
# « Reconnaître une situation de proportionnalité », notion prop_proportionnalite),
# AVEC VOIX. Paysage 16:9, CEINTURE VERTE (la paysage complète du niveau :
# situation, méthode « on multiplie toujours par le même nombre », contre-
# exemples, pièges, 2 questions-pauses, défi corrigé). Short jumeau :
# prop_reconnaitre_short.py (blanche).
# ⭐ Méthode travaillée : le COEFFICIENT (flèche latérale « × 7 ») et la
# linéarité vue en flèches de colonne (« deux fois plus » = « × 2 »).
# ⛔ Pas de produit en croix (6e).
# ⭐ Leurres de la série (consigne-videos-proportionnalite.md) : 1. ajouter au
# lieu de multiplier (question 1 : 18 € = 14 + 4) ; 2. croire tout
# proportionnel (âge et taille, parc aquatique dégressif, forfait de la salle
# de sport, pop-corn du défi) ; 3. mauvais coefficient (question 1 : 21 € = 3 × 7).
#
# Décors et métiers : CINÉMA, Inès, CAISSIÈRE (7 € la place ; défi pop-corn) ;
# SANTÉ, Karim, PÉDIATRE (âge et taille) ; parc aquatique ; salle de sport ;
# marché (prix au kilo, question 2).
# Centres d'intérêt : cinema-series, corps-sante, argent-budget.
# Données réelles (WebSearch, 31/10/2026) : taille moyenne ≈ 75 cm à 1 an
# (74-77 cm selon le sexe, courbes OMS 0-5 ans) ; ≈ 139-140 cm à 10 ans
# (médiane filles 139,5 cm, références INSERM 2018, Le Quotidien du Médecin) ;
# ≈ 150 cm à 12 ans (OMS 5-19 ans : ≈ 149 cm garçons, ≈ 151 cm filles) ;
# girafe adulte 4,3 à 5,9 m (record 5,88 m) : « plus de 7 mètres », « 9 m,
# plus haut qu'une girafe » restent vrais.
#
# Micro → écrans : situation proportionnelle (01, 02), définition par le
# coefficient (03), contre-exemple réel âge/taille (04), QUESTION 1 (05,
# proportionnel : trouver la valeur), prix dégressif (06), forfait (07),
# QUESTION 2 (08 : quel tableau est proportionnel ?), défi (09) et correction
# (09b), ce que tu as appris (10), fin (11).
# Écrans : 00 garde · 01 Inès à la caisse · 02 le tableau × 7 · 03 proportionnel
# · 04 Karim, l'âge et la taille · 05 QUESTION 1 · 06 piège du parc aquatique ·
# 07 le forfait de la salle de sport · 08 QUESTION 2 · 09 défi pop-corn ·
# 09b correction · 10 ce que tu as appris · 11 fin.
#
# Voix : manim/voix/6e-prop-reconnaitre.json (validée par Frédéric, débit −10),
# WAV dans public/sons/6e-prop-reconnaitre/ ; marques mot à mot :
# manim/scripts/6e/prop_reconnaitre_marques.json (scripts/marques_dump.ps1 puis
# scripts/cues2marques.py).
# Outils : prop_commun.py + manim/canvas_proportion.py (pilote).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/prop_reconnaitre.py PropReconnaitre6e
# python -m manim render -qh --disable_caching manim/scripts/6e/prop_reconnaitre.py PropReconnaitre6e -o eleveai-maths-6e-prop-reconnaitre --media_dir manim/scripts/6e/media-prop-reconnaitre
# Sortie : manim/sorties/6e/maths/proportionnalite/01-reconnaitre/eleveai-maths-6e-prop-reconnaitre.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403

ROUGE_CINE = "#b91c1c"
TICKET = "#fbbf24"


def ines(s=1.0):
    """Inès, caissière de cinéma : cheveux longs, gilet rouge, badge doré."""
    p = personne(peau="#c68642", tenue=ROUGE_CINE, cheveux="#111827", longs=True, s=s)
    badge = Circle(radius=0.09 * s, fill_color=TICKET, fill_opacity=1, stroke_width=0)
    p.add(badge.move_to(p.corps.get_center() + P(0.22 * s, 0.35 * s)))
    return p


def karim(s=1.0):
    """Karim, pédiatre : blouse blanche, stéthoscope."""
    p = personne(peau="#8d5524", tenue="#0ea5e9", cheveux="#1f2937", s=s)
    p.add(blouse(p))
    c = p.tete.get_bottom()
    steth = VGroup(Arc(radius=0.28 * s, start_angle=PI, angle=PI, arc_center=c + DOWN * 0.15 * s,
                       stroke_color="#475569", stroke_width=5),
                   Circle(radius=0.08 * s, fill_color="#94a3b8", fill_opacity=1, stroke_width=0)
                   .move_to(c + P(0.28 * s, -0.55 * s)))
    p.add(steth)
    return p


def caisse_cinema(l=3.2, h=2.6):
    """La caisse du cinéma : la façade rouge, l'enseigne lumineuse, le guichet."""
    facade = RoundedRectangle(width=l, height=h, corner_radius=0.12, fill_color="#7f1d1d", fill_opacity=1,
                              stroke_color="#fca5a5", stroke_width=3)
    enseigne = RoundedRectangle(width=l * 0.86, height=0.62, corner_radius=0.1, fill_color="#111827",
                                fill_opacity=1, stroke_color=TICKET, stroke_width=4)
    enseigne.move_to(facade.get_top() + DOWN * 0.48)
    mot = Text("CINÉMA", font_size=34, color=TICKET, weight=BOLD).move_to(enseigne)
    ampoules = VGroup(*[Dot(radius=0.04, color="#fde68a").move_to(
        enseigne.get_left() + RIGHT * (0.15 + i * (enseigne.width - 0.3) / 13) + UP * 0.38) for i in range(14)])
    guichet = RoundedRectangle(width=l * 0.6, height=h * 0.4, corner_radius=0.3, fill_color="#bae6fd",
                               fill_opacity=0.85, stroke_color=WHITE, stroke_width=3).move_to(facade.get_center()
                                                                                         + DOWN * 0.25)
    comptoir = Rectangle(width=l, height=0.25, fill_color="#451a03", fill_opacity=1, stroke_width=0)
    comptoir.next_to(guichet, DOWN, buff=0.1)
    g = VGroup(facade, enseigne, mot, ampoules, guichet, comptoir)
    g.mot, g.guichet = mot, guichet
    return g


def ticket(l=0.95, h=0.5, couleur=TICKET):
    """Un ticket de cinéma : coins échancrés, une étoile."""
    corps = RoundedRectangle(width=l, height=h, corner_radius=0.06, fill_color=couleur, fill_opacity=1,
                             stroke_color="#92400e", stroke_width=2)
    trous = VGroup(*[Circle(radius=h * 0.16, fill_color=BLACK, fill_opacity=1, stroke_width=0)
                     .move_to(corps.get_left() + RIGHT * 0 + UP * 0 + RIGHT * x) for x in (0, l)])
    etoile = Star(5, outer_radius=h * 0.25, fill_color="#92400e", fill_opacity=1, stroke_width=0).move_to(corps)
    tirets = DashedLine(corps.get_top() + RIGHT * l * 0.22, corps.get_bottom() + RIGHT * l * 0.22,
                        dash_length=0.05, color="#92400e", stroke_width=2)
    return VGroup(corps, trous, etoile, tirets)


def paquet_popcorn(s=1.0):
    """Un paquet de pop-corn : boîte rayée rouge et blanc, grains jaunes."""
    boite = Polygon(P(-0.42, 0.5), P(0.42, 0.5), P(0.32, -0.55), P(-0.32, -0.55), fill_color=WHITE,
                    fill_opacity=1, stroke_width=0)
    rayures = VGroup(*[Polygon(P(-0.42 + i * 0.28, 0.5), P(-0.28 + i * 0.28, 0.5), P(-0.22 + i * 0.213, -0.55),
                               P(-0.32 + i * 0.213, -0.55), fill_color="#dc2626", fill_opacity=1, stroke_width=0)
                       for i in range(3)])
    grains = VGroup(*[Circle(radius=0.13, fill_color="#fef3c7", fill_opacity=1, stroke_color="#f59e0b",
                             stroke_width=2).move_to(P(x, 0.58 + y)) for x, y in
                      ((-0.3, 0), (-0.1, 0.08), (0.12, 0.03), (0.3, 0), (0, 0.2), (-0.2, 0.17), (0.2, 0.18))])
    return VGroup(grains, boite, rayures).scale(s)


def enfant(h, couleur="#38bdf8"):
    """Une silhouette d'enfant de hauteur totale h (tête ≈ 1/6 de la taille
    pour un bébé, 1/7 plus grand ; on garde 1/6 : lisible). Pieds en (0, 0)."""
    r = h / 12
    tete = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(0, h - r))
    corps = RoundedRectangle(width=h * 0.26, height=h * 0.45, corner_radius=h * 0.06, fill_color=couleur,
                             fill_opacity=1, stroke_width=0).move_to(P(0, h * 0.58))
    jambes = VGroup(*[RoundedRectangle(width=h * 0.09, height=h * 0.4, corner_radius=h * 0.04,
                                       fill_color=couleur, fill_opacity=1, stroke_width=0)
                      .move_to(P(x * h * 0.07, h * 0.2)) for x in (-1, 1)])
    bras = VGroup(*[RoundedRectangle(width=h * 0.07, height=h * 0.36, corner_radius=h * 0.03,
                                     fill_color=couleur, fill_opacity=1, stroke_width=0)
                    .move_to(P(x * h * 0.17, h * 0.6)).rotate(x * 0.25) for x in (-1, 1)])
    return VGroup(jambes, bras, corps, tete)


def toboggan():
    """Le parc aquatique : un toboggan bleu qui plonge dans une piscine."""
    eau = RoundedRectangle(width=3.0, height=0.7, corner_radius=0.15, fill_color="#0ea5e9", fill_opacity=1,
                           stroke_width=0)
    vagues = VGroup(*[FunctionGraph(lambda x, k=k: 0.06 * np.sin(5 * x + k), x_range=[-1.3, 1.3],
                                    color=WHITE, stroke_width=3).shift(UP * (0.12 - 0.2 * k)) for k in range(2)])
    tour = Rectangle(width=0.35, height=2.0, fill_color="#f59e0b", fill_opacity=1, stroke_width=0)
    tour.move_to(P(-1.3, 1.25))
    piste = VMobject(stroke_color="#22d3ee", stroke_width=16).set_points_smoothly(
        [P(-1.15, 2.2), P(-0.55, 2.0), P(-0.05, 1.35), P(0.45, 0.75), P(1.05, 0.4)])
    return VGroup(tour, piste, eau, vagues)


def haltere(s=1.0):
    barre = Rectangle(width=1.6, height=0.12, fill_color="#9ca3af", fill_opacity=1, stroke_width=0)
    disques = VGroup(*[RoundedRectangle(width=0.22, height=h, corner_radius=0.05, fill_color="#111827",
                                        fill_opacity=1, stroke_color="#6b7280", stroke_width=2)
                       .move_to(P(x * dx, 0)) for x in (-1, 1) for dx, h in ((0.55, 0.75), (0.75, 0.55))])
    return VGroup(barre, disques).scale(s)


def etal():
    """Un étal du marché : la caisse en bois, les fruits, la balance."""
    caisse = Rectangle(width=2.6, height=0.9, fill_color="#92400e", fill_opacity=1, stroke_color="#451a03",
                       stroke_width=3)
    lattes = VGroup(*[Line(caisse.get_left() + UP * y, caisse.get_right() + UP * y, color="#451a03",
                           stroke_width=2) for y in (-0.15, 0.15)])
    fruits = VGroup(*[Circle(radius=0.17, fill_color=c, fill_opacity=1, stroke_color="#7f1d1d", stroke_width=1)
                      .move_to(P(-1.05 + i * 0.3, 0.55 + 0.12 * (i % 2))) for i, c in
                      enumerate(["#dc2626", "#ef4444", "#b91c1c"] * 3)])
    plateau = Ellipse(width=1.2, height=0.25, fill_color="#cbd5e1", fill_opacity=1, stroke_width=0)
    pied = Rectangle(width=0.7, height=0.6, fill_color="#64748b", fill_opacity=1, stroke_width=0)
    balance = VGroup(pied, plateau.next_to(pied, UP, buff=0.05))
    balance.next_to(caisse, UP, buff=0).align_to(caisse, RIGHT).shift(LEFT * 0.15)
    fruits.shift(LEFT * 0.35)
    return VGroup(caisse, lattes, fruits, balance)


class PropReconnaitreBase(PaysageProp):
    nom_voix = "6e-prop-reconnaitre"
    fichier_marques = "prop_reconnaitre_marques.json"
    LIBS = ["Nombre de places", "Prix (€)"]

    def table_places(self, montrer=False, centre=P(-0.9, 1.55)):
        return TableauProp(self.LIBS, [[1, 2, 4], [7, 14, 28]], montrer=montrer, centre=centre)

    def ligne_c(self, morceaux, y, fs=44, x=-0.9):
        """Une ligne de calcul centrée sous le tableau (non jouée)."""
        return self.ligne(morceaux, fs).move_to(P(x, y))

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Reconnaître la proportionnalité", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Reconnaître")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        t1 = ticket(1.5, 0.8).move_to(P(-3.6, 0.35))
        self.play(FadeIn(t1, scale=0.6), run_time=0.4)
        self.au_mot("Deux fois plus")
        t2 = t1.copy()
        d = self.t("deux fois plus", 40, BLEU_CALCUL).move_to(P(-0.6, 0.85))
        self.play(t1.animate.shift(UP * 0.5), t2.animate.shift(DOWN * 0.5), FadeIn(d, shift=RIGHT * 0.2),
                  run_time=0.4)
        self.au_mot("deux fois plus cher")
        c = self.t("deux fois plus cher ?", 40, AMBRE).move_to(P(0.2, -0.15))
        self.play(FadeIn(c, shift=RIGHT * 0.2), run_time=0.4)
        self.insister(c, 1.2, 0.25)
        self.attendre_voix(marge=0.6)

    # ── 01 : Inès à la caisse du cinéma ─────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = ines(1.1).move_to(P(-5.5, -0.9))
        cai = caisse_cinema().move_to(P(-2.3, 0.2))
        self.au_mot("Voici Inès")
        nom = self.t("Inès", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("caisse")
        met = self.t("caissière", 32, BLEU_CALCUL).next_to(pers, DOWN, buff=0.2)
        self.play(FadeIn(VGroup(*[m for m in cai if m is not cai.mot]), scale=0.9), FadeIn(met), run_time=0.6)
        self.au_mot("cinéma")
        self.play(Write(cai.mot), run_time=0.5)
        self.au_mot("1 place")
        tk = ticket().move_to(P(1.55, 2.3))
        l1 = self.ligne([("1 place", WHITE), ("=", WHITE), ("7 €", VERT_OK)], 44).next_to(tk, RIGHT, buff=0.3)
        self.play(FadeIn(tk, scale=0.6), run_time=0.3)
        self.poser_lignes(l1)
        self.au_mot("2 places")
        tk2 = VGroup(*[ticket() for _ in range(2)]).arrange(RIGHT, buff=0.12).move_to(P(1.9, 0.9))
        l2 = self.ligne([("2 places", WHITE), ("→ ? €", ORANGE_RETENUE)], 40).next_to(tk2, DOWN, buff=0.15)
        l2.align_to(tk2, LEFT)
        self.play(LaggedStart(*[FadeIn(t, scale=0.6) for t in tk2], lag_ratio=0.3), FadeIn(l2[0]), run_time=0.5)
        self.au_mot("4 places")
        tk4 = VGroup(*[ticket() for _ in range(4)]).arrange(RIGHT, buff=0.12).move_to(P(3.0, -0.75))
        tk4.align_to(tk2, LEFT)
        l4 = self.ligne([("4 places", WHITE), ("→ ? €", ORANGE_RETENUE)], 40).next_to(tk4, DOWN, buff=0.15)
        l4.align_to(tk4, LEFT)
        self.play(LaggedStart(*[FadeIn(t, scale=0.6) for t in tk4], lag_ratio=0.2), FadeIn(l4[0]), run_time=0.6)
        self.au_mot("Combien")
        q = self.col(self.t("Combien vont-ils payer ?", 38, ORANGE_RETENUE), -2.45)
        self.play(FadeIn(l2[1]), FadeIn(l4[1]), FadeIn(q, shift=UP * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 02 : le tableau d'Inès (× 7) ────────────────────────────────────────
    def ecran_tableau(self):
        self.ecran("02-tableau")
        tb = self.table_places()
        self.au_mot("remplit son tableau")
        self.play(FadeIn(tb.fond, shift=UP * 0.2), run_time=0.6)
        for c, (q, mot_q, v, mot_v) in enumerate([(1, "1 place", 7, "7 €"), (2, "2 places", 14, "14 €"),
                                                  (4, "4 places", 28, "28 €")]):
            self.au_mot(mot_q)
            self.play(tb.allumer(0, c), FadeIn(tb.valeur(0, c), scale=1.4), run_time=0.35)
            if c:
                lg = self.ligne_c([(f"{q} ×", WHITE), ("7", AMBRE), ("=", WHITE), (f"{v} €", VERT_OK)],
                                  -0.45 - 0.95 * (c - 1))
                self.poser_lignes(VGroup(*lg[:3]), "fade", 0.3)
                self.au_mot(mot_v)
                self.play(FadeIn(lg[3], scale=1.3), FadeIn(tb.valeur(1, c), scale=1.4), tb.eteindre(0, c),
                          run_time=0.4)
            else:
                self.au_mot(mot_v)
                self.play(FadeIn(tb.valeur(1, c), scale=1.4), tb.eteindre(0, c), run_time=0.4)
        fl = tb.fleche_lat("× 7")
        self.au_mot("D'une ligne")
        self.play(Create(fl.fleche), run_time=0.6)
        self.au_mot("multiplie")
        phr = self.ligne([("On multiplie toujours par", WHITE), ("7", AMBRE)], 40).move_to(P(-0.9, -2.55))
        self.poser_lignes(phr, "fade", 0.35)
        self.play(FadeIn(fl.etiquette, scale=1.4), run_time=0.3)
        self.play(LaggedStart(*[Indicate(tb.colonne(c), color=AMBRE, scale_factor=1.08) for c in range(3)],
                              lag_ratio=0.3), run_time=1.0)
        self.attendre_voix()

    # ── 03 : proportionnel ──────────────────────────────────────────────────
    def ecran_proportionnel(self):
        self.ecran("03-proportionnel")
        tb = self.table_places(montrer=True, centre=P(-0.9, 1.1))
        fl = tb.fleche_lat("× 7")
        self.add(tb, fl)
        h, b = tb.fleche_col(1, 2, "× 2", ligne=0), tb.fleche_col(1, 2, "× 2", ligne=1)
        self.au_mot("Deux fois plus de places")
        self.play(Create(h.fleche), FadeIn(h.etiquette, scale=1.3), tb.allumer(0, 1), tb.allumer(0, 2),
                  run_time=0.6)
        self.au_mot("deux fois plus cher")
        self.play(Create(b.fleche), FadeIn(b.etiquette, scale=1.3), tb.allumer(1, 1), tb.allumer(1, 2),
                  run_time=0.6)
        self.au_mot("Le nombre de places")
        mot = self.tampon("Proportionnels", VERT_OK, 46).move_to(P(-0.9, -1.55))
        self.play(*[tb.eteindre(r, c) for r in range(2) for c in (1, 2)], run_time=0.3)
        self.au_mot("sont proportionnels")
        self.play(FadeIn(mot, scale=1.3), run_time=0.4)
        self.insister(mot, 1.15, 0.25)
        self.au_mot("on passe de l'un")
        phr = self.t("On multiplie toujours par le même nombre.", 36).move_to(P(-0.9, -2.75))
        self.play(Indicate(fl, color=AMBRE, scale_factor=1.3), run_time=0.6)
        self.au_mot("en multipliant")
        self.play(FadeIn(phr, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 04 : Karim, pédiatre : l'âge et la taille ───────────────────────────
    K_CM = 0.0078   # unités par cm sur la toise
    SOL = -3.15

    def ecran_contre_exemple(self):
        self.ecran("04-contre-exemple")
        self.au_mot("Mais tout n'est pas")
        tit = self.t("Tout n'est pas proportionnel !", 38, ROUGE_ERREUR).move_to(P(-0.3, 3.1))
        self.play(Write(tit), run_time=0.6)
        k, sol, xt = self.K_CM, self.SOL, -4.35
        toise = VGroup(Line(P(xt, sol), P(xt, sol + 760 * k), color=GREY_B, stroke_width=5),
                       *[Line(P(xt - 0.12, sol + m * 100 * k), P(xt + 0.12, sol + m * 100 * k), color=GREY_B,
                              stroke_width=4) for m in range(8)],
                       Line(P(-6.0, sol), P(0.4, sol), color=GREY_C, stroke_width=4))
        doc = karim(0.85).move_to(P(-5.6, -1.75))
        self.au_mot("Karim")
        nom = self.t("Karim", 36, BLEU_CALCUL).next_to(doc, UP, buff=0.75)
        self.play(FadeIn(doc, shift=UP * 0.3), FadeIn(nom), Create(toise), run_time=0.7)
        self.au_mot("pédiatre")
        met = self.t("pédiatre", 30, BLEU_CALCUL).next_to(nom, DOWN, buff=0.1)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        tb = TableauProp(["Âge (ans)", "Taille (cm)"], [[1, 10], [75, 140]], montrer=False, largeur_case=1.25,
                         largeur_libelle=2.6, fs=34, centre=P(3.6, 1.2))
        self.play(FadeIn(tb.fond), run_time=0.4)
        bebe = enfant(75 * k, "#7dd3fc").move_to(P(-3.6, sol + 75 * k / 2))
        gamin = enfant(140 * k, "#38bdf8").move_to(P(-2.7, sol + 140 * k / 2))
        self.au_mot("1 an")
        self.play(FadeIn(tb.valeur(0, 0), scale=1.4), GrowFromEdge(bebe, DOWN), run_time=0.5)
        self.au_mot("75 cm")
        e75 = self.t("75 cm", 28, "#7dd3fc").next_to(bebe, UP, buff=0.1)
        self.play(FadeIn(tb.valeur(1, 0), scale=1.4), FadeIn(e75), run_time=0.4)
        self.au_mot("10 ans")
        self.play(FadeIn(tb.valeur(0, 1), scale=1.4), GrowFromEdge(gamin, DOWN), run_time=0.5)
        self.au_mot("140 cm")
        e140 = self.t("140 cm", 28, BLEU_CALCUL).next_to(gamin, UP, buff=0.1)
        self.play(FadeIn(tb.valeur(1, 1), scale=1.4), FadeIn(e140), run_time=0.4)
        h = tb.fleche_col(0, 1, "× 10", ligne=0, hauteur=PI / 3)
        self.au_mot("Si c'était")
        self.play(Create(h.fleche), run_time=0.4)
        self.au_mot("10 fois")
        b = tb.fleche_col(0, 1, "× 10 ?", ligne=1, couleur=ORANGE_RETENUE, hauteur=PI / 3)
        self.play(FadeIn(h.etiquette, scale=1.3), Create(b.fleche), FadeIn(b.etiquette, scale=1.3), run_time=0.4)
        lg = self.ligne([("10 ×", WHITE), ("75 =", WHITE), ("750 cm", ROUGE_ERREUR)], 42)
        self.col(lg, -0.85, xl=1.2)
        self.play(FadeIn(lg[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("75, égale")
        self.play(FadeIn(lg[1], shift=RIGHT * 0.2), run_time=0.3)
        geant = enfant(750 * k, ROUGE_ERREUR).set_opacity(0.45).move_to(P(-1.35, sol + 750 * k / 2))
        e7 = self.t("750 cm", 28, ROUGE_ERREUR).next_to(geant, RIGHT, buff=0.1).align_to(geant, UP)
        self.au_mot("750 cm")
        self.play(FadeIn(lg[2], scale=1.3), FadeIn(e7), GrowFromEdge(geant, DOWN), run_time=1.0)
        self.au_mot("Plus de 7")
        p7 = self.t("Plus de 7 mètres !", 40, ROUGE_ERREUR)
        self.col(p7, -1.75, xl=1.2)
        self.play(FadeIn(p7, scale=1.2), run_time=0.4)
        self.insister(p7, 1.15, 0.25)
        self.au_mot("L'âge et la taille")
        x = croix(b, sw=7)
        v = self.tampon("Pas proportionnels", ROUGE_ERREUR, 40)
        self.col(v, -2.75, xl=1.2)
        self.play(Create(x), run_time=0.4)
        self.au_mot("ne sont pas")
        self.play(FadeIn(v, scale=1.3), run_time=0.4)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (2 places = 14 € ; 6 places ?) ──────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        deco = VGroup(ines(1.0).move_to(P(-5.4, -0.9)), caisse_cinema().move_to(P(-2.4, 0.2)))
        self.add(deco)
        tb = TableauProp(["Places", "Prix (€)"], [[2, 6], [14, "?"]], montrer=False, largeur_case=1.5,
                         largeur_libelle=2.3, fs=38, centre=P(-3.1, 0.3))

        def apres(sc):
            sc.play(FadeOut(deco), FadeIn(tb.fond), run_time=0.3)
            l0 = sc.ligne_rep(0, ["6 places =", "3 ×", "2 places."])
            l1 = sc.ligne_rep(1, ["3 ×", "14 =", "42 €."])
            h, b = tb.fleche_col(0, 1, "× 3", ligne=0), tb.fleche_col(0, 1, "× 3", ligne=1)
            sc.au_mot("6 places")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), FadeIn(tb.valeur(0, 1), scale=1.4), run_time=0.3)
            sc.au_mot("3 fois 2")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), Create(h.fleche), FadeIn(h.etiquette, scale=1.3), run_time=0.3)
            sc.au_mot("2 places")
            sc.play(FadeIn(l0[2], shift=UP * 0.15), FadeIn(tb.valeur(0, 0), scale=1.4), run_time=0.3)
            sc.au_mot("3 fois 14")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), Create(b.fleche), FadeIn(b.etiquette, scale=1.3),
                    FadeIn(tb.trou(1, 1)), run_time=0.3)
            sc.au_mot("14, égale")
            sc.play(FadeIn(l1[1], shift=UP * 0.15), FadeIn(tb.valeur(1, 0), scale=1.4), run_time=0.3)
            sc.au_mot("42")
            sc.play(FadeIn(l1[2], scale=1.3), tb.remplir(1, 1), run_time=0.4)
            sc.play(tb.allumer(1, 1), run_time=0.3)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["2 places coûtent 14 €.", "Le prix est proportionnel.", "Combien coûtent 6 places ?"],
                            [self.t("18 €", 34), self.t("42 €", 34), self.t("21 €", 34)], 1,
                            ["6 places = 3 × 2 places.", "3 × 14 = 42 €."], mot_q="2 places", autres_r=apres)

    # ── 06 : le piège du parc aquatique ─────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        tit = self.t("Attention au piège !", 44, ROUGE_ERREUR).move_to(P(-0.4, 3.1))
        self.au_mot("Attention")
        self.play(Write(tit), run_time=0.5)
        parc = toboggan().scale(0.95).move_to(P(-4.6, 0.6))
        tb = TableauProp(["Entrées", "Prix (€)"], [[2, 4], [6, 11]], montrer=False, largeur_case=1.4,
                         largeur_libelle=2.2, fs=38, centre=P(2.6, 1.3))
        self.au_mot("parc aquatique")
        self.play(FadeIn(parc, shift=UP * 0.2), FadeIn(tb.fond), run_time=0.35)
        for (r, c), mot in zip([(0, 0), (1, 0), (0, 1), (1, 1)], ["2 entrées", "6 €", "4 entrées", "11 €"]):
            self.au_mot(mot)
            self.play(FadeIn(tb.valeur(r, c), scale=1.4), run_time=0.3)
        h = tb.fleche_col(0, 1, "× 2", ligne=0)
        h.etiquette._pas_audit = True  # la voix dit « le double »
        self.au_mot("le double de 2")
        self.play(Create(h.fleche), FadeIn(h.etiquette, scale=1.3), run_time=0.5)
        b = tb.fleche_col(0, 1, "× 2", ligne=1, couleur=ORANGE_RETENUE)
        b.etiquette._pas_audit = True
        self.au_mot("Le double de 6")
        self.play(Create(b.fleche), FadeIn(b.etiquette, scale=1.3), run_time=0.5)
        lg = self.ligne([("Le double de 6", WHITE), ("= 12 €", VERT_OK)], 40)
        self.col(lg, -1.0, xl=1.3)
        self.play(FadeIn(lg[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("12")
        self.play(FadeIn(lg[1], scale=1.3), run_time=0.3)
        self.au_mot("Or on paie")
        neq = self.ligne([("Or on paie", WHITE), ("11 €", ROUGE_ERREUR), ("≠ 12 €", ROUGE_ERREUR)], 40)
        neq[2]._pas_audit = True  # rappel du 12 dit juste avant
        self.col(neq, -1.85, xl=1.3)
        self.play(FadeIn(neq[0], shift=RIGHT * 0.2), tb.allumer(1, 1), run_time=0.3)
        self.au_mot("11 €", 2)
        self.play(FadeIn(neq[1], scale=1.3), FadeIn(neq[2], shift=LEFT * 0.2),
                  Indicate(tb.textes[1][1], color=ROUGE_ERREUR), run_time=0.45)
        self.au_mot("Ce n'est pas")
        v = self.tampon("Pas proportionnel", ROUGE_ERREUR, 40)
        self.col(v, -2.85, xl=1.3)
        self.play(FadeIn(v, scale=1.3), Create(croix(b, sw=6)), run_time=0.45)
        self.attendre_voix()

    # ── 07 : le forfait de la salle de sport ────────────────────────────────
    def ecran_forfait(self):
        self.ecran("07-forfait")
        tit = self.t("La salle de sport", 44, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        hal = haltere(1.1).move_to(P(-4.7, 2.3))
        self.au_mot("la salle de sport")
        self.play(Write(tit), FadeIn(hal, scale=0.7), run_time=0.6)
        u = 0.13  # unités par euro (barres)

        def bloc(e, couleur, mot):
            r = Rectangle(width=e * u, height=0.6, fill_color=couleur, fill_opacity=1, stroke_color=BLACK,
                          stroke_width=3)
            t = Text(mot, font_size=26, color=BLACK, weight=BOLD).move_to(r)
            return VGroup(r, t)

        self.au_mot("10 € par mois")
        m1 = bloc(10, "#38bdf8", "10 €").move_to(P(-2.2, 1.05), aligned_edge=LEFT)
        l10 = self.t("par mois", 28, "#38bdf8").next_to(m1, UP, buff=0.12).align_to(m1, LEFT)
        self.play(FadeIn(m1, shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("par mois")
        self.play(FadeIn(l10), run_time=0.3)
        self.au_mot("20 € d'inscription")
        ins = bloc(20, "#cbd5e1", "20 €").next_to(m1, LEFT, buff=0)
        lins = self.t("inscription", 28, "#cbd5e1").next_to(ins, DOWN, buff=0.12)
        self.play(FadeIn(ins, shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("inscription")
        self.play(FadeIn(lins), run_time=0.3)
        rangee1 = VGroup(ins, m1)
        tb = TableauProp(["Mois", "Prix (€)"], [[1, 2], [30, 40]], montrer=False, largeur_case=1.4,
                         largeur_libelle=2.0, fs=38, centre=P(3.3, 1.3))
        self.au_mot("1 mois")
        n1 = self.t("1 mois", 30).next_to(rangee1, LEFT, buff=0.2)
        self.play(FadeIn(tb.fond), FadeIn(tb.valeur(0, 0), scale=1.4), FadeIn(n1), run_time=0.4)
        self.au_mot("30 €")
        self.play(FadeIn(tb.valeur(1, 0), scale=1.4), Indicate(rangee1, scale_factor=1.05), run_time=0.4)
        self.au_mot("2 mois")
        r2 = VGroup(ins.copy(), m1.copy(), bloc(10, "#38bdf8", "10 €")).arrange(RIGHT, buff=0)
        for blk in r2:  # la même barre, redite : données de la figure (dites plus haut)
            blk[1]._pas_audit = True
            blk[1].sans_synchro = True
        r2.move_to(P(0, -0.75)).align_to(ins, LEFT)
        n2 = self.t("2 mois", 30).next_to(r2, LEFT, buff=0.2)
        self.play(FadeIn(tb.valeur(0, 1), scale=1.4), FadeIn(n2), FadeIn(r2[:2], shift=DOWN * 0.3), run_time=0.4)
        self.play(FadeIn(r2[2], shift=RIGHT * 0.3), run_time=0.3)
        self.au_mot("40 €")
        self.play(FadeIn(tb.valeur(1, 1), scale=1.4), run_time=0.4)
        h = tb.fleche_col(0, 1, "× 2", ligne=0)
        h.etiquette._pas_audit = True  # « deux fois plus »
        self.au_mot("Deux fois plus de mois")
        self.play(Create(h.fleche), FadeIn(h.etiquette, scale=1.3), run_time=0.5)
        self.au_mot("mais pas deux fois")
        b = tb.fleche_col(0, 1, "pas × 2", ligne=1, couleur=ROUGE_ERREUR)
        b.etiquette._pas_audit = True
        self.play(Create(b.fleche), FadeIn(b.etiquette, scale=1.3), Indicate(r2[0], color=AMBRE), run_time=0.6)
        self.au_mot("Ce n'est pas")
        v = self.tampon("Pas proportionnel", ROUGE_ERREUR, 40)
        self.col(v, -2.6, xl=1.3)
        self.play(FadeIn(v, scale=1.3), Indicate(VGroup(ins, r2[0]), color=AMBRE), run_time=0.5)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (quel tableau est proportionnel ?) ──────────────────
    def mini(self, b, fs=34, w=1.4, h=0.5):
        """Le mini-tableau d'un choix : 1 kg | 2 kg / 3 € | b €. Textes ordinaires
        (chacun attend son mot, dans l'ordre de la voix), grille grise."""
        vals = [["1 kg", "2 kg"], ["3 €", f"{b} €"]]
        g = VGroup()
        for r in range(3):
            g.add(Line(P(0, -r * h), P(2 * w, -r * h)))
        for c in range(3):
            g.add(Line(P(c * w, 0), P(c * w, -2 * h)))
        g.set_stroke(GREY_B, 2)
        ts = VGroup(*[Text(vals[r][c], font_size=fs, color=WHITE).move_to(P((c + 0.5) * w, -(r + 0.5) * h))
                      for c in range(2) for r in range(2)])
        return VGroup(g, ts)

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        e = etal().scale(1.1).move_to(P(-3.3, 0.2))
        self.add(e)
        tb = TableauProp(["Masse (kg)", "Prix (€)"], [[1, 2], [3, 6]], montrer=False, largeur_case=1.4,
                         largeur_libelle=2.5, fs=38, centre=P(-3.6, 0.6))

        def apres(sc):
            sc.play(FadeOut(e), FadeIn(tb.fond), run_time=0.3)
            l0 = sc.ligne_rep(0, ["2 kg :", "le double de", "1 kg,"])
            l1 = sc.ligne_rep(1, ["6 € :", "le double de", "3 €."])
            l2 = sc.ligne_rep(2, ["Toujours ×", "3."])
            h, b = tb.fleche_col(0, 1, "× 2", ligne=0), tb.fleche_col(0, 1, "× 2", ligne=1)
            h.etiquette._pas_audit = b.etiquette._pas_audit = True  # la voix dit « le double »
            h.etiquette.sans_synchro = b.etiquette.sans_synchro = True
            lat = tb.fleche_lat("× 3")
            sc.au_mot("2 kilos")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), FadeIn(tb.valeur(0, 1), scale=1.4), run_time=0.3)
            sc.au_mot("le double de 1")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("1 kilo")
            sc.play(FadeIn(l0[2], shift=UP * 0.15), FadeIn(tb.valeur(0, 0), scale=1.4), Create(h.fleche),
                    FadeIn(h.etiquette), run_time=0.35)
            sc.au_mot("6 €")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), FadeIn(tb.valeur(1, 1), scale=1.4), run_time=0.3)
            sc.au_mot("le double de 3")
            sc.play(FadeIn(l1[1], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("3 €")
            sc.play(FadeIn(l1[2], shift=UP * 0.15), FadeIn(tb.valeur(1, 0), scale=1.4), Create(b.fleche),
                    FadeIn(b.etiquette), run_time=0.35)
            sc.au_mot("On multiplie")
            sc.play(FadeIn(l2[0], shift=UP * 0.15), Create(lat.fleche), run_time=0.4)
            sc.au_mot("par 3")
            sc.play(FadeIn(l2[1], scale=1.3), FadeIn(lat.etiquette, scale=1.3), run_time=0.3)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse", ["Quel tableau est proportionnel ?"],
                            [self.mini(5), self.mini(6), self.mini(4)], 1,
                            ["2 kg : le double de 1 kg,", "6 € : le double de 3 €.", "Toujours × 3."],
                            mot_q="Quel tableau", autres_r=apres)

    # ── 09 : défi : le pop-corn ─────────────────────────────────────────────
    def table_popcorn(self, montrer=False):
        return TableauProp(["Paquets", "Prix (€)"], [[1, 3, 5], [4, 12, 18]], montrer=montrer, largeur_case=1.5,
                           largeur_libelle=2.6, fs=38, centre=P(-0.9, 1.45))

    def boites(self, tb, c, n):
        """n paquets de pop-corn sous la colonne c du tableau."""
        g = VGroup(*[paquet_popcorn(0.38) for _ in range(n)]).arrange(RIGHT, buff=0.05)
        if n > 3:
            g = VGroup(VGroup(*g[:3]).arrange(RIGHT, buff=0.05), VGroup(*g[3:]).arrange(RIGHT, buff=0.05)) \
                .arrange(DOWN, buff=0.08)
        return g.move_to(P(tb.x(c), -0.35))

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.play(Write(tit), run_time=0.6)
        tb = self.table_popcorn()
        self.au_mot("pop-corn")
        self.play(FadeIn(tb.fond, shift=UP * 0.2), run_time=0.5)
        for c, (n, mq, mv) in enumerate([(1, "1 paquet", "4 €"), (3, "3 paquets", "12 €"), (5, "5 paquets", "18 €")]):
            self.au_mot(mq)
            self.play(FadeIn(tb.valeur(0, c), scale=1.4), FadeIn(self.boites(tb, c, n), shift=DOWN * 0.2),
                      run_time=0.4)
            self.au_mot(mv)
            self.play(FadeIn(tb.valeur(1, c), scale=1.4), run_time=0.35)
        self.au_mot("Le prix est-il")
        q = self.t("Le prix est-il proportionnel ?", 40, ORANGE_RETENUE).move_to(P(-0.9, -1.6))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.pause_defi(y=-2.45)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tb = self.table_popcorn(montrer=True)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.add(tb)
        self.play(Write(tit), run_time=0.5)
        lat = tb.fleche_lat("× 4")
        self.au_mot("1 paquet")
        self.play(tb.allumer(0, 0), tb.allumer(1, 0), run_time=0.3)
        self.au_mot("on multiplie par 4")
        self.play(Create(lat.fleche), FadeIn(lat.etiquette, scale=1.3), run_time=0.5)
        self.play(tb.eteindre(0, 0), tb.eteindre(1, 0), run_time=0.3)
        l1 = self.ligne([("3 × 4 =", WHITE), ("12", VERT_OK)], 42).move_to(P(-2.6, -0.4))
        self.au_mot("3 fois 4")
        self.poser_lignes(l1, "fade", 0.3)
        ok = self.coche(VERT_OK, 0.3).next_to(l1, RIGHT, buff=0.3)
        self.au_mot("ça marche")
        self.play(Create(ok), tb.allumer(1, 1), run_time=0.4)
        l2 = self.ligne([("5 × 4 =", WHITE), ("20", VERT_OK)], 42).move_to(P(-2.6, -1.35))
        self.au_mot("5 fois 4")
        self.poser_lignes(l2, "fade", 0.3)
        self.au_mot("et pas 18")
        x = tb.barrer(1, 2)
        n18 = self.ligne([("≠", ROUGE_ERREUR), ("18", ROUGE_ERREUR)], 42).next_to(l2, RIGHT, buff=0.3)
        self.play(FadeIn(n18, shift=LEFT * 0.2), Create(x), run_time=0.4)
        self.au_mot("Ce n'est pas")
        v = self.tampon("Pas proportionnel", ROUGE_ERREUR, 44).move_to(P(-0.9, -2.55))
        self.play(FadeIn(v, scale=1.3), run_time=0.4)
        self.insister(v, 1.12, 0.25)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        tb = self.table_places(montrer=True, centre=ORIGIN)
        fig = VGroup(tb, tb.fleche_lat("× 7"))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Proportionnelles : on multiplie", "toujours par le même nombre."),
            ("Deux fois plus,", "c'est deux fois plus."),
            ("Un forfait, un prix qui ne suit pas :", "pas proportionnel.")], fs=36)
        self.au_mot("Deux grandeurs")
        self.montrer_ligne(lignes[0], Indicate(fig[1], color=AMBRE))
        self.au_mot("Deux fois plus")
        self.montrer_ligne(lignes[1])
        self.au_mot("S'il y a")
        self.montrer_ligne(lignes[2])
        lignes[2][1][1].set_color(ROUGE_ERREUR)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tableau()
        self.ecran_proportionnel()
        self.ecran_contre_exemple()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_forfait()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class PropReconnaitre6e(PropReconnaitreBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
