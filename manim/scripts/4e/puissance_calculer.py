# puissance_calculer.py
# EleveAI — Maths 4e ET 3e (épisode COMMUN) — série « Puissances », épisode 02 :
# CALCULER UNE PUISSANCE : (−2)⁴ contre −2⁴. Paysage 16:9, AVEC VOIX, CEINTURE
# JAUNE pour les deux classes. Short jumeau : puissance_calculer_short.py.
# ⭐ Une voix, un script, DEUX rendus : PuissanceCalculer4e et PuissanceCalculer3e
# ne changent que l'identité (la voix ne cite aucune classe).
# Micros couvertes : 4e `puissance_calculer`, 3e `entier_puissance_calculer`.
# Code couleur constant : BLEU = la base, ORANGE = l'exposant, VERT = résultat
# juste, ROUGE = le piège ; le signe « − » qui reste devant est blanc puis rouge.
#
# Décor et métiers : CUISINE (une cheffe pâtissière plie sa pâte feuilletée :
# 3, 9, 27, 81 couches) ; JEUX-DÉFIS (deux calculatrices, deux résultats : qui
# a raison ?). Centres : cuisine, jeux-defis.
#
# Micro → écrans : situation (01) ; calculer pas à pas 3⁴ = 81 (02) ; QUESTION 1
# (02q) ; (−2)⁴, la base entre parenthèses (03) ; −2⁴, l'exposant ne touche que
# le 2 (04) ; la règle des signes pair / impair (05) ; QUESTION 2 (05q) ; la
# touche parenthèse (06) ; QUESTION 3 (06q) ; défi (07) et correction (07b) ;
# ce que tu as appris (08) ; fin (09).
#
# Voix : manim/voix/4e-puissance-calculer.json (validée par Frédéric, débit −6),
# WAV dans public/sons/4e-puissance-calculer/ ; marques mot à mot :
# manim/scripts/4e/puissance_calculer_marques.json (scripts/marques_dump.ps1
# puis scripts/cues2marques.py).
# Outils : manim/scripts/6e/prop_commun.py (non modifié).
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/puissance_calculer.py PuissanceCalculer4e
# python -m manim render -qh --disable_caching manim/scripts/4e/puissance_calculer.py PuissanceCalculer4e -o eleveai-maths-4e-puissance-calculer --media_dir manim/scripts/4e/media-puiss-02-4e
# python -m manim render -qh --disable_caching manim/scripts/4e/puissance_calculer.py PuissanceCalculer3e -o eleveai-maths-3e-puissance-calculer --media_dir manim/scripts/4e/media-puiss-02-3e
# Sorties : manim/sorties/4e/maths/puissances/02-calculer/eleveai-maths-4e-puissance-calculer.mp4
#           manim/sorties/3e/maths/puissances/02-calculer/eleveai-maths-3e-puissance-calculer.mp4

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403

BASE_C = BLEU_CALCUL       # la base
EXPO_C = ORANGE_RETENUE    # l'exposant
PIEGE = ROUGE_ERREUR       # le piège
NEG_C = "#a78bfa"          # « négatif » dans la règle des signes (violet, pas le rouge du piège)
PATE_A, PATE_B = "#fde68a", "#f59e0b"


def T(s, fs=40, c=WHITE, audit=True, gras=False):
    """Un texte posé AU MOT par le script (pas d'attente automatique) ;
    audit=False : un rappel déjà dit (ni synchro ni audit)."""
    t = Text(s, font_size=fs, color=c, weight=BOLD if gras else NORMAL)
    t.sans_synchro = True
    if not audit:
        t._pas_audit = True
    return t


def facteur(n="2", fs=60, audit=True, paren=True):
    """« (−2) » : .po .moins .nb .pf (le moins et le nombre en BLEU, la base)."""
    moins, nb = T("−", fs, BASE_C, audit), T(n, fs, BASE_C, audit)
    if paren:
        po, pf = T("(", fs, WHITE, audit), T(")", fs, WHITE, audit)
        g = VGroup(po, moins, nb, pf).arrange(RIGHT, buff=0.04)
        g.po, g.pf = po, pf
    else:
        g = VGroup(moins, nb).arrange(RIGHT, buff=0.04 + fs * 0.0012)
        moins.set_color(WHITE)
    g.moins, g.nb = moins, nb
    return g


def avec_expo(g, e, fs=60, audit=True):
    """Ajoute l'exposant (orange, plus petit, en haut à droite) : g.expo."""
    ex = T(str(e), fs * 0.6, EXPO_C, audit)
    ex.next_to(g, UR, buff=0.03).shift(DOWN * fs * 0.007)
    g.add(ex)
    g.expo = ex
    return g


def puiss(b, e, fs=60, audit=True):
    """« 3⁴ » : .base (bleu) .expo (orange)."""
    base = T(str(b), fs, BASE_C, audit)
    g = VGroup(base)
    g.base = base
    return avec_expo(g, e, fs, audit)


def paire(a, b, signe="+", couleur=VERT_OK, prof=0.35, fs=36):
    """L'arc SOUS deux signes moins (a, b) et le « + » qui en sort."""
    pa, pb = a.get_bottom() + DOWN * 0.12, b.get_bottom() + DOWN * 0.12
    pb[1] = pa[1] = min(pa[1], pb[1])
    arc = ArcBetweenPoints(pa, pb, angle=PI * 0.75, color=couleur, stroke_width=5)
    t = T(signe, fs, couleur, gras=True).next_to(arc, DOWN, buff=0.06)
    g = VGroup(arc, t)
    g.arc, g.signe = arc, t
    return g


