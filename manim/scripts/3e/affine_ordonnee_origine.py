# affine_ordonnee_origine.py
# EleveAI — Maths 3e — série FONCTIONS AFFINES, épisode 03 : L'ORDONNÉE À L'ORIGINE.
# Paysage 16:9, AVEC VOIX, ceinture ORANGE. Micro : fonctions affines, l'ordonnée à l'origine b (tous les écrans).
# Métier : Léo, moniteur d'auto-école (inscription 300 €, puis 45 € l'heure : f(x) = 45x + 300 ;
# une autre auto-école cache son inscription : 50 € l'heure, 20 h = 1 400 €, donc b = 400).
# Écrans (clés de la voix) :
#   00-garde        page de garde, échelle des ceintures, « Que vaut une fonction affine quand x vaut 0 ? »
#   01-moniteur     Léo, sa voiture d'auto-école, f(x) = 45x + 300
#   02-depart       x = 0 : f(0) = 45 × 0 + 300 = 300 €, c'est b (le ticket d'inscription)
#   03-axe          le graphique : la droite coupe l'axe vertical à 300
#   03q / 03r       QUESTION 1 : f(x) = 7x − 5, son ordonnée à l'origine ? réponse A (−5)
#   04-retrouver    l'auto-école au prix caché : 50 × 20 + b = 1 400, b = 400 (les 20 heures dessinées)
#   05q / 05r       QUESTION 2 : f(x) = 3x + b et f(2) = 10, b ? réponse B (4)
#   06-defi         deux défis : f(x) = −2x + b, f(4) = 1 ; a = 0,5 et (6 ; 5)
#   06b-correction  b = 9 et b = 2
#   07-finale       ce que tu as appris
#   08-abonne       fin commune (manim/fin_commune.py)
# Lettres des questions : 03q → A ; 05q → B.
# Code couleur : x bleu ; a (« chaque heure… ») orange ; b (le départ, le point sur l'axe vertical) violet ;
# droite de f bleue ; juste vert ; piège rouge.
# Voix : manim/voix/3e-affine-ordonnee-origine.json (validée) ; marques : affine_ordonnee_origine_marques.json.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/3e/affine_ordonnee_origine.py AffineOrdonneeOrigine3e --media_dir manim/scripts/3e/media-affine-03-audit
# Rendu : PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/3e/affine_ordonnee_origine.py AffineOrdonneeOrigine3e -o eleveai-maths-3e-affine-ordonnee-origine --media_dir manim/scripts/3e/media-affine-03
# Sortie : manim/sorties/3e/maths/fonctions-affines/03-ordonnee-origine/eleveai-maths-3e-affine-ordonnee-origine.mp4

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

PAROLE["0"] = "0"        # la voix écrit « 0 » en chiffre (relatif_commun disait « zéro »)
PAROLE["€"] = "euros"
PAROLE["ax"] = "a x"

COEF_A = ORANGE_RETENUE  # a, « chaque heure coûte… »
ORD_B = "#a78bfa"        # b, l'ordonnée à l'origine
GRAD = "#cbd5e1"


def colorer(e, a=(), b=()):
    """x bleu ; la lettre a et les valeurs de `a` orange ; la lettre b et celles de `b` violet.
    « −5 » dans b colore le moins et le 5."""
    at = e.atomes
    for i, m in enumerate(at):
        s = m.original_text
        if s == "ax":
            m.submobjects[0].set_color(COEF_A)
            m.submobjects[1].set_color(INCONNUE)
        elif s == "a" or s in a:
            m.set_color(COEF_A)
        elif s == "b" or s in b:
            m.set_color(ORD_B)
        for vals, c in ((a, COEF_A), (b, ORD_B)):
            if i > 0 and at[i - 1].original_text == "−" and "−" + s in vals:
                m.set_color(c)
                at[i - 1].set_color(c)
    return e


def F(s, fs=46, couleur=WHITE, a=(), b=(), audit=True):
    return colorer(X(s, fs, couleur, audit), a, b)


def fleche_lecture(p, q, c=GRAD, sw=3):
    """Une flèche de lecture en pointillés, de p vers q."""
    p, q = np.array(p), np.array(q)
    d = (q - p) / np.linalg.norm(q - p)
    trait = DashedLine(p, q - d * 0.14, dash_length=0.1, color=c, stroke_width=sw)
    pointe = Triangle(fill_color=c, fill_opacity=1, stroke_width=0).scale(0.09)
    pointe.rotate(np.arctan2(d[1], d[0]) - PI / 2).move_to(q - d * 0.08)
    return VGroup(trait, pointe)


