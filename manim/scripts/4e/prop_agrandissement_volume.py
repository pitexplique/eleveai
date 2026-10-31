# prop_agrandissement_volume.py
# EleveAI — Maths 4e — série « Proportionnalité », lot 4 (agrandissements),
# épisode 13 PROPRE À LA 4e : AGRANDISSEMENT ET VOLUME (micro du coach :
# agrandissement_volume), AVEC VOIX. Paysage 16:9, CEINTURE VERTE (la paysage
# complète du niveau). Short jumeau : prop_agrandissement_volume_short.py (blanche).
# ⭐ Méthode travaillée : un volume = trois longueurs multipliées ; avec un
# rapport k, le volume est multiplié par k × k × k = k³ (rapport 2 : × 8,
# rapport 3 : × 27, maquette au 1/10 : ÷ 1 000). Pas de produit en croix.
# ⭐ Le geste : l'EMPILEMENT de petits bacs (perspective cavalière) dans le
# grand : 2 en longueur, 2 en largeur, 2 en hauteur = 8 ; le piège (× 2 ou
# × 4) se VOIT : 40 L ne remplit que 2 petits bacs sur 8, 80 L en remplit 4.
# ⭐ Leurres (erreur classique « × k pour tout ») : question 1 : 2 L (× 2,
# comme une longueur), 4 L (× 4, comme une aire) ; question 2 : 30 L (× 3),
# 90 L (× 9) ; écran 06 : 40 L et 80 L barrés ; écran 08 : 50 000 L barré.
#
# Décor et métier : AQUARIUM PUBLIC, Louise, SOIGNEUSE (aquariologiste), le bac
# des poissons-clowns (40 × 20 × 25 cm = 20 L), la maquette du bassin des
# requins au 1/10. Chiffres INVENTÉS (pas de fait réel dans la voix) : rien à
# sourcer ; 1 000 cm³ = 1 L (définition). Calculs vérifiés (Python) :
# 40 × 20 × 25 = 20 000 ; 20 × 8 = 160 ; 10 × 27 = 270 ; 500 000 ÷ 1 000 =
# 500 ; 50 × 8 = 400 ; 400 ÷ 10 = 40.
# Centres d'intérêt : animaux, sciences.
#
# Écrans : 00 garde · 01 Louise et le bac (40, 20, 25 cm ; × 2) · 02 le volume
# 20 000 cm³ = 20 L · 03 les 8 petits bacs dans le grand, 160 L · 04 QUESTION 1
# (cube de 1 L doublé) · 05 la règle k³ (longueur × 2, aire × 4, volume × 8) ·
# 06 le piège (40 L, 80 L) · 07 QUESTION 2 (10 L, rapport 3) · 08 la maquette
# au 1/10 (÷ 1 000) · 09 défi (50 L, rapport 2, 1 poisson pour 10 L) ·
# 09b correction (400 L, 40 poissons) · 10 ce que tu as appris · 11 fin.
#
# Voix : manim/voix/4e-prop-agrandissement-volume.json (validée par Frédéric le
# 31/10, débit −10), WAV dans public/sons/4e-prop-agrandissement-volume/ ;
# marques mot à mot : manim/scripts/4e/prop_agrandissement_volume_marques.json
# (scripts/marques_dump.ps1 puis un cues2marques qui GARDE les « 2 fois 2 fois »
# répétés : une marque par occurrence).
# Outils : manim/scripts/6e/prop_commun.py + manim/canvas_proportion.py (non
# modifiés). Ajouté ICI : proj(), Pave (pavé en perspective cavalière, faces
# avant / dessus / droite), Cadre3D (le grand bac en fil de fer, arêtes cachées
# en pointillés), empilement() (n × n × n petits pavés, ordre du peintre par
# z_index), poisson_clown(), louise(), gras(), sans().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/prop_agrandissement_volume.py PropAgrandissementVolume4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/4e/prop_agrandissement_volume.py PropAgrandissementVolume4e -o eleveai-maths-4e-prop-agrandissement-volume --media_dir manim/media-prop-4e-13
# Sortie : manim/sorties/4e/maths/proportionnalite/13-agrandissement-volume/eleveai-maths-4e-prop-agrandissement-volume.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403

ENCRE = "#0f172a"
EAU = ("#38bdf8", "#bae6fd", "#0284c7")      # un petit bac PLEIN : avant, dessus, droite
VIDE = ("#94a3b8", "#cbd5e1", "#64748b")     # un petit bac VIDE
SABLE = ("#fbbf24", "#fde68a", "#d97706")    # le cube de 1 L / les dés
BORD_BAC = "#0c4a6e"
GRIS_T = "#94a3b8"
D_PROF = 0.5                                 # perspective cavalière : profondeur × 0,5, à 45°


def gras(s, fs, couleur):
    return Text(s, font_size=fs, color=couleur, weight=BOLD)


def sans(m):
    """Un décor ou un libellé redit partout : ni attente de synchro, ni audit."""
    for f in m.get_family():
        if isinstance(f, Text):
            f.sans_synchro = True
            f._pas_audit = True
    return m


def proj(x, y, z, o=ORIGIN, u=1.0):
    """(x longueur, y profondeur, z hauteur) → point de l'écran (cavalière)."""
    k = D_PROF * 0.7071
    return np.array([o[0] + u * (x + k * y), o[1] + u * (z + k * y), 0.0])


