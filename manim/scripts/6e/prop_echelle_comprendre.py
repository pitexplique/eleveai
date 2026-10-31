# prop_echelle_comprendre.py
# EleveAI — Maths 6e ET 4e (épisode COMMUN) — série « Proportionnalité »,
# épisode 07 : COMPRENDRE UNE ÉCHELLE (micro du coach : echelle_comprendre,
# notion prop_echelle), AVEC VOIX. Paysage 16:9, CEINTURE VERTE (la paysage
# complète du niveau : situation, méthode, piège, 2 questions-pauses, défi
# corrigé). Short jumeau : prop_echelle_comprendre_short.py (blanche).
# ⭐ Une voix, un script, DEUX rendus : PropEchelleComprendre6e et
# PropEchelleComprendre4e ne changent que l'identité (la voix ne cite aucune classe).
# ⭐ Méthode travaillée : l'échelle comme COEFFICIENT (1 cm → 10 m : × 10 ;
# 80 m → 8 cm : ÷ 10), l'échelle-fraction 1/200 (même unité des deux côtés).
# Code couleur du canvas `echelle` du coach : le PLAN (court) en BLEU, la
# RÉALITÉ (longue) en VERT, la flèche ambre porte l'opération.
# ⛔ Pas de produit en croix (épisode commun avec la 6e).
# ⭐ Leurres (consigne-videos-proportionnalite.md) : 1. AJOUTER au lieu de
# multiplier (question 1 : 15 m = 10 + 5 ; écran 09 : « 3 cm → 13 m » barré) ;
# 5. échelle À L'ENVERS (question 2, choix C : 200 cm sur la maquette pour
# 1 cm en vrai ; question 1, choix C : 5 m, l'unité oubliée).
#
# Décor et métier : ARCHITECTURE, Sofiane, ARCHITECTE : le plan d'un collège
# (80 m → 8 cm à 1 cm pour 10 m), la maquette au 1/200 (salle de 4 cm →
# 800 cm = 8 m), le terrain de sport (6 cm → 60 m). Dimensions inventées, à
# l'ordre de grandeur réel d'un collège : aucun chiffre du monde réel cité.
# Centres d'intérêt : construction, art-design.
#
# Micro → écrans : ce qu'est une échelle (01-02) ; plan et réalité
# proportionnels, × 10 (03) ; réalité → plan, ÷ 10 (04) ; QUESTION 1 (05) ;
# l'échelle-fraction 1/200 (06) et son emploi (07) ; QUESTION 2 (08) ; le
# piège « + » (09) ; défi (10) et correction (10b) ; ce que tu as appris (11).
#
# Voix : manim/voix/commun-prop-echelle-comprendre.json (validée par Frédéric,
# débit −10), WAV dans public/sons/commun-prop-echelle-comprendre/ ; marques
# mot à mot : manim/scripts/6e/prop_echelle_comprendre_marques.json
# (scripts/marques_dump.ps1 puis scripts/cues2marques.py).
# Outils : prop_commun.py + manim/canvas_proportion.py (non modifiés).
# Ajouté ICI : Correspondance (le canvas `echelle` du coach, variante
# « correspondance » : plan bleu court / réalité verte longue, flèche ambre),
# cote() (une cote d'architecte), les dessins (Sofiane et son casque, le
# collège, la feuille du plan, la maquette, le terrain). EchelleCarte (carte
# routière) n'est pas employée : le décor est un PLAN de bâtiment.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/prop_echelle_comprendre.py PropEchelleComprendre6e
# python -m manim render -qh --disable_caching manim/scripts/6e/prop_echelle_comprendre.py PropEchelleComprendre6e -o eleveai-maths-6e-prop-echelle-comprendre --media_dir manim/scripts/6e/media-prop-echelle-comprendre
# python -m manim render -qh --disable_caching manim/scripts/6e/prop_echelle_comprendre.py PropEchelleComprendre4e -o eleveai-maths-4e-prop-echelle-comprendre --media_dir manim/scripts/6e/media-prop-echelle-comprendre
# Sorties : manim/sorties/6e/maths/proportionnalite/07-echelle-comprendre/eleveai-maths-6e-prop-echelle-comprendre.mp4
#           manim/sorties/4e/maths/proportionnalite/07-echelle-comprendre/eleveai-maths-4e-prop-echelle-comprendre.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403

BLEU_PLAN = "#2563eb"     # le plan, sur la carte blanche (blue-600 du coach)
BLEU_NOIR = "#60a5fa"     # le plan, sur le fond noir
VERT_REEL = "#16a34a"     # la réalité, sur la carte blanche (green-600 du coach)
GRIS_L = "#475569"        # libellés du coach (slate-600)
MUR = "#fef3c7"
BRIQUE = "#b45309"
VITRE = "#7dd3fc"


def cote(a, b, txt, couleur, fs=32, cote_txt=DOWN, buff=0.12, sw=5):
    """Une cote d'architecte : trait, deux petites barres, l'étiquette au
    milieu (dessous par défaut). .trait · .etiquette (Text, au mot)."""
    d = b - a
    n = np.array([-d[1], d[0], 0.0]) / (np.linalg.norm(d) or 1)
    trait = VGroup(Line(a, b), Line(a + n * 0.13, a - n * 0.13), Line(b + n * 0.13, b - n * 0.13))
    trait.set_stroke(couleur, sw)
    t = Text(txt, font_size=fs, color=couleur, weight=BOLD).next_to(trait, cote_txt, buff=buff)
    g = VGroup(trait, t)
    g.trait, g.etiquette = trait, t
    return g


def casque_chantier(p, couleur="#facc15"):
    """Le casque de chantier jaune de l'architecte, sur la tête de p."""
    c = p.tete.get_center()
    r = p.tete.width / 2
    dome = AnnularSector(inner_radius=0, outer_radius=r * 1.08, angle=PI, start_angle=0, fill_color=couleur,
                         fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.62)
    bord = RoundedRectangle(width=r * 2.7, height=r * 0.22, corner_radius=r * 0.1, fill_color=couleur,
                            fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.12)
    crete = Rectangle(width=r * 0.25, height=r * 0.7, fill_color="#eab308", fill_opacity=1,
                      stroke_width=0).move_to(c + UP * r * 0.75)
    return VGroup(dome, crete, bord)


def rouleau(p):
    """Un plan roulé sous le bras de p."""
    c = p.corps.get_center() + RIGHT * p.corps.width * 0.38
    tube = RoundedRectangle(width=0.22 * p.width / 1.5, height=1.0 * p.width / 1.5, corner_radius=0.08,
                            fill_color="#dbeafe", fill_opacity=1, stroke_color=BLEU_PLAN, stroke_width=2)
    return tube.rotate(-0.5).move_to(c)


