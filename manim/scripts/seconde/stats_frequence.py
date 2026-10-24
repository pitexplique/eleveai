# stats_frequence.py
# EleveAI — Maths 2de — série « Statistiques », lycée, épisode 05 : CALCULER UNE
# FRÉQUENCE (micro du coach : stat_frequence, notion statistiques_descriptives),
# AVEC VOIX. Paysage 16:9, CEINTURE VERTE (la paysage complète du niveau :
# fréquence décimale et en %, arrondi, effectif ↔ fréquence, effectif total,
# comparer avec des fréquences, défi corrigé).
#
# ⭐ Décor et métier : la CRYPTOGRAPHIE ; Sofia, CRYPTANALYSTE, casse un code
# grâce aux fréquences des lettres (problématique : décoder, comparer deux
# groupes de tailles différentes). Centres (lib/videos/centres-interet.ts,
# 15-18 ans) : ["technologie-ia", "histoire-geographie"].
# ⭐ DONNÉES RÉELLES, comptées en Python le 24/10/2026 sur l'article premier de
# la Déclaration des droits de l'homme et du citoyen (1789, domaine public) :
# « Les hommes naissent et demeurent libres et égaux en droits. Les distinctions
# sociales ne peuvent être fondées que sur l'utilité commune. »
# 113 lettres (accents ramenés à leur lettre) : E 23, S 13, T 11, N 10, I 9,
# U 7, L 6, O 6, M 5, R 5, D 4, A 3, C 3, autres 1. Première phrase seule :
# 49 lettres, 11 E. Voyelles : A 3 + E 23 + I 9 + O 6 + U 7 = 48.
# Repère : « environ 12 fois la lettre E sur 100 lettres » en français
# (fr.wikipedia.org/wiki/Fréquence_d'apparition_des_lettres, consulté le 24/10/2026).
# Le code de César (décalage de 3) : E → H, S → V, T → W, N → Q, I → L.
# Calculs (Python) : 23 ÷ 113 ≈ 0,204 → 20,4 % ; 13 ÷ 113 ≈ 11,5 % (leurre
# 113 ÷ 13 ≈ 8,7) ; 11 ÷ 49 ≈ 22,4 % ; 0,12 × 2 000 = 240 (leurre 2 000 ÷ 12 ≈
# 167) ; 30 ÷ 0,15 = 200 ; 48 ÷ 113 ≈ 0,425 → 42,5 %.
# ⭐ Figure du coach : `stat_graph` barres (canvas_stats.Barres).
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit. Division : « ÷ ».
#
# Mapping micro → écrans (banque, stat_frequence) : freq_decimale,
# freq_pourcent → 04 · freq_arrondie, freq_pourcent_arrondi → 05 (question) ·
# comparer par les fréquences → 06 · freq_vers_effectif → 07 (question) ·
# freq_vers_total → 09 (question) · freq_classe (regrouper des valeurs) → défi 10.
# (freq_cumulee : « au plus v », traité au coach et dans l'épisode 01.)
# Écrans : 00 garde · 01 Sofia · 02 le texte · 03 les effectifs · 04 la
# fréquence · 05 question 1 · 06 le piège · 07 question 2 · 08 le code de
# César · 09 question 3 · 10 défi · 10b correction · 11 ce que tu as appris · 12 fin.
#
# Voix : manim/voix/2de-stats-frequence.json (débit −10), WAV dans
# public/sons/2de-stats-frequence/ ; calage : stats_frequence_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/seconde/stats_frequence.py StatsFrequenceSeconde -o eleveai-maths-seconde-stats-frequence --media_dir manim/scripts/seconde/media-stats-frequence
# Sortie : manim/sorties/seconde/maths/statistiques/05-frequence/eleveai-maths-seconde-stats-frequence.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats2de_g1_commun import *  # noqa: E402,F401,F403

