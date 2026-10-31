# prop_agrandissement_rapport.py
# EleveAI — Maths 4e — série « Proportionnalité », lot 4 (agrandissements et
# grandeurs), épisode 11 PROPRE À LA 4e : LE RAPPORT D'AGRANDISSEMENT (micro du
# coach : agrandissement_rapport, notion prop_echelle), AVEC VOIX. Paysage
# 16:9, CEINTURE VERTE (la paysage complète du niveau). Short jumeau :
# prop_agrandissement_rapport_short.py (blanche).
# ⭐ Méthode travaillée : le rapport k est un COEFFICIENT de proportionnalité :
# toutes les longueurs × k ; trouver k = longueur de l'image ÷ longueur du
# modèle ; une réduction = rapport plus petit que 1 (1/4 : ÷ 4). Pas de
# produit en croix (la voix ne l'utilise pas) ; « ÷ » écrit.
# ⭐ Le geste : la photo ET son image CÔTE À CÔTE, flèche « × k » de l'une à
# l'autre ; le visage garde sa forme (× k) ou s'écrase (+ 20 cm).
# ⭐ Leurres (consigne-videos-proportionnalite.md) : erreur 1 « ajouter au lieu
# de multiplier » (question 1 : 14 cm = 12 + 2, 10 cm = 8 + 2 ; écran 05 :
# + 20 cm) ; erreur 3 / écart (question 2 : 12 = 15 − 3, 18 = 15 + 3 ;
# écran 06 : 18 = 24 − 6 barré).
#
# Décor et métier : PHOTOGRAPHIE, Nina, PHOTOGRAPHE, qui agrandit une photo
# en poster pour le salon d'une cliente. Tous les nombres sont inventés
# (photo 10 × 15 cm, rapport 3, timbre de 3 cm, affiche de 20 cm…) : aucun
# chiffre réel, rien à sourcer, rien de faux.
# Centres d'intérêt : art-design, reseaux-sociaux.
#
# Écrans : 00 garde · 01 Nina et la photo 10 cm sur 15 cm · 02 × 3 : 30 cm
# sur 45 cm · 03 les angles et la forme ne changent pas · 04 QUESTION 1
# (8 × 12, rapport 2) · 05 le piège + 20 cm (visage écrasé) · 06 trouver le
# rapport 24 ÷ 6 = 4 (pas 18) · 07 QUESTION 2 (timbre 3 → 15 cm) ·
# 08 réduction 1/4 : 20 ÷ 4 = 5 cm · 09 défi 9 × 13, rapport 4 ·
# 09b correction 36 cm sur 52 cm · 10 ce que tu as appris · 11 fin.
#
# Voix : manim/voix/4e-prop-agrandissement-rapport.json (validée par Frédéric
# le 31/10, débit −10), WAV dans public/sons/4e-prop-agrandissement-rapport/ ;
# marques mot à mot : manim/scripts/4e/prop_agrandissement_rapport_marques.json
# (scripts/marques_dump.ps1 puis scripts/cues2marques.py).
# Outils : manim/scripts/6e/prop_commun.py + manim/canvas_proportion.py (non
# modifiés). Ajouté ICI : Photo (cadre + contenu étiré à ses dimensions : un
# rapport commun garde la forme, + 20 cm l'écrase), visage(), fleur(),
# paysage_affiche(), nina(), appareil(), fleche_k(), angle_droit().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/prop_agrandissement_rapport.py PropAgrandissementRapport4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/4e/prop_agrandissement_rapport.py PropAgrandissementRapport4e -o eleveai-maths-4e-prop-agrandissement-rapport --media_dir manim/media-prop-4e-11
# Sortie : manim/sorties/4e/maths/proportionnalite/11-agrandissement-rapport/eleveai-maths-4e-prop-agrandissement-rapport.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403

BLEU_P = "#2563eb"     # le MODÈLE (la photo)
BLEU_P2 = "#60a5fa"
VERT_R = "#16a34a"     # l'IMAGE (le poster)
AMBRE_F = "#f59e0b"    # la flèche « × k »
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


