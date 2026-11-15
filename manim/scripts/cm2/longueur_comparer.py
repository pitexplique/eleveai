# longueur_comparer.py
# EleveAI — Maths CM2 — série « Longueurs », épisode 01 : COMPARER DES LONGUEURS
# (micro longueur_comparer, notion longueur), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Short jumeau : avions en papier 3,8 m / 3,15 m (réponse B).
# Décor et métier : Léonie, COUREUSE DE TRAIL (centres : sport, nature).
# Mapping micro → écrans : 02 (d'abord la même unité : le mètre, 1 km = 1000 m), 03 (convertir par le
# tableau : 12,5 km = 12 500 m, 12 km 300 m = 12 300 m, les zéros qui complètent), 04 (ranger sur une droite
# graduée : 12 300 < 12 450 < 12 500), 06 (piège : 3,45 n'est pas plus grand que 3,5 ; chiffre par chiffre,
# 3,5 = 3,50), questions 05 (3,45 m / 3,5 m, B) et 07 (sauts 4,08 m / 4,8 m / 4 m 75 cm, A),
# défi 08 (ranger 1,3 km, 1 km 250 m, 1 280 m).
# Voix : manim/voix/cm2-longueur-comparer.json (validée le 15/11, Julie, débit −6) ;
# marques : longueur_comparer_marques.json (python manim/scripts/cm2/aire_marques_cm2.py longueur:comparer).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm2/longueur_comparer.py LongueurComparerCM2
# python -m manim render -qh --disable_caching manim/scripts/cm2/longueur_comparer.py LongueurComparerCM2 -o eleveai-maths-cm2-longueur-comparer --media_dir manim/scripts/cm2/media-longueur-01
# Sortie : manim/sorties/cm2/maths/longueurs/01-comparer/eleveai-maths-cm2-longueur-comparer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from longueur_cm2_commun import *  # noqa: E402,F403

# ── Les milliers (« 12 500 ») : la voix les écrit avec une espace, l'audit et la synchro les lisent en un
# seul nombre (« 12500 »). Pour CE script seulement : la voix de la scène est réécrite « 12500 » (marques
# recalées), et les jetons d'un texte aussi. Les extraits d'au_mot s'écrivent donc « 12500 ».
import re  # noqa: E402

import stats_lycee_j2_commun as _j2  # noqa: E402

_MIL = re.compile(r"(?<=\d) (?=\d{3}(?!\d))")
_jetons_orig = getattr(_j2, "_jetons_orig", _j2._jetons)


def _jetons_mil(s):
    return _jetons_orig(_MIL.sub("", s))


_j2._jetons_orig = _jetons_orig
_j2._jetons = _jetons_mil
try:
    import frac_lotc_commun as _lc  # noqa: E402
    _lc._jetons = _jetons_mil
except ImportError:
    pass

# La découpe d'un texte en morceaux (un par nombre) ne coupe plus « 12 300 » en « 12 » / « 300 » :
# l'espace des milliers compte comme un chiffre pour trouver les débuts de nombres.
_morceaux_orig = getattr(_j2, "_morceaux_orig", _j2._morceaux)


def _morceaux_mil(t):
    """_morceaux du module J2, mais « 12 300 » est UN nombre (pas de coupe après l'espace des milliers)."""
    s = t.original_text
    if not _MIL.search(s):
        return _morceaux_orig(t)
    s2 = _MIL.sub("0", _j2._ENUM.sub(lambda x: " " * len(x.group(0)), s))
    debuts = [m.start() for m in re.finditer(r"[0-9]+(?:[,.][0-9]+)?", s2)]
    if len(debuts) < 2 or len(t.submobjects) != sum(1 for c in s if not c.isspace()):
        return [t]
    bornes = [0] + debuts[1:] + [len(s)]
    out, k = [], 0
    for a, b in zip(bornes[:-1], bornes[1:]):
        n = sum(1 for c in s[a:b] if not c.isspace())
        g = _j2._Morceau(*t.submobjects[k:k + n])
        g.original_text = s[a:b]
        k += n
        if n:
            out.append(g)
    return out


_j2._morceaux_orig = _morceaux_orig
_j2._morceaux = _morceaux_mil


def fixe(m):
    """Une étiquette qui mêle deux nombres déjà dits (« 12 km 300 m ») : d'un bloc, hors synchro et audit,
    posée au mot par le script."""
    hors_audit(m)
    for f in m.get_family():
        f._bloc = True
    return m


