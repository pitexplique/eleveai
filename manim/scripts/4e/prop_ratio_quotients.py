# prop_ratio_quotients.py
# EleveAI — Maths 4e — série « Proportionnalité », lot 5 (une paysage par
# micro), épisode 29 : RATIO ET QUOTIENTS ÉGAUX (micro du coach :
# prop_ratio_quotients, notion prop_ratio), AVEC VOIX. Paysage 16:9, CEINTURE
# VERTE. PAYSAGE SEULEMENT (les shorts 4e-prop-ratio-short-* existent déjà).
# ⭐ Méthode travaillée : a et b sont dans le ratio 5 : 3 (dit « 5 pour 3 »)
# quand a ÷ 5 = b ÷ 3 ; ce quotient commun est la VALEUR D'UNE PART. On la
# calcule avec le nombre connu, puis on multiplie pour l'autre ; on vérifie un
# mélange en comparant les deux quotients. Pas de produit en croix (réservé à
# l'épisode 24) ; « ÷ » écrit, jamais 5/2.
# ⭐ Le dessin qui porte tout : les BARRES DE PARTS (une rangée par ingrédient,
# une part = un bloc, la valeur d'une part écrite DEDANS : « 4 kg »). Vérifier
# = des blocs de même taille ; « 10 kg d'eau » = des blocs d'eau plus longs
# (3,33 kg) qui dépassent : la pâte est trop molle.
# ⭐ Fil rouge : erreur 1 AJOUTER AU LIEU DE MULTIPLIER (le ratio pris pour un
# ÉCART : piège 06, « 2 kg de plus », 18 kg barré ; question 1 A : 33 kg =
# 35 − 2 ; question 2 B : 30 g : 29 g, 1 g d'écart) ; erreur 3 INVERSER
# (question 1 C : ≈ 58 kg = 35 × 5 ÷ 3 ; question 2 C : 15 g : 30 g).
#
# Décor et métier : CUISINE, Salomé, BOULANGÈRE (son fournil, ses sacs de
# farine, son broc d'eau, ses pains et ses brioches). Recettes inventées,
# plausibles (une pâte à pain classique a environ 60 % d'eau : 3 ÷ 5 = 0,6) ;
# aucun chiffre du monde réel cité : pas de source à donner.
# Centres d'intérêt : cuisine.
#
# Écrans : 00 garde · 01 Salomé, 5 : 3, 20 kg de farine · 02 le ratio = deux
# quotients égaux (barres de parts) · 03 le calcul : 20 ÷ 5 = 4 kg, eau = 3 × 4
# = 12 kg = 12 L · 04 QUESTION 1 (35 kg) · 05 vérifier un mélange (15 : 9 juste,
# 15 : 10 faux) · 06 le piège de l'écart (18 kg barré) · 07 QUESTION 2 (sel :
# levure 2 : 1) · 08 défi des brioches (beurre : sucre 3 : 2, 450 g) ·
# 08b correction · 09 ce que tu as appris · 10 fin.
#
# Voix : manim/voix/4e-prop-ratio-quotients.json (validée par Frédéric le 01/11,
# débit −10), WAV dans public/sons/4e-prop-ratio-quotients/ ; marques mot à mot :
# manim/scripts/4e/prop_ratio_quotients_marques.json (scripts/marques_dump.ps1
# puis le convertisseur « une marque par occurrence » de l'agent 19).
# Outils : manim/scripts/6e/prop_commun.py + manim/canvas_proportion.py (non
# modifiés) ; base PropTableauBase de manim/scripts/4e/prop_tableau.py
# (épisode 21 : ligne_rep bornée, lc, jouer, coche loin du texte des choix,
# choix non audités à la réponse) et toque() ; sans() de
# prop_agrandissement_rapport.py. Ajouté ICI : Parts (une rangée de la barre
# de parts), salome(), sac_farine(), broc(), pain(), brioche().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/prop_ratio_quotients.py PropRatioQuotients4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/4e/prop_ratio_quotients.py PropRatioQuotients4e -o eleveai-maths-4e-prop-ratio-quotients --media_dir manim/media-prop-4e-29
# Sortie : manim/sorties/4e/maths/proportionnalite/29-ratio-quotients/eleveai-maths-4e-prop-ratio-quotients.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

import importlib.util  # noqa: E402

from prop_commun import *  # noqa: E402,F403
from prop_agrandissement_rapport import sans  # noqa: E402


def _charger(nom, chemin):
    spec = importlib.util.spec_from_file_location(nom, chemin)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_ICI = Path(__file__).resolve().parent
_t4 = _charger("prop_tableau_4e", _ICI / "prop_tableau.py")    # épisode 21 (4e)
PropTableauBase4e, toque = _t4.PropTableauBase, _t4.toque

FARINE = "#fde68a"     # la farine (blé clair)
EAU = "#7dd3fc"        # l'eau
SEL = "#e2e8f0"        # le sel
LEVURE = "#fbbf24"     # la levure
BEURRE = "#facc15"     # le beurre
SUCRE = "#f9a8d4"      # le sucre (rose, pour le distinguer du sel)
CROUTE = "#b45309"     # la croûte des pains
MIE = "#fcd34d"