class Pave(VGroup):
    """Un pavé a × b × c (longueur, profondeur, hauteur) posé en (x, y, z),
    vu en perspective cavalière : .avant, .dessus, .droite (Polygon pleins)."""

    def __init__(self, a, b, c, x=0, y=0, z=0, o=ORIGIN, u=1.0, couleurs=EAU, bord=BORD_BAC, sw=2.5, **kw):
        super().__init__(**kw)
        q = lambda X, Y, Z: proj(X, Y, Z, o, u)  # noqa: E731
        st = dict(fill_opacity=1, stroke_color=bord, stroke_width=sw)
        self.avant = Polygon(q(x, y, z), q(x + a, y, z), q(x + a, y, z + c), q(x, y, z + c),
                             fill_color=couleurs[0], **st)
        self.dessus = Polygon(q(x, y, z + c), q(x + a, y, z + c), q(x + a, y + b, z + c), q(x, y + b, z + c),
                              fill_color=couleurs[1], **st)
        self.droite = Polygon(q(x + a, y, z), q(x + a, y + b, z), q(x + a, y + b, z + c), q(x + a, y, z + c),
                              fill_color=couleurs[2], **st)
        self.add(self.avant, self.dessus, self.droite)
        self.coins = dict(o=q(x, y, z), a=q(x + a, y, z), b=q(x + a, y + b, z), c=q(x, y, z + c),
                          ac=q(x + a, y, z + c), bc=q(x + a, y + b, z + c), dc=q(x, y + b, z + c))

    def teinter(self, couleurs):
        """Animation : le bac change de couleurs (vide → plein)."""
        return AnimationGroup(*[f.animate.set_fill(c) for f, c in zip((self.avant, self.dessus, self.droite),
                                                                        couleurs)])


class Cadre3D(VGroup):
    """Le GRAND bac a × b × c en fil de fer : 9 arêtes vues en trait plein,
    les 3 arêtes cachées en pointillés ; .coins comme Pave."""

    def __init__(self, a, b, c, o=ORIGIN, u=1.0, couleur=WHITE, sw=4, **kw):
        super().__init__(**kw)
        q = lambda X, Y, Z: proj(X, Y, Z, o, u)  # noqa: E731
        A, B, C, D = q(0, 0, 0), q(a, 0, 0), q(a, b, 0), q(0, b, 0)
        E, F, G, H = q(0, 0, c), q(a, 0, c), q(a, b, c), q(0, b, c)
        vues = [(A, B), (B, F), (F, E), (E, A), (B, C), (C, G), (G, F), (G, H), (H, E)]
        cachees = [(A, D), (D, C), (D, H)]
        self.vues = VGroup(*[Line(p, r, color=couleur, stroke_width=sw) for p, r in vues])
        self.cachees = VGroup(*[DashedLine(p, r, color=couleur, stroke_width=sw * 0.6, dash_length=0.12)
                                for p, r in cachees])
        self.add(self.cachees, self.vues)
        self.coins = dict(o=A, a=B, b=C, d=D, c=E, ac=F, bc=G, dc=H)


def empilement(n, a, b, c, o=ORIGIN, u=1.0, couleurs=EAU, nx=None, ny=None, nz=None, sw=2.5):
    """n × n × n petits pavés a × b × c rangés dans le grand (ou nx, ny, nz).
    Ordre du peintre : z_index croissant (fond → devant, gauche → droite, bas
    → haut). Renvoie un VGroup ; .cases[(i, j, k)] (i longueur, j profondeur,
    k hauteur) ; .rangee(j, k), .couche(k) pour les faire entrer au mot."""
    nx, ny, nz = nx or n, ny or n, nz or n
    g = VGroup()
    g.cases = {}
    for j in reversed(range(ny)):
        for i in range(nx):
            for k in range(nz):
                p = Pave(a, b, c, i * a, j * b, k * c, o, u, couleurs, sw=sw)
                p.set_z_index((ny - 1 - j) * 100 + i * 10 + k + 1)
                g.cases[(i, j, k)] = p
                g.add(p)
    g.rangee = lambda j, k: VGroup(*[g.cases[(i, j, k)] for i in range(nx)])  # noqa: E731
    g.couche = lambda k: VGroup(*[g.cases[(i, j, k)] for j in reversed(range(ny)) for i in range(nx)])  # noqa: E731
    return g


# ── le décor : Louise, soigneuse d'aquarium ─────────────────────────────────
def poisson_clown(s=1.0, sens=1):
    """Un poisson-clown : corps orange, trois bandes blanches cerclées de noir."""
    corps = Ellipse(width=1.0, height=0.55, fill_color="#f97316", fill_opacity=1, stroke_color=ENCRE,
                    stroke_width=2)
    queue = Polygon(P(-0.45, 0), P(-0.75, 0.25), P(-0.75, -0.25), fill_color="#f97316", fill_opacity=1,
                    stroke_color=ENCRE, stroke_width=2)
    bandes = VGroup()
    for x, h in ((0.22, 0.42), (-0.05, 0.52), (-0.33, 0.3)):
        bandes.add(RoundedRectangle(width=0.1, height=h, corner_radius=0.04, fill_color=WHITE, fill_opacity=1,
                                    stroke_color=ENCRE, stroke_width=1.5).move_to(P(x, 0)))
    oeil = Dot(P(0.35, 0.07), radius=0.045, color=ENCRE)
    g = VGroup(queue, corps, bandes, oeil)
    if sens < 0:
        g.flip(UP)
    return g.scale(s)


def requin(s=1.0):
    """Un requin gris de profil (le bassin des requins)."""
    corps = Ellipse(width=2.0, height=0.6, fill_color="#64748b", fill_opacity=1, stroke_color=ENCRE, stroke_width=2)
    ventre = Ellipse(width=1.4, height=0.25, fill_color="#e2e8f0", fill_opacity=1, stroke_width=0).move_to(
        P(0.15, -0.14))
    aileron = Polygon(P(-0.15, 0.25), P(0.25, 0.25), P(-0.05, 0.75), fill_color="#64748b", fill_opacity=1,
                      stroke_color=ENCRE, stroke_width=2)
    queue = Polygon(P(-0.9, 0), P(-1.35, 0.45), P(-1.2, 0), P(-1.35, -0.4), fill_color="#64748b", fill_opacity=1,
                    stroke_color=ENCRE, stroke_width=2)
    oeil = Dot(P(0.7, 0.07), radius=0.05, color=ENCRE)
    return VGroup(queue, aileron, corps, ventre, oeil).scale(s)


