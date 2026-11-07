# relatif_commun.py
# EleveAI — Maths 4e — série « Opérations sur les relatifs » (07/11/2026) : les OUTILS
# COMMUNS des paysages. Pas de scène ici. Les shorts sont des dessins animés Ti Margo 3D
# (prototypes/ti-margo-relatifs.html), pas du Manim.
#
# CODE COULEUR : négatif orange, positif bleu ciel, juste vert, piège rouge.
# F("(−4) × 3 = −12", 56) : une formule, le signe moins et son nombre en orange.
# self.dit(ligne, "phrase") : mot à mot sans zoom. self.dire_eq(F(...), "phrase") : avec zoom.
# Rien n'est dit pour un atome ? Il part avec son voisin (voir equation_commun).
# TableSignes, Glacier, Frise, Droite : les figures. signe("−") : le jeton rond.
# self.reponse((texte, phrase), …) : dans autres_r d'une question-pause.
# self.page_abonnement(cle) : la fin du 05/11.
#
# Marques : powershell scripts/marques_dump.ps1 -Fichier <voix.json> -Sortie <tmp> -Debit -6,
# puis python manim/scripts/4e/equation_commun.py <voix.json> <tmp>.cues.tsv <script>_marques.json

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from equation_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from equation_defi import E, _OutilsDefi  # noqa: E402
from equation_probleme import _OutilsProbleme  # noqa: E402

PAROLE.setdefault("0", "zéro")

NEG = ORANGE_RETENUE
POS = "#7dd3fc"
GLACE = "#bae6fd"
ROCHE = "#475569"
FOND_CARTE = "#0b1220"


def F(s, fs=56, couleur=WHITE, audit=True):
    """Une formule : le moins d'un nombre négatif et ce nombre sont orange."""
    e = E(s, fs, couleur, lettres="", audit=audit)
    a = e.atomes
    for i, x in enumerate(a):
        if x.original_text == "−" and (i == 0 or a[i - 1].original_text in "(=:") and i + 1 < len(a):
            x.set_color(NEG)
            a[i + 1].set_color(NEG)
    return e


def signe(s, r=0.34, fs=48):
    """Le jeton rond d'un signe."""
    c = NEG if s == "−" else POS
    rond = Circle(radius=r, stroke_color=c, stroke_width=5, fill_color=FOND_CARTE, fill_opacity=1)
    return VGroup(rond, T(s, fs, c, audit=False, gras=True).move_to(rond))


class TableSignes(VGroup):
    """La table des signes : .val[(ligne, colonne)] (0 = +, 1 = −), posées par le script."""

    def __init__(self, cote=1.05, centre=ORIGIN, **kw):
        super().__init__(**kw)
        fond = VGroup()
        for i in range(3):
            for j in range(3):
                r = Rectangle(width=cote, height=cote, stroke_color="#64748b", stroke_width=3,
                              fill_color="#1e293b" if i == 0 or j == 0 else FOND_CARTE, fill_opacity=1)
                r.move_to(P((j - 1) * cote, (1 - i) * cote))
                fond.add(r)
        self.fond = fond
        self.add(fond)
        fs = int(cote * 50)
        self.tetes = VGroup(T("×", fs, JAUNE_TITRE, audit=False, gras=True).move_to(fond[0]))
        for k, s in enumerate("+−"):
            c = NEG if s == "−" else POS
            self.tetes.add(T(s, fs, c, audit=False, gras=True).move_to(fond[1 + k]))
            self.tetes.add(T(s, fs, c, audit=False, gras=True).move_to(fond[3 * (1 + k)]))
        self.add(self.tetes)
        self.val = {}
        for i in range(2):
            for j in range(2):
                s = "+" if i == j else "−"
                self.val[(i, j)] = T(s, int(fs * 1.15), VERT_OK if s == "+" else PIEGE, audit=False, gras=True).move_to(fond[3 * (i + 1) + j + 1])
        self.move_to(centre)
        # les signes ne sont pas encore dans le groupe : on les recale sur leurs cases
        for (i, j), v in self.val.items():
            v.move_to(fond[3 * (i + 1) + j + 1])
        self._coord = cote

    def remplie(self):
        for v in self.val.values():
            self.add(v)
        return self


class Glacier(VGroup):
    """Une vallée de roche et sa glace : glace_a(y) donne la glace au niveau y (en absolu)."""

    def __init__(self, w=5.0, h=3.0, niveau=0.75, centre=ORIGIN, **kw):
        super().__init__(**kw)
        self.w, self.h, self.c = w, h, np.array(centre)
        self.fond_y = -h / 2 + 0.25
        pts = [P(-w / 2, -h / 2), P(-w / 2, h / 2), P(-w * 0.13, self.fond_y), P(w * 0.13, self.fond_y), P(w / 2, h / 2), P(w / 2, -h / 2)]
        self.roche = Polygon(*pts, fill_color=ROCHE, fill_opacity=1, stroke_width=0).shift(self.c)
        self.neige = VGroup(*[Polygon(P(s * w / 2, h / 2), P(s * (w / 2 - 0.7), h / 2 - 0.77), P(s * w / 2, h / 2 - 0.77), fill_color=WHITE, fill_opacity=1, stroke_width=0).shift(self.c) for s in (-1, 1)])
        self.glace = self.glace_a(niveau)
        self.add(self.roche, self.neige, self.glace)

    def glace_a(self, y):
        w, h, f = self.w, self.h, self.fond_y
        t = (y - f) / (h / 2 - f)
        lx = w * 0.13 + (w / 2 - w * 0.13) * t
        return Polygon(P(-w * 0.13, f), P(w * 0.13, f), P(lx, y), P(-lx, y), fill_color=GLACE, fill_opacity=1, stroke_color=WHITE, stroke_width=2).shift(self.c)


