# entier_rang.py
# EleveAI — Maths 6e — série « Nombres entiers », épisode B1 : LES RANGS D'UN NOMBRE
# (micro entier_rang, notion entier_nombre), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (« dans 7 305, le chiffre des dizaines », réponse B) — série `6e-entier`.
# Décor et métier : Inès, CONTRÔLEUSE AÉRIENNE (centres : transports, technologie-ia).
#
# Mapping micro → écrans : 02 (les rangs se lisent de droite à gauche), 03 (les quatre rangs de
# 5 482, et le CHIFFRE d'un rang), 05 (un zéro occupe un rang lui aussi), 07 (au-delà de mille :
# dizaines et centaines de mille), questions 04 (chiffre des centaines de 7 306, C), 06 (le RANG
# du chiffre 7 dans 85 676, A), 08 (centaines de mille de 915 843, C), défi 09 (altitude 5 102 m).
# ⛔ PAS d'écran « Et au CM2 » et PAS de `aussi` dans le lot B : la 6e a sa propre notion
#    (`entier_nombre`), donc 2 lignes `notion_ressources` par épisode (paysage + short), en 6e.
# ⛔ `entier_lire_ecrire` n'est PAS produit : l'ancienne vidéo `6e-entier-nombre` le couvre.
#
# Voix : manim/voix/6e-entier-rang.json (validée le 21/11, Julie, débit −6) ;
# marques : manim/scripts/cm1/entier_6e_rang_marques.json (entier_marques.py 6e:rang).
# ⭐ Cette voix n'a AUCUN nombre à espace sans marque (inventaire § 6bis) : aucun `au_t()` ici.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/entier_rang.py EntierRang6e
# python -m manim render -qh --disable_caching manim/scripts/6e/entier_rang.py EntierRang6e -o eleveai-maths-6e-entier-rang --media_dir manim/scripts/6e/media-ent-b1
# Sortie : manim/sorties/6e/maths/entiers/01-rang/eleveai-maths-6e-entier-rang.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "cm1"))

from entier_commun import *  # noqa: E402,F403

# Le dossier des marques de la série est celui du commun (manim/scripts/cm1/).
DOSSIER_MARQUES = Path(__file__).resolve().parents[1] / "cm1"

# ── Une couleur par RANG, toujours la même dans l'épisode ────────────────────────────────────────
RANGS = ["unités", "dizaines", "centaines", "unités de mille",
         "dizaines de mille", "centaines de mille"]          # de DROITE à gauche
COUL_RANG = {"unités": CLASSE_UNITE, "dizaines": AMBRE_D, "centaines": ROSE_D,
             "unités de mille": CLASSE_MILLE, "dizaines de mille": "#34d399",
             "centaines de mille": CLASSE_MILLION}


def tableau_rangs(n=4, larg=2.35, h=1.05, fs_ent=24):
    """Le tableau de numération dont les entêtes sont les RANGS écrits EN ENTIER (c'est le sujet de
    l'épisode : « unités », « dizaines »… — ⛔ pas d'abréviation, la voix dit le mot en entier).
    `n` colonnes, de « unités » à droite vers la gauche. .cases[i] / .entetes[i], i = 0 à GAUCHE.
    .rang(nom) : l'indice de colonne du rang nommé."""
    noms = list(reversed(RANGS[:n]))
    tab = TableauNum(rangs=noms, larg=larg, h=h, fs_ent=fs_ent, virgule_apres=None,
                     couleurs={r: COUL_RANG[r] for r in noms})
    tab.noms = noms
    tab.rang = lambda nom: noms.index(nom)
    return tab


def chiffres_en_cases(s, fs=58, couleur=WHITE, larg=0.8, h=0.98, buff=0.1, coupe_apres=None, coupe=0.34):
    """Les chiffres d'un nombre, chacun dans SA case : on voit les rangs sans les nommer (c'est ce
    qu'il faut sur un écran de question, où nommer le rang donnerait la réponse).
    .cases[i] / .chiffres[i], i = 0 à GAUCHE. `coupe_apres` : l'espace de classe après la i-ème case.
    ⚠️ Tout est construit DANS le groupe, donc un `move_to()` de l'appelant emmène bien les chiffres
    (le piège payé sur A5 : un mobjet construit hors du groupe reste en arrière)."""
    ch = [c for c in str(s) if c.isdigit()]
    cases, txts = VGroup(), VGroup()
    x = 0.0
    for i, c in enumerate(ch):
        case = RoundedRectangle(width=larg, height=h, corner_radius=0.08, fill_color=CASE, fill_opacity=0.5,
                                stroke_color=GRAY_B, stroke_width=3).move_to(P(x + larg / 2, 0))
        cases.add(case)
        txts.add(Text(c, font_size=fs, color=couleur, weight=BOLD).move_to(case))
        x += larg + buff
        if coupe_apres is not None and i == coupe_apres:
            x += coupe
    g = VGroup(cases, txts)
    g.cases, g.chiffres = cases, txts
    g.move_to(ORIGIN)
    return hors_audit(g)


