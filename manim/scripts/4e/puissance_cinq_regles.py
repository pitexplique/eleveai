# puissance_cinq_regles.py
# EleveAI — Maths 1re ET STMG (résumé commun) — série « Puissances », épisode 13 :
# LES PUISSANCES EN 5 RÈGLES. Paysage 16:9, AVEC VOIX, ceinture JAUNE.
#   PuissanceCinqRegles1re « Maths 1re — EleveAI », PuissanceCinqReglesStmg
#   « Maths STMG — EleveAI » (seule l'identité change).
# Micro couverte : `auto_num_puissances` (automatismes de 1re).
# Fil visuel : une FICHE à gauche qui se remplit règle après règle et reste à
# l'écran ; chaque règle s'énonce en grand au centre, puis va s'y ranger.
# Code couleur : BLEU = la base, ORANGE = l'exposant, VERT = juste, ROUGE = piège.
#
# Décor et métier : ÉNERGIE (Louise, technicienne de maintenance d'éoliennes en
# mer). Centres : nature-ecologie, sciences.
#
# Écrans : garde (00) ; Louise (01) ; règles 1, 2, 3 (02-04) ; QUESTION 3⁸ ÷ 3²
# (04q) ; règles 4, 5 (05-06) ; QUESTION 5⁻² (06q) ; ordre de grandeur (07) ;
# défi (08) et correction (08b) ; ce que tu as appris (09) ; fin (10).
#
# Voix : manim/voix/1re-puissance-cinq-regles.json (validée, débit −6), WAV dans
# public/sons/1re-puissance-cinq-regles/ ; marques :
# puissance_cinq_regles_marques.json (marques_dump.ps1, puis conversion PAR
# PAIRES : les « 2 fois » répétés gardent chacun leur instant ; scripts/cues2marques.py non modifié).
# Outils importés, non modifiés : 6e/prop_commun.py, OutilsNotation / T / puiss /
# notation / pied / ligne_base / sans_audit, fracm / facteurs / barre / eg, ppar.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/puissance_cinq_regles.py PuissanceCinqRegles1re
# python -m manim render -qh --disable_caching manim/scripts/4e/puissance_cinq_regles.py PuissanceCinqRegles1re -o eleveai-maths-premiere-puissance-cinq-regles --media_dir manim/scripts/4e/media-puiss-13-premiere
# python -m manim render -qh --disable_caching manim/scripts/4e/puissance_cinq_regles.py PuissanceCinqReglesStmg -o eleveai-maths-stmg-puissance-cinq-regles --media_dir manim/scripts/4e/media-puiss-13-stmg
# Sorties : manim/sorties/premiere/maths/puissances/13-cinq-regles/eleveai-maths-premiere-puissance-cinq-regles.mp4
#           manim/sorties/stmg/maths/puissances/13-cinq-regles/eleveai-maths-stmg-puissance-cinq-regles.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))  # le dossier du script EN TÊTE

from prop_commun import *  # noqa: E402,F403
from puissance_notation_scientifique import OutilsNotation, T, ligne_base, notation, pied, puiss, sans_audit  # noqa: E402
from puissance_produit_quotient import barre, eg, facteurs, fracm  # noqa: E402
from puissance_enchainer import ppar  # noqa: E402

BASE_C = BLEU_CALCUL
EXPO_C = ORANGE_RETENUE
PIEGE = ROUGE_ERREUR
CIEL = "#93c5fd"
CX = 2.3           # le centre de la zone libre, à droite de la fiche
XG = -1.95          # son bord gauche
XFD, XFT = -6.25, -5.88            # dans la fiche : le numéro, la formule
Y_F = (2.15, 1.25, 0.35, -0.45, -1.3, -2.45)  # les lignes de base de la fiche
FS_F = 34
RANG_DISQUE = (0, 1, 2, 2, 3, 4)   # la règle 3 a deux lignes
OPS = ("=", "×", "÷", "+", "−", ":")


def _bas(m):
    """L'ordonnée de la ligne de base d'un morceau (None : opérateur, fraction)."""
    if hasattr(m, "trait"):
        return None
    if getattr(m, "base", None) is not None:
        return m.base.get_bottom()[1]
    if hasattr(m, "f"):
        return m.f[0].get_bottom()[1]
    if hasattr(m, "m"):
        return m.m.get_bottom()[1]
    if isinstance(m, Text):
        if m.original_text.strip() in OPS:
            return None
        y = pied(m)
        return y if y is not None else m.get_bottom()[1]
    return None


def _ref(m):
    if getattr(m, "base", None) is not None:
        return m.base
    if hasattr(m, "f"):
        return m.f[0]
    if hasattr(m, "m"):
        return m.m
    return m


def ldb(*ms, buff=0.18):
    """Des morceaux côte à côte sur UNE ligne de base : les opérateurs au milieu
    des chiffres, une fraction sur son trait. .refm = le morceau de référence."""
    g = VGroup(*ms).arrange(RIGHT, buff=buff)
    refm = next(m for m in ms if _bas(m) is not None)
    y0 = _bas(refm)
    mid = y0 + _ref(refm).height / 2
    for m in ms:
        b = _bas(m)
        if b is not None:
            m.shift(UP * (y0 - b))
        elif hasattr(m, "trait"):
            m.shift(UP * (mid - m.trait.get_y()))
        else:
            m.set_y(mid)
    g.refm = refm
    return g


def sur_base(g, y, x=None, gauche=None):
    """Pose la ligne g sur la ligne de base y ; x : centrée ; gauche : calée."""
    g.shift(UP * (y - _bas(g.refm)))
    if x is not None:
        g.set_x(x)
    if gauche is not None:
        g.shift(RIGHT * (gauche - g.get_left()[0]))
    return g


def regle(k, fs=FS_F):
    """La ligne k de la fiche (0 : aⁿ ; 1 : a⁰ ; 2 : produit ; 3 : quotient ;
    4 : puissance de puissance ; 5 : exposant négatif). .m = ses morceaux."""
    a = lambda e: puiss("a", e, fs=fs)  # noqa: E731
    op = lambda s: T(s, fs * 0.9, WHITE, audit=False)  # noqa: E731
    if k == 0:
        n = T("n", fs, EXPO_C, audit=False)
        fa = T("facteurs", fs, WHITE, audit=False)
        mots = VGroup(n, fa).arrange(RIGHT, buff=fs * 0.005)
        fa.align_to(n, DOWN)
        mots.m = n
        ms = [a("n"), op("="), mots]
    elif k == 1:
        ms = [a(0), op("="), T("1", fs, VERT_OK, audit=False)]
    elif k == 2:
        ms = [a("m"), op("×"), a("n"), op("="), a("m+n")]
    elif k == 3:
        ms = [a("m"), op("÷"), a("n"), op("="), a("m−n")]
    elif k == 4:
        ms = [ppar("a", "m", "n", fs=fs), op("="), a("m×n")]
    else:
        ms = [a("−n"), op("="), fracm(T("1", fs, WHITE, audit=False), a("n"))]
    g = ldb(*ms, buff=fs * 0.0045)
    for f in g.get_family():
        f.sans_synchro = True
    g.ms = ms
    return g


def calculette(s=1.0, barree=True):
    """Une calculatrice ; barrée en rouge."""
    corps = RoundedRectangle(width=1.0, height=1.45, corner_radius=0.1, fill_color="#334155", fill_opacity=1,
                             stroke_color="#94a3b8", stroke_width=2)
    ecran_c = Rectangle(width=0.78, height=0.3, fill_color="#bbf7d0", fill_opacity=1, stroke_width=0)
    ecran_c.move_to(corps.get_top() + DOWN * 0.27)
    touches = VGroup(*[RoundedRectangle(width=0.17, height=0.15, corner_radius=0.03, fill_color="#cbd5e1",
                                        fill_opacity=1, stroke_width=0).move_to(P(-0.26 + 0.26 * c, 0.03 - 0.25 * r))
                       for r in range(3) for c in range(3)])
    g = VGroup(corps, ecran_c, touches)
    if barree:
        g.trait = Line(corps.get_corner(DL) + P(-0.1, -0.1), corps.get_corner(UR) + P(0.1, 0.1), color=PIEGE,
                       stroke_width=9)
        g.add(g.trait)
    return g.scale(s)


