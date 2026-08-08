#!/usr/bin/env python3
"""Bake colour variants of the logo.

The traced masters use fill="currentColor", but the site loads them through
<img> (external <use> is blocked on file:// and would break double-click
opening), so each context needs its own pre-coloured file.
"""
from pathlib import Path
IMG = Path(__file__).resolve().parent.parent / 'assets/img'
GOLD, CREAM, TERRA, INK = '#C9AE83', '#EFE3C8', '#823C23', '#3C1C0D'
VARIANTS = [
    ('logo.svg',      'logo-cream.svg', CREAM),   # over video / dark grounds
    ('logo.svg',      'logo-gold.svg',  GOLD),
    ('logo.svg',      'logo-ink.svg',   INK),     # on cream grounds
    ('logo-mark.svg', 'mark-cream.svg', CREAM),
    ('logo-mark.svg', 'mark-gold.svg',  GOLD),
    ('logo-mark.svg', 'mark-terra.svg', TERRA),
]
for src, dst, colour in VARIANTS:
    s = (IMG/src).read_text().replace('fill="currentColor"', f'fill="{colour}"')
    (IMG/dst).write_text(s)
    print(f'{dst:18} {colour}  {len(s)//1024} KB')

# favicon: the shell on the brand terracotta, padded into a square
mark = (IMG/'logo-mark.svg').read_text()
inner = mark.split('>', 1)[1].rsplit('</svg>', 1)[0].replace('fill="currentColor"', '')
fav = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">'
       f'<rect width="512" height="512" rx="96" fill="{TERRA}"/>'
       f'<g fill="{GOLD}" transform="translate(70,105) scale(0.885) translate(-251,-58)">{inner}</g></svg>')
(IMG/'favicon.svg').write_text(fav)
print('favicon.svg', len(fav)//1024, 'KB')
