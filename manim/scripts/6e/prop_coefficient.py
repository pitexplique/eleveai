# prop_coefficient.py
# EleveAI — Maths 6e — série « Proportionnalité », lot 1, épisode 03 :
# LE COEFFICIENT DE PROPORTIONNALITÉ (micro du coach : prop_coeff, notion
# prop_proportionnalite), AVEC VOIX. Paysage 16:9, CEINTURE VERTE (la paysage
# complète du niveau : situation, méthode du coefficient, le sens ÷ / ×, le
# piège « + 11 », 2 questions-pauses, défi corrigé). Short jumeau :
# prop_coefficient_short.py (blanche, le colibri).
# ⭐ Méthode travaillée : le COEFFICIENT. Il se VOIT : flèche latérale « × 12 »
# du haut vers le bas, « ÷ 12 » du bas vers le haut (le sens) ; on le TROUVE
# par une division (36 ÷ 3 = 12). ⛔ Pas de produit en croix (6e) ; « ÷ » partout.
# ⭐ Leurres (consigne-videos-proportionnalite.md) : 1. ajouter au lieu de
# multiplier (question 1 : 36 = 40 − 4 ; piège « + 11 » ; question 2 : 96 = 84 + 12,
# 72 = 84 − 12) ; 3. inverser / mauvais coefficient (question 1 : 4).
#
# Décor et métier : NATURE-ÉCOLOGIE, Léa, INGÉNIEURE DE L'EAU : une douche qui
# coule (minutes → litres), puis le robinet de la cantine qui goutte (défi).
# Centres d'intérêt : nature-ecologie, sciences.
# Donnée réelle (WebSearch, 31/10/2026) : « une douche coule environ 12 litres
# par minute » : débit d'une douche entre 12 et 20 L/min selon la douchette
# (Castorama, « Les économies d'eau dans la salle de bains ») ; pommeau
# classique 15 à 20 L/min (Kelwatt, Parc du Verdon), pommeau économe 6 à 9 L/min.
# 12 L/min est une valeur basse mais réelle (« environ ») : voix gardée.
#
# Micro → écrans : situation (01), le tableau × 12 (02), le coefficient nommé
# et utilisé (03), le trouver par une division (04), QUESTION 1 (05), le sens
# × / ÷ (06), le piège « + 11 » (07), QUESTION 2 (08), défi (09) et correction
# (09b), ce que tu as appris (10), fin (11).
#
# Voix : manim/voix/6e-prop-coefficient.json (validée par Frédéric, débit −10),
# WAV dans public/sons/6e-prop-coefficient/ ; marques mot à mot :
# manim/scripts/6e/prop_coefficient_marques.json (scripts/marques_dump.ps1 puis
# scripts/cues2marques.py).
# Outils : prop_commun.py + manim/canvas_proportion.py (pilote, non modifiés).
# Ajouté ICI (absent du module) : lea(), douche(), seau(), chrono(),
# robinet(), calendrier() (décors) et fleche_plus() (la flèche « + 11 » du
# piège = fleche_lat en rouge).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/prop_coefficient.py PropCoefficient6e
# python -m manim render -qh --disable_caching manim/scripts/6e/prop_coefficient.py PropCoefficient6e -o eleveai-maths-6e-prop-coefficient --media_dir manim/scripts/6e/media-prop-coefficient
# Sortie : manim/sorties/6e/maths/proportionnalite/03-coefficient/eleveai-maths-6e-prop-coefficient.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403

EAU = "#38bdf8"
EAU_FONCE = "#0284c7"
CHROME = "#cbd5e1"


def lea(s=1.0):
    """Léa, ingénieure de l'eau : tenue bleue, casque de chantier blanc, tablette."""
    p = personne(peau="#e0ac69", tenue="#1d4ed8", cheveux="#7c2d12", longs=True, s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    casque = VGroup(AnnularSector(inner_radius=0, outer_radius=r * 1.12, angle=PI, start_angle=0,
                                  fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.62),
                    RoundedRectangle(width=r * 2.6, height=r * 0.22, corner_radius=r * 0.08, fill_color=WHITE,
                                     fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.38))
    tab = RoundedRectangle(width=0.5 * s, height=0.65 * s, corner_radius=0.06 * s, fill_color="#0f172a",
                           fill_opacity=1, stroke_color=CHROME, stroke_width=3)
    ecran = Rectangle(width=0.38 * s, height=0.5 * s, fill_color=EAU, fill_opacity=0.9, stroke_width=0)
    goutte = Dot(radius=0.06 * s, color=WHITE)
    tablette = VGroup(tab, ecran, goutte).move_to(p.corps.get_center() + P(0.35 * s, 0.05 * s))
    p.add(casque, tablette)
    return p


def goutte(r=0.12, couleur=EAU):
    """Une goutte d'eau : un rond surmonté d'une pointe."""
    rond = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_width=0)
    pointe = Polygon(P(-r * 0.92, r * 0.35), P(r * 0.92, r * 0.35), P(0, r * 2.1), fill_color=couleur,
                     fill_opacity=1, stroke_width=0)
    return VGroup(rond, pointe)


