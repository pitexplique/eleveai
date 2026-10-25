# stats_lycee_j2_commun.py
# EleveAI — Maths STMG — série « Statistiques », LYCÉE, lot J2 (24/10/2026) :
# les OUTILS COMMUNS des épisodes 27 à 32 (moindres carrés : principe,
# calculer, comparer ; changement de variable : appliquer, lire, revenir).
# Pas de scène ici.
#
# ⭐ Repris SANS LES MODIFIER : stats_lycee_h2_commun.py (Nuage du coach,
#   question_pause, PaysageH2 / ShortH2, contrôle BORDS=1) et
#   cm1/stats_tableau_commun.py (remplir les cases d'un Tableau).
# ⭐ Ajouté ici, aux couleurs du coach (lib/canvas/FonctionGraphiqueCanvas.tsx) :
#   · droite() : la droite d'ajustement BLEUE (#2563eb), coupée à la fenêtre ;
#   · residus() : les écarts VERTICAUX point → droite (ambre) ;
#   · carres() : chaque écart DESSINÉ en carré (le « carré » des moindres carrés) ;
#   · point_moyen() : le point G, violet, avec son nom ;
#   · tableur() : le tableau du coach (`tableau_donnees`) des colonnes
#     observé / prévu / écart / carré ;
#   · nb() : un nombre à la française SANS arrondi caché (fr() de canvas_stats
#     arrondit au centième : 0,125 deviendrait 0,13).
# ⛔ Ne pas modifier manim/canvas_stats.py ni les modules H1/H2/I1 (ni J1).

import os
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_h2_commun import *  # noqa: E402,F401,F403
from stats_tableau_commun import remplir, textes_devant  # noqa: E402,F401

BLEU_D = "#2563eb"        # la droite du coach
BLEU_CLAIR = "#60a5fa"    # le bleu, lisible sur le fond noir
GRIS_D = "#64748b"        # une seconde droite (au jugé), ardoise
ROSE_C = "#ec4899"        # les carrés des écarts
ROSE_CLAIR = "#f9a8d4"


def nb(v, d=3):
    """Un nombre à la française, jusqu'à d décimales, sans zéros inutiles :
    0,125 ; 1 816 ; −3. Le signe moins est le vrai « − »."""
    v = round(float(v), d)
    if v.is_integer():
        s = f"{int(v):,}".replace(",", " ")
    else:
        s = f"{v:,.{d}f}".rstrip("0").replace(",", " ").replace(".", ",")
    return s.replace("-", "−")


def droite(n, a, b, couleur=BLEU_D, sw=6, x0=None, x1=None):
    """La droite y = a x + b dans la fenêtre du nuage n (coupée aux bords)."""
    x0 = n.xmin if x0 is None else x0
    x1 = n.xmax if x1 is None else x1
    xs = [x0, x1]
    if abs(a) > 1e-12:
        for yb in (n.ymin, n.ymax):
            xb = (yb - b) / a
            if x0 < xb < x1:
                xs.append(xb)
    dedans = [x for x in sorted(xs) if n.ymin - 1e-9 <= a * x + b <= n.ymax + 1e-9]
    g, d = min(dedans), max(dedans)
    return Line(n.p(g, a * g + b), n.p(d, a * d + b), color=couleur, stroke_width=sw)


def residus(n, a, b, couleur=AMBRE, sw=5, idx=None):
    """Les écarts VERTICAUX de chaque point à la droite (segments)."""
    idx = range(len(n.xs)) if idx is None else idx
    return VGroup(*[Line(n.ronds[i].get_center(), n.p(n.xs[i], a * n.xs[i] + b), color=couleur, stroke_width=sw)
                    for i in idx])


