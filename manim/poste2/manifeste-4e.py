# manifeste-4e.py — EleveAI, 2e poste, série 4e « Périmètre, aire, volume, solides » (17/11/2026).
#
# Écrit `manim/poste2/manifeste-4e.json` et `manim/poste2/videos-r2-4e.json` : les 20 épisodes de 4e
# (20 paysages + 20 shorts), prêts à être intégrés par le 1er poste dans `manim/manifeste-youtube.json`
# et `lib/videos/*.json`. ⛔ Ce script ne touche JAMAIS ces deux fichiers-là : ce sont ceux du 1er poste.
#
# Trois sources, aucune saisie en double :
#   · le TABLEAU DE LA SÉRIE de `manim/poste2/VOIX-4e-3e-perimetre-aire-volume.md` → id, micros 4e,
#     `aussi` 3e, métier, ceinture ;
#   · les VOIX du même fichier → la situation, les questions-pauses (énoncé, choix, bonne réponse,
#     explication) et le défi ;
#   · les LOGS DE RENDU HD `manim/scripts/4e/media-hd-<clé>.hd.log` → les instants exacts de chaque
#     écran (lignes `ECRAN …`) et de chaque question (lignes `QUESTION … reponse=N`).
#
# Ne reste écrit à la main ici que ce qu'aucune source ne porte : le titre YouTube, les libellés de
# chapitres, et le titre du short.
#
# Lancer : PYTHONIOENCODING=utf-8 python manim/poste2/manifeste-4e.py

import json
import re
from pathlib import Path

RACINE = Path(__file__).resolve().parents[2]
VOIX = RACINE / "manim/poste2/VOIX-4e-3e-perimetre-aire-volume.md"
LOGS = RACINE / "manim/scripts/4e"
SORTIE = RACINE / "manim/poste2"

SITE = "https://www.eleveai.fr"

