#!/usr/bin/env bash
# Upscale the source reels and derive the web tiers used by the site.
# Nothing is cropped, retimed or recoloured: the chain is denoise -> Lanczos
# upscale -> light unsharp, which recovers detail lost to the phone's HEVC
# compression without changing framing or colour.
set -euo pipefail
SRC="/root/.claude/uploads/3a1c1bfa-d795-5e88-b1d6-253e442cba2b"
VID="/home/user/CapaSanta/assets/video"
POS="/home/user/CapaSanta/assets/img/poster"
CHAIN="hqdn3d=2:1.5:4:4"
declare -A M=(
  [giornata]="0586ae2f-ScreenRecording_08082026_144757_1.mov"
  [terrazza]="085d44ed-ScreenRecording_08082026_144903_1.mov"
  [signature]="286f07dc-ScreenRecording_08082026_144725_1.mov"
  [sala]="63433c00-ScreenRecording_08082026_144903_1.mov"
)
for name in "${!M[@]}"; do
  in="$SRC/${M[$name]}"
  echo "=== $name ==="
  # 4K master: long side (height, these are all portrait) scaled to 3840
  ffmpeg -y -v error -i "$in" \
    -vf "$CHAIN,scale=-2:3840:flags=lanczos,unsharp=5:5:0.4:5:5:0.0" \
    -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p \
    -c:a aac -b:a 160k -movflags +faststart "$VID/4k/$name-4k.mp4"
  # web tier: muted so it can autoplay as an ambient loop
  ffmpeg -y -v error -i "$in" \
    -vf "$CHAIN,scale=-2:1440:flags=lanczos,unsharp=5:5:0.3:5:5:0.0" \
    -an -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p \
    -movflags +faststart "$VID/$name.mp4"
  ffmpeg -y -v error -i "$in" \
    -vf "$CHAIN,scale=-2:1440:flags=lanczos,unsharp=5:5:0.3:5:5:0.0" \
    -an -c:v libvpx-vp9 -crf 33 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 \
    "$VID/$name.webm"
  # poster so the first paint is never an empty black box
  ffmpeg -y -v error -ss 0.4 -i "$in" \
    -vf "$CHAIN,scale=-2:1440:flags=lanczos" -frames:v 1 -q:v 3 "$POS/$name.jpg"
done
echo "=== sizes ==="; du -h "$VID"/*.mp4 "$VID"/*.webm "$VID"/4k/*.mp4 "$POS"/*.jpg