def sofiane(s=1.0):
    """Sofiane, architecte : chemise bleu canard, casque de chantier, un plan roulé."""
    p = personne(peau="#c68642", tenue="#0f766e", cheveux="#111827", s=s)
    p.add(casque_chantier(p), rouleau(p))
    return p


def college(l=4.4, h=2.0):
    """Le collège, vu de face : murs crème, deux rangées de fenêtres, toit, porte."""
    murs = Rectangle(width=l, height=h, fill_color=MUR, fill_opacity=1, stroke_color=BRIQUE, stroke_width=3)
    toit = Polygon(murs.get_corner(UL) + LEFT * 0.12, murs.get_corner(UR) + RIGHT * 0.12,
                   murs.get_corner(UR) + P(-0.25, 0.35), murs.get_corner(UL) + P(0.25, 0.35),
                   fill_color="#991b1b", fill_opacity=1, stroke_width=0)
    fen = VGroup()
    n = 7
    for r in range(2):
        for k in range(n):
            if r == 1 and k == n // 2:
                continue
            x = murs.get_left()[0] + (k + 0.5) * l / n
            y = murs.get_top()[1] - (0.3 + r * 0.5) * h / 1.0 * 0.9
            fen.add(Rectangle(width=l / n * 0.55, height=h * 0.24, fill_color=VITRE, fill_opacity=1,
                              stroke_color="#0369a1", stroke_width=2).move_to(P(x, y)))
    porte = Rectangle(width=l / n * 0.7, height=h * 0.38, fill_color="#7c2d12", fill_opacity=1,
                      stroke_width=0).move_to(P(murs.get_x(), murs.get_bottom()[1] + h * 0.19))
    g = VGroup(toit, murs, fen, porte)
    g.murs = murs
    return g


def feuille(l=3.0, h=3.9):
    """La feuille du plan : papier blanc bleuté, quadrillage léger."""
    papier = RoundedRectangle(width=l, height=h, corner_radius=0.08, fill_color="#f8fafc", fill_opacity=1,
                              stroke_color="#93c5fd", stroke_width=3)
    q = VGroup()
    pas = 0.3
    for i in range(1, int(l / pas)):
        x = papier.get_left()[0] + i * pas
        q.add(Line(P(x, papier.get_bottom()[1] + 0.05), P(x, papier.get_top()[1] - 0.05)))
    for j in range(1, int(h / pas)):
        y = papier.get_bottom()[1] + j * pas
        q.add(Line(P(papier.get_left()[0] + 0.05, y), P(papier.get_right()[0] - 0.05, y)))
    q.set_stroke("#dbeafe", 1.5)
    g = VGroup(papier, q)
    g.papier = papier
    return g


def plan_college(l=2.4, h=1.1, couleur=BLEU_PLAN):
    """Le collège DESSINÉ en plan (vue de dessus) : contour, salles, couloir."""
    contour = Rectangle(width=l, height=h, stroke_color=couleur, stroke_width=4)
    salles = VGroup(*[Line(P(-l / 2 + k * l / 5, h / 2), P(-l / 2 + k * l / 5, h * 0.08)) for k in range(1, 5)])
    couloir = Line(P(-l / 2, h * 0.08), P(l / 2, h * 0.08))
    bas = VGroup(*[Line(P(-l / 2 + k * l / 3, -h / 2), P(-l / 2 + k * l / 3, -h * 0.12)) for k in (1, 2)])
    VGroup(salles, couloir, bas).set_stroke(couleur, 2.5)
    g = VGroup(contour, salles, couloir, bas)
    g.contour = contour
    return g


def maquette(s=1.0):
    """La maquette du collège : socle gris, bâtiment blanc en relief, arbres."""
    socle = Polygon(P(-1.9, -0.75), P(1.5, -0.75), P(1.95, -0.3), P(-1.45, -0.3), fill_color="#94a3b8",
                    fill_opacity=1, stroke_color="#475569", stroke_width=2)
    face = Rectangle(width=2.4, height=0.9, fill_color="#f8fafc", fill_opacity=1, stroke_color="#64748b",
                     stroke_width=2).move_to(P(-0.2, 0.05))
    dessus = Polygon(face.get_corner(UL), face.get_corner(UR), face.get_corner(UR) + P(0.35, 0.3),
                     face.get_corner(UL) + P(0.35, 0.3), fill_color="#e2e8f0", fill_opacity=1,
                     stroke_color="#64748b", stroke_width=2)
    cote_ = Polygon(face.get_corner(UR), face.get_corner(DR), face.get_corner(DR) + P(0.35, 0.3),
                    face.get_corner(UR) + P(0.35, 0.3), fill_color="#cbd5e1", fill_opacity=1,
                    stroke_color="#64748b", stroke_width=2)
    fen = VGroup(*[Square(0.16, fill_color=VITRE, fill_opacity=1, stroke_width=0).move_to(
        face.get_left() + P(0.3 + 0.36 * k, 0.17 - 0.38 * r)) for r in range(2) for k in range(6)])
    arbres = VGroup(*[VGroup(Line(P(x, -0.55), P(x, -0.3), color="#78350f", stroke_width=4),
                             Circle(radius=0.16, fill_color="#16a34a", fill_opacity=1, stroke_width=0)
                             .move_to(P(x, -0.2))) for x in (-1.55, 1.45)])
    g = VGroup(socle, dessus, cote_, face, fen, arbres).scale(s)
    g.face = face
    return g


def terrain(l=2.4, h=1.3):
    """Le terrain de sport dessiné sur le plan : pelouse, lignes blanches."""
    pelouse = Rectangle(width=l, height=h, fill_color="#4ade80", fill_opacity=1, stroke_color=WHITE,
                        stroke_width=3)
    milieu = Line(pelouse.get_top(), pelouse.get_bottom(), color=WHITE, stroke_width=3)
    rond = Circle(radius=h * 0.2, color=WHITE, stroke_width=3)
    buts = VGroup(*[Rectangle(width=l * 0.08, height=h * 0.4, stroke_color=WHITE, stroke_width=3).move_to(
        pelouse.get_edge_center(d) - d * l * 0.04) for d in (LEFT, RIGHT)])
    g = VGroup(pelouse, milieu, rond, buts)
    g.pelouse = pelouse
    return g