# ── Ce qui s'écrit à la main : titre, chapitres, titre du short ────────────────
# clé = id de l'épisode. `log` = suffixe du fichier media-hd-<log>.hd.log.
# `dossier` = chemin de sortie. `ch` = libellé de chapitre par écran (les écrans de réponse,
# 05b/07b, et la fin 10-abonne n'ont pas de chapitre).
EPISODES = {
    "4e-volume-lien-aire": dict(
        log="v1", num=11, famille="volume", dossier="volume/11-volume-lien-aire",
        titre="Une piscine de 8 m sur 4 : combien de litres ? — Le volume et l'aire du fond — Maths 4e",
        court="Le volume et l'aire du fond",
        ch={"02": "L'aire du fond", "03": "Fois la profondeur", "04": "Des m³ aux litres"},
        short_titre="Une piscine de 48 m³ : combien de litres ? #maths #4e"),
    "4e-volume-pyramide": dict(
        log="4e-volume-pyramide", num=12, famille="volume", dossier="volume/12-volume-pyramide",
        titre="Le toit d'une tonnelle : combien d'air dessous ? — Le volume d'une pyramide — Maths 4e",
        court="Le volume d'une pyramide",
        ch={"02": "Trois fois le même sable", "03": "La formule", "04": "Un exemple"},
        short_titre="Un prisme de sable, combien de pyramides ? #maths #4e"),
    "4e-volume-cone": dict(
        log="v3", num=13, famille="volume", dossier="volume/13-volume-cone",
        titre="Un cornet de glace : combien de centimètres cubes ? — Le volume d'un cône — Maths 4e",
        court="Le volume d'un cône",
        ch={"02": "Trois cônes dans le cylindre", "03": "La formule", "04": "Le cornet"},
        short_titre="Le cornet ou le pot : lequel en contient le plus ? #maths #4e"),
    "4e-volume-defi": dict(
        log="v4", num=14, famille="volume", dossier="volume/14-volume-defi",
        titre="Une citerne à fond conique : combien de jours d'eau ? — Défis sur les volumes — Maths 4e",
        court="Défis sur les volumes",
        ch={"02": "Deux solides à composer", "03": "Le cylindre", "04": "Le cône du fond"},
        short_titre="La citerne et la sécheresse : combien de jours ? #maths #4e"),
    "4e-solides-reconnaitre": dict(
        log="s1", num=15, famille="solides", dossier="solides/15-solides-reconnaitre",
        titre="Modéliser un personnage de jeu : quels solides ? — Reconnaître les solides — Maths 4e",
        court="Reconnaître les solides",
        ch={"02": "Les solides usuels", "03": "Faces, arêtes, sommets", "04": "Reconnaître"},
        short_titre="Le chapeau du personnage : quel solide ? #maths #4e"),
    "4e-solides-vues": dict(
        log="s2", num=16, famille="solides", dossier="solides/16-solides-vues",
        titre="La maquette d'une maison : que voit-on de face ? — Les vues d'un solide — Maths 4e",
        court="Les vues d'un solide",
        ch={"02": "Une vue est une ombre", "03": "Les trois vues", "04": "Une vue ne suffit pas"},
        short_titre="Un rectangle de face : pavé ou cylindre ? #maths #4e"),
    "4e-solides-perspective": dict(
        log="s3", num=17, famille="solides", dossier="solides/17-solides-perspective",
        titre="Dessiner un cube sans mentir — La perspective cavalière — Maths 4e",
        court="La perspective cavalière",
        ch={"02": "La face de devant", "03": "Les fuyantes", "04": "Les arêtes cachées"},
        short_titre="Les fuyantes d'un cube : parallèles ou pas ? #maths #4e"),
    "4e-patron-pyramide": dict(
        log="s4", num=18, famille="solides", dossier="solides/18-patron-pyramide",
        titre="Un dé à quatre faces en carton : quel patron ? — Le patron d'une pyramide — Maths 4e",
        court="Le patron d'une pyramide",
        ch={"02": "Déplier le solide", "03": "Cinq morceaux", "04": "Le dé à quatre faces"},
        short_titre="Trois patrons : lequel se referme en pyramide ? #maths #4e"),
    "4e-section-comprendre": dict(
        log="s5", num=19, famille="solides", dossier="solides/19-section-comprendre",
        titre="La force d'un muscle se lit sur sa section — La section plane — Maths 4e",
        court="La section plane",
        ch={"02": "Couper par un plan", "03": "Le cylindre", "04": "À quoi ça sert"},
        short_titre="Un muscle deux fois plus large : combien de fois plus fort ? #maths #4e"),
    "4e-solides-defi": dict(
        log="s6", num=20, famille="solides", dossier="solides/20-solides-defi",
        titre="Relever un bâtiment au drone : quel volume ? — Défis sur les solides — Maths 4e",
        court="Défis sur les solides",
        ch={"02": "Modéliser", "03": "Lire les vues", "04": "Un solide à la fois"},
        short_titre="Ce que voit le drone : quel solide pour le toit ? #maths #4e"),
    "4e-perimetre-polygones": dict(
        log="p1", num=21, famille="perimetre", dossier="perimetre/21-perimetre-polygones",
        titre="Borner un skatepark : combien de mètres de barrière ? — Le périmètre — Maths 4e",
        court="Le périmètre",
        aussi4=["aire_perimetre_rectangle", "aire_perimetre_carre", "aire_perimetre_triangle"],
        ch={"02": "La longueur du tour", "03": "Le rectangle", "04": "Le carré et le triangle"},
        short_titre="Une rampe triangulaire : combien de mètres de bordure ? #maths #4e"),
    "4e-perimetre-cercle": dict(
        log="p2", num=22, famille="perimetre", dossier="perimetre/22-perimetre-cercle",
        titre="La margelle d'une piscine ronde : combien de mètres ? — La longueur d'un cercle — Maths 4e",
        court="La longueur d'un cercle", micro="aire_perimetre_figure",
        ch={"02": "La ficelle et π", "03": "La formule", "04": "Le bassin de Marc"},
        short_titre="Un bassin de 4 m de large fait 12,6 m de tour #maths #4e"),
    "4e-perimetre-figure-composee": dict(
        log="p3", num=23, famille="perimetre", dossier="perimetre/23-perimetre-figure-composee",
        titre="La bordure d'une piste de BMX : droites + virage — Le périmètre d'une figure composée — Maths 4e",
        court="Le périmètre d'une figure composée",
        ch={"02": "Faire le tour", "03": "Le demi-cercle", "04": "On additionne"},
        short_titre="Le virage compte 31 m, pas 20 #maths #4e"),
    "4e-perimetre-probleme": dict(
        log="p4", num=24, famille="perimetre", dossier="perimetre/24-perimetre-probleme",
        titre="Pourquoi un tour de piste fait 400 m — Un problème de périmètre — Maths 4e",
        court="Un problème de périmètre",
        ch={"02": "Deux droites, deux virages", "03": "Les virages font un cercle", "04": "Le total"},
        short_titre="Cinq tours de piste : ça fait combien de kilomètres ? #maths #4e"),
    "4e-perimetre-defi": dict(
        log="p5", num=25, famille="perimetre", dossier="perimetre/25-perimetre-defi",
        titre="100 m de grillage : enclos carré ou rond ? — Défis sur les périmètres — Maths 4e",
        court="Défis sur les périmètres",
        ch={"02": "Le demi-disque", "03": "Le tour complet", "04": "Même aire, autre tour"},
        short_titre="Rayon doublé : le grillage est multiplié par combien ? #maths #4e"),
    "4e-aire-rectangle-carre": dict(
        log="a1", num=26, famille="aire", dossier="aire/26-aire-rectangle-carre",
        titre="Un film de protection sur un écran : combien de cm² ? — L'aire d'un rectangle et d'un carré — Maths 4e",
        court="L'aire d'un rectangle et d'un carré", aussi4=["aire_carre"],
        ch={"02": "Compter les carrés", "03": "La formule", "04": "Le carré"},
        short_titre="Deux téléphones, même prix : lequel a le plus grand écran ? #maths #4e"),
    "4e-aire-disque": dict(
        log="a2", num=27, famille="aire", dossier="aire/27-aire-disque",
        titre="La peau d'un tambour : combien de centimètres carrés ? — L'aire d'un disque — Maths 4e",
        court="L'aire d'un disque", micro="aire_figure",
        ch={"02": "Le tour n'est pas la peau", "03": "La formule", "04": "Le tambour de Nina"},
        short_titre="Un tambour deux fois plus large : la peau coûte ×4 #maths #4e"),
    "4e-aire-figure-composee": dict(
        log="a3", num=28, famille="aire", dossier="aire/28-aire-figure-composee",
        titre="Du gazon dans une cour en L : combien de m² ? — L'aire d'une figure composée — Maths 4e",
        court="L'aire d'une figure composée",
        ch={"02": "Découper en rectangles", "03": "On additionne", "04": "L'autre façon"},
        short_titre="Une terrasse en L : un trait, deux rectangles #maths #4e"),
    "4e-aire-probleme": dict(
        log="a4", num=29, famille="aire", dossier="aire/29-aire-probleme",
        titre="Carreler autour d'une piscine : le grand moins le trou — Un problème d'aire — Maths 4e",
        court="Un problème d'aire",
        ch={"02": "Le terrain entier", "03": "Le bassin", "04": "Tout le reste"},
        short_titre="Un bassin rond dans une terrasse carrée : combien de m² ? #maths #4e"),
    "4e-aire-defi": dict(
        log="a5", num=30, famille="aire", dossier="aire/30-aire-defi",
        titre="Floquer 18 maillots : 1 m², c'est 10 000 cm² — Défis sur les aires — Maths 4e",
        court="Défis sur les aires",
        ch={"02": "Le numéro", "03": "Le logo", "04": "Un maillot"},
        short_titre="18 flocages : ça fait combien de mètres carrés ? #maths #4e"),
}

