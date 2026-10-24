# stats_ecart_type.py
# EleveAI — Maths 2de — série « Statistiques », lycée, épisode 08 : L'ÉCART
# TYPE (micro du coach : stat_ecart_type, notion statistiques_descriptives),
# AVEC VOIX. Paysage 16:9, CEINTURE VERTE : la paysage complète du niveau
# (méthode, piège, questions-pauses, défi corrigé).
#
# ⭐ Décor et métier : le VOYAGE et la géographie du climat ; Lucas, CONSEILLER
# EN VOYAGES, conseille une cliente entre Brest et Strasbourg (problématique :
# choisir ; même moyenne ne veut pas dire même dispersion). Centres
# (lib/videos/centres-interet.ts, 15-18 ans) : ["transports", "histoire-geographie"].
# ⭐ DONNÉES RÉELLES, vérifiées le 24/10/2026 : températures moyennes mensuelles,
# normales Météo-France 1991-2020, citées par Wikipédia (tableaux
# « Statistiques 1991-2020 et records ») :
#   · Brest-Guipavas, fiche 29075001 (https://fr.wikipedia.org/wiki/Brest) :
#     7,1 · 7,1 · 8,6 · 10,1 · 12,8 · 15,3 · 17 · 17,1 · 15,4 · 12,8 · 9,8 · 7,7 (année 11,7)
#   · Strasbourg-Entzheim, fiche 67124001 (https://fr.wikipedia.org/wiki/Strasbourg) :
#     2,5 · 3,6 · 7,4 · 11,3 · 15,5 · 18,9 · 20,6 · 20,3 · 16,1 · 11,5 · 6,3 · 3,3 (année 11,4)
# Calculs (Python, statistics.pstdev = le σx de la calculatrice) :
#   Brest x̄ = 11,733 ≈ 11,7, σ = 3,656 ≈ 3,7 ; Strasbourg x̄ = 11,442 ≈ 11,4,
#   σ = 6,498 ≈ 6,5 ; Brest [11,7 − 3,7 ; 11,7 + 3,7] = [8 ; 15,4] ;
#   Strasbourg x̄ + σ = 17,9 (pièges 4,9 = x̄ − σ, 24,4 = x̄ + 2σ) ;
#   mois de Strasbourg dans [4,9 ; 17,9] (avec les valeurs exactes
#   [4,94 ; 17,94], même résultat) : mars, avril, mai, septembre, octobre,
#   novembre → 6.
# ⭐ Figure du coach : `stat_graph` courbe (canvas_stats.Courbe) ; banque :
# et_comparer_series, et_regularite, et_petite_serie (la méthode), et_tableau
# (calculatrice), et_intervalle, et_compter_intervalle.
# ⛔ PAS D'ÉCART : chaque nombre s'écrit au mot où la voix le dit.
#
# Mapping micro → écrans : et_comparer_series → 02, 05 (question) ·
# et_petite_serie → 03 · et_tableau → 04 · et_regularite → 05 · et_intervalle
# → 06, 07 (question) · et_compter_intervalle → 08 défi.
# Écrans : 00 garde · 01 Lucas · 02 les deux courbes · 03 la méthode ·
# 04 la calculatrice · 05 question 1 · 06 l'intervalle · 07 question 2 ·
# 08 défi · 08b correction · 09 ce que tu as appris · 10 fin.
#
# Voix : manim/voix/2de-stats-ecart-type.json (débit −10), WAV dans
# public/sons/2de-stats-ecart-type/ ; calage : stats_ecart_type_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/seconde/stats_ecart_type.py StatsEcartTypeSeconde -o eleveai-maths-seconde-stats-ecart-type --media_dir manim/scripts/seconde/media-stats-ecart-type
# Sortie : manim/sorties/seconde/maths/statistiques/08-ecart-type/eleveai-maths-seconde-stats-ecart-type.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats2de_g2_commun import *  # noqa: E402,F401,F403

BREST = [7.1, 7.1, 8.6, 10.1, 12.8, 15.3, 17, 17.1, 15.4, 12.8, 9.8, 7.7]
STRAS = [2.5, 3.6, 7.4, 11.3, 15.5, 18.9, 20.6, 20.3, 16.1, 11.5, 6.3, 3.3]
MOIS = list("JFMAMJJASOND")
BLEU_B = "#3b82f6"
ORANGE_S = "#f97316"


