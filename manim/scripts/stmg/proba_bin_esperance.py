# proba_bin_esperance.py
# EleveAI — Maths STMG — série « Probabilités » : l'ESPÉRANCE d'une loi
# binomiale, E(X) = n × p (micro vaT_bin_esperance, notion
# va_binomiale_calcul), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : proba_bin_esperance_short.py (ceinture jaune).
#
# ⭐ La banque n'a pas de canvas pour cette micro (réponse courte « n × p ») ;
# la micro voisine vaT_bin_arbre dessine l'ARBRE DE BERNOULLI du coach
# (canvasArbreBernoulli : carte blanche, branches grises, probabilités en
# bleu) : on en reprend la BRANCHE DOUBLE pour « chaque appel rapporte p en
# moyenne » (écran 04). La figure centrale : une GRILLE DE 200 TÉLÉPHONES dont
# certains s'allument (les recrues), et des CAMPAGNES successives (barres)
# autour d'une ligne « moyenne : 30 ».
#
# Écrans : 00 garde · 01 l'association (200 appels, 0,15, B(200 ; 0,15)) ·
# 02 E(X) = n × p, 200 × 0,15 = 30 · 03 le sens (campagnes autour de 30) ·
# 04 pourquoi (une Bernoulli rapporte p ; 200 × p) · 05 le piège (25, 34 ;
# 30 = la moyenne) · 06 défi (50 clients, 0,4) · 06b correction (20) ·
# 07 ce que tu as appris · 08 fin (« Entraîne-toi sur eleveai.fr »,
# « Abonne-toi ! @eleveai974 »).
#
# Voix : manim/voix/stmg-proba-bin-esperance.json (débit −7).
# Rendu (depuis la racine du dépôt ; media à soi, sinon WinError 32) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_bin_esperance.py ProbaBinEsperanceSTMG -o eleveai-maths-stmg-proba-bin-esperance --media_dir manim/scripts/stmg/media-vaT_bin_esperance
# Puis copier dans manim/sorties/stmg/maths/probabilites/47-bin-esperance/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "premiere"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import suite  # noqa: E402
from proba_bern_epreuve import ECHEC, SUCCES, BrancheDouble, client  # noqa: E402
from proba_bin_parametres import COUL_N, COUL_P, egal, loi_B  # noqa: E402

COQUE = "#334155"       # le téléphone éteint
ECRAN = "#64748B"
ALLUME = "#22C55E"      # l'appel qui aboutit : une recrue
BARRE = "#38BDF8"       # une campagne (barre)
MOYENNE = "#FACC15"     # la ligne « moyenne : 30 »


def P(x, y):
    return np.array([x, y, 0.0])


def telephone(h=0.34):
    """Un téléphone portable : coque sombre, écran gris (vert s'il aboutit)."""
    coque = RoundedRectangle(width=h * 0.58, height=h, corner_radius=h * 0.12, fill_color=COQUE, fill_opacity=1,
                             stroke_color="#94A3B8", stroke_width=1)
    ecran = Rectangle(width=h * 0.44, height=h * 0.7, fill_color=ECRAN, fill_opacity=1, stroke_width=0)
    ecran.move_to(coque).shift(UP * h * 0.04)
    return VGroup(coque, ecran)


def tirage(k, graine, n=200):
    """k indices distincts parmi n (toujours les mêmes pour une graine)."""
    return sorted(np.random.default_rng(graine).choice(n, k, replace=False).tolist())


