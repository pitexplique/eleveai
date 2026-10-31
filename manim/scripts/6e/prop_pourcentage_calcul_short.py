# prop_pourcentage_calcul_short.py
# EleveAI — Maths 6e — short jumeau de l'épisode 13 « Calculer un pourcentage
# simple » (micro pourcentage_calcul_simple). CEINTURE BLANCHE (règle du short
# blanc, REGLES.md) : un seul geste, on le VOIT. Il AMUSE : « 10 % en 1 seconde ».
#   · EN HAUT, l'image qui bouge : un CHRONO dont l'aiguille fait un tour
#     (1 seconde) à chaque calcul, et la pastille « ÷ 10 » ;
#   · EN BAS, au même instant, le tableau de numération M C D U : chaque
#     chiffre GLISSE d'un rang vers la droite (÷ 10 par la valeur des
#     chiffres : jamais « on enlève un zéro ») : 350 → 35, 90 → 9, 2 000 → 200 ;
#   · 1 question-pause (3 s) : 10 % de 70 ? (7 ; 60 = 70 − 10 ; 700 = × 10) ;
#   · fin : « 20 % de 70 ? » (14), réponse en commentaire.
# Centres d'intérêt : jeux-defis. Nombres inventés : aucune source à citer.
# Ajouté ICI (absent du module) : chrono() et TableRangs (le tableau M C D U
# et le glissement d'un rang).
#
# Voix : manim/voix/6e-prop-pourcentage-calcul-short.json (validée, débit −10) ;
# WAV : public/sons/6e-prop-pourcentage-calcul-short/ ; marques :
# manim/scripts/6e/prop_pourcentage_calcul_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/6e/prop_pourcentage_calcul_short.py PropPourcentageCalculShort6e
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/prop_pourcentage_calcul_short.py PropPourcentageCalculShort6e -o eleveai-maths-6e-prop-pourcentage-calcul-short --media_dir manim/media-prop-13
# Sortie : manim/sorties/6e/maths/proportionnalite/13-pourcentage-calcul/eleveai-maths-6e-prop-pourcentage-calcul-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403

Y_IMG = 1.3     # la bande de l'image (chrono)
Y_TXT = 0.12    # la ligne de calcul
Y_TAB = -1.45   # le tableau M C D U


def chrono(r=0.55):
    """Un chronomètre : cadran blanc, 12 graduations, bouton, aiguille rouge.
    .aiguille ; .centre (point) ; tour(scene) : un tour d'aiguille."""
    cadran = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color="#334155", stroke_width=6)
    bouton = VGroup(Rectangle(width=0.12, height=0.14, fill_color="#334155", fill_opacity=1, stroke_width=0)
                    .next_to(cadran, UP, buff=0),
                    RoundedRectangle(width=0.3, height=0.1, corner_radius=0.04, fill_color="#ef4444",
                                     fill_opacity=1, stroke_width=0).next_to(cadran, UP, buff=0.13))
    traits = VGroup(*[Line(P(0, r * 0.78), P(0, r * 0.92), color="#334155", stroke_width=3)
                      .rotate(-k * TAU / 12, about_point=ORIGIN) for k in range(12)])
    aiguille = Line(ORIGIN, P(0, r * 0.75), color="#ef4444", stroke_width=6)
    axe = Dot(ORIGIN, radius=0.05, color="#334155")
    g = VGroup(cadran, bouton, traits, aiguille, axe)
    g.aiguille, g.axe = aiguille, axe
    return g


def tour(c, run_time=0.6):
    """L'aiguille fait un tour complet (1 seconde du chrono)."""
    return Rotate(c.aiguille, angle=-TAU, about_point=c.axe.get_center(), run_time=run_time, rate_func=linear)