def calculatrice(w=2.3, h=3.4):
    """Une calculatrice : boîtier, écran vert pâle, touches ; « ( » et « ) »
    marquées (.par), « ^ » (.puis). Les autres touches sont muettes. .ecran"""
    boite = RoundedRectangle(width=w, height=h, corner_radius=0.18, fill_color="#334155", fill_opacity=1,
                             stroke_color="#94a3b8", stroke_width=3)
    ecran = RoundedRectangle(width=w * 0.84, height=h * 0.22, corner_radius=0.06, fill_color="#d9f99d",
                             fill_opacity=1, stroke_color="#1e293b", stroke_width=2)
    ecran.move_to(boite.get_top() + DOWN * (h * 0.06 + h * 0.11))
    tw, th = w * 0.16, h * 0.085
    touches = VGroup()
    for r in range(5):
        for c in range(4):
            k = RoundedRectangle(width=tw, height=th, corner_radius=0.04, fill_color="#e2e8f0", fill_opacity=1,
                                 stroke_width=0)
            k.move_to(P(-w * 0.3 + c * w * 0.2, h * 0.08 - r * h * 0.13))
            touches.add(k)
    touches.shift(boite.get_center() - P(0, 0))
    lab = {}
    for i, s in ((0, "("), (1, ")"), (2, "^")):
        t = Text(s, font_size=int(th * 70), color=NUIT, weight=BOLD).move_to(touches[i])
        t._pas_audit = True
        t.sans_synchro = True
        lab[i] = t
        touches[i].set_fill("#fde68a" if i < 2 else "#cbd5e1", 1)
    egal = touches[19].set_fill(BASE_C, 1)
    g = VGroup(boite, ecran, touches, *lab.values())
    g.ecran, g.touches = ecran, touches
    g.par = VGroup(touches[0], lab[0], touches[1], lab[1])
    g.egal = egal
    return g


def afficher(calc, mob, droite=True):
    """Place mob dans l'écran de la calculatrice (calé à droite)."""
    e = calc.ecran
    if mob.height > e.height * 0.62:
        mob.scale_to_fit_height(e.height * 0.62)
    if mob.width > e.width * 0.88:
        mob.scale_to_fit_width(e.width * 0.88)
    mob.move_to(e)
    if droite:
        mob.align_to(e.get_right() + LEFT * 0.12, RIGHT)
    return mob


def leo(s=0.55):
    return personne(peau="#c68642", tenue="#2563eb", cheveux="#111827", s=s)


def maya(s=0.55):
    return personne(peau="#e0ac69", tenue="#db2777", cheveux="#78350f", longs=True, s=s)