class Repere(VGroup):
    """Un repère dessiné (sans LaTeX) : .p(x, y) ; graduations à 28 pt sans audit ; axes nommés."""

    def __init__(self, o, ux, uy, x0, x1, y0, y1, xt=(), yt=(), xnom=None, ynom=None, fs=28, zero=True, **kw):
        super().__init__(**kw)
        self.o, self.ux, self.uy = np.array(o, dtype=float), ux, uy
        kw_f = dict(buff=0, stroke_width=3, tip_length=0.16, max_tip_length_to_length_ratio=0.12, color=GRAD)
        self.ax = Arrow(self.p(x0, 0), self.p(x1, 0), **kw_f)
        self.ay = Arrow(self.p(0, y0), self.p(0, y1), **kw_f)
        self.grad = VGroup()
        for v in xt:
            self.grad.add(Line(self.p(v, 0) + DOWN * 0.07, self.p(v, 0) + UP * 0.07, color=GRAD, stroke_width=3))
            self.grad.add(T(self.fmt(v), fs, GRAD, audit=False).next_to(self.p(v, 0), DOWN, buff=0.14))
        for v in yt:
            self.grad.add(Line(self.p(0, v) + LEFT * 0.07, self.p(0, v) + RIGHT * 0.07, color=GRAD, stroke_width=3))
            self.grad.add(T(self.fmt(v), fs, GRAD, audit=False).next_to(self.p(0, v), LEFT, buff=0.14))
        if zero:
            self.grad.add(T("0", fs, GRAD, audit=False).next_to(self.p(0, 0), DL, buff=0.08))
        self.noms = VGroup()
        if xnom:
            self.noms.add(T(xnom, 30, CIEL, audit=False).next_to(self.ax.get_end(), UP, buff=0.12)
                          .align_to(self.ax.get_end(), RIGHT))
        if ynom:
            self.noms.add(T(ynom, 30, CIEL, audit=False).next_to(self.ay.get_end(), RIGHT, buff=0.15))
        self.add(self.ax, self.ay, self.grad, self.noms)

    @staticmethod
    def fmt(v):
        return str(v).replace("-", "−").replace(".", ",")

    def p(self, x, y):
        return self.o + np.array([x * self.ux, y * self.uy, 0.0])

    def droite(self, f, xa, xb, c=INCONNUE, sw=5):
        return Line(self.p(xa, f(xa)), self.p(xb, f(xb)), color=c, stroke_width=sw)

    def point(self, x, y, c=ORD_B, r=0.1):
        return Dot(self.p(x, y), radius=r, color=c)


def voiture(couleur="#dc2626", s=1.0):
    """La voiture d'auto-école : la caisse, la cabine, les vitres, deux roues, le panneau sur le toit."""
    fonce = interpolate_color(ManimColor(couleur), ManimColor("#000000"), 0.25)
    caisse = RoundedRectangle(width=2.4, height=0.6, corner_radius=0.18, fill_color=couleur, fill_opacity=1,
                              stroke_color=WHITE, stroke_width=2)
    cabine = Polygon(P(-0.8, 0.28), P(0.6, 0.28), P(0.32, 0.8), P(-0.52, 0.8), fill_color=fonce, fill_opacity=1,
                     stroke_color=WHITE, stroke_width=2)
    vitres = VGroup(Polygon(P(-0.64, 0.36), P(-0.16, 0.36), P(-0.16, 0.71), P(-0.45, 0.71)),
                    Polygon(P(-0.04, 0.36), P(0.47, 0.36), P(0.27, 0.71), P(-0.04, 0.71)))
    vitres.set_fill("#bae6fd", 1).set_stroke(width=0)
    roues = VGroup()
    for x in (-0.72, 0.72):
        roues.add(Circle(radius=0.25, fill_color="#111827", fill_opacity=1, stroke_color="#9ca3af", stroke_width=4)
                  .move_to(P(x, -0.3)))
        roues.add(Circle(radius=0.09, fill_color="#9ca3af", fill_opacity=1, stroke_width=0).move_to(P(x, -0.3)))
    panneau = RoundedRectangle(width=0.62, height=0.24, corner_radius=0.06, fill_color="#1d4ed8", fill_opacity=1,
                               stroke_color=WHITE, stroke_width=2).move_to(P(-0.1, 0.94))
    phare = Circle(radius=0.07, fill_color="#fde047", fill_opacity=1, stroke_width=0).move_to(P(1.1, 0.06))
    g = VGroup(caisse, cabine, vitres, roues, panneau, phare)
    g.caisse, g.panneau = caisse, panneau
    return g.scale(s)


def leo(s=0.9, fs=32):
    """Léo, moniteur d'auto-école : tenue bleu marine ; son nom sur deux lignes (32 pt)."""
    m = Metier(["Léo, moniteur", "d'auto-école"], fs=fs, peau="#a0522d", tenue="#1e3a8a", cheveux="#1f1308", s=s)
    m.nom.arrange(DOWN, buff=0.1, aligned_edge=LEFT)
    return m


def etiquette(s, couleur=ORD_B, fs=40, audit=True):
    """Une étiquette de prix (fond sombre, bord violet)."""
    t = T(s, fs, couleur, audit)
    r = RoundedRectangle(width=t.width + 0.4, height=t.height + 0.3, corner_radius=0.1, stroke_color=couleur,
                         stroke_width=4, fill_color="#1e1b4b", fill_opacity=1)
    t.move_to(r)
    g = VGroup(r, t)
    g.texte = t
    return g


