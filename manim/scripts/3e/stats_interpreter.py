# stats_interpreter.py
# EleveAI — Maths 3e — série « Statistiques », cycle 4, épisode 07 :
# INTERPRÉTER DES INDICATEURS (micro du coach : stat_interpreter, notion
# stat_statistique), AVEC VOIX. Paysage 16:9, CEINTURE VERTE : la paysage
# complète du niveau 3e (moyenne tirée par une valeur extrême, médiane qui
# résiste, retirer la valeur extrême, « au moins la moitié », comparer deux
# séries de même moyenne par l'étendue, total = moyenne × effectif).
# Short jumeau : stats_interpreter_short.py (orange, un cran plus bas).
#
# ⭐ Décor et métier : l'EMPLOI et l'économie ; une CONSEILLÈRE EMPLOI aide
# Inès, qui cherche son premier emploi, à lire une annonce « salaire moyen
# 2 600 € » avec un regard de statisticienne (problématique : juger une
# affirmation). Données :
#   · l'entreprise (VRAISEMBLABLE, calculée en Python) : 1 800, 1 900, 1 900,
#     2 000, 2 100, 2 300 et 6 200 (le patron) → total 18 200, moyenne 2 600,
#     médiane 2 000, 6 salariés sur 7 sous la moyenne ; sans le patron :
#     12 000 ÷ 6 = 2 000, médiane 1 950 ;
#   · RÉEL : Insee, salaires du secteur privé en 2023, net mensuel en
#     équivalent temps plein : moyen 2 735 €, médian 2 183 € (Insee Première /
#     communiqué 2025, vérifié le 21/10/2026) ;
#   · l'autre entreprise : 2 400, 2 500, 2 600, 2 600, 2 600, 2 700, 2 800 →
#     moyenne 2 600, médiane 2 600, étendue 400 (contre 6 200 − 1 800 = 4 400) ;
#   · défi (interpreter_mediane_moitie + interpreter_moyenne_total) : 40
#     salariés, médiane 2 100, moyenne 2 500 → au moins 20 ; 2 500 × 40 = 100 000.
# ⭐ Figures du coach (manim/canvas_stats.py) : `stat_graph` barres (un salaire
# par barre, la moyenne et la médiane en lignes pointillées), la droite graduée
# `number_line` (AxePoints) pour comparer deux séries.
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit.
#
# Mapping micro → écrans (banque 3e réécrite le 21/10) : interpreter_valeur_extreme
# → 02-04 ; interpreter_retirer_extreme → 04 ; interpreter_mediane_moitie → 03,
# 07 ; interpreter_regularite / interpreter_affirmation_vraie → 06 ;
# interpreter_moyenne_total → 07 défi / 07b ; interpreter_choisir_indicateur → 08.
# Écrans : 00 garde · 01 Inès et la conseillère, l'annonce · 02 les 7 salaires,
# la moyenne · 03 la médiane · 04 la valeur extrême · 05 la France (Insee) ·
# 06 comparer deux entreprises · 07 défi · 07b correction · 08 ce que tu as
# appris · 09 fin (règle du 19/10).
#
# Voix : manim/voix/3e-stats-interpreter.json (débit −10), WAV dans
# public/sons/3e-stats-interpreter/ ; calage mot à mot :
# manim/scripts/3e/stats_interpreter_marques.json (marques.ps1 + conv.py, débit −10).
# python -m manim render -qh --disable_caching manim/scripts/3e/stats_interpreter.py StatsInterpreter3e -o eleveai-maths-3e-stats-interpreter --media_dir manim/scripts/3e/media-interpreter
# Sortie : manim/sorties/3e/maths/statistiques/07-interpreter/eleveai-maths-3e-stats-interpreter.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "4e"))

from stats4e_lotf_commun import *  # noqa: E402,F403

