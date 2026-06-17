# Soft Visual Refresh — Design Spec

**Date:** 2026-06-16  
**Status:** Approved  
**Scope:** Soften dashboard visual while keeping structure and semantic colors

---

## Goal

Apply a softer, AgencyHires-inspired visual treatment to the presidential polls dashboard. Keep the existing card layout, interactions, and all user-defined semantic colors (chart lines, Lula/Bolsonaro headers, FAVORABLE/UNFAVORABLE badges). Reduce visual harshness via gradients, lighter borders, more whitespace, and pill-shaped controls.

---

## Semantic colors (unchanged)

| Element | Color |
|---|---|
| Lula (chart + panel) | `hsl(0 72% 50%)` |
| Bolsonaro (chart + panel) | `hsl(220 75% 50%)` |
| Blank/null | `hsl(0 0% 60%)` |
| Don't know | `hsl(270 55% 68%)` |
| Others | `hsl(142 55% 42%)` |
| FAVORABLE badge | emerald `/15` |
| UNFAVORABLE badge | orange `/15` |

---

## Changes

### Background

- Light mode: vertical gradient `oklch(0.99 0.002 90) → oklch(0.965 0.004 90)` on `body`
- Dark mode: vertical gradient `oklch(0.16 0.004 49) → oklch(0.13 0.004 49)`

### Typography

- Page title: `text-3xl font-semibold tracking-tight`
- Optional subtitle in `text-muted-foreground/80`
- Card titles: `font-medium` (lighter weight)
- Card descriptions: `text-muted-foreground/80`
- Filter labels: `text-xs text-muted-foreground`

### Cards

- Remove hard ring; use `border border-border/40` or borderless with soft shadow
- Background: `bg-card/80 backdrop-blur-sm`
- Shadow: subtle `shadow-sm shadow-black/[0.03]`
- Dashboard gap: `gap-6` → `gap-8`, padding `py-10`

### Filters

- Select triggers: pill shape (`rounded-full`), `bg-muted/50`, transparent border
- Focus: soft `ring-primary/20`

### Scenario selector buttons

- Pill shape (`rounded-full`)
- Inactive: `bg-muted/40 border-transparent`
- Active: `bg-primary/10 border-primary/30 shadow-sm` (no hard ring)

### Scenario panels

- Lula header: red text + `bg-red-500/[0.06]` tint
- Bolsonaro header: blue text + `bg-blue-500/[0.06]` tint
- Dividers: `border-border/30`

### Chart

- Line colors unchanged
- Lighter grid via existing chart CSS overrides

---

## Files

| File | Change |
|---|---|
| `app/globals.css` | Body gradient, softer border token |
| `components/ui/card.tsx` | Soft border/shadow/blur |
| `components/dashboard/poll-dashboard.tsx` | Spacing, header, card overrides |
| `components/dashboard/poll-filters.tsx` | Pill selects, label style |
| `components/dashboard/scenario-selector.tsx` | Pill buttons, soft active state |
| `components/dashboard/scenario-panel.tsx` | Tinted headers, soft dividers |
| `components/dashboard/poll-metadata.tsx` | Softer label color |

---

## Out of scope

- Layout restructure (option B/C)
- Chart color changes
- Content or interaction changes
- Dark/light mode toggle UI
