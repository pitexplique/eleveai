# prop_lycee_tout_partie.py
# EleveAI — Maths 1re (automatismes) — série « Proportionnalité », LYCÉE,
# épisode 05 : RETROUVER LE TOUT CONNAISSANT UNE PARTIE (micro du coach :
# auto_prop_tout_connaissant_partie, notion auto_partie_tout), AVEC VOIX.
# Paysage, CEINTURE JAUNE (le short jumeau : prop_lycee_tout_partie_short.py).
# ⭐ Méthodes travaillées : 1) par 1 % (34 % → 126,8 ; 1 % → 126,8 ÷ 34 ;
# 100 % → × 100) ; 2) directe : taux × tout = partie, donc tout = partie ÷ taux
# (taux en DÉCIMAL : 34 % = 0,34) ; on VÉRIFIE (0,34 × 373 ≈ 126,8, le tout est
# plus grand que la partie). « × » et « ÷ » écrits, décimaux à la virgule.
# ⭐ Le dessin qui porte tout : une BARRE DE 100 % dont seule la part
# « transports 34 % = 126,8 » est connue, le reste en pointillés « ? » ; la
# petite case de 1 % (= 3,73) agrandie ; au piège, 43,1 barré en rouge (une
# barre plus courte que la partie).
# ⭐ Fil rouge (erreurs classiques) : MULTIPLIER au lieu de diviser (43,1),
# AJOUTER le pourcentage ; question 1 (théâtre, 18 % = 45) B = 8,1 (× 0,18),
# C = 53,1 (+ 18 %) ; question 2 (2022, 33,1 % = 131,2) B = 43 (×), C = 175 (+).
#
# Décor et métier : CLIMAT, Hugo, CONSULTANT EN CLIMAT (il aide les entreprises
# à réduire leurs émissions) ; les transports en France ; le défi : les
# demi-pensionnaires d'un lycée (35 % = 434 → 1 240).
# Centres d'intérêt : meteo-climat, transports.
# Source (prompt lycée, vérifiée le 02/11/2026) :
#   · Citepa, rapport Secten 2024 : émissions de la France 373 Mt CO2e en 2023
#     (396 en 2022) ; transports 126,8 Mt = 34 % en 2023 (131,2 Mt = 33,1 % en
#     2022). Contrôles : 126,8 ÷ 0,34 ≈ 372,9 ; 131,2 ÷ 0,331 ≈ 396,4.
#
# Écrans : 00 garde · 01 Hugo, les transports, 126,8 Mt = 34 % · 02 méthode 1 :
# par 1 % · 03 méthode 2 : ÷ 0,34 · 04 vérifier · 05 QUESTION 1 (théâtre) ·
# 06 le piège (× 0,34 = 43,1 ; + 34 %) · 07 QUESTION 2 (2022) · 08 défi
# (cantine) · 08b correction · 09 ce que tu as appris · 10 fin.
#
# Voix : manim/voix/premiere-prop-tout-partie.json (validée par Frédéric le
# 02/11, débit −10), WAV dans public/sons/premiere-prop-tout-partie/ ; marques
# mot à mot : manim/scripts/premiere/prop_lycee_tout_partie_marques.json
# (scripts/marques_dump.ps1 puis le convertisseur à seuil 0,5 s).
# Outils (non modifiés) : prop_commun.py, canvas_proportion.py, la base
# PropPourcentageCoefficientBase de l'épisode 4e 35 (lc, jouer, montre, barrer,
# barrer_choix, accolade, cadre, ligne_rep bornée). Ajouté ICI : hugo(),
# voiture(), camion(), nuage(), masques(), plateau(), BarreTout (la barre de
# 100 % à reste inconnu), questions en 40 / réponses en 34.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/premiere/prop_lycee_tout_partie.py PropLyceeToutPartiePremiere
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/premiere/prop_lycee_tout_partie.py PropLyceeToutPartiePremiere -o eleveai-maths-premiere-prop-tout-partie --media_dir manim/scripts/premiere/media-prop-lycee-tout-partie
# Sortie : manim/sorties/premiere/maths/proportionnalite/05-tout-partie/eleveai-maths-premiere-prop-tout-partie.mp4

import sys
from pathlib import Path
import importlib.util

_ICI = Path(__file__).resolve().parent


def _charger(nom, chemin):
    spec = importlib.util.spec_from_file_location(nom, chemin)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_p35 = _charger("prop_pourcentage_coefficient_4e", _ICI.parents[0] / "4e" / "prop_pourcentage_coefficient.py")
from prop_ratio_ecrire import *  # noqa: E402,F403  (prop_commun, couleurs, personne, P…)

sys.path.insert(0, str(_ICI))  # le dossier du script EN TÊTE

PropPourcentageCoefficientBase = _p35.PropPourcentageCoefficientBase
gras, sans = _p35.gras, _p35.sans

BLEU_C = "#38bdf8"     # la partie connue (bleu)
TOUT_C = "#facc15"     # le tout retrouvé (jaune)
FAUX = "#ef4444"       # le résultat faux (rouge)
PISTE = "#1e293b"
TENUE_H = "#334155"    # la veste de Hugo (gris ardoise)


