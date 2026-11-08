# premier_definition.py
# EleveAI — Maths 4e — série « Divisibilité et nombres premiers », épisode 08 : NOMBRE PREMIER (définition).
# Paysage 16:9, AVEC VOIX, ceinture ORANGE. Micro : premier_definition.
# Décor et métier : Mia, mosaïste. Centres : art-design.
# Écrans : garde (00) ; les carreaux de Mia (01) ; deux diviseurs (02) ; et 1 ? (03) ;
# QUESTION 1 (03q) ; la liste jusqu'à 30 (04) ; le piège des impairs (05) ; QUESTION 2 (05q) ;
# défi (06) et correction (06b) ; ce que tu as appris (07) ; fin (08).
# Code couleur : un nombre premier jaune (une seule rangée), un rectangle possible bleu ciel, piège rouge.
# Voix : manim/voix/4e-premier-definition.json ; marques : premier_definition_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/premier_definition.py PremierDefinition4e
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/premier_definition.py PremierDefinition4e -o eleveai-maths-4e-premier-definition --media_dir manim/scripts/4e/media-div-08
# Sortie : manim/sorties/4e/maths/divisibilite/08-definition/eleveai-maths-4e-premier-definition.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from div_commun import *  # noqa: E402,F403

# Les émaux de la mosaïque (couleurs des carreaux)
EMAUX = ["#38bdf8", "#f472b6", "#facc15", "#34d399", "#a78bfa", "#fb923c"]
PREMIER = JAUNE_TITRE


def mia_mosaiste(s=0.72):
    """Mia : le tablier bleu et ses quatre carreaux de couleur, le foulard orange."""
    p = personne(peau="#e0ac69", tenue="#0369a1", cheveux="#7c2d12", longs=True, s=s)
    foulard = Rectangle(width=0.88 * s, height=0.11 * s, fill_color="#fb923c", fill_opacity=1, stroke_width=0)
    foulard.move_to(p.tete.get_center() + UP * 0.17 * s)
    poche = VGroup(*[Square(side_length=0.17 * s, fill_color=EMAUX[k], fill_opacity=1, stroke_color=WHITE, stroke_width=1)
                     for k in range(4)]).arrange_in_grid(2, 2, buff=0.03 * s)
    poche.move_to(p.corps.get_center() + DOWN * 0.15 * s)
    return VGroup(p, foulard, poche)