class Parts(VGroup):
    """Une rangée de la barre de parts : n blocs égaux et collés (largeur bw).
    .blocs[i] = le rectangle du bloc i. Les nombres s'écrivent DEDANS par
    textes(v) (renvoyés, non ajoutés), au mot de la voix."""

    def __init__(self, n, couleur, bw=0.9, h=0.62, fs=28, **kw):
        super().__init__(**kw)
        self.n, self.couleur, self.bw, self.h, self.fs = n, couleur, bw, h, fs
        self.blocs = VGroup(*[Rectangle(width=bw, height=h, fill_color=couleur, fill_opacity=1, stroke_color=NUIT,
                                        stroke_width=3) for _ in range(n)]).arrange(RIGHT, buff=0)
        self.add(self.blocs)

    def textes(self, v, synchro=True, couleur=NUIT, fs=None):
        out = VGroup()
        for b in self.blocs:
            t = Text(str(v), font_size=fs or self.fs, color=couleur, weight=BOLD).move_to(b)
            if t.width > self.bw - 0.12:
                t.scale_to_fit_width(self.bw - 0.12)
            if not synchro:
                sans(t)
            out.add(t)
        return out

    def cadres(self, couleur=AMBRE, sw=5):
        """Un cadre par bloc (le geste « ÷ n » : n parts égales)."""
        return VGroup(*[SurroundingRectangle(b, color=couleur, buff=0.05, stroke_width=sw, corner_radius=0.04)
                        for b in self.blocs])


def deux_rangees(n1, c1, nom1, n2, c2, nom2, x=-4.4, y=1.0, bw=0.9, h=0.62, ecart=0.9, fs_nom=32, fs=28, bw2=None):
    """La barre de parts à deux ingrédients, l'une SOUS l'autre, calées à
    gauche sur x ; le nom de chaque ingrédient à gauche (décor, sans synchro).
    Renvoie (r1, r2, noms)."""
    r1 = Parts(n1, c1, bw, h, fs)
    r2 = Parts(n2, c2, bw if bw2 is None else bw2, h, fs)
    noms = VGroup()
    for i, (r, s, c) in enumerate(((r1, nom1, c1), (r2, nom2, c2))):
        r.move_to(P(0, y - i * ecart)).align_to(P(x, 0), LEFT)
        noms.add(sans(Text(s, font_size=fs_nom, color=c, weight=BOLD)).next_to(r, LEFT, buff=0.25))
    return r1, r2, noms


def salome(s=1.0):
    """Salomé, boulangère : tablier blanc fariné, toque blanche."""
    p = personne(peau="#f1c27d", tenue="#0f766e", cheveux="#7c2d12", longs=True)
    tab = p.corps.copy().set_fill(WHITE, 1).scale(0.8).shift(DOWN * 0.15)
    farine = VGroup(*[Circle(radius=rr, fill_color=FARINE, fill_opacity=0.9, stroke_width=0).move_to(tab.get_center() + d)
                      for rr, d in ((0.09, P(-0.2, 0.15)), (0.06, P(0.25, -0.3)), (0.07, P(0.0, -0.6)))])
    p.add(tab, farine, toque(p))
    return p.scale(s)


def sac_farine(s=1.0):
    """Un sac de farine en toile, un épi dessiné dessus (sans nombre)."""
    sac = Polygon(P(-0.6, -0.75), P(0.6, -0.75), P(0.68, 0.45), P(0.45, 0.7), P(-0.45, 0.7), P(-0.68, 0.45),
                  fill_color="#f5f5f4", fill_opacity=1, stroke_color="#a8a29e", stroke_width=3)
    lien = Line(P(-0.42, 0.52), P(0.42, 0.52), color="#a16207", stroke_width=5)
    tige = Line(P(0, -0.5), P(0, 0.2), color="#ca8a04", stroke_width=4)
    grains = VGroup(*[Ellipse(width=0.12, height=0.22, fill_color="#ca8a04", fill_opacity=1, stroke_width=0)
                      .move_to(P(0.09 * sx, -0.3 + 0.16 * k)).rotate(-0.5 * sx) for k in range(4) for sx in (-1, 1)])
    return VGroup(sac, lien, tige, grains).scale(s)


def broc(s=1.0):
    """Un broc d'eau (sans nombre) : corps transparent, eau bleue, anse."""
    corps = Polygon(P(-0.45, -0.7), P(0.45, -0.7), P(0.5, 0.55), P(-0.55, 0.62), fill_color=WHITE,
                    fill_opacity=0.12, stroke_color=WHITE, stroke_width=3)
    eau = Polygon(P(-0.43, -0.67), P(0.43, -0.67), P(0.47, 0.25), P(-0.49, 0.25), fill_color=EAU,
                  fill_opacity=0.85, stroke_width=0)
    bec = Polygon(P(-0.55, 0.62), P(-0.78, 0.72), P(-0.5, 0.42), fill_color=WHITE, fill_opacity=0.12,
                  stroke_color=WHITE, stroke_width=3)
    anse = Arc(radius=0.33, start_angle=-PI / 2, angle=PI, stroke_color=WHITE, stroke_width=5).move_to(P(0.68, 0.0))
    return VGroup(eau, corps, bec, anse).scale(s)


