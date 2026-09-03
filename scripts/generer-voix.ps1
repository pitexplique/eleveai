# scripts/generer-voix.ps1
#
# LA VOIX DES VIDÉOS DU CYCLE 2.
#
# ── POURQUOI CE SCRIPT EXISTE (02/09/2026) ────────────────────────────────────
# ⭐ `manim/REGLES.md` pose que les vidéos sont MUETTES : « comme il n'y a aucun
# son, le texte à l'écran doit tout expliquer ». La règle tient du CP au lycée —
# SAUF au cycle 2, et pour une raison qui la retourne : un enfant de six ans NE
# SAIT PAS LIRE. Le texte ne peut pas porter l'explication puisqu'il est
# justement ce qu'on lui apprend à déchiffrer. Frédéric : « il faut mettre le
# script de la vidéo en son ».
#
# ⚠️ Le workflow voix de REGLES.md (enregistrement au téléphone, un « top » de
# synchro, vidéo par vidéo) ne passe pas à l'échelle de 26 lettres. La synthèse
# se régénère en une commande quand une phrase change.
#
# ── ⭐⭐ POURQUOI WINRT ET NON System.Speech ───────────────────────────────────
# Frédéric, 02/09 : « elle n'est pas très joyeuse », « ça fait trop machine ».
# C'était vrai, et la cause n'était pas le texte : `System.Speech` ne voit que
# les vieilles voix SAPI5 « Desktop » — sur ce poste, la seule française est
# Hortense, une voix de 2012, plate par construction.
#
# ⭐ Windows embarque en réalité TROIS voix françaises modernes (« OneCore ») :
# Hortense, **Julie** et **Paul**. Elles sont invisibles pour System.Speech et
# ne s'atteignent que par WinRT — d'où la gymnastique d'attente asynchrone
# ci-dessous. Julie par défaut : voix féminine, plus chaleureuse.
#
# ⚠️ Julie parle VITE (2,56 s là où Hortense met 3,93 sur la même phrase) et
# sort en 16 kHz. Pour un CP il faut la ralentir — d'où le `-Debit`, appliqué
# en SSML et non en réglage de moteur.
#
# ⛔ LIMITE QUI COMMANDE LE CONTENU DES PHRASES : la synthèse lit « a » comme le
# SON [a] — parfait pour une voyelle. Mais elle lira « b » comme « bé », le NOM
# de la lettre, qui est l'erreur exacte à ne pas commettre au CP.
# 👉 Pour les consonnes, ne JAMAIS faire dire la lettre seule : écrire une
# syllabe (« ba »), ou enregistrer une vraie voix.
#
# ⚠️ Windows uniquement.
#
# ── USAGE ─────────────────────────────────────────────────────────────────────
#   powershell -File scripts/generer-voix.ps1 -Fichier manim/voix/cp-lettre-a.json
#   powershell -File scripts/generer-voix.ps1 -Fichier ... -Voix Paul -Debit -25
#
# Le JSON est un objet { "nom-du-fichier": "la phrase à dire", ... }.
# Les WAV sortent dans public/sons/<nom du json sans extension>/.

param(
  [Parameter(Mandatory = $true)][string]$Fichier,
  # Julie ou Paul (modernes), Hortense (ancienne, plus plate).
  [string]$Voix = "Julie",
  # Débit SSML en %, négatif = plus lent. -18 laisse à un CP le temps d'entendre.
  [int]$Debit = -18,
  # Hauteur SSML en %. Un rien plus haut sonne plus enjoué, sans devenir aigu.
  [int]$Hauteur = 6
)

$ErrorActionPreference = "Stop"

# ── L'attente d'une opération asynchrone WinRT depuis PowerShell ──────────────
# ⚠️ Sans ça, `SynthesizeSsmlToStreamAsync` rend un IAsyncOperation qu'on ne
# peut pas lire : il faut le convertir en Task et l'attendre à la main.
Add-Type -AssemblyName System.Runtime.WindowsRuntime
$asTask = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
  $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and
  $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1'
}
function Attendre($operation, $type) {
  $t = $asTask[0].MakeGenericMethod($type).Invoke($null, @($operation))
  $t.Wait(-1) | Out-Null
  $t.Result
}

$null = [Windows.Media.SpeechSynthesis.SpeechSynthesizer, Windows.Media, ContentType = WindowsRuntime]
$null = [Windows.Storage.Streams.DataReader, Windows.Storage, ContentType = WindowsRuntime]

$synth = [Windows.Media.SpeechSynthesis.SpeechSynthesizer]::new()
$toutes = [Windows.Media.SpeechSynthesis.SpeechSynthesizer]::AllVoices
$choisie = $toutes | Where-Object { $_.DisplayName -match $Voix -and $_.Language -eq "fr-FR" } | Select-Object -First 1
if (-not $choisie) {
  throw "Voix « $Voix » (fr-FR) absente. Disponibles : $(($toutes | Where-Object Language -eq 'fr-FR' | ForEach-Object DisplayName) -join ', ')"
}
$synth.Voice = $choisie

$json = Get-Content $Fichier -Raw -Encoding UTF8 | ConvertFrom-Json
$nom = [System.IO.Path]::GetFileNameWithoutExtension($Fichier)
$dossier = Join-Path (Get-Location) "public/sons/$nom"
New-Item -ItemType Directory -Force $dossier | Out-Null

$n = 0
foreach ($p in $json.PSObject.Properties) {
  $texte = [System.Security.SecurityElement]::Escape($p.Value)
  $ssml = @"
<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='fr-FR'>
<prosody rate='$Debit%' pitch='$Hauteur%'>$texte</prosody>
</speak>
"@
  $flux = Attendre ($synth.SynthesizeSsmlToStreamAsync($ssml)) ([Windows.Media.SpeechSynthesis.SpeechSynthesisStream])
  $taille = [uint32]$flux.Size
  $lecteur = [Windows.Storage.Streams.DataReader]::new($flux.GetInputStreamAt(0))
  $null = Attendre ($lecteur.LoadAsync($taille)) ([uint32])
  $octets = New-Object byte[] $taille
  $lecteur.ReadBytes($octets)
  $lecteur.Dispose(); $flux.Dispose()

  $sortie = Join-Path $dossier "$($p.Name).wav"
  [System.IO.File]::WriteAllBytes($sortie, $octets)

  # ⚠️ La durée se lit en PARCOURANT les chunks : ces WAV portent des blocs
  # supplémentaires, et lire à l'offset 40 donne des valeurs absurdes
  # (874 s pour un clip de 3,7 s, mesuré le 02/09).
  $i = 12; $br = 0; $ds = 0
  while ($i + 8 -le $octets.Length) {
    $id = [Text.Encoding]::ASCII.GetString($octets, $i, 4)
    $sz = [BitConverter]::ToUInt32($octets, $i + 4)
    if ($id -eq "fmt ") { $br = [BitConverter]::ToUInt32($octets, $i + 16) }
    if ($id -eq "data") { $ds = $sz; break }
    $i += 8 + $sz + ($sz % 2)
  }
  $duree = if ($br -gt 0) { $ds / $br } else { 0 }
  Write-Output ('"{0}": {1},' -f $p.Name, [math]::Round($duree, 2))
  $n++
}
Write-Output ""
Write-Output "$n clips — voix $($choisie.DisplayName), débit $Debit%, hauteur +$Hauteur% — dans public/sons/$nom/"
Write-Output "Reporter les durées ci-dessus dans le DUREE du script Manim."
