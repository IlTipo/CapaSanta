# Capasanta in Piazzetta — sito web

Sito statico per **Capasanta in Piazzetta**, Piazza Martiri della Libertà 20,
Santa Margherita Ligure (GE).

Nessun build, nessuna dipendenza: solo HTML, CSS e JavaScript. Si apre con un
doppio click su `index.html` e funziona anche senza connessione.

---

## Come metterlo online

**Con GitHub Pages.** Serve un solo passaggio a mano, una volta sola:
*Settings → Pages → Source: **GitHub Actions***, poi *Actions → Deploy sito →
Re-run jobs*. Da quel momento ogni modifica su `main` pubblica il sito da
sola, tramite `.github/workflows/pages.yml`.

Quel click non è automatizzabile: il token di GitHub Actions non ha i permessi
per creare il sito Pages, quindi finché non lo si attiva il workflow fallisce
con *«Get Pages site failed»*. È l'unico intervento manuale richiesto.

**Con un altro hosting.** Caricare **tutta la cartella** su Netlify, Vercel,
Aruba, IONOS, Register.it… Non serve né Node né un database. Trascinandola su
[app.netlify.com/drop](https://app.netlify.com/drop) è online in pochi secondi.

Per usare un dominio vostro (es. `capasantainpiazzetta.it`) va poi aggiornato
il `<link rel="canonical">` in cima a `index.html`.

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

## Modificare il menu

Tutto il menu — 17 sezioni, 111 voci — sta in **`assets/js/menu.js`**. Non si
tocca l'HTML: le tendine vengono costruite da lì.

Un piatto:

```js
{ p: '15', n: 'La caprese', d: {
    it: 'Mozzarella di bufala, pomodoro datterino e basilico',
    en: 'Buffalo mozzarella with datterino tomato and basil',
    fr: 'Mozzarella de bufflonne, tomate datterino et basilic' } }
```

`p` è il prezzo, `n` il nome (resta in italiano, come sul menu stampato), `d`
la descrizione nelle tre lingue. Per cambiare un prezzo basta modificare `p`.

Un piatto con più versioni usa `v` (vedi *Gli gnocchetti*, *Le catalane*).

Un vino ha due prezzi — `g` al calice, `b` alla bottiglia — e la descrizione è
una stringa sola: nomi e vitigni non si traducono.

```js
{ g: '10', b: '35', n: 'Gewürztraminer Aime Girlan', d: 'Gewürztraminer 100% · Alto Adige' }
```

Se un vino si serve solo in bottiglia si omette `g`, e la colonna resta vuota.

### Le due carte a orario

`Gli immancabili freddi` si servono **fino alle 18**, `I nostri special`
**dopo le 18**. Le due sezioni sono marcate con `when: 'pre18'` e
`when: 'post18'`; quella in servizio in quel momento mostra il pallino verde
"In servizio ora". L'orario di cambio è `SWITCH_HOUR` in `assets/js/main.js`.

L'ora è sempre quella italiana (`Europe/Rome`), non quella del telefono di chi
guarda: un cliente che consulta il sito da Londra o da New York vede comunque
la carta giusta.

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

## Mappa e social

La mappa si carica **solo quando il visitatore la chiede**: prima di quel
momento non parte nessuna richiesta verso OpenStreetMap, e se la rete dovesse
fallire si vede comunque un riquadro col logo e l'indirizzo invece di un
rettangolo vuoto. I pulsanti *Google Maps* e *Apple Maps* funzionano sempre.

Il segnaposto è a `44.3337291, 9.2132254`; per spostarlo si modificano `marker`
e `bbox` nell'attributo `data-src` del pulsante mappa in `index.html`.

I link social sono nel footer di `index.html`. Al momento c'è Instagram
([@capasanta.ristorante](https://www.instagram.com/capasanta.ristorante/)),
Google e il telefono: **conviene verificare che l'account Instagram sia quello
giusto**, ed è lì che se ne aggiungono altri (Facebook, TripAdvisor…).

## Note

- Le recensioni sono **estratti** da Google e restano in italiano anche nelle
  altre lingue, perché sono citazioni reali.
- Il sito rispetta `prefers-reduced-motion`: chi ha ridotto le animazioni di
  sistema vede la pagina ferma.
- I font sono ospitati sul sito e non su Google Fonts: pagina più veloce e
  nessun dato dei visitatori inviato a terzi (GDPR).
