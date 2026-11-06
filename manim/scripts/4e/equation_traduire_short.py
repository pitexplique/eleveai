# equation_traduire_short.py
# EleveAI — Maths 4e — série ÉQUATIONS, épisode 02, le SHORT ceinture BLANCHE
# « Traduis avant moi ! » : la course phrase → équation.
#   · EN HAUT, l'image : deux coureurs (toi et Ti-Margo) vers le drapeau, le chrono ;
#   · EN BAS, au même instant : la phrase, puis l'équation quand le chrono finit ;
#   · 1 question-pause (3 s) : le double de x vaut 14 ;
#   · fin : l'équation à écrire en commentaire, puis la fin standard.
# Micro : equation_traduire. Centres : cinema-series.
#
# ⭐ Le jeu demande un vrai temps de recherche, mais le WAV n'en laisse pas entre la
# phrase et l'équation : les MOTS ne changent pas, le script INSÈRE un silence (WAV
# dérivé dans media-eq-02-short/voix/, marques décalées) pour que le chrono dure
# vraiment 3 s. Si la voix est regénérée, rien à refaire.
#
# Voix : manim/voix/4e-equation-traduire-short.json (validée, débit −6) ;
# marques : equation_traduire_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/equation_traduire_short.py EquationTraduireShort
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/equation_traduire_short.py EquationTraduireShort -o eleveai-maths-4e-equation-traduire-short --media_dir manim/scripts/4e/media-eq-02-short
# Sortie : manim/sorties/4e/maths/equations/02-traduire/eleveai-maths-4e-equation-traduire-short.mp4

import copy
import sys
import wave
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_traduire import FOND_V, VIOLET, Clap, bloc, rangee  # noqa: E402

ECART_CHRONO = 3.45  # du dernier mot de la phrase à l'équation : 3 s de chrono + les fondus
XD, XF = -1.75, 0.92  # le départ et le drapeau
Y1, Y2 = 1.82, 1.2
YL = (0.36, -0.2, -0.76)
Y_EQ = -1.78


