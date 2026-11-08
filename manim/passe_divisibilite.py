# passe_divisibilite.py
# Passe finale de la série DIVISIBILITÉ ET NOMBRES PREMIERS 4e (08/11/2026) : les 22 entrées du
# manifeste. Même machinerie que `passe_relatifs.py` : les temps des chapitres et des questions sont
# relevés dans l'AUDIO de chaque mp4 (corrélation avec les WAV des clips), jamais estimés. Le manifeste
# a des modifications non commitées d'autres sessions : on sauvegarde, on lit, puis on écrit dans une
# étape séparée, en ajoutant seulement.
#
#   python manim/passe_divisibilite.py temps     → scratch : manim/sorties/4e/maths/divisibilite/temps.json
#   python manim/passe_divisibilite.py manifeste → ajoute ou remplace les 22 entrées 4e-div-* et 4e-premier-*
import json
import shutil
import subprocess
import sys
import tempfile
import wave
from pathlib import Path

import numpy as np

RACINE = Path(__file__).resolve().parents[1]
SERIE = RACINE / "manim" / "sorties" / "4e" / "maths" / "divisibilite"
VOIX = RACINE / "manim" / "voix"
SONS = RACINE / "public" / "sons"
MANIFESTE = RACINE / "manim" / "manifeste-youtube.json"
TEMPS = SERIE / "temps.json"
SR = 8000
PAS_AVANT = "2026-12-01"  # date de prudence : rien sur YouTube sans son ordre
CHAP_MIN = 10  # YouTube refuse TOUS les chapitres si l'un dure moins de 10 s

NOTIONS = {
    "div": dict(notion="divisibilite", fiche="divisibilite", serie="Divisibilité", nb=7, hashtag="#divisibilite",
                communs=["divisibilité", "multiples et diviseurs"]),
    "premier": dict(notion="nombre_premier", fiche="nombre-premier", serie="Nombres premiers", nb=4, hashtag="#nombrespremiers",
                    communs=["nombres premiers", "divisibilité"]),
}
COMMUNS = ["maths", "4e", "collège", "cycle 4", "CRPE", "EleveAI"]


def cours(p):
    return f"https://www.eleveai.fr/fiches-cours/maths/4e/{NOTIONS[p]['fiche']}"


def exos(p):
    return f"https://www.eleveai.fr/fiches-exercices/maths/4e/{NOTIONS[p]['fiche']}"


def coach(p, micro):
    return f"https://www.eleveai.fr/coach/serie?classe=4e&matiere=maths&notion={NOTIONS[p]['notion']}&microId={micro}&display=simple"


def lire_wav(p):
    with wave.open(str(p)) as w:
        n, sr, ch, l = w.getnframes(), w.getframerate(), w.getnchannels(), w.getsampwidth()
        x = np.frombuffer(w.readframes(n), dtype={2: np.int16, 4: np.int32}[l]).astype(np.float32)
    x = x.reshape(-1, ch).mean(axis=1)
    k = np.linspace(0, len(x) - 1, int(len(x) * SR / sr)).astype(int)
    return x[k]


def audio_mp4(p):
    with tempfile.TemporaryDirectory() as d:
        w = Path(d) / "a.wav"
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(p), "-ac", "1", "-ar", str(SR), "-sample_fmt", "s16", str(w)], check=True)
        return lire_wav(w)


def correl(ref, cible):
    """Position de ref dans cible, et sa qualité (0 à 1)."""
    n = len(cible) + len(ref)
    c = np.fft.irfft(np.fft.rfft(cible, n) * np.conj(np.fft.rfft(ref, n)), n)[: len(cible)]
    i = int(np.argmax(c))
    q = float(c[i] / (np.linalg.norm(ref) * np.linalg.norm(cible[i : i + len(ref)]) + 1e-9))
    return i, q


def mesurer(nom, mp4):
    a = audio_mp4(mp4)
    clips = list(json.loads((VOIX / f"{nom}.json").read_text(encoding="utf-8")))
    pos, res = 0, {}
    for c in clips:
        r = lire_wav(SONS / nom / f"{c}.wav")
        ref = r[: min(len(r), SR * 3)]
        # le clip suivant commence au plus 25 s après la fin du précédent
        fen = a[pos : pos + len(r) + SR * 25]
        i, q = correl(ref, fen)
        t = (pos + i) / SR
        if q < 0.5:
            print("⚠️ corrélation faible", nom, c, round(q, 2))
        res[c] = round(t, 2)
        pos = pos + i + len(r) - SR // 4
    return res, round(len(a) / SR, 2)


def mmss(t):
    t = int(t + 0.5)
    return f"{t // 60:02d}:{t % 60:02d}"


