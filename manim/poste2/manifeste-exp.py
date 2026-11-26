# manim/poste2/manifeste-exp.py
# LES 6 ENTRÉES DE LA SÉRIE « FONCTION EXPONENTIELLE » (terminale spé, 26/11/2026)
# → `manim/manifeste-youtube.json` (copie de travail) et `manim/poste2/videos-r2-exp.json`.
#
#   python -X utf8 manim/poste2/manifeste-exp.py            # contrôle seul : rien n'est écrit
#   python -X utf8 manim/poste2/manifeste-exp.py --ecrire   # écrit le manifeste + videos-r2-exp.json
#   … --cache   # réutilise les journaux de dry run déjà faits (dossier temporaire), s'ils sont
#               # plus récents que la scène
#
# ⛔⛔ LES INSTANTS NE SE DEVINENT PAS. Les chapitres et le `t` des questions-pauses viennent
# des lignes `ECRAN` et `QUESTION` du DRY RUN de chaque scène (`--dry_run`, pas un rendu) :
#   AUDIT=1 python -m manim render -ql --dry_run scripts/terminale/exp_<micro>.py <Classe>
# La lettre de la bonne réponse est CONFRONTÉE : table des voix (SCRIPTS-tle-exponentielle.md),
# champ `reponse` ci-dessous, et `reponse=` que la scène écrit. Si elles diffèrent, on refuse.
# ⛔ Une scène absente (exp_proprietes.py en cours d'écriture) : son entrée est préparée ici
# mais N'EST PAS écrite, plutôt qu'écrite sans ses chapitres.
#
# ⛔ Format du manifeste reproduit à l'identique (détecté comme `outils-commit-cles.py` :
# indentation, séparateurs, ensure_ascii=False, fin de fichier). On ne remplace QUE nos 6 ids :
# le fichier est partagé, et ses autres modifs non commitées restent telles quelles.
# ⛔ Aucun « ^ » dans les textes : exposants Unicode (eˣ, e²ˣ, e⁻ᵗ). Aucun chevron < > (YouTube
# les refuse dans la description et le titre) : « plus petit que » en toutes lettres.
# ⛔ lib/videos/videos-r2.json n'est PAS touché : les 6 entrées vont dans videos-r2-exp.json.

import json
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
RACINE = Path(__file__).resolve().parents[2]
MANIM = RACINE / "manim"
REGISTRE = MANIM / "manifeste-youtube.json"
SORTIE_R2 = MANIM / "poste2" / "videos-r2-exp.json"
CACHE = Path(tempfile.gettempdir()) / "eleveai-exp-dry"

NOTION = "fonction_exponentielle"
CLASSE = "terminale-spe"
SERIE = "Maths Tle spé"
FICHE = "https://www.eleveai.fr/fiches-exercices/maths/terminale-spe/fonction-exponentielle"
# (vérifié le 26/11 : lib/fiches-exercices/registre.ts « maths/terminale-spe/fonction-exponentielle »
#  et app/fiches-exercices/maths/terminale-spe/fonction-exponentielle/ existent)
TOTAL = 6
CEINTURES = {"orange": "orange", "verte": "verte", "bleue": "bleue", "noire": "noire"}
TAGS_FIN = ["fonction exponentielle", "exponentielle", "analyse", "maths", "terminale",
            "spé maths", "bac", "lycée", "EleveAI"]

# Chapitres : un par écran utile. 00 et 01 forment ensemble la « situation ».
ECRANS = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "09b", "10"]


def coach_url(micro, absolu=True):
    q = f"/coach/serie?classe={CLASSE}&matiere=maths&notion={NOTION}&microId={micro}&display=simple"
    return ("https://www.eleveai.fr" + q) if absolu else q