class Correspondance(VGroup):
    """Le canvas `echelle` du coach (variante « correspondance ») : carte
    blanche, ligne « Plan » (segment BLEU, court) au-dessus de la ligne
    « Réalité » (segment VERT, long), points ardoise aux extrémités, la flèche
    ambre de l'un à l'autre porte l'opération. Les segments se créent à la
    demande (seg) ; rien n'est ajouté à la scène."""

    def __init__(self, noms=("Plan", "Réalité"), u=(0.55, 0.12), vmax=(3, 30), fs=30, centre=ORIGIN, **kw):
        super().__init__(**kw)
        self.u, self.fs = u, fs
        larg = 2.1 + max(vmax[0] * u[0], vmax[1] * u[1]) + 1.3  # la place de l'étiquette « × 10 »
        self.carte = RoundedRectangle(width=larg, height=2.7, corner_radius=0.22, fill_color=CARTE,
                                      fill_opacity=1, stroke_color="#e2e8f0", stroke_width=3)
        x0 = self.carte.get_left()[0] + 2.0
        ys = (self.carte.get_top()[1] - 0.95, self.carte.get_bottom()[1] + 0.95)
        self.libelles = VGroup()
        for k, s in enumerate(noms):
            t = texte(s, fs * 0.85, GRIS_L)
            t.sans_synchro = True
            self.libelles.add(t.move_to(P(self.carte.get_left()[0] + 1.0, ys[k])))
        self.fond = VGroup(self.carte, self.libelles)
        self.add(self.fond)
        # deux repères invisibles : ils suivent les déplacements du groupe
        self._o = Dot(P(x0, ys[0]), radius=0.001, fill_opacity=0, stroke_width=0)
        self._b = Dot(P(x0, ys[1]), radius=0.001, fill_opacity=0, stroke_width=0)
        self.add(self._o, self._b)
        self.move_to(centre)

    def _x0y(self, k):
        c = (self._o if k == 0 else self._b).get_center()
        return c[0], c[1]

    def seg(self, k, v, txt):
        """Le segment de la ligne k (0 : plan, bleu ; 1 : réalité, vert) pour
        la valeur v, étiquette txt au-dessus (plan) ou dessous (réalité)."""
        x0, y = self._x0y(k)
        L = v * self.u[k]
        coul = BLEU_PLAN if k == 0 else VERT_REEL
        ligne = Line(P(x0, y), P(x0 + L, y), color=coul, stroke_width=7)
        pts = VGroup(*[Dot(P(x, y), radius=0.07, color=NUIT) for x in (x0, x0 + L)])
        t = Text(txt, font_size=self.fs, color=coul, weight=BOLD)
        t.next_to(ligne, UP if k == 0 else DOWN, buff=0.14)
        g = VGroup(ligne, pts, t)
        g.ligne, g.etiquette = ligne, t
        return g

    def fleche(self, vh, vb, txt, fs=None):
        """La flèche ambre du bout du plan au bout de la réalité, étiquette à droite."""
        a = P(self._x0y(0)[0] + vh * self.u[0], self._x0y(0)[1] - 0.12)
        b = P(self._x0y(1)[0] + vb * self.u[1], self._x0y(1)[1] + 0.12)
        fl = Arrow(a, b, buff=0.05, color=AMBRE, stroke_width=6, max_tip_length_to_length_ratio=0.25)
        t = Text(txt, font_size=fs or self.fs, color=AMBRE, weight=BOLD).next_to(b, RIGHT, buff=0.2).shift(UP * 0.45)
        g = VGroup(fl, t)
        g.fleche, g.etiquette = fl, t
        return g


