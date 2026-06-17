"use client"

import { useMemo, useState } from "react"

import { PollFilters } from "@/components/dashboard/poll-filters"
import { PollLineChart } from "@/components/dashboard/poll-line-chart"
import { PollMetadata } from "@/components/dashboard/poll-metadata"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  buildChartData,
  filterPollRows,
  getDefaultInstitute,
  getLastCollected,
  getUniqueInstitutes,
  getUniqueRounds,
} from "@/lib/polls"
import type { PollRow } from "@/lib/types"

type PollDashboardProps = {
  rows: PollRow[]
}

export function PollDashboard({ rows }: PollDashboardProps) {
  const rounds = useMemo(() => getUniqueRounds(rows), [rows])
  const institutes = useMemo(() => getUniqueInstitutes(rows), [rows])
  const lastCollected = useMemo(() => getLastCollected(rows), [rows])

  const [round, setRound] = useState(1)
  const [institute, setInstitute] = useState(() => getDefaultInstitute(rows))

  const filteredRows = useMemo(
    () => filterPollRows(rows, round, institute),
    [rows, round, institute],
  )

  const chart = useMemo(
    () => (filteredRows.length > 0 ? buildChartData(filteredRows) : null),
    [filteredRows],
  )

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6">
      <header>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Presidential Polls 2026
        </h1>
      </header>

      <PollFilters
        round={round}
        institute={institute}
        rounds={rounds}
        institutes={institutes}
        onRoundChange={setRound}
        onInstituteChange={setInstitute}
      />

      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>
            Metadata for the current filter selection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PollMetadata
            rows={filteredRows}
            lastCollected={lastCollected}
            institute={institute}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vote intention over time</CardTitle>
          <CardDescription>
            Percentage by candidate across poll dates
          </CardDescription>
        </CardHeader>
        <CardContent>
          {chart ? (
            <PollLineChart
              data={chart.data}
              config={chart.config}
              series={chart.series}
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              No polls for this round and institute
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
