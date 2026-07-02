# Code Autopsy Scorecard - L10

## Scopo

Valutare il primo output generato con prompt libero.

Non serve dare un voto. Serve rendere visibili le assunzioni.

## Scorecard

| Criterio | Evidenza | Azione |
| --- | --- | --- |
| **Componenti troppo grandi** | `App.jsx` (312 righe) contiene header della tabella, toolbar filtri, ricerca, view mode toggle, tutti inline. `TicketForm.jsx` (389 righe) include 4 icon SVG inline nel JSX del canale. | Estrarre `TableHeader` e `TicketFormToolbar` |
| **Responsabilita' confuse** | `App.jsx` mescola: layout, gestione stato ticket, sorting, filtering, pagination, toast. Il form gestisce validazione + reset + genera ID + data. | Separare: `useTicketStore` hook, `TicketFormToolbar`, `TicketHeader` |
| **Stato inutile** | `viewMode` (list/grid) e' definito ma il view mode grid non e' implementato. Il bottone dropdown "Ordina:" non ha handler. `uiState` puo' essere solo "normal"/"loading"/"error" ma non c'e' modo di triggerarlo. | Rimuovere `viewMode` o implementare grid. Collegare `uiState` a un effetto reale |
| **Dati inventati** | 20 ticket mock con nomi clienti generici (Alpha, Beta, Gamma...), date fisse a Maggio 2025, ID sequentiali casuali. I contatori nelle tab (`statiCount`) sono hardcoded e non derivati dall'array. | Derivare `statiCount` da `mockTickets` con `useMemo` |
| **Business logic client** | Generazione ID (`TCK-${random}`) e formattazione data (`toLocaleDateString`) sono nel client. In produzione queste andrebbero dal server. | Segnare con commento `// SERVER-ONLY: genera ID server-side` |
| **Scope creep** | Filtri non implementati (bottone "Filtri" con badge "2" e' decorativo). Ordinamento dropdown non collegato. View mode toggle (list/grid) half-baked. Icone toolbar (attach, mention, emoji, snippet) non funzionali. | Tagliare: rimuovere view mode, toolbar non funzionale. O implementare fully |
| **Stati mancanti** | Stati presenti: loading, empty, error, success toast. Mancanti: conferma eliminazione, stato "saving" durante submit, errore validazione lato server. | Aggiungere `isSaving` state nel form |
| **Responsive fragile** | Layout flex a 380px fisso per il form. Nessun breakpoint. A viewport stretto (<768px) il form e la tabella si sovrappongono. L'header ha 4 gruppi di info che non si wrappano. | Aggiungere responsive: stack verticale sotto md, header responsive |
| **Verifica assente** | Build passa, lint passa. Nessun test. Nessun browser check documentato. | Fare `npm run dev` + check manuale su Chrome/Firefox |

---

## Domande di debrief

### Che cosa ha fatto bene il primo output?
- Struttura componenti pulita e nominata bene (Sidebar, Header, TicketForm, TicketTable, StatusTabs, Pagination, UI states)
- Dark theme coerente con il mockup
- Validazione form con errori inline
- Tabella con sorting funzionante
- Paginazione completa con items per page
- Toast feedback dopo creazione ticket
- Stati UI (loading/empty/error) gia inclusi

### Che cosa ha inventato?
- Dati mock: nomi clienti generici, date fisse, contatori hardcoded
- ID generation casuale
- Badge "2" sui filtri (decorativo, nessun filtro attivo)
- View mode list/grid (grid non implementata)
- Dropdown "Ordina:" non collegato allo stato
- Campo "Campo calcolato dal server (futuro)" - placeholder

### Che cosa non poteva sapere?
- Se i filtri avessero dovuto essere funzionali o solo visuali
- Se la view grid era richiesta o no
- Se l'ordinamento dal dropdown avrebbe dovuto sostituire o affiancare il sorting delle colonne
- Se il badge "2" sui filtri doveva riflettere filtri attivi reali

### Che cosa va tenuto come idea?
- La separazione responsabilita' e' un buon inizio (componenti ben nominati)
- Gli stati UI (loading/empty/error/success) sono un pattern da mantenere
- La validazione inline e' un buon pattern UX
- La struttura cartelle e' scalabile

### Che cosa va scartato prima del transfer?
- **View mode list/grid** non implementato -> rimuovere o implementare
- **Dropdown "Ordina:"** non collegato -> rimuovere o collegare a `sortField`/`sortDir`
- **Badge "2" filtri** decorativo -> rimuovere o implementare filtri
- **Stato `uiState`** non collegato a nulla -> rimuovere o collegare a loading reale
- **Contatori hardcoded** nelle tab -> derivare dall'array
- **Responsive** assente -> aggiungere breakpoint minimi
