# prop_ratio_trois.py
# EleveAI — Maths 4e — série « Proportionnalité », lot 5 (une paysage par
# micro), épisode 30 : UN RATIO À TROIS TERMES (micro du coach :
# prop_ratio_trois, notion prop_ratio), AVEC VOIX. Paysage 16:9 SEULEMENT (les
# shorts 4e-prop-ratio-short-* existent déjà), CEINTURE VERTE.
# ⭐ Méthode travaillée : compost : terre : sable = 3 : 4 : 1 (écrit « 3 : 4 :
# 1 », dit « 3 pour 4 pour 1 ») veut dire compost ÷ 3 = terre ÷ 4 = sable ÷ 1 ;
# ce quotient commun est la VALEUR D'UNE PART. Un seul nombre connu donne la
# part, puis les deux autres (× 3, × 4). On SIMPLIFIE en divisant les trois
# termes par le même nombre (6 : 9 : 12 → 2 : 3 : 4). Pas de produit en croix
# (réservé à l'épisode 24) ; « ÷ » écrit, jamais 5/2.
# ⭐ Le dessin qui porte tout : les BARRES DE PARTS (une rangée par ingrédient,
# une part = un bloc, la valeur d'une part écrite DEDANS : « 6 seaux ») ; la
# simplification REGROUPE les petits blocs 3 par 3 (même mélange, blocs plus
# gros).
# ⭐ Fil rouge : erreur 3 INVERSER / la mauvaise ligne (question 1 : B 16 seaux
# = la terre, barré quand la voix le cite ; C 36 seaux = 12 × 3 au lieu de
# 12 ÷ 3) ; le piège de l'épisode (07) : simplifier UN SEUL terme
# (« 2 : 9 : 12 » barré ; question 2 : B 2 : 15 : 25, C 1 : 1,5 : 25).
#
# Décor et métier : Bastien, HORTICULTEUR (chapeau de paille, tablier vert, ses
# fleurs, ses légumes, ses seaux de compost, de terre et de sable). Recette de
# terreau inventée, plausible ; aucun chiffre du monde réel : pas de source.
# Centres d'intérêt : nature-ecologie.
#
# Écrans : 00 garde · 01 Bastien, trois ingrédients, 3 : 4 : 1 · 02 lire le
# ratio (les seaux, l'ordre) · 03 trois quotients égaux = la valeur d'une part
# · 04 le calcul : 6 seaux de sable → 18 et 24 seaux · 05 QUESTION 1 (12 seaux
# de compost) · 06 simplifier 6 : 9 : 12 → 2 : 3 : 4 · 07 le piège 2 : 9 : 12 ·
# 08 QUESTION 2 (10 : 15 : 25) · 09 défi des tomates 2 : 5 : 1 · 09b
# correction · 10 ce que tu as appris · 11 fin.
#
# Voix : manim/voix/4e-prop-ratio-trois.json (validée par Frédéric le 01/11,
# débit −10), WAV dans public/sons/4e-prop-ratio-trois/ ; marques mot à mot :
# manim/scripts/4e/prop_ratio_trois_marques.json (scripts/marques_dump.ps1
# puis le convertisseur « une marque par occurrence » de l'agent 19).
# Outils : manim/scripts/6e/prop_commun.py + manim/canvas_proportion.py (non
# modifiés) ; base PropTableauBase de manim/scripts/4e/prop_tableau.py
# (épisode 21) ; sans() de prop_agrandissement_rapport.py ; barre_r() de
# prop_grandeur_coherence.py. Ajouté ICI : Parts (une rangée de la barre de
# parts, les blocs regroupables), bastien(), seau(), fleur(), tomate(),
# pot_plante().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/prop_ratio_trois.py PropRatioTrois4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/4e/prop_ratio_trois.py PropRatioTrois4e -o eleveai-maths-4e-prop-ratio-trois --media_dir manim/media-prop-4e-30
# Sortie : manim/sorties/4e/maths/proportionnalite/30-ratio-trois/eleveai-maths-4e-prop-ratio-trois.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

import importlib.util  # noqa: E402

from prop_commun import *  # noqa: E402,F403
from prop_agrandissement_rapport import gras, sans  # noqa: E402
from prop_grandeur_coherence import barre_r  # noqa: E402


def _charger(nom, chemin):
    spec = importlib.util.spec_from_file_location(nom, chemin)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_ICI = Path(__file__).resolve().parent
_t4 = _charger("prop_tableau_4e", _ICI / "prop_tableau.py")    # épisode 21 (4e)
PropTableauBase4e = _t4.PropTableauBase

ENCRE = "#0f172a"      # le texte dans les blocs clairs
COMPOST = "#65a30d"    # le compost (vert, matière végétale)
TERRE = "#b45309"      # la terre (brune)
SABLE = "#fde68a"      # le sable (beige)
COMPOST_T = "#a3e635"  # leurs couleurs d'écriture, lisibles sur le noir
TERRE_T = "#fb923c"
SABLE_T = "#fde68a"
FEUILLE = "#16a34a"
INGR = (("compost", COMPOST, COMPOST_T, ENCRE), ("terre", TERRE, TERRE_T, WHITE), ("sable", SABLE, SABLE_T, ENCRE))


