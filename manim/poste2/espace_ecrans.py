# manim/poste2/espace_ecrans.py
# LE SOCLE D'ÉCRAN DES 12 ÉPISODES de la série « GÉOMÉTRIE DANS L'ESPACE », terminale spé.
#
# ⭐⭐ POURQUOI CE FICHIER EXISTE (22/11/2026)
# Les 12 épisodes partagent les mêmes outils d'écran : la colonne de droite, les cartes
# de choix, la question-pause, la page d'abonnement, le repère de l'espace à gauche.
# Les recopier douze fois, c'est refaire douze fois les neuf défauts corrigés sur
# l'épisode 1 — dont celui où « Mets pause, et choisis ! » restait affiché PAR-DESSUS
# toute l'explication, parce que `q_reponse` n'avait pas reçu les objets à effacer.
# ⛔ La convention terminale (« recopiés, rien importé ») vaut d'un CHAPITRE à l'autre.
# À l'intérieur d'UNE série de 12 épisodes jumeaux, elle multiplie les bugs par douze.
#
# Ce que le socle apporte, et que chaque épisode n'a plus à savoir :
#   · `col`, `ligne`, `lg`, `gauche` : les colonnes, avec leurs bords mesurés ;
#   · `trip` : un triplet de coordonnées dont les TROIS nombres sont adressables
#     (`g.nb[i]`) — un SurroundingRectangle sur `trip(...)[0]` encadrait un glyphe ;
#   · `repere` : le repère cavalière posé dans la colonne de gauche ;
#   · `q_tete` / `q_montrer_choix` / `q_pause` / `q_reponse` : la question-pause ;
#   · `choix2` : un choix sur deux lignes, parce qu'une phrase longue dans une carte de
#     4,1 de large tombe à ~10 px, illisible sur un téléphone ;
#   · `page_abonnement` : le dernier écran, identique partout.
#
# ⚠️ Chaque épisode garde ses 15 écrans à lui, et sa classe de Scene. Il hérite de
# `EcransEspace` et définit `fichier_marques`, `nom_voix`, `identite`, `ceinture`.
# ⛔ Les figures viennent de `espace3d.py`, pas d'ici : ce fichier ne dessine aucun objet
# de géométrie, il ne fait que placer du texte et des cartes.
#
# Les pièges de cette série sont dans `manim/REPRISE-espace-terminale.md`. Les lire
# AVANT d'écrire un épisode : ils ont tous coûté un rendu.

import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts" / "terminale"))
sys.path.insert(1, str(Path(__file__).resolve().parents[1] / "scripts" / "stmg"))
sys.path.insert(2, str(Path(__file__).resolve().parents[1] / "scripts" / "seconde"))
sys.path.insert(3, str(Path(__file__).resolve().parent))

from proba_bin_defi import MotsCales, P  # noqa: E402

from manim import *  # noqa: E402,F401,F403

from canvas_proportion import AuditSynchro  # noqa: E402
from charte import *  # noqa: E402,F401,F403
from espace3d import Repere3D, fleche_de_nom  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from mascotte import MascotteMargouillat  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from stats_lycee_h2_commun import CompteARebours, pastille_pause  # noqa: E402

import numpy as np  # noqa: E402

FOND_CARTE = "#0b1220"
XL, BORD_X = 2.2, 6.6          # la colonne de droite (marge de 3 % : 0,43 du bord)


def fr(v):
    """UN NOMBRE ÉCRIT À LA FRANÇAISE, hors de toute Scene : virgule, et le vrai − (U+2212).

    ⛔⛔ AJOUTÉ POUR L'ÉPISODE 5, et c'est un piège qui attendait son premier décimal :
    `ligne_param` et `equation_plan` écrivaient leurs nombres avec `str(...)`, donc
    `str(2.5)` donnait « 2.5 », avec un POINT. Les épisodes 1 à 4 n'ont que des entiers,
    le défaut était donc invisible — et l'épisode 5 écrit « x + y + z + 2,5 = 0 ».
    ⭐ C'est le même piège que `self.nombre(v)` du socle a déjà payé sur l'épisode 2
    (`AUDIT-ABSENT « 5 » (0.5)`), mais `nombre` est une MÉTHODE : ces deux fonctions-ci
    sont au niveau du module et ne pouvaient pas s'en servir."""
    s = f"{v:g}" if isinstance(v, float) else str(v)
    return s.replace(".", ",").replace("-", "−")


