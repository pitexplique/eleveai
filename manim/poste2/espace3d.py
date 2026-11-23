# manim/poste2/espace3d.py
# EleveAI — LA BOÎTE À OUTILS « GÉOMÉTRIE DANS L'ESPACE », terminale spé (22/11/2026).
#
# POURQUOI CE FICHIER EXISTE, ET POURQUOI IL EST DANS LE DÉPÔT. Les 12 épisodes
# de la série « espace » (6 micros de `geometrie_espace` + 6 de
# `produit_scalaire_espace`) dessinent tous les mêmes objets : un repère, des
# points, des vecteurs, des droites, des morceaux de plan, un cube, un
# tétraèdre. Écrire ça douze fois, c'est douze occasions de se tromper.
# ⛔ Et un outil écrit hors du dépôt meurt avec sa session : toute la boîte à
# outils de la série des Masses a disparu comme ça. Celui-ci est versionné.
#
# ⭐⭐ LA DÉCISION QUI TIENT TOUT : PAS DE `ThreeDScene`, DE LA CAVALIÈRE 2D.
# Mesuré avant de choisir, pas supposé :
#   · il n'existe AUCUNE scène 3D dans le dépôt — pas un `ThreeDScene`, pas un
#     `ThreeDAxes`, pas un `set_camera_orientation`. Toute la production est 2D ;
#   · la maison dessine pourtant déjà des solides, en CAVALIÈRE, depuis la 5e :
#     `point3(o, u, x, y, z)` et `FUITE` dans
#     `manim/scripts/5e/aire_volume_5e_commun.py`, repris en 4e et en 3e ;
#   · le coach montre la MÊME projection : `lib/canvas/Repere3dCanvas.tsx` est
#     une cavalière. Un élève qui voit la vidéo puis la question du coach
#     retrouve exactement le même dessin. C'est l'argument décisif ;
#   · et le verrou de rendu HD est unique sur la machine : un premier rendu 3D
#     « pour voir » bloquerait tout le monde pour un temps inconnu.
# ⚠️ Une seule différence assumée avec le coach : l'angle de fuite est de 35°
# ici (convention de la maison depuis la 5e) et de 30° dans le composant React.
# Les deux sont des cavalières correctes ; on ne touche ni l'une ni l'autre.
#
# ⭐ CE QUE MANIM SAIT FAIRE ET QUE LE CANVAS DU COACH NE SAIT PAS, et dont il
# faut donc se servir ici : de VRAIES flèches (un vecteur est une flèche, pas
# un segment), des surfaces TEINTÉES (un morceau de plan se remplit, il ne se
# contente pas d'être un quadrilatère tracé), et des arêtes cachées en
# pointillé propre.
#
# ⛔⛔ LES TROIS PIÈGES DE CADRE, PAYÉS SUR LA SÉRIE DES ENTIERS :
#   1. Les figures vont dans la colonne de GAUCHE (x ≈ −3,4) ; `col()` écrit à
#      DROITE. Marge de 3 % : x ∈ [−6,68 ; 6,68], y ∈ [−3,573 ; 3,573].
#   2. Sur un écran de QUESTION, toute la figure doit finir AU-DESSUS de
#      `haut` = −0,75 : la phrase de réponse s'écrit là, et une figure qui
#      descend plus bas s'imprime par-dessus.
#   3. Un mobjet construit AVANT un `move_to()` du groupe ne suit pas le
#      groupe. Tout ce que rendent ces fonctions est un `VGroup` unique :
#      déplacez le groupe, jamais ses morceaux.
# ⚠️ `BORDS=1` ne voit que ce qui sort du CADRE. Il ne voit pas une étiquette
# qui en recouvre une autre : ça, seule l'image.
#
# POUR VOIR LA BOÎTE : planche de contrôle, toutes les primitives d'un coup,
#   PYTHONIOENCODING=utf-8 python -X utf8 -m manim render -ql --disable_caching \
#     manim/poste2/espace3d.py PlancheEspace3D --media_dir manim/poste2/media-espace3d

import math

import numpy as np
from manim import *  # noqa: F401,F403

# ── La projection cavalière, à l'identique de la maison (5e → 4e → 3e) ───────
FUITE = (0.5 * math.cos(math.radians(35)), 0.5 * math.sin(math.radians(35)))


def point3(o, u, x, y, z):
    """Le point (x en largeur, y en profondeur, z en hauteur), o = l'origine du repère,
    u = l'unité en unités Manim. ⭐ La MÊME formule que `aire_volume_5e_commun.point3`."""
    return np.array(o, dtype=float) + np.array(
        [(x + y * FUITE[0]) * u, (z + y * FUITE[1]) * u, 0.0]
    )


# ── Les couleurs, et ce qu'elles veulent dire dans TOUTE la série ───────────
# ⭐ Une couleur par rôle, la même du premier au douzième épisode : un élève qui
# a vu un épisode reconnaît les suivants. Reprend la charte (bleu = calcul,
# vert = juste, rouge = piège, ambre = ce qu'on regarde).
C_AXE = "#94a3b8"        # les axes et leurs noms : du décor, jamais la leçon
# ⛔⛔ VU SEULEMENT À L'IMAGE (22/11/2026) : la première version mettait les
# points et les arêtes en "#0f172a" — l'ardoise des banques du coach, où le fond
# est BLANC. Sur la planche, dont le fond est sombre comme celui de la série,
# le cube et le tétraèdre étaient INVISIBLES : on ne voyait que la diagonale
# ambre et deux lettres flottantes. Aucun audit, aucun `BORDS=1` ne le dit —
# rien ne sort du cadre, tout est simplement de la couleur du fond.
# ⭐ La série est sur fond sombre : la couleur par défaut d'un trait est CLAIRE.
# Sur un fond clair (une planche d'impression), passer `couleur="#0f172a"`.
C_POINT = "#e2e8f0"      # un point donné, une arête : clair, sur fond sombre
C_REGARD = "#f59e0b"     # ce que la question regarde en ce moment (ambre)
C_VECTEUR = "#2563eb"    # un vecteur (bleu : c'est un calcul)
C_VECTEUR2 = "#db2777"   # le second vecteur, quand il y en a deux
C_PLAN = "#38bdf8"       # un morceau de plan
C_NORMALE = "#16a34a"    # un vecteur normal, une hauteur, une perpendiculaire
C_DROITE = "#f97316"     # une droite
C_PIEGE = "#dc2626"      # ce qui est faux
C_FANTOME = "#cbd5e1"    # les traits de construction (pointillés)


