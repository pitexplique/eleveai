# puissance_enchainer.py
# EleveAI — Maths 2de — série « Puissances », épisode 10 : ENCHAÎNER LES
# RÈGLES. Paysage 16:9, AVEC VOIX.
#   PuissanceEnchainer2de « Maths 2de — EleveAI », ceinture ORANGE.
#   (la base PuissanceEnchainerBase porte tout ; la sous-classe ne change
#   que l'identité et la ceinture)
# Micro couverte : 2de `puiss_expression_composee` (notion `puissances_2de`,
#   le contrôle commun : B = (7⁴ × 7⁻⁵) / (7³)⁴ sous la forme 7ⁿ) :
#   écran 02 l'énoncé ; écran 03 la check-list (puissance de puissance,
#   produit, quotient) ; écrans 04-05-06 une étape par ligne, la règle
#   appliquée s'allume dans la check-list et la ligne suivante DESCEND ;
#   écran 07 le piège « −1 − 12 » sur une droite graduée ; défi et correction
#   avec C = ((5²)³ × 5⁻⁴) / 5³.
# Code couleur constant : BLEU = la base, ORANGE = l'exposant, VERT = résultat
# juste, ROUGE = le piège (11 ou −11 au lieu de −13).
#
# Décor et métier : TRANSPORTS / AVIONS (une pilote de ligne et sa
# check-list avant le décollage). Centres : transports, avions.
#
# Écrans : garde (00) ; la pilote et sa check-list (01) ; l'énoncé B (02) ;
# la check-list (03) ; étape 1 (04) ; étape 2 (05) ; étape 3 (06) ;
# QUESTION (2⁵ × 2³) ÷ 2⁶ (06q) ; le piège −1 − 12 (07) ; QUESTION 3⁻² ÷ 3⁴
# (07q) ; défi C (08) et correction (08b) ; ce que tu as appris (09) ; fin (10).
#
# Voix : manim/voix/2de-puissance-enchainer.json (validée, débit −6), WAV dans
# public/sons/2de-puissance-enchainer/ ; marques : puissance_enchainer_marques.json
# (marques_dump.ps1, puis conversion PAR PAIRES : les « 7 puissance » répétés
# gardent chacun leur instant ; scripts/cues2marques.py non modifié).
# Outils : manim/scripts/6e/prop_commun.py, OutilsNotation / puiss / T de
# puissance_notation_scientifique.py et fracm / rangee / expo2 / eg / barre de
# puissance_produit_quotient.py (importés, non modifiés).
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/puissance_enchainer.py PuissanceEnchainer2de
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/puissance_enchainer.py PuissanceEnchainer2de -o eleveai-maths-seconde-puissance-enchainer --media_dir manim/scripts/4e/media-puiss-10-seconde
# Sortie : manim/sorties/seconde/maths/puissances/10-enchainer/eleveai-maths-seconde-puissance-enchainer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))  # le dossier du script EN TÊTE

from prop_commun import *  # noqa: E402,F403
from puissance_notation_scientifique import OutilsNotation, T, puiss, sans_audit  # noqa: E402
from puissance_produit_quotient import eg, expo2, fracm, rangee  # noqa: E402

BASE_C = BLEU_CALCUL       # la base
EXPO_C = ORANGE_RETENUE    # l'exposant
PIEGE = ROUGE_ERREUR
CIEL = "#93c5fd"
PAPIER = "#f1f5f9"
ENCRE = "#0f172a"


def ppar(b, e_in, e_out, fs=56, audit=True):
    """(bᵉ)ᶠ : la parenthèse, la puissance, l'exposant extérieur ;
    .lp .p .rp .out ; .base = la base (pour rangee)."""
    p = puiss(b, e_in, fs=fs, audit=audit)
    lp, rp = T("(", fs, WHITE, audit), T(")", fs, WHITE, audit)
    for par in (lp, rp):
        par.stretch_to_fit_height(p.height * 1.25)
    lp.next_to(p, LEFT, buff=0.05)
    rp.next_to(p, RIGHT, buff=0.05)
    for par in (lp, rp):
        par.set_y(p.get_y())
    out = T(str(e_out), fs * 0.6, EXPO_C, audit)
    out.next_to(rp, RIGHT, buff=0.03).align_to(rp, UP).shift(UP * 0.05)
    g = VGroup(lp, p, rp, out)
    g.lp, g.p, g.rp, g.out, g.base = lp, p, rp, out, p.base
    return g


def produit(a, b, fs=56):
    x = T("×", fs * 0.8, WHITE, audit=False)
    g = rangee(a, x, b, buff=0.22)
    g.a, g.x, g.b = a, x, b
    return g


def pilote(s=1.0):
    """Une pilote de ligne : veste bleu marine, casquette à galon doré."""
    p = personne(peau="#8d5524", tenue="#1e3a8a", cheveux="#111827", longs=True, s=s)
    t = p.tete
    r = t.width / 2
    calotte = RoundedRectangle(width=r * 2.3, height=r * 0.7, corner_radius=r * 0.15, fill_color="#0f172a",
                               fill_opacity=1, stroke_width=0).move_to(t.get_top() + UP * r * 0.12)
    galon = Rectangle(width=r * 2.3, height=r * 0.16, fill_color="#fbbf24", fill_opacity=1,
                      stroke_width=0).move_to(calotte.get_bottom() + UP * r * 0.12)
    visiere = Polygon(calotte.get_corner(DL), calotte.get_corner(DR) + RIGHT * r * 0.35,
                      calotte.get_corner(DR) + DOWN * r * 0.18, fill_color="#020617", fill_opacity=1, stroke_width=0)
    ailes = VGroup(*[Line(ORIGIN, RIGHT * r * 0.45, color="#fbbf24", stroke_width=5).rotate(a)
                     for a in (0.35, -0.35)]).arrange(RIGHT, buff=0.0)
    ailes.move_to(p.corps.get_top() + DOWN * r * 0.6 + LEFT * r * 0.55)
    p.add(calotte, galon, visiere, ailes)
    return p


