# prop_grandeur_quotient.py
# EleveAI — Maths 4e — série « Proportionnalité », lot 4 (agrandissements et
# grandeurs), épisode 15 PROPRE À LA 4e : LES GRANDEURS QUOTIENTS (micro du
# coach : grandeur_quotient, notion grandeur_composee), AVEC VOIX. Paysage
# 16:9, CEINTURE VERTE (la paysage complète du niveau). Short jumeau :
# prop_grandeur_quotient_short.py (blanche).
# ⭐ Méthode travaillée : une grandeur quotient vient d'une DIVISION, dans
# l'ordre de l'unité (km/h : les km ÷ les h) ; la barre se lit « par » =
# « pour 1 » (tableau de proportionnalité ramené à 1 : 600 km → 300 km,
# 2 h → 1 h). Pas de produit en croix (la voix ne l'utilise pas) ; « ÷ » écrit.
# ⭐ Le geste : l'opération sur les NOMBRES et, alignée dessous, sur les
# UNITÉS (600 ÷ 2 = 300 ; km ÷ h = km/h), la barre de l'unité colorée.
# ⭐ Leurres (consigne-videos-proportionnalite.md) : erreur 3 « inverser »
# (question 1 : 150 h/km ; question 2 : 0,40 €/kg = 4 ÷ 10 ; écran 05 : le
# stagiaire divise les heures par les km) ; multiplier au lieu de diviser
# (1 350 km/h = 450 × 3, 40 €/kg = 4 × 10).
#
# Décor et métier : TRANSPORTS, Manon, CONDUCTRICE DE TGV (600 km en 2 h,
# inventé) ; puis le marché (prix au kilo, inventé) ; défi : une cycliste.
# Fait réel : un TGV roule jusqu'à 320 km/h sur certaines LGV (SNCF Voyageurs,
# vitesse commerciale maximale sur LGV Est et Sud-Europe-Atlantique ; relevé
# du brief du lot 4, 31/10/2026).
# Centres d'intérêt : transports, argent-budget.
#
# Écrans : 00 garde · 01 Manon, 600 km en 2 h · 02 vitesse = distance ÷ durée
# (nombres ET unités alignés) · 03 300 km/h = 300 km en 1 h (tableau ramené à
# 1), moyenne, 320 km/h · 04 QUESTION 1 (450 km en 3 h) · 05 le piège h/km ·
# 06 prix au kilo 6 € ÷ 3 kg = 2 €/kg · 07 QUESTION 2 (10 € pour 4 kg) ·
# 08 défi cycliste 160 km en 4 h · 08b correction 40 km/h · 09 ce que tu as
# appris · 10 fin.
#
# Voix : manim/voix/4e-prop-grandeur-quotient.json (validée par Frédéric le
# 31/10, débit −10), WAV dans public/sons/4e-prop-grandeur-quotient/ ;
# marques mot à mot : manim/scripts/4e/prop_grandeur_quotient_marques.json
# (scripts/marques_dump.ps1 puis scripts/cues2marques.py).
# Outils : manim/scripts/6e/prop_commun.py + manim/canvas_proportion.py (non
# modifiés). Ajouté ICI : OpUnites (l'opération nombres / unités alignées),
# unite_kmh() (« km/h » avec la barre à part), tgv(), manon(), voie(),
# cycliste(), cageot(), compteur().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/prop_grandeur_quotient.py PropGrandeurQuotient4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/4e/prop_grandeur_quotient.py PropGrandeurQuotient4e -o eleveai-maths-4e-prop-grandeur-quotient --media_dir manim/media-prop-4e-15
# Sortie : manim/sorties/4e/maths/proportionnalite/15-grandeur-quotient/eleveai-maths-4e-prop-grandeur-quotient.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403

AMBRE_F = "#f59e0b"    # la barre de l'unité (« par »)
UNITE_C = "#7dd3fc"    # les unités, sous les nombres
ENCRE = "#0f172a"
ARDOISE = "#94a3b8"


def gras(s, fs, couleur):
    return Text(s, font_size=fs, color=couleur, weight=BOLD)


def sans(m):
    """Un décor ou un libellé redit partout : ni attente de synchro, ni audit."""
    for f in m.get_family():
        if isinstance(f, Text):
            f.sans_synchro = True
            f._pas_audit = True
    return m