def douche(h=3.0):
    """Le tuyau, le pommeau, et des filets d'eau qui tombent (le pommeau en haut,
    les filets descendent de h). .pommeau, .filets"""
    tuyau = VGroup(Line(P(-0.9, h / 2 + 0.35), P(-0.9, h / 2 + 0.75)), Line(P(-0.9, h / 2 + 0.75), P(0, h / 2 + 0.75)),
                   Line(P(0, h / 2 + 0.75), P(0, h / 2 + 0.45))).set_stroke(CHROME, 9)
    pommeau = Polygon(P(-0.45, h / 2), P(0.45, h / 2), P(0.18, h / 2 + 0.45), P(-0.18, h / 2 + 0.45),
                      fill_color=CHROME, fill_opacity=1, stroke_color="#64748b", stroke_width=3)
    filets = VGroup(*[DashedLine(P(x, h / 2 - 0.05), P(x * 1.6, -h / 2), dash_length=0.18, dashed_ratio=0.55,
                                 color=EAU, stroke_width=4) for x in (-0.33, -0.17, 0, 0.17, 0.33)])
    g = VGroup(tuyau, pommeau, filets)
    g.pommeau, g.filets = pommeau, filets
    return g


def couler(filets, vitesse=1.2):
    """Updater : les tirets des filets glissent vers le bas (l'eau coule)."""
    etat = {"t": 0.0}
    base = filets.copy()

    def maj(m, dt):
        etat["t"] = (etat["t"] + dt * vitesse) % 0.18
        for f, b in zip(m, base):
            d = b.get_end() - b.get_start()
            u = d / np.linalg.norm(d)
            f.become(b.copy().shift(u * etat["t"]))
    return maj


def seau(cap=12, graduer=(12,), larg=1.3, haut=1.6):
    """Un seau gradué (en litres). .eau (remplissage, hauteur 0 au départ),
    .niveau(v) → hauteur ; .etiquettes : les graduations écrites (« 12 L »)."""
    bord = VGroup(Line(P(-larg / 2, haut / 2), P(-larg * 0.4, -haut / 2)), Line(P(-larg * 0.4, -haut / 2), P(larg * 0.4, -haut / 2)),
                  Line(P(larg * 0.4, -haut / 2), P(larg / 2, haut / 2))).set_stroke(WHITE, 5)
    g = VGroup(bord)
    g.fond_y, g.haut, g.cap, g.larg = -haut / 2, haut, cap, larg
    g.etiquettes = VGroup()
    for v in graduer:
        y = -haut / 2 + haut * 0.85 * v / cap
        g.add(Line(P(larg * 0.32, y), P(larg * 0.48, y), color=WHITE, stroke_width=3))
        e = Text(f"{v} L", font_size=26, color=EAU)
        e.next_to(P(larg / 2, y), RIGHT, buff=0.12)
        g.etiquettes.add(e)
    g.eau = Rectangle(width=larg * 0.78, height=0.001, fill_color=EAU, fill_opacity=0.75, stroke_width=0)
    g.eau.move_to(P(0, -haut / 2), aligned_edge=DOWN)
    g.add(g.eau)
    return g


def remplir_seau(s, v):
    """Animation : l'eau du seau monte jusqu'à v litres."""
    h = s.haut * 0.85 * v / s.cap
    cible = Rectangle(width=s.larg * 0.78, height=h, fill_color=EAU, fill_opacity=0.75, stroke_width=0)
    cible.move_to(P(s.eau.get_center()[0], s.eau.get_bottom()[1]), aligned_edge=DOWN)
    return Transform(s.eau, cible)


def chrono(r=0.42):
    """Un chronomètre dessiné : cadran, bouton, aiguille."""
    cadran = Circle(radius=r, fill_color="#0f172a", fill_opacity=1, stroke_color=WHITE, stroke_width=5)
    bouton = RoundedRectangle(width=r * 0.45, height=r * 0.3, corner_radius=r * 0.06, fill_color=WHITE,
                              fill_opacity=1, stroke_width=0).next_to(cadran, UP, buff=0.02)
    aiguille = Line(ORIGIN, UP * r * 0.75, color=AMBRE, stroke_width=5)
    g = VGroup(cadran, bouton, aiguille)
    g.aiguille = aiguille
    return g


