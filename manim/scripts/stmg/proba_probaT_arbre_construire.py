# proba_probaT_arbre_construire.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — série « Probabilités
# conditionnelles » : CONSTRUIRE un arbre pondéré à partir d'un énoncé
# (micros : probaT_arbre_construire en STMG, alea_arbre_construire en 1re),
# AVEC VOIX. Paysage 16:9, CEINTURE BLEUE. Short jumeau :
# proba_probaT_arbre_construire_short.py (ceinture jaune, le trail).
#
# ⭐⭐ UNE voix, UN script, DEUX rendus (Frédéric, 18/10 : « pour vendre en
# pack ») : ProbaArbreConstruireBase porte toutes les scènes ; les deux
# sous-classes ne changent que l'identité. La voix ne cite aucune classe.
#
# ⭐ La figure est l'ARBRE PONDÉRÉ du coach (canvasArbre de la banque STMG :
# carte blanche, branches grises, probabilités en bleu sur les branches, nœud
# étiqueté au-dessus, feuille à droite), repris de proba_probaC_interpreter.py.
# À GAUCHE l'énoncé (vitrine de boulangerie, trois phrases ; « le matin » /
# « l'après-midi » surlignés quand la voix s'appuie dessus), À DROITE l'arbre
# qui se construit en 4 ÉTAPES NUMÉROTÉES (bandeau 1 2 3 4 au-dessus).
#
# Écrans : 00 garde · 01 l'énoncé, la boulangerie · 02 étape 1, nommer M et C ·
# 03 étape 2, l'ordre (M d'abord) · 04 étape 3, M 0,7 / M barre 1 − 0,7 = 0,3 ·
# 05 étape 4, 0,4 / 0,6 et 0,15 / 0,85 · 06 le piège : C au premier niveau,
# barré · 07 défi (téléphone récent, musique) · 07b correction (R / R barre,
# puis « musique ») · 08 ce que tu as appris · 09 abonnement.
# ⛔ PAS D'ÉCART : au défi, les branches « sans musique » restent SANS nombre.
#
# Voix : manim/voix/stmg-premiere-proba-arbre-construire.json (débit −7).
# Rendus (media à soi : des rendus parallèles dans le même media → WinError 32) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaT_arbre_construire.py ProbaArbreConstruireSTMG -o eleveai-maths-stmg-proba-arbre-construire --media_dir manim/scripts/stmg/media-probaT_arbre_construire
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaT_arbre_construire.py ProbaArbreConstruirePremiere -o eleveai-maths-premiere-commun-proba-arbre-construire --media_dir manim/scripts/stmg/media-probaT_arbre_construire
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaT_arbre_construire_short.py ShortProbaArbreConstruireSTMG -o eleveai-maths-stmg-proba-arbre-construire-short --media_dir manim/scripts/stmg/media-probaT_arbre_construire
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaT_arbre_construire_short.py ShortProbaArbreConstruirePremiere -o eleveai-maths-premiere-commun-proba-arbre-construire-short --media_dir manim/scripts/stmg/media-probaT_arbre_construire
# Puis copier dans manim/sorties/stmg/maths/probabilites/09-arbre-construire/ et
# manim/sorties/premiere-commun/maths/probabilites/09-arbre-construire/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "premiere"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import (  # noqa: E402
    BORD, BRANCHE, CHEMIN, ENCRE, PROBA, lettre, suite,
)

PATE = "#F59E0B"        # le croissant
CROUTE = "#92400E"
STORE = "#DC2626"       # le store rayé de la vitrine
VITRE = "#BAE6FD"
FOND_CARTE = "#0F172A"
SURLIGNEUR = "#FACC15"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins : croissant, vitrine, téléphone ─────────────────────────────

def croissant(s=1.0):
    """Cinq ovales dorés posés en arc : un croissant."""
    morceaux = VGroup()
    for k, a in enumerate(np.linspace(-1.0, 1.0, 5)):
        taille = 1.0 - 0.28 * abs(a)
        e = Ellipse(width=0.34 * taille, height=0.5 * taille, fill_color=PATE, fill_opacity=1,
                    stroke_color=CROUTE, stroke_width=2)
        e.rotate(-a * 0.9).move_to(P(a * 0.42, -0.18 * a * a))
        morceaux.add(e)
    # le centre devant
    ordre = [0, 4, 1, 3, 2]
    return VGroup(*[morceaux[i] for i in ordre]).scale(s)


