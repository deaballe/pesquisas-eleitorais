# Presidential Polls Dashboard — Design Spec

**Date:** 2026-06-16  
**Status:** Approved for planning  
**Scope:** v1 — single-page dashboard for `data/results-president.csv`

---

## Goal

Build a dashboard that visualizes presidential poll data over time using a multi-line chart (shadcn/ui style). The dashboard reads from a local CSV that grows as new polls are collected via the G1 scraping script.

---

## Data Source

**File:** `data/results-president.csv`

| Column | Type | Description |
|---|---|---|
| `data_coleta` | datetime | When the row was collected |
| `data_divulgacao` | date | Poll publication date (X-axis) |
| `instituto` | string | Polling institute (e.g. Quaest) |
| `turno` | integer | Round: 1 (first round) or 2 (runoff simulation) |
| `candidato` | string | Candidate name (or special categories) |
| `percentual` | number | Vote intention percentage (Y-axis) |

**Format:** Long — one row per candidate per poll per round.

### Display language policy

All user-facing text must be in **English**, including data labels derived from the CSV.

| Rule | Example |
|---|---|
| **Proper names** — keep as stored in the CSV | `Lula`, `Flávio Bolsonaro`, `Quaest` |
| **Non-proper-name values** — translate via an explicit mapping | poll categories, generic labels |
| **Unknown value** — do not guess; ask the project owner and add to the mapping before shipping | any new CSV category string |

The CSV file itself stays unchanged (Portuguese source data). Translation happens at display time in the dashboard via a lookup table (`lib/translations.ts`).

**Special poll categories** (non-proper-name; require explicit English labels):

| CSV value (PT) | English label (proposed — confirm with owner) |
|---|---|
| `Branco/nulo/não vai votar` | Blank/null/will not vote |
| `Não sabe` | Don't know |

If a new `candidato` or `instituto` value appears in the CSV and is not a proper name, implementation must **stop and ask** for the English label rather than auto-translating or showing Portuguese.

---

## Requirements (v1)

### Primary visualization

- **Multi-line chart** showing vote intention over time (option A from brainstorming).
- X-axis: `data_divulgacao` (unique dates, chronological).
- Y-axis: `percentual` (0–100).
- One line per candidate, including blank/undecided categories.

### Filters

- **Round** — select turno `1` or `2`.
- **Institute** — select from unique `instituto` values in the CSV.
- One chart at a time for the selected round + institute combination.
- **Defaults on load:**
  - Round: `1`
  - Institute: the institute associated with the most recent `data_divulgacao`

### Metadata block

Display alongside the chart:

- **Last collected** — `max(data_coleta)` across the entire CSV (global, not filtered).
- **Poll period** — `min(data_divulgacao)` → `max(data_divulgacao)` for the current filter selection.
- **Institute** — currently selected institute name.

### Language

All user-facing dashboard text must be in **English**, including translated data labels (see [Display language policy](#display-language-policy)). Proper names (candidates, institute brands) are shown as stored in the CSV.

### UI copy (English)

| Element | Text |
|---|---|
| Page title | Presidential Polls 2026 |
| Round filter label | Round |
| Institute filter label | Institute |
| Metadata — last collected | Last collected |
| Metadata — poll period | Poll period |
| Metadata — institute | Institute |
| Chart title | Vote intention over time |
| Chart description | Percentage by candidate across poll dates |
| Empty state | No polls for this round and institute |
| Error — missing file | Poll data file not found |
| Error — invalid data | Unable to read poll data |

---

## Architecture

```
data/results-president.csv
        ↓ (fs.readFile + parse)
   app/page.tsx (Server Component)
        ↓ props (PollRow[])
   PollDashboard (Client Component)
   ├── PollFilters      (round, institute selects)
   ├── PollMetadata     (last collected, period, institute)
   └── PollLineChart    (shadcn Chart + Recharts)
```

### Approach

**Server Component reads CSV at request time** (recommended over build-time embed or API route).

- When the Python collection script updates the CSV, a page refresh reflects new data during development.
- No database or API route in v1.

### New dependencies / components

- shadcn `chart` component (Recharts under the hood).
- shadcn `select` component for filters.

### Existing stack leveraged

- Next.js 16 App Router
- React 19
- shadcn/ui + Tailwind CSS
- Dark mode via existing `ThemeProvider`

---

## Data transformation

1. Parse CSV into typed rows (`PollRow`).
2. Client receives full dataset; filters applied client-side.
3. Apply `translateLabel(value)` when rendering any CSV string in the UI (chart legend, tooltips, filters if applicable). Proper names pass through unchanged; mapped categories return the English label.
4. For selected round + institute:
   - Collect unique `data_divulgacao` dates, sorted ascending.
   - Build one series per unique `candidato` (series key stays the raw CSV value; display name is translated).
   - If a candidate has no row for a given date, the point is `undefined` (line gap).
5. Chart legend lists all candidates in the filtered set using English display labels.

**Note:** With 14+ lines the chart will be visually dense. This is accepted for v1 per user choice. Candidate toggles can be added in v2.

---

## Page layout

Single route: `/`

```
┌─────────────────────────────────────────────────┐
│  Presidential Polls 2026                        │
├─────────────────────────────────────────────────┤
│  [Round ▼]    [Institute ▼]                     │
├─────────────────────────────────────────────────┤
│  Last collected: …                              │
│  Poll period: … → …                             │
│  Institute: …                                   │
├─────────────────────────────────────────────────┤
│  Vote intention over time                       │
│  Percentage by candidate across poll dates      │
│  ┌───────────────────────────────────────────┐  │
│  │         (multi-line chart)                │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

---

## File structure (planned)

```
lib/
  types.ts              # PollRow type
  polls.ts              # readCsv, parseCsv, helpers
  translations.ts       # PT → EN label map; proper names pass through
components/
  dashboard/
    poll-dashboard.tsx  # Client wrapper, filter state
    poll-filters.tsx
    poll-metadata.tsx
    poll-line-chart.tsx
app/
  page.tsx              # Server: load CSV, render PollDashboard
```

---

## Error handling

| Condition | Behavior |
|---|---|
| CSV file missing | Render error message: "Poll data file not found" |
| CSV parse failure | Render error message: "Unable to read poll data" |
| Empty CSV | Render empty state |
| Filter yields no rows | Render: "No polls for this round and institute" |

No unhandled server crashes; errors surfaced in the UI.

---

## Out of scope (v1)

- URL search params for filter state
- Data table of latest poll numbers
- Institute overlay / cross-institute comparison on one chart
- Candidate line toggles / top-N filtering
- Automated CSV refresh / polling
- API route or database

---

## Testing

- Manual: run `npm run dev`, verify chart renders with current CSV.
- Manual: switch round and institute filters, confirm chart and metadata update.
- Manual: toggle dark mode, confirm chart colors follow theme.
- Run `npm run typecheck` and `npm run lint` before merge.

---

## Brainstorming decisions log

| Question | Choice |
|---|---|
| Primary visualization | A — temporal evolution (multi-line chart) |
| Round / institute handling | A — one chart, filters for round + institute |
| Candidates shown | B — all, including blank/undecided |
| Page content beyond chart | B — chart + filters + metadata |
| UI language | English |
| Chart style reference | shadcn/ui Line Chart — Multiple |
