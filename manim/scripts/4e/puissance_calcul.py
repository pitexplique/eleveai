# puissance_calcul.py
# EleveAI — Maths 4e ET 3e (épisode COMMUN) — série « Puissances », épisode 07 :
# CALCULER AVEC DES PUISSANCES DE 10. Paysage 16:9, AVEC VOIX.
# ⭐ Une voix, un script, DEUX rendus (seule l'identité change) :
#   PuissanceCalcul4e « Maths 4e — EleveAI » ceinture VERTE
#   PuissanceCalcul3e « Maths 3e — EleveAI » ceinture VERTE
# Micros couvertes : 4e `puissance_calcul`, 3e `entier_puissance_calcul`
# (02 le produit 10² × 10⁴ ; 03 le quotient 10⁹ ÷ 10⁶ ; 04 les nombres devant
# 3 × 10² × 2 × 10⁴ ; 05 l'exposant négatif 10⁵ × 10⁻²).
# Code couleur constant : BLEU = la base 10 (et, en 04, les nombres devant
# rangés ensemble), ORANGE = l'exposant (« 2 + 4 = 6 », « 9 − 6 »), VERT =
# résultat juste, ROUGE = le piège (10¹⁵ : 3 × 5 au lieu de 3 + 5).
#
# Décor et métiers : un APICULTEUR (100 ruches de 10 000 abeilles), un
# PHOTOGRAPHE (sa carte mémoire), une ASTROPHYSICIENNE (la lumière).
# Centres : animaux, art-design, espace.
#
# Écrans : garde (00) ; l'apiculteur (01) ; le produit qui se déplie (02) ;
# QUESTION 1 10³ × 10⁵ (02q) ; le quotient, facteurs barrés (03) ; les
# nombres devant (04) ; QUESTION 2 4 × 10³ × 2 × 10⁵ (04q) ; exposant négatif
# (05) ; défi lumière (06) et correction (06b) ; ce que tu as appris (07) ;
# fin (08).
#
# Voix : manim/voix/4e-puissance-calcul.json (validée, débit −6), WAV dans
# public/sons/4e-puissance-calcul/ ; marques : puissance_calcul_marques.json
# (marques_dump.ps1, puis une COPIE CORRIGÉE de cues2marques.py : les cues
# « 10 fois », « 10 puissance » répétées gardent CHACUNE leur instant).
# Outils : manim/scripts/6e/prop_commun.py (non modifié). `au()` avance un
# CURSEUR dans la voix (repris de l'épisode 05) : chaque extrait est cherché
# après le précédent.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/puissance_calcul.py PuissanceCalcul4e
# python -m manim render -qh --disable_caching manim/scripts/4e/puissance_calcul.py PuissanceCalcul4e -o eleveai-maths-4e-puissance-calcul --media_dir manim/scripts/4e/media-puiss-07-4e
# python -m manim render -qh --disable_caching manim/scripts/4e/puissance_calcul.py PuissanceCalcul3e -o eleveai-maths-3e-puissance-calcul --media_dir manim/scripts/4e/media-puiss-07-3e
# Sorties : manim/sorties/{4e,3e}/maths/puissances/07-calcul/eleveai-maths-{4e,3e}-puissance-calcul.mp4

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))  # le dossier du script EN TÊTE

from prop_commun import *  # noqa: E402,F403

BASE_C = BLEU_CALCUL       # la base 10, les nombres devant
EXPO_C = ORANGE_RETENUE    # l'exposant
PIEGE = ROUGE_ERREUR
CIEL = "#93c5fd"
MIEL = "#f59e0b"
SOLEIL = "#fde047"


def T(s, fs=40, c=WHITE, audit=True):
    """Un texte posé AU MOT par le script ; audit=False : une donnée de figure
    (compteurs) ou un rappel déjà dit."""
    t = Text(s, font_size=fs, color=c)
    t.sans_synchro = True
    if re.search(r"\d \d", s):  # « 10 000 » : dit au mot ; l'audit ne lit pas l'espace
        audit = False
    if not audit:
        t._pas_audit = True
    return t


def sans_audit(m):
    for f in m.get_family():
        f._pas_audit = True
    return m


SURS = set("abcdefhiklmnorstuvwxzABCDEFGHIJKLMNOPRSTUVWXYZ0123456789éèêëàâîïôûùç:!?.")


def pied(t):
    """Ordonnée de la ligne de base d'un Text (épisode 05)."""
    if not isinstance(t, Text):
        t = getattr(t, "base", getattr(t, "m", None))
        if not isinstance(t, Text):
            return None
    cs = [c for c in t.text if not c.isspace()]
    if len(cs) == len(t.submobjects):
        for c, g in zip(cs, t.submobjects):
            if c in SURS:
                return g.get_bottom()[1]
    return None


def ligne_base(g):
    """Rangée de morceaux : même ligne de base que le premier morceau."""
    ref = None
    for m in g.submobjects:
        y = pied(m)
        if y is None:
            continue
        if ref is None:
            ref = y
        else:
            m.shift(UP * (ref - y))
    return g


def puiss(b, e, fs=60, cb=BASE_C, ce=EXPO_C, audit=True):
    """Une puissance COMPOSÉE : la base, l'exposant plus petit en haut. Un
    exposant « −2 » est fait de DEUX textes (.moins, .chif)."""
    base = T(str(b), fs, cb, audit)
    e = str(e)
    if e.startswith("−"):
        moins, chif = T("−", fs * 0.6, ce, audit), T(e[1:], fs * 0.6, ce, audit)
        expo = VGroup(moins, chif).arrange(RIGHT, buff=0.03)
        moins.set_y(chif.get_y())
    else:
        moins, chif = None, T(e, fs * 0.6, ce, audit)
        expo = VGroup(chif)
    # écart proportionnel à la taille : aux grandes tailles l'exposant touchait le 0
    expo.next_to(base, UR, buff=0.02 + fs * 0.0012).shift(DOWN * fs * 0.006)
    g = VGroup(base, expo)
    g.base, g.expo, g.moins, g.chif = base, expo, moins, chif
    return g


def suite(*items, fs=60, buff=None):
    """Une ligne de calcul : items = textes (str) ou puissances (b, e) ;
    renvoie le VGroup, ses morceaux dans l'ordre, sur une même ligne de base."""
    buff = fs * 0.004 if buff is None else buff
    ms = []
    for it in items:
        if isinstance(it, tuple):
            ms.append(puiss(*it, fs=fs) if len(it) == 2 else puiss(it[0], it[1], fs=fs, cb=it[2]))
        elif isinstance(it, Mobject):
            ms.append(it)
        else:
            c = WHITE
            if isinstance(it, list):
                it, c = it
            ms.append(T(it, fs * (0.85 if it in ("×", "÷", "=", "+") else 1), c))
    g = VGroup(*ms).arrange(RIGHT, buff=buff)
    for m in ms:  # signes au milieu des chiffres, le reste sur la ligne de base
        if isinstance(m, Text) and m.text in ("×", "÷", "=", "+", "−"):
            m.set_y(ms[0].get_y() if isinstance(ms[0], Text) else ms[0].base.get_y())
    for m in ms:
        if not (isinstance(m, Text) and m.text in ("×", "÷", "=", "+", "−")):
            y = pied(m)
            y0 = pied(ms[0])
            if y is not None and y0 is not None:
                m.shift(UP * (y0 - y))
    return g


def produit(n, fs=40, c=WHITE, buff=0.1):
    """n facteurs « 10 » séparés par « × » : .f (les 10), .x (les ×)."""
    fs_ = [T("10", fs, c, audit=False) for _ in range(n)]
    xs = [T("×", fs * 0.8, GREY_B, audit=False) for _ in range(n - 1)]
    ms = []
    for k, f in enumerate(fs_):
        ms.append(f)
        if k < n - 1:
            ms.append(xs[k])
    g = VGroup(*ms).arrange(RIGHT, buff=buff)
    for x in xs:
        x.set_y(fs_[0].get_y())
    g.f, g.x = VGroup(*fs_), VGroup(*xs)
    return g


def barre_oblique(m, couleur=WHITE, sw=5):
    return Line(m.get_corner(DL) + P(-0.06, -0.04), m.get_corner(UR) + P(0.06, 0.04), color=couleur,
                stroke_width=sw)


# ── les dessins ────────────────────────────────────────────────────────────

def ruche(s=1.0):
    """Une ruche en bois : le corps, la hausse plus claire, le toit, l'entrée."""
    corps = Rectangle(width=1.0, height=0.62, fill_color=MIEL, fill_opacity=1, stroke_color="#92400e",
                      stroke_width=2).move_to(P(0, 0.31))
    hausse = Rectangle(width=1.0, height=0.3, fill_color="#fbbf24", fill_opacity=1, stroke_color="#92400e",
                       stroke_width=2).next_to(corps, UP, buff=0)
    toit = Rectangle(width=1.16, height=0.13, fill_color="#94a3b8", fill_opacity=1, stroke_width=0).next_to(
        hausse, UP, buff=0)
    entree = Rectangle(width=0.42, height=0.08, fill_color="#1f2937", fill_opacity=1, stroke_width=0).move_to(
        P(0, 0.08))
    g = VGroup(corps, hausse, toit, entree)
    return g.scale(s)


