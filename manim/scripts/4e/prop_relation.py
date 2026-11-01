# prop_relation.py
# EleveAI — Maths 4e — série « Proportionnalité », lot 5 (une paysage par
# micro), épisode 26 : TROUVER LA RELATION y = k × x (micro du coach :
# prop_relation, notion prop_proportionnalite), AVEC VOIX. Paysage 16:9
# SEULEMENT (le short de la micro existe déjà : 4e-prop-*-short-*), CEINTURE
# VERTE.
# ⭐ Méthode travaillée : LA RELATION y = k × x. Le coefficient k = y ÷ x se lit
# sur n'importe quelle colonne du TABLEAU (flèche latérale « × 1,5 ») ou sur un
# point du GRAPHIQUE (droite par l'origine) ; une relation se VÉRIFIE sur
# toutes les colonnes ; on l'utilise dans les deux sens (12 panneaux → 18 kWh ;
# 24 kWh → 24 ÷ 1,5 = 16 panneaux). Pas de produit en croix (épisode 24).
# ⭐ Fil rouge (consigne-videos-proportionnalite.md) : erreur 3 INVERSER LE
# COEFFICIENT (écran 07 : x ÷ y = 2 ÷ 3 ≈ 0,67 barré, la droite fausse rate
# les points ; question 2, C : 8 kWh = 12 ÷ 1,5) ; erreur 1 AJOUTER au lieu de
# multiplier (question 1, A : y = x + 16, barrée à l'écran 05 quand la voix dit
# « pas 35 » ; question 2, A : 13,5 = 12 + 1,5).
#
# Décor et métier : Maël, INSTALLATEUR DE PANNEAUX SOLAIRES (casque, gilet, une
# maison et son toit, le soleil). Chiffres inventés, plausibles : 1,5 kWh par
# panneau et par jour de soleil (ordre de grandeur d'un panneau d'environ
# 400 W au soleil quelques heures), aucune source citée par la voix.
# Centres d'intérêt : sciences, nature-ecologie.
#
# Écrans : 00 garde · 01 Maël, la cliente, une formule · 02 le tableau 2/4/10
# → 3/6/15 kWh, × 1,5 · 03 x, y et y = 1,5 × x, k = y ÷ x · 04 QUESTION 1
# (4 → 20, 7 → 35) · 05 vérifier : y = x + 16 marche pour 4, pas pour 7 ·
# 06 le graphique : points alignés avec l'origine, 3 ÷ 2 = 1,5 · 07 le piège
# x ÷ y · 08 QUESTION 2 (12 panneaux) · 09 défi 24 kWh · 09b correction
# 24 ÷ 1,5 = 16 · 10 ce que tu as appris · 11 fin.
#
# Voix : manim/voix/4e-prop-relation.json (validée par Frédéric le 01/11,
# débit −10), WAV dans public/sons/4e-prop-relation/ ; marques mot à mot :
# manim/scripts/4e/prop_relation_marques.json (scripts/marques_dump.ps1 puis le
# convertisseur « une marque par occurrence » de l'agent 19).
# Outils : manim/scripts/6e/prop_commun.py + manim/canvas_proportion.py (non
# modifiés : TableauProp, DroiteOrigine) ; base PropTableauBase de
# manim/scripts/4e/prop_tableau.py (épisode 21) ; barre_r / croix_r de
# prop_grandeur_coherence.py. Ajouté ICI : mael(), panneau(), soleil(),
# maison(), Repere (le repère du coach, panneaux → kWh).
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/prop_relation.py PropRelation4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/4e/prop_relation.py PropRelation4e -o eleveai-maths-4e-prop-relation --media_dir manim/media-prop-4e-26
# Sortie : manim/sorties/4e/maths/proportionnalite/26-relation/eleveai-maths-4e-prop-relation.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

import importlib.util  # noqa: E402

from prop_commun import *  # noqa: E402,F403
from prop_agrandissement_rapport import gras, sans  # noqa: E402
from prop_grandeur_coherence import barre_r, croix_r  # noqa: E402


def _charger(nom, chemin):
    spec = importlib.util.spec_from_file_location(nom, chemin)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_ICI = Path(__file__).resolve().parent
_t4 = _charger("prop_tableau_4e", _ICI / "prop_tableau.py")    # épisode 21 (4e)
PropTableauBase4e = _t4.PropTableauBase

