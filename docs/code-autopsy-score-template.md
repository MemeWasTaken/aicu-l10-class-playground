# Code autopsy scorecard - L10

## Scopo

Valutare il primo output generato con prompt libero.

Non serve dare un voto. Serve rendere visibili le assunzioni.

## Scorecard

| Criterio | Segnale da cercare | Evidenza | Azione |
| --- | --- | --- | --- |
| Componenti troppo grandi | un file o una funzione contiene tutta la UI | | spezzare in parti |
| Responsabilita' confuse | form, lista e feedback mescolati | | nominare responsabilita' |
| Stato inutile | valori duplicati o non usati | | ridurre stato |
| Dati inventati | fixture casuali o incoerenti | | esplicitare dati mock |
| Business logic client | label/scadenze calcolate in UI | | segnare server-only |
| Scope creep | filtri, notifiche, dashboard extra | | tagliare fuori scope |
| Stati mancanti | solo happy path | | aggiungere loading/empty/error/success |
| Responsive fragile | layout rotto a viewport stretto | | verificare browser |
| Verifica assente | nessuna evidenza runtime | | fare browser check |

## Domande di debrief

- Che cosa ha fatto bene il primo output?
- Che cosa ha inventato?
- Che cosa non poteva sapere?
- Che cosa va tenuto come idea?
- Che cosa va scartato prima del transfer?