def vitrine(s=1.0):
    """La vitrine de la boulangerie : store rayé, vitre, étagère de croissants."""
    larg, haut = 3.2, 1.7
    vitre = Rectangle(width=larg, height=haut, fill_color=VITRE, fill_opacity=0.35, stroke_color=WHITE,
                      stroke_width=3)
    n = 8
    bandes = VGroup(*[Rectangle(width=larg / n, height=0.38, fill_color=STORE if k % 2 == 0 else WHITE,
                                fill_opacity=1, stroke_width=0) for k in range(n)]).arrange(RIGHT, buff=0)
    bandes.next_to(vitre, UP, buff=0)
    festons = VGroup(*[Arc(radius=larg / n / 2, start_angle=PI, angle=PI, color=STORE if k % 2 == 0 else WHITE,
                           stroke_width=0, fill_opacity=1).set_fill(STORE if k % 2 == 0 else WHITE, 1)
                       for k in range(n)])
    for k, f in enumerate(festons):
        f.move_to(bandes[k].get_bottom() + DOWN * larg / n / 4)
    etagere = Line(P(-larg / 2 + 0.15, 0), P(larg / 2 - 0.15, 0), color="#78350F", stroke_width=6)
    etagere.move_to(vitre).shift(DOWN * 0.45)
    croissants = VGroup(*[croissant(0.55) for _ in range(4)]).arrange(RIGHT, buff=0.18)
    croissants.next_to(etagere, UP, buff=0.04)
    enseigne = Text("BOULANGERIE", font_size=20, color=WHITE, weight=BOLD)
    enseigne.next_to(bandes, UP, buff=0.08)
    g = VGroup(vitre, etagere, croissants, bandes, festons, enseigne)
    g.croissants = croissants
    return g.scale(s)


def telephone(s=1.0):
    """Un téléphone et deux notes de musique."""
    corps = RoundedRectangle(width=0.62, height=1.1, corner_radius=0.1, fill_color="#1F2937", fill_opacity=1,
                             stroke_color=WHITE, stroke_width=2)
    ecran = RoundedRectangle(width=0.5, height=0.85, corner_radius=0.05, fill_color=BLEU_CALCUL, fill_opacity=1,
                             stroke_width=0).move_to(corps).shift(UP * 0.04)
    notes = VGroup()
    for dx, dy in ((0.62, 0.35), (0.92, 0.05)):
        tete = Ellipse(width=0.18, height=0.13, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0)
        tige = Line(P(0.08, 0), P(0.08, 0.36), color=JAUNE_TITRE, stroke_width=3)
        fanion = Line(P(0.08, 0.36), P(0.2, 0.26), color=JAUNE_TITRE, stroke_width=3)
        notes.add(VGroup(tete, tige, fanion).move_to(corps.get_center() + P(dx, dy)))
    return VGroup(corps, ecran, notes).scale(s)


# ── l'énoncé : une carte, des morceaux de phrase qu'on peut surligner ───────

class Enonce(VGroup):
    """Carte sombre ; phrases = liste de phrases, chaque phrase une liste de
    lignes, chaque ligne une liste de (texte, clé ou None, couleur ou None).
    `self.morceau[clé]` donne le Text à surligner ; `self.phrases[i]` la phrase."""

    def __init__(self, phrases, fs=28, largeur=6.0, image=None, buff_ph=0.32, **kw):
        super().__init__(**kw)
        self.morceau = {}
        self.phrases = VGroup()
        for ph in phrases:
            lignes = VGroup()
            for ligne in ph:
                bouts = []
                for tx, cle, coul in ligne:
                    t = Text(tx, font_size=fs, color=coul or WHITE)
                    if cle:
                        self.morceau[cle] = t
                    bouts.append(t)
                lignes.add(suite(*bouts, buff=0.13))
            lignes.arrange(DOWN, buff=0.14, aligned_edge=LEFT)
            self.phrases.add(lignes)
        self.phrases.arrange(DOWN, buff=buff_ph, aligned_edge=LEFT)
        if self.phrases.width > largeur - 0.5:
            self.phrases.scale_to_fit_width(largeur - 0.5)
        contenu = VGroup(image, self.phrases).arrange(DOWN, buff=0.35) if image is not None else self.phrases
        self.carte = RoundedRectangle(width=largeur, height=contenu.height + 0.6, corner_radius=0.2,
                                      fill_color=FOND_CARTE, fill_opacity=0.92, stroke_color=BLEU_CALCUL,
                                      stroke_width=3)
        self.carte.move_to(contenu)
        self.phrases.align_to(self.carte, LEFT).shift(RIGHT * 0.3)
        self.image = image
        self.phrases.set_z_index(2)
        self.add(self.carte, *([image] if image is not None else []), self.phrases)

    def surligne(self, cle, couleur=SURLIGNEUR):
        """Le trait de surligneur derrière le morceau (à animer en GrowFromEdge)."""
        t = self.morceau[cle]
        r = Rectangle(width=t.width + 0.12, height=t.height + 0.14, fill_color=couleur, fill_opacity=0.4,
                      stroke_width=0).move_to(t)
        r.set_z_index(1)
        return r