def avion(s=1.0, c="#e2e8f0"):
    """Un avion de ligne de profil, le nez à DROITE."""
    fus = RoundedRectangle(width=3.0, height=0.5, corner_radius=0.25, fill_color=c, fill_opacity=1,
                           stroke_color="#64748b", stroke_width=2)
    nez = Polygon(P(1.35, 0.25), P(1.75, 0.0), P(1.35, -0.25), fill_color=c, fill_opacity=1,
                  stroke_color="#64748b", stroke_width=2)
    cockpit = Polygon(P(1.32, 0.12), P(1.6, 0.04), P(1.32, 0.02), fill_color="#1e3a8a", fill_opacity=1,
                      stroke_width=0)
    derive = Polygon(P(-1.45, 0.2), P(-1.25, 0.95), P(-0.95, 0.95), P(-0.85, 0.2), fill_color="#2563eb",
                     fill_opacity=1, stroke_width=0)
    aile = Polygon(P(-0.1, -0.05), P(0.5, -0.05), P(-0.35, -0.75), P(-0.65, -0.75), fill_color="#94a3b8",
                   fill_opacity=1, stroke_width=0)
    hublots = VGroup(*[Circle(radius=0.055, fill_color="#1e3a8a", fill_opacity=1, stroke_width=0)
                       .move_to(P(-0.9 + 0.25 * k, 0.07)) for k in range(9)])
    roues = VGroup(*[Circle(radius=0.08, fill_color="#111827", fill_opacity=1, stroke_width=0)
                     .move_to(P(x, -0.33)) for x in (-0.6, 1.1)])
    return VGroup(derive, fus, nez, cockpit, hublots, aile, roues).scale(s)


def planchette(w=3.6, h=3.0):
    """La planchette de la check-list : le bois, la feuille, la pince."""
    bois = RoundedRectangle(width=w, height=h, corner_radius=0.15, fill_color="#92400e", fill_opacity=1,
                            stroke_width=0)
    feuille = RoundedRectangle(width=w - 0.3, height=h - 0.45, corner_radius=0.06, fill_color=PAPIER,
                               fill_opacity=1, stroke_width=0).move_to(bois).shift(DOWN * 0.1)
    pince = RoundedRectangle(width=w * 0.35, height=0.3, corner_radius=0.08, fill_color="#94a3b8",
                             fill_opacity=1, stroke_width=0).move_to(bois.get_top() + DOWN * 0.08)
    g = VGroup(bois, feuille, pince)
    g.feuille = feuille
    return g


def case_vide(c=ENCRE, s=0.32):
    return Square(side_length=s, stroke_color=c, stroke_width=3, fill_opacity=0)


XEQ = -5.25        # le « = » de chaque ligne du calcul, en colonne
XC = -1.65         # le calcul des exposants, À CÔTÉ (aligné à gauche)
XP = 4.35          # le centre de la check-list (à droite)