def unite(s, fs=34, couleur=UNITE_C):
    """Une unité ; « km/h », « €/kg » : la BARRE est un Text à part (.barre),
    colorée en ambre, qu'on fait grossir quand la voix dit « par »."""
    if "/" not in s:
        g = VGroup(Text(s, font_size=fs, color=couleur))
        g.barre = None
        return g
    a, b = s.split("/")
    g = VGroup(Text(a, font_size=fs, color=couleur), Text("/", font_size=fs * 1.15, color=AMBRE_F, weight=BOLD),
               Text(b, font_size=fs, color=couleur)).arrange(RIGHT, buff=0.06)
    g.barre = g[1]
    return g


class OpUnites(VGroup):
    """L'opération sur les nombres (en haut) et, alignée dessous, sur les
    unités : items = [("600", "km"), "÷", ("2", "h"), "=", ("300", "km/h")].
    .cols[i] : VGroup(nombre, unité) ou VGroup(opérateur) ; .unites[i]."""

    def __init__(self, items, fs=46, fs_u=34, couleur=WHITE, res=VERT_OK, buff=0.32, u_res=VERT_OK, **kw):
        super().__init__(**kw)
        self.cols, self.unites = [], []
        dernier = len(items) - 1
        for i, it in enumerate(items):
            if isinstance(it, tuple):
                n = Text(it[0], font_size=fs, color=res if i == dernier else couleur, weight=BOLD)
                u = unite(it[1], fs_u, u_res if i == dernier else UNITE_C)
                u.next_to(n, DOWN, buff=0.16)
                c = VGroup(n, u)
                self.unites.append(u)
            else:
                c = VGroup(Text(it, font_size=fs, color=couleur))
                self.unites.append(None)
            self.cols.append(c)
            self.add(c)
        self.arrange(RIGHT, buff=buff, aligned_edge=UP)
        for c in self.cols:  # les opérateurs sur la ligne des NOMBRES
            if len(c) == 1:
                ref = next(x for x in self.cols if len(x) == 2)
                c.set_y(ref[0].get_y())
        self.resultat = self.cols[-1]


def tgv(s=1.0):
    """Un TGV vu de profil, nez à droite : caisse blanche, bande bleue, vitres."""
    caisse = Polygon(P(-1.5, -0.3), P(0.9, -0.3), P(1.55, -0.18), P(1.5, -0.05), P(0.95, 0.3), P(-1.5, 0.3),
                     fill_color="#f8fafc", fill_opacity=1, stroke_color="#cbd5e1", stroke_width=2)
    bande = Polygon(P(-1.5, -0.12), P(1.25, -0.12), P(1.45, -0.2), P(-1.5, -0.2), fill_color="#1d4ed8",
                    fill_opacity=1, stroke_width=0)
    vitres = VGroup(*[RoundedRectangle(width=0.28, height=0.16, corner_radius=0.04, fill_color="#334155",
                                       fill_opacity=1, stroke_width=0).move_to(P(-1.2 + 0.4 * k, 0.1))
                      for k in range(5)])
    pare = Polygon(P(0.95, 0.27), P(1.25, 0.08), P(1.0, 0.08), fill_color="#0f172a", fill_opacity=1, stroke_width=0)
    roues = VGroup(*[Circle(radius=0.09, fill_color="#111827", fill_opacity=1, stroke_color="#64748b",
                            stroke_width=2).move_to(P(x, -0.36)) for x in (-1.25, -0.95, 0.4, 0.7)])
    return VGroup(roues, caisse, bande, vitres, pare).scale(s)


def voie(x0, x1, y, couleur="#94a3b8"):
    """La voie ferrée : deux rails et des traverses."""
    rails = VGroup(Line(P(x0, y), P(x1, y)), Line(P(x0, y - 0.1), P(x1, y - 0.1))).set_stroke(couleur, 3)
    trav = VGroup(*[Line(P(x, y + 0.04), P(x, y - 0.14), color="#78716c", stroke_width=4)
                    for x in np.arange(x0 + 0.1, x1, 0.3)])
    return VGroup(trav, rails)


def casquette(p, couleur="#1e3a8a"):
    c = p.tete.get_center()
    r = p.tete.width / 2
    haut = AnnularSector(inner_radius=0, outer_radius=r * 1.08, angle=PI, start_angle=0, fill_color=couleur,
                         fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.62)
    visiere = RoundedRectangle(width=r * 1.3, height=r * 0.2, corner_radius=0.03, fill_color=couleur,
                               fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.32 + RIGHT * r * 0.75)
    return VGroup(haut, visiere)


def manon(s=1.0):
    """Manon, conductrice de TGV : uniforme bleu marine, casquette."""
    p = personne(peau="#e0ac69", tenue="#1e3a8a", cheveux="#78350f", longs=True)
    g = VGroup(p, casquette(p))
    g.corps = p.corps
    return g.scale(s)