# ── l'ARBRE PONDÉRÉ du coach, généralisé (lettres ou mots aux nœuds) ────────

def etiquette(e, fs):
    """e = (texte, barre) ; une lettre (barre possible) ou un mot."""
    texte, barre = e
    if len(texte) <= 2:
        return lettre(texte, fs, ENCRE, barre)
    return VGroup(Text(texte, font_size=int(fs * 0.62), color=ENCRE))


class Arbre(VGroup):
    """Carte blanche du coach : départ, deux nœuds, quatre feuilles.
    Branches : 0 → n0, 1 → n1, 2 n0 → f0, 3 n0 → f1, 4 n1 → f2, 5 n1 → f3.
    noeuds = [(texte, barre)] × 2 ; feuilles = [(texte, barre)] × 4."""

    def __init__(self, noeuds, feuilles, dx=2.2, dy1=1.2, dy2=0.7, fs=36, titre="Arbre pondéré", pad_x=1.3,
                 pad_y=1.15, **kw):
        super().__init__(**kw)
        racine = P(0, 0)
        self.pn = [P(dx, dy1), P(dx, -dy1)]
        pf = [P(2 * dx, dy1 + dy2), P(2 * dx, dy1 - dy2), P(2 * dx, -dy1 + dy2), P(2 * dx, -dy1 - dy2)]
        bouts = [(racine, self.pn[0]), (racine, self.pn[1]), (self.pn[0], pf[0]), (self.pn[0], pf[1]),
                 (self.pn[1], pf[2]), (self.pn[1], pf[3])]
        self.branches = [Line(a, b, color=BRANCHE, stroke_width=4) for a, b in bouts]
        self.depart = Dot(racine, radius=0.07, color=ENCRE)
        self.lab = []
        for k, e in enumerate(noeuds):
            m = etiquette(e, fs).next_to(self.pn[k], UP, buff=0.08)
            fond = BackgroundRectangle(m, color=WHITE, fill_opacity=1, buff=0.04)
            self.lab.append(VGroup(fond, m))
        for k, e in enumerate(feuilles):
            self.lab.append(etiquette(e, fs).next_to(pf[k], RIGHT, buff=0.12))
        tout = VGroup(self.depart, *self.branches, *self.lab)
        self.carte = RoundedRectangle(width=tout.width + pad_x, height=tout.height + pad_y, corner_radius=0.2,
                                      fill_color=WHITE, fill_opacity=1, stroke_color=BORD, stroke_width=2)
        self.carte.move_to(tout).shift(UP * (pad_y / 2 - 0.275) + RIGHT * 0.05)
        if titre:
            self.titre = Text(titre, font_size=22, color=ENCRE, weight=BOLD)
            self.titre.next_to(self.carte.get_top(), DOWN, buff=0.14)
        else:
            self.titre = VGroup()
        self.nombres = {}
        self.add(self.carte, self.titre, *self.branches, self.depart, *self.lab)

    def socle(self):
        return VGroup(self.carte, self.titre, self.depart)

    def pn_x(self, niveau):
        """L'abscisse des étiquettes du niveau 1 (nœuds) ou 2 (feuilles)."""
        br = self.branches[0 if niveau == 0 else 2]
        return (br.get_start()[0] + br.get_end()[0]) / 2

    def construire(self, k, run_time=0.6):
        """La branche k se trace, puis son étiquette apparaît au bout."""
        return Succession(Create(self.branches[k], run_time=run_time * 0.6),
                          FadeIn(self.lab[k], scale=1.4, run_time=run_time * 0.4))

    def nombre(self, k, texte, fs=28, buff=0.08, color=PROBA):
        """Le nombre de la branche k, en bleu, au-dessus du trait (pas encore affiché)."""
        t = Text(texte, font_size=fs, color=color, weight=BOLD)
        a, b = self.branches[k].get_start(), self.branches[k].get_end()
        d = b - a
        n = np.array([-d[1], d[0], 0.0])
        n = n / np.linalg.norm(n)
        if n[1] < 0:
            n = -n
        if k in (3, 5):  # la branche du bas d'une paire : le nombre SOUS le trait
            n = -n
        demi = abs(n[0]) * t.width / 2 + abs(n[1]) * t.height / 2
        t.move_to((a + b) / 2 + n * (demi + buff))
        self.nombres[k] = t
        return t

    def complet(self):
        """Tout l'arbre visible d'un coup (nombres compris), pour un écran qui le reprend."""
        return VGroup(self, *self.nombres.values())

    def allume(self, ks, op=0.2):
        """Allume les branches ks (orange épais), estompe les autres."""
        anims = []
        for k, br in enumerate(self.branches):
            if k in ks:
                anims.append(br.animate.set_stroke(CHEMIN, 9, opacity=1))
            else:
                anims.append(br.animate.set_stroke(BRANCHE, 4, opacity=op))
        return anims

    def eteint(self):
        return [br.animate.set_stroke(BRANCHE, 4, opacity=1) for br in self.branches]


