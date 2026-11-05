# puissance_defi_3e.py
# EleveAI — Maths 3e — série « Puissances », épisode 12 : DÉFI 3e, juger quatre
# calculs. Paysage 16:9, AVEC VOIX, ceinture ORANGE.
# Micro couverte : 3e `entier_puissance_defi`.
# Code couleur constant : BLEU = la base (le 3 de 2³ × 3³ en violet : deux bases),
# ORANGE = l'exposant, VERT = juste, ROUGE = le piège.
#
# Décor et métier : AMINA, JOURNALISTE SCIENTIFIQUE, vérifie les quatre calculs
# de son article ; chaque ligne reçoit son tampon FAUX / JUSTE, et le tableau
# des tampons reste visible en bas à gauche. Centres : sciences, espace.
#
# Écrans : garde (00) ; Amina et l'article (01) ; somme (02, 02q, 02r) ; produit
# (03, 03q, 03r) ; exposant négatif (04, 04q, 04r) ; le Soleil, à toi (05) et
# correction (05b) ; ce que tu as appris (06) ; fin (07).
#
# Voix : manim/voix/3e-puissance-defi.json (validée, débit −6), WAV dans
# public/sons/3e-puissance-defi/ ; marques : puissance_defi_3e_marques.json
# (marques_dump.ps1, puis conversion PAR PAQUETS : « 2 fois » répété garde
# chaque mot, un nombre lu en morceaux reste un seul mot).
# Outils importés sans modification : 6e/prop_commun.py, puissance_calcul.py.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/puissance_defi_3e.py PuissanceDefi3e
# python -m manim render -qh --disable_caching manim/scripts/4e/puissance_defi_3e.py PuissanceDefi3e -o eleveai-maths-3e-puissance-defi --media_dir manim/scripts/4e/media-puiss-12
# Sortie : manim/sorties/3e/maths/puissances/12-defi/eleveai-maths-3e-puissance-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))  # le dossier du script EN TÊTE

from prop_commun import *  # noqa: E402,F403
from puissance_calcul import (OutilsCalcul, T, puiss, suite, ligne_base, pied, sans_audit,  # noqa: E402
                              soleil, EXPO_C, BASE_C, PIEGE, CIEL, SOLEIL)

BASE2 = "#c084fc"     # la deuxième base (violet), à côté du bleu
NUIT = "#0b1220"
ARDOISE = "#475569"
X_G = -6.4            # la marge gauche
YB_REP = 0.52         # d'une ligne de base à l'autre, dans la réponse


# ── les dessins ────────────────────────────────────────────────────────────

def journal(s=1.0):
    """Le pictogramme du journal : une feuille, le gros titre, deux colonnes."""
    feuille = RoundedRectangle(width=1.0, height=1.25, corner_radius=0.06, fill_color="#e2e8f0", fill_opacity=1,
                               stroke_width=0)
    gros = Rectangle(width=0.78, height=0.17, fill_color="#1e293b", fill_opacity=1, stroke_width=0).move_to(P(0, 0.4))
    traits = VGroup(*[Rectangle(width=0.34, height=0.05, fill_color="#64748b", fill_opacity=1, stroke_width=0)
                      .move_to(P(x, 0.16 - 0.15 * k)) for x in (-0.21, 0.21) for k in range(4)])
    return VGroup(feuille, gros, traits).scale(s)


def loupe(s=1.0):
    """La loupe : le verre clair, l'anneau, le manche."""
    verre = Circle(radius=0.34, fill_color="#bae6fd", fill_opacity=0.35, stroke_color="#fbbf24", stroke_width=6)
    manche = Line(P(0.25, -0.25), P(0.62, -0.62), color="#fbbf24", stroke_width=10)
    return VGroup(manche, verre).scale(s)


def amina(s=1.0):
    """Amina : la journaliste, son carnet."""
    p = personne(peau="#8d5524", tenue="#0f766e", cheveux="#111827", longs=True, s=1.0)
    p.add(lunettes(p, "#f8fafc"))
    p.add(journal(0.62).move_to(P(-0.1, -1.2)))
    return p.scale(s)


def terre(r=0.3):
    """La Terre : l'océan et deux continents."""
    mer = Circle(radius=r, fill_color="#2563eb", fill_opacity=1, stroke_color="#93c5fd", stroke_width=2)
    t1 = Ellipse(width=r * 0.8, height=r * 0.6, fill_color="#16a34a", fill_opacity=1, stroke_width=0).move_to(P(-r * 0.25, r * 0.3))
    t2 = Ellipse(width=r * 0.55, height=r * 0.8, fill_color="#16a34a", fill_opacity=1, stroke_width=0).move_to(P(r * 0.3, -r * 0.3))
    return VGroup(mer, t1, t2)


def tot(t):
    """Finit à mi-temps."""
    return smooth(min(1.0, 2 * t))


def tard(t):
    """Commence à mi-temps."""
    return smooth(max(0.0, 2 * t - 1))


def tampon(juste, fs=28):
    """Le tampon : FAUX rouge ou JUSTE vert, encadré, un peu de travers."""
    c = VERT_OK if juste else PIEGE
    t = Text("JUSTE" if juste else "FAUX", font_size=fs, color=c, weight=BOLD)
    t.sans_synchro = True
    t._pas_audit = True
    cadre = RoundedRectangle(width=t.width + 0.34, height=t.height + 0.3, corner_radius=0.08, stroke_color=c,
                             stroke_width=4, fill_color=NUIT, fill_opacity=1)
    cadre.move_to(t)
    return VGroup(cadre, t).rotate(0.1)


def rangee_calcul(k, fs=44):
    """Le calcul k de l'article, déjà composé (bases bleues, exposants orange)."""
    if k == 0:
        return suite((10, 3), "+", (10, 2), "=", (10, 5), fs=fs, buff=0.2)
    if k == 1:
        return suite((2, 3), "×", (3, 3, BASE2), "=", (6, 3), fs=fs, buff=0.2)
    if k == 2:
        return suite((10, "−2"), "=", "−100", fs=fs, buff=0.2)
    return suite("5", "×", (10, 2), "s", fs=fs, buff=0.2)


def griffonnage(w):
    return RoundedRectangle(width=w, height=0.16, corner_radius=0.08, fill_color=ARDOISE, fill_opacity=1, stroke_width=0)


