# prop_echelle_plan.py
# EleveAI — Maths 6e ET 4e — série « Proportionnalité », lot 2 (échelles),
# épisode COMMUN 09 : DE LA RÉALITÉ VERS LE PLAN (micro du coach :
# echelle_distance_plan, notion prop_echelle), AVEC VOIX. Paysage 16:9,
# CEINTURE VERTE (la paysage complète du niveau : situation, méthode, piège,
# 2 questions-pauses, défi corrigé). Short jumeau : prop_echelle_plan_short.py
# (blanche, rendu une fois, copié sous les deux classes).
# ⭐ « Une voix, un script, deux rendus » (modèle stmg/proba_probaC_notation.py) :
# PropEchellePlan6e / PropEchellePlan4e ne changent que l'identité ; la voix
# ne cite aucune classe.
# ⭐ Méthode travaillée : le COEFFICIENT de l'échelle (ce que vaut 1 cm) — de
# la réalité vers le plan, on DIVISE (« combien de fois 10 m dans 70 m ? ») ;
# une longueur qui ne tombe pas juste = deux morceaux (7 cm + un demi-cm).
# ⛔ Pas de produit en croix. « ÷ » pour chaque division.
# ⭐ Le geste (canvas `echelle` du coach, lib/canvas/EchelleCanvas.tsx) : carte
# blanche, PLAN court en bleu (en haut), RÉALITÉ longue en vert (en bas), la
# flèche ambre REMONTE de la réalité vers le plan, l'opération écrite dessus
# (« ÷ 10 »).
# ⭐ Leurres (consigne-videos-proportionnalite.md, erreur 5 « échelle à
# l'envers » et erreur 1 « ajouter ») : question 1 : 400 cm = 40 × 10
# (multiplier), 30 cm = 40 − 10 ; question 2 : 120 cm = 30 × 4, 26 cm = 30 − 4 ;
# écran 06 : « 700 cm » barré (7 mètres de dessin).
#
# Décor et métier : NATURE / ART, Hugo, PAYSAGISTE : le jardin de l'école
# (70 m, 1 cm ↔ 10 m), un mur (40 m, 24 m à 1 cm ↔ 8 m), un trajet sur une
# carte (30 km, 1 cm ↔ 4 km), le potager (30 m × 15 m, 1 cm ↔ 5 m). Lieux et
# échelles inventés : aucun chiffre du monde réel dans la paysage.
# Centres d'intérêt : nature-ecologie, art-design.
#
# Micro → écrans : de la réalité vers le plan (01, 02) ; le tableau m → cm
# « ÷ 10 » (03) ; QUESTION 1 (04) ; une autre échelle (05) ; le piège « il a
# multiplié » (06) ; QUESTION 2, longueur à virgule (07) ; défi (08) et
# correction (08b) ; ce que tu as appris (09) ; fin (10).
#
# Voix : manim/voix/commun-prop-echelle-plan.json (validée par Frédéric, débit
# −10), WAV dans public/sons/commun-prop-echelle-plan/ ; marques mot à mot :
# manim/scripts/6e/prop_echelle_plan_marques.json (scripts/marques_dump.ps1
# puis scripts/cues2marques.py).
# Outils : prop_commun.py + manim/canvas_proportion.py (non modifiés) ; la
# figure Correspondance, cartouche() et gras() sont IMPORTÉES (sans les
# modifier) de prop_echelle_reelle.py (épisode 08). EchelleCarte du module
# n'est pas utilisée (échelle « 1 cm pour 25 000 cm » seulement, segment de
# longueur fixe, texte d'échelle jamais ajouté : voir le rapport).
# Ajouté ICI : PlanReel (Correspondance + la flèche qui REMONTE), hugo(),
# jardin(), potager(), classe_salle().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/prop_echelle_plan.py PropEchellePlan6e
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/6e/prop_echelle_plan.py PropEchellePlan6e -o eleveai-maths-6e-prop-echelle-plan --media_dir manim/media-prop-09
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/6e/prop_echelle_plan.py PropEchellePlan4e -o eleveai-maths-4e-prop-echelle-plan --media_dir manim/media-prop-09
# Sorties : manim/sorties/6e/maths/proportionnalite/09-echelle-plan/eleveai-maths-6e-prop-echelle-plan.mp4
#           manim/sorties/4e/maths/proportionnalite/09-echelle-plan/eleveai-maths-4e-prop-echelle-plan.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403
from prop_echelle_reelle import (AMBRE_F, AMBRE_T, BLEU_P, BLEU_P2, ENCRE, VERT_R,  # noqa: E402,F401
                                 VERT_R2, Correspondance, carte_awa, cartouche, gras)

VERT_H = "#15803d"   # la tenue d'Hugo


