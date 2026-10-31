# prop_pourcentage_comprendre_short.py
# EleveAI — Maths 6e — short jumeau de l'épisode 11 « Comprendre un
# pourcentage » (micro pourcentage_comprendre). CEINTURE BLANCHE (règle du
# short blanc, REGLES.md) : on VOIT la notion, aucun calcul posé.
# Il AMUSE : « Ton téléphone affiche 1 %. Il reste combien ? »
#   · EN HAUT, l'image : la batterie du téléphone (100 petits traits), son
#     pourcentage écrit dedans ;
#   · EN BAS, au même instant, les 100 cases (BarrePourcent, mode « cases ») :
#     1 % = 1 case rouge ; 100 % = les 100 cases vertes, la batterie se remplit
#     EN MÊME TEMPS que les cases ;
#   · 1 question-pause (3 s) : 50 % = la moitié (leurres : « 50 cases sur
#     50 », l'erreur 6 du lot ; « 5 cases ») ; la petite batterie se remplit
#     à moitié pendant la réponse ;
#   · fin : « La batterie affiche 75 %. Combien de cases sont vides ? » (25)
#     en commentaire.
# Centres d'intérêt : technologie-ia. Aucune donnée réelle citée.
# Ajouté ICI (absent du module) : Batterie (cadre, borne, 100 traits, niveau
# animé d'une valeur à une autre, couleur rouge sous 20 %) — BarrePourcent
# « chargement » ne sait aller que de 0 à sa valeur, d'une seule couleur, et
# pose son étiquette À DROITE (hors du cadre étroit d'un short) ; pastille()
# (« Presque vide ! », « Pleine ! » posés sur la grille, fond sombre).
#
# Voix : manim/voix/6e-prop-pourcentage-comprendre-short.json (validée, débit
# −10) ; marques : manim/scripts/6e/prop_pourcentage_comprendre_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/6e/prop_pourcentage_comprendre_short.py PropPourcentageComprendreShort6e
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/prop_pourcentage_comprendre_short.py PropPourcentageComprendreShort6e -o eleveai-maths-6e-prop-pourcentage-comprendre-short --media_dir manim/media-prop-11
# Sortie : manim/sorties/6e/maths/proportionnalite/11-pourcentage-comprendre/eleveai-maths-6e-prop-pourcentage-comprendre-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403

V_BAT = "#22c55e"
R_BAT = "#ef4444"


class Batterie(VGroup):
    """La batterie d'un téléphone : cadre arrondi, borne, remplissage, 100
    petits traits (un trait plus fort toutes les 10 cases), le pourcentage
    écrit dedans (.etiquette, posée au mot par la scène)."""

    def __init__(self, largeur=2.9, hauteur=0.8, centre=ORIGIN, **kw):
        super().__init__(**kw)
        self.L, self.H, self.p = largeur, hauteur, 0
        self.piste = RoundedRectangle(width=largeur, height=hauteur, corner_radius=0.14, fill_color="#1e293b",
                                      fill_opacity=1, stroke_color="#cbd5e1", stroke_width=5)
        self.borne = RoundedRectangle(width=0.14, height=hauteur * 0.42, corner_radius=0.04, fill_color="#cbd5e1",
                                      fill_opacity=1, stroke_width=0).next_to(self.piste, RIGHT, buff=0.03)
        self.g = -largeur / 2 + 0.08
        self.w = largeur - 0.16
        self.plein = Rectangle(width=0.01, height=hauteur - 0.16, fill_color=V_BAT, fill_opacity=0, stroke_width=0)
        self.plein.move_to(P(self.g + 0.005, 0))
        traits = VGroup()
        for i in range(1, 100):
            x = self.g + self.w * i / 100
            fort = i % 10 == 0
            traits.add(Line(P(x, -(hauteur - 0.16) / 2), P(x, (hauteur - 0.16) / 2), color="#64748b" if fort else "#334155",
                            stroke_width=2.5 if fort else 1.0))
        self.traits = traits
        self.add(self.piste, self.plein, self.traits, self.borne)
        self.move_to(centre)

    def _rect(self, p, couleur):
        w = max(0.01, self.w * p / 100)
        r = Rectangle(width=w, height=self.H - 0.16, fill_color=couleur, fill_opacity=1 if p > 0 else 0,
                      stroke_width=0)
        return r.move_to(self.piste.get_center() + RIGHT * (-self.w / 2 + w / 2))

    def niveau(self, p, couleur=None, run_time=1.0):
        """Animation : le remplissage va du niveau actuel jusqu'à p (en %)."""
        p0, self.p = self.p, p
        c = couleur or (R_BAT if p <= 20 else V_BAT)

        def maj(m, a):
            m.become(self._rect(p0 + (p - p0) * a, c))

        return UpdateFromAlphaFunc(self.plein, maj, run_time=run_time, rate_func=smooth)

    def texte(self, s, fs=40):
        """Le pourcentage écrit au milieu de la batterie (Text, à poser au mot)."""
        t = Text(s, font_size=fs, color=WHITE, weight=BOLD)
        t.set_stroke("#0f172a", 5, background=True)
        return t.move_to(self.piste)


