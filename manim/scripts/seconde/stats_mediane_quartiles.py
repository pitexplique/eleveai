# stats_mediane_quartiles.py
# EleveAI — Maths 2de — série « Statistiques », lycée, épisode 04 : MÉDIANE ET
# QUARTILES (micro du coach : stat_mediane_quartiles, avec lire_boite et
# lire_boite_pourcentage de stat_lire_serie ; notion statistiques_descriptives),
# AVEC VOIX. Paysage 16:9, CEINTURE VERTE (la paysage complète du niveau :
# ranger, médiane paire et impaire, quartiles au rang ⌈n/4⌉ et ⌈3n/4⌉, boîte,
# robustesse de la médiane).
#
# ⭐ Décor et métier : la MUSIQUE ; Théo, INGÉNIEUR DU SON, prépare la tournée
# de l'album « Multitude » de Stromae (problématique : choisir une durée repère).
# Centres (lib/videos/centres-interet.ts, 15-18 ans) : ["musique"].
# ⭐ DONNÉES RÉELLES, vérifiées le 24/10/2026 : en.wikipedia.org/wiki/Multitude_(album),
# liste des titres : Invaincu 2:05 ; Santé 3:11 ; La solassitude 3:02 ; Fils de
# joie 3:15 ; L'enfer 3:09 ; C'est que du bonheur 2:42 ; Pas vraiment 2:42 ;
# Riez 3:21 ; Mon amour 2:52 ; Déclaration 3:04 ; Mauvaise journée 3:07 ;
# Bonne journée 3:12 ; durée totale 35:42 = 2 142 s ✓.
# En secondes, dans l'ordre de l'album : 125, 191, 182, 195, 189, 162, 162, 201,
# 172, 184, 187, 192. Rangées : 125, 162, 162, 172, 182, 184, 187, 189, 191,
# 192, 195, 201.
# Calculs (Python) : médiane (184 + 187) ÷ 2 = 185,5 ; Q1 rang 12 ÷ 4 = 3 → 162 ;
# Q3 rang 3 × 12 ÷ 4 = 9 → 191 ; sans Bonne journée (11 valeurs) : médiane
# 6e valeur = 184, milieu de la liste NON rangée = 162 ; n = 30 : rang de Q1
# ⌈7,5⌉ = 8 ; Riez 201 → 240 : médiane 185,5 inchangée, somme 2 142 → 2 181,
# moyenne 178,5 → 181,75.
# Conventions : celles de la banque seconde (médiane : valeur centrale ou
# demi-somme ; Q1, Q3 : rangs ⌈n/4⌉ et ⌈3n/4⌉ de la série rangée).
# ⭐ Figures du coach : la droite graduée (`number_line`, AxePoints du cycle 4)
# et le diagramme en boîte (`diagramme_boite`), dessiné ici (Boite).
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit. Division : « ÷ ».
#
# Mapping micro → écrans (banque) : med_desordre → 03 · med_paire → 04 ·
# med_impaire → 05 (question) · q1_liste, q3_liste → 06 · quartile_tableau
# (rang ⌈n/4⌉) → 07 (question) · lire_boite → 08 · lire_boite_pourcentage →
# 09 (question) · robustesse (stat_interpreter, en ouverture) → 10 défi.
# (med_tableau, quartile_tableau, classe_mediane : effectifs cumulés, au coach.)
# Écrans : 00 garde · 01 Théo · 02 les 12 titres · 03 ranger · 04 la médiane ·
# 05 question 1 · 06 les quartiles · 07 question 2 · 08 la boîte · 09 question 3
# · 10 défi · 10b correction · 11 ce que tu as appris · 12 fin.
#
# Voix : manim/voix/2de-stats-mediane-quartiles.json (débit −10), WAV dans
# public/sons/2de-stats-mediane-quartiles/ ; calage : stats_mediane_quartiles_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/seconde/stats_mediane_quartiles.py StatsMedianeQuartilesSeconde -o eleveai-maths-seconde-stats-mediane-quartiles --media_dir manim/scripts/seconde/media-stats-mediane-quartiles
# Sortie : manim/sorties/seconde/maths/statistiques/04-mediane-quartiles/eleveai-maths-seconde-stats-mediane-quartiles.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats2de_g1_commun import *  # noqa: E402,F401,F403