def robinet(s=1.0):
    """Le robinet de la cantine : bec chromé, poignée rouge ; .bec (où naît la goutte)."""
    tige = Rectangle(width=0.35, height=0.9, fill_color=CHROME, fill_opacity=1, stroke_width=0).move_to(P(-0.6, 0.15))
    bras = Rectangle(width=1.1, height=0.3, fill_color=CHROME, fill_opacity=1, stroke_width=0).move_to(P(-0.1, 0.45))
    bec = Rectangle(width=0.28, height=0.4, fill_color=CHROME, fill_opacity=1, stroke_width=0).move_to(P(0.3, 0.2))
    poignee = RoundedRectangle(width=0.7, height=0.18, corner_radius=0.08, fill_color="#dc2626", fill_opacity=1,
                               stroke_width=0).move_to(P(-0.6, 0.75))
    mur = Rectangle(width=0.2, height=1.6, fill_color="#64748b", fill_opacity=1, stroke_width=0).move_to(P(-0.85, 0.2))
    g = VGroup(mur, tige, bras, bec, poignee).scale(s)
    g.bec = bec
    return g


def tomber(gt, haut, bas, periode=1.0):
    """Updater : la goutte tombe du bec (haut) jusqu'à bas, en boucle."""
    etat = {"t": 0.0}

    def maj(m, dt):
        etat["t"] = (etat["t"] + dt) % periode
        a = etat["t"] / periode
        m.move_to(haut + (bas - haut) * a * a)
        m.set_opacity(1 if a < 0.92 else 0)
    return maj