def carres(n, a, b, couleur=ROSE_C, idx=None, cote_droit=True):
    """Chaque écart DESSINÉ en carré : un côté = le segment vertical de l'écart,
    le carré s'ouvre vers la droite (ou la gauche). Taille = celle de l'écart
    à l'écran : un écart deux fois plus grand donne un carré quatre fois plus grand."""
    idx = range(len(n.xs)) if idx is None else idx
    g = VGroup()
    for i in idx:
        p = n.ronds[i].get_center()
        q = n.p(n.xs[i], a * n.xs[i] + b)
        c = abs(p[1] - q[1])
        sq = Square(side_length=max(c, 1e-3), stroke_color=couleur, stroke_width=3, fill_color=couleur,
                    fill_opacity=0.35)
        sq.move_to(P(p[0] + (c / 2 if cote_droit else -c / 2), (p[1] + q[1]) / 2))
        g.add(sq)
    return g


def point_moyen(n, x, y, nom="G", couleur=VIOLET_H):
    """Le point moyen : un losange violet cerclé de blanc, et son nom."""
    k = n._k()
    pt = Square(side_length=0.2 * k, fill_color=couleur, fill_opacity=1, stroke_color=WHITE,
                stroke_width=2).rotate(PI / 4).move_to(n.p(x, y))
    t = texte(nom, int(n.fs * 1.1), couleur).set_stroke(WHITE, 5, background=True).scale(k)
    t.next_to(pt, UL, buff=0.05)
    return VGroup(pt, t)


def tableur(entetes, lignes, libelles, coin="x", largeur_case=1.25, largeur_libelle=2.2, hauteur=0.62, fs=26,
            titre=None):
    """Le tableau du coach, prêt à remplir (None = case vide). Textes devant."""
    tb = Tableau([str(e) for e in entetes], lignes, libelles=libelles, coin=coin, largeur_case=largeur_case,
                 largeur_libelle=largeur_libelle, hauteur=hauteur, fs=fs, titre=titre)
    return textes_devant(tb)



# ── SYNCHRO VOIX / ÉCRIT (règle du 24/10, REGLES.md : 0 s d'avance) ─────────
# Avant CHAQUE animation qui fait apparaître du texte, la scène regarde ce que
# la voix de l'écran a déjà dit : un nombre, ou le premier mot porteur d'un
# texte (4 lettres ou plus), qui n'a pas encore été dit mais qui le sera plus
# loin dans le même écran, fait ATTENDRE l'animation jusqu'à ce mot (marques
# WinRT). Les données d'une figure qu'on LIT (6 textes ou plus d'un coup :
# axes, tableau) s'affichent d'un bloc (exception de la règle). Imprime
# « SYNCHRO … » pour chaque attente, « LOIN … » si le mot est à plus de 3 s
# (à revoir à la main), « ECART … » si deux textes d'une même animation sont
# dits à plus de 0,4 s d'écart (à découper).

_MOT = re.compile(r"[0-9]+(?:[,.][0-9]+)?|[A-Za-zÀ-ÿ]+")
_ENUM = re.compile(r"^\s*[0-9]+\.(\s|$)")
_INTRO = ("FadeIn", "Write", "Create", "GrowFromCenter", "GrowFromEdge", "GrowFromPoint", "DrawBorderThenFill",
          "SpinInFromNothing", "AddTextLetterByLetter")


def _jetons(s):
    """Les nombres d'un texte (sauf la numérotation « 1. ») et son premier mot
    porteur (4 lettres ou plus)."""
    s = _ENUM.sub("", s)
    out, mot = [], False
    for m in _MOT.finditer(s):
        j = m.group(0).lower()
        if j[0].isdigit():
            out.append(j)
        elif not mot and len(j) >= 4:
            out.append(j)
            mot = True
    return out


def _textes(m):
    return [f for f in m.get_family() if isinstance(f, Text) and getattr(f, "original_text", None)]


def _textes_ou_morceaux(m):
    return [m] if isinstance(m, _Morceau) else _textes(m)