def hugo(s=1.0):
    """Hugo, consultant en climat : veste ardoise, cravate verte, une feuille."""
    p = personne(peau="#f1c27d", tenue=TENUE_H, cheveux="#3f2a14")
    c = p.corps.get_center()
    cravate = Polygon(c + P(-0.07, 0.42), c + P(0.07, 0.42), c + P(0.0, -0.15), fill_color="#16a34a",
                      fill_opacity=1, stroke_width=0)
    feuille = VGroup(Circle(radius=0.13, fill_color="#22c55e", fill_opacity=1, stroke_width=0),
                     Line(P(-0.1, -0.1), P(0.1, 0.1), color="#14532d", stroke_width=3)).move_to(c + P(0.28, 0.25))
    p.add(cravate, feuille)
    return p.scale(s)


def voiture(s=1.0, couleur="#ef4444"):
    caisse = RoundedRectangle(width=1.6, height=0.42, corner_radius=0.12, fill_color=couleur, fill_opacity=1,
                              stroke_width=0)
    toit = RoundedRectangle(width=0.9, height=0.4, corner_radius=0.12, fill_color=couleur, fill_opacity=1,
                            stroke_width=0).move_to(P(-0.05, 0.3))
    vitre = RoundedRectangle(width=0.7, height=0.22, corner_radius=0.06, fill_color="#bae6fd", fill_opacity=1,
                             stroke_width=0).move_to(P(-0.05, 0.32))
    roues = VGroup(*[Circle(radius=0.17, fill_color="#111827", fill_opacity=1, stroke_color="#9ca3af",
                            stroke_width=3).move_to(P(x, -0.22)) for x in (-0.5, 0.5)])
    return VGroup(toit, vitre, caisse, roues).scale(s)


def camion(s=1.0):
    caisse = Rectangle(width=1.7, height=0.9, fill_color="#e5e7eb", fill_opacity=1, stroke_width=0).move_to(P(-0.35, 0.25))
    cabine = RoundedRectangle(width=0.6, height=0.65, corner_radius=0.08, fill_color="#2563eb", fill_opacity=1,
                              stroke_width=0).move_to(P(0.8, 0.12))
    vitre = Rectangle(width=0.3, height=0.22, fill_color="#bae6fd", fill_opacity=1, stroke_width=0).move_to(P(0.88, 0.25))
    roues = VGroup(*[Circle(radius=0.17, fill_color="#111827", fill_opacity=1, stroke_color="#9ca3af",
                            stroke_width=3).move_to(P(x, -0.25)) for x in (-0.8, -0.3, 0.8)])
    return VGroup(caisse, cabine, vitre, roues).scale(s)


def nuage(s=1.0, couleur="#6b7280"):
    """Le nuage gris des gaz à effet de serre (le texte « CO2e » est un décor)."""
    bulles = VGroup(*[Circle(radius=r, fill_color=couleur, fill_opacity=0.9, stroke_width=0).move_to(P(x, y))
                      for r, x, y in ((0.45, 0, 0.1), (0.35, -0.5, -0.05), (0.35, 0.5, -0.05), (0.3, 0.2, 0.35))])
    t = sans(Text("CO2e", font_size=26, color=WHITE, weight=BOLD)).move_to(P(0, 0))
    return VGroup(bulles, t).scale(s)


def masques(s=1.0):
    """Les deux masques du théâtre : la comédie (jaune) et la tragédie (bleu)."""
    def masque(c, sourire):
        f = Ellipse(width=0.9, height=1.1, fill_color=c, fill_opacity=1, stroke_width=0)
        yeux = VGroup(*[Ellipse(width=0.2, height=0.12, fill_color=NUIT, fill_opacity=1, stroke_width=0)
                        .move_to(P(dx, 0.15)) for dx in (-0.2, 0.2)])
        bouche = ArcBetweenPoints(P(-0.22, -0.25), P(0.22, -0.25), angle=(PI / 2 if sourire else -PI / 2),
                                  color=NUIT, stroke_width=6)
        return VGroup(f, yeux, bouche)
    a = masque("#facc15", True).rotate(0.25)
    b = masque("#60a5fa", False).rotate(-0.25).shift(RIGHT * 0.75 + DOWN * 0.25)
    return VGroup(b, a).scale(s)


def plateau(s=1.0):
    """Un plateau de cantine : assiette, verre, pain."""
    pl = RoundedRectangle(width=1.8, height=1.1, corner_radius=0.12, fill_color="#d97706", fill_opacity=1,
                          stroke_width=0)
    assiette = Circle(radius=0.36, fill_color=WHITE, fill_opacity=1, stroke_color="#cbd5e1", stroke_width=3).move_to(P(-0.3, 0))
    plat = Circle(radius=0.2, fill_color="#16a34a", fill_opacity=1, stroke_width=0).move_to(P(-0.3, 0))
    verre = RoundedRectangle(width=0.22, height=0.35, corner_radius=0.05, fill_color="#bae6fd", fill_opacity=1,
                             stroke_width=0).move_to(P(0.5, 0.2))
    pain = Ellipse(width=0.4, height=0.2, fill_color="#fde68a", fill_opacity=1, stroke_width=0).move_to(P(0.5, -0.25))
    return VGroup(pl, assiette, plat, verre, pain).scale(s)


