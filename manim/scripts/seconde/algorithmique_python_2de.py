# algorithmique_python_2de.py
# EleveAI — Maths seconde — Algorithmique et Python
# (notionId : algorithmique_python_2de)
#
# ⭐ SEPTIÈME NOTION DE SECONDE (10/09/2026), écrite le jour où sa fiche est
# sortie (`lib/fiches/maths-seconde-python.tsx`, 09h34).
#
# Briques communes : `manim/gabarit_seconde.py`.
#
# Mapping micro-compétences (7 micros, TOUS couverts) → écrans :
# - python_variable_affectation → écran 1 (⛔ « = » RANGE, il ne compare pas)
# - python_type_variable        → écran 2 (les types, et le piège de la division)
# - python_condition            → écran 3 (l'aiguillage, et l'indentation)
# - python_boucle               → écran 4 (bornée : on sait COMBIEN)
# - python_boucle_non_bornee    → écran 4 (non bornée : on sait QUAND)
# - python_fonction             → écran 5 (def et return)
# - python_simulation           → écran 6 (mesurer ce qu'on ne peut pas calculer)
#
# ⭐ LA VOIX DIT LE CONCEPT, L'ÉCRAN MONTRE LE MOT-CLÉ. La synthèse française
# prononce « ouilè » pour `while` et « fore » pour `for` : au lieu de lui faire
# écorcher l'anglais, elle dit « la boucle bornée » pendant que `for` s'affiche.
# C'est aussi meilleur pédagogiquement — le mot-clé se LIT, le sens s'ENTEND.
#
# ⚠️ `Code` (Manim) passe par pygments, PAS par LaTeX : il se rend donc ici,
# contrairement à `MathTex`. On lui retire son fond et sa barre de fenêtre pour
# rester dans la charte (fond noir).
#
# Rendu :
#   python -m manim render -qh --disable_caching manim/scripts/seconde/algorithmique_python_2de.py Python2de -o eleveai-maths-seconde-python --media_dir manim/scripts/seconde/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_seconde import SONS, NotionSeconde, ShortSeconde

VOIX = SONS / "seconde-python"
VOIX_EGAL = SONS / "seconde-python-short-egal"
VOIX_BOUCLES = SONS / "seconde-python-short-boucles"
VOIX_TRACER = SONS / "seconde-python-short-tracer"


class _PythonBase:
    """Ce qui sert à la fois à la vidéo longue et aux shorts."""

    def code(self, lignes, font_size=26, largeur_max=None):
        """Un bloc de code Python, sans fond ni barre de fenêtre.

        ⚠️ `Code` ajoute par défaut un cadre et une barre façon éditeur : on les
        retire pour rester sur le fond noir de la charte.
        """
        c = Code(
            code_string="\n".join(lignes),
            language="python",
            background="rectangle",
            add_line_numbers=False,
            formatter_style="monokai",
        )
        # ⛔ PAS de `c.background_mobject` : cette version de Manim n'expose pas
        # cet attribut (AttributeError au rendu). Le fond est le premier
        # sous-objet, un `SurroundingRectangle` — on le repère par son TYPE
        # plutôt que par un nom d'attribut qui change d'une version à l'autre.
        for m in c.submobjects:
            if isinstance(m, SurroundingRectangle):
                m.set_fill(opacity=0)
                m.set_stroke(opacity=0)
        # ⚠️ PLANCHER À DEUX LIGNES. Une hauteur strictement proportionnelle rend
        # un code d'UNE ligne minuscule à l'écran (constaté au rendu du 10/09) :
        # `x = 3` sortait deux fois plus petit que le texte qui l'entoure.
        c.scale_to_fit_height(min(max(len(lignes), 2) * 0.55, 4.2))
        if largeur_max and c.width > largeur_max:
            c.scale_to_fit_width(largeur_max)
        return c

    def tableau_trace(self, entetes, lignes, font_size=26, couleur=BLEU_CALCUL):
        """Le tableau de trace — deux colonnes, une ligne par tour."""
        grille = VGroup()
        for j, e in enumerate(entetes):
            grille.add(Text(e, font_size=font_size + 2, color=couleur))
        entete = VGroup(*grille).arrange(RIGHT, buff=1.0)
        corps = VGroup()
        for l in lignes:
            corps.add(VGroup(*[Text(str(c), font_size=font_size, color=WHITE)
                               for c in l]).arrange(RIGHT, buff=1.0))
        corps.arrange(DOWN, buff=0.28)
        for c in corps:
            c.match_x(entete)
        bloc = VGroup(entete, corps).arrange(DOWN, buff=0.35)
        barre = Line(bloc.get_left(), bloc.get_right(), color=couleur, stroke_width=2)
        barre.next_to(entete, DOWN, buff=0.14)
        return VGroup(bloc, barre)