def _a_plat(anims):
    for a in anims:
        if hasattr(a, "animations"):
            yield from _a_plat(a.animations)
        else:
            yield a


class _Morceau(VGroup):
    """Une partie des lettres d'un Text (pour l'écrire nombre après nombre)."""


def _morceaux(t):
    """Coupe un Text avant chacun de ses nombres (sauf le premier) : chaque
    morceau s'écrira quand la voix dira son nombre."""
    s = t.original_text
    debuts = [m.start() for m in re.finditer(r"[0-9]+(?:[,.][0-9]+)?", _ENUM.sub(lambda x: " " * len(x.group(0)), s))]
    if len(debuts) < 2 or len(t.submobjects) != sum(1 for c in s if not c.isspace()):
        return [t]
    bornes = [0] + debuts[1:] + [len(s)]
    out, k = [], 0
    for a, b in zip(bornes[:-1], bornes[1:]):
        n = sum(1 for c in s[a:b] if not c.isspace())
        g = _Morceau(*t.submobjects[k:k + n])
        g.original_text = s[a:b]
        k += n
        if n:
            out.append(g)
    return out


def bloc_fixe(m):
    """Marque m pour qu'il s'affiche d'un coup (pas de découpage au mot)."""
    m._bloc = True
    return m


def _feuilles(m):
    """Les morceaux d'un groupe, dans l'ordre : les Text entiers, et les dessins."""
    if isinstance(m, Text):
        return _morceaux(m)
    if not m.submobjects:
        return [m]
    out = []
    for x in m.submobjects:
        out += _feuilles(x)
    return out


