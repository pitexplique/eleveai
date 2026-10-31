# prop_resoudre.py
# EleveAI — Maths 6e — série « Proportionnalité », lot 1, épisode 05 :
# RÉSOUDRE UN PROBLÈME DE PROPORTIONNALITÉ (micro du coach : prop_direct,
# notion prop_proportionnalite), AVEC VOIX. Paysage 16:9, CEINTURE VERTE (la
# paysage complète du niveau : situation, vérifier, trois méthodes sur le MÊME
# problème, piège, 2 questions-pauses, défi corrigé). Short jumeau :
# prop_resoudre_short.py (blanche).
# ⭐ Méthodes travaillées, côte à côte sur le même problème (10 maillots 50 €
# → 15 maillots 75 €) : chemin 1 l'UNITÉ (10 → 1 → 15, figure Unite) ;
# chemin 2 les COLONNES (moitié 5 → 25 €, puis 10 + 5) ; chemin 3 le
# COEFFICIENT (flèche latérale « × 5 »). Repère visuel commun : TROIS PISTES
# qui partent de « 10 maillots, 50 € » et arrivent au même DRAPEAU « 75 € ».
# ⛔ Pas de produit en croix (6e) ; « ÷ » pour une division.
# ⭐ Leurres (consigne-videos-proportionnalite.md) : 1. AJOUTER au lieu de
# multiplier (question 1 : 38 € = 36 + 2 ; question 2 : 21 € = 12 + 9) ;
# 2. croire tout proportionnel (le piège du logo : 20 € une fois + 5 € par
# maillot) ; 3. oublier une étape / mauvais calcul (question 1 : 216 € = 36 × 6
# sans revenir à 1 ballon ; question 2 : 18 € = 12 + 6).
#
# Décor et métier : FOOTBALL, Maëlle, RESPONSABLE DU MATÉRIEL d'un club
# (maillots, ballons, gourdes, chaussettes ; flocage du logo). Prix fictifs,
# à l'ordre de grandeur d'un maillot d'entraînement de club (≈ 5 à 15 €) :
# aucun chiffre du monde réel n'est cité, pas de source à donner.
# Centres d'intérêt : football (précision du centre « sport »), argent-budget.
#
# Micro → écrans : situation (01) ; vérifier que c'est proportionnel (02) ;
# chemin 1 l'unité (03) ; chemin 2 les colonnes (04) ; chemin 3 le coefficient
# et la même arrivée (05) ; QUESTION 1 (06, ballons, par l'unité) ; piège du
# logo (07) ; QUESTION 2 (08, gourdes, multiplier une colonne : billes 3 × 3) ;
# défi (09) et correction (09b, chaussettes) ; ce que tu as appris (10) ; fin (11).
#
# Voix : manim/voix/6e-prop-resoudre.json (validée par Frédéric, débit −10),
# WAV dans public/sons/6e-prop-resoudre/ ; marques mot à mot :
# manim/scripts/6e/prop_resoudre_marques.json (scripts/marques_dump.ps1 puis
# scripts/cues2marques.py).
# Outils : prop_commun.py + manim/canvas_proportion.py (non modifiés) :
# TableauProp, Unite, Billes, tampon().
# Ajouté ICI (absent du module) : Pistes (les trois pistes et le drapeau),
# maillot(), ballon(), gourde(), chaussette(), maelle() ; plus_bas() et la
# surcharge de ligne_rep() reprises de prop_tableau.py.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/prop_resoudre.py PropResoudre6e
# python -m manim render -qh --disable_caching manim/scripts/6e/prop_resoudre.py PropResoudre6e -o eleveai-maths-6e-prop-resoudre --media_dir manim/scripts/6e/media-prop-resoudre
# Sortie : manim/sorties/6e/maths/proportionnalite/05-resoudre/eleveai-maths-6e-prop-resoudre.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403

BLEU_CLUB = "#2563eb"
C1 = "#a78bfa"      # chemin 1 : l'unité (violet)
C2 = FLECHE_COL     # chemin 2 : les colonnes (bleu ciel, comme les flèches de colonne)
C3 = AMBRE          # chemin 3 : le coefficient (ambre, comme la flèche « × k »)
COULEURS_CH = [C1, C2, C3]


def nb_libre(*mobs):
    """Données de figure déjà dites : ni synchro, ni audit."""
    for m in mobs:
        for f in m.get_family():
            if isinstance(f, Text):
                f.sans_synchro = True
                f._pas_audit = True
    return mobs[0] if len(mobs) == 1 else mobs


def ss(u):
    """Les Text d'une figure posée au mot par la scène n'attendent pas leurs
    MOTS (prop_unite.py) ; l'AUDIT des nombres les contrôle toujours."""
    for f in u.get_family():
        if isinstance(f, Text):
            f.sans_synchro = True
    return u


def maillot(couleur=BLEU_CLUB, s=1.0, logo=False):
    """Un maillot de foot : corps, manches, col blanc, (logo : écusson doré)."""
    pts = [P(-0.3, 0.42), P(-0.12, 0.42), P(0, 0.34), P(0.12, 0.42), P(0.3, 0.42), P(0.55, 0.2),
           P(0.43, 0.04), P(0.3, 0.12), P(0.3, -0.45), P(-0.3, -0.45), P(-0.3, 0.12), P(-0.43, 0.04),
           P(-0.55, 0.2)]
    corps = Polygon(*pts, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    col = Polygon(P(-0.12, 0.42), P(0, 0.3), P(0.12, 0.42), fill_color=WHITE, fill_opacity=1, stroke_width=0)
    bande = Rectangle(width=0.6, height=0.07, fill_color=WHITE, fill_opacity=0.85, stroke_width=0).move_to(
        P(0, -0.05))
    g = VGroup(corps, col, bande)
    if logo:
        g.add(Star(5, outer_radius=0.09, fill_color="#facc15", fill_opacity=1, stroke_width=0).move_to(P(0.13, 0.17)))
    return g.scale(s)


def ballon(r=0.3):
    """Un ballon de foot : blanc, pentagone noir au centre, coutures."""
    rond = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color="#111827", stroke_width=2)
    pent = RegularPolygon(5, fill_color="#111827", fill_opacity=1, stroke_width=0).scale(r * 0.36)
    traits = VGroup(*[Line(pent.get_vertices()[k], pent.get_vertices()[k] * 2.3, color="#111827", stroke_width=2)
                      for k in range(5)])
    return VGroup(rond, traits, pent)