def bandeau_etapes(centre, largeur=7.7):
    """Les quatre étapes numérotées ; chaque case : pastille + mot."""
    mots = ["Nommer", "L'ordre", "1er niveau", "2e niveau"]
    w = (largeur - 0.3) / 4
    cases = VGroup()
    for k, m in enumerate(mots):
        fond = RoundedRectangle(width=w, height=0.52, corner_radius=0.12, fill_color=FOND_CARTE, fill_opacity=1,
                                stroke_color=GREY_B, stroke_width=2)
        rond = Circle(radius=0.15, fill_color=GREY_B, fill_opacity=1, stroke_width=0)
        num = Text(str(k + 1), font_size=18, color=FOND_CARTE, weight=BOLD).move_to(rond)
        mot = Text(m, font_size=18, color=GREY_B)
        contenu = suite(VGroup(rond, num), mot, buff=0.1)
        if contenu.width > w - 0.16:
            contenu.scale_to_fit_width(w - 0.16)
        contenu.move_to(fond)
        cases.add(VGroup(fond, VGroup(rond, num), mot))
    cases.arrange(RIGHT, buff=0.1).move_to(centre)
    return cases


def etape_active(cases, k):
    """Anims : la case k s'allume en jaune ; les précédentes passent en vert."""
    anims = []
    for i, c in enumerate(cases):
        fond, (rond, num), mot = c
        if i == k:
            anims += [fond.animate.set_stroke(JAUNE_TITRE, 4), rond.animate.set_fill(JAUNE_TITRE),
                      mot.animate.set_color(JAUNE_TITRE)]
        elif i < k:
            anims += [fond.animate.set_stroke(VERT_OK, 2), rond.animate.set_fill(VERT_OK),
                      mot.animate.set_color(VERT_OK)]
    return anims


def carte_lettre(lt, phrase, fs=26, barre=False):
    g = suite(lettre(lt, fs + 6, BLEU_CALCUL, barre), Text(":", font_size=fs), Text(phrase, font_size=fs), buff=0.14)
    fond = RoundedRectangle(width=g.width + 0.45, height=g.height + 0.35, corner_radius=0.15, fill_color=FOND_CARTE,
                            fill_opacity=0.9, stroke_color=BLEU_CALCUL, stroke_width=3)
    return VGroup(fond, g.move_to(fond))


# ── les deux énoncés ────────────────────────────────────────────────────────

J = JAUNE_TITRE
BOULANGERIE = [
    [[("Dans une boulangerie,", None, None), ("70 %", "p70", J)],
     [("des clients viennent", None, None), ("le matin.", "matin1", None)]],
    [[("Le matin,", "matin2", None), ("40 %", "p40", J), ("des clients", None, None)],
     [("achètent un", None, None), ("croissant.", "croissant", None)]],
    [[("L'après-midi,", "aprem", None), ("seulement", None, None), ("15 %.", "p15", J)]],
]
MUSIQUE = [
    [[("«", None, None), ("60 %", "p60", J), ("des élèves ont", None, None)],
     [("un", None, None), ("téléphone récent.", "recent", None)]],
    [[("Parmi eux,", "parmi", None), ("90 %", "p90", J), ("écoutent de", None, None)],
     [("la", None, None), ("musique", "musique", None), ("en ligne.", None, None)]],
    [[("Parmi les autres,", "autres", None), ("50 %.", "p50", J), ("»", None, None)]],
]


