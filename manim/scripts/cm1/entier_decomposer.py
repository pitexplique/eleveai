# entier_decomposer.py
# EleveAI — Maths CM1 (+ CM2 par `aussi`) — série « Nombres entiers », épisode A3 : DÉCOMPOSER UN
# NOMBRE (micro entier_decomposer, notion nombre_entier), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo — série `cm1-entier`.
# Décor et métier : Thomas, IMPRIMEUR (centres : art-design, technologie-ia).
#
# Mapping micro → écrans : 02 (chaque chiffre vaut selon sa colonne), 03 (un rang vide ne s'écrit
# pas), 05 (composer, l'opération inverse), 07 (« Et au CM2 » : on décompose des grands nombres),
# questions 04 (5 064, C), 06 (70 + 5 000 + 800, A), 08 (la valeur du 5 dans 405 210, C),
# défi 09 (trouver l'erreur dans 12 405 = 10 000 + 2 000 + 400 + 50).
# ⛔ L'écran 07-cm2 reste : décision de Frédéric le 21/11 (« Oui, garde-le »).
#
# Voix : manim/voix/cm1-entier-decomposer.json (validée le 21/11, Julie, débit −6) ;
# marques : entier_cm1_decomposer_marques.json (python manim/scripts/cm1/entier_marques.py cm1:decomposer).
# ⚠️ UN nombre à espace sans marque dans cette voix : « 4 000 » de l'écran 02-valeur
#    (INVENTAIRE § 6bis). Mesuré sur l'énergie du WAV : il est dit à 5,64 s → `au_t(5.64)`.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/entier_decomposer.py EntierDecomposerCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/entier_decomposer.py EntierDecomposerCM1 -o eleveai-maths-cm1-entier-decomposer --media_dir manim/scripts/cm1/media-ent-a3
# Sortie : manim/sorties/cm1/maths/entiers/03-decomposer/eleveai-maths-cm1-entier-decomposer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from entier_commun import *  # noqa: E402,F403

# Une couleur par rang, la même sur toute la vidéo : le chiffre, sa colonne et sa valeur l'ont.
C_MILLE = CLASSE_MILLE      # les milliers (violet)
C_CENT = "#fbbf24"          # les centaines
C_DIZ = "#34d399"           # les dizaines
C_UN = BLEU_D               # les unités
RANGS = (C_UN, C_DIZ, C_CENT, C_MILLE, C_MILLE, C_MILLE)  # de la DROITE vers la gauche


def coul_rang(i_depuis_droite):
    return RANGS[min(i_depuis_droite, len(RANGS) - 1)]


def colorier(chiffres, valeur):
    """Une couleur par RANG sur les chiffres posés dans le tableau (de gauche à droite),
    et la couleur du zéro qui garde la place sur les 0. Rend le VGroup, pour l'enchaîner."""
    s = [c for c in str(valeur) if c.isdigit()]
    for k, t in enumerate(chiffres):
        t.set_color(ZERO_C if s[k] == "0" else coul_rang(len(s) - 1 - k))
    return chiffres


def paquet(nombre, couleur, s=1.0, feuilles=4):
    """Un paquet d'affiches de l'imprimeur : des feuilles empilées, et son étiquette (1 000, 100, 10, 1).
    Plus le paquet compte d'affiches, plus la pile est haute."""
    pile = VGroup()
    for k in range(feuilles):
        f = Rectangle(width=0.62 * s, height=0.84 * s, fill_color="#f8fafc", fill_opacity=1,
                      stroke_color="#94a3b8", stroke_width=2)
        f.shift(RIGHT * 0.035 * s * k + UP * 0.05 * s * k)
        pile.add(f)
    bande = Rectangle(width=pile.width + 0.12 * s, height=0.16 * s, fill_color=couleur, fill_opacity=1,
                      stroke_width=0).move_to(pile)
    et = Text(nb(nombre), font_size=int(26 * s), color=couleur, weight=BOLD)
    et.next_to(pile, DOWN, buff=0.16 * s)
    g = VGroup(pile, bande, et)
    g.pile, g.etiquette = pile, et
    return hors_audit(g)