def cadre_ici(mob, couleur=VERT_OK, buff=0.1):
    """Le cadre construit À LA POSITION DU MOMENT (⛔ jamais à la construction du groupe : le piège
    payé deux fois sur A5, trois SurroundingRectangle restés loin de leurs nombres)."""
    return hors_audit(SurroundingRectangle(mob, color=couleur, buff=buff, corner_radius=0.1, stroke_width=5))


def fleche_droite_gauche(largeur=5.4, couleur=ORANGE_RETENUE):
    """La flèche qui dit le sens de lecture : de la DROITE vers la GAUCHE."""
    fl = Arrow(P(largeur / 2, 0), P(-largeur / 2, 0), color=couleur, stroke_width=7,
               max_tip_length_to_length_ratio=0.06, buff=0)
    return hors_audit(VGroup(fl))


def avion(s=1.0, couleur="#86efac"):
    """Un petit avion vu de dessus (le blip du radar d'Inès, et l'avion du défi). Nez en haut."""
    fus = Ellipse(width=0.22 * s, height=0.92 * s, fill_color=couleur, fill_opacity=1, stroke_width=0)
    ailes = Polygon(P(-0.52 * s, 0.0), P(0.52 * s, 0.0), P(0.34 * s, -0.19 * s), P(-0.34 * s, -0.19 * s),
                    fill_color=couleur, fill_opacity=1, stroke_width=0)
    queue = Polygon(P(-0.2 * s, -0.34 * s), P(0.2 * s, -0.34 * s), P(0.12 * s, -0.46 * s), P(-0.12 * s, -0.46 * s),
                    fill_color=couleur, fill_opacity=1, stroke_width=0)
    return hors_audit(VGroup(fus, ailes, queue))


def ecran_radar(s=1.0):
    """L'écran radar d'Inès : trois anneaux, la croix, le balayage et un avion.
    ⚠️ Le point du blip est DANS le groupe (`.blip`) : il suit la carte quand l'appelant la déplace."""
    cadre = RoundedRectangle(width=3.3 * s, height=2.9 * s, corner_radius=0.1 * s, fill_color="#071a2b",
                             fill_opacity=0.9, stroke_color="#22d3ee", stroke_width=3)
    c = cadre.get_center() + UP * 0.2 * s
    anneaux = VGroup(*[Circle(radius=r * s, stroke_color="#0e7490", stroke_width=2, fill_opacity=0).move_to(c)
                       for r in (0.4, 0.75, 1.08)])
    croix = VGroup(Line(c + P(-1.08 * s, 0), c + P(1.08 * s, 0), color="#0e7490", stroke_width=2),
                   Line(c + P(0, -1.08 * s), c + P(0, 1.08 * s), color="#0e7490", stroke_width=2))
    # ⛔ VU SEULEMENT À L'IMAGE : le blip était à droite du centre, et l'étiquette « 5 102 m »
    #    posée à sa droite SORTAIT du cadre du radar. Le blip passe en haut à GAUCHE : l'étiquette
    #    tient alors tout entière dans l'écran, avec ~0,2 unité de marge (mesuré, pas estimé).
    balayage = Line(c, c + P(-0.75 * s, 0.75 * s), color="#22d3ee", stroke_width=4)
    av = avion(0.55 * s).move_to(c + P(-0.45 * s, 0.45 * s))
    g = VGroup(cadre, anneaux, croix, balayage, av)
    g.cadre, g.blip = cadre, av
    return hors_audit(g)