# Le tableau de la série abrège deux micros de 3e : voici leurs vrais identifiants.
ALIAS_3E = {"comprendre": "aire_perimetre_comprendre", "polygone": "aire_perimetre_polygone"}

# Les notions de 3e visées par les `aussi` (le micro suffit à retrouver la notion).
NOTION_3E = {
    "aire_perimetre_comprendre": "aire_perimetre", "aire_perimetre_polygone": "aire_perimetre",
    "aire_perimetre_cercle": "aire_perimetre", "aire_perimetre_figure_composee": "aire_perimetre",
    "aire_perimetre_defi": "aire_perimetre",
    "aire_disque": "aire_surface", "aire_figure_composee": "aire_surface", "aire_defi": "aire_surface",
    "volume_pyramide": "volume_solide", "volume_cone": "volume_solide", "volume_defi": "volume_solide",
    "volume_solide_reconnaitre": "volume_geometrie_espace",
    "volume_representation": "volume_geometrie_espace",
    "volume_section": "volume_geometrie_espace",
    "volume_geometrie_espace_defi": "volume_geometrie_espace",
    "section_reconnaitre": "sections_solides",
}

# La notion 4e de chaque famille.
NOTION_4E = {"volume": "volume_solide", "solides": "vision_espace",
             "perimetre": "aire_perimetre", "aire": "aire_surface"}

