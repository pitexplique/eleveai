# equation_commun.py
# EleveAI — Maths 4e — série « Équations » (épisodes 01 à 07, 05/11/2026) : les
# OUTILS COMMUNS. Pas de scène ici. Créé par le pilote (01-reconnaitre).
# ⛔ LECTURE SEULE pour les épisodes 02 à 07 : ce qui manque se complète dans
# TON script, et se signale dans manim/rapports-equations.md.
#
# USAGE
#   ICI = Path(__file__).resolve().parent
#   sys.path.insert(0, str(ICI))
#   from equation_commun import *      # importe aussi tout prop_commun
#   class EquationTraduire4e(PaysageEq):
#       nom_voix = "4e-equation-traduire"
#       fichier_marques = "equation_traduire_marques.json"   # à côté de TON script
#       ceinture = "jaune"
#
# MARQUES : scripts/marques_dump.ps1 (débit −6) donne un .cues.tsv ; scripts/
# cues2marques.py perd le second mot des cues doubles (« 3 x », « 2 égale ») :
# prends plutôt `python manim/scripts/4e/equation_commun.py <voix.json> <cues.tsv>
# <sortie.json>` (ce fichier, lancé seul) : il date les deux mots. Il est sûr :
# il ne touche que <sortie.json>.
#
# CODE COULEUR (constant dans toute la série)
#   INCONNUE bleu · OPERATION orange (ce qu'on fait des deux côtés) · VERT_OK
#   juste · PIEGE rouge · EGAL jaune (le signe = quand on le montre).
#
# ÉCRITURE D'UNE ÉQUATION : Eq("3x + 2 = 11", fs=60)
#   · espaces = ceux de l'écran ; « 2x » s'écrit `2x`, « 2 fois, entre
#     parenthèses, x plus 3 » s'écrit `2(x + 3)`, la division « ÷ », jamais une barre ;
#   · chaque ATOME (nombre, lettre, signe) est un vrai Text, sans_synchro, vu par
#     l'audit : e.atomes[i] ; les lettres inconnues (xytn) sont bleues ;
#   · e.egal, e.x (VGroup des inconnues), e.gauche, e.droite (les membres),
#     e.mis_sur_egal(x, y) place le = en (x, y) : c'est CE point qui reste
#     aligné d'une ligne à l'autre ;
#   · e.sans_audit() : un rappel déjà dit, ou une donnée de figure.
#
# LA POSE AU MOT : self.dire_eq(e, "3 x plus 2 égale 11", n=1)
#   Chaque atome apparaît sur SON mot, en suivant la phrase donnée (extrait exact
#   de la voix, n-ième occurrence). Un atome sans mot dans cette phrase (la
#   parenthèse, un « = » non dit) part avec son voisin. Mots connus : table PAROLE.
#   Options : `avec=[anims]` jouées avec le premier atome ; `sauf=[atomes]` déjà à
#   l'écran ; `echelle=1.0` sans effet de zoom.
#   ⭐ Marche aussi pour une PHRASE : Eq("3 fois le code,", lettres="") se pose mot
#   à mot, ponctuation comprise (c'est la méthode quand une ligne porte des nombres).
#
# LIGNES DE CALCUL : self.transformer(a, b) : la ligne a DEVIENT la ligne b (les
#   deux construites avec mis_sur_egal à la même abscisse : le = ne bouge pas en
#   x). Sans pose au mot : à appeler au mot voulu, et b.sans_audit() si besoin.
#
# BALANCE : b = Balance(largeur=4.6, centre=P(-3.4, -0.2))
#   self.add(b) ou FadeIn(b) ; c = Charge("x", INCONNUE) ou Charge("4 kg") ;
#   self.play(b.poser("g", c)) pose sur le plateau gauche ("d" = droit) ;
#   self.play(b.incliner(0.12)) penche (angle > 0 : la gauche descend ; 0 =
#   équilibre) ; self.play(*b.retirer([c1], [c2])) : l'opération des deux côtés
#   (les charges passent en orange et s'envolent, l'équilibre reste).
#   ⚠️ Les charges ne sont PAS des sous-objets de b : pour effacer, b.tout() .
#
# TABLEAU D'ESSAIS : t = TableauEssais(["On essaie", "On calcule", "Vrai ?"],
#   [1.5, 3.6, 1.9], n=2, centre=P(1.8, 0.2)) ; FadeIn(t) ; t.case(r, c) = le centre
#   de la case (r = 0 : 1re ligne d'essai), t.placer(mob, r, c) l'y met,
#   t.oui(r) / t.non(r) : la coche verte / la croix rouge (à droite dans la
#   dernière colonne). Les nombres se posent avec dire_eq.
#
# MÉTIER : Metier(["Salma conçoit", "des escape games"], peau=…, tenue=…, longs=True,
#   s=0.7) : .perso (le personnage), .nom (les lignes de Text, à poser au mot).
#
# QUESTION-PAUSE : self.question_pause(cle_q, cle_r, ["ligne"], [choix ×3], bonne,
#   ["phrase"], avant_q=f, autres_r=g, mot_q=None)
#   · chaque choix est un texte ou une Eq : posé AU MOT, atome par atome (pas de
#     nombre avant la voix, contrairement à la version J2) ;
#   · self.eq_dans_q(i, "8 = y − 1", "8 égale y moins 1") (dans avant_q) : la ligne
#     i de la question écrite en Eq, au mot ;
#   · self.cartes_q, self.ph_q, self.q_q ; rep()/rep_fin() comme le lot C.
#
# AILLEURS : self.au("mot", *anims, n=1, rt=0.35) ; self.barrer(m) ;
#   self.chrono(3) ; self.verdict("Équation", VERT_OK) ;
#   Short : self.fin_short(voix, a_effacer), self.appel_commentaire(y), self.tx(…).
#   Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run … (AuditSynchro).

