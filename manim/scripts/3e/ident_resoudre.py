# ident_resoudre.py
# EleveAI — Maths 3e — série IDENTITÉS REMARQUABLES, épisode 08 : RÉSOUDRE EN FACTORISANT.
# Paysage 16:9, AVEC VOIX, ceinture VERTE.
# Micro : equation_carre_factoriser (3e, notion equation_resolution), TOUS les écrans ; il s'appuie sur
# equation_produit_nul et litteral_identite.
# Métier : Tom, photographe. Centres : reseaux-sociaux, art-design.
# Écrans : garde (00) ; Tom et sa photo carrée de 9 dm², côté x : x² = 9 (01) ; tout à gauche,
# x² − 9 = 0, a² − b², (x − 3)(x + 3) = 0 (02) ; le produit nul, deux branches, x = 3 ou x = −3,
# −3 barré : la photo mesure 3 dm (03) ; QUESTION 1 (03q, x² − 49 = 0, réponse B) ; le cadre blanc de
# 1 dm : grand carré x, photo x − 2, (x − 2)² = 25 (04) ; (x − 2)² − 25 = 0, a = x − 2 encadré, b = 5,
# (x − 7)(x + 3) = 0 (05) ; produit nul, x = 7 ou x = −3, on garde 7, vérification 5² = 25 (06) ;
# QUESTION 2 (06q, la copie « x − 2 = 5 donc x = 7 », réponse C) ; défi x² − 16 = 0 et (x + 1)² = 36
# (07) et correction (07b) ; ce que tu as appris (08) ; la fin commune (09, manim/fin_commune.py).
# Code couleur : x bleu ; a² bleu, b² violet ; juste vert ; piège rouge ; ce qu'on déplace orange.
# Voix : manim/voix/3e-identites-resoudre.json (validée) ; marques : ident_resoudre_marques.json.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/3e/ident_resoudre.py IdentResoudre3e --media_dir manim/scripts/3e/media-ident-08-audit
# Rendu : PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/3e/ident_resoudre.py IdentResoudre3e -o eleveai-maths-3e-identites-resoudre --media_dir manim/scripts/3e/media-ident-08
# Sortie : manim/sorties/3e/maths/expression-litterale/08-resoudre-identite/eleveai-maths-3e-identites-resoudre.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parent / "4e"))  # relatif_commun, equation_commun, ident_choisir
sys.path.insert(0, str(ICI))

from relatif_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from fin_commune import ecran_fin  # noqa: E402
from ident_choisir import D, idx, IdentChoisir4e  # noqa: E402

PAROLE["²"] = "carré"

CARRE_A = "#93c5fd"  # a² (bleu clair, lisible sur le fond)
CARRE_B = "#c4b5fd"  # b² (violet clair)
DEPLACE = OPERATION  # ce qu'on ramène à gauche (orange)
ENCRE = "#1e293b"  # l'encre de la copie
GRIS = "#94a3b8"


def photo(c, centre=ORIGIN):
    """Une photo carrée de côté c : le ciel, le soleil, deux montagnes (une enneigée), le pré."""
    ciel = Square(c, fill_color="#38bdf8", fill_opacity=1, stroke_width=0)
    soleil = Circle(radius=0.12 * c, fill_color="#fde047", fill_opacity=1, stroke_width=0).move_to(P(0.27 * c, 0.27 * c))
    m2 = Polygon(P(-0.05 * c, -0.2 * c), P(0.25 * c, 0.1 * c), P(0.5 * c, -0.2 * c), fill_color="#64748b",
                 fill_opacity=1, stroke_width=0)
    m1 = Polygon(P(-0.5 * c, -0.2 * c), P(-0.14 * c, 0.24 * c), P(0.22 * c, -0.2 * c), fill_color="#475569",
                 fill_opacity=1, stroke_width=0)
    neige = Polygon(P(-0.23 * c, 0.13 * c), P(-0.14 * c, 0.24 * c), P(-0.05 * c, 0.13 * c), fill_color=WHITE,
                    fill_opacity=1, stroke_width=0)
    pre = Rectangle(width=c, height=0.3 * c, fill_color="#16a34a", fill_opacity=1, stroke_width=0).move_to(P(0, -0.35 * c))
    bord = Square(c, stroke_color=WHITE, stroke_width=3, fill_opacity=0)
    g = VGroup(ciel, soleil, m2, m1, neige, pre, bord).move_to(centre)
    g.bord = bord
    return g


def photo_encadree(cote, bande, centre=ORIGIN):
    """La photo dans son cadre blanc : .cadre (le grand carré), .photo (la photo, côté cote − 2·bande)."""
    cadre = Square(cote, fill_color="#f8fafc", fill_opacity=1, stroke_color="#cbd5e1", stroke_width=3)
    ph = photo(cote - 2 * bande)
    g = VGroup(cadre, ph).move_to(centre)
    g.cadre, g.photo = cadre, ph
    return g


def tom(s=0.8):
    """Tom, photographe : un appareil photo sur la poitrine, sa sangle autour du cou."""
    m = Metier(["Tom", "photographe"], fs=38, peau="#e0ac69", tenue="#0f766e", cheveux="#3f2a14", s=s)
    m.nom.arrange(DOWN, buff=0.12)
    p = m.perso
    c = p.corps.get_center() + UP * 0.3 * s
    boitier = RoundedRectangle(width=0.7 * s, height=0.44 * s, corner_radius=0.07 * s, fill_color="#1f2937",
                               fill_opacity=1, stroke_color="#e2e8f0", stroke_width=2).move_to(c)
    objectif = Circle(radius=0.14 * s, fill_color="#0ea5e9", fill_opacity=1, stroke_color="#e2e8f0",
                      stroke_width=3).move_to(c)
    flash = Rectangle(width=0.18 * s, height=0.09 * s, fill_color="#e2e8f0", fill_opacity=1,
                      stroke_width=0).next_to(boitier, UP, buff=0).shift(LEFT * 0.17 * s)
    t = p.tete.get_bottom()
    sangle = VGroup(Line(t + LEFT * 0.2 * s, boitier.get_corner(UL), color="#f59e0b", stroke_width=3),
                    Line(t + RIGHT * 0.2 * s, boitier.get_corner(UR), color="#f59e0b", stroke_width=3))
    p.add(sangle, boitier, objectif, flash)
    return m