class ProbaArbreConstruireBase(Notion6e):
    """Toutes les scènes ; les sous-classes ne changent que l'identité."""

    nom_voix = "stmg-premiere-proba-arbre-construire"
    identite = "Maths — EleveAI"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    # ── les objets repris d'écran en écran ──────────────────────────────────

    def enonce(self, phrases=BOULANGERIE, image="vitrine", haut=2.85, x=-4.0):
        img = vitrine(0.5) if image == "vitrine" else (telephone(0.7) if image == "telephone" else None)
        e = Enonce(phrases, fs=30, largeur=5.7, image=img)
        e.move_to(P(x, 0))
        e.shift(UP * (haut - e.carte.get_top()[1]))
        return e

    def surligner(self, e, *cles, run_time=0.5):
        """Le surligneur passe sous chaque morceau, de gauche à droite."""
        rs = [e.surligne(c) for c in cles]
        self.play(*[GrowFromEdge(r, LEFT) for r in rs], run_time=run_time)
        return rs

    def etapes(self, k=None, anime=True):
        b = bandeau_etapes(P(2.9, 2.6))
        if k is None:
            return b
        if anime:
            self.add(b)
            self.play(*etape_active(b, k), run_time=0.5)
        else:
            self._etat_etapes(b, k)
            self.add(b)
        return b

    def _etat_etapes(self, b, k):
        for i, c in enumerate(b):
            fond, (rond, num), mot = c
            if i == k:
                fond.set_stroke(JAUNE_TITRE, 4), rond.set_fill(JAUNE_TITRE), mot.set_color(JAUNE_TITRE)
            elif i < k:
                fond.set_stroke(VERT_OK, 2), rond.set_fill(VERT_OK), mot.set_color(VERT_OK)

    def arbre_mc(self, nombres=(), centre=P(3.1, -0.15), echelle=0.85):
        """L'arbre de la boulangerie : M / M barre, puis C / C barre ; les
        nombres listés (indices de branche) sont créés, pas encore affichés."""
        a = Arbre([("M", False), ("M", True)], [("C", False), ("C", True)] * 2).scale(echelle).move_to(centre)
        vals = {0: "0,7", 1: "0,3", 2: "0,4", 3: "0,6", 4: "0,15", 5: "0,85"}
        for k in nombres:
            a.nombre(k, vals[k])
        return a

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Construire un arbre pondéré", 50, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.6))
        feuille = Rectangle(width=2.0, height=2.5, fill_color=WHITE, fill_opacity=1, stroke_color=BORD,
                            stroke_width=2).move_to(P(-4.3, 0.15))
        lignes = VGroup(*[Line(P(-0.7, 0), P(0.7 - 0.35 * (k % 2), 0), color="#94A3B8", stroke_width=4)
                          for k in range(6)]).arrange(DOWN, buff=0.22, aligned_edge=LEFT)
        lignes.move_to(feuille).shift(DOWN * 0.25)
        cr = croissant(0.7).move_to(feuille.get_top() + DOWN * 0.42)
        doc = VGroup(feuille, lignes, cr)
        a = Arbre([("M", False), ("M", True)], [("C", False), ("C", True)] * 2).scale(0.62).move_to(P(2.6, 0.15))
        fl = Arrow(feuille.get_right() + RIGHT * 0.15, a.carte.get_left() + LEFT * 0.15, buff=0, color=JAUNE_TITRE,
                   stroke_width=7)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        self.au_mot("arbre pondéré")
        self.play(FadeIn(a.socle()), run_time=0.4)
        self.play(LaggedStart(*[a.construire(k, 0.5) for k in range(6)], lag_ratio=0.25))
        self.au_mot("énoncé")
        self.play(FadeIn(doc, shift=RIGHT * 0.3), run_time=0.5)
        self.play(GrowArrow(fl), run_time=0.5)
        self.attendre_voix(marge=1.0)

    # ── 01 : l'énoncé, la boulangerie ───────────────────────────────────────

    def ecran_enonce(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-enonce")
        self.titre_ecran("L'énoncé")
        e = self.enonce()
        grande = vitrine(1.25).move_to(P(3.3, -0.2))
        sol = Line(P(0.4, -1.55), P(6.3, -1.55), color=GREY_B, stroke_width=3)
        soleil = VGroup(Circle(radius=0.32, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0),
                        *[Line(P(0, 0.42), P(0, 0.6), color=JAUNE_TITRE, stroke_width=4).rotate(a, about_point=ORIGIN)
                          for a in np.arange(0, TAU, TAU / 10)])
        soleil.move_to(P(0.9, 1.5))
        self.au_mot("Lis l'énoncé")
        self.play(FadeIn(e.carte), FadeIn(e.image, shift=UP * 0.2), FadeIn(grande, shift=UP * 0.2), Create(sol),
                  run_time=0.8)
        self.au_mot("Dans une boulangerie")
        self.play(FadeIn(e.phrases[0][0][0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("70 %")
        self.play(FadeIn(e.phrases[0][0][1:], shift=UP * 0.1), run_time=0.4)
        self.au_mot("viennent le matin")
        self.play(FadeIn(e.phrases[0][1], shift=UP * 0.1), FadeIn(soleil, shift=UP * 0.6), run_time=0.6)
        self.au_mot("Le matin, 40 %")
        self.play(FadeIn(e.phrases[1][0], shift=UP * 0.1), run_time=0.5)
        self.au_mot("achètent un croissant")
        self.play(FadeIn(e.phrases[1][1], shift=UP * 0.1), run_time=0.4)
        self.play(*[Indicate(c, color=JAUNE_TITRE, scale_factor=1.3) for c in grande.croissants], run_time=0.7)
        self.au_mot("L'après-midi")
        self.play(FadeIn(e.phrases[2], shift=UP * 0.1),
                  soleil.animate.move_to(P(6.2, 0.1)).set_color(ORANGE_RETENUE), run_time=0.9)
        self.attendre_voix()

    # ── 02 : étape 1, nommer les événements ─────────────────────────────────

    def ecran_lettres(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-lettres")
        self.titre_ecran("Étape 1 : nommer")
        e = self.enonce()
        self.add(e)
        self.au_mot("Étape 1")
        self.etapes(0)
        cM = carte_lettre("M", "« le client vient le matin »", 28)
        cC = carte_lettre("C", "« il achète un croissant »", 28)
        cM.move_to(P(3.3, 1.0))
        cC.move_to(P(3.3, -0.6))
        cC.align_to(cM, LEFT)
        self.au_mot("M :")
        self.play(FadeIn(cM, shift=LEFT * 0.2), run_time=0.5)
        self.surligner(e, "matin1")
        self.insister(cM[1][0], 0.3)
        self.au_mot("C :")
        self.play(FadeIn(cC, shift=LEFT * 0.2), run_time=0.5)
        self.surligner(e, "croissant")
        self.insister(cC[1][0], 0.3)
        self.attendre_voix()

    # ── 03 : étape 2, choisir l'ordre ───────────────────────────────────────

    def ecran_ordre(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-ordre")
        self.titre_ecran("Étape 2 : l'ordre")
        e = self.enonce()
        self.add(e)
        self.au_mot("Étape 2")
        self.etapes(1)
        self.au_mot("« Le matin, 40 %")
        self.surligner(e, "matin2", "p40")
        self.play(Indicate(e.phrases[1], color=JAUNE_TITRE, scale_factor=1.06), run_time=0.7)
        self.au_mot("on se place d'abord")
        dab = VGroup(self.t("D'abord :", 32, JAUNE_TITRE), self.t("parmi les clients du matin", 32))
        dab.arrange(DOWN, buff=0.2).move_to(P(3.3, 0.6))
        cad = SurroundingRectangle(dab, color=JAUNE_TITRE, buff=0.25, corner_radius=0.15)
        self.play(FadeIn(dab, shift=UP * 0.15), Create(cad), run_time=0.7)
        self.au_mot("Donc M au premier")
        a = self.arbre_mc(centre=P(3.1, 0.0), echelle=0.78)
        niv1 = self.t("1er niveau", 19, JAUNE_TITRE)
        niv2 = self.t("2e niveau", 19, JAUNE_TITRE)
        niv1 = VGroup(SurroundingRectangle(niv1, color=JAUNE_TITRE, buff=0.1, corner_radius=0.08), niv1)
        niv2 = VGroup(SurroundingRectangle(niv2, color=JAUNE_TITRE, buff=0.1, corner_radius=0.08), niv2)
        niv1.move_to(P(a.pn_x(0), -2.6))
        niv2.move_to(P(a.lab[2].get_center()[0], -2.6))
        self.play(FadeOut(VGroup(dab, cad)), FadeIn(a.socle()), run_time=0.5)
        self.play(a.construire(0), a.construire(1), FadeIn(niv1, shift=UP * 0.1))
        self.play(*[Indicate(a.lab[i][1], color=CHEMIN, scale_factor=1.5) for i in (0, 1)], run_time=0.6)
        self.au_mot("C au deuxième")
        self.play(*[a.construire(k) for k in (2, 3, 4, 5)], FadeIn(niv2, shift=UP * 0.1))
        self.play(*[Indicate(a.lab[i], color=CHEMIN, scale_factor=1.5) for i in (2, 3, 4, 5)], run_time=0.6)
        self.attendre_voix()

    # ── 04 : étape 3, le premier niveau ─────────────────────────────────────

    def ecran_premier(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-premier")
        self.titre_ecran("Étape 3 : le premier niveau")
        e = self.enonce()
        a = self.arbre_mc((0, 1))
        self.add(e, a)
        self.au_mot("Étape 3")
        self.etapes(2)
        self.au_mot("le premier niveau")
        self.play(*a.allume([0, 1]), run_time=0.6)
        self.au_mot("M : 0,7")
        self.surligner(e, "p70")
        self.play(TransformFromCopy(e.morceau["p70"], a.nombres[0]), run_time=0.7)
        self.insister(a.nombres[0], 0.3)
        self.au_mot("M barre, l'après-midi")
        self.play(Indicate(a.lab[1][1], color=CHEMIN, scale_factor=1.5), run_time=0.5)
        self.surligner(e, "aprem")
        fs = 40
        k = [self.t(x, fs, c) for x, c in (("1", WHITE), ("−", WHITE), ("0,7", BLEU_CALCUL), ("=", WHITE),
                                            ("0,3", JAUNE_TITRE))]
        calc = suite(*k, buff=0.2).move_to(P(2.6, -2.72))
        self.au_mot("1 moins 0,7")
        self.play(FadeIn(k[0]), FadeIn(k[1]), TransformFromCopy(a.nombres[0], k[2]), run_time=0.7)
        self.au_mot("égale 0,3")
        self.play(FadeIn(k[3]), FadeIn(k[4], scale=1.6), run_time=0.5)
        self.play(TransformFromCopy(k[4], a.nombres[1]), run_time=0.7)
        self.insister(a.nombres[1], 0.3)
        self.attendre_voix()

    # ── 05 : étape 4, le deuxième niveau ────────────────────────────────────

    def ecran_deuxieme(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-deuxieme")
        self.titre_ecran("Étape 4 : le deuxième niveau")
        e = self.enonce()
        a = self.arbre_mc((0, 1, 2, 3, 4, 5))
        self.add(e, a, a.nombres[0], a.nombres[1])
        self.au_mot("Étape 4")
        self.etapes(3)
        self.au_mot("Après M :")
        self.play(*a.allume([2, 3]), Indicate(a.lab[0][1], color=CHEMIN, scale_factor=1.5), run_time=0.6)
        self.surligner(e, "matin2", "p40")
        self.au_mot("C, 0,4")
        self.play(TransformFromCopy(e.morceau["p40"], a.nombres[2]), run_time=0.6)
        self.au_mot("C barre, 0,6")
        self.play(FadeIn(a.nombres[3], scale=1.6), run_time=0.4)
        self.au_mot("Après M barre")
        self.play(*a.allume([4, 5]), Indicate(a.lab[1][1], color=CHEMIN, scale_factor=1.5), run_time=0.6)
        self.surligner(e, "aprem", "p15")
        self.au_mot("C, 0,15")
        self.play(TransformFromCopy(e.morceau["p15"], a.nombres[4]), run_time=0.6)
        self.au_mot("C barre, 0,85")
        self.play(FadeIn(a.nombres[5], scale=1.6), run_time=0.4)
        self.play(*a.eteint(), run_time=0.5)
        ok = self.coche(taille=0.3).move_to(P(0.6, -2.7))
        fini = self.t("L'arbre est construit", 30, VERT_OK).next_to(ok, RIGHT, buff=0.25)
        self.play(Create(ok), FadeIn(fini, shift=LEFT * 0.15), run_time=0.6)
        self.attendre_voix()

    # ── 06 : le piège : C au premier niveau ─────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège : C au premier niveau")
        e = self.enonce()
        self.add(e)
        a = Arbre([("C", False), ("C", True)], [("M", False), ("M", True)] * 2).scale(0.8).move_to(P(3.3, 0.35))
        self.au_mot("mettre C au premier")
        self.play(FadeIn(a.socle()), run_time=0.4)
        self.play(a.construire(0), a.construire(1))
        self.play(*[a.construire(k, 0.5) for k in (2, 3, 4, 5)])
        self.au_mot("ne dit pas combien")
        qs = [a.nombre(k, "?", 34, color=ROUGE_ERREUR) for k in (0, 1)]
        self.play(*[FadeIn(q, scale=1.8) for q in qs], *a.allume([0, 1]), run_time=0.6)
        self.au_mot("en tout")
        self.play(*[Indicate(q, color=ROUGE_ERREUR, scale_factor=1.6) for q in qs], run_time=0.6)
        croix = VGroup(Line(a.carte.get_corner(UL), a.carte.get_corner(DR)),
                       Line(a.carte.get_corner(DL), a.carte.get_corner(UR))).set_stroke(ROUGE_ERREUR, 9)
        self.play(Create(croix), run_time=0.6)
        self.au_mot("Il le dit pour le matin")
        self.surligner(e, "matin2")
        self.au_mot("puis pour l'après-midi")
        self.surligner(e, "aprem")
        self.au_mot("c'est le moment")
        dab = self.t("D'abord : le moment de la journée", 26, VERT_OK).move_to(P(1.9, -2.55))
        self.play(FadeIn(dab, shift=UP * 0.15), run_time=0.6)
        self.insister(dab, 0.3)
        self.attendre_voix()

    # ── 07 : défi : le téléphone et la musique ──────────────────────────────

    def arbre_rm(self, centre=P(2.85, -0.15), echelle=0.76):
        a = Arbre([("R", False), ("R", True)], [("musique", False), ("sans musique", False)] * 2)
        a.scale(echelle).move_to(centre)
        for k, v in ((0, "0,6"), (1, "0,4"), (2, "0,9"), (4, "0,5")):
            a.nombre(k, v)
        return a

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        e = self.enonce(MUSIQUE, image="telephone", haut=2.75)
        self.play(FadeIn(e.carte), FadeIn(e.image, shift=UP * 0.2), run_time=0.5)
        self.au_mot("« 60 %")
        self.play(FadeIn(e.phrases[0], shift=UP * 0.1), run_time=0.6)
        self.au_mot("Parmi eux")
        self.play(FadeIn(e.phrases[1], shift=UP * 0.1), run_time=0.6)
        self.au_mot("Parmi les autres")
        self.play(FadeIn(e.phrases[2], shift=UP * 0.1), run_time=0.6)
        self.au_mot("Quel événement")
        q = VGroup(self.t("Quel événement", 36, BLEU_CALCUL), self.t("au premier niveau ?", 36, BLEU_CALCUL))
        q.arrange(DOWN, buff=0.2).move_to(P(3.3, 1.7))
        sq = Arbre([("?", False), ("?", False)], [("x", False)] * 4).scale(0.62).move_to(P(3.3, -0.65))
        self.play(FadeIn(q, shift=UP * 0.15), FadeIn(sq.socle()), run_time=0.6)
        self.play(*[sq.construire(k, 0.5) for k in (0, 1)])
        self.play(*[Indicate(sq.lab[i][1], color=ORANGE_RETENUE, scale_factor=1.6) for i in (0, 1)], run_time=0.6)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        e = self.enonce(MUSIQUE, image="telephone")
        self.add(e)
        a = self.arbre_rm()
        cR = carte_lettre("R", "« téléphone récent »", 24).move_to(P(3.3, 2.55))
        self.au_mot("On se place d'abord")
        self.surligner(e, "parmi")
        self.play(Indicate(e.morceau["parmi"], color=JAUNE_TITRE, scale_factor=1.2), run_time=0.5)
        self.au_mot("ont un téléphone récent")
        self.surligner(e, "recent")
        self.play(FadeIn(cR, shift=DOWN * 0.15), FadeIn(a.socle()), run_time=0.5)
        self.au_mot("R, 0,6")
        self.play(a.construire(0))
        self.play(TransformFromCopy(e.morceau["p60"], a.nombres[0]), run_time=0.6)
        self.au_mot("R barre, 0,4")
        self.play(a.construire(1))
        self.play(FadeIn(a.nombres[1], scale=1.6), run_time=0.4)
        self.au_mot("Après R :")
        self.play(a.construire(2), a.construire(3))
        self.au_mot("musique, 0,9")
        self.play(TransformFromCopy(e.morceau["p90"], a.nombres[2]), run_time=0.6)
        self.au_mot("Après R barre")
        self.play(a.construire(4), a.construire(5))
        self.au_mot("musique, 0,5")
        self.play(TransformFromCopy(e.morceau["p50"], a.nombres[4]), run_time=0.6)
        ok = self.coche(taille=0.3).move_to(P(3.3, -2.6))
        self.play(Create(ok), run_time=0.4)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 34
        l1 = self.t("Nommer les événements", fs)
        l2 = self.t("Choisir l'ordre grâce à « parmi » ou « sachant »", fs)
        l3 = self.t("Remplir le premier niveau, puis le deuxième", fs)
        l4 = self.t("À chaque point, les branches font 1", fs)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3, l4)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        if lignes.width > 11.6:
            lignes.scale_to_fit_width(11.6)
        lignes.move_to(P(-0.6, 0.55))
        for mot, l in zip(["Nommer les événements", "Choisir l'ordre", "Remplir le premier", "À chaque point"],
                          lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("Prochaine vidéo")
        self.play(Write(self.chute("Prochaine vidéo : la probabilité d'un chemin", color=VERT_OK, font_size=32)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_enonce()
        self.ecran_lettres()
        self.ecran_ordre()
        self.ecran_premier()
        self.ecran_deuxieme()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class ProbaArbreConstruireSTMG(ProbaArbreConstruireBase):
    identite = "Maths STMG — EleveAI"


class ProbaArbreConstruirePremiere(ProbaArbreConstruireBase):
    identite = "Maths 1re — EleveAI"
