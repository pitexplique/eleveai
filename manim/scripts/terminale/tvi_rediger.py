# tvi_rediger.py
# EleveAI — Maths Tle spé — paysage « Rédiger une justification conforme au bac avec le
# TVI » (16:9), ceinture VERTE. Micro du coach : tvi_rediger (notion continuite_tvi).
# Épisode 4 sur 5 de la série « CONTINUITÉ ET TVI ».
# Centre : jeux-defis (liste fermée lib/videos/centres-interet.ts, tranche 15-18).
#
# Clé de voix → écran :
#   · 00-garde / 01-situation : Yoan a la bonne conclusion et le quart des points ;
#   · 02-idee       : le théorème à gauche, la copie à droite — une hypothèse, une
#                     phrase, sur 2x³ + 3x − 4 sur [0 ; 2] ;
#   · 03-theoreme   : la formule exacte à citer, et le mot « corollaire » ;
#   · 04/04b        : question 1 — à quoi sert « signes contraires » (réponse A) ;
#   · 05-appliquer  : la copie entière sur 2 ln x + x − 4, où la continuité se DÉMONTRE ;
#   · 06-piege      : « croissante », « le TVI » pour l'unicité, l'intervalle oublié ;
#   · 07/07b        : question 2 — la ligne absente de la copie de h (réponse C) ;
#   · 08-rediger    : le modèle à recopier, ses quatre trous ;
#   · 09/09b        : le défi — la copie de Yoan, deux phrases manquantes ;
#   · 10-finale / 11-abonne.
#
# ⚠️ Bonne réponse : 04 → A, 07 → C (tirage graine 2711).
# ⛔⛔ Nombres HORS AUDIT (`self.lettres`). ⛔ Pas de ⩽ ni ⩾ : le socle les refuse.
# ⭐ Cet épisode est presque sans figure : c'est une COPIE qu'on lit. La colonne de
#   gauche porte le théorème, la droite la copie — et les deux s'allument ensemble.
#
# Rendu : python -m manim render -ql --disable_caching manim/scripts/terminale/tvi_rediger.py TviRediger -o eleveai-maths-terminale-tvi-rediger --media_dir manim/scripts/terminale/media

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(1, str(Path(__file__).resolve().parents[2] / "poste2"))

from manim import *

from analyse_ecrans import CompteARebours, EcransAnalyse, P, XL
from charte import *

# ⚠️ TROIS essais mesurés, et c'est le troisième qui tient. Cartes à 2 lignes sur 6,0 :
# le bloc tombait à −2,52 et recouvrait Ti-Margo. Cartes à 1 ligne sur 6,6 : la carte C
# (37 caractères) descendait à 18,9 px. Cartes à 2 lignes sur 6,6 depuis x = 0 : les
# trois cartes à 28 px pleins — mais avec TROIS lignes d'énoncé le bloc tombait encore
# à −2,55. L'énoncé passe donc à DEUX lignes de 26 px : c'est la seule combinaison des
# quatre essayées qui garde les cartes pleines ET le bloc au-dessus de Ti-Margo.
Q04 = (["À quoi sert la phrase « f(1) et f(3)", "sont de signes contraires » ?"],
       [("à dire que 0 est", "entre f(1) et f(3)"),
        ("à dire que f", "est continue"),
        ("à dire que f est", "strictement monotone")],
       # ⚠️ 6,6 à partir de x = 0 : à 6,0 la carte C (37 caractères) tombait à 16,8 px.
       {"largeur": 6.6, "xl": 0.0, "fs_enonce": 26}, "A")

# ⚠️ Mesuré : à 4,1 de large, « la valeur approchée » tombait à 17,8 px. La largeur
# décide, pas la police : 5,2 à partir de x = 1,4 rend les trois cartes à leur taille.
Q07 = (["Que manque-t-il", "à cette copie ?"],
       [("la valeur approchée", "de la solution"),
        ("le calcul", "de h(3)"),
        ("la stricte", "monotonie de h")],
       {"largeur": 5.2, "xl": 1.4, "fs_enonce": 30}, "C")