def cycliste(s=1.0):
    """Une cycliste sur son vélo (vue de profil, vers la droite)."""
    roues = VGroup(*[Circle(radius=0.42, stroke_color="#e5e7eb", stroke_width=5).move_to(P(x, -0.45))
                     for x in (-0.65, 0.65)])
    cadre = VMobject(stroke_color="#ef4444", stroke_width=6).set_points_as_corners(
        [P(-0.65, -0.45), P(-0.1, -0.45), P(0.35, 0.15), P(-0.25, 0.15), P(-0.65, -0.45)])
    fourche = Line(P(0.35, 0.15), P(0.65, -0.45), color="#ef4444", stroke_width=6)
    guidon = Line(P(0.3, 0.15), P(0.45, 0.35), color="#e5e7eb", stroke_width=5)
    corps = Line(P(-0.3, 0.25), P(0.15, 0.85), color="#a855f7", stroke_width=12)
    bras = Line(P(0.1, 0.75), P(0.45, 0.35), color="#c68642", stroke_width=7)
    jambe = VMobject(stroke_color="#1f2937", stroke_width=9).set_points_as_corners(
        [P(-0.3, 0.25), P(0.05, -0.05), P(-0.1, -0.45)])
    tete = Circle(radius=0.17, fill_color="#c68642", fill_opacity=1, stroke_width=0).move_to(P(0.25, 1.05))
    casque = AnnularSector(inner_radius=0, outer_radius=0.2, angle=PI, start_angle=0, fill_color="#22c55e",
                           fill_opacity=1, stroke_width=0).move_to(P(0.25, 1.15))
    return VGroup(roues, cadre, fourche, guidon, jambe, corps, bras, tete, casque).scale(s)


def cageot(fruit="#ef4444", n=7, s=1.0, feuille="#16a34a"):
    """Un cageot de bois rempli de fruits (tomates rouges, pommes vertes)."""
    bois = VGroup(*[RoundedRectangle(width=2.2, height=0.22, corner_radius=0.04, fill_color="#b45309",
                                     fill_opacity=1, stroke_color="#78350f", stroke_width=2).move_to(P(0, y))
                    for y in (-0.42, -0.14)])
    fruits = VGroup()
    xs = np.linspace(-0.8, 0.8, n)
    for k, x in enumerate(xs):
        y = 0.12 + (0.18 if k % 2 else 0)
        f = Circle(radius=0.22, fill_color=fruit, fill_opacity=1, stroke_color=ENCRE, stroke_width=1.5).move_to(
            P(x, y))
        q = Ellipse(width=0.14, height=0.07, fill_color=feuille, fill_opacity=1, stroke_width=0).move_to(
            P(x + 0.05, y + 0.2))
        fruits.add(VGroup(f, q))
    g = VGroup(fruits, bois)
    g.fruits = fruits
    return g.scale(s)


def compteur(s=1.0, frac=0.0):
    """Un compteur de vitesse (sans nombre) : arc, graduations, aiguille ;
    .aiguille tourne autour de .centre (frac de 0 à 1)."""
    c = ORIGIN
    arc = Arc(radius=1.2, start_angle=-PI / 6, angle=4 * PI / 3, stroke_color="#e5e7eb", stroke_width=8)
    rouge = Arc(radius=1.2, start_angle=-PI / 6, angle=PI / 4, stroke_color="#ef4444", stroke_width=8)
    grad = VGroup()
    for k in range(9):
        a = 7 * PI / 6 - k * (4 * PI / 3) / 8
        d = np.array([np.cos(a), np.sin(a), 0])
        grad.add(Line(c + d * 0.98, c + d * 1.12, color="#e5e7eb", stroke_width=4))
    a0 = 7 * PI / 6 - frac * 4 * PI / 3
    aig = Line(c, c + np.array([np.cos(a0), np.sin(a0), 0]) * 0.95, color=AMBRE_F, stroke_width=8)
    moyeu = Circle(radius=0.11, fill_color=AMBRE_F, fill_opacity=1, stroke_width=0)
    g = VGroup(arc, rouge, grad, aig, moyeu).scale(s)
    g.aiguille, g.moyeu = aig, moyeu
    return g