def ligne_param(nom, a, c, var="t"):
    """UNE LIGNE DE REPRÉSENTATION PARAMÉTRIQUE, écrite comme au tableau :
    « x = 1 + 2t », « y = 2 − t », « z = 3t », « x = 2 ».
    ⛔ Le coefficient 1 ne s'écrit PAS (« y = 2 − 1t » est une faute d'écriture), un
    terme constant nul disparaît, et le signe moins est le vrai − (U+2212), pas le
    trait d'union — c'est la même règle que `nombre()` du socle.
    ⭐ Les coefficients se passent en NOMBRES, pas en chaînes recopiées : un épisode
    qui réécrit ses nombres à la main en perd un au quatrième écran."""
    if c == 0:
        return f"{nom} = {fr(a)}"
    coef = "" if abs(c) == 1 else fr(abs(c))
    if a == 0:
        return f"{nom} = {'−' if c < 0 else ''}{coef}{var}"
    return f"{nom} = {fr(a)} {'−' if c < 0 else '+'} {coef}{var}"


def equation_plan(a, b, c, d=None, var=("x", "y", "z")):
    """L'ÉQUATION CARTÉSIENNE D'UN PLAN, écrite comme au tableau :
    « 2x + y − z + 1 = 0 », « x + y − z − 1 = 0 », « y − 1 = 0 », « z = 0 ».
    ⛔ Le coefficient 1 ne s'écrit pas, un coefficient NUL fait disparaître son terme,
    le premier terme n'a pas de « + » devant, et le signe moins est le vrai − (U+2212).
    ⭐ `d=None` laisse « + d » en lettre : c'est l'inconnue de l'écran « appliquer »,
    où l'on cherche justement le terme constant."""
    morceaux = []
    for coef, v in zip((a, b, c), var):
        if coef == 0:
            continue
        morceaux.append(("−" if coef < 0 else "+", v if abs(coef) == 1 else f"{fr(abs(coef))}{v}"))
    if d is None:
        morceaux.append(("+", "d"))
    elif d != 0:
        morceaux.append(("−" if d < 0 else "+", fr(abs(d))))
    if not morceaux:
        raise ValueError("equation_plan : a, b et c sont tous nuls — ce n'est pas un plan")
    s = morceaux[0][1] if morceaux[0][0] == "+" else "− " + morceaux[0][1]
    for signe, corps in morceaux[1:]:
        s += f" {signe} {corps}"
    return s + " = 0"


