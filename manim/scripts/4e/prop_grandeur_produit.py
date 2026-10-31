# prop_grandeur_produit.py
# EleveAI — Maths 4e — série « Proportionnalité », lot 4 (agrandissements et
# grandeurs), épisode 14 PROPRE À LA 4e : LA GRANDEUR PRODUIT (micro du coach :
# grandeur_produit, notion grandeur_composee), AVEC VOIX. Paysage 16:9,
# CEINTURE VERTE (la paysage complète du niveau). Short jumeau :
# prop_grandeur_produit_short.py (blanche).
# ⭐ Méthode travaillée : une grandeur produit vient d'une MULTIPLICATION : on
# multiplie les nombres ET les unités (2 kW × 5 h = 10 kWh ; m × m = m²) ; on
# n'additionne jamais deux grandeurs différentes ; une barre dans l'unité
# (km/h) = un quotient, pas de barre = un produit. Le prix : on ramène à 1
# (1 kWh → 0,20 €, tableau de proportionnalité, × 0,20). Pas de produit en
# croix (la voix ne l'utilise pas).
# ⭐ Le geste : l'énergie DESSINÉE comme une aire : un rectangle de 5 h de large
# et de 2 kW de haut, pavé de 10 carreaux de 1 kWh (comme m × m = m²) ; sous
# l'opération, la ligne des NOMBRES et la ligne des UNITÉS, alignées.
# ⭐ Leurres (consigne-videos-proportionnalite.md, et erreurs de la micro) :
# question 1 : 1,5 kW/h (diviser), 5 kWh (ajouter 3 + 2) ; écran 05 :
# « 3 kW + 2 h » et « kW/h » barrés ; question 2 : km/h et €/kg (quotients).
#
# Décor et métier : ÉLECTRICITÉ, Rayan, ÉLECTRICIEN, qui cherche pourquoi une
# facture est trop chère (radiateur de 2 kW, 5 h par jour). Les puissances et
# durées sont inventées (vraisemblables). Chiffre RÉEL : tarif réglementé EDF
# (tarif Bleu, option base) au 1er août 2025 ≈ 0,1952 €/kWh TTC, arrondi à
# 0,20 € dans la voix (« environ ») — source : EDF / Commission de régulation
# de l'énergie, grille tarifaire du 1/08/2025 (relevée le 31/10/2026).
# Centres d'intérêt : sciences, argent-budget.
#
# Écrans : 00 garde · 01 Rayan, le radiateur 2 kW, 5 h par jour · 02 l'énergie
# = puissance × durée : 2 kW × 5 h = 10 kWh (rectangle de 10 carreaux ; ligne
# des nombres et ligne des unités) · 03 la famille des grandeurs produits :
# l'aire, m × m = m² · 04 QUESTION 1 (four 3 kW, 2 h) · 05 le piège (+ et ÷
# barrés) · 06 la grandeur quotient : km/h, la barre · 07 QUESTION 2 (laquelle
# est un produit ?) · 08 la facture : 1 kWh ≈ 0,20 €, 10 × 0,20 = 2 € ·
# 09 défi (chauffe-eau 3 kW, 4 h) · 09b correction 12 kWh, 2,40 € ·
# 10 ce que tu as appris · 11 fin.
#
# Voix : manim/voix/4e-prop-grandeur-produit.json (validée par Frédéric le
# 31/10, débit −10), WAV dans public/sons/4e-prop-grandeur-produit/ ; marques
# mot à mot : manim/scripts/4e/prop_grandeur_produit_marques.json
# (scripts/marques_dump.ps1 puis scripts/cues2marques.py ; ajoutée à la main :
# le second « 2 euros » de 08-facture, jeté comme répétition).
# Outils : manim/scripts/6e/prop_commun.py + manim/canvas_proportion.py (non
# modifiés). Ajouté ICI : Rectangle d'énergie (Pave2D), radiateur(), horloge(),
# eclair(), four(), chauffe_eau(), facture(), voiture(), rayan(), barre().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/prop_grandeur_produit.py PropGrandeurProduit4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/4e/prop_grandeur_produit.py PropGrandeurProduit4e -o eleveai-maths-4e-prop-grandeur-produit --media_dir manim/media-prop-4e-14
# Sortie : manim/sorties/4e/maths/proportionnalite/14-grandeur-produit/eleveai-maths-4e-prop-grandeur-produit.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403

BLEU_N = "#38bdf8"     # les NOMBRES
AMBRE_U = "#fbbf24"    # les UNITÉS
VERT_E = "#16a34a"     # les carreaux d'énergie (1 kWh)
VERT_E2 = "#4ade80"
ENCRE = "#0f172a"
GRIS_M = "#cbd5e1"


def gras(s, fs, couleur):
    return Text(s, font_size=fs, color=couleur, weight=BOLD)


def sans(m):
    """Un décor ou un libellé redit partout : ni attente de synchro, ni audit."""
    for f in m.get_family():
        if isinstance(f, Text):
            f.sans_synchro = True
            f._pas_audit = True
    return m


def barre(m, couleur=ROUGE_ERREUR, sw=6):
    """Un trait qui BARRE une ligne fausse (elle reste lisible)."""
    return Line(m.get_left() + LEFT * 0.08, m.get_right() + RIGHT * 0.08, color=couleur, stroke_width=sw)


