# prop_defi.py
# EleveAI — Maths 6e — série « Proportionnalité », lot 1, épisode 06 : DÉFIS
# DE PROPORTIONNALITÉ (micro du coach : prop_defi, notion
# prop_proportionnalite), AVEC VOIX. Paysage 16:9, CEINTURE VERTE (la paysage
# complète du niveau, comme les épisodes 01 à 05 ; l'orange est AU-DESSOUS de
# la verte dans l'échelle du judo : elle dirait « plus facile », pas « défi »).
# Short jumeau : prop_defi_short.py (blanche).
# ⭐ Méthodes réinvesties : la LINÉARITÉ (découper 250 = 100 + 100 + 50, la
# moitié, additionner) et le « 3 fois plus » (300 = 3 × 100 ; 24 = 3 × 8) ;
# le PIÈGE « tout n'est pas proportionnel » (deux cars en même temps).
# ⛔ Pas de produit en croix (6e) ; « ÷ » pour une division.
# ⭐ Leurres (consigne-videos-proportionnalite.md) : 1. ajouter au lieu de
# multiplier (question 1 : 230 L = 30 + 200 ; 33 L = 30 + 3) ; 2. croire
# tout proportionnel (le piège des cars : 4 h ; question 2 : 60 min ; 15 min
# = le coefficient inversé, erreur 3).
#
# Décor et métier : TRANSPORTS, Chloé, CONDUCTRICE DE CAR SCOLAIRE : la
# sortie scolaire de 250 km ; consommation 30 L pour 100 km (ordre de
# grandeur réel d'un autocar : 25 à 35 L/100 km — donnée arrondie, présentée
# comme celle de SON car, pas comme une statistique) ; défi : le musée
# (8 entrées 36 €, prix fictif). Centres d'intérêt : transports, jeux-defis.
#
# Micro → écrans : situation (01) ; découper un grand nombre (02) ; calculer
# par morceaux, avec la jauge et le tableau (03) ; QUESTION 1 (04, 300 km) ;
# le piège des deux cars (05) ; QUESTION 2 (06, deux gâteaux au four) ; défi
# du musée (07) et correction (07b) ; ce que tu as appris (08) ; fin (09).
#
# Voix : manim/voix/6e-prop-defi.json (validée par Frédéric, débit −10),
# WAV dans public/sons/6e-prop-defi/ ; marques mot à mot :
# manim/scripts/6e/prop_defi_marques.json (scripts/marques_dump.ps1 puis
# scripts/cues2marques.py).
# Outils : prop_commun.py + manim/canvas_proportion.py (non modifiés).
# Ajouté ICI (absent du module) : car_scolaire(), chloe(), Route (tronçons),
# Jauge (la jauge de gazole qui se remplit), horloge(), four(), gateau(),
# musee() ; ligne_rep surchargée (celle de prop_tableau.py : même taille que
# la phrase remplacée) ; plus_bas() (« + » sous le tableau).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/prop_defi.py PropDefi6e
# python -m manim render -qh --disable_caching manim/scripts/6e/prop_defi.py PropDefi6e -o eleveai-maths-6e-prop-defi --media_dir manim/scripts/6e/media-prop-defi
# Sortie : manim/sorties/6e/maths/proportionnalite/06-defi/eleveai-maths-6e-prop-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403

JAUNE_CAR = "#facc15"
GAZOLE = "#f59e0b"
ROUTE = "#475569"
T100 = "#fbbf24"     # un tronçon de 100 km
T50 = "#38bdf8"      # le tronçon de 50 km


def muet(t):
    """Un Text décoratif ou dit en mots : ni attente de synchro, ni audit."""
    for f in t.get_family():
        if isinstance(f, Text):
            f.sans_synchro = True
            f._pas_audit = True
    return t


def car_scolaire(s=1.0, couleur=JAUNE_CAR):
    """Un car scolaire vu de profil : caisse jaune, vitres, roues, panneau."""
    caisse = RoundedRectangle(width=2.4, height=0.95, corner_radius=0.16, fill_color=couleur, fill_opacity=1,
                              stroke_color="#a16207", stroke_width=3)
    vitres = VGroup(*[RoundedRectangle(width=0.36, height=0.3, corner_radius=0.05, fill_color="#bae6fd",
                                       fill_opacity=1, stroke_width=0).move_to(P(-0.85 + 0.45 * k, 0.18))
                      for k in range(4)])
    pare = RoundedRectangle(width=0.32, height=0.42, corner_radius=0.05, fill_color="#bae6fd", fill_opacity=1,
                            stroke_width=0).move_to(P(1.0, 0.12))
    bande = Rectangle(width=2.3, height=0.07, fill_color="#111827", fill_opacity=1, stroke_width=0).move_to(
        P(0, -0.12))
    roues = VGroup(*[VGroup(Circle(radius=0.2, fill_color="#111827", fill_opacity=1, stroke_width=0),
                            Circle(radius=0.08, fill_color="#9ca3af", fill_opacity=1, stroke_width=0))
                     .move_to(P(x, -0.5)) for x in (-0.7, 0.7)])
    phare = Circle(radius=0.06, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(1.15, -0.25))
    return VGroup(caisse, vitres, pare, bande, roues, phare).scale(s)


