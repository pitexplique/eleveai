# passe_relatifs.py
# Passe finale de la série OPÉRATIONS SUR LES RELATIFS 4e : les 14 entrées du manifeste.
# Les temps des chapitres et des questions sont relevés dans l'AUDIO de chaque mp4 (corrélation
# avec les WAV des clips), jamais estimés. Le manifeste a des modifications non commitées d'autres
# sessions : on sauvegarde, on lit, puis on écrit dans une étape séparée, en ajoutant seulement.
#
#   python manim/passe_relatifs.py temps     → scratch : manim/sorties/4e/maths/relatifs/temps.json
#   python manim/passe_relatifs.py manifeste → ajoute ou remplace les 14 entrées 4e-relatif-*
import json
import shutil
import subprocess
import sys
import tempfile
import wave
from pathlib import Path

import numpy as np

RACINE = Path(__file__).resolve().parents[1]
SERIE = RACINE / "manim" / "sorties" / "4e" / "maths" / "relatifs"
VOIX = RACINE / "manim" / "voix"
SONS = RACINE / "public" / "sons"
MANIFESTE = RACINE / "manim" / "manifeste-youtube.json"
TEMPS = SERIE / "temps.json"
SR = 8000
PAS_AVANT = "2026-12-01"  # date de prudence : rien sur YouTube sans son ordre
COURS = "https://www.eleveai.fr/fiches-cours/maths/4e/relatif-operation"
EXOS = "https://www.eleveai.fr/fiches-exercices/maths/4e/relatif-operation"


def coach(micro):
    return f"https://www.eleveai.fr/coach/serie?classe=4e&matiere=maths&notion=relatif_operation&microId={micro}&display=simple"


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