# ── les décors ──────────────────────────────────────────────────────────────
def radiateur(s=1.0):
    """Un radiateur électrique : 6 éléments, deux pieds, un voyant rouge."""
    elts = VGroup(*[RoundedRectangle(width=0.26, height=1.2, corner_radius=0.1, fill_color="#f1f5f9",
                                     fill_opacity=1, stroke_color="#94a3b8", stroke_width=2) for _ in range(6)])
    elts.arrange(RIGHT, buff=0.04)
    tube = Rectangle(width=elts.width + 0.1, height=0.1, fill_color="#94a3b8", fill_opacity=1,
                     stroke_width=0).next_to(elts, DOWN, buff=-0.2)
    pieds = VGroup(*[Rectangle(width=0.1, height=0.2, fill_color="#64748b", fill_opacity=1, stroke_width=0)
                     .next_to(elts, DOWN, buff=0).shift(RIGHT * x) for x in (-0.55, 0.55)])
    voyant = Circle(radius=0.06, fill_color="#ef4444", fill_opacity=1, stroke_width=0).move_to(
        elts[-1].get_top() + DOWN * 0.15)
    chaleur = VGroup(*[ArcBetweenPoints(elts.get_top() + UP * 0.1 + RIGHT * x, elts.get_top() + UP * 0.55 + RIGHT * x,
                                        angle=0.8, color="#fb923c", stroke_width=4) for x in (-0.45, 0, 0.45)])
    g = VGroup(chaleur, elts, tube, pieds, voyant)
    g.corps, g.chaleur = elts, chaleur
    return g.scale(s)


def horloge(s=1.0, aiguille=PI / 3):
    """Une horloge ronde : 12 traits, deux aiguilles."""
    c = Circle(radius=0.55, fill_color=WHITE, fill_opacity=1, stroke_color="#475569", stroke_width=5)
    traits = VGroup(*[Line(P(0.43 * np.cos(a), 0.43 * np.sin(a)), P(0.5 * np.cos(a), 0.5 * np.sin(a)),
                           color=ENCRE, stroke_width=3) for a in np.linspace(0, 2 * PI, 13)[:-1]])
    h = Line(ORIGIN, P(0, 0.28), color=ENCRE, stroke_width=6)
    m = Line(ORIGIN, P(0.38 * np.cos(aiguille), 0.38 * np.sin(aiguille)), color="#dc2626", stroke_width=4)
    g = VGroup(c, traits, h, m, Dot(ORIGIN, radius=0.05, color=ENCRE))
    g.grande = m
    return g.scale(s)


def eclair(s=1.0, couleur="#facc15"):
    e = Polygon(P(0.1, 0.6), P(-0.3, -0.05), P(-0.02, -0.05), P(-0.15, -0.6), P(0.3, 0.1), P(0.02, 0.1),
                fill_color=couleur, fill_opacity=1, stroke_color="#a16207", stroke_width=2)
    return e.scale(s)


def four(s=1.0):
    """Un four : caisse grise, vitre orange (ça chauffe), deux boutons."""
    caisse = RoundedRectangle(width=1.7, height=1.3, corner_radius=0.1, fill_color="#e2e8f0", fill_opacity=1,
                              stroke_color="#64748b", stroke_width=3)
    vitre = RoundedRectangle(width=1.2, height=0.75, corner_radius=0.08, fill_color="#fb923c", fill_opacity=1,
                             stroke_color=ENCRE, stroke_width=3).move_to(P(0, -0.15))
    boutons = VGroup(*[Circle(radius=0.07, fill_color=ENCRE, fill_opacity=1, stroke_width=0).move_to(P(x, 0.43))
                       for x in (-0.4, 0, 0.4)])
    poignee = Line(P(-0.45, 0.28), P(0.45, 0.28), color="#475569", stroke_width=6)
    return VGroup(caisse, vitre, boutons, poignee).scale(s)


def chauffe_eau(s=1.0):
    """Un chauffe-eau : cuve blanche arrondie, un cadran, deux tuyaux."""
    cuve = RoundedRectangle(width=1.1, height=2.0, corner_radius=0.45, fill_color="#f8fafc", fill_opacity=1,
                            stroke_color="#64748b", stroke_width=3)
    cadran = Circle(radius=0.17, fill_color="#bae6fd", fill_opacity=1, stroke_color=ENCRE, stroke_width=2).move_to(
        P(0, 0.35))
    aig = Line(P(0, 0.35), P(0.1, 0.45), color="#dc2626", stroke_width=3)
    tuyaux = VGroup(Line(P(-0.25, -1.0), P(-0.25, -1.3), color="#2563eb", stroke_width=7),
                    Line(P(0.25, -1.0), P(0.25, -1.3), color="#dc2626", stroke_width=7))
    return VGroup(tuyaux, cuve, cadran, aig).scale(s)


def facture(s=1.0):
    """Une facture : feuille blanche, en-tête bleu, lignes grises, « € » en bas."""
    f = Rectangle(width=1.5, height=2.0, fill_color=WHITE, fill_opacity=1, stroke_color="#94a3b8", stroke_width=2)
    tete = Rectangle(width=1.5, height=0.35, fill_color="#1d4ed8", fill_opacity=1, stroke_width=0).align_to(f, UP)
    lignes = VGroup(*[Line(P(-0.55, y), P(0.55 if k % 2 else 0.3, y), color="#94a3b8", stroke_width=4)
                      for k, y in enumerate((0.35, 0.1, -0.15, -0.4))])
    euro = Text("€", font_size=40, color="#dc2626", weight=BOLD).move_to(P(0.45, -0.72))
    euro.sans_synchro, euro._pas_audit = True, True
    return VGroup(f, tete, lignes, euro).scale(s)