def chloe(s=1.0):
    """Chloé, conductrice de car scolaire : gilet bleu marine, casquette."""
    p = personne(peau="#e0ac69", tenue="#1e3a8a", cheveux="#78350f", longs=True, s=s)
    c = p.tete.get_center()
    r = p.tete.width / 2
    casq = VGroup(AnnularSector(inner_radius=0, outer_radius=r * 1.08, angle=PI, start_angle=0,
                                fill_color="#1d4ed8", fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.55),
                  RoundedRectangle(width=r * 1.2, height=r * 0.18, corner_radius=r * 0.08, fill_color="#1d4ed8",
                                   fill_opacity=1, stroke_width=0).move_to(c + P(r * 0.75, r * 0.12)))
    p.add(casq)
    return p


class Route(VGroup):
    """La route de la sortie : x0 → x0 + km × k, à la hauteur y ; bande grise,
    pointillés blancs. .x(km) · .troncon(a, b, couleur) (surlignage à poser) ·
    .borne(km) (petit trait)."""

    def __init__(self, km=250, x0=-4.2, y=2.75, k=0.032, ep=0.32, **kw):
        super().__init__(**kw)
        self.x0, self.y0, self.k, self.ep = x0, y, k, ep
        self.bande = Rectangle(width=km * k, height=ep, fill_color=ROUTE, fill_opacity=1, stroke_width=0)
        self.bande.move_to(P(x0 + km * k / 2, y))
        self.tirets = DashedLine(P(x0 + 0.1, y), P(x0 + km * k - 0.1, y), color=WHITE, stroke_width=3,
                                 dash_length=0.15)
        self.add(self.bande, self.tirets)

    def x(self, km):
        return self.x0 + km * self.k

    def troncon(self, a, b, couleur, ep=None):
        ep = ep or self.ep + 0.08
        return Rectangle(width=(b - a) * self.k - 0.05, height=ep, fill_color=couleur, fill_opacity=0.85,
                         stroke_color=WHITE, stroke_width=2).move_to(P((self.x(a) + self.x(b)) / 2, self.y0))

    def borne(self, km, couleur=WHITE):
        return Line(P(self.x(km), self.y0 - 0.3), P(self.x(km), self.y0 + 0.3), color=couleur, stroke_width=5)

    def barre(self, n, y, couleur=GREY_B):
        """n tronçons de 100 km mis bout à bout, à la hauteur y (le double, le triple)."""
        return VGroup(*[Rectangle(width=100 * self.k - 0.05, height=0.26, fill_color=couleur, fill_opacity=1,
                                  stroke_color=WHITE, stroke_width=2).move_to(P(self.x(100 * i + 50), y))
                        for i in range(n)])


class Jauge(VGroup):
    """La jauge de gazole : un réservoir vertical (capacité `cap` litres) qui se
    remplit par morceaux. .remplir(litres, couleur) → le morceau suivant (à FadeIn)."""

    def __init__(self, cap=100, hauteur=3.2, largeur=0.8, centre=ORIGIN, **kw):
        super().__init__(**kw)
        self.cap, self.H, self.L = cap, hauteur, largeur
        self.cadre = RoundedRectangle(width=largeur + 0.12, height=hauteur + 0.12, corner_radius=0.12,
                                      stroke_color=WHITE, stroke_width=4, fill_color="#0f172a", fill_opacity=1)
        bec = RoundedRectangle(width=0.36, height=0.2, corner_radius=0.05, fill_color=GREY_B, fill_opacity=1,
                               stroke_width=0).next_to(self.cadre, UP, buff=0)
        self.add(self.cadre, bec)
        self.move_to(centre)
        self.niveau = 0.0

    def remplir(self, litres, couleur=GAZOLE):
        h = litres / self.cap * self.H
        bas = self.cadre.get_bottom()[1] + 0.06 + self.niveau / self.cap * self.H
        self.niveau += litres
        return Rectangle(width=self.L, height=h - 0.03, fill_color=couleur, fill_opacity=1, stroke_color=WHITE,
                         stroke_width=1.5).move_to(P(self.cadre.get_x(), bas + h / 2))

    def y_niveau(self):
        return self.cadre.get_bottom()[1] + 0.06 + self.niveau / self.cap * self.H


def horloge(r=0.75):
    """Une horloge : cadran blanc, 12 graduations, petite aiguille sur 12,
    grande aiguille. .petite · .grande · .centre (tourner about_point)."""
    cadran = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color="#475569", stroke_width=6)
    grad = VGroup(*[Line(P(0, r * (0.78 if k % 3 else 0.68)), P(0, r * 0.9), color="#334155",
                         stroke_width=4 if k % 3 == 0 else 2).rotate(-k * TAU / 12, about_point=ORIGIN)
                    for k in range(12)])
    petite = Line(ORIGIN, UP * r * 0.5, color="#0f172a", stroke_width=8)
    grande = Line(ORIGIN, UP * r * 0.78, color="#dc2626", stroke_width=4)
    axe = Dot(ORIGIN, radius=0.06, color="#0f172a")
    g = VGroup(cadran, grad, petite, grande, axe)
    g.petite, g.grande, g.cadran = petite, grande, cadran
    return g