def fleche_de_nom(mob, couleur=C_VECTEUR, fs=26, ecart=0.10):
    """LA FLÈCHE DESSINÉE AU-DESSUS D'UN NOM DE VECTEUR — « u⃗ », « AB⃗ ».

    ⛔⛔ LE CARACTÈRE COMBINANT U+20D7 NE SE REND PAS. Mesuré le 22/11/2026 sur une
    image avant d'écrire quoi que ce soit : « u⃗ » sort en carré « tofu » avec
    « 20D7 » écrit dedans, exactement comme le glyphe ⚠ de l'épisode 1. La flèche d'un
    vecteur se DESSINE, comme on dessine le triangle du panneau d'avertissement.

    ⭐ UNE SEULE IMPLÉMENTATION POUR LES DEUX CÔTÉS : les étiquettes de FIGURE
    (`Repere3D.vecteur`, ici) et les textes d'ÉCRAN (`EcransEspace.vec` et `.vexpr`,
    dans `espace_ecrans.py`, qui délègue à celle-ci). Deux copies auraient divergé au
    premier réglage d'épaisseur.
    ⚠️ Elle déborde de `ecart` + son épaisseur au-dessus du texte : tout bloc qui en
    contient une est plus HAUT qu'avant, et ses cotes se remesurent."""
    return Arrow(mob.get_corner(UL) + UP * ecart + LEFT * 0.03,
                 mob.get_corner(UR) + UP * ecart + RIGHT * 0.05,
                 buff=0, stroke_width=max(2.0, fs / 14), color=couleur,
                 max_tip_length_to_length_ratio=0.24, tip_length=0.09 + fs / 500)