SOL = "#facc15"        # le soleil
PAN = "#1e3a8a"        # les cellules d'un panneau
PAN_L = "#60a5fa"      # leurs traits
DROITE_C = "#2563eb"   # la bonne droite y = 1,5 × x
FAUX_C = "#dc2626"     # la droite fausse


def panneau(s=1.0):
    """Un panneau solaire : cadre gris, 3 × 2 cellules bleu nuit, reflets."""
    cadre = RoundedRectangle(width=1.0, height=0.66, corner_radius=0.05, fill_color="#cbd5e1", fill_opacity=1,
                             stroke_width=0)
    cel = VGroup(*[Rectangle(width=0.29, height=0.27, fill_color=PAN, fill_opacity=1, stroke_color=PAN_L,
                             stroke_width=1.5).move_to(P(-0.31 + 0.31 * i, 0.145 - 0.29 * j))
                   for i in range(3) for j in range(2)])
    reflet = Line(P(-0.4, 0.22), P(-0.2, 0.02), color=WHITE, stroke_width=2, stroke_opacity=0.6)
    return VGroup(cadre, cel, reflet).scale(s)


def soleil(r=0.5):
    disque = Circle(radius=r, fill_color=SOL, fill_opacity=1, stroke_width=0)
    rayons = VGroup(*[Line(P(np.cos(a) * r * 1.3, np.sin(a) * r * 1.3), P(np.cos(a) * r * 1.75, np.sin(a) * r * 1.75),
                           color=SOL, stroke_width=5) for a in np.arange(0, TAU, TAU / 10)])
    return VGroup(rayons, disque)


def mael(s=1.0):
    """Maël, installateur de panneaux solaires : gilet orange à bandes, casque
    de chantier blanc. .tete"""
    p = personne(peau="#e0ac69", tenue="#334155", cheveux="#78350f")
    gilet = p.corps.copy().set_fill("#f97316", 1).scale(0.86).shift(DOWN * 0.05)
    bandes = VGroup(*[Line(gilet.get_left() + UP * y + RIGHT * 0.12, gilet.get_right() + UP * y + LEFT * 0.12,
                           color="#fef08a", stroke_width=5) for y in (-0.05, -0.4)])
    c, r = p.tete.get_center(), p.tete.width / 2
    casque = VGroup(AnnularSector(inner_radius=0, outer_radius=r * 1.12, angle=PI, start_angle=0,
                                  fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.6),
                    RoundedRectangle(width=r * 2.6, height=r * 0.22, corner_radius=0.04, fill_color="#e2e8f0",
                                     fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.32))
    p.add(gilet, bandes, casque)
    return p.scale(s)


def maison(n=(3, 1), s=1.0, l=3.0):
    """Une maison, son toit en pente et n = (colonnes, rangées) panneaux posés
    dessus. .toit · .panneaux (VGroup) · .corps"""
    corps = Rectangle(width=l, height=1.5, fill_color="#fde68a", fill_opacity=1, stroke_color="#a16207",
                      stroke_width=3)
    toit = Polygon(P(-l / 2 - 0.25, 0.75), P(l / 2 + 0.25, 0.75), P(l / 2 - 0.25, 1.95), P(-l / 2 + 0.25, 1.95),
                   fill_color="#b91c1c", fill_opacity=1, stroke_width=0)
    porte = Rectangle(width=0.45, height=0.8, fill_color="#92400e", fill_opacity=1, stroke_width=0).move_to(P(0, -0.35))
    fen = VGroup(*[Square(0.42, fill_color="#bae6fd", fill_opacity=1, stroke_color=WHITE, stroke_width=2)
                   .move_to(P(x, 0.15)) for x in (-l / 3, l / 3)])
    nx, ny = n
    pans = VGroup(*[panneau(1.0) for _ in range(nx * ny)]).arrange_in_grid(ny, nx, buff=0.06)
    if pans.width > l - 0.2 or pans.height > 1.05:
        pans.scale(min((l - 0.2) / pans.width, 1.05 / pans.height))
    pans.move_to(P(0, 1.35))
    g = VGroup(corps, toit, porte, fen, pans)
    g.toit, g.panneaux, g.corps = toit, pans, corps
    return g.scale(s)