def carreau(cote=0.34, k=0, c=None):
    """Un petit carreau de mosaïque : émail de couleur, joint blanc."""
    return Square(side_length=cote, fill_color=c or EMAUX[(k * 7 + k // 3) % len(EMAUX)], fill_opacity=1,
                  stroke_color=WHITE, stroke_width=1.5)


def mosaique(lignes, colonnes, pas=0.4, cote=None, centre=ORIGIN, c=None):
    """`lignes` rangées de `colonnes` carreaux ; la rangée i = g[i*colonnes:(i+1)*colonnes]."""
    cote = cote or pas * 0.86
    g = VGroup()
    for i in range(lignes):
        for j in range(colonnes):
            g.add(carreau(cote, i * colonnes + j, c).move_to(P((j - (colonnes - 1) / 2) * pas, ((lignes - 1) / 2 - i) * pas)))
    return g.move_to(centre)


def tas(n, x0, x1, y0, y1, cote=0.3, graine=3, c=None):
    """n carreaux posés au hasard, un peu tournés, sans se toucher.
    Garde-fou : au plus 4 000 essais au hasard ; sinon une grille légèrement bougée ;
    si la zone est trop petite même pour la grille, erreur explicite."""
    rng = np.random.default_rng(graine)
    ecart = 1.5 * cote
    pts, essais = [], 0
    while len(pts) < n and essais < 4000:
        essais += 1
        p = (rng.uniform(x0, x1), rng.uniform(y0, y1))
        if all((p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 > ecart ** 2 for q in pts):
            pts.append(p)
    if len(pts) < n:
        nx = max(1, int((x1 - x0) / ecart) + 1)
        ny = max(1, int((y1 - y0) / ecart) + 1)
        if nx * ny < n:
            raise ValueError(f"tas : {n} carreaux ne tiennent pas dans {x1 - x0:.2f} × {y1 - y0:.2f} (côté {cote})")
        cases = [(i, j) for j in range(ny) for i in range(nx)]
        rng.shuffle(cases)
        dx = (x1 - x0) / max(1, nx - 1) if nx > 1 else 0
        dy = (y1 - y0) / max(1, ny - 1) if ny > 1 else 0
        pts = [(x0 + i * dx + rng.uniform(-0.12, 0.12) * dx, y0 + j * dy + rng.uniform(-0.12, 0.12) * dy)
               for i, j in sorted(cases[:n], key=lambda c: (c[1], c[0]))]
    return VGroup(*[carreau(cote, k, c).move_to(P(*p)).rotate(rng.uniform(-0.5, 0.5)) for k, p in enumerate(pts)])


def rangees(e):
    """« 2 rangées de 6, » : le nombre de rangées jaune, la longueur bleu ciel (la ponctuation reste blanche)."""
    nombres = [a for a in e.atomes if a.original_text.isdigit()]
    nombres[0].set_color(PETIT)
    nombres[-1].set_color(GRAND)
    return e


def tableau_mosaique(n=6, cote=0.36, centre=ORIGIN):
    """Un tableau de mosaïque (le décor des questions) : un soleil sur fond bleu, dans un cadre."""
    g = VGroup()
    for i in range(n):
        for j in range(n):
            d = ((i - (n - 1) / 2) ** 2 + (j - (n - 1) / 2) ** 2) ** 0.5
            c = "#facc15" if d < 1.2 else ("#fb923c" if d < 2.0 else ("#38bdf8" if (i + j) % 2 else "#0ea5e9"))
            g.add(carreau(cote * 0.92, 0, c).move_to(P((j - (n - 1) / 2) * cote, ((n - 1) / 2 - i) * cote)))
    cadre = SurroundingRectangle(g, color="#d97706", buff=0.1, stroke_width=6)
    return VGroup(g, cadre).move_to(centre)


class PremierDefinition4e(PaysageDiv):
    nom_voix = "4e-premier-definition"
    fichier_marques = "premier_definition_marques.json"
    ceinture = "orange"
    larg_cartes = None

    def _disposer_q(self, question, choix, phrase):
        """Des cartes plus larges quand les choix sont des phrases (question 2)."""
        hauteurs = [c.height for c in choix]
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        if not self.larg_cartes:
            return tete, q, cartes, pause, rebours, ph
        for c, h in zip(choix, hauteurs):  # les cartes étroites les avaient rétrécis
            c.scale_to_fit_height(h)
        neuves = VGroup(*[self._carte_choix(l, c, self.larg_cartes, 34) for l, c in zip("ABC", choix)])
        neuves.arrange(DOWN, buff=0.14).align_to(cartes, UP).align_to(P(self.XL, 0), LEFT)
        pause.next_to(neuves, DOWN, buff=0.25).set_x(neuves.get_x())
        ph.next_to(neuves, DOWN, buff=0.2).align_to(P(self.XL, 0), LEFT)
        self.cartes_q = neuves
        return tete, q, neuves, pause, rebours, ph

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Les nombres premiers", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Les nombres", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        m12 = mosaique(3, 4, pas=0.36, centre=P(-4.9, 0.95))
        m7 = mosaique(1, 7, pas=0.36, centre=P(-4.35, -0.4), c=PREMIER)
        l1 = self.lg("Pourquoi certains nombres", 2.0, 0.75, 46, maxw=8)
        self.dit(l1, "Pourquoi certains nombres", avec=[LaggedStart(*[FadeIn(f, scale=0.4) for f in m12], lag_ratio=0.03)])
        l2 = self.lg("ne se cassent pas ?", 2.0, -0.1, 54, JAUNE_TITRE, maxw=8)
        self.dit(l2, "ne se cassent pas ?", avec=[LaggedStart(*[FadeIn(f, scale=0.4) for f in m7], lag_ratio=0.05)])
        self.insister(l2, 1.15, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : les carreaux de Mia ────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = mia_mosaiste().move_to(P(-5.9, 2.35))
        vrac = tas(12, -4.6, -1.2, -1.2, 2.6)
        a1 = self.lg("Mia est mosaïste :", 3.2, 3.0, 40, CIEL)
        self.dit(a1, "Mia est mosaïste :", avec=[FadeIn(p, shift=UP * 0.3)])
        a2 = self.lg("elle assemble", 3.2, 2.35, 38)
        self.dit(a2, "elle assemble", avec=[LaggedStart(*[FadeIn(f, scale=0.4) for f in vrac], lag_ratio=0.05)])
        a2b = self.lg("des petits carreaux", 3.2, 1.75, 38)
        self.dit(a2b, "des petits carreaux")
        a3 = self.lg("pour faire des tableaux.", 3.2, 1.15, 38)
        tab = tableau_mosaique(5, 0.3, centre=P(3.2, -0.5))
        self.dit(a3, "pour faire des tableaux.", avec=[FadeIn(tab, scale=0.8)])
        # Avec 12 carreaux : on efface le début, les carreaux restent
        self.au("Avec 12", FadeOut(VGroup(a1, a2, a2b, a3, tab)), rt=0.3)
        self.dire_eq(F("Avec 12 carreaux,", 40, CIEL).move_to(P(3.2, 3.0)), "Avec 12 carreaux,", echelle=1.1)
        self.dit(self.lg("elle fait des rectangles :", 3.2, 2.35, 38), "elle fait des rectangles :")
        r26 = mosaique(2, 6, pas=0.4, centre=P(-2.8, 1.7))
        self.dire_eq(rangees(F("2 rangées de 6,", 40)).move_to(P(3.2, 1.5)), "2 rangées de 6,", echelle=1.15,
                     avec=[Transform(vrac, r26, run_time=0.9)])
        r34 = mosaique(3, 4, pas=0.4, centre=P(-2.8, -0.1))
        self.dire_eq(rangees(F("3 rangées de 4.", 40)).move_to(P(3.2, 0.85)), "3 rangées de 4.", echelle=1.15,
                     avec=[TransformFromCopy(vrac, r34, run_time=0.9)])
        self.dire_eq(F("Avec 7 carreaux,", 40, PREMIER).move_to(P(3.2, -0.2)), "Avec 7 carreaux,", echelle=1.1)
        imp = self.lg("impossible :", 3.2, -0.85, 46, PIEGE)
        essai = mosaique(2, 4, pas=0.4, centre=P(-2.8, -2.2), c=PREMIER)
        trou = essai[-1]
        vide = DashedVMobject(Square(side_length=0.34, color=PIEGE, stroke_width=4).move_to(trou), num_dashes=12)
        self.dit(imp, "impossible :", avec=[LaggedStart(*[FadeIn(f, scale=0.4) for f in essai[:-1]], lag_ratio=0.05), Create(vide)])
        sept = mosaique(1, 7, pas=0.4, centre=P(-2.8, -2.2), c=PREMIER)
        fin7 = F("une seule rangée de 7.", 40, PREMIER)
        fin7.scale_to_fit_width(min(fin7.width, 6.2)).move_to(P(3.2, -1.6))
        self.dire_eq(fin7, "une seule rangée de 7.", echelle=1.1)
        self.play(FadeOut(vide), ReplacementTransform(essai[:-1], sept), run_time=0.6)
        self.insister(fin7, 1.12, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 : deux diviseurs, pas plus ───────────────────────────────────────
    def ecran_diviseurs(self):
        self.ecran("02-diviseurs")
        m12 = mosaique(3, 4, pas=0.36, centre=P(-5.0, 2.0))
        self.dire_eq(F("12 a six diviseurs :", 42, CIEL).move_to(P(0.9, 2.75)), "12 a six diviseurs :", echelle=1.1,
                     avec=[FadeIn(m12)])
        nb = [1, 2, 3, 4, 6, 12]
        e = self.liste(nb, 1.85, fs=54)
        e.set_x(0.9)
        self.dire_eq(e, "1, 2, 3, 4, 6, 12", echelle=1.3)
        m7 = mosaique(1, 7, pas=0.36, centre=P(-5.0, 0.15), c=PREMIER)
        self.dire_eq(F("7 n'en a que deux :", 42, PREMIER).move_to(P(0.9, 0.55)), "7 n'en a que deux :", echelle=1.1,
                     avec=[FadeIn(m7)])
        sept = F("1 et 7", 54).move_to(P(0.9, -0.3))
        self.dire_eq(sept, "1 et 7", echelle=1.3)
        d1 = self.lg("Un nombre premier a exactement", 0, -1.55, 42, JAUNE_TITRE, maxw=11)
        self.dit(d1, "Un nombre premier a exactement")
        d2 = F("deux diviseurs : 1 et lui-même.", 42, JAUNE_TITRE).move_to(P(0, -2.25))
        self.dire_eq(d2, "deux diviseurs : 1 et lui-même.", echelle=1.1)
        self.play(Create(self.cadre_ok(VGroup(d1, d2), 0.18)), run_time=0.3)
        self.insister(VGroup(d1, d2), 1.06, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 03 : et 1 ? ─────────────────────────────────────────────────────────
    def ecran_un(self):
        self.ecran("03-un")
        un = carreau(1.1, 0, PREMIER).move_to(P(-3.6, 0.6))
        n1 = T("1", 60, BLACK, audit=False, gras=True).move_to(un)
        t1 = F("Et 1 ?", 60, JAUNE_TITRE).move_to(P(2.2, 2.75))
        self.dire_eq(t1, "Et 1 ?", echelle=1.2, avec=[FadeIn(un, scale=0.5), FadeIn(n1)])
        self.dit(self.lg("Il n'a qu'un seul diviseur :", 2.2, 1.6, 40, maxw=8), "Il n'a qu'un seul diviseur :")
        lm = self.lg("lui-même.", 2.2, 0.95, 44, CIEL)
        self.dit(lm, "lui-même.", avec=[Circumscribe(un, color=CIEL)])
        pd = self.lg("Pas deux.", 2.2, -0.1, 46, PIEGE)
        self.dit(pd, "Pas deux.")
        donc = F("Donc 1 n'est pas premier.", 46, PIEGE).move_to(P(0.6, -1.35))
        self.dire_eq(donc, "Donc 1 n'est pas premier.", echelle=1.1)
        self.play(Create(RoundedRectangle(width=donc.width + 0.6, height=donc.height + 0.4, corner_radius=0.08,
                                          color=PIEGE, stroke_width=4).move_to(donc)), run_time=0.3)
        self.insister(donc, 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 03q : QUESTION 1 ────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = -1.2
        fig = tableau_mosaique(6, 0.42, centre=P(-4.4, 0.2))

        def avant(sc):
            sc.eq_dans_q(0, "Lequel est premier ?", "Lequel est premier ?", lettres="")
            sc.play(FadeIn(fig, scale=0.9), run_time=0.4)

        def apres(sc):
            sc.reponse(("Réponse C : 17.", "Réponse C : 17."),
                       ("Ses seuls diviseurs sont 1 et 17.", "Ses seuls diviseurs sont 1 et 17."),
                       ("9 = 3 × 3, et 15 = 3 × 5.", "9 égale 3 fois 3, et 15 égale 3 fois 5."))

        self.question_pause("03q-question", "03r-reponse", ["Lequel est premier ?"],
                            [E("9", 40, lettres=""), E("15", 40, lettres=""), E("17", 40, lettres="")], 2,
                            ["Réponse C : 17.", "Ses seuls diviseurs sont 1 et 17.", "9 = 3 × 3, et 15 = 3 × 5."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 04 : la liste jusqu'à 30 ────────────────────────────────────────────
    def ecran_liste(self):
        self.ecran("04-liste")
        self.dire_eq(F("La liste jusqu'à 30, à connaître :", 44, CIEL).move_to(P(0, 3.2)),
                     "La liste jusqu'à 30, à connaître :", echelle=1.05)
        PREM = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
        cote = 0.66
        cases, nums = {}, {}
        grille = VGroup()
        for n in range(1, 31):
            i, j = (n - 1) // 10, (n - 1) % 10
            c = Square(side_length=cote * 0.92, stroke_color="#64748b", stroke_width=2, fill_color=FOND_CARTE, fill_opacity=1)
            c.move_to(P((j - 4.5) * cote, 2.05 - i * cote))
            t = T(str(n), 30, "#cbd5e1", audit=False).move_to(c)
            cases[n], nums[n] = c, t
            grille.add(c, t)
        self.play(FadeIn(grille), run_time=0.4)
        e = F(", ".join(str(n) for n in PREM), 50, PREMIER)
        if e.width > 12:
            e.scale_to_fit_width(12)
        e.move_to(P(0, -0.05))
        # chaque nombre de la liste s'écrit sur SON mot, et sa case s'allume en même temps
        voix = self._texte_voix
        debut = voix.find("2, 3, 5")
        fin = debut + len("2, 3, 5, 7, 11, 13, 17, 19, 23, 29")
        lots = self._plan_eq(e, debut, fin)
        for k, (pos, atomes) in enumerate(lots):
            self._attendre_pos(pos)
            d = 0.22
            if k + 1 < len(lots):
                gap = self._debut_voix + self._t_pos(lots[k + 1][0]) - self.renderer.time
                d = max(0.08, min(0.22, gap - 0.01))
            anims = [FadeIn(a, scale=1.3) for a in atomes]
            for a in atomes:
                if a.original_text.isdigit() and int(a.original_text) in cases:
                    n = int(a.original_text)
                    anims += [cases[n].animate.set_fill(PREMIER, 0.9).set_stroke(PREMIER), nums[n].animate.set_color(BLACK)]
            self.play(*anims, run_time=d)
        dix = self.lg("Dix nombres premiers.", 0, -1.2, 48, JAUNE_TITRE)
        self.dit(dix, "Dix nombres premiers.")
        self.insister(dix, 1.15, 0.2)
        seul = F("2 est le seul qui soit pair.", 42, CIEL).move_to(P(-0.6, -2.2))
        self.dire_eq(seul, "2 est le seul qui soit pair.", echelle=1.1,
                     avec=[Circumscribe(VGroup(cases[2], nums[2]), color=CIEL, buff=0.06)])
        self.play(Indicate(nums[2], color=BLACK, scale_factor=1.4), run_time=0.4)
        self.attendre_voix(marge=0.8)

    # ── 05 : le piège des nombres impairs ───────────────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        self.dit(self.lg("Le piège : croire qu'un nombre impair est premier.", 0, 3.15, 40, PIEGE, maxw=12.6),
                 "Le piège : croire qu'un nombre impair est premier.")
        donnees = [(9, 3, -5.3), (15, 5, -3.25), (21, 7, -0.55), (27, 9, 3.15)]
        pas = 0.3
        rects, vracs, etiq = [], [], []
        for k, (n, col, x) in enumerate(donnees):
            r = mosaique(3, col, pas=pas, centre=P(x, 0.85), c=CIEL)
            v = tas(n, x - col * pas / 2 - 0.3, x + col * pas / 2 + 0.3, 0.05, 1.65, cote=0.2, graine=10 + k)
            for f in v:
                f.set_fill(CIEL, 1)
            rects.append(r)
            vracs.append(v)
            lab = E(str(n), 46, lettres="").move_to(P(x, 2.1))
            etiq.append(lab)
        frag = ["9, 15", "15, 21", "21, 27", "27 sont"]
        for lab, v, ph in zip(etiq, vracs, frag):
            self.dire_eq(lab, ph, echelle=1.3, avec=[LaggedStart(*[FadeIn(f, scale=0.4) for f in v], lag_ratio=0.02)])
        self.dit(self.lg("sont impairs,", -0.6, -0.55, 40), "sont impairs,")
        par3 = F("mais tous divisibles par 3.", 42, CIEL).move_to(P(-0.6, -1.3))
        self.dire_eq(par3, "mais tous divisibles par 3.", echelle=1.1,
                     avec=[*[Transform(v, r, run_time=0.9) for v, r in zip(vracs, rects)]])
        trois = VGroup(*[T("3", 30, JAUNE_TITRE, audit=False).next_to(r, LEFT, buff=0.12) for r in rects])
        self.play(FadeIn(trois), run_time=0.25)
        ils = self.lg("Ils ne sont pas premiers.", -0.6, -2.25, 46, PIEGE)
        self.dit(ils, "Ils ne sont pas premiers.")
        self.insister(ils, 1.12, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 05q : QUESTION 2 ────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = -4.0
        self.larg_cartes = 9.6
        un = carreau(1.2, 0, PREMIER).move_to(P(-5.6, 0.3))
        n1 = T("1", 64, BLACK, audit=False, gras=True).move_to(un)

        def avant(sc):
            sc.eq_dans_q(0, "1 est-il premier ?", "1 est-il premier ?", lettres="")
            sc.play(FadeIn(un, scale=0.5), FadeIn(n1), run_time=0.4)

        def apres(sc):
            sc.reponse(("Réponse B : non.", "Réponse B : non."),
                       ("1 n'a qu'un seul diviseur.", "1 n'a qu'un seul diviseur."),
                       ("Il en faut exactement deux.", "Il en faut exactement deux."))

        self.question_pause("05q-question", "05r-reponse", ["1 est-il premier ?"],
                            [E("oui, il est divisible par 1 et par lui-même", 34, lettres=""),
                             E("non, il n'a qu'un seul diviseur", 34, lettres=""),
                             E("oui, c'est le premier nombre", 34, lettres="")], 1,
                            ["Réponse B : non.", "1 n'a qu'un seul diviseur.", "Il en faut exactement deux."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL
        self.larg_cartes = None

    # ── 06 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("06-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 2.9))
        self.au("À toi", Write(tit), rt=0.5)
        p = mia_mosaiste().move_to(P(-5.6, 0.9))
        v21 = tas(21, -4.5, -2.7, -0.9, 1.9, cote=0.26, graine=21)
        v23 = tas(23, -2.3, -0.4, -0.9, 1.9, cote=0.26, graine=23)
        e1 = F("Mia a 21 carreaux,", 40).move_to(P(3.2, 1.75))
        self.dire_eq(e1, "Mia a 21 carreaux,", echelle=1.1,
                     avec=[FadeIn(p), LaggedStart(*[FadeIn(f, scale=0.4) for f in v21], lag_ratio=0.03)])
        e2 = F("puis 23.", 40).move_to(P(3.2, 1.1))
        self.dire_eq(e2, "puis 23.", echelle=1.1, avec=[LaggedStart(*[FadeIn(f, scale=0.4) for f in v23], lag_ratio=0.03)])
        q = self.lg("Lequel est premier ?", 3.2, 0.1, 46, JAUNE_TITRE, maxw=5.6)
        self.dit(q, "Lequel est premier ?")
        self.insister(q, 1.1, 0.2)
        pz = T("Mets pause, et cherche !", 50, ORANGE_RETENUE).move_to(P(-0.4, -1.9))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.attendre_voix(marge=2.0)

    # ── 06b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        self.ecran("06b-correction")
        self.au("Correction", FadeIn(T("Correction", 46, JAUNE_TITRE).move_to(P(0, 3.2))), rt=0.25)
        sep = DashedLine(P(-0.05, 2.6), P(-0.05, -2.3), color="#475569", stroke_width=2)
        self.play(Create(sep), run_time=0.2)
        e21 = colorer_paire(F("21 = 3 × 7", 50)).move_to(P(-3.6, 2.35))
        e21.atomes[0].set_color(WHITE)
        e21.atomes[2].set_color(PETIT)
        self.dire_eq(e21, "21 égale 3 fois 7", echelle=1.2)
        m37 = mosaique(3, 7, pas=0.32, centre=P(-3.6, -0.1), c=CIEL)
        self.dire_eq(F("Mia peut faire", 38).move_to(P(-3.6, 1.6)), "Mia peut faire", echelle=1.1)
        self.dire_eq(rangees(F("3 rangées de 7.", 38)).move_to(P(-3.6, 1.0)), "3 rangées de 7.", echelle=1.1,
                     avec=[LaggedStart(*[FadeIn(f, scale=0.4) for f in m37], lag_ratio=0.02)])
        n21 = F("21 n'est pas premier.", 40, PIEGE).move_to(P(-3.6, -1.15))
        self.dire_eq(n21, "21 n'est pas premier.", echelle=1.1)
        a23 = F("23 n'a que deux diviseurs,", 36).move_to(P(3.45, 2.35))
        self.dire_eq(a23, "23 n'a que deux diviseurs,", echelle=1.1)
        b23 = F("1 et 23 : une seule rangée.", 36, PREMIER).move_to(P(3.45, 1.55))
        m23 = mosaique(1, 23, pas=0.255, centre=P(3.45, 0.35), c=PREMIER)
        self.dire_eq(b23, "1 et 23 : une seule rangée.", echelle=1.1,
                     avec=[LaggedStart(*[FadeIn(f, scale=0.4) for f in m23], lag_ratio=0.03)])
        p23 = F("23 est premier.", 44, VERT_OK).move_to(P(3.45, -1.15))
        self.dire_eq(p23, "23 est premier.", echelle=1.1)
        self.play(Create(self.cadre_ok(p23, 0.16)), run_time=0.2)
        self.attendre_voix(marge=1.0)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        self.XL = -1.5
        fig = VGroup(mosaique(3, 4, pas=0.3, c=CIEL), mosaique(1, 7, pas=0.3, c=PREMIER))
        fig.arrange(DOWN, buff=0.45)
        lignes = self.finale_colonne([["Un nombre premier a exactement", "deux diviseurs : 1 et lui-même."],
                                      ["1 n'est pas premier."],
                                      ["Jusqu'à 30 : 2, 3, 5, 7, 11,", "13, 17, 19, 23, 29."]], fs=40, figure=fig)
        self.XL = type(self).XL
        self.play(FadeIn(fig), run_time=0.25)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_diviseurs()
        self.ecran_un()
        self.ecran_question1()
        self.ecran_liste()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("08-abonne")