class Repere3D:
    """UN REPÈRE DE L'ESPACE EN CAVALIÈRE, et tout ce qu'on accroche dessus.

    `o` : l'origine en coordonnées Manim. `u` : la longueur d'une unité.
    `portee` : jusqu'où vont les axes (en unités du repère), un entier.

    ⭐ On fabrique le repère UNE fois par écran et on lui demande ses objets :
    `r.axes()`, `r.point(…)`, `r.vecteur(…)`, `r.plan(…)`, `r.droite(…)`.
    Chacun rend un `VGroup` indépendant, qu'on anime quand la voix le dit.

    ⛔ `r.pt(x, y, z)` rend une POSITION, pas un objet : c'est ce qu'on passe à
    `move_to()`. Ne jamais le confondre avec `r.point(…)`, qui dessine.
    """

    def __init__(self, o=ORIGIN, u=0.62, portee=4):
        self.o = np.array(o, dtype=float)
        self.u = float(u)
        self.portee = int(portee)

    # ── les positions ────────────────────────────────────────────────────────
    def pt(self, x, y, z):
        return point3(self.o, self.u, x, y, z)

    def largeur_a(self, x, y, z):
        """L'abscisse Manim du point (x, y, z) — pour vérifier un bord à la main."""
        return float(self.pt(x, y, z)[0])

    # ── les axes ─────────────────────────────────────────────────────────────
    def axes(self, noms=("x", "y", "z"), couleur=C_AXE, fs=22, sw=3):
        """Les trois axes fléchés et leurs noms.
        ⚠️ Le nom d'un axe est posé AU BOUT, décalé vers l'extérieur : c'est le
        seul endroit où il ne tombe sur aucun point de la figure. Si une figure
        va jusqu'au bout d'un axe, allonger `portee` plutôt que bouger le nom."""
        L = self.portee
        bouts = [(L, 0, 0), (0, L, 0), (0, 0, L)]
        g = VGroup()
        for (bx, by, bz), nom in zip(bouts, noms):
            fin = self.pt(bx, by, bz)
            fleche = Arrow(self.pt(0, 0, 0), fin, buff=0, stroke_width=sw,
                           max_tip_length_to_length_ratio=0.06, color=couleur)
            t = Text(nom, font_size=fs, color=couleur, slant=ITALIC)
            direction = fin - self.pt(0, 0, 0)
            direction = direction / max(1e-9, np.linalg.norm(direction))
            t.move_to(fin + direction * 0.3)
            g.add(fleche, t)
        return g

    # ── les points ───────────────────────────────────────────────────────────
    def point(self, x, y, z, nom=None, couleur=C_POINT, r=0.075, fs=26,
              decal=UR, escalier=False, fs_nom=None):
        """Un point, son nom, et (si `escalier`) le chemin pointillé qui montre
        d'où sortent ses trois coordonnées : on avance en x, puis en y, puis on
        monte en z.
        ⭐ L'escalier EST la leçon des micros `espace_repere_coordonnees` et
        `ps_espace_norme_distance` : il montre les trois arêtes dont on fait la
        somme des carrés. ⛔ Mais il encombre : ne le demander que là où il sert.
        ⚠️ `decal` place le nom. Deux points proches ont besoin de deux `decal`
        différents, et ça ne se vérifie qu'à l'image."""
        p = self.pt(x, y, z)
        g = VGroup(Dot(p, radius=r, color=couleur))
        if nom:
            t = Text(nom, font_size=fs_nom or fs, color=couleur, weight=BOLD)
            t.move_to(p + np.array([decal[0], decal[1], 0.0]) * 0.28)
            g.add(t)
            g.nom = t
        if escalier:
            a, b, c = self.pt(x, 0, 0), self.pt(x, y, 0), p
            trace = VGroup(
                DashedLine(self.pt(0, 0, 0), a, dash_length=0.09),
                DashedLine(a, b, dash_length=0.09),
                DashedLine(b, c, dash_length=0.09),
            ).set_stroke(C_FANTOME, 3)
            g.add(trace)
            g.escalier = trace
        g.p = p
        return g

    # ── les vecteurs ─────────────────────────────────────────────────────────
    def vecteur(self, depart, arrivee, nom=None, couleur=C_VECTEUR, sw=6, fs=26,
                decal=UR, fleche_nom=True):
        """UNE VRAIE FLÈCHE de `depart` à `arrivee`, deux triplets (x, y, z).
        ⭐ C'est ce que le canvas du coach ne sait pas faire : là-bas un vecteur
        est un segment. Ici il a une pointe, donc un SENS — et le sens est la
        moitié de la notion.

        ⭐⭐ `fleche_nom=True` (le DÉFAUT depuis le 22/11/2026) : l'étiquette porte
        elle aussi sa flèche de vecteur. Auparavant une figure montrait une flèche et
        l'appelait « u » — une lettre nue, qui à l'écran d'une terminale désigne un
        NOMBRE. Mesuré ce jour-là sur les sept scripts de la série : **8 étiquettes
        nues**, dont 6 dans `espace_vecteurs`, l'épisode qui parle des vecteurs.
        ⚠️ `g.nom` est donc maintenant le GROUPE (texte + flèche), pas le seul texte :
        un `FadeIn(g.nom)` montre les deux, et un `next_to` se cale sur l'ensemble."""
        a, b = self.pt(*depart), self.pt(*arrivee)
        fleche = Arrow(a, b, buff=0, stroke_width=sw, color=couleur,
                       max_tip_length_to_length_ratio=0.12)
        g = VGroup(fleche)
        if nom:
            t = Text(nom, font_size=fs, color=couleur, weight=BOLD)
            milieu = (a + b) / 2
            t.move_to(milieu + np.array([decal[0], decal[1], 0.0]) * 0.32)
            etq = VGroup(t, fleche_de_nom(t, couleur, fs)) if fleche_nom else VGroup(t)
            g.add(etq)
            g.nom, g.texte_nom = etq, t
        g.fleche, g.a, g.b = fleche, a, b
        return g

    # ── les droites ──────────────────────────────────────────────────────────
    def droite(self, a, u, t0=-1.5, t1=2.5, nom=None, couleur=C_DROITE, sw=5,
               fs=26, decal=UR, pointille=False):
        """La droite passant par `a` (triplet) et de vecteur directeur `u`
        (triplet), tracée pour t de `t0` à `t1`.
        ⛔ Une droite ne se dessine jamais en entier, et c'est tant mieux :
        montrer un MORCEAU est exactement ce que dit la représentation
        paramétrique — on part d'un point et on avance de t fois le vecteur."""
        p0 = self.pt(*[a[i] + t0 * u[i] for i in range(3)])
        p1 = self.pt(*[a[i] + t1 * u[i] for i in range(3)])
        trait = (DashedLine(p0, p1, dash_length=0.12) if pointille else Line(p0, p1))
        trait.set_stroke(couleur, sw)
        g = VGroup(trait)
        if nom:
            t = Text(nom, font_size=fs, color=couleur, weight=BOLD, slant=ITALIC)
            t.move_to(p1 + np.array([decal[0], decal[1], 0.0]) * 0.3)
            g.add(t)
            g.nom = t
        g.trait, g.p0, g.p1 = trait, p0, p1
        return g

    # ── les plans ────────────────────────────────────────────────────────────
    def plan(self, normale, d=0.0, centre=(0, 0, 0), demi=2.0, nom=None,
             couleur=C_PLAN, op=0.30, sw=3, fs=26, decal=UR):
        """UN MORCEAU DU PLAN d'équation ax + by + cz + d = 0, `normale` = (a, b, c).

        ⭐ TEINTÉ, et c'est voulu : un plan qui n'est qu'un quadrilatère tracé se
        lit comme un cadre posé dans le vide. Avec un aplat à 30 %, on voit une
        surface — et on voit ce qui passe derrière.
        ⛔ Ce n'est qu'un MORCEAU. La voix doit le dire une fois par épisode,
        sinon l'élève croit qu'un plan s'arrête.

        `centre` : le morceau est posé en face de ce point (projeté dessus s'il
        n'y est pas) — sinon il part à l'autre bout du cadre. `demi` : sa
        demi-largeur, en unités du repère."""
        n = np.array(normale, dtype=float)
        n2 = float(n @ n)
        if n2 < 1e-12:
            raise ValueError("plan() : le vecteur normal est nul")
        c = np.array(centre, dtype=float)
        c = c - ((n @ c) + d) / n2 * n            # le projeté de `centre` sur le plan
        # Deux directions du plan : le produit vectoriel avec la base la moins
        # alignée avec n ne tombe jamais sur le vecteur nul.
        axe = min(range(3), key=lambda i: abs(n[i]))
        e = np.zeros(3)
        e[axe] = 1.0
        u1 = np.cross(n, e)
        u1 = u1 / np.linalg.norm(u1) * demi
        u2 = np.cross(n, u1)
        u2 = u2 / np.linalg.norm(u2) * demi
        coins = [c + u1 + u2, c - u1 + u2, c - u1 - u2, c + u1 - u2]
        poly = Polygon(*[self.pt(*k) for k in coins], fill_color=couleur,
                       fill_opacity=op, stroke_color=couleur, stroke_width=sw)
        g = VGroup(poly)
        if nom:
            t = Text(nom, font_size=fs, color=couleur, weight=BOLD, slant=ITALIC)
            # ⚠️ VU À L'IMAGE : posé sur `coins[0]`, le nom du plan tombait sur
            # le nom de l'axe y — les deux se lisaient « ᵖy ». Le nom va sur le
            # coin le plus à DROITE, c'est-à-dire le plus loin des axes, qui
            # partent tous de l'origine et montent vers la gauche et le haut.
            coin = max(coins, key=lambda k: float(self.pt(*k)[0]))
            t.move_to(self.pt(*coin) + np.array([decal[0], decal[1], 0.0]) * 0.3)
            g.add(t)
            g.nom = t
        g.poly, g.coins, g.centre_plan = poly, coins, c
        return g

    # ── les solides ──────────────────────────────────────────────────────────
    def cube(self, cote=3, o=(0, 0, 0), noms="ABCDEFGH", couleur=C_POINT,
             rouges=(), sw=4, fs=24, op=0.0, face=C_PLAN):
        """LE CUBE ABCDEFGH, base ABCD et dessus EFGH (E au-dessus de A).
        ⭐ C'est la convention des manuels et celle des feuilles d'exercices de
        terminale du dépôt : le repère (A ; AB, AD, AE). On garde ce nommage
        dans les douze épisodes.
        `rouges` : les sommets que la question regarde (en ambre).
        Les trois arêtes cachées (celles qui partent de D) sont en pointillé."""
        ox, oy, oz = o
        k = cote
        P3 = {
            "A": (ox, oy, oz), "B": (ox + k, oy, oz), "C": (ox + k, oy + k, oz),
            "D": (ox, oy + k, oz), "E": (ox, oy, oz + k), "F": (ox + k, oy, oz + k),
            "G": (ox + k, oy + k, oz + k), "H": (ox, oy + k, oz + k),
        }
        nom_de = dict(zip("ABCDEFGH", noms))
        # ⛔⛔ [E H] MANQUAIT, ET IL A MANQUÉ DEPUIS LE PREMIER ÉPISODE (trouvé par
        # Frédéric le 23/11/2026, à l'œil, sur une planche de figures — par AUCUN outil).
        # Le cube ne portait que ONZE arêtes sur douze : le haut était OUVERT à gauche,
        # entre E et H. ⚠️ Et rien ne pouvait le dire — le dry run ne regarde que les
        # bords du cadre, la mesure ne regarde que les cotes des blocs, et à la planche
        # une arête absente ne « saute » pas aux yeux puisqu'il n'y a rien à voir. C'est
        # la forme la plus pure du défaut de l'épisode 8 (« cinq morceaux construits,
        # quatre joués ») : ici le morceau n'était même pas construit.
        # ⭐ Le contrôle qui le prouve est en bas de ce fichier, et il tourne à l'import :
        # les douze arêtes d'un cube sont les paires de sommets qui diffèrent d'UNE
        # coordonnée, et on les compte.
        vues = [("A", "B"), ("B", "C"), ("E", "F"), ("F", "G"), ("G", "H"), ("E", "H"),
                ("A", "E"), ("B", "F"), ("C", "G")]
        cachees = [("A", "D"), ("D", "C"), ("D", "H")]
        g = VGroup()
        if op > 0:
            for q in (("A", "B", "F", "E"), ("B", "C", "G", "F"), ("E", "F", "G", "H")):
                g.add(Polygon(*[self.pt(*P3[s]) for s in q], fill_color=face,
                              fill_opacity=op, stroke_width=0))
        for s1, s2 in vues:
            g.add(Line(self.pt(*P3[s1]), self.pt(*P3[s2])).set_stroke(couleur, sw))
        for s1, s2 in cachees:
            g.add(DashedLine(self.pt(*P3[s1]), self.pt(*P3[s2]),
                             dash_length=0.1).set_stroke(couleur, sw * 0.6))
        # Les noms : vers l'extérieur du cube, sommet par sommet. Mesuré à
        # l'image sur la planche — ⛔ ne pas « simplifier » en un seul décalage.
        # ⚠️ VU À L'IMAGE : « F » posé en DR tombait DANS le cube, sous G.
        # F est le coin avant-haut-droit, donc sur le bord : son nom va à DROITE.
        # ⭐ D reste à gauche : en cavalière, D se projette À L'INTÉRIEUR du
        # carré avant (c'est la convention des manuels, pas un défaut) ; c'est
        # pour ça que les trois arêtes qui en partent sont en pointillé.
        decal = {"A": DL, "B": DR, "C": RIGHT, "D": LEFT, "E": UL, "F": RIGHT,
                 "G": UR, "H": UP}
        for s, xyz in P3.items():
            c = C_REGARD if s in rouges else couleur
            t = Text(nom_de[s], font_size=fs, color=c, weight=BOLD)
            t.move_to(self.pt(*xyz) + np.array([decal[s][0], decal[s][1], 0.0]) * 0.26)
            g.add(t)
        g.P3, g.sommet = P3, lambda s: self.pt(*P3[s])
        return g

    def tetraedre(self, sommets, noms=("O", "A", "B", "C"), couleur=C_POINT,
                  sw=4, fs=24, op=0.18, face=C_PLAN):
        """Un tétraèdre : quatre points (triplets), six arêtes, une face teintée.
        Le premier sommet est celui d'où partent les vecteurs ; il est en ambre."""
        P3 = [np.array(s, dtype=float) for s in sommets]
        g = VGroup()
        if op > 0:
            g.add(Polygon(*[self.pt(*P3[i]) for i in (0, 1, 2)], fill_color=face,
                          fill_opacity=op, stroke_width=0))
        for i, j in ((0, 1), (0, 2), (0, 3), (1, 2), (1, 3)):
            g.add(Line(self.pt(*P3[i]), self.pt(*P3[j])).set_stroke(couleur, sw))
        g.add(DashedLine(self.pt(*P3[2]), self.pt(*P3[3]), dash_length=0.1)
              .set_stroke(couleur, sw * 0.6))
        decal = (DL, DR, RIGHT, UP)   # ⚠️ le 3e sommet fuit : son nom va à DROITE
        for i, s in enumerate(P3):
            c = C_REGARD if i == 0 else couleur
            t = Text(noms[i], font_size=fs, color=c, weight=BOLD)
            t.move_to(self.pt(*s) + np.array([decal[i][0], decal[i][1], 0.0]) * 0.26)
            g.add(t)
        g.P3 = P3
        return g

    # ── les marques de l'espace ──────────────────────────────────────────────
    def angle_droit(self, sommet, vers1, vers2, taille=0.3, couleur=C_NORMALE, sw=4):
        """Le petit carré de l'angle droit, au sommet, entre deux directions.
        ⚠️⚠️ EN CAVALIÈRE, UN ANGLE DROIT N'EST PAS DROIT À L'ÉCRAN. Ce carré est
        donc une CONVENTION qui dit « ici, c'est 90° dans l'espace », pas une
        mesure qu'on lit. La voix doit le dire la première fois qu'il apparaît,
        sinon l'élève croit pouvoir lire les angles sur le dessin — et c'est
        exactement l'erreur que la perspective fabrique."""
        s = self.pt(*sommet)
        d1 = self.pt(*vers1) - s
        d2 = self.pt(*vers2) - s
        d1 = d1 / max(1e-9, np.linalg.norm(d1)) * taille
        d2 = d2 / max(1e-9, np.linalg.norm(d2)) * taille
        return VGroup(Line(s + d1, s + d1 + d2), Line(s + d2, s + d1 + d2)).set_stroke(couleur, sw)

    def perpendiculaire(self, depuis, plan_normale, longueur=1.0, couleur=C_NORMALE, sw=5):
        """Le trait pointillé qui descend d'un point vers un plan, dans la
        direction de la normale. ⛔ On l'ARRÊTE avant le plan quand le pied est
        la réponse cherchée : montrer PAR OÙ ça descend, pas OÙ ça tombe."""
        n = np.array(plan_normale, dtype=float)
        n = n / max(1e-9, np.linalg.norm(n))
        a = np.array(depuis, dtype=float)
        b = a - n * longueur
        return DashedLine(self.pt(*a), self.pt(*b), dash_length=0.1).set_stroke(couleur, sw)


