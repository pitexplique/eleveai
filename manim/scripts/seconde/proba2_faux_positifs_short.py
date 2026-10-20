# proba2_faux_positifs_short.py
# EleveAI — Maths 2de — short jumeau de la série « Probabilités », épisode 12 :
# les faux positifs. CEINTURE ORANGE. Il AMUSE : « le portique sonne : 99 % de
# chances que ce soit grave ? » — Non : environ 1 sur 6 !
#   · en HAUT le portique de l'aéroport, un bagage interdit qui le fait sonner ;
#     puis six alertes dont une seule vraie ; puis la foule des bagages, dont
#     5 % des normaux s'allument (fausses alertes) ;
#   · en BAS, EN MÊME TEMPS, les maths : 99 % ? barré, ≈ 1 sur 6, 5 % ;
#   · fin : l'ARBRE du coach (I / Ī → S / S̄, 99 % et 5 %) : 5 % → 1 % ?
#     « mieux ou pire ? », « Réponds en commentaire ! ».
# ⛔ PAS D'ÉCART : seuls les nombres dits s'écrivent (99 %, 1 sur 6, 5 %, 1 %).
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/seconde-proba-faux-positifs-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/seconde/proba2_faux_positifs_short.py ShortProba2FauxPositifs -o eleveai-maths-seconde-proba-faux-positifs-short --media_dir manim/scripts/seconde/media
# Puis copier le mp4 dans manim/sorties/seconde/maths/probabilites/12-faux-positifs/.

import importlib.util
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

# ⛔ Les helpers de la paysage, chargés par CHEMIN EXACT (des modules de même
# nom existent dans d'autres dossiers).
_spec = importlib.util.spec_from_file_location(
    "proba2_faux_positifs_paysage", Path(__file__).resolve().parent / "proba2_faux_positifs.py")
_pa = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_pa)
P, ArbreIS, portique, ondes, tapis, valise = _pa.P, _pa.ArbreIS, _pa.portique, _pa.ondes, _pa.tapis, _pa.valise
CHEMIN, CHEMIN2, VALISE_I, VOYANT_OFF, DEUX = _pa.CHEMIN, _pa.CHEMIN2, _pa.VALISE_I, _pa.VOYANT_OFF, _pa.DEUX

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

# Dans le short, l'arbre ne porte que les nombres DITS : 99 % et 5 %.
VALEURS_SHORT = {("I", "S"): "99 %", ("nI", "S"): "5 %"}


