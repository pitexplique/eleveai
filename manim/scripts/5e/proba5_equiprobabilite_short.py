# proba5_equiprobabilite_short.py
# EleveAI — Maths 5e — short jumeau de la série « Probabilités », épisode 3 :
# équiprobable ou non. CEINTURE BLANCHE. Il AMUSE : « une punaise, pointe en
# haut ou pointe en bas : un demi chacune ? »
#   · en HAUT la punaise qui tombe sur la table, puis une pluie de punaises ;
#   · en BAS, EN MÊME TEMPS, les deux issues et « 1/2 ? », barré ; puis deux
#     barres qui montent au fil des lancers, la tête change de camp, et on ne
#     conclut pas (la question est posée au spectateur) ;
#   · fin : « plus souvent pointe en haut ou pointe en bas ? », « Réponds en
#     commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/5e-proba-equiprobabilite-short.json (Julie, débit −8).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/5e/proba5_equiprobabilite_short.py ShortProba5Equiprobabilite -o eleveai-maths-5e-proba-equiprobabilite-short --media_dir manim/scripts/5e/media
# Puis copier le mp4 dans manim/sorties/5e/maths/probabilites/03-equiprobabilite/.

import importlib.util
import random
from pathlib import Path

ICI = Path(__file__).resolve().parent


def _charger(nom, chemin):
    """Charge un module PAR SON CHEMIN EXACT (des homonymes existent ailleurs)."""
    spec = importlib.util.spec_from_file_location(nom, chemin)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_pay = _charger("proba5_equiprobabilite_pay", ICI / "proba5_equiprobabilite.py")  # pose aussi les chemins
P, fraction, punaise, punaise_haut, punaise_bas, table = (
    _pay.P, _pay.fraction, _pay.punaise, _pay.punaise_haut, _pay.punaise_bas, _pay.table)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
SOL = 0.35          # la table, en haut
XH, XB = -1.05, 1.05  # colonne « pointe en haut » / « pointe en bas »