class PropGrandeurQuotientBase(PaysageProp):
    nom_voix = "4e-prop-grandeur-quotient"
    fichier_marques = "prop_grandeur_quotient_marques.json"

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

    def lc(self, morceaux, y, fs=40, xl=1.3, droite=6.2):
        """Une ligne de la colonne de droite (non jouée), qui s'arrête à `droite`."""
        lg = self.col(self.ligne(morceaux, fs), y, xl)
        if lg.get_right()[0] > droite:
            lg.scale_to_fit_width(droite - xl).align_to(P(xl, 0), LEFT)
        return lg

    def jouer(self, lg, mots, anims=None, run_time=0.35):
        """Chaque morceau de lg à SON mot (mots[i] : un extrait, ou (extrait, n)
        pour sa n-ième fois ; None = avec le précédent) ; anims[i] : des
        animations de la figure jouées avec lui."""
        anims = anims or {}
        for i, (m, mot) in enumerate(zip(lg, mots)):
            if mot:
                if isinstance(mot, tuple):
                    self.au_mot(*mot)
                else:
                    self.au_mot(mot)
            self.play(FadeIn(m, shift=RIGHT * 0.15), *anims.get(i, []), run_time=run_time)

    def op_col(self, op, y, xl=1.3, droite=6.2):
        """Pose une OpUnites dans la colonne de droite (non jouée)."""
        op.move_to(P(0, y)).align_to(P(xl, 0), LEFT)
        if op.get_right()[0] > droite:
            op.scale_to_fit_width(droite - xl).align_to(P(xl, 0), LEFT)
        return op

    def jouer_op(self, op, mots, anims=None):
        """Chaque colonne de l'opération (nombre ET unité) à son mot."""
        self.jouer(op.cols, mots, anims)

    def segments(self, x0, x1, y, n, couleur=BLEU_CALCUL):
        """La distance coupée en n parts égales (une par heure)."""
        w = (x1 - x0) / n
        segs = VGroup(*[Line(P(x0 + k * w + 0.04, y), P(x0 + (k + 1) * w - 0.04, y), color=couleur,
                             stroke_width=9) for k in range(n)])
        tics = VGroup(*[Line(P(x0 + k * w, y - 0.15), P(x0 + k * w, y + 0.15), color=WHITE, stroke_width=3)
                        for k in range(n + 1)])
        return segs, tics

    def accolade(self, x0, x1, y, s, couleur=BLEU_CALCUL, fs=30):
        """Une accolade AU-DESSUS du segment [x0, x1] et son étiquette."""
        seg = Line(P(x0, y), P(x1, y))
        br = Brace(seg, UP, buff=0.05, color=couleur)
        et = gras(s, fs, couleur).next_to(br, UP, buff=0.08)
        g = VGroup(br, et)
        g.brace, g.etiquette = br, et
        return g

    def insister_barre(self, op, k=1.9):
        """La barre de l'unité du résultat : agrandie puis rétrécie."""
        b = op.unites[-1].barre
        self.play(b.animate.scale(k), Indicate(op.unites[-1], color=AMBRE_F, scale_factor=1.1), run_time=0.35)
        self.play(b.animate.scale(1 / k), run_time=0.3)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Les kilomètres par heure", self.identite, self.ceinture, y_ech=-2.45)
        cp = compteur(0.9, frac=0.05).move_to(P(-3.3, 0.55))
        kmh = sans(unite("km/h", 44)).next_to(cp, DOWN, buff=0.05)
        self.au_mot("Les kilomètres")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(cp, scale=0.8), run_time=0.8)
        self.play(Rotate(cp.aiguille, -PI * 0.95, about_point=cp.moyeu.get_center()), FadeIn(kmh, scale=1.2),
                  run_time=1.0)
        q = VGroup(self.t("Que divise-t-on,", 42), self.t("et par quoi ?", 42, AMBRE))
        q.arrange(DOWN, buff=0.18).move_to(P(2.6, 0.0))
        self.au_mot("Que divise")
        self.play(FadeIn(q[0], shift=UP * 0.15), run_time=0.4)
        self.au_mot("et par quoi")
        self.play(FadeIn(q[1], scale=1.15), run_time=0.4)
        self.insister(kmh.barre, 1.8, 0.25)
        self.attendre_voix(marge=0.6)

    # ── 01 : Manon, conductrice de TGV : 600 km en 2 h ─────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = manon(0.8).move_to(P(-5.2, 1.0))
        nom = self.t("Manon", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.2)
        self.au_mot("Voici Manon")
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        met = VGroup(self.t("conductrice", 30, BLEU_CALCUL), self.t("de TGV", 30, BLEU_CALCUL)).arrange(DOWN, buff=0.06)
        met.next_to(pers, DOWN, buff=0.12)
        self.au_mot("conductrice")
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.5)
        rail = voie(-6.3, 0.4, -2.45)
        train = tgv(0.75).move_to(P(-5.0, -2.05))
        lgv = self.t("ligne à grande vitesse", 28, ARDOISE).next_to(rail, DOWN, buff=0.15)
        self.au_mot("ligne")
        self.play(Create(rail), FadeIn(lgv), FadeIn(train, shift=RIGHT * 0.4), run_time=0.7)
        self.au_mot("son train")
        self.play(train.animate.move_to(P(-0.9, -2.05)), run_time=0.5, rate_func=smooth)
        acc = self.accolade(-6.2, 0.3, -1.6, "600 km", fs=32)
        L1 = self.lc([("Distance :", WHITE), ("600 km", BLEU_CALCUL)], 1.9, fs=42)
        self.jouer(L1, ["parcourt", "600 km"], {1: [GrowFromCenter(acc.brace), FadeIn(acc.etiquette, scale=1.3)]})
        L2 = self.lc([("Durée :", WHITE), ("2 h", BLEU_CALCUL)], 1.1, fs=42)
        self.jouer(L2, ["en 2", "2 heures"])
        L3 = self.lc([("Vitesse moyenne ?", AMBRE)], 0.1, fs=44)
        self.au_mot("vitesse moyenne")
        self.play(FadeIn(L3, scale=1.15), run_time=0.45)
        self.insister(L3, 1.1, 0.25)
        self.attendre_voix()

    # ── 02 : vitesse = distance ÷ durée ; 600 km ÷ 2 h = 300 km/h ───────────
    def ecran_diviser(self):
        self.ecran("02-diviser")
        rail = voie(-6.3, 0.4, -2.45)
        train = tgv(0.75).move_to(P(-0.9, -2.05))
        acc = sans(self.accolade(-6.2, 0.3, -1.6, "600 km", fs=32))
        self.add(rail, train, acc)
        L0 = self.lc([("Vitesse", AMBRE), ("=", WHITE)], 2.75, fs=46)
        L0b = self.lc([("distance", BLEU_CALCUL), ("÷", WHITE), ("durée", BLEU_CALCUL)], 2.05, fs=46)
        self.jouer(L0, ["La vitesse", None])
        self.jouer(L0b, ["distance", "divisée", "durée"])
        op = self.op_col(OpUnites([("600", "km"), "÷", ("2", "h"), "=", ("300", "km/h")], fs=56, fs_u=40), 0.7)
        self.jouer_op(op, ["600 kilomètres", "divisés", "2 heures", "égale", "300 kilomètres"],
                      {0: [Indicate(acc.etiquette, color=UNITE_C)]})
        cadre = SurroundingRectangle(op.resultat, color=VERT_OK, buff=0.15, corner_radius=0.12, stroke_width=4)
        self.au_mot("par heure")
        self.play(Create(cadre), run_time=0.35)
        L1 = self.lc([("La barre", WHITE), ("/", AMBRE_F), ("se lit :", WHITE), ("« par »", AMBRE_F)], -0.9, fs=44,
                     xl=0.75, droite=6.45)
        self.jouer(L1, ["La barre", None, "se lit", "lit : par"])
        self.insister_barre(op)
        self.insister(L1[3], 1.2, 0.25)
        self.attendre_voix()

    # ── 03 : 300 km/h = 300 km en 1 h ; une moyenne ; 320 km/h ─────────────
    def ecran_sens(self):
        self.ecran("03-sens")
        tb = TableauProp(["Distance (km)", "Durée (h)"], [[600, 300], [2, 1]], montrer=False, largeur_case=1.45,
                         largeur_libelle=2.9, centre=P(-3.55, 1.25))
        h = sans(tb.fleche_col(0, 1, "÷ 2", ligne=0))
        b = sans(tb.fleche_col(0, 1, "÷ 2", ligne=1))
        self.add(tb.fond, tb.valeur(0, 0), tb.valeur(1, 0))
        L0 = self.lc([("300 km/h", VERT_OK)], 2.6, fs=48)
        self.au_mot("300")
        self.play(FadeIn(L0, scale=1.2), run_time=0.4)
        L1 = self.lc([("=", WHITE), ("300 km", BLEU_CALCUL), ("en 1 h", BLEU_CALCUL)], 1.8, fs=44)
        self.jouer(L1, ["veut dire", "300 km", "1 heure"],
                   {1: [Create(h.fleche), FadeIn(h.etiquette), tb.remplir(0, 1, 300)],
                    2: [Create(b.fleche), FadeIn(b.etiquette), tb.remplir(1, 1, 1)]})
        self.play(tb.allumer(0, 1), tb.allumer(1, 1), run_time=0.4)
        L2 = self.lc([("Grandeur quotient :", AMBRE)], 0.95, fs=42)
        L3a = self.lc([("ce qu'il y a", WHITE)], 0.35, fs=38)
        L3b = self.lc([("pour une seule unité.", WHITE)], -0.2, fs=38)
        self.au_mot("Une grandeur")
        self.play(FadeIn(L2, shift=RIGHT * 0.15), run_time=0.4)
        self.jouer(VGroup(L3a, L3b), ["dit ce", "une seule"])
        cp = compteur(0.7, frac=0.55).move_to(P(-5.15, -1.95))
        L4 = self.lc([("C'est une moyenne :", WHITE)], -0.85, fs=40)
        self.au_mot("une moyenne")
        self.play(FadeIn(L4, shift=RIGHT * 0.15), FadeIn(cp, scale=0.8), run_time=0.45)
        L5 = VGroup(self.lc([("le train accélère", WHITE)], -1.4, fs=38),
                    self.lc([("et freine.", WHITE)], -1.95, fs=38))
        c = cp.moyeu.get_center()
        self.jouer(L5, ["accélère", "et freine"],
                   {0: [Rotate(cp.aiguille, -0.7, about_point=c)], 1: [Rotate(cp.aiguille, 1.2, about_point=c)]})
        L6 = VGroup(self.t("TGV : jusqu'à", 38), self.t("320 km/h", 44, AMBRE)).arrange(DOWN, aligned_edge=LEFT,
                                                                                       buff=0.15)
        L6.move_to(P(0, -2.05)).align_to(P(-3.9, 0), LEFT)
        self.jouer(L6, ["un TGV", "320"], {1: [Rotate(cp.aiguille, -1.75, about_point=c)]})
        self.insister(L6[1], 1.15, 0.25)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (450 km en 3 h : la vitesse moyenne ?) ─────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        rail = voie(-6.3, 0.2, -1.2)
        train = tgv(0.7).move_to(P(-2.6, -0.82))
        self.add(rail, train)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["450 km ÷", "3 h =", "150 km/h."])
            segs, tics = sc.segments(-6.2, 0.1, -1.75, 3)
            et = gras("150 km", 28, BLEU_CALCUL).next_to(segs[0], DOWN, buff=0.15)
            sc.au_mot("450")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("3 heures")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), LaggedStart(*[Create(s) for s in segs], lag_ratio=0.3),
                    Create(tics), run_time=0.6)
            sc.au_mot("150")
            sc.play(FadeIn(l0[2], scale=1.3), FadeIn(et, scale=1.3), Indicate(segs[0], color=AMBRE), run_time=0.5)
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse",
                            ["Un train : 450 km", "en 3 heures.", "Sa vitesse moyenne ?"],
                            [self.t("150 km/h", 34), self.t("150 h/km", 34), self.t("1 350 km/h", 34)], 0,
                            ["450 km ÷ 3 h = 150 km/h."], mot_q="Un train", autres_r=apres)

    # ── 05 : le piège : 2 h ÷ 600 km donne des h/km ─────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        tit = self.t("Attention au piège !", 44, ROUGE_ERREUR).move_to(P(-3.0, 3.05))
        self.au_mot("Attention")
        self.play(Write(tit), run_time=0.5)
        st = personne(peau="#8d5524", tenue="#64748b", cheveux="#111827").scale(0.62).move_to(P(-5.1, 0.85))
        lst = self.t("un stagiaire", 26, ARDOISE).next_to(st, DOWN, buff=0.12)
        L0 = self.lc([("Un stagiaire :", WHITE)], 2.35, fs=40)
        self.au_mot("Un stagiaire")
        self.play(FadeIn(L0, shift=RIGHT * 0.15), FadeIn(st, shift=UP * 0.2), FadeIn(lst), run_time=0.5)
        op = self.op_col(OpUnites([("2", "h"), "÷", ("600", "km")], fs=52, fs_u=38, res=ROUGE_ERREUR,
                                  u_res=ROUGE_ERREUR), 1.35)
        self.jouer_op(op, ["divise 2", "par 600", "600"])
        L1 = self.lc([("= des", WHITE), ("h/km", ROUGE_ERREUR)], 0.3, fs=42)
        self.jouer(L1, ["obtient des", "heures par kilom"])
        L2 = self.lc([("le temps pour", WHITE), ("1 km", ROUGE_ERREUR)], -0.4, fs=38)
        self.jouer(L2, ["le temps", "1 km"])
        L3 = self.lc([("Ce n'est pas une vitesse !", ROUGE_ERREUR)], -1.15, fs=38)
        self.au_mot("Ce n'est")
        self.play(FadeIn(L3, shift=RIGHT * 0.15), Create(croix(op, sw=6)), run_time=0.45)
        L4 = self.lc([("L'unité dit l'ordre.", AMBRE)], -1.9, fs=40, droite=5.2)
        self.au_mot("L'unité")
        self.play(FadeIn(L4, shift=RIGHT * 0.15), run_time=0.4)
        km = gras("km", 64, BLEU_CALCUL).move_to(P(-3.4, -0.75))
        trait = Line(P(-4.2, -1.35), P(-2.6, -1.35), color=AMBRE_F, stroke_width=8)
        hh = gras("h", 64, BLEU_CALCUL).move_to(P(-3.4, -1.95))
        eh = self.t("en haut", 32, WHITE).next_to(km, RIGHT, buff=0.45)
        eb = self.t("en bas", 32, WHITE).next_to(hh, RIGHT, buff=0.45)
        self.au_mot("les kilomètres")
        self.play(FadeIn(km, shift=DOWN * 0.2), Create(trait), run_time=0.4)
        self.au_mot("en haut")
        self.play(FadeIn(eh, shift=LEFT * 0.15), run_time=0.3)
        self.au_mot("les heures")
        self.play(FadeIn(hh, shift=UP * 0.2), run_time=0.35)
        self.au_mot("en bas")
        self.play(FadeIn(eb, shift=LEFT * 0.15), run_time=0.3)
        self.insister(VGroup(km, trait, hh), 1.15, 0.25)
        self.attendre_voix()

    # ── 06 : au marché : 6 € ÷ 3 kg = 2 €/kg ────────────────────────────────
    def ecran_prix(self):
        self.ecran("06-prix")
        tit = self.t("Les quotients sont partout", 40, JAUNE_TITRE).move_to(P(-2.6, 3.05))
        self.au_mot("Les quotients")
        self.play(Write(tit), run_time=0.6)
        cg = cageot("#ef4444", 7, 0.95).move_to(P(-4.3, 1.7))
        lm = self.t("au marché", 28, ARDOISE).next_to(cg, RIGHT, buff=0.3)
        self.au_mot("Au marché")
        self.play(FadeIn(cg, shift=DOWN * 0.2), FadeIn(lm), run_time=0.5)
        tb = TableauProp(["Masse (kg)", "Prix (€)"], [[3, 1], [6, 2]], montrer=False, largeur_case=1.45,
                         largeur_libelle=2.6, centre=P(-3.6, -1.05))
        h = tb.fleche_col(0, 1, "÷ 3", ligne=0)
        b = tb.fleche_col(0, 1, "÷ 3", ligne=1)
        L0 = self.lc([("3 kg", BLEU_CALCUL), ("de tomates :", WHITE), ("6 €", BLEU_CALCUL)], 2.2, fs=40)
        self.jouer(L0, ["3 kg", "de tomates", "6 euros"],
                   {0: [FadeIn(tb.fond), FadeIn(tb.valeur(0, 0), scale=1.4)], 2: [FadeIn(tb.valeur(1, 0), scale=1.4)]})
        L1 = self.lc([("Prix au kilo :", AMBRE)], 1.3, fs=42)
        self.au_mot("Le prix")
        self.play(FadeIn(L1, shift=RIGHT * 0.15), run_time=0.4)
        op = self.op_col(OpUnites([("6", "€"), "÷", ("3", "kg"), "=", ("2", "€/kg")], fs=54, fs_u=38), 0.2)
        self.jouer_op(op, [("6 euros", 2), "divisés", "par 3", "égale", "2 euros"],
                      {2: [Create(h.fleche), FadeIn(h.etiquette), Create(b.fleche), FadeIn(b.etiquette)],
                       4: [tb.remplir(1, 1, 2)]})
        cadre = SurroundingRectangle(op.resultat, color=VERT_OK, buff=0.15, corner_radius=0.12, stroke_width=4)
        self.au_mot("par kilo")
        self.play(Create(cadre), run_time=0.3)
        self.insister_barre(op)
        L2 = VGroup(self.lc([("€/kg :", VERT_OK)], -1.05, fs=40), self.lc([("des euros pour 1 kilo", WHITE)], -1.65,
                                                                            fs=38, droite=5.3))
        self.jouer(L2, ["Des euros", "pour 1"], {1: [tb.remplir(0, 1, 1)]})
        self.play(tb.allumer(0, 1), tb.allumer(1, 1), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (4 kg de pommes pour 10 €) ──────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        cg = sans(cageot("#84cc16", 7, 1.3, feuille="#15803d").move_to(P(-3.4, -0.6)))
        self.add(cg)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["10 € ÷", "4 kg =", "2,50 €/kg."])
            sc.au_mot("10 euros")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("4 kg")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("2,50")
            sc.play(FadeIn(l0[2], scale=1.3), run_time=0.35)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["4 kg", "de pommes : 10 €.", "Le prix au kilo ?"],
                            [self.t("0,40 €/kg", 34), self.t("2,50 €/kg", 34), self.t("40 €/kg", 34)], 1,
                            ["10 € ÷ 4 kg = 2,50 €/kg."], mot_q="4 kg", autres_r=apres)

    # ── 08 : défi : une cycliste, 160 km en 4 h ─────────────────────────────
    def route(self, y=-1.35):
        return Line(P(-6.25, y), P(-0.5, y), color="#a8a29e", stroke_width=6)

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-2.6, 3.05))
        self.au_mot("À toi de jouer")
        self.play(Write(tit), run_time=0.6)
        rt = self.route()
        cy = cycliste(1.0).move_to(P(-5.2, -0.42))
        cy.align_to(P(0, -1.35), DOWN)
        L0 = self.lc([("Une cycliste :", WHITE)], 1.9, fs=42)
        self.au_mot("Une cycliste")
        self.play(FadeIn(L0, shift=RIGHT * 0.15), Create(rt), FadeIn(cy, shift=RIGHT * 0.3), run_time=0.5)
        self.au_mot("parcourt")
        self.play(cy.animate.shift(RIGHT * 3.4), run_time=0.4, rate_func=smooth)
        e160 = gras("160 km", 30, BLEU_CALCUL).next_to(rt, DOWN, buff=0.2)
        L1 = self.lc([("160 km", BLEU_CALCUL), ("en", WHITE), ("4 h", BLEU_CALCUL)], 1.1, fs=44)
        self.jouer(L1, ["160", "en 4", None], {0: [FadeIn(e160, scale=1.3), Indicate(rt, color=BLEU_CALCUL)]})
        L2 = self.lc([("Sa vitesse moyenne :", WHITE)], 0.2, fs=42)
        L2b = sans(self.lc([("? km/h", ORANGE_RETENUE)], -0.5, fs=48))
        self.au_mot("Quelle est")
        self.play(FadeIn(L2, shift=RIGHT * 0.2), FadeIn(L2b, scale=1.2), run_time=0.45)
        self.play(Indicate(L2b, color=ORANGE_RETENUE, scale_factor=1.2), run_time=0.6)
        self.pause_defi(y=-1.35)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-2.6, 3.05))
        self.play(Write(tit), run_time=0.5)
        rt = self.route(-0.9)
        et160 = sans(gras("160 km", 30, BLEU_CALCUL).move_to(P(-3.4, -0.35)))
        self.add(rt, et160)
        segs, tics = self.segments(-6.2, -0.55, -1.45, 4)
        ets = VGroup(*[gras("40 km", 26, VERT_OK).next_to(s, DOWN, buff=0.15) for s in segs])
        op = self.op_col(OpUnites([("160", "km"), "÷", ("4", "h"), "=", ("40", "km/h")], fs=56, fs_u=40), 1.4)
        self.jouer_op(op, ["160", "divisés", "par 4", "égale", "40"],
                      {2: [LaggedStart(*[Create(s) for s in segs], lag_ratio=0.3), Create(tics)],
                       4: [LaggedStart(*[FadeIn(e, scale=1.3) for e in ets], lag_ratio=0.2)]})
        cadre = SurroundingRectangle(op.resultat, color=VERT_OK, buff=0.15, corner_radius=0.12, stroke_width=4)
        self.au_mot("par heure")
        self.play(Create(cadre), run_time=0.3)
        self.insister_barre(op)
        self.insister(VGroup(cadre, op.resultat), 1.08, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        op = sans(OpUnites([("600", "km"), "÷", ("2", "h"), "=", ("300", "km/h")], fs=38, fs_u=30))
        op.move_to(P(-3.6, -0.3))
        self.add(op)
        lignes = self.finale_colonne(figure=op, textes=[
            ("Une grandeur quotient", "vient d'une division."),
            ("La barre de l'unité", "se lit « par » : km/h, €/kg."),
            ("On divise dans l'ordre de l'unité :", "ce qui est en haut", "par ce qui est en bas.")], fs=36)
        self.au_mot("Une grandeur")
        self.montrer_ligne(lignes[0])
        self.au_mot("La barre")
        self.montrer_ligne(lignes[1], Indicate(op.unites[-1], color=AMBRE_F, scale_factor=1.3))
        self.au_mot("On divise")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_diviser()
        self.ecran_sens()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_prix()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PropGrandeurQuotient4e(PropGrandeurQuotientBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
