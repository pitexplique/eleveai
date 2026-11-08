# puissance_simple_valeurs.py
# EleveAI — Maths 5e — série « Carré et cube », épisode 02 : LES VALEURS À CONNAÎTRE.
# Paysage 16:9, AVEC VOIX, ceinture BLANCHE. Micro : puissance_simple_valeurs
# (les carrés de 0 à 12, les cubes 2³, 3³, 10³). Programme 5e 2026 : carré et cube
# seulement, aucun exposant au-delà de 3.
# Décor et métier : Karim, chef pâtissier, range ses macarons en carrés. Centre : cuisine.
# Écrans : garde (00) ; les plaques de Karim (01) ; les carrés de 1 à 6 (02) ; de 7 à 12,
# et 0 (03) ; l'astuce de la bordure (04) ; QUESTION 1 (04q) ; trois cubes (05) ;
# le piège 10³ ≠ 30 (06) ; QUESTION 2 (06q) ; défi (07) et correction (07b) ;
# ce que tu as appris (08) ; fin (09).
# Code couleur de la série : BLEU = la base, ORANGE = l'exposant, VERT = résultat juste,
# ROUGE = le piège. Les bordures de macarons changent de parfum à chaque carré.
# Voix : manim/voix/5e-puissance-valeurs.json (débit −6), WAV dans public/sons/5e-puissance-valeurs/ ;
# marques : puissance_simple_valeurs_marques.json (equation_commun.py, mot à mot).
# « ² » se pose sur le mot « carré », « ³ » sur le mot « cube » (PAROLE, ci-dessous).
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/5e/puissance_simple_valeurs.py PuissanceSimpleValeurs5e --media_dir manim/scripts/5e/media-ps-02-dry
# Rendu : python -m manim render -qh --disable_caching manim/scripts/5e/puissance_simple_valeurs.py PuissanceSimpleValeurs5e -o eleveai-maths-5e-puissance-valeurs --media_dir manim/scripts/5e/media-ps-02
# Sortie : manim/sorties/5e/maths/puissance-simple/02-valeurs/eleveai-maths-5e-puissance-valeurs.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parent / "4e"))
sys.path.insert(0, str(ICI))

from relatif_commun import *  # noqa: E402,F403
from relatif_commun import PAROLE  # noqa: E402

PAROLE["²"] = "carré"
PAROLE["³"] = "cube"
PAROLE.pop("0", None)  # ici, la voix lit « 0 », pas « zéro »

BASE_C = BLEU_CALCUL       # la base
EXPO_C = ORANGE_RETENUE    # l'exposant
JUSTE = VERT_OK
SAVEURS = ["#f9a8d4", "#c4b5fd", "#fde68a", "#d6a77a"]  # rose, violette, citron, café
PLAQUE = "#1e293b"
SUCRE = "#f1f5f9"
BOIS = "#b45309"


# ── l'écriture ─────────────────────────────────────────────────────────────

def colorer(e, verts=(), rouges=(), expo_seul=False):
    """Le code couleur : l'atome devant ² ou ³ en bleu, ² ³ en orange ;
    `verts` / `rouges` : les indices d'atomes à mettre en vert / rouge."""
    a = e.atomes
    for i, x in enumerate(a):
        if x.original_text in "²³":
            x.set_color(EXPO_C)
            # ² et ³ un peu plus grands : lisibles de loin, collés à leur base
            x.scale(1.18, about_point=x.get_corner(DL))
            if i and not expo_seul:
                a[i - 1].set_color(BASE_C)
    for i in verts:
        a[i].set_color(JUSTE)
    for i in rouges:
        a[i].set_color(PIEGE)
    return e


def zeros_orange(t, nb):
    """Les zéros d'un nombre écrit (« 100 », « 000 ») en orange : l'exposant les compte."""
    for k, ch in enumerate(nb):
        if ch == "0" and k < len(t.submobjects):
            t[k].set_color(EXPO_C)
    return t


def exposants_orange(t):
    """Dans un Text simple : ² et ³ en orange."""
    s = [c for c in t.original_text if not c.isspace()]
    for k, c in enumerate(s):
        if c in "²³" and k < len(t.submobjects):
            t[k].set_color(EXPO_C)
    return t


# ── les dessins ────────────────────────────────────────────────────────────

