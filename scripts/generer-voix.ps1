# scripts/generer-voix.ps1
#
# LA VOIX DES VIDÉOS DU CYCLE 2, en synthèse vocale française.
#
# ── POURQUOI CE SCRIPT EXISTE (02/09/2026) ────────────────────────────────────
# ⭐ `manim/REGLES.md` pose que les vidéos sont MUETTES + texte : « comme il n'y
# a aucun son, le texte à l'écran doit tout expliquer ». Cette règle tient du CP
# au lycée — SAUF au cycle 2, et pour une raison qui la retourne : un enfant de
# six ans NE SAIT PAS LIRE. Le texte ne peut pas porter l'explication puisqu'il
# est justement ce qu'on lui apprend à déchiffrer. Frédéric, 02/09 : « il faut
# mettre le script de la vidéo en son ».
#
# ⚠️ ET LE WORKFLOW VOIX DE REGLES.md NE CONVIENT PAS ICI : il demande un
# enregistrement au téléphone, vidéo par vidéo, avec un « top » de synchro.
# Pour 26 lettres c'est un goulot. La synthèse, elle, se regénère en une
# commande quand une phrase change.
#
# ⛔ LIMITE CONNUE, ET ELLE COMMANDE LE CONTENU DES PHRASES : la synthèse lit
# « a » comme le SON [a] — parfait pour une voyelle. Mais elle lira « b » comme
# « bé », le NOM de la lettre, qui est l'erreur exacte à ne pas commettre au CP.
# 👉 Pour les consonnes, ne JAMAIS faire dire la lettre seule : écrire une
# syllabe (« ba ») ou enregistrer une vraie voix.
#
# ⚠️ Windows uniquement (System.Speech). La voix française installée ici est
# « Microsoft Hortense Desktop ».
#
# ── USAGE ─────────────────────────────────────────────────────────────────────
#   powershell -File scripts/generer-voix.ps1 -Fichier manim/voix/cp-lettre-a.json
#
# Le JSON est un objet { "nom-du-fichier": "la phrase à dire", ... }.
# Les WAV sortent dans public/sons/<dossier du json sans extension>/.

param(
  [Parameter(Mandatory = $true)][string]$Fichier,
  [string]$Voix = "Microsoft Hortense Desktop",
  # ⚠️ Débit négatif = plus lent. -3 laisse à un CP le temps d'entendre chaque mot.
  [int]$Debit = -3
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Speech

$json = Get-Content $Fichier -Raw -Encoding UTF8 | ConvertFrom-Json
$nom = [System.IO.Path]::GetFileNameWithoutExtension($Fichier)
$dossier = Join-Path (Get-Location) "public/sons/$nom"
New-Item -ItemType Directory -Force $dossier | Out-Null

$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$dispo = $synth.GetInstalledVoices() | ForEach-Object { $_.VoiceInfo.Name }
if ($dispo -notcontains $Voix) {
  throw "Voix « $Voix » absente. Installées : $($dispo -join ', ')"
}
$synth.SelectVoice($Voix)
$synth.Rate = $Debit

foreach ($p in $json.PSObject.Properties) {
  $sortie = Join-Path $dossier "$($p.Name).wav"
  $synth.SetOutputToWaveFile($sortie)
  $synth.Speak($p.Value)
  $synth.SetOutputToNull()
  $ko = [math]::Round((Get-Item $sortie).Length / 1KB, 1)
  Write-Output ("{0,-22} {1,6} Ko   « {2} »" -f $p.Name, $ko, $p.Value)
}
$synth.Dispose()
Write-Output ""
Write-Output "$($json.PSObject.Properties.Count) fichiers dans public/sons/$nom/"