class SynchroJ2:
    def _nouveaux_textes(self, anims):
        neufs = []
        for a in _a_plat(anims):
            nom = type(a).__name__
            if nom in _INTRO:
                neufs += _textes(a.mobject)
            elif "Transform" in nom and getattr(a, "target_mobject", None) is not None:
                vieux = {f.original_text for f in _textes(a.mobject)}
                neufs += [f for f in _textes(a.target_mobject) if f.original_text not in vieux]
        return neufs

    def _attente(self, textes):
        voix = getattr(self, "_texte_voix", "") or ""
        marques = self._marques().get(getattr(self, "_cle_voix", None)) or []
        if not marques or not textes:
            return 0.0
        ecoule = self.renderer.time - self._debut_voix
        dit = max([m[0] for m in marques if m[1] <= ecoule + 0.05] or [0])
        fin = dit
        while fin < len(voix) and (voix[fin].isalnum() or voix[fin] in ",'"):
            fin += 1
        bas = voix.lower()
        passe = {m.group(0) for m in _MOT.finditer(bas[:fin])}
        futur = [(m.group(0), m.start()) for m in _MOT.finditer(bas) if m.start() >= fin]
        besoins = []
        dits = [(m.group(0), m.start()) for m in _MOT.finditer(bas[:fin])]
        for f in textes:
            b = 0.0
            for j in _jetons(f.original_text):
                if j in passe:
                    # déjà dit… mais s'il revient dans moins de 1,5 s, c'est CE mot-là qu'on attend
                    pos2 = next((p for w, p in futur if w == j), None)
                    if pos2 is not None:
                        tm2 = max([t for p, t in marques if p <= pos2] or [0]) - ecoule
                        if tm2 <= 1.5:
                            b = max(b, tm2)
                            continue
                    pos = max([p for w, p in dits if w == j])
                    t_dit = max([t for p, t in marques if p <= pos] or [0])
                    if 0.4 < ecoule - t_dit < 2.5:
                        print(f"TARD {self._cle_voix} « {j} » dans « {f.original_text} » : {ecoule - t_dit:.2f} s", flush=True)
                    continue
                pos = next((p for w, p in futur if w == j), None)
                if pos is None:
                    continue
                tm = max([t for p, t in marques if p <= pos] or [0]) - ecoule
                if tm > 10.0:
                    print(f"LOIN {self._cle_voix} « {j} » dans « {f.original_text} » : {tm:.2f} s", flush=True)
                    continue
                b = max(b, tm)
            besoins.append((b, f.original_text))
            ts_f = []
            for j in _jetons(f.original_text):
                if j[0].isdigit() and j not in passe:
                    pos = next((p for w, p in futur if w == j), None)
                    if pos is not None:
                        ts_f.append(max([t for p, t in marques if p <= pos] or [0]) - ecoule)
            if len(ts_f) >= 2 and max(ts_f) - min(ts_f) > 0.4:
                print(f"INTRA {self._cle_voix} « {f.original_text} » : {min(ts_f):.2f} → {max(ts_f):.2f}", flush=True)
        if len(besoins) > 1 and max(b for b, _ in besoins) - min(b for b, _ in besoins) > 0.4:
            print(f"ECART {self._cle_voix} : " + " | ".join(f"{t} ({b:.2f})" for b, t in besoins), flush=True)
        return max(b for b, _ in besoins)

    def play(self, *args, **kwargs):
        if not hasattr(self, "_debut_voix") or os.environ.get("SANS_SYNCHRO") == "1":
            return super().play(*args, **kwargs)
        anims = self.compile_animations(*args, **kwargs)
        neufs = self._nouveaux_textes(anims)
        # une ligne de morceaux (VGroup de Text) dont les morceaux sont dits à des
        # instants différents : chaque morceau attend son mot
        for k, a in enumerate(anims):
            m = getattr(a, "mobject", None)
            nom = type(a).__name__
            if nom not in ("FadeIn", "Write") or m is None or len(neufs) >= 6 or getattr(m, "_bloc", False):
                continue
            feuilles = _feuilles(m)
            textes = [x for x in feuilles if isinstance(x, (Text, _Morceau))]
            if len(textes) < 2:
                continue
            ts = [self._attente([x]) for x in textes]
            if max(ts) - min(ts) <= 0.4:
                continue
            autres = anims[:k] + anims[k + 1:]
            rt = min(getattr(a, "run_time", 0.4), 0.35)
            Anim = FadeIn if nom == "FadeIn" else Write
            dessins = [x for x in feuilles if not isinstance(x, (Text, _Morceau))]
            self._par_lots(textes, Anim, rt, avec=list(autres) + [FadeIn(x) for x in dessins])
            return
        if len(neufs) < 6:
            d = self._attente(neufs)
            if d > 0.05:
                print(f"SYNCHRO {self._cle_voix} +{d:.2f} s : {neufs[0].original_text}", flush=True)
                super().play(Wait(run_time=d))
        return super().play(*anims)

    def poser_lignes(self, mob, anim="fade", run_time=0.4):
        """Montre un bloc (ou une ligne de morceaux) MORCEAU PAR MORCEAU : chaque
        texte attend son mot (voir play)."""
        a = {"fade": lambda m: FadeIn(m, shift=RIGHT * 0.2), "pop": lambda m: FadeIn(m, scale=0.7),
             "up": lambda m: FadeIn(m, shift=UP * 0.2), "write": lambda m: Write(m)}[anim]
        self._par_lots(list(mob.submobjects), a, run_time)
        return mob

    def _debut(self, m):
        """L'instant où la voix commence à dire m (le plus tôt de ses morceaux)."""
        pieces = []
        for t in _textes_ou_morceaux(m):
            pieces += _morceaux(t) if isinstance(t, Text) else [t]
        return min([self._attente([p]) for p in pieces] or [0.0])

    def _par_lots(self, morceaux, anim, run_time, avec=()):
        """Joue les morceaux par LOTS : un morceau qui attend son mot ouvre un
        nouveau lot ; ceux qui n'attendent rien suivent le lot en cours."""
        # chaque morceau à SON mot : rangés selon l'instant où la voix les dit
        # (« 784 milliers en 2016 » : le nombre avant l'année)
        tps = [self._debut(m) for m in morceaux]
        # un morceau sans mot de la voix (« = », « u = x² = ? ») suit le morceau d'avant
        voix = {w.group(0) for w in _MOT.finditer((getattr(self, "_texte_voix", "") or "").lower())}
        for k, m in enumerate(morceaux):
            jet = [j for t in _textes_ou_morceaux(m) for j in _jetons(t.original_text)]
            if k and not any(j in voix for j in jet):
                tps[k] = max(tps[k], tps[k - 1])
        ordre = sorted(range(len(morceaux)), key=lambda k: tps[k])
        lots, lot, t_lot = [], [], None
        for k in ordre:
            if lot and tps[k] - t_lot > 0.05:
                lots.append(lot)
                lot = []
            if not lot:
                t_lot = tps[k]
            lot.append(morceaux[k])
        if lot:
            lots.append(lot)
        for k, lot in enumerate(lots):
            self.play(*(list(avec) if k == 0 else []), *[anim(m) for m in lot], run_time=run_time)