def tourner(h, heures, run_time=1.6):
    """L'horloge h avance de `heures` heures (la grande aiguille fait les tours)."""
    c = h.cadran.get_center()
    return AnimationGroup(Rotate(h.petite, -heures * TAU / 12, about_point=c),
                          Rotate(h.grande, -heures * TAU, about_point=c), run_time=run_time, rate_func=linear)


def gateau(s=1.0):
    """Un gâteau : génoise dorée, glaçage rose, une cerise."""
    corps = RoundedRectangle(width=1.0, height=0.45, corner_radius=0.08, fill_color="#d97706", fill_opacity=1,
                             stroke_color="#78350f", stroke_width=2)
    glac = RoundedRectangle(width=1.04, height=0.16, corner_radius=0.07, fill_color="#f9a8d4", fill_opacity=1,
                            stroke_width=0).move_to(corps.get_top())
    cerise = Circle(radius=0.08, fill_color="#dc2626", fill_opacity=1, stroke_width=0).next_to(glac, UP, buff=0)
    return VGroup(corps, glac, cerise).scale(s)


def four(s=1.0):
    """Un four : caisse grise, porte vitrée qui rougeoie, boutons, minuteur."""
    caisse = RoundedRectangle(width=3.3, height=2.5, corner_radius=0.15, fill_color="#9ca3af", fill_opacity=1,
                              stroke_color="#e5e7eb", stroke_width=3)
    porte = RoundedRectangle(width=2.7, height=1.65, corner_radius=0.12, fill_color="#7c2d12", fill_opacity=1,
                             stroke_color="#374151", stroke_width=4).move_to(P(0, -0.3))
    lueur = RoundedRectangle(width=2.4, height=1.35, corner_radius=0.1, fill_color="#fb923c", fill_opacity=0.35,
                             stroke_width=0).move_to(porte)
    grille = Line(P(-1.15, -0.62), P(1.15, -0.62), color="#1f2937", stroke_width=4)
    boutons = VGroup(*[Circle(radius=0.11, fill_color="#374151", fill_opacity=1, stroke_width=0).move_to(P(x, 0.9))
                       for x in (-1.2, -0.85)])
    ecran = RoundedRectangle(width=0.9, height=0.34, corner_radius=0.06, fill_color="#111827", fill_opacity=1,
                             stroke_width=0).move_to(P(0.9, 0.9))
    g = VGroup(caisse, porte, lueur, grille, boutons, ecran).scale(s)
    g.ecran, g.grille, g.porte = ecran, grille, porte
    return g


def musee(s=1.0):
    """Un musée : fronton triangulaire, quatre colonnes, marches."""
    fronton = Polygon(P(-1.5, 0.75), P(1.5, 0.75), P(0, 1.45), fill_color="#e5e7eb", fill_opacity=1,
                      stroke_color="#94a3b8", stroke_width=3)
    archi = Rectangle(width=3.0, height=0.22, fill_color="#cbd5e1", fill_opacity=1, stroke_width=0).move_to(
        P(0, 0.64))
    cols = VGroup(*[Rectangle(width=0.26, height=1.2, fill_color="#f1f5f9", fill_opacity=1, stroke_color="#94a3b8",
                              stroke_width=2).move_to(P(x, -0.07)) for x in (-1.1, -0.37, 0.37, 1.1)])
    marches = VGroup(*[Rectangle(width=3.0 + 0.3 * k, height=0.14, fill_color="#cbd5e1", fill_opacity=1,
                                 stroke_color="#94a3b8", stroke_width=1).move_to(P(0, -0.74 - 0.14 * k))
                       for k in range(2)])
    mot = muet(Text("MUSÉE", font_size=22, color="#334155", weight=BOLD)).move_to(P(0, 0.98))
    return VGroup(fronton, archi, cols, marches, mot).scale(s)


def plus_bas(tb, c0, c1, couleur=FLECHE_COL, fs=None):
    """Le « + » entre les colonnes c0 et c1, SOUS la carte (tb.plus : au-dessus)."""
    t = Text("+", font_size=fs or int(tb.fs * 1.3), color=couleur, weight=BOLD)
    return t.move_to(P((tb.x(c0) + tb.x(c1)) / 2, tb.carte.get_bottom()[1] - 0.35))