DUREES = [125, 191, 182, 195, 189, 162, 162, 201, 172, 184, 187, 192]
ORDRE = sorted(range(12), key=lambda i: (DUREES[i], i))   # l'indice album de chaque rang
RANGEES = [DUREES[i] for i in ORDRE]
VIOLET = "#c4b5fd"


def puce(v, w=0.95, h=0.62, fs=30, couleur=BLEU_CALCUL):
    fond = RoundedRectangle(width=w, height=h, corner_radius=0.12, fill_color="#1e293b", fill_opacity=1,
                            stroke_color=couleur, stroke_width=3)
    return VGroup(fond, Text(str(v), font_size=fs, color=WHITE).move_to(fond))


def egaliseur(n=9, h=1.4, w=0.22):
    hs = [0.4, 0.8, 1.0, 0.6, 0.9, 0.5, 0.75, 0.95, 0.45]
    barres = VGroup(*[RoundedRectangle(width=w, height=h * hs[k % 9], corner_radius=0.05,
                                       fill_color=[BLEU_CALCUL, VIOLET, VERT_OK][k % 3], fill_opacity=1, stroke_width=0)
                      for k in range(n)])
    barres.arrange(RIGHT, buff=0.1, aligned_edge=DOWN)
    return barres


def console(l=2.2):
    """Une table de mixage : un plateau et des curseurs."""
    plateau = RoundedRectangle(width=l, height=0.55 * l, corner_radius=0.1, fill_color="#334155", fill_opacity=1,
                               stroke_color="#94a3b8", stroke_width=3)
    rails = VGroup()
    for k in range(6):
        x = -0.38 * l + k * 0.152 * l
        y = [0.05, -0.08, 0.1, -0.02, 0.07, -0.1][k] * l
        rails.add(Line(P(x, -0.2 * l), P(x, 0.2 * l), color="#0f172a", stroke_width=4),
                  RoundedRectangle(width=0.08 * l, height=0.05 * l, corner_radius=0.01, fill_color=WHITE,
                                   fill_opacity=1, stroke_width=0).move_to(P(x, y)))
    return VGroup(plateau, rails)


class Boite(VGroup):
    """Le diagramme en boîte du coach, posé au-dessus d'un axe (axe.x(v))."""

    def __init__(self, axe, mini, q1, me, q3, maxi, y, h=0.8, couleur="#2563eb", **kw):
        super().__init__(**kw)
        X = lambda v: axe.x(v)[0]  # noqa: E731
        self.moust_g = Line(P(X(mini), y), P(X(q1), y), color=couleur, stroke_width=5)
        self.moust_d = Line(P(X(q3), y), P(X(maxi), y), color=couleur, stroke_width=5)
        self.bouts = VGroup(Line(P(X(mini), y - h / 3), P(X(mini), y + h / 3), color=couleur, stroke_width=5),
                            Line(P(X(maxi), y - h / 3), P(X(maxi), y + h / 3), color=couleur, stroke_width=5))
        self.boite = Rectangle(width=X(q3) - X(q1), height=h, fill_color="#bfdbfe", fill_opacity=0.9,
                               stroke_color=couleur, stroke_width=5).move_to(P((X(q1) + X(q3)) / 2, y))
        self.med = Line(P(X(me), y - h / 2), P(X(me), y + h / 2), color=NUIT, stroke_width=7)
        self.add(self.moust_g, self.moust_d, self.bouts, self.boite, self.med)