def quatre_paquets(s=1.0, buff=0.5):
    """Les quatre paquets de Thomas : mille, cent, dix, à l'unité (du plus haut au plus petit)."""
    g = VGroup(paquet(1000, C_MILLE, s, 6), paquet(100, C_CENT, s, 4),
               paquet(10, C_DIZ, s, 2), paquet(1, C_UN, s, 1))
    return g.arrange(RIGHT, buff=buff * s, aligned_edge=DOWN)


def somme(termes, fs=44, couleurs=None, buff=0.22):
    """La décomposition écrite : 7 000 + 300 + 6. .termes (les nombres) et .plus (les signes)."""
    couleurs = couleurs or [WHITE] * len(termes)
    g, tt, pp = VGroup(), [], []
    for k, (v, c) in enumerate(zip(termes, couleurs)):
        if k:
            p = Text("+", font_size=fs, color=GRAY_B, weight=BOLD)
            pp.append(p)
            g.add(p)
        t = Text(nb(v), font_size=fs, color=c, weight=BOLD)
        tt.append(t)
        g.add(t)
    g.arrange(RIGHT, buff=buff)
    g.termes, g.plus = VGroup(*tt), VGroup(*pp)
    return hors_audit(g)


class EntierDecomposerBase(PaysageEntierCM1):
    nom_voix = "cm1-entier-decomposer"
    fichier_marques = "entier_cm1_decomposer_marques.json"
    ceinture = "verte"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Décomposer un nombre", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Décomposer un nombre")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.t("Que vaut chaque chiffre", 38)
        q1 = self.ligne([("de", WHITE), (nb(7306) + " ?", JAUNE_TITRE)], 38, buff=0.25)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        pq = quatre_paquets(0.78, 0.38).move_to(P(4.0, 0.3))
        self.au_mot("Que vaut chaque chiffre")
        self.play(FadeIn(q0, shift=UP * 0.2), FadeIn(pq, scale=1.06), run_time=0.4)
        self.au_mot("de 7 306")
        self.play(FadeIn(q1, shift=UP * 0.2), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 01 : Thomas, imprimeur ──────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = thomas(0.95).move_to(P(-5.0, 0.35))
        self.au_mot("Voici Thomas")
        nom = self.t("Thomas", 42, "#60a5fa").next_to(pe, UP, buff=0.2)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il est imprimeur")
        met = self.bloc(["imprimeur"], 26, "#60a5fa").next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        XP = 0.2
        self.au_mot("Ses affiches arrivent par paquets")
        l0 = self.bloc(["Ses affiches arrivent", "par paquets :"], 34)
        self.col(l0, 2.2, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.45)
        pq = quatre_paquets(1.0, 0.55).move_to(P(2.3, -1.2))
        self.au_mot("mille, cent, dix, ou à l'unité")
        l1 = self.ligne([("mille, cent, dix,", JAUNE_TITRE), ("ou à l'unité.", WHITE)], 34, buff=0.2)
        self.col(l1, 0.95, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(pq, shift=UP * 0.25, lag_ratio=0.25), run_time=0.9)
        self.attendre_voix()

    # ── 02 : chaque chiffre vaut selon sa colonne ───────────────────────────
    def ecran_valeur(self):
        self.ecran("02-valeur")
        XP = 0.35
        # ⛔ -ql du 21/11 : le tableau était posé à x = +2,2, c'est-à-dire DANS la colonne de texte
        #    de `col()` — les phrases s'écrivaient par-dessus les cases. Les figures vont à GAUCHE,
        #    comme dans A1 et A2 ; `col()` écrit à droite.
        g = tableau_classes(("mille", "unités"), larg=0.85, h=0.8, fs_ent=19, fs_ban=18)
        g.move_to(P(-3.4, 1.45))
        self.au_mot("Chaque chiffre vaut selon sa colonne")
        l0 = self.bloc(["Chaque chiffre vaut", "selon sa colonne."], 34, JAUNE_TITRE)
        self.col(l0, 2.2, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(g, scale=1.05), run_time=0.55)
        self.au_mot("Dans 4 582")
        ch = colorier(g.poser("4582"), 4582)
        l1 = self.ligne([("Dans", WHITE), (nb(4582), WHITE)], 34)
        self.col(l1, 1.2, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(ch, scale=1.15), run_time=0.55)
        # les quatre valeurs, chacune sous sa colonne, à SON mot
        # ⚠️ « 4 000 » n'a pas de marque (INVENTAIRE § 6bis) : instant lu sur l'énergie du WAV.
        valeurs = (4000, 500, 80, 2)
        mots = (None, "puis 500", "puis 80", "puis 2")
        etiq = VGroup()
        for i, (v, mot) in enumerate(zip(valeurs, mots)):
            col = 2 + i  # le tableau a 6 colonnes, le nombre en a 4 : il commence à la 3ᵉ
            e = hors_audit(Text(nb(v), font_size=24, color=coul_rang(len(valeurs) - 1 - i), weight=BOLD))
            # ⛔ -ql du 21/11 : « 4 000 » (5 caractères) est plus large que sa colonne (0,85) et
            #    touchait « 500 » — « 4 000500 ». Les quatre valeurs sont en QUINCONCE : deux hauteurs
            #    qui alternent, et plus aucune ne peut toucher sa voisine, quelle que soit sa longueur.
            e.next_to(g.tab.cases[col], DOWN, buff=0.35 if i % 2 == 0 else 1.0)
            fl = hors_audit(Arrow(g.tab.cases[col].get_bottom() + DOWN * 0.05, e.get_top() + UP * 0.05,
                                  color=coul_rang(len(valeurs) - 1 - i), stroke_width=4,
                                  max_tip_length_to_length_ratio=0.3, buff=0))
            if mot is None:
                self.au_t(5.64)
            else:
                self.au_mot(mot)
            self.play(GrowArrow(fl), FadeIn(e, shift=DOWN * 0.08), run_time=0.4)
            etiq.add(e, fl)
        self.attendre_voix()

    # ── 03 : un rang vide ne s'écrit pas ────────────────────────────────────
    def ecran_zero(self):
        self.ecran("03-zero")
        XP = 0.35
        g = tableau_classes(("mille", "unités"), larg=0.85, h=0.8, fs_ent=19, fs_ban=18)
        g.move_to(P(-3.4, 1.45))
        self.add(g)
        ch = colorier(g.poser("7306"), 7306)
        self.add(ch)
        self.au_mot("Un zéro ne s'écrit pas")
        l0 = self.bloc(["Un zéro ne s'écrit pas", "dans la décomposition."], 34, ZERO_C)
        self.col(l0, 2.2, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), Circumscribe(g.tab.cases[4], color=ZERO_C, buff=0.03),
                  run_time=0.8)
        self.au_mot("7 306, c'est")
        l1 = self.ligne([(nb(7306) + ",", WHITE), ("c'est", WHITE)], 36, buff=0.18)
        self.col(l1, 0.9, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        s = somme((7000, 300, 6), fs=44, couleurs=[C_MILLE, C_CENT, C_UN])
        self.col(s, -0.1, XP)
        self.au_mot("7 000 plus 300")
        self.play(FadeIn(VGroup(s.termes[0], s.plus[0], s.termes[1]), shift=UP * 0.1), run_time=0.45)
        self.au_mot("6.")
        self.play(FadeIn(VGroup(s.plus[1], s.termes[2]), shift=UP * 0.1), run_time=0.4)
        rien = hors_audit(Text("rien pour les dizaines", font_size=28, color=ZERO_C, weight=BOLD))
        rien.next_to(s, DOWN, buff=0.45).align_to(s, LEFT)
        self.play(FadeIn(rien, shift=UP * 0.08), run_time=0.4)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def figure_q1(self):
        g = tableau_classes(("mille", "unités"), larg=0.78, h=0.68, fs_ent=16, fs_ban=15)
        g.move_to(P(-3.6, 1.5))
        ch = colorier(g.poser("5064"), 5064)
        out = VGroup(g, ch)
        out.cases = g.tab.cases
        return out

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q1()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(g.cases[4], color=C_DIZ, scale_factor=1.08), run_time=0.25)

        self.question_gauche("04-question", "04b-reponse",
                             ["Quelle est la bonne", "décomposition de " + nb(5064) + " ?"],
                             [self.choix(nb(5000) + " + 6 + 4"), self.choix(nb(5000) + " + 600 + 4"),
                              self.choix(nb(5000) + " + 60 + 4")], 2,
                             ["Le 6 est aux dizaines :", "il vaut 60.", "Il n'y a aucune centaine."],
                             -0.75, mot_q="Quelle est la bonne", autres_q=autres_q, autres_r=apres)

    # ── 05 : composer, l'opération inverse ──────────────────────────────────
    def ecran_composer(self):
        self.ecran("05-composer")
        XP = 0.35
        self.au_mot("On peut faire l'inverse")
        l0 = self.ligne([("On peut faire l'inverse :", WHITE), ("composer.", VERT_OK)], 34, buff=0.2)
        self.col(l0, 2.3, XP)
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("composer")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        g = tableau_classes(("mille", "unités"), larg=0.85, h=0.8, fs_ent=19, fs_ban=18)
        g.move_to(P(-3.4, 1.3))
        self.add(g)
        s = somme((20000, 400, 9), fs=42, couleurs=[C_MILLE, C_CENT, C_UN])
        self.col(s, 1.0, XP)
        self.au_mot("20 000 plus 400")
        self.play(FadeIn(VGroup(s.termes[0], s.plus[0], s.termes[1]), shift=UP * 0.1), run_time=0.45)
        # ⚠️ « 9 donne » (5,006 s) et « 20 409 » (5,481 s) ne sont séparés que de 0,47 s : ce premier
        #    fondu doit rester COURT, sinon le résultat arrive en RETARD (toléré : 0,4 s).
        self.au_mot("9 donne")
        self.play(FadeIn(VGroup(s.plus[1], s.termes[2]), shift=UP * 0.1), run_time=0.3)
        # chaque terme descend dans SA colonne
        ch = colorier(g.poser("20409"), 20409)
        self.au_mot("20 409")
        res = self.ligne([("=", GRAY_B), (nb(20409), VERT_OK)], 48, buff=0.2)
        self.col(res, -0.5, XP)
        self.play(FadeIn(ch, scale=1.15), FadeIn(res, shift=UP * 0.1), run_time=0.7)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def figure_q2(self):
        return somme((70, 5000, 800), fs=38, couleurs=[C_DIZ, C_MILLE, C_CENT]).move_to(P(-3.6, 1.5))

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q2()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(g.termes[1], color=C_MILLE, scale_factor=1.1), run_time=0.25)

        self.question_gauche("06-question", "06b-reponse",
                             ["Quel nombre fait", "70 + " + nb(5000) + " + 800 ?"],
                             [self.choix(nb(5870)), self.choix("758"), self.choix(nb(5807))], 0,
                             ["L'ordre ne change rien :", "chaque nombre va", "dans sa colonne.",
                              nb(5000) + ", 800, 70."],
                             -0.75, mot_q="Quel nombre fait", autres_q=autres_q, autres_r=apres)

    # ── 07 : « Et au CM2 » : on décompose de bien plus grands nombres ───────
    # ⛔ Gardé sur décision de Frédéric le 21/11 (« Oui, garde-le »).
    def ecran_cm2(self):
        self.ecran("07-cm2")
        self.au_mot("Et au CM2")
        tit = self.ligne([("Et au CM2,", CLASSE_MILLION), ("on décompose des millions", WHITE)], 38, buff=0.25)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit[0]), run_time=0.3)
        self.au_mot("on décompose des millions")
        self.play(FadeIn(tit[1], shift=UP * 0.1), run_time=0.3)
        g = tableau_classes(("mille", "unités"), larg=1.05, h=0.92, fs_ent=20, fs_ban=19)
        g.move_to(P(-0.1, 1.1))
        self.au_mot("639 600, c'est")
        ch = colorier(g.poser("639600"), 639600)
        self.play(FadeIn(g, scale=1.04), run_time=0.45)
        self.play(FadeIn(ch, scale=1.12), run_time=0.45)
        s = somme((600000, 30000, 9000, 600), fs=40, couleurs=[C_MILLE, C_MILLE, C_MILLE, C_CENT])
        s.move_to(P(-0.1, -1.35))
        self.au_mot("600 000 plus")
        self.play(FadeIn(VGroup(s.termes[0], s.plus[0]), shift=UP * 0.1), run_time=0.4)
        self.au_mot("30 000 plus")
        self.play(FadeIn(VGroup(s.termes[1], s.plus[1]), shift=UP * 0.1), run_time=0.4)
        self.au_mot("9 000 plus")
        self.play(FadeIn(VGroup(s.termes[2], s.plus[2]), shift=UP * 0.1), run_time=0.4)
        self.au_mot("600.")
        self.play(FadeIn(s.termes[3], shift=UP * 0.1), run_time=0.4)
        self.attendre_voix()

    # ── 08 : QUESTION 3 (réponse C) ─────────────────────────────────────────
    def figure_q3(self):
        g = tableau_classes(("mille", "unités"), larg=0.74, h=0.64, fs_ent=15, fs_ban=14)
        g.move_to(P(-3.6, 1.5))
        ch = colorier(g.poser("405210"), 405210)
        cadre = hors_audit(SurroundingRectangle(g.tab.cases[2], color=JAUNE_TITRE, buff=0.02, stroke_width=4))
        out = VGroup(g, ch, cadre)
        out.cadre = cadre
        return out

    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q3()

        def autres_q(sc):
            sc.play(FadeIn(VGroup(g[0], g[1])), run_time=0.35)
            sc.play(Create(g.cadre), run_time=0.3)

        def apres(sc):
            sc.play(Indicate(g.cadre, color=C_MILLE, scale_factor=1.1), run_time=0.25)

        self.question_gauche("08-question", "08b-reponse",
                             ["Dans " + nb(405210) + ",", "combien vaut le chiffre 5 ?"],
                             [self.choix(nb(50000)), self.choix("500"), self.choix(nb(5000))], 2,
                             ["Le 5 est dans la colonne", "des unités de mille :", "il vaut " + nb(5000) + "."],
                             -0.75, mot_q="Dans 405 210", autres_q=autres_q, autres_r=apres)

    # ── 09 : le défi (trouver l'erreur) ─────────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        self.au_mot("Un élève écrit")
        l0 = self.t("Un élève écrit :", 34)
        l0.move_to(P(-0.1, 2.3))
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("12 405 égale")
        eg = hors_audit(Text(nb(12405) + "  =", font_size=48, color=WHITE, weight=BOLD))
        s = somme((10000, 2000, 400, 50), fs=44, couleurs=[WHITE] * 4)
        ligne = VGroup(eg, s).arrange(RIGHT, buff=0.3).move_to(P(-0.1, 1.1))
        self.play(FadeIn(eg, shift=UP * 0.1), run_time=0.4)
        self.au_mot("10 000 plus")
        self.play(FadeIn(VGroup(s.termes[0], s.plus[0]), shift=UP * 0.1), run_time=0.35)
        self.au_mot("2 000 plus")
        self.play(FadeIn(VGroup(s.termes[1], s.plus[1]), shift=UP * 0.1), run_time=0.35)
        self.au_mot("400 plus")
        self.play(FadeIn(VGroup(s.termes[2], s.plus[2]), shift=UP * 0.1), run_time=0.35)
        self.au_mot("50.")
        self.play(FadeIn(s.termes[3], shift=UP * 0.1), run_time=0.35)
        self.au_mot("Où est l'erreur")
        q = self.t("Où est l'erreur ?", 42, ORANGE_RETENUE)
        q.move_to(P(-0.1, -0.5))
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(s), run_time=0.7)
        self.pause_defi(y=-1.6)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        g = tableau_classes(("mille", "unités"), larg=0.82, h=0.76, fs_ent=18, fs_ban=17)
        g.move_to(P(-3.4, 1.2))
        ch = colorier(g.poser("12405"), 12405)
        self.add(g, ch)
        XP = 0.35
        # ⛔ AUDIT-AVANCE de 0,96 s au dry run : la ligne entière arrivait sur son PREMIER mot, donc
        #    le « 5 » s'écrivait avant que la voix le dise. Chaque morceau attend SON mot, et
        #    l'extrait du second commence PAR le nombre (REPRISE-masses).
        self.au_mot("Le dernier chiffre est")
        l0 = self.ligne([("Le dernier chiffre est", WHITE), ("5.", C_UN)], 34, buff=0.18)
        self.col(l0, 1.9, XP)
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("5. Il vaut")
        self.play(FadeIn(l0[1], shift=UP * 0.1),
                  Circumscribe(g.tab.cases[5], color=C_UN, buff=0.03), run_time=0.8)
        self.au_mot("Il vaut 5 unités")
        l1 = self.ligne([("Il vaut", WHITE), ("5 unités,", VERT_OK), ("pas 50.", ROUGE_ERREUR)], 34, buff=0.2)
        self.col(l1, 0.95, XP)
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(l1[1], shift=UP * 0.1), run_time=0.4)
        self.au_mot("pas 50")
        barre = hors_audit(Line(l1[2].get_left() + LEFT * 0.05, l1[2].get_right() + RIGHT * 0.05,
                                color=ROUGE_ERREUR, stroke_width=6))
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        self.play(Create(barre), run_time=0.3)
        self.au_mot("Il n'y a aucune dizaine")
        l2 = self.t("Il n'y a aucune dizaine.", 36, ZERO_C)
        self.col(l2, -0.05, XP)
        self.play(FadeIn(l2, shift=UP * 0.1),
                  Circumscribe(g.tab.cases[4], color=ZERO_C, buff=0.03), run_time=0.8)
        # ⛔ BORD mesuré : à fs=40 centrée en x = −3,4, la somme partait à x = −7,1 (marge de 3 % :
        #    −6,68). Elle passe EN BAS, sur toute la largeur, sous les deux colonnes.
        juste = somme((10000, 2000, 400, 5), fs=38, couleurs=[C_MILLE, C_MILLE, C_CENT, VERT_OK])
        juste.move_to(P(-0.4, -2.45))
        self.play(FadeIn(juste, shift=UP * 0.1), run_time=0.5)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        # ⚠️ `finale_gauche` centre la figure en x = −4,6 : au-delà de ~3,6 unités de large, BORD.
        fig = tableau_classes(("mille", "unités"), larg=0.56, h=0.5, fs_ent=13, fs_ban=12)
        lignes = self.finale_gauche(fig, textes=[
            ("Chaque chiffre vaut", "selon sa colonne."),
            ("Un rang vide", "ne s'écrit pas.")], fs=32)
        self.add(fig)
        self.au_mot("Chaque chiffre vaut")
        self.montrer_ligne(lignes[0], Indicate(fig.tab.cases, scale_factor=1.04))
        self.au_mot("Un rang vide")
        self.montrer_ligne(lignes[1], Indicate(fig.tab.cases[4], color=ZERO_C, scale_factor=1.1))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_valeur()
        self.ecran_zero()
        self.ecran_question1()
        self.ecran_composer()
        self.ecran_question2()
        self.ecran_cm2()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class EntierDecomposerCM1(EntierDecomposerBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"
