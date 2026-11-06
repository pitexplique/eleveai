# equation_reconnaitre_short.py
# EleveAI — Maths 4e — série ÉQUATIONS, épisode 01, le SHORT ceinture BLANCHE
# « Équation ou pas ? » : les écritures arrivent une à une, chrono de 3 s, verdict.
#   · EN HAUT, l'image : le coffre, deux voyants (= et x), le chrono ;
#   · EN BAS, au même instant : l'écriture, le verdict, la raison ; le voyant
#     s'allume (vert) ou se barre (rouge) au mot, le coffre s'ouvre à la 3e ;
#   · 1 question-pause (3 s) : 8 = y − 1 ;
#   · fin : réponse en commentaire, puis la fin standard.
# Micro : equation_reconnaitre. Centres : jeux-defis.
#
# ⭐ La voix promet « 3 secondes à chaque fois », mais le WAV ne laisse que 1,3 s
# entre l'écriture et le verdict : les MOTS ne changent pas, le script INSÈRE un
# silence (WAV dérivé dans media-eq-01-short/voix/, marques décalées) pour que le
# chrono dure vraiment 3 s. Si la voix est regénérée, rien à refaire.
#
# Voix : manim/voix/4e-equation-reconnaitre-short.json (validée, débit −6) ;
# marques : equation_reconnaitre_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/equation_reconnaitre_short.py EquationReconnaitreShort
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/equation_reconnaitre_short.py EquationReconnaitreShort -o eleveai-maths-4e-equation-reconnaitre-short --media_dir manim/scripts/4e/media-eq-01-short
# Sortie : manim/sorties/4e/maths/equations/01-reconnaitre/eleveai-maths-4e-equation-reconnaitre-short.mp4

import copy
import sys
import wave
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_reconnaitre import Coffre, OR  # noqa: E402

X_LAMPE_EG, X_LAMPE_X, Y_LAMPE = 0.85, 1.6, 1.9
Y_EQ, Y_VERDICT, Y_RAISON = -0.3, -1.12, (-1.82, -2.24)  # raison sur 2 lignes : loin du bord de la carte
ECART_CHRONO = 3.35  # du dernier mot de l'écriture au verdict : 3 s de chrono + les fondus


class Voyant(VGroup):
    """Un voyant rond et son symbole : vert s'il y est, rouge et barré s'il manque."""

    def __init__(self, s, c, r=0.3, **kw):
        super().__init__(**kw)
        self.s, self.c = s, c
        self.rond = Circle(radius=r, stroke_color="#64748b", stroke_width=4, fill_color="#0b1220", fill_opacity=1)
        self.txt = T(s, 36, c, audit=False, gras=True).move_to(self.rond)
        self.add(self.rond, self.txt)

    def allumer(self):
        return self.rond.animate.set_stroke(VERT_OK, 6).set_fill("#065f46", 1)

    def manque(self):
        return self.rond.animate.set_stroke(PIEGE, 6).set_fill("#450a0a", 1)

    def eteindre(self):
        return self.rond.animate.set_stroke("#64748b", 4).set_fill("#0b1220", 1)