def feuille(w, h, centre=ORIGIN):
    """La copie d'un élève : papier clair, lignes bleues, marge rouge."""
    f = Rectangle(width=w, height=h, fill_color="#fefce8", fill_opacity=1, stroke_color="#e2e8f0", stroke_width=2)
    lignes = VGroup(*[Line(P(-w / 2 + 0.1, y), P(w / 2 - 0.1, y), color="#93c5fd", stroke_width=1.5)
                      for y in [h / 2 - 0.45 - 0.5 * k for k in range(int((h - 0.5) / 0.5))]])
    marge = Line(P(-w / 2 + 0.55, h / 2), P(-w / 2 + 0.55, -h / 2), color="#f87171", stroke_width=2)
    g = VGroup(f, lignes, marge).move_to(centre)
    g.fond = f
    return g


class IdentResoudre3e(PaysageRel):
    nom_voix = "3e-identites-resoudre"
    fichier_marques = "ident_resoudre_marques.json"
    identite = "Maths 3e — EleveAI"
    ceinture = "verte"

    cadre = IdentChoisir4e.cadre
    dit_avec = IdentChoisir4e.dit_avec
    finale_gauche = IdentChoisir4e.finale_gauche
    pastille = IdentChoisir4e.pastille

    def lg(self, s, x, y, fs=40, c=WHITE, lettres="", maxw=None):
        """Une ligne de phrase ; si elle doit rétrécir, on le dit (il faut la couper)."""
        e = E(s, fs, c, lettres=lettres)
        lim = maxw or 2 * min(6.45 - x, x + 6.45)
        if e.width > lim:
            print(f"RETRECI « {s} » {e.width:.2f} > {lim:.2f}", flush=True)
            e.scale_to_fit_width(lim)
        return e.move_to(P(x, y))

    def dit_tout(self, e, phrase, avec=(), gestes=None):
        """Comme dit / dit_avec, puis les atomes jamais dits (« dm² » en fin de ligne) suivent aussitôt."""
        if gestes:
            self.dit_avec(e, phrase, gestes)
        else:
            self.dit(e, phrase, avec=avec)
        vus = {id(m) for m in self.mobjects}
        reste = [a for a in e.atomes if id(a) not in vus]
        if reste:
            self.play(*[FadeIn(a) for a in reste], run_time=0.15)
        return e

    def _disposer_q(self, question, choix, phrase):
        """22/11 (relecture -ql) : l'énoncé en 36 pt (lignes courtes), les choix en 34 pt dans des cartes
        à leur mesure (une place pour la coche à droite), la réponse en 36 pt (placée par monter_reponse)."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        xl = self.XL
        if len(q.submobjects):
            q.scale(T(question[0], 36, audit=False).height / q[0].height)
            q.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
            q.next_to(tete, DOWN, buff=0.22).align_to(P(xl, 0), LEFT)
        for c in cartes:
            corps = c[1][1]
            if hasattr(corps, "s"):
                c[1].scale(Eq(corps.s, 34, lettres="").height / corps.height)
        larg = min(6.4 - xl, max(c[1].width for c in cartes) + 1.2)
        for c in cartes:
            ligne = c[1]
            if ligne.width > larg - 1.2:
                ligne.scale_to_fit_width(larg - 1.2)
            c[0].become(RoundedRectangle(width=larg, height=ligne.height + 0.32, corner_radius=0.14,
                                         stroke_color=BLEU_CALCUL, stroke_width=3, fill_color="#0b1220",
                                         fill_opacity=1))
            ligne.move_to(c[0]).align_to(c[0].get_left() + RIGHT * 0.2, LEFT)
        cartes.arrange(DOWN, buff=0.16).next_to(q, DOWN, buff=0.3).align_to(P(xl, 0), LEFT)
        pause.next_to(cartes, DOWN, buff=0.22).align_to(P(xl, 0), LEFT)
        if len(ph.submobjects):
            ph.scale(T(phrase[0], 36, audit=False).height / ph[0].height)
        ph.arrange(DOWN, aligned_edge=LEFT, buff=0.16)
        ph.next_to(cartes[0], DOWN, buff=0.25).align_to(P(xl, 0), LEFT)
        return tete, q, cartes, pause, rebours, ph

    def monter_reponse(self, bonne):
        """Après le ✓ : les mauvaises cartes s'effacent, la bonne prend la place de A ; la réponse en 36 pt
        dessous, jamais sur Ti-Margo."""
        cartes, ph = self.cartes_q, self.ph_q
        b = cartes[bonne]
        ok = self.mobjects[-1]  # la coche, posée juste avant autres_r
        d = cartes[0].get_center() - b.get_center()
        anims = [FadeOut(cartes[j]) for j in range(3) if j != bonne]
        if bonne != 0:
            anims.append(b.animate.shift(d))
            if ok is not b and ok not in b.get_family():
                anims.append(ok.animate.shift(d))
        self.play(*anims, run_time=0.25)
        haut = cartes[0].get_bottom()[1] - 0.25
        ph.align_to(P(self.XL, 0), LEFT).align_to(P(0, haut), UP)
        if ph.get_bottom()[1] < -3.3:
            ph.scale((haut + 3.3) / ph.height, about_point=P(self.XL, haut))
        if ph.get_right()[0] > 5.1:
            ph.scale((5.1 - self.XL) / ph.width, about_point=P(self.XL, haut))

    def accolade(self, m, s, couleur, direction=DOWN, fs=34):
        b = Brace(m, direction, color=couleur, buff=0.08)
        t = D(s, fs, couleur, lettres="", audit=False).next_to(b, direction, buff=0.08)
        return VGroup(b, t)

    def fleche_vers(self, a, b, couleur=JAUNE_TITRE):
        return Arrow(a.get_bottom(), b.get_top(), buff=0.1, color=couleur, stroke_width=5,
                     max_tip_length_to_length_ratio=0.2)

    def deux_branches(self, rap, y1, y2, cotes, phrases, xs):
        """Le produit nul : deux flèches des facteurs vers « … = 0 ou … = 0 », puis les deux solutions.
        cotes = (« x − a = 0 », « x + b = 0 », « x = … », « x = … ») ; phrases : leurs extraits de voix ;
        renvoie les quatre lignes."""
        f1, f2 = VGroup(*rap.atomes[0:5]), VGroup(*rap.atomes[5:10])
        e1 = D(cotes[0], 52).move_to(P(xs[0], y1))
        e2 = D(cotes[1], 52).move_to(P(xs[2], y1))
        ou1 = T("ou", 40, JAUNE_TITRE).move_to(P(xs[1], y1))
        fl1, fl2 = self.fleche_vers(f1, e1), self.fleche_vers(f2, e2)
        self.dire_eq(e1, phrases[0], echelle=1.15, avec=[GrowArrow(fl1), Indicate(f1, color=JAUNE_TITRE)])
        self.au("ou " + phrases[1][:6], FadeIn(ou1, scale=1.3), GrowArrow(fl2), Indicate(f2, color=JAUNE_TITRE), rt=0.3)
        self.dire_eq(e2, phrases[1], echelle=1.15)
        s1 = D(cotes[2], 56, VERT_OK).move_to(P(xs[0], y2))
        s2 = D(cotes[3], 56, VERT_OK).move_to(P(xs[2], y2))
        for s in (s1, s2):
            for a in s.x:
                a.set_color(INCONNUE)
        ou2 = T("ou", 40, JAUNE_TITRE).move_to(P(xs[1], y2))
        self.dire_eq(s1, phrases[2], echelle=1.15)
        self.au("ou " + phrases[3][:6], FadeIn(ou2, scale=1.3), rt=0.25)
        self.dire_eq(s2, phrases[3], echelle=1.15)
        return e1, e2, s1, s2

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Résoudre en factorisant", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Résoudre", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        # une équation, deux chemins, deux solutions
        boite = RoundedRectangle(width=2.6, height=0.8, corner_radius=0.14, stroke_color=CIEL, stroke_width=4,
                                 fill_color="#0b1220", fill_opacity=1).move_to(P(-3.6, 0.9))
        mot = T("équation", 36, CIEL, audit=False).move_to(boite)
        ronds = VGroup(*[Circle(radius=0.42, stroke_color=VERT_OK, stroke_width=5, fill_color="#052e16",
                                fill_opacity=1).move_to(P(-3.6 + dx, -0.9)) for dx in (-1.3, 1.3)])
        qs = VGroup(*[T("?", 44, VERT_OK, gras=True, audit=False).move_to(r) for r in ronds])
        fl = VGroup(*[Arrow(boite.get_bottom(), r.get_top(), buff=0.08, color=JAUNE_TITRE, stroke_width=5,
                            max_tip_length_to_length_ratio=0.2) for r in ronds])
        l1 = self.lg("Pourquoi une équation", 2.9, 0.75, 44)
        self.dit(l1, "Pourquoi une équation", avec=[FadeIn(boite), FadeIn(mot)])
        l2 = self.lg("peut-elle avoir", 2.9, 0.05, 44)
        self.dit(l2, "peut-elle avoir")
        l3 = self.lg("deux solutions ?", 2.9, -0.7, 50, JAUNE_TITRE)
        self.dit(l3, "deux solutions ?", avec=[GrowArrow(fl[0]), GrowArrow(fl[1])])
        self.play(FadeIn(ronds, scale=0.6), FadeIn(qs, scale=0.6), run_time=0.35)
        self.insister(l3, 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : Tom et sa photo carrée ─────────────────────────────────────────
    def ecran_photographe(self):
        self.ecran("01-photographe")
        m = tom()
        m.perso.move_to(P(-4.75, 0.1))
        m.nom.next_to(m.perso, UP, buff=0.14).set_x(-4.75)
        self.au("Tom", FadeIn(m.perso, shift=UP * 0.3), FadeIn(m.nom[0], shift=UP * 0.1), rt=0.35)
        self.au("photographe", FadeIn(m.nom[1], shift=UP * 0.1), rt=0.3)
        ph = photo(2.3, P(-1.95, -0.75))
        haut = D("x", 40, audit=False).next_to(ph, UP, buff=0.12)
        gauche = D("x", 40, audit=False).next_to(ph, LEFT, buff=0.14)
        aire = T("9 dm²", 34, WHITE, audit=False).next_to(ph, DOWN, buff=0.15)
        xc = 3.15
        l1 = self.lg("Il imprime des photos", xc, 3.1, 40)
        self.dit(l1, "Il imprime des photos")
        l1b = self.lg("carrées pour", xc, 2.5, 40)
        self.dit(l1b, "carrées pour", avec=[FadeIn(ph, shift=UP * 0.2)])
        l1c = self.lg("une exposition.", xc, 1.9, 40)
        self.dit(l1c, "une exposition.")
        l2 = self.lg("Une photo a une aire", xc, 1.15, 40)
        self.dit(l2, "Une photo a une aire")
        l2b = self.lg("de 9 dm².", xc, 0.55, 40)
        self.dit_tout(l2b, "de 9 décimètres carrés.",
                      gestes={idx(l2b, "9"): lambda: [FadeIn(aire, shift=UP * 0.1)]})
        l3 = self.lg("Quel est son côté ?", xc, -0.2, 44, JAUNE_TITRE)
        self.dit(l3, "Quel est son côté ?", avec=[Indicate(ph.bord, color=JAUNE_TITRE, scale_factor=1.04)])
        l4 = self.lg("J'appelle x le côté :", xc, -0.95, 40, lettres="x")
        self.dit_avec(l4, "J'appelle x le côté :",
                      {idx(l4, "x"): lambda: [FadeIn(haut, shift=DOWN * 0.1), FadeIn(gauche, shift=RIGHT * 0.1)]})
        e = D("x² = 9", 80).move_to(P(3.0, -2.15))
        self.dire_eq(e, "x au carré égale 9.", echelle=1.15)
        self.play(Create(self.cadre(e, CIEL, 0.18)), run_time=0.3)
        self.insister(e, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 : tout à gauche, puis a² − b² ────────────────────────────────────
    def ecran_factoriser(self):
        self.ecran("02-factoriser")
        XE = -0.3
        l0 = self.lg("On ramène tout à gauche :", -2.3, 3.05, 40, CIEL)
        rap = D("x² = 9", 60, audit=False).mis_sur_egal(XE, 1.95)
        self.play(FadeIn(rap), run_time=0.2)
        self.dit(l0, "On ramène tout à gauche :")
        e1 = D("x² − 9 = 0", 60).mis_sur_egal(XE, 0.75)
        neuf = e1.atomes[idx(e1, "9")]
        moins = e1.atomes[idx(e1, "−")]
        fl = CurvedArrow(rap.atomes[-1].get_bottom() + DOWN * 0.06, VGroup(moins, neuf).get_top() + UP * 0.08,
                         angle=-1.0, color=DEPLACE, stroke_width=4, tip_length=0.16)
        self.dit_avec(e1, "x au carré moins 9 égale 0.",
                      {idx(e1, "−"): lambda: [Create(fl), rap.atomes[-1].animate.set_color(DEPLACE)]})
        self.play(moins.animate.set_color(DEPLACE), neuf.animate.set_color(DEPLACE), run_time=0.25)
        # a² − b² : x² est a², 9 est b²
        ba = self.accolade(VGroup(e1.atomes[0], e1.atomes[1]), "a²", CARRE_A)
        bb = self.accolade(neuf, "b²", CARRE_B)
        l2 = self.lg("On reconnaît", 4.1, 1.3, 40)
        self.dit(l2, "On reconnaît")
        l2b = self.lg("a² − b².", 4.1, 0.65, 48)
        l2b.atomes[idx(l2b, "a")].set_color(CARRE_A)
        l2b.atomes[idx(l2b, "b")].set_color(CARRE_B)
        self.dit_avec(l2b, "a au carré moins b au carré.",
                      {idx(l2b, "a"): lambda: [FadeIn(ba, shift=UP * 0.1)], idx(l2b, "b"): lambda: [FadeIn(bb, shift=UP * 0.1)]})
        c1 = E("a² − b²", 38, WHITE, lettres="", audit=False)
        c2 = E("= (a − b)(a + b)", 38, WHITE, lettres="", audit=False)
        carte = VGroup(c1, c2).arrange(DOWN, buff=0.14)
        fond = RoundedRectangle(width=carte.width + 0.5, height=carte.height + 0.4, corner_radius=0.12,
                                stroke_color=VERT_OK, stroke_width=3, fill_color="#052e16", fill_opacity=1)
        bloc = VGroup(fond, carte.move_to(fond)).move_to(P(4.1, -0.55))
        self.play(FadeIn(bloc, shift=UP * 0.15), run_time=0.35)
        e2 = D("(x − 3)(x + 3) = 0", 54).mis_sur_egal(XE, -1.95)
        self.dire_eq(e2, "x moins 3, fois x plus 3, égale 0.", echelle=1.15,
                     avec=[Indicate(carte, color=VERT_OK, scale_factor=1.05)])
        self.play(Create(self.cadre(e2, CIEL, 0.16)), run_time=0.3)
        self.insister(e2, 1.06, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 03 : le produit nul, deux solutions, on garde 3 ─────────────────────
    def ecran_produit_nul(self):
        self.ecran("03-produit-nul")
        l0 = self.lg("Un produit est nul si l'un de ses facteurs est nul.", 0.0, 3.15, 38, JAUNE_TITRE)
        rap = D("(x − 3)(x + 3) = 0", 56, audit=False)
        rap.shift(P(-1.6, 2.05) - VGroup(rap.atomes[4], rap.atomes[5]).get_center())
        ph = photo(1.8, P(4.7, 0.9))
        self.play(FadeIn(rap), FadeIn(ph), run_time=0.25)
        self.dit(l0, "Un produit est nul si l'un de ses facteurs est nul.")
        e1, e2, s1, s2 = self.deux_branches(rap, 0.6, -0.5, ("x − 3 = 0", "x + 3 = 0", "x = 3", "x = −3"),
                                            ("x moins 3 égale 0,", "x plus 3 égale 0.", "x égale 3,",
                                             "x égale moins 3."), (-4.0, -1.6, 0.8))
        l3 = self.lg("Deux solutions.", -1.6, -1.45, 44, JAUNE_TITRE)
        self.dit(l3, "Deux solutions.", avec=[Circumscribe(VGroup(s1, s2), color=JAUNE_TITRE, buff=0.1)])
        l4 = self.lg("Mais un côté n'est jamais négatif :", -1.6, -2.3, 38, PIEGE)
        self.dit(l4, "Mais un côté n'est jamais négatif :")
        self.play(s2.animate.set_color(PIEGE), Create(self.barrer(s2)), run_time=0.4)
        cote = T("3 dm", 36, VERT_OK, audit=False).next_to(ph, UP, buff=0.14)
        l5 = self.lg("la photo mesure 3 dm de côté.", -1.6, -3.0, 38)
        self.dit_tout(l5, "la photo mesure 3 décimètres de côté.",
                      gestes={idx(l5, "3"): lambda: [FadeIn(cote, shift=DOWN * 0.1), Create(self.cadre_ok(s1, 0.14))]})
        self.insister(VGroup(s1, cote), 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 03q : QUESTION 1 (réponse B) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = -2.0
        e = D("x² − 49 = 0", 48, audit=False).move_to(P(-4.4, 2.3))

        def avant(sc):
            sc.eq_dans_q(0, "Résous", "Résous", lettres="", fs=36)
            sc.eq_dans_q(0, "x² − 49 = 0.", "x au carré moins 49 égale 0.", lettres="x", fs=36)
            sc.play(FadeIn(e, shift=UP * 0.2), run_time=0.3)

        def apres(sc):
            sc.monter_reponse(1)
            sc.ph_eq(0, "Réponse B :", "Réponse B :", premier=True)
            sc.ph_eq(1, "(x − 7)(x + 7) = 0.", "x moins 7, fois x plus 7, égale 0.", lettres="x")
            sc.ph_eq(2, "Deux solutions : 7 et −7.", "Deux solutions : 7 et moins 7.",
                     avec=[Circumscribe(e, color=VERT_OK, buff=0.1)])
            sc.rep_fini()

        self.question_pause("03q-question", "03r-reponse", ["Résous", "x² − 49 = 0."],
                            [Eq("x = 7 seulement", 34, lettres="x"), Eq("x = 7 ou x = −7", 34, lettres="x"),
                             Eq("x = 24,5 ou x = −24,5", 34, lettres="x")], 1,
                            ["Réponse B :", "(x − 7)(x + 7) = 0.", "Deux solutions : 7 et −7."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 04 : le cadre blanc de 1 dm ─────────────────────────────────────────
    def ecran_cadre(self):
        self.ecran("04-cadre")
        S, b = 3.2, 0.5
        pe = photo_encadree(S, b, P(-4.55, -0.3))
        cadre, ph = pe.cadre, pe.photo
        h_x = self.accolade(cadre, "x", INCONNUE, UP, 40)
        h_x[1].set_color(INCONNUE)
        bas = BraceBetweenPoints(P(ph.get_left()[0], cadre.get_bottom()[1] - 0.06),
                                 P(ph.get_right()[0], cadre.get_bottom()[1] - 0.06), DOWN, color=WHITE)
        lab_bas = D("x − 2", 38).next_to(bas, DOWN, buff=0.08)
        un_dm = T("1 dm", 28, ENCRE, audit=False).move_to(P(cadre.get_x(), cadre.get_top()[1] - b / 2))
        yb = ph.get_y()
        fg = DoubleArrow(P(cadre.get_left()[0], yb), P(ph.get_left()[0], yb), buff=0.02, color=PIEGE,
                         stroke_width=4, tip_length=0.14, max_tip_length_to_length_ratio=0.35)
        fd = DoubleArrow(P(ph.get_right()[0], yb), P(cadre.get_right()[0], yb), buff=0.02, color=PIEGE,
                         stroke_width=4, tip_length=0.14, max_tip_length_to_length_ratio=0.35)
        ug = T("1", 30, PIEGE).next_to(fg, UP, buff=0.08)
        ud = T("1", 30, PIEGE).next_to(fd, UP, buff=0.08)
        aire = T("25 dm²", 34, WHITE)
        etiq = VGroup(RoundedRectangle(width=aire.width + 0.3, height=aire.height + 0.24, corner_radius=0.08,
                                       fill_color="#0b1220", fill_opacity=0.85, stroke_width=0), aire)
        etiq.move_to(ph.get_center() + UP * 0.25)
        aire.move_to(etiq[0])
        xc = 1.9
        l1 = self.lg("Tom ajoute un cadre blanc", xc, 3.15, 40)
        self.dit_avec(l1, "Tom ajoute un cadre blanc", {idx(l1, "cadre"): lambda: [FadeIn(pe, scale=0.9)]})
        l1b = self.lg("de 1 dm tout autour d'une photo.", xc, 2.55, 38)
        self.dit_tout(l1b, "de 1 décimètre tout autour d'une photo.",
                      gestes={idx(l1b, "1"): lambda: [FadeIn(un_dm)]})
        l2 = self.lg("Le grand carré, cadre compris,", xc, 1.8, 40)
        self.dit(l2, "Le grand carré, cadre compris,", avec=[Indicate(cadre, color=JAUNE_TITRE, scale_factor=1.03)])
        l2b = self.lg("a un côté de x.", xc, 1.2, 40, lettres="x")
        self.dit_avec(l2b, "a un côté de x.", {idx(l2b, "x"): lambda: [FadeIn(h_x, shift=DOWN * 0.1)]})
        l3 = self.lg("La photo a donc un côté", xc, 0.45, 40)
        self.dit_avec(l3, "La photo a donc un côté",
                      {idx(l3, "photo"): lambda: [Indicate(ph.bord, color=JAUNE_TITRE, scale_factor=1.04)]})
        l3b = self.lg("de x − 2 :", xc, -0.15, 40, lettres="x")
        self.dit_avec(l3b, "de x moins 2 :", {idx(l3b, "2"): lambda: [FadeIn(bas), FadeIn(lab_bas, shift=UP * 0.1)]})
        l4 = self.lg("on enlève 1 à gauche, et 1 à droite.", xc, -0.8, 38)
        self.dit_avec(l4, "on enlève 1 à gauche, et 1 à droite.",
                      {idx(l4, "1"): lambda: [GrowFromCenter(fg), FadeIn(ug)],
                       idx(l4, "1", 2): lambda: [GrowFromCenter(fd), FadeIn(ud)]})
        l5 = self.lg("Il veut une photo de 25 dm² :", xc, -1.5, 40)
        self.dit_tout(l5, "Il veut une photo de 25 décimètres carrés :",
                      gestes={idx(l5, "25"): lambda: [FadeIn(etiq, scale=0.8)]})
        e = D("(x − 2)² = 25", 64).move_to(P(1.5, -2.55))
        self.dire_eq(e, "x moins 2, au carré, égale 25.", echelle=1.15)
        self.play(Create(self.cadre(e, CIEL, 0.16)), run_time=0.3)
        self.insister(e, 1.06, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 05 : (x − 2)² − 25 = 0, a = x − 2, b = 5 ────────────────────────────
    def ecran_factoriser2(self):
        self.ecran("05-factoriser")
        XE = 1.2
        l0 = self.lg("On ramène tout à gauche :", -2.3, 3.05, 40, CIEL)
        rap = D("(x − 2)² = 25", 58, audit=False).mis_sur_egal(XE, 2.05)
        self.play(FadeIn(rap), run_time=0.2)
        self.dit(l0, "On ramène tout à gauche :")
        e1 = D("(x − 2)² − 25 = 0", 58).mis_sur_egal(XE, 0.95)
        i25 = idx(e1, "25")
        m25 = e1.atomes[i25 - 1]
        fl = CurvedArrow(rap.atomes[-1].get_bottom() + DOWN * 0.06, VGroup(m25, e1.atomes[i25]).get_top() + UP * 0.08,
                         angle=-1.0, color=DEPLACE, stroke_width=4, tip_length=0.16)
        self.dit_avec(e1, "x moins 2, au carré, moins 25, égale 0.",
                      {i25 - 1: lambda: [Create(fl), rap.atomes[-1].animate.set_color(DEPLACE)]})
        self.play(m25.animate.set_color(DEPLACE), e1.atomes[i25].animate.set_color(DEPLACE), run_time=0.25)
        gr_a = VGroup(*e1.atomes[0:6])
        ba = self.accolade(gr_a, "a²", CARRE_A)
        bb = self.accolade(e1.atomes[i25], "b²", CARRE_B)
        l2 = self.lg("Encore a² − b²,", 4.3, 3.05, 40)
        l2.atomes[idx(l2, "a")].set_color(CARRE_A)
        l2.atomes[idx(l2, "b")].set_color(CARRE_B)
        self.dit_avec(l2, "Encore a au carré moins b au carré,",
                      {idx(l2, "a"): lambda: [FadeIn(ba, shift=UP * 0.1)], idx(l2, "b"): lambda: [FadeIn(bb, shift=UP * 0.1)]})
        boite_a = self.cadre(VGroup(*e1.atomes[0:5]), CARRE_A, 0.06)
        ca = D("a = x − 2,", 44).move_to(P(4.6, 1.95))
        ca.atomes[0].set_color(CARRE_A)
        self.dit(ca, "avec a égale x moins 2,", avec=[Create(boite_a)])
        cb = D("b = 5.", 44).move_to(P(4.6, 1.2))
        cb.atomes[0].set_color(CARRE_B)
        self.dit(cb, "et b égale 5.")
        e2 = D("(x − 2 − 5)(x − 2 + 5) = 0", 44).mis_sur_egal(XE, -0.7)
        k = [i for i, a in enumerate(e2.atomes) if a.original_text == "2"]
        b1 = self.cadre(VGroup(*e2.atomes[k[0] - 2:k[0] + 1]), CARRE_A, 0.05)
        b2 = self.cadre(VGroup(*e2.atomes[k[1] - 2:k[1] + 1]), CARRE_A, 0.05)
        self.dit_avec(e2, "x moins 2 moins 5, fois x moins 2 plus 5, égale 0.",
                      {k[0]: lambda: [Create(b1)], k[1]: lambda: [Create(b2)]})
        r = self.lg("On réduit :", -4.6, -1.45, 40, CIEL)
        self.dit(r, "On réduit :")
        e3 = D("(x − 7)(x + 3) = 0", 54).mis_sur_egal(XE, -2.25)
        self.dire_eq(e3, "x moins 7, fois x plus 3, égale 0.", echelle=1.15)
        self.play(Create(self.cadre(e3, CIEL, 0.14)), run_time=0.3)
        self.insister(e3, 1.06, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 06 : produit nul, on garde 7, on vérifie ────────────────────────────
    def ecran_solutions(self):
        self.ecran("06-solutions")
        t0 = self.lg("Produit nul :", -4.4, 3.05, 42, JAUNE_TITRE)
        rap = D("(x − 7)(x + 3) = 0", 56, audit=False)
        rap.shift(P(-2.2, 2.05) - VGroup(rap.atomes[4], rap.atomes[5]).get_center())
        self.play(FadeIn(rap), run_time=0.2)
        self.dit(t0, "Produit nul :")
        e1, e2, s1, s2 = self.deux_branches(rap, 0.7, -0.4, ("x − 7 = 0", "x + 3 = 0", "x = 7", "x = −3"),
                                            ("x moins 7 égale 0,", "x plus 3 égale 0.", "x égale 7,",
                                             "x égale moins 3."), (-4.5, -2.2, 0.1))
        pe = photo_encadree(2.0, 0.32, P(4.5, 1.65))
        l3 = self.lg("Pour le cadre, on garde 7 :", -2.2, -1.45, 40)
        self.dit_avec(l3, "Pour le cadre, on garde 7 :",
                      {0: lambda: [FadeIn(pe, scale=0.9), s2.animate.set_color(PIEGE), Create(self.barrer(s2))],
                       idx(l3, "7"): lambda: [Create(self.cadre_ok(s1, 0.14))]})
        h7 = self.accolade(pe.cadre, "7 dm", VERT_OK, UP, 32)
        l4 = self.lg("le grand carré mesure 7 dm.", -2.2, -2.15, 40)
        self.dit_tout(l4, "le grand carré mesure 7 décimètres.",
                      gestes={idx(l4, "7"): lambda: [FadeIn(h7, shift=DOWN * 0.1)]})
        b5 = BraceBetweenPoints(P(pe.photo.get_left()[0], pe.cadre.get_bottom()[1] - 0.05),
                                P(pe.photo.get_right()[0], pe.cadre.get_bottom()[1] - 0.05), DOWN, color=WHITE)
        l5 = T("5 dm", 32, WHITE).next_to(b5, DOWN, buff=0.08)
        v0 = self.lg("On vérifie :", 4.2, -0.35, 38, CIEL)
        self.dit(v0, "On vérifie :")
        v1 = D("7 − 2 = 5", 46).move_to(P(4.2, -1.05))
        self.dit_avec(v1, "7 moins 2, 5.", {idx(v1, "5"): lambda: [FadeIn(b5), FadeIn(l5)]})
        v2 = D("5² = 25", 46).move_to(P(4.0, -1.75))
        self.dire_eq(v2, "5 au carré, 25.", echelle=1.1)
        ok = self.coche(VERT_OK, 0.24).next_to(v2, RIGHT, buff=0.25)
        self.au("C'est juste", Create(ok), v2.animate.set_color(VERT_OK), rt=0.35)
        self.insister(VGroup(v2, ok), 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 06q : QUESTION 2 (réponse C) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = -1.7
        f = feuille(4.2, 2.4, P(-4.3, 1.75))
        c1 = E("x − 2 = 5", 44, ENCRE, lettres="").move_to(P(-4.15, 2.4))
        c2 = E("donc x = 7", 44, ENCRE, lettres="").move_to(P(-4.15, 1.65))
        c3 = E("ou x = −3", 40, VERT_OK, lettres="", audit=False)

        def avant(sc):
            sc.eq_dans_q(0, "À partir de", "À partir de", lettres="", fs=36)
            sc.eq_dans_q(0, "(x − 2)² = 25,", "x moins 2, au carré, égale 25,", lettres="x", fs=36)
            sc.eq_dans_q(0, "un élève écrit :", "un élève écrit :", lettres="", fs=36)
            sc.play(FadeIn(f, shift=UP * 0.2), run_time=0.25)
            sc.dire_eq(c1, "x moins 2 égale 5,", echelle=1.1)
            sc.dire_eq(c2, "donc x égale 7.", echelle=1.1)
            sc.eq_dans_q(0, "Qu'a-t-il oublié ?", "Qu'a-t-il oublié ?", lettres="", fs=36)

        def apres(sc):
            sc.monter_reponse(2)
            sc.ph_eq(0, "Réponse C :", "Réponse C :", premier=True)
            sc.ph_eq(1, "x − 2 peut aussi valoir −5,", "x moins 2 peut aussi valoir moins 5,", lettres="x")
            sc.ph_eq(2, "car (−5)² = 25.", "car moins 5 au carré fait 25.")
            c3.next_to(c2, DOWN, buff=0.18).align_to(c2, LEFT)
            sc.ph_eq(3, "Alors x = −3.", "Alors x égale moins 3.", lettres="x",
                     avec=[FadeIn(c3, shift=LEFT * 0.1)])
            sc.rep_fini()

        self.question_pause("06q-question", "06r-reponse", ["À partir de", "(x − 2)² = 25,", "un élève écrit :",
                                                            "Qu'a-t-il oublié ?"],
                            [Eq("rien, c'est complet", 34, lettres=""), Eq("de diviser par 2", 34, lettres=""),
                             Eq("la solution x = −3", 34, lettres="x")], 2,
                            ["Réponse C :", "x − 2 peut aussi valoir −5,", "car (−5)² = 25.", "Alors x = −3."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 07 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("07-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 2.9))
        self.au("À toi", Write(tit), rt=0.5)
        l = self.lg("Résous.", 0, 1.8, 46, CIEL)
        self.dit(l, "Résous.")
        b1 = self.pastille("1").move_to(P(-3.3, 0.95))
        b2 = self.pastille("2").move_to(P(3.3, 0.95))
        e1 = D("x² − 16 = 0", 66).move_to(P(-3.3, 0.05))
        e2 = D("(x + 1)² = 36", 66).move_to(P(3.3, 0.05))
        self.au("Un :", FadeIn(b1, scale=1.3), rt=0.2)
        self.dire_eq(e1, "x au carré moins 16 égale 0.", echelle=1.15)
        self.au("Deux :", FadeIn(b2, scale=1.3), rt=0.2)
        self.dire_eq(e2, "x plus 1, au carré, égale 36.", echelle=1.15)
        pz = T("Mets pause, et cherche !", 50, ORANGE_RETENUE).move_to(P(-0.4, -1.6))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.defi = dict(tit=tit, l=l, e1=e1, e2=e2, b1=b1, b2=b2, pz=pz)
        self.attendre_voix(marge=2.0)

    # ── 07b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        d = self.defi
        self.dire("07b-correction")
        tit = T("Correction", 50, JAUNE_TITRE).move_to(P(0, 2.95))
        e1, e2, b1, b2 = d["e1"], d["e2"], d["b1"], d["b2"]
        x1, x2, y1, y2 = -3.4, 2.2, 1.9, 0.1
        w1, w2 = e1.width * 0.75, e2.width * 0.75
        e1.sans_audit()
        e2.sans_audit()
        self.au("Correction", ReplacementTransform(d["tit"], tit), FadeOut(d["pz"]), FadeOut(d["l"]),
                e1.animate.scale(0.75).move_to(P(x1, y1)), e2.animate.scale(0.75).move_to(P(x1, y2)),
                b1.animate.move_to(P(x1 - w1 / 2 - 0.45, y1)), b2.animate.move_to(P(x1 - w2 / 2 - 0.45, y2)), rt=0.45)
        # Un : la rangée du haut
        self.au("Un :", Indicate(b1, color=CIEL, scale_factor=1.3), rt=0.3)
        a1 = D("(x − 4)(x + 4) = 0", 46).move_to(P(x2, y1))
        self.dire_eq(a1, "x moins 4, fois x plus 4, égale 0.", echelle=1.1)
        a2 = self.lg("Solutions : 4 et −4.", x2, y1 - 0.8, 42, VERT_OK)
        self.dit(a2, "Solutions : 4 et moins 4.")
        self.play(Create(self.cadre_ok(a2, 0.12)), run_time=0.25)
        # Deux : la rangée du bas
        self.au("Deux :", Indicate(b2, color=CIEL, scale_factor=1.3), rt=0.3)
        c1 = D("(x + 1)² − 36 = 0", 44).move_to(P(x2, y2))
        self.dire_eq(c1, "x plus 1, au carré, moins 36, égale 0.", echelle=1.1)
        c2 = D("(x + 1 − 6)(x + 1 + 6) = 0", 40).move_to(P(x2, y2 - 0.8))
        self.dire_eq(c2, "x plus 1 moins 6, fois x plus 1 plus 6 :", echelle=1.1)
        c3 = D("(x − 5)(x + 7) = 0", 44).move_to(P(x2, y2 - 1.6))
        self.dire_eq(c3, "x moins 5, fois x plus 7, égale 0.", echelle=1.1)
        c4 = self.lg("Solutions : 5 et −7.", x2 - 0.3, y2 - 2.4, 42, VERT_OK)
        self.dit(c4, "Solutions : 5 et moins 7.")
        self.play(Create(self.cadre_ok(c4, 0.12)), run_time=0.25)
        self.insister(VGroup(a2, c4), 1.05, 0.2)
        self.attendre_voix(marge=1.2)

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def finale_etroite(self, textes, figure, fs=36):
        """« Ce que tu as appris » : titre en haut et centré, la figure ÉTROITE à gauche, les points en lignes
        courtes à 36 pt ; le bloc s'arrête à x = 5 : jamais sur Ti-Margo."""
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        w0 = figure.width
        self.cadrer(figure, gauche=-6.4, droite=-4.2, haut=tit.get_bottom()[1] - 0.4, bas=-2.9)
        if figure.width < w0 - 1e-3:
            print(f"RETRECI figure finale {figure.width / w0:.2f}", flush=True)
        self.play(FadeIn(figure), run_time=0.3)
        self.play(Write(tit), run_time=0.7)
        lignes = VGroup()
        for morceaux in textes:
            ts = [self.t(x, fs) for x in morceaux]
            pas = max(t.height for t in ts) + 0.1
            for k, t in enumerate(ts):
                t.align_to(P(0, -k * pas), UP).align_to(P(0, 0), LEFT)
            c = self.coche()
            c.next_to(ts[0], LEFT, buff=0.25).set_y(ts[0].get_center()[1])
            lignes.add(VGroup(c, VGroup(*ts)))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        xl = -3.7  # la colonne de texte ne bouge pas (2e relecture -ql)
        haut = tit.get_bottom()[1] - 0.35
        if lignes.width > 5.0 - xl:
            print(f"RETRECI finale {lignes.width:.2f} > {5.0 - xl:.2f}", flush=True)
            lignes.scale_to_fit_width(5.0 - xl)
        if lignes.height > haut + 3.3:
            print(f"RETRECI finale (hauteur) {lignes.height:.2f} > {haut + 3.3:.2f}", flush=True)
            lignes.scale_to_fit_height(haut + 3.3)
        lignes.align_to(P(xl, 0), LEFT).align_to(P(0, haut), UP)
        return lignes

    def ecran_finale(self):
        self.ecran("08-finale", 0.5)
        pe = photo_encadree(1.3, 0.2)
        schema = VGroup(T("A × B = 0", 32, WHITE, audit=False),
                        Arrow(UP * 0.3, DOWN * 0.3, color=JAUNE_TITRE, stroke_width=5, buff=0),
                        T("A = 0", 32, VERT_OK, audit=False), T("ou", 30, JAUNE_TITRE, audit=False),
                        T("B = 0", 32, VERT_OK, audit=False)).arrange(DOWN, buff=0.12)
        fig = VGroup(pe, schema).arrange(DOWN, buff=0.35)
        lignes = self.finale_etroite([["On ramène tout à gauche,", "pour avoir 0 à droite."],
                                      ["On factorise", "avec une identité."],
                                      ["Le produit nul donne", "deux équations simples."],
                                      ["Dans un problème, on garde", "les solutions qui ont un sens."]], fig)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_photographe()
        self.ecran_factoriser()
        self.ecran_produit_nul()
        self.ecran_question1()
        self.ecran_cadre()
        self.ecran_factoriser2()
        self.ecran_solutions()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        ecran_fin(self, "paysage", voix="09-abonne")