class PropCoefficientBase(PaysageProp):
    nom_voix = "6e-prop-coefficient"
    fichier_marques = "prop_coefficient_marques.json"
    LIBS = ["Durée (min)", "Eau (L)"]

    def table_douche(self, valeurs=((1, 2, 5), (12, 24, 60)), centre=P(-0.9, 1.35), **kw):
        return TableauProp(self.LIBS, [list(v) for v in valeurs], montrer=False, centre=centre, **kw)

    def montrer_tout(self, tb, sauf=()):
        """Pose (sans jouer) toutes les valeurs déjà connues : données d'un écran précédent."""
        for r in range(tb.nl):
            for c in range(tb.nc):
                if (r, c) not in sauf and tb.valeurs[r][c] not in (None, "?"):
                    self.add(tb.valeur(r, c))

    def ligne_x(self, morceaux, y, x=-0.9, fs=44):
        return self.ligne(morceaux, fs).move_to(P(x, y))

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le coefficient de proportionnalité", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Le coefficient")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        tb = TableauProp(["Durée (min)", "Eau (L)"], [["?", "?"], ["?", "?"]], montrer=True, largeur_case=1.2,
                         largeur_libelle=2.6, fs=34, centre=P(-1.2, 0.35))
        fl = tb.fleche_lat("× ?")
        self.au_mot("Quel est")
        self.play(FadeIn(tb, shift=UP * 0.2), run_time=0.5)
        self.au_mot("nombre magique")
        self.play(Create(fl.fleche), FadeIn(fl.etiquette, scale=1.4), run_time=0.5)
        self.play(Circumscribe(fl.etiquette, color=AMBRE, buff=0.15), run_time=0.8)
        self.insister(fl.etiquette, 1.3, 0.25)
        self.attendre_voix(marge=0.6)

    # ── 01 : Léa, ingénieure de l'eau, et la douche ─────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = lea(1.1).move_to(P(-5.4, -0.9))
        dch = douche(3.0).move_to(P(-2.2, 0.55))
        sc = seau()
        d = P(-2.2, -2.15) - sc.get_center()
        sc.shift(d)
        sc.etiquettes.shift(d)
        self.au_mot("Voici Léa")
        nom = self.t("Léa", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("ingénieure")
        met = VGroup(self.t("ingénieure", 30, BLEU_CALCUL), self.t("de l'eau", 30, BLEU_CALCUL)).arrange(DOWN, buff=0.08)
        met.next_to(pers, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.5)
        self.au_mot("douche")
        self.play(FadeIn(VGroup(dch[0], dch[1]), shift=DOWN * 0.2), FadeIn(sc[0]), run_time=0.5)
        self.play(Create(dch.filets), run_time=0.5)
        dch.filets.add_updater(couler(dch.filets))
        ch = chrono().move_to(P(0.7, 1.6))
        self.au_mot("En 1 minute")
        l1 = self.ligne([("1 minute", WHITE), ("→", WHITE), ("12 litres", EAU)], 38)
        self.col(l1, 1.6, xl=ch.get_right()[0] + 0.35)
        if l1.get_right()[0] > 6.1:  # place pour l'agrandissement de « 12 litres »
            g = l1.get_left()[0]
            l1.scale_to_fit_width(6.1 - g).align_to(P(g, 0), LEFT)
        self.play(FadeIn(ch, scale=0.6), FadeIn(l1[0], shift=RIGHT * 0.2), FadeIn(l1[1]),
                  Rotate(ch.aiguille, -TAU, about_point=ch[0].get_center()), remplir_seau(sc, 12), run_time=1.4)
        self.au_mot("12 litres")
        self.play(FadeIn(l1[2], scale=1.3), FadeIn(sc.etiquettes, scale=1.3), run_time=0.4)
        self.insister(l1[2], 1.15, 0.25, about=l1[2].get_left())
        self.attendre_voix()
        dch.filets.clear_updaters()

    # ── 02 : le tableau de Léa (× 12) ───────────────────────────────────────
    def colonnes_eau(self, tb, cs=(0, 1, 2), base=-1.6, k=0.025):
        """Sous chaque colonne, une colonne d'eau haute comme les litres (12 → 24 → 60)."""
        out = []
        for c in cs:
            v = tb.valeurs[1][c]
            r = Rectangle(width=0.7, height=v * k, fill_color=EAU, fill_opacity=0.8, stroke_color=EAU_FONCE,
                          stroke_width=3)
            out.append(r.move_to(P(tb.x(c), base), aligned_edge=DOWN))
        return out

    def ecran_tableau(self):
        self.ecran("02-tableau")
        tb = self.table_douche()
        sol = Line(P(tb.x(0) - 0.8, -1.6), P(tb.x(2) + 0.8, -1.6), color=GREY_C, stroke_width=4)
        cols = self.colonnes_eau(tb)
        self.au_mot("remplit son tableau")
        self.play(FadeIn(tb.fond, shift=UP * 0.2), Create(sol), run_time=0.6)
        for c, (mq, mv) in enumerate([("1 minute", "12 litres"), ("2 minutes", "24 litres"), ("5 minutes", "60 litres")]):
            self.au_mot(mq)
            self.play(tb.allumer(0, c), FadeIn(tb.valeur(0, c), scale=1.4), run_time=0.35)
            self.au_mot(mv)
            self.play(FadeIn(tb.valeur(1, c), scale=1.4), tb.eteindre(0, c), GrowFromEdge(cols[c], DOWN), run_time=0.5)
        fl = tb.fleche_lat("× 12")
        self.au_mot("Pour passer")
        self.play(Create(fl.fleche), run_time=0.6)
        self.au_mot("multiplie toujours")
        phr = self.ligne([("On multiplie toujours par", WHITE), ("12", AMBRE)], 40).move_to(P(-0.9, -2.45))
        self.poser_lignes(phr, "fade", 0.35)
        self.play(FadeIn(fl.etiquette, scale=1.4), run_time=0.3)
        self.play(LaggedStart(*[Indicate(tb.colonne(c), color=AMBRE, scale_factor=1.08) for c in range(3)],
                              lag_ratio=0.3), run_time=1.0)
        self.attendre_voix()

    # ── 03 : le coefficient de proportionnalité ─────────────────────────────
    def table4(self, centre=P(-1.0, 1.55)):
        return self.table_douche(((1, 2, 5, 10), (12, 24, 60, 120)), centre=centre, largeur_case=1.3,
                                 largeur_libelle=2.8)

    def ecran_coefficient(self):
        self.ecran("03-coefficient")
        tb = self.table4()
        fl = tb.fleche_lat("× 12")
        self.add(tb.fond, fl)
        self.montrer_tout(tb, sauf=((0, 3), (1, 3)))
        self.au_mot("Ce nombre")
        self.play(Indicate(fl.etiquette, color=AMBRE, scale_factor=1.5), run_time=0.8)
        self.au_mot("coefficient de")
        v = self.tampon("coefficient de proportionnalité", AMBRE, 40).move_to(P(-1.0, -0.15))
        self.play(FadeIn(v, scale=1.3), run_time=0.45)
        self.insister(v, 1.1, 0.25)
        self.au_mot("toutes les cases")
        self.play(LaggedStart(*[Indicate(tb.colonne(c), color=AMBRE, scale_factor=1.08) for c in range(3)],
                              lag_ratio=0.25), run_time=0.9)
        self.au_mot("10 minutes")
        self.play(FadeIn(tb.valeur(0, 3), scale=1.4), FadeIn(tb.trou(1, 3)), tb.allumer(0, 3), run_time=0.4)
        lg = self.ligne([("10 ×", WHITE), ("12", AMBRE), ("=", WHITE), ("120 L", VERT_OK)], 46).move_to(P(-1.0, -1.45))
        self.poser_lignes(VGroup(*lg[:3]), "fade", 0.3)
        self.au_mot("120 litres")
        self.play(FadeIn(lg[3], scale=1.3), tb.remplir(1, 3), tb.eteindre(0, 3), run_time=0.45)
        self.play(tb.allumer(1, 3), run_time=0.3)
        self.attendre_voix()

    # ── 04 : trouver le coefficient (une division) ──────────────────────────
    def ecran_trouver(self):
        self.ecran("04-trouver")
        self.au_mot("Et si")
        tit = self.t("Trouver le coefficient", 44, JAUNE_TITRE).move_to(P(-0.2, 3.1))
        self.play(Write(tit), run_time=0.6)
        dch = douche(2.2).scale(0.75).move_to(P(-5.6, 0.9))
        tb = self.table_douche(((3,), (36,)), centre=P(-2.75, 1.2), largeur_libelle=2.8)
        self.au_mot("Une autre douche")
        self.play(FadeIn(dch, shift=DOWN * 0.2), FadeIn(tb.fond), run_time=0.5)
        self.au_mot("36 litres")
        self.play(FadeIn(tb.valeur(1, 0), scale=1.4), run_time=0.35)
        self.au_mot("3 minutes")
        self.play(FadeIn(tb.valeur(0, 0), scale=1.4), run_time=0.35)
        fl = tb.fleche_lat("× ?")
        l1 = self.ligne([("3 ×", WHITE), ("?", ORANGE_RETENUE), ("=", WHITE), ("36", WHITE)], 46)
        self.col(l1, 1.2, xl=1.9)
        self.au_mot("3 fois combien")
        self.play(Create(fl.fleche), FadeIn(l1[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("combien")
        self.play(FadeIn(fl.etiquette, scale=1.4), FadeIn(l1[1], scale=1.3), run_time=0.35)
        self.au_mot("égale 36")
        self.play(FadeIn(l1[2]), FadeIn(l1[3], shift=RIGHT * 0.2), run_time=0.35)
        l2 = self.ligne([("36 ÷ 3", WHITE), ("=", WHITE), ("12", VERT_OK)], 46)
        self.col(l2, 0.05, xl=1.9)
        self.au_mot("36 divisé")
        self.play(FadeIn(l2[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 12")
        self.play(FadeIn(l2[1]), FadeIn(l2[2], scale=1.3), run_time=0.35)
        v = self.tampon("Le coefficient est 12.", AMBRE, 42)
        self.col(v, -1.35, xl=-3.2)
        self.au_mot("Le coefficient est")
        e12 = Text("× 12", font_size=fl.etiquette.font_size, color=AMBRE, weight=BOLD).move_to(fl.etiquette)
        self.play(FadeIn(v, scale=1.3), Transform(fl.etiquette, e12), run_time=0.45)
        self.insister(v, 1.1, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (4 minutes : 40 litres ; le coefficient ?) ──────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        deco = VGroup(lea(1.0).move_to(P(-5.4, -0.9)), douche(3.0).move_to(P(-2.4, 0.4)))
        self.add(deco)
        tb = self.table_douche(((4,), (40,)), centre=P(-3.3, 0.6), largeur_libelle=2.8)
        fl = tb.fleche_lat("× 10")

        def apres(sc):
            sc.play(FadeOut(deco), FadeIn(tb.fond), run_time=0.3)
            l0 = sc.ligne_rep(0, ["40 ÷", "4 =", "10."])
            l1 = sc.ligne_rep(1, ["On vérifie :", "4 ×", "10 =", "40."])
            sc.au_mot("40 divisé")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), FadeIn(tb.valeur(1, 0), scale=1.4), run_time=0.3)
            sc.au_mot("par 4")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), FadeIn(tb.valeur(0, 0), scale=1.4), run_time=0.3)
            sc.au_mot("égale 10")
            sc.play(FadeIn(l0[2], scale=1.3), Create(fl.fleche), FadeIn(fl.etiquette, scale=1.3), run_time=0.4)
            sc.au_mot("On vérifie")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("4 fois")
            sc.play(FadeIn(l1[1], shift=UP * 0.15), tb.allumer(0, 0), run_time=0.3)
            sc.au_mot("10, égale")
            sc.play(FadeIn(l1[2], shift=UP * 0.15), Indicate(fl.etiquette, color=AMBRE), run_time=0.3)
            sc.au_mot("40.", 1)
            sc.play(FadeIn(l1[3], scale=1.3), tb.allumer(1, 0), run_time=0.3)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["4 minutes de douche : 40 litres.", "Quel est le coefficient ?"],
                            [self.t("36", 34), self.t("10", 34), self.t("4", 34)], 1,
                            ["40 ÷ 4 = 10.", "On vérifie : 4 × 10 = 40."], mot_q="4 minutes", autres_r=apres)

    # ── 06 : attention au sens (× 12 en descendant, ÷ 12 en remontant) ──────
    def ecran_sens(self):
        self.ecran("06-sens")
        self.au_mot("Attention")
        tit = self.t("Attention au sens !", 44, ROUGE_ERREUR).move_to(P(-0.2, 3.1))
        self.play(Write(tit), run_time=0.5)
        tb = self.table_douche(((1, 2, "?"), (12, 24, 60)), centre=P(-0.2, 1.35))
        self.add(tb.fond, tb.trou(0, 2))
        self.montrer_tout(tb)
        bas = tb.fleche_lat("× 12")
        haut = tb.fleche_lat("÷ 12", sens="haut", cote=LEFT, couleur=FLECHE_COL)
        self.au_mot("Du haut vers le bas")
        lb = self.t("du haut vers le bas", 28, AMBRE).next_to(tb.carte, DOWN, buff=0.2).align_to(bas, RIGHT)
        self.play(Create(bas.fleche), FadeIn(lb), run_time=0.6)
        self.au_mot("par 12")
        self.play(FadeIn(bas.etiquette, scale=1.4), run_time=0.35)
        self.au_mot("Pour remonter")
        lh = self.t("du bas vers le haut", 28, FLECHE_COL).next_to(tb.carte, DOWN, buff=0.2).align_to(haut, LEFT)
        self.play(Create(haut.fleche), FadeIn(lh), run_time=0.6)
        self.au_mot("divise par 12")
        self.play(FadeIn(haut.etiquette, scale=1.4), run_time=0.35)
        self.insister(haut.etiquette, 1.3, 0.25)
        self.au_mot("60 litres")
        self.play(tb.allumer(1, 2), run_time=0.35)
        lg = self.ligne([("60 ÷", WHITE), ("12", FLECHE_COL), ("=", WHITE), ("5 min", VERT_OK)], 46)
        lg.move_to(P(-0.2, -1.2))
        self.au_mot("60 divisé")
        self.poser_lignes(VGroup(*lg[:3]), "fade", 0.3)
        self.au_mot("5 minutes")
        self.play(FadeIn(lg[3], scale=1.3), tb.remplir(0, 2, 5), run_time=0.45)
        self.play(tb.allumer(0, 2), Indicate(haut.fleche, color=FLECHE_COL), run_time=0.5)
        self.attendre_voix()

    # ── 07 : le piège : on n'ajoute pas ! ───────────────────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.au_mot("Le piège")
        tit = self.t("Le piège : ajouter", 44, ROUGE_ERREUR).move_to(P(-0.2, 3.1))
        self.play(Write(tit), run_time=0.5)
        tb = self.table_douche(((1, 2), (12, "?")), centre=P(-2.7, 1.25), largeur_libelle=2.8)
        self.play(FadeIn(tb.fond), run_time=0.3)
        self.au_mot("1 minute")
        self.play(FadeIn(tb.valeur(0, 0), scale=1.4), run_time=0.3)
        self.au_mot("12 litres")
        self.play(FadeIn(tb.valeur(1, 0), scale=1.4), run_time=0.3)
        plus = tb.fleche_lat("+ 11", couleur=ROUGE_P)
        self.au_mot("on n'ajoute pas")
        self.play(Create(plus.fleche), run_time=0.4)
        self.au_mot("11")
        self.play(FadeIn(plus.etiquette, scale=1.4), run_time=0.3)
        lg = self.ligne([("2", ROUGE_P), ("+ 11 =", ROUGE_P), ("13 L", ROUGE_P)], 44)
        lg[1]._pas_audit = lg[1].sans_synchro = True  # rappel de la flèche « + 11 »
        self.col(lg, 1.6, xl=2.85)
        self.au_mot("2 minutes")
        self.play(FadeIn(tb.valeur(0, 1), scale=1.4), FadeIn(lg[0], shift=RIGHT * 0.2), FadeIn(lg[1], shift=RIGHT * 0.2),
                  run_time=0.35)
        self.au_mot("13 litres")
        v13 = tb.poser(1, 1, 13, ROUGE_P)
        self.play(FadeIn(lg[2], scale=1.3), FadeIn(v13, scale=1.4), run_time=0.4)
        self.au_mot("Faux")
        x13 = tb.barrer(1, 1)
        xp = croix(plus, sw=7)
        fx = self.t("Faux !", 44, ROUGE_ERREUR)
        self.col(fx, 0.85, xl=2.85)
        self.play(Create(x13), Create(xp), FadeIn(fx, scale=1.3), run_time=0.45)
        self.au_mot("24 litres")
        l2 = self.ligne([("2 ×", WHITE), ("12", AMBRE), ("=", WHITE), ("24 L", VERT_OK)], 44)
        for m in l2[:3]:
            m._pas_audit = m.sans_synchro = True  # rappel du tableau (2 minutes, 12 litres)
        self.col(l2, 0.05, xl=2.85)
        v24 = tb.poser(1, 1, 24)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), FadeOut(v13), FadeOut(x13), FadeIn(v24, scale=1.4), run_time=0.45)
        self.play(tb.allumer(1, 1), run_time=0.3)
        self.au_mot("Le coefficient se")
        v = self.tampon("Le coefficient se multiplie toujours.", AMBRE, 34).move_to(P(-0.8, -1.5))
        self.play(FadeIn(v, scale=1.3), run_time=0.45)
        self.insister(v, 1.08, 0.25)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (coefficient 12 ; 84 litres → ? minutes) ────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        deco = VGroup(lea(1.0).move_to(P(-5.4, -0.9)), douche(3.0).move_to(P(-2.4, 0.4)))
        self.add(deco)
        tb = self.table_douche((("?",), (84,)), centre=P(-3.6, 0.6), largeur_libelle=2.8)
        fl = tb.fleche_lat("÷ 12", sens="haut", couleur=FLECHE_COL)

        def apres(sc):
            sc.play(FadeOut(deco), FadeIn(tb.fond), FadeIn(tb.trou(0, 0)), run_time=0.3)
            l0 = sc.ligne_rep(0, ["On remonte,", "donc on divise :"])
            l1 = sc.ligne_rep(1, ["84 ÷", "12 =", "7 minutes."])
            sc.au_mot("On remonte")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), Create(fl.fleche), run_time=0.35)
            sc.au_mot("donc on divise")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("84")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), FadeIn(tb.valeur(1, 0), scale=1.4), run_time=0.3)
            sc.au_mot("par 12")
            sc.play(FadeIn(l1[1], shift=UP * 0.15), FadeIn(fl.etiquette, scale=1.3), run_time=0.3)
            sc.au_mot("7 minutes")
            sc.play(FadeIn(l1[2], scale=1.3), tb.remplir(0, 0, 7), run_time=0.4)
            sc.play(tb.allumer(0, 0), run_time=0.3)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse",
                            ["Le coefficient est 12.", "Combien de minutes pour 84 litres ?"],
                            [self.t("7 minutes", 34), self.t("72 minutes", 34), self.t("96 minutes", 34)], 0,
                            ["On remonte, donc on divise :", "84 ÷ 12 = 7 minutes."], mot_q="Le coefficient",
                            autres_r=apres)

    # ── 09 : défi : le robinet de la cantine ────────────────────────────────
    LIBS_R = ["Durée (jours)", "Eau perdue (L)"]

    def table_robinet(self):
        return TableauProp(self.LIBS_R, [[2, 30], [6, "?"]], montrer=False, largeur_case=1.5,
                           largeur_libelle=3.3, fs=36, centre=P(0.2, 1.45))

    def deco_robinet(self, animer=True):
        rb = robinet(1.1).move_to(P(-5.2, 1.6))
        haut = rb.bec.get_bottom() + DOWN * 0.15
        bas = haut + DOWN * 1.6
        flaque = Ellipse(width=1.0, height=0.22, fill_color=EAU, fill_opacity=0.6, stroke_width=0).move_to(bas + DOWN * 0.15)
        gt = goutte(0.1).move_to(haut)
        if animer:
            gt.add_updater(tomber(gt, haut, bas, 1.1))
        return VGroup(rb, flaque, gt)

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.play(Write(tit), run_time=0.6)
        deco = self.deco_robinet()
        tb = self.table_robinet()
        self.au_mot("robinet")
        self.play(FadeIn(deco[:2], shift=DOWN * 0.2), run_time=0.5)
        self.add(deco[2])
        self.au_mot("goutte")
        self.play(FadeIn(tb.fond, shift=UP * 0.2), run_time=0.4)
        self.au_mot("6 litres")
        self.play(FadeIn(tb.valeur(1, 0), scale=1.4), run_time=0.35)
        self.au_mot("2 jours")
        self.play(FadeIn(tb.valeur(0, 0), scale=1.4), run_time=0.35)
        self.au_mot("Quel est")
        q1 = self.t("Quel est le coefficient ?", 38, ORANGE_RETENUE).move_to(P(0.2, -0.3))
        self.play(FadeIn(q1, shift=UP * 0.2), FadeIn(tb.trou(1, 1)), run_time=0.4)
        q2 = self.ligne([("Combien de litres", ORANGE_RETENUE), ("en 30 jours ?", ORANGE_RETENUE)], 38, buff=0.18)
        q2[1].align_to(q2[0], UP)
        q2.move_to(P(0.2, -1.1))
        self.au_mot("Combien")
        self.play(FadeIn(q2[0], shift=UP * 0.2), run_time=0.35)
        self.au_mot("30 jours")
        self.play(FadeIn(q2[1], shift=UP * 0.2), FadeIn(tb.valeur(0, 1), scale=1.4), run_time=0.4)
        self.pause_defi(y=-2.0)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        deco = self.deco_robinet()
        tb = self.table_robinet()
        self.add(deco, tb.fond, tb.trou(1, 1))
        self.montrer_tout(tb)
        self.play(Write(tit), run_time=0.5)
        lat = tb.fleche_lat("× 3")
        l1 = self.ligne([("6 ÷ 2", WHITE), ("=", WHITE), ("3", AMBRE)], 44).move_to(P(-1.3, -0.3))
        self.au_mot("6 divisé")
        self.play(FadeIn(l1[0], shift=RIGHT * 0.2), tb.allumer(1, 0), tb.allumer(0, 0), run_time=0.35)
        self.au_mot("égale 3")
        self.play(FadeIn(l1[1]), FadeIn(l1[2], scale=1.3), run_time=0.3)
        self.au_mot("le coefficient est")
        k = self.t(": coefficient 3", 40, AMBRE).next_to(l1, RIGHT, buff=0.3)
        self.play(FadeIn(k, shift=RIGHT * 0.2), Create(lat.fleche), FadeIn(lat.etiquette, scale=1.3),
                  tb.eteindre(1, 0), tb.eteindre(0, 0), run_time=0.5)
        l2 = self.ligne([("30 ×", WHITE), ("3", AMBRE), ("=", WHITE), ("90 L", VERT_OK)], 44).move_to(P(-1.3, -1.2))
        self.au_mot("30 fois")
        self.poser_lignes(VGroup(*l2[:3]), "fade", 0.3)
        self.au_mot("90 litres")
        self.play(FadeIn(l2[3], scale=1.3), tb.remplir(1, 1, 90), run_time=0.45)
        self.play(tb.allumer(1, 1), run_time=0.3)
        self.insister(l2[3], 1.25, 0.25)
        self.au_mot("Il faut")
        rep = self.tampon("Il faut réparer ce robinet !", ROUGE_ERREUR, 38).move_to(P(-0.6, -2.3))
        self.play(FadeIn(rep, scale=1.3), run_time=0.45)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        tb = self.table_douche(centre=ORIGIN, largeur_case=1.2, largeur_libelle=2.6)
        vals = VGroup(*[tb.valeur(r, c) for r in range(2) for c in range(3)])
        fig = VGroup(tb, tb.fleche_lat("× 12"), tb.fleche_lat("÷ 12", sens="haut", cote=LEFT, couleur=FLECHE_COL), vals)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Le coefficient : on multiplie", "la ligne du haut par lui", "pour obtenir celle du bas."),
            ("On le trouve par une division.",),
            ("Pour remonter, on divise", "par ce coefficient.")], fs=36)
        self.au_mot("Le coefficient")
        self.montrer_ligne(lignes[0], Indicate(fig[1], color=AMBRE))
        self.au_mot("On le trouve")
        self.montrer_ligne(lignes[1])
        self.au_mot("Pour remonter")
        self.montrer_ligne(lignes[2], Indicate(fig[2], color=FLECHE_COL))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tableau()
        self.ecran_coefficient()
        self.ecran_trouver()
        self.ecran_question1()
        self.ecran_sens()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class PropCoefficient6e(PropCoefficientBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
