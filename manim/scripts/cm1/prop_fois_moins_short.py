# prop_fois_moins_short.py
# EleveAI — Maths CM1 — short jumeau de l'épisode 03 « Fois moins » (micro
# prop_fois_moins). CEINTURE BLANCHE (règle du short blanc, REGLES.md) : on
# VOIT « 3 fois moins de temps, donc 3 fois moins de moustiques ».
# Il AMUSE : Ti-Margo, la mascotte, est ici le HÉROS de l'image (plus grand
# que dans le coin) et reste présent de bout en bout :
#   · EN HAUT, l'image qui bouge : les moustiques bourdonnent, Ti-Margo les
#     attrape d'un coup de langue ;
#   · EN BAS, au même instant, le schéma de billes : 30 moustiques = 6 colonnes
#     de 5 ronds, UNE COLONNE PAR MINUTE (un petit chrono au-dessus de chacune) ;
#   · 2 minutes = 3 fois moins de temps : les 6 colonnes en 3 paquets de 2,
#     on en garde un : 30 ÷ 3 = 10 moustiques ;
#   · 1 question-pause (3 s) : en 1 minute ? (5 ; 24 = 30 − 6, enlever au lieu
#     de diviser ; 180 = 30 × 6, la mauvaise direction) ;
#   · fin : « et en 3 minutes ? » (15), réponse en commentaire.
# Pendant la question, Ti-Margo descend à sa place habituelle (en bas), puis
# remonte, grand, pour la question en commentaire.
# Centres d'intérêt : animaux, jeux-defis. Pas de fait réel cité (30 moustiques
# en 6 minutes est un jeu ; le margouillat mange bien des moustiques).
# Ajouté ICI (absent du module) : moustique() (dessin + bourdonnement par
# updater), langue() (le coup de langue de Ti-Margo), chrono_mini().
#
# Voix : manim/voix/cm1-prop-fois-moins-short.json (validée le 01/11, débit −10) ;
# WAV : public/sons/cm1-prop-fois-moins-short/ ; marques :
# manim/scripts/cm1/prop_fois_moins_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/cm1/prop_fois_moins_short.py PropFoisMoinsShortCM1
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm1/prop_fois_moins_short.py PropFoisMoinsShortCM1 -o eleveai-maths-cm1-prop-fois-moins-short --media_dir manim/scripts/cm1/media-prop-fois-moins-short
# Sortie : manim/sorties/cm1/maths/proportionnalite/03-fois-moins/eleveai-maths-cm1-prop-fois-moins-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403
from mascotte import MascotteMargouillat  # noqa: E402

BILLE = "#38bdf8"
LANGUE = "#f472b6"
H_HEROS = 1.8                 # Ti-Margo, héros de l'image
C_HEROS = P(-1.15, 1.3)
VOL = [P(0.35, 2.05), P(1.25, 1.85), P(0.6, 1.35), P(1.6, 1.15), P(0.25, 0.75), P(1.15, 0.6)]


def moustique(s=1.0):
    """Un moustique : corps gris clair, deux ailes pâles, pattes fines."""
    corps = Ellipse(width=0.26 * s, height=0.09 * s, fill_color="#d4d4d8", fill_opacity=1, stroke_width=0)
    tete = Dot(P(0.15 * s, 0.01), radius=0.04 * s, color="#d4d4d8")
    dard = Line(P(0.18 * s, 0), P(0.3 * s, -0.03 * s), color="#d4d4d8", stroke_width=2)
    ailes = VGroup(*[Ellipse(width=0.2 * s, height=0.08 * s, fill_color=WHITE, fill_opacity=0.45, stroke_color=WHITE,
                             stroke_width=1).rotate(a).move_to(P(-0.02 * s, 0.07 * s)) for a in (0.5, 1.1)])
    pattes = VGroup(*[Line(P(x * s, -0.03 * s), P((x - 0.05) * s, -0.13 * s), color="#a1a1aa", stroke_width=1.5)
                      for x in (-0.06, 0.0, 0.06)])
    return VGroup(pattes, ailes, corps, tete, dard)


def bourdonner(m, base, phase=0.0):
    """Updater : le moustique tremble autour de `base` (il bourdonne)."""
    etat = {"t": phase}

    def maj(x, dt):
        etat["t"] += dt
        t = etat["t"]
        x.move_to(base + P(0.07 * np.sin(7 * t), 0.05 * np.cos(11 * t)))
    m.add_updater(maj)
    return m


def chrono_mini(r=0.13):
    """Un petit chronomètre (une minute)."""
    cadran = Circle(radius=r, fill_color="#0f172a", fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    bouton = Rectangle(width=r * 0.5, height=r * 0.3, fill_color=WHITE, fill_opacity=1, stroke_width=0)
    bouton.next_to(cadran, UP, buff=0.01)
    aiguille = Line(ORIGIN, UP * r * 0.75, color=AMBRE, stroke_width=3)
    return VGroup(cadran, bouton, aiguille)


class PropFoisMoinsShortCM1(ShortProp):
    nom_voix = "cm1-prop-fois-moins-short"
    fichier_marques = "prop_fois_moins_short_marques.json"
    ceinture = "blanche"

    # ── Ti-Margo, le héros ──────────────────────────────────────────────────
    def bouche(self):
        h = self.heros
        return h.get_center() + P((0.44 - 0.5) * h.width, (0.5 - 0.30) * h.height)

    def attraper(self, ms, run_time=0.45):
        """Coups de langue : chaque moustique de ms est attrapé (il disparaît)."""
        for m in ms:
            m.clear_updaters()
            b = self.bouche()
            lg = Line(b, m.get_center(), color=LANGUE, stroke_width=7)
            self.play(Create(lg), run_time=run_time * 0.4)
            self.play(m.animate.move_to(b).scale(0.3).set_opacity(0), Uncreate(lg), run_time=run_time * 0.6)
            self.remove(m)

    def nuee(self, n=6):
        return [bourdonner(moustique().move_to(VOL[k]), VOL[k], phase=k * 0.7) for k in range(n)]

    def schema(self):
        """30 moustiques = 6 colonnes de 5 ronds, un chrono par colonne (une minute)."""
        bi = Billes(6, 5, r=0.13, ecart=0.34, couleur=BILLE)
        bi.shift(P(-0.85, -1.1) - bi.billes[0][0].get_center())
        ch = VGroup(*[chrono_mini(0.12).move_to(P(bi.billes[c][0].get_x(), -0.7)) for c in range(6)])
        return bi, ch

    def paquets(self, mobs, couleur=AMBRE, buff=0.03):
        return VGroup(*[SurroundingRectangle(VGroup(*mobs[k:k + 2]), color=couleur, buff=buff, corner_radius=0.08,
                                             stroke_width=4) for k in (0, 2, 4)])

    def choix(self, textes, fs=30):
        """Les 3 choix : posés AU NOMBRE (mots_choix), sans attendre le mot
        « moustiques » qui revient plus loin."""
        out = []
        for x in textes:
            t = self.t(x, fs)
            t.sans_synchro = True
            out.append(t)
        return out

    def _rep_q(self, sc):
        l0 = sc.ligne_rep(0, ["1 minute :", "6 fois moins"])
        l1 = sc.ligne_rep(1, ["que 6 minutes."])
        l2 = sc.ligne_rep(2, ["30 ÷", "6 =", "5 moustiques."])
        for m, mot in zip(list(l0) + list(l1) + list(l2), ["1 minute", "6 fois moins", "que 6 minutes", "30 divisé", "par 6",
                                                "5 moustiques"]):
            sc.au_mot(mot)
            sc.play(FadeIn(m, shift=UP * 0.12), run_time=0.25)
        sc.rep_fini()

    def construct(self):
        titre, badge = self.entete_short("Ti-Margo a très faim !", self.ceinture)
        titre.sans_synchro = True  # le titre de la vidéo : posé d'un bloc
        self.add(badge)
        self.heros = MascotteMargouillat().scale_to_fit_height(H_HEROS).move_to(C_HEROS)
        garder = [badge, titre, self.heros]

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au_mot("Ti Margo")
        self.play(Write(titre), FadeIn(self.heros, scale=0.6), run_time=0.6)
        self.au_mot("très faim")
        self.play(Wiggle(self.heros, scale_value=1.08), run_time=0.8)
        self.au_mot("Sauras-tu")
        q = self.bloc(["Sauras-tu compter", "ses moustiques ?"], 30).move_to(P(0, -0.3))
        self.play(FadeIn(q[0], shift=UP * 0.15), run_time=0.35)
        nuee = self.nuee()
        self.au_mot("moustiques")
        self.play(FadeIn(q[1], shift=UP * 0.15), LaggedStart(*[FadeIn(m, scale=0.4) for m in nuee], lag_ratio=0.12),
                  run_time=0.7)
        self.attendre_voix(marge=0.2)

        # ── 01 : 6 minutes → 30 moustiques ──
        self.dire("01-six")
        bi, ch = self.schema()
        l1 = self.ligne([("6 minutes", WHITE), ("→ 30 moustiques", BILLE)], 28).move_to(P(0, 0.05))
        self.au_mot("6 minutes")
        self.play(FadeOut(q), FadeIn(l1[0], shift=RIGHT * 0.15),
                  LaggedStart(*[FadeIn(c, scale=0.5) for c in ch], lag_ratio=0.12), run_time=0.7)
        self.au_mot("Ti Margo")
        m0 = nuee[0]
        m0.clear_updaters()
        lg = Line(self.bouche(), m0.get_center(), color=LANGUE, stroke_width=7)
        self.play(Create(lg), run_time=0.2)
        self.play(m0.animate.move_to(self.bouche()).scale(0.3).set_opacity(0), Uncreate(lg),
                  LaggedStart(*[GrowFromCenter(b) for col in bi.billes for b in col], lag_ratio=0.03), run_time=0.6)
        self.remove(m0)
        self.au_mot("30 moustiques")
        self.play(FadeIn(l1[1], scale=1.2), run_time=0.35)
        self.au_mot("Miam")
        miam = self.t("Miam !", 34, LANGUE).move_to(P(1.0, 1.6))
        self.play(FadeIn(miam, scale=1.4), Indicate(self.heros, scale_factor=1.06), run_time=0.4)
        self.attendre_voix(marge=0.2)

        # ── 02 : 2 minutes = 3 fois moins de temps → 30 ÷ 3 = 10 ──
        self.dire("02-deux")
        a1 = self.ligne([("Et en 2 minutes ?", WHITE)], 28).move_to(P(0, 0.25))
        a1[0].sans_synchro = True  # posé au « 2 » (le mot « minutes » revient plus loin)
        self.au_mot("2 minutes")
        self.play(FadeOut(l1), FadeOut(miam), FadeIn(a1, shift=UP * 0.12), *[c.animate.set_opacity(0.3) for c in ch[2:]],
                  run_time=0.4)
        a2 = self.ligne([("3 fois moins", AMBRE), ("de temps", WHITE)], 28).move_to(P(0, -0.2))
        pc = self.paquets(ch, buff=0.02)
        self.au_mot("3 fois moins de temps")
        self.play(FadeIn(a2, shift=UP * 0.12), Create(pc), run_time=0.45)
        self.play(*[p.animate.set_opacity(0.3) for p in pc[1:]], run_time=0.3)
        b1 = self.ligne([("3 fois moins", AMBRE), ("de moustiques", WHITE)], 28).move_to(P(0, 0.25))
        pb = self.paquets(bi.colonnes)
        self.au_mot("Donc 3 fois")
        self.play(FadeOut(a1), FadeOut(a2), FadeIn(b1, shift=UP * 0.12), Create(pb), run_time=0.45)
        b2 = self.ligne([("30 ÷", WHITE), ("3", AMBRE), ("= 10 moustiques", VERT_OK)], 28).move_to(P(0, -0.2))
        if b2.width > 3.5:
            b2.scale_to_fit_width(3.5)
        self.au_mot("30 divisé")
        self.play(FadeIn(b2[0], shift=RIGHT * 0.12), run_time=0.3)
        self.au_mot("par 3")
        self.play(FadeIn(b2[1], scale=1.3), *[m.animate.set_opacity(0.2) for m in (*bi.colonnes[2:], *pb[1:])],
                  run_time=0.4)
        self.au_mot("10 moustiques")
        self.play(FadeIn(b2[2], scale=1.3), pb[0].animate.set_stroke(VERT_OK, 6), run_time=0.4)
        self.play(b2[2].animate.scale(1.1, about_point=b2[2].get_left()), run_time=0.2)
        self.play(b2[2].animate.scale(1 / 1.1, about_point=b2[2].get_left()), run_time=0.2)
        self.attendre_voix(marge=0.2)

        # ── 03 : la question-pause (3 s) : Ti-Margo descend à sa place ──
        self.play(FadeOut(Group(*[m for m in self.mobjects if m not in garder])),
                  self.heros.animate.scale_to_fit_height(1.05).move_to(P(0, -3.42)), run_time=0.5)
        self.question_pause("03-question", "03b-reponse", ["Et en 1 minute ?"],
                            self.choix(["5 moustiques", "24 moustiques", "180 moustiques"]), 0,
                            ["1 minute : 6 fois moins", "que 6 minutes.", "30 ÷ 6 = 5 moustiques."],
                            mot_q="Et en 1 minute", autres_r=self._rep_q,
                            mots_choix=("5 moustiques", "24 moustiques", "180 moustiques"))

        # ── 04 : la question en commentaire : Ti-Margo remonte, grand ──
        self.play(FadeOut(Group(*[m for m in self.mobjects if m not in garder])),
                  self.heros.animate.scale_to_fit_height(H_HEROS).move_to(C_HEROS), run_time=0.5)
        self.dire("04-commentaire")
        nuee = self.nuee()
        self.au_mot("Et toi")
        self.play(LaggedStart(*[FadeIn(m, scale=0.4) for m in nuee], lag_ratio=0.1), run_time=0.6)
        self.au_mot("Combien")
        r = self.bloc(["Combien de moustiques", "attrape-t-il"], 30).move_to(P(0, -0.15))
        self.play(FadeIn(r[0], shift=UP * 0.15), run_time=0.35)
        self.au_mot("attrape-t-il")
        self.play(FadeIn(r[1], shift=UP * 0.15), run_time=0.3)
        self.attraper(nuee[:1], 0.4)
        self.au_mot("3 minutes")
        qh = self.ligne([("en 3 minutes", BLEU_CALCUL), ("?", AMBRE)], 38).move_to(P(0, -1.1))
        if qh.width > 3.4:
            qh.scale_to_fit_width(3.4)
        self.play(FadeIn(qh, scale=1.3), run_time=0.4)
        self.insister(qh, 1.1)
        self.appel_commentaire(y=-2.05)
