# decimal_commun.py
# EleveAI — série « Nombres décimaux » 6e (07/11/2026) : les OUTILS COMMUNS aux
# 12 paysages (decimal_<slug>.py). Pas de scène ici. Modèle : série Triangles
# (triangle_nommer.py), bases PaysageProp + FinTriangles (prop_commun.py).
#
# ⭐ La voix dit « 1 virgule 4 », l'écran écrit « 1,4 ». La voix lue par la scène
#   (self._texte_voix) et les marques mot à mot sont donc NORMALISÉES ici :
#   « 1 virgule 4 » devient « 1,4 », les positions des marques suivent. L'audit
#   (AUDIT=1) et la synchro par jetons comparent ainsi « 1,4 » à « 1,4 ».
#   Dans une scène : self.au_mot("1,4 kilogramme").
# ⭐ TableauNum : le tableau de numération (Unités | , | Dixièmes | Centièmes…),
#   chiffres posés par .chiffre(rang, valeur) — hors audit (un chiffre seul dans
#   sa case n'est pas « dit » seul : il est dit dans « 2,35 »).
# ⭐ Les animaux de Léna (chaton, lapin, chat, chiot) et la balance.

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F401,F403
from canvas_angles import visage  # noqa: E402,F401
from canvas_triangles import FinTriangles  # noqa: E402,F401

AMBRE_D = "#fbbf24"
BLEU_D = "#60a5fa"
ROSE_D = "#f472b6"
VIOLET_D = "#a78bfa"
CASE = "#334155"

_VIRG = re.compile(r"(?<![\d,])(\d+) virgule (\d+)")


def normaliser(s):
    """« 2 virgule 35 » → « 2,35 ». Renvoie (texte, carte) : carte[i] = la place,
    dans le texte normalisé, du caractère i du texte dit (len(s) + 1 entrées)."""
    res, carte, pos = "", [], 0
    for m in _VIRG.finditer(s):
        for k in range(pos, m.start()):
            carte.append(len(res) + k - pos)
        res += s[pos:m.start()]
        a, b = m.group(1), m.group(2)
        base = len(res)
        carte += [base + k for k in range(len(a))]
        carte += [base + len(a)] * len(" virgule ")
        carte += [base + len(a) + 1 + k for k in range(len(b))]
        res += a + "," + b
        pos = m.end()
    for k in range(pos, len(s) + 1):
        carte.append(len(res) + k - pos)
    res += s[pos:]
    return res, carte


class VoixDecimale:
    """À METTRE EN PREMIER : voix et marques normalisées (« 1 virgule 4 » → « 1,4 »)."""

    def _textes(self):
        if not hasattr(self, "_cache_textes_dec"):
            self._cache_textes_dec = {k: normaliser(v)[0] for k, v in super()._textes().items()}
        return self._cache_textes_dec

    def _marques(self):
        if not hasattr(self, "_cache_marques_dec"):
            bruts = super()._textes()
            res = {}
            for cle, L in super()._marques().items():
                _, carte = normaliser(bruts.get(cle, ""))
                res[cle] = [[carte[min(p, len(carte) - 1)], t] for p, t in L]
            self._cache_marques_dec = res
        return self._cache_marques_dec


def hors_audit(m):
    for f in m.get_family():
        f._pas_audit = True
        f.sans_synchro = True
    return m


class TableauNum(VGroup):
    """Le tableau de numération. rangs : les entêtes, de gauche à droite ; la
    virgule est dessinée après le rang `virgule_apres` (0 = après le premier).
    .entetes[i], .cases[i] ; .chiffre(i, v) : le chiffre (non ajouté) dans la case i."""

    def __init__(self, rangs=("Unités", "Dixièmes", "Centièmes"), larg=1.95, h=1.05, fs_ent=26, virgule_apres=0,
                 couleurs=None, **kw):
        super().__init__(**kw)
        couleurs = couleurs or {"Unités": BLEU_D, "Dixièmes": AMBRE_D, "Centièmes": ROSE_D, "Millièmes": VIOLET_D,
                                "Dizaines": "#34d399"}
        self.rangs = list(rangs)
        self.entetes, self.cases = VGroup(), VGroup()
        x = 0.0
        self.xs = []
        # une seule taille pour toutes les entêtes : celle qui fait tenir la plus longue
        k = min([1.0] + [(larg - 0.14) / Text(r, font_size=fs_ent, weight=BOLD).width for r in rangs])
        for i, r in enumerate(rangs):
            c = couleurs.get(r, WHITE)
            case = Rectangle(width=larg, height=h, stroke_color=c, stroke_width=4, fill_color=CASE, fill_opacity=0.55)
            case.move_to(P(x + larg / 2, 0))
            ent = Text(r, font_size=fs_ent * k, color=c, weight=BOLD)
            ent.next_to(case, UP, buff=0.14)
            hors_audit(ent)
            self.entetes.add(ent)
            self.cases.add(case)
            self.xs.append(x + larg / 2)
            x += larg
        self.add(self.cases, self.entetes)
        self.virgule = VGroup()
        if virgule_apres is not None and virgule_apres < len(rangs) - 1:
            bord = self.cases[virgule_apres].get_right()
            v = Dot(bord + DOWN * h * 0.32, radius=0.11, color=ROUGE_ERREUR)
            q = Line(bord + DOWN * h * 0.32, bord + DOWN * h * 0.32 + DOWN * 0.2 + LEFT * 0.08, color=ROUGE_ERREUR,
                     stroke_width=7)
            self.virgule = VGroup(v, q)
            self.add(self.virgule)
        self.h = h
        self.fs = int(64 * h / 1.05)

    def chiffre(self, i, v, couleur=WHITE):
        t = Text(str(v), font_size=self.fs, color=couleur, weight=BOLD).move_to(self.cases[i].get_center())
        return hors_audit(t)

    def colonne(self, i):
        return VGroup(self.cases[i], self.entetes[i])