# ───── Les contenus ─────
EPS = [
    dict(num="01", slug="addition", micro="relatif_addition", n=1, ceinture="jaune", sc="jaune", centres=["jeux-video"],
         titre="Moins + moins, ça ne fait pas plus — Additionner des relatifs — épisode 1 · Maths 4e",
         intro="Inès est conceptrice de jeux vidéo. Un joueur a −3 points et il attrape un bonus de 7 points. Quel est son score ? Et s'il tombe dans deux pièges de suite ?",
         puces=["signes contraires : on soustrait les distances à zéro, on garde le signe du plus éloigné", "même signe : (−5) + (−4) = −9, et pas +9", "deux nombres opposés font zéro"],
         defi="(−8) + (−2) et 9 + (−4).",
         chap={"01-jeu": "Inès, conceptrice de jeux vidéo", "02-droite": "Sur la droite graduée", "03-contraires": "Signes contraires", "03q-question": "Question 1", "04-pieges": "Deux pièges de suite", "05-meme-signe": "Même signe", "06-piege": "Le piège", "06q-question": "Question 2", "07-opposes": "Deux nombres opposés", "08-defi": "À toi de jouer", "08b-correction": "Correction", "09-finale": "Ce que tu as appris"},
         qs=[("03q-question", "Que vaut (−8) + 5 ?", ["−13", "−3", "3"], 1, "Signes contraires : 8 − 5 = 3, et −8 est le plus éloigné de zéro."),
             ("06q-question", "Que vaut (−6) + (−7) ?", ["13", "−1", "−13"], 2, "Même signe : 6 + 7 = 13, et on garde le signe moins.")],
         tags=["addition", "additionner des relatifs", "signes contraires", "droite graduée", "jeux vidéo", "conceptrice de jeux vidéo"], metier="jeux vidéo",
         st="Cet ascenseur est fou : tu paries que tu ne devines pas où il me dépose ? #maths #4e",
         sq=("01q-question", "À quel niveau je sors ?", ["−10", "4", "10"], 1, "−3 + 7 = 4 : 3 étages jusqu'à zéro, encore 4."),
         sa="Ti Margo part du parking, au niveau −3, et appuie sur +7. Où sort-il ? Puis l'ascenseur s'emballe jusqu'à la cave.\nLa cage d'ascenseur est une droite graduée : additionner des relatifs, tu vas le voir de tes yeux.",
         stoi="je pars du niveau 2. −5, +9, −7. À quel niveau j'arrive ? Réponds en commentaire !",
         stags=["ascenseur", "addition", "droite graduée"]),
    dict(num="02", slug="soustraction", micro="relatif_soustraction", n=2, ceinture="orange", sc="orange", centres=["meteo-climat"],
         titre="Enlever peut faire monter — Soustraire des relatifs — épisode 2 · Maths 4e",
         intro="Mathis est météorologue. À Lyon, il fait 5 degrés. À Montréal, −3 degrés. Quel est l'écart de température ? Il va nous faire enlever un nombre négatif.",
         puces=["soustraire, c'est ajouter l'opposé : 5 − (−3) = 5 + 3 = 8", "les deux moins ne disent pas la même chose", "le piège : seul le second nombre change de signe"],
         defi="l'écart entre −7 degrés au sommet et 4 degrés dans la vallée, et (−1) − 6.",
         chap={"01-meteo": "Mathis, météorologue", "02-thermometre": "Sur le thermomètre", "03-calcul": "Un écart, c'est une soustraction", "04-regle": "La règle : ajouter l'opposé", "05-deux-moins": "Les deux moins", "05q-question": "Question 1", "06-baisse": "Quand ça baisse", "07-piege": "Le piège", "07q-question": "Question 2", "08-defi": "À toi de jouer", "08b-correction": "Correction", "09-finale": "Ce que tu as appris"},
         qs=[("05q-question", "4 − (−6) revient à quel calcul ?", ["4 − 6", "4 + 6", "−4 + 6"], 1, "On ajoute l'opposé de −6 : 4 + 6, donc 10."),
             ("07q-question", "Que vaut (−2) − (−5) ?", ["−7", "3", "7"], 1, "On ajoute l'opposé de −5 : −2 + 5 = 3.")],
         tags=["soustraction", "soustraire des relatifs", "opposé", "thermomètre", "météo", "météorologue"], metier="météo",
         st="J'enlève un sac de sable : je descends ? Tu paries ? #maths #4e",
         sq=("01q-question", "J'enlève 3 sacs de sable. Quelle est mon altitude ?", ["2", "8", "5"], 1, "Retirer −3, c'est ajouter 3 : 5 − (−3) = 8."),
         sa="Ti Margo part en montgolfière à l'altitude 5. Il lâche 3 sacs de sable qui valent −1 chacun : où arrive-t-il ? Puis il enlève ses 9 petits ballons, et c'est le plouf.\nRetirer −3, c'est comme ajouter 3 : tu vas le voir de tes yeux.",
         stoi="je suis à l'altitude 2. J'enlève 6 sacs de sable, puis 4 petits ballons. Quelle est mon altitude ? Réponds en commentaire !",
         stags=["montgolfière", "soustraction", "opposé"]),
    dict(num="03", slug="multiplication", micro="relatif_multiplication", n=3, ceinture="orange", sc="orange", centres=["nature-ecologie", "sciences"],
         titre="Pourquoi moins par moins fait plus — Multiplier des relatifs — épisode 3 · Maths 4e",
         intro="Léa est glaciologue. Un glacier perd 4 mètres par an : dans 3 ans ? Et il y a 2 ans, était-il plus épais ou moins épais ? On remonte le temps pour comprendre pourquoi moins par moins, ça fait plus.",
         puces=["une perte répétée : (−4) × 3 = −12", "remonter le temps : (−5) × (−2) = +10", "la table des signes, et le piège de l'addition"],
         defi="(−4) × (−3) et (−1) × 9.",
         chap={"01-glacier": "Léa, glaciologue", "02-differents": "Une perte répétée", "03-methode": "Le signe d'abord", "03q-question": "Question 1", "04-passe": "Remonter le temps", "05-film": "Le film à l'envers", "06-suite": "La suite qui continue", "07-table": "La table des signes", "08-piege": "Le piège", "08q-question": "Question 2", "09-defi": "À toi de jouer", "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
         qs=[("03q-question", "Que vaut 6 × (−3) ?", ["18", "−18", "3"], 1, "Signes différents, donc négatif, et 6 × 3 = 18."),
             ("08q-question", "Que vaut (−7) × (−1) ?", ["−7", "7", "−8"], 1, "Deux signes identiques : positif, et 7 × 1 = 7.")],
         tags=["multiplication", "multiplier des relatifs", "règle des signes", "moins par moins", "glacier", "glaciologue"], metier="glacier",
         st="Moins par moins, ça fait plus. Tu paries que non ? #maths #4e",
         sq=("02q-question", "Où j'arrive ?", ["−6", "+6", "−5"], 1, "Vers la gauche, film à l'envers : (−2) × (−3) = +6."),
         sa="Ti Margo marche vers la gauche, mais le film tourne à l'envers. Où arrive-t-il ?\nMoins par moins, ça fait plus : tu vas le voir de tes yeux.",
         stoi="je marche vers la droite, 5 pas par seconde. Le film tourne à l'envers pendant 4 secondes. Où j'arrive ? Réponds en commentaire !",
         stags=["moins par moins", "multiplication", "règle des signes"]),
    dict(num="04", slug="division", micro="relatif_division", n=4, ceinture="orange", sc="orange", centres=["animaux"],
         titre="Rien de nouveau à apprendre — Diviser des relatifs — épisode 4 · Maths 4e",
         intro="Nour est biologiste marine. Elle plonge pour observer des tortues : en 3 minutes, elle arrive à −12 mètres. De combien change sa position à chaque minute ? Et faut-il une nouvelle règle pour diviser ?",
         puces=["diviser, c'est défaire une multiplication : la même table des signes", "(−20) ÷ (−5) = 4 : deux négatifs donnent un positif", "pour vérifier, on multiplie"],
         defi="(−24) ÷ 6 et (−35) ÷ (−7).",
         chap={"01-plongee": "Nour, biologiste marine", "02-partage": "Un partage", "03-lien": "Le lien avec la multiplication", "04-methode": "Le signe d'abord", "04q-question": "Question 1", "05-temps": "Combien de minutes ?", "06-minutes": "Sur le dessin", "07-verifier": "On vérifie", "08-piege": "Le piège", "08q-question": "Question 2", "09-defi": "À toi de jouer", "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
         qs=[("04q-question", "Que vaut 15 ÷ (−3) ?", ["5", "−5", "12"], 1, "Signes différents, donc négatif, et 15 ÷ 3 = 5."),
             ("08q-question", "Que vaut (−36) ÷ (−9) ?", ["−4", "4", "−45"], 1, "Signes identiques, donc positif, et 4 × (−9) donne bien −36.")],
         tags=["division", "diviser des relatifs", "règle des signes", "plongée", "tortues", "biologiste marine"], metier="plongée",
         st="Un trésor à −20 m. Dans le coffre, il y a quoi ? Tu paries ? #maths #4e",
         sq=("01q-question", "En combien de jours j'atteins le trésor ?", ["−4", "4", "15"], 1, "(−20) ÷ (−5) = 4 : un nombre de jours, c'est positif."),
         sa="Ti Margo creuse 5 mètres par jour pour atteindre un trésor à −20 mètres. En combien de jours ? Et surtout, qu'y a-t-il dans le coffre ?\n(−20) ÷ (−5) = 4, puis (−12) ÷ 3 = −4 : la division des nombres relatifs, à la pelle.",
         stoi="un autre trésor, à −36 mètres. Je creuse 4 mètres par jour. Combien de jours ? Réponds en commentaire !",
         stags=["trésor", "division", "règle des signes"]),
    dict(num="05", slug="calcul", micro="relatif_calcul", n=5, ceinture="verte", sc="verte", centres=["technologie-ia"],
         titre="Par quelle opération commencer ? — Calculer avec des relatifs — épisode 5 · Maths 4e",
         intro="Sami est ingénieur en robotique. Au concours, son robot fait 4 fautes à −3 points et gagne un bonus de 5 points. Son score : −3 × 4 + 5. Lire de gauche à droite donnerait −27 : faux !",
         puces=["l'ordre : parenthèses, multiplications et divisions, puis additions et soustractions", "on réécrit tout le calcul à chaque étape", "3 × (−2 + 6) n'est pas 3 × (−2) + 6"],
         defi="−4 × 5 + 8 et 6 − 3 × (−2).",
         chap={"01-robot": "Sami, ingénieur en robotique", "02-ordre": "L'ordre des opérations", "03-calcul": "La multiplication d'abord", "04-piege": "Le piège", "04q-question": "Question 1", "05-reecrire": "Tout réécrire", "06-parentheses": "Avec des parenthèses", "07-division": "Avec une division", "07q-question": "Question 2", "08-defi": "À toi de jouer", "08b-correction": "Correction", "09-finale": "Ce que tu as appris"},
         qs=[("04q-question", "Que vaut 10 + (−2) × 3 ?", ["24", "4", "16"], 1, "La multiplication d'abord : (−2) × 3 = −6, puis 10 + (−6) = 4."),
             ("07q-question", "Dans −6 − 2 × (−5), par quoi commence-t-on ?", ["−6 − 2", "2 × (−5)", "−5 − 6"], 1, "2 × (−5) = −10, puis −6 − (−10) = 4.")],
         tags=["priorités opératoires", "calcul avec des relatifs", "ordre des opérations", "robot", "robotique", "ingénieur"], metier="robot",
         st="−2 + 3 × (−4) : tu paries que je trouve du premier coup ? #maths #4e",
         sq=("01q-question", "Quelle porte je dois ouvrir ?", ["−4", "−14", "10"], 1, "La multiplication d'abord : 3 × (−4) = −12, puis −2 + (−12) = −14."),
         sa="Trois portes, un seul bon résultat. Derrière les deux autres : plouf, dans la piscine !\nTi Margo se trompe deux fois : la multiplication d'abord, et le moins du 4 ne s'oublie pas.",
         stoi="−5 × 2 + (−3) × (−4). Quel résultat ? Réponds en commentaire !",
         stags=["3 portes", "priorités opératoires", "multiplication d'abord"]),
    dict(num="06", slug="probleme", micro="relatif_probleme", n=6, ceinture="verte", sc="orange", centres=["sport", "nature-ecologie"],
         titre="De l'histoire au calcul — Résoudre un problème avec des relatifs — épisode 6 · Maths 4e",
         intro="Clara est guide de haute montagne. Au petit matin, il fait −2 degrés au refuge, et ça monte de 7 degrés. Combien fera-t-il ? Trois étapes pour passer de l'histoire au calcul.",
         puces=["traduire : hausse positive, baisse négative", "calculer dans le bon ordre, répondre avec l'unité et contrôler", "une variation, c'est l'arrivée moins le départ"],
         defi="une cordée part de 1 500 mètres, monte de 400 mètres, puis redescend de 200 mètres par heure pendant 3 heures.",
         chap={"01-refuge": "Clara, guide de haute montagne", "02-traduire": "Étape 1 : traduire", "03-calculer": "Étape 2 : calculer", "04-repondre": "Étape 3 : répondre", "04q-question": "Question 1", "05-repetee": "Une baisse répétée", "06-variation": "Une variation", "06q-question": "Question 2", "07-piege": "Le piège", "08-defi": "À toi de jouer", "08b-correction": "Correction", "09-finale": "Ce que tu as appris"},
         qs=[("04q-question", "Il fait 3 degrés, et la température baisse de 8 degrés. Quel calcul ?", ["3 + 8", "3 + (−8)", "−3 + 8"], 1, "3 + (−8) = −5 : il fait −5 degrés."),
             ("06q-question", "Le matin, −6 degrés. À midi, 2 degrés. Quelle est la variation ?", ["−4", "8", "−8"], 1, "Arrivée moins départ : 2 − (−6) = 8 degrés de hausse.")],
         tags=["problème", "résoudre un problème", "variation", "température", "montagne", "guide de haute montagne"], metier="montagne",
         st="Tu paries que je tiens jusqu'au soir ? −6 + 9, puis −4 par heure #maths #4e",
         sq=("01q-question", "Quelle température fait-il à midi ?", ["−15", "3", "15"], 1, "−6 + 9 = 3 degrés."),
         sa="Ti Margo, un gecko, n'a jamais vu la neige. Au réveil, il fait −6 degrés. Il tient jusqu'au soir ?\nLe thermomètre suit le calcul, degré par degré : −6 + 9 = 3, puis 3 + (−8) = −5.",
         stoi="cette nuit, on part de −5 degrés. Ça baisse encore de 2 degrés par heure, pendant 3 heures. Quelle température fera-t-il ? Réponds en commentaire !",
         stags=["neige", "température", "thermomètre"]),
    dict(num="07", slug="defi", micro="relatif_operation_defi", n=7, ceinture="verte", sc="orange", centres=["histoire-geographie"],
         titre="Démasque les erreurs du vieux cahier — Défis sur les relatifs — épisode 7 · Maths 4e",
         intro="Lou est historienne des sciences. Il y a 2 000 ans, en Chine, on calculait déjà avec des baguettes. En Europe, on appelait encore ces nombres « absurdes » il y a quelques siècles. Mène l'enquête dans un vieux cahier rempli d'erreurs.",
         puces=["avant de calculer, on regarde l'opération", "dans un produit, on compte les moins : pair, positif ; impair, négatif", "un nombre effacé se retrouve par le signe et par une multiplication"],
         defi="(−3) × (−5) contre (−3) + (−5), le signe de −1 sept fois de suite, et le nombre qui, multiplié par −6, donne −30.",
         chap={"01-histoire": "Lou, historienne des sciences", "02-cahier": "Le cahier : première erreur", "03-erreur2": "Deuxième erreur", "03q-question": "Question 1", "04-compter": "On compte les moins", "05-pair": "Pair ou impair", "05q-question": "Question 2", "06-efface": "Le nombre effacé", "07-defi": "À toi de jouer", "07b-correction": "Correction", "08-finale": "Ce que tu as appris"},
         qs=[("03q-question", "Dans le cahier : (−6) + (−2) = 8. D'où vient l'erreur ?", ["La règle de la multiplication, utilisée pour une addition", "Une erreur de priorité", "Un oubli de parenthèses"], 0, "Le résultat est −8 : moins et moins ne donnent plus que pour multiplier."),
             ("05q-question", "Quel est le signe de (−1) × 2 × (−3) × (−4) × 5 ?", ["positif", "négatif", "on ne peut pas savoir"], 1, "3 moins, c'est impair ; le 2 et le 5 sont positifs.")],
         tags=["défi", "erreurs à démasquer", "compter les moins", "histoire des maths", "baguettes chinoises", "historienne des sciences"], metier="histoire",
         st="−1 fois −1 fois −1… 100 fois de suite, sans calculatrice. Tu paries que tu y arrives ? #maths #4e",
         sq=("02q-question", "100 dalles : que dit ma pancarte ?", ["moins", "plus", "on ne peut pas savoir"], 1, "100, c'est pair : les moins vont par deux."),
         sa="Ti Margo traverse un temple dans la jungle, sur 100 dalles gravées « −1 ». À chaque dalle, sa pancarte se retourne.\nQue dit-elle à la 100e ? Il court vérifier.",
         stoi="j'ajoute une dalle. −1, 101 fois de suite. Quel est le résultat ? Réponds en commentaire !",
         stags=["pair ou impair", "règle des signes", "moins par moins"]),
]

COMMUNS = ["nombres relatifs", "maths", "4e", "collège", "cycle 4", "CRPE", "EleveAI"]


def entrees():
    temps = json.loads(TEMPS.read_text(encoding="utf-8"))
    out = []
    for e in EPS:
        slug, rep = e["slug"], f"{e['num']}-{e['slug']}"
        dos = f"4e/maths/relatifs/{rep}"
        nom = f"eleveai-maths-4e-relatif-{slug}"
        t = temps[f"4e-relatif-{slug}"]["clips"]
        acc = e["intro"] + "\n\nDans cette vidéo :\n" + "\n".join("• " + p for p in e["puces"])
        acc += f"\n\n⏸ 2 questions-pauses : mets pause, et choisis !\n🥋 Ceinture {e['ceinture']}.\nUn défi en fin de vidéo, avec sa correction : {e['defi']}"
        acc += f"\n\nPour s'entraîner :\n• la fiche de cours : {COURS}\n• les exercices corrigés : {EXOS}\n• la série du coach sur cette compétence : {coach(e['micro'])}"
        acc += f"\n\n🔢 Épisode {e['n']} sur 7 de la série Relatifs d'EleveAI, en 4e."
        chap = [["00:00", e["chap"][next(iter(e["chap"]))]]] + [[mmss(t[c]), lib] for c, lib in list(e["chap"].items())[1:]]
        qs = [{"t": mmss(t[c]), "question": q, "choix": ch, "reponse": r, "explication": x} for c, q, ch, r, x in e["qs"]]
        out.append({
            "id": f"4e-relatif-{slug}", "pas_avant": PAS_AVANT, "notionId": "relatif_operation", "microId": e["micro"], "classe": "4e",
            "ceinture": e["ceinture"], "serie": "Maths 4e", "type": "longue", "fichier": f"{dos}/{nom}.mp4", "miniature": f"{dos}/{nom}.png",
            "titre": e["titre"], "accroche": acc, "chapitres": chap, "fiche": COURS, "fiche_exercices": EXOS,
            "tags": e["tags"] + COMMUNS, "questions": qs, "centres": e["centres"],
        })
        ts = temps[f"4e-relatif-{slug}-short"]["clips"]
        c, q, ch, r, x = e["sq"]
        sacc = e["sa"] + f"\n\nFilm d'animation 3D, voix de synthèse.\n🥋 Ceinture {e['sc']}.\n👉 À toi : {e['stoi']}"
        sacc += f"\n\n▶️ L'épisode complet : {{{{LONGUE}}}}\n🎯 Le coach : {coach(e['micro'])}\n\n#Shorts #maths #relatifs #4e #collège"
        out.append({
            "id": f"4e-relatif-{slug}-short", "pas_avant": PAS_AVANT, "notionId": "relatif_operation", "microId": e["micro"], "classe": "4e",
            "ceinture": e["sc"], "serie": "Maths 4e", "type": "short", "renvoie_vers": f"4e-relatif-{slug}",
            "fichier": f"{dos}/{nom}-short.mp4", "miniature": f"{dos}/{nom}-short-miniature.png",
            "titre": e["st"], "accroche": sacc, "tags": e["stags"] + ["Ti Margo", "dessin animé", "film d'animation 3D"] + COMMUNS + ["Shorts"],
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
                nom = f"4e-relatif-{e['slug']}{suf}"
                mp4 = SERIE / f"{e['num']}-{e['slug']}" / f"eleveai-maths-{nom}.mp4"
                clips, duree = mesurer(nom, mp4)
                res[nom] = {"duree": duree, "clips": clips}
                print(nom, duree, "fin", clips[list(clips)[-1]])
        TEMPS.write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding="utf-8")
    elif mode == "manifeste":
        sauve = Path(tempfile.gettempdir()) / "manifeste-youtube.avant-relatifs.json"
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
