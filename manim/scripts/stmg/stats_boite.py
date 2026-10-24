# stats_boite.py
# EleveAI — Maths STMG — série « Statistiques », lycée, épisode 03 : LIRE UN
# DIAGRAMME EN BOÎTE. Micro du coach auto_stat_boite (notion
# auto_donnees_graphiques). AVEC VOIX. Paysage 16:9. CEINTURE JAUNE : un
# automatisme (comme « lire un graphique ») : cinq nombres, ce qu'ils disent en
# quarts, deux différences. Short jumeau : stats_boite_short.py (blanche).
#
# ⭐ Décor et métier : l'ÉCONOMIE ; un ÉCONOMISTE résume les salaires minimums de
# l'Union européenne (problématique : résumer une série, situer la France).
# Centres d'intérêt : argent-budget, histoire-geographie.
# Source : Eurostat, « Now available: first 2025 data for minimum wages »
# (10/04/2025), salaires minimums mensuels bruts au 1er janvier 2025, lu le
# 24/10/2026 : https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20250410-2
# 22 pays (Danemark, Italie, Autriche, Finlande, Suède : pas de salaire minimum
# national). Série rangée (€) : 551 BG, 707 HU, 740 LV, 814 RO, 816 SK, 826 CZ,
# 886 EE, 961 MT, 968 EL, 970 HR, 1 000 CY, 1 015 PT, 1 038 LT, 1 091 PL,
# 1 278 SI, 1 381 ES, 1 802 FR, 2 070 BE, 2 161 DE, 2 193 NL, 2 282 IE, 2 638 LU.
# Cinq nombres (Python ; conventions de la banque seconde : Q1 et Q3 aux rangs
# ⌈n/4⌉ = 6 et ⌈3n/4⌉ = 17) : min 551 ; Q1 826 ; médiane (1 000 + 1 015) ÷ 2 =
# 1 007,5 ; Q3 1 802 (= la France) ; max 2 638. Étendue 2 087 ; écart
# interquartile 976 ; 2 638 − 1 007,5 = 1 630,5. Pays ≥ 1 802 : 6 sur 22 (27 %) ;
# de Q1 à Q3 : 12 sur 22 (55 %) ; strictement entre Q1 et la médiane : 5 ;
# au-dessus de Q3 : 5 ; sous Q1 : 5 (« environ un quart » chacun).
#
# Mapping micro → écrans (banque automatismes-graphiques, auto_stat_boite) :
# stmg_stat_boite_tpl_1 (lire médiane, Q1, Q3 ; étendue, écart interquartile) →
# 02, 03, 06, défi 2 · tpl_2 (ce que le nombre VEUT DIRE) → 04 · tpl_3 (le
# pourcentage porté par un quartile) → question 1, défi 1 · une partie longue
# n'a pas plus de valeurs (lecture de la boîte) → 07 piège, question 2.
# Écrans : 00 garde · 01 l'économiste, les 22 pays · 02 les cinq nombres · 03 les
# valeurs · 04 ce qu'ils disent · 05 question 1 · 06 les deux écarts · 07 le
# piège · 08 question 2 · 09 défi · 09b correction · 10 ce que tu as appris · 11 fin.
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit.
#
# Voix : manim/voix/stmg-stats-boite.json (débit −7) ; calage :
# manim/scripts/stmg/stats_boite_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_boite.py StatsBoiteStmg -o eleveai-maths-stmg-stats-boite --media_dir manim/scripts/stmg/media-stats-boite
# Sortie : manim/sorties/stmg/maths/statistiques/03-boite/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_i1_commun import *  # noqa: E402,F403

SMIC = [551, 707, 740, 814, 816, 826, 886, 961, 968, 970, 1000, 1015, 1038, 1091, 1278, 1381, 1802, 2070, 2161,
        2193, 2282, 2638]
CINQ = dict(mini=551, q1=826, me=1007.5, q3=1802, maxi=2638)
NOMS5 = dict(mini="min", q1="Q1", me="médiane", q3="Q3", maxi="max")
TITRE = "Salaire minimum, janvier 2025 (€ par mois)"