def louise(s=1.0):
    """Louise, soigneuse : polo turquoise, cheveux longs, une épuisette."""
    p = personne(peau="#f1c27d", tenue="#0d9488", cheveux="#7c2d12", longs=True)
    manche = Line(P(0.9, 0.3), P(1.15, -1.9), color="#e5e7eb", stroke_width=5)
    filet = Ellipse(width=0.55, height=0.38, color="#e5e7eb", stroke_width=3).move_to(P(0.9, 0.45))
    main = Circle(radius=0.11, fill_color="#f1c27d", fill_opacity=1, stroke_width=0).move_to(P(0.98, -0.6))
    g = VGroup(manche, filet, p, main)
    g.corps = p.corps
    return g.scale(s)


def bac_poissons(u, o, a=40, b=20, c=25, n=2):
    """Le petit bac des poissons-clowns (a × b × c cm, u unités par cm) :
    le pavé d'eau + n poissons devant ; .pave, .poissons."""
    pv = Pave(a, b, c, o=o, u=u)
    pss = VGroup()
    for i in range(n):
        f = poisson_clown(u * 9, 1 if i % 2 == 0 else -1)
        f.move_to(proj(a * (0.3 + 0.4 * i), 0, c * (0.62 - 0.3 * i), o, u))
        pss.add(f)
    pss.set_z_index(5000)
    g = VGroup(pv, pss)
    g.pave, g.poissons = pv, pss
    return g


def cote(p0, p1, s, couleur, fs=28, dirn=DOWN, buff=0.15):
    """L'étiquette d'une arête (« 40 cm ») posée au milieu de [p0, p1]."""
    t = gras(s, fs, couleur)
    t.next_to((np.array(p0) + np.array(p1)) / 2, dirn, buff=buff)
    t.set_z_index(6000)
    return t


def arete(p0, p1, couleur, sw=7):
    """Une arête repassée en couleur (celle qu'on mesure)."""
    ln = Line(p0, p1, color=couleur, stroke_width=sw)
    ln.set_z_index(5500)
    return ln


