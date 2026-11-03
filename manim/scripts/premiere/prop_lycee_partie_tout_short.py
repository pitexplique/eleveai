# prop_lycee_partie_tout_short.py
# EleveAI — Maths 1re (automatismes) — short jumeau de l'épisode 04 « Calculer
# une partie connaissant le tout » (micro auto_prop_partie_connaissant_tout,
# notion auto_partie_tout). CEINTURE BLANCHE (règle du short blanc, REGLES.md) :
# on VOIT la partie se remplir. Il AMUSE : « Ta mise à jour fait 60 Go… »
#   · EN HAUT, l'image qui bouge : la fenêtre de téléchargement d'une mise à
#     jour de 60 Go, la barre qui avance jusqu'à 35 % ;
#   · EN BAS, au même instant, le calcul se remplit : 35 % = 0,35 ;
#     0,35 × 60 = 21 Go ; code couleur partagé : le VERT de la barre = les Go
#     déjà là, l'ORANGE = ce qui reste ;
#   · 1 question-pause (3 s) : à 45 % → 27 Go (15 Go = 60 − 45, 105 Go = 60 + 45) ;
#   · fin : à 35 %, il reste 65 % : combien de Go ? (39 Go) en commentaire.
# Centre d'intérêt : jeux-video (aucune marque : une manette dessinée, générique).
# Chiffres : une mise à jour de jeu de 60 Go, plausible, inventée : pas de source.
#
# Voix : manim/voix/premiere-prop-partie-tout-short.json (validée par Frédéric
# le 02/11, débit −10) ; WAV : public/sons/premiere-prop-partie-tout-short/ ;
# marques : manim/scripts/premiere/prop_lycee_partie_tout_short_marques.json.
# Outils (non modifiés) : prop_commun.py (ShortProp), canvas_proportion.py.
# Ajouté ICI : manette(), Fenetre (la fenêtre de téléchargement et sa barre).
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/premiere/prop_lycee_partie_tout_short.py PropLyceePartieToutShort
# PYTHONIOENCODING=utf-8 python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/prop_lycee_partie_tout_short.py PropLyceePartieToutShort -o eleveai-maths-premiere-prop-partie-tout-short --media_dir manim/scripts/premiere/media-prop-lycee-partie-tout-short
# Sortie : manim/sorties/premiere/maths/proportionnalite/04-partie-tout/eleveai-maths-premiere-prop-partie-tout-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))  # le dossier du script EN TÊTE

from prop_commun import *  # noqa: E402,F403

PLEIN = "#22c55e"      # les Go déjà téléchargés (vert)
RESTE = "#fb923c"      # ce qui reste à télécharger (orange)
PISTE = "#1e293b"


def pas_audit(m):
    """Décor ou donnée redite : sans synchro ni audit (toute la famille de m)."""
    for f in m.get_family():
        f._pas_audit = True
        f.sans_synchro = True
    return m


def manette(s=1.0):
    """Une manette de jeu générique (aucune marque) : corps, deux poignées, croix, boutons."""
    corps = RoundedRectangle(width=1.0, height=0.5, corner_radius=0.2, fill_color="#64748b", fill_opacity=1,
                             stroke_width=0)
    poignees = VGroup(*[Circle(radius=0.22, fill_color="#64748b", fill_opacity=1, stroke_width=0)
                        .move_to(P(dx, -0.17)) for dx in (-0.36, 0.36)])
    croix = VGroup(Rectangle(width=0.22, height=0.07, fill_color="#0f172a", fill_opacity=1, stroke_width=0),
                   Rectangle(width=0.07, height=0.22, fill_color="#0f172a", fill_opacity=1, stroke_width=0))
    croix.move_to(P(-0.27, 0.02))
    boutons = VGroup(*[Dot(P(0.27 + dx, 0.02 + dy), radius=0.04, color=c)
                       for dx, dy, c in ((0.08, 0, "#22c55e"), (-0.08, 0, "#ef4444"), (0, 0.08, "#facc15"),
                                         (0, -0.08, "#38bdf8"))])
    return VGroup(poignees, corps, croix, boutons).scale(s)