class EquationReconnaitreShort(ShortEq):
    nom_voix = "4e-equation-reconnaitre-short"
    fichier_marques = "equation_reconnaitre_short_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "blanche"

    # ── le silence inséré dans 01-jeu ───────────────────────────────────────
    def _ancres(self, brutes):
        """(instant du verdict, silence à y insérer) pour les trois manches."""
        voix = self._textes()["01-jeu"]
        pos = [voix.find("Pas d'"), voix.find("Pas d'", voix.find("Pas d'") + 1), voix.find("Équation :")]
        res = []
        for p in pos:
            k = next(i for i, m in enumerate(brutes) if m[0] == p)
            res.append((brutes[k][1], ECART_CHRONO - (brutes[k][1] - brutes[k - 1][1])))
        return res

    def _marques(self):
        if not hasattr(self, "_marques_etirees"):
            m = copy.deepcopy(super()._marques())
            anc = self._ancres(m["01-jeu"])
            m["01-jeu"] = [[p, round(t + sum(d for a, d in anc if t >= a), 3)] for p, t in m["01-jeu"]]
            self._marques_etirees = m
            self._anc = anc
        return self._marques_etirees

    def _wav_etire(self):
        self._marques()
        src = Path(self.dossier_voix) / "01-jeu.wav"
        dest = ICI / "media-eq-01-short" / "voix"
        dest.mkdir(parents=True, exist_ok=True)
        with wave.open(str(src), "rb") as w:
            par = w.getparams()
            data = w.readframes(par.nframes)
        taille = par.sampwidth * par.nchannels
        sortie, dernier = [], 0
        for a, d in self._anc:
            cut = int((a - 0.06) * par.framerate) * taille
            sortie += [data[dernier:cut], b"\0" * (int(d * par.framerate) * taille)]
            dernier = cut
        sortie.append(data[dernier:])
        with wave.open(str(dest / "01-jeu.wav"), "wb") as w:
            w.setparams(par)
            w.writeframes(b"".join(sortie))
        return dest

    def dire(self, nom, dossier=None):
        if nom != "01-jeu":
            return super().dire(nom, dossier)
        d = super().dire(nom, self._wav_etire())
        self._texte_voix = self._textes()[nom]
        return d

    # ── une manche du jeu ───────────────────────────────────────────────────
    def manche(self, s, phrase, verdict, mot_verdict, n_verdict, couleur, raison, avec_verdict):
        """L'écriture au mot, 3 s de chrono, le verdict (+ avec_verdict : le voyant
        de ce qui y est), la raison au mot. Le dernier mot de la raison vient de
        tomber quand la fonction rend la main : le geste final part là."""
        e = Eq(s, 50).move_to(P(0, Y_EQ))
        self.dire_eq(e, phrase)
        ch = self.chrono(3).move_to(P((X_LAMPE_EG + X_LAMPE_X) / 2, 0.78))
        self.play(FadeIn(ch, scale=0.7), run_time=0.08)
        ch.jouer(self)
        tv = self.verdict(verdict, couleur, 26).move_to(P(0, Y_VERDICT))
        self.au(mot_verdict, FadeOut(ch), FadeIn(tv, scale=1.4), *avec_verdict, n=n_verdict, rt=0.3)
        self.insister(tv, 1.12, 0.15)
        r = VGroup()
        for (ligne, n), y in zip(raison, Y_RAISON):
            lg = Eq(ligne, 27, lettres="").move_to(P(0, y))
            self.dire_eq(lg, ligne, n=n, echelle=1.0, rt=0.14)
            r.add(lg)
        return e, tv, r

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Équation ou pas ?", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au("Équation,", Write(titre), rt=0.5)
        t_oui = self.verdict("Équation", VERT_OK, 32).move_to(P(0, 1.55))
        t_non = self.verdict("Pas équation", PIEGE, 32).move_to(P(0, 0.55))
        self.play(FadeIn(t_oui, scale=1.3), run_time=0.25)
        self.au("pas équation", FadeIn(t_non, scale=1.3), rt=0.3)
        l1 = Eq("Tu as 3 secondes", 36, lettres="").move_to(P(0, -0.55))
        l2 = T("à chaque fois", 36).move_to(P(0, -1.15))
        self.dire_eq(l1, "Tu as 3 secondes", echelle=1.0)
        ch0 = self.chrono(3, r=0.42, fs=38).move_to(P(0, -2.15))
        self.play(FadeIn(ch0, scale=0.7), run_time=0.2)
        self.au("à chaque", FadeIn(l2, shift=UP * 0.12), rt=0.25)
        self.attendre_voix(marge=0.15)
        self.vider(garder)

        # ── 01 : le jeu ──
        self.dire("01-jeu")
        c = Coffre(1.8).en(-0.9, 0.78)
        v_eg = Voyant("=", EGAL).move_to(P(X_LAMPE_EG, Y_LAMPE))
        v_x = Voyant("x", INCONNUE).move_to(P(X_LAMPE_X, Y_LAMPE))
        carte = RoundedRectangle(width=4.05, height=2.85, corner_radius=0.18, fill_color="#0b1220", fill_opacity=1,
                                 stroke_color="#334155", stroke_width=2).move_to(P(0, -1.25))
        self.play(FadeIn(c), FadeIn(v_eg), FadeIn(v_x), FadeIn(carte), run_time=0.08)

        def vider_manche(*m):
            self.play(FadeOut(VGroup(*m)), v_eg.eteindre(), v_x.eteindre(), run_time=0.25)

        # manche 1 : 2 + 7 = 9 ; il manque la lettre
        e, tv, r = self.manche("2 + 7 = 9", "2 plus 7 égale 9", "Pas d'équation", "Pas d'", 1, PIEGE,
                               [("il n'y a pas", 1), ("de lettre.", 1)], [v_eg.allumer()])
        ba = self.barrer(v_x.txt)
        self.play(v_x.manque(), Create(ba), run_time=0.25)
        self.wait(0.2)
        vider_manche(e, tv, r, ba)

        # manche 2 : 3x + 5 ; il manque le signe égal
        e, tv, r = self.manche("3x + 5", "3 x plus 5", "Pas d'équation", "Pas d'", 2, PIEGE,
                               [("il n'y a pas", 2), ("de signe égal.", 1)], [v_x.allumer()])
        ba = self.barrer(v_eg.txt)
        self.play(v_eg.manque(), Create(ba), run_time=0.25)
        self.wait(0.2)
        vider_manche(e, tv, r, ba)

        # manche 3 : x + 4 = 9 ; les deux, le coffre s'ouvre
        e, tv, r = self.manche("x + 4 = 9", "x plus 4 égale 9", "Équation", "Équation :", 1, VERT_OK,
                               [("un signe égal", 1), ("et une lettre !", 1)], [v_eg.allumer(), v_x.allumer()])
        an, _ = c.afficher("x", INCONNUE)
        self.play(*c.ouvrir(0.3), an, run_time=0.5)
        self.play(Flash(c.lueur, color=OR, line_length=0.25, flash_radius=0.9), run_time=0.35)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) ──
        def avant(sc):
            sc.eq8 = sc.eq_dans_q(0, "8 = y − 1", "8 égale y moins 1", fs=44)

        def apres(sc):
            sc.rep(0)
            sc.rep(1, avec=[sc.eq8.egal.animate.set_color(EGAL)])
            sc.rep(2)
            sc.insister(sc.eq8.x[0], 1.5, 0.2)
            sc.rep_fin()

        self.question_pause("01q-question", "01r-reponse", ["8 = y − 1", "c'est une équation ?"],
                            [T("oui", 30), T("non", 30), T("seulement à l'envers", 30)], 0,
                            ["Réponse A : oui.", "Il y a un signe égal et une lettre.", "L'inconnue peut être à droite."],
                            avant_q=avant, autres_r=apres)
        self.vider(garder)

        # ── 02 : la question en commentaire ──
        self.dire("02-question")
        pa = T("Parmi", 30, CIEL).move_to(P(0, 2.08))
        self.au("Parmi", FadeIn(pa, shift=DOWN * 0.1), rt=0.25)
        e1 = Eq("6 × 2 = 12", 46).move_to(P(0, 1.5))
        e2 = Eq("4n − 1", 46).move_to(P(0, 0.75))
        e3 = Eq("4n = 20", 46).move_to(P(0, 0.0))
        self.dire_eq(e1, "6 fois 2 égale 12")
        self.dire_eq(e2, "4 n moins 1")
        self.dire_eq(e3, "4 n égale 20")
        la = self.tx("laquelle est une équation ?", 30).move_to(P(0, -0.75))
        c2 = Coffre(1.2).en(0, -1.72)
        self.au("laquelle", FadeIn(la, shift=UP * 0.12), FadeIn(c2, scale=0.8), rt=0.3)
        self.appel_commentaire(-2.48)

        # ── 03 : la fin standard ──
        self.fin_short("03-abonne", [m for m in self.mobjects if m is not margo])
