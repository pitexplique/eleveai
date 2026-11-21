# entier_defi.py
# EleveAI — Maths 6e — série « Nombres entiers », épisode B5 : LE DÉFI DES NOMBRES ENTIERS
# (micro entier_defi, notion entier_nombre), AVEC VOIX. Paysage 16:9, ⛔ CEINTURE BLEUE
# (le défi est le cran au-dessus de la paysage verte du niveau ; le short reste BLANC).
# Short jumeau : film Ti Margo (« 569 → 600 : 31 ou 41 ? », réponse B) — série `6e-entier`.
# Décor et métier : Maya, VOLCANOLOGUE au Piton de la Fournaise — le SEUL contexte 974 de la
# série (centres : nature-ecologie, sciences).
#
# Mapping micro → écrans : 02 + 03 (le complément à un nombre rond, par étapes rondes),
# 05 (former un nombre avec des chiffres donnés, ⛔ jamais zéro devant), 07 (le nombre mystère,
# chaque indice à son rang), questions 04 (679 → 700, C), 06 (le plus petit avec 3, 0, 6, 5, B),
# 08 (le nombre mystère, C), défi 09 (le plus grand nombre avec 5, 0, 9 et 4).
# ⛔ Lot B : PAS de `aussi` → 2 lignes `notion_ressources`, en 6e.
#
# ✅ PASSE MATHS sur la voix, faite avant d'écrire (règle du 21/11), en commençant par les
#    corrections et la finale : 2 000 − 1 041 = 959 et 9 + 50 + 900 = 959 ; 700 − 679 = 21
#    (1 + 20) ; le plus petit à 4 chiffres avec 3, 0, 6, 5 = 3 056 (⛔ pas 0 356) ; le nombre
#    mystère = 3 601 (centaines = le double de 3 = 6) ; le plus grand avec 5, 0, 9, 4 = 9 540.
#    Les justifications aussi (« on ne commence pas par zéro », « du plus grand au plus petit »).
#    → 0 écart.
#
# Voix : manim/voix/6e-entier-defi.json (validée le 21/11, Julie, débit −6) ;
# marques : manim/scripts/cm1/entier_6e_defi_marques.json.
# ⭐ Cette voix n'a AUCUN nombre à espace sans marque : aucun `au_t()` ici.
# ⭐ Les mots marqués et leurs instants : python -X utf8 manim/poste2/mots-marques.py 6e-entier-defi
# Contrôle : python -X utf8 manim/poste2/verifier-avant-rendu.py manim/scripts/6e/entier_defi.py EntierDefi6e
# Audit : AUDIT=1 BORDS=1 python -X utf8 -m manim render --dry_run manim/scripts/6e/entier_defi.py EntierDefi6e
# Sortie : manim/sorties/6e/maths/entiers/05-defi/eleveai-maths-6e-entier-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "cm1"))

from entier_commun import *  # noqa: E402,F403

DOSSIER_MARQUES = Path(__file__).resolve().parents[1] / "cm1"

INDICE_C = JAUNE_TITRE      # ce qu'on nous donne
TROUVE_C = VERT_OK          # ce qu'on trouve
ETAPE_C = AMBRE_D           # les sauts d'une étape ronde
ECARTE_C = ROUGE_ERREUR     # ce qu'on écarte (le zéro devant)

RANGS_4 = ["unités\nde mille", "centaines", "dizaines", "unités"]