EP = [
    dict(
        micro="exp_definition", scene="ExpDefinitionTerminale", ceinture="orange",
        titre="Une vidéo qui devient virale ? — La fonction exponentielle · Tle spé",
        situation="Inès est community manager : elle s'occupe des comptes d'une marque sur les réseaux sociaux. Une de ses vidéos se met à tourner : plus elle a de vues, plus elle en gagne vite. Quelle fonction grandit exactement à la vitesse de sa propre valeur ?",
        puces=[
            "f′ = f et f(0) = 1 : une seule fonction, l'exponentielle, notée eˣ",
            "eˣ est défini sur tous les réels, toujours strictement positif, et e ≈ 2,72",
            "sa dérivée, c'est elle-même : elle est strictement croissante",
            "la tangente en 0 : y = x + 1, et la courbe reste au-dessus",
            "le piège : e² = e × e ≈ 7,39, ce n'est pas 2 × e ≈ 5,44",
        ],
        defi="range e⁻¹, e⁰ et e¹ du plus petit au plus grand (réponse : e⁻¹ ≈ 0,37, puis e⁰ = 1, puis e ≈ 2,72)",
        chapitres=[
            "Une vidéo virale : Inès, community manager",
            "f′ = f et f(0) = 1",
            "Ce qu'il faut savoir sur eˣ",
            "Question 1",
            "La tangente en 0 : y = x + 1",
            "Le piège : eˣ n'est pas e fois x",
            "Question 2",
            "Citer les propriétés au bac",
            "À toi de jouer",
            "Correction",
            "Ce que tu as appris",
        ],
        tags=["e puissance x", "nombre e", "dérivée", "croissance", "vidéo virale",
              "réseaux sociaux", "community manager"],
        questions=[
            dict(question="Combien l'équation eˣ = 0 a-t-elle de solutions ?",
                 choix=["une : x = 0", "aucune", "une : x = 1"], reponse=1,
                 explication="eˣ est toujours strictement positif : il ne vaut jamais 0, l'équation n'a aucune solution. A confond avec e⁰, qui vaut 1, et pas 0."),
            dict(question="La fonction exponentielle est strictement croissante. Comment se comparent e² et e³ ?",
                 choix=["e² est plus grand", "ils sont égaux", "e² est plus petit"], reponse=2,
                 explication="2 est plus petit que 3, et une fonction strictement croissante garde l'ordre : e² est plus petit que e³. Pas besoin de calculatrice."),
        ],
        centres=["reseaux-sociaux"],
    ),
    dict(
        micro="exp_proprietes", scene="ExpProprietesTerminale", ceinture="orange",
        titre="Multiplier par e², puis par e³ ? — Propriétés de l'exponentielle · Tle spé",
        situation="Camille est technicienne dans un laboratoire de biologie : elle fait pousser des levures. Le matin, leur nombre est multiplié par e², l'après-midi par e³. Par combien a-t-il été multiplié sur toute la journée ? Sans calculatrice, avec les règles des exposants.",
        puces=[
            "e² × e³ = e⁵ : pour un produit, les exposants s'additionnent",
            "les règles : eᵃ × eᵇ = eᵃ⁺ᵇ ; eᵃ ÷ eᵇ = eᵃ⁻ᵇ ; e⁻ᵃ = 1 ÷ eᵃ ; (eᵃ)ⁿ = eⁿᵃ",
            "exemple : e⁵ × e⁻³ = e², et multiplier par e⁻³, c'est diviser par e³",
            "le piège : eᵃ + eᵇ n'est pas eᵃ⁺ᵇ (e + e ≈ 5,44, alors que e² ≈ 7,39)",
            "au bac, chaque étape avec la règle utilisée",
        ],
        defi="simplifier e⁴ × e⁻¹ ÷ e² (réponse : e¹ = e ≈ 2,72)",
        chapitres=[
            "Des levures qui se multiplient : Camille, technicienne de laboratoire",
            "e² × e³ = e⁵",
            "Les règles des exposants",
            "Question 1",
            "La dilution du soir : e⁵ × e⁻³",
            "Le piège : une somme ne se simplifie pas",
            "Question 2",
            "Rédiger au bac",
            "À toi de jouer",
            "Correction",
            "Ce que tu as appris",
        ],
        tags=["propriétés de l'exponentielle", "e puissance a", "exposants", "produit",
              "quotient", "levures", "laboratoire", "biologie"],
        questions=[
            dict(question="Que vaut e⁵ ÷ e² ?",
                 choix=["e puissance 2,5", "e³", "e⁷"], reponse=1,
                 explication="Pour une division, on soustrait les exposants : 5 − 2 = 3. A divise les exposants, et C les additionne."),
            dict(question="Simplifie : (eˣ)² × e⁻ˣ",
                 choix=["eˣ", "eˣ²", "1"], reponse=0,
                 explication="(eˣ)² = e²ˣ : on double l'exposant. Puis e²ˣ × e⁻ˣ : 2x − x = x, il reste eˣ. B met le carré sur x au lieu de doubler l'exposant."),
        ],
        centres=["sciences"],
    ),
    dict(
        micro="exp_deriver", scene="ExpDeriverTerminale", ceinture="verte",
        titre="À quelle vitesse le cœur redescend ? — Dériver eᵘ · Tle spé",
        situation="Malik est préparateur physique dans un club de handball. Après un sprint, le cœur d'une joueuse bat à 160 battements par minute, puis il redescend. Malik veut savoir à quelle vitesse : il lui faut la dérivée d'une exponentielle.",
        puces=[
            "la règle : la dérivée de eᵘ, c'est u′ × eᵘ",
            "exemple : la dérivée de e²ˣ, c'est 2e²ˣ",
            "le cœur de la joueuse : F′(0) = −50, il perd 50 battements par minute, à chaque minute",
            "le piège : x eˣ est un produit, sa dérivée est (1 + x) eˣ",
            "au bac, trois lignes : nommer u, appliquer la règle, factoriser par l'exponentielle",
        ],
        defi="dériver f(x) = e³ˣ⁺¹ et g(x) = eˣ² (réponse : f′(x) = 3e³ˣ⁺¹ et g′(x) = 2x eˣ²)",
        chapitres=[
            "Après un sprint : Malik, préparateur physique",
            "Le modèle du cœur, et F′",
            "La règle : (eᵘ)′ = u′ eᵘ",
            "Question 1",
            "Le cœur de la joueuse : F′(0) = −50",
            "Le piège : x eˣ est un produit",
            "Question 2",
            "Rédiger au bac",
            "À toi de jouer",
            "Correction",
            "Ce que tu as appris",
        ],
        tags=["dérivée exponentielle", "dérivée de e puissance u", "u prime", "dérivation",
              "fréquence cardiaque", "handball", "préparateur physique", "sport"],
        questions=[
            dict(question="Quelle est la dérivée de e⁻ˣ ?",
                 choix=["e⁻ˣ", "−x e⁻ˣ", "−e⁻ˣ"], reponse=2,
                 explication="Ici u = −x, donc u′ = −1 : la dérivée est −1 × e⁻ˣ = −e⁻ˣ. A oublie u′, et B multiplie par u au lieu de u′."),
            dict(question="Quelle est la dérivée de 5e²ˣ ?",
                 choix=["5e²ˣ", "10e²ˣ", "2e²ˣ"], reponse=1,
                 explication="La constante 5 reste devant, et la dérivée de e²ˣ est 2e²ˣ : 5 × 2 = 10. C perd le 5, et A oublie le 2."),
        ],
        centres=["sport", "handball-volley"],
    ),
    dict(
        micro="exp_equation_inequation", scene="ExpEquationInequationTerminale", ceinture="verte",
        titre="Quand ce titre va-t-il rattraper l'autre ? — Équations avec l'exponentielle · Tle spé",
        situation="Léa est programmatrice dans une radio. Deux titres montent en streaming : e²ˣ milliers d'écoutes pour le premier, eˣ⁺³ milliers pour le second, au bout de x semaines. Le premier part plus bas, mais grimpe plus vite. Quand va-t-il rattraper le second ?",
        puces=[
            "eᴬ = eᴮ si et seulement si A = B",
            "eᴬ plus petit que eᴮ si et seulement si A plus petit que B : l'inégalité garde son sens",
            "pour Léa : e²ˣ = eˣ⁺³ donne 2x = x + 3, donc x = 3 semaines",
            "le piège : eˣ = 0 ou eˣ = −2 n'a aucune solution, et eˣ = 1 donne x = 0",
            "au bac, trois lignes : écrire sous forme eᵘ, citer la croissance, résoudre",
        ],
        defi="résoudre e²ˣ plus grand que eˣ⁺³ (réponse : x plus grand que 3, soit ]3 ; +∞[)",
        chapitres=[
            "Deux titres en streaming : Léa, programmatrice radio",
            "Des exponentielles égales, des exposants égaux",
            "Les règles : égalité et inégalité",
            "Question 1",
            "Léa : x = 3 semaines",
            "Le piège : eˣ = 0 n'a pas de solution",
            "Question 2",
            "Rédiger au bac",
            "À toi de jouer",
            "Correction",
            "Ce que tu as appris",
        ],
        tags=["équation exponentielle", "inéquation exponentielle", "résoudre", "exposant",
              "streaming", "radio", "musique", "programmatrice"],
        questions=[
            dict(question="Résous eˣ⁺¹ = e⁴. Que vaut x ?",
                 choix=["3", "4", "5"], reponse=0,
                 explication="Les exposants sont égaux : x + 1 = 4, donc x = 3. B oublie le « + 1 », et C ajoute 1 au lieu de l'enlever."),
            dict(question="Résous l'inéquation : eˣ plus petit que e². Quelles sont les solutions ?",
                 choix=["]2 ; +∞[", "]−∞ ; 2[", "aucune solution"], reponse=1,
                 explication="L'inégalité garde son sens : x plus petit que 2, soit ]−∞ ; 2[. A retourne l'inégalité, comme si la fonction était décroissante."),
        ],
        centres=["musique"],
    ),
    dict(
        micro="exp_limite", scene="ExpLimiteTerminale", ceinture="bleue",
        titre="Qui gagne la course vers l'infini ? — Limites et croissances comparées · Tle spé",
        situation="Yanis est concepteur de niveaux dans un studio de jeux vidéo. Au niveau x, la force du joueur vaut x³, et celle des ennemis eˣ. Au niveau 2, le joueur est devant. Mais qui gagne quand les niveaux deviennent très grands ?",
        puces=[
            "eˣ tend vers +∞ en +∞, et vers 0 en −∞ : y = 0 est une asymptote",
            "croissances comparées : eˣ ÷ xⁿ tend vers +∞ en +∞, et xⁿ eˣ tend vers 0 en −∞",
            "au niveau 10 : e¹⁰ ≈ 22 026, contre 1 000 pour le joueur",
            "le piège : eˣ − x en +∞ est une forme indéterminée, on factorise par x",
            "au bac, on écrit « par croissances comparées »",
        ],
        defi="la limite de eˣ ÷ (x + 1) en +∞ (réponse : +∞)",
        chapitres=[
            "Le joueur contre les ennemis : Yanis, concepteur de niveaux",
            "Les deux limites de eˣ",
            "Les croissances comparées",
            "Question 1",
            "Niveau 10 : e¹⁰ contre 10³",
            "Le piège : une forme indéterminée",
            "Question 2",
            "Rédiger au bac",
            "À toi de jouer",
            "Correction",
            "Ce que tu as appris",
        ],
        tags=["limite exponentielle", "croissances comparées", "forme indéterminée", "asymptote",
              "limites", "jeux vidéo", "level design", "concepteur de niveaux"],
        questions=[
            dict(question="Quand x tend vers +∞, vers quoi tend 1 ÷ eˣ ?",
                 choix=["+∞", "1", "0"], reponse=2,
                 explication="Le dénominateur eˣ devient immense : 1 divisé par un nombre immense devient tout petit, la limite est 0. A oublie qu'on divise par l'exponentielle."),
            dict(question="Quand x tend vers +∞, vers quoi tend x e⁻ˣ ?",
                 choix=["0", "+∞", "1"], reponse=0,
                 explication="x e⁻ˣ, c'est x ÷ eˣ. Par croissances comparées, l'exponentielle l'emporte au dénominateur : le quotient tend vers 0. B ne regarde que le facteur x."),
        ],
        centres=["jeux-video"],
    ),
    dict(
        micro="exp_defi", scene="ExpDefiTerminale", ceinture="noire",
        titre="Quand y a-t-il le plus de médicament dans le sang ? — Exercice type bac, exponentielle · Tle spé",
        situation="Sarah est pharmacienne à l'hôpital. Un patient reçoit une piqûre dans le muscle : le médicament passe dans le sang, puis le corps l'élimine. À quel moment y en a-t-il le plus, et que devient la quantité ensuite ? Un exercice type bac, de la dérivée à la limite.",
        puces=[
            "le modèle : C(t) = 10t e⁻ᵗ, en milligrammes par litre, t en heures",
            "la méthode du bac en quatre temps : dériver, signe, tableau de variations, limite",
            "la dérivée d'un produit, puis on factorise : C′(t) = 10(1 − t) e⁻ᵗ",
            "le piège : écrire la phrase clé, e⁻ᵗ est strictement positif, donc C′(t) a le signe de 1 − t",
            "le maximum : C(1) = 10 ÷ e ≈ 3,68 mg/L, au bout d'une heure",
        ],
        defi="la limite de 10t e⁻ᵗ quand t tend vers +∞ (réponse : 0, par croissances comparées)",
        chapitres=[
            "Une piqûre à l'hôpital : Sarah, pharmacienne",
            "Le modèle : C(t) = 10t e⁻ᵗ",
            "La méthode du bac en quatre temps",
            "Question 1",
            "Dériver et factoriser",
            "Le piège : la phrase clé du signe",
            "Question 2",
            "Le maximum : 10 ÷ e en t = 1",
            "À toi de jouer",
            "Correction",
            "Ce que tu as appris",
        ],
        tags=["exercice type bac", "étude de fonction", "tableau de variations", "maximum",
              "croissances comparées", "concentration", "médicament", "pharmacienne", "santé"],
        questions=[
            dict(question="Pour dériver 10t e⁻ᵗ, quelle règle utilise-t-on d'abord ?",
                 choix=["la dérivée de eᵘ, seule", "la dérivée d'un quotient", "la dérivée d'un produit"], reponse=2,
                 explication="C'est un produit : 10t, fois e⁻ᵗ. 10t donne 10, et e⁻ᵗ donne −e⁻ᵗ. A oublie le facteur 10t."),
            dict(question="C′(t) a le signe de 1 − t. Sur quel intervalle la concentration augmente-t-elle ?",
                 choix=["de 0 à 1", "de 1 à +∞", "de 0 à 10"], reponse=0,
                 explication="1 − t est positif quand t est plus petit que 1 : C croît sur [0 ; 1], puis décroît. C confond avec le coefficient 10."),
        ],
        centres=["corps-sante", "sciences"],
    ),
]