# ── les contenus des photos (dessinés dans une boîte, puis ÉTIRÉS) ──────────
def visage():
    """Un portrait dessiné pour une photo 10 × 15 (boîte 1 × 1,5)."""
    ciel = Rectangle(width=1, height=1.5, fill_color="#bae6fd", fill_opacity=1, stroke_width=0)
    epaules = Ellipse(width=0.95, height=0.7, fill_color="#7c3aed", fill_opacity=1, stroke_width=0).move_to(
        P(0, -0.62))
    cou = Rectangle(width=0.16, height=0.2, fill_color="#c68642", fill_opacity=1, stroke_width=0).move_to(P(0, -0.2))
    tete = Ellipse(width=0.5, height=0.62, fill_color="#c68642", fill_opacity=1, stroke_width=0).move_to(P(0, 0.17))
    chev = Ellipse(width=0.58, height=0.4, fill_color="#3f1d0b", fill_opacity=1, stroke_width=0).move_to(P(0, 0.42))
    yeux = VGroup(*[Ellipse(width=0.07, height=0.09, fill_color=ENCRE, fill_opacity=1, stroke_width=0).move_to(
        P(x, 0.2)) for x in (-0.11, 0.11)])
    bouche = Arc(radius=0.11, start_angle=PI + 0.5, angle=PI - 1.0, arc_center=P(0, 0.06), color="#7f1d1d",
                 stroke_width=3)
    soleil = Circle(radius=0.1, fill_color="#fde047", fill_opacity=1, stroke_width=0).move_to(P(0.33, 0.58))
    g = VGroup(ciel, soleil, epaules, cou, tete, chev, yeux, bouche)
    return g


def fleur():
    """Le dessin du timbre (boîte 1 × 1,25) : une fleur."""
    fond = Rectangle(width=1, height=1.25, fill_color="#fef9c3", fill_opacity=1, stroke_width=0)
    tige = Line(P(0, -0.5), P(0, 0.05), color="#15803d", stroke_width=4)
    feuille = Ellipse(width=0.22, height=0.1, fill_color="#16a34a", fill_opacity=1, stroke_width=0).move_to(
        P(0.1, -0.25)).rotate(0.5)
    petales = VGroup(*[Circle(radius=0.11, fill_color="#f472b6", fill_opacity=1, stroke_width=0).move_to(
        P(0.15 * np.cos(a), 0.18 + 0.15 * np.sin(a))) for a in np.linspace(0, 2 * PI, 6)[:-1]])
    coeur = Circle(radius=0.08, fill_color="#facc15", fill_opacity=1, stroke_width=0).move_to(P(0, 0.18))
    return VGroup(fond, tige, feuille, petales, coeur)


def paysage_affiche():
    """Le dessin de l'affiche (boîte 1 × 1,25) : soleil, montagne, mer."""
    ciel = Rectangle(width=1, height=1.25, fill_color="#fed7aa", fill_opacity=1, stroke_width=0)
    soleil = Circle(radius=0.17, fill_color="#f97316", fill_opacity=1, stroke_width=0).move_to(P(0.18, 0.2))
    mont = Polygon(P(-0.5, -0.25), P(-0.15, 0.25), P(0.25, -0.25), fill_color="#78716c", fill_opacity=1,
                   stroke_width=0)
    mer = Rectangle(width=1, height=0.38, fill_color="#0ea5e9", fill_opacity=1, stroke_width=0).move_to(
        P(0, -0.435))
    return VGroup(ciel, soleil, mont, mer)


class Photo(VGroup):
    """Une photo de l cm sur h cm (u : unités d'écran par cm), le COIN BAS
    GAUCHE en `bg`. Le contenu est ÉTIRÉ aux dimensions : même rapport sur les
    deux côtés → même forme ; + 20 cm partout → visage écrasé.
    .cadre .contenu · lab_l(s) sous la photo · lab_h(s) à droite."""

    def __init__(self, l, h, u=0.09, bg=ORIGIN, contenu=visage, couleur=BLEU_P, **kw):
        super().__init__(**kw)
        self.l, self.h, self.u = l, h, u
        w, H = l * u, h * u
        self.cadre = Rectangle(width=w, height=H, fill_color=WHITE, fill_opacity=1, stroke_color=couleur,
                               stroke_width=5)
        bord = min(w, H) * 0.06
        c = contenu()
        c.stretch_to_fit_width(w - 2 * bord).stretch_to_fit_height(H - 2 * bord)
        self.contenu = c
        self.add(self.cadre, c)
        self.move_to(bg + np.array([w / 2, H / 2, 0]))
        self.couleur = couleur

    def lab_l(self, s, couleur=None, fs=28):
        return gras(s, fs, couleur or self.couleur).next_to(self.cadre, DOWN, buff=0.14)

    def lab_h(self, s, couleur=None, fs=28, cote=RIGHT):
        return gras(s, fs, couleur or self.couleur).next_to(self.cadre, cote, buff=0.14)


def fleche_k(a, b, s, couleur=AMBRE_F, fs=34, angle=-0.8, haut=0.15):
    """La flèche « × k » du haut de la photo a au haut de l'image b."""
    d = a.cadre.get_top() + UP * haut
    f = b.cadre.get_corner(UL) + UP * haut + RIGHT * min(0.5, b.cadre.width * 0.3)
    fl = CurvedArrow(d, f, angle=angle, color=couleur, stroke_width=6, tip_length=0.22)
    et = gras(s, fs, couleur).next_to(fl.point_from_proportion(0.5), UP, buff=0.12)
    g = VGroup(fl, et)
    g.fleche, g.etiquette = fl, et
    return g