def karim(s=0.62):
    """Karim, chef pâtissier : veste blanche et toque."""
    p = personne(peau="#8d5524", tenue="#f8fafc", cheveux="#111827", s=s)
    c = p.tete.get_center()
    r = p.tete.width / 2
    bande = RoundedRectangle(width=r * 1.9, height=r * 0.5, corner_radius=r * 0.08, fill_color=WHITE,
                             fill_opacity=1, stroke_color="#cbd5e1", stroke_width=1.5).move_to(c + UP * r * 0.95)
    bouffe = VGroup(*[Circle(radius=r * k, fill_color=WHITE, fill_opacity=1, stroke_color="#cbd5e1", stroke_width=1.5)
                      .move_to(c + P(dx * r, r * 1.55)) for dx, k in ((-0.55, 0.5), (0.55, 0.5), (0, 0.62))])
    boutons = VGroup(*[Dot(p.corps.get_center() + P(0, 0.3 * s - k * 0.32 * s), radius=0.04 * s / 0.62,
                           color="#64748b") for k in range(3)])
    p.add(boutons, bouffe, bande)
    return p


def macaron(r=0.12, c=SAVEURS[0]):
    """Un macaron vu de dessus : la coque et son reflet."""
    coque = Circle(radius=r, fill_color=c, fill_opacity=1,
                   stroke_color=interpolate_color(ManimColor(c), BLACK, 0.35), stroke_width=1.5)
    reflet = Circle(radius=r * 0.45, fill_color=interpolate_color(ManimColor(c), WHITE, 0.45), fill_opacity=1,
                    stroke_width=0).move_to(coque.get_center() + P(-r * 0.22, r * 0.22))
    return VGroup(coque, reflet)


def case(o, i, j, pas):
    """Le centre de la case (rangée i depuis le bas, colonne j), coin bas-gauche o."""
    return np.array(o) + P((j + 0.5) * pas, (i + 0.5) * pas)


def bordure(n, o, pas, c=None, r=None):
    """La bordure qui fait passer du carré n − 1 au carré n : 2n − 1 macarons
    (la rangée du haut, puis la colonne de droite)."""
    c = c or SAVEURS[(n - 1) % 4]
    r = r or pas * 0.4
    cases = [(n - 1, j) for j in range(n)] + [(i, n - 1) for i in range(n - 2, -1, -1)]
    return VGroup(*[macaron(r, c).move_to(case(o, i, j, pas)) for i, j in cases])


def carre_plein(n, o, pas, r=None, une=None):
    """Le carré n × n, bordure par bordure (une saveur par bordure, ou `une` pour toutes)."""
    return VGroup(*[bordure(k, o, pas, une, r) for k in range(1, n + 1)])


def plaque(n, o, pas, marge=0.12):
    """La plaque de cuisson sous le carré n × n."""
    w = max(n, 1) * pas + 2 * marge
    p = RoundedRectangle(width=w, height=w, corner_radius=min(0.14, w * 0.12), fill_color=PLAQUE, fill_opacity=1,
                         stroke_color="#94a3b8", stroke_width=3)
    return p.move_to(np.array(o) + P(w / 2 - marge, w / 2 - marge))


def grille_vide(n, o, pas):
    """Une plaque n × n vide : les cases en pointillés fins."""
    g = VGroup()
    for k in range(n + 1):
        g.add(Line(np.array(o) + P(k * pas, 0), np.array(o) + P(k * pas, n * pas), color="#475569", stroke_width=1.5))
        g.add(Line(np.array(o) + P(0, k * pas), np.array(o) + P(n * pas, k * pas), color="#475569", stroke_width=1.5))
    return g


def petit_cube(s=0.5, couleur="#38bdf8", dx=0.42, dy=0.3):
    """Un petit cube en perspective cavalière (face, dessus, côté) — de puissance_comprendre."""
    face = Square(s, fill_color=couleur, fill_opacity=1, stroke_color="#0f172a", stroke_width=2)
    a, b = face.get_corner(UL), face.get_corner(UR)
    c = face.get_corner(DR)
    d = P(dx * s, dy * s)
    dessus = Polygon(a, b, b + d, a + d, fill_color=interpolate_color(ManimColor(couleur), WHITE, 0.35),
                     fill_opacity=1, stroke_color="#0f172a", stroke_width=2)
    cote_ = Polygon(b, c, c + d, b + d, fill_color=interpolate_color(ManimColor(couleur), BLACK, 0.3),
                    fill_opacity=1, stroke_color="#0f172a", stroke_width=2)
    return VGroup(face, dessus, cote_)


def cube_empile(n=3, s=0.62, origine=ORIGIN, couleur="#38bdf8", dx=0.42, dy=0.3):
    """Les n³ petits cubes, rangés par couche : couches[j] (de bas en haut),
    dans l'ordre de peinture (du fond vers l'avant)."""
    couches = []
    for j in range(n):
        cj = VGroup()
        for k in range(n - 1, -1, -1):
            for i in range(n):
                c = petit_cube(s, couleur, dx, dy)
                c.move_to(np.array(origine) + P(i * s + k * dx * s, j * s + k * dy * s))
                cj.add(c)
        couches.append(cj)
    return couches