def eolienne(h=3.2, r=1.25, large=1.0):
    """Une éolienne : le mât, la nacelle, trois pales (.pales) autour du moyeu."""
    mat = Polygon(P(-0.09 * r * large, 0), P(0.09 * r * large, 0), P(0.04 * r * large, h), P(-0.04 * r * large, h), fill_color="#e2e8f0",
                  fill_opacity=1, stroke_width=0)
    moyeu = Circle(radius=0.08 * r * large, fill_color="#94a3b8", fill_opacity=1, stroke_color=WHITE, stroke_width=1)
    moyeu.move_to(P(0, h))
    pales = VGroup()
    for k in range(3):
        pale = Polygon(P(0, h), P(0.08 * r * large, h + 0.2 * r), P(0.02 * r * large, h + r), P(-0.03 * r * large, h + 0.2 * r),
                       fill_color=WHITE, fill_opacity=1, stroke_width=0)
        pales.add(pale.rotate(k * TAU / 3 + 0.3, about_point=P(0, h)))
    g = VGroup(mat, pales, moyeu)
    g.pales, g.moyeu = pales, moyeu
    return g


def tourner(e, w=1.5):
    """Les pales de e TOURNENT, autour de leur moyeu."""
    e.pales.add_updater(lambda m, dt: m.rotate(-w * dt, about_point=e.moyeu.get_center()))


def louise(s=1.0):
    """Louise : combinaison orange, casque jaune."""
    p = personne(peau="#c68642", tenue="#ea580c", cheveux="#3f2a14", longs=True, s=s)
    t = p.tete
    r = t.width / 2
    casque = AnnularSector(inner_radius=0, outer_radius=r * 1.12, angle=PI, start_angle=0, fill_color="#facc15",
                           fill_opacity=1, stroke_width=0).move_to(t.get_top() + DOWN * r * 0.12)
    bord = RoundedRectangle(width=r * 2.6, height=r * 0.16, corner_radius=r * 0.06, fill_color="#eab308",
                            fill_opacity=1, stroke_width=0).move_to(casque.get_bottom())
    bande = Rectangle(width=p.corps.width * 0.72, height=r * 0.22, fill_color="#fef08a", fill_opacity=1,
                      stroke_width=0).move_to(p.corps.get_center())
    p.add(bande, casque, bord)
    return p


def bateau(s=1.0):
    coque = Polygon(P(-1.0, 0.0), P(1.0, 0.0), P(0.75, -0.42), P(-0.75, -0.42), fill_color="#1d4ed8",
                    fill_opacity=1, stroke_width=0)
    bande = Rectangle(width=2.0, height=0.08, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(0, -0.02))
    return VGroup(coque, bande).scale(s)


def mer(x0, x1, y0, y1):
    fond = Rectangle(width=x1 - x0, height=y1 - y0, fill_color="#0c4a6e", fill_opacity=1, stroke_width=0)
    fond.move_to(P((x0 + x1) / 2, (y0 + y1) / 2))
    n = int((x1 - x0) / 0.55)
    vagues = VGroup(*[Arc(radius=0.18, start_angle=PI * 0.15, angle=PI * 0.7, color="#7dd3fc", stroke_width=2)
                      .move_to(P(x0 + 0.3 + 0.55 * k + (0.25 if r else 0), y1 - 0.22 - 0.3 * r))
                      for r in range(2) for k in range(n - (1 if r else 0))])
    return VGroup(fond, vagues)


