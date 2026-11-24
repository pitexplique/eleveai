# graph_lycee_croissance_short.py
# EleveAI — Maths 1re (automatismes) — short jumeau de l'épisode 03
# « Lire une croissance » (graph_lycee_croissance.py). CEINTURE BLANCHE (échelle
# entière), sans identité de classe. Il AMUSE : « une courbe qui s'aplatit,
# est-ce qu'elle baisse ? » — Non ! Les marches de Sarah (300, 150, 80, 40)
# rétrécissent, mais on monte toujours : ça ralentit.
#   · 1 question-pause (3 s) : hausses 10, 20, 40, 80 → accélère (C) ;
#   · en commentaire : 1 000 bactéries, × 2 chaque heure, après 4 h ?
# Code couleur de la paysage : Sarah violet, Tom orange.
# Voix : manim/voix/lycee-graph-croissance-short.json (validée le 24/11, débit −10) ;
# WAV : public/sons/lycee-graph-croissance-short/ ; marques : graph_lycee_croissance_short_marques.json.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/premiere/graph_lycee_croissance_short.py GraphLyceeCroissanceShort
# Brouillon : python -m manim render -ql -r 480,854 --disable_caching manim/scripts/premiere/graph_lycee_croissance_short.py GraphLyceeCroissanceShort -o eleveai-maths-premiere-graph-croissance-short --media_dir manim/scripts/premiere/media-graph-lycee-croissance-short

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))  # le dossier du script EN TÊTE

from prop_commun import *  # noqa: E402,F403
from fin_commune import ecran_fin, appel_commentaire  # noqa: E402

C_TOM = "#fb923c"
C_SARAH = "#c084fc"
SARAH = [0, 300, 450, 530, 570]
TOM = [0, 10, 30, 70, 150]   # hausses 10, 20, 40, 80 (la courbe du jeu, point de départ 0)


def sans(m):
    """Un décor (le titre de la vidéo, les graduations) : ni synchro, ni audit."""
    for f in m.get_family():
        if isinstance(f, Text):
            f.sans_synchro = True
            f._pas_audit = True
    return m


def gras(s, fs=34, couleur=WHITE):
    return Text(s, font_size=fs, color=couleur, weight=BOLD)


def interp(ys):
    """Interpolation monotone (Fritsch–Carlson), comme la paysage."""
    d = [ys[i + 1] - ys[i] for i in range(len(ys) - 1)]
    m = []
    for i in range(len(ys)):
        if i == 0:
            m.append(d[0])
        elif i == len(ys) - 1:
            m.append(d[-1])
        elif d[i - 1] * d[i] <= 0:
            m.append(0.0)
        else:
            m.append(2 / (1 / d[i - 1] + 1 / d[i]))

    def f(x):
        i = min(max(int(x), 0), len(ys) - 2)
        s = x - i
        return ((2 * s**3 - 3 * s**2 + 1) * ys[i] + (s**3 - 2 * s**2 + s) * m[i]
                + (-2 * s**3 + 3 * s**2) * ys[i + 1] + (s**3 - s**2) * m[i + 1])
    return f


class Escalier(VGroup):
    """Un petit repère (sans nombres) et les marches d'une courbe : x de 0 à 4."""

    def __init__(self, vals, couleur, ox=-1.75, oy=-1.25, L=3.0, H=2.5, ymax=None, **kw):
        super().__init__(**kw)
        self.vals, self.ox, self.oy, self.L, self.H = vals, ox, oy, L, H
        self.ymax = ymax or vals[-1] * 1.1
        self.axes = VGroup(Arrow(self.p(0, 0), self.p(4, 0) + RIGHT * 0.3, buff=0, color=GREY_B, stroke_width=3,
                                 max_tip_length_to_length_ratio=0.06),
                           Arrow(self.p(0, 0), self.p(0, self.ymax) + UP * 0.25, buff=0, color=GREY_B,
                                 stroke_width=3, max_tip_length_to_length_ratio=0.07))
        self.grille = VGroup(*[Line(self.p(x, 0), self.p(x, self.ymax), color="#334155", stroke_width=1.5)
                               for x in range(1, 5)])
        f = interp(vals)
        self.courbe = VMobject(stroke_color=couleur, stroke_width=6).set_points_smoothly(
            [self.p(k / 20, f(k / 20)) for k in range(81)])
        self.marches = VGroup()
        for i in range(4):
            h = Line(self.p(i, vals[i]), self.p(i + 1, vals[i]), color=GREY_B, stroke_width=3)
            v = Line(self.p(i + 1, vals[i]), self.p(i + 1, vals[i + 1]), color=couleur, stroke_width=8)
            self.marches.add(VGroup(h, v))
        self.add(self.grille, self.axes)

    def p(self, x, y):
        return P(self.ox + x * self.L / 4, self.oy + y * self.H / self.ymax)

    def etiquette(self, i, s, couleur, fs=26):
        v = self.marches[i][1]
        return Text(s, font_size=fs, color=couleur, weight=BOLD).next_to(v, RIGHT, buff=0.08)


