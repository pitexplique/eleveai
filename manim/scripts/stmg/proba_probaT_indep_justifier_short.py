# proba_probaT_indep_justifier_short.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — short jumeau de
# « Prouver que deux événements sont indépendants… ou pas ».
# CEINTURE JAUNE. Il AMUSE : avoir un chat, ça rend meilleur en maths ?
#   · en HAUT : la classe de 20 élèves (20 bonshommes), les livres de maths,
#     les chats ; puis la BALANCE : 0,1 d'un côté, 0,5 × 0,2 de l'autre… elle
#     s'équilibre (vert) ; enfin un chat VEXÉ (« Désolé pour les chats ») ;
#   · en BAS, EN MÊME TEMPS : 10 → 0,5 ; 4 → 0,2 ; 2 → 0,1 ; « Égal ! » ;
#   · fin : la question (0,5 ; 0,2 ; 0,15) et « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne ni de classe à l'écran :
# UN seul rendu, copié dans les dossiers STMG et 1re.
#
# Voix : manim/voix/stmg-premiere-proba-indep-justifier-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaT_indep_justifier_short.py ShortIndepJustifier -o eleveai-maths-stmg-proba-indep-justifier-short --media_dir manim/scripts/stmg/media-probaT_indep_justifier
# Puis copier le mp4 dans manim/sorties/stmg/maths/probabilites/15-indep-justifier/ et, sous le nom
# eleveai-maths-premiere-commun-proba-indep-justifier-short.mp4, dans manim/sorties/premiere-commun/maths/probabilites/15-indep-justifier/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_probaT_indep_justifier import Balance, P  # noqa: E402  (pose les chemins)
from proba_pc_conditionnelle_short import joueur  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
ELEVE = "#94A3B8"
ROUX = "#F59E0B"
BLEU_LIVRE = "#2563EB"
MATHS = (0, 1, 2, 3, 4, 5, 6, 7, 8, 9)      # les 10 qui aiment les maths (2 premières rangées)
CHATS = (3, 7, 12, 16)                       # les 4 qui ont un chat : 3 et 7 font les deux