def cheffe(s=0.8):
    """La cheffe pâtissière : toque blanche, tablier blanc."""
    p = personne(peau="#8d5524", tenue="#0f766e", cheveux="#111827", s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    toque = VGroup(Rectangle(width=r * 1.7, height=r * 0.75, fill_color=WHITE, fill_opacity=1, stroke_width=0)
                   .move_to(c + UP * r * 1.15),
                   *[Circle(radius=r * 0.6, fill_color=WHITE, fill_opacity=1, stroke_width=0)
                     .move_to(c + UP * r * 1.75 + RIGHT * x * r) for x in (-0.6, 0, 0.6)])
    tab = p.corps.copy().set_fill(WHITE, 1).scale(0.62).align_to(p.corps, DOWN).shift(UP * 0.02)
    p.add(tab, toque)
    return p


def pate(n, w=2.8, h=1.7, centre=ORIGIN):
    """La pâte feuilletée : n couches empilées (beurre et pâte en alternance)."""
    hc = h / n
    couches = VGroup(*[Rectangle(width=w, height=hc, fill_color=PATE_A if k % 2 == 0 else PATE_B, fill_opacity=1,
                                 stroke_width=0).move_to(P(0, h / 2 - (k + 0.5) * hc)) for k in range(n)])
    bord = RoundedRectangle(width=w + 0.06, height=h + 0.06, corner_radius=0.05, stroke_color="#92400e",
                            stroke_width=3)
    g = VGroup(couches, bord).move_to(centre)
    g.couches = couches
    return g


class AuNombre:
    """au_mot() visé sur le NOMBRE de l'extrait (« Moins 2 » attend le « 2 », pas
    « Moins ») : un nombre n'apparaît jamais avant d'être dit (audit 0 s)."""

    def au_mot(self, extrait, n=1):
        m = re.search(r"\d", extrait)
        if not m or m.start() == 0:
            return super().au_mot(extrait, n)
        i = -1
        for _ in range(n):
            i = self._texte_voix.find(extrait, i + 1)
            if i < 0:
                raise ValueError(f"« {extrait} » (n = {n}) absent de la voix")
        sous = extrait[m.start():]
        cible = i + m.start()
        k, j = 0, -1
        while True:
            j = self._texte_voix.find(sous, j + 1)
            if j < 0 or j > cible:
                break
            k += 1
        return super().au_mot(sous, k)


class PuissanceCalculerBase(AuNombre, PaysageProp):
    nom_voix = "4e-puissance-calculer"
    fichier_marques = "puissance_calculer_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "jaune"

    def ligne_rep(self, i, morceaux, fs=None):
        """Celle de prop_echelle_comprendre : même taille que la ligne remplacée."""
        lg = super().ligne_rep(i, morceaux, fs)
        ref = self.ph_q[i]
        lg.scale_to_fit_height(ref.height).move_to(ref).align_to(ref, LEFT)
        g = lg.get_left()[0]
        if lg.get_right()[0] > self.BORD_X - 0.05:
            lg.scale_to_fit_width(self.BORD_X - 0.05 - g).align_to(P(g, 0), LEFT)
        return lg

    def dire_mots(self, lg, mots, anim=None, rt=0.3):
        """Chaque morceau de lg à SON mot de la voix (mots : extrait ou (extrait, n))."""
        for m, mot in zip(lg, mots):
            if mot is not None:
                self.au_mot(*(mot if isinstance(mot, tuple) else (mot,)))
            self.play(anim(m) if anim else FadeIn(m, shift=RIGHT * 0.15), run_time=rt)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Calculer une puissance", self.identite, self.ceinture, y_ech=-2.7)
        self.au_mot("Calculer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        c1 = calculatrice(1.5, 2.2).move_to(P(-2.0, -0.35))
        c2 = calculatrice(1.5, 2.2).move_to(P(1.0, -0.35))
        self.au_mot("Deux calculatrices")
        self.play(FadeIn(c1, shift=RIGHT * 0.3), FadeIn(c2, shift=LEFT * 0.3), run_time=0.6)
        q1, q2 = afficher(c1, T("?", 40, NUIT, gras=True)), afficher(c2, T("?", 40, NUIT, gras=True))
        gq = T("?", 110, AMBRE, gras=True).move_to(P(-0.5, -0.3))
        self.au_mot("qui a raison")
        self.play(FadeIn(q1, scale=1.4), FadeIn(q2, scale=1.4), FadeIn(gq, scale=1.6), run_time=0.5)
        self.insister(gq, 1.25, 0.25)
        self.attendre_voix(marge=0.6)

    # ── 01 : Léo −16, Maya 16 ───────────────────────────────────────────────
    def ecran_calculatrices(self):
        self.ecran("01-calculatrices")
        cl, cm = calculatrice().move_to(P(-2.9, -0.3)), calculatrice().move_to(P(2.1, -0.3))
        pl, pm = leo().move_to(P(-5.55, -0.6)), maya().move_to(P(4.75, 0.3))
        nl = T("Léo", 40, BASE_C).next_to(pl, UP, buff=0.2)
        nm = T("Maya", 40, "#f472b6").next_to(pm, UP, buff=0.2)
        self.au_mot("Léo et")
        self.play(FadeIn(pl, shift=UP * 0.2), FadeIn(nl), FadeIn(cl, shift=UP * 0.2), run_time=0.5)
        self.au_mot("Maya pensent")
        self.play(FadeIn(pm, shift=UP * 0.2), FadeIn(nm), FadeIn(cm, shift=UP * 0.2), run_time=0.5)
        self.au_mot("même calcul")
        self.play(Indicate(cl.egal, color=AMBRE, scale_factor=1.4), Indicate(cm.egal, color=AMBRE, scale_factor=1.4),
                  run_time=0.6)
        rl = afficher(cl, T("−16", 60, NUIT, gras=True))
        rm = afficher(cm, T("16", 60, NUIT, gras=True))
        self.au_mot("moins 16")
        self.play(FadeIn(rl, scale=1.4), run_time=0.35)
        self.au_mot("trouve 16")
        self.play(FadeIn(rm, scale=1.4), run_time=0.35)
        gq = T("?", 120, AMBRE, gras=True).move_to(P(-0.4, 0.2))
        self.au_mot("Qui a raison")
        self.play(FadeIn(gq, scale=1.6), run_time=0.4)
        oks = VGroup(*[self.coche(VERT_OK, 0.35).next_to(c, UP, buff=0.2) for c in (cl, cm)])
        deux = T("Les deux !", 46, VERT_OK).move_to(P(-0.4, 2.85))
        self.au_mot("Les deux")
        self.play(FadeOut(gq), Create(oks), FadeIn(deux, scale=1.3), run_time=0.5)
        diff = T("≠", 120, AMBRE, gras=True).move_to(P(-0.4, -0.3))
        pas = T("pas le même calcul", 34, AMBRE).move_to(P(-0.4, -2.45))
        self.au_mot("pas tapé")
        self.play(FadeIn(diff, scale=1.6), FadeIn(pas, shift=UP * 0.15), run_time=0.5)
        self.insister(diff, 1.25, 0.25)
        dab = T("D'abord : calculer une puissance", 36, JAUNE_TITRE).move_to(P(-0.4, -3.15))
        self.au_mot("calculer une puissance")
        self.play(FadeIn(dab, shift=UP * 0.15), run_time=0.45)
        self.attendre_voix()

    # ── 02 : la cheffe pâtissière : 3⁴ pas à pas = 81 couches ───────────────
    def ecran_patissiere(self):
        self.ecran("02-patissiere")
        ch = cheffe(0.8).move_to(P(-5.55, -0.35))
        met = VGroup(T("Cheffe", 30, PATE_A), T("pâtissière", 30, PATE_A)).arrange(DOWN, buff=0.06)
        met.next_to(ch, DOWN, buff=0.2)
        self.au_mot("cheffe")
        self.play(FadeIn(ch, shift=UP * 0.3), FadeIn(met), run_time=0.6)
        C = P(-2.35, 0.75)
        feuille_ = pate(1, 4.0, 0.3, C)
        self.au_mot("pâte feuilletée")
        self.play(FadeIn(feuille_, shift=DOWN * 0.2), run_time=0.5)
        cur = pate(3, centre=C)
        lab = T("3 couches", 34, PATE_A).move_to(P(-2.35, -0.55))
        self.au_mot("en 3")
        self.play(ReplacementTransform(feuille_, cur), FadeIn(lab, scale=1.3), run_time=0.6)
        plis = VGroup(*[CurvedArrow(P(x - 0.3, -1.45), P(x + 0.3, -1.45), angle=-PI * 0.8, color=AMBRE,
                                    stroke_width=5, tip_length=0.15) for x in (-3.65, -2.8, -1.95, -1.1)])
        self.au_mot("quatre fois")
        self.play(LaggedStart(*[Create(a) for a in plis], lag_ratio=0.25), run_time=0.8)
        q = T("Combien de couches ?", 40).move_to(P(0, 2.75))
        self.col(q, 2.75)
        self.au_mot("Combien")
        self.play(FadeIn(q, shift=RIGHT * 0.2), run_time=0.4)
        p34 = puiss(3, 4, 84)
        self.col(p34, 1.55, xl=2.6)
        self.au_mot("3 puissance")
        self.play(FadeIn(p34.base, scale=1.4), run_time=0.3)
        self.au_mot("4")
        self.play(FadeIn(p34.expo, scale=1.5), run_time=0.3)
        self.insister(p34.expo, 1.5, 0.25)
        # l'échelle des calculs : 3, × 3 = 9, × 3 = 27, × 3 = 81
        lignes = [self.ligne([("3", BASE_C)], 46)]
        for r in (9, 27, 81):
            lignes.append(self.ligne([("× 3", BASE_C), ("=", WHITE), (str(r), VERT_OK)], 46))
        for k, lg in enumerate(lignes):
            for m in lg:
                m.sans_synchro = True
            self.col(lg, 0.45 - k * 0.78, xl=2.75 if k == 0 else 1.85)
        lignes[0].align_to(lignes[1][0][-1], RIGHT)
        self.au_mot("3, fois")
        self.play(FadeIn(lignes[0], scale=1.3), Indicate(cur, color=AMBRE, scale_factor=1.05), plis[0].animate.set_color(VERT_OK),
                  run_time=0.35)
        for k, (mf, mr, n) in enumerate((("fois 3", "9.", 9), ("Fois 3, 27", "27", 27), ("Fois 3, 81", "81.", 81))):
            lg = lignes[k + 1]
            self.au_mot(mf)
            self.play(FadeIn(lg[0], shift=RIGHT * 0.2), FadeIn(lg[1]), run_time=0.3)
            nv = pate(n, centre=C)
            nl = T(f"{n} couches", 34, PATE_A).move_to(lab)
            self.au_mot(mr)
            self.play(FadeIn(lg[2], scale=1.4), ReplacementTransform(cur, nv), ReplacementTransform(lab, nl),
                      plis[k + 1].animate.set_color(VERT_OK), run_time=0.45)
            cur, lab = nv, nl
        enc = self.encadrer(lignes[3][2])
        self.play(Create(enc), run_time=0.3)
        self.au_mot("81 couches")
        self.play(lab.animate.scale(1.35).set_color(VERT_OK), run_time=0.3)
        self.play(lab.animate.scale(1 / 1.35), Indicate(cur, color=VERT_OK, scale_factor=1.05), run_time=0.3)
        self.attendre_voix()

    # ── 02q : QUESTION 1 (4³ = ?) ───────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        fig = puiss(4, 3, 120).move_to(P(-3.6, 1.0))
        res = T("= 64", 90, VERT_OK).next_to(fig, RIGHT, buff=0.3)
        res.shift(UP * (fig.base.get_y() - res.get_y()))

        def avant(sc):
            sc.au_mot("4 puissance")
            sc.play(FadeIn(fig.base, scale=1.4), run_time=0.3)
            sc.au_mot("3 ?")
            sc.play(FadeIn(fig.expo, scale=1.5), run_time=0.3)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["4 × 4", "= 16,", "× 4", "= 64."])
            l1 = sc.ligne_rep(1, ["12 =", "4 × 3 :", "le piège !"])
            sc.dire_mots(l0, ["4 fois 4", "16.", "Fois 4", ("64.", 2)])
            sc.play(FadeIn(res, scale=1.3), run_time=0.35)
            sc.insister(res, 1.2, 0.2)
            sc.au_mot("12,")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), run_time=0.25)
            sc.au_mot("c'est 4")
            sc.play(FadeIn(l1[1], shift=UP * 0.15), Indicate(fig.expo, color=PIEGE, scale_factor=1.4), run_time=0.35)
            sc.au_mot("le piège")
            sc.play(FadeIn(l1[2], shift=UP * 0.15), run_time=0.3)
            sc.rep_fini()

        self.question_pause("02q-question", "02r-reponse", ["Combien vaut 4³ ?"],
                            [self.t("12", 36), self.t("64", 36), self.t("81", 36)], 1,
                            ["4 × 4 = 16, × 4 = 64.", "12 = 4 × 3 : le piège !"], mot_q="Combien",
                            autres_r=apres, avant_q=avant)

    # ── 03 : (−2)⁴ : la base est −2, quatre facteurs, 16 ────────────────────
    def ecran_parentheses(self):
        self.ecran("03-parentheses")
        tit = T("Les parenthèses décident", 44, JAUNE_TITRE).move_to(P(-1.6, 3.0))
        self.au_mot("les parenthèses")
        self.play(Write(tit), run_time=0.6)
        g = avec_expo(facteur("2", 100), 4, 100).move_to(P(-3.4, 1.35))
        self.au_mot("Moins 2")
        self.play(FadeIn(VGroup(g.moins, g.nb), scale=1.3), run_time=0.35)
        self.au_mot("entre parenthèses")
        self.play(GrowFromCenter(g.po), GrowFromCenter(g.pf), run_time=0.4)
        self.au_mot("puissance 4")
        self.play(FadeIn(g.expo, scale=1.5), run_time=0.3)
        boite = SurroundingRectangle(VGroup(g.po, g.pf), color=BASE_C, buff=0.12, corner_radius=0.12)
        lb = self.ligne([("la base :", BASE_C), ("−2", BASE_C)], 44)
        for m in lb:
            m.sans_synchro = True
        lb.next_to(g, RIGHT, buff=0.7).shift(DOWN * 0.15)
        self.au_mot("la base")
        self.play(Create(boite), FadeIn(lb[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("moins 2")
        self.play(FadeIn(lb[1], scale=1.3), run_time=0.3)
        fs = [facteur("2", 64) for _ in range(4)]
        fois = [T("×", 56) for _ in range(3)]
        rang = VGroup(fs[0], fois[0], fs[1], fois[1], fs[2], fois[2], fs[3]).arrange(RIGHT, buff=0.18)
        rang.move_to(P(-1.2, -0.55))
        self.au_mot("Moins 2 fois")
        self.play(TransformFromCopy(g[:4], fs[0]), run_time=0.45)
        for k in range(3):
            self.au_mot("fois moins 2", k + 1)
            self.play(FadeIn(fois[k]), FadeIn(fs[k + 1], shift=RIGHT * 0.2), run_time=0.3)
        moins = VGroup(*[f.moins for f in fs])
        self.au_mot("Quatre signes")
        self.play(LaggedStart(*[m.animate.set_color(EXPO_C).scale(1.6) for m in moins], lag_ratio=0.2), run_time=0.7)
        self.play(*[m.animate.scale(1 / 1.6) for m in moins], run_time=0.25)
        p1, p2 = paire(fs[0].moins, fs[1].moins), paire(fs[2].moins, fs[3].moins)
        self.au_mot("positif")
        self.play(Create(p1.arc), Create(p2.arc), FadeIn(p1.signe, scale=1.4), FadeIn(p2.signe, scale=1.4),
                  run_time=0.5)
        res = T("= 16", 72, VERT_OK).next_to(rang, RIGHT, buff=0.3)
        self.au_mot("16")
        self.play(FadeIn(res, scale=1.4), run_time=0.35)
        self.insister(res, 1.25, 0.25)
        cm = calculatrice(1.3, 1.9).move_to(P(5.3, 1.75))
        nm = T("Maya", 34, "#f472b6").next_to(cm, UP, buff=0.12)
        rm = afficher(cm, T("16", 50, NUIT, audit=False, gras=True))
        self.au_mot("Maya")
        self.play(FadeIn(VGroup(cm, nm, rm), shift=LEFT * 0.3), run_time=0.45)
        self.play(Create(self.coche(VERT_OK, 0.3).next_to(cm, LEFT, buff=0.15)), run_time=0.3)
        self.attendre_voix()

    # ── 04 : −2⁴ : l'exposant ne touche que le 2 ; 16 puis le « − » ─────────
    def ecran_sans(self):
        self.ecran("04-sans")
        tit = T("Sans parenthèses", 44, JAUNE_TITRE).move_to(P(-1.6, 3.0))
        self.au_mot("Sans parenthèses")
        self.play(Write(tit), run_time=0.5)
        g = avec_expo(facteur("2", 110, paren=False), 4, 110).move_to(P(-3.6, 1.2))
        self.au_mot("moins 2")
        self.play(FadeIn(VGroup(g.moins, g.nb), scale=1.3), run_time=0.35)
        self.au_mot("puissance 4")
        self.play(FadeIn(g.expo, scale=1.5), run_time=0.3)
        fl = CurvedArrow(g.expo.get_top() + UP * 0.1, g.nb.get_top() + UP * 0.12 + LEFT * 0.05, angle=PI * 0.6,
                         color=EXPO_C, stroke_width=6, tip_length=0.2)
        lab = VGroup(T("l'exposant ne touche", 36, EXPO_C), T("que le 2", 36, EXPO_C)).arrange(RIGHT, buff=0.15)
        lab.move_to(P(2.6, 1.3))
        self.au_mot("l'exposant")
        self.play(Indicate(g.expo, color=EXPO_C, scale_factor=1.6), FadeIn(lab[0], shift=LEFT * 0.2), run_time=0.5)
        boite = SurroundingRectangle(g.nb, color=BASE_C, buff=0.1, corner_radius=0.1)
        self.au_mot("le 2")
        self.play(Create(fl), Create(boite), FadeIn(lab[1], shift=LEFT * 0.2), g.moins.animate.set_opacity(0.4),
                  run_time=0.5)
        m1 = T("−", 80)
        d = avec_expo(VGroup(T("2", 80, BASE_C)), 4, 80)
        eg, m2, r = T("=", 80), T("−", 80, VERT_OK), T("16", 80)
        ln = VGroup(m1, d, eg, m2, r).arrange(RIGHT, buff=0.22)
        VGroup(m2, r).shift(RIGHT * 0.15)
        ln.move_to(P(-1.3, -1.0))
        self.au_mot("2 puissance 4", 2)
        self.play(TransformFromCopy(g.nb, d[0]), run_time=0.35)
        self.au_mot("4, 16")
        self.play(TransformFromCopy(g.expo, d.expo), run_time=0.3)
        self.au_mot("16,")
        self.play(FadeIn(eg), FadeIn(r, scale=1.4), run_time=0.35)
        self.au_mot("garde le signe")
        self.play(g.moins.animate.set_opacity(1), run_time=0.2)
        self.play(TransformFromCopy(g.moins, m1), run_time=0.5)
        self.au_mot("moins 16")
        self.play(FadeIn(m2, shift=RIGHT * 0.3), r.animate.set_color(VERT_OK), run_time=0.4)
        self.insister(VGroup(m2, r), 1.25, 0.25)
        cl = calculatrice(1.3, 1.9).move_to(P(5.3, -0.75))
        nl = T("Léo", 34, BASE_C).next_to(cl, UP, buff=0.12)
        rl = afficher(cl, T("−16", 50, NUIT, audit=False, gras=True))
        self.au_mot("Léo")
        self.play(FadeIn(VGroup(cl, nl, rl), shift=LEFT * 0.3), run_time=0.45)
        self.play(Create(self.coche(VERT_OK, 0.3).next_to(cl, LEFT, buff=0.15)), run_time=0.3)
        self.attendre_voix()

    # ── 05 : la règle des signes (pair +, impair −) ─────────────────────────
    def ecran_signes(self):
        self.ecran("05-signes")
        tit = T("La règle des signes", 46, JAUNE_TITRE).move_to(P(-1.0, 3.05))
        self.au_mot("La règle")
        self.play(Write(tit), run_time=0.5)
        x0, w, ys, hs = -5.3, 4.3, (1.35, 0.15, -1.3), (0.95, 1.2, 1.45)
        cases = [[Rectangle(width=w, height=h, stroke_color="#64748b", stroke_width=3)
                  .move_to(P(x0 + (c + 0.5) * w, y)) for c in range(2)] for y, h in zip(ys, hs)]
        grille = VGroup(*[r for lg in cases for r in lg])
        sous = T("Base négative entre parenthèses", 36, BASE_C).move_to(P(-1.0, 2.25))
        self.au_mot("base négative")
        self.play(FadeIn(sous, shift=DOWN * 0.15), Create(grille), run_time=0.6)
        hp = T("Exposant pair", 34, EXPO_C).move_to(cases[0][0])
        hi = T("Exposant impair", 34, EXPO_C).move_to(cases[0][1])
        sp = VGroup(T("+", 70, VERT_OK, gras=True), T("positif", 36, VERT_OK)).arrange(RIGHT, buff=0.25)
        si = VGroup(T("−", 70, NEG_C, gras=True), T("négatif", 36, NEG_C)).arrange(RIGHT, buff=0.25)
        sp.move_to(cases[1][0])
        si.move_to(cases[1][1])
        self.au_mot("exposant pair")
        self.play(FadeIn(hp, shift=DOWN * 0.15), cases[0][0].animate.set_fill(EXPO_C, 0.15), run_time=0.4)
        self.au_mot("positif")
        self.play(FadeIn(sp, scale=1.4), cases[1][0].animate.set_fill(VERT_OK, 0.15), run_time=0.4)
        self.au_mot("exposant impair")
        self.play(FadeIn(hi, shift=DOWN * 0.15), cases[0][1].animate.set_fill(EXPO_C, 0.15), run_time=0.4)
        self.au_mot("négatif.")
        self.play(FadeIn(si, scale=1.4), cases[1][1].animate.set_fill(NEG_C, 0.15), run_time=0.4)
        ei = avec_expo(facteur("2", 52), 3, 52)
        ri = T("= −8", 52, NEG_C)
        li = VGroup(ei, ri).arrange(RIGHT, buff=0.25).move_to(cases[2][1])
        self.au_mot("Moins 2")
        self.play(FadeIn(VGroup(ei.moins, ei.nb), scale=1.3), run_time=0.3)
        self.au_mot("entre parenthèses", 2)
        self.play(GrowFromCenter(ei.po), GrowFromCenter(ei.pf), run_time=0.3)
        self.au_mot("puissance 3")
        self.play(FadeIn(ei.expo, scale=1.5), run_time=0.3)
        self.au_mot("moins 8")
        self.play(FadeIn(ri, scale=1.4), run_time=0.35)
        ep = avec_expo(facteur("2", 52, audit=False), 4, 52)
        rp = T("= 16", 52, VERT_OK)
        lp = VGroup(ep, rp).arrange(RIGHT, buff=0.25).move_to(cases[2][0])
        self.au_mot("Puissance 4")
        self.play(FadeIn(ep, scale=1.2), run_time=0.35)
        self.au_mot("16")
        self.play(FadeIn(rp, scale=1.4), run_time=0.35)
        self.play(Indicate(VGroup(hp, sp, lp), color=VERT_OK, scale_factor=1.06), run_time=0.5)
        self.play(Indicate(VGroup(hi, si, li), color=NEG_C, scale_factor=1.06), run_time=0.5)
        self.attendre_voix()

    # ── 05q : QUESTION 2 ((−3)² = ?) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        fig = avec_expo(facteur("3", 110), 2, 110, audit=False).move_to(P(-3.5, 1.6))
        f1, f2 = facteur("3", 56), facteur("3", 56)
        fx = T("×", 50)
        rang = VGroup(f1, fx, f2).arrange(RIGHT, buff=0.18).move_to(P(-4.1, -0.5))
        res = T("= 9", 64, VERT_OK, audit=False).next_to(rang, RIGHT, buff=0.25)

        def avant(sc):
            sc.au_mot("moins 3")
            sc.play(FadeIn(VGroup(fig.moins, fig.nb), scale=1.3), run_time=0.3)
            sc.au_mot("entre parenthèses")
            sc.play(GrowFromCenter(fig.po), GrowFromCenter(fig.pf), run_time=0.3)
            sc.au_mot("au carré")
            sc.play(FadeIn(fig.expo, scale=1.5), run_time=0.3)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["(−3) ×", "(−3) :"])
            l1 = sc.ligne_rep(1, ["deux signes moins,"])
            l2 = sc.ligne_rep(2, ["le résultat est positif."])
            sc.au_mot("Moins 3")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), TransformFromCopy(fig[:4], f1), FadeIn(fx), run_time=0.35)
            sc.au_mot("moins 3")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), TransformFromCopy(fig[:4], f2), run_time=0.35)
            p = paire(f1.moins, f2.moins)
            sc.au_mot("deux signes")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), f1.moins.animate.set_color(EXPO_C),
                    f2.moins.animate.set_color(EXPO_C), Create(p.arc), run_time=0.4)
            sc.au_mot("positif")
            sc.play(FadeIn(l2[0], shift=UP * 0.15), FadeIn(p.signe, scale=1.4), FadeIn(res, scale=1.3), run_time=0.4)
            sc.insister(res, 1.2, 0.2)
            sc.rep_fini()

        self.question_pause("05q-question", "05r-reponse", ["Combien vaut (−3)² ?"],
                            [self.t("−9", 36), self.t("9", 36), self.t("−6", 36)], 1,
                            ["(−3) × (−3) :", "deux signes moins,", "le résultat est positif."], mot_q="Combien",
                            autres_r=apres, avant_q=avant)

    # ── 06 : la touche parenthèse de la calculatrice ────────────────────────
    def ecran_calculatrice(self):
        self.ecran("06-calculatrice")
        c = calculatrice(3.0, 4.6).move_to(P(-3.7, -0.2))
        self.au_mot("Le conseil")
        self.play(FadeIn(c, shift=UP * 0.3), run_time=0.5)
        tit = T("Le conseil de la calculatrice", 44, JAUNE_TITRE).move_to(P(-0.4, 3.05))
        self.play(Write(tit), run_time=0.5)
        l1 = self.col(VGroup(T("Nombre négatif", 38), T("à une puissance :", 38)).arrange(DOWN, aligned_edge=LEFT,
                                                                                        buff=0.1), 1.65)
        self.au_mot("pour élever")
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        cl = VGroup(T("tape les", 46, EXPO_C), T("( )", 60, EXPO_C, gras=True),
                    T("!", 46, EXPO_C)).arrange(RIGHT, buff=0.2)
        self.col(cl, 0.6)
        halo = VGroup(*[SurroundingRectangle(c.par[k], color=EXPO_C, buff=0.06, corner_radius=0.05, stroke_width=6)
                        for k in (0, 2)])
        self.au_mot("tape les")
        self.play(FadeIn(cl, scale=1.2), Create(halo), c.par[0].animate.set_fill(EXPO_C, 1),
                  c.par[2].animate.set_fill(EXPO_C, 1), run_time=0.5)
        self.insister(c.par, 1.3, 0.25)
        self.insister(cl[1], 1.4, 0.25)
        e = c.ecran
        ex = avec_expo(facteur("2", 60, paren=False), 4, 60)
        ex.scale_to_fit_height(e.height * 0.5).move_to(e).align_to(e.get_left() + RIGHT * 0.15, LEFT)
        ex.align_to(e.get_top() + DOWN * 0.1, UP)
        rr = T("−16", 60, PIEGE, gras=True)
        rr.scale_to_fit_height(e.height * 0.34).align_to(e.get_right() + LEFT * 0.15, RIGHT)
        rr.align_to(e.get_bottom() + UP * 0.1, DOWN)
        sl = VGroup(T("Sinon :", 38, PIEGE), avec_expo(facteur("2", 50, paren=False), 4, 50),
                    T("= −16", 50, PIEGE)).arrange(RIGHT, buff=0.25)
        self.col(sl, -0.9)
        sl.scale_to_fit_width(min(sl.width, 5.0)).align_to(P(self.XL, 0), LEFT)
        self.au_mot("Sinon")
        self.play(FadeIn(sl[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("moins 2")
        self.play(FadeIn(VGroup(ex.moins, ex.nb)), FadeIn(VGroup(sl[1].moins, sl[1].nb), scale=1.3), run_time=0.3)
        self.au_mot("puissance 4")
        self.play(FadeIn(ex.expo), FadeIn(sl[1].expo, scale=1.4), run_time=0.3)
        self.au_mot("moins 16")
        self.play(FadeIn(rr, scale=1.3), FadeIn(sl[2], scale=1.3), Indicate(c.egal, scale_factor=1.4), run_time=0.4)
        self.insister(sl[2], 1.2, 0.2)
        self.attendre_voix()

    # ── 06q : QUESTION 3 (−5² = ?) ──────────────────────────────────────────
    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        fig = avec_expo(facteur("5", 120, paren=False), 2, 120, audit=False).move_to(P(-3.9, 1.5))
        fl = CurvedArrow(fig.expo.get_top() + UP * 0.1, fig.nb.get_top() + UP * 0.12 + LEFT * 0.05, angle=PI * 0.6,
                         color=EXPO_C, stroke_width=6, tip_length=0.2)
        boite = SurroundingRectangle(fig.nb, color=BASE_C, buff=0.1, corner_radius=0.1)
        res = T("= −25", 80, VERT_OK, audit=False).next_to(fig, DOWN, buff=0.8).align_to(fig, LEFT)

        def avant(sc):
            sc.au_mot("moins 5")
            sc.play(FadeIn(VGroup(fig.moins, fig.nb), scale=1.3), run_time=0.3)
            sc.au_mot("au carré")
            sc.play(FadeIn(fig.expo, scale=1.5), run_time=0.3)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["Sans parenthèses :", "5² =", "25,"])
            l1 = sc.ligne_rep(1, ["et le moins reste devant."])
            sc.au_mot("Sans parenthèses")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), Create(fl), Create(boite), run_time=0.4)
            sc.au_mot("5 au carré")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("25,")
            sc.play(FadeIn(l0[2], scale=1.3), run_time=0.3)
            sc.au_mot("et le moins")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), Indicate(fig.moins, color=VERT_OK, scale_factor=1.8), run_time=0.4)
            sc.play(FadeIn(res, scale=1.3), run_time=0.35)
            sc.insister(res, 1.2, 0.2)
            sc.rep_fini()

        self.question_pause("06q-question", "06r-reponse", ["Combien vaut −5² ?", "(sans parenthèses)"],
                            [self.t("25", 36), self.t("−25", 36), self.t("−10", 36)], 1,
                            ["Sans parenthèses : 5² = 25,", "et le moins reste devant."], mot_q="Combien",
                            autres_r=apres, avant_q=avant)

    # ── 07 : défi : (−2)⁵ et −2⁵ ────────────────────────────────────────────
    def deux_calculs(self, y=0.9, fs=96):
        a = avec_expo(facteur("2", fs), 5, fs)
        qa = T("= ?", fs * 0.8, AMBRE)
        ga = VGroup(a, qa).arrange(RIGHT, buff=0.3).move_to(P(-3.4, y))
        qa.shift(UP * (a.nb.get_y() - qa.get_y()))
        b = avec_expo(facteur("2", fs, paren=False), 5, fs)
        qb = T("= ?", fs * 0.8, AMBRE)
        gb = VGroup(b, qb).arrange(RIGHT, buff=0.3).move_to(P(2.6, y))
        qb.shift(UP * (b.nb.get_y() - qb.get_y()))
        return a, qa, b, qb

    def ecran_defi(self):
        self.ecran("07-defi", 0.65)
        tit = T("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.05))
        self.au_mot("À toi de jouer")
        self.play(Write(tit), run_time=0.6)
        a, qa, b, qb = self.deux_calculs()
        la = T("avec parenthèses", 34, BASE_C).next_to(VGroup(a, qa), DOWN, buff=0.45)
        lb = T("sans parenthèses", 34, BASE_C).next_to(VGroup(b, qb), DOWN, buff=0.45)
        self.au_mot("moins 2")
        self.play(FadeIn(VGroup(a.moins, a.nb), scale=1.3), run_time=0.3)
        self.au_mot("entre parenthèses")
        self.play(GrowFromCenter(a.po), GrowFromCenter(a.pf), FadeIn(la, shift=UP * 0.15), run_time=0.35)
        self.au_mot("puissance 5")
        self.play(FadeIn(a.expo, scale=1.5), FadeIn(qa, scale=1.3), run_time=0.35)
        self.au_mot("moins 2", 2)
        self.play(FadeIn(VGroup(b.moins, b.nb), scale=1.3), run_time=0.3)
        self.au_mot("puissance 5", 2)
        self.play(FadeIn(b.expo, scale=1.5), FadeIn(qb, scale=1.3), run_time=0.35)
        self.au_mot("sans parenthèses")
        self.play(FadeIn(lb, shift=UP * 0.15), run_time=0.35)
        self.pause_defi(y=-1.9)

    def ecran_correction(self):
        self.ecran("07b-correction", 0.65)
        tit = T("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.05))
        self.play(Write(tit), run_time=0.5)
        a, qa, b, qb = self.deux_calculs(1.75, 84)
        sep = DashedLine(P(-0.35, 2.4), P(-0.35, -1.6), color="#475569", stroke_width=3)
        self.add(sep)
        self.au_mot("Moins 2")
        self.play(FadeIn(a[:4], scale=1.2), run_time=0.35)
        self.au_mot("puissance 5")
        self.play(FadeIn(a.expo, scale=1.5), run_time=0.3)
        ms = VGroup(*[T("−", 90, BASE_C, gras=True) for _ in range(5)]).arrange(RIGHT, buff=0.5).move_to(P(-3.4, 0.75))
        self.au_mot("cinq signes")
        self.play(LaggedStart(*[FadeIn(m, shift=DOWN * 0.3) for m in ms], lag_ratio=0.18), run_time=0.8)
        p1, p2 = paire(ms[0], ms[1]), paire(ms[2], ms[3])
        seul = Circle(radius=0.32, color=NEG_C, stroke_width=5).move_to(ms[4])
        self.au_mot("impair")
        self.play(Create(p1.arc), Create(p2.arc), FadeIn(p1.signe), FadeIn(p2.signe), run_time=0.5)
        self.play(Create(seul), ms[4].animate.set_color(NEG_C), run_time=0.35)
        ra = T("= −32", 84, VERT_OK).move_to(P(-3.4, -1.3))
        self.au_mot("moins 32")
        self.play(FadeIn(ra, scale=1.4), run_time=0.35)
        self.au_mot("Moins 2", 2)
        self.play(FadeIn(b[:2], scale=1.2), run_time=0.3)
        self.au_mot("puissance 5", 2)
        self.play(FadeIn(b.expo, scale=1.5), run_time=0.3)
        d = avec_expo(VGroup(T("2", 72, BASE_C)), 5, 72)
        r32 = T("= 32", 72)
        ld = VGroup(d, r32).arrange(RIGHT, buff=0.25).move_to(P(2.9, 0.6))
        self.au_mot("2 puissance 5", 2)
        self.play(TransformFromCopy(b.nb, d[0]), run_time=0.35)
        self.au_mot("5, 32")
        self.play(TransformFromCopy(b.expo, d.expo), run_time=0.3)
        self.au_mot("32,")
        self.play(FadeIn(r32, scale=1.3), run_time=0.3)
        rb = VGroup(T("=", 84, VERT_OK), T("−", 84, VERT_OK), T("32", 84, VERT_OK)).arrange(RIGHT, buff=0.15)
        rb[0].shift(LEFT * 0.15)
        rb[0].shift(LEFT * 0.2)
        rb.move_to(P(2.9, -1.3))
        self.au_mot("le moins devant")
        self.play(TransformFromCopy(b.moins, rb[1]), run_time=0.4)
        self.au_mot("moins 32", 2)
        self.play(FadeIn(rb[0]), FadeIn(rb[2], scale=1.4), run_time=0.35)
        meme = T("Le même résultat !", 44, VERT_OK).move_to(P(-0.4, -2.35))
        self.au_mot("Le même")
        self.play(FadeIn(meme, scale=1.2), ra.animate.scale(1.4), rb.animate.scale(1.4), run_time=0.4)
        self.play(ra.animate.scale(1 / 1.4), rb.animate.scale(1 / 1.4), run_time=0.35)
        fin = VGroup(T("Exposant impair :", 34, EXPO_C), T("les parenthèses ne changent rien.", 34)).arrange(
            RIGHT, buff=0.2)
        fin.scale_to_fit_width(min(fin.width, 10.4)).move_to(P(-0.9, -3.0))
        self.au_mot("Avec un exposant")
        self.play(FadeIn(fin[0], shift=UP * 0.15), run_time=0.35)
        self.au_mot("les parenthèses ne")
        self.play(FadeIn(fin[1], shift=UP * 0.15), run_time=0.35)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.65)
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        lignes = VGroup()
        for morceaux in (("Calculer une puissance pas à pas.",),
                         ("Avec des parenthèses, la base négative est multipliée :",
                          "exposant pair, résultat positif ;", "exposant impair, résultat négatif."),
                         ("Sans parenthèses, le moins reste devant.",)):
            bloc = VGroup(*[self.t(x, 36) for x in morceaux]).arrange(DOWN, aligned_edge=LEFT, buff=0.1)
            lignes.add(VGroup(self.coche(), bloc).arrange(RIGHT, buff=0.25))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.32)
        if lignes.width > 11.8:
            lignes.scale_to_fit_width(11.8)
        if lignes.height > 3.6:
            lignes.scale_to_fit_height(3.6)
        lignes.move_to(P(-0.4, 0.85)).align_to(P(-6.1, 0), LEFT)
        ra = VGroup(avec_expo(facteur("2", 54, audit=False), 4, 54, audit=False), T("= 16", 54, VERT_OK, audit=False))
        rb = VGroup(avec_expo(facteur("2", 54, audit=False, paren=False), 4, 54, audit=False),
                    T("= −16", 54, VERT_OK, audit=False))
        for r in (ra, rb):
            r.arrange(RIGHT, buff=0.2)
        VGroup(ra, rb).arrange(RIGHT, buff=1.4).move_to(P(-1.0, -1.45))
        ep = VGroup(T("Épisode 3 :", 38, AMBRE), T("les puissances de 10", 38, AMBRE)).arrange(RIGHT, buff=0.2)
        ep.move_to(P(-1.0, -2.75))
        self.au_mot("Calculer une")
        self.montrer_ligne(lignes[0])
        self.au_mot("Avec des")
        self.montrer_ligne(lignes[1], FadeIn(ra, shift=UP * 0.2))
        self.au_mot("Sans parenthèses")
        self.montrer_ligne(lignes[2], FadeIn(rb, shift=UP * 0.2))
        self.au_mot("l'épisode 3")
        self.play(FadeIn(ep[0], shift=UP * 0.15), run_time=0.35)
        self.au_mot("puissances de 10")
        self.play(FadeIn(ep[1], shift=UP * 0.15), run_time=0.35)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_calculatrices()
        self.ecran_patissiere()
        self.ecran_question1()
        self.ecran_parentheses()
        self.ecran_sans()
        self.ecran_signes()
        self.ecran_question2()
        self.ecran_calculatrice()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class PuissanceCalculer4e(PuissanceCalculerBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "jaune"


class PuissanceCalculer3e(PuissanceCalculerBase):
    identite = "Maths 3e — EleveAI"
    ceinture = "jaune"
