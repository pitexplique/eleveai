# prop_grandeur_unite.py
# EleveAI — Maths 4e — série « Proportionnalité », lot 4 (agrandissements et
# grandeurs), épisode 16 PROPRE À LA 4e : LIRE UNE UNITÉ COMPOSÉE (micro du
# coach : grandeur_unite_composee, notion grandeur_composee), AVEC VOIX.
# Paysage 16:9, CEINTURE VERTE (la paysage complète du niveau). Short jumeau :
# prop_grandeur_unite_short.py (blanche).
# ⭐ Méthode travaillée : l'unité subit LA MÊME OPÉRATION que les nombres
# (hab ÷ km² = hab/km² ; kW × h = kWh ; km ÷ h = km/h) ; la barre se lit
# « par », et « par » veut dire « pour 1 » (tableau de proportionnalité ramené
# à 1 : ÷ 105). Pas de produit en croix (la voix ne l'utilise pas) ; « ÷ » écrit.
# ⭐ Le geste : l'opération sur les NOMBRES et, dessous, alignée, la même sur
# les UNITÉS ; la barre « / » colorée (ambre) ; Paris découpé en 105 carrés de
# 1 km², un carré allumé = « pour 1 km² ».
# ⭐ Leurres : erreur 3 « inverser » (question 1 : 20 000 km² pour 1 hab ;
# question 2 : min/L ; écran 07 : 105 ÷ 2 100 000 → km²/hab, barré) ; la
# confusion « par 1 » / « en tout » (question 1 C) ; L × min (question 2 C).
#
# Décor et métier : GÉOGRAPHIE, Malik, GÉOGRAPHE (il étudie où vivent les gens).
# Chiffres réels : Insee, population légale de Paris au 1er janvier 2022
# ≈ 2,1 millions d'habitants (2 113 705, publiée fin 2024), superficie 105 km²
# (105,4 km², Insee, comparateur de territoire) → ≈ 20 000 hab/km² (relevé le
# 31/10/2026). Le village (600 hab sur 12 km²) est inventé.
# Centres d'intérêt : histoire-geographie.
#
# Écrans : 00 garde · 01 Malik, Paris 2 100 000 hab sur 105 km² · 02 le calcul
# (tableau ÷ 105 ; nombres ET unités alignés) · 03 la barre se lit « par » =
# « pour 1 » (Paris en 105 carrés, un allumé) · 04 QUESTION 1 · 05 la règle
# (kWh, km/h, hab/km²) · 06 QUESTION 2 (L/min) · 07 le piège (105 ÷ 2 100 000 →
# km²/hab) · 08 défi village 600 hab sur 12 km² · 08b correction 50 hab/km² ·
# 09 ce que tu as appris · 10 fin.
#
# Voix : manim/voix/4e-prop-grandeur-unite.json (validée par Frédéric le 31/10,
# débit −10), WAV dans public/sons/4e-prop-grandeur-unite/ ; marques mot à mot :
# manim/scripts/4e/prop_grandeur_unite_marques.json (scripts/marques_dump.ps1
# puis cues2marques, une marque par occurrence).
# Outils : manim/scripts/6e/prop_commun.py + manim/canvas_proportion.py (non
# modifiés). Ajouté ICI : malik(), carte_paris(), grille_paris(), village(),
# robinet(), radiateur(), voiture(), immeubles(), Operation (nombres et unités
# alignés en colonnes), unite_barre() (« hab/km² » avec la barre ambre).
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/prop_grandeur_unite.py PropGrandeurUnite4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/4e/prop_grandeur_unite.py PropGrandeurUnite4e -o eleveai-maths-4e-prop-grandeur-unite --media_dir manim/media-prop-4e-16
# Sortie : manim/sorties/4e/maths/proportionnalite/16-grandeur-unite/eleveai-maths-4e-prop-grandeur-unite.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403
from prop_agrandissement_rapport import PropAgrandissementRapportBase, gras, sans  # noqa: E402

UNITE_C = "#5eead4"   # les UNITÉS (sarcelle clair), sous les nombres
BARRE_C = "#f59e0b"   # la barre « / » qui se lit « par »
ENCRE = "#0f172a"
ARDOISE = "#94a3b8"
SEINE = "#38bdf8"


def unite_barre(avant, apres, fs=40, couleur=UNITE_C, barre=BARRE_C):
    """« hab/km² » en trois Text : avant, la barre (ambre, plus grande), après.
    .avant .barre .apres"""
    a = gras(avant, fs, couleur)
    b = gras("/", int(fs * 1.25), barre)
    c = gras(apres, fs, couleur)
    g = VGroup(a, b, c).arrange(RIGHT, buff=0.06)
    b.align_to(a, DOWN).shift(DOWN * 0.04)
    g.avant, g.barre, g.apres = a, b, c
    return g