class PropAgrandissementVolumeBase(PaysageProp):
    nom_voix = "4e-prop-agrandissement-volume"
    fichier_marques = "prop_agrandissement_volume_marques.json"

    def ligne_rep(self, i, morceaux, fs=None):
        """Celle de prop_tableau.py : la ligne de réponse garde la taille de la
        phrase qu'elle remplace, bornée à droite (BORD_X)."""
        lg = super().ligne_rep(i, morceaux, fs)
        ref = self.ph_q[i]
        lg.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
        g = lg.get_left()[0]
        if lg.get_right()[0] > self.BORD_X - 0.05:
            lg.scale_to_fit_width(self.BORD_X - 0.05 - g).align_to(P(g, 0), LEFT)
        return lg

    def lc(self, morceaux, y, fs=40, xl=1.3):
        """Une ligne de la colonne de droite (non jouée)."""
        return self.col(self.ligne(morceaux, fs), y, xl)

    def montrer(self, lg, mots, anim="fade", rt=0.35, avec=None):
        """Les morceaux de lg, chacun à SON mot ; avec[i] : animations jouées
        avec le morceau i (le geste sur la figure)."""
        avec = avec or {}
        for i, (m, mot) in enumerate(zip(lg, mots)):
            if mot:
                self.au_mot(*mot) if isinstance(mot, tuple) else self.au_mot(mot)
            a = FadeIn(m, scale=1.3) if anim == "pop" or (anim == "fin" and i == len(lg) - 1) \
                else FadeIn(m, shift=RIGHT * 0.2)
            self.play(a, *avec.get(i, []), run_time=rt)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Agrandir un volume", self.identite, self.ceinture, y_ech=-2.45)
        u, o = 0.045, P(-6.2, -0.4)
        bac = bac_poissons(u, o)
        grand = Cadre3D(80, 40, 50, o=P(-4.0, -1.3), u=u, couleur=GRIS_T, sw=3)
        q = VGroup(self.t("Un aquarium", 40), self.t("deux fois plus grand.", 40, AMBRE))
        q.arrange(DOWN, buff=0.16).move_to(P(3.6, 0.75))
        self.au_mot("Un aquarium")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(bac, shift=UP * 0.2),
                  FadeIn(q[0], shift=UP * 0.15), run_time=0.6)
        self.au_mot("deux fois")
        self.play(FadeIn(q[1], scale=1.2), Create(grand), run_time=0.7)
        q2 = self.t("Combien d'eau faut-il ?", 36, BLEU_CALCUL).move_to(P(3.5, -0.45))
        self.au_mot("Combien")
        self.play(FadeIn(q2, shift=UP * 0.15), run_time=0.45)
        self.insister(q2, 1.08, 0.25)
        self.attendre_voix(marge=0.6)

    # ── 01 : Louise, soigneuse ; le bac 40 × 20 × 25 cm ; × 2 ───────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = louise(0.85).move_to(P(-5.55, -0.75))
        nom = self.t("Louise", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.au_mot("Voici Louise")
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        met = self.t("soigneuse", 30, BLEU_CALCUL).next_to(pers, DOWN, buff=0.15)
        lieu = sans(self.t("Aquarium public", 34, JAUNE_TITRE)).move_to(P(-2.3, 3.05))
        self.au_mot("soigneuse")
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("aquarium")
        self.play(FadeIn(lieu, shift=DOWN * 0.15), run_time=0.4)
        u, o = 0.08, P(-3.9, -1.55)
        bac = bac_poissons(u, o)
        k = bac.pave.coins
        self.au_mot("poissons-clowns")
        self.play(FadeIn(bac.pave, scale=0.9), run_time=0.5)
        self.play(LaggedStart(*[FadeIn(f, shift=RIGHT * 0.3) for f in bac.poissons], lag_ratio=0.3), run_time=0.7)
        l40 = cote(k["o"], k["a"], "40 cm", BLEU_CALCUL, 30)
        l20 = cote(k["a"], k["b"], "20 cm", VERT_OK, 30, dirn=RIGHT, buff=0.12).shift(DOWN * 0.12)
        l25 = cote(k["b"], k["bc"], "25 cm", ORANGE_RETENUE, 30, dirn=RIGHT, buff=0.12)
        for mot, lab, p0, p1, c in (("40 cm", l40, "o", "a", BLEU_CALCUL), ("20 cm", l20, "a", "b", VERT_OK),
                                    ("25 cm", l25, "b", "bc", ORANGE_RETENUE)):
            self.au_mot(mot)
            self.play(Create(arete(k[p0], k[p1], c)), FadeIn(lab, scale=1.3), run_time=0.45)
        L1 = self.lc([("Nouveau bac :", WHITE)], 1.6, fs=40, xl=1.6)
        L2 = self.lc([("× 2", AMBRE), ("dans chaque", WHITE)], 0.65, fs=46, xl=1.6)
        L3 = self.lc([("dimension", WHITE)], -0.2, fs=46, xl=1.6)
        self.au_mot("Elle veut")
        self.play(FadeIn(L1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("2 fois")
        self.play(FadeIn(L2[0], scale=1.4), run_time=0.4)
        self.au_mot("dans chaque")
        self.play(FadeIn(L2[1], shift=RIGHT * 0.2), FadeIn(L3, shift=RIGHT * 0.2), run_time=0.45)
        self.play(Circumscribe(VGroup(l40, l20, l25), color=AMBRE, time_width=0.6), run_time=1.0)
        self.attendre_voix()

    # ── 02 : le volume du petit bac : 20 000 cm³ = 20 L ─────────────────────
    def ecran_volume(self):
        self.ecran("02-volume")
        tit = self.t("Le petit bac", 44, JAUNE_TITRE).move_to(P(-3.4, 3.05))
        u, o = 0.075, P(-5.3, -1.3)
        bac = bac_poissons(u, o)
        k = bac.pave.coins
        self.au_mot("Le petit bac")
        self.play(Write(tit), FadeIn(bac, scale=0.9), run_time=0.6)
        l40 = cote(k["o"], k["a"], "40 cm", BLEU_CALCUL, 30)
        l20 = cote(k["a"], k["b"], "20 cm", VERT_OK, 30, dirn=RIGHT, buff=0.12).shift(DOWN * 0.12)
        l25 = cote(k["b"], k["bc"], "25 cm", ORANGE_RETENUE, 30, dirn=RIGHT, buff=0.12)
        L1 = self.lc([("40 ×", BLEU_CALCUL), ("20 ×", VERT_OK), ("25", ORANGE_RETENUE)], 2.3, fs=46)
        self.montrer(L1, ["40 fois", "20 fois", ("25", 1)],
                     avec={0: [FadeIn(l40, scale=1.3), Create(arete(k["o"], k["a"], BLEU_CALCUL))],
                           1: [FadeIn(l20, scale=1.3), Create(arete(k["a"], k["b"], VERT_OK))],
                           2: [FadeIn(l25, scale=1.3), Create(arete(k["b"], k["bc"], ORANGE_RETENUE))]})
        L2 = self.lc([("=", WHITE), ("20 000 cm³", BLEU_CALCUL)], 1.45, fs=46)
        self.montrer(L2, ["égale", "20 000"], anim="fin")
        self.insister(L2[1], 1.12, 0.25)
        L3 = self.lc([("1 000 cm³", BLEU_CALCUL), ("=", WHITE), ("1 L", VERT_OK)], 0.15, fs=42)
        cube = Pave(10, 10, 10, o=P(-1.0, -2.85), u=u, couleurs=SABLE, bord="#78350f")
        l1L = gras("1 L", 30, VERT_OK).next_to(cube, RIGHT, buff=0.15)
        self.montrer(L3, ["1 000", "font", "1 litre"], anim="fin",
                     avec={0: [FadeIn(cube, scale=0.5)], 2: [FadeIn(l1L, scale=1.3)]})
        self.play(Indicate(cube, color=AMBRE, scale_factor=1.3), run_time=0.5)
        L4 = self.lc([("20 000 cm³", BLEU_CALCUL), ("=", WHITE), ("20 L", VERT_OK)], -1.15, fs=46)
        l20L = gras("20 L", 56, BLEU_CALCUL).next_to(bac, UP, buff=0.25).set_z_index(7000)
        self.montrer(L4, [("20 000", 2), "c'est", "20 litres"], anim="fin", avec={2: [FadeIn(l20L, scale=1.3)]})
        self.play(Circumscribe(L4, color=VERT_OK, time_width=0.6), run_time=0.9)
        self.attendre_voix()

    # ── 03 : le grand bac 80 × 40 × 50 cm ; 2 × 2 × 2 = 8 petits bacs ───────
    def ecran_cubes(self):
        self.ecran("03-cubes")
        u = 0.05
        petit = Pave(40, 20, 25, o=P(-6.15, 1.55), u=u)
        o = P(-4.7, -2.55)
        grand = Cadre3D(80, 40, 50, o=o, u=u, couleur=WHITE, sw=4)
        grand.set_z_index(4000)
        k = grand.coins
        fl = CurvedArrow(petit.get_right() + RIGHT * 0.1, P(-2.0, 0.85), angle=-1.0, color=AMBRE, stroke_width=6,
                         tip_length=0.22)
        x2 = sans(gras("× 2", 38, AMBRE)).next_to(fl.point_from_proportion(0.5), UR, buff=0.08)
        self.play(FadeIn(petit, shift=DOWN * 0.15), run_time=0.4)
        self.au_mot("Le grand bac")
        self.play(Create(fl), FadeIn(x2, scale=1.3), Create(grand), run_time=0.7)
        l80 = cote(k["o"], k["a"], "80 cm", BLEU_CALCUL, 30)
        l40 = cote(k["a"], k["b"], "40 cm", VERT_OK, 30, dirn=RIGHT, buff=0.12).shift(DOWN * 0.12)
        l50 = cote(k["o"], k["c"], "50 cm", ORANGE_RETENUE, 30, dirn=LEFT, buff=0.12)
        for mot, lab in (("80 cm", l80), ("40 cm", l40), ("50 cm", l50)):
            self.au_mot(mot)
            self.play(FadeIn(lab, scale=1.3), run_time=0.4)
        emp = empilement(2, 40, 20, 25, o=o, u=u)
        L0 = self.lc([("On y range des petits bacs :", WHITE)], 2.55, fs=34, xl=1.2)
        self.au_mot("On y range")
        self.play(FadeIn(L0, shift=RIGHT * 0.2), Indicate(petit, color=AMBRE), run_time=0.5)
        for y, mot, groupe in ((1.75, "longueur", emp.rangee(0, 0)), (1.1, "largeur", emp.rangee(1, 0)),
                               (0.45, "hauteur", emp.couche(1))):
            lg = self.lc([("2", AMBRE), (f"en {mot}", WHITE)], y, fs=40, xl=1.6)
            self.au_mot(f"2 en {mot}")
            anims = [FadeIn(lg, shift=RIGHT * 0.2), LaggedStart(*[FadeIn(p, shift=DOWN * 0.3) for p in groupe],
                                                                lag_ratio=0.3)]
            if mot == "longueur":
                anims.append(FadeOut(grand.cachees))
            self.play(*anims, run_time=0.6)
        L4 = self.lc([("2 ×", AMBRE), ("2 ×", AMBRE), ("2 =", AMBRE), ("8 petits bacs", VERT_OK)], -0.45, fs=42)
        self.montrer(L4, ["2 fois", ("2 fois", 2), ("2, égale", 1), "8 petits"], anim="fin")
        self.play(Circumscribe(emp, color=VERT_OK, time_width=0.6), run_time=0.9)
        l20 = gras("20 L", 30, BLEU_CALCUL).next_to(petit, DOWN, buff=0.12)
        L5 = self.lc([("20 L ×", BLEU_CALCUL), ("8 =", WHITE), ("160 L", VERT_OK)], -1.35, fs=44)
        self.montrer(L5, ["20 litres", "8, égale", "160 litres"], anim="fin",
                     avec={0: [FadeIn(l20, scale=1.3)]})
        self.insister(L5[2], 1.1, 0.25)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (un cube de 1 L dont on double les longueurs) ───────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        u, o = 1.25, P(-4.6, -1.7)
        cube = Pave(1, 1, 1, o=o, u=u, couleurs=SABLE, bord="#78350f", sw=3)
        cube.set_z_index(1)
        grand = Cadre3D(2, 2, 2, o=o, u=u, couleur=WHITE, sw=4).set_z_index(4000)
        emp = empilement(2, 1, 1, 1, o=o, u=u, couleurs=SABLE, sw=3)
        for p in emp:
            p.set_stroke("#78350f")

        def avant(sc):
            sc.play(FadeIn(cube, scale=0.6), run_time=0.4)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["2 ×", "2 ×", "2 =", "8 ;"])
            sc.au_mot("2 fois")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), Create(grand), run_time=0.35)
            sc.au_mot("2 fois", 2)
            sc.play(FadeIn(l0[1], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("2, égale")
            sc.play(FadeIn(l0[2], shift=UP * 0.15), FadeOut(grand.cachees), run_time=0.3)
            sc.au_mot("8")
            sc.remove(cube)
            sc.play(FadeIn(l0[3], scale=1.3), LaggedStart(*[FadeIn(p, shift=DOWN * 0.25) for p in emp],
                                                          lag_ratio=0.12), run_time=0.8)
            l1 = sc.ligne_rep(1, ["le cube contient", "8 L."])
            sc.au_mot("Le cube")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("8 litres")
            sc.play(FadeIn(l1[1], scale=1.3), Circumscribe(emp, color=VERT_OK, time_width=0.6), run_time=0.6)
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse",
                            ["On double toutes les longueurs", "d'un cube de 1 L.", "Son nouveau volume ?"],
                            [self.t("2 L", 34), self.t("4 L", 34), self.t("8 L", 34)], 2,
                            ["2 × 2 × 2 = 8 ;", "le cube contient 8 L."], mot_q="On double", avant_q=avant,
                            autres_r=apres)

    # ── 05 : la règle : k × k × k = k³ ; longueur × 2, aire × 4, volume × 8 ─
    def ecran_regle(self):
        self.ecran("05-regle")
        tit = self.t("La règle", 46, JAUNE_TITRE).move_to(P(-3.4, 3.1))
        self.play(Write(tit), run_time=0.5)
        L1 = self.lc([("Un volume :", WHITE)], 2.45, fs=40, xl=1.2)
        L2 = self.lc([("trois longueurs", BLEU_CALCUL), ("multipliées.", WHITE)], 1.8, fs=40, xl=1.2)
        u = 0.6
        c1 = Pave(1, 1, 1, o=P(-6.0, -2.35), u=u, couleurs=SABLE, bord="#78350f", sw=3)
        kk = c1.coins
        aretes = VGroup(arete(kk["o"], kk["a"], BLEU_CALCUL), arete(kk["a"], kk["b"], VERT_OK),
                        arete(kk["b"], kk["bc"], ORANGE_RETENUE))
        self.au_mot("Un volume")
        self.play(FadeIn(L1, shift=RIGHT * 0.2), FadeIn(c1, scale=0.6), run_time=0.45)
        self.au_mot("trois longueurs")
        self.play(FadeIn(L2[0], shift=RIGHT * 0.2), LaggedStart(*[Create(a) for a in aretes], lag_ratio=0.4),
                  run_time=0.8)
        self.au_mot("multipliées")
        self.play(FadeIn(L2[1], shift=RIGHT * 0.2), run_time=0.35)
        L3 = self.lc([("Rapport k :", AMBRE)], 0.85, fs=40, xl=1.2)
        L4 = self.lc([("volume", WHITE), ("× k", AMBRE), ("× k", AMBRE), ("× k", AMBRE)], 0.15, fs=42, xl=1.2)
        L5 = VGroup(self.t("soit", 44), self.t("× k³", 46, AMBRE), self.t("(k au cube)", 40)).arrange(RIGHT, buff=0.35)
        self.col(L5, -0.65, 1.2)
        self.montrer(L3, ["Avec un rapport"])
        self.montrer(L4, ["le volume", "par k", ("fois k", 1), ("fois k", 2)])
        self.montrer(L5, [("k au cube", 1), None, None], rt=0.3)
        cad = SurroundingRectangle(L5[1], color=AMBRE, buff=0.12, corner_radius=0.1, stroke_width=4)
        self.play(Create(cad), run_time=0.35)
        self.insister(VGroup(L5[1], cad), 1.2, 0.25)
        # les trois lignes de l'exemple k = 2, à gauche
        seg1 = Line(P(-6.0, 1.85), P(-5.4, 1.85), color=BLEU_CALCUL, stroke_width=8)
        seg2 = Line(P(-4.7, 1.85), P(-3.5, 1.85), color=BLEU_CALCUL, stroke_width=8)
        ca1 = Square(0.6, fill_color=VERT_OK, fill_opacity=0.85, stroke_color=WHITE, stroke_width=2).move_to(
            P(-5.7, 0.25))
        ca2 = VGroup(*[Square(0.6, fill_color=VERT_OK, fill_opacity=0.85, stroke_color=WHITE, stroke_width=2)
                       for _ in range(4)]).arrange_in_grid(2, 2, buff=0).move_to(P(-4.1, 0.4))
        emp = empilement(2, 1, 1, 1, o=P(-4.7, -2.35), u=u, couleurs=SABLE, sw=3)
        lab = [self.t(s, 36, c) for s, c in (("Longueurs × 2", BLEU_CALCUL), ("Aires × 4", VERT_OK),
                                             ("Volumes × 8", ORANGE_RETENUE))]
        for t, y in zip(lab, (1.85, 0.4, -1.65)):
            t.move_to(P(0, y)).align_to(P(-2.7, 0), LEFT)
        for i, (mot, fig, vu) in enumerate((("Les longueurs", seg1, seg2), ("les aires", ca1, ca2),
                                            ("les volumes", None, emp))):
            self.au_mot(mot)
            gs = [FadeIn(fig, scale=0.6)] if fig is not None else []
            self.play(*gs, FadeIn(lab[i], shift=RIGHT * 0.2),
                      LaggedStart(*[FadeIn(p, scale=0.6) for p in (vu if i else [vu])], lag_ratio=0.15),
                      run_time=0.7)
        self.play(Circumscribe(lab[2], color=ORANGE_RETENUE, time_width=0.6), run_time=0.8)
        self.attendre_voix()

    # ── 06 : le piège : ni 40 L (× 2), ni 80 L (× 4), mais 160 L (× 8) ──────
    def ecran_piege(self):
        self.ecran("06-piege")
        tit = self.t("Attention au piège !", 44, ROUGE_ERREUR).move_to(P(-3.1, 3.1))
        self.au_mot("Attention")
        self.play(Write(tit), run_time=0.5)
        u, o = 0.05, P(-5.0, -2.45)
        grand = Cadre3D(80, 40, 50, o=o, u=u, couleur=WHITE, sw=4).set_z_index(4000)
        grand.remove(grand.cachees)
        emp = empilement(2, 40, 20, 25, o=o, u=u, couleurs=VIDE)
        self.play(FadeIn(emp), Create(grand), run_time=0.5)
        r40 = gras("40 L", 46, ROUGE_ERREUR)
        r80 = gras("80 L", 46, ROUGE_ERREUR)
        self.col(r40, 2.3, 1.2)
        self.col(r80, 0.95, 1.2)
        self.au_mot("40 litres")
        self.play(FadeIn(r40, scale=1.3), run_time=0.4)
        self.au_mot("80 litres")
        self.play(FadeIn(r80, scale=1.3), run_time=0.4)
        e40 = self.ligne([("× 2 :", AMBRE), ("comme une longueur", WHITE)], 32)
        self.col(e40, 1.7, 1.25)
        deux = emp.rangee(0, 0)
        self.au_mot("40 litres", 2)
        self.play(Indicate(r40, color=ROUGE_ERREUR), *[p.teinter(EAU) for p in deux], run_time=0.6)
        self.au_mot("fois 2")
        self.play(FadeIn(e40[0], scale=1.3), run_time=0.35)
        self.au_mot("comme pour une longueur")
        self.play(FadeIn(e40[1], shift=RIGHT * 0.2), Create(croix(r40, sw=7)), run_time=0.45)
        e80 = self.ligne([("× 4 :", AMBRE), ("comme une aire", WHITE)], 32)
        self.col(e80, 0.35, 1.25)
        quatre = [p for p in emp.couche(0) if p not in deux]
        self.au_mot("80 litres", 2)
        self.play(Indicate(r80, color=ROUGE_ERREUR), *[p.teinter(EAU) for p in quatre], run_time=0.6)
        self.au_mot("fois 4")
        self.play(FadeIn(e80[0], scale=1.3), run_time=0.35)
        self.au_mot("comme pour une aire")
        self.play(FadeIn(e80[1], shift=RIGHT * 0.2), Create(croix(r80, sw=7)), run_time=0.45)
        L3 = self.lc([("Un volume :", WHITE), ("× 8", AMBRE)], -0.65, fs=44, xl=1.2)
        self.au_mot("Pour un volume")
        self.play(FadeIn(L3[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("fois 8")
        self.play(FadeIn(L3[1], scale=1.3), *[p.teinter(EAU) for p in emp.couche(1)], run_time=0.6)
        ok = gras("160 L", 56, VERT_OK)
        self.col(ok, -1.65, 2.6)
        cad = SurroundingRectangle(ok, color=VERT_OK, buff=0.15, corner_radius=0.12, stroke_width=5)
        self.au_mot("160 litres")
        self.play(FadeIn(ok, scale=1.3), Create(cad), run_time=0.45)
        self.insister(VGroup(ok, cad), 1.15, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (10 L, rapport 3) ───────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        u, o = 0.85, P(-5.3, -2.3)
        petit = Pave(1, 1, 1, o=o, u=u, sw=2.5).set_z_index(1)
        grand = Cadre3D(3, 3, 3, o=o, u=u, couleur=WHITE, sw=4).set_z_index(4000)
        emp = empilement(3, 1, 1, 1, o=o, u=u)

        def avant(sc):
            sc.play(FadeIn(petit, scale=0.6), run_time=0.4)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["3 ×", "3 ×", "3 =", "27 ;"])
            sc.au_mot("3 fois")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), Create(grand), run_time=0.35)
            sc.au_mot("3 fois", 2)
            sc.play(FadeIn(l0[1], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("3, égale")
            sc.play(FadeIn(l0[2], shift=UP * 0.15), FadeOut(grand.cachees), run_time=0.3)
            sc.au_mot("27")
            sc.remove(petit)
            sc.play(FadeIn(l0[3], scale=1.3), LaggedStart(*[FadeIn(emp.couche(k), shift=DOWN * 0.25)
                                                            for k in range(3)], lag_ratio=0.3), run_time=0.9)
            l1 = sc.ligne_rep(1, ["10 ×", "27 =", "270 L."])
            sc.au_mot("10 fois")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("27", 2)
            sc.play(FadeIn(l1[1], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("270 litres")
            sc.play(FadeIn(l1[2], scale=1.3), Circumscribe(emp, color=VERT_OK, time_width=0.6), run_time=0.6)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["Un bac de 10 L", "est agrandi avec un rapport 3.", "Son nouveau volume ?"],
                            [self.t("30 L", 34), self.t("90 L", 34), self.t("270 L", 34)], 2,
                            ["3 × 3 × 3 = 27 ;", "10 × 27 = 270 L."], mot_q="Un bac", avant_q=avant,
                            autres_r=apres)

    # ── 08 : dans l'autre sens : la maquette au 1/10 (÷ 1 000) ──────────────
    def ecran_maquette(self):
        self.ecran("08-maquette")
        tit = self.t("Dans l'autre sens", 44, JAUNE_TITRE).move_to(P(-3.1, 3.1))
        self.au_mot("Et dans")
        self.play(Write(tit), run_time=0.5)
        coul = ("#1d4ed8", "#93c5fd", "#1e3a8a")
        bassin = Pave(4.0, 2.0, 2.0, o=P(-6.15, -0.25), u=1.0, couleurs=coul, bord="#bfdbfe", sw=3)
        rq = requin(0.75).move_to(bassin.avant.get_center() + DOWN * 0.1).set_z_index(5000)
        nb = sans(self.t("bassin des requins", 28, "#bfdbfe")).next_to(bassin, DOWN, buff=0.15)
        nb.align_to(bassin, LEFT)
        L1 = self.lc([("Maquette au", WHITE), ("1/10", AMBRE)], 2.5, fs=42, xl=1.1)
        self.au_mot("une maquette")
        self.play(FadeIn(L1[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("bassin des requins")
        self.play(FadeIn(bassin, scale=0.9), FadeIn(rq, shift=RIGHT * 0.4), FadeIn(nb), run_time=0.6)
        mq = Pave(0.4, 0.2, 0.2, o=P(-2.2, -2.75), u=1.0, couleurs=coul, bord="#bfdbfe", sw=2)
        fl = CurvedArrow(P(-1.95, 0.3), mq.get_top() + UP * 0.15, angle=-0.9, color=AMBRE, stroke_width=6,
                         tip_length=0.22)
        lmq = sans(self.t("maquette", 26, AMBRE)).next_to(mq, LEFT, buff=0.2)
        self.au_mot("1 sur 10")
        self.play(FadeIn(L1[1], scale=1.3), Create(fl), FadeIn(mq, scale=3), FadeIn(lmq), run_time=0.6)
        L2 = self.lc([("Longueurs", WHITE), ("÷ 10", AMBRE)], 1.65, fs=42, xl=1.1)
        et = gras("÷ 10", 34, AMBRE).next_to(fl.point_from_proportion(0.5), RIGHT, buff=0.12)
        self.montrer(L2, ["Les longueurs", ("par 10", 1)], avec={1: [FadeIn(et, scale=1.3)]})
        L3 = self.lc([("Volume :", WHITE), ("÷ 1 000", AMBRE)], 0.8, fs=42, xl=1.1)
        L4 = self.lc([("10 × 10 × 10", AMBRE), ("= 1 000", AMBRE)], 0.05, fs=36, xl=1.6)
        self.au_mot("Le volume")
        self.play(FadeIn(L3[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("10 fois")
        self.play(FadeIn(L4[0], shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("égale 1 000")
        self.play(FadeIn(L4[1], scale=1.2), FadeIn(L3[1], scale=1.3), run_time=0.45)
        self.insister(L3[1], 1.2, 0.25)
        lb = gras("500 000 L", 36, "#93c5fd").next_to(nb, DOWN, buff=0.2).align_to(nb, LEFT).set_z_index(6000)
        self.au_mot("500 000 litres")
        self.play(FadeIn(lb, scale=1.3), Indicate(bassin, color="#93c5fd", scale_factor=1.05), run_time=0.5)
        L5 = self.lc([("Pas", WHITE), ("50 000 L", ROUGE_ERREUR)], -0.8, fs=40, xl=1.1)
        self.au_mot("La maquette")
        self.play(FadeIn(L5[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("50 000")
        self.play(FadeIn(L5[1], scale=1.2), run_time=0.35)
        self.play(Create(croix(L5[1], sw=7)), run_time=0.35)
        L6 = self.lc([("500 000 ÷", WHITE), ("1 000 =", WHITE), ("500 L", VERT_OK)], -1.6, fs=40, xl=1.1)
        l500 = gras("500 L", 32, VERT_OK).next_to(mq, RIGHT, buff=0.25)
        self.montrer(L6, [("500 000", 2), ("par 1 000", 1), "500 litres"], anim="fin",
                     avec={2: [FadeIn(l500, scale=1.3)]})
        self.play(Circumscribe(VGroup(mq, l500), color=VERT_OK, time_width=0.6), run_time=0.9)
        self.attendre_voix()

    # ── 09 : défi : 50 L, rapport 2, 1 poisson pour 10 L ────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-3.0, 3.1))
        self.au_mot("À toi de jouer")
        self.play(Write(tit), run_time=0.6)
        u = 0.04
        bac = bac_poissons(u, P(-6.1, 0.9))
        grand = Cadre3D(80, 40, 50, o=P(-4.4, -2.5), u=u * 1.25, couleur=WHITE, sw=4)
        fl = CurvedArrow(bac.get_right() + RIGHT * 0.1, grand.get_top() + UP * 0.1 + LEFT * 0.3, angle=-1.0,
                         color=AMBRE, stroke_width=6, tip_length=0.22)
        x2 = gras("× 2", 38, AMBRE).next_to(fl.point_from_proportion(0.5), UR, buff=0.06)
        L0 = self.lc([("Bac :", WHITE), ("50 L", BLEU_CALCUL)], 2.2, fs=42, xl=1.3)
        l50 = gras("50 L", 30, BLEU_CALCUL).next_to(bac, DOWN, buff=0.12)
        self.montrer(L0, ["Un bac", "50 litres"], anim="fin",
                     avec={0: [FadeIn(bac, scale=0.9)], 1: [FadeIn(l50, scale=1.3)]})
        L1 = self.lc([("Rapport", WHITE), ("2", AMBRE)], 1.35, fs=42, xl=1.3)
        self.montrer(L1, ["agrandi", "rapport 2"], anim="fin",
                     avec={0: [Create(fl), Create(grand)], 1: [FadeIn(x2, scale=1.3)]})
        L2 = self.lc([("1 poisson", VERT_OK), ("pour 10 L", VERT_OK)], 0.5, fs=42, xl=1.3)
        self.montrer(L2, ["1 poisson", "pour 10 litres"])
        q = gras("? poissons", 40, ORANGE_RETENUE).move_to(grand.vues.get_center() + DOWN * 0.2)
        q[0].sans_synchro = True
        L3 = VGroup(self.t("Combien de poissons", 38, ORANGE_RETENUE), self.t("dans le grand bac ?", 38, ORANGE_RETENUE))
        L3.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.col(L3, -0.5, 1.3)
        self.au_mot("Combien")
        self.play(FadeIn(L3, shift=RIGHT * 0.2), FadeIn(q, scale=1.2), run_time=0.5)
        self.play(Indicate(q, color=ORANGE_RETENUE, scale_factor=1.2), run_time=0.6)
        self.pause_defi(y=-1.5)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-3.0, 3.1))
        self.play(Write(tit), run_time=0.5)
        u, o = 0.034, P(-5.9, 0.35)
        grand = Cadre3D(80, 40, 50, o=o, u=u, couleur=WHITE, sw=3).set_z_index(4000)
        grand.remove(grand.cachees)
        emp = empilement(2, 40, 20, 25, o=o, u=u, sw=2)
        L1 = self.lc([("Rapport 2 :", WHITE), ("volume", AMBRE), ("× 8", AMBRE)], 2.3, fs=42, xl=1.2)
        self.montrer(L1, ["Avec un rapport", "le volume", "multiplié par 8"], anim="fin",
                     avec={2: [FadeIn(emp, shift=DOWN * 0.2), Create(grand)]})
        x8 = gras("× 8", 36, AMBRE).next_to(grand.vues, RIGHT, buff=0.25)
        self.play(FadeIn(x8, scale=1.3), run_time=0.3)
        L2 = self.lc([("50 ×", WHITE), ("8 =", WHITE), ("400 L", BLEU_CALCUL)], 1.4, fs=46, xl=1.2)
        self.montrer(L2, ["50 fois", "8, égale", "400 litres"], anim="fin")
        self.insister(L2[2], 1.15, 0.25)
        tb = TableauProp(["Eau (L)", "Poissons"], [[10, 400], [1, 40]], largeur_case=1.4, largeur_libelle=2.2,
                         hauteur=0.8, fs=32, centre=P(-3.85, -1.75), montrer=False)
        self.play(FadeIn(tb.fond, shift=UP * 0.2), run_time=0.4)
        L3 = self.lc([("1 poisson", VERT_OK), ("pour 10 L", VERT_OK)], 0.4, fs=42, xl=1.2)
        self.montrer(L3, ["1 poisson", "pour 10 litres"],
                     avec={0: [FadeIn(tb.valeur(1, 0), scale=1.3)], 1: [FadeIn(tb.valeur(0, 0), scale=1.3)]})
        L4 = self.lc([("400 ÷", WHITE), ("10 =", WHITE), ("40", VERT_OK)], -0.5, fs=46, xl=1.2)
        fl = tb.fleche_lat("÷ 10")
        self.montrer(L4, [("400 divisé", 1), "par 10", "égale 40"], anim="fin",
                     avec={0: [FadeIn(tb.valeur(0, 1), scale=1.3)], 1: [Create(fl.fleche), FadeIn(fl.etiquette)],
                           2: [FadeIn(tb.valeur(1, 1), scale=1.3)]})
        car = gras("40 poissons", 46, VERT_OK)
        self.col(car, -1.55, 1.6)
        cad = SurroundingRectangle(car, color=VERT_OK, buff=0.15, corner_radius=0.12, stroke_width=5)
        self.au_mot("40 poissons")
        self.play(Create(cad), FadeIn(car, scale=1.2), tb.allumer(1, 1), run_time=0.45)
        self.insister(VGroup(car, cad), 1.1, 0.25)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        o = P(-4.0, -1.5)
        grand = Cadre3D(80, 40, 50, o=o, u=0.05, couleur=WHITE, sw=4).set_z_index(4000)
        grand.remove(grand.cachees)
        emp = empilement(2, 40, 20, 25, o=o, u=0.05)
        fig = VGroup(emp, grand)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Longueurs × k :", "le volume × k³."),
            ("Rapport 2 : le volume × 8.", "Rapport 3 : le volume × 27."),
            ("Maquette au 1/10 :", "1 000 fois moins.")], fs=36)
        self.au_mot("Si les longueurs")
        self.montrer_ligne(lignes[0], Circumscribe(fig, color=AMBRE, time_width=0.6))
        self.au_mot("Rapport 2")
        self.montrer_ligne(lignes[1])
        self.au_mot("Une maquette")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_volume()
        self.ecran_cubes()
        self.ecran_question1()
        self.ecran_regle()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_maquette()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class PropAgrandissementVolume4e(PropAgrandissementVolumeBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
