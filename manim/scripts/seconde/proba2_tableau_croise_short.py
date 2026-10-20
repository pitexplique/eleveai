# proba2_tableau_croise_short.py
# EleveAI — Maths 2de — short jumeau de la série « Probabilités », épisode 11 :
# le tableau croisé. CEINTURE ORANGE. Il AMUSE : « 25 % des barquettes de
# Saint-André sont abîmées… donc 25 % des abîmées viennent de Saint-André ? »
# — Non !
#   · en HAUT les barquettes de letchis (une sur quatre s'abîme), puis le
#     TABLEAU CROISÉ du coach (tableau_donnees) : la ligne s'allume, puis la
#     colonne, 30 et 50 se posent dans leurs cases quand la voix les dit ;
#   · en BAS, EN MÊME TEMPS, les maths : « 25 % des abîmées ? » barré,
#     30/50 = 60 %, puis 25 % ≠ 60 % ;
#   · fin : la case de Saint-Paul porte « ? », « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/seconde-proba-tableau-croise-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/seconde/proba2_tableau_croise_short.py ShortProba2TableauCroise -o eleveai-maths-seconde-proba-tableau-croise-short --media_dir manim/scripts/seconde/media
# Puis copier le mp4 dans manim/sorties/seconde/maths/probabilites/11-tableau-croise/.

import importlib.util
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

# ⛔ Les helpers de la paysage, chargés par CHEMIN EXACT (des modules de même
# nom existent dans d'autres dossiers).
_spec = importlib.util.spec_from_file_location(
    "proba2_tableau_croise_paysage", Path(__file__).resolve().parent / "proba2_tableau_croise.py")
_pa = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_pa)
P, TableauCroise, frac, barquette = _pa.P, _pa.TableauCroise, _pa.frac, _pa.barquette
COUL_LIG, COUL_COL, ABIME, ABIME_TXT = _pa.COUL_LIG, _pa.COUL_COL, _pa.ABIME, _pa.ABIME_TXT
VALEURS_SHORT = [[30, None, None], [None, None, None], [50, None, None]]   # seuls 30 et 50 sont dits

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

C_TAB = P(0, 0.2)