NOMS = ["Léa", "Tom", "Sam", "Noé", "Lou", "Ali", "Patron"]
SAL = [1800, 1900, 1900, 2000, 2100, 2300, 6200]
SAL_B = [2400, 2500, 2600, 2600, 2600, 2700, 2800]
MOTS_SAL = [("1 800", 1), ("1 900", 1), ("1 900", 2), ("2 000", 1), ("2 100", 1), ("2 300", 1), ("6 200", 1)]
C_SAL = ["#93c5fd"] * 6 + ["#fca5a5"]
C_MOY, C_MED = VERT_OK, ORANGE_RETENUE


def annonce(s=1.0):
    """Une petite annonce d'emploi : feuille blanche, bandeau, lignes."""
    f = RoundedRectangle(width=3.6 * s, height=2.2 * s, corner_radius=0.12, fill_color=WHITE, fill_opacity=1,
                         stroke_color="#94a3b8", stroke_width=3)
    band = Rectangle(width=3.6 * s, height=0.45 * s, fill_color="#1d4ed8", fill_opacity=1, stroke_width=0)
    band.align_to(f, UP)
    t = Text("ON RECRUTE", font_size=int(28 * s), color=WHITE, weight=BOLD).move_to(band)
    return VGroup(f, band, t)


class StatsInterpreterBase(PaysageF):
    nom_voix = "3e-stats-interpreter"
    fichier_marques = "stats_interpreter_marques.json"
    identite = "Maths 3e — EleveAI"
    ceinture = "verte"
    G = P(-3.25, -0.4)

    def graphe(self, **kw):
        opts = dict(pas=1000, maxi=7000, nom_axe="Salaire (€)", titre="Les 7 salaires (€ par mois)", largeur=6.0,
                    hauteur=3.8, fs=22, couleurs=C_SAL, centre=self.G)
        opts.update(kw)
        return Barres(NOMS, SAL, **opts)

    def ligne_h(self, g, v, couleur, txt=None):
        y = g.y_axe(v)[1]
        x0, x1 = g.y_axe(v)[0], g.base(6)[0] + 0.45
        tr = DashedLine(P(x0, y), P(x1, y), color=couleur, stroke_width=6, dash_length=0.14)
        if True:  # les couleurs disent tout : vert = moyenne, orange = médiane (colonne de droite)
            return VGroup(tr, VectorizedPoint(P(x1, y)))
        lab = texte(txt, 24, couleur).set_stroke(BLACK, 5, background=True).next_to(P(x1, y), RIGHT, buff=0.06)
        return VGroup(tr, lab)

    def graphe_pret(self, valeurs=True):
        g = self.graphe()
        self.add(g)
        vals = VGroup(*[g.valeur(i, fs=17) for i in range(7)]) if valeurs else VGroup()
        self.add(vals)
        return g, vals

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Interpréter des indicateurs", self.identite, self.ceinture)
        g = self.graphe(titre=None, nom_axe=None, largeur=3.6, hauteur=2.0, fs=18, centre=P(-0.6, 0.1))
        self.au_mot("Interpréter des indicateurs")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(g.fond, scale=0.9),
                  run_time=0.7)
        self.play(g.pousser(run_time=0.8))
        self.au_mot("la moyenne dit-elle")
        lm = self.ligne_h(g, 2600, C_MOY)
        q = self.t("?", 80, ORANGE_RETENUE).next_to(g, RIGHT, buff=0.4)
        self.play(Create(lm), FadeIn(q, scale=0.4), run_time=0.5)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Inès, la conseillère, l'annonce ───────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.au_mot("Inès")
        ines = personne("#a78bfa", "#8d5524", 0.48, "#111827", longs=True).move_to(P(-4.7, 1.4))
        n1 = self.t("Inès", 40, VIOLET_ACCENT).next_to(ines, DOWN, buff=0.2)
        p1 = self.bloc(["cherche son", "premier emploi"], 30).next_to(n1, DOWN, buff=0.12)
        self.play(FadeIn(ines, shift=UP * 0.2), FadeIn(n1), FadeIn(p1), run_time=0.6)
        self.au_mot("Sa conseillère emploi")
        cons = personne("#0d9488", "#c68642", 0.48, "#3f3f46").move_to(P(-1.3, 1.4))
        n2 = self.bloc(["Conseillère", "emploi"], 38, BLEU_CALCUL).next_to(cons, DOWN, buff=0.2)
        self.play(FadeIn(cons, shift=UP * 0.2), FadeIn(n2), run_time=0.6)
        self.au_mot("regard de statisticienne")
        loupe = VGroup(Circle(radius=0.28, color=AMBRE, stroke_width=6),
                       Line(P(0.2, -0.2), P(0.5, -0.5), color=AMBRE, stroke_width=8)).next_to(cons, RIGHT, buff=0.15)
        self.play(FadeIn(loupe, scale=0.5), run_time=0.4)
        self.au_mot("Une entreprise affiche")
        an = annonce(1.3).move_to(P(3.9, 1.0))
        self.play(FadeIn(an, shift=LEFT * 0.4), run_time=0.5)
        self.au_mot("le salaire moyen est de 2 600")
        q1 = self.t("Salaire moyen :", 34, NUIT).move_to(an[0].get_center() + DOWN * 0.15)
        q2 = self.t("2 600 € !", 52, "#1d4ed8").next_to(q1, DOWN, buff=0.15)
        self.play(FadeIn(q1), run_time=0.3)
        self.play(FadeIn(q2, scale=1.5), run_time=0.4)
        self.insister(q2, 1.2, 0.25)
        self.au_mot("Faut-il la croire")
        cr = self.t("Faut-il la croire ?", 48, ORANGE_RETENUE).move_to(P(0.5, -2.2))
        self.play(Write(cr), run_time=0.8)
        self.attendre_voix()

    # ── 02 : les 7 salaires, la moyenne ─────────────────────────────────────

    def ecran_serie(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-serie")
        g = self.graphe()
        self.play(FadeIn(g.fond, scale=0.95), run_time=0.5)
        self.au_mot("les 7 salaires")
        s7 = self.col(self.ligne([("7", BLEU_CALCUL), ("salaires", WHITE)], 42), 2.5)
        self.play(FadeIn(s7, shift=RIGHT * 0.2), run_time=0.35)
        vals = []
        for i, (m, n) in enumerate(MOTS_SAL):
            self.au_mot(m, n)
            v = g.valeur(i, fs=17)
            self.play(GrowFromEdge(g.barres[i], DOWN), FadeIn(v, shift=DOWN * 0.15), run_time=0.25)
            vals.append(v)
        self.au_mot("pour le patron")
        pat = self.col(self.t("le patron : 6 200 €", 36, "#fca5a5"), 1.75)
        self.play(FadeIn(pat, shift=RIGHT * 0.2), Indicate(g.barres[6], color=ROUGE_ERREUR, scale_factor=1.05),
                  run_time=0.5)
        self.au_mot("La moyenne est bien")
        t1 = self.col(self.t("Moyenne :", 40, C_MOY), 0.85)
        self.play(FadeIn(t1, shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("2 600 : le total")
        lm = self.ligne_h(g, 2600, C_MOY, "moyenne")
        val = self.t("2 600 €", 44, C_MOY).next_to(t1, RIGHT, buff=0.25)
        self.play(Create(lm[0]), FadeIn(lm[1]), FadeIn(val, scale=1.4), run_time=0.5)
        self.au_mot("18 200")
        c = self.col(self.ligne([("18 200", BLEU_CALCUL), ("÷", WHITE)], 44), -0.05)
        self.play(FadeIn(c, shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("par 7")
        sept = self.ligne([("7", BLEU_CALCUL), ("=", WHITE), ("2 600", C_MOY)], 44).next_to(c, RIGHT, buff=0.2)
        self.play(FadeIn(sept, scale=1.3), run_time=0.35)
        self.play(Create(self.encadrer(VGroup(c, sept))), run_time=0.4)
        self.attendre_voix()

    # ── 03 : la médiane ─────────────────────────────────────────────────────

    def ecran_mediane(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-mediane")
        g, vals = self.graphe_pret()
        lm = self.ligne_h(g, 2600, C_MOY, "moyenne")
        self.add(lm)
        self.au_mot("regarde la médiane")
        tit = self.col(self.t("La médiane", 46, JAUNE_TITRE), 2.55)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("La série est rangée")
        rg = self.col(self.t("série rangée : le milieu", 36), 1.8)
        self.play(FadeIn(rg, shift=RIGHT * 0.2), LaggedStart(*[Indicate(b, color=WHITE, scale_factor=1.05)
                                                              for b in g.barres], lag_ratio=0.1), run_time=0.9)
        self.au_mot("la quatrième")
        b3 = Brace(VGroup(*g.etiquettes[:3]), DOWN, buff=0.1, color=BLEU_CALCUL)
        b4 = Brace(VGroup(*g.etiquettes[4:]), DOWN, buff=0.1, color=BLEU_CALCUL)
        self.play(g.focus(3, 0.4), GrowFromCenter(b3), GrowFromCenter(b4), run_time=0.5)
        self.au_mot("2 000 euros. Au")
        lme = self.ligne_h(g, 2000, C_MED, "médiane")
        r = self.col(self.ligne([("Médiane :", C_MED), ("2 000 €", C_MED)], 44), 1.0)
        self.play(Create(lme[0]), FadeIn(lme[1]), FadeIn(r, scale=0.8), run_time=0.5)
        self.au_mot("Au moins la moitié")
        mo = self.col(self.bloc(["Au moins la moitié :", "2 000 € ou moins"], 36), 0.0)
        mo[1].set_color(C_MED)
        self.play(FadeIn(mo, shift=RIGHT * 0.2), g.rallumer(), FadeOut(b3), FadeOut(b4), run_time=0.5)
        self.play(g.estomper([0, 1, 2, 3], 0.35), run_time=0.4)
        self.au_mot("6 salariés sur 7")
        six = self.col(VGroup(self.ligne([("6", ROUGE_ERREUR), ("salariés sur", WHITE), ("7", WHITE)], 38),
                              self.t("sous la moyenne !", 38)).arrange(DOWN, aligned_edge=LEFT, buff=0.1), -1.4)
        self.play(g.estomper([0, 1, 2, 3, 4, 5], 0.35), FadeIn(six, scale=0.8), run_time=0.5)
        self.play(LaggedStart(*[Indicate(g.barres[i], color=ROUGE_ERREUR, scale_factor=1.06) for i in range(6)],
                              lag_ratio=0.1), run_time=0.9)
        self.insister(six[0][0], 1.6, 0.25)
        self.attendre_voix()

    # ── 04 : la valeur extrême ──────────────────────────────────────────────

    def ecran_extreme(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-extreme")
        g, vals = self.graphe_pret()
        lm = self.ligne_h(g, 2600, C_MOY, "moyenne")
        lme = self.ligne_h(g, 2000, C_MED, "médiane")
        self.add(lm, lme)
        self.au_mot("Une seule valeur extrême")
        tit = self.col(self.t("Une valeur extrême", 44, ROUGE_ERREUR), 2.55)
        self.play(Write(tit), g.focus(6, 0.5), run_time=0.6)
        self.au_mot("tire la moyenne vers le haut")
        fl = Arrow(P(g.base(6)[0] - 0.9, g.y_axe(2000)[1]), P(g.base(6)[0] - 0.9, g.y_axe(2900)[1]), buff=0,
                   color=C_MOY, stroke_width=8)
        tire = self.col(self.t("tire la moyenne vers le haut", 34, C_MOY), 1.85)
        self.play(GrowArrow(fl), FadeIn(tire, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("Sans le patron")
        sans = self.col(self.t("Sans le patron :", 38), 0.95)
        self.play(FadeIn(sans, shift=RIGHT * 0.2), g.estomper([0, 1, 2, 3, 4, 5], 0.12), vals[6].animate.set_opacity(0.15),
                  FadeOut(fl), run_time=0.5)
        c = self.col(self.ligne([("12 000", BLEU_CALCUL), ("÷", WHITE), ("6", BLEU_CALCUL), ("=", WHITE),
                                 ("2 000", C_MOY)], 44), 0.15)
        self.au_mot("12 000 divisé")
        self.play(FadeIn(c[:2], scale=1.3), run_time=0.3)
        self.au_mot("par 6")
        self.play(FadeIn(c[2], scale=1.3), run_time=0.25)
        self.au_mot("égale 2 000")
        lm2 = self.ligne_h(g, 2000, C_MOY, "moyenne")
        lm2[1].next_to(lme[1], UP, buff=0.05)
        self.play(FadeIn(c[3:], scale=1.4), Transform(lm, lm2), run_time=0.6)
        self.au_mot("La médiane, elle")
        lme2 = self.ligne_h(g, 1950, C_MED, "médiane")
        lme2[1].next_to(lm2[1], DOWN, buff=0.05)
        m = self.col(self.ligne([("Médiane :", C_MED), ("1 950", C_MED)], 40), -0.75)
        self.au_mot("passe seulement à 1 950")
        self.play(FadeIn(m, shift=RIGHT * 0.2), Transform(lme, lme2), run_time=0.5)
        self.au_mot("La médiane résiste")
        res = self.col(self.bloc(["La médiane résiste", "aux valeurs extrêmes."], 36, VERT_OK), -1.85)
        self.play(FadeIn(res, shift=UP * 0.2), Create(self.encadrer(res)), run_time=0.6)
        self.attendre_voix()

    # ── 05 : toute la France (Insee 2023) ───────────────────────────────────

    def ecran_insee(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-insee")
        self.au_mot("pour toute la France")
        tit = self.t("Toute la France", 48, JAUNE_TITRE).to_edge(UP, buff=0.35)
        self.play(Write(tit), run_time=0.6)
        g = Barres(["Moyen", "Médian"], [2735, 2183], pas=500, maxi=3000, couleurs=["#86efac", "#fdba74"],
                   nom_axe="€ net par mois", titre="Salaires du privé, 2023", largeur=4.2, hauteur=3.4, fs=26,
                   centre=P(-3.3, -0.55))
        self.au_mot("d'après l'Insee")
        src = self.col(self.bloc(["Source : Insee, 2023,", "secteur privé,", "équivalent temps plein"], 30,
                                 "#cbd5e1"), 2.0)
        self.play(FadeIn(g.fond, scale=0.95), FadeIn(src, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("le salaire net moyen")
        self.play(g.pousser(0, run_time=0.6))
        self.au_mot("2 735 euros")
        v0 = g.valeur(0, fs=26)
        l0 = self.col(self.ligne([("moyen :", WHITE), ("2 735 €", C_MOY)], 44), 0.55)
        self.play(FadeIn(v0, scale=1.4), FadeIn(l0, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("le salaire médian")
        self.play(g.pousser(1, run_time=0.6))
        self.au_mot("2 183 euros")
        v1 = g.valeur(1, fs=26)
        l1 = self.col(self.ligne([("médian :", WHITE), ("2 183 €", C_MED)], 44), -0.35)
        self.play(FadeIn(v1, scale=1.4), FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Les très hauts salaires")
        t = self.col(self.bloc(["Les très hauts salaires", "tirent la moyenne."], 38, VERT_OK), -1.6)
        x = g.base(0)[0]
        fl = Arrow(P(x, g.y_axe(2183)[1]), P(x, g.y_axe(2735)[1] + 0.05), buff=0, color=WHITE, stroke_width=7)
        self.play(FadeIn(t, shift=UP * 0.2), GrowArrow(fl), run_time=0.6)
        self.attendre_voix()

    # ── 06 : comparer deux entreprises ──────────────────────────────────────

    def ecran_comparer(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-comparer")
        axA = AxePoints(SAL, 1000, 7000, 1000, sous_pas=500, longueur=7.4, couleur="#93c5fd", fs=24, nom="€",
                        rayon=0.13, centre=P(-2.45, 1.55), titre="Première entreprise")
        axB = AxePoints(SAL_B, 1000, 7000, 1000, sous_pas=500, longueur=7.4, couleur="#c4b5fd", fs=24, nom="€",
                        rayon=0.13, centre=P(-2.45, -1.45), titre="Autre entreprise")
        self.add(axA)
        XR = 2.75
        self.au_mot("Une autre entreprise")
        self.play(FadeIn(axB.fond, scale=0.95), run_time=0.5)
        self.au_mot("une moyenne de 2 600")
        mA, mB = axA.repere(2600, None, C_MOY), axB.repere(2600, None, C_MOY)
        mo = self.col(self.ligne([("moyenne :", C_MOY), ("2 600 €", C_MOY)], 36), 3.1, xl=XR)
        self.play(Create(mA[0]), FadeIn(mo), run_time=0.5)
        mots = [("2 400", 1), ("2 500", 1), ("2 600", 2), ("2 600", 3), ("2 600", 4), ("2 700", 1), ("2 800", 1)]
        for i, (m, n) in enumerate(mots):
            self.au_mot(m, n)
            self.play(FadeIn(axB.ronds[i], shift=DOWN * 0.3), run_time=0.2)
        self.au_mot("Même moyenne")
        mm = self.col(self.t("Même moyenne !", 36, C_MOY), 0.3, xl=XR)
        self.play(Create(mB[0]), FadeIn(mm), run_time=0.5)
        self.au_mot("son étendue")
        eB = axB.accolade(2400, 2800, "", couleur=AMBRE, dessous=True)[0]
        tB = self.col(self.ligne([("étendue :", AMBRE), ("400 €", AMBRE)], 38), -1.3, xl=XR)
        self.play(GrowFromCenter(eB), FadeIn(tB), run_time=0.5)
        self.au_mot("contre 4 400")
        eA = axA.accolade(1800, 6200, "", couleur=ROUGE_ERREUR, dessous=True)[0]
        tA = self.col(self.ligne([("étendue :", ROUGE_ERREUR), ("4 400 €", ROUGE_ERREUR)], 38), 1.7, xl=XR)
        self.play(GrowFromCenter(eA), FadeIn(tA), run_time=0.5)
        self.au_mot("bien plus réguliers")
        reg = self.col(self.t("bien plus réguliers", 36, VERT_OK), -2.05, xl=XR)
        self.play(FadeIn(reg, shift=LEFT * 0.2), Indicate(axB.ronds, color=VERT_OK), run_time=0.6)
        self.au_mot("sa médiane vaut 2 600")
        med = self.col(self.ligne([("médiane :", C_MED), ("2 600 €", C_MED)], 36), -0.5, xl=XR)
        self.play(FadeIn(med, shift=UP * 0.2), Indicate(axB.ronds[3], color=C_MED, scale_factor=2), run_time=0.5)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def foule(self, n=40, cols=10, r=0.13):
        g = VGroup(*[VGroup(Circle(radius=r * 0.55, fill_color="#e2e8f0", fill_opacity=1, stroke_width=0),
                            Ellipse(width=r * 1.6, height=r * 1.1, fill_color="#94a3b8", fill_opacity=1,
                                    stroke_width=0).shift(DOWN * r * 0.85)) for _ in range(n)])
        return g.arrange_in_grid(rows=n // cols, cols=cols, buff=(0.16, 0.2))

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer", 52, JAUNE_TITRE).to_edge(UP, buff=0.35)
        self.play(Write(tit), run_time=0.6)
        self.au_mot("40 salariés")
        f = self.foule().move_to(P(-3.7, 0.6))
        t40 = self.ligne([("40", BLEU_CALCUL), ("salariés", WHITE)], 38).next_to(f, DOWN, buff=0.3)
        self.play(LaggedStart(*[FadeIn(p, scale=0.5) for p in f], lag_ratio=0.02), FadeIn(t40), run_time=0.9)
        self.au_mot("salaire médian de 2 100")
        a1 = self.col(self.ligne([("médiane :", C_MED), ("2 100 €", C_MED)], 40), 2.0)
        self.play(FadeIn(a1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("salaire moyen de 2 500")
        a2 = self.col(self.ligne([("moyenne :", C_MOY), ("2 500 €", C_MOY)], 40), 1.25)
        self.play(FadeIn(a2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Au moins combien")
        q1 = self.col(self.bloc(["1. Au moins combien gagnent", "2 100 € ou moins ?"], 34), 0.15)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("combien l'entreprise verse")
        q2 = self.col(self.bloc(["2. Combien l'entreprise", "verse-t-elle en tout, par mois ?"], 34), -1.05)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 38, ORANGE_RETENUE), -2.15)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07b-correction")
        tit = self.t("Correction", 52, JAUNE_TITRE).to_edge(UP, buff=0.35)
        f = self.foule().move_to(P(-3.7, 0.9))
        self.play(Write(tit), FadeIn(f), run_time=0.6)
        self.au_mot("coupe les 40 salariés")
        x_mil = (f[4].get_right()[0] + f[5].get_left()[0]) / 2
        coupe = DashedLine(P(x_mil, f.get_top()[1] + 0.2), P(x_mil, f.get_bottom()[1] - 0.2), color=C_MED,
                           stroke_width=6)
        self.play(Create(coupe), run_time=0.4)
        self.au_mot("moitiés de 20")
        gauche = VGroup(*[f[k] for k in range(40) if k % 10 < 5])
        droite = VGroup(*[f[k] for k in range(40) if k % 10 >= 5])
        t20a = self.t("20", 40, C_MED).next_to(gauche, DOWN, buff=0.25)
        t20b = self.t("20", 40, "#cbd5e1").next_to(droite, DOWN, buff=0.25)
        self.play(gauche.animate.set_color(C_MED), FadeIn(t20a), FadeIn(t20b), run_time=0.5)
        self.au_mot("au moins 20 salariés")
        r1 = self.col(self.bloc(["1. Au moins 20 salariés", "gagnent 2 100 € ou moins."], 36), 2.0)
        r1[0].set_color(C_MED)
        self.play(FadeIn(r1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Le total, c'est")
        r2 = self.col(self.t("2. Total = moyenne × effectif", 36), 0.75)
        self.play(FadeIn(r2, shift=RIGHT * 0.2), run_time=0.5)
        c = self.col(self.ligne([("2 500", C_MOY), ("×", WHITE), ("40", BLEU_CALCUL), ("=", WHITE),
                                 ("100 000 €", VERT_OK)], 46), -0.25)
        self.au_mot("2 500 fois")
        self.play(FadeIn(c[:2], scale=1.3), run_time=0.3)
        self.au_mot("40, égale")
        self.play(FadeIn(c[2:4], scale=1.3), run_time=0.3)
        self.au_mot("100 000 euros")
        self.play(FadeIn(c[4], scale=1.4), run_time=0.4)
        self.au_mot("par mois")
        pm = self.col(self.t("par mois", 36), -1.05)
        self.play(FadeIn(pm), Create(self.encadrer(VGroup(c, pm))), run_time=0.5)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        g, vals = self.graphe_pret()
        self.add(self.ligne_h(g, 2600, C_MOY, "moyenne"), self.ligne_h(g, 2000, C_MED, "médiane"))
        textes = [("Une valeur extrême tire", "la moyenne, pas la médiane."),
                  ("Médiane : au moins la moitié", "en dessous, et au-dessus."),
                  ("Même moyenne : l'étendue", "montre la plus régulière.")]
        lignes = self.finale(textes, [1.75, 0.2, -1.35], fs=34)
        self.au_mot("Une valeur extrême")
        self.montrer_ligne(lignes[0], Indicate(g.barres[6], color=ROUGE_ERREUR, scale_factor=1.05))
        self.au_mot("La médiane dit")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et à moyenne égale")
        self.montrer_ligne(lignes[2])
        self.insister(lignes[2][1], 1.08, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_serie()
        self.ecran_mediane()
        self.ecran_extreme()
        self.ecran_insee()
        self.ecran_comparer()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class StatsInterpreter3e(StatsInterpreterBase):
    identite = "Maths 3e — EleveAI"
    ceinture = "verte"
