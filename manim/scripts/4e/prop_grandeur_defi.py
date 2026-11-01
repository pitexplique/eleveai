# prop_grandeur_defi.py
# EleveAI — Maths 4e — série « Proportionnalité », lot 4 (agrandissements et
# grandeurs), épisode 19 PROPRE À LA 4e : LE DÉFI DES GRANDEURS COMPOSÉES
# (micro du coach : grandeur_defi, notion grandeur_composee), AVEC VOIX.
# Paysage 16:9, CEINTURE VERTE (un défi garde la verte). Short jumeau :
# prop_grandeur_defi_short.py (blanche).
# ⭐ Méthode travaillée : un problème en ÉTAPES, l'unité écrite à chaque ligne :
# aire (m × m = m², puis m² → ha), rendement (t ÷ ha = t/ha, tableau ramené
# à 1 : ÷ 3 puis × 10), durée (m³ ÷ m³/h = h, puis 0,5 h = 30 min), prix au
# kilo (€ ÷ kg = €/kg, deux tableaux ramenés à 1). Pas de produit en croix (la
# voix ne l'utilise pas) ; « ÷ » écrit ; 1 h = 60 min (jamais 100).
# ⭐ Le geste : l'opération sur les NOMBRES et, alignée dessous, la même sur
# les UNITÉS ; la barre de l'unité ambre (« par » = « pour 1 ») ; le champ
# quadrillé en carrés de 1 ha (4 × 2,5 = 10) ; l'horloge à moitié pleine.
# ⭐ Leurres : erreur 3 « inverser » (question 1 : 7 ha/t) ; multiplier au lieu
# de diviser (question 1 : 112 t/ha = 28 × 4) ; 0,5 h = 50 min (question 2 :
# l'heure lue comme 100 min) et 250 min ; écran 08 : additionner deux
# grandeurs différentes (10 ha + 70 t = 80, barré).
#
# Décor et métier : AGRICULTURE, Fatou, AGRICULTRICE (blé) ; le champ, la
# pompe et les deux magasins sont inventés.
# Chiffre réel : Agreste (service statistique du ministère de l'Agriculture),
# récolte 2025 de blé tendre, rendement moyen France ≈ 7,4 t/ha (relevé du
# brief du lot 4, 31/10/2026).
# Centres d'intérêt : nature-ecologie, argent-budget.
#
# Écrans : 00 garde · 01 Fatou, champ 400 m × 250 m · 02 étape 1 l'aire
# (100 000 m² = 10 ha, champ quadrillé) · 03 étape 2 le rendement (tableau
# 3 → 1 → 10 ha, 21 → 7 → 70 t ; Agreste 7,4 t/ha) · 04 QUESTION 1 (4 ha,
# 28 t) · 05 étape 3 l'arrosage (600 ÷ 40 = 15 ; m³ ÷ m³/h = h) · 06 QUESTION 2
# (2,5 h en h et min) · 07 étape 4 les graines (1,50 €/kg contre 1,40 €/kg) ·
# 08 le piège (10 ha + 70 t = 80, barré) · 09 défi 900 m³ · 09b correction
# 22,5 h = 22 h 30 min · 10 ce que tu as appris · 11 fin.
#
# Voix : manim/voix/4e-prop-grandeur-defi.json (validée par Frédéric le 31/10,
# débit −10), WAV dans public/sons/4e-prop-grandeur-defi/ ; marques mot à mot :
# manim/scripts/4e/prop_grandeur_defi_marques.json (scripts/marques_dump.ps1
# puis un cues2marques qui garde une marque PAR OCCURRENCE, même séparées par
# une ponctuation : « 21 tonnes. 21 tonnes divisées »).
# Outils : manim/scripts/6e/prop_commun.py + manim/canvas_proportion.py (non
# modifiés) ; repris de prop_grandeur_unite.py : la base (question_pause qui
# n'audite plus les choix pendant la réponse), Operation, unite_barre().
# Ajouté ICI : fatou(), Champ (quadrillé en ha), epi(), pompe(), sac(),
# demi_heure() (l'horloge de 60 min à moitié pleine).
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/prop_grandeur_defi.py PropGrandeurDefi4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/4e/prop_grandeur_defi.py PropGrandeurDefi4e -o eleveai-maths-4e-prop-grandeur-defi --media_dir manim/media-prop-4e-19
# Sortie : manim/sorties/4e/maths/proportionnalite/19-grandeur-defi/eleveai-maths-4e-prop-grandeur-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403
from prop_agrandissement_rapport import gras, sans  # noqa: E402
from prop_grandeur_unite import BARRE_C, UNITE_C, Operation, PropGrandeurUniteBase, unite_barre  # noqa: E402

BLE = "#facc15"       # le blé mûr
BLE_F = "#a16207"     # ses épis, le bord du champ
TERRE = "#854d0e"
EAU = "#38bdf8"
ARDOISE = "#94a3b8"
ENCRE = "#0f172a"