class ShortProba5Equiprobabilite(Short6e):
    nom_voix = "5e-proba-equiprobabilite-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def etiq(self, bas, y, fin="", ecart=0.0):
        """« pointe » / « en haut » sur deux lignes, sous la punaise."""
        x = (XH - ecart) if bas == "haut" else (XB + ecart)
        return VGroup(self.t("pointe", 26, JAUNE_TITRE), self.t("en " + bas + fin, 26, JAUNE_TITRE)
                      ).arrange(DOWN, buff=0.08).move_to(P(x, y))

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def construct(self):
        self.margo_bas()
        random.seed(7)

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Une punaise ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.3))
        badge = echelle_ceintures("blanche").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        tb = table(-2.1, 2.1, SOL)
        p0 = punaise(1.0).move_to(P(0, 1.7)).rotate(0.5)
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), Create(tb), FadeIn(p0), run_time=0.6)
        self.play(p0.animate.rotate(4.0).move_to(P(0, SOL + 0.45)), run_time=0.5,
                  rate_func=rate_functions.ease_in_quad)
        self.play(FadeOut(p0, scale=0.6), run_time=0.15)
        self.au_mot("pointe en haut")
        ph = punaise_haut(P(XH, SOL), 0.95)
        lh = self.etiq("haut", -0.2)
        self.play(FadeIn(ph, shift=DOWN * 0.4), FadeIn(lh), run_time=0.35)
        self.au_mot("pointe en bas")
        pb = punaise_bas(P(XB, SOL), 0.95)
        lb = self.etiq("bas", -0.2)
        self.play(FadeIn(pb, shift=DOWN * 0.4), FadeIn(lb), run_time=0.35)
        self.au_mot("Un demi chacune")
        demis = VGroup(*[VGroup(fraction(1, 2, 44, VERT_OK), self.t("?", 48, VERT_OK)).arrange(RIGHT, buff=0.12)
                         .move_to(P(x, -1.25)) for x in (XH, XB)])
        self.play(LaggedStart(*[FadeIn(d, scale=0.5) for d in demis], lag_ratio=0.3), run_time=0.5)
        self.insister(demis, 1.2, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : pas forcément ! ──
        self.dire("01-image")
        croix = VGroup(*[VGroup(Line(d.get_corner(UL), d.get_corner(DR)), Line(d.get_corner(UR), d.get_corner(DL)))
                         .set_stroke(ROUGE_ERREUR, 7) for d in demis])
        self.play(Create(croix), run_time=0.35)
        pasf = self.grand("Pas forcément !", font_size=44, color=ROUGE_ERREUR).move_to(P(0, -2.3))
        self.play(FadeIn(pasf, scale=0.6), run_time=0.3)
        self.insister(pasf, 1.15, 0.2)
        self.au_mot("mais pas la même chance")
        neq = self.t("≠", 64, ORANGE_RETENUE).move_to(P(0, 0.75))
        pmc = self.t("pas la même chance", 30, ORANGE_RETENUE).move_to(P(0, -2.3))
        self.play(FadeOut(VGroup(demis, croix)), ReplacementTransform(pasf, pmc), FadeIn(neq, scale=0.5),
                  run_time=0.4)
        self.insister(neq, 1.4, 0.2)

        # beaucoup de lancers : en haut les punaises pleuvent, en bas les barres montent
        self.au_mot("On ne le sait")
        base = -2.55
        self.play(FadeOut(pmc), FadeOut(neq), FadeOut(ph), FadeOut(pb), run_time=0.3)
        sol_b = Line(P(-2.0, base), P(2.0, base), color=WHITE, stroke_width=3)
        self.play(Create(sol_b), run_time=0.2)
        haut = {"h": 0, "b": 0}
        barres = {}
        for k, c in (("h", XH), ("b", XB)):
            barres[k] = Rectangle(width=0.8, height=0.01, fill_color=JAUNE_TITRE if k == "h" else ORANGE_RETENUE,
                                  fill_opacity=0.9, stroke_width=0).move_to(P(c, base + 0.005))
            self.add(barres[k])
        tombees = VGroup()
        sequence = ["h", "b", "b", "h", "b", "b", "h", "h", "b", "h", "b", "h", "h"]
        for i, k in enumerate(sequence):
            x = random.uniform(-1.8, 1.8)
            p = (punaise_haut(P(x, SOL), 0.55) if k == "h" else punaise_bas(P(x, SOL), 0.55))
            depart = p.copy().rotate(random.uniform(-2, 2)).shift(UP * 0.95)
            haut[k] += 1
            cible = Rectangle(width=0.8, height=0.12 * haut[k], fill_color=barres[k].get_fill_color(),
                              fill_opacity=0.9, stroke_width=0).move_to(P(XH if k == "h" else XB, base + 0.06 * haut[k]))
            self.play(Transform(depart, p), Transform(barres[k], cible), run_time=0.2,
                      rate_func=rate_functions.ease_in_quad)
            tombees.add(depart)
        # on ne conclut pas : c'est la question posée au spectateur
        cache = RoundedRectangle(width=3.6, height=1.3, corner_radius=0.2, fill_color=BLACK, fill_opacity=1,
                                 stroke_color=ORANGE_RETENUE, stroke_width=4).move_to(P(0, base + 0.75))
        q = self.t("?", 80, ORANGE_RETENUE).move_to(cache)
        self.play(FadeIn(cache), FadeIn(q, scale=0.4), run_time=0.3)
        self.insister(q, 1.3, 0.2)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.3))
        self.play(Write(toi), run_time=0.4)
        tb2 = table(-2.1, 2.1, 0.3)
        ph2 = punaise_haut(P(XH - 0.15, 0.3), 0.95)
        pb2 = punaise_bas(P(XB + 0.15, 0.3), 0.95)
        self.add(tb2)
        self.au_mot("plus souvent")
        ps = self.t("plus souvent :", 32, BLEU_CALCUL).move_to(P(0, 1.62))
        self.play(FadeIn(ps), run_time=0.3)
        self.au_mot("pointe en haut ou")
        lh2 = self.etiq("haut", -0.2, ecart=0.15)
        self.play(FadeIn(ph2, shift=DOWN * 0.4), FadeIn(lh2), run_time=0.3)
        self.au_mot("pointe en bas ?")
        ou = self.t("ou", 28).move_to(P(0, -0.2))
        lb2 = self.etiq("bas", -0.2, " ?", ecart=0.15)
        self.play(FadeIn(pb2, shift=DOWN * 0.4), FadeIn(ou), FadeIn(lb2), run_time=0.3)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=46, color=VERT_OK),
                       self.grand("commentaire !", font_size=46, color=VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -1.45))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        poignee = Text("@eleveai974", font_size=28, color=BLEU_CALCUL).move_to(P(0, -2.4))
        self.play(GrowFromCenter(poignee), run_time=0.3)
        self.attendre_voix(marge=1.5)