def barre_unite(n=10, larg=5.4, h=0.75, colories=0, couleur=AMBRE_D, traits=True):
    """Une unité (bande) coupée en n parts égales ; les `colories` premières en couleur.
    .cadre, .parts[i], .traits."""
    g = VGroup()
    cadre = Rectangle(width=larg, height=h, stroke_color=WHITE, stroke_width=5, fill_opacity=0)
    parts = VGroup(*[Rectangle(width=larg / n, height=h, stroke_width=0, fill_color=couleur if i < colories else CASE,
                               fill_opacity=0.95 if i < colories else 0.5).move_to(P(-larg / 2 + larg / n * (i + 0.5), 0))
                     for i in range(n)])
    tr = VGroup(*[Line(P(-larg / 2 + larg / n * i, -h / 2), P(-larg / 2 + larg / n * i, h / 2), color=WHITE,
                       stroke_width=3) for i in range(1, n)])
    if not traits:
        tr.set_opacity(0)
    g.add(parts, tr, cadre)
    g.cadre, g.parts, g.traits = cadre, parts, tr
    return g


def _yeux(c, r, ecart=0.32, hy=0.08):
    return VGroup(*[VGroup(Dot(c + P(x * r, hy * r), radius=0.13 * r, color=WHITE),
                           Dot(c + P(x * r, hy * r), radius=0.07 * r, color="#0f172a")) for x in (-ecart, ecart)])


def chaton(s=1.0, couleur="#fb923c"):
    corps = Ellipse(width=1.3 * s, height=0.8 * s, fill_color=couleur, fill_opacity=1, stroke_width=0)
    tete = Circle(radius=0.36 * s, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(-0.55 * s, 0.42 * s))
    c = tete.get_center()
    oreilles = VGroup(*[Polygon(c + P(dx * s, 0.18 * s), c + P((dx + 0.18 * sg) * s, 0.2 * s), c + P((dx + 0.06 * sg) * s, 0.5 * s),
                                fill_color=couleur, fill_opacity=1, stroke_width=0) for dx, sg in ((-0.32, 1), (0.32, -1))])
    queue = Arc(radius=0.4 * s, start_angle=-0.6, angle=2.0, arc_center=P(0.7 * s, 0.25 * s), color=couleur, stroke_width=12 * s)
    nez = Dot(c + P(0, -0.08 * s), radius=0.05 * s, color=ROSE_D)
    return VGroup(queue, corps, oreilles, tete, _yeux(c, 0.36 * s), nez)


def lapin(s=1.0, couleur="#e5e7eb"):
    corps = Ellipse(width=1.2 * s, height=0.85 * s, fill_color=couleur, fill_opacity=1, stroke_width=0)
    tete = Circle(radius=0.34 * s, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(-0.5 * s, 0.4 * s))
    c = tete.get_center()
    oreilles = VGroup(*[Ellipse(width=0.2 * s, height=0.75 * s, fill_color=couleur, fill_opacity=1, stroke_width=0)
                        .move_to(c + P(dx * s, 0.62 * s)).rotate(-dx * 1.2) for dx in (-0.12, 0.12)])
    interieur = VGroup(*[Ellipse(width=0.09 * s, height=0.5 * s, fill_color=ROSE_D, fill_opacity=1, stroke_width=0)
                         .move_to(o.get_center()).rotate(-dx * 1.2) for o, dx in zip(oreilles, (-0.12, 0.12))])
    queue = Circle(radius=0.16 * s, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(0.6 * s, 0.05 * s))
    return VGroup(queue, corps, oreilles, interieur, tete, _yeux(c, 0.34 * s), Dot(c + P(0, -0.1 * s), radius=0.05 * s, color=ROSE_D))


