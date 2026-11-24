# espace_commun_short.py
# LE SOCLE DES 6 SHORTS de la série « GÉOMÉTRIE DANS L'ESPACE » (E1 à E6), terminale spé.
#
# ⭐⭐ POURQUOI CE FICHIER EXISTE (23/11/2026)
# Les six shorts partagent exactement les mêmes pièces : l'entête (titre + échelle des
# ceintures), un bloc de texte centré borné en largeur, la carte de choix, la
# question-pause de 3 s, l'appel au commentaire et la page d'abonnement. Les recopier six
# fois, c'est refaire six fois les défauts que la série a déjà payés — et la note
# `manim/REPRISE-espace-terminale.md` en liste une quarantaine. C'est le même raisonnement
# que `manim/poste2/espace_ecrans.py` pour les douze paysages.
#
# ⛔⛔ CE FICHIER N'EST PAS `espace_ecrans.py`, ET IL NE PEUT PAS L'ÊTRE.
# `EcransEspace` est bâti pour le PAYSAGE : son `col()` écrit dans une colonne de droite
# qui va de x = 2,2 à 6,6, et sa marge est x ∈ [−6,68 ; 6,68]. Un short est en 9:16 —
# `ShortSeconde.__init__` pose `frame_width = 4,5` et `frame_height = 8,0`, donc la marge
# de 3 % (que l'audit `BORDS=1` calcule avec `frame_width * 0.03` sur LES DEUX AXES) est
# x ∈ [−2,115 ; 2,115] et y ∈ [−3,865 ; 3,865]. Il n'y a qu'UNE colonne, et elle est
# centrée. Hériter du socle paysage aurait posé chaque bloc hors du cadre.
#
# ⭐⭐ MAIS ON NE RECOPIE PAS CE QUI EST DÉJÀ JUSTE. Les outils du socle paysage qui ne
# dépendent QUE de `self.t`, des marques et du texte de la voix sont EMPRUNTÉS tels quels
# (voir le bloc « emprunts » plus bas) : `vec`, `vexpr`, `trip`, `au_fin`, `q_montrer_choix`…
# Deux copies d'une seule vérité divergent dès qu'on en touche une — c'est ce que la cote
# de Ravi a coûté à l'épisode 10.
# ⚠️ ET IL Y A UNE LIMITE QUI A ÉTÉ MESURÉE, PAS DEVINÉE : on ne peut PAS emprunter une
# méthode qui appelle `super()` sans argument. Le `super()` à zéro argument se résout avec
# la cellule `__class__` du fichier d'origine (donc `EcransEspace`) et exige que `self` en
# soit une instance : emprunter `EcransEspace.au_mot` lève
# `TypeError: super(type, obj): obj must be an instance or subtype of type`.
# C'est pourquoi `au_mot` est réécrit ici (cinq lignes), et seulement lui.
#
# Les figures viennent de `manim/poste2/espace3d.py` — la MÊME projection cavalière que
# le coach (`lib/canvas/Repere3dCanvas.tsx`). ⭐ C'est un choix, pas une facilité : un
# élève qui voit le short puis ouvre sa question doit retrouver le dessin exact.
#
# ⛔ Les pièges de la série sont dans `manim/REPRISE-espace-terminale.md` et
# `manim/REPRISE-entiers-cm1-6e.md`. Les lire AVANT d'écrire un écran.

import os
import sys
from pathlib import Path

_ICI = Path(__file__).resolve().parent
_RACINE = _ICI.parents[2]
sys.path.insert(0, str(_ICI))
sys.path.insert(1, str(_RACINE / "manim" / "scripts" / "stmg"))
sys.path.insert(2, str(_RACINE / "manim" / "scripts" / "seconde"))
sys.path.insert(3, str(_RACINE / "manim" / "poste2"))

from proba_bin_defi import MotsCales, P  # noqa: E402

from manim import *  # noqa: E402,F401,F403

from canvas_proportion import AuditSynchro  # noqa: E402
from charte import *  # noqa: E402,F401,F403
from espace3d import (C_FANTOME, C_NORMALE, C_PIEGE, C_PLAN, C_POINT, C_REGARD,  # noqa: E402,F401
                      C_DROITE, C_VECTEUR, C_VECTEUR2, FUITE, Repere3D, platitude,
                      plan_dessine)
from espace_ecrans import EcransEspace  # noqa: E402  (⭐ pour EMPRUNTER ses outils, pas pour en hériter)
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from stats_lycee_h2_commun import CompteARebours, pastille_pause  # noqa: E402

import numpy as np  # noqa: E402,F401