def epi(s=1.0, couleur=BLE):
    """Un épi de blé : une tige et six grains en chevrons."""
    tige = Line(P(0, -0.5), P(0, 0.35), color="#ca8a04", stroke_width=4)
    grains = VGroup()
    for k in range(3):
        y = 0.05 + 0.14 * k
        for sx in (-1, 1):
            grains.add(Ellipse(width=0.1, height=0.2, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(
                P(0.06 * sx, y)).rotate(-0.5 * sx))
    grains.add(Ellipse(width=0.09, height=0.2, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(0, 0.5)))
    return VGroup(tige, grains).scale(s)


def fatou(s=1.0):
    """Fatou, agricultrice : tresses, tenue verte, chapeau de paille, un épi en main."""
    p = personne(peau="#7b4a2a", tenue="#15803d", cheveux="#111827", longs=True)
    bord = Ellipse(width=1.35, height=0.22, fill_color="#eab308", fill_opacity=1, stroke_color="#a16207",
                   stroke_width=2).move_to(P(0, 0.32))
    calotte = AnnularSector(inner_radius=0, outer_radius=0.4, angle=PI, start_angle=0, fill_color="#eab308",
                            fill_opacity=1, stroke_color="#a16207", stroke_width=2).move_to(P(0, 0.5))
    ruban = Rectangle(width=0.8, height=0.08, fill_color="#b91c1c", fill_opacity=1, stroke_width=0).move_to(P(0, 0.38))
    e = epi(0.85).move_to(P(0.78, -0.95))
    g = VGroup(p, calotte, ruban, bord, e)
    g.corps, g.epi = p.corps, e
    return g.scale(s)


class Champ(VGroup):
    """Le champ de blé vu d'en haut, l × h (en centaines de mètres) à u par
    100 m : fond doré, rangs d'épis, et la grille des carrés de 1 ha
    (.carres : 4 × 2 carrés pleins + 4 demi-carrés, dans l'ordre de lecture)."""

    def __init__(self, l=4, h=2.5, u=1.1, **kw):
        super().__init__(**kw)
        W, H = l * u, h * u
        self.fond = Rectangle(width=W, height=H, fill_color="#eab308", fill_opacity=1, stroke_color=BLE_F,
                              stroke_width=5)
        rangs = VGroup(*[Line(P(-W / 2 + 0.12, y), P(W / 2 - 0.12, y), color="#ca8a04", stroke_width=3)
                         for y in np.arange(-H / 2 + 0.18, H / 2 - 0.1, 0.22)])
        self.add(self.fond, rangs)
        self.carres = VGroup()
        y = H / 2
        while y > -H / 2 + 1e-6:
            hh = min(u, y + H / 2)
            for i in range(int(l)):
                self.carres.add(Rectangle(width=u, height=hh, stroke_color=WHITE, stroke_width=3, fill_color=BLE,
                                          fill_opacity=0).move_to(P(-W / 2 + (i + 0.5) * u, y - hh / 2)))
            y -= hh
        self.u, self.W, self.H = u, W, H

    def grille(self):
        """Les carrés de 1 ha, recalés sur le champ (ils n'en font pas partie :
        on les trace au mot)."""
        return self.carres.move_to(self.fond)

    def lab_l(self, s, fs=30, couleur=WHITE):
        return gras(s, fs, couleur).next_to(self.fond, DOWN, buff=0.15)

    def lab_h(self, s, fs=30, couleur=WHITE):
        return gras(s, fs, couleur).next_to(self.fond, RIGHT, buff=0.15)


def pompe(s=1.0):
    """La pompe : un moteur bleu, un manomètre, un tuyau, un jet d'eau. .jet"""
    corps = RoundedRectangle(width=1.1, height=0.8, corner_radius=0.12, fill_color="#1d4ed8", fill_opacity=1,
                             stroke_width=0)
    socle = Rectangle(width=1.4, height=0.14, fill_color="#334155", fill_opacity=1, stroke_width=0).move_to(
        P(0, -0.47))
    mano = VGroup(Circle(radius=0.2, fill_color=WHITE, fill_opacity=1, stroke_color="#334155", stroke_width=3),
                  Line(ORIGIN, P(0.12, 0.08), color="#dc2626", stroke_width=4)).move_to(P(-0.2, 0.05))
    tuyau = Rectangle(width=0.9, height=0.16, fill_color="#64748b", fill_opacity=1, stroke_width=0).move_to(
        P(0.95, 0.15))
    jet = VGroup(*[Arc(radius=0.55 + 0.12 * k, start_angle=PI / 2, angle=-PI / 2.4, color=EAU, stroke_width=5)
                   .move_to(P(1.7 + 0.08 * k, 0.4 + 0.05 * k)) for k in range(3)])
    g = VGroup(socle, corps, mano, tuyau, jet)
    g.jet = jet
    return g.scale(s)


def sac(s=1.0, couleur="#d6d3d1", lettre="A"):
    """Un sac de graines, fermé par une ficelle, la lettre du magasin dessus."""
    corps = Polygon(P(-0.42, -0.55), P(0.42, -0.55), P(0.5, 0.25), P(0.32, 0.45), P(-0.32, 0.45), P(-0.5, 0.25),
                    fill_color=couleur, fill_opacity=1, stroke_color="#78716c", stroke_width=3)
    noeud = Rectangle(width=0.5, height=0.07, fill_color="#92400e", fill_opacity=1, stroke_width=0).move_to(
        P(0, 0.36))
    l = Text(lettre, font_size=34, color=ENCRE, weight=BOLD).move_to(P(0, -0.1))
    l.sans_synchro = True
    l._pas_audit = True
    return VGroup(corps, noeud, l, epi(0.4, "#ca8a04").move_to(P(0.22, -0.28))).scale(s)


def demi_heure(r=0.75):
    """L'horloge d'une heure (60 min) : 12 traits ; .moitie = la demi-heure
    (secteur vert de 12 h à 6 h, à faire entrer au mot)."""
    c = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color="#475569", stroke_width=5)
    moitie = Sector(radius=r - 0.04, angle=-PI, start_angle=PI / 2, fill_color="#4ade80", fill_opacity=0,
                    stroke_width=0).shift(P(0, 0))
    traits = VGroup(*[Line(P(0.8 * r * np.cos(a), 0.8 * r * np.sin(a)), P(0.92 * r * np.cos(a), 0.92 * r * np.sin(a)),
                           color=ENCRE, stroke_width=3) for a in np.linspace(0, 2 * PI, 13)[:-1]])
    aig = Line(ORIGIN, P(0, -0.7 * r), color="#dc2626", stroke_width=5)
    g = VGroup(c, moitie, traits, Dot(ORIGIN, radius=0.05, color=ENCRE))
    g.moitie, g.aiguille, g.cadran = moitie, aig, c
    return g