class StatsMedianeQuartilesSeconde(Paysage2de):
    nom_voix = "2de-stats-mediane-quartiles"
    fichier_marques = "stats_mediane_quartiles_marques.json"

    def axe(self, valeurs=RANGEES, longueur=9.4, centre=P(-0.5, -2.3), fs=24, rayon=0.11):
        return AxePoints(valeurs, 120, 210, 10, sous_pas=5, longueur=longueur, couleur="#8b5cf6", fs=fs,
                         nom="s", rayon=rayon, centre=centre)

    def rangee(self, y=2.55, valeurs=RANGEES):
        r = VGroup(*[puce(v) for v in valeurs]).arrange(RIGHT, buff=0.08)
        return r.move_to(P(0, y))

    def rangs(self, r, fs=22):
        return VGroup(*[Text(str(k + 1), font_size=fs, color="#94a3b8").next_to(p, DOWN, buff=0.1)
                        for k, p in enumerate(r)])

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Médiane et quartiles", self.identite, "verte")
        eg = egaliseur().move_to(P(-0.6, 0.3))
        self.au_mot("Médiane")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        self.au_mot("Combien dure")
        self.play(LaggedStart(*[GrowFromEdge(b, DOWN) for b in eg], lag_ratio=0.08), run_time=0.8)
        self.play(*[b.animate.stretch(f, 1, about_edge=DOWN) for b, f in zip(eg, [1.3, 0.7, 0.8, 1.4, 0.6, 1.5, 0.9,
                                                                                 0.7, 1.6])], run_time=0.6)
        self.attendre_voix(marge=0.8)

    # ── 01 : Théo, ingénieur du son ─────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        co = console(2.6).move_to(P(-3.6, 1.6))
        self.au_mot("Théo")
        nom = self.t("Théo", 50, JAUNE_TITRE).move_to(P(-3.6, 0.1))
        metier = self.t("ingénieur du son", 36, BLEU_CALCUL).next_to(nom, DOWN, buff=0.2).set_x(-3.6)
        self.play(FadeIn(co, shift=UP * 0.3), Write(nom), run_time=0.6)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.4)
        self.au_mot("la tournée")
        l0 = self.col(self.t("Il prépare une tournée :", 34, "#cbd5e1"), 2.5)
        self.play(FadeIn(l0, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Multitude")
        l1 = self.col(self.ligne([("Multitude", JAUNE_TITRE), ("— Stromae", WHITE)], 42), 1.8)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("12 titres")
        l2 = self.col(self.ligne([("12", BLEU_CALCUL), ("titres", WHITE)], 40), 1.05)
        eg = egaliseur(n=12, h=0.9, w=0.16).next_to(metier, DOWN, buff=0.45).set_x(-3.6)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), LaggedStart(*[GrowFromEdge(b, DOWN) for b in eg], lag_ratio=0.06),
                  run_time=0.7)
        self.au_mot("une durée repère")
        l3 = self.col(self.t("il lui faut une durée repère", 34, "#cbd5e1"), 0.3)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Sa question")
        q = self.col(self.bloc(["Quelle durée partage les titres", "en deux moitiés ?"], 36, ORANGE_RETENUE), -0.9)
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.5)
        self.insister(q, 1.05, 0.3)
        self.attendre_voix()

    # ── 02 : les 12 durées, dans l'ordre de l'album ─────────────────────────

    def ecran_donnees(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-donnees")
        tit = self.t("Les 12 titres, en secondes", 42, JAUNE_TITRE).move_to(P(0, 3.2))
        self.play(Write(tit), run_time=0.6)
        album = VGroup(*[puce(v, w=1.5, h=0.8, fs=38) for v in DUREES]).arrange_in_grid(2, 6, buff=(0.3, 0.45))
        album.move_to(P(0, 1.1))
        self.au_mot("2 minutes 5")
        tout = self.ligne([("Invaincu :", "#cbd5e1"), ("2 min 5 s", WHITE), ("=", WHITE), ("125 s", BLEU_CALCUL)], 38)
        tout.move_to(P(0, -1.2))
        conv, conv2 = tout[:2], tout[2:]
        self.play(FadeIn(conv, shift=UP * 0.15), run_time=0.4)
        self.au_mot("125 secondes")
        self.play(FadeIn(conv2, scale=1.3), FadeIn(album[0], scale=1.3), run_time=0.45)
        for k, ext in enumerate(["191,", "182,", "195,", "189,", ("162,", 1), ("162,", 2), "201,", "172,", "184,",
                                 "187,", "192."], start=1):
            self.au_mot(*ext) if isinstance(ext, tuple) else self.au_mot(ext)
            self.play(FadeIn(album[k], scale=1.3), run_time=0.3)
        note = self.t("dans l'ordre de l'album", 32, "#cbd5e1").move_to(P(0, -2.1))
        self.play(FadeIn(note, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 03 : ranger ─────────────────────────────────────────────────────────

    def ecran_ranger(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-ranger")
        album = VGroup(*[puce(v, w=1.5, h=0.8, fs=38) for v in DUREES]).arrange_in_grid(2, 6, buff=(0.3, 0.45))
        album.move_to(P(0, 1.1))
        self.add(album)
        ax = self.axe()
        self.au_mot("Première étape")
        e1 = self.t("1re étape, obligatoire : RANGER", 42, ORANGE_RETENUE).move_to(P(0, 3.25))
        self.play(FadeIn(e1, shift=DOWN * 0.2), run_time=0.5)
        self.au_mot("ordre croissant")
        r = self.rangee(y=2.25)
        self.play(*[Transform(album[i], r[k]) for k, i in enumerate(ORDRE)], FadeIn(ax.fond), run_time=1.2)
        etapes = ["125,", ("162,", 1), ("162,", 2), "172,", "182,", "184,", "187,", "189,", "191,", "192,", "195,",
                  "201."]
        for k, ext in enumerate(etapes):
            self.au_mot(*ext) if isinstance(ext, tuple) else self.au_mot(ext)
            self.play(Indicate(album[ORDRE[k]], color=AMBRE, scale_factor=1.15), FadeIn(ax.ronds[k], scale=1.6),
                      run_time=0.3)
        fl = Arrow(P(-5.6, 1.45), P(5.6, 1.45), buff=0, color=VERT_OK, stroke_width=6, max_tip_length_to_length_ratio=0.03)
        cr = self.t("du plus court au plus long", 32, VERT_OK).next_to(fl, DOWN, buff=0.15)
        self.play(GrowArrow(fl), FadeIn(cr), run_time=0.6)
        self.attendre_voix()

    # ── 04 : la médiane ─────────────────────────────────────────────────────

    def ecran_mediane(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-mediane")
        r = self.rangee()
        rg = self.rangs(r)
        ax = self.axe()
        self.add(r, ax)
        self.au_mot("12 valeurs")
        l1 = self.ligne([("12 valeurs :", WHITE), ("nombre pair", BLEU_CALCUL)], 40).move_to(P(0, 1.25))
        self.play(FadeIn(l1, shift=UP * 0.15), FadeIn(rg), run_time=0.5)
        self.au_mot("la 6e et la 7e")
        cadre = SurroundingRectangle(VGroup(r[5], r[6]), color=VERT_OK, buff=0.08, stroke_width=6)
        self.play(Create(cadre), Indicate(VGroup(rg[5], rg[6]), color=VERT_OK, scale_factor=1.5), run_time=0.6)
        self.au_mot("184 et 187")
        self.play(Indicate(r[5], color=VERT_OK), Indicate(r[6], color=VERT_OK), ax.ronds[5].animate.set_color(VERT_OK),
                  ax.ronds[6].animate.set_color(VERT_OK), run_time=0.5)
        self.au_mot("Médiane : 184")
        m1, m2 = self.ligne2([("Médiane :", WHITE), ("(184 + 187) ÷ 2", WHITE)], [("=", WHITE), ("185,5 s", VERT_OK)],
                             0.4, fs=44, xl=-5.2)
        VGroup(m1, m2).set_x(0)
        self.play(FadeIn(m1, shift=UP * 0.15), run_time=0.45)
        self.au_mot("égale 185,5")
        haut = max(r.get_top()[1] for r in ax.ronds) + 0.9   # au-dessus des accolades « 6 titres »
        rep = ax.repere(185.5, "185,5", couleur=VERT_OK, haut=haut)
        self.play(FadeIn(m2, scale=1.3), Create(rep), run_time=0.6)
        self.play(Create(self.encadrer(VGroup(m1, m2), buff=0.12)), run_time=0.4)
        self.au_mot("6 titres durent moins")
        a1 = ax.accolade(125, 184, "6 titres", couleur=BLEU_CALCUL, fs=26)
        self.play(FadeIn(a1), run_time=0.5)
        self.au_mot("6 titres durent plus")
        a2 = ax.accolade(187, 201, "6 titres", couleur=AMBRE, fs=26)
        self.play(FadeIn(a2), run_time=0.5)
        self.attendre_voix()

    # ── 05 : question 1 (médiane d'une série impaire) ───────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte(scale=0.35)
        ax = AxePoints(RANGEES, 120, 210, 10, sous_pas=5, longueur=5.0, couleur="#8b5cf6", fs=20, nom="s", rayon=0.1,
                       centre=P(-3.35, -0.3))
        self.add(ax)

        def retirer():
            self.au_mot("192 secondes")
            x = croix(ax.ronds[9].copy().scale(2.2), sw=5)
            self.play(Create(x), run_time=0.35)
            self.play(ax.ronds[9].animate.set_opacity(0.15), x.animate.set_opacity(0.4), run_time=0.3)

        def geste():
            return [Create(ax.repere(184, "184"))]

        t0 = self.question("05-question", "05b-reponse", ["Sans Bonne journée (192 s),", "médiane des 11 titres ?"],
                           ["185,5", "184", "162"], 1,
                           [("11 valeurs : la 6e, 184", VERT_OK, "avec 11 valeurs"),
                            ("185,5 : oublie le retrait", ROUGE_CLAIR, "185,5 oublie"),
                            ("162 : liste non rangée", ROUGE_CLAIR, "et 162")], avant_choix=retirer, geste=geste)
        print(f"QUESTION 1 t = {mmss(t0)}", flush=True)

    # ── 06 : les quartiles ──────────────────────────────────────────────────

    def ecran_quartiles(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-quartiles")
        r = self.rangee()
        rg = self.rangs(r)
        ax = self.axe()
        self.add(r, rg, ax)
        self.au_mot("coupent l'effectif en quatre")
        seps = VGroup(*[DashedLine(P((r[k].get_right()[0] + r[k + 1].get_left()[0]) / 2, 2.95),
                                   P((r[k].get_right()[0] + r[k + 1].get_left()[0]) / 2, 1.85), color=ORANGE_RETENUE,
                                   stroke_width=5, dash_length=0.08) for k in (2, 5, 8)])
        quatre = self.t("4 paquets de 3 valeurs", 34, ORANGE_RETENUE).move_to(P(0, 1.35))
        self.play(Create(seps), FadeIn(quatre), run_time=0.7)
        self.au_mot("Q1 : rang")
        q1a, q1b = self.ligne2([("Q1 :", BLEU_CALCUL), ("rang 12 ÷ 4", WHITE)], [("=", WHITE), ("3", BLEU_CALCUL)], 1.35,
                               fs=40, xl=-5.6)
        self.play(FadeOut(quatre), FadeIn(q1a, shift=UP * 0.15), run_time=0.45)
        self.au_mot("égale 3")
        self.play(FadeIn(q1b, scale=1.3), Indicate(rg[2], color=BLEU_CALCUL, scale_factor=1.8), run_time=0.45)
        self.au_mot("162 secondes")
        v1 = self.ligne([("→", WHITE), ("162 s", BLEU_CALCUL)], 40).next_to(q1b, RIGHT, buff=0.3)
        self.play(FadeIn(v1, shift=RIGHT * 0.2), r[2][0].animate.set_stroke(BLEU_CALCUL, 8),
                  Create(ax.repere(162, "Q1", couleur=BLEU_CALCUL)), run_time=0.5)
        self.au_mot("Q3 : rang")
        q3a, q3b = self.ligne2([("Q3 :", AMBRE), ("rang 3 × 12 ÷ 4", WHITE)], [("=", WHITE), ("9", AMBRE)], 0.55,
                               fs=40, xl=-5.6)
        self.play(FadeIn(q3a, shift=UP * 0.15), run_time=0.45)
        self.au_mot("égale 9")
        self.play(FadeIn(q3b, scale=1.3), Indicate(rg[8], color=AMBRE, scale_factor=1.8), run_time=0.45)
        self.au_mot("191 secondes")
        v3 = self.ligne([("→", WHITE), ("191 s", AMBRE)], 40).next_to(q3b, RIGHT, buff=0.3)
        self.play(FadeIn(v3, shift=RIGHT * 0.2), r[8][0].animate.set_stroke(AMBRE, 8),
                  Create(ax.repere(191, "Q3", couleur=AMBRE)), run_time=0.5)
        self.au_mot("Au moins un quart")
        p1 = self.ligne([("au moins 1/4 des titres :", WHITE), ("≤ 162 s", BLEU_CALCUL)], 34)
        p1.move_to(P(0, -0.1)).align_to(P(-5.6, 0), LEFT)
        self.play(FadeIn(p1, shift=UP * 0.15), run_time=0.45)
        self.au_mot("au moins trois quarts")
        p3 = self.ligne([("au moins 3/4 des titres :", WHITE), ("≤ 191 s", AMBRE)], 34)
        p3.move_to(P(0, -0.58)).align_to(P(-5.6, 0), LEFT)
        self.play(FadeIn(p3, shift=UP * 0.15), run_time=0.45)
        self.attendre_voix()

    # ── 07 : question 2 (le rang de Q1 pour 30 valeurs) ─────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte(scale=0.35)
        cases = VGroup(*[Square(0.17, fill_color="#334155", fill_opacity=1, stroke_color="#94a3b8", stroke_width=1.5)
                         for _ in range(30)]).arrange(RIGHT, buff=0.02).move_to(P(-3.3, 0.0))
        lab = VGroup(*[Text(str(k), font_size=22, color="#94a3b8").next_to(cases[k - 1], DOWN, buff=0.15)
                       for k in (1, 30)])
        titre = Text("30 valeurs rangées", font_size=30, color=WHITE).next_to(cases, UP, buff=0.4)
        self.play(FadeIn(titre), LaggedStart(*[FadeIn(c) for c in cases], lag_ratio=0.02), FadeIn(lab), run_time=0.8)

        def geste():
            r8 = Text("8", font_size=26, color=VERT_OK, weight=BOLD).next_to(cases[7], DOWN, buff=0.15)
            r75 = Text("(7,5 → 8)", font_size=26, color=VERT_OK).next_to(r8, DOWN, buff=0.1)
            return [cases[7].animate.set_fill(VERT_OK), FadeIn(r8), FadeIn(r75)]

        t0 = self.question("07-question", "07b-reponse", ["30 valeurs rangées :", "quel est le rang de Q1 ?"],
                           ["7", "7,5", "8"], 2,
                           [("30 ÷ 4 = 7,5 → 8", VERT_OK, "30 divisé par 4"),
                            ("7 : arrondi vers le bas", ROUGE_CLAIR, "7 arrondit"),
                            ("7,5 : pas un rang", ROUGE_CLAIR, "et 7,5")], geste=geste)
        print(f"QUESTION 2 t = {mmss(t0)}", flush=True)

    # ── 08 : le diagramme en boîte ──────────────────────────────────────────

    def boite(self, ax, y, h=0.8):
        return Boite(ax, 125, 162, 185.5, 191, 201, y=y, h=h)

    def ecran_boite(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-boite")
        ax = AxePoints([], 120, 210, 10, sous_pas=5, longueur=10.0, couleur="#8b5cf6", fs=26, nom="s",
                       centre=P(-0.4, -2.3))
        self.add(ax)
        yb = -0.6
        bx = self.boite(ax, yb)
        X = lambda v: ax.x(v)[0]  # noqa: E731
        self.au_mot("un diagramme en boîte")
        tit = self.t("Le diagramme en boîte", 44, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.6)

        def etiq(v, txt, nom, couleur, dy=0.0):
            t = Text(txt, font_size=32, color=couleur, weight=BOLD).move_to(P(X(v), yb + 0.85 + dy))
            n = Text(nom, font_size=24, color="#cbd5e1").next_to(t, UP, buff=0.08)
            guide = DashedLine(P(X(v), yb - 0.45), P(X(v), -1.95), color=couleur, stroke_width=3, dash_length=0.08)
            return VGroup(t, n), guide

        self.au_mot("Les moustaches")
        self.play(Create(bx.moust_g), Create(bx.moust_d), Create(bx.bouts), run_time=0.8)
        self.au_mot("minimum, 125")
        e, g = etiq(125, "125", "minimum", BLEU_CALCUL)
        self.play(FadeIn(e, shift=DOWN * 0.15), Create(g), Indicate(bx.bouts[0], color=BLEU_CALCUL), run_time=0.5)
        self.au_mot("maximum, 201")
        e, g = etiq(201, "201", "maximum", BLEU_CALCUL, dy=0.75)   # plus haut : Q3 (191) est tout près
        self.play(FadeIn(e, shift=DOWN * 0.15), Create(g), Indicate(bx.bouts[1], color=BLEU_CALCUL), run_time=0.5)
        self.au_mot("La boîte va")
        self.play(GrowFromCenter(bx.boite), run_time=0.6)
        self.au_mot("Q1, 162")
        e, g = etiq(162, "162", "Q1", AMBRE)
        self.play(FadeIn(e, shift=DOWN * 0.15), Create(g), run_time=0.5)
        self.au_mot("Q3, 191")
        e, g = etiq(191, "191", "Q3", AMBRE)
        self.play(FadeIn(e, shift=DOWN * 0.15), Create(g), run_time=0.5)
        self.au_mot("Le trait à l'intérieur")
        self.play(Create(bx.med), run_time=0.5)
        self.au_mot("la médiane, 185,5")
        e, g = etiq(185.5, "185,5", "médiane", VERT_OK, dy=1.5)
        self.play(FadeIn(e, shift=DOWN * 0.15), Create(g), run_time=0.5)
        self.insister(bx.med, 1.3, 0.25)
        self.attendre_voix()

    # ── 09 : question 3 (lire un pourcentage sur la boîte) ──────────────────

    def ecran_question3(self):
        self.clear()
        self.add_mascotte(scale=0.35)
        ax = AxePoints([], 120, 210, 10, sous_pas=5, longueur=5.0, couleur="#8b5cf6", fs=20, nom="s",
                       centre=P(-3.35, -1.2))
        bx = Boite(ax, 125, 162, 185.5, 191, 201, y=0.0, h=0.6)
        X = lambda v: ax.x(v)[0]  # noqa: E731
        labs = VGroup(*[Text(t, font_size=22, color=c).move_to(P(X(v), dy)) for v, t, c, dy in
                        [(125, "125", BLEU_CALCUL, 0.6), (162, "162", AMBRE, 0.6), (185.5, "185,5", VERT_OK, 1.0),
                         (191, "191", AMBRE, 0.6), (201, "201", BLEU_CALCUL, 1.0)]])
        self.play(FadeIn(ax), FadeIn(bx), FadeIn(labs), run_time=0.6)

        def geste():
            zone = Rectangle(width=X(191) - X(125), height=0.9, fill_color=VERT_OK, fill_opacity=0.25, stroke_width=0)
            zone.move_to(P((X(125) + X(191)) / 2, 0.0))
            pc = Text("au moins 75 % des titres", font_size=26, color=VERT_OK).next_to(ax, DOWN, buff=0.15)
            return [FadeIn(zone), FadeIn(pc)]

        t0 = self.question("09-question", "09b-reponse", ["D'après la boîte, au moins 75 %", "des titres durent…"],
                           ["191 s ou moins", "191 s ou plus", "162 s ou moins"], 0,
                           [("191 = Q3 : au moins 75 % ≤ 191", VERT_OK, "191, c'est Q3"),
                            ("191 ou plus : au moins 25 %", ROUGE_CLAIR, "191 ou plus"),
                            ("162 : c'est Q1", ROUGE_CLAIR, "et 162")], rangee=False, largeur=4.0, geste=geste)
        print(f"QUESTION 3 t = {mmss(t0)}", flush=True)

    # ── 10 : défi (la médiane résiste) ──────────────────────────────────────

    def axe_large(self, valeurs):
        return AxePoints(valeurs, 120, 250, 10, sous_pas=5, longueur=9.4, couleur="#8b5cf6", fs=22, nom="s",
                         rayon=0.11, centre=P(-0.5, -2.3))

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        self.dire("10-defi")
        r = self.rangee()
        ax = self.axe_large(RANGEES)
        riez = Text("Riez", font_size=26, color=ORANGE_RETENUE).next_to(r[11], DOWN, buff=0.12)
        self.add(r, ax)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer", 46, JAUNE_TITRE).move_to(P(0, 1.35))
        self.play(Write(tit), run_time=0.5)
        self.au_mot("Riez")
        self.play(FadeIn(riez), r[11][0].animate.set_stroke(ORANGE_RETENUE, 8), run_time=0.45)
        self.au_mot("201 secondes")
        l1 = self.ligne([("Riez :", ORANGE_RETENUE), ("201 s", WHITE)], 40).move_to(P(-2.2, 0.45))
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.4)
        self.au_mot("deviennent 240")
        l1b = self.ligne([("→", WHITE), ("240 s", ORANGE_RETENUE)], 40).next_to(l1, RIGHT, buff=0.3)
        self.play(FadeIn(l1b, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("la médiane")
        q = self.ligne([("Médiane ?", VERT_OK), ("Moyenne ?", AMBRE)], 42, buff=0.8).move_to(P(0, -0.2))
        self.play(FadeIn(q[0], shift=UP * 0.15), run_time=0.4)
        self.au_mot("et la moyenne")
        self.play(FadeIn(q[1], shift=UP * 0.15), run_time=0.4)
        self.au_mot("Mets pause")
        pause = self.t("Mets pause, et cherche !", 36, ORANGE_RETENUE).move_to(P(0, -0.85))
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        self.dire("10b-correction")
        r = self.rangee()
        ax = self.axe_large(RANGEES)
        self.add(r, ax)
        tit = self.t("Correction", 46, JAUNE_TITRE).move_to(P(-4.6, 1.4))
        self.play(Write(tit), run_time=0.5)
        self.au_mot("Riez reste à la fin")
        neuf = puce(240, couleur=ORANGE_RETENUE).move_to(r[11])
        self.play(Transform(r[11], neuf), ax.ronds[11].animate.move_to(P(ax.x(240)[0], ax.ronds[11].get_center()[1])),
                  run_time=0.8)
        self.au_mot("ne bougent pas")
        cadre = SurroundingRectangle(VGroup(r[5], r[6]), color=VERT_OK, buff=0.08, stroke_width=6)
        self.play(Create(cadre), run_time=0.45)
        self.au_mot("la médiane reste 185,5")
        m = self.ligne([("Médiane :", VERT_OK), ("185,5 s", VERT_OK), ("(inchangée)", "#cbd5e1")], 38)
        m.move_to(P(0, 0.75)).align_to(P(-5.9, 0), LEFT)
        rep = ax.repere(185.5, "médiane", couleur=VERT_OK)
        self.play(FadeIn(m, shift=UP * 0.15), Create(rep), run_time=0.5)
        self.au_mot("La somme passe")
        s1, s2 = self.ligne2([("Somme :", WHITE), ("2 142", WHITE)], [("→", WHITE), ("2 181 s", AMBRE)], 0.05, fs=38,
                             xl=-5.9)
        self.play(FadeIn(s1, shift=UP * 0.15), run_time=0.4)
        self.au_mot("à 2 181")
        self.play(FadeIn(s2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("la moyenne passe")
        n1, n2 = self.ligne2([("Moyenne :", AMBRE), ("178,5", WHITE)], [("→", WHITE), ("181,75 s", AMBRE)], -0.65,
                             fs=38, xl=-5.9)
        self.play(FadeIn(n1, shift=UP * 0.15), run_time=0.4)
        self.au_mot("à 181,75")
        self.play(FadeIn(n2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("La médiane résiste")
        conc = self.bloc(["La médiane résiste aux valeurs", "extrêmes ; la moyenne, non."], 30, ORANGE_RETENUE)
        conc.move_to(P(0, 1.5)).align_to(P(DROITE, 0), RIGHT)
        self.play(FadeIn(conc, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.55)
        self.dire("11-finale")
        eg = egaliseur(n=7, h=0.7, w=0.13).move_to(P(5.5, 2.95))
        self.add(eg)
        self.XL = -5.3
        lignes = self.finale([("D'abord,", "je range la série."),
                              ("La médiane", "la partage en deux moitiés."),
                              ("Q1 : rang n ÷ 4 ; Q3 : rang 3n ÷ 4,", "arrondis à l'entier au-dessus."),
                              ("La boîte : minimum, Q1,", "médiane, Q3, maximum.")],
                             [2.15, 0.85, -0.45, -1.8], fs=34)
        for lg, ext in zip(lignes, ["D'abord", "La médiane", "Q1 a pour rang", "Et le diagramme"]):
            self.au_mot(ext)
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.0)
        self.XL = OutilsPaysage.XL

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_donnees()
        self.ecran_ranger()
        self.ecran_mediane()
        self.ecran_question1()
        self.ecran_quartiles()
        self.ecran_question2()
        self.ecran_boite()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")
