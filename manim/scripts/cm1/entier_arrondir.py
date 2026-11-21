# entier_arrondir.py
# EleveAI — Maths CM1 (+ CM2 par `aussi`) — série « Nombres entiers », épisode A4 : ARRONDIR UN
# NOMBRE (micro entier_arrondir, notion nombre_entier), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo — série `cm1-entier`.
# Décor et métier : Léna, MÉTÉOROLOGUE (centres : meteo-climat, sciences).
#
# Mapping micro → écrans : 02 (on encadre d'abord), 03 (le chiffre juste à droite : 0-4 on garde,
# 5-9 on monte), 05 (le piège : arrondir n'est pas couper), 07 (« Et au CM2 » : l'arrondi au
# million), questions 04 (6 241 à la centaine, C), 06 (47 820 au millier, A),
# 08 (quel nombre devient 29 000, C), défi 09 (86 246 au millier près).
# ⛔ L'écran 07-cm2 reste : décision de Frédéric le 21/11 (« Oui, garde-le »).
#
# Voix : manim/voix/cm1-entier-arrondir.json (validée le 21/11, Julie, débit −6) ;
# marques : entier_cm1_arrondir_marques.json (python manim/scripts/cm1/entier_marques.py cm1:arrondir).
# ⚠️ UN nombre à espace sans marque : « 4 700 » de l'écran 02-encadrer (INVENTAIRE § 6bis).
#    Relevé syllabe par syllabe sur l'énergie du WAV (fenêtre de 10 ms, seuil 14 %) :
#    « entre » 4,65 · « 4 600 » 5,02 · « et » 6,34 · « 4 700 » **6,57** → `au_t(6.57)`.
# ⛔ Les FIGURES vont à GAUCHE (x ≈ −3,4) : `col()` écrit dans la colonne de DROITE (piège payé sur A3).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/entier_arrondir.py EntierArrondirCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/entier_arrondir.py EntierArrondirCM1 -o eleveai-maths-cm1-entier-arrondir --media_dir manim/scripts/cm1/media-ent-a4
# Sortie : manim/sorties/cm1/maths/entiers/04-arrondir/eleveai-maths-cm1-entier-arrondir.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from entier_commun import *  # noqa: E402,F403

T_4700 = 6.57  # « 4 700 » n'a pas de marque : instant relevé sur l'énergie du WAV


def nuage(s=1.0, pluie=3, couleur="#cbd5e1"):
    """Le nuage de Léna, avec ses gouttes : le décor de la météorologue."""
    boules = VGroup(*[Circle(radius=r * s, fill_color=couleur, fill_opacity=1, stroke_width=0)
                      .move_to(P(dx * s, dy * s)) for dx, dy, r in
                      ((-0.55, 0, 0.38), (0, 0.16, 0.5), (0.55, 0, 0.36), (0, -0.12, 0.42))])
    g = VGroup(boules)
    for k in range(pluie):
        x = (-0.5 + k * 0.5) * s
        goutte = Line(P(x, -0.5 * s), P(x - 0.08 * s, -0.95 * s), color="#38bdf8", stroke_width=5)
        g.add(goutte)
    return hors_audit(g)


def echelle_chiffres(s=1.0, fs=30):
    """0 1 2 3 4 | 5 6 7 8 9 : la règle de l'arrondi, en deux camps de couleur.
    .garde (0 à 4, bleu) et .monte (5 à 9, orange)."""
    gauche_ = VGroup(*[Text(str(d), font_size=fs, color=GARDE_C, weight=BOLD) for d in range(5)])
    droite_ = VGroup(*[Text(str(d), font_size=fs, color=MONTE_C, weight=BOLD) for d in range(5, 10)])
    gauche_.arrange(RIGHT, buff=0.26 * s)
    droite_.arrange(RIGHT, buff=0.26 * s)
    barre = Line(UP * 0.22 * s, DOWN * 0.22 * s, color=GRAY_B, stroke_width=4)
    g = VGroup(gauche_, barre, droite_).arrange(RIGHT, buff=0.34 * s)
    g.garde, g.monte = gauche_, droite_
    return hors_audit(g)


def droite_arrondi(a, b, v, s_v, x=-3.4, y=0.9, larg=5.2, n=10, avec_milieu=True):
    """La droite graduée de a à b, le nombre v posé dessus, les deux bornes écrites, et le milieu.
    Rend un VGroup : .d (la droite), .borne_a, .borne_b, .mil, .rep."""
    d = Droite(a, b, n=n, larg=larg).move_to(P(x, y))
    ba = d.nombre(a, nb(a), fs=30, couleur=GARDE_C)
    bb = d.nombre(b, nb(b), fs=30, couleur=MONTE_C)
    mil = milieu(d, a, b) if avec_milieu else VGroup()
    rep = repere(d, v, s_v, couleur=JAUNE_TITRE, fs=34)
    g = VGroup(d, ba, bb, mil, rep)
    g.d, g.borne_a, g.borne_b, g.mil, g.rep = d, ba, bb, mil, rep
    return g


