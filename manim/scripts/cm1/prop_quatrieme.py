# prop_quatrieme.py
# EleveAI — Maths CM2 — série « Proportionnalité » CM, lot CM-B, épisode 06 :
# LA QUATRIÈME PROPORTIONNELLE (micro du coach : prop_quatrieme), épisode CM2
# SEUL, AVEC VOIX. Paysage 16:9, CEINTURE VERTE (la paysage complète du niveau :
# situation, méthode, piège, 2 questions-pauses, défi corrigé). Short jumeau :
# prop_quatrieme_short.py (blanche, le guépard).
# ⭐ Méthode travaillée : le PASSAGE PAR L'UNITÉ dans le TABLEAU du coach : une
# colonne « 1 » s'ouvre au milieu (3 → 1 → 5), flèches de colonne « ÷ 3 » puis
# « × 5 » en haut ET en bas. ⛔ JAMAIS de produit en croix ; « × » et « ÷ »
# écrits, la voix dit « fois » et « divisé par ».
# ⭐ Leurres (consigne-videos-proportionnalite.md) : 1. ajouter / enlever au
# lieu de multiplier / diviser (question 1 : 16 = 20 − 4 ; question 2 : 11 =
# 6 + 5 ; piège : 14 = 12 + 2) ; 3. le mauvais calcul (question 1 : 80 = 20 × 4 ;
# question 2 : 42 = 6 × 7, sans passer par 1).
#
# Décor et métier : MÉTÉO, Yanis, MÉTÉOROLOGUE (pluviomètre : pluie constante,
# 3 h = 12 mm → 1 h = 4 mm → 5 h = 20 mm) ; une autre averse (question 1 :
# 20 mm en 4 h → 5 mm) ; la neige (question 2 : 6 cm en 2 h → 21 cm en 7 h) ;
# défi : un satellite météo (15 photos en 5 min → 24 en 8 min).
# Nombres inventés, à l'ordre de grandeur réel (une forte pluie : 4 mm/h ; une
# chute de neige soutenue : 3 cm/h) : aucun chiffre du monde réel n'est cité,
# pas de source à donner. Centres d'intérêt : meteo-climat.
#
# Micro → écrans : situation (01), le tableau et la case vide (02), ni double
# ni moitié (03), passer par 1 : ÷ 3 (04), puis × 5 (05), QUESTION 1 (06, la
# valeur pour 1), piège + 2 (07), QUESTION 2 (08, les deux étapes), défi (09)
# et correction (09b), ce que tu as appris (10), fin (11).
#
# Voix : manim/voix/cm2-prop-quatrieme.json (validée par Frédéric le 01/11,
# débit −10), WAV dans public/sons/cm2-prop-quatrieme/ ; marques mot à mot :
# manim/scripts/cm1/prop_quatrieme_marques.json (scripts/marques_dump.ps1 puis
# cues2marques ; « 1 heure. 1 heure » de 04-unite : le second « 1 heure »
# (2,786 s) ajouté, cues2marques jetait le mot répété).
# Outils : ../6e/prop_commun.py + manim/canvas_proportion.py (TableauProp), non
# modifiés. Ajouté ICI : yanis(), nuage(), pluie(), pluviometre(), flocon(),
# satellite(), terre(), ligne_rep() bornée et _disposer_q() (comme
# cm1/prop_tableau.py), table(), ouvrir_unite() (le tableau 2 colonnes devient
# 3 colonnes), calc_tb().
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/prop_quatrieme.py PropQuatriemeCM2
# python -m manim render -qh --disable_caching manim/scripts/cm1/prop_quatrieme.py PropQuatriemeCM2 -o eleveai-maths-cm2-prop-quatrieme --media_dir manim/scripts/cm1/media-prop-quatrieme
# Sortie : manim/sorties/cm2/maths/proportionnalite/06-quatrieme/eleveai-maths-cm2-prop-quatrieme.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))  # cm1 DEVANT : jamais un prop_* 6e homonyme

from prop_commun import *  # noqa: E402,F403

EAU = "#38bdf8"
NUAGE = "#cbd5e1"
NEIGE = "#e0f2fe"


def pas_audit(m):
    """Décor sans synchro ni audit (toute la famille de m)."""
    for f in m.get_family():
        f._pas_audit = True
        f.sans_synchro = True
    return m


def yanis(s=1.0):
    """Yanis, météorologue : veste vert d'eau, badge, tablette à la main."""
    p = personne(peau="#a0663a", tenue="#0f766e", cheveux="#111827", s=s)
    c = p.corps.get_center()
    badge = RoundedRectangle(width=0.22 * s, height=0.14 * s, corner_radius=0.03, fill_color=WHITE, fill_opacity=1,
                             stroke_width=0).move_to(c + P(-0.18 * s, 0.3 * s))
    tab = RoundedRectangle(width=0.42 * s, height=0.32 * s, corner_radius=0.04, fill_color="#1e293b", fill_opacity=1,
                           stroke_color=WHITE, stroke_width=2).move_to(c + P(0.38 * s, -0.05 * s))
    ecran = VGroup(*[Line(tab.get_left() + P(0.07 * s, y * s), tab.get_right() + P(-0.07 * s, y * s),
                          color=EAU, stroke_width=2) for y in (0.06, -0.02, -0.09)])
    p.add(badge, tab, ecran)
    return p


