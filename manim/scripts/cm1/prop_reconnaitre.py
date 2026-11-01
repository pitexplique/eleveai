# prop_reconnaitre.py (cm1/)
# EleveAI — Maths CM1 ET CM2 — série « Proportionnalité CM », épisode 01 COMMUN :
# RECONNAÎTRE LA PROPORTIONNALITÉ (micro du coach : prop_reconnaitre), AVEC VOIX.
# Paysage 16:9 : PropReconnaitreCM1 (CEINTURE VERTE : la paysage complète du
# niveau, situation, méthode « on multiplie toujours par le même nombre »,
# contre-exemple, 2 questions-pauses, défi corrigé) ; PropReconnaitreCM2
# (« Maths CM2 — EleveAI », JAUNE : un rappel de CM1). Seules l'identité et la
# ceinture changent (garde) ; la voix ne cite aucune classe.
# Short jumeau : prop_reconnaitre_short.py (blanche, rendu une fois, copié cm1/cm2).
# ⭐ Méthode travaillée : le COEFFICIENT (flèche latérale « × 2 ») vérifié
# COLONNE PAR COLONNE. ⛔ Pas de produit en croix (CM).
# ⭐ Leurres (consigne-videos-proportionnalite.md) : 1. ajouter au lieu de
# multiplier (âges : + 3) ; 2. croire tout proportionnel (poids de Tom,
# température, bouquets du défi) ; question 2 : 25 = 5 × 5, 20 = 2 × 10.
#
# Décor et métier : SPORT, Adam, ENTRAÎNEUR DE BASKET (1 panier = 2 points) ;
# Lili et son frère Bob (les âges) ; une FLEURISTE (défi des bouquets).
# Centres d'intérêt : sport.
# Faits réels : aucun chiffre à sourcer (un panier « normal » vaut 2 points au
# basket, règle FIBA ; les autres nombres sont des situations inventées).
#
# Micro → écrans : situation proportionnelle (01, 02), le coefficient × 2 (03),
# utiliser la proportionnalité (04 : 10 paniers), QUESTION 1 (05 : où multiplie-
# t-on toujours par le même nombre ?), contre-exemple des âges (06, 07),
# QUESTION 2 (08 : l'âge de Bob), la méthode colonne par colonne (09), défi (10)
# et correction (10b), ce que tu as appris (11), fin (12).
#
# Voix : manim/voix/cm-prop-reconnaitre.json (validée par Frédéric le 01/11,
# débit −10), WAV dans public/sons/cm-prop-reconnaitre/ ; marques mot à mot :
# manim/scripts/cm1/prop_reconnaitre_marques.json (scripts/marques_dump.ps1 puis
# scripts/cues2marques.py).
# Outils : 6e/prop_commun.py + manim/canvas_proportion.py (lecture seule).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/prop_reconnaitre.py PropReconnaitreCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/prop_reconnaitre.py PropReconnaitreCM1 -o eleveai-maths-cm1-prop-reconnaitre --media_dir manim/scripts/cm1/media-prop-reconnaitre
# Garde CM2 seule : GARDE_SEULE=1 python -m manim render -qh --disable_caching manim/scripts/cm1/prop_reconnaitre.py PropReconnaitreCM2 -o garde-cm2-prop-reconnaitre --media_dir manim/scripts/cm1/media-prop-reconnaitre
# python manim/scripts/cm1/frac_cm_commun.py coller <cm1.mp4> <garde-cm2.mp4> <cm2.mp4>
# Sorties : manim/sorties/cm1/maths/proportionnalite/01-reconnaitre/eleveai-maths-cm1-prop-reconnaitre.mp4
#           manim/sorties/cm2/maths/proportionnalite/01-reconnaitre/eleveai-maths-cm2-prop-reconnaitre.mp4

import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403

ORANGE_BB = "#f97316"   # le ballon de basket
MAILLOT = "#2563eb"     # le maillot d'Adam
TICKET_JAUNE = "#fbbf24"  # le tableau d'affichage


def pas_audit(m):
    """Décor sans synchro ni audit (toute la famille de m)."""
    for f in m.get_family():
        f._pas_audit = True
        f.sans_synchro = True
    return m


def ballon(r=0.3):
    """Un ballon de basket : orange, les coutures noires."""
    b = Circle(radius=r, fill_color=ORANGE_BB, fill_opacity=1, stroke_color="#7c2d12", stroke_width=3)
    c = VGroup(Line(P(-r, 0), P(r, 0)), Line(P(0, -r), P(0, r)),
               Arc(radius=r * 0.9, start_angle=-PI / 3, angle=2 * PI / 3, arc_center=P(-r * 1.25, 0)),
               Arc(radius=r * 0.9, start_angle=2 * PI / 3, angle=2 * PI / 3, arc_center=P(r * 1.25, 0)))
    c.set_stroke("#1f2937", 2.5)
    return VGroup(b, c)