# La table des voix (SCRIPTS-tle-exponentielle.md, « La place de la bonne réponse ») :
LETTRES_VOIX = {"exp_definition": "BC", "exp_proprietes": "BA", "exp_deriver": "CB",
                "exp_equation_inequation": "AB", "exp_limite": "CA", "exp_defi": "CA"}

# ⚠️ E2 : « e puissance x au carré » (choix B, le carré sur x) s'écrit eˣ², comme eˣ² dans E3 ;
# « e puissance 2,5 » (choix A) reste en lettres : la virgule n'a pas d'exposant Unicode.


def tiret(micro):
    """exp_equation_inequation → equation-inequation (l'id et le dossier portent déjà « exp- »)."""
    return micro.removeprefix("exp_").replace("_", "-")


def mmss(t):
    t = int(t)  # comme le `t=01:21` que la scène écrit : la seconde entamée ne compte pas
    return f"{t // 60:02d}:{t % 60:02d}"


def dry_run(ep, cache):
    py = MANIM / "scripts" / "terminale" / f"{ep['micro']}.py"
    if not py.exists():
        return None
    CACHE.mkdir(exist_ok=True)
    log = CACHE / f"{ep['micro']}.log"
    if cache and log.exists() and log.stat().st_mtime > py.stat().st_mtime:
        return log.read_text(encoding="utf-8")
    env = dict(os.environ, PYTHONIOENCODING="utf-8", AUDIT="1")
    r = subprocess.run([sys.executable, "-m", "manim", "render", "-ql", "--dry_run",
                        f"scripts/terminale/{ep['micro']}.py", ep["scene"]],
                       cwd=MANIM, env=env, capture_output=True, encoding="utf-8", errors="replace")
    txt = (r.stdout + "\n" + r.stderr).replace("\r", "\n")
    lignes = [l for l in txt.split("\n") if re.match(r"^(ECRAN|QUESTION|RETARD|AVANCE|BORD)", l)]
    if r.returncode != 0 or not lignes:
        raise SystemExit(f"⛔ dry run {ep['micro']} en échec (code {r.returncode}) :\n{txt[-1500:]}")
    log.write_text("\n".join(lignes) + "\n", encoding="utf-8")
    return log.read_text(encoding="utf-8")