# ⛔⛔ LE NOYAU DE LA CAVALIÈRE — UN PLAN PEUT SE PROJETER SUR UNE DROITE (22/11/2026)
#
# La projection envoie (x, y, z) sur (x + 0,41 y ; z + 0,287 y). Elle écrase donc
# EXACTEMENT une direction, celle qui va sur (0 ; 0) :
NOYAU = np.array([-FUITE[0], 1.0, -FUITE[1]])      # ≈ (−0,41 ; 1 ; −0,287)
#
# ⭐⭐ Tout plan qui CONTIENT cette direction se dessine comme une LAME, et un plan qui
# la contient exactement se dessine comme un TRAIT. Mesuré sur l'épisode 5, où deux
# écrans étaient touchés et où rien ne l'avait dit — ni l'audit, ni BORDS, ni
# verifier-avant-rendu : la figure est dans le cadre, elle est simplement plate.
#
#   normale du plan   angle de la normale au noyau   épaisseur projetée   lisible ?
#   (1 ; 1 ; −1)              26,9°                       0,40             ✅
#   (0 ; 0 ; 1)               14,9°                       0,34             ✅
#   (1 ; 1 ; 1)                9,0°                       0,13             ⛔ une lame
#   (1 ; 1 ; 2)                0,4°                       0,01             ⛔⛔ un trait
#
# ⚠️ Et on ne choisit PAS l'équation : c'est la voix qui la dicte. Agrandir `demi`
# n'arrange rien (l'épaisseur grandit comme la longueur, la lame reste une lame), et
# le choix de u1/u2 n'y change rien non plus — la projection d'un plan ne dépend que
# du plan. ⭐ Le remède est de ne pas projeter : on DESSINE le plan à plat
# (`plan_dessine` ci-dessous), comme un manuel le fait.
#
# ⭐ À appeler AVANT de poser un morceau de plan dans un écran :
def platitude(normale):
    """L'angle, en degrés, entre la normale du plan et le noyau de la projection.
    Au-dessus de ~12° le morceau se lit comme une surface ; en dessous, c'est une
    lame, et il faut `plan_dessine` à la place."""
    n = np.array(normale, dtype=float)
    cos = abs(float(n @ NOYAU)) / (np.linalg.norm(n) * np.linalg.norm(NOYAU))
    return math.degrees(math.asin(min(1.0, cos)))