class EquationTraduireShort(ShortEq):
    nom_voix = "4e-equation-traduire-short"
    fichier_marques = "equation_traduire_short_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "blanche"

    # ── le silence inséré dans 01-jeu ───────────────────────────────────────
    def _ancres(self, brutes):
        """(instant de l'équation, silence à y insérer) pour les deux manches."""
        voix = self._textes()["01-jeu"]
        res = []
        for p in (voix.find("x plus"), voix.find("3 x égale")):
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
        dest = ICI / "media-eq-02-short" / "voix"
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

    # ── une manche : la phrase, 3 s où ils courent, l'équation au drapeau ───
    def manche(self, lignes, s, phrase_eq):
        ls = []
        for txt, y in zip(lignes, YL):
            e = Eq(txt, 36, lettres="").move_to(P(0, y))
            self.dire_eq(e, txt, echelle=1.0, rt=0.14)
            ls.append(e)
        v1, v2 = (XF - XD - 0.28) / 3.0, (XF - XD - 0.6) / 3.0  # Ti-Margo s'arrête devant le mât
        ch = self.chrono(3, r=0.38, fs=34).move_to(P(1.62, (Y1 + Y2) / 2))
        self.play(FadeIn(ch, scale=0.7), run_time=0.08)
        self.margo_c.add_updater(lambda m, dt: m.shift(RIGHT * v1 * dt))
        self.moi_c.add_updater(lambda m, dt: m.shift(RIGHT * v2 * dt))
        ch.jouer(self)
        self.margo_c.clear_updaters()
        self.moi_c.clear_updaters()
        q = Eq(s, 44).move_to(P(0, Y_EQ))
        q.egal.set_color(EGAL)
        self.dire_eq(q, phrase_eq, avec=[FadeOut(ch)])
        cad = self.encadrer_c(q)
        self.play(Create(cad), Flash(self.drapeau.get_top(), color=VERT_OK, line_length=0.15, flash_radius=0.3), run_time=0.3)
        return VGroup(*ls, q, cad)

    def encadrer_c(self, m):
        return SurroundingRectangle(m, color=VERT_OK, buff=0.24, corner_radius=0.1, stroke_width=4)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Tu parles français ?", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au("Tu parles", Write(titre), rt=0.5)
        c = Clap(1.1).move_to(P(-1.35, 1.45))
        bulle = RoundedRectangle(width=2.35, height=0.85, corner_radius=0.25, stroke_color=CIEL, stroke_width=3).move_to(P(0.68, 1.45))
        queue = Polygon(P(-0.05, 1.05), P(0.2, 1.05), P(-0.25, 0.8), stroke_color=CIEL, stroke_width=3)
        queue.shift(RIGHT * 0.18)
        self.play(FadeIn(c, scale=0.7), Create(bulle), Create(queue), run_time=0.2)
        fr = T("français", 34, CIEL).move_to(bulle)
        self.au("français", FadeIn(fr, scale=1.2), rt=0.25)
        l1 = Eq("Alors tu sais écrire", 30, lettres="").move_to(P(0, 0.25))
        l2 = Eq("une équation.", 34, INCONNUE, lettres="").move_to(P(0, -0.35))
        self.dire_eq(l1, "Alors tu sais écrire", echelle=1.0, rt=0.14)
        self.dire_eq(l2, "une équation.", echelle=1.0, rt=0.14)
        tr = self.tx("Traduis avant moi !", 34, VERT_OK, True).scale_to_fit_width(3.6).move_to(P(0, -1.45))
        self.au("Traduis", FadeIn(tr, scale=1.3), rt=0.3)
        self.insister(tr, 1.12, 0.2)
        self.attendre_voix(marge=0.25)
        self.vider(garder)

        # ── 01 : la course ──
        self.dire("01-jeu")
        pistes = VGroup(*[Line(P(XD - 0.18, y - 0.26), P(XF + 0.1, y - 0.26), color="#475569", stroke_width=3) for y in (Y1, Y2)])
        self.drapeau = VGroup(Line(P(XF, Y2 - 0.3), P(XF, Y1 + 0.42), color=WHITE, stroke_width=4),
                              Polygon(P(XF, Y1 + 0.42), P(XF + 0.38, Y1 + 0.27), P(XF, Y1 + 0.12), fill_color=VERT_OK,
                                      fill_opacity=1, stroke_width=0))
        self.margo_c = MascotteMargouillat().scale_to_fit_height(0.46).move_to(P(XD, Y1))
        self.moi_c = personne(peau="#e0ac69", tenue="#db2777", longs=True, s=0.36)
        self.moi_c.scale_to_fit_height(0.5).move_to(P(XD, Y2))
        carte = RoundedRectangle(width=4.05, height=3.2, corner_radius=0.18, fill_color="#0b1220", fill_opacity=1,
                                 stroke_color="#334155", stroke_width=2).move_to(P(0, -0.85))
        self.play(FadeIn(pistes), FadeIn(self.drapeau), FadeIn(self.margo_c), FadeIn(self.moi_c), FadeIn(carte), run_time=0.08)
        m1 = self.manche(["Un nombre", "augmenté de 3", "vaut 11 :"], "x + 3 = 11", "x plus 3 égale 11.")
        self.wait(0.3)
        self.play(FadeOut(m1), self.margo_c.animate.move_to(P(XD, Y1)), self.moi_c.animate.move_to(P(XD, Y2)), run_time=0.3)
        m2 = self.manche(["Le triple", "d'un nombre", "vaut 21 :"], "3x = 21", "3 x égale 21.")
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) ──
        def avant(sc):
            sc.eq_dans_q(0, "Le double de x vaut 14.", "Le double de x vaut 14.", lettres="x", fs=36)

        def apres(sc):
            sc.rep(0)
            sc.rep(1)
            sc.rep(2)
            sc.rep_fin()

        self.question_pause("01q-question", "01r-reponse", ["Le double de x vaut 14."],
                            [Eq("x + 2 = 14", 30), Eq("2x = 14", 30), Eq("x = 28", 30)], 1,
                            ["Réponse B.", "Le double,", "c'est 2 fois."], avant_q=avant, autres_r=apres)
        self.vider(garder)

        # ── 02 : la question en commentaire ──
        self.dire("02-question")
        a = Eq("Le triple de x", 34, lettres="x").move_to(P(0, 1.85))
        b = Eq("augmenté de 4", 34, lettres="").move_to(P(0, 1.25))
        d = Eq("vaut 19.", 34, lettres="").move_to(P(0, 0.65))
        bx = [bloc(0.95, "x", h=0.62, fs=32) for _ in range(3)]
        q = bloc(0.75, "4", h=0.62, fond=FOND_V, fs=30, audit=False)
        r = rangee(*bx, q, x0=-1.8, y=-0.2)
        self.dire_eq(a, "Le triple de x", echelle=1.0, rt=0.14)
        self.play(*[FadeIn(k, shift=UP * 0.15) for k in bx], run_time=0.2)
        self.dire_eq(b, "augmenté de 4", echelle=1.0, rt=0.14)
        self.play(FadeIn(q, shift=LEFT * 0.3), run_time=0.2)
        self.dire_eq(d, "vaut 19.", echelle=1.0, rt=0.14)
        yf = -0.8
        fl = DoubleArrow(P(-1.8, yf), P(r.get_right()[0], yf), color=WHITE, stroke_width=4, buff=0, tip_length=0.16)
        # la flèche porte sa valeur, comme la timeline de la paysage
        v = T("19", 30, WHITE, gras=True)
        lab = VGroup(BackgroundRectangle(v, color=BLACK, fill_opacity=1, buff=0.06), v).move_to(fl)
        self.play(GrowFromCenter(fl), FadeIn(lab, scale=1.3), run_time=0.2)
        e = self.tx("Écris l'équation", 38, JAUNE_TITRE, True).move_to(P(0, -1.35))
        self.au("Écris", FadeIn(e, scale=1.15), rt=0.3)
        ap = self.tx("en commentaire !", 34, VERT_OK, True).scale_to_fit_width(3.6).move_to(P(0, -2.0))
        self.au("en commentaire", FadeIn(ap, scale=0.7), rt=0.3)
        self.insister(ap, 1.1, 0.25)
        self.attendre_voix(marge=1.0)

        # ── 03 : la fin standard ──
        self.fin_short("03-abonne", [m for m in self.mobjects if m is not margo])