class ShortProba2TableauCroise(Short6e):
    nom_voix = "seconde-proba-tableau-croise-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=4.1):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def ligne(self, morceaux, font_size=30, buff=0.15, largeur=3.95):
        g = VGroup(*[m if isinstance(m, Mobject) else Text(m, font_size=font_size, color=c)
                     for m, c in morceaux]).arrange(RIGHT, buff=buff)
        if g.width > largeur:
            g.scale_to_fit_width(largeur)
        return g

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def barrer(self, mob, sw=6):
        return Line(mob.get_corner(DL) + P(-0.06, -0.03), mob.get_corner(UR) + P(0.06, 0.03),
                    stroke_width=sw, color=ROUGE_ERREUR)

    def tableau(self):
        tb = TableauCroise(valeurs=VALEURS_SHORT, larg_lab=1.3, larg=0.95, h=0.47, h_ent=0.42, fs=15)
        tb.move_to(C_TAB)
        return tb

    def cadre_ligne(self, tb, i):
        return SurroundingRectangle(tb.ligne_rect(i), color=COUL_LIG, buff=0.03, stroke_width=5)

    def cadre_colonne(self, tb, j):
        return SurroundingRectangle(tb.colonne_rect(j), color=COUL_COL, buff=0.03, stroke_width=5)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Ligne ou colonne ?", font_size=44, color=JAUNE_TITRE).move_to(P(0, 3.3))
        badge = echelle_ceintures("orange").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        bqs = VGroup(*[barquette(0.72) for _ in range(4)]).arrange(RIGHT, buff=0.22).move_to(P(0, 1.55))
        tb = self.tableau()
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2),
                  LaggedStart(*[FadeIn(b, shift=DOWN * 0.6) for b in bqs], lag_ratio=0.2), run_time=0.7)
        self.play(FadeIn(tb.fonds), FadeIn(tb.textes), run_time=0.35)
        self.au_mot("de Saint-André")
        cl = self.cadre_ligne(tb, 0)
        self.play(*tb.etat(lignes=(0,)), Create(cl), run_time=0.35)
        l1 = self.ligne([("Saint-André :", COUL_LIG), ("25 %", WHITE), ("abîmées", ABIME_TXT)], 30)
        l1.move_to(P(0, -1.15))
        self.au_mot("sont abîmées")
        self.play(FadeIn(l1, shift=UP * 0.15), bqs[3][0].animate.set_fill(ABIME), run_time=0.4)
        self.play(Wiggle(bqs[3]), run_time=0.4)
        self.au_mot("Donc 25 %")
        cc = self.cadre_colonne(tb, 0)
        self.play(*tb.etat(colonnes=(0,)), FadeOut(cl), Create(cc), run_time=0.35)
        l2 = self.ligne([("25 %", WHITE), ("des abîmées", ABIME_TXT)], 32)
        l3 = self.ligne([("de Saint-André", COUL_LIG), ("?", ORANGE_RETENUE)], 32)
        l3[1].scale(1.6)
        faux = VGroup(l2, l3).arrange(DOWN, buff=0.12).move_to(P(0, -2.05))
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.3)
        self.au_mot("viennent de Saint-André")
        self.play(FadeIn(l3, shift=UP * 0.15), run_time=0.3)
        self.insister(l3[1], 1.4, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : non : la colonne ──
        self.dire("01-image")
        self.au_mot("Non")
        barre = self.barrer(faux)
        self.play(Create(barre), *[Wiggle(b) for b in bqs], run_time=0.4)
        non = self.grand("NON !", font_size=60, color=ROUGE_ERREUR).move_to(P(0, -1.6))
        self.play(FadeOut(VGroup(l1, faux, barre)), FadeIn(non, scale=0.5), run_time=0.3)
        self.au_mot("la colonne des abîmées")
        self.play(FadeOut(non), Indicate(tb.ent[0], color=COUL_COL, scale_factor=1.4), run_time=0.4)
        f = frac(30, 50, 40, WHITE, WHITE, COUL_COL)
        eg = self.t("=", 40)
        r = self.t("60 %", 44, VERT_OK)
        calc = VGroup(f, eg, r).arrange(RIGHT, buff=0.22).move_to(P(0, -1.35))
        self.au_mot("30 sur 50")
        self.play(tb.poser(0, 0), run_time=0.3)
        self.play(TransformFromCopy(tb.val[0][0], f[0]), GrowFromCenter(f[1]), run_time=0.3)
        self.play(tb.poser(2, 0), run_time=0.3)
        self.play(TransformFromCopy(tb.val[2][0], f[2]), run_time=0.3)
        self.au_mot(": 60 %")
        self.play(FadeIn(eg), FadeIn(r, scale=0.5), run_time=0.3)
        self.play(Create(SurroundingRectangle(r, color=VERT_OK, buff=0.1)), run_time=0.2)
        self.insister(r, 1.3, 0.2)
        self.au_mot("Ligne ou colonne")
        cl = self.cadre_ligne(tb, 0)
        self.play(Create(cl), *tb.etat(lignes=(0,), colonnes=(0,)), run_time=0.35)
        cmp = self.ligne([("25 %", COUL_LIG), ("≠", ROUGE_ERREUR), ("60 %", COUL_COL)], 46, 0.3)
        cmp.move_to(P(0, -2.38))
        self.play(FadeIn(cmp, scale=0.6), run_time=0.35)
        self.insister(cmp[1], 1.5, 0.2)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge, bqs)
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.3))
        tb = self.tableau()
        tb.posees = {(0, 0), (2, 0)}
        self.play(Write(toi), FadeIn(tb.visibles()), run_time=0.5)
        self.au_mot("barquettes abîmées")
        self.play(*tb.etat(colonnes=(0,)), Create(self.cadre_colonne(tb, 0)), run_time=0.4)
        self.au_mot("Saint-Paul")
        q_case = self.t("?", 30, ORANGE_RETENUE).move_to(tb.case(1, 0)).set_z_index(4)
        self.play(Indicate(tb.lab[1], color=COUL_COL, scale_factor=1.4), FadeIn(q_case, scale=0.4), run_time=0.45)
        q = self.ligne([("Abîmées :", ABIME_TXT), ("part de", WHITE), ("Saint-Paul", COUL_COL), ("?", ORANGE_RETENUE)], 30)
        q[3].scale(1.5)
        q.move_to(P(0, -1.25))
        self.play(FadeIn(q, scale=0.6), run_time=0.35)
        self.insister(q_case, 1.8, 0.2)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=42, color=VERT_OK),
                       self.grand("commentaire !", font_size=42, color=VERT_OK)).arrange(DOWN, buff=0.08)
        appel.move_to(P(0, -2.3))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