def plan_dessine(largeur=2.8, profondeur=1.05, cisaille=0.55, couleur=C_PLAN, nom=None,
                 op=0.26, sw=4, fs=26, decal=UR):
    """UN PLAN DESSINÉ À PLAT — un parallélogramme sur la page, PAS une projection.

    ⭐ C'est la figure des manuels, et c'est le seul recours quand `platitude()` dit
    que le vrai plan se projetterait sur une lame (voir le bloc ci-dessus). Elle ne
    ment pas : elle ne prétend pas montrer OÙ est le plan dans le repère, elle montre
    CE QU'EST un plan — et c'est précisément ce que demandent les écrans « deux plans
    parallèles » et « droite parallèle à un plan ».
    ⛔ Donc : jamais dans un repère. Un parallélogramme posé à côté d'axes se lirait
    comme un morceau de plan DU repère, et il serait faux."""
    l, p = largeur / 2.0, profondeur / 2.0
    coins = [np.array([-l - cisaille, -p, 0.0]), np.array([l - cisaille, -p, 0.0]),
             np.array([l + cisaille, p, 0.0]), np.array([-l + cisaille, p, 0.0])]
    poly = Polygon(*coins, fill_color=couleur, fill_opacity=op, stroke_color=couleur,
                   stroke_width=sw)
    g = VGroup(poly)
    if nom:
        t = Text(nom, font_size=fs, color=couleur, weight=BOLD, slant=ITALIC)
        t.move_to(coins[2] + np.array([decal[0], decal[1], 0.0]) * 0.28)
        g.add(t)
        g.nom = t
    g.poly, g.coins = poly, coins
    return g


def mesure_cadre(*groupes):
    """Les bords (x_min, x_max, y_min, y_max) de ce qu'on vient de poser.
    ⭐ À appeler AVANT de rendre, sur toute figure large : la marge de 3 % est
    x ∈ [−6,68 ; 6,68] et y ∈ [−3,573 ; 3,573], et sur un écran de QUESTION la
    figure doit finir au-dessus de y = −0,75."""
    g = VGroup(*groupes)
    return (float(g.get_left()[0]), float(g.get_right()[0]),
            float(g.get_bottom()[1]), float(g.get_top()[1]))


class PlancheEspace3D(Scene):
    """LA PLANCHE DE CONTRÔLE : toutes les primitives, d'un coup, en une image.
    ⭐ Elle existe pour qu'on REGARDE la boîte à outils au lieu de la relire.
    C'est la leçon la plus chère de la série des entiers : la moitié des défauts
    n'étaient visibles qu'à l'image.
    Rendu : ... -ql ... manim/poste2/espace3d.py PlancheEspace3D
    """

    # ⭐ Une grille mesurée, pas « à peu près ». Chaque panneau tient dans
    # 3,45 × 2,6 ; une primitive qui va jusqu'à (3 ; 3 ; 3) avec u = 0,36 occupe
    # 1,53 en largeur et 1,39 en hauteur depuis l'origine de son repère.
    # ⛔ La première version posait les panneaux à vue : la rangée du haut
    # tombait sur les étiquettes de celle du bas.
    COLONNES = (-6.25, -2.80, 0.65, 4.10)
    RANGEES = (0.95, -2.55)          # l'origine du repère de chaque rangée
    U, PORTEE = 0.36, 3

    def construct(self):
        self.camera.background_color = "#0f172a"
        titre = Text("espace3d.py — la boîte à outils de la série « espace »",
                     font_size=26, color="#e2e8f0", weight=BOLD)
        titre.to_edge(UP, buff=0.18)
        self.add(titre)

        def repere(col, rangee):
            return Repere3D(o=np.array([self.COLONNES[col], self.RANGEES[rangee], 0.0]),
                            u=self.U, portee=self.PORTEE)

        def etiquette(txt, col, rangee):
            t = Text(txt, font_size=17, color="#94a3b8")
            # ⚠️ −0,80 et non −0,45 : les noms des sommets du bas d'un cube
            # descendent de 0,26 sous l'origine, et mordaient sur la légende.
            t.move_to(np.array([self.COLONNES[col] + 0.85, self.RANGEES[rangee] - 0.80, 0.0]))
            return t

        # ── rangée du haut ──────────────────────────────────────────────────
        r1 = repere(0, 0)
        self.add(r1.axes(), r1.point(3, 2, 3, "M", couleur=C_REGARD, escalier=True),
                 etiquette("point + escalier", 0, 0))

        r2 = repere(1, 0)
        self.add(r2.axes(),
                 r2.vecteur((0, 0, 0), (3, 1, 2), "u", couleur=C_VECTEUR),
                 r2.vecteur((0, 0, 0), (1, 3, 1), "v", couleur=C_VECTEUR2, decal=DR),
                 etiquette("deux vecteurs (flèches)", 1, 0))

        # ⚠️ Le nom du plan tombait sur le nom de l'axe y : il est posé sur le
        # coin du morceau le plus éloigné des axes, donc décalé vers le haut.
        r3 = repere(2, 0)
        self.add(r3.axes(),
                 r3.plan((0, 0, 1), 0, centre=(1.6, 1.6, 0), demi=1.5, nom="P", decal=UR),
                 r3.vecteur((1.6, 1.6, 0), (1.6, 1.6, 2.6), "n", couleur=C_NORMALE),
                 r3.angle_droit((1.6, 1.6, 0), (3.2, 1.6, 0), (1.6, 1.6, 2)),
                 etiquette("plan teinté + normale", 2, 0))

        r4 = repere(3, 0)
        self.add(r4.axes(),
                 r4.plan((0, 0, 1), 0, centre=(1.6, 1.6, 0), demi=1.5, nom="P", decal=UR),
                 r4.droite((1.6, 1.6, 0), (1, 0.4, 1.3), -1.2, 1.2, nom="d"),
                 etiquette("droite et plan", 3, 0))

        # ── rangée du bas ───────────────────────────────────────────────────
        r5 = repere(0, 1)
        cube = r5.cube(cote=3, rouges=("A", "G"))
        self.add(cube,
                 Line(cube.sommet("A"), cube.sommet("G")).set_stroke(C_REGARD, 5),
                 etiquette("cube + grande diagonale", 0, 1))

        r6 = repere(1, 1)
        self.add(r6.tetraedre([(0, 0, 0), (3, 0, 0), (0, 3, 0), (0, 0, 3)]),
                 etiquette("tétraèdre", 1, 1))

        r7 = repere(2, 1)
        self.add(r7.plan((0, 0, 1), 0, centre=(1.6, 1.6, 0), demi=1.5, nom="P", decal=DR),
                 r7.point(1.6, 1.6, 2.8, "M", couleur=C_REGARD),
                 r7.perpendiculaire((1.6, 1.6, 2.8), (0, 0, 1), longueur=1.4),
                 etiquette("distance : PAR OÙ, pas OÙ", 2, 1))

        # Une droite seule, avec son point de base : la micro « paramétrique ».
        r8 = repere(3, 1)
        self.add(r8.axes(),
                 r8.droite((0.6, 0.6, 0.4), (1, 0.6, 0.8), -0.5, 2.6, nom="d"),
                 r8.point(0.6, 0.6, 0.4, "A", couleur=C_REGARD, decal=DR),
                 etiquette("droite : un point, un sens", 3, 1))

        self.wait(0.1)