class PuissanceEnchainerBase(OutilsNotation, PaysageProp):
    nom_voix = "2de-puissance-enchainer"
    fichier_marques = "puissance_enchainer_marques.json"
    identite = "Maths 2de — EleveAI"
    ceinture = "orange"

    FS_REP = 28  # UNE seule taille pour toute l'explication des questions-pauses

    def poser_idx(self, t, plan, rt=0.25, avec=None):
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
            self.au(ex, FadeIn(pc, shift=UP * 0.12), *((avec or {}).get(j, [])), rt=rt)
        return pieces

    def rep_ligne(self, i, morceaux):
        """La ligne i de la réponse, morceaux posés au mot, TOUJOURS à FS_REP."""
        ref = self.ph_q[i]
        lg = self.ligne([(m, VERT_OK) for m in morceaux], self.FS_REP, buff=0.14)
        lg.move_to(ref).align_to(ref, LEFT)
        for f in lg.get_family():
            f.sans_synchro = True
        if lg.get_right()[0] > 5.2:
            print(f"LARGE {morceaux} : {lg.get_right()[0]:.2f}", flush=True)
        return lg

    def rep_puiss(self, i, prefixe, b, e):
        """La ligne i de la réponse : « Réponse A : » + bᵉ COMPOSÉ, en vert."""
        ref = self.ph_q[i]
        pre = T(prefixe, self.FS_REP, VERT_OK)
        p = puiss(b, e, fs=self.FS_REP * 1.15, cb=VERT_OK, ce=VERT_OK)
        pt = T(".", self.FS_REP, VERT_OK)
        lg = VGroup(pre, p, pt).arrange(RIGHT, buff=0.15)
        p.base.align_to(pre, DOWN)
        p.expo.next_to(p.base, UR, buff=0.03).shift(DOWN * 0.2)
        pt.next_to(p.base, RIGHT, buff=0.04 + p.expo.width).align_to(pre, DOWN)
        lg.move_to(ref).align_to(ref, LEFT)
        lg.pre, lg.p, lg.pt = pre, p, pt
        return lg

    # ── outils du calcul en lignes ──────────────────────────────────────────
    def placer(self, expr, y, gauche=None):
        """« = expr » : le = dans la colonne XEQ, la ligne centrée sur y (le
        trait d'une fraction, sinon la base) ; gauche = un « B » devant."""
        e = eg(50)
        g = rangee(e, expr, buff=0.3)
        g.shift(RIGHT * (XEQ - e.get_x()))
        ref = expr.trait.get_y() if hasattr(expr, "trait") else expr.base.get_y()
        g.shift(UP * (y - ref))
        if gauche is not None:
            gauche.next_to(e, LEFT, buff=0.3).set_y(e.get_y())
            g.add(gauche)
        g.eg, g.expr = e, expr
        return g

    def cote(self, s, y, c=EXPO_C, fs=32):
        """Le calcul des exposants, écrit À CÔTÉ de la ligne (posé au mot)."""
        t = T(s, fs, c)
        t.move_to(P(0, y)).align_to(P(XC, 0), LEFT)
        if t.get_right()[0] > 1.85:
            print(f"LARGE côté {s} : {t.get_right()[0]:.2f}", flush=True)
        return t

    def regle1(self, fs=34):
        a = ppar("a", "m", "n", fs=fs)
        return rangee(a, eg(fs * 0.85), expo2("a", "m", "×n", fs=fs), buff=0.2)

    def regle2(self, fs=34):
        return rangee(puiss("a", "m", fs=fs), T("×", fs * 0.8, audit=False), puiss("a", "n", fs=fs),
                      eg(fs * 0.85), expo2("a", "m", "+n", fs=fs), buff=0.2)

    def regle3(self, fs=34):
        return rangee(puiss("a", "m", fs=fs), T("÷", fs * 0.8, audit=False), puiss("a", "n", fs=fs),
                      eg(fs * 0.85), expo2("a", "m", "−n", fs=fs), buff=0.2)

    def checklist(self, x=XP, y0=2.42, pas=1.14, w=4.6, h=1.05, fs=21):
        """La check-list : 3 cartes (numéro, mot, règle). .titre .items ;
        item.cadre .num .lab .regle. Rien n'est ajouté à la scène."""
        titre = T("La check-list", 30, JAUNE_TITRE).move_to(P(x, y0 + 0.86))
        items = VGroup()
        for k, (lab, rg) in enumerate((("puissances de puissances", self.regle1(31)),
                                       ("produits", self.regle2(31)), ("quotient", self.regle3(31)))):
            y = y0 - pas * k
            cadre = RoundedRectangle(width=w, height=h, corner_radius=0.12, fill_color="#0b1220", fill_opacity=1,
                                     stroke_color="#334155", stroke_width=2).move_to(P(x, y))
            disque = Circle(radius=0.21, fill_color="#1e293b", fill_opacity=1, stroke_color=CIEL, stroke_width=3)
            n = T(str(k + 1), 26, WHITE, audit=False)
            disque.move_to(P(x - w / 2 + 0.33, y))
            n.move_to(disque)
            t = T(lab, fs, WHITE, audit=False)
            t.move_to(P(0, y + 0.24)).align_to(P(x - w / 2 + 0.68, 0), LEFT)
            sans_audit(rg)
            rg.move_to(P(0, y - 0.2)).align_to(t, LEFT)
            for m in (t, rg):
                if m.get_right()[0] > x + w / 2 - 0.12:
                    print(f"LARGE check-list {lab} : {m.get_right()[0]:.2f}", flush=True)
            it = VGroup(cadre, VGroup(disque, n), t, rg)
            it.cadre, it.num, it.lab, it.regle = cadre, VGroup(disque, n), t, rg
            items.add(it)
        g = VGroup(titre, items)
        g.titre, g.items = titre, items
        return g

    def allumer(self, it, rt=0.35):
        """L'étape en cours : la carte s'allume (cadre jaune)."""
        self.play(it.cadre.animate.set_stroke(JAUNE_TITRE, width=5).set_fill("#1c1917", 1),
                  Indicate(it.num, color=JAUNE_TITRE, scale_factor=1.3), run_time=rt)

    def appliquer(self, it, rt=0.4):
        """La règle appliquée s'allume en orange (agrandir puis rétrécir)."""
        self.play(it.regle.animate.scale(1.25), run_time=rt / 2)
        self.play(it.regle.animate.scale(1 / 1.25), run_time=rt / 2)

    def cocher_anims(self, it):
        ck = self.coche(VERT_OK, 0.2).move_to(it.num)
        it.ck = ck
        return [it.cadre.animate.set_stroke(VERT_OK, width=4).set_fill("#052e16", 1), FadeOut(it.num[1]), Create(ck)]

    def cocher(self, it, rt=0.35):
        ck = self.coche(VERT_OK, 0.2).move_to(it.num)
        self.play(it.cadre.animate.set_stroke(VERT_OK, width=4).set_fill("#052e16", 1),
                  FadeOut(it.num[1]), Create(ck), run_time=rt)
        it.ck = ck
        return ck

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def bloc_p(self, s=0.5, expo=None):
        """Une « puissance » schématique : la base (carré bleu), l'exposant
        (petit carré orange, ou un « ? » orange)."""
        b = RoundedRectangle(width=s, height=s, corner_radius=s * 0.15, fill_color=BASE_C, fill_opacity=0.85,
                             stroke_width=0)
        if expo is None:
            e = RoundedRectangle(width=s * 0.42, height=s * 0.42, corner_radius=s * 0.08, fill_color=EXPO_C,
                                 fill_opacity=1, stroke_width=0)
        else:
            e = T(expo, 60 * s / 0.5, EXPO_C, audit=False)
        e.next_to(b, UR, buff=0.04).shift(DOWN * s * 0.25)
        return VGroup(b, e)

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Enchaîner les règles", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        sans_audit(ident)  # « Maths 2de » : l'identité, jamais dite
        self.au("Enchaîner", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.8)
        sym = lambda s: T(s, 56, WHITE, audit=False)  # noqa: E731
        row = VGroup(sym("("), self.bloc_p(), sym("×"), self.bloc_p(), sym(")"), self.bloc_p(expo=None), sym("÷"),
                     self.bloc_p(), sym("×"), self.bloc_p()).arrange(RIGHT, buff=0.22).move_to(P(-0.6, 0.55))
        self.au("longue", LaggedStart(*[FadeIn(m, shift=DOWN * 0.2) for m in row], lag_ratio=0.12), rt=1.0)
        seul = self.bloc_p(1.1, expo="?").move_to(P(-0.6, 0.55))
        self.au("une seule", ReplacementTransform(row, seul), rt=0.8)
        self.insister(seul[1], 1.5, 0.25, about=seul[1].get_center())
        self.attendre_voix(marge=0.6)

    # ── 01 : la pilote et sa check-list ────────────────────────────────────
    def ecran_pilote(self):
        self.ecran("01-pilote")
        piste = Line(P(1.3, -0.75), P(6.6, -0.75), color="#64748b", stroke_width=8)
        tirets = DashedLine(P(1.5, -0.75), P(6.4, -0.75), color=WHITE, stroke_width=2, dash_length=0.18)
        av = avion(0.72)
        av.next_to(piste, UP, buff=0.0).set_x(2.75)
        self.au("Avant", FadeIn(piste), FadeIn(tirets), FadeIn(av, shift=RIGHT * 0.4), rt=0.6)
        p = pilote(0.78).move_to(P(-5.15, -0.55))
        met = T("pilote de ligne", 26, CIEL).next_to(p, UP, buff=0.2)
        self.au("une pilote", FadeIn(p, shift=UP * 0.3), FadeIn(met, shift=UP * 0.1), rt=0.5)
        pl = planchette(4.5, 3.3).move_to(P(-0.95, 1.05))
        tl = T("Check-list", 30, ENCRE).move_to(pl.feuille.get_top() + DOWN * 0.38)
        self.au("check-list", FadeIn(pl, shift=UP * 0.3), FadeIn(tl), rt=0.5)
        rows = []
        for k, s in enumerate(("une étape à la fois", "dans l'ordre", "sans en sauter")):
            cv = case_vide()
            t = T(s, 25, ENCRE)
            r = VGroup(cv, t).arrange(RIGHT, buff=0.22)
            r.move_to(P(0, pl.feuille.get_top()[1] - 0.95 - 0.62 * k)).align_to(P(pl.feuille.get_left()[0] + 0.3, 0),
                                                                                  LEFT)
            if r.get_right()[0] > pl.feuille.get_right()[0] - 0.25:
                print(f"LARGE planchette {s}", flush=True)
            rows.append(r)
        for (cv, t), ex in zip(rows, ("une étape", "dans l'ordre", "sans en")):
            ck = self.coche(VERT_OK, 0.16).move_to(cv)
            self.au(ex, FadeIn(t, shift=RIGHT * 0.15), FadeIn(cv), rt=0.3)
            self.play(Create(ck), av.animate.shift(RIGHT * 0.55), run_time=0.35)
        l1 = T("Pour une longue expression de puissances,", 36).move_to(P(0, -2.45)).align_to(P(-6.3, 0), LEFT)
        l2 = T("on fait pareil.", 36, VERT_OK).move_to(P(0, -3.05)).align_to(P(-6.3, 0), LEFT)
        self.au("Pour une", FadeIn(l1, shift=RIGHT * 0.2), rt=0.4)
        self.au("pareil", FadeIn(l2, shift=RIGHT * 0.2), rt=0.35)
        self.play(av.animate.shift(RIGHT * 0.9 + UP * 1.5).rotate(0.3), run_time=0.9)
        self.attendre_voix(marge=0.5)

    # ── 02 : l'énoncé B (le contrôle commun) ───────────────────────────────
    def frac_B(self, fs=56, audit=True):
        num = produit(puiss(7, 4, fs=fs, audit=audit), puiss(7, "−5", fs=fs, audit=audit), fs)
        den = ppar(7, 3, 4, fs=fs, audit=audit)
        return fracm(num, den)

    def ecran_enonce(self):
        self.ecran("02-enonce")
        F = self.frac_B()
        self.lb = T("B", 52)
        L0 = self.placer(F, 2.5, gauche=self.lb)
        n, d = F.num, F.den
        self.au("Voici B", FadeIn(self.lb, scale=1.3), FadeIn(L0.eg), rt=0.35)
        self.au("7 puissance", FadeIn(n.a.base, scale=1.3), rt=0.3)
        self.au("4 fois", FadeIn(n.a.expo, scale=1.6), FadeIn(n.x), rt=0.3)
        self.au("7 puissance", FadeIn(n.b.base, scale=1.3), rt=0.3)
        self.au("moins", FadeIn(n.b.moins, scale=1.8), rt=0.2)
        self.au("5,", FadeIn(n.b.chif, scale=1.6), rt=0.25)
        self.au("le tout", Indicate(n, color=WHITE, scale_factor=1.1), rt=0.35)
        self.au("divisé", Create(F.trait), rt=0.3)
        self.au("7 puissance", FadeIn(d.p.base, scale=1.3), FadeIn(d.lp), rt=0.3)
        self.au("3,", FadeIn(d.p.expo, scale=1.6), rt=0.25)
        self.au("le tout puissance", FadeIn(d.rp, scale=1.3), rt=0.3)
        self.au("4.", FadeIn(d.out, scale=1.8), rt=0.3)
        self.insister(d.out, 1.6, 0.2, about=d.out.get_center())
        ov = T("On veut :", 30, CIEL).move_to(P(XP - 0.4, -1.05))
        bb, e7 = T("B", 46), eg(42)
        p7 = puiss(7, "n", fs=52)
        but = rangee(bb, e7, p7, buff=0.25).move_to(P(XP - 0.4, -1.75))
        self.au("On veut", FadeIn(ov, shift=RIGHT * 0.15), rt=0.35)
        self.au("B sous", FadeIn(bb, scale=1.3), rt=0.3)
        self.au("7 puissance", FadeIn(e7), FadeIn(p7.base, scale=1.3), rt=0.3)
        self.au("n.", FadeIn(p7.expo, scale=1.8), rt=0.3)
        cad = SurroundingRectangle(VGroup(ov, but), color=CIEL, buff=0.2, corner_radius=0.12, stroke_width=3)
        self.play(Create(cad), run_time=0.3)
        self.insister(p7.expo, 1.6, 0.2, about=p7.expo.get_center())
        self.L0, self.F0, self.but, self.but_n = L0, F, VGroup(ov, but, cad), p7.expo
        self.attendre_voix(marge=0.4)

    # ── 03 : la check-list (elle reste à droite pendant les trois étapes) ──
    def ecran_checklist(self):
        self.dire("03-checklist")
        ck = self.checklist()
        self.ck = ck
        self.au("La check-list", Write(ck.titre), rt=0.5)
        for it, (a, b) in zip(ck.items, (("Un :", "les puissances"), ("Deux :", "les produits"),
                                         ("Trois :", "le quotient"))):
            self.au(a, FadeIn(it.cadre), FadeIn(it.num, scale=1.4), rt=0.3)
            self.au(b, FadeIn(it.lab, shift=RIGHT * 0.15), FadeIn(it.regle, shift=UP * 0.1), rt=0.4)
        self.attendre_voix(marge=0.4)

    # ── 04-05-06 : une étape par ligne, la ligne suivante DESCEND ───────────
    def sous(self, g, prec, buff=0.3):
        """La ligne g posée SOUS la ligne prec."""
        g.shift(UP * (prec.get_bottom()[1] - buff - g.get_top()[1]))
        return g

    def pastille(self, k, ligne):
        d = Circle(radius=0.24, fill_color="#1e293b", fill_opacity=1, stroke_color=JAUNE_TITRE, stroke_width=3)
        n = T(str(k), 28, JAUNE_TITRE, audit=False)
        g = VGroup(d, n).move_to(P(XEQ - 1.05, ligne.eg.get_y()))
        n.move_to(d)
        return g

    def ecran_etape1(self):
        self.dire("04-etape1")
        it = self.ck.items[0]
        F0 = self.F0
        d = F0.den
        num1 = sans_audit(produit(puiss(7, 4, fs=56), puiss(7, "−5", fs=56), 56))
        den1 = puiss(7, 12, fs=56)
        F1 = fracm(num1, den1)
        L1 = self.sous(self.placer(F1, 0), self.L0)
        self.au("Étape un", rt=0.3)
        self.allumer(it)
        self.au("En bas", Indicate(d, color=WHITE, scale_factor=1.12), rt=0.4)
        self.au("7 puissance", Indicate(d.p.base, color=BASE_C, scale_factor=1.4), rt=0.3)
        self.au("le tout", Indicate(VGroup(d.lp, d.rp), color=WHITE, scale_factor=1.3), rt=0.3)
        self.au("on multiplie", rt=0.2)
        self.appliquer(it)
        c1 = self.cote("3 × 4 = 12", F1.trait.get_y())
        self.poser_idx(c1, [(0, "3 fois"), (4, "4,"), (6, "12.")],
                       avec={0: [Indicate(d.p.expo, color=EXPO_C, scale_factor=1.6)],
                             1: [Indicate(d.out, color=EXPO_C, scale_factor=1.6)]})
        self.au("7 puissance", FadeIn(L1.eg), TransformFromCopy(F0.num, num1), Create(F1.trait),
                TransformFromCopy(d.p.base, den1.base), rt=0.6)
        self.au("12.", ReplacementTransform(c1[-2:].copy(), den1.expo), rt=0.4)
        p1 = self.pastille(1, L1)
        self.play(FadeIn(p1, scale=1.4), run_time=0.25)
        self.cocher(it)
        self.L1, self.F1, self.c1 = L1, F1, c1
        self.attendre_voix(marge=0.3)

    def ecran_etape2(self):
        self.dire("05-etape2")
        it = self.ck.items[1]
        F1 = self.F1
        n = F1.num
        num2 = puiss(7, "−1", fs=56)
        den2 = sans_audit(puiss(7, 12, fs=56))
        F2 = fracm(num2, den2)
        L2 = self.sous(self.placer(F2, 0), self.L1)
        self.au("Étape deux", rt=0.3)
        self.allumer(it)
        self.au("En haut", Indicate(n, color=WHITE, scale_factor=1.12), rt=0.4)
        self.au("on additionne", rt=0.2)
        self.appliquer(it)
        c2 = self.cote("4 + (−5) = −1", F2.trait.get_y())
        self.poser_idx(c2, [(0, "4 plus"), (4, "moins"), (6, "5,"), (9, "moins 1"), (12, "1.")],
                       avec={0: [Indicate(n.a.expo, color=EXPO_C, scale_factor=1.6)],
                             1: [Indicate(n.b.expo, color=EXPO_C, scale_factor=1.6)]})
        self.au("7 puissance", FadeIn(L2.eg), TransformFromCopy(n.a.base, num2.base), Create(F2.trait),
                TransformFromCopy(F1.den, den2), rt=0.6)
        self.au("moins", FadeIn(num2.moins, scale=1.6), rt=0.25)
        self.au("1.", ReplacementTransform(c2[-1:].copy(), num2.chif), rt=0.4)
        p2 = self.pastille(2, L2)
        self.play(FadeIn(p2, scale=1.4), run_time=0.25)
        self.cocher(it)
        self.L2, self.F2 = L2, F2
        self.attendre_voix(marge=0.3)

    def ecran_etape3(self):
        self.dire("06-etape3")
        it = self.ck.items[2]
        F2 = self.F2
        res = puiss(7, "−13", fs=60)
        L3 = self.sous(self.placer(res, 0), self.L2, buff=0.35)
        self.au("Étape trois", rt=0.3)
        self.allumer(it)
        self.au("7 puissance", Indicate(F2.num, color=WHITE, scale_factor=1.25), rt=0.35)
        self.au("divisé", Indicate(F2.trait, color=WHITE, scale_factor=1.2), rt=0.3)
        self.au("12 :", Indicate(F2.den, color=WHITE, scale_factor=1.25), rt=0.35)
        self.au("on soustrait", rt=0.2)
        self.appliquer(it)
        c3 = self.cote("−1 − 12 = −13", L3.eg.get_y())
        self.poser_idx(c3, [(0, "moins 1 moins"), (1, "1 moins"), (3, "moins 12"), (5, "12,"), (8, "moins 13"),
                            (11, "13.")],
                       avec={1: [Indicate(F2.num.expo, color=EXPO_C, scale_factor=1.6)],
                             3: [Indicate(F2.den.expo, color=EXPO_C, scale_factor=1.6)]})
        self.au("B égale", FadeIn(L3.eg), Indicate(self.lb, color=JAUNE_TITRE, scale_factor=1.4), rt=0.4)
        self.au("7 puissance", TransformFromCopy(F2.num.base, res.base), rt=0.4)
        self.au("moins", FadeIn(res.moins, scale=1.6), rt=0.25)
        self.au("13.", ReplacementTransform(c3[-2:].copy(), res.chif), rt=0.4)
        cad = self.encadrer(res, buff=0.15)
        p3 = self.pastille(3, L3)
        self.play(Create(cad), FadeIn(p3, scale=1.4), run_time=0.3)
        self.cocher(it)
        n13 = T("−13", 31, VERT_OK, audit=False)
        n13.align_to(self.but_n, LEFT).align_to(self.but_n, DOWN)
        cad2 = SurroundingRectangle(VGroup(self.but[0], self.but[1][:2], n13), color=VERT_OK, buff=0.2,
                                    corner_radius=0.12, stroke_width=3)
        self.play(FadeOut(self.but_n, shift=UP * 0.1), FadeIn(n13, shift=UP * 0.1), Transform(self.but[2], cad2),
                  run_time=0.4)
        self.insister(VGroup(res, cad), 1.3, 0.25)
        self.attendre_voix(marge=0.5)

    # ── 06q : QUESTION 1 ((2⁵ × 2³) ÷ 2⁶) ──────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        F = fracm(produit(puiss(2, 5, fs=80), puiss(2, 3, fs=80), 80), puiss(2, 6, fs=80))
        F.move_to(P(-3.9, 1.45))
        f8 = sans_audit(fracm(puiss(2, 8, fs=60), puiss(2, 6, fs=60)))
        bon = sans_audit(puiss(2, 2, fs=70, cb=VERT_OK, ce=VERT_OK))
        e1, e2 = eg(56), eg(56)
        rangee(e1, f8, e2, bon, buff=0.3).move_to(P(-3.9, -1.25))
        choix = [puiss(2, 2, fs=44), puiss(2, 9, fs=44), puiss(2, 14, fs=44)]
        plans = [[("2 puissance", [choix[0].base]), ("2.", [choix[0].expo])],
                 [("2 puissance", [choix[1].base]), ("9.", [choix[1].expo])],
                 [("2 puissance", [choix[2].base]), ("14.", [choix[2].expo])]]
        n = F.num

        def avant(sc, q):
            sc.poser_idx(q[0], [(0, "2 puissance"), (2, "5 fois"), (4, "fois"), (6, "2 puissance"), (7, "3,"),
                                (10, "divisé"), (12, "2 puissance"), (13, "6 ?")],
                         avec={0: [FadeIn(n.a.base, scale=1.3)], 1: [FadeIn(n.a.expo, scale=1.6)],
                               2: [FadeIn(n.x)], 3: [FadeIn(n.b.base, scale=1.3)], 4: [FadeIn(n.b.expo, scale=1.6)],
                               5: [Create(F.trait)], 6: [FadeIn(F.den.base, scale=1.3)],
                               7: [FadeIn(F.den.expo, scale=1.6)]})

        def apres(sc):
            lg = sc.rep_puiss(0, "Réponse A :", 2, 2)
            sc.au("A :", FadeIn(lg.pre, shift=UP * 0.12), rt=0.25)
            sc.au("2 puissance", FadeIn(lg.p.base, shift=UP * 0.12), rt=0.25)
            sc.au("2.", FadeIn(lg.p.expo, lg.pt, shift=UP * 0.12), rt=0.25)
            sc.pieges(1, 2)
            l1 = sc.rep_ligne(1, ["5 +", "3 =", "8."])
            sc.au("5 plus", FadeIn(l1[0], shift=UP * 0.12), Indicate(n.a.expo, color=EXPO_C, scale_factor=1.6),
                  rt=0.3)
            sc.au("3,", FadeIn(l1[1], shift=UP * 0.12), Indicate(n.b.expo, color=EXPO_C, scale_factor=1.6), rt=0.3)
            sc.au("8.", FadeIn(l1[2], shift=UP * 0.12), FadeIn(e1), TransformFromCopy(n.a.base, f8.num.base),
                  FadeIn(f8.num.expo, scale=1.6), Create(f8.trait), TransformFromCopy(F.den, f8.den), rt=0.5)
            l2 = sc.rep_ligne(2, ["Puis", "8 −", "6 =", "2."])
            sc.au("Puis", FadeIn(l2[0], shift=UP * 0.12), rt=0.2)
            sc.au("8 moins", FadeIn(l2[1], shift=UP * 0.12), Indicate(f8.num.expo, color=EXPO_C, scale_factor=1.6),
                  rt=0.3)
            sc.au("6,", FadeIn(l2[2], shift=UP * 0.12), Indicate(f8.den.expo, color=EXPO_C, scale_factor=1.6),
                  rt=0.3)
            sc.au("2.", FadeIn(l2[3], shift=UP * 0.12), FadeIn(e2), FadeIn(bon, scale=1.3), rt=0.35)
            sc.insister(bon.expo, 1.6, 0.2, about=bon.expo.get_center())

        self.qpause("06q-question", "06r-reponse", ["(2⁵ × 2³) ÷ 2⁶ ?"], choix, plans, 0,
                    ["Réponse A : 2².", "5 + 3 = 8.", "Puis 8 − 6 = 2."], avant=avant, apres=apres)

    # ── 07 : le piège : −1 − 12 sur la droite graduée ──────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        tit = VGroup(T("Le piège", 44, PIEGE), T("le plus courant", 44, JAUNE_TITRE)).arrange(RIGHT, buff=0.25)
        tit.move_to(P(-0.4, 3.15))
        self.au("Le piège", FadeIn(tit[0], shift=DOWN * 0.15), rt=0.35)
        u, x0, y = 0.78, 4.82, 0.3
        X = lambda v: x0 + v * u  # noqa: E731
        axe = Arrow(P(X(-14.3), y), P(X(1.5), y), buff=0, color=WHITE, stroke_width=3, tip_length=0.2)
        gr = VGroup(*[Line(P(X(v), y - 0.1), P(X(v), y + 0.1), color=WHITE, stroke_width=2) for v in range(-14, 2)])
        z = T("0", 26, WHITE, audit=False).next_to(P(X(0), y - 0.1), DOWN, buff=0.12)
        ex = T("−1 − 12", 64).move_to(P(3.7, 2.3))
        self.au("courant", FadeIn(tit[1], shift=DOWN * 0.15), Create(axe), FadeIn(gr), FadeIn(z), rt=0.45)
        dep = Dot(P(X(-1), y), radius=0.11, color=EXPO_C)
        lm1 = T("−1", 26, EXPO_C).next_to(P(X(-1), y - 0.1), DOWN, buff=0.12)
        arc = CurvedArrow(P(X(-1), y + 0.15), P(X(-13), y + 0.15), angle=PI * 0.3, color=EXPO_C, stroke_width=4,
                          tip_length=0.18)
        l12 = T("12 vers la gauche", 28, EXPO_C, audit=False)
        l12.next_to(arc, UP, buff=0.1)
        self.poser_idx(ex, [(0, "moins 1"), (1, "1 moins"), (3, "moins 12"), (5, "12.")],
                       avec={1: [FadeIn(dep, scale=1.5), FadeIn(lm1)], 2: [Create(arc)],
                             3: [FadeIn(l12, shift=DOWN * 0.1)]})
        x11 = T("11", 60, PIEGE).move_to(P(-4.6, -1.3))
        xm11 = T("−11", 60, PIEGE).move_to(P(-2.0, -1.3))
        b13 = T("−13", 66, VERT_OK).move_to(P(0.9, -1.3))
        d11 = Dot(P(X(-11), y), radius=0.1, color=PIEGE)
        lm11 = T("−11", 26, PIEGE, audit=False).next_to(P(X(-11), y - 0.1), DOWN, buff=0.12)
        self.au("11,", FadeIn(x11, scale=1.3), rt=0.3)
        self.play(Create(Line(x11.get_corner(DL), x11.get_corner(UR), color=WHITE, stroke_width=6)), run_time=0.25)
        self.au("11 :", FadeIn(xm11, scale=1.3), FadeIn(d11, scale=1.5), FadeIn(lm11), rt=0.3)
        self.play(Create(Line(xm11.get_corner(DL), xm11.get_corner(UR), color=WHITE, stroke_width=6)), run_time=0.25)
        d13 = Dot(P(X(-13), y), radius=0.12, color=VERT_OK)
        lm13 = T("−13", 26, VERT_OK, audit=False).next_to(P(X(-13), y - 0.1), DOWN, buff=0.12)
        self.au("13.", FadeIn(b13, scale=1.4), FadeIn(d13, scale=1.6), FadeIn(lm13), rt=0.4)
        cad = self.encadrer(b13, buff=0.15)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(b13, cad), 1.3, 0.25)
        e1 = T("Écris le calcul des exposants à côté,", 34).move_to(P(0, -2.5)).align_to(P(-6.3, 0), LEFT)
        e2 = T("sans te presser.", 34).move_to(P(0, -3.1)).align_to(P(-6.3, 0), LEFT)
        cc = T("−1 − 12 = −13", 34, EXPO_C, audit=False)
        cc.next_to(e2, RIGHT, buff=0.6).align_to(e2, DOWN)
        self.au("Écris", FadeIn(e1, shift=RIGHT * 0.2), rt=0.35)
        self.au("à côté", FadeIn(cc, shift=LEFT * 0.2), rt=0.35)
        self.au("sans te", FadeIn(e2, shift=RIGHT * 0.2), rt=0.35)
        self.attendre_voix(marge=0.4)

    # ── 07q : QUESTION 2 (3⁻² ÷ 3⁴) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        F = fracm(puiss(3, "−2", fs=100), puiss(3, 4, fs=100))
        F.move_to(P(-4.4, 1.35))
        r = sans_audit(puiss(3, "−2−4", fs=72))
        r.e1, r.e2 = VGroup(r.moins, r.chif[0]), VGroup(*r.chif[1:])
        bon = sans_audit(puiss(3, "−6", fs=76, cb=VERT_OK, ce=VERT_OK))
        e1, e2 = eg(60), eg(60)
        rangee(e1, r, e2, bon, buff=0.3).move_to(P(-3.7, -1.0))
        choix = [puiss(3, 2, fs=44), puiss(3, "−6", fs=44), puiss(3, "−2", fs=44)]
        plans = [[("3 puissance", [choix[0].base]), ("2.", [choix[0].expo])],
                 [("3 puissance", [choix[1].base]), ("moins", [choix[1].moins]), ("6.", [choix[1].chif])],
                 [("3 puissance", [choix[2].base]), ("moins", [choix[2].moins]), ("2.", [choix[2].chif])]]

        def avant(sc, q):
            sc.poser_idx(q[0], [(0, "3 puissance"), (1, "moins"), (2, "2 divisé"), (4, "divisé"), (6, "3 puissance"),
                                (7, "4 ?")],
                         avec={0: [FadeIn(F.num.base, scale=1.3)], 1: [FadeIn(F.num.moins, scale=1.6)],
                               2: [FadeIn(F.num.chif, scale=1.6)], 3: [Create(F.trait)],
                               4: [FadeIn(F.den.base, scale=1.3)], 5: [FadeIn(F.den.expo, scale=1.6)]})

        def apres(sc):
            lg = sc.rep_puiss(0, "Réponse B :", 3, "−6")
            sc.au("B :", FadeIn(lg.pre, shift=UP * 0.12), rt=0.25)
            sc.au("3 puissance", FadeIn(lg.p.base, shift=UP * 0.12), rt=0.25)
            sc.au("moins", FadeIn(lg.p.moins, scale=1.5), rt=0.2)
            sc.au("6.", FadeIn(lg.p.chif, lg.pt, shift=UP * 0.12), rt=0.25)
            sc.pieges(0, 2)
            l1 = sc.rep_ligne(1, ["−2", "− 4 =", "−6."])
            sc.au("2 moins", FadeIn(l1[0], shift=UP * 0.12), FadeIn(e1), TransformFromCopy(F.num.base, r.base),
                  TransformFromCopy(F.num.expo, r.e1), rt=0.4)
            sc.au("4,", FadeIn(l1[1], shift=UP * 0.12), TransformFromCopy(F.den.expo, r.e2), rt=0.4)
            sc.au("6.", FadeIn(l1[2], shift=UP * 0.12), FadeIn(e2), FadeIn(bon, scale=1.3), rt=0.35)
            sc.insister(bon.expo, 1.6, 0.2, about=bon.expo.get_center())

        self.qpause("07q-question", "07r-reponse", ["3⁻² ÷ 3⁴ ?"], choix, plans, 1,
                    ["Réponse B : 3⁻⁶.", "−2 − 4 = −6."], avant=avant, apres=apres)

    # ── 08 : défi : C = ((5²)³ × 5⁻⁴) ÷ 5³ ──────────────────────────────────
    def frac_C(self, fs=60, audit=True):
        a = ppar(5, 2, 3, fs=fs, audit=audit)
        sans_audit(a.out)  # « au cube » : le 3 de l'exposant extérieur
        num = produit(a, puiss(5, "−4", fs=fs, audit=audit), fs)
        return fracm(num, puiss(5, 3, fs=fs, audit=audit))

    def ecran_defi(self):
        self.ecran("08-defi", 0.5)
        tit = T("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.12))
        self.au("À toi", Write(tit), rt=0.6)
        pl = planchette(2.6, 2.9).move_to(P(-5.0, -0.2))
        cases = VGroup()
        for k in range(3):
            cv = case_vide(ENCRE, 0.34)
            n = T(str(k + 1), 28, ENCRE, audit=False)
            cases.add(VGroup(n, cv).arrange(RIGHT, buff=0.25))
        cases.arrange(DOWN, buff=0.38).move_to(pl.feuille)
        self.play(FadeIn(pl, shift=UP * 0.3), FadeIn(cases), run_time=0.5)
        c1 = T("Écris C sous la forme", 38)
        p5 = puiss(5, "n", fs=56)
        l1 = VGroup(c1, p5).arrange(RIGHT, buff=0.25).move_to(P(0.9, 2.05))
        p5.shift(UP * (c1.get_bottom()[1] - p5.base.get_bottom()[1]))
        self.au("Écris", FadeIn(c1, shift=RIGHT * 0.2), rt=0.35)
        self.au("5 puissance", FadeIn(p5.base, scale=1.3), rt=0.3)
        self.au("n.", FadeIn(p5.expo, scale=1.6), rt=0.3)
        F = self.frac_C(fs=64)
        L = rangee(T("C", 56), eg(56), F, buff=0.3).move_to(P(0.9, -0.15))
        a, b = F.num.a, F.num.b
        self.au("C égale", FadeIn(L[0], scale=1.3), FadeIn(L[1]), rt=0.35)
        self.au("5 puissance", FadeIn(a.p.base, scale=1.3), FadeIn(a.lp), rt=0.3)
        self.au("2,", FadeIn(a.p.expo, scale=1.6), rt=0.25)
        self.au("au cube", FadeIn(a.rp, scale=1.3), FadeIn(a.out, scale=1.8), rt=0.35)
        self.au("fois", FadeIn(F.num.x), rt=0.25)
        self.au("5 puissance", FadeIn(b.base, scale=1.3), rt=0.3)
        self.au("moins", FadeIn(b.moins, scale=1.8), rt=0.2)
        self.au("4,", FadeIn(b.chif, scale=1.6), rt=0.25)
        self.au("divisé", Indicate(F.num, color=WHITE, scale_factor=1.08), Create(F.trait), rt=0.35)
        self.au("5 puissance", FadeIn(F.den.base, scale=1.3), rt=0.3)
        self.au("3.", FadeIn(F.den.expo, scale=1.6), rt=0.3)
        self.au("Mets pause")
        pz = T("Mets pause, et cherche !", 36, ORANGE_RETENUE).move_to(P(0.9, -2.55))
        self.play(Write(pz), Indicate(cases, color=EXPO_C, scale_factor=1.1), run_time=0.8)
        self.attendre_voix(marge=2.0)

    # ── 08b : correction : trois lignes qui descendent, la check-list cochée ─
    def ecran_correction(self):
        self.ecran("08b-correction", 0.5)
        ck = self.checklist()
        F0 = self.frac_C(fs=56, audit=False)
        L0 = self.placer(F0, 2.5, gauche=T("C", 52, audit=False))
        self.au("Correction", FadeIn(L0), FadeIn(ck), rt=0.5)
        it1, it2, it3 = ck.items
        a = F0.num.a
        # étape 1 : (5²)³ = 5⁶
        n1 = sans_audit(produit(puiss(5, 6, fs=56), puiss(5, "−4", fs=56), 56))
        F1 = fracm(n1, sans_audit(puiss(5, 3, fs=56)))
        L1 = self.sous(self.placer(F1, 0), L0)
        self.au("Étape un", rt=0.2)
        self.allumer(it1)
        self.au("5 puissance", Indicate(a, color=WHITE, scale_factor=1.15), rt=0.35)
        c1 = self.cote("2 × 3 = 6", F1.trait.get_y())
        self.poser_idx(c1, [(0, "2 fois"), (4, "3,"), (6, "6.")],
                       avec={0: [Indicate(a.p.expo, color=EXPO_C, scale_factor=1.6)],
                             1: [Indicate(a.out, color=EXPO_C, scale_factor=1.6)],
                             2: [FadeIn(L1.eg), TransformFromCopy(a.p.base, n1.a.base), FadeIn(n1.x),
                                 TransformFromCopy(F0.num.b, n1.b), Create(F1.trait), TransformFromCopy(F0.den, F1.den),
                                 ReplacementTransform(c1[-1:].copy(), n1.a.expo),
                                 FadeIn(self.pastille(1, L1), scale=1.4), *self.cocher_anims(it1)]})
        # étape 2 : 5⁶ × 5⁻⁴ = 5²
        n2 = puiss(5, 2, fs=56)
        sans_audit(n2.base)
        F2 = fracm(n2, sans_audit(puiss(5, 3, fs=56)))
        L2 = self.sous(self.placer(F2, 0), L1)
        self.au("Étape deux", rt=0.2)
        self.allumer(it2)
        self.au("5 puissance", Indicate(n1, color=WHITE, scale_factor=1.12), rt=0.35)
        c2 = self.cote("6 + (−4) = 2", F2.trait.get_y())
        self.poser_idx(c2, [(0, "6 plus"), (4, "moins"), (6, "4,"), (9, "2.")],
                       avec={0: [Indicate(n1.a.expo, color=EXPO_C, scale_factor=1.6)],
                             2: [Indicate(n1.b.expo, color=EXPO_C, scale_factor=1.6)],
                             3: [FadeIn(L2.eg), TransformFromCopy(n1.a.base, n2.base), Create(F2.trait),
                                 TransformFromCopy(F1.den, F2.den), ReplacementTransform(c2[-1:].copy(), n2.expo),
                                 FadeIn(self.pastille(2, L2), scale=1.4), *self.cocher_anims(it2)]})
        # étape 3 : 5² ÷ 5³ = 5⁻¹
        res = puiss(5, "−1", fs=60)
        L3 = self.sous(self.placer(res, 0), L2, buff=0.35)
        self.au("Étape trois", rt=0.2)
        self.allumer(it3)
        self.au("5 puissance", Indicate(F2, color=WHITE, scale_factor=1.12), rt=0.35)
        c3 = self.cote("2 − 3 = −1", L3.eg.get_y())
        self.poser_idx(c3, [(0, "2 moins"), (2, "moins 3"), (4, "3,"), (6, "moins 1"), (9, "1.")],
                       avec={0: [Indicate(F2.num.expo, color=EXPO_C, scale_factor=1.6)],
                             2: [Indicate(F2.den.expo, color=EXPO_C, scale_factor=1.6)]})
        self.au("C égale", FadeIn(L3.eg), Indicate(L0[-1], color=JAUNE_TITRE, scale_factor=1.4), rt=0.35)
        self.au("5 puissance", TransformFromCopy(F2.num.base, res.base), rt=0.35)
        self.au("moins", FadeIn(res.moins, scale=1.6), rt=0.2)
        self.au("1.", ReplacementTransform(c3[-1:].copy(), res.chif), rt=0.35)
        cad = self.encadrer(res, buff=0.15)
        self.play(Create(cad), FadeIn(self.pastille(3, L3), scale=1.4), run_time=0.3)
        self.cocher(it3, 0.3)
        self.insister(VGroup(res, cad), 1.3, 0.25)
        self.attendre_voix(marge=0.5)

    # ── 09 : ce que tu as appris ───────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.5)
        tit = T("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.au("Ce que", Write(tit), rt=0.7)
        X0 = -6.0
        c0 = self.coche()
        l0 = VGroup(c0, T("Réduire dans l'ordre :", 36, CIEL)).arrange(RIGHT, buff=0.3)
        l0.move_to(P(0, 2.2)).align_to(P(X0, 0), LEFT)
        self.au("Réduire", Create(c0), FadeIn(l0[1], shift=RIGHT * 0.2), rt=0.4)
        regles = (self.regle1(32), self.regle2(32), self.regle3(32))
        for k, (txt, ex) in enumerate((("les puissances de puissances,", "les puissances"),
                                       ("puis les produits,", "puis les produits"),
                                       ("puis le quotient.", "puis le quotient"))):
            d = Circle(radius=0.21, fill_color="#1e293b", fill_opacity=1, stroke_color=JAUNE_TITRE, stroke_width=3)
            n = T(str(k + 1), 26, JAUNE_TITRE, audit=False).move_to(d)
            t = T(txt, 30)
            lg = VGroup(VGroup(d, n), t).arrange(RIGHT, buff=0.25)
            lg.move_to(P(0, 1.5 - 0.68 * k)).align_to(P(X0 + 0.7, 0), LEFT)
            rg = sans_audit(regles[k]).move_to(P(4.2, lg.get_y()))
            self.au(ex, FadeIn(lg, shift=RIGHT * 0.15), FadeIn(rg, shift=LEFT * 0.15), rt=0.4)
        c1 = self.coche()
        l1 = VGroup(c1, T("Écrire le calcul des exposants à côté.", 36)).arrange(RIGHT, buff=0.3)
        l1.move_to(P(0, -0.75)).align_to(P(X0, 0), LEFT)
        self.au("Écrire", Create(c1), FadeIn(l1[1], shift=RIGHT * 0.2), rt=0.4)
        c2 = self.coche(PIEGE)
        l2 = VGroup(c2, T("Vérifier les signes moins.", 36, PIEGE)).arrange(RIGHT, buff=0.3)
        l2.move_to(P(0, -1.5)).align_to(P(X0, 0), LEFT)
        self.au("Vérifier", Create(c2), FadeIn(l2[1], shift=RIGHT * 0.2), rt=0.4)
        l3 = T("Alors les défis t'attendent.", 38, JAUNE_TITRE).move_to(P(-0.6, -2.6))
        self.au("Alors", FadeIn(l3, shift=UP * 0.2), rt=0.45)
        self.insister(l3, 1.15, 0.25)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_pilote()
        self.ecran_enonce()
        self.ecran_checklist()
        self.ecran_etape1()
        self.ecran_etape2()
        self.ecran_etape3()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PuissanceEnchainer2de(PuissanceEnchainerBase):
    identite = "Maths 2de — EleveAI"
    ceinture = "orange"