def instants(ep, log):
    ecrans = {m.group(1): float(m.group(2)) for m in re.finditer(r"^ECRAN (\w+)-\S+ t=([\d.]+)", log, re.M)}
    quest = {m.group(1): (float(m.group(2)), m.group(3))
             for m in re.finditer(r"^QUESTION (\w+)-\S+ t=\S+ \(([\d.]+)\)(?: reponse=(\d))?", log, re.M)}
    alertes = re.findall(r"^(RETARD|AVANCE|BORD).*$", log, re.M)
    manque = [c for c in ["00"] + ECRANS if c not in ecrans]
    if manque:
        raise SystemExit(f"⛔ {ep['micro']} : écrans absents du dry run : {manque}")
    if ecrans["00"] != 0:
        raise SystemExit(f"⛔ {ep['micro']} : la garde ne commence pas à 0")
    chap = [["00:00", ep["chapitres"][0]]]
    for cle, nom in zip(ECRANS[1:], ep["chapitres"][1:]):
        chap.append([mmss(ecrans[cle]), nom])
    # Contrôle de la lettre : voix / entrée / écran rendu.
    for i, cle in enumerate(("04", "07")):
        q = ep["questions"][i]
        voix = "ABC".index(LETTRES_VOIX[ep["micro"]][i])
        ecran = quest.get(cle, (None, None))[1]
        if cle not in quest:
            raise SystemExit(f"⛔ {ep['micro']} : pas de ligne QUESTION {cle}")
        if not (q["reponse"] == voix == int(ecran)):
            raise SystemExit(f"⛔ {ep['micro']} Q{cle} : lettres en désaccord (entrée {q['reponse']}, "
                             f"voix {voix}, écran {ecran})")
        q["t"] = mmss(quest[cle][0])
    return chap, alertes, ecrans