class Repere(VGroup):
    """Le repère du coach (DroiteOrigine) : panneaux 0 → 12, énergie 0 → 18 kWh.
    .dr · .p(x, y) · .noms (axes) · pt(x, y, c) · droite(k, c) (de O au bord)."""

    def __init__(self, centre=P(-3.4, -0.3), largeur=4.6, hauteur=4.0, **kw):
        super().__init__(**kw)
        self.dr = DroiteOrigine(12, 18, 2, 3, largeur=largeur, hauteur=hauteur, fs=24, nom_x="Panneaux (x)",
                                nom_y="Énergie (kWh) (y)", centre=centre)
        sans(self.dr)
        self.noms = self.dr.fond[4]
        self.fond = self.dr.fond
        self.add(self.dr)

    def p(self, x, y):
        return self.dr.p(x, y)

    def pt(self, x, y, couleur=DROITE_C, r=0.09):
        return Dot(self.p(x, y), radius=r, color=couleur)

    def droite(self, k=1.5, couleur=DROITE_C, sw=6):
        xm = min(12, 18 / k)
        return Line(self.p(0, 0), self.p(xm, k * xm), color=couleur, stroke_width=sw)

    def complet(self, points=True):
        """Le repère, la droite et les points de Maël déjà posés (sans synchro)."""
        g = VGroup(self.fond, self.droite())
        if points:
            g.add(*[self.pt(x, 1.5 * x) for x in (2, 4, 10)])
        return sans(g)