def angle_droit(rect, coin=DL, c=0.2, couleur=AMBRE):
    """Le petit carré de l'angle droit, dans le coin `coin` du rectangle."""
    p = rect.get_corner(coin)
    sx, sy = -coin[0], -coin[1]
    return VMobject(stroke_color=couleur, stroke_width=4).set_points_as_corners(
        [p + RIGHT * sx * c, p + RIGHT * sx * c + UP * sy * c, p + UP * sy * c])


def appareil(s=1.0):
    """Un appareil photo : boîtier noir, objectif, flash."""
    corps = RoundedRectangle(width=0.8, height=0.52, corner_radius=0.08, fill_color="#1f2937", fill_opacity=1,
                             stroke_color="#9ca3af", stroke_width=2)
    obj = Circle(radius=0.17, fill_color="#0ea5e9", fill_opacity=1, stroke_color="#e5e7eb", stroke_width=3)
    flash = Rectangle(width=0.16, height=0.08, fill_color="#fde047", fill_opacity=1, stroke_width=0).move_to(
        P(0.24, 0.3))
    return VGroup(corps, obj, flash).scale(s)


def nina(s=1.0):
    """Nina, photographe : cheveux longs, tenue verte, appareil en main."""
    p = personne(peau="#8d5524", tenue="#0d9488", cheveux="#111827", longs=True)
    ap = appareil(0.75).move_to(P(0.35, -0.85))
    sangle = Line(P(-0.3, -0.45), P(0.2, -0.75), color="#111827", stroke_width=4)
    g = VGroup(p, sangle, ap)
    g.corps, g.appareil = p.corps, ap
    return g.scale(s)


def canape(s=1.0):
    """Le salon de la cliente : un canapé et, au mur, un cadre VIDE en pointillés."""
    dos = RoundedRectangle(width=2.0, height=0.7, corner_radius=0.15, fill_color="#b45309", fill_opacity=1,
                           stroke_width=0).move_to(P(0, 0.2))
    assise = RoundedRectangle(width=2.3, height=0.4, corner_radius=0.12, fill_color="#d97706", fill_opacity=1,
                              stroke_width=0).move_to(P(0, -0.25))
    pieds = VGroup(*[Rectangle(width=0.1, height=0.18, fill_color="#451a03", fill_opacity=1, stroke_width=0)
                     .move_to(P(x, -0.54)) for x in (-1.0, 1.0)])
    cadre = DashedVMobject(Rectangle(width=1.1, height=1.5, stroke_color=WHITE, stroke_width=3), num_dashes=24)
    cadre.move_to(P(0, 1.55))
    g = VGroup(dos, assise, pieds, cadre)
    g.cadre = cadre
    return g.scale(s)