class EntierRangBase(PaysageEntier6e):
    nom_voix = "6e-entier-rang"
    fichier_marques = str(DOSSIER_MARQUES / "entier_6e_rang_marques.json")
    ceinture = "verte"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Les rangs d'un nombre", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Les rangs d'un nombre")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.ligne([("Dans", WHITE), (nb(5482) + ",", JAUNE_TITRE)], 38, buff=0.22)
        q1 = self.t("quel est le chiffre", 36)
        q2 = self.t("des dizaines ?", 36)
        q = VGroup(q0, q1, q2).arrange(DOWN, aligned_edge=LEFT, buff=0.26)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        radar = ecran_radar(0.78).move_to(P(4.1, 0.35))
        self.au_mot("Dans 5 482")
        self.play(FadeIn(q0, shift=UP * 0.2), FadeIn(radar, scale=1.08), run_time=0.35)
        self.au_mot("quel est le chiffre")
        self.play(FadeIn(q1, shift=UP * 0.2), run_time=0.3)
        self.au_mot("des dizaines")
        self.play(FadeIn(q2, shift=UP * 0.2), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 01 : Inès, contrôleuse aérienne ─────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = ines_ctrl(0.95).move_to(P(-5.0, 0.35))
        self.au_mot("Voici Inès")
        nom = self.t("Inès", 42, "#22d3ee").next_to(pe, UP, buff=0.2)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle est contrôleuse aérienne")
        met = self.bloc(["contrôleuse", "aérienne"], 26, "#22d3ee").next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        XP = 0.2
        # ⚠️ Le radar est posé SOUS la colonne de texte (y = −1,3), jamais dedans : sur A1 une figure
        #    laissée à y ≈ 0 écrivait son étiquette par-dessus la phrase.
        radar = ecran_radar(0.82).move_to(P(3.9, -1.25))
        self.au_mot("Sur son écran")
        l0 = self.t("Sur son écran,", 34)
        self.col(l0, 2.3, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(radar, scale=1.06), run_time=0.45)
        self.au_mot("chaque altitude")
        l1 = self.ligne([("chaque", WHITE), ("altitude", JAUNE_TITRE)], 34, buff=0.2)
        self.col(l1, 1.55, XP)
        # ⛔ MESURÉ À L'IMAGE, deux fois : l'étiquette d'altitude dépassait du cadre du radar
        #    (0,24 unité la première fois, encore 0,24 après avoir déplacé le blip). On ne l'estime
        #    plus : on la RECALE dans le cadre, bord droit compris.
        alt = hors_audit(Text(nb(5102) + " m", font_size=23, color="#86efac", weight=BOLD))
        alt.next_to(radar.blip, RIGHT, buff=0.1)
        bord = radar.cadre.get_right()[0] - 0.12
        if alt.get_right()[0] > bord:
            alt.shift(RIGHT * (bord - alt.get_right()[0]))
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(alt, shift=RIGHT * 0.1), run_time=0.45)
        self.au_mot("au bon rang")
        l2 = self.ligne([("doit être lue", WHITE), ("au bon rang.", JAUNE_TITRE)], 34, buff=0.2)
        self.col(l2, 0.85, XP)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix()

    # ── 02 : les rangs se lisent de DROITE à GAUCHE ─────────────────────────
    def ecran_rangs(self):
        self.ecran("02-rangs")
        l0 = self.bloc(["On lit les rangs", "de droite à gauche :"], 36, JAUNE_TITRE)
        # ⚠️ Dry run du 21/11 : `gauche` CENTRE en hauteur, donc un bloc de DEUX lignes posé à
        #    y = 3,3 montait à 3,9 — au-delà de la marge de 3 % (y ≤ 3,573) : 13 BORD.
        gauche(l0, -6.2, 2.85)
        tab = tableau_rangs(4, larg=2.35, h=1.05, fs_ent=24)
        tab.move_to(P(0, 0.4))
        self.au_mot("On lit les rangs")
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(tab.cases, scale=1.04), run_time=0.45)
        self.au_mot("de droite à gauche")
        fl = fleche_droite_gauche(tab.width * 0.86).next_to(tab.cases, DOWN, buff=0.55)
        self.play(FadeIn(l0[1], shift=UP * 0.1), GrowArrow(fl[0]), run_time=0.6)
        # Les quatre rangs se nomment dans l'ordre de la voix : droite → gauche.
        for extrait, nom in (("unités,", "unités"), ("dizaines,", "dizaines"),
                             ("centaines,", "centaines"), ("unités de mille", "unités de mille")):
            i = tab.rang(nom)
            self.au_mot(extrait)
            # ⛔ Les cases sont DÉJÀ à l'écran : on peut indiquer l'une d'elles en même temps qu'un
            #    fondu d'entête (le piège interdit est FadeIn(groupe) + Indicate(partie du groupe)).
            self.play(FadeIn(tab.entetes[i], shift=UP * 0.12),
                      Indicate(tab.cases[i], color=COUL_RANG[nom], scale_factor=1.07), run_time=0.5)
        self.attendre_voix()

    # ── 03 : les quatre rangs de 5 482, et le CHIFFRE d'un rang ─────────────
    def ecran_exemple(self):
        self.ecran("03-exemple")
        l0 = self.ligne([("Dans", WHITE), (nb(5482) + " :", JAUNE_TITRE)], 38, buff=0.22)
        gauche(l0, -6.2, 3.15)
        tab = tableau_rangs(4, larg=2.35, h=1.05, fs_ent=24)
        tab.move_to(P(0, 0.9))
        # ⚠️ « 5 482 » est dit 0,25 s après « Dans » : la ligne est posée en DEUX temps, chaque
        #    morceau à SON mot, et le premier fondu est court (0,18 s) pour laisser le second à l'heure.
        #    (Le piège n° 6 : une ligne entière qui finit par le nombre serait retenue jusqu'à lui,
        #    et l'`au_mot` suivant arriverait toujours en retard.)
        self.au_mot("Dans 5 482")
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(tab), run_time=0.18)
        self.au_mot("5 482")
        ch = VGroup(*[tab.chiffre(i, c, COUL_RANG[tab.noms[i]]) for i, c in enumerate("5482")])
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(ch, scale=1.12), run_time=0.3)
        for extrait, nom, i_ch in (("2 unités", "unités", 3), ("8 dizaines", "dizaines", 2),
                                   ("4 centaines", "centaines", 1), ("5 unités de mille", "unités de mille", 0)):
            self.au_mot(extrait)
            self.play(Indicate(tab.colonne(tab.rang(nom)), color=COUL_RANG[nom], scale_factor=1.07),
                      Indicate(ch[i_ch], color=COUL_RANG[nom], scale_factor=1.3), run_time=0.55)
        self.au_mot("Le chiffre des dizaines")
        ph = self.ligne([("Le chiffre des dizaines", WHITE), ("est 8.", VERT_OK)], 38, buff=0.22)
        ph.move_to(P(0, -1.65))
        self.play(FadeIn(ph[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("est 8")
        cad = cadre_ici(ch[2], VERT_OK, buff=0.12)
        self.play(FadeIn(ph[1], shift=UP * 0.1), Create(cad), run_time=0.55)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def figure_q1(self):
        return chiffres_en_cases("7306", fs=52, larg=0.78, h=0.95).move_to(P(-3.6, 1.5))

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q1()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(g.chiffres[1], color=ROSE_D, scale_factor=1.35), run_time=0.3)

        self.question_gauche("04-question", "04b-reponse",
                             ["Dans " + nb(7306) + ",", "quel est le chiffre", "des centaines ?"],
                             [self.choix("7"), self.choix("0"), self.choix("3")], 2,
                             ["De droite à gauche :", "6 unités, 0 dizaine,", "3 centaines, 7 milliers.",
                              "Donc 3."],
                             -0.75, mot_q="Dans 7 306", autres_q=autres_q, autres_r=apres)

    # ── 05 : un zéro occupe un rang, lui aussi ──────────────────────────────
    def ecran_zero(self):
        self.ecran("05-zero")
        self.au_mot("Un zéro est un chiffre")
        tit = self.ligne([("Un zéro", ZERO_C), ("est un chiffre", WHITE)], 40, buff=0.22)
        gauche(tit, -6.2, 3.15)
        self.play(FadeIn(tit, shift=UP * 0.1), run_time=0.4)
        self.au_mot("comme un autre")
        l1 = self.t("comme un autre.", 40)
        gauche(l1, -6.2, 2.5)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        XP = 0.35
        g = chiffres_en_cases("7305", fs=58, larg=0.88, h=1.05).move_to(P(-3.5, 0.1))
        self.au_mot("Dans 7 305")
        l2 = self.ligne([("Dans", WHITE), (nb(7305) + ",", JAUNE_TITRE)], 34, buff=0.2)
        self.col(l2, 1.0, XP)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(g, scale=1.06), run_time=0.5)
        self.au_mot("le chiffre des dizaines")
        l3 = self.bloc(["le chiffre", "des dizaines"], 34, AMBRE_D)
        self.col(l3, 0.1, XP)
        cad = cadre_ici(g.cases[2], AMBRE_D, buff=0.06)
        self.play(FadeIn(l3, shift=UP * 0.1), Create(cad), run_time=0.6)
        self.au_mot("est 0")
        l4 = self.t("est 0.", 44, ZERO_C)
        self.col(l4, -0.95, XP)
        self.play(FadeIn(l4, shift=UP * 0.1),
                  Indicate(g.chiffres[2], color=ZERO_C, scale_factor=1.45), run_time=0.6)
        # Le zéro tient sa place : les quatre rangs restent quatre. ⛔ Pas de second `au_mot("est 0")`
        # ici : il ne ferait rien (on est déjà passé) et il masquerait le vrai enchaînement.
        self.play(Circumscribe(g.cases, color=ZERO_C, buff=0.05), run_time=0.6)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def figure_q2(self):
        g = chiffres_en_cases("85676", fs=48, larg=0.74, h=0.9).move_to(P(-3.6, 1.5))
        return g

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q2()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)
            sc.play(Indicate(g.chiffres[3], color=JAUNE_TITRE, scale_factor=1.35), run_time=0.3)

        def apres(sc):
            sc.play(Create(cadre_ici(g.cases[3], VERT_OK, buff=0.05)), run_time=0.35)

        self.question_gauche("06-question", "06b-reponse",
                             ["Dans " + nb(85676) + ",", "à quel rang est", "le chiffre 7 ?"],
                             [self.choix("aux dizaines"), self.choix("aux unités"),
                              self.choix("aux unités de mille")], 0,
                             ["On part de la droite :", "6 unités, puis 7 dizaines.", "Le 7 est au rang",
                              "des dizaines."],
                             -0.75, mot_q="Dans 85 676", autres_q=autres_q, autres_r=apres)

    # ── 07 : au-delà de mille, on continue ──────────────────────────────────
    def ecran_grands(self):
        self.ecran("07-grands")
        self.au_mot("Au-delà de mille")
        tit = self.ligne([("Au-delà de mille,", CLASSE_MILLE), ("on continue :", WHITE)], 40, buff=0.25)
        gauche(tit, -6.2, 3.15)
        self.play(Write(tit[0]), run_time=0.35)
        self.au_mot("on continue")
        self.play(FadeIn(tit[1], shift=UP * 0.1), run_time=0.3)
        g = chiffres_en_cases("915843", fs=54, larg=0.92, h=1.1, coupe_apres=2, coupe=0.4)
        g.move_to(P(0, 1.15))
        self.play(FadeIn(g, scale=1.04), run_time=0.4)
        # ⛔ Les deux noms de rang font ~2,6 unités de large pour des cases de 0,92 : écrits SOUS
        #    leurs cases ils se toucheraient (le piège « 4 000500 » payé sur A3). Ils sont donc
        #    EMPILÉS, chacun avec un carré de SA couleur, et le cadre de la case porte la même.
        for extrait, i_ch, coul, y in (("dizaines de mille", 1, COUL_RANG["dizaines de mille"], -0.55),
                                       ("centaines de mille", 0, COUL_RANG["centaines de mille"], -1.6)):
            self.au_mot(extrait)
            pastille = hors_audit(Square(0.34, fill_color=coul, fill_opacity=1, stroke_width=0))
            lab = self.t(extrait, 38, coul)
            lg = VGroup(pastille, lab).arrange(RIGHT, buff=0.26).move_to(P(0, y))
            cad = cadre_ici(g.cases[i_ch], coul, buff=0.05)
            self.play(FadeIn(lg, shift=UP * 0.12), Create(cad), run_time=0.6)
        self.attendre_voix()

    # ── 08 : QUESTION 3 (réponse C) ─────────────────────────────────────────
    def figure_q3(self):
        return chiffres_en_cases("915843", fs=44, larg=0.7, h=0.86, buff=0.09,
                                 coupe_apres=2, coupe=0.3).move_to(P(-3.6, 1.5))

    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q3()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Create(cadre_ici(g.cases[0], VERT_OK, buff=0.05)), run_time=0.35)

        self.question_gauche("08-question", "08b-reponse",
                             ["Dans " + nb(915843) + ",", "quel est le chiffre", "des centaines de mille ?"],
                             [self.choix("1"), self.choix("8"), self.choix("9")], 2,
                             [nb(915843) + " s'écrit", "915 puis 843.", "Le 9 est au rang",
                              "des centaines de mille."],
                             -0.75, mot_q="Dans 915 843", autres_q=autres_q, autres_r=apres)

    # ── 09 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        self.au_mot("Un avion vole à")
        av = avion(1.25).rotate(-PI / 2 + 0.12).move_to(P(-4.8, 1.9))
        alt = self.ligne([("Un avion vole à", WHITE), (nb(5102) + " mètres.", JAUNE_TITRE)], 34, buff=0.2)
        alt.move_to(P(1.1, 1.9))
        self.play(FadeIn(av, shift=UP * 0.25), FadeIn(alt[0], shift=UP * 0.1), run_time=0.45)
        self.au_mot("5 102 mètres")
        g = chiffres_en_cases("5102", fs=56, larg=0.9, h=1.08).move_to(P(0, 0.35))
        self.play(FadeIn(alt[1], shift=UP * 0.1), FadeIn(g, scale=1.06), run_time=0.5)
        self.au_mot("Donne le chiffre des dizaines")
        q0 = self.t("Donne le chiffre des dizaines,", 36, ORANGE_RETENUE).move_to(P(0, -0.95))
        self.play(FadeIn(q0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("puis celui des centaines")
        q1 = self.t("puis celui des centaines.", 36, ORANGE_RETENUE).move_to(P(0, -1.55))
        self.play(FadeIn(q1, shift=UP * 0.1), Wiggle(g.cases), run_time=0.6)
        self.pause_defi(y=-2.3)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        g = chiffres_en_cases("5102", fs=52, larg=0.86, h=1.02).move_to(P(0, 1.95))
        self.add(g)
        self.au_mot("De droite à gauche")
        # ⛔ VU SEULEMENT À L'IMAGE : la flèche, posée sous les chiffres (y ≈ 0,9), arrivait à la
        #    HAUTEUR de « De droite à gauche : » et sa pointe tombait sur les deux points.
        #    La flèche reste collée aux chiffres, le titre descend d'une ligne entière.
        h0 = self.t("De droite à gauche :", 34, JAUNE_TITRE)
        gauche(h0, -6.2, 0.35)
        fl = fleche_droite_gauche(g.width * 0.9).next_to(g, DOWN, buff=0.26)
        self.play(FadeIn(h0, shift=UP * 0.1), GrowArrow(fl[0]), run_time=0.5)
        lignes, y = [], -0.45
        for extrait, i_ch, coul in (("2 unités", 3, COUL_RANG["unités"]),
                                    ("0 dizaine", 2, COUL_RANG["dizaines"]),
                                    ("1 centaine", 1, COUL_RANG["centaines"])):
            self.au_mot(extrait)
            lg = self.t(extrait, 34, coul)
            gauche(lg, -6.0, y)
            lignes.append(lg)
            y -= 0.72
            self.play(FadeIn(lg, shift=RIGHT * 0.15),
                      Indicate(g.chiffres[i_ch], color=coul, scale_factor=1.35), run_time=0.5)
        XP = 0.6
        self.au_mot("Dizaines : 0")
        r0 = self.t("Dizaines : 0.", 42, VERT_OK)
        self.col(r0, -0.6, XP)
        self.play(FadeIn(r0, scale=1.1), run_time=0.45)
        self.au_mot("Centaines : 1")
        r1 = self.t("Centaines : 1.", 42, VERT_OK)
        self.col(r1, -1.65, XP)
        self.play(FadeIn(r1, scale=1.1), run_time=0.45)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        # ⚠️ `finale_gauche` centre la figure en x = −4,6 : au-delà de ~3,6 unités de large, BORD
        #    (payé sur l'écran final de A1). Quatre cases de 0,62 + leurs écarts = 2,78.
        fig = chiffres_en_cases("5482", fs=34, larg=0.62, h=0.72, buff=0.08)
        lignes = self.finale_gauche(fig, textes=[
            ("Les rangs se lisent", "de droite à gauche."),
            ("Un zéro occupe un rang,", "lui aussi.")], fs=32)
        self.add(fig)
        self.au_mot("Les rangs se lisent")
        self.montrer_ligne(lignes[0], Indicate(fig.cases, scale_factor=1.05))
        self.au_mot("Un zéro occupe un rang")
        self.montrer_ligne(lignes[1])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_rangs()
        self.ecran_exemple()
        self.ecran_question1()
        self.ecran_zero()
        self.ecran_question2()
        self.ecran_grands()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class EntierRang6e(EntierRangBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