class PuissanceDefi3eBase(OutilsCalcul, PaysageProp):
    nom_voix = "3e-puissance-defi"
    fichier_marques = "puissance_defi_3e_marques.json"
    identite = "Maths 3e — EleveAI"
    ceinture = "orange"
    X_ART, Y_ART = -1.72, 1.525          # le centre de l'article
    YR = (2.12, 1.42, 0.72, 0.02)        # les lignes de base de ses quatre calculs
    X_SLOT = 2.0                         # la place des tampons sur l'article

    # ── le tableau des quatre tampons, en bas à gauche ─────────────────────
    def table_mini(self):
        """Quatre petites cases : « ? » tant que le calcul n'est pas jugé."""
        g = VGroup()
        for k in range(4):
            x = X_G + 0.6 + 1.3 * k
            case = DashedVMobject(RoundedRectangle(width=1.2, height=0.5, corner_radius=0.08, stroke_color=GREY_B,
                                                   stroke_width=2), num_dashes=28).move_to(P(x, -3.22))
            if self.score[k] is None:
                dedans = sans_audit(T("?", 26, GREY_B, audit=False)).move_to(case)
            else:
                dedans = self.mini(self.score[k]).move_to(case)
            g.add(VGroup(case, dedans))
        self.tm = g
        return g

    def mini(self, juste):
        c = VERT_OK if juste else PIEGE
        t = Text("JUSTE" if juste else "FAUX", font_size=20, color=c, weight=BOLD)
        t.sans_synchro = True
        t._pas_audit = True
        return t

    def ecran_table(self, cle=None):
        """Efface, Ti-Margo, le tableau ; lance la voix si cle."""
        self.clear()
        self.add_mascotte()
        self.add(self.table_mini())
        if cle:
            self.dire(cle)

    def tamponner(self, k, st, mot, juste):
        """Au mot de la conclusion : le tampon tombe, s'agrandit, se rétrécit, et
        le tableau d'en bas se remplit."""
        self.au(mot, FadeIn(st, scale=2.2), rt=0.3)
        self.insister(st, 1.25, 0.25, about=st.get_center())
        self.score[k] = juste
        m = self.mini(juste).move_to(self.tm[k][0])
        self.play(FadeOut(self.tm[k][1]), TransformFromCopy(st, m), run_time=0.4)
        self.tm[k].remove(self.tm[k][1])
        self.tm[k].add(m)

    # ── l'article ──────────────────────────────────────────────────────────
    def article(self):
        """La feuille d'Amina : l'en-tête, les calculs déjà jugés et leur tampon,
        les autres griffonnés ; .griffes[k]."""
        cadre = RoundedRectangle(width=9.4, height=3.75, corner_radius=0.15, fill_color=NUIT, fill_opacity=1,
                                 stroke_color=ARDOISE, stroke_width=3).move_to(P(self.X_ART, self.Y_ART))
        ic = journal(0.34).move_to(P(X_G + 0.32, 3.0))
        tit = T("L'article d'Amina", 28, CIEL).next_to(ic, RIGHT, buff=0.18)
        filet = Line(P(X_G + 0.1, 2.68), P(2.85, 2.68), color=ARDOISE, stroke_width=2)
        g = VGroup(cadre, ic, tit, filet)
        g.griffes = []
        for k in range(4):
            if self.score[k] is None:
                gr = VGroup(griffonnage(4.2 + 0.55 * ((k * 3) % 4)).move_to(P(0, self.YR[k] + 0.12)).align_to(P(X_G + 0.15, 0), LEFT))
                g.griffes.append(gr)
                g.add(gr)
            else:
                r = sans_audit(self.ligne_article(k))
                st = tampon(self.score[k], 20).move_to(P(self.X_SLOT, self.YR[k] + 0.14))
                g.griffes.append(VGroup())
                g.add(r, st)
        return g

    def ligne_article(self, k, fs=40):
        """Le calcul k posé sur la ligne de base k de l'article."""
        if k == 3:
            r = suite("Lumière du Soleil :", "5", "×", (10, 2), "s", fs=fs, buff=0.17)
            ligne_base(r)
            r[2].set_y(r[1].get_y())
        else:
            r = rangee_calcul(k, fs)
        r.align_to(P(X_G + 0.15, 0), LEFT)
        y = pied(r[0]) if pied(r[0]) is not None else r.get_bottom()[1]
        r.shift(UP * (self.YR[k] - y))
        return r

    def amina_coin(self, x=4.88, y=1.85, s=0.62):
        a = amina(s).move_to(P(x, y))
        l1 = T("Amina,", 20, CIEL).next_to(a, DOWN, buff=0.12)
        l2 = T("journaliste scientifique", 20, CIEL).next_to(l1, DOWN, buff=0.08)
        return a, VGroup(l1, l2)

    def bande(self, k, y=2.85, largeur=7.0, x_g=X_G, fs=40):
        """Le calcul k sur sa bande d'article (écrans de question et de réponse) :
        la feuille, le pictogramme, le calcul, la place du tampon (.slot)."""
        cadre = RoundedRectangle(width=largeur, height=0.92, corner_radius=0.12, fill_color=NUIT, fill_opacity=1,
                                 stroke_color=ARDOISE, stroke_width=3).move_to(P(x_g + largeur / 2, y))
        ic = journal(0.42).move_to(P(x_g + 0.36, y))
        r = rangee_calcul(k, fs).next_to(ic, RIGHT, buff=0.22)
        r.shift(UP * (y - r.get_y()))
        g = VGroup(cadre, ic, r)
        g.calc = r
        g.slot = P(x_g + largeur - 1.15, y)
        sans_audit(g)
        return g

    def _disposer_q(self, question, choix, phrase):
        r = super()._disposer_q(question, choix, phrase)
        self.tete_q, self.q_q = r[0], r[1]
        return r

    def rep_base(self, i, items, fs=30):
        """Ligne i de la réponse, à droite sous les cartes, sur sa ligne de base."""
        lg = self.rep_compo(0, items, fs=fs)
        lg[1:].shift(RIGHT * 0.1)
        lg.align_to(self.cartes_q, LEFT)
        y0 = self.cartes_q.get_bottom()[1] - 0.5
        lg.shift(UP * (y0 - i * YB_REP - pied(lg[0])))
        return lg

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défi puissances", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        sans_audit(ident)
        self.au("Défi", Write(titre), FadeIn(ech), rt=0.8)
        self.au("niveau", FadeIn(ident, shift=DOWN * 0.2), rt=0.4)
        feuilles = VGroup(*[VGroup(journal(1.05), T("?", 60, EXPO_C, audit=False)) for _ in range(4)])
        for f in feuilles:
            f[1].move_to(f[0])
        feuilles.arrange(RIGHT, buff=0.55).move_to(P(-0.6, 0.8))
        l1 = T("Quatre calculs sur la table :", 42)
        l2 = T("lesquels sont justes ?", 42, EXPO_C)
        l1.move_to(P(-0.6, -0.55))
        l2.move_to(P(-0.6, -1.2))
        self.au("Quatre", FadeIn(l1, shift=RIGHT * 0.2),
                LaggedStart(*[FadeIn(f, shift=DOWN * 0.3) for f in feuilles], lag_ratio=0.2), rt=0.8)
        self.au("lesquels", FadeIn(l2, shift=UP * 0.15), rt=0.35)
        self.insister(l2, 1.15, 0.25)
        self.attendre_voix(marge=0.6)

    # ── 01 : Amina et son article ──────────────────────────────────────────
    def ecran_journaliste(self):
        self.ecran("01-journaliste")
        a = amina(0.68).move_to(P(-4.6, 2.05))
        lab = [T("Amina,", 26, CIEL), T("journaliste scientifique", 26, CIEL)]
        lab[0].move_to(P(0, 0.5)).align_to(P(X_G, 0), LEFT)
        lab[1].move_to(P(0, 0.12)).align_to(P(X_G, 0), LEFT)
        self.au("Amina", FadeIn(a, shift=UP * 0.3), FadeIn(lab[0]), rt=0.4)
        self.au("journaliste", FadeIn(lab[1], shift=RIGHT * 0.15), rt=0.4)
        XA = -1.75
        cadre = RoundedRectangle(width=6.2, height=3.1, corner_radius=0.15, fill_color=NUIT, fill_opacity=1,
                                 stroke_color=ARDOISE, stroke_width=3).move_to(P(XA + 3.1, 1.85))
        ic = journal(0.42).move_to(P(XA + 0.42, 2.95))
        filet = Line(P(XA + 0.15, 2.58), P(XA + 6.05, 2.58), color=ARDOISE, stroke_width=2)
        gros = griffonnage(4.6).move_to(P(XA + 3.35, 2.95))
        gr = VGroup(*[griffonnage(w).move_to(P(0, 2.2 - 0.5 * k)).align_to(P(XA + 0.3, 0), LEFT)
                      for k, w in enumerate((4.4, 3.8, 4.1, 4.6))])
        slots = VGroup(*[DashedVMobject(RoundedRectangle(width=0.9, height=0.42, corner_radius=0.06,
                                                         stroke_color=GREY_B, stroke_width=2), num_dashes=20)
                         .move_to(P(XA + 5.5, 2.2 - 0.5 * k)) for k in range(4)])
        doc = VGroup(cadre, ic, filet, gros)
        l1 = T("Avant de publier un article,", 32).move_to(P(0, -0.5)).align_to(P(X_G, 0), LEFT)
        l2 = T("elle vérifie chaque calcul :", 32, CIEL).next_to(l1, RIGHT, buff=0.16)
        ligne_base(VGroup(l1, l2))
        ligne = VGroup(T("une seule erreur,", 32, PIEGE), T("et ses lecteurs ne la croiront plus.", 32)).arrange(RIGHT, buff=0.16)
        ligne_base(ligne)
        ligne.move_to(P(0, -1.1)).align_to(P(X_G, 0), LEFT)
        self.au("Avant", FadeIn(l1, shift=RIGHT * 0.15), rt=0.35)
        self.au("un article", FadeIn(doc, shift=UP * 0.2), FadeIn(gr), FadeIn(slots), rt=0.5)
        lp = loupe(0.8).move_to(gr[0].get_left() + RIGHT * 0.3)
        self.au("elle vérifie", FadeIn(l2, shift=RIGHT * 0.15), FadeIn(lp, scale=0.4), rt=0.35)
        self.au("chaque", lp.animate.move_to(gr[3].get_right()), rt=0.8)
        self.au("une seule", FadeIn(ligne[0], shift=RIGHT * 0.15), Indicate(gr[1], color=PIEGE), rt=0.35)
        self.au("et ses", FadeIn(ligne[1], shift=RIGHT * 0.15), rt=0.35)
        l3 = T("Ce matin, quatre calculs l'attendent.", 32).move_to(P(0, -1.7)).align_to(P(X_G, 0), LEFT)
        self.au("Ce matin", FadeIn(l3, shift=RIGHT * 0.15), rt=0.35)
        self.score = [None] * 4
        tb = self.table_mini()
        self.au("quatre", FadeIn(tb, shift=UP * 0.15), Indicate(slots, color=EXPO_C, scale_factor=1.15), rt=0.45)
        l4 = T("Vérifie-les avec elle.", 32, EXPO_C).move_to(P(0, -2.3)).align_to(P(X_G, 0), LEFT)
        self.au("Vérifie", FadeIn(l4, scale=1.2), rt=0.35)
        self.insister(l4, 1.12, 0.2, about=l4.get_left())
        self.attendre_voix(marge=0.5)

    # ── 02 : premier calcul : 10³ + 10² = 10⁵ ──────────────────────────────
    def poser_calcul(self, plan):
        """plan = [(extrait, [morceaux], échelle d'entrée)] : chaque morceau au mot."""
        for ex, ms, sc in plan:
            self.au(ex, *[FadeIn(m, scale=sc) for m in ms], rt=0.22)

    def debut_enonce(self, cle, k, mot_titre, titre):
        """L'article, Amina, le calcul k qui s'écrit à la place du griffonnage."""
        self.ecran_table(cle)
        art = self.article()
        a, lab = self.amina_coin()
        self.add(art, a)
        sans_audit(lab)
        self.add(lab)
        tt = T(titre, 42, JAUNE_TITRE).move_to(P(-0.4, -0.78))
        self.au(mot_titre, FadeIn(tt, shift=UP * 0.15), Indicate(art.griffes[k], color=EXPO_C), rt=0.35)
        self.play(FadeOut(art.griffes[k]), run_time=0.15)
        return tt

    def ecran_somme(self):
        self.debut_enonce("02-somme", 0, "Premier", "Premier calcul")
        r = self.ligne_article(0)
        self.poser_calcul([("10 puissance", [r[0].base], 1.3), ("3 plus", [r[0].expo], 1.6), ("plus", [r[1]], 1.3),
                           ("10 puissance", [r[2].base], 1.3), ("2,", [r[2].expo], 1.6), ("égale", [r[3]], 1.3),
                           ("10 puissance", [r[4].base], 1.3), ("5.", [r[4].expo], 1.6)])
        l1 = T("On additionne les exposants,", 38).move_to(P(-0.4, -1.45))
        l2 = T("ça semble logique.", 38).move_to(P(-0.4, -2.1))
        self.au("On additionne", FadeIn(l1, shift=UP * 0.12), rt=0.35)
        self.au("les exposants", Indicate(r[0].expo, color=EXPO_C, scale_factor=1.8),
                Indicate(r[2].expo, color=EXPO_C, scale_factor=1.8), Indicate(r[4].expo, color=EXPO_C, scale_factor=1.8), rt=0.6)
        self.au("ça semble", FadeIn(l2, shift=RIGHT * 0.15), rt=0.35)
        self.attendre_voix(marge=0.5)

    # ── 02q : QUESTION : combien vaut 10³ + 10² ? ──────────────────────────
    def ecran_question_somme(self):
        self.ecran_table()
        bd = self.bande(0)
        self.add(bd)
        ex = suite((10, 3), "+", (10, 2), "=", ["?", EXPO_C], fs=54, buff=0.22)
        ex.align_to(P(X_G + 0.05, 0), LEFT)
        ex.shift(UP * (1.45 - pied(ex[0])))
        choix = [puiss(10, 5, fs=44), T("1 100", 44), puiss(10, 6, fs=44)]
        plans = [[("10 puissance", [choix[0].base]), ("5.", [choix[0].expo])], [("1 100", [choix[1]])],
                 [("10 puissance", [choix[2].base]), ("6.", [choix[2].expo])]]
        # la réponse, à gauche
        egal = suite("=", "1 000", "+", "100", fs=54, buff=0.22)
        egal.align_to(P(X_G + 0.05, 0), LEFT)
        egal.shift(UP * (0.62 - pied(egal[1])))
        res = suite("=", ["1 100", VERT_OK], fs=54, buff=0.22).align_to(P(X_G + 0.05, 0), LEFT)
        res.shift(UP * (-0.21 - pied(res[1])))
        add = T("On additionne les exposants :", 32).move_to(P(0, -1.0)).align_to(P(X_G + 0.05, 0), LEFT)
        ligne1 = ligne_base(VGroup(T("pour un produit :", 32, VERT_OK), T("oui", 32, VERT_OK)).arrange(RIGHT, buff=0.15))
        ligne2 = ligne_base(VGroup(T("pour une somme :", 32, PIEGE), T("jamais", 32, PIEGE)).arrange(RIGHT, buff=0.15))
        ck = self.coche(VERT_OK, 0.17).move_to(P(X_G + 0.25, -1.57))
        cx = VGroup(Line(P(-0.14, -0.14), P(0.14, 0.14), color=PIEGE, stroke_width=5),
                    Line(P(-0.14, 0.14), P(0.14, -0.14), color=PIEGE, stroke_width=5)).move_to(P(X_G + 0.25, -2.14))
        ligne1.align_to(P(X_G + 0.6, 0), LEFT)
        ligne1.shift(UP * (-1.7 - pied(ligne1[0])))
        ligne2.align_to(P(X_G + 0.6, 0), LEFT)
        ligne2.shift(UP * (-2.27 - pied(ligne2[0])))

        def avant(sc, q):
            sc.poser_mots(q[0], [(0, "Combien"), (13, "10 puissance"), (15, "3 plus"), (17, "plus"),
                                 (19, "10 puissance"), (21, "2 ?")],
                          avec={1: [FadeIn(ex[0].base, scale=1.3)], 2: [FadeIn(ex[0].expo, scale=1.6)],
                                3: [FadeIn(ex[1])], 4: [FadeIn(ex[2].base, scale=1.3)],
                                5: [FadeIn(ex[2].expo, scale=1.6), FadeIn(ex[3]), FadeIn(ex[4], scale=1.4)]})

        def apres(sc):
            l0 = sans_audit(sc.rep_base(0, ["Réponse B :", "1 100."], fs=34))
            sc.au("B :", FadeIn(l0[0], shift=UP * 0.12), rt=0.25)
            sc.au("1 100", FadeIn(l0[1], shift=UP * 0.12), rt=0.3)
            sc.pieges(0, 2)
            sc.au("1 000 plus", FadeIn(egal[0]), FadeIn(egal[1], scale=1.3), FadeOut(ex[3]), FadeOut(ex[4]), rt=0.25)
            sc.au("plus", FadeIn(egal[2]), rt=0.15)
            sc.au("100.", FadeIn(egal[3], scale=1.3), rt=0.25)
            sc.play(FadeIn(res[0]), FadeIn(res[1], scale=1.4), run_time=0.3)
            sc.insister(res[1], 1.25, 0.2)
            sc.au("On additionne", FadeIn(add, shift=UP * 0.12), rt=0.3)
            sc.au("pour un", Create(ck), FadeIn(ligne1, shift=RIGHT * 0.15), rt=0.35)
            sc.au("jamais", Create(cx), FadeIn(ligne2, shift=RIGHT * 0.15), rt=0.35)
            sc.insister(ligne2[1], 1.2, 0.2)
            sc.au("Premier", Indicate(bd.calc, color=PIEGE, scale_factor=1.06), rt=0.4)
            sc.tamponner(0, tampon(False).move_to(bd.slot), "faux", False)

        self.qpause("02q-question", "02r-reponse", choix, plans, 1, ["Réponse B : 1 100."], avant=avant, apres=apres,
                    question=["Combien vaut 10³ + 10² ?"])

    # ── 03 : deuxième calcul : 2³ × 3³ = 6³ ────────────────────────────────
    def ecran_produit(self):
        self.debut_enonce("03-produit", 1, "Deuxième", "Deuxième calcul")
        r = self.ligne_article(1)
        self.poser_calcul([("2 puissance", [r[0].base], 1.3), ("3 fois", [r[0].expo], 1.6), ("fois", [r[1]], 1.3),
                           ("3 puissance", [r[2].base], 1.3), ("3,", [r[2].expo], 1.6), ("égale", [r[3]], 1.3),
                           ("6 puissance", [r[4].base], 1.3), ("3.", [r[4].expo], 1.6)])
        l1 = T("Les bases sont différentes :", 38).move_to(P(-0.4, -1.45))
        l2 = T("ça a l'air faux.", 38, PIEGE).move_to(P(-0.4, -2.1))
        trait = lambda m, c: Line(m.get_corner(DL) + DOWN * 0.07, m.get_corner(DR) + DOWN * 0.07, color=c, stroke_width=5)  # noqa: E731
        self.au("Les bases", FadeIn(l1, shift=UP * 0.12), Create(trait(r[0].base, BASE_C)), Create(trait(r[2].base, BASE2)), rt=0.4)
        self.au("ça a", FadeIn(l2, shift=RIGHT * 0.15), rt=0.35)
        self.attendre_voix(marge=0.5)

    # ── 03q : QUESTION : ce calcul est-il juste ? ──────────────────────────
    def facteurs(self, fs=50):
        """(2 × 2 × 2) × (3 × 3 × 3), morceau par morceau : .d (les six chiffres)."""
        ms = []
        for s, c in (("(", GREY_B), ("2", BASE_C), ("×", WHITE), ("2", BASE_C), ("×", WHITE), ("2", BASE_C), (")", GREY_B),
                     ("×", WHITE), ("(", GREY_B), ("3", BASE2), ("×", WHITE), ("3", BASE2), ("×", WHITE), ("3", BASE2),
                     (")", GREY_B)):
            ms.append(T(s, fs * (0.85 if s == "×" else 1), c))
        g = VGroup(*ms).arrange(RIGHT, buff=0.14)
        for m in ms:
            if m.text == "×":
                m.set_y(ms[1].get_y())
            elif m.text in "23":
                m.align_to(ms[1], DOWN)
        g.d = [ms[i] for i in (1, 3, 5, 9, 11, 13)]
        return g

    def paires(self, fs=50):
        """(2 × 3) × (2 × 3) × (2 × 3) : .p[i] = (parenthèse, 2, ×, 3, parenthèse)."""
        groupes, p = [], []
        for i in range(3):
            pp = [T("(", fs, GREY_B, audit=False), T("2", fs, BASE_C, audit=False), T("×", fs * 0.85, WHITE, audit=False),
                  T("3", fs, BASE2, audit=False), T(")", fs, GREY_B, audit=False)]
            g = VGroup(*pp).arrange(RIGHT, buff=0.1)
            pp[2].set_y(pp[1].get_y())
            pp[3].align_to(pp[1], DOWN)
            p.append(pp)
            groupes.append(g)
        xs = [T("×", fs * 0.85, WHITE, audit=False) for _ in range(2)]
        g = VGroup(groupes[0], xs[0], groupes[1], xs[1], groupes[2]).arrange(RIGHT, buff=0.32)
        for x in xs:
            x.set_y(p[0][1].get_y())
        g.p, g.x = p, xs
        return g

    def ecran_question_produit(self):
        self.ecran_table()
        bd = self.bande(1)
        self.add(bd)
        a = amina(0.9).move_to(P(-3.0, -0.55))
        lp = loupe(0.9).move_to(P(-1.2, 0.35))
        c_b = VGroup(ligne_base(VGroup(T("non,", 34), T("les bases", 34)).arrange(RIGHT, buff=0.14)),
                     T("sont différentes", 34)).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        c_c = ligne_base(VGroup(T("non, c'est", 34), puiss(6, 6, fs=40)).arrange(RIGHT, buff=0.16))
        choix = [T("oui", 36), c_b, c_c]
        plans = [[("oui", [choix[0]])], [("non,", [c_b[0][0]]), ("les bases", [c_b[0][1]]), ("sont", [c_b[1]])],
                 [("non,", [c_c[0]]), ("6 puissance", [c_c[1].base]), ("6.", [c_c[1].expo])]]
        rowA = self.facteurs(50).align_to(P(X_G + 0.1, 0), LEFT).set_y(1.68)
        rowB = self.paires(48).align_to(P(X_G + 0.1, 0), LEFT).set_y(0.72)
        cadres = [SurroundingRectangle(VGroup(*pp), color=EXPO_C, buff=0.12, corner_radius=0.08, stroke_width=3) for pp in rowB.p]
        tf = T("trois fois de suite", 34, EXPO_C).next_to(rowB, RIGHT, buff=0.35)
        six = [T("6", 50, VERT_OK).move_to(P(VGroup(*pp).get_x(), -0.42)) for pp in rowB.p]
        xs = [T("×", 42, WHITE).move_to(P(rowB.x[i].get_x(), six[0].get_y())) for i in range(2)]
        fl = [Arrow(VGroup(*pp).get_bottom() + DOWN * 0.16, s.get_top() + UP * 0.02, buff=0, color=VERT_OK, stroke_width=4,
                    max_tip_length_to_length_ratio=0.3) for pp, s in zip(rowB.p, six)]
        l8 = suite("8", "×", "27", "=", ["216", VERT_OK], fs=52, buff=0.2).align_to(P(X_G + 0.1, 0), LEFT).set_y(-1.6)
        l6 = suite((6, 3), "=", ["216", VERT_OK], fs=52, buff=0.2).align_to(P(1.0, 0), LEFT)
        l6.shift(UP * (pied(l8[0]) - pied(l6[0])))

        def avant(sc, q):
            sc.au("Ce calcul", FadeIn(q[0], shift=UP * 0.12), FadeIn(a, shift=UP * 0.2), FadeIn(lp, scale=0.4), rt=0.35)

        def apres(sc):
            l0 = sans_audit(sc.rep_base(0, ["Réponse A :", "oui !"], fs=34))
            coche_ = sc.mobjects[-1]  # la coche de la carte juste
            sc.au("oui", FadeIn(l0, shift=UP * 0.12), rt=0.3)
            sc.au("2 fois", FadeOut(a, rate_func=tot), FadeOut(lp, rate_func=tot), FadeOut(sc.cartes_q, rate_func=tot),
                  FadeOut(sc.tete_q, rate_func=tot), FadeOut(sc.q_q, rate_func=tot), FadeOut(coche_, rate_func=tot),
                  l0.animate(rate_func=tard).move_to(P(0, 2.85)).align_to(P(1.1, 0), LEFT), FadeIn(rowA[0:2], scale=1.2), rt=0.3)
            for ex, idx in (("fois", (2,)), ("2 fois", (3,)), ("fois", (4,)), ("2,", (5, 6)), ("fois 3", (7,)),
                            ("3 fois", (8, 9)), ("fois", (10,)), ("3 fois", (11,)), ("fois", (12,)), ("3.", (13, 14))):
                sc.au(ex, *[FadeIn(rowA[i], scale=1.2) for i in idx], rt=0.14)
            # les facteurs se déplacent : trois paires (2 × 3)
            sc.au("On regroupe", *[FadeOut(rowA[j]) for j in (0, 2, 4, 6, 7, 8, 10, 12, 14)], rt=0.3)
            for i, mot in enumerate(("paires", None, None)):
                pp = rowB.p[i]
                gest = [ReplacementTransform(rowA.d[i], pp[1], path_arc=-0.5), ReplacementTransform(rowA.d[i + 3], pp[3], path_arc=0.5),
                        FadeIn(pp[0]), FadeIn(pp[2]), FadeIn(pp[4])]
                if i:
                    gest.append(FadeIn(rowB.x[i - 1]))
                if i == 0:
                    sc.au("paires", *gest, rt=0.5)
                    sc.au("2 fois", Create(cadres[0]), rt=0.25)
                elif i == 1:
                    sc.au("trois fois", *gest, Create(cadres[1]), FadeIn(tf, shift=LEFT * 0.15), rt=0.4)
                else:
                    sc.au("de suite", *gest, Create(cadres[2]), rt=0.4)
            sc.au("6 fois", GrowArrow(fl[0]), FadeIn(six[0], scale=1.4), rt=0.2)
            sc.au("fois", FadeIn(xs[0]), rt=0.12)
            sc.au("6 fois", GrowArrow(fl[1]), FadeIn(six[1], scale=1.4), rt=0.18)
            sc.au("fois", FadeIn(xs[1]), rt=0.12)
            sc.au("6.", GrowArrow(fl[2]), FadeIn(six[2], scale=1.4), rt=0.25)
            sc.au("8 fois", FadeIn(l8[0], scale=1.3), rt=0.2)
            sc.au("fois", FadeIn(l8[1]), rt=0.15)
            sc.au("27,", FadeIn(l8[2], scale=1.3), rt=0.3)
            sc.au("216.", FadeIn(l8[3]), FadeIn(l8[4], scale=1.4), rt=0.3)
            sc.au("6 puissance", FadeIn(l6[0].base, scale=1.3), rt=0.2)
            sc.au("3,", FadeIn(l6[0].expo, scale=1.6), rt=0.25)
            sc.au("216.", FadeIn(l6[1]), FadeIn(l6[2], scale=1.4), rt=0.3)
            sc.play(l8[4].animate.scale(1.25), l6[2].animate.scale(1.25), run_time=0.22)
            sc.play(l8[4].animate.scale(1 / 1.25), l6[2].animate.scale(1 / 1.25), run_time=0.22)
            sc.au("Deuxième", Indicate(bd.calc, color=VERT_OK, scale_factor=1.06), rt=0.4)
            sc.tamponner(1, tampon(True).move_to(bd.slot), "juste", True)

        self.qpause("03q-question", "03r-reponse", choix, plans, 0, ["Réponse A : oui !"], avant=avant, apres=apres,
                    question=["Ce calcul est-il juste ?"])

    # ── 04 : troisième calcul : 10⁻² = −100 ────────────────────────────────
    def ecran_negatif(self):
        self.debut_enonce("04-negatif", 2, "Troisième", "Troisième calcul")
        r = self.ligne_article(2)
        self.poser_calcul([("10 puissance", [r[0].base], 1.3), ("moins", [r[0].moins], 1.6), ("2,", [r[0].chif], 1.6),
                           ("égale", [r[1]], 1.3), ("100.", [r[2]], 1.3)])
        l1 = T("Un exposant négatif,", 38, EXPO_C).move_to(P(-0.4, -1.45))
        l2 = T("donc un nombre négatif ?", 38).move_to(P(-0.4, -2.1))
        self.au("Un exposant", FadeIn(l1, shift=UP * 0.12), Indicate(r[0].expo, color=EXPO_C, scale_factor=1.8), rt=0.4)
        self.au("donc", FadeIn(l2, shift=RIGHT * 0.15), rt=0.35)
        self.attendre_voix(marge=0.5)

    # ── 04q : QUESTION : combien vaut 10⁻² ? ───────────────────────────────
    def ecran_question_negatif(self):
        self.ecran_table()
        bd = self.bande(2)
        self.add(bd)
        ex = suite((10, "−2"), "=", ["?", EXPO_C], fs=54, buff=0.22)
        ex.align_to(P(X_G + 0.05, 0), LEFT)
        ex.shift(UP * (1.45 - pied(ex[0])))
        choix = [T("−100", 44), T("−20", 44), T("0,01", 44)]
        plans = [[("100.", [choix[0]])], [("20.", [choix[1]])], [("0,01", [choix[2]])]]
        rep = T("0,01", 54, VERT_OK)
        rep.next_to(ex[1], RIGHT, buff=0.22)
        rep.shift(UP * (pied(ex[0]) - pied(rep)))
        l2 = suite("=", "1", "÷", (10, 2), fs=54, buff=0.22).align_to(ex[1], LEFT)
        l2.shift(UP * (0.62 - pied(l2[1])))
        # la droite graduée : −100 à gauche, 0, et 0,01 tout près de 0
        Y = -1.62
        X100, X0 = -5.4, 2.0
        dr = Line(P(X_G + 0.1, Y), P(4.9, Y), color=WHITE, stroke_width=3)
        t100 = Line(P(X100, Y - 0.13), P(X100, Y + 0.13), color=WHITE, stroke_width=3)
        t0 = Line(P(X0, Y - 0.13), P(X0, Y + 0.13), color=WHITE, stroke_width=3)
        e100 = sans_audit(T("−100", 30, PIEGE)).next_to(t100, DOWN, buff=0.1)
        e0 = T("0", 30, audit=False).next_to(t0, DOWN, buff=0.1)
        d100 = Dot(P(X100, Y), radius=0.11, color=PIEGE)
        d001 = Dot(P(X0 + 0.07, Y), radius=0.09, color=VERT_OK)
        e001 = sans_audit(T("0,01", 30, VERT_OK)).move_to(P(X0 + 0.72, Y + 0.3))
        tn = T("Un exposant négatif donne", 34).move_to(P(0, -0.1)).align_to(P(X_G + 0.05, 0), LEFT)
        lp = T("un petit nombre", 34, VERT_OK)
        ln = T("pas un nombre négatif", 34, PIEGE).move_to(P(0, -0.78)).align_to(P(X_G + 0.05, 0), LEFT)
        lp.move_to(P(X0, -0.78))
        ligne_base(VGroup(lp, ln))
        fp = Arrow(P(X0 + 0.07, lp.get_bottom()[1] - 0.12), d001.get_top() + UP * 0.02, buff=0, color=VERT_OK, stroke_width=4,
                   max_tip_length_to_length_ratio=0.25)
        fn = Arrow(P(X100, ln.get_bottom()[1] - 0.05), d100.get_top() + UP * 0.02, buff=0, color=PIEGE, stroke_width=4,
                   max_tip_length_to_length_ratio=0.25)

        def avant(sc, q):
            sc.poser_mots(q[0], [(0, "Combien"), (13, "10 puissance"), (15, "moins"), (16, "2 ?")],
                          avec={1: [FadeIn(ex[0].base, scale=1.3)], 2: [FadeIn(ex[0].moins, scale=1.5)],
                                3: [FadeIn(ex[0].chif, scale=1.5), FadeIn(ex[1]), FadeIn(ex[2], scale=1.4)]})

        def apres(sc):
            coche_ = sc.mobjects[-1]  # la coche de la carte juste
            l0 = sans_audit(sc.rep_base(0, ["Réponse C :", "0,01."], fs=34))
            sc.au("C :", FadeIn(l0[0], shift=UP * 0.12), rt=0.25)
            sc.au("0,01", FadeIn(l0[1], shift=UP * 0.12), FadeOut(ex[2]), FadeIn(rep, scale=1.4), rt=0.3)
            sc.pieges(0, 1)
            sc.au("C'est", FadeIn(l2[0]), rt=0.2)
            sc.au("1 divisé", FadeIn(l2[1], scale=1.3), rt=0.2)
            sc.au("divisé", FadeIn(l2[2]), rt=0.2)
            sc.au("10 puissance", FadeIn(l2[3].base, scale=1.3), rt=0.25)
            sc.au("2.", FadeIn(l2[3].expo, scale=1.6), rt=0.25)
            sc.au("Un exposant", FadeIn(tn, shift=UP * 0.12), Create(dr), FadeIn(t100), FadeIn(t0), FadeIn(e0),
                  FadeOut(sc.cartes_q, rate_func=tot), FadeOut(sc.tete_q, rate_func=tot), FadeOut(sc.q_q, rate_func=tot),
                  FadeOut(coche_, rate_func=tot), l0.animate(rate_func=tard).move_to(P(0, 2.85)).align_to(P(1.1, 0), LEFT), rt=0.45)
            sc.au("un petit", FadeIn(lp, shift=UP * 0.1), GrowArrow(fp), FadeIn(d001, scale=2), FadeIn(e001), rt=0.4)
            sc.au("pas un", FadeIn(ln, shift=UP * 0.1), GrowArrow(fn), FadeIn(d100, scale=2), FadeIn(e100), rt=0.4)
            sc.insister(VGroup(d001), 1.5, 0.2)
            sc.au("Troisième", Indicate(bd.calc, color=PIEGE, scale_factor=1.06), rt=0.4)
            sc.tamponner(2, tampon(False).move_to(bd.slot), "faux", False)

        self.qpause("04q-question", "04r-reponse", choix, plans, 2, ["Réponse C : 0,01."], avant=avant, apres=apres,
                    question=["Combien vaut 10⁻² ?"])

    # ── 05 : dernier calcul : le Soleil ────────────────────────────────────
    def nota(self, m, e, unite=None, fs=44, fs_u=None):
        ms = [T(m, fs), "×", (10, e)]
        if unite:
            ms.append(T(unite, fs_u or fs))
        g = suite(*ms, fs=fs, buff=0.14)
        return g

    def ecran_soleil(self):
        self.ecran_table("05-soleil")
        tit = T("Dernier calcul, le plus dur.", 44, JAUNE_TITRE).move_to(P(-0.4, 3.12))
        self.au("Dernier", FadeIn(tit, shift=UP * 0.12), rt=0.4)
        # l'article : ce qu'Amina écrit
        cadre = RoundedRectangle(width=9.6, height=0.92, corner_radius=0.12, fill_color=NUIT, fill_opacity=1,
                                 stroke_color=ARDOISE, stroke_width=3).move_to(P(X_G + 4.8, 2.2))
        ic = journal(0.42).move_to(P(X_G + 0.36, 2.2))
        lig = T("Lumière du Soleil :", 38)
        n = self.nota("5", 2, "s", fs=38)
        rg = VGroup(lig, n).arrange(RIGHT, buff=0.2).next_to(ic, RIGHT, buff=0.2)
        ligne_base(VGroup(lig, n[0]))
        n[1:].align_to(n[1:], DOWN)
        am = T("Amina écrit :", 28, CIEL).move_to(P(5.0, 2.2))
        self.au("Amina", FadeIn(cadre), FadeIn(ic, scale=0.5), FadeIn(am), rt=0.4)
        # le schéma
        Y = 0.45
        sol = soleil(0.4).move_to(P(-5.75, Y))
        te = terre(0.3).move_to(P(5.8, Y))
        ray = Line(P(-5.1, Y), P(5.4, Y), color=SOLEIL, stroke_width=4)
        self.au("la lumière", FadeIn(lig, shift=RIGHT * 0.15), FadeIn(sol, scale=0.5), FadeIn(te, scale=0.5), rt=0.4)
        self.poser_calcul([("5 fois", [n[0]], 1.3), ("fois", [n[1]], 1.3), ("10 puissance", [n[2].base], 1.3),
                           ("2 secondes", [n[2].expo], 1.6), ("secondes", [n[3]], 1.2)])
        ph = Dot(P(-5.1, Y), radius=0.1, color=WHITE)
        self.add(ph)
        self.au("pour arriver")
        self.play(Create(ray, rate_func=linear), ph.animate(rate_func=linear).move_to(P(5.4, Y)), run_time=1.1)
        self.remove(ph)
        # les deux données, écrites
        dist_t = T("La distance :", 38, CIEL)
        dist = self.nota("1,5", 8, "km", fs=38)
        haut = VGroup(dist_t, dist).arrange(RIGHT, buff=0.22).move_to(P(0, Y + 0.62))
        ligne_base(VGroup(dist_t, dist[0]))
        self.au("La distance", FadeIn(dist_t, shift=DOWN * 0.1), rt=0.3)
        self.poser_calcul([("1,5", [dist[0]], 1.3), ("fois", [dist[1]], 1.3), ("10 puissance", [dist[2].base], 1.3),
                           ("8 kilomètres", [dist[2].expo], 1.6), ("kilomètres", [dist[3]], 1.2)])
        vit_t = T("La vitesse de la lumière :", 38, CIEL)
        vit = self.nota("3", 5, "km/s", fs=38)
        bas = VGroup(vit_t, vit).arrange(RIGHT, buff=0.22).move_to(P(0, Y - 0.62))
        ligne_base(VGroup(vit_t, vit[0]))
        self.au("La vitesse", FadeIn(vit_t, shift=UP * 0.1), rt=0.3)
        self.poser_calcul([("3 fois", [vit[0]], 1.3), ("fois", [vit[1]], 1.3), ("10 puissance", [vit[2].base], 1.3),
                           ("5 kilomètres", [vit[2].expo], 1.6), ("kilomètres", [vit[3]], 1.2)])
        ph2 = Dot(P(-5.1, Y), radius=0.1, color=WHITE)
        self.play(ph2.animate.move_to(P(5.4, Y)), run_time=0.8, rate_func=linear)
        self.remove(ph2)
        l = T("On divise la distance par la vitesse.", 38).move_to(P(-0.4, -1.05))
        self.au("On divise", FadeIn(l, shift=UP * 0.12), rt=0.4)
        self.au("Mets pause")
        pz = T("Mets pause, et cherche !", 40, ORANGE_RETENUE).move_to(P(-1.2, -1.95))
        reb = CompteARebours(5, r=0.42).next_to(pz, RIGHT, buff=0.5)
        self.play(Write(pz), FadeIn(reb, scale=0.6), run_time=0.7)
        self.attendre_voix(marge=0.2)
        reb.jouer(self)

    # ── 05b : correction ───────────────────────────────────────────────────
    def ecran_correction(self):
        self.ecran_table("05b-correction")
        tit = T("Correction", 46, JAUNE_TITRE).move_to(P(-0.4, 3.15))
        self.au("Correction", Write(tit), rt=0.5)
        XL = X_G + 0.05
        div = sans_audit(suite("1,5", "×", (10, 8), "÷", "(", "3", "×", (10, 5), ")", fs=44, buff=0.13))
        div.align_to(P(XL, 0), LEFT)
        div.shift(UP * (2.17 - pied(div[0])))
        bd = self.bande(3, y=2.3, largeur=5.5, x_g=0.9, fs=44)
        self.play(FadeIn(div), FadeIn(bd), run_time=0.3)
        y1, y2, y3 = 1.42, 0.67, -0.08
        a = suite("1,5", "÷", "3", "=", ["0,5", BASE_C], fs=44, buff=0.18).align_to(P(XL, 0), LEFT)
        a.shift(UP * (y1 - pied(a[2])))
        b = suite(["8", EXPO_C], ["−", EXPO_C], ["5", EXPO_C], ["=", EXPO_C], ["3", EXPO_C], fs=44, buff=0.18).align_to(P(XL, 0), LEFT)
        b.shift(UP * (y2 - pied(b[0])))
        for m in b[1:2]:
            m.set_y(b[0].get_y())
        self.au("1,5", FadeIn(a[0], scale=1.3), rt=0.3)
        self.au("divisé", FadeIn(a[1]), rt=0.2)
        self.au("3,", FadeIn(a[2], scale=1.3), rt=0.25)
        self.au("0,5.", FadeIn(a[3]), FadeIn(a[4], scale=1.4), rt=0.3)
        self.au("8 moins", FadeIn(b[0], scale=1.3), Indicate(div[2].expo, color=EXPO_C, scale_factor=1.7), rt=0.25)
        self.au("moins", FadeIn(b[1]), rt=0.15)
        self.au("5,", FadeIn(b[2], scale=1.3), Indicate(div[7].expo, color=EXPO_C, scale_factor=1.7), rt=0.25)
        self.au("3.", FadeIn(b[3]), FadeIn(b[4], scale=1.4), rt=0.3)
        d = suite("=", ["0,5", WHITE], "×", (10, 3), fs=44, buff=0.18).align_to(P(XL, 0), LEFT)
        d.shift(UP * (y3 - pied(d[1])))
        d[3].shift(UP * (pied(d[1]) - pied(d[3])))   # le « 10 » sur la ligne de base des chiffres de « 0,5 »
        self.au("0,5 fois", FadeIn(d[0]), FadeIn(d[1], scale=1.3), rt=0.3)
        self.au("fois", FadeIn(d[2]), rt=0.15)
        self.au("10 puissance", FadeIn(d[3].base, scale=1.3), rt=0.25)
        self.au("3.", FadeIn(d[3].expo, scale=1.6), rt=0.25)
        # le piège : la carte rouge
        carte = RoundedRectangle(width=5.5, height=1.3, corner_radius=0.14, fill_color="#450a0a", fill_opacity=1,
                                 stroke_color=PIEGE, stroke_width=4).move_to(P(3.65, 0.85))
        c1 = T("Mais 0,5 n'est pas", 34, WHITE).move_to(P(3.65, 1.1))
        c2 = ligne_base(VGroup(T("entre 1 et", 34, WHITE), T("10.", 34, WHITE)).arrange(RIGHT, buff=0.15)).move_to(P(3.65, 0.6))
        self.au("Mais", FadeIn(carte, scale=0.9), rt=0.2)
        self.au("0,5 n'est", FadeIn(c1, shift=UP * 0.1), d[1].animate.set_color(PIEGE), rt=0.3)
        self.au("1 et", FadeIn(c2[0], shift=UP * 0.1), rt=0.15)
        self.au("10.", FadeIn(c2[1], shift=UP * 0.1), rt=0.25)
        self.insister(d[1], 1.3, 0.2)
        e = suite("0,5", "×", "1 000", "=", ["500", WHITE], fs=44, buff=0.18).align_to(P(XL, 0), LEFT)
        e.shift(UP * (-0.83 - pied(e[0])))
        self.au("0,5 fois", FadeIn(e[0], scale=1.3), rt=0.3)
        self.au("fois", FadeIn(e[1]), rt=0.15)
        self.au("1 000,", FadeIn(e[2], scale=1.3), rt=0.3)
        self.au("500 :", FadeIn(e[3]), FadeIn(e[4], scale=1.4), rt=0.3)
        f = suite("=", ["5", VERT_OK], "×", (10, 2, VERT_OK), fs=44, buff=0.18)
        f[1:].shift(RIGHT * 0.16)
        f.align_to(P(XL, 0), LEFT)
        f.shift(UP * (-1.68 - pied(f[1])))
        self.au("5 fois", FadeIn(f[0]), FadeIn(f[1], scale=1.3), rt=0.25)
        self.au("fois", FadeIn(f[2]), rt=0.15)
        self.au("10 puissance", FadeIn(f[3].base, scale=1.3), rt=0.25)
        self.au("2.", FadeIn(f[3].expo, scale=1.6), rt=0.25)
        cad = SurroundingRectangle(f[1:], color=VERT_OK, buff=0.14, corner_radius=0.1, stroke_width=4)
        self.play(Create(cad), run_time=0.25)
        self.au("Dernier", Indicate(bd.calc, color=VERT_OK, scale_factor=1.06), rt=0.4)
        self.tamponner(3, tampon(True).move_to(bd.slot), "juste", True)
        # 500 secondes, un peu plus de 8 minutes : l'horloge
        XH = 1.7
        hor = Circle(radius=0.55, color=WHITE, stroke_width=4).move_to(P(XH, -1.05))
        marq = VGroup(*[Line(hor.get_center() + 0.44 * np.array([np.cos(a_), np.sin(a_), 0]),
                             hor.get_center() + 0.52 * np.array([np.cos(a_), np.sin(a_), 0]), color=WHITE, stroke_width=3)
                        for a_ in np.linspace(0, TAU, 12, endpoint=False)])
        aig = Line(hor.get_center(), hor.get_center() + UP * 0.42, color=EXPO_C, stroke_width=5)
        s1 = T("500 secondes,", 34).move_to(P(0, -0.65)).align_to(P(XH + 0.8, 0), LEFT)
        s2 = T("un peu plus de", 34).move_to(P(0, -1.17)).align_to(P(XH + 0.8, 0), LEFT)
        s3 = T("8 minutes.", 34, VERT_OK).move_to(P(0, -1.69)).align_to(P(XH + 0.8, 0), LEFT)
        ligne_ = VGroup(s1, s2, s3)
        self.au("500 secondes", FadeIn(s1, shift=RIGHT * 0.15), FadeIn(hor), FadeIn(marq), FadeIn(aig), rt=0.35)
        self.au("un peu", FadeIn(s2, shift=RIGHT * 0.15), rt=0.3)
        self.au("8 minutes", FadeIn(s3, scale=1.25), Rotate(aig, angle=-TAU * 8, about_point=hor.get_center()), rt=0.9)
        self.attendre_voix(marge=0.5)

    # ── 06 : ce que tu as appris ───────────────────────────────────────────
    def ecran_finale(self):
        self.ecran_table("06-finale")
        tit = T("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.au("Ce que", Write(tit), rt=0.7)
        FS = 32
        pts = (((2.2, ("On additionne les exposants pour un produit,", WHITE), "On additionne"),
                (1.68, ("jamais pour une somme.", PIEGE), "jamais")),
               ((1.0, ("Avec le même exposant, on peut multiplier les bases.", BASE_C), "Avec le"),),
               ((0.32, ("Un exposant négatif donne un petit nombre,", VERT_OK), "Un exposant"),
                (-0.2, ("pas un nombre négatif.", PIEGE), "pas un")),
               ((-0.88, ("Et le nombre devant reste entre 1 et 10.", WHITE), "Et le"),))
        for pt in pts:
            for k, (yb, (tx, c), mot) in enumerate(pt):
                lg = T(tx, FS, c, audit=False).align_to(P(X_G + 0.6, 0), LEFT)
                lg.shift(UP * (yb - pied(lg)))
                if k == 0:
                    ck = self.coche(VERT_OK, 0.17).move_to(P(X_G + 0.2, yb + 0.12))
                    self.au(mot, Create(ck), FadeIn(lg, shift=RIGHT * 0.15), rt=0.35)
                else:
                    self.au(mot, FadeIn(lg, shift=RIGHT * 0.15), rt=0.35)
        q = T("Alors, combien de calculs as-tu bien jugés ?", 36, CIEL).move_to(P(-0.4, -1.58))
        self.au("Alors", FadeIn(q, shift=UP * 0.12), rt=0.4)
        self.play(*[Indicate(c, color=EXPO_C, scale_factor=1.1) for c in self.tm], run_time=0.6)
        e = T("Écris ton score en commentaire.", 40, VERT_OK).move_to(P(-0.4, -2.3))
        self.au("Écris", FadeIn(e, scale=1.15), rt=0.4)
        self.insister(e, 1.1, 0.25)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.score = [None] * 4
        self.page_de_garde()
        self.ecran_journaliste()
        self.ecran_somme()
        self.ecran_question_somme()
        self.ecran_produit()
        self.ecran_question_produit()
        self.ecran_negatif()
        self.ecran_question_negatif()
        self.ecran_soleil()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("07-abonne")


class PuissanceDefi3e(PuissanceDefi3eBase):
    identite = "Maths 3e — EleveAI"
    ceinture = "orange"