import re
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parent / "6e"))

if __name__ != "__main__":
    from prop_commun import *  # noqa: E402,F403
    from mascotte import MascotteMargouillat  # noqa: E402,F401

    INCONNUE = BLEU_CALCUL
    OPERATION = ORANGE_RETENUE
    PIEGE = ROUGE_ERREUR
    EGAL = JAUNE_TITRE
    CIEL = "#93c5fd"

    PAROLE = {"+": "plus", "−": "moins", "=": "égale", "×": "fois", "÷": "divisé", "≠": "différent"}
    _ATOMES = re.compile(r"\d+(?:,\d+)?|[A-Za-zÀ-ÿ]+|[^\s]")

    def T(s, fs=40, c=WHITE, audit=True, gras=False):
        """Un texte posé AU MOT par le script ; audit=False : rappel, donnée de figure."""
        t = Text(s, font_size=fs, color=c, weight=BOLD if gras else NORMAL)
        t.sans_synchro = True
        if not audit:
            t._pas_audit = True
        return t

    class Eq(VGroup):
        """Une équation en Text : voir l'en-tête du module."""

        def __init__(self, s, fs=60, couleur=WHITE, lettres="xytn", inconnue=None, audit=True, **kw):
            super().__init__(**kw)
            self.s, self.fs = s, fs
            inconnue = inconnue or INCONNUE
            ref = Text(s, font_size=fs)
            assert len(ref.submobjects) == sum(1 for c in s if not c.isspace()), s
            self.atomes, k = [], 0
            for m in _ATOMES.finditer(s):
                mot = m.group(0)
                boite = VGroup(*ref.submobjects[k:k + len(mot)])
                k += len(mot)
                c = inconnue if mot in lettres else couleur
                a = T(mot, fs, c, audit).move_to(boite)
                self.atomes.append(a)
                self.add(a)
            self.egal = next((a for a in self.atomes if a.original_text == "="), None)
            self.x = VGroup(*[a for a in self.atomes if a.original_text in lettres])
            if self.egal is not None:
                i = self.atomes.index(self.egal)
                self.gauche, self.droite = VGroup(*self.atomes[:i]), VGroup(*self.atomes[i + 1:])

        def sans_audit(self):
            for a in self.atomes:
                a._pas_audit = True
            return self

        def mis_sur_egal(self, x, y):
            """Place la ligne pour que son = soit en (x, y)."""
            self.shift(P(x, y) - self.egal.get_center())
            return self

    class Charge(VGroup):
        """Ce qu'on pose sur un plateau : une boîte et son texte (.texte)."""

        def __init__(self, s, couleur=WHITE, fs=30, w=None, audit=True, **kw):
            super().__init__(**kw)
            self.texte = T(s, fs, couleur, audit)
            w = w or max(0.62, self.texte.width + 0.26)
            self.boite = RoundedRectangle(width=w, height=0.62, corner_radius=0.08, stroke_color=couleur,
                                          stroke_width=3, fill_color="#0b1220", fill_opacity=1)
            self.texte.move_to(self.boite)
            self.add(self.boite, self.texte)

    class Balance(VGroup):
        """La balance à deux plateaux : voir l'en-tête du module."""

        def __init__(self, largeur=4.6, hauteur=2.7, couleur="#94a3b8", centre=ORIGIN, **kw):
            super().__init__(**kw)
            self.demi = largeur / 2 * 0.86
            self.angle = 0.0
            self.sur = {"g": [], "d": []}
            piv = P(0, hauteur / 2)
            self.socle = VGroup(
                Line(P(0, -hauteur / 2), piv, color=couleur, stroke_width=7),
                RoundedRectangle(width=largeur * 0.38, height=0.16, corner_radius=0.05, fill_color=couleur,
                                 fill_opacity=1, stroke_width=0).move_to(P(0, -hauteur / 2)))
            self.axe = Dot(piv, radius=0.1, color=WHITE)
            self.fleau = Line(piv + LEFT * self.demi, piv + RIGHT * self.demi, color=WHITE, stroke_width=7)
            self.plat = {c: self._plateau(largeur, couleur) for c in "gd"}
            self.add(self.socle, self.plat["g"], self.plat["d"], self.fleau, self.axe)
            self._k = 1.0
            self._placer(0.0)
            self.move_to(centre)

        def scale(self, f, **kw):
            self._k = getattr(self, "_k", 1.0) * f
            return super().scale(f, **kw)

        def _plateau(self, largeur, couleur):
            w = largeur * 0.36
            plat = Line(LEFT * w / 2, RIGHT * w / 2, color=couleur, stroke_width=7)
            h = 0.95
            haut = UP * h
            cordes = VGroup(Line(haut, LEFT * w / 2, color=couleur, stroke_width=2),
                            Line(haut, RIGHT * w / 2, color=couleur, stroke_width=2))
            g = VGroup(cordes, plat)
            g.plat, g.h = plat, h
            return g

        def _bout(self, cote, a):
            s = -1 if cote == "g" else 1
            d = self.demi * self._k
            # angle > 0 : la gauche descend
            return self.axe.get_center() + np.array([s * d * np.cos(a), s * d * np.sin(a), 0.0])

        def _placer(self, a):
            self.fleau.put_start_and_end_on(self._bout("g", a), self._bout("d", a))
            for c in "gd":
                gr = self.plat[c]
                d = self._bout(c, a) - gr[0][0].get_start()
                gr.shift(d)
                for m in self.sur[c]:
                    m.shift(d)
            self.angle = a

        def tout(self):
            """La balance ET ses charges (pour effacer ou déplacer le tout)."""
            return Group(self, *self.sur["g"], *self.sur["d"])

        def incliner(self, a, run_time=0.6):
            depart, moi = self.angle, self

            def maj(_, t):
                moi._placer(depart + (a - depart) * t)

            return UpdateFromAlphaFunc(self.tout(), maj, run_time=run_time, rate_func=smooth, suspend_mobject_updating=False)

        def _ranger(self, cote):
            lst, plat = self.sur[cote], self.plat[cote].plat
            if not lst:
                return
            g = VGroup(*lst).arrange(RIGHT, buff=0.06)
            if g.width > plat.width - 0.08:
                g.scale_to_fit_width(plat.width - 0.08)
            g.next_to(plat, UP, buff=0.04)

        def poser(self, cote, *charges):
            """L'animation qui pose les charges (renvoyée, à jouer)."""
            self.sur[cote] += list(charges)
            self._ranger(cote)
            return AnimationGroup(*[FadeIn(c, shift=DOWN * 0.4) for c in charges])

        def retirer(self, de_g, de_d, run_time=0.6):
            """L'opération des deux côtés : orange, puis ça s'envole, l'équilibre reste."""
            anims = []
            for cote, lst in (("g", de_g), ("d", de_d)):
                for c in lst:
                    self.sur[cote].remove(c)
                    anims.append(c.animate(run_time=run_time).set_color(OPERATION).shift(UP * 1.1).set_opacity(0))
            return anims

    class TableauEssais(VGroup):
        """Le tableau d'essais : on essaie x =, on calcule, oui / non."""

        def __init__(self, entetes, largeurs, n=2, h=0.8, fs=30, centre=ORIGIN, audit=True, **kw):
            super().__init__(**kw)
            self.largeurs, self.h, self.n = largeurs, h, n
            W, H = sum(largeurs), h * (n + 1)
            self.cadre = RoundedRectangle(width=W, height=H, corner_radius=0.1, stroke_color="#64748b",
                                          stroke_width=3, fill_color="#0b1220", fill_opacity=1)
            bande = Rectangle(width=W - 0.04, height=h - 0.04, stroke_width=0, fill_color="#1e293b",
                              fill_opacity=1).move_to(self.cadre.get_top() + DOWN * h / 2)
            traits = VGroup()
            x = -W / 2
            for lg in largeurs[:-1]:
                x += lg
                traits.add(Line(P(x, H / 2), P(x, -H / 2), color="#475569", stroke_width=2))
            for r in range(n):
                y = H / 2 - h * (r + 1)
                traits.add(Line(P(-W / 2, y), P(W / 2, y), color="#475569", stroke_width=2))
            self.tetes = VGroup()
            self.add(self.cadre, bande, traits)
            self.move_to(centre)
            for c, s in enumerate(entetes):
                t = T(s, fs, JAUNE_TITRE, audit).move_to(self._centre(-1, c))
                if t.width > largeurs[c] - 0.15:
                    t.scale_to_fit_width(largeurs[c] - 0.15)
                self.tetes.add(t)
            self.add(self.tetes)

        def _centre(self, r, c):
            coin = self.cadre.get_corner(UL)
            return coin + np.array([sum(self.largeurs[:c]) + self.largeurs[c] / 2, -self.h * (r + 1.5), 0.0])

        def case(self, r, c):
            return self._centre(r, c)

        def placer(self, m, r, c):
            if m.width > self.largeurs[c] - 0.2:
                m.scale_to_fit_width(self.largeurs[c] - 0.2)
            return m.move_to(self._centre(r, c))

        def oui(self, r, c=None, taille=0.2):
            c = len(self.largeurs) - 1 if c is None else c
            k = VMobject(stroke_color=VERT_OK, stroke_width=7)
            k.set_points_as_corners([P(-taille, 0), P(-taille * 0.25, -taille * 0.75), P(taille, taille * 0.8)])
            return k.move_to(self._centre(r, c) + RIGHT * (self.largeurs[c] / 2 - 0.34))

        def non(self, r, c=None, taille=0.17):
            c = len(self.largeurs) - 1 if c is None else c
            o = self._centre(r, c) + RIGHT * (self.largeurs[c] / 2 - 0.34)
            return VGroup(Line(o + P(-taille, taille), o + P(taille, -taille)),
                          Line(o + P(-taille, -taille), o + P(taille, taille))).set_stroke(PIEGE, 7)

    class Metier(VGroup):
        """Le pictogramme métier : .perso et .nom (lignes de Text, centrées au-dessus)."""

        def __init__(self, lignes, fs=28, couleur=None, peau="#c68642", tenue="#6366f1", cheveux="#1f2937",
                     longs=False, s=0.7, **kw):
            super().__init__(**kw)
            self.perso = personne(peau=peau, tenue=tenue, cheveux=cheveux, longs=longs, s=s)
            self.nom = VGroup(*[T(x, fs, couleur or CIEL) for x in lignes]).arrange(DOWN, buff=0.07)
            self.nom.next_to(self.perso, UP, buff=0.15)
            self.add(self.perso, self.nom)

    class _OutilsEq:
        """Ce que la paysage et le short partagent."""

        def au(self, extrait, *anims, n=1, rt=0.35):
            """Au mot `extrait` (n-ième fois), joue les animations."""
            self.au_mot(extrait, n)
            if anims:
                self.play(*anims, run_time=rt)

        def _t_pos(self, pos):
            return max([x[1] for x in self._marques().get(self._cle_voix) if x[0] <= pos] or [0.0])

        def _attendre_pos(self, pos):
            reste = self._debut_voix + self._t_pos(pos) - self.renderer.time
            if reste < -0.3:
                print(f"RETARD {self._cle_voix} position {pos} : {-reste:.2f} s", flush=True)
            if reste > 0.02:
                self.wait(reste)

        def _plan_eq(self, e, debut, fin, sauf=()):
            """(position dans la voix, atomes) : chaque atome sur SON mot."""
            voix, cur = self._texte_voix, debut
            plan = []
            for a in e.atomes:
                if any(a is x for x in sauf):
                    continue
                mot = PAROLE.get(a.original_text, a.original_text)
                m = re.compile(r"(?<![\w,])" + re.escape(mot) + r"(?![\w])", re.I).search(voix, cur, fin)
                if m is None:
                    plan.append((None, a))
                else:
                    plan.append((m.start(), a))
                    cur = m.end()
            lots = []
            for pos, a in plan:
                if pos is not None:
                    lots.append([pos, [a]])
                elif a.original_text in ")],.:;?!" and lots:  # avec le voisin de gauche
                    lots[-1][1].append(a)
                else:  # avec le voisin de droite
                    lots.append([None, [a]])
            for k in range(len(lots) - 2, -1, -1):
                if lots[k][0] is None:
                    lots[k + 1][1] = lots[k][1] + lots[k + 1][1]
                    lots[k][1] = []
            return [lot for lot in lots if lot[1] and lot[0] is not None]

        def dire_eq(self, e, phrase=None, n=1, rt=0.22, avec=(), depuis=None, sauf=(), echelle=1.3):
            """Pose l'équation e atome par atome, au mot (voir l'en-tête)."""
            voix = self._texte_voix
            if phrase is None:
                debut, fin = depuis, len(voix)
            else:
                debut = -1
                for _ in range(n):
                    debut = voix.find(phrase, debut + 1)
                    if debut < 0:
                        raise ValueError(f"« {phrase} » (n = {n}) absent de la voix {self._cle_voix}")
                fin = debut + len(phrase)
            lots = self._plan_eq(e, debut, fin, sauf)
            if not lots:
                raise ValueError(f"rien de dit pour {e.s} dans « {phrase} »")
            for k, (pos, atomes) in enumerate(lots):
                self._attendre_pos(pos)
                d = rt
                if k + 1 < len(lots):
                    gap = self._debut_voix + self._t_pos(lots[k + 1][0]) - self.renderer.time
                    d = max(0.08, min(rt, gap - 0.01))
                self.play(*(list(avec) if k == 0 else []), *[FadeIn(a, scale=echelle) for a in atomes], run_time=d)

        def transformer(self, a, b, rt=0.5):
            """La ligne a DEVIENT la ligne b, le = reste aligné."""
            self.play(ReplacementTransform(a, b), run_time=rt)  # TransformMatchingShapes recentrerait b : le = bougerait

        def chrono(self, duree=3, r=0.36, fs=34):
            """Un compte à rebours qui n'attend aucun mot de la voix (son chiffre,
            sinon, attendrait le même nombre dans la phrase) : chrono(3).jouer(self)."""
            ch = CompteARebours(duree, r=r, fs=fs)
            for f in ch.get_family():
                f.sans_synchro = True
                f._pas_audit = True
            return ch

        def verdict(self, s, couleur=None, fs=34):
            """Le tampon encadré, posé au mot par le script (n'attend rien)."""
            v = self.tampon(s, couleur or VERT_OK, fs)
            v.texte.sans_synchro = True
            return v

        def barrer(self, m, couleur=None, sw=6):
            return Line(m.get_corner(DL) + P(-0.08, -0.05), m.get_corner(UR) + P(0.08, 0.05),
                        color=couleur or PIEGE, stroke_width=sw)

        def poser_carte(self, carte, mot):
            """Une carte de choix : la carte et sa lettre au mot « A : », le choix à SES mots."""
            voix = self._texte_voix
            self.au_mot(mot)
            i = voix.find(mot) + len(mot)
            self.play(FadeIn(carte[0]), FadeIn(carte[1][0], shift=RIGHT * 0.15), run_time=0.22)
            corps = carte[1][1]
            if isinstance(corps, Eq):
                self.dire_eq(corps, depuis=i)
            else:
                self._attendre_pos(i + 1)
                self.play(FadeIn(corps, shift=RIGHT * 0.15), run_time=0.22)

        def _disposer_q(self, question, choix, phrase):
            r = super()._disposer_q(question, choix, phrase)
            self.q_q = r[1]
            return r

        def eq_dans_q(self, i, s, phrase, n=1, fs=None, lettres="xytn", couleur=WHITE):
            """Dans avant_q : la ligne i de la question devient une Eq, posée au mot."""
            ref = self.q_q[i]
            e = Eq(s, fs or 34, couleur=couleur, lettres=lettres)
            e.scale_to_fit_height(ref.height).move_to(ref)
            self.q_q.remove(ref)
            self.dire_eq(e, phrase, n)
            return e

        def question_pause(self, cle_q, cle_r, question, choix, bonne, phrase, mots_choix=("A :", "B :", "C :"),
                           autres_q=None, autres_r=None, mot_q=None, avant_q=None):
            """La question-pause de la série : voir l'en-tête du module."""
            self.dire(cle_q)
            t0 = self.renderer.time
            tete, q, cartes, pause, rebours, ph = self._disposer_q(question, choix, phrase)
            for f in rebours.get_family():  # son chiffre n'attend aucun mot de la voix
                f.sans_synchro = True
            # L'anneau ne touche jamais la question : s'il descend dessus, il rétrécit vers le haut.
            if len(q.submobjects) and rebours.get_right()[0] > q.get_left()[0] and rebours.get_left()[0] < q.get_right()[0]:
                trop = q.get_top()[1] + 0.2 - rebours.get_bottom()[1]
                if trop > 0:
                    rebours.scale(max(0.6, (rebours.height - trop) / rebours.height), about_point=rebours.get_top())
            self.au_mot("Question")
            self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
            if avant_q:
                avant_q(self)
            if mot_q:
                self.au_mot(mot_q)
            if len(q.submobjects):
                self.poser_lignes(q, "up", 0.35)
            for c, mot in zip(cartes, mots_choix):
                self.poser_carte(c, mot)
            if autres_q:
                autres_q(self)
            self.au_mot("Mets pause")
            self.play(FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.4)
            self.attendre_voix(marge=0.2)
            rebours.jouer(self)
            print(f"QUESTION {cle_q} t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f}) reponse={bonne}", flush=True)
            self.dire(cle_r)
            b = cartes[bonne]
            corps = b[1][1]
            place = b[0].get_right()[0] - 1.0 - corps.get_left()[0]
            if corps.get_right()[0] > b[0].get_right()[0] - 0.95:
                gauche = corps.get_left()[0]
                corps.scale_to_fit_width(max(0.4, place))
                corps.shift(RIGHT * (gauche - corps.get_left()[0]))
            anims = [b[0].animate.set_stroke(VERT_OK, width=7).set_fill("#052e16", 1),
                     b[1][0][0].animate.set_fill(VERT_OK)]
            anims += [cartes[j].animate.set_opacity(0.3) for j in range(3) if j != bonne]
            self.play(*anims, FadeOut(rebours), FadeOut(pause), run_time=0.16)
            ok = self.coche(VERT_OK, 0.22).move_to(b[0].get_right() + LEFT * 0.33)
            self.play(b.animate.scale(1.08), Create(ok), run_time=0.12)
            self.play(b.animate.scale(1 / 1.08), ok.animate.scale(1 / 1.08, about_point=b.get_center()), run_time=0.12)
            if autres_r:
                autres_r(self)
            if len(ph.submobjects):
                self.poser_lignes(ph, "up", 0.35)
            self.attendre_voix(marge=0.8)
            return t0

    class PaysageEq(_OutilsEq, PaysageProp):
        identite = "Maths 4e — EleveAI"
        ceinture = "jaune"

    class ShortEq(_OutilsEq, ShortProp):
        identite = "Maths 4e — EleveAI"
        ceinture = "blanche"

        def tx(self, s, fs=34, couleur=WHITE, gras=False, audit=True):
            """Un texte posé au mot, borné à la largeur du cadre étroit."""
            t = T(s, fs, couleur, audit, gras)
            if t.width > 3.9:
                t.scale_to_fit_width(3.9)
            return t

        def _disposer_q(self, question, choix, phrase):
            """« Question ! » et le compte à rebours reculent vers la gauche (3 %)."""
            tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
            d = rebours.get_right()[0] - 1.9
            if d > 0:
                tete.shift(LEFT * d)
                rebours.shift(LEFT * d)
            # des cartes plus basses : la phrase de réponse ne descend jamais sur Ti-Margo
            cartes.scale(0.85).next_to(q, DOWN, buff=0.18).set_x(0)
            pause.next_to(cartes, DOWN, buff=0.12).set_x(0)
            ph.next_to(cartes, DOWN, buff=0.12).set_x(0)
            return tete, q, cartes, pause, rebours, ph

        def appel_commentaire(self, y=-2.2):
            self.au_mot("Réponds en commentaire")
            appel = self.borne(self.tx("Réponds en commentaire !", 32, VERT_OK, True), 0.95).move_to(P(0, y))
            self.play(FadeIn(appel, scale=0.7), run_time=0.35)
            self.insister(appel, 1.1, 0.25)
            self.attendre_voix(marge=1.0)
            return appel

        def fin_short(self, voix, a_effacer):
            """La fin du 19/10 (même écran que les shorts Puissances)."""
            self.dire(voix)
            entraine = self.tx("Entraîne-toi sur", 40, JAUNE_TITRE).move_to(P(0, 2.2))
            site = self.tx("eleveai.fr", 54, BLEU_CALCUL).move_to(P(0, 1.25))
            cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.2, stroke_width=3)
            abonne = self.tx("Abonne-toi !", 42, VERT_OK).move_to(P(0, -0.2))
            poignee = self.tx("@eleveai974", 44, VERT_OK, audit=False).move_to(P(0, -1.05))
            self.play(FadeOut(Group(*a_effacer)), run_time=0.3)
            self.play(Write(entraine), run_time=0.4)
            self.au_mot("éleveai")
            self.play(GrowFromCenter(site), Create(cadre), run_time=0.5)
            self.au_mot("abonne-toi")
            self.play(FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), run_time=0.45)
            self.play(Flash(poignee, color=VERT_OK, line_length=0.25))
            self.attendre_voix(marge=1.0)

