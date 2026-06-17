export type PollRow = {
  dataColeta: string
  dataDivulgacao: string
  instituto: string
  turno: number
  candidato: string
  percentual: number
}

export type PollLoadResult =
  | { rows: PollRow[] }
  | { error: "missing" | "invalid" | "empty" }