def panier(s=1.0):
    """Le panier : la planche blanche, le cercle orange, le filet."""
    planche = RoundedRectangle(width=1.7, height=1.15, corner_radius=0.06, fill_color=WHITE, fill_opacity=1,
                               stroke_color="#94a3b8", stroke_width=3)
    carre = Rectangle(width=0.62, height=0.45, stroke_color="#ef4444", stroke_width=4).move_to(P(0, -0.2))
    cercle = Ellipse(width=0.9, height=0.2, stroke_color="#ea580c", stroke_width=6).move_to(P(0, -0.65))
    filet = VGroup(*[Line(P(-0.45 + i * 0.18, -0.65), P(-0.3 + i * 0.12, -1.25)) for i in range(6)],
                   Line(P(-0.36, -0.95), P(0.36, -0.95)))
    filet.set_stroke(WHITE, 2.5)
    poteau = Rectangle(width=0.16, height=2.4, fill_color="#64748b", fill_opacity=1, stroke_width=0)
    poteau.next_to(planche, DOWN, buff=0).shift(DOWN * 0.0)
    g = VGroup(poteau, planche, carre, filet, cercle).scale(s)
    g.cercle = cercle
    return g


def adam(s=1.0):
    """Adam, entraîneur de basket : maillot bleu, sifflet au cou."""
    p = personne(peau="#8d5524", tenue=MAILLOT, cheveux="#111827", s=s)
    num = Text("7", font_size=int(30 * s), color=WHITE, weight=BOLD).move_to(p.corps.get_center() + UP * 0.1 * s)
    c = p.tete.get_bottom()
    cordon = Line(c + LEFT * 0.2 * s, c + DOWN * 0.45 * s, color=WHITE, stroke_width=3)
    sifflet = RoundedRectangle(width=0.2 * s, height=0.12 * s, corner_radius=0.04, fill_color="#facc15",
                               fill_opacity=1, stroke_width=0).move_to(c + DOWN * 0.5 * s)
    num._pas_audit = True
    num.sans_synchro = True
    p.add(num, cordon, sifflet)
    return p


def enfant_age(taille, peau, tenue, cheveux, longs=False):
    """Un enfant (personne réduite) dont la hauteur totale vaut `taille`."""
    p = personne(peau=peau, tenue=tenue, cheveux=cheveux, longs=longs)
    return p.scale_to_fit_height(taille)


def velo(s=1.0, couleur="#22c55e"):
    """Un vélo : deux roues, le cadre, la selle, le guidon."""
    r = 0.32
    roues = VGroup(*[Circle(radius=r, stroke_color=WHITE, stroke_width=4).move_to(P(x, 0)) for x in (-0.55, 0.55)])
    cadre = VGroup(Line(P(-0.55, 0), P(-0.05, 0.45)), Line(P(-0.05, 0.45), P(0.4, 0.45)),
                   Line(P(0.4, 0.45), P(0.55, 0)), Line(P(-0.55, 0), P(0.1, 0)), Line(P(0.1, 0), P(-0.05, 0.45)),
                   Line(P(0.1, 0), P(0.4, 0.45))).set_stroke(couleur, 5)
    selle = Line(P(-0.18, 0.55), P(0.08, 0.55), color=WHITE, stroke_width=6)
    guidon = Line(P(0.4, 0.45), P(0.5, 0.65), color=WHITE, stroke_width=5)
    return VGroup(roues, cadre, selle, guidon).scale(s)


def fleur(couleur, s=1.0):
    coeur = Circle(radius=0.07, fill_color="#facc15", fill_opacity=1, stroke_width=0)
    petales = VGroup(*[Circle(radius=0.08, fill_color=couleur, fill_opacity=1, stroke_width=0)
                       .move_to(P(0.11 * np.cos(a), 0.11 * np.sin(a))) for a in np.arange(0, TAU, TAU / 5)])
    return VGroup(petales, coeur).scale(s)


def bouquet(n=5, s=1.0):
    """Un bouquet de n fleurs : tiges vertes, un nœud, les fleurs en éventail."""
    couleurs = ["#f43f5e", "#a855f7", "#f97316", "#ec4899", "#38bdf8", "#facc15"]
    tetes, tiges = VGroup(), VGroup()
    for i in range(n):
        a = PI / 2 + (i - (n - 1) / 2) * 0.32
        bout = P(0.62 * np.cos(a), 0.62 * np.sin(a) - 0.1)
        tiges.add(Line(P(0, -0.55), bout, color="#16a34a", stroke_width=4))
        tetes.add(fleur(couleurs[i % len(couleurs)]).move_to(bout))
    noeud = Triangle(fill_color="#fde047", fill_opacity=1, stroke_width=0).scale(0.12).move_to(P(0, -0.3))
    return VGroup(tiges, noeud, tetes).scale(s)


def fleuriste(s=1.0):
    """La fleuriste : cheveux longs, tablier vert."""
    p = personne(peau="#f1c27d", tenue="#e11d48", cheveux="#7c2d12", longs=True, s=s)
    tab = Polygon(P(-0.38, -1.85), P(0.38, -1.85), P(0.3, -0.75), P(-0.3, -0.75), fill_color="#15803d",
                  fill_opacity=1, stroke_width=0).scale(s, about_point=ORIGIN)
    tab.move_to(p.corps.get_center() + DOWN * 0.1 * s)
    p.add(tab)
    return p