def sans_milliers(s):
    """« 12 500 » → « 12500 ». Renvoie (texte, carte) : carte[i] = la place du caractère i dans le nouveau texte."""
    res, carte, pos = "", [], 0
    for m in _MIL.finditer(s):
        for k in range(pos, m.start()):
            carte.append(len(res) + k - pos)
        res += s[pos:m.start()]
        carte.append(len(res))
        pos = m.end()
    for k in range(pos, len(s) + 1):
        carte.append(len(res) + k - pos)
    res += s[pos:]
    return res, carte


class VoixMilliers:
    """À mettre EN PREMIER : la voix et les marques sans l'espace des milliers ; et des instants forcés
    (_forces) pour les morceaux de réponse que les marques placent mal (mots groupés, nombre redit)."""
    _forces = {}

    def _textes(self):
        if not hasattr(self, "_cache_textes_mil"):
            self._cache_textes_mil = {k: sans_milliers(v)[0] for k, v in super()._textes().items()}
        return self._cache_textes_mil

    def _marques(self):
        if not hasattr(self, "_cache_marques_mil"):
            bruts = super()._textes()
            res = {}
            for cle, L in super()._marques().items():
                carte = sans_milliers(bruts.get(cle, ""))[1]
                res[cle] = [[carte[min(p, len(carte) - 1)], t] for p, t in L]
            self._cache_marques_mil = res
        return self._cache_marques_mil

    def au_t(self, t):
        """Attend l'instant t (s) de la voix de l'écran (lu sur l'énergie du WAV, quand les marques groupent)."""
        d = self._debut_voix + t - self.renderer.time
        if d > 0.02:
            self.wait(d)

    def _force(self, f):
        cle = getattr(self, "_cle_voix", None)
        t = self._forces.get((cle, getattr(f, "original_text", None)))
        if t is None:
            for x in f.get_family():
                c = getattr(x, "_force_t", None)
                if c is not None and c[0] == cle:
                    return c[1]
        return t

    def _disposer_q(self, question, choix, phrase):
        r = super()._disposer_q(question, choix, phrase)
        for (cle, txt), t in self._forces.items():
            for f in r[5].get_family():
                if isinstance(f, Text) and f.original_text == txt:
                    for x in f.get_family():
                        x._force_t = (cle, t)
        return r

    def _attente(self, textes):
        for f in textes:
            t = self._force(f)
            if t is not None:
                return max(0.0, self._debut_voix + t - self.renderer.time)
        return super()._attente(textes)

ROCHE = "#64748b"
ROCHE_C = "#94a3b8"
NEIGE = "#f8fafc"
SABLE = "#fcd34d"
PISTES = [PISTE, "#f472b6", "#a78bfa"]  # les trois parcours de Léonie


# ── Les dessins de l'épisode ────────────────────────────────────────────────

def montagne(s=1.0, trail=True):
    """Deux sommets (roche, neige) et le sentier de trail en pointillés orange jusqu'au drapeau."""
    fond = Polygon(P(-0.4, -1.0), P(2.1, -1.0), P(1.1, 0.65), fill_color=ROCHE, fill_opacity=1, stroke_width=0)
    neige2 = Polygon(P(0.82, 0.19), P(1.38, 0.19), P(1.1, 0.65), fill_color=NEIGE, fill_opacity=1, stroke_width=0)
    corps = Polygon(P(-2.0, -1.0), P(1.4, -1.0), P(-0.25, 1.35), fill_color=ROCHE_C, fill_opacity=1,
                    stroke_color="#475569", stroke_width=2)
    neige = Polygon(P(-0.72, 0.68), P(0.22, 0.68), P(-0.25, 1.35), fill_color=NEIGE, fill_opacity=1,
                    stroke_width=0)
    g = VGroup(fond, neige2, corps, neige)
    if trail:
        c = VMobject(stroke_color=PISTE, stroke_width=6)
        c.set_points_smoothly([P(x, y) for x, y in ((-1.55, -0.95), (-0.4, -0.6), (-1.0, -0.15), (-0.15, 0.25),
                                                    (-0.55, 0.62), (-0.25, 1.3))])
        sentier = DashedVMobject(c, num_dashes=22)
        mat = Line(P(-0.25, 1.32), P(-0.25, 1.82), color=WHITE, stroke_width=4)
        fl = Polygon(P(-0.25, 1.82), P(-0.25, 1.58), P(0.12, 1.7), fill_color=ROUGE_ERREUR, fill_opacity=1,
                     stroke_width=0)
        g.add(sentier, mat, fl)
    return g.scale(s)