# Le slug de fiche/exercices du site, par notion 4e.
SLUG_FICHE = {"volume_solide": "volume-solide", "vision_espace": "vision-espace",
              "aire_perimetre": "aire-perimetre", "aire_surface": "aire-surface"}


# ── Lecture des trois sources ─────────────────────────────────────────────────

def lire_tableau(md):
    """Le tableau de la série : id → micros 4e, aussi 3e, métier, ceinture."""
    out = {}
    for ligne in md.splitlines():
        m = re.match(r"^\|\s*\*?\*?[PAVST]\d\*?\*?\s*\|\s*`?\*?\*?`?(4e-[a-z-]+)`", ligne)
        if not m:
            continue
        cols = [c.strip() for c in ligne.strip("|").split("|")]
        out[m.group(1)] = dict(
            micros4=re.findall(r"`([a-z_]+)`", cols[2]) or [],
            micros4_texte=cols[2],
            aussi3=[a for a in re.split(r"[,\s]+", re.sub(r"`", "", cols[3])) if a and a != "—"],
            sujet=re.sub(r"\*\*", "", cols[4]),
            metier=cols[5].replace(" — matrice 3e", "").replace(" — matrice", ""),
            ceinture=cols[6],
        )
    return out


def lire_voix(md):
    """id → {'paysage': {clé: texte}, 'short': {clé: texte}, 'centres': [...], 'micro_ligne': str}."""
    out, cur, sect = {}, None, "paysage"
    for ligne in md.splitlines():
        m = re.match(r"^#+ .*`(4e-[a-z-]+)`", ligne)
        if m:
            cur, sect = m.group(1), "paysage"
            out.setdefault(cur, {"paysage": {}, "short": {}, "centres": [], "micro_ligne": ""})
        if cur and ligne.startswith("### Short"):
            sect = "short"
        if cur and "Centres" in ligne:
            cs = re.findall(r"`([a-z-]+)`", ligne.split("Centres")[1])
            if cs:
                out[cur]["centres"] = cs
                out[cur]["micro_ligne"] = ligne
        m2 = re.match(r"^- \*\*([0-9a-z-]+)\*\* : (.*)$", ligne)
        if m2 and cur:
            out[cur][sect][m2.group(1)] = m2.group(2).strip()
    return out


def prenom_metier(cellule):
    """« géomètre-topographe (Nour) » → « Nour, géomètre-topographe »."""
    m = re.match(r"^(.*?)\s*\(([^)]+)\)\s*$", cellule.strip())
    return f"{m.group(2)}, {m.group(1)}" if m else cellule.strip()


def lire_log(cle):
    """Le log de rendu HD : [(clé d'écran, 'MM:SS')] et {clé de question: réponse}."""
    p = LOGS / f"media-hd-{cle}.hd.log"
    if not p.exists():
        raise SystemExit(f"⛔ log de rendu absent : {p}")
    txt = p.read_text(encoding="utf-8", errors="replace").replace("\r", "\n")
    ecrans = [(m.group(1), m.group(2)) for m in re.finditer(r"ECRAN ([0-9a-z-]+) t=(\d\d:\d\d)", txt)]
    reponses = {m.group(1): int(m.group(2))
                for m in re.finditer(r"QUESTION ([0-9a-z-]+) .*reponse=(\d)", txt)}
    return ecrans, reponses


# ── Découpage d'une voix de question-pause ────────────────────────────────────

def decouper_question(txt_q, txt_r):
    """« Question ! <énoncé> A : … B : … C : … Mets pause » + « Réponse X. <explication> »."""
    corps = txt_q.split("Question !", 1)[1]
    corps = corps.rsplit("Mets pause", 1)[0].strip()
    av, _, reste = corps.partition("A :")
    a, _, reste = reste.partition("B :")
    b, _, c = reste.partition("C :")
    nettoie = lambda s: s.strip().strip(".").strip()  # noqa: E731
    expl = re.sub(r"^Réponse\s+[ABC]\s*[.!]\s*", "", txt_r).strip()
    return dict(question=av.strip() or None, choix=[nettoie(a), nettoie(b), nettoie(c)],
                explication=expl)


