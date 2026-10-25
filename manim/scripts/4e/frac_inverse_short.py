# frac_inverse_short.py
# EleveAI — Maths 4e — short jumeau de l'épisode 08 « L'inverse d'une
# fraction » (micro fraction_inverse). CEINTURE BLANCHE (règle du short
# blanc) : on VOIT l'inverse (la carte retournée), aucun calcul posé.
# Il AMUSE : « Le tour de la carte retournée ». Noé, MAGICIEN :
#   · EN HAUT, l'image qui bouge : Noé et sa carte, qu'il retourne ;
#   · EN BAS, au même instant, la fraction écrite se retourne (le numérateur
#     descend, le dénominateur monte) et le produit fait 1 :
#     2/3 × 3/2 = 6/6 = 1 ; 5/8 × 8/5 = 40/40 = 1 ;
#   · 1 question-pause (3 s) : le dos de la carte 5 → 1/5 (leurres −5 :
#     l'opposé ; 5 : la même) ;
#   · commentaire : « quel nombre est égal à son propre inverse ? » (1, et −1).
# Vérifié (Python) : 2/3 × 3/2 = 1 ; 5/8 × 8/5 = 1 ; 5 × 1/5 = 1.
# Aucune donnée réelle citée. Centres : jeux-defis, cinema-series (le spectacle).
#
# Voix : manim/voix/4e-frac-inverse-short.json (débit −10) ; marques :
# manim/scripts/4e/frac_inverse_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/frac_inverse_short.py FracInverseShort4e
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/frac_inverse_short.py FracInverseShort4e -o eleveai-maths-4e-frac-inverse-short --media_dir manim/scripts/4e/media-frac-inverse-short
# Sortie : manim/sorties/4e/maths/fractions/08-inverse/eleveai-maths-4e-frac-inverse-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lote_commun import *  # noqa: E402,F403
from frac_inverse import retourner  # noqa: E402

YH = 1.5                 # la bande du haut
PC = P(0.95, YH)         # la carte de Noé


def magicien(s=0.5):
    p = personne(peau="#c68642", tenue="#1e1b4b", cheveux="#111827", s=s)
    c = p.tete.get_center()
    r = p.tete.width / 2
    bord = Rectangle(width=r * 2.8, height=r * 0.22, fill_color="#111827", fill_opacity=1, stroke_width=0)
    bord.move_to(c + UP * r * 0.8)
    haut = Rectangle(width=r * 1.7, height=r * 1.4, fill_color="#111827", fill_opacity=1, stroke_width=0)
    haut.next_to(bord, UP, buff=0)
    ruban = Rectangle(width=r * 1.7, height=r * 0.25, fill_color="#dc2626", fill_opacity=1, stroke_width=0)
    ruban.move_to(haut.get_bottom() + UP * r * 0.2)
    cape = Polygon(P(-0.75, -1.9), P(0.75, -1.9), P(0.45, -0.5), P(-0.45, -0.5), fill_color="#7f1d1d",
                   fill_opacity=0.6, stroke_width=0).scale(s).move_to(p.corps)
    baguette = Line(P(0, 0), P(0.55, 0.4), stroke_color=WHITE, stroke_width=6).scale(s * 1.6)
    baguette.move_to(p.corps.get_right() + P(0.15, 0.25))
    p.add(cape, bord, haut, ruban, baguette)
    return p


def carte(n, d, centre=PC):
    """La carte de Noé : fond blanc, une fraction écrite (ou un entier si d est None)."""
    fond = RoundedRectangle(width=1.2, height=1.6, corner_radius=0.12, fill_color=WHITE, fill_opacity=1,
                            stroke_color="#a855f7", stroke_width=5)
    if d is None:
        face = Text(str(n), font_size=64, color=NUIT, weight=BOLD)
        face.sans_synchro = True
    else:
        face = EcritureFraction(n, d, fs=50, couleur=NUIT, police="Arial", gras=True)
    return VGroup(fond, face.move_to(fond)).move_to(centre)


def dos(centre=PC):
    fond = RoundedRectangle(width=1.2, height=1.6, corner_radius=0.12, fill_color="#7c3aed", fill_opacity=1,
                            stroke_color="#a855f7", stroke_width=5)
    q = Text("?", font_size=70, color=WHITE, weight=BOLD)
    q.sans_synchro = True
    return VGroup(fond, q.move_to(fond)).move_to(centre)


def flip(scene, ancienne, nouvelle, run_time=0.6):
    """La carte tourne sur elle-même : elle s'aplatit, puis la nouvelle face s'ouvre."""
    nouvelle.stretch(0.02, 0)
    scene.play(ancienne.animate.stretch(0.02, 0), run_time=run_time / 2, rate_func=rush_into)
    scene.remove(ancienne)
    scene.play(nouvelle.animate.stretch(50, 0), run_time=run_time / 2, rate_func=rush_from)
    return nouvelle