class PuissanceCinqReglesBase(OutilsNotation, PaysageProp):
    nom_voix = "1re-puissance-cinq-regles"
    fichier_marques = "puissance_cinq_regles_marques.json"
    identite = "Maths 1re — EleveAI"
    ceinture = "jaune"

    FS_REP = 26  # UNE seule taille pour toute l'explication des questions-pauses

    # ── la FICHE (la colonne de gauche) ─────────────────────────────────────
    def construire_fiche(self):
        carte = RoundedRectangle(width=4.5, height=6.95, corner_radius=0.16, fill_color="#0b1220", fill_opacity=1,
                                 stroke_color="#334155", stroke_width=2).move_to(P(-4.37, 0.0))
        tit = T("Les 5 règles", 32, JAUNE_TITRE, audit=False).move_to(P(-4.37, 3.03))
        disques = VGroup()
        for d, y in enumerate((Y_F[0], Y_F[1], (Y_F[2] + Y_F[3]) / 2, Y_F[4], Y_F[5])):
            c = Circle(radius=0.2, fill_color="#1e293b", fill_opacity=1, stroke_color="#64748b", stroke_width=2)
            n = T(str(d + 1), 22, GREY_B, audit=False).move_to(c)
            disques.add(VGroup(c, n).move_to(P(XFD, y + 0.13)))
        self.fi = VGroup(carte, tit, disques)
        self.fi.carte, self.fi.tit, self.fi.disques = carte, tit, disques
        self.fi_l = {}
        return self.fi

    def cible(self, k):
        c = sans_audit(regle(k, FS_F))
        return sur_base(c, Y_F[k], gauche=XFT)

    def ranger(self, k, grande, rt=0.6, avec=()):
        """La règle (grande, au centre) va se ranger dans la fiche."""
        c = self.cible(k)
        d = self.fi.disques[RANG_DISQUE[k]]
        self.play(ReplacementTransform(grande, c), d[0].animate.set_stroke(VERT_OK, width=3),
                  d[1].animate.set_color(WHITE), *avec, run_time=rt)
        self.fi_l[k] = c

    def vider_centre(self, rt=0.25):
        """Efface tout sauf la fiche et Ti-Margo."""
        garder = [self.margo, self.fi, *self.fi_l.values()]
        reste = [m for m in self.mobjects if not any(m is g for g in garder)]
        for m in reste:
            for f in m.get_family():
                f.clear_updaters()
        if reste:
            self.play(FadeOut(Group(*reste)), run_time=rt)

    def nu(self, scale=0.5):
        """Écran vide : Ti-Margo seule (questions-pauses, écran final)."""
        self.clear()
        self.margo = self.add_mascotte(scale=scale)

    def remettre_fiche(self):
        self.nu()
        self.play(FadeIn(self.fi), *[FadeIn(m) for m in self.fi_l.values()], run_time=0.3)

    def allumer(self, k, rt=0.3):
        """La ligne k de la fiche s'allume : un cadre jaune, qui remplace le
        précédent, et son numéro."""
        c = self.fi_l[k]
        cad = SurroundingRectangle(c, color=JAUNE_TITRE, buff=0.09, corner_radius=0.08, stroke_width=4)
        cad.stretch_to_fit_width(3.72).set_x(-4.11)
        ancien = getattr(self, "cad_fi", None)
        an = [FadeOut(ancien)] if ancien is not None else []
        self.play(Create(cad), *an, Indicate(self.fi.disques[RANG_DISQUE[k]], color=JAUNE_TITRE, scale_factor=1.3),
                  run_time=rt)
        self.cad_fi = cad
        return cad

    def tete(self, n, y=3.12):
        """« Règle n », en haut du centre, chaque mot à sa voix."""
        w, c = T("Règle", 44, JAUNE_TITRE), T(str(n), 44, JAUNE_TITRE)
        g = VGroup(w, c).arrange(RIGHT, buff=0.2).move_to(P(CX, y))
        c.shift(UP * (pied(w) - c.get_bottom()[1]))
        self.au("Règle", FadeIn(w, shift=DOWN * 0.15), rt=0.3)
        self.au(f"{n}.", FadeIn(c, scale=1.5), rt=0.25)
        return g

    def poser_idx(self, t, plan, rt=0.2, avec=None):
        """Un Text écrit MORCEAU PAR MORCEAU : plan = [(indice du 1er caractère
        du morceau, extrait de la voix)]."""
        s = t.original_text
        bornes = [a for a, _ in plan] + [len(s)]
        k, pieces = 0, []
        for a, b in zip(bornes[:-1], bornes[1:]):
            n = sum(1 for c in s[a:b] if not c.isspace())
            pieces.append(VGroup(*t.submobjects[k:k + n]))
            k += n
        for j, ((_, ex), pc) in enumerate(zip(plan, pieces)):
            self.au(ex, FadeIn(pc, shift=UP * 0.1), *((avec or {}).get(j, [])), rt=rt)
        return pieces

    # ── outils des questions : lignes de la réponse sur des lignes de base fixes
    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.next_to(q, DOWN, buff=0.28).align_to(P(self.XL, 0), LEFT)
        pause.become(T("Mets pause, et choisis !", 34, ORANGE_RETENUE, audit=False))  # col() l'avait réduite
        pause.next_to(cartes, DOWN, buff=0.28).align_to(P(self.XL, 0), LEFT)
        self.y_rep = cartes.get_bottom()[1] - 0.55
        return tete, q, cartes, pause, rebours, ph

    def y_ligne(self, i):
        return self.y_rep - 0.52 * i

    def rep_ligne(self, i, morceaux):
        """La ligne i de la réponse : morceaux posés au mot, TOUJOURS à FS_REP."""
        lg = ligne_base(VGroup(*[T(m, self.FS_REP, VERT_OK) for m in morceaux]).arrange(RIGHT, buff=0.14))
        lg.shift(UP * (self.y_ligne(i) - pied(lg[0])))
        lg.shift(RIGHT * (self.XL - lg.get_left()[0]))
        lim = 5.2 if lg.get_bottom()[1] < -1.8 else 6.6
        if lg.get_right()[0] > lim:
            print(f"LARGE réponse {morceaux} : {lg.get_right()[0]:.2f}", flush=True)
        return lg

    def rep_puiss(self, i, prefixe, b, e):
        """La ligne i : « Réponse B : » + bᵉ COMPOSÉ, à la même taille, en vert."""
        pre = T(prefixe, self.FS_REP, VERT_OK)
        p = puiss(b, e, fs=self.FS_REP, cb=VERT_OK, ce=VERT_OK)
        pt = T(".", self.FS_REP, VERT_OK)
        VGroup(pre, p).arrange(RIGHT, buff=0.15)
        p.shift(UP * (pied(pre) - p.base.get_bottom()[1]))
        pt.next_to(p.expo, RIGHT, buff=0.04)
        pt.shift(UP * (pied(pre) - pt.get_bottom()[1]))
        lg = VGroup(pre, p, pt)
        lg.shift(UP * (self.y_ligne(i) - pied(pre)))
        lg.shift(RIGHT * (self.XL - lg.get_left()[0]))
        lg.pre, lg.p, lg.pt = pre, p, pt
        return lg

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.margo = self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Les puissances en 5 règles", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        sans_audit(ident)  # « Maths 1re » : l'identité, jamais dite
        sans_audit(titre)
        s = titre.original_text
        # le titre, morceau par morceau : le « 5 » au mot
        self.poser_idx(titre, [(0, "Les puissances"), (s.find("en"), "en 5"), (s.find("5"), "5 règles"),
                               (s.find("règles"), "règles")], rt=0.2,
                       avec={0: [FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech)]})
        rond = VGroup()
        for k in range(5):
            c = Circle(radius=0.36, fill_color="#1e293b", fill_opacity=1, stroke_color=CIEL, stroke_width=3)
            rond.add(VGroup(c, T(str(k + 1), 34, WHITE, audit=False).move_to(c)))
        rond.arrange(RIGHT, buff=0.3).move_to(P(-0.0, 0.85))
        self.play(LaggedStart(*[FadeIn(r, scale=0.5) for r in rond], lag_ratio=0.25), run_time=0.8)
        q1 = T("Tu peux les retenir,", 42).move_to(P(-2.1, -0.45)).align_to(P(-5.2, 0), LEFT)
        q2 = T("sans calculatrice ?", 42, EXPO_C).move_to(P(-2.1, -1.15)).align_to(P(-5.2, 0), LEFT)
        ca = calculette(1.0, barree=False).move_to(P(2.6, -0.85))
        self.au("Tu peux", FadeIn(q1, shift=UP * 0.15), rt=0.35)
        self.au("sans", FadeIn(q2, shift=UP * 0.15), FadeIn(ca, scale=0.7), rt=0.4)
        tr = Line(ca.get_corner(DL) + P(-0.12, -0.12), ca.get_corner(UR) + P(0.12, 0.12), color=PIEGE, stroke_width=10)
        self.play(Create(tr), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 01 : Louise, ses éoliennes ─────────────────────────────────────────
    def ecran_eolienne(self):
        self.nu()
        self.dire("01-eolienne")
        m = mer(-6.6, -0.35, -3.5, -2.2)
        e = eolienne(h=3.65, r=1.55).shift(P(-4.3, -2.3))
        met = VGroup(T("Louise,", 42, JAUNE_TITRE), T("technicienne de maintenance", 30, CIEL),
                     T("d'éoliennes en mer", 30, CIEL)).arrange(DOWN, aligned_edge=LEFT, buff=0.16)
        met.move_to(P(0, 2.45)).align_to(P(0.15, 0), LEFT)
        b = bateau(0.75).move_to(P(-1.55, -2.1))
        lo = louise(0.5).next_to(b, UP, buff=-0.02)
        self.au("Louise", FadeIn(met[0], shift=RIGHT * 0.15), FadeIn(m), FadeIn(b, shift=RIGHT * 0.3),
                FadeIn(lo, shift=RIGHT * 0.3), rt=0.4)
        self.au("éoliennes", FadeIn(met[2], shift=RIGHT * 0.15), FadeIn(e, shift=UP * 0.3), rt=0.4)
        tourner(e)
        self.au("technicienne", FadeIn(met[1], shift=RIGHT * 0.15), rt=0.35)
        ca = calculette(0.72).move_to(P(0.75, 0.62))
        l1 = VGroup(T("Là-haut,", 36), T("pas de calculatrice", 36, PIEGE)).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        l1.next_to(ca, RIGHT, buff=0.3)
        self.au("Là-haut", FadeIn(l1[0], shift=RIGHT * 0.15), rt=0.3)
        self.au("pas de", FadeIn(l1[1], shift=RIGHT * 0.15), FadeIn(VGroup(*ca[:3]), scale=0.7), rt=0.35)
        self.play(Create(ca.trait), run_time=0.25)
        l2 = T("Il faut estimer vite.", 33).move_to(P(0, -0.35)).align_to(P(0.15, 0), LEFT)
        self.au("il faut", FadeIn(l2, shift=RIGHT * 0.15), rt=0.35)
        l3 = T("Cinq règles lui suffisent.", 33, VERT_OK).move_to(P(0, -1.05)).align_to(P(0.15, 0), LEFT)
        self.au("Cinq", FadeIn(l3, shift=RIGHT * 0.15), rt=0.35)
        l4 = VGroup(T("Les mêmes te servent", 33), T("en automatismes.", 33, JAUNE_TITRE)).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        l4.move_to(P(0, -2.1)).align_to(P(0.15, 0), LEFT)
        self.au("mêmes", FadeIn(l4[0], shift=RIGHT * 0.15), rt=0.35)
        self.au("en automatismes", FadeIn(l4[1], shift=RIGHT * 0.15), rt=0.35)
        self.attendre_voix(marge=0.3)
        e.pales.clear_updaters()

    # ── 02 : règle 1 : aⁿ = n facteurs ─────────────────────────────────────
    def ecran_regle1(self):
        self.construire_fiche()
        self.nu()
        self.play(FadeIn(self.fi, shift=RIGHT * 0.2), run_time=0.35)
        self.dire("02-regle1")
        self.tete(1)
        r = regle(0, 62)
        sur_base(r, 1.8, x=CX)
        a, e, m = r.ms
        self.au("a puissance", FadeIn(a.base, scale=1.3), rt=0.3)
        self.au("n,", FadeIn(a.expo, scale=1.6), rt=0.25)
        self.au("c'est", FadeIn(e), rt=0.2)
        self.au("n facteurs", FadeIn(m[0], scale=1.4), rt=0.15)
        self.au("facteurs", FadeIn(m[1], shift=RIGHT * 0.15), rt=0.25)
        p, fa = puiss(2, 5, fs=54), facteurs(5, 2, fs=54)
        e1, e2 = eg(46), eg(46)
        n32 = T("32", 58, VERT_OK)
        l = sur_base(ldb(p, e1, fa, e2, n32, buff=0.2), 0.25, x=CX)
        self.au("2 puissance", FadeIn(p.base, scale=1.3), rt=0.2)
        self.au("5 :", FadeIn(p.expo, scale=1.6), FadeIn(e1), rt=0.25)
        cpt = VGroup(*[T(str(k + 1), 28, EXPO_C, audit=False).next_to(f, DOWN, buff=0.2) for k, f in enumerate(fa.f)])
        for k in range(5):
            self.au("2 fois" if k < 4 else "2,", FadeIn(fa.f[k], scale=1.4), FadeIn(cpt[k], shift=UP * 0.1), rt=0.15)
            if k < 4:
                self.au("fois", FadeIn(fa.x[k]), rt=0.12)
        self.au("32.", FadeIn(e2), FadeIn(n32, scale=1.5), Indicate(p.expo, color=EXPO_C, scale_factor=1.5), rt=0.3)
        self.insister(n32, 1.35, 0.2)
        pas = T("Pas", 58)
        fx = T("2 × 5", 58, PIEGE)
        sur_base(ldb(pas, fx, buff=0.3), -1.75, x=CX)
        self.au("Pas", FadeIn(pas, shift=RIGHT * 0.15), rt=0.2)
        self.poser_idx(fx, [(0, "2 fois"), (2, "fois"), (4, "5.")], rt=0.15)
        self.play(Create(barre(fx, WHITE, 7)), run_time=0.25)
        self.attendre_voix(marge=0.15)
        self.ranger(0, r)

    # ── 03 : règle 2 : a⁰ = 1 ──────────────────────────────────────────────
    def ecran_regle2(self):
        self.vider_centre()
        self.dire("03-regle2")
        self.tete(2)
        t1, t2 = T("Tout nombre", 40), T("non nul", 40, EXPO_C)
        l0 = ligne_base(VGroup(t1, t2).arrange(RIGHT, buff=0.22)).move_to(P(CX, 2.3))
        r = regle(1, 68)
        sur_base(r, 0.95, x=CX)
        a, e, un = r.ms
        self.au("Tout nombre", FadeIn(t1, shift=RIGHT * 0.15), FadeIn(a.base, scale=1.3), rt=0.3)
        self.au("non nul", FadeIn(t2, scale=1.25), rt=0.25)
        self.au("0,", FadeIn(a.expo, scale=1.8), rt=0.3)
        self.au("égale", FadeIn(e), rt=0.2)
        self.au("1.", FadeIn(un, scale=1.5), rt=0.3)
        self.insister(r, 1.2, 0.2)
        X_EG = 1.45

        def exemple(b, y):
            p, q, u = puiss(b, 0, fs=60), eg(50), T("1", 60, VERT_OK)
            g = sur_base(ldb(p, q, u, buff=0.25), y)
            g.shift(RIGHT * (X_EG - q.get_x()))
            return p, q, u

        p7, q7, u7 = exemple(7, -0.5)
        self.au("7 puissance", FadeIn(p7.base, scale=1.3), rt=0.25)
        self.au("0 :", FadeIn(p7.expo, scale=1.6), FadeIn(q7), rt=0.25)
        self.au("1.", FadeIn(u7, scale=1.5), rt=0.25)
        p2, q2, u2 = exemple(2026, -1.75)
        self.au("2026", FadeIn(p2.base, scale=1.2), rt=0.3)
        self.au("0 :", FadeIn(p2.expo, scale=1.6), FadeIn(q2), rt=0.25)
        self.au("1.", FadeIn(u2, scale=1.5), rt=0.25)
        pas, z = T("Pas", 60), T("0", 60, PIEGE)
        sur_base(ldb(pas, z, buff=0.28), -1.1, x=4.6)
        self.au("Pas", FadeIn(pas, shift=RIGHT * 0.15), rt=0.15)
        self.au("0.", FadeIn(z, scale=1.3), rt=0.15)
        self.play(Create(barre(z, WHITE, 7)), run_time=0.25)
        self.attendre_voix(marge=0.15)
        self.ranger(1, r)

    # ── 04 : règle 3 : produit, quotient ───────────────────────────────────
    def ecran_regle3(self):
        self.vider_centre()
        self.dire("04-regle3")
        self.tete(3)
        h1, h2 = T("Produit de même base :", 30), T("on additionne", 30, EXPO_C)
        ligne_base(VGroup(h1, h2).arrange(RIGHT, buff=0.2)).move_to(P(CX, 2.45))
        r = regle(2, 46)
        sur_base(r, 1.5, x=CX)
        self.au("produit", FadeIn(h1, shift=RIGHT * 0.15), rt=0.3)
        self.au("on additionne", FadeIn(h2, scale=1.2), FadeIn(r, scale=1.15), rt=0.35)
        p1, x, p2, e, p3 = puiss(2, 3, fs=56), T("×", 46, audit=False), puiss(2, 4, fs=56), eg(46), puiss(2, 7, fs=56)
        sur_base(ldb(p1, x, p2, e, p3, buff=0.2), 0.45, x=CX)
        self.au("2 puissance", FadeIn(p1.base, scale=1.3), rt=0.25)
        self.au("3 fois", FadeIn(p1.expo, scale=1.6), rt=0.25)
        self.au("fois", FadeIn(x), rt=0.15)
        self.au("2 puissance", FadeIn(p2.base, scale=1.3), rt=0.15)
        self.au("4 :", FadeIn(p2.expo, scale=1.6), rt=0.25)
        self.au("2 puissance", FadeIn(e), FadeIn(p3.base, scale=1.3), rt=0.15)
        self.au("7.", ReplacementTransform(VGroup(p1.expo.copy(), p2.expo.copy()), p3.expo), rt=0.4)
        self.insister(p3.expo, 1.5, 0.18, about=p3.expo.get_corner(DL))
        self.ranger(2, r, rt=0.5)
        h3, h4 = T("Quotient :", 30), T("on soustrait", 30, EXPO_C)
        ligne_base(VGroup(h3, h4).arrange(RIGHT, buff=0.2)).move_to(P(CX, -0.4))
        r2 = regle(3, 46)
        sur_base(r2, -1.3, x=CX)
        self.au("quotient", FadeIn(h3, shift=RIGHT * 0.15), rt=0.3)
        self.au("on soustrait", FadeIn(h4, scale=1.2), FadeIn(r2, scale=1.15), rt=0.35)
        q1, d, q2, e2, q3 = puiss(5, 6, fs=56), T("÷", 46, audit=False), puiss(5, 2, fs=56), eg(46), puiss(5, 4, fs=56)
        sur_base(ldb(q1, d, q2, e2, q3, buff=0.2), -2.65, x=CX - 0.4)
        self.au("5 puissance", FadeIn(q1.base, scale=1.3), rt=0.25)
        self.au("6 divisé", FadeIn(q1.expo, scale=1.6), rt=0.25)
        self.au("divisé", FadeIn(d), rt=0.2)
        self.au("5 puissance", FadeIn(q2.base, scale=1.3), rt=0.25)
        self.au("2 :", FadeIn(q2.expo, scale=1.6), rt=0.2)
        self.au("5 puissance", FadeIn(e2), FadeIn(q3.base, scale=1.3), rt=0.2)
        self.au("4.", ReplacementTransform(VGroup(q1.expo.copy(), q2.expo.copy()), q3.expo), rt=0.35)
        self.insister(q3.expo, 1.5, 0.18, about=q3.expo.get_corner(DL))
        self.attendre_voix(marge=0.15)
        self.ranger(3, r2)

    # ── 04q : QUESTION 1 (3⁸ ÷ 3²) ──────────────────────────────────────────
    def ecran_question1(self):
        self.nu()
        p8, d, p2, e = puiss(3, 8, fs=84), T("÷", 64, audit=False), puiss(3, 2, fs=84), eg(64)
        qm = T("?", 84, EXPO_C, audit=False)
        sur_base(ldb(p8, d, p2, e, qm, buff=0.26), 0.9)
        VGroup(p8, d, p2, e, qm).set_x(-3.45)
        bon = puiss(3, 6, fs=84, cb=VERT_OK, ce=VERT_OK)
        bon.shift(UP * (p8.base.get_bottom()[1] - bon.base.get_bottom()[1]))
        bon.shift(RIGHT * (e.get_right()[0] + 0.26 - bon.get_left()[0]))
        sous = T("8 − 2 = 6", 60, EXPO_C, audit=False).move_to(P(-3.45, -0.75))
        faux = T("8 ÷ 2", 60, PIEGE, audit=False).move_to(P(-3.45, -2.1))
        choix = [puiss(3, 4, fs=44), puiss(3, 6, fs=44), puiss(1, 6, fs=44)]
        plans = [[("3 puissance", [choix[0].base]), ("4.", [choix[0].expo])],
                 [("3 puissance", [choix[1].base]), ("6.", [choix[1].expo])],
                 [("1 puissance", [choix[2].base]), ("6.", [choix[2].expo])]]

        def avant(sc, q):
            sc.poser_idx(q[0], [(0, "3 puissance"), (1, "8 divisé"), (3, "divisé"), (5, "3 puissance"), (6, "2 ?")],
                         avec={0: [FadeIn(p8.base, scale=1.3)], 1: [FadeIn(p8.expo, scale=1.6)], 2: [FadeIn(d)],
                               3: [FadeIn(p2.base, scale=1.3)], 4: [FadeIn(p2.expo, scale=1.6), FadeIn(e), FadeIn(qm)]})

        def apres(sc):
            lg = sc.rep_puiss(0, "Réponse B :", 3, 6)
            sc.au("B :", FadeIn(lg.pre, shift=UP * 0.1), rt=0.2)
            sc.au("3 puissance", FadeIn(lg.p.base, shift=UP * 0.1), FadeOut(qm), FadeIn(bon.base, scale=1.3), rt=0.25)
            sc.au("6.", FadeIn(lg.p.expo, lg.pt, shift=UP * 0.1), FadeIn(bon.expo, scale=1.6), rt=0.25)
            sc.pieges(0, 2)
            l1 = sc.rep_ligne(1, ["On soustrait :", "8 −", "2 =", "6."])
            sc.au("On soustrait", FadeIn(l1[0], shift=UP * 0.1), rt=0.25)
            pcs = sc.poser_idx(sous, [(0, "8 moins"), (2, "moins"), (4, "2,"), (6, "6.")], rt=0.15,
                               avec={0: [FadeIn(l1[1], shift=UP * 0.1)], 2: [FadeIn(l1[2], shift=UP * 0.1)],
                                     3: [FadeIn(l1[3], shift=UP * 0.1)]})
            l2, l3 = sc.rep_ligne(2, ["On ne divise pas"]), sc.rep_ligne(3, ["les exposants."])
            sc.au("On ne", FadeIn(l2, shift=UP * 0.1), FadeIn(faux, shift=UP * 0.1), rt=0.25)
            sc.play(Create(barre(faux, WHITE, 7)), run_time=0.2)
            sc.au("les exposants", FadeIn(l3, shift=UP * 0.1), rt=0.25)

        self.qpause("04q-question", "04r-reponse", ["3⁸ ÷ 3² ?"], choix, plans, 1,
                    ["Réponse B : 3⁶.", "On soustrait : 8 − 2 = 6.", "On ne divise pas", "les exposants."],
                    avant=avant, apres=apres)

    # ── 05 : règle 4 : (aᵐ)ⁿ = aᵐˣⁿ ────────────────────────────────────────
    def ecran_regle4(self):
        self.remettre_fiche()
        self.dire("05-regle4")
        self.tete(4)
        h1, h2 = T("Puissance de puissance :", 30), T("on multiplie", 30, EXPO_C)
        ligne_base(VGroup(h1, h2).arrange(RIGHT, buff=0.2)).move_to(P(CX, 2.4))
        r = regle(4, 62)
        sur_base(r, 1.25, x=CX)
        self.au("puissance de", FadeIn(h1, shift=RIGHT * 0.15), rt=0.3)
        self.au("on multiplie", FadeIn(h2, scale=1.2), FadeIn(r, scale=1.15), rt=0.35)
        a = ppar(2, 3, 4, fs=66)
        e, res = eg(52), puiss(2, 12, fs=66)
        sur_base(ldb(a, e, res, buff=0.25), -0.35, gauche=XG + 0.1)
        self.au("2 puissance", FadeIn(a.lp), FadeIn(a.p.base, scale=1.3), rt=0.25)
        self.au("3,", FadeIn(a.p.expo, scale=1.6), rt=0.25)
        self.au("le tout", FadeIn(a.rp, scale=1.3), rt=0.25)
        self.au("4 :", FadeIn(a.out, scale=1.8), rt=0.25)
        calc = T("3 × 4 = 12", 54, EXPO_C, audit=False).move_to(P(0, -1.75)).align_to(P(XG + 0.1, 0), LEFT)
        # le dessin : 4 paquets de 3 facteurs, 12 jetons
        jetons = VGroup()
        for r_ in range(4):
            for c_ in range(3):
                d = Circle(radius=0.2, fill_color=BASE_C, fill_opacity=0.9, stroke_width=0)
                jetons.add(VGroup(d, T("2", 22, WHITE, audit=False).move_to(d)).move_to(P(3.85 + 0.5 * c_, 0.1 - 0.52 * r_)))
        rangs = VGroup(*[RoundedRectangle(width=1.56, height=0.48, corner_radius=0.1, stroke_color=EXPO_C,
                                          stroke_width=2).move_to(P(4.35, 0.1 - 0.52 * r_)) for r_ in range(4)])
        pcs = self.poser_idx(calc, [(0, "3 fois"), (2, "fois"), (4, "4,"), (6, "12.")], rt=0.2,
                             avec={0: [Indicate(a.p.expo, color=EXPO_C, scale_factor=1.5),
                                       LaggedStart(*[FadeIn(j, scale=0.5) for j in jetons[:3]], lag_ratio=0.2)],
                                   2: [Indicate(a.out, color=EXPO_C, scale_factor=1.5),
                                       LaggedStart(*[FadeIn(j, scale=0.5) for j in jetons[3:]], lag_ratio=0.05),
                                       FadeIn(rangs)]})
        self.play(pcs[3].animate.set_color(VERT_OK), run_time=0.12)
        self.au("2 puissance", FadeIn(e), FadeIn(res.base, scale=1.3), rt=0.25)
        self.au("12.", ReplacementTransform(pcs[3].copy(), res.expo), rt=0.4)
        self.insister(res.expo, 1.4, 0.18, about=res.expo.get_corner(DL))
        self.attendre_voix(marge=0.15)
        self.ranger(4, r)

    # ── 06 : règle 5 : a⁻ⁿ = 1/aⁿ ──────────────────────────────────────────
    def ecran_regle5(self):
        self.vider_centre()
        self.dire("06-regle5")
        self.tete(5)
        h1, h2 = T("Exposant négatif :", 34), T("l'inverse", 34, VERT_OK)
        ligne_base(VGroup(h1, h2).arrange(RIGHT, buff=0.2)).move_to(P(CX, 2.42))
        self.au("Un exposant", FadeIn(h1, shift=RIGHT * 0.15), rt=0.3)
        self.au("l'inverse", FadeIn(h2, scale=1.2), rt=0.3)
        r = regle(5, 54)
        sur_base(r, 1.1, x=CX)
        pa, e, f = r.ms
        self.au("a puissance", FadeIn(pa.base, scale=1.3), rt=0.2)
        self.au("moins n", FadeIn(pa.moins, scale=1.6), FadeIn(pa.chif, scale=1.6), rt=0.25)
        self.au("égale", FadeIn(e), rt=0.2)
        self.au("1 sur", FadeIn(f.num, scale=1.3), Create(f.trait), rt=0.2)
        self.au("a puissance", FadeIn(f.den.base, scale=1.3), rt=0.2)
        self.au("n.", FadeIn(f.den.expo, scale=1.6), rt=0.15)
        p = puiss(2, "−3", fs=60)
        e1 = eg(50)
        f8 = fracm(T("1", 52, VERT_OK), T("8", 52, VERT_OK), c=VERT_OK)
        e2 = eg(50)
        d = T("0,125", 60, VERT_OK)
        sur_base(ldb(p, e1, f8, e2, d, buff=0.25), -0.65, gauche=XG + 0.1)
        self.au("2 puissance", FadeIn(p.base, scale=1.3), rt=0.15)
        self.au("moins 3", FadeIn(p.moins, scale=1.6), rt=0.15)
        self.au("3 :", FadeIn(p.chif, scale=1.6), rt=0.2)
        w, n = 2.4, 8
        x0, y = 3.05, -1.45
        cadre = Rectangle(width=w, height=0.5, stroke_color=WHITE, stroke_width=3).move_to(P(x0 + w / 2, y))
        traits = VGroup(*[Line(P(x0 + w / n * k, y - 0.25), P(x0 + w / n * k, y + 0.25), color=WHITE, stroke_width=2)
                          for k in range(1, n)])
        part = Rectangle(width=w / n, height=0.5, fill_color=VERT_OK, fill_opacity=0.9, stroke_width=0)
        part.move_to(P(x0 + w / n / 2, y))
        self.au("1 sur", FadeIn(e1), FadeIn(f8.num, scale=1.3), Create(f8.trait), Create(cadre), Create(traits), rt=0.2)
        self.au("8,", FadeIn(f8.den, scale=1.3), FadeIn(part), rt=0.2)
        self.au("0,125", FadeIn(e2), FadeIn(d, scale=1.3), rt=0.3)
        self.insister(d, 1.25, 0.2)
        l1 = T("Un petit nombre,", 40, VERT_OK).move_to(P(0, -2.1)).align_to(P(XG + 0.1, 0), LEFT)
        l2 = T("pas un nombre négatif.", 40, PIEGE).move_to(P(0, -2.8)).align_to(P(XG + 0.1, 0), LEFT)
        self.au("Un petit", FadeIn(l1, shift=RIGHT * 0.15), rt=0.3)
        self.au("pas un", FadeIn(l2, shift=RIGHT * 0.15), rt=0.3)
        self.attendre_voix(marge=0.15)
        self.ranger(5, r)

    # ── 06q : QUESTION 2 (5⁻²) ──────────────────────────────────────────────
    def ecran_question2(self):
        self.nu()
        p, e, qm = puiss(5, "−2", fs=100), eg(74), T("?", 96, EXPO_C, audit=False)
        sur_base(ldb(p, e, qm, buff=0.3), 1.0, x=-3.45)
        e0, e2 = eg(60), eg(60)
        f1 = fracm(T("1", 64, audit=False), puiss(5, 2, fs=64, audit=False))
        f2 = fracm(T("1", 64, audit=False), T("25", 64, audit=False))
        sur_base(ldb(T("x", 64, audit=False), e0, f1, e2, f2, buff=0.28), -1.1)
        VGroup(e0, f1, e2, f2).set_x(-3.45)
        r = T("0,04", 80, VERT_OK, audit=False)
        r.shift(UP * (p.base.get_bottom()[1] - r.get_bottom()[1]) + RIGHT * (e.get_right()[0] + 0.3 - r.get_left()[0]))
        m25, m10, c = T("−25", 38, audit=False), T("−10", 38, audit=False), T("0,04", 38, audit=False)
        choix = [m25, m10, c]
        plans = [[("moins", [m25[:1]]), ("25.", [m25[1:]])], [("moins", [m10[:1]]), ("10.", [m10[1:]])],
                 [("0,04.", [c])]]

        def avant(sc, q):
            sc.poser_idx(q[0], [(0, "Combien"), (q[0].original_text.find("5"), "5 puissance"),
                                (q[0].original_text.find("⁻"), "moins"), (q[0].original_text.find("²"), "2 ?")],
                         avec={1: [FadeIn(p.base, scale=1.3)], 2: [FadeIn(p.moins, scale=1.6)],
                               3: [FadeIn(p.chif, scale=1.6), FadeIn(e), FadeIn(qm)]})

        def apres(sc):
            l0 = sc.rep_ligne(0, ["Réponse C :", "0,04."])
            sc.au("C :", FadeIn(l0[0], shift=UP * 0.1), rt=0.2)
            sc.au("0,04.", FadeIn(l0[1], shift=UP * 0.1), FadeOut(qm), FadeIn(r, scale=1.3), rt=0.3)
            sc.pieges(0, 1)
            l1 = T("1/5² = 1/25.", sc.FS_REP, VERT_OK)
            l1.shift(UP * (sc.y_ligne(1) - pied(l1)))
            l1.shift(RIGHT * (sc.XL - l1.get_left()[0]))
            sc.poser_idx(l1, [(0, "1 sur 5"), (2, "5 puissance"), (3, "2,"), (5, "1 sur 25"), (9, "25.")], rt=0.15,
                         avec={0: [FadeIn(e0), FadeIn(f1.num, scale=1.2), Create(f1.trait)],
                               1: [FadeIn(f1.den.base, scale=1.2)], 2: [FadeIn(f1.den.expo, scale=1.4)],
                               3: [FadeIn(e2), FadeIn(f2.num, scale=1.2), Create(f2.trait)],
                               4: [FadeIn(f2.den, scale=1.2)]})
            sc.insister(r, 1.2, 0.2)

        self.qpause("06q-question", "06r-reponse", ["Combien vaut 5⁻² ?"], choix, plans, 2,
                    ["Réponse C : 0,04.", "1/5² = 1/25."], avant=avant, apres=apres)

    # ── 07 : la notation scientifique, l'ordre de grandeur ─────────────────
    def ecran_ordre(self):
        self.remettre_fiche()
        self.dire("07-ordre")
        t1, t2 = T("Notation scientifique :", 28), T("l'ordre de grandeur", 28, JAUNE_TITRE)
        ligne_base(VGroup(t1, t2).arrange(RIGHT, buff=0.2)).move_to(P(CX, 3.15))
        self.au("la notation", FadeIn(t1, shift=DOWN * 0.15), rt=0.3)
        self.au("l'ordre", FadeIn(t2, shift=DOWN * 0.15), rt=0.3)
        parc = VGroup(*[eolienne(h=0.2, r=0.17, large=2.0).move_to(P(XG + 0.26 + 0.37 * c + 0.08 * (r % 2), 2.42 - 0.44 * r))
                        for r in range(5) for c in range(10)])
        rt_mer = RoundedRectangle(width=4.05, height=2.42, corner_radius=0.1, fill_color="#0c4a6e", fill_opacity=0.55,
                                  stroke_color="#38bdf8", stroke_width=2).move_to(P(XG + 2.05, 1.53))
        e1 = T("Une éolienne :", 30, CIEL).move_to(P(0, 2.58)).align_to(P(2.35, 0), LEFT)
        n1 = notation("6", 6, fs=46)
        w1 = T("W", 42, WHITE, audit=False)
        l1 = sur_base(ldb(n1, w1, buff=0.2), 1.68, gauche=2.35)
        self.au("Une éolienne", FadeIn(e1, shift=RIGHT * 0.15), FadeIn(rt_mer), FadeIn(parc[0], scale=1.3), rt=0.3)
        tourner(parc[0], 2.0)
        self.au("6 fois", FadeIn(n1.m, scale=1.3), rt=0.2)
        self.au("fois", FadeIn(n1.x), rt=0.15)
        self.au("10 puissance", FadeIn(n1.p.base, scale=1.3), rt=0.15)
        self.au("6 watts", FadeIn(n1.p.expo, scale=1.6), rt=0.2)
        self.au("watts", FadeIn(w1), rt=0.15)
        e2 = VGroup(T("Le parc :", 30, CIEL), T("50", 30, VERT_OK)).arrange(RIGHT, buff=0.18)
        ligne_base(e2).move_to(P(0, 1.2)).align_to(P(2.35, 0), LEFT)
        n2 = notation("5", 1, fs=46)
        sur_base(ldb(n2), 0.34, gauche=2.35)
        self.au("Le parc", FadeIn(e2[0], shift=RIGHT * 0.15), rt=0.25)
        self.au("50 :", FadeIn(e2[1], scale=1.3), LaggedStart(*[FadeIn(u, scale=0.5) for u in parc[1:]], lag_ratio=0.02), rt=0.5)
        for u in parc[1:]:
            tourner(u, 2.0)
        self.au("5 fois", FadeIn(n2.m, scale=1.3), rt=0.2)
        self.au("fois", FadeIn(n2.x), rt=0.15)
        self.au("10 puissance", FadeIn(n2.p.base, scale=1.3), rt=0.15)
        self.au("1.", FadeIn(n2.p.expo, scale=1.6), rt=0.2)
        c1 = T("6 × 5 = 30", 44).move_to(P(0, -0.5)).align_to(P(XG + 0.1, 0), LEFT)
        c2 = T("6 + 1 = 7", 44, EXPO_C).move_to(P(0, -0.5)).align_to(P(2.35, 0), LEFT)
        self.poser_idx(c1, [(0, "6 fois"), (2, "fois"), (4, "5,"), (6, "30.")], rt=0.15,
                       avec={0: [Indicate(n1.m, color=WHITE, scale_factor=1.3)],
                             2: [Indicate(n2.m, color=WHITE, scale_factor=1.3)]})
        self.poser_idx(c2, [(0, "6 plus"), (2, "plus"), (4, "1,"), (6, "7.")], rt=0.15,
                       avec={0: [Indicate(n1.p.expo, color=EXPO_C, scale_factor=1.5)],
                             2: [Indicate(n2.p.expo, color=EXPO_C, scale_factor=1.5)]})
        self.allumer(2)
        n3, eq = notation("30", 7, fs=50), eg(44)
        n4, w4 = notation("3", 8, fs=50), T("W", 46, WHITE, audit=False)
        sur_base(ldb(n3, eq, n4, w4, buff=0.24), -1.6, gauche=XG + 0.1)
        self.au("30 fois", FadeIn(n3.m, scale=1.2), rt=0.2)
        self.au("fois", FadeIn(n3.x), rt=0.15)
        self.au("10 puissance", FadeIn(n3.p.base, scale=1.3), rt=0.15)
        self.au("7,", FadeIn(n3.p.expo, scale=1.6), rt=0.2)
        self.au("c'est", FadeIn(eq), rt=0.15)
        self.au("3 fois", FadeIn(n4.m, scale=1.3), rt=0.15)
        self.au("fois", FadeIn(n4.x), rt=0.12)
        self.au("10 puissance", FadeIn(n4.p.base, scale=1.3), rt=0.15)
        self.au("8 watts", FadeIn(n4.p.expo, scale=1.6), rt=0.12)
        self.au("watts", FadeIn(w4), rt=0.15)
        o = T("Ordre de grandeur :", 40, JAUNE_TITRE)
        p8 = puiss(10, 8, fs=62, cb=VERT_OK, ce=VERT_OK)
        sur_base(ldb(o, p8, buff=0.3), -2.85, gauche=XG + 0.1)
        self.au("Ordre", FadeIn(o, shift=RIGHT * 0.15), rt=0.3)
        self.au("10 puissance", FadeIn(p8.base, scale=1.3), rt=0.2)
        self.au("8.", FadeIn(p8.expo, scale=1.6), rt=0.2)
        self.insister(p8, 1.2, 0.25)
        self.attendre_voix(marge=0.3)
        self.play(FadeOut(self.cad_fi), run_time=0.15)
        self.cad_fi = None

    # ── 08 : le défi : (2⁵ × 2⁻³) / (2²)³ ──────────────────────────────────
    def frac_defi(self, fs=70, audit=True):
        a, x, b = puiss(2, 5, fs=fs, audit=audit), T("×", fs * 0.8, audit=False), puiss(2, "−3", fs=fs, audit=audit)
        num = ldb(a, x, b, buff=0.2)
        num.a, num.x, num.b = a, x, b
        den = ppar(2, 2, 3, fs=fs, audit=audit)
        sans_audit(den.out)  # « au cube » : le 3 de l'exposant extérieur
        return fracm(num, den)

    def ecran_defi(self):
        self.vider_centre()
        self.dire("08-defi")
        tit = T("À toi de jouer !", 46, JAUNE_TITRE).move_to(P(CX - 0.4, 3.12))
        self.au("À toi", Write(tit), rt=0.5)
        s = T("Les règles s'enchaînent.", 30, CIEL).move_to(P(CX - 0.4, 2.42))
        self.au("les règles", FadeIn(s, shift=DOWN * 0.1), rt=0.3)
        l, p = T("Écris sous la forme", 36), puiss(2, "n", fs=48)
        sur_base(ldb(l, p, buff=0.22), 1.68, x=CX - 0.2)
        self.au("Écris", FadeIn(l, shift=RIGHT * 0.15), rt=0.3)
        self.au("2 puissance", FadeIn(p.base, scale=1.3), rt=0.2)
        self.au("n.", FadeIn(p.expo, scale=1.6), rt=0.2)
        F = self.frac_defi(fs=70).move_to(P(CX + 0.75, -0.05))
        F.shift(UP * (-0.1 - F.trait.get_y()))
        num, den = F.num, F.den
        h = T("En haut", 30, CIEL).move_to(P(0, num.get_y())).align_to(P(XG + 0.45, 0), LEFT)
        b = T("En bas", 30, CIEL).move_to(P(0, den.get_y())).align_to(P(XG + 0.45, 0), LEFT)
        self.au("En haut", FadeIn(h, shift=RIGHT * 0.15), rt=0.25)
        self.au("2 puissance", FadeIn(num.a.base, scale=1.3), rt=0.2)
        self.au("5,", FadeIn(num.a.expo, scale=1.6), rt=0.2)
        self.au("fois", FadeIn(num.x), rt=0.15)
        self.au("2 puissance", FadeIn(num.b.base, scale=1.3), rt=0.2)
        self.au("moins", FadeIn(num.b.moins, scale=1.6), rt=0.15)
        self.au("3.", FadeIn(num.b.chif, scale=1.6), rt=0.2)
        self.au("En bas", FadeIn(b, shift=RIGHT * 0.15), Create(F.trait), rt=0.25)
        self.au("2 puissance", FadeIn(den.lp), FadeIn(den.p.base, scale=1.3), rt=0.2)
        self.au("2,", FadeIn(den.p.expo, scale=1.6), rt=0.2)
        self.au("le tout", FadeIn(den.rp, scale=1.3), rt=0.2)
        self.au("cube", FadeIn(den.out, scale=1.8), rt=0.25)
        rb = CompteARebours(5, r=0.42).move_to(P(5.95, 3.0))
        self.au("Mets pause")
        pz = T("Mets pause, et cherche !", 36, ORANGE_RETENUE).move_to(P(CX - 0.6, -2.55))
        self.play(Write(pz), FadeIn(rb, scale=0.6), run_time=0.7)
        self.attendre_voix(marge=0.2)
        rb.jouer(self)

    # ── 08b : la correction, chaque étape allume sa règle ──────────────────
    def ecran_correction(self):
        self.vider_centre()
        self.dire("08b-correction")
        tit = T("Correction", 42, JAUNE_TITRE).move_to(P(CX, 3.15))
        self.au("Correction", Write(tit), rt=0.5)
        fs = 48
        F0 = sans_audit(self.frac_defi(fs=fs, audit=False))
        e1, e2, e3 = eg(42), eg(42), eg(42)
        d6, n2 = puiss(2, 6, fs=fs), puiss(2, 2, fs=fs)
        F1 = fracm(n2, d6)
        m4 = puiss(2, "−4", fs=fs)
        un, s16 = T("1", fs, VERT_OK), T("16", fs, VERT_OK)
        F2 = fracm(un, s16, c=VERT_OK)
        ligne = ldb(F0, e1, F1, e2, m4, e3, F2, buff=0.22)
        ligne.shift(UP * (1.7 - F0.trait.get_y()))
        ligne.shift(RIGHT * (XG + 0.05 - ligne.get_left()[0]))
        F2.shift(RIGHT * 0.14)
        if ligne.get_right()[0] > 6.55:
            print(f"LARGE correction : {ligne.get_right()[0]:.2f}", flush=True)
        self.play(FadeIn(F0), run_time=0.3)
        fs_c = 33

        def ligne_c(y, a, b):
            ta, tb = T(a, fs_c), T(b, fs_c, EXPO_C)
            g = ligne_base(VGroup(ta, tb).arrange(RIGHT, buff=0.22))
            g.move_to(P(0, y)).align_to(P(XG + 0.05, 0), LEFT)
            return ta, tb

        Y = (0.2, -0.65, -1.5, -2.4)
        a1, b1 = ligne_c(Y[0], "En bas, règle 4 :", "2 × 3 = 6")
        self.au("En bas", FadeIn(a1[:6], shift=RIGHT * 0.1), Indicate(F0.den, color=WHITE, scale_factor=1.15), rt=0.25)
        self.au("règle 4", FadeIn(a1[6:], shift=RIGHT * 0.1), rt=0.2)
        self.allumer(4)
        pc = self.poser_idx(b1, [(0, "2 fois"), (2, "fois"), (4, "3,"), (6, "6.")], rt=0.15)
        self.au("2 puissance", FadeIn(e1), Create(F1.trait), FadeIn(d6.base, scale=1.3), rt=0.2)
        self.au("6.", ReplacementTransform(pc[3].copy(), d6.expo), rt=0.35)
        a2, b2 = ligne_c(Y[1], "En haut, règle 3 :", "5 + (−3) = 2")
        self.au("En haut", FadeIn(a2[:7], shift=RIGHT * 0.1), Indicate(F0.num, color=WHITE, scale_factor=1.1), rt=0.25)
        self.au("règle 3", FadeIn(a2[7:], shift=RIGHT * 0.1), rt=0.2)
        self.allumer(2)
        pc = self.poser_idx(b2, [(0, "5 plus"), (2, "plus"), (4, "moins"), (7, "3,"), (9, "2.")], rt=0.15)
        self.au("2 puissance", FadeIn(n2.base, scale=1.3), rt=0.2)
        self.au("2.", ReplacementTransform(pc[4].copy(), n2.expo), rt=0.35)
        a3, b3 = ligne_c(Y[2], "Puis le quotient :", "2 − 6 = −4")
        self.au("Puis le", FadeIn(a3, shift=RIGHT * 0.1), Indicate(F1, color=WHITE, scale_factor=1.15), rt=0.3)
        self.allumer(3)
        pc = self.poser_idx(b3, [(0, "2 moins"), (2, "moins 6"), (4, "6,"), (6, "moins 4"), (9, "4.")], rt=0.12)
        self.au("2 puissance", FadeIn(e2), FadeIn(m4.base, scale=1.3), rt=0.2)
        self.au("moins", FadeIn(m4.moins, scale=1.6), rt=0.15)
        self.au("4.", ReplacementTransform(pc[4].copy(), m4.chif), rt=0.3)
        a4 = T("Et avec la règle 5 :", fs_c).move_to(P(0, Y[3])).align_to(P(XG + 0.05, 0), LEFT)
        b4 = T("1/16", fs_c, VERT_OK, audit=False)
        b4.next_to(a4, RIGHT, buff=0.22)
        b4.shift(UP * (pied(a4) - pied(b4)))
        self.au("Et avec", FadeIn(a4[:-3], shift=RIGHT * 0.1), rt=0.25)
        self.au("règle 5", FadeIn(a4[-3:], shift=RIGHT * 0.1), rt=0.15)
        self.allumer(5, rt=0.25)
        self.poser_idx(b4, [(0, "1 sur"), (2, "16.")], rt=0.2,
                       avec={0: [FadeIn(e3), FadeIn(un, scale=1.3), Create(F2.trait)], 1: [FadeIn(s16, scale=1.3)]})
        cad = self.encadrer(F2, buff=0.12)
        self.play(Create(cad), run_time=0.2)
        self.insister(VGroup(F2, cad), 1.15, 0.2)
        self.attendre_voix(marge=0.4)

    # ── 09 : ce que tu as appris : la fiche complète, grande ───────────────
    def ecran_finale(self):
        self.vider_centre()
        self.dire("09-finale")
        tit = T("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        ancien = [self.fi]
        fs = 38
        ys = (2.25, 1.47, 0.69, -0.09, -0.87, -1.82)
        X_T = -1.55
        lignes, disques = {}, {}
        tr = [FadeOut(self.fi)]
        for k in range(6):
            g = sans_audit(regle(k if k else 0, fs))
            if k == 0:  # à gauche, aⁿ seul : « n facteurs » se dit à droite de la ligne
                g = sans_audit(regle(0, fs))
            sur_base(g, ys[k], gauche=-5.45)
            g.set_opacity(0.32)
            lignes[k] = g
            tr.append(ReplacementTransform(self.fi_l[k], g))
        for d, y in enumerate((ys[0], ys[1], (ys[2] + ys[3]) / 2, ys[4], ys[5])):
            c = Circle(radius=0.22, fill_color="#1e293b", fill_opacity=1, stroke_color=VERT_OK, stroke_width=3)
            n = T(str(d + 1), 24, WHITE, audit=False).move_to(c)
            disques[d] = VGroup(c, n).move_to(P(-5.95, y + 0.14))
        cad = getattr(self, "cad_fi", None)
        if cad is not None:
            tr.append(FadeOut(cad))
        self.au("Ce que", Write(tit), *tr, *[FadeIn(d) for d in disques.values()], rt=0.8)

        def texte(k, a, b=None, ca=WHITE, cb=VERT_OK):
            ta = T(a, 29, ca, audit=False)
            items = [ta]
            if b:
                items.append(T(b, 29, cb, audit=False))
            g = ligne_base(VGroup(*items).arrange(RIGHT, buff=0.2))
            g.shift(UP * (ys[k] - pied(ta)))
            g.shift(RIGHT * (X_T - g.get_left()[0]))
            return items

        def allume(k, *anims):
            return [lignes[k].animate.set_opacity(1), *anims]

        self.au("a puissance", *allume(0), rt=0.35)
        self.insister(lignes[0], 1.06, 0.12)
        i = texte(1, "Exposant 0 :", "ça fait 1.")
        i[1].shift(UP * (pied(i[0]) - i[1][1].get_bottom()[1]))  # « ç » descend : la base, c'est le « a »
        self.poser_idx(i[0], [(0, "Exposant"), (9, "0 :")], rt=0.2, avec={0: allume(1)})
        self.poser_idx(i[1], [(0, "ça fait"), (8, "1.")], rt=0.2)
        i = texte(2, "Produit :", "on additionne.")
        self.au("Produit", FadeIn(i[0], shift=RIGHT * 0.15), *allume(2), rt=0.3)
        self.au("on additionne", FadeIn(i[1], shift=RIGHT * 0.15), rt=0.25)
        i = texte(3, "Quotient :", "on soustrait.")
        self.au("Quotient", FadeIn(i[0], shift=RIGHT * 0.15), *allume(3), rt=0.3)
        self.au("on soustrait", FadeIn(i[1], shift=RIGHT * 0.15), rt=0.25)
        i = texte(4, "Puissance de puissance :", "on multiplie.")
        self.au("Puissance de", FadeIn(i[0], shift=RIGHT * 0.15), *allume(4), rt=0.3)
        self.au("on multiplie", FadeIn(i[1], shift=RIGHT * 0.15), rt=0.25)
        i = texte(5, "Exposant négatif :", "l'inverse.")
        self.au("Exposant négatif", FadeIn(i[0], shift=RIGHT * 0.15), *allume(5), rt=0.3)
        self.au("l'inverse", FadeIn(i[1], shift=RIGHT * 0.15), rt=0.25)
        c6 = self.coche()
        n6 = T("La notation scientifique donne l'ordre de grandeur.", 29)
        g6 = VGroup(c6, n6).arrange(RIGHT, buff=0.2).move_to(P(0, -2.72)).align_to(P(-6.2, 0), LEFT)
        self.au("Et la", Create(c6), FadeIn(n6, shift=RIGHT * 0.15), rt=0.35)
        fin = T("Alors les automatismes sont à toi.", 36, JAUNE_TITRE).move_to(P(-1.2, -3.32))
        self.au("Alors", FadeIn(fin, shift=UP * 0.12), rt=0.3)
        self.insister(fin, 1.08, 0.2)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_eolienne()
        self.ecran_regle1()
        self.ecran_regle2()
        self.ecran_regle3()
        self.ecran_question1()
        self.ecran_regle4()
        self.ecran_regle5()
        self.ecran_question2()
        self.ecran_ordre()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PuissanceCinqRegles1re(PuissanceCinqReglesBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "jaune"


class PuissanceCinqReglesStmg(PuissanceCinqReglesBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "jaune"
