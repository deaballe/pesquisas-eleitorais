import { readFile } from "node:fs/promises"
import path from "node:path"

import type { PollLoadResult, PollRow } from "@/lib/types"

const CSV_PATH = path.join(process.cwd(), "data", "results-president.csv")

const CSV_HEADERS = [
  "data_coleta",
  "data_divulgacao",
  "instituto",
  "turno",
  "candidato",
  "percentual",
] as const

export function parsePollCsv(content: string): PollRow[] {
  const lines = content.trim().split(/\r?\n/)
  if (lines.length < 2) {
    return []
  }

  const header = lines[0].split(",").map((cell) => cell.trim())
  if (header.join(",") !== CSV_HEADERS.join(",")) {
    throw new Error("Unexpected CSV header")
  }

  return lines.slice(1).map((line, index) => {
    const parts = line.split(",")
    if (parts.length !== CSV_HEADERS.length) {
      throw new Error(`Invalid row at line ${index + 2}`)
    }

    const [dataColeta, dataDivulgacao, instituto, turno, candidato, percentual] =
      parts

    const parsedTurno = Number(turno)
    const parsedPercentual = Number(percentual)

    if (!Number.isInteger(parsedTurno) || Number.isNaN(parsedPercentual)) {
      throw new Error(`Invalid numeric values at line ${index + 2}`)
    }

    return {
      dataColeta,
      dataDivulgacao,
      instituto,
      turno: parsedTurno,
      candidato,
      percentual: parsedPercentual,
    }
  })
}

export async function loadPolls(): Promise<PollLoadResult> {
  let content: string

  try {
    content = await readFile(CSV_PATH, "utf-8")
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return { error: "missing" }
    }
    return { error: "invalid" }
  }

  try {
    const rows = parsePollCsv(content)
    if (rows.length === 0) {
      return { error: "empty" }
    }
    return { rows }
  } catch {
    return { error: "invalid" }
  }
}