class FracInverseShort4e(ShortE):
    nom_voix = "4e-frac-inverse-short"
    fichier_marques = "frac_inverse_short_marques.json"
    ceinture = "blanche"

    def double_flip(self, c_old, c_new, f, couleur=VERT_OK):
        """En haut la carte, en bas la fraction écrite : retournées ENSEMBLE."""
        g, anim = retourner(f, couleur=couleur, run_time=0.7)
        c_new.stretch(0.02, 0)
        self.play(c_old.animate.stretch(0.02, 0), anim, run_time=0.35)
        self.remove(c_old)
        self.play(c_new.animate.stretch(50, 0), run_time=0.35)
        self.add(g)
        return c_new, g

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("La carte retournée", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]
        noe = magicien(0.5).move_to(P(-1.2, YH - 0.05))

        # ── 00 : Noé retourne la carte 2/3 ──
        self.dire("00-accroche")
        self.au_mot("Noé")
        nm = self.bloc(["Noé,", "magicien"], 26, BLEU_CALCUL).next_to(noe, DOWN, buff=0.1).set_x(-1.1)
        d0 = dos()
        self.play(FadeIn(noe, shift=UP * 0.2), FadeIn(nm), FadeIn(d0), run_time=0.5)
        c = carte(2, 3)
        f = EcritureFraction(2, 3, fs=100, couleur=AMBRE).move_to(P(0, -1.0))
        self.au_mot("2 tiers")
        self.remove(d0)
        self.add(c)
        self.play(FadeIn(f, scale=1.2), Write(titre), FadeOut(nm), run_time=0.5)
        self.au_mot("Il la retourne")
        self.play(Indicate(c, scale_factor=1.1), run_time=0.4)
        self.au_mot("3 demis")
        c, f = self.double_flip(c, carte(3, 2), f)
        self.play(Indicate(f, color=VERT_OK), Indicate(c, scale_factor=1.1), run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 01 : 2/3 × 3/2 = 1 ──
        self.dire("01-magie")
        e = expression((2, 3, AMBRE), "×", (3, 2, VERT_OK), "=", (6, 6), "=", "1", fs=46)
        e.scale_to_fit_width(min(e.width, 3.9)).move_to(P(0, -0.9))
        self.au_mot("Et voici le tour")
        self.play(FadeOut(f), run_time=0.3)
        self.montre(["2 tiers fois", "fois 3 demis", "6 sixièmes", "sixièmes : 1"], [e[0], e[1:3], e[3:5], e[5:]])
        self.play(Flash(e[6], color=AMBRE, line_length=0.25), e[6].animate.set_color(AMBRE), run_time=0.5)
        self.au_mot("toujours 1")
        r = self.bloc(["fraction × retournée", "= 1"], 32, AMBRE).move_to(P(0, -2.25))
        pas_audit(r)
        self.play(FadeIn(r, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(e), FadeOut(r), run_time=0.3)

        # ── 02 : 5/8 et 8/5 ──
        self.dire("02-autre")
        self.au_mot("Une autre carte")
        self.play(FadeOut(c), run_time=0.2)
        c = dos()
        self.play(FadeIn(c), run_time=0.2)
        f = EcritureFraction(5, 8, fs=100, couleur=AMBRE).move_to(P(0, -1.0))
        self.au_mot("5 huitièmes")
        c2 = carte(5, 8)
        self.remove(c)
        self.add(c2)
        self.play(FadeIn(f, scale=1.2), run_time=0.35)
        self.au_mot("8 cinquièmes")
        c, f = self.double_flip(c2, carte(8, 5), f)
        e = expression((5, 8, AMBRE), "×", (8, 5, VERT_OK), "=", (40, 40), "=", "1", fs=44)
        e.scale_to_fit_width(min(e.width, 3.9)).move_to(P(0, -0.9))
        self.montre(["5 huitièmes fois", "fois 8 cinquièmes", "40 quarantièmes", "encore 1"],
                    [e[0], e[1:3], e[3:5], e[5:]], avec=[FadeOut(f)])
        self.play(Flash(e[6], color=AMBRE, line_length=0.25), e[6].animate.set_color(AMBRE), run_time=0.5)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 03 : la question-pause (3 s) ──
        self.question_pause("03-question", "03b-reponse", ["La carte 5 :", "que cache son dos ?"],
                            [self.inline("1/5", 30), self.inline("−5", 30), self.inline("5", 30)], 0,
                            ["5 = 5/1 → 1/5", "5 × 1/5 = 1"], mot_q="Noé montre")
        self.vider(garder)

        # ── 04 : la question en commentaire ──
        self.dire("04-question")
        self.au_mot("quel nombre")
        q = VGroup(dos(P(-1.0, -0.6)), Text("=", font_size=60), dos(P(1.0, -0.6)))
        q[1].move_to(P(0, -0.6))
        q[1].sans_synchro = True
        self.play(FadeIn(q, scale=0.8), FadeIn(noe), run_time=0.5)
        self.au_mot("son propre inverse")
        t = self.bloc(["Égal à", "son inverse ?"], 34, AMBRE).move_to(P(0, -2.2))
        self.play(FadeIn(t, shift=UP * 0.15), run_time=0.4)
        self.appel_commentaire(y=0.6)