def nuage(s=1.0, couleur=NUAGE):
    bulles = [(-0.55, 0, 0.38), (0, 0.18, 0.5), (0.55, 0, 0.4), (0.25, -0.12, 0.35), (-0.25, -0.12, 0.35)]
    return VGroup(*[Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(x, y))
                    for x, y, r in bulles]).scale(s)


def pluie(n=7, largeur=1.6, haut=0.0, bas=-1.1):
    """Des gouttes (petits traits bleus) sous un nuage."""
    g = VGroup()
    for k in range(n):
        x = -largeur / 2 + k * largeur / (n - 1)
        y = haut - (0.35 * (k % 3))
        g.add(Line(P(x, y), P(x - 0.06, y - 0.25), color=EAU, stroke_width=4))
    return g


def pluviometre(h=2.2, niveau=0.0):
    """Un pluviomètre : entonnoir, tube transparent gradué (sans nombre), piquet.
    .eau (rectangle bleu, hauteur = niveau × hauteur du tube) · .tube."""
    tube = RoundedRectangle(width=0.5, height=h, corner_radius=0.06, fill_color="#f8fafc", fill_opacity=0.18,
                            stroke_color=WHITE, stroke_width=3)
    ent = Polygon(P(-0.45, h / 2 + 0.35), P(0.45, h / 2 + 0.35), P(0.25, h / 2), P(-0.25, h / 2),
                  fill_color="#94a3b8", fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    grad = VGroup(*[Line(P(-0.25, -h / 2 + k * h / 10), P(-0.25 + (0.18 if k % 5 == 0 else 0.1), -h / 2 + k * h / 10),
                         color=WHITE, stroke_width=2) for k in range(1, 10)])
    piquet = Rectangle(width=0.1, height=0.6, fill_color="#78350f", fill_opacity=1, stroke_width=0).move_to(
        P(0, -h / 2 - 0.3))
    eau = Rectangle(width=0.42, height=max(0.001, niveau * h), fill_color=EAU, fill_opacity=0.9, stroke_width=0)
    eau.move_to(P(0, -h / 2 + eau.height / 2 + 0.02))
    g = VGroup(piquet, tube, eau, grad, ent)
    g.eau, g.tube, g.h = eau, tube, h
    return g


def remplir_pluvio(pv, niveau):
    """Animation : l'eau du pluviomètre monte jusqu'à `niveau` (0 → 1)."""
    bas = pv.tube.get_bottom()[1] + 0.02
    cible = Rectangle(width=0.42, height=max(0.001, niveau * pv.h), fill_color=EAU, fill_opacity=0.9,
                      stroke_width=0)
    cible.move_to(P(pv.tube.get_x(), bas + cible.height / 2))
    return Transform(pv.eau, cible)


def flocon(r=0.14, couleur=NEIGE):
    return VGroup(*[Line(P(-r, 0), P(r, 0), color=couleur, stroke_width=3).rotate(a) for a in (0, PI / 3, 2 * PI / 3)])


def satellite(s=1.0):
    """Un satellite : corps doré, deux panneaux solaires bleus, antenne."""
    corps = RoundedRectangle(width=0.5, height=0.4, corner_radius=0.05, fill_color="#fbbf24", fill_opacity=1,
                             stroke_color=WHITE, stroke_width=2)
    pans = VGroup()
    for sgn in (-1, 1):
        pan = Rectangle(width=0.8, height=0.32, fill_color="#1d4ed8", fill_opacity=1, stroke_color=WHITE,
                        stroke_width=2).move_to(P(sgn * 0.75, 0))
        lig = VGroup(*[Line(pan.get_top() + P(x, 0), pan.get_bottom() + P(x, 0), color="#93c5fd", stroke_width=1.5)
                       for x in (-0.2, 0, 0.2)])
        bras = Line(P(sgn * 0.25, 0), P(sgn * 0.35, 0), color=WHITE, stroke_width=3)
        pans.add(VGroup(bras, pan, lig))
    ant = VGroup(Line(P(0, -0.2), P(0, -0.42), color=WHITE, stroke_width=3),
                 Arc(radius=0.14, start_angle=PI + 0.4, angle=PI - 0.8, color=WHITE, stroke_width=3).move_to(P(0, -0.47)))
    return VGroup(pans, corps, ant).scale(s)


def terre(r=1.0):
    mer = Circle(radius=r, fill_color="#2563eb", fill_opacity=1, stroke_color="#93c5fd", stroke_width=3)
    terres = VGroup(Ellipse(width=r * 0.8, height=r * 0.55, fill_color="#16a34a", fill_opacity=1, stroke_width=0)
                    .rotate(0.5).move_to(P(-0.3 * r, 0.3 * r)),
                    Ellipse(width=r * 0.5, height=r * 0.7, fill_color="#16a34a", fill_opacity=1, stroke_width=0)
                    .move_to(P(0.35 * r, -0.3 * r)),
                    Ellipse(width=r * 0.9, height=r * 0.2, fill_color=WHITE, fill_opacity=0.7, stroke_width=0)
                    .move_to(P(0.05 * r, 0.75 * r)))
    return VGroup(mer, terres)


class PropQuatriemeBase(PaysageProp):
    nom_voix = "cm2-prop-quatrieme"
    fichier_marques = "prop_quatrieme_marques.json"
    identite = "Maths CM2 — EleveAI"
    ceinture = "verte"
    LIBS = ["Durée (h)", "Pluie (mm)"]
    V2 = [[3, 5], [12, 20]]
    V3 = [[3, 1, 5], [12, 4, 20]]
    X0 = -1.0   # le centre des tableaux
    Y0 = 1.0

    def garde(self, *a, **k):
        """L'identité (« CM2 » porte un 2) et l'échelle sont du décor."""
        titre, ident, ech = super().garde(*a, **k)
        pas_audit(ident)
        pas_audit(ech)
        return titre, ident, ech

    def ligne_rep(self, i, morceaux, fs=None):
        """Celle de prop_commun, à la taille de la ligne remplacée et bornée à
        droite (BORD_X), comme cm1/prop_tableau.py."""
        lg = super().ligne_rep(i, morceaux, fs)
        ref = self.ph_q[i]
        lg.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
        g = lg.get_left()[0]
        if lg.get_right()[0] > self.BORD_X - 0.05:
            lg.scale_to_fit_width(self.BORD_X - 0.05 - g).align_to(P(g, 0), LEFT)
        return lg

    def _disposer_q(self, question, choix, phrase):
        """CM : la phrase de réponse en 34, sous les cartes (cm1/prop_tableau.py)."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        ph2 = self.col(self.bloc(phrase, 34, VERT_OK), cartes.get_bottom()[1] - 0.3)
        ph2.align_to(P(0, cartes.get_bottom()[1] - 0.2), UP)
        self.ph_q = ph2
        pas_audit(rebours)  # le compte à rebours « 5 » : pas le 5 de la voix
        return tete, q, cartes, pause, rebours, ph2

    def table(self, vals, libs=None, connues=(), trous=(), centre=None, larg=1.7, lib=2.6, fs=42, h=0.9):
        """Un tableau du coach : `connues` portent leur valeur (données déjà
        dites, posées d'un bloc, sans audit), `trous` leur « ? ».
        Renvoie (tb, ce qui est déjà à l'écran : à self.add)."""
        tb = TableauProp(libs or self.LIBS, vals, montrer=False, largeur_case=larg, largeur_libelle=lib, hauteur=h,
                         fs=fs, centre=centre if centre is not None else P(self.X0, self.Y0))
        deja = VGroup(tb.fond)
        for rc in connues:
            deja.add(pas_audit(tb.valeur(*rc)))
        for rc in trous:
            deja.add(tb.trou(*rc))
        return tb, deja

    def ligne_c(self, morceaux, y, fs=46, x=None):
        """Une ligne de calcul centrée sous le tableau (non jouée)."""
        return self.ligne(morceaux, fs).move_to(P(self.X0 if x is None else x, y))

    def calc_tb(self, tb, r, c, v, morceaux, mots, y, fs=46, x=None, avec=None):
        """Une ligne « 12 ÷ 3 = 4 mm » morceau par morceau, chaque morceau à SON
        mot (mots[k], None = avec le précédent) ; le dernier remplit (r, c) avec
        v ; avec[k] : des animations jouées avec le morceau k."""
        lg = self.ligne_c(morceaux, y, fs, x)
        avec = avec or {}
        lots = []
        for k, (m, mot) in enumerate(zip(lg, mots)):
            if mot or not lots:
                lots.append((mot, [k]))
            else:
                lots[-1][1].append(k)
        for mot, ks in lots:
            if mot:
                self.au_mot(mot)
            anims = []
            for k in ks:
                anims.append(FadeIn(lg[k], scale=1.3) if k == len(lg) - 1 else FadeIn(lg[k], shift=RIGHT * 0.2))
                anims += list(avec.get(k, []))
                if k == len(lg) - 1:
                    anims.append(tb.remplir(r, c, v))
            self.play(*anims, run_time=0.35)
        self.play(tb.allumer(r, c), run_time=0.25)
        return lg

    def fleches(self, tb, c0, c1, lab, couleur=AMBRE):
        """Les deux flèches de colonne c0 → c1 (en haut ET en bas), même étiquette."""
        return (tb.fleche_col(c0, c1, lab, ligne=0, couleur=couleur),
                tb.fleche_col(c0, c1, lab, ligne=1, couleur=couleur))

    @staticmethod
    def jouer_fl(fl):
        return [Create(fl.fleche), FadeIn(fl.etiquette, scale=1.4)]

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("La quatrième proportionnelle", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("quatrième")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        tb = TableauProp(self.LIBS, [["?"] * 2] * 2, montrer=False, largeur_case=1.4, largeur_libelle=2.6,
                         hauteur=0.8, fs=36, centre=P(1.2, 0.35))
        pv = pluviometre(1.5, 0.45).move_to(P(-3.9, 0.3))
        nu = nuage(0.6).move_to(P(-3.9, 1.65))
        self.au_mot("proportionnelle")
        self.play(FadeIn(tb.fond, shift=UP * 0.2), FadeIn(pv, shift=UP * 0.3), FadeIn(nu), run_time=0.6)
        self.au_mot("Comment")
        trous = [tb.trou(r, c) for r in range(2) for c in range(2)]
        self.play(LaggedStart(*[FadeIn(t, scale=1.4) for t in trous], lag_ratio=0.1), run_time=0.6)
        self.au_mot("qui manque")
        self.play(Indicate(trous[3], color=AMBRE, scale_factor=1.3), run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 01 : Yanis, météorologue, et son pluviomètre ────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = yanis(1.0).move_to(P(-5.4, -0.9))
        self.au_mot("Voici Yanis")
        nom = self.t("Yanis", 42, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("météorologue")
        met = self.t("météorologue", 32, BLEU_CALCUL).next_to(pers, DOWN, buff=0.15)
        met.shift(RIGHT * max(0, -6.45 - met.get_left()[0]))
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        nu = nuage(0.85).move_to(P(-2.3, 2.55))
        pv = pluviometre(2.0, 0.0).move_to(P(-2.3, -0.45))
        self.au_mot("étudie le temps")
        self.play(FadeIn(nu, shift=RIGHT * 0.4), FadeIn(pv, shift=UP * 0.3), run_time=0.6)
        gt = pluie(6, 1.4, 1.95, 1.0).move_to(P(-2.3, 1.55))
        self.au_mot("Ce matin")
        self.play(FadeIn(gt, shift=DOWN * 0.2), run_time=0.4)
        fort = self.t("Toujours aussi fort !", 38, EAU).move_to(P(0, 2.4)).align_to(P(0.4, 0), LEFT)
        self.au_mot("toujours aussi")
        self.play(FadeIn(fort, shift=RIGHT * 0.2), gt.animate.shift(DOWN * 0.25), run_time=0.5)
        self.play(gt.animate.shift(UP * 0.25), run_time=0.3)
        l1 = self.ligne([("3 heures", BLEU_CALCUL), ("→", GREY_B), ("12 mm", VERT_OK)], 46)
        l1.move_to(P(0, 0.9)).align_to(P(0.4, 0), LEFT)
        self.au_mot("3 heures")
        self.play(FadeIn(l1[0], shift=RIGHT * 0.2), FadeIn(l1[1]), remplir_pluvio(pv, 0.4), run_time=0.8)
        self.au_mot("12 millimètres")
        self.play(FadeIn(l1[2], scale=1.3), Indicate(pv.eau, color=VERT_OK), run_time=0.5)
        self.insister(l1[2], 1.2, 0.25, about=l1[2].get_left())
        l2 = self.ligne([("5 heures", BLEU_CALCUL), ("→", GREY_B), ("? mm", ORANGE_RETENUE)], 46)
        l2.move_to(P(0, -0.35)).align_to(P(0.4, 0), LEFT)
        l2[2].sans_synchro = True  # la question de la ligne, pas un nombre
        self.au_mot("5 heures")
        self.play(FadeIn(l2[0], shift=RIGHT * 0.2), FadeIn(l2[1]), FadeIn(l2[2], scale=1.3), run_time=0.5)
        self.insister(l2[2], 1.25, 0.25)
        self.attendre_voix()

    # ── 02 : le tableau, la case vide ───────────────────────────────────────
    def ecran_tableau(self):
        self.ecran("02-tableau")
        tb, _ = self.table(self.V2)
        self.au_mot("tableau")
        self.play(FadeIn(tb.fond, shift=UP * 0.2), run_time=0.5)
        self.au_mot("3 heures")
        self.play(FadeIn(tb.valeur(0, 0), scale=1.4), run_time=0.35)
        self.au_mot("12 millimètres")
        self.play(FadeIn(tb.valeur(1, 0), scale=1.4), run_time=0.35)
        self.au_mot("5 heures")
        self.play(FadeIn(tb.valeur(0, 1), scale=1.4), run_time=0.35)
        self.au_mot("une case vide")
        self.play(FadeIn(tb.trou(1, 1), scale=1.4), run_time=0.35)
        self.play(Indicate(tb.trou(1, 1), color=AMBRE, scale_factor=1.25), run_time=0.6)
        l1 = self.ligne_c([("Le nombre qui manque :", WHITE)], -1.0, fs=42)
        l2 = self.ligne_c([("la quatrième proportionnelle", AMBRE)], -1.8, fs=46)
        self.au_mot("Le nombre")
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.4)
        self.au_mot("la quatrième")
        self.play(FadeIn(l2, scale=1.2), tb.allumer(1, 1), run_time=0.5)
        self.insister(l2, 1.12, 0.3)
        self.attendre_voix()

    # ── 03 : ni le double, ni la moitié ─────────────────────────────────────
    def ecran_bloque(self):
        self.ecran("03-bloque")
        tb, deja = self.table(self.V2, connues=[(0, 0), (1, 0), (0, 1)], trous=[(1, 1)])
        self.add(deja)
        self.au_mot("Mais 5")
        self.play(tb.allumer(0, 1), tb.allumer(0, 0), run_time=0.4)
        d = self.t("le double ?", 40).move_to(P(-3.2, -1.05))
        m = self.t("la moitié ?", 40).move_to(P(1.2, -1.05))
        self.au_mot("double")
        self.play(FadeIn(d, shift=UP * 0.15), run_time=0.3)
        self.play(Create(croix(d, sw=6)), run_time=0.3)
        self.au_mot("moitié")
        self.play(FadeIn(m, shift=UP * 0.15), run_time=0.3)
        self.play(Create(croix(m, sw=6)), run_time=0.3)
        h = tb.fleche_col(0, 1, "× ?", ligne=0, couleur=ORANGE_RETENUE)
        lg = VGroup(self.ligne_c([("Fois plus, fois moins :", WHITE)], -2.0, fs=40),
                    self.ligne_c([("pas directement !", ROUGE_ERREUR)], -2.75, fs=44))
        self.au_mot("Fois plus")
        self.play(Create(h.fleche), FadeIn(h.etiquette, scale=1.3), FadeIn(lg[0], shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("ne marche")
        self.play(FadeIn(lg[1], scale=1.2), Create(croix(h.etiquette, sw=6)), run_time=0.45)
        self.play(tb.eteindre(0, 0), tb.eteindre(0, 1), run_time=0.3)
        self.attendre_voix()

    # ── 04 : on passe par 1 heure (÷ 3) ─────────────────────────────────────
    def ecran_unite(self):
        self.ecran("04-unite")
        t2, deja = self.table(self.V2, connues=[(0, 0), (1, 0), (0, 1)], trous=[(1, 1)])
        self.add(deja)
        tb = TableauProp(self.LIBS, self.V3, montrer=False, largeur_case=1.7, largeur_libelle=2.6, hauteur=0.9, fs=42,
                         centre=P(self.X0, self.Y0))
        self.au_mot("on passe")
        # le tableau s'ouvre : une colonne « 1 » au milieu (3 → 1 → 5)
        self.play(ReplacementTransform(t2.fond, tb.fond),
                  ReplacementTransform(t2.textes[0][0], pas_audit(tb.valeur(0, 0))),
                  ReplacementTransform(t2.textes[1][0], pas_audit(tb.valeur(1, 0))),
                  ReplacementTransform(t2.textes[0][1], pas_audit(tb.valeur(0, 2))),
                  ReplacementTransform(t2.trous[1][1], tb.trou(1, 2)),
                  FadeIn(tb.trou(0, 1), scale=1.3), FadeIn(tb.trou(1, 1), scale=1.3), run_time=0.7)
        self.au_mot("par 1 heure")
        self.play(tb.remplir(0, 1, 1), run_time=0.4)
        self.play(tb.allumer(0, 1), run_time=0.25)
        self.insister(tb.textes[0][1], 1.5, 0.3)
        h, b = self.fleches(tb, 0, 1, "÷ 3")
        self.au_mot("3 fois moins")
        self.play(*self.jouer_fl(h), *self.jouer_fl(b), tb.allumer(0, 0), run_time=0.5)
        self.play(tb.eteindre(0, 0), tb.eteindre(0, 1), tb.allumer(1, 0), run_time=0.3)
        self.calc_tb(tb, 1, 1, 4, [("12 ÷", WHITE), ("3", AMBRE), ("=", WHITE), ("4 mm", VERT_OK)],
                     ["12 divisé", "par 3", None, "4 millimètres"], -1.9)
        self.play(tb.eteindre(1, 0), run_time=0.25)
        self.attendre_voix()

    def etat_unite(self, avec_x5=False):
        """Le tableau à 3 colonnes de la fin de l'écran 04 (ou 05) : à self.add."""
        connues = [(0, 0), (0, 1), (0, 2), (1, 0), (1, 1)] + ([(1, 2)] if avec_x5 else [])
        tb, deja = self.table(self.V3, connues=connues, trous=[] if avec_x5 else [(1, 2)])
        h, b = self.fleches(tb, 0, 1, "÷ 3")
        deja.add(pas_audit(h), pas_audit(b))
        l1 = pas_audit(self.ligne_c([("12 ÷", WHITE), ("3", AMBRE), ("=", WHITE), ("4 mm", VERT_OK)], -1.9))
        deja.add(l1)
        if avec_x5:
            h5, b5 = self.fleches(tb, 1, 2, "× 5")
            deja.add(pas_audit(h5), pas_audit(b5))
        return tb, deja

    # ── 05 : puis 5 heures (× 5) ────────────────────────────────────────────
    def ecran_cinq(self):
        self.ecran("05-cinq")
        tb, deja = self.etat_unite()
        self.add(deja)
        self.au_mot("Puis 5 heures")
        self.play(tb.allumer(0, 2), run_time=0.35)
        h, b = self.fleches(tb, 1, 2, "× 5")
        self.au_mot("5 fois plus")
        self.play(*self.jouer_fl(h), *self.jouer_fl(b), tb.allumer(0, 1), run_time=0.5)
        self.play(tb.eteindre(0, 1), tb.eteindre(0, 2), tb.allumer(1, 1), run_time=0.3)
        self.calc_tb(tb, 1, 2, 20, [("4 ×", WHITE), ("5", AMBRE), ("=", WHITE), ("20 mm", VERT_OK)],
                     ["4 fois", "5, égale", None, "20 millimètres"], -2.8)
        self.play(tb.eteindre(1, 1), run_time=0.25)
        self.au_mot("La case vide")
        cad = SurroundingRectangle(tb.case(1, 2), color=VERT_OK, buff=0.04, corner_radius=0.08, stroke_width=6)
        self.play(Create(cad), run_time=0.4)
        self.au_mot("vaut 20")
        self.insister(VGroup(tb.textes[1][2], cad), 1.25, 0.35)
        self.attendre_voix()

    # ── 06 : QUESTION 1 (20 mm en 4 h ; en 1 h ?) ───────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        tb = TableauProp(self.LIBS, [[4, 1], [20, 5]], montrer=False, largeur_case=1.4, largeur_libelle=2.3,
                         hauteur=0.9, fs=40, centre=P(-3.9, 0.7))
        nu = nuage(0.6).move_to(P(-5.0, -2.05))
        gt = pluie(5, 0.9, 0, -0.6).next_to(nu, DOWN, buff=0.05)
        self.add(tb.fond, tb.trou(1, 1), nu, gt)

        def avant(sc):
            sc.au_mot("20 millimètres")
            sc.play(FadeIn(tb.valeur(1, 0), scale=1.4), run_time=0.3)
            sc.au_mot("4 heures")
            sc.play(FadeIn(tb.valeur(0, 0), scale=1.4), run_time=0.3)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["20 ÷", "4 =", "5 mm."])
            l1 = sc.ligne_rep(1, ["16 =", "20 −", "4 :", "enlevé !"])
            l1.set_color(ROUGE_ERREUR)
            h, b = sc.fleches(tb, 0, 1, "÷ 4")
            sc.au_mot("1 heure, c'est")
            sc.play(tb.remplir(0, 1, 1), run_time=0.3)
            sc.au_mot("4 fois moins")
            sc.play(*sc.jouer_fl(h), *sc.jouer_fl(b), run_time=0.4)
            sc.au_mot("20 divisé")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), tb.allumer(1, 0), run_time=0.3)
            sc.au_mot("par 4")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("5 millimètres")
            sc.play(FadeIn(l0[2], scale=1.3), tb.remplir(1, 1, 5), tb.eteindre(1, 0), run_time=0.4)
            sc.play(tb.allumer(1, 1), run_time=0.25)
            for m, mot in zip(l1, ["16, c'est", "20 moins", "4 : on", "enlevé"]):
                sc.au_mot(mot)
                sc.play(FadeIn(m, shift=UP * 0.15), run_time=0.3)
            sc.rep_fini()

        self.question_pause("06-question", "06b-reponse", ["Combien de mm", "en 1 heure ?"],
                            [self.t("5 mm", 36), self.t("16 mm", 36), self.t("80 mm", 36)], 0,
                            ["20 ÷ 4 = 5 mm.", "16 = 20 − 4 : enlevé !"], avant_q=avant, autres_r=apres)

    # ── 07 : le piège : + 2 heures, ce n'est pas + 2 mm ─────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 48, ROUGE_ERREUR).move_to(P(-0.4, 3.15))
        tb, _ = self.table(self.V2, centre=P(self.X0, 0.3), larg=1.8)
        v12 = pas_audit(tb.valeur(1, 0))  # 12 mm : la donnée de Yanis (écrans 01 à 04)
        self.play(Write(tit), FadeIn(tb.fond), FadeIn(v12), run_time=0.6)
        self.au_mot("De 3 heures")
        self.play(FadeIn(tb.valeur(0, 0), scale=1.4), run_time=0.3)
        self.au_mot("à 5 heures")
        self.play(FadeIn(tb.valeur(0, 1), scale=1.4), FadeIn(tb.trou(1, 1)), run_time=0.3)
        h = tb.fleche_col(0, 1, "+ 2", ligne=0, couleur=ORANGE_RETENUE)
        self.au_mot("on ajoute 2")
        self.play(*self.jouer_fl(h), run_time=0.45)
        b = tb.fleche_col(0, 1, "+ 2 ?", ligne=1, couleur=ROUGE_P)
        self.au_mot("n'ajoute pas")
        self.play(Create(b.fleche), run_time=0.4)
        self.au_mot("2 millimètres")
        self.play(FadeIn(b.etiquette, scale=1.3), run_time=0.3)
        self.au_mot("pas 14")
        self.play(tb.remplir(1, 1, 14, ROUGE_P), run_time=0.35)
        self.play(Create(tb.barrer(1, 1)), Create(croix(b.etiquette, sw=6)), run_time=0.4)
        lg = self.ligne_c([("On passe par 1 heure :", VERT_OK), ("20 mm", VERT_OK)], -2.45, fs=44)
        self.au_mot("On passe")
        self.play(FadeIn(lg[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("trouve 20")
        self.play(FadeIn(lg[1], scale=1.3), run_time=0.35)
        self.insister(lg[1], 1.3, 0.3)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (neige : 6 cm en 2 h ; en 7 h ?) ────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        tb = TableauProp(["Durée (h)", "Neige (cm)"], [[2, 1, 7], [6, 3, 21]], montrer=False, largeur_case=1.1,
                         largeur_libelle=1.9, hauteur=0.9, fs=38, centre=P(-3.65, 0.7))
        nu = nuage(0.6).move_to(P(-5.0, -2.05))
        fl = VGroup(*[flocon().move_to(P(-5.0 + x, -2.7 + y)) for x, y in ((-0.6, 0), (-0.2, -0.3), (0.2, 0.05),
                                                                              (0.6, -0.25))])
        self.add(tb.fond, tb.trou(1, 2), nu, fl)

        def avant(sc):
            sc.au_mot("6 centimètres")
            sc.play(FadeIn(tb.valeur(1, 0), scale=1.4), run_time=0.3)
            sc.au_mot("2 heures")
            sc.play(FadeIn(tb.valeur(0, 0), scale=1.4), run_time=0.3)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["En 1 h :", "6 ÷", "2 =", "3 cm."])
            l1 = sc.ligne_rep(1, ["En 7 h :", "3 ×", "7 =", "21 cm."])
            h, b = sc.fleches(tb, 0, 1, "÷ 2")
            h7, b7 = sc.fleches(tb, 1, 2, "× 7")
            sc.au_mot("En 1 heure")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), tb.remplir(0, 1, 1), run_time=0.3)
            sc.au_mot("6 divisé")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), tb.allumer(1, 0), run_time=0.3)
            sc.au_mot("par 2")
            sc.play(FadeIn(l0[2], shift=UP * 0.15), *sc.jouer_fl(h), *sc.jouer_fl(b), run_time=0.35)
            sc.au_mot("3 centimètres")
            sc.play(FadeIn(l0[3], scale=1.3), tb.remplir(1, 1, 3), tb.eteindre(1, 0), run_time=0.35)
            sc.au_mot("En 7 heures")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), tb.remplir(0, 2, 7), run_time=0.3)
            sc.au_mot("3 fois")
            sc.play(FadeIn(l1[1], shift=UP * 0.15), tb.allumer(1, 1), run_time=0.3)
            sc.au_mot("7, égale")
            sc.play(FadeIn(l1[2], shift=UP * 0.15), *sc.jouer_fl(h7), *sc.jouer_fl(b7), run_time=0.35)
            sc.au_mot("21 centimètres")
            sc.play(FadeIn(l1[3], scale=1.3), tb.remplir(1, 2, 21), tb.eteindre(1, 1), run_time=0.35)
            sc.play(tb.allumer(1, 2), run_time=0.25)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse", ["Combien de cm", "en 7 heures ?"],
                            [self.t("11 cm", 36), self.t("21 cm", 36), self.t("42 cm", 36)], 1,
                            ["En 1 h : 6 ÷ 2 = 3 cm.", "En 7 h : 3 × 7 = 21 cm."], avant_q=avant, autres_r=apres)

    # ── 09 : défi : le satellite météo ──────────────────────────────────────
    LIBS_D = ["Durée (min)", "Photos"]

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.15))
        self.play(Write(tit), run_time=0.6)
        te = terre(0.95).move_to(P(-5.0, 0.2))
        sat = satellite(0.75).move_to(P(-3.6, 1.85))
        tb, _ = self.table([[5, 8], [15, 24]], libs=self.LIBS_D, centre=P(1.7, 0.9), larg=1.5, lib=2.8)
        self.au_mot("Un satellite")
        self.play(FadeIn(te, scale=0.8), FadeIn(sat, shift=LEFT * 0.6), FadeIn(tb.fond, shift=UP * 0.2), run_time=0.6)
        self.au_mot("15 photos")
        self.play(FadeIn(tb.valeur(1, 0), scale=1.4), Flash(sat.get_center(), color=WHITE, flash_radius=0.7),
                  run_time=0.45)
        self.au_mot("5 minutes")
        self.play(FadeIn(tb.valeur(0, 0), scale=1.4), run_time=0.35)
        self.au_mot("8 minutes")
        self.play(FadeIn(tb.valeur(0, 1), scale=1.4), FadeIn(tb.trou(1, 1), scale=1.3), run_time=0.4)
        self.insister(tb.trou(1, 1), 1.3, 0.25)
        self.pause_defi(y=-1.4)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tb, deja = self.table([[5, 1, 8], [15, 3, 24]], libs=self.LIBS_D, connues=[(0, 0), (0, 2), (1, 0)],
                              trous=[(0, 1), (1, 1), (1, 2)], lib=2.8, centre=P(self.X0, 0.55))
        sat = satellite(0.6).move_to(P(4.4, 2.6))
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-1.0, 3.2))
        self.add(deja, sat)
        self.au_mot("Correction")
        self.play(Write(tit), run_time=0.5)
        self.au_mot("En 1 minute")
        self.play(tb.remplir(0, 1, 1), run_time=0.35)
        self.play(tb.allumer(0, 1), run_time=0.25)
        h, b = self.fleches(tb, 0, 1, "÷ 5")
        self.calc_tb(tb, 1, 1, 3, [("15 ÷", WHITE), ("5", AMBRE), ("=", WHITE), ("3 photos", VERT_OK)],
                     ["15 divisé", "par 5", None, "3 photos"], -2.15, fs=44,
                     avec={1: self.jouer_fl(h) + self.jouer_fl(b)})
        self.play(tb.eteindre(0, 1), run_time=0.25)
        h8, b8 = self.fleches(tb, 1, 2, "× 8")
        self.au_mot("En 8 minutes")
        self.play(tb.allumer(0, 2), run_time=0.3)
        self.calc_tb(tb, 1, 2, 24, [("3 ×", WHITE), ("8", AMBRE), ("=", WHITE), ("24 photos", VERT_OK)],
                     ["3 fois", "8, égale", None, "24 photos"], -3.0, fs=44,
                     avec={1: self.jouer_fl(h8) + self.jouer_fl(b8)})
        cad = SurroundingRectangle(tb.case(1, 2), color=VERT_OK, buff=0.04, corner_radius=0.08, stroke_width=6)
        self.play(Create(cad), tb.eteindre(0, 2), run_time=0.35)
        self.insister(VGroup(tb.textes[1][2], cad), 1.2, 0.3)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        """Titre EN HAUT ET CENTRÉ, le tableau complet (÷ 3 puis × 5) dessous,
        quatre points sous le tableau, chaque morceau à son mot."""
        self.ecran("10-finale", 0.65)
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        tb, fig = self.etat_unite(avec_x5=True)
        fig.remove(fig[-3])  # la ligne de calcul « 12 ÷ 3 = 4 mm » : pas sur cet écran
        fig.scale(0.76).move_to(P(-0.6, 1.3))
        if fig.get_top()[1] > tit.get_bottom()[1] - 0.12:
            fig.shift(DOWN * (fig.get_top()[1] - tit.get_bottom()[1] + 0.12))
        self.add(fig)
        self.au_mot("Ce que")
        self.play(Write(tit), run_time=0.7)
        points = [([("On passe par 1 :", AMBRE)], ["par 1 :"]),
                  ([("On divise :", WHITE), ("la valeur", WHITE), ("pour 1.", WHITE)], ["on divise", "la valeur", "1, puis"]),
                  ([("Puis on multiplie.", WHITE)], ["puis on multiplie"]),
                  ([("On n'ajoute jamais le même nombre.", ROUGE_ERREUR)], ["Et on"])]
        lignes = VGroup(*[VGroup(self.coche(), self.ligne(m, 38)).arrange(RIGHT, buff=0.25) for m, _ in points])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.18)
        lignes.align_to(P(-5.6, 0), LEFT).align_to(P(0, fig.get_bottom()[1] - 0.3), UP)
        gestes = {0: Indicate(VGroup(tb.textes[0][1], tb.textes[1][1]), color=AMBRE),
                  1: Indicate(VGroup(tb.textes[1][0], tb.textes[1][1]), color=AMBRE),
                  2: Indicate(VGroup(tb.textes[1][1], tb.textes[1][2]), color=AMBRE)}
        for k, ((_, mots), lg) in enumerate(zip(points, lignes)):
            for j, mot in enumerate(mots):
                self.au_mot(mot)
                anims = [FadeIn(lg[1][j], shift=RIGHT * 0.2)]
                if j == 0:
                    anims.append(Create(lg[0]))
                    if k in gestes:
                        anims.append(gestes[k])
                self.play(*anims, run_time=0.45 if j == 0 and k in gestes else 0.35)
        self.attendre_voix(marge=1.0)

    def construct(self):
        for e in (self.page_de_garde, self.ecran_situation, self.ecran_tableau, self.ecran_bloque,
                  self.ecran_unite, self.ecran_cinq, self.ecran_question1, self.ecran_piege, self.ecran_question2,
                  self.ecran_defi, self.ecran_correction, self.ecran_finale):
            e()
        self.page_abonnement("11-abonne")


class PropQuatriemeCM2(PropQuatriemeBase):
    identite = "Maths CM2 — EleveAI"
    ceinture = "verte"