def accroche(k, ep):
    micro = ep["micro"]
    txt = ep["situation"] + "\n\nDans cette vidéo :\n" + "\n".join("• " + p for p in ep["puces"])
    txt += ("\n\n⏸ 2 questions-pauses : mets pause, et choisis !"
            f"\n🥋 Ceinture {CEINTURES[ep['ceinture']]}."
            f"\nUn défi en fin de vidéo, avec sa correction : {ep['defi']}."
            "\n\nPour s'entraîner :"
            f"\n• les exercices corrigés : {FICHE}"
            f"\n• la série du coach sur cette compétence : {coach_url(micro)}"
            f"\n\n📈 Épisode {k} sur {TOTAL} de la série Fonction exponentielle d'EleveAI (terminale, spécialité maths).")
    return txt


def entree(k, ep, chap):
    m = tiret(ep["micro"])
    base = f"terminale/maths/analyse/exp-{m}/eleveai-maths-terminale-exp-{m}"
    return {
        "id": f"terminale-exp-{m}",
        "notionId": NOTION,
        "microId": ep["micro"],
        "classe": CLASSE,
        "ceinture": ep["ceinture"],
        "serie": SERIE,
        "type": "longue",
        "fichier": base + ".mp4",
        "miniature": base + ".png",
        "titre": ep["titre"],
        "accroche": accroche(k, ep),
        "chapitres": chap,
        "tags": ep["tags"] + TAGS_FIN,
        "questions": [{"t": q["t"], "question": q["question"], "choix": q["choix"],
                       "reponse": q["reponse"], "explication": q["explication"]} for q in ep["questions"]],
        "centres": ep["centres"],
        "plus_tard": True,
    }