# ⛔⛔ LE CUBE A-T-IL SES DOUZE ARÊTES ? — contrôle exécuté à l'IMPORT (23/11/2026)
#
# Il a manqué [E H] depuis le premier épisode de la série, dans la figure que NEUF
# épisodes sur douze emploient. Frédéric l'a vu à l'œil sur une planche ; aucun
# instrument du dépôt ne pouvait le dire, parce qu'ils mesurent tous ce qui EST dessiné
# (ses bords, ses cotes, ses chevauchements) et jamais ce qui MANQUE.
# ⭐ Le contrôle ne lit pas la liste `vues` — ce serait se relire soi-même. Il relève les
# segments RÉELLEMENT construits, retrouve leurs extrémités parmi les huit sommets, et
# compare aux douze paires qui diffèrent d'exactement UNE coordonnée. C'est la leçon
# « un étalon qui partage le défaut de l'instrument ne prouve rien ».
def _controler_aretes_du_cube():
    r = Repere3D(o=np.array([0.0, 0.0, 0.0]), u=1.0, portee=2)
    g = r.cube(cote=1)
    pos = {s: tuple(np.round(r.pt(*v)[:2], 3)) for s, v in g.P3.items()}
    inv = {v: k for k, v in pos.items()}
    traces = set()
    for m in g.submobjects:
        if isinstance(m, Line):          # DashedLine hérite de Line : les deux comptent
            a = inv.get(tuple(np.round(m.get_start()[:2], 3)))
            b = inv.get(tuple(np.round(m.get_end()[:2], 3)))
            if a and b:
                traces.add("".join(sorted((a, b))))
    attendues = {"".join(sorted((s1, s2))) for s1 in g.P3 for s2 in g.P3
                 if s1 < s2 and sum(1 for k in range(3)
                                    if g.P3[s1][k] != g.P3[s2][k]) == 1}
    manque = attendues - traces
    assert not manque, f"cube() ne trace pas les arêtes {sorted(manque)}"
    assert len(traces) == 12, f"cube() trace {len(traces)} arêtes au lieu de 12"


_controler_aretes_du_cube()


# ═══════════════════════════════════════════════════════════════════════════
# ⭐⭐ LES SCHÉMAS PLANS DE LA SÉRIE — recopiés ici le 23/11/2026
# ═══════════════════════════════════════════════════════════════════════════
#
# POURQUOI ILS SONT ICI, et pourquoi ils forment une FAMILLE.
# Chaque épisode paysage portait ses figures comme fonctions de module, dans son propre
# fichier. Or un SHORT prend UNE IDÉE de son épisode — donc il veut la figure qui porte
# cette idée. Les trois ci-dessous sont exactement celles dont les shorts du produit
# scalaire ont besoin, et elles ont toutes la MÊME raison d'exister :
#
#   ⛔⛔ ELLES SONT PLANES PARCE QUE LA CAVALIÈRE MENT.
#   Rien n'y est projeté, donc rien n'y ment. C'est la règle déjà portée ici par
#   `plan_dessine` (épisode 8) — qui est de la même famille et qui vit dans ce fichier
#   depuis le début. Les trois autres y étaient restées étrangères par accident
#   d'écriture, pas par décision.
#
# ⛔ LES ÉPISODES LIVRÉS GARDENT LEURS COPIES : ils sont gelés et ne sont pas touchés.
# La duplication est ASSUMÉE et bornée à ces fichiers-là.
#
# ⚠️ DEUX NOMS ONT DÛ ÊTRE DÉFINIS ICI POUR QUE LA COPIE RESTE VERBATIM, et c'est une
# dette, pas une élégance. Les trois fonctions emploient `P(x, y)` et `VERT_OK`, et
# AUCUN des deux ne peut être importé d'ici — pour la MÊME raison, qui est une affaire
# de `sys.path` et non de dépendances :
#   · ce fichier vit dans `manim/poste2/`. `P` est défini dans
#     `manim/scripts/terminale/proba_bin_defi.py` (l. 61) et `VERT_OK` dans
#     `manim/charte.py` (l. 5) ;
#   · ni `manim/scripts/terminale/` ni `manim/` ne sont sur le `sys.path` de ce
#     fichier autrement que par la grâce de l'APPELANT. Un import d'ici marcherait
#     depuis un épisode, qui pose ces chemins lui-même, et échouerait partout ailleurs.
#
# ⛔⛔ CORRECTION DU 23/11, et elle est écrite ici parce qu'un commentaire faux trompe
# le suivant : j'avais d'abord justifié le cas de `P` par un CYCLE D'IMPORT. Il n'existe
# pas. J'avais raisonné sur la ROUTE par laquelle les épisodes atteignent `P` — via
# `espace_ecrans`, qui importe bien ce fichier — et non sur l'endroit où `P` est
# DÉFINI. Vérifié depuis, et jusqu'aux imports INDIRECTS : la fermeture transitive de
# `proba_bin_defi` atteint huit modules du dépôt (charte, gabarit_bases,
# gabarit_seconde, gabarit_sixieme, mascotte, proba_bin_defi, proba_pc_conditionnelle,
# signes_expression_2de) et **ni `espace3d` ni `espace_ecrans` n'en font partie**.
# ⭐ La leçon de méthode : **une dette assumée avec la bonne raison se rembourse un
# jour ; une dette justifiée par un danger imaginaire ne se rembourse jamais**, parce
# que personne n'ose y toucher.
# ⭐ Les deux sont donc recopiés à l'identique, avec leur provenance. ⚠️ Deux copies d'une
# seule vérité divergent dès qu'on en touche une : si `VERT_OK` change dans la charte, il
# change ici. (Vérifié : personne ne fait `from espace3d import *`, donc ces deux noms
# n'arrivent chez personne par surprise.)