class PropAgrandissementRapportBase(PaysageProp):
    nom_voix = "4e-prop-agrandissement-rapport"
    fichier_marques = "prop_agrandissement_rapport_marques.json"

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

    def paire(self, l1, h1, l2, h2, u=0.09, x1=-6.2, x2=-3.6, y=-2.3, c1=visage, c2=visage):
        """La photo (modèle, bleue) et son image (verte), posées sur la même ligne."""
        a = Photo(l1, h1, u, P(x1, y), contenu=c1, couleur=BLEU_P)
        b = Photo(l2, h2, u, P(x2, y), contenu=c2, couleur=VERT_R)
        return a, b

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Agrandir une photo", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Agrandir")
        a, b = self.paire(10, 15, 30, 45, u=0.055, x1=-5.6, x2=-4.3, y=-1.3)
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(a, scale=0.8), run_time=0.8)
        self.play(GrowFromEdge(b, DL), run_time=0.6)
        q = VGroup(self.t("Par quel nombre", 40), self.t("faut-il multiplier ?", 40, AMBRE))
        q.arrange(DOWN, buff=0.16).move_to(P(2.6, 0.2))
        self.au_mot("Par quel")
        self.play(FadeIn(q[0], shift=UP * 0.15), run_time=0.4)
        self.au_mot("faut-il")
        fl = sans(fleche_k(a, b, "× ?", fs=30, angle=-0.9))
        self.play(FadeIn(q[1], scale=1.15), Create(fl.fleche), FadeIn(fl.etiquette), run_time=0.5)
        self.insister(q[1], 1.12, 0.25)
        self.attendre_voix(marge=0.6)

    # ── 01 : Nina, photographe ; la photo 10 cm sur 15 cm, rapport 3 ────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = nina(0.9).move_to(P(-5.4, -0.75))
        nom = self.t("Nina", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.au_mot("Voici Nina")
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        met = self.t("photographe", 30, BLEU_CALCUL).next_to(pers, DOWN, buff=0.15)
        self.au_mot("photographe")
        self.play(FadeIn(met, shift=DOWN * 0.1), Flash(pers.appareil, color=YELLOW, line_length=0.25), run_time=0.6)
        ph = Photo(10, 15, 0.1, P(-3.75, -1.9))
        self.au_mot("sa photo")
        self.play(FadeIn(ph, scale=0.8), run_time=0.5)
        sal = canape(0.75).move_to(P(-0.4, -0.6))
        self.au_mot("salon")
        self.play(FadeIn(sal, shift=UP * 0.2), run_time=0.5)
        self.play(Indicate(sal.cadre, color=AMBRE), run_time=0.6)
        L1 = self.lc([("Photo :", WHITE), ("10 cm", BLEU_CALCUL), ("sur", WHITE), ("15 cm", BLEU_CALCUL)], 1.6)
        lw, lh = ph.lab_l("10 cm"), ph.lab_h("15 cm")
        self.jouer(L1, ["La photo", "10 cm", None, "15 cm"],
                   {1: [FadeIn(lw, scale=1.3)], 3: [FadeIn(lh, scale=1.3)]})
        L2 = self.lc([("Rapport :", WHITE), ("3", AMBRE)], 0.6, fs=46)
        self.jouer(L2, ["un rapport", "3."])
        self.insister(L2[1], 1.3, 0.25)
        self.attendre_voix()

    # ── 02 : × 3 : 30 cm sur 45 cm ──────────────────────────────────────────
    def ecran_multiplier(self):
        self.ecran("02-multiplier")
        a, b = self.paire(10, 15, 30, 45)
        la, ha = sans(a.lab_l("10 cm", fs=26)), sans(a.lab_h("15 cm", fs=26))
        self.add(a, la, ha)
        L0 = self.lc([("Rapport 3 :", WHITE)], 2.6)
        L0b = self.lc([("toutes les longueurs × 3", AMBRE)], 1.95, fs=38)
        fl = fleche_k(a, b, "× 3")
        self.au_mot("Agrandir")
        self.play(FadeIn(L0, shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("multiplier")
        self.play(FadeIn(L0b, shift=RIGHT * 0.2), Create(fl.fleche), FadeIn(fl.etiquette, scale=1.3), run_time=0.5)
        L1 = self.lc([("Largeur :", WHITE), ("10 ×", WHITE), ("3", WHITE), ("=", WHITE), ("30 cm", VERT_OK)], 0.9)
        bas = Line(b.cadre.get_corner(DL), b.cadre.get_corner(DR), color=VERT_R, stroke_width=8)
        lb = b.lab_l("30 cm")
        self.jouer(L1, ["La largeur", "10 fois", ("3, égale", 1), "égale", "30 cm"],
                   {1: [Indicate(la, color=BLEU_P2)], 4: [Create(bas), FadeIn(lb, scale=1.3)]})
        L2 = self.lc([("Longueur :", WHITE), ("15 ×", WHITE), ("3", WHITE), ("=", WHITE), ("45 cm", VERT_OK)], 0.0)
        hb = b.lab_h("45 cm")
        self.jouer(L2, ["La longueur", "15 fois", ("3, égale", 2), ("égale", 2), "45 cm"],
                   {1: [Indicate(ha, color=BLEU_P2)], 4: [GrowFromEdge(b, DOWN), FadeIn(hb, scale=1.3)]})
        self.remove(bas)
        car = self.lc([("Poster :", WHITE), ("30 cm", VERT_OK), ("sur", WHITE), ("45 cm", VERT_OK)], -1.05, fs=42)
        cadre = SurroundingRectangle(car, color=VERT_OK, buff=0.18, corner_radius=0.12, stroke_width=4)
        self.jouer(car, ["Le poster", ("30 cm", 2), None, ("45 cm", 2)], {0: [Create(cadre)]})
        self.insister(VGroup(cadre, car), 1.06, 0.25)
        self.attendre_voix()

    # ── 03 : les angles et la forme ne changent pas ─────────────────────────
    def ecran_forme(self):
        self.ecran("03-forme")
        a, b = self.paire(10, 15, 30, 45)
        fl = sans(fleche_k(a, b, "× 3"))
        labs = sans(VGroup(a.lab_l("10 cm", fs=26), a.lab_h("15 cm", fs=26), b.lab_l("30 cm"), b.lab_h("45 cm")))
        self.add(a, b, fl, labs)
        L1 = VGroup(self.lc([("Les angles", WHITE)], 2.6), self.lc([("ne changent pas.", WHITE)], 2.05))
        coins = VGroup(*[angle_droit(r.cadre, c, 0.14 if r is a else 0.3) for r in (a, b) for c in (DL, DR, UL, UR)])
        self.au_mot("Les angles")
        self.play(FadeIn(L1[0], shift=RIGHT * 0.2), Create(coins), run_time=0.6)
        self.au_mot("ne changent")
        self.play(FadeIn(L1[1], shift=RIGHT * 0.15), run_time=0.35)
        L2 = VGroup(self.lc([("Même forme,", VERT_OK)], 1.2, fs=42), self.lc([("plus grand !", VERT_OK)], 0.6, fs=42))
        cp = a.contenu.copy()
        self.au_mot("Le visage")
        self.play(Indicate(a.contenu, scale_factor=1.15), run_time=0.6)
        self.au_mot("la même forme")
        self.play(FadeIn(L2[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("plus grand")
        self.play(FadeIn(L2[1], scale=1.2), cp.animate.scale(3).move_to(b.contenu), run_time=0.9)
        self.play(FadeOut(cp), Indicate(b.contenu, scale_factor=1.05), run_time=0.5)
        L3 = self.lc([("Rapport 3 :", WHITE), ("longueurs", WHITE)], -0.25)
        L4 = self.lc([("3 fois plus grandes", AMBRE)], -0.9, fs=38, droite=5.9)
        y = b.cadre.get_bottom()[1] - 0.68
        x0, w = b.cadre.get_left()[0], a.cadre.width
        segs = VGroup(*[Line(P(x0 + k * w, y), P(x0 + (k + 1) * w, y), color=BLEU_P2, stroke_width=8)
                        for k in range(3)])
        tics = VGroup(*[Line(P(x0 + k * w, y - 0.12), P(x0 + k * w, y + 0.12), color=WHITE, stroke_width=3)
                        for k in range(4)])
        self.au_mot("Avec un rapport")
        self.play(FadeIn(L3, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("3 fois")
        self.play(FadeIn(L4, scale=1.15), LaggedStart(*[Create(s) for s in segs], lag_ratio=0.4), Create(tics),
                  run_time=0.9)
        self.insister(L4, 1.12, 0.25)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (8 cm sur 12 cm, rapport 2 : la longueur ?) ─────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        a, b = self.paire(8, 12, 16, 24, u=0.11, x1=-6.2, x2=-3.85, y=-2.2)
        self.add(a)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["12 ×", "2 =", "24 cm."])
            la = a.lab_h("12 cm", fs=26)
            fl = fleche_k(a, b, "× 2", fs=30)
            sc.au_mot("12 fois")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), FadeIn(la, scale=1.3), run_time=0.3)
            sc.au_mot("2, égale")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), Create(fl.fleche), FadeIn(fl.etiquette, scale=1.3), run_time=0.35)
            sc.au_mot("24 cm")
            sc.play(FadeIn(l0[2], scale=1.3), GrowFromEdge(b, DOWN), FadeIn(b.lab_h("24 cm", fs=28), scale=1.3),
                    run_time=0.5)
            l1 = sc.ligne_rep(1, ["On multiplie,", "on n'ajoute pas."])
            sc.au_mot("On multiplie")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("on n'ajoute")
            sc.play(FadeIn(l1[1], shift=UP * 0.15), run_time=0.3)
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse",
                            ["Une photo : 8 cm sur 12 cm.", "Agrandie avec un rapport 2.", "Sa nouvelle longueur ?"],
                            [self.t("14 cm", 34), self.t("24 cm", 34), self.t("10 cm", 34)], 1,
                            ["12 × 2 = 24 cm.", "On multiplie, on n'ajoute pas."], mot_q="Une photo",
                            autres_r=apres)

    # ── 05 : le piège : + 20 cm partout, le visage est écrasé ───────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        tit = self.t("Attention au piège !", 44, ROUGE_ERREUR).move_to(P(-2.9, 3.1))
        self.au_mot("Attention")
        self.play(Write(tit), run_time=0.5)
        a = Photo(10, 15, 0.09, P(-6.2, -2.3))
        b = Photo(30, 35, 0.09, P(-3.6, -2.3), couleur=ROUGE_ERREUR)
        la, ha = sans(a.lab_l("10 cm", fs=26)), sans(a.lab_h("15 cm", fs=26))
        self.play(FadeIn(a), FadeIn(la), FadeIn(ha), run_time=0.4)
        L0 = self.lc([("Un stagiaire :", WHITE), ("+ 20 cm", ROUGE_ERREUR)], 2.4)
        fl = fleche_k(a, b, "+ 20 cm", couleur=ROUGE_ERREUR, fs=30)
        self.jouer(L0, ["Un stagiaire", "20 cm"], {1: [Create(fl.fleche), FadeIn(fl.etiquette, scale=1.3)]})
        L1 = self.lc([("10 +", WHITE), ("20", WHITE), ("=", WHITE), ("30 cm", ROUGE_ERREUR)], 1.7)
        bas = Line(b.cadre.get_corner(DL), b.cadre.get_corner(DR), color=ROUGE_ERREUR, stroke_width=8)
        self.jouer(L1, ["10 plus", ("20,", 1), "égale", "30 cm"], {3: [Create(bas), FadeIn(b.lab_l("30 cm"), scale=1.3)]})
        L2 = self.lc([("15 +", WHITE), ("20", WHITE), ("=", WHITE), ("35 cm", ROUGE_ERREUR)], 1.0)
        self.jouer(L2, ["15 plus", ("20,", 2), ("égale", 2), "35 cm"],
                   {3: [GrowFromEdge(b, DOWN), FadeIn(b.lab_h("35 cm"), scale=1.3)]})
        self.remove(bas)
        L3 = self.lc([("30 cm sur", WHITE), ("35 cm :", WHITE)], 0.3)
        self.jouer(L3, [("30 cm", 2), ("35 cm", 2)])
        L3b = self.lc([("le visage est", WHITE), ("écrasé !", ROUGE_ERREUR)], -0.35)
        self.jouer(L3b, ["le visage", "écrasé"], {1: [Wiggle(b.contenu)]})
        L4 = self.lc([("Ajouter déforme.", ROUGE_ERREUR)], -1.0)
        self.au_mot("Ajouter")
        self.play(FadeIn(L4, shift=RIGHT * 0.2), Create(croix(fl.etiquette, sw=6)), run_time=0.45)
        juste = DashedVMobject(Rectangle(width=2.7, height=4.05, stroke_color=VERT_OK, stroke_width=4),
                               num_dashes=40).move_to(b.cadre.get_corner(DL) + P(1.35, 2.025))
        L5 = self.lc([("Multiplier garde la forme.", VERT_OK)], -1.6, fs=38)
        self.au_mot("Multiplier")
        self.play(FadeIn(L5, shift=RIGHT * 0.2), Create(juste), run_time=0.6)
        self.insister(L5, 1.08, 0.25)
        self.attendre_voix()

    # ── 06 : trouver le rapport : 24 ÷ 6 = 4 (pas 18 = 24 − 6) ──────────────
    def ecran_trouver(self):
        self.ecran("06-trouver")
        tit = self.t("Trouver le rapport", 44, JAUNE_TITRE).move_to(P(-2.9, 3.1))
        self.play(Write(tit), run_time=0.5)
        a, b = self.paire(6, 9, 24, 36, u=0.1, x1=-6.2, x2=-4.7, y=-2.2)
        self.au_mot("une photo")
        self.play(FadeIn(a, scale=0.8), run_time=0.4)
        self.au_mot("6 cm")
        self.play(FadeIn(a.lab_l("6 cm"), scale=1.3), Indicate(a.cadre, color=BLEU_P2), run_time=0.4)
        self.au_mot("un poster")
        self.play(GrowFromEdge(b, DL), run_time=0.6)
        self.au_mot("24 cm")
        self.play(FadeIn(b.lab_l("24 cm"), scale=1.3), run_time=0.4)
        fl = fleche_k(a, b, "× ?", fs=34)
        sans(fl.etiquette)
        self.au_mot("Quel rapport")
        self.play(Create(fl.fleche), FadeIn(fl.etiquette, scale=1.3), run_time=0.5)
        L0 = self.lc([("Rapport :", WHITE), ("poster ÷ photo", AMBRE)], 2.3)
        sans(L0)
        self.au_mot("On divise")
        self.play(FadeIn(L0, shift=RIGHT * 0.2), run_time=0.45)
        L1 = self.lc([("24 ÷", WHITE), ("6", WHITE), ("=", WHITE), ("4", VERT_OK)], 1.4, fs=46)
        y = b.cadre.get_bottom()[1] - 0.68
        x0, w = b.cadre.get_left()[0], a.cadre.width
        segs = VGroup(*[Line(P(x0 + k * w + 0.03, y), P(x0 + (k + 1) * w - 0.03, y), color=BLEU_P2, stroke_width=8)
                        for k in range(4)])
        self.jouer(L1, ["24 divisé", "par 6", ("égale", 1), "4."],
                   {3: [LaggedStart(*[Create(s) for s in segs], lag_ratio=0.3)]})
        car = self.lc([("Le rapport est", WHITE), ("4", VERT_OK)], 0.45, fs=44)
        cadre = SurroundingRectangle(car, color=VERT_OK, buff=0.18, corner_radius=0.12, stroke_width=4)
        neuve = gras("× 4", 34, AMBRE_F).move_to(fl.etiquette)
        self.jouer(car, ["Le rapport est", "est 4"], {1: [Create(cadre), Transform(fl.etiquette, neuve)]})
        self.insister(VGroup(cadre, car), 1.06, 0.2)
        L2 = self.lc([("Pas", ROUGE_ERREUR), ("18 :", ROUGE_ERREUR), ("24 −", WHITE), ("6", WHITE)], -0.6, fs=42)
        self.jouer(L2, ["Pas 18", None, "24 moins", ("6, c", 1)])
        self.play(Create(croix(L2[1], sw=6)), run_time=0.3)
        L3 = self.lc([("c'est l'écart,", ORANGE_RETENUE), ("pas le rapport !", ORANGE_RETENUE)], -1.35, fs=36)
        self.jouer(L3, ["c'est l'écart", ("pas le rapport", 1)])
        self.attendre_voix()

    # ── 07 : QUESTION 2 (le timbre de 3 cm agrandi à 15 cm) ─────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        a, b = self.paire(2.4, 3, 12, 15, u=0.18, x1=-6.2, x2=-5.0, y=-2.2, c1=fleur, c2=fleur)
        self.add(a, b)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["15 ÷", "3 =", "5."])
            fl = fleche_k(a, b, "× 5", fs=32, angle=-1.0)
            sc.au_mot("15 divisé")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), FadeIn(b.lab_h("15 cm", fs=28), scale=1.3), run_time=0.3)
            sc.au_mot("par 3")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), FadeIn(a.lab_h("3 cm", fs=24), scale=1.3), run_time=0.3)
            sc.au_mot("égale 5")
            sc.play(FadeIn(l0[2], scale=1.3), Create(fl.fleche), FadeIn(fl.etiquette, scale=1.3), run_time=0.4)
            l1 = sc.ligne_rep(1, ["Le rapport", "est 5."])
            sc.au_mot("Le rapport")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("est 5")
            sc.play(FadeIn(l1[1], scale=1.2), run_time=0.3)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["Un timbre : 3 cm de haut.", "Agrandi : 15 cm de haut.", "Quel rapport ?"],
                            [self.t("12", 36), self.t("18", 36), self.t("5", 36)], 2,
                            ["15 ÷ 3 = 5.", "Le rapport est 5."], mot_q="Un timbre", autres_r=apres)

    # ── 08 : la réduction de rapport 1/4 : 20 ÷ 4 = 5 cm ────────────────────
    def ecran_reduction(self):
        self.ecran("08-reduction")
        tit = self.t("Réduire", 46, JAUNE_TITRE).move_to(P(-2.9, 3.1))
        self.au_mot("réduire")
        self.play(Write(tit), run_time=0.5)
        a = Photo(16, 20, 0.15, P(-5.85, -2.3), contenu=paysage_affiche)
        b = Photo(4, 5, 0.15, P(-2.4, -2.3), contenu=paysage_affiche, couleur=VERT_R)
        L0 = self.lc([("Affiche :", WHITE), ("20 cm", BLEU_CALCUL), ("de haut", WHITE)], 2.3)
        self.au_mot("Une affiche")
        self.play(FadeIn(a, scale=0.9), run_time=0.5)
        h20 = gras("20 cm", 28, BLEU_P).rotate(PI / 2).next_to(a.cadre, LEFT, buff=0.1)
        self.jouer(L0, [None, "20 cm", None], {1: [FadeIn(h20, scale=1.3)]})
        L1 = self.lc([("Rapport", WHITE), ("1/4", AMBRE)], 1.5, fs=44)
        fl = fleche_k(a, b, "× 1/4", fs=32, angle=-1.0)
        self.jouer(L1, ["un rapport", "1 sur 4"], {1: [Create(fl.fleche), FadeIn(fl.etiquette, scale=1.3)]})
        cp = gras("carte postale", 26, VERT_OK).next_to(b.cadre, DOWN, buff=0.15)
        self.au_mot("carte postale")
        self.play(FadeIn(b, scale=0.6), FadeIn(cp, shift=DOWN * 0.1), run_time=0.5)
        L2 = self.lc([("Rapport 1/4 :", WHITE), ("longueurs", AMBRE), ("÷ 4", AMBRE)], 0.7)
        neuve = gras("÷ 4", 32, AMBRE_F).move_to(fl.etiquette)
        self.jouer(L2, ["Réduire avec", "les longueurs", "par 4"], {2: [ReplacementTransform(fl.etiquette, neuve)]})
        L3 = self.lc([("20 ÷", WHITE), ("4", WHITE), ("=", WHITE), ("5 cm", VERT_OK)], -0.25, fs=46)
        self.jouer(L3, ["20 divisé", ("par 4", 2), "égale", "5 cm"], {3: [FadeIn(b.lab_h("5 cm"), scale=1.3)]})
        cadre = SurroundingRectangle(L3, color=VERT_OK, buff=0.18, corner_radius=0.12, stroke_width=4)
        self.play(Create(cadre), run_time=0.35)
        self.insister(VGroup(cadre, L3), 1.08, 0.25)
        self.attendre_voix()

    # ── 09 : défi : 9 cm sur 13 cm, rapport 4 ───────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-2.6, 3.1))
        self.au_mot("À toi de jouer")
        self.play(Write(tit), run_time=0.6)
        pers = nina(0.85).move_to(P(-5.4, -0.6))
        ph = Photo(9, 13, 0.13, P(-3.6, -2.1))
        self.au_mot("Nina agrandit")
        self.play(FadeIn(pers, shift=RIGHT * 0.3), FadeIn(ph, scale=0.8), run_time=0.5)
        L0 = self.lc([("Photo :", WHITE), ("9 cm", BLEU_CALCUL), ("sur", WHITE), ("13 cm", BLEU_CALCUL)], 2.2, fs=42)
        self.jouer(L0, ["une photo", "9 cm", None, "13 cm"],
                   {1: [FadeIn(ph.lab_l("9 cm"), scale=1.3)], 3: [FadeIn(ph.lab_h("13 cm"), scale=1.3)]})
        L1 = self.lc([("Rapport :", WHITE), ("4", AMBRE)], 1.3, fs=46)
        self.jouer(L1, ["un rapport", "4."])
        L2 = self.lc([("Poster :", WHITE), ("? cm sur ? cm", ORANGE_RETENUE)], 0.4, fs=42)
        sans(L2[1])
        self.au_mot("Quelles sont")
        self.play(FadeIn(L2, shift=RIGHT * 0.2), run_time=0.45)
        self.play(Indicate(L2[1], color=ORANGE_RETENUE, scale_factor=1.2), run_time=0.6)
        self.pause_defi(y=-0.75)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-2.6, 3.1))
        self.play(Write(tit), run_time=0.5)
        a, b = self.paire(9, 13, 36, 52, u=0.075, x1=-6.2, x2=-4.15, y=-2.35)
        la, ha = sans(a.lab_l("9 cm", fs=24)), sans(a.lab_h("13 cm", fs=24))
        self.play(FadeIn(a), FadeIn(la), FadeIn(ha), run_time=0.4)
        fl = fleche_k(a, b, "× 4", fs=32)
        L1 = self.lc([("9 ×", WHITE), ("4", WHITE), ("=", WHITE), ("36 cm", VERT_OK)], 2.2, fs=44)
        bas = Line(b.cadre.get_corner(DL), b.cadre.get_corner(DR), color=VERT_R, stroke_width=8)
        self.jouer(L1, ["9 fois", ("4, égale", 1), "égale", "36 cm"],
                   {1: [Create(fl.fleche), FadeIn(fl.etiquette, scale=1.3)],
                    3: [Create(bas), FadeIn(b.lab_l("36 cm"), scale=1.3)]})
        L2 = self.lc([("13 ×", WHITE), ("4", WHITE), ("=", WHITE), ("52 cm", VERT_OK)], 1.3, fs=44)
        self.jouer(L2, ["13 fois", ("4, égale", 2), ("égale", 2), "52 cm"],
                   {3: [GrowFromEdge(b, DOWN), FadeIn(b.lab_h("52 cm"), scale=1.3)]})
        self.remove(bas)
        car = self.lc([("Poster :", WHITE), ("36 cm", VERT_OK), ("sur", WHITE), ("52 cm", VERT_OK)], 0.1, fs=42)
        cadre = SurroundingRectangle(car, color=VERT_OK, buff=0.18, corner_radius=0.12, stroke_width=4)
        self.jouer(car, ["Le poster", ("36 cm", 2), None, ("52 cm", 2)], {0: [Create(cadre)]})
        self.insister(VGroup(cadre, car), 1.06, 0.25)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        a, b = self.paire(10, 15, 30, 45, u=0.07, x1=-6.0, x2=-4.6, y=-2.6)
        fl = fleche_k(a, b, "× k", fs=32)
        fig = sans(VGroup(a, b, fl))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Agrandissement de rapport k :", "toutes les longueurs × k,", "la forme ne change pas."),
            ("Trouver le rapport : longueur de", "l'image ÷ longueur du modèle."),
            ("Une réduction a un rapport", "plus petit que 1.")], fs=34)
        self.au_mot("Un agrandissement")
        self.montrer_ligne(lignes[0], Indicate(fl.etiquette, color=AMBRE))
        self.au_mot("Pour trouver")
        self.montrer_ligne(lignes[1])
        self.au_mot("Une réduction")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_multiplier()
        self.ecran_forme()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_trouver()
        self.ecran_question2()
        self.ecran_reduction()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class PropAgrandissementRapport4e(PropAgrandissementRapportBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