class Fenetre(VGroup):
    """La fenêtre de téléchargement : la manette, « Mise à jour », le total, la
    barre (piste sombre) ; .remplissage(k) → un rectangle vert de k (0 à 1) de la
    piste ; rien n'est ajouté à la scène."""

    def __init__(self, total="60 Go", centre=P(0, 1.1), largeur=4.0, hauteur=2.1, **kw):
        super().__init__(**kw)
        self.cadre = RoundedRectangle(width=largeur, height=hauteur, corner_radius=0.18, fill_color="#0b1220",
                                      fill_opacity=1, stroke_color="#94a3b8", stroke_width=3).move_to(centre)
        y0 = self.cadre.get_top()[1] - 0.38
        self.icone = manette(0.5).move_to(P(self.cadre.get_left()[0] + 0.45, y0))
        self.total = Text(total, font_size=28, color=JAUNE_TITRE, weight=BOLD).move_to(P(0, y0))
        self.total.align_to(P(self.cadre.get_right()[0] - 0.22, 0), RIGHT)
        self.titre = Text("Mise à jour", font_size=24, color=WHITE).next_to(self.icone, RIGHT, buff=0.15)
        place = self.total.get_left()[0] - 0.2 - self.titre.get_left()[0]
        if self.titre.width > place:  # jamais sur « 60 Go »
            g = self.titre.get_left()[0]
            self.titre.scale_to_fit_width(place).align_to(P(g, 0), LEFT)
        self.lp = largeur - 0.5
        self.piste = RoundedRectangle(width=self.lp, height=0.42, corner_radius=0.08, fill_color=PISTE,
                                      fill_opacity=1, stroke_color="#475569", stroke_width=2)
        self.piste.move_to(P(centre[0], y0 - 0.62))
        self.add(self.cadre, self.icone, self.titre, self.total, self.piste)

    def remplissage(self, k, couleur=PLEIN, depuis=0.0):
        li = self.lp - 0.08
        r = Rectangle(width=max(li * (k - depuis), 1e-3), height=0.34, stroke_width=0, fill_color=couleur,
                      fill_opacity=1)
        return r.move_to(self.piste).align_to(P(self.piste.get_left()[0] + 0.04 + li * depuis, 0), LEFT)