else:
    # Lancé seul : les cues WinRT → marques qui datent les DEUX mots d'une cue
    # double (« 3 x », « 2 égale ») : python equation_commun.py voix.json cues.tsv sortie.json
    import json

    voix_j, tsv, out = sys.argv[1:4]
    textes = json.load(open(voix_j, encoding="utf-8"))
    res, prec, pos = {}, {}, {}
    for l in open(tsv, encoding="utf-8-sig"):
        l = l.rstrip("\n")
        if not l:
            continue
        cle, t, mot = l.split("\t")
        t = float(t.replace(",", "."))
        raw = textes[cle]
        L = res.setdefault(cle, [])
        if prec.get(cle) == mot and " " in mot:
            i0 = L[-1][0]
            i = raw.find(mot.split()[1], i0 + len(mot.split()[0]))
            if i > i0:
                L.append([i, round(t, 3)])
                pos[cle] = i + len(mot.split()[1])
            prec[cle] = None
            continue
        prec[cle] = mot
        p = pos.get(cle, 0)
        i = raw.find(mot, p)
        if i < 0:
            i = raw.find(mot.split()[0], p)
            if i < 0:
                print("introuvable", cle, mot)
                continue
        if not L or L[-1][0] != i:
            L.append([i, round(t, 3)])
        pos[cle] = i + len(mot.split()[0])
    for k in textes:
        if k not in res:
            print("sans marques", k)
    json.dump(res, open(out, "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
    print({k: len(v) for k, v in res.items()})