class PropReconnaitreBaseCM(PaysageProp):
    nom_voix = "cm-prop-reconnaitre"
    fichier_marques = "prop_reconnaitre_marques.json"
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"
    LIBS = ["Paniers", "Points"]
    X0 = -0.9   # le centre des tableaux

    def garde(self, *a, **k):
        """L'identité (« CM1 » porte un 1) et l'échelle sont du décor : ni
        synchro, ni audit (comme frac_cm_commun.PaysageCM)."""
        titre, ident, ech = super().garde(*a, **k)
        pas_audit(ident)
        pas_audit(ech)
        return titre, ident, ech

    larg_cartes = None  # largeur des cartes de choix (None : celle du gabarit, ≤ 5,4)

    def _disposer_q(self, question, choix, phrase):
        """CM : des cartes plus larges (texte en gros) quand larg_cartes est
        donné, et la phrase de réponse en 34 ; ajouté ici (prop_commun et les
        gabarits restent intacts)."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        if self.larg_cartes is None:
            return tete, q, cartes, pause, rebours, ph
        neuves = VGroup(*[self._carte_choix(l, c, self.larg_cartes, 34) for l, c in zip("ABC", choix)])
        neuves.arrange(DOWN, buff=0.16)
        neuves.align_to(P(self.XL, 0), LEFT).align_to(P(0, q.get_bottom()[1] - 0.2), UP)
        pause = self.col(self.t("Mets pause, et choisis !", 34, ORANGE_RETENUE), neuves.get_bottom()[1] - 0.4)
        ph = self.col(self.bloc(phrase, 34, VERT_OK), neuves.get_bottom()[1] - 0.3)
        ph.align_to(P(0, neuves.get_bottom()[1] - 0.2), UP)
        self.cartes_q, self.ph_q = neuves, ph
        return tete, q, neuves, pause, rebours, ph

    def table_paniers(self, n=3, montrer=False, centre=None):
        vals = [[1, 2, 3, 10][:n], [2, 4, 6, 20][:n]]
        return TableauProp(self.LIBS, vals, montrer=montrer, largeur_case=1.6 if n == 3 else 1.5,
                           largeur_libelle=2.3, hauteur=0.9, fs=42, centre=P(self.X0, 1.55) if centre is None else centre)

    def ligne_c(self, morceaux, y, fs=46, x=None):
        """Une ligne de calcul centrée sous le tableau (non jouée)."""
        return self.ligne(morceaux, fs).move_to(P(self.X0 if x is None else x, y))

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Reconnaître la proportionnalité", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Reconnaître")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        pn = panier(0.8).move_to(P(-4.3, 0.35))
        b = ballon(0.32).move_to(P(-2.6, -0.6))
        self.play(FadeIn(pn, shift=UP * 0.2), FadeIn(b, scale=0.5), run_time=0.5)
        self.au_mot("Quand")
        q = self.t("Quand peut-on multiplier ?", 48, ORANGE_RETENUE).move_to(P(1.4, 0.35))
        self.play(FadeIn(q, shift=RIGHT * 0.2),
                  MoveAlongPath(b, ArcBetweenPoints(b.get_center(), pn.cercle.get_center() + UP * 0.25,
                                                    angle=-PI / 2)), run_time=0.8)
        self.play(b.animate.shift(DOWN * 0.7).set_opacity(0.0), run_time=0.4)
        self.insister(q, 1.12, 0.25)
        self.attendre_voix(marge=0.6)

    # ── 01 : Adam, entraîneur de basket ─────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = adam(1.1).move_to(P(-5.0, -0.75))
        self.au_mot("Voici Adam")
        nom = self.t("Adam", 42, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("entraîneur")
        met = VGroup(self.t("entraîneur", 30, BLEU_CALCUL), self.t("de basket", 30, BLEU_CALCUL))
        met.arrange(DOWN, buff=0.08).next_to(nom, UP, buff=0.15)
        pn = panier(1.0).move_to(P(-1.7, 0.4))
        self.play(FadeIn(met, shift=DOWN * 0.1), FadeIn(pn, shift=UP * 0.2), run_time=0.6)
        self.au_mot("compte les points")
        tab = RoundedRectangle(width=3.2, height=1.6, corner_radius=0.15, fill_color="#111827", fill_opacity=1,
                               stroke_color=TICKET_JAUNE, stroke_width=4).move_to(P(3.3, 1.9))
        mot = self.t("Points", 34, TICKET_JAUNE).move_to(tab.get_top() + DOWN * 0.38)
        self.play(FadeIn(tab, scale=0.8), FadeIn(mot), run_time=0.5)
        b = ballon(0.28).move_to(pers.get_right() + P(0.1, 0.4))
        self.au_mot("son équipe")
        self.play(FadeIn(b, scale=0.6), run_time=0.25)
        self.play(MoveAlongPath(b, ArcBetweenPoints(b.get_center(), pn.cercle.get_center() + UP * 0.25,
                                                    angle=-PI / 2)), run_time=0.7)
        self.play(b.animate.shift(DOWN * 0.75), Indicate(pn.cercle, color=AMBRE), run_time=0.4)
        l1 = self.ligne([("1 panier", WHITE), ("=", WHITE), ("2 points", VERT_OK)], 48).move_to(P(3.0, -0.6))
        l1[0]._pas_audit = True  # la voix dit « Un panier »
        l1[0].sans_synchro = True
        self.au_mot("Un panier")
        self.play(FadeIn(l1[0], shift=RIGHT * 0.2), FadeIn(l1[1]), run_time=0.3)
        self.au_mot("2 points")
        score = self.t("2", 60, TICKET_JAUNE).move_to(tab.get_center() + DOWN * 0.25)
        self.play(FadeIn(l1[2], scale=1.3), FadeIn(score, scale=1.5), run_time=0.4)
        self.insister(l1, 1.12, 0.25)
        self.attendre_voix()

    # ── 02 : le tableau d'Adam (1, 2, 3 paniers) ────────────────────────────
    def ballons_sous(self, tb, c, n, y=-0.45):
        g = VGroup(*[ballon(0.22) for _ in range(n)]).arrange(RIGHT, buff=0.06)
        return g.move_to(P(tb.x(c), y))

    def ecran_paniers(self):
        self.ecran("02-paniers")
        tb = self.table_paniers()
        self.play(FadeIn(tb.fond, shift=UP * 0.2), run_time=0.4)
        for c, (mq, mv) in enumerate([("1 panier", "2 points"), ("2 paniers", "4 points"),
                                      ("3 paniers", "6 points")]):
            self.au_mot(mq)
            self.play(tb.allumer(0, c), FadeIn(tb.valeur(0, c), scale=1.4),
                      FadeIn(self.ballons_sous(tb, c, c + 1), shift=DOWN * 0.2), run_time=0.4)
            self.au_mot(mv)
            self.play(tb.eteindre(0, c), FadeIn(tb.valeur(1, c), scale=1.4), run_time=0.4)
        self.attendre_voix(marge=0.8)

    # ── 03 : on multiplie toujours par 2 : proportionnel ────────────────────
    def ecran_fois(self):
        self.ecran("03-fois")
        tb = self.table_paniers(montrer=True)
        self.add(tb)
        fl = tb.fleche_lat("× 2")
        self.au_mot("on multiplie")
        self.play(Create(fl.fleche), run_time=0.5)
        phr = self.ligne([("On multiplie toujours par", WHITE), ("2", AMBRE)], 42).move_to(P(self.X0, -0.35))
        self.poser_lignes(phr, "fade", 0.35)
        self.play(FadeIn(fl.etiquette, scale=1.4),
                  LaggedStart(*[Indicate(tb.colonne(c), color=AMBRE, scale_factor=1.08) for c in range(3)],
                              lag_ratio=0.3), run_time=0.7)
        self.au_mot("3 fois 2")
        lg = self.ligne_c([("3 ×", WHITE), ("2", AMBRE), ("=", WHITE), ("6", VERT_OK)], -1.35)
        self.play(tb.allumer(0, 2), FadeIn(lg[0], shift=RIGHT * 0.2), run_time=0.3)
        self.play(FadeIn(lg[1], shift=RIGHT * 0.2), FadeIn(lg[2]), run_time=0.3)
        self.au_mot("égale 6")
        self.play(FadeIn(lg[3], scale=1.3), tb.eteindre(0, 2), tb.allumer(1, 2), run_time=0.4)
        self.au_mot("proportionnels")
        v = self.tampon("Proportionnel !", VERT_OK, 48).move_to(P(self.X0, -2.5))
        self.play(FadeIn(v, scale=1.3), tb.eteindre(1, 2), run_time=0.4)
        self.insister(v, 1.15, 0.25)
        self.attendre_voix()

    # ── 04 : 10 paniers ? 10 × 2 = 20 ───────────────────────────────────────
    def ecran_dix(self):
        self.ecran("04-dix")
        tb = self.table_paniers(n=4)
        self.add(tb.fond, *[tb.valeur(r, c) for r in range(2) for c in range(3)])
        fl = tb.fleche_lat("× 2")
        self.add(fl)
        self.au_mot("10 paniers")
        self.play(tb.allumer(0, 3), FadeIn(tb.valeur(0, 3), scale=1.4), FadeIn(tb.trou(1, 3)), run_time=0.4)
        self.au_mot("10 fois")
        lg = self.ligne_c([("10 ×", WHITE), ("2", AMBRE), ("=", WHITE), ("20 points", VERT_OK)], -0.45)
        self.play(FadeIn(lg[0], shift=RIGHT * 0.2), tb.eteindre(0, 3), run_time=0.3)
        self.play(FadeIn(lg[1], shift=RIGHT * 0.2), FadeIn(lg[2]), Indicate(fl.etiquette, color=AMBRE),
                  run_time=0.4)
        self.au_mot("20 points")
        self.play(FadeIn(lg[3], scale=1.3), tb.remplir(1, 3, 20), run_time=0.45)
        self.play(tb.allumer(1, 3), run_time=0.3)
        self.insister(lg, 1.1, 0.25)
        self.au_mot("Pas besoin")
        p = self.t("Pas besoin de compter un par un !", 40, ORANGE_RETENUE).move_to(P(self.X0, -1.6))
        self.play(FadeIn(p, shift=UP * 0.2), run_time=0.4)
        bs = VGroup(*[ballon(0.2) for _ in range(10)]).arrange(RIGHT, buff=0.08).move_to(P(self.X0, -2.6))
        self.au_mot("compter")
        self.play(LaggedStart(*[FadeIn(b, scale=0.5) for b in bs], lag_ratio=0.12), run_time=0.8)
        self.play(Create(croix(bs, sw=6)), run_time=0.35)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (où multiplie-t-on toujours par le même nombre ?) ────
    def choix2(self, a, b, fs=34):
        """Un choix sur deux lignes (CM : gros caractères). Chaque ligne est une
        liste de morceaux d'UN nombre au plus : chaque Text entre entier, à son
        mot, et l'audit le mesure (un Text coupé en morceaux ne l'était pas)."""
        lg = lambda ms: VGroup(*[self.t(m, fs) for m in ms]).arrange(RIGHT, buff=0.14)  # noqa: E731
        return VGroup(lg(a), lg(b)).arrange(DOWN, aligned_edge=LEFT, buff=0.1)

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL, self.larg_cartes = -0.6, 6.8
        deco = VGroup(adam(1.0).move_to(P(-5.4, -0.8)), panier(0.9).move_to(P(-2.9, 0.3)))
        self.add(deco)
        velos = VGroup(*[velo(0.95) for _ in range(3)]).arrange(DOWN, buff=0.3).move_to(P(-3.6, 0.2))

        def apres(sc):
            sc.au_mot("Le nombre de roues")
            sc.play(FadeOut(deco), LaggedStart(*[FadeIn(v, shift=RIGHT * 0.3) for v in velos], lag_ratio=0.25),
                    run_time=0.6)
            sc.play(LaggedStart(*[Indicate(v[0], color=VERT_OK) for v in velos], lag_ratio=0.2), run_time=0.6)

        self.question_pause("05-question", "05b-reponse", ["Où multiplie-t-on toujours", "par le même nombre ?"],
                            [self.choix2(["1 vélo :", "2 roues."], ["3 vélos :", "6 roues."]),
                             self.choix2(["Tom, 10 ans :", "30 kilos."], ["20 ans :", "70 kilos."]),
                             self.choix2(["8 heures :", "20 degrés."], ["Midi :", "28 degrés."])], 0,
                            ["Roues : toujours 2 fois les vélos.", "3 × 2 = 6"], mot_q="Où multiplie",
                            autres_r=apres)
        del self.XL, self.larg_cartes

    # ── 06 : tout n'est pas proportionnel : Lili et Bob ─────────────────────
    SOL = -2.9

    def lili(self, h=1.3):
        return enfant_age(h, "#f1c27d", "#ec4899", "#7c2d12", longs=True)

    def bob(self, h=1.75):
        return enfant_age(h, "#f1c27d", "#22c55e", "#7c2d12")

    def table_ages(self, vals, centre=P(1.6, 1.2)):
        return TableauProp(["Lili (ans)", "Bob (ans)"], vals, montrer=False, largeur_case=1.5,
                           largeur_libelle=2.5, hauteur=0.9, fs=42, centre=centre)

    def ecran_contre(self):
        self.ecran("06-contre")
        self.au_mot("Mais attention")
        tit = self.t("Tout n'est pas proportionnel !", 44, ROUGE_ERREUR).move_to(P(-0.3, 3.05))
        self.play(Write(tit), run_time=0.6)
        sol = Line(P(-6.2, self.SOL), P(-1.2, self.SOL), color=GREY_C, stroke_width=4)
        li = self.lili().move_to(P(-4.9, self.SOL + 0.65))
        bo = self.bob().move_to(P(-2.8, self.SOL + 0.875))
        tb = self.table_ages([[2], [5]])
        self.au_mot("Voici Lili")
        nl = self.t("Lili", 36, "#f9a8d4").next_to(li, UP, buff=0.2)
        self.play(Create(sol), FadeIn(li, shift=UP * 0.3), FadeIn(nl), run_time=0.5)
        self.au_mot("Bob")
        nb = self.t("Bob", 36, "#86efac").next_to(bo, UP, buff=0.2)
        self.play(FadeIn(bo, shift=UP * 0.3), FadeIn(nb), FadeIn(tb.fond), run_time=0.5)
        self.au_mot("Lili a 2 ans")
        a2 = self.t("2 ans", 32, "#f9a8d4").next_to(nl, UP, buff=0.12)
        self.play(FadeIn(tb.valeur(0, 0), scale=1.4), FadeIn(a2), run_time=0.4)
        self.au_mot("Bob a 5 ans")
        a5 = self.t("5 ans", 32, "#86efac").next_to(nb, UP, buff=0.12)
        self.play(FadeIn(tb.valeur(1, 0), scale=1.4), FadeIn(a5), run_time=0.4)
        fl = tb.fleche_lat("+ 3", couleur=ORANGE_RETENUE)
        self.au_mot("3 ans de plus")
        lg = self.t("3 ans de plus", 40, ORANGE_RETENUE).move_to(P(1.6, -0.6))
        lg.sans_synchro = True  # il entre avec la flèche, au mot « 3 » (pas à « plus »)
        self.play(Create(fl.fleche), FadeIn(fl.etiquette, scale=1.4), FadeIn(lg, shift=UP * 0.15), run_time=0.5)
        self.insister(fl.etiquette, 1.3, 0.25)
        self.attendre_voix()

    # ── 07 : le piège : Lili 4 ans, Bob 7 ans (pas 10) ──────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        tit = self.t("Tout n'est pas proportionnel !", 44, ROUGE_ERREUR).move_to(P(-0.3, 3.05))
        sol = Line(P(-6.2, self.SOL), P(-1.2, self.SOL), color=GREY_C, stroke_width=4)
        li, bo = self.lili(1.3).move_to(P(-4.9, self.SOL + 0.65)), self.bob().move_to(P(-2.8, self.SOL + 0.875))
        tb = self.table_ages([[2, 4], [5, 7]], centre=P(1.6, 0.85))
        noms = VGroup(self.t("Lili", 30, "#f9a8d4").move_to(P(-4.9, self.SOL - 0.32)),
                      self.t("Bob", 30, "#86efac").move_to(P(-2.8, self.SOL - 0.32)))
        self.add(tit, sol, li, bo, noms, tb.fond, tb.valeur(0, 0), tb.valeur(1, 0))
        self.au_mot("4 ans")
        li2 = self.lili(1.75).move_to(P(-4.9, self.SOL + 0.875))
        bo2 = self.bob(2.15).move_to(P(-2.8, self.SOL + 1.075))
        h = tb.fleche_col(0, 1, "× 2", ligne=0)
        h.etiquette._pas_audit = True  # la voix dit « le double »
        h.etiquette.sans_synchro = True
        self.play(FadeIn(tb.valeur(0, 1), scale=1.4), Transform(li, li2), run_time=0.5)
        self.au_mot("le double")
        self.play(Create(h.fleche), FadeIn(h.etiquette, scale=1.3), run_time=0.4)
        self.au_mot("10 ans")
        faux = self.t("10 ?", 40, ROUGE_ERREUR).move_to(P(tb.x(1), tb.carte.get_bottom()[1] - 0.5))
        self.play(FadeIn(tb.trou(1, 1)), FadeIn(faux, scale=1.3), run_time=0.4)
        self.play(Create(croix(faux, sw=6)), run_time=0.3)
        self.au_mot("7 ans")
        self.play(tb.remplir(1, 1, 7), Transform(bo, bo2), run_time=0.5)
        self.play(tb.allumer(1, 1), run_time=0.3)
        fl = tb.fleche_lat("+ 3", couleur=ORANGE_RETENUE)
        self.au_mot("toujours 3 ans")
        self.play(Create(fl.fleche), FadeIn(fl.etiquette, scale=1.4), run_time=0.5)
        self.au_mot("On ajoute 3")
        lg = self.t("On ajoute 3, on ne multiplie pas.", 36, ORANGE_RETENUE).move_to(P(2.15, -1.45))
        self.play(FadeIn(lg, shift=UP * 0.15), run_time=0.4)
        self.au_mot("Ce n'est pas")
        v = self.tampon("Pas proportionnel !", ROUGE_ERREUR, 44).move_to(P(2.15, -2.55))
        self.play(FadeIn(v, scale=1.3), run_time=0.4)
        self.insister(v, 1.12, 0.25)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (Lili 10 ans : l'âge de Bob ?) ──────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL, self.larg_cartes = 0.4, 5.8
        tb = TableauProp(["Lili (ans)", "Bob (ans)"], [[2, 10], [5, "?"]], montrer=False, largeur_case=1.2,
                         largeur_libelle=2.0, hauteur=0.85, fs=38, centre=P(-4.15, 0.5))
        sol = Line(P(-6.2, self.SOL), P(-1.2, self.SOL), color=GREY_C, stroke_width=4)
        enf = VGroup(self.lili(1.0).move_to(P(-4.6, self.SOL + 0.5)), self.bob(1.3).move_to(P(-3.0, self.SOL + 0.65)))
        self.add(sol, enf)

        def avant(sc):
            sc.au_mot("Lili a 2 ans")
            sc.play(FadeIn(tb.fond), FadeIn(tb.valeur(0, 0), scale=1.4), run_time=0.35)
            sc.au_mot("Bob a 5 ans")
            sc.play(FadeIn(tb.valeur(1, 0), scale=1.4), run_time=0.3)
            sc.au_mot("10 ans")
            sc.play(FadeIn(tb.valeur(0, 1), scale=1.4), FadeIn(tb.trou(1, 1)), run_time=0.35)

        def apres(sc):
            fl = tb.fleche_lat("+ 3", couleur=ORANGE_RETENUE)
            sc.au_mot("toujours 3 ans")
            sc.play(Create(fl.fleche), FadeIn(fl.etiquette, scale=1.3), run_time=0.4)
            sc.rep(0)
            sc.rep(1)
            sc.play(tb.remplir(1, 1, 13), run_time=0.4)
            sc.play(tb.allumer(1, 1), run_time=0.3)
            sc.rep(2)
            sc.rep_fin()

        self.question_pause("08-question", "08b-reponse", ["Lili : 10 ans.", "Quel âge aura Bob ?"],
                            [self.t("25 ans", 36), self.t("13 ans", 36), self.t("20 ans", 36)], 1,
                            ["Toujours 3 ans de plus :", "10 + 3 = 13 ans.", "On ajoute, on ne multiplie pas."],
                            avant_q=avant, autres_r=apres)
        del self.XL, self.larg_cartes

    # ── 09 : la méthode : on regarde chaque colonne ─────────────────────────
    def ecran_methode(self):
        self.ecran("09-methode")
        self.au_mot("La méthode")
        tit = self.t("La méthode", 50, JAUNE_TITRE).move_to(P(-0.3, 3.05))
        self.play(Write(tit), run_time=0.5)
        ta = TableauProp(self.LIBS, [[1, 2, 3], [2, 4, 6]], montrer=True, largeur_case=0.95, largeur_libelle=1.75,
                         hauteur=0.8, fs=36, centre=P(-3.85, 1.0))
        tg = TableauProp(["Lili", "Bob"], [[2, 4], [5, 7]], montrer=True, largeur_case=0.95, largeur_libelle=1.3,
                         hauteur=0.8, fs=36, centre=P(2.2, 1.0))
        for tb in (ta, tg):
            pas_audit(tb)
        self.play(FadeIn(ta, shift=UP * 0.2), FadeIn(tg, shift=UP * 0.2), run_time=0.5)
        self.au_mot("chaque colonne")
        self.play(LaggedStart(*[Indicate(ta.colonne(c), color=AMBRE, scale_factor=1.1) for c in range(3)],
                              *[Indicate(tg.colonne(c), color=AMBRE, scale_factor=1.1) for c in range(2)],
                              lag_ratio=0.2), run_time=1.2)
        fa = pas_audit(ta.fleche_lat("× 2"))
        self.au_mot("Si on multiplie")
        self.play(Create(fa.fleche), FadeIn(fa.etiquette, scale=1.3), run_time=0.5)
        l1 = self.t("Toujours le même nombre", 30, VERT_OK).move_to(P(-3.6, -0.55))
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.35)
        self.au_mot("c'est proportionnel")
        va = self.tampon("Proportionnel !", VERT_OK, 36).move_to(P(-3.85, -1.6))
        self.play(FadeIn(va, scale=1.3), run_time=0.4)
        self.insister(va, 1.12, 0.25)
        fg = pas_audit(tg.fleche_lat("+ 3", couleur=ORANGE_RETENUE))
        self.au_mot("Sinon")
        l2 = self.t("Sinon…", 34, ORANGE_RETENUE).move_to(P(2.4, -0.55))
        self.play(Create(fg.fleche), FadeIn(fg.etiquette, scale=1.3), FadeIn(l2, shift=UP * 0.15), run_time=0.5)
        self.au_mot("ce n'est pas")
        vg = self.tampon("Pas proportionnel !", ROUGE_ERREUR, 36).move_to(P(2.4, -1.6))
        self.play(FadeIn(vg, scale=1.3), run_time=0.4)
        self.insister(vg, 1.12, 0.25)
        self.attendre_voix()

    # ── 10 : défi : les bouquets de la fleuriste ────────────────────────────
    def table_bouquets(self, montrer=False):
        return TableauProp(["Bouquets", "Fleurs"], [[1, 2, 3], [5, 10, 16]], montrer=montrer, largeur_case=1.6,
                           largeur_libelle=2.4, hauteur=0.9, fs=42, centre=P(-1.3, 1.45))

    def bouquets_sous(self, tb, c, n, y=-0.45):
        g = VGroup(*[bouquet(5, 0.42) for _ in range(n)]).arrange(RIGHT, buff=0.02)
        return g.move_to(P(tb.x(c), y))

    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.play(Write(tit), run_time=0.6)
        tb = self.table_bouquets()
        fl = fleuriste(0.85).move_to(P(4.6, 0.9))
        self.au_mot("fleuriste")
        mf = self.t("fleuriste", 30, "#fda4af").next_to(fl, DOWN, buff=0.15)
        self.play(FadeIn(fl, shift=LEFT * 0.3), FadeIn(mf), FadeIn(tb.fond, shift=UP * 0.2), run_time=0.5)
        for c, (mq, mv) in enumerate([("1 bouquet", "5 fleurs"), ("2 bouquets", "10 fleurs"),
                                      ("3 bouquets", "16 fleurs")]):
            self.au_mot(mq)
            self.play(FadeIn(tb.valeur(0, c), scale=1.4), FadeIn(self.bouquets_sous(tb, c, c + 1), shift=DOWN * 0.2),
                      run_time=0.4)
            self.au_mot(mv)
            self.play(FadeIn(tb.valeur(1, c), scale=1.4), run_time=0.35)
        self.au_mot("Est-ce")
        q = self.t("Est-ce proportionnel ?", 44, ORANGE_RETENUE).move_to(P(-1.3, -1.55))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.pause_defi(y=-2.45)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        tb = self.table_bouquets(montrer=True)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.add(tb)
        self.play(Write(tit), run_time=0.5)
        ys = [-0.3, -1.15, -2.0]
        x = -3.3
        for c, (a, r, mots) in enumerate([("1 ×", "5", ("1 fois 5", "égale 5")), ("2 ×", "10", ("2 fois 5", "égale 10")),
                                          ("3 ×", "15", ("3 fois 5", "égale 15"))]):
            lg = self.ligne([(a, WHITE), ("5", AMBRE), ("=", WHITE), (r, VERT_OK if c < 2 else ORANGE_RETENUE)], 44)
            lg.move_to(P(0, ys[c])).align_to(P(x, 0), LEFT)
            self.au_mot(mots[0])
            self.play(tb.allumer(0, c), FadeIn(lg[0], shift=RIGHT * 0.2), run_time=0.25)
            self.play(FadeIn(lg[1], shift=RIGHT * 0.2), FadeIn(lg[2]), run_time=0.25)
            self.au_mot(mots[1])
            self.play(FadeIn(lg[3], scale=1.3), tb.eteindre(0, c), run_time=0.35)
            if c < 2:
                ok = self.coche(VERT_OK, 0.3).next_to(lg, RIGHT, buff=0.3)
                self.play(Create(ok), tb.allumer(1, c), run_time=0.3)
                self.play(tb.eteindre(1, c), run_time=0.2)
        self.au_mot("pas 16")
        n16 = self.ligne([("≠", ROUGE_ERREUR), ("16", ROUGE_ERREUR)], 44).next_to(lg, RIGHT, buff=0.3)
        self.play(FadeIn(n16, shift=LEFT * 0.2), Create(tb.barrer(1, 2)), run_time=0.4)
        self.au_mot("On ne multiplie pas")
        v = self.tampon("Pas proportionnel !", ROUGE_ERREUR, 44).move_to(P(-1.3, -2.95))
        self.play(FadeIn(v, scale=1.3), run_time=0.4)
        self.insister(v, 1.1, 0.25)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        tb = self.table_paniers(montrer=True, centre=ORIGIN)
        fig = VGroup(tb, tb.fleche_lat("× 2"))
        pas_audit(fig)
        self.cadrer(fig, gauche=-0.3, droite=5.0, haut=-1.95, bas=-3.4)  # en bas, sous les lignes
        self.add(fig)
        self.XL = -6.0  # CM : les lignes en GROS, à gauche ; la figure à droite
        lignes = self.finale_colonne(textes=[
            ("On multiplie toujours", "par le même nombre :", "proportionnel."),
            ("On ajoute, comme pour les âges :", "pas proportionnel."),
            ("Pour savoir, on vérifie", "chaque colonne.")], fs=40)
        del self.XL
        self.au_mot("Quand on multiplie")
        self.montrer_ligne(lignes[0], Indicate(fig[1], color=AMBRE))
        lignes[0][1][2].set_color(VERT_OK)
        self.au_mot("Quand on ajoute")
        self.montrer_ligne(lignes[1])
        lignes[1][1][1].set_color(ROUGE_ERREUR)
        self.au_mot("Pour savoir")
        self.montrer_ligne(lignes[2], LaggedStart(*[Indicate(tb.colonne(c), color=AMBRE) for c in range(3)],
                                                  lag_ratio=0.2))
        self.attendre_voix(marge=1.0)

    def construct(self):
        ecrans = [self.page_de_garde, self.ecran_situation, self.ecran_paniers, self.ecran_fois, self.ecran_dix,
                  self.ecran_question1, self.ecran_contre, self.ecran_piege, self.ecran_question2,
                  self.ecran_methode, self.ecran_defi, self.ecran_correction, self.ecran_finale]
        if os.environ.get("GARDE_SEULE") == "1":  # la garde CM2 seule (voir l'en-tête)
            ecrans[0]()
            return
        for e in ecrans:
            e()
        self.page_abonnement("12-abonne")


class PropReconnaitreCM1(PropReconnaitreBaseCM):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"


class PropReconnaitreCM2(PropReconnaitreBaseCM):
    identite = "Maths CM2 — EleveAI"
    ceinture = "jaune"