LETTRES = ["E", "S", "T", "N", "I"]
EFFS = [23, 13, 11, 10, 9]
CODE = ["H", "V", "W", "Q", "L"]
VOY = ["A", "E", "I", "O", "U"]
VOY_EFF = [3, 23, 9, 6, 7]
TEXTE = ["« Les hommes naissent et demeurent", "libres et égaux en droits. Les distinctions",
         "sociales ne peuvent être fondées", "que sur l'utilité commune. »"]


def cadenas(s=1.0):
    corps = RoundedRectangle(width=1.1 * s, height=0.85 * s, corner_radius=0.12 * s, fill_color="#f59e0b",
                             fill_opacity=1, stroke_color="#b45309", stroke_width=3)
    anse = Arc(radius=0.36 * s, start_angle=0, angle=PI, color="#94a3b8", stroke_width=10 * s).next_to(corps, UP,
                                                                                                    buff=-0.02)
    trou = VGroup(Circle(radius=0.09 * s, fill_color=NUIT, fill_opacity=1, stroke_width=0),
                  Rectangle(width=0.06 * s, height=0.2 * s, fill_color=NUIT, fill_opacity=1, stroke_width=0)
                  .shift(DOWN * 0.1 * s)).move_to(corps)
    return VGroup(anse, corps, trou)


def tuile(lettre, s=0.6, couleur=BLEU_CALCUL):
    fond = RoundedRectangle(width=s, height=s, corner_radius=0.08, fill_color="#1e293b", fill_opacity=1,
                            stroke_color=couleur, stroke_width=3)
    return VGroup(fond, Text(lettre, font_size=int(56 * s), color=WHITE, weight=BOLD).move_to(fond))