class AuditPlace:
    """Partagé par la paysage et le short de l'épisode 03."""

    # ── audit de place (2e relecture -ql du 22/11) : rien sur Ti-Margo, aucun texte sous 32 pt ──
    def _zone_margo(self):
        for m in self.mobjects:
            if type(m).__name__.startswith("Mascotte"):
                return (m.get_left()[0], m.get_right()[0], m.get_bottom()[1], m.get_top()[1])
        return (5.55, 6.8, -3.8, -2.2)

    def _audit_place(self):
        """MARGO : un texte ou un dessin qui touche le cadre de Ti-Margo ; PETIT : un texte (posé au mot)
        dont la taille EFFECTIVE est sous 32 pt (graduations et rappels audit=False exclus, ≥ 28)."""
        if os.environ.get("AUDIT") != "1":
            return
        vus = getattr(self, "_places_vues", set())
        g, dr, b, h = self._zone_margo()
        for m in self.mobjects:
            if type(m).__name__.startswith("Mascotte"):
                continue
            for f in m.get_family():
                if f.submobjects or not f.has_points():
                    continue
                if isinstance(f, VMobject) and f.get_fill_opacity() < 0.05 and f.get_stroke_opacity() < 0.05:
                    continue
                if f.get_right()[0] > g and f.get_left()[0] < dr and f.get_bottom()[1] < h and f.get_top()[1] > b:
                    c = ("MARGO", self._cle_voix, type(f).__name__, round(f.get_x(), 1), round(f.get_y(), 1))
                    if c not in vus:
                        vus.add(c)
                        print(f"MARGO {self._cle_voix} {type(f).__name__} x[{f.get_left()[0]:.2f}, "
                              f"{f.get_right()[0]:.2f}] y[{f.get_bottom()[1]:.2f}, {f.get_top()[1]:.2f}] "
                              f"(Ti-Margo x ≥ {g:.2f}, y ≤ {h:.2f})", flush=True)
            for f in m.get_family():
                if isinstance(f, Text) and getattr(f, "original_text", "").strip() and f.get_fill_opacity() > 0.05:
                    # graduations, rappels (audit=False) et lettres des pastilles A, B, C : 28 pt suffisent
                    lim = 27.5 if getattr(f, "_pas_audit", False) or f.original_text in ("A", "B", "C") else 31.5
                    if f.original_text.startswith("Ceinture") or f.original_text == self.identite:
                        continue  # l'échelle des ceintures et la signature : le gabarit commun
                    if f.font_size < lim and f.original_text.strip() not in ".,;:!?'()":
                        c = ("PETIT", self._cle_voix, f.original_text)
                        if c not in vus:
                            vus.add(c)
                            print(f"PETIT {self._cle_voix} « {f.original_text} » {f.font_size:.0f} pt", flush=True)
        self._places_vues = vus

    def clear(self):
        if getattr(self, "_cle_voix", None):
            self._audit_place()
        return super().clear()

    def vider(self, garder):
        self._audit_place()
        return super().vider(garder)

    @staticmethod
    def _fs(m):
        """La taille effective du premier texte de m."""
        for f in m.get_family():
            if isinstance(f, Text) and getattr(f, "original_text", "").strip():
                return f.font_size
        return 36.0