def caisse(a=2.0, n=10, k=0.55):
    """La caisse de 10 × 10 × 10 morceaux de sucre (face, dessus, côté quadrillés)."""
    v = P(0.42 * a * k, 0.3 * a * k)
    A, B, C, D = P(0, 0), P(a, 0), P(a, a), P(0, a)
    fa = Polygon(A, B, C, D, fill_color=SUCRE, fill_opacity=1, stroke_width=0)
    de = Polygon(D, C, C + v, D + v, fill_color=WHITE, fill_opacity=1, stroke_width=0)
    co = Polygon(B, C, C + v, B + v, fill_color="#cbd5e1", fill_opacity=1, stroke_width=0)
    traits = VGroup()
    gris = "#94a3b8"
    for i in range(1, n):
        t = i / n
        traits.add(Line(A + (B - A) * t, D + (C - D) * t, color=gris, stroke_width=1.2))
        traits.add(Line(A + (D - A) * t, B + (C - B) * t, color=gris, stroke_width=1.2))
        traits.add(Line(D + (C - D) * t, D + (C - D) * t + v, color=gris, stroke_width=1.2))
        traits.add(Line(D + v * t, C + v * t, color=gris, stroke_width=1.2))
        traits.add(Line(B + (C - B) * t, B + (C - B) * t + v, color=gris, stroke_width=1.2))
        traits.add(Line(B + v * t, C + v * t, color=gris, stroke_width=1.2))
    bords = VGroup(Polygon(A, B, C, D), Polygon(D, C, C + v, D + v), Polygon(B, C, C + v, B + v))
    bords.set_stroke(BOIS, 5).set_fill(opacity=0)
    g = VGroup(fa, de, co, traits, bords)
    g.face = fa
    return g


def carreau_100(cote=2.2):
    """Un carré de 10 × 10 petits carreaux (10², c'est 100)."""
    pas = cote / 10
    g = VGroup(*[Square(pas, fill_color=SUCRE, fill_opacity=1, stroke_color="#94a3b8", stroke_width=1)
                 .move_to(P((j - 4.5) * pas, (4.5 - i) * pas)) for i in range(10) for j in range(10)])
    g.add(Square(cote, stroke_color=BOIS, stroke_width=4).move_to(ORIGIN))
    return g


