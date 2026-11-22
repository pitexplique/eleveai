# affine_probleme.py
# EleveAI — Maths 3e — série FONCTIONS AFFINES, épisode 08 : RÉSOUDRE UN PROBLÈME avec deux fonctions affines.
# Paysage 16:9, AVEC VOIX, ceinture VERTE.
# Métier : Manon, directrice de cinéma (tarif A : 9 € la place, f(x) = 9x ; tarif B : carte à 24 € puis 5 € la place,
# g(x) = 5x + 24 ; les deux droites se croisent en 6 séances).
# Écrans (clés de manim/voix/3e-affine-probleme.json) :
#   00-garde : page de garde, échelle des ceintures, deux droites qui se croisent, « Quel tarif choisir ? »
#   01-cinema : Manon, son cinéma, les deux tarifs, le client « lequel est le moins cher ? »
#   02-modeliser : x = nombre de séances, f(x) = 9x (linéaire), g(x) = 5x + 24 (affine)
#   03-comparer : le repère (f bleue, g orange) ; 4 séances : 36 € / 44 € (A gagne) ; 10 séances : 90 € / 74 € (B)
#   03q / 03r : QUESTION 1, tarif B pour 3 séances → A (39 €) ; piège B (27 €, le tarif A)
#   04-egalite : 9x = 5x + 24, 4x = 24, x = 6 ; le point de croisement (6 ; 54) marqué sur « se croisent »
#   05q / 05r : QUESTION 2, appli à 4 €/mois ou 10 € + 2 €/mois → B (5 mois), croisement (5 ; 20)
#   06-defi / 06b-correction : deux plombiers, f(x) = 30x + 40, g(x) = 50x : f(3) = 130, g(3) = 150 ; x = 2, 100 €
#   07-finale : ce que tu as appris (titre en haut et centré)
#   08-abonne : la fin commune (manim/fin_commune.py)
# Lettres justes : 03q → A, 05q → B.
# Code couleur : x bleu ; a orange ; b violet ; droite de f bleue, droite de g orange ; croisement jaune ;
# juste vert ; piège rouge.
# Contrôles ajoutés (AUDIT=1) : « CHEVAUCHE » = un texte touche un repère, une droite ou Ti-Margo
# (boîtes englobantes) ; « PETIT » = un texte sous 32 pt effectifs (hors graduations et figures).
# Voix : manim/voix/3e-affine-probleme.json (validée) ; marques : affine_probleme_marques.json.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/3e/affine_probleme.py AffineProbleme3e --media_dir manim/scripts/3e/media-affine-08-audit
# Rendu : PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/3e/affine_probleme.py AffineProbleme3e -o eleveai-maths-3e-affine-probleme --media_dir manim/scripts/3e/media-affine-08
# Sortie : manim/sorties/3e/maths/fonctions-affines/08-probleme/eleveai-maths-3e-affine-probleme.mp4

import os
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))
sys.path.insert(0, str(ICI.parent / "4e"))  # la série IDENTITÉS 4e et ses outils communs

from relatif_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from fin_commune import ecran_fin  # noqa: E402
from ident_developper import X, pastille  # noqa: E402
from ident_factoriser import IdentFactoriser3e  # noqa: E402
from affine_expression import Repere  # noqa: E402
from affine_ordonnee_origine import fleche_lecture  # noqa: E402

PAROLE["0"] = "0"
PAROLE["€"] = "euros"

COUL_A = OPERATION        # a : orange
COUL_B = "#a78bfa"        # b : violet
DROITE_F = BLEU_CALCUL    # la droite de f
DROITE_G = OPERATION      # la droite de g
CROIX = JAUNE_TITRE       # le point de croisement
ROUGE_CINE = "#b91c1c"


# ── couleurs ────────────────────────────────────────────────────────────────
def colf(e):
    """« f(x) = 5x + 24 » : après le =, un nombre suivi de x orange (a), un nombre seul violet (b)."""
    at = e.atomes
    i_eg = next((i for i, a in enumerate(at) if a.original_text == "="), None)
    if i_eg is None:
        return e
    for i in range(i_eg + 1, len(at)):
        t = at[i].original_text
        if t[0].isdigit():
            ax = i + 1 < len(at) and at[i + 1].original_text == "x"
            at[i].set_color(COUL_A if ax else COUL_B)
            if at[i - 1].original_text == "−":
                at[i - 1].set_color(COUL_A if ax else COUL_B)
    return e


def teinte(e, couleur, *idx):
    for i in idx:
        e.atomes[i].set_color(couleur)
    return e


# ── dessins ─────────────────────────────────────────────────────────────────
def ticket(couleur, lettre="", w=1.25, h=0.66, fs=36, texte=None):
    """Un ticket de cinéma : la bande colorée, la perforation, une lettre (ou un texte) au milieu."""
    corps = RoundedRectangle(width=w, height=h, corner_radius=0.1, fill_color=couleur, fill_opacity=0.9,
                             stroke_color=WHITE, stroke_width=2)
    perf = DashedLine(corps.get_top() + RIGHT * w * 0.22, corps.get_bottom() + RIGHT * w * 0.22,
                      dash_length=0.06, color=WHITE, stroke_width=2)
    g = VGroup(corps, perf)
    t = T(texte if texte is not None else lettre, fs, WHITE, audit=False, gras=True)
    t.move_to(corps.get_center() + LEFT * w * 0.1)
    if t.width > w * 0.62:
        t.scale_to_fit_width(w * 0.62)
    g.add(t)
    g.texte = t
    return g


def carte_b(w=1.9, h=1.15, prix="24 €"):
    """La carte d'abonnement du tarif B (orange) : « CARTE » et son prix."""
    fond = RoundedRectangle(width=w, height=h, corner_radius=0.14, fill_color="#7c2d12", fill_opacity=1,
                            stroke_color=DROITE_G, stroke_width=5)
    bande = Rectangle(width=w - 0.1, height=0.18, fill_color=DROITE_G, fill_opacity=1, stroke_width=0)
    bande.move_to(fond.get_top() + DOWN * 0.3)
    # 3e relecture -ql : « 24 € » mordait sur le bord bas de la carte : le nom remonte
    nom = T("CARTE", 32, WHITE, audit=False, gras=True).move_to(fond.get_center() + UP * 0.08)
    p = T(prix, 32, JAUNE_TITRE, audit=False).next_to(nom, DOWN, buff=0.05)
    g = VGroup(fond, bande, nom, p)
    return g


def cinema(w=3.2, h=1.8):
    """La salle : l'écran lumineux, les rideaux rouges, deux rangées de fauteuils."""
    ecran = Rectangle(width=w * 0.72, height=h * 0.42, fill_color="#e0f2fe", fill_opacity=1, stroke_color="#7dd3fc",
                      stroke_width=4).move_to(P(0, h * 0.25))
    halo = Rectangle(width=w * 0.8, height=h * 0.5, fill_color="#38bdf8", fill_opacity=0.18, stroke_width=0)
    halo.move_to(ecran)
    rideaux = VGroup(*[Polygon(P(sx * w * 0.5, h * 0.5), P(sx * w * 0.34, h * 0.5), P(sx * w * 0.4, -h * 0.05),
                               P(sx * w * 0.5, -h * 0.1), fill_color=ROUGE_CINE, fill_opacity=1, stroke_width=0)
                       for sx in (-1, 1)])
    sieges = VGroup()
    for r, y in enumerate((-h * 0.22, -h * 0.42)):
        n = 6 if r == 0 else 7
        for i in range(n):
            x = (i - (n - 1) / 2) * w * 0.13
            sieges.add(RoundedRectangle(width=w * 0.1, height=h * 0.14, corner_radius=0.04, fill_color="#dc2626",
                                        fill_opacity=1, stroke_color="#7f1d1d", stroke_width=2).move_to(P(x, y)))
    g = VGroup(halo, ecran, rideaux, sieges)
    g.ecran = ecran
    return g