class PropEchelleComprendreBase(PaysageProp):
    nom_voix = "commun-prop-echelle-comprendre"
    fichier_marques = "prop_echelle_comprendre_marques.json"

    @staticmethod
    def muet(fl):
        """Étiquette d'opération que la voix dit en mots (« le même nombre ») :
        ni attente de la synchro, ni audit."""
        fl.etiquette._pas_audit = True
        fl.etiquette.sans_synchro = True
        return fl

    def ligne_rep(self, i, morceaux, fs=None):
        """Celle de prop_tableau.py : même taille que la ligne remplacée, bornée à droite."""
        lg = super().ligne_rep(i, morceaux, fs)
        ref = self.ph_q[i]
        lg.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
        g = lg.get_left()[0]
        if lg.get_right()[0] > self.BORD_X - 0.05:
            lg.scale_to_fit_width(self.BORD_X - 0.05 - g).align_to(P(g, 0), LEFT)
        return lg

    def table(self, vals_h, vals_b, centre, libs=("Plan (cm)", "Réalité (m)"), lc=1.4, fs=36):
        """Le tableau du coach, plan en haut, réalité en bas ; cases vides."""
        return TableauProp(list(libs), [vals_h, vals_b], montrer=False, largeur_case=lc, largeur_libelle=3.0,
                           fs=fs, centre=centre)

    def _disposer_q(self, question, choix, phrase):
        """Une ligne de question qui REDIT un nombre (« ce 200 ? ») s'écrit à son
        mot, après la ligne d'avant (voir _debut)."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        for lg in q:
            if getattr(lg, "original_text", "") == "que veut dire ce 200 ?":
                lg._au_mot = "200 ?"
        return tete, q, cartes, pause, rebours, ph

    def _attente(self, textes):
        b = super()._attente(textes)
        for f in textes:
            ex = getattr(f, "_au_mot", None)
            if ex:
                b = max(b, self.t_mot(ex))
        return b

    def _debut(self, m):
        ex = getattr(m, "_au_mot", None)
        return self.t_mot(ex) if ex else super()._debut(m)

    @staticmethod
    def vh(tb, c):
        return tb.valeur(0, c, BLEU_PLAN)

    @staticmethod
    def vb(tb, c):
        return tb.valeur(1, c, VERT_REEL)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Comprendre une échelle", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Comprendre")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        bat = college(3.6, 1.6).move_to(P(-3.0, 0.15))
        f = feuille(2.0, 2.6).move_to(P(2.6, 0.2))
        pl = plan_college(1.5, 0.7).move_to(f)
        fl = Arrow(P(-0.9, 0.2), P(1.3, 0.2), color=AMBRE, stroke_width=6, buff=0)
        self.au_mot("plan")
        self.play(FadeIn(bat, shift=UP * 0.2), run_time=0.5)
        self.play(GrowArrow(fl), FadeIn(f, scale=0.8), Create(pl), run_time=0.6)
        self.au_mot("feuille")
        self.play(Indicate(f, color=BLEU_CALCUL, scale_factor=1.08), run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 01 : Sofiane, architecte, et le vrai collège ────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = sofiane(0.9).move_to(P(-5.65, -1.1))
        self.au_mot("Voici Sofiane")
        nom = self.t("Sofiane", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("architecte")
        met = self.t("architecte", 32, BLEU_CALCUL).next_to(pers, DOWN, buff=0.2)
        met.shift(RIGHT * max(0, -6.45 - met.get_left()[0]))
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        bat = college(4.3, 2.0).move_to(P(-1.95, 1.0))
        self.au_mot("plan d'un")
        self.play(FadeIn(bat, shift=UP * 0.3), run_time=0.6)
        c80 = cote(bat.murs.get_corner(DL) + DOWN * 0.3, bat.murs.get_corner(DR) + DOWN * 0.3, "80 m", VERT_OK,
                   fs=38)
        l80 = self.ligne([("Le vrai bâtiment :", WHITE), ("80 m", VERT_OK)], 36)
        self.col(l80, 2.9)
        self.au_mot("vrai bâtiment")
        self.play(Create(c80.trait), FadeIn(l80[0], shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("80")
        self.play(FadeIn(c80.etiquette, scale=1.4), FadeIn(l80[1], scale=1.3), run_time=0.4)
        self.insister(c80.etiquette, 1.25, 0.2)
        f = feuille(2.2, 2.9).move_to(P(3.7, -0.2))
        imp = self.t("Impossible !", 40, ROUGE_ERREUR).move_to(P(3.7, -2.25))
        self.au_mot("Impossible")
        self.play(FadeIn(f, scale=0.8), FadeIn(imp, scale=1.2), run_time=0.5)
        copie = VGroup(bat, c80).copy()
        self.au_mot("feuille")
        self.play(copie.animate.move_to(f.get_center() + UP * 0.3), run_time=0.8)
        self.play(Create(croix(f, sw=8)), Indicate(imp, color=ROUGE_ERREUR), run_time=0.5)
        self.attendre_voix()

    # ── 02 : on réduit tout de la même façon : l'échelle ────────────────────
    def ecran_reduire(self):
        self.ecran("02-reduire")
        f = feuille(3.3, 4.3).move_to(P(-3.6, -0.15))
        bat = college(4.3, 2.0).move_to(P(-1.95, 1.0))
        self.add(f, bat)
        self.au_mot("réduit")
        self.play(bat.animate.scale(0.5).move_to(f.get_center() + UP * 0.5), run_time=1.2)
        pl = plan_college(2.2, 1.0).move_to(f.get_center() + UP * 0.5)
        self.au_mot("Sur son plan")
        self.play(FadeOut(bat), Create(pl), run_time=0.8)
        l1 = self.ligne([("1 cm", BLEU_NOIR), ("sur le plan", BLEU_NOIR)], 34)
        l2 = self.ligne([("→", WHITE), ("10 m", VERT_OK), ("dans la réalité", VERT_OK)], 34)
        self.col(l1, 0.9, xl=1.1)
        self.col(l2, -0.1, xl=1.1)
        cart = self.ligne([("1 cm", BLEU_PLAN), ("→", NUIT), ("10 m", VERT_REEL)], 30)
        cart.move_to(f.get_center() + DOWN * 1.3)
        self.au_mot("il écrit")
        self.play(Indicate(f, color=BLEU_CALCUL, scale_factor=1.04), run_time=0.5)
        self.au_mot("1")
        self.play(FadeIn(l1[0], scale=1.3), FadeIn(cart[0], scale=1.3), run_time=0.35)
        self.au_mot("sur le plan")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("10")
        self.play(FadeIn(l2[0]), FadeIn(l2[1], scale=1.3), FadeIn(cart[1]), FadeIn(cart[2], scale=1.3),
                  run_time=0.4)
        self.au_mot("dans la")
        self.play(FadeIn(l2[2], shift=RIGHT * 0.2), run_time=0.35)
        tit = self.t("L'échelle du plan", 44, JAUNE_TITRE)
        self.col(tit, 2.2)
        cadre = SurroundingRectangle(VGroup(l1, l2), color=JAUNE_TITRE, buff=0.18, corner_radius=0.15)
        self.au_mot("l'échelle")
        self.play(Write(tit), Create(cadre), run_time=0.6)
        self.play(Indicate(cart, color=AMBRE, scale_factor=1.2), run_time=0.6)
        self.attendre_voix()

    # ── 03 : 1, 2, 3 cm → 10, 20, 30 m : proportionnels, × 10 ───────────────
    def ecran_proportionnel(self):
        self.ecran("03-proportionnel")
        co = Correspondance(centre=P(-2.3, 1.75))
        tb = self.table([1, 2, 3], [10, 20, 30], P(-2.55, -1.5))
        self.add(co.fond, tb.fond)
        sh = sb = None
        for c, (mh, mb) in enumerate((("1", "10"), ("2", "20"), ("3 cm", "30"))):
            v = c + 1
            nh, nb = co.seg(0, v, f"{v} cm"), co.seg(1, 10 * v, f"{10 * v} m")
            self.au_mot(mh)
            a = Create(nh) if sh is None else ReplacementTransform(sh, nh)
            self.play(a, FadeIn(self.vh(tb, c), scale=1.4), tb.allumer(0, c), run_time=0.45)
            self.au_mot(mb)
            a = Create(nb) if sb is None else ReplacementTransform(sb, nb)
            self.play(a, FadeIn(self.vb(tb, c), scale=1.4), tb.eteindre(0, c), tb.allumer(1, c), run_time=0.45)
            self.play(tb.eteindre(1, c), run_time=0.2)
            sh, sb = nh, nb
        tp = self.tampon("Proportionnels !", fs=36).move_to(P(3.9, 2.3))
        self.au_mot("proportionnels")
        self.play(FadeIn(tp, scale=1.3), run_time=0.4)
        self.play(LaggedStart(*[Indicate(tb.colonne(c), color=AMBRE, scale_factor=1.08) for c in range(3)],
                              lag_ratio=0.3), run_time=1.0)
        fc = self.muet(co.fleche(3, 30, "× 10"))
        fl = self.muet(tb.fleche_lat("× 10"))
        phr = self.bloc(["On multiplie toujours", "par le même nombre."], 34)
        self.col(phr, 0.75, xl=2.0)
        self.au_mot("multiplie toujours")
        self.play(GrowArrow(fc.fleche), FadeIn(fc.etiquette, scale=1.3), Create(fl.fleche), FadeIn(fl.etiquette, scale=1.3),
                  FadeIn(phr[0], shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("même nombre")
        self.play(FadeIn(phr[1], shift=RIGHT * 0.2), run_time=0.35)
        self.insister(VGroup(fl.etiquette, fc.etiquette), 1.25, 0.25)
        self.attendre_voix()

    # ── 04 : 80 m en vrai → 8 cm sur le plan (÷ 10) ─────────────────────────
    def ecran_batiment(self):
        self.ecran("04-batiment")
        bat = college(4.4, 2.0).move_to(P(-3.85, 1.0))
        c80 = cote(bat.murs.get_corner(DL) + DOWN * 0.3, bat.murs.get_corner(DR) + DOWN * 0.3, "80 m", VERT_OK,
                   fs=38)
        f = feuille(2.9, 3.4).move_to(P(3.1, 0.6))
        pl = plan_college(1.6, 0.75).move_to(f.get_center() + UP * 0.45)
        g, d = pl.get_corner(DL) + DOWN * 0.3, pl.get_corner(DR) + DOWN * 0.3
        c8 = cote(g, d, "8 cm", BLEU_PLAN, fs=32)
        ticks = VGroup(*[Line(g + RIGHT * k * (d - g)[0] / 8 + UP * 0.07, g + RIGHT * k * (d - g)[0] / 8 + DOWN * 0.07)
                         for k in range(1, 8)]).set_stroke(BLEU_PLAN, 3)
        fl = Arrow(P(-1.35, 1.0), P(1.45, 1.0), color=AMBRE, stroke_width=7, buff=0)
        e = Text("÷ 10", font_size=40, color=AMBRE, weight=BOLD).next_to(fl, UP, buff=0.12)
        e._pas_audit = e.sans_synchro = True  # l'opération du geste, dite par « donc »
        self.au_mot("bâtiment")
        self.play(FadeIn(bat, shift=UP * 0.2), Create(c80.trait), run_time=0.5)
        self.au_mot("80")
        self.play(FadeIn(c80.etiquette, scale=1.4), run_time=0.35)
        self.au_mot("mesure donc")
        self.play(GrowArrow(fl), FadeIn(e, scale=1.3), FadeIn(f, scale=0.8), Create(pl), run_time=0.6)
        self.au_mot("8 cm")
        lg = self.ligne([("80 m en vrai", VERT_OK), ("→", WHITE), ("8 cm", BLEU_NOIR), ("sur le plan", BLEU_NOIR)], 40)
        lg.move_to(P(-0.6, -2.35))
        lg[0].sans_synchro = lg[1].sans_synchro = True  # redit l'écran : 80 m, déjà dit
        lg[0]._pas_audit = True
        self.play(Create(c8.trait), Create(ticks), FadeIn(c8.etiquette, scale=1.4), FadeIn(lg[:3], shift=UP * 0.15),
                  run_time=0.45)
        self.au_mot("sur le plan")
        self.play(FadeIn(lg[3], shift=UP * 0.15), run_time=0.35)
        self.insister(c8.etiquette, 1.3, 0.2)
        ok = self.coche(VERT_OK, 0.4).next_to(f, DOWN, buff=0.25)
        self.au_mot("Il tient")
        self.play(Create(ok), Indicate(f, color=VERT_OK, scale_factor=1.06), run_time=0.6)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (1 cm → 10 m ; 5 cm ?) ──────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        f = feuille(3.0, 3.4).move_to(P(-2.4, 0.4))
        deco = VGroup(sofiane(0.85).move_to(P(-5.6, -1.0)), f, plan_college(2.0, 0.9).move_to(f))
        self.add(deco)
        tb = self.table([1, 5], [10, "?"], P(-3.1, 0.3), lc=1.6, fs=40)

        def apres(sc):
            sc.play(FadeOut(deco), FadeIn(tb.fond), run_time=0.3)
            l0 = sc.ligne_rep(0, ["5 cm,", "c'est 5 fois", "1 cm."])
            l1 = sc.ligne_rep(1, ["Donc 5 ×", "10 m =", "50 m."])
            h = tb.fleche_col(0, 1, "× 5", ligne=0)
            b = tb.fleche_col(0, 1, "× 5", ligne=1)
            sc.au_mot("5 cm")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), FadeIn(self.vh(tb, 1), scale=1.4), tb.allumer(0, 1), run_time=0.3)
            sc.au_mot("c'est 5")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), Create(h.fleche), FadeIn(h.etiquette, scale=1.3), run_time=0.35)
            sc.au_mot("1 cm")
            sc.play(FadeIn(l0[2], shift=UP * 0.15), FadeIn(self.vh(tb, 0), scale=1.4), tb.eteindre(0, 1), run_time=0.3)
            sc.au_mot("Donc 5")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), Create(b.fleche), FadeIn(b.etiquette, scale=1.3),
                    FadeIn(tb.trou(1, 1)), run_time=0.35)
            sc.au_mot("10 m")
            sc.play(FadeIn(l1[1], shift=UP * 0.15), FadeIn(self.vb(tb, 0), scale=1.4), run_time=0.3)
            sc.au_mot("50 m")
            sc.play(FadeIn(l1[2], scale=1.3), tb.remplir(1, 1, 50, VERT_REEL), run_time=0.4)
            sc.play(tb.allumer(1, 1), run_time=0.3)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["Sur ce plan, 1 cm", "correspond à 10 m.", "Que représentent 5 cm ?"],
                            [self.t("15 m", 34), self.t("50 m", 34), self.t("5 m", 34)], 1,
                            ["5 cm, c'est 5 fois 1 cm.", "Donc 5 × 10 m = 50 m."], mot_q="Sur ce plan",
                            autres_r=apres)

    # ── 06 : l'échelle-fraction 1/200 ───────────────────────────────────────
    def ecran_fraction(self):
        self.ecran("06-fraction")
        maq = maquette(1.45).move_to(P(-3.5, 0.9))
        fr_ = EcritureFraction(1, 200, fs=84, num_c=BLEU_NOIR, den_c=VERT_OK)
        self.col(fr_, 2.15, xl=2.3)
        self.au_mot("fraction")
        self.play(Create(fr_.trait), run_time=0.5)
        plaque = RoundedRectangle(width=1.5, height=0.55, corner_radius=0.1, fill_color=CARTE, fill_opacity=1,
                                  stroke_color="#64748b", stroke_width=2).move_to(P(-3.5, -0.75))
        txt_pl = Text("1/200", font_size=30, color=NUIT, weight=BOLD).move_to(plaque)
        txt_pl._pas_audit = True  # l'étiquette de la maquette, posée au « 200 » du « 1 sur 200 »
        self.au_mot("Une maquette")
        self.play(FadeIn(maq, shift=UP * 0.3), FadeIn(plaque), run_time=0.6)
        self.au_mot("1 sur")
        self.play(FadeIn(fr_.num, scale=1.4), run_time=0.3)
        self.au_mot("200")
        self.play(FadeIn(fr_.den, scale=1.4), FadeIn(txt_pl, scale=1.3), run_time=0.35)
        l1 = self.ligne([("1", BLEU_NOIR), ("cm", BLEU_NOIR), ("sur la maquette", BLEU_NOIR)], 40)
        l2 = self.ligne([("→", WHITE), ("200", VERT_OK), ("cm", VERT_OK), ("en vrai", VERT_OK)], 40)
        self.col(l1, 0.15)
        self.col(l2, -0.85)
        self.poser_lignes(l1, "fade", 0.3)
        self.au_mot("représente")
        self.play(FadeIn(l2[0]), run_time=0.2)
        self.poser_lignes(VGroup(*l2[1:]), "fade", 0.3)
        self.play(Indicate(fr_.num, color=BLEU_CALCUL), Indicate(l1[0], color=BLEU_CALCUL), run_time=0.5)
        self.play(Indicate(fr_.den, color=VERT_OK), Indicate(l2[1], color=VERT_OK), run_time=0.5)
        cadres = VGroup(*[SurroundingRectangle(m, color=AMBRE, buff=0.1, corner_radius=0.08) for m in (l1[1], l2[2])])
        mu = self.t("La même unité !", 40, AMBRE)
        self.col(mu, -2.0)
        self.au_mot("même unité")
        self.play(Create(cadres), FadeIn(mu, shift=UP * 0.15), run_time=0.5)
        self.insister(VGroup(l1[1], l2[2]), 1.3, 0.25)
        self.attendre_voix()

    # ── 07 : la salle de 4 cm sur la maquette → 800 cm = 8 m ────────────────
    def ecran_maquette(self):
        self.ecran("07-maquette")
        maq = maquette(1.65).move_to(P(-3.4, 0.7))
        face = maq.face
        salle = Rectangle(width=face.width * 0.3, height=face.height * 0.92, stroke_color=AMBRE, stroke_width=6,
                          fill_color=AMBRE, fill_opacity=0.25).move_to(face).align_to(face, LEFT).shift(RIGHT * 0.06)
        g, d = salle.get_corner(DL) + DOWN * 0.95, salle.get_corner(DR) + DOWN * 0.95
        c4 = cote(g, d, "4 cm", BLEU_NOIR, fs=36)
        self.au_mot("maquette du")
        self.play(FadeIn(maq, shift=UP * 0.3), run_time=0.6)
        self.au_mot("salle")
        self.play(FadeIn(salle), run_time=0.4)
        l1 = self.ligne([("Sur la maquette :", WHITE), ("4 cm", BLEU_NOIR)], 40)
        l1[0].sans_synchro = True
        self.col(l1, 2.5)
        self.au_mot("4")
        self.play(Create(c4.trait), FadeIn(c4.etiquette, scale=1.4), FadeIn(l1, shift=RIGHT * 0.2), run_time=0.45)
        fl = Arrow(P(2.2, 1.95), P(2.2, 0.75), color=AMBRE, stroke_width=7, buff=0)
        e = Text("× 200", font_size=40, color=AMBRE, weight=BOLD).next_to(fl, RIGHT, buff=0.2)
        l2 = self.ligne([("En vrai :", WHITE), ("4 ×", WHITE), ("200 =", AMBRE), ("800 cm", VERT_OK)], 40)
        self.col(l2, 0.2)
        self.au_mot("En vrai")
        self.play(GrowArrow(fl), FadeIn(l2[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("4 fois")
        self.play(FadeIn(l2[1], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("200")
        self.play(FadeIn(l2[2], shift=RIGHT * 0.2), FadeIn(e, scale=1.3), run_time=0.3)
        self.au_mot("800")
        self.play(FadeIn(l2[3], scale=1.3), run_time=0.4)
        self.insister(l2[3], 1.15, 0.2)
        l3 = self.ligne([("800 cm =", WHITE), ("8 m", VERT_OK)], 46, buff=0.4)
        l3[0]._pas_audit = True  # redit : 800 cm vient d'être dit
        l3[0].sans_synchro = True
        self.col(l3, -1.0)
        self.au_mot("C'est-à-dire")
        self.play(FadeIn(l3[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("8 m")
        self.play(FadeIn(l3[1], scale=1.3), run_time=0.4)
        self.play(Create(self.encadrer(l3[1])), run_time=0.4)
        self.insister(l3[1], 1.25, 0.25)
        self.attendre_voix()

    def choix_q2(self):
        """Les choix de la question 2, sur DEUX lignes (lisibles) : chaque carte
        entre au NOMBRE qui ouvre son choix (mots_choix) ; la 1re ligne n'attend
        rien, la 2e attend son nombre puis « en vrai »."""
        def deux(l1, l2a, l2b):
            h = self.t(l1, 30)
            h.sans_synchro = True
            b = self.ligne([(l2a, WHITE), (l2b, WHITE)], 30, buff=0.15)
            return VGroup(h, b).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        b = VGroup(self.t("La maquette", 30), self.t("mesure 200 cm", 30)).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        for x in b:
            x.sans_synchro = True  # la carte entre au « 200 » (mots_choix)
        return [deux("1 cm sur la maquette", "→ 200 cm", "en vrai"), b,
                deux("200 cm sur la maquette", "→ 1 cm", "en vrai")]

    # ── 08 : QUESTION 2 (que veut dire le 200 de 1/200 ?) ───────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        deco = VGroup(maquette(1.4).move_to(P(-3.4, 0.5)))
        self.add(deco)
        frq = EcritureFraction(1, 200, fs=100, num_c=BLEU_NOIR, den_c=VERT_OK).move_to(P(-4.3, 1.4))
        mq = self.t("maquette", 38, BLEU_NOIR).next_to(frq.num, RIGHT, buff=0.6)
        re = self.t("réalité", 38, VERT_OK).next_to(frq.den, RIGHT, buff=0.6)
        fa = Arrow(mq.get_left(), frq.num.get_right(), color=BLEU_NOIR, buff=0.1, stroke_width=5)
        fb = Arrow(re.get_left(), frq.den.get_right(), color=VERT_OK, buff=0.1, stroke_width=5)
        # la phrase de réponse, GRANDE, sous la fraction (la colonne de droite est prise par les cartes)
        lg = [self.ligne([(a, VERT_OK), (b, VERT_OK)], 36) for a, b in
              (("Le 1 est", "sur la maquette,"), ("le 200 est", "dans la réalité :"),
               ("la réalité est", "200 fois plus grande."))]
        bl = VGroup(*lg).arrange(DOWN, aligned_edge=LEFT, buff=0.2)
        bl.scale_to_fit_width(min(bl.width, 6.9)).move_to(P(-2.9, -1.85))

        def apres(sc):
            sc.play(FadeOut(deco), Create(frq.trait), run_time=0.3)
            sc.au_mot("Le 1")
            sc.play(FadeIn(lg[0][0], shift=UP * 0.15), FadeIn(frq.num, scale=1.4), run_time=0.3)
            sc.au_mot("sur la maquette")
            sc.play(FadeIn(lg[0][1], shift=UP * 0.15), FadeIn(mq), GrowArrow(fa), run_time=0.35)
            sc.au_mot("le 200")
            sc.play(FadeIn(lg[1][0], shift=UP * 0.15), FadeIn(frq.den, scale=1.4), run_time=0.3)
            sc.au_mot("dans la")
            sc.play(FadeIn(lg[1][1], shift=UP * 0.15), FadeIn(re), GrowArrow(fb), run_time=0.35)
            sc.au_mot("la réalité est")
            sc.play(FadeIn(lg[2][0], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("est 200")
            sc.play(FadeIn(lg[2][1], shift=UP * 0.15), run_time=0.3)
            sc.insister(frq.den, 1.25, 0.25)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse",
                            ["À l'échelle 1/200,", "que veut dire ce 200 ?"],
                            self.choix_q2(), 0,
                            ["Le 1 est sur la maquette,", "le 200 est dans la réalité :",
                             "la réalité est 200 fois plus grande."], mots_choix=("1 cm sur", "200 cm. C", "200 cm sur"),
                            mot_q="l'échelle 1", autres_r=apres)

    # ── 09 : le piège : 3 cm, ce n'est pas 13 m ─────────────────────────────
    def ecran_piege(self):
        self.ecran("09-piege")
        tit = self.t("Attention au piège !", 44, ROUGE_ERREUR).move_to(P(-0.4, 3.1))
        self.au_mot("Attention")
        self.play(Write(tit), run_time=0.5)
        tb = TableauProp(["Plan (cm)", "Réalité (m)"], [[1, 3], [10, "?"]], montrer=False, largeur_case=1.5,
                         largeur_libelle=2.8, hauteur=0.95, fs=42, centre=P(-3.25, 0.3))
        self.play(FadeIn(tb.fond), run_time=0.3)
        self.au_mot("1")
        self.play(FadeIn(self.vh(tb, 0), scale=1.4), run_time=0.3)
        self.au_mot("10")
        self.play(FadeIn(self.vb(tb, 0), scale=1.4), run_time=0.3)
        self.au_mot("3")
        self.play(FadeIn(self.vh(tb, 1), scale=1.4), FadeIn(tb.trou(1, 1), scale=1.3), run_time=0.3)
        faux = tb.poser(1, 1, 13, ROUGE_P)
        lf = self.ligne([("3 cm", BLEU_NOIR), ("→", WHITE), ("13 m", ROUGE_ERREUR)], 44)
        lf[0].sans_synchro = lf[0]._pas_audit = True  # « 3 cm » vient d'être dit
        self.col(lf, 1.75)
        self.au_mot("13")
        self.play(FadeOut(tb.trou(1, 1)), FadeIn(faux, scale=1.3), FadeIn(lf, shift=RIGHT * 0.2), run_time=0.35)
        b1 = tb.barrer(1, 1)
        b2 = Line(lf[2].get_left() + LEFT * 0.08, lf[2].get_right() + RIGHT * 0.08, color=WHITE, stroke_width=6)
        self.play(Create(b1), Create(b2), run_time=0.4)
        l2 = VGroup(self.t("On n'ajoute pas :", 42, ROUGE_ERREUR), self.t("on multiplie.", 42, VERT_OK)).arrange(
            DOWN, aligned_edge=LEFT, buff=0.15)
        self.col(l2, 0.45)
        self.au_mot("On n'ajoute")
        self.play(FadeIn(l2[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("on multiplie")
        self.play(FadeIn(l2[1], shift=RIGHT * 0.2), run_time=0.35)
        h = tb.fleche_col(0, 1, "× 3", ligne=0)
        b = tb.fleche_col(0, 1, "× 3", ligne=1)
        l3 = self.ligne([("3 ×", WHITE), ("10 m =", WHITE), ("30 m", VERT_OK)], 46)
        self.col(l3, -1.05)
        self.au_mot("3 cm, c'est")
        self.play(FadeOut(faux), FadeOut(b1), FadeIn(tb.trou(1, 1)), Create(h.fleche), FadeIn(h.etiquette, scale=1.3),
                  run_time=0.4)
        self.au_mot("3 fois")
        self.play(FadeIn(l3[0], shift=RIGHT * 0.2), Create(b.fleche), FadeIn(b.etiquette, scale=1.3), run_time=0.35)
        self.au_mot("10 m", 2)
        self.play(FadeIn(l3[1], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("30 m")
        self.play(FadeIn(l3[2], scale=1.3), tb.remplir(1, 1, 30, VERT_REEL), run_time=0.4)
        self.play(tb.allumer(1, 1), run_time=0.3)
        self.insister(l3[2], 1.2, 0.2)
        self.attendre_voix()

    # ── 10 : défi : le terrain de sport ─────────────────────────────────────
    def plan_terrain(self):
        f = feuille(3.8, 3.4).move_to(P(-3.6, 0.55))
        te = terrain(2.7, 1.35).move_to(f.get_center() + DOWN * 0.15)
        cart = self.ligne([("1 cm", BLEU_PLAN), ("→", NUIT), ("10 m", VERT_REEL)], 30)
        cart.move_to(f.get_center() + DOWN * 1.35)
        g, d = te.get_corner(UL) + UP * 0.3, te.get_corner(UR) + UP * 0.3
        c6 = cote(g, d, "6 cm", BLEU_PLAN, fs=32, cote_txt=UP)
        return f, te, cart, c6

    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.play(Write(tit), run_time=0.6)
        f, te, cart, c6 = self.plan_terrain()
        l1 = self.ligne([("Échelle :", WHITE), ("1 cm", BLEU_NOIR), ("→", WHITE), ("10 m", VERT_OK)], 38)
        l2 = self.ligne([("Terrain :", WHITE), ("6 cm", BLEU_NOIR), ("sur le plan", BLEU_NOIR)], 38)
        l3 = self.ligne([("Longueur réelle :", WHITE), ("? m", ORANGE_RETENUE)], 38)
        for lg, y in ((l1, 1.75), (l2, 0.75), (l3, -0.25)):
            self.col(lg, y)
        l1[0].sans_synchro = True
        self.au_mot("Sur le plan")
        self.play(FadeIn(f, scale=0.9), run_time=0.4)
        self.au_mot("1")
        self.play(FadeIn(l1[0]), FadeIn(l1[1], scale=1.3), FadeIn(cart[0], scale=1.3), run_time=0.35)
        self.au_mot("10")
        self.play(FadeIn(l1[2]), FadeIn(l1[3], scale=1.3), FadeIn(cart[1:], scale=1.3), run_time=0.35)
        self.au_mot("terrain")
        self.play(FadeIn(te, scale=0.8), FadeIn(l2[0], shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("6")
        self.play(Create(c6.trait), FadeIn(c6.etiquette, scale=1.4), FadeIn(l2[1], scale=1.3), run_time=0.4)
        self.au_mot("sur le plan")
        self.play(FadeIn(l2[2], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("Quelle")
        self.play(FadeIn(l3[0], shift=RIGHT * 0.2), FadeIn(l3[1], scale=1.3), run_time=0.4)
        self.pause_defi(y=-1.35)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.15))
        f, te, cart, c6 = self.plan_terrain()
        for m in (f, te, cart, c6):
            m.shift(UP * 0.25)
        self.add(f, te, cart, c6)
        self.play(Write(tit), run_time=0.5)
        g = te.get_corner(UL) + UP * 0.3  # SUR le trait de la cote, sous « 6 cm »
        pas = te.width / 6
        bleus = VGroup(*[Line(g + RIGHT * (k * pas + 0.03), g + RIGHT * ((k + 1) * pas - 0.03), color=AMBRE, stroke_width=10)
                         for k in range(6)])
        x0, w = -6.1, 0.9
        verts = VGroup(*[Rectangle(width=w - 0.06, height=0.42, fill_color=VERT_REEL, fill_opacity=1,
                                   stroke_color=WHITE, stroke_width=2).move_to(P(x0 + (k + 0.5) * w, -1.75))
                         for k in range(6)])
        dix = VGroup(*[Text("10 m", font_size=22, color=WHITE, weight=BOLD).move_to(v) for v in verts])
        c60 = cote(verts.get_corner(DL) + DOWN * 0.25, verts.get_corner(DR) + DOWN * 0.25, "60 m", VERT_OK, fs=38)
        l1 = self.ligne([("6 cm =", BLEU_NOIR), ("6 ×", WHITE), ("1 cm", BLEU_NOIR)], 42)
        l2 = self.ligne([("6 ×", WHITE), ("10 =", WHITE), ("60 m", VERT_OK)], 46)
        l3 = self.ligne([("Le terrain mesure", WHITE), ("60 m.", VERT_OK)], 32)
        for lg, y in ((l1, 1.7), (l2, 0.5), (l3, -0.75)):
            self.col(lg, y)
        self.au_mot("6")
        self.play(FadeIn(l1[0], shift=RIGHT * 0.2), Indicate(c6.etiquette, color=AMBRE), run_time=0.4)
        self.au_mot("6 fois")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("1 cm")
        self.play(FadeIn(l1[2], shift=RIGHT * 0.2), LaggedStart(*[Create(b) for b in bleus], lag_ratio=0.25),
                  run_time=1.0)
        self.au_mot("6 fois", 2)
        self.play(FadeIn(l2[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("10,")
        self.play(FadeIn(l2[1], shift=RIGHT * 0.2), LaggedStart(*[FadeIn(VGroup(v, t), shift=DOWN * 0.2)
                                                                    for v, t in zip(verts, dix)], lag_ratio=0.15),
                  run_time=0.9)
        self.au_mot("60 m")
        self.play(FadeIn(l2[2], scale=1.3), Create(c60.trait), FadeIn(c60.etiquette, scale=1.3), run_time=0.4)
        self.insister(l2[2], 1.15, 0.2)
        self.au_mot("Le terrain")
        self.poser_lignes(l3, "fade", 0.35)
        self.play(Create(self.encadrer(l3)), run_time=0.4)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        """« Ce que tu as appris » : titre EN HAUT ET CENTRÉ, les trois points
        en grand dessous, le tableau du plan (× 10) en bas, à gauche de Ti-Margo."""
        self.ecran("11-finale", 0.65)
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        lignes = VGroup()
        for morceaux in (("Une échelle dit ce que vaut 1 cm", "du plan dans la réalité."),
                         ("Le plan et la réalité", "sont proportionnels."),
                         ("À l'échelle 1/200, la réalité est", "200 fois plus grande que le plan.")):
            bloc = VGroup(*[self.t(x, 34) for x in morceaux]).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
            lignes.add(VGroup(self.coche(), bloc).arrange(RIGHT, buff=0.25))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.3).move_to(P(-1.2, 0.75))
        tb = TableauProp(["Plan (cm)", "Réalité (m)"], [[1, 2, 3], [10, 20, 30]], montrer=False, largeur_case=1.2,
                         largeur_libelle=2.6, hauteur=0.68, fs=32, centre=P(-2.1, -2.55))
        vals = VGroup(*[self.vh(tb, c) for c in range(3)], *[self.vb(tb, c) for c in range(3)])
        for v in vals:
            v._pas_audit = v.sans_synchro = True  # le tableau de l'écran 03, rappelé
        fl = self.muet(tb.fleche_lat("× 10", fs=36))
        self.au_mot("Une échelle")
        self.montrer_ligne(lignes[0])
        self.au_mot("Le plan et")
        self.montrer_ligne(lignes[1], FadeIn(VGroup(tb.fond, vals, fl), shift=UP * 0.2))
        self.au_mot("À l'échelle")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_reduire()
        self.ecran_proportionnel()
        self.ecran_batiment()
        self.ecran_question1()
        self.ecran_fraction()
        self.ecran_maquette()
        self.ecran_question2()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class PropEchelleComprendre6e(PropEchelleComprendreBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"


class PropEchelleComprendre4e(PropEchelleComprendreBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
