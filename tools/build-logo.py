#!/usr/bin/env python3
"""Rebuild the vector logo from the master brand JPEG.

The source is a flat-colour JPEG: gold shell + gold "IN PIAZZETTA" and a dark
brown "Capasanta" script, all on a terracotta ground. Each element is separated
by projecting pixels onto the background->ink colour axis, denoised, then traced
with potrace. Output is a single currentColor SVG so the mark can be recoloured
per context (gold on terracotta, white over video, terracotta on cream).
"""
import re, subprocess, sys
from pathlib import Path
from PIL import Image, ImageFilter
import numpy as np

SRC = Path(sys.argv[1] if len(sys.argv) > 1 else
           '/root/.claude/uploads/3a1c1bfa-d795-5e88-b1d6-253e442cba2b/5c03ea01-IMG_4601.jpeg')
OUT = Path('/home/user/CapaSanta/assets/img')
TMP = Path('/tmp/claude-0/-home-user-CapaSanta/3a1c1bfa-d795-5e88-b1d6-253e442cba2b/scratchpad')
OUT.mkdir(parents=True, exist_ok=True)

BG   = np.array([130., 60., 35.])    # #823C23 terracotta ground
GOLD = np.array([217., 200., 155.])
DARK = np.array([60., 28., 14.])
TRACE_SCALE = 6                      # trace at 6x source pixels for smooth curves
SPLIT = 470                          # y that divides shell from wordmark

im = Image.open(SRC).convert('RGB').filter(ImageFilter.MedianFilter(3))
a = np.asarray(im).astype(np.float64)
H, W, _ = a.shape
lum = lambda x: 0.299*x[...,0] + 0.587*x[...,1] + 0.114*x[...,2]
L, Lbg = lum(a), lum(BG)

def separate(ink):
    d = ink - BG
    return np.clip(((a - BG) @ d) / (d @ d), 0, 1)

gold, dark = separate(GOLD), separate(DARK)
gold[L <= Lbg] = 0     # gold is lighter than the ground
dark[L >= Lbg] = 0     # the script is darker than it

def smooth(m):
    p = Image.fromarray((m*255).astype(np.uint8))
    p = p.filter(ImageFilter.MedianFilter(5)).filter(ImageFilter.GaussianBlur(0.6))
    return np.clip((np.asarray(p).astype(np.float64)/255.0 - 0.18) / 0.60, 0, 1)

rows = np.arange(H)[:, None]
RAW = {'shell': np.where(rows <  SPLIT, gold, 0),
       'capa':  np.where(rows >= SPLIT, dark, 0),
       'piazz': np.where(rows >= SPLIT, gold, 0)}

# Denoising erodes thin strokes, so a fixed threshold thins the artwork. Instead
# calibrate per element: pick the threshold whose ink coverage equals the source's
# (a pixel counts as ink at >50% alpha), which preserves original stroke weight.
PARTS = []
for name, raw in RAW.items():
    sm = smooth(raw)
    ys, xs = np.where(sm > 0.05)
    sl = (slice(ys.min(), ys.max()+1), slice(xs.min(), xs.max()+1))
    cov = float((raw[sl] > 0.5).mean())
    thr = float(np.percentile(sm[sl], 100*(1-cov)))
    print(f'{name:6} ink={cov:.4f} -> threshold={thr:.3f}')
    PARTS.append((name, sm, thr))

boxes, bodies = {}, {}
for name, mask, thr in PARTS:
    ys, xs = np.where(mask > thr)
    x0, y0, x1, y1 = xs.min(), ys.min(), xs.max()+1, ys.max()+1
    sub = mask[y0:y1, x0:x1]
    big = Image.fromarray((sub*255).astype(np.uint8)).resize(
        ((x1-x0)*TRACE_SCALE, (y1-y0)*TRACE_SCALE), Image.LANCZOS)
    pbm = TMP/f'b_{name}.pbm'
    big.point(lambda v, t=thr*255: 0 if v > t else 255).convert('1').save(pbm)
    svg = TMP/f'b_{name}.svg'
    subprocess.run(['potrace','-s','-o',str(svg),'--turdsize','40',
                    '--alphamax','1.2','--opttolerance','0.4',str(pbm)], check=True)
    m = re.search(r'<g\s+transform="([^"]*)"[^>]*>(.*?)</g>', svg.read_text(), re.S)
    body = re.sub(r'\s*fill="[^"]*"', '', m.group(2).strip())
    boxes[name] = (int(x0), int(y0), int(x1), int(y1))
    bodies[name] = (m.group(1), body)
    print(f'{name:6} box={boxes[name]} paths={body.count("<path")}')

def group(name):
    x0, y0 = boxes[name][0], boxes[name][1]
    tf, body = bodies[name]
    return (f'<g class="lg-{name}" transform="translate({x0},{y0}) '
            f'scale({1/TRACE_SCALE:.6f})"><g transform="{tf}">{body}</g></g>')

HEAD = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" fill="currentColor" '
        'role="img" aria-label="Capasanta in Piazzetta">')
(OUT/'logo.svg').write_text(
    HEAD.format(vb='0 0 896 771') + group('shell') + group('capa') + group('piazz') + '</svg>')

sx0, sy0, sx1, sy1 = boxes['shell']
(OUT/'logo-mark.svg').write_text(
    HEAD.format(vb=f'{sx0} {sy0} {sx1-sx0} {sy1-sy0}') + group('shell') + '</svg>')

wx0 = min(boxes['capa'][0], boxes['piazz'][0]); wy0 = boxes['capa'][1]
wx1 = max(boxes['capa'][2], boxes['piazz'][2]); wy1 = max(boxes['capa'][3], boxes['piazz'][3])
(OUT/'logo-wordmark.svg').write_text(
    HEAD.format(vb=f'{wx0} {wy0} {wx1-wx0} {wy1-wy0}') + group('capa') + group('piazz') + '</svg>')

for f in ('logo.svg','logo-mark.svg','logo-wordmark.svg'):
    print(f, (OUT/f).stat().st_size, 'bytes')