def hugo(s=1.0):
    """Hugo, paysagiste : tenue verte, chapeau de paille, une petite pousse."""
    p = personne(peau="#e0ac69", tenue=VERT_H, cheveux="#78350f", s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    bord = Ellipse(width=r * 3.0, height=r * 0.5, fill_color="#fde047", fill_opacity=1,
                   stroke_color="#a16207", stroke_width=2).move_to(c + UP * r * 0.75)
    calot = RoundedRectangle(width=r * 1.5, height=r * 0.8, corner_radius=r * 0.3, fill_color="#fde047",
                             fill_opacity=1, stroke_color="#a16207", stroke_width=2).move_to(c + UP * r * 1.1)
    ruban = Rectangle(width=r * 1.5, height=r * 0.18, fill_color="#16a34a", fill_opacity=1,
                      stroke_width=0).move_to(c + UP * r * 0.88)
    cc = p.corps.get_center()
    pot = Polygon(P(-0.2, 0), P(0.2, 0), P(0.15, -0.3), P(-0.15, -0.3), fill_color="#c2410c", fill_opacity=1,
                  stroke_width=0).scale(s).move_to(cc + P(0.75, -0.1) * s)
    feuilles = VGroup(*[Ellipse(width=0.16 * s, height=0.32 * s, fill_color="#22c55e", fill_opacity=1, stroke_width=0)
                        .rotate(a).move_to(pot.get_top() + P(0.07 * np.sign(a), 0.14) * s) for a in (0.5, -0.5)])
    p.add(calot, bord, ruban, pot, feuilles)
    return p


def arbre(r=0.18, couleur="#15803d"):
    return VGroup(Rectangle(width=r * 0.35, height=r * 0.7, fill_color="#92400e", fill_opacity=1, stroke_width=0)
                  .shift(DOWN * r * 0.9), Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_width=0))


def jardin(l=5.2, h=3.0):
    """Le jardin de l'école vu d'en haut : pelouse, allée, massifs fleuris,
    arbres. .fond : la pelouse seule (à faire apparaître d'abord)."""
    fond = RoundedRectangle(width=l, height=h, corner_radius=0.2, fill_color="#bbf7d0", fill_opacity=1,
                            stroke_color="#16a34a", stroke_width=4)
    g = VGroup(fond)
    g.add(VMobject(stroke_color="#d6a35c", stroke_width=14).set_points_smoothly(
        [P(-l * 0.5 + 0.1, -h * 0.05), P(-l * 0.15, h * 0.12), P(l * 0.15, -h * 0.12), P(l * 0.5 - 0.1, h * 0.05)]))
    for x, y, col in ((-0.3, 0.28, "#f472b6"), (0.22, 0.3, "#facc15"), (0.0, -0.3, "#fb923c")):
        g.add(Ellipse(width=l * 0.16, height=h * 0.16, fill_color="#86efac", fill_opacity=1,
                      stroke_color="#16a34a", stroke_width=2).move_to(P(l * x, h * y)))
        for k in range(5):
            a = k * TAU / 5
            g.add(Dot(P(l * x + 0.22 * np.cos(a) * l / 5.2, h * y + 0.12 * np.sin(a) * h / 3), radius=0.05,
                      color=col))
    for x, y in ((-0.42, -0.3), (0.42, -0.28), (0.4, 0.3), (-0.42, 0.32)):
        g.add(arbre(0.17).move_to(P(l * x, h * y)))
    g.fond = fond
    return g


def potager(l=4.4, h=2.2):
    """Le potager rectangulaire : terre, rangs de légumes. .fond : la terre."""
    fond = Rectangle(width=l, height=h, fill_color="#c08552", fill_opacity=1, stroke_color="#78350f",
                     stroke_width=4)
    g = VGroup(fond)
    for j in range(4):
        y = -h / 2 + (j + 0.5) * h / 4
        g.add(Line(P(-l / 2 + 0.15, y), P(l / 2 - 0.15, y), color="#92400e", stroke_width=3))
        for i in range(9):
            g.add(Circle(radius=0.09, fill_color="#16a34a" if (i + j) % 2 else "#4ade80", fill_opacity=1,
                         stroke_width=0).move_to(P(-l / 2 + (i + 0.5) * l / 9, y + 0.08)))
    g.fond = fond
    return g


def classe_salle(l=4.6, h=2.6):
    """La salle de classe vue de face : murs, tableau, porte, une table."""
    mur = Rectangle(width=l, height=h, fill_color="#fef3c7", fill_opacity=1, stroke_color="#a16207",
                    stroke_width=4)
    tab = Rectangle(width=l * 0.4, height=h * 0.3, fill_color="#14532d", fill_opacity=1, stroke_color="#78350f",
                    stroke_width=3).move_to(P(-l * 0.08, h * 0.2))
    porte = Rectangle(width=l * 0.12, height=h * 0.55, fill_color="#b45309", fill_opacity=1,
                      stroke_width=0).move_to(P(l * 0.38, -h * 0.225))
    table = VGroup(Rectangle(width=l * 0.3, height=0.08, fill_color="#92400e", fill_opacity=1, stroke_width=0)
                   .move_to(P(-l * 0.1, -h * 0.2)),
                   *[Line(P(-l * 0.1 + d * l * 0.13, -h * 0.2), P(-l * 0.1 + d * l * 0.13, -h * 0.5),
                          color="#92400e", stroke_width=4) for d in (-1, 1)])
    g = VGroup(mur, tab, porte, table)
    g.mur, g.table = mur, table
    return g