def pastille(s, couleur, fs=34):
    """Un mot posé sur la grille, sur un fond sombre arrondi."""
    t = Text(s, font_size=fs, color=couleur, weight=BOLD)
    fond = RoundedRectangle(width=t.width + 0.4, height=t.height + 0.3, corner_radius=0.15, fill_color="#0b1220",
                            fill_opacity=0.92, stroke_color=couleur, stroke_width=4)
    return VGroup(fond, t.move_to(fond))


class PropPourcentageComprendreShort6e(ShortProp):
    nom_voix = "6e-prop-pourcentage-comprendre-short"
    fichier_marques = "prop_pourcentage_comprendre_short_marques.json"
    ceinture = "blanche"
    Y_BAT = 1.72      # la batterie, dans la bande du haut
    Y_TXT = 0.92      # la ligne de texte, entre la batterie et la grille

    def _carte_choix(self, lettre, txt, largeur, fs):
        """Celle de prop_tableau_short.py (0,6 de haut) : trois cartes, la
        phrase de réponse ET la petite batterie tiennent au-dessus de Ti-Margo."""
        rond = Circle(radius=0.26 * fs / 34, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
        l = Text(lettre, font_size=fs, color=WHITE, weight=BOLD).move_to(rond)
        corps = txt if isinstance(txt, Mobject) else Text(txt, font_size=fs, color=WHITE)
        ligne = VGroup(VGroup(rond, l), corps).arrange(RIGHT, buff=0.25)
        if ligne.width > largeur - 0.4:
            ligne.scale_to_fit_width(largeur - 0.4)
        cadre = RoundedRectangle(width=largeur, height=max(0.56, ligne.height + 0.18), corner_radius=0.14,
                                 stroke_color=BLEU_CALCUL, stroke_width=3, fill_color="#0b1220", fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return VGroup(cadre, ligne)

    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        for f in rebours.get_family():
            if isinstance(f, Text):
                f.sans_synchro = True  # le « 3 » du compte à rebours n'attend pas la voix
        return tete, q, cartes, pause, rebours, ph

    def ligne_txt(self, morceaux, fs=34):
        return self.ligne(morceaux, fs).move_to(P(0, self.Y_TXT))

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Ta batterie en cases", self.ceinture)
        titre.sans_synchro = True  # le titre est là d'entrée (« batterie » n'est dit qu'à l'écran 01)
        self.add(badge)
        bat = Batterie(centre=P(-0.07, self.Y_BAT))
        bp = BarrePourcent(1, mode="cases", cote=0.26, couleur=R_BAT, etiquette=False).vide()
        g = bp.grille
        self.caser_bas(bp)
        bp.shift(DOWN * 0.3)

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au_mot("téléphone")
        self.play(Write(titre), FadeIn(bat, shift=DOWN * 0.2), run_time=0.6)
        self.au_mot("1 %")
        e1 = bat.texte("1 %")
        self.play(bat.niveau(1, run_time=0.4), FadeIn(e1, scale=1.4), run_time=0.4)
        self.play(Indicate(bat.plein, color=R_BAT, scale_factor=2.0), run_time=0.5)
        self.au_mot("combien")
        q = Text("?", font_size=150, color=AMBRE, weight=BOLD).move_to(P(0, -1.0))
        self.play(FadeIn(q, scale=0.4), run_time=0.4)
        self.insister(q, 1.2)
        self.attendre_voix(marge=0.2)

        # ── 01 : 100 petites cases ; 1 % = 1 case ──
        self.dire("01-batterie")
        self.au_mot("batterie")
        self.play(FadeOut(q), Indicate(bat.piste, color=AMBRE, scale_factor=1.06), run_time=0.5)
        self.au_mot("100 petites")
        l0 = self.ligne_txt([("100 petites cases", WHITE)])
        self.play(bp.grille.apparaitre(1.0), FadeIn(l0, shift=UP * 0.1),
                  LaggedStart(*[Indicate(t, color=AMBRE, scale_factor=1.0) for t in bat.traits[::9]],
                              lag_ratio=0.05), run_time=1.1)
        self.au_mot("1 %, c'est")
        l1 = self.ligne_txt([("1 %", R_BAT), ("= 1 case", WHITE), ("sur 100", WHITE)])
        self.play(FadeOut(l0), FadeIn(l1[0], scale=1.3), run_time=0.35)
        self.au_mot("1 case")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.15), bp.remplir(run_time=0.3),
                  Indicate(bat.plein, color=R_BAT, scale_factor=2.0), run_time=0.3)
        self.play(Indicate(g.liste[0], color=R_BAT, scale_factor=2.2), run_time=0.3)
        self.au_mot("sur 100")
        self.play(FadeIn(l1[2], shift=RIGHT * 0.15), Indicate(g.liste, color=WHITE, scale_factor=1.03), run_time=0.5)
        self.au_mot("Presque vide")
        pv = pastille("Presque vide !", R_BAT, fs=30).move_to(g.liste.get_center() + DOWN * 0.3)
        self.play(FadeIn(pv, scale=1.3), run_time=0.4)
        self.insister(pv, 1.1)
        self.attendre_voix(marge=0.2)

        # ── 02 : 100 % = les 100 cases ──
        self.dire("02-cent")
        e100 = bat.texte("100 %")
        l2 = self.ligne_txt([("100 %", V_BAT), ("= les 100 cases", WHITE)])
        self.au_mot("100 %")
        self.play(FadeOut(pv), FadeOut(l1), FadeOut(e1), FadeIn(l2[0], scale=1.3), FadeIn(e100, scale=1.3),
                  run_time=0.4)
        self.au_mot("100 cases")
        self.play(FadeIn(l2[1], shift=RIGHT * 0.15), run_time=0.3)
        self.play(g.colorier(range(100), couleur=V_BAT, lag=0.012, run_time=1.6), bat.niveau(100, run_time=1.6),
                  run_time=1.6)
        self.au_mot("pleine")
        pl = pastille("Pleine !", V_BAT, fs=40).move_to(g.liste)
        self.play(FadeIn(pl, scale=1.3), run_time=0.4)
        self.insister(pl, 1.12)
        self.attendre_voix(marge=0.2)

        # ── 03 : la question-pause (3 s) : 50 % ──
        garder = [margo, titre, badge]
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)
        mini = Batterie(largeur=2.4, hauteur=0.62, centre=P(-0.07, -2.45))
        e50 = mini.texte("50 %", 32)

        def rep(sc):
            lr = sc.ligne_rep(0, ["50 cases", "sur 100 :", "la moitié."])
            sc.au_mot("50 cases")
            sc.play(FadeIn(lr[0], shift=UP * 0.12), FadeIn(mini, scale=0.9), FadeIn(e50, scale=1.3),
                    mini.niveau(50, run_time=0.8), run_time=0.8)
            sc.au_mot("sur 100")
            sc.play(FadeIn(lr[1], shift=UP * 0.12), run_time=0.3)
            sc.au_mot("la moitié")
            sc.play(FadeIn(lr[2], shift=UP * 0.12), Indicate(mini.plein, color=V_BAT, scale_factor=1.15), run_time=0.5)
            sc.rep_fini()

        self.question_pause("03-question", "03b-reponse", ["La batterie affiche 50 %.", "Elle est remplie à…"],
                            [self.t("la moitié", 30), self.t("50 cases sur 50", 30), self.t("5 cases", 30)], 0,
                            ["50 cases sur 100 : la moitié."], mot_q="La batterie", autres_r=rep)

        # ── 04 : la question en commentaire ──
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)
        self.dire("04-commentaire")
        grande = Batterie(largeur=3.6, hauteur=1.0, centre=P(-0.08, 1.35))
        self.au_mot("La batterie")
        self.play(FadeIn(grande, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("75 %")
        e75 = grande.texte("75 %", 46)
        self.play(grande.niveau(75, run_time=1.0), FadeIn(e75, scale=1.3), run_time=1.0)
        self.au_mot("Combien")
        cq = VGroup(self.t("Combien de cases", 38, AMBRE), self.t("sont vides ?", 38, AMBRE)).arrange(DOWN, buff=0.15)
        self.borne(cq).move_to(P(0, -0.15))
        self.play(FadeIn(cq[0], shift=UP * 0.15), run_time=0.35)
        self.au_mot("vides")
        vides = VGroup(*[t for t in grande.traits[74:]])
        self.play(FadeIn(cq[1], shift=UP * 0.15), Indicate(vides, color=AMBRE, scale_factor=1.0),
                  Circumscribe(VGroup(grande.traits[74], grande.borne), color=AMBRE), run_time=0.7)
        self.appel_commentaire(y=-1.35)