def entree_r2(ep):
    m = tiret(ep["micro"])
    base = f"terminale/maths/analyse/exp-{m}/eleveai-maths-terminale-exp-{m}"
    return {"fichier": base + ".mp4", "poster": base + ".png", "vignette": base + ".vignette.webp",
            "titre": ep["titre"], "short": False, "youtube": None,
            "coach": coach_url(ep["micro"], absolu=False)}


def controles(e):
    ennuis = []
    tout = json.dumps(e, ensure_ascii=False)
    if "^" in tout:
        ennuis.append("un « ^ » dans le texte")
    if re.search(r"[<>]", e["titre"] + e["accroche"] + json.dumps(e["chapitres"], ensure_ascii=False)):
        ennuis.append("un chevron < > (YouTube le refuse)")
    if len(e["titre"]) > 100:
        ennuis.append(f"titre de {len(e['titre'])} caractères (100 au plus)")
    if "enseignant" in e["accroche"]:
        ennuis.append("le mot « enseignant »")
    if len(e["chapitres"]) != len(ECRANS):
        ennuis.append("nombre de chapitres")
    ts = [c[0] for c in e["chapitres"]]
    if ts != sorted(ts) or len(set(ts)) != len(ts):
        ennuis.append(f"chapitres pas strictement croissants : {ts}")
    return ennuis