def abeille(s=1.0, angle=0.0):
    """Une abeille : le corps rayé, la tête, deux ailes."""
    ailes = VGroup(*[Ellipse(width=0.2, height=0.14, fill_color=WHITE, fill_opacity=0.75, stroke_width=0)
                     .move_to(P(dx, 0.13)) for dx in (-0.03, 0.09)])
    corps = Ellipse(width=0.36, height=0.22, fill_color="#facc15", fill_opacity=1, stroke_width=0)
    raies = VGroup(*[Rectangle(width=0.045, height=0.2, fill_color="#111827", fill_opacity=1, stroke_width=0)
                     .move_to(P(dx, 0)) for dx in (-0.02, 0.08)])
    tete = Circle(radius=0.075, fill_color="#111827", fill_opacity=1, stroke_width=0).move_to(P(-0.2, 0.02))
    g = VGroup(ailes, corps, raies, tete).scale(s)
    return g.rotate(angle)


def apiculteur(s=1.0):
    """Un apiculteur en combinaison blanche, chapeau à large bord et voile."""
    p = personne(peau="#c68642", tenue="#f1f5f9", cheveux="#1f2937", s=1.0)
    c = p.tete.get_center()
    bord = Ellipse(width=1.45, height=0.22, fill_color="#e2e8f0", fill_opacity=1, stroke_width=0).move_to(
        c + UP * 0.36)
    dome = AnnularSector(inner_radius=0, outer_radius=0.42, angle=PI, start_angle=0, fill_color="#e2e8f0",
                         fill_opacity=1, stroke_width=0).move_to(c + UP * 0.55)
    voile = Rectangle(width=1.0, height=0.78, fill_color="#64748b", fill_opacity=0.45, stroke_color="#94a3b8",
                      stroke_width=1).move_to(c + DOWN * 0.05)
    gants = VGroup(*[Circle(radius=0.13, fill_color="#fbbf24", fill_opacity=1, stroke_width=0)
                     .move_to(P(x, -1.25)) for x in (-0.7, 0.7)])
    p.add(voile, dome, bord, gants)
    return p.scale(s)


def appareil(s=1.0):
    """Un appareil photo : boîtier sombre, objectif, flash."""
    boitier = RoundedRectangle(width=0.9, height=0.58, corner_radius=0.08, fill_color="#1f2937", fill_opacity=1,
                               stroke_color="#94a3b8", stroke_width=2)
    obj = Circle(radius=0.2, fill_color="#0f172a", fill_opacity=1, stroke_color="#cbd5e1", stroke_width=3)
    flash = Rectangle(width=0.2, height=0.1, fill_color="#e2e8f0", fill_opacity=1, stroke_width=0).move_to(
        boitier.get_corner(UL) + P(0.2, -0.1))
    return VGroup(boitier, obj, flash).scale(s)


def photographe(s=1.0):
    p = personne(peau="#8d5524", tenue="#7c3aed", cheveux="#111827", s=1.0)
    ap = appareil(0.85).move_to(p.tete.get_center() + P(0.05, -0.95))
    p.add(ap)
    return p.scale(s)


def carte_memoire(s=1.0):
    """La carte mémoire (SD) : coin coupé, contacts dorés."""
    w, h = 0.9, 1.2
    corps = Polygon(P(-w / 2, -h / 2), P(w / 2, -h / 2), P(w / 2, h / 2), P(-w / 2 + 0.25, h / 2),
                    P(-w / 2, h / 2 - 0.25), fill_color="#1d4ed8", fill_opacity=1, stroke_color="#93c5fd",
                    stroke_width=2)
    contacts = VGroup(*[Rectangle(width=0.09, height=0.22, fill_color="#fbbf24", fill_opacity=1, stroke_width=0)
                        .move_to(P(-0.22 + 0.15 * k, h / 2 - 0.2)) for k in range(4)])
    etiq = Rectangle(width=0.62, height=0.4, fill_color="#e2e8f0", fill_opacity=1, stroke_width=0).move_to(
        P(0, -0.22))
    return VGroup(corps, contacts, etiq).scale(s)


def photo_icone(s=1.0):
    """Une photo : le cadre, une montagne, un soleil."""
    cadre = Rectangle(width=1.0, height=0.72, fill_color="#e0f2fe", fill_opacity=1, stroke_color=WHITE,
                      stroke_width=3)
    mont = Polygon(P(-0.45, -0.32), P(-0.1, 0.12), P(0.12, -0.08), P(0.28, 0.08), P(0.45, -0.32),
                   fill_color="#16a34a", fill_opacity=1, stroke_width=0)
    sol = Circle(radius=0.09, fill_color=SOLEIL, fill_opacity=1, stroke_width=0).move_to(P(0.28, 0.2))
    return VGroup(cadre, mont, sol).scale(s)


def astrophysicienne(s=1.0):
    p = personne(peau="#e0ac69", tenue="#1e3a8a", cheveux="#5c3a21", longs=True, s=1.0)
    p.add(lunettes(p))
    return p.scale(s)


def soleil(r=0.45):
    disque = Circle(radius=r, fill_color=SOLEIL, fill_opacity=1, stroke_width=0)
    rayons = VGroup(*[Line(P(np.cos(a) * r * 1.25, np.sin(a) * r * 1.25), P(np.cos(a) * r * 1.6,
                                                                             np.sin(a) * r * 1.6),
                           color=SOLEIL, stroke_width=4) for a in np.linspace(0, TAU, 12, endpoint=False)])
    return VGroup(rayons, disque)


# ── les outils (repris de l'épisode 05, recopiés ici) ─────────────────────

class OutilsCalcul:
    """Mixin paysage + short : la voix lue au CURSEUR, la question-pause dont
    chaque morceau de choix se pose au mot, la phrase de réponse COMPOSÉE."""

    def dire(self, nom, dossier=None):
        d = super().dire(nom, dossier)
        self._cur = 0
        return d

    def au(self, extrait, *anims, rt=0.35):
        """Au mot `extrait` (cherché APRÈS le précédent), joue les animations."""
        v = self._texte_voix
        i = v.find(extrait, self._cur)
        if i < 0:
            raise ValueError(f"« {extrait} » absent de la voix après {self._cur} : {v[self._cur:self._cur + 40]}")
        self._cur = i + 1
        marques = self._marques().get(self._cle_voix) or []
        t = max([m[1] for m in marques if m[0] <= i] or [0.0])
        reste = self._debut_voix + t - self.renderer.time
        if reste < -0.3:
            print(f"RETARD {self._cle_voix} « {extrait} » : {-reste:.2f} s", flush=True)
        if reste > 0:
            self.wait(reste + 0.02)  # jamais une image d'avance
        if anims:
            self.play(*anims, run_time=rt)

    def qpause(self, cle_q, cle_r, choix, plans, bonne, phrase, avant=None, apres=None, question=("",)):
        """La question-pause (épisode 05) : plans[i] = [(extrait, [morceaux])] ;
        avant(scène, q) pose la question (déjà dessinée par l'appelant) ;
        apres(scène) pose la phrase de réponse et anime la figure."""
        self.dire(cle_q)
        t0 = self.renderer.time
        tete, q, cartes, pause, rebours, ph = self._disposer_q(list(question), choix, phrase)
        self.au("Question", FadeIn(tete, shift=DOWN * 0.2), rt=0.4)
        if avant:
            avant(self, q)
        for c, lettre, plan in zip(cartes, ("A :", "B :", "C :"), plans):
            self.au(lettre, FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.15), rt=0.25)
            for ex, pieces in plan:
                self.au(ex, *[FadeIn(p, shift=RIGHT * 0.1) for p in pieces], rt=0.25)
        self.au("Mets pause", FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), rt=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        print(f"QUESTION {cle_q} t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f}) reponse={bonne}", flush=True)
        self.dire(cle_r)
        b = cartes[bonne]
        anims = [b[0].animate.set_stroke(VERT_OK, width=7).set_fill("#052e16", 1),
                 b[1][0][0].animate.set_fill(VERT_OK)]
        anims += [cartes[j].animate.set_opacity(0.3) for j in range(3) if j != bonne]
        self.au("Réponse", *anims, FadeOut(rebours), FadeOut(pause), rt=0.3)
        ok = self.coche(VERT_OK, 0.22).move_to(b[0].get_right() + LEFT * 0.33)
        self.play(b.animate.scale(1.08), Create(ok), run_time=0.2)
        self.play(b.animate.scale(1 / 1.08), ok.animate.scale(1 / 1.08, about_point=b.get_center()), run_time=0.2)
        if apres:
            apres(self)
        self.rep_fini()
        self.attendre_voix(marge=0.8)
        return t0

    def rep_compo(self, i, items, fs=None):
        """La ligne i de la réponse, COMPOSÉE (textes verts, puissances (b, e)),
        posée à la place de la ligne i de la phrase ; le script la joue au mot."""
        ref = self.ph_q[i]
        fs = fs or (30 if config.frame_width > 8 else 26)
        ms = []
        for it in items:
            if isinstance(it, tuple):
                ms.append(puiss(it[0], it[1], fs=fs * 1.15, cb=VERT_OK))
            else:
                c = VERT_OK
                if isinstance(it, list):
                    it, c = it
                ms.append(T(it, fs, c))
        lg = ligne_base(VGroup(*ms).arrange(RIGHT, buff=0.14))
        for k, m in enumerate(ms):  # le point final collé à ce qui précède
            if k and isinstance(m, Text) and m.text == ".":
                m.shift(LEFT * (m.get_left()[0] - ms[k - 1].get_right()[0] - 0.04))
        if lg.width > config.frame_width - 0.9:
            lg.scale_to_fit_width(config.frame_width - 0.9)
        lg.move_to(ref)
        if config.frame_width > 8:
            lg.align_to(ref, LEFT)
        return lg

    def jouer(self, lg, plan, rt=0.25):
        """plan = [(extrait, indices des morceaux de lg)] : chaque morceau au mot."""
        for ex, idx in plan:
            self.au(ex, *[FadeIn(lg[k], shift=UP * 0.12) for k in idx], rt=rt)

    def pieges(self, *idx):
        """Les cartes des leurres redeviennent lisibles, en ROUGE."""
        self.play(*[self.cartes_q[j][1][1].animate.set_color(PIEGE).set_opacity(1) for j in idx],
                  *[self.cartes_q[j][0].animate.set_stroke(PIEGE, opacity=1) for j in idx], run_time=0.25)

    def poser_mots(self, t, plan, rt=0.25, avec=None):
        """Un texte écrit MORCEAU PAR MORCEAU : plan = [(début du morceau dans
        le texte : sous-chaîne ou indice, extrait de la voix)] ; avec = {j: [anims]}."""
        s = t.original_text
        debuts = [a if isinstance(a, int) else s.find(a) for a, _ in plan]
        assert debuts[0] == 0 and all(d >= 0 for d in debuts), (s, plan)
        bornes = debuts + [len(s)]
        k, pieces = 0, []
        for a, b in zip(bornes[:-1], bornes[1:]):
            n = sum(1 for c in s[a:b] if not c.isspace())
            pieces.append(VGroup(*t.submobjects[k:k + n]))
            k += n
        for j, ((_, ex), pc) in enumerate(zip(plan, pieces)):
            self.au(ex, FadeIn(pc, shift=UP * 0.12), *((avec or {}).get(j, [])), rt=rt)

    def ajuster_rep(self, lg):
        """Paysage : la ligne de réponse reste dans la colonne, loin de Ti-Margo."""
        if config.frame_width > 8:
            g = lg.get_left()[0]
            droite = 5.15 if lg.get_bottom()[1] < -1.85 else self.BORD_X - 0.05
            if lg.get_right()[0] > droite:
                lg.scale_to_fit_width(droite - g).align_to(P(g, 0), LEFT)
        return lg