class PropGrandeurDefiBase(PropGrandeurUniteBase):
    nom_voix = "4e-prop-grandeur-defi"
    fichier_marques = "prop_grandeur_defi_marques.json"

    def tab(self, libelles, nombres, centre, fs=30, lc=1.25, ll=2.3, h=0.7):
        """Le tableau du coach, valeurs posées au mot."""
        return TableauProp(libelles, nombres, montrer=False, largeur_case=lc, largeur_libelle=ll, hauteur=h, fs=fs,
                           centre=centre)

    def titre_etape(self, s, mot, x=-3.0, y=3.1, fs=42):
        """« Étape 1 : l'aire » en haut à gauche, écrit au mot."""
        t = self.t(s, fs, JAUNE_TITRE).move_to(P(x, y))
        self.au_mot(mot)
        self.play(Write(t), run_time=0.5)
        return t

    def op(self, haut, bas, fs=40, fs_u=34, dy=0.75, buff=0.32, res=VERT_OK):
        """Operation : nombres (le dernier en vert) et unités dessous ; un item
        de `bas` qui est un couple (avant, après) devient une unité à barre."""
        h = [gras(s, fs, res if i == len(haut) - 1 else WHITE) for i, s in enumerate(haut)]
        b = [unite_barre(*s, fs=fs_u) if isinstance(s, tuple) else gras(s, fs_u, UNITE_C) for s in bas]
        return Operation(h, b, fs=fs, buff=buff, dy=dy)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défis : les grandeurs composées", self.identite, self.ceinture, y_ech=-2.45)
        ch = Champ(4, 2.5, 0.62).move_to(P(-3.9, 0.45))
        self.au_mot("Défis")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(ch, scale=0.8), run_time=0.8)
        q = VGroup(self.t("Une récolte,", 42), self.t("étape par étape", 42, AMBRE)).arrange(DOWN, buff=0.16)
        q.move_to(P(2.3, 0.0))
        self.au_mot("Une récolte")
        epis = VGroup(*[epi(0.7).move_to(P(-5.1 + 0.6 * k, -1.05)) for k in range(5)])
        self.play(FadeIn(q[0], shift=UP * 0.15), LaggedStart(*[GrowFromEdge(e, DOWN) for e in epis], lag_ratio=0.15),
                  run_time=0.6)
        self.au_mot("étape par")
        self.play(FadeIn(q[1], scale=1.15), run_time=0.45)
        self.insister(q[1], 1.12, 0.25)
        self.attendre_voix(marge=0.6)

    # ── 01 : Fatou, agricultrice ; le champ 400 m sur 250 m ─────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = fatou(0.9).move_to(P(-5.45, -0.75))
        nom = self.t("Fatou", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.au_mot("Voici Fatou")
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        met = self.t("agricultrice", 30, BLEU_CALCUL).next_to(pers, DOWN, buff=0.15)
        self.au_mot("agricultrice")
        self.play(FadeIn(met, shift=DOWN * 0.1), Indicate(pers.epi, color=YELLOW), run_time=0.6)
        ch = Champ(4, 2.5, 0.65).move_to(P(-2.5, 0.85))
        self.au_mot("du blé")
        self.play(FadeIn(ch, scale=0.9), run_time=0.5)
        L1 = self.lc([("Champ :", WHITE), ("400 m", BLEU_CALCUL), ("sur", WHITE), ("250 m", BLEU_CALCUL)], 2.2, fs=38,
                     xl=1.0)
        ll, lh = ch.lab_l("400 m", 30, BLEU_CALCUL), ch.lab_h("250 m", 30, BLEU_CALCUL)
        self.jouer(L1, ["Son champ", "400", "sur", "250"],
                   {1: [FadeIn(ll, shift=UP * 0.1)], 3: [FadeIn(lh, shift=LEFT * 0.1)]})
        self.play(Circumscribe(ch.fond, color=AMBRE, buff=0.05), run_time=0.6)
        L2 = self.lc([("Blé récolté :", WHITE), ("? t", ORANGE_RETENUE)], 0.95, fs=40, xl=1.0)
        sans(L2[1])
        self.jouer(L2, ["Combien de tonnes", None])
        L3 = self.lc([("Arrosage :", WHITE), ("? h", ORANGE_RETENUE)], 0.05, fs=40, xl=1.0)
        sans(L3[1])
        pp = pompe(0.55).move_to(P(-2.6, -1.75))
        self.jouer(L3, ["combien de temps", None], {0: [FadeIn(pp, shift=UP * 0.15)]})
        self.play(Indicate(L2[1], color=ORANGE_RETENUE, scale_factor=1.3),
                  Indicate(L3[1], color=ORANGE_RETENUE, scale_factor=1.3), run_time=0.6)
        self.attendre_voix()

    # ── 02 : étape 1 : l'aire, puis les hectares ────────────────────────────
    def ecran_aire(self):
        self.ecran("02-aire")
        self.titre_etape("Étape 1 : l'aire", "Étape 1", x=-3.4)
        ch = Champ(4, 2.5, 1.1).move_to(P(-3.4, 0.55))
        self.play(FadeIn(ch, scale=0.95), run_time=0.4)
        o = self.op(["400", "×", "250", "=", "100 000"], ["m", "×", "m", "=", "m²"])
        if o.width > 5.1:
            o.scale_to_fit_width(5.1)
        o.move_to(P(0, 2.2)).align_to(P(0.9, 0), LEFT).set_y(1.85)
        h, b = o.haut, o.bas
        ll, lh = ch.lab_l("400 m", 30, BLEU_CALCUL), ch.lab_h("250 m", 30, BLEU_CALCUL)
        self.au_mot("400")
        self.play(FadeIn(h[0], shift=RIGHT * 0.12), FadeIn(b[0], shift=UP * 0.12), FadeIn(ll, shift=UP * 0.1),
                  run_time=0.35)
        self.au_mot("fois")
        self.play(FadeIn(h[1], scale=1.3), FadeIn(b[1], scale=1.3), run_time=0.25)
        self.au_mot("250")
        self.play(FadeIn(h[2], shift=RIGHT * 0.12), FadeIn(b[2], shift=UP * 0.12), FadeIn(lh, shift=LEFT * 0.1),
                  run_time=0.35)
        self.au_mot("égale")
        self.play(FadeIn(h[3]), FadeIn(b[3]), run_time=0.2)
        self.au_mot("100 000")
        self.play(FadeIn(h[4], scale=1.3), FadeIn(b[4], shift=UP * 0.12), ch.fond.animate.set_fill("#fbbf24"),
                  run_time=0.4)
        self.play(Indicate(b[4], color=UNITE_C, scale_factor=1.3), run_time=0.5)
        L1 = self.lc([("En hectares :", WHITE), ("ha", UNITE_C)], 0.35, fs=38, xl=0.9)
        self.jouer(L1, ["comptent en", None])
        ch.grille()
        c0 = ch.carres[0]
        c0.set_fill(AMBRE, 0.9)
        cote = sans(gras("100 m", 26, AMBRE)).next_to(c0, UP, buff=0.08)
        L2 = self.lc([("1 ha", AMBRE), ("=", WHITE), ("10 000 m²", AMBRE)], -0.45, fs=40, xl=0.9)
        self.au_mot("1 hectare")
        self.play(FadeIn(L2[0], shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("un carré")
        self.play(Create(c0), run_time=0.45)
        self.au_mot("100 m")
        self.play(FadeIn(cote, shift=DOWN * 0.1), run_time=0.3)
        self.jouer(L2[1:], [None, "10 000"])
        L3 = self.lc([("100 000 ÷", WHITE), ("10 000", WHITE)], -1.25, fs=40, xl=0.9)
        self.jouer(L3, ["100 000 divisé", ("10 000", 2)])
        L3b = self.lc([("=", WHITE), ("10 ha", VERT_OK)], -2.05, fs=44, xl=0.9)
        L3b[1].shift(RIGHT * 0.15)
        self.jouer(L3b, ["égale 10 hec", "10 hectares"],
                   {1: [LaggedStart(*[Create(c) for c in ch.carres[1:]], lag_ratio=0.08)]})
        bx = self.boite(L3b[1])
        self.play(Create(bx), run_time=0.35)
        self.insister(VGroup(bx, L3b[1]), 1.12, 0.25)
        self.attendre_voix()

    # ── 03 : étape 2 : le rendement (tableau ramené à 1 ha, puis × 10) ──────
    def ecran_rendement(self):
        self.ecran("03-rendement")
        self.titre_etape("Étape 2 : le rendement", "Étape 2", x=-3.0)
        tb = self.tab(["Surface (ha)", "Blé (t)"], [[3, 1, 10], [21, 7, 70]], P(-2.95, 0.95))
        self.play(FadeIn(tb.fond, shift=DOWN * 0.15), run_time=0.4)
        self.au_mot("3 hectares")
        self.play(FadeIn(tb.valeur(0, 0), scale=1.3), run_time=0.3)
        self.au_mot("21 tonnes")
        self.play(FadeIn(tb.valeur(1, 0), scale=1.3), run_time=0.3)
        o = self.op(["21", "÷", "3", "=", "7"], ["t", "÷", "ha", "=", ("t", "ha")], fs=44, fs_u=38, dy=0.8, buff=0.4)
        o.move_to(P(-2.95, -1.6))
        h, b = o.haut, o.bas
        f1, f2 = tb.fleche_col(0, 1, "÷ 3", ligne=0), tb.fleche_col(0, 1, "÷ 3", ligne=1)
        un = sans(VGroup(tb.valeur(0, 1)))
        self.au_mot("21 tonnes", 2)
        self.play(FadeIn(h[0], shift=RIGHT * 0.12), FadeIn(b[0], shift=UP * 0.12), Indicate(tb.case(1, 0)),
                  run_time=0.35)
        self.au_mot("divisées")
        self.play(FadeIn(h[1], scale=1.3), FadeIn(b[1], scale=1.3), run_time=0.25)
        self.au_mot("3 hectares", 2)
        self.play(FadeIn(h[2], shift=RIGHT * 0.12), FadeIn(b[2], shift=UP * 0.12), run_time=0.3)
        self.play(Create(f1.fleche), FadeIn(f1.etiquette), Create(f2.fleche), FadeIn(f2.etiquette),
                  FadeIn(un, scale=1.3), run_time=0.45)
        self.au_mot("égale 7")
        self.play(FadeIn(h[3]), FadeIn(b[3]), run_time=0.2)
        self.au_mot("7 tonnes")
        self.play(FadeIn(h[4], scale=1.3), FadeIn(b[4].avant, shift=UP * 0.1), FadeIn(tb.valeur(1, 1), scale=1.3),
                  tb.allumer(1, 1), run_time=0.4)
        self.au_mot("par hectare")
        self.play(FadeIn(b[4].barre, scale=1.4), FadeIn(b[4].apres, shift=UP * 0.1), run_time=0.3)
        self.play(Circumscribe(b[4].barre, color=BARRE_C, buff=0.06), run_time=0.5)
        S1 = self.lc([("Source : Agreste", ARDOISE)], 2.3, fs=30, xl=1.0)
        self.jouer(S1, ["Agreste"])
        S2 = self.lc([("moyenne française :", WHITE)], 1.6, fs=36, xl=1.0)
        self.jouer(S2, ["moyenne"])
        S3 = self.lc([("≈ 7,4 t/ha", AMBRE), ("en 2025", ARDOISE)], 0.9, fs=38, xl=1.0)
        self.jouer(S3, ["7,4", "2025"])
        L4 = self.lc([("Pour", WHITE), ("10 ha :", WHITE)], -0.15, fs=40, xl=1.0)
        f3, f4 = tb.fleche_col(1, 2, "× 10", ligne=0), tb.fleche_col(1, 2, "× 10", ligne=1)
        self.jouer(L4, ["Pour 10", "10 hectares"], {1: [FadeIn(tb.valeur(0, 2), scale=1.3)]})
        L5 = self.lc([("7 × 10", WHITE), ("=", WHITE), ("70 t", VERT_OK)], -1.0, fs=44, xl=1.0)
        L5[2].shift(RIGHT * 0.15)
        self.jouer(L5, ["7 fois", "égale 70", "70 tonnes"],
                   {0: [Create(f3.fleche), FadeIn(f3.etiquette), Create(f4.fleche), FadeIn(f4.etiquette)],
                    2: [FadeIn(tb.valeur(1, 2), scale=1.3), tb.allumer(1, 2)]})
        bx = self.boite(L5[2])
        self.play(Create(bx), run_time=0.35)
        self.insister(VGroup(bx, L5[2]), 1.12, 0.25)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (4 ha donnent 28 t : le rendement ?) ────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        ch = Champ(4, 1, 1.1).move_to(P(-3.6, 0.6))
        ch.grille()
        self.add(ch, ch.carres)

        def apres(sc):
            sc.au_mot("28 tonnes")
            sc.rep(0)
            sc.au_mot("7 tonnes")
            sc.play(ch.carres[0].animate.set_fill(AMBRE, 0.9), run_time=0.3)
            sc.play(Indicate(ch.carres[0], color=AMBRE, scale_factor=1.15), run_time=0.5)
            sc.rep_fin()

        self.question_pause("04-question", "04b-reponse",
                            ["4 ha : 28 t de blé.", "Quel est le rendement ?"],
                            [self.t("7 t/ha", 34), self.t("7 ha/t", 34), self.t("112 t/ha", 34)], 0,
                            ["28 t ÷ 4 ha = 7 t/ha"], mot_q="4 hectares", autres_r=apres)

    # ── 05 : étape 3 : l'arrosage ; m³ ÷ m³/h = h ───────────────────────────
    def ecran_arrosage(self):
        self.ecran("05-arrosage")
        self.titre_etape("Étape 3 : l'arrosage", "Étape 3", x=-3.0)
        pp = pompe(0.95).move_to(P(-3.6, 1.55))
        self.play(FadeIn(pp, shift=UP * 0.2), run_time=0.4)
        tb = self.tab(["Durée (h)", "Eau (m³)"], [[1, "?"], [40, 600]], P(-3.1, -1.2), lc=1.5, ll=2.4, h=0.72)
        self.play(FadeIn(tb.fond, shift=DOWN * 0.15), run_time=0.35)
        self.au_mot("600")
        self.play(FadeIn(tb.valeur(1, 1), scale=1.3), FadeIn(tb.trou(0, 1), scale=1.2), run_time=0.35)
        un = sans(VGroup(tb.valeur(0, 0)))
        self.au_mot("40")
        self.play(FadeIn(tb.valeur(1, 0), scale=1.3), FadeIn(un, scale=1.3),
                  LaggedStart(*[Create(a) for a in pp.jet], lag_ratio=0.2), run_time=0.5)
        D = VGroup(gras("40", 38, WHITE), unite_barre("m³", "h", fs=38)).arrange(RIGHT, buff=0.18)
        D.next_to(pp, DOWN, buff=0.2)
        sans(D[0])
        self.au_mot("par heure")
        self.play(FadeIn(D, shift=UP * 0.1), run_time=0.35)
        o = self.op(["600", "÷", "40", "=", "15"], ["m³", "÷", ("m³", "h"), "=", "h"], fs=44, fs_u=38, dy=0.8,
                    buff=0.38)
        if o.width > 5.1:
            o.scale_to_fit_width(5.1)
        o.move_to(P(0, 1.6)).align_to(P(1.0, 0), LEFT)
        h, b = o.haut, o.bas
        self.au_mot("600 divisé")
        self.play(FadeIn(h[0], shift=RIGHT * 0.12), FadeIn(h[1], scale=1.3), run_time=0.3)
        self.au_mot("par 40")
        self.play(FadeIn(h[2], shift=RIGHT * 0.12), run_time=0.3)
        self.au_mot("égale 15")
        self.play(FadeIn(h[3]), run_time=0.2)
        self.au_mot("15")
        self.play(FadeIn(h[4], scale=1.3), tb.remplir(0, 1, 15), tb.allumer(0, 1), run_time=0.4)
        self.au_mot("Des mètres")
        self.play(FadeIn(b[0], shift=UP * 0.12), run_time=0.3)
        self.au_mot("divisés")
        self.play(FadeIn(b[1], scale=1.3), run_time=0.25)
        self.au_mot("des mètres cubes par")
        self.play(FadeIn(b[2], shift=UP * 0.12), run_time=0.3)
        self.au_mot("des heures")
        self.play(FadeIn(b[3]), FadeIn(b[4], scale=1.4), run_time=0.3)
        self.play(Indicate(b[4], color=UNITE_C, scale_factor=1.4), run_time=0.5)
        L = self.lc([("La pompe tourne", WHITE), ("15 h", VERT_OK)], -0.6, fs=40, xl=1.0)
        L[1].shift(RIGHT * 0.15)
        self.jouer(L, ["La pompe", "15 heures"])
        bx = self.boite(L[1])
        self.play(Create(bx), run_time=0.35)
        self.insister(VGroup(bx, L[1]), 1.12, 0.25)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (2,5 h en heures et minutes) ────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        hz = demi_heure(1.2).move_to(P(-3.6, 0.5))
        lab = sans(gras("1 h = 60 min", 34, WHITE)).next_to(hz, DOWN, buff=0.3)
        self.add(hz)

        def apres(sc):
            sc.au_mot("0,5 heure")
            sc.rep(0)
            sc.au_mot("la moitié")
            sc.play(hz.moitie.animate.set_fill(opacity=0.85), run_time=0.4)
            sc.au_mot("60 minutes")
            sc.play(FadeIn(lab, shift=UP * 0.1), run_time=0.3)
            sc.au_mot("30 minutes")
            sc.rep(1)
            sc.rep_fin()

        self.question_pause("06-question", "06b-reponse",
                            ["Une pompe tourne 2,5 h.", "En heures et minutes ?"],
                            [self.t("2 h 50 min", 34), self.t("2 h 30 min", 34), self.t("250 min", 34)], 1,
                            ["0,5 h = moitié de 60 min", "= 30 min → 2 h 30 min"], mot_q="Une pompe",
                            autres_r=apres)

    # ── 07 : étape 4 : les graines ; deux tableaux ramenés à 1 kg ───────────
    def magasin(self, lettre, masse, prix, unite_prix, y, mots):
        """Le sac et le tableau d'un magasin (masse au mot, prix au mot)."""
        s = sac(0.85, "#d6d3d1" if lettre == "A" else "#fde68a", lettre).move_to(P(-5.75, y))
        tb = self.tab(["Masse (kg)", "Prix (€)"], [[masse, 1], [prix, unite_prix]], P(-2.75, y), fs=30, lc=1.25,
                      ll=2.1, h=0.65)
        self.au_mot(mots[0])
        self.play(FadeIn(s, shift=UP * 0.2), FadeIn(tb.fond, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot(mots[1])
        self.play(FadeIn(tb.valeur(0, 0), scale=1.3), run_time=0.3)
        self.au_mot(mots[2])
        self.play(FadeIn(tb.valeur(1, 0), scale=1.3), run_time=0.3)
        return s, tb

    def ramener(self, tb, L, mots, d, res):
        """« A : 45 ÷ 30 = 1,50 €/kg » au mot, la flèche ÷ d sur le tableau."""
        self.jouer(L[:2], mots[:2])
        f2 = tb.fleche_col(0, 1, f"÷ {d}", ligne=1)
        self.au_mot(mots[2])
        self.play(Create(f2.fleche), FadeIn(f2.etiquette), run_time=0.4)
        self.au_mot(mots[3])
        self.play(FadeIn(L[2], shift=RIGHT * 0.15), tb.remplir(1, 1, res), tb.allumer(1, 1), run_time=0.4)

    def ecran_prix(self):
        self.ecran("07-prix")
        self.titre_etape("Étape 4 : les graines", "Étape 4", x=-3.0)
        sa, ta = self.magasin("A", 30, 45, "?", 1.4, ["magasin A", "30 kg", "45 euros"])
        sb, tbb = self.magasin("B", 50, 70, "?", -1.15, ["magasin B", "50 kg", "70 euros"])
        uns = sans(VGroup(ta.valeur(0, 1), tbb.valeur(0, 1)))
        self.au_mot("un kilo")
        self.play(FadeIn(uns, scale=1.3), FadeIn(ta.trou(1, 1), scale=1.2), FadeIn(tbb.trou(1, 1), scale=1.2),
                  ta.allumer(0, 1), tbb.allumer(0, 1), run_time=0.45)
        RA = self.lc([("A :", WHITE), ("45 ÷ 30", WHITE), ("= 1,50 €/kg", VERT_OK)], 2.0, fs=38, xl=0.75)
        RB = self.lc([("B :", WHITE), ("70 ÷ 50", WHITE), ("= 1,40 €/kg", VERT_OK)], 1.15, fs=38, xl=0.75)
        RB.align_to(RA, LEFT)
        self.ramener(ta, RA, ["A : 45", "45 divisé", "par 30", "égale 1,50"], 30, "1,50")
        self.ramener(tbb, RB, ["B : 70", "70 divisé", "par 50", "égale 1,40"], 50, "1,40")
        tp = self.tampon("B : moins cher au kilo", fs=34).move_to(P(3.3, -0.2))
        self.au_mot("moins cher")
        self.play(FadeIn(tp, scale=1.3), Circumscribe(RB[2], color=VERT_OK, buff=0.08), run_time=0.5)
        L = self.lc([("même si on paie plus !", AMBRE)], -1.1, fs=36, xl=0.75)
        self.jouer(L, ["même si"], {0: [Indicate(tbb.case(1, 0), color=AMBRE)]})
        self.insister(tp, 1.06, 0.25)
        self.attendre_voix()

    # ── 08 : le piège : 10 ha + 70 t = 80, ça ne veut rien dire ─────────────
    def carte2(self, n, u, couleur=WHITE):
        tn, tu = gras(n, 40, couleur), gras(u, 40, UNITE_C)
        lg = VGroup(tn, tu).arrange(RIGHT, buff=0.15)
        r = RoundedRectangle(width=lg.width + 0.45, height=lg.height + 0.4, corner_radius=0.12, fill_color="#1e293b",
                             fill_opacity=1, stroke_color=couleur, stroke_width=3)
        g = VGroup(r, lg.move_to(r))
        g.nombre, g.unite, g.cadre = tn, tu, r
        return g

    def ecran_piege(self):
        self.ecran("08-piege")
        tit = self.t("Attention au piège !", 44, ROUGE_ERREUR).move_to(P(-2.9, 3.1))
        self.au_mot("Attention")
        self.play(Write(tit), run_time=0.5)
        pers = fatou(0.7).move_to(P(-5.6, -1.75))
        self.au_mot("Fatou")
        self.play(FadeIn(pers, shift=UP * 0.2), run_time=0.4)
        c1, c2 = self.carte2("10", "ha"), self.carte2("70", "t")
        plus, egal = gras("+", 44, WHITE), gras("= 80 ?", 44, ROUGE_ERREUR)
        rang = VGroup(c1, plus, c2, egal).arrange(RIGHT, buff=0.25).move_to(P(-2.6, 1.7))
        self.au_mot("10 hectares")
        self.play(FadeIn(c1, shift=DOWN * 0.15), FadeIn(plus, scale=1.3), run_time=0.35)
        self.au_mot("70 tonnes")
        self.play(FadeIn(c2, shift=DOWN * 0.15), run_time=0.35)
        self.au_mot("80")
        self.play(FadeIn(egal, scale=1.3), run_time=0.35)
        cx = croix(rang, sw=7)
        self.au_mot("rien dire")
        self.play(Create(cx), run_time=0.4)
        self.play(FadeOut(VGroup(cx, plus, egal)), c1.animate.move_to(P(-2.6, 0.3)), c2.animate.move_to(P(-2.6, -0.9)),
                  run_time=0.5)
        L1 = self.lc([("Une ligne,", WHITE)], 1.6, fs=42, xl=1.0)
        self.jouer(L1, ["Une ligne"], {0: [Circumscribe(c1, color=WHITE), Circumscribe(c2, color=WHITE)]})
        L2 = self.lc([("une grandeur,", AMBRE)], 0.75, fs=42, xl=1.0)
        g1 = self.t("aire", 32, AMBRE).next_to(c1, LEFT, buff=0.3)
        g2 = self.t("masse", 32, AMBRE).next_to(c2, LEFT, buff=0.3)
        self.jouer(L2, ["une grandeur"], {0: [FadeIn(g1, shift=RIGHT * 0.1), FadeIn(g2, shift=RIGHT * 0.1)]})
        L3 = self.lc([("une unité.", UNITE_C)], -0.1, fs=42, xl=1.0)
        self.jouer(L3, ["une unité"], {0: [Indicate(c1.unite, color=UNITE_C, scale_factor=1.4),
                                           Indicate(c2.unite, color=UNITE_C, scale_factor=1.4)]})
        self.insister(L3[0], 1.15, 0.25)
        self.attendre_voix()

    # ── 09 : défi : 900 m³ avec la pompe de 40 m³/h ─────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-2.6, 3.1))
        self.au_mot("À toi de jouer")
        self.play(Write(tit), run_time=0.6)
        pp = pompe(1.1).move_to(P(-3.7, 1.0))
        ch = Champ(4, 2.5, 0.6).move_to(P(-3.3, -1.55))
        L0 = self.lc([("Eau :", WHITE), ("900 m³", BLEU_CALCUL)], 2.2, fs=42, xl=1.0)
        self.jouer(L0, ["Fatou doit", "900"], {0: [FadeIn(ch, scale=0.9)]})
        L1 = self.lc([("Pompe :", WHITE), ("40 m³/h", BLEU_CALCUL)], 1.4, fs=42, xl=1.0)
        self.jouer(L1, ["sa pompe", "40"], {0: [FadeIn(pp, shift=UP * 0.2)],
                                           1: [LaggedStart(*[Create(a) for a in pp.jet], lag_ratio=0.2)]})
        L2 = self.lc([("Durée :", WHITE), ("? h ? min", ORANGE_RETENUE)], 0.5, fs=44, xl=1.0)
        sans(L2[1])
        self.jouer(L2, ["Combien de temps", "en heures"])
        self.play(Indicate(L2[1], color=ORANGE_RETENUE, scale_factor=1.3), run_time=0.6)
        self.pause_defi(y=-0.6)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-2.6, 3.1))
        self.play(Write(tit), run_time=0.5)
        tb = self.tab(["Durée (h)", "Eau (m³)"], [[1, "?"], [40, 900]], P(-3.1, 1.2), lc=1.5, ll=2.4, h=0.72)
        self.play(FadeIn(tb.fond, shift=DOWN * 0.15), FadeIn(tb.trou(0, 1)), run_time=0.4)
        o = self.op(["900", "÷", "40", "=", "22,5"], ["m³", "÷", ("m³", "h"), "=", "h"], fs=44, fs_u=38, dy=0.8,
                    buff=0.38)
        if o.width > 5.1:
            o.scale_to_fit_width(5.1)
        o.move_to(P(0, 1.95)).align_to(P(1.0, 0), LEFT)
        h, b = o.haut, o.bas
        un = sans(VGroup(tb.valeur(0, 0)))
        self.au_mot("900")
        self.play(FadeIn(h[0], shift=RIGHT * 0.12), FadeIn(b[0], shift=UP * 0.12), FadeIn(tb.valeur(1, 1), scale=1.3),
                  run_time=0.35)
        self.au_mot("divisé")
        self.play(FadeIn(h[1], scale=1.3), FadeIn(b[1], scale=1.3), run_time=0.25)
        self.au_mot("40")
        self.play(FadeIn(h[2], shift=RIGHT * 0.12), FadeIn(b[2], shift=UP * 0.12), FadeIn(tb.valeur(1, 0), scale=1.3),
                  FadeIn(un, scale=1.3), run_time=0.35)
        self.au_mot("égale")
        self.play(FadeIn(h[3]), FadeIn(b[3]), run_time=0.2)
        self.au_mot("22,5")
        self.play(FadeIn(h[4], scale=1.3), tb.remplir(0, 1, "22,5"), tb.allumer(0, 1), run_time=0.4)
        self.au_mot("heures")
        self.play(FadeIn(b[4], scale=1.4), run_time=0.3)
        hz = demi_heure(0.8).move_to(P(-3.6, -1.6))
        L1 = self.lc([("0,5 h", WHITE), ("= 30 min", AMBRE)], 0.2, fs=42, xl=1.0)
        self.jouer(L1, ["0,5 heure", "30 minutes"], {0: [FadeIn(hz, scale=0.8)],
                                                       1: [hz.moitie.animate.set_fill(opacity=0.85)]})
        L2 = self.lc([("La pompe tourne", WHITE)], -0.7, fs=40, xl=1.0)
        self.jouer(L2, ["La pompe"])
        L3 = self.lc([("22 h", VERT_OK), ("30 min", VERT_OK)], -1.55, fs=46, xl=1.0)
        self.jouer(L3, ["22 heures", ("30 minutes", 2)])
        bx = self.boite(L3)
        self.play(Create(bx), run_time=0.35)
        self.insister(VGroup(bx, L3), 1.08, 0.25)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        ch = Champ(4, 2.5, 0.5)
        ch.grille()
        ch.carres[0].set_fill(AMBRE, 0.9)
        fig = sans(VGroup(ch, ch.carres, epi(0.9).next_to(ch, DOWN, buff=0.25)))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Dans un défi, étape par étape :", "l'unité à chaque ligne."),
            ("D'abord la grandeur pour 1 unité,", "puis on multiplie."),
            ("On convertit : 1 ha = 10 000 m²,", "1 h = 60 min.")], fs=34)
        self.au_mot("Dans un")
        self.montrer_ligne(lignes[0])
        self.au_mot("On calcule")
        self.montrer_ligne(lignes[1], Indicate(ch.carres[0], color=AMBRE, scale_factor=1.3))
        self.au_mot("Et on convertit")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_aire()
        self.ecran_rendement()
        self.ecran_question1()
        self.ecran_arrosage()
        self.ecran_question2()
        self.ecran_prix()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class PropGrandeurDefi4e(PropGrandeurDefiBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
