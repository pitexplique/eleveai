param(
  [Parameter(Mandatory = $true)][string]$Fichier,
  [Parameter(Mandatory = $true)][string]$Sortie,
  [int]$Debit = -10,
  [int]$Hauteur = 6
)
# Les instants de chaque mot (WinRT, Julie, IncludeWordBoundaryMetadata), même SSML que generer-voix.ps1.
# Sortie : { clé : [[position du mot dans la phrase, instant en s], ...] }
$ErrorActionPreference = "Stop"
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
$synth = [Windows.Media.SpeechSynthesis.SpeechSynthesizer]::new()
$choisie = [Windows.Media.SpeechSynthesis.SpeechSynthesizer]::AllVoices | Where-Object { $_.DisplayName -match "Julie" -and $_.Language -eq "fr-FR" } | Select-Object -First 1
$synth.Voice = $choisie
$synth.Options.IncludeWordBoundaryMetadata = $true
$json = Get-Content $Fichier -Raw -Encoding UTF8 | ConvertFrom-Json
$res = [ordered]@{}; $dump = @()
foreach ($p in $json.PSObject.Properties) {
  $plain = [string]$p.Value
  $texte = [System.Security.SecurityElement]::Escape($plain)
  $ssml = @"
<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='fr-FR'>
<prosody rate='$Debit%' pitch='$Hauteur%'>$texte</prosody>
</speak>
"@
  $flux = Attendre ($synth.SynthesizeSsmlToStreamAsync($ssml)) ([Windows.Media.SpeechSynthesis.SpeechSynthesisStream])
  $liste = @()
  $pos = 0
  foreach ($piste in $flux.TimedMetadataTracks) {
    foreach ($cue in $piste.Cues) {
      $mot = [System.Net.WebUtility]::HtmlDecode([string]$cue.Text); $dump += ($p.Name + "	" + $cue.StartTime.TotalSeconds + "	" + $mot)
      $i = $plain.IndexOf($mot, $pos)
      if ($i -lt 0) { continue }
      $liste += ,@($i, [math]::Round($cue.StartTime.TotalSeconds, 3))
      $pos = $i + $mot.Length
    }
  }
  $flux.Dispose()
  $res[$p.Name] = $liste
}
$dump | Out-File -Encoding utf8 ($Sortie + ".cues.tsv"); $res | ConvertTo-Json -Depth 5 -Compress | Out-File -Encoding utf8 $Sortie
Write-Output "marques -> $Sortie"