def chiot(s=1.0, couleur="#a16207"):
    corps = Ellipse(width=1.35 * s, height=0.8 * s, fill_color=couleur, fill_opacity=1, stroke_width=0)
    tete = Circle(radius=0.38 * s, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(-0.55 * s, 0.42 * s))
    c = tete.get_center()
    oreilles = VGroup(*[Ellipse(width=0.24 * s, height=0.5 * s, fill_color="#713f12", fill_opacity=1, stroke_width=0)
                        .move_to(c + P(dx * s, -0.02 * s)) for dx in (-0.38, 0.38)])
    museau = Ellipse(width=0.34 * s, height=0.22 * s, fill_color="#fde68a", fill_opacity=1, stroke_width=0).move_to(c + P(0, -0.16 * s))
    queue = Line(P(0.62 * s, 0.1 * s), P(0.9 * s, 0.45 * s), color=couleur, stroke_width=12 * s)
    return VGroup(queue, corps, tete, oreilles, museau, _yeux(c, 0.38 * s, hy=0.18), Dot(c + P(0, -0.12 * s), radius=0.06 * s, color="#0f172a"))


def balance(s=1.0, ecran="? kg"):
    """La balance de la vétérinaire : socle, plateau et un petit écran."""
    socle = RoundedRectangle(width=2.3 * s, height=0.55 * s, corner_radius=0.1 * s, fill_color="#475569", fill_opacity=1,
                             stroke_width=0)
    plateau = RoundedRectangle(width=2.6 * s, height=0.14 * s, corner_radius=0.05 * s, fill_color="#cbd5e1", fill_opacity=1,
                               stroke_width=0).next_to(socle, UP, buff=0.04)
    aff = RoundedRectangle(width=1.0 * s, height=0.34 * s, corner_radius=0.05 * s, fill_color="#052e16", fill_opacity=1,
                           stroke_color=VERT_OK, stroke_width=2).move_to(socle.get_center())
    txt = hors_audit(Text(ecran, font_size=int(22 * s), color=VERT_OK).move_to(aff))
    g = VGroup(socle, plateau, aff, txt)
    g.plateau, g.ecran = plateau, txt
    return g


def lena(s=1.0):
    """Léna, vétérinaire : sa blouse et son stéthoscope."""
    p = visage(personne(peau="#e0ac69", tenue="#0ea5e9", cheveux="#78350f", longs=True, s=s))
    blouse(p)
    c = p.corps.get_center()
    steth = VGroup(Arc(radius=0.24 * s, start_angle=PI, angle=PI, arc_center=c + P(0, 0.22 * s), color="#1f2937", stroke_width=5),
                   Dot(c + P(0.0, -0.06 * s), radius=0.07 * s, color="#94a3b8"))
    p.add(steth)
    return p


class PaysageDecimal(VoixDecimale, FinTriangles, PaysageProp):
    """La base des paysages de la série : ceinture verte, fin du 05/11."""
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"

    def coche(self, couleur=VERT_OK, taille=0.22):
        """Coche un peu plus petite : posée à 0,33 du bord de la carte, la taille 0,22
        touchait la fin d'un choix long (« … 9 centièmes✓ »)."""
        return super().coche(couleur, taille * 0.75)

    def choix(self, s, fs=30):
        """Un choix long (« 6 unités et 9 dixièmes ») : posé d'un bloc à sa lettre, que la
        voix lit aussitôt. Sans cela, la synchro le découpe en morceaux et la carte
        d'origine revient par-dessus à la réponse."""
        t = Text(s, font_size=fs, color=WHITE)
        t._bloc = True
        return hors_audit(t)

    def garde(self, *a, **k):
        titre, ident, ech = super().garde(*a, **k)
        hors_audit(ident)  # « Maths 6e » : le 6 n'est pas dit
        return titre, ident, ech

    def poser_frac(self, f, mot_num, mot_den, run_time=0.3):
        """Une EcritureFraction en deux temps : le numérateur à son mot, le trait et le
        dénominateur au leur (« 125 sur 100 » : « cent vingt-cinq » dure une seconde)."""
        self.au_mot(mot_num)
        self.play(FadeIn(f.num, scale=1.3), run_time=run_time)
        self.au_mot(mot_den)
        self.play(Create(f.trait), FadeIn(f.den, scale=1.3), run_time=run_time)
        self.add(f)
        return f

    def ligne_au_mot(self, morceaux, mots, y, fs=34, xl=None, buff=0.18):
        """Une ligne de morceaux (texte, couleur), chaque morceau posé à son mot."""
        lg = self.ligne(morceaux, fs, buff=buff)
        self.col(lg, y, xl=xl)
        for m, mot in zip(lg, mots):
            if mot:
                self.au_mot(mot)
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.28)
        return lg

    def gros(self, s, couleur=VERT_OK, fs=72):
        """Le nombre écrit en grand (« 1,4 kg »), encadré."""
        t = Text(s, font_size=fs, color=couleur, weight=BOLD)
        return VGroup(SurroundingRectangle(t, color=couleur, buff=0.2, corner_radius=0.12, stroke_width=5), t)