def chapitres(chap, t, duree):
    """[(clé, libellé)] → [[mm:ss, libellé]], en réunissant tout chapitre de moins de 10 s.
    Un chapitre trop court est absorbé par le précédent ; si c'est une question ou un défi,
    c'est le précédent qui disparaît (le chapitre « Question » reste repérable)."""
    lst = [[0.0, lib, cle] for cle, lib in chap]
    for i in range(1, len(lst)):
        lst[i][0] = t[lst[i][2]]
    change = True
    while change:
        change = False
        for i in range(len(lst)):
            fin = lst[i + 1][0] if i + 1 < len(lst) else duree
            if fin - lst[i][0] < CHAP_MIN:
                question = lambda c: c[2][2:3] == "q"
                # on garde le chapitre qui commence le plus tôt, et on réunit les deux libellés ;
                # sauf si le suivant est une question : il reste repérable, c'est le court qui part.
                if i + 1 < len(lst) and not question(lst[i + 1]):
                    j, k = i, i + 1
                else:
                    j, k = i - 1, i
                lib = lst[j][1] + " et " + lst[k][1][0].lower() + lst[k][1][1:]
                print("  chapitres réunis :", lib)
                lst[j][1] = lib
                del lst[k]
                change = True
                break
    lst[0][0] = 0.0
    return [[mmss(x[0]), x[1]] for x in lst]


