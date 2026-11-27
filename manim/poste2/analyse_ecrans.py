# manim/poste2/analyse_ecrans.py
# LE SOCLE D'ÉCRAN DES 5 ÉPISODES de la série « CONTINUITÉ ET TVI », terminale spé.
#
# ⭐⭐ POURQUOI CE FICHIER EXISTE, ET POURQUOI IL EST RECOPIÉ (27/11/2026)
# Il est recopié de `manim/poste2/espace_ecrans.py`, pas importé. L'en-tête de celui-là
# le dit : « la convention terminale (recopiés, rien importé) vaut d'un CHAPITRE à
# l'autre ». Cette série est un autre chapitre, et surtout elle ne dessine RIEN de ce
# que l'autre dessine : pas de repère 3D, pas de cube, pas de vecteur fléché — des axes,
# des courbes, des tableaux de variations. Importer aurait couplé une série qui démarre
# à une série EN PRODUCTION, pour n'en reprendre que la moitié.
#
# Ce qui est repris tel quel, parce que ce sont neuf défauts déjà payés :
#   · `col`, `ligne`, `lg`, `gauche` : les colonnes et leurs bords mesurés ;
#   · `q_tete` / `q_montrer_choix` / `q_pause` / `q_reponse` : la question-pause, avec
#     « Mets pause » qui s'EFFACE (il restait par-dessus toute l'explication sur E1
#     de la série espace) et le battement borné (une carte large sortait du cadre) ;
#   · `choix2`, `choix3` : une phrase longue dans une carte de 4,1 tombe à ~10 px ;
#   · `page_abonnement`, `echelle`, `add_mascotte`.
#
# Ce qui est NEUF ici :
#   · `plan_axes`, `courbe`, `pt`, `bande` : la boîte à dessin d'une série d'analyse ;
#   · `tab_variations` : le tableau de variations, dont E5 vit entièrement ;
#   · `marche` : une fonction en escalier, et `deux_morceaux` : un recollement.
#
# ⛔ TROIS CARTES DE CHOIX, PAS QUATRE. `q_tete` boucle sur « ABC » : un quatrième choix
# serait tronqué EN SILENCE par `zip`. Décision du 27/11, voir REPRISE-continuite-tvi.md
# § 2. Ne pas « améliorer » ça sans rouvrir la décision.
#
# ⚠️ LES MARQUES N'EXISTENT PAS ENCORE, ET LE SOCLE LE DIT À CHAQUE RENDU.
# `MotsCales.au_mot` retombe tout seul sur l'estimation au prorata des caractères quand
# le fichier de marques manque — un repli commode, et SILENCIEUX. Ici il est annoncé :
# `dire()` imprime une bannière la première fois. Une planche faite sans marques est
# bonne pour juger la MISE EN PAGE, elle ne dit rien de la SYNCHRONISATION.

import os
import sys
from pathlib import Path

# ⚠️ Les quatre modules dont ce socle hérite vivent dans QUATRE dossiers différents, et
# aucun n'est importable par son chemin : `proba_bin_defi` est en terminale,
# `stats_lycee_h2_commun` en STMG, `signes_expression_2de` en seconde, le reste à la
# racine de manim/. C'est le même quatuor que `espace_ecrans.py`, dans le même ordre.
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts" / "terminale"))
sys.path.insert(1, str(Path(__file__).resolve().parents[1] / "scripts" / "stmg"))
sys.path.insert(2, str(Path(__file__).resolve().parents[1] / "scripts" / "seconde"))
sys.path.insert(3, str(Path(__file__).resolve().parents[1]))

from proba_bin_defi import MotsCales, P  # noqa: E402

from manim import *  # noqa: E402,F401,F403

from canvas_proportion import AuditSynchro  # noqa: E402
from charte import *  # noqa: E402,F401,F403
from gabarit_sixieme import Notion6e  # noqa: E402
from mascotte import MascotteMargouillat  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from stats_lycee_h2_commun import CompteARebours, pastille_pause  # noqa: E402

import numpy as np  # noqa: E402

FOND_CARTE = "#0b1220"
XL, BORD_X = 2.2, 6.6          # la colonne de droite (marge de 3 % : 0,43 du bord)
C_COURBE = BLEU_CALCUL
C_SAUT = ROUGE_ERREUR


