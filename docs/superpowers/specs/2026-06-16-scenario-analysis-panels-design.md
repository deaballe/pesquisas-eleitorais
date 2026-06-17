# Scenario Analysis Panels — Design Spec

**Date:** 2026-06-16  
**Status:** Approved  
**Scope:** Interactive business/regulatory scenario comparison below the poll chart

---

## Goal

Extend the presidential polls dashboard with a **Business scenario analysis** section placed directly below the vote intention chart. Users select one of four companies and see a side-by-side comparison of regulatory and strategic impact under:

- **LULA** (left column) — current Lula administration scenario
- **BOLSONARO** (right column) — scenario based on the **Jair Bolsonaro administration**

Content is static, authored by the project owner, and stored in the codebase (not loaded from CSV or external API).

---

## Placement

```
┌─────────────────────────────────────────────┐
│ Presidential Polls 2026                     │
│ [ Round / Institute filters ]               │
│ [ Overview metadata card ]                  │
│ [ Vote intention over time — line chart ]   │
│ [ Business scenario analysis — NEW ]        │
└─────────────────────────────────────────────┘
```

The new section is a `Card` with title **Business scenario analysis** and description *Regulatory impact by company under Lula vs Bolsonaro scenarios*.

---

## Interaction

| Behavior | Rule |
|---|---|
| Initial load | No company selected; detail panel hidden |
| First click | Opens two-column panel for that company |
| Click another company | Switches panel content |
| Click active company again | Closes panel (toggle) |
| Keyboard | Buttons are focusable; `aria-pressed` reflects selection |

### Layout

- **Desktop (`md+`):** 4 selector buttons in a row; panel as 2 equal columns (Lula \| Bolsonaro)
- **Tablet (`sm`):** 2×2 button grid; panel columns stack
- **Mobile:** 1-column buttons; panel columns stack

---

## Companies (selectors)

| Key | Label |
|---|---|
| `agency-hires` | Agency Hires |
| `free-the-founder` | Free The Founder |
| `shadow-light-studios` | Shadow Light Studios |
| `summary-strategic` | Summary/Strategic |

---

## Visual design

Aligned with chart candidate colors where applicable.

| Element | Style |
|---|---|
| LULA card header | Red — `hsl(0 72% 50%)` |
| BOLSONARO card header | Blue — `hsl(220 75% 50%)` |
| BOLSONARO subtitle | *Based on the Jair Bolsonaro administration* |
| FAVORABLE badge | Green — `bg-emerald-500/15 text-emerald-700` (dark: `text-emerald-400`) |
| UNFAVORABLE badge | Orange — `bg-orange-500/15 text-orange-700` (dark: `text-orange-400`) |
| Active selector button | `outline` variant + primary border, light primary background, ring |
| Source citations | Inline link, `target="_blank"`, `rel="noopener noreferrer"` |

---

## Content model

**Source of truth:** `lib/scenario-analysis.ts`

### Types

```typescript
type ScenarioStance = "FAVORABLE" | "UNFAVORABLE"

type ScenarioTopic = {
  title: string
  stance: ScenarioStance
  body: string
  sourceLabel: string
  sourceUrl: string
}

type ScenarioStrategy = {
  title: string
  body: string
  sourceLabel: string
  sourceUrl: string
}

type ScenarioParagraph = {
  title?: string
  body: string
  sourceLabel?: string
  sourceUrl?: string
}

type ScenarioSide = {
  topics?: ScenarioTopic[]
  paragraphs?: ScenarioParagraph[]
  strategies?: { heading: string; items: ScenarioStrategy[] }
}

type CompanyScenario = {
  label: string
  lula: ScenarioSide
  bolsonaro: ScenarioSide
}
```

### Content block types

1. **Topic** — regulatory theme with stance badge (FAVORABLE/UNFAVORABLE), explanatory body, and source link. Used by the three named companies.
2. **Paragraph** — free-form strategic text with optional title and optional source. Used by Summary/Strategic.
3. **Strategy** — long-form mitigation item under a section heading. No stance badge.

