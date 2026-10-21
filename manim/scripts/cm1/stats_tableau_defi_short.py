# stats_tableau_defi_short.py
# EleveAI — Maths CM1 / CM2 — short jumeau de la série « Statistiques »,
# épisode 04 : défi avec un tableau. CEINTURE ORANGE (un cran sous la
# paysage verte). Il AMUSE : « 1 200 adultes en trois jours. Où sont passés
# ceux du dimanche ? »
#   · en HAUT, au-dessus de chaque colonne, une colonne de public haute comme
#     l'effectif ; le vendredi et le samedi s'empilent contre la colonne du
#     TOTAL : le trou qui reste, ce sont ceux du dimanche, qui y retournent ;
#   · en BAS, EN MÊME TEMPS, la ligne du tableau du coach se remplit ;
#   · fin : les enfants (500, 150, 220), la case du dimanche « ? »,
#     « Réponds en commentaire ! ».
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au mot où la voix le dit.
#
# Voix : manim/voix/cm-stats-tableau-defi-short.json (débit −10), WAV dans
# public/sons/cm-stats-tableau-defi-short/ ; calage mot à mot :
# manim/scripts/cm1/statscm_tableau_defi_short_marques.json.
# Le short n'affiche aucune classe : rendu UNE fois, copié sous les deux noms.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm1/stats_tableau_defi_short.py StatsTableauDefiShort -o eleveai-maths-cm1-stats-tableau-defi-short --media_dir manim/scripts/cm1/media-tableau-defi-short
# Sorties : manim/sorties/cm1/maths/statistiques/04-tableau-defi/eleveai-maths-cm1-stats-tableau-defi-short.mp4
#           manim/sorties/cm2/maths/statistiques/04-tableau-defi/eleveai-maths-cm2-stats-tableau-defi-short.mp4 (copie)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_tableau_commun import P, BaseTableauShort, allumer, eteindre, remplir, textes_devant  # noqa: E402
from stats_tableau_defi import C_MANQUE, C_SAM, C_VEN  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from canvas_stats import AMBRE, ORANGE_Q, Tableau  # noqa: E402

Y_TXT = 1.98
BASE = -0.2          # le pied des colonnes de public
U = 1.45 / 1200      # hauteur d'une personne
COLS = ["Ven.", "Sam.", "Dim.", "Total"]


def colonne(v, x, couleur, largeur=0.42, y0=BASE):
    """Une colonne de public : un rectangle haut comme v, avec des têtes rondes en haut."""
    h = v * U
    r = Rectangle(width=largeur, height=h, fill_color=couleur, fill_opacity=0.9, stroke_color=WHITE,
                  stroke_width=2).move_to(P(x, y0 + h / 2))
    return r