class PropRelationBase(PropTableauBase4e):
    nom_voix = "4e-prop-relation"
    fichier_marques = "prop_relation_marques.json"
    LIBS = ["Panneaux", "Énergie (kWh)"]
    VALS = [[2, 4, 10], [3, 6, 15]]
    X0 = 0.3

    def table_m(self, vals=None, centre=P(0.3, 2.0), lc=1.2, ll=3.0, fs=38, libs=None):
        return TableauProp(libs or self.LIBS, vals or self.VALS, montrer=False, largeur_case=lc, largeur_libelle=ll,
                           hauteur=0.85, fs=fs, centre=centre)

    def montre(self, mot, *anims, n=1, rt=0.4):
        if isinstance(mot, tuple):
            mot, n = mot
        self.au_mot(mot, n)
        self.play(*anims, run_time=rt)

    def boite(self, mob, couleur=VERT_OK):
        return SurroundingRectangle(mob, color=couleur, buff=0.18, corner_radius=0.12, stroke_width=4)

    def titre_haut(self, s, mot, couleur=JAUNE_TITRE, fs=42, x=0.0):
        self.au_mot(mot)
        tit = self.t(s, fs, couleur).move_to(P(x, 3.15))
        self.play(Write(tit), run_time=0.5)
        return tit

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Trouver la relation entre deux grandeurs", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Trouver")
        mai = maison((3, 1), 0.7).move_to(P(-5.2, 0.0))
        so = soleil(0.42).move_to(P(4.6, 0.8))
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(mai, shift=UP * 0.2),
                  FadeIn(so, scale=0.6), run_time=0.8)
        q = self.t("Les panneaux de Maël", 40, AMBRE).move_to(P(0.5, 0.25))
        self.au_mot("Les panneaux")
        self.play(FadeIn(q, scale=1.15), Rotate(so[0], PI / 5), run_time=0.6)
        self.insister(q, 1.1, 0.25)
        self.attendre_voix(marge=0.6)

    # ── 01 : Maël, la cliente, une formule ──────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = mael(0.95).move_to(P(-5.6, -0.8))
        self.au_mot("Voici Maël")
        nom = self.t("Maël", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.3)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("Il installe")
        met = VGroup(self.t("installateur de", 28, BLEU_CALCUL), self.t("panneaux solaires", 28, BLEU_CALCUL))
        met.arrange(DOWN, buff=0.08).next_to(pers, DOWN, buff=0.15)
        met.shift(RIGHT * max(0, -6.5 - met.get_left()[0]))
        mai = maison((3, 1), 0.85).move_to(P(-1.7, 0.1))
        pans = mai.panneaux
        mai.remove(pans)
        so = soleil(0.3).move_to(P(-0.2, 2.95))
        self.play(FadeIn(met, shift=DOWN * 0.1), FadeIn(mai, shift=UP * 0.2), FadeIn(so, scale=0.6), run_time=0.5)
        self.au_mot("sur les toits")
        self.play(LaggedStart(*[FadeIn(p, shift=DOWN * 0.3) for p in pans], lag_ratio=0.25), run_time=0.7)
        cli = personne(peau="#8d5524", tenue="#db2777", cheveux="#111827", longs=True).scale(0.7)
        cli.move_to(P(5.8, 0.55))
        bul = VGroup(self.t("Plus de panneaux :", 32), self.t("combien d'énergie", 32, AMBRE),
                     self.t("par jour ?", 32, AMBRE)).arrange(DOWN, buff=0.1)
        cad = RoundedRectangle(width=bul.width + 0.5, height=bul.height + 0.4, corner_radius=0.2,
                               stroke_color=WHITE, stroke_width=3).move_to(bul)
        bulle = VGroup(cad, bul).move_to(P(2.7, 1.7))
        queue = Line(cad.get_right() + DOWN * 0.2, cli.tete.get_left() + LEFT * 0.1, color=WHITE, stroke_width=3)
        self.au_mot("Une cliente")
        self.play(FadeIn(cli, shift=LEFT * 0.3), run_time=0.45)
        self.au_mot("Si je mets")
        self.play(Create(cad), Create(queue), FadeIn(bul[0], shift=RIGHT * 0.15), run_time=0.5)
        self.au_mot("combien d'énergie")
        self.play(FadeIn(bul[1], shift=RIGHT * 0.15), run_time=0.35)
        self.au_mot("par jour")
        self.play(FadeIn(bul[2], shift=RIGHT * 0.15), Rotate(so[0], PI / 5), run_time=0.4)
        L1 = self.lc([("Une formule", AMBRE)], -1.0, fs=40, x=2.3)
        L2 = self.lc([("pour n'importe quel", WHITE)], -1.75, fs=34, x=2.3)
        L3 = self.lc([("nombre de panneaux", WHITE)], -2.4, fs=34, x=2.3)
        self.jouer(L1, ["une formule"])
        self.jouer(L2, ["pour n'importe"])
        self.jouer(L3, ["nombre de panneaux"])
        self.play(Circumscribe(L1, color=AMBRE, buff=0.12), run_time=0.8)
        self.attendre_voix()

    # ── 02 : le tableau 2/4/10 → 3/6/15 kWh, × 1,5 ─────────────────────────
    def ecran_tableau(self):
        self.ecran("02-tableau")
        so = soleil(0.4).move_to(P(-5.0, 2.55))
        mai = maison((2, 1), 0.75).move_to(P(-4.9, -0.3))
        tb = self.table_m(centre=P(0.6, 0.9), lc=1.15)
        self.au_mot("Il note")
        self.play(FadeIn(tb.fond, shift=DOWN * 0.15), FadeIn(mai, shift=UP * 0.2), run_time=0.45)
        L0 = self.lc([("Un jour de soleil", SOL)], 2.75, fs=40, x=1.3)
        self.jouer(L0, ["un jour de soleil"], {0: [FadeIn(so, scale=0.6)]})
        for c, (n, e, mn, me, gr) in enumerate(((2, 3, "2 panneaux", "3 kilowattheures", (2, 1)),
                                                 (4, 6, "4 panneaux", "6 kilowattheures", (4, 1)),
                                                 (10, 15, "10 panneaux", "15 kilowattheures", (5, 2)))):
            self.au_mot(mn)
            anims = [FadeIn(tb.valeur(0, c), scale=1.4)]
            if c > 0:
                neuf = maison(gr, 0.75).move_to(mai)
                anims.append(Transform(mai.panneaux, neuf.panneaux))
            self.play(*anims, run_time=0.4)
            self.au_mot(me)
            self.play(FadeIn(tb.valeur(1, c), scale=1.4), Rotate(so[0], PI / 5), run_time=0.35)
        fl = tb.fleche_lat("× 1,5")
        L1 = self.lc([("Énergie =", WHITE), ("panneaux", WHITE), ("× 1,5", AMBRE)], -1.0, fs=42, x=1.3)
        self.jouer(L1, ["l'énergie", "le nombre de panneaux", "1,5"],
                   {2: [Create(fl.fleche), FadeIn(fl.etiquette, scale=1.3)]})
        self.insister(fl.etiquette, 1.2, 0.25)
        self.play(Circumscribe(L1, color=AMBRE, buff=0.12), run_time=0.8)
        self.attendre_voix()

    # ── 03 : x, y et la relation y = 1,5 × x ; coefficient = y ÷ x ─────────
    def ecran_relation(self):
        self.ecran("03-relation")
        tb = self.table_m(centre=P(0.6, 2.25), lc=1.15)
        fl = tb.fleche_lat("× 1,5")
        self.add(sans(VGroup(tb.fond, fl, *[tb.valeur(r, c) for r in (0, 1) for c in range(3)])))
        ex = gras("x", 44, AMBRE).next_to(tb.carte, LEFT, buff=0.25).set_y(tb.y(0))
        ey = gras("y", 44, AMBRE).next_to(tb.carte, LEFT, buff=0.25).set_y(tb.y(1))
        self.au_mot("On appelle x")
        self.play(FadeIn(ex, scale=1.5), Indicate(tb.libelles[0], color=AMBRE, scale_factor=1.15), run_time=0.5)
        self.au_mot("et y")
        self.play(FadeIn(ey, scale=1.5), Indicate(tb.libelles[1], color=AMBRE, scale_factor=1.15), run_time=0.5)
        rel = self.lc([("y =", WHITE), ("1,5", AMBRE), ("× x", WHITE)], 0.35, fs=66, x=0.3)
        self.jouer(rel, ["y égale", "1,5 fois", "fois x"], rt=0.35)
        self.play(Circumscribe(rel, color=AMBRE, buff=0.15), run_time=0.8)
        tp = self.tampon("coefficient de proportionnalité", AMBRE, 34).move_to(P(0.3, -1.05))
        fk = Arrow(rel[1].get_bottom(), tp.get_top(), buff=0.08, color=AMBRE, stroke_width=5, tip_length=0.18)
        self.au_mot("Le nombre 1,5")
        self.play(Indicate(rel[1], color=AMBRE, scale_factor=1.3), run_time=0.6)
        self.au_mot("le coefficient")
        self.play(GrowArrow(fk), FadeIn(tp, scale=1.3), run_time=0.5)
        self.insister(tp, 1.06, 0.25)
        self.au_mot("n'importe quelle")
        self.play(LaggedStart(*[Indicate(tb.colonne(c), color=AMBRE, scale_factor=1.12) for c in range(3)],
                              lag_ratio=0.3), run_time=0.7)
        L = self.lc([("Sur une colonne :", WHITE), ("y ÷ x", VERT_OK)], -2.3, fs=42, x=0.3)
        L[0].sans_synchro = True
        self.jouer(L, ["colonne", "y divisé"])
        self.insister(L[1], 1.15, 0.25)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (4 → 20 ; 7 → 35 : quelle relation ?) ─────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        deco = VGroup(mael(0.9).move_to(P(-5.6, -1.0)), maison((2, 2), 0.7).move_to(P(-2.6, 0.2)))
        self.add(deco)
        tb = self.table_m([[4, 7], [20, 35]], P(-3.4, 1.0), lc=1.5, ll=1.2, fs=40, libs=["x", "y"])
        fl = tb.fleche_lat("× 5")

        def apres(sc):
            sc.play(FadeOut(deco), FadeIn(tb.fond), run_time=0.3)
            l = sc.ligne_rep(0, ["20 ÷", "4 =", "5", "et 35 ÷", "7 =", "5"])
            l0, l1 = l[:3], l[3:]
            l2 = sc.ligne_rep(1, ["Donc", "y = 5 × x."])
            sc.au_mot("20 divisé")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), FadeIn(tb.valeur(1, 0), scale=1.4), run_time=0.3)
            sc.au_mot("par 4")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), FadeIn(tb.valeur(0, 0), scale=1.4), run_time=0.3)
            sc.au_mot("égale 5")
            sc.play(FadeIn(l0[2], scale=1.3), run_time=0.3)
            sc.au_mot("35 divisé")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), FadeIn(tb.valeur(1, 1), scale=1.4), run_time=0.3)
            sc.au_mot("par 7")
            sc.play(FadeIn(l1[1], shift=UP * 0.15), FadeIn(tb.valeur(0, 1), scale=1.4), run_time=0.3)
            sc.au_mot("égale 5", 2)
            sc.play(FadeIn(l1[2], scale=1.3), Create(fl.fleche), FadeIn(fl.etiquette, scale=1.3), run_time=0.4)
            sc.au_mot("Donc")
            sc.play(FadeIn(l2[0], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("y égale 5")
            sc.play(FadeIn(l2[1], scale=1.2), Indicate(fl.etiquette, color=AMBRE), run_time=0.4)
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse",
                            ["x = 4 → y = 20", "x = 7 → y = 35", "Quelle est la relation ?"],
                            [self.t("y = x + 16", 34), self.t("y = 5 × x", 34), self.t("y = 4 × x", 34)], 1,
                            ["20 ÷ 4 = 5 et 35 ÷ 7 = 5", "Donc y = 5 × x."], mot_q="Un tableau",
                            autres_r=apres)

    # ── 05 : vérifier : y = x + 16 marche pour 4, pas pour 7 ───────────────
    def ecran_verifier(self):
        self.ecran("05-verifier")
        tb = self.table_m([[4, 7], [20, 35]], P(0.0, 1.35), lc=3.6, ll=1.2, fs=42, libs=["x", "y"])
        self.add(sans(VGroup(tb.fond, *[tb.valeur(r, c) for r in (0, 1) for c in (0, 1)])))
        rel = self.lc([("Et", WHITE), ("y = x + 16 ?", ROUGE_P)], 3.0, fs=44, x=0.0)
        self.jouer(rel, ["Et pourquoi", "y égale x plus"])
        c0 = self.ligne([("4 +", WHITE), ("16 =", WHITE), ("20", VERT_OK)], 36).move_to(P(tb.x(0), -0.25))
        c1 = self.ligne([("7 +", WHITE), ("16 =", WHITE), ("23", ROUGE_P)], 36).move_to(P(tb.x(1), -0.25))
        for m in (c0[1], c1[1]):
            sans(m)  # « 16 » redit de la relation (4 et 7 posés au mot)
        self.au_mot("Pour 4")
        self.play(FadeIn(c0[0], shift=DOWN * 0.15), FadeIn(c0[1], shift=DOWN * 0.15), tb.allumer(0, 0), run_time=0.35)
        ok = self.coche().next_to(c0, DOWN, buff=0.2)
        self.au_mot("donne 20")
        self.play(FadeIn(c0[2], scale=1.3), Create(ok), tb.allumer(1, 0), run_time=0.4)
        self.au_mot("pour 7")
        self.play(FadeIn(c1[0], shift=DOWN * 0.15), FadeIn(c1[1], shift=DOWN * 0.15), tb.eteindre(0, 0), tb.eteindre(1, 0), tb.allumer(0, 1),
                  run_time=0.35)
        self.au_mot("donne 23")
        self.play(FadeIn(c1[2], scale=1.3), run_time=0.35)
        pas = self.lc([("pas 35", ROUGE_ERREUR)], -1.0, fs=38, x=tb.x(1))
        anneau = SurroundingRectangle(tb.case(1, 1), color=ROUGE_ERREUR, buff=0.04, stroke_width=6)
        self.jouer(pas, ["pas 35"], {0: [Create(anneau)]})
        self.play(Create(barre_r(rel[1])), run_time=0.4)
        tp = self.tampon("Toutes les colonnes !", VERT_OK, 38).move_to(P(0.0, -2.35))
        self.montre("pour toutes les colonnes", FadeIn(tp, scale=1.3), rt=0.45)
        self.play(LaggedStart(*[Indicate(tb.colonne(c), color=VERT_OK, scale_factor=1.1) for c in (0, 1)],
                              lag_ratio=0.4), run_time=0.9)
        self.attendre_voix()

    # ── 06 : le graphique : points alignés avec l'origine ; 3 ÷ 2 = 1,5 ─────
    def ecran_graphique(self):
        self.ecran("06-graphique")
        g = Repere()
        self.add(g.fond)
        XR = 3.4
        tit = self.lc([("Sur un graphique", JAUNE_TITRE)], 2.8, fs=42, x=XR)
        self.jouer(tit, ["sur un graphique"])
        pts = [g.pt(x, 1.5 * x) for x in (2, 4, 10)]
        self.montre("Les points de Maël", LaggedStart(*[FadeIn(d, scale=2.5) for d in pts], lag_ratio=0.35), rt=0.9)
        L1 = self.lc([("Points alignés", WHITE)], 1.95, fs=38, x=XR)
        L1[0].sans_synchro = True  # « points » dit 1 s plus tôt ; posé au mot « alignés »
        d = g.droite()
        self.jouer(L1, ["sont alignés"], {0: [Create(d)]})
        L2 = self.lc([("avec l'origine", VERT_OK)], 1.3, fs=38, x=XR)
        o = g.pt(0, 0, VERT_OK, 0.12)
        anneau = Circle(radius=0.26, color=VERT_OK, stroke_width=6).move_to(g.p(0, 0))
        self.jouer(L2, ["avec l'origine"], {0: [FadeIn(o, scale=2), Create(anneau)]})
        self.au_mot("On prend un point")
        a2 = Circle(radius=0.22, color=AMBRE, stroke_width=5).move_to(g.p(2, 3))
        self.play(Create(a2), Flash(g.p(2, 3), color=AMBRE), run_time=0.5)
        px = DashedLine(g.p(2, 3), g.p(2, 0), color=AMBRE, stroke_width=4, dash_length=0.1)
        py = DashedLine(g.p(2, 3), g.p(0, 3), color=AMBRE, stroke_width=4, dash_length=0.1)
        L3 = self.lc([("2 panneaux", WHITE), ("→", WHITE), ("3 kWh", WHITE)], 0.3, fs=38, x=XR)
        self.jouer(L3, ["2 panneaux", None, "3 kilowattheures"], {0: [Create(px)], 2: [Create(py)]})
        L4 = self.lc([("3 ÷", WHITE), ("2 =", WHITE), ("1,5", AMBRE)], -0.6, fs=44, x=XR)
        self.jouer(L4, ["3 divisé", "par 2", "égale 1,5"])
        self.insister(L4[2], 1.2, 0.25)
        L5 = self.lc([("y = 1,5 × x", VERT_OK)], -1.75, fs=48, x=XR)
        self.jouer(L5, ["On retrouve"])
        self.play(Create(self.boite(L5, VERT_OK)), Indicate(d, color=VERT_OK, scale_factor=1.03), run_time=0.6)
        self.attendre_voix()

    # ── 07 : le piège : x ÷ y = 2 ÷ 3 ≈ 0,67, une relation fausse ──────────
    def ecran_piege(self):
        self.ecran("07-piege")
        g = Repere()
        self.add(g.complet())
        XR = 3.4
        tit = self.lc([("Attention au piège !", ROUGE_ERREUR)], 2.8, fs=42, x=XR)
        self.jouer(tit, ["Attention"])
        L1 = self.lc([("Coefficient =", WHITE), ("y ÷ x", VERT_OK)], 1.85, fs=40, x=XR)
        self.jouer(L1, ["Le coefficient", "y divisé"])
        ok = self.coche().next_to(L1, LEFT, buff=0.25)
        self.play(Create(ok), run_time=0.3)
        L2 = self.lc([("et pas", ROUGE_P), ("x ÷ y", ROUGE_P)], 1.0, fs=40, x=XR)
        self.jouer(L2, ["et pas", "x divisé"])
        L3 = self.lc([("2 ÷ 3", ROUGE_P), ("≈ 0,67", ROUGE_P)], 0.1, fs=40, x=XR)
        self.jouer(L3, ["2 divisé", "0,67"])
        faux = DashedLine(g.p(0, 0), g.p(12, 8), color=FAUX_C, stroke_width=5, dash_length=0.14)
        L4 = self.lc([("y = 0,67 × x :", ROUGE_P), ("faux !", ROUGE_ERREUR)], -0.85, fs=40, x=XR)
        L4[0].sans_synchro = L4[0]._pas_audit = True  # « 0,67 » redit à l'instant (la voix ne le redit pas)
        self.jouer(L4, ["une relation", "fausse"], {0: [Create(faux)]})
        rates = VGroup(*[Circle(radius=0.2, color=FAUX_C, stroke_width=4).move_to(g.p(x, 1.5 * x)) for x in (2, 4, 10)])
        self.play(LaggedStart(*[Create(c) for c in rates], lag_ratio=0.25), run_time=0.6)
        self.play(*[Create(barre_r(m)) for m in (L2, L3, L4[0])], run_time=0.45)
        self.play(Circumscribe(L1, color=VERT_OK, buff=0.12), run_time=0.8)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (y = 1,5 × x ; 12 panneaux → ? kWh) ───────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = Repere()
        self.add(g.complet())

        def apres(sc):
            l0 = sc.ligne_rep(0, ["y = 1,5 ×", "12"])
            l1 = sc.ligne_rep(1, ["= 18 kWh"])
            up = Arrow(g.p(12, 0), g.p(12, 18), buff=0, color=AMBRE, stroke_width=6, tip_length=0.18)
            p18 = g.pt(12, 18, VERT_OK, 0.13)
            sc.au_mot("y égale 1,5")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("fois 12")
            sc.play(FadeIn(l0[1], scale=1.3), GrowArrow(up), run_time=0.5)
            sc.au_mot("égale 18")
            sc.play(FadeIn(l1[0], scale=1.3), FadeIn(p18, scale=2.5), run_time=0.5)
            sc.play(Flash(g.p(12, 18), color=VERT_OK), run_time=0.4)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse",
                            ["Avec y = 1,5 × x,", "combien d'énergie", "pour 12 panneaux ?"],
                            [self.t("13,5 kWh", 34), self.t("18 kWh", 34), self.t("8 kWh", 34)], 1,
                            ["y = 1,5 × 12", "= 18 kWh"], mot_q="Avec y", autres_r=apres)

    # ── 09 : défi : une maison produit 24 kWh par jour ─────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        XR = 2.2
        tit = self.lc([("À toi de jouer !", JAUNE_TITRE)], 2.8, fs=50, x=XR)
        self.jouer(tit, ["À toi de jouer"])
        mai = maison((4, 2), 0.95).move_to(P(-4.4, -0.3))
        pans = mai.panneaux
        mai.remove(pans)
        q = gras("?", 60, AMBRE).move_to(pans)
        so = soleil(0.4).move_to(P(-4.4, 2.65))
        L0 = self.lc([("Mêmes panneaux :", WHITE), ("y = 1,5 × x", AMBRE)], 1.7, fs=38, x=XR)
        L0[1].sans_synchro = L0[1]._pas_audit = True  # la relation des écrans 03 et 06, rappelée
        self.jouer(L0, ["les mêmes panneaux", None], {0: [FadeIn(so, scale=0.6)]})
        L1 = self.lc([("Une maison :", WHITE), ("24 kWh", AMBRE), ("par jour", WHITE)], 0.75, fs=40, x=XR)
        self.jouer(L1, ["une maison", "24 kilowattheures", "par jour"], {0: [FadeIn(mai, shift=UP * 0.2)]})
        L2 = self.lc([("Combien de panneaux ?", ORANGE_RETENUE)], -0.2, fs=40, x=XR)
        self.jouer(L2, ["Combien de panneaux"], {0: [FadeIn(q, scale=1.4)]})
        self.play(Indicate(q, color=AMBRE, scale_factor=1.3), run_time=0.5)
        self.pause_defi(y=-1.4)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 48, JAUNE_TITRE).move_to(P(0.0, 3.2))
        self.play(Write(tit), run_time=0.5)
        tb = self.table_m([["?"], [24]], P(-3.9, 1.5), lc=1.5, ll=3.0, fs=38)
        bas = sans(tb.fleche_lat("× 1,5"))
        self.add(sans(VGroup(tb.fond, tb.trou(0, 0), tb.valeur(1, 0))))
        XR = 3.5
        L1 = self.lc([("1,5 × x", WHITE), ("= 24", WHITE)], 1.85, fs=40, x=XR)
        self.jouer(L1, ["1,5 fois x", "égale 24"], {0: [Create(bas)]})
        haut = tb.fleche_lat("÷ 1,5", sens="haut", couleur=VERT_OK)
        L2 = self.lc([("Donc x =", WHITE), ("24 ÷", WHITE), ("1,5", VERT_OK)], 0.8, fs=40, x=XR)
        self.jouer(L2, ["Donc x", "24 divisé", "par 1,5"],
                   {0: [FadeOut(bas)], 1: [Create(haut.fleche)], 2: [FadeIn(haut.etiquette, scale=1.3)]})
        L3 = self.lc([("x = 16 panneaux", VERT_OK)], -0.25, fs=44, x=XR)
        mai = maison((8, 2), 0.85).move_to(P(-3.9, -1.55))
        self.jouer(L3, ["égale 16"], {0: [tb.remplir(0, 0, 16), FadeIn(mai, shift=UP * 0.2)]})
        self.play(LaggedStart(*[Indicate(p, color=SOL, scale_factor=1.3) for p in mai.panneaux], lag_ratio=0.05),
                  run_time=0.9)
        self.play(Create(self.boite(VGroup(L1, L2, L3), VERT_OK)), run_time=0.5)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        g = Repere()
        fig = g.complet()
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Proportionnelles :", "y = k × x."),
            ("k = y ÷ x, sur un tableau", "ou sur un graphique."),
            ("On vérifie la relation", "sur toutes les colonnes.")], fs=36)
        self.au_mot("Quand deux")
        self.montrer_ligne(lignes[0])
        self.au_mot("On trouve k")
        self.montrer_ligne(lignes[1], Indicate(fig[1], color=AMBRE))
        self.au_mot("Et on vérifie")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tableau()
        self.ecran_relation()
        self.ecran_question1()
        self.ecran_verifier()
        self.ecran_graphique()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class PropRelation4e(PropRelationBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