def chemin_etapes(arrets, larg=6.0, fs=28):
    """Les ÉTAPES RONDES : des arrêts alignés, reliés par des sauts étiquetés (+ 9, + 50, + 900).
    ⚠️ L'échelle n'est PAS proportionnelle — un saut de 9 et un saut de 900 ont la même largeur :
    c'est le SCHÉMA d'une méthode, pas une droite graduée, d'où des arrêts équidistants.
    ⚠️ Tout est construit DANS le groupe : un `move_to()` de l'appelant emmène bien les étiquettes
    (le piège n° 14, payé sur A5).
    .axe · .tick[i] · .lab[i] (l'arrêt i) · .arc[i] · .saut[i] (le saut de i vers i+1)."""
    n = len(arrets)
    axe = Line(P(-larg / 2, 0), P(larg / 2, 0), stroke_color=GRAY_B, stroke_width=4)
    xs = [-larg / 2 + larg * i / (n - 1) for i in range(n)]
    ticks, labs, arcs, sauts = VGroup(), VGroup(), VGroup(), VGroup()
    for i, (v, c) in enumerate(arrets):
        ticks.add(Line(P(xs[i], -0.17), P(xs[i], 0.17), stroke_color=c, stroke_width=7))
        labs.add(Text(nb(v), font_size=fs, color=c, weight=BOLD).move_to(P(xs[i], -0.6)))
    for i in range(n - 1):
        a = CurvedArrow(P(xs[i], 0.12), P(xs[i + 1], 0.12), angle=-TAU / 6,
                        color=ETAPE_C, stroke_width=5, tip_length=0.18)
        arcs.add(a)
        sauts.add(Text("+ " + nb(arrets[i + 1][0] - arrets[i][0]), font_size=fs - 2,
                       color=ETAPE_C, weight=BOLD).move_to(a.get_top() + UP * 0.24))
    g = VGroup(axe, ticks, labs, arcs, sauts)
    g.axe, g.tick, g.lab, g.arc, g.saut = axe, ticks, labs, arcs, sauts
    return hors_audit(g)


def etiquettes(chiffres, s=1.0, buff=0.26, couleur=INDICE_C):
    """La rangée d'étiquettes-chiffres (⚠️ jamais zéro devant, c'est LE piège de la micro)."""
    g = VGroup(*[etiquette_chiffre(d, s=s, couleur=couleur) for d in chiffres])
    g.arrange(RIGHT, buff=buff * s)
    g.cartes = VGroup(*g.submobjects)
    return hors_audit(g)


def cases_rangs(valeurs, s=1.0, fs=42, fs_r=17, couleur=INDICE_C):
    """Les quatre rangs du nombre mystère : une case par rang, son nom AU-DESSUS.
    `valeurs` : la liste des 4 contenus (« ? » tant qu'on ne sait pas). .case[i] · .val[i]"""
    cases, vals, noms = VGroup(), VGroup(), VGroup()
    x = 0.0
    larg, h = 1.05 * s, 1.15 * s
    for i, v in enumerate(valeurs):
        c = RoundedRectangle(width=larg, height=h, corner_radius=0.1 * s, fill_color=CASE,
                             fill_opacity=0.55, stroke_color=GRAY_B, stroke_width=3)
        c.move_to(P(x + larg / 2, 0))
        cases.add(c)
        vals.add(Text(str(v), font_size=int(fs * s), color=couleur, weight=BOLD).move_to(c))
        n = Text(RANGS_4[i], font_size=int(fs_r * s), color=GRAY_B, line_spacing=0.6)
        n.next_to(c, UP, buff=0.14 * s)
        noms.add(n)
        x += larg + 0.1 * s
    g = VGroup(cases, noms, vals)
    g.case, g.val, g.nom = cases, vals, noms
    g.move_to(ORIGIN)
    return hors_audit(g)


def volcan(s=1.0):
    """Le Piton de la Fournaise : un cône sombre, un cratère rougeoyant, un panache."""
    cone = Polygon(P(-2.0 * s, -1.15 * s), P(-0.62 * s, 0.72 * s), P(0.62 * s, 0.72 * s),
                   P(2.0 * s, -1.15 * s), fill_color="#3f3f46", fill_opacity=1,
                   stroke_color="#71717a", stroke_width=3)
    cratere = Polygon(P(-0.62 * s, 0.72 * s), P(-0.26 * s, 0.48 * s), P(0.26 * s, 0.48 * s),
                      P(0.62 * s, 0.72 * s), fill_color="#7c2d12", fill_opacity=1, stroke_width=0)
    lave = VGroup(*[Line(P(dx * s, 0.6 * s), P((dx + ec) * s, -0.75 * s),
                         stroke_color="#f97316", stroke_width=5)
                    for dx, ec in ((-0.3, -0.5), (0.1, 0.45), (0.35, 0.7))])
    panache = VGroup(*[Circle(radius=r * s, fill_color="#9ca3af", fill_opacity=0.38, stroke_width=0)
                       .move_to(P(dx * s, dy * s))
                       for r, dx, dy in ((0.3, -0.1, 1.15), (0.38, 0.25, 1.6), (0.3, -0.2, 2.0))])
    return hors_audit(VGroup(cone, cratere, lave, panache))


