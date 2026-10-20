# proba_coef_definition_short.py
# EleveAI — Maths STMG — short jumeau de « Le coefficient binomial : compter
# les chemins » (micro vaT_coef_definition). CEINTURE JAUNE. Il AMUSE : trois
# colis, exactement deux livrés à l'heure… de combien de façons ?
#   · en HAUT les trois colis : une pendule verte (à l'heure) ou orange (en
#     retard) se pose sur chacun quand la voix dit « succès » / « échec » ;
#   · en BAS, EN MÊME TEMPS : le petit arbre à 3 niveaux (S en haut, E en
#     bas), le chemin de chaque façon s'allume en orange ;
#   · « 2 parmi 3 » s'écrit comme au lycée (3 au-dessus de 2, parenthèses) ;
#   · fin : « 1 parmi 3 », ça vaut combien ? « Réponds en commentaire ! ».
# ⛔ PAS D'ÉCART : aucun nombre que la voix ne dit pas.
# Ti-Margo en bas (margo_bas). Aucune classe à l'écran.
#
# Voix : manim/voix/stmg-proba-coef-definition-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_coef_definition_short.py ShortProbaCoefDefinition -o eleveai-maths-stmg-proba-coef-definition-short --media_dir manim/scripts/stmg/media-coef_definition
# Copier dans manim/sorties/stmg/maths/probabilites/42-coef-definition/.

import re
import sys
from itertools import product
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_coef_definition import C_E, C_S, CHEMIN, P, binome, colis, egal, pendule, suite  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
GRIS_BR = "#CBD5E1"


