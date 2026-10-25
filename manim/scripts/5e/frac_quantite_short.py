# frac_quantite_short.py
# EleveAI — Maths 5e — short jumeau de l'épisode 09 « La fraction d'une
# quantité » (micro fraction_quantite). CEINTURE JAUNE : on VOIT la journée
# coupée en 3, mais il faut calculer 2/3 de 24 h puis 2/3 de 15 ans (diviser,
# puis multiplier) : plus qu'un short blanc.
# Il AMUSE : « Le chat, champion du sommeil ». Aya, VÉTÉRINAIRE :
#   · EN HAUT, le chat qui dort (Z z z) ; EN BAS, au même instant, la barre de
#     24 h coupée en 3 parts de 8 h, 2 parts (16 h) se colorient ;
#   · 1 question-pause (3 s) : un chat de 15 ans a dormi 2/3 de sa vie → 10 ans
#     (leurres 5 = 1/3 seulement, 30 = 15 × 2) ;
#   · SURPRISE : 10 ans de sommeil sur 15, 5 ans réveillé ;
#   · commentaire : « un koala dort environ 5/6 de la journée : combien
#     d'heures ? » (20 h).
# Données réelles (WebSearch, 25/10/2026) : un chat adulte dort 12 à 16 h par
# jour (Catster, PetMD, Sleep Foundation « How much do cats sleep ») ; « jusqu'à
# 16 heures » = 2/3 de 24 h ; un koala dort 18 à 22 h par jour (Australia.com,
# Friends of the Koala ; Australian Koala Foundation cité) : « environ 5/6 » =
# 20 h, dans la fourchette.
# Vérifié (Python) : 2/3 de 24 = 16 ; 2/3 de 15 = 10 ; 5/6 de 24 = 20.
# Centres d'intérêt : animaux, corps-sante.
#
# Voix : manim/voix/5e-frac-quantite-short.json (débit −10) ; marques :
# manim/scripts/5e/frac_quantite_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/5e/frac_quantite_short.py FracQuantiteShort5e
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/5e/frac_quantite_short.py FracQuantiteShort5e -o eleveai-maths-5e-frac-quantite-short --media_dir manim/scripts/5e/media-frac-quantite-short
# Sortie : manim/sorties/5e/maths/fractions/09-quantite/eleveai-maths-5e-frac-quantite-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_loth_commun import *  # noqa: E402,F403

DORT = "#818cf8"     # le sommeil (indigo)
EVEIL = "#facc15"    # l'éveil (soleil)


def chat(s=1.0, dort=True):
    """Un chat roulé en boule (dort) : corps, tête, oreilles, queue, yeux fermés."""
    c = "#f59e0b"
    corps = Ellipse(width=1.6, height=0.9, fill_color=c, fill_opacity=1, stroke_width=0)
    tete = Circle(radius=0.36, fill_color=c, fill_opacity=1, stroke_width=0).move_to(P(0.75, 0.15))
    oreilles = VGroup(*[Triangle(fill_color=c, fill_opacity=1, stroke_width=0).scale(0.16).move_to(P(0.75 + x, 0.5))
                        for x in (-0.2, 0.2)])
    queue = Arc(radius=0.45, start_angle=PI, angle=PI * 0.9, color=c, stroke_width=12).move_to(P(-0.55, -0.35))
    yeux = VGroup(*[Arc(radius=0.07, start_angle=PI, angle=PI, color=NUIT, stroke_width=4).move_to(P(0.75 + x, 0.18))
                    for x in (-0.13, 0.13)])
    rayures = VGroup(*[Line(P(x, 0.35), P(x + 0.1, 0.05), color="#b45309", stroke_width=5) for x in (-0.4, -0.1, 0.2)])
    g = VGroup(queue, corps, rayures, tete, oreilles, yeux).scale(s)
    return g


def zzz(s=1.0):
    return VGroup(*[Text(z, font_size=f, color=DORT, weight=BOLD) for z, f in (("Z", 34), ("z", 28), ("z", 22))]) \
        .arrange(UR, buff=0.02).scale(s)


def veterinaire(s=0.55):
    p = personne(peau="#5c3a21", tenue="#14b8a6", cheveux="#111827", longs=True, s=s)
    p.add(blouse(p))
    return p