class TableRangs(VGroup):
    """Le tableau de numération du coach (carte blanche) : M C D U en tête,
    une ligne de chiffres. chiffres(n) → les Text du nombre (non ajoutés),
    calés à droite dans U ; glisser(textes) → les animations « ÷ 10 » :
    chaque chiffre avance d'un rang, celui des unités sort à droite."""

    def __init__(self, w=0.85, h_tete=0.5, h=0.85, centre=ORIGIN, **kw):
        super().__init__(**kw)
        self.w = w
        noms = ["M", "C", "D", "U"]
        x0 = -2 * w
        grille = VGroup()
        for k in range(5):
            grille.add(Line(P(x0 + k * w, h_tete), P(x0 + k * w, -h)))
        for y in (h_tete, 0, -h):
            grille.add(Line(P(x0, y), P(-x0, y)))
        grille.set_stroke(GRILLE_P, 3)
        tete = VGroup(*[Rectangle(width=w - 0.04, height=h_tete - 0.04, fill_color="#e0f2fe", fill_opacity=1,
                                  stroke_width=0).move_to(P(x0 + (k + 0.5) * w, h_tete / 2)) for k in range(4)])
        self.noms = VGroup(*[texte(n, 28, LIBELLE_P).move_to(P(x0 + (k + 0.5) * w, h_tete / 2))
                             for k, n in enumerate(noms)])
        for t in self.noms:
            t.sans_synchro = t._pas_audit = True
        self.carte = RoundedRectangle(width=4 * w + 0.36, height=h_tete + h + 0.36, corner_radius=0.2,
                                      fill_color=CARTE, fill_opacity=1, stroke_color="#e2e8f0",
                                      stroke_width=3).move_to(P(0, (h_tete - h) / 2))
        self._y = -h / 2
        self._x = [x0 + (k + 0.5) * w for k in range(4)]
        self._o = Dot(ORIGIN, radius=0.001, fill_opacity=0, stroke_width=0)
        self.fond = VGroup(self.carte, tete, grille, self.noms)
        self.add(self.fond, self._o)
        self.move_to(centre)

    def p(self, k):
        o = self._o.get_center()
        return o + P(self._x[k], self._y)

    def chiffres(self, n):
        s = str(n)
        out = VGroup()
        for i, ch in enumerate(s):
            k = 4 - len(s) + i
            t = texte(ch, 46, VALEUR_P).move_to(self.p(k))
            t._pas_audit = t.sans_synchro = True  # le chiffre d'un nombre écrit AU MOT dans la ligne de calcul
            t.rang = k
            out.add(t)
        return out

    def glisser(self, textes):
        anims = []
        for t in textes:
            if t.rang == 3:
                anims.append(FadeOut(t, shift=RIGHT * 0.45))
                t.rang = 4  # sorti du tableau : plus jamais rejoué (Indicate le remettait dans U)
            else:
                anims.append(t.animate.shift(RIGHT * self.w))
                t.rang += 1
        return anims