### Render order (per side)

1. `paragraphs` (if any)
2. `topics` (if any)
3. `strategies.heading` + `strategies.items` (if any)

---

## Content inventory

Full text lives in `lib/scenario-analysis.ts`. This section lists structure only.

### Agency Hires

| Side | Blocks |
|---|---|
| Lula | 5 topics: Tax Reform (FAV), Labor Legislation (UNFAV), Data Protection (UNFAV), Central Bank Autonomy (UNFAV), Debureaucratization (FAV) |
| Bolsonaro | 4 topics: Tax Reform (UNFAV), Labor Legislation (FAV), Central Bank Autonomy (FAV), Debureaucratization (FAV) |

### Free The Founder

| Side | Blocks |
|---|---|
| Lula | 4 topics: Tax Reform (FAV), AI Regulation (UNFAV), Data Protection (UNFAV), Debureaucratization (FAV) |
| Bolsonaro | 3 topics: Tax Reform (UNFAV), AI Regulation (FAV), Data Protection (FAV) |

### Shadow Light Studios

| Side | Blocks |
|---|---|
| Lula | 3 topics: Tax Reform (FAV), Data Protection and Digital Statute (UNFAV), Digital Content Regulation (UNFAV) |
| Bolsonaro | 3 topics: Tax Reform (UNFAV), International Trade Agreements (UNFAV), Digital Content Regulation (FAV) |

### Summary/Strategic

| Side | Blocks |
|---|---|
| Lula | Paragraph: Scenario Summary · Paragraph: Alternative for Entry or Expansion (with source) · Strategies: Bypassing Rigid AI Regulations via Regulatory Sandboxes · Neutralizing Labor Friction through Tech Cluster Arbitrage |
| Bolsonaro | Paragraph: Scenario Summary · Strategies: Conquering Tax Fragmentation through Geographical Arbitrage · Insulating Global Media Contracts from Geopolitical Backlash |

**Explicit exclusion:** *Portfolio Status* was removed from the Lula Summary/Strategic side per owner request.

---

## Language

All scenario text is in **English**, as provided by the project owner. No translation layer is applied to this content (unlike CSV poll category labels in `lib/translations.ts`).

---

## Architecture

| File | Responsibility |
|---|---|
| `lib/scenario-analysis.ts` | Typed static content + `COMPANY_KEYS` export |
| `components/dashboard/scenario-selector.tsx` | Selection state, 4 buttons, conditional panel mount |
| `components/dashboard/scenario-panel.tsx` | Two-column grid; Lula/Bolsonaro card shells |
| `components/dashboard/scenario-content.tsx` | `ScenarioTopic`, `ScenarioParagraphBlock`, `ScenarioStrategyBlock` |
| `components/dashboard/poll-dashboard.tsx` | Renders `ScenarioSelector` inside Business scenario analysis card |

### Data flow

```
COMPANY_SCENARIOS (static)
        ↓
ScenarioSelector (selected: CompanyKey | null)
        ↓
ScenarioPanel (lula + bolsonaro ScenarioSide)
        ↓
ScenarioSidePanel → scenario-content renderers
```

No server fetch; no coupling to poll filters (`turno`, `instituto`).

---

## Accessibility

- Selector buttons expose `aria-pressed={true|false}`
- External source links open in new tab with `rel="noopener noreferrer"`
- Color is supplemented by text labels on stance badges (FAVORABLE / UNFAVORABLE)

---

## Out of scope

- CMS or markdown-based content editing
- Syncing scenario panel with chart filters
- Portuguese translation of scenario text
- URL/deep-link to a pre-selected company
- Animations on panel open/close

---

## Future changes

To add or edit content: update `lib/scenario-analysis.ts` only. New companies require a new `CompanyKey`, entry in `COMPANY_SCENARIOS`, and automatic inclusion via `COMPANY_KEYS`.

To add a new topic to an existing company: append to the relevant `topics` array on the `lula` or `bolsonaro` side.
