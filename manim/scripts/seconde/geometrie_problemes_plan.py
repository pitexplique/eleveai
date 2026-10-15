# geometrie_problemes_plan.py
# EleveAI — Maths seconde — Problèmes de géométrie plane
# (notionId : geometrie_problemes_plan)
#
# ⛔ CETTE NOTION N'A PAS DE FICHE DE COURS (vérifié le 24/09/2026 :
# `lib/fiches/maths-seconde-geometrie.tsx` n'existe pas, le registre ne la
# connaît pas). La règle « les exemples de la vidéo sont ceux de la fiche » ne
# s'applique donc pas ici : ils viennent de LA FEUILLE D'EXERCICES
# `lib/fiches-exercices/maths-seconde-geometrie.tsx` (commit `762583f9`) et de
# la banque du coach. Si la fiche est écrite plus tard, elle doit reprendre ces
# mêmes nombres — sinon l'élève voit deux jeux d'exemples pour une notion.
#
# Mapping micro-compétences (5 micros, TOUTES couvertes) → écrans :
# - geo_trigonometrie      → écran 1 (CAH SOH TOA sur le triangle 3-4-5)
# - geo_trig_identite      → écran 2 (cos²x + sin²x = 1, et son triangle)
# - geo_projete_orthogonal → écran 3 (H est le plus proche ; 5, 13 → 12)
# - geo_longueurs_aires    → écran 4 (le projeté donne la hauteur, donc l'aire)
# - geo_optimisation       → écran 5 (l'enclos : 450 − 2(x − 15)²)
#
# Le défi reprend « la pente du col » de la feuille : 12 % n'est pas 12°, et
# les 2 km sont l'HYPOTÉNUSE — donc sinus, pas tangente.
#
# Rendu :
#   python -m manim render -qh --disable_caching manim/scripts/seconde/geometrie_problemes_plan.py GeometrieProblemesPlan -o eleveai-maths-seconde-geometrie-problemes-plan --media_dir manim/scripts/seconde/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_seconde import SONS, NotionSeconde

VOIX = SONS / "seconde-geometrie-problemes-plan"


def arc_angle(sommet, p1, p2, radius=0.55, color=JAUNE_TITRE, stroke_width=4):
    """L'arc d'un angle, TOUJOURS le plus petit des deux.

    ⛔ `Angle(Line(B, A), Line(B, C))` a dessiné un CERCLE ENTIER autour de B au
    premier rendu : il travaille sur des droites, pas sur des demi-droites, et
    rien ne lui dit quel secteur on veut. Ici on calcule l'écart signé ramené
    dans ]−π ; π], donc le secteur est celui qu'on voit.
    """
    a1 = angle_of_vector(p1 - sommet)
    a2 = angle_of_vector(p2 - sommet)
    delta = (a2 - a1 + PI) % TAU - PI
    return Arc(radius=radius, start_angle=a1, angle=delta, arc_center=sommet,
               color=color, stroke_width=stroke_width)


def cote(p, q, texte, decalage, font_size=26, color=WHITE):
    """La mesure d'un segment, posée à côté de lui et non dessus."""
    t = Text(texte, font_size=font_size, color=color)
    t.move_to((p + q) / 2 + decalage)
    return t