class StatsFrequenceSeconde(Paysage2de):
    nom_voix = "2de-stats-frequence"
    fichier_marques = "stats_frequence_marques.json"

    def graphe(self, cats=LETTRES, vals=EFFS, centre=P(-2.95, -0.35), titre="Lettres du texte", nom="Effectif",
               maxi=25, couleurs=None):
        return Barres(cats, vals, pas=5, sous_pas=1, maxi=maxi, largeur=4.8, hauteur=3.4, fs=28, nom_axe=nom,
                      titre=titre, couleurs=couleurs, centre=centre)

    def valeurs(self, g, fs=26):
        return VGroup(*[g.valeur(i, fs=fs) for i in range(g.n)])

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Calculer une fréquence", self.identite, "verte")
        cd = cadenas(1.0).move_to(P(-2.2, 0.35))
        tE, tH = tuile("E", 0.9), tuile("H", 0.9, ORANGE_RETENUE)
        fl = Arrow(LEFT * 0.5, RIGHT * 0.5, buff=0, color=WHITE, stroke_width=6)
        code = VGroup(tE, fl, tH).arrange(RIGHT, buff=0.3).move_to(P(0.9, 0.35))
        self.au_mot("Calculer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        self.au_mot("Comment casser")
        self.play(FadeIn(cd, shift=UP * 0.3), FadeIn(tE), run_time=0.5)
        self.play(GrowArrow(fl), FadeIn(tH, shift=LEFT * 0.3), cd[0].animate.shift(UP * 0.18), run_time=0.7)
        self.attendre_voix(marge=0.8)

    # ── 01 : Sofia, cryptanalyste ───────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        cd = cadenas(1.1).move_to(P(-3.6, 1.6))
        self.au_mot("Sofia")
        nom = self.t("Sofia", 50, JAUNE_TITRE).move_to(P(-3.6, 0.15))
        metier = self.t("cryptanalyste", 38, BLEU_CALCUL).next_to(nom, DOWN, buff=0.2).set_x(-3.6)
        self.play(FadeIn(cd, shift=UP * 0.3), Write(nom), run_time=0.6)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.4)
        self.au_mot("elle protège")
        l1 = self.col(self.t("protège les messages secrets…", 34, "#cbd5e1"), 2.5)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("les casser")
        l2 = self.col(self.t("… et sait les casser !", 34, ORANGE_RETENUE), 1.9)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), cd[0].animate.shift(UP * 0.2), run_time=0.45)
        self.au_mot("Son arme")
        l3 = self.col(self.ligne([("Son arme :", WHITE), ("la fréquence des lettres", AMBRE)], 36), 1.1)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("Un code secret")
        l4 = self.col(self.bloc(["Un code change les lettres,", "pas leurs fréquences."], 34, WHITE), 0.15)
        self.play(FadeIn(l4, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("Sa question")
        q = self.col(self.bloc(["Quelle part des lettres", "sont des E ?"], 38, ORANGE_RETENUE), -1.15)
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.5)
        self.insister(q, 1.05, 0.3)
        self.attendre_voix()

    # ── 02 : le texte d'entraînement ────────────────────────────────────────

    def ecran_texte(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-texte")
        self.au_mot("l'article premier")
        src = self.t("Article premier — Déclaration des droits de l'homme", 34, JAUNE_TITRE).move_to(P(0, 3.1))
        self.play(FadeIn(src, shift=DOWN * 0.2), run_time=0.5)
        self.au_mot("de 1789")
        an = self.t("1789", 40, AMBRE).next_to(src, DOWN, buff=0.2)
        self.play(FadeIn(an, scale=1.3), run_time=0.4)
        lignes = VGroup(*[self.t(s, 38, WHITE) for s in TEXTE]).arrange(DOWN, buff=0.18)
        carte = SurroundingRectangle(lignes, color="#94a3b8", buff=0.35, corner_radius=0.2, stroke_width=3,
                                     fill_color="#1e293b", fill_opacity=1)
        VGroup(carte, lignes).move_to(P(0, 0.2))
        self.add(carte)
        for ln, ext in zip(lignes, ["Les hommes naissent", "libres et égaux", "sociales ne peuvent", "que sur l'utilité"]):
            self.au_mot(ext)
            self.play(Write(ln), run_time=0.8)
        self.au_mot("113 lettres")
        tot = self.ligne([("113", BLEU_CALCUL), ("lettres en tout", WHITE)], 44).move_to(P(0, -2.45))
        self.play(FadeIn(tot, shift=UP * 0.2), run_time=0.45)
        self.insister(tot[0], 1.4, 0.25)
        self.attendre_voix()

    # ── 03 : les effectifs ──────────────────────────────────────────────────

    def ecran_effectifs(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-effectifs")
        g = self.graphe()
        vals = self.valeurs(g)
        l0 = self.col(self.t("Elle compte les lettres", 38, WHITE), 2.4)
        self.play(FadeIn(g.fond, scale=0.95), FadeIn(l0, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("accents compris")
        l1 = self.col(self.t("(é, ê comptent comme e)", 32, "#cbd5e1"), 1.75)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        for i, ext in enumerate(["23 E", "13 S", "11 T", "10 N", "9 I"]):
            self.au_mot(ext)
            self.play(g.pousser(i, run_time=0.45), FadeIn(vals[i], scale=1.4), run_time=0.45)
        self.au_mot("de loin")
        l2 = self.col(self.ligne([("E :", AMBRE), ("de loin la plus fréquente", WHITE)], 36), 0.6)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), g.focus(0), run_time=0.5)
        self.insister(vals[0], 1.4, 0.25)
        self.attendre_voix()

    # ── 04 : la fréquence ───────────────────────────────────────────────────

    def ecran_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-methode")
        g = self.graphe()
        vals = self.valeurs(g)
        self.add(g, vals)
        self.au_mot("La fréquence d'une valeur")
        tit = self.col(self.t("La fréquence", 48, JAUNE_TITRE), 2.5)
        self.play(Write(tit), run_time=0.45)
        self.au_mot("son effectif divisé")
        d = self.col(self.ligne([("effectif", AMBRE), ("÷", WHITE), ("effectif total", BLEU_CALCUL)], 40), 1.7)
        self.play(FadeIn(d, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("Pour le E")
        self.play(g.focus(0), run_time=0.4)
        self.au_mot("23 divisé par 113")
        a, b = self.ligne2([("E :", AMBRE), ("23 ÷ 113", WHITE)], [("≈", WHITE), ("0,204", VERT_OK)], 0.8, fs=44)
        self.play(FadeIn(a, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("environ 0,204")
        self.play(FadeIn(b, scale=1.3), run_time=0.4)
        self.au_mot("on multiplie par 100")
        c, e = self.ligne2([("× 100 :", WHITE)], [("≈", WHITE), ("20,4 %", VERT_OK)], -0.1, fs=48)
        self.play(FadeIn(c, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("environ 20,4")
        self.play(FadeIn(e, scale=1.4), run_time=0.4)
        self.play(Create(self.encadrer(VGroup(c, e), buff=0.12)), run_time=0.4)
        self.au_mot("Une lettre sur cinq")
        tuiles = VGroup(*[tuile(x, 0.55, AMBRE if x == "E" else "#475569") for x in "EABCD"]).arrange(RIGHT,
                                                                                                    buff=0.12)
        un = self.col(VGroup(self.t("1 lettre sur 5 :", 34, WHITE), tuiles).arrange(RIGHT, buff=0.3), -1.25)
        self.play(FadeIn(un, shift=UP * 0.15), run_time=0.5)
        self.play(Indicate(tuiles[0], color=AMBRE, scale_factor=1.3), run_time=0.6)
        self.attendre_voix()

    # ── 05 : question 1 (fréquence du S, en %) ──────────────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte(scale=0.35)
        g = self.graphe()
        vals = self.valeurs(g)
        self.add(g, vals)
        self.play(g.focus(1), run_time=0.3)

        def geste():
            return [Indicate(vals[1], color=VERT_OK, scale_factor=1.5)]

        t0 = self.question("05-question", "05b-reponse", ["S : 13 lettres sur 113.", "Fréquence en %, au dixième ?"],
                           ["13 %", "11,5 %", "8,7 %"], 1,
                           [("13 ÷ 113 × 100 ≈ 11,5 %", VERT_OK, "13 divisé"),
                            ("13 % : l'effectif, pas un %", ROUGE_CLAIR, "13 % confond"),
                            ("8,7 : 113 ÷ 13, à l'envers", ROUGE_CLAIR, "et 8,7")], geste=geste)
        print(f"QUESTION 1 t = {mmss(t0)}", flush=True)

    # ── 06 : le piège (comparer des effectifs) ──────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        cats = ["Phrase 1", "Texte"]
        g1 = Barres(cats, [11, 23], pas=5, sous_pas=1, maxi=25, largeur=4.0, hauteur=3.4, fs=28,
                    couleurs=["#c4b5fd", "#93c5fd"], nom_axe="Nombre de E", titre="Les E", centre=P(-3.1, -0.35))
        self.play(FadeIn(g1.fond, scale=0.95), run_time=0.4)
        self.au_mot("Le piège")
        tit = self.col(self.t("Le piège", 48, ROUGE_ERREUR), 2.5)
        self.play(Write(tit), run_time=0.4)
        self.au_mot("49 lettres")
        l1 = self.col(self.ligne([("Phrase 1 :", "#c4b5fd"), ("49 lettres", WHITE)], 38), 1.7)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("dont 11 E")
        v1 = g1.valeur(0, fs=28)
        self.play(g1.pousser(0, run_time=0.5), FadeIn(v1), run_time=0.5)
        self.au_mot("moins que 23")
        v2 = g1.valeur(1, fs=28)
        l2 = self.col(self.ligne([("11 E", "#c4b5fd"), ("<", WHITE), ("23 E", "#93c5fd")], 40), 1.0)
        self.play(g1.pousser(1, run_time=0.5), FadeIn(v2), FadeIn(l2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Mais en fréquence")
        g2 = Barres(cats, [22.4, 20.4], pas=5, sous_pas=1, maxi=25, largeur=4.0, hauteur=3.4, fs=28,
                    couleurs=["#c4b5fd", "#93c5fd"], nom_axe="Fréquence de E (%)", titre="Les E", centre=P(-3.1, -0.35))
        self.play(Transform(g1, g2), FadeOut(v1), FadeOut(v2), run_time=0.9)
        self.au_mot("11 divisé par 49")
        a, b = self.ligne2([("11 ÷ 49", WHITE)], [("≈", WHITE), ("22,4 %", "#c4b5fd")], 0.15, fs=42)
        self.play(FadeIn(a, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("environ 22,4")
        w1 = Text("22,4 %", font_size=28, color=NUIT, weight=BOLD).set_stroke(WHITE, 6, background=True)
        w1.next_to(g2.barres[0], UP, buff=0.1)
        self.play(FadeIn(b, scale=1.3), FadeIn(w1), run_time=0.4)
        self.au_mot("plus que 20,4")
        w2 = Text("20,4 %", font_size=28, color=NUIT, weight=BOLD).set_stroke(WHITE, 6, background=True)
        w2.next_to(g2.barres[1], UP, buff=0.1)
        l3 = self.col(self.ligne([("22,4 %", "#c4b5fd"), (">", WHITE), ("20,4 %", "#93c5fd")], 40), -0.65)
        self.play(FadeIn(w2), FadeIn(l3, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("on compare les fréquences")
        conc = self.col(self.t("On compare les fréquences !", 36, VERT_OK), -1.5)
        self.play(FadeIn(conc, shift=UP * 0.15), run_time=0.45)
        self.insister(conc, 1.06, 0.3)
        self.attendre_voix()

    # ── 07 : question 2 (fréquence → effectif) ──────────────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte(scale=0.35)
        cases = VGroup(*[Square(0.24, fill_color="#334155", fill_opacity=1, stroke_color="#64748b", stroke_width=1.2)
                         for _ in range(200)]).arrange_in_grid(10, 20, buff=0.03).move_to(P(-3.3, -0.1))
        titre = Text("2 000 lettres", font_size=32, color=WHITE).next_to(cases, UP, buff=0.3)
        lab = Text("1 case = 10 lettres", font_size=26, color="#cbd5e1").next_to(cases, DOWN, buff=0.25)
        self.play(FadeIn(titre), LaggedStart(*[FadeIn(c) for c in cases], lag_ratio=0.003), FadeIn(lab), run_time=0.9)

        def geste():
            return [LaggedStart(*[cases[k].animate.set_fill(AMBRE) for k in range(24)], lag_ratio=0.03),
                    Transform(lab, Text("24 cases = 240 E", font_size=26, color=AMBRE).move_to(lab))]

        t0 = self.question("07-question", "07b-reponse", ["12 % de E en français :", "combien de E sur 2 000 lettres ?"],
                           ["12", "240", "167"], 1,
                           [("0,12 × 2 000 = 240", VERT_OK, "0,12 fois"),
                            ("12 : le pourcentage lui-même", ROUGE_CLAIR, "12, c'est"),
                            ("167 ≈ 2 000 ÷ 12", ROUGE_CLAIR, "et 167")], geste=geste)
        print(f"QUESTION 2 t = {mmss(t0)}", flush=True)

    # ── 08 : le code de César ───────────────────────────────────────────────

    def ecran_code(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-code")
        g = self.graphe(titre="Lettres du message")
        vals = self.valeurs(g)
        self.add(g, vals)
        self.au_mot("Jules César")
        tit = self.col(self.t("Le code de César", 46, JAUNE_TITRE), 2.5)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("décalée de 3 rangs")
        dec = self.col(self.ligne([("chaque lettre", WHITE), ("+ 3 rangs", ORANGE_RETENUE)], 38), 1.75)
        self.play(FadeIn(dec, shift=RIGHT * 0.2), run_time=0.4)
        lignes = VGroup()
        for k, (a, b) in enumerate([("E", "H"), ("S", "V"), ("T", "W")]):
            lg = VGroup(tuile(a, 0.55), Arrow(LEFT * 0.35, RIGHT * 0.35, buff=0, color=WHITE, stroke_width=5),
                        tuile(b, 0.55, ORANGE_RETENUE)).arrange(RIGHT, buff=0.15)
            lignes.add(lg)
        lignes.arrange(RIGHT, buff=0.45)
        self.col(lignes, 0.85)
        for k, ext in enumerate(["E devient H", "S devient V", "T devient W"]):
            self.au_mot(ext)
            neuf = texte(CODE[k], 28, ORANGE_Q).move_to(g.etiquettes[k])
            self.play(FadeIn(lignes[k], shift=RIGHT * 0.2), Transform(g.etiquettes[k], neuf), run_time=0.45)
        self.au_mot("Les effectifs ne bougent pas")
        for k in (3, 4):
            g.etiquettes[k].become(texte(CODE[k], 28, ORANGE_Q).move_to(g.etiquettes[k]))
        l2 = self.col(self.t("les effectifs ne bougent pas", 34, "#cbd5e1"), 0.0)
        self.play(FadeIn(l2, shift=UP * 0.15), Indicate(vals, color=AMBRE, scale_factor=1.15), run_time=0.6)
        self.au_mot("le H est la lettre la plus fréquente")
        self.play(g.focus(0), Indicate(g.etiquettes[0], color=ORANGE_RETENUE, scale_factor=1.6), run_time=0.5)
        self.au_mot("H, c'est un E")
        l3 = self.col(self.ligne([("H", ORANGE_RETENUE), ("= E", AMBRE)], 52), -0.9)
        self.play(FadeIn(l3, scale=1.3), run_time=0.45)
        self.au_mot("Le code est cassé")
        cd = cadenas(0.6).next_to(l3, RIGHT, buff=0.6)
        ok = self.t("Code cassé !", 40, VERT_OK).move_to(P(0, -1.85)).align_to(P(self.XL, 0), LEFT)
        self.play(FadeIn(cd), FadeIn(ok, shift=UP * 0.2), run_time=0.45)
        self.play(cd[0].animate.shift(UP * 0.15 + RIGHT * 0.1).rotate(-0.4), run_time=0.4)
        self.attendre_voix()

    # ── 09 : question 3 (effectif total = effectif ÷ fréquence) ─────────────

    def ecran_question3(self):
        self.clear()
        self.add_mascotte(scale=0.35)
        tH = tuile("H", 1.4, ORANGE_RETENUE).move_to(P(-3.6, 0.6))
        info = VGroup(self.t("30 fois", 40, WHITE), self.t("= 15 % des lettres", 36, AMBRE)).arrange(DOWN, buff=0.15)
        info.next_to(tH, DOWN, buff=0.4)
        tot = self.ligne([("Total :", WHITE), ("?", ORANGE_RETENUE)], 40).next_to(info, DOWN, buff=0.4)

        def avant():
            self.au_mot("30 fois")
            self.play(FadeIn(tH, scale=0.6), FadeIn(info[0]), run_time=0.4)
            self.au_mot("15 %")
            self.play(FadeIn(info[1]), FadeIn(tot), run_time=0.4)

        def geste():
            return [Transform(tot, self.ligne([("Total :", WHITE), ("200", VERT_OK)], 40).move_to(tot))]

        t0 = self.question("09-question", "09b-reponse", ["H : 30 fois, soit 15 % des lettres.",
                                                          "Combien de lettres en tout ?"],
                           ["200", "45", "4,5"], 0,
                           [("30 ÷ 0,15 = 200", VERT_OK, "30 divisé par 0,15"),
                            ("45 = 30 + 15", ROUGE_CLAIR, "45 additionne"),
                            ("4,5 = 30 × 0,15", ROUGE_CLAIR, "et 4,5")], avant_choix=avant, geste=geste)
        print(f"QUESTION 3 t = {mmss(t0)}", flush=True)

    # ── 10 : défi (la fréquence des voyelles) ───────────────────────────────

    def graphe_voy(self):
        return self.graphe(cats=VOY, vals=VOY_EFF, titre="Les voyelles du texte",
                           couleurs=["#c4b5fd", "#fdba74", "#c4b5fd", "#c4b5fd", "#c4b5fd"])

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        self.dire("10-defi")
        g = self.graphe_voy()
        vals = self.valeurs(g)
        self.add(g.fond)
        self.au_mot("À toi de jouer")
        tit = self.col(self.t("À toi de jouer", 48, JAUNE_TITRE), 2.5)
        self.play(Write(tit), run_time=0.5)
        for i, ext in enumerate(["3 A", "23 E", "9 I", "6 O", "7 U"]):
            self.au_mot(ext)
            self.play(g.pousser(i, run_time=0.4), FadeIn(vals[i], scale=1.4), run_time=0.4)
        self.au_mot("la fréquence des voyelles")
        q = self.col(self.ligne([("Fréquence des voyelles :", WHITE), ("?", ORANGE_RETENUE)], 38), 1.55)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.45)
        self.insister(q[1], 1.5, 0.25)
        self.au_mot("en pourcentage")
        pr = self.col(self.t("en %, au dixième", 34, "#cbd5e1"), 0.85)
        self.play(FadeIn(pr, shift=UP * 0.15), run_time=0.4)
        rap = self.col(self.ligne([("Total :", "#cbd5e1"), ("113 lettres", BLEU_CALCUL)], 34), 0.15)
        self.play(FadeIn(rap, shift=UP * 0.15), run_time=0.4)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 40, ORANGE_RETENUE), -0.8)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.5)
        self.dire("10b-correction")
        g = self.graphe_voy()
        vals = self.valeurs(g)
        self.add(g, vals)
        tit = self.col(self.t("Correction", 48, JAUNE_TITRE), 2.5)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("3 plus 23")
        a, b = self.ligne2([("3 + 23 + 9 + 6 + 7", WHITE)], [("=", WHITE), ("48", AMBRE)], 1.6, fs=42)
        self.play(FadeIn(a, shift=RIGHT * 0.2), LaggedStart(*[Indicate(v, color=AMBRE) for v in vals], lag_ratio=0.15),
                  run_time=0.9)
        self.au_mot("égale 48")
        self.play(FadeIn(b, scale=1.3), run_time=0.35)
        self.au_mot("48 divisé par 113")
        c, d = self.ligne2([("48 ÷ 113", WHITE)], [("≈", WHITE), ("0,425", VERT_OK)], 0.75, fs=44)
        self.play(FadeIn(c, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("environ 0,425")
        self.play(FadeIn(d, scale=1.3), run_time=0.35)
        self.au_mot("environ 42,5")
        e = self.col(self.ligne([("≈", WHITE), ("42,5 %", VERT_OK)], 52), -0.15)
        self.play(FadeIn(e, scale=1.3), Create(self.encadrer(e, buff=0.12)), run_time=0.5)
        self.au_mot("Presque une lettre sur deux")
        pr = self.col(self.t("Presque une lettre sur deux !", 36, ORANGE_RETENUE), -1.1)
        self.play(FadeIn(pr, shift=UP * 0.15), run_time=0.45)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.55)
        self.dire("11-finale")
        self.add(cadenas(0.5).move_to(P(5.6, 2.95)))
        self.XL = -5.3
        lignes = self.finale([("Fréquence =", "effectif ÷ effectif total."),
                              ("En pourcentage :", "je multiplie par 100."),
                              ("Groupes de tailles différentes :", "je compare les fréquences."),
                              ("Effectif =", "fréquence × effectif total.")],
                             [2.15, 0.85, -0.45, -1.75], fs=36)
        for lg, ext in zip(lignes, ["La fréquence, c'est", "En pourcentage", "Pour comparer", "Et l'effectif"]):
            self.au_mot(ext)
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.0)
        self.XL = OutilsPaysage.XL

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_texte()
        self.ecran_effectifs()
        self.ecran_methode()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_code()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")