class ShortProba2FauxPositifs(Short6e):
    nom_voix = "seconde-proba-faux-positifs-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=4.1):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def barrer(self, mob, sw=6):
        return Line(mob.get_corner(DL) + P(-0.06, -0.03), mob.get_corner(UR) + P(0.06, 0.03),
                    stroke_width=sw, color=ROUGE_ERREUR)

    def bip(self, port, color=ROUGE_ERREUR, run_time=0.3):
        v = port[3]
        o = ondes(v.get_center(), color, r=0.28 * port.height / 1.95)
        self.play(v.animate.set_fill(color), FadeIn(o, scale=0.5), run_time=run_time)
        return o

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Il sonne !", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.25))
        badge = echelle_ceintures("orange").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        tp = tapis(4.0).move_to(P(0, -0.3))
        port = portique(1.0).move_to(P(0, 0.75))
        vi = valise(True, 0.75).move_to(P(-1.6, 0.0))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(tp), FadeIn(port), FadeIn(vi), run_time=0.6)
        self.au_mot("détecte 99 %")
        self.play(vi.animate.move_to(P(0, 0.0)), run_time=0.5)
        o = self.bip(port)
        l1 = self.t("détecte 99 %", 44, WHITE).move_to(P(0, -0.95))
        l1b = self.t("des objets interdits", 28, VALISE_I).next_to(l1, DOWN, buff=0.12)
        self.play(FadeIn(l1, scale=0.6), FadeIn(l1b), run_time=0.4)
        self.insister(l1, 1.2, 0.2)
        self.au_mot("Il sonne")
        vn = valise(False, 0.75).move_to(P(-1.6, 0.0))
        self.play(vi.animate.move_to(P(1.6, 0.0)), FadeOut(o), port[3].animate.set_fill(VOYANT_OFF), run_time=0.4)
        self.play(FadeOut(vi), FadeIn(vn), run_time=0.2)
        self.play(vn.animate.move_to(P(0, 0.0)), run_time=0.4)
        o = self.bip(port)
        self.play(Flash(port[3], color=ROUGE_ERREUR, line_length=0.25), run_time=0.35)
        self.au_mot("99 % de chances")
        g = VGroup(self.t("99 % grave", 44, ORANGE_RETENUE), self.t("?", 60, ORANGE_RETENUE)).arrange(RIGHT, buff=0.15)
        g.scale_to_fit_width(min(g.width, 4.0)).move_to(P(0, -2.25))
        self.play(FadeIn(g, scale=0.6), run_time=0.35)
        self.insister(g[1], 1.5, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : non : 1 sur 6 ──
        self.dire("01-image")
        self.au_mot("Non")
        barre = self.barrer(g[0])
        self.play(Create(barre), run_time=0.25)
        non = self.grand("NON !", font_size=56, color=ROUGE_ERREUR).move_to(P(0, -1.1))
        self.play(FadeOut(VGroup(l1, l1b)), FadeIn(non, scale=0.5), run_time=0.3)
        self.au_mot("environ 1 sur 6")
        six = VGroup(*[valise(k == 0, 0.5) for k in range(6)]).arrange(RIGHT, buff=0.12).move_to(P(0, 0.0))
        self.play(FadeOut(VGroup(vn, tp, port, o)), FadeIn(six, lag_ratio=0.15), run_time=0.45)
        r = VGroup(self.t("≈", 50, WHITE), self.t("1 sur 6 !", 54, VERT_OK)).arrange(RIGHT, buff=0.2)
        r.scale_to_fit_width(min(r.width, 4.0)).move_to(P(0, -1.1))
        self.play(FadeOut(VGroup(non, g, barre)), FadeIn(r, scale=0.5), Indicate(six[0], color=VALISE_I, scale_factor=1.5),
                  run_time=0.45)
        self.insister(r[1], 1.25, 0.2)
        self.au_mot("Les bagages normaux")
        grille = VGroup(*[valise(k == 33, 0.27) for k in range(100)])
        grille.arrange_in_grid(rows=10, cols=10, buff=(0.07, 0.06)).move_to(P(0, 0.25))
        self.play(FadeOut(six), LaggedStart(*[FadeIn(v, scale=0.6) for v in grille], lag_ratio=0.005),
                  r.animate.move_to(P(0, -1.6)), run_time=0.7)
        self.au_mot("5 %")
        allumees = [grille[k] for k in (7, 26, 48, 71, 89)]
        cinq = VGroup(self.t("5 %", 44, ORANGE_RETENUE), self.t("fausses alertes", 28, ORANGE_RETENUE)).arrange(DOWN, buff=0.08)
        cinq.move_to(P(0, -2.45))
        self.play(*[v[1].animate.set_fill(ORANGE_RETENUE) for v in allumees], FadeIn(cinq, scale=0.6), run_time=0.4)
        self.play(*[Flash(v, color=ORANGE_RETENUE, line_length=0.12) for v in allumees], run_time=0.4)
        self.au_mot("l'emportent")
        self.play(Indicate(grille[33], color=VALISE_I, scale_factor=1.8),
                  *[Indicate(v, color=ORANGE_RETENUE, scale_factor=1.4) for v in allumees], run_time=0.6)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.25))
        a = ArbreIS(dx=1.15, pas=0.42, fs=22, fs_p=19, centre=P(0, 0.35), fs_titre=15, valeurs=VALEURS_SHORT)
        a.complet()
        self.play(Write(toi), FadeIn(a), run_time=0.5)
        self.au_mot("1 % des bagages normaux")
        f = ("nI", "S")
        self.play(*a.etat(a.chemin(f), DEUX), run_time=0.35)
        b5 = self.barrer(a.nombres[f], sw=5)
        un = self.t("1 %", 26, ORANGE_RETENUE).next_to(a.nombres[f], UP, buff=0.08)
        self.play(Create(b5), run_time=0.25)
        self.play(FadeIn(un, scale=0.5), run_time=0.3)
        self.insister(un, 1.5, 0.2)
        self.au_mot("mieux ou pire")
        q = VGroup(self.t("mieux ou pire", 40, WHITE), self.t("?", 60, ORANGE_RETENUE)).arrange(RIGHT, buff=0.15)
        q.scale_to_fit_width(min(q.width, 4.0)).move_to(P(0, -1.5))
        self.play(FadeIn(q, scale=0.6), run_time=0.35)
        self.insister(q[1], 1.5, 0.2)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=42, color=VERT_OK),
                       self.grand("commentaire !", font_size=42, color=VERT_OK)).arrange(DOWN, buff=0.08)
        appel.move_to(P(0, -2.35))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