class PropLyceePartieToutShort(ShortProp):
    nom_voix = "premiere-prop-partie-tout-short"
    fichier_marques = "prop_lycee_partie_tout_short_marques.json"
    ceinture = "blanche"

    # Défauts repris le 03/11 : la phrase de réponse de la question-pause en
    # 28 (au lieu de 26, réduite), lisible depuis le fond de la classe.
    def question_pause(self, *a, **k):
        self._en_q = True
        try:
            return super().question_pause(*a, **k)
        finally:
            self._en_q = False

    def bloc(self, lignes, fs=30, color=WHITE, buff=0.1):
        if getattr(self, "_en_q", False):
            fs = max(fs, 28)
        return super().bloc(lignes, fs, color, buff)

    def ligne_rep(self, i, morceaux, fs=None):
        lg = self.ligne([(m, VERT_OK) for m in morceaux], fs or 28, buff=0.14)
        if lg.width > config.frame_width - 0.4:
            lg.scale_to_fit_width(config.frame_width - 0.4)
        return lg.move_to(self.ph_q[i])

    def mini_barre(self, k, y=-2.75, largeur=3.6):
        """La barre de téléchargement seule (pendant la question), remplie à k."""
        piste = RoundedRectangle(width=largeur, height=0.36, corner_radius=0.08, fill_color=PISTE, fill_opacity=1,
                                 stroke_color="#475569", stroke_width=2).move_to(P(0, y))
        li = largeur - 0.08
        r = Rectangle(width=li * k, height=0.28, stroke_width=0, fill_color=PLEIN, fill_opacity=1)
        r.move_to(piste).align_to(P(piste.get_left()[0] + 0.04, 0), LEFT)
        return piste, r, li

    def _rep_q(self, sc):
        lg = sc.ligne_rep(0, ["0,45 ×", "60 =", "27 Go."])
        piste, r, li = self.mb
        r45 = Rectangle(width=li * 0.45, height=0.28, stroke_width=0, fill_color=PLEIN, fill_opacity=1)
        r45.move_to(piste).align_to(r, LEFT)
        t45 = pas_audit(Text("45 %", font_size=20, color=NUIT, weight=BOLD)).move_to(r45)
        sc.au_mot("0,45 fois")
        sc.play(FadeIn(lg[0], shift=UP * 0.12), Transform(r, r45), FadeIn(t45), run_time=0.35)
        sc.au_mot("fois 60")
        sc.play(FadeIn(lg[1], shift=UP * 0.12), run_time=0.3)
        sc.au_mot("27 gigas")
        sc.play(FadeIn(lg[2], scale=1.3), Indicate(r, color=PLEIN), run_time=0.4)
        sc.rep_fini()

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("La mise à jour", self.ceinture)
        titre.sans_synchro = True  # le titre de la vidéo : posé d'un bloc
        self.add(badge)
        garder = [margo, titre, badge]
        fe = Fenetre("60 Go")
        pas_audit(VGroup(fe.titre))

        # ── 00 : l'accroche : 60 Go, la barre avance jusqu'à 35 % ──
        self.dire("00-accroche")
        self.au_mot("Ta mise à jour")
        self.play(Write(titre), FadeIn(VGroup(fe.cadre, fe.icone, fe.titre, fe.piste), shift=DOWN * 0.2),
                  run_time=0.6)
        self.au_mot("60 gigas")
        self.play(FadeIn(fe.total, scale=1.4), run_time=0.35)
        r35 = fe.remplissage(0.35)
        self.au_mot("La barre")
        self.play(GrowFromEdge(r35, LEFT), run_time=1.0, rate_func=linear)
        t35 = Text("35 %", font_size=22, color=NUIT, weight=BOLD).move_to(r35)
        self.au_mot("35 %")
        self.play(FadeIn(t35, scale=1.4), run_time=0.3)
        q = self.ligne([("Déjà là :", PLEIN), ("? Go", AMBRE)], 44).move_to(P(0, -0.8))
        self.au_mot("Combien")
        self.play(FadeIn(q, scale=1.2), run_time=0.4)
        self.insister(q[1], 1.08)
        self.attendre_voix(marge=0.2)

        # ── 01 : 35 % = 0,35 ; 0,35 × 60 = 21 Go, la barre et le calcul ensemble ──
        self.dire("01-image")
        l1 = self.ligne([("35 % =", WHITE), ("0,35", AMBRE)], 44).move_to(P(0, -0.45))
        self.au_mot("35 %, c'est")
        self.play(FadeOut(q), FadeIn(l1[0], shift=RIGHT * 0.12), Indicate(t35, color=WHITE),
                  run_time=0.35)
        self.au_mot("0,35.")
        self.play(FadeIn(l1[1], scale=1.3), run_time=0.3)
        l2 = self.ligne([("0,35 ×", AMBRE), ("60", JAUNE_TITRE)], 44).move_to(P(0, -1.3))
        self.au_mot("0,35 fois")
        self.play(FadeIn(l2[0], shift=RIGHT * 0.12), Circumscribe(r35, color=AMBRE, buff=0.04), run_time=0.4)
        self.au_mot("fois 60")
        self.play(FadeIn(l2[1], shift=RIGHT * 0.12), Indicate(fe.total, color=JAUNE_TITRE), run_time=0.4)
        br = Brace(r35, DOWN, buff=0.1, color=PLEIN)
        tb = Text("21 Go", font_size=26, color=PLEIN, weight=BOLD).next_to(br, DOWN, buff=0.05)
        l3 = self.ligne([("=", WHITE), ("21 Go", PLEIN)], 60).move_to(P(0, -2.25))
        self.au_mot("égale 21")
        self.play(FadeIn(l3, scale=1.3), GrowFromCenter(br), FadeIn(tb, scale=1.3), run_time=0.45)
        self.play(Create(SurroundingRectangle(l3[1], color=PLEIN, buff=0.1, corner_radius=0.1)), run_time=0.3)
        self.insister(l3[1], 1.15)
        self.attendre_voix(marge=0.3)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        # ── 02 : la question-pause (3 s) : à 45 % ──
        self.mb = piste, r, li = self.mini_barre(0.35)

        def avant(sc):
            sc.play(FadeIn(piste), FadeIn(r), run_time=0.3)

        self.question_pause("02-question", "02b-reponse", ["La barre affiche 45 %.", "Combien de Go ?"],
                            [self.t("27 Go", 30), self.t("15 Go", 30), self.t("105 Go", 30)], 0,
                            ["0,45 × 60 = 27 Go."], mot_q="La barre", avant_q=avant, autres_r=self._rep_q)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        # ── 03 : la question en commentaire : il reste 65 % ──
        self.dire("03-commentaire")
        fe2 = pas_audit(Fenetre("60 Go"))
        p35 = fe2.remplissage(0.35)
        self.au_mot("À toi")
        self.play(FadeIn(fe2, shift=DOWN * 0.2), run_time=0.4)
        t2 = Text("35 %", font_size=22, color=NUIT, weight=BOLD).move_to(p35)
        self.au_mot("à 35")
        self.play(GrowFromEdge(p35, LEFT), FadeIn(t2), run_time=0.5)
        p65 = fe2.remplissage(1.0, RESTE, depuis=0.35)
        t65 = Text("65 %", font_size=22, color=NUIT, weight=BOLD).move_to(p65)
        l1 = self.ligne([("Il reste", WHITE), ("65 %", RESTE)], 44).move_to(P(0, -0.45))
        self.au_mot("il reste")
        self.play(FadeIn(l1[0], shift=RIGHT * 0.12), run_time=0.3)
        self.au_mot("65 %")
        self.play(FadeIn(l1[1], scale=1.3), GrowFromEdge(p65, LEFT), FadeIn(t65), run_time=0.5)
        l2 = self.ligne([("?", AMBRE), ("Go", RESTE)], 60).move_to(P(0, -1.3))
        self.au_mot("Combien")
        self.play(FadeIn(l2, scale=1.3), run_time=0.4)
        self.insister(l2[0], 1.4)
        self.appel_commentaire(y=-2.25)