def drapeau_fin(m, couleur=WHITE):
    """Un petit drapeau d'arrivée au bout droit d'un ruban (un parcours)."""
    x, y = m.get_right()[0], m.get_center()[1]
    mat = Line(P(x, y - 0.05), P(x, y + 0.42), color=couleur, stroke_width=3)
    fl = Polygon(P(x, y + 0.42), P(x, y + 0.24), P(x + 0.24, y + 0.33), fill_color=ROUGE_ERREUR, fill_opacity=1,
                 stroke_width=0)
    return VGroup(mat, fl)


def parcours(longueurs, ech, buff=0.42, ep=0.26):
    """Les parcours de trail : des rubans alignés à gauche (à l'échelle), un drapeau au bout."""
    g = rubans_alignes(longueurs, PISTES, ech, buff=buff, ep=ep)
    for r in g:
        r.add(drapeau_fin(r))
    return g


class LongueurComparerBase(VoixMilliers, PaysageLongueurCM2):
    nom_voix = "cm2-longueur-comparer"
    fichier_marques = "longueur_comparer_marques.json"
    ceinture = "jaune"

    # Morceaux de réponse mal placés par les marques (nombre redit, mots groupés) : instant lu sur le WAV.
    _forces = {("05b-reponse", "350 est plus grand :"): 12.65, ("05b-reponse", "3,5 m est le plus long."): 14.64,
               ("07b-reponse", "480,"): 9.01}

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Comparer des longueurs", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Comparer des longueurs")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.t("Lequel est le plus long :", 38, WHITE)
        q1 = self.ligne([("12,5 km", JAUNE_TITRE), ("ou 12 km 300 m ?", JAUNE_TITRE)], 38, buff=0.25)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        m = montagne(1.0).move_to(P(3.6, 0.45))
        self.au_mot("Lequel est le plus long")
        self.play(FadeIn(q0, shift=UP * 0.2), FadeIn(m, shift=LEFT * 0.3), run_time=0.35)
        self.au_mot("12,5")
        self.play(FadeIn(q1[0], shift=UP * 0.2), run_time=0.25)
        self.au_mot("ou 12 kilomètres 300")
        self.play(FadeIn(q1[1], shift=UP * 0.2), Indicate(m[4], color=JAUNE_TITRE), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 01 : Léonie, coureuse de trail ──────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = leonie(0.95).move_to(P(-5.6, 0.25))
        mt = montagne(0.95).move_to(P(-2.55, 0.55))
        self.au_mot("Voici Léonie")
        nom = self.t("Léonie", 42, PISTE).next_to(pe, UP, buff=0.2)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        XP = 0.5  # colonne de droite : tout finit avant x = 6,2 ; Ti-Margo libre (x < 5,3 en bas)
        l0 = self.bloc(["Elle court des trails :", "des courses en montagne."], 30)
        self.col(l0, 2.9, XP)
        self.au_mot("Elle court des trails")
        met = self.bloc(["coureuse", "de trail"], 26, PISTE).next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("courses en montagne")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(mt, shift=UP * 0.2), run_time=0.4)
        l1 = self.bloc(["Elle hésite entre", "trois parcours :"], 30, JAUNE_TITRE)  # une ligne allait au bord
        self.col(l1, 1.8, XP)
        self.au_mot("hésite entre trois parcours")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        g = parcours([12.5, 12.3, 12.45], 0.22, buff=0.36)
        g.move_to(P(0, -0.15)).align_to(P(XP, 0), LEFT)
        textes = [("12,5", "12,5 km"), ("12 kilomètres 300", "12 km 300 m"), ("12450", "12 450 m")]
        for k, (mot, s) in enumerate(textes):
            self.au_mot(mot)
            e = etiq(g[k], s, 24, audit=True)
            if k == 1:
                fixe(e)  # « 12 km 300 m » : posé au mot « 300 », le 12 est déjà dit
            self.play(GrowFromEdge(g[k], LEFT), FadeIn(e), run_time=0.35)
        l2 = self.bloc(["Pour s'entraîner,", "elle veut le plus court."], 30)
        self.col(l2, -1.65, XP)  # ≥ 0,3 sous la 3e barre
        self.au_mot("Pour s'entraîner")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("le plus court")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Lequel")
        q = self.t("Lequel ?", 44, JAUNE_TITRE).move_to(P(2.0, -2.65))
        self.play(FadeIn(q, scale=1.2), Wiggle(g), run_time=0.5)
        self.attendre_voix()

    # ── 02 : d'abord la même unité ──────────────────────────────────────────
    def ecran_meme_unite(self):
        self.ecran("02-meme-unite")
        XP = 0.6
        l0 = self.bloc(["Comme pour toutes les mesures :", "d'abord la même unité."], 32)
        l0[1].set_color(ORANGE_RETENUE)
        self.col(l0, 2.3, XP)
        mt = montagne(0.9, trail=False).move_to(P(-3.6, 1.65))
        self.au_mot("Comme pour")
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(mt, shift=UP * 0.2), run_time=0.35)
        self.au_mot("la même unité")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        l1 = self.ligne([("Ici,", WHITE), ("le mètre.", VERT_OK)], 40, buff=0.2)
        self.col(l1, 0.95, XP)
        self.au_mot("Ici, le mètre")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        # 1 km de sentier = 10 tronçons de 100 m
        route = VGroup(*[Rectangle(width=0.5, height=0.3, fill_color=PISTE if k % 2 else "#fdba74",
                                   fill_opacity=1, stroke_width=0) for k in range(10)]).arrange(RIGHT, buff=0)
        route.move_to(P(-3.6, -0.75))
        dep = Dot(route.get_left(), radius=0.09, color=WHITE)
        arr = drapeau_fin(route)
        haut = accolade(route, "1 km", 34, BLEU_D)
        bas = accolade(route, "1000 m", 34, VERT_OK, dessus=False)
        l2 = self.ligne([("1 km", BLEU_D), ("= 1000 m", VERT_OK)], 50, buff=0.3)
        self.col(l2, -0.75, XP)
        self.au_mot("1 kilomètre")
        self.play(FadeIn(l2[0], shift=UP * 0.1), GrowFromEdge(route, LEFT), FadeIn(dep), FadeIn(arr),
                  FadeIn(haut), run_time=0.45)
        self.au_mot("c'est 1000")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(bas, shift=UP * 0.1), run_time=0.35)
        self.insister(l2, 1.12, 0.25)
        self.attendre_voix()

    # ── 03 : convertir avec le tableau ──────────────────────────────────────
    def ecran_convertir(self):
        self.ecran("03-convertir")
        XP = -0.2  # « 12 450 m reste comme ça. » finit à x ≈ 6,2 (tableau : x ≤ −1,65)
        tb = tableau_conv(["km", "hm", "dam", "m"], cw=1.05, ch=0.62, fs=24, surligne=("m",))
        tb.move_to(P(-3.75, 2.05))
        g = parcours([12.5, 12.3, 12.45], 0.25, buff=0.4)
        g.move_to(P(0, -0.85)).align_to(P(-6.1, 0), LEFT)
        ets = [etiq(r, s, 26) for r, s in zip(g, ("12,5 km", "12 km 300 m", "12 450 m"))]
        self.add(tb, g, *ets)
        # 12,5 km : 12 km et demi
        l1 = self.ligne([("12,5 km :", BLEU_D), ("12 km", WHITE), ("et demi,", WHITE)], 34, buff=0.2)
        self.col(l1, 2.6, XP)
        self.au_mot("12,5 kilomètres")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(ets[0], color=JAUNE_TITRE), run_time=0.3)
        self.au_mot("12 kilomètres et")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("et demi")
        c1 = [chiffre(tb, "km", "12"), chiffre(tb, "hm", "5")]
        self.play(FadeIn(l1[2], shift=UP * 0.1), FadeIn(c1[0], scale=1.3), FadeIn(c1[1], scale=1.3), run_time=0.3)
        l2 = self.ligne([("= 12 500 m", VERT_OK)], 40)
        self.col(l2, 1.85, XP + 0.3)
        self.au_mot("12500")
        z1 = [chiffre(tb, "dam", "0", ORANGE_RETENUE), chiffre(tb, "m", "0", ORANGE_RETENUE)]
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(z1[0], scale=1.3), FadeIn(z1[1], scale=1.3),
                  Transform(ets[0], etiq(g[0], "12 500 m", 26, VERT_OK)), run_time=0.4)
        # 12 km 300 m : 12 300 m
        l3 = self.ligne([("12 km", BLEU_D), ("300 m :", BLEU_D), ("12 300 m", VERT_OK)], 34, buff=0.2)
        hors_audit(l3[0])
        self.col(l3, 0.95, XP)
        self.au_t(6.25)  # « 12 kilomètres » n'a pas de marque à lui (groupé avec « 12 500 mètres »)
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeOut(VGroup(*c1, *z1)), Indicate(ets[1], color=JAUNE_TITRE),
                  run_time=0.3)
        self.au_mot("300 mètres :")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.25)
        c2 = [chiffre(tb, "km", "12"), chiffre(tb, "hm", "3"), chiffre(tb, "dam", "0", ORANGE_RETENUE),
              chiffre(tb, "m", "0", ORANGE_RETENUE)]
        self.au_mot("12300")
        self.play(FadeIn(l3[2], shift=UP * 0.1), *[FadeIn(c, scale=1.3) for c in c2],
                  Transform(ets[1], etiq(g[1], "12 300 m", 26, VERT_OK)), run_time=0.4)
        # 12 450 m reste comme ça
        l4 = self.ligne([("12 450 m", BLEU_D), ("reste comme ça.", WHITE)], 34, buff=0.2)
        self.col(l4, 0.15, XP)
        self.au_mot("Et 12450")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("reste comme ça")
        self.play(FadeIn(l4[1], shift=UP * 0.1), ets[2].animate.set_color(VERT_OK), run_time=0.3)
        self.attendre_voix()

    # ── 04 : ranger sur la droite graduée ───────────────────────────────────
    def ecran_ranger(self):
        self.ecran("04-ranger")
        tit = self.t("On range :", 44, JAUNE_TITRE).move_to(P(-4.6, 2.95))
        x0, x1, v0, v1 = -5.6, 4.4, 12200, 12600
        X = lambda v: x0 + (v - v0) * (x1 - x0) / (v1 - v0)  # noqa: E731
        y = 1.35
        axe = Arrow(P(x0 - 0.3, y), P(x1 + 0.6, y), buff=0, color=WHITE, stroke_width=4,
                    max_tip_length_to_length_ratio=0.03)
        traits = VGroup(*[Line(P(X(v), y - (0.18 if v % 100 == 0 else 0.1)), P(X(v), y + (0.18 if v % 100 == 0 else 0.1)),
                               color=WHITE, stroke_width=3 if v % 100 == 0 else 2) for v in range(v0, v1 + 1, 50)])
        nums = VGroup(*[hors_audit(Text(f"{v // 1000} {v % 1000:03d}", font_size=22, color=GRAY_B))
                        .move_to(P(X(v), y - 0.45)) for v in range(v0, v1 + 1, 100)])
        unite = hors_audit(Text("(en m)", font_size=22, color=GRAY_B)).move_to(P(x1 + 0.35, y + 0.42))  # au-dessus de la flèche, loin de « 12 600 »
        self.au_mot("On range")
        self.play(Write(tit), FadeIn(axe), FadeIn(traits), FadeIn(nums), FadeIn(unite), run_time=0.3)
        vals = [12300, 12450, 12500]
        cols = [PISTES[1], PISTES[2], PISTES[0]]
        pts = []
        for v, c in zip(vals, cols):
            d = Dot(P(X(v), y), radius=0.13, color=c)
            tige = Line(P(X(v), y + 0.15), P(X(v), y + 0.6), color=c, stroke_width=4)
            e = hors_audit(Text(f"{v // 1000} {v % 1000:03d} m", font_size=26, color=c, weight=BOLD))
            e.move_to(P(X(v), y + 0.85))
            pts.append(VGroup(d, tige, e))
        # 12 450 et 12 500 sont proches : les étiquettes à deux hauteurs
        pts[2][1].put_start_and_end_on(P(X(12500), y + 0.15), P(X(12500), y + 1.15))
        pts[2][2].move_to(P(X(12500) + 0.3, y + 1.4))
        rg = self.ligne([("12 300", BLEU_D), ("<", WHITE), ("12 450", BLEU_D), ("<", WHITE), ("12 500", BLEU_D)],
                        48, buff=0.3)
        rg.move_to(P(-0.6, -0.2))
        for k, mot in enumerate(("12300, puis", "12450, puis", "12500. Le")):
            self.au_mot(mot)
            anims = [FadeIn(rg[2 * k], shift=UP * 0.1), FadeIn(pts[k], scale=1.2)]
            if k:
                anims.append(FadeIn(rg[2 * k - 1]))
            self.play(*anims, run_time=0.3)
        res = self.ligne([("Le plus court :", WHITE), ("12 km 300 m", VERT_OK)], 42, buff=0.25)
        res.move_to(P(-0.6, -1.25))
        self.au_mot("Le plus court")
        self.play(FadeIn(res[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("12 kilomètres 300")
        self.play(FadeIn(res[1], scale=1.2), Indicate(pts[0], color=VERT_OK), Indicate(rg[0], color=VERT_OK),
                  run_time=0.45)
        pe = leonie(0.5).move_to(P(-5.4, -2.25))
        pr = self.t("Léonie le choisit pour s'entraîner.", 32, GRAY_B)
        pr.move_to(P(-0.6, -2.3))
        self.au_mot("Léonie le choisit")
        self.play(FadeIn(pr, shift=UP * 0.1), FadeIn(pe, shift=UP * 0.2), run_time=0.35)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = rubans_alignes([345, 350], [RUBAN, RUBAN2], 0.012, buff=0.55, ep=0.32)
        g.move_to(P(0, 1.55)).align_to(P(-6.1, 0), LEFT)
        ets = [etiq(g[0], "3,45 m", 28), etiq(g[1], "3,5 m", 28)]

        def autres_q(sc):
            sc.play(FadeIn(g), FadeIn(ets[0]), FadeIn(ets[1]), run_time=0.35)

        self.question_gauche("05-question", "05b-reponse",
                             ["Qu'est-ce qui est le plus long :", "3,45 m ou 3,5 m ?"],
                             [self.choix("3,45 m"), self.choix("3,5 m"), self.choix("c'est pareil")], 1,
                             ["3,45 m = 345 cm", "3,5 m = 350 cm", "350 est plus grand :",
                              "3,5 m est le plus long."],
                             -0.75, couper={0: ("3,45 m =", "345 cm"), 1: ("3,5 m =", "350 cm")},
                             sans_audit=(2, 3), mot_q="Qu'est-ce qui est", autres_q=autres_q)

    # ── 06 : le piège (3,45 contre 3,5) ─────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        # à gauche : les deux nombres, chiffre sous chiffre (unités, dixièmes, centièmes)
        XS = (-5.0, -3.5, -2.0)  # colonnes de 1,45 : « centièmes » y tient
        tetes = VGroup()
        for x, s in zip(XS, ("unités", "dixièmes", "centièmes")):
            r = Rectangle(width=1.45, height=0.5, fill_color="#1e3a8a", fill_opacity=1, stroke_color=WHITE,
                          stroke_width=2).move_to(P(x, 1.75))
            tetes.add(VGroup(r, hors_audit(Text(s, font_size=16, color=WHITE, weight=BOLD).move_to(r))))
        fond = VGroup(*[Rectangle(width=1.45, height=2.1, fill_color="#0f172a", fill_opacity=1, stroke_color=WHITE,
                                  stroke_width=2).move_to(P(x, 0.45)) for x in XS])
        YA, YB = 0.95, -0.05

        def chif(s, x, y, c=WHITE):
            return hors_audit(Text(s, font_size=64, color=c, weight=BOLD).move_to(P(x, y)))

        def virg(y, c=WHITE):
            return hors_audit(Text(",", font_size=64, color=c, weight=BOLD).move_to(P((XS[0] + XS[1]) / 2, y - 0.2)))

        na = VGroup(chif("3", XS[0], YA), virg(YA), chif("4", XS[1], YA), chif("5", XS[2], YA))
        nb = VGroup(chif("3", XS[0], YB), virg(YB), chif("5", XS[1], YB))
        zero = chif("0", XS[2], YB, ORANGE_RETENUE)
        XP = -0.6  # le tableau finit à x = −1,28 ; les lignes finissent avant x = 6
        l0 = self.ligne([("3,45", ROUGE_ERREUR), ("n'est pas plus grand", WHITE)], 34, buff=0.2)
        self.col(l0, 2.2, XP)
        self.au_mot("3,45 n'est")
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(tetes), FadeIn(fond), FadeIn(na), run_time=0.3)
        self.au_mot("n'est pas plus grand")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.25)
        l1 = self.ligne([("que 3,5", ROUGE_ERREUR), ("parce que", WHITE), ("45", ROUGE_ERREUR), ("> 5.", ROUGE_ERREUR)],
                        34, buff=0.2)
        self.col(l1, 1.55, XP)
        self.au_mot("que 3,5")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(nb), run_time=0.25)
        self.au_mot("parce que")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.2)
        self.au_mot("45 est")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.2)
        self.au_mot("5. Après")
        barre_ = Line(VGroup(l1[2], l1[3]).get_corner(DL), VGroup(l1[2], l1[3]).get_corner(UR), color=ROUGE_ERREUR,
                      stroke_width=6)
        self.play(FadeIn(l1[3], shift=UP * 0.1), run_time=0.2)
        self.play(Create(barre_), run_time=0.25)
        l2 = self.bloc(["Après la virgule, on compare", "chiffre par chiffre :"], 32)
        self.col(l2, 0.55, XP)
        self.au_mot("Après la virgule")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("chiffre par")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("4 dixièmes", ROUGE_ERREUR), ("contre", WHITE), ("5 dixièmes", VERT_OK)], 32, buff=0.22)
        self.col(l3, -0.45, XP)
        cadre = SurroundingRectangle(VGroup(na[2], nb[2]), color=JAUNE_TITRE, buff=0.12, stroke_width=6)
        self.au_mot("4 dixièmes")
        self.play(FadeIn(l3[0], shift=UP * 0.1), Create(cadre), na[2].animate.set_color(ROUGE_ERREUR), run_time=0.3)
        self.au_mot("contre")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.2)
        self.au_mot("5 dixièmes")
        self.play(FadeIn(l3[2], shift=UP * 0.1), nb[2].animate.set_color(VERT_OK), run_time=0.25)
        l4 = self.ligne([("3,5", VERT_OK), ("= 3,50", VERT_OK), (": plus que 3,45", WHITE)], 36, buff=0.22)
        self.col(l4, -1.4, XP)
        self.au_mot("3,5, c'est")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("c'est 3,50")
        self.play(FadeIn(l4[1], shift=UP * 0.1), FadeIn(zero, scale=1.5), run_time=0.3)
        self.au_mot("plus que 3,45")
        self.play(FadeIn(l4[2], shift=UP * 0.1), run_time=0.3)
        self.insister(l4, 1.06, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = rubans_alignes([408, 480, 475], [SABLE, RUBAN4, RUBAN2], 0.0085, buff=0.4, ep=0.28)  # « 4 m 75 cm » finit à x ≈ 0,4 (cartes : 0,95)
        g.move_to(P(0, 1.45)).align_to(P(-5.9, 0), LEFT)
        planche = Rectangle(width=0.12, height=g.height + 0.35, fill_color=WHITE, fill_opacity=1, stroke_width=0)
        planche.move_to(g.get_left() + LEFT * 0.1)
        ets = [etiq(r, s, 26) for r, s in zip(g, ("4,08 m", "4,8 m", "4 m 75 cm"))]

        def autres_q(sc):
            sc.play(FadeIn(planche), FadeIn(g), *[FadeIn(e) for e in ets], run_time=0.35)

        self.question_gauche("07-question", "07b-reponse",
                             ["Trois sauts en longueur :", "4,08 m, 4,8 m et 4 m 75 cm.", "Lequel est le plus long ?"],
                             [self.choix("4,8 m"), self.choix("4,08 m"), self.choix("4 m 75 cm")], 0,
                             ["En cm : 408, 480 et 475.", "Le plus grand : 480,", "c'est le saut de 4,8 m."],
                             -0.75, couper={0: ("En cm : 408,", "480 et 475."), 1: ("Le plus grand :", "480,")},
                             mot_q="Trois sauts", autres_q=autres_q)

    # ── 08 : le défi (ranger trois parcours) ────────────────────────────────
    NOMS = ("1,3 km", "1 km 250 m", "1 280 m")

    def trois(self):
        return parcours([1300, 1250, 1280], 0.0034, buff=1.0, ep=0.3)  # l'étiquette au-dessus de chaque barre a sa place

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        g = self.trois()
        g.move_to(P(0, 0.55)).align_to(P(-6.0, 0), LEFT)
        l0 = self.t("Range du plus court", 34, JAUNE_TITRE)
        self.col(l0, 2.1, 0.8)
        l1 = self.t("au plus long :", 34, JAUNE_TITRE)
        self.col(l1, 1.45, 0.8)
        self.au_mot("Range du plus court")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        self.au_mot("au plus long")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        for k, (mot, s) in enumerate(zip(("1,3 kilomètre", "250 mètres", "et 1280"), self.NOMS)):
            self.au_mot(mot)
            e = etiq(g[k], s, 28, cote=UP, buff=0.12, audit=True).align_to(g[k], LEFT)
            if k == 1:
                fixe(e)  # « 1 km 250 m » : posé au mot « 250 », le 1 est déjà dit
            self.play(GrowFromEdge(g[k], LEFT), FadeIn(e), run_time=0.3)
        self.pause_defi(y=0.2)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        g = self.trois()
        g.move_to(P(0, 0.6)).align_to(P(-5.6, 0), LEFT)
        ets = [etiq(r, s, 28, cote=UP, buff=0.12).align_to(r, LEFT) for r, s in zip(g, self.NOMS)]
        self.add(g, *ets)
        XP = 0.6
        l0 = self.t("Tout en mètres :", 36, ORANGE_RETENUE)
        self.col(l0, 2.35, XP)
        self.au_mot("Tout en mètres")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        l1 = self.ligne([("1,3 km", BLEU_D), ("= 1 300 m", VERT_OK)], 36, buff=0.25)
        self.col(l1, 1.65, XP)
        self.au_mot("1,3 kilomètre")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("1300 mètres")
        self.play(FadeIn(l1[1], shift=UP * 0.1),
                  Transform(ets[0], etiq(g[0], "1 300 m", 28, VERT_OK, cote=UP, buff=0.12).align_to(g[0], LEFT)),
                  run_time=0.4)
        l2 = self.ligne([("1 km 250 m", BLEU_D), ("= 1 250 m", VERT_OK)], 36, buff=0.25)
        fixe(l2[0])  # « 1 km 250 m » : posé au mot « 250 »
        self.col(l2, 0.98, XP)
        self.au_mot("250 mètres, 1250")  # la marque du « 250 » (7,67 s) : « 1 kilomètre » n'a pas la sienne
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("1250 mètres")
        self.play(FadeIn(l2[1], shift=UP * 0.1),
                  Transform(ets[1], etiq(g[1], "1 250 m", 28, VERT_OK, cote=UP, buff=0.12).align_to(g[1], LEFT)),
                  run_time=0.4)
        l3 = self.ligne([("Et", WHITE), ("1 280 m.", BLEU_D)], 36, buff=0.2)
        self.col(l3, 0.3, XP)
        self.au_mot("Et 1280")
        self.play(FadeIn(l3, shift=UP * 0.1), ets[2].animate.set_color(VERT_OK), run_time=0.3)
        # le nouvel ordre, du plus court au plus long : 1 250, 1 280, 1 300 (mêmes places)
        ordre = [1, 2, 0]
        places = [VGroup(ets[i], g[i]).copy() for i in range(3)]
        y_places = [p[1].get_y() for p in places]
        res = self.pile([("1 km 250 m,", VERT_OK), ("puis 1 280 m,", VERT_OK), ("puis 1,3 km.", VERT_OK)], 36,
                        buff=0.12)
        self.col(res, -1.0, XP)  # ≥ 0,3 sous « Et 1 280 m. »
        self.au_mot("Donc :")
        anims = [VGroup(ets[i], g[i]).animate.shift(UP * (y_places[k] - g[i].get_y())) for k, i in enumerate(ordre)]
        self.play(*anims, run_time=0.8)
        rangs = []
        for k, i in enumerate(ordre):
            n = hors_audit(Text(str(k + 1), font_size=34, color=JAUNE_TITRE, weight=BOLD))
            n.move_to(P(-6.05, y_places[k]))
            rangs.append(n)
        self.play(FadeIn(res[0], shift=UP * 0.1), FadeIn(rangs[0], scale=1.4),
                  Indicate(g[1], color=VERT_OK, scale_factor=1.04), run_time=0.3)
        self.au_mot("puis 1280")
        self.play(FadeIn(res[1], shift=UP * 0.1), FadeIn(rangs[1], scale=1.4),
                  Indicate(g[2], color=VERT_OK, scale_factor=1.04), run_time=0.3)
        self.au_mot("puis 1,3")
        self.play(FadeIn(res[2], shift=UP * 0.1), FadeIn(rangs[2], scale=1.4),
                  Indicate(g[0], color=VERT_OK, scale_factor=1.04), run_time=0.3)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = VGroup(montagne(0.9), leonie(0.62)).arrange(DOWN, buff=0.3)
        lignes = self.finale_gauche(fig, textes=[
            ("Pour comparer des longueurs,", "on les écrit dans la même unité."),
            ("Avec des nombres à virgule,", "on compare chiffre par chiffre :"),
            ("3,5 = 3,50, plus que 3,45.",)], fs=32)
        self.add(fig)
        self.au_mot("Pour comparer")
        self.montrer_ligne(lignes[0], Indicate(fig[0], scale_factor=1.05))
        self.au_mot("Avec des nombres")
        self.montrer_ligne(lignes[1])
        self.au_mot("chiffre : 3,5")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_meme_unite()
        self.ecran_convertir()
        self.ecran_ranger()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class LongueurComparerCM2(LongueurComparerBase):
    identite = "Maths CM2 — EleveAI"
    ceinture = "jaune"