# ───── Les contenus ─────
# p : préfixe des voix et des ids (div / premier) ; n : numéro dans la série du préfixe.
EPS = [
    dict(num="01", slug="multiple", p="div", n=1, micro="div_multiple_diviseur", ceinture="jaune", sc="jaune", centres=["musique", "art-design"],
         titre="Deux mots pour une seule relation — Multiples et diviseurs — épisode 1 · Maths 4e",
         intro="Awa est chorégraphe. Elle a 42 danseurs et veut des rangs de 6, tous complets. Est-ce possible ? Et avec 45 danseurs ?",
         puces=["6 × 7 = 42 : 42 est un multiple de 6, et 6 est un diviseur de 42", "le multiple est toujours le plus grand des deux", "le test : on divise, et le reste doit valoir zéro"],
         defi="72 est-il un multiple de 9 ? 5 est-il un diviseur de 32 ?",
         chap=[("01-situation", "Awa, chorégraphe"), ("02-rangs", "7 rangs de 6"), ("03-mots", "Multiple et diviseur"), ("03q-question", "Question 1"), ("04-test", "Et si ça ne tombe pas juste ?"), ("05-reste", "Le test du reste"), ("06-piege", "Le piège"), ("06q-question", "Question 2"), ("07-defi", "À toi de jouer"), ("07b-correction", "Correction"), ("08-finale", "Ce que tu as appris")],
         qs=[("03q-question", "On sait que 8 × 5 = 40. Quelle phrase est vraie ?", ["8 est un multiple de 40", "8 est un diviseur de 40", "40 est un diviseur de 8"], 1, "Le diviseur est le petit, le multiple est le grand."),
             ("06q-question", "56 ÷ 7 = 8, sans reste. Que peut-on dire ?", ["56 est un multiple de 7", "7 est un multiple de 56", "56 et 7 n'ont aucun lien"], 0, "Le reste vaut zéro, et 56 est le plus grand.")],
         tags=["multiple", "diviseur", "multiple et diviseur", "reste", "danse", "chorégraphe"],
         st="Multiple ou diviseur : tu paries que tu ne te tromperas plus jamais ? #maths #4e",
         sq=("03q-question", "8 × 4 = 32. Que peut-on dire ?", ["32 est un diviseur de 8", "8 est un diviseur de 32", "8 est un multiple de 32"], 1, "Le petit divise le grand : 8 est un diviseur de 32."),
         sa="Ti Margo empile 42 caisses en piles de 6 : 7 piles, il n'en reste aucune. 42 est un multiple de 6, et 6 est un diviseur de 42.\nLe grand, c'est le multiple ; le petit, c'est le diviseur. Et avec 45 caisses ? 3 restent : 45 n'est pas un multiple de 6.",
         stoi="56 est-il un multiple de 8 ? Écris ton calcul. Réponds en commentaire !",
         stags=["caisses", "multiple", "diviseur"]),
    dict(num="02", slug="critere-2-5-10", p="div", n=2, micro="div_critere_2_5_10", ceinture="jaune", sc="jaune", centres=["cuisine"],
         titre="Un seul chiffre suffit — Divisible par 2, par 5, par 10 — épisode 2 · Maths 4e",
         intro="Hugo est pâtissier. Ce matin, il a fait 3 640 macarons, et il a des boîtes de 2, de 5 et de 10. Lesquelles seront toutes pleines ? Pas besoin de poser la division.",
         puces=["on ne regarde que le chiffre des unités", "par 2 : 0, 2, 4, 6 ou 8 ; par 5 : 0 ou 5 ; par 10 : 0", "le piège : additionner les chiffres ne sert à rien ici"],
         defi="1 255 et 908 : divisibles par 2, par 5, par 10 ?",
         chap=[("01-situation", "Hugo, pâtissier"), ("02-unites", "Le chiffre des unités"), ("03-regles", "Les trois règles"), ("04-hugo", "Les boîtes d'Hugo"), ("04q-question", "Question 1"), ("05-dix", "Divisible par 10"), ("06-piege", "Le piège"), ("06q-question", "Question 2"), ("07-defi", "À toi de jouer"), ("07b-correction", "Correction"), ("08-finale", "Ce que tu as appris")],
         qs=[("04q-question", "2 735 est divisible par…", ["2", "5", "10"], 1, "Il finit par 5 : divisible par 5, mais ni par 10 ni par 2."),
             ("06q-question", "4 518 est-il divisible par 2 ?", ["oui, il finit par 8", "non, il est trop grand", "on ne peut pas savoir sans poser"], 0, "8 est pair, donc 4 518 est divisible par 2.")],
         tags=["critères de divisibilité", "divisible par 2", "divisible par 5", "divisible par 10", "chiffre des unités", "pâtissier"],
         st="7 384 615 est-il divisible par 5 ? Tu paries que je réponds en 1 seconde ? #maths #4e",
         sq=("02q-question", "4 730 est divisible par…", ["2 seulement", "5 seulement", "2, 5 et 10"], 2, "Il finit par 0 : le 0 coche les trois cases."),
         sa="Ti Margo affiche un nombre à 7 chiffres sur l'écran géant du stade, et parie de dire en une seconde s'il est divisible par 5.\nSon secret : sa loupe ne regarde que le dernier chiffre. Par 2 : 0, 2, 4, 6 ou 8. Par 5 : 0 ou 5. Par 10 : 0.",
         stoi="quel est le plus petit nombre à 4 chiffres divisible par 2, par 5 et par 10 ? Réponds en commentaire !",
         stags=["loupe", "critères de divisibilité", "chiffre des unités"]),
    dict(num="03", slug="critere-3-9", p="div", n=3, micro="div_critere_3_9", ceinture="orange", sc="orange", centres=["transports"],
         titre="Le secret de la somme des chiffres — Divisible par 3 et par 9 — épisode 3 · Maths 4e",
         intro="Théo est logisticien. 4 275 colis arrivent à l'entrepôt : peut-il les charger par piles de 3, ou de 9, sans qu'il en reste ? Cette fois, le dernier chiffre ne suffit pas.",
         puces=["on additionne tous les chiffres : 4 + 2 + 7 + 5 = 18", "si la somme est divisible par 3 (ou par 9), le nombre aussi", "divisible par 9, c'est divisible par 3 ; l'inverse est faux"],
         defi="5 130 et 2 024 : divisibles par 3 ? par 9 ?",
         chap=[("01-situation", "Théo, logisticien"), ("02-somme", "La somme des chiffres"), ("03-regle", "La règle"), ("03q-question", "Question 1"), ("04-sens", "Attention au sens"), ("05-piege", "Le piège"), ("05q-question", "Question 2"), ("06-defi", "À toi de jouer"), ("06b-correction", "Correction"), ("07-finale", "Ce que tu as appris")],
         qs=[("03q-question", "1 302 est-il divisible par 3 ?", ["oui, la somme fait 6", "non, il finit par 2", "non, la somme fait 5"], 0, "1 + 3 + 0 + 2 = 6, et 6 est divisible par 3."),
             ("05q-question", "738 est divisible par…", ["3 seulement", "3 et 9", "9 seulement"], 1, "7 + 3 + 8 = 18. Et divisible par 9, c'est toujours divisible par 3.")],
         tags=["critères de divisibilité", "divisible par 3", "divisible par 9", "somme des chiffres", "logistique", "logisticien"],
         st="123 456 789 divisible par 9 ? Tu paries que je le sais en 3 secondes ? #maths #4e",
         sq=("02q-question", "2 024 est-il divisible par 3 ?", ["oui", "non, la somme fait 8", "oui, il est pair"], 1, "2 + 0 + 2 + 4 = 8, et 8 n'est pas divisible par 3."),
         sa="Ti Margo, magicien, devine en trois secondes si 123 456 789 est divisible par 9.\nSon tour : additionner les chiffres. 45 = 9 × 5, donc divisible par 9. Pas de magie : c'est un critère, et il marche aussi pour 3.",
         stoi="dans 5, chiffre caché, 2, quel chiffre cacher pour obtenir un multiple de 9 ? Réponds en commentaire !",
         stags=["magicien", "critères de divisibilité", "somme des chiffres"]),
    dict(num="04", slug="euclidienne", p="div", n=4, micro="div_euclidienne", ceinture="orange", sc="orange", centres=["corps-sante"],
         titre="Que faire de ce qui reste ? — La division euclidienne — épisode 4 · Maths 4e",
         intro="Jules est pharmacien. Il a 47 comprimés à ranger dans des plaquettes de 6. Combien de plaquettes pleines ? Et combien de comprimés restent ?",
         puces=["47 = 6 × 7 + 5 : dividende, diviseur, quotient, reste", "le reste est toujours plus petit que le diviseur", "le piège : une égalité juste qui n'est pas la division euclidienne"],
         defi="154 gélules, par boîtes de 12 : écris la division euclidienne.",
         chap=[("01-situation", "Jules, pharmacien"), ("02-remplir", "On remplit les plaquettes"), ("03-ecrire", "On l'écrit"), ("04-condition", "La condition sur le reste"), ("04q-question", "Question 1"), ("05-piege", "Le piège"), ("05q-question", "Question 2"), ("06-defi", "À toi de jouer"), ("06b-correction", "Correction"), ("07-finale", "Ce que tu as appris")],
         qs=[("04q-question", "50 ÷ 8 : quel est le reste ?", ["2", "6", "10"], 0, "8 × 6 = 48, il reste 2, et 2 est plus petit que 8."),
             ("05q-question", "Laquelle est la division euclidienne de 89 par 7 ?", ["89 = 7 × 11 + 12", "89 = 7 × 12 + 5", "89 = 7 × 13 − 2"], 1, "5 est plus petit que 7. Dans la première, le reste 12 est trop grand ; dans la troisième, on enlève.")],
         tags=["division euclidienne", "quotient", "reste", "dividende", "pharmacie", "pharmacien"],
         st="47 cookies, boîtes de 6 : tu paries qu'il m'en reste plus de 6 ? #maths #4e",
         sq=("02q-question", "50 cookies, boîtes de 8. Combien j'en mange ?", ["2", "6", "10"], 0, "8 × 6 = 48 : il en reste 2."),
         sa="Ti Margo range 47 cookies par boîtes de 6, et il mange ce qui reste. Peut-il en rester plus de 6 ?\nImpossible : avec 6 cookies, il remplirait une boîte de plus. 47 = 6 × 7 + 5, et le reste est toujours plus petit que le diviseur.",
         stoi="100 cookies, boîtes de 7. Combien de cookies me restent ? Réponds en commentaire !",
         stags=["cookies", "division euclidienne", "reste"]),
    dict(num="05", slug="diviseurs", p="div", n=5, micro="div_lister_diviseurs", ceinture="orange", sc="orange", centres=["nature-ecologie"],
         titre="Comment n'en oublier aucun ? — Lister tous les diviseurs — épisode 5 · Maths 4e",
         intro="Rose est paysagiste. Elle veut planter 36 rosiers en rectangle, avec des rangées toutes pareilles. Quelles rangées peut-elle faire ? Chaque rectangle, c'est une paire de diviseurs.",
         puces=["on cherche les diviseurs par paires, en partant de 1", "on s'arrête quand les deux nombres se croisent", "1 et le nombre lui-même sont toujours des diviseurs"],
         defi="la liste de tous les diviseurs de 28.",
         chap=[("01-situation", "Rose, paysagiste"), ("02-paires", "Des paires de diviseurs"), ("03-croiser", "Quand s'arrêter ?"), ("04-liste", "Les 9 diviseurs de 36"), ("04q-question", "Question 1"), ("05-piege", "Le piège"), ("05q-question", "Question 2"), ("06-defi", "À toi de jouer"), ("06b-correction", "Correction"), ("07-finale", "Ce que tu as appris")],
         qs=[("04q-question", "Lequel n'est pas un diviseur de 36 ?", ["12", "8", "9"], 1, "36 ÷ 8 = 4, et il reste 4."),
             ("05q-question", "Combien de diviseurs a 10 ?", ["2", "3", "4"], 2, "1 × 10 et 2 × 5 : 1, 2, 5 et 10.")],
         tags=["diviseurs", "lister les diviseurs", "paires de diviseurs", "jardin", "paysagiste"],
         st="24 tournesols en rectangle : tu paries que je n'en oublie aucun ? #maths #4e",
         sq=("03q-question", "Lequel n'est pas un diviseur de 24 ?", ["6", "8", "9"], 2, "24 ÷ 9 = 2, et il reste 6."),
         sa="Ti Margo veut planter 24 tournesols en rectangle. Combien de rectangles possibles ?\nSa méthode : chercher les diviseurs par paires, et s'arrêter quand les paires se croisent.",
         stoi="combien de diviseurs a 30 ? Réponds en commentaire !",
         stags=["tournesols", "diviseurs", "paires de diviseurs"]),
    dict(num="06", slug="probleme", p="div", n=6, micro="div_probleme", ceinture="verte", sc="orange", centres=["espace"],
         titre="Diviseur commun ou multiple commun ? — Problèmes de divisibilité — épisode 6 · Maths 4e",
         intro="Adam anime un planétarium. Avec 48 cartes du ciel et 36 boussoles, combien de kits identiques peut-il faire, au plus ? Et deux comètes qui reviennent tous les 6 et tous les 8 ans : quand repasseront-elles ensemble ?",
         puces=["des lots sans reste : le plus grand diviseur commun", "se retrouver ensemble : le plus petit multiple commun", "on lit bien la question avant de choisir"],
         defi="60 étoiles autocollantes et 45 fusées : combien de kits identiques, au plus ?",
         chap=[("01-situation", "Adam, animateur de planétarium"), ("02-diviseurs", "Les diviseurs de 48 et de 36"), ("03-plus-grand", "Le plus grand diviseur commun"), ("03q-question", "Question 1"), ("04-rdv", "Deux comètes"), ("05-multiples", "Le premier multiple commun"), ("06-piege", "Le piège"), ("06q-question", "Question 2"), ("07-defi", "À toi de jouer"), ("07b-correction", "Correction"), ("08-finale", "Ce que tu as appris")],
         qs=[("03q-question", "20 bracelets et 30 badges, en lots identiques, sans reste. Combien de lots, au plus ?", ["5", "10", "60"], 1, "10 divise 20 et 30, et aucun nombre plus grand ne divise les deux."),
             ("06q-question", "Deux bus, toutes les 10 et toutes les 15 minutes. Ensemble de nouveau dans…", ["5 minutes", "30 minutes", "150 minutes"], 1, "Multiples de 10 : 10, 20, 30. Multiples de 15 : 15, 30.")],
         tags=["problème", "diviseur commun", "multiple commun", "PGCD", "planétarium", "astronomie"],
         st="Mes 2 phares clignotent ensemble : tu paries qu'ils ne le referont plus jamais ? #maths #4e",
         sq=("02q-question", "Un phare toutes les 4 secondes, un autre toutes les 6. Ensemble au bout de…", ["10 secondes", "12 secondes", "24 secondes"], 1, "Multiples de 4 : 4, 8, 12. Multiples de 6 : 6, 12. 24 marche aussi, mais 12 vient avant."),
         sa="Ti Margo, gardien de phare : le rouge clignote toutes les 6 secondes, le vert toutes les 8. Quand clignotent-ils de nouveau ensemble ?\nSa méthode : écrire les multiples de chacun, et prendre le premier commun.",
         stoi="un phare toutes les 9 secondes, un autre toutes les 12. Ils clignotent ensemble. Dans combien de secondes, au plus tôt, recommencent-ils ? Réponds en commentaire !",
         stags=["phares", "multiple commun", "problème"]),
    dict(num="07", slug="defi", p="div", n=7, micro="div_defi", ceinture="verte", sc="orange", centres=["jeux-defis"],
         titre="Ouvre les cadenas de l'escape game — Défis de divisibilité — épisode 7 · Maths 4e",
         intro="Chloé crée des escape games. Un cadenas attend un code : 2, un chiffre caché, 6. L'indice : le code est divisible par 9. Trois salles, trois cadenas, et une affirmation à démasquer.",
         puces=["un chiffre caché se trouve avec la somme des chiffres", "divisible par 9, c'est divisible par 3", "un seul contre-exemple suffit pour dire faux"],
         defi="le code 5, chiffre caché, 0 est divisible par 9 et par 10 : quel est le chiffre caché ?",
         chap=[("01-situation", "Chloé, créatrice d'escape games"), ("02-somme", "Premier cadenas"), ("02q-question", "Question 1"), ("03-deux", "Deux indices"), ("04-vrai-faux", "Vrai ou faux ?"), ("04q-question", "Question 2"), ("05-piege", "Le piège"), ("06-defi", "À toi de jouer"), ("06b-correction", "Correction"), ("07-finale", "Ce que tu as appris")],
         qs=[("02q-question", "Le code 4 ? 5 est divisible par 3. Quel chiffre convient ?", ["3", "2", "4"], 0, "4 + 3 + 5 = 12, divisible par 3."),
             ("04q-question", "« Tout multiple de 9 est un multiple de 3. »", ["vrai", "faux", "seulement s'il est pair"], 0, "9 = 3 × 3 : un multiple de 9 est aussi un multiple de 3.")],
         tags=["défi", "chiffre caché", "critères de divisibilité", "contre-exemple", "escape game"],
         st="Code 7 ? 5, divisible par 9 : tu paries que j'ouvre le coffre du premier coup ? #maths #4e",
         sq=("02q-question", "Un nombre divisible par 9 est-il toujours divisible par 3 ?", ["oui", "non", "seulement s'il est pair"], 0, "9 = 3 × 3. L'inverse est faux : 6 est divisible par 3, pas par 9."),
         sa="Ti Margo doit ouvrir un coffre au trésor : le code est 7, un chiffre caché, 5, et il est divisible par 9.\nSa méthode : la somme des chiffres. 7 + 5 = 12, il manque 6 pour arriver à 18 : le code est 765.",
         stoi="le code 3, chiffre caché, 0 est divisible par 9 et par 10. Quel est le chiffre caché ? Réponds en commentaire !",
         stags=["coffre", "chiffre caché", "critères de divisibilité"]),
    dict(num="08", slug="definition", p="premier", n=1, micro="premier_definition", ceinture="orange", sc="jaune", centres=["art-design"],
         titre="Les nombres qui ne se cassent pas — Les nombres premiers — épisode 1 · Maths 4e",
         intro="Mia est mosaïste. Avec 12 carreaux, elle fait des rectangles : 2 rangées de 6, 3 rangées de 4. Avec 7 carreaux, impossible : une seule rangée. Pourquoi certains nombres ne se cassent pas ?",
         puces=["un nombre premier a exactement deux diviseurs : 1 et lui-même", "1 n'est pas premier", "jusqu'à 30 : 2, 3, 5, 7, 11, 13, 17, 19, 23, 29"],
         defi="21 carreaux, puis 23 : lequel est premier ?",
         chap=[("01-situation", "Mia, mosaïste"), ("02-diviseurs", "Exactement deux diviseurs"), ("03-un", "Le cas de 1"), ("03q-question", "Question 1"), ("04-liste", "La liste jusqu'à 30"), ("05-piege", "Le piège"), ("05q-question", "Question 2"), ("06-defi", "À toi de jouer"), ("06b-correction", "Correction"), ("07-finale", "Ce que tu as appris")],
         qs=[("03q-question", "Lequel est premier ?", ["9", "15", "17"], 2, "17 n'a que deux diviseurs ; 9 = 3 × 3 et 15 = 3 × 5."),
             ("05q-question", "1 est-il premier ?", ["oui, il est divisible par 1 et par lui-même", "non, il n'a qu'un seul diviseur", "oui, c'est le premier nombre"], 1, "Il faut exactement deux diviseurs ; 1 n'en a qu'un.")],
         tags=["nombres premiers", "nombre premier", "diviseurs", "définition", "mosaïque", "mosaïste"],
         st="13 musiciens en rectangle : tu paries que j'y arrive ? #maths #4e",
         sq=("03q-question", "Lequel est premier ?", ["21", "19", "27"], 1, "21 = 3 × 7 et 27 = 3 × 9 ; 19 n'a que deux diviseurs."),
         sa="Ti Margo veut ranger 13 musiciens en rectangle pour la parade. Avec 12, facile : 2 rangées de 6, ou 3 rangées de 4.\nAvec 13, il en reste toujours 1 : une seule longue file. 13 est un nombre premier : il n'a que deux diviseurs, 1 et lui-même.",
         stoi="combien y a-t-il de nombres premiers entre 1 et 30 ? Réponds en commentaire !",
         stags=["parade", "nombres premiers", "diviseurs"]),
    dict(num="09", slug="determiner", p="premier", n=2, micro="premier_determiner", ceinture="verte", sc="orange", centres=["animaux", "sciences"],
         titre="N'oublie jamais le test par 7 — Reconnaître un nombre premier — épisode 2 · Maths 4e",
         intro="Salomé est entomologiste. Certaines cigales restent sous terre 13 ans ou 17 ans : deux nombres premiers. Mais 59, 77 ou 91 : premiers, ou pas ? Le crible d'Ératosthène donne la méthode.",
         puces=["le crible d'Ératosthène : on barre les multiples de 2, 3, 5 et 7", "sous 100, on teste 2, 3, 5 et 7, car 11 × 11 = 121", "le piège : 91 = 7 × 13"],
         defi="49, 83 et 87 : lesquels sont premiers ?",
         chap=[("01-situation", "Salomé, entomologiste"), ("02-pourquoi", "Pourquoi 13 et 17 ?"), ("03-crible", "Le crible d'Ératosthène"), ("04-stop", "On s'arrête à 7"), ("04q-question", "Question 1"), ("05-piege", "Le piège"), ("05q-question", "Question 2"), ("06-defi", "À toi de jouer"), ("06b-correction", "Correction"), ("07-finale", "Ce que tu as appris")],
         qs=[("04q-question", "Pour savoir si 59 est premier, quels nombres faut-il tester ?", ["2, 3, 5 et 7", "tous les nombres jusqu'à 59", "seulement 2"], 0, "Aucun ne divise 59 : il est premier."),
             ("05q-question", "77 est-il premier ?", ["oui, il est impair", "non, 77 = 7 × 11", "oui, 7 + 7 = 14"], 1, "Le test par 7 le démasque : 77 ÷ 7 = 11.")],
         tags=["nombres premiers", "reconnaître un nombre premier", "crible d'Ératosthène", "cigales", "insectes", "entomologiste"],
         st="Des cigales qui dorment 17 ans : tu paries qu'elles ont choisi un nombre premier ? #maths #4e",
         sq=("02q-question", "91 est-il premier ?", ["oui", "non, 91 = 7 × 13", "non, 91 = 3 × 31"], 1, "91 ÷ 7 = 13. Le test par 7, tout le monde l'oublie."),
         sa="Certaines cigales restent 13 ou 17 ans sous terre : deux nombres premiers. Un prédateur qui revient tous les 2, 3 ou 4 ans les croise rarement.\nLe test de Ti Margo jusqu'à 100 : diviser par 2, 3, 5 et 7. Et le test par 7, tout le monde l'oublie : 91 = 7 × 13.",
         stoi="combien y a-t-il de nombres premiers entre 80 et 100 ? Réponds en commentaire !",
         stags=["cigales", "nombres premiers", "crible"]),
    dict(num="10", slug="decomposer", p="premier", n=3, micro="premier_decomposer", ceinture="verte", sc="orange", centres=["technologie-ia"],
         titre="Casser un nombre en briques — Décomposer en facteurs premiers — épisode 3 · Maths 4e",
         intro="Nathan est ingénieur en cybersécurité : il protège les paiements en ligne. Ses codes secrets reposent sur une idée simple : tout nombre se casse en nombres premiers, comme un mur en briques. Commençons par 84.",
         puces=["on divise par le plus petit nombre premier, encore et encore, jusqu'à 1", "84 = 2 × 2 × 3 × 7, une seule décomposition à l'ordre près", "à quoi ça sert : simplifier une fraction d'un coup"],
         defi="décompose 90 en facteurs premiers.",
         chap=[("01-situation", "Nathan, ingénieur en cybersécurité"), ("02-casser", "On casse 84"), ("03-resultat", "Le résultat"), ("04-controle", "Deux contrôles"), ("04q-question", "Question 1"), ("05-fraction", "Simplifier une fraction"), ("06-piege", "Le piège"), ("06q-question", "Question 2"), ("07-defi", "À toi de jouer"), ("07b-correction", "Correction"), ("08-finale", "Ce que tu as appris")],
         qs=[("04q-question", "Quelle est la décomposition de 60 ?", ["2 × 2 × 15", "2 × 2 × 3 × 5", "4 × 3 × 5"], 1, "15 et 4 ne sont pas premiers."),
             ("06q-question", "Quelle est la décomposition de 45 ?", ["3 × 3 × 5", "5 × 9", "3 × 15"], 0, "9 et 15 ne sont pas premiers : ils se cassent encore.")],
         tags=["décomposition en facteurs premiers", "facteurs premiers", "nombres premiers", "simplifier une fraction", "cybersécurité", "ingénieur"],
         st="Je casse 84 en briques incassables : tu paries que j'y arrive ? #maths #4e",
         sq=("02q-question", "Laquelle est la décomposition de 12 ?", ["2 × 6", "2 × 2 × 3", "3 × 4"], 1, "6 et 4 se cassent encore ; 2 et 3, non."),
         sa="Ti Margo, sur son chantier, casse le nombre 84 à coups de marteau : 2 × 42, 2 × 21, 3 × 7.\nLe 7 ne casse pas : il est premier. Ses briques : 84 = 2 × 2 × 3 × 7.",
         stoi="casse 150 en facteurs premiers. Réponds en commentaire !",
         stags=["marteau", "décomposition en facteurs premiers", "facteurs premiers"]),
    dict(num="11", slug="defi", p="premier", n=4, micro="premier_defi", ceinture="verte", sc="verte", centres=["jeux-video"],
         titre="Compter les diviseurs sans les écrire — Défis sur les nombres premiers — épisode 4 · Maths 4e",
         intro="Elsa organise des tournois de jeux vidéo. 36 joueurs sont inscrits, et elle veut des équipes de même taille. Combien de tailles d'équipe sont possibles ? C'est le nombre de diviseurs de 36, et on peut le compter sans les écrire.",
         puces=["on décompose en facteurs premiers : 36 = 2 × 2 × 3 × 3", "pour chaque facteur, un choix de plus que le nombre de fois où il apparaît", "on multiplie les choix : 3 × 3 = 9 diviseurs"],
         defi="72 = 2 × 2 × 2 × 3 × 3 : combien de tailles d'équipe possibles ?",
         chap=[("01-situation", "Elsa, organisatrice de tournois"), ("02-petit", "Commençons par 12"), ("03-verif", "Vérifions"), ("03q-question", "Question 1"), ("04-elsa", "Les équipes d'Elsa"), ("05-piege", "Le piège"), ("05q-question", "Question 2"), ("06-defi", "À toi de jouer"), ("06b-correction", "Correction"), ("07-finale", "Ce que tu as appris")],
         qs=[("03q-question", "45 = 3 × 3 × 5. Combien a-t-il de diviseurs ?", ["3", "5", "6"], 2, "3 choix pour le 3, 2 choix pour le 5 : 3 × 2 = 6."),
             ("05q-question", "Un nombre s'écrit 2 × 3 × 5. Combien a-t-il de diviseurs ?", ["3", "6", "8"], 2, "Deux choix pour chaque facteur : 2 × 2 × 2 = 8.")],
         tags=["nombre de diviseurs", "décomposition en facteurs premiers", "défi", "jeux vidéo", "tournoi", "e-sport"],
         st="Les diviseurs de 60, sans en écrire un seul : tu paries ? #maths #4e",
         sq=("03q-question", "18 = 2 × 3 × 3. Combien a-t-il de diviseurs ?", ["3", "5", "6"], 2, "2 choix pour le 2, 3 choix pour le 3 : 2 × 3 = 6."),
         sa="Sur le plateau d'un jeu télévisé, Ti Margo parie qu'il compte les diviseurs de 60 sans les écrire.\nSa méthode : 60 = 2 × 2 × 3 × 5. Un diviseur, c'est un choix : 0, 1 ou 2 fois le 2, 0 ou 1 fois le 3, 0 ou 1 fois le 5. 3 × 2 × 2 = 12 diviseurs.",
         stoi="combien de diviseurs a 100 ? Réponds en commentaire !",
         stags=["jeu télévisé", "nombre de diviseurs", "facteurs premiers"]),
]


