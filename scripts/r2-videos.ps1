# Envoie les vidéos finales (manim/sorties) vers le bucket Cloudflare R2 « eleveai-videos ».
# Les clés sont lues dans .env.local (R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_ENDPOINT) ;
# aucune n'est écrite ailleurs ni affichée.
#
#   .\scripts\r2-videos.ps1                 essai à blanc : liste ce qui serait envoyé
#   .\scripts\r2-videos.ps1 -Envoyer        envoie les nouvelles vidéos (jamais de suppression)
#   .\scripts\r2-videos.ps1 -Rclone "size R2:"   commande brute à rclone (R2: = le bucket)
#
# On COPIE (rclone copy), on ne synchronise pas : effacer une vidéo en local ne l'efface pas sur R2.
# Les morceaux Manim (partial_movie_files) et les brouillons 480p ne partent pas.
param(
  [switch]$Envoyer,
  [string]$Rclone
)
$ErrorActionPreference = "Stop"
$racine = Split-Path $PSScriptRoot -Parent
$bucket = "r2:eleveai-videos"

$rc = (Get-Command rclone -ErrorAction SilentlyContinue).Source
if (-not $rc) {
  $rc = Get-ChildItem "$env:LOCALAPPDATA\Microsoft\WinGet\Packages" -Recurse -Filter rclone.exe -ErrorAction SilentlyContinue |
    Select-Object -First 1 -ExpandProperty FullName
}
if (-not $rc) { throw "rclone introuvable : winget install --id Rclone.Rclone -e" }

foreach ($l in Get-Content (Join-Path $racine ".env.local")) {
  if ($l -match '^(R2_[A-Z_]+)=(.*)$') { Set-Item "env:$($Matches[1])" $Matches[2].Trim().Trim('"', "'") }
}
foreach ($k in "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_ENDPOINT") {
  if (-not (Get-Item "env:$k" -ErrorAction SilentlyContinue)) { throw "$k manque dans .env.local" }
}
$env:RCLONE_CONFIG_R2_TYPE = "s3"
$env:RCLONE_CONFIG_R2_PROVIDER = "Cloudflare"
$env:RCLONE_CONFIG_R2_ACCESS_KEY_ID = $env:R2_ACCESS_KEY_ID
$env:RCLONE_CONFIG_R2_SECRET_ACCESS_KEY = $env:R2_SECRET_ACCESS_KEY
$env:RCLONE_CONFIG_R2_ENDPOINT = $env:R2_ENDPOINT
$env:RCLONE_CONFIG_R2_NO_CHECK_BUCKET = "true"

if ($Rclone) {
  $args2 = $Rclone -split '\s+' | Where-Object { $_ } | ForEach-Object { $_ -replace '^R2:', "$bucket/" }
  & $rc @args2
  exit $LASTEXITCODE
}

$commun = @(
  "copy", (Join-Path $racine "manim\sorties"), $bucket,
  "--include", "*.mp4", "--include", "*.png", "--include", "*.jpg",
  "--exclude", "**/partial_movie_files/**", "--exclude", "**/480p*/**",
  "--transfers", "16", "--checkers", "32", "--fast-list",
  "--s3-chunk-size", "16M", "--stats-one-line", "--stats", "10s"
)
if ($Envoyer) {
  & $rc @commun "--progress"
} else {
  & $rc @commun "--dry-run"
  Write-Host "`nEssai à blanc. Pour envoyer : .\scripts\r2-videos.ps1 -Envoyer"
}
exit $LASTEXITCODE