class BarreTout(VGroup):
    """LA BARRE DE 100 % À RESTE INCONNU (ajoutée ici) : la part connue `k` à
    gauche (pleine, bleue), le reste en POINTILLÉS avec un « ? ». Rien n'est
    ajouté à la scène.
      .part · .reste (pointillés) · .q (le « ? ») · .plein (le reste rempli, à
      faire apparaître quand le tout est trouvé) · .cadre (le contour du tout)
      .dans(s) → le texte DANS la part · .case1() → la petite case de 1 %."""

    def __init__(self, k, largeur=6.0, h=0.75, centre=ORIGIN, couleur=BLEU_C, **kw):
        super().__init__(**kw)
        self.L, self.h, self.k = largeur, h, k
        x0 = centre[0] - largeur / 2
        self.x0 = x0
        self.part = Rectangle(width=largeur * k, height=h, fill_color=couleur, fill_opacity=1, stroke_color=WHITE,
                              stroke_width=2).move_to(P(x0 + largeur * k / 2, centre[1]))
        r = Rectangle(width=largeur * (1 - k), height=h, stroke_color=GREY_B, stroke_width=3)
        r.move_to(P(x0 + largeur * (1 + k) / 2, centre[1]))
        self.reste = DashedVMobject(r, num_dashes=int(14 * largeur * (1 - k) + 8))
        self.q = gras("?", 44, GREY_B).move_to(r)
        self.plein = Rectangle(width=largeur * (1 - k), height=h, fill_color=TOUT_C, fill_opacity=0.85,
                               stroke_color=WHITE, stroke_width=2).move_to(r)
        self.cadre = Rectangle(width=largeur, height=h, stroke_color=TOUT_C, stroke_width=5).move_to(
            P(centre[0], centre[1]))
        self.add(self.reste, self.part)

    def dans(self, s, fs=30, couleur=NUIT):
        t = gras(s, fs, couleur)
        if t.width > self.part.width - 0.12:
            t.scale_to_fit_width(self.part.width - 0.12)
        return t.move_to(self.part)

    def case1(self, couleur=AMBRE):
        """La case de 1 % (agrandie à l'écran : un centième de la largeur serait invisible)."""
        w = max(self.L / 100, 0.07)
        return Rectangle(width=w, height=self.h + 0.16, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(
            P(self.x0 + w / 2, self.part.get_y()))


class PropLyceeToutPartieBase(PropPourcentageCoefficientBase):
    nom_voix = "premiere-prop-tout-partie"
    fichier_marques = "prop_lycee_tout_partie_marques.json"

    # ── les outils de l'épisode ─────────────────────────────────────────────
    def source(self, lignes):
        """La source, discrète, en bas à gauche (lue, jamais dite)."""
        s = VGroup(*[Text(x, font_size=17, color=GREY_B) for x in lignes]).arrange(DOWN, aligned_edge=LEFT, buff=0.06)
        for x in s:
            x._bloc = True
        s._bloc = True
        return sans(s).to_corner(DL, buff=0.45)

    def _disposer_q(self, question, choix, phrase):
        """Questions plus GRANDES (40) et réponses en 34 (leçon des premiers
        épisodes lycée) ; la colonne commence plus à gauche (XL du script)."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        q2 = self.col(self.bloc(question, 40), 2.2)
        q2.align_to(P(0, tete.get_bottom()[1] - 0.2), UP)
        cartes.align_to(P(0, q2.get_bottom()[1] - 0.25), UP)
        pause.align_to(P(0, cartes.get_bottom()[1] - 0.3), UP)
        # ⭐ 03/11 (défauts) : la phrase de réponse en 34 à GAUCHE, sous la barre
        # (à droite, sous les cartes et contre Ti-Margo, elle tombait à ~24).
        ph2 = VGroup(*[self.t(x, 34, VERT_OK) for x in phrase]).arrange(DOWN, aligned_edge=LEFT, buff=0.16)
        if ph2.width > 6.0:
            ph2.scale_to_fit_width(6.0)
        ph2.align_to(P(-6.45, 0), LEFT).align_to(P(0, self.Y_PH), UP)
        self.ph_q = ph2
        return tete, q2, cartes, pause, rebours, ph2

    Y_PH = -1.45  # le haut de la phrase de réponse (à gauche, sous la barre)

    def ligne_rep(self, i, morceaux, fs=34):
        ref = self.ph_q[i]
        lg = self.ligne([(m, VERT_OK) for m in morceaux], fs, buff=0.14)
        if lg.width > 6.0:
            lg.scale_to_fit_width(6.0)
        return lg.move_to(ref).align_to(ref, LEFT)

    def colonne_large(self, xl=-0.3):
        """Pour un écran question : la colonne de droite démarre à xl."""
        self.XL = xl

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Retrouver le tout connaissant une partie", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Retrouver")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        b = BarreTout(0.34, largeur=7.0, h=0.8, centre=P(-0.9, 0.3))
        self.play(FadeIn(b.reste), run_time=0.5)
        self.montre("une partie", FadeIn(b.part, shift=RIGHT * 0.2), rt=0.4)
        t34 = b.dans("34 %", 32)
        self.montre("34 %", FadeIn(t34, scale=1.3), rt=0.35)
        a1, v1 = self.accolade(b.part, "126,8", BLEU_C, DOWN, fs=36)
        self.montre("126,8", GrowFromCenter(a1), FadeIn(v1, scale=1.3), rt=0.4)
        self.montre("combien", FadeIn(b.q, scale=1.5), rt=0.35)
        a2, v2 = self.accolade(VGroup(b.part, b.reste), "100 % = ?", TOUT_C, UP, fs=36)
        self.montre("100 %", GrowFromCenter(a2), FadeIn(v2, scale=1.3), Create(b.cadre), rt=0.5)
        self.insister(v2, 1.15, 0.2)
        self.attendre_voix(marge=0.6)

    # ── 01 : Hugo, consultant en climat ; les transports : 126,8 Mt = 34 % ──
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = hugo(1.0).move_to(P(-5.3, 0.4))
        nom = self.t("Hugo", 40, BLEU_C).next_to(pers, UP, buff=0.3)
        self.montre("Voici Hugo", FadeIn(pers, shift=UP * 0.3), FadeIn(nom), rt=0.6)
        met = VGroup(self.t("consultant", 28, BLEU_C), self.t("en climat", 28, BLEU_C)).arrange(DOWN, buff=0.08)
        met.next_to(pers, DOWN, buff=0.15)
        self.montre("consultant", FadeIn(met[0], shift=DOWN * 0.1), rt=0.35)
        self.montre("en climat", FadeIn(met[1], shift=DOWN * 0.1), rt=0.35)
        route = Line(P(-3.6, -1.75), P(0.4, -1.75), color=GREY_B, stroke_width=6)
        tirets = DashedLine(P(-3.5, -1.95), P(0.3, -1.95), color=WHITE, stroke_width=3, dash_length=0.18)
        vo = voiture(0.75).move_to(P(-2.6, -1.4))
        ca = camion(0.75).move_to(P(-0.6, -1.25))
        nu = nuage(1.0).move_to(P(-1.5, 0.6))
        xl = 1.1
        L1 = self.lc([("En 2023,", WHITE), ("les transports :", WHITE)], 2.75, fs=38, xl=xl)
        self.jouer(L1, ["En 2023", "les transports"],
                   {1: [Create(route), Create(tirets), FadeIn(vo, shift=RIGHT * 0.6), FadeIn(ca, shift=LEFT * 0.6)]})
        L2 = self.lc([("126,8 Mt", AMBRE)], 1.95, fs=48, xl=xl)
        L2b = self.lc([("Mt = millions de tonnes", GREY_B)], 1.35, fs=28, xl=xl)
        self.jouer(L2, ["126,8"], {0: [vo.animate.shift(RIGHT * 0.4), ca.animate.shift(RIGHT * 0.3), FadeIn(L2b)]})
        L3 = self.lc([("de gaz à effet de serre", WHITE)], 0.8, fs=34, xl=xl)
        self.jouer(L3, ["gaz"], {0: [FadeIn(nu, shift=UP * 0.4, scale=0.6)]})
        L4 = self.lc([("= 34 %", BLEU_C), ("de toutes", WHITE)], -0.05, fs=42, xl=xl)
        self.jouer(L4, ["34 %", "de toutes"])
        L4b = self.lc([("les émissions du pays", WHITE)], -0.75, fs=42, xl=xl)
        self.jouer(L4b, ["les émissions"])
        self.insister(L4[0], 1.25, 0.2)
        L5 = self.lc([("Le total ?", ORANGE_RETENUE)], -1.6, fs=46, xl=xl)
        self.jouer(L5, ["Quel est le total"])
        self.insister(L5, 1.12, 0.2)
        src = self.source(["Source : Citepa, rapport Secten 2024 (émissions de la France, 2023)."])
        self.play(FadeIn(src), run_time=0.4)
        self.attendre_voix()

    # ── 02 : méthode 1 : par 1 % (34 % → 126,8 ; 1 % ≈ 3,73 ; 100 % ≈ 373) ──
    def ecran_unite(self):
        self.ecran("02-unite")
        self.titre_haut("Première méthode : par 1 %", "Première", couleur=BLEU_C, fs=42)
        b = BarreTout(0.34, largeur=6.4, h=0.8, centre=P(-3.15, 1.45))
        self.play(FadeIn(b.reste), FadeIn(b.q), run_time=0.4)
        xl = 1.0
        L1 = self.lc([("34 % →", BLEU_C), ("126,8", AMBRE)], 1.75, fs=44, xl=xl)
        t34 = b.dans("34 %", 28)
        a1, v1 = self.accolade(b.part, "126,8", BLEU_C, DOWN, fs=30)
        v1.shift(RIGHT * 0.3)
        self.jouer(L1, ["34 % font", "font 126,8"],
                   {0: [FadeIn(b.part, shift=RIGHT * 0.2), FadeIn(t34)], 1: [GrowFromCenter(a1), FadeIn(v1)]})
        # la petite case de 1 %, agrandie en dessous
        c1 = b.case1()
        zoom = Square(side_length=1.1, fill_color=AMBRE, fill_opacity=1, stroke_width=0).move_to(P(-5.85, -1.2))
        liens = VGroup(DashedLine(c1.get_corner(DL), zoom.get_corner(UL), color=AMBRE, stroke_width=3),
                       DashedLine(c1.get_corner(DR), zoom.get_corner(UR), color=AMBRE, stroke_width=3))
        e1 = gras("1 %", 30, AMBRE).next_to(zoom, RIGHT, buff=0.2).shift(UP * 0.25)
        fl = Arrow(P(xl + 0.6, 1.4), P(xl + 0.6, 0.65), buff=0, color=AMBRE, stroke_width=5,
                   max_tip_length_to_length_ratio=0.25)
        tf = gras("÷ 34", 30, AMBRE).next_to(fl, LEFT, buff=0.12)
        L2 = self.lc([("1 % →", AMBRE), ("126,8 ÷", WHITE), ("34", WHITE)], 0.3, fs=44, xl=xl)
        self.montre("1 %, c'est", FadeIn(L2[0], shift=RIGHT * 0.15), FadeIn(c1), Create(liens), FadeIn(zoom),
                    FadeIn(e1), rt=0.5)
        self.montre("34 fois moins", GrowArrow(fl), FadeIn(tf, scale=1.3), rt=0.4)
        self.jouer(VGroup(L2[1], L2[2]), ["126,8 divisé", "par 34"])
        v373 = gras("3,73", 30, NUIT).move_to(zoom)
        e2 = gras("≈ 3,73", 30, AMBRE).next_to(zoom, RIGHT, buff=0.2).shift(DOWN * 0.25)
        L3 = self.lc([("≈ 3,73", AMBRE)], -0.5, fs=44, xl=xl + 1.55)
        self.jouer(L3, ["3,73"], {0: [FadeIn(v373, scale=1.4), FadeIn(e2)]})
        self.play(Create(self.cadre(L3[0], AMBRE)), run_time=0.3)
        fl2 = Arrow(P(xl + 0.6, -0.85), P(xl + 0.6, -1.55), buff=0, color=TOUT_C, stroke_width=5,
                    max_tip_length_to_length_ratio=0.25)
        tf2 = gras("× 100", 30, TOUT_C).next_to(fl2, LEFT, buff=0.12)
        L4 = self.lc([("100 % ≈", TOUT_C), ("373 Mt", VERT_OK)], -1.95, fs=46, xl=xl)
        a2, v2 = self.accolade(VGroup(b.part, b.reste), "≈ 373 Mt", TOUT_C, UP, fs=30)
        self.montre("100 %, c'est", FadeIn(L4[0], shift=RIGHT * 0.15), rt=0.35)
        self.montre("100 fois plus", GrowArrow(fl2), FadeIn(tf2, scale=1.3), FadeIn(b.plein), FadeOut(b.q), rt=0.6)
        self.jouer(VGroup(L4[1]), ["environ 373"], {0: [GrowFromCenter(a2), FadeIn(v2, scale=1.2)]})
        self.play(Create(self.cadre(L4[1])), run_time=0.3)
        self.insister(L4[1], 1.12, 0.2)
        self.attendre_voix()

    # ── 03 : méthode 2, directe : 0,34 × total = 126,8 → total = 126,8 ÷ 0,34
    def ecran_division(self):
        self.ecran("03-division")
        self.titre_haut("Deuxième méthode : directe", "Deuxième", couleur=BLEU_C, fs=42)
        b = BarreTout(0.34, largeur=7.4, h=0.8, centre=P(-0.6, 1.5))
        t34 = b.dans("34 %", 28)
        self.play(FadeIn(b.reste), FadeIn(b.q), run_time=0.4)
        xl = -1.4
        L1 = self.lc([("34 %", BLEU_C), ("du total", BLEU_C), ("= 126,8", AMBRE)], 0.1, fs=46, xl=xl)
        a1, v1 = self.accolade(b.part, "126,8", BLEU_C, DOWN, fs=30)
        self.jouer(L1, ["34 % du", "du total", "égale 126,8"],
                   {0: [FadeIn(b.part, shift=RIGHT * 0.2), FadeIn(t34)], 2: [GrowFromCenter(a1), FadeIn(v1)]})
        L2 = self.lc([("0,34 ×", AMBRE), ("total", BLEU_C), ("= 126,8", AMBRE)], -0.75, fs=46, xl=xl)
        self.jouer(L2, ["0,34 fois", "le total", ("126,8", 2)])
        self.insister(L2[0], 1.2, 0.2)
        L3 = self.lc([("total =", WHITE), ("126,8", AMBRE), ("÷ 0,34", AMBRE)], -1.6, fs=46, xl=xl)
        self.jouer(L3, ["Le total égale", ("126,8", 3), "par 0,34"])
        self.play(Circumscribe(L3[2], color=AMBRE, buff=0.08), run_time=0.5)
        L4 = self.lc([("total ≈", WHITE), ("373 Mt", VERT_OK)], -2.45, fs=48, xl=xl)
        a2, v2 = self.accolade(VGroup(b.part, b.reste), "≈ 373 Mt", TOUT_C, UP, fs=32)
        self.jouer(L4, ["environ 373", None],
                   {1: [FadeIn(b.plein), FadeOut(b.q), GrowFromCenter(a2), FadeIn(v2, scale=1.3)]})
        self.play(Create(self.cadre(L4[1])), Create(b.cadre), run_time=0.4)
        self.insister(L4[1], 1.12, 0.2)
        self.attendre_voix()

    # ── 04 : on vérifie : 0,34 × 373 ≈ 126,8 ; le tout > la partie ──────────
    def ecran_verifier(self):
        self.ecran("04-verifier")
        self.titre_haut("On vérifie", "On vérifie", couleur=VERT_OK, fs=46)
        L = 7.0
        x0 = -0.6 - L / 2
        tout = Rectangle(width=L, height=0.75, fill_color=TOUT_C, fill_opacity=0.85, stroke_color=WHITE,
                         stroke_width=2).move_to(P(x0 + L / 2, 1.75))
        part = Rectangle(width=L * 0.34, height=0.75, fill_color=BLEU_C, fill_opacity=1, stroke_color=WHITE,
                         stroke_width=2).move_to(P(x0 + L * 0.17, 0.75))
        n_tout = sans(self.t("le tout", 30, TOUT_C)).next_to(tout, RIGHT, buff=0.15)
        n_part = sans(self.t("la partie", 30, BLEU_C)).next_to(part, RIGHT, buff=0.15)
        v_tout = gras("373 Mt", 30, NUIT).move_to(tout)
        v_part = gras("126,8 Mt", 26, NUIT).move_to(part)
        L1 = self.lc([("0,34 ×", AMBRE), ("373", TOUT_C), ("≈ 126,8", BLEU_C)], -0.55, fs=48, xl=-3.4)
        self.jouer(L1, ["0,34 fois", "fois 373", "environ 126,8"],
                   {1: [FadeIn(tout, shift=RIGHT * 0.3), FadeIn(v_tout)], 2: [FadeIn(part, shift=RIGHT * 0.3),
                                                                               FadeIn(v_part)]})
        ok = self.coche(VERT_OK, 0.32).next_to(L1, RIGHT, buff=0.3)
        self.play(Create(ok), run_time=0.35)
        self.montre("Et le tout", FadeIn(n_tout), Indicate(tout, color=TOUT_C, scale_factor=1.04), rt=0.5)
        f = self.tampon("Le tout > la partie", VERT_OK, 46).move_to(P(-0.6, -1.85))
        self.montre("plus grand", FadeIn(f, scale=1.2), rt=0.5)
        self.montre("la partie", FadeIn(n_part), Indicate(part, color=BLEU_C, scale_factor=1.06), rt=0.5)
        self.montre("rassurant", Circumscribe(f, color=VERT_OK, buff=0.08), rt=0.6)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (théâtre : 18 % = 45 élèves → 250) ──────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.colonne_large()
        ma = masques(1.0).move_to(P(-4.1, 2.15))
        b = BarreTout(0.18, largeur=4.8, h=0.7, centre=P(-3.9, 0.0))

        def avant(sc):
            sc.play(FadeIn(ma, scale=0.7), FadeIn(b.reste), FadeIn(b.part), FadeIn(b.q), run_time=0.4)

        def pendant(sc):
            t18 = sans(b.dans("18 %", 22))
            a1, v1 = sc.accolade(b.part, "45 élèves", BLEU_C, DOWN, fs=26)
            v1.align_to(b.part, LEFT)
            sans(v1)
            sc.play(FadeIn(t18), GrowFromCenter(a1), FadeIn(v1), run_time=0.4)

        def apres(sc):
            a2, v2 = sc.accolade(VGroup(b.part, b.reste), "250 élèves", TOUT_C, UP, fs=30)
            l0 = sc.ligne_rep(0, ["45 ÷", "0,18 =", "250 élèves."])
            l1 = sc.ligne_rep(1, ["B : 45 ×", "0,18 ;"])
            l1 = VGroup(*l1, *sc.ligne_rep(2, ["C : + 18 %", "à 45."]))
            sc.montre("45 divisé", FadeIn(l0[0], shift=UP * 0.15), rt=0.3)
            sc.montre("par 0,18", FadeIn(l0[1], shift=UP * 0.15), rt=0.3)
            sc.montre("égale 250", FadeIn(l0[2], scale=1.3), FadeIn(b.plein), FadeOut(b.q), GrowFromCenter(a2),
                      FadeIn(v2, scale=1.3), rt=0.45)
            sc.montre("B multiplie", Create(sc.barrer_choix(1)), rt=0.35)
            sc.montre("45 par", FadeIn(l1[0], shift=UP * 0.15), rt=0.3)
            sc.montre(("0,18", 2), FadeIn(l1[1], shift=UP * 0.15), rt=0.3)
            sc.montre("C ajoute", FadeIn(l1[2], shift=UP * 0.15), Create(sc.barrer_choix(2)), rt=0.35)
            sc.montre("à 45", FadeIn(l1[3], shift=UP * 0.15), rt=0.3)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["18 % des élèves d'un lycée", "font du théâtre : 45 élèves.", "Combien d'élèves en tout ?"],
                            [self.t("250", 34), self.t("8,1", 34), self.t("53,1", 34)], 0,
                            ["45 ÷ 0,18 = 250 élèves.", "B : 45 × 0,18 ;", "C : + 18 % à 45."],
                            mot_q="18 %", avant_q=avant, autres_q=pendant, autres_r=apres)
        self.XL = 0.95

    # ── 06 : le piège : × 0,34 → 43,1 (plus petit que la partie) ; + 34 % ───
    def ecran_piege(self):
        self.ecran("06-piege")
        self.titre_haut("Attention au piège !", "Attention", couleur=ROUGE_ERREUR, fs=44)
        x0, u = -6.2, 3.2 / 126.8
        part = Rectangle(width=126.8 * u, height=0.7, fill_color=BLEU_C, fill_opacity=1, stroke_color=WHITE,
                         stroke_width=2).move_to(P(x0 + 126.8 * u / 2, 1.6))
        faux = Rectangle(width=43.1 * u, height=0.7, fill_color=FAUX, fill_opacity=1, stroke_color=WHITE,
                         stroke_width=2).move_to(P(x0 + 43.1 * u / 2, 0.45))
        n_part = sans(self.t("la partie", 28, BLEU_C)).next_to(part, DOWN, buff=0.1).align_to(part, RIGHT)
        v_part = gras("126,8", 28, NUIT).move_to(part)
        v_faux = gras("43,1", 28, FAUX).next_to(faux, RIGHT, buff=0.15)
        xl = -1.9
        L1 = self.lc([("126,8 ×", FAUX), ("0,34", FAUX), ("= 43,1", FAUX)], 1.6, fs=46, xl=xl)
        self.jouer(L1, ["126,8 par", "0,34 donne", "donne 43,1"],
                   {0: [FadeIn(part, shift=RIGHT * 0.3), FadeIn(v_part)],
                    2: [GrowFromEdge(faux, LEFT), FadeIn(v_faux, scale=1.3)]})
        repere = DashedLine(P(faux.get_right()[0], 2.05), P(faux.get_right()[0], 0.0), color=WHITE, stroke_width=3)
        L2 = self.lc([("plus petit que la partie :", WHITE)], 0.7, fs=38, xl=xl)
        self.jouer(L2, ["plus petit"], {0: [Create(repere), FadeIn(n_part)]})
        L3 = self.lc([("impossible pour un total !", FAUX)], 0.05, fs=38, xl=xl)
        croix = VGroup(Line(faux.get_corner(UL) + P(-0.1, 0.1), faux.get_corner(DR) + P(0.1, -0.1)),
                       Line(faux.get_corner(DL) + P(-0.1, -0.1), faux.get_corner(UR) + P(0.1, 0.1)))
        croix.set_stroke(WHITE, 6)
        self.jouer(L3, ["impossible"], {0: [Create(self.barrer(L1[2])), Create(croix)]})
        L4 = self.lc([("+ 34 %", FAUX), ("à 126,8 :", FAUX), ("non plus !", FAUX)], -0.95, fs=44, xl=xl)
        self.jouer(L4, ["ajouter 34", ("126,8", 2), "rien non plus"])
        self.play(Create(self.barrer(VGroup(L4[0], L4[1]))), run_time=0.35)
        f = self.tampon("Remonter au tout : ÷ le taux", VERT_OK, 42).move_to(P(-0.6, -2.25))
        self.montre("Pour remonter", FadeIn(f, scale=1.2), rt=0.5)
        self.montre("divise par", Indicate(f.texte, color=VERT_OK), rt=0.5)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (2022 : 131,2 Mt = 33,1 % → ≈ 396 Mt) ───────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.colonne_large()
        vo = voiture(0.8).move_to(P(-5.0, 2.15))
        ca = camion(0.8).move_to(P(-2.9, 2.25))
        b = BarreTout(0.331, largeur=4.8, h=0.7, centre=P(-3.9, 0.0))

        def avant(sc):
            sc.play(FadeIn(vo, shift=RIGHT * 0.3), FadeIn(ca, shift=LEFT * 0.3), FadeIn(b.reste), FadeIn(b.part),
                    FadeIn(b.q), run_time=0.4)

        def pendant(sc):
            t = sans(b.dans("33,1 %", 22))
            a1, v1 = sc.accolade(b.part, "131,2 Mt", BLEU_C, DOWN, fs=26)
            sans(v1)
            sc.play(FadeIn(t), GrowFromCenter(a1), FadeIn(v1), run_time=0.4)

        def apres(sc):
            a2, v2 = sc.accolade(VGroup(b.part, b.reste), "≈ 396 Mt", TOUT_C, UP, fs=30)
            l0 = sc.ligne_rep(0, ["131,2 ÷", "0,331 ≈", "396 Mt."])
            l1 = VGroup(*sc.ligne_rep(1, ["B multiplie ;"]), *sc.ligne_rep(2, ["C ajoute", "33,1 %."]))
            sc.montre("131,2 divisé", FadeIn(l0[0], shift=UP * 0.15), rt=0.3)
            sc.montre("par 0,331", FadeIn(l0[1], shift=UP * 0.15), rt=0.3)
            sc.montre("environ 396", FadeIn(l0[2], scale=1.3), FadeIn(b.plein), FadeOut(b.q), GrowFromCenter(a2),
                      FadeIn(v2, scale=1.3), rt=0.45)
            sc.montre("B multiplie", FadeIn(l1[0], shift=UP * 0.15), Create(sc.barrer_choix(1)), rt=0.35)
            sc.montre("C ajoute", FadeIn(l1[1], shift=UP * 0.15), Create(sc.barrer_choix(2)), rt=0.35)
            sc.montre("33,1 %", FadeIn(l1[2], shift=UP * 0.15), rt=0.3)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["En 2022 : 131,2 Mt,", "soit 33,1 % du total.", "Quel était le total ?"],
                            [self.t("396 Mt", 34), self.t("43 Mt", 34), self.t("175 Mt", 34)], 0,
                            ["131,2 ÷ 0,331 ≈ 396 Mt.", "B multiplie ;", "C ajoute 33,1 %."],
                            mot_q="En 2022", avant_q=avant, autres_q=pendant, autres_r=apres)
        self.XL = 0.95

    # ── 08 : défi : 35 % des élèves sont demi-pensionnaires = 434 élèves ────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.titre_haut("À toi de jouer !", "À toi de jouer", fs=50)
        pl = plateau(1.0).move_to(P(-4.4, 1.35))
        b = BarreTout(0.35, largeur=4.2, h=0.75, centre=P(-4.3, -0.6))
        xl = -1.3
        L0 = self.lc([("Dans un lycée :", WHITE)], 2.2, fs=42, xl=xl)
        self.jouer(L0, ["Dans un lycée"], {0: [FadeIn(pl, shift=UP * 0.3), FadeIn(b.reste), FadeIn(b.q)]})
        t35 = b.dans("35 %", 26)
        L1 = self.lc([("35 %", BLEU_C), ("des élèves sont", WHITE)], 1.4, fs=42, xl=xl)
        self.jouer(L1, ["35 %", "des élèves"], {0: [FadeIn(b.part, shift=RIGHT * 0.2), FadeIn(t35)]})
        L2 = self.lc([("demi-pensionnaires", WHITE)], 0.7, fs=42, xl=xl)
        self.jouer(L2, ["demi"])
        a1, v1 = self.accolade(b.part, "434 élèves", BLEU_C, DOWN, fs=28)
        v1.align_to(b.part, LEFT)
        L3 = self.lc([("soit", WHITE), ("434 élèves.", AMBRE)], 0.0, fs=42, xl=xl)
        self.jouer(L3, ["soit 434", None], {1: [GrowFromCenter(a1), FadeIn(v1, scale=1.3)]})
        L4 = self.lc([("Combien d'élèves", ORANGE_RETENUE), ("au lycée ?", ORANGE_RETENUE)], -0.8, fs=42, xl=xl)
        self.jouer(L4, ["Combien", "le lycée ?"], {0: [Indicate(b.q, color=ORANGE_RETENUE, scale_factor=1.5)]})
        L5 = self.lc([("Vérifie ta réponse.", VERT_OK)], -1.55, fs=40, xl=xl)
        self.jouer(L5, ["Vérifie"])
        self.pause_defi(y=-2.35)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        b = BarreTout(0.35, largeur=6.4, h=0.75, centre=P(-1.0, 1.55))
        t35 = sans(b.dans("35 %", 26))
        a1, v1 = self.accolade(b.part, "434", BLEU_C, DOWN, fs=30)
        sans(v1)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        L1 = self.lc([("434 ÷", AMBRE), ("0,35", BLEU_C), ("= 1 240 élèves", VERT_OK)], -0.1, fs=48, xl=-1.6)
        self.au_mot("434 divisé")  # le titre, la barre et « 434 ÷ » ensemble, au premier mot
        self.play(Write(tit), FadeIn(b.reste), FadeIn(b.part), FadeIn(t35), GrowFromCenter(a1), FadeIn(v1),
                  FadeIn(L1[0], shift=RIGHT * 0.15), run_time=0.5)
        a2, v2 = self.accolade(VGroup(b.part, b.reste), "1 240 élèves", TOUT_C, UP, fs=30)
        self.jouer(VGroup(L1[1], L1[2]), ["par 0,35", "égale 1 240"],
                   {1: [FadeIn(b.plein), GrowFromCenter(a2), FadeIn(v2, scale=1.3)]})
        self.play(Create(self.cadre(L1[2])), run_time=0.3)
        L2 = self.lc([("Vérification :", WHITE)], -1.0, fs=42, xl=-1.6)
        self.jouer(L2, ["Vérification"])
        L3 = self.lc([("0,35 ×", BLEU_C), ("1 240", VERT_OK), ("= 434", AMBRE)], -1.85, fs=48, xl=-1.6)
        self.jouer(L3, ["0,35 fois", "fois 1 240", "égale 434"])
        ok = self.coche(VERT_OK, 0.32).next_to(L3, RIGHT, buff=0.3)
        self.play(Create(ok), Indicate(v1, color=VERT_OK), run_time=0.4)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        b = BarreTout(0.34, largeur=4.4, h=0.6, centre=P(-4.0, 0.3))
        b.add(b.plein)
        at, tt = self.accolade(VGroup(b.part, b.plein), "le tout", TOUT_C, fs=28)
        ap, tp = self.accolade(b.part, "la partie", BLEU_C, DOWN, fs=26)
        tp.align_to(b.part, LEFT)
        fig = sans(VGroup(b, at, tt, ap, tp))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Le tout = la partie ÷ le taux,", "le taux écrit en décimal."),
            ("Ou bien : passer par 1 %.",),
            ("Vérifier : taux × tout", "redonne la partie.")], fs=36)
        self.au_mot("Pour retrouver")
        self.montrer_ligne(lignes[0], Indicate(VGroup(b.part, b.plein), color=VERT_OK, scale_factor=1.04))
        self.au_mot("On peut aussi")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et on vérifie")
        self.montrer_ligne(lignes[2], Circumscribe(b.part, color=VERT_OK, buff=0.06))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_unite()
        self.ecran_division()
        self.ecran_verifier()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PropLyceeToutPartiePremiere(PropLyceeToutPartieBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "jaune"