class Parts(VGroup):
    """Une rangée de la barre de parts : n blocs égaux et collés (largeur bw).
    .blocs[i] : le rectangle du bloc i. valeurs(v) renvoie (sans les ajouter)
    les nombres écrits DEDANS (« 6 » et « seaux » dessous) ; groupes(k) : un
    cadre par paquet de k blocs (la simplification)."""

    def __init__(self, n, couleur, bw=1.0, h=0.78, texte=WHITE, **kw):
        super().__init__(**kw)
        self.n, self.bw, self.h, self.texte = n, bw, h, texte
        self.blocs = VGroup(*[Rectangle(width=bw, height=h, fill_color=couleur, fill_opacity=1, stroke_color=ENCRE,
                                        stroke_width=3) for _ in range(n)]).arrange(RIGHT, buff=0)
        self.add(self.blocs)

    def valeurs(self, v, unite="seaux", synchro=False):
        out = VGroup()
        for b in self.blocs:
            t = VGroup(Text(str(v), font_size=30, color=self.texte, weight=BOLD),
                       Text(unite, font_size=17, color=self.texte, weight=BOLD)).arrange(DOWN, buff=0.03)
            if t.width > self.bw - 0.14:
                t.scale_to_fit_width(self.bw - 0.14)
            if t.height > self.h - 0.1:
                t.scale_to_fit_height(self.h - 0.1)
            t.move_to(b)
            if not synchro:  # posés AU MOT de leur nombre (audités), sans attendre « seaux »
                for f in t:
                    f.sans_synchro = True
            out.add(t)
        return out

    def groupes(self, k, couleur=AMBRE, sw=5):
        return VGroup(*[SurroundingRectangle(VGroup(*self.blocs[i:i + k]), color=couleur, buff=0.04, stroke_width=sw,
                                             corner_radius=0.05) for i in range(0, self.n, k)])


def barres(ns, x=-4.2, y=1.4, bw=0.95, h=0.78, ecart=1.05, fs_nom=26, noms=True):
    """La barre de parts à trois ingrédients (compost, terre, sable), une
    rangée sous l'autre, calées à gauche sur x ; le nom de chaque ingrédient à
    gauche (décor, sans synchro). Renvoie (rangées, noms)."""
    rs, ts = VGroup(), VGroup()
    for i, (n, (nom, c, ct, tx)) in enumerate(zip(ns, INGR)):
        r = Parts(n, c, bw, h, tx).move_to(P(0, y - i * ecart)).align_to(P(x, 0), LEFT)
        rs.add(r)
        if noms:
            ts.add(sans(Text(nom, font_size=fs_nom, color=ct, weight=BOLD)).next_to(r, LEFT, buff=0.22))
    return rs, ts


def sans_sync(t):
    """Un choix posé AU MOT de son nombre : il n'attend pas « seaux » redit
    0,7 s plus loin (il resterait sinon 0,66 s en retard sur son nombre)."""
    t.sans_synchro = True
    return t


def seau(couleur, s=1.0):
    """Un seau : le corps évasé gris, l'anse, et son contenu coloré en haut."""
    corps = Polygon(P(-0.42, 0.4), P(0.42, 0.4), P(0.32, -0.42), P(-0.32, -0.42), fill_color="#94a3b8",
                    fill_opacity=1, stroke_color="#e2e8f0", stroke_width=3)
    contenu = Ellipse(width=0.82, height=0.2, fill_color=couleur, fill_opacity=1, stroke_color="#e2e8f0",
                      stroke_width=2).move_to(P(0, 0.4))
    anse = Arc(radius=0.4, start_angle=0.15, angle=PI - 0.3, color="#e2e8f0", stroke_width=4).move_to(P(0, 0.62))
    cercle = Line(P(-0.38, 0.1), P(0.38, 0.1), color="#cbd5e1", stroke_width=2)
    return VGroup(anse, corps, cercle, contenu).scale(s)


def fleur(couleur="#f472b6", s=1.0):
    tige = Line(P(0, -0.6), P(0, 0.1), color=FEUILLE, stroke_width=5)
    feuille = Ellipse(width=0.3, height=0.13, fill_color=FEUILLE, fill_opacity=1, stroke_width=0).rotate(0.5)
    feuille.move_to(P(0.14, -0.3))
    petales = VGroup(*[Circle(radius=0.12, fill_color=couleur, fill_opacity=1, stroke_width=0)
                       .move_to(P(0.14 * np.cos(a), 0.22 + 0.14 * np.sin(a))) for a in np.arange(0, TAU, TAU / 6)])
    coeur = Circle(radius=0.08, fill_color="#facc15", fill_opacity=1, stroke_width=0).move_to(P(0, 0.22))
    return VGroup(tige, feuille, petales, coeur).scale(s)


def tomate(s=1.0):
    fruit = Circle(radius=0.28, fill_color="#dc2626", fill_opacity=1, stroke_width=0)
    etoile = Star(5, outer_radius=0.15, inner_radius=0.06, fill_color=FEUILLE, fill_opacity=1,
                  stroke_width=0).move_to(P(0, 0.24))
    reflet = Arc(radius=0.18, start_angle=1.9, angle=0.9, color=WHITE, stroke_width=3, stroke_opacity=0.6)
    return VGroup(fruit, reflet, etoile).scale(s)