VERT_OK = "#00FF7F"          # recopié de manim/charte.py : « résultats justes »


def P(x, y):                 # recopié de manim/scripts/terminale/proba_bin_defi.py
    return np.array([x, y, 0.0])


# ── `poteau_vue` — vient de E8 `ps_espace_orthogonalite` ──
def poteau_vue(penche=False, s=1.0):
    """UNE VUE DU POTEAU SUR SA DALLE — droite si `penche` est faux, penchée sinon.

    ⭐⭐ C'EST LE SCHÉMA QUI PORTE TOUT L'ÉPISODE, et c'est un schéma PLAN : rien n'y est
    projeté, donc rien n'y ment. Les deux vues côte à côte disent exactement ce que dit
    la voix — « un poteau peut être droit vu de face et penché vu de côté » — et c'est
    la raison pour laquelle un seul produit scalaire ne suffit pas.
    ⛔ Un morceau de plan en cavalière à cet endroit aurait fait croire à une figure de
    l'espace, dans un épisode dont les deux plans se projettent justement sur une lame.
    ⚠️ La dalle est HORIZONTALE et le poteau MONTE : dans un schéma plan comme dans la
    cavalière, ce qui doit paraître horizontal se dessine selon x (leçon du pont, E5)."""
    dalle = RoundedRectangle(width=1.50, height=0.17, corner_radius=0.04,
                             fill_color=C_PLAN, fill_opacity=0.35,
                             stroke_color=C_PLAN, stroke_width=3).move_to(P(0, -0.09))
    haut = P(0.46, 1.18) if penche else P(0, 1.18)
    poteau = Line(P(0, 0), haut, stroke_width=13, color=C_POINT)
    g = VGroup(dalle, poteau)
    if penche:
        # ⭐ La VERTICALE en pointillé à côté du poteau penché : sans elle, « penché » ne
        # se voit pas — il n'y a rien par rapport à quoi juger. Avec elle, l'écart saute
        # aux yeux (c'est la leçon « la route doit passer SOUS le pont quelque part », E5).
        g.add(DashedLine(P(0, 0), P(0, 1.18), dash_length=0.09).set_stroke(C_FANTOME, 3))
        g.add(VGroup(Line(P(-0.14, -0.14), P(0.14, 0.14)),
                     Line(P(-0.14, 0.14), P(0.14, -0.14)))
              .set_stroke(C_PIEGE, 6).move_to(P(0.62, 1.28)))
    else:
        g.add(VGroup(Line(P(0.02, 0.26), P(0.26, 0.26)),
                     Line(P(0.26, 0.26), P(0.26, 0.02))).set_stroke(VERT_OK, 4))
        # ⛔ VU AU GROS PLAN : posée sur le haut du poteau, la coche se lisait comme un
        # poteau TORDU à son sommet. Elle est à côté, dans le vide, comme la croix de
        # l'autre vue.
        g.add(VGroup(Line(P(0.28, 1.26), P(0.37, 1.16)),
                     Line(P(0.37, 1.16), P(0.54, 1.40))).set_stroke(VERT_OK, 6))
    return g.scale(s)


# ── `pente` — vient de E9 `ps_espace_norme_distance` ──
def pente(s=1.0):
    """LE PROFIL DE LA COURSE : le plat, le dénivelé, et la distance réellement parcourue.

    ⭐⭐ DESSINÉ À L'ÉCHELLE, ET C'EST TOUTE LA LEÇON : la hauteur fait exactement un
    DIXIÈME de la base, donc l'hypoténuse se superpose presque au sol — « le dénivelé
    change presque tout à l'effort, et presque rien à la distance ». Un schéma exagéré
    aurait fait croire le contraire, et l'écran aurait contredit la voix.
    ⛔ Schéma PLAN : rien n'y est projeté, donc rien n'y ment. C'est la règle du poteau
    de l'épisode 8 — en cavalière, un angle de 5,7° serait illisible ET faux.
    ⚠️ Ce qui doit paraître horizontal se dessine selon x (leçon du pont, E5) : le plat
    est l'axe des x, le dénivelé monte.

    Rend (sol, montee, trajet, angle) : quatre morceaux, et les QUATRE sont joués —
    `plan_poteau` de l'épisode 8 en rendait cinq et l'écran n'en montrait que quatre."""
    base, haut = 4.0, 0.40
    a, b, c = P(-base / 2, -haut / 2), P(base / 2, -haut / 2), P(base / 2, haut / 2)
    # ⛔ LE SOL EST UN TRAIT PLEIN, ET C'EST LE GROS PLAN QUI L'A DIT : en `DashedLine`,
    # le premier et le dernier tiret ne vont pas jusqu'aux extrémités — mesuré à ×2,6,
    # le pointillé commençait 0,30 unité à droite du départ, et le triangle paraissait
    # OUVERT à gauche. ⚠️ Et il n'a aucune raison d'être pointillé : les dix kilomètres à
    # plat sont réellement parcourus, ce n'est pas un trait de construction.
    sol = Line(a, b, stroke_width=7, color=C_FANTOME)
    montee = Line(b, c, stroke_width=9, color=C_REGARD)
    trajet = Line(a, c, stroke_width=9, color=C_VECTEUR)
    # Le petit carré de l'angle droit, au pied de la montée. ⚠️ 0,11 et non 0,20 : la
    # montée ne fait que 0,40 de haut, un carré de 0,20 en occuperait la moitié.
    k = 0.11
    angle = VGroup(Line(b + LEFT * k, b + LEFT * k + UP * k),
                   Line(b + LEFT * k + UP * k, b + UP * k)).set_stroke(VERT_OK, 3)
    return VGroup(sol, montee, trajet, angle).scale(s)