def format_de(obj, txt):
    for ind in (None, 1, 2):
        for sep in ((",", ":"), (",", ": ")):
            s = json.dumps(obj, indent=ind, separators=sep, ensure_ascii=False)
            for fin in ("", "\n"):
                if s + fin == txt:
                    return dict(indent=ind, separators=sep, ensure_ascii=False), fin
    raise SystemExit("⛔ format du manifeste introuvable : on n'écrit pas")


def main():
    ecrire = "--ecrire" in sys.argv
    cache = "--cache" in sys.argv
    entrees, r2, sautes, bloque = [], {}, [], False
    for k, ep in enumerate(EP, 1):
        vid = f"terminale-exp-{tiret(ep['micro'])}"
        r2[vid] = entree_r2(ep)
        log = dry_run(ep, cache)
        if log is None:
            print(f"⏳ {vid} : scène absente, entrée préparée mais NON écrite (pas d'instants)")
            sautes.append(vid)
            continue
        chap, alertes, _ = instants(ep, log)
        e = entree(k, ep, chap)
        ennuis = controles(e)
        print(f"{'⛔' if ennuis else '✅'} {vid} : {len(chap)} chapitres, questions "
              f"{[q['t'] for q in e['questions']]}, lettres {LETTRES_VOIX[ep['micro']]}"
              + (f", alertes dry run {alertes}" if alertes else ""))
        for c in chap:
            print("    ", c[0], c[1])
        for x in ennuis:
            print("   ⛔", x)
            bloque = True
        entrees.append(e)
    if bloque:
        raise SystemExit("⛔ contrôles en échec : rien n'est écrit")
    if not ecrire:
        print("\n(contrôle seul : relancer avec --ecrire pour écrire)")
        return
    txt = REGISTRE.read_text(encoding="utf-8")
    reg = json.loads(txt)
    fmt, fin = format_de(reg, txt)
    nos = {e["id"]: e for e in entrees}
    vus = set()
    videos = []
    for v in reg["videos"]:
        if v.get("id") in nos:
            videos.append(nos[v["id"]]); vus.add(v["id"])
        else:
            videos.append(v)
    videos += [e for i, e in nos.items() if i not in vus]
    reg["videos"] = videos
    with open(REGISTRE, "w", encoding="utf-8", newline="") as f:
        f.write(json.dumps(reg, **fmt) + fin)
    print(f"\nmanifeste : {len(vus)} remplacée(s), {len(nos) - len(vus)} ajoutée(s) : {list(nos)}")
    with open(SORTIE_R2, "w", encoding="utf-8", newline="") as f:
        f.write(json.dumps(r2, indent=2, ensure_ascii=False) + "\n")
    print(f"{SORTIE_R2.relative_to(RACINE)} : {len(r2)} entrées")
    if sautes:
        print(f"⏳ non écrites au manifeste (scène absente) : {sautes}")


if __name__ == "__main__":
    main()