def gourde(couleur="#22c55e", h=0.9):
    """Une gourde de sport : corps arrondi, bouchon, bec."""
    corps = RoundedRectangle(width=0.36, height=h * 0.75, corner_radius=0.12, fill_color=couleur, fill_opacity=1,
                             stroke_color=WHITE, stroke_width=2)
    bouchon = Rectangle(width=0.24, height=h * 0.13, fill_color="#e2e8f0", fill_opacity=1, stroke_width=0)
    bouchon.next_to(corps, UP, buff=0)
    bec = Rectangle(width=0.08, height=h * 0.1, fill_color="#94a3b8", fill_opacity=1, stroke_width=0)
    bec.next_to(bouchon, UP, buff=0)
    return VGroup(corps, bouchon, bec)


def chaussette(couleur=BLEU_CLUB, s=1.0):
    """Une chaussette de foot (jambe + pied), bande blanche en haut."""
    pts = [P(-0.13, 0.5), P(0.13, 0.5), P(0.13, -0.22), P(0.32, -0.3), P(0.32, -0.5), P(-0.13, -0.5)]
    c = Polygon(*pts, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    bande = Rectangle(width=0.26, height=0.1, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(0, 0.4))
    return VGroup(c, bande).scale(s)


def paire(s=1.0):
    return VGroup(chaussette(s=s), chaussette(s=s).shift(RIGHT * 0.2 * s))


def maelle(s=1.0):
    """Maëlle, responsable du matériel : survêtement du club, sifflet, planchette."""
    p = personne(peau="#e0ac69", tenue=BLEU_CLUB, cheveux="#7c2d12", longs=True, s=s)
    plan = VGroup(RoundedRectangle(width=0.5, height=0.65, corner_radius=0.05, fill_color="#a16207",
                                   fill_opacity=1, stroke_width=0),
                  Rectangle(width=0.38, height=0.45, fill_color=WHITE, fill_opacity=1, stroke_width=0)
                  .shift(DOWN * 0.05)).scale(s).move_to(p.corps.get_center() + P(0.35 * s, -0.25 * s))
    lignes = VGroup(*[Line(P(-0.13, y), P(0.13, y), color="#64748b", stroke_width=2) for y in (0.08, -0.04, -0.16)])
    lignes.scale(s).move_to(plan[1])
    sifflet = Circle(radius=0.07 * s, fill_color="#cbd5e1", fill_opacity=1, stroke_width=0).move_to(
        p.corps.get_top() + P(-0.15 * s, -0.25 * s))
    p.add(plan, lignes, sifflet)
    return p


def plus_bas(tb, c0, c1, couleur=FLECHE_COL, fs=None):
    """Le « + » de la linéarité SOUS la carte (prop_tableau.py)."""
    t = Text("+", font_size=fs or int(tb.fs * 1.3), color=couleur, weight=BOLD)
    return t.move_to(P((tb.x(c0) + tb.x(c1)) / 2, tb.carte.get_bottom()[1] - 0.35))


# ── LES TROIS PISTES (le repère commun des trois chemins) ───────────────────
class Pistes(VGroup):
    """Trois pistes (chemin 1 en haut, 3 en bas) qui partent d'une carte
    « départ » et arrivent au même DRAPEAU. .routes[i] (fond) · .noms[i]
    (« Chemin 1 : l'unité », à poser au mot) · .balles[i] (le ballon qui
    court) · .drapeau · .arrivee (Text du drapeau, « ? € » puis la réponse)
    · avancer(i, frac) → animations (la piste se colore, le ballon avance)."""

    NOMS = ["Chemin 1 : l'unité", "Chemin 2 : les colonnes", "Chemin 3 : le coefficient"]
    XA, XB = -3.9, 3.35

    def __init__(self, depart=("10 maillots", "50 €"), arrivee=None, finis=(), noms=(), y0=2.45, ecart=0.55,
                 fs=26, **kw):
        super().__init__(**kw)
        self.ys = [y0 + ecart, y0, y0 - ecart]
        self.x_cour = [self.XA + 0.05] * 3
        self.routes, self.noms, self.balles, self.remplis = VGroup(), VGroup(), VGroup(), VGroup()
        for i, y in enumerate(self.ys):
            r = RoundedRectangle(width=self.XB - self.XA, height=0.42, corner_radius=0.12, fill_color="#1e293b",
                                 fill_opacity=1, stroke_color=COULEURS_CH[i], stroke_width=2,
                                 stroke_opacity=0.6).move_to(P((self.XA + self.XB) / 2, y))
            self.routes.add(r)
            n = Text(self.NOMS[i], font_size=fs, color=WHITE, weight=BOLD)
            n.move_to(P(0, y)).align_to(P(self.XA + 0.5, 0), LEFT).set_z_index(2)
            n.sans_synchro = True  # posé AU MOT par la scène (« Chemin 1 »)
            self.noms.add(n)
            b = ballon(0.15).move_to(P(self.XA + 0.22, y)).set_z_index(3)
            self.balles.add(b)
        # la carte de départ
        carte = RoundedRectangle(width=1.85, height=1.62, corner_radius=0.18, fill_color=CARTE, fill_opacity=1,
                                 stroke_color="#e2e8f0", stroke_width=3).move_to(P(-5.4, y0))
        if depart:
            dep = VGroup(*[texte(s, fs, NUIT) for s in depart]).arrange(DOWN, buff=0.15).move_to(carte)
            nb_libre(dep)
        else:
            dep = maillot(s=0.9).move_to(carte)
        self.depart = VGroup(carte, dep)
        liens_g = VGroup(*[Line(P(carte.get_right()[0], y0), P(self.XA, y), color=GREY_B, stroke_width=3)
                           for y in self.ys])
        # le drapeau
        xp = 4.0
        mat = Line(P(xp, y0 - 0.75), P(xp, y0 + 0.8), color=GREY_A, stroke_width=5)
        toile = Polygon(P(xp, y0 + 0.8), P(xp + 0.62, y0 + 0.6), P(xp, y0 + 0.4), fill_color=ROUGE_P,
                        fill_opacity=1, stroke_width=0)
        liens_d = VGroup(*[Line(P(self.XB, y), P(xp, y0 - 0.1), color=GREY_B, stroke_width=3) for y in self.ys])
        boite = RoundedRectangle(width=1.55, height=0.72, corner_radius=0.14, fill_color="#052e16", fill_opacity=1,
                                 stroke_color=VERT_OK, stroke_width=4).move_to(P(xp + 1.25, y0 - 0.25))
        self.boite = boite
        self.drapeau = VGroup(mat, toile)
        self.arrivee = self.txt_arrivee(arrivee)
        if arrivee:
            nb_libre(self.arrivee)
        self.add(liens_g, liens_d, self.routes, self.depart, self.drapeau, boite, self.remplis, self.balles,
                 self.arrivee)
        for i in finis:
            seg = self.segment(i, self.XB - 0.05)
            self.remplis.add(seg)
            self.balles[i].move_to(P(self.XB - 0.25, self.ys[i]))
            self.x_cour[i] = self.XB - 0.05
        for i in noms:
            nb_libre(self.noms[i])
            self.add(self.noms[i])

    def txt_arrivee(self, s=None):
        t = Text(s or "? €", font_size=36, color=VERT_OK if s else ORANGE_RETENUE, weight=BOLD)
        if not s:
            t._pas_audit = True
            t.sans_synchro = True
        return t.move_to(self.boite)

    def segment(self, i, x1):
        x0 = self.x_cour[i]
        r = RoundedRectangle(width=max(0.05, x1 - x0), height=0.34, corner_radius=0.1, fill_color=COULEURS_CH[i],
                             fill_opacity=0.75, stroke_width=0)
        return r.move_to(P((x0 + x1) / 2, self.ys[i])).set_z_index(1)

    def avancer(self, i, frac):
        """La piste i se colore jusqu'à frac (0 → 1) et son ballon y court."""
        x1 = self.XA + 0.05 + frac * (self.XB - self.XA - 0.1)
        seg = self.segment(i, x1)
        self.x_cour[i] = x1
        self.remplis.add(seg)
        return [GrowFromEdge(seg, LEFT), self.balles[i].animate.move_to(P(x1 - 0.2, self.ys[i]))]

    def arriver(self, s, couleur=VERT_OK):
        """Le « ? € » du drapeau devient la réponse (animation)."""
        neuf = Text(s, font_size=36, color=couleur, weight=BOLD).move_to(self.boite)
        vieux = self.arrivee
        self.arrivee = neuf
        return AnimationGroup(FadeOut(vieux, scale=0.6), FadeIn(neuf, scale=1.5))


class PropResoudreBase(PaysageProp):
    nom_voix = "6e-prop-resoudre"
    fichier_marques = "prop_resoudre_marques.json"

    def ligne_rep(self, i, morceaux, fs=None):
        """Celle de prop_commun, à la taille de la phrase remplacée et bornée à
        droite (BORD_X) : reprise de prop_tableau.py (leçon de l'épisode 02)."""
        lg = super().ligne_rep(i, morceaux, fs)
        ref = self.ph_q[i]
        lg.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
        g = lg.get_left()[0]
        if lg.get_right()[0] > self.BORD_X - 0.05:
            lg.scale_to_fit_width(self.BORD_X - 0.05 - g).align_to(P(g, 0), LEFT)
        return lg

    @staticmethod
    def muet(fl):
        """Étiquette de flèche dite en mots (« la moitié », « deux fois ») :
        ni attente de la synchro, ni audit."""
        fl.etiquette._pas_audit = True
        fl.etiquette.sans_synchro = True
        return fl

    def lc(self, morceaux, y, fs=40, xl=1.3):
        """Une ligne de calcul dans la colonne de droite (non jouée)."""
        return self.col(self.ligne(morceaux, fs), y, xl)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Résoudre un problème de proportionnalité", self.identite, self.ceinture,
                                       y_ech=-2.45)
        ident.sans_synchro = ident._pas_audit = True  # « Maths 6e »
        self.au_mot("Résoudre")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        pi = Pistes(depart=None, y0=0.15)
        self.play(FadeIn(pi, shift=UP * 0.2), run_time=0.6)
        self.au_mot("Trois chemins")
        self.play(LaggedStart(*[AnimationGroup(*pi.avancer(i, 1.0)) for i in range(3)], lag_ratio=0.25),
                  run_time=0.9)
        self.au_mot("une seule")
        self.play(Indicate(VGroup(pi.drapeau, pi.boite, pi.arrivee), color=VERT_OK, scale_factor=1.2),
                  run_time=0.8)
        self.attendre_voix(marge=0.6)

    # ── 01 : Maëlle, responsable du matériel du club ────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = maelle(1.0).move_to(P(-5.5, -1.1))
        self.au_mot("Voici Maëlle")
        nom = self.t("Maëlle", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("gère le matériel")
        met = self.t("gère le matériel", 28, BLEU_CALCUL).next_to(pers, DOWN, buff=0.15)
        met.shift(RIGHT * max(0, -6.45 - met.get_left()[0]))
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("club de foot")
        bal = ballon(0.38).move_to(P(-5.5, 2.75))
        self.play(FadeIn(bal, scale=0.5), Rotate(bal, -PI), run_time=0.6)
        rangs = VGroup(*[VGroup(*[maillot(s=0.6) for _ in range(5)]).arrange(RIGHT, buff=0.14) for _ in range(3)])
        rangs.arrange(DOWN, buff=0.22).move_to(P(-1.75, 0.95))
        l1 = self.lc([("10 maillots", WHITE), ("=", WHITE), ("50 €", VERT_OK)], 2.2)
        self.au_mot("10 maillots")
        self.play(LaggedStart(*[FadeIn(m, shift=DOWN * 0.2) for r in rangs[:2] for m in r], lag_ratio=0.06),
                  FadeIn(l1[0], shift=RIGHT * 0.2), run_time=0.7)
        self.au_mot("50 €")
        self.play(FadeIn(l1[1]), FadeIn(l1[2], scale=1.3), run_time=0.4)
        self.insister(l1[2], 1.15, 0.2)
        l2 = self.lc([("15 maillots", WHITE), ("→", WHITE), ("? €", ORANGE_RETENUE)], 1.0)
        l2[2]._pas_audit = l2[2].sans_synchro = True
        self.au_mot("15 maillots")
        self.play(LaggedStart(*[FadeIn(m, shift=DOWN * 0.2) for m in rangs[2]], lag_ratio=0.1),
                  FadeIn(l2[0], shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("Combien")
        q = self.col(self.t("Combien va-t-elle payer ?", 38, ORANGE_RETENUE), -0.3, 1.3)
        self.play(FadeIn(l2[1]), FadeIn(l2[2], scale=1.4), FadeIn(q, shift=UP * 0.15), run_time=0.5)
        self.insister(l2[2], 1.25, 0.2)
        self.attendre_voix()

    # ── 02 : d'abord, vérifier que c'est proportionnel ──────────────────────
    def etiquette_prix(self):
        """L'étiquette de prix d'un maillot, sans nombre (« le même prix »)."""
        e = VGroup(RoundedRectangle(width=0.5, height=0.3, corner_radius=0.06, fill_color=AMBRE, fill_opacity=1,
                                    stroke_width=0), Dot(radius=0.04, color=NUIT).shift(LEFT * 0.16))
        return e

    def ecran_verifier(self):
        self.ecran("02-verifier")
        tit = self.t("D'abord : est-ce proportionnel ?", 44, JAUNE_TITRE).move_to(P(-0.3, 3.05))
        self.au_mot("D'abord")
        self.play(Write(tit), run_time=0.6)
        quatre = VGroup(*[maillot(s=0.75) for _ in range(4)]).arrange(RIGHT, buff=0.3).move_to(P(-3.1, 1.75))
        etiq = VGroup(*[self.etiquette_prix().next_to(m, DOWN, buff=0.12) for m in quatre])
        c1 = self.col(self.bloc(["Chaque maillot coûte", "le même prix."], 34), 1.75, 1.2)
        self.au_mot("Chaque maillot")
        self.play(LaggedStart(*[FadeIn(m, shift=DOWN * 0.2) for m in quatre], lag_ratio=0.12),
                  FadeIn(c1[0], shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("même prix")
        self.play(LaggedStart(*[FadeIn(e, scale=1.5) for e in etiq], lag_ratio=0.1), FadeIn(c1[1]), run_time=0.6)
        self.play(Indicate(etiq, color=WHITE, scale_factor=1.2), run_time=0.5)
        self.au_mot("Oui")
        v = self.tampon("Proportionnel !", VERT_OK, 40)
        v.texte.sans_synchro = True  # « proportionnel » dit dans la question, 4 s plus tôt
        self.col(v, 0.55, 1.2)
        self.play(FadeIn(v, scale=1.3), run_time=0.4)
        g2 = VGroup(*[maillot(s=0.6) for _ in range(2)]).arrange(RIGHT, buff=0.12).move_to(P(-5.0, -0.35))
        g4 = VGroup(*[maillot(s=0.6) for _ in range(4)]).arrange(RIGHT, buff=0.12).move_to(P(-1.9, -0.35))
        b2 = Rectangle(width=1.0, height=0.36, fill_color=AMBRE, fill_opacity=1, stroke_width=0)
        b2.next_to(g2, DOWN, buff=0.45).align_to(g2, LEFT)
        b4 = Rectangle(width=2.0, height=0.36, fill_color=AMBRE, fill_opacity=1, stroke_width=0)
        b4.next_to(g4, DOWN, buff=0.45).align_to(g4, LEFT)
        fh = fleche_courbe(g2.get_top() + UP * 0.1, g4.get_top() + UP * 0.1, -PI / 3, FLECHE_COL)
        th = nb_libre(Text("× 2", font_size=34, color=FLECHE_COL, weight=BOLD).next_to(fh, UP, buff=0.05))
        fb = fleche_courbe(b2.get_bottom() + DOWN * 0.1, b4.get_bottom() + DOWN * 0.1, PI / 3, AMBRE)
        tb_ = nb_libre(Text("× 2", font_size=34, color=AMBRE, weight=BOLD).next_to(fb, DOWN, buff=0.05))
        c2 = self.col(self.bloc(["Deux fois plus de maillots,", "deux fois plus cher."], 34), -0.75, 1.2)
        self.au_mot("deux fois plus de maillots")
        self.play(FadeIn(g2, shift=UP * 0.2), FadeIn(g4, shift=UP * 0.2), Create(fh), FadeIn(th, scale=1.3),
                  FadeIn(c2[0], shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("deux fois plus cher")
        self.play(GrowFromEdge(b2, LEFT), GrowFromEdge(b4, LEFT), Create(fb), FadeIn(tb_, scale=1.3),
                  FadeIn(c2[1], shift=RIGHT * 0.2), run_time=0.6)
        self.attendre_voix()

    # ── 03 : chemin 1, l'unité (10 → 1 → 15) ────────────────────────────────
    def allumer_route(self, pi, i):
        return pi.routes[i].animate.set_stroke(COULEURS_CH[i], width=5, opacity=1)

    def ecran_chemin1(self):
        self.ecran("03-chemin1")
        pi = Pistes()
        self.add(pi)
        u = ss(Unite(10, 50, 15, "maillots", "€", fs=36, ecart=1.0))
        self.cadrer(u, gauche=-6.3, droite=0.8, haut=1.1, bas=-2.9)
        nb_libre(u.lignes[0])
        self.add(u.lignes[0])
        self.au_mot("1 :")
        self.play(FadeIn(pi.noms[0], scale=1.2), self.allumer_route(pi, 0), run_time=0.45)
        self.au_mot("1 maillot")
        self.play(FadeIn(u.lignes[1][0], scale=1.2), Create(u.fl_q[0][0]), run_time=0.4)
        l1 = self.lc([("50 ÷", WHITE), ("10", AMBRE), ("=", WHITE), ("5 €", VERT_OK)], 0.45)
        self.au_mot("50 divisé")
        self.play(FadeIn(l1[0], shift=RIGHT * 0.2), Indicate(u.lignes[0][2], color=AMBRE), run_time=0.35)
        self.au_mot("par 10")
        self.play(FadeIn(l1[1], scale=1.3), FadeIn(l1[2]), FadeIn(u.fl_q[0][1], scale=1.3), Create(u.fl_v[0][0]),
                  FadeIn(u.fl_v[0][1], scale=1.3), run_time=0.4)
        self.au_mot("égale 5")
        self.play(FadeIn(l1[3], scale=1.3), GrowArrow(u.lignes[1][1]), FadeIn(u.lignes[1][2], scale=1.3),
                  *pi.avancer(0, 0.5), run_time=0.6)
        self.insister(u.lignes[1][2], 1.25, 0.2)
        self.au_mot("15 maillots")
        self.play(FadeIn(u.lignes[2][0], scale=1.2), Create(u.fl_q[1][0]), FadeIn(u.fl_q[1][1], scale=1.3),
                  run_time=0.45)
        l2 = self.lc([("15 ×", WHITE), ("5", AMBRE), ("=", WHITE), ("75 €", VERT_OK)], -0.55)
        self.au_mot("15 fois")
        self.play(FadeIn(l2[0], shift=RIGHT * 0.2), Create(u.fl_v[1][0]), FadeIn(u.fl_v[1][1], scale=1.3),
                  run_time=0.4)
        self.au_mot("5, égale")
        self.play(FadeIn(l2[1], scale=1.3), FadeIn(l2[2]), run_time=0.3)
        self.au_mot("75 €")
        self.play(FadeIn(l2[3], scale=1.3), GrowArrow(u.lignes[2][1]), FadeIn(u.lignes[2][2], scale=1.3),
                  *pi.avancer(0, 1.0), pi.arriver("75 €"), run_time=0.7)
        self.insister(VGroup(pi.boite, pi.arrivee), 1.15, 0.25)
        self.attendre_voix()

    # ── 04 : chemin 2, les colonnes (moitié, puis 10 + 5) ───────────────────
    def ecran_chemin2(self):
        self.ecran("04-chemin2")
        pi = Pistes(arrivee="75 €", finis=(0,), noms=(0,))
        self.add(pi)
        tb = TableauProp(["Maillots", "Prix (€)"], [[10, 5, 15], [50, 25, 75]], montrer=False, largeur_case=1.4,
                         largeur_libelle=2.6, fs=38, centre=P(-2.75, -0.85))
        self.add(tb.fond, *nb_libre(tb.valeur(0, 0), tb.valeur(1, 0)))
        self.au_mot("2 :")
        self.play(FadeIn(pi.noms[1], scale=1.2), self.allumer_route(pi, 1), run_time=0.45)
        self.au_mot("5 maillots")
        self.play(FadeIn(tb.valeur(0, 1), scale=1.4), FadeIn(tb.trou(1, 1), scale=1.3), tb.allumer(0, 1),
                  run_time=0.4)
        h = self.muet(tb.fleche_col(0, 1, "÷ 2", ligne=0))
        self.au_mot("moitié")
        self.play(tb.allumer(0, 0), Create(h.fleche), FadeIn(h.etiquette, scale=1.3), run_time=0.45)
        l1 = self.lc([("Moitié de 10", WHITE), ("→", WHITE), ("25 €", VERT_OK)], 0.55)
        b = self.muet(tb.fleche_col(0, 1, "÷ 2", ligne=1))
        self.au_mot("de 10")
        self.play(FadeIn(l1[0], shift=RIGHT * 0.2), Indicate(tb.textes[0][0], color=AMBRE), run_time=0.35)
        self.au_mot("25 €")
        self.play(tb.eteindre(0, 0), tb.eteindre(0, 1), Create(b.fleche), FadeIn(b.etiquette, scale=1.3),
                  FadeIn(l1[1]), FadeIn(l1[2], scale=1.3), tb.remplir(1, 1, 25), *pi.avancer(1, 0.5), run_time=0.6)
        self.play(tb.allumer(1, 1), run_time=0.25)
        l2 = self.lc([("15 =", WHITE), ("10 +", WHITE), ("5", WHITE)], -0.4)
        self.au_mot("Et 15")
        self.play(FadeOut(VGroup(h, b)), tb.eteindre(1, 1), FadeIn(tb.valeur(0, 2), scale=1.4),
                  FadeIn(tb.trou(1, 2), scale=1.3), tb.allumer(0, 2), FadeIn(l2[0], shift=RIGHT * 0.2), run_time=0.45)
        hp = tb.plus(0, 1)
        self.au_mot("10 plus")
        self.play(FadeIn(l2[1], shift=RIGHT * 0.2), tb.allumer(0, 0), FadeIn(hp, scale=1.5), run_time=0.35)
        self.au_mot("5 : 50")
        self.play(FadeIn(l2[2], shift=RIGHT * 0.2), tb.allumer(0, 1), run_time=0.3)
        l3 = self.lc([("50 +", WHITE), ("25 =", WHITE), ("75 €", VERT_OK)], -1.3)
        bp = plus_bas(tb, 0, 1)
        self.au_mot("50 plus")
        self.play(*[tb.eteindre(0, c) for c in range(3)], tb.allumer(1, 0), FadeIn(bp, scale=1.5),
                  FadeIn(l3[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("25, égale")
        self.play(tb.allumer(1, 1), FadeIn(l3[1], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("75 €")
        self.play(FadeIn(l3[2], scale=1.3), tb.remplir(1, 2, 75), tb.eteindre(1, 0), tb.eteindre(1, 1),
                  *pi.avancer(1, 1.0), run_time=0.6)
        self.play(tb.allumer(1, 2), Indicate(VGroup(pi.boite, pi.arrivee), color=VERT_OK, scale_factor=1.2),
                  run_time=0.6)
        self.attendre_voix()

    # ── 05 : chemin 3, le coefficient ; la même arrivée ─────────────────────
    def ecran_chemin3(self):
        self.ecran("05-chemin3")
        pi = Pistes(arrivee="75 €", finis=(0, 1), noms=(0, 1))
        self.add(pi)
        tb = TableauProp(["Maillots", "Prix (€)"], [[10, 15], [50, 75]], montrer=False, largeur_case=1.4,
                         largeur_libelle=2.5, fs=38, centre=P(-3.7, -0.8))
        self.add(tb.fond, *nb_libre(tb.valeur(0, 0), tb.valeur(1, 0)))
        lat = tb.fleche_lat("× 5")
        self.au_mot("3 :")
        self.play(FadeIn(pi.noms[2], scale=1.2), self.allumer_route(pi, 2), run_time=0.45)
        l1 = self.lc([("Prix =", WHITE), ("5 ×", AMBRE), ("maillots", WHITE)], 0.55, xl=1.5)
        self.au_mot("Le prix")
        self.play(FadeIn(l1[0], shift=RIGHT * 0.2), Indicate(tb.libelles[1], color=AMBRE), run_time=0.4)
        self.au_mot("5 fois")
        self.play(FadeIn(l1[1], scale=1.3), Create(lat.fleche), FadeIn(lat.etiquette, scale=1.3), run_time=0.45)
        self.insister(lat.etiquette, 1.3, 0.2)
        self.au_mot("nombre de maillots")
        self.play(FadeIn(l1[2], shift=RIGHT * 0.2), Indicate(tb.libelles[0], color=AMBRE), run_time=0.4)
        l2 = self.lc([("15 ×", WHITE), ("5", AMBRE), ("=", WHITE), ("75 €", VERT_OK)], -0.4, xl=1.5)
        self.au_mot("15 fois")
        self.play(FadeIn(tb.valeur(0, 1), scale=1.4), FadeIn(tb.trou(1, 1), scale=1.3), tb.allumer(0, 1),
                  FadeIn(l2[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("5, égale")
        self.play(FadeIn(l2[1], scale=1.3), FadeIn(l2[2]), Indicate(lat.etiquette, color=AMBRE), run_time=0.35)
        self.au_mot("75 €")
        self.play(FadeIn(l2[3], scale=1.3), tb.remplir(1, 1, 75), tb.eteindre(0, 1), *pi.avancer(2, 1.0),
                  run_time=0.6)
        self.play(tb.allumer(1, 1), run_time=0.25)
        self.au_mot("Trois chemins")
        self.play(LaggedStart(*[Indicate(VGroup(pi.routes[i], pi.noms[i]), color=COULEURS_CH[i], scale_factor=1.06)
                                for i in range(3)], lag_ratio=0.25),
                  *[pi.balles[i].animate.move_to(P(3.68, pi.ys[i])) for i in range(3)],
                  run_time=1.0)
        self.au_mot("75 €", 2)
        self.play(Circumscribe(VGroup(pi.boite, pi.arrivee), color=VERT_OK, buff=0.08), run_time=0.6)
        self.insister(VGroup(pi.boite, pi.arrivee), 1.2, 0.25)
        self.attendre_voix()

    # ── 06 : QUESTION 1 (4 ballons 36 € ; 6 ballons ?) — par l'unité ────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        quatre = VGroup(*[ballon(0.4) for _ in range(4)]).arrange(RIGHT, buff=0.25)
        deco = VGroup(maelle(0.9).move_to(P(-5.6, -1.0)), quatre.move_to(P(-2.4, 0.6)))
        self.add(deco)
        u = ss(self.cadrer(Unite(4, 36, 6, "ballons", "€", fs=36), gauche=-6.3, droite=0.55, haut=2.0, bas=-1.8))
        nb_libre(u.lignes[0])

        def apres(sc):
            l0 = sc.ligne_rep(0, ["1 ballon :", "36 ÷", "4 =", "9 €."])
            l1 = sc.ligne_rep(1, ["6 ballons :", "6 ×", "9 =", "54 €."])
            sc.au_mot("1 ballon")
            sc.play(FadeOut(deco), FadeIn(u.lignes[0]), FadeIn(l0[0], shift=UP * 0.15),
                    FadeIn(u.lignes[1][0], scale=1.2), Create(u.fl_q[0][0]), run_time=0.4)
            sc.au_mot("36 divisé")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), Indicate(u.lignes[0][2], color=AMBRE), run_time=0.3)
            sc.au_mot("par 4")
            sc.play(FadeIn(l0[2], shift=UP * 0.15), FadeIn(u.fl_q[0][1], scale=1.3), Create(u.fl_v[0][0]),
                    FadeIn(u.fl_v[0][1], scale=1.3), run_time=0.35)
            sc.au_mot("9 €")
            sc.play(FadeIn(l0[3], scale=1.3), GrowArrow(u.lignes[1][1]), FadeIn(u.lignes[1][2], scale=1.3),
                    run_time=0.35)
            sc.au_mot("6 ballons")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), FadeIn(u.lignes[2][0], scale=1.2), Create(u.fl_q[1][0]),
                    FadeIn(u.fl_q[1][1], scale=1.3), run_time=0.35)
            sc.au_mot("6 fois")
            sc.play(FadeIn(l1[1], shift=UP * 0.15), Create(u.fl_v[1][0]), FadeIn(u.fl_v[1][1], scale=1.3),
                    run_time=0.3)
            sc.au_mot("9, égale")
            sc.play(FadeIn(l1[2], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("54 €")
            sc.play(FadeIn(l1[3], scale=1.3), GrowArrow(u.lignes[2][1]), FadeIn(u.lignes[2][2], scale=1.3),
                    run_time=0.4)
            sc.rep_fini()

        self.question_pause("06-question", "06b-reponse", ["4 ballons coûtent 36 €.", "Combien coûtent 6 ballons ?"],
                            [self.t("38 €", 34), self.t("54 €", 34), self.t("216 €", 34)], 1,
                            ["1 ballon : 36 ÷ 4 = 9 €.", "6 ballons : 6 × 9 = 54 €."], mot_q="4 ballons",
                            autres_r=apres)

    # ── 07 : le piège du logo (20 € une fois + 5 € par maillot) ─────────────
    def bloc_prix(self, e, couleur, mot, u=0.15):
        r = Rectangle(width=e * u, height=0.6, fill_color=couleur, fill_opacity=1, stroke_color=BLACK, stroke_width=3)
        t = Text(mot, font_size=22, color=BLACK, weight=BOLD).move_to(r)
        return VGroup(r, t)

    def ecran_piege(self):
        self.ecran("07-piege")
        tit = self.t("Attention au piège !", 44, ROUGE_ERREUR).move_to(P(-0.4, 3.1))
        self.au_mot("Attention")
        self.play(Write(tit), run_time=0.5)
        regle = self.t("Avant de calculer, vérifie que c'est proportionnel.", 32).move_to(P(-0.4, 2.3))
        self.au_mot("Avant de calculer")
        self.play(FadeIn(regle, shift=UP * 0.15), run_time=0.5)
        m = maillot(s=0.75, logo=True).move_to(P(-5.7, 2.95))
        self.au_mot("logo du club")
        self.play(FadeIn(m, scale=0.6), run_time=0.4)
        self.play(Indicate(m[-1], color="#facc15", scale_factor=2.0), run_time=0.5)
        x0, y1, y2 = -4.6, 1.0, -0.6
        g1 = self.bloc_prix(20, "#cbd5e1", "20 €").move_to(P(x0, y1), aligned_edge=LEFT)
        self.au_mot("20 €")
        self.play(GrowFromEdge(g1, LEFT), run_time=0.4)
        cap1 = self.t("une seule fois", 26, "#cbd5e1").next_to(g1, DOWN, buff=0.12)
        self.au_mot("une seule fois")
        self.play(FadeIn(cap1), run_time=0.3)
        b1 = self.bloc_prix(5, "#38bdf8", "5 €").next_to(g1, RIGHT, buff=0)
        self.au_mot("5 € par")
        self.play(FadeIn(b1, shift=RIGHT * 0.2), run_time=0.35)
        cap2 = self.t("par maillot", 26, "#38bdf8").next_to(b1, UP, buff=0.12)
        self.au_mot("par maillot")
        self.play(FadeIn(cap2), run_time=0.3)
        tb = TableauProp(["Maillots", "Prix (€)"], [[1, 2], [25, 30]], montrer=False, largeur_case=1.15,
                         largeur_libelle=1.9, fs=36, centre=P(4.1, 0.25))
        n1 = self.t("1 maillot", 28).next_to(g1, LEFT, buff=0.2)
        tot1 = self.t("= 25 €", 32, AMBRE).next_to(b1, RIGHT, buff=0.2)
        self.au_mot("1 maillot")
        self.play(FadeIn(n1), FadeIn(tb.fond), FadeIn(tb.valeur(0, 0), scale=1.4), run_time=0.4)
        self.au_mot("25 €")
        self.play(FadeIn(tot1, scale=1.3), FadeIn(tb.valeur(1, 0), scale=1.4), run_time=0.4)
        r2 = VGroup(g1.copy(), b1.copy(), self.bloc_prix(5, "#38bdf8", "5 €")).arrange(RIGHT, buff=0)
        nb_libre(r2)
        r2.move_to(P(x0, y2), aligned_edge=LEFT)
        n2 = self.t("2 maillots", 28).next_to(r2, LEFT, buff=0.2).align_to(n1, RIGHT)
        tot2 = self.t("= 30 €", 32, AMBRE).next_to(r2, RIGHT, buff=0.2)
        h = self.muet(tb.fleche_col(0, 1, "× 2", ligne=0))
        self.au_mot("2 maillots")
        self.play(FadeIn(n2), FadeIn(r2[:2], shift=DOWN * 0.3), FadeIn(tb.valeur(0, 1), scale=1.4),
                  Create(h.fleche), FadeIn(h.etiquette, scale=1.3), run_time=0.45)
        self.play(FadeIn(r2[2], shift=RIGHT * 0.3), run_time=0.3)
        self.au_mot("30 €")
        self.play(FadeIn(tot2, scale=1.3), FadeIn(tb.valeur(1, 1), scale=1.4), run_time=0.4)
        b = self.muet(tb.fleche_col(0, 1, "pas × 2", ligne=1, couleur=ROUGE_ERREUR))
        v = self.tampon("Pas proportionnel !", ROUGE_ERREUR, 40).move_to(P(-2.3, -2.2))
        self.au_mot("Ce n'est plus")
        self.play(Create(b.fleche), FadeIn(b.etiquette, scale=1.3), FadeIn(v, scale=1.3),
                  Indicate(VGroup(g1, r2[0]), color=AMBRE), run_time=0.6)
        self.insister(v, 1.1, 0.25)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (3 gourdes 12 € ; 9 gourdes ?) — billes 3 × 3 ───────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        trois = VGroup(*[gourde(h=1.1) for _ in range(3)]).arrange(RIGHT, buff=0.35)
        deco = VGroup(maelle(0.9).move_to(P(-5.6, -1.0)), trois.move_to(P(-2.4, 0.6)))
        self.add(deco)
        bi = Billes(3, 3, r=0.2, ecart=0.58, couleur="#22c55e", centre=P(-3.35, 2.15))
        cadres = bi.encadrer("colonnes")
        tb = TableauProp(["Gourdes", "Prix (€)"], [[3, 9], [12, 36]], montrer=False, largeur_case=1.5,
                         largeur_libelle=2.6, fs=38, centre=P(-3.35, -0.95))
        nb_libre(tb.valeur(0, 0), tb.valeur(1, 0))

        def apres(sc):
            l0 = sc.ligne_rep(0, ["9 gourdes =", "3 ×", "3 gourdes."])
            l1 = sc.ligne_rep(1, ["3 ×", "12 =", "36 €."])
            h = tb.fleche_col(0, 1, "× 3", ligne=0)
            b = tb.fleche_col(0, 1, "× 3", ligne=1)
            sc.au_mot("9 gourdes")
            sc.play(FadeOut(deco), FadeIn(tb.fond), FadeIn(tb.textes[0][0]), FadeIn(tb.textes[1][0]),
                    FadeIn(tb.valeur(0, 1), scale=1.4), FadeIn(tb.trou(1, 1)), FadeIn(l0[0], shift=UP * 0.15),
                    LaggedStart(*[FadeIn(x, scale=0.5) for col in bi.billes for x in col], lag_ratio=0.05),
                    run_time=0.6)
            sc.au_mot("3 fois")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), Create(h.fleche), FadeIn(h.etiquette, scale=1.3),
                    LaggedStart(*[Create(c) for c in cadres], lag_ratio=0.3), run_time=0.6)
            sc.au_mot("3 gourdes")
            sc.play(FadeIn(l0[2], shift=UP * 0.15), tb.allumer(0, 0), Indicate(bi.colonnes[0], color=AMBRE),
                    run_time=0.4)
            sc.au_mot("3 fois 12")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), tb.eteindre(0, 0), Create(b.fleche),
                    FadeIn(b.etiquette, scale=1.3), run_time=0.35)
            sc.au_mot("12, égale")
            sc.play(FadeIn(l1[1], shift=UP * 0.15), tb.allumer(1, 0), run_time=0.3)
            sc.au_mot("36 €")
            sc.play(FadeIn(l1[2], scale=1.3), tb.remplir(1, 1, 36), tb.eteindre(1, 0), run_time=0.4)
            sc.play(tb.allumer(1, 1), run_time=0.25)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse", ["3 gourdes coûtent 12 €.", "Combien coûtent 9 gourdes ?"],
                            [self.t("36 €", 34), self.t("18 €", 34), self.t("21 €", 34)], 0,
                            ["9 gourdes = 3 × 3 gourdes.", "3 × 12 = 36 €."], mot_q="3 gourdes", autres_r=apres)

    # ── 09 : défi : les chaussettes ─────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.play(Write(tit), run_time=0.6)
        six = VGroup(*[paire(0.9) for _ in range(6)]).arrange_in_grid(2, 3, buff=(0.45, 0.3)).move_to(P(-3.6, 1.15))
        l1 = self.lc([("6 paires", WHITE), ("=", WHITE), ("18 €", VERT_OK)], 1.75)
        self.au_mot("6 paires")
        self.play(LaggedStart(*[FadeIn(p, shift=DOWN * 0.2) for p in six], lag_ratio=0.1),
                  FadeIn(l1[0], shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("18 €")
        self.play(FadeIn(l1[1]), FadeIn(l1[2], scale=1.3), run_time=0.35)
        l2 = self.lc([("10 paires", WHITE), ("→", WHITE), ("? €", ORANGE_RETENUE)], 0.75)
        l2[2]._pas_audit = l2[2].sans_synchro = True
        self.au_mot("10 paires")
        self.play(FadeIn(l2[0], shift=RIGHT * 0.2), FadeIn(l2[1]), FadeIn(l2[2], scale=1.4), run_time=0.4)
        self.insister(l2[2], 1.25, 0.2)
        pi = Pistes(depart=("6 paires", "18 €"), noms=(0, 1, 2)).scale(0.72).move_to(P(-1.4, -1.65))
        self.au_mot("Choisis ton chemin")
        self.play(FadeIn(pi, shift=UP * 0.2), run_time=0.5)
        self.play(LaggedStart(*[Indicate(VGroup(pi.routes[i], pi.noms[i]), color=COULEURS_CH[i]) for i in range(3)],
                              lag_ratio=0.3), run_time=0.6)
        self.pause_defi(y=-0.2)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.au_mot("Correction")
        self.play(Write(tit), run_time=0.5)
        u = ss(Unite(6, 18, 10, "paires", "€", fs=38, ecart=1.05))
        self.cadrer(u, gauche=-6.3, droite=0.8, haut=1.6, bas=-2.6)
        nb_libre(u.lignes[0])
        chem = self.t("Par l'unité", 36, C1).move_to(P(-2.75, 2.25))
        self.au_mot("Par l'unité")
        self.play(FadeIn(chem, shift=DOWN * 0.15), FadeIn(u.lignes[0]), run_time=0.45)
        self.au_mot("1 paire")
        self.play(FadeIn(u.lignes[1][0], scale=1.2), Create(u.fl_q[0][0]), run_time=0.4)
        l1 = self.lc([("18 ÷", WHITE), ("6", AMBRE), ("=", WHITE), ("3 €", VERT_OK)], 0.75)
        self.au_mot("18 divisé")
        self.play(FadeIn(l1[0], shift=RIGHT * 0.2), Indicate(u.lignes[0][2], color=AMBRE), run_time=0.35)
        self.au_mot("par 6")
        self.play(FadeIn(l1[1], scale=1.3), FadeIn(l1[2]), FadeIn(u.fl_q[0][1], scale=1.3), Create(u.fl_v[0][0]),
                  FadeIn(u.fl_v[0][1], scale=1.3), run_time=0.4)
        self.au_mot("égale 3")
        self.play(FadeIn(l1[3], scale=1.3), GrowArrow(u.lignes[1][1]), FadeIn(u.lignes[1][2], scale=1.3),
                  run_time=0.45)
        self.au_mot("10 paires")
        self.play(FadeIn(u.lignes[2][0], scale=1.2), Create(u.fl_q[1][0]), FadeIn(u.fl_q[1][1], scale=1.3),
                  run_time=0.45)
        l2 = self.lc([("10 ×", WHITE), ("3", AMBRE), ("=", WHITE), ("30 €", VERT_OK)], -0.35)
        self.au_mot("10 fois")
        self.play(FadeIn(l2[0], shift=RIGHT * 0.2), Create(u.fl_v[1][0]), FadeIn(u.fl_v[1][1], scale=1.3),
                  run_time=0.4)
        self.au_mot("3, égale")
        self.play(FadeIn(l2[1], scale=1.3), FadeIn(l2[2]), run_time=0.3)
        self.au_mot("30 €")
        self.play(FadeIn(l2[3], scale=1.3), GrowArrow(u.lignes[2][1]), FadeIn(u.lignes[2][2], scale=1.3),
                  run_time=0.45)
        cadre = self.encadrer(l2[3], buff=0.08)
        self.play(Create(cadre), run_time=0.4)
        self.insister(VGroup(l2[3], cadre), 1.15, 0.2)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        fig = Pistes(arrivee="75 €", finis=(0, 1, 2), noms=(0, 1, 2), y0=1.6)
        nb_libre(fig)
        self.add(fig)
        self.play(Write(tit), run_time=0.7)
        lignes = VGroup()
        for morceaux in (["D'abord, on vérifie que la situation", "est proportionnelle."],
                         ["Puis on choisit son chemin :", "l'unité, les colonnes, ou le coefficient."],
                         ["Tous mènent à la même réponse."]):
            bloc = VGroup(*[self.t(x, 34) for x in morceaux]).arrange(DOWN, aligned_edge=LEFT, buff=0.1)
            lignes.add(VGroup(self.coche(), bloc).arrange(RIGHT, buff=0.25))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.38).align_to(P(-5.9, 0), LEFT).align_to(P(0, 0.55), UP)
        self.au_mot("D'abord")
        self.montrer_ligne(lignes[0])
        self.au_mot("Puis on")
        self.montrer_ligne(lignes[1], LaggedStart(*[Indicate(VGroup(fig.routes[i], fig.noms[i]),
                                                             color=COULEURS_CH[i]) for i in range(3)],
                                                  lag_ratio=0.3))
        self.au_mot("Tous mènent")
        self.montrer_ligne(lignes[2], Indicate(VGroup(fig.boite, fig.arrivee), color=VERT_OK, scale_factor=1.2))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_verifier()
        self.ecran_chemin1()
        self.ecran_chemin2()
        self.ecran_chemin3()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class PropResoudre6e(PropResoudreBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