class PuissanceCalculBase(OutilsCalcul, PaysageProp):
    nom_voix = "4e-puissance-calcul"
    fichier_marques = "puissance_calcul_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Calculer avec des puissances de 10", self.identite, self.ceinture,
                                       y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        sans_audit(ident)  # « Maths 3e » : l'identité, jamais dite
        n = len("Calculeravecdespuissances")
        t1, t2 = VGroup(*titre.submobjects[:n]), VGroup(*titre.submobjects[n:])
        self.au("Calculer", Write(t1), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.8)
        self.au("de 10", FadeIn(t2, shift=LEFT * 0.2), rt=0.35)
        q = suite(["Combien font", WHITE], (10, 2), "×", (10, 4), ["?", EXPO_C], fs=84, buff=0.3)
        q[0].scale(50 / 84).align_to(q[1].base, DOWN)
        q.arrange(RIGHT, buff=0.32)
        ligne_base(q)
        q[2].set_y(q[1].base.get_y())
        q.move_to(P(-0.4, 0.45))
        self.au("Combien", FadeIn(q[0], shift=RIGHT * 0.2), rt=0.3)
        self.au("10 puissance", FadeIn(q[1].base, scale=1.3), rt=0.3)
        self.au("2 fois", FadeIn(q[1].expo, scale=1.6), rt=0.3)
        self.au("fois", FadeIn(q[2], scale=1.3), rt=0.2)
        self.au("10 puissance", FadeIn(q[3].base, scale=1.3), rt=0.3)
        self.au("4 ?", FadeIn(q[3].expo, scale=1.6), FadeIn(q[4], scale=1.4), rt=0.35)
        self.play(q[1].expo.animate.scale(1.6), q[3].expo.animate.scale(1.6), run_time=0.25)
        self.play(q[1].expo.animate.scale(1 / 1.6), q[3].expo.animate.scale(1 / 1.6), run_time=0.25)
        self.attendre_voix(marge=0.6)

    # ── 01 : l'apiculteur : 100 ruches de 10 000 abeilles ──────────────────
    def ecran_apiculteur(self):
        self.ecran("01-apiculteur")
        api = apiculteur(0.62).move_to(P(-5.6, 0.55))
        met = T("apiculteur", 28, CIEL).next_to(api, DOWN, buff=0.15).align_to(P(-6.45, 0), LEFT)
        self.au("Un apiculteur", FadeIn(api, shift=UP * 0.3), FadeIn(met, shift=UP * 0.1), rt=0.45)
        rangs = VGroup(*[VGroup(*[ruche(0.27).move_to(P(-4.0 + 0.39 * j, 2.6 - 0.37 * i)) for j in range(10)])
                         for i in range(10)])
        l100 = VGroup(T("100", 44, BASE_C), T("ruches", 40)).arrange(RIGHT, buff=0.2)
        ligne_base(l100).move_to(P(rangs.get_x(), -1.3))
        self.au("100", FadeIn(l100[0], scale=1.3), rt=0.25)
        self.au("ruches", FadeIn(l100[1], shift=LEFT * 0.15),
                LaggedStart(*[FadeIn(r, shift=DOWN * 0.15) for r in rangs], lag_ratio=0.12), rt=0.9)
        # une ruche agrandie, ses abeilles
        choisie = rangs[0][9]
        grande = ruche(1.5).move_to(P(3.7, 1.25))
        liens = VGroup(DashedLine(choisie.get_corner(UR), grande.get_corner(UL), color=GREY_B, stroke_width=2),
                       DashedLine(choisie.get_corner(DR), grande.get_corner(DL), color=GREY_B, stroke_width=2))
        l1 = T("Dans chaque ruche :", 36)
        self.col(l1, -0.85)
        self.au("Dans chaque", Indicate(choisie, color=WHITE, scale_factor=1.6), FadeIn(l1, shift=RIGHT * 0.2), rt=0.3)
        self.au("ruche", Create(liens), FadeIn(grande, scale=0.3), rt=0.3)
        import random
        rd = random.Random(7)
        abeilles = VGroup()
        for k in range(14):
            a = TAU * k / 14
            abeilles.add(abeille(0.75, rd.uniform(-0.5, 0.5)).move_to(
                grande.get_center() + P(np.cos(a) * 1.55, np.sin(a) * 1.15)))
        self.au("vivent", LaggedStart(*[FadeIn(b, scale=0.3) for b in abeilles], lag_ratio=0.1), rt=0.25)
        l2 = VGroup(T("environ", 40), T("10 000", 44, BASE_C), T("abeilles", 40)).arrange(RIGHT, buff=0.2)
        ligne_base(l2)
        self.col(l2, -1.6)
        self.au("environ", FadeIn(l2[0], shift=RIGHT * 0.15), rt=0.25)
        self.au("10 000", FadeIn(l2[1], scale=1.3), rt=0.3)
        self.au("abeilles", FadeIn(l2[2], shift=LEFT * 0.15),
                *[b.animate.shift(P(rd.uniform(-0.12, 0.12), rd.uniform(-0.1, 0.1))) for b in abeilles], rt=0.4)
        q = VGroup(T("Combien d'abeilles", 42), T("en tout ?", 42, EXPO_C)).arrange(RIGHT, buff=0.22)
        ligne_base(q).move_to(P(-2.4, -2.75))
        self.au("Combien", FadeIn(q[0], shift=UP * 0.15), rt=0.35)
        self.au("en tout", FadeIn(q[1], scale=1.3), rt=0.3)
        self.insister(q[1], 1.25, 0.25)
        self.attendre_voix(marge=0.4)

    # ── 02 : 10² × 10⁴ se déplie : six facteurs 10 → 10⁶ ─────────────────
    def ecran_produit(self):
        self.ecran("02-produit")
        l1 = suite("100", "×", "10 000", "=", (10, 2), "×", (10, 4), fs=60, buff=0.28).move_to(P(-0.4, 2.75))
        self.au("100 fois", FadeIn(l1[0], scale=1.3), rt=0.3)
        self.au("fois", FadeIn(l1[1]), rt=0.2)
        self.au("10 000", FadeIn(l1[2], scale=1.3), rt=0.3)
        self.au("c'est", FadeIn(l1[3]), rt=0.2)
        p2, p4 = l1[4], l1[6]
        self.au("10 puissance", FadeIn(p2.base, scale=1.3), rt=0.3)
        self.au("2 fois", FadeIn(p2.expo, scale=1.6), rt=0.3)
        self.au("fois", FadeIn(l1[5]), rt=0.2)
        self.au("10 puissance", FadeIn(p4.base, scale=1.3), rt=0.3)
        self.au("4.", FadeIn(p4.expo, scale=1.6), rt=0.3)
        # le dépliage : 10 × 10, puis 10 × 10 × 10 × 10
        row = produit(6, fs=52, buff=0.2).move_to(P(-0.4, 1.0))
        g1, g2 = VGroup(*row[:3]), VGroup(*row[4:])
        f1 = Arrow(p2.get_bottom(), g1.get_top(), color=BASE_C, stroke_width=5, buff=0.2,
                   max_tip_length_to_length_ratio=0.2)
        f2 = Arrow(p4.get_bottom(), g2.get_top(), color=BASE_C, stroke_width=5, buff=0.2,
                   max_tip_length_to_length_ratio=0.2)
        self.au("Écrivons", GrowArrow(f1), GrowArrow(f2), rt=0.5)
        self.au("10 fois", FadeIn(row.f[0], shift=DOWN * 0.2), rt=0.25)
        self.au("fois", FadeIn(row.x[0]), rt=0.2)
        self.au("10,", FadeIn(row.f[1], shift=DOWN * 0.2), rt=0.25)
        self.au("puis", FadeIn(row.x[1], scale=1.3), rt=0.2)
        for k in range(2, 6):
            self.au("10", FadeIn(row.f[k], shift=DOWN * 0.2), rt=0.22)
            if k < 5:
                self.au("fois", FadeIn(row.x[k]), rt=0.15)
        # six facteurs : on les compte
        cpt = VGroup(*[T(str(k + 1), 30, EXPO_C, audit=False).next_to(row.f[k], DOWN, buff=0.22) for k in range(6)])
        self.au("Six", LaggedStart(*[AnimationGroup(FadeIn(c, scale=1.5), Indicate(f, color=BASE_C, scale_factor=1.25))
                                     for c, f in zip(cpt, row.f)], lag_ratio=0.25), rt=0.9)
        l3 = suite("=", (10, 6), fs=84, buff=0.3).move_to(P(-2.7, -0.75))
        self.au("10 puissance", FadeIn(l3[0]), FadeIn(l3[1].base, scale=1.3), rt=0.3)
        self.au("6.", ReplacementTransform(cpt[5].copy(), l3[1].expo), rt=0.4)
        self.insister(l3[1].expo, 1.6, 0.25, about=l3[1].expo.get_center())
        mil = VGroup(T("Un million d'abeilles !", 40, VERT_OK), abeille(1.1)).arrange(RIGHT, buff=0.3)
        mil.next_to(l3, RIGHT, buff=0.6)
        self.au("Un million", FadeIn(mil[0], shift=LEFT * 0.2), FadeIn(mil[1], scale=0.3), rt=0.4)
        regle = VGroup(T("Les exposants s'additionnent :", 38), T("2", 46, EXPO_C), T("+", 40, EXPO_C),
                       T("4", 46, EXPO_C), T("=", 40, EXPO_C), T("6", 46, EXPO_C)).arrange(RIGHT, buff=0.2)
        regle[1:].shift(RIGHT * 0.32)  # le cadre (qui grandit) loin du « : »
        ligne_base(regle)
        for m in (regle[2], regle[4]):
            m.set_y(regle[1].get_y())
        regle.move_to(P(-0.9, -2.45))
        self.au("Les exposants", FadeIn(regle[0], shift=RIGHT * 0.2),
                Indicate(p2.expo, color=EXPO_C, scale_factor=1.8), Indicate(p4.expo, color=EXPO_C, scale_factor=1.8),
                rt=0.5)
        self.au("2 plus", FadeIn(regle[1], scale=1.4), rt=0.2)
        self.au("plus", FadeIn(regle[2]), rt=0.15)
        self.au("4", FadeIn(regle[3], scale=1.4), rt=0.2)
        self.au("6.", FadeIn(regle[4]), FadeIn(regle[5], scale=1.5), rt=0.25)
        cad = self.encadrer(regle[1:], couleur=EXPO_C, buff=0.15)
        self.play(Create(cad), run_time=0.3)
        boite = VGroup(regle[1:], cad)  # le cadre grandit AVEC son contenu (rien ne déborde)
        self.play(boite.animate.scale(1.1), l3[1].expo.animate.scale(1.4), run_time=0.25)
        self.play(boite.animate.scale(1 / 1.1), l3[1].expo.animate.scale(1 / 1.4), run_time=0.25)
        self.attendre_voix(marge=0.4)

    # ── 02q : QUESTION 1 : 10³ × 10⁵ ? (le leurre 10¹⁵ : 3 × 5) ──────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        fig = suite((10, 3), "×", (10, 5), "=", ["?", EXPO_C], fs=72, buff=0.26).move_to(P(-3.45, 1.75))
        qm = fig[4]
        res = puiss(10, 8, fs=72, cb=VERT_OK, audit=False)
        res.shift(fig[3].get_right() + RIGHT * 0.3 - res.get_left())
        res.shift(UP * (pied(fig[0]) - pied(res)))
        add = T("On additionne les exposants :", 30).move_to(P(-3.3, 0.45))  # 3 % du bord gauche
        som = suite(["3", EXPO_C], ["+", EXPO_C], ["5", EXPO_C], ["=", EXPO_C], ["8", EXPO_C], fs=60,
                    buff=0.25).move_to(P(-3.6, -0.4))
        sans_audit(som[3:])  # le 8 vient d'être dit
        faux = puiss(10, 15, fs=72, cb=PIEGE, ce=PIEGE, audit=False).move_to(P(-3.6, -1.75))
        piege = VGroup(T("15,", 36, PIEGE), T("c'est", 36, PIEGE), T("3", 40, PIEGE), T("×", 36, PIEGE),
                       T("5 :", 40, PIEGE), T("le piège.", 36, PIEGE)).arrange(RIGHT, buff=0.16)
        ligne_base(piege)
        piege[3].set_y(piege[2].get_y())
        piege.move_to(P(-3.6, -2.85))
        choix = [puiss(10, 15, fs=44), puiss(10, 8, fs=44), puiss(100, 8, fs=44)]
        plans = [[("10 puissance", [choix[0].base]), ("15", [choix[0].expo])],
                 [("10 puissance", [choix[1].base]), ("8.", [choix[1].expo])],
                 [("100 puissance", [choix[2].base]), ("8.", [choix[2].expo])]]

        def avant(sc, q):
            sc.poser_mots(q[0], [(0, "Combien"), (13, "10 puissance"), (15, "3 fois"), (17, "fois"),
                                 (19, "10 puissance"), (21, "5 ?")],
                          avec={1: [FadeIn(fig[0].base, scale=1.3)], 2: [FadeIn(fig[0].expo, scale=1.6)],
                                3: [FadeIn(fig[1])], 4: [FadeIn(fig[2].base, scale=1.3)],
                                5: [FadeIn(fig[2].expo, scale=1.6), FadeIn(fig[3]), FadeIn(qm, scale=1.4)]})

        def apres(sc):
            l0 = sc.ajuster_rep(sc.rep_compo(0, ["Réponse B :", (10, 8), "."], fs=34))
            sc.au("B :", FadeIn(l0[0], shift=UP * 0.12), rt=0.25)
            sc.au("10 puissance", FadeIn(l0[1].base, shift=UP * 0.12), FadeOut(qm, scale=0.5),
                  FadeIn(res.base, scale=1.3), rt=0.3)
            sc.au("8.", FadeIn(l0[1].expo, l0[2], shift=UP * 0.12), FadeIn(res.expo, scale=1.7), rt=0.3)
            sc.play(Create(sc.encadrer(VGroup(fig[:4], res), buff=0.2)), run_time=0.3)
            sc.au("On additionne", FadeIn(add, shift=UP * 0.12), rt=0.3)
            sc.au("les exposants", Indicate(fig[0].expo, color=EXPO_C, scale_factor=1.8),
                  Indicate(fig[2].expo, color=EXPO_C, scale_factor=1.8), rt=0.4)
            sc.au("3 plus", FadeIn(som[0], scale=1.3), rt=0.2)
            sc.au("plus", FadeIn(som[1]), rt=0.15)
            sc.au("5.", FadeIn(som[2], scale=1.3), rt=0.2)
            sc.play(FadeIn(som[3]), ReplacementTransform(res.expo.copy(), som[4]), run_time=0.35)
            sc.au("15,", FadeIn(piege[0], shift=UP * 0.12), FadeIn(faux, scale=1.3), rt=0.3)
            sc.pieges(0)
            sc.au("c'est", FadeIn(piege[1], shift=UP * 0.12), rt=0.2)
            sc.au("3 fois", FadeIn(piege[2], scale=1.3), rt=0.15)
            sc.au("fois", FadeIn(piege[3]), rt=0.15)
            sc.au("5 :", FadeIn(piege[4], scale=1.3), rt=0.15)
            sc.au("le piège", FadeIn(piege[5], shift=UP * 0.12), Create(barre_oblique(faux, WHITE, 7)), rt=0.3)
            sc.insister(res.expo, 1.4, 0.25, about=res.expo.get_center())  # reste dans le cadre

        self.qpause("02q-question", "02r-reponse", choix, plans, 1, ["Réponse B : 10⁸."],
                    avant=avant, apres=apres, question=["Combien font 10³ × 10⁵ ?"])

    # ── 03 : le quotient : 10⁹ ÷ 10⁶, six facteurs barrés → 10³ ──────────
    def ecran_quotient(self):
        self.ecran("03-quotient")
        tit = T("Et pour diviser ?", 44, JAUNE_TITRE).move_to(P(-3.0, 3.15))
        self.au("Et pour", Write(tit), rt=0.5)
        ph = photographe(0.55).move_to(P(-5.75, 1.35))
        met = T("photographe", 25, CIEL).next_to(ph, DOWN, buff=0.12).align_to(P(-6.45, 0), LEFT)
        self.au("Un photographe", FadeIn(ph, shift=UP * 0.3), FadeIn(met, shift=UP * 0.1), rt=0.45)
        sd = carte_memoire(0.85).move_to(P(-3.55, 2.05))
        l1 = suite((10, 9), "octets", "de place", fs=50, buff=0.25)
        l1[1].scale(0.8).align_to(l1[0].base, DOWN)
        l1[2].scale(0.8).next_to(l1[1], RIGHT, buff=0.2).align_to(l1[0].base, DOWN)
        ligne_base(VGroup(l1[1], l1[2]))
        l1.move_to(P(0, 2.05)).align_to(P(-2.75, 0), LEFT)
        self.au("10 puissance", FadeIn(sd, scale=0.5), FadeIn(l1[0].base, scale=1.3), rt=0.35)
        self.au("9 octets", FadeIn(l1[0].expo, scale=1.6), rt=0.3)
        self.au("octets", FadeIn(l1[1], shift=LEFT * 0.15), rt=0.25)
        self.au("de place", FadeIn(l1[2], shift=LEFT * 0.15), rt=0.3)
        pic = photo_icone(0.85).move_to(P(-3.55, 0.75))
        l2 = suite("Chaque photo :", (10, 6), "octets", fs=50, buff=0.25)
        l2[0].scale(0.8).align_to(l2[1].base, DOWN)
        l2[2].scale(0.8).align_to(l2[1].base, DOWN)
        l2.arrange(RIGHT, buff=0.25)
        ligne_base(l2)
        l2.move_to(P(0, 0.75)).align_to(P(-2.75, 0), LEFT)
        self.au("Chaque", FadeIn(pic, scale=0.5), FadeIn(l2[0], shift=RIGHT * 0.15), rt=0.35)
        self.au("10 puissance", FadeIn(l2[1].base, scale=1.3), rt=0.3)
        self.au("6 octets", FadeIn(l2[1].expo, scale=1.6), rt=0.3)
        self.au("octets", FadeIn(l2[2], shift=LEFT * 0.15), rt=0.25)
        cb = VGroup(T("Combien de", 40), T("photos ?", 40, EXPO_C)).arrange(RIGHT, buff=0.2)
        ligne_base(cb).move_to(P(0, -0.2)).align_to(P(-2.75, 0), LEFT)
        self.au("Combien", FadeIn(cb[0], shift=UP * 0.15), rt=0.3)
        self.au("photos ?", FadeIn(cb[1], scale=1.3), rt=0.3)
        # la fraction dépliée
        self.play(FadeOut(cb), run_time=0.3)
        Y = -1.55
        gauche = suite((10, 9), "÷", (10, 6), "=", fs=52, buff=0.2).move_to(P(0, Y)).align_to(P(-6.45, 0), LEFT)
        X0 = gauche.get_right()[0] + 0.35
        num = produit(9, fs=38, buff=0.1)
        num.move_to(P(0, Y + 0.5)).align_to(P(X0, 0), LEFT)
        den = produit(6, fs=38, buff=0.1)
        den.move_to(P(0, Y - 0.5)).align_to(P(X0, 0), LEFT)
        trait = Line(P(X0 - 0.1, Y), P(num.get_right()[0] + 0.1, Y), color=WHITE, stroke_width=4)
        self.au("10 puissance", FadeIn(gauche[0].base, scale=1.3), rt=0.3)
        self.au("9 divisé", FadeIn(gauche[0].expo, scale=1.6), FadeIn(gauche[1]),
                LaggedStart(*[FadeIn(m, shift=DOWN * 0.15) for m in num], lag_ratio=0.08), Create(trait), rt=0.6)
        self.au("10 puissance", FadeIn(gauche[2].base, scale=1.3), rt=0.3)
        self.au("6 :", FadeIn(gauche[2].expo, scale=1.6), FadeIn(gauche[3]),
                LaggedStart(*[FadeIn(m, shift=UP * 0.15) for m in den], lag_ratio=0.08), rt=0.5)
        barres = VGroup(*[barre_oblique(m, WHITE, 4) for k in range(6) for m in (num.f[k], den.f[k])])
        self.au("six facteurs", LaggedStart(*[Create(b) for b in barres], lag_ratio=0.12),
                *[num[k].animate.set_opacity(0.35) for k in range(11)],
                *[den[k].animate.set_opacity(0.35) for k in range(11)], rt=1.0)
        reste = VGroup(*num.f[6:])
        cpt = VGroup(*[T(str(k + 1), 28, VERT_OK, audit=False).next_to(f, UP, buff=0.12) for k, f in enumerate(reste)])
        self.au("trois", reste.animate.set_color(VERT_OK), LaggedStart(*[FadeIn(c, scale=1.5) for c in cpt],
                                                                       lag_ratio=0.3), rt=0.5)
        res = suite("=", (10, 3), "=", "1 000", "photos", fs=56, buff=0.25)
        res[4].scale(0.8).align_to(res[3], DOWN)
        res[3].set_color(VERT_OK)
        res[0].shift(LEFT * 0.16)  # le « = » loin du cadre
        res.move_to(P(0, -2.95)).align_to(P(X0, 0), LEFT)
        self.au("10 puissance", FadeIn(res[0]), FadeIn(res[1].base, scale=1.3), rt=0.3)
        self.au("3,", ReplacementTransform(cpt[2].copy(), res[1].expo), rt=0.4)
        self.au("1 000", FadeIn(res[2]), FadeIn(res[3], scale=1.3), rt=0.3)
        self.au("photos", FadeIn(res[4], shift=LEFT * 0.15), rt=0.3)
        self.play(Create(self.encadrer(res[1:4], buff=0.18)), run_time=0.3)
        moins = suite(["9", EXPO_C], ["−", EXPO_C], ["6", EXPO_C], ["=", EXPO_C], ["3", EXPO_C], fs=50, buff=0.2)
        moins.move_to(P(0, -2.95)).align_to(P(-6.45, 0), LEFT)
        sans_audit(moins[3:])
        self.au("Les exposants", Indicate(gauche[0].expo, color=EXPO_C, scale_factor=1.8),
                Indicate(gauche[2].expo, color=EXPO_C, scale_factor=1.8), rt=0.5)
        self.au("9 moins", FadeIn(moins[0], scale=1.4), FadeIn(moins[1]), rt=0.25)
        self.au("6.", FadeIn(moins[2], scale=1.4), rt=0.25)
        self.play(FadeIn(moins[3]), ReplacementTransform(res[1].expo.copy(), moins[4]), run_time=0.4)
        self.insister(moins[4], 1.5, 0.2, about=moins[4].get_center())
        self.attendre_voix(marge=0.4)

    # ── 04 : des nombres devant : 3 × 10² × 2 × 10⁴ = 6 × 10⁶ ─────────────
    def ecran_devant(self):
        self.ecran("04-devant")
        tit = T("Avec des nombres devant", 44, JAUNE_TITRE).move_to(P(-2.6, 3.15))
        self.au("Avec", Write(tit), rt=0.5)
        l1 = suite(["3", BASE_C], "×", (10, 2), "×", ["2", BASE_C], "×", (10, 4), fs=72, buff=0.3)
        l1.move_to(P(-0.4, 1.85))
        self.au("3 fois", FadeIn(l1[0], scale=1.3), rt=0.25)
        self.au("fois", FadeIn(l1[1]), rt=0.2)
        self.au("10 puissance", FadeIn(l1[2].base, scale=1.3), rt=0.3)
        self.au("2,", FadeIn(l1[2].expo, scale=1.6), rt=0.25)
        self.au("multiplié", FadeIn(l1[3], scale=1.3), rt=0.25)
        self.au("2 fois", FadeIn(l1[4], scale=1.3), rt=0.25)
        self.au("fois", FadeIn(l1[5]), rt=0.2)
        self.au("10 puissance", FadeIn(l1[6].base, scale=1.3), rt=0.3)
        self.au("4.", FadeIn(l1[6].expo, scale=1.6), rt=0.25)
        # on range : les nombres ensemble (bleu), les puissances ensemble (orange)
        nb = suite(["3", BASE_C], "×", ["2", BASE_C], fs=72, buff=0.3)
        pw = suite((10, 2), "×", (10, 4), fs=72, buff=0.3)
        bb = SurroundingRectangle(nb, color=BASE_C, buff=0.22, corner_radius=0.15, stroke_width=5)
        bo = SurroundingRectangle(pw, color=EXPO_C, buff=0.22, corner_radius=0.15, stroke_width=5)
        gb, go = VGroup(bb, nb), VGroup(bo, pw)
        fois = T("×", 60)
        ligne2 = VGroup(gb, fois, go).arrange(RIGHT, buff=0.5).move_to(P(-0.4, 0.05))
        sans_audit(VGroup(nb, pw))  # les mêmes nombres, rangés autrement
        self.au("les nombres", TransformFromCopy(l1[0], nb[0]), TransformFromCopy(l1[4], nb[2]), Create(bb),
                rt=0.6)
        self.au("3 fois", Indicate(nb[0], color=BASE_C, scale_factor=1.4), rt=0.25)
        self.au("fois", FadeIn(nb[1]), rt=0.2)
        self.au("2,", Indicate(nb[2], color=BASE_C, scale_factor=1.4), rt=0.25)
        six = T("6", 80, BASE_C).move_to(P(gb.get_x(), -1.6))
        fb = Arrow(gb.get_bottom(), six.get_top(), color=BASE_C, stroke_width=5, buff=0.1,
                   max_tip_length_to_length_ratio=0.3)
        self.au("6.", GrowArrow(fb), FadeIn(six, scale=1.5), rt=0.35)
        self.au("les puissances", TransformFromCopy(l1[2], pw[0]), TransformFromCopy(l1[6], pw[2]), FadeIn(pw[1]),
                FadeIn(fois), Create(bo), rt=0.6)
        p6 = puiss(10, 6, fs=80).move_to(P(go.get_x(), -1.6))
        p6.shift(UP * (pied(six) - pied(p6)))
        fo = Arrow(go.get_bottom(), p6.get_top(), color=EXPO_C, stroke_width=5, buff=0.1,
                   max_tip_length_to_length_ratio=0.3)
        x6 = T("×", 64).move_to(P(fois.get_x(), six.get_y()))
        self.au("10 puissance", GrowArrow(fo), FadeIn(p6.base, scale=1.3), FadeIn(x6), rt=0.35)
        self.au("6.", FadeIn(p6.expo, scale=1.7), rt=0.3)
        res = suite("Résultat :", ["6", VERT_OK], "×", (10, 6), fs=64, buff=0.28)
        res[0].scale(0.7).align_to(res[1], DOWN)
        res.arrange(RIGHT, buff=0.3)
        res[1:].shift(RIGHT * 0.42)  # le cadre (qui grandit) loin du « : »
        ligne_base(res)
        res[2].set_y(res[1].get_y())
        res[3].base.set_color(VERT_OK)
        res.move_to(P(-1.0, -2.9))
        self.au("Résultat", FadeIn(res[0], shift=RIGHT * 0.2), rt=0.3)
        self.au("6 fois", FadeIn(res[1], scale=1.4), rt=0.25)
        self.au("fois", FadeIn(res[2]), rt=0.2)
        self.au("10 puissance", FadeIn(res[3].base, scale=1.3), rt=0.3)
        self.au("6.", FadeIn(res[3].expo, scale=1.7), rt=0.3)
        cad = self.encadrer(res[1:], buff=0.2)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(res[1:], cad), 1.1, 0.25)
        self.attendre_voix(marge=0.4)

    # ── 04q : QUESTION 2 : 4 × 10³ × 2 × 10⁵ ? ────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        fig = suite(["4", BASE_C], "×", (10, 3), "×", ["2", BASE_C], "×", (10, 5), fs=62, buff=0.22)
        fig.move_to(P(-3.6, 1.75))
        eg = suite("=", ["?", EXPO_C], fs=66, buff=0.3)
        eg.move_to(P(-3.6, 0.55))
        rep = suite("=", ["8", VERT_OK], "×", (10, 8, VERT_OK), fs=66, buff=0.25)
        rep.shift(eg[0].get_center() - rep[0].get_center())
        sans_audit(rep)
        nbx = suite(["4", BASE_C], "×", ["2", BASE_C], "=", ["8", BASE_C], fs=52, buff=0.22)
        pwx = suite((10, 3), "×", (10, 5), "=", (10, 8), fs=52, buff=0.22)
        for g, y, c in ((nbx, -0.85, BASE_C), (pwx, -2.25, EXPO_C)):
            g.move_to(P(-3.6, y))
            g.cadre = SurroundingRectangle(g, color=c, buff=0.18, corner_radius=0.14, stroke_width=4)
        choix = [suite("8", "×", (10, 8), fs=40, buff=0.15), suite("6", "×", (10, 8), fs=40, buff=0.15),
                 suite("8", "×", (10, 15), fs=40, buff=0.15)]
        plans = []
        for c, (a, e) in zip(choix, (("8 fois", "8."), ("6 fois", "8."), ("8 fois", "15."))):
            plans.append([(a, [c[0]]), ("fois", [c[1]]), ("10 puissance", [c[2].base]), (e, [c[2].expo])])

        def avant(sc, q):
            sc.poser_mots(q[0], [(0, "4 fois"), (2, "fois"), (4, "10 puissance"), (6, "3,"), (8, "multiplié"),
                                 (10, "2 fois"), (12, "fois"), (14, "10 puissance"), (16, "5 ?")],
                          avec={0: [FadeIn(fig[0], scale=1.3)], 1: [FadeIn(fig[1])],
                                2: [FadeIn(fig[2].base, scale=1.3)], 3: [FadeIn(fig[2].expo, scale=1.6)],
                                4: [FadeIn(fig[3], scale=1.3)], 5: [FadeIn(fig[4], scale=1.3)], 6: [FadeIn(fig[5])],
                                7: [FadeIn(fig[6].base, scale=1.3)],
                                8: [FadeIn(fig[6].expo, scale=1.6), FadeIn(eg, scale=1.2)]})

        def apres(sc):
            l0 = sc.ajuster_rep(sc.rep_compo(0, ["Réponse A :", "8", "×", (10, 8), "."]))
            sc.au("A :", FadeIn(l0[0], shift=UP * 0.12), rt=0.25)
            sc.au("8 fois", FadeIn(l0[1], shift=UP * 0.12), FadeOut(eg[1], scale=0.5), FadeIn(rep[1], scale=1.3),
                  rt=0.25)
            sc.au("fois", FadeIn(l0[2]), FadeIn(rep[2]), rt=0.15)
            sc.au("10 puissance", FadeIn(l0[3].base, shift=UP * 0.12), FadeIn(rep[3].base, scale=1.3), rt=0.25)
            sc.au("8.", FadeIn(l0[3].expo, l0[4], shift=UP * 0.12), FadeIn(rep[3].expo, scale=1.7), rt=0.25)
            l1 = sc.ajuster_rep(sc.rep_compo(1, [["4", BASE_C], ["×", BASE_C], ["2", BASE_C], ["=", BASE_C],
                                                 ["8.", BASE_C]]))
            sc.au("4 fois", FadeIn(l1[0], scale=1.3), FadeIn(nbx[0], scale=1.3), Create(nbx.cadre), rt=0.3)
            sc.au("fois", FadeIn(l1[1]), FadeIn(nbx[1]), rt=0.15)
            sc.au("2,", FadeIn(l1[2], scale=1.3), FadeIn(nbx[2], scale=1.3), rt=0.2)
            sc.au("8.", FadeIn(l1[3], l1[4], scale=1.3), FadeIn(nbx[3]), FadeIn(nbx[4], scale=1.4), rt=0.25)
            l2 = sc.ajuster_rep(sc.rep_compo(2, ["Et", (10, 3), "×", (10, 5), "=", (10, 8), "."]))
            sc.au("Et 10", FadeIn(l2[0], shift=UP * 0.12), Create(pwx.cadre), rt=0.25)
            sc.au("10 puissance", FadeIn(l2[1].base), FadeIn(pwx[0].base, scale=1.3), rt=0.2)
            sc.au("3 fois", FadeIn(l2[1].expo, scale=1.4), FadeIn(pwx[0].expo, scale=1.5), rt=0.2)
            sc.au("fois", FadeIn(l2[2]), FadeIn(pwx[1]), rt=0.15)
            sc.au("10 puissance", FadeIn(l2[3].base), FadeIn(pwx[2].base, scale=1.3), rt=0.2)
            sc.au("5,", FadeIn(l2[3].expo, scale=1.4), FadeIn(pwx[2].expo, scale=1.5), rt=0.2)
            sc.au("10 puissance", FadeIn(l2[4]), FadeIn(l2[5].base), FadeIn(pwx[3]), FadeIn(pwx[4].base, scale=1.3),
                  rt=0.2)
            sc.au("8.", FadeIn(l2[5].expo, l2[6], scale=1.3), FadeIn(pwx[4].expo, scale=1.6), rt=0.25)
            sc.pieges(1, 2)
            sc.insister(rep[1:], 1.2, 0.25)

        self.qpause("04q-question", "04r-reponse", choix, plans, 0,
                    ["Réponse A : 8 × 10⁸.", "4 × 2 = 8.", "Et 10³ × 10⁵ = 10⁸."],
                    avant=avant, apres=apres, question=["4 × 10³ × 2 × 10⁵ ?"])

    # ── 05 : exposant négatif : 10⁵ × 10⁻² = 10³ ─────────────────────────
    def ecran_negatif(self):
        self.ecran("05-negatif")
        tit = T("Avec un exposant négatif", 44, JAUNE_TITRE).move_to(P(-2.4, 3.15))
        self.au("avec un", Write(tit), rt=0.6)
        l1 = suite((10, 5), "×", (10, "−2"), "=", (10, 3), fs=86, buff=0.32)
        l1[4].shift(RIGHT * 0.12)  # le cadre de 10³ ne touche pas le « = »
        l1.move_to(P(-0.6, 1.75))
        Y = -1.75
        num = produit(5, fs=44, buff=0.12)
        num.move_to(P(-0.6, Y + 0.5))
        den = produit(2, fs=44, buff=0.12)
        den.move_to(P(0, Y - 0.5)).align_to(num, LEFT)
        trait = Line(P(num.get_left()[0] - 0.1, Y), P(num.get_right()[0] + 0.1, Y), color=WHITE, stroke_width=4)
        self.au("10 puissance", FadeIn(l1[0].base, scale=1.3), rt=0.3)
        self.au("5 fois", FadeIn(l1[0].expo, scale=1.6),
                LaggedStart(*[FadeIn(m, shift=DOWN * 0.15) for m in num], lag_ratio=0.08), rt=0.4)
        self.au("fois", FadeIn(l1[1]), rt=0.2)
        self.au("10 puissance", FadeIn(l1[2].base, scale=1.3), rt=0.3)
        self.au("moins 2", FadeIn(l1[2].moins, scale=1.8), rt=0.2)
        self.au("2 :", FadeIn(l1[2].chif, scale=1.6), Create(trait),
                LaggedStart(*[FadeIn(m, shift=UP * 0.15) for m in den], lag_ratio=0.1), rt=0.35)
        som = suite(["5", EXPO_C], ["+", EXPO_C], ["(−", EXPO_C], ["2)", EXPO_C], ["=", EXPO_C], ["3", EXPO_C],
                    fs=60, buff=0.2)
        som[3].next_to(som[2], RIGHT, buff=0.04)
        som[4:].shift(LEFT * 0.16)
        som.move_to(P(-0.6, 0.15))
        self.au("5 plus", FadeIn(som[0], scale=1.4), rt=0.2)
        self.au("plus", FadeIn(som[1]), rt=0.15)
        self.au("moins 2,", FadeIn(som[2], scale=1.3), rt=0.15)
        self.au("2,", FadeIn(som[3], scale=1.3), rt=0.15)
        barres = VGroup(*[barre_oblique(m, WHITE, 4) for k in range(2) for m in (num.f[k], den.f[k])])
        self.au("3.", FadeIn(som[4]), FadeIn(som[5], scale=1.5), LaggedStart(*[Create(b) for b in barres],
                                                                             lag_ratio=0.2),
                *[num[k].animate.set_opacity(0.35) for k in range(3)], den.animate.set_opacity(0.35), rt=0.5)
        self.play(VGroup(*num.f[2:]).animate.set_color(VERT_OK), run_time=0.3)
        self.au("10 puissance", FadeIn(l1[3]), FadeIn(l1[4].base, scale=1.3), rt=0.3)
        self.au("3.", ReplacementTransform(som[5].copy(), l1[4].expo), rt=0.4)
        self.insister(l1[4].expo, 1.6, 0.25, about=l1[4].expo.get_center())  # avant le cadre
        cad = self.encadrer(l1[4], buff=0.2)
        self.play(Create(cad), run_time=0.3)
        self.attendre_voix(marge=0.4)

    # ── 06 : défi : la lumière, 3 × 10⁵ km en une seconde ─────────────────
    def decor_lumiere(self):
        sol = soleil(0.38).move_to(P(-5.5, 1.85))
        rayon = Arrow(P(-4.75, 1.85), P(-1.45, 1.85), color=SOLEIL, stroke_width=6, buff=0,
                      max_tip_length_to_length_ratio=0.08)
        astro = astrophysicienne(0.6).move_to(P(-5.55, -1.35))
        met = T("astrophysicienne", 25, CIEL).next_to(astro, DOWN, buff=0.15).align_to(P(-6.45, 0), LEFT)
        return sol, rayon, astro, met

    def photon(self, y=1.85, rt=0.6, x0=-4.75, x1=-1.55):
        d = Dot(P(x0, y), radius=0.09, color=WHITE)
        self.play(d.animate.move_to(P(x1, y)), run_time=rt, rate_func=linear)
        self.remove(d)

    def ecran_defi(self):
        self.ecran("06-defi", 0.5)
        tit = T("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.12))
        self.au("À toi", Write(tit), rt=0.6)
        sol, rayon, astro, met = self.decor_lumiere()
        self.au("Une astrophysicienne", FadeIn(astro, shift=UP * 0.3), FadeIn(met, shift=UP * 0.1), rt=0.45)
        XL = -0.7
        l1 = T("La lumière parcourt", 38)
        self.col(l1, 2.0, xl=XL)
        self.au("la lumière", FadeIn(sol, scale=0.5), FadeIn(l1, shift=RIGHT * 0.2), rt=0.4)
        self.au("parcourt", GrowArrow(rayon), rt=0.5)
        l2 = suite(["3", BASE_C], "×", (10, 5), "km", "en une seconde.", fs=48, buff=0.18)
        for m in (l2[3], l2[4]):
            m.scale(0.76)
        l2.arrange(RIGHT, buff=0.2)
        ligne_base(l2)
        l2[1].set_y(l2[0].get_y())
        self.col(l2, 1.15, xl=XL)
        self.au("3 fois", FadeIn(l2[0], scale=1.3), rt=0.25)
        self.au("fois", FadeIn(l2[1]), rt=0.2)
        self.au("10 puissance", FadeIn(l2[2].base, scale=1.3), rt=0.3)
        self.au("5 kilomètres", FadeIn(l2[2].expo, scale=1.6), rt=0.25)
        self.au("kilomètres", FadeIn(l2[3], shift=LEFT * 0.15), rt=0.25)
        self.au("en une", FadeIn(l2[4], shift=LEFT * 0.15), rt=0.3)
        self.photon(rt=0.7)
        l3 = suite("Combien en", (10, 3), "secondes ?", fs=50, buff=0.2)
        for m in (l3[0], l3[2]):
            m.scale(0.76)
        l3.arrange(RIGHT, buff=0.2)
        ligne_base(l3)
        l3[2][-1].set_color(EXPO_C)
        self.col(l3, 0.2, xl=XL)
        self.au("Combien", FadeIn(l3[0], shift=RIGHT * 0.2), rt=0.3)
        self.au("10 puissance", FadeIn(l3[1].base, scale=1.3), rt=0.3)
        self.au("3 secondes", FadeIn(l3[1].expo, scale=1.6), rt=0.25)
        self.au("secondes", FadeIn(l3[2], shift=LEFT * 0.15), rt=0.3)
        for _ in range(3):
            self.photon(rt=0.3)
        l4 = VGroup(T("Écris le résultat", 36), T("en notation scientifique.", 36)).arrange(DOWN, aligned_edge=LEFT,
                                                                                            buff=0.12)
        self.col(l4, -1.05, xl=XL)
        self.au("Écris", FadeIn(l4[0], shift=RIGHT * 0.2), rt=0.35)
        self.au("en notation", FadeIn(l4[1], shift=RIGHT * 0.2), rt=0.35)
        self.au("Mets pause")
        pz = self.col(T("Mets pause, et cherche !", 34, ORANGE_RETENUE), -2.35, xl=XL)
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    # ── 06b : correction : 3 × 10⁸ km ──────────────────────────────────────
    def ecran_correction(self):
        self.ecran("06b-correction", 0.5)
        tit = T("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.12))
        self.au("Correction", Write(tit), rt=0.5)
        sol, rayon, astro, met = self.decor_lumiere()
        self.add(sol, rayon, astro, sans_audit(met))
        XL = -0.7
        l1 = suite(["3", BASE_C], "×", (10, 5), "×", (10, 3), fs=70, buff=0.4)  # le cadre du 3 loin du ×
        self.col(l1, 1.85, xl=XL)
        self.au("3 fois", FadeIn(l1[0], scale=1.3), rt=0.25)
        self.au("fois", FadeIn(l1[1]), rt=0.2)
        self.au("10 puissance", FadeIn(l1[2].base, scale=1.3), rt=0.3)
        self.au("5,", FadeIn(l1[2].expo, scale=1.6), rt=0.25)
        self.au("multiplié", FadeIn(l1[3], scale=1.3), rt=0.25)
        self.au("10 puissance", FadeIn(l1[4].base, scale=1.3), rt=0.3)
        self.au("3.", FadeIn(l1[4].expo, scale=1.6), rt=0.25)
        l2 = VGroup(T("Le", 38), T("3", 44, BASE_C), T("reste devant.", 38)).arrange(RIGHT, buff=0.18)
        ligne_base(l2)
        self.col(l2, 0.75, xl=XL)
        cb = SurroundingRectangle(l1[0], color=BASE_C, buff=0.12, corner_radius=0.1, stroke_width=4)
        self.au("Le 3", FadeIn(l2[0], shift=RIGHT * 0.15), rt=0.2)
        self.au("3 reste", FadeIn(l2[1], scale=1.4), Create(cb), rt=0.25)
        self.au("reste", FadeIn(l2[2], shift=RIGHT * 0.15), rt=0.3)
        som = suite(["5", EXPO_C], ["+", EXPO_C], ["3", EXPO_C], ["=", EXPO_C], ["8", EXPO_C], fs=56, buff=0.22)
        self.col(som, -0.3, xl=XL)
        self.au("5 plus", FadeIn(som[0], scale=1.4), Indicate(l1[2].expo, color=EXPO_C, scale_factor=1.8), rt=0.25)
        self.au("plus", FadeIn(som[1]), rt=0.15)
        self.au("3,", FadeIn(som[2], scale=1.4), Indicate(l1[4].expo, color=EXPO_C, scale_factor=1.8), rt=0.25)
        self.au("8.", FadeIn(som[3]), FadeIn(som[4], scale=1.5), rt=0.25)
        res = suite("=", ["3", VERT_OK], "×", (10, 8, VERT_OK), "km", fs=70, buff=0.25)
        res[0].shift(LEFT * 0.12)  # le « = » loin du cadre
        res[4].scale(0.7).align_to(res[1], DOWN)
        self.col(res, -1.4, xl=XL)
        self.au("3 fois", FadeIn(res[0]), FadeIn(res[1], scale=1.4), rt=0.25)
        self.au("fois", FadeIn(res[2]), rt=0.2)
        self.au("10 puissance", FadeIn(res[3].base, scale=1.3), rt=0.3)
        self.au("8 kilomètres", ReplacementTransform(som[4].copy(), res[3].expo), rt=0.35)
        self.au("kilomètres", FadeIn(res[4], shift=LEFT * 0.15), rt=0.25)
        cad = self.encadrer(res[1:], buff=0.15)
        self.play(Create(cad), run_time=0.3)
        l4 = VGroup(T("300", 38, VERT_OK), T("millions de kilomètres", 38, VERT_OK)).arrange(RIGHT, buff=0.2)
        ligne_base(l4)
        self.col(l4, -2.55, xl=XL)
        self.au("300", FadeIn(l4[0], scale=1.4), rt=0.3)
        self.au("millions", FadeIn(l4[1], shift=LEFT * 0.15), rt=0.3)
        self.photon(rt=0.5)
        self.insister(VGroup(res[1:], cad), 1.12, 0.25)  # le cadre grandit avec le résultat
        self.attendre_voix(marge=0.5)

    # ── 07 : ce que tu as appris ───────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        tit = T("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.au("Ce que", Write(tit), rt=0.7)
        X0, XE, FS = -6.25, 1.6, 32   # le texte à gauche, les exemples à droite (XE)

        def bloc(*lignes):
            """lignes = [[(texte, couleur), …], …] → VGroup de lignes de morceaux."""
            g = VGroup(*[ligne_base(VGroup(*[T(s, FS, c) for s, c in lg]).arrange(RIGHT, buff=0.15))
                         for lg in lignes])
            g.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
            for i in range(1, len(g)):  # interlignes égaux : d'une ligne de base à l'autre
                g[i].shift(UP * (g[i - 1][0][0].get_bottom()[1] - 0.52 - g[i][0][0].get_bottom()[1]))
            return g

        def rangee(y, b, ex):
            c = self.coche()
            l = VGroup(c, b).arrange(RIGHT, buff=0.3)
            c.align_to(b, UP).shift(DOWN * 0.04)
            l.move_to(P(0, y)).align_to(P(X0, 0), LEFT)
            sans_audit(ex)  # le rappel des exemples déjà vus
            if ex.width > 6.45 - XE:
                ex.scale_to_fit_width(6.45 - XE)
            ex.move_to(P(0, b.get_y())).align_to(P(XE, 0), LEFT)
            return c

        b1 = bloc([("Pour multiplier :", WHITE)], [("on additionne", WHITE), ("les exposants.", EXPO_C)])
        e1 = suite((10, 2), "×", (10, 4), "=", (10, 6), fs=46, buff=0.18)
        c1 = rangee(2.1, b1, e1)
        self.au("Pour multiplier", Create(c1), FadeIn(b1[0], shift=RIGHT * 0.15), rt=0.35)
        self.au("on additionne", FadeIn(b1[1][0], shift=RIGHT * 0.15), rt=0.3)
        self.au("les exposants", FadeIn(b1[1][1], shift=RIGHT * 0.15), FadeIn(e1, shift=LEFT * 0.2), rt=0.4)
        b2 = bloc([("Pour diviser :", WHITE)], [("on les", WHITE), ("soustrait.", EXPO_C)])
        e2 = suite((10, 9), "÷", (10, 6), "=", (10, 3), fs=46, buff=0.18)
        c2 = rangee(0.65, b2, e2)
        self.au("Pour diviser", Create(c2), FadeIn(b2[0], shift=RIGHT * 0.15), rt=0.35)
        self.au("on les", FadeIn(b2[1][0], shift=RIGHT * 0.15), rt=0.3)
        self.au("soustrait", FadeIn(b2[1][1], shift=RIGHT * 0.15), FadeIn(e2, shift=LEFT * 0.2), rt=0.4)
        b3 = bloc([("Avec des nombres devant :", WHITE)], [("on multiplie", WHITE), ("les nombres entre eux,", BASE_C)],
                  [("et les puissances entre elles.", EXPO_C)])
        e3 = suite(["3", BASE_C], "×", (10, 2), "×", ["2", BASE_C], "×", (10, 4), "=", ["6", BASE_C], "×", (10, 6),
                   fs=46, buff=0.16)
        c3 = rangee(-0.9, b3, e3)
        e3.move_to(P(0, -2.1)).align_to(b3, LEFT)
        self.au("Avec des", Create(c3), FadeIn(b3[0], shift=RIGHT * 0.15), rt=0.35)
        self.au("on multiplie", FadeIn(b3[1][0], shift=RIGHT * 0.15), rt=0.3)
        self.au("les nombres", FadeIn(b3[1][1], shift=RIGHT * 0.15), rt=0.3)
        self.au("et les", FadeIn(b3[2], shift=RIGHT * 0.15), rt=0.3)
        self.au("entre elles", FadeIn(e3, shift=LEFT * 0.2), rt=0.4)
        ep = VGroup(T("La suite :", 30, JAUNE_TITRE), T("les mêmes règles,", 30),
                    T("avec n'importe quelle base.", 30, BASE_C)).arrange(RIGHT, buff=0.16)
        ligne_base(ep)
        ep.move_to(P(0, -3.05)).align_to(P(X0, 0), LEFT)
        if ep.get_right()[0] > 5.0:
            ep.scale_to_fit_width(5.0 - X0).align_to(P(X0, 0), LEFT)
        self.au("la suite", FadeIn(ep[0], shift=UP * 0.15), rt=0.3)
        self.au("les mêmes", FadeIn(ep[1], shift=UP * 0.15), rt=0.3)
        self.au("avec n'importe", FadeIn(ep[2], shift=UP * 0.15), rt=0.35)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_apiculteur()
        self.ecran_produit()
        self.ecran_question1()
        self.ecran_quotient()
        self.ecran_devant()
        self.ecran_question2()
        self.ecran_negatif()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("08-abonne")


class PuissanceCalcul4e(PuissanceCalculBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"


class PuissanceCalcul3e(PuissanceCalculBase):
    identite = "Maths 3e — EleveAI"
    ceinture = "verte"