def pot_plante(s=1.0):
    """Un pot de terre cuite, un plant de tomates et deux fruits."""
    pot = Polygon(P(-0.5, 0), P(0.5, 0), P(0.38, -0.7), P(-0.38, -0.7), fill_color="#c2410c", fill_opacity=1,
                  stroke_width=0)
    bord = Rectangle(width=1.12, height=0.18, fill_color="#ea580c", fill_opacity=1, stroke_width=0).move_to(P(0, 0.02))
    tige = Line(P(0, 0.1), P(0, 1.3), color=FEUILLE, stroke_width=6)
    fe = VGroup(*[Ellipse(width=0.5, height=0.2, fill_color=FEUILLE, fill_opacity=1, stroke_width=0).rotate(a)
                  .move_to(P(0.25 * sgn, y)) for a, sgn, y in ((0.4, 1, 0.55), (-0.4, -1, 0.85), (0.4, 1, 1.15))])
    fr = VGroup(tomate(0.6).move_to(P(-0.3, 0.45)), tomate(0.55).move_to(P(0.32, 0.95)))
    return VGroup(tige, fe, fr, pot, bord).scale(s)


def bastien(s=1.0):
    """Bastien, horticulteur : tablier vert, chapeau de paille. .tete"""
    p = personne(peau="#c68642", tenue="#e2e8f0", cheveux="#3f2a14")
    tab = p.corps.copy().set_fill("#15803d", 1).scale(0.82).shift(DOWN * 0.12)
    poche = RoundedRectangle(width=0.5, height=0.3, corner_radius=0.05, fill_color="#166534", fill_opacity=1,
                             stroke_width=0).move_to(tab.get_center() + DOWN * 0.15)
    c, r = p.tete.get_center(), p.tete.width / 2
    bord = Ellipse(width=r * 3.4, height=r * 0.55, fill_color="#eab308", fill_opacity=1, stroke_width=0)
    bord.move_to(c + UP * r * 0.55)
    calotte = AnnularSector(inner_radius=0, outer_radius=r * 0.95, angle=PI, start_angle=0, fill_color="#facc15",
                            fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.95)
    ruban = Rectangle(width=r * 1.9, height=r * 0.2, fill_color="#15803d", fill_opacity=1,
                      stroke_width=0).move_to(c + UP * r * 0.68)
    p.add(tab, poche, bord, calotte, ruban)
    return p.scale(s)


def ratio_txt(nombres, xs, y, fs=80, couleur=WHITE):
    """Un ratio écrit « 3 : 4 : 1 » : un Text par nombre, centré sur xs[i], et
    les deux-points entre eux (renvoyés à part : .nombres, .points)."""
    ns = VGroup(*[gras(str(n), fs, couleur).move_to(P(x, y)) for n, x in zip(nombres, xs)])
    pts = VGroup(*[gras(":", fs, couleur).move_to(P((ns[i].get_right()[0] + ns[i + 1].get_left()[0]) / 2, y))
                   for i in range(len(xs) - 1)])  # au milieu du VIDE entre deux nombres (« 9 : 12 »)
    g = VGroup(ns, pts)
    g.nombres, g.dp = ns, pts
    return g