def sismo(s=1.0):
    """Le tracé d'un sismographe : la ligne calme, puis la secousse."""
    pts = [(-1.8, 0), (-1.3, 0), (-1.05, 0.12), (-0.85, -0.1), (-0.6, 0),
           (-0.3, 0.62), (-0.12, -0.55), (0.05, 0.78), (0.22, -0.48), (0.4, 0.3),
           (0.62, -0.14), (0.9, 0.08), (1.3, 0), (1.8, 0)]
    trace = VMobject(stroke_color="#4ade80", stroke_width=5)
    trace.set_points_as_corners([P(x * s, y * s) for x, y in pts])
    cadre = RoundedRectangle(width=4.1 * s, height=1.9 * s, corner_radius=0.12 * s,
                             fill_color="#0b1220", fill_opacity=0.9, stroke_color="#334155",
                             stroke_width=3)
    return hors_audit(VGroup(cadre, trace))


class EntierDefiBase(PaysageEntier6e):
    nom_voix = "6e-entier-defi"
    fichier_marques = str(DOSSIER_MARQUES / "entier_6e_defi_marques.json")
    ceinture = "bleue"

    # ── 00 : page de garde (⛔ ceinture BLEUE) ──────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le défi des nombres entiers", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Le défi des nombres entiers")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.t("Combien manque-t-il", 36)
        q1 = self.ligne([("à", WHITE), (nb(1041), INDICE_C)], 36, buff=0.2)
        q2 = self.ligne([("pour atteindre", WHITE), (nb(2000) + " ?", TROUVE_C)], 36, buff=0.2)
        q = VGroup(q0, q1, q2).arrange(DOWN, aligned_edge=LEFT, buff=0.26)
        q.move_to(P(0, 0.4)).align_to(P(-6.2, 0), LEFT)
        vol = volcan(0.82).move_to(P(4.3, 0.4))
        self.au_mot("Combien manque-t-il")
        self.play(FadeIn(q0, shift=UP * 0.2), FadeIn(vol, scale=1.08), run_time=0.45)
        self.au_mot("à 1 041")
        self.play(FadeIn(q1, shift=UP * 0.2), run_time=0.35)
        # ⚠️ « atteindre » (5,24 s) et « 2 000 » (5,68 s) ne sont séparés que de 0,45 s :
        #    `verifier-avant-rendu.py` signale un RETARD probable (son seuil est 0,6 s, il ne
        #    connaît pas le run_time). Avec 0,28 s de fondu, le premier est posé à 5,52 s — avant
        #    le second mot — et les deux restent à 0,3 s de retard, sous les 0,4 s tolérés.
        #    ⭐ MESURÉ au dry run : 0 RETARD. Le seuil de l'outil est un garde-fou, pas la mesure.
        self.au_mot("atteindre")
        self.play(FadeIn(q2[0], shift=UP * 0.2), run_time=0.28)
        self.au_mot("2 000 ?")
        self.play(FadeIn(q2[1], shift=UP * 0.2), run_time=0.28)
        self.attendre_voix(marge=0.6)

    # ── 01 : Maya, volcanologue au Piton de la Fournaise ───────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        XP = 0.3
        pe = maya(0.95).move_to(P(-5.1, 0.4))
        self.au_mot("Voici Maya")
        nom = self.t("Maya", 42, "#fb923c").next_to(pe, UP, buff=0.2)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle est volcanologue")
        met = self.bloc(["volcanologue"], 26, "#fb923c").next_to(pe, DOWN, buff=0.12)
        l0 = self.t("Elle est volcanologue", 34)
        self.col(l0, 2.5, XP)
        self.play(FadeIn(met, shift=DOWN * 0.1), FadeIn(l0, shift=UP * 0.1), run_time=0.45)
        self.au_mot("au Piton de la Fournaise")
        l1 = self.bloc(["au Piton de", "la Fournaise."], 34, "#fb923c")
        self.col(l1, 1.5, XP)
        vol = volcan(0.5).move_to(P(-2.3, 1.5))
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(vol, scale=1.08), run_time=0.55)
        self.au_mot("Elle compte les secousses")
        l2 = self.bloc(["Elle compte", "les secousses,"], 34)
        self.col(l2, 0.0, XP)
        # ⛔ VU SEULEMENT À L'IMAGE (aperçu du 21/11) : à (−2,9 ; −1,5) et s=0,85, le cadre du
        #    sismographe recouvrait la fin de l'étiquette « volcanologue » posée sous Maya
        #    (on lisait « volcanolo▮▮▮ »). Elle s'arrête à x = −4,23 : le cadre commence à −3,74.
        fig = sismo(0.8).move_to(P(-2.1, -1.7))
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(fig.submobjects[0], scale=1.05), run_time=0.5)
        self.play(Create(fig.submobjects[1]), run_time=0.8)
        self.au_mot("jour après jour")
        l3 = self.t("jour après jour.", 34, TROUVE_C)
        self.col(l3, -1.1, XP)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.45)
        self.attendre_voix()

    # ── 02 : le complément par étapes rondes (la première étape) ───────────
    def chemin_long(self, y=0.2):
        # ⚠️ MESURÉ au dry run : à larg=6,0 centré en x = −3,4, l'étiquette du premier arrêt
        #    (centrée sur le bout de l'axe) partait à x = −6,9, au-delà de la marge de 3 %
        #    (−6,68) → 4 BORD. larg=5,3 centré en −3,25 : l'axe va de −5,9 à −0,6 et l'étiquette
        #    la plus à gauche s'arrête à −6,4.
        return chemin_etapes([(1041, INDICE_C), (1050, TROUVE_C), (1100, TROUVE_C),
                              (2000, TROUVE_C)], larg=5.3).move_to(P(-3.25, y))

    def ecran_complement(self):
        self.ecran("02-complement")
        XP = 0.35
        tit = self.ligne([("Pour aller de", WHITE), (nb(1041), INDICE_C),
                          ("à " + nb(2000) + ",", TROUVE_C)], 36, buff=0.2)
        gauche(tit, -6.2, 3.15)
        ch = self.chemin_long()
        self.au_mot("Pour aller de")
        self.play(FadeIn(tit[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("1 041 à")
        self.play(FadeIn(tit[1], shift=UP * 0.1), FadeIn(ch.axe),
                  FadeIn(ch.tick[0], scale=1.2), FadeIn(ch.lab[0], scale=1.1), run_time=0.5)
        self.au_mot("2 000,")
        self.play(FadeIn(tit[2], shift=UP * 0.1),
                  FadeIn(ch.tick[3], scale=1.2), FadeIn(ch.lab[3], scale=1.1), run_time=0.5)
        self.au_mot("on avance")
        l0 = self.bloc(["on avance par", "étapes rondes."], 34, ETAPE_C)
        self.col(l0, 2.2, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.5)
        # ⭐ Les trois morceaux de la phrase dite restent dans la MÊME colonne (le piège n° 28,
        #    payé sur B4) : la colonne de gauche ne porte que la FIGURE.
        l1 = self.ligne([("D'abord " + nb(1041), WHITE), ("+ 9 :", ETAPE_C), (nb(1050), TROUVE_C)],
                        34, buff=0.2)
        self.col(l1, 0.6, XP)
        self.au_mot("D'abord 1 041")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(ch.lab[0], color=INDICE_C, scale_factor=1.25),
                  run_time=0.5)
        self.au_mot("9 : 1 050")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Create(ch.arc[0]), FadeIn(ch.saut[0]), run_time=0.45)
        self.au_mot("1 050.")
        self.play(FadeIn(l1[2], scale=1.15), FadeIn(ch.tick[1], scale=1.2),
                  FadeIn(ch.lab[1], scale=1.1), run_time=0.5)
        self.attendre_voix()

    # ── 03 : les deux étapes suivantes, et le total ────────────────────────
    def ecran_suite(self):
        self.ecran("03-suite")
        XP = 0.35
        ch = self.chemin_long()
        rappel = VGroup(ch.axe, ch.tick[0], ch.lab[0], ch.arc[0], ch.saut[0])
        l0 = self.ligne([("Puis " + nb(1050), WHITE), ("+ 50 :", ETAPE_C), (nb(1100), TROUVE_C)],
                        34, buff=0.2)
        self.col(l0, 2.3, XP)
        # ⭐ « Puis » est dit 0,31 s avant « 1 050 » : les deux arrivent ENSEMBLE au mot du nombre
        #    (0,31 s de retard sur « Puis », sous les 0,4 s tolérés). Les poser à deux `au_mot`
        #    séparés de 0,31 s donnerait un RETARD (le piège n° 5).
        self.au_mot("1 050 plus")
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(rappel),
                  FadeIn(ch.tick[1], scale=1.1), FadeIn(ch.lab[1], scale=1.1), run_time=0.55)
        self.au_mot("50 : 1 100")
        self.play(FadeIn(l0[1], shift=UP * 0.1), Create(ch.arc[1]), FadeIn(ch.saut[1]), run_time=0.45)
        self.au_mot("1 100. Enfin")
        self.play(FadeIn(l0[2], scale=1.15), FadeIn(ch.tick[2], scale=1.2),
                  FadeIn(ch.lab[2], scale=1.1), run_time=0.5)
        l1 = self.ligne([("Enfin " + nb(1100), WHITE), ("+ 900 :", ETAPE_C), (nb(2000), TROUVE_C)],
                        34, buff=0.2)
        self.col(l1, 1.1, XP)
        self.au_mot("Enfin 1 100")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.45)
        self.au_mot("900 : 2 000")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Create(ch.arc[2]), FadeIn(ch.saut[2]), run_time=0.45)
        self.au_mot("2 000. En tout")
        self.play(FadeIn(l1[2], scale=1.15), FadeIn(ch.tick[3], scale=1.2),
                  FadeIn(ch.lab[3], scale=1.1), run_time=0.5)
        l2 = self.ligne([("En tout,", WHITE), (nb(959) + ".", TROUVE_C)], 42, buff=0.22)
        self.col(l2, -0.6, XP)
        self.au_mot("En tout,")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("959.")
        self.play(FadeIn(l2[1], scale=1.2),
                  Circumscribe(VGroup(ch.saut[0], ch.saut[1], ch.saut[2]), color=TROUVE_C, buff=0.12),
                  run_time=0.9)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        ch = chemin_etapes([(679, INDICE_C), (680, TROUVE_C), (700, TROUVE_C)],
                           larg=4.3).move_to(P(-3.6, 1.3))

        def autres_q(sc):
            # ⛔ On ne montre PAS les sauts : « + 1 » et « + 20 » donneraient la réponse.
            sc.play(FadeIn(ch.axe), FadeIn(ch.tick[0]), FadeIn(ch.lab[0]),
                    FadeIn(ch.tick[2]), FadeIn(ch.lab[2]), run_time=0.45)

        def apres(sc):
            sc.play(Create(ch.arc[0]), FadeIn(ch.saut[0]), FadeIn(ch.tick[1]), FadeIn(ch.lab[1]),
                    Create(ch.arc[1]), FadeIn(ch.saut[1]), run_time=0.7)

        self.question_gauche("04-question", "04b-reponse",
                             ["Combien manque-t-il", "à 679 pour atteindre 700 ?"],
                             [self.choix("31"), self.choix("19"), self.choix("21")], 2,
                             ["679 plus 1 donne 680.", "Puis 20 de plus : 700.", "En tout, 21."],
                             -0.75, mot_q="Combien manque-t-il", autres_q=autres_q, autres_r=apres)

    # ── 05 : former un nombre avec des chiffres donnés ─────────────────────
    def ecran_etiquettes(self):
        self.ecran("05-etiquettes")
        XP = 0.35
        tit = self.ligne([("Autre défi :", JAUNE_TITRE), ("former un nombre", WHITE)], 36, buff=0.22)
        gauche(tit, -6.2, 3.15)
        self.au_mot("Autre défi")
        self.play(FadeIn(tit[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("former un nombre")
        self.play(FadeIn(tit[1], shift=UP * 0.1), run_time=0.4)
        jeu = etiquettes((3, 0, 6, 5), s=1.0).move_to(P(-3.5, 1.4))
        self.au_mot("avec des chiffres")
        l0 = self.bloc(["avec des", "chiffres donnés."], 34)
        self.col(l0, 1.6, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(jeu, scale=1.06, lag_ratio=0.12), run_time=0.7)
        self.au_mot("Un nombre ne commence")
        l1 = self.bloc(["Un nombre", "ne commence", "jamais par zéro."], 34, ECARTE_C)
        self.col(l1, -0.6, XP)
        # Le piège : le zéro mis DEVANT, barré sur-le-champ.
        faux = etiquettes((0, 3, 5, 6), s=0.9, couleur=ECARTE_C).move_to(P(-3.5, -1.3))
        barre = hors_audit(Line(faux.cartes[0].get_corner(UL), faux.cartes[0].get_corner(DR),
                                stroke_color=ECARTE_C, stroke_width=8))
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(faux, scale=1.05), run_time=0.6)
        self.play(Create(barre), run_time=0.5)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        jeu = etiquettes((3, 0, 6, 5), s=0.92).move_to(P(-3.6, 1.6))
        bon = etiquettes((3, 0, 5, 6), s=0.92, couleur=TROUVE_C).move_to(P(-3.6, 0.2))

        def autres_q(sc):
            sc.play(FadeIn(jeu, lag_ratio=0.1), run_time=0.45)

        def apres(sc):
            sc.play(FadeIn(bon, shift=DOWN * 0.2, lag_ratio=0.12), run_time=0.7)

        self.question_gauche("06-question", "06b-reponse",
                             ["Le plus petit nombre", "de quatre chiffres", "avec 3, 0, 6 et 5 ?"],
                             [self.choix("0 356"), self.choix(nb(3056)),
                              self.choix(nb(3065))], 1,
                             ["On ne commence pas par zéro.", "On met 3, puis 0,", "puis 5, puis 6."],
                             -0.75, mot_q="Le plus petit nombre", autres_q=autres_q, autres_r=apres)

    # ── 07 : le nombre mystère, chaque indice à son rang ───────────────────
    def ecran_mystere(self):
        self.ecran("07-mystere")
        XP = 0.35
        tit = self.ligne([("Dernier type de défi :", JAUNE_TITRE), ("le nombre mystère.", WHITE)],
                         34, buff=0.22)
        gauche(tit, -6.2, 3.15)
        self.au_mot("Dernier type de défi")
        self.play(FadeIn(tit[0], shift=UP * 0.1), run_time=0.45)
        self.au_mot("le nombre mystère")
        cr = cases_rangs(("?", "?", "?", "?"), s=1.0).move_to(P(-3.4, 0.6))
        self.play(FadeIn(tit[1], shift=UP * 0.1), FadeIn(cr.case, scale=1.05),
                  FadeIn(cr.val, scale=1.1), run_time=0.7)
        self.au_mot("On place chaque indice")
        l0 = self.bloc(["On place", "chaque indice"], 36)
        self.col(l0, 0.9, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(cr.nom, shift=UP * 0.1), run_time=0.6)
        self.au_mot("à son rang")
        l1 = self.t("à son rang.", 40, TROUVE_C)
        self.col(l1, -0.4, XP)
        self.play(FadeIn(l1, shift=UP * 0.1),
                  Indicate(cr.nom, color=TROUVE_C, scale_factor=1.12), run_time=0.7)
        self.attendre_voix()

    # ── 08 : QUESTION 3 (réponse C) ─────────────────────────────────────────
    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        cr = cases_rangs(("?", "?", "?", "?"), s=0.86).move_to(P(-3.6, 1.4))
        plein = cases_rangs((3, 6, 0, 1), s=0.86, couleur=TROUVE_C).move_to(P(-3.6, 1.4))

        def autres_q(sc):
            sc.play(FadeIn(cr), run_time=0.45)

        def apres(sc):
            sc.play(FadeOut(cr.val), FadeIn(plein.val, scale=1.2, lag_ratio=0.12), run_time=0.7)

        # ⛔⛔ VU SEULEMENT À L'IMAGE — une question de QUATRE lignes pousse les choix SUR Ti Margo.
        #    Le gabarit place les cartes puis les redescend sous le bas de la question : à quatre
        #    lignes, leur bas tombe à y ≈ −2,25 alors que la boîte de Ti Margo commence à −1,9, et
        #    la carte de la bonne réponse coupait le haut de sa tête. ⚠️ `BORDS=1` ne voit rien
        #    (rien ne sort du cadre) et la planche non plus : seul `verifier-zone-margo.py` le dit,
        #    et il tourne sur le `-ql`. À TROIS lignes, le bas des cartes remonte à −1,70.
        self.question_gauche("08-question", "08b-reponse",
                             ["Quatre chiffres : unités de mille 3,", "centaines le double de 3,",
                              "dizaines 0, unités 1."],
                             [self.choix(nb(3610)), self.choix(nb(3061)), self.choix(nb(3601))], 2,
                             ["Unités de mille 3, centaines 6,", "dizaines 0, unités 1.",
                              "Donc " + nb(3601) + "."],
                             -0.75, mot_q="Quatre chiffres", autres_q=autres_q, autres_r=apres)

    # ── 09 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        jeu = etiquettes((5, 0, 9, 4), s=1.05).move_to(P(-0.1, 1.2))
        self.au_mot("Avec 5, 0, 9 et 4")
        l0 = self.t("Avec", 36).move_to(P(-0.1, 2.3))
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        for extrait, i in (("5, 0,", 0), ("0, 9", 1), ("9 et 4", 2), ("4, quel", 3)):
            self.au_mot(extrait)
            self.play(FadeIn(jeu.cartes[i], scale=1.15), run_time=0.3)
        self.au_mot("quel est le plus grand")
        l1 = self.t("quel est le plus grand", 36).move_to(P(-0.1, -0.1))
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("nombre de quatre chiffres ?")
        q = self.t("nombre de quatre chiffres ?", 40, ORANGE_RETENUE).move_to(P(-0.1, -1.0))
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(jeu), run_time=0.8)
        self.pause_defi(y=-2.25)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        self.au_mot("Du plus grand chiffre")
        l0 = self.ligne([("Du plus grand chiffre", WHITE), ("au plus petit :", JAUNE_TITRE)],
                        36, buff=0.22)
        l0.move_to(P(-0.1, 2.2))
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("au plus petit")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.4)
        rang = etiquettes((9, 5, 4, 0), s=1.1, couleur=TROUVE_C).move_to(P(-0.1, 0.65))
        for extrait, i in (("9, 5", 0), ("5, 4", 1), ("4, 0", 2), ("0. Donc", 3)):
            self.au_mot(extrait)
            self.play(FadeIn(rang.cartes[i], scale=1.2), run_time=0.3)
        self.au_mot("9 540.")
        res = self.ligne([("Donc", WHITE), (nb(9540) + ".", TROUVE_C)], 46, buff=0.24)
        res.move_to(P(-0.1, -1.4))
        self.play(FadeIn(res, scale=1.1), Circumscribe(rang, color=TROUVE_C, buff=0.1), run_time=0.9)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        # ⚠️ `finale_gauche` centre la figure en x = −4,6 : au-delà de ~3,6 unités de large, BORD.
        # ⛔ VU À L'IMAGE : avec les arrêts 1 041 · 1 050 · 2 000, le schéma calculait tout seul
        #    un saut de « + 950 » — juste, mais introuvable dans la leçon, qui a montré 9, 50
        #    et 900. Le rappel garde les DEUX PREMIERS arrêts de la leçon.
        #    Et les noms de rang à fs_r=13 × 0,62 tombaient à 8 points : illisibles.
        mini = chemin_etapes([(1041, INDICE_C), (1050, TROUVE_C), (1100, TROUVE_C)],
                             larg=2.9, fs=20)
        cr = cases_rangs((3, 6, 0, 1), s=0.75, fs=36, fs_r=17, couleur=TROUVE_C)
        fig = VGroup(mini, cr).arrange(DOWN, buff=0.75)
        lignes = self.finale_gauche(fig, textes=[
            ("On avance", "par étapes rondes,"),
            ("et on place chaque", "indice à son rang.")], fs=32)
        self.add(fig)
        self.au_mot("On avance")
        self.montrer_ligne(lignes[0], Indicate(mini.saut, color=ETAPE_C, scale_factor=1.15))
        self.au_mot("et on place")
        self.montrer_ligne(lignes[1], Indicate(cr.nom, color=TROUVE_C, scale_factor=1.12))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_complement()
        self.ecran_suite()
        self.ecran_question1()
        self.ecran_etiquettes()
        self.ecran_question2()
        self.ecran_mystere()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class EntierDefi6e(EntierDefiBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "bleue"