def chat(s=1.0, couleur=ROUX, vexe=False):
    """Un chat assis, de face. `vexe` : yeux fermés en colère, bouche boudeuse."""
    corps = Ellipse(width=0.9, height=1.0, fill_color=couleur, fill_opacity=1, stroke_color=WHITE,
                    stroke_width=2).move_to(P(0, -0.35))
    queue = Arc(radius=0.35, start_angle=-PI / 2, angle=PI * 0.9, stroke_color=couleur, stroke_width=9)
    queue.move_to(P(0.55, -0.45))
    tete = Circle(radius=0.38, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    tete.move_to(P(0, 0.42))
    oreilles = VGroup(*[Polygon(P(sx * 0.1, 0.7), P(sx * 0.36, 0.62), P(sx * 0.3, 0.98), fill_color=couleur,
                                fill_opacity=1, stroke_color=WHITE, stroke_width=2) for sx in (-1, 1)])
    if vexe:
        yeux = VGroup(Line(P(-0.24, 0.53), P(-0.06, 0.47)), Line(P(0.06, 0.47), P(0.24, 0.53)))
        yeux.set_stroke(BLACK, 4)
        bouche = Arc(radius=0.1, start_angle=PI / 6, angle=PI * 2 / 3, stroke_color=BLACK, stroke_width=3)
        bouche.move_to(P(0, 0.25))
    else:
        yeux = VGroup(*[Dot(P(sx * 0.14, 0.5), radius=0.055, color=BLACK) for sx in (-1, 1)])
        bouche = Arc(radius=0.08, start_angle=PI + PI / 6, angle=PI * 2 / 3, stroke_color=BLACK, stroke_width=3)
        bouche.move_to(P(0, 0.3))
    nez = Triangle(fill_color="#F472B6", fill_opacity=1, stroke_width=0).scale(0.05).rotate(PI).move_to(P(0, 0.38))
    moust = VGroup(*[Line(P(sx * 0.12, 0.36 + dy), P(sx * 0.45, 0.4 + dy * 2.2), stroke_color=WHITE, stroke_width=1.5)
                     for sx in (-1, 1) for dy in (-0.04, 0.02)])
    return VGroup(queue, corps, tete, oreilles, yeux, nez, bouche, moust).scale(s)


def livre(s=1.0):
    """Un livre de maths : couverture bleue, « + × »."""
    couv = RoundedRectangle(width=0.7, height=0.9, corner_radius=0.06, fill_color=BLEU_LIVRE, fill_opacity=1,
                            stroke_color=WHITE, stroke_width=2)
    dos = Rectangle(width=0.1, height=0.9, fill_color="#1E3A8A", fill_opacity=1, stroke_width=0)
    dos.align_to(couv, LEFT)
    signes = Text("+ ×", font_size=26, color=WHITE, weight=BOLD).move_to(couv).shift(RIGHT * 0.04)
    return VGroup(couv, dos, signes).scale(s)


class ShortIndepJustifier(Short6e):
    nom_voix = "stmg-premiere-proba-indep-justifier-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def classe(self):
        """20 élèves, 4 rangées de 5."""
        eleves = VGroup(*[joueur(c, 1.15) for c in ["#94A3B8", "#A78BFA", "#F472B6", "#5EEAD4"] * 5])
        for k, e in enumerate(eleves):
            e.move_to(P(-1.6 + 0.8 * (k % 5), 2.15 - 0.78 * (k // 5)))
        return eleves

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : un chat, un livre de maths… et 20 élèves ──
        self.dire("00-accroche")
        titre = self.grand("Chat et maths ?", font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.55))
        minou = chat(1.0).move_to(P(-1.15, 0.95))
        bouquin = livre(1.1).move_to(P(1.2, 0.95))
        q = self.t("?", 80, JAUNE_TITRE).move_to(P(0.05, 1.0))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(minou, shift=RIGHT * 0.5), run_time=0.8)
        self.au_mot("meilleur en maths")
        phrase = self.t("Un chat, meilleur en maths ?", 30).move_to(P(0, -0.45))
        self.play(FadeIn(bouquin, shift=LEFT * 0.5), GrowFromCenter(q), FadeIn(phrase, shift=UP * 0.15), run_time=0.6)
        self.play(minou.animate.shift(UP * 0.25), rate_func=there_and_back, run_time=0.35)
        self.play(Wiggle(q), run_time=0.5)
        self.au_mot("20 élèves")
        eleves = self.classe()
        n20 = self.grand("20 élèves", font_size=50).move_to(P(0, -1.2))
        self.play(FadeOut(VGroup(minou, bouquin, q, phrase), scale=0.6), FadeOut(badge),
                  LaggedStart(*[FadeIn(e, shift=DOWN * 0.3) for e in eleves], lag_ratio=0.04),
                  FadeIn(n20, scale=0.6), run_time=1.0)
        self.au_mot("on a compté")
        self.play(LaggedStart(*[Indicate(e, color=JAUNE_TITRE, scale_factor=1.25) for e in eleves], lag_ratio=0.05),
                  run_time=1.0)
        self.attendre_voix(marge=0.1)

        # ── 01 : livres, chats, les deux ; la balance ; le chat vexé ──
        self.dire("01-image")
        self.play(FadeOut(n20), run_time=0.3)
        ys = [-1.05, -1.55, -2.05]
        livres = VGroup(*[livre(0.33).next_to(eleves[k], RIGHT, buff=0.05).shift(DOWN * 0.08) for k in MATHS])
        self.au_mot("10 aiment")
        l1 = VGroup(self.t("10 aiment les maths", 30, "#60A5FA"), self.t(": 0,5", 34, VERT_OK)).arrange(RIGHT, buff=0.15)
        k_bas = min(1.0, LARGEUR_MAX / l1.width)
        l1.scale(k_bas).move_to(P(0, ys[0]))
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.3) for b in livres], lag_ratio=0.06),
                  FadeIn(l1[0], shift=UP * 0.1), run_time=0.8)
        self.au_mot("0,5. 4")
        self.play(FadeIn(l1[1], scale=0.6), run_time=0.3)
        chats = VGroup(*[chat(0.27).next_to(eleves[k], LEFT, buff=0.0).align_to(eleves[k], DOWN) for k in CHATS])
        self.au_mot("4 ont un chat")
        l2 = VGroup(self.t("4 ont un chat", 30, ROUX), self.t(": 0,2", 34, VERT_OK)).arrange(RIGHT, buff=0.15)
        l2.scale(k_bas).move_to(P(0, ys[1]))
        self.play(LaggedStart(*[FadeIn(c, scale=0.3) for c in chats], lag_ratio=0.15), FadeIn(l2[0], shift=UP * 0.1),
                  run_time=0.7)
        self.au_mot("0,2. 2")
        self.play(FadeIn(l2[1], scale=0.6), run_time=0.3)
        self.au_mot("2 font les deux")
        ronds = VGroup(*[SurroundingRectangle(VGroup(eleves[k], livres[MATHS.index(k)], chats[CHATS.index(k)]),
                                              color=JAUNE_TITRE, buff=0.05, stroke_width=4, corner_radius=0.1)
                         for k in (3, 7)])
        l3 = VGroup(self.t("2 font les deux", 30, JAUNE_TITRE), self.t(": 0,1", 34, VERT_OK)).arrange(RIGHT, buff=0.15)
        l3.scale(k_bas).move_to(P(0, ys[2]))
        self.play(Create(ronds), FadeIn(l3[0], shift=UP * 0.1), run_time=0.6)
        self.au_mot("0,1. Et")
        self.play(FadeIn(l3[1], scale=0.6), run_time=0.3)
        # la balance : 0,1 à gauche, 0,5 × 0,2 à droite
        self.au_mot("Et 0,5 fois 0,2")
        bal = Balance(P(0, 0.95), demi=1.15, larg=1.75, h_pied=0.8, poteau=0.3, ep=6)
        gauche = bal.poser(VGroup(self.t("0,1", 44, VERT_OK)), "g")
        droite = bal.poser(VGroup(self.t("0,5 × 0,2", 26)), "d")
        res = self.t("0,1", 44, VERT_OK)
        self.play(FadeOut(VGroup(eleves, livres, chats, ronds), scale=0.8), FadeIn(bal.mob), run_time=0.5)
        bal.caler()
        self.play(TransformFromCopy(l3[1][-3:], gauche[0]), TransformFromCopy(VGroup(l1[1][-3:], l2[1][-3:]), droite[0]),
                  run_time=0.6)
        self.play(bal.ang.animate.set_value(-0.2), run_time=0.5)
        self.au_mot("égale 0,1")
        res.move_to(droite[0])
        droite[0].clear_updaters()
        self.play(Transform(droite[0], res), run_time=0.4)
        bal.poser(VGroup(droite[0]), "d")
        self.play(bal.ang.animate.set_value(0.0), run_time=0.8, rate_func=rate_functions.ease_out_back)
        self.au_mot("Égal !")
        bal.coul = VERT_OK
        egal = self.t("=", 64, VERT_OK).move_to(P(0, gauche.get_center()[1]))
        bas_egal = self.grand("Égal !", font_size=50, color=VERT_OK).move_to(P(0, -0.95))
        self.play(FadeOut(VGroup(l1, l2, l3), shift=DOWN * 0.2), GrowFromCenter(egal), FadeIn(bas_egal, scale=0.5),
                  run_time=0.5)
        self.insister(bas_egal, 1.25)
        self.au_mot("Chat et maths sont")
        indep = VGroup(self.t("Chat et maths :", 30), self.t("indépendants", 34, VERT_OK)).arrange(RIGHT, buff=0.15)
        indep.scale_to_fit_width(min(indep.width, LARGEUR_MAX)).move_to(P(0, -1.75))
        self.play(FadeIn(indep, shift=UP * 0.15), run_time=0.5)
        self.au_mot("Désolé pour les chats")
        vexe = chat(1.1, vexe=True).move_to(P(0, 1.0))
        self.play(FadeOut(VGroup(bal.mob, gauche, droite, egal)), FadeOut(bas_egal), indep.animate.move_to(P(0, -0.85)),
                  FadeIn(vexe, scale=0.5), run_time=0.5)
        desole = self.t("Désolé pour les chats", 32, ROUX).move_to(P(0, -1.75))
        self.play(FadeIn(desole, shift=UP * 0.1), vexe.animate.rotate(0.12), run_time=0.3)
        self.play(vexe.animate.rotate(-0.24), run_time=0.25)
        self.play(vexe.animate.rotate(0.12), run_time=0.2)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question : une autre classe ──
        self.dire("02-question")
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(ReplacementTransform(titre, toi), FadeOut(VGroup(indep, desole), shift=DOWN * 0.3),
                  FadeOut(vexe, scale=0.5), run_time=0.5)
        donnees = [("P de maths", "P(maths) = 0,5"), ("P de chat", "P(chat) = 0,2"), ("P des deux", "P(les deux) = 0,15")]
        lignes = VGroup(*[self.t(txt, 34) for _, txt in donnees]).arrange(DOWN, buff=0.3, aligned_edge=LEFT)
        lignes.move_to(P(0, 1.2))
        self.au_mot("Dans une autre classe")
        autre = self.t("Une autre classe", 32, BLEU_CALCUL).move_to(P(0, 2.55))
        self.play(FadeIn(autre, shift=DOWN * 0.15), run_time=0.4)
        for (mot, _), l in zip(donnees, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l, shift=RIGHT * 0.2), run_time=0.4)
        self.insister(lignes[2], 1.15)
        self.au_mot("Indépendants ou pas")
        q2 = self.t("Indépendants ou pas ?", 36, JAUNE_TITRE).move_to(P(0, -0.45))
        self.play(FadeIn(q2, scale=0.7), run_time=0.6)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 44, VERT_OK), self.t("commentaire !", 44, VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -1.6))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)