class GeometrieProblemesPlan(NotionSeconde):

    dossier_voix = VOIX

    # ── écran 1 : geo_trigonometrie ─────────────────────────────────────────

    def ecran_trigonometrie(self):
        self.clear()
        self.add_mascotte(scale=0.42)
        self.dire("01-trigonometrie")
        self.titre_ecran("Le triangle rectangle : trois rapports")

        # Le 3-4-5 de la feuille : rectangle en A, AB = 4, AC = 3, BC = 5.
        # ⛔ Décalé vers la droite : à x = −5,7 l'étiquette « opposé 3 », posée
        # à gauche de [AC], sortait du cadre (bord à −7,11).
        A = np.array([-5.0, -1.7, 0])
        B = A + RIGHT * 3.6          # 4 unités × 0,9
        C = A + UP * 2.7             # 3 unités × 0,9
        tri = Polygon(A, B, C, color=WHITE, stroke_width=4)
        self.play(Create(tri))
        self.play(Create(RightAngle(Line(A, B), Line(A, C), length=0.32,
                                    color=BLEU_CALCUL, stroke_width=3)))
        for p, nom, d in ((A, "A", DL), (B, "B", DR), (C, "C", UL)):
            self.play(FadeIn(Text(nom, font_size=28, color=WHITE)
                             .next_to(p, d, buff=0.12)), run_time=0.25)

        # ⛔ Pas de second « B » : le sommet est déjà nommé, deux étiquettes
        # identiques sur le même point se lisent comme une erreur.
        self.play(Create(arc_angle(B, A, C)))

        # Les trois côtés, nommés PAR RAPPORT À L'ANGLE B.
        roles = [
            # ⛔ L'étiquette de l'hypoténuse se pose SUR LA NORMALE au segment,
            # côté extérieur : posée « en haut à droite » elle tombait sur le
            # trait rouge et devenait illisible.
            (B, C, "hypoténuse  5", np.array([0.42, 0.56, 0]) * 1.7, ROUGE_ERREUR),
            (A, B, "adjacent  4", DOWN * 0.42, VERT_OK),
            (A, C, "opposé  3", LEFT * 0.78, ORANGE_RETENUE),
        ]
        for p, q, texte, dec, coul in roles:
            seg = Line(p, q, color=coul, stroke_width=7)
            self.play(Create(seg), FadeIn(cote(p, q, texte, dec, 24, coul)),
                      run_time=0.6)

        # Les trois rapports, dans le même ordre que le moyen mnémotechnique.
        rapports = VGroup(
            Text("cos B  =  adjacent / hypoténuse  =  4/5  =  0,8",
                 font_size=27, color=VERT_OK),
            Text("sin B  =  opposé / hypoténuse  =  3/5  =  0,6",
                 font_size=27, color=ORANGE_RETENUE),
            Text("tan B  =  opposé / adjacent  =  3/4  =  0,75",
                 font_size=27, color=BLEU_CALCUL),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.45).move_to([3.1, 0.75, 0])
        if rapports.width > 7.4:
            rapports.scale_to_fit_width(7.4)
        for m in rapports:
            self.play(FadeIn(m, shift=RIGHT * 0.2), run_time=0.6)

        corps, cadre = self.bloc_encadre(
            [Text("CAH   SOH   TOA", font_size=40, color=JAUNE_TITRE),
             Text("c'est l'angle qui décide des noms", font_size=22, color=WHITE)],
            JAUNE_TITRE)
        corps.move_to([3.1, -1.75, 0])
        cadre.move_to(corps.get_center())
        self.play(FadeIn(corps), Create(cadre))

        self.play(Write(self.chute("L'hypoténuse est en face de l'angle droit, toujours.")))
        self.attendre_voix()

    # ── écran 2 : geo_trig_identite ─────────────────────────────────────────

    def ecran_identite(self):
        self.clear()
        self.add_mascotte(scale=0.42)
        self.dire("02-identite")
        self.titre_ecran("Une égalité vraie pour tous les angles")

        egalite = Text("cos² x  +  sin² x  =  1", font_size=52, color=JAUNE_TITRE)
        egalite.move_to([0, 2.1, 0])
        self.play(Write(egalite))
        self.play(Flash(egalite, color=JAUNE_TITRE, line_length=0.35))

        # La raison : un triangle rectangle d'hypoténuse 1, et Pythagore.
        A = np.array([-5.2, -2.0, 0])
        B = A + RIGHT * 2.6
        C = B + UP * 1.9
        tri = Polygon(A, B, C, color=WHITE, stroke_width=4)
        self.play(Create(tri))
        self.play(Create(RightAngle(Line(B, A), Line(B, C), length=0.28,
                                    color=BLEU_CALCUL, stroke_width=3)))
        self.play(FadeIn(cote(A, B, "cos x", DOWN * 0.36, 24, VERT_OK)),
                  FadeIn(cote(B, C, "sin x", RIGHT * 0.62, 24, ORANGE_RETENUE)),
                  FadeIn(cote(A, C, "1", UP * 0.3 + LEFT * 0.25, 28, WHITE)))
        self.play(FadeIn(Text("Pythagore, tout simplement", font_size=23,
                              color=WHITE).move_to([-3.9, -2.75, 0])))

        etapes = VGroup(
            Text("cos x = 0,6   →   sin x = ?", font_size=30, color=WHITE),
            Text("0,6²  +  sin² x  =  1", font_size=30, color=WHITE),
            Text("0,36  +  sin² x  =  1", font_size=30, color=WHITE),
            Text("sin² x  =  0,64", font_size=32, color=BLEU_CALCUL),
            Text("sin x  =  0,8", font_size=40, color=VERT_OK),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3).move_to([3.3, -0.35, 0])
        for m in etapes:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.5)
        self.play(Circumscribe(etapes[4], color=VERT_OK, buff=0.18))

        self.play(Write(self.chute(
            "L'angle est aigu : on garde la racine POSITIVE.", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── écran 3 : geo_projete_orthogonal ────────────────────────────────────

    def ecran_projete(self):
        self.clear()
        self.add_mascotte(scale=0.42)
        self.dire("03-projete")
        self.titre_ecran("Le projeté orthogonal : le point le plus proche")

        # ⛔ Raccourcie, et son nom passe à GAUCHE : à droite, le « d » tombait
        # dans le bloc de calcul, juste devant « MH = 12 m ».
        d = Line([-6.4, -1.9, 0], [-0.9, -1.9, 0], color=WHITE, stroke_width=4)
        nom_d = Text("d", font_size=28, color=WHITE).next_to(d.get_start(), UR, buff=0.08)
        self.play(Create(d), FadeIn(nom_d))

        M = np.array([-4.3, 1.1, 0])
        H = np.array([-4.3, -1.9, 0])
        Apt = np.array([-1.8, -1.9, 0])
        for p, nom, dd in ((M, "M", UP), (H, "H", DOWN), (Apt, "A", DOWN)):
            self.play(GrowFromCenter(Dot(p, color=JAUNE_TITRE, radius=0.08)),
                      FadeIn(Text(nom, font_size=28, color=JAUNE_TITRE)
                             .next_to(p, dd, buff=0.15)), run_time=0.3)

        mh = Line(M, H, color=VERT_OK, stroke_width=6)
        self.play(Create(mh))
        self.play(Create(RightAngle(Line(H, M), Line(H, Apt), length=0.3,
                                    color=VERT_OK, stroke_width=3)))
        ma = DashedLine(M, Apt, color=ORANGE_RETENUE, stroke_width=4)
        self.play(Create(ma))

        self.play(FadeIn(cote(H, Apt, "5 m", DOWN * 0.35, 24, WHITE)),
                  FadeIn(cote(M, Apt, "13 m", UP * 0.3 + RIGHT * 0.3, 24,
                              ORANGE_RETENUE)),
                  FadeIn(cote(M, H, "?", LEFT * 0.35, 30, VERT_OK)))

        corps, cadre = self.bloc_encadre(
            [Text("H est LE PLUS PROCHE", font_size=30, color=VERT_OK),
             Text("de tous les points de d", font_size=23, color=WHITE),
             Text("MH = distance de M à d", font_size=25, color=JAUNE_TITRE)],
            VERT_OK)
        corps.move_to([3.4, 1.5, 0])
        cadre.move_to(corps.get_center())
        self.play(FadeIn(corps), Create(cadre))

        calcul = VGroup(
            Text("MH²  +  5²  =  13²", font_size=30, color=WHITE),
            Text("MH²  =  169 − 25  =  144", font_size=30, color=WHITE),
            Text("MH  =  12 m", font_size=40, color=VERT_OK),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.32).move_to([3.7, -1.3, 0])
        for m in calcul:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.5)

        self.play(Write(self.chute("Le chemin le plus court vers une droite est perpendiculaire.")))
        self.attendre_voix()

    # ── écran 4 : geo_longueurs_aires ───────────────────────────────────────

    def ecran_aires(self):
        self.clear()
        self.add_mascotte(scale=0.42)
        self.dire("04-aires")
        self.titre_ecran("Le projeté donne la hauteur, donc l'aire")

        A = np.array([-5.9, -1.9, 0])
        B = A + RIGHT * 4.4                      # AB = 8 cm
        C = A + np.array([np.cos(np.pi / 6), np.sin(np.pi / 6), 0]) * 3.3  # AC = 6, 30°
        H = np.array([C[0], A[1], 0])

        tri = Polygon(A, B, C, color=WHITE, stroke_width=4)
        self.play(Create(tri))
        for p, nom, dd in ((A, "A", DL), (B, "B", DR), (C, "C", UP)):
            self.play(FadeIn(Text(nom, font_size=28, color=WHITE)
                             .next_to(p, dd, buff=0.12)), run_time=0.25)
        self.play(Create(arc_angle(A, B, C, radius=0.6)),
                  FadeIn(Text("30°", font_size=24, color=JAUNE_TITRE)
                         .move_to(A + RIGHT * 1.0 + UP * 0.3)))
        self.play(FadeIn(cote(A, B, "8 cm", DOWN * 0.38 + LEFT * 0.85, 24, WHITE)),
                  FadeIn(cote(A, C, "6 cm", UP * 0.28 + LEFT * 0.3, 24, WHITE)))

        hauteur = DashedLine(C, H, color=VERT_OK, stroke_width=5)
        self.play(Create(hauteur),
                  GrowFromCenter(Dot(H, color=VERT_OK, radius=0.07)),
                  FadeIn(Text("H", font_size=26, color=VERT_OK)
                         .next_to(H, DOWN, buff=0.14)))
        self.play(Create(RightAngle(Line(H, C), Line(H, B), length=0.28,
                                    color=VERT_OK, stroke_width=3)))

        etapes = VGroup(
            Text("dans AHC, rectangle en H :", font_size=24, color=WHITE),
            Text("sin 30°  =  CH / 6", font_size=32, color=WHITE),
            Text("CH  =  6 × 0,5  =  3 cm", font_size=32, color=VERT_OK),
            Text("aire  =  8 × 3 ÷ 2  =  12 cm²", font_size=34, color=JAUNE_TITRE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.34).move_to([3.5, 0.3, 0])
        for m in etapes:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.5)
        self.play(Circumscribe(etapes[3], color=JAUNE_TITRE, buff=0.18))

        self.play(Write(self.chute("Pas de hauteur ? Le projeté orthogonal la fabrique.")))
        self.attendre_voix()

    # ── écran 5 : geo_optimisation ──────────────────────────────────────────

    def ecran_optimisation(self):
        self.clear()
        self.add_mascotte(scale=0.42)
        self.dire("05-optimisation")
        self.titre_ecran("Trouver le maximum : l'enclos et la rivière")

        riviere = Line([-6.4, 0.9, 0], [-1.0, 0.9, 0], color=BLEU_CALCUL,
                       stroke_width=9)
        self.play(Create(riviere),
                  FadeIn(Text("la rivière", font_size=24, color=BLEU_CALCUL)
                         .next_to(riviere, UP, buff=0.15)))

        coins = [np.array([-5.6, 0.9, 0]), np.array([-2.0, 0.9, 0]),
                 np.array([-2.0, -1.5, 0]), np.array([-5.6, -1.5, 0])]
        for p, q, coul, ep in ((coins[0], coins[3], VERT_OK, 6),
                               (coins[3], coins[2], ORANGE_RETENUE, 6),
                               (coins[2], coins[1], VERT_OK, 6)):
            self.play(Create(Line(p, q, color=coul, stroke_width=ep)), run_time=0.4)
        self.play(FadeIn(cote(coins[0], coins[3], "x", LEFT * 0.35, 30, VERT_OK)),
                  FadeIn(cote(coins[1], coins[2], "x", RIGHT * 0.35, 30, VERT_OK)),
                  FadeIn(cote(coins[3], coins[2], "60 − 2x", DOWN * 0.38, 28,
                              ORANGE_RETENUE)))
        self.play(FadeIn(Text("pas de clôture ici", font_size=21, color=WHITE)
                         .move_to([-3.8, 0.45, 0])))

        etapes = VGroup(
            Text("A(x)  =  x (60 − 2x)", font_size=32, color=WHITE),
            Text("=  60x − 2x²", font_size=32, color=WHITE),
            Text("=  450 − 2(x − 15)²", font_size=34, color=BLEU_CALCUL),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.32).move_to([3.5, 1.35, 0])
        for m in etapes:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.55)
        self.play(Circumscribe(etapes[2], color=BLEU_CALCUL, buff=0.18))

        corps, cadre = self.bloc_encadre(
            [Text("un carré est toujours ⩾ 0".replace("⩾", "≥"),
                  font_size=25, color=WHITE),
             Text("on retire toujours quelque chose…", font_size=24, color=WHITE),
             Text("sauf si x = 15", font_size=32, color=ORANGE_RETENUE),
             Text("aire max : 450 m²   (15 m × 30 m)", font_size=28, color=VERT_OK)],
            VERT_OK)
        corps.move_to([3.5, -1.45, 0])
        cadre.move_to(corps.get_center())
        self.play(FadeIn(corps), Create(cadre))

        self.play(Write(self.chute("La forme canonique donne le maximum sans calcul.")))
        self.attendre_voix()

    # ── défi et correction : la pente du col ────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        self.dire("06-defi")
        self.play(Write(Text("Défi", font_size=48, color=JAUNE_TITRE).to_edge(UP)))

        A = np.array([-5.2, -1.6, 0])
        B = A + RIGHT * 4.6
        C = B + UP * 0.9
        self.play(Create(Polygon(A, B, C, color=WHITE, stroke_width=4)))
        self.play(Create(RightAngle(Line(B, A), Line(B, C), length=0.28,
                                    color=BLEU_CALCUL, stroke_width=3)))
        self.play(FadeIn(cote(A, B, "100 m à l'horizontale", DOWN * 0.38, 23, WHITE)),
                  FadeIn(cote(B, C, "12 m", RIGHT * 0.55, 24, ORANGE_RETENUE)),
                  FadeIn(Text("α", font_size=26, color=JAUNE_TITRE)
                         .move_to(A + RIGHT * 0.75 + UP * 0.16)))
        self.play(FadeIn(Text("pente 12 %", font_size=30, color=ORANGE_RETENUE)
                         .move_to([-2.9, 0.9, 0])))

        q = VGroup(
            Text("1.  Calcule α, au dixième de degré.", font_size=30, color=WHITE),
            Text("2.  Le cycliste parcourt 2 km LE LONG", font_size=30, color=WHITE),
            Text("     DE LA ROUTE. De combien monte-t-il ?", font_size=30, color=WHITE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.4).move_to([3.0, 0.4, 0])
        if q.width > 7.6:
            q.scale_to_fit_width(7.6)
        for m in q:
            self.play(FadeIn(m, shift=RIGHT * 0.2), run_time=0.5)

        pause = self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=32)
        self.play(Write(pause), Flash(pause, color=ORANGE_RETENUE, line_length=0.25))
        self.attendre_voix(marge=4.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.42)
        self.dire("07-correction")
        self.titre_ecran("Correction")

        bloc1 = VGroup(
            Text("1.  12 m de montée pour 100 m à l'horizontale", font_size=27, color=VERT_OK),
            Text("opposé sur adjacent : c'est une TANGENTE", font_size=25, color=WHITE),
            Text("tan α = 12/100 = 0,12      donc   α = 6,8°", font_size=30, color=VERT_OK),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.22)

        bloc2 = VGroup(
            Text("2.  les 2 km sont mesurés LE LONG DE LA ROUTE", font_size=27, color=VERT_OK),
            Text("c'est l'HYPOTÉNUSE : il faut le sinus, pas la tangente",
                 font_size=25, color=ORANGE_RETENUE),
            Text("sin 6,8° ≈ 0,119      2000 × 0,119 = 238 m", font_size=30, color=VERT_OK),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.22)

        bloc3 = VGroup(
            Text("« 12 % de 2000 = 240 m » : presque juste", font_size=26, color=WHITE),
            Text("sur une pente faible, sinus ≈ tangente", font_size=25, color=BLEU_CALCUL),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.22)

        tout = VGroup(bloc1, bloc2, bloc3).arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        if tout.width > 12.0:
            tout.scale_to_fit_width(12.0)
        tout.move_to([-0.3, -0.35, 0])
        for bloc in tout:
            for ligne in bloc:
                self.play(FadeIn(ligne, shift=RIGHT * 0.15), run_time=0.45)
        self.play(Circumscribe(bloc2[2], color=VERT_OK, buff=0.15))
        self.attendre_voix()

    # ── un encadré, comme dans la leçon des fonctions de référence ──────────

    def bloc_encadre(self, lignes, couleur, buff=0.28):
        g = VGroup(*lignes).arrange(DOWN, buff=0.22)
        return g, SurroundingRectangle(g, color=couleur, buff=buff, stroke_width=2.5)

    def construct(self):
        self.page_de_garde(
            titre="Problèmes de géométrie plane",
            accroche="Mesurer un arbre sans y grimper.",
            promesse="Trigonométrie · projeté · aires · maximum",
        )
        self.page_objectifs([
            "calculer une longueur ou un angle avec sinus, cosinus, tangente",
            "placer le projeté orthogonal, et s'en servir pour une aire",
            "trouver le maximum d'une aire",
        ])
        self.ecran_trigonometrie()
        self.ecran_identite()
        self.ecran_projete()
        self.ecran_aires()
        self.ecran_optimisation()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "sinus, cosinus, tangente : CAH SOH TOA",
                "le projeté orthogonal donne la distance et la hauteur",
                "la forme canonique donne le maximum d'une aire",
            ],
            rappel="Avant d'écrire un sinus, demande-toi quel côté est l'hypoténuse.",
        )
        self.page_abonnement()