FOND_CARTE = "#0b1220"

# ⭐ La largeur offerte à un texte : mesurée, pas choisie. La marge de 3 % s'arrête à
# x = ±2,115 (voir l'en-tête), donc 4,23 de large en tout ; 3,90 laisse 0,165 de chaque
# côté, c'est-à-dire de quoi absorber un `SurroundingRectangle` de buff 0,12.
LARG = 3.90

# ⚠️ Le bas de l'écran appartient à Ti-Margo : `ShortSeconde.margo_bas()` le pose à
# y = −3,45 à l'échelle 0,38. Sa cote exacte est MESURÉE par
# `espace_mesure_short.py` (et non recopiée d'ici) : c'est le défaut n° 1 de l'épisode 5,
# « l'échelle des ceintures monte à −1,98 et cette note disait −2,6 ».
Y_MARGO = -3.45


class ShortEspace(AuditSynchro, MotsCales, Short6e):
    """Un short de la série « espace » : 9:16, six clips, une seule idée.

    Un épisode en hérite et écrit ses six écrans. ⛔ Une correction d'outil se fait ICI.
    """

    identite = "Maths Tle — EleveAI"
    ceinture = "verte"          # ⭐ la même que les six paysages : c'est la même micro

    Y_TITRE, Y_BADGE = 3.50, 2.78

    # ── les bords, lus sur le cadre RÉEL ────────────────────────────────────
    # ⛔ Pas de constante de module : `config.frame_width` ne vaut 4,5 qu'APRÈS
    # `ShortSeconde.__init__`. Une constante calculée à l'import aurait porté la marge
    # du 16:9 — un chiffre faux et parfaitement plausible.
    @property
    def bord_x(self):
        return config.frame_width / 2 - config.frame_width * 0.03

    @property
    def bord_y(self):
        return config.frame_height / 2 - config.frame_width * 0.03

    # ── le texte ────────────────────────────────────────────────────────────
    def t(self, texte, fs=30, color=WHITE, larg=LARG):
        t = Text(texte, font_size=fs, color=color)
        # ⭐ On RETIENT la police demandée : `scale_to_fit_width` ne touche pas
        # `font_size`, donc sans ça `espace_mesure_short.py` ne saurait pas à quoi
        # comparer la police obtenue. (Il la MESURE quand même en rebâtissant le Text :
        # cette étiquette dit seulement quelle était l'intention.)
        t._fs = fs
        if larg and t.width > larg:
            t.scale_to_fit_width(larg)
        return t

    def pose(self, mob, y, larg=LARG):
        """Centre un objet à l'ordonnée y, et le réduit s'il dépasse la largeur offerte.
        ⚠️ La réduction est SILENCIEUSE à l'image : c'est `espace_mesure_short.py` qui la
        signale, et c'est pour ça qu'il existe (défaut n° 4 de l'épisode 3 : une question
        tombée à 19 px sans que rien ne le dise)."""
        mob.move_to(P(0, y))
        if larg and mob.width > larg:
            mob.scale_to_fit_width(larg).move_to(P(0, y))
        return mob

    def para(self, lignes, y, fs=30, buff=0.14, larg=LARG, couleur=WHITE):
        """Un paragraphe centré : chaque ligne est un objet, pour la dévoiler à son mot.
        `lignes` accepte une chaîne, un (chaîne, couleur) ou un Mobject déjà construit."""
        g = VGroup()
        for x in lignes:
            if isinstance(x, Mobject):
                g.add(x)
            elif isinstance(x, tuple):
                g.add(self.t(x[0], fs, x[1], larg=None))
            else:
                g.add(self.t(x, fs, couleur, larg=None))
        g.arrange(DOWN, buff=buff)
        return self.pose(g, y, larg)

    # ── ⭐⭐ LA PHRASE COUPÉE, ET POSÉE AU RYTHME DE LA VOIX ─────────────────
    def lignes(self, texte, fs, larg=LARG, color=WHITE):
        """Coupe une phrase en lignes qui TIENNENT, et rend (mobjets, décalages).

        ⭐⭐ La coupe est MESURÉE mot à mot : on ajoute un mot tant que le `Text` reste
        sous `larg`. ⛔ Pas de « ~18 caractères par ligne » : une règle de pouce fait
        rétrécir une ligne sur dix, et une ligne rétrécie ne se voit NULLE PART ailleurs
        qu'à l'image (défaut n° 4 de l'épisode 3, une question tombée à 19 px).
        ⭐ Le décalage rendu est la position du premier caractère de la ligne DANS la
        phrase : c'est ce qui permet de poser chaque ligne à son instant exact sans
        chercher un mot qui pourrait se répéter plus tôt dans le clip."""
        mots, lignes, cur = texte.split(), [], ""
        for m in mots:
            essai = (cur + " " + m).strip()
            if cur and Text(essai, font_size=fs).width > larg:
                lignes.append(cur)
                cur = m
            else:
                cur = essai
        if cur:
            lignes.append(cur)
        out, pos, k = [], [], 0
        for ligne in lignes:
            k = texte.find(ligne, k)
            pos.append(k)
            k += len(ligne)
            out.append(self.t(ligne, fs, color, larg=None))
        return out, pos

    def blocs_phrase(self, texte, y, fs=28, color=WHITE, buff=0.12, larg=LARG):
        """Comme `dire_phrase`, mais SANS jouer : pour `pieces()`, qui doit rendre à
        `espace_mesure_short.py` exactement les objets que `construct()` animera."""
        mobs, _ = self.lignes(texte, fs, larg, color)
        g = VGroup(*mobs).arrange(DOWN, buff=buff)
        return self.pose(g, y, larg)

    @staticmethod
    def par_nom(pieces):
        """Les blocs d'un écran, par leur NOM. ⛔ L'index a déjà menti une fois : en
        ajoutant « titre » et « badge » en tête de la liste d'un écran, `[2][1]` est
        passé de la correction aux cartes, et `jouer_phrase` a cassé sur un VGroup. Un
        nom ne glisse pas quand on insère un bloc."""
        return {ecran: dict(blocs) for ecran, blocs in pieces.items()}

    def jouer_phrase(self, g, texte, rt=0.28, avec=()):
        """Anime un bloc déjà bâti par `blocs_phrase`, ligne par ligne, à son instant.

        ⭐⭐ UNE LIGNE QUI PORTE UN CHIFFRE EST POSÉE À `au_fin`, les autres à leur
        premier mot. C'est le piège n° 6 de la série des entiers (« une ligne qui finit
        par un nombre se pose à l'instant de CE nombre »), et la raison pour laquelle
        l'épisode 3 avait **40 `AUDIT-AVANCE` dont 35 de cette seule cause** : posée à
        son premier mot, une ligne met son dernier nombre à l'écran avant qu'il soit dit.
        ⚠️ Le prix de `au_fin` est un petit retard sur le PREMIER nombre de la ligne.
        C'est assumé et mesuré (épisode 12, ses trois `AUDIT-TARD` structurels) ; les
        lignes étant courtes ici, il reste sous le demi-seuil.
        ⛔ `texte` doit être un morceau EXACT de la voix du clip : c'est la règle
        « ce qui est dit est écrit, mot pour mot »."""
        base = self._texte_voix.find(texte)
        if base < 0:
            raise ValueError(f"« {texte[:40]}… » n'est pas dans la voix du clip "
                             f"{getattr(self, '_cle_voix', '?')}")
        # ⭐ `avec` : les animations à jouer EN MÊME TEMPS que la première ligne. Ce
        # n'est pas un confort — mesuré au dry run, un `play` de figure glissé entre deux
        # phrases coûte son `run_time` au budget du clip, et la phrase suivante arrive en
        # RETARD (0,83 s sur E4, 0,59 s sur E6). On fait paraître la figure AVEC sa
        # légende au lieu de les mettre en file.
        k, premiere = 0, True
        for m in g:
            p = texte.find(m.original_text, k)
            k = p + len(m.original_text)
            if any(c.isdigit() for c in m.original_text):
                self.au_fin_pos(base + p, len(m.original_text))
            else:
                self.au_pos(base + p)
            self.play(FadeIn(m, shift=UP * 0.08), *(avec if premiere else ()), run_time=rt)
            premiere = False
        return g

    def au_fin_pos(self, i, longueur):
        """`au_fin`, mais à un DÉCALAGE connu au lieu d'un `find` depuis le début.

        ⛔⛔ C'EST UNE VRAIE FAILLE QU'ON FERME, PAS UN RAFFINEMENT. `au_fin(extrait)`
        cherche `extrait` avec `find`, donc la PREMIÈRE occurrence. Une ligne dont le
        texte se répète dans le clip (« 0 moins 0 fait 0 » revient dans la correction)
        serait donc attendue sur l'occurrence d'AVANT, et s'afficherait en avance sur la
        sienne — exactement le défaut que la note appelle « un gros AUDIT-TARD cachait
        une vraie avance », huit fois dans cette série. Ici le décalage est connu : il
        vient de la découpe de la phrase, et on ne cherche plus rien.
        ⭐ C'est aussi ce qui rend l'invariant VÉRIFIABLE : tout bloc qui porte un
        chiffre est posé à la dernière marque DE SON PROPRE morceau de voix, donc aucun
        de ses nombres ne peut être à l'écran avant d'être dit."""
        m = self._marques().get(self._cle_voix) or []
        dedans = [p for p, _ in m if i <= p < i + longueur]
        self.au_pos(max(dedans) if dedans else i)

    def insister(self, mob, k=1.1, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def eq_mots(self, jetons, fs=28, color=WHITE, buff=0.12):
        """Une petite équation montée JETON PAR JETON, dont les « 0 » sont hors audit.

        ⛔⛔ POURQUOI JETON PAR JETON ET PAS EN UN SEUL `Text` : la voix de cette série
        dit « zéro » en lettres (« il reste zéro égale zéro »), et l'écran écrit le
        CHIFFRE — c'est la bonne écriture au tableau. L'audit, lui, cherche « 0 » dans
        la voix et ne le trouve pas : `AUDIT-ABSENT « 0 »`. Un `sans_audit` sur toute
        l'équation réglerait le signalement, mais il exempterait AUSSI le « 2 » de
        « 2t = 0 » — c'est-à-dire le seul nombre que l'audit doit vraiment surveiller
        ici. En montant l'équation jeton par jeton, on n'exempte que les zéros.
        ⭐ C'est la même précaution que `g.nb[i]` de `trip()` : on rend adressable ce
        qu'on doit traiter séparément."""
        g = VGroup(*[self.t(j, fs, color, larg=None) for j in jetons])
        g.arrange(RIGHT, buff=buff)
        for j, m in zip(jetons, g):
            # ⚠️ TOUT jeton qui COMMENCE par un zéro, et pas seulement « 0 » : mesuré au
            # dry run de E4, « 0y » et « 0z » sortaient en AUDIT-ABSENT parce que la
            # règle ne reconnaissait que le zéro nu. La voix dit « plus zéro fois y ».
            if j.strip().startswith(("0", "zéro")):
                self.sans_audit(m)   # la voix le dit EN LETTRES, l'écran l'écrit en chiffre
        return g

    def croix(self, color="#dc2626", r=0.14, sw=5):
        return VGroup(Line(P(-r, -r), P(r, r)), Line(P(-r, r), P(r, -r))).set_stroke(color, sw)

    # ── la voix ─────────────────────────────────────────────────────────────
    def dire(self, nom, dossier=None):
        if os.environ.get("BORDS") or os.environ.get("AUDIT"):
            print(f"ECRAN {nom} t={self.renderer.time:.2f}", flush=True)
        return super().dire(nom, dossier)

    def _ambigu(self, extrait, n):
        """⭐⭐ LE GARDE-FOU D'EXÉCUTION QUI COUVRE CE QUE L'AST NE VOIT PAS.

        `au_mot` et `au_fin` cherchent leur extrait avec `find` : si le clip le contient
        DEUX fois et qu'on ne précise pas `n`, l'ancre vise la première occurrence et
        l'objet s'affiche en avance sur la sienne. C'est le mécanisme de « un gros
        AUDIT-TARD cachait une vraie avance », huit fois dans cette série.
        ⛔ `espace_mesure_short.py --ancres` ne contrôle que les appels LITTÉRAUX : un
        `au_fin(extrait)` dans une boucle (il y en a dans quatre des six shorts) lui est
        invisible. Ce contrôle-ci, lui, passe par tous les appels — et il parle dans le
        journal du dry run, là où on le lira."""
        if n == 1 and (self._texte_voix or "").count(extrait) > 1:
            print(f"AMBIGU {getattr(self, '_cle_voix', '?')} « {extrait[:40]} » : "
                  f"{self._texte_voix.count(extrait)} occurrences — `find` vise la 1re",
                  flush=True)

    def au_mot(self, extrait, n=1):
        """⚠️ RÉÉCRIT ICI, et c'est le seul outil du socle paysage qui ne s'emprunte pas :
        `EcransEspace.au_mot` appelle `super().au_mot(...)` à zéro argument, donc il exige
        que `self` soit une instance de `EcransEspace`. Mesuré : l'emprunt lève
        `TypeError: super(type, obj): obj must be an instance or subtype of type`."""
        self._ambigu(extrait, n)
        if n == 1:
            return super().au_mot(extrait)
        i = -1
        for _ in range(n):
            i = self._texte_voix.find(extrait, i + 1)
            if i < 0:
                raise ValueError(f"« {extrait} » (n = {n}) absent de la voix")
        self.au_pos(i)

    # ── ⭐ LES EMPRUNTS AU SOCLE PAYSAGE : une seule implémentation ──────────
    # Chacun n'utilise que `self.t`, les marques et le texte de la voix — rien de la
    # géométrie 16:9 — et AUCUN n'appelle `super()`. Vérifié un par un avant d'emprunter.
    t_pos = EcransEspace.t_pos
    au_pos = EcransEspace.au_pos
    _au_fin_socle = EcransEspace.au_fin

    def au_fin(self, extrait, n=1):
        """`au_fin` du socle paysage, plus le garde-fou d'ambiguïté (voir `_ambigu`)."""
        self._ambigu(extrait, n)
        return self._au_fin_socle(extrait, n)
    nombre = EcransEspace.nombre
    trip = EcransEspace.trip
    sans_audit = EcransEspace.sans_audit
    _fleche_vecteur = EcransEspace._fleche_vecteur
    vec = EcransEspace.vec
    vexpr = EcransEspace.vexpr
    _ligne_choix = EcransEspace._ligne_choix
    q_montrer_choix = EcransEspace.q_montrer_choix
    q_pause = EcransEspace.q_pause

    # ── l'entête ────────────────────────────────────────────────────────────
    def entete_blocs(self, titre, fs=38):
        """Le titre et l'échelle des ceintures, BÂTIS et POSITIONNÉS, pas joués.
        ⭐ C'est `pieces()` de chaque short qui l'appelle, et `construct()` qui animera —
        ainsi `espace_mesure_short.py` mesure les objets qui seront rendus, et il COMPARE
        les deux boîtes (trou d'instrument de l'épisode 7 : « la mesure voyait le titre,
        et ne le comparait à rien »)."""
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.70)
        badge.move_to(P(0, self.Y_BADGE))
        self.sans_audit(badge)               # les ceintures ne portent aucun nombre dit
        t = self.pose(self.t(titre, fs, JAUNE_TITRE, larg=None), self.Y_TITRE)
        return t, badge

    # ── le cube ABCDEFGH, et les deux noms qu'il faut écarter ───────────────
    #
    # ⛔⛔ AU DÉCALAGE PAR DÉFAUT DE `espace3d.Repere3D.cube()`, DEUX NOMS SONT POSÉS
    # SUR UNE ARÊTE. Mesuré à trois échelles, avant d'écrire un écran :
    #
    #   u      « D » de l'arête la plus proche   « F » de l'arête la plus proche
    #   1,45   0,025                             0,013
    #   1,10   0,025                             0,013
    #   1,00   0,010                             0,001
    #
    # ⭐ Ce n'est donc PAS une question d'échelle — le défaut est dans le décalage, et
    # la note de la série le signalait comme « constat, pas correctif » (épisode 12,
    # mesuré à u = 1,35 sur les cubes déjà livrés en HD). Les shorts, eux, ne sont pas
    # rendus : on le corrige ici.
    # ⚠️ Les deux écarts viennent d'une RECHERCHE EN GRILLE (pas de 0,04 entre −0,5 et
    # +0,5), qui garde les positions à plus de 0,12 de tout segment tracé et à plus de
    # 0,30 des sept autres noms, puis classe par distance au SOMMET — la plus proche
    # gagne, pour qu'on sache à qui le nom appartient (recette de l'épisode 9).
    # ⛔ Et l'instrument a dû être refait : son premier jet ne retrouvait que 9 segments
    # sur 12 dans les sous-mobjets, parce que les trois arêtes cachées sont des
    # `DashedLine`, donc des groupes de tirets. Il reçoit maintenant les douze arêtes
    # CALCULÉES — « un instrument qui ne reçoit qu'une partie de la figure mesure une
    # figure qui n'existe pas » (épisode 11).
    CUBE_SOMMETS = {"A": (0, 0, 0), "B": (1, 0, 0), "C": (1, 1, 0), "D": (0, 1, 0),
                    "E": (0, 0, 1), "F": (1, 0, 1), "G": (1, 1, 1), "H": (0, 1, 1)}
    #
    # ⛔⛔⛔ ET LA PREMIÈRE VERSION DE CES DEUX ÉCARTS A POSÉ « D » SUR « F ».
    # Vu à la PLANCHE du `-ql`, pas par un instrument : les deux lettres se lisaient
    # comme un seul glyphe au milieu du cube. La cause tient en une phrase — la grille
    # classait par distance au sommet, donc elle prenait la place libre la plus proche,
    # et la plus proche était VERS L'INTÉRIEUR du cube pour les deux. Chacun fuyait son
    # arête, et ils se rencontraient.
    # ⭐⭐ Ce qui manquait à la grille : les autres noms N'ÉTAIENT COMPARÉS QU'À LEUR
    # PLACE PAR DÉFAUT. On cherche maintenant un écart À LA FOIS — « F » d'abord, puis
    # « D » avec « F » à sa place NOUVELLE — et on exige 0,34 entre deux centres de nom
    # en plus de 0,11 de tout segment. C'est « fuir une flèche pour tomber sur une
    # arête » (épisode 9) dans sa forme la plus bête : fuir une arête pour tomber sur
    # l'autre nom qu'on vient de déplacer.
    # ⭐ Et la mesure a rendu un second fait : avec les deux diagonales (A C) et (E B)
    # tracées, la grille garde 541 et 625 positions libres au lieu de 562 et 647, et
    # **les écarts retenus sont les mêmes**. Il n'y a donc qu'UNE table, et la seconde
    # (`ECARTE_CUBE_DIAG`) n'existe que pour que les épisodes qui la nomment continuent
    # de dire ce qu'ils dessinent.
    ECARTE_CUBE = {"F": (-0.04, -0.20), "D": (-0.44, 0.00)}
    ECARTE_CUBE_DIAG = ECARTE_CUBE

    def cube_place(self, u, y, x=0.0, fs=24, ecarte=None, base=False, noms=None):
        """Le cube ABCDEFGH posé par son GROUPE, ses deux noms écartés.

        ⭐⭐ L'ORIGINE EST CALCULÉE POUR QUE LE CUBE TOMBE EN (x ; y), et on ne le
        déplace PAS après coup. ⛔ C'est une leçon à part : un cube bâti puis recentré
        par `move_to` n'est plus à l'endroit que `r.pt(...)` indique, donc toute arête,
        tout point et toute diagonale qu'un écran voudrait ajouter ensuite se poserait
        à côté — en silence. Le centre projeté du cube unité est à
        u × (0,5 + 0,41 × 0,5 ; 0,5 + 0,287 × 0,5), c'est-à-dire u × (0,705 ; 0,6435).
        `base=True` ajoute les trois directions du repère depuis A — ⭐ ANONYMES :
        trois étiquettes de plus dans un cube dont les huit noms sont déjà à 0,14 de
        leur arête, et la grille ne trouve rien. « Quand la grille ne trouve rien, on
        n'étiquette pas » (épisode 8) : c'est la VOIX qui les nomme."""
        cx, cy = 0.5 + FUITE[0] * 0.5, 0.5 + FUITE[1] * 0.5
        r = Repere3D(o=np.array([x - u * cx, y - u * cy, 0.0]), u=u, portee=3)
        c = r.cube(cote=1, fs=fs)
        etiq = {s: c[len(c) - 8 + i] for i, s in enumerate("ABCDEFGH")}
        for s, (dx, dy) in (ecarte or {}).items():
            etiq[s].shift(np.array([dx, dy, 0.0]))
        # ⛔⛔ `noms` : les SEULS sommets à nommer. Quand une figure porte en plus deux
        # diagonales, la grille ne trouve PLUS AUCUNE position libre pour « F » —
        # mesuré sur l'écran 03 du short du défi : 0 position sur 441 essayées, et le
        # nom restait à 0,063 de la diagonale (A G). ⭐ « Quand la grille ne trouve
        # rien, on n'étiquette pas » (épisode 8) : on ne garde que les sommets dont la
        # question parle, et la figure y gagne.
        if noms is not None:
            for s, t_ in etiq.items():
                if s not in noms:
                    c.remove(t_)
        self.sans_audit(c)        # les huit noms sont des LETTRES, pas des nombres dits
        g = VGroup(c)
        vs = None
        if base:
            vs = VGroup(*[r.vecteur((0, 0, 0), self.CUBE_SOMMETS[s], couleur=C_VECTEUR, sw=5)
                          for s in ("B", "D", "E")])
            g.add(vs)
        return r, c, vs, g

    def arete(self, r, s1, s2, couleur=VERT_OK, sw=7):
        """Un segment du cube repassé en couleur, posé PAR-DESSUS l'arête.
        ⛔ Jamais en pointillé sur un trait déjà tracé : [C G] dessiné en pointillé était
        INVISIBLE à l'épisode 9, puisque [C G] *est* une arête. Un trait plein d'une
        autre couleur, lui, se voit — et il porte la leçon."""
        a, b = self.CUBE_SOMMETS[s1], self.CUBE_SOMMETS[s2]
        return Line(r.pt(*a), r.pt(*b)).set_stroke(couleur, sw)

    # ── la figure : le repère cavalière, dans la moitié haute ───────────────
    def repere(self, o=(0.0, 0.55), u=0.60, portee=3, noms=("x", "y", "z")):
        """⭐ UN repère par écran, centré. ⚠️ `portee` est TRONQUÉ À L'ENTIER par
        `Repere3D.__init__` (`int(portee)`) : `portee=2.9` donne des axes de longueur 2,
        et rien ne le signale. Pour allonger finement, c'est `u` qu'on touche."""
        r = Repere3D(o=np.array([o[0], o[1], 0.0]), u=u, portee=portee)
        axes = r.axes(noms=noms)
        self.sans_audit(axes)                # « x », « y », « z » : du décor, pas la leçon
        return r, axes

    # ── la question-pause ───────────────────────────────────────────────────
    def carte_choix(self, lettre, corps, largeur=3.95, fs=26):
        """La carte d'un choix. ⛔⛔ MESURÉ sur la série (épisode 5) : `carte_choix`
        réduit le GROUPE rond + lettre + corps pour le faire tenir dans
        `largeur − 1,15`, et le rond ne rétrécit pas de bon cœur. Augmenter la police
        ne change RIEN — c'est la largeur qui décide. D'où `largeur=3,95` ici, le
        maximum que la marge du 9:16 autorise (3,95 + buff du battement < 4,23)."""
        rond = Circle(radius=0.21 * fs / 26, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
        l = Text(lettre, font_size=fs, color=WHITE, weight=BOLD).move_to(rond)
        l._pas_audit = True                  # « A », « B », « C » : des lettres, pas des nombres
        c = corps if isinstance(corps, Mobject) else self.t(corps, fs, WHITE, larg=None)
        ligne = VGroup(VGroup(rond, l), c).arrange(RIGHT, buff=0.20)
        if ligne.width > largeur - 0.95:
            ligne.scale_to_fit_width(largeur - 0.95)
        cadre = RoundedRectangle(width=largeur, height=max(0.60, ligne.height + 0.24),
                                 corner_radius=0.12, stroke_color=BLEU_CALCUL, stroke_width=3,
                                 fill_color=FOND_CARTE, fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.16, LEFT)
        return VGroup(cadre, ligne)

    def choix2(self, l1, l2, fs=24, noms=()):
        """Un choix sur DEUX lignes. ⭐ `noms` : les vecteurs à flécher — `choix2`/`choix3`
        passent alors chaque ligne par `vexpr`, sans quoi `auditer-fleches-vecteurs.py`
        signalerait comme nues des cartes parfaitement fléchées."""
        g = VGroup(self._ligne_choix(l1, fs, noms), self._ligne_choix(l2, fs, noms))
        return g.arrange(DOWN, aligned_edge=LEFT, buff=0.05)

    def q_tete(self, question, choix, largeur=3.95, fs_q=28, fs_c=26, y_tete=2.18, duree=3):
        """« Question ! », la question, les trois cartes, la pause et le compte à rebours.

        ⭐ Le gabarit du short : tout est CENTRÉ, et on descend. Les cinq objets sont
        rendus ensemble — ⛔ c'est le défaut n° 1 de l'épisode 1 : `q_reponse` doit
        recevoir `pause` ET `rebours` pour les effacer, sinon « Mets pause, et choisis ! »
        et le compte à rebours restent affichés PAR-DESSUS toute l'explication.
        ⚠️ Le compte à rebours d'un short est à 3 s, pas 5 : on ne tient pas un
        spectateur de short cinq secondes sur un écran fixe (gabarit des 41 shorts de
        terminale déjà produits)."""
        tete = VGroup(pastille_pause(0.30), self.t("Question !", 32, ORANGE_RETENUE, larg=None))
        tete.arrange(RIGHT, buff=0.16)
        rebours = CompteARebours(duree, r=0.24, fs=24).next_to(tete, RIGHT, buff=0.22)
        ensemble = VGroup(tete, rebours)
        self.pose(ensemble, y_tete)
        q = VGroup(*[x if isinstance(x, Mobject) else self.t(x, fs_q, larg=None) for x in question])
        q.arrange(DOWN, buff=0.10)
        self.pose(q, 0)
        q.align_to(P(0, tete.get_bottom()[1] - 0.22), UP)
        cartes = VGroup(*[self.carte_choix(l, c, largeur=largeur, fs=fs_c)
                          for l, c in zip("ABC", choix)]).arrange(DOWN, buff=0.10)
        # ⚠️ 0,10 et non 0,12 entre deux cartes : mesuré sur E2, les 0,04 gagnés sont
        # exactement ce qui sépare « Mets pause » de la boîte de Ti-Margo. Un écart d'un
        # centième décide, et aucune relecture ne le voit (leçon de l'épisode 6).
        cartes.move_to(P(0, 0))
        cartes.align_to(P(0, q.get_bottom()[1] - 0.26), UP)
        # ⚠️ 24 px et pas 26 : « Mets pause, et choisis ! » fait 4,06 de large à 26 px
        # pour 3,90 offerts, donc il serait RÉDUIT à 23,8 px — et une ligne rétrécie ne
        # se voit nulle part ailleurs qu'à l'image. À 24 px il fait 3,75 et tient.
        pause = self.pose(self.t("Mets pause, et choisis !", 24, ORANGE_RETENUE, larg=None),
                          cartes.get_bottom()[1] - 0.32)
        return tete, q, cartes, pause, rebours

    def q_reponse(self, cartes, bonne, pause, rebours):
        """La carte gagnante : verte, les deux autres estompées, la coche, un battement.

        ⛔⛔ RÉÉCRIT, ET PAS EMPRUNTÉ : `EcransEspace.q_reponse` borne le battement sur
        **6,68**, la marge du PAYSAGE. En 9:16 la marge est à 2,115 : avec le chiffre du
        paysage, une carte de 3,95 centrée en 0 aurait battu à 1,12, donc jusqu'à
        x = ±2,212 — hors cadre, et le dry run l'aurait signalé six fois."""
        b = cartes[bonne]
        anims = [b[0].animate.set_stroke(VERT_OK, width=6).set_fill("#052e16", 1),
                 b[1][0][0].animate.set_fill(VERT_OK)]
        anims += [cartes[j].animate.set_opacity(0.3) for j in range(len(cartes)) if j != bonne]
        self.play(*anims, FadeOut(rebours), FadeOut(pause), run_time=0.25)
        ok = self.coche(VERT_OK, 0.15).move_to(b[0].get_right() + LEFT * 0.26)
        demi, cx, bx = max(1e-6, b.width / 2), float(b.get_center()[0]), self.bord_x
        k = min(1.10, (bx - cx) / demi, (bx + cx) / demi)
        if k <= 1.005:
            self.play(Create(ok), run_time=0.3)
            return ok
        self.play(b.animate.scale(k), Create(ok), run_time=0.25)
        self.play(b.animate.scale(1 / k), ok.animate.scale(1 / k, about_point=b.get_center()),
                  run_time=0.25)
        return ok

    # ── les deux derniers écrans ────────────────────────────────────────────
    APPEL = "Réponds en commentaire !"

    def appel_blocs(self, y, fs=30):
        """⚠️ COUPÉ EN DEUX LIGNES, et c'est une mesure : « Réponds en commentaire ! »
        fait 5,23 de large à 28 px, pour 3,90 offerts — posé d'une ligne, il tombe à
        **20,9 px obtenus**. En deux lignes il tient à sa taille demandée."""
        return self.blocs_phrase(self.APPEL, y, fs, VERT_OK)

    def jouer_appel(self, g):
        self.au_mot("Réponds en commentaire")
        self.play(FadeIn(g, scale=0.75), run_time=0.4)
        self.insister(g, 1.06)
        return g

    def fin_short(self, voix, a_effacer=()):
        """La page d'abonnement, identique aux six shorts.
        ⛔ Pas de `Flash` au CENTRE de « @eleveai974 » : le cercle d'étincelles tombe sur
        le nom, qui prend toute la largeur d'un 9:16. On fait grandir le nom à la place —
        le même remède que `suite_reconnaitre_short.py`."""
        self.dire(voix)
        if a_effacer:
            self.play(FadeOut(VGroup(*a_effacer)), run_time=0.3)
        entraine = self.pose(self.t("Entraîne-toi sur", 36, JAUNE_TITRE, larg=None), 2.30)
        site = self.pose(self.t("eleveai.fr", 50, BLEU_CALCUL, larg=None), 1.35)
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.18, stroke_width=3)
        abonne = self.pose(self.t("Abonne-toi !", 38, VERT_OK, larg=None), 0.10)
        poignee = self.pose(self.t("@eleveai974", 40, VERT_OK, larg=None), -0.80)
        self.play(Write(entraine), run_time=0.4)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.5)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), run_time=0.45)
        self.insister(poignee, 1.08)
        self.attendre_voix(marge=1.0)
