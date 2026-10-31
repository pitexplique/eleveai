# prop_echelle_plan_short.py
# EleveAI — Maths 6e ET 4e — short jumeau de l'épisode COMMUN 09 « De la
# réalité vers le plan » (micro echelle_distance_plan, notion prop_echelle).
# CEINTURE BLANCHE (règle du short blanc, REGLES.md) : on VOIT l'échelle.
# Le short n'affiche pas la classe : rendu UNE fois, copié sous les deux noms.
# Il AMUSE : « Un stade de foot entier sur ta feuille ? C'est possible ! »
#   · EN HAUT, l'image qui bouge : le terrain de foot (105 m × 68 m) ; au mot
#     « 21 cm » il RÉTRÉCIT et se pose sur une feuille A4 : il en prend pile
#     la largeur (la surprise) ;
#   · EN BAS, au même instant, le tableau plan (cm) / réalité (m) se remplit
#     (÷ 5 vers le haut) et les deux divisions s'écrivent ;
#   · 1 question-pause (3 s) : la surface de réparation, 40 m → 8 cm ;
#     leurres : 200 cm (40 × 5, l'échelle à l'envers), 35 cm (40 − 5) ;
#   · fin : un terrain de basket de 28 m, combien de cm ? (5,6) en commentaire.
#
# Chiffres RÉELS (vérifiés par WebSearch le 31/10/2026) :
#   · terrain de foot : 105 m × 68 m, dimensions recommandées pour les matchs
#     internationaux (FIFA ; les Lois du jeu IFAB, loi 1, donnent une
#     fourchette 90-120 m × 45-90 m) — d'où « environ » dans la voix ;
#   · surface de réparation : 16,5 m + 7,32 m (but) + 16,5 m = 40,32 m de
#     large (IFAB, loi 1) — « environ 40 m » ;
#   · feuille A4 : 21 cm × 29,7 cm (norme ISO 216) ;
#   · terrain de basket : 28 m × 15 m (règlement FIBA).
# Centres d'intérêt : football.
# Ajouté ICI : terrain_foot(), feuille_a4(), terrain_basket() ; la flèche
# « ÷ 5 » dont l'étiquette passe AU-DESSUS du tableau (cadre étroit, leçon du
# lot 1).
#
# Voix : manim/voix/commun-prop-echelle-plan-short.json (validée, débit −10) ;
# WAV : public/sons/commun-prop-echelle-plan-short/ ; marques :
# manim/scripts/6e/prop_echelle_plan_short_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/6e/prop_echelle_plan_short.py PropEchellePlanShort
# PYTHONIOENCODING=utf-8 python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/prop_echelle_plan_short.py PropEchellePlanShort -o eleveai-maths-6e-prop-echelle-plan-short --media_dir manim/media-prop-09
# Sorties : manim/sorties/6e/maths/proportionnalite/09-echelle-plan/eleveai-maths-6e-prop-echelle-plan-short.mp4
#           manim/sorties/4e/maths/proportionnalite/09-echelle-plan/eleveai-maths-4e-prop-echelle-plan-short.mp4 (copie)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403

BLEU_PL = "#1d4ed8"
VERT_RE = "#4ade80"
X_T = 0.58         # le centre du terrain (un peu à droite : l'accolade « 68 m » à gauche)
Y_T = 1.15