class EntierArrondirBase(PaysageEntierCM1):
    nom_voix = "cm1-entier-arrondir"
    fichier_marques = "entier_cm1_arrondir_marques.json"
    ceinture = "verte"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Arrondir un nombre", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Arrondir un nombre")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.ligne([("Quel est l'arrondi de", WHITE), (nb(4682), JAUNE_TITRE)], 36, buff=0.22)
        q1 = self.t("à la centaine près ?", 36)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        nu = nuage(0.95).move_to(P(4.2, 0.6))
        self.au_mot("Quel est l'arrondi")
        self.play(FadeIn(q0[0], shift=UP * 0.2), FadeIn(nu, scale=1.08), run_time=0.4)
        self.au_mot("4 682")
        self.play(FadeIn(q0[1], shift=UP * 0.2), run_time=0.3)
        self.au_mot("la centaine près")
        self.play(FadeIn(q1, shift=UP * 0.2), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 01 : Léna, météorologue ─────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = lena(0.95).move_to(P(-5.0, 0.35))
        self.au_mot("Voici Léna")
        nom = self.t("Léna", 42, "#38bdf8").next_to(pe, UP, buff=0.2)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle est météorologue")
        met = self.bloc(["météorologue"], 26, "#38bdf8").next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        XP = 0.2
        self.au_mot("Pour annoncer la pluie")
        l0 = self.t("Pour annoncer la pluie,", 34)
        self.col(l0, 2.2, XP)
        nu = nuage(1.15).move_to(P(2.3, -1.2))
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(nu, scale=1.06), run_time=0.5)
        self.au_mot("elle donne un nombre simple")
        l1 = self.ligne([("elle donne un", WHITE), ("nombre simple", JAUNE_TITRE)], 34, buff=0.2)
        self.col(l1, 1.45, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("à retenir")
        l2 = self.t("à retenir.", 34)
        self.col(l2, 0.8, XP)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix()

    # ── 02 : d'abord, on encadre ────────────────────────────────────────────
    def ecran_encadrer(self):
        self.ecran("02-encadrer")
        XP = 0.35
        self.au_mot("D'abord, on encadre")
        l0 = self.t("D'abord, on encadre.", 36, JAUNE_TITRE)
        self.col(l0, 2.25, XP)
        g = droite_arrondi(4600, 4700, 4682, nb(4682), y=0.8, avec_milieu=False)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(g.d, scale=1.04), run_time=0.5)
        self.au_mot("4 682 est entre")
        l1 = self.ligne([(nb(4682), JAUNE_TITRE), ("est entre", WHITE)], 34, buff=0.2)
        self.col(l1, 1.3, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(g.rep, shift=DOWN * 0.15), run_time=0.5)
        self.au_mot("4 600")
        l2 = self.ligne([(nb(4600), GARDE_C), ("et", WHITE)], 34, buff=0.2)
        self.col(l2, 0.5, XP)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(g.borne_a, shift=UP * 0.12), run_time=0.5)
        # ⚠️ « 4 700 » n'a pas de marque : instant lu sur l'énergie du WAV (6,57 s).
        self.au_t(T_4700)
        l3 = self.t(nb(4700) + ".", 34, MONTE_C)
        self.col(l3, -0.25, XP)
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(g.borne_b, shift=UP * 0.12), run_time=0.5)
        self.attendre_voix()

    # ── 03 : le chiffre juste à droite ──────────────────────────────────────
    def ecran_regle(self):
        self.ecran("03-regle")
        XP = 0.35
        self.au_mot("Puis on regarde le chiffre")
        l0 = self.bloc(["Puis on regarde le chiffre", "juste à droite."], 34, JAUNE_TITRE)
        self.col(l0, 2.2, XP)
        # 4 682 : la centaine visée (6) encadrée, le chiffre juste à droite (8) en orange
        grand = hors_audit(Text(nb(4682), font_size=76, color=WHITE, weight=BOLD)).move_to(P(-3.4, 1.1))
        vise = hors_audit(SurroundingRectangle(grand[1], color=GARDE_C, buff=0.05, stroke_width=4))
        # ⚠️ RETARD de 0,34 s au dry run : « juste à droite » suit « Puis on regarde le chiffre »
        #    de peu ; ce premier fondu reste court.
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(grand, scale=1.05), run_time=0.3)
        self.au_mot("juste à droite")
        # ⚠️ -ql : une flèche en diagonale entre deux chiffres voisins est minuscule et illisible.
        #    Une flèche VERTICALE, posée sous le chiffre, montre sans ambiguïté lequel on regarde.
        bas = grand[2].get_bottom()
        fl = hors_audit(Arrow(bas + DOWN * 0.95, bas + DOWN * 0.1, color=MONTE_C, stroke_width=7,
                              max_tip_length_to_length_ratio=0.35))
        self.play(Create(vise), GrowArrow(fl), run_time=0.6)
        self.play(Indicate(grand[2], color=MONTE_C, scale_factor=1.25), run_time=0.4)
        ech = echelle_chiffres(1.0, 34).move_to(P(-3.4, -1.5))
        self.au_mot("De 0 à 4 on garde")
        l1 = self.ligne([("De 0 à 4", GARDE_C), ("on garde,", WHITE)], 34, buff=0.2)
        self.col(l1, 0.9, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(ech.garde, shift=UP * 0.1), run_time=0.5)
        self.au_mot("de 5 à 9 on monte")
        l2 = self.ligne([("de 5 à 9", MONTE_C), ("on monte.", WHITE)], 34, buff=0.2)
        self.col(l2, 0.1, XP)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(ech[1]), FadeIn(ech.monte, shift=UP * 0.1),
                  run_time=0.55)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def figure_q1(self):
        g = hors_audit(Text(nb(6241), font_size=58, color=WHITE, weight=BOLD))
        g.move_to(P(-3.6, 1.6))
        cad = hors_audit(SurroundingRectangle(g[1], color=GARDE_C, buff=0.05, stroke_width=4))
        out = VGroup(g, cad)
        out.nombre, out.cadre = g, cad
        return out

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q1()

        def autres_q(sc):
            sc.play(FadeIn(g.nombre), run_time=0.3)
            sc.play(Create(g.cadre), run_time=0.3)

        def apres(sc):
            sc.play(Indicate(g.nombre[2], color=GARDE_C, scale_factor=1.2), run_time=0.25)

        self.question_gauche("04-question", "04b-reponse",
                             ["Quel est l'arrondi de " + nb(6241), "à la centaine près ?"],
                             [self.choix(nb(6300)), self.choix(nb(6240)), self.choix(nb(6200))], 2,
                             ["Le chiffre des dizaines est 4.", "Comme 4 est plus petit que 5,",
                              "on garde " + nb(6200) + "."],
                             -0.75, mot_q="Quel est l'arrondi", autres_q=autres_q, autres_r=apres)

    # ── 05 : le piège — arrondir n'est pas couper ───────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        self.au_mot("Le piège")
        tit = self.t("Le piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        XP = 0.35
        self.au_mot("arrondir, ce n'est pas couper")
        l0 = self.ligne([("arrondir,", WHITE), ("ce n'est pas couper.", ROUGE_ERREUR)], 34, buff=0.2)
        self.col(l0, 2.1, XP)
        g = droite_arrondi(4600, 4700, 4682, nb(4682), y=0.7)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(g.d, scale=1.04),
                  FadeIn(g.borne_a), FadeIn(g.borne_b), run_time=0.6)
        self.play(FadeIn(g.mil), FadeIn(g.rep, shift=DOWN * 0.15), run_time=0.5)
        self.au_mot("4 682 à la centaine")
        l1 = self.ligne([(nb(4682), JAUNE_TITRE), ("à la centaine", WHITE)], 34, buff=0.2)
        self.col(l1, 1.2, XP)
        self.play(FadeIn(l1, shift=UP * 0.1),
                  Indicate(g.mil, color=GRAY_B, scale_factor=1.1), run_time=0.55)
        self.au_mot("donne 4 700")
        l2 = self.ligne([("donne", WHITE), (nb(4700) + ",", MONTE_C)], 34, buff=0.2)
        self.col(l2, 0.4, XP)
        # ⚠️ -ql : à UP*0,9 la flèche passait DERRIÈRE l'étiquette « 4 682 » du repère et ne se
        #    lisait plus. Elle monte au-dessus de l'étiquette.
        fl = hors_audit(Arrow(g.d.x(4682) + UP * 1.5, g.d.x(4700) + UP * 1.5, color=MONTE_C,
                              stroke_width=7, max_tip_length_to_length_ratio=0.16))
        self.play(FadeIn(l2, shift=UP * 0.1), GrowArrow(fl), run_time=0.6)
        self.au_mot("pas 4 600")
        l3 = self.t("pas " + nb(4600) + ".", 34, ROUGE_ERREUR)
        self.col(l3, -0.3, XP)
        barre = hors_audit(Line(l3.get_left() + LEFT * 0.05, l3.get_right() + RIGHT * 0.05,
                                color=ROUGE_ERREUR, stroke_width=5))
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        self.play(Create(barre), run_time=0.3)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def figure_q2(self):
        g = hors_audit(Text(nb(47820), font_size=54, color=WHITE, weight=BOLD))
        g.move_to(P(-3.6, 1.6))
        cad = hors_audit(SurroundingRectangle(g[1], color=GARDE_C, buff=0.05, stroke_width=4))
        out = VGroup(g, cad)
        out.nombre, out.cadre = g, cad
        return out

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q2()

        def autres_q(sc):
            sc.play(FadeIn(g.nombre), run_time=0.3)
            sc.play(Create(g.cadre), run_time=0.3)

        def apres(sc):
            sc.play(Indicate(g.nombre[2], color=MONTE_C, scale_factor=1.2), run_time=0.25)

        self.question_gauche("06-question", "06b-reponse",
                             ["Arrondis " + nb(47820), "au millier près."],
                             [self.choix(nb(48000)), self.choix(nb(47800)), self.choix(nb(47000))], 0,
                             ["Le chiffre des centaines est 8.", "Comme 8 vaut au moins 5,",
                              "on monte à " + nb(48000) + "."],
                             -0.75, mot_q="Arrondis 47 820", autres_q=autres_q, autres_r=apres)

    # ── 07 : « Et au CM2 » : l'arrondi au million ───────────────────────────
    # ⛔ Gardé sur décision de Frédéric le 21/11 (« Oui, garde-le »).
    def ecran_cm2(self):
        self.ecran("07-cm2")
        self.au_mot("Et au CM2")
        tit = self.ligne([("Et au CM2,", CLASSE_MILLION), ("on arrondit au million", WHITE)], 38, buff=0.25)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit[0]), run_time=0.3)
        self.au_mot("on arrondit au million")
        self.play(FadeIn(tit[1], shift=UP * 0.1), run_time=0.3)
        d = Droite(5000000, 6000000, n=10, larg=7.4).move_to(P(-0.1, 0.6))
        ba = d.nombre(5000000, nb(5000000), fs=30, couleur=GARDE_C)
        bb = d.nombre(6000000, nb(6000000), fs=30, couleur=MONTE_C)
        mil = milieu(d, 5000000, 6000000)
        self.au_mot("5 594 834 devient")
        rep = repere(d, 5594834, nb(5594834), couleur=JAUNE_TITRE, fs=32)
        self.play(FadeIn(d, scale=1.03), FadeIn(ba), FadeIn(bb), FadeIn(mil), run_time=0.6)
        self.play(FadeIn(rep, shift=DOWN * 0.15), run_time=0.5)
        self.au_mot("6 000 000")
        res = self.ligne([(nb(5594834), JAUNE_TITRE), ("→", GRAY_B), (nb(6000000), MONTE_C)], 40, buff=0.3)
        res.move_to(P(-0.1, -1.9))
        fl = hors_audit(Arrow(d.x(5594834) + UP * 0.95, d.x(6000000) + UP * 0.95, color=MONTE_C,
                              stroke_width=6, max_tip_length_to_length_ratio=0.1))
        self.play(GrowArrow(fl), FadeIn(res, shift=UP * 0.1), run_time=0.8)
        self.attendre_voix()

    # ── 08 : QUESTION 3 (réponse C) ─────────────────────────────────────────
    def figure_q3(self):
        d = Droite(28000, 30000, n=8, larg=5.4).move_to(P(-3.6, 1.6))
        b1 = d.nombre(28500, nb(28500), fs=22, couleur=GARDE_C)
        b2 = d.nombre(29499, nb(29499), fs=22, couleur=MONTE_C)
        zone = Rectangle(width=abs(d.x(29499)[0] - d.x(28500)[0]), height=0.42, fill_color=VERT_OK,
                         fill_opacity=0.22, stroke_color=VERT_OK, stroke_width=3)
        zone.move_to((d.x(28500) + d.x(29499)) / 2)
        cible = hors_audit(Text(nb(29000), font_size=30, color=VERT_OK, weight=BOLD))
        cible.next_to(zone, UP, buff=0.3)
        return VGroup(d, hors_audit(zone), b1, b2, cible)

    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q3()

        def autres_q(sc):
            sc.play(FadeIn(g[0], scale=1.03), run_time=0.3)

        def apres(sc):
            sc.play(FadeIn(g[1]), FadeIn(g[2]), FadeIn(g[3]), FadeIn(g[4]), run_time=0.5)

        self.question_gauche("08-question", "08b-reponse",
                             ["Au millier près,", "quel nombre devient " + nb(29000) + " ?"],
                             [self.choix(nb(29982)), self.choix(nb(28050)), self.choix(nb(28805))], 2,
                             ["Les nombres qui donnent " + nb(29000), "vont de " + nb(28500) + " à " + nb(29499) + ".",
                              "Seul " + nb(28805) + " y est."],
                             -0.75, mot_q="Au millier près", autres_q=autres_q, autres_r=apres)

    # ── 09 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        self.au_mot("Un concert a réuni")
        l0 = self.t("Un concert a réuni", 36)
        l0.move_to(P(-0.1, 2.25))
        nu = nuage(0.8).move_to(P(5.0, 2.2))
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(nu, scale=1.05), run_time=0.45)
        self.au_mot("86 246 personnes")
        l1 = self.ligne([(nb(86246), JAUNE_TITRE), ("personnes.", WHITE)], 44, buff=0.25)
        l1.move_to(P(-0.1, 1.35))
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.45)
        d = Droite(86000, 87000, n=10, larg=7.0).move_to(P(-0.1, -0.1))
        ba = d.nombre(86000, nb(86000), fs=28, couleur=GARDE_C)
        bb = d.nombre(87000, nb(87000), fs=28, couleur=MONTE_C)
        mil = milieu(d, 86000, 87000)
        rep = repere(d, 86246, nb(86246), couleur=JAUNE_TITRE, fs=28)
        self.au_mot("Arrondis au millier près")
        q = self.t("Arrondis au millier près.", 40, ORANGE_RETENUE)
        q.move_to(P(-0.1, -1.95))
        self.play(FadeIn(VGroup(d, ba, bb, mil, rep), scale=1.03), run_time=0.6)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.45)
        self.pause_defi(y=-2.75)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        grand = hors_audit(Text(nb(86246), font_size=72, color=WHITE, weight=BOLD)).move_to(P(-3.4, 1.4))
        cad = hors_audit(SurroundingRectangle(grand[1], color=GARDE_C, buff=0.05, stroke_width=4))
        self.add(grand)
        XP = 0.35
        self.au_mot("Le chiffre des centaines est")
        l0 = self.ligne([("Le chiffre des centaines est", WHITE), ("2.", GARDE_C)], 32, buff=0.18)
        self.col(l0, 1.9, XP)
        self.play(FadeIn(l0[0], shift=UP * 0.1), Create(cad), run_time=0.5)
        self.au_mot("2. Plus petit")
        self.play(FadeIn(l0[1], shift=UP * 0.1), Indicate(grand[2], color=GARDE_C, scale_factor=1.2),
                  run_time=0.5)
        self.au_mot("Plus petit que 5")
        l1 = self.ligne([("Plus petit que 5 :", GARDE_C), ("on garde", WHITE)], 34, buff=0.2)
        self.col(l1, 0.95, XP)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("on garde 86 000")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        res = hors_audit(Text(nb(86000), font_size=66, color=VERT_OK, weight=BOLD)).move_to(P(-3.4, -1.3))
        fl = hors_audit(Arrow(grand.get_bottom() + DOWN * 0.15, res.get_top() + UP * 0.15,
                              color=VERT_OK, stroke_width=6, max_tip_length_to_length_ratio=0.2))
        self.play(GrowArrow(fl), FadeIn(res, scale=1.12), run_time=0.7)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        # ⚠️ `finale_gauche` centre la figure en x = −4,6 : au-delà de ~3,6 unités de large, BORD.
        # ⛔ BORD mesuré : à (0,82 ; 26) l'échelle fait 4,2 unités et partait à x = −6,7
        #    (marge de 3 % : −6,68). `finale_gauche` centre la figure en x = −4,6.
        fig = echelle_chiffres(0.55, 20)
        lignes = self.finale_gauche(fig, textes=[
            ("On encadre, puis on regarde", "le chiffre juste à droite."),
            ("De 5 à 9,", "on monte.")], fs=32)
        self.add(fig)
        self.au_mot("On encadre")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("De 5 à 9")
        self.montrer_ligne(lignes[1], Indicate(fig.monte, color=MONTE_C, scale_factor=1.15))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_encadrer()
        self.ecran_regle()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_cm2()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class EntierArrondirCM1(EntierArrondirBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"