def main():
    md = VOIX.read_text(encoding="utf-8")
    tab, voix = lire_tableau(md), lire_voix(md)
    manifeste, r2 = {}, []

    for eid, meta in EPISODES.items():
        t, v = tab[eid], voix[eid]
        notion = NOTION_4E[meta["famille"]]
        micro = t["micros4"][0] if t["micros4"] else notion + "_comprendre"
        ecrans, reponses = lire_log(meta["log"])
        temps = dict(ecrans)
        micro = meta.get("micro", micro)
        a3 = [ALIAS_3E.get(a, a) for a in t["aussi3"]]
        aussi = [dict(classe="3e", notionId=NOTION_3E[a], microId=a) for a in a3 if a in NOTION_3E]
        aussi += [dict(classe="4e", notionId=notion, microId=m) for m in meta.get("aussi4", [])]

        # chapitres : un par écran porteur
        libelles = {"00-garde": meta["court"], "01-situation": prenom_metier(t["metier"]),
                    "05-question": "Question 1", "06-piege": "Le piège", "07-question": "Question 2",
                    "08-defi": "À toi de jouer", "08b-correction": "Correction",
                    "09-finale": "Ce que tu as appris"}
        for k, lib in meta["ch"].items():
            for cle in temps:
                if cle.startswith(k + "-"):
                    libelles[cle] = lib
        chapitres = [[temps[c], libelles[c]] for c, _ in ecrans if c in libelles]

        # questions-pauses
        questions = []
        for q, r in (("05-question", "05b-reponse"), ("07-question", "07b-reponse")):
            if q in v["paysage"]:
                d = decouper_question(v["paysage"][q], v["paysage"][r])
                questions.append(dict(t=temps[q], question=d["question"] or meta["court"],
                                      choix=d["choix"], reponse=reponses.get(q, 0),
                                      explication=d["explication"]))

        base = f"{SITE}/fiches-cours/maths/4e/{SLUG_FICHE[notion]}"
        exos = f"{SITE}/fiches-exercices/maths/4e/{SLUG_FICHE[notion]}"
        serie = (f"{SITE}/coach/serie?classe=4e&matiere=maths&notion={notion}"
                 f"&microId={micro}&display=simple")
        puces = "\n".join(f"• {lib.lower()}" for k, lib in meta["ch"].items())
        accroche = (f"{v['paysage']['01-situation']}\n\n"
                    f"Dans cette vidéo :\n{puces}\n"
                    f"• le piège à éviter, et deux questions-pauses pour t'arrêter\n\n"
                    f"⏸ 2 questions-pauses : mets pause, et choisis !\n"
                    f"🥋 Ceinture {t['ceinture']}.\n"
                    f"Un défi en fin de vidéo, avec sa correction : "
                    f"{v['paysage']['08-defi'].replace('À toi de jouer ! ', '').replace(' Mets pause, et cherche !', '')}\n\n"
                    f"Pour s'entraîner :\n• la fiche de cours : {base}\n"
                    f"• les exercices corrigés : {exos}\n"
                    f"• la série du coach sur cette compétence : {serie}\n\n"
                    f"📐 Épisode {meta['num']} de la série Périmètre, aire, volume et solides d'EleveAI, en 4e.\n"
                    f"Fait à La Réunion 🌋 — Frédéric Lacoste")
        tags = [meta["court"].lower(), t["sujet"].split("(")[0].strip().lower(),
                t["metier"].split("(")[0].strip().lower(), notion.replace("_", " "),
                f"ceinture {t['ceinture']}", "maths", "4e", "collège", "cycle 4", "EleveAI"]

        dossier = f"4e/maths/{meta['dossier']}"
        nom = f"eleveai-maths-{eid}"
        manifeste[eid] = dict(
            id=eid, pas_avant="", notionId=notion, microId=micro, classe="4e",
            ceinture=t["ceinture"], serie="Maths 4e", type="longue",
            fichier=f"{dossier}/{nom}.mp4", miniature=f"{dossier}/{nom}.png",
            titre=meta["titre"], accroche=accroche, chapitres=chapitres, tags=tags,
            questions=questions, centres=v["centres"], **({"aussi": aussi} if aussi else {}))

        # ── le short ──────────────────────────────────────────────────────────
        sid = eid + "-short"
        secrans, sreponses = lire_log(meta["log"] + "-short")
        stemps = dict(secrans)
        sq = decouper_question(v["short"]["02-question"], v["short"]["02b-reponse"])
        s_accroche = (f"{v['short']['00-accroche']} {v['short']['01-defi']}\n\n"
                      f"🥋 Ceinture blanche.\n"
                      f"👉 {v['short']['04-commentaire'].replace('À toi : ', '')}\n\n"
                      f"▶️ L'épisode complet : {{{{LONGUE}}}}\n🎯 Le coach : {serie}\n\n"
                      f"Fait à La Réunion 🌋 — Frédéric Lacoste\n\n"
                      f"#Shorts #maths #4e #{meta['famille']}")
        manifeste[sid] = dict(
            id=sid, pas_avant="", notionId=notion, microId=micro, classe="4e",
            ceinture="blanche", serie="Maths 4e", type="short", renvoie_vers=eid,
            fichier=f"{dossier}/{nom}-short.mp4", miniature=f"{dossier}/{nom}-short-miniature.png",
            titre=meta["short_titre"], accroche=s_accroche,
            tags=tags[:-1] + ["ceinture blanche", "Shorts", "EleveAI"],
            questions=[dict(t=stemps["02-question"], question=v["short"]["01-defi"],
                            choix=sq["choix"], reponse=sreponses.get("02-question", 0),
                            explication=sq["explication"])],
            centres=v["centres"], **({"aussi": aussi} if aussi else {}))

        for suffixe in ("", "-short"):
            r2.append(dict(id=eid + suffixe, cle=f"{dossier}/{nom}{suffixe}.mp4",
                           classe="4e", serie="Maths 4e"))

    # ── coach-4e.md : ce que le 1er poste aura à brancher ─────────────────────
    lignes = ["# Coach 4e : ce qu'il faudra brancher (2e poste → 1er poste, à la fusion)",
              "",
              "Le 2e poste ne touche ni aux banques du coach, ni à `manifeste-youtube.json`, ni à",
              "`lib/videos/*.json`. Le 1er poste branchera, après la fusion et la mise en ligne R2",
              "(⚠️ ce poste n'a pas envoyé les fichiers : voir `videos-r2-4e.json`) :",
              "`node scripts/brancher-videos-coach.mjs --id 4e-<micro en tirets>,4e-<micro en tirets>-short --ecrire`.",
              "",
              "⭐ Les 20 épisodes couvrent les **30 micros de 4e**. 18 micros de 3e sont servis en plus",
              "par les `aussi` ci-dessous : la 3e n'a RIEN à retourner dans ces familles.",
              "Les 8 épisodes propres à la 3e (T1 à T8) sont suivis à part, dans",
              "`manim/poste2/REPRISE-3e-sections.md`.",
              "",
              "| Notion (`notionId`) | Micro (`microId`) | id paysage | id short | Aussi | État |",
              "|---|---|---|---|---|---|"]
    for eid, meta in EPISODES.items():
        e = manifeste[eid]
        a = " · ".join(f"{x['classe']} `{x['microId']}`" for x in e.get("aussi", [])) or "—"
        lignes.append(f"| `{e['notionId']}` | `{e['microId']}` | `{eid}` | `{eid}-short` | {a} | "
                      f"✅ HD + short rendus et contrôlés (17/11), bords à 0 ; "
                      f"⏳ miniatures et R2 |")
    lignes += ["",
               "## Métiers (matrice)",
               "Les 20 métiers de la série sont tous différents et aucun n'est repris de la série 5e.",
               "À marquer `V` sur leur ligne dans `lib/matrice/metiers-college.ts` (section 4e) :",
               "  " + ", ".join(sorted({prenom_metier(tab[e]['metier']) for e in EPISODES})),
               "",
               "## Centres d'intérêt",
               "`node scripts/verifier-centres-age.mjs manim/poste2/manifeste-4e.json` :",
               "**0 centre hors tranche** sur les 40 vidéos (tranche 12-14 ans).",
               ""]
    (SORTIE / "coach-4e.md").write_text(chr(10).join(lignes), encoding="utf-8")

    (SORTIE / "manifeste-4e.json").write_text(
        json.dumps(manifeste, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (SORTIE / "videos-r2-4e.json").write_text(
        json.dumps(r2, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{len(manifeste)} entrées écrites dans manifeste-4e.json "
          f"({sum(1 for e in manifeste.values() if e['type'] == 'longue')} paysages "
          f"+ {sum(1 for e in manifeste.values() if e['type'] == 'short')} shorts), "
          f"{len(r2)} lignes dans videos-r2-4e.json, et coach-4e.md.")


if __name__ == "__main__":
    main()