def valise(l=1.6):
    corps = RoundedRectangle(width=l, height=0.7 * l, corner_radius=0.08 * l, fill_color="#92400e", fill_opacity=1,
                             stroke_color="#fbbf24", stroke_width=4)
    poignee = RoundedRectangle(width=0.35 * l, height=0.2 * l, corner_radius=0.06 * l, stroke_color="#fbbf24",
                               stroke_width=5).next_to(corps, UP, buff=-0.02)
    sangles = VGroup(*[Line(UP * 0.35 * l, DOWN * 0.35 * l, color="#fbbf24", stroke_width=4).shift(RIGHT * d * l)
                       for d in (-0.25, 0.25)])
    return VGroup(poignee, corps, sangles.move_to(corps))


class StatsEcartTypeSeconde(Paysage2de):
    nom_voix = "2de-stats-ecart-type"
    fichier_marques = "stats_ecart_type_marques.json"

    def courbes(self, centre=P(-3.4, -0.35), titre="Température moyenne (°C)"):
        """La courbe de Brest (avec la carte) et celle de Strasbourg posée sur
        le même repère (sans carte)."""
        kw = dict(pas=5, sous_pas=1, maxi=25, largeur=5.0, hauteur=3.7, fs=26)
        b = Courbe(MOIS, BREST, couleur=BLEU_B, titre=titre, centre=centre, **kw)
        s = Courbe(MOIS, STRAS, couleur=ORANGE_S, carte=False, **kw)
        s.shift(b.ref_x.get_start() - s.ref_x.get_start())
        return b, s

    def moy(self, g, v, couleur, txt=None, cote=RIGHT):
        y = g.y_axe(v)[1]
        x0, x1 = g.ref_x.get_start()[0], g.ref_x.get_end()[0]
        tr = DashedLine(P(x0, y), P(x1, y), color=couleur, stroke_width=5, dash_length=0.12)
        if txt is None:
            return tr
        return VGroup(tr, Text(txt, font_size=24, color=couleur, weight=BOLD).next_to(tr, UP, buff=0.05).align_to(
            tr, cote))

    def bande(self, g, a, b, couleur):
        ya, yb = g.y_axe(a)[1], g.y_axe(b)[1]
        x0, x1 = g.ref_x.get_start()[0], g.ref_x.get_end()[0]
        return Rectangle(width=x1 - x0, height=yb - ya, fill_color=couleur, fill_opacity=0.18, stroke_color=couleur,
                         stroke_width=3).move_to(P((x0 + x1) / 2, (ya + yb) / 2))

    def legende(self, b):
        lg = VGroup(VGroup(Dot(color=BLEU_B, radius=0.09), Text("Brest", font_size=24, color=BLEU_B)).arrange(RIGHT, buff=0.1),
                    VGroup(Dot(color=ORANGE_S, radius=0.09), Text("Strasbourg", font_size=24, color=ORANGE_S)).arrange(
                        RIGHT, buff=0.1)).arrange(RIGHT, buff=0.35)
        return lg.next_to(b.carte, DOWN, buff=0.15)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("L'écart type", self.identite, "verte")
        t1 = thermometre(1.8, BLEU_B).move_to(P(-2.6, 0.5))
        t2 = thermometre(1.8, ORANGE_S).move_to(P(-1.6, 0.5))
        q = self.bloc(["Même moyenne,", "même climat ?"], 46, BLEU_CALCUL).move_to(P(1.8, 0.45))
        self.au_mot("L'écart type")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        self.play(FadeIn(t1, shift=UP * 0.3), FadeIn(t2, shift=UP * 0.3), run_time=0.5)
        self.au_mot("Même moyenne")
        self.play(FadeIn(q, shift=LEFT * 0.3), run_time=0.45)
        self.insister(q, 1.1, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Lucas, conseiller en voyages ───────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        v = valise(1.5).move_to(P(-3.6, 2.0))
        self.au_mot("Lucas")
        nom = self.t("Lucas", 50, JAUNE_TITRE).move_to(P(-3.6, 0.55))
        metier = self.bloc(["conseiller", "en voyages"], 36, BLEU_CALCUL).next_to(nom, DOWN, buff=0.2).set_x(-3.6)
        self.play(FadeIn(v, shift=UP * 0.3), Write(nom), run_time=0.6)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.45)
        self.au_mot("Une cliente")
        cl = self.bloc(["une cliente : ni trop froid,", "ni trop chaud"], 30, GRIS).next_to(metier, DOWN, buff=0.3)
        cl.set_x(-3.6)
        self.play(FadeIn(cl, shift=UP * 0.15), run_time=0.45)
        self.au_mot("Il hésite")
        l1 = self.col(self.ligne([("Brest", BLEU_B), ("ou", WHITE), ("Strasbourg ?", ORANGE_S)], 44), 2.5)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("D'après Météo-France")
        l2 = self.col(self.bloc(["Météo-France : température", "moyenne sur l'année"], 32), 1.55)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("11,7 degrés")
        l3 = self.col(self.ligne([("Brest :", BLEU_B), ("11,7 °C", WHITE)], 42), 0.55)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("11,4 degrés")
        l4 = self.col(self.ligne([("Strasbourg :", ORANGE_S), ("11,4 °C", WHITE)], 42), -0.25)
        self.play(FadeIn(l4, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Presque pareil")
        l5 = self.col(self.t("Presque pareil !", 38, VERT_OK), -1.1)
        self.play(FadeIn(l5, shift=UP * 0.2), run_time=0.4)
        self.au_mot("Alors, même climat")
        q = self.col(self.t("Même climat ?", 44, ORANGE_RETENUE), -2.0)
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.45)
        self.insister(q, 1.1, 0.25)
        self.attendre_voix()

    # ── 02 : les deux courbes ───────────────────────────────────────────────

    def ecran_courbes(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        self.dire("02-courbes")
        b, s = self.courbes()
        lg = self.legende(b)
        self.au_mot("Regarde les 12 mois")
        self.play(FadeIn(b.fond, scale=0.95), FadeIn(lg), run_time=0.6)
        self.au_mot("À Brest")
        self.play(b.tracer(run_time=1.4))
        self.au_mot("7,1 degrés")
        l1 = self.col(self.ligne([("Brest :", BLEU_B), ("7,1 °C", WHITE), ("→ 17,1 °C", WHITE)], 38), 2.5)
        self.play(FadeIn(l1[:2], shift=RIGHT * 0.2), b.focus(0), run_time=0.45)
        self.au_mot("17,1 en août")
        self.play(FadeIn(l1[2], shift=RIGHT * 0.2), b.focus(7), run_time=0.45)
        self.au_mot("À Strasbourg")
        self.play(b.rallumer(), s.tracer(run_time=1.4))
        self.au_mot("2,5 en janvier")
        l2 = self.col(self.ligne([("Strasbourg :", ORANGE_S), ("2,5 °C", WHITE), ("→ 20,6 °C", WHITE)], 38), 1.6)
        self.play(FadeIn(l2[:2], shift=RIGHT * 0.2), Indicate(s.ronds[0], color=ORANGE_S, scale_factor=2), run_time=0.45)
        self.au_mot("20,6 en juillet")
        self.play(FadeIn(l2[2], shift=RIGHT * 0.2), Indicate(s.ronds[6], color=ORANGE_S, scale_factor=2), run_time=0.45)
        self.au_mot("Presque la même moyenne")
        mb = self.moy(b, 11.7, BLEU_B)
        ms = self.moy(s, 11.4, ORANGE_S)
        l3 = self.col(self.t("Presque la même moyenne…", 36, GRIS), 0.6)
        self.play(Create(mb), Create(ms), FadeIn(l3, shift=UP * 0.15), run_time=0.7)
        self.au_mot("s'éloigne bien plus")
        ecarts = VGroup(*[Line(s.ronds[i].get_center(), P(s.ronds[i].get_x(), s.y_axe(11.4)[1]), color=ORANGE_S,
                               stroke_width=4) for i in range(12)])
        l4 = self.col(self.bloc(["mais Strasbourg s'éloigne", "bien plus de la sienne."], 36, ORANGE_S), -0.55)
        self.play(Create(ecarts), FadeIn(l4, shift=UP * 0.15), run_time=0.8)
        self.attendre_voix()

    # ── 03 : la méthode de l'écart type ─────────────────────────────────────

    def ecran_methode(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        self.dire("03-methode")
        b, s = self.courbes(titre="Strasbourg (°C)")
        ms = self.moy(s, 11.4, ORANGE_S)
        fond = VGroup(*[m for m in b.fond])
        self.add(fond, s.ligne, s.ronds, ms)
        self.au_mot("L'écart type")
        tit = self.col(self.ligne([("L'écart type", JAUNE_TITRE), ("σ", JAUNE_TITRE)], 46), 2.65)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("mesure de combien")
        d = self.col(self.bloc(["mesure de combien les valeurs", "s'écartent de la moyenne"], 32, GRIS), 1.85)
        self.play(FadeIn(d, shift=RIGHT * 0.2), run_time=0.45)
        ecarts = VGroup(*[Line(s.ronds[i].get_center(), P(s.ronds[i].get_x(), s.y_axe(11.4)[1]), color=AMBRE,
                               stroke_width=5) for i in range(12)])
        etapes = [("1) l'écart à la moyenne", WHITE, "on prend l'écart"),
                  ("2) au carré", WHITE, "au carré"),
                  ("3) la moyenne des carrés", WHITE, "On fait la moyenne"),
                  ("   = la variance", BLEU_CALCUL, "c'est la variance"),
                  ("4) la racine carrée", WHITE, "Puis on prend"),
                  ("   = l'écart type σ", VERT_OK, "c'est l'écart type")]
        y = 0.95
        lignes = VGroup()
        for k, (txt, c, ext) in enumerate(etapes):
            self.au_mot(ext)
            t = self.col(self.t(txt, 36, c), y)
            an = [FadeIn(t, shift=RIGHT * 0.2)]
            if k == 0:
                an.append(Create(ecarts))
            elif k == 1:
                an.append(Indicate(ecarts, color=ROUGE_CLAIR, scale_factor=1.05))
            elif k == 5:
                an.append(Circumscribe(t, color=VERT_OK))
            self.play(*an, run_time=0.6)
            lignes.add(t)
            y -= 0.62
        self.attendre_voix()

    # ── 04 : la calculatrice ────────────────────────────────────────────────

    def calculatrice(self):
        corps = RoundedRectangle(width=2.6, height=4.0, corner_radius=0.25, fill_color="#1e293b", fill_opacity=1,
                                 stroke_color="#94a3b8", stroke_width=4)
        ecran = RoundedRectangle(width=2.1, height=1.0, corner_radius=0.1, fill_color="#d9f99d", fill_opacity=1,
                                 stroke_width=0).move_to(corps.get_top() + DOWN * 0.8)
        touches = VGroup(*[RoundedRectangle(width=0.42, height=0.32, corner_radius=0.06, fill_color="#475569",
                                            fill_opacity=1, stroke_width=0) for _ in range(16)])
        touches.arrange_in_grid(4, 4, buff=0.12).next_to(ecran, DOWN, buff=0.35)
        return VGroup(corps, ecran, touches)

    def ecran_calculatrice(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        self.dire("04-calculatrice")
        c = self.calculatrice().move_to(P(-3.5, -0.1))
        self.au_mot("La calculatrice")
        tit = self.col(self.t("À la calculatrice", 46, JAUNE_TITRE), 2.6)
        self.play(Write(tit), FadeIn(c, shift=UP * 0.3), run_time=0.6)
        self.play(LaggedStart(*[Indicate(t, color=BLEU_CALCUL) for t in c[2][:6]], lag_ratio=0.15), run_time=0.8)
        self.au_mot("3,7 degrés")
        e1 = Text("σ ≈ 3,7", font_size=40, color=NUIT, weight=BOLD).move_to(c[1])
        l1 = self.col(self.ligne([("Brest :", BLEU_B), ("σ ≈ 3,7 °C", WHITE)], 44), 1.2)
        self.play(FadeIn(e1), FadeIn(l1, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("6,5 degrés")
        e2 = Text("σ ≈ 6,5", font_size=40, color=NUIT, weight=BOLD).move_to(c[1])
        l2 = self.col(self.ligne([("Strasbourg :", ORANGE_S), ("σ ≈ 6,5 °C", WHITE)], 44), 0.1)
        self.play(FadeOut(e1), FadeIn(e2), FadeIn(l2, shift=RIGHT * 0.2), run_time=0.45)
        self.play(Create(self.encadrer(VGroup(l1, l2))), run_time=0.45)
        self.insister(l2[1], 1.15, 0.25)
        self.attendre_voix()

    # ── 05 : question 1 (la plus régulière) ─────────────────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte(scale=0.35)
        b, s = self.courbes()
        lg = self.legende(b)
        self.add(b, s.ligne, s.ronds, lg)

        def geste():
            return [s.ligne.animate.set_stroke(opacity=0.3), s.ronds.animate.set_opacity(0.3),
                    Indicate(b.ligne, color=VERT_OK, scale_factor=1.02)]

        t0 = self.question("05-question", "05b-reponse",
                           ["Quelle ville a la température", "la plus régulière ?"],
                           ["Strasbourg", "Brest", "Les deux, même moyenne"], 1,
                           [("Brest : le plus petit σ, 3,7", VERT_OK, "Brest a"),
                            ("même moyenne ≠ même dispersion", ROUGE_CLAIR, "même moyenne")],
                           rangee=False, geste=geste, fs_q=34, y0=3.1)
        print(f"QUESTION 1 t = {mmss(t0)}", flush=True)

    # ── 06 : l'intervalle [x̄ − σ ; x̄ + σ] ──────────────────────────────────

    def intervalle_txt(self, fs=42):
        return avec_xbarre([("[", WHITE), ("x̄", BLEU_CALCUL), ("− σ ;", WHITE), ("x̄", BLEU_CALCUL), ("+ σ ]", WHITE)],
                           fs, buff=0.12)

    def ecran_intervalle(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        self.dire("06-intervalle")
        b, s = self.courbes(titre="Brest (°C)")
        self.add(b)
        self.au_mot("on forme un intervalle")
        tit = self.col(self.t("Un intervalle", 46, JAUNE_TITRE), 2.65)
        self.play(Write(tit), run_time=0.45)
        self.au_mot("de x barre moins sigma")
        it = self.col(self.intervalle_txt(44), 1.8)
        self.play(FadeIn(it, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("À Brest")
        mb = self.moy(b, 11.7, BLEU_B, "11,7", LEFT)
        self.play(Create(mb[0]), FadeIn(mb[1]), run_time=0.5)
        self.au_mot("11,7 moins 3,7")
        g1, d1 = self.ligne2([("11,7 − 3,7", WHITE)], [("= 8", BLEU_CALCUL)], 0.85, fs=42)
        self.play(FadeIn(g1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 8")
        lb = self.moy(b, 8, VERT_OK)
        self.play(FadeIn(d1, scale=1.3), Create(lb), run_time=0.45)
        self.au_mot("11,7 plus 3,7")
        g2, d2 = self.ligne2([("11,7 + 3,7", WHITE)], [("= 15,4", BLEU_CALCUL)], 0.0, fs=42)
        self.play(FadeIn(g2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 15,4")
        lh = self.moy(b, 15.4, VERT_OK)
        bd = self.bande(b, 8, 15.4, VERT_OK)
        self.play(FadeIn(d2, scale=1.3), Create(lh), run_time=0.45)
        self.au_mot("C'est la zone")
        z = self.col(self.ligne([("Brest :", BLEU_B), ("[ 8 ; 15,4 ]", VERT_OK)], 42), -0.95)
        z2 = self.col(self.t("la zone proche de la moyenne", 32, GRIS), -1.7)
        self.play(FadeIn(bd), FadeIn(z, shift=UP * 0.15), FadeIn(z2, shift=UP * 0.15), run_time=0.6)
        self.attendre_voix()

    # ── 07 : question 2 (x̄ + σ à Strasbourg) ───────────────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte(scale=0.35)
        b, s = self.courbes(titre="Strasbourg (°C)")
        fond = VGroup(*[m for m in b.fond])
        ms = self.moy(s, 11.4, ORANGE_S, "11,4", LEFT)
        self.add(fond, s.ligne, s.ronds, ms)

        def geste():
            return [Create(self.moy(s, 17.9, VERT_OK, "17,9", LEFT))]

        t0 = self.question("07-question", "07b-reponse",
                           ["À Strasbourg,", "x̄ = 11,4 et σ = 6,5.", "Que vaut x̄ + σ ?"],
                           ["17,9", "4,9", "24,4"], 0,
                           [("11,4 + 6,5 = 17,9", VERT_OK, "11,4 plus 6,5"),
                            ("4,9 : c'est x̄ − σ", ROUGE_CLAIR, "4,9, c'est"),
                            ("24,4 : ajoute deux fois σ", ROUGE_CLAIR, "et 24,4")], geste=geste)
        print(f"QUESTION 2 t = {mmss(t0)}", flush=True)

    # ── 08 : défi et correction ─────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.55)
        self.dire("08-defi")
        b, s = self.courbes(titre="Strasbourg (°C)")
        fond = VGroup(*[m for m in b.fond])
        self.add(fond, s.ligne, s.ronds)
        self.au_mot("À toi de jouer")
        tit = self.col(self.t("À toi de jouer", 48, JAUNE_TITRE), 2.65)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("Combien de mois")
        q = self.col(self.bloc(["Combien de mois", "de Strasbourg entre"], 40), 1.5)
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.45)
        self.au_mot("entre 4,9 et 17,9")
        q2 = self.col(self.ligne([("4,9", VERT_OK), ("et", WHITE), ("17,9 °C ?", VERT_OK)], 44), 0.4)
        bd = self.bande(s, 4.9, 17.9, VERT_OK)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), FadeIn(bd), run_time=0.6)
        self.au_mot("Mets pause")
        pause = self.col(self.t("Mets pause, et cherche !", 38, ORANGE_RETENUE), -0.8)
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.5)
        self.dire("08b-correction")
        b, s = self.courbes(titre="Strasbourg (°C)")
        fond = VGroup(*[m for m in b.fond])
        bd = self.bande(s, 4.9, 17.9, VERT_OK)
        self.add(fond, bd, s.ligne, s.ronds)
        tit = self.col(self.t("Correction", 48, JAUNE_TITRE), 2.65)
        self.play(Write(tit), run_time=0.5)
        noms = [(2, "Mars", "7,4"), (3, "Avril", "11,3"), (4, "Mai", "15,5"), (8, "Sept.", "16,1"),
                (9, "Oct.", "11,5"), (10, "Nov.", "6,3")]
        exts = ["Mars, 7,4", "Avril, 11,3", "Mai, 15,5", "Septembre, 16,1", "Octobre, 11,5", "Novembre, 6,3"]
        cases = VGroup(*[self.ligne([(n, GRIS), (v, VERT_OK)], 34) for (i, n, v) in noms])
        cases.arrange_in_grid(3, 2, buff=(0.6, 0.2), col_alignments="ll")
        self.col(cases, 1.05)
        for k, ((i, n, v), e) in enumerate(zip(noms, exts)):
            self.au_mot(e)
            self.play(FadeIn(cases[k], shift=RIGHT * 0.15), s.ronds[i].animate.set_fill(VERT_OK).scale(1.4),
                      run_time=0.35)
        self.au_mot("6 mois sur 12")
        r = self.col(self.ligne([("6 mois sur 12", VERT_OK), (": la moitié", WHITE)], 42), -0.55)
        self.play(FadeIn(r, scale=1.2), run_time=0.45)
        self.play(Create(self.encadrer(r, buff=0.15)), run_time=0.4)
        self.au_mot("Lucas conseille Brest")
        f = self.col(self.bloc(["Lucas conseille Brest :", "la plus régulière."], 36, BLEU_B), -1.85)
        self.play(FadeIn(f, shift=UP * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.55)
        self.dire("09-finale")
        self.XL = -5.6
        lignes = self.finale([("L'écart type σ mesure la dispersion", "autour de la moyenne."),
                              ("Plus il est petit,", "plus la série est régulière."),
                              ("Deux séries de même moyenne peuvent", "avoir des écarts types très différents."),
                              ("[ x̄ − σ ; x̄ + σ ] entoure la moyenne.",)],
                             [2.05, 0.7, -0.65, -1.95], fs=36)
        for lg, ext in zip(lignes, ["L'écart type mesure", "Plus il est petit", "Deux séries", "Et l'intervalle"]):
            self.au_mot(ext)
            self.montrer_ligne(lg)
        self.insister(lignes[2][1], 1.05, 0.3)
        self.attendre_voix(marge=1.0)
        self.XL = OutilsPaysage.XL

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_courbes()
        self.ecran_methode()
        self.ecran_calculatrice()
        self.ecran_question1()
        self.ecran_intervalle()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