class Python2de(NotionSeconde, _PythonBase):

    dossier_voix = VOIX

    # ── écran 1 : python_variable_affectation ───────────────────────────────

    def ecran_variable(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-variable")
        self.titre_ecran("Le signe = RANGE, il ne compare pas")

        # La boîte : l'image qui fait comprendre l'affectation.
        boite = Rectangle(width=1.5, height=1.1, color=BLEU_CALCUL,
                          fill_opacity=0.25, stroke_width=3).move_to([-3.6, 0.9, 0])
        nom = Text("x", font_size=30, color=BLEU_CALCUL).next_to(boite, UP, buff=0.15)
        valeur = Text("3", font_size=44, color=WHITE).move_to(boite.get_center())
        self.play(Create(boite), Write(nom))

        instr = self.code(["x = 3"], largeur_max=3.2).move_to([-3.6, -0.9, 0])
        self.play(FadeIn(instr))
        fl = Arrow(instr.get_top(), boite.get_bottom(), buff=0.15,
                   color=VERT_OK, stroke_width=4)
        self.play(Create(fl), FadeIn(valeur, shift=UP * 0.3))

        lecture = Text("« range 3 dans la boîte x »", font_size=27, color=VERT_OK)
        lecture.move_to([-3.6, -2.1, 0])
        self.play(Write(lecture))
        self.wait(0.4)

        # La ligne absurde en maths, normale en Python.
        preuve = self.code(["x = x + 1"], largeur_max=3.6).move_to([3.2, 1.4, 0])
        self.play(FadeIn(preuve))
        explique = VGroup(
            Text("en maths : absurde", font_size=27, color=ROUGE_ERREUR),
            Text("en Python : prends x,", font_size=27, color=WHITE),
            Text("ajoute 1, remets dans x", font_size=27, color=WHITE),
        ).arrange(DOWN, buff=0.26).move_to([3.2, 0.0, 0])
        for m in explique:
            self.play(FadeIn(m, shift=RIGHT * 0.15), run_time=0.45)

        compare = VGroup(
            Text("pour COMPARER :", font_size=28, color=JAUNE_TITRE),
            Text("==", font_size=44, color=JAUNE_TITRE),
        ).arrange(RIGHT, buff=0.35).move_to([3.2, -1.55, 0])
        self.play(FadeIn(compare), Flash(compare[1], color=JAUNE_TITRE, line_length=0.25))
        self.attendre_voix()

    # ── écran 2 : python_type_variable ──────────────────────────────────────

    def ecran_types(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-types")
        self.titre_ecran("Les types, et le piège de la division")

        types = VGroup()
        for nom, ex, coul in [("entier", "7", BLEU_CALCUL), ("à virgule", "2.5", VERT_OK),
                              ("texte", '"oui"', ORANGE_RETENUE), ("booléen", "True", JAUNE_TITRE)]:
            bloc = VGroup(
                Text(nom, font_size=26, color=coul),
                Text(ex, font_size=30, color=WHITE),
            ).arrange(DOWN, buff=0.18)
            cadre = SurroundingRectangle(bloc, color=coul, buff=0.22, stroke_width=2)
            types.add(VGroup(bloc, cadre))
        types.arrange(RIGHT, buff=0.5).move_to([0, 1.5, 0])
        self.play(LaggedStart(*[FadeIn(t, shift=DOWN * 0.15) for t in types], lag_ratio=0.25))

        piege = Text("⛔ la division rend TOUJOURS un nombre à virgule".replace("⛔ ", ""),
                     font_size=30, color=ROUGE_ERREUR).move_to([0, 0.15, 0])
        self.play(Write(piege))

        exemples = self.code(["6 / 3   →  2.0", "6 // 3  →  2"], largeur_max=6.0)
        exemples.move_to([0, -1.35, 0])
        self.play(FadeIn(exemples))
        note = Text("la double barre garde l'entier", font_size=26, color=VERT_OK)
        note.move_to([0, -2.4, 0])
        self.play(Write(note))
        self.attendre_voix()

    # ── écran 3 : python_condition ──────────────────────────────────────────

    def ecran_condition(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-condition")
        self.titre_ecran("La condition : un aiguillage")

        prog = self.code([
            "if note >= 10:",
            "    print('admis')",
            "else:",
            "    print('à revoir')",
        ], largeur_max=5.6).move_to([-3.0, 0.5, 0])
        self.play(FadeIn(prog))

        # L'aiguillage, dessiné.
        depart = Dot([2.0, 1.8, 0], color=WHITE, radius=0.08)
        fl_oui = Arrow([2.0, 1.7, 0], [3.6, 0.7, 0], buff=0.08, color=VERT_OK, stroke_width=4)
        fl_non = Arrow([2.0, 1.7, 0], [0.6, 0.7, 0], buff=0.08, color=ROUGE_ERREUR, stroke_width=4)
        lab_oui = Text("vrai", font_size=26, color=VERT_OK).move_to([4.2, 0.4, 0])
        lab_non = Text("faux", font_size=26, color=ROUGE_ERREUR).move_to([0.1, 0.4, 0])
        self.play(GrowFromCenter(depart))
        self.play(Create(fl_oui), FadeIn(lab_oui))
        self.play(Create(fl_non), FadeIn(lab_non))

        un_seul = Text("UN SEUL bloc s'exécute", font_size=30, color=JAUNE_TITRE)
        un_seul.move_to([2.4, -0.7, 0])
        self.play(Write(un_seul))

        indent = VGroup(
            Text("et c'est l'INDENTATION", font_size=27, color=ORANGE_RETENUE),
            Text("qui dit où est le bloc", font_size=27, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.2).move_to([2.4, -1.9, 0])
        self.play(FadeIn(indent, shift=UP * 0.15))

        self.play(Write(self.chute("Les espaces font partie du programme.")))
        self.attendre_voix()

    # ── écran 4 : les deux boucles ──────────────────────────────────────────

    def ecran_boucles(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-boucles")
        self.titre_ecran("Deux boucles : COMBIEN, ou QUAND")

        # ⭐ LA TRADUCTION EN TÊTE D'ÉCRAN (Frédéric, 10/09 : « tu peux traduire
        # si tu veux, while = tant que »). Le mot-clé anglais se LIT à l'écran,
        # le mot français porte le SENS — et c'est celui que la voix prononce.
        trad = VGroup(
            VGroup(Text("for", font_size=32, color=VERT_OK),
                   Text("=", font_size=28, color=WHITE),
                   Text("POUR", font_size=32, color=VERT_OK)).arrange(RIGHT, buff=0.22),
            VGroup(Text("while", font_size=32, color=ORANGE_RETENUE),
                   Text("=", font_size=28, color=WHITE),
                   Text("TANT QUE", font_size=32, color=ORANGE_RETENUE)).arrange(RIGHT, buff=0.22),
        ).arrange(RIGHT, buff=1.6).move_to([0, 2.75, 0])
        self.play(FadeIn(trad, shift=DOWN * 0.12))

        # bornée
        t1 = Text("je sais COMBIEN", font_size=30, color=VERT_OK).move_to([-3.4, 1.85, 0])
        self.play(Write(t1))
        c1 = self.code(["s = 0", "for i in range(4):", "    s = s + i"],
                       largeur_max=5.2).move_to([-3.4, 0.70, 0])
        self.play(FadeIn(c1))
        r1 = Text("s = 0+1+2+3 = 6", font_size=28, color=VERT_OK).move_to([-3.4, -0.85, 0])
        self.play(Write(r1))

        # non bornée
        t2 = Text("je sais QUAND m'arrêter", font_size=30, color=ORANGE_RETENUE)
        t2.move_to([3.2, 1.85, 0])
        self.play(Write(t2))
        c2 = self.code(["x = 1", "while x < 50:", "    x = x * 2"],
                       largeur_max=5.2).move_to([3.2, 0.70, 0])
        self.play(FadeIn(c2))
        r2 = Text("2, 4, 8, 16, 32, 64", font_size=28, color=ORANGE_RETENUE)
        r2.move_to([3.2, -0.85, 0])
        self.play(Write(r2))
        stop = Text("64 dépasse 50 → stop", font_size=26, color=ROUGE_ERREUR)
        stop.move_to([3.2, -1.5, 0])
        self.play(FadeIn(stop))

        self.play(Write(self.chute("On choisit selon ce qu'on sait au départ.")))
        self.attendre_voix()

    # ── écran 5 : python_fonction ───────────────────────────────────────────

    def ecran_fonction(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-fonction")
        self.titre_ecran("Une fonction : la même idée qu'en maths")

        prog = self.code([
            "def f(x):",
            "    return x*x - 2*x",
            "",
            "f(4)   →  8",
        ], largeur_max=5.8).move_to([-3.0, 0.7, 0])
        self.play(FadeIn(prog))

        idee = VGroup(
            Text("on lui donne un nombre,", font_size=28, color=WHITE),
            Text("elle en rend un autre", font_size=28, color=WHITE),
            Text("définie UNE fois,", font_size=26, color=BLEU_CALCUL),
            Text("utilisée autant qu'on veut", font_size=26, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.28).move_to([3.2, 0.9, 0])
        for m in idee:
            self.play(FadeIn(m, shift=RIGHT * 0.15), run_time=0.45)

        alerte = VGroup(
            Text("sans return,", font_size=30, color=ROUGE_ERREUR),
            Text("elle ne rend RIEN", font_size=30, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.2).move_to([3.2, -1.5, 0])
        cadre = SurroundingRectangle(alerte, color=ROUGE_ERREUR, buff=0.25, stroke_width=2.5)
        self.play(FadeIn(alerte), Create(cadre))
        self.attendre_voix()

    # ── écran 6 : python_simulation ─────────────────────────────────────────

    def ecran_simulation(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-simulation")
        self.titre_ecran("La simulation : mesurer au lieu de calculer")

        idee = Text("quand on ne peut pas CALCULER une probabilité, on la MESURE",
                    font_size=28, color=WHITE).move_to([0, 2.05, 0])
        if idee.width > 11.5:
            idee.scale_to_fit_width(11.5)
        self.play(Write(idee))

        prog = self.code([
            "succes = 0",
            "for i in range(10000):",
            "    if experience():",
            "        succes = succes + 1",
            "p = succes / 10000",
        ], largeur_max=6.2).move_to([-3.0, 0.1, 0])
        self.play(FadeIn(prog))

        etapes = VGroup(
            Text("1.  je répète 10 000 fois", font_size=28, color=BLEU_CALCUL),
            Text("2.  je compte les succès", font_size=28, color=BLEU_CALCUL),
            Text("3.  je divise", font_size=28, color=VERT_OK),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.4).move_to([3.3, 0.1, 0])
        for m in etapes:
            self.play(FadeIn(m, shift=RIGHT * 0.15), run_time=0.45)

        self.play(Write(self.chute("Une seconde de machine contre des jours à la main.")))
        self.attendre_voix()

    # ── défi ────────────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        titre = Text("Défi", font_size=48, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        prog = self.code([
            "s = 0",
            "for i in range(1, 5):",
            "    s = s + 2*i",
        ], largeur_max=6.0).move_to([0, 1.1, 0])
        self.play(FadeIn(prog, shift=DOWN * 0.15))

        q = Text("Que vaut s à la fin ?", font_size=40, color=JAUNE_TITRE).move_to([0, -0.5, 0])
        self.play(Write(q))

        indice = Text("Trace ligne à ligne, et note les valeurs.",
                      font_size=28, color=BLEU_CALCUL).move_to([0, -1.4, 0])
        self.play(FadeIn(indice, shift=UP * 0.15))

        pause = self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=32)
        self.play(Write(pause), Flash(pause, color=ORANGE_RETENUE, line_length=0.25))
        self.attendre_voix(marge=4.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-correction")
        self.titre_ecran("Correction : on TRACE")

        tab = self.tableau_trace(
            ["i", "s"],
            [["—", "0"], ["1", "2"], ["2", "6"], ["3", "12"], ["4", "20"]],
        ).move_to([-2.6, -0.15, 0])
        self.play(FadeIn(tab[0][0]), Create(tab[1]))
        for ligne in tab[0][1]:
            self.play(FadeIn(ligne, shift=RIGHT * 0.15), run_time=0.4)

        detail = VGroup(
            Text("+2", font_size=26, color=ORANGE_RETENUE),
            Text("+4", font_size=26, color=ORANGE_RETENUE),
            Text("+6", font_size=26, color=ORANGE_RETENUE),
            Text("+8", font_size=26, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.35).next_to(tab, RIGHT, buff=0.5).shift(DOWN * 0.3)
        self.play(LaggedStart(*[FadeIn(m) for m in detail], lag_ratio=0.25))

        res = VGroup(
            Text("s = 20", font_size=48, color=VERT_OK),
            Text("i s'arrête à 4", font_size=26, color=WHITE),
        ).arrange(DOWN, buff=0.3).move_to([3.4, 0.1, 0])
        self.play(FadeIn(res, shift=RIGHT * 0.2))
        self.play(Circumscribe(res[0], color=VERT_OK, buff=0.2))

        self.play(Write(self.chute("Je n'ai rien deviné : j'ai noté.")))
        self.attendre_voix()

    def construct(self):
        self.page_de_garde(
            titre="Algorithmique et Python",
            accroche="x = x + 1 : impossible en maths, normal en Python ?",
            promesse="Tracer · comprendre · écrire",
        )
        self.page_objectifs([
            "lire un programme ligne à ligne, en notant les valeurs",
            "reconnaître une condition et les deux sortes de boucles",
            "écrire une fonction, et comprendre à quoi elle sert",
        ])
        self.ecran_variable()
        self.ecran_types()
        self.ecran_condition()
        self.ecran_boucles()
        self.ecran_fonction()
        self.ecran_simulation()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "un = RANGE ; pour comparer, il en faut deux",
                "boucle bornée si on sait COMBIEN, sinon non bornée",
                "pour comprendre un programme, on le TRACE",
            ],
            rappel="L'ordinateur fait ce que tu écris, pas ce que tu voulais écrire.",
        )
        self.page_abonnement()


# ══════════════════════════════════════════════════════════════════════════════
#  LES TROIS SHORTS
# ══════════════════════════════════════════════════════════════════════════════

class Python2deShortEgal(ShortSeconde, _PythonBase):
    """L'ERREUR — un « = » range, deux comparent."""

    dossier_voix = VOIX_EGAL

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        expr = self.grand("x = x + 1", font_size=76, color=JAUNE_TITRE).move_to([0, 1.9, 0])
        self.play(FadeIn(expr, shift=DOWN * 0.15), run_time=0.45)
        q = VGroup(
            self.grand("impossible en maths", font_size=32, color=ROUGE_ERREUR),
            self.grand("normal en Python", font_size=32, color=VERT_OK),
        ).arrange(DOWN, buff=0.25).move_to([0, 0.3, 0])
        self.play(FadeIn(q, shift=UP * 0.12), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_range(self):
        self.clear()
        self.margo_bas()
        self.dire("01-range")
        self.play(Write(self.grand("Le = RANGE", font_size=52, color=JAUNE_TITRE).move_to([0, 3.05, 0])))
        boite = Rectangle(width=1.5, height=1.1, color=BLEU_CALCUL,
                          fill_opacity=0.25, stroke_width=3).move_to([0, 1.4, 0])
        nom = self.grand("x", font_size=32, color=BLEU_CALCUL).next_to(boite, UP, buff=0.15)
        self.play(Create(boite), Write(nom))
        val = self.grand("3", font_size=52, color=WHITE).move_to(boite.get_center())
        self.play(FadeIn(val, shift=UP * 0.3))
        note = VGroup(
            self.grand("« range 3 dans", font_size=32, color=VERT_OK),
            self.grand("la boîte x »", font_size=32, color=VERT_OK),
        ).arrange(DOWN, buff=0.2).move_to([0, -0.6, 0])
        self.play(FadeIn(note, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def ecran_exemple(self):
        self.clear()
        self.margo_bas()
        self.dire("02-exemple")
        suite = VGroup(
            self.grand("x = x + 1", font_size=56, color=JAUNE_TITRE),
            self.grand("prends x,", font_size=34, color=WHITE),
            self.grand("ajoute 1,", font_size=34, color=WHITE),
            self.grand("remets dans x", font_size=34, color=WHITE),
        ).arrange(DOWN, buff=0.28).move_to([0, 1.5, 0])
        for m in suite:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.4)
        ex = self.grand("5 → 6", font_size=56, color=VERT_OK).move_to([0, -1.1, 0])
        self.play(GrowFromCenter(ex))
        self.attendre_voix(marge=0.4)

    def ecran_comparer(self):
        self.clear()
        self.margo_bas()
        self.dire("03-comparer")
        bloc = VGroup(
            self.grand("pour COMPARER", font_size=38, color=WHITE),
            self.grand("==", font_size=110, color=JAUNE_TITRE),
            self.grand("deux signes", font_size=34, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.3).move_to([0, 1.4, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.42)
        self.play(Write(self.grand("l'erreur n°1 des débutants", font_size=30,
                                   color=ROUGE_ERREUR).move_to([0, -1.2, 0])))
        self.attendre_voix(marge=0.4)

    def ecran_retenir(self):
        self.clear()
        self.margo_bas()
        self.dire("04-retenir")
        bloc = VGroup(
            self.grand("=", font_size=90, color=VERT_OK),
            self.grand("ça RANGE", font_size=42, color=VERT_OK),
            self.grand("==", font_size=90, color=ORANGE_RETENUE),
            self.grand("ça COMPARE", font_size=42, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.22).move_to([0, 1.2, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.38)
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_range()
        self.ecran_exemple()
        self.ecran_comparer()
        self.ecran_retenir()
        self.ecran_renvoi()


class Python2deShortBoucles(ShortSeconde, _PythonBase):
    """LE GESTE — choisir sa boucle : COMBIEN ou QUAND."""

    dossier_voix = VOIX_BOUCLES

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        t = VGroup(
            self.grand("for = POUR", font_size=54, color=VERT_OK),
            self.grand("ou", font_size=34, color=WHITE),
            self.grand("while = TANT QUE", font_size=44, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.26).move_to([0, 1.8, 0])
        self.play(FadeIn(t, shift=DOWN * 0.15), run_time=0.5)
        q = self.grand("laquelle prendre ?", font_size=38, color=WHITE).move_to([0, -0.1, 0])
        self.play(FadeIn(q, shift=UP * 0.12), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_bornee(self):
        self.clear()
        self.margo_bas()
        self.dire("01-bornee")
        entete = VGroup(
            self.grand("for", font_size=64, color=VERT_OK),
            self.grand("= POUR", font_size=40, color=VERT_OK),
        ).arrange(DOWN, buff=0.15).move_to([0, 2.9, 0])
        self.play(Write(entete))
        bloc = VGroup(
            self.grand("je sais", font_size=36, color=WHITE),
            self.grand("COMBIEN", font_size=56, color=VERT_OK),
            self.grand("de fois répéter", font_size=32, color=WHITE),
            self.grand("elle compte", font_size=32, color=VERT_OK),
            self.grand("toute seule", font_size=32, color=VERT_OK),
        ).arrange(DOWN, buff=0.24).move_to([0, 1.1, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.36)
        self.attendre_voix(marge=0.4)

    def ecran_exemple1(self):
        self.clear()
        self.margo_bas()
        self.dire("02-exemple1")
        c = self.code(["s = 0", "for i in range(4):", "    s = s + i"],
                      largeur_max=config.frame_width - 0.6).move_to([0, 2.0, 0])
        self.play(FadeIn(c))
        suite = VGroup(
            self.grand("0 + 1 + 2 + 3", font_size=42, color=WHITE),
            self.grand("s = 6", font_size=64, color=VERT_OK),
            self.grand("4 tours, décidés", font_size=28, color=BLEU_CALCUL),
            self.grand("d'avance", font_size=28, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.26).move_to([0, -0.5, 0])
        for m in suite:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.38)
        self.attendre_voix(marge=0.4)

    def ecran_non_bornee(self):
        self.clear()
        self.margo_bas()
        self.dire("03-non-bornee")
        entete = VGroup(
            self.grand("while", font_size=64, color=ORANGE_RETENUE),
            self.grand("= TANT QUE", font_size=40, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.15).move_to([0, 2.9, 0])
        self.play(Write(entete))
        bloc = VGroup(
            self.grand("je ne sais PAS", font_size=34, color=WHITE),
            self.grand("combien de fois", font_size=32, color=WHITE),
            self.grand("mais je sais", font_size=34, color=WHITE),
            self.grand("QUAND", font_size=56, color=ORANGE_RETENUE),
            self.grand("m'arrêter", font_size=32, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.22).move_to([0, 1.1, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.36)
        self.attendre_voix(marge=0.4)

    def ecran_exemple2(self):
        self.clear()
        self.margo_bas()
        self.dire("04-exemple2")
        c = self.code(["x = 1", "while x < 50:", "    x = x * 2"],
                      largeur_max=config.frame_width - 0.6).move_to([0, 2.0, 0])
        self.play(FadeIn(c))
        suite = VGroup(
            self.grand("2, 4, 8, 16, 32", font_size=38, color=WHITE),
            self.grand("64", font_size=64, color=ROUGE_ERREUR),
            self.grand("dépasse 50 → stop", font_size=30, color=ROUGE_ERREUR),
            self.grand("combien de tours ?", font_size=30, color=BLEU_CALCUL),
            self.grand("on ne savait pas", font_size=30, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.22).move_to([0, -0.55, 0])
        for m in suite:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.36)
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_bornee()
        self.ecran_exemple1()
        self.ecran_non_bornee()
        self.ecran_exemple2()
        self.ecran_renvoi()


class Python2deShortTracer(ShortSeconde, _PythonBase):
    """L'USAGE — tracer un programme ligne à ligne."""

    dossier_voix = VOIX_TRACER

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        c = self.code(["s = 0", "for i in range(1, 5):", "    s = s + 2*i"],
                      largeur_max=config.frame_width - 0.5).move_to([0, 2.1, 0])
        self.play(FadeIn(c), run_time=0.5)
        q = VGroup(
            self.grand("s = ?", font_size=64, color=JAUNE_TITRE),
            self.grand("ne devine pas", font_size=34, color=WHITE),
        ).arrange(DOWN, buff=0.25).move_to([0, 0.2, 0])
        self.play(FadeIn(q, shift=UP * 0.12), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_methode(self):
        self.clear()
        self.margo_bas()
        self.dire("01-methode")
        bloc = VGroup(
            self.grand("TRACE", font_size=72, color=VERT_OK),
            self.grand("ligne à ligne", font_size=36, color=WHITE),
            self.grand("et NOTE", font_size=44, color=VERT_OK),
            self.grand("les valeurs", font_size=36, color=WHITE),
        ).arrange(DOWN, buff=0.26).move_to([0, 1.3, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def _tour(self, voix, lignes):
        self.clear()
        self.margo_bas()
        self.dire(voix)
        tab = self.tableau_trace(["i", "s"], lignes, font_size=30).move_to([0, 1.2, 0])
        self.play(FadeIn(tab[0][0]), Create(tab[1]))
        for l in tab[0][1]:
            self.play(FadeIn(l, shift=RIGHT * 0.12), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_resultat(self):
        self.clear()
        self.margo_bas()
        self.dire("04-resultat")
        bloc = VGroup(
            self.grand("i s'arrête à 4", font_size=34, color=WHITE),
            self.grand("s = 20", font_size=88, color=VERT_OK),
        ).arrange(DOWN, buff=0.35).move_to([0, 1.6, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.45)
        self.play(Flash(bloc[1], color=VERT_OK, line_length=0.4))
        note = VGroup(
            self.grand("rien deviné :", font_size=32, color=JAUNE_TITRE),
            self.grand("seulement noté", font_size=32, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.2).move_to([0, -0.8, 0])
        self.play(FadeIn(note, shift=UP * 0.12))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_methode()
        self._tour("02-tours", [["—", "0"], ["1", "2"], ["2", "6"]])
        self._tour("03-suite", [["3", "12"], ["4", "20"]])
        self.ecran_resultat()
        self.ecran_renvoi()