class PropRatioTroisBase(PropTableauBase4e):
    nom_voix = "4e-prop-ratio-trois"
    fichier_marques = "prop_ratio_trois_marques.json"
    X0 = -3.0

    def montre(self, mot, *anims, n=1, rt=0.4):
        if isinstance(mot, tuple):
            mot, n = mot
        self.au_mot(mot, n)
        self.play(*anims, run_time=rt)

    XMIN = -0.2  # le bord gauche des textes de droite (les barres s'arrêtent avant)

    def borne(self, mob, xmin=None):
        """Garde mob entre XMIN et le bord droit (marge de 3 %), loin de Ti-Margo."""
        xmin = self.XMIN if xmin is None else xmin
        xmax = self.BORD_X - 0.3  # place pour un cadre (buff 0,18) ou une insistance
        if mob.get_bottom()[1] < -1.85:
            xmax = min(xmax, 5.2)
        if mob.width > xmax - xmin:
            mob.scale_to_fit_width(xmax - xmin)
        if mob.get_right()[0] > xmax:
            mob.shift(LEFT * (mob.get_right()[0] - xmax))
        if mob.get_left()[0] < xmin:
            mob.shift(RIGHT * (xmin - mob.get_left()[0]))
        return mob

    def lc(self, morceaux, y, fs=40, x=None):
        return self.borne(super().lc(morceaux, y, fs=fs, x=x))

    def ligne_rep(self, i, morceaux, fs=None):
        """Chaque morceau de la réponse est posé à SON mot (montre) : il
        n'attend pas « seaux » redit plus loin (audité quand même)."""
        lg = super().ligne_rep(i, morceaux, fs)
        for m in lg:
            m.sans_synchro = True
        return lg

    def jouer(self, lg, mots, extra=None, rt=0.3):
        """Un morceau posé à SON mot n'attend plus « seaux » redit plus loin."""
        for m, mot in zip(lg, mots):
            if mot:
                m.sans_synchro = True
        super().jouer(lg, mots, extra, rt)

    def boite(self, mob, couleur=VERT_OK):
        return SurroundingRectangle(mob, color=couleur, buff=0.18, corner_radius=0.12, stroke_width=4)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Un ratio à trois termes", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Un ratio")
        pot = pot_plante(0.9).move_to(P(-5.3, 0.1))
        ss = VGroup(*[seau(c, 0.75) for _, c, _, _ in INGR]).arrange(RIGHT, buff=0.25).move_to(P(4.9, 0.6))
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(pot, shift=UP * 0.2),
                  LaggedStart(*[FadeIn(x, shift=DOWN * 0.2) for x in ss], lag_ratio=0.2), run_time=0.8)
        q = self.t("Le terreau de Bastien", 40, AMBRE).move_to(P(0.0, 0.25))
        self.au_mot("Le terreau")
        self.play(FadeIn(q, scale=1.15), run_time=0.6)
        self.insister(q, 1.1, 0.25)
        self.attendre_voix(marge=0.6)

    # ── 01 : Bastien, trois ingrédients, 3 : 4 : 1 ──────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = bastien(0.95).move_to(P(-5.2, -0.4))
        nom = self.t("Bastien", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.35)
        self.montre("Voici Bastien", FadeIn(pers, shift=UP * 0.3), FadeIn(nom), rt=0.6)
        met = self.t("horticulteur", 30, BLEU_CALCUL).next_to(pers, DOWN, buff=0.15)
        self.montre("horticulteur", FadeIn(met, shift=DOWN * 0.1), rt=0.4)
        fl = VGroup(*[fleur(c, 0.85) for c in ("#f472b6", "#a78bfa", "#fb923c")]).arrange(RIGHT, buff=0.15)
        fl.move_to(P(-2.6, 0.9))
        to = VGroup(*[tomate(0.8) for _ in range(3)]).arrange(RIGHT, buff=0.12).move_to(P(-2.6, -0.6))
        self.montre("des fleurs", LaggedStart(*[GrowFromEdge(f, DOWN) for f in fl], lag_ratio=0.25), rt=0.6)
        self.montre("des légumes", LaggedStart(*[FadeIn(x, scale=0.5) for x in to], lag_ratio=0.25), rt=0.5)
        tit = self.t("Son terreau maison", 42, JAUNE_TITRE).move_to(P(2.6, 2.95))
        self.montre("Son terreau", Write(tit), rt=0.5)
        XS = (0.6, 2.6, 4.6)
        for x, (nom_i, c, ct, _), mot in zip(XS, INGR, ("du compost", "de la terre", "du sable")):
            s_ = seau(c, 1.0).move_to(P(x, 1.35))
            lb = self.t(nom_i, 32, ct).move_to(P(x, 0.4))
            self.montre(mot, FadeIn(s_, shift=DOWN * 0.25), FadeIn(lb, shift=UP * 0.1), rt=0.4)
        r = ratio_txt((3, 4, 1), XS, -0.75, fs=76)
        lr = self.t("Ratio", 36, AMBRE).next_to(r.nombres[0], LEFT, buff=0.55)
        self.montre("ratio 3", FadeIn(lr, shift=RIGHT * 0.2), rt=0.25)
        self.montre("3 pour 4", FadeIn(r.nombres[0], scale=1.4), rt=0.3)
        self.montre("4 pour", FadeIn(r.dp[0]), FadeIn(r.nombres[1], scale=1.4), rt=0.35)
        self.montre("1.", FadeIn(r.dp[1]), FadeIn(r.nombres[2], scale=1.4), rt=0.35)
        self.play(Create(self.boite(r, AMBRE)), run_time=0.5)
        self.attendre_voix()

    # ── 02 : lire le ratio : les seaux, l'ordre ─────────────────────────────
    def ecran_lire(self):
        self.ecran("02-lire")
        tit = self.t("On l'écrit", 42, JAUNE_TITRE).move_to(P(3.4, 2.95))
        self.montre("On l'écrit", FadeIn(tit, shift=DOWN * 0.1), rt=0.3)
        XS = (1.7, 3.4, 5.1)
        r = ratio_txt((3, 4, 1), XS, 1.75, fs=96)
        self.montre("3, deux", FadeIn(r.nombres[0], scale=1.4), rt=0.3)
        self.montre("deux-points", FadeIn(r.dp[0], scale=1.6), rt=0.3)
        self.montre("4, deux", FadeIn(r.nombres[1], scale=1.4), rt=0.3)
        self.montre(("deux-points", 2), FadeIn(r.dp[1], scale=1.6), rt=0.3)
        self.montre("1. Pour", FadeIn(r.nombres[2], scale=1.4), rt=0.3)
        ys = (1.75, 0.35, -1.05)
        for i, ((nom_i, c, ct, _), n, mot, s_txt) in enumerate(zip(INGR, (3, 4, 1), ("3 seaux de c", "4 seaux de t", "1 seau"),
                                                                  ("3 seaux", "4 seaux", "1 seau"))):
            lb = sans(self.t(nom_i, 30, ct)).move_to(P(-5.6, ys[i]))
            ic = VGroup(*[seau(c, 0.6) for _ in range(n)]).arrange(RIGHT, buff=0.12)
            ic.move_to(P(0, ys[i])).align_to(P(-4.6, 0), LEFT)
            ct_ = self.t(s_txt, 30).move_to(P(0, ys[i])).align_to(P(-1.55, 0), LEFT)
            self.montre(mot, FadeIn(lb, shift=RIGHT * 0.2), LaggedStart(*[FadeIn(x, shift=DOWN * 0.2) for x in ic],
                                                                       lag_ratio=0.15), FadeIn(ct_), rt=0.5)
        lo = self.borne(self.t("L'ordre : celui des ingrédients", 30, AMBRE).move_to(P(3.3, -0.35)), 0.3)
        self.montre("L'ordre", FadeIn(lo, shift=UP * 0.15), rt=0.4)
        mots = (("compost, terre", 1), ("terre, sable", 1), ("sable.", 2))
        for i, ((nom_i, c, ct, _), m) in enumerate(zip(INGR, mots)):
            w = self.t(nom_i, 30, ct).move_to(P(XS[i], 0.65))
            self.montre(m, FadeIn(w, shift=UP * 0.15), Indicate(r.nombres[i], color=ct, scale_factor=1.2), rt=0.4)
        self.attendre_voix()

    # ── 03 : trois quotients égaux = la valeur d'une part ───────────────────
    def ecran_quotients(self):
        self.ecran("03-quotients")
        rs, noms = barres((3, 4, 1))
        XR = 3.0
        tit = self.lc([("Comme avec deux termes", JAUNE_TITRE)], 2.95, fs=40, x=XR)
        self.jouer(tit, ["Comme avec"], {0: [FadeIn(noms), LaggedStart(*[FadeIn(r, shift=RIGHT * 0.2) for r in rs],
                                                                        lag_ratio=0.2)]})
        L = []
        for i, (y, (nom_i, c, ct, _), n, mots) in enumerate(zip((1.75, 0.85, -0.05), INGR, (3, 4, 1),
                                                                (("le compost divisé", "3, égale"),
                                                                 ("égale la terre", "4, égale"),
                                                                 ("égale le sable", "1. Ce")))):
            lg = self.lc([(("" if i == 0 else "= ") + nom_i + " ÷", ct), (str(n), WHITE)], y, fs=44, x=XR)
            self.jouer(lg, list(mots), {1: [Indicate(rs[i], color=ct, scale_factor=1.06)]})
            L.append(lg)
        self.montre("Ce quotient", Circumscribe(VGroup(*L), color=AMBRE, buff=0.15), rt=0.8)
        tp = self.borne(self.tampon("= la valeur d'une part", AMBRE, 32).move_to(P(XR, -1.3)))
        cad = VGroup(*[SurroundingRectangle(r.blocs[0], color=AMBRE, buff=0.05, stroke_width=6) for r in rs])
        self.montre("la valeur", FadeIn(tp, scale=1.05), rt=0.45)
        self.montre("d'une part", LaggedStart(*[Create(c_) for c_ in cad], lag_ratio=0.2), rt=0.6)
        self.insister(tp, 1.08, 0.25)
        self.attendre_voix()

    # ── 04 : le calcul : 6 seaux de sable → 18 et 24 seaux ──────────────────
    def ecran_calcul(self):
        self.ecran("04-calcul")
        rs, noms = barres((3, 4, 1))
        self.add(noms, rs)
        XR = 3.0
        L0 = self.lc([("6 seaux", WHITE), ("de sable", SABLE_T)], 2.9, fs=42, x=XR)
        self.jouer(L0, ["6 seaux de", "de sable"], {1: [Indicate(rs[2], color=SABLE_T, scale_factor=1.15)]})
        L1 = self.lc([("6 ÷", WHITE), ("1 :", WHITE), ("une part =", AMBRE), ("6 seaux", VERT_OK)], 1.95, fs=42,
                     x=XR)
        L1[0].sans_synchro = L1[0]._pas_audit = True  # les 6 seaux de sable, dits à l'instant
        self.jouer(L1, ["Le sable divisé", "1 : une", "une part", "6 seaux. Compo"],
                   {3: [FadeIn(rs[2].valeurs(6), scale=1.3)]})
        L2 = self.lc([("Compost :", COMPOST_T), ("3 ×", WHITE), ("6 =", WHITE), ("18 seaux", VERT_OK)], 0.95, fs=42,
                     x=XR)
        self.jouer(L2, ["Compost :", "3 fois", "6, égale", "18 seaux"],
                   {1: [Indicate(rs[0], color=COMPOST_T, scale_factor=1.06)], 2: [FadeIn(rs[0].valeurs(6), scale=1.3)]})
        L3 = self.lc([("Terre :", TERRE_T), ("4 ×", WHITE), ("6 =", WHITE), ("24 seaux", VERT_OK)], -0.05, fs=42, x=XR)
        self.jouer(L3, ["Terre :", "4 fois", ("6, égale", 2), "24 seaux"],
                   {1: [Indicate(rs[1], color=TERRE_T, scale_factor=1.06)], 2: [FadeIn(rs[1].valeurs(6), scale=1.3)]})
        tp = self.borne(self.tampon("Un seul nombre connu suffit !", VERT_OK, 34).move_to(P(XR - 0.1, -1.3)))
        self.montre("Un seul nombre", FadeIn(tp, scale=1.05), rt=0.45)
        self.play(Circumscribe(rs[2], color=SABLE_T, buff=0.08), run_time=0.8)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (3 : 4 : 1 ; 12 seaux de compost → sable ?) ────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        rs, noms = barres((3, 4, 1), x=-4.2, y=1.6)
        pot = pot_plante(0.75).move_to(P(-3.0, -2.0))
        self.add(noms, rs, pot)

        def apres(sc):
            sc.play(FadeOut(pot), run_time=0.3)
            l0 = sc.ligne_rep(0, ["12 ÷", "3 =", "4 seaux :", "une part."])
            l1 = sc.ligne_rep(1, ["Sable =", "1 ×", "4 =", "4 seaux."])
            l2 = sc.ligne_rep(2, ["Et 16 seaux :", "la terre", "(4 × 4)."])
            sc.montre("12 divisé", FadeIn(l0[0], shift=UP * 0.15), rt=0.3)
            sc.montre("3, égale", FadeIn(l0[1], shift=UP * 0.15), Indicate(rs[0], color=COMPOST_T, scale_factor=1.06),
                      rt=0.35)
            sc.montre("4 : une", FadeIn(l0[2], scale=1.3), FadeIn(rs[0].valeurs(4), scale=1.3), rt=0.35)
            sc.montre("une part", FadeIn(l0[3], shift=UP * 0.15), rt=0.3)
            sc.montre("Sable :", FadeIn(l1[0], shift=UP * 0.15), rt=0.3)
            sc.montre("1 fois", FadeIn(l1[1], shift=UP * 0.15), rt=0.3)
            sc.montre("4, égale", FadeIn(l1[2], shift=UP * 0.15), rt=0.3)
            sc.montre("4 seaux. Et", FadeIn(l1[3], scale=1.3), FadeIn(rs[2].valeurs(4), scale=1.3), rt=0.35)
            sc.montre("16 seaux", FadeIn(l2[0], shift=UP * 0.15), Create(barre_r(sc.cartes_q[1][1][1])), rt=0.4)
            sc.montre("la terre", FadeIn(l2[1], shift=UP * 0.15), Indicate(rs[1], color=TERRE_T, scale_factor=1.06),
                      rt=0.35)
            sc.montre("4.", FadeIn(l2[2], shift=UP * 0.15), FadeIn(rs[1].valeurs(4), scale=1.3), rt=0.35)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["Ratio 3 : 4 : 1.", "12 seaux de compost :", "combien de sable ?"],
                            [sans_sync(self.t("4 seaux", 34)), sans_sync(self.t("16 seaux", 34)), sans_sync(self.t("36 seaux", 34))], 0,
                            ["12 ÷ 3 = 4 seaux : une part.", "Sable = 1 × 4 = 4 seaux.",
                             "Et 16 seaux : la terre (4 × 4)."], mot_q="Ratio compost", autres_r=apres,
                            mots_choix=("4 seaux. B", "16 seaux. C", "36 seaux. Mets"))

    # ── 06 : simplifier 6 : 9 : 12 → 2 : 3 : 4 ──────────────────────────────
    def ecran_simplifier(self):
        self.ecran("06-simplifier")
        XR, XS = 3.0, (1.3, 3.0, 4.7)
        rs, noms = barres((6, 9, 12), x=-4.2, y=1.5, bw=0.32)
        neufs, _ = barres((2, 3, 4), x=-4.2, y=1.5, bw=0.96, noms=False)
        tit = self.lc([("Simplifier", JAUNE_TITRE)], 2.95, fs=44, x=XR)
        self.jouer(tit, ["se simplifie"])
        L1 = self.lc([("On divise les trois nombres", WHITE)], 2.1, fs=34, x=XR)
        self.jouer(L1, ["on divise"])
        L2 = self.lc([("par le même nombre", AMBRE)], 1.45, fs=34, x=XR)
        self.jouer(L2, ["par le même"])
        r1 = ratio_txt((6, 9, 12), XS, 0.45, fs=64)
        for i, mot in enumerate(("6 pour", "9 pour", "12 :")):
            anims = [FadeIn(r1.nombres[i], scale=1.4), FadeIn(noms[i]), FadeIn(rs[i], shift=RIGHT * 0.2)]
            if i:
                anims.append(FadeIn(r1.dp[i - 1]))
            self.montre(mot, *anims, rt=0.35)
        d3 = VGroup(*[self.t("÷ 3", 30, AMBRE).move_to(P(x, -0.4)) for x in XS])
        grp = VGroup(*[r.groupes(3) for r in rs])
        self.montre("divise par 3", LaggedStart(*[FadeIn(d, shift=DOWN * 0.15) for d in d3], lag_ratio=0.2),
                    LaggedStart(*[Create(g) for g in grp], lag_ratio=0.2), rt=0.7)
        r2 = ratio_txt((2, 3, 4), XS, -1.25, fs=64, couleur=VERT_OK)
        for i, mot in enumerate(("2 pour 3", "3 pour 4", "4.")):
            anims = [FadeIn(r2.nombres[i], scale=1.4), Transform(rs[i], neufs[i]), FadeOut(grp[i])]
            if i:
                anims.append(FadeIn(r2.dp[i - 1]))
            self.montre(mot, *anims, rt=0.4)
        self.play(Create(self.boite(r2, VERT_OK)), run_time=0.5)
        self.attendre_voix()

    # ── 07 : le piège : on ne simplifie pas un seul nombre ──────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        XR, XS = 3.0, (1.3, 3.0, 4.7)
        rs, noms = barres((6, 9, 12), x=-4.2, y=2.45, bw=0.32, h=0.58, ecart=0.72)
        fx, nfx = barres((2, 9, 12), x=-4.2, y=-0.35, bw=0.32, h=0.58, ecart=0.72)
        self.add(noms, rs)
        tit = self.lc([("Attention au piège !", ROUGE_ERREUR)], 2.95, fs=42, x=XR)
        self.jouer(tit, ["Attention"])
        L1 = self.lc([("Pas un seul nombre !", ROUGE_P)], 2.1, fs=38, x=XR)
        self.jouer(L1, ["pas un seul"])
        r1 = ratio_txt((6, 9, 12), XS, 1.05, fs=60)
        for i, mot in enumerate(("6 pour", "9 pour", "12, ce")):
            anims = [FadeIn(r1.nombres[i], scale=1.4), Indicate(rs[i], color=INGR[i][2], scale_factor=1.05)]
            if i:
                anims.append(FadeIn(r1.dp[i - 1]))
            self.montre(mot, *anims, rt=0.35)
        r2 = ratio_txt((2, 9, 12), XS, -0.25, fs=60, couleur=ROUGE_P)
        ne = gras("≠", 60, ROUGE_ERREUR).move_to(P(0.35, -0.25))
        self.montre("ce n'est pas", FadeIn(ne, scale=1.4), rt=0.3)
        self.montre("2 pour 9", FadeIn(r2.nombres[0], scale=1.4), FadeIn(nfx[0]), FadeIn(fx[0], shift=RIGHT * 0.2), rt=0.35)
        self.montre(("9 pour", 2), FadeIn(r2.dp[0]), FadeIn(r2.nombres[1], scale=1.4), FadeIn(nfx[1]),
                    FadeIn(fx[1], shift=RIGHT * 0.2), rt=0.35)
        self.montre("12. Les", FadeIn(r2.dp[1]), FadeIn(r2.nombres[2], scale=1.4), FadeIn(nfx[2]),
                    FadeIn(fx[2], shift=RIGHT * 0.2), rt=0.35)
        self.play(Create(barre_r(VGroup(ne, r2))), Circumscribe(VGroup(rs[0], fx[0]), color=ROUGE_ERREUR, buff=0.08),
                  run_time=0.6)
        tp = self.borne(self.tampon("Les trois changent ensemble !", VERT_OK, 32).move_to(P(XR - 0.15, -1.45)))
        grp = VGroup(*[r.groupes(3, VERT_OK) for r in rs])
        self.montre("Les trois", FadeIn(tp, scale=1.05), LaggedStart(*[Create(g) for g in grp], lag_ratio=0.2), rt=0.6)
        self.insister(tp, 1.06, 0.25)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (simplifier 10 : 15 : 25) ──────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        rs, noms = barres((10, 15, 25), x=-4.2, y=1.6, bw=0.152)
        neufs, _ = barres((2, 3, 5), x=-4.2, y=1.6, bw=0.76, noms=False)
        self.add(noms, rs)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["10, 15 et 25", "÷ 5"])
            l1 = sc.ligne_rep(1, ["→ 2", ": 3", ": 5"])
            grp = VGroup(*[r.groupes(5) for r in rs])
            sc.montre("10, 15", FadeIn(l0[0], shift=UP * 0.15), rt=0.3)
            sc.montre("5 : 2", FadeIn(l0[1], scale=1.3), LaggedStart(*[Create(g) for g in grp], lag_ratio=0.2), rt=0.6)
            for i, mot in enumerate(("2 pour 3", "3 pour 5", "5.")):
                sc.montre(mot, FadeIn(l1[i], scale=1.2), Transform(rs[i], neufs[i]), FadeOut(grp[i]), rt=0.4)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse",
                            ["Simplifie le ratio", "10 : 15 : 25."],
                            [self.t("2 : 3 : 5", 34), self.t("2 : 15 : 25", 34), self.t("1 : 1,5 : 25", 34)], 0,
                            ["10, 15 et 25 ÷ 5", "→ 2 : 3 : 5"], mot_q="Simplifie", autres_r=apres)

    # ── 09 : défi : les tomates, 2 : 5 : 1, 15 seaux de terre ──────────────
    def defi_figure(self):
        rs, noms = barres((2, 5, 1), x=-4.2, y=1.2, bw=0.76)
        t15 = self.t("terre : 15 seaux", 30, TERRE_T).move_to(P(-2.4, -1.65))
        t15.sans_synchro = True  # posé au mot « 15 seaux » (audité), sans attendre « terre »
        pot = pot_plante(0.7).move_to(P(-5.3, -2.3))
        return rs, noms, t15, pot

    def ecran_defi(self):
        self.ecran("09-defi")
        XR = 3.0
        rs, noms, t15, pot = self.defi_figure()
        tit = self.lc([("À toi de jouer !", JAUNE_TITRE)], 2.95, fs=50, x=XR)
        self.jouer(tit, ["À toi de jouer"])
        L0 = self.lc([("Pour ses tomates", WHITE)], 2.05, fs=38, x=XR)
        self.jouer(L0, ["Pour ses tomates"], {0: [FadeIn(pot, shift=UP * 0.2)]})
        L1 = self.lc([("Compost : terre : sable", WHITE)], 1.25, fs=36, x=XR)
        self.jouer(L1, ["mélange compost"])
        L2 = self.lc([("= 2", AMBRE), (": 5", AMBRE), (": 1", AMBRE)], 0.45, fs=44, x=XR)
        self.jouer(L2, ["2 pour 5", "5 pour 1", "1. Il"],
                   {i: [FadeIn(noms[i]), FadeIn(rs[i], shift=RIGHT * 0.2)] for i in range(3)})
        L3 = self.lc([("15 seaux", WHITE), ("de terre", TERRE_T)], -0.4, fs=40, x=XR)
        self.jouer(L3, ["15 seaux", "de terre"], {0: [FadeIn(t15, scale=1.3)], 1: [Indicate(rs[1], color=TERRE_T,
                                                                                            scale_factor=1.05)]})
        qs = VGroup(*[gras("?", 40, AMBRE).move_to(rs[i]) for i in (0, 2)])
        L4 = self.lc([("Compost ?", COMPOST_T), ("et sable ?", SABLE_T)], -1.2, fs=40, x=XR)
        self.jouer(L4, ["Combien de compost", "combien de sable"], {0: [FadeIn(qs[0], scale=1.4)],
                                                                     1: [FadeIn(qs[1], scale=1.4)]})
        self.pause_defi(y=-2.1)

    def ecran_correction(self):
        self.ecran("09b-correction")
        XR = 3.0
        rs, noms, t15, pot = self.defi_figure()
        self.add(noms, rs, sans(t15), pot)
        tit = self.t("Correction", 48, JAUNE_TITRE).move_to(P(XR, 3.0))
        self.play(Write(tit), run_time=0.5)
        C1 = self.lc([("15 ÷", WHITE), ("5 =", WHITE), ("3 seaux :", VERT_OK), ("une part", AMBRE)], 1.95, fs=40, x=XR)
        self.jouer(C1, ["15 divisé", "5, égale", "3 : une", "une part"], {2: [FadeIn(rs[1].valeurs(3), scale=1.3)]})
        C2 = self.lc([("Compost :", COMPOST_T), ("2 ×", WHITE), ("3 =", WHITE), ("6 seaux", VERT_OK)], 0.95, fs=40,
                     x=XR)
        self.jouer(C2, ["Compost :", "2 fois", "3, égale", "6 seaux"], {2: [FadeIn(rs[0].valeurs(3), scale=1.3)]})
        C3 = self.lc([("Sable :", SABLE_T), ("1 ×", WHITE), ("3 =", WHITE), ("3 seaux", VERT_OK)], -0.05, fs=40, x=XR)
        self.jouer(C3, ["Sable :", "1 fois", ("3, égale", 2), ("3 seaux.", 2)],
                   {2: [FadeIn(rs[2].valeurs(3), scale=1.3)]})
        self.play(Create(self.boite(VGroup(C1, C2, C3), VERT_OK)), run_time=0.5)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        rs, noms = barres((3, 4, 1), x=-4.2, y=1.0)
        fig = VGroup(noms, rs, *[r.valeurs(6, synchro=False) for r in rs])
        self.add(sans(fig))
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Un ratio à trois termes se lit", "comme un ratio à deux termes."),
            ("Chaque quantité ÷ son nombre", "= la valeur d'une part."),
            ("On la trouve avec le nombre connu,", "puis on calcule les autres."),
            ("On simplifie les trois termes", "ensemble.")], fs=34)
        self.au_mot("Un ratio à trois")
        self.montrer_ligne(lignes[0])
        self.au_mot("chaque quantité")
        self.montrer_ligne(lignes[1], *[Create(SurroundingRectangle(r.blocs[0], color=AMBRE, buff=0.04, stroke_width=5)) for r in rs])
        self.au_mot("On la trouve")
        self.montrer_ligne(lignes[2])
        self.au_mot("Et on simplifie")
        self.montrer_ligne(lignes[3])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_lire()
        self.ecran_quotients()
        self.ecran_calcul()
        self.ecran_question1()
        self.ecran_simplifier()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class PropRatioTrois4e(PropRatioTroisBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
