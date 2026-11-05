# puissance_defi.py
# EleveAI — Maths 4e — série « Puissances », épisode 11 : LE DÉFI, quatre
# épreuves de plus en plus dures. Paysage 16:9, AVEC VOIX, ceinture ORANGE.
# Micro couverte : 4e `puissance_defi` (doublements 01-02, notation scientifique
# 03, comparaison 04).
# Code couleur constant : BLEU = la base, ORANGE = l'exposant, VERT = résultat
# juste, ROUGE = le piège (2 × 6, 12 × 10¹², 12 n'est pas entre 1 et 10).
# Le fil : un compteur d'épreuves (4 pastilles qui s'allument), en haut à gauche.
#
# Décor et métiers : YANIS, organisateur de tournois de jeux vidéo (l'arbre de
# tournoi à 6 tours) ; une COMPOSITRICE (5 auditeurs qui doublent chaque jour) ;
# une ARTISTE D'EFFETS SPÉCIAUX (le poids du film, le serveur du studio).
# Centres : jeux-video, musique, cinema-series.
#
# Écrans : garde (00) ; tournoi (01) ; QUESTION 01q + réponse 01r ; chanson
# (02) ; QUESTION 02q + 02r ; film (03) « mets pause, et cherche » + correction
# (03b) ; serveur (04) ; QUESTION 04q + 04r ; ce que tu as appris (05) ; fin (06).
#
# Voix : manim/voix/4e-puissance-defi.json (validée, débit −6), WAV dans
# public/sons/4e-puissance-defi/ ; marques : puissance_defi_marques.json
# (marques_dump.ps1, puis conversion PAR PAIRES des cues doublées « 12 fois » :
# cues2marques.py perdait les mots répétés).
# Outils : manim/scripts/6e/prop_commun.py et, importés sans les modifier,
# OutilsNotation / notation (épisode 05), T / puiss (épisode 07).
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/puissance_defi.py PuissanceDefi4e
# python -m manim render -qh --disable_caching manim/scripts/4e/puissance_defi.py PuissanceDefi4e -o eleveai-maths-4e-puissance-defi --media_dir manim/scripts/4e/media-puiss-11
# Sortie : manim/sorties/4e/maths/puissances/11-defi/eleveai-maths-4e-puissance-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))  # le dossier du script EN TÊTE

from prop_commun import *  # noqa: E402,F403
from puissance_calcul import T, puiss, sans_audit  # noqa: E402,F401
from puissance_notation_scientifique import OutilsNotation, notation, silhouette  # noqa: E402
from mascotte import MascotteMargouillat  # noqa: E402

BASE_C = BLEU_CALCUL       # la base
EXPO_C = ORANGE_RETENUE    # l'exposant
PIEGE = ROUGE_ERREUR
CIEL = "#93c5fd"
OR = "#facc15"
ROSE = "#f472b6"
X0 = -6.2                  # le bord gauche commun des écrans
SIGNES = ("×", "=", "+", "÷", "−")
SURS = set("abcdefhiklmnorstuvwxzABCDEFGHIJKLMNOPRSTUVWXYZ0123456789éèêëàâîïôûù:!?.")


def pied(t):
    """Ligne de base d'un Text : le bas de son premier glyphe sans jambage. (Les
    ligatures « fi », « ff » fusionnent deux lettres : on lit le début du texte,
    sans exiger autant de glyphes que de lettres.)"""
    if not isinstance(t, Text):
        t = getattr(t, "base", getattr(t, "m", None))
        if not isinstance(t, Text):
            return None
    cs = [c for c in t.text if not c.isspace()]
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


def nota(m, e, fs=60, cm=WHITE, audit=True):
    """notation() : le « 10 » posé sur la ligne de base des CHIFFRES de la mantisse
    (la virgule de « 1,5 » descend sous la ligne de base) et le × à mi-hauteur."""
    n = notation(m, e, fs=fs, cm=cm, audit=audit)
    n.p.shift(UP * (pied(n.m) - pied(n.p.base)))
    n.x.set_y(n.m[0].get_y())
    return n


def rangee(*items, buff=0.2):
    """Des morceaux sur une même ligne de base ; les signes à mi-hauteur des chiffres."""
    g = VGroup(*items).arrange(RIGHT, buff=buff)
    ligne_base(g)
    ref = next((m for m in items if isinstance(m, Text) and m.text[0].isdigit()), None)
    if ref is not None:
        for m in items:
            if isinstance(m, Text) and m.text in SIGNES:
                m.set_y(ref[0].get_y())
    return g


def poser(g, x, yb):
    """Le groupe (ou la rangée) : bord gauche en x, ligne de base en yb."""
    y = pied(g)
    if y is None and len(g.submobjects):
        y = pied(g[0])
    y = g.get_bottom()[1] if y is None else y
    g.shift(UP * (yb - y))
    g.shift(RIGHT * (x - g.get_left()[0]))
    return g


# ── le compteur d'épreuves ─────────────────────────────────────────────────

class Compteur(VGroup):
    """« Épreuve » + 4 pastilles numérotées, en haut à gauche ; allumer(k) renvoie
    les animations de la pastille k (1 à 4)."""

    def __init__(self, x=X0 - 0.2, y=3.2):
        super().__init__()
        self.lab = T("Épreuve", 30, JAUNE_TITRE, False)
        self.ronds = VGroup()
        for k in range(1, 5):
            c = Circle(radius=0.22, fill_color="#1f2937", fill_opacity=1, stroke_color=GREY_B, stroke_width=3)
            n = T(str(k), 26, GREY_B, False).move_to(c)
            self.ronds.add(VGroup(c, n))
        self.ronds.arrange(RIGHT, buff=0.1)
        self.add(self.lab, self.ronds)
        self.arrange(RIGHT, buff=0.22)
        self.move_to(P(0, y)).align_to(P(x, 0), LEFT)

    def allumer(self, k):
        r = self.ronds[k - 1]
        return [r[0].animate.set_fill(EXPO_C, 1).set_stroke(WHITE, 3), r[1].animate.set_color(WHITE)]


# ── les pictogrammes et les dessins ────────────────────────────────────────

def manette(s=1.0):
    corps = RoundedRectangle(width=1.3, height=0.62, corner_radius=0.26, fill_color="#6366f1", fill_opacity=1,
                             stroke_width=0)
    poignees = VGroup(*[Circle(radius=0.23, fill_color="#4f46e5", fill_opacity=1, stroke_width=0).move_to(P(x, -0.24))
                        for x in (-0.5, 0.5)])
    croix = VGroup(Rectangle(width=0.3, height=0.09, fill_color=WHITE, fill_opacity=1, stroke_width=0),
                   Rectangle(width=0.09, height=0.3, fill_color=WHITE, fill_opacity=1, stroke_width=0)).move_to(P(-0.36, 0.03))
    b = VGroup(Dot(P(0.28, -0.03), radius=0.07, color=OR), Dot(P(0.44, 0.1), radius=0.07, color=ROSE))
    return VGroup(poignees, corps, croix, b).scale(s)


