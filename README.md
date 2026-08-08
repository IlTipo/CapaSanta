# Capasanta in Piazzetta — sito web

Sito statico per **Capasanta in Piazzetta**, Piazza Martiri della Libertà 20,
Santa Margherita Ligure (GE).

Nessun build, nessuna dipendenza: solo HTML, CSS e JavaScript. Si apre con un
doppio click su `index.html` e funziona anche senza connessione.

---

## Come metterlo online

Caricare **tutta la cartella** su un qualsiasi hosting (Netlify, Vercel, Aruba,
IONOS, Register.it…). Non serve né Node né un database.

Trascinando la cartella su [app.netlify.com/drop](https://app.netlify.com/drop)
il sito è online in pochi secondi.

## Come vederlo in locale

Doppio click su `index.html`. In alternativa, per riprodurre esattamente le
condizioni dell'hosting:

```bash
python3 -m http.server 8000
# poi apri http://localhost:8000
```

---

## Struttura

```
index.html                  tutta la pagina
assets/css/style.css        stile, palette e animazioni
assets/js/i18n.js           TUTTI i testi, in italiano, inglese e francese
assets/js/main.js           lingue, menu mobile, animazioni, orari
assets/fonts/               Bodoni Moda + Jost (self-hosted)
assets/img/                 logo, favicon, gallery, poster dei video
assets/video/               video per il web (+ masters 4K in /4k)
tools/                      script per rigenerare logo e video
```

---

## Modificare i testi

**Tutti** i testi stanno in `assets/js/i18n.js`, divisi per lingua (`it`, `en`,
`fr`). Per cambiare una frase basta modificarla lì: il testo in `index.html` è
solo il valore di partenza, viene sostituito al caricamento.

Se si aggiunge una voce nuova, va aggiunta in **tutte e tre** le lingue e nel
tag HTML va messo `data-i18n="nomeVoce"`.

La lingua viene scelta automaticamente dal browser del visitatore e ricordata
per le visite successive.

## Aggiungere il menu

La sezione `#menu` è al momento un segnaposto ("Menu in aggiornamento"), in
attesa dei piatti e dei prezzi reali. Quando li avete, si sostituisce il blocco
`.menu__card` in `index.html` con le portate e si aggiornano le voci
`menu*` in `assets/js/i18n.js`.

## Cambiare gli orari

Gli orari sono in due punti che devono restare allineati:

1. la tabella `.hrs` in `index.html` (quella che si vede);
2. le costanti `OPEN_H` / `SHUT_H` in `assets/js/main.js`, che calcolano
   l'indicatore "Aperto adesso".

Anche i dati strutturati per Google (`openingHours`, telefono, indirizzo,
valutazione) sono in fondo al `<head>` di `index.html`.

---

## Immagini e video

I video sono ricavati dai reel originali del ristorante. Non sono stati
ritagliati, ricolorati o rimontati: la catena di elaborazione è
*riduzione rumore → ingrandimento Lanczos → leggero sharpen*, cioè solo un
recupero del dettaglio perso nella compressione del telefono.

Di ogni video ci sono due versioni:

- `assets/video/4k/*-4k.mp4` — **master 4K** (lato lungo 3840 px, audio
  incluso). Non vengono caricati dal sito: servono per i social, gli schermi
  in sala o qualsiasi altro uso.
- `assets/video/*.mp4` e `*.webm` — versioni per il web, senza audio (serve
  per far partire i video da soli nei browser) e con un'immagine di anteprima
  in `assets/img/poster/`.

Per rigenerarli:

```bash
./tools/build-video.sh
```

### Il logo

`assets/img/logo.svg` è il logo **vettoriale**, ricostruito dall'originale:
resta nitido a qualsiasi dimensione, dalla favicon a un manifesto. Le varianti
di colore (`logo-cream.svg`, `mark-gold.svg`…) sono generate da lì.

```bash
python3 tools/build-logo.py           # ricostruisce il vettoriale dall'immagine
python3 tools/build-logo-variants.py  # rigenera le varianti di colore
```

---

## Colori del brand

Presi direttamente dal logo e dalle foto del locale:

| Colore | Hex | Dove viene dal |
|---|---|---|
| Terracotta | `#823C23` | fondo del logo |
| Ruggine | `#691E10` | sedie della terrazza |
| Oro | `#C9AE83` | conchiglia del logo |
| Crema | `#F6F0E4` | tovaglie |
| Testo | `#3C1C0D` | scritta "Capasanta" |
| Verde | `#4FB89A` | bicchieri di vetro verde |

Sono definiti come variabili in cima a `assets/css/style.css`: cambiandoli lì,
cambia tutto il sito.

---

## Note

- Le recensioni sono **estratti** da Google e restano in italiano anche nelle
  altre lingue, perché sono citazioni reali.
- Il sito rispetta `prefers-reduced-motion`: chi ha ridotto le animazioni di
  sistema vede la pagina ferma.
- I font sono ospitati sul sito e non su Google Fonts: pagina più veloce e
  nessun dato dei visitatori inviato a terzi (GDPR).