def nom_de(e, suf=""):
    return f"4e-{e['p']}-{e['slug']}{suf}"


def entrees():
    temps = json.loads(TEMPS.read_text(encoding="utf-8"))
    out = []
    for e in EPS:
        p, N = e["p"], NOTIONS[e["p"]]
        rep = f"{e['num']}-{e['slug']}"
        dos = f"4e/maths/divisibilite/{rep}"
        ident = nom_de(e)
        fic = f"eleveai-maths-{ident}"
        T = temps[ident]
        acc = e["intro"] + "\n\nDans cette vidéo :\n" + "\n".join("• " + x for x in e["puces"])
        acc += f"\n\n⏸ 2 questions-pauses : mets pause, et choisis !\n🥋 Ceinture {e['ceinture']}.\nUn défi en fin de vidéo, avec sa correction : {e['defi']}"
        acc += f"\n\nPour s'entraîner :\n• la fiche de cours : {cours(p)}\n• les exercices corrigés : {exos(p)}\n• la série du coach sur cette compétence : {coach(p, e['micro'])}"
        acc += f"\n\n🔢 Épisode {e['n']} sur {N['nb']} de la série {N['serie']} d'EleveAI, en 4e."
        print(ident)
        chap = chapitres(e["chap"], T["clips"], T["duree"])
        qs = [{"t": mmss(T["clips"][c]), "question": q, "choix": ch, "reponse": r, "explication": x} for c, q, ch, r, x in e["qs"]]
        out.append({
            "id": ident, "pas_avant": PAS_AVANT, "notionId": N["notion"], "microId": e["micro"], "classe": "4e",
            "ceinture": e["ceinture"], "serie": "Maths 4e", "type": "longue", "fichier": f"{dos}/{fic}.mp4", "miniature": f"{dos}/{fic}.png",
            "titre": e["titre"], "accroche": acc, "chapitres": chap, "fiche": cours(p), "fiche_exercices": exos(p),
            "tags": list(dict.fromkeys(e["tags"] + N["communs"] + COMMUNS)), "questions": qs, "centres": e["centres"],
        })
        ts = temps[ident + "-short"]["clips"]
        c, q, ch, r, x = e["sq"]
        sacc = e["sa"] + f"\n\nFilm d'animation 3D, voix de synthèse.\n🥋 Ceinture {e['sc']}.\n👉 À toi : {e['stoi']}"
        sacc += f"\n\n▶️ L'épisode complet : {{{{LONGUE}}}}\n🎯 Le coach : {coach(p, e['micro'])}\n\nFait à La Réunion 🌋 — Frédéric Lacoste\n\n#Shorts #maths {N['hashtag']} #4e #collège"
        out.append({
            "id": ident + "-short", "pas_avant": PAS_AVANT, "notionId": N["notion"], "microId": e["micro"], "classe": "4e",
            "ceinture": e["sc"], "serie": "Maths 4e", "type": "short", "renvoie_vers": ident,
            "fichier": f"{dos}/{fic}-short.mp4", "miniature": f"{dos}/{fic}-short-miniature.png",
            "titre": e["st"], "accroche": sacc, "tags": list(dict.fromkeys(e["stags"] + ["Ti Margo", "dessin animé", "film d'animation 3D"] + N["communs"] + COMMUNS + ["Shorts"])),
            "questions": [{"t": mmss(ts[c]), "question": q, "choix": ch, "reponse": r, "explication": x}], "centres": e["centres"],
        })
    return out


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    mode = sys.argv[1]
    if mode == "temps":
        res = {}
        for e in EPS:
            for suf in ("", "-short"):
                nom = nom_de(e, suf)
                mp4 = SERIE / f"{e['num']}-{e['slug']}" / f"eleveai-maths-{nom}.mp4"
                clips, duree = mesurer(nom, mp4)
                res[nom] = {"duree": duree, "clips": clips}
                print(nom, duree, "fin", clips[list(clips)[-1]])
        TEMPS.write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding="utf-8")
    elif mode == "essai":
        for v in entrees():
            print(v["id"], v.get("chapitres"), [qq["t"] for qq in v["questions"]])
    elif mode == "manifeste":
        sauve = Path(tempfile.gettempdir()) / "manifeste-youtube.avant-divisibilite.json"
        shutil.copy(MANIFESTE, sauve)
        texte = MANIFESTE.read_text(encoding="utf-8")
        data = json.loads(texte)
        neuves = entrees()
        ids = {n["id"] for n in neuves}
        avant = len(data["videos"])
        # une entrée déjà publiée garderait son url : on ne remplace que ce que nous avons écrit
        for v in data["videos"]:
            if v["id"] in ids and v.get("url"):
                raise SystemExit("déjà publiée : " + v["id"])
        data["videos"] = [v for v in data["videos"] if v["id"] not in ids] + neuves
        sortie = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
        MANIFESTE.write_text(sortie, encoding="utf-8", newline="\n" if "\r\n" not in texte else "\r\n")
        print("manifeste :", avant, "→", len(data["videos"]), "sauvegarde", sauve)


if __name__ == "__main__":
    main()