class FracQuantiteShort5e(ShortH):
    nom_voix = "5e-frac-quantite-short"
    fichier_marques = "frac_quantite_short_marques.json"
    ceinture = "jaune"

    def barre_jour(self, total, unite, y=-1.6):
        b = Barre(3, 0, largeur=3.6, hauteur=0.75, couleur=DORT, marge=0.15, centre=P(0, y))
        br = Brace(b.contour, UP, color=AMBRE, buff=0.12)
        tt = Text(f"{total} {unite}", font_size=30, color=AMBRE)
        tt.next_to(br, UP, buff=0.08)
        vals = VGroup(*[Text(f"{total // 3} {unite}", font_size=26, color=NUIT, weight=BOLD).move_to(p_).set_z_index(5)
                        for p_ in b.parts])
        for m in (tt, vals):
            sans_synchro(m)
        return b, br, tt, vals

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Le champion du sommeil", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : Aya et le chat ──
        self.dire("00-accroche")
        ay = veterinaire(0.6).move_to(P(-1.35, 1.25))
        self.au_mot("Aya")
        nm = self.bloc(["Aya,", "vétérinaire"], 26, BLEU_CALCUL).next_to(ay, DOWN, buff=0.1).set_x(-1.05)
        self.play(FadeIn(ay, shift=UP * 0.2), FadeIn(nm[0]), run_time=0.4)
        self.au_mot("vétérinaire")
        self.play(FadeIn(nm[1], shift=UP * 0.1), run_time=0.3)
        ch = chat(0.85).move_to(P(0.45, 0.9))
        self.au_mot("les chats")
        self.play(FadeIn(ch, scale=0.7), run_time=0.4)
        self.au_mot("Combien de temps")
        z = zzz().next_to(ch, UR, buff=-0.15)
        self.play(Write(titre), FadeIn(z, shift=UP * 0.2), run_time=0.6)
        self.attendre_voix(marge=0.2)

        # ── 01 : 2/3 de 24 h = 16 h ──
        self.dire("01-journee")
        self.play(FadeOut(ay), FadeOut(nm), ch.animate.move_to(P(-0.6, 1.2)), z.animate.shift(P(-1.35, 0.3)),
                  run_time=0.4)
        b, br, tt, vals = self.barre_jour(24, "h")
        self.au_nb("c'est 24")
        self.play(FadeIn(b), FadeIn(br), FadeIn(tt), run_time=0.4)
        self.au_nb("en 3")
        self.play(Indicate(b.traits, color=AMBRE), run_time=0.5)
        self.au_nb("8 heures")
        self.play(FadeIn(vals, scale=1.3), run_time=0.35)
        self.au_nb("dormir 2")
        self.play(b.colorier([0, 1], couleur=DORT, lag=0.2, run_time=0.6), Wiggle(z), run_time=0.6)
        self.add(b.traits, b.contour, vals)
        r = self.bas(self.inline("16 heures !", 40, DORT), y=0.3)
        self.au_nb("16 heures")
        self.play(FadeIn(r, scale=1.3), run_time=0.35)
        f = EcritureFraction(2, 3, fs=56, couleur=DORT)
        l = VGroup(f, self.inline("de la journée", 30, DORT)).arrange(RIGHT, buff=0.2).move_to(P(0.9, 1.2))
        l.scale_to_fit_width(min(l.width, 2.4))
        self.au_nb("Les 2 tiers")
        self.play(FadeIn(l, scale=1.2), run_time=0.4)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 02 : la question-pause (3 s) ──
        self.question_pause("02-question", "02b-reponse", ["Chat de 15 ans, 2/3 de sa vie", "à dormir : combien d'années ?"],
                            [self.inline("5 ans", 30), self.inline("10 ans", 30), self.inline("30 ans", 30)], 1,
                            ["15 ÷ 3 = 5", "5 × 2 = 10 ans"], mot_q="Un chat de 15")
        self.vider(garder)

        # ── 03 : la surprise : 10 ans de sommeil ──
        self.dire("03-surprise")
        b, br, tt, vals = self.barre_jour(15, "ans", y=-1.4)
        ch = chat(0.8).move_to(P(-0.9, 1.25))
        z = zzz(0.9).next_to(ch, UR, buff=-0.15)
        self.au_nb("sur 15")
        self.play(FadeIn(b), FadeIn(br), FadeIn(tt), FadeIn(ch), run_time=0.5)
        d = self.inline("10 ans à dormir !", 32, DORT)
        d.scale_to_fit_width(min(d.width, 3.6)).move_to(P(0, 0.3))
        self.au_nb("10 ans à dormir")
        self.play(b.colorier([0, 1], couleur=DORT, lag=0.2, run_time=0.5), FadeIn(z, shift=UP * 0.2),
                  FadeIn(d, scale=1.3), run_time=0.5)
        self.add(b.traits, b.contour)
        self.au_nb("réveillé que 5")
        e = self.inline("réveillé : 5 ans", 30, EVEIL).next_to(b, DOWN, buff=0.25).align_to(b, RIGHT)
        self.play(b.parts[2].animate.set_fill(EVEIL, 1), FadeIn(e, shift=UP * 0.1), run_time=0.4)
        self.insister(d, 1.15)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 04 : la question en commentaire ──
        self.dire("04-question")
        b = Barre(6, 0, largeur=3.6, hauteur=0.7, couleur=DORT, marge=0.15, centre=P(0, -1.7))
        br = Brace(b.contour, UP, color=AMBRE, buff=0.12)
        tt = self.inline("24 h", 30, AMBRE).next_to(br, UP, buff=0.08)
        pas_audit(tt)
        self.au_mot("Un koala")
        k = self.inline("le koala :", 32, BLEU_CALCUL).move_to(P(-0.9, 1.65))
        self.play(FadeIn(k), FadeIn(b), FadeIn(br), FadeIn(tt), run_time=0.4)
        f = EcritureFraction(5, 6, fs=56, couleur=DORT).move_to(P(0.9, 1.65))
        self.au_nb("environ 5")
        self.play(FadeIn(f, scale=1.3), b.colorier(range(5), couleur=DORT, lag=0.1, run_time=0.5), run_time=0.5)
        self.add(b.traits, b.contour)
        self.au_mot("Combien d'heures")
        q = self.bas(self.inline("Combien d'heures ?", 34, AMBRE), y=0.7)
        self.play(FadeIn(q, scale=1.2), run_time=0.35)
        self.appel_commentaire(y=0.0)