def manon(s=0.7, fs=34):
    """Manon, directrice de cinéma : veste violette, un clap à la main."""
    m = Metier(["Manon", "directrice", "de cinéma"], fs=fs, peau="#8d5524", tenue="#6d28d9", cheveux="#1f1308",
               longs=True, s=s)
    p = m.perso
    clap = VGroup(Rectangle(width=0.62, height=0.42, fill_color="#111827", fill_opacity=1, stroke_color=WHITE,
                            stroke_width=2),
                  Polygon(P(-0.31, 0.21), P(0.31, 0.21), P(0.31, 0.36), P(-0.31, 0.36), fill_color=WHITE,
                          fill_opacity=1, stroke_width=0))
    for k in range(3):
        clap.add(Line(P(-0.22 + k * 0.2, 0.21), P(-0.12 + k * 0.2, 0.36), color="#111827", stroke_width=4))
    clap.scale(s).next_to(p.corps, RIGHT, buff=0.02).shift(UP * 0.3 * s)
    p.add(clap)
    return m


def client(s=0.5):
    p = personne(peau="#f1c27d", tenue="#0f766e", cheveux="#78350f", s=s)
    bulle = Circle(radius=0.3, fill_color="#0b1220", fill_opacity=1, stroke_color=JAUNE_TITRE, stroke_width=4)
    bulle.next_to(p, UP, buff=0.12).shift(RIGHT * 0.25)
    q = T("?", 40, JAUNE_TITRE, audit=False, gras=True).move_to(bulle)
    g = VGroup(p, bulle, q)
    return g


def plombier(tenue, s=0.42):
    """Un plombier : salopette de couleur, casquette, une clé à molette."""
    p = personne(peau="#a0522d", tenue=tenue, cheveux="#111827", s=s)
    cas = RoundedRectangle(width=0.95 * s, height=0.22 * s, corner_radius=0.08 * s, fill_color=tenue, fill_opacity=1,
                           stroke_width=0).move_to(p.tete.get_top() + DOWN * 0.05 * s)
    cle = VGroup(Line(P(0, 0), P(0, 0.75), color="#cbd5e1", stroke_width=6),
                 Annulus(inner_radius=0.07, outer_radius=0.16, fill_color="#cbd5e1", fill_opacity=1,
                         stroke_width=0).move_to(P(0, 0.82)))
    cle.scale(s * 1.4).next_to(p.corps, RIGHT, buff=0.02).shift(UP * 0.2 * s)
    p.add(cas, cle)
    return p


def telephone(couleur, lettre, h=1.7):
    """Un téléphone avec une appli de musique (une note) de la couleur de sa droite."""
    w = h * 0.55
    boitier = RoundedRectangle(width=w, height=h, corner_radius=0.14, fill_color="#111827", fill_opacity=1,
                               stroke_color=couleur, stroke_width=5)
    ecr = RoundedRectangle(width=w - 0.16, height=h - 0.36, corner_radius=0.08, fill_color="#1e293b",
                           fill_opacity=1, stroke_width=0).move_to(boitier)
    note = VGroup(Ellipse(width=0.26, height=0.2, fill_color=couleur, fill_opacity=1, stroke_width=0)
                  .move_to(P(-0.08, -0.22)),
                  Line(P(0.04, -0.2), P(0.04, 0.3), color=couleur, stroke_width=5),
                  Line(P(0.04, 0.3), P(0.22, 0.18), color=couleur, stroke_width=5)).move_to(ecr.get_center() + UP * 0.1)
    nom = T(lettre, 34, WHITE, audit=False, gras=True).move_to(ecr.get_bottom() + UP * 0.27)
    return VGroup(boitier, ecr, note, nom)


def pas(s, couleur, r=0.3):
    """Une pastille numérotée (« 1 », « 2 ») à 36 pt."""
    rond = Circle(radius=r, fill_color="#0b1220", fill_opacity=1, stroke_color=couleur, stroke_width=4)
    return VGroup(rond, T(s, 36, couleur, audit=False, gras=True).move_to(rond))


def etiq(s, couleur, fs=32):
    """Le nom d'une droite (« f », « g ») : figure, sans audit."""
    t = T(s, fs, couleur, audit=False, gras=True)
    t._figure = True
    return t


# ── le contrôle des boîtes englobantes et des tailles (AUDIT=1) ──────────────
class _Controle:
    """CHEVAUCHE : un texte (hors figure) touche une zone déclarée (repère, droites) ou Ti-Margo ;
    PETIT : un texte hors figure sous 32 pt effectifs."""

    def zone(self, *mobs):
        self._zones = getattr(self, "_zones", []) + list(mobs)
        return mobs[0] if len(mobs) == 1 else mobs

    def play(self, *a, **k):
        super().play(*a, **k)
        if os.environ.get("AUDIT") == "1":
            self._controle()

    @staticmethod
    def _boite(m):
        return m.get_left()[0], m.get_right()[0], m.get_bottom()[1], m.get_top()[1]

    def _controle(self):
        vus = getattr(self, "_ctrl_vus", set())
        fam = {}
        for m in self.mobjects:
            for f in m.get_family():
                fam[id(f)] = f
        zones = [z for z in getattr(self, "_zones", []) if id(z) in fam]
        dans_zone = {id(f) for z in zones for f in z.get_family()}
        masc = [m for m in self.mobjects if type(m).__name__.startswith("Mascotte")]
        exclus = set(dans_zone)
        for m in self.mobjects:
            if type(m).__name__.startswith("Mascotte") or type(m).__name__ == "CompteARebours" or \
                    any(type(f).__name__ == "CompteARebours" for f in m.get_family()):
                exclus.update(id(f) for f in m.get_family())
        cle = getattr(self, "_cle_voix", "?")
        for m in self.mobjects:
            for t in m.get_family():
                if not isinstance(t, Text) or id(t) in exclus or not getattr(t, "original_text", "").strip():
                    continue
                if t.get_fill_opacity() < 0.05 or getattr(t, "_figure", False):
                    continue
                g, d, b, h = self._boite(t)
                for z in zones + masc:
                    zg, zd, zb, zh = self._boite(z)
                    if g < zd - 0.02 and d > zg + 0.02 and b < zh - 0.02 and h > zb + 0.02:
                        c = ("C", cle, t.original_text, type(z).__name__, id(z))
                        if c not in vus:
                            vus.add(c)
                            print(f"CHEVAUCHE {cle} « {t.original_text} » sur {type(z).__name__} "
                                  f"x[{g:.2f}, {d:.2f}] y[{b:.2f}, {h:.2f}] / x[{zg:.2f}, {zd:.2f}] y[{zb:.2f}, {zh:.2f}]",
                                  flush=True)
                if t.font_size < 31.5 and not cle.endswith("abonne"):  # la fin commune n'est pas réécrite
                    c = ("P", cle, t.original_text, round(t.font_size))
                    if c not in vus:
                        vus.add(c)
                        print(f"PETIT {cle} « {t.original_text} » {t.font_size:.1f} pt", flush=True)
        self._ctrl_vus = vus

    def clear(self):
        self._zones = []
        return super().clear()