def voiture(s=1.0):
    corps = RoundedRectangle(width=1.6, height=0.45, corner_radius=0.15, fill_color="#dc2626", fill_opacity=1,
                             stroke_width=0)
    toit = Polygon(P(-0.45, 0.2), P(-0.25, 0.55), P(0.35, 0.55), P(0.55, 0.2), fill_color="#dc2626",
                   fill_opacity=1, stroke_width=0)
    vitre = Polygon(P(-0.3, 0.24), P(-0.18, 0.47), P(0.3, 0.47), P(0.42, 0.24), fill_color="#bae6fd",
                    fill_opacity=1, stroke_width=0)
    roues = VGroup(*[Circle(radius=0.17, fill_color=ENCRE, fill_opacity=1, stroke_color="#94a3b8",
                            stroke_width=3).move_to(P(x, -0.25)) for x in (-0.48, 0.48)])
    return VGroup(toit, vitre, corps, roues).scale(s)


def rayan(s=1.0):
    """Rayan, électricien : tenue bleue, casque jaune, tournevis en main."""
    p = personne(peau="#a0522d", tenue="#1d4ed8", cheveux="#111827")
    casque = AnnularSector(inner_radius=0, outer_radius=0.5, angle=PI, start_angle=0, fill_color="#facc15",
                           fill_opacity=1, stroke_width=0).move_to(p.tete.get_center() + UP * 0.25)
    visiere = Rectangle(width=1.1, height=0.08, fill_color="#eab308", fill_opacity=1, stroke_width=0).move_to(
        p.tete.get_center() + UP * 0.05)
    manche = RoundedRectangle(width=0.14, height=0.38, corner_radius=0.05, fill_color="#ef4444", fill_opacity=1,
                              stroke_width=0).move_to(P(0.68, -1.0))
    tige = Line(P(0.68, -0.8), P(0.68, -0.45), color="#cbd5e1", stroke_width=5)
    g = VGroup(p, casque, visiere, tige, manche)
    g.corps = p.corps
    g.outil = VGroup(tige, manche)
    return g.scale(s)


class Energie(VGroup):
    """L'énergie DESSINÉE comme une aire : n_h colonnes (une par heure) de n_kw
    carreaux (un par kilowatt) ; chaque carreau = 1 kWh. Le COIN BAS GAUCHE en
    bg. .cadre (contour) · .colonnes[i] (les carreaux de l'heure i) ·
    lab_bas(s) sous le rectangle · lab_g(s) à gauche · remplir() : les
    carreaux entrent heure par heure."""

    def __init__(self, n_h, n_kw, u=0.7, bg=ORIGIN, couleur=VERT_E, **kw):
        super().__init__(**kw)
        self.u = u
        self.colonnes = VGroup()
        for i in range(n_h):
            col = VGroup(*[Square(u - 0.06, fill_color=couleur, fill_opacity=0.85, stroke_color=VERT_E2,
                                  stroke_width=2).move_to(bg + P((i + 0.5) * u, (j + 0.5) * u))
                           for j in range(n_kw)])
            self.colonnes.add(col)
        self.cadre = Rectangle(width=n_h * u, height=n_kw * u, stroke_color=WHITE, stroke_width=4).move_to(
            bg + P(n_h * u / 2, n_kw * u / 2))
        self.add(self.cadre)

    def lab_bas(self, s, couleur=BLEU_N, fs=30):
        return gras(s, fs, couleur).next_to(self.cadre, DOWN, buff=0.15)

    def lab_g(self, s, couleur=BLEU_N, fs=30):
        return gras(s, fs, couleur).next_to(self.cadre, LEFT, buff=0.15)

    def remplir(self, rt=1.2):
        return LaggedStart(*[FadeIn(c, scale=0.6) for c in self.colonnes], lag_ratio=0.35, run_time=rt)