def billet(h=0.9):
    """Un billet de banque stylisé."""
    r = RoundedRectangle(width=h * 1.9, height=h, corner_radius=0.08, fill_color="#86efac", fill_opacity=1,
                         stroke_color="#166534", stroke_width=3)
    c = Circle(radius=h * 0.3, fill_color="#bbf7d0", fill_opacity=1, stroke_color="#166534", stroke_width=2).move_to(r)
    e = Text("€", font_size=int(60 * h), color="#166534", weight=BOLD).move_to(c)
    return VGroup(r, c, e)


class StatsBoiteBase(PaysageI1):
    nom_voix = "stmg-stats-boite"
    fichier_marques = "stats_boite_marques.json"
    identite = "Maths STMG — EleveAI"
    ceinture = "jaune"
    XL = 1.0

    def figure(self, L=10.5, fs=26, centre=P(0, 1.75), titre=TITRE, h=0.75, dy=1.45):
        """Le diagramme du coach : axe 500 → 2 750 (un nombre tous les 500), la boîte."""
        ax = AxeBoite(500, 2750, 500, L=L, fs=fs)
        b = Boite(ax, **CINQ, dy=dy, h=h, fs=fs)
        g, carte, t = carte_boite(ax, [b], titre, fs=fs + 2)
        g.move_to(centre)
        g.ax, g.b, g.titre = ax, b, t
        return g

    def grande(self):
        return caser(self.figure(centre=ORIGIN, fs=30), -6.4, 6.4, -0.9, 3.3)

    def compacte(self):
        g = self.figure(L=5.6, fs=24, centre=ORIGIN, titre="Salaire minimum 2025 (€)", dy=0.95)
        return caser(g, -6.6, 0.4, -2.0, 2.0)

    def bas(self, mob, y, x=-6.0):
        """Le bas de l'écran (sous la grande figure), calé à gauche, loin de Ti-Margo."""
        mob.move_to(P(0, y)).align_to(P(x, 0), LEFT)
        lim = 4.55 if mob.get_bottom()[1] < -1.8 else 6.5
        if mob.get_right()[0] > lim:
            mob.scale_to_fit_width(lim - x).align_to(P(x, 0), LEFT)
        return mob

    def points(self, g, y_off=0.55, r=0.07):
        """Les 22 pays : un point chacun, au-dessus de la boîte, à leur valeur."""
        b = g.b
        y = b.y + b.h / 2 + y_off
        return VGroup(*[Dot(P(g.ax.x(v)[0], y), radius=r, color=AMBRE) for v in SMIC])

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Lire un diagramme en boîte", self.identite, self.ceinture)
        g = self.figure(L=7.0, fs=22, centre=P(-0.6, 0.0), titre=None)
        self.au_mot("Lire un diagramme en boîte")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(g[0]), FadeIn(g.ax), run_time=0.7)
        self.au_mot("Cinq nombres")
        self.play(Create(g.b), run_time=0.9)
        self.au_mot("un seul dessin")
        self.play(Indicate(g.b.corps, color=AMBRE), Indicate(g.b.med, color=AMBRE), run_time=0.6)
        self.attendre_voix(marge=0.8)

    def grande_prete(self, nombres=True):
        g = self.grande()
        self.add(g)
        if nombres:
            self.add(*self.etiquettes(g))
        return g

    def etiquettes(self, g):
        """Les cinq nombres au-dessus de la boîte (la médiane un étage plus haut)."""
        return [g.b.nombre(c, etage=1 if c == "me" else 0) for c in ("mini", "q1", "me", "q3", "maxi")]

    # ── 01 : l'économiste, les 22 pays ──────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        g = self.grande()
        pts = self.points(g, y_off=-0.0)
        self.au_mot("22 pays")
        self.play(FadeIn(g[0]), FadeIn(g.ax), FadeIn(g.titre), run_time=0.5)
        self.play(LaggedStart(*[FadeIn(p, scale=2) for p in pts], lag_ratio=0.06), run_time=1.3)
        n = self.bas(self.ligne([("22", JAUNE_TITRE), ("pays", WHITE), ("de l'Union européenne", GREY_A)], 38), -1.35)
        self.play(FadeIn(n), run_time=0.4)
        self.au_mot("Le plus bas")
        bg = texte("Bulgarie 551", 24, NUIT).set_stroke(WHITE, 5, background=True)
        bg.scale(g.b._k()).next_to(pts[0], UP, buff=0.15)
        self.play(pts[0].animate.scale(1.8).set_color(ROUGE_ERREUR), run_time=0.3)
        self.au_mot("551 euros")
        self.play(FadeIn(bg, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("Le plus haut")
        lu = texte("Luxembourg 2 638", 24, NUIT).set_stroke(WHITE, 5, background=True)
        lu.scale(g.b._k()).next_to(pts[-1], UP, buff=0.15).align_to(pts[-1], RIGHT).shift(RIGHT * 0.1)
        self.play(pts[-1].animate.scale(1.8).set_color(VERT_OK), run_time=0.3)
        self.au_mot("2 638")
        self.play(FadeIn(lu, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("Un économiste")
        bi = billet(0.75)
        m = self.bas(VGroup(bi, self.t("Économiste", 44, BLEU_CALCUL)).arrange(RIGHT, buff=0.35), -2.3)
        self.play(FadeIn(m, shift=UP * 0.2), run_time=0.5)
        self.au_mot("un diagramme en boîte")
        self.play(FadeOut(VGroup(bg, lu)), pts.animate.shift(UP * (g.b.h / 2 + 0.55 * g.b._k())), Create(g.b), run_time=1.2)
        self.attendre_voix()

    # ── 02 : les cinq nombres ───────────────────────────────────────────────

    def ecran_cinq(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-cinq")
        g = self.grande_prete(nombres=False)
        b = g.b
        reperes = [("Le bout gauche", "mini", b.bout_g, "minimum"), ("Le bord gauche", "q1", None, "Q1 : 1er quartile"),
                   ("Le trait rouge", "me", b.med, "médiane"), ("Le bord droit", "q3", None, "Q3 : 3e quartile"),
                   ("Le bout droit", "maxi", b.bout_d, "maximum")]
        lignes = VGroup()
        for k, (mot, cle, mob, nom) in enumerate(reperes):
            self.au_mot(mot)
            x = g.ax.x(CINQ[cle])[0]
            haut = (1.05 if cle == "me" else 0.7) * b._k()
            fl = Arrow(P(x, b.y + b.h / 2 + haut), P(x, b.y + b.h / 2 + 0.05), buff=0, color=AMBRE,
                       stroke_width=6, max_tip_length_to_length_ratio=0.35)
            lab = texte(NOMS5[cle], 30, NUIT).set_stroke(WHITE, 5, background=True).scale(b._k())
            lab.next_to(fl, UP, buff=0.05)
            ln = self.t(nom, 32, ROUGE_ERREUR if cle == "me" else WHITE)
            lignes.add(ln)
            ln.move_to(P(-5.9 + (k % 2) * 6.0, -1.35 - (k // 2) * 0.65), aligned_edge=LEFT)
            self.play(GrowArrow(fl), FadeIn(lab), FadeIn(ln, shift=UP * 0.1), run_time=0.45)
            cible = mob if mob is not None else Line(P(x, b.y - b.h / 2), P(x, b.y + b.h / 2))
            self.play(Indicate(cible, color=AMBRE, scale_factor=1.3), run_time=0.4)
            self.play(FadeOut(fl), run_time=0.2)
        self.attendre_voix()

    # ── 03 : les valeurs ────────────────────────────────────────────────────

    def ecran_lire(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-lire")
        g = self.grande_prete(nombres=False)
        ets = self.etiquettes(g)
        mots = [("551", "mini"), ("826", "q1"), ("1 007,5", "me"), ("1 802", "q3"), ("2 638", "maxi")]
        for k, (mot, cle) in enumerate(mots):
            self.au_mot(mot)
            ln = self.ligne([(NOMS5[cle] + " :", ROUGE_ERREUR if cle == "me" else WHITE),
                             (fr(CINQ[cle]), VERT_OK)], 36)
            ln.move_to(P(-5.9 + (k % 2) * 6.0, -1.35 - (k // 2) * 0.65), aligned_edge=LEFT)
            tr = g.b.vers_axe(cle)
            self.play(FadeIn(ets[k], scale=1.4), FadeIn(ln, shift=UP * 0.1), Create(tr), run_time=0.45)
            self.play(FadeOut(tr), run_time=0.2)
            if cle == "q3":
                self.au_mot("la France")
                x = g.ax.x(1802)[0]
                fr_ = texte("France", 24, BLEU_CALCUL).set_stroke(WHITE, 5, background=True).scale(g.b._k())
                fr_.move_to(P(x, g.b.y - g.b.h / 2 - 0.3 * g.b._k()))
                self.play(FadeIn(fr_, shift=UP * 0.1), Indicate(ets[k], color=BLEU_CALCUL), run_time=0.5)
        euros = self.bas(self.t("(en euros par mois)", 30, GREY_A), -2.65, x=0.1)
        self.play(FadeIn(euros), run_time=0.3)
        self.attendre_voix()

    # ── 04 : ce qu'ils disent ───────────────────────────────────────────────

    def ecran_sens(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-sens")
        g = self.grande_prete()
        b = g.b
        self.au_mot("un quart des pays")
        z1 = VGroup(b.moust_g, b.bout_g)
        l1 = self.bas(self.ligne([("≈ 1/4", AMBRE), ("des pays :", WHITE), ("≤ 826 €", VERT_OK)], 36), -1.3)
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(z1, color=AMBRE, scale_factor=1.15), run_time=0.7)
        self.au_mot("La moitié")
        l2 = self.bas(self.ligne([("1/2", AMBRE), ("des pays :", WHITE), ("≤ 1 007,5 €", VERT_OK)], 36), -1.95)
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(b.med, color=AMBRE, scale_factor=1.3), run_time=0.7)
        self.au_mot("Les trois quarts")
        l3 = self.bas(self.ligne([("≈ 3/4", AMBRE), ("des pays :", WHITE), ("≤ 1 802 €", VERT_OK)], 36), -2.6)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.5)
        self.au_mot("La boîte contient")
        self.play(b.corps.animate.set_fill("#fde68a"), run_time=0.4)
        a = b.accolade("q1", "q3", "la moitié centrale", couleur="#b45309")
        self.play(FadeIn(a), run_time=0.4)
        self.insister(b.corps, 1.06, 0.3)
        self.attendre_voix()

    # ── 05 : question 1 (au moins 1 802 €) ──────────────────────────────────

    def compacte_prete(self):
        g = self.compacte()
        self.add(g, g.b.nombre("q3"))
        return g

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = self.compacte_prete()
        b = g.b

        def montrer():
            z = VGroup(b.moust_d, b.bout_d)
            self.play(z.animate.set_color(VERT_OK).set_stroke(width=9), run_time=0.4)

        x3 = b.ax.x(1802)[0]
        bord = Line(P(x3, b.y - b.h / 2), P(x3, b.y + b.h / 2), color=AMBRE, stroke_width=10)

        self.question_pause("05-question", "05b-reponse", ["Part des pays", "à au moins 1 802 € ?"],
                            ["25 %", "75 %", "50 %"], 0, ["1 802 = Q3 : ≈ 1/4 au-dessus", "B : en dessous ; C : la médiane"],
                            x0=self.XL + 0.2, largeur=5.0, ys=(0.95, 0.0, -0.95),
                            avant=lambda: self.play(Create(bord), run_time=0.4), geste=montrer)

    # ── 06 : les deux écarts ────────────────────────────────────────────────

    def ecran_ecarts(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-ecarts")
        g = self.grande_prete()
        b = g.b
        self.au_mot("L'étendue")
        e1 = self.bas(self.ligne([("étendue", AMBRE), ("= max − min", WHITE)], 38), -1.3)
        self.play(FadeIn(e1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("2 638 moins 551")
        c1 = self.bas(self.ligne([("2 638 − 551", WHITE), ("=", WHITE)], 38), -1.3, x=0.3)
        self.play(FadeIn(c1, shift=RIGHT * 0.2), Indicate(b.bout_g, color=AMBRE), Indicate(b.bout_d, color=AMBRE),
                  run_time=0.5)
        self.au_mot("égale 2 087")
        r1 = Text("2 087 €", font_size=38, color=VERT_OK).next_to(c1, RIGHT, buff=0.2)
        a1 = b.accolade("mini", "maxi", "2 087", couleur="#b45309")
        self.play(FadeIn(r1, scale=0.7), FadeIn(a1), run_time=0.5)
        self.au_mot("L'écart interquartile")
        e2 = self.bas(self.ligne([("écart interquartile", AMBRE), ("= Q3 − Q1", WHITE)], 38), -2.05)
        self.play(FadeIn(e2, shift=UP * 0.1), FadeOut(a1), run_time=0.4)
        self.au_mot("1 802 moins 826")
        c2 = self.bas(self.ligne([("1 802 − 826", WHITE), ("=", WHITE)], 38), -2.75)
        self.play(FadeIn(c2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 976")
        r2 = Text("976 €", font_size=38, color=VERT_OK).next_to(c2, RIGHT, buff=0.2)
        a2 = b.accolade("q1", "q3", "976", couleur=BLEU_BOITE)
        self.play(FadeIn(r2, scale=0.7), FadeIn(a2), run_time=0.5)
        self.au_mot("la largeur de la boîte")
        self.insister(b.corps, 1.06, 0.3)
        self.attendre_voix()

    # ── 07 : le piège (long ≠ nombreux) ─────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-piege")
        g = self.grande_prete(nombres=False)
        b = g.b
        self.au_mot("Le piège")
        t0 = self.bas(self.t("Le piège : long ≠ nombreux", 44, ROUGE_ERREUR), -1.3)
        self.play(Write(t0), run_time=0.6)
        self.au_mot("La moustache de droite")
        self.play(VGroup(b.moust_d, b.bout_d).animate.set_color(ORANGE_RETENUE).set_stroke(width=9), run_time=0.4)
        self.au_mot("celle de gauche")
        self.play(VGroup(b.moust_g, b.bout_g).animate.set_color(ORANGE_RETENUE).set_stroke(width=9), run_time=0.4)
        self.au_mot("Pourtant")
        pts = self.points(g)
        self.play(LaggedStart(*[FadeIn(p, scale=2) for p in pts], lag_ratio=0.05), run_time=1.1)
        self.au_mot("environ un quart des pays")
        k = b._k()
        y = b.y + b.h / 2 + 0.95 * k
        quarts = VGroup()
        for a_, b_ in (("mini", "q1"), ("q1", "me"), ("me", "q3"), ("q3", "maxi")):
            x = (g.ax.x(CINQ[a_])[0] + g.ax.x(CINQ[b_])[0]) / 2
            quarts.add(texte("≈ 1/4", 28, "#b45309").set_stroke(WHITE, 5, background=True).scale(k).move_to(P(x, y)))
        self.play(LaggedStart(*[FadeIn(q, shift=DOWN * 0.1) for q in quarts], lag_ratio=0.25), run_time=1.0)
        self.au_mot("des valeurs étalées")
        l2 = self.bas(self.ligne([("partie longue", WHITE), ("=", WHITE), ("valeurs étalées", AMBRE)], 38), -2.2)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.5)
        self.au_mot("pas plus nombreuses")
        l3 = self.bas(self.t("pas plus nombreuses !", 38, VERT_OK), -2.85)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix()

    # ── 08 : question 2 (où y a-t-il le plus de pays ?) ─────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = self.compacte()
        self.add(g)
        b = g.b

        def montrer():
            pts = self.points(g, y_off=0.35 * b._k(), r=0.05)
            self.play(LaggedStart(*[FadeIn(p, scale=2) for p in pts], lag_ratio=0.04), run_time=0.9)

        self.question_pause("08-question", "08b-reponse", ["Où y a-t-il", "le plus de pays ?"],
                            ["Q3 → max", "Q1 → médiane", "à peu près autant"], 2,
                            ["≈ 1/4 des pays dans chaque partie", "A : long ≠ nombreux ; B : l'inverse"],
                            x0=self.XL + 0.2, largeur=5.0, ys=(0.95, 0.0, -0.95),
                            avant=lambda: self.play(b.corps.animate.set_fill("#fde68a"),
                                                    VGroup(b.moust_d, b.bout_d).animate.set_color(ORANGE_RETENUE),
                                                    run_time=0.4),
                            geste=montrer)

    # ── 09 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-defi")
        g = self.grande_prete()
        self.au_mot("À toi de jouer")
        t0 = self.bas(self.t("À toi de jouer", 46, JAUNE_TITRE), -1.25)
        self.play(Write(t0), run_time=0.6)
        self.au_mot("Un : environ")
        q1 = self.bas(self.ligne([("1.", AMBRE), ("Part des pays entre 826 € et 1 802 € ?", WHITE)], 34), -1.95)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Deux : de combien")
        q2 = self.bas(self.ligne([("2.", AMBRE), ("De combien le max dépasse-t-il la médiane ?", WHITE)], 34), -2.6)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Mets pause")
        pause = VGroup(icone_pause(0.32), self.t("Mets pause !", 32, ORANGE_RETENUE)).arrange(RIGHT, buff=0.2)
        pause.next_to(t0, RIGHT, buff=0.6)
        self.play(Write(pause), run_time=0.6)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09b-correction")
        g = self.grande_prete()
        b = g.b
        t0 = self.bas(self.t("Correction", 46, JAUNE_TITRE), -1.25)
        self.play(Write(t0), run_time=0.5)
        self.au_mot("c'est la boîte")
        self.play(b.corps.animate.set_fill("#fde68a"), run_time=0.4)
        self.au_mot("environ 50 %")
        r1 = self.bas(self.ligne([("1.", AMBRE), ("de Q1 à Q3 : la boîte →", WHITE), ("≈ 50 %", VERT_OK)], 36), -1.95)
        self.play(FadeIn(r1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("2 638 moins 1 007,5")
        r2 = self.bas(self.ligne([("2.", AMBRE), ("2 638 − 1 007,5", WHITE)], 36), -2.6)
        self.play(FadeIn(r2, shift=RIGHT * 0.2), b.corps.animate.set_fill(FOND_BOITE), run_time=0.5)
        self.au_mot("égale 1 630,5")
        e2 = Text("= 1 630,5 €", font_size=36, color=VERT_OK).next_to(r2, RIGHT, buff=0.2)
        self.play(FadeIn(e2, scale=0.7), run_time=0.4)
        self.insister(e2, 1.15, 0.25)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        """Le titre EN HAUT ET CENTRÉ, la boîte dessous, les trois points en bas."""
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-finale")
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        g = self.figure(centre=ORIGIN, titre="Salaire minimum, janvier 2025 (€ par mois)", fs=30)
        tout = VGroup(g, *self.etiquettes(g))
        caser(tout, -5.6, 5.6, -0.6, tit.get_bottom()[1] - 0.25)
        self.add(tout)
        textes = [("Cinq nombres :", "min, Q1, médiane, Q3, max"), ("Chaque partie :", "≈ un quart des valeurs"),
                  ("Étendue, écart interquartile :", "des différences")]
        lignes = VGroup()
        for a_, b_ in textes:
            lignes.add(VGroup(self.coche(), self.ligne([(a_, AMBRE), (b_, WHITE)], 32)).arrange(RIGHT, buff=0.25))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        self.bas(lignes, -1.85, x=-5.9)
        for lg, mot in zip(lignes, ["cinq nombres", "Chaque partie", "Et l'étendue"]):
            self.au_mot(mot)
            self.play(FadeIn(lg[1], shift=RIGHT * 0.2), Create(lg[0]), run_time=0.6)
        self.insister(lignes[2], 1.05, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_cinq()
        self.ecran_lire()
        self.ecran_sens()
        self.ecran_question1()
        self.ecran_ecarts()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class StatsBoiteStmg(StatsBoiteBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "jaune"