def note_musique(s=1.0, c=ROSE):
    t1 = Ellipse(width=0.36, height=0.26, fill_color=c, fill_opacity=1, stroke_width=0).rotate(0.35).move_to(P(-0.32, -0.38))
    t2 = Ellipse(width=0.36, height=0.26, fill_color=c, fill_opacity=1, stroke_width=0).rotate(0.35).move_to(P(0.34, -0.26))
    h1 = Rectangle(width=0.06, height=0.78, fill_color=c, fill_opacity=1, stroke_width=0).move_to(P(-0.17, 0.0))
    h2 = Rectangle(width=0.06, height=0.78, fill_color=c, fill_opacity=1, stroke_width=0).move_to(P(0.49, 0.12))
    barre = Polygon(P(-0.2, 0.39), P(0.52, 0.51), P(0.52, 0.32), P(-0.2, 0.2), fill_color=c, fill_opacity=1, stroke_width=0)
    return VGroup(t1, t2, h1, h2, barre).scale(s)


def clap(s=1.0):
    corps = RoundedRectangle(width=1.2, height=0.72, corner_radius=0.05, fill_color="#1f2937", fill_opacity=1,
                             stroke_color=WHITE, stroke_width=2)
    lignes = VGroup(*[Line(P(-0.45, y), P(0.45, y), color=GREY_B, stroke_width=2) for y in (0.1, -0.12)])
    bande = VGroup(Rectangle(width=1.2, height=0.2, fill_color=WHITE, fill_opacity=1, stroke_width=0))
    for x in (-0.42, -0.14, 0.14, 0.42):
        bande.add(Polygon(P(x - 0.1, -0.1), P(x + 0.02, -0.1), P(x + 0.12, 0.1), P(x, 0.1), fill_color="#111827",
                          fill_opacity=1, stroke_width=0))
    bande.move_to(P(0, 0.5)).rotate(0.16, about_point=P(-0.6, 0.4))
    return VGroup(corps, lignes, bande).scale(s)