class Operation(VGroup):
    """Une opération en COLONNES : la ligne des nombres en haut, la ligne des
    unités dessous, chaque colonne centrée (2 100 000 au-dessus de hab, ÷
    au-dessus de ÷…). haut[i] / bas[i] : Text ou VGroup (None = rien)."""

    def __init__(self, haut, bas, fs=40, buff=0.32, dy=0.75, **kw):
        super().__init__(**kw)
        self.haut, self.bas = VGroup(), VGroup()
        cols = []
        for h, b in zip(haut, bas):
            mh = h if h is not None else VectorizedPoint()
            mb = b if b is not None else VectorizedPoint()
            cols.append((mh, mb, max(mh.width, mb.width)))
        x = 0
        for mh, mb, w in cols:
            mh.move_to(P(x + w / 2, 0))
            mb.move_to(P(x + w / 2, -dy))
            self.haut.add(mh)
            self.bas.add(mb)
            x += w + buff
        self.add(self.haut, self.bas)


def malik(s=1.0):
    """Malik, géographe : cheveux courts, tenue orange, un globe sous le bras."""
    p = personne(peau="#a0662f", tenue="#ea580c", cheveux="#111827", longs=False)
    globe = Circle(radius=0.32, fill_color="#0ea5e9", fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    terres = VGroup(
        Ellipse(width=0.22, height=0.3, fill_color="#16a34a", fill_opacity=1, stroke_width=0).move_to(P(-0.08, 0.06)),
        Ellipse(width=0.16, height=0.12, fill_color="#16a34a", fill_opacity=1, stroke_width=0).move_to(P(0.13, -0.12)))
    pied = Line(P(0, -0.32), P(0, -0.5), color="#78350f", stroke_width=5)
    socle = Rectangle(width=0.36, height=0.07, fill_color="#78350f", fill_opacity=1, stroke_width=0).move_to(
        P(0, -0.52))
    gl = VGroup(pied, socle, globe, terres).move_to(P(0.72, -1.1))
    g = VGroup(p, gl)
    g.corps, g.globe = p.corps, gl
    return g.scale(s)


def contour_paris():
    """Le contour (grossier) de Paris, plus large que haut, ~ 3 × 1,9."""
    pts = [(-1.5, 0.05), (-1.3, 0.5), (-0.85, 0.85), (-0.2, 0.95), (0.45, 0.92), (1.0, 0.78), (1.42, 0.45),
           (1.5, 0.0), (1.3, -0.45), (0.85, -0.78), (0.2, -0.92), (-0.5, -0.85), (-1.05, -0.6), (-1.45, -0.3)]
    return Polygon(*[P(x, y) for x, y in pts], fill_color="#fde68a", fill_opacity=1, stroke_color="#b45309",
                   stroke_width=4)


def carte_paris(s=1.0):
    """Paris vu d'en haut : le contour, la Seine qui le traverse, des maisons
    (points) partout. .contour .seine .gens"""
    c = contour_paris()
    seine = VMobject(stroke_color=SEINE, stroke_width=9).set_points_smoothly(
        [P(-1.45, 0.3), P(-0.7, -0.1), P(0.0, 0.25), P(0.7, -0.15), P(1.42, -0.3)])
    rng = np.random.default_rng(16)
    gens = VGroup()
    while len(gens) < 90:
        x, y = rng.uniform(-1.4, 1.4), rng.uniform(-0.85, 0.85)
        if (x / 1.45) ** 2 + (y / 0.88) ** 2 < 0.85:
            gens.add(Dot(P(x, y), radius=0.035, color="#7c2d12"))
    g = VGroup(c, seine, gens)
    g.contour, g.seine, g.gens = c, seine, gens
    return g.scale(s)


def grille_paris(cote=0.36, nl=7, nc=15):
    """Paris « découpé » en 105 carrés de 1 km² (7 rangées de 15) : la surface
    à partager. .carres[r][c]"""
    carres = VGroup()
    for r in range(nl):
        rang = VGroup(*[Square(cote, fill_color="#fde68a", fill_opacity=1, stroke_color="#b45309", stroke_width=2)
                        for _ in range(nc)]).arrange(RIGHT, buff=0)
        carres.add(rang)
    carres.arrange(DOWN, buff=0)
    return carres


def village(s=1.0):
    """Un village : trois maisons, une église, deux arbres, sur une colline verte."""
    sol = Ellipse(width=4.2, height=1.0, fill_color="#4ade80", fill_opacity=1, stroke_width=0).move_to(P(0, -0.55))
    g = VGroup(sol)
    for x, coul in ((-1.3, "#fca5a5"), (-0.35, "#fde68a"), (1.15, "#bfdbfe")):
        mur = Square(0.55, fill_color=coul, fill_opacity=1, stroke_width=0).move_to(P(x, -0.1))
        toit = Polygon(P(x - 0.36, 0.17), P(x + 0.36, 0.17), P(x, 0.5), fill_color="#b91c1c", fill_opacity=1,
                       stroke_width=0)
        porte = Rectangle(width=0.14, height=0.24, fill_color="#78350f", fill_opacity=1, stroke_width=0).move_to(
            P(x, -0.25))
        g.add(mur, toit, porte)
    tour = Rectangle(width=0.4, height=1.0, fill_color="#e5e7eb", fill_opacity=1, stroke_width=0).move_to(P(0.4, 0.1))
    fleche = Polygon(P(0.18, 0.6), P(0.62, 0.6), P(0.4, 1.1), fill_color="#64748b", fill_opacity=1, stroke_width=0)
    g.add(tour, fleche)
    for x in (-1.85, 1.8):
        g.add(Line(P(x, -0.4), P(x, 0.0), color="#78350f", stroke_width=6),
              Circle(radius=0.28, fill_color="#15803d", fill_opacity=1, stroke_width=0).move_to(P(x, 0.2)))
    return g.scale(s)


def eclair(s=1.0):
    """L'énergie électrique (kW, kWh) : un éclair jaune dans une prise."""
    rond = Circle(radius=0.5, fill_color="#1e293b", fill_opacity=1, stroke_color="#fde047", stroke_width=4)
    e = Polygon(P(0.08, 0.4), P(-0.22, -0.02), P(-0.02, -0.02), P(-0.12, -0.4), P(0.22, 0.06), P(0.02, 0.06),
                fill_color="#fde047", fill_opacity=1, stroke_width=0)
    return VGroup(rond, e).scale(s)


def voiture(s=1.0):
    """Une voiture (km/h) : caisse rouge, toit, deux roues."""
    caisse = RoundedRectangle(width=1.3, height=0.38, corner_radius=0.1, fill_color="#dc2626", fill_opacity=1,
                              stroke_width=0)
    toit = Polygon(P(-0.38, 0.19), P(0.32, 0.19), P(0.18, 0.48), P(-0.24, 0.48), fill_color="#dc2626",
                   fill_opacity=1, stroke_width=0)
    vitre = Polygon(P(-0.3, 0.22), P(0.25, 0.22), P(0.14, 0.43), P(-0.2, 0.43), fill_color="#bae6fd",
                    fill_opacity=1, stroke_width=0)
    roues = VGroup(*[Circle(radius=0.15, fill_color="#111827", fill_opacity=1, stroke_color="#9ca3af",
                            stroke_width=3).move_to(P(x, -0.2)) for x in (-0.38, 0.38)])
    return VGroup(caisse, toit, vitre, roues).scale(s)


def immeubles(s=1.0):
    """La ville (hab/km²) : trois immeubles et leurs fenêtres."""
    g = VGroup()
    for x, h, coul in ((-0.4, 0.9, "#64748b"), (0.0, 1.25, "#475569"), (0.4, 0.75, "#94a3b8")):
        b = Rectangle(width=0.36, height=h, fill_color=coul, fill_opacity=1, stroke_width=0).move_to(
            P(x, -0.6 + h / 2))
        g.add(b)
        for k in range(int(h / 0.22)):
            g.add(Square(0.08, fill_color="#fde047", fill_opacity=1, stroke_width=0).move_to(
                P(x, -0.5 + 0.22 * k)))
    return g.scale(s)


def robinet(s=1.0):
    """Le débit (L/min) : un robinet qui coule dans un seau."""
    tuyau = Rectangle(width=0.9, height=0.2, fill_color="#94a3b8", fill_opacity=1, stroke_width=0).move_to(
        P(-0.35, 0.9))
    bec = Rectangle(width=0.2, height=0.35, fill_color="#94a3b8", fill_opacity=1, stroke_width=0).move_to(
        P(0.0, 0.67))
    poignee = Rectangle(width=0.36, height=0.08, fill_color="#ef4444", fill_opacity=1, stroke_width=0).move_to(
        P(-0.45, 1.08))
    eau = Rectangle(width=0.1, height=0.75, fill_color=SEINE, fill_opacity=0.9, stroke_width=0).move_to(P(0, 0.12))
    seau = Polygon(P(-0.45, -0.25), P(0.45, -0.25), P(0.35, -0.9), P(-0.35, -0.9), fill_color="#f1f5f9",
                   fill_opacity=1, stroke_color="#64748b", stroke_width=3)
    niveau = Polygon(P(-0.41, -0.48), P(0.41, -0.48), P(0.35, -0.88), P(-0.35, -0.88), fill_color=SEINE,
                     fill_opacity=0.9, stroke_width=0)
    g = VGroup(tuyau, poignee, bec, eau, seau, niveau)
    g.eau = eau
    return g.scale(s)


class PropGrandeurUniteBase(PropAgrandissementRapportBase):
    nom_voix = "4e-prop-grandeur-unite"
    fichier_marques = "prop_grandeur_unite_marques.json"

    def tableau(self, nombres, centre, fs=30, lc=1.8):
        """Le tableau du coach, ramené à 1 : Surface (km²) | Habitants."""
        return TableauProp(["Surface (km²)", "Habitants"], nombres, montrer=False, largeur_case=lc,
                           largeur_libelle=2.4, hauteur=0.72, fs=fs, centre=centre)

    def question_pause(self, *a, **k):
        """Celle de la base ; les choix, audités quand ils entrent (question),
        ne sont plus audités pendant la réponse (la carte juste s'agrandit)."""
        avant = k.pop("autres_q", None)

        def figer(sc):
            for c in sc.cartes_q:
                for f in c.get_family():
                    if isinstance(f, Text):
                        f._pas_audit = True
            if avant:
                avant(sc)
        return super().question_pause(*a, autres_q=figer, **k)

    def boite(self, mob, couleur=VERT_OK):
        return SurroundingRectangle(mob, color=couleur, buff=0.18, corner_radius=0.12, stroke_width=4)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Lire une unité composée", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Lire")
        carte = carte_paris(0.9).move_to(P(-3.9, -0.2))
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(carte, scale=0.8), run_time=0.8)
        q = VGroup(self.t("Que veut dire", 40), self.t("« habitants par km² » ?", 40, AMBRE))
        q.arrange(DOWN, buff=0.16).move_to(P(2.3, 0.35))
        self.au_mot("Que veut")
        self.play(FadeIn(q[0], shift=UP * 0.15), run_time=0.4)
        u = unite_barre("hab", "km²", fs=46).next_to(q, DOWN, buff=0.45)
        self.au_mot("habitants")
        self.play(FadeIn(q[1], scale=1.15), FadeIn(u, shift=UP * 0.1), run_time=0.5)
        self.play(Circumscribe(u.barre, color=BARRE_C, buff=0.08), run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 01 : Malik, géographe ; Paris 2 100 000 hab sur 105 km² ─────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = malik(0.9).move_to(P(-5.45, -0.75))
        nom = self.t("Malik", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.au_mot("Voici Malik")
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        met = self.t("géographe", 30, BLEU_CALCUL).next_to(pers, DOWN, buff=0.15)
        self.au_mot("géographe")
        self.play(FadeIn(met, shift=DOWN * 0.1), Indicate(pers.globe, color=YELLOW), run_time=0.6)
        carte = carte_paris(1.0).move_to(P(-2.2, 0.4))
        self.au_mot("où vivent")
        self.play(FadeIn(VGroup(carte.contour, carte.seine), scale=0.9), run_time=0.5)
        self.play(LaggedStart(*[FadeIn(d, scale=2) for d in carte.gens], lag_ratio=0.02), run_time=0.6)
        src = self.t("Source : Insee (2022)", 24, ARDOISE).next_to(carte, DOWN, buff=0.3)
        self.au_mot("l'Insee")
        self.play(FadeIn(src, shift=UP * 0.1), run_time=0.3)
        lp = gras("Paris", 34, "#b45309").next_to(carte, UP, buff=0.2)
        L1 = self.lc([("Paris :", WHITE), ("2 100 000 hab", BLEU_CALCUL)], 2.3)
        self.jouer(L1, ["Paris", "2 100 000"], {0: [FadeIn(lp, scale=1.2)], 1: [Indicate(carte.gens, color=YELLOW)]})
        L2 = self.lc([("sur", WHITE), ("105 km²", BLEU_CALCUL)], 1.45)
        self.jouer(L2, ["sur", "105"], {1: [Indicate(carte.contour, color=AMBRE, scale_factor=1.04)]})
        L3 = self.lc([("Pour 1 km² :", WHITE), ("? hab", ORANGE_RETENUE)], 0.2, fs=44)
        sans(L3[1])
        self.au_mot("pour 1")
        self.play(FadeIn(L3[0], shift=RIGHT * 0.15), FadeIn(L3[1], scale=1.2), run_time=0.4)
        self.insister(L3[1], 1.25, 0.25)
        self.attendre_voix()

    # ── 02 : le calcul : nombres ET unités, alignés ; tableau ramené à 1 ────
    def ecran_calcul(self):
        self.ecran("02-calcul")
        tb = self.tableau([[105, 1], [2100000, 20000]], P(-3.35, 1.55))
        L0 = self.lc([("On divise :", WHITE), ("habitants ÷ km²", UNITE_C)], 2.55, fs=36, xl=1.0)
        self.au_mot("On divise")
        self.play(FadeIn(tb.fond, shift=DOWN * 0.15), FadeIn(L0[0], shift=RIGHT * 0.15), run_time=0.45)
        self.au_mot("habitants")
        self.play(FadeIn(L0[1], shift=RIGHT * 0.15), run_time=0.35)
        lab = VGroup(self.t("Nombres :", 30, WHITE), self.t("Unités :", 30, UNITE_C))
        sans(lab)
        op = Operation([gras("2 100 000", 44, WHITE), gras("÷", 44, WHITE), gras("105", 44, WHITE),
                        gras("=", 44, WHITE), gras("20 000", 44, VERT_OK)],
                       [gras("hab", 40, UNITE_C), gras("÷", 40, UNITE_C), gras("km²", 40, UNITE_C),
                        gras("=", 40, UNITE_C), unite_barre("hab", "km²", fs=40)], dy=0.85, buff=0.4)
        op.move_to(P(0, 0)).align_to(P(-3.9, 0), LEFT).set_y(-1.1)
        lab[0].move_to(P(0, op.haut.get_y())).align_to(P(-6.3, 0), LEFT)
        lab[1].move_to(P(0, op.bas.get_y())).align_to(P(-6.3, 0), LEFT)
        h = op.haut
        self.au_mot("2 100 000")
        self.play(FadeIn(lab[0]), FadeIn(h[0], shift=RIGHT * 0.15), FadeIn(tb.valeur(1, 0), scale=1.3), run_time=0.4)
        self.au_mot("divisé")
        self.play(FadeIn(h[1], scale=1.3), run_time=0.3)
        fh = tb.fleche_col(0, 1, "÷ 105", ligne=0)
        fb = tb.fleche_col(0, 1, "÷ 105", ligne=1)
        un = tb.valeur(0, 1)
        sans(VGroup(un))
        self.au_mot("105")
        self.play(FadeIn(h[2], shift=RIGHT * 0.15), FadeIn(tb.valeur(0, 0), scale=1.3), run_time=0.35)
        self.play(Create(fh.fleche), FadeIn(fh.etiquette), Create(fb.fleche), FadeIn(fb.etiquette),
                  FadeIn(un, scale=1.3), run_time=0.5)
        self.au_mot("égale 20")
        self.play(FadeIn(h[3]), run_time=0.2)
        self.au_mot("20 000")
        self.play(FadeIn(h[4], scale=1.3), FadeIn(tb.valeur(1, 1), scale=1.3), tb.allumer(1, 1), run_time=0.45)
        L1 = self.lc([("L'unité se divise", UNITE_C), ("aussi !", UNITE_C)], 1.6, fs=36, xl=1.0)
        self.jouer(L1, ["L'unité", "aussi"])
        b = op.bas
        self.au_mot("des habitants")
        self.play(FadeIn(lab[1]), FadeIn(b[0], shift=UP * 0.15), Indicate(h[0], color=UNITE_C), run_time=0.4)
        self.au_mot("divisés")
        self.play(FadeIn(b[1], scale=1.3), run_time=0.3)
        self.au_mot("des kilomètres")
        self.play(FadeIn(b[2], shift=UP * 0.15), Indicate(h[2], color=UNITE_C), run_time=0.4)
        self.au_mot("carrés. 20")
        self.play(FadeIn(b[3]), run_time=0.2)
        res = VGroup(gras("20 000", 46, VERT_OK), unite_barre("hab", "km²", fs=46, couleur=VERT_OK)).arrange(
            RIGHT, buff=0.25).move_to(P(-0.6, -2.95))
        cadre = self.boite(res)
        self.au_mot("20 000 habitants")
        self.play(FadeIn(b[4].avant, shift=UP * 0.15), FadeIn(res[0], scale=1.2), FadeIn(res[1].avant),
                  Create(cadre), run_time=0.45)
        self.au_mot("par kilomètre")
        self.play(FadeIn(b[4].barre, scale=1.4), FadeIn(res[1].barre, scale=1.4), run_time=0.3)
        self.au_mot("kilomètre carré")
        self.play(FadeIn(b[4].apres, shift=UP * 0.15), FadeIn(res[1].apres), run_time=0.3)
        self.insister(VGroup(cadre, res), 1.06, 0.25)
        self.attendre_voix()

    # ── 03 : la barre se lit « par » ; « par » = « pour 1 » ─────────────────
    def ecran_lire(self):
        self.ecran("03-lire")
        gr = grille_paris(0.37).move_to(P(-3.35, 1.05))
        lp = sans(gras("Paris : des carrés de 1 km²", 28, "#fbbf24").next_to(gr, UP, buff=0.18))
        self.add(gr)
        u = unite_barre("hab", "km²", fs=60).move_to(P(3.6, 2.6))
        L1 = self.lc([("« / »", BARRE_C), ("se lit", WHITE), ("« par »", BARRE_C)], 1.45, fs=42)
        self.au_mot("La barre")
        self.play(FadeIn(u, scale=1.2), FadeIn(L1[0], shift=RIGHT * 0.15), run_time=0.35)
        self.jouer(L1[1:], ["se lit", "par"])
        self.play(Circumscribe(u.barre, color=BARRE_C, buff=0.1), u.barre.animate.scale(1.3), run_time=0.5)
        self.play(u.barre.animate.scale(1 / 1.3), run_time=0.25)
        L2 = self.lc([("« par »", BARRE_C), ("=", WHITE), ("« pour 1 »", BARRE_C)], 0.6, fs=42)
        self.jouer(L2, [("par", 2), "veut dire", "pour 1"])
        self.insister(L2[2], 1.2, 0.25)
        L3 = self.lc([("20 000 hab", WHITE), ("par", BARRE_C), ("km²", WHITE)], -0.4, fs=40)
        L3[1].shift(DOWN * 0.07)  # « par » : sa jambe la remontait au-dessus de la ligne
        self.jouer(L3, ["20 000 habitants", ("par kilomètre", 1), ("kilomètre carré", 1)])
        L4 = self.lc([("= 20 000 hab", VERT_OK), ("pour 1 km²", VERT_OK)], -1.2, fs=40)
        c = gr[3][7]
        foule = VGroup(*[Dot(c.get_center() + P(dx, dy), radius=0.022, color="#7c2d12")
                         for dx in np.linspace(-0.13, 0.13, 6) for dy in np.linspace(-0.13, 0.13, 6)])
        fl = Arrow(P(-3.35 + 1.6, -1.35), c.get_bottom() + P(0.05, -0.02), color=BARRE_C, buff=0.05,
                   stroke_width=5, max_tip_length_to_length_ratio=0.2)
        lab = gras("1 km²", 32, BARRE_C).next_to(fl.get_start(), DOWN, buff=0.1)
        self.au_mot(("20 000 habitants"), 2)
        self.play(FadeIn(L4[0], shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("pour 1 kilomètre")
        self.play(FadeIn(L4[1], shift=RIGHT * 0.15), FadeIn(lp), c.animate.set_fill(BARRE_C, 1), GrowArrow(fl),
                  FadeIn(lab, shift=UP * 0.1), run_time=0.4)
        self.play(FadeIn(foule, scale=0.5), Indicate(c, color=BARRE_C, scale_factor=1.6), run_time=0.6)
        tp = self.tampon("Densité de population", fs=32).move_to(P(-3.1, -2.7))
        self.au_mot("densité")
        self.play(FadeIn(tp, scale=1.3), run_time=0.45)
        self.insister(tp, 1.06, 0.25)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (20 000 hab/km² : que veut dire ?) ──────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        gr = grille_paris(0.3).move_to(P(-3.6, 0.3))
        self.add(gr)

        def apres(sc):
            c = gr[3][7]
            sc.au_mot("Par")
            sc.rep(0)
            sc.au_mot("20 000")
            sc.rep(1, avec=[c.animate.set_fill(BARRE_C, 1)])
            sc.play(Indicate(c, scale_factor=2.0, color=BARRE_C), run_time=0.6)
            sc.rep_fin()

        self.question_pause("04-question", "04b-reponse",
                            ["Que veut dire", "20 000 hab/km² ?"],
                            [self.t("20 000 hab pour 1 km²", 26), self.t("20 000 km² pour 1 hab", 26),
                             self.t("20 000 hab en tout", 26)], 0,
                            ["« Par » veut dire « pour 1 » :", "20 000 hab pour 1 km²."], mot_q="Que veut",
                            autres_r=apres)

    # ── 05 : la règle : l'unité subit la même opération que les nombres ─────
    def ecran_regle(self):
        self.ecran("05-regle")
        tit = self.t("La règle", 46, JAUNE_TITRE).move_to(P(0, 3.1))
        self.au_mot("La règle")
        self.play(Write(tit), run_time=0.5)
        R = self.ligne([("L'unité subit", WHITE), ("la même opération", AMBRE), ("que les nombres.", WHITE)], 38)
        R.move_to(P(0, 2.2))
        self.jouer(R, ["l'unité", "même opération", "que les nombres"])
        self.insister(R[1], 1.12, 0.25)
        X = [-0.5, 0.6, 1.7, 2.8, 3.25]
        icones = [eclair(0.95), voiture(0.95), immeubles(0.8)]
        lignes = [
            ("On multiplie :", [gras("kW", 44, UNITE_C), gras("×", 44, WHITE), gras("h", 44, UNITE_C),
                                gras("=", 44, WHITE), gras("kWh", 44, VERT_OK)],
             ["multiplie", "kilowatt", "fois", "heure", "égale", "kilowattheure"]),
            ("On divise :", [gras("km", 44, UNITE_C), gras("÷", 44, WHITE), gras("h", 44, UNITE_C),
                             gras("=", 44, WHITE), unite_barre("km", "h", fs=44, couleur=VERT_OK)],
             [("divise", 1), "kilomètre divisé", "divisé par", "par heure", ("égale", 2), ("kilomètre par", 1)]),
            (None, [gras("hab", 44, UNITE_C), gras("÷", 44, WHITE), gras("km²", 44, UNITE_C),
                    gras("=", 44, WHITE), unite_barre("hab", "km²", fs=44, couleur=VERT_OK)],
             [None, "Habitant", ("divisé par", 2), ("kilomètre carré", 1), ("égale", 3), "habitant par"]),
        ]
        for k, ((lab, items, mots), y) in enumerate(zip(lignes, (0.9, -0.35, -1.6))):
            ic = icones[k].move_to(P(-5.85, y))
            for m, x in zip(items, X):
                m.move_to(P(x, y))
            items[4].align_to(P(X[4], 0), LEFT)
            gl = self.t(lab, 34) if lab else VectorizedPoint(P(-4.4, y))
            gl.move_to(P(0, y)).align_to(P(-4.95, 0), LEFT)
            if mots[0]:
                self.au_mot(*mots[0]) if isinstance(mots[0], tuple) else self.au_mot(mots[0])
            self.play(FadeIn(ic, scale=0.7), FadeIn(gl, shift=RIGHT * 0.15), run_time=0.35)
            for m, mot in zip(items, mots[1:]):
                self.au_mot(*mot) if isinstance(mot, tuple) else self.au_mot(mot)
                self.play(FadeIn(m, shift=RIGHT * 0.12), run_time=0.3)
            self.play(Indicate(items[4], color=VERT_OK, scale_factor=1.15), run_time=0.45)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (litres ÷ minutes : l'unité ?) ──────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        rb = robinet(1.7).move_to(P(-3.6, 0.1))
        self.add(rb)

        def apres(sc):
            sc.au_mot("Des litres")
            sc.rep(0, avec=[Indicate(rb.eau, color=WHITE, scale_factor=1.2)])
            sc.au_mot("un débit")
            sc.rep(1)
            sc.rep_fin()

        self.question_pause("06-question", "06b-reponse",
                            ["On divise des litres (L)", "par des minutes (min).", "L'unité du résultat ?"],
                            [self.t("L/min", 36), self.t("min/L", 36), self.t("L × min", 36)], 0,
                            ["L ÷ min = L/min :", "c'est un débit."], mot_q="On divise",
                            autres_r=apres)

    # ── 07 : le piège : 105 ÷ 2 100 000 → km²/hab ───────────────────────────
    def carte_nb(self, s, couleur=WHITE, fs=36):
        t = gras(s, fs, couleur)
        r = RoundedRectangle(width=t.width + 0.4, height=t.height + 0.35, corner_radius=0.12,
                             fill_color="#1e293b", fill_opacity=1, stroke_color=couleur, stroke_width=3)
        g = VGroup(r, t.move_to(r))
        g.texte = t
        return g

    def ecran_piege(self):
        self.ecran("07-piege")
        tit = self.t("Attention au piège !", 44, ROUGE_ERREUR).move_to(P(-2.9, 3.1))
        self.au_mot("Attention")
        self.play(Write(tit), run_time=0.5)
        st = personne(peau="#f1c27d", tenue="#64748b", cheveux="#92400e").scale(0.75).move_to(P(-5.5, -1.75))
        lst = self.t("un stagiaire", 28, ARDOISE).next_to(st, UP, buff=0.15)
        self.au_mot("Un stagiaire")
        self.play(FadeIn(st, shift=UP * 0.2), FadeIn(lst), run_time=0.45)
        c1 = self.carte_nb("105 km²", ROUGE_ERREUR, fs=32)
        dv = gras("÷", 40, WHITE)
        c2 = self.carte_nb("2 100 000 hab", ROUGE_ERREUR, fs=32)
        rang = VGroup(c1, dv, c2).arrange(RIGHT, buff=0.22)
        if rang.width > 5.9:
            rang.scale_to_fit_width(5.9)
        rang.move_to(P(-3.05, 1.75))
        self.au_mot("105")
        self.play(FadeIn(c1, shift=DOWN * 0.15), FadeIn(dv), run_time=0.35)
        self.au_mot("2 100 000")
        self.play(FadeIn(c2, shift=DOWN * 0.15), run_time=0.35)
        res = VGroup(gras("=", 44, WHITE), unite_barre("km²", "hab", fs=46, couleur=ROUGE_ERREUR)).arrange(
            RIGHT, buff=0.25).move_to(P(-3.05, 0.7))
        self.au_mot("des kilomètres")
        self.play(FadeIn(res[0]), FadeIn(res[1].avant, shift=UP * 0.1), run_time=0.35)
        self.au_mot("par habitant")
        self.play(FadeIn(res[1].barre, scale=1.3), FadeIn(res[1].apres), run_time=0.35)
        L1 = self.lc([("la place", WHITE), ("pour 1 hab", ORANGE_RETENUE)], 2.2, fs=38, xl=1.0)
        self.jouer(L1, ["la place", "pour 1"])
        L2 = self.lc([("Ça existe,", WHITE)], 1.45, fs=38, xl=1.0)
        self.jouer(L2, ["Ça existe"])
        L3 = VGroup(self.lc([("mais ce n'est plus", WHITE)], 0.8, fs=38, xl=1.0),
                    self.lc([("une densité !", ROUGE_ERREUR)], 0.15, fs=40, xl=1.0))
        self.jouer(L3, ["mais", "une densité"])
        self.play(Create(croix(VGroup(rang, res), sw=7)), run_time=0.4)
        A = self.lc([("hab ÷ km²", VERT_OK), ("→", WHITE), ("hab/km²", VERT_OK)], -0.75, fs=40, xl=1.0)
        B = self.lc([("km² ÷ hab", ROUGE_ERREUR), ("→", WHITE), ("km²/hab", ROUGE_ERREUR)], -1.55, fs=40, xl=1.0)
        B.align_to(A, LEFT)
        self.au_mot("L'ordre")
        self.play(FadeIn(A[0], shift=RIGHT * 0.15), FadeIn(B[0], shift=RIGHT * 0.15), run_time=0.4)
        self.au_mot("l'ordre de l'unité")
        self.play(FadeIn(A[1:], shift=RIGHT * 0.15), FadeIn(B[1:], shift=RIGHT * 0.15), run_time=0.45)
        ok = self.boite(A)
        self.play(Create(ok), run_time=0.35)
        self.insister(VGroup(ok, A), 1.06, 0.25)
        self.attendre_voix()

    # ── 08 : défi : un village, 600 hab sur 12 km² ──────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-2.6, 3.1))
        self.au_mot("À toi de jouer")
        self.play(Write(tit), run_time=0.6)
        vi = village(1.15).move_to(P(-3.6, -0.2))
        L0 = self.lc([("Village :", WHITE), ("600 hab", BLEU_CALCUL)], 2.2, fs=42, xl=1.0)
        self.jouer(L0, ["Un village", "600"], {0: [FadeIn(vi, shift=UP * 0.2)]})
        L1 = self.lc([("sur", WHITE), ("12 km²", BLEU_CALCUL)], 1.4, fs=42, xl=1.0)
        self.jouer(L1, ["sur", "12"])
        L2 = self.lc([("Densité :", WHITE), ("?", ORANGE_RETENUE)], 0.5, fs=44, xl=1.0)
        sans(L2[1])
        self.jouer(L2, ["densité", None])
        L3 = self.lc([("unité comprise !", ORANGE_RETENUE)], -0.25, fs=38, xl=1.0)
        self.jouer(L3, ["unité comprise"])
        self.play(Indicate(L2[1], color=ORANGE_RETENUE, scale_factor=1.4), run_time=0.6)
        self.pause_defi(y=-1.1)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-2.6, 3.1))
        self.play(Write(tit), run_time=0.5)
        tb = self.tableau([[12, 1], [600, 50]], P(-3.3, 0.9), fs=32, lc=1.6)
        self.play(FadeIn(tb.fond, shift=DOWN * 0.15), run_time=0.4)
        op = Operation([gras("600", 42, WHITE), gras("÷", 42, WHITE), gras("12", 42, WHITE), gras("=", 42, WHITE),
                        gras("50", 42, VERT_OK)],
                       [gras("hab", 36, UNITE_C), gras("÷", 36, UNITE_C), gras("km²", 36, UNITE_C),
                        gras("=", 36, UNITE_C), unite_barre("hab", "km²", fs=36)], dy=0.75, buff=0.35)
        if op.width > 5.2:
            op.scale_to_fit_width(5.2)
        op.move_to(P(0, 1.85)).align_to(P(1.0, 0), LEFT)
        h, b = op.haut, op.bas
        fh = tb.fleche_col(0, 1, "÷ 12", ligne=0)
        fb = tb.fleche_col(0, 1, "÷ 12", ligne=1)
        un = tb.valeur(0, 1)
        sans(VGroup(un))
        self.au_mot("600")
        self.play(FadeIn(h[0], shift=RIGHT * 0.15), FadeIn(tb.valeur(1, 0), scale=1.3), run_time=0.35)
        self.au_mot("divisé")
        self.play(FadeIn(h[1], scale=1.3), run_time=0.25)
        self.au_mot("12")
        self.play(FadeIn(h[2], shift=RIGHT * 0.15), FadeIn(tb.valeur(0, 0), scale=1.3), Create(fh.fleche),
                  FadeIn(fh.etiquette), Create(fb.fleche), FadeIn(fb.etiquette), FadeIn(un, scale=1.3), run_time=0.45)
        self.au_mot("égale")
        self.play(FadeIn(h[3]), run_time=0.2)
        self.au_mot("50")
        self.play(FadeIn(h[4], scale=1.3), FadeIn(tb.valeur(1, 1), scale=1.3), tb.allumer(1, 1), run_time=0.45)
        res = VGroup(gras("50", 46, VERT_OK), unite_barre("hab", "km²", fs=46, couleur=VERT_OK)).arrange(
            RIGHT, buff=0.22)
        res.move_to(P(0, 0.05)).align_to(P(1.25, 0), LEFT)
        cadre = self.boite(res)
        self.au_mot("50 habitants")
        self.play(FadeIn(VGroup(b[0], b[1], b[2], b[3], b[4].avant), shift=UP * 0.12), FadeIn(res[0], scale=1.2),
                  FadeIn(res[1].avant), Create(cadre), run_time=0.45)
        self.au_mot("par kilomètre")
        self.play(FadeIn(b[4].barre, scale=1.4), FadeIn(res[1].barre, scale=1.4), run_time=0.3)
        self.au_mot("kilomètre carré")
        self.play(FadeIn(b[4].apres), FadeIn(res[1].apres), run_time=0.3)
        L2 = self.lc([("= 50 hab", VERT_OK), ("pour 1 km²", VERT_OK)], -0.8, fs=38, xl=1.25)
        self.jouer(L2, [("50 habitants", 2), "pour 1"])
        L3 = self.lc([("Paris est", WHITE), ("400 fois", AMBRE), ("plus dense !", WHITE)], -1.55, fs=36, xl=1.0)
        self.jouer(L3, ["Paris", "400", "plus dense"])
        self.insister(L3[1], 1.2, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        gr = grille_paris(0.26)
        gr[3][7].set_fill(BARRE_C, 1)
        u = VGroup(gras("20 000", 40, WHITE), unite_barre("hab", "km²", fs=40)).arrange(RIGHT, buff=0.2)
        fig = sans(VGroup(u, gr).arrange(DOWN, buff=0.35))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("L'unité se calcule", "comme les nombres."),
            ("Une barre « / » se lit « par »,", "et « par » veut dire « pour 1 »."),
            ("On écrit l'unité à chaque ligne :", "elle dit ce que le résultat mesure.")], fs=34)
        self.au_mot("L'unité se calcule")
        self.montrer_ligne(lignes[0])
        self.au_mot("Une barre")
        self.montrer_ligne(lignes[1], Indicate(u[1].barre, color=BARRE_C, scale_factor=1.4))
        self.au_mot("On écrit")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_calcul()
        self.ecran_lire()
        self.ecran_question1()
        self.ecran_regle()
        self.ecran_question2()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PropGrandeurUnite4e(PropGrandeurUniteBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