def marque(s, r=0.13):
    """Un rond vert « S » (à l'heure) ou orange « E » (en retard)."""
    d = Circle(radius=r, fill_color=C_S if s else C_E, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    t = Text("S" if s else "E", font_size=int(r * 150), color=WHITE, weight=BOLD).move_to(d)
    return VGroup(d, t)


class PetitArbre3(VGroup):
    """Trois niveaux, S en haut, E en bas ; un nœud = le tuple du chemin."""

    def __init__(self, x0=-1.95, dx=1.28, h=0.29, y0=-1.6, **kw):
        super().__init__(**kw)
        self.pos = {(): P(x0, y0)}
        for L in (1, 2, 3):
            for c in product((True, False), repeat=L):
                i = int("".join("0" if g else "1" for g in c), 2)
                bloc = 2 ** (3 - L)
                ys = [(3.5 - j) * h for j in range(i * bloc, (i + 1) * bloc)]
                self.pos[c] = P(x0 + L * dx, y0 + sum(ys) / len(ys))
        self.branches, self.lab = {}, {}
        for c, v in self.pos.items():
            if not c:
                continue
            u = self.pos[c[:-1]]
            d = (v - u) / np.linalg.norm(v - u)
            self.branches[c] = Line(u + d * (0.05 if len(c) == 1 else 0.16), v - d * 0.16, color=GRIS_BR,
                                    stroke_width=3)
            self.lab[c] = marque(c[-1], 0.13 if len(c) < 3 else 0.12).move_to(v).set_z_index(3)
        self.depart = Dot(self.pos[()], radius=0.06, color=WHITE)
        self.add(self.depart)

    def pousser(self, L, run_time=0.5):
        cs = [c for c in self.pos if len(c) == L]
        return Succession(AnimationGroup(*[Create(self.branches[c]) for c in cs], run_time=run_time * 0.6),
                          AnimationGroup(*[FadeIn(self.lab[c], scale=1.5) for c in cs], run_time=run_time * 0.4))

    def etat(self, chemins=None, op=0.22):
        on_b = set() if chemins is None else {ch[:k] for ch in chemins for k in (1, 2, 3)}
        anims = []
        for c, br in self.branches.items():
            on = chemins is None or c in on_b
            lit = chemins is not None and on
            anims.append(br.animate.set_stroke(CHEMIN if lit else GRIS_BR, 7 if lit else 3, opacity=1 if on else op))
            anims.append(self.lab[c].animate.set_opacity(1 if on else op))
        return anims


class ShortProbaCoefDefinition(Short6e):
    nom_voix = "stmg-proba-coef-definition-short"
    identite = "Maths STMG — EleveAI"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def au_index(self, i):
        """Attend l'instant où la voix arrive au caractère i de la phrase en cours."""
        if not self._duree_voix:
            return
        reste = self._debut_voix + self._duree_voix * i / len(self._texte_voix) - self.renderer.time
        if reste > 0.05:
            self.wait(reste)

    def titre(self, texte, color=JAUNE_TITRE, fs=44):
        return self.grand(texte, font_size=fs, color=color).move_to(P(0, 3.4))

    def construct(self):
        self.margo_bas()

        # ── 00 : trois colis ; exactement 2 à l'heure : de combien de façons ? ──
        self.dire("00-accroche")
        titre = self.titre("3 commandes")
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        cs = VGroup(*[colis(0.85) for _ in range(3)]).arrange(RIGHT, buff=0.45).move_to(P(0, 1.05))
        a = PetitArbre3(y0=-1.75)
        self.add(a)
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2),
                  LaggedStart(*[FadeIn(c, shift=DOWN * 0.5) for c in cs], lag_ratio=0.2), run_time=0.9)
        for L in (1, 2, 3):
            self.play(a.pousser(L, 0.45), Wiggle(cs[L - 1]), run_time=0.45)
        self.au_mot("De combien")
        fa = self.titre("Combien de façons ?", ORANGE_RETENUE, 42)
        self.play(FadeOut(titre, run_time=0.2))
        self.play(FadeIn(fa, scale=0.8), run_time=0.3)
        self.au_mot("exactement 2")
        ex = suite(self.t("Exactement", 32), self.t("2", 46, JAUNE_TITRE), self.t("à l'heure", 32, C_S), buff=0.15)
        ex.scale_to_fit_width(min(ex.width, LARGEUR_MAX)).move_to(P(0, -0.2))
        self.play(FadeIn(ex, shift=UP * 0.15), run_time=0.5)
        self.insister(ex[1])
        self.play(Wiggle(fa), run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : les trois façons, trois chemins ; « 2 parmi 3 » ──
        self.dire("01-image")
        texte = self._texte_voix
        mots = [(m.start(), m.group().lower() == "succès") for m in re.finditer(r"[Ss]uccès|[ÉéEe]chec", texte)][:9]
        ordres = [tuple(s for _, s in mots[3 * k:3 * k + 3]) for k in range(3)]
        allumes, poses, lignes = [], VGroup(), VGroup()
        self.play(FadeOut(ex), run_time=0.2)
        for k, ordre in enumerate(ordres):
            ligne = VGroup()
            for j in range(3):
                i, s = mots[3 * k + j]
                self.au_index(i)
                h = pendule(s, 0.27).move_to(cs[j][0])
                m = marque(s, 0.2).move_to(P((j - 1) * 0.6, -0.2))
                self.play(FadeIn(h, scale=1.8), FadeIn(m, scale=1.6), *a.etat(allumes + [ordre[:j + 1]]),
                          run_time=0.3)
                poses.add(h)
                ligne.add(m)
            lignes.add(ligne)
            allumes.append(ordre)
            if k < 2:
                self.play(FadeOut(poses), FadeOut(ligne), run_time=0.15)
                poses = VGroup()
                lignes.remove(ligne)
        self.au_mot("3 façons")
        trois = self.titre("3 façons !", JAUNE_TITRE, 50)
        self.play(FadeOut(fa), run_time=0.2)
        self.play(FadeIn(trois, scale=0.8), *[Flash(a.lab[o], color=CHEMIN, line_length=0.15) for o in ordres],
                  run_time=0.5)
        self.au_mot("2 parmi 3")
        b = binome(3, 2, 60, c_k=C_S)
        v = egal(b, 3, 60)
        bloc = VGroup(b, v).move_to(P(0, 0.8))
        self.play(FadeOut(VGroup(cs, poses)), FadeOut(lignes), FadeIn(b, scale=1.3), run_time=0.5)
        self.play(FadeIn(v, shift=LEFT * 0.2), run_time=0.35)
        self.insister(bloc, 1.2)
        self.attendre_voix(marge=0.1)

        # ── 02 : et « 1 parmi 3 » ? ──
        self.dire("02-question")
        toi = self.titre("Et toi ?", JAUNE_TITRE, 50)
        self.play(FadeOut(trois), FadeOut(bloc), run_time=0.2)
        self.play(FadeIn(toi, scale=0.8), *a.etat(None), run_time=0.35)
        self.au_mot("1 parmi 3")
        b1 = binome(3, 1, 64, c_k=C_S)
        q = suite(Text("=", font_size=64), Text("?", font_size=76, color=ORANGE_RETENUE), buff=0.2)
        q.next_to(b1, RIGHT, buff=0.25)
        VGroup(b1, q).move_to(P(0, 0.8))
        self.play(FadeIn(b1, scale=1.3), run_time=0.5)
        self.au_mot("ça vaut combien")
        self.play(FadeIn(q, scale=1.5), run_time=0.4)
        self.insister(q[1])
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 46, VERT_OK), self.t("commentaire !", 46, VERT_OK))
        appel.arrange(DOWN, buff=0.1).move_to(P(0, -1.3))
        self.play(FadeIn(appel, scale=0.7), FadeOut(VGroup(a, *a.branches.values(), *a.lab.values())), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)