def pain(s=1.0):
    """Une baguette dorée et ses grignes."""
    corps = RoundedRectangle(width=2.4, height=0.42, corner_radius=0.21, fill_color=CROUTE, fill_opacity=1,
                             stroke_width=0)
    grignes = VGroup(*[Line(P(x - 0.12, -0.08), P(x + 0.12, 0.1), color=MIE, stroke_width=5)
                       for x in (-0.75, -0.25, 0.25, 0.75)])
    return VGroup(corps, grignes).rotate(0.15).scale(s)


def boule(s=1.0):
    """Une boule de pain de campagne, fendue en croix."""
    b = Ellipse(width=1.3, height=0.85, fill_color=CROUTE, fill_opacity=1, stroke_width=0)
    croix_ = VGroup(Line(P(-0.3, -0.1), P(0.3, 0.2), color=MIE, stroke_width=5),
                    Line(P(-0.3, 0.2), P(0.3, -0.1), color=MIE, stroke_width=5))
    return VGroup(b, croix_).scale(s)


def brioche(s=1.0):
    """Une brioche à tête : la base cannelée et la petite boule."""
    base = VGroup(*[Circle(radius=0.22, fill_color="#d97706", fill_opacity=1, stroke_width=0).move_to(P(x, -0.1))
                    for x in (-0.36, -0.12, 0.12, 0.36)])
    moule = Polygon(P(-0.55, -0.15), P(0.55, -0.15), P(0.4, -0.6), P(-0.4, -0.6), fill_color="#d97706",
                    fill_opacity=1, stroke_width=0)
    tete = Circle(radius=0.22, fill_color="#f59e0b", fill_opacity=1, stroke_width=0).move_to(P(0, 0.25))
    reflet = Circle(radius=0.06, fill_color="#fde68a", fill_opacity=1, stroke_width=0).move_to(P(-0.07, 0.32))
    return VGroup(moule, base, tete, reflet).scale(s)