class GrilleAppels(VGroup):
    """Les 200 appels : 20 colonnes × 10 rangées de téléphones."""

    def __init__(self, h=0.34, pas_x=0.3, pas_y=0.4, cols=20, n=200, **kw):
        super().__init__(**kw)
        self.tels = VGroup()
        rangs = n // cols
        for k in range(n):
            self.tels.add(telephone(h).move_to(P(pas_x * (k % cols - (cols - 1) / 2),
                                                 pas_y * ((rangs - 1) / 2 - k // cols))))
        self.add(self.tels)

    def ecrans(self, indices):
        return [self.tels[k][1] for k in indices]

    def allumer(self, indices, couleur=ALLUME):
        """Les animations : allumer `indices`, éteindre tous les autres."""
        s = set(indices)
        return [self.tels[k][1].animate.set_fill(couleur if k in s else ECRAN) for k in range(len(self.tels))]


class Campagnes(VGroup):
    """Un axe horizontal ; chaque campagne = une barre ; la ligne de la moyenne."""

    def __init__(self, x0=0.0, x1=5.0, y0=-2.0, unite=0.09, larg=0.5, **kw):
        super().__init__(**kw)
        self.x0, self.x1, self.y0, self.unite, self.larg = x0, x1, y0, unite, larg
        self.axe = Line(P(x0, y0), P(x1, y0), color="#94A3B8", stroke_width=3)
        self.add(self.axe)

    def barre(self, x, v):
        b = Rectangle(width=self.larg, height=v * self.unite, fill_color=BARRE, fill_opacity=0.85,
                      stroke_color=WHITE, stroke_width=1.5)
        b.move_to(P(x, self.y0 + v * self.unite / 2))
        return b

    def ligne(self, v=30):
        y = self.y0 + v * self.unite
        return DashedLine(P(self.x0 - 0.1, y), P(self.x1 + 0.1, y), color=MOYENNE, stroke_width=4, dash_length=0.15)


# ── calage fin de la voix sur le son réel ───────────────────────────────────
# Le prorata des caractères du gabarit dérive (« 200 » se dit « deux cents »,
# « 0,15 » « zéro virgule quinze ») : jusqu'à 1,3 s d'avance mesurée. Ici on
# relit le .wav : début et fin de la parole, et les GRANDES pauses (≥ 0,5 s)
# qui tombent aux fins de phrase ; dans chaque phrase, le prorata se fait sur
# un poids « prononcé » (chiffres, %, virgule décimale).

import re  # noqa: E402
import wave  # noqa: E402


def poids(texte):
    t = re.sub(r"(\d),(\d)", r"\1 virgule \2", texte)
    t = re.sub(r"\d", "xxxx", t).replace("%", "pour cent").replace("×", "fois")
    t = re.sub(r"\b([A-Z])\b", "xx", t)
    return max(len(t), 1)


def calage(wav, texte):
    """[(début, fin, texte de la phrase, indice de départ)] pour chaque phrase."""
    w = wave.open(str(wav))
    sr, nc = w.getframerate(), w.getnchannels()
    a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(float)[::nc]
    pas = int(sr * 0.02)
    e = np.abs(a[: len(a) // pas * pas]).reshape(-1, pas).mean(axis=1)
    sil = e < e.max() * 0.04
    parle = np.where(~sil)[0]
    t0, t1 = parle[0] * 0.02, (parle[-1] + 1) * 0.02
    pauses, k = [], 0
    while k < len(sil):
        if sil[k]:
            j = k
            while j < len(sil) and sil[j]:
                j += 1
            if (j - k) * 0.02 >= 0.5 and t0 < k * 0.02 and j * 0.02 < t1:
                pauses.append((k * 0.02, j * 0.02))
            k = j
        else:
            k += 1
    coupes = [m.end() for m in re.finditer(r"[.?!] ", texte)]
    if len(coupes) != len(pauses):
        return [(t0, t1, texte, 0)]
    bornes = [0] + coupes + [len(texte)]
    temps = [t0] + [x for p in pauses for x in p] + [t1]
    return [(temps[2 * i], temps[2 * i + 1], texte[bornes[i]:bornes[i + 1]], bornes[i]) for i in range(len(bornes) - 1)]


def instant(wav, texte, extrait):
    i = texte.find(extrait)
    if i < 0:
        raise ValueError(f"« {extrait} » absent de la voix : {texte[:60]}…")
    for d, f, phrase, i0 in calage(wav, texte):
        if i0 <= i < i0 + len(phrase):
            return d + (f - d) * poids(phrase[: i - i0]) / poids(phrase)
    return calage(wav, texte)[-1][1]


class CalageVoix:
    """À mettre AVANT la classe du gabarit : au_mot() calé sur le son réel."""

    def dire(self, nom, dossier=None):
        self._cle_voix = nom
        return super().dire(nom, dossier)

    def au_mot(self, extrait):
        wav = self.dossier_voix / f"{self._cle_voix}.wav"
        if not self._duree_voix or not wav.exists():
            return super().au_mot(extrait)
        reste = self._debut_voix + instant(wav, self._texte_voix, extrait) - self.renderer.time
        if reste > 0.05:
            self.wait(reste)


# des campagnes « quelconques » autour de 30 (purement visuelles, aucun nombre
# n'est écrit) ; les recrues allumées dans la grille de l'écran 01
CAMPAGNES = [27, 33, 29, 24, 31, 35, 28, 30, 26, 32, 30, 34, 29, 31]
RECRUES_01 = tirage(28, 7)


def formule(fs=80, n="n", p="p", c_n=COUL_N, c_p=COUL_P):
    """« E(X) = n × p » (ou les nombres à la place de n et p)."""
    return suite(Text("E(X)", font_size=fs, color=WHITE, weight=BOLD), Text("=", font_size=fs),
                 Text(n, font_size=fs, color=c_n, weight=BOLD), Text("×", font_size=fs),
                 Text(p, font_size=fs, color=c_p, weight=BOLD), buff=0.25)


class ProbaBinEsperanceBase(CalageVoix, Notion6e):
    """Toutes les scènes ; la sous-classe ne change que l'identité."""

    nom_voix = "stmg-proba-bin-esperance"
    identite = "Maths — EleveAI"
    ceinture = "bleue"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.3):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("L'espérance d'une loi binomiale", 50, JAUNE_TITRE).to_edge(UP, buff=0.55)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, -2.75))
        g = GrilleAppels(h=0.17, pas_x=0.15, pas_y=0.2).move_to(P(-0.6, 1.05))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech),
                  LaggedStart(*[FadeIn(tl) for tl in g.tels], lag_ratio=0.004), run_time=1.2)
        self.au_mot("n fois p")
        np_ = suite(self.t("n", 110, COUL_N), self.t("×", 90), self.t("p", 110, COUL_P), buff=0.35)
        np_.move_to(P(-0.6, -1.2)).scale(0.85)
        cadre = SurroundingRectangle(np_, color=JAUNE_TITRE, buff=0.22, stroke_width=5)
        fond = BackgroundRectangle(cadre, fill_opacity=0.85, buff=0.05)
        self.play(*g.allumer(tirage(30, 3)), FadeIn(fond), FadeIn(np_, scale=1.6), Create(cadre), run_time=0.7)
        self.attendre_voix(marge=1.0)

    # ── 01 : l'association et ses 200 appels ────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("L'association")
        g = GrilleAppels().move_to(P(-3.3, 0.0))
        x0 = 0.3
        self.au_mot("200 appels")
        self.play(LaggedStart(*[FadeIn(tl, scale=0.5) for tl in g.tels], lag_ratio=0.006), run_time=1.3)
        n200 = self.t("200 appels", 38, COUL_N).next_to(g, DOWN, buff=0.3)
        self.play(FadeIn(n200, scale=1.4), run_time=0.4)
        self.au_mot("recruter des bénévoles")
        l1 = self.t("pour recruter des bénévoles", 32).move_to(P(x0, 2.2), aligned_edge=LEFT)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.5)
        self.au_mot("aboutit")
        l2 = suite(self.t("un appel aboutit :", 34), buff=0.2).move_to(P(x0, 1.3), aligned_edge=LEFT)
        un = g.tels[47]
        self.play(FadeIn(l2, shift=UP * 0.1), un[1].animate.set_fill(ALLUME), run_time=0.5)
        self.play(Indicate(un, color=ALLUME, scale_factor=2.0), run_time=0.6)
        self.au_mot("0,15")
        v = self.t("0,15", 50, COUL_P).next_to(l2, RIGHT, buff=0.25)
        self.play(FadeIn(v, scale=1.8), run_time=0.4)
        self.insister(v, 0.25)
        self.au_mot("X compte")
        l3 = suite(self.t("X", 44, JAUNE_TITRE), self.t("compte les recrues", 34), buff=0.2)
        l3.move_to(P(x0, 0.4), aligned_edge=LEFT)
        self.play(FadeIn(l3, shift=UP * 0.1), *g.allumer(RECRUES_01), run_time=0.8)
        self.au_mot("X suit")
        l4 = suite(self.t("X", 44, JAUNE_TITRE), self.t("suit la loi", 34), buff=0.2).move_to(P(x0, -0.5), aligned_edge=LEFT)
        self.play(FadeIn(l4), run_time=0.3)
        loi = loi_B("200", "0,15", 52).move_to(P(x0 + 0.3, -1.45), aligned_edge=LEFT)
        loi[4].align_to(loi[2], UP)
        self.au_mot("B de 200")
        self.play(FadeIn(loi[0], scale=1.5), FadeIn(loi[1]), FadeIn(loi[2], scale=1.6), run_time=0.45)
        self.au_mot("virgule 0,15")
        self.play(FadeIn(loi[3]), FadeIn(loi[4], scale=1.6), FadeIn(loi[5]), run_time=0.45)
        self.play(Circumscribe(loi, color=JAUNE_TITRE), run_time=0.8)
        self.attendre_voix()

    # ── 02 : la formule E(X) = n × p ────────────────────────────────────────

    def ecran_formule(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-formule")
        self.titre_ecran("La formule")
        self.au_mot("E de X")
        f = formule(84).move_to(P(-0.6, 1.3))
        self.play(FadeIn(f[:2], shift=UP * 0.1), run_time=0.4)
        self.au_mot("n fois p")
        self.play(FadeIn(f[2], scale=1.6), FadeIn(f[3]), FadeIn(f[4], scale=1.6), run_time=0.5)
        cad = SurroundingRectangle(f, color=JAUNE_TITRE, buff=0.25, stroke_width=4)
        self.play(Create(cad), run_time=0.4)
        calc = suite(self.t("200", 70, COUL_N), self.t("×", 70), self.t("0,15", 70, COUL_P), buff=0.25)
        calc.move_to(P(-1.4, -0.9))
        self.au_mot("200 fois")
        self.play(TransformFromCopy(f[2], calc[0]), FadeIn(calc[1]), run_time=0.5)
        self.play(TransformFromCopy(f[4], calc[2]), run_time=0.5)
        self.au_mot(": 30")
        res = suite(self.t("=", 70), self.t("30", 80, VERT_OK), buff=0.3).next_to(calc, RIGHT, buff=0.3)
        self.play(FadeIn(res, scale=1.5), run_time=0.45)
        self.insister(res[1], 0.3)
        self.attendre_voix()

    # ── 03 : le sens : la moyenne de nombreuses campagnes ───────────────────

    def ecran_sens(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-sens")
        self.titre_ecran("En moyenne")
        c = Campagnes(x0=-5.9, x1=3.0, y0=-2.0, unite=0.1, larg=0.46)
        self.play(Create(c.axe), run_time=0.4)
        self.au_mot("grand nombre de campagnes")
        barres = [c.barre(-5.5 + 0.63 * k, v) for k, v in enumerate(CAMPAGNES)]
        self.play(LaggedStart(*[GrowFromEdge(b, DOWN) for b in barres], lag_ratio=0.18), run_time=2.2)
        self.au_mot("de 200 appels")
        leg = suite(self.t("chaque barre : une campagne de", 28), self.t("200 appels", 30, COUL_N), buff=0.15)
        leg.next_to(c.axe, DOWN, buff=0.3).set_x(-1.0)
        self.play(FadeIn(leg, shift=UP * 0.1), run_time=0.5)
        self.au_mot("30 bénévoles")
        ligne = c.ligne(30)
        lab = suite(self.t("moyenne :", 32, MOYENNE), self.t("30", 44, MOYENNE), buff=0.15)
        lab.next_to(ligne, RIGHT, buff=0.2)
        self.play(Create(ligne), FadeIn(lab, scale=1.3), run_time=0.7)
        self.insister(lab[1], 0.3)
        self.attendre_voix()

    # ── 04 : pourquoi n × p : chaque appel rapporte p en moyenne ────────────

    def mot_branche(self, a, k, mob):
        """Un mot à droite de la carte, à la hauteur de la lettre k."""
        mob.next_to(a.carte, RIGHT, buff=0.2)
        mob.set_y(a.lab[k].get_y())
        return mob

    def ecran_pourquoi(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-pourquoi")
        self.titre_ecran("Pourquoi n × p ?")
        a = BrancheDouble().scale(1.0).move_to(P(-4.45, 1.05))
        self.au_mot("Chaque appel")
        tel = telephone(0.75).next_to(a.depart, LEFT, buff=0.12)
        self.play(FadeIn(a.socle()), FadeIn(tel, shift=RIGHT * 0.2), *[Create(b) for b in a.branches],
                  FadeIn(VGroup(*a.lab)), run_time=0.8)
        self.au_mot("rapporte en moyenne")
        mots = VGroup(self.mot_branche(a, 0, self.t("une recrue", 34, SUCCES)),
                      self.mot_branche(a, 1, self.t("pas de recrue", 34, ECHEC)))
        self.play(FadeIn(mots, shift=LEFT * 0.2), run_time=0.5)
        x0 = 1.35
        l1 = suite(self.t("en moyenne :", 36), self.t("p", 50, COUL_P), self.t("recrue", 36), buff=0.2)
        l1.move_to(P(x0, 1.9), aligned_edge=LEFT)
        self.au_mot("p recrue")
        nb = a.nombre(0, "p", fs=34)
        self.play(FadeIn(nb, scale=1.8), FadeIn(l1, shift=UP * 0.1), tel[1].animate.set_fill(ALLUME), run_time=0.6)
        self.insister(nb, 0.25)
        self.au_mot("l'espérance d'une Bernoulli")
        l2 = VGroup(self.t("= l'espérance", 36, BLEU_CALCUL), self.t("d'une Bernoulli", 36, BLEU_CALCUL))
        l2.arrange(DOWN, aligned_edge=LEFT, buff=0.12).move_to(P(x0, 0.75), aligned_edge=LEFT)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.6)
        self.au_mot("200 appels")
        rang = VGroup(*[telephone(0.72) for _ in range(8)]).arrange(RIGHT, buff=0.36).move_to(P(-3.9, -1.75))
        etc = self.t("…", 44).next_to(rang, RIGHT, buff=0.2)
        ps = VGroup(*[self.t("p", 40, COUL_P).next_to(r, UP, buff=0.12) for r in rang])
        self.play(LaggedStart(*[FadeIn(r, shift=UP * 0.2) for r in rang], lag_ratio=0.08), FadeIn(etc),
                  run_time=0.7)
        self.play(LaggedStart(*[FadeIn(q, scale=1.6) for q in ps], lag_ratio=0.08),
                  *[r[1].animate.set_fill(ALLUME) for r in rang], run_time=0.7)
        acc = Brace(VGroup(rang, etc), DOWN, color=COUL_N)
        n200 = self.t("200 appels", 32, COUL_N).next_to(acc, DOWN, buff=0.1)
        self.play(GrowFromCenter(acc), FadeIn(n200), run_time=0.5)
        self.au_mot("200 fois p")
        res = suite(self.t("200", 64, COUL_N), self.t("×", 60), self.t("p", 70, COUL_P), buff=0.22)
        res.move_to(P(2.9, -1.75))
        self.play(TransformFromCopy(n200, res[0]), FadeIn(res[1]), TransformFromCopy(ps, res[2]), run_time=0.8)
        self.insister(res, 0.3)
        self.attendre_voix()

    # ── 05 : le piège : pas exactement 30 ───────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        g = GrilleAppels(h=0.3, pas_x=0.28, pas_y=0.36).move_to(P(-3.75, -0.35))
        c = Campagnes(x0=0.2, x1=3.4, y0=-2.15, unite=0.11, larg=0.95)
        self.play(FadeIn(g), Create(c.axe), run_time=0.5)
        self.au_mot("exactement 30")
        faux = suite(self.t("exactement", 44, ORANGE_RETENUE), self.t("30", 52, ORANGE_RETENUE),
                     self.t("bénévoles ?", 44, ORANGE_RETENUE), buff=0.22).move_to(P(-0.6, 2.25))
        self.play(FadeIn(faux, scale=1.2), run_time=0.5)
        self.au_mot("parfois 25")
        croix = Line(faux.get_left() + LEFT * 0.1, faux.get_right() + RIGHT * 0.1, color=ROUGE_ERREUR, stroke_width=7)
        b25 = c.barre(1.0, 25)
        v25 = Text("25", font_size=44, color="#0F172A", weight=BOLD).move_to(b25)
        self.play(Create(croix), faux.animate.set_opacity(0.5), *g.allumer(tirage(25, 11)),
                  GrowFromEdge(b25, DOWN), FadeIn(v25, scale=1.5), run_time=0.8)
        self.au_mot("parfois 34")
        b34 = c.barre(2.55, 34)
        v34 = Text("34", font_size=44, color="#0F172A", weight=BOLD).move_to(b34)
        self.play(*g.allumer(tirage(34, 12)), GrowFromEdge(b34, DOWN), FadeIn(v34, scale=1.5), run_time=0.8)
        self.au_mot("30, c'est la moyenne")
        ligne = c.ligne(30)
        lab = VGroup(self.t("moyenne :", 32, MOYENNE), self.t("30", 52, MOYENNE)).arrange(DOWN, buff=0.08)
        lab.next_to(ligne, RIGHT, buff=0.2)
        self.play(Create(ligne), FadeIn(lab, scale=1.3), run_time=0.7)
        self.insister(lab[1], 0.3)
        self.attendre_voix()

    # ── 06 : défi : 50 clients, 0,4 ─────────────────────────────────────────

    def clients(self):
        g = VGroup(*[client(0.45) for _ in range(50)])
        g.arrange_in_grid(5, 10, buff=(0.12, 0.2)).move_to(P(-3.75, 0.15))
        return g

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        g = self.clients()
        x0 = 0.6
        self.au_mot("Une enquête")
        self.play(LaggedStart(*[FadeIn(k, shift=DOWN * 0.2) for k in g], lag_ratio=0.02), run_time=1.0)
        self.au_mot("50 clients")
        n50 = self.t("50 clients", 38, COUL_N).move_to(P(x0, 1.9), aligned_edge=LEFT)
        self.play(FadeIn(n50, scale=1.3), run_time=0.4)
        self.au_mot("satisfait")
        l2 = self.t("chacun satisfait :", 34).move_to(P(x0, 0.85), aligned_edge=LEFT)
        sat = tirage(21, 5, 50)
        self.play(FadeIn(l2, shift=UP * 0.1), *[g[k][1].animate.set_fill(ALLUME) for k in sat], run_time=0.6)
        self.au_mot("0,4")
        v = self.t("0,4", 50, COUL_P).next_to(l2, RIGHT, buff=0.25)
        self.play(FadeIn(v, scale=1.8), run_time=0.4)
        self.au_mot("en moyenne ?")
        q = suite(self.t("En moyenne :", 40), self.t("?", 60, ORANGE_RETENUE), buff=0.25)
        q.move_to(P(x0, -0.35), aligned_edge=LEFT)
        self.play(FadeIn(q, scale=1.2), run_time=0.5)
        self.play(Wiggle(q[1]), run_time=0.6)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        g = self.clients()
        self.add(g)
        x0 = 0.5
        self.au_mot("50 fois")
        calc = suite(self.t("50", 64, COUL_N), self.t("×", 60), self.t("0,4", 64, COUL_P), buff=0.22)
        calc.move_to(P(x0, 1.3), aligned_edge=LEFT)
        self.play(FadeIn(calc[:2], scale=1.3), run_time=0.4)
        self.au_mot("0,4 :")
        self.play(FadeIn(calc[2], scale=1.5), run_time=0.4)
        self.au_mot("20 clients")
        res = suite(self.t("=", 60), self.t("20", 72, VERT_OK), buff=0.25).next_to(calc, RIGHT, buff=0.25)
        self.play(FadeIn(res, scale=1.5), *[g[k][1].animate.set_fill(ALLUME) for k in tirage(20, 9, 50)],
                  run_time=0.6)
        self.insister(res[1], 0.3)
        self.au_mot("en moyenne")
        l2 = VGroup(self.t("clients satisfaits", 38), self.t("en moyenne", 38, VERT_OK)).arrange(DOWN, aligned_edge=LEFT, buff=0.25)
        l2.move_to(P(x0, -0.1), aligned_edge=LEFT)
        ok = self.coche(taille=0.35).next_to(res, RIGHT, buff=0.35)
        self.play(FadeIn(l2, shift=UP * 0.1), Create(ok), run_time=0.6)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 46
        l1 = suite(self.t("Si", fs), self.t("X", fs + 6, JAUNE_TITRE), self.t("suit", fs),
                   loi_B("n", "p", fs + 6), buff=0.22)
        l2 = formule(fs + 10)
        l3 = VGroup(self.t("une moyenne sur le long terme,", fs, VERT_OK),
                    self.t("pas une certitude", fs, ORANGE_RETENUE)).arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 11.5:
            lignes.scale_to_fit_width(11.5)
        lignes.move_to(P(-0.8, 0.1))
        for mot, l in zip(["Si X suit", "E de X égale", "une moyenne"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("pas une certitude")
        self.insister(l3[1], 0.3)
        self.attendre_voix(marge=1.0)

    # ── 08 : la fin (règle du 19/10) ────────────────────────────────────────

    def page_abonnement(self, voix="08-abonne"):
        """« Entraîne-toi sur » + eleveai.fr encadré, puis « Abonne-toi ! » +
        @eleveai974. Rien d'autre."""
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        entraine = self.t("Entraîne-toi sur", 46, JAUNE_TITRE).move_to(P(0, 2.05))
        site = self.t("eleveai.fr", 62, BLEU_CALCUL).move_to(P(0, 1.0))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        abonne = self.t("Abonne-toi !", 44, VERT_OK).move_to(P(0, -0.6))
        poignee = self.t("@eleveai974", 48, VERT_OK).move_to(P(0, -1.6))
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), run_time=0.4)
        self.play(GrowFromCenter(poignee), run_time=0.4)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3))
        self.attendre_voix(marge=1.4)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_formule()
        self.ecran_sens()
        self.ecran_pourquoi()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")


class ProbaBinEsperanceSTMG(ProbaBinEsperanceBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "bleue"