def terrain_foot(l=2.8):
    """Le terrain vu d'en haut, aux vraies proportions (105 × 68) : bandes de
    pelouse, lignes blanches, rond central, surfaces de réparation, buts."""
    k = l / 105
    h = 68 * k
    g = VGroup()
    for i in range(10):
        g.add(Rectangle(width=l / 10, height=h, fill_color="#16a34a" if i % 2 else "#15803d", fill_opacity=1,
                        stroke_width=0).move_to(P(-l / 2 + (i + 0.5) * l / 10, 0)))
    sw = 2.5
    lignes = VGroup(Rectangle(width=l, height=h), Line(P(0, -h / 2), P(0, h / 2)), Circle(radius=9.15 * k))
    for s in (-1, 1):
        lignes.add(Rectangle(width=16.5 * k, height=40.32 * k).move_to(P(s * (l / 2 - 8.25 * k), 0)))
        lignes.add(Rectangle(width=5.5 * k, height=18.32 * k).move_to(P(s * (l / 2 - 2.75 * k), 0)))
    lignes.set_stroke(WHITE, sw)
    buts = VGroup(*[Rectangle(width=0.08, height=7.32 * k * 1.6, fill_color=WHITE, fill_opacity=1, stroke_width=0)
                    .move_to(P(s * (l / 2 + 0.04), 0)) for s in (-1, 1)])
    g.add(lignes, buts, Dot(ORIGIN, radius=0.03, color=WHITE))
    g.surface = lignes[3]
    return g


def feuille_a4(h=2.0):
    """La feuille A4 en portrait, aux vraies proportions (21 × 29,7)."""
    return Rectangle(width=h * 21 / 29.7, height=h, fill_color=WHITE, fill_opacity=1, stroke_color="#94a3b8",
                     stroke_width=3)


