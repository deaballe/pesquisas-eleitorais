import type { ChartConfig } from "@/components/ui/chart"
import { translateLabel } from "@/lib/translations"
import type { PollRow } from "@/lib/types"

export function slugifyKey(value: string): string {
  return (
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]+/g, "_")
      .replace(/^_|_$/g, "")
      .toLowerCase() || "unknown"
  )
}

export function getUniqueRounds(rows: PollRow[]): number[] {
  return [...new Set(rows.map((row) => row.turno))].sort((a, b) => a - b)
}

export function getUniqueInstitutes(rows: PollRow[]): string[] {
  return [...new Set(rows.map((row) => row.instituto))].sort()
}

export function getDefaultInstitute(rows: PollRow[]): string {
  const latestDate = rows.reduce(
    (latest, row) => (row.dataDivulgacao > latest ? row.dataDivulgacao : latest),
    rows[0].dataDivulgacao,
  )

  const latestRow = rows.find((row) => row.dataDivulgacao === latestDate)
  return latestRow?.instituto ?? rows[0].instituto
}

export function getLastCollected(rows: PollRow[]): string {
  return rows.reduce(
    (latest, row) => (row.dataColeta > latest ? row.dataColeta : latest),
    rows[0].dataColeta,
  )
}

export function filterPollRows(
  rows: PollRow[],
  turno: number,
  instituto: string,
): PollRow[] {
  return rows.filter(
    (row) => row.turno === turno && row.instituto === instituto,
  )
}

export function getPollPeriod(rows: PollRow[]): {
  start: string
  end: string
} | null {
  if (rows.length === 0) {
    return null
  }

  const dates = rows.map((row) => row.dataDivulgacao).sort()
  return { start: dates[0], end: dates[dates.length - 1] }
}

export type ChartSeries = {
  key: string
  candidato: string
}

const CHART_CANDIDATES = ["Lula", "Flávio Bolsonaro"] as const
const CHART_SPECIAL_CATEGORIES = [
  "Branco/nulo/não vai votar",
  "Não sabe",
] as const
const CHART_OTHERS = "Others"

const CHART_SERIES_ORDER = [
  ...CHART_CANDIDATES,
  ...CHART_SPECIAL_CATEGORIES,
  CHART_OTHERS,
] as const

const CHART_SERIES_COLORS: Record<(typeof CHART_SERIES_ORDER)[number], string> = {
  Lula: "hsl(0 72% 50%)",
  "Flávio Bolsonaro": "hsl(220 75% 50%)",
  "Branco/nulo/não vai votar": "hsl(0 0% 60%)",
  "Não sabe": "hsl(270 55% 68%)",
  Others: "hsl(142 55% 42%)",
}

function chartSeriesColor(candidato: string): string {
  return (
    CHART_SERIES_COLORS[candidato as keyof typeof CHART_SERIES_COLORS] ??
    "var(--chart-1)"
  )
}

function isChartSeriesCandidate(candidato: string): boolean {
  return (
    CHART_CANDIDATES.includes(candidato as (typeof CHART_CANDIDATES)[number]) ||
    CHART_SPECIAL_CATEGORIES.includes(
      candidato as (typeof CHART_SPECIAL_CATEGORIES)[number],
    )
  )
}

export function buildChartData(filteredRows: PollRow[]): {
  data: Record<string, string | number | null>[]
  config: ChartConfig
  series: ChartSeries[]
} {
  const dates = [...new Set(filteredRows.map((row) => row.dataDivulgacao))].sort()
  const hasOthers = filteredRows.some((row) => !isChartSeriesCandidate(row.candidato))

  const series = CHART_SERIES_ORDER.filter(
    (candidato) => candidato !== CHART_OTHERS || hasOthers,
  ).map((candidato) => ({
    candidato,
    key: slugifyKey(candidato),
  }))

  const data = dates.map((date) => {
    const rowsForDate = filteredRows.filter((row) => row.dataDivulgacao === date)
    const point: Record<string, string | number | null> = { date }

    for (const { candidato, key } of series) {
      if (candidato === CHART_OTHERS) {
        point[key] = rowsForDate
          .filter((row) => !isChartSeriesCandidate(row.candidato))
          .reduce((sum, row) => sum + row.percentual, 0)
        continue
      }

      const row = rowsForDate.find((entry) => entry.candidato === candidato)
      point[key] = row?.percentual ?? null
    }

    return point
  })

  const config: ChartConfig = Object.fromEntries(
    series.map(({ candidato, key }) => [
      key,
      {
        label: translateLabel(candidato),
        color: chartSeriesColor(candidato),
      },
    ]),
  )

  return { data, config, series }
}

export function formatPollDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number)
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(year, month - 1, day))
}

export function formatCollectedAt(value: string): string {
  const parsed = new Date(value.replace(" ", "T"))

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(parsed)
}