# ── `coin` — vient de E10 `ps_espace_angle` ──
def coin(deg, r=1.30, sw=7, c1=C_VECTEUR, c2=C_VECTEUR2, r_arc=0.46, c_arc=C_REGARD,
         oppose=False, s=1.0):
    """DEUX VECTEURS ET LEUR ANGLE, DESSINÉS À PLAT — l'angle vu DANS leur plan.

    ⭐⭐ C'est la figure de cet épisode, et elle est PLANE pour la raison écrite en tête
    du fichier : la cavalière de la série ne conserve aucun angle (u(1;1;0) y tombe à
    11,5° de l'axe des x, et l'angle du défi se lit 42° au lieu de 55°). Comme le
    `plan_dessine` de l'épisode 8, cette figure ne prétend pas dire OÙ sont les
    vecteurs : elle dit ce qu'est leur angle, et elle le dit JUSTE.
    ⚠️ L'angle dessiné est vérifié par une assertion du module.

    `oppose=True` ajoute −v⃗ et l'arc du supplémentaire : c'est le piège n° 3 (l'angle de
    deux DROITES), et les deux arcs doivent avoir des RAYONS différents, sinon ils se
    touchent au point de départ commun."""
    th = math.radians(deg)
    p1 = np.array([r, 0.0, 0.0])
    p2 = np.array([r * math.cos(th), r * math.sin(th), 0.0])
    f1 = Arrow(ORIGIN, p1, buff=0, stroke_width=sw, color=c1,
               max_tip_length_to_length_ratio=0.14)
    f2 = Arrow(ORIGIN, p2, buff=0, stroke_width=sw, color=c2,
               max_tip_length_to_length_ratio=0.14)
    arc = Arc(radius=r_arc, start_angle=0, angle=th, color=c_arc, stroke_width=5)
    g = VGroup(f1, f2, arc)
    g.f1, g.f2, g.arc, g.p1, g.p2 = f1, f2, arc, p1, p2
    # ⛔⛔ `g.sommet()` REND LE POINT D'OÙ PARTENT LES DEUX FLÈCHES, et c'est par rapport
    # à LUI qu'on place une étiquette — jamais par rapport à `g.get_center()`, qui est le
    # centre de la BOÎTE du groupe et tombe au milieu du secteur (à ~0,5 ; 0,37 du sommet
    # pour un coin de rayon 1). Mesuré : posées depuis le centre de boîte, « u » tombait
    # à 0,02 de son propre fût. ⚠️ Il se lit APRÈS les `move_to` et les `scale`, sinon il
    # rend la position d'avant — c'est la leçon de `placer` sur le cube de E9 : une cote
    # relative à une autre cote se périme au premier changement de l'une des deux.
    g.sommet = lambda: f1.get_start()
    if oppose:
        f3 = Arrow(ORIGIN, -p2, buff=0, stroke_width=sw - 2, color=c2,
                   max_tip_length_to_length_ratio=0.16).set_opacity(0.55)
        # ⛔⛔ L'ARC DU SUPPLÉMENTAIRE VA DE −v⃗ À u⃗, ET PAS DE v⃗ À LA GAUCHE DE L'ÉCRAN.
        # Vu sur la planche des figures seules : écrit `start_angle=th, angle=π−th`, il
        # partait bien de v⃗ et balayait bien 120°… du côté OPPOSÉ à −v⃗. Il ne touchait
        # donc NI u⃗ NI −v⃗, et il mesurait l'angle de v⃗ avec la demi-droite opposée à u⃗ :
        # la bonne valeur, posée sur le mauvais angle. ⛔ Aucun outil ne pouvait le dire
        # — 120° est 120°, la figure est dans la marge, et l'assertion du module ne
        # portait que sur les FLÈCHES. C'est le défaut « un schéma porte les bons nombres
        # et ment sur sa forme » de E9, dans sa version la plus discrète.
        arc2 = Arc(radius=r_arc * 1.55, start_angle=th + math.pi, angle=math.pi - th,
                   color=C_PIEGE, stroke_width=5)
        g.add(f3, arc2)
        g.f3, g.arc2, g.p3 = f3, arc2, -p2
    return g.scale(s)


# ⭐⭐ LE CONTRÔLE DES TROIS SCHÉMAS PLANS, exécuté À L'IMPORT comme celui du cube.
#
# POURQUOI IL EXISTE. La docstring de `coin` annonce « l'angle dessiné est vérifié par une
# assertion du module ». C'était vrai DANS SON ÉPISODE : les assertions de
# `ps_espace_angle.py` (l. 129-135) portent sur les vecteurs U02, V02, U05, V05 de cet
# épisode-là. ⛔ Recopiée ici, la fonction a gardé sa promesse et perdu son garde-fou —
# une docstring qui promet ce que le code ne porte pas est pire qu'un silence.
#
# ⭐ Chaque contrôle ci-dessous est une PRÉDICTION RÉFUTABLE, et c'est la promesse propre
# de la figure qu'il mesure — pas un invariant décoratif :
#   · `coin(deg)` doit DESSINER deg, puisque toute sa raison d'être est que la cavalière
#     ne conserve aucun angle (42° pour un angle de 55°) ;
#   · `pente()` doit avoir une hauteur qui fait exactement un DIXIÈME de sa base : son
#     échelle EST la leçon, et un schéma exagéré ferait dire à l'écran le contraire de la
#     voix (« presque rien à la distance ») ;
#   · `poteau_vue()` doit être DROIT de face et PENCHÉ de côté : les deux vues côte à côte
#     sont exactement ce que dit la voix, et c'est pourquoi un produit scalaire ne suffit
#     pas.
# ⛔ Un contrôle qui ne peut pas échouer ne mesure rien : les trois ont été étalonnés sur
# une attente fausse avant d'être crus, et les trois ont levé.
def _controler_figures_planes():
    import math as _m

    def _dir(fleche):
        v = fleche.get_end() - fleche.get_start()
        return _m.degrees(_m.atan2(v[1], v[0]))

    # 1. `coin` dessine l'angle qu'on lui demande, au millionième de degré.
    for deg in (30, 45, 55, 60, 120):
        f = [m for m in coin(deg) if isinstance(m, Arrow)][:2]
        assert len(f) == 2, f"coin({deg}) ne trace pas deux flèches"
        vu = abs(_dir(f[1]) - _dir(f[0]))
        assert abs(vu - deg) < 1e-6, f"coin({deg}) dessine {vu:.3f}°"

    # 2. `pente` : la hauteur fait EXACTEMENT un dixième de la base.
    sol, montee = list(pente())[:2]
    base = abs(sol.get_end()[0] - sol.get_start()[0])
    haut = abs(montee.get_end()[1] - montee.get_start()[1])
    assert abs(haut * 10 - base) < 1e-9, (
        f"pente() : base {base:.3f} et hauteur {haut:.3f} — le rapport n'est pas 10")

    # 3. `poteau_vue` : droit de face, penché de côté. Le poteau est le plus long segment.
    def _poteau(penche):
        traits = [m for m in poteau_vue(penche=penche) if isinstance(m, Line)]
        return max(traits, key=lambda m: abs(m.get_end()[1] - m.get_start()[1]))

    droit = _poteau(False)
    penche = _poteau(True)
    dx_droit = abs(droit.get_end()[0] - droit.get_start()[0])
    dx_penche = abs(penche.get_end()[0] - penche.get_start()[0])
    assert dx_droit < 1e-9, f"poteau_vue() : le poteau droit s'écarte de {dx_droit:.3f}"
    assert dx_penche > 0.1, (
        f"poteau_vue(penche=True) : le poteau ne penche que de {dx_penche:.3f}")


_controler_figures_planes()