class EcransAnalyse(AuditSynchro, MotsCales, Notion6e):
    """Les outils d'écran communs aux 5 épisodes. Un épisode en hérite et ajoute ses
    15 écrans. ⛔ Une correction d'OUTIL se fait ICI, jamais recopiée dans un épisode."""

    identite = "Maths Tle spé — EleveAI"
    ceinture = "verte"
    fichier_marques = None          # ⏳ tant qu'il n'y a pas de WAV

    # ── outils de texte et de colonnes (repris de espace_ecrans.py) ─────────

    # ⛔⛔ DEUX GLYPHES NE SE RENDENT PAS DANS CETTE POLICE, ET ILS NE PRÉVIENNENT PAS :
    # « ⩽ » (U+2A7D) et « ⩾ » (U+2A7E) sortent en CARRÉ VIDE. Vu à la planche de
    # l'épisode 1, sur « x ⩽ 2 » et « x ⩾ 1 » — le dry run ne dit rien, l'audit non plus,
    # un tofu n'est ni un bord ni un nombre. Les bons sont « ≤ » (U+2264) et « ≥ »
    # (U+2265), qui se rendent. ⚠️ « ≠ », « ∞ », « ℝ », « √ » et « ⟹ » sont vérifiés bons.
    GLYPHES_INTERDITS = {"⩽": "≤", "⩾": "≥"}

    def t(self, texte, fs=36, color=WHITE, larg=None):
        for mauvais, bon in self.GLYPHES_INTERDITS.items():
            if mauvais in texte:
                raise ValueError(
                    f"« {mauvais} » ne se rend pas dans cette police (carré vide) : "
                    f"écrire « {bon} » — texte : {texte[:40]}")
        t = Text(texte, font_size=fs, color=color)
        if larg and t.width > larg:
            t.scale_to_fit_width(larg)
        return t

    def col(self, mob, y, xl=XL):
        """La colonne de droite : alignée à gauche sur xl, jamais près du bord.
        ⚠️ Le second test est le garde-fou Ti-Margo : un bloc qui descend sous −1,95
        et dépasse x = 5,3 lui écrirait sur la tête."""
        mob.move_to(P(0, y)).align_to(P(xl, 0), LEFT)
        if mob.get_right()[0] > BORD_X:
            mob.scale_to_fit_width(BORD_X - xl).align_to(P(xl, 0), LEFT)
        if mob.get_bottom()[1] < -1.95 and mob.get_right()[0] > 5.3:
            mob.scale_to_fit_width(5.3 - xl).align_to(P(xl, 0), LEFT)
        return mob

    def ligne(self, *morceaux, y, xl=XL, buff=0.15):
        return self.col(VGroup(*morceaux).arrange(RIGHT, buff=buff), y, xl)

    def pile(self, morceaux, y, xl=XL, buff=0.16):
        g = VGroup(*morceaux).arrange(DOWN, aligned_edge=LEFT, buff=buff)
        return self.col(g, y, xl)

    def gauche(self, mob, y, xmax, x0=-6.5):
        """Une colonne à gauche, bornée à droite par `xmax`. ⛔ Sans cette borne, une
        ligne de calcul traverse la figure — et la planche ne le montre pas, parce
        qu'elle prend la DERNIÈRE image, où d'autres objets recouvrent la collision."""
        mob.move_to(P(0, y)).align_to(P(x0, 0), LEFT)
        if mob.get_right()[0] > xmax:
            mob.scale_to_fit_width(xmax - x0).align_to(P(x0, 0), LEFT)
        return mob

    def nombre(self, v):
        """Un nombre à la française. ⛔ `str(0.5)` donne « 0.5 », avec un POINT : à
        l'écran d'un cours de maths français c'est une faute, et la voix dit « zéro
        virgule cinq ». Le moins est le vrai − (U+2212), pas le trait d'union."""
        s = f"{v:g}" if isinstance(v, float) else str(v)
        return s.replace(".", ",").replace("-", "−")

    def insister(self, mob, k=1.25, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def sans_audit(self, mob):
        """Les nombres qu'on LIT (graduations, noms d'axes) : hors audit."""
        for f in mob.get_family():
            f._pas_audit = True
        return mob

    def lettres(self, mob):
        """UN NOMBRE QUE LA VOIX DIT EN TOUTES LETTRES ET QUE L'ÉCRAN ÉCRIT EN CHIFFRES.

        ⛔⛔ C'EST LA LIMITE LA PLUS IMPORTANTE DE CETTE SÉRIE, ET ELLE EST ASSUMÉE.
        `AUDIT=1` cherche chaque nombre affiché dans le TEXTE de la voix. Les voix de la
        série espace écrivent les valeurs en chiffres (« a pour coordonnées 1, 2, 3 »),
        donc l'audit y couvrait presque tout. Les voix de CETTE série les écrivent en
        toutes lettres (« f de 1 vaut moins 3 » s'y lit « f de un vaut moins trois ») :
        l'audit ne peut donc rien y reconnaître, et sans cette marque il crierait
        `AUDIT-ABSENT` sur chaque nombre de chaque écran — un instrument qui crie
        partout ne se lit plus.
        ⭐ Ce que l'on perd : le contrôle « un nombre est-il à l'écran sans être dit ».
        Ce que l'on garde en entier : `BORDS=1` (ce qui dépasse du cadre), la planche,
        et la passe maths, qui recalcule les nombres au lieu de les relire.
        ⭐ Ce qui le rendrait : une passe sur `VOIX-continuite-tvi.md` qui écrit les
        VALEURS en chiffres, comme la série espace — mécanique, à faire AVANT les WAV.
        Elle n'est pas faite : décision à Frédéric et au chef d'orchestre.
        ⚠️ `grep -c "self.lettres(" <script>` compte ce que l'audit ne voit pas.

        ⭐⭐ `AUDIT_TOUT=1` NEUTRALISE CETTE MARQUE, et c'est un outil de MESURE, pas un
        mode de rendu. Il sert à répondre à une seule question : « si la voix disait ce
        nombre, l'audit le couvrirait-il ? » On lance un dry run avec `AUDIT=1
        AUDIT_TOUT=1`, et la liste des `AUDIT-ABSENT` est exactement l'inventaire de ce
        que la passe « valeurs en chiffres » doit rattraper. ⛔ Ne jamais rendre une
        vidéo avec : l'audit crierait sur des nombres légitimement dits en lettres."""
        if os.environ.get("AUDIT_TOUT") == "1":
            return mob
        return self.sans_audit(mob)

    def echelle(self):
        return echelle_ceintures(self.ceinture).move_to(P(-0.6, 0))

    def croix(self, color="#dc2626", r=0.16, sw=6):
        return VGroup(Line(P(-r, -r), P(r, r)), Line(P(-r, r), P(r, -r))).set_stroke(color, sw)

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.45)
        self.add(m)
        self._margo = m
        return m

    def _marques(self):
        """⛔ `MotsCales._marques` fait `parent / self.fichier_marques` SANS vérifier
        qu'il y en a un : avec `fichier_marques = None` il lève un TypeError obscur
        (`WindowsPath / NoneType`), et c'est l'état NORMAL de cette série tant que les
        WAV n'existent pas. On rend {} — le repli vers l'estimation est annoncé par la
        bannière de `dire()`, il n'est pas silencieux.
        ⭐ Le jour où les marques arrivent, il suffit de poser `fichier_marques` dans
        l'épisode : rien d'autre ne change, et `au_mot` devient exact."""
        if self.fichier_marques is None:
            return {}
        return super()._marques()

    def dire(self, nom, dossier=None):
        if os.environ.get("BORDS") or os.environ.get("AUDIT"):
            print(f"ECRAN {nom} t={self.renderer.time:.2f}", flush=True)
        if not getattr(self, "_banniere_dite", False):
            self._banniere_dite = True
            if self._marques():
                print(f"MARQUES {self.nom_voix} : {len(self._marques())} clip(s) calés",
                      flush=True)
            else:
                print(f"⚠️ SANS MARQUES ({self.nom_voix}) — les au_mot sont ESTIMÉS au "
                      "prorata des caractères. La planche juge la mise en page, pas la "
                      "synchronisation.", flush=True)
        return super().dire(nom, dossier)

    # ── la boîte à dessin d'une série d'ANALYSE ─────────────────────────────

    def plan_axes(self, xr, yr, centre=(-3.5, 0.1), w=5.4, h=4.0, grad_x=(), grad_y=()):
        """Un repère du plan, posé dans la moitié gauche.

        ⛔ JAMAIS `include_numbers` : Manim écrirait « 0.5 » avec un POINT, et il
        graduerait tout l'axe. Les graduations utiles se posent à la main, avec la
        virgule, et elles sortent de l'audit : ce sont des nombres qu'on LIT, pas des
        nombres que la voix énonce.
        ⚠️ `xr` et `yr` sont (min, max, pas). Le pas ne sert qu'aux tirets."""
        ax = Axes(x_range=list(xr), y_range=list(yr), x_length=w, y_length=h, tips=False,
                  axis_config={"stroke_width": 2}).move_to(P(centre[0], centre[1]))
        # ⛔⛔ UNE GRADUATION S'ANCRE SUR L'AXE, PAS SUR LE ZÉRO — mesuré au dry run du
        # pilote, et c'est un défaut qui ne prévient pas. `ax.c2p(0, v)` EXTRAPOLE quand
        # l'intervalle des x ne contient pas 0 : avec x de 6 à 12,4, les étiquettes de
        # l'axe vertical partaient à x = −11,9, soit très au-delà du cadre (±7,1). Elles
        # ne s'affichaient nulle part, et rien ne le disait — c'est exactement « un SVG
        # coupe ce qui dépasse, sans un mot ». Seul `BORDS=1` l'a vu : 6 étiquettes sur
        # 3 écrans. On ancre donc sur la borne de l'intervalle quand 0 n'y est pas.
        ax_x = 0 if xr[0] <= 0 <= xr[1] else xr[0]
        ax_y = 0 if yr[0] <= 0 <= yr[1] else yr[0]
        etiq = VGroup()
        for v in grad_x:
            etiq.add(self.t(self.nombre(v), 22).next_to(ax.c2p(v, ax_y), DOWN, buff=0.14))
        for v in grad_y:
            etiq.add(self.t(self.nombre(v), 22).next_to(ax.c2p(ax_x, v), LEFT, buff=0.12))
        self.sans_audit(ax)
        self.sans_audit(etiq)
        return ax, etiq

    def courbe(self, ax, f, x0, x1, color=C_COURBE, sw=4):
        return ax.plot(f, x_range=[x0, x1], color=color, stroke_width=sw)

    def pt(self, ax, x, y, color=VERT_OK, r=0.085):
        return Dot(ax.c2p(x, y), color=color, radius=r)

    def pointilles(self, ax, x, y, color=GREY_B):
        """Les deux pointillés qui ramènent un point sur les axes : c'est ce qui rend
        une image LISIBLE sans graduer tout l'axe.

        ⛔⛔ MÊME DÉFAUT QUE LES GRADUATIONS, ET IL A ÉCHAPPÉ À LA PREMIÈRE CORRECTION.
        `ax.c2p(x, 0)` et `ax.c2p(0, y)` EXTRAPOLENT quand l'intervalle ne contient pas
        0 : sur l'écran du Maïdo (x de 6 à 12,4), les pointillés partaient à x = −11,4,
        hors cadre. ⚠️ J'avais corrigé `plan_axes` sans regarder les AUTRES fonctions
        qui appellent `c2p` avec un zéro — corriger un helper ne corrige pas sa famille.
        Trouvé par `BORDS=1`, et seulement parce qu'un dry run est repassé sur E2 : le
        défaut dormait depuis l'ajout des pointillés, qu'aucun contrôle n'avait suivi."""
        ax_x = 0 if ax.x_range[0] <= 0 <= ax.x_range[1] else ax.x_range[0]
        ax_y = 0 if ax.y_range[0] <= 0 <= ax.y_range[1] else ax.y_range[0]
        return VGroup(DashedLine(ax.c2p(x, ax_y), ax.c2p(x, y), color=color, stroke_width=2),
                      DashedLine(ax.c2p(ax_x, y), ax.c2p(x, y), color=color, stroke_width=2))

    def bande(self, ax, x0, x1, color=VERT_OK, opacite=0.14):
        """Un intervalle de l'axe des x, surligné. Sert à montrer le MORCEAU sur lequel
        on applique le théorème — c'est le geste central de l'épisode 5."""
        haut, bas = ax.y_range[1], ax.y_range[0]
        p = [ax.c2p(x0, bas), ax.c2p(x1, bas), ax.c2p(x1, haut), ax.c2p(x0, haut)]
        return Polygon(*p, stroke_width=0, fill_color=color, fill_opacity=opacite)

    def niveau(self, ax, k=0.0, color=JAUNE_TITRE):
        """La droite horizontale y = k : celle que la courbe doit couper."""
        return DashedLine(ax.c2p(ax.x_range[0], k), ax.c2p(ax.x_range[1], k),
                          color=color, stroke_width=3)

    def tab_variations(self, bornes, signes, valeurs, x0=-6.4, y=0.0, larg=5.6, h=2.3):
        """LE TABLEAU DE VARIATIONS, dessiné à la main.

        `bornes`  : les abscisses, en texte — ("0", "1", "2")
        `signes`  : le signe de f ′ sur chaque intervalle — ("−", "+")
        `valeurs` : (départ, arrivée) de f sur chaque intervalle — (("1","−1"), ("−1","3"))

        ⭐ Trois lignes : x, f ′(x), f(x). Les flèches sont de vraies flèches obliques :
        une flèche qui monte et une qui descend se lisent d'un coup d'œil, un « ↗ » en
        caractère ne se rend pas dans cette police.
        ⚠️ Les nombres du tableau sortent de l'audit : la voix dit « f de zéro vaut un »,
        l'écran écrit « 0 » et « 1 » dans deux cases différentes. C'est la même famille
        que les graduations.
        ⛔ Le tableau est RENDU adressable (`g.cases`, `g.fleches`) : un `play` sur un
        glyphe pris au hasard dans un groupe, c'est le défaut déjà payé sur `trip`."""
        n = len(bornes)
        if len(signes) != n - 1 or len(valeurs) != n - 1:
            raise ValueError("tab_variations : il faut n−1 signes et n−1 couples pour "
                             f"{n} bornes")
        pas = larg / (n - 1)
        xs = [x0 + 0.9 + i * pas for i in range(n)]
        y_x, y_s, y_f = y + h / 2, y, y - h / 2

        traits = VGroup(
            Line(P(x0, y_x - 0.42), P(xs[-1] + 0.6, y_x - 0.42), stroke_width=2, color=GREY_B),
            Line(P(x0, y_s - 0.52), P(xs[-1] + 0.6, y_s - 0.52), stroke_width=2, color=GREY_B),
            Line(P(x0 + 0.78, y_x + 0.42), P(x0 + 0.78, y_f - 0.55), stroke_width=2, color=GREY_B),
        )
        tetes = VGroup(self.t("x", 26).move_to(P(x0 + 0.38, y_x)),
                       self.t("f ′(x)", 24).move_to(P(x0 + 0.38, y_s)),
                       self.t("f(x)", 24).move_to(P(x0 + 0.38, y_f)))
        cases = VGroup(*[self.t(b, 26).move_to(P(xs[i], y_x)) for i, b in enumerate(bornes)])
        sg = VGroup(*[self.t(s, 30, VERT_OK if s == "+" else ROUGE_ERREUR)
                      .move_to(P((xs[i] + xs[i + 1]) / 2, y_s)) for i, s in enumerate(signes)])

        fleches, bouts = VGroup(), VGroup()
        for i, (a, b) in enumerate(valeurs):
            monte = signes[i] == "+"
            ya, yb = (y_f - 0.42, y_f + 0.42) if monte else (y_f + 0.42, y_f - 0.42)
            fleches.add(Arrow(P(xs[i] + 0.42, ya), P(xs[i + 1] - 0.42, yb),
                              buff=0, stroke_width=3, max_tip_length_to_length_ratio=0.12,
                              color=VERT_OK if monte else ROUGE_ERREUR))
            bouts.add(self.t(a, 24).move_to(P(xs[i] - 0.02, ya)))
            if i == len(valeurs) - 1:
                bouts.add(self.t(b, 24).move_to(P(xs[i + 1] + 0.02, yb)))

        g = VGroup(traits, tetes, cases, sg, fleches, bouts)
        self.sans_audit(g)
        g.cases, g.signes, g.fleches, g.bouts = cases, sg, fleches, bouts
        return g

    def deux_morceaux(self, ax, f1, f2, a, c, b, recolle=True):
        """Une fonction définie par deux morceaux, de part et d'autre de c.

        ⭐ Quand elle NE recolle pas, le saut doit se VOIR : un cercle vide au bout du
        premier morceau, un disque plein au départ du second, et le segment vertical en
        pointillés qui dit la taille du saut. Sans ces trois signes, une courbe en deux
        morceaux se lit comme une courbe continue mal tracée."""
        g1 = ax.plot(f1, x_range=[a, c], color=C_COURBE, stroke_width=4)
        g2 = ax.plot(f2, x_range=[c, b], color=C_COURBE, stroke_width=4)
        g = VGroup(g1, g2)
        g.m1, g.m2 = g1, g2
        if recolle:
            g.marque = VGroup(Dot(ax.c2p(c, f2(c)), color=VERT_OK, radius=0.09))
        else:
            vide = Circle(radius=0.09, color=C_SAUT, stroke_width=4).move_to(ax.c2p(c, f1(c)))
            plein = Dot(ax.c2p(c, f2(c)), color=C_SAUT, radius=0.09)
            saut = DashedLine(ax.c2p(c, f1(c)), ax.c2p(c, f2(c)), color=C_SAUT, stroke_width=3)
            g.marque = VGroup(saut, vide, plein)
        return g

    def marche(self, ax, bornes, hauteurs, color=C_SAUT):
        """Une fonction en escalier : des paliers, et des cercles aux ruptures."""
        g = VGroup()
        for i, h in enumerate(hauteurs):
            g.add(Line(ax.c2p(bornes[i], h), ax.c2p(bornes[i + 1], h),
                       color=color, stroke_width=5))
        return g

    # ── la question-pause (reprise telle quelle de espace_ecrans.py) ────────

    def carte_choix(self, lettre, corps, largeur=4.1, fs=32):
        rond = Circle(radius=0.25 * fs / 32, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
        l = Text(lettre, font_size=fs, color=WHITE, weight=BOLD).move_to(rond)
        c = corps if isinstance(corps, Mobject) else Text(corps, font_size=fs, color=WHITE)
        ligne = VGroup(VGroup(rond, l), c).arrange(RIGHT, buff=0.25)
        if ligne.width > largeur - 1.15:
            ligne.scale_to_fit_width(largeur - 1.15)
        cadre = RoundedRectangle(width=largeur, height=max(0.72, ligne.height + 0.28),
                                 corner_radius=0.14, stroke_color=BLEU_CALCUL, stroke_width=3,
                                 fill_color=FOND_CARTE, fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return VGroup(cadre, ligne)

    def q_tete(self, question, choix, largeur=4.1, xl=XL):
        """« Question ! », l'énoncé, les TROIS cartes, la pause.

        ⭐⭐ `largeur` et `xl` : une carte de 4,1 posée à x = 2,2 n'offre que 2,20 à son
        texte, et un choix de quatre lignes y tombe à 14,6 px QUELLE QUE SOIT la police
        demandée — c'est la réduction qui décide, pas la police. Le remède est la
        LARGEUR : `largeur=6.0, xl=0.6` offre 4,10, et le même choix tient à 26 px. La
        donnée de gauche doit alors s'arrêter avant x = 0,4.
        ⚠️ Le bas de `pause` doit rester au-dessus de −2,15, sinon il s'écrit sur la
        tête de Ti-Margo."""
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
        self.col(cartes, 0, xl)
        cartes.align_to(P(0, q.get_bottom()[1] - 0.3), UP)
        pause = self.col(self.t("Mets pause, et choisis !", 32, ORANGE_RETENUE),
                         cartes.get_bottom()[1] - 0.45, xl)
        if pause.width < 3.5:
            pause = VGroup(self.t("Mets pause,", 32, ORANGE_RETENUE),
                           self.t("et choisis !", 32, ORANGE_RETENUE))
            pause.arrange(DOWN, aligned_edge=LEFT, buff=0.08)
            pause.move_to(P(0, cartes.get_bottom()[1] - 0.2), aligned_edge=UP).align_to(P(xl, 0), LEFT)
        return tete, q, cartes, pause, rebours

    def choix2(self, l1, l2, fs=28):
        """Un choix en DEUX lignes : une phrase longue dans une carte de 4,1 tombe à
        ~10 px, illisible sur un téléphone."""
        return VGroup(self.t(l1, fs), self.t(l2, fs)).arrange(DOWN, aligned_edge=LEFT, buff=0.06)

    def choix3(self, l1, l2, l3, fs=28):
        """Un choix en TROIS lignes de 14 caractères au plus : le texte tient à ~20 px.
        ⚠️ Avec trois choix à trois lignes, la question ne doit pas dépasser DEUX
        lignes, sinon le bas des cartes descend sur Ti-Margo."""
        return VGroup(self.t(l1, fs), self.t(l2, fs), self.t(l3, fs)).arrange(
            DOWN, aligned_edge=LEFT, buff=0.06)

    def q_montrer_choix(self, cartes):
        """Les cartes paraissent quand la voix les dit, une par une."""
        voix = self._texte_voix
        deb = [voix.find(f"{L} : ") for L in "ABC"]
        for k, (c, L) in enumerate(zip(cartes, "ABC")):
            i = deb[k]
            if i < 0:
                raise ValueError(f"« {L} : » absent de la voix {self._cle_voix}")
            self.au_pos(i)
            self.play(FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.15), run_time=0.2)
            self.au_pos(i + 4)
            self.play(FadeIn(c[1][1], shift=RIGHT * 0.15), run_time=0.2)

    def t_pos(self, i):
        """L'instant où la voix atteint le caractère i. Avec les marques si elles sont
        là ; sinon au prorata des caractères, comme `Notion6e.au_mot`."""
        m = self._marques().get(getattr(self, "_cle_voix", None)) or []
        if m:
            return self._debut_voix + max([x[1] for x in m if x[0] <= i] or [0.0])
        if not self._duree_voix:
            return self.renderer.time
        return self._debut_voix + self._duree_voix * i / max(1, len(self._texte_voix))

    def au_pos(self, i):
        reste = self.t_pos(i) - self.renderer.time
        if reste < -0.3 and self._marques():
            print(f"RETARD {self._cle_voix} pos {i} : {-reste:.2f} s", flush=True)
        if reste > 0.03:
            self.wait(reste)

    def q_pause(self, pause, rebours, cle_q, t0, bonne):
        self.au_mot("Mets pause")
        self.play(FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        print(f"QUESTION {cle_q} t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f}) "
              f"reponse={bonne}", flush=True)

    def q_reponse(self, cartes, bonne, pause, rebours):
        """La carte gagnante : vert, les deux autres estompées, la coche, un battement.

        ⛔⛔ Le battement peut faire SORTIR la carte du cadre : `scale(1.12)` pousse le
        bord droit à cx + 1,12 × demi, soit 6,96 pour une carte de 6,0 centrée en 3,6 —
        au-delà de la marge de 3 % (6,68). On borne le facteur sur les deux bords, et
        s'il ne reste plus de place on ne bat pas.
        ⛔ Et `pause` DOIT être effacé ici : laissé en place, « Mets pause, et choisis ! »
        reste affiché par-dessus toute l'explication."""
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

    # ── les écrans communs ──────────────────────────────────────────────────

    def page_abonnement(self, voix="11-abonne"):
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        entraine = self.t("Entraîne-toi sur", 46, JAUNE_TITRE).move_to(P(0, 2.05))
        site = self.t("eleveai.fr", 62, BLEU_CALCUL).move_to(P(0, 1.0))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        abonne = self.t("Abonne-toi !", 44, VERT_OK).move_to(P(0, -0.6))
        poignee = self.t("@eleveai974", 48, VERT_OK).move_to(P(0, -1.6))
        self.sans_audit(poignee)
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), run_time=0.4)
        self.play(GrowFromCenter(poignee), run_time=0.4)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3))
        self.attendre_voix(marge=1.4)

    def page_finale(self, lignes, voix="10-finale", titre="Ce que tu as appris"):
        """Le récapitulatif. ⛔ Chaque nombre dit ici est ENSEIGNÉ : c'est le premier
        endroit où l'on relit."""
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.6)
        t = self.t(titre, 44, JAUNE_TITRE).to_edge(UP, buff=0.55)
        self.play(Write(t), run_time=0.6)
        bloc = VGroup(*[VGroup(self.pastille(i + 1), self.t(s, 30, larg=10.4)).arrange(RIGHT, buff=0.3)
                        for i, s in enumerate(lignes)])
        bloc.arrange(DOWN, aligned_edge=LEFT, buff=0.34).move_to(P(-0.35, -0.2))
        # ⚠️ La finale aussi écrit en chiffres ce que la voix dit en lettres : « f(x) = 0 »
        # contre « f de x égale zéro ». Trouvé par AUDIT sur le pilote — c'était le SEUL
        # nombre de l'épisode qui n'était pas déjà marqué, et l'audit l'a sorti. Preuve
        # que l'instrument fonctionne encore là où on ne l'a pas désarmé.
        self.lettres(bloc)
        for ligne in bloc:
            self.play(FadeIn(ligne, shift=RIGHT * 0.2), run_time=0.35)
        self.attendre_voix(marge=0.8)