class Frise(VGroup):
    """La glace, année par année : une barre par instant t, sur un axe du temps.
    .barre[t], .x(t), .y(t) (le haut de la barre), .lab[t] (l'étiquette du temps)."""

    def __init__(self, temps, perte, k=0.12, base=0.8, x0=-5.5, y0=-2.2, pas=1.45, larg=1.0, etiquettes=None, **kw):
        super().__init__(**kw)
        self.temps, self.x0, self.pas, self.y0 = list(temps), x0, pas, y0
        tmax = max(temps)
        self.barre, self.lab = {}, {}
        self.axe = Line(P(x0 - 0.75, y0), P(x0 + pas * (len(self.temps) - 1) + 0.75, y0), color=WHITE, stroke_width=4)
        self.add(self.axe)
        for i, t in enumerate(self.temps):
            h = base + k * perte * (tmax - t)
            b = Rectangle(width=larg, height=h, fill_color=GLACE, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
            b.move_to(P(x0 + pas * i, y0 + h / 2))
            self.barre[t] = b
            s = (etiquettes or {}).get(t, str(t))
            self.lab[t] = T(s, 28, WHITE, audit=False).move_to(P(x0 + pas * i, y0 - 0.34))

    def x(self, t):
        return self.barre[t].get_center()[0]

    def y(self, t):
        return self.barre[t].get_top()[1]


class Droite(VGroup):
    """Une droite graduée dessinée : .x(v) l'abscisse à l'écran."""

    def __init__(self, a, b, x0, x1, y, fs=26, **kw):
        super().__init__(**kw)
        self.a, self.b, self.x0, self.x1, self.yy = a, b, x0, x1, y
        self.add(Line(P(x0 - 0.2, y), P(x1 + 0.2, y), color=WHITE, stroke_width=3))
        for v in range(a, b + 1):
            self.add(Line(P(self.x(v), y - 0.09), P(self.x(v), y + 0.09), color=WHITE, stroke_width=3))
            self.add(T(str(v).replace("-", "−"), fs, NEG if v < 0 else WHITE, audit=False).move_to(P(self.x(v), y - 0.36)))

    def x(self, v):
        return self.x0 + (v - self.a) * (self.x1 - self.x0) / (self.b - self.a)

    def saut(self, u, v, c=NEG, dy=0.42):
        return CurvedArrow(P(self.x(u), self.yy + 0.12), P(self.x(v), self.yy + 0.12), angle=(-0.8 if v > u else 0.8), color=c, stroke_width=5, tip_length=0.17)


class PaysageRel(_OutilsProbleme, _OutilsDefi, PaysageEq):
    identite = "Maths 4e — EleveAI"
    ceinture = "orange"

    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        ph.arrange(DOWN, aligned_edge=LEFT, buff=0.2)
        ph.next_to(cartes, DOWN, buff=0.2).align_to(P(self.XL, 0), LEFT)
        if ph.get_right()[0] > 6.45:
            ph.scale_to_fit_width(6.45 - self.XL).align_to(P(self.XL, 0), LEFT)
        return tete, q, cartes, pause, rebours, ph

    def ph_eq(self, i, s, phrase, n=1, lettres="", couleur=None, premier=False, avec=()):
        ref = self.ph_q[i]
        e = E(s, 30, couleur=couleur or VERT_OK, lettres=lettres)
        e.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
        sauf = []
        if premier:
            self.play(FadeIn(e.atomes[0]), run_time=0.08)
            sauf = [e.atomes[0]]
        self.dire_eq(e, phrase, n=n, echelle=1.0, rt=0.16, sauf=sauf, avec=avec)
        return e

    def reponse(self, *lignes):
        for i, (s, phrase) in enumerate(lignes):
            self.ph_eq(i, s, phrase, premier=i == 0)
        self.rep_fini()

    def cadre_ok(self, m, buff=0.2):
        return RoundedRectangle(width=m.width + 2 * (buff + 0.14), height=m.height + 2 * buff, corner_radius=0.08,
                                color=VERT_OK, stroke_width=4).move_to(m)

    def page_abonnement(self, voix):
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        entraine = T("Entraîne-toi sur", 46, JAUNE_TITRE).move_to(P(0, 2.75))
        site = T("eleveai.fr", 62, BLEU_CALCUL).move_to(P(0, 1.75))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        abonne = T("Abonne-toi !", 44, VERT_OK).move_to(P(0, 0.2))
        poignee = T("@eleveai974", 48, VERT_OK).move_to(P(0, -0.7))
        g1 = T("Un pouce", 38, WHITE)
        p1 = T("·", 38, "#94a3b8")
        g2 = T("Un commentaire", 38, WHITE)
        p2 = T("·", 38, "#94a3b8")
        g3 = T("La cloche", 38, WHITE)
        gestes = VGroup(g1, p1, g2, p2, g3).arrange(RIGHT, buff=0.28).move_to(P(-0.9, -2.2))
        g2.align_to(g1, UP)
        g3.align_to(g1, UP)
        assert gestes is not None
        self.play(Write(entraine), run_time=0.6)
        self.au("éleveai", GrowFromCenter(site), Create(cadre), rt=0.5)
        self.au("pouce", FadeIn(g1, scale=1.3), rt=0.25)
        self.au("commentaire", FadeIn(p1), FadeIn(g2, scale=1.3), rt=0.25)
        self.au("abonne-toi", FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), rt=0.35)
        self.au("cloche", FadeIn(p2), FadeIn(g3, scale=1.3), rt=0.25)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3), run_time=0.5)
        self.attendre_voix(marge=1.4)
