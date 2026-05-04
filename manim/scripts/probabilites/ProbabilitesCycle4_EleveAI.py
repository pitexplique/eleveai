# ProbabilitesCycle4_EleveAI.py
# EleveAI — Cycle 4 — Probabilités
# Style : mascotte π, titres jaunes, erreurs rouges, conclusions vertes

from manim import *

YELLOW_TITLE = "#FFD700"
GREEN = "#00FF7F"
RED = "#FF0000"
BLUE = "#38BDF8"
ORANGE = "#F97316"
VIOLET = "#A78BFA"

try:
    from mascotte import MascottePi
except Exception:
    MascottePi = None


class ProbabilitesCycle4EleveAI(Scene):

    def add_mascotte(self, scale=0.55, corner=DOWN + RIGHT):
        if MascottePi:
            m = MascottePi().scale(scale).to_corner(corner)
            self.add(m)
            return m
        fallback = Text("π", font_size=52, color=YELLOW_TITLE).to_corner(corner)
        self.add(fallback)
        return fallback

    def ecran_accueil(self):
        self.clear()
        title = Text("EleveAI", font_size=54, color=YELLOW_TITLE).to_edge(UP)
        subtitle = Text("Probabilités — Cycle 4", font_size=36, color=WHITE)
        subtitle.next_to(title, DOWN, buff=0.35)

        question = Text(
            "Quelle est la chance d’obtenir un 6 ?",
            font_size=34,
            color=BLUE,
        ).next_to(subtitle, DOWN, buff=0.8)

        self.add_mascotte()
        self.play(Write(title), FadeIn(subtitle))
        self.play(Write(question))
        self.wait(1.5)

    def ecran_vocabulaire(self):
        self.clear()
        title = Text("1. Le vocabulaire", font_size=42, color=YELLOW_TITLE).to_edge(UP)

        lines = VGroup(
            Text("Expérience aléatoire : résultat non connu à l’avance", font_size=27),
            Text("Issue : un résultat possible", font_size=27),
            Text("Événement : une ou plusieurs issues", font_size=27),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.35).to_edge(LEFT).shift(UP * 0.4)

        die = VGroup()
        for i in range(6):
            square = Square(0.6, color=WHITE).set_fill("#1E293B", opacity=0.5)
            number = Text(str(i + 1), font_size=28, color=WHITE)
            cell = VGroup(square, number)
            die.add(cell)

        die.arrange_in_grid(rows=2, cols=3, buff=0.25).to_edge(RIGHT).shift(UP * 0.2)

        note = Text(
            "Exemple : obtenir un nombre pair = {2, 4, 6}",
            font_size=27,
            color=GREEN,
        ).to_edge(DOWN)

        self.add_mascotte()
        self.play(Write(title))
        self.play(LaggedStart(*[Write(l) for l in lines], lag_ratio=0.25))
        self.play(FadeIn(die))
        self.play(Write(note))
        self.wait(1.5)

    def ecran_equiprobabilite(self):
        self.clear()
        title = Text("2. Équiprobabilité", font_size=42, color=YELLOW_TITLE).to_edge(UP)

        left_title = Text("Dé équilibré", font_size=30, color=GREEN)
        right_title = Text("Roue non équilibrée", font_size=30, color=RED)

        left_box = RoundedRectangle(width=4.3, height=3.2, corner_radius=0.2, color=GREEN)
        right_box = RoundedRectangle(width=4.3, height=3.2, corner_radius=0.2, color=RED)

        left = VGroup(left_title, left_box).arrange(DOWN, buff=0.3).shift(LEFT * 3)
        right = VGroup(right_title, right_box).arrange(DOWN, buff=0.3).shift(RIGHT * 3)

        text_left = Text("Chaque issue a\nla même chance", font_size=25, color=WHITE)
        text_left.move_to(left_box.get_center())

        text_right = Text("Certaines issues sont\nplus probables", font_size=25, color=WHITE)
        text_right.move_to(right_box.get_center())

        self.add_mascotte()
        self.play(Write(title))
        self.play(FadeIn(left), FadeIn(right))
        self.play(Write(text_left), Write(text_right))
        self.wait(1.5)

    def ecran_formule(self):
        self.clear()
        title = Text("3. La formule clé", font_size=42, color=YELLOW_TITLE).to_edge(UP)

        formule = MathTex(
            r"P",
            r"=",
            r"\frac{\text{ cas favorables }}{\text{ cas possibles }}",
            font_size=60,
            color=WHITE,
        )

        exemple = MathTex(
            r"P(\text{ obtenir un } 6)",
            r"=",
            r"\frac{1}{6}",
            font_size=46,
            color=GREEN,
        ).next_to(formule, DOWN, buff=0.8)

        self.add_mascotte()
        self.play(Write(title))
        self.play(Write(formule))
        self.wait(0.8)
        self.play(Write(exemple))
        self.wait(1.5)

    def ecran_exemples(self):
        self.clear()
        title = Text("4. Trois exemples rapides", font_size=42, color=YELLOW_TITLE).to_edge(UP)

        ex1 = MathTex(
            r"P(\text{ nombre pair })",
            r"=",
            r"\frac{3}{6}",
            r"=",
            r"\frac{1}{2}",
            font_size=38,
            color=GREEN,
        )
        ex2 = MathTex(
            r"P(\text{ nombre } > 4)",
            r"=",
            r"\frac{2}{6}",
            r"=",
            r"\frac{1}{3}",
            font_size=38,
            color=GREEN,
        )
        ex3 = MathTex(
            r"P(\text{ bille rouge })",
            r"=",
            r"\frac{\text{ rouges }}{\text{ total }}",
            font_size=38,
            color=GREEN,
        )

        examples = VGroup(ex1, ex2, ex3).arrange(DOWN, buff=0.55).move_to(ORIGIN)

        self.add_mascotte()
        self.play(Write(title))
        self.play(LaggedStart(*[Write(e) for e in examples], lag_ratio=0.35))
        self.wait(1.8)

    def ecran_erreurs(self):
        self.clear()
        title = Text("5. Erreurs fréquentes", font_size=42, color=YELLOW_TITLE).to_edge(UP)

        err1 = Text("❌ Confondre le mot avec le nombre d’issues", font_size=28, color=RED)
        err2 = Text("❌ Oublier de compter tous les cas possibles", font_size=28, color=RED)
        err3 = Text("❌ Croire qu’une probabilité peut dépasser 1", font_size=28, color=RED)

        ok = Text(
            "✅ On compte toujours : favorables / possibles",
            font_size=30,
            color=GREEN,
        )

        group = VGroup(err1, err2, err3, ok).arrange(DOWN, aligned_edge=LEFT, buff=0.45)
        group.move_to(ORIGIN)

        self.add_mascotte()
        self.play(Write(title))
        self.play(LaggedStart(*[Write(x) for x in group], lag_ratio=0.3))
        self.wait(2)

    def ecran_defi(self):
        self.clear()
        title = Text("Défi final", font_size=46, color=YELLOW_TITLE).to_edge(UP)

        question = Text(
            "On lance un dé.\nQuelle est la probabilité d’obtenir un nombre > 3 ?",
            font_size=34,
            color=WHITE,
            line_spacing=1.2,
        ).move_to(ORIGIN)

        pause = Text("Pause : cherche avant la correction.", font_size=28, color=ORANGE)
        pause.to_edge(DOWN)

        self.add_mascotte()
        self.play(Write(title))
        self.play(Write(question))
        self.play(Write(pause))
        self.wait(2.5)

    def ecran_correction(self):
        self.clear()
        title = Text("Correction", font_size=46, color=YELLOW_TITLE).to_edge(UP)

        line1 = Text("Les nombres strictement supérieurs à 3 sont :", font_size=30)
        nums = MathTex(r"4,\ 5,\ 6", font_size=54, color=BLUE)
        line2 = Text("Il y a donc 3 cas favorables sur 6.", font_size=30)

        result = MathTex(
            r"P(\text{ nombre } > 3)",
            r"=",
            r"\frac{3}{6}",
            r"=",
            r"\frac{1}{2}",
            font_size=48,
            color=GREEN,
        )

        group = VGroup(line1, nums, line2, result).arrange(DOWN, buff=0.45)

        self.add_mascotte()
        self.play(Write(title))
        self.play(Write(line1))
        self.play(Write(nums))
        self.play(Write(line2))
        self.play(Write(result))
        self.wait(2)

    def ecran_conclusion(self):
        self.clear()
        title = Text("À retenir", font_size=46, color=YELLOW_TITLE).to_edge(UP)

        recap = VGroup(
            Text("1. Je liste les issues possibles.", font_size=30),
            Text("2. Je compte les cas favorables.", font_size=30),
            Text("3. Je fais favorables / possibles.", font_size=30),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.45).move_to(ORIGIN)

        signature = Text("EleveAI — Comprendre, s’entraîner, réussir", font_size=26, color=GREEN)
        signature.to_edge(DOWN)

        self.add_mascotte()
        self.play(Write(title))
        self.play(LaggedStart(*[Write(r) for r in recap], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2)

    def construct(self):
        self.ecran_accueil()
        self.ecran_vocabulaire()
        self.ecran_equiprobabilite()
        self.ecran_formule()
        self.ecran_exemples()
        self.ecran_erreurs()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()