# prop_lycee_evo_diminution_short.py
# EleveAI — Maths 1re et STMG (automatismes) — short jumeau de l'épisode COMMUN 08
# « Le coefficient d'une baisse » (micro auto_evo_diminution).
# CEINTURE BLANCHE (échelle entière), rendu UNE fois, copié sous les deux noms.
# Il AMUSE : « − 30 % sur un jean à 50 € : × 0,3 ? » — Non ! Deux barres :
#   · × 0,3 : on ne garde que 3 morceaux sur 10 (15 €), en rouge ;
#   · − 30 % : on retire 3 morceaux, il en reste 7 (70 %) : 50 × 0,7 = 35 € ;
#   · 1 question-pause (3 s) : − 10 % = × 0,9 (A) ;
#   · en commentaire : − 45 %, c'est fois combien ? (× 0,55).
# Centre d'intérêt : mode. Chiffres inventés, pas de source.
# Voix : manim/voix/lycee-evo-diminution-short.json (« go » le 23/11, débit −10) ;
# WAV : public/sons/lycee-evo-diminution-short/ ; marques : prop_lycee_evo_diminution_short_marques.json.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/premiere/prop_lycee_evo_diminution_short.py PropLyceeEvoDiminutionShort
# Brouillon : python -m manim render -ql -r 480,854 --disable_caching manim/scripts/premiere/prop_lycee_evo_diminution_short.py PropLyceeEvoDiminutionShort -o eleveai-maths-premiere-evo-diminution-short --media_dir manim/scripts/premiere/media-prop-lycee-evo-diminution-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))  # le dossier du script EN TÊTE

from prop_commun import *  # noqa: E402,F403
from fin_commune import ecran_fin, appel_commentaire  # noqa: E402

BLEU_C = "#38bdf8"     # les 100 % (bleu)
BOUT = "#fb923c"       # le bout ajouté (orange)
FAUX = "#ef4444"       # le morceau retiré (rouge)
VIDE = "#1e293b"


def sans(m):
    """Un décor (le titre de la vidéo) : ni attente de synchro, ni audit."""
    for f in m.get_family():
        if isinstance(f, Text):
            f.sans_synchro = True
            f._pas_audit = True
    return m


def gras(s, fs=34, couleur=WHITE):
    return Text(s, font_size=fs, color=couleur, weight=BOLD)


def barre_s(largeur=2.4, h=0.5, centre=ORIGIN):
    """La barre de 100 % du short : 10 morceaux bleus dans une piste."""
    piste = RoundedRectangle(width=largeur, height=h, corner_radius=0.08, fill_color="#1e293b", fill_opacity=1,
                             stroke_color="#94a3b8", stroke_width=3)
    W, hh = largeur - 0.12, h - 0.12
    x0 = -largeur / 2 + 0.06
    morceaux = VGroup(*[Rectangle(width=W / 10, height=hh, stroke_width=0, fill_color=BLEU_C, fill_opacity=1)
                        .move_to(P(x0 + (i + 0.5) * W / 10, 0)) for i in range(10)])
    traits = VGroup(*[Line(P(x0 + i * W / 10, -hh / 2), P(x0 + i * W / 10, hh / 2), color="#0f172a", stroke_width=2)
                      for i in range(1, 10)])
    g = VGroup(piste, morceaux, traits).move_to(centre)
    g.piste, g.lm, g.hh = piste, W / 10, hh
    return g


def bout_s(b, k, couleur=BOUT):
    """Le bout ajouté : k morceaux de 10 %."""
    return Rectangle(width=b.lm * k, height=b.hh, fill_color=couleur, fill_opacity=1, stroke_color=WHITE,
                     stroke_width=1.5).next_to(b.piste, RIGHT, buff=0.03)


def retire_s(b, k, couleur=FAUX):
    """Les k derniers morceaux : (trou sombre, morceau rouge posé à sa place)."""
    w = b.lm * k
    x1 = b.piste.get_right()[0] - 0.06
    trou = Rectangle(width=w, height=b.hh, fill_color=VIDE, fill_opacity=1, stroke_width=0)
    trou.move_to(P(x1 - w / 2, b.piste.get_y()))
    m = Rectangle(width=w, height=b.hh, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)
    return trou, m.move_to(trou)


def jean(s=1.0, couleur="#2563eb"):
    """Un jean : la ceinture, deux jambes, la couture."""
    ceint = Rectangle(width=1.3, height=0.2, fill_color="#1e3a8a", fill_opacity=1, stroke_width=0).move_to(P(0, 0.9))
    g = Polygon(P(-0.65, 0.8), P(0.05, 0.8), P(-0.05, -0.9), P(-0.6, -0.9), fill_color=couleur, fill_opacity=1,
                stroke_color=WHITE, stroke_width=2)
    d = Polygon(P(-0.05, 0.8), P(0.65, 0.8), P(0.6, -0.9), P(0.05, -0.9), fill_color=couleur, fill_opacity=1,
                stroke_color=WHITE, stroke_width=2)
    bouton = Dot(P(0, 0.9), radius=0.05, color=JAUNE_TITRE)
    return VGroup(g, d, ceint, bouton).scale(s)


class PropLyceeEvoDiminutionShort(ShortProp):
    nom_voix = "lycee-evo-diminution-short"
    fichier_marques = "prop_lycee_evo_diminution_short_marques.json"
    ceinture = "blanche"

    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        ph2 = self.bloc(phrase, 28, VERT_OK).next_to(cartes, DOWN, buff=0.14).set_x(0)
        self.ph_q = ph2
        return tete, q, cartes, pause, rebours, ph2

    def ligne_rep(self, i, morceaux, fs=28):
        return super().ligne_rep(i, morceaux, fs)

    def dire(self, nom, dossier=None):
        """Le début de chaque clé de voix, pour les chapitres (lu dans le log)."""
        print(f"CLE {nom} t={self.renderer.time:.2f}", flush=True)
        return super().dire(nom, dossier) if dossier is not None else super().dire(nom)

    def lg(self, morceaux, y, fs=36):
        """Une ligne de morceaux (texte, couleur), centrée, jamais plus large que 3,9."""
        l = self.ligne(morceaux, fs, buff=0.32)
        if l.width > 3.9:
            l.scale_to_fit_width(3.9)
        return l.move_to(P(0, y))

    def poser(self, l, mots, rt=0.3):
        for m, mot in zip(l, mots):
            if mot:
                self.au_mot(*mot) if isinstance(mot, tuple) else self.au_mot(mot)
            self.play(FadeIn(m, scale=1.2), run_time=rt)


    def garder_seulement(self, b, k):
        """× 0,3 : on ne GARDE que k morceaux ; les autres s'éteignent (animations)."""
        return [b[1][i].animate.set_fill(VIDE, 1) for i in range(k, 10)]

    def _rep_q(self, sc):
        l0 = sc.ligne_rep(0, ["Il reste 90 %", "= 0,9."])
        sc.au_mot("90 %")
        sc.wait(0.1)  # le « 90 » paraît avec le mot, pas avant (audit 0,06 s)
        sc.play(FadeIn(l0[0], shift=UP * 0.12), run_time=0.3)
        sc.au_mot("0,9.")
        sc.play(FadeIn(l0[1], scale=1.3), run_time=0.3)
        sc.rep_fini()

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Le piège des soldes", self.ceinture)
        sans(titre)  # le titre de la vidéo : posé d un bloc (ni synchro, ni audit)
        self.add(badge)
        garder = [margo, titre, badge]

        # ── 00 : l'accroche : le jean à 50 €, − 30 % : × 0,3 ? ──
        self.dire("00-accroche")
        self.au_mot("Moins 30")
        self.play(Write(titre), run_time=0.4)
        p30 = gras("− 30 %", 40, FAUX).move_to(P(0.85, 0.55))
        self.play(FadeIn(p30, scale=1.3), run_time=0.3)
        jn = jean(0.75).move_to(P(-1.0, 1.0))
        self.au_mot("jean")
        self.play(FadeIn(jn, shift=DOWN * 0.2), run_time=0.35)
        et = gras("50 €", 48, WHITE).move_to(P(0.95, 1.45))
        self.au_mot("50 €")
        self.play(FadeIn(et, scale=1.3), run_time=0.3)
        q = gras("× 0,3 ?", 60, AMBRE).move_to(P(0, -0.85))
        self.au_mot("0,3")
        self.play(FadeIn(q, scale=1.4), run_time=0.4)
        self.play(Wiggle(q, scale_value=1.1, rotation_angle=0.05), run_time=0.6)
        self.attendre_voix(marge=0.2)

        # ── 01 : Non ! × 0,3 : 15 € (on garde 30 %) ; − 30 % : il reste 70 % : 35 € ──
        self.dire("01-image")
        non = gras("Non !", 48, ROUGE_ERREUR).move_to(P(-1.05, 1.95))
        self.au_mot("Non")
        self.play(FadeOut(q), FadeOut(jn), FadeOut(p30), et.animate.scale(0.75).move_to(P(1.05, 1.95)),
                  FadeIn(non, scale=1.4), run_time=0.35)
        b1 = barre_s(3.2, 0.5, P(0, 1.2))
        L1 = self.lg([("× 0,3", FAUX), ("→ 15 €", FAUX)], 0.6, 38)
        self.au_mot("Fois 0,3")
        self.play(FadeIn(b1, shift=UP * 0.15), FadeIn(L1[0], scale=1.2), run_time=0.3)
        self.play(*self.garder_seulement(b1, 3), run_time=0.4)
        self.au_mot("15 €")
        self.play(FadeIn(L1[1], scale=1.2), run_time=0.3)
        trait = Line(L1.get_left() + LEFT * 0.1, L1.get_right() + RIGHT * 0.1, color=ROUGE_ERREUR, stroke_width=6)
        self.play(Create(trait), run_time=0.25)
        b2 = barre_s(2.6, 0.5, P(-0.4, -0.25))
        tr, m = retire_s(b2, 3)
        L2 = self.lg([("− 30 % :", FAUX), ("reste 70 %", VERT_OK)], -0.85, 34)
        self.au_mot("Moins 30")
        self.play(FadeIn(b2, shift=UP * 0.15), FadeIn(L2[0], scale=1.2), FadeIn(tr), FadeIn(m), run_time=0.3)
        self.play(m.animate.shift(RIGHT * 0.95 + DOWN * 0.05).set_opacity(0.5), run_time=0.35)
        self.au_mot("reste 70")
        self.play(FadeIn(L2[1], scale=1.2), run_time=0.3)
        L3 = self.lg([("50 × 0,7", VERT_OK), ("= 35 €", VERT_OK)], -1.55, 34)
        self.au_mot("50 fois")
        self.play(FadeIn(L3[0], scale=1.2), run_time=0.3)
        self.au_mot("35")
        self.play(FadeIn(L3[1], scale=1.3), run_time=0.3)
        self.play(Create(SurroundingRectangle(L3, color=VERT_OK, buff=0.08, corner_radius=0.1, stroke_width=4)),
                  run_time=0.4)
        self.attendre_voix(marge=0.3)
        self.play(*[FadeOut(m_) for m_ in self.mobjects if all(m_ is not k for k in garder)], run_time=0.3)

        # ── 02 : la question-pause (3 s) : − 10 % = × 0,9 (A) ──
        choix = [self.t("0,9", 30), self.t("0,1", 30), self.t("1,1", 30)]
        for c in choix:
            for f in c.get_family():
                f._pas_audit = True
        self.question_pause("02-question", "02b-reponse", ["Moins 10 %, c'est fois :"], choix, 0,
                            ["Il reste 90 % = 0,9."], mot_q="Moins 10", autres_r=self._rep_q)
        self.play(*[FadeOut(m_) for m_ in self.mobjects if all(m_ is not k for k in (titre, badge))], run_time=0.3)

        # ── 03 : la question en commentaire (sans Ti-Margo, règle du 17/11) ──
        self.dire("03-commentaire")
        q1 = gras("À toi :", 44, AMBRE).move_to(P(0, 2.0))
        self.au_mot("À toi")
        self.play(FadeIn(q1, shift=DOWN * 0.15), run_time=0.3)
        b3 = barre_s(2.4, 0.55, P(-0.75, 1.05))
        tr3, m3 = retire_s(b3, 4.5)
        L3 = self.lg([("− 45 %", FAUX), ("= × ?", AMBRE)], 0.2, 56)
        self.au_mot("moins 45")
        self.play(FadeIn(b3), FadeIn(tr3), FadeIn(m3), FadeIn(L3[0], scale=1.3), run_time=0.35)
        self.play(m3.animate.shift(RIGHT * 1.23).set_opacity(0.5), run_time=0.3)  # hors de la barre
        self.au_mot("fois combien")
        self.play(FadeIn(L3[1], scale=1.3), run_time=0.35)
        appel_commentaire(self, y=-1.2)
        self.attendre_voix(marge=0.6)
        ecran_fin(self, "short", voix="04-abonne")