class EcransEspace(AuditSynchro, MotsCales, Notion6e):
    """Les outils d'écran communs aux 12 épisodes. Un épisode en hérite et ajoute
    ses 15 écrans. ⛔ Une correction se fait ICI, pas dans un épisode."""

    identite = "Maths Tle — EleveAI"
    ceinture = "verte"

    # ── outils (repris de convexite_derivee_seconde.py) ─────────────────────

    def t(self, texte, fs=36, color=WHITE, larg=None):
        t = Text(texte, font_size=fs, color=color)
        if larg and t.width > larg:
            t.scale_to_fit_width(larg)
        return t

    def col(self, mob, y, xl=XL):
        """La colonne de droite : alignée à gauche sur xl, jamais près du bord."""
        mob.move_to(P(0, y)).align_to(P(xl, 0), LEFT)
        if mob.get_right()[0] > BORD_X:
            mob.scale_to_fit_width(BORD_X - xl).align_to(P(xl, 0), LEFT)
        if mob.get_bottom()[1] < -1.95 and mob.get_right()[0] > 5.3:  # Ti-Margo
            mob.scale_to_fit_width(5.3 - xl).align_to(P(xl, 0), LEFT)
        return mob

    def ligne(self, *morceaux, y, xl=XL, buff=0.15):
        g = VGroup(*morceaux).arrange(RIGHT, buff=buff)
        return self.col(g, y, xl)

    def lg(self, *morceaux, y, x=-6.2, buff=0.15):
        return VGroup(*morceaux).arrange(RIGHT, buff=buff).move_to(P(0, y)).align_to(P(x, 0), LEFT)

    def gauche(self, mob, y, xmax, x0=-6.5):
        """Une colonne de calcul à gauche, bornée à droite par `xmax`.
        ⛔ VU AU GROS PLAN (apercu-instants) : en 04b et 07b, les lignes de calcul
        posées à x = −6,2 traversaient les axes du repère et le point A. La planche
        ne le montrait pas : elle prend la DERNIÈRE image, où d'autres objets
        recouvrent la collision. Ici on mesure le bord droit et on réduit."""
        mob.move_to(P(0, y)).align_to(P(x0, 0), LEFT)
        if mob.get_right()[0] > xmax:
            mob.scale_to_fit_width(xmax - x0).align_to(P(x0, 0), LEFT)
        return mob

    def nombre(self, v):
        """Un nombre écrit à la française. ⛔ MESURÉ (AUDIT-ABSENT sur l'épisode 2) :
        `str(0.5)` donne « 0.5 », avec un POINT. À l'écran d'un cours de maths
        français, c'est une faute — et la voix, elle, dit « zéro virgule cinq ».
        Le signe moins est le vrai − (U+2212), pas le trait d'union."""
        s = f"{v:g}" if isinstance(v, float) else str(v)
        return s.replace(".", ",").replace("-", "−")

    def trip(self, t3, fs=36, color=WHITE, par=False):
        """Un triplet de coordonnées. ⭐ Les trois nombres sont des objets SÉPARÉS
        (g.nb[0..2]) : vu à la planche, un SurroundingRectangle posé sur `trip(...)[0]`
        encadrait le premier GLYPHE — le signe moins — et pas la coordonnée.

        ⛔ `par=True` met les PARENTHÈSES, et il les faut dès qu'un triplet est
        MULTIPLIÉ : vu à la planche de l'épisode 3, « 4 ; −2 ; 6 = 2 × 2 ; −1 ; 3 » se
        lit « 2 × 2 » et la ligne devient fausse. Aucun audit ne voit ça : les nombres
        affichés sont exactement ceux que la voix dit."""
        nb = [self.t(self.nombre(v), fs, color) for v in t3]
        pieces = []
        for i, x in enumerate(nb):
            if i:
                pieces.append(self.t(";", fs, color))
            pieces.append(x)
        g = VGroup(*pieces).arrange(RIGHT, buff=0.18)   # 0,12 collait : « 1;2;3 » illisible
        if par:
            g = VGroup(self.t("(", fs, color), g, self.t(")", fs, color)).arrange(RIGHT, buff=0.08)
        g.nb = nb
        return g

    # ── la notation vectorielle ─────────────────────────────────────────────

    def _fleche_vecteur(self, mob, color, fs, ecart=0.10):
        """La flèche dessinée au-dessus d'un nom de vecteur.

        ⭐ UNE SEULE IMPLÉMENTATION, dans `espace3d.fleche_de_nom` : les étiquettes de
        FIGURE s'en servent aussi (`Repere3D.vecteur`). Deux copies auraient divergé au
        premier réglage d'épaisseur. ⛔ Le pourquoi du dessin — le caractère combinant
        U+20D7 ne se rend pas — est écrit là-bas, à l'endroit de l'implémentation."""
        g = fleche_de_nom(mob, color, fs, ecart)
        g._pas_audit = True
        return g

    def vec(self, nom, fs=28, color=WHITE, ecart=0.10):
        """UN NOM DE VECTEUR AVEC SA FLÈCHE : « u », « AB », « A G ».

        ⭐⭐ AJOUTÉ POUR L'ÉPISODE 7, ET IL MANQUAIT AUX SIX PREMIERS. La série écrivait
        « u · v » et « A G » sans flèche : à l'écran d'une terminale, ça se lit comme un
        produit de deux NOMBRES, et c'est précisément la confusion que l'épisode 7 passe
        son temps à combattre (« le résultat est un nombre, les facteurs sont des
        vecteurs »). Le socle le fait une fois pour les douze épisodes.
        ⚠️ `g.texte` reste adressable : un `SurroundingRectangle` ou un `Indicate` se
        pose sur le GROUPE, jamais sur la flèche seule."""
        t = self.t(nom, fs, color)
        g = VGroup(t, self._fleche_vecteur(t, color, fs, ecart))
        g.texte = t
        return g

    def vexpr(self, texte, noms, fs=28, color=WHITE, ecart=0.10):
        """UNE EXPRESSION ENTIÈRE, avec une flèche sur chaque nom de vecteur :
        `vexpr("u · v = v · u", ("u", "v"))`, `vexpr("‖u‖ × ‖v‖ × cos θ", ("u", "v"))`.

        ⭐ UN SEUL `Text` pour toute l'expression, et les flèches par-dessus. ⛔ Le
        montage en morceaux (`VGroup(...).arrange(RIGHT)`) ne marche PAS ici : les
        boîtes de « u », de « · » et de « = » n'ont ni la même hauteur ni la même ligne
        de base, et l'expression monte et descend à chaque signe.
        ⚠️ MESURÉ, parce que l'indexation des glyphes est le seul point qui pouvait
        trahir : Manim ne crée **aucun sous-mobjet pour un espace** et n'a pas de
        ligature ici — « A G · A B » fait 9 caractères et 5 sous-mobjets, « ‖u‖ × ‖v‖ ×
        cos θ » en fait 12 pour 12 non-blancs. L'indice d'un glyphe est donc le nombre
        de caractères non blancs qui le précèdent, et c'est ce que `jeton` calcule.
        ⛔ Un nom n'est reconnu que s'il est ISOLÉ : sans cette frontière, le « u » de
        `vexpr` se poserait sur le « u » de « nul » (c'est le même piège que la
        recherche en mot entier du convertisseur de marques)."""
        t = self.t(texte, fs, color)
        g = VGroup(t)
        jeton = {}
        k = 0
        for i, c in enumerate(texte):
            if not c.isspace():
                jeton[i] = k
                k += 1
        for nom in noms:
            depart = 0
            while True:
                i = texte.find(nom, depart)
                if i < 0:
                    break
                depart = i + 1
                avant = texte[i - 1] if i else ""
                apres = texte[i + len(nom)] if i + len(nom) < len(texte) else ""
                if avant.isalpha() or apres.isalpha():
                    continue
                indices = [jeton[j] for j in range(i, i + len(nom)) if j in jeton]
                if not indices:
                    continue
                g.add(self._fleche_vecteur(VGroup(*[t[n] for n in indices]), color, fs,
                                           ecart))
        g.texte = t
        return g

    def racine(self, radicande, fs=28, color=WHITE, coef=""):
        """UN RADICAL — le signe √, le radicande, ET SA BARRE (le vinculum).

        ⛔⛔ MESURÉ SUR UNE IMAGE D'ESSAI AVANT D'ÉCRIRE UN ÉCRAN (22/11, épisode 9) :
        le glyphe √ (U+221A) SE REND — contrairement au ⚠ de l'épisode 1 et à la flèche
        combinante U+20D7 de l'épisode 7 — **mais il n'a aucune barre**. « √x² + y² + z² »
        s'écrit donc sans rien qui dise où s'arrête le radicande, et à l'écran on lit
        « (√x²) + y² + z² » : exactement la faute que l'épisode 9 passe son temps à
        combattre (« la racine ne se distribue pas »). L'écran contredirait la voix.
        ⭐ La barre se TRACE, comme la flèche d'un nom de vecteur. C'est le remède que
        `radical()` de `manim/scripts/seconde/racine_carree_2de.py` avait déjà trouvé ;
        il est recopié ici parce que la seconde ne partage pas ce socle.
        ⚠️ `g.nb` rend le radicande SEUL : une carte de choix qui porte un radical a
        besoin de `.nb` pour ne pas s'afficher avant que la voix ait dit son nombre
        (le piège de la carte B de l'épisode 8, 1,05 s d'avance).
        ⚠️ Un radical est plus HAUT qu'un texte de la même police (la barre déborde de
        0,07 au-dessus du radicande) : toute cote d'un bloc qui en gagne un se remesure."""
        morceaux = []
        if coef:
            morceaux.append(self.t(coef, fs, color))
        signe = self.t("√", int(round(fs * 1.15)), color)
        corps = (radicande if isinstance(radicande, Mobject)
                 else self.t(str(radicande), fs, color))
        morceaux += [signe, corps]
        g = VGroup(*morceaux).arrange(RIGHT, buff=0.06, aligned_edge=DOWN)
        barre = Line(corps.get_corner(UL) + LEFT * 0.02 + UP * 0.07,
                     corps.get_corner(UR) + RIGHT * 0.04 + UP * 0.07,
                     stroke_width=max(2.0, fs / 16), color=color)
        out = VGroup(g, barre)
        out.nb, out.corps, out.signe = [corps], corps, signe
        return out

    def systeme(self, lignes, fs=34, color=WHITE, c_acc=GREY_B, buff=0.22):
        """LES TROIS LIGNES D'UNE REPRÉSENTATION PARAMÉTRIQUE, avec leur accolade.
        Sert à `espace_droite_parametrique`, et aux épisodes « plan » et
        « position relative » qui écrivent le même objet.

        ⭐ L'accolade est construite sur les TROIS lignes dès le départ, puis on
        fait paraître les lignes une à une quand la voix les dit : montée ligne
        par ligne, l'accolade changerait de taille à chaque fois — un sursaut
        que rien n'attrape à part l'image.
        ⚠️ Les lignes restent adressables (`g.eq[i]`), comme les trois nombres
        de `trip` : c'est la même leçon, un `play` ne doit jamais porter sur un
        glyphe pris au hasard dans un groupe."""
        eq = [self.t(s, fs, color) for s in lignes]
        bloc = VGroup(*eq).arrange(DOWN, aligned_edge=LEFT, buff=buff)
        acc = Brace(bloc, LEFT, buff=0.12, color=c_acc)
        g = VGroup(acc, bloc)
        g.eq, g.acc, g.bloc = eq, acc, bloc
        return g

    def eq_zero(self, gauche, fs=34, color=WHITE):
        """« … = 0 », avec le ZÉRO du second membre HORS AUDIT.

        ⛔⛔ Et il faut qu'il le soit, dans les douze épisodes : la voix dit « égale
        ZÉRO » en toutes lettres, et l'écran écrit 0 — c'est la seule écriture juste
        d'une équation. Sans ce découpage en deux morceaux, il faudrait sortir de
        l'audit l'équation ENTIÈRE, et ses coefficients avec elle : on perdrait
        justement le contrôle qui compte (« 2x » est-il dit quand il s'affiche ?).
        ⭐ Les deux morceaux restent adressables : `g.membre` et `g.zero`."""
        g1 = self.t(f"{gauche} =", fs, color)
        g0 = self.sans_audit(self.t("0", fs, color))
        g = VGroup(g1, g0).arrange(RIGHT, buff=0.16)
        g.membre, g.zero = g1, g0
        return g

    def eq_plan(self, a, b, c, d=None, fs=34, color=WHITE, var=("x", "y", "z")):
        """L'équation d'un plan, posée à l'écran, le « 0 » hors audit (voir `eq_zero`)."""
        return self.eq_zero(equation_plan(a, b, c, d, var)[:-4], fs, color)

    def insister(self, mob, k=1.3, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def sans_audit(self, mob):
        """Les nombres d'une figure qu'on LIT (noms de points, axes) : pas d'audit."""
        for f in mob.get_family():
            f._pas_audit = True
        return mob

    def echelle(self):
        """L'échelle des ceintures de la page de garde. ⚠️ Elle occupe y de −3,45 à
        −2,6 une fois alignée en bas : rien d'autre ne tient dans cette bande."""
        return echelle_ceintures(self.ceinture).move_to(P(-0.6, 0))

    def croix(self, color="#dc2626", r=0.16, sw=6):
        """La croix rouge, pendant de `coche()`."""
        return VGroup(Line(P(-r, -r), P(r, r)), Line(P(-r, r), P(r, -r))).set_stroke(color, sw)

    def rebours_sous(self, mob, n=5):
        """Le compte à rebours posé SOUS un texte et aligné à gauche sur lui."""
        c = CompteARebours(n, r=0.34, fs=32).next_to(mob, DOWN, buff=0.3)
        return c.align_to(mob, LEFT)

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.45)
        self.add(m)
        self._margo = m
        return m

    def dire(self, nom, dossier=None):
        if os.environ.get("BORDS") or os.environ.get("AUDIT"):
            print(f"ECRAN {nom} t={self.renderer.time:.2f}", flush=True)
        return super().dire(nom, dossier)

    def t_pos(self, i):
        m = self._marques().get(self._cle_voix) or []
        return self._debut_voix + max([x[1] for x in m if x[0] <= i] or [0.0])

    def t_mot(self, extrait, n=1):
        i = -1
        for _ in range(n):
            i = self._texte_voix.find(extrait, i + 1)
            if i < 0:
                raise ValueError(f"« {extrait} » (n = {n}) absent de la voix")
        return self.t_pos(i)

    def jusqua(self, extrait, n=1, marge=0.1, mini=0.4):
        return max(mini, self.t_mot(extrait, n) - self.renderer.time - marge)

    def au_pos(self, i):
        reste = self.t_pos(i) - self.renderer.time
        if reste < -0.3:
            print(f"RETARD {self._cle_voix} pos {i} : {-reste:.2f} s", flush=True)
        if reste > 0.03:
            self.wait(reste)

    def au_mot(self, extrait, n=1):
        if n == 1:
            return super().au_mot(extrait)
        i = -1
        for _ in range(n):
            i = self._texte_voix.find(extrait, i + 1)
            if i < 0:
                raise ValueError(f"« {extrait} » (n = {n}) absent de la voix")
        self.au_pos(i)

    def au_fin(self, extrait, n=1):
        """Attend que la voix ait FINI de dire `extrait`, et non qu'elle le COMMENCE.

        ⭐⭐ C'est ce qu'il faut pour un TRIPLET de coordonnées et pour une ligne
        d'équation, qui sont le pain quotidien de cette série : « 1, 2, 0 » se dit en
        0,8 s et « x égale 1 plus 2 t » en 1,1 s. Posés au premier mot, leur dernier
        nombre est à l'écran AVANT d'être dit. Mesuré sur l'épisode 3 : **40
        `AUDIT-AVANCE`, dont 35 de cette seule cause** — et aucun ne dépassait 1,9 s,
        donc aucun ne sautait aux yeux.
        C'est le piège n° 6 de la série des entiers transposé au triplet : « une ligne
        qui finit par un nombre se pose à l'instant de CE nombre ».
        ⚠️ `verifier-avant-rendu.py` connaît `au_fin` et mesure son seuil de 0,6 s sur
        la FIN de l'extrait, comme ici."""
        i = -1
        for _ in range(n):
            i = self._texte_voix.find(extrait, i + 1)
            if i < 0:
                raise ValueError(f"« {extrait} » (n = {n}) absent de la voix")
        j = i + len(extrait)
        m = self._marques().get(self._cle_voix) or []
        dedans = [p for p, _ in m if i <= p < j]
        self.au_pos(max(dedans) if dedans else i)

    # ── le repère de l'espace, à gauche ─────────────────────────────────────

    def repere(self, o=(-4.35, -1.35), u=0.62, portee=4, noms=("x", "y", "z")):
        """⭐ UN repère par écran, posé dans la colonne de gauche. Mesuré : avec
        u = 0,62 et portée 4, le bout de x est à −1,82 et le bout de z monte à
        1,18 — tout reste dans la moitié gauche, loin de la colonne de droite."""
        r = Repere3D(o=np.array([o[0], o[1], 0.0]), u=u, portee=portee)
        ax = self.sans_audit(r.axes(noms=noms))
        return r, ax

    # ── la question-pause (modèle : loi_normale_escalier.py) ────────────────

    def carte_choix(self, lettre, corps, largeur=4.1, fs=32):
        rond = Circle(radius=0.25 * fs / 32, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
        l = Text(lettre, font_size=fs, color=WHITE, weight=BOLD).move_to(rond)
        c = corps if isinstance(corps, Mobject) else Text(corps, font_size=fs, color=WHITE)
        ligne = VGroup(VGroup(rond, l), c).arrange(RIGHT, buff=0.25)
        if ligne.width > largeur - 1.15:
            ligne.scale_to_fit_width(largeur - 1.15)
        cadre = RoundedRectangle(width=largeur, height=max(0.72, ligne.height + 0.28), corner_radius=0.14,
                                 stroke_color=BLEU_CALCUL, stroke_width=3, fill_color=FOND_CARTE,
                                 fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return VGroup(cadre, ligne)

    def q_tete(self, question, choix, largeur=4.1, xl=XL):
        """La question-pause : « Question ! », la question, les trois cartes, la pause.

        ⭐⭐ `largeur` ET `xl` (ajoutés pour l'épisode 5, MESURÉS hors rendu) : une carte
        de 4,1 posée à x = 2,2 n'offre que **2,20** à son texte, parce que
        `carte_choix` réduit le GROUPE rond + lettre + corps, et que le rond, lui, ne
        rétrécit pas de bon cœur. Conséquence chiffrée : un choix de quatre lignes
        tombe à **14,6 px quelle que soit la police demandée** — la police d'entrée ne
        change rien, c'est la réduction qui décide. C'est le défaut n° 4 de l'épisode 1
        (« des cartes à 10 px ») sous une autre forme, et l'épisode 3 l'avait contourné
        en coupant en trois lignes de 14 caractères.
        ⛔ Mais on ne peut pas toujours couper : la voix de l'épisode 5 dit « la droite
        est parallèle au plan, sans aucun point commun » — 56 caractères, et on ne
        raccourcit pas un choix que la voix prononce mot pour mot.
        ⭐ Le remède est la LARGEUR, pas la police : `largeur=6.0, xl=0.6` offre **4,10**
        au texte, et le même choix tient à 26 px sans aucune réduction. La colonne de
        cartes commence alors à x = 0,6 et finit à 6,6 — il faut donc que la donnée de
        gauche s'arrête avant x = 0,4 (`gauche(..., xmax=0.2)`).
        ⚠️ Les défauts par défaut sont ceux des épisodes 1 à 4 : rien ne change pour eux.
        ⚠️ Et le bas de `pause` doit rester AU-DESSUS de −2,15, sinon il s'écrit sur la
        tête de Ti-Margo (mesuré : des cartes qui descendent à −1,40 y mettent la pause
        à −2,44). Le contrôle se fait hors rendu, en appelant cette fonction."""
        tete = VGroup(pastille_pause(0.38), self.t("Question !", 38, ORANGE_RETENUE)).arrange(RIGHT, buff=0.22)
        self.col(tete, 3.15)
        rebours = CompteARebours(5, r=0.34, fs=32).next_to(tete, RIGHT, buff=0.35)
        if rebours.get_right()[0] > BORD_X:
            rebours.shift(LEFT * (rebours.get_right()[0] - BORD_X))
        q = VGroup(*[x if isinstance(x, Mobject) else self.t(x, 32) for x in question])
        q.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        self.col(q, 0, xl)
        q.align_to(P(0, tete.get_bottom()[1] - 0.25), UP)
        cartes = VGroup(*[self.carte_choix(l, c, largeur=largeur)
                          for l, c in zip("ABC", choix)]).arrange(DOWN, buff=0.16)
        # ⚠️ `col()` juge les cartes CENTRÉES en y = 0, alors que la ligne suivante les
        # remonte sous la question : son garde-fou Ti-Margo se déclenche donc sur une
        # position qu'elles n'occuperont pas. MESURÉ le 22/11 (épisode 6, cartes
        # fléchées) : il n'y a pourtant rien à corriger ici — sans la réduction, leur
        # vrai bas tombe à −2,19, c'est-à-dire bel et bien SUR Ti-Margo. Le garde-fou se
        # vérifie lui-même. ⛔ Ce qu'il faut lire à la place : un bloc de cartes trop
        # haut ne se rattrape pas dans le socle, il se recoupe dans l'épisode (voir
        # l'écran 07 de `espace_defi.py`).
        self.col(cartes, 0, xl)
        cartes.align_to(P(0, q.get_bottom()[1] - 0.3), UP)
        pause = self.col(self.t("Mets pause, et choisis !", 32, ORANGE_RETENUE),
                         cartes.get_bottom()[1] - 0.45, xl)
        if pause.width < 3.5:
            pause = VGroup(self.t("Mets pause,", 32, ORANGE_RETENUE), self.t("et choisis !", 32, ORANGE_RETENUE))
            pause.arrange(DOWN, aligned_edge=LEFT, buff=0.08)
            pause.move_to(P(0, cartes.get_bottom()[1] - 0.2), aligned_edge=UP).align_to(P(xl, 0), LEFT)
        return tete, q, cartes, pause, rebours

    def _ligne_choix(self, s, fs, noms):
        """Une ligne de carte de choix, fléchée si elle nomme un vecteur.

        ⭐⭐ AJOUTÉ LE 22/11 EN REPRENANT L'ÉPISODE 6 : ses trois cartes disaient
        « on montre que A B et / A C ont la même norme » et « vecteurs A B et A C », donc
        des vecteurs écrits à plat au cœur d'une question — exactement ce que Frédéric a
        signalé sur l'épisode 7. ⛔ `vexpr` ne pouvait pas être appelé de l'épisode :
        `choix2` et `choix3` construisaient leurs lignes avec `self.t`, et un choix ne se
        monte pas à la main sans perdre la mesure de largeur de `carte_choix`.
        ⚠️ `noms` ne s'applique qu'aux lignes où le nom est ISOLÉ : `vexpr` le vérifie
        lui-même, donc passer ("A B", "A C") sur les trois lignes est sans risque."""
        return self.vexpr(s, noms, fs) if noms else self.t(s, fs)

    def choix2(self, l1, l2, fs=28, noms=()):
        """Un choix en DEUX lignes : vu à la planche, une phrase longue dans une carte
        de 4,1 de large tombait à ~10 px, illisible sur un téléphone.
        ⭐ `noms` : les vecteurs à flécher dans ces deux lignes (voir `_ligne_choix`)."""
        g = VGroup(self._ligne_choix(l1, fs, noms), self._ligne_choix(l2, fs, noms))
        return g.arrange(DOWN, aligned_edge=LEFT, buff=0.06)

    def choix3(self, l1, l2, l3, fs=28, noms=()):
        """Un choix en TROIS lignes. ⛔⛔ MESURÉ (épisode 3, hors rendu) : une carte de
        4,1 de large n'offre que 2,95 à son texte, et « coordonnée ne suit pas » seule
        fait 4,54 — sur DEUX lignes, `carte_choix` la ramenait à 15 px, le défaut n° 4 de
        l'épisode 1. Sur trois lignes de 14 caractères au plus, le texte tient à ~20 px,
        comme les choix de l'épisode 1 qui ont été acceptés à l'image.
        ⚠️ Une carte à trois lignes est HAUTE : avec trois choix pareils, la question ne
        doit pas dépasser DEUX lignes, sinon le bas des cartes descend sur Ti-Margo
        (boîte x ∈ [5,54 ; 6,66], y ∈ [−3,55 ; −2,15] à scale 0,5)."""
        g = VGroup(self._ligne_choix(l1, fs, noms), self._ligne_choix(l2, fs, noms),
                   self._ligne_choix(l3, fs, noms))
        return g.arrange(DOWN, aligned_edge=LEFT, buff=0.06)

    def q_montrer_choix(self, cartes):
        voix = self._texte_voix
        deb = [voix.find(f"{L} : ") for L in "ABC"]
        fin_q = voix.find("Mets pause")
        for k, (c, L) in enumerate(zip(cartes, "ABC")):
            i = deb[k]
            self.au_pos(i)
            self.play(FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.15), run_time=0.2)
            corps = c[1][1]
            # ⭐⭐ UN TRIPLET s'affiche quand la voix a FINI de l'énoncer, une PHRASE dès
            # son premier mot. Mesuré sur l'épisode 3 : « A : 1, 2, 0 » posé au premier
            # chiffre met le « 0 » à l'écran 0,81 s avant qu'il soit dit (AUDIT-AVANCE).
            # ⛔ Mais on ne fait PAS la même chose d'une phrase : un choix de trois lignes
            # qui ne paraîtrait qu'à son dernier mot serait illisible à temps — l'élève
            # doit pouvoir le LIRE pendant qu'il l'entend.
            fin = deb[k + 1] if k + 1 < len(deb) and deb[k + 1] > i else fin_q
            if getattr(corps, "nb", None) and fin > i:
                m = self._marques().get(self._cle_voix) or []
                dedans = [p for p, _ in m if i + 4 <= p < fin]
                self.au_pos(max(dedans) if dedans else i + 4)
            else:
                self.au_pos(i + 4)
            self.play(FadeIn(corps, shift=RIGHT * 0.15), run_time=0.2)

    def q_pause(self, pause, rebours, cle_q, t0, bonne):
        self.au_mot("Mets pause")
        self.play(FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        print(f"QUESTION {cle_q} t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f}) reponse={bonne}",
              flush=True)

    def q_reponse(self, cartes, bonne, pause, rebours):
        """La carte gagnante : vert, les deux autres estompées, la coche, un battement.

        ⛔⛔ MESURÉ AU DRY RUN DE L'ÉPISODE 5 — le BATTEMENT peut faire SORTIR la carte
        du cadre. `scale(1.12)` autour du centre pousse le bord droit à
        cx + 1,12 × demi : pour une carte de 6,0 centrée en x = 3,6, cela fait **6,96**,
        au-delà de la marge de 3 % (6,68), et le dry run l'a signalé deux fois (une par
        question). Les cartes de 4,1 des épisodes 1 à 4 y échappaient de justesse
        (6,55) — c'est donc un défaut qui dormait, et que la carte large a réveillé.
        ⭐ On borne le facteur sur les DEUX bords, et s'il ne reste plus de place on ne
        bat pas : la couleur, l'estompage des deux autres et la coche disent déjà tout."""
        b = cartes[bonne]
        anims = [b[0].animate.set_stroke(VERT_OK, width=7).set_fill("#052e16", 1),
                 b[1][0][0].animate.set_fill(VERT_OK)]
        anims += [cartes[j].animate.set_opacity(0.3) for j in range(len(cartes)) if j != bonne]
        self.play(*anims, FadeOut(rebours), FadeOut(pause), run_time=0.25)
        ok = self.coche(VERT_OK, 0.2).move_to(b[0].get_right() + LEFT * 0.35)
        demi, cx = max(1e-6, b.width / 2), float(b.get_center()[0])
        k = min(1.12, (6.68 - cx) / demi, (6.68 + cx) / demi)
        if k <= 1.005:
            self.play(Create(ok), run_time=0.3)
            return ok
        self.play(b.animate.scale(k), Create(ok), run_time=0.25)
        self.play(b.animate.scale(1 / k), ok.animate.scale(1 / k, about_point=b.get_center()),
                  run_time=0.25)
        return ok

    def pastille(self, k, color=BLEU_CALCUL, r=0.24):
        n = Text(str(k), font_size=30, color=BLACK, weight=BOLD)
        n._pas_audit = True
        return VGroup(Circle(radius=r, fill_color=color, fill_opacity=1, stroke_width=0), n)

    def page_abonnement(self, voix="11-abonne"):
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        entraine = self.t("Entraîne-toi sur", 46, JAUNE_TITRE).move_to(P(0, 2.05))
        site = self.t("eleveai.fr", 62, BLEU_CALCUL).move_to(P(0, 1.0))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        abonne = self.t("Abonne-toi !", 44, VERT_OK).move_to(P(0, -0.6))
        poignee = self.t("@eleveai974", 48, VERT_OK).move_to(P(0, -1.6))
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), run_time=0.4)
        self.play(GrowFromCenter(poignee), run_time=0.4)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3))
        self.attendre_voix(marge=1.4)