def terrain_basket(l=3.0):
    """Le terrain de basket (28 × 15) : parquet, lignes, raquettes, paniers."""
    k = l / 28
    h = 15 * k
    fond = Rectangle(width=l, height=h, fill_color="#d97706", fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    g = VGroup(fond, Line(P(0, -h / 2), P(0, h / 2), color=WHITE, stroke_width=2.5),
               Circle(radius=1.8 * k, color=WHITE, stroke_width=2.5))
    for s in (-1, 1):
        g.add(Rectangle(width=5.8 * k, height=4.9 * k, fill_color="#b91c1c", fill_opacity=1, stroke_color=WHITE,
                        stroke_width=2.5).move_to(P(s * (l / 2 - 2.9 * k), 0)))
        g.add(Arc(radius=6.75 * k, start_angle=PI / 2 if s > 0 else -PI / 2, angle=PI, color=WHITE,
                  stroke_width=2.5).move_arc_center_to(P(s * (l / 2 - 1.575 * k), 0)))
        g.add(Circle(radius=0.06, color="#f97316", stroke_width=3).move_to(P(s * (l / 2 - 1.575 * k), 0)))
    return g


class PropEchellePlanShort(ShortProp):
    nom_voix = "commun-prop-echelle-plan-short"
    fichier_marques = "prop_echelle_plan_short_marques.json"
    ceinture = "blanche"

    def tableau(self):
        return TableauProp(["Plan (cm)", "Réalité (m)"], [[1, 21, 13.6], [5, 105, 68]], montrer=False,
                           largeur_case=0.7, largeur_libelle=1.3, hauteur=0.62, fs=22, marge=0.12,
                           centre=P(-0.22, -1.4))

    def fleche_5(self, tb):
        """La flèche « ÷ 5 » à droite (du bas vers le haut), son étiquette
        AU-DESSUS du tableau (cadre étroit)."""
        fl = tb.fleche_lat("÷ 5", sens="haut", fs=28)
        e = fl.etiquette
        e.move_to(P(min(fl.fleche.get_center()[0], 1.95 - e.width / 2), tb.carte.get_top()[1] + 0.08 + e.height / 2))
        return fl

    def _rep_q(self, sc):
        lg = sc.ligne_rep(0, ["40 ÷", "5 =", "8 cm."])
        for m, mot in zip(lg, ["40 divisé", "5, égale", "8 cm"]):
            sc.au_mot(mot)
            sc.play(FadeIn(m, shift=UP * 0.12), run_time=0.25)
        sc.rep_fini()

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Un stade sur ta feuille", self.ceinture)
        titre.sans_synchro = True  # le titre de la vidéo : posé d'un bloc
        self.add(badge)
        garder = [margo, titre, badge]
        tf = terrain_foot(2.4).move_to(P(X_T, Y_T))
        tf.set_z_index(2)  # toujours AU-DESSUS de la feuille A4
        tb = self.tableau()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au_mot("Un stade")
        self.play(Write(titre), FadeIn(tf, scale=0.7), run_time=0.7)
        q = Text("?", font_size=80, color=ORANGE_RETENUE, weight=BOLD).move_to(P(0, -1.2))
        f0 = feuille_a4(1.6).move_to(P(-0.5, -1.2))
        q.next_to(f0, RIGHT, buff=0.35)
        self.au_mot("sur ta feuille")
        self.play(FadeIn(f0, shift=UP * 0.2), FadeIn(q, scale=1.5), run_time=0.45)
        self.au_mot("possible")
        self.play(Wiggle(q), Indicate(tf, color=VERT_RE, scale_factor=1.05), run_time=0.7)
        self.attendre_voix(marge=0.2)

        # ── 01 : 105 m × 68 m ──
        self.dire("01-terrain")
        self.au_mot("Un terrain")
        self.play(FadeOut(VGroup(f0, q)), FadeIn(tb.fond, shift=UP * 0.2), run_time=0.45)
        ab = Brace(tf, DOWN, color=VERT_RE, buff=0.06)
        l105 = Text("105 m", font_size=26, color=VERT_RE, weight=BOLD).next_to(ab, DOWN, buff=0.04)
        self.au_mot("105 m")
        self.play(GrowFromCenter(ab), FadeIn(l105, scale=1.3), FadeIn(tb.valeur(1, 1), scale=1.4), tb.allumer(1, 1),
                  run_time=0.45)
        al = Brace(tf, LEFT, color=VERT_RE, buff=0.06)
        l68 = Text("68 m", font_size=24, color=VERT_RE, weight=BOLD).next_to(al, LEFT, buff=0.04)
        self.au_mot("68 m")
        self.play(GrowFromCenter(al), FadeIn(l68, scale=1.3), FadeIn(tb.valeur(1, 2), scale=1.4), tb.eteindre(1, 1),
                  tb.allumer(1, 2), run_time=0.45)
        self.play(tb.eteindre(1, 2), run_time=0.25)
        self.attendre_voix(marge=0.2)

        # ── 02 : l'échelle, on divise par 5 ──
        self.dire("02-echelle")
        self.au_mot("1 cm")
        self.play(FadeIn(tb.valeur(0, 0), scale=1.4), tb.allumer(0, 0), run_time=0.4)
        self.au_mot("5 m")
        self.play(FadeIn(tb.valeur(1, 0), scale=1.4), tb.eteindre(0, 0), tb.allumer(1, 0), run_time=0.4)
        fl = self.fleche_5(tb)
        self.au_mot("On divise")
        self.play(Create(fl.fleche), tb.eteindre(1, 0), run_time=0.45)
        self.au_mot("par 5")
        self.play(FadeIn(fl.etiquette, scale=1.4), run_time=0.35)
        self.insister(fl.etiquette, 1.3)
        self.attendre_voix(marge=0.2)

        # ── 03 : 105 ÷ 5 = 21 cm, 68 ÷ 5 = 13,6 cm : le terrain se pose sur la feuille ──
        self.dire("03-calcul")
        L1 = self.ligne([("105 ÷", WHITE), ("5 =", AMBRE), ("21 cm", BLEU_CALCUL)], 32).move_to(P(-0.1, -2.3))
        L2 = self.ligne([("68 ÷", WHITE), ("5 =", AMBRE), ("13,6 cm", BLEU_CALCUL)], 32)
        L2.next_to(L1, DOWN, buff=0.16).align_to(L1, LEFT)
        fa = feuille_a4(2.0).move_to(P(X_T, Y_T))
        petit_w = fa.width
        y_p = fa.get_top()[1] - 0.12 - petit_w * 68 / 105 / 2
        self.au_mot("105 divisé")
        self.play(FadeIn(L1[0], shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("5, égale")
        self.play(FadeIn(L1[1], shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("21 cm")
        self.play(FadeIn(L1[2], scale=1.3), tb.remplir(0, 1, 21), tb.allumer(0, 1),
                  FadeOut(VGroup(ab, l105, al, l68)), FadeIn(fa), run_time=0.4)
        self.play(tf.animate.scale_to_fit_width(petit_w).move_to(P(X_T, y_p)), run_time=0.8)
        self.play(tb.eteindre(0, 1), run_time=0.2)
        self.au_mot("68 divisé")
        self.play(FadeIn(L2[0], shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("5, égale", 2)
        self.play(FadeIn(L2[1], shift=RIGHT * 0.15), run_time=0.3)
        bd = Brace(tf, LEFT, color=BLEU_PL, buff=0.04)
        l136 = Text("13,6 cm", font_size=20, color="#93c5fd", weight=BOLD).next_to(bd, LEFT, buff=0.04)
        self.au_mot("13,6 cm")
        self.play(FadeIn(L2[2], scale=1.3), tb.remplir(0, 2, 13.6), tb.allumer(0, 2), GrowFromCenter(bd),
                  FadeIn(l136, scale=1.3), run_time=0.45)
        self.play(tb.eteindre(0, 2), run_time=0.2)
        self.attendre_voix(marge=0.2)

        # ── 04 : la surprise : 21 cm = la largeur d'une feuille A4 ──
        self.dire("04-surprise")
        bl = Brace(tf, DOWN, color=BLEU_PL, buff=0.04)
        l21 = Text("21 cm", font_size=22, color=BLEU_PL, weight=BOLD).next_to(bl, DOWN, buff=0.03)
        self.au_mot("21 cm")
        self.play(GrowFromCenter(bl), FadeIn(l21, scale=1.3), Indicate(L1[2], color=BLEU_CALCUL), run_time=0.5)
        a4 = Text("A4", font_size=28, color="#94a3b8", weight=BOLD).move_to(P(X_T, fa.get_bottom()[1] + 0.2))
        self.au_mot("feuille A4")
        self.play(FadeIn(a4, scale=1.4), Indicate(fa, color=BLEU_CALCUL, scale_factor=1.06), run_time=0.6)
        self.au_mot("Le stade tient")
        self.play(Circumscribe(fa, color=VERT_OK, buff=0.05), run_time=0.8)
        self.play(Flash(tf, color=VERT_RE, line_length=0.2, num_lines=12, flash_radius=0.9), run_time=0.5)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 05 : la question-pause (3 s) : la surface de réparation ──
        self.question_pause("05-question", "05b-reponse",
                            ["Surface de réparation :", "environ 40 m de large.", "Sur ton dessin ?"],
                            [self.t("8 cm", 30), self.t("200 cm", 30), self.t("35 cm", 30)], 0,
                            ["40 ÷ 5 = 8 cm."], mot_q="La surface", autres_r=self._rep_q)
        self.vider(garder)

        # ── 06 : la question en commentaire : le terrain de basket ──
        self.dire("06-commentaire")
        tbk = terrain_basket(3.0).move_to(P(0, 1.25))
        self.au_mot("Et toi")
        self.play(FadeIn(tbk.copy().set_opacity(0)), run_time=0.2)
        self.au_mot("terrain de basket")
        self.play(FadeIn(tbk, scale=0.8), run_time=0.5)
        bb = Brace(tbk, DOWN, color="#fdba74", buff=0.06)
        l28 = Text("28 m", font_size=28, color="#fdba74", weight=BOLD).next_to(bb, DOWN, buff=0.04)
        qq = self.borne(self.ligne([("28 m", VERT_OK), ("→ ? cm", BLEU_CALCUL)], 42), 0.9).move_to(P(0, -0.55))
        qq[1].sans_synchro = True
        self.au_mot("28 m")
        self.play(GrowFromCenter(bb), FadeIn(l28, scale=1.3), FadeIn(qq[0], scale=1.3), run_time=0.45)
        self.au_mot("Combien")
        self.play(FadeIn(qq[1], shift=RIGHT * 0.2), run_time=0.4)
        self.insister(qq, 1.1)
        self.appel_commentaire(y=-1.5)