class PropDefiBase(PaysageProp):
    nom_voix = "6e-prop-defi"
    fichier_marques = "prop_defi_marques.json"

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

    @staticmethod
    def muet_fl(fl):
        fl.etiquette._pas_audit = True
        fl.etiquette.sans_synchro = True
        return fl

    def route_250(self):
        """La route des écrans 02, 03 et 08 : 250 km, « 250 km » à droite."""
        r = Route(250, x0=-4.2, y=2.75)
        lab = self.t("250 km", 34, WHITE).next_to(r.bande, RIGHT, buff=0.25)
        car = car_scolaire(0.55)
        car.next_to(r.bande, LEFT, buff=0.12).align_to(r.bande, DOWN).shift(DOWN * 0.05)
        return r, lab, car

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défis de proportionnalité", self.identite, self.ceinture, y_ech=-2.45)
        car = car_scolaire(1.25).move_to(P(-1.6, 0.55))
        hz = horloge(0.6).move_to(P(1.9, 0.6))
        self.au_mot("Défis")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        self.play(FadeIn(car, shift=RIGHT * 0.6), FadeIn(hz, scale=0.6), run_time=0.6)
        q = self.t("Sauras-tu éviter tous les pièges ?", 40, ORANGE_RETENUE).move_to(P(-0.3, -1.05))
        self.au_mot("Sauras-tu")
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.5)
        self.au_mot("pièges")
        self.play(tourner(hz, 2, 1.0), Indicate(q, color=AMBRE, scale_factor=1.08), run_time=1.0)
        self.attendre_voix(marge=0.6)

    # ── 01 : Chloé, conductrice de car scolaire ─────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = chloe(1.0).move_to(P(-5.2, -0.55))
        nom = self.t("Chloé", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.au_mot("Voici Chloé")
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        met = self.bloc(["conductrice", "de car scolaire"], 28, BLEU_CALCUL).next_to(pers, DOWN, buff=0.2)
        for t in met:
            t.set_x(pers.get_x())
        self.au_mot("conduit")
        self.play(FadeIn(met[0], shift=DOWN * 0.1), run_time=0.4)
        r = Route(250, x0=-3.2, y=1.55)
        car = car_scolaire(0.9)
        car.move_to(P(r.x(0) + 1.1, r.bande.get_top()[1] + car.height / 2 + 0.02))
        self.au_mot("car scolaire")
        self.play(FadeIn(car, shift=RIGHT * 0.5), FadeIn(met[1], shift=DOWN * 0.1), run_time=0.5)
        self.au_mot("sortie")
        self.play(Create(r), car.animate.shift(LEFT * 0.0), run_time=0.7)
        lab = self.t("250 km", 40, AMBRE).next_to(r.bande, DOWN, buff=0.22).set_x(r.x(125))
        self.au_mot("250 km")
        self.play(FadeIn(lab, scale=1.3), car.animate.move_to(P(r.x(250) - 1.1, car.get_y())), run_time=1.2)
        self.insister(lab, 1.2, 0.2)
        jg = Jauge(cap=100, hauteur=2.0, largeur=0.6, centre=P(-3.3, -1.2))
        l1 = self.ligne([("30 litres", GAZOLE), ("de gazole", WHITE), ("pour 100 km", WHITE)], 38)
        l1.move_to(P(0, -0.75)).align_to(P(-2.4, 0), LEFT)
        self.au_mot("consomme")
        self.play(FadeIn(jg, shift=UP * 0.2), run_time=0.4)
        self.au_mot("30 litres")
        self.play(FadeIn(jg.remplir(30), shift=UP * 0.2), FadeIn(l1[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("de gazole")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("100 km")
        self.play(FadeIn(l1[2], shift=RIGHT * 0.2), run_time=0.3)
        self.insister(l1[0], 1.15, 0.2)
        l2 = self.ligne([("250 km", WHITE), ("→", WHITE), ("? litres", ORANGE_RETENUE)], 44).move_to(P(0, -2.0))
        l2.align_to(l1, LEFT)
        muet(l2[0])
        self.au_mot("Combien")
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.45)
        self.insister(l2[2], 1.25, 0.25)
        self.attendre_voix()

    # ── 02 : découper 250 ───────────────────────────────────────────────────
    def ecran_decouper(self):
        self.ecran("02-decouper")
        r, lab, car = self.route_250()
        self.au_mot("250")
        self.play(FadeIn(r), FadeIn(car), FadeIn(lab, scale=1.3), run_time=0.5)
        # le double et le triple de 100 ne tombent pas juste
        d = r.barre(2, 1.35)
        t3 = r.barre(3, 0.55)
        ld = self.t("le double", 30).next_to(d, LEFT, buff=0.25).align_to(P(-6.3, 0), LEFT)
        lt = self.t("le triple", 30).next_to(t3, LEFT, buff=0.25).align_to(P(-6.3, 0), LEFT)
        manque = Line(P(r.x(200), 1.35), P(r.x(250), 1.35), color=ROUGE_ERREUR, stroke_width=6)
        trop = Rectangle(width=50 * r.k, height=0.3, fill_color=ROUGE_ERREUR, fill_opacity=0.9,
                         stroke_width=0).move_to(P(r.x(275), 0.55))
        fin = DashedLine(P(r.x(250), r.y0 - 0.2), P(r.x(250), 0.25), color=WHITE, stroke_width=3)
        self.au_mot("double")
        self.play(FadeIn(ld, shift=RIGHT * 0.2), LaggedStart(*[FadeIn(b, shift=RIGHT * 0.3) for b in d],
                                                               lag_ratio=0.3), Create(fin), run_time=0.6)
        self.play(Create(manque), run_time=0.3)
        self.au_mot("triple")
        self.play(FadeIn(lt, shift=RIGHT * 0.2), LaggedStart(*[FadeIn(b, shift=RIGHT * 0.3) for b in t3],
                                                               lag_ratio=0.25), run_time=0.6)
        x3 = croix(VGroup(t3[2]), sw=5)
        self.play(FadeIn(trop), Create(x3), run_time=0.3)
        # on découpe : 100 + 100 + 50
        tr = [r.troncon(0, 100, T100), r.troncon(100, 200, T100), r.troncon(200, 250, T50)]
        labs = [self.t(s, 28, c).next_to(x, UP, buff=0.12) for s, c, x in
                (("100 km", T100, tr[0]), ("100 km", T100, tr[1]), ("50 km", T50, tr[2]))]
        lg = self.ligne([("250 =", WHITE), ("100 +", T100), ("100 +", T100), ("50", T50)], 56).move_to(P(-0.3, -1.0))
        self.au_mot("On découpe")
        self.play(FadeOut(VGroup(d, t3, ld, lt, manque, trop, fin, x3)), *[FadeIn(b) for b in (r.borne(100),
                                                                                              r.borne(200))],
                  run_time=0.5)
        self.au_mot("250, c'est")
        self.play(FadeIn(lg[0], shift=RIGHT * 0.2), Indicate(lab, color=AMBRE), run_time=0.35)
        self.au_mot("100 plus")
        self.play(FadeIn(tr[0]), FadeIn(labs[0], scale=1.3), FadeIn(lg[1], shift=RIGHT * 0.2), run_time=0.35)
        self.play(FadeIn(tr[1]), FadeIn(labs[1], scale=1.3), FadeIn(lg[2], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("50.")
        self.play(FadeIn(tr[2]), FadeIn(labs[2], scale=1.3), FadeIn(lg[3], scale=1.3), run_time=0.35)
        self.insister(lg, 1.1, 0.25)
        self.attendre_voix()

    def route_coupee(self):
        """La route des écrans 02 et 03, déjà découpée (tronçons, bornes, km)."""
        r, lab, car = self.route_250()
        tr = [r.troncon(0, 100, T100), r.troncon(100, 200, T100), r.troncon(200, 250, T50)]
        labs = [self.t(s, 28, c).next_to(x, UP, buff=0.12) for s, c, x in
                (("100 km", T100, tr[0]), ("100 km", T100, tr[1]), ("50 km", T50, tr[2]))]
        return r, lab, car, tr, labs, VGroup(r, r.borne(100), r.borne(200), *tr, lab, car, *labs)

    # ── 03 : calculer par morceaux (jauge + tableau) ────────────────────────
    def ecran_calcul(self):
        self.ecran("03-calcul")
        r, lab, car, tr, labs, deja = self.route_coupee()
        self.add(deja)
        jg = Jauge(cap=100, hauteur=3.2, largeur=0.8, centre=P(-5.6, -0.4))
        nom_j = muet(self.t("Gazole", 28, GAZOLE)).next_to(jg, DOWN, buff=0.15)
        tb = TableauProp(["Distance (km)", "Gazole (litres)"], [[100, 50, 250], [30, 15, 75]], montrer=False,
                         largeur_case=1.5, largeur_libelle=3.0, fs=38, centre=P(0.45, 0.55))
        self.play(FadeIn(tb.fond, shift=UP * 0.2), FadeIn(jg), FadeIn(nom_j), run_time=0.1)
        lit = [self.t(s, 30, c).next_to(x, DOWN, buff=0.14) for s, c, x in
               (("30 L", T100, tr[0]), ("30 L", T100, tr[1]), ("15 L", T50, tr[2]))]
        self.au_mot("100 km")
        self.play(FadeIn(tb.valeur(0, 0), scale=1.4), tb.allumer(0, 0), Indicate(tr[0], color=WHITE), run_time=0.4)
        self.au_mot("30 litres")
        self.play(FadeIn(tb.valeur(1, 0), scale=1.4), FadeIn(lit[0], scale=1.3), tb.eteindre(0, 0), run_time=0.4)
        self.au_mot("50 km")
        self.play(FadeIn(tb.valeur(0, 1), scale=1.4), tb.allumer(0, 1), Indicate(tr[2], color=WHITE), run_time=0.4)
        b = self.muet_fl(tb.fleche_col(0, 1, "÷ 2", ligne=1))
        self.au_mot("moitié")
        self.play(Create(b.fleche), FadeIn(b.etiquette, scale=1.3), tb.eteindre(0, 1), run_time=0.4)
        self.au_mot("15 litres")
        self.play(FadeIn(tb.valeur(1, 1), scale=1.4), FadeIn(lit[2], scale=1.3), run_time=0.4)
        self.au_mot("250 km")
        self.play(FadeOut(b), FadeIn(tb.valeur(0, 2), scale=1.4), FadeIn(tb.trou(1, 2), scale=1.3),
                  tb.allumer(0, 2), Indicate(lab, color=AMBRE), run_time=0.45)
        lg = self.ligne([("30 +", T100), ("30 +", T100), ("15 =", T50), ("75 litres", VERT_OK)], 46)
        lg.move_to(P(0.45, -2.2))
        p1, p2, p3 = jg.remplir(30, T100), jg.remplir(30, T100), jg.remplir(15, T50)
        self.au_mot("30 plus")
        self.play(FadeIn(lg[0], shift=RIGHT * 0.2), FadeIn(p1, shift=DOWN * 0.3), Indicate(lit[0], color=WHITE),
                  tb.eteindre(0, 2), run_time=0.35)
        self.play(FadeIn(lg[1], shift=RIGHT * 0.2), FadeIn(p2, shift=DOWN * 0.3), FadeIn(lit[1], scale=1.3),
                  run_time=0.35)
        self.au_mot("15, égale")
        self.play(FadeIn(lg[2], shift=RIGHT * 0.2), FadeIn(p3, shift=DOWN * 0.3), Indicate(lit[2], color=WHITE),
                  run_time=0.35)
        tot = self.t("75 L", 36, VERT_OK).move_to(P(-4.45, jg.y_niveau()))
        self.au_mot("75 litres")
        self.play(FadeIn(lg[3], scale=1.3), FadeIn(tot, scale=1.3), tb.remplir(1, 2, 75), run_time=0.45)
        self.play(tb.allumer(1, 2), run_time=0.3)
        self.insister(lg[3], 1.15, 0.2)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (30 L pour 100 km ; 300 km ?) ───────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        r = Route(300, x0=-6.0, y=0.0, k=0.018)
        car = car_scolaire(0.8)
        car.move_to(P(r.x(40), r.bande.get_top()[1] + car.height / 2 + 0.02))
        jg = Jauge(cap=100, hauteur=1.6, largeur=0.5, centre=P(-1.0, -1.6))
        deco = VGroup(r, car, jg)
        self.add(deco)
        tb = TableauProp(["Distance (km)", "Gazole (litres)"], [[100, 300], [30, "?"]], montrer=False,
                         largeur_case=1.5, largeur_libelle=3.0, fs=38, centre=P(-3.15, 0.3))

        def apres(sc):
            sc.play(FadeOut(deco), FadeIn(tb.fond), FadeIn(tb.trou(1, 1)), run_time=0.3)
            l0 = sc.ligne_rep(0, ["300 km =", "3 ×", "100 km."])
            l1 = sc.ligne_rep(1, ["3 ×", "30 =", "90 litres."])
            h = tb.fleche_col(0, 1, "× 3", ligne=0)
            b = tb.fleche_col(0, 1, "× 3", ligne=1)
            sc.au_mot("300 km")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), FadeIn(tb.valeur(0, 1), scale=1.4), run_time=0.3)
            sc.au_mot("3 fois")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), Create(h.fleche), FadeIn(h.etiquette, scale=1.3), run_time=0.35)
            sc.au_mot("100 km")
            sc.play(FadeIn(l0[2], shift=UP * 0.15), FadeIn(tb.valeur(0, 0), scale=1.4), run_time=0.3)
            sc.au_mot("3 fois 30")
            sc.play(Create(b.fleche), FadeIn(b.etiquette, scale=1.3), FadeIn(l1[0], shift=UP * 0.15), run_time=0.3)
            sc.play(FadeIn(l1[1], shift=UP * 0.15), FadeIn(tb.valeur(1, 0), scale=1.4), run_time=0.3)
            sc.au_mot("90 litres")
            sc.play(FadeIn(l1[2], scale=1.3), tb.remplir(1, 1, 90), run_time=0.4)
            sc.play(tb.allumer(1, 1), run_time=0.3)
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse",
                            ["Le car consomme 30 litres", "pour 100 km.", "Combien pour 300 km ?"],
                            [self.t("90 litres", 34), self.t("230 litres", 34), self.t("33 litres", 34)], 0,
                            ["300 km = 3 × 100 km.", "3 × 30 = 90 litres."], mot_q="Le car", autres_r=apres)

    # ── 05 : le défi piège : deux cars, toujours 2 heures ───────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        tit = self.t("Un défi piège !", 46, ROUGE_ERREUR).move_to(P(-0.4, 3.1))
        self.au_mot("Un défi")
        self.play(Write(tit), run_time=0.5)
        voies = VGroup(*[Rectangle(width=5.6, height=0.55, fill_color=ROUTE, fill_opacity=1, stroke_width=0)
                         .move_to(P(-3.45, y)) for y in (1.75, 0.75)])
        tirets = VGroup(*[DashedLine(P(-6.15, y), P(-0.75, y), color=WHITE, stroke_width=3, dash_length=0.15)
                          for y in (1.75, 0.75)])
        arrivee = Line(P(-0.9, 2.15), P(-0.9, 0.35), color=VERT_OK, stroke_width=6)
        x_dep, x_arr = -5.35, -1.85
        c1 = car_scolaire(0.6).move_to(P(x_dep, 1.95))
        c2 = car_scolaire(0.6, couleur="#fb923c").move_to(P(x_dep, 0.95))
        hz = horloge(0.75).move_to(P(-3.45, -1.15))
        tb = TableauProp(["Cars", "Durée (heures)"], [[1, 2], [2, 2]], montrer=False, largeur_case=1.3,
                         largeur_libelle=2.6, fs=38, centre=P(3.7, 1.35))
        self.au_mot("Avec 1 car")
        self.play(FadeIn(voies[0]), FadeIn(tirets[0]), Create(arrivee), FadeIn(c1, shift=RIGHT * 0.3),
                  FadeIn(tb.fond), FadeIn(tb.valeur(0, 0), scale=1.4), FadeIn(hz, scale=0.7), run_time=0.5)
        h1 = self.t("2 h", 40, AMBRE).next_to(hz, RIGHT, buff=0.3)
        self.au_mot("2 heures")
        self.play(c1.animate.move_to(P(x_arr, 1.95)), tourner(hz, 2, 1.4), FadeIn(tb.valeur(1, 0), scale=1.4),
                  FadeIn(h1, scale=1.3), run_time=1.4)
        self.au_mot("Avec 2 cars")
        c = hz.cadran.get_center()
        self.play(c1.animate.move_to(P(x_dep, 1.95)), FadeIn(voies[1]), FadeIn(tirets[1]),
                  FadeIn(c2, shift=RIGHT * 0.3), FadeOut(h1),
                  Rotate(hz.petite, 2 * TAU / 12, about_point=c), Rotate(hz.grande, 2 * TAU, about_point=c),
                  FadeIn(tb.valeur(0, 1), scale=1.4), FadeIn(tb.trou(1, 1), scale=1.3), run_time=0.6)
        self.au_mot("combien")
        self.play(Indicate(tb.trou(1, 1), color=AMBRE, scale_factor=1.2), run_time=0.5)
        pas4 = self.ligne([("Pas", ROUGE_ERREUR), ("4 heures !", ROUGE_ERREUR)], 42)
        self.col(pas4, -0.2, xl=1.4)
        barre = Line(pas4[1].get_corner(DL) + P(-0.08, 0), pas4[1].get_corner(UR) + P(0.08, 0),
                     color=ROUGE_ERREUR, stroke_width=6)
        self.au_mot("Pas 4")
        self.play(FadeIn(pas4, scale=1.2), run_time=0.35)
        self.play(Create(barre), run_time=0.3)
        self.au_mot("Les deux cars")
        self.play(c1.animate.move_to(P(x_arr, 1.95)), c2.animate.move_to(P(x_arr, 0.95)), tourner(hz, 2, 1.5),
                  run_time=1.5)
        h2 = self.t("2 h", 40, VERT_OK).next_to(hz, RIGHT, buff=0.3)
        tj = self.ligne([("toujours", VERT_OK), ("2 heures", VERT_OK)], 40)
        self.col(tj, -1.05, xl=1.4)
        self.au_mot("toujours")
        self.play(FadeIn(tj[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("2 heures", 2)
        self.play(FadeIn(tj[1], scale=1.2), FadeIn(h2, scale=1.3), tb.remplir(1, 1, 2), run_time=0.4)
        self.play(tb.allumer(1, 1), run_time=0.3)
        v = self.tampon("Pas proportionnel", ROUGE_ERREUR, 40)
        self.col(v, -2.0, xl=1.4)
        self.au_mot("Ce n'est pas")
        self.play(FadeIn(v, scale=1.3), run_time=0.4)
        self.insister(v, 1.08, 0.25)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (un gâteau 30 min ; deux gâteaux en même temps ?) ───
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        fr_ = four(1.0).move_to(P(-3.4, 0.3))
        g1, g2 = gateau(0.95), gateau(0.95)
        VGroup(g1, g2).arrange(RIGHT, buff=0.3).next_to(fr_.grille, UP, buff=0.0)
        self.add(fr_, g1, g2)
        lab = self.t("30 min", 44, VERT_OK).next_to(fr_, DOWN, buff=0.3)

        def apres(sc):
            v = sc.tampon("Pas proportionnel", ROUGE_ERREUR, 34).move_to(P(-3.4, 2.35))
            sc.rep(0, avec=[Indicate(VGroup(g1, g2), color=AMBRE, scale_factor=1.1)])
            sc.rep(1, avec=[FadeIn(lab, scale=1.3), Indicate(fr_.porte, color=AMBRE, scale_factor=1.03)])
            sc.rep_fin()
            sc.au_mot("Ce n'est pas")
            sc.play(FadeIn(v, scale=1.3), run_time=0.4)
            sc.insister(v, 1.08, 0.2)

        self.question_pause("06-question", "06b-reponse",
                            ["Un gâteau : 30 minutes.", "Et 2 gâteaux, en même temps,", "dans le même four ?"],
                            [self.t("60 minutes", 34), self.t("30 minutes", 34), self.t("15 minutes", 34)], 1,
                            ["Ils cuisent en même temps :", "toujours 30 minutes."], mot_q="Un gâteau",
                            autres_r=apres)

    # ── 07 : à toi de jouer : le musée ──────────────────────────────────────
    def table_musee(self, centre):
        return TableauProp(["Entrées", "Prix (€)"], [[8, 24], [36, "?"]], montrer=False, largeur_case=1.5,
                           largeur_libelle=2.4, fs=40, centre=centre)

    def ecran_defi(self):
        self.ecran("07-defi", 0.65)
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.au_mot("À toi de jouer")
        self.play(Write(tit), run_time=0.6)
        mu = musee(1.0).move_to(P(-4.3, 0.75))
        tb = self.table_musee(P(2.75, 0.85))
        self.au_mot("Au musée")
        self.play(FadeIn(mu, shift=UP * 0.2), FadeIn(tb.fond, shift=UP * 0.2), run_time=0.5)
        self.au_mot("8 entrées")
        self.play(FadeIn(tb.valeur(0, 0), scale=1.4), run_time=0.35)
        self.au_mot("36 €")
        self.play(FadeIn(tb.valeur(1, 0), scale=1.4), run_time=0.35)
        eleves = VGroup(*[personne(peau=PEAUX[k % 5], tenue=["#38bdf8", "#f472b6", "#a3e635", "#fb923c"][k % 4],
                                   longs=k % 2 == 1, s=0.22) for k in range(10)]).arrange(RIGHT, buff=0.05)
        eleves.move_to(P(-4.3, -1.15))
        self.au_mot("24 élèves")
        self.play(FadeIn(tb.valeur(0, 1), scale=1.4), FadeIn(tb.trou(1, 1), scale=1.3),
                  LaggedStart(*[FadeIn(e, shift=UP * 0.2) for e in eleves], lag_ratio=0.08), run_time=0.8)
        self.au_mot("Combien")
        self.play(Indicate(tb.trou(1, 1), color=AMBRE, scale_factor=1.2), run_time=0.5)
        self.pause_defi(y=-1.5)

    def ecran_correction(self):
        self.ecran("07b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.15))
        tb = self.table_musee(P(-2.6, 0.6))
        self.add(tb.fond, tb.valeur(0, 0), tb.valeur(1, 0), tb.valeur(0, 1), tb.trou(1, 1))
        self.play(Write(tit), run_time=0.5)
        h = tb.fleche_col(0, 1, "× 3", ligne=0)
        b = tb.fleche_col(0, 1, "× 3", ligne=1)
        l1 = self.ligne([("24 =", WHITE), ("3 ×", FLECHE_COL), ("8", WHITE)], 44)
        self.col(l1, 1.3, xl=1.9)
        self.au_mot("24, c'est")
        self.play(FadeIn(l1[0], shift=RIGHT * 0.2), tb.allumer(0, 1), run_time=0.3)
        self.au_mot("3 fois")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.2), Create(h.fleche), FadeIn(h.etiquette, scale=1.3), run_time=0.4)
        self.au_mot("8. Le")
        self.play(FadeIn(l1[2], shift=RIGHT * 0.2), tb.allumer(0, 0), run_time=0.3)
        self.au_mot("3 fois plus")
        self.play(tb.eteindre(0, 0), tb.eteindre(0, 1), Create(b.fleche), FadeIn(b.etiquette, scale=1.3),
                  tb.allumer(1, 0), run_time=0.4)
        l2 = self.ligne([("3 × 36 =", WHITE), ("108 €", VERT_OK)], 44)
        self.col(l2, 0.2, xl=1.9)
        self.au_mot("3 fois 36")
        self.play(FadeIn(l2[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("108 €")
        self.play(FadeIn(l2[1], scale=1.3), tb.remplir(1, 1, 108), tb.eteindre(1, 0), run_time=0.4)
        self.play(tb.allumer(1, 1), run_time=0.3)
        fin = self.ligne([("La sortie coûte", WHITE), ("108 €.", VERT_OK)], 46)
        cad = SurroundingRectangle(fin, color=VERT_OK, buff=0.22, corner_radius=0.12, stroke_width=5)
        bloc = VGroup(cad, fin).move_to(P(-0.6, -2.35))
        self.au_mot("La sortie")
        self.play(FadeIn(fin[0], shift=UP * 0.15), Create(cad), run_time=0.4)
        self.au_mot("108 €", 2)
        self.play(FadeIn(fin[1], scale=1.3), run_time=0.35)
        self.insister(bloc, 1.08, 0.25)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.65)
        r, lab, car, tr, labs, route = self.route_coupee()
        c1 = car_scolaire(0.55).move_to(P(-2.6, 0.9))
        c2 = car_scolaire(0.55, couleur="#fb923c").move_to(P(-2.6, 0.1))
        hz = horloge(0.6).move_to(P(0.3, 0.5))
        h2 = muet(self.t("2 h", 40, VERT_OK)).next_to(hz, RIGHT, buff=0.25)
        hz.petite.rotate(-2 * TAU / 12, about_point=hz.cadran.get_center())
        bas = VGroup(c1, c2, hz, h2)
        fig = VGroup(route, bas)
        for f in fig.get_family():
            if isinstance(f, Text):
                f._pas_audit = True
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Un grand nombre se découpe :", "250 = 100 + 100 + 50"),
            ("Avant de calculer : est-ce", "vraiment proportionnel ?"),
            ("Deux cars ne roulent pas", "deux fois plus longtemps.")], fs=36)
        fig.scale(0.9)  # l'Indicate reste loin du bord gauche (leçon de l'épisode 04)
        self.au_mot("Un grand")
        self.montrer_ligne(lignes[0], Indicate(VGroup(*tr), color=WHITE, scale_factor=1.04))
        self.au_mot("Et avant")
        self.montrer_ligne(lignes[1])
        self.au_mot("deux cars")
        self.montrer_ligne(lignes[2], Indicate(bas, color=AMBRE, scale_factor=1.05))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_decouper()
        self.ecran_calcul()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class PropDefi6e(PropDefiBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
