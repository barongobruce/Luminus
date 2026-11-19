$ErrorActionPreference = "Stop"

$publicDir = Join-Path $PSScriptRoot "..\public"
$outputDir = Join-Path $publicDir "optimized"
$sourceNames = @(
  "demo1.png",
  "demo2.png",
  "demo3.png",
  "demo4.png",
  "demo5.png",
  "demo6.png",
  "demo7.png",
  "demo8.png",
  "experience-event-production.png",
  "experience-brand-activation.png",
  "experience-experiential-campaign.png",
  "experience-influencer-collaboration.png"
)

if (-not (Get-Command magick -ErrorAction SilentlyContinue)) {
  throw "ImageMagick's 'magick' command was not found. Install ImageMagick or run this script on a machine where it is already available."
}

New-Item -ItemType Directory -Force -Path $outputDir | Out-Null
$results = foreach ($name in $sourceNames) {
  $sourcePath = Join-Path $publicDir $name
  if (-not (Test-Path -LiteralPath $sourcePath)) {
    Write-Warning "Skipping missing image: $sourcePath"
    continue
  }

  $outputName = [System.IO.Path]::GetFileNameWithoutExtension($name) + ".webp"
  $outputPath = Join-Path $outputDir $outputName
  & magick $sourcePath -resize "1800x1800>" -define webp:method=6 -define webp:alpha-quality=100 -quality 86 $outputPath
  if ($LASTEXITCODE -ne 0) {
    throw "ImageMagick failed while converting $name."
  }

  $source = Get-Item -LiteralPath $sourcePath
  $optimized = Get-Item -LiteralPath $outputPath
  [pscustomobject]@{
    Image = $name
    OriginalMB = [math]::Round($source.Length / 1MB, 2)
    WebPMB = [math]::Round($optimized.Length / 1MB, 2)
    SavedPercent = [math]::Round((1 - ($optimized.Length / $source.Length)) * 100, 1)
  }
}

$results | Format-Table -AutoSize