class PlanReel(Correspondance):
    """La figure du coach de l'épisode 08, avec la flèche qui REMONTE : du
    bout de la réalité (en bas, vert) vers le bout du plan (en haut, bleu)."""

    def monte(self, s, a_reel, a_plan, couleur=AMBRE_F):
        d = P(self.xr(a_reel) + 0.3, self.y_r + 0.2)
        f = P(self.xp(a_plan) + 0.25, self.y_p - 0.2)
        fl = CurvedArrow(d, f, angle=0.9, color=couleur, stroke_width=6, tip_length=0.22)
        et = gras(s, self.fs + 2, AMBRE_T)
        et.next_to(fl.point_from_proportion(0.5), RIGHT, buff=0.22)
        droite = self.carte.get_right()[0] - 0.12
        if et.get_right()[0] > droite:
            et.shift(LEFT * (et.get_right()[0] - droite))
        g = VGroup(fl, et)
        g.fleche, g.etiquette = fl, et
        return g


class PropEchellePlanBase(PaysageProp):
    nom_voix = "commun-prop-echelle-plan"
    fichier_marques = "prop_echelle_plan_marques.json"

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

    def lc(self, morceaux, y, fs=40, xl=1.3):
        """Une ligne de la colonne de droite (non jouée)."""
        return self.col(self.ligne(morceaux, fs), y, xl)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("De la réalité vers le plan", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("De la réalité")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        q = VGroup(self.t("Comment dessiner", 38), self.t("un grand terrain", 38, VERT_OK),
                   self.t("sur une petite feuille ?", 38, BLEU_CALCUL)).arrange(DOWN, buff=0.16).move_to(P(3.4, 0.25))
        jd = jardin(4.6, 2.6).move_to(P(-3.2, 0.25))
        self.au_mot("Comment dessiner")
        self.play(FadeIn(q[0], shift=UP * 0.15), run_time=0.4)
        self.au_mot("un grand terrain")
        self.play(FadeIn(q[1], scale=1.2), FadeIn(jd, scale=0.9), run_time=0.6)
        feuille = Rectangle(width=1.5, height=1.05, fill_color=WHITE, fill_opacity=1, stroke_color="#94a3b8",
                            stroke_width=3).move_to(P(-1.3, -0.75))
        mini = jd.copy()
        self.au_mot("petite feuille")
        self.play(FadeIn(q[2], shift=UP * 0.15), FadeIn(feuille, scale=0.8), run_time=0.45)
        self.play(mini.animate.scale_to_fit_width(1.25).move_to(feuille), jd.animate.set_opacity(0.35), run_time=1.0)
        self.play(Indicate(feuille, color=BLEU_CALCUL, scale_factor=1.15), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Hugo, paysagiste, et le jardin de l'école ──────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = hugo(0.95).move_to(P(-5.7, -0.85))
        self.au_mot("Voici Hugo")
        nom = self.t("Hugo", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("paysagiste")
        met = self.t("paysagiste", 30, BLEU_CALCUL).next_to(pers, DOWN, buff=0.2)
        met.shift(RIGHT * max(0, -6.45 - met.get_left()[0]))
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        jd = jardin(5.0, 2.9).move_to(P(-1.6, 0.75))
        self.au_mot("dessine des jardins")
        self.play(FadeIn(jd.fond, scale=0.9), run_time=0.4)
        self.play(LaggedStart(*[FadeIn(m, scale=0.8) for m in jd[1:]], lag_ratio=0.05), run_time=1.0)
        L1 = self.lc([("Jardin :", WHITE), ("70 m", VERT_OK)], 1.05, xl=1.75)
        self.au_mot("Le jardin")
        self.play(FadeIn(L1[0], shift=RIGHT * 0.2), Indicate(jd.fond, color="#4ade80", scale_factor=1.03),
                  run_time=0.5)
        acc = Brace(jd.fond, DOWN, color=VERT_R, buff=0.08)
        l70 = gras("70 m", 36, "#4ade80").next_to(acc, DOWN, buff=0.06)
        self.au_mot("70 m")
        self.play(GrowFromCenter(acc), FadeIn(l70, scale=1.3), FadeIn(L1[1], scale=1.3), run_time=0.5)
        self.insister(l70, 1.2, 0.2)
        car = cartouche("1 cm", "10 m", 40)
        self.col(car, 2.4, 1.75)
        self.au_mot("1 cm")
        self.play(Create(car.cadre), FadeIn(car.cm, scale=1.3), run_time=0.4)
        self.au_mot("10 m")
        self.play(FadeIn(car.fl, shift=RIGHT * 0.2), FadeIn(car.reel, scale=1.3), run_time=0.4)
        self.insister(car, 1.12, 0.2)
        L2 = self.lc([("Sur le plan :", WHITE), ("? cm", ORANGE_RETENUE)], -0.05, xl=1.75)
        L2[0].sans_synchro = True   # « plan » vient d'être dit (« Sur son plan »)
        L2[1].sans_synchro = True
        self.au_mot("Combien de cm")
        self.play(FadeIn(L2, shift=RIGHT * 0.2), run_time=0.4)
        self.play(Indicate(L2[1], color=ORANGE_RETENUE, scale_factor=1.3), run_time=0.6)
        self.attendre_voix()

    # ── 02 : de la réalité vers le plan, on divise ──────────────────────────
    def ecran_diviser(self):
        self.ecran("02-diviser")
        co = PlanReel(0.3, 0.05, centre=P(-2.9, 0.35))
        r70 = co.reel(0, 70)
        self.au_mot("De la réalité")
        self.play(FadeIn(co.fond, shift=UP * 0.2), Create(r70), run_time=0.6)
        pp = self.col(self.t("Tout devient plus petit :", 36), 2.65, 1.3)
        self.au_mot("tout devient plus petit")
        self.play(FadeIn(pp, shift=RIGHT * 0.2), run_time=0.4)
        fl = co.monte("÷ 10", 70, 7)
        tit = self.col(self.t("on divise !", 46, AMBRE), 1.95, 1.3)
        self.au_mot("on divise")
        self.play(Write(tit), Create(fl.fleche), run_time=0.6)
        L1 = self.lc([("10 m", VERT_OK), ("dans", WHITE), ("70 m ?", VERT_OK)], 1.0)
        morceaux = [co.reel(10 * k, 10 * (k + 1), VERT_R if k % 2 == 0 else VERT_H, bouts=False) for k in range(7)]
        labs = [co.lab_r(10 * k, 10 * (k + 1), "10", fs=19, dessus=True) for k in range(7)]
        self.au_mot("10 m dans")
        self.play(FadeIn(L1[0], scale=1.3), FadeOut(r70),
                  LaggedStart(*[AnimationGroup(Create(m), FadeIn(t, scale=1.3)) for m, t in zip(morceaux, labs)],
                              lag_ratio=0.25), run_time=0.7)
        l70 = co.lab_r(0, 70, "70 m", fs=32)
        self.au_mot("dans 70")
        self.play(FadeIn(L1[1]), FadeIn(L1[2], scale=1.3), FadeIn(l70, scale=1.3), run_time=0.45)
        L2 = self.lc([("70 ÷", WHITE), ("10 =", AMBRE), ("7", BLEU_CALCUL)], -0.05, fs=46)
        self.au_mot("70 divisé")
        self.play(FadeIn(L2[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("10, égale")
        self.play(FadeIn(L2[1], shift=RIGHT * 0.2), FadeIn(fl.etiquette, scale=1.4), run_time=0.4)
        self.au_mot("7. Hugo")
        self.play(FadeIn(L2[2], scale=1.4), run_time=0.35)
        L3 = self.lc([("Hugo trace", WHITE), ("7 cm.", BLEU_CALCUL)], -1.1)
        self.au_mot("Hugo trace")
        self.play(FadeIn(L3[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("7 cm")
        self.play(FadeIn(L3[1], scale=1.3), Create(co.plan(0, 7)), Create(co.ticks(7)),
                  FadeIn(co.lab_p(0, 7, "7 cm"), scale=1.3), run_time=0.6)
        self.insister(L3[1], 1.2, 0.2)
        self.attendre_voix()

    # ── 03 : le tableau : on remonte, ÷ 10 ──────────────────────────────────
    def ecran_tableau(self):
        self.ecran("03-tableau")
        tb = TableauProp(["Plan (cm)", "Réalité (m)"], [[1, 7], [10, 70]], montrer=False, largeur_case=1.7,
                         largeur_libelle=3.4, hauteur=0.95, fs=42, centre=P(-1.6, 0.9))
        self.au_mot("tableau")
        self.play(FadeIn(tb.fond, shift=UP * 0.2), run_time=0.6)
        self.au_mot("du bas")
        self.play(Indicate(tb.libelles[1], color=AMBRE, scale_factor=1.2), run_time=0.5)
        self.au_mot("vers le haut")
        self.play(Indicate(tb.libelles[0], color=AMBRE, scale_factor=1.2), run_time=0.5)
        for (r, c), mot in (((1, 0), "10 m"), ((0, 0), "1 cm"), ((1, 1), "70 m"), ((0, 1), "7 cm")):
            self.au_mot(mot)
            self.play(tb.allumer(r, c), FadeIn(tb.valeur(r, c), scale=1.4), run_time=0.35)
            self.play(tb.eteindre(r, c), run_time=0.25)
        fl = tb.fleche_lat("÷ 10", sens="haut", fs=44)
        phr = self.ligne([("On divise", WHITE), ("par 10.", AMBRE)], 42).move_to(P(-1.0, -1.5))
        self.au_mot("On divise")
        self.play(FadeIn(phr[0], shift=UP * 0.15), Create(fl.fleche), run_time=0.5)
        self.au_mot("par 10")
        self.play(FadeIn(phr[1], scale=1.3), FadeIn(fl.etiquette, scale=1.4), run_time=0.4)
        self.play(LaggedStart(*[Indicate(tb.colonne(c), color=AMBRE, scale_factor=1.08) for c in range(2)],
                              lag_ratio=0.4), run_time=1.0)
        self.insister(fl.etiquette, 1.3, 0.2)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (1 cm → 10 m ; mur de 40 m) ─────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        deco = VGroup(jardin(4.8, 2.9).move_to(P(-3.0, 0.5)),
                      Rectangle(width=4.0, height=0.16, fill_color="#a8a29e", fill_opacity=1,
                                stroke_color="#57534e", stroke_width=2).move_to(P(-3.0, -1.35)),
                      hugo(0.6).move_to(P(-5.9, -1.9)))
        self.add(deco)
        co = PlanReel(0.45, 0.0875, centre=P(-3.0, 0.3))

        def apres(sc):
            sc.play(FadeOut(deco), FadeIn(co.fond), Create(co.reel(0, 40)), run_time=0.35)
            l0 = sc.ligne_rep(0, ["40 ÷", "10 =", "4 cm."])
            fl = co.monte("÷ 10", 40, 4)
            sc.au_mot("40 divisé")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), Create(fl.fleche), FadeIn(co.lab_r(0, 40, "40 m"), scale=1.2),
                    run_time=0.35)
            sc.au_mot("10, égale")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), FadeIn(fl.etiquette, scale=1.3), run_time=0.35)
            sc.au_mot("4 cm")
            sc.play(FadeIn(l0[2], scale=1.3), Create(co.plan(0, 4)), Create(co.ticks(4)),
                    FadeIn(co.lab_p(0, 4, "4 cm"), scale=1.3), run_time=0.45)
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse",
                            ["1 cm représente 10 m.", "Un mur mesure 40 m.", "Combien de cm", "sur le plan ?"],
                            [self.t("400 cm", 34), self.t("30 cm", 34), self.t("4 cm", 34)], 2,
                            ["40 ÷ 10 = 4 cm."], mot_q="1 cm représente", autres_r=apres)

    # ── 05 : une autre échelle (1 cm → 8 m ; mur de 24 m) ───────────────────
    def ecran_autre(self):
        self.ecran("05-autre")
        co = PlanReel(0.6, 3.5 / 24, centre=P(-2.9, 0.2))
        tit = self.col(self.t("Une autre échelle", 44, AMBRE), 2.75, 1.3)
        self.au_mot("Avec une autre")
        self.play(Write(tit), FadeIn(co.fond, shift=UP * 0.2), run_time=0.6)
        car = cartouche("1 cm", "8 m", 38)
        self.col(car, 1.8, 1.3)
        self.au_mot("1 cm")
        self.play(Create(car.cadre), FadeIn(car.cm, scale=1.3), run_time=0.35)
        self.au_mot("8 m")
        self.play(FadeIn(car.fl, shift=RIGHT * 0.2), FadeIn(car.reel, scale=1.3), run_time=0.4)
        L1 = self.lc([("Un mur :", WHITE), ("24 m", VERT_OK)], 0.85)
        self.au_mot("Un mur")
        self.play(FadeIn(L1[0], shift=RIGHT * 0.2), run_time=0.3)
        r24 = co.reel(0, 24)
        self.au_mot("24 m")
        self.play(FadeIn(L1[1], scale=1.3), Create(r24), FadeIn(co.lab_r(0, 24, "24 m"), scale=1.3), run_time=0.5)
        L2 = self.lc([("24 ÷", WHITE), ("8 =", AMBRE), ("3", BLEU_CALCUL)], -0.15, fs=46)
        fl = co.monte("÷ 8", 24, 3)
        morceaux = [co.reel(8 * k, 8 * (k + 1), VERT_R if k % 2 == 0 else VERT_H, bouts=False) for k in range(3)]
        labs = [co.lab_r(8 * k, 8 * (k + 1), "8", fs=20, dessus=True) for k in range(3)]
        self.au_mot("24 divisé")
        self.play(FadeIn(L2[0], shift=RIGHT * 0.2), Create(fl.fleche), run_time=0.35)
        self.au_mot("8, égale")
        self.play(FadeIn(L2[1], shift=RIGHT * 0.2), FadeIn(fl.etiquette, scale=1.3),
                  LaggedStart(*[AnimationGroup(Create(m), FadeIn(t, scale=1.3)) for m, t in zip(morceaux, labs)],
                              lag_ratio=0.3), run_time=0.8)
        self.au_mot("3. On")
        self.play(FadeIn(L2[2], scale=1.4), run_time=0.35)
        L3 = self.lc([("On trace", WHITE), ("3 cm.", BLEU_CALCUL)], -1.2)
        self.au_mot("On trace")
        self.play(FadeIn(L3[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("3 cm")
        self.play(FadeIn(L3[1], scale=1.3), Create(co.plan(0, 3)), Create(co.ticks(3)),
                  FadeIn(co.lab_p(0, 3, "3 cm"), scale=1.3), run_time=0.5)
        self.insister(L3[1], 1.2, 0.2)
        self.attendre_voix()

    # ── 06 : le piège : 70 × 10 = 700 cm, 7 mètres de dessin ! ──────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        tit = self.t("Attention au piège !", 44, ROUGE_ERREUR).move_to(P(-2.9, 3.1))
        self.au_mot("Attention")
        self.play(Write(tit), run_time=0.5)
        salle = classe_salle(5.0, 2.8).move_to(P(-3.6, 0.6))
        self.au_mot("Pour dessiner")
        self.play(FadeIn(salle, scale=0.9), run_time=0.5)
        L0 = self.col(self.t("On ne multiplie pas !", 38, ROUGE_ERREUR), 2.4, 1.3)
        self.au_mot("on ne multiplie pas")
        self.play(FadeIn(L0, shift=RIGHT * 0.2), run_time=0.4)
        L1 = self.lc([("70 × 10 =", WHITE), ("700 cm", ROUGE_ERREUR)], 1.4)
        self.au_mot("70 fois")
        self.play(FadeIn(L1[0], shift=RIGHT * 0.2), run_time=0.35)
        bande = Rectangle(width=6.8, height=0.32, fill_color="#93c5fd", fill_opacity=0.9, stroke_color=BLEU_P,
                          stroke_width=3).move_to(P(-2.5, -0.62))
        l700 = gras("700 cm", 30, ROUGE_ERREUR).next_to(bande, DOWN, buff=0.12).align_to(bande, RIGHT)
        self.au_mot("700 cm")
        self.play(FadeIn(L1[1], scale=1.3), GrowFromEdge(bande, LEFT), FadeIn(l700, scale=1.3), run_time=0.8)
        L2 = self.lc([("= 7 mètres", ROUGE_ERREUR), ("de dessin !", WHITE)], 0.5)
        self.au_mot("7 mètres")
        self.play(FadeIn(L2, scale=1.2), run_time=0.4)
        self.insister(L2[0], 1.15, 0.2)
        L3 = self.col(self.t("Plus grand que la classe !", 36), -0.4, 1.3)
        mur = Line(salle.mur.get_corner(DR), salle.mur.get_corner(UR), color=ROUGE_ERREUR, stroke_width=8)
        self.au_mot("Plus grand")
        self.play(FadeIn(L3, shift=RIGHT * 0.2), Create(mur), run_time=0.45)
        self.play(Indicate(bande, color=ROUGE_ERREUR, scale_factor=1.04), run_time=0.6)
        self.play(Create(croix(L1[1], sw=6)), FadeOut(mur), run_time=0.4)
        L4 = VGroup(self.t("Sur un plan,", 38, VERT_OK),
                    self.t("tout est plus petit.", 38, VERT_OK)).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.col(L4, -1.55, 1.3)
        feuille = Rectangle(width=1.1, height=0.75, fill_color=WHITE, fill_opacity=1, stroke_color="#94a3b8",
                            stroke_width=2).next_to(salle.table, UP, buff=0.04)
        mini = jardin(0.95, 0.6).move_to(feuille)
        self.au_mot("Sur un plan")
        self.play(FadeIn(L4[0], shift=RIGHT * 0.2), FadeOut(bande), FadeOut(l700), FadeIn(feuille, scale=0.7),
                  run_time=0.45)
        self.au_mot("tout est plus petit")
        self.play(FadeIn(L4[1], shift=RIGHT * 0.2), FadeIn(mini, scale=0.5), run_time=0.45)
        self.play(Indicate(feuille, color=VERT_OK, scale_factor=1.3), run_time=0.6)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (1 cm → 4 km ; trajet de 30 km) ─────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        carte = carte_awa(5.2, 3.4).move_to(P(-3.0, 0.5))
        trajet = DashedVMobject(VMobject(stroke_color="#b45309", stroke_width=7).set_points_smoothly(
            [P(-5.0, -0.5), P(-4.0, 0.6), P(-2.6, 0.0), P(-1.0, 1.3)]), num_dashes=24)
        deco = VGroup(carte, trajet)
        self.add(deco)
        co = PlanReel(0.4, 0.115, centre=P(-2.9, 0.3))

        def apres(sc):
            sc.play(FadeOut(deco), FadeIn(co.fond), run_time=0.2)
            r0 = sc.ligne_rep(0, ["28 km", "→ 7 cm ;"])
            r1 = sc.ligne_rep(1, ["2 km", "→ un demi-cm."])
            r2 = sc.ligne_rep(2, ["En tout :", "7,5 cm."])
            sc.au_mot("28 km")
            sc.play(FadeIn(r0[0], scale=1.3), Create(co.reel(0, 28)),
                    FadeIn(co.lab_r(0, 28, "28 km", fs=26), scale=1.3), run_time=0.4)
            fl = co.monte("÷ 4", 28, 7)
            sc.au_mot("fois 4 km")
            sc.play(Create(fl.fleche), FadeIn(fl.etiquette, scale=1.3), run_time=0.35)
            lp7 = co.lab_p(0, 7, "7 cm", fs=26)
            sc.au_mot("7 cm")
            sc.play(FadeIn(r0[1], scale=1.3), Create(co.plan(0, 7)), Create(co.ticks(7)),
                    FadeIn(lp7, scale=1.3), run_time=0.4)
            sc.au_mot("2 km")
            sc.play(FadeIn(r1[0], scale=1.3), Create(co.reel(28, 30, VERT_R2)),
                    FadeIn(co.lab_r(28, 30, "2 km", fs=22).shift(RIGHT * 0.35), scale=1.3), run_time=0.4)
            sc.au_mot("un demi-centimètre")
            sc.play(FadeIn(r1[1], scale=1.3), Create(co.plan(7, 7.5, BLEU_P2)), run_time=0.4)
            sc.au_mot("En tout")
            sc.play(FadeIn(r2[0], shift=UP * 0.15), run_time=0.3)
            acc = Brace(Line(P(co.xp(0), co.y_p + 0.1), P(co.xp(7.5), co.y_p + 0.1)), UP, color=BLEU_P)
            sc.au_mot("7,5 cm")
            sc.play(FadeIn(r2[1], scale=1.3), GrowFromCenter(acc), FadeOut(lp7),
                    FadeIn(gras("7,5 cm", 28, BLEU_P).next_to(acc, UP, buff=0.04), scale=1.3), run_time=0.45)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["1 cm représente 4 km.", "Un trajet mesure 30 km.",
                             "Combien de cm sur la carte ?"],
                            [self.t("7,5 cm", 34), self.t("120 cm", 34), self.t("26 cm", 34)], 0,
                            ["28 km → 7 cm ;", "2 km → un demi-cm.", "En tout : 7,5 cm."], mot_q="1 cm représente",
                            autres_r=apres)

    # ── 08 : défi : le potager 30 m × 15 m (1 cm → 5 m) ─────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-2.6, 3.1))
        self.play(Write(tit), run_time=0.6)
        pot = potager(4.4, 2.2).move_to(P(-2.6, 0.55))
        pers = hugo(0.55).move_to(P(-5.75, -1.95))
        L1 = self.lc([("Potager :", WHITE), ("30 m", VERT_OK), ("sur", WHITE), ("15 m", VERT_OK)], 1.25)
        self.au_mot("Hugo dessine")
        self.play(FadeIn(pers, shift=UP * 0.2), FadeIn(pot, scale=0.9), FadeIn(L1[0], shift=RIGHT * 0.2),
                  run_time=0.6)
        ab = Brace(pot.fond, DOWN, color=VERT_R, buff=0.08)
        l30 = gras("30 m", 34, "#4ade80").next_to(ab, DOWN, buff=0.06)
        self.au_mot("30 m")
        self.play(GrowFromCenter(ab), FadeIn(l30, scale=1.3), FadeIn(L1[1], scale=1.3), run_time=0.45)
        al = Brace(pot.fond, LEFT, color=VERT_R, buff=0.08)
        l15 = gras("15 m", 34, "#4ade80").next_to(al, LEFT, buff=0.06)
        self.au_mot("15 m")
        self.play(GrowFromCenter(al), FadeIn(l15, scale=1.3), FadeIn(L1[2]), FadeIn(L1[3], scale=1.3),
                  run_time=0.45)
        car = cartouche("1 cm", "5 m", 40)
        self.col(car, 2.3, 1.3)
        self.au_mot("1 cm")
        self.play(Create(car.cadre), FadeIn(car.cm, scale=1.3), run_time=0.35)
        self.au_mot("5 m", 2)   # le 1er « 5 m » est dans « 15 m »
        self.play(FadeIn(car.fl, shift=RIGHT * 0.2), FadeIn(car.reel, scale=1.3), run_time=0.4)
        L2 = self.lc([("Sur le plan :", WHITE), ("? sur ?", ORANGE_RETENUE)], 0.2)
        L2[1].sans_synchro = True
        self.au_mot("Quelles sont")
        self.play(FadeIn(L2, shift=RIGHT * 0.2), run_time=0.4)
        self.play(Indicate(L2[1], color=ORANGE_RETENUE, scale_factor=1.3), run_time=0.5)
        self.pause_defi(y=-1.0)

    def feuille_quadrillee(self, u=0.6, nx=8, ny=5, centre=ORIGIN):
        """La feuille de Hugo, quadrillée en cm (u = 1 cm à l'écran)."""
        f = Rectangle(width=nx * u + 0.4, height=ny * u + 0.4, fill_color=WHITE, fill_opacity=1,
                      stroke_color="#94a3b8", stroke_width=3)
        g = VGroup(f)
        x0, y0 = -nx * u / 2, -ny * u / 2
        for i in range(nx + 1):
            g.add(Line(P(x0 + i * u, y0), P(x0 + i * u, -y0), color="#bfdbfe", stroke_width=1.5))
        for j in range(ny + 1):
            g.add(Line(P(x0, y0 + j * u), P(-x0, y0 + j * u), color="#bfdbfe", stroke_width=1.5))
        g.move_to(centre)
        g.coin = P(centre[0] + x0 + u, centre[1] - y0 - u)  # coin haut-gauche du rectangle
        return g

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-2.6, 3.1))
        u = 0.6
        fq = self.feuille_quadrillee(u, centre=P(-3.1, 0.2))
        self.add(fq)
        self.play(Write(tit), run_time=0.5)
        c = fq.coin
        haut = Line(c, c + RIGHT * 6 * u, color=BLEU_P, stroke_width=8)
        gauche = Line(c, c + DOWN * 3 * u, color=BLEU_P, stroke_width=8)
        haut.set_z_index(2)
        gauche.set_z_index(2)
        L1 = self.lc([("30 ÷", WHITE), ("5 =", AMBRE), ("6 cm", BLEU_CALCUL)], 1.6, fs=46)
        self.au_mot("30 divisé")
        self.play(FadeIn(L1[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("5, égale")
        self.play(FadeIn(L1[1], shift=RIGHT * 0.2), run_time=0.35)
        l6 = gras("6 cm", 30, BLEU_P).next_to(haut, UP, buff=0.08)
        self.au_mot("6 cm")
        self.play(FadeIn(L1[2], scale=1.3), Create(haut), FadeIn(l6, scale=1.3), run_time=0.5)
        L2 = self.lc([("15 ÷", WHITE), ("5 =", AMBRE), ("3 cm", BLEU_CALCUL)], 0.6, fs=46)
        self.au_mot("15 divisé")
        self.play(FadeIn(L2[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("5, égale", 2)
        self.play(FadeIn(L2[1], shift=RIGHT * 0.2), run_time=0.35)
        l3 = gras("3 cm", 30, BLEU_P).next_to(gauche, LEFT, buff=0.1)
        self.au_mot("3 cm")
        self.play(FadeIn(L2[2], scale=1.3), Create(gauche), FadeIn(l3, scale=1.3), run_time=0.5)
        rect = Rectangle(width=6 * u, height=3 * u, fill_color="#bbf7d0", fill_opacity=0.9, stroke_color=BLEU_P,
                         stroke_width=8).move_to(c + P(3 * u, -1.5 * u))
        rangs = VGroup(*[Line(rect.get_left() + P(0.15, (j - 1) * 0.45), rect.get_right() + P(-0.15, (j - 1) * 0.45),
                              color="#16a34a", stroke_width=5) for j in range(3)])
        L3 = VGroup(self.t("Un rectangle de", 38),
                    self.ligne([("6 cm", BLEU_CALCUL), ("sur", WHITE), ("3 cm", BLEU_CALCUL)], 42))
        L3.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        self.col(L3, -0.75, 1.3)
        self.au_mot("Hugo dessine")
        self.play(FadeIn(L3[0], shift=RIGHT * 0.2), FadeIn(rect), FadeIn(rangs), run_time=0.5)
        self.au_mot("de 6 cm")
        self.play(FadeIn(L3[1][0], scale=1.3), Indicate(haut, color=BLEU_P2, scale_factor=1.0), run_time=0.4)
        self.au_mot("sur 3 cm")
        self.play(FadeIn(L3[1][1]), FadeIn(L3[1][2], scale=1.3), Indicate(gauche, color=BLEU_P2, scale_factor=1.0),
                  run_time=0.4)
        self.insister(L3[1], 1.15, 0.2)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        co = PlanReel(0.6, 0.19, long_reel=2.4, centre=ORIGIN)
        fig = VGroup(co.fond, co.reel(0, 10), co.lab_r(0, 10, "10 m"), co.plan(0, 1), co.lab_p(0, 1, "1 cm"))
        fl = co.monte("÷ 10", 10, 1)
        fig.add(fl)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("De la réalité au plan :", "on divise par ce que vaut 1 cm."),
            ("Le plan est toujours", "plus petit que la réalité."),
            ("On vérifie : le dessin", "doit tenir sur la feuille.")], fs=34)
        self.au_mot("Pour passer")
        self.montrer_ligne(lignes[0], Indicate(fl, color=AMBRE))
        self.au_mot("Le plan est")
        self.montrer_ligne(lignes[1], Indicate(fig[3], color=BLEU_P2))
        self.au_mot("On vérifie")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_diviser()
        self.ecran_tableau()
        self.ecran_question1()
        self.ecran_autre()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PropEchellePlan6e(PropEchellePlanBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"


class PropEchellePlan4e(PropEchellePlanBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