class PuissanceSimpleValeurs5e(PaysageRel):
    nom_voix = "5e-puissance-valeurs"
    fichier_marques = "puissance_simple_valeurs_marques.json"
    identite = "Maths 5e — EleveAI"
    ceinture = "blanche"

    def _attendre_pos(self, pos):
        """Comme le module commun, avec 0,07 s de marge : une image arrondie (brouillon
        à 15 images/s) ne fait jamais apparaître un nombre avant que la voix le dise."""
        reste = self._debut_voix + self._t_pos(pos) - self.renderer.time
        if reste < -0.3:
            print(f"RETARD {self._cle_voix} position {pos} : {-reste:.2f} s", flush=True)
        if reste + 0.07 > 0.02:
            self.wait(reste + 0.07)

    def pw(self, s, x, y, fs=46, verts=(), rouges=(), c=WHITE, egal=False, bleus=()):
        """Une ligne de calcul au code couleur ; egal=True : son « = » en (x, y)."""
        e = colorer(E(s, fs, c, lettres=""), verts, rouges)
        for i in bleus:
            e.atomes[i].set_color(BASE_C)
        if egal:
            e.mis_sur_egal(x, y)
        else:
            e.move_to(P(x, y))
        return e

    def q_ligne(self, i, s, phrase, verts=(), gestes=None):
        """Dans avant_q : la ligne i de la question, au code couleur, posée au mot
        (gestes : {atome: animations jouées avec lui})."""
        ref = self.q_q[i]
        e = colorer(E(s, 34, WHITE, lettres=""), verts)
        e.scale_to_fit_height(ref.height).move_to(ref).align_to(ref, LEFT)
        self.q_q.remove(ref)
        if gestes:
            self.poser_avec(e, phrase, gestes)
        else:
            self.dire_eq(e, phrase)
        return e

    def _plan_eq(self, e, debut, fin, sauf=()):
        """Comme le module commun, mais les atomes dits au MÊME instant (« 1 000 »)
        forment un seul lot : sinon chaque lot coûte une image de plus et le
        dernier arrive en retard."""
        lots = super()._plan_eq(e, debut, fin, sauf)
        fus = []
        for pos, atomes in lots:
            if fus and pos is not None and fus[-1][0] is not None and self._t_pos(pos) == self._t_pos(fus[-1][0]):
                fus[-1][1] = list(fus[-1][1]) + list(atomes)
            else:
                fus.append([pos, list(atomes)])
        return fus

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre, ident, ech = self.garde("Carrés et cubes à connaître", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        # le titre et la ceinture d'abord (ni nombre ni mot de la voix), puis la voix
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.dire("00-garde")
        o = P(-5.75, -1.25)
        marches = VGroup()
        x = o[0]
        for n in (1, 2, 3, 4):
            pas = 0.27
            marches.add(VGroup(plaque(n, P(x, o[1]), pas, 0.06), carre_plein(n, P(x, o[1]), pas)))
            x += n * pas + 0.32
        l1 = self.lg("Les carrés de 0 à 12.", 2.0, 0.85, 46, maxw=8)
        self.dit(l1, "Les carrés de 0 à 12.",
                 avec=[LaggedStart(*[FadeIn(m, scale=0.5) for m in marches], lag_ratio=0.25)])
        l2 = self.lg("Faut-il vraiment les", 2.0, -0.05, 50, JAUNE_TITRE, maxw=8)
        self.dit(l2, "Faut-il vraiment les")
        l3 = self.lg("connaître par cœur ?", 2.0, -0.85, 50, JAUNE_TITRE, maxw=8)
        self.dit(l3, "connaître par cœur ?")
        self.insister(VGroup(l2, l3), 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : les plaques de Karim ───────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        k = karim(0.62).move_to(P(-5.75, 2.2))
        petits = []
        x = -4.75
        for n in (1, 2, 3):
            pas = 0.3
            o = P(x, 1.55)
            petits.append(VGroup(plaque(n, o, pas, 0.08), carre_plein(n, o, pas)))
            x += n * pas + 0.45
        og = P(-4.85, -3.05)
        grand_p = plaque(12, og, 0.215, 0.1)
        grand_m = carre_plein(12, og, 0.215)
        self.dit(self.lg("Karim est chef pâtissier.", 2.9, 3.0, 42, CIEL, maxw=7.0), "Karim est chef pâtissier.",
                 avec=[FadeIn(k, shift=UP * 0.3)])
        self.dit(self.lg("Il range ses macarons", 2.9, 2.2, 38, maxw=7.0), "Il range ses macarons")
        self.dit(self.lg("en carrés sur des plaques :", 2.9, 1.6, 38, maxw=7.0), "en carrés sur des plaques :")
        l = self.lg("1 sur 1, 2 sur 2, 3 sur 3,", 2.9, 0.7, 40)
        pop = lambda g: lambda: [FadeIn(g[0]), LaggedStart(*[FadeIn(m, scale=0.4) for m in g[1]], lag_ratio=0.2)]  # noqa: E731
        self.poser_avec(l, "1 sur 1, 2 sur 2, 3 sur 3,", {2: pop(petits[0]), 6: pop(petits[1]), 10: pop(petits[2])})
        l2 = self.lg("jusqu'à 12 sur 12.", 2.9, 0.0, 40)
        self.poser_avec(l2, "jusqu'à 12 sur 12.",
                        {5: lambda: [FadeIn(grand_p), LaggedStart(*[FadeIn(b, scale=0.5) for b in grand_m], lag_ratio=0.12)]},
                        rt=0.4)
        q1 = self.lg("Combien de macarons", 2.9, -1.2, 46, JAUNE_TITRE)
        self.dit(q1, "Combien de macarons")
        q2 = self.lg("sur chaque plaque ?", 2.9, -1.95, 46, JAUNE_TITRE)
        self.dit(q2, "sur chaque plaque ?")
        self.insister(VGroup(q1, q2), 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 et 03 : la table des carrés ──────────────────────────────────────
    def table_carres(self, cle, liste, pas, o, deja, x_eg=2.55, y0=2.75, dy=0.78, fs=46):
        """La plaque grandit bordure par bordure pendant que la ligne « n² = n×n » s'écrit."""
        self.ecran(cle)
        fond = plaque(deja, o, pas)
        tout = carre_plein(deja, o, pas) if deja else VGroup()
        self.add(fond, tout)
        n_act = deja
        lignes = []
        for k, (n, phrase) in enumerate(liste):
            s = f"{n}² = {n * n}"
            e = self.pw(s, x_eg, y0 - k * dy, fs, verts=(3,), egal=True)
            if n == 0:
                geste = {1: (lambda tt=tout, fd=fond: [FadeOut(tt, scale=0.6), Transform(fd, plaque(1, o, pas))])}
            else:
                nouvelles = VGroup(*[bordure(m, o, pas) for m in range(n_act + 1, n + 1)])
                cible = plaque(n, o, pas)
                geste = {1: (lambda nv=nouvelles, cb=cible: [Transform(fond, cb),
                                                              LaggedStart(*[FadeIn(m, scale=0.4) for b in nv for m in b],
                                                                          lag_ratio=0.03)])}
                tout.add(*nouvelles)
                n_act = n
            self.poser_avec(e, phrase, geste, rt=0.3)
            lignes.append(e)
        return fond, tout, lignes

    def ecran_petits(self):
        o = P(-5.6, -2.55)
        liste = [(n, f"{n} au carré : {n * n}.") for n in range(1, 7)]
        self.table_carres("02-petits", liste, 0.6, o, 0)
        self.attendre_voix(marge=0.8)

    def ecran_grands(self):
        o = P(-5.6, -2.75)
        liste = [(n, f"{n} au carré : {n * n}.") for n in range(7, 13)] + [(0, "0 au carré : 0.")]
        fond, tout, lignes = self.table_carres("03-grands", liste, 0.36, o, 6, y0=2.85, dy=0.76, fs=44)
        self.attendre_voix(marge=0.8)

    # ── 04 : l'astuce de la bordure ─────────────────────────────────────────
    def ecran_astuce(self):
        self.ecran("04-astuce")
        o = P(-5.6, -2.55)
        pas = 0.78
        fond = plaque(4, o, pas)
        self.add(fond)
        b = [bordure(n, o, pas) for n in (1, 2, 3, 4)]
        xr = 2.75
        mw = 7.4  # la colonne va de -0,95 à 6,45 : la plaque est à gauche de -2,4
        self.dit(self.lg("Une astuce pour vérifier :", xr, 3.0, 42, CIEL, maxw=mw), "Une astuce pour vérifier :")
        self.dit(self.lg("d'un carré au suivant,", xr, 2.3, 38, maxw=mw), "d'un carré au suivant,")
        l = self.lg("Karim ajoute une bordure.", xr, 1.7, 38, maxw=mw)
        teinter(l, {"bordure": SAVEURS[1]})
        self.dit(l, "Karim ajoute une bordure.")
        pop = lambda g: lambda: [LaggedStart(*[FadeIn(m, scale=0.4) for m in g], lag_ratio=0.12)]  # noqa: E731
        e1 = self.lg("1, puis 3 de plus : 4.", xr, 0.75, 44)
        e1.atomes[0].set_color(SAVEURS[0])
        e1.atomes[3].set_color(SAVEURS[1])
        e1.atomes[7].set_color(JUSTE)
        self.poser_avec(e1, "1, puis 3 de plus : 4.", {0: pop(b[0]), 3: pop(b[1])}, rt=0.3)
        e2 = self.lg("Puis 5 de plus : 9.", xr, 0.0, 44)
        e2.atomes[1].set_color(SAVEURS[2])
        e2.atomes[5].set_color(JUSTE)
        self.poser_avec(e2, "Puis 5 de plus : 9.", {1: pop(b[2])}, rt=0.3)
        e3 = self.lg("Puis 7 de plus : 16.", xr, -0.75, 44)
        e3.atomes[1].set_color(SAVEURS[3])
        e3.atomes[5].set_color(JUSTE)
        self.poser_avec(e3, "Puis 7 de plus : 16.", {1: pop(b[3])}, rt=0.3)
        f = self.lg("On ajoute les nombres impairs.", xr, -1.8, 38, JAUNE_TITRE, maxw=6.8)  # insister l'agrandit de 8 %
        self.dit(f, "On ajoute les nombres impairs.")
        self.insister(f, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 04q : QUESTION 1 ────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = -2.2
        o = P(-6.0, -1.9)
        pas = 0.42
        fond = plaque(7, o, pas)
        mac = carre_plein(7, o, pas, une=SAVEURS[0])

        def avant(sc):
            sc.play(FadeIn(fond), run_time=0.3)
            sc.q_ligne(0, "Combien vaut 7² ?", "Combien vaut 7 au carré ?")
            sc.play(LaggedStart(*[FadeIn(m, scale=0.4) for b in mac for m in b], lag_ratio=0.01), run_time=0.5)

        def apres(sc):
            sc.ph_eq(0, "Réponse B : 49.", "Réponse B : 49.", premier=True)
            sc.ph_eq(1, "7 × 7.", "7 fois 7.")
            sc.ph_eq(2, "14, c'est 7 × 2 : le piège.", "14, c'est 7 fois 2 : le piège.", couleur=PIEGE)
            sc.rep_fini()

        self.question_pause("04q-question", "04r-reponse", ["Combien vaut 7² ?"],
                            [E("14", 40, lettres=""), E("49", 40, lettres=""), E("77", 40, lettres="")], 1,
                            ["Réponse B : 49.", "7 × 7.", "14, c'est 7 × 2 : le piège."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 05 : trois cubes à connaître ────────────────────────────────────────
    def ecran_cubes(self):
        self.ecran("05-cubes")
        c2 = cube_empile(2, 0.42, P(-6.05, 1.0), couleur=BASE_C)
        c3 = cube_empile(3, 0.42, P(-4.25, 1.0), couleur=BASE_C)
        cs = caisse(2.15).move_to(P(-4.35, -1.75))
        couche = lambda cc: lambda: [LaggedStart(*[FadeIn(c, shift=DOWN * 0.3) for c in cc], lag_ratio=0.6)]  # noqa: E731
        xr = 2.75
        self.dit(self.lg("Trois cubes à connaître :", xr, 3.0, 42, CIEL), "Trois cubes à connaître :")
        e1 = self.pw("2³ = 8", xr, 2.15, 46, verts=(3,))
        self.poser_avec(e1, "2 au cube, 8.", {1: couche(c2)}, rt=0.45)
        e2 = self.pw("3³ = 27", xr, 1.3, 46, verts=(3,))
        self.poser_avec(e2, "3 au cube, 27.", {1: couche(c3)}, rt=0.45)
        e3 = self.pw("10³ = 10 × 10 × 10", xr - 0.4, 0.4, 44, bleus=(3, 5, 7))
        self.dit(e3, "Et 10 au cube : 10 fois 10 fois 10,", rt=0.2)
        e4 = colorer(E("= 1 000", 44, JUSTE, lettres=""))
        e4.mis_sur_egal(e3.egal.get_center()[0], -0.35)
        e4.atomes[0].set_color(WHITE)
        self.dit(e4, "1 000.")
        l5 = self.lg("Une caisse de 10 sur 10 sur 10", xr, -1.25, 35, maxw=7.4)
        self.dit(l5, "Une caisse de 10 sur 10 sur 10", avec=[FadeIn(cs, shift=UP * 0.3)])
        l6 = self.lg("contient 1 000 morceaux", xr, -1.85, 35, maxw=7.4)
        teinter(l6, {"1": JUSTE, "000": JUSTE})
        self.dit(l6, "contient 1 000 morceaux")
        self.dit(self.lg("de sucre.", xr, -2.45, 35), "de sucre.")
        self.play(Circumscribe(cs, color=JUSTE), run_time=0.6)
        self.attendre_voix(marge=0.8)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        xr = 2.2
        self.dit(self.lg("Le piège :", xr, 3.05, 46, PIEGE), "Le piège :")
        f = self.pw("10³, ce n'est pas 30.", xr, 2.25, 44, rouges=(8,))
        self.dit(f, "10 au cube, ce n'est pas 30.")
        self.play(Create(self.barrer(f.atomes[8])), run_time=0.3)
        g100 = carreau_100(2.0).move_to(P(-4.6, 2.05))
        cs = caisse(1.75).move_to(P(-4.45, -1.35))
        e1 = self.pw("10², c'est 100 : deux zéros.", xr, 0.95, 42)
        zeros_orange(e1.atomes[6], "100")
        e1.atomes[6][0].set_color(JUSTE)
        self.poser_avec(e1, "10 au carré, c'est 100 : deux zéros.",
                        {1: lambda: [LaggedStart(*[FadeIn(c, scale=0.6) for c in g100], lag_ratio=0.004)]}, rt=0.2)
        e2 = self.pw("10³, c'est 1 000 : trois zéros.", xr, 0.15, 42)
        e2.atomes[6].set_color(JUSTE)
        zeros_orange(e2.atomes[7], "000")
        self.poser_avec(e2, "10 au cube, c'est 1 000 : trois zéros.", {1: lambda: [FadeIn(cs, shift=UP * 0.3)]}, rt=0.15)
        r1 = self.lg("Avec 10, l'exposant", xr, -1.2, 44, JAUNE_TITRE)
        teinter(r1, {"exposant": EXPO_C})
        self.dit(r1, "Avec 10, l'exposant")
        r2 = self.lg("compte les zéros.", xr, -1.9, 44, JAUNE_TITRE)
        self.dit(r2, "compte les zéros.")
        self.insister(VGroup(r1, r2), 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 06q : QUESTION 2 ────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = -2.2
        o = P(-6.0, -1.75)
        pas = 0.33
        fond = plaque(9, o, pas)
        centre = fond.get_center()
        n81 = T("81", 64, WHITE, audit=True).move_to(centre)
        cote_b = T("?", 46, BASE_C, audit=False).next_to(fond, DOWN, buff=0.14)
        cote_g = T("?", 46, BASE_C, audit=False).next_to(fond, RIGHT, buff=0.16)
        mac = carre_plein(9, o, pas, une=SAVEURS[2])

        def avant(sc):
            sc.q_ligne(0, "Quel nombre, au carré,", "Quel nombre, au carré,")
            sc.play(FadeIn(fond), FadeIn(cote_b, scale=1.4), FadeIn(cote_g, scale=1.4), run_time=0.3)
            # la ligne 0 est déjà remplacée ; le 81 de la plaque vient AVEC le 81 écrit
            sc.q_ligne(0, "donne 81 ?", "donne 81 ?", verts=(1,), gestes={1: lambda: [FadeIn(n81, scale=1.3)]})

        def apres(sc):
            sc.ph_eq(0, "Réponse B : 9,", "Réponse B : 9,", premier=True)
            neuf_b = T("9", 46, BASE_C).move_to(cote_b)
            neuf_g = T("9", 46, BASE_C).move_to(cote_g)
            # les côtés deviennent 9 dès « Réponse B : 9 », avant le dernier « 9 » dit
            sc.play(ReplacementTransform(cote_b, neuf_b), ReplacementTransform(cote_g, neuf_g), run_time=0.25)
            sc.ph_eq(1, "car 9 × 9 = 81.", "car 9 fois 9 égale 81.")
            sc.play(n81.animate.set_opacity(0),
                    LaggedStart(*[FadeIn(m, scale=0.4) for b in mac for m in b], lag_ratio=0.008), run_time=0.6)
            sc.rep_fini()

        self.question_pause("06q-question", "06r-reponse", ["Quel nombre, au carré,", "donne 81 ?"],
                            [E("8", 40, lettres=""), E("9", 40, lettres=""), E("27", 40, lettres="")], 1,
                            ["Réponse B : 9,", "car 9 × 9 = 81."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 07 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("07-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 3.05))
        self.au("À toi", Write(tit), rt=0.5)
        k = karim(0.6).move_to(P(-5.85, -1.75))
        oa, ob = P(-5.1, 0.35), P(-2.75, 0.35)
        pa, pb = plaque(11, oa, 0.17), plaque(12, ob, 0.17)
        ga, gb = grille_vide(11, oa, 0.17), grille_vide(12, ob, 0.17)
        qa = T("?", 60, BASE_C, audit=False).move_to(pa)
        qb = T("?", 60, BASE_C, audit=False).move_to(pb)
        oc = P(-3.85, -3.0)
        pc = plaque(8, oc, 0.27)
        mc = carre_plein(8, oc, 0.27, une=SAVEURS[1])
        n64 = T("64", 46, WHITE).next_to(pc, RIGHT, buff=0.25)
        qc = T("?", 46, BASE_C, audit=False).next_to(pc, LEFT, buff=0.14)  # au-dessus, il flottait entre deux plaques
        xr = 3.2
        l1 = self.pw("Combien valent 11²", xr, 1.85, 44)
        self.poser_avec(l1, "Combien valent 11 au carré", {0: lambda: [FadeIn(k, shift=UP * 0.3)],
                                                             3: lambda: [FadeIn(pa), Create(ga), FadeIn(qa, scale=1.4)]})
        l2 = self.pw("et 12² ?", xr, 1.15, 44)
        self.poser_avec(l2, "et 12 au carré ?", {2: lambda: [FadeIn(pb), Create(gb), FadeIn(qb, scale=1.4)]})
        l3 = self.lg("Et quel nombre,", xr, 0.0, 44)
        self.dit(l3, "Et quel nombre,", avec=[FadeIn(pc), FadeIn(qc, scale=1.4)])
        l4 = self.pw("au carré, donne 64 ?", xr, -0.7, 44)
        i64 = next(i for i, a in enumerate(l4.atomes) if a.original_text == "64")
        self.poser_avec(l4, "au carré, donne 64 ?", {i64: lambda: [FadeIn(n64, scale=1.3),
                                                      LaggedStart(*[FadeIn(m, scale=0.4) for b in mc for m in b], lag_ratio=0.01)]})
        pz = T("Mets pause, et cherche !", 38, ORANGE_RETENUE).move_to(P(3.2, -1.45))  # plus bas, il touchait le « 64 »
        self.au("Mets pause", Write(pz), rt=0.5)
        self.attendre_voix(marge=2.0)

    # ── 07b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        self.ecran("07b-correction")
        self.au("Correction", FadeIn(T("Correction", 46, JUSTE).move_to(P(0, 3.2))), rt=0.25)
        oa, ob = P(-6.05, 0.25), P(-3.7, 0.25)
        pa, pb = plaque(11, oa, 0.17), plaque(12, ob, 0.17)
        ma = carre_plein(11, oa, 0.17)
        mb = carre_plein(12, ob, 0.17)
        oc = P(-5.2, -3.05)
        pc = plaque(8, oc, 0.24)
        mc = carre_plein(8, oc, 0.24, une=SAVEURS[1])
        rempli = lambda p, m: lambda: [FadeIn(p), LaggedStart(*[FadeIn(b, scale=0.6) for b in m], lag_ratio=0.15)]  # noqa: E731
        xr = 2.9
        e1 = self.pw("11² = 11 × 11 = 121", xr, 2.05, 44, verts=(7,), bleus=(3, 5))
        e1.atomes[7].shift(RIGHT * 0.18)  # le cadre vert ne touche plus le « = »
        self.poser_avec(e1, "11 au carré : 11 fois 11, 121.", {3: rempli(pa, ma)}, rt=0.3)
        self.play(Create(self.cadre_ok(e1.atomes[7], 0.1)), run_time=0.2)
        e2 = self.pw("12² = 12 × 12 = 144", xr, 0.75, 44, verts=(7,), bleus=(3, 5))
        e2.atomes[7].shift(RIGHT * 0.18)
        self.poser_avec(e2, "12 au carré : 12 fois 12, 144.", {3: rempli(pb, mb)}, rt=0.3)
        self.play(Create(self.cadre_ok(e2.atomes[7], 0.1)), run_time=0.2)
        e3 = self.pw("Et 8 × 8 = 64 :", xr, -0.6, 44, verts=(5,))
        e3.atomes[1].set_color(BASE_C)
        e3.atomes[3].set_color(BASE_C)
        self.poser_avec(e3, "Et 8 fois 8 égale 64 :", {1: rempli(pc, mc)}, rt=0.3)
        e4 = self.lg("c'est 8.", xr, -1.45, 50, JUSTE)
        self.dit(e4, "c'est 8.")
        self.play(Create(self.cadre_ok(e4, 0.14)), run_time=0.25)
        self.attendre_voix(marge=1.0)

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.5)
        tit = T("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.au("Ce que", Write(tit), rt=0.7)
        o = P(-6.0, -0.2)
        pas = 0.5
        fig1 = VGroup(plaque(4, o, pas), carre_plein(4, o, pas))
        fig2 = VGroup(*[c for cc in cube_empile(3, 0.36, P(-5.7, -2.75), couleur=BASE_C) for c in cc])
        self.play(FadeIn(fig1), run_time=0.3)
        xl = -2.35  # la ligne des cubes dépassait à droite (bord à 7,2)
        lignes = [("Les carrés de 0 à 12 :", "Les carrés de 0 à 12 :", 2.15, WHITE),
                  ("0, 1, 4, 9, 16, 25, 36,", "0, 1, 4, 9, 16, 25, 36,", 1.45, JUSTE),
                  ("49, 64, 81, 100, 121, 144.", "49, 64, 81, 100, 121, 144.", 0.75, JUSTE),
                  ("Les cubes : 2³ = 8 ; 3³ = 27 ;", "Les cubes : 2 au cube, 8 ; 3 au cube, 27 ;", -0.6, WHITE),
                  ("10³ = 1 000.", "10 au cube, 1 000.", -1.3, WHITE)]
        for k, (s, ph, y, c) in enumerate(lignes):
            e = colorer(E(s, 40, c, lettres=""))
            if k >= 3:
                for i, a in enumerate(e.atomes):
                    if a.original_text in ("8", "27", "1", "000") and i and e.atomes[i - 1].original_text in ("=", "1"):
                        a.set_color(JUSTE)
            e.align_to(P(xl + 0.6, 0), LEFT).set_y(y)
            if k in (0, 3):
                ch = self.coche().next_to(e, LEFT, buff=0.25)
                self.dit(e, ph, avec=[Create(ch)] + ([FadeIn(fig2)] if k == 3 else []))
            else:
                self.dit(e, ph)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_petits()
        self.ecran_grands()
        self.ecran_astuce()
        self.ecran_question1()
        self.ecran_cubes()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


def teinter(e, couleurs):
    """Colore les atomes d'une ligne selon leur texte."""
    for a in e.atomes:
        if a.original_text in couleurs:
            a.set_color(couleurs[a.original_text])
    return e