def _voix_sans_milliers(voix):
    out, carte = [], []
    for i, ch in enumerate(voix):
        if ch == " " and 0 < i and voix[i - 1].isdigit() and re.match(r"\d{3}(?!\d)", voix[i + 1:i + 5]):
            continue
        out.append(ch)
        carte.append(i)
    return "".join(out), carte


class AuditMilliers:
    """L'audit de canvas_proportion (recopié, non modifié là-bas), qui lit aussi
    les milliers DITS « 1 000 » (l'original : AUDIT-ABSENT)."""

    def _auditer(self, avant, t0):
        cle = getattr(self, "_cle_voix", None)
        voix, carte = _voix_sans_milliers(getattr(self, "_texte_voix", "") or "")
        marques = self._marques().get(cle, []) if cle else []
        for m in self.mobjects:
            for f in m.get_family():
                if type(f).__name__ == "CompteARebours":
                    for g in f.get_family():
                        g._pas_audit = True
        for m in self.mobjects:
            for t in [f for f in m.get_family() if isinstance(f, Text) and getattr(f, "original_text", None)]:
                if id(t) in avant or getattr(t, "_pas_audit", False) or getattr(t, "_audite", False):
                    continue
                if t.get_fill_opacity() < 0.05:
                    continue
                t._audite = True
                s = t.original_text.replace("−", "").replace(" ", " ")
                s = re.sub(r"(?<=\d) (?=\d{3}(?!\d))", "", s)
                for nb in re.findall(r"\d+(?:,\d+)?", s):
                    occ = [carte[x.start()] for x in re.finditer(r"(?<![\d,])" + re.escape(nb) + r"(?![\d]|,\d)", voix)]
                    if not occ:
                        print(f"AUDIT-ABSENT {cle} « {nb} » ({t.original_text[:30]})", flush=True)
                        continue
                    tps = [max([mm[1] for mm in marques if mm[0] <= i] or [0.0]) + getattr(self, "_debut_voix", 0)
                           for i in occ]
                    if t0 < tps[0] - 0.06:
                        print(f"AUDIT-AVANCE {cle} « {nb} » ({t.original_text[:30]}) {tps[0] - t0:.2f} s", flush=True)
                    else:
                        dernier = max(x for x in tps if x <= t0 + 0.06)
                        if t0 - dernier > 0.4:
                            print(f"AUDIT-TARD {cle} « {nb} » ({t.original_text[:30]}) {t0 - dernier:.2f} s",
                                  flush=True)