class PropRatioQuotientsBase(PropTableauBase4e):
    nom_voix = "4e-prop-ratio-quotients"
    fichier_marques = "prop_ratio_quotients_marques.json"

    def montre(self, mot, *anims, rt=0.4):
        """Au mot de la voix (str ou (str, n)), joue les animations."""
        if mot:
            self.au_mot(*mot) if isinstance(mot, tuple) else self.au_mot(mot)
        self.play(*anims, run_time=rt)

    def titre_haut(self, s, mot, couleur=JAUNE_TITRE, fs=42, x=-0.4):
        self.au_mot(mot)
        tit = self.t(s, fs, couleur).move_to(P(x, 3.1))
        self.play(Write(tit), run_time=0.5)
        return tit

    def barrer_choix(self, i):
        """Un trait rouge sur le texte du choix i (un leurre cité par la voix)."""
        corps = self.cartes_q[i][1][1]
        return Line(corps.get_left() + LEFT * 0.08, corps.get_right() + RIGHT * 0.08, color=ROUGE_ERREUR,
                    stroke_width=6)

    def pain_farine(self, x=-4.4, y=1.0, bw=1.05, ecart=0.9, fs_nom=32, fs=26):
        return deux_rangees(5, FARINE, "Farine", 3, EAU, "Eau", x=x, y=y, bw=bw, ecart=ecart, fs_nom=fs_nom, fs=fs)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Ratio et quotients égaux", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Ratio")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        r1, r2, noms = self.pain_farine(x=-2.0, y=0.85, bw=0.8, ecart=0.8, fs_nom=30)
        self.play(LaggedStart(*[FadeIn(b, shift=RIGHT * 0.15) for b in [*r1.blocs, *r2.blocs]], lag_ratio=0.08),
                  FadeIn(noms), run_time=0.8)
        self.au_mot("Le pain")
        deco = VGroup(boule(1.0), pain(0.9)).arrange(DOWN, buff=0.35).move_to(P(-5.1, 0.45))
        sac = sac_farine(0.9).move_to(P(4.9, 0.45))
        self.play(FadeIn(deco, scale=0.7), FadeIn(sac, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("Salomé")
        nom = self.t("Le pain de Salomé", 34, AMBRE).next_to(VGroup(r1, r2), DOWN, buff=0.35)
        self.play(FadeIn(nom, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 01 : Salomé, boulangère : 5 : 3, 20 kg de farine ────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = salome(1.0).move_to(P(-5.4, -1.0))
        self.au_mot("Voici Salomé")
        nom = self.t("Salomé", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.3)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("boulangère")
        met = self.t("boulangère", 32, BLEU_CALCUL).next_to(pers, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        r1, r2, noms = self.pain_farine(x=-2.4, y=1.55)
        rat = self.ligne([("Farine : eau =", WHITE), ("5 :", AMBRE), ("3", AMBRE)], 42).move_to(P(0.3, 2.85))
        sans(rat[0])
        dit = self.ligne([("« 5 pour", AMBRE), ("3 »", AMBRE)], 32).next_to(VGroup(r1, r2), RIGHT, buff=0.45)
        self.montre("Sa pâte", FadeIn(boule(0.8).move_to(P(4.9, 2.85)), scale=0.7), rt=0.4)
        self.montre("le ratio farine", FadeIn(rat[0], shift=RIGHT * 0.2), rt=0.4)
        self.montre("farine pour", FadeIn(noms[0]), LaggedStart(*[FadeIn(b, shift=RIGHT * 0.15) for b in r1.blocs],
                                                                  lag_ratio=0.12), rt=0.5)
        self.montre("pour eau", FadeIn(noms[1]), LaggedStart(*[FadeIn(b, shift=RIGHT * 0.15) for b in r2.blocs],
                                                               lag_ratio=0.12), rt=0.4)
        self.montre("5 pour", FadeIn(rat[1], scale=1.3), FadeIn(dit[0], shift=LEFT * 0.15),
                    Indicate(r1.blocs, color=AMBRE, scale_factor=1.05), rt=0.45)
        self.montre("3. Ce", FadeIn(rat[2], scale=1.3), FadeIn(dit[1], shift=LEFT * 0.15),
                    Indicate(r2.blocs, color=AMBRE, scale_factor=1.05), rt=0.45)
        sac = sac_farine(0.85).move_to(P(-1.6, -1.55))
        kg = self.t("20 kg", 40, FARINE).next_to(sac, RIGHT, buff=0.3)
        self.montre("Ce matin", FadeIn(sac, shift=DOWN * 0.2), rt=0.4)
        self.montre("20 kilos", FadeIn(kg, scale=1.3), rt=0.4)
        self.insister(kg, 1.15, 0.2)
        br = broc(0.85).move_to(P(2.4, -1.55))
        q = self.t("Eau : ?", 40, ORANGE_RETENUE).next_to(br, RIGHT, buff=0.3)
        self.montre("Combien d'eau", FadeIn(br, shift=DOWN * 0.2), FadeIn(q, scale=1.3), rt=0.45)
        self.play(Circumscribe(q, color=AMBRE, buff=0.12), run_time=0.8)
        self.attendre_voix()

    # ── 02 : le ratio = deux quotients égaux (la valeur d'une part) ─────────
    def ecran_definition(self):
        self.ecran("02-definition")
        self.titre_haut("Ce que veut dire un ratio", "Dire que")
        r1, r2, noms = self.pain_farine(x=-3.6, y=2.0)
        self.montre("la farine et", FadeIn(noms[0]), FadeIn(r1.blocs, shift=RIGHT * 0.2), rt=0.4)
        self.montre("l'eau sont", FadeIn(noms[1]), FadeIn(r2.blocs, shift=RIGHT * 0.2), rt=0.4)
        rat = self.ligne([("5 :", AMBRE), ("3", AMBRE)], 48).next_to(VGroup(r1, r2), RIGHT, buff=0.6)
        self.montre("ratio 5 pour", FadeIn(rat[0], scale=1.3), rt=0.35)
        self.montre("3, c'est", FadeIn(rat[1], scale=1.3), rt=0.35)
        eg = self.ligne([("farine ÷", FARINE), ("5", WHITE), ("=", WHITE), ("eau ÷", EAU), ("3", WHITE)], 46)
        eg.move_to(P(-0.6, -0.15))
        c1, c2 = r1.cadres(), r2.cadres()
        self.montre("la farine divisée", FadeIn(eg[0], shift=RIGHT * 0.2), rt=0.35)
        self.montre("par 5", FadeIn(eg[1], scale=1.3), LaggedStart(*[Create(c) for c in c1], lag_ratio=0.15), rt=0.6)
        self.montre("égale l'eau", FadeIn(eg[2], scale=1.3), rt=0.3)
        self.montre("l'eau divisée", FadeIn(eg[3], shift=RIGHT * 0.2), rt=0.35)
        self.montre("par 3", FadeIn(eg[4], scale=1.3), LaggedStart(*[Create(c) for c in c2], lag_ratio=0.15), rt=0.5)
        self.play(FadeOut(c1), FadeOut(c2), run_time=0.3)
        self.montre("Ce quotient", Circumscribe(eg, color=AMBRE, buff=0.15), rt=0.8)
        v = self.tampon("= la valeur d'une part", VERT_OK, 38).move_to(P(-0.6, -1.5))
        self.au_mot("la valeur")
        self.play(FadeIn(v, scale=1.3), run_time=0.45)
        self.montre("une part", Circumscribe(r1.blocs[0], color=VERT_OK, buff=0.06),
                    Circumscribe(r2.blocs[0], color=VERT_OK, buff=0.06), rt=0.8)
        self.insister(v, 1.08, 0.25)
        self.attendre_voix()

    # ── 03 : le calcul : 20 ÷ 5 = 4 kg ; eau = 3 × 4 = 12 kg = 12 L ─────────
    def ecran_calcul(self):
        self.ecran("03-calcul")
        r1, r2, noms = self.pain_farine(x=-3.6, y=2.7, ecart=0.88)
        self.add(noms, r1, r2)  # la barre de l'écran 02, reprise
        t20 = self.t("20 kg", 36, FARINE).next_to(r1, RIGHT, buff=0.3)
        self.montre("20 kilos", FadeIn(t20, scale=1.3), rt=0.4)
        xl = -2.0
        l1 = self.lc([("20 ÷", WHITE), ("5 =", WHITE), ("4 kg", VERT_OK)], 0.8, fs=42, x=xl)
        self.jouer(l1, ["20 divisé", "par 5", "4. Une"], extra={1: [Indicate(r1.blocs, color=AMBRE, scale_factor=1.04)],
                                                                 2: [FadeIn(r1.textes("4 kg"), scale=1.3)]})
        part = self.tampon("une part = 4 kg", VERT_OK, 34).move_to(P(3.7, 0.8))
        self.montre("Une part vaut", FadeIn(part, scale=1.3), rt=0.45)
        self.insister(part, 1.08, 0.2)
        l2 = self.lc([("eau ÷", EAU), ("3 =", WHITE), ("4 kg", VERT_OK)], -0.25, fs=42, x=xl)
        e4 = r2.textes("4 kg")
        self.jouer(l2, ["l'eau divisée", "par 3", "4, elle"], extra={2: [FadeIn(e4, scale=1.3)]})
        self.montre("elle aussi", Indicate(e4, color=VERT_OK, scale_factor=1.2), rt=0.6)
        l3 = self.lc([("eau =", EAU), ("3 ×", WHITE), ("4 =", WHITE), ("12 kg", VERT_OK)], -1.3, fs=42, x=xl)
        t12 = self.t("12 kg", 36, EAU).next_to(r2, RIGHT, buff=0.3)
        self.jouer(l3, ["L'eau, c'est", "3 fois", "4, égale", "12 kilos"], extra={2: [Indicate(r2.blocs, color=AMBRE, scale_factor=1.04)],
                                                                             3: [FadeIn(t12, scale=1.3)]})
        self.insister(l3[3], 1.15, 0.2)
        l4 = self.lc([("12 kg d'eau =", WHITE), ("12 L", VERT_OK)], -2.4, fs=42, x=xl)
        br = broc(0.75).next_to(l4, RIGHT, buff=0.5)
        self.jouer(l4, [("12 kilos", 2), "12 litres"], extra={0: [FadeIn(br, shift=DOWN * 0.2)]})
        self.play(Circumscribe(l4[1], color=VERT_OK, buff=0.12), run_time=0.8)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (5 : 3 ; 35 kg de farine → ? kg d'eau) ──────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        r1, r2, noms = self.pain_farine(x=-4.75, y=1.5, ecart=0.88)
        sac = sac_farine(0.85).move_to(P(-3.2, -1.3))

        def avant(sc):
            sc.play(FadeIn(noms), FadeIn(r1.blocs, shift=RIGHT * 0.2), FadeIn(r2.blocs, shift=RIGHT * 0.2),
                    FadeIn(sac, shift=DOWN * 0.2), run_time=0.45)

        def apres(sc):
            sc.play(FadeOut(sac), run_time=0.3)
            l0 = sc.ligne_rep(0, ["35 ÷", "5 =", "7 kg."])
            l1 = sc.ligne_rep(1, ["Eau ÷", "3 =", "7 kg."])
            l2 = sc.ligne_rep(2, ["Eau = 3 ×", "7 =", "21 kg."])
            t21 = sc.t("21 kg", 36, EAU).next_to(r2, DOWN, buff=0.35).align_to(r2, LEFT)
            sc.montre("35 divisé", FadeIn(l0[0], shift=UP * 0.15), rt=0.3)
            sc.montre("par 5", FadeIn(l0[1], shift=UP * 0.15), Indicate(r1.blocs, color=AMBRE, scale_factor=1.04), rt=0.35)
            sc.montre("7. L'eau", FadeIn(l0[2], scale=1.3), FadeIn(r1.textes("7 kg"), scale=1.3), rt=0.35)
            sc.montre("L'eau divisée", FadeIn(l1[0], shift=UP * 0.15), rt=0.3)
            sc.montre("par 3", FadeIn(l1[1], shift=UP * 0.15), rt=0.3)
            sc.montre("7 : l'eau", FadeIn(l1[2], scale=1.3), FadeIn(r2.textes("7 kg"), scale=1.3), rt=0.35)
            sc.montre("3 fois", FadeIn(l2[0], shift=UP * 0.15), Indicate(r2.blocs, color=AMBRE, scale_factor=1.04), rt=0.35)
            sc.montre("7, égale", FadeIn(l2[1], shift=UP * 0.15), rt=0.3)
            sc.montre("21 kilos", FadeIn(l2[2], scale=1.3), FadeIn(t21, scale=1.3), rt=0.35)
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse",
                            ["Farine : eau = 5 : 3.", "35 kg de farine : eau ?"],
                            [self.t("33 kg", 34), self.t("21 kg", 34), self.t("≈ 58 kg", 34)], 1,
                            ["35 ÷ 5 = 7 kg.", "Eau ÷ 3 = 7 kg.", "Eau = 3 × 7 = 21 kg."], mot_q="Ratio farine",
                            avant_q=avant, autres_r=apres)

    # ── 05 : vérifier un mélange : 15 : 9 juste ; 15 : 10 trop d'eau ────────
    def ecran_verifier(self):
        self.ecran("05-verifier")
        self.titre_haut("Vérifier un mélange", "vérifier un")
        x0, bw, h, k = -6.1, 1.0, 0.85, 1.0 / 3   # une part de 3 kg = 1 de large
        xc = 2.2                                  # la colonne des calculs

        def panneau(y, eau_kg):
            f = Parts(5, FARINE, bw, h, 24).move_to(P(0, y)).align_to(P(x0, 0), LEFT)
            e = Parts(3, EAU, k * eau_kg / 3, h, 24).move_to(P(0, y - 0.9)).align_to(P(x0, 0), LEFT)
            return f, e

        f1, e1 = panneau(2.3, 9)
        tf1 = self.ligne([("15 kg", FARINE), ("de farine", FARINE)], 28, buff=0.14).next_to(f1, RIGHT, buff=0.25)
        te1 = self.ligne([("9 kg", EAU), ("d'eau", EAU)], 28, buff=0.14).next_to(e1, RIGHT, buff=0.25).align_to(tf1, LEFT)
        self.montre("15 kilos de", FadeIn(f1, shift=RIGHT * 0.2), FadeIn(tf1[0]), rt=0.4)
        self.montre("de farine pour", FadeIn(tf1[1]), rt=0.3)
        self.montre("9 kilos", FadeIn(e1, shift=RIGHT * 0.2), FadeIn(te1[0]), rt=0.4)
        self.montre("d'eau : 15", FadeIn(te1[1]), rt=0.3)
        c1 = self.ligne([("15 ÷", WHITE), ("5 =", WHITE), ("3 kg", VERT_OK)], 36).move_to(P(0, 2.3)).align_to(P(xc, 0), LEFT)
        c2 = self.ligne([("9 ÷", WHITE), ("3 =", WHITE), ("3 kg", VERT_OK)], 36).move_to(P(0, 1.4)).align_to(P(xc, 0), LEFT)
        c1.shift(RIGHT * max(0, tf1.get_right()[0] + 0.3 - xc))
        c2.align_to(c1, LEFT)
        self.jouer(c1, ["15 divisé", "par 5", "3. 9"], extra={2: [FadeIn(f1.textes("3\nkg"), scale=1.3)]})
        self.jouer(c2, ["9 divisé", "par 3", "3. Les"], extra={2: [FadeIn(e1.textes("3\nkg"), scale=1.3)]})
        ok = self.tampon("Égaux : ratio respecté !", VERT_OK, 32).move_to(P(-2.0, 0.55))
        self.montre("Les deux quotients", Circumscribe(VGroup(c1[2], c2[2]), color=VERT_OK, buff=0.1), rt=0.8)
        self.montre("sont égaux", Indicate(VGroup(c1[2], c2[2]), color=VERT_OK, scale_factor=1.15), rt=0.5)
        self.montre("respecté", FadeIn(ok, scale=1.2), rt=0.45)
        self.insister(ok, 1.06, 0.2)
        f2, e2 = panneau(-0.45, 10)
        tf2 = self.ligne([("15 kg", FARINE), ("de farine", FARINE)], 28, buff=0.14).next_to(f2, RIGHT, buff=0.25)
        te2 = self.ligne([("10 kg", EAU), ("d'eau", EAU)], 28, buff=0.14).next_to(e2, RIGHT, buff=0.25).align_to(tf2, LEFT)
        rappel = sans(f2.textes("3\nkg"))
        c3 = sans(self.ligne([("15 ÷ 5 =", GREY_B), ("3 kg", GREY_B)], 36)).move_to(P(0, -0.45)).align_to(c1, LEFT)
        self.montre(("15 kilos", 2), FadeIn(f2, shift=RIGHT * 0.2), FadeIn(tf2[0]), FadeIn(rappel), FadeIn(c3), rt=0.45)
        self.montre(("de farine pour", 2), FadeIn(tf2[1]), rt=0.3)
        self.montre("10 kilos", FadeIn(e2, shift=RIGHT * 0.2), FadeIn(te2[0]), rt=0.4)
        self.montre("d'eau : 10", FadeIn(te2[1]), rt=0.3)
        c4 = self.ligne([("10 ÷", WHITE), ("3 ≈", WHITE), ("3,33 kg", ROUGE_P)], 36).move_to(P(0, -1.35)).align_to(c1, LEFT)
        self.jouer(c4, ["10 divisé", "par 3, environ", "environ 3,33"],
                   extra={2: [FadeIn(e2.textes("3,33\nkg", couleur=NUIT), scale=1.3)]})
        bout = x0 + 3 * bw
        trop = Rectangle(width=e2.get_right()[0] - bout, height=h, fill_color=ROUGE_P, fill_opacity=0.55,
                         stroke_color=ROUGE_P, stroke_width=4).move_to(P((bout + e2.get_right()[0]) / 2, -1.35))
        tir = DashedLine(P(bout, -0.05), P(bout, -1.85), color=WHITE, stroke_width=3)
        non = self.tampon("Pas égaux : pâte trop molle !", ROUGE_ERREUR, 30).move_to(P(-2.0, -2.55))
        self.montre("Pas égaux", Create(tir), FadeIn(trop), FadeIn(non, scale=1.2), rt=0.5)
        self.montre("trop molle", Indicate(trop, color=ROUGE_P, scale_factor=1.15), rt=0.6)
        self.attendre_voix()

    # ── 06 : le piège : un ratio n'est pas un écart (18 kg barré) ───────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.titre_haut("Attention au piège !", "Attention", couleur=ROUGE_ERREUR, fs=44)
        phr = self.t("Un ratio n'est pas un écart.", 38, WHITE).move_to(P(-0.4, 2.3))
        self.montre("Un ratio n'est", FadeIn(phr, shift=UP * 0.15), rt=0.4)
        r1, r2, noms = self.pain_farine(x=-4.4, y=1.2, ecart=0.88)
        self.add(noms, r1, r2)
        ec = SurroundingRectangle(VGroup(*r1.blocs[3:]), color=ROUGE_P, buff=0.06, stroke_width=6)
        self.montre("un écart", Create(ec), rt=0.45)
        rat = self.ligne([("5 :", AMBRE), ("3", AMBRE)], 48).move_to(P(0, 0.75)).align_to(P(1.6, 0), LEFT)
        self.montre("5 pour 3", FadeIn(rat[0], scale=1.3), rt=0.3)
        self.montre("3, ce", FadeIn(rat[1], scale=1.3), rt=0.3)
        faux = self.ligne([("≠ « 2 kg", ROUGE_P), ("de plus »", ROUGE_P)], 36).next_to(rat, DOWN, buff=0.35, aligned_edge=LEFT)
        self.montre("2 kilos", FadeIn(faux[0], shift=LEFT * 0.15), rt=0.35)
        self.montre("de plus", FadeIn(faux[1], shift=LEFT * 0.15), Indicate(ec, color=ROUGE_P, scale_factor=1.05), rt=0.5)
        self.montre("d'eau »", Create(croix(faux, sw=6)), rt=0.4)
        lf = self.lc([("20 kg", FARINE), ("de farine :", FARINE)], -0.9, fs=40, x=-2.6)
        self.jouer(lf, ["20 kilos", "de farine, l"])
        lx = self.lc([("Eau :", EAU), ("20 − 2 =", ROUGE_P), ("18 kg", ROUGE_P)], -2.0, fs=40, x=-2.6)
        sans(lx[1])  # le faux raisonnement, avec des nombres déjà dits
        self.jouer(lx, ["l'eau n'est", None, "18 kilos"])
        self.play(Create(croix(VGroup(lx[1], lx[2]), sw=7)), run_time=0.4)
        bon = self.ligne([("Eau :", EAU), ("12 kg", VERT_OK)], 40).next_to(lx, RIGHT, buff=0.8)
        q1, q2 = sans(r1.textes("4 kg")), sans(r2.textes("4 kg"))
        self.montre("mais 12", FadeIn(bon[0], shift=RIGHT * 0.2), rt=0.3)
        self.montre("12.", FadeIn(bon[1], scale=1.3), FadeIn(q1), FadeIn(q2), FadeOut(ec), rt=0.4)
        self.insister(bon[1], 1.2, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (sel : levure = 2 : 1 ; quel mélange ?) ─────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        r1, r2, noms = deux_rangees(2, SEL, "Sel", 1, LEVURE, "Levure", x=-4.3, y=1.5, bw=1.3, ecart=0.88, fs=26)
        deco = boule(1.1).move_to(P(-3.0, -1.3))

        def avant(sc):
            sc.play(FadeIn(noms), FadeIn(r1.blocs, shift=RIGHT * 0.2), FadeIn(r2.blocs, shift=RIGHT * 0.2),
                    FadeIn(deco, scale=0.7), run_time=0.45)

        def apres(sc):
            sc.play(FadeOut(deco), run_time=0.3)
            l0 = sc.ligne_rep(0, ["30 ÷", "2 =", "15 g."])
            l1 = sc.ligne_rep(1, ["15 ÷", "1 =", "15 g."])
            l2 = sc.ligne_rep(2, ["Quotients égaux."])
            s15, v15 = r1.textes("15 g"), r2.textes("15 g")
            sc.montre("30 divisé", FadeIn(l0[0], shift=UP * 0.15), rt=0.3)
            sc.montre("par 2", FadeIn(l0[1], shift=UP * 0.15), Indicate(r1.blocs, color=AMBRE, scale_factor=1.04), rt=0.35)
            sc.montre("égale 15", FadeIn(l0[2], scale=1.3), FadeIn(s15, scale=1.3), rt=0.35)
            sc.montre("15 divisé", FadeIn(l1[0], shift=UP * 0.15), rt=0.3)
            sc.montre("par 1", FadeIn(l1[1], shift=UP * 0.15), Indicate(r2.blocs, color=AMBRE, scale_factor=1.04), rt=0.35)
            sc.montre(("égale 15", 2), FadeIn(l1[2], scale=1.3), FadeIn(v15, scale=1.3), rt=0.35)
            sc.montre("Les quotients", FadeIn(l2[0], shift=UP * 0.15), rt=0.35)
            sc.play(Circumscribe(VGroup(s15, v15), color=VERT_OK, buff=0.1), run_time=0.8)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["Sel : levure = 2 : 1.", "Lequel respecte ce ratio ?"],
                            [self.t("30 g : 15 g", 34), self.t("30 g : 29 g", 34), self.t("15 g : 30 g", 34)], 0,
                            ["30 ÷ 2 = 15 g.", "15 ÷ 1 = 15 g.", "Quotients égaux."], mot_q="Ratio sel",
                            avant_q=avant, autres_r=apres)

    # ── 08 : défi : les brioches (beurre : sucre = 3 : 2 ; 450 g de beurre) ─
    def barre_brioche(self):
        r1, r2, noms = deux_rangees(3, BEURRE, "Beurre", 2, SUCRE, "Sucre", x=-2.9, y=1.3, bw=1.3, ecart=0.88, fs=26)
        b450 = self.ligne([("Beurre :", BEURRE), ("450 g", BEURRE)], 34).next_to(r1, RIGHT, buff=0.4)
        sq = self.ligne([("Sucre :", ORANGE_RETENUE), ("? g", ORANGE_RETENUE)], 34).next_to(r2, RIGHT, buff=0.4).align_to(b450, LEFT)
        sans(b450[0]), sans(sq)
        trous = r2.textes("?", couleur=TROU_TXT)
        return r1, r2, noms, b450, sq, trous

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.titre_haut("À toi de jouer !", "À toi de jouer", fs=50)
        r1, r2, noms, b450, sq, trous = self.barre_brioche()
        bri = VGroup(brioche(1.0), brioche(0.8)).arrange(RIGHT, buff=0.3).move_to(P(-4.9, -1.0))
        self.montre("Pour des brioches", FadeIn(bri, shift=UP * 0.2), rt=0.45)
        rat = self.ligne([("Beurre : sucre =", WHITE), ("3 :", AMBRE), ("2", AMBRE)], 40).move_to(P(-0.4, 2.3))
        self.montre("le ratio beurre", FadeIn(rat[0], shift=RIGHT * 0.2), FadeIn(noms), rt=0.4)
        self.montre("3 pour", FadeIn(rat[1], scale=1.3), FadeIn(r1.blocs, shift=RIGHT * 0.2), rt=0.4)
        self.montre("2. Salomé", FadeIn(rat[2], scale=1.3), FadeIn(r2.blocs, shift=RIGHT * 0.2), rt=0.4)
        self.montre("450 grammes", FadeIn(b450, scale=1.2), rt=0.4)
        self.montre("Combien de sucre", FadeIn(sq, scale=1.2), FadeIn(trous, scale=1.3), rt=0.4)
        self.play(Circumscribe(sq, color=AMBRE, buff=0.12), run_time=0.8)
        self.pause_defi(y=-1.75)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        r1, r2, noms, b450, sq, trous = self.barre_brioche()
        rat = sans(self.ligne([("Beurre : sucre =", WHITE), ("3 :", AMBRE), ("2", AMBRE)], 40).move_to(P(-0.4, 2.3)))
        self.add(rat, noms, r1, r2, sans(b450), sans(sq), trous)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.2))
        self.play(Write(tit), run_time=0.5)
        xl = -1.2
        l1 = self.lc([("450 ÷", WHITE), ("3 =", WHITE), ("150 g", VERT_OK)], -0.35, fs=42, x=xl)
        self.jouer(l1, ["450 divisé", "par 3", "égale 150"],
                   extra={1: [Indicate(r1.blocs, color=AMBRE, scale_factor=1.04)], 2: [FadeIn(r1.textes("150 g"), scale=1.3)]})
        l2 = self.lc([("sucre ÷", SUCRE), ("2 =", WHITE), ("150 g", VERT_OK)], -1.35, fs=42, x=xl)
        self.jouer(l2, ["Le sucre divisé", "par 2", ("égale 150", 2)],
                   extra={2: [FadeOut(trous), FadeIn(r2.textes("150 g"), scale=1.3)]})
        l3 = self.lc([("sucre =", SUCRE), ("2 ×", WHITE), ("150 =", WHITE), ("300 g", VERT_OK)], -2.35, fs=42, x=xl)
        s300 = self.ligne([("Sucre :", VERT_OK), ("300 g", VERT_OK)], 34).move_to(sq).align_to(sq, LEFT)
        sans(s300[0])
        self.jouer(l3, ["le sucre, c'est", "2 fois", "150, égale", "300 grammes"],
                   extra={1: [Indicate(r2.blocs, color=AMBRE, scale_factor=1.04)], 3: [FadeOut(sq), FadeIn(s300, scale=1.2)]})
        self.insister(l3[3], 1.15, 0.2)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        r1, r2, noms = self.pain_farine(x=-4.0, y=0.45, ecart=0.88)
        fig = VGroup(noms, r1, r2, r1.textes("4 kg"), r2.textes("4 kg"))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("a : b = 5 : 3 quand", "a ÷ 5 = b ÷ 3."),
            ("Ce quotient est", "la valeur d'une part."),
            ("On la calcule avec", "le nombre connu,", "puis on trouve l'autre.")], fs=36)
        self.au_mot("a et b")
        self.montrer_ligne(lignes[0])
        self.au_mot("Ce quotient")
        self.montrer_ligne(lignes[1], Circumscribe(r1.blocs[0], color=VERT_OK, buff=0.05), Circumscribe(r2.blocs[0], color=VERT_OK, buff=0.05))
        self.au_mot("On la calcule")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_definition()
        self.ecran_calcul()
        self.ecran_question1()
        self.ecran_verifier()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PropRatioQuotients4e(PropRatioQuotientsBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