class TviRediger(EcransAnalyse):
    fichier_marques = "tvi_rediger_marques.json"   # WAV faits le 27/11 (-Debit -6 aux deux etapes)
    nom_voix = "terminale-tvi-rediger"

    def page_de_garde(self):
        self.clear()
        self.dire("00-garde")
        self.add_mascotte(scale=0.8)
        titre = self.t("Rédiger le TVI au bac", 46, JAUNE_TITRE, larg=11.6)
        titre.to_edge(UP, buff=0.55)
        ident = self.t(self.identite, 26).next_to(titre, DOWN, buff=0.22)
        coeur = self.t("4 lignes", 86, BLEU_CALCUL).move_to(P(-0.6, 0.7))
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2))
        self.play(FadeIn(coeur))
        self.au_mot("chacune répond à une hypothèse")
        sous = self.t("chacune répond à une hypothèse", 36, ORANGE_RETENUE)
        self.play(FadeIn(sous.move_to(P(-0.6, -0.6)), shift=UP * 0.15))
        self.play(FadeIn(self.echelle().align_to(P(0, -3.45), DOWN)))
        self.attendre_voix(marge=0.5)

    def situation(self):
        self.clear()
        self.dire("01-situation")
        self.add_mascotte(scale=0.6)
        titre = self.t("Yoan relit sa copie", 42, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.6)

        self.au_mot("Il avait écrit la bonne conclusion")
        bonne = self.t("« l'équation admet une unique solution »", 34, VERT_OK)
        self.play(FadeIn(bonne.move_to(P(-0.4, 1.5))))
        self.play(Create(SurroundingRectangle(bonne, color=VERT_OK, buff=0.2,
                                              stroke_width=3)), run_time=0.4)

        self.au_mot("Il a eu le quart des points")
        pts = self.t("le quart des points", 48, ROUGE_ERREUR)
        self.play(FadeIn(pts.move_to(P(-0.4, 0.1)), scale=1.2))

        self.au_mot("Ce qui manquait n'était pas le résultat")
        bas = VGroup(self.t("ce qui manquait n'était pas le résultat —", 32),
                     self.t("c'étaient les phrases qui autorisent à l'écrire", 32,
                            ORANGE_RETENUE))
        bas.arrange(DOWN, buff=0.22).move_to(P(-0.4, -1.5))
        self.play(FadeIn(bas, shift=UP * 0.15), run_time=0.6)
        self.attendre_voix(marge=0.5)

    def idee(self):
        self.clear()
        self.dire("02-idee")
        self.add_mascotte(scale=0.5)
        titre = self.t("Une hypothèse, une phrase", 40, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.5)

        # ⭐ Deux colonnes qui se répondent : le théorème à gauche, la copie à droite.
        th_titre = self.t("le théorème demande", 28, GREY_B)
        # ⚠️ Les NUMÉROS de ligne sont hors audit : la voix dit « le théorème demande
        # trois choses », elle ne les égrène pas « un, deux, trois ».
        hyp = VGroup(self.lettres(self.t("1. f continue", 30, VERT_OK)),
                     self.t("2. f strictement", 30, VERT_OK),
                     self.t("    monotone", 30, VERT_OK),
                     self.t("3. k entre les", 30, VERT_OK),
                     self.t("    deux images", 30, VERT_OK))
        hyp.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        gche = VGroup(th_titre, hyp).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        self.gauche(gche, 0.6, xmax=0.0, x0=-6.4)
        self.play(FadeIn(gche), run_time=0.5)

        self.au_mot("Prenons f de x égale 2 x au cube")
        f_ = self.t("f(x) = 2x³ + 3x − 4  sur [0 ; 2]", 30, BLEU_CALCUL)
        self.play(FadeIn(self.col(f_, 2.5, xl=0.6)))

        phrases = [("f est un polynôme, donc continue", "Première phrase"),
                   ("f ′(x) = 6x² + 3 > 0, donc f est", "Deuxième phrase"),
                   ("strictement croissante", None),
                   ("f(0) = −4, f(2) = 18, et 0 est", "Troisième phrase"),
                   ("compris entre les deux", None)]
        bloc = VGroup(*[self.t(s, 28) for s, _ in phrases])
        bloc.arrange(DOWN, aligned_edge=LEFT, buff=0.2)
        self.col(bloc, 0.3, xl=0.6)
        for l, (_, mot) in zip(bloc, phrases):
            if mot:
                self.au_mot(mot)
            self.play(FadeIn(l, shift=RIGHT * 0.2), run_time=0.3)

        self.au_mot("Une hypothèse, une phrase")
        fin = self.t("une hypothèse, une phrase", 34, ORANGE_RETENUE)
        self.play(FadeIn(self.col(fin, -2.3, xl=0.6), scale=1.1))
        self.attendre_voix(marge=0.5)

    def theoreme(self):
        self.clear()
        self.dire("03-theoreme")
        self.add_mascotte(scale=0.5)
        titre = self.t("La formule exacte", 42, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("elle se cite mot pour mot")
        cite = VGroup(self.t("« d'après le corollaire du théorème", 34, VERT_OK),
                      self.t("des valeurs intermédiaires, l'équation", 34, VERT_OK),
                      self.t("f(x) = 0 admet une unique solution", 34, VERT_OK),
                      self.t("dans l'intervalle [0 ; 2] »", 34, VERT_OK))
        cite.arrange(DOWN, aligned_edge=LEFT, buff=0.2).move_to(P(-0.4, 1.1))
        self.play(FadeIn(cite, shift=RIGHT * 0.2), run_time=0.8)
        self.au_mot("Le mot corollaire compte")
        m = self.t("« corollaire » : sans lui, l'existence seule", 32, ORANGE_RETENUE)
        self.play(FadeIn(m.move_to(P(-0.4, -1.3))))
        self.au_mot("on nomme toujours l'intervalle")
        i = self.t("et on NOMME l'intervalle", 32, BLEU_CALCUL)
        self.play(FadeIn(i.move_to(P(-0.4, -2.3))))
        self.attendre_voix(marge=0.5)

    def question_1(self):
        self.clear()
        self.dire("04-question")
        self.add_mascotte(scale=0.5)
        rap = VGroup(self.t("les 3 hypothèses :", 26, GREY_B),
                     self.t("continuité", 28),
                     self.t("stricte monotonie", 28),
                     self.t("k entre les images", 28))
        rap.arrange(DOWN, aligned_edge=LEFT, buff=0.18)
        self.gauche(rap, 0.0, xmax=-0.4, x0=-6.4)   # ⚠️ les cartes commencent à x = 0
        self.play(FadeIn(rap), run_time=0.4)

        t0 = self.renderer.time
        enonce, choix, kw, _ = Q04
        tete, q, cartes, pause, rebours = self.q_tete(
            [self.t(s, kw.get("fs_enonce", 32)) for s in enonce],
            [self.choix2(*c) for c in choix],
            **{k: v for k, v in kw.items() if k != "fs_enonce"})
        q
        for c in cartes:
            c
        self.play(FadeIn(tete), run_time=0.3)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "04", t0, "A")
        return cartes, pause, rebours, rap

    def reponse_1(self, cartes, pause, rebours, rap):
        self.dire("04b-reponse")
        self.play(FadeOut(rap), run_time=0.2)
        self.q_reponse(cartes, 0, pause, rebours)
        self.au_mot("c'est exactement dire que 0 est compris")
        bloc = VGroup(self.t("signes contraires", 32, VERT_OK),
                      self.t("= 0 entre les deux images", 30, VERT_OK),
                      self.lettres(self.t("c'est la 3ᵉ hypothèse,", 26, GREY_B)),
                      self.t("et rien d'autre", 26, GREY_B))
        bloc.arrange(DOWN, aligned_edge=LEFT, buff=0.18)
        self.gauche(bloc, 0.8, xmax=-0.4, x0=-6.4)
        self.play(FadeIn(bloc))
        self.au_mot("trois phrases, trois rôles")
        bas = self.t("trois phrases, trois rôles", 30, ORANGE_RETENUE)
        self.gauche(bas, -1.9, xmax=-0.4, x0=-6.4)
        self.play(FadeIn(bas))
        self.attendre_voix(marge=0.5)

    def appliquer(self):
        self.clear()
        self.dire("05-appliquer")
        self.add_mascotte(scale=0.5)
        titre = self.t("Une copie complète", 40, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("Soit g de x égale 2 logarithme")
        f_ = self.t("g(x) = 2 ln x + x − 4   sur [1 ; 4]", 34, BLEU_CALCUL)
        self.play(FadeIn(f_.move_to(P(-0.4, 2.3))))

        lignes = [("1. g est la somme d'un logarithme et d'un polynôme,",
                   "Première ligne"),
                  ("    tous deux continus sur ]0 ; +∞[ : g est continue", None),
                  ("2. g ′(x) = 2/x + 1 > 0 : g est strictement croissante",
                   "Deuxième ligne"),
                  ("3. g(1) = −3, g(4) ≈ 2,77, et 0 est entre les deux",
                   "Troisième ligne"),
                  ("4. d'après le corollaire du TVI, g(x) = 0 admet",
                   "Quatrième ligne"),
                  ("    une unique solution sur [1 ; 4]", None)]
        bloc = VGroup(*[self.t(s, 28, larg=11.6) for s, _ in lignes])
        bloc.arrange(DOWN, aligned_edge=LEFT, buff=0.22).move_to(P(-0.4, -0.3))
        for l, (_, mot) in zip(bloc, lignes):
            if mot:
                self.au_mot(mot)
            self.play(FadeIn(l, shift=RIGHT * 0.2), run_time=0.3)
        # ⛔⛔ UN REPÈRE QUI POINTE EN ARRIÈRE : ce bloc était posé sur
        # `au_mot("la continuité se démontre")`, et cette phrase est dite dans la
        # PREMIÈRE phrase du clip (« Appliquons, sur une fonction où la continuité se
        # démontre vraiment »), soit ~2 s. Posé après les quatre lignes de la copie, le
        # repère regardait donc 38 s en arrière : `RETARD 05-appliquer 38,64 s` au dry
        # run du 27/11, le plus gros de la série. Invisible avant les WAV — sans
        # marques, les `au_mot` sont estimés au prorata et rien ne dépasse.
        # ⭐ La règle : les repères d'un écran doivent être CROISSANTS dans le texte de
        # la voix. Le commentaire glose la copie entière, donc il se pose sur la
        # dernière phrase dite, pas sur l'annonce du début.
        self.au_mot("d'après le corollaire")
        c = self.t("ici la continuité se DÉMONTRE, elle ne se récite pas", 28, VERT_OK)
        self.play(FadeIn(c.move_to(P(-0.4, -2.6))))
        self.attendre_voix(marge=0.5)

    def piege(self):
        self.clear()
        self.dire("06-piege")
        self.add_mascotte(scale=0.5)
        titre = self.t("Le piège", 44, ORANGE_RETENUE).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.5)
        couples = [("« croissante »", "« strictement croissante »",
                    "Écrire croissante au lieu"),
                   ("« d'après le TVI »", "« d'après le COROLLAIRE du TVI »",
                    "citer le théorème des valeurs"),
                   ("sans intervalle", "« sur [a ; b] »", "oublier de dire")]
        y = 1.7
        for faux, bon, mot in couples:
            self.au_mot(mot)
            g = self.t(faux, 30, ROUGE_ERREUR)
            fl = self.t("→", 30, GREY_B)
            d = self.t(bon, 30, VERT_OK)
            ligne = VGroup(g, fl, d).arrange(RIGHT, buff=0.3)
            ligne
            if ligne.width > 11.8:
                ligne.scale_to_fit_width(11.8)
            self.play(FadeIn(ligne.move_to(P(-0.4, y)), shift=RIGHT * 0.2), run_time=0.4)
            y -= 1.15
        self.au_mot("ne pas l'être sur un autre")
        b = self.t("unique sur un intervalle, pas forcément sur un autre", 28, GREY_B)
        self.play(FadeIn(b.move_to(P(-0.4, -2.2))))
        self.attendre_voix(marge=0.5)

    def question_2(self):
        self.clear()
        self.dire("07-question")
        self.add_mascotte(scale=0.5)
        copie = VGroup(self.t("la copie dit :", 26, GREY_B),
                       self.t("h continue sur [2 ; 5]", 28),
                       self.t("h(2) = −1, h(5) = 6", 28),
                       self.t("donc h(x) = 0 admet", 28),
                       self.t("une unique solution", 28))
        # ⚠️ 0,9 et pas 0,2 : trois blocs s'empilent SOUS cette copie (« au moins une »,
        # « une seule : NON », puis l'explication). Posée trop bas, elle les poussait
        # hors du cadre — BORDS l'a signalé à −3,70, sous la marge de 3 % (−3,573).
        copie.arrange(DOWN, aligned_edge=LEFT, buff=0.16)
        self.gauche(copie, 0.9, xmax=1.0, x0=-6.2)   # ⚠️ cartes à partir de 1,4
        self.play(FadeIn(copie), run_time=0.5)

        t0 = self.renderer.time
        enonce, choix, kw, _ = Q07
        tete, q, cartes, pause, rebours = self.q_tete(
            [self.t(s, kw.get("fs_enonce", 32)) for s in enonce],
            [self.choix2(*c) for c in choix],
            **{k: v for k, v in kw.items() if k != "fs_enonce"})
        q
        for c in cartes:
            c
        self.play(FadeIn(tete), run_time=0.3)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "07", t0, "C")
        return cartes, pause, rebours, copie

    def reponse_2(self, cartes, pause, rebours, copie):
        self.dire("07b-reponse")
        self.q_reponse(cartes, 2, pause, rebours)
        self.au_mot("elle a donc le droit d'écrire au moins une")
        ok = self.t("→ au moins une : oui", 28, VERT_OK)
        ok
        ok.next_to(copie, DOWN, buff=0.3).align_to(copie, LEFT)
        self.play(FadeIn(ok))
        self.au_mot("Mais pas une seule")
        non = self.t("→ une seule : NON", 28, ROUGE_ERREUR)
        non.next_to(ok, DOWN, buff=0.18).align_to(copie, LEFT)
        self.play(FadeIn(non))
        self.au_mot("La réponse A confond")
        bas = VGroup(self.t("A confond la démonstration", 26, ORANGE_RETENUE),
                     self.t("et le résultat : encadrer", 26, ORANGE_RETENUE),
                     self.t("vient après, et ne démontre rien", 26, ORANGE_RETENUE))
        bas.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        # ⛔ VU À LA PLANCHE : posé à une ordonnée DEVINÉE (−2,7), ce bloc s'écrivait sur
        # « → une seule : NON ». Trois blocs empilés dans la même colonne ne se placent
        # pas à l'estime : chacun se pose PAR RAPPORT au précédent, et le dernier ne
        # peut plus chevaucher quoi que ce soit.
        bas.next_to(non, DOWN, buff=0.35).align_to(copie, LEFT)
        self.play(FadeIn(bas))
        self.attendre_voix(marge=0.5)

    def rediger(self):
        self.clear()
        self.dire("08-rediger")
        self.add_mascotte(scale=0.5)
        titre = self.t("Le modèle à recopier", 42, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.5)
        lignes = [("f est continue sur [a ; b], parce que…", "Un : la fonction f"),
                  ("f ′(x) est de signe constant : f est strictement monotone",
                   "Deux : f prime de x"),
                  ("f(a) = … , f(b) = … , et 0 est entre les deux",
                   "Trois : f de a vaut"),
                  ("d'après le corollaire du TVI, f(x) = 0 admet une",
                   "Quatre : d'après"),
                  ("unique solution dans [a ; b]", None)]
        bloc = VGroup()
        for i, (s, _) in enumerate(lignes):
            n = self.pastille(i + 1) if i < 4 else Dot(radius=0.24).set_opacity(0)
            bloc.add(VGroup(n, self.t(s, 28, larg=10.4))
                     .arrange(RIGHT, buff=0.3))
        bloc.arrange(DOWN, aligned_edge=LEFT, buff=0.3).move_to(P(-0.4, 0.5))
        for l, (_, mot) in zip(bloc, lignes):
            if mot:
                self.au_mot(mot)
            self.play(FadeIn(l, shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("toujours dans cet ordre")
        o = self.t("quatre lignes, toujours dans cet ordre", 32, ORANGE_RETENUE)
        self.play(FadeIn(o.move_to(P(-0.4, -2.5))))
        self.attendre_voix(marge=0.5)

    def le_defi(self):
        self.clear()
        self.dire("09-defi")
        self.add_mascotte(scale=0.6)
        titre = self.t("À toi de jouer !", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.play(Write(titre), run_time=0.5)
        f_ = self.t("f(x) = x³ + 3x − 6   sur [1 ; 2]", 40, BLEU_CALCUL)
        self.play(FadeIn(f_.move_to(P(-0.4, 1.9))))
        self.au_mot("Il a écrit")
        copie = VGroup(self.t("f(1) = −2, f(2) = 8,", 32),
                       self.t("donc f(x) = 0 admet une unique solution", 32))
        copie.arrange(DOWN, aligned_edge=LEFT, buff=0.2).move_to(P(-0.4, 0.5))
        self.play(FadeIn(copie), run_time=0.5)
        self.au_mot("Il manque deux phrases")
        q = self.t("il manque DEUX phrases. Lesquelles ?", 36, ORANGE_RETENUE)
        self.play(FadeIn(q.move_to(P(-0.4, -1.0)), shift=UP * 0.15))
        reb = CompteARebours(5, r=0.34, fs=32).move_to(P(-0.4, -2.2))
        self.play(FadeIn(reb, scale=0.6), run_time=0.3)
        self.attendre_voix(marge=0.3)
        reb.jouer(self)

    def correction(self):
        self.clear()
        self.dire("09b-correction")
        self.add_mascotte(scale=0.5)
        titre = self.t("Correction", 42, VERT_OK).to_edge(UP, buff=0.45)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("Il manque d'abord la continuité")
        un = VGroup(self.pastille(1),
                    self.t("f est un polynôme, donc continue sur [1 ; 2]",
                                        30, VERT_OK, larg=10.4)).arrange(RIGHT, buff=0.3)
        self.play(FadeIn(un.move_to(P(-0.4, 1.5)), shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Il manque ensuite la stricte monotonie")
        deux = VGroup(self.pastille(2),
                      self.lettres(self.t("f ′(x) = 3x² + 3 > 0, donc strictement croissante",
                                          30, VERT_OK, larg=10.4))).arrange(RIGHT, buff=0.3)
        self.play(FadeIn(deux.move_to(P(-0.4, 0.4)), shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("la conclusion de Yoan devient juste")
        j = self.t("avec ces deux phrases, sa conclusion devient juste", 30)
        self.play(FadeIn(j.move_to(P(-0.4, -0.9))))
        self.au_mot("elle n'était pas démontrée")
        s = VGroup(self.t("sans elles, elle n'était pas démontrée —", 30, ROUGE_ERREUR),
                   self.t("même si elle était vraie", 30, ROUGE_ERREUR))
        s.arrange(DOWN, buff=0.18).move_to(P(-0.4, -2.2))
        self.play(FadeIn(s))
        self.attendre_voix(marge=0.6)

    def construct(self):
        self.page_de_garde()
        self.situation()
        self.idee()
        self.theoreme()
        self.reponse_1(*self.question_1())
        self.appliquer()
        self.piege()
        self.reponse_2(*self.question_2())
        self.rediger()
        self.le_defi()
        self.correction()
        self.page_finale([
            "Quatre lignes : continuité, stricte monotonie, k entre, conclusion",
            "Chaque ligne répond à une hypothèse — aucune n'en remplace une autre",
            "On cite le COROLLAIRE quand on conclut à l'unicité",
            "On nomme toujours l'intervalle",
        ])
        self.page_abonnement()
