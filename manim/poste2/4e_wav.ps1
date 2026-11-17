# 4e_wav.ps1 — la voix de TOUS les épisodes de la série 4e + 3e, en une passe.
#   powershell -NoProfile -File manim/poste2/4e_wav.ps1
#   powershell -NoProfile -File manim/poste2/4e_wav.ps1 -Filtre perimetre
# Julie, débit −6 (le réglage de toutes les séries depuis le CM2).
# Saute les dossiers public/sons/<id>/ déjà remplis : relancer ne coûte rien.
param([string]$Filtre = "")

$racine = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$voix = Join-Path $racine "manim\voix"
$sons = Join-Path $racine "public\sons"
$script = Join-Path $racine "scripts\generer-voix.ps1"

$ids = @(
  "4e-perimetre-polygones", "4e-perimetre-cercle", "4e-perimetre-figure-composee",
  "4e-perimetre-probleme", "4e-perimetre-defi",
  "4e-aire-rectangle-carre", "4e-aire-disque", "4e-aire-figure-composee",
  "4e-aire-probleme", "4e-aire-defi",
  "4e-volume-lien-aire", "4e-volume-cone", "4e-volume-defi",
  "4e-solides-reconnaitre", "4e-solides-vues", "4e-solides-perspective",
  "4e-patron-pyramide", "4e-section-comprendre", "4e-solides-defi",
  "3e-volume-boule", "3e-volume-reduction-section", "3e-section-pave-cube",
  "3e-section-cylindre", "3e-section-cone-pyramide", "3e-section-sphere",
  "3e-section-longueur", "3e-section-defi"
)

$faits = 0
foreach ($id in $ids) {
  if ($Filtre -and ($id -notlike "*$Filtre*")) { continue }
  foreach ($suffixe in @("", "-short")) {
    $nom = "$id$suffixe"
    $json = Join-Path $voix "$nom.json"
    if (-not (Test-Path $json)) { Write-Output "absent  $nom"; continue }
    $dossier = Join-Path $sons $nom
    if ((Test-Path $dossier) -and ((Get-ChildItem $dossier -Filter *.wav).Count -gt 0)) {
      Write-Output "deja    $nom"; continue
    }
    Write-Output "voix    $nom"
    & powershell -NoProfile -File $script -Fichier $json -Debit -6 | Out-Null
    $faits++
  }
}
Write-Output "`n$faits voix generees."