def image_film(w=1.5):
    """Une image du film : un petit paysage d'animation, encadré."""
    h = w * 0.62
    fond = Rectangle(width=w, height=h, fill_color="#1e3a8a", fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    mont = Polygon(P(-w * 0.46, -h * 0.46), P(-w * 0.12, h * 0.16), P(w * 0.1, -h * 0.14), P(w * 0.24, h * 0.02),
                   P(w * 0.46, -h * 0.46), fill_color="#16a34a", fill_opacity=1, stroke_width=0)
    soleil = Circle(radius=h * 0.13, fill_color=OR, fill_opacity=1, stroke_width=0).move_to(P(w * 0.26, h * 0.24))
    return VGroup(fond, mont, soleil)


def pile_images(n=12, w=1.9, d=0.07):
    """Des images qui s'empilent en biais ; la dernière est devant."""
    g = VGroup(*[image_film(w).shift(RIGHT * d * k + UP * d * k) for k in range(n)])
    return g


def rack(s=1.0):
    """Un serveur : une armoire, des tiroirs et leurs voyants verts."""
    corps = RoundedRectangle(width=1.15, height=1.7, corner_radius=0.08, fill_color="#334155", fill_opacity=1,
                             stroke_color=CIEL, stroke_width=2)
    tiroirs = VGroup()
    for y in (0.56, 0.19, -0.19, -0.56):
        t = RoundedRectangle(width=0.93, height=0.28, corner_radius=0.03, fill_color="#0f172a", fill_opacity=1,
                             stroke_width=0).move_to(P(0, y))
        fente = Line(P(-0.36, y), P(0.1, y), color=GREY_B, stroke_width=2)
        tiroirs.add(t, fente, Dot(P(0.33, y), radius=0.045, color=VERT_OK))
    return VGroup(corps, tiroirs).scale(s)


def trophee(s=1.0):
    coupe = Polygon(P(-0.34, 0.42), P(0.34, 0.42), P(0.24, -0.02), P(0.08, -0.14), P(-0.08, -0.14), P(-0.24, -0.02),
                    fill_color=OR, fill_opacity=1, stroke_width=0)
    anses = VGroup(*[Arc(radius=0.15, start_angle=a, angle=PI, arc_center=P(x, 0.22), stroke_color=OR, stroke_width=5)
                     for x, a in ((-0.33, PI / 2), (0.33, -PI / 2))])
    pied_c = Rectangle(width=0.1, height=0.2, fill_color=OR, fill_opacity=1, stroke_width=0).move_to(P(0, -0.24))
    socle = RoundedRectangle(width=0.5, height=0.11, corner_radius=0.03, fill_color="#ca8a04", fill_opacity=1,
                             stroke_width=0).move_to(P(0, -0.38))
    return VGroup(anses, coupe, pied_c, socle).scale(s)


def telephone(s=1.0):
    corps = RoundedRectangle(width=0.98, height=1.75, corner_radius=0.13, fill_color="#111827", fill_opacity=1,
                             stroke_color=CIEL, stroke_width=3)
    ecran_t = RoundedRectangle(width=0.82, height=1.45, corner_radius=0.05, fill_color="#1e293b", fill_opacity=1,
                               stroke_width=0)
    n = note_musique(0.55).move_to(P(0, 0.28))
    lect = Triangle(fill_color=VERT_OK, fill_opacity=1, stroke_width=0).scale(0.11).rotate(-PI / 2).move_to(P(0, -0.42))
    return VGroup(corps, ecran_t, n, lect).scale(s)


class ArbreTournoi(VGroup):
    """L'arbre à 6 tours : 7 colonnes de points (64, 32, … 1) et leurs liens.
    .cols[k] (les points) ; .liens[k] (le tour k, en couleur, à poser) ; .gris (tout
    l'arbre en pâle) ; .perdants[k] (les points de la colonne k éliminés)."""

    def __init__(self, x0, x1, yb, yh):
        super().__init__()
        ys = [list(np.linspace(yh, yb, 64))]
        while len(ys[-1]) > 1:
            c = ys[-1]
            ys.append([(c[2 * i] + c[2 * i + 1]) / 2 for i in range(len(c) // 2)])
        xs = np.linspace(x0, x1, 7)
        pas = (yh - yb) / 63
        self.cols, self.perdants, self.liens = [], [], []
        self.gris = VGroup()
        for k, c in enumerate(ys):
            r = min(pas * 0.42 * 1.32 ** k, 0.15)
            col = VGroup(*[Dot(P(xs[k], y), radius=r, color=CIEL if k < 6 else OR) for y in c])
            self.cols.append(col)
            if k < 6:
                self.perdants.append(VGroup(*[col[2 * i + ((i * 5 + k) % 2)] for i in range(len(c) // 2)]))
                xm = (xs[k] + xs[k + 1]) / 2
                for couleur, sw, dest in ((GREY_D, 1.2, "gris"), (EXPO_C, 0.8 + 0.4 * k, "liens")):
                    v = VMobject(stroke_color=couleur, stroke_width=sw)
                    for i in range(len(c) // 2):
                        a, b, m = c[2 * i], c[2 * i + 1], ys[k + 1][i]
                        v.start_new_path(P(xs[k], a))
                        for q in (P(xm, a), P(xm, b), P(xs[k], b)):
                            v.add_line_to(q)
                        v.start_new_path(P(xm, m))
                        v.add_line_to(P(xs[k + 1], m))
                    if dest == "gris":
                        self.gris.add(v)
                    else:
                        self.liens.append(v)
        self.add(self.gris, *self.liens, *self.cols)

    def tour(self, k):
        """Le tour k : la moitié s'éteint, les liens et la colonne suivante arrivent."""
        return [self.perdants[k].animate.set_fill(PIEGE, 0.45), Create(self.liens[k]), FadeIn(self.cols[k + 1], scale=1.4)]


class BarresAuditeurs(VGroup):
    """Les auditeurs jour après jour, à l'échelle : 11 barres (jour 0 à 10)."""

    def __init__(self, x0, x1, yb, hmax):
        super().__init__()
        w = (x1 - x0) / 11
        self.sol = Line(P(x0 - 0.1, yb), P(x1 + 0.1, yb), color=WHITE, stroke_width=3)
        self.barres = VGroup()
        for d in range(11):
            h = max(0.03, hmax * 2 ** d / 2 ** 10)
            b = Rectangle(width=w * 0.8, height=h, fill_color=ROSE, fill_opacity=0.9, stroke_width=0)
            b.move_to(P(x0 + w * (d + 0.5), yb + h / 2))
            self.barres.add(b)
        self.add(self.sol, self.barres)


class PuissanceDefiBase(OutilsNotation, PaysageProp):
    nom_voix = "4e-puissance-defi"
    fichier_marques = "puissance_defi_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "orange"

    def dire(self, nom, dossier=None):
        print(f"CHAPITRE {nom} t={self.renderer.time:.2f}", flush=True)
        return super().dire(nom, dossier)

    def allumer(self, k, mot):
        """La pastille k s'allume au mot `mot`, puis s'agrandit et se rétrécit."""
        self.au(mot, *self.cpt.allumer(k), rt=0.3)
        r = self.cpt.ronds[k - 1]
        self.insister(r, 1.3, 0.15, about=r.get_center())

    # ── 00 : page de garde : quatre marches ─────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défi puissances", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        sans_audit(ident)
        self.au("Défi", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.8)
        yb = -1.62
        marches = VGroup()
        for k, h in enumerate((0.5, 1.05, 1.6, 2.15)):
            m = Rectangle(width=1.3, height=h, fill_color="#3b2a1a", fill_opacity=1, stroke_color=EXPO_C, stroke_width=3)
            m.move_to(P(-0.25 + 1.3 * k, yb + h / 2))
            n = T(str(k + 1), 34, EXPO_C, False).move_to(P(m.get_x(), yb + 0.28))
            marches.add(VGroup(m, n))
        l1 = T("Quatre épreuves,", 38)
        l2 = T("de plus en plus dures.", 38)
        poser(l1, X0, 0.95)
        poser(l2, X0, 0.3)
        l3 = T("Tu tiens jusqu'au bout ?", 38, EXPO_C)
        poser(l3, X0, -0.6)
        petit = MascotteMargouillat().scale(0.2)
        petit.next_to(marches[0][0], UP, buff=0.02)
        self.au("Quatre", FadeIn(l1, shift=RIGHT * 0.15),
                LaggedStart(*[GrowFromEdge(m[0], DOWN) for m in marches], lag_ratio=0.25),
                FadeIn(VGroup(*[m[1] for m in marches])), rt=0.9)
        self.au("de plus", FadeIn(l2, shift=RIGHT * 0.15), FadeIn(petit, shift=DOWN * 0.3), rt=0.4)
        for k in (1, 2):
            self.play(petit.animate(path_arc=-PI * 0.4).next_to(marches[k][0], UP, buff=0.02), run_time=0.35)
        self.au("Tu tiens", FadeIn(l3, scale=1.2), rt=0.4)
        self.au("jusqu'au", petit.animate(path_arc=-PI * 0.4).next_to(marches[3][0], UP, buff=0.02), rt=0.4)
        self.insister(petit, 1.4, 0.2)
        self.attendre_voix(marge=0.5)

    # ── 01 : Yanis et l'arbre du tournoi ───────────────────────────────────
    def ecran_tournoi(self):
        self.ecran("01-tournoi")
        self.cpt = Compteur()
        sans_audit(self.cpt)
        self.au("Épreuve", FadeIn(self.cpt, shift=DOWN * 0.15), rt=0.3)
        self.allumer(1, "1.")
        pic = manette(0.85).move_to(P(-5.6, 2.42))
        met = rangee(T("Yanis,", 34, CIEL), T("organisateur de tournois", 34, CIEL), T("de jeux vidéo", 34, CIEL))
        poser(met, -4.75, 2.33)
        self.au("Yanis", FadeIn(pic, scale=0.6), FadeIn(met[0], shift=RIGHT * 0.15), rt=0.4)
        self.au("organise", FadeIn(met[1], shift=RIGHT * 0.15), rt=0.35)
        self.au("jeux vidéo", FadeIn(met[2], shift=RIGHT * 0.15), Wiggle(pic), rt=0.5)
        l1 = rangee(T("Son prochain tournoi se joue en", 30), T("6 tours.", 30, EXPO_C), buff=0.15)
        poser(l1, X0, 1.62)
        l2 = T("À chaque tour, la moitié des joueurs est éliminée,", 30)
        poser(l2, X0, 1.12)
        ab = ArbreTournoi(X0 + 0.05, 3.5, -3.4, 0.82)
        vq = trophee(0.95).next_to(ab.cols[6], RIGHT, buff=0.25)
        self.au("Son prochain", FadeIn(l1[0], shift=RIGHT * 0.15), rt=0.35)
        self.au("6 tours", FadeIn(l1[1], scale=1.3), FadeIn(ab.gris), FadeIn(ab.cols[0]), rt=0.5)
        self.poser_mots(l2, [("À chaque tour", "À chaque"), ("la moitié", "la moitié"), ("des joueurs", "des joueurs"),
                             ("est éliminée", "est éliminée")], avec={0: ab.tour(0)})
        fin = self.t_mot("jusqu'au")
        pas_r = max(0.15, (fin - 0.05) / 4)
        for k in range(1, 5):
            self.play(*ab.tour(k), run_time=pas_r)
        v1, v2 = T("jusqu'au", 30, OR), T("vainqueur", 30, OR)
        poser(v1, 4.25, 0.1)
        poser(v2, 4.25, -0.38)
        self.au("jusqu'au", FadeIn(v1), rt=0.25)
        self.au("vainqueur", *ab.tour(5), FadeIn(vq, scale=0.5), FadeIn(v2, shift=UP * 0.1), rt=0.45)
        self.insister(vq, 1.25, 0.2)
        self.attendre_voix(marge=0.4)

    # ── 01q : QUESTION : combien de joueurs au départ ? ────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.add(self.cpt)
        ab = ArbreTournoi(-5.6, -0.25, -1.7, 1.15)
        for k in range(6):
            ab.perdants[k].set_fill(PIEGE, 0.45)
        vq = trophee(0.62).next_to(ab.cols[6], RIGHT, buff=0.08)
        gq = VGroup(ab, vq)
        self.add(gq)
        qm = T("?", 64, EXPO_C, False).move_to(P(-6.2, -0.27))
        choix = [T("12", 40), T("36", 40), T("64", 40)]
        plans = [[(s, [c])] for s, c in zip(("12.", "36.", "64."), choix)]

        def avant(sc, q):
            sc.poser_mots(q[0], [("Combien", "Combien")])
            sc.poser_mots(q[1], [("de joueurs", "de joueurs"), ("au départ", "au départ")], avec={1: [FadeIn(qm, scale=1.5)]})

        def apres(sc):
            lg = sc.rep_ligne(0, ["Réponse C :", "64."])
            sc.au("C :", FadeIn(lg[0], shift=UP * 0.12), FadeOut(qm), gq.animate.shift(UP * 1.5), rt=0.3)
            lg[1].shift(RIGHT * 0.08)
            sc.au("64.", FadeIn(lg[1], scale=1.3), rt=0.3)
            sc.pieges(0, 1)
            l0 = T("On remonte depuis le vainqueur :", 28)
            poser(l0, X0, -0.62)
            sc.poser_mots(l0, [("On remonte", "On remonte"), ("depuis", "depuis"), ("le vainqueur", "le vainqueur")],
                          avec={2: [Indicate(vq, color=OR, scale_factor=1.4)]})
            nb = [T(s, 46, CIEL) for s in ("1,", "2,", "4,", "8,", "16,", "32,", "64")]
            su = rangee(*nb, buff=0.28)
            poser(su, X0, -1.42)
            for j, (m, ex) in enumerate(zip(nb, ("1, 2", "2, 4", "4, 8", "8, 16", "16, 32", "32, 64", "64. Six"))):
                col = ab.cols[6 - j]
                sc.au(ex, FadeIn(m, scale=1.4), col.animate.set_color(VERT_OK).set_opacity(1), rt=0.3)
            nb[6].set_color(VERT_OK)
            sc.insister(nb[6], 1.3, 0.15, about=nb[6].get_left())
            d = T("Six doublements :", 36)
            p = puiss(2, 6, fs=60)
            ld = rangee(d, p, buff=0.3)
            poser(ld, X0, -2.46)
            sc.au("Six", FadeIn(d, shift=RIGHT * 0.15), rt=0.35)
            sc.au("2 puissance", FadeIn(p.base, scale=1.3), rt=0.3)
            sc.au("6. Pas", FadeIn(p.expo, scale=1.6), rt=0.3)
            sc.insister(p.expo, 1.5, 0.2, about=p.expo.get_corner(DL))
            pa, un, x, si, eg, dz, fi = (T("Pas", 36), T("2", 36, PIEGE), T("×", 32, PIEGE), T("6", 36, PIEGE), T("=", 32, PIEGE),
                                         T("12", 36, PIEGE), T(": le piège.", 36, PIEGE))
            ct = rangee(un, x, si, eg, dz, buff=0.12)
            lp = rangee(pa, ct[0], ct[1], ct[2], ct[3], ct[4], fi, buff=0.17)
            poser(lp, X0, -3.28)
            sc.au("Pas 2", FadeIn(pa), rt=0.2)
            sc.au("2 fois", FadeIn(un), rt=0.2)
            sc.au("fois 6", FadeIn(x), rt=0.2)
            sc.au("6, 12", FadeIn(si), rt=0.2)
            sc.au("12 :", FadeIn(eg), FadeIn(dz), rt=0.25)
            barre = Line(un.get_left() + LEFT * 0.08 + DOWN * 0.02, dz.get_right() + RIGHT * 0.08 + UP * 0.02, color=PIEGE,
                         stroke_width=5)
            sc.au("le piège", FadeIn(fi, shift=RIGHT * 0.1), Create(barre), rt=0.35)

        self.qpause("01q-question", "01r-reponse", ["Combien faut-il", "de joueurs au départ ?"], choix, plans, 2,
                    ["Réponse C : 64."], avant=avant, apres=apres)

    # ── 02 : la compositrice : 5 auditeurs qui doublent chaque jour ─────────
    def ecran_chanson(self):
        self.ecran("02-chanson")
        self.add(self.cpt)
        self.allumer(2, "2.")
        pic = note_musique(0.85).move_to(P(-5.65, 2.3))
        l1 = T("Une jeune compositrice", 36, CIEL)
        poser(l1, -4.8, 2.33)
        tel = telephone(0.95).move_to(P(-5.4, 0.72))
        self.au("Une jeune", FadeIn(pic, scale=0.6), FadeIn(l1, shift=RIGHT * 0.15), rt=0.4)
        l1b = T("met sa chanson en ligne.", 30)
        poser(l1b, -4.45, 1.5)
        notes = VGroup(*[note_musique(0.3).move_to(tel.get_right() + P(0.3 + 0.1 * k, 0.45 - 0.45 * k)) for k in range(2)])
        self.au("met sa", FadeIn(tel, shift=UP * 0.2), FadeIn(l1b, shift=RIGHT * 0.15), rt=0.4)
        self.play(LaggedStart(*[FadeIn(n, shift=RIGHT * 0.25, scale=0.5) for n in notes], lag_ratio=0.4), run_time=0.5)
        l2 = T("Au départ, 5 personnes l'écoutent.", 30)
        poser(l2, X0, -0.8)
        pers = VGroup(*[silhouette(ROSE, 2.3) for _ in range(5)]).arrange(RIGHT, buff=0.1).move_to(P(-2.4, 0.45))
        bars = BarresAuditeurs(1.35, 6.05, -1.6, 3.25)
        jour = T("Jour", 44, EXPO_C, False)
        num = T("1", 44, EXPO_C, False)
        rj = rangee(jour, num, buff=0.18)
        poser(rj, 1.5, 1.1)
        self.poser_mots(l2, [("Au départ", "Au départ"), ("5 personnes", "5 personnes"), ("l'écoutent", "l'écoutent")],
                        avec={1: [LaggedStart(*[FadeIn(s, scale=0.4) for s in pers], lag_ratio=0.2), Create(bars.sol),
                                  GrowFromEdge(bars.barres[0], DOWN)]})
        l3 = T("Puis le nombre d'auditeurs double", 30)
        poser(l3, X0, -1.4)
        l4 = T("chaque jour,", 30)
        poser(l4, X0, -2.0)
        l5 = rangee(T("pendant", 30), T("10 jours.", 30, EXPO_C), buff=0.14)
        poser(l5, X0, -2.6)
        self.poser_mots(l3, [("Puis", "Puis"), ("le nombre", "le nombre"), ("double", "double")])
        self.au("chaque jour", FadeIn(l4, shift=RIGHT * 0.1), FadeIn(rj, scale=0.8), GrowFromEdge(bars.barres[1], DOWN), rt=0.25)
        self.au("pendant", FadeIn(l5[0], shift=RIGHT * 0.1), rt=0.2)
        reste = self.t_mot("10 jours")
        pas_j = max(0.05, reste / 8)
        y0, x0 = num.get_center()[1], num.get_left()[0]
        for d in range(2, 10):
            neuf = T(str(d), 44, EXPO_C, False)
            neuf.shift(RIGHT * (x0 - neuf.get_left()[0]) + UP * (pied(jour) - pied(neuf)))
            num.become(neuf)
            self.play(GrowFromEdge(bars.barres[d], DOWN), run_time=pas_j)
        self.au("10 jours", GrowFromEdge(bars.barres[10], DOWN), FadeIn(l5[1], scale=1.3), rt=0.3)
        neuf = T("10", 44, EXPO_C, False)
        neuf.shift(RIGHT * (x0 - neuf.get_left()[0]) + UP * (pied(jour) - pied(neuf)))
        num.become(neuf)
        self.play(Flash(bars.barres[10].get_top(), color=ROSE, line_length=0.2), run_time=0.4)
        self.attendre_voix(marge=0.4)

    # ── 02q : QUESTION : combien d'auditeurs au bout des 10 jours ? ─────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.add(self.cpt)
        bars = BarresAuditeurs(-5.9, 0.2, -2.0, 3.3)
        qm = T("?", 56, EXPO_C, False).next_to(bars.barres[10], LEFT, buff=0.15).shift(UP * 1.2)
        lj = T("10 jours", 30, EXPO_C, False).next_to(bars.sol, DOWN, buff=0.16).align_to(bars.sol, RIGHT)
        cinq = T("5 au départ", 30, ROSE, False).next_to(bars.sol, DOWN, buff=0.16).align_to(bars.sol, LEFT)
        self.add(bars, lj, cinq)
        choix = [T("100", 40), T("5 120", 40), T("1 024", 40)]
        plans = [[(s, [c])] for s, c in zip(("100.", "5 120.", "1 024.") , choix)]

        def avant(sc, q):
            sc.poser_mots(q[0], [("Combien", "Combien")])
            sc.poser_mots(q[1], [("au bout", "au bout"), ("des 10 jours", "des 10")], avec={1: [FadeIn(qm, scale=1.5)]})

        def apres(sc):
            lg = sans_audit(sc.rep_ligne(0, ["Réponse B :", "5 120."]))
            lg[1].shift(RIGHT * 0.08)
            sc.au("B :", FadeIn(lg[0], shift=UP * 0.12), FadeOut(VGroup(bars, qm, lj, cinq)), rt=0.3)
            sc.au("5 120.", FadeIn(lg[1], scale=1.3), rt=0.3)
            sc.pieges(0, 2)
            cq, x1, p1 = T("5", 80, OR), T("×", 68), puiss(2, 10, fs=80)
            l1 = rangee(cq, x1, p1, buff=0.18)
            poser(l1, -5.4, 1.65)
            sc.au("5 fois", FadeIn(cq, scale=1.3), FadeIn(x1), rt=0.3)
            sc.au("2 puissance", FadeIn(p1.base, scale=1.3), rt=0.3)
            sc.au("10. 2", FadeIn(p1.expo, scale=1.5), rt=0.3)
            p2, e2, v2 = puiss(2, 10, fs=62), T("=", 52), T("1 024", 62)
            l2 = rangee(p2, e2, v2, buff=0.22)
            poser(l2, -5.4, 0.5)
            sc.au("2 puissance", FadeIn(p2.base, scale=1.3), rt=0.3)
            sc.au("10, c'est", FadeIn(p2.expo, scale=1.5), FadeIn(e2), rt=0.3)
            sc.au("1 024.", FadeIn(v2, shift=RIGHT * 0.2), rt=0.35)
            x3, c3, e3, v3 = T("×", 52), T("5", 62, OR), T("=", 52), T("5 120", 62, VERT_OK)
            l3 = rangee(x3, c3, e3, v3, buff=0.22)
            poser(l3, 0, -0.6)
            l3.shift(RIGHT * (e2.get_x() - e3.get_x()))
            sc.au("Fois 5", FadeIn(x3), rt=0.2)
            sc.au("5, 5 120", FadeIn(c3, scale=1.3), FadeIn(e3), rt=0.25)
            sc.au("5 120.", FadeIn(v3, scale=1.2), rt=0.35)
            sc.insister(v3, 1.2, 0.2, about=v3.get_left())
            a1, a2, a3 = T("On ne part pas de 1 :", 36), T("on part de 5,", 36), T("et le 5 reste devant.", 36, OR)
            poser(a1, X0, -1.72)
            poser(a2, X0, -2.42)
            poser(a3, X0, -3.12)
            sc.poser_mots(a1, [("On ne part", "On ne"), ("de 1", "de 1")])
            sc.poser_mots(a2, [("on part", "on part"), ("de 5", "de 5,")])
            sc.poser_mots(a3, [("et le 5", "et le"), ("reste", "reste"), ("devant", "devant")],
                          avec={0: [Indicate(cq, color=OR, scale_factor=1.2)]})
            sc.insister(cq, 1.5, 0.25, about=cq.get_corner(DR))

        self.qpause("02q-question", "02r-reponse", ["Combien d'auditeurs", "au bout des 10 jours ?"], choix, plans, 1,
                    ["Réponse B : 5 120."], avant=avant, apres=apres)

    # ── 03 : l'artiste d'effets spéciaux : le poids du film ─────────────────
    def ecran_film(self):
        self.ecran("03-film")
        self.add(self.cpt)
        self.allumer(3, "3.")
        pic = clap(0.85).move_to(P(-5.6, 2.27))
        l1 = T("Une artiste d'effets spéciaux", 36, CIEL)
        poser(l1, -4.75, 2.33)
        self.au("Une artiste", FadeIn(pic, scale=0.6), FadeIn(l1, shift=RIGHT * 0.15), rt=0.4)
        l1b = T("termine un film d'animation.", 30)
        poser(l1b, -4.75, 1.78)
        pile = pile_images(12, 2.5, 0.085).move_to(P(-3.55, -0.75))
        self.au("termine", FadeIn(l1b, shift=RIGHT * 0.15), rt=0.35)
        self.au("film", LaggedStart(*[FadeIn(im, shift=DOWN * 0.3) for im in pile], lag_ratio=0.5), rt=1.2)
        carte = RoundedRectangle(width=6.1, height=3.25, corner_radius=0.18, fill_color="#0b1220", fill_opacity=1,
                                 stroke_color="#334155", stroke_width=2).move_to(P(3.4, 0.0))
        xc = 0.7
        lab1 = T("Il compte", 30, CIEL)
        poser(lab1, xc, 1.05)
        n1 = nota("1,5", "5", fs=44)
        im1 = T("images.", 44)
        r1 = rangee(n1, im1, buff=0.22)
        poser(r1, xc, 0.3)
        im1.shift(RIGHT * 0)
        lab2 = T("Chaque image pèse", 30, CIEL)
        poser(lab2, xc, -0.42)
        n2 = nota("8", "7", fs=44)
        oc = T("octets.", 44)
        r2 = rangee(n2, oc, buff=0.22)
        poser(r2, xc, -1.17)
        self.au("Il compte", FadeIn(carte), FadeIn(lab1, shift=RIGHT * 0.15), rt=0.35)
        self.au("1,5 fois", FadeIn(n1.m, scale=1.3), FadeIn(n1.x), rt=0.3)
        self.au("10 puissance", FadeIn(n1.p.base, scale=1.3), rt=0.3)
        self.au("5 images", FadeIn(n1.p.expo, scale=1.6), rt=0.25)
        self.au("images", FadeIn(im1, shift=LEFT * 0.1), Indicate(pile[-1], color=OR, scale_factor=1.05), rt=0.3)
        self.au("Chaque image", FadeIn(lab2, shift=RIGHT * 0.15), rt=0.35)
        self.au("8 fois", FadeIn(n2.m, scale=1.3), FadeIn(n2.x), rt=0.3)
        self.au("10 puissance", FadeIn(n2.p.base, scale=1.3), rt=0.3)
        self.au("7 octets", FadeIn(n2.p.expo, scale=1.6), rt=0.25)
        self.au("octets", FadeIn(oc, shift=LEFT * 0.1), rt=0.3)
        q1, q2 = T("Quel est le poids du film,", 30), T("en notation scientifique ?", 30)
        poser(q1, -0.05, -2.12)
        poser(q2, -0.05, -2.6)
        self.au("Quel est", FadeIn(q1, shift=UP * 0.12), rt=0.35)
        self.au("en notation", FadeIn(q2, shift=UP * 0.12), rt=0.35)
        pz = T("Mets pause, et cherche !", 36, ORANGE_RETENUE)
        poser(pz, X0, -3.28)
        rebours = CompteARebours(5, r=0.42).move_to(P(self.BORD_X - 0.5, 3.1))
        self.au("Mets pause", Write(pz), FadeIn(rebours, scale=0.6), rt=0.7)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)

    # ── 03b : correction ───────────────────────────────────────────────────
    def ecran_correction(self):
        self.ecran("03b-correction")
        self.add(self.cpt)
        tit = T("Correction", 46, JAUNE_TITRE).move_to(P(1.2, 3.18))
        self.au("Correction", Write(tit), rt=0.5)
        # les deux calculs
        a1, a2, a3, a4, a5 = T("1,5", 56), T("×", 48), T("8", 56), T("=", 48), T("12", 56, OR)
        la = rangee(a1, a2, a3, a4, a5, buff=0.16)
        poser(la, X0, 2.08)
        b1, b2, b3, b4, b5 = T("5", 56, EXPO_C), T("+", 48, EXPO_C), T("7", 56, EXPO_C), T("=", 48, EXPO_C), T("12", 56, EXPO_C)
        lb = rangee(b1, b2, b3, b4, b5, buff=0.16)
        poser(lb, 0.7, 2.08)
        self.au("1,5 fois", FadeIn(a1, scale=1.3), FadeIn(a2), rt=0.3)
        self.au("8, 12", FadeIn(a3, scale=1.3), FadeIn(a4), rt=0.25)
        self.au("12. 5", FadeIn(a5, scale=1.4), rt=0.3)
        self.au("5 plus", FadeIn(b1, scale=1.3), rt=0.25)
        self.au("plus 7", FadeIn(b2), rt=0.2)
        self.au("7, 12", FadeIn(b3, scale=1.3), rt=0.25)
        self.au("12. Ça", FadeIn(b4), FadeIn(b5, scale=1.4), rt=0.3)
        # 12 × 10¹²
        n = nota("12", "12", fs=70, cm=OR)
        poser(n, X0, 0.88)
        self.au("12 fois", TransformFromCopy(a5, n.m), FadeIn(n.x), rt=0.4)
        self.au("10 puissance", FadeIn(n.p.base, scale=1.3), rt=0.3)
        self.au("12. Mais", TransformFromCopy(b5, n.p.expo), rt=0.4)
        # la carte rouge, et la droite de 1 à 10
        attention = T("Attention !", 36, "#fca5a5")
        c1 = T("12 n'est pas entre 1 et 10 :", 36)
        lc = rangee(attention, c1, buff=0.28)
        poser(lc, X0 + 0.32, -0.12)
        c2 = T("ce n'est pas encore la notation scientifique.", 36)
        poser(c2, X0 + 0.32, -0.76)
        carte = RoundedRectangle(width=VGroup(lc, c2).width + 0.64, height=1.46, corner_radius=0.16, fill_color="#3f0d0d",
                                 fill_opacity=1, stroke_color=PIEGE, stroke_width=4)
        carte.move_to(P(X0 + carte.width / 2, (lc.get_top()[1] + c2.get_bottom()[1]) / 2))
        self.bring_to_front(self.cpt)
        self.au("attention", FadeIn(carte), FadeIn(attention, scale=1.3), rt=0.35)
        xg, xd, yd = 0.9, 4.6, 1.28
        X = lambda v: xg + (xd - xg) * (v - 1) / 9  # noqa: E731
        bande = Line(P(X(1), yd), P(X(10), yd), color=VERT_OK, stroke_width=9)
        lab1 = T("1", 30, VERT_OK, False).next_to(P(X(1), yd), DOWN, buff=0.22)
        lab10 = T("10", 30, VERT_OK, False).next_to(P(X(10), yd), DOWN, buff=0.22)
        t1 = Line(P(X(1), yd - 0.14), P(X(1), yd + 0.14), color=VERT_OK, stroke_width=4)
        t10 = Line(P(X(10), yd - 0.14), P(X(10), yd + 0.14), color=VERT_OK, stroke_width=4)
        p12 = Dot(P(X(12), yd), radius=0.13, color=PIEGE)
        lab12 = T("12", 30, PIEGE, False).next_to(P(X(12), yd), DOWN, buff=0.22)
        self.poser_mots(c1, [("12", "12 n'est"), ("n'est", "n'est"), ("entre", "entre"), ("1", "1 et"), ("et 10", "10 :")],
                        avec={0: [FadeIn(p12, scale=2), FadeIn(lab12), n.m.animate.set_color(PIEGE)],
                              3: [Create(bande), Create(t1), FadeIn(lab1)],
                              4: [Create(t10), FadeIn(lab10)]})
        self.play(Wiggle(p12), run_time=0.4)
        self.poser_mots(c2, [("ce n'est", "ce n'est"), ("la notation", "la notation")])
        # 12 = 1,2 × 10
        d1, d2, d3, d4, d5 = T("12", 56, PIEGE), T("=", 48), T("1,2", 56, VERT_OK), T("×", 48), T("10", 56)
        ld = rangee(d1, d2, d3, d4, d5, buff=0.16)
        poser(ld, X0, -1.86)
        self.au("12, c'est", FadeIn(d1, scale=1.3), rt=0.3)
        self.au("c'est", FadeIn(d2), rt=0.2)
        self.au("1,2 fois", FadeIn(d3, scale=1.3), FadeIn(d4), rt=0.3)
        self.au("10. Le", FadeIn(d5, scale=1.3), rt=0.3)
        pile = pile_images(5, 1.3, 0.06).move_to(P(3.6, -1.72))
        # le résultat
        e1 = T("Le film pèse donc", 42)
        r = nota("1,2", "13", fs=42, cm=VERT_OK)
        e2 = T("octets.", 42)
        lr = rangee(e1, r, e2, buff=0.26)
        poser(lr, X0 + 0.25, -3.12)
        r.p.base.set_color(BASE_C)
        cadre = SurroundingRectangle(lr, color=VERT_OK, buff=0.17, corner_radius=0.12, stroke_width=5)
        self.au("Le film", FadeIn(e1, shift=RIGHT * 0.15), FadeIn(pile, shift=LEFT * 0.2), rt=0.35)
        self.au("1,2 fois", FadeIn(r.m, scale=1.3), FadeIn(r.x), rt=0.3)
        self.au("10 puissance", FadeIn(r.p.base, scale=1.3), rt=0.3)
        self.au("13 octets", FadeIn(r.p.expo, scale=1.6), rt=0.3)
        self.au("octets", FadeIn(e2, shift=LEFT * 0.1), Create(cadre), rt=0.35)
        self.insister(r.p.expo, 1.4, 0.2, about=r.p.expo.get_corner(DL))
        self.attendre_voix(marge=0.5)

    # ── 04 : le serveur et le film ─────────────────────────────────────────
    KB = 9.0 / 12000   # longueur d'une barre pour 1 milliard d'octets
    XB = -5.15

    def rangs(self, ys=(-1.62, -2.86), audit=True):
        """Les deux rangs (film, puis serveur) : .film .serv, chacun avec le dessin,
        la notation, le contour de barre et son « ? » (même longueur : on ne devine rien)."""
        def rang(y, dessin, m, e):
            g = VGroup()
            g.des = dessin.move_to(P(-5.85, y + 0.22))
            g.n = nota(m, e, fs=32, audit=audit)
            poser(g.n, self.XB, y + 0.42)
            g.oct = T("octets", 32, WHITE, audit)
            g.oct.shift(UP * (pied(g.n.m) - pied(g.oct)) + RIGHT * (g.n.get_right()[0] + 0.14 - g.oct.get_left()[0]))
            g.contour = Rectangle(width=9.0, height=0.48, stroke_color=GREY_B, stroke_width=3).move_to(
                P(self.XB + 4.5, y - 0.03))
            g.qm = T("?", 32, EXPO_C, False).move_to(g.contour)
            g.y = y
            g.add(g.des, g.n, g.oct, g.contour, g.qm)
            return g
        return rang(ys[0], pile_images(4, 0.72, 0.04), "1,2", "13"), rang(ys[1], rack(0.55), "9", "12")

    def ecran_serveur(self):
        self.ecran("04-serveur")
        self.add(self.cpt)
        tit = T("Dernière épreuve", 46, JAUNE_TITRE).move_to(P(1.8, 3.18))
        self.au("Dernière", Write(tit), *self.cpt.allumer(4), rt=0.5)
        r4 = self.cpt.ronds[3]
        self.insister(r4, 1.3, 0.15, about=r4.get_center())
        srv = rack(1.25).move_to(P(-5.2, 0.85))
        l1, l2 = T("Le studio possède", 32), T("un serveur de", 32)
        poser(l1, -4.2, 1.45)
        poser(l2, -4.2, 0.93)
        n1 = nota("9", "12", fs=32)
        o1 = T("octets.", 32)
        r1 = rangee(n1, o1, buff=0.18)
        poser(r1, -4.2, 0.41)
        self.au("Le studio", FadeIn(l1, shift=RIGHT * 0.15), rt=0.35)
        self.au("un serveur", FadeIn(l2, shift=RIGHT * 0.15), FadeIn(srv, shift=UP * 0.2), rt=0.4)
        self.au("9 fois", FadeIn(n1.m, scale=1.3), FadeIn(n1.x), rt=0.3)
        self.au("10 puissance", FadeIn(n1.p.base, scale=1.3), rt=0.3)
        self.au("12 octets", FadeIn(n1.p.expo, scale=1.6), rt=0.25)
        self.au("octets", FadeIn(o1, shift=LEFT * 0.1), rt=0.25)
        pile = pile_images(8, 1.5, 0.07).move_to(P(0.98, 0.85))
        l3 = T("Le film de", 32)
        poser(l3, 2.2, 1.45)
        n2 = nota("1,2", "13", fs=32)
        o2 = T("octets", 32)
        r2 = rangee(n2, o2, buff=0.18)
        poser(r2, 2.2, 0.93)
        self.au("Le film", FadeIn(l3, shift=RIGHT * 0.15), FadeIn(pile, shift=DOWN * 0.3), rt=0.4)
        self.au("1,2 fois", FadeIn(n2.m, scale=1.3), FadeIn(n2.x), rt=0.3)
        self.au("10 puissance", FadeIn(n2.p.base, scale=1.3), rt=0.3)
        self.au("13 octets", FadeIn(n2.p.expo, scale=1.6), rt=0.25)
        self.au("octets", FadeIn(o2, shift=LEFT * 0.1), rt=0.25)
        q = T("tient-il dessus ?", 32, EXPO_C)
        poser(q, 2.2, 0.41)
        film, serv = self.rangs(audit=False)
        vides = [film.des, film.contour, film.qm, serv.des, serv.contour, serv.qm]
        self.au("tient-il", FadeIn(q, shift=UP * 0.12), *[FadeIn(m) for m in vides], rt=0.5)
        self.attendre_voix(marge=0.4)

    # ── 04q : QUESTION : le film tient-il ? (les boutons sur toute la largeur) ──
    def _disposer_q(self, question, choix, phrase):
        if not getattr(self, "_q_large", False):
            return super()._disposer_q(question, choix, phrase)
        # (des choix provisoires : le gabarit commun rétrécirait les vrais à 5,4 de large)
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, [Text("a"), Text("b"), Text("c")], phrase)
        tete.move_to(P(1.2, 3.18))
        q.move_to(P(0, 2.58)).align_to(P(X0, 0), LEFT)
        neuves = VGroup(*[self._carte_choix(l, c, 11.4, 30) for l, c in zip("ABC", choix)])
        for c in neuves:
            c[0].stretch_to_fit_height(0.64)
            c[1].move_to(c[0]).align_to(c[0].get_left() + RIGHT * 0.2, LEFT)
        neuves.arrange(DOWN, buff=0.1).move_to(P(-0.3, 1.1))
        pause.move_to(P(0, -0.42)).align_to(P(X0, 0), LEFT)
        ph.move_to(P(0, -0.42)).align_to(P(X0, 0), LEFT)
        self.cartes_q = neuves
        return tete, q, neuves, pause, rebours, ph

    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        self.add(self.cpt)
        film, serv = self.rangs(audit=False)
        self.add(film, serv)

        def corps(*morceaux):
            g = rangee(*[T(s, 28, c) for s, c in morceaux], buff=0.13)
            return g

        choix = [corps(("oui, car", WHITE), ("9", WHITE), ("est plus grand que", WHITE), ("1,2.", WHITE)),
                 corps(("non, car l'exposant", WHITE), ("13", EXPO_C), ("est plus grand que", WHITE), ("12.", EXPO_C)),
                 corps(("oui, tout juste.", WHITE),)]
        plans = [[("oui, car", [choix[0][0]]), ("9 est", [choix[0][1]]), ("est plus", [choix[0][2]]), ("1,2.", [choix[0][3]])],
                 [("non, car", [choix[1][0]]), ("13 est", [choix[1][1]]), ("est plus", [choix[1][2]]), ("12.", [choix[1][3]])],
                 [("oui, tout", [choix[2][0]])]]

        def avant(sc, q):
            sans_audit(q)
            sc.play(FadeIn(q, shift=UP * 0.1), run_time=0.3)

        def apres(sc):
            a = T("Réponse B : non.", 32, VERT_OK)
            b = T("L'exposant décide d'abord :", 32, WHITE)
            c1, c2, c3 = T("13", 32, EXPO_C), T("bat", 32), T("12.", 32, EXPO_C)
            lg = rangee(a, b, c1, c2, c3, buff=0.2)
            poser(lg, X0, -0.54)
            sc.au("B :", FadeIn(a, shift=UP * 0.12), rt=0.3)
            sc.pieges(0, 2)
            sc.au("L'exposant", FadeIn(b, shift=UP * 0.12), rt=0.3)
            sc.au("13 bat", FadeIn(c1, scale=1.3), rt=0.25)
            e13, e12 = film.n.p.expo, serv.n.p.expo
            # l'exposant agrandi pousse « octets » : il ne le mord jamais
            d13, d12 = RIGHT * (e13.width * 0.7 + 0.05), RIGHT * (e12.width * 0.7 + 0.05)
            sc.play(e13.animate.scale(1.7, about_point=e13.get_corner(DL)), film.oct.animate.shift(d13), run_time=0.15)
            sc.au("bat", FadeIn(c2), e13.animate.scale(1 / 1.7, about_point=e13.get_corner(DL)), film.oct.animate.shift(-d13), rt=0.15)
            sc.au("12. En", FadeIn(c3, scale=1.3), e12.animate.scale(1.7, about_point=e12.get_corner(DL)), serv.oct.animate.shift(d12), rt=0.25)
            sc.play(e12.animate.scale(1 / 1.7, about_point=e12.get_corner(DL)), serv.oct.animate.shift(-d12), run_time=0.25)
            ent = T("En entier :", 32, CIEL)
            poser(ent, 0.2, -1.2)
            sc.au("En entier", FadeIn(ent, shift=RIGHT * 0.12), FadeOut(film.qm), FadeOut(serv.qm), rt=0.3)
            bf = Rectangle(width=12000 * self.KB, height=0.48, fill_color=EXPO_C, fill_opacity=0.85, stroke_width=0)
            bf.move_to(film.contour)
            bs = Rectangle(width=9000 * self.KB, height=0.48, fill_color=BASE_C, fill_opacity=0.85, stroke_width=0)
            bs.move_to(serv.contour).align_to(serv.contour, LEFT)
            cs = Rectangle(width=9000 * self.KB, height=0.48, stroke_color=GREY_B, stroke_width=3).move_to(bs)
            f1, f2 = T("12 000 milliards d'octets", 24), T("pour le film", 24)
            s1, s2 = T("9 000 milliards", 24), T("pour le serveur", 24)
            lf = rangee(f1, f2, buff=0.1)
            ls = rangee(s1, s2, buff=0.1)
            poser(lf, self.XB + 0.15, film.contour.get_y() - 0.09)
            poser(ls, self.XB + 0.15, serv.contour.get_y() - 0.09)
            sc.add(bf, film.contour)
            bf.stretch(0.001, 0, about_edge=LEFT)
            sc.au("12 000", bf.animate.stretch(1 / 0.001, 0, about_edge=LEFT), FadeIn(f1, shift=RIGHT * 0.1), rt=0.5)
            sc.au("pour le film", FadeIn(f2, shift=RIGHT * 0.1), rt=0.3)
            sc.au("9 000", GrowFromEdge(bs, LEFT), Transform(serv.contour, cs), FadeIn(s1, shift=RIGHT * 0.1), rt=0.5)
            sc.bring_to_front(s1)
            sc.au("pour le serveur", FadeIn(s2, shift=RIGHT * 0.1), rt=0.3)
            # le film déborde du serveur : ce qui dépasse devient rouge
            xs = bs.get_right()[0]
            trop = Rectangle(width=bf.get_right()[0] - xs, height=0.48, fill_color=PIEGE, fill_opacity=1, stroke_width=0)
            trop.move_to(P((xs + bf.get_right()[0]) / 2, bf.get_y()))
            lim = DashedLine(P(xs, serv.contour.get_top()[1]), P(xs, bf.get_top()[1] + 0.1), color=WHITE, stroke_width=3)
            sc.play(Create(lim), FadeIn(trop), run_time=0.35)
            sc.insister(trop, 1.08, 0.2)

        self._q_large = True
        self.qpause("04q-question", "04r-reponse", ["Le film tient-il dessus ?"], choix, plans, 1,
                    ["Réponse B : non."], avant=avant, apres=apres)
        self._q_large = False

    # ── 05 : ce que tu as appris ───────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("05-finale", 0.5)
        tit = T("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.au("Ce que", Write(tit), rt=0.7)
        fs, xc = 34, X0
        yy = (2.1, 1.52, 0.82, 0.12, -0.46, -1.16)

        def ligne(y, *morceaux, coche=True, x=None):
            g = rangee(*morceaux, buff=0.2)
            xg = xc + 0.62 if x is None else x
            poser(g, xg, y)
            ck = self.coche().move_to(P(xc + 0.22, y + 0.12)) if coche else None
            return g, ck

        # 1 : doubler 6 fois
        a0, a1, a2, p, virg = T("Doubler", fs), T("6 fois,", fs), T("c'est multiplier par", fs), puiss(2, 6, fs=fs * 1.15), T(",", fs)
        g1, ck1 = ligne(yy[0], a0, a1, a2, p)
        virg.next_to(p, RIGHT, buff=0.05)
        virg.shift(UP * (pied(a0) - virg[0].get_top()[1] + virg[0].height * 0.42))
        a3, a4, a5, a6 = T("pas par", fs), T("2", fs, PIEGE), T("×", fs * 0.88, PIEGE), T("6.", fs, PIEGE)
        g1b, _ = ligne(yy[1], a3, a4, a5, a6, coche=False)
        self.au("Doubler", Create(ck1), FadeIn(a0, shift=RIGHT * 0.15), rt=0.3)
        self.au("6 fois", FadeIn(a1, shift=RIGHT * 0.15), rt=0.3)
        self.au("c'est multiplier", FadeIn(a2, shift=RIGHT * 0.15), rt=0.3)
        self.au("2 puissance", FadeIn(p.base, scale=1.3), rt=0.25)
        self.au("6, pas", FadeIn(p.expo, scale=1.5), FadeIn(virg), rt=0.25)
        self.au("pas par", FadeIn(a3, shift=RIGHT * 0.1), rt=0.25)
        self.au("2 fois", FadeIn(a4), FadeIn(a5), rt=0.2)
        self.au("6. Le", FadeIn(a6), rt=0.25)
        # 2 : le nombre de départ
        b1 = T("Le nombre de départ reste devant.", fs)
        g2, ck2 = ligne(yy[2], b1)
        self.au("Le nombre", Create(ck2), FadeIn(b1[:16], shift=RIGHT * 0.15), rt=0.35)
        self.au("reste devant", FadeIn(b1[16:], shift=RIGHT * 0.15), rt=0.35)
        # 3 : la notation scientifique, sur deux lignes
        c1 = T("En notation scientifique,", fs)
        g3, ck3 = ligne(yy[3], c1)
        c2, c3a, c3b, c3c = T("le nombre devant reste entre", fs), T("1", fs, VERT_OK), T("et", fs, VERT_OK), T("10.", fs, VERT_OK)
        g3b, _ = ligne(yy[4], c2, c3a, c3b, c3c, coche=False)
        self.au("En notation", Create(ck3), FadeIn(c1, shift=RIGHT * 0.15), rt=0.35)
        self.au("le nombre devant", FadeIn(c2, shift=RIGHT * 0.15), rt=0.35)
        self.au("1 et", FadeIn(c3a, scale=1.2), rt=0.2)
        self.au("et 10", FadeIn(c3b), rt=0.1)
        self.au("10.", FadeIn(c3c, scale=1.2), rt=0.25)
        # 4 : pour comparer
        d1, d2 = T("Et pour comparer,", fs), T("l'exposant décide d'abord.", fs, EXPO_C)
        g4, ck4 = ligne(yy[5], d1, d2)
        self.au("Et pour", Create(ck4), FadeIn(d1, shift=RIGHT * 0.15), rt=0.35)
        self.au("l'exposant", FadeIn(d2, shift=RIGHT * 0.15), rt=0.35)
        self.insister(d2, 1.1, 0.2, about=d2.get_left())
        # le score
        s1 = T("Alors, combien d'épreuves as-tu réussies ?", 36, JAUNE_TITRE)
        poser(s1, xc, -2.1)
        s2 = T("Écris ton score en commentaire.", 36, VERT_OK)
        poser(s2, xc, -2.85)
        self.cpt.move_to(P(2.9, -2.72))
        self.au("Alors", FadeIn(s1, shift=UP * 0.12), rt=0.35)
        self.au("Écris", FadeIn(s2, shift=UP * 0.12), FadeIn(self.cpt.ronds, scale=0.6), rt=0.4)
        self.insister(s2, 1.08, 0.2, about=s2.get_left())
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_tournoi()
        self.ecran_question1()
        self.ecran_chanson()
        self.ecran_question2()
        self.ecran_film()
        self.ecran_correction()
        self.ecran_serveur()
        self.ecran_question3()
        self.ecran_finale()
        self.page_abonnement("06-abonne")


class PuissanceDefi4e(PuissanceDefiBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "orange"
