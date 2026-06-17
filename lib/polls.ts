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

function chartColor(index: number, total: number): string {
  const palette = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ]

  if (index < palette.length) {
    return palette[index]
  }

  const hue = Math.round((index * 360) / total)
  return `hsl(${hue} 65% 55%)`
}

export type ChartSeries = {
  key: string
  candidato: string
}

export function buildChartData(filteredRows: PollRow[]): {
  data: Record<string, string | number | null>[]
  config: ChartConfig
  series: ChartSeries[]
} {
  const dates = [...new Set(filteredRows.map((row) => row.dataDivulgacao))].sort()
  const candidates = [...new Set(filteredRows.map((row) => row.candidato))]

  const series = candidates.map((candidato) => ({
    candidato,
    key: slugifyKey(candidato),
  }))

  const data = dates.map((date) => {
    const point: Record<string, string | number | null> = { date }

    for (const { candidato, key } of series) {
      const row = filteredRows.find(
        (entry) =>
          entry.dataDivulgacao === date && entry.candidato === candidato,
      )
      point[key] = row?.percentual ?? null
    }

    return point
  })

  const config: ChartConfig = Object.fromEntries(
    series.map(({ candidato, key }, index) => [
      key,
      {
        label: translateLabel(candidato),
        color: chartColor(index, series.length),
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