class AffineOrdonneeOrigine3e(AuditPlace, IdentFactoriser3e):
    nom_voix = "3e-affine-ordonnee-origine"
    fichier_marques = "affine_ordonnee_origine_marques.json"
    identite = "Maths 3e — EleveAI"
    ceinture = "orange"

    def lf(self, s, y, fs=46, c=WHITE, x0=-1.5, maxw=8.3, a=(), b=()):
        """Une ligne de la colonne de droite, colorée (x bleu, a orange, b violet)."""
        return colorer(self.ld(s, y, fs, c, x0=x0, maxw=maxw), a, b)

    def _disposer_q(self, question, choix, phrase):
        """2e relecture -ql du 22/11 : énoncé à 40 pt, cartes à 42 pt raccourcies à leur contenu,
        « Mets pause, / et choisis ! » à 36 pt À DROITE des cartes, à mi-hauteur, loin de Ti-Margo."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        if len(q.submobjects):
            # des repères neufs à 40 pt (ceux du gabarit ont leur propre échelle) : ligne_qr pose dessus, au mot
            neufs = [T(s, 40, audit=False) for s in question]
            q.remove(*list(q.submobjects))
            q.add(*neufs)
            q.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
            q.next_to(tete, DOWN, buff=0.25).align_to(P(self.XL, 0), LEFT)
        for c in cartes:
            cadre, pas, corps = c[0], c[1][0], c[1][1]
            corps.scale(42 / self._fs(corps))
            pas.scale(0.46 / pas.height)
            cadre.stretch_to_fit_height(max(pas.height, corps.height) + 0.3)
            pas.next_to(cadre.get_left(), RIGHT, buff=0.16).set_y(cadre.get_y())
            corps.next_to(pas, RIGHT, buff=0.3).set_y(cadre.get_y())
            # la place de la coche (et question_pause ne rétrécit le choix que s'il passe à moins de 0,95 du bord)
            cadre.stretch_to_fit_width(max(2.4, corps.get_right()[0] - cadre.get_left()[0] + 1.05), about_edge=LEFT)
        cartes.arrange(DOWN, buff=0.16, aligned_edge=LEFT)
        cartes.next_to(q if len(q.submobjects) else tete, DOWN, buff=0.32).align_to(P(self.XL, 0), LEFT)
        neuf = VGroup(T("Mets pause,", 36, ORANGE_RETENUE, audit=False),
                      T("et choisis !", 36, ORANGE_RETENUE, audit=False)).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        for f in neuf.get_family():
            f.sans_synchro = True
        neuf.next_to(cartes, RIGHT, buff=0.35).set_y(cartes.get_y())
        if os.environ.get("AUDIT") == "1":
            g, _, _, h = self._zone_margo()
            print(f"MISE-EN-PAGE {self._cle_voix} q {q.get_top()[1]:.2f}/{q.get_bottom()[1]:.2f} ({self._fs(q):.0f} pt) "
                  f"cartes {cartes.get_top()[1]:.2f}/{cartes.get_bottom()[1]:.2f} ({self._fs(cartes[0][1][1]):.0f} pt) "
                  f"pause x[{neuf.get_left()[0]:.2f}, {neuf.get_right()[0]:.2f}] y[{neuf.get_bottom()[1]:.2f}, "
                  f"{neuf.get_top()[1]:.2f}] ({self._fs(neuf):.0f} pt) ; Ti-Margo x ≥ {g:.2f}, y ≤ {h:.2f}", flush=True)
        self._q_aff = []
        return tete, q, cartes, neuf, rebours, ph

    def monter_reponse(self, bonne):
        """Les deux mauvaises cartes ET l'énoncé s'effacent, la bonne carte monte sous « Question ! » :
        la réponse a toute la colonne, à 44 pt (36 sortait petit), en lignes courtes."""
        self._audit_place()  # l'écran de la question, cartes comprises
        cartes, ph = self.cartes_q, self.ph_q
        b = cartes[bonne]
        ok = self.mobjects[-1]
        vieux = [cartes[j] for j in range(3) if j != bonne] + list(self._q_aff) + list(self.q_q.submobjects)
        d = UP * (2.65 - b.get_top()[1])
        anims = [FadeOut(m) for m in vieux] + [b.animate.shift(d)]
        if ok is not b and ok not in b.get_family():
            anims.append(ok.animate.shift(d))
        self.play(*anims, run_time=0.3)
        ph.arrange(DOWN, aligned_edge=LEFT, buff=0.16)
        k = T(ph[0].original_text, 44, audit=False).height / ph[0].height
        haut = b.get_bottom()[1] - 0.35
        k = min(k, (5.4 - self.XL) / ph.width, (haut + 3.3) / ph.height)  # x ≤ 5,4 : jamais sur Ti-Margo
        ph.scale(k).next_to(P(0, haut), DOWN, buff=0).align_to(P(self.XL, 0), LEFT)
        if os.environ.get("AUDIT") == "1":
            fs = 30 * ph[0].height / T(ph[0].original_text, 30, audit=False).height
            print(f"REPONSE taille {fs:.0f} pt, bas {ph.get_bottom()[1]:.2f}, droite {ph.get_right()[0]:.2f}", flush=True)

    def ph_gestes(self, i, s, phrase, gestes, premier=False, a=(), b=()):
        """La ligne i de la réponse, au mot ; b reste violet."""
        ref = self.ph_q[i]
        e = colorer(X(s, 30, VERT_OK), a, b)
        e.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
        sauf = []
        if premier:
            self.play(FadeIn(e.atomes[0]), run_time=0.08)
            sauf = [e.atomes[0]]
        return self.poser_gestes(e, phrase, gestes, rt=0.16, sauf=sauf)

    def ligne_qr(self, ref, s, phrase, gestes=None, a=(), b=()):
        """Dans avant_q : la ligne `ref` de la question devient une expression posée au mot."""
        e = F(s, 40, a=a, b=b)
        e.move_to(ref).align_to(ref, LEFT)
        self.q_q.remove(ref)
        self._q_aff.append(e)
        return self.poser_gestes(e, phrase, gestes or {}, echelle=1.2, rt=0.2)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("L'ordonnée à l'origine", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("L'ordonnée", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        r = Repere(P(-5.7, -1.55), 0.55, 0.5, -0.3, 6.2, -0.3, 6.4, xnom="x", ynom="y", zero=False)
        d = r.droite(lambda x: 0.5 * x + 2, 0, 6)
        pt = r.point(0, 2, r=0.13)
        l1 = self.ld("Que vaut une fonction affine", 1.1, 40, x0=-1.9, maxw=8.2)
        self.poser_gestes(l1, "Que vaut une fonction affine", {2: lambda: [FadeIn(r)], 4: lambda: [Create(d)]})
        l2 = self.ld("quand x vaut 0 ?", 0.3, 50, JAUNE_TITRE, x0=-1.9, maxw=8.2)
        self.poser_gestes(l2, "quand x vaut 0 ?", {3: lambda: [GrowFromCenter(pt)]})
        self.play(Flash(pt, color=ORD_B, line_length=0.25), run_time=0.5)
        self.insister(l2, 1.06, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : Léo, moniteur d'auto-école ──────────────────────────────────────
    def ecran_moniteur(self):
        self.ecran("01-moniteur")
        m = leo(1.2, 36)  # -ql 22/11 : un peu plus grands
        m.nom.move_to(P(0, 2.85)).align_to(P(-6.45, 0), LEFT)
        m.perso.next_to(m.nom, DOWN, buff=0.2).set_x(-5.1)
        car = voiture("#dc2626", 1.0).move_to(P(-4.6, -2.05))
        self.au("Léo", FadeIn(m.perso, shift=UP * 0.3), FadeIn(m.nom[0], shift=UP * 0.1), rt=0.35)
        self.au("d'auto-école", FadeIn(m.nom[1], shift=UP * 0.1), FadeIn(car, shift=RIGHT * 0.6), rt=0.4)
        x0 = -1.8
        l1 = self.lf("Inscription : 300 €", 2.7, 48, x0=x0, b=("300",))
        self.poser_gestes(l1, "L'inscription coûte 300 euros.",
                          {2: lambda: [Indicate(car.panneau, color=ORD_B, scale_factor=1.4)]})
        l2 = self.lf("Chaque heure : 45 €", 1.65, 48, x0=x0, a=("45",))
        self.poser_gestes(l2, "chaque heure de conduite coûte 45 euros.",
                          {0: lambda: [car.animate.shift(RIGHT * 0.25)]})
        l3 = self.lf("Pour x heures :", 0.3, 48, x0=x0)
        self.dit(l3, "Pour x heures :")
        e = F("f(x) = 45x + 300", 60, a=("45",), b=("300",)).move_to(P(0, -1.0)).align_to(P(x0 + 0.4, 0), LEFT)
        self.dire_eq(e, "f de x égale 45 x plus 300.", echelle=1.15)
        self.play(Create(self.cadre_ok(e, 0.16)), run_time=0.3)
        self.insister(e, 1.05, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 : au départ, x = 0 ───────────────────────────────────────────────
    def ecran_depart(self):
        self.ecran("02-depart")
        car = voiture("#dc2626", 0.95).move_to(P(-4.7, 1.9))
        ticket = RoundedRectangle(width=3.0, height=1.9, corner_radius=0.14, stroke_color=ORD_B, stroke_width=4,
                                  fill_color="#1e1b4b", fill_opacity=1).move_to(P(-4.7, -0.65))
        t_tit = T("Inscription", 38, WHITE, audit=False).move_to(ticket.get_top() + DOWN * 0.45)
        t_prix = T("300 €", 56, ORD_B).move_to(ticket.get_center() + DOWN * 0.3)
        self.play(FadeIn(car), run_time=0.3)
        x0 = -1.7
        l1 = self.lf("Avant la première heure :", 2.75, 44, x0=x0)
        self.dit(l1, "Avant la première heure,")
        l2 = self.lf("x = 0", 2.05, 54, x0=x0 + 0.4)
        self.poser_gestes(l2, "x vaut 0.", {2: lambda: [Indicate(car, color=JAUNE_TITRE, scale_factor=1.05)]})
        e1 = F("f(0) = 45 × 0 + 300", 54, a=("45",), b=("300",)).move_to(P(0, 1.15)).align_to(P(x0 + 0.4, 0), LEFT)
        self.dire_eq(e1, "f de 0 égale 45 fois 0, plus 300", echelle=1.15)
        e2 = F("= 300 €", 54, b=("300",))
        e2.mis_sur_egal(e1.egal.get_x(), 0.35)
        self.poser_gestes(e2, ": 300 euros.", {1: lambda: [FadeIn(ticket), FadeIn(t_tit), FadeIn(t_prix, scale=1.3)]},
                          echelle=1.15)
        l3 = self.lf("Ce 300, c'est b :", -0.6, 48, x0=x0, b=("300",))
        self.poser_gestes(l3, "Ce 300, c'est b,", {1: lambda: [Indicate(t_prix, color=ORD_B, scale_factor=1.2)]})
        l4 = self.lf("l'ordonnée à l'origine.", -1.3, 48, ORD_B, x0=x0)
        self.dit(l4, "l'ordonnée à l'origine.")
        l5 = self.lf("La valeur de départ !", -2.15, 44, VERT_OK, x0=x0)  # son cadre touchait Ti-Margo
        self.dit(l5, "C'est la valeur de départ.")
        self.play(Create(self.cadre_ok(l5, 0.14)), run_time=0.3)
        self.attendre_voix(marge=0.8)

    # ── 03 : sur le graphique ───────────────────────────────────────────────
    def repere_leo(self):
        r = Repere(P(-5.45, -2.35), 0.4, 0.0055, 0, 10.9, 0, 860, xt=(2, 4, 6, 8, 10), yt=(200, 400, 600, 800),
                   xnom="heures", ynom="euros")
        return r

    def ecran_axe(self):
        self.ecran("03-axe")
        r = self.repere_leo()
        f = lambda x: 45 * x + 300  # noqa: E731
        d = r.droite(f, 0, 10)
        pt = r.point(0, 300, r=0.12)
        lab = T("300", 36, ORD_B).next_to(r.p(0, 300), RIGHT, buff=0.2).shift(DOWN * 0.3)
        self.au("graphique", FadeIn(r), rt=0.4)
        x0 = -0.4
        l1 = self.lf("La droite coupe", 2.6, 48, x0=x0)
        self.poser_gestes(l1, "la droite coupe", {1: lambda: [Create(d)]}, rt=0.3)
        l2 = self.lf("l'axe vertical à 300.", 1.85, 48, x0=x0, b=("300",))
        self.poser_gestes(l2, "l'axe vertical à 300.",
                          {2: lambda: [Indicate(r.ay, color=JAUNE_TITRE, scale_factor=1.03)],
                           5: lambda: [GrowFromCenter(pt), FadeIn(lab, scale=1.3)]})
        l3 = self.lf("C'est là qu'on lit b :", 0.45, 48, x0=x0)
        self.poser_gestes(l3, "C'est là qu'on lit b :", {8: lambda: [Flash(pt, color=ORD_B, line_length=0.22)]})
        l4 = self.lf("l'ordonnée du point", -0.75, 48, ORD_B, x0=x0)
        self.dit(l4, "l'ordonnée du point")
        l5 = self.lf("où x = 0.", -1.5, 48, x0=x0)
        self.poser_gestes(l5, "où x vaut 0.", {3: lambda: [Indicate(pt, color=ORD_B, scale_factor=1.6)]})
        self.insister(VGroup(l4, l5), 1.04, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 03q : QUESTION 1 (réponse A) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.1  # -ql 22/11 : la colonne s'élargit, « Mets pause » tient à droite des cartes
        r = Repere(P(-4.2, -0.05), 1.5, 0.37, -0.9, 2.0, -6.8, 6.9, xt=(1,), yt=(-6, -4, -2, 2, 4, 6),
                   xnom="x", ynom="y")
        d = r.droite(lambda x: 7 * x - 5, -1 / 7, 11 / 7)
        pt = r.point(0, -5, r=0.12)
        lab = T("−5", 36, ORD_B).next_to(r.p(0, -5), RIGHT, buff=0.22)

        def avant(sc):
            refs = list(sc.q_q.submobjects)
            sc.ligne_qr(refs[0], "f(x) = 7x − 5", "f de x égale 7 x moins 5.", {0: lambda: [FadeIn(r)]})

        def apres(sc):
            sc.monter_reponse(0)
            sc.ph_gestes(0, "Réponse A :", "Réponse A :", {}, premier=True)
            sc.ph_gestes(1, "le nombre seul,", "le nombre seul,", {})
            sc.ph_gestes(2, "avec son signe :", "avec son signe.", {})
            sc.ph_gestes(3, "f(0) = −5.", "f de 0 égale moins 5 :",
                         {0: lambda: [Create(d)], 6: lambda: [GrowFromCenter(pt), FadeIn(lab, scale=1.3)]}, b=("−5",))
            sc.au("sous l'origine", Indicate(VGroup(pt, lab), color=ORD_B, scale_factor=1.3), rt=0.5)
            sc.rep_fini()

        self.question_pause("03q-question", "03r-reponse", ["f(x) = 7x − 5", "Son ordonnée", "à l'origine ?"],
                            [F("−5", 34), F("7", 34), F("5", 34)], 0,
                            ["Réponse A :", "le nombre seul,", "avec son signe :", "f(0) = −5."],
                            avant_q=avant, autres_r=apres, mot_q="Quelle est son")
        self.XL = type(self).XL

    # ── 04 : retrouver b ────────────────────────────────────────────────────
    def ecran_retrouver(self):
        self.ecran("04-retrouver")
        car = voiture("#0f766e", 0.9).move_to(P(-5.15, 2.3))
        tag = etiquette("?", fs=48).next_to(car, DOWN, buff=0.12)
        heures = VGroup(*[RoundedRectangle(width=0.4, height=0.4, corner_radius=0.06, stroke_color=WHITE,
                                           stroke_width=2, fill_color=COEF_A, fill_opacity=0.85) for _ in range(20)])
        heures.arrange_in_grid(4, 5, buff=0.12).move_to(P(-5.15, -0.3))
        tot = X("1 400 €", 44).next_to(heures, DOWN, buff=0.3)
        x0 = -1.75
        self.au("autre auto-école", FadeIn(car, shift=RIGHT * 0.6), rt=0.4)
        l1 = self.lf("Prix d'inscription : ?", 3.0, 44, x0=x0, b=("?",))
        l1.atomes[-1].set_color(ORD_B)
        self.poser_gestes(l1, "son prix d'inscription.", {5: lambda: [FadeIn(tag, scale=1.3)]})
        l2 = self.lf("50 € l'heure,", 2.3, 44, x0=x0, a=("50",))
        self.dit(l2, "50 euros l'heure,")
        l3 = self.lf("20 heures : 1 400 €.", 1.6, 44, x0=x0)
        self.poser_gestes(l3, "20 heures coûtent 1 400 euros.",
                          {0: lambda: [LaggedStart(*[FadeIn(h, scale=0.6) for h in heures], lag_ratio=0.04)],
                           4: lambda: [FadeIn(tot, scale=1.2)]}, rt=0.3)
        e1 = F("f(x) = 50x + b", 52, a=("50",)).move_to(P(0, 0.75)).align_to(P(x0 + 0.4, 0), LEFT)
        self.dire_eq(e1, "f de x égale 50 x plus b.", echelle=1.15)
        e2 = F("50 × 20 + b = 1 400", 52, a=("50",)).move_to(P(0, 0.0)).align_to(P(x0 + 0.4, 0), LEFT)
        self.poser_gestes(e2, "50 fois 20, plus b, égale 1 400.",
                          {2: lambda: [Indicate(heures, color=JAUNE_TITRE, scale_factor=1.05)],
                           6: lambda: [Indicate(tot, color=JAUNE_TITRE, scale_factor=1.15)]}, echelle=1.15)
        xe = e2.egal.get_x()
        e3 = F("1 000 + b = 1 400", 52).mis_sur_egal(xe, -0.75)
        self.dire_eq(e3, "1 000 plus b égale 1 400 :", echelle=1.15)
        e4 = F("b = 400", 52, VERT_OK, b=("b",)).mis_sur_egal(xe, -1.5)
        prix = etiquette("400 €", fs=44).move_to(tag)
        self.poser_gestes(e4, "b vaut 400.", {2: lambda: [FadeOut(tag), FadeIn(prix, scale=1.3)]}, echelle=1.15)
        self.play(Create(self.cadre_ok(e4, 0.12)), run_time=0.25)
        l5 = self.lf("Inscription : 400 €", -2.35, 46, VERT_OK, x0=x0)
        self.poser_gestes(l5, "L'inscription coûte 400 euros.",
                          {2: lambda: [Indicate(prix, color=ORD_B, scale_factor=1.2)]})
        self.attendre_voix(marge=0.8)

    # ── 05q : QUESTION 2 (réponse B) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.1  # -ql 22/11 : la colonne s'élargit, « Mets pause » tient à droite des cartes
        r = Repere(P(-5.4, -2.5), 1.3, 0.355, 0, 3.4, 0, 14.6, xt=(1, 2, 3), yt=(2, 4, 6, 8, 10, 12, 14),
                   xnom="x", ynom="y")
        pA = Dot(r.p(2, 10), radius=0.11, color=JAUNE_TITRE)
        labA = X("(2 ; 10)", 34, JAUNE_TITRE).next_to(r.p(2, 10), DR, buff=0.12)
        lect = VGroup(fleche_lecture(r.p(2, 0), r.p(2, 9.6)), fleche_lecture(r.p(1.9, 10), r.p(0.06, 10)))
        pB = r.point(0, 4, r=0.12)
        q_b = T("?", 40, ORD_B, audit=False).next_to(r.p(0, 4), RIGHT, buff=0.25).shift(DOWN * 0.25)
        d = r.droite(lambda x: 3 * x + 4, 0, 10 / 3)
        lab4 = T("4", 36, ORD_B).move_to(q_b)

        def avant(sc):
            refs = list(sc.q_q.submobjects)
            sc.ligne_qr(refs[0], "f(x) = 3x + b", "f de x égale 3 x plus b,", {0: lambda: [FadeIn(r)]}, b=("b",))
            sc.ligne_qr(refs[1], "et f(2) = 10.", "et f de 2 égale 10.",
                        {3: lambda: [Create(lect[0]), *[FadeIn(a) for a in labA.atomes[0:3]]],
                         6: lambda: [Create(lect[1]), GrowFromCenter(pA), *[FadeIn(a) for a in labA.atomes[3:]]]})
            # 3e relecture -ql 22/11 : le point posé en (0 ; 4) donnait la réponse B avant la pause : rien sur l'axe

        def apres(sc):
            sc.monter_reponse(1)
            # la carte B (cochée) reste en haut : la réponse commence au calcul (5 lignes à ~36 pt)
            sc.ph_gestes(0, "3 × 2 = 6.", "3 fois 2 égale 6.", {})
            sc.ph_gestes(1, "6 + b = 10,", "6 plus b égale 10,", {})
            sc.ph_gestes(2, "donc b = 4.", "donc b vaut 4.",
                         {3: lambda: [Create(d), GrowFromCenter(pB), FadeIn(lab4, scale=1.3)]}, b=("b", "4"))
            sc.ph_gestes(3, "Pas 16 :", "Pas 16 :", {})
            sc.ph_gestes(4, "on enlève 6.", "on enlève 6,", {})
            sc.rep_fini()

        self.question_pause("05q-question", "05r-reponse", ["f(x) = 3x + b", "et f(2) = 10.", "Combien vaut b ?"],
                            [F("16", 34), F("4", 34), F("7", 34)], 1,
                            ["3 × 2 = 6.", "6 + b = 10,", "donc b = 4.", "Pas 16 :", "on enlève 6."],
                            avant_q=avant, autres_r=apres, mot_q="Combien vaut b")
        self.XL = type(self).XL

    # ── 06 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("06-defi")
        m = leo(1.25, 36)  # -ql 22/11 : plus grand ; la voiture loin de Ti-Margo
        m.perso.move_to(P(2.7, 0.45))
        m.nom.next_to(m.perso, UP, buff=0.2).set_x(m.perso.get_x() + 0.4)
        car = voiture("#dc2626", 1.0).move_to(P(3.1, -1.75))
        self.play(FadeIn(m), FadeIn(car), run_time=0.3)
        x0 = -6.2
        tit = T("À toi de jouer !", 52, JAUNE_TITRE).move_to(P(0, 3.15)).align_to(P(x0, 0), LEFT)
        self.au("À toi", Write(tit), rt=0.5)
        tb = F("Trouve b.", 48, b=("b",)).move_to(P(0, 2.3)).align_to(P(x0, 0), LEFT)
        self.dit(tb, "Trouve b.")
        p1 = pastille("1", CIEL, 0.3).move_to(P(x0 + 0.3, 1.3))
        e1 = F("f(x) = −2x + b", 48, a=("−2",), b=("b",)).next_to(p1, RIGHT, buff=0.3)
        self.dire_eq(e1, "f de x égale moins 2 x plus b,", avec=[FadeIn(p1, scale=1.3)], echelle=1.15)
        e1b = F("et f(4) = 1.", 48).move_to(P(0, 0.55)).align_to(e1, LEFT)
        self.dire_eq(e1b, "et f de 4 égale 1.", echelle=1.15)
        p2 = pastille("2", CIEL, 0.3).move_to(P(x0 + 0.3, -0.6))
        e2 = F("a = 0,5,", 48, a=("a", "0,5")).next_to(p2, RIGHT, buff=0.3)
        self.dire_eq(e2, "a vaut 0,5,", avec=[FadeIn(p2, scale=1.3)], echelle=1.15)
        e2b = F("passe par (6 ; 5).", 48).move_to(P(0, -1.35)).align_to(e2, LEFT)
        self.dire_eq(e2b, "passe par le point de coordonnées 6 et 5.", echelle=1.15)
        pz = T("Mets pause, et cherche !", 46, ORANGE_RETENUE).move_to(P(0, -2.6)).align_to(P(x0, 0), LEFT)
        self.au("Mets pause", Write(pz), rt=0.5)
        droite_enonces = max(x.get_right()[0] for x in (e1, e1b, e2, e2b))
        self.defi = dict(tit=tit, pz=pz, autres=VGroup(m, car), droite=droite_enonces)
        if os.environ.get("AUDIT") == "1":
            print(f"MISE-EN-PAGE 06-defi enonces droite {droite_enonces:.2f} pause droite {pz.get_right()[0]:.2f} "
                  f"leo x[{m.get_left()[0]:.2f}, {m.get_right()[0]:.2f}] y[{m.get_bottom()[1]:.2f}, {m.get_top()[1]:.2f}] "
                  f"voiture x[{car.get_left()[0]:.2f}, {car.get_right()[0]:.2f}] y[{car.get_bottom()[1]:.2f}, "
                  f"{car.get_top()[1]:.2f}]", flush=True)
        self.attendre_voix(marge=2.0)
        self._audit_place()

    # ── 06b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        d = self.defi
        self.dire("06b-correction")
        x0 = max(0.7, d["droite"] + 0.7)  # au moins 0,5 d'écart avec « passe par (6 ; 5). »
        if os.environ.get("AUDIT") == "1":
            print(f"ECART-CORRECTION {x0 - d['droite']:.2f}", flush=True)
        tit = T("Correction", 52, JAUNE_TITRE).move_to(d["tit"]).align_to(d["tit"], LEFT)
        self.au("Correction", ReplacementTransform(d["tit"], tit), FadeOut(d["pz"]), FadeOut(d["autres"]), rt=0.45)

        def cadre_b(e):
            """Le cadre de « b = 9 » : serré, il ne mord pas sur « donc »."""
            g = VGroup(*e.atomes[1:4])
            return RoundedRectangle(width=g.width + 0.24, height=g.height + 0.22, corner_radius=0.08,
                                    color=VERT_OK, stroke_width=4).move_to(g)

        c1 = self.lf("−2 × 4 = −8", 2.3, 48, x0=x0, a=("−2",))
        self.dit(c1, "moins 2 fois 4, c'est moins 8.")
        c2 = self.lf("−8 + b = 1,", 1.6, 48, x0=x0, b=("b",))
        self.dit(c2, "Moins 8 plus b égale 1,")
        c3 = self.lf("donc b = 9.", 0.9, 48, VERT_OK, x0=x0)
        # 4e relecture -ql : le cadre touchait « donc » et coupait le point : « b = 9 » s'écarte, le point aussi
        VGroup(*c3.atomes[1:]).shift(RIGHT * 0.16)
        VGroup(*c3.atomes[4:]).shift(RIGHT * 0.12)
        self.dit(c3, "donc b vaut 9.")
        self.play(Create(cadre_b(c3)), run_time=0.25)
        c4 = self.lf("0,5 × 6 = 3", -0.4, 48, x0=x0, a=("0,5",))
        self.dit(c4, "0,5 fois 6, c'est 3.")
        c5 = self.lf("3 + b = 5,", -1.1, 48, x0=x0, b=("b",))
        self.dit(c5, "3 plus b égale 5,")
        c6 = self.lf("donc b = 2.", -1.8, 48, VERT_OK, x0=x0)
        # 4e relecture -ql : le cadre touchait « donc » et coupait le point : « b = 2 » s'écarte, le point aussi
        VGroup(*c6.atomes[1:]).shift(RIGHT * 0.16)
        VGroup(*c6.atomes[4:]).shift(RIGHT * 0.12)
        self.dit(c6, "donc b vaut 2.")
        self.play(Create(cadre_b(c6)), run_time=0.25)
        self.insister(VGroup(c3, c6), 1.05, 0.2)
        self.attendre_voix(marge=1.2)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        tit = T("Ce que tu as appris", 48, JAUNE_TITRE).to_edge(UP, buff=0.5)
        r = Repere(P(-6.2, -2.7), 0.5, 0.65, 0, 7.2, 0, 7.6, xnom="x", ynom="y", zero=False)
        d = r.droite(lambda x: 0.6 * x + 2.2, 0, 6.5)
        pt = r.point(0, 2.2, r=0.13)
        lb = T("b", 40, ORD_B, audit=False).next_to(r.p(0, 2.2), RIGHT, buff=0.2).shift(DOWN * 0.3)
        self.play(Write(tit), FadeIn(r), Create(d), run_time=0.6)
        x0, fs = -1.9, 38
        y = [2.35, 1.7, 1.05, 0.2, -0.42, -1.25, -1.87, -2.49]

        def ok(e):
            return [Create(self.coche(VERT_OK, 0.24).move_to(P(x0 - 0.45, e.get_y())))]

        l0 = self.lf("Dans ax + b,", y[0], fs, x0=x0, b=("b",))
        self.poser_gestes(l0, "Dans a x plus b,", {0: lambda: ok(l0)})
        l1 = self.lf("b est l'ordonnée à l'origine.", y[1], fs, x0=x0, b=("b",))
        self.poser_gestes(l1, "b est l'ordonnée à l'origine.", {0: lambda: [GrowFromCenter(pt), FadeIn(lb)]})
        l2 = self.lf("C'est f(0), la valeur de départ.", y[2], fs, x0=x0)
        self.dit(l2, "C'est f de 0, la valeur de départ.")
        l3 = self.lf("La droite coupe l'axe", y[3], fs, x0=x0)
        self.poser_gestes(l3, "la droite coupe l'axe", {0: lambda: ok(l3), 2: lambda: [Indicate(d, color=CIEL)]})
        l4 = self.lf("vertical en b.", y[4], fs, x0=x0, b=("b",))
        self.poser_gestes(l4, "vertical en b.", {2: lambda: [Flash(pt, color=ORD_B, line_length=0.22)]})
        l5 = self.lf("Pour retrouver b, on remplace", y[5], fs, x0=x0, b=("b",))
        self.poser_gestes(l5, "Pour retrouver b, on remplace", {0: lambda: ok(l5)})
        l6 = self.lf("x et f(x) par un point connu,", y[6], fs, x0=x0)
        self.dit(l6, "x et f de x par un point connu,")
        l7 = self.lf("puis on résout.", y[7], fs, VERT_OK, x0=x0)
        self.dit(l7, "puis on résout.")
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_moniteur()
        self.ecran_depart()
        self.ecran_axe()
        self.ecran_question1()
        self.ecran_retrouver()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        ecran_fin(self, "paysage", voix="08-abonne")