class _QuestionsJ2:
    """question_pause() du module H2, mais la question et la phrase de réponse
    s'écrivent LIGNE PAR LIGNE, chacune à son mot (règle du 24/10), et la coche
    se pose DANS la carte, à droite, sans mordre sur un choix long."""

    def question_pause(self, cle_q, cle_r, question, choix, bonne, phrase, mots_choix=("A :", "B :", "C :"),
                       autres_q=None, autres_r=None, mot_q=None):
        self.dire(cle_q)
        t0 = self.renderer.time
        tete, q, cartes, pause, rebours, ph = self._disposer_q(question, choix, phrase)
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        if mot_q:
            self.au_mot(mot_q)
        self.poser_lignes(q, "up", 0.35)
        for c, mot in zip(cartes, mots_choix):
            self.au_mot(mot)
            self.play(FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.15), run_time=0.25)  # la carte et sa lettre
            self.play(FadeIn(c[1][1], shift=RIGHT * 0.15), run_time=0.25)              # le choix, à son mot
        if autres_q:
            autres_q(self)
        self.au_mot("Mets pause")
        self.play(FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        print(f"QUESTION {cle_q} t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f}) reponse={bonne}", flush=True)
        self.dire(cle_r)
        b = cartes[bonne]
        # la place de la coche, réservée à droite DANS la carte : le texte du choix s'écarte
        corps = b[1][1]
        place = b[0].get_right()[0] - 0.65 - corps.get_left()[0]
        if corps.get_right()[0] > b[0].get_right()[0] - 0.6:
            gauche = corps.get_left()[0]
            corps.scale_to_fit_width(max(0.4, place))
            corps.shift(RIGHT * (gauche - corps.get_left()[0]))
        anims = [b[0].animate.set_stroke(VERT_OK, width=7).set_fill("#052e16", 1),
                 b[1][0][0].animate.set_fill(VERT_OK)]
        anims += [cartes[j].animate.set_opacity(0.3) for j in range(3) if j != bonne]
        self.play(*anims, FadeOut(rebours), FadeOut(pause), run_time=0.3)
        ok = self.coche(VERT_OK, 0.22).move_to(b[0].get_right() + LEFT * 0.33)
        self.play(b.animate.scale(1.08), Create(ok), run_time=0.2)
        self.play(b.animate.scale(1 / 1.08), ok.animate.scale(1 / 1.08, about_point=b.get_center()), run_time=0.2)
        if autres_r:  # le geste sur la figure d'abord : il suit les premiers mots de la réponse
            autres_r(self)
        self.poser_lignes(ph, "up", 0.35)
        self.attendre_voix(marge=0.8)
        return t0


class PaysageJ2(SynchroJ2, _QuestionsJ2, PaysageH2):
    """La base d'une paysage du lot J2 : figure à gauche, colonne à droite."""

    identite = "Maths STMG — EleveAI"
    ceinture = "verte"

    def ecran(self, cle, scale=0.5):
        """Efface, remet Ti-Margo, lance la voix de l'écran."""
        self.clear()
        self.add_mascotte(scale=scale)
        self.dire(cle)

    def titre_col(self, txt, couleur=JAUNE_TITRE, y=2.95, fs=46):
        t = self.col(self.t(txt, fs, couleur), y)
        self.play(Write(t), run_time=0.5)
        return t

    def poser(self, mob, y, anim="fade", run_time=0.45, xl=None):
        """Pose mob dans la colonne de droite à la hauteur y, et le montre
        (morceau par morceau, au mot, sauf si mob._bloc : un calcul affiché d'un coup)."""
        self.col(mob, y, xl)
        if len(mob.submobjects) >= 2 and not getattr(mob, "_bloc", False) and all(isinstance(m, Text) for m in mob.submobjects):
            return self.poser_lignes(mob, anim, min(run_time, 0.35))  # morceau par morceau, au mot
        a = {"fade": FadeIn(mob, shift=RIGHT * 0.2), "pop": FadeIn(mob, scale=0.7),
             "up": FadeIn(mob, shift=UP * 0.2), "write": Write(mob)}[anim]
        self.play(a, run_time=run_time)
        return mob

    def montrer_ligne(self, lg, *autres):
        """« Ce que tu as appris » : la coche, puis chaque ligne au mot."""
        self.play(Create(lg[0]), *autres, run_time=0.5)
        self.poser_lignes(lg[1], "fade", 0.35)

    def pause_defi(self, y=-2.05, marge=2.0):
        self.au_mot("Mets pause")
        p = self.col(self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE), y)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=marge)

    def apparaitre_points(self, n, idx=None, lag=0.15, run_time=1.0):
        idx = range(len(n.ronds)) if idx is None else idx
        self.play(LaggedStart(*[FadeIn(n.ronds[i], scale=3) for i in idx], lag_ratio=lag), run_time=run_time)