class StatsTableauDefiShort(BaseTableauShort):
    nom_voix = "cm-stats-tableau-defi-short"
    fichier_marques = "statscm_tableau_defi_short_marques.json"

    def legende(self, s, color=WHITE, fs=36):
        return self.borne(self.t(s, fs, color)).move_to(P(0, Y_TXT))

    def tableau(self, titre):
        tab = Tableau(COLS, [[None] * 4], largeur_case=1.1, hauteur=0.8, fs=30, titre=titre, centre=P(0, -1.4))
        tab.scale_to_fit_width(config.frame_width - 0.3)
        return textes_devant(tab.move_to(P(0, -1.55)))

    def etiquette(self, rect, s, color=WHITE):
        t = self.t(s, 26, color)
        return t.next_to(rect, UP, buff=0.06)

    def empiler(self, xs, b_v, b_s, ven, sam):
        """Copies du vendredi et du samedi empilées contre la colonne du total (non jouées)."""
        x = xs[3] + 0.24
        cv = b_v.copy()
        cs = b_s.copy()
        return cv, cs, [cv.animate.move_to(P(x, BASE + ven * U / 2)),
                        cs.animate.move_to(P(x, BASE + ven * U + sam * U / 2))]

    def trou(self, xs, tot, connu):
        """Le trou au-dessus de la pile : ce qui manque (non joué)."""
        h = (tot - connu) * U
        return Rectangle(width=0.42, height=h, fill_color=C_MANQUE, fill_opacity=0.25, stroke_color=C_MANQUE,
                         stroke_width=5).move_to(P(xs[3] + 0.24, BASE + connu * U + h / 2))

    def construct(self):
        self.margo_bas()
        titre = self.entete_short("Où sont-ils ?", "orange")
        tab = self.tableau("Adultes")
        xs = [tab.case(0, c).get_center()[0] for c in range(4)]
        sol = Line(P(-2.1, BASE), P(2.1, BASE), color=GREY_B, stroke_width=4)

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        fest = self.legende("Festival de maloya", "#f472b6", 40)
        self.play(Write(titre), FadeIn(tab, shift=UP * 0.2), Create(sol), FadeIn(fest, shift=UP * 0.2), run_time=0.6)
        self.au_mot("1 200 adultes")
        b_tot = colonne(1200, xs[3] - 0.24, "#16a34a")
        e_tot = self.t("1 200", 26).next_to(b_tot, LEFT, buff=0.08).align_to(b_tot, UP)
        self.play(GrowFromEdge(b_tot, DOWN), FadeIn(e_tot), remplir(tab, 0, 3, 1200), *allumer(tab, 0, 3),
                  run_time=0.6)
        self.au_mot("Où sont passés")
        q = self.legende("Et ceux du dimanche ?", ORANGE_RETENUE, 36)
        pq = self.t("?", 60, ORANGE_RETENUE).move_to(P(xs[2], BASE + 0.45))
        self.play(FadeOut(fest, shift=UP * 0.2), FadeIn(q, shift=UP * 0.2), FadeIn(pq, scale=0.4),
                  remplir(tab, 0, 2, "?"), *allumer(tab, 0, 2, anneau=ORANGE_Q), run_time=0.45)
        self.insister(pq, 1.3)
        self.attendre_voix(marge=0.1)

        # ── 01 : 350 + 480 = 830, il en manque 370 ──
        self.dire("01-image")
        b_v, b_s = colonne(350, xs[0], C_VEN), colonne(480, xs[1], C_SAM)
        self.au_mot("350")
        self.play(FadeOut(q), GrowFromEdge(b_v, DOWN), remplir(tab, 0, 0, 350), *eteindre(tab), run_time=0.4)
        self.au_mot("480")
        self.play(GrowFromEdge(b_s, DOWN), remplir(tab, 0, 1, 480), run_time=0.4)
        self.au_mot("Ensemble")
        cv, cs, anims = self.empiler(xs, b_v, b_s, 350, 480)
        self.play(anims[0], run_time=0.4)
        self.play(anims[1], run_time=0.4)
        self.au_mot("830")
        ens = self.legende("Ensemble : 830", WHITE, 40)
        self.play(FadeIn(ens, shift=UP * 0.2), run_time=0.3)
        self.au_mot("370")
        tr = self.trou(xs, 1200, 830)
        e370 = self.t("370", 30, C_MANQUE).set_stroke(BLACK, 4, background=True).next_to(tr, UP, buff=0.06)
        man = self.legende("Il en manque 370", C_MANQUE, 40)
        self.play(FadeIn(tr), FadeIn(e370, scale=1.5), FadeOut(ens, shift=UP * 0.2), FadeIn(man, shift=UP * 0.2),
                  run_time=0.4)
        self.insister(e370, 1.3)
        self.au_mot("ceux du dimanche")
        b_d = colonne(370, xs[2], C_MANQUE)
        self.play(FadeOut(pq), ReplacementTransform(tr.copy(), b_d), e370.animate.next_to(b_d, UP, buff=0.06),
                  remplir(tab, 0, 2, 370), *allumer(tab, 0, 2), run_time=0.6)
        dim = self.legende("Ceux du dimanche !", VERT_OK, 40)
        self.play(FadeOut(man, shift=UP * 0.2), FadeIn(dim, scale=0.7), run_time=0.3)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question, les enfants ──
        self.dire("02-question")
        self.au_mot("Et les enfants")
        tab2 = self.tableau("Enfants")
        self.play(FadeOut(VGroup(b_tot, e_tot, b_v, b_s, cv, cs, tr, b_d, e370, dim)), FadeOut(tab), FadeIn(tab2),
                  run_time=0.4)
        self.au_mot("500 en tout")
        t_tot = colonne(500, xs[3] - 0.24, "#16a34a")
        t_e = self.t("500", 26).next_to(t_tot, LEFT, buff=0.08).align_to(t_tot, UP)
        self.play(GrowFromEdge(t_tot, DOWN), FadeIn(t_e), remplir(tab2, 0, 3, 500), *allumer(tab2, 0, 3),
                  run_time=0.45)
        v2, s2 = colonne(150, xs[0], C_VEN), colonne(220, xs[1], C_SAM)
        self.au_mot("150 le")
        self.play(GrowFromEdge(v2, DOWN), remplir(tab2, 0, 0, 150), *eteindre(tab2), run_time=0.4)
        self.au_mot("220 le")
        self.play(GrowFromEdge(s2, DOWN), remplir(tab2, 0, 1, 220), run_time=0.4)
        self.au_mot("Combien le dimanche")
        cv2, cs2, anims = self.empiler(xs, v2, s2, 150, 220)
        self.play(*anims, run_time=0.5)
        tr2 = self.trou(xs, 500, 370)
        pq2 = self.t("?", 44, C_MANQUE).set_stroke(BLACK, 4, background=True).next_to(tr2, UP, buff=0.06)
        cb = self.legende("Combien le dimanche ?", ORANGE_RETENUE, 36)
        self.play(FadeIn(tr2), FadeIn(pq2, scale=1.5), FadeIn(cb, shift=UP * 0.2), remplir(tab2, 0, 2, "?"),
                  *allumer(tab2, 0, 2, anneau=ORANGE_Q), run_time=0.45)
        self.insister(pq2, 1.4)
        self.au_mot("Réponds en commentaire")
        appel = self.legende("Réponds en commentaire !", VERT_OK, 32)
        self.play(FadeOut(cb, shift=UP * 0.2), FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