def lecture_image(R, x, y, c="#e2e8f0"):
    """Lire une image : axe horizontal → droite → axe vertical (pointillés fléchés)."""
    return VGroup(fleche_lecture(R.p(x, 0), R.p(x, y), c), fleche_lecture(R.p(x, y), R.p(0, y), c)).set_z_index(2)


class AffineProbleme3e(_Controle, IdentFactoriser3e):
    nom_voix = "3e-affine-probleme"
    fichier_marques = "affine_probleme_marques.json"
    identite = "Maths 3e — EleveAI"
    ceinture = "verte"

    # ── outils ──────────────────────────────────────────────────────────────
    def ld(self, s, y, fs=46, c=WHITE, x0=0.25, maxw=None, lettres="x"):
        """Celui d'ident_factoriser ; par défaut, la ligne a toute la place jusqu'à x = 6,55."""
        return super().ld(s, y, fs, c, x0=x0, maxw=maxw or 6.55 - x0, lettres=lettres)

    def lf(self, s, y, fs=46, c=WHITE, x0=-1.9, maxw=None, f=False):
        e = self.ld(s, y, fs, c, x0=x0, maxw=maxw)
        return colf(e) if f else e

    @staticmethod
    def _fs(m):
        """La taille effective du premier texte de m."""
        for f in m.get_family():
            if isinstance(f, Text) and getattr(f, "original_text", "").strip():
                return f.font_size
        return 36.0

    def _disposer_q(self, question, choix, phrase):
        """Celui d'ident_factoriser, puis (2e relecture -ql du 22/11, modèle affine_coeff_directeur) :
        énoncé à 39 pt, cartes raccourcies à leur contenu (42 pt), « Mets pause, et choisis ! » en deux
        lignes à 35 pt À DROITE des cartes, à mi-hauteur, loin de Ti-Margo."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        if len(q.submobjects):
            q.scale(39 / self._fs(q), about_edge=UL)
            q.next_to(tete, DOWN, buff=0.25).align_to(P(self.XL, 0), LEFT)
        for c in cartes:
            cadre, dedans = c[0], c[1]
            dedans.scale(42 / self._fs(dedans[1]), about_point=dedans.get_left())
            cadre.stretch_to_fit_height(dedans.height + 0.26)
            dedans.set_y(cadre.get_y())
        # la place de la coche (≥ 0,95 à droite du contenu : sinon le contenu est rétréci à la réponse)
        larg = max(c[1].get_right()[0] - c[0].get_left()[0] for c in cartes) + 0.97
        for c in cartes:
            c[0].stretch_to_fit_width(larg, about_edge=LEFT)
        cartes.arrange(DOWN, buff=0.16, aligned_edge=LEFT)
        cartes.next_to(q if len(q.submobjects) else tete, DOWN, buff=0.3).align_to(P(self.XL, 0), LEFT)
        neuf = VGroup(T("Mets pause,", 34, ORANGE_RETENUE, audit=False),
                      T("et choisis !", 34, ORANGE_RETENUE, audit=False)).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        for f in neuf.get_family():
            f.sans_synchro = True
        neuf.next_to(cartes, RIGHT, buff=0.28).set_y(cartes.get_y())
        if os.environ.get("AUDIT") == "1":
            masc = [m for m in self.mobjects if type(m).__name__.startswith("Mascotte")]
            mb = (f"Ti-Margo x[{masc[0].get_left()[0]:.2f}, {masc[0].get_right()[0]:.2f}] "
                  f"y[{masc[0].get_bottom()[1]:.2f}, {masc[0].get_top()[1]:.2f}]") if masc else "Ti-Margo ?"
            print(f"MISE-EN-PAGE {self._cle_voix} q {q.get_top()[1]:.2f}/{q.get_bottom()[1]:.2f} "
                  f"{self._fs(q) if len(q.submobjects) else 0:.0f} pt ; cartes x[{cartes.get_left()[0]:.2f}, "
                  f"{cartes.get_right()[0]:.2f}] y[{cartes.get_bottom()[1]:.2f}, {cartes.get_top()[1]:.2f}] "
                  f"{self._fs(cartes[0][1][1]):.0f} pt ; pause x[{neuf.get_left()[0]:.2f}, {neuf.get_right()[0]:.2f}] "
                  f"y[{neuf.get_bottom()[1]:.2f}, {neuf.get_top()[1]:.2f}] {self._fs(neuf):.0f} pt ; {mb}", flush=True)
        self._tete_q = tete
        self._q_poses = []
        return tete, q, cartes, neuf, rebours, ph

    def monter_reponse(self, bonne):
        """La question et les mauvaises cartes s'effacent, la bonne carte monte sous « Question ! » :
        la réponse à 36 pt effectifs (2e relecture -ql : elle sortait à ~28 pt), en lignes courtes ;
        elle peut descendre bas tant qu'elle reste à gauche de Ti-Margo."""
        cartes, ph = self.cartes_q, self.ph_q
        b = cartes[bonne]
        ok = self.mobjects[-1]  # la coche, posée juste avant autres_r
        haut_b = self._tete_q.get_bottom()[1] - 0.3
        d = UP * (haut_b - b.get_top()[1])
        anims = [FadeOut(cartes[j]) for j in range(3) if j != bonne]
        anims += [FadeOut(m) for m in [self.q_q, *self._q_poses] if len(m.get_family()) > 1 or m.has_points()]
        anims.append(b.animate.shift(d))
        if ok is not b and ok not in b.get_family():
            anims.append(ok.animate.shift(d))
        self.play(*anims, run_time=0.25)
        haut = b.get_bottom()[1] - 0.35
        ph.scale(36 / self._fs(ph[0]))
        ph.arrange(DOWN, aligned_edge=LEFT, buff=0.16)
        bas = -3.4 if self.XL + ph.width < 5.1 else -1.6
        k = min(1.0, (6.3 - self.XL) / ph.width, (haut - bas) / ph.height)
        ph.scale(k).next_to(P(0, haut), DOWN, buff=0).align_to(P(self.XL, 0), LEFT)
        if os.environ.get("AUDIT") == "1":
            print(f"TAILLE-REPONSE {self._cle_voix} {self._fs(ph[0]):.1f} pt, x[{ph.get_left()[0]:.2f}, "
                  f"{ph.get_right()[0]:.2f}] y[{ph.get_bottom()[1]:.2f}, {ph.get_top()[1]:.2f}]", flush=True)

    def ligne_qi(self, s, phrase, gestes=None):
        """Dans avant_q : la PREMIÈRE ligne restante de la question devient une expression posée au mot."""
        ref = self.q_q[0]
        e = X(s, 34)
        e.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
        self.q_q.remove(ref)
        self._q_poses.append(e)
        return self.poser_gestes(e, phrase, gestes or {}, echelle=1.2, rt=0.2)

    def ph(self, i, s, phrase, gestes=None, premier=False, couleur=None, f=False):
        """La ligne i de la réponse (verte, 36 pt et plus), posée au mot."""
        ref = self.ph_q[i]
        e = X(s, 30, couleur or VERT_OK)
        if f:
            colf(e)
        e.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
        sauf = []
        if premier:
            self.play(FadeIn(e.atomes[0]), run_time=0.08)
            sauf = [e.atomes[0]]
        return self.poser_gestes(e, phrase, gestes or {}, rt=0.16, sauf=sauf)

    def repere_cine(self):
        """Le repère séances / euros des écrans 03 et 04 (droites coupées sous la dernière graduation)."""
        R = Repere(P(-5.75, -2.55), 0.36, 0.054, (0, 11), (0, 100), xlab=(2, 4, 6, 8, 10), ylab=(20, 40, 60, 80, 100),
                   xticks=range(1, 12), nom_x="séances", nom_y="euros")
        R.nx.next_to(R.ax.get_end(), UP, buff=0.12).align_to(R.ax.get_end(), RIGHT)
        df = R.droite(9, 0, 0, 11, couleur=DROITE_F)
        dg = R.droite(5, 24, 0, 11, couleur=DROITE_G)
        lf_ = etiq("f", DROITE_F).next_to(R.p(11, 99), RIGHT, buff=0.12)
        lg_ = etiq("g", DROITE_G).next_to(R.p(11, 79), RIGHT, buff=0.12)
        return R, df, dg, lf_, lg_

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Résoudre un problème", self.identite, self.ceinture, y_ech=-2.75)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.zone(ident, ech)
        self.au("Résoudre", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        R = Repere(P(-6.0, -1.75), 0.55, 0.55, (0, 6), (0, 6), nom_x="séances", nom_y="prix", grille=False, zero=False)
        # 2e relecture -ql : « séances » (sous l'axe) mordait sur l'échelle des ceintures : au-dessus du bout de l'axe
        R.nx.next_to(R.ax.get_end(), UP, buff=0.12).align_to(R.ax.get_end(), RIGHT)
        df = R.droite(1.0, 0, 0, 5.6, couleur=DROITE_F)
        dg = R.droite(0.45, 1.5, 0, 5.6, couleur=DROITE_G)
        xc = 1.5 / 0.55
        pt = Dot(R.p(xc, xc), radius=0.13, color=CROIX).set_z_index(6)
        self.zone(R, df, dg)
        self.au("fonction affine", FadeIn(R), Create(df), Create(dg), rt=0.6)
        l1 = self.ld("Quel tarif choisir ?", 0.85, 56, JAUNE_TITRE, x0=-1.6, maxw=8.0)
        ta = ticket(DROITE_F, "A", 1.6, 0.85, 44).move_to(P(-0.3, -0.55))
        tb = ticket(DROITE_G, "B", 1.6, 0.85, 44).move_to(P(1.9, -0.55))
        self.poser_gestes(l1, "Quel tarif choisir ?",
                          {1: lambda: [FadeIn(ta, shift=UP * 0.2), FadeIn(tb, shift=UP * 0.2)],
                           2: lambda: [GrowFromCenter(pt)]})
        self.play(Flash(pt, color=CROIX, line_length=0.25), run_time=0.5)
        self.insister(l1, 1.06, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : Manon et ses deux tarifs ───────────────────────────────────────
    def ecran_cinema(self):
        self.ecran("01-cinema")
        # 2e relecture -ql : Manon et son nom plus grands
        m = manon(1.0, 38)
        salle = cinema(3.6, 2.0).move_to(P(-4.6, -2.35))
        m.perso.move_to(P(-5.3, 0)).align_to(P(0, salle.get_top()[1] + 0.3), DOWN)
        m.nom.next_to(m.perso, UP, buff=0.15).set_x(-5.05)
        cl = client(0.62).align_to(m.perso, DOWN).set_x(-3.1)
        if os.environ.get("AUDIT") == "1":
            for nom_, o_ in (("perso", m.perso), ("nom", m.nom), ("salle", salle), ("client", cl)):
                print(f"MISE-EN-PAGE 01-cinema {nom_} x[{o_.get_left()[0]:.2f}, {o_.get_right()[0]:.2f}] "
                      f"y[{o_.get_bottom()[1]:.2f}, {o_.get_top()[1]:.2f}]", flush=True)
        x0 = -1.9
        l1 = self.ld("Manon dirige un cinéma.", 2.85, 46, x0=x0)
        self.poser_gestes(l1, "Manon dirige un cinéma.",
                          {0: lambda: [FadeIn(m.perso, shift=UP * 0.3), FadeIn(m.nom[0], shift=UP * 0.1)],
                           2: lambda: [FadeIn(m.nom[1], shift=UP * 0.1), FadeIn(m.nom[2], shift=UP * 0.1)],
                           3: lambda: [FadeIn(salle, shift=UP * 0.2)]})
        self.dit(self.ld("Elle propose deux tarifs.", 2.05, 40, CIEL, x0=x0), "Elle propose deux tarifs.")
        l2 = self.ld("Tarif A : 9 € la place.", 1.1, 46, x0=x0)
        teinte(l2, DROITE_F, 0, 1)
        self.dit(l2, "Tarif A : 9 euros la place.")
        l3 = self.ld("Tarif B : une carte à 24 €,", 0.3, 46, x0=x0)
        teinte(l3, DROITE_G, 0, 1)
        self.dit(l3, "Tarif B : une carte à 24 euros,")
        l4 = self.ld("puis 5 € la place.", -0.45, 46, x0=x0 + 1.6)
        self.dit(l4, "puis 5 euros la place.")
        self.au("Un client", FadeIn(cl, shift=LEFT * 0.3), rt=0.35)
        l5 = self.ld("Lequel est le moins cher ?", -1.6, 42, JAUNE_TITRE, x0=x0)
        self.dit(l5, "lequel est le moins cher ?")
        self.play(Indicate(cl[2], color=JAUNE_TITRE, scale_factor=1.4), run_time=0.4)
        self.insister(l5, 1.05, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 : on nomme x, on écrit les deux fonctions ────────────────────────
    def ecran_modeliser(self):
        self.ecran("02-modeliser")
        tks = VGroup(*[ticket("#475569", "", 0.8, 0.46) for _ in range(4)]).arrange(RIGHT, buff=0.14)
        tks.move_to(P(-4.55, 2.75))
        nx = X("x séances", 40).next_to(tks, DOWN, buff=0.25)
        R = Repere(P(-6.1, -2.95), 0.55, 0.42, (0, 6), (0, 6.6), nom_x="x", nom_y="prix", grille=False, zero=False)
        df = R.droite(1.0, 0, 0, 6, couleur=DROITE_F)
        dg = R.droite(0.55, 2.5, 0, 6, couleur=DROITE_G)
        o = Dot(R.p(0, 0), radius=0.11, color=DROITE_F).set_z_index(6)
        pb = Dot(R.p(0, 2.5), radius=0.12, color=COUL_B).set_z_index(6)
        ef = etiq("f", DROITE_F).next_to(R.p(6, 6), LEFT, buff=0.12)
        eg = etiq("g", DROITE_G).next_to(R.p(6, 5.8), DOWN, buff=0.12)
        self.zone(R, df, dg, ef, eg)
        x0 = -1.9
        l1 = self.ld("On appelle x", 2.85, 48, x0=x0)
        self.dit(l1, "On appelle x")
        l2 = self.ld("le nombre de séances.", 2.15, 46, x0=x0)
        self.poser_gestes(l2, "le nombre de séances.",
                          {3: lambda: [LaggedStart(*[FadeIn(t, shift=DOWN * 0.15) for t in tks], lag_ratio=0.15),
                                       FadeIn(nx, shift=UP * 0.1)]})
        self.play(FadeIn(R), run_time=0.3)
        e1 = self.lf("Tarif A : f(x) = 9x", 1.15, 52, x0=x0, f=True)
        teinte(e1, DROITE_F, 0, 1)
        self.dit(e1, "Avec le tarif A, on paie f de x égale 9 x.")
        e2 = self.lf("Tarif B : g(x) = 5x + 24", 0.25, 50, x0=x0, f=True)
        teinte(e2, DROITE_G, 0, 1)
        self.dit(e2, "Avec le tarif B, on paie g de x égale 5 x plus 24.")
        l3 = self.ld("f est linéaire,", -0.85, 46, DROITE_F, x0=x0, lettres="")
        self.poser_gestes(l3, "f est linéaire,", {2: lambda: [Create(df), FadeIn(ef), GrowFromCenter(o)]}, rt=0.3)
        l4 = self.ld("g est affine.", -1.6, 46, DROITE_G, x0=x0, lettres="")
        self.poser_gestes(l4, "g est affine.", {2: lambda: [Create(dg), FadeIn(eg), GrowFromCenter(pb)]}, rt=0.3)
        self.play(Indicate(pb, color=COUL_B, scale_factor=1.8), run_time=0.4)
        self.attendre_voix(marge=0.8)

    # ── 03 : on compare (le repère) ─────────────────────────────────────────
    def ecran_comparer(self):
        self.ecran("03-comparer")
        R, df, dg, ef, eg = self.repere_cine()
        self.zone(R, df, dg, ef, eg)
        x0, fs = -0.9, 44
        self.au("On compare", FadeIn(R), Create(df), Create(dg), FadeIn(ef), FadeIn(eg), rt=0.6)
        p4f, p4g = R.point(4, 36, DROITE_F, 0.11), R.point(4, 44, DROITE_G, 0.11)
        l4f, l4g = lecture_image(R, 4, 36), lecture_image(R, 4, 44)
        r1 = self.ld("Pour 4 séances :", 2.9, fs, x0=x0)
        teinte(r1, INCONNUE, 1)
        self.dit(r1, "Pour 4 séances :")
        r2 = self.lf("f(4) = 36 €", 2.15, fs, x0=x0 + 0.4, f=True)
        teinte(r2, INCONNUE, 2)
        teinte(r2, DROITE_F, 0)
        self.poser_gestes(r2, "f de 4 égale 36 euros,", {5: lambda: [Create(l4f), GrowFromCenter(p4f)]})
        r3 = self.lf("g(4) = 44 €", 1.45, fs, x0=x0 + 0.4, f=True)
        teinte(r3, INCONNUE, 2)
        teinte(r3, DROITE_G, 0)
        self.poser_gestes(r3, "g de 4 égale 44 euros.", {5: lambda: [Create(l4g), GrowFromCenter(p4g)]})
        r4 = self.ld("Le tarif A gagne.", 0.7, fs, VERT_OK, x0=x0)
        k1 = self.coche(VERT_OK, 0.24).next_to(r4, RIGHT, buff=0.3)
        self.poser_gestes(r4, "Le tarif A gagne.", {2: lambda: [Indicate(p4f, color=VERT_OK, scale_factor=2)]})
        self.play(Create(k1), run_time=0.25)
        self.play(FadeOut(VGroup(l4f, l4g)), run_time=0.2)
        p10f, p10g = R.point(10, 90, DROITE_F, 0.11), R.point(10, 74, DROITE_G, 0.11)
        l10f, l10g = lecture_image(R, 10, 90), lecture_image(R, 10, 74)
        r5 = self.ld("Pour 10 séances :", -0.2, fs, x0=x0)
        teinte(r5, INCONNUE, 1)
        self.dit(r5, "Pour 10 séances :")
        r6 = self.lf("f(10) = 90 €", -0.95, fs, x0=x0 + 0.4, f=True)
        teinte(r6, INCONNUE, 2)
        teinte(r6, DROITE_F, 0)
        self.poser_gestes(r6, "f de 10 égale 90 euros,", {5: lambda: [Create(l10f), GrowFromCenter(p10f)]})
        r7 = self.lf("g(10) = 74 €", -1.65, fs, x0=x0 + 0.4, f=True)
        teinte(r7, INCONNUE, 2)
        teinte(r7, DROITE_G, 0)
        self.poser_gestes(r7, "g de 10 égale 74 euros.", {5: lambda: [Create(l10g), GrowFromCenter(p10g)]})
        r8 = self.ld("C'est le tarif B !", -2.45, fs, VERT_OK, x0=x0)
        k2 = self.coche(VERT_OK, 0.24).next_to(r8, RIGHT, buff=0.3)
        self.poser_gestes(r8, "c'est le tarif B !", {4: lambda: [Indicate(p10g, color=VERT_OK, scale_factor=2)]})
        self.play(Create(k2), run_time=0.25)
        self.attendre_voix(marge=0.8)

    # ── 04 : quand les prix sont égaux : l'équation, le croisement ──────────
    def ecran_egalite(self):
        self.ecran("04-egalite")
        R, df, dg, ef, eg = self.repere_cine()
        self.zone(R, df, dg, ef, eg)
        self.add(R, df, dg, ef, eg)
        x0, fs = -0.9, 42
        y = [2.95, 2.38, 1.81, 1.2, -0.1, -0.82, -1.5, -2.35]  # 2e relecture -ql : « On enlève 5x : » a sa ligne
        y2 = [2.95, 2.3, 1.65, 0.95, 0.2, -0.55, -1.3]  # le graphique, après l'équation
        q1 = self.ld("À partir de combien", y[0], fs, x0=x0)
        self.dit(q1, "À partir de combien")
        q2 = self.ld("de séances le tarif B", y[1], fs, x0=x0)
        teinte(q2, DROITE_G, 3, 4)
        self.dit(q2, "de séances le tarif B")
        q3 = self.ld("devient-il meilleur ?", y[2], fs, x0=x0)
        self.dit(q3, "devient-il meilleur ?")
        q4 = self.ld("Les deux prix sont égaux.", y[3], 40, JAUNE_TITRE, x0=x0)
        self.dit(q4, "les deux prix sont égaux.")
        e1 = X("9x = 5x + 24", 54).move_to(P(0, y[4] + 0.45)).align_to(P(x0 + 0.5, 0), LEFT)
        teinte(e1, DROITE_F, 0, 1)
        teinte(e1, DROITE_G, 3, 4, 5, 6)
        self.dire_eq(e1, "9 x égale 5 x plus 24.", echelle=1.15)
        op = self.ld("On enlève 5x :", y[5] + 0.3, 38, OPERATION, x0=x0 + 0.5)
        self.dit(op, "On enlève 5 x :")
        e2 = X("4x = 24", 54)
        e2.shift(RIGHT * (e1.egal.get_x() - e2.egal.get_x())).set_y(y[6] + 0.1)
        self.dire_eq(e2, "4 x égale 24.", echelle=1.15)
        e3 = X("x = 6", 58, VERT_OK)
        e3.atomes[0].set_color(INCONNUE)
        e3.shift(RIGHT * (e1.egal.get_x() - e3.egal.get_x())).set_y(y[7])
        self.dire_eq(e3, "Donc x vaut 6.", echelle=1.15)
        cad = self.cadre_ok(e3, 0.12)
        self.play(Create(cad), run_time=0.25)
        if os.environ.get("AUDIT") == "1":
            for nom_, o_ in (("eq", e1), ("op", op), ("4x", e2), ("cadre", cad)):
                print(f"MISE-EN-PAGE 04 {nom_} y[{o_.get_bottom()[1]:.2f}, {o_.get_top()[1]:.2f}] "
                      f"x[{o_.get_left()[0]:.2f}, {o_.get_right()[0]:.2f}]", flush=True)
        y = y2
        # le graphique : les questions et le calcul s'effacent, x = 6 monte en tête de colonne
        pc = Dot(R.p(6, 54), radius=0.14, color=CROIX).set_z_index(7)
        fl = fleche_lecture(R.p(6, 54), R.p(6, 0), CROIX).set_z_index(2)
        lab6 = R.labs[2]
        haut = VGroup(e3, cad)
        self.au("Sur le graphique", FadeOut(VGroup(q1, q2, q3, q4, e1, op, e2)),
                haut.animate.move_to(P(0, y[0])).align_to(P(x0 + 0.5, 0), LEFT), rt=0.4)
        c1 = self.ld("Les deux droites", y[1] - 0.1, fs, x0=x0)
        self.dit(c1, "les deux droites")
        c2 = self.ld("se croisent en 6.", y[2] - 0.2, fs, x0=x0)
        self.poser_gestes(c2, "se croisent en 6.",
                          {0: lambda: [GrowFromCenter(pc), Flash(pc, color=CROIX, line_length=0.25)],
                           3: lambda: [Create(fl), Indicate(lab6, color=CROIX, scale_factor=1.6)]}, rt=0.35)
        self.zone(pc, fl)
        gz = Line(R.p(6, 54), R.p(11, 79), color=DROITE_G, stroke_width=11).set_z_index(4)
        self.zone(gz)
        c3 = self.ld("Au-delà de 6 séances,", y[4] - 0.2, fs, x0=x0)
        self.poser_gestes(c3, "Au-delà de 6 séances,", {0: lambda: [Create(gz)]}, rt=0.3)
        c4 = self.ld("la carte est plus", y[5] - 0.2, fs, VERT_OK, x0=x0)
        self.dit(c4, "la carte est plus")
        c5 = self.ld("avantageuse.", y[6] - 0.2, fs, VERT_OK, x0=x0)
        self.dit(c5, "avantageuse.")
        self.play(Create(self.cadre_ok(VGroup(c4, c5), 0.14)), run_time=0.3)
        self.attendre_voix(marge=0.8)

    # ── 03q : QUESTION 1 (réponse A) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = -0.4  # 2e relecture -ql : la place de « Mets pause, et choisis ! » à droite des cartes
        carte = carte_b(2.3, 1.35).move_to(P(-3.3, 1.55))
        tks = VGroup(*[ticket(DROITE_G, "", 1.3, 0.7, 32, texte="5 €") for _ in range(3)]).arrange(RIGHT, buff=0.25)
        tks.move_to(P(-3.3, -0.35))
        plus = T("+", 56, WHITE, audit=False).move_to(P(-3.3, 0.6))

        def avant(sc):
            sc.ligne_qi("Pour 3 séances,", "Pour 3 séances,",
                        {1: lambda: [LaggedStart(*[FadeIn(t, shift=DOWN * 0.2) for t in tks], lag_ratio=0.2)],
                         2: lambda: [FadeIn(carte, shift=DOWN * 0.2), FadeIn(plus)]})

        def apres(sc):
            sc.monter_reponse(0)
            sc.ph(0, "Réponse A :", "Réponse A :", premier=True)
            sc.ph(1, "5 × 3 = 15.", "5 fois 3, c'est 15.",
                  {0: lambda: [Indicate(tks, color=JAUNE_TITRE, scale_factor=1.08)]})
            sc.ph(2, "15 + 24 = 39 €.", "15 plus 24 : 39 euros.",
                  {2: lambda: [Indicate(carte, color=JAUNE_TITRE, scale_factor=1.08)]})
            sc.ph(3, "Pas 27 : tarif A.", "Pas 27 : ça, c'est le tarif A.", couleur=PIEGE)
            sc.rep_fini()

        self.question_pause("03q-question", "03r-reponse", ["Pour 3 séances,", "combien paie-t-on", "avec le tarif B ?"],
                            [X("39 €", 34), X("27 €", 34), X("32 €", 34)], 0,
                            ["Réponse A :", "5 × 3 = 15.", "15 + 24 = 39 €.", "Pas 27 : tarif A."],
                            avant_q=avant, autres_r=apres, mot_q="combien paie-t-on")
        self.XL = type(self).XL

    # ── 05q : QUESTION 2 (réponse B) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = -1.5
        # 2e relecture -ql : les étiquettes se chevauchaient : téléphones l'un sous l'autre, étiquette à droite
        t1 = telephone(DROITE_F, "A", 1.35).move_to(P(-6.05, 1.75))
        t2 = telephone(DROITE_G, "B", 1.35).move_to(P(-6.05, -0.65))
        e1 = X("4 € par mois", 34).next_to(t1, RIGHT, buff=0.3)
        e2a = X("10 € à", 34).next_to(t2, RIGHT, buff=0.3).shift(UP * 0.5)
        e2c = X("l'inscription", 34).next_to(e2a, DOWN, buff=0.2).align_to(e2a, LEFT)
        e2b = X("+ 2 € par mois", 34).next_to(e2c, DOWN, buff=0.2).align_to(e2a, LEFT)
        if os.environ.get("AUDIT") == "1":
            print(f"MISE-EN-PAGE 05q étiquettes : A x[{e1.get_left()[0]:.2f}, {e1.get_right()[0]:.2f}] "
                  f"y[{e1.get_bottom()[1]:.2f}, {e1.get_top()[1]:.2f}], B x[{e2a.get_left()[0]:.2f}, "
                  f"{max(e2c.get_right()[0], e2b.get_right()[0]):.2f}] y[{e2b.get_bottom()[1]:.2f}, "
                  f"{e2a.get_top()[1]:.2f}]", flush=True)
        R = Repere(P(-5.9, -2.75), 0.47, 0.148, (0, 7), (0, 30), xlab=(1, 3, 5, 7), ylab=(10, 20, 30),
                   nom_x="mois", nom_y="euros")
        R.nx.next_to(R.ax.get_end(), UP, buff=0.12).align_to(R.ax.get_end(), RIGHT)
        df = R.droite(4, 0, 0, 7.4, couleur=DROITE_F)
        dg = R.droite(2, 10, 0, 7, couleur=DROITE_G)
        ef = etiq("f", DROITE_F).next_to(R.p(7.4, 29.6), RIGHT, buff=0.1)
        eg = etiq("g", DROITE_G).next_to(R.p(7, 24), RIGHT, buff=0.12)
        pc = Dot(R.p(5, 20), radius=0.13, color=CROIX).set_z_index(7)
        if os.environ.get("AUDIT") == "1":
            print(f"MISE-EN-PAGE 05r repère droite {VGroup(R, ef, eg).get_right()[0]:.2f}", flush=True)
        fx = fleche_lecture(R.p(5, 20), R.p(5, 0), CROIX).set_z_index(2)
        fy = fleche_lecture(R.p(5, 20), R.p(0, 20), CROIX).set_z_index(2)

        def avant(sc):
            sc.play(FadeIn(t1, shift=UP * 0.2), run_time=0.25)
            sc.dit(e1, "4 euros par mois.")
            sc.au("Une autre", FadeIn(t2, shift=UP * 0.2), rt=0.25)
            sc.dit(e2a, "10 euros à")
            sc.dit(e2c, "l'inscription,")
            sc.dit(e2b, "plus 2 euros par mois.")

        def apres(sc):
            sc.monter_reponse(1)
            sc.ph(0, "Réponse B :", "Réponse B :", premier=True)
            sc.zone(R, df, dg, ef, eg, pc, fx, fy)
            sc.ph(1, "4x = 2x + 10", "4 x égale 2 x plus 10.",
                  {0: lambda: [FadeOut(VGroup(t1, t2, e1, e2a, e2c, e2b)), FadeIn(R), Create(df), Create(dg),
                               FadeIn(ef), FadeIn(eg)]})
            sc.ph(2, "2x = 10, donc x = 5.", "2 x égale 10, donc x vaut 5.",
                  {8: lambda: [GrowFromCenter(pc), Create(fx)]})
            sc.ph(3, "On vérifie : 20 €", "On vérifie : 20 euros",
                  {3: lambda: [Create(fy), Flash(pc, color=CROIX, line_length=0.22)]})
            sc.rep_fini()

        self.question_pause("05q-question", "05r-reponse", ["Au bout de combien", "de mois coûtent-elles", "pareil ?"],
                            [X("2 mois", 34), X("5 mois", 34), X("10 mois", 34)], 1,
                            ["Réponse B :", "4x = 2x + 10", "2x = 10, donc x = 5.", "On vérifie : 20 €"],
                            avant_q=avant, autres_r=apres, mot_q="Au bout de combien")
        self.XL = type(self).XL

    # ── 06 : le défi des plombiers ──────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("06-defi")
        x0 = -6.3
        tit = T("À toi de jouer !", 54, JAUNE_TITRE).move_to(P(0, 3.1)).align_to(P(x0, 0), LEFT)
        self.au("À toi", Write(tit), rt=0.5)
        pl1 = plombier(DROITE_F, 0.42).move_to(P(-5.85, 1.85))
        pl2 = plombier(DROITE_G, 0.42).move_to(P(-5.85, 0.35))
        xt = -5.0
        d1 = self.ld("40 € de déplacement,", 2.2, 42, x0=xt, maxw=11)
        self.dit(d1, "40 euros de déplacement,", avec=[FadeIn(pl1, shift=UP * 0.2)])
        d1b = self.ld("plus 30 € de l'heure.", 1.55, 42, x0=xt, maxw=11)
        self.dit(d1b, "plus 30 euros de l'heure.")
        d2 = self.ld("50 € de l'heure,", 0.7, 42, x0=xt, maxw=11)
        self.dit(d2, "50 euros de l'heure,", avec=[FadeIn(pl2, shift=UP * 0.2)])
        d2b = self.ld("sans déplacement.", 0.05, 42, x0=xt, maxw=11)
        self.dit(d2b, "sans déplacement.")
        p1 = pas("1", CIEL, 0.3).move_to(P(x0 + 0.3, -0.95))
        q1 = self.ld("Pour 3 heures, lequel est le moins cher ?", -0.95, 38, x0=x0 + 0.85, maxw=11.5)
        self.au("Un : pour", FadeIn(p1, scale=1.3), rt=0.2)
        self.dit(q1, "pour 3 heures, lequel est le moins cher ?")
        p2 = pas("2", CIEL, 0.3).move_to(P(x0 + 0.3, -1.8))
        q2 = self.ld("Pour quelle durée paie-t-on pareil ?", -1.8, 38, x0=x0 + 0.85, maxw=11.5)
        self.au("Deux : pour", FadeIn(p2, scale=1.3), rt=0.2)
        self.dit(q2, "pour quelle durée paie-t-on pareil ?")
        pz = T("Mets pause, et cherche !", 46, ORANGE_RETENUE).move_to(P(0, -2.85)).align_to(P(x0, 0), LEFT)
        self.au("Mets pause", Write(pz), rt=0.5)
        self.defi = dict(tit=tit, tout=VGroup(pl1, pl2, d1, d1b, d2, d2b, p1, q1, p2, q2, pz))
        self.attendre_voix(marge=2.0)

    # ── 06b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        d = self.defi
        self.dire("06b-correction")
        x0 = -6.3
        tit = T("Correction", 52, JAUNE_TITRE).move_to(P(0, 3.15)).align_to(P(x0, 0), LEFT)
        # 3e relecture -ql : « euros » touchait le titre : repère un peu moins haut (0,024 → 0,022)
        R = Repere(P(-5.7, -2.7), 0.95, 0.022, (0, 4.4), (0, 200), xlab=(1, 2, 3, 4), ylab=(50, 100, 150, 200),
                   nom_x="heures", nom_y="euros")
        R.nx.next_to(R.ax.get_end(), UP, buff=0.12).align_to(R.ax.get_end(), RIGHT)
        df = R.droite(30, 40, 0, 4.4, couleur=DROITE_F)
        dg = R.droite(50, 0, 0, 4, couleur=DROITE_G)
        ef = etiq("f", DROITE_F).next_to(R.p(4.4, 172), RIGHT, buff=0.12)
        eg = etiq("g", DROITE_G).next_to(R.p(4, 200), RIGHT, buff=0.12)
        self.zone(R, df, dg, ef, eg)
        self.au("Correction", ReplacementTransform(d["tit"], tit), FadeOut(d["tout"]), FadeIn(R), rt=0.45)
        xc, fs = -0.55, 44
        y = [2.85, 2.15, 1.4, 0.7, -0.05, -0.75, -1.5]
        p1 = pas("1", DROITE_F, 0.27).move_to(P(xc + 0.24, y[0]))
        e1 = self.lf("f(x) = 30x + 40", y[0], 48, x0=xc + 0.75, f=True)
        teinte(e1, DROITE_F, 0)
        self.poser_gestes(e1, "f de x égale 30 x plus 40.",
                          {0: lambda: [FadeIn(p1, scale=1.3), Create(df), FadeIn(ef)]}, echelle=1.1)
        p2 = pas("2", DROITE_G, 0.27).move_to(P(xc + 0.24, y[1]))
        e2 = self.lf("g(x) = 50x", y[1], 48, x0=xc + 0.75, f=True)
        teinte(e2, DROITE_G, 0)
        self.poser_gestes(e2, "g de x égale 50 x.",
                          {0: lambda: [FadeIn(p2, scale=1.3), Create(dg), FadeIn(eg)]}, echelle=1.1)
        for p in (p1, p2):
            for f in p.get_family():
                f._pas_audit = True
        q3f, q3g = R.point(3, 130, DROITE_F, 0.11), R.point(3, 150, DROITE_G, 0.11)
        l3f, l3g = lecture_image(R, 3, 130), lecture_image(R, 3, 150)
        self.zone(q3f, q3g, l3f, l3g)
        e3 = self.lf("f(3) = 130 €", y[2], fs, x0=xc, f=True)
        teinte(e3, INCONNUE, 2)
        teinte(e3, DROITE_F, 0)
        self.poser_gestes(e3, "f de 3 égale 130 euros,", {5: lambda: [Create(l3f), GrowFromCenter(q3f)]})
        e4 = self.lf("g(3) = 150 €", y[3], fs, x0=xc, f=True)
        teinte(e4, INCONNUE, 2)
        teinte(e4, DROITE_G, 0)
        self.poser_gestes(e4, "g de 3 égale 150 euros.", {5: lambda: [Create(l3g), GrowFromCenter(q3g)]})
        e5 = self.ld("Le premier est", y[4], fs, VERT_OK, x0=xc)
        self.dit(e5, "Le premier est")
        e5b = self.ld("moins cher.", y[5], fs, VERT_OK, x0=xc)
        self.dit(e5b, "moins cher.")
        cad5 = self.cadre_ok(VGroup(e5, e5b), 0.12)
        self.play(Create(cad5), Indicate(q3f, color=VERT_OK, scale_factor=2), run_time=0.3)
        # ② l'égalité
        a1 = X("30x + 40 = 50x", 50).move_to(P(0, y[2])).align_to(P(xc, 0), LEFT)
        teinte(a1, DROITE_F, 0, 1, 2, 3)
        teinte(a1, DROITE_G, 5, 6)
        self.au("Deux :", FadeOut(VGroup(e3, e4, e5, e5b, l3f, l3g, q3f, q3g, cad5)), rt=0.3)
        self.dire_eq(a1, "30 x plus 40 égale 50 x.", echelle=1.15)
        op = self.ld("On enlève 30x :", y[3], 38, OPERATION, x0=xc + 0.3)
        self.dit(op, "On enlève 30 x :")
        a2 = X("40 = 20x", 50)
        a2.shift(RIGHT * (a1.egal.get_x() - a2.egal.get_x())).set_y(0.05)
        self.dire_eq(a2, "40 égale 20 x,", echelle=1.15)
        a3 = X("x = 2", 54, VERT_OK)
        a3.atomes[0].set_color(INCONNUE)
        a3.shift(RIGHT * (a1.egal.get_x() - a3.egal.get_x())).set_y(-0.82)
        pc = Dot(R.p(2, 100), radius=0.13, color=CROIX).set_z_index(7)
        fx = fleche_lecture(R.p(2, 100), R.p(2, 0), CROIX).set_z_index(2)
        fy = fleche_lecture(R.p(2, 100), R.p(0, 100), CROIX).set_z_index(2)
        self.zone(pc, fx, fy)
        self.poser_gestes(a3, "donc x vaut 2.", {2: lambda: [GrowFromCenter(pc), Create(fx)]}, echelle=1.15)
        cad3 = self.cadre_ok(a3, 0.1)
        self.play(Create(cad3), Flash(pc, color=CROIX, line_length=0.22), run_time=0.3)
        b1 = self.ld("Pour 2 heures,", -1.68, 42, x0=xc)
        self.dit(b1, "Pour 2 heures,")
        b2 = self.ld("100 € des deux côtés.", -2.3, 38, VERT_OK, x0=xc)  # 38 : il touchait Ti-Margo
        if os.environ.get("AUDIT") == "1":
            for nom_, o_ in (("40 = 20x", a2), ("cadre x = 2", cad3), ("Pour 2 heures", b1), ("100 €", b2)):
                print(f"MISE-EN-PAGE 06b {nom_} y[{o_.get_bottom()[1]:.2f}, {o_.get_top()[1]:.2f}] "
                      f"x[{o_.get_left()[0]:.2f}, {o_.get_right()[0]:.2f}]", flush=True)
        self.poser_gestes(b2, "100 euros des deux côtés.", {0: lambda: [Create(fy)]})
        self.insister(b2, 1.05, 0.2)
        self.attendre_voix(marge=1.2)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        tit = T("Ce que tu as appris", 48, JAUNE_TITRE).to_edge(UP, buff=0.5)
        R = Repere(P(-6.3, -2.6), 0.44, 0.48, (0, 8), (0, 9), nom_x="x", nom_y="prix", grille=False, zero=False)
        df = R.droite(0.9, 0, 0, 8, couleur=DROITE_F)
        dg = R.droite(0.4, 2.5, 0, 8, couleur=DROITE_G)
        pc = Dot(R.p(5, 4.5), radius=0.13, color=CROIX).set_z_index(7)
        ef = etiq("f", DROITE_F).next_to(R.p(8, 7.2), UP, buff=0.12)
        eg = etiq("g", DROITE_G).next_to(R.p(8, 5.7), DOWN, buff=0.12)
        self.zone(R, df, dg, pc, ef, eg)
        self.play(Write(tit), FadeIn(R), Create(df), Create(dg), FadeIn(ef), FadeIn(eg), run_time=0.6)
        x0, fs = -1.95, 40
        y = [2.3, 1.68, 1.06, 0.35, -0.27, -0.98, -1.6, -2.31, -2.93]

        def ok(e):
            return [Create(self.coche(VERT_OK, 0.24).move_to(P(x0 - 0.45, e.get_y())))]

        l0 = self.ld("On nomme x,", y[0], fs, x0=x0)
        self.poser_gestes(l0, "on nomme x,", {0: lambda: ok(l0)})
        l1 = self.ld("on écrit chaque tarif", y[1], fs, x0=x0)
        self.dit(l1, "on écrit chaque tarif")
        l2 = self.ld("comme une fonction.", y[2], fs, JAUNE_TITRE, x0=x0)
        self.dit(l2, "comme une fonction.")
        l3 = self.ld("On calcule des images", y[3], fs, x0=x0)
        self.poser_gestes(l3, "On calcule des images", {0: lambda: ok(l3)})
        l4 = self.ld("pour comparer.", y[4], fs, x0=x0)
        self.dit(l4, "pour comparer.")
        l5 = self.ld("Quand deux tarifs sont égaux,", y[5], fs, x0=x0)
        self.poser_gestes(l5, "quand deux tarifs sont égaux,", {0: lambda: ok(l5)})
        l6 = self.ld("on résout une équation :", y[6], fs, JAUNE_TITRE, x0=x0)
        self.dit(l6, "on résout une équation :")
        l7 = self.ld("c'est là que les droites", y[7], fs, VERT_OK, x0=x0)
        self.dit(l7, "c'est là que les droites")
        l8 = self.ld("se croisent.", y[8], fs, VERT_OK, x0=x0)
        self.poser_gestes(l8, "se croisent.", {0: lambda: [GrowFromCenter(pc), Flash(pc, color=CROIX, line_length=0.22)]})
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_cinema()
        self.ecran_modeliser()
        self.ecran_comparer()
        self.ecran_question1()
        self.ecran_egalite()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        ecran_fin(self, "paysage", voix="08-abonne")