class GraphLyceeCroissanceShort(AuditMilliers, ShortProp):
    nom_voix = "lycee-graph-croissance-short"
    fichier_marques = "graph_lycee_croissance_short_marques.json"
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

    def montre(self, mot, *anims, rt=0.35):
        self.au_mot(*mot) if isinstance(mot, tuple) else self.au_mot(mot)
        self.play(*anims, run_time=rt)

    def _rep_q(self, sc):
        l0 = sc.ligne_rep(0, ["Les hausses", "grandissent :"])
        l1 = sc.ligne_rep(1, ["la croissance", "accélère."])
        sc.au_mot("Les hausses")
        sc.play(FadeIn(l0[0], shift=UP * 0.12), run_time=0.3)
        sc.au_mot("grandissent")
        sc.play(FadeIn(l0[1], shift=UP * 0.12), run_time=0.3)
        sc.au_mot("on monte plus")
        sc.play(LaggedStart(*[Indicate(m[1], color=WHITE, scale_factor=1.3) for m in self.esc_q.marches],
                            lag_ratio=0.25), run_time=0.8)
        sc.au_mot("La croissance")
        sc.play(FadeIn(l1[0], shift=UP * 0.12), run_time=0.3)
        sc.au_mot("accélère.")
        sc.play(FadeIn(l1[1], scale=1.3), run_time=0.3)
        sc.rep_fini()

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Ralentir ou baisser ?", self.ceinture)
        sans(titre)  # le titre de la vidéo : posé d'un bloc (ni synchro, ni audit)
        self.add(badge)
        garder = [margo, titre, badge]

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        es = Escalier(SARAH, C_SARAH, ox=-1.85, oy=-1.1, L=2.8, H=2.4)
        self.au_mot("Une courbe")
        self.play(Write(titre), FadeIn(es), Create(es.courbe), run_time=0.8)
        q = gras("Elle baisse ?", 38, AMBRE).move_to(P(0, 1.95))
        self.au_mot("est-ce qu'elle baisse")
        self.play(FadeIn(q, scale=1.3), run_time=0.35)
        self.play(Wiggle(q, scale_value=1.1, rotation_angle=0.05), run_time=0.5)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(q), run_time=0.25)

        # ── 01 : Non ! les marches rétrécissent, on monte toujours ──
        self.dire("01-image")
        non = gras("Non !", 52, ROUGE_ERREUR).move_to(P(0, 1.95))
        self.au_mot("Non")
        self.play(FadeIn(non, scale=1.4), run_time=0.3)
        self.au_mot("les hausses")
        self.play(es.courbe.animate.set_stroke(opacity=0.35), run_time=0.3)
        for i, v in enumerate(("300", "150", "80", "40")):
            self.au_mot(v)
            self.play(Create(es.marches[i]), FadeIn(es.etiquette(i, "+ " + v, C_SARAH, 24 if i < 2 else 22).shift(DOWN * (0.07 if i == 2 else 0)),
                                                     scale=1.3), run_time=0.3)
        self.au_mot("rétrécissent")
        self.play(LaggedStart(*[Indicate(m[1], color=WHITE) for m in es.marches], lag_ratio=0.2), run_time=0.7)
        fl = Arrow(P(1.95, es.p(0, 330)[1]), P(1.95, es.p(0, 570)[1]), buff=0, color=VERT_OK, stroke_width=6,
                   max_tip_length_to_length_ratio=0.3)
        mt = gras("on monte toujours", 26, VERT_OK).move_to(P(0, -1.6))
        self.au_mot("on monte toujours")
        self.play(GrowArrow(fl), FadeIn(mt, shift=UP * 0.12), es.courbe.animate.set_stroke(opacity=1), run_time=0.4)
        r = gras("ça ralentit", 44, C_SARAH).move_to(P(0, -2.2))
        self.au_mot("ralentit")
        self.play(FadeIn(r, scale=1.3), run_time=0.35)
        self.play(Create(SurroundingRectangle(r, color=C_SARAH, buff=0.1, corner_radius=0.1, stroke_width=4)),
                  run_time=0.3)
        self.attendre_voix(marge=0.3)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.3)

        # ── 02 : la question-pause (3 s) : hausses 10, 20, 40, 80 → accélère (C) ──
        choix = [self.t("ralentit", 30), self.t("est constante", 30), self.t("accélère", 30)]
        for c in choix:
            for f in c.get_family():
                f._pas_audit = True
        self.esc_q = Escalier(TOM, C_TOM, ox=0.5, oy=-3.65, L=1.2, H=0.6)

        def autres_r(sc):
            sc.play(FadeIn(self.esc_q), LaggedStart(*[Create(m) for m in self.esc_q.marches], lag_ratio=0.25),
                    run_time=0.6)
            self._rep_q(sc)

        self.question_pause("02-question", "02b-reponse", ["Hausses : 10, 20, 40, 80.", "La croissance :"], choix, 2,
                            ["Les hausses grandissent :", "la croissance accélère."], mot_q="Les hausses",
                            autres_r=autres_r)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in (titre, badge))], run_time=0.3)

        # ── 03 : la question en commentaire (sans Ti-Margo, règle du 17/11) ──
        self.dire("03-commentaire")
        q1 = gras("À toi :", 44, AMBRE).move_to(P(0, 2.0))
        self.au_mot("À toi")
        self.play(FadeIn(q1, shift=DOWN * 0.15), run_time=0.3)
        l1 = gras("1 000 bactéries", 34, WHITE).move_to(P(0, 1.25))
        self.au_mot("1 000 bactéries")
        self.play(FadeIn(l1, scale=1.2), run_time=0.35)
        l2 = sans(gras("× 2 chaque heure", 30, C_TOM)).move_to(P(0, 0.55))
        self.au_mot("doublent")
        self.play(FadeIn(l2, scale=1.2), run_time=0.35)
        l3 = gras("après 4 h ?", 44, AMBRE).move_to(P(0, -0.25))
        self.au_mot("après 4")
        self.play(FadeIn(l3, scale=1.1), run_time=0.35)
        appel_commentaire(self, y=-1.25)
        self.attendre_voix(marge=0.6)
        ecran_fin(self, "short", voix="04-abonne")