class PropPourcentageCalculShort6e(ShortProp):
    nom_voix = "6e-prop-pourcentage-calcul-short"
    fichier_marques = "prop_pourcentage_calcul_short_marques.json"
    ceinture = "blanche"

    def calcul(self, n, res, mots, tb, ch, ligne_avant=None):
        """« 10 % de n = res » : n entre dans le tableau, puis au mot « égale »
        l'aiguille fait un tour pendant que chaque chiffre glisse d'un rang."""
        lg = self.ligne([("10 % de", WHITE), (f"{n:,}".replace(",", " "), WHITE), ("=", WHITE),
                         (f"{res:,}".replace(",", " "), VERT_OK)], 32).move_to(P(0, Y_TXT))
        if lg.width > 3.5:
            lg.scale_to_fit_width(3.5)
        m_10, m_n, m_eg, m_res = mots
        dig = tb.chiffres(n)
        self.au_mot(*m_10)
        sortie = [FadeOut(ligne_avant)] if ligne_avant is not None else []
        self.play(*sortie, FadeIn(lg[0], shift=UP * 0.12), run_time=0.3)
        self.au_mot(m_n)
        self.play(FadeIn(lg[1], scale=1.3), LaggedStart(*[FadeIn(d, scale=1.4) for d in dig], lag_ratio=0.15),
                  run_time=0.4)
        self.au_mot(m_eg)
        self.play(FadeIn(lg[2]), tour(ch), *tb.glisser(dig), run_time=0.6)
        self.au_mot(m_res)
        self.play(FadeIn(lg[3], scale=1.4), Indicate(VGroup(*[d for d in dig if d.rang <= 3]), color=VERT_OK),
                  run_time=0.4)
        self.insister(lg[3], 1.15)
        return lg, dig

    def _rep_q(self, sc):
        lg = sc.ligne_rep(0, ["70 ÷", "10 =", "7."])
        for m, mot in zip(lg, ["70 divisé", "par 10", "7."]):
            sc.au_mot(mot)
            sc.play(FadeIn(m, shift=UP * 0.12), run_time=0.25)
        sc.rep_fini()

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("10 % en 1 seconde", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]
        titre.sans_synchro = True  # le titre de la vidéo : posé d'un bloc
        ch = chrono().move_to(P(-1.0, Y_IMG))
        tb = TableRangs(centre=P(0, Y_TAB))

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), run_time=0.6)
        self.au_mot("nombre")
        self.play(FadeIn(tb.fond, shift=UP * 0.2), run_time=0.4)
        self.au_mot("1 seconde")
        s1 = self.t("1 s", 32, WHITE).next_to(ch, RIGHT, buff=0.35)
        self.play(FadeIn(ch, scale=0.7), FadeIn(s1), run_time=0.4)
        self.play(tour(ch, 1.0))
        self.au_mot("Prêt")
        pret = self.t("Prêt ?", 54, JAUNE_TITRE).move_to(P(0, Y_TXT))
        self.play(FadeIn(pret, scale=1.4), run_time=0.35)
        self.insister(pret, 1.2)
        self.attendre_voix(marge=0.2)

        # ── 01 : 10 % = un dixième : ÷ 10 ; 350 → 35 ──
        self.dire("01-astuce")
        l0 = self.ligne([("10 %", WHITE), ("= un dixième", JAUNE_TITRE)], 36).move_to(P(0, Y_TXT))
        self.au_mot("10 %")
        self.play(FadeOut(pret), FadeOut(s1), FadeIn(l0[0], shift=UP * 0.12), run_time=0.3)
        self.au_mot("un dixième")
        self.play(FadeIn(l0[1], shift=RIGHT * 0.15), run_time=0.35)
        pas = VGroup(RoundedRectangle(width=1.5, height=0.75, corner_radius=0.16, fill_color="#1e293b",
                                      fill_opacity=1, stroke_color=AMBRE, stroke_width=5))
        pas.add(Text("÷ 10", font_size=40, color=AMBRE, weight=BOLD).move_to(pas[0]))
        pas.move_to(P(0.85, Y_IMG))
        self.au_mot("par 10")
        self.play(FadeIn(pas, scale=1.4), run_time=0.35)
        self.insister(pas, 1.2)
        lg, dig = self.calcul(350, 35, [("10 %", 2), "350", "égale", "35."], tb, ch, ligne_avant=l0)
        self.attendre_voix(marge=0.2)

        # ── 02 : encore : 90 → 9 ; 2 000 → 200 ──
        self.dire("02-encore")
        self.play(FadeOut(VGroup(*[d for d in dig if d.rang <= 3])), run_time=0.2)
        lg2, dig2 = self.calcul(90, 9, [("10 %", 1), "90", "égale", "9. 10"], tb, ch, ligne_avant=lg)
        self.play(FadeOut(VGroup(*[d for d in dig2 if d.rang <= 3])), run_time=0.2)
        lg3, dig3 = self.calcul(2000, 200, [("10 %", 2), "2 000", "égale 200", "200"], tb, ch, ligne_avant=lg2)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 03 : la question-pause (3 s) ──
        self.question_pause("03-question", "03b-reponse", ["10 % de 70 ?"],
                            [self.t("7", 30), self.t("60", 30), self.t("700", 30)], 0,
                            ["70 ÷ 10 = 7."], mot_q="10 %", autres_r=self._rep_q)
        self.vider(garder)

        # ── 04 : la question en commentaire ──
        self.dire("04-commentaire")
        ch2 = chrono().move_to(P(0, Y_IMG))
        self.au_mot("Et toi")
        self.play(FadeIn(ch2, scale=0.7), run_time=0.4)
        self.play(tour(ch2, 0.8))
        self.au_mot("Combien")
        r = self.bloc(["Combien font"], 32).move_to(P(0, 0.2))
        self.play(FadeIn(r, shift=UP * 0.15), run_time=0.35)
        self.au_mot("20 %")
        qh = self.ligne([("20 % de", BLEU_CALCUL), ("70", BLEU_CALCUL), ("?", AMBRE)], 44).move_to(P(0, -0.6))
        if qh.width > 3.6:
            qh.scale_to_fit_width(3.6)
        self.play(FadeIn(qh[0], scale=1.2), run_time=0.3)
        self.au_mot("70")
        self.play(FadeIn(qh[1], scale=1.3), FadeIn(qh[2], scale=1.3), run_time=0.3)
        self.insister(qh, 1.1)
        self.appel_commentaire(y=-1.6)