class PropGrandeurProduitBase(PaysageProp):
    nom_voix = "4e-prop-grandeur-produit"
    fichier_marques = "prop_grandeur_produit_marques.json"

    def ligne_rep(self, i, morceaux, fs=None):
        """Celle de prop_tableau.py : la ligne de réponse garde la taille de la
        phrase qu'elle remplace, bornée à droite (BORD_X)."""
        lg = super().ligne_rep(i, morceaux, fs)
        ref = self.ph_q[i]
        lg.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
        g = lg.get_left()[0]
        if lg.get_right()[0] > self.BORD_X - 0.05:
            lg.scale_to_fit_width(self.BORD_X - 0.05 - g).align_to(P(g, 0), LEFT)
        return lg

    def lc(self, morceaux, y, fs=40, xl=1.3, droite=6.15):
        """Une ligne de la colonne de droite (non jouée), qui s'arrête à
        `droite` (place pour un cadre et un agrandissement d'insistance)."""
        lg = self.col(self.ligne(morceaux, fs), y, xl)
        if lg.get_right()[0] > droite:
            lg.scale_to_fit_width(droite - xl).align_to(P(xl, 0), LEFT)
        return lg

    def jouer(self, lg, mots, anims=None, run_time=0.35):
        """Chaque morceau de la ligne lg à SON mot (mots[i] : un extrait, ou
        (extrait, n) pour sa n-ième fois ; None = avec le précédent) ;
        anims[i] : des animations de la figure jouées avec lui."""
        anims = anims or {}
        for i, (m, mot) in enumerate(zip(lg, mots)):
            if mot:
                if isinstance(mot, tuple):
                    self.au_mot(*mot)
                else:
                    self.au_mot(mot)
            self.play(FadeIn(m, shift=RIGHT * 0.15), *anims.get(i, []), run_time=run_time)

    def montre(self, mot, *anims, n=1, rt=0.4):
        self.au_mot(mot, n)
        self.play(*anims, run_time=rt)

    def sous(self, lg, textes, couleur, dy=0.8, fs=40):
        """Une ligne ALIGNÉE sous lg : textes[i] centré sous lg[i] (None : rien)."""
        out = VGroup()
        for m, s in zip(lg, textes):
            if s is None:
                continue
            t = gras(s, fs, couleur).move_to(P(m.get_x(), lg.get_y() - dy))
            out.add(t)
        return out

    def titre_g(self, s, couleur=JAUNE_TITRE, fs=44, x=-3.2):
        return self.t(s, fs, couleur).move_to(P(x, 3.1))

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Les kilowattheures", self.identite, self.ceinture, y_ech=-2.45)
        rad = radiateur(0.95).move_to(P(-5.0, -0.95))
        hor = horloge(0.9).move_to(P(-2.9, -0.85))
        fois = gras("×", 60, AMBRE_U).move_to(P(-3.9, -0.85))
        self.au_mot("kilowattheures")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(rad, scale=0.8), run_time=0.8)
        q = VGroup(self.t("Pourquoi", 42), self.t("multiplie-t-on ?", 42, AMBRE))
        q.arrange(DOWN, buff=0.16).move_to(P(2.8, 0.2))
        self.au_mot("Pourquoi")
        self.play(FadeIn(q[0], shift=UP * 0.15), run_time=0.4)
        self.au_mot("multiplie")
        self.play(FadeIn(q[1], scale=1.15), FadeIn(fois, scale=1.5), FadeIn(hor, scale=0.8), run_time=0.5)
        self.insister(q[1], 1.12, 0.25)
        self.attendre_voix(marge=0.6)

    # ── 01 : Rayan, électricien ; le radiateur 2 kW, 5 h par jour ───────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = rayan(0.9).move_to(P(-5.5, -0.75))
        nom = self.t("Rayan", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.montre("Voici Rayan", FadeIn(pers, shift=UP * 0.3), FadeIn(nom), rt=0.6)
        met = self.t("électricien", 30, BLEU_CALCUL).next_to(pers, DOWN, buff=0.15)
        self.montre("électricien", FadeIn(met, shift=DOWN * 0.1), Wiggle(pers.outil), rt=0.6)
        fac = facture(0.85).move_to(P(-3.0, 1.55))
        chere = gras("Trop chère !", 30, ROUGE_ERREUR).next_to(fac, RIGHT, buff=0.2)
        self.montre("Une famille", FadeIn(fac, shift=DOWN * 0.2), rt=0.5)
        self.montre("trop chère", FadeIn(chere, scale=1.3), Indicate(fac, color=ROUGE_ERREUR), rt=0.5)
        rad = radiateur(1.0).move_to(P(-2.9, -1.55))
        L1 = self.lc([("Radiateur :", WHITE), ("2 kW", BLEU_N)], 1.6, fs=44)
        l2 = gras("2 kW", 30, BLEU_N).next_to(rad, UP, buff=0.05).shift(RIGHT * 0.9)
        self.jouer(L1, ["le radiateur", "2 kilowatts"], {0: [FadeIn(rad, shift=UP * 0.2)], 1: [FadeIn(l2, scale=1.3)]})
        hor = horloge(0.75).move_to(P(-0.75, -1.4))
        L2 = self.lc([("Il chauffe", WHITE), ("5 h", BLEU_N), ("par jour.", WHITE)], 0.65, fs=44)
        l5 = gras("5 h", 30, BLEU_N).next_to(hor, UP, buff=0.12)
        self.jouer(L2, ["Il chauffe", "5 heures", "par jour"],
                   {1: [FadeIn(hor, scale=0.7), FadeIn(l5, scale=1.3)]})
        self.play(Rotate(hor.grande, -2 * PI, about_point=hor[0].get_center()), run_time=0.7)
        L3 = self.lc([("Énergie :", WHITE), ("?", ORANGE_RETENUE)], -0.45, fs=46)
        sans(L3)
        self.montre("Quelle énergie", FadeIn(L3, shift=RIGHT * 0.2), Indicate(rad.chaleur, color=ORANGE_RETENUE))
        self.insister(L3[1], 1.4, 0.25)
        self.attendre_voix()

    # ── 02 : énergie = puissance × durée : 2 kW × 5 h = 10 kWh ──────────────
    def ecran_produit(self):
        self.ecran("02-produit")
        tit = self.titre_g("L'énergie", x=-3.4)
        rad = sans(radiateur(0.55)).move_to(P(-4.6, 1.55))
        hor = horloge(0.55).move_to(P(-2.2, 1.55))
        E = Energie(5, 2, u=0.8, bg=P(-5.3, -1.3))
        L0 = self.lc([("Énergie", WHITE), ("=", WHITE), ("puissance", BLEU_N), ("×", AMBRE_U), ("durée", BLEU_N)],
                     2.3, fs=38)
        self.jouer(L0, ["L'énergie", None, "puissance", "fois la", "durée"],
                   {0: [Write(tit), FadeIn(rad), FadeIn(hor)]})
        L1 = self.lc([("2 kW", WHITE), ("×", WHITE), ("5 h", WHITE), ("=", WHITE), ("10 kWh", VERT_OK)], 1.25,
                     fs=52)
        self.jouer(L1, ["2 kilowatts", "fois 5", "5 heures", "égale 10", "10 kilowattheures"],
                   {0: [Create(E.cadre), FadeIn(E.lab_g("2 kW"), scale=1.3), Indicate(rad.corps, color=BLEU_N)],
                    2: [FadeIn(E.lab_bas("5 h"), scale=1.3), Indicate(hor, color=BLEU_N)]})
        self.play(E.remplir(1.1))
        self.play(Circumscribe(E.cadre, color=VERT_OK, buff=0.06), run_time=0.6)
        N = sans(self.sous(L1, ["2", "×", "5", "=", "10"], BLEU_N, dy=0.95, fs=44))
        U = self.sous(L1, ["kW", "×", "h", "=", "kWh"], AMBRE_U, dy=1.9, fs=44)
        labN = sans(self.t("nombres", 28, BLEU_N)).align_to(P(0.85, 0), RIGHT).set_y(N.get_y())
        labU = sans(self.t("unités", 28, AMBRE_U)).align_to(P(0.85, 0), RIGHT).set_y(U.get_y())
        self.montre("les nombres", FadeIn(N, shift=DOWN * 0.2), FadeIn(labN, shift=RIGHT * 0.2), rt=0.45)
        self.montre("les unités", FadeIn(labU, shift=RIGHT * 0.2), rt=0.35)
        for m, mot in zip(U, ["kilowatt fois", "fois heure", "heure, égale", "égale kilowattheure",
                              ("kilowattheure", 2)]):
            if isinstance(mot, tuple):
                self.au_mot(*mot)
            else:
                self.au_mot(mot)
            self.play(FadeIn(m, scale=1.3), run_time=0.3)
        cad = SurroundingRectangle(VGroup(N, U), color=AMBRE_U, buff=0.2, corner_radius=0.12, stroke_width=4)
        self.play(Create(cad), run_time=0.4)
        self.insister(VGroup(cad, N, U), 1.05, 0.25)
        self.attendre_voix()

    # ── 03 : la famille des grandeurs produits : l'aire, m × m = m² ─────────
    def ecran_famille(self):
        self.ecran("03-famille")
        L1 = self.lc([("Une grandeur qui vient", WHITE)], 2.5, fs=40)
        L1b = self.lc([("d'une", WHITE), ("multiplication", AMBRE_U)], 1.85, fs=40)
        self.montre("Une grandeur", FadeIn(L1, shift=RIGHT * 0.2), rt=0.35)
        self.montre("d'une multiplication", FadeIn(L1b[0], shift=RIGHT * 0.2), rt=0.3)
        self.montre("multiplication", FadeIn(L1b[1], scale=1.2), rt=0.3)
        G = self.lc([("= une grandeur produit", VERT_OK)], 0.95, fs=46)
        cadG = SurroundingRectangle(G, color=VERT_OK, buff=0.16, corner_radius=0.12, stroke_width=4)
        self.montre("grandeur produit", FadeIn(G, scale=1.15), Create(cadG), rt=0.5)
        self.insister(VGroup(cadG, G), 1.06, 0.25)
        c = 3.0
        sol = VGroup(*[Square(c / 4, fill_color="#bbf7d0", fill_opacity=0.9, stroke_color="#15803d", stroke_width=2)
                       .move_to(P(-4.0 + (i - 1.5) * c / 4, -0.6 + (j - 1.5) * c / 4))
                       for i in range(4) for j in range(4)])
        bord = Square(c, stroke_color=WHITE, stroke_width=5).move_to(P(-4.0, -0.6))
        tA = self.t("L'aire", 44, JAUNE_TITRE).next_to(bord, UP, buff=0.35)
        self.montre("l'aire", FadeIn(sol, scale=0.85), Create(bord), FadeIn(tA, shift=DOWN * 0.15), rt=0.6)
        L3 = self.lc([("m", AMBRE_U), ("×", AMBRE_U), ("m", AMBRE_U), ("=", WHITE), ("m²", VERT_OK)], -0.2, fs=56,
                     xl=1.8)
        mb = gras("m", 34, AMBRE_U).next_to(bord, DOWN, buff=0.15)
        mg = gras("m", 34, AMBRE_U).next_to(bord, LEFT, buff=0.15)
        m2 = gras("m²", 46, ENCRE).move_to(bord)
        self.jouer(L3, ["Mètre fois", "fois mètre", "mètre, égale", "égale mètre", "carré"],
                   {0: [FadeIn(mb, scale=1.3)], 2: [FadeIn(mg, scale=1.3)], 4: [FadeIn(m2, scale=1.4)]})
        L4 = self.lc([("L'unité garde la trace", WHITE)], -1.2, fs=38)
        L4b = self.lc([("de la", WHITE), ("multiplication", AMBRE_U)], -1.8, fs=38)
        self.montre("L'unité garde", FadeIn(L4, shift=RIGHT * 0.2), rt=0.35)
        self.montre("de la multiplication", FadeIn(L4b, shift=RIGHT * 0.2), Circumscribe(L3[1], color=AMBRE_U),
                    rt=0.6)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (un four de 3 kW, 2 h : l'énergie ?) ────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        fo = four(1.15).move_to(P(-4.7, 1.4))
        hor = horloge(0.7).move_to(P(-2.4, 1.4))
        self.add(fo, hor)
        E = Energie(2, 3, u=0.62, bg=P(-4.3, -2.75))

        def apres(sc):
            l0 = sc.ligne_rep(0, ["3 kW ×", "2 h =", "6 kWh."])
            sc.au_mot("3 kilowatts")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), Create(E.cadre), FadeIn(E.lab_g("3 kW", fs=28), scale=1.3),
                    run_time=0.3)
            sc.au_mot("2 heures")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), FadeIn(E.lab_bas("2 h", fs=28), scale=1.3), run_time=0.3)
            sc.au_mot("6 kilowattheures")
            sc.play(FadeIn(l0[2], scale=1.3), E.remplir(), run_time=0.6)
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse",
                            ["Un four de 3 kW", "chauffe pendant 2 h.", "Quelle énergie consomme-t-il ?"],
                            [self.t("6 kWh", 34), self.t("1,5 kW/h", 34), self.t("5 kWh", 34)], 0,
                            ["3 kW × 2 h = 6 kWh."], mot_q="Un four", autres_r=apres)

    # ── 05 : le piège : ni + ni ÷ ; kWh = kW × h ────────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        tit = self.titre_g("Attention au piège !", ROUGE_ERREUR, x=-3.2)
        self.montre("Attention", Write(tit), rt=0.5)
        el = eclair(0.9).move_to(P(-5.3, 0.9))
        lkw = gras("kW", 40, BLEU_N).next_to(el, DOWN, buff=0.2)
        hor = horloge(0.8).move_to(P(-2.3, 0.9))
        lh = gras("h", 40, BLEU_N).next_to(hor, DOWN, buff=0.2)
        signe = gras("+", 80, ROUGE_ERREUR).move_to(P(-3.8, 0.9))
        L0 = self.lc([("On n'additionne pas", WHITE)], 2.3, fs=40)
        self.montre("On n'additionne", FadeIn(L0, shift=RIGHT * 0.2), FadeIn(signe, scale=1.4), rt=0.4)
        self.montre("des kilowatts", FadeIn(el, scale=0.7), FadeIn(lkw), rt=0.35)
        self.montre("des heures", FadeIn(hor, scale=0.7), FadeIn(lh), rt=0.35)
        L1 = self.lc([("3 kW", WHITE), ("+", ROUGE_ERREUR), ("2 h", WHITE)], 1.5, fs=46)
        self.jouer(L1, ["3 plus", None, "2 ne"])
        L1b = self.lc([("ne veut rien dire !", ROUGE_ERREUR)], 0.85, fs=36)
        x1 = croix(signe, sw=7)
        self.montre("ne veut", FadeIn(L1b, shift=RIGHT * 0.2), Create(barre(L1)), Create(x1), rt=0.45)
        L2 = self.lc([("On ne divise pas :", WHITE)], 0.0, fs=40)
        div = gras("÷", 80, ROUGE_ERREUR).move_to(signe)
        self.montre("on ne divise", FadeIn(L2, shift=RIGHT * 0.2), FadeOut(x1), Transform(signe, div), rt=0.45)
        L3 = self.lc([("kW/h :", ROUGE_ERREUR), ("pas une énergie", WHITE)], -0.75, fs=40)
        x2 = croix(signe, sw=7)
        self.jouer(L3, ["des kilowatts par", "ce n'est"], {1: [Create(barre(L3[0])), Create(x2)]})
        L4 = self.lc([("kWh", VERT_OK), ("=", WHITE), ("kW", VERT_OK), ("×", VERT_OK), ("h", VERT_OK)], -1.65, fs=48)
        fois = gras("×", 80, VERT_OK).move_to(signe)
        res = gras("= kWh", 46, VERT_OK).move_to(P(-3.8, -1.2))
        cad = SurroundingRectangle(L4, color=VERT_OK, buff=0.16, corner_radius=0.12, stroke_width=4)
        self.jouer(L4, ["Le kilowattheure", "c'est kilowatt", "kilowatt fois", "fois heure", "heure."],
                   {3: [FadeOut(x2), Transform(signe, fois)]})
        self.play(Create(cad), FadeIn(res, scale=1.3), run_time=0.45)
        self.insister(VGroup(cad, L4), 1.06, 0.25)
        self.attendre_voix()

    # ── 06 : la grandeur quotient : km ÷ h = km/h, une barre ────────────────
    def ecran_quotient(self):
        self.ecran("06-quotient")
        L0 = self.lc([("L'autre famille :", WHITE)], 2.55, fs=40)
        self.jouer(L0, ["L'autre famille"])
        G = self.lc([("la grandeur quotient", BLEU_N)], 1.9, fs=44)
        cadG = SurroundingRectangle(G, color=BLEU_N, buff=0.14, corner_radius=0.12, stroke_width=4)
        self.montre("grandeur quotient", FadeIn(G, scale=1.15), Create(cadG), rt=0.45)
        L1 = self.lc([("Elle vient d'une", WHITE), ("division", BLEU_N)], 1.2, fs=40)
        self.jouer(L1, ["Elle vient", "division"])
        route = Line(P(-6.2, 0.2), P(-1.4, 0.2), color="#94a3b8", stroke_width=8)
        tirets = DashedLine(P(-6.2, 0.2), P(-1.4, 0.2), color=WHITE, stroke_width=3, dash_length=0.2)
        car = voiture(0.9).move_to(P(-5.4, 0.62))
        lkm = gras("km", 40, BLEU_N).move_to(P(-3.8, -0.3))
        hor = horloge(0.7).move_to(P(-3.8, -1.7))
        lh = gras("h", 40, BLEU_N).next_to(hor, RIGHT, buff=0.2)
        self.montre("La vitesse", FadeIn(route), FadeIn(tirets), FadeIn(car, shift=RIGHT * 0.3), rt=0.4)
        self.play(car.animate.shift(RIGHT * 3.0), run_time=0.7)
        L2 = self.lc([("km", BLEU_N), ("÷", WHITE), ("h", BLEU_N), ("=", WHITE), ("km/h", VERT_OK)], 0.35, fs=52,
                     xl=1.8)
        self.jouer(L2, ["des kilomètres", "divisés", "des heures", "en kilomètres", "kilomètres par"],
                   {0: [FadeIn(lkm, scale=1.3)], 2: [FadeIn(hor, scale=0.7), FadeIn(lh)]})
        bar = L2[4][2]
        L3 = self.lc([("Une barre", AMBRE_U), ("→ quotient", BLEU_N)], -0.6, fs=42)
        self.montre("Une barre", FadeIn(L3[0], shift=RIGHT * 0.2), bar.animate.set_color(AMBRE_U).scale(1.3), rt=0.4)
        self.play(Circumscribe(bar, color=AMBRE_U, buff=0.06), run_time=0.6)
        self.montre("c'est un quotient", FadeIn(L3[1], shift=RIGHT * 0.2), rt=0.35)
        L4 = self.lc([("Pas de barre", AMBRE_U), ("→ produit", VERT_OK)], -1.4, fs=42)
        ex = sans(self.lc([("kWh", VERT_OK), ("m²", VERT_OK)], -2.05, fs=40, xl=2.2))
        self.montre("Pas de barre", FadeIn(L4[0], shift=RIGHT * 0.2), rt=0.35)
        self.montre("c'est un produit", FadeIn(L4[1], shift=RIGHT * 0.2), FadeIn(ex, shift=UP * 0.15), rt=0.4)
        self.insister(ex, 1.12, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (laquelle est une grandeur produit ?) ───────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        tuile = VGroup(*[Square(0.45, fill_color="#bbf7d0", fill_opacity=0.9, stroke_color="#15803d",
                                stroke_width=2).move_to(P(-5.4 + i * 0.45, 1.0 + j * 0.45))
                         for i in range(3) for j in range(3)])
        car = voiture(0.85).move_to(P(-2.9, 1.3))
        self.add(tuile, car)
        R = Rectangle(width=3.0, height=1.7, fill_color="#bbf7d0", fill_opacity=0.9, stroke_color=WHITE,
                      stroke_width=5).move_to(P(-4.5, -1.55))

        def apres(sc):
            lr0 = sc.ligne_rep(0, ["Aire :"])
            lr1 = sc.ligne_rep(1, ["longueur ×", "largeur,"])
            lr2 = sc.ligne_rep(2, ["un produit."])
            lo = gras("longueur", 30, AMBRE_U).next_to(R, DOWN, buff=0.15)
            la = gras("largeur", 30, AMBRE_U).next_to(R, RIGHT, buff=0.15)
            sc.au_mot("Une aire")
            sc.play(FadeIn(lr0[0], shift=UP * 0.15), TransformFromCopy(tuile, R), run_time=0.4)
            sc.au_mot("longueur")
            sc.play(FadeIn(lr1[0], shift=UP * 0.15), FadeIn(lo, scale=1.3), run_time=0.3)
            sc.au_mot("largeur")
            sc.play(FadeIn(lr1[1], shift=UP * 0.15), FadeIn(la, scale=1.3), run_time=0.3)
            sc.au_mot("un produit")
            sc.play(FadeIn(lr2[0], scale=1.2), Circumscribe(R, color=VERT_OK, buff=0.06), run_time=0.5)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["Laquelle est", "une grandeur produit ?"],
                            [self.t("une aire, en m²", 31), self.t("une vitesse, en km/h", 31),
                             self.t("un prix, en €/kg", 31)], 0,
                            ["Aire :", "longueur × largeur,", "un produit."], mot_q="Laquelle", autres_r=apres)

    # ── 08 : la facture : 1 kWh ≈ 0,20 € ; 10 × 0,20 = 2 € par jour ─────────
    def ecran_facture(self):
        self.ecran("08-facture")
        fac = facture(0.9).move_to(P(-5.5, 2.15))
        rad = radiateur(0.7).move_to(P(-3.2, 2.0))
        self.montre("la facture", FadeIn(fac, shift=DOWN * 0.2), FadeIn(rad, shift=DOWN * 0.2), rt=0.45)
        tb = TableauProp(["Énergie (kWh)", "Prix (€)"], [[1, 10], ["0,20", 2]], largeur_case=1.2,
                         largeur_libelle=2.6, hauteur=0.85, fs=32, montrer=False, centre=P(-3.95, -0.55))
        L0 = self.lc([("En France,", WHITE), ("tarif EDF", JAUNE_TITRE)], 2.5, fs=38, xl=1.5)
        self.jouer(L0, ["En France", "tarif"])
        L0b = self.lc([("du 1er", WHITE), ("août 2025", WHITE)], 1.85, fs=38, xl=1.5)
        self.jouer(L0b, ["1er", "août"])
        L1 = self.lc([("1 kWh", BLEU_N), ("≈", WHITE), ("0,20 €", VERT_OK)], 1.0, fs=48, xl=1.5)
        self.jouer(L1, ["1 kilowattheure", "environ", "0,20"],
                   {0: [FadeIn(tb.fond), FadeIn(tb.valeur(0, 0), scale=1.3)], 2: [FadeIn(tb.valeur(1, 0), scale=1.3)]})
        self.montre("10 kilowattheures", FadeIn(tb.valeur(0, 1), scale=1.3), FadeIn(tb.trou(1, 1)), rt=0.4)
        fl = tb.fleche_lat("× 0,20", fs=34)
        L2 = self.lc([("10 ×", WHITE), ("0,20", WHITE), ("=", WHITE), ("2 €", VERT_OK)], -0.1, fs=48, xl=1.5)
        self.jouer(L2, ["10 fois", ("0,20", 2), "égale", "2 euros"],
                   {1: [Create(fl.fleche), FadeIn(fl.etiquette, scale=1.3)], 3: [tb.remplir(1, 1, 2)]})
        cad = SurroundingRectangle(L2, color=VERT_OK, buff=0.16, corner_radius=0.12, stroke_width=4)
        self.play(Create(cad), tb.allumer(1, 1), run_time=0.35)
        L3 = self.lc([("2 €", ORANGE_RETENUE), ("par jour,", WHITE)], -1.05, fs=44, xl=1.5)
        self.jouer(L3, [("2 euros", 2), "par jour"])
        L3b = self.lc([("pour un seul radiateur !", WHITE)], -1.62, fs=38, xl=1.5)
        self.montre("pour un seul", FadeIn(L3b, shift=RIGHT * 0.2), Indicate(rad, color=ORANGE_RETENUE), rt=0.5)
        self.insister(L3[0], 1.3, 0.25)
        self.attendre_voix()

    # ── 09 : défi : chauffe-eau 3 kW pendant 4 h ────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        tit = self.titre_g("À toi de jouer !", fs=50, x=-2.6)
        self.montre("À toi de jouer", Write(tit), rt=0.6)
        ce = chauffe_eau(1.25).move_to(P(-4.6, -0.5))
        hor = horloge(0.75).move_to(P(-2.3, -0.2))
        L0 = self.lc([("Chauffe-eau :", WHITE), ("3 kW", BLEU_N)], 2.2, fs=44)
        l3 = gras("3 kW", 32, BLEU_N).next_to(ce, UP, buff=0.15)
        self.jouer(L0, ["Un chauffe-eau", "3 kilowatts"], {0: [FadeIn(ce, shift=UP * 0.3)], 1: [FadeIn(l3, scale=1.3)]})
        L1 = self.lc([("pendant", WHITE), ("4 h", BLEU_N)], 1.4, fs=44)
        l4 = gras("4 h", 32, BLEU_N).next_to(hor, UP, buff=0.12)
        self.jouer(L1, ["pendant", "4 heures"], {1: [FadeIn(hor, scale=0.7), FadeIn(l4, scale=1.3)]})
        L2 = self.lc([("Énergie :", WHITE), ("? kWh", ORANGE_RETENUE)], 0.5, fs=44)
        sans(L2[1])
        self.montre("Quelle énergie", FadeIn(L2, shift=RIGHT * 0.2), rt=0.4)
        L3 = self.lc([("Prix :", WHITE), ("? €", ORANGE_RETENUE)], -0.3, fs=44)
        sans(L3[1])
        self.montre("Et combien", FadeIn(L3, shift=RIGHT * 0.2), rt=0.4)
        L4 = self.lc([("à", WHITE), ("0,20 €", BLEU_N), ("le kWh", WHITE)], -1.05, fs=38)
        self.jouer(L4, ["à 0,20", "0,20", "le kilowattheure"])
        self.play(Indicate(VGroup(L2[1], L3[1]), color=ORANGE_RETENUE, scale_factor=1.15), run_time=0.6)
        self.pause_defi(y=-1.9)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.titre_g("Correction", fs=50, x=-2.6)
        self.play(Write(tit), run_time=0.5)
        E = Energie(4, 3, u=0.7, bg=P(-5.3, -2.3))
        L1 = self.lc([("3 kW", WHITE), ("×", WHITE), ("4 h", WHITE), ("=", WHITE), ("12 kWh", VERT_OK)], 2.1, fs=48)
        self.jouer(L1, ["3 kilowatts", "fois 4", "4 heures", "égale 12", "12 kilowattheures"],
                   {0: [Create(E.cadre), FadeIn(E.lab_g("3 kW"), scale=1.3)],
                    2: [FadeIn(E.lab_bas("4 h"), scale=1.3)], 4: [E.remplir()]})
        L2 = self.lc([("12 ×", WHITE), ("0,20", WHITE), ("=", WHITE), ("2,40 €", VERT_OK)], 0.8, fs=48)
        self.jouer(L2, ["12 fois", "0,20", ("égale", 2), "2,40"])
        cad = VGroup(*[SurroundingRectangle(m, color=VERT_OK, buff=0.1, corner_radius=0.1, stroke_width=4)
                       for m in (L1[4], L2[3])])
        self.play(Create(cad), run_time=0.4)
        self.insister(VGroup(cad[1], L2[3]), 1.1, 0.25)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        E = Energie(5, 2, u=0.55, bg=P(-5.6, -1.6))
        for c in E.colonnes:
            E.add(c)
        fig = sans(VGroup(E, E.lab_g("2 kW", fs=26), E.lab_bas("5 h", fs=26),
                          gras("10 kWh", 30, VERT_OK).next_to(E.cadre, UP, buff=0.15)))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Une grandeur produit vient", "d'une multiplication."),
            ("On multiplie nombres et unités :", "kW × h = kWh", "m × m = m²"),
            ("On n'additionne jamais", "deux grandeurs différentes.")], fs=34)
        self.au_mot("Une grandeur")
        self.montrer_ligne(lignes[0])
        lg = lignes[1]
        self.montre("On multiplie", Create(lg[0]), FadeIn(lg[1][0], shift=RIGHT * 0.2), rt=0.45)
        self.montre("kilowatt fois", FadeIn(lg[1][1], shift=RIGHT * 0.2), rt=0.35)
        self.montre("mètre fois", FadeIn(lg[1][2], shift=RIGHT * 0.2), rt=0.35)
        self.au_mot("Et on n'additionne")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_produit()
        self.ecran_famille()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_quotient()
        self.ecran_question2()
        self.ecran_facture()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class PropGrandeurProduit4e(PropGrandeurProduitBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