class ShortJ2(SynchroJ2, _QuestionsJ2, ShortH2):
    """La base d'un short du lot J2 (9:16, cadre 4,5 × 8) : la figure en bas
    (sous HAUT_CARTE), l'image et les textes dans la bande du haut."""

    HAUT_CARTE = 0.8
    BAS_CARTE = -2.6  # Ti-Margo est dessous : la carte ne descend jamais plus bas

    def caser_bas(self, m):
        """Une figure dans le bas du cadre, sans jamais toucher les bords (3 %)."""
        m.scale_to_fit_width(min(m.width, config.frame_width - 0.5))
        if m.height > self.HAUT_CARTE - self.BAS_CARTE:
            m.scale_to_fit_height(self.HAUT_CARTE - self.BAS_CARTE)
        return m.move_to(P(0, self.HAUT_CARTE - m.height / 2))

    def haut_txt(self, morceaux, fs=32, y=1.6):
        """Un texte centré dans la bande du haut."""
        return self.ligne(morceaux, fs).move_to(P(0, y))

    def vider(self, garder):
        """Efface tout sauf les objets gardés (titre, ceintures, Ti-Margo)."""
        self.play(FadeOut(Group(*[m for m in self.mobjects if m not in garder])), run_time=0.4)

    def appel_commentaire(self, y=0.95):
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 32, VERT_OK), 0.95).move_to(P(0, y))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)

    def _disposer_q(self, question, choix, phrase):
        """Comme ShortH2._disposer_q, mais des cartes de 3,7 de large : agrandies
        (× 1,08) à la réponse, elles restent à plus de 3 % des bords."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        neuves = VGroup(*[self._carte_choix(l, c, 3.7, 28) for l, c in zip("ABC", choix)])
        neuves.arrange(DOWN, buff=0.1).move_to(cartes).set_x(0)
        return tete, q, neuves, pause, rebours, ph